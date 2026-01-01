import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";

export async function getBrands() {
    return prisma.brand.findMany({
        include: {
            _count: {
                select: {
                    products: true,
                },
            },
        },
        orderBy: {
            name: "asc", // or createdAt desc
        },
    });
}

export async function createBrand(name: string, slug?: string, logoUrl?: string, description?: string, category?: string, parentId?: string) {
    // Generate default slug if not provided
    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Ensure uniqueness? Prisma will throw if not unique. 
    // In categories we appended random/code. Brands don't have code.
    // For now we trust the user or handle unique error in UI.

    const data: Prisma.BrandCreateInput = {
        name,
        slug: finalSlug,
        category: category || null,
        logoUrl: logoUrl || null,
        description: description || null,
        parent: parentId ? { connect: { id: parentId } } : undefined,
    };

    return prisma.brand.create({ data });
}

export async function deleteBrand(id: string) {
    return prisma.brand.delete({
        where: { id },
    });
}
