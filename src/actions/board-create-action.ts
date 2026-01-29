'use server';

import { prisma } from '@/lib/prisma';


export type CreateBoardParams = {
    // Basic Settings
    usePcMall: boolean;
    useMobileMall: boolean;
    type: 'BASIC' | 'GALLERY' | 'EVENT' | 'INQUIRY';
    boardId: string;
    name: string;
    skinPcId?: string; // Placeholder for now, simplistic string logic in UI
    skinMobileId?: string; 
    
    // Permission Settings (Simplifying for now to map to Enums or default)
    // In real app, these would map to proper Enums: ALL, ADMIN, MEMBER, GRADE
    // For this MVP, we might accept strings and map them or use defaults if not critical.
    listAccess?: string;
    readAccess?: string;
    writeAccess?: string;
    commentAccess?: string;

    // Function Settings
    useProductLink?: boolean;
    useOrderLink?: boolean; // If UI allows distinguishing
    useReply?: boolean;
    useComment?: boolean;
    authorDisplay?: 'NAME' | 'NICKNAME' | 'ID';
    
    // File/Storage (simplified)
    maxFileSize?: number;
    
    // SEO
    seoTitle?: string;
    seoAuthor?: string;
    seoDescription?: string;
    seoKeywords?: string;
    // List Settings
    itemsPerPage?: number;
    subjectLimit?: number;
    showNotice?: boolean;

    // Editor
    useEditor?: boolean;

    // Design
    headerHtml?: string;
    footerHtml?: string;
};

export type UpdateBoardParams = CreateBoardParams & {
    id: string; // Internal ID
};

export async function createBoardAction(params: CreateBoardParams) {
    try {
        // Validate ID uniqueness
        const existing = await prisma.board.findUnique({
            where: { boardId: params.boardId }
        });
        if (existing) {
            return { success: false, error: "이미 사용 중인 아이디입니다." };
        }

        // Map UI string permissions to Prisma Enums
        // Helper to map UI string to Enum
        const mapAccess = (val?: string): 'ALL' | 'ADMIN' | 'MEMBER' | 'GRADE' => {
           switch(val) {
               case 'all': return 'ALL';
               case 'admin': return 'ADMIN';
               case 'member': return 'MEMBER';
               case 'grade': return 'GRADE';
               default: return 'ALL';
           } 
        };

        const board = await prisma.board.create({
            data: {
                boardId: params.boardId,
                name: params.name,
                type: params.type,
                usePcMall: params.usePcMall,
                useMobileMall: params.useMobileMall,
                
                listAccess: mapAccess(params.listAccess),
                readAccess: mapAccess(params.readAccess),
                writeAccess: mapAccess(params.writeAccess),
                commentAccess: mapAccess(params.commentAccess),
                
                useReply: params.useReply ?? (params.type === 'INQUIRY'), // Inquiry typically needs reply
                useComment: params.useComment ?? true,
                useProductLink: params.useProductLink ?? false,
                useOrderLink: params.useOrderLink ?? false,
                maxFileSize: params.maxFileSize ?? 10,
                
                authorDisplay: params.authorDisplay ?? 'NICKNAME',

                // New fields
                itemsPerPage: params.itemsPerPage ?? 15,
                subjectLimit: params.subjectLimit ?? 30,
                showNotice: params.showNotice ?? true,
                useEditor: params.useEditor ?? true,
                
                headerHtml: params.headerHtml,
                footerHtml: params.footerHtml,
                
                seoTitle: params.seoTitle,
                seoAuthor: params.seoAuthor,
                seoDescription: params.seoDescription,
                seoKeywords: params.seoKeywords,
            }
        });

        return { success: true, board };

    } catch (error) {
        console.error("Error creating board:", error);
        return { success: false, error: "게시판 생성에 실패했습니다." };
    }
}


export async function checkBoardIdAction(boardId: string) {
    if (!boardId) return { success: false };
    const existing = await prisma.board.findUnique({
        where: { boardId }
    });
    return { success: true, available: !existing };
}

export async function getBoardAction(id: string) {
    try {
        const board = await prisma.board.findUnique({
            where: { id }
        });

        if (!board) {
            return { success: false, error: "게시판을 찾을 수 없습니다." };
        }

        return { success: true, board };
    } catch (error) {
        console.error("Error fetching board:", error);
        return { success: false, error: "게시판 정보를 불러오는데 실패했습니다." };
    }
}

export async function updateBoardAction(params: UpdateBoardParams) {
    try {
        // Map UI string permissions to Prisma Enums
        const mapAccess = (val?: string): 'ALL' | 'ADMIN' | 'MEMBER' | 'GRADE' => {
           switch(val) {
               case 'all': return 'ALL';
               case 'admin': return 'ADMIN';
               case 'member': return 'MEMBER';
               case 'grade': return 'GRADE';
               default: return 'ALL';
           } 
        };

        const board = await prisma.board.update({
            where: { id: params.id },
            data: {
                boardId: params.boardId,
                name: params.name,
                type: params.type,
                usePcMall: params.usePcMall,
                useMobileMall: params.useMobileMall,
                
                listAccess: mapAccess(params.listAccess),
                readAccess: mapAccess(params.readAccess),
                writeAccess: mapAccess(params.writeAccess),
                commentAccess: mapAccess(params.commentAccess),
                
                useReply: params.useReply ?? (params.type === 'INQUIRY'),
                useComment: params.useComment ?? true,
                useProductLink: params.useProductLink ?? false,
                useOrderLink: params.useOrderLink ?? false,
                maxFileSize: params.maxFileSize ?? 10,
                
                authorDisplay: params.authorDisplay ?? 'NICKNAME',

                itemsPerPage: params.itemsPerPage ?? 15,
                subjectLimit: params.subjectLimit ?? 30,
                showNotice: params.showNotice ?? true,
                useEditor: params.useEditor ?? true,
                
                headerHtml: params.headerHtml,
                footerHtml: params.footerHtml,
                
                seoTitle: params.seoTitle,
                seoAuthor: params.seoAuthor,
                seoDescription: params.seoDescription,
                seoKeywords: params.seoKeywords,
            }
        });

        return { success: true, board };

    } catch (error) {
        console.error("Error updating board:", error);
        return { success: false, error: "게시판 수정에 실패했습니다." };
    }
}
