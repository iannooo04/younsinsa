"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type CategoryWithChildren = Awaited<ReturnType<typeof getCategoriesAction>>[number];

export async function getCategoriesAction() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        children: true, // Fetch immediate children
        displaySettings: true,
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryAction(id: string) {
    try {
        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                displaySettings: true,
                parent: true,
            }
        });
        return category;
    } catch (error) {
        console.error("Error fetching category:", error);
        return null;
    }
}

export async function createCategoryAction(data: {
  name: string;
  parentId?: string | null;
  code?: string;
  slug?: string;
}) {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        parentId: data.parentId || null,
        code: data.code,
        slug: data.slug,
        // Create default display settings
        displaySettings: {
            create: {
                displayMethod: "NORMAL",
                defaultSortType: "REG_DATE_DESC"
            }
        }
      },
    });
    revalidatePath("/admin/categories");
    return { success: true, category: newCategory };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function updateCategoryAction(id: string, data: any) {
    try {
        // Separate Category fields from settings if needed
        // For now assuming data contains flat fields or structured
        
        // This helps handle the complexity of the form. 
        // We might accept a partial Category input and update it.
        const { displaySettings, ...categoryData } = data;

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                ...categoryData,
                displaySettings: displaySettings ? {
                    upsert: {
                        create: displaySettings,
                        update: displaySettings
                    }
                } : undefined
            }
        });

        revalidatePath("/admin/categories");
        return { success: true, category: updatedCategory };
    } catch (error) {
        console.error("Error updating category:", error);
        return { success: false, error: "Failed to update category" };
    }
}

export async function deleteCategoryAction(id: string) {
    try {
        // Check for children
        const children = await prisma.category.count({ where: { parentId: id } });
        if (children > 0) {
            return { success: false, error: "하위 카테고리가 있는 카테고리는 삭제할 수 없습니다." };
        }
        
        // Check for products
        const products = await prisma.product.count({ where: { categoryId: id } });
        if (products > 0) {
            return { success: false, error: "상품이 연결된 카테고리는 삭제할 수 없습니다." };
        }

        await prisma.category.delete({ where: { id } });
        revalidatePath("/admin/categories");
        return { success: true };
    } catch (error) {
        console.error("Error deleting category:", error);
        return { success: false, error: "Failed to delete category" };
    }
}
