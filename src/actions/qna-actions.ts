"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Types ---
export type QnaDTO = {
  id: string;
  subject: string;
  content: string;
  isSecret: boolean;
  authorName: string; // Nickname or "비공개"
  createdAt: Date;
  status: "WAITING" | "COMPLETE"; // Derived from answerStatus or replies
  answer: string | null;
  answerDate: Date | null;
  isAuthor: boolean; // For current user
};

// --- Helper: Get UserInfo ID ---
async function getUserInfoId(userId: string): Promise<string | null> {
  const userInfo = await prisma.userInfo.findUnique({
    where: { userId: userId },
    select: { id: true },
  });
  return userInfo?.id || null;
}

// --- Action: Create Inquiry ---
export async function createProductInquiryAction(
  userId: string | undefined,
  data: {
    productId: string;
    subject: string;
    content: string;
    isSecret: boolean;
  }
) {
  try {
    if (!userId) {
      return { success: false, message: "로그인이 필요합니다." };
    }

    const userInfoId = await getUserInfoId(userId);
    if (!userInfoId) {
      return { success: false, message: "회원 정보를 찾을 수 없습니다." };
    }

    // 1. Find a Board for Product Inquiries (Type: INQUIRY)
    // Preference: Board with specific ID 'product-inquiry' OR any INQUIRY board.
    let board = await prisma.board.findFirst({
      where: { type: "INQUIRY" },
      orderBy: { createdAt: "asc" } 
    });

    if (!board) {
      // Fallback: Create one if not exists (Safety mechanism)
      board = await prisma.board.create({
        data: {
          boardId: "product-inquiry",
          name: "상품 문의",
          type: "INQUIRY",
          useProductLink: true,
          useReply: true
        }
      });
    }

    // 2. Create Post
    await prisma.post.create({
      data: {
        boardId: board.id,
        productId: data.productId,
        authorId: userInfoId,
        subject: data.subject,
        content: data.content,
        isSecret: data.isSecret,
        answerStatus: "WAITING"
      }
    });

    revalidatePath(`/product/${data.productId}`);
    return { success: true, message: "문의가 등록되었습니다." };

  } catch (error) {
    console.error("Error creating inquiry:", error);
    return { success: false, message: "문의 등록에 실패했습니다." };
  }
}

// --- Action: Get Product Inquiries ---
export async function getProductInquiriesAction(
  productId: string,
  currentUserId?: string,
  page: number = 1,
  limit: number = 5
) {
  try {
    const userInfoId = currentUserId ? await getUserInfoId(currentUserId) : null;
    const skip = (page - 1) * limit;

    // Find Posts where productId matches
    // Only Fetch Parent Posts (depth 0)
    const postsPromise = prisma.post.findMany({
      where: { 
          productId,
          depth: 0 // In case replies are stored as separate posts with depth
      },
      take: limit,
      skip: skip,
      orderBy: { createdAt: "desc" },
      include: {
        author: { 
          select: { 
            id: true, 
            user: {              // Correctly access User model via UserInfo
              select: { nickname: true } 
            }
          } 
        },
        replies: {
          take: 1, // Assume single answer for now
          orderBy: { createdAt: "asc" }
        }
      }
    });

    const countPromise = prisma.post.count({ where: { productId, depth: 0 } });

    const [posts, totalCount] = await Promise.all([postsPromise, countPromise]);

    const formattedQnas: QnaDTO[] = posts.map(post => {
      const hasAnswer = post.replies.length > 0;
      const isAuthor = userInfoId === post.authorId;
      
      // Privacy Check: if secret and not author => hide content
      // But we always need basic info. The UI handles "Secret" masking content.
      
      return {
        id: post.id,
        subject: post.subject,
        content: post.content, // UI component decides whether to show this based on isSecret && isAuthor
        isSecret: post.isSecret,
        authorName: post.author?.user?.nickname || "익명", // Correctly access nickname
        createdAt: post.createdAt,
        status: hasAnswer ? "COMPLETE" : (post.answerStatus === "COMPLETE" ? "COMPLETE" : "WAITING"),
        answer: hasAnswer ? post.replies[0].content : null,
        answerDate: hasAnswer ? post.replies[0].createdAt : null,
        isAuthor: isAuthor
      };
    });

    return {
      success: true,
      data: formattedQnas,
      pagination: {
        total: totalCount,
        page,
        totalPages: Math.ceil(totalCount / limit)
      }
    };

  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return { success: false, message: "문의 목록을 불러오는데 실패했습니다." };
  }
}

// --- Action: Get My Inquiries ---
export async function getMyInquiriesAction(userId: string | undefined) {
  try {
    if (!userId) {
      return { success: false, message: "로그인이 필요합니다." };
    }
    const userInfoId = await getUserInfoId(userId);
    if (!userInfoId) {
      return { success: false, message: "회원 정보를 찾을 수 없습니다." };
    }

    const posts = await prisma.post.findMany({
      where: { 
          authorId: userInfoId,
          board: { type: "INQUIRY" }
      },
      orderBy: { createdAt: "desc" },
      include: {
        product: {
          select: {
            name: true,
            images: {
              where: { type: "MAIN" },
              take: 1,
              select: { url: true }
            }
          }
        },
        replies: { take: 1 }
      }
    });

    const formattedQnas = posts.map(post => {
      const hasAnswer = post.replies.length > 0;
      return {
        id: post.id,
        productId: post.productId || "",
        productName: post.product?.name || "상품 정보 없음",
        productImage: post.product?.images[0]?.url || "",
        subject: post.subject,
        content: post.content,
        isSecret: post.isSecret,
        createdAt: post.createdAt,
        status: hasAnswer ? "COMPLETE" : post.answerStatus,
        answer: hasAnswer ? post.replies[0].content : null,
        answerDate: hasAnswer ? post.replies[0].createdAt : null,
      };
    });

    return { success: true, data: formattedQnas };
  } catch (error) {
    console.error("Error fetching my inquiries:", error);
    return { success: false, message: "내 문의 내역을 불러오는데 실패했습니다." };
  }
}
