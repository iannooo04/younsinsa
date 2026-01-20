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
  Calendar,
  Youtube,
  ChevronUp,
} from "lucide-react";

export default function AddressBookPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">자주쓰는 주소 관리</h1>
        <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 font-bold h-9 px-4 rounded-sm text-xs flex items-center gap-1">
            <span className="text-lg leading-none mb-0.5">+</span> 자주쓰는 주소 등록
        </Button>
      </div>

      {/* Search Section */}
      <div className="border-t-2 border-gray-500 border-b border-gray-200 mb-8 border-l border-r">
        {/* Search Header */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-[#FBFBFB]">
           <h2 className="font-bold text-gray-700">주소 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="p-0">
             {/* Search Query & Group */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-3 flex gap-2 border-r border-gray-200">
                    <Select defaultValue="all_search">
                        <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="=통합검색=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all_search">=통합검색=</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="exact_match">
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="검색어 전체일치" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="exact_match">검색어 전체일치</SelectItem>
                        </SelectContent>
                    </Select>
                     <Input className="w-[300px] h-7 border-gray-300" placeholder="검색어 전체를 정확히 입력하세요." />
                </div>
                 <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    그룹
                </div>
                 <div className="flex-1 p-3">
                     <Select defaultValue="all_group">
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="=통합그룹=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all_group">=통합그룹=</SelectItem>
                        </SelectContent>
                     </Select>
                 </div>
            </div>

             {/* Date Search */}
             <div className="flex items-center text-xs">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    기간검색
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                     <Select defaultValue="reg_date">
                        <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300">
                            <SelectValue placeholder="등록일" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="reg_date">등록일</SelectItem>
                        </SelectContent>
                    </Select>
                     <div className="flex items-center gap-1">
                        <Input className="w-28 h-7 text-center border-gray-300" defaultValue="2026-01-04" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <span>~</span>
                    <div className="flex items-center gap-1">
                        <Input className="w-28 h-7 text-center border-gray-300" defaultValue="2026-01-10" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-0.5 ml-1">
                         <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">오늘</Button>
                        <Button variant="default" size="sm" className="h-7 px-2 text-[11px] bg-gray-600 text-white rounded-sm hover:bg-gray-700">7일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">15일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1개월</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">3개월</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1년</Button>
                    </div>
                </div>
            </div>
        </div>
         
         <div className="bg-white p-4 flex justify-center border-t border-gray-200">
             <Button className="bg-[#555555] hover:bg-[#444444] text-white font-bold h-10 w-32 rounded-sm text-sm">검색</Button>
         </div>
      </div>

      {/* List Header */}
      <div className="flex justify-between items-end mb-2">
          <div className="text-xs text-gray-700 font-bold">
              검색 <span className="text-red-500">0</span>개 / 전체 <span className="text-red-500">0</span>개
          </div>
          <div className="flex gap-1 items-center">
               <Select defaultValue="reg_date_desc">
                    <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="등록일 ↓" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="reg_date_desc">등록일 ↓</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="10">
                    <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="10개 보기" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10개 보기</SelectItem>
                    </SelectContent>
                </Select>
          </div>
      </div>
      
      {/* Table */}
      <div className="border border-gray-300 mb-4 overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse min-w-[1200px]">
              <colgroup>
                  <col className="w-10" />
                  <col className="w-16" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-16" />
              </colgroup>
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr className="h-10">
                      <th className="border-r border-[#CDCDCD]">
                          <Checkbox className="bg-white border-gray-300 rounded-[2px]"/>
                      </th>
                      <th className="border-r border-[#CDCDCD]">번호</th>
                      <th className="border-r border-[#CDCDCD]">그룹</th>
                      <th className="border-r border-[#CDCDCD]">이름</th>
                      <th className="border-r border-[#CDCDCD]">주소</th>
                      <th className="border-r border-[#CDCDCD]">이메일</th>
                      <th className="border-r border-[#CDCDCD]">전화번호/휴대폰번호</th>
                      <th className="border-r border-[#CDCDCD] px-1">사업자번호</th>
                      <th className="border-r border-[#CDCDCD] px-1">회사명/(대표자명)</th>
                      <th className="border-r border-[#CDCDCD]">메모</th>
                      <th className="border-r border-[#CDCDCD]">등록일</th>
                      <th className="">수정</th>
                  </tr>
              </thead>
              <tbody className="text-gray-600 bg-white">
                  <tr>
                      <td colSpan={12} className="py-10 border-b border-gray-200 text-center text-sm">
                          검색된 정보가 없습니다.
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

       {/* Action Toolbar Bottom */}
      <div className="flex bg-[#F9F9F9] p-3 border border-gray-300 mb-4">
              <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-3 ml-1">
                  선택 삭제
              </Button>
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
