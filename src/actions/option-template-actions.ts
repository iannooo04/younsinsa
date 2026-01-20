"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function getOptionTemplatesAction(
  page: number = 1,
  pageSize: number = 10,
  searchParams?: {
    supplierType?: string; // 'all', 'headquarters', 'supplier'
    searchType?: string;   // 'integrated', 'name'
    keyword?: string;
    displayType?: string;  // 'all', 'integrated', 'separated'
    dateType?: string;     // 'regDate', 'modDate'
    startDate?: string;
    endDate?: string;
  }
) {
  try {
    const where: Prisma.OptionTemplateWhereInput = {};

    // 1. Supplier Filter
    if (searchParams?.supplierType && searchParams.supplierType !== 'all') {
      if (searchParams.supplierType === 'headquarters') {
        where.supplierId = null; // Assuming null is headquarters
      } else if (searchParams.supplierType === 'supplier') {
        where.supplierId = { not: null };
      }
    }

    // 2. Keyword Filter
    if (searchParams?.keyword) {
      if (searchParams.searchType === 'name') {
        where.name = { contains: searchParams.keyword, mode: 'insensitive' };
      } else {
        // Integrated search
        where.OR = [
          { name: { contains: searchParams.keyword, mode: 'insensitive' } },
          { manageName: { contains: searchParams.keyword, mode: 'insensitive' } },
        ];
      }
    }

    // 3. Display Type Filter
    if (searchParams?.displayType && searchParams.displayType !== 'all') {
      where.type = searchParams.displayType;
    }

    // 4. Date Filter
    if (searchParams?.startDate && searchParams?.endDate) {
      const start = new Date(searchParams.startDate);
      const end = new Date(searchParams.endDate);
      // Adjust end date to end of day
      end.setHours(23, 59, 59, 999);

      if (searchParams.dateType === 'modDate') {
        where.updatedAt = { gte: start, lte: end };
      } else {
        where.createdAt = { gte: start, lte: end };
      }
    }

    const totalCount = await prisma.optionTemplate.count({ where });

    const items = await prisma.optionTemplate.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    });

    return { success: true, items, totalCount };
  } catch (error) {
    console.error("Error fetching option templates:", error);
    return { success: false, items: [], totalCount: 0 };
  }
}

export async function deleteOptionTemplatesAction(ids: string[]) {
  try {
    await prisma.optionTemplate.deleteMany({
      where: {
        id: { in: ids },
      },
    });
    revalidatePath('/admin/options');
    return { success: true, message: "삭제되었습니다." };
  } catch (error) {
    console.error("Error deleting option templates:", error);
    return { success: false, message: "삭제 중 오류가 발생했습니다." };
  }
}

export async function copyOptionTemplatesAction(ids: string[]) {
    try {
        const templates = await prisma.optionTemplate.findMany({
            where: { id: { in: ids } }
        });

        for (const template of templates) {
            // Generate a unique manageName
            let manageName = `${template.manageName}_copy`;
            let counter = 1;
            while (await prisma.optionTemplate.findUnique({ where: { manageName } })) {
                manageName = `${template.manageName}_copy${counter++}`;
            }

            await prisma.optionTemplate.create({
                data: {
                    manageName: manageName,
                    name: template.name,
                    type: template.type,
                    supplierId: template.supplierId,
                    supplierName: template.supplierName,
                    options: template.options ?? [],
                }
            });
        }
        
        revalidatePath('/admin/options');
        return { success: true, message: "복사되었습니다." };
    } catch (error) {
        console.error("Error copying option templates:", error);
        return { success: false, message: "복사 중 오류가 발생했습니다." };
    }
}
