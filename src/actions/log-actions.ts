"use server";

import { prisma } from "@/lib/prisma";

export async function getErrorLogsAction(params?: { take?: number; skip?: number; level?: string }) {
    try {
        const take = params?.take || 100;
        const skip = params?.skip || 0;
        
        const logs = await prisma.errorLog.findMany({
            where: params?.level ? { level: params.level } : undefined,
            orderBy: { createdAt: 'desc' },
            take,
            skip,
        });
        
        const totalCount = await prisma.errorLog.count({
            where: params?.level ? { level: params.level } : undefined,
        });

        return { success: true, logs, totalCount };
    } catch (error) {
        console.error("Error fetching logs:", error);
        return { success: false, message: "로그를 불러오는 중 오류가 발생했습니다." };
    }
}

export async function deleteAllErrorLogsAction() {
    try {
        await prisma.errorLog.deleteMany({});
        return { success: true, message: "모든 에러 로그가 삭제되었습니다." };
    } catch (error) {
        console.error("Error deleting logs:", error);
        return { success: false, message: "로그 삭제 중 오류가 발생했습니다." };
    }
}
