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
  BookOpen,
  Settings,
  RefreshCcw,
  Printer
} from "lucide-react";

export default function OrderIntegratedListPage() {
  const [isDetailSearchOpen, setIsDetailSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("주문통합리스트");
  const tabs = [
    "주문통합리스트",
    "입금대기 리스트",
    "결제완료 리스트",
    "상품준비중 리스트",
    "배송중 리스트",
    "배송완료 리스트",
    "구매확정 리스트",
    "결제 중단/실패 리스트"
  ];

  const getDescription = (tab: string) => {
      switch(tab) {
          case "주문통합리스트": return "취소/환불/반품/교환을 포함한 전체 주문리스트입니다.";
          case "입금대기 리스트": return "무통장입금 주문 건 중 아직 입금확인이 되지 않은 주문리스트입니다.";
          case "결제완료 리스트": return "결제가 완료되어 배송을 위한 상품확인 전 단계의 주문리스트입니다.";
          case "상품준비중 리스트": return "배송을 위해 상품을 준비하는 단계의 주문리스트입니다.";
          case "배송중 리스트": return "상품이 발송되어 배송업체로 전달된 상태의 주문리스트입니다.";
          case "배송완료 리스트": return "고객이 상품을 수령한 상태의 주문리스트입니다.";
          case "구매확정 리스트": return "고객이 상품 수령 후 구매를 확정한 주문리스트입니다.";
          case "결제 중단/실패 리스트": return "결제 과정에서 중단되거나 실패한 주문리스트입니다.";
          default: return "";
      }
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
        {/* Top Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-200 pb-1">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-t-sm text-sm font-bold transition-colors ${
                        activeTab === tab
                        ? "bg-[#555555] text-white"
                        : "bg-white text-gray-500 hover:bg-gray-100 border border-transparent"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{activeTab}</h1>
            <span className="text-gray-500 text-xs mb-1">{getDescription(activeTab)}</span>
        </div>
        <Button
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-50 font-bold h-9 px-4 rounded-sm"
        >
          + 수기주문 등록
        </Button>
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
                    <RefreshCcw className="w-3 h-3" />
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
             <div className="flex items-center text-xs">
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
      <div className="flex mb-4">
          <div className="px-4 py-2 bg-white border border-gray-300 border-b-white text-gray-900 font-bold text-xs cursor-pointer relative top-[1px] z-10">
              주문번호별
          </div>
          <div className="px-4 py-2 bg-[#F5F5F5] border border-gray-300 border-l-0 text-gray-500 text-xs cursor-pointer">
              상품주문번호별
          </div>
          <div className="flex-1 border-b border-gray-300"></div>
      </div>

      {/* List Header */}
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
      
      {/* Action Toolbar */}
      {activeTab === "입금대기 리스트" || activeTab === "결제완료 리스트" || activeTab === "상품준비중 리스트" || activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트" ? (
        <div className="flex justify-between items-center bg-white p-2 border border-gray-300 border-b-0">
            <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-red-500 flex flex-col leading-none border-r border-gray-300 pr-3 mr-1">
                    <span className="text-gray-600">선택</span>
                    <span className="text-gray-900">한 주</span>
                    <span className="text-gray-900">문을</span>
                </span>
                <Select defaultValue="status">
                    <SelectTrigger className="w-32 h-8 text-xs border-gray-300">
                        <SelectValue placeholder="=주문상태=" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="status">=주문상태=</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                    일괄처리
                </Button>
                {activeTab === "입금대기 리스트" && (
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                        취소처리
                    </Button>
                )}
                {activeTab === "상품준비중 리스트" && (
                    <>
                        <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                            송장번호 저장
                        </Button>
                        <Button variant="default" size="sm" className="h-8 text-xs bg-[#232B3E] hover:bg-[#1a2130] text-white border border-[#232B3E] rounded-sm">
                            묶음배송처리
                        </Button>
                        <Button variant="default" size="sm" className="h-8 text-xs bg-[#232B3E] hover:bg-[#1a2130] text-white border border-[#232B3E] rounded-sm">
                            묶음배송해제
                        </Button>
                    </>
                )}
            </div>
            {activeTab === "입금대기 리스트" ? (
                 <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                    입금요청 이메일발송
                 </Button>
            ) : (
                <div className="flex items-center gap-1">
                    <Button size="sm" className="h-8 text-[11px] bg-[#111111] hover:bg-black text-white rounded-sm px-3 font-bold border border-[#111111]">
                        이메일발송
                    </Button>
                    <Select defaultValue="print_select">
                       <SelectTrigger className="w-28 h-8 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="=인쇄 선택=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="print_select">=인쇄 선택=</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="h-8 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-2 font-normal flex items-center gap-1">
                        <Printer className="w-3 h-3" />
                        프린트
                    </Button>
                </div>
            )}
        </div>
      ) : activeTab === "결제 중단/실패 리스트" ? (
        <div className="flex justify-between items-center bg-white p-2 border border-gray-300 border-b-0">
             <div className="flex items-center gap-2 text-xs">
                 <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                     <span className="text-red-500">✔</span>
                     <span>선택한 주문을</span>
                 </div>
                 <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                     삭제처리
                 </Button>
             </div>
        </div>
      ) : (
        <div className="flex justify-between items-center bg-[#F9F9F9] p-2 border border-gray-300 border-b-0">
            <div className="flex items-center gap-1">
                <Button size="sm" className="h-7 text-[11px] bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm px-3 font-bold border border-[#FF424D]">
                    이메일발송
                </Button>
                <Select defaultValue="print_select">
                   <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                        <SelectValue placeholder="=인쇄 선택=" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="print_select">=인쇄 선택=</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-2 font-normal flex items-center gap-1">
                    <Printer className="w-3 h-3" />
                    프린트
                </Button>
            </div>
        </div>
      )}

      {/* Table */}
      <div className="border border-gray-300 mb-4 overflow-x-auto">
        {activeTab === "입금대기 리스트" ? (
          <table className="w-full text-xs text-center border-collapse table-fixed min-w-[1200px]">
               <colgroup>
                  <col className="w-10" />
                  <col className="w-16" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-40" />
                  <col className="w-32" />
                  <col className="" />
                  <col className="w-32" />
               </colgroup>
               <thead className="bg-[#A3A3A3] text-white font-normal h-10">
                   <tr>
                       <th className="border-r border-[#CDCDCD]">
                           <div className="flex justify-center">
                               <Checkbox className="bg-white border-gray-300 rounded-[2px] w-4 h-4"/>
                           </div>
                       </th>
                       <th className="border-r border-[#CDCDCD]">번호</th>
                       <th className="border-r border-[#CDCDCD]">상점구분</th>
                       <th className="border-r border-[#CDCDCD]">주문일시</th>
                       <th className="border-r border-[#CDCDCD]">경과일자</th>
                       <th className="border-r border-[#CDCDCD]">주문번호</th>
                       <th className="border-r border-[#CDCDCD]">주문자</th>
                       <th className="border-r border-[#CDCDCD]">주문상품</th>
                       <th>총 상품금액</th>
                   </tr>
               </thead>
               <tbody className="text-gray-600 bg-white">
                   <tr>
                       <td colSpan={9} className="py-20 border-b border-gray-200 text-center text-sm">
                            <div className="flex justify-center items-center h-full">
                                검색된 주문이 없습니다.
                            </div>
                       </td>
                   </tr>
               </tbody>
          </table>
        ) : activeTab === "결제완료 리스트" || activeTab === "상품준비중 리스트" || activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트" ? (
          <table className="w-full text-xs text-center border-collapse table-fixed min-w-[1200px]">
               <colgroup>
                  <col className="w-10" />
                  <col className="w-16" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-40" />
                  <col className="w-32" />
                  <col className="" />
                  {(activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트") && <col className="w-32" />}
               </colgroup>
               <thead className="bg-[#A3A3A3] text-white font-normal h-10">
                   <tr>
                       <th className="border-r border-[#CDCDCD]">
                           <div className="flex justify-center">
                               <Checkbox className="bg-white border-gray-300 rounded-[2px] w-4 h-4"/>
                           </div>
                       </th>
                       <th className="border-r border-[#CDCDCD]">번호</th>
                       <th className="border-r border-[#CDCDCD]">상점구분</th>
                       <th className="border-r border-[#CDCDCD]">주문일시</th>
                       <th className="border-r border-[#CDCDCD]">주문번호</th>
                       <th className="border-r border-[#CDCDCD]">주문자</th>
                       <th className={`${(activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트") ? "border-r border-[#CDCDCD]" : ""}`}>주문상품</th>
                       {(activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트") && <th>총 상품금액</th>}
                   </tr>
               </thead>
               <tbody className="text-gray-600 bg-white">
                   <tr>
                       <td colSpan={(activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트") ? 8 : 7} className="py-20 border-b border-gray-200 text-center text-sm">
                            <div className="flex justify-center items-center h-full">
                                검색된 주문이 없습니다.
                            </div>
                       </td>
                   </tr>
               </tbody>
          </table>
        ) : activeTab === "결제 중단/실패 리스트" ? (
          <table className="w-full text-xs text-center border-collapse table-fixed min-w-[1200px]">
               <colgroup>
                  <col className="w-10" />
                  <col className="w-16" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-40" />
                  <col className="w-32" />
                   <col className="w-40" />
                  <col className="" />
               </colgroup>
               <thead className="bg-[#A3A3A3] text-white font-normal h-10">
                   <tr>
                       <th className="border-r border-[#CDCDCD]">
                           <div className="flex justify-center">
                               <Checkbox className="bg-white border-gray-300 rounded-[2px] w-4 h-4"/>
                           </div>
                       </th>
                       <th className="border-r border-[#CDCDCD]">번호</th>
                       <th className="border-r border-[#CDCDCD]">상점구분</th>
                       <th className="border-r border-[#CDCDCD]">주문일시</th>
                       <th className="border-r border-[#CDCDCD]">주문번호</th>
                       <th className="border-r border-[#CDCDCD]">주문자</th>
                        <th className="border-r border-[#CDCDCD]">상품주문번호</th>
                       <th>주문상품</th>
                   </tr>
               </thead>
               <tbody className="text-gray-600 bg-white">
                   <tr>
                       <td colSpan={8} className="py-20 border-b border-gray-200 text-center text-sm">
                            <div className="flex justify-center items-center h-full">
                                검색된 주문이 없습니다.
                            </div>
                       </td>
                   </tr>
               </tbody>
          </table>
        ) : (
          <table className="w-full text-xs text-center border-collapse table-fixed min-w-[1800px]">
              <colgroup>
                  <col className="w-10" />
                  <col className="w-12" />
                  <col className="w-20" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-16" />
                  <col className="w-16" />
                  <col className="w-16" />
                  <col className="w-12" />
                  <col className="w-12" />
                  <col className="w-12" />
                  <col className="w-12" />
              </colgroup>
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr>
                      <th className="py-2.5 border-r border-[#CDCDCD]">
                          <Checkbox className="bg-white border-gray-300 rounded-[2px]"/>
                      </th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">번호</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">상점구분</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">주문일시</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">주문번호</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">주문자</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">주문상품</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">총 상품금액</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">총 배송비</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">총 주문금액</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">결제방법</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">결제상태</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">미배송</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">배송중</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">배송완료</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">취소</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">교환</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">반품</th>
                      <th className="py-2.5">환불</th>
                  </tr>
              </thead>
              <tbody className="text-gray-600 bg-white">
                  <tr>
                      <td colSpan={19} className="py-10 border-b border-gray-200 text-center text-sm">
                          검색된 주문이 없습니다.
                      </td>
                  </tr>
              </tbody>
          </table>
        )}
      </div>

      {/* Excel Download */}
      {/* Excel Download & Bottom Actions */}
      {activeTab === "입금대기 리스트" || activeTab === "결제완료 리스트" || activeTab === "상품준비중 리스트" || activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트" ? (
         <div className="flex justify-between items-center bg-white p-2 border border-gray-300 mb-10">
            <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-red-500 flex flex-col leading-none border-r border-gray-300 pr-3 mr-1">
                    <span className="text-gray-600">선택</span>
                    <span className="text-gray-900">한 주</span>
                    <span className="text-gray-900">문을</span>
                </span>
                <Select defaultValue="status">
                    <SelectTrigger className="w-32 h-8 text-xs border-gray-300">
                         <SelectValue placeholder="=주문상태=" />
                    </SelectTrigger>
                    <SelectContent>
                         <SelectItem value="status">=주문상태=</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                    일괄처리
                </Button>
                {activeTab === "입금대기 리스트" && (
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                        취소처리
                    </Button>
                )}
                {activeTab === "상품준비중 리스트" && (
                    <>
                        <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                            송장번호 저장
                        </Button>
                        <Button variant="default" size="sm" className="h-8 text-xs bg-[#232B3E] hover:bg-[#1a2130] text-white border border-[#232B3E] rounded-sm">
                            묶음배송처리
                        </Button>
                        <Button variant="default" size="sm" className="h-8 text-xs bg-[#232B3E] hover:bg-[#1a2130] text-white border border-[#232B3E] rounded-sm">
                            묶음배송해제
                        </Button>
                    </>
                )}
            </div>
             <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-green-500 hover:bg-green-50 text-green-600 font-bold flex items-center gap-1.5 px-3 rounded-sm shadow-sm transition-colors">
                 <div className="bg-green-600 text-white p-0.5 rounded-[2px]">
                     <FileSpreadsheet className="w-3 h-3 text-white fill-current" />
                 </div>
                 엑셀다운로드
            </Button>
        </div>
      ) : activeTab === "결제 중단/실패 리스트" ? (
         <div className="flex justify-between items-center bg-white p-2 border border-gray-300 mb-10">
             <div className="flex items-center gap-2 text-xs">
                 <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                     <span className="text-red-500">✔</span>
                     <span>선택한 주문을</span>
                 </div>
                 <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                     삭제처리
                 </Button>
             </div>
             <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-green-500 hover:bg-green-50 text-green-600 font-bold flex items-center gap-1.5 px-3 rounded-sm shadow-sm transition-colors">
                 <div className="bg-green-600 text-white p-0.5 rounded-[2px]">
                     <FileSpreadsheet className="w-3 h-3 text-white fill-current" />
                 </div>
                 엑셀다운로드
            </Button>
        </div>
      ) : (
          <div className="flex justify-end mb-10">
               <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 hover:bg-gray-50 text-green-600 font-bold flex items-center gap-1.5 px-3 rounded-sm shadow-sm">
                    <div className="bg-green-600 text-white p-0.5 rounded-[2px]">
                        <FileSpreadsheet className="w-3 h-3 text-white fill-current" />
                    </div>
                    엑셀다운로드
               </Button>
          </div>
      )}
      
      <div className="border-t border-gray-300 mb-8"></div>

       {/* Guide Section */}
       <div className="space-y-6 text-gray-600">
           <div>
              <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs mb-3">
                 <BookOpen className="w-4 h-4" /> 
                 <span>안내</span>
              </div>
              {activeTab === "입금대기 리스트" ? (
                  <div className="space-y-4">
                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 리스트의 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "주문 상태 설정" 항목에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 리스트 내 주문은 다음 단계인 "결제완료" 상태로만 변경할 수 있으며, 주문의 일부 상품만 부분적으로 결제완료 상태로 변경이 불가능합니다.</p>
                               <p>· "기본설정{">"}주문정책{">"}주문상태 설정"에서 "입금 상태 설정" 항목에 추가된 주문상태가 있는 경우, 해당 주문상태로도 변경할 수 있습니다.</p>
                           </div>
                      </div>

                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 일부 상품만 부분취소할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 상태의 주문만 취소할 수 있으며, 주문의 일부 상품만 부분적으로 취소할 수 없습니다.</p>
                               <p>· 취소된 주문은 "취소/교환/반품/환불 관리{">"}취소 리스트"에서 확인 가능합니다.</p>
                               <p className="text-red-500 font-bold">· 취소된 주문 정보는 복구가 불가능하므로 신중하게 해야합니다.</p>
                           </div>
                      </div>
                  </div>
              ) : activeTab === "결제완료 리스트" ? (
                  <div className="space-y-4">
                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 결제완료 리스트의 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "입금 상태 설정" 항목에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 결제완료 리스트 내 주문은 상품별로 다음 단계인 "상품준비중/구매발주/상품입고/상품출고" 상태로 변경할 수 있습니다,</p>
                               <p>· "기본설정{">"}주문정책{">"}주문상태 설정"에서 "입금 상태 설정 / 상품 상태 설정" 항목에 추가된 주문상태가 있는 경우, 해당 주문상태로도 변경할 수 있습니다.</p>
                           </div>
                      </div>

                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 결제완료 상태를 입금대기 상태로 변경할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 주문리스트에서 결제완료 상태의 주문을 "입금대기" 상태로 변경할 수 없습니다.</p>
                               <p>· 결제완료 상태에서 입금대기 상태로 변경은 해당 주문의 "주문 상세정보" 페이지에서만 가능합니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 출고전 취소할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 상태의 주문만 취소할 수 있으므로, 결제완료 상태의 주문은 취소처리가 불가능합니다.</p>
                               <p>· 결제완료 상태의 주문은 해당 주문의 "주문 상세정보" 페이지 내 "클레임 접수" 항목에서 "환불접수"를 통해 구매자에게 결제금액 환불 및 주문철회가 가능합니다.</p>
                               <p>· 환불접수된 주문은 "취소/교환/반품/환불 관리{">"}환불 리스트"에서 확인 가능합니다.</p>
                           </div>
                      </div>
                  </div>
              ) : activeTab === "상품준비중 리스트" ? (
                  <div className="space-y-4">
                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 상품준비중 리스트의 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "상품 상태 설정" 항목에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 상품준비중 리스트 내 주문은 상품별로 다음 단계인 "상품준비중/구매발주/상품입고/상품출고" 또는 이전 단계인 "결제완료" 상태로 변경할 수 있습니다,</p>
                               <p>· "기본설정{">"}주문정책{">"}주문상태 설정"에서 "상품 상태 설정 / 입금 상태 설정" 항목에 추가된 주문상태가 있는 경우, 해당 주문상태로도 변경할 수 있습니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 출고전 취소할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 상태의 주문만 취소할 수 있으므로, 상품준비중 상태의 주문은 취소처리가 불가능합니다.</p>
                               <p>· 상품준비중 상태의 주문은 해당 주문의 "주문 상세정보" 페이지 내 "클레임 접수" 항목에서 "환불접수"를 통해 구매자에게 결제금액 환불 및 주문철회가 가능합니다.</p>
                               <p>· 환불접수된 주문은 "취소/교환/반품/환불 관리{">"}환불 리스트"에서 확인 가능합니다.</p>
                           </div>
                      </div>
                  </div>
              ) : activeTab === "배송중 리스트" ? (
                  <div className="space-y-4">
                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 배송중 리스트의 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "배송 상태 설정" 항목에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 배송중 리스트 내 주문은 상품별로 다음 단계인 "배송완료" 또는 이전 단계인 "상품준비중/구매발주/상품입고/상품출고" 상태로 변경할 수 있습니다,</p>
                               <p>· "기본설정{">"}주문정책{">"}주문상태 설정"에서 "배송 상태 설정 / 상품 상태 설정" 항목에 추가된 주문상태가 있는 경우, 해당 주문상태로도 변경할 수 있습니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 출고전 취소할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 상태의 주문만 취소할 수 있으므로, 배송중 상태의 주문은 취소처리가 불가능합니다.</p>
                               <p>· 배송중 상태의 주문은 해당 주문의 "주문 상세정보" 페이지 내 "클레임 접수" 항목에서 "반품접수"가 가능합니다.</p>
                               <p>· 반품접수된 주문은 "취소/교환/반품/환불 관리{">"}반품 리스트"에서 확인 가능합니다.</p>
                               <p>· 반품접수된 주문은 "환불접수" 상태로 변경이 가능하며, 환불 리스트에서 구매자에게 결제금액 환불이 가능합니다.</p>
                           </div>
                      </div>
                  </div>
              ) : activeTab === "배송완료 리스트" ? (
                  <div className="space-y-4">
                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 배송완료 리스트의 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "배송 상태 설정" 항목에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 배송완료 리스트 내 주문은 상품별로 다음 단계인 "구매확정" 또는 이전 단계인 "배송중" 상태로 변경할 수 있습니다,</p>
                               <p>· "기본설정{">"}주문정책{">"}주문상태 설정"에서 "배송 상태 설정" 항목에 추가된 주문상태가 있는 경우, 해당 주문상태로도 변경할 수 있습니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 출고전 취소할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 상태의 주문만 취소할 수 있으므로, 배송완료 상태의 주문은 취소처리가 불가능합니다.</p>
                               <p>· 배송완료 상태의 주문은 해당 주문의 "주문 상세정보" 페이지 내 "클레임 접수" 항목에서 "반품접수"가 가능합니다.</p>
                               <p>· 반품접수된 주문은 "취소/교환/반품/환불 관리{">"}반품 리스트"에서 확인 가능합니다.</p>
                               <p>· 반품접수된 주문은 "환불접수" 상태로 변경이 가능하며, 환불 리스트에서 구매자에게 결제금액 환불이 가능합니다.</p>
                           </div>
                      </div>
                  </div>
              ) : activeTab === "구매확정 리스트" ? (
                  <div className="space-y-4">
                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 구매확정 리스트의 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "구매확정 상태 설정" 항목에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 구매확정 리스트 내 주문은 상품별로 이전 단계인 "배송완료" 상태로 변경할 수 있습니다,</p>
                               <p>· "기본설정{">"}주문정책{">"}주문상태 설정"에서 "구매확정 상태 설정 / 배송 상태 설정" 항목에 추가된 주문상태가 있는 경우, 해당 주문상태로도 변경할 수 있습니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 출고전 취소할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 상태의 주문만 취소할 수 있으므로, 구매확정 상태의 주문은 취소처리가 불가능합니다.</p>
                               <p>· 구매확정 상태의 주문은 해당 주문의 "주문 상세정보" 페이지 내 "클레임 접수" 항목에서 "반품접수"가 가능합니다.</p>
                               <p>· 반품접수된 주문은 "취소/교환/반품/환불 관리{">"}반품 리스트"에서 확인 가능합니다.</p>
                               <p>· 반품접수된 주문은 "환불접수" 상태로 변경이 가능하며, 환불 리스트에서 구매자에게 결제금액 환불이 가능합니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 구매확정 상태에서 구매자도 반품접수가 가능한가요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 구매확정 상태의 주문은 관리자페이지에서 운영자만 반품 또는 교환접수가 가능합니다.</p>
                               <p>· 구매자의 경우 쇼핑몰 마이페이지에서 구매확정 이전 상태의 주문만 "취소/교환/반품/환불신청"을 할 수 있습니다.</p>
                               <p className="pl-2">- 입금대기 상태 주문은 구매자가 쇼핑몰 마이페이지에서 직접 취소처리가 가능합니다.</p>
                               <p className="pl-2">(구매자가 직접 취소처리한 주문은 "취소/교환/반품/환불 관리{">"}취소 리스트" 메뉴에서 "고객요청취소" 상태로 노출됩니다.)</p>
                               <p className="pl-2">- 배송중, 배송완료 상태 주문은 구매자가 쇼핑몰 마이페이지에서 교환신청 또는 반품신청이 가능하며, 상품준비중 상태 주문은 환불신청이 가능합니다.</p>
                               <p className="pl-2">(구매자가 "교환/반품/환불신청"한 주문은 "취소/교환/반품/환불 관리{">"}고객 교환/반품/환불신청 관리" 페이지에서 확인할 수 있으며, <span className="text-red-500 font-bold">운영자는 구매자의 교환/반품/환불신청을 "승인 또는 거절"처리가 가능</span>합니다.)</p>
                           </div>
                      </div>
                  </div>
              ) : activeTab === "결제 중단/실패 리스트" ? (
                  <div className="space-y-4">
                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 결제 실패/시도란 무엇인가요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 결제실패/시도란 구매자의 주문결제가 정상적으로 완료되지 않은 상태 입니다.</p>
                               <p>· 결제실패/시도 리스트의 주문상태는 "결제시도, 고객결제중단, 결제실패"로 구분됩니다.</p>
                               <p className="pl-2">- 결제시도 : 결제가 진행은 되었으나 알수없는 원인에 의해 정상적으로 완료가 되지 않은 상태입니다.</p>
                               <p className="pl-2">- 고객결제중단 : 결제진행 중 구매자가 결제창을 닫거하는 행위로 인해 결제가 중단된 상태입니다.</p>
                               <p className="pl-2">- 결제실패 : 구매자는 정상적으로 결제를 완료하였으나 PG사에서 결제승인이 실패된 상태입니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 결제 실패/시도 리스트의 주문상태는 추가할 수 없으나, "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "실패 상태 설정" 항목에서 운영자가 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 수정된 주문상태명은 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                               <p>· 결제 실패/시도 리스트의 "결제시도, 고객결제중단, 결제실패" 상태는 구매자의 주문결제 결과에 따라 시스템에서 자동으로 적용되므로 운영자가 사용여부를 설정할 수 없습니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 변경할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 결제 실패/시도 리스트 내 주문의 상태는 변경이 불가능하며, 삭제처리만 가능합니다.</p>
                               <p className="text-red-500 font-bold">· 삭제된 주문 정보는 복구가 불가능하므로 신중하게 해야합니다.</p>
                           </div>
                      </div>
                  </div>
              ) : (
                  <div className="space-y-4">
                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 결제완료 상태를 입금대기 상태로 변경할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 주문리스트에서 결제완료 상태의 주문을 "입금대기" 상태로 변경할 수 없습니다.</p>
                               <p>· 결제완료 상태에서 입금대기 상태로 변경은 해당 주문의 "주문 상세정보" 페이지에서만 가능합니다.</p>
                           </div>
                      </div>

                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 주문리스트 내 선택된 주문의 상태를 "결제완료/상품준비중/배송중/배송완료/구매확정" 중 선택하여 변경할 수 있습니다.</p>
                               <p>· 입금대기 상태의 주문은 "결제완료" 상태로만 변경할 수 있으며, 주문의 일부 상품만 부분적으로 결제완료 상태로 변경이 불가능합니다.</p>
                               <p>· "취소/교환/반품/환불" 등의 주문상태로 변경은 해당 주문의 "주문 상세정보" 페이지에서 내 "클레임 접수" 항목에서 가능합니다.</p>
                               <p>· 교환/반품/환불접수 상태의 주문은 "취소/교환/반품/환불 관리"의 각각의 상태별 메뉴에서 변경할 수 있습니다.</p>
                           </div>
                      </div>
                  </div>
              )}
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
