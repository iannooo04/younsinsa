'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma';

export type GetBoardsParams = {
  keyword?: string;
  searchType?: 'id' | 'name';
  matchType?: 'exact' | 'partial';
  type?: string[]; // 'BASIC', 'GALLERY', 'EVENT', 'INQUIRY'
};

export async function getBoardsAction(params: GetBoardsParams) {
  try {
    const { keyword, searchType = 'id', matchType = 'partial', type } = params;

    const where: Prisma.BoardWhereInput = {};

    if (keyword) {
      if (searchType === 'id') {
        if (matchType === 'exact') {
             where.boardId = { equals: keyword, mode: 'insensitive' };
        } else {
             where.boardId = { contains: keyword, mode: 'insensitive' };
        }
      } else {
        if (matchType === 'exact') {
             where.name = { equals: keyword, mode: 'insensitive' };
        } else {
             where.name = { contains: keyword, mode: 'insensitive' };
        }
      }
    }

    if (type && type.length > 0) {
        // Map UI string types to Enum if necessary, or just use Enum keys
        // Assuming params pass keys like 'BASIC', 'GALLERY' etc.
        // If UI passes 'normal', 'gallery' etc, we need mapping.
        // Based on UI: 'normal' -> BASIC, 'gallery' -> GALLERY, 'event' -> EVENT, 'oneonone' -> INQUIRY
        
        const mappedTypes: string[] = [];
        
        if (type.includes('normal')) mappedTypes.push('BASIC');
        if (type.includes('gallery')) mappedTypes.push('GALLERY');
        if (type.includes('event')) mappedTypes.push('EVENT');
        if (type.includes('oneonone')) mappedTypes.push('INQUIRY');
        
        if (mappedTypes.length > 0) {
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             where.type = { in: mappedTypes as any };
        }
    }

    const boards = await prisma.board.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
          _count: {
              select: { posts: true }
          }
      }
    });

    // Calculate derived stats (new posts, unreplied)
    // For 'new', we might define posts created within 24h.
    // For 'unreplied', we check posts where answerStatus is WAITING (for Inquiry type) or replies count is 0.
    
    const now = new Date();
    const oneDayAgo = new Date(now.setDate(now.getDate() - 1));

    const boardsWithStats = await Promise.all(boards.map(async (board) => {
        const newPostsCount = await prisma.post.count({
            where: {
                boardId: board.id,
                createdAt: { gte: oneDayAgo }
            }
        });

        let unrepliedCount = '-';
        if (board.type === 'INQUIRY') {
             const count = await prisma.post.count({
                where: {
                    boardId: board.id,
                    replies: { none: {} }, // No replies
                    // OR answerStatus: 'WAITING' depending on logic
                }
             });
             unrepliedCount = String(count);
        }

        return {
            ...board,
            stats: {
                total: board._count.posts,
                new: newPostsCount,
                unreplied: unrepliedCount
            }
        };
    }));

    return { success: true, items: boardsWithStats };

  } catch (error) {
    console.error("Error fetching boards:", error);
    return { success: false, error: "게시판 목록을 불러오는데 실패했습니다." };
  }
}

export async function deleteBoardsAction(ids: string[]) {
    try {
        if (!ids || ids.length === 0) return { success: false, error: "선택된 게시판이 없습니다." };
        
        await prisma.board.deleteMany({
            where: { id: { in: ids } }
        });

        return { success: true };
    } catch (error) {
        console.error("Error deleting boards:", error);
       return { success: false, error: "게시판 삭제에 실패했습니다." };
    }
}
