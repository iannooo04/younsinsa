import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";

export async function getProducts() {
    const products = await prisma.product.findMany({
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
    return JSON.parse(JSON.stringify(products));
}

export async function getProduct(id: string) {
    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            brand: true,
            category: true,
            images: true,
            supplier: true,
            options: {
                include: {
                    values: true
                }
            },
            variants: true,
        },
    });
    return JSON.parse(JSON.stringify(product));
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
