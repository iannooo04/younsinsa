"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Fetch Categories (Recursive or Flat based on need) ---
// For the select boxes, we likely need levels.
export async function getCategoryLevelsAction() {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                parentId: true,
                children: {
                    select: {
                        id: true,
                        name: true,
                        children: {
                            select: {
                                id: true,
                                name: true,
                                children: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            where: { parentId: null } // Top level
        });
        return { success: true, items: categories };
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { success: false, items: [] };
    }
}

// --- Fetch Category Display Settings ---
export async function getCategoryDisplaySettingsAction(categoryId: string) {
    try {
        // Find existing settings or return default structure
        const settings = await prisma.categoryDisplaySettings.findUnique({
            where: { categoryId }
        });

        // Also fetch product count for display
        const productCount = await prisma.product.count({
            where: { categoryId }
        });

        return { success: true, settings, productCount };
    } catch (error) {
        console.error("Error fetching category display settings:", error);
        return { success: false, settings: null, productCount: 0 };
    }
}

// --- Save Category Display Settings ---
export async function saveCategoryDisplaySettingsAction(
    categoryId: string, 
    data: {
        displayMethod: string;
        pcTheme?: string;
        mobileTheme?: string;
        // Add others as needed
    }
) {
    try {
        await prisma.categoryDisplaySettings.upsert({
            where: { categoryId },
            create: {
                categoryId,
                displayMethod: data.displayMethod,
                pcTheme: data.pcTheme,
                mobileTheme: data.mobileTheme
            },
            update: {
                displayMethod: data.displayMethod,
                pcTheme: data.pcTheme,
                mobileTheme: data.mobileTheme
            }
        });
        
        revalidatePath('/admin/products/category-display');
        return { success: true, message: "저장되었습니다." };
    } catch (error) {
        console.error("Error saving category display settings:", error);
        return { success: false, message: "저장 중 오류가 발생했습니다." };
    }
}

// --- Fetch Products in Category (Simple for display in list) ---
export async function getCategoryProductsAction(categoryId: string) {
    try {
        const products = await prisma.product.findMany({
            where: { categoryId },
            take: 20, // Limit for UI
            orderBy: { createdAt: 'desc' },
            include: { supplier: true }
        });
        
        return { success: true, items: products };
    } catch (error) {
         return { success: false, items: [] };
    }
}
