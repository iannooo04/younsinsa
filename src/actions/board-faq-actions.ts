'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma';

export type GetFaqsParams = {
    keyword?: string;
    category?: string;
    mallId?: string;
    isBest?: boolean;
    page?: number;
    pageSize?: number;
};

export async function getFaqsAction(params: GetFaqsParams) {
    try {
        const { keyword, category, mallId = 'KR', isBest, page = 1, pageSize = 10 } = params;

        const where: Prisma.FaqWhereInput = {
            mallId
        };
        
        if (category && category !== 'all') {
            where.category = category;
        }

        if (isBest) {
            where.isBest = true;
        }

        if (keyword) {
            where.OR = [
                { question: { contains: keyword, mode: 'insensitive' } },
                { answer: { contains: keyword, mode: 'insensitive' } }
            ];
        }

        const skip = (page - 1) * pageSize;

        const [faqs, total] = await Promise.all([
            prisma.faq.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.faq.count({ where })
        ]);

        return {
            success: true,
            items: faqs,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize)
        };

    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return { success: false, error: "FAQ 목록을 불러오는데 실패했습니다." };
    }
}

export async function createFaqAction(data: {
    mallId: string;
    category: string;
    question: string;
    answer: string;
    isBest?: boolean;
}) {
    try {
        await prisma.faq.create({
            data: {
                mallId: data.mallId || 'KR',
                category: data.category,
                question: data.question,
                answer: data.answer,
                isBest: data.isBest || false,
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Error creating FAQ:", error);
        return { success: false, error: "FAQ 등록에 실패했습니다." };
    }
}

export async function deleteFaqsAction(ids: string[]) {
    try {
        if (!ids || ids.length === 0) return { success: false };
        
        await prisma.faq.deleteMany({
            where: { id: { in: ids } }
        });
        return { success: true };
    } catch {
        return { success: false, error: "삭제 실패" };
    }
}
