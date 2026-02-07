"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Types ---
export type ProductReviewDTO = {
  id: string;
  productId: string;
  productName?: string;
  productImage?: string;
  userId: string;
  userNickname: string;
  rating: number;
  comment: string | null;
  images: string[];
  createdAt: Date;
};

// --- Helper: Get UserInfo ID ---
async function getUserInfoId(userId: string): Promise<string | null> {
  const userInfo = await prisma.userInfo.findUnique({
    where: { userId: userId },
    select: { id: true },
  });
  return userInfo?.id || null;
}

// --- Action: Create Review ---
export async function createProductReviewAction(
  userId: string | undefined,
  data: {
    productId: string;
    rating: number;
    comment: string;
    images?: string[];
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

    // Validation
    if (data.rating < 1 || data.rating > 5) {
      return { success: false, message: "별점은 1~5점 사이여야 합니다." };
    }
    if (!data.comment || data.comment.trim().length < 10) {
      return { success: false, message: "리뷰 내용은 최소 10자 이상이어야 합니다." };
    }

    // Create Review
    await prisma.productReview.create({
      data: {
        userId: userInfoId,
        productId: data.productId,
        rating: data.rating,
        comment: data.comment,
        images: data.images || [],
      },
    });

    revalidatePath(`/product/${data.productId}`);
    revalidatePath("/mypage/reviews"); // Hypothetical path
    return { success: true, message: "리뷰가 등록되었습니다." };
  } catch (error) {
    console.error("Error creating review:", error);
    return { success: false, message: "리뷰 등록에 실패했습니다." };
  }
}

// --- Action: Get Product Reviews ---
export async function getProductReviewsAction(
  productId: string,
  page: number = 1,
  limit: number = 5
) {
  try {
    const skip = (page - 1) * limit;

    const [reviews, totalCount] = await Promise.all([
      prisma.productReview.findMany({
        where: { productId },
        take: limit,
        skip: skip,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              user: {
                select: { nickname: true },
              },
            },
          },
        },
      }),
      prisma.productReview.count({ where: { productId } }),
    ]);

    const formattedReviews: ProductReviewDTO[] = reviews.map((review) => ({
      id: review.id,
      productId: review.productId,
      userId: review.userId,
      userNickname: review.user?.user?.nickname || "익명",
      rating: review.rating,
      comment: review.comment,
      images: review.images,
      createdAt: review.createdAt,
    }));

    return {
      success: true,
      data: formattedReviews,
      pagination: {
        total: totalCount,
        page,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { success: false, message: "리뷰를 불러오는데 실패했습니다." };
  }
}

// --- Action: Get My Reviews ---
export async function getMyReviewsAction(userId: string | undefined) {
  try {
    if (!userId) {
      return { success: false, message: "로그인이 필요합니다." };
    }
    const userInfoId = await getUserInfoId(userId);
    if (!userInfoId) {
      return { success: false, message: "회원 정보를 찾을 수 없습니다." };
    }

    const reviews = await prisma.productReview.findMany({
      where: { userId: userInfoId },
      orderBy: { createdAt: "desc" },
      include: {
        product: {
          select: {
            name: true,
            images: {
              where: { type: "MAIN" },
              take: 1,
              select: { url: true },
            },
          },
        },
      },
    });

    const formattedReviews: ProductReviewDTO[] = reviews.map((review) => ({
      id: review.id,
      productId: review.productId,
      productName: review.product.name,
      productImage: review.product.images[0]?.url || "",
      userId: review.userId,
      userNickname: "나", // My reviews
      rating: review.rating,
      comment: review.comment,
      images: review.images,
      createdAt: review.createdAt,
    }));

    return { success: true, data: formattedReviews };
  } catch (error) {
    console.error("Error fetching my reviews:", error);
    return { success: false, message: "내 리뷰를 불러오는데 실패했습니다." };
  }
}
