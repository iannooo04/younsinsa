"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma"; // Use specific import if needed, or just Prisma namespace
import { AdminType } from "@/generated/prisma";

export type AdminSearchFilter = {
  supplyType: "all" | "headquarters" | "supplier";
  supplierId?: string;
  keywordType: "integrated" | "id" | "name" | "email" | "nickname" | "phone" | "mobile";
  matchType: "exact" | "partial";
  keyword: string;
};

export type GetAdminsParams = {
  page?: number;
  pageSize?: number;
  orderBy?: "date_desc" | "date_asc" | "last_login_desc" | "last_login_asc";
  filter?: AdminSearchFilter;
};

export async function getAdminsAction(params: GetAdminsParams) {
  const { 
    page = 1, 
    pageSize = 10, 
    orderBy = "date_desc", 
    filter = { supplyType: 'all', keywordType: 'integrated', matchType: 'partial', keyword: '' } 
  } = params;

  const where: Prisma.AdminWhereInput = {};

  // Supply Type Filter
  if (filter.supplyType && filter.supplyType !== "all") {
    if (filter.supplyType === "headquarters") {
        where.type = { in: [AdminType.SUPER, AdminType.SUB] };
    } else if (filter.supplyType === "supplier") {
        where.type = AdminType.SUPPLIER;
    }
  }

  // Supplier ID Filter
  if (filter.supplierId) {
    where.supplierId = filter.supplierId;
  }

  // Keyword Filter
  if (filter.keyword) {
    const keyword = filter.keyword;
    const isExact = filter.matchType === "exact";
    
    // Helper to generic condition
    const condition = isExact 
      ? { equals: keyword } 
      : { contains: keyword, mode: Prisma.QueryMode.insensitive as Prisma.QueryMode }; // Explicit cast if needed

    // Integrated search (searches id, name, email, nickname)
    if (!filter.keywordType || filter.keywordType === "integrated") {
        where.OR = [
            { userId: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
            { name: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
            { email: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
            { nickname: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
            { phone: { contains: keyword } },
            { mobile: { contains: keyword } },
        ];
    } else {
        // Specific field search
        if (filter.keywordType === "id") where.userId = condition;
        else if (filter.keywordType === "name") where.name = condition;
        else if (filter.keywordType === "email") where.email = condition;
        else if (filter.keywordType === "nickname") where.nickname = condition;
        else if (filter.keywordType === "phone") where.phone = condition;
        else if (filter.keywordType === "mobile") where.mobile = condition;
    }
  }

  // Order By
  let orderByClause: Prisma.AdminOrderByWithRelationInput = { createdAt: "desc" };
  
  if (orderBy === "date_asc") {
      orderByClause = { createdAt: "asc" };
  } else if (orderBy === "last_login_desc") {
      orderByClause = { lastLoginAt: "desc" };
  } else if (orderBy === "last_login_asc") {
      orderByClause = { lastLoginAt: "asc" };
  }

  try {
    const [total, items] = await Promise.all([
      prisma.admin.count({ where }),
      prisma.admin.findMany({
        where,
        orderBy: orderByClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return { success: true, total, items };
  } catch (error) {
    console.error("Failed to fetch admins:", error);
    return { success: false, error: "Failed to fetch admins", items: [], total: 0 };
  }
}

// ... existing imports
import bcrypt from "bcryptjs";

// ... existing types and getAdminsAction

export async function createAdminAction(data: Omit<Prisma.AdminUncheckedCreateInput, 'passwordHash'> & { password?: string }) {
    try {
        const { password, ...rest } = data;
        
        let passwordHash = "";
        if (password) {
            passwordHash = await bcrypt.hash(password, 12);
        }
        
        const admin = await prisma.admin.create({
            data: {
                ...rest,
                passwordHash,
                type: rest.type || AdminType.SUB, // Default to SUB
            },
        });
        
        return { success: true, admin };
    } catch (error) {
        console.error("Failed to create admin:", error);
        // P2002: Unique constraint violation
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
             return { success: false, error: "이미 사용 중인 아이디입니다." };
        }
        return { success: false, error: "운영자 등록에 실패했습니다." };
    }
}

export async function updateAdminAction(id: string, data: Prisma.AdminUncheckedUpdateInput & { password?: string }) {
    try {
        const { password, ...rest } = data;
        const updateData: Prisma.AdminUncheckedUpdateInput = { ...rest };
        
        if (password) {
             updateData.passwordHash = await bcrypt.hash(password, 12);
        }

        const admin = await prisma.admin.update({
            where: { id },
            data: updateData,
        });

        return { success: true, admin };
    } catch (error) {
        console.error("Failed to update admin:", error);
        return { success: false, error: "운영자 수정에 실패했습니다." };
    }
}

export async function deleteAdminsAction(ids: string[]) {
    try {
        await prisma.admin.deleteMany({
            where: {
                id: { in: ids },
                type: { not: AdminType.SUPER }, // Prevent deleting SUPER admin via bulk action if needed, though usually handled by UI or policy
            },
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to delete admins:", error);
        return { success: false, error: "운영자 삭제에 실패했습니다." };
    }
}

export async function getAdminByIdAction(id: string) {
    try {
        const admin = await prisma.admin.findUnique({
            where: { id },
             include: { supplier: true },
        });
        return { success: true, admin };
    } catch (error) {
        console.error("Failed to fetch admin:", error);
        return { success: false, error: "운영자 정보를 불러오는데 실패했습니다." };
    }
}


export async function checkAdminIdAction(userId: string) {
    try {
        if (!userId) return { success: false, error: "ID is required" };
        
        const count = await prisma.admin.count({
            where: { userId },
        });

        return { success: true, exists: count > 0 };
    } catch (error) {
        console.error("Failed to check admin ID:", error);
        return { success: false, error: "중복 확인 중 오류가 발생했습니다." };
    }
}
