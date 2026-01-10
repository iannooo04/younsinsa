"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  HelpCircle,
  FileSpreadsheet,
  Youtube,
  ChevronUp,
} from "lucide-react";

export default function ProductExcelDownloadPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">상품 엑셀 다운로드</h1>
      </div>

      {/* Product Download Tabs Section */}
      <div className="mb-6">
         <div className="flex items-center gap-2 mb-2">
            <h2 className="text-sm font-bold text-gray-700">상품 다운로드</h2>
            <HelpCircle className="w-4 h-4 text-gray-400" />
         </div>
         <div className="flex border-b border-gray-300">
             <div className="bg-white border border-gray-300 border-b-0 px-6 py-2.5 text-xs font-bold text-gray-900 cursor-pointer relative top-[1px]">
                 전체 상품 다운로드
             </div>
             <div className="bg-[#F5F5F5] border border-gray-300 border-l-0 border-b-0 px-6 py-2.5 text-xs text-gray-500 cursor-pointer hover:bg-gray-100">
                 검색 상품 다운로드
             </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="mb-8">
           <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-bold text-gray-700">상품 전체를 다운로드 받습니다.</h3>
              <HelpCircle className="w-4 h-4 text-gray-400" />
           </div>

           <div className="border-t border-gray-400 border-b border-gray-200">
               {/* Row 1: Download Button */}
               <div className="flex border-b border-gray-200">
                   <div className="w-40 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                       다운로드
                   </div>
                   <div className="flex-1 p-3">
                       <Button variant="outline" size="sm" className="h-8 bg-white border-gray-300 hover:bg-gray-50 text-green-600 font-bold flex items-center gap-1.5 px-3">
                           <div className="bg-green-600 text-white p-0.5 rounded-[2px]">
                               <FileSpreadsheet className="w-3 h-3 text-white fill-current" />
                           </div>
                           엑셀 다운로드
                       </Button>
                   </div>
               </div>

               {/* Row 2: Supplier Type */}
               <div className="flex border-b border-gray-200">
                   <div className="w-40 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                       공급사 구분
                   </div>
                   <div className="flex-1 p-3 flex items-center">
                        <RadioGroup defaultValue="head" className="flex gap-6">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="head" id="supplier-head" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="supplier-head" className="text-gray-700 font-normal cursor-pointer">본사</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="supplier" id="supplier-provider" className="border-gray-300 text-gray-600"/>
                                <Label htmlFor="supplier-provider" className="text-gray-700 font-normal cursor-pointer">공급사</Label>
                                <Button variant="secondary" className="h-6 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm px-2 ml-1">
                                    공급사 선택
                                </Button>
                            </div>
                        </RadioGroup>
                   </div>
               </div>

                {/* Row 3: Download Range */}
               <div className="flex border-gray-200">
                   <div className="w-40 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                       다운로드 범위
                   </div>
                   <div className="flex-1 p-3 flex items-center">
                        <RadioGroup defaultValue="all" className="flex gap-6 items-center">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all" id="range-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="range-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="partial" id="range-partial" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="range-partial" className="text-gray-700 font-normal cursor-pointer">부분</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex items-center ml-2 gap-2 text-gray-600">
                            <Input className="w-20 h-7 text-xs border-gray-300" defaultValue="1" />
                            <span>번째 부터</span>
                            <Input className="w-20 h-7 text-xs border-gray-300" defaultValue="300" />
                            <span>개의 상품</span>
                        </div>
                   </div>
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
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100 p-0">
                        <ChevronUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0 transform rotate-180">
                         <ChevronUp className="w-4 h-4" />
                </Button>
            </div>
        </div>

    </div>
  );
}
