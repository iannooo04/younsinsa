import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";

export async function getProducts() {
    return prisma.product.findMany({
        include: {
            brand: true,
            category: true,
            images: true,
            supplier: true,
            _count: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function createProduct(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
        data,
        include: {
            brand: true,
            category: true,
            images: true,
        }
    });
}

export async function deleteProduct(id: string) {
    return prisma.product.delete({
        where: { id },
    });
}
