"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSearchDisplaySettingsAction() {
    try {
        let settings = await prisma.searchPageDisplaySettings.findFirst();

        if (!settings) {
            settings = await prisma.searchPageDisplaySettings.create({
                data: {
                    sortBy: "recent",
                    searchConditions: [
                        "s-keyword", 
                        "s-category", 
                        "s-brand", 
                        "s-price", 
                        "s-free", 
                        "s-recent", 
                        "s-color"
                    ],
                    pcTheme: "default",
                    mobileTheme: "default"
                }
            });
        }

        return { success: true, settings };
    } catch (error) {
        console.error("Error fetching search display settings:", error);
        return { success: false, settings: null };
    }
}

export async function updateSearchDisplaySettingsAction(data: {
    sortBy: string;
    searchConditions: string[];
    pcTheme: string;
    mobileTheme: string;
}) {
    try {
        // Since we assume singleton-like behavior, finding the first one is enough.
        // Or update a known ID if we enforce always ID=1. But findFirst is safer if it fluctuates.
        const first = await prisma.searchPageDisplaySettings.findFirst();

        if (first) {
            await prisma.searchPageDisplaySettings.update({
                where: { id: first.id },
                data: {
                    sortBy: data.sortBy,
                    searchConditions: data.searchConditions,
                    pcTheme: data.pcTheme,
                    mobileTheme: data.mobileTheme
                }
            });
        } else {
             await prisma.searchPageDisplaySettings.create({
                data: {
                    sortBy: data.sortBy,
                    searchConditions: data.searchConditions,
                    pcTheme: data.pcTheme,
                    mobileTheme: data.mobileTheme
                }
            });
        }

        revalidatePath('/admin/products/search-display');
        return { success: true, message: "저장되었습니다." };
    } catch (error) {
        console.error("Error updating search display settings:", error);
        return { success: false, message: "저장 중 오류가 발생했습니다." };
    }
}
