"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBrandsAction() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        children: true, // Fetch immediate children
      },
    });
    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export async function getBrandAction(id: string) {
    try {
        const brand = await prisma.brand.findUnique({
            where: { id },
            include: {
                parent: true,
                recommendedProducts: {
                    include: {
                        product: {
                            include: {
                                supplier: true,
                            }
                        }
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        });
        return brand;
    } catch (error) {
        console.error("Error fetching brand:", error);
        return null;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createBrandAction(data: Record<string, any>) {
  try {
    const { recommendedProducts, ...createData } = data;

    const newBrand = await prisma.brand.create({
      data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(createData as any),
      },
    });

    if (recommendedProducts && recommendedProducts.length > 0) {
        await prisma.brandRecommendedProduct.createMany({
            data: recommendedProducts.map((rp: { productId: string; order?: number }, index: number) => ({
                brandId: newBrand.id,
                productId: rp.productId,
                order: rp.order ?? index
            }))
        });
    }

    revalidatePath("/admin/brands");
    return { success: true, brand: newBrand };
  } catch (error) {
    console.error("Error creating brand:", error);
    return { success: false, error: "Failed to create brand" };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateBrandAction(id: string, data: Record<string, any>) {
    try {
        // Handle recommendedProducts separately if passed
        const { recommendedProducts, ...updateData } = data;

        const updatedBrand = await prisma.brand.update({
            where: { id },
            data: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...(updateData as any),
            }
        });

        if (recommendedProducts) {
            // Bulk update recommended products
            // First delete existing
            await prisma.brandRecommendedProduct.deleteMany({
                where: { brandId: id }
            });
            // Then create new ones
            if (recommendedProducts.length > 0) {
                await prisma.brandRecommendedProduct.createMany({
                    data: recommendedProducts.map((rp: { productId: string; order?: number }, index: number) => ({
                        brandId: id,
                        productId: rp.productId,
                        order: rp.order ?? index
                    }))
                });
            }
        }

        revalidatePath("/admin/brands");
        return { success: true, brand: updatedBrand };
    } catch (error) {
        console.error("Error updating brand:", error);
        return { success: false, error: "Failed to update brand" };
    }
}

export async function deleteBrandAction(id: string) {
    try {
        // Check for children
        const children = await prisma.brand.count({ where: { parentId: id } });
        if (children > 0) {
            return { success: false, error: "하위 브랜드가 있는 브랜드는 삭제할 수 없습니다." };
        }
        
        // Check for products
        const products = await prisma.product.count({ where: { brandId: id } });
        if (products > 0) {
            return { success: false, error: "상품이 연결된 브랜드는 삭제할 수 없습니다." };
        }

        await prisma.brand.delete({ where: { id } });
        revalidatePath("/admin/brands");
        return { success: true };
    } catch (error) {
        console.error("Error deleting brand:", error);
        return { success: false, error: "Failed to delete brand" };
    }
}

export async function getBrandRecommendedProductsAction(brandId: string) {
    try {
        const recommended = await prisma.brandRecommendedProduct.findMany({
            where: { brandId },
            include: {
                product: {
                    include: {
                        supplier: true,
                    }
                }
            },
            orderBy: {
                order: 'asc'
            }
        });
        return recommended;
    } catch (error) {
        console.error("Error fetching recommended products:", error);
        return [];
    }
}
