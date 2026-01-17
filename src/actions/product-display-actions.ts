"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { MallType, Prisma } from "@/generated/prisma";

export type MainPageDisplayGroupWithProducts = Prisma.MainPageDisplayGroupGetPayload<{}>;

// --- Fetch Main Page Display Groups ---
export async function getMainPageDisplayGroupsAction(
    page: number = 1,
    pageSize: number = 10,
    searchParams?: {
        mallType?: string; // 'PC' | 'MOBILE' | 'ALL'
        searchType?: string; // 'name' | 'desc'
        keyword?: string;
        startDate?: string;
        endDate?: string;
        dateType?: string; // 'regDate' | 'modDate'
    }
) {
    try {
        const where: Prisma.MainPageDisplayGroupWhereInput = {};

        // Mall Type Filter
        if (searchParams?.mallType && searchParams.mallType !== 'ALL') {
            where.mallType = searchParams.mallType as MallType;
        }

        // Keyword Filter
        if (searchParams?.keyword) {
            if (searchParams.searchType === 'name') {
                where.name = { contains: searchParams.keyword, mode: 'insensitive' };
            } else if (searchParams.searchType === 'desc') {
                where.description = { contains: searchParams.keyword, mode: 'insensitive' };
            } else {
                // Default search both
                where.OR = [
                    { name: { contains: searchParams.keyword, mode: 'insensitive' } },
                    { description: { contains: searchParams.keyword, mode: 'insensitive' } }
                ];
            }
        }

        // Date Filter
        if (searchParams?.startDate && searchParams?.endDate) {
            const start = new Date(searchParams.startDate);
            const end = new Date(searchParams.endDate);
            end.setHours(23, 59, 59, 999);

            if (searchParams.dateType === 'modDate') {
                where.updatedAt = { gte: start, lte: end };
            } else {
                where.createdAt = { gte: start, lte: end };
            }
        }

        const totalCount = await prisma.mainPageDisplayGroup.count({ where });
        const items = await prisma.mainPageDisplayGroup.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        });

        return { success: true, items: items, totalCount };
    } catch (error) {
        console.error("Error fetching main page display groups:", error);
        return { success: false, items: [], totalCount: 0 };
    }
}

// --- Delete Main Page Display Groups ---
export async function deleteMainPageDisplayGroupsAction(ids: number[]) {
    try {
        await prisma.mainPageDisplayGroup.deleteMany({
            where: { id: { in: ids } }
        });
        revalidatePath('/admin/products/main-display');
        return { success: true, message: "선택한 분류가 삭제되었습니다." };
    } catch (error) {
        console.error("Error deleting main page display groups:", error);
        return { success: false, message: "삭제 중 오류가 발생했습니다." };
    }
}
