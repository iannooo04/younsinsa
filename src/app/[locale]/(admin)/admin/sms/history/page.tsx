"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  Calendar as CalendarIcon
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

export default function SmsHistoryPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">SMS 발송 내역 보기</h1>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">SMS 발송 내역 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Search Keyword & Type */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-3 flex items-center gap-1 border-r border-gray-200">
                    <Select defaultValue="integrated">
                        <SelectTrigger className="w-32 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="=통합검색=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="integrated">=통합검색=</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input className="w-80 h-7 text-xs border-gray-300" placeholder="검색어에 포함된 내용을 입력하세요." />
                </div>
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    발송 유형
                </div>
                <div className="flex-1 p-3 flex items-center">
                    <RadioGroup defaultValue="all" className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="type-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="type-all" className="text-gray-600 font-normal cursor-pointer text-xs">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="auto" id="type-auto" className="border-gray-300 text-gray-600" />
                             <Label htmlFor="type-auto" className="text-gray-600 font-normal cursor-pointer text-xs">자동발송</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="manual" id="type-manual" className="border-gray-300 text-gray-600" />
                             <Label htmlFor="type-manual" className="text-gray-600 font-normal cursor-pointer text-xs">개별/전체발송</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

             {/* Date Range */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    기간검색
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                      <Select defaultValue="send_date">
                        <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="발송일" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="send_date">발송일</SelectItem>
                        </SelectContent>
                    </Select>
                     <div className="relative">
                         <Input className="w-32 h-7 text-xs border-gray-300 pr-8" defaultValue="2026-01-04" />
                         <CalendarIcon className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1.5" />
                     </div>
                     <span className="text-gray-400">~</span>
                     <div className="relative">
                         <Input className="w-32 h-7 text-xs border-gray-300 pr-8" defaultValue="2026-01-10" />
                         <CalendarIcon className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1.5" />
                     </div>
                     <div className="flex items-center ml-2 border border-gray-300 rounded-[2px] flex-shrink-0 w-max h-7">
                        <button className="h-full px-2.5 bg-white text-gray-600 hover:bg-gray-50 border-r border-gray-300 text-xs whitespace-nowrap flex-shrink-0">오늘</button>
                        <button className="h-full px-2.5 bg-[#555555] text-white border-r border-gray-300 text-xs font-bold whitespace-nowrap flex-shrink-0">7일</button>
                        <button className="h-full px-2.5 bg-white text-gray-600 hover:bg-gray-50 border-r border-gray-300 text-xs whitespace-nowrap flex-shrink-0">15일</button>
                        <button className="h-full px-2.5 bg-white text-gray-600 hover:bg-gray-50 border-r border-gray-300 text-xs whitespace-nowrap flex-shrink-0">1개월</button>
                        <button className="h-full px-2.5 bg-white text-gray-600 hover:bg-gray-50 border-r border-gray-300 text-xs whitespace-nowrap flex-shrink-0">3개월</button>
                        <button className="h-full px-2.5 bg-white text-gray-600 hover:bg-gray-50 text-xs whitespace-nowrap flex-shrink-0">1년</button>
                     </div>
                </div>
            </div>
            
            {/* Category & Status */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    발송 구분
                </div>
                <div className="flex-1 p-3 flex items-center border-r border-gray-200">
                    <RadioGroup defaultValue="all" className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="cat-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="cat-all" className="text-gray-600 font-normal cursor-pointer text-xs">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="sms" id="cat-sms" className="border-gray-300 text-gray-600" />
                             <Label htmlFor="cat-sms" className="text-gray-600 font-normal cursor-pointer text-xs">SMS</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="lms" id="cat-lms" className="border-gray-300 text-gray-600" />
                             <Label htmlFor="cat-lms" className="text-gray-600 font-normal cursor-pointer text-xs">LMS</Label>
                        </div>
                    </RadioGroup>
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    발송 상태
                </div>
                <div className="flex-1 p-3 flex items-center">
                     <Select defaultValue="all">
                        <SelectTrigger className="w-32 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="=전체보기=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">=전체보기=</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
        
         <div className="flex justify-center mt-6">
              <Button className="h-10 px-12 text-sm bg-[#555555] hover:bg-[#444444] text-white rounded-[2px] font-bold">
                검색
            </Button>
         </div>
      </div>

       {/* Results */}
       <div className="mb-0">
           <div className="flex items-center justify-between mb-2 mt-4">
               <div className="text-xs font-bold text-red-500">
                   검색 0개
               </div>
               <div className="flex items-center gap-1">
                   <Select defaultValue="date_desc">
                        <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="발송일 ↓" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date_desc">발송일 ↓</SelectItem>
                        </SelectContent>
                    </Select>
                   <Select defaultValue="10">
                        <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="10개 보기" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10개 보기</SelectItem>
                            <SelectItem value="20">20개 보기</SelectItem>
                            <SelectItem value="50">50개 보기</SelectItem>
                        </SelectContent>
                    </Select>
               </div>
           </div>
           
           <div className="border-t-2 border-gray-400 border-b border-gray-200 min-h-[100px] mb-4">
                <table className="w-full text-xs text-center border-collapse">
                     <thead>
                         <tr className="bg-[#B9B9B9] text-white h-9 border-b border-gray-300 font-normal">
                             <th className="w-16 border-r border-gray-300">번호</th>
                             <th className="w-24 border-r border-gray-300">발송유형</th>
                             <th className="w-20 border-r border-gray-300">구분</th>
                             <th className="w-24 border-r border-gray-300">차감포인트</th>
                             <th className="border-r border-gray-300">SMS 내용</th>
                             <th className="w-24 border-r border-gray-300">발송자</th>
                             <th className="w-32 border-r border-gray-300">발송(예약)일시</th>
                             <th className="w-40 border-r border-gray-300">
                                 <div className="leading-tight py-1">
                                     발송건수<br/>
                                     (발송성공/발송실패)
                                 </div>
                             </th>
                             <th className="w-24 border-r border-gray-300">발송상태</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr className="h-14">
                             <td colSpan={9} className="text-center text-gray-500">SMS 발송내역이 없습니다.</td>
                         </tr>
                     </tbody>
                </table>
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
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0">
                         <ChevronUp className="w-4 h-4 rotate-180" />
                </Button>
            </div>
        </div>
    </div>
  );
}
