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
  BookOpen
} from "lucide-react";

export default function AddOnGroupPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">추가상품 그룹 관리</h1>
        <Button
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-50 font-bold h-9 px-4 rounded-sm"
        >
          + 추가상품 그룹 등록
        </Button>
      </div>

      {/* Search Section */}
      <div className="border-t-2 border-gray-500 border-b border-gray-200 mb-8 border-l border-r">
        <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-[#FBFBFB]">
           <h2 className="font-bold text-gray-700">추가상품 그룹 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="p-0">
             {/* Row 1: Supplier Type */}
            <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    공급사 구분
                </div>
                <div className="flex-1 p-3 flex items-center gap-4">
                     <RadioGroup defaultValue="all" className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all" id="supplier-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="supplier-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="head" id="supplier-head" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="supplier-head" className="text-gray-700 font-normal cursor-pointer">본사</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="provider" id="supplier-provider" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="supplier-provider" className="text-gray-700 font-normal cursor-pointer">공급사</Label>
                            </div>
                        </RadioGroup>
                        <Button variant="secondary" className="h-6 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm px-2">
                            공급사 선택
                        </Button>
                </div>
            </div>

             {/* Row 2: Search Query */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-3 flex gap-2">
                    <Select defaultValue="integrated">
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300">
                            <SelectValue placeholder="=통합검색=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="integrated">=통합검색=</SelectItem>
                        </SelectContent>
                    </Select>
                     <Input className="w-[300px] h-7 border-gray-300" />
                </div>
            </div>

             {/* Row 3: Date Search */}
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
                        <Input className="w-28 h-7 text-center border-gray-300" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <span>~</span>
                    <div className="flex items-center gap-1">
                        <Input className="w-28 h-7 text-center border-gray-300" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-0.5 ml-1">
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">오늘</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">7일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">15일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1개월</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">3개월</Button>
                        <Button variant="default" size="sm" className="h-7 px-2 text-[11px] bg-gray-600 text-white rounded-sm hover:bg-gray-700">전체</Button>
                    </div>
                </div>
            </div>

        </div>
         
         <div className="bg-white p-4 flex justify-center border-t border-gray-200">
             <Button className="bg-[#555555] hover:bg-[#444444] text-white font-bold h-9 w-24 rounded-sm">검색</Button>
         </div>
      </div>

      {/* List Header */}
      <div className="flex justify-between items-end mb-2">
          <div className="text-xs text-gray-700 font-bold">
              검색 <span className="text-red-500">0</span>개 / 전체 <span className="text-red-500">0</span>개
          </div>
          <div className="flex gap-1">
               <Select defaultValue="date_desc">
                    <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="등록일 ↓" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date_desc">등록일 ↓</SelectItem>
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
      <div className="border-t-2 border-gray-400 mb-4 overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse table-fixed min-w-[1000px]">
              <colgroup>
                  <col className="w-10" />
                  <col className="w-16" />
                  <col className="w-32" />
                  <col className="" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-16" />
              </colgroup>
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr>
                      <th className="py-2.5 border-r border-[#CDCDCD]">
                          <Checkbox className="bg-white border-gray-300 rounded-[2px]"/>
                      </th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">번호</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">그룹코드</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">그룹명</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">공급사</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">추가상품 개수</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">등록일/수정일</th>
                      <th className="py-2.5">수정</th>
                  </tr>
              </thead>
              <tbody className="text-gray-600 bg-white">
                  <tr>
                      <td colSpan={8} className="py-10 border-b border-gray-200 text-center text-sm">
                          검색된 정보가 없습니다.
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

      {/* Pagination & Actions */}
      <div className="flex justify-between items-center bg-[#F9F9F9] p-3 border-t border-b border-gray-200 mb-10">
          <div className="flex gap-1">
               <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 hover:bg-gray-50 text-gray-700 rounded-sm shadow-sm px-3 font-normal">선택 복사</Button>
               <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 hover:bg-gray-50 text-gray-700 rounded-sm shadow-sm px-3 font-normal">선택 삭제</Button>
          </div>
      </div>
      
      {/* Guide Section */}
       <div className="mt-8">
            <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs mb-2">
                 <BookOpen className="w-4 h-4" /> 
                 <span>안내</span>
            </div>
            <div className="text-xs space-y-3 text-gray-600 border-t border-gray-200 pt-3">
               <div>
                   <h3 className="font-bold text-gray-800 mb-1">[추가상품 정보] 선택 복사는 무엇인가요?</h3>
                   <p>· 추가상품 그룹 리스트 내 선택된 그룹과 동일한 정보의 추가상품 그룹이 추가 생성됩니다.</p>
                   <p>· 유사한 추가상품 그룹을 연속해서 등록을 할 때 편리하게 사용할 수 있습니다.</p>
               </div>
               
               <div>
                   <h3 className="font-bold text-gray-800 mb-1">[추가상품 정보] 선택 삭제는 무엇인가요?</h3>
                   <p>· 추가상품 그룹 리스트 내 운영자가 선택한 추가상품 그룹을 삭제처리 합니다.</p>
                   <p className="text-red-500 font-bold">- 삭제된 정보는 복구가 불가능하므로 삭제 시 유의하시기 바랍니다.</p>
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
