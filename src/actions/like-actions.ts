"use server";

import prisma from "@/lib/prisma";

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
