"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TipTapEditor from "@/components/ui/TipTapEditor";
import Link from "next/link";
import { useState } from "react";
import { List, Youtube, ArrowUp, ArrowDown } from "lucide-react";

export default function GlobalProductUsageGuideRegisterPage() {
    const [deliveryTitle, setDeliveryTitle] = useState("");
    const [deliveryContent, setDeliveryContent] = useState("");
    
    const [asTitle, setAsTitle] = useState("");
    const [asContent, setAsContent] = useState("");
    
    const [refundTitle, setRefundTitle] = useState("");
    const [refundContent, setRefundContent] = useState("");
    
    const [exchangeTitle, setExchangeTitle] = useState("");
    const [exchangeContent, setExchangeContent] = useState("");

    const handleSave = () => {
        // Implement save logic here
        console.log({
            delivery: { title: deliveryTitle, content: deliveryContent },
            as: { title: asTitle, content: asContent },
            refund: { title: refundTitle, content: refundContent },
            exchange: { title: exchangeTitle, content: exchangeContent },
        });
        alert("저장되었습니다. (Logic to be implemented)");
    };

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">상품 상세 이용안내 등록 (해외몰 전용)</h1>
                <div className="flex items-center gap-2">
                    <Link href="/admin/settings/product-usage-guide">
                        <Button variant="outline" className="h-9 px-4 text-xs font-bold border-gray-300">
                            <List size={14} className="mr-1" /> 목록
                        </Button>
                    </Link>
                    <Button 
                        className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white h-9 px-6 text-xs font-bold rounded-sm"
                        onClick={handleSave}
                    >
                        저장
                    </Button>
                </div>
            </div>

            {/* Language Tabs */}
            <div className="border-b border-gray-300">
                <div className="flex">
                    <button className="px-6 py-3 border border-gray-300 border-b-white bg-white font-bold text-gray-800 flex items-center gap-2 text-sm">
                        <span className="text-lg">🇨🇳</span> 중문몰
                    </button>
                    <div className="flex-1 border-b border-gray-300 bg-gray-50"></div>
                </div>
            </div>

            <div className="space-y-8">
                <h2 className="text-lg font-bold text-gray-800">상품 상세 이용안내 내용</h2>

                {/* Delivery Guide */}
                <div className="border border-gray-300 bg-white">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            <span className="text-[#FF424D] mr-1">•</span> 배송안내 제목
                        </div>
                        <div className="p-2">
                            <Input 
                                className="w-full h-9 rounded-sm border-gray-300"
                                value={deliveryTitle}
                                onChange={(e) => setDeliveryTitle(e.target.value)}
                                placeholder="배송안내 제목을 입력하세요"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr]">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            <span className="text-[#FF424D] mr-1">•</span> 배송안내 내용
                        </div>
                        <div className="p-2">
                             <TipTapEditor 
                                content={deliveryContent} 
                                onChange={setDeliveryContent} 
                            />
                        </div>
                    </div>
                </div>

                {/* AS Guide */}
                <div className="border border-gray-300 bg-white">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            <span className="text-[#FF424D] mr-1">•</span> AS안내 제목
                        </div>
                        <div className="p-2">
                            <Input 
                                className="w-full h-9 rounded-sm border-gray-300"
                                value={asTitle}
                                onChange={(e) => setAsTitle(e.target.value)}
                                placeholder="AS안내 제목을 입력하세요"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr]">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            <span className="text-[#FF424D] mr-1">•</span> AS안내 내용
                        </div>
                        <div className="p-2">
                             <TipTapEditor 
                                content={asContent} 
                                onChange={setAsContent} 
                            />
                        </div>
                    </div>
                </div>

                {/* Refund Guide */}
                <div className="border border-gray-300 bg-white">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            <span className="text-[#FF424D] mr-1">•</span> 환불안내 제목
                        </div>
                        <div className="p-2">
                            <Input 
                                className="w-full h-9 rounded-sm border-gray-300"
                                value={refundTitle}
                                onChange={(e) => setRefundTitle(e.target.value)}
                                placeholder="환불안내 제목을 입력하세요"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr]">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            <span className="text-[#FF424D] mr-1">•</span> 환불안내 내용
                        </div>
                        <div className="p-2">
                             <TipTapEditor 
                                content={refundContent} 
                                onChange={setRefundContent} 
                            />
                        </div>
                    </div>
                </div>

                 {/* Exchange Guide */}
                 <div className="border border-gray-300 bg-white">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            <span className="text-[#FF424D] mr-1">•</span> 교환안내 제목
                        </div>
                        <div className="p-2">
                            <Input 
                                className="w-full h-9 rounded-sm border-gray-300"
                                value={exchangeTitle}
                                onChange={(e) => setExchangeTitle(e.target.value)}
                                placeholder="교환안내 제목을 입력하세요"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr]">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            <span className="text-[#FF424D] mr-1">•</span> 교환안내 내용
                        </div>
                        <div className="p-2">
                             <TipTapEditor 
                                content={exchangeContent} 
                                onChange={setExchangeContent} 
                            />
                        </div>
                    </div>
                </div>
            </div>
             {/* Floating Actions */}
             <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-12 h-12 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold"><Youtube size={20}/></span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-[#6E36E2] hover:bg-[#6E36E2]/90 shadow-lg text-white p-0 flex flex-col items-center justify-center border-0 gap-0">
                    <span className="text-[10px] leading-none">따라</span>
                    <span className="text-[10px] leading-none">하기</span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    <ArrowUp size={20} />
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    <ArrowDown size={20} />
                </Button>
            </div>
        </div>
    );
}
