import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";

export type CategoryWithChildren = Prisma.CategoryGetPayload<{
    include: {
        _count: {
            select: {
                products: true;
                children: true;
            };
        };
        parent: true;
    };
}>;

export async function getCategories() {
    return prisma.category.findMany({
        include: {
            _count: {
                select: {
                    products: true,
                    children: true,
                },
            },
            parent: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function createCategory(name: string, parentId?: string, slug?: string, imageUrl?: string) {
    // Find the max code to increment
    const lastCategory = await prisma.category.findFirst({
        where: {
            code: { not: null },
        },
        orderBy: {
            code: 'desc',
        },
    });

    let nextCode = "100001";
    if (lastCategory?.code) {
        const lastCodeNum = parseInt(lastCategory.code, 10);
        if (!isNaN(lastCodeNum)) {
            nextCode = (lastCodeNum + 1).toString();
        }
    }

    const data: Prisma.CategoryCreateInput = {
        name,
        code: nextCode,
        slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || nextCode,
        imageUrl: imageUrl || null,
        parent: parentId ? { connect: { id: parentId } } : undefined,
    };

    return prisma.category.create({ data });
}

export async function deleteCategory(id: string) {
    // Option: check for children or products before deleting
    // For now, we rely on onDelete restrictions or cascade if configured. 
    // schema says: products -> categoryId (no cascade on delete typically unless specified).
    // Category self-relation: children -> parent (onDelete: SetNull usually or NoAction).
    // Let's just try delete.
    return prisma.category.delete({
        where: { id },
    });
}
