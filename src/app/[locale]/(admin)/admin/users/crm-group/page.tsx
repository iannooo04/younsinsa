"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Youtube,
  ChevronUp,
  Calendar as CalendarIcon,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@/i18n/routing";

export default function CrmGroupListPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">CRM 그룹 리스트</h1>
      </div>

       <div className="mb-0">
           <Tabs defaultValue="one-time" className="w-full">
                <TabsList className="bg-transparent p-0 justify-start h-10 mb-6 w-full rounded-none border-b border-purple-500">
                     <TabsTrigger 
                        value="one-time" 
                        className="rounded-none bg-white data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 text-gray-500 h-10 px-4 font-bold text-sm"
                    >
                        1회 추출 그룹 관리
                    </TabsTrigger>
                     <TabsTrigger 
                        value="recurring" 
                        className="rounded-none bg-white data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 text-gray-500 h-10 px-4 font-bold text-sm"
                    >
                        반복 추출 그룹 관리
                    </TabsTrigger>
                </TabsList>

                {/* Info Box */}
                <div className="border border-gray-200 rounded-sm p-4 bg-white mb-6">
                    <ul className="list-disc pl-4 space-y-1 text-gray-500 text-xs">
                        <li>CRM 그룹의 회원 데이터는 추출 완료일로부터 7일 동안 보관 후 삭제됩니다.</li>
                        <li><Link href="#" className="text-blue-500 underline">CRM 그룹 관리 사용 가이드</Link></li>
                    </ul>
                </div>

                {/* Filter Section */}
                <div className="bg-white mb-8">
                     <div className="flex items-center gap-4 mb-3">
                         <div className="w-20 font-bold text-gray-700">검색어</div>
                         <div className="flex-1 flex items-center gap-2">
                            <Select defaultValue="group_name">
                                <SelectTrigger className="w-32 h-9 text-xs border-gray-300 rounded-[4px]">
                                    <SelectValue placeholder="그룹명" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="group_name">그룹명</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input className="w-80 h-9 text-xs border-gray-300 rounded-[4px]" placeholder="검색어를 입력하세요" />
                         </div>
                         <div className="w-24">
                              <Button className="w-full h-9 bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold rounded-[4px]">검색</Button>
                         </div>
                     </div>
                     <div className="flex items-center gap-4">
                         <div className="w-20 font-bold text-gray-700">등록일</div>
                         <div className="flex-1 flex items-center gap-2">
                             <div className="flex border border-gray-300 rounded-[4px] overflow-hidden">
                                <button className="h-8 px-3 bg-white text-gray-500 hover:bg-gray-50 border-r border-gray-300 text-xs">오늘</button>
                                <button className="h-8 px-3 bg-white text-gray-900 hover:bg-gray-50 border-r border-gray-300 text-xs font-bold">1주일</button>
                                <button className="h-8 px-3 bg-white text-gray-500 hover:bg-gray-50 border-r border-gray-300 text-xs">15일</button>
                                <button className="h-8 px-3 bg-white text-gray-500 hover:bg-gray-50 border-r border-gray-300 text-xs">1개월</button>
                                <button className="h-8 px-3 bg-white text-gray-500 hover:bg-gray-50 border-r border-gray-300 text-xs">3개월</button>
                                <button className="h-8 px-3 bg-white text-gray-500 hover:bg-gray-50 text-xs">전체</button>
                             </div>
                             <div className="flex items-center gap-2 ml-2">
                                 <div className="relative">
                                     <Input className="w-32 h-9 text-xs border-gray-300 pr-8 rounded-[4px]" defaultValue="2026-01-03" />
                                     <CalendarIcon className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                                 </div>
                                 <span className="text-gray-400">-</span>
                                 <div className="relative">
                                     <Input className="w-32 h-9 text-xs border-gray-300 pr-8 rounded-[4px]" defaultValue="2026-01-10" />
                                     <CalendarIcon className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                                 </div>
                             </div>
                         </div>
                         <div className="w-24">
                             <Button variant="outline" className="w-full h-9 border-gray-300 text-gray-700 font-bold rounded-[4px] hover:bg-gray-50">초기화</Button>
                         </div>
                     </div>
                </div>

                {/* Results Section */}
                <div>
                     <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700 text-xs font-bold">검색 결과 총 <span className="text-red-500">0</span> 건</span>
                            <span className="text-gray-300">|</span>
                            <Button variant="outline" className="h-7 px-3 text-xs border-gray-300 text-gray-600 rounded-[2px] bg-white hover:bg-gray-50 font-bold">선택 삭제</Button>
                        </div>
                        <Select defaultValue="30">
                            <SelectTrigger className="w-28 h-8 text-xs border-gray-300 rounded-[4px]">
                                <SelectValue placeholder="30개 보기" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="30">30개 보기</SelectItem>
                                <SelectItem value="50">50개 보기</SelectItem>
                                <SelectItem value="100">100개 보기</SelectItem>
                            </SelectContent>
                        </Select>
                     </div>

                     <div className="border border-gray-200 rounded-[4px] overflow-hidden min-h-[300px] mb-4">
                        <table className="w-full text-xs text-center">
                             <thead>
                                 <tr className="bg-[#F8F9FA] border-b border-gray-200 text-gray-700 font-bold h-10">
                                     <th className="w-12 border-r border-gray-100"><Checkbox className="rounded-[2px] border-gray-300" /></th>
                                     <th className="w-24 border-r border-gray-100">그룹 번호</th>
                                     <th className="border-r border-gray-100">그룹명</th>
                                     <th className="w-24 border-r border-gray-100">회원 수</th>
                                     <th className="w-24 border-r border-gray-100">추출 상태</th>
                                     <th className="w-32 border-r border-gray-100">추출 완료일</th>
                                     <th className="w-32 border-r border-gray-100">등록일</th>
                                     <th className="w-32">엑셀 다운로드</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <tr className="h-40">
                                     <td colSpan={8} className="text-center text-gray-400">데이터가 존재하지 않습니다.</td>
                                 </tr>
                             </tbody>
                        </table>
                     </div>

                     {/* Pagination */}
                     <div className="flex justify-between items-center">
                         <Button variant="outline" className="h-9 px-3 text-gray-400 border-gray-300 rounded-[4px] hover:bg-gray-50 gap-1" disabled>
                            <ChevronLeft className="w-4 h-4" /> 이전
                         </Button>
                         <div className="flex gap-1">
                             <Button className="w-8 h-8 bg-[#F1F3F5] text-gray-700 font-bold hover:bg-[#E9ECEF] border-0 rounded-[4px]">1</Button>
                         </div>
                         <Button variant="outline" className="h-9 px-3 text-gray-400 border-gray-300 rounded-[4px] hover:bg-gray-50 gap-1" disabled>
                             다음 <ChevronRight className="w-4 h-4" />
                         </Button>
                     </div>
                </div>
            </Tabs>
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
