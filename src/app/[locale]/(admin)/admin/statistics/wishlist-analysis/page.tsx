"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, HelpCircle } from "lucide-react";

export default function WishlistAnalysisPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">관심상품 분석</h1>
      </div>

       <div className="flex items-center gap-1 mb-2">
         <h2 className="text-base font-bold text-gray-700">관심상품 검색</h2>
         <HelpCircle className="w-4 h-4 text-gray-400" />
      </div>

      {/* Search Filter Section */}
      <div className="border-t border-gray-400 mb-6">
        {/* Period */}
        <div className="flex border-b border-gray-200">
          <div className="w-40 bg-gray-50 p-3 flex items-center font-bold text-gray-700">
            기간검색
          </div>
          <div className="flex-1 p-3 flex items-center gap-2">
            <div className="relative">
              <Input defaultValue="2026-01-05" className="w-32 h-8 text-xs border-gray-300 rounded-[4px] pl-3 pr-8" />
              <Calendar className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" />
            </div>
            <span className="text-gray-400">~</span>
            <div className="relative">
              <Input defaultValue="2026-01-11" className="w-32 h-8 text-xs border-gray-300 rounded-[4px] pl-3 pr-8" />
              <Calendar className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" />
            </div>
            <div className="flex items-center ml-2 border border-gray-300 rounded overflow-hidden divide-x divide-gray-300">
              <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-600 transition-colors">오늘</button>
              <button className="px-3 py-1.5 bg-gray-600 text-white font-bold transition-colors">7일</button>
              <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-600 transition-colors">15일</button>
              <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-600 transition-colors">1개월</button>
              <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-600 transition-colors">3개월</button>
            </div>
          </div>
        </div>

        {/* Keyword */}
        <div className="flex border-b border-gray-200">
          <div className="w-40 bg-gray-50 p-3 flex items-center font-bold text-gray-700">
            검색어
          </div>
          <div className="flex-1 p-3 flex items-center gap-2">
             <Select defaultValue="integrated">
              <SelectTrigger className="w-32 h-8 text-xs border-gray-300">
                <SelectValue placeholder="=통합검색=" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="integrated">=통합검색=</SelectItem>
              </SelectContent>
            </Select>
            <Input className="w-64 h-8 text-xs border-gray-300 rounded-[4px]" />
          </div>
        </div>

        {/* Sale Status */}
        <div className="flex border-b border-gray-200">
          <div className="w-40 bg-gray-50 p-3 flex items-center font-bold text-gray-700">
            판매상태
          </div>
          <div className="flex-1 p-3 flex items-center gap-6">
            <RadioGroup defaultValue="all" className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all" id="sale-all" className="text-red-500 border-gray-300" />
                <Label htmlFor="sale-all" className="font-normal cursor-pointer">전체</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="yes" id="sale-yes" className="text-red-500 border-gray-300" />
                <Label htmlFor="sale-yes" className="font-normal cursor-pointer">판매함</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="no" id="sale-no" className="text-red-500 border-gray-300" />
                <Label htmlFor="sale-no" className="font-normal cursor-pointer">판매안함</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex border-b border-gray-200">
          <div className="w-40 bg-gray-50 p-3 flex items-center font-bold text-gray-700">
            품절상태
          </div>
          <div className="flex-1 p-3 flex items-center gap-6">
            <RadioGroup defaultValue="all" className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all" id="stock-all" className="text-red-500 border-gray-300" />
                <Label htmlFor="stock-all" className="font-normal cursor-pointer">전체</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="soldout" id="stock-soldout" className="text-red-500 border-gray-300" />
                <Label htmlFor="stock-soldout" className="font-normal cursor-pointer">품절</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="normal" id="stock-normal" className="text-red-500 border-gray-300" />
                <Label htmlFor="stock-normal" className="font-normal cursor-pointer">정상</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center mb-10">
        <Button className="w-24 h-10 bg-[#4B5563] hover:bg-[#374151] text-white font-bold rounded-[2px]">
          검색
        </Button>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-2 p-3 bg-[#f5f5f5] border border-gray-200 rounded-[2px] border-b-0">
        <div className="flex items-center gap-2">
            <span className="text-gray-600 font-normal">검색결과 <span className="text-[#FF424D]">0</span> 개</span>
        </div>
        <Button variant="outline" className="h-[26px] px-3 gap-1.5 text-[12px] font-normal border-gray-300 rounded-[2px] bg-white text-gray-600 hover:bg-gray-50">
            <span className="w-4 h-4 bg-green-600 text-white flex items-center justify-center rounded text-[10px] font-bold">X</span> 엑셀 다운로드
        </Button>
      </div>

      {/* Results Table Section */}
      <div className="mb-12">
        <div className="border border-gray-300 border-t-0">
           <table className="w-full text-center border-collapse text-xs">
            <thead>
               <tr className="bg-[#f5f5f5] text-gray-700 h-10 border-b border-gray-300 font-semibold text-center">
                <th className="border-r border-gray-300 w-16">순위</th>
                <th className="border-r border-gray-300 w-40">고객수</th>
                <th className="border-r border-gray-300 w-40">이미지</th>
                <th className="border-r border-gray-300">상품명</th>
                <th className="border-r border-gray-300 w-40">가격</th>
                <th className="border-r border-gray-300 w-40">재고</th>
                <th className="w-40">등록일</th>
               </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="h-40 text-center text-gray-500 font-bold">
                  데이터가 존재하지 않습니다.
                </td>
              </tr>
            </tbody>
           </table>
        </div>
      </div>
      
       {/* Help Section */}
      <div className="border-t border-gray-300 pt-6">
        <h3 className="flex items-center gap-2 text-[#5BA0E8] font-bold mb-4 text-xs">
           <span className="w-4 h-4 border border-[#5BA0E8] flex items-center justify-center text-[10px] font-serif">i</span> 
           안내
        </h3>
        <div className="space-y-6 text-xs text-gray-600">
          <div>
            <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 관심상품 분석의 기준은 무엇인가요?</h4>
            <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>관심상품 분석은 조회기간 동안 쇼핑몰 찜리스트에 담긴 상품의 데이터 수치가 집계됩니다.</li>
              <li><span className="mr-1">·</span>조회기간 동안 찜리스트에 담긴 내역이 없는 상품의 데이터는 집계되지 않습니다.</li>
              <li className="text-[#FF424D] mt-1"><span className="mr-1">·</span>찜리스트에 담긴 상품은 찜리스트에서 삭제되기 전까지 일별 데이터 수치에 반복적으로 집계됩니다.</li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 순위선정 기준은 무엇인가요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>순위는 "고객수"가 가장 많은 순으로 적용되며, 동일한 값이 있는 경우 "상품명"의 오름차순으로 적용됩니다.</li>
            </ul>
          </div>
        </div>
      </div>

       
       {/* Footer Copyright */}
       <div className="mt-12 py-6 text-center text-[11px] text-gray-400 border-t border-gray-300 mt-12">
        © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
      </div>

    </div>
  );
}
