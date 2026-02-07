"use client";

import { useState } from "react";
import { createProductInquiryAction } from "@/actions/qna-actions";

export default function QnaWriteModal({ 
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
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [isSecret, setIsSecret] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!subject.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }
        if (!content.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }
        setIsSubmitting(true);
        const res = await createProductInquiryAction(userId, {
            productId,
            subject,
            content,
            isSecret
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
                <h2 className="text-xl font-bold mb-4">상품 문의 작성</h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">제목</label>
                    <input 
                        type="text"
                        className="w-full border p-2 rounded"
                        placeholder="제목을 입력해주세요."
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">내용</label>
                    <textarea 
                        className="w-full border p-2 h-32 rounded resize-none"
                        placeholder="문의하실 내용을 입력해주세요."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <div className="mb-4 flex items-center gap-2">
                   <input 
                        type="checkbox" 
                        id="secretMeta"
                        checked={isSecret}
                        onChange={(e) => setIsSecret(e.target.checked)}
                        className="w-4 h-4"
                   />
                   <label htmlFor="secretMeta" className="text-sm cursor-pointer select-none">비밀글로 작성</label>
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
