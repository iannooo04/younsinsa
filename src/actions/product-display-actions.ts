"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { MallType, Prisma } from "@/generated/prisma";

export type MainPageDisplayGroupWithProducts = Prisma.MainPageDisplayGroupGetPayload<{}>;

// --- Fetch Main Page Display Groups ---
export async function getMainPageDisplayGroupsAction(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _page: number = 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _pageSize: number = 10,
    searchParams?: {
        mallType?: string; // 'PC' | 'MOBILE' | 'ALL'
        searchType?: string; // 'name' | 'desc'
        keyword?: string;
        startDate?: string;
        endDate?: string;
        dateType?: string; // 'regDate' | 'modDate'
        displayStatus?: string; // 'all' | 'exposed' | 'hidden'
        sort?: string; // 'regDesc', 'regAsc', 'nameDesc', 'nameAsc', 'themeDesc', 'themeAsc'
    }
) {
    try {
        const where: Prisma.MainPageDisplayGroupWhereInput = {};

        // Mall Type Filter
        if (searchParams?.mallType && searchParams.mallType !== 'ALL') {
            where.mallType = searchParams.mallType as MallType;
        }

        // Display Status Filter
        if (searchParams?.displayStatus && searchParams.displayStatus !== 'all') {
            where.isExposed = searchParams.displayStatus === 'exposed';
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

        // Sorting Logic
        const orderBy: Prisma.MainPageDisplayGroupOrderByWithRelationInput = {};
        switch (searchParams?.sort) {
            case 'regAsc':
                orderBy.createdAt = 'asc';
                break;
            case 'nameDesc':
                orderBy.name = 'desc';
                break;
            case 'nameAsc':
                orderBy.name = 'asc';
                break;
            case 'themeDesc':
                orderBy.themeName = 'desc';
                break;
            case 'themeAsc':
                orderBy.themeName = 'asc';
                break;
            case 'regDesc':
            default:
                orderBy.createdAt = 'desc';
                break;
        }

        // Mock Data for User Request
        const mockItems = [
            {
                id: 4,
                mallType: 'PC' as MallType,
                name: 'New Arrivals',
                description: '',
                themeName: '상단 상품진열',
                isExposed: true,
                createdAt: new Date('2025-12-02'),
                updatedAt: new Date('2026-01-20'),
                replaceCode: "{=includeWidget('goods/_goods_display_main.html','sno','1')}"
            },
            {
                id: 3,
                mallType: 'PC' as MallType,
                name: 'Best Sellers',
                description: '',
                themeName: '하단 상품진열',
                isExposed: true,
                createdAt: new Date('2025-12-02'),
                updatedAt: new Date('2026-01-20'),
                replaceCode: "{=includeWidget('goods/_goods_display_main.html','sno','2')}"
            },
            {
                id: 2,
                mallType: 'MOBILE' as MallType,
                name: 'New Arrivals',
                description: '',
                themeName: '상단 상품진열',
                isExposed: true,
                createdAt: new Date('2025-12-02'),
                updatedAt: new Date('2026-01-20'),
                replaceCode: "{=includeWidget('goods/_goods_display_main.html','sno','3')}"
            },
            {
                id: 1,
                mallType: 'MOBILE' as MallType,
                name: 'Best Sellers',
                description: '',
                themeName: '하단 상품진열',
                isExposed: true,
                createdAt: new Date('2025-12-02'),
                updatedAt: new Date('2026-01-20'),
                replaceCode: "{=includeWidget('goods/_goods_display_main.html','sno','4')}"
            }
        ];

        return { success: true, items: mockItems, totalCount: 4 };

        /* 
        // Original Logic commented out for mock
        const totalCount = await prisma.mainPageDisplayGroup.count({ where });
        const items = await prisma.mainPageDisplayGroup.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy,
        });

        return { success: true, items: items, totalCount };
        */
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
