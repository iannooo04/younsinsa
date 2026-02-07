"use client";

import { useState } from "react";
import { createProductReviewAction } from "@/actions/review-actions";

// Simple Modal UI
export default function ReviewWriteModal({ 
    productId, 
    userId, 
    onClose, 
    onSuccess 
}: { 
    productId: string; 
    userId?: string; 
    onClose: () => void; 
    onSuccess: () => void; 
}) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!comment.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }
        setIsSubmitting(true);
        const res = await createProductReviewAction(userId, {
            productId,
            rating,
            comment,
            // images: [] // Image upload to be implemented later or via separate handler
        });
        setIsSubmitting(false);

        if (res.success) {
            alert(res.message);
            onSuccess();
            onClose();
        } else {
            alert(res.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 w-[500px] shadow-xl">
                <h2 className="text-xl font-bold mb-4">리뷰 작성</h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">별점</label>
                    <div className="flex gap-1 text-2xl text-yellow-400 cursor-pointer">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} onClick={() => setRating(star)}>
                                {star <= rating ? "★" : "☆"}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">내용</label>
                    <textarea 
                        className="w-full border p-2 h-32 rounded resize-none"
                        placeholder="최소 10자 이상 입력해주세요."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                    >
                        취소
                    </button>
                    <button 
                        onClick={handleSubmit} 
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
                    >
                        {isSubmitting ? "등록 중..." : "등록하기"}
                    </button>
                </div>
            </div>
        </div>
    );
}
