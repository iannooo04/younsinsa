"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  FileSpreadsheet, // Using FileSpreadsheet as a substitute for the excel icon
} from "lucide-react";

export default function CommonInfoManagementPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">상품상세 공통정보 관리</h1>
        <Button
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-50 font-bold"
        >
          + 공통정보 등록
        </Button>
      </div>

      {/* Search Section */}
      <div className="border border-gray-200 mb-8">
        <div className="flex items-center gap-2 p-3 bg-gray-50 border-b border-gray-200">
           <h2 className="font-bold text-gray-700">공통정보 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        <div className="p-4 space-y-4">
             {/* Row 1: Common Info Title */}
            <div className="flex items-center text-xs">
                <div className="w-32 font-bold text-gray-700">공통정보 제목</div>
                <div className="flex-1">
                    <Input className="w-[300px] h-8" />
                </div>
            </div>

             {/* Row 2: Date Search */}
             <div className="flex items-center text-xs">
                <div className="w-32 font-bold text-gray-700">기간검색</div>
                <div className="flex-1 flex items-center gap-2">
                     <Select defaultValue="reg_date">
                        <SelectTrigger className="w-24 h-8 text-[11px] border-gray-300">
                            <SelectValue placeholder="등록일" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="reg_date">등록일</SelectItem>
                        </SelectContent>
                    </Select>
                     <div className="flex items-center gap-1">
                        <Input className="w-28 h-8 text-center" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <span>~</span>
                    <div className="flex items-center gap-1">
                        <Input className="w-28 h-8 text-center" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-0.5">
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-l-sm border-r-0 hover:bg-gray-50">오늘</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-none border-r-0 hover:bg-gray-50">7일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-none border-r-0 hover:bg-gray-50">15일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-none border-r-0 hover:bg-gray-50">1개월</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-none border-r-0 hover:bg-gray-50">3개월</Button>
                        <Button variant="default" size="sm" className="h-7 px-2 text-[11px] bg-gray-600 text-white rounded-r-sm hover:bg-gray-700">전체</Button>
                    </div>
                </div>
            </div>

            {/* Row 3: Exposure Period & Status */}
            <div className="flex text-xs border-t border-gray-100 pt-4 mt-2">
                 {/* Exposure Period */}
                <div className="w-[50%] flex items-center">
                    <div className="w-32 font-bold text-gray-700">노출기간</div>
                    <div className="flex-1">
                        <RadioGroup defaultValue="all" className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all" id="period-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="period-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="unlimited" id="period-unlimited" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="period-unlimited" className="text-gray-700 font-normal cursor-pointer">제한없음</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="limited" id="period-limited" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="period-limited" className="text-gray-700 font-normal cursor-pointer">기간제한용</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                {/* Status */}
                <div className="w-[50%] flex items-center">
                    <div className="w-32 font-bold text-gray-700 bg-gray-50 p-2 text-center mr-4">진행상태</div>
                    <div className="flex-1">
                        <RadioGroup defaultValue="all" className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all" id="status-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="status-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="waiting" id="status-waiting" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="status-waiting" className="text-gray-700 font-normal cursor-pointer">대기</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="ongoing" id="status-ongoing" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="status-ongoing" className="text-gray-700 font-normal cursor-pointer">진행중</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="ended" id="status-ended" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="status-ended" className="text-gray-700 font-normal cursor-pointer">종료</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>

            {/* Row 4: Exposure Status */}
            <div className="flex items-center text-xs">
                <div className="w-32 font-bold text-gray-700">노출상태</div>
                <div className="flex-1">
                     <RadioGroup defaultValue="all" className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all" id="exposure-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="exposure-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="visible" id="exposure-visible" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="exposure-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="hidden" id="exposure-hidden" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="exposure-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                            </div>
                        </RadioGroup>
                </div>
            </div>

            {/* Row 5: Product Condition */}
            <div className="flex items-center text-xs">
                <div className="w-32 font-bold text-gray-700">상품조건</div>
                <div className="flex-1">
                     <RadioGroup defaultValue="all" className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all" id="prod-cond-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="prod-cond-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all-prod" id="prod-cond-all-prod" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="prod-cond-all-prod" className="text-gray-700 font-normal cursor-pointer">전체 상품</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="specific-prod" id="prod-cond-specific" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="prod-cond-specific" className="text-gray-700 font-normal cursor-pointer">특정 상품</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="specific-cat" id="prod-cond-cat" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="prod-cond-cat" className="text-gray-700 font-normal cursor-pointer">특정 카테고리</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="specific-brand" id="prod-cond-brand" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="prod-cond-brand" className="text-gray-700 font-normal cursor-pointer">특정 브랜드</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="specific-supplier" id="prod-cond-supplier" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="prod-cond-supplier" className="text-gray-700 font-normal cursor-pointer">특정 공급사</Label>
                            </div>
                        </RadioGroup>
                </div>
            </div>

        </div>
         
         <div className="bg-[#5D5D5D] p-3 flex justify-center">
             <Button className="bg-[#444444] hover:bg-[#333333] text-white font-bold h-9 w-24 rounded-sm">검색</Button>
         </div>
      </div>

      {/* List Header */}
      <div className="flex justify-between items-end mb-2">
          <div className="text-xs text-gray-700 font-bold">
              공통정보 리스트 (검색 <span className="text-red-500">0</span>개 / 전체 <span className="text-red-500">0</span>개)
          </div>
          <div className="flex gap-1">
               <Select defaultValue="date_asc">
                    <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="등록일 ↑" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date_asc">등록일 ↑</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="10">
                    <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="10개 보기" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10개 보기</SelectItem>
                    </SelectContent>
                </Select>
          </div>
      </div>

      {/* Table */}
      <div className="border-t-2 border-gray-400 mb-4">
          <table className="w-full text-xs text-center border-collapse">
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr>
                      <th className="py-2 border-r border-[#CDCDCD] w-10">
                          <Checkbox className="bg-white border-gray-300"/>
                      </th>
                      <th className="py-2 border-r border-[#CDCDCD] w-12">번호</th>
                      <th className="py-2 border-r border-[#CDCDCD]">공통정보 제목</th>
                      <th className="py-2 border-r border-[#CDCDCD] w-32">노출기간</th>
                      <th className="py-2 border-r border-[#CDCDCD] w-20">진행상태</th>
                      <th className="py-2 border-r border-[#CDCDCD] w-20">노출상태</th>
                      <th className="py-2 border-r border-[#CDCDCD] w-24">상품조건</th>
                      <th className="py-2 border-r border-[#CDCDCD] w-24">예외조건</th>
                      <th className="py-2 w-24">등록일/수정일</th>
                      <th className="py-2 w-16">수정</th>
                  </tr>
              </thead>
              <tbody className="text-gray-600">
                  <tr>
                      <td colSpan={10} className="py-10 border-b border-gray-200 text-center">
                          검색된 정보가 없습니다.
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

      {/* Pagination & Actions */}
      <div className="flex justify-between items-center bg-[#F9F9F9] p-2 border-t border-b border-gray-200 mb-10">
          <Button variant="outline" size="sm" className="h-7 text-xs bg-white border-gray-300 hover:bg-gray-50 text-gray-600 rounded-none shadow-sm">선택 삭제</Button>
           
           <div className="flex items-center gap-1">
               <Button variant="outline" size="sm" className="h-7  bg-white border-gray-300 hover:bg-gray-50 text-green-600 rounded-sm flex items-center gap-1 px-2 font-bold">
                   <FileSpreadsheet className="w-3.5 h-3.5 fill-current" />
                   엑셀다운로드
               </Button>
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
