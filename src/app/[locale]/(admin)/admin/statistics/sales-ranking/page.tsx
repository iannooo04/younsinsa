"use client";

import React, { useState } from "react";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Download, Youtube, ChevronUp, FileSpreadsheet, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SalesRankingPage() {
  const [activeTab, setActiveTab] = useState("product");

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">판매순위 분석</h1>
      </div>

       <div className="flex items-center gap-1 mb-2">
         <h2 className="text-base font-bold text-gray-700">판매순위 검색</h2>
         <HelpCircle className="w-4 h-4 text-gray-400" />
      </div>

      {/* Search Filter Section */}
      <div className="border-t border-gray-400 mb-6">
        {/* Shop */}
        <div className="flex border-b border-gray-200">
          <div className="w-40 bg-gray-50 p-3 flex items-center font-bold text-gray-700">
            상점
          </div>
          <div className="flex-1 p-3 flex items-center gap-6">
            <RadioGroup defaultValue="all" className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all" id="store-all" className="text-red-500 border-gray-300" />
                <Label htmlFor="store-all" className="font-normal cursor-pointer">전체</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="kr" id="store-kr" className="text-red-500 border-gray-300" />
                <Label htmlFor="store-kr" className="font-normal cursor-pointer flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full border bg-gray-100 flex items-center justify-center text-[10px]">🇰🇷</span> 기준몰
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="cn" id="store-cn" className="text-red-500 border-gray-300" />
                <Label htmlFor="store-cn" className="font-normal cursor-pointer flex items-center gap-1">
                 <span className="w-4 h-4 rounded-full border bg-gray-100 flex items-center justify-center text-[10px]">🇨🇳</span> 중문몰
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

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

        {/* Category */}
        <div className="flex border-b border-gray-200">
          <div className="w-40 bg-gray-50 p-3 flex items-center font-bold text-gray-700">
            카테고리
          </div>
          <div className="flex-1 p-3 flex items-center gap-2">
            <Select>
              <SelectTrigger className="w-40 h-8 text-xs border-gray-300">
                <SelectValue placeholder="=카테고리선택=" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">=카테고리선택=</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40 h-8 text-xs border-gray-300">
                <SelectValue placeholder="=카테고리선택=" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">=카테고리선택=</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40 h-8 text-xs border-gray-300">
                <SelectValue placeholder="=카테고리선택=" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">=카테고리선택=</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40 h-8 text-xs border-gray-300">
                <SelectValue placeholder="=카테고리선택=" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">=카테고리선택=</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Scope */}
        <div className="flex border-b border-gray-200">
          <div className="w-40 bg-gray-50 p-3 flex items-center font-bold text-gray-700">
            검색범위
          </div>
          <div className="flex-1 p-3 flex items-center gap-2">
            <Select defaultValue="include">
              <SelectTrigger className="w-48 h-8 text-xs border-gray-300">
                <SelectValue placeholder="카테고리 미지정 상품 포함" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="include">카테고리 미지정 상품 포함</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="sub">
              <SelectTrigger className="w-40 h-8 text-xs border-gray-300">
                <SelectValue placeholder="하위 카테고리 포함" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sub">하위 카테고리 포함</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="rep">
              <SelectTrigger className="w-56 h-8 text-xs border-gray-300">
                <SelectValue placeholder="대표카테고리 기준 데이터 표시" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rep">대표카테고리 기준 데이터 표시</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Name */}
        <div className="flex border-b border-gray-200">
          <div className="w-40 bg-gray-50 p-3 flex items-center font-bold text-gray-700">
            상품명
          </div>
          <div className="flex-1 p-3">
             <Input className="w-full max-w-md h-8 text-xs border-gray-300 rounded-[4px]" />
          </div>
        </div>
      </div>

      {/* Warnings */}
      <div className="mb-6 space-y-1">
        <p className="text-[#FF424D] text-[11px] font-bold flex items-start gap-1">
          <span className="bg-[#FF424D] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] mt-0.5">!</span>
          통계 데이터는 2시간마다 집계되므로 주문데이터와 약 1시간~2시간의 데이터 오차가 있을 수 있습니다.
        </p>
        <p className="text-[#FF424D] text-[11px] font-bold flex items-start gap-1">
          <span className="bg-[#FF424D] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] mt-0.5">!</span>
          옵션과 다중카테고리 기준 데이터가 2018년 12월 05일부터 제공됨에 따라 2018년 12월 05일 이전 데이터는 옵션과 다중카테고리 기준 데이터가 제공되지 않습니다.
        </p>
      </div>

      {/* Search Button */}
      <div className="flex justify-center mb-10">
        <Button className="w-24 h-10 bg-[#4B5563] hover:bg-[#374151] text-white font-bold rounded-[2px]">
          검색
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-0">
        <Tabs defaultValue="product" value={activeTab} onValueChange={setActiveTab} className="w-full">
           <TabsList className="bg-transparent border-b border-gray-300 w-full justify-start rounded-none h-11 p-0 space-x-1">
            <TabsTrigger 
              value="product" 
              className="px-6 h-10 rounded-t border border-gray-300 border-b-0 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:font-bold data-[state=active]:border-b-white bg-gray-50 text-gray-500 font-normal relative top-[1px]"
            >
              상품별 현황
            </TabsTrigger>
            <TabsTrigger 
              value="option" 
              className="px-6 h-10 rounded-t border border-gray-300 border-b-0 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:font-bold data-[state=active]:border-b-white bg-gray-50 text-gray-500 font-normal relative top-[1px]"
            >
              옵션별 현황
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Summary Cards */}
      <div className="border border-gray-300 border-t-0 p-0 mb-8 grid grid-cols-3 divide-x divide-gray-200">
        {/* Total Amount */}
        <div className="p-6 text-center bg-[#F3F6F9]/50">
          <h3 className="text-gray-600 font-bold mb-4">총 상품금액</h3>
          <div className="text-2xl font-normal text-gray-800 mb-6">0</div>
          <div className="space-y-2 text-xs text-gray-600 px-4">
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>PC</span>
              <span>0</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>모바일</span>
              <span>0</span>
            </div>
             <div className="flex justify-between">
              <span>수기주문</span>
              <span>0</span>
            </div>
          </div>
        </div>
        {/* Total Quantity */}
         <div className="p-6 text-center bg-[#F3F6F9]/50">
          <h3 className="text-gray-600 font-bold mb-4">총 구매수량</h3>
          <div className="text-2xl font-normal text-gray-800 mb-6">0</div>
          <div className="space-y-2 text-xs text-gray-600 px-4">
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>PC</span>
              <span>0</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>모바일</span>
              <span>0</span>
            </div>
             <div className="flex justify-between">
              <span>수기주문</span>
              <span>0</span>
            </div>
          </div>
        </div>
        {/* Total Count */}
         <div className="p-6 text-center bg-[#F3F6F9]/50">
          <h3 className="text-gray-600 font-bold mb-4">총 구매건수</h3>
          <div className="text-2xl font-normal text-gray-800 mb-6">0</div>
          <div className="space-y-2 text-xs text-gray-600 px-4">
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>PC</span>
              <span>0</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
              <span>모바일</span>
              <span>0</span>
            </div>
             <div className="flex justify-between">
              <span>수기주문</span>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table Section */}
      <div className="mb-12">
        <div className="flex justify-end mb-2">
           <Button variant="outline" className="h-[30px] px-3 gap-1.5 text-[12px] font-normal border-gray-300 rounded-[2px] bg-white text-gray-600 hover:bg-gray-50">
            <span className="w-4 h-4 bg-green-600 text-white flex items-center justify-center rounded text-[10px] font-bold">X</span> 엑셀 다운로드
          </Button>
        </div>

        <div className="border border-gray-300 border-t-2 border-t-gray-400">
           <table className="w-full text-center border-collapse text-xs">
            <thead>
               <tr className="bg-[#f5f5f5] text-gray-700 h-10 border-b border-gray-300 font-semibold">
                <th rowSpan={2} className="border-r border-gray-300 w-16">순위</th>
                <th rowSpan={2} className="border-r border-gray-300 w-20">이미지</th>
                <th rowSpan={2} className="border-r border-gray-300 w-24">상품 코드</th>
                <th rowSpan={2} className="border-r border-gray-300 px-4">상품 명</th>
                <th colSpan={3} className="border-r border-gray-300 border-b border-gray-300 h-8">상품금액</th>
                <th rowSpan={2} className="border-r border-gray-300 w-20">합계</th>
                <th colSpan={3} className="h-8 border-b border-gray-300">구매수량</th>
               </tr>
               <tr className="bg-[#f5f5f5] text-gray-700 h-8 border-b border-gray-300 font-semibold">
                  <th className="border-r border-gray-300 w-20">PC</th>
                  <th className="border-r border-gray-300 w-20">모바일</th>
                  <th className="border-r border-gray-300 w-20">수기주문</th>
                  <th className="border-r border-gray-300 w-16">PC</th>
                  <th className="border-r border-gray-300 w-16">모바일</th>
                  <th className="w-16">수기주문</th>
               </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={13} className="h-40 text-center text-gray-500 font-bold">
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
            <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 판매순위 분석의 기준은 무엇인가요?</h4>
            <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>해당 기간동안 결제가 완료된 상품의 데이터의 수치가 집계됩니다.</li>
              <li><span className="mr-1">·</span>결제완료 이후 "취소 / 교환 / 반품 / 환불" 수치는 적용되지 않습니다.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 상품금액이란 무엇인가요?</h4>
            <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>상품금액은 결제완료된 상품의 판매가에 구매수량을 곱한 금액입니다.</li>
              <li><span className="mr-1">·</span>상품금액은 실제 결제금액이 아니며, 회원 / 쿠폰 할인 / 마일리지 / 예치금 사용 금액 등은 차감되지 않습니다.</li>
              <li><span className="mr-1">·</span>상품금액에는 옵션가가 반영되지 않습니다.</li>
              <li><span className="mr-1">·</span>옵션가를 기준으로 하는 판매순위는 판매순위 분석 "옵션별 현황" 탭에서 별도로 확인하실 수 있습니다.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 옵션금액이란 무엇인가요?</h4>
            <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>옵션금액은 결제완료된 상품의 "판매가+옵션가"에 구매수량을 곱한 금액입니다.</li>
              <li><span className="mr-1">·</span>옵션금액은 실제 결제금액이 아니며, 회원 / 쿠폰 할인 / 마일리지 / 예치금 사용 금액 등은 차감되지 않습니다.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 순위선정 기준은 무엇인가요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>순위는 "상품금액"이 가장 높은 순으로 적용되며, 동일한 값이 있는 경우 "상품명"의 오름차순으로 적용됩니다.</li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 주문된 상품의 판매가/옵션가와 집계된 금액이 차이가 나는 경우가 있나요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>상품의 판매가/옵션가를 변경하였을 경우, 당일 주문 건에 한해 실제 판매가/옵션가와 집계된 금액의 차이가 발생할 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>

       {/* Floating Actions */}
       <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
        <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
          <Youtube size={16} />
        </Button>
        <Button className="rounded-full w-10 h-10 bg-[#7B4DFF] hover:bg-[#7B4DFF]/90 shadow-lg text-white p-0 flex items-center justify-center border-0 text-[10px] leading-tight flex-col">
          <span className="block">따라</span>
          <span className="block">하기</span>
        </Button>
        <div className="flex flex-col gap-0 rounded-full bg-white shadow-lg overflow-hidden border border-gray-200">
          <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100 p-0">
            <ChevronUp className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0 rotate-180">
            <ChevronUp className="w-4 h-4" />
          </Button>
        </div>
      </div>

       {/* Footer Copyright */}
       <div className="mt-12 py-6 text-center text-[11px] text-gray-400 border-t border-gray-300 mt-12">
        © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
      </div>

    </div>
  );
}
