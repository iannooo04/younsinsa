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
    startDate?: Date;
    endDate?: Date;
    searchType?: string;
};

export async function getFaqsAction(params: GetFaqsParams) {
    try {
        const { keyword, category, mallId = 'KR', isBest, page = 1, pageSize = 10, startDate, endDate, searchType } = params;

        const where: Prisma.FaqWhereInput = {
            mallId
        };
        
        if (category && category !== 'all') {
            where.category = category;
        }

        if (isBest) {
            where.isBest = true;
        }

        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) where.createdAt.gte = startDate;
            if (endDate) {
                // Ensure end date includes the entire day
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                where.createdAt.lte = end;
            }
        }

        if (keyword) {
            if (searchType === 'subject') {
                where.question = { contains: keyword, mode: 'insensitive' };
            } else if (searchType === 'content') {
                 // Assuming content maps to question as well for now, or if there is a content field, use that.
                 // Based on schema, FAQs usually have question and answer.
                 where.question = { contains: keyword, mode: 'insensitive' };
            } else if (searchType === 'answer') {
                where.answer = { contains: keyword, mode: 'insensitive' };
            } else {
                // integrated or default
                where.OR = [
                    { question: { contains: keyword, mode: 'insensitive' } },
                    { answer: { contains: keyword, mode: 'insensitive' } }
                ];
            }
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
