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

        const totalCount = await prisma.mainPageDisplayGroup.count({ where });
        const items = await prisma.mainPageDisplayGroup.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy,
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

// --- Fetch Exposed Main Page Display Groups (Frontend) ---
export async function getPublicMainDisplayGroupsAction(mallType: MallType = 'PC') {
    try {
        const groups = await prisma.mainPageDisplayGroup.findMany({
            where: {
                mallType,
                isExposed: true
            },
            orderBy: {
                createdAt: 'asc' // Or another order if needed
            }
        });
        return { success: true, groups };
    } catch (error) {
        console.error("Error fetching public main display groups:", error);
        return { success: false, groups: [] };
    }
}

// --- Fetch Products for a Display Group ---
export async function getDisplayGroupProductsAction(groupId: number) {
    try {
        const group = await prisma.mainPageDisplayGroup.findUnique({
            where: { id: groupId }
        });

        if (!group || !group.productIds) return { success: true, products: [] };

        const productIds = group.productIds as string[];
        if (productIds.length === 0) return { success: true, products: [] };

        const items = await prisma.product.findMany({
            where: {
                id: { in: productIds },
                displayStatusPC: 'DISPLAY',
                deletedAt: null
            },
            include: {
                brand: true,
                images: {
                    orderBy: { order: 'asc' },
                    take: 1
                }
            }
        });

        // Sort items back to the order in productIds
        const sortedItems = productIds.map(id => items.find(item => item.id === id)).filter(Boolean);

        // Format for frontend
        const products = sortedItems.map(item => {
            if (!item) return null;
            const mainImage = item.images[0];
            return {
                id: item.id,
                name: item.name,
                image: mainImage ? mainImage.url : '/placeholder.png',
                price: item.price,
                consumerPrice: item.consumerPrice,
                discountRate: item.consumerPrice > item.price 
                    ? Math.round(((item.consumerPrice - item.price) / item.consumerPrice) * 100) 
                    : 0,
                brandName: item.brand?.name || 'Brand',
            };
        }).filter((item): item is NonNullable<typeof item> => item !== null);

        return { success: true, products };
    } catch (error) {
        console.error("Error fetching display group products:", error);
        return { success: false, products: [] };
    }
}
