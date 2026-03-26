"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Fetch Banners for Admin List ---
export async function getBannersAction(
    page: number = 1,
    pageSize: number = 10,
    searchParams?: {
        keyword?: string;
        targetGroup?: string;
        isActive?: string; // 'all' | 'active' | 'inactive'
        sort?: string;
    }
) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const where: any = {};

        if (searchParams?.targetGroup && searchParams.targetGroup !== 'all') {
            where.targetGroup = searchParams.targetGroup;
        }

        if (searchParams?.isActive && searchParams.isActive !== 'all') {
            where.isActive = searchParams.isActive === 'active';
        }

        if (searchParams?.keyword) {
            where.title = { contains: searchParams.keyword, mode: 'insensitive' };
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const orderBy: any = {};
        switch (searchParams?.sort) {
            case 'orderAsc':
                orderBy.displayOrder = 'asc';
                break;
            case 'orderDesc':
                orderBy.displayOrder = 'desc';
                break;
            case 'regAsc':
                orderBy.createdAt = 'asc';
                break;
            case 'regDesc':
            default:
                orderBy.createdAt = 'desc';
                break;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const totalCount = await (prisma as any).banner.count({ where });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const items = await (prisma as any).banner.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy,
        });

        return { success: true, items, totalCount };
    } catch (error) {
        console.error("Error fetching banners:", error);
        return { success: false, items: [], totalCount: 0 };
    }
}

// --- Fetch Single Banner for Edit ---
export async function getBannerByIdAction(id: string) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const banner = await (prisma as any).banner.findUnique({
            where: { id }
        });
        if (!banner) return { success: false, error: "배너를 찾을 수 없습니다." };
        return { success: true, banner };
    } catch (error) {
        console.error("Error fetching banner:", error);
        return { success: false, error: "오류가 발생했습니다." };
    }
}

// --- Create Banner ---
export async function createBannerAction(data: {
    title: string;
    description?: string;
    pcImage: string;
    mobileImage: string;
    linkUrl?: string;
    displayOrder: number;
    isActive: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    targetGroup: string;
}) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const existingBanner = await (prisma as any).banner.findFirst({
            where: {
                targetGroup: data.targetGroup,
                displayOrder: data.displayOrder
            }
        });
        
        if (existingBanner) {
            // 밀어내기 (Shift down)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (prisma as any).banner.updateMany({
                where: {
                    targetGroup: data.targetGroup,
                    displayOrder: { gte: data.displayOrder }
                },
                data: {
                    displayOrder: { increment: 1 }
                }
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newBanner = await (prisma as any).banner.create({
            data: {
                title: data.title,
                description: data.description,
                pcImage: data.pcImage,
                mobileImage: data.mobileImage,
                linkUrl: data.linkUrl,
                displayOrder: data.displayOrder,
                isActive: data.isActive,
                startDate: data.startDate,
                endDate: data.endDate,
                targetGroup: data.targetGroup,
            }
        });
        revalidatePath('/admin/products/banners');
        revalidatePath('/', 'layout'); // Storefront 캐시 초기화
        return { success: true, message: "배너가 등록되었습니다.", bannerId: newBanner.id };
    } catch (error) {
        console.error("Error creating banner:", error);
        return { success: false, message: "배너 등록 중 오류가 발생했습니다." };
    }
}

// --- Update Banner ---
export async function updateBannerAction(id: string, data: {
    title?: string;
    description?: string;
    pcImage?: string;
    mobileImage?: string;
    linkUrl?: string;
    displayOrder?: number;
    isActive?: boolean;
    startDate?: Date | null;
    endDate?: Date | null;
    targetGroup?: string;
}) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const currentBanner = await (prisma as any).banner.findUnique({ where: { id } });
        if (!currentBanner) return { success: false, message: "배너를 찾을 수 없습니다." };

        const targetGroupToCheck = data.targetGroup || currentBanner.targetGroup;
        const displayOrderToCheck = data.displayOrder !== undefined ? data.displayOrder : currentBanner.displayOrder;

        if (targetGroupToCheck !== currentBanner.targetGroup || displayOrderToCheck !== currentBanner.displayOrder) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const existingBanner = await (prisma as any).banner.findFirst({
                where: {
                    targetGroup: targetGroupToCheck,
                    displayOrder: displayOrderToCheck,
                    id: { not: id } // Exclude current banner
                }
            });
            if (existingBanner) {
                // 밀어내기 (Shift down)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await (prisma as any).banner.updateMany({
                    where: {
                        targetGroup: targetGroupToCheck,
                        displayOrder: { gte: displayOrderToCheck },
                        id: { not: id }
                    },
                    data: {
                        displayOrder: { increment: 1 }
                    }
                });
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (prisma as any).banner.update({
            where: { id },
            data
        });
        revalidatePath('/admin/products/banners');
        revalidatePath('/admin/products/banners/[id]', 'page');
        revalidatePath('/', 'layout'); // Storefront 캐시 초기화
        return { success: true, message: "배너가 수정되었습니다." };
    } catch (error) {
        console.error("Error updating banner:", error);
        return { success: false, message: "배너 수정 중 오류가 발생했습니다." };
    }
}

// --- Delete Banners ---
export async function deleteBannersAction(ids: string[]) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (prisma as any).banner.deleteMany({
            where: { id: { in: ids } }
        });
        revalidatePath('/admin/products/banners');
        revalidatePath('/', 'layout'); // Storefront 캐시 초기화
        return { success: true, message: "선택한 배너가 삭제되었습니다." };
    } catch (error) {
        console.error("Error deleting banners:", error);
        return { success: false, message: "배너 삭제 중 오류가 발생했습니다." };
    }
}

// --- Fetch Active Banners (Storefront) ---
export async function getActiveBannersAction(targetGroup: string) {
    try {
        const now = new Date();
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const banners = await (prisma as any).banner.findMany({
            where: {
                targetGroup,
                isActive: true,
                // Time window check: if startDate is set, now must be >= startDate. If endDate is set, now must be <= endDate.
                OR: [
                    { startDate: null, endDate: null },
                    { startDate: { lte: now }, endDate: null },
                    { startDate: null, endDate: { gte: now } },
                    { startDate: { lte: now }, endDate: { gte: now } }
                ]
            },
            orderBy: {
                displayOrder: 'asc'
            }
        });
        
        return { success: true, banners };
    } catch (error) {
        console.error("Error fetching active banners for storefront:", error);
        return { success: false, banners: [] };
    }
}
