"use client";

import React, { useState } from "react";
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
  FileSpreadsheet,
  Check,
} from "lucide-react";

export default function CustomerClaimsPage() {
  const [isDetailSearchOpen, setIsDetailSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("exchange"); // exchange, return, refund

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">고객 교환/반품/환불신청 관리</h1>
      </div>

      {/* Search Section */}
      <div className="border-t-2 border-gray-500 border-b border-gray-200 mb-8 border-l border-r">
        {/* Search Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-[#FBFBFB]">
           <div className="flex items-center gap-2">
               <h2 className="font-bold text-gray-700">주문 검색</h2>
               <HelpCircle className="w-4 h-4 text-gray-400" />
           </div>
           <div className="flex gap-1">
                <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-1 rounded-sm">
                    <span className="transform rotate-45">⟳</span>
                    검색조건 변환
                </Button>
                <Button variant="default" size="sm" className="h-7 text-[11px] bg-[#555555] text-white hover:bg-[#444444] rounded-sm">
                    검색설정저장
                </Button>
           </div>
        </div>

        <div className="p-0">
            {/* Store Selection */}
            <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    상점
                </div>
                <div className="flex-1 p-3 flex items-center gap-4">
                     <RadioGroup defaultValue="all" className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all" id="store-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="store-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="kr" id="store-kr" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="store-kr" className="text-gray-700 font-normal cursor-pointer flex items-center gap-1">
                                    <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[8px] bg-white">🇰🇷</span>
                                    기준몰
                                </Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="cn" id="store-cn" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="store-cn" className="text-gray-700 font-normal cursor-pointer flex items-center gap-1">
                                    <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[8px] bg-red-600 text-white">🇨🇳</span>
                                    중문몰
                                </Label>
                            </div>
                        </RadioGroup>
                </div>
            </div>

            {/* Supplier Type */}
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

             {/* Search Query */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-3 flex gap-2">
                    <Select defaultValue="order_no">
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300">
                            <SelectValue placeholder="주문번호" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="order_no">주문번호</SelectItem>
                        </SelectContent>
                    </Select>
                     <Input className="w-[400px] h-7 border-gray-300" placeholder="검색어 전체를 정확히 입력하세요." />
                </div>
            </div>

             {/* Date Search */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    기간검색
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                     <Select defaultValue="order_date">
                        <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300">
                            <SelectValue placeholder="주문일" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="order_date">주문일</SelectItem>
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

            {/* Processing Status */}
             <div className="flex items-center text-xs">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    처리상태
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="status-all" className="rounded-none border-gray-300 text-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" defaultChecked />
                        <label htmlFor="status-all" className="text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            전체
                        </label>
                    </div>
                     <div className="flex items-center space-x-2">
                         <Checkbox id="status-request" className="rounded-none border-gray-300"/>
                        <label htmlFor="status-request" className="text-gray-700 leading-none">신청</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="status-approve" className="rounded-none border-gray-300"/>
                        <label htmlFor="status-approve" className="text-gray-700 leading-none">승인</label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox id="status-reject" className="rounded-none border-gray-300"/>
                        <label htmlFor="status-reject" className="text-gray-700 leading-none">거절</label>
                    </div>
                </div>
            </div>


            {/* Expand Detailed Search */}
            <div className="p-3 bg-white border-t border-gray-200">
                <button 
                  className="flex items-center text-blue-500 font-bold text-xs hover:underline"
                  onClick={() => setIsDetailSearchOpen(!isDetailSearchOpen)}
                >
                    상세검색 펼침 
                    <ChevronUp className={`w-3 h-3 ml-1 transform transition-transform ${isDetailSearchOpen ? '' : 'rotate-180'}`} />
                </button>
            </div>

        </div>
         
         <div className="bg-white p-4 flex justify-center border-t border-gray-200">
             <Button className="bg-[#555555] hover:bg-[#444444] text-white font-bold h-10 w-32 rounded-sm text-sm">검색</Button>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-400 mb-6">
          <button 
            className={`px-6 py-3 text-xs font-bold border-t border-r border-l ${activeTab === 'exchange' ? 'bg-white border-gray-400 border-b-white text-gray-800' : 'bg-[#F9F9F9] border-gray-300 text-gray-500'}`}
            onClick={() => setActiveTab('exchange')}
          >
              교환신청 관리 (전체 0 | <span className="text-red-500">신청 0</span> | <span className="text-blue-500">처리완료 0</span>)
          </button>
          <button 
            className={`px-6 py-3 text-xs font-bold border-t border-r ${activeTab === 'return' ? 'bg-white border-gray-400 border-b-white text-gray-800 -ml-[1px]' : 'bg-[#F9F9F9] border-gray-300 text-gray-500'}`}
             onClick={() => setActiveTab('return')}
          >
              반품신청 관리 (전체 0 | <span className="text-red-500">신청 0</span> | <span className="text-blue-500">처리완료 0</span>)
          </button>
          <button 
            className={`px-6 py-3 text-xs font-bold border-t border-r ${activeTab === 'refund' ? 'bg-white border-gray-400 border-b-white text-gray-800 -ml-[1px]' : 'bg-[#F9F9F9] border-gray-300 text-gray-500'}`}
             onClick={() => setActiveTab('refund')}
          >
              환불신청 관리 (전체 0 | <span className="text-red-500">신청 0</span> | <span className="text-blue-500">처리완료 0</span>)
          </button>
      </div>

      {/* List Header */}
      <div className="flex items-center gap-2 mb-2">
           <h3 className="text-base font-bold text-gray-800">{activeTab === 'exchange' ? '교환신청 관리' : activeTab === 'return' ? '반품신청 관리' : '환불신청 관리'}</h3>
           <HelpCircle className="w-4 h-4 text-gray-400" />
      </div>

      <div className="flex justify-between items-end mb-2">
          <div className="text-xs text-gray-700 font-bold">
              검색 <span className="text-red-500">0</span>개 / 전체 <span className="text-red-500">0</span>개 <span className="text-gray-500 font-normal">( 검색된 주문 총 결제금액 : <span className="text-red-500">0</span>원 )</span>
          </div>
          <div className="flex gap-1 items-center">
               <Select defaultValue="order_date_desc">
                    <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="주문일 ↓" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="order_date_desc">주문일 ↓</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="20">
                    <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="20개 보기" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="20">20개 보기</SelectItem>
                    </SelectContent>
                </Select>
                 <Button variant="default" size="sm" className="h-7 text-[11px] bg-[#555555] text-white hover:bg-[#444444] rounded-sm ml-1">
                    조회항목설정
                </Button>
          </div>
      </div>
      
      {/* Action Toolbar Top */}
      <div className="flex justify-between items-center bg-[#F9F9F9] p-2 border border-gray-300 border-b-0">
          <div className="flex items-center gap-1 text-xs">
              <Check className="w-3 h-3 text-red-500 mr-1" strokeWidth={4} />
              <span className="font-bold text-gray-600 mr-1">선택한 주문을</span>
              <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-3 ml-1">
                  승인처리
              </Button>
               <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-3">
                  거절처리
              </Button>
          </div>
           <div className="flex items-center gap-1">
              <Button size="sm" className="h-7 text-[11px] bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm px-2 font-normal flex items-center gap-1">
                  SMS발송
              </Button>
           </div>
      </div>

      {/* Table */}
      <div className="border border-gray-300 mb-4 overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse table-fixed min-w-[1800px]">
              <colgroup>
                  <col className="w-10" />
                  <col className="w-12" />
                  <col className="w-20" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="" />
                  <col className="w-20" />
                  <col className="w-16" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-20" />
                  <col className="w-20" />
              </colgroup>
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr className="h-10">
                      <th className="border-r border-[#CDCDCD]">
                          <Checkbox className="bg-white border-gray-300 rounded-[2px]"/>
                      </th>
                      <th className="border-r border-[#CDCDCD]">번호</th>
                      <th className="border-r border-[#CDCDCD]">상점구분</th>
                      <th className="border-r border-[#CDCDCD]">주문일시</th>
                      <th className="border-r border-[#CDCDCD]">신청일시</th>
                      <th className="border-r border-[#CDCDCD]">처리일시</th>
                      <th className="border-r border-[#CDCDCD]">사유</th>
                      <th className="border-r border-[#CDCDCD]">주문번호</th>
                      <th className="border-r border-[#CDCDCD]">주문자</th>
                      <th className="border-r border-[#CDCDCD]">상품주문번호</th>
                      <th className="border-r border-[#CDCDCD]">주문상품</th>
                      <th className="border-r border-[#CDCDCD]">주문상태</th>
                      <th className="border-r border-[#CDCDCD]">신청수량</th>
                      <th className="border-r border-[#CDCDCD]">상품금액</th>
                      <th className="border-r border-[#CDCDCD]">총 상품금액</th>
                      <th className="border-r border-[#CDCDCD]">배송비</th>
                      <th className="">총 배송비</th>
                  </tr>
              </thead>
              <tbody className="text-gray-600 bg-white">
                  <tr>
                      <td colSpan={17} className="py-10 border-b border-gray-200 text-center text-sm">
                          검색된 주문이 없습니다.
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

       {/* Action Toolbar Bottom */}
      <div className="flex justify-between items-center bg-[#F9F9F9] p-2 border border-gray-300 mb-4">
          <div className="flex items-center gap-1 text-xs">
              <Check className="w-3 h-3 text-red-500 mr-1" strokeWidth={4} />
              <span className="font-bold text-gray-600 mr-1">선택한 주문을</span>
              <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-3 ml-1">
                  승인처리
              </Button>
               <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-3">
                  거절처리
              </Button>
          </div>
          <div>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 hover:bg-gray-50 text-green-600 font-bold flex items-center gap-1.5 px-3 rounded-sm shadow-sm">
                <div className="bg-green-600 text-white p-0.5 rounded-[2px]">
                    <FileSpreadsheet className="w-3 h-3 text-white fill-current" />
                </div>
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
