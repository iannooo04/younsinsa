"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProductCommonInfosAction(searchParams: {
  title?: string;
  startDate?: string;
  endDate?: string;
  exposureType?: string;
  displayStatus?: string;
  progressStatus?: string; // 대기, 진행중, 종료
  productConditionType?: string;
}) {
  try {
    const { title, startDate, endDate, exposureType, displayStatus, progressStatus, productConditionType } = searchParams;

    const where: any = {};

    if (title) {
      where.title = { contains: title };
    }

    if (exposureType && exposureType !== "all") {
      where.exposureType = exposureType.toUpperCase();
    }

    if (displayStatus && displayStatus !== "all") {
      where.displayStatus = displayStatus === "visible" ? "DISPLAY" : "HIDDEN";
    }

    if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) where.createdAt.gte = new Date(startDate);
        if (endDate) where.createdAt.lte = new Date(endDate);
    }

    // progressStatus and productConditionType filtering would be more complex due to JSON or logic
    // For now, basic filtering

    const items = await prisma.productCommonInfo.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const now = new Date();
    const processedItems = items.map(item => {
        let status = "진행중";
        if (item.exposureType === "LIMITED") {
            if (item.startDate && item.startDate > now) status = "대기";
            else if (item.endDate && item.endDate < now) status = "종료";
        }

        // Apply progressStatus filter if provided
        return {
            ...item,
            progressStatus: status,
        };
    }).filter(item => {
        if (!progressStatus || progressStatus === "all") return true;
        if (progressStatus === "waiting") return item.progressStatus === "대기";
        if (progressStatus === "ongoing") return item.progressStatus === "진행중";
        if (progressStatus === "ended") return item.progressStatus === "종료";
        return true;
    });

    return { success: true, data: processedItems };
  } catch (error) {
    console.error("getProductCommonInfosAction error:", error);
    return { success: false, error: "데이터를 가져오는데 실패했습니다." };
  }
}

export async function deleteProductCommonInfosAction(ids: string[]) {
  try {
    await prisma.productCommonInfo.deleteMany({
      where: { id: { in: ids } },
    });
    revalidatePath("/admin/products/common-info");
    return { success: true, message: "삭제되었습니다." };
  } catch (error) {
    console.error("deleteProductCommonInfosAction error:", error);
    return { success: false, error: "삭제 중 오류가 발생했습니다." };
  }
}

export async function createProductCommonInfoAction(data: any) {
    try {
        await prisma.productCommonInfo.create({
            data: {
                title: data.title,
                exposureType: data.exposureType,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                displayStatus: data.displayStatus,
                productCondition: data.productCondition,
                exceptionCondition: data.exceptionCondition,
                contentPC: data.contentPC,
                contentMobile: data.contentMobile,
                isSameContent: data.isSameContent,
            }
        });
        revalidatePath("/admin/products/common-info");
        return { success: true };
    } catch (error) {
        console.error("createProductCommonInfoAction error:", error);
        return { success: false, error: "등록 중 오류가 발생했습니다." };
    }
}

export async function getProductCommonInfoAction(id: string) {
    try {
        const item = await prisma.productCommonInfo.findUnique({
            where: { id },
        });
        return { success: true, data: item };
    } catch (error) {
        console.error("getProductCommonInfoAction error:", error);
        return { success: false, error: "데이터를 가져오는데 실패했습니다." };
    }
}

export async function updateProductCommonInfoAction(id: string, data: any) {
    try {
        await prisma.productCommonInfo.update({
            where: { id },
            data: {
                title: data.title,
                exposureType: data.exposureType,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                displayStatus: data.displayStatus,
                productCondition: data.productCondition,
                exceptionCondition: data.exceptionCondition,
                contentPC: data.contentPC,
                contentMobile: data.contentMobile,
                isSameContent: data.isSameContent,
            }
        });
        revalidatePath("/admin/products/common-info");
        return { success: true };
    } catch (error) {
        console.error("updateProductCommonInfoAction error:", error);
        return { success: false, error: "수정 중 오류가 발생했습니다." };
    }
}
