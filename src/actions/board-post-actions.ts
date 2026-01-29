'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma';

export type GetPostsParams = {
    page?: number;
    pageSize?: number;
    boardId?: string;
    dateType?: 'createdAt' | 'updatedAt';
    startDate?: Date;
    endDate?: Date;
    answerStatus?: string; // 'all', 'waiting', 'complete' etc
    searchType?: 'subject' | 'content' | 'writer' | 'nickname' | 'name' | 'id' | 'subject_content' | 'product_name' | 'product_code' | 'own_product_code';
    keyword?: string;
    sortBy?: 'num_desc' | 'num_asc' | 'date_desc' | 'date_asc';
};

export async function getPostsAction(params: GetPostsParams) {
    try {
        const { 
            page = 1, 
            pageSize = 10, 
            boardId,
            dateType = 'createdAt',
            startDate,
            endDate,
            answerStatus,
            searchType,
            keyword,
            sortBy
        } = params;

        const where: Prisma.PostWhereInput = {};

        // Board Filter
        if (boardId && boardId !== 'all') {
            where.boardId = boardId;
        }

        // Date Filter
        if (startDate || endDate) {
            // Effectively where['createdAt'] or where['updatedAt']
            const dateField = dateType === 'updatedAt' ? 'updatedAt' : 'createdAt';
            
            // However, TypeScript might complain about indexing with string on PostWhereInput if not cast or handled carefully.
            // But Prisma input types often have optional keys. Accessing them dynamically requires 'as keyof ...' or similar.
            // Simpler approach:
            
            where[dateField] = {};
            if (startDate) where[dateField]!.gte = startDate;
            if (endDate) where[dateField]!.lte = endDate;
        }

        // Answer Status Filter
        if (answerStatus && answerStatus !== 'all') {
             let status = answerStatus;
             if (answerStatus === 'waiting') status = 'WAITING';
             else if (answerStatus === 'complete') status = 'COMPLETE';
             else if (answerStatus === 'receipt') status = 'RECEIPT';
             
             where.answerStatus = status; 
        }

        // Keyword Search
        if (keyword) {
            const mode = 'insensitive';
            if (searchType === 'subject') {
                where.subject = { contains: keyword, mode };
            } else if (searchType === 'content') {
                where.content = { contains: keyword, mode };
            } else if (searchType === 'subject_content') {
                where.OR = [
                    { subject: { contains: keyword, mode } },
                    { content: { contains: keyword, mode } }
                ];
            } else if (searchType === 'writer') {
                where.OR = [
                     { authorName: { contains: keyword, mode } },
                     { author: { user: { name: { contains: keyword, mode } } } },
                     { author: { user: { nickname: { contains: keyword, mode } } } }
                ];
            } else if (searchType === 'name') {
                 where.OR = [
                     { authorName: { contains: keyword, mode } },
                     { author: { user: { name: { contains: keyword, mode } } } }
                 ];
            } else if (searchType === 'nickname') {
                 where.OR = [
                     { authorName: { contains: keyword, mode } },
                     { author: { user: { nickname: { contains: keyword, mode } } } }
                 ];
            } else if (searchType === 'id') {
                 where.author = { user: { username: { contains: keyword, mode } } };
            } else if (searchType === 'product_name') {
                 where.product = { name: { contains: keyword, mode } };
            } else if (searchType === 'product_code') {
                 where.product = { code: { contains: keyword, mode } };
            } else if (searchType === 'own_product_code') {
                 where.product = { customCode: { contains: keyword, mode } };
            } else {
                // Default search all
                 where.OR = [
                    { subject: { contains: keyword, mode } },
                    { content: { contains: keyword, mode } },
                    { authorName: { contains: keyword, mode } }
                ];
            }
        }

        const skip = (page - 1) * pageSize;

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: (sortBy === 'num_asc' || sortBy === 'date_asc') ? { createdAt: 'asc' } : { createdAt: 'desc' },
                include: {
                    board: { select: { name: true, boardId: true } },
                    author: { select: { user: { select: { name: true, nickname: true } } } },
                    category: { select: { name: true } }
                }
            }),
            prisma.post.count({ where })
        ]);

        // Transform for UI if needed
        const items = posts.map(post => ({
            id: post.id,
            boardName: post.board.name,
            subject: post.subject,
            author: post.author?.user 
                ? (post.author.user.nickname || post.author.user.name) 
                : (post.authorName || 'Guest'),
            createdAt: post.createdAt,
            views: post.views,
            answerStatus: post.answerStatus,
            // For checking reply/answer logic in UI
            isAnswered: !!post.answerStatus && post.answerStatus !== 'WAITING' 
        }));

        return {
            success: true,
            items,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize)
        };

    } catch (error) {
        console.error("Error fetching posts:", error);
        return { success: false, error: "게시글 목록을 불러오는데 실패했습니다." };
    }
}

export async function deletePostsAction(ids: string[]) {
    try {
        if (!ids || ids.length === 0) return { success: false, error: "선택된 게시글이 없습니다." };

        await prisma.post.deleteMany({
            where: { id: { in: ids } }
        });

        return { success: true };
    } catch (error) {
        console.error("Error deleting posts:", error);
        return { success: false, error: "게시글 삭제에 실패했습니다." };
    }
}

// Helper to get simple board list for dropdown
export async function getSimpleBoardListAction() {
    try {
        const boards = await prisma.board.findMany({
            select: { id: true, name: true, boardId: true },
            orderBy: { name: 'asc' }
        });
        return { success: true, list: boards };
    } catch {
        return { success: false, list: [] };
    }
}

export async function getPostAction(id: string) {
    try {
        const post = await prisma.post.findUnique({
            where: { id },
             include: {
                board: {
                    select: { id: true, name: true, boardId: true }
                }
            }
        });
        if (!post) return { success: false, error: "게시글을 찾을 수 없습니다." };
        return { success: true, post };
    } catch {
        return { success: false, error: "오류가 발생했습니다." };
    }
}

export async function createPostAction(data: {
    boardId: string;
    subject: string;
    content: string;
    authorName: string;
    isNotice: boolean;
    isSecret: boolean;
    answerStatus?: string;
}) {
    try {
        await prisma.post.create({
            data: {
                boardId: data.boardId,
                subject: data.subject,
                content: data.content,
                authorName: data.authorName, // Admin name
                isNotice: data.isNotice,
                isSecret: data.isSecret,
                answerStatus: data.answerStatus || 'WAITING',
                ipAddress: '127.0.0.1' 
            }
        });
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: "게시글 등록 실패" };
    }
}

export async function updatePostAction(id: string, data: {
    boardId: string;
    subject: string;
    content: string;
    authorName: string;
    isNotice: boolean;
    isSecret: boolean;
    answerStatus?: string;
}) {
    try {
         await prisma.post.update({
            where: { id },
            data: {
                boardId: data.boardId,
                subject: data.subject,
                content: data.content,
                authorName: data.authorName,
                isNotice: data.isNotice,
                isSecret: data.isSecret,
                answerStatus: data.answerStatus
            }
        });
        return { success: true };
    } catch (error) {
         console.error(error);
        return { success: false, error: "게시글 수정 실패" };
    }
}
