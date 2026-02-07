"use client";

import { useEffect, useState, useCallback } from "react";
import { getProductReviewsAction, ProductReviewDTO } from "@/actions/review-actions";
import ReviewWriteModal from "./ReviewWriteModal";

export default function ReviewList({ productId, userId }: { productId: string; userId?: string }) {
    const [reviews, setReviews] = useState<ProductReviewDTO[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    
    // Fetch function
    const loadReviews = useCallback(async (p: number) => {
        const res = await getProductReviewsAction(productId, p, 5);
        if (res.success && res.data) {
            setReviews(res.data);
            setTotal(res.pagination?.total || 0);
        }
    }, [productId]);

    useEffect(() => {
        loadReviews(1);
    }, [loadReviews]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        loadReviews(newPage);
    };

    return (
        <div className="py-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">상품후기 ({total})</h3>
                <button 
                    onClick={() => {
                        if (!userId) return alert("로그인이 필요합니다.");
                        setShowModal(true);
                    }}
                    className="px-4 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
                >
                    후기 작성
                </button>
            </div>

            {/* List */}
            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                        등록된 리뷰가 없습니다.
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-6">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex text-yellow-400">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                                        ))}
                                    </div>
                                    <span className="font-bold text-sm">{review.rating}점</span>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            
                            <p className="text-gray-700 text-sm whitespace-pre-wrap mb-3">
                                {review.comment}
                            </p>

                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">
                                    {review.userNickname.substring(0, 1)}**
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {total > 5 && (
                <div className="flex justify-center gap-2 mt-8">
                    <button 
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="px-3 py-1 border rounded disabled:opacity-30"
                    >
                        Prev
                    </button>
                    <span className="px-3 py-1">{page}</span>
                    <button 
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page * 5 >= total}
                        className="px-3 py-1 border rounded disabled:opacity-30"
                    >
                        Next
                    </button>
                </div>
            )}

            {showModal && (
                <ReviewWriteModal 
                    productId={productId} 
                    userId={userId} 
                    onClose={() => setShowModal(false)}
                    onSuccess={() => loadReviews(1)}
                />
            )}
        </div>
    );
}
