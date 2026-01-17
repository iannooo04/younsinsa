"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Fetch Brands ---
export async function getBrandsAction() {
    try {
        const brands = await prisma.brand.findMany({
            select: {
                id: true,
                name: true,
                parentId: true
            },
            orderBy: { name: 'asc' }
        });
        return { success: true, items: brands };
    } catch (error) {
        console.error("Error fetching brands:", error);
        return { success: false, items: [] };
    }
}

// --- Fetch Brand Display Settings ---
export async function getBrandDisplaySettingsAction(brandId: string) {
    try {
        const brand = await prisma.brand.findUnique({
            where: { id: brandId }
        });

        if (!brand) {
            return { success: false, message: "Brand not found" };
        }

        const productCount = await prisma.product.count({
            where: { brandId }
        });

        return { 
            success: true, 
            settings: {
                displayMethod: brand.productDisplayType || "NORMAL", // Default to NORMAL if null or empty
                pcTheme: brand.pcTheme,
                mobileTheme: brand.mobileTheme
            }, 
            productCount 
        };
    } catch (error) {
        console.error("Error fetching brand display settings:", error);
        return { success: false, settings: null, productCount: 0 };
    }
}

// --- Save Brand Display Settings ---
export async function saveBrandDisplaySettingsAction(
    brandId: string, 
    data: {
        displayMethod: string;
        pcTheme?: string;
        mobileTheme?: string;
    }
) {
    try {
        await prisma.brand.update({
            where: { id: brandId },
            data: {
                productDisplayType: data.displayMethod,
                pcTheme: data.pcTheme,
                mobileTheme: data.mobileTheme
            }
        });
        
        revalidatePath('/admin/products/brand-display');
        return { success: true, message: "저장되었습니다." };
    } catch (error) {
        console.error("Error saving brand display settings:", error);
        return { success: false, message: "저장 중 오류가 발생했습니다." };
    }
}

// --- Fetch Products in Brand ---
export async function getBrandProductsAction(brandId: string) {
    try {
        const products = await prisma.product.findMany({
            where: { brandId },
            take: 20, // Limit for UI
            orderBy: { createdAt: 'desc' },
            include: { supplier: true }
        });
        
        return { success: true, items: products };
    } catch (error) {
         return { success: false, items: [] };
    }
}
