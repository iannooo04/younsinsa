"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface MyQnaDTO {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    subject: string;
    content: string;
    isSecret: boolean;
    createdAt: Date;
    status: string; // WAITING / COMPLETE
    answer: string | null;
    answerDate: Date | null;
}

export default function MyQnaList({ qnas }: { qnas: MyQnaDTO[] }) {
    const [openId, setOpenId] = useState<string | null>(null);

    if (qnas.length === 0) {
        return (
            <div className="text-center py-20 text-gray-400">
                작성한 문의가 없습니다.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {qnas.map((qna) => (
                <div key={qna.id} className="border border-gray-100 rounded-lg overflow-hidden">
                    <div 
                        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex gap-6"
                        onClick={() => setOpenId(openId === qna.id ? null : qna.id)}
                    >
                         {/* Product Info (Thumbnail) */}
                         <div className="shrink-0 w-16 h-16 relative bg-gray-100 rounded overflow-hidden">
                             {qna.productImage ? (
                                <Image src={qna.productImage} alt={qna.productName} fill className="object-cover" />
                             ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">IMG</div>
                             )}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs px-2 py-0.5 rounded font-bold ${qna.status === 'COMPLETE' ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    {qna.status === 'COMPLETE' ? '답변완료' : '답변대기'}
                                </span>
                                <span className="text-xs text-gray-400">{new Date(qna.createdAt).toLocaleDateString()}</span>
                                <span className="text-xs text-gray-500">| {qna.productName}</span>
                            </div>
                            <h4 className="font-bold text-sm text-gray-800 flex items-center gap-2">
                                {qna.subject}
                                {qna.isSecret && (
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                   </svg>
                                )}
                            </h4>
                        </div>
                    </div>

                    {/* Content & Answer */}
                    {openId === qna.id && (
                        <div className="bg-gray-50 p-6 text-sm border-t border-gray-100 ml-[88px]"> 
                             {/* Content */}
                            <div className="flex gap-2 mb-4">
                                <span className="font-bold text-gray-800 mt-0.5">Q.</span>
                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {qna.content}
                                </p>
                            </div>

                            {/* Answer */}
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
                                <div className="pl-6 text-xs text-gray-400">
                                    아직 답변이 등록되지 않았습니다.
                                </div>
                            )}

                             <div className="mt-4 pt-4 border-t border-gray-200">
                                 <Link href={`/product/${qna.productId}`} className="text-xs text-blue-600 hover:underline">
                                     상품 보러가기 &rarr;
                                 </Link>
                             </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
