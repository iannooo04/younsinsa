"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";
// import { SupplierStatus } from "@/generated/prisma"; // If needed

export type SupplierSearchFilter = {
    keywordType: "integrated" | "code" | "name" | "businessName" | "ceoName" | "email" | "phone";
    keyword: string;
    status?: "ALL" | "ACTIVE" | "SUSPENDED" | "WITHDRAWN";
};

export async function getSuppliersAction(params: {
    page?: number;
    pageSize?: number;
    orderBy?: "date_desc" | "date_asc" | "name_asc";
    filter?: SupplierSearchFilter;
}) {
  try {
    const { page = 1, pageSize = 10, orderBy = "date_desc", filter } = params;
    const skip = (page - 1) * pageSize;

    const where: Prisma.SupplierWhereInput = {};

    if (filter) {
        if (filter.status && filter.status !== "ALL") {
            where.status = filter.status;
        }

        if (filter.keyword) {
            const contains = { contains: filter.keyword, mode: "insensitive" as const };
            
            switch (filter.keywordType) {
                case "code": where.code = contains; break;
                case "name": where.name = contains; break;
                case "businessName": where.businessName = contains; break;
                case "ceoName": where.ceoName = contains; break;
                case "email": where.email = contains; break;
                case "phone": where.phone = contains; break;
                case "integrated":
                default:
                    where.OR = [
                        { name: contains },
                        { code: contains },
                        { businessName: contains },
                        { ceoName: contains },
                        { email: contains },
                        { phone: contains },
                    ];
                    break;
            }
        }
    }

    const [total, items] = await prisma.$transaction([
      prisma.supplier.count({ where }),
      prisma.supplier.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: 
            orderBy === "date_desc" ? { createdAt: "desc" } :
            orderBy === "date_asc" ? { createdAt: "asc" } :
            orderBy === "name_asc" ? { name: "asc" } : 
            { createdAt: "desc" },
      }),
    ]);

    return { success: true, total, items };
  } catch (error) {
    console.error("Failed to fetch suppliers:", error);
    return { success: false, error: "Failed to fetch suppliers", items: [], total: 0 };
  }
}

type CreateSupplierData = Omit<Prisma.SupplierCreateInput, 'commissionRate' | 'shippingFee'> & {
  commissionRate?: number;
  shippingFee?: number;
};

export async function createSupplierAction(data: CreateSupplierData) {
  try {
    // Ensure required fields are present (Prisma will enforce at runtime)
    const supplier = await prisma.supplier.create({
      data: {
        ...data,
        commissionRate: data.commissionRate ?? 0,
        shippingFee: data.shippingFee ?? 0,
      },
    });
    return { success: true, supplier };
  } catch (error: unknown) {
    console.error("Failed to create supplier:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, error: "이미 존재하는 코드입니다." };
    }
    return { success: false, error: "공급사 등록에 실패했습니다." };
  }
}

type UpdateSupplierData = Prisma.SupplierUpdateInput;

export async function updateSupplierAction(id: string, data: UpdateSupplierData) {
  try {
    const supplier = await prisma.supplier.update({
      where: { id },
      data,
    });
    return { success: true, supplier };
  } catch (error: unknown) {
    console.error("Failed to update supplier:", error);
    return { success: false, error: "공급사 수정에 실패했습니다." };
  }
}

export async function deleteSuppliersAction(ids: string[]) {
    try {
        await prisma.supplier.deleteMany({
            where: { id: { in: ids } },
        });
        return { success: true };
    } catch (error) {
        console.error("Failed to delete suppliers:", error);
        return { success: false, error: "공급사 삭제에 실패했습니다." };
    }
}

export async function getSupplierByIdAction(id: string) {
    try {
        const supplier = await prisma.supplier.findUnique({
            where: { id },
        });
        return { success: true, supplier };
    } catch (error) {
        console.error("Failed to fetch supplier:", error);
        return { success: false, error: "공급사 정보를 불러오는데 실패했습니다." };
    }
}

export async function getSuppliersSimpleAction() {
    try {
        const suppliers = await prisma.supplier.findMany({
            select: { id: true, name: true, createdAt: true }
        });
        return { success: true, items: suppliers };
    } catch {
        return { success: false, items: [] };
    }
}
