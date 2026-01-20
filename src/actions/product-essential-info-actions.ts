"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function getEssentialInfoTemplatesAction() {
    try {
        const templates = await prisma.productEssentialInfoTemplate.findMany({
            include: {
                supplier: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return {
            success: true,
            items: templates.map(t => ({
                id: t.id,
                name: t.name,
                supplierId: t.supplierId,
                supplierName: t.supplier?.name || "본사",
                category: "-", // We could add a category field if needed, but for now we follow the UI
                items: t.items,
                regDate: t.createdAt.toISOString().split("T")[0],
                modDate: t.updatedAt.toISOString().split("T")[0],
            })),
        };
    } catch (error) {
        console.error("getEssentialInfoTemplatesAction error:", error);
        return { success: false, error: "필수정보를 불러오는데 실패했습니다." };
    }
}

export async function getEssentialInfoTemplateAction(id: string) {
    try {
        const template = await prisma.productEssentialInfoTemplate.findUnique({
            where: { id },
            include: {
                supplier: true,
            },
        });

        if (!template) return { success: false, error: "항목을 찾을 수 없습니다." };

        return {
            success: true,
            item: {
                id: template.id,
                name: template.name,
                supplierId: template.supplierId,
                supplierType: template.supplierId ? "supplier" : "headquarters",
                items: template.items,
            },
        };
    } catch (error) {
        console.error("getEssentialInfoTemplateAction error:", error);
        return { success: false, error: "데이터를 불러오는데 실패했습니다." };
    }
}

export async function createEssentialInfoTemplateAction(data: {
    name: string;
    supplierId?: string;
    items: Prisma.InputJsonValue;
}) {
    try {
        const template = await prisma.productEssentialInfoTemplate.create({
            data: {
                name: data.name,
                supplierId: data.supplierId || null,
                items: data.items,
            },
        });

        revalidatePath("/admin/products/info");
        return { success: true, item: template };
    } catch (error) {
        console.error("createEssentialInfoTemplateAction error:", error);
        return { success: false, error: "필수정보 생성에 실패했습니다." };
    }
}

export async function updateEssentialInfoTemplateAction(id: string, data: {
    name: string;
    supplierId?: string;
    items: Prisma.InputJsonValue;
}) {
    try {
        const template = await prisma.productEssentialInfoTemplate.update({
            where: { id },
            data: {
                name: data.name,
                supplierId: data.supplierId || null,
                items: data.items,
            },
        });

        revalidatePath("/admin/products/info");
        return { success: true, item: template };
    } catch (error) {
        console.error("updateEssentialInfoTemplateAction error:", error);
        return { success: false, error: "필수정보 수정에 실패했습니다." };
    }
}

export async function deleteEssentialInfoTemplatesAction(ids: string[]) {
    try {
        await prisma.productEssentialInfoTemplate.deleteMany({
            where: {
                id: { in: ids },
            },
        });

        revalidatePath("/admin/products/info");
        return { success: true, message: "삭제되었습니다." };
    } catch (error) {
        console.error("deleteEssentialInfoTemplatesAction error:", error);
        return { success: false, error: "삭제 중 오류가 발생했습니다." };
    }
}

export async function copyEssentialInfoTemplatesAction(ids: string[]) {
    try {
        const templates = await prisma.productEssentialInfoTemplate.findMany({
            where: { id: { in: ids } },
        });

        for (const template of templates) {
            await prisma.productEssentialInfoTemplate.create({
                data: {
                    name: `(복사) ${template.name}`,
                    supplierId: template.supplierId,
                    items: template.items as Prisma.InputJsonValue,
                },
            });
        }

        revalidatePath("/admin/products/info");
        return { success: true };
    } catch (error) {
        console.error("copyEssentialInfoTemplatesAction error:", error);
        return { success: false, error: "복사 중 오류가 발생했습니다." };
    }
}
