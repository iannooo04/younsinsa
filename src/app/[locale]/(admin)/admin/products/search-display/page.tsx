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
import { Label } from "@/components/ui/label";
import { Youtube, ChevronUp, ChevronDown } from "lucide-react";

export default function SearchProductDisplayPage() {
    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">검색페이지 상품진열</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm">저장</Button>
            </div>

            {/* Basic Info Section */}
            <div>
                 <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                        <h2 className="text-sm font-bold text-gray-800">기본정보</h2>
                        <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                    </div>
                    <Button variant="link" className="text-blue-500 h-auto p-0 text-xs hover:no-underline">닫힘 ^</Button>
                </div>
                
                <div className="border border-gray-300 bg-white">
                    {/* Row 1: Display Method */}
                    <div className="flex items-center border-b border-gray-200">
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 h-12 flex items-center gap-1">
                             진열방법 선택 <span className="text-gray-400 border border-gray-400 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-normal cursor-help">?</span>
                         </div>
                         <div className="flex-1 p-3 flex items-center h-12">
                             <Select defaultValue="recent">
                                 <SelectTrigger className="w-48 h-8 text-xs">
                                     <SelectValue placeholder="최근 등록 상품 위로" />
                                 </SelectTrigger>
                                 <SelectContent>
                                     <SelectItem value="recent">최근 등록 상품 위로</SelectItem>
                                 </SelectContent>
                             </Select>
                         </div>
                    </div>
                    {/* Row 2: Search Conditions */}
                    <div className="flex items-center border-b border-gray-200">
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 h-12 flex items-center gap-1">
                             검색조건 선택 <span className="text-gray-400 border border-gray-400 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-normal cursor-help">?</span>
                         </div>
                         <div className="flex-1 p-3 flex items-center gap-6 h-12">
                             {[
                                 { id: "s-keyword", label: "검색어", checked: true },
                                 { id: "s-category", label: "카테고리", checked: true },
                                 { id: "s-brand", label: "브랜드", checked: true },
                                 { id: "s-price", label: "가격", checked: true },
                                 { id: "s-free", label: "무료변송", checked: true },
                                 { id: "s-recent", label: "최근등록상품", checked: true },
                                 { id: "s-color", label: "대표색상", checked: true },
                                 { id: "s-icon", label: "아이콘", checked: false },
                             ].map((item) => (
                                 <div key={item.id} className="flex items-center gap-1.5">
                                     <Checkbox id={item.id} defaultChecked={item.checked} className={item.checked ? "bg-red-500 border-red-500 text-white" : ""} />
                                     <Label htmlFor={item.id} className="text-gray-600">{item.label}</Label>
                                 </div>
                             ))}
                         </div>
                    </div>
                     {/* Row 3: Theme Selection */}
                    <div className="flex items-center">
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 h-12 flex items-center">PC쇼핑몰 테마선택</div>
                         <div className="flex-1 p-3 flex items-center gap-2 h-12 border-r border-gray-200">
                             <Select defaultValue="default">
                                 <SelectTrigger className="w-48 h-8 text-xs">
                                     <SelectValue placeholder="검색페이지테마" />
                                 </SelectTrigger>
                                 <SelectContent>
                                     <SelectItem value="default">검색페이지테마</SelectItem>
                                 </SelectContent>
                             </Select>
                             <Button className="h-8 bg-[#555555] hover:bg-[#444444] text-white text-xs font-bold rounded-sm px-4">
                                테마 등록
                            </Button>
                         </div>
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 h-12 flex items-center">모바일쇼핑몰 테마선택</div>
                         <div className="flex-1 p-3 flex items-center gap-2 h-12">
                             <Select defaultValue="default">
                                 <SelectTrigger className="w-48 h-8 text-xs">
                                     <SelectValue placeholder="검색페이지테마" />
                                 </SelectTrigger>
                                 <SelectContent>
                                     <SelectItem value="default">검색페이지테마</SelectItem>
                                 </SelectContent>
                             </Select>
                             <Button className="h-8 bg-[#555555] hover:bg-[#444444] text-white text-xs font-bold rounded-sm px-4">
                                테마 등록
                            </Button>
                         </div>
                    </div>
                </div>
            </div>

            {/* PC Theme Info Section */}
            <div>
                 <div className="flex items-center justify-between mb-2 mt-8">
                    <div className="flex items-center gap-1">
                        <h2 className="text-sm font-bold text-gray-800">선택된 PC쇼핑몰 테마 정보</h2>
                        <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                    </div>
                    <Button variant="link" className="text-blue-500 h-auto p-0 text-xs hover:no-underline">닫힘 ^</Button>
                </div>
                
                <div className="border border-gray-300 bg-white text-xs">
                    <div className="flex border-b border-gray-200 h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">테마명</div>
                        <div className="flex-1 px-4 flex items-center gap-2">
                            <span className="text-gray-600">검색페이지테마</span>
                            <Button variant="outline" className="h-6 text-xs px-2 bg-white hover:bg-gray-50 border-gray-300">수정</Button>
                        </div>
                    </div>
                    <div className="flex border-b border-gray-200 h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">이미지 설정</div>
                        <div className="flex-1 px-4 text-gray-600">추가리스트1 220pixel</div>
                    </div>
                     <div className="flex border-b border-gray-200 h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">상품 노출 개수</div>
                        <div className="flex-1 px-4 text-gray-600">가로 : 4 X 세로 : 5</div>
                    </div>
                    <div className="flex border-b border-gray-200 h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">품절상품 노출</div>
                        <div className="flex-1 px-4 text-gray-600 border-r border-gray-200">예</div>
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">품절상품 진열</div>
                        <div className="flex-1 px-4 text-gray-600">정렬 순서대로 보여주기</div>
                    </div>
                    <div className="flex border-b border-gray-200 h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">품절 아이콘 노출</div>
                        <div className="flex-1 px-4 text-gray-600 border-r border-gray-200">예</div>
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">아이콘 노출</div>
                        <div className="flex-1 px-4 text-gray-600">예</div>
                    </div>
                     <div className="flex border-b border-gray-200 h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">노출항목 설정</div>
                        <div className="flex-1 px-4 text-gray-600">이미지,상품명,이미지,상품명,판매가</div>
                    </div>
                     <div className="flex h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">디스플레이 유형</div>
                        <div className="flex-1 px-4 text-gray-600">갤러리형</div>
                    </div>
                </div>
            </div>

            {/* Mobile Theme Info Section */}
            <div>
                 <div className="flex items-center justify-between mb-2 mt-8">
                    <div className="flex items-center gap-1">
                        <h2 className="text-sm font-bold text-gray-800">선택된 모바일쇼핑몰 테마 정보</h2>
                        <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                    </div>
                    <Button variant="link" className="text-blue-500 h-auto p-0 text-xs hover:no-underline">닫힘 ^</Button>
                </div>
                
                <div className="border border-gray-300 bg-white text-xs">
                    <div className="flex border-b border-gray-200 h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">테마명</div>
                        <div className="flex-1 px-4 flex items-center gap-2">
                            <span className="text-gray-600">검색페이지테마</span>
                            <Button variant="outline" className="h-6 text-xs px-2 bg-white hover:bg-gray-50 border-gray-300">수정</Button>
                        </div>
                    </div>
                    <div className="flex border-b border-gray-200 h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">이미지 설정</div>
                        <div className="flex-1 px-4 text-gray-600">리스트이미지(기본) 180pixel</div>
                    </div>
                     <div className="flex border-b border-gray-200 h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">상품 노출 개수</div>
                        <div className="flex-1 px-4 text-gray-600">가로 : 2 X 세로 : 5</div>
                    </div>
                    <div className="flex border-b border-gray-200 h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">품절상품 노출</div>
                        <div className="flex-1 px-4 text-gray-600 border-r border-gray-200">예</div>
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">품절상품 진열</div>
                        <div className="flex-1 px-4 text-gray-600">정렬 순서대로 보여주기</div>
                    </div>
                    <div className="flex border-b border-gray-200 h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">품절 아이콘 노출</div>
                        <div className="flex-1 px-4 text-gray-600 border-r border-gray-200">예</div>
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">아이콘 노출</div>
                        <div className="flex-1 px-4 text-gray-600">예</div>
                    </div>
                     <div className="flex border-b border-gray-200 h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">노출항목 설정</div>
                        <div className="flex-1 px-4 text-gray-600">이미지,상품명,이미지,상품명,판매가</div>
                    </div>
                     <div className="flex h-12 items-center">
                        <div className="w-40 bg-gray-50 px-4 font-bold text-gray-700 h-full flex items-center">디스플레이 유형</div>
                        <div className="flex-1 px-4 text-gray-600">리스트형</div>
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
