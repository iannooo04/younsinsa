"use client";

import React, { useState } from "react";
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
  Download,
  Calendar,
  PenLine
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function InvoiceRequestPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">발행 요청 리스트</h1>
      </div>

       {/* Search Section */}
      <div className="border border-gray-200 mb-8 border-t-2 border-t-gray-500">
        {/* Search Header */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-[#FBFBFB]">
           <h2 className="font-bold text-gray-700">발행 요청 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="p-0">
             {/* Search Term */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-3 flex gap-2 border-r border-gray-200">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="=통합검색=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">=통합검색=</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="exact">
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="검색어 전체일치" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="exact">검색어 전체일치</SelectItem>
                        </SelectContent>
                    </Select>
                     <Input className="w-[300px] h-7 border-gray-300" placeholder="검색어 전체를 정확히 입력하세요." />
                </div>
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    사업자번호
                </div>
                 <div className="p-3">
                     <Input className="w-64 h-7 text-xs border-gray-300 rounded-sm" />
                 </div>
            </div>

             {/* Period Search */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    발행요청일
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
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
            
             {/* Order Status */}
             <div className="flex text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    주문상태
                </div>
                <div className="flex-1 p-3 grid grid-cols-6 gap-y-2 gap-x-4">
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-all" className="border-red-500 text-red-500 rounded-[2px]" defaultChecked />
                         <Label htmlFor="status-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-pay" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-pay" className="text-gray-700 font-normal cursor-pointer">결제완료</Label>
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-prep" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-prep" className="text-gray-700 font-normal cursor-pointer">상품준비중</Label>
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-shipping" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-shipping" className="text-gray-700 font-normal cursor-pointer">배송중</Label>
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-shipped" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-shipped" className="text-gray-700 font-normal cursor-pointer">배송완료</Label>
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-confirm" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-confirm" className="text-gray-700 font-normal cursor-pointer">구매확정</Label>
                    </div>
                    
                     <div className="flex items-center gap-1.5 col-span-1">
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-return-ing" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-return-ing" className="text-gray-700 font-normal cursor-pointer">반송중</Label>
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-return-retrieve" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-return-retrieve" className="text-gray-700 font-normal cursor-pointer">반품회수완료</Label>
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-exchange-req" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-exchange-req" className="text-gray-700 font-normal cursor-pointer">교환접수</Label>
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-return-ing2" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-return-ing2" className="text-gray-700 font-normal cursor-pointer">반송중</Label>
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-reshipping" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-reshipping" className="text-gray-700 font-normal cursor-pointer">재배송중</Label>
                    </div>
                    
                     <div className="flex items-center gap-1.5 col-span-1">
                    </div>
                    <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-return-hold" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-return-hold" className="text-gray-700 font-normal cursor-pointer">반품보류</Label>
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-refund-req" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-refund-req" className="text-gray-700 font-normal cursor-pointer">환불접수</Label>
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-exchange-hold" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-exchange-hold" className="text-gray-700 font-normal cursor-pointer">교환보류</Label>
                    </div>
                    
                     <div className="flex items-center gap-1.5 col-span-1">
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-refund-hold" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-refund-hold" className="text-gray-700 font-normal cursor-pointer">환불보류</Label>
                    </div>
                     <div className="flex items-center gap-1.5 col-span-1">
                         <Checkbox id="status-refund-complete" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-refund-complete" className="text-gray-700 font-normal cursor-pointer">환불완료</Label>
                    </div>
                     {/* Added more to match grid visual roughly */}
                     <div className="flex items-center gap-1.5 col-span-1 -mt-[88px] ml-[850px] relative left-[-235px]">
                          <Checkbox id="status-pg-confirm" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-pg-confirm" className="text-gray-700 font-normal cursor-pointer whitespace-nowrap">PG확인요망</Label>
                     </div>
                      <div className="flex items-center gap-1.5 col-span-1 -mt-[88px] ml-[850px] relative left-[-300px]">
                          <Checkbox id="status-return-req" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-return-req" className="text-gray-700 font-normal cursor-pointer">반품접수</Label>
                     </div>
                      <div className="flex items-center gap-1.5 col-span-1 -mt-[1px] ml-[850px] relative left-[-235px]">
                          <Checkbox id="status-exchange-complete" className="border-gray-300 text-gray-600 rounded-[2px]" />
                         <Label htmlFor="status-exchange-complete" className="text-gray-700 font-normal cursor-pointer">교환완료</Label>
                     </div>
                </div>
            </div>

             {/* Tax/Tax-Free */}
             <div className="flex items-center text-xs">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    과세/면세
                </div>
                <div className="flex-1 p-3">
                     <RadioGroup defaultValue="all" className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="tax-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="tax-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="tax" id="tax-only" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="tax-only" className="text-gray-700 font-normal cursor-pointer">과세</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="free" id="tax-free" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="tax-free" className="text-gray-700 font-normal cursor-pointer">면세</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
        
         <div className="bg-white p-4 flex flex-col items-center justify-center border-t border-gray-200 gap-2">
             <Button className="bg-[#555555] hover:bg-[#444444] text-white font-bold h-10 px-10 rounded-sm text-sm">검색</Button>
         </div>
      </div>

       {/* List Header */}
      <div className="flex justify-between items-end mb-2">
          <div className="text-xs text-gray-700 font-bold flex items-center gap-4">
              <span>검색 <span className="text-red-500">0</span>개 / 전체 <span className="text-red-500">0</span>개</span>
          </div>
           <Select defaultValue="10">
                <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                    <SelectValue placeholder="10개 보기" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10">10개 보기</SelectItem>
                </SelectContent>
            </Select>
      </div>

      {/* Top Controls */}
      <div className="bg-[#F8F9FB] border border-gray-300 border-b-0 p-2 flex justify-between items-center">
            <div className="flex gap-1">
                 <Button variant="outline" className="h-7 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-sm">선택 삭제</Button>
                 <Button variant="outline" className="h-7 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-sm">선택 수정</Button>
            </div>
            <Button variant="outline" className="h-7 px-3 text-[11px] bg-white border-gray-300 text-blue-600 flex items-center gap-1 rounded-sm">
                <PenLine className="w-3 h-3" />
                일반세금계산서발행
            </Button>
      </div>

      {/* Table */}
       <div className="border border-gray-300 mb-0 overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse min-w-[1500px]">
               <colgroup>
                  <col className="w-10" />
                  <col className="w-12" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-48" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="" />
              </colgroup>
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr className="h-10">
                      <th className="border-r border-[#CDCDCD] font-normal">
                          <Checkbox className="bg-white border-gray-300 rounded-[2px]" />
                      </th>
                      <th className="border-r border-[#CDCDCD] font-normal">번호</th>
                      <th className="border-r border-[#CDCDCD] font-normal">발행요청일</th>
                      <th className="border-r border-[#CDCDCD] font-normal">주문번호/주문자</th>
                      <th className="border-r border-[#CDCDCD] font-normal">주문상태</th>
                      <th className="border-r border-[#CDCDCD] font-normal">요청인</th>
                      <th className="border-r border-[#CDCDCD] font-normal">사업자정보</th>
                      <th className="border-r border-[#CDCDCD] font-normal">결제금액</th>
                      <th className="border-r border-[#CDCDCD] font-normal">세금등급</th>
                      <th className="border-r border-[#CDCDCD] font-normal">발행액</th>
                      <th className="border-r border-[#CDCDCD] font-normal">공급가액</th>
                      <th className="border-r border-[#CDCDCD] font-normal">세액</th>
                      <th className="border-r border-[#CDCDCD] font-normal">발행일</th>
                      <th className="font-normal">메모</th>
                  </tr>
              </thead>
              <tbody className="bg-white">
                  <tr>
                      <td colSpan={14} className="py-12 border-b border-gray-200 text-center text-gray-500">
                          검색된 정보가 없습니다.
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

       {/* Bottom Controls */}
       <div className="bg-[#F8F9FB] border border-gray-300 border-t-0 p-2 flex justify-between items-center mb-8">
            <div className="flex gap-1">
                 <Button variant="outline" className="h-7 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-sm">선택 삭제</Button>
                 <Button variant="outline" className="h-7 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-sm">선택 수정</Button>
            </div>
            <div className="flex gap-1">
                 <Button variant="outline" className="h-7 px-3 text-[11px] bg-white border-gray-300 text-blue-600 flex items-center gap-1 rounded-sm">
                    <PenLine className="w-3 h-3" />
                    일반세금계산서발행
                </Button>
                <Button variant="outline" className="h-7 px-3 text-[11px] bg-white border-gray-300 text-green-600 hover:text-green-700 hover:bg-green-50 flex items-center gap-1 rounded-sm">
                   <span className="text-green-600 bg-green-100 p-0.5 rounded-sm"><Download className="w-3 h-3"/></span>
                   엑셀다운로드
               </Button>
            </div>
      </div>

      <div className="text-[#999999] text-[11px] space-y-1">
          <p className="flex items-start gap-1">
               <span className="bg-[#666666] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] mt-0.5 min-w-[12px]">!</span>
               <span>전자세금계산서 이용시, 국세청 시스템에서 지원되지 않는 일부 특정문자는 제외되어 전송됩니다. ex)갷, 샇, 랗 등</span>
          </p>
           <p className="flex items-start gap-1">
               <span className="bg-[#666666] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] mt-0.5 min-w-[12px]">!</span>
               <span>전자세금계산서발행 신청 후, <span className="text-blue-500 underline cursor-pointer">고도빌{')'}전자세금계산서 발급/관리{'>'}전자세금계산서 관리</span>에서 추가적으로 '전송'을 진행하셔야만 발급이 완료됩니다.</span>
          </p>
           <p className="flex items-start gap-1 text-red-500 font-bold">
               <span className="bg-red-500 text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] mt-0.5 min-w-[12px]">!</span>
               <span>전자세금계산서를 고도빌에서 수기로 발행하는 경우, 세금계산서가 이중으로 발행될 수 있으니 주의 바랍니다.</span>
          </p>
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
