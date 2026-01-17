"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Fetch Shipping Policies (Dropdown) ---
export async function getShippingPoliciesAction() {
    try {
        const policies = await prisma.shippingPolicy.findMany({
            select: { id: true, name: true },
            orderBy: { id: 'asc' }
        });
        return { success: true, items: policies };
    } catch (error) {
        console.error("Error fetching shipping policies:", error);
        return { success: false, items: [] };
    }
}

// --- Bulk Update Product Shipping Policy ---
export async function updateProductShippingPolicyAction(productIds: string[], policyId: number) {
    try {
        await prisma.product.updateMany({
            where: { id: { in: productIds } },
            data: { shippingPolicyId: policyId }
        });
        revalidatePath('/admin/products/shipping');
        revalidatePath('/admin/products');
        return { success: true, message: "배송비 설정이 수정되었습니다." };
    } catch (error) {
        console.error("Error updating product shipping policy:", error);
        return { success: false, message: "배송비 설정 수정 중 오류가 발생했습니다." };
    }
}
