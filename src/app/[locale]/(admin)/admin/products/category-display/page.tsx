"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Youtube, ChevronUp, ChevronDown, HelpCircle } from "lucide-react";

export default function CategoryProductDisplayPage() {
    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">카테고리페이지 상품진열</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm">저장</Button>
            </div>

            {/* Category Selection Section */}
            <div>
                 <div className="flex items-center gap-1 mb-2">
                    <h2 className="text-sm font-bold text-gray-800">카테고리 선택</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                </div>
                
                <div className="border border-gray-300 bg-white">
                    <div className="flex items-center">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 h-14 flex items-center">카테고리 선택</div>
                        <div className="flex-1 p-3 flex items-center gap-1 h-14">
                            <Select><SelectTrigger className="w-40 h-8 text-xs"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem></SelectContent></Select>
                            <Select><SelectTrigger className="w-40 h-8 text-xs"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem></SelectContent></Select>
                            <Select><SelectTrigger className="w-40 h-8 text-xs"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem></SelectContent></Select>
                            <Select><SelectTrigger className="w-40 h-8 text-xs"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem></SelectContent></Select>
                            <Button className="h-8 bg-[#555555] hover:bg-[#444444] text-white text-xs font-bold rounded-sm px-4 ml-1">
                                검색
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selected Category Info Section */}
            <div>
                 <div className="flex items-center gap-1 mb-2 mt-4">
                    <h2 className="text-sm font-bold text-gray-800">선택된 카테고리 정보</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                </div>
                
                <div className="border-t border-gray-300 bg-white">
                    <div className="flex text-xs text-center border-b border-gray-200">
                         <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 flex items-center justify-center gap-1 border-r border-gray-200">
                             진열타입 <span className="text-gray-400 border border-gray-400 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-normal cursor-help">?</span>
                         </div>
                         <div className="flex-1 bg-white p-3 border-r border-gray-200"></div>
                         
                         <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 flex items-center justify-center gap-1 border-r border-gray-200">
                             진열방법 <span className="text-gray-400 border border-gray-400 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-normal cursor-help">?</span>
                         </div>
                         <div className="flex-1 bg-white p-3 border-r border-gray-200"></div>
                         
                         <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 border-r border-gray-200">PC쇼핑몰 테마</div>
                         <div className="flex-1 bg-white p-3 border-r border-gray-200"></div>
                         
                         <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 border-r border-gray-200">모바일쇼핑몰 테마</div>
                         <div className="flex-1 bg-white p-3 border-r border-gray-200"></div>
                         
                         <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 border-r border-gray-200">상품개수</div>
                         <div className="flex-1 bg-white p-3"></div>
                    </div>
                </div>
                <div className="flex justify-end mt-2">
                    <Button variant="secondary" className="h-8 text-xs bg-[#555555] text-white hover:bg-[#444444] rounded-sm px-4">
                        진열방법 수정
                    </Button>
                </div>
            </div>

            {/* Display Product Settings Section */}
            <div>
                 <div className="flex items-center gap-1 mb-2 mt-2">
                    <h2 className="text-sm font-bold text-gray-800">진열 상품 설정</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                </div>
                
                <div className="border-t-2 border-gray-400 border-b border-gray-300">
                    <div className="grid grid-cols-[40px_80px_60px_1fr_100px_120px_80px_80px] bg-[#f1f1f1] text-xs text-center font-bold text-gray-700 h-10 items-center border-b border-gray-300">
                        <div className="flex justify-center"><Checkbox className="w-4 h-4 rounded-[2px]" /></div>
                        <div>진열순서</div>
                        <div>이미지</div>
                        <div>상품명</div>
                        <div>판매가</div>
                        <div>공급사</div>
                        <div>재고</div>
                        <div>품절</div>
                    </div>
                    
                    {/* Empty State */}
                    <div className="h-32 flex items-center justify-center text-gray-400 text-xs bg-white">
                        선택된 상품이 없습니다.
                    </div>
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold"><Youtube size={16}/></span>
                </Button>
                 <Button className="rounded-full w-10 h-10 bg-[#7B4DFF] hover:bg-[#7B4DFF]/90 shadow-lg text-white p-0 flex items-center justify-center border-0 text-[10px] leading-tight flex-col">
                    <span className="block">따라</span>
                    <span className="block">하기</span>
                </Button>
                <div className="flex flex-col gap-0 rounded-full bg-white shadow-lg overflow-hidden border border-gray-200">
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100">
                         <ChevronUp size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none transform rotate-180">
                         <ChevronUp size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
