"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Types ---
export type CartItemDTO = {
    id: string;
    productId: string;
    name: string;
    image: string;
    optionName: string | null;
    price: number;
    quantity: number;
    stock: number;
    isSoldOut: boolean;
    variantId: string | null;
};

// Helper to get UserInfo ID from User ID
async function getUserInfoId(userId: string): Promise<string | null> {
    const userInfo = await prisma.userInfo.findUnique({
        where: { userId: userId },
        select: { id: true }
    });
    return userInfo?.id || null;
}

// --- Add to Cart ---
export async function addToCartAction(
    userId: string | undefined, 
    productId: string,
    variantId?: string,
    quantity: number = 1
) {
    try {
        if (!userId) {
            return { success: false, message: "로그인이 필요합니다." };
        }

        const userInfoId = await getUserInfoId(userId);
        if (!userInfoId) {
             // Try to create UserInfo if missing? Or return error. 
             // Usually UserInfo is created on signup.
             return { success: false, message: "회원 정보를 찾을 수 없습니다." };
        }

        // Check if item already exists
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                userId: userInfoId,
                productId,
                variantId: variantId || null
            }
        });

        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity }
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    userId: userInfoId,
                    productId,
                    variantId: variantId || null,
                    quantity
                }
            });
        }

        revalidatePath('/orders/cart');
        return { success: true, message: "장바구니에 담겼습니다." };
    } catch (error) {
        console.error("Error adding to cart:", error);
        return { success: false, message: "장바구니 담기에 실패했습니다." };
    }
}

// --- Get Cart Items ---
export async function getCartItemsAction(userId: string | undefined) {
    try {
        if (!userId) return { success: true, items: [] };

        const userInfoId = await getUserInfoId(userId);
        if (!userInfoId) return { success: true, items: [] };

        const items = await prisma.cartItem.findMany({
            where: { userId: userInfoId },
            include: {
                product: {
                    include: {
                        images: {
                            orderBy: { order: 'asc' },
                            take: 1
                        },
                        brand: true
                    }
                },
                variant: {
                    include: {
                        optionValues: {
                            include: {
                                option: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });



        // Format Items
        const formattedItems: CartItemDTO[] = items.map(item => {
            const product = item.product;
            const mainImage = product.images[0]?.url || '/placeholder.png';
            
            let price = product.price;
            let stock = product.stockQuantity;
            let optionName: string | null = null;
            const name = product.name;

            if (item.variant) {
                if (item.variant.price) price = item.variant.price;
                stock = item.variant.stock;
                
                
                // Construct option name
                if (item.variant.optionValues && item.variant.optionValues.length > 0) {
                     optionName = item.variant.optionValues
                        .map(ov => `${ov.option.name}: ${ov.name}`)
                        .join(" / ");
                } else {
                    optionName = "옵션 있음"; 
                }
            } else {
                // Check if product has options but user selected none
            }

            return {
                id: item.id,
                productId: product.id,
                name: name,
                image: mainImage,
                optionName: optionName, 
                price: price,
                quantity: item.quantity,
                stock: stock,
                isSoldOut: stock <= 0,
                variantId: item.variantId
            };
        });

        return { success: true, items: formattedItems };

    } catch (error) {
        console.error("Error fetching cart items:", error);
        return { success: false, items: [] };
    }
}

// --- Update Cart Item Quantity ---
export async function updateCartItemAction(cartItemId: string, quantity: number) {
    try {
        if (quantity < 1) return { success: false, message: "수량은 1개 이상이어야 합니다." };

        await prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity }
        });

        revalidatePath('/orders/cart');
        return { success: true };
    } catch (error) {
        console.error("Error updating cart item:", error);
        return { success: false, message: "수량 변경에 실패했습니다." };
    }
}

// --- Remove Cart Items ---
export async function removeCartItemsAction(cartItemIds: string[]) {
    try {
        await prisma.cartItem.deleteMany({
            where: { id: { in: cartItemIds } }
        });

        revalidatePath('/orders/cart');
        return { success: true };
    } catch (error) {
        console.error("Error deleting cart items:", error);
        return { success: false, message: "삭제에 실패했습니다." };
    }
}
