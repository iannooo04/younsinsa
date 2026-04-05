"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function getLikeCountsAction(userId: string | undefined | null) {
    if (!userId) {
        return { itemsCount: 0, brandsCount: 0 };
    }

    try {
        const userInfo = await prisma.userInfo.findUnique({
            where: { userId: userId },
            select: { id: true }
        });

        if (!userInfo) return { itemsCount: 0, brandsCount: 0 };

        const itemsCount = await prisma.wishlistItem.count({
            where: { userId: userInfo.id }
        });

        const brandsCount = 0; // Brand Wishlist is not implemented in schema yet

        return { itemsCount, brandsCount };
    } catch (error) {
        console.error("Failed to fetch like counts:", error);
        return { itemsCount: 0, brandsCount: 0 };
    }
}

export async function getUserLikedProductIdsAction() {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: true, likedIds: [] };
    }

    try {
        const userInfo = await prisma.userInfo.findUnique({
            where: { userId: session.user.id },
            select: { id: true }
        });

        if (!userInfo) return { success: true, likedIds: [] };

        const likes = await prisma.wishlistItem.findMany({
            where: { userId: userInfo.id },
            select: { productId: true }
        });

        return { success: true, likedIds: likes.map(l => l.productId) };
    } catch (error) {
        console.error("Failed to fetch liked product ids:", error);
        return { success: false, error: "Failed to fetch liked ids", likedIds: [] };
    }
}

export async function toggleProductLikeAction(productId: string) {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, error: "Unauthorized", requireLogin: true };
    }

    try {
        const userInfo = await prisma.userInfo.findUnique({
            where: { userId: session.user.id },
            select: { id: true }
        });

        if (!userInfo) return { success: false, error: "일반 회원 전용 기능이거나 회원 정보가 없습니다. (관리자 계정은 찜하기를 사용할 수 없습니다.)" };

        const existing = await prisma.wishlistItem.findUnique({
            where: {
                userId_productId: {
                    userId: userInfo.id,
                    productId: productId
                }
            }
        });

        if (existing) {
            // Un-like
            await prisma.wishlistItem.delete({
                where: { id: existing.id }
            });
            return { success: true, isLiked: false };
        } else {
            // Like
            await prisma.wishlistItem.create({
                data: {
                    userId: userInfo.id,
                    productId: productId
                }
            });
            return { success: true, isLiked: true };
        }
    } catch (error) {
        console.error("Failed to toggle product like:", error);
        return { success: false, error: "찜하기 처리 중 서버 오류가 발생했습니다." };
    }
}

export async function getUserLikedProductsAction() {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, items: [] };
    }

    try {
        const userInfo = await prisma.userInfo.findUnique({
            where: { userId: session.user.id },
            select: { id: true }
        });

        if (!userInfo) return { success: false, items: [] };

        const wishlist = await prisma.wishlistItem.findMany({
            where: { userId: userInfo.id },
            orderBy: { createdAt: 'desc' },
            include: {
                product: {
                    include: {
                        brand: true,
                        images: {
                            orderBy: { order: 'asc' },
                            take: 1
                        }
                    }
                }
            }
        });

        const products = wishlist.map(w => {
            const item = w.product;
            const mainImage = item.images.length > 0 ? item.images[0] : null;
            return {
                id: item.id,
                brand: item.brand?.name || '기타',
                name: item.name,
                price: item.price,
                originalPrice: item.consumerPrice > 0 ? item.consumerPrice : item.price,
                discount: item.consumerPrice > item.price ? Math.round(((item.consumerPrice - item.price) / item.consumerPrice) * 100) : 0,
                likes: 0,
                rating: 0,
                reviews: 0,
                image: mainImage ? mainImage.url : 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80',
                badges: [],
                saleStatus: item.saleStatusPC,
            };
        });

        return { success: true, items: products };
    } catch (error) {
        console.error("Failed to fetch liked products:", error);
        return { success: false, items: [] };
    }
}
