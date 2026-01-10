"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  Calendar as CalendarIcon
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function MemberInfoEventPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">회원정보 이벤트</h1>
        <Button variant="outline" className="h-9 px-4 text-xs bg-white text-[#FF424D] border-[#FF424D] hover:bg-red-50 rounded-sm font-bold flex items-center gap-1">
            <span className="text-lg leading-none mb-0.5">+</span> 회원정보 이벤트 등록
        </Button>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">회원정보 이벤트 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Store */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    상점
                </div>
                <div className="flex-1 p-3">
                    <RadioGroup defaultValue="all" className="flex items-center gap-6">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="store-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="store-all" className="text-gray-600 font-normal cursor-pointer text-xs">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="kr" id="store-kr" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="store-kr" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-1">
                                🇰🇷 기준몰
                            </Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="cn" id="store-cn" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="store-cn" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-1">
                                🇨🇳 중문몰
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            {/* Search Word */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-3 flex items-center gap-1">
                     <Select defaultValue="all">
                        <SelectTrigger className="w-28 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="=통합검색=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">=통합검색=</SelectItem>
                            <SelectItem value="name">이벤트명</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="exact">
                        <SelectTrigger className="w-28 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="검색어 전체일치" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="exact">검색어 전체일치</SelectItem>
                            <SelectItem value="partial">검색어 부분일치</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input className="w-64 h-7 text-xs border-gray-300" placeholder="검색어 전체를 정확히 입력하세요." />
                </div>
            </div>

             {/* Status & Type */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    진행상태
                </div>
                <div className="flex-1 p-3 border-r border-gray-200">
                     <RadioGroup defaultValue="all" className="flex items-center gap-6">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="status-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="status-all" className="text-gray-600 font-normal cursor-pointer text-xs">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="ongoing" id="status-ongoing" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="status-ongoing" className="text-gray-600 font-normal cursor-pointer text-xs">진행중</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="ended" id="status-ended" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="status-ended" className="text-gray-600 font-normal cursor-pointer text-xs">종료</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="pending" id="status-pending" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="status-pending" className="text-gray-600 font-normal cursor-pointer text-xs">대기</Label>
                        </div>
                    </RadioGroup>
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    이벤트 유형
                </div>
                <div className="flex-1 p-3">
                     <RadioGroup defaultValue="all" className="flex items-center gap-6">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="type-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="type-all" className="text-gray-600 font-normal cursor-pointer text-xs">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="modify" id="type-modify" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="type-modify" className="text-gray-600 font-normal cursor-pointer text-xs">회원정보 수정</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="lifetime" id="type-lifetime" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="type-lifetime" className="text-gray-600 font-normal cursor-pointer text-xs">평생회원</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

             {/* Date Search */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    기간검색
                </div>
                <div className="flex-1 p-3">
                     <div className="flex items-center gap-2">
                        <Select defaultValue="reg_date">
                            <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white">
                                <SelectValue placeholder="등록일" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="reg_date">등록일</SelectItem>
                                <SelectItem value="start_date">시작일</SelectItem>
                                <SelectItem value="end_date">종료일</SelectItem>
                            </SelectContent>
                        </Select>
                         <div className="flex items-center gap-2">
                             <div className="relative">
                                 <Input className="w-24 h-7 text-xs border-gray-300 pr-8" defaultValue="2026-01-04" />
                                 <CalendarIcon className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1.5" />
                             </div>
                             <span className="text-gray-400">~</span>
                             <div className="relative">
                                 <Input className="w-24 h-7 text-xs border-gray-300 pr-8" defaultValue="2026-01-10" />
                                 <CalendarIcon className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1.5" />
                             </div>
                         </div>
                         <div className="flex gap-0">
                             <Button variant="outline" className="h-6 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-l-[2px] rounded-r-none hover:bg-gray-50 border-r-0">오늘</Button>
                             <Button variant="outline" className="h-6 px-3 text-[11px] bg-[#555555] border-[#555555] text-white rounded-none hover:bg-[#444444] z-10">7일</Button>
                             <Button variant="outline" className="h-6 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-none border-l-0 hover:bg-gray-50">15일</Button>
                             <Button variant="outline" className="h-6 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-none border-l-0 hover:bg-gray-50">1개월</Button>
                             <Button variant="outline" className="h-6 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-none border-l-0 hover:bg-gray-50">3개월</Button>
                             <Button variant="outline" className="h-6 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-r-[2px] rounded-l-none border-l-0 hover:bg-gray-50">1년</Button>
                         </div>
                     </div>
                </div>
            </div>
        </div>
        
         <div className="flex justify-center mt-6 mb-8">
              <Button className="h-9 px-10 text-xs bg-[#555555] hover:bg-[#444444] text-white rounded-[2px] font-bold">
                검색
            </Button>
         </div>
      </div>

       {/* Search Results */}
       <div className="mb-0">
           <div className="flex items-center justify-between mb-2">
               <div className="text-xs">
                   검색 <span className="text-red-500 font-bold">0</span>개 / 전체 <span className="text-red-500 font-bold">0</span>개
               </div>
               <div className="flex items-center gap-1">
                   <Select defaultValue="reg_date_desc">
                        <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="등록일 ↑" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="reg_date_desc">등록일 ↑</SelectItem>
                            <SelectItem value="reg_date_asc">등록일 ↓</SelectItem>
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
                             <th className="w-10 border-r border-gray-300"><Checkbox className="border-gray-50 opacity-50 bg-white" /></th>
                             <th className="w-12 border-r border-gray-300">번호</th>
                             <th className="w-20 border-r border-gray-300">상점구분</th>
                             <th className="border-r border-gray-300">이벤트명</th>
                             <th className="w-24 border-r border-gray-300">이벤트 유형</th>
                             <th className="w-24 border-r border-gray-300">진행상태</th>
                             <th className="w-48 border-r border-gray-300">진행기간</th>
                             <th className="w-24 border-r border-gray-300">등록자</th>
                             <th className="w-24 border-r border-gray-300">등록일</th>
                             <th className="w-24 border-r border-gray-300">참여내역관리</th>
                             <th className="w-20">수정</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr className="h-14">
                             <td colSpan={11} className="text-center text-gray-500">검색된 이벤트가 없습니다.</td>
                         </tr>
                     </tbody>
                </table>
           </div>

           {/* Footer Action */}
           <div className="bg-[#FBFBFB] p-3 flex justify-between items-center border border-gray-200">
                  <Button variant="secondary" className="h-7 px-3 text-[11px] bg-white border border-gray-300 text-gray-600 rounded-[2px] hover:bg-gray-50">선택삭제</Button>
                  <Button variant="secondary" className="h-7 px-3 text-[11px] bg-white border border-gray-300 text-gray-600 rounded-[2px] hover:bg-gray-50">종료하기</Button>
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
