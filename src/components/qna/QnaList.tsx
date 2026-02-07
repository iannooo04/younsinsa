"use client";

import { useEffect, useState, useCallback } from "react";
import { getProductInquiriesAction, QnaDTO } from "@/actions/qna-actions";
import QnaWriteModal from "./QnaWriteModal";

export default function QnaList({ productId, userId }: { productId: string; userId?: string }) {
    const [qnas, setQnas] = useState<QnaDTO[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    
    // Accordion state
    const [openId, setOpenId] = useState<string | null>(null);

    const loadQnas = useCallback(async (p: number) => {
        // userId needed to check "isAuthor" inside action or we check logic here
        // The action expects currentUserId to determine "isAuthor" flag
        const res = await getProductInquiriesAction(productId, userId, p, 5);
        if (res.success && res.data) {
            setQnas(res.data);
            setTotal(res.pagination?.total || 0);
        }
    }, [productId, userId]);

    useEffect(() => {
        loadQnas(1);
    }, [loadQnas]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        loadQnas(newPage);
        setOpenId(null);
    };

    const toggleAccordion = (id: string, isSecret: boolean, isAuthor: boolean) => {
        if (isSecret && !isAuthor) {
            alert("비밀글입니다.");
            return;
        }
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="py-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">상품 문의 ({total})</h3>
                <button 
                    onClick={() => {
                        if (!userId) return alert("로그인이 필요합니다.");
                        setShowModal(true);
                    }}
                    className="px-4 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
                >
                    문의하기
                </button>
            </div>

            {/* Inquiries Table-like List */}
            <div className="border-t border-gray-200">
                {qnas.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 border-b border-gray-200">
                        등록된 문의가 없습니다.
                    </div>
                ) : (
                    qnas.map((qna) => (
                        <div key={qna.id} className="border-b border-gray-200">
                            {/* Header Row */}
                            <div 
                                onClick={() => toggleAccordion(qna.id, qna.isSecret, qna.isAuthor)}
                                className="flex items-center py-4 px-2 hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <div className="w-20 text-center text-xs text-gray-500 shrink-0">
                                    <span className={`px-2 py-1 rounded ${qna.status === 'COMPLETE' ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        {qna.status === 'COMPLETE' ? '답변완료' : '답변대기'}
                                    </span>
                                </div>
                                <div className="flex-1 px-4 truncate flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-800 truncate">
                                        {qna.subject}
                                    </span>
                                    {qna.isSecret && (
                                       <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-3 h-3 text-gray-400"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                        />
                                      </svg>
                                    )}
                                </div>
                                <div className="w-24 text-center text-xs text-gray-500 shrink-0">
                                    {qna.authorName.substring(0, 1)}**
                                </div>
                                <div className="w-24 text-center text-xs text-gray-400 shrink-0">
                                    {new Date(qna.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            {/* Accordion Content */}
                            {openId === qna.id && (
                                <div className="bg-gray-50 p-6 text-sm">
                                    <div className="flex gap-2 mb-4">
                                        <span className="font-bold text-gray-800 mt-0.5">Q.</span>
                                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                            {qna.content}
                                        </p>
                                    </div>
                                    
                                    {qna.answer ? (
                                        <div className="flex gap-2 border-t border-gray-200 pt-4 mt-4">
                                            <span className="font-bold text-black mt-0.5">A.</span>
                                            <div>
                                                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                                    {qna.answer}
                                                </p>
                                                <div className="text-xs text-gray-400 mt-2">
                                                    {new Date(qna.answerDate!).toLocaleDateString()} 답변
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        qna.status === 'COMPLETE' ? null : (
                                            <div className="pl-6 text-xs text-gray-400 font-medium">
                                                아직 답변이 등록되지 않았습니다.
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
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
                <QnaWriteModal 
                    productId={productId} 
                    userId={userId} 
                    onClose={() => setShowModal(false)}
                    onSuccess={() => loadQnas(1)}
                />
            )}
        </div>
    );
}
