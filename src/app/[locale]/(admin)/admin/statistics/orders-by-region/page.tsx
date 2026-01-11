"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Youtube, ChevronUp, HelpCircle } from "lucide-react";

export default function OrdersByRegionPage() {
  const [activeTab, setActiveTab] = useState("daily");

  const days = ["2026-01-05", "2026-01-06", "2026-01-07", "2026-01-08", "2026-01-09", "2026-01-10", "2026-01-11"];

  // Standard Korean regions
  const regions = ["강원", "경기", "경남", "경북", "광주", "대구", "대전", "부산", "서울", "세종", "울산", "인천", "전남", "전북", "제주", "충남", "충북"];

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4 pb-4 border-b-2 border-gray-800">지역별 주문통계</h1>

       <div className="flex items-center gap-1 mb-2">
         <h2 className="text-base font-bold text-gray-700">주문 검색</h2>
         <span className="text-[11px] text-red-500 bg-red-50 px-1 py-0.5 rounded flex items-center gap-1">
             <span className="w-3 h-3 bg-red-500 text-white rounded-[2px] flex items-center justify-center font-bold text-[9px] leading-none">!</span>
             통계 데이터는 2시간마다 집계되므로 주문데이터와 약 1시간~2시간의 데이터 오차가 있을 수 있습니다.
         </span>
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
      </div>

      {/* Search Button */}
      <div className="flex justify-center mb-10">
        <Button className="w-24 h-10 bg-[#4B5563] hover:bg-[#374151] text-white font-bold rounded-[2px]">
          검색
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-4 bg-gray-100 border-b border-gray-300 px-1 pt-1 flex gap-1">
          <TabButton active label="일별 주문현황" />
          <TabButton label="시간대별 주문현황" />
          <TabButton label="요일별 주문현황" />
          <TabButton label="월별 주문현황" />
      </div>

       {/* Summary Cards */}
      <div className="flex border border-gray-300 mb-8 bg-[#F3F6F9]/50 divide-x divide-gray-300">
          <SummaryCard title="총 판매금액" value="0원">
             <div className="border-t border-dotted border-gray-300 mt-2 pt-2 space-y-1 w-full text-[11px] text-gray-600">
                <div className="flex justify-between"><span>PC</span><span>0</span></div>
                <div className="flex justify-between"><span>모바일</span><span>0</span></div>
                <div className="flex justify-between"><span>수기주문</span><span>0</span></div>
             </div>
          </SummaryCard>
          <SummaryCard title="총 구매건수" value="0">
             <div className="border-t border-dotted border-gray-300 mt-2 pt-2 space-y-1 w-full text-[11px] text-gray-600">
                <div className="flex justify-between"><span>PC</span><span>0</span></div>
                <div className="flex justify-between"><span>모바일</span><span>0</span></div>
                <div className="flex justify-between"><span>수기주문</span><span>0</span></div>
             </div>
          </SummaryCard>
          <SummaryCard title="총 구매자수" value="0">
             <div className="border-t border-dotted border-gray-300 mt-2 pt-2 space-y-1 w-full text-[11px] text-gray-600">
                <div className="flex justify-between"><span>PC</span><span>0</span></div>
                <div className="flex justify-between"><span>모바일</span><span>0</span></div>
                <div className="flex justify-between"><span>수기주문</span><span>0</span></div>
             </div>
          </SummaryCard>
          <SummaryCard title="총 구매개수" value="0">
             <div className="border-t border-dotted border-gray-300 mt-2 pt-2 space-y-1 w-full text-[11px] text-gray-600">
                <div className="flex justify-between"><span>PC</span><span>0</span></div>
                <div className="flex justify-between"><span>모바일</span><span>0</span></div>
                <div className="flex justify-between"><span>수기주문</span><span>0</span></div>
             </div>
          </SummaryCard>
          <SummaryCard title="최대/최소 판매금액" value="" isValueHidden>
             <div className="border-dotted border-gray-300 pt-2 space-y-2 w-full text-[11px] text-gray-600 mt-6">
                <div className="flex justify-between items-center"><span className="text-gray-500">최대 판매금액</span><span className="text-black">0</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-500">최소 판매금액</span><span className="text-black">0</span></div>
             </div>
          </SummaryCard>
           <SummaryCard title="최대/최소 구매건수" value="" isValueHidden>
             <div className="border-dotted border-gray-300 pt-2 space-y-2 w-full text-[11px] text-gray-600 mt-6">
                <div className="flex justify-between items-center"><span className="text-gray-500">최대 구매건수</span><span className="text-black">0</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-500">최소 구매건수</span><span className="text-black">0</span></div>
             </div>
          </SummaryCard>
      </div>

      {/* Results Table Section */}
      <div className="mb-12">
        <div className="flex justify-end mb-2">
           <Button variant="outline" className="h-[26px] px-3 gap-1.5 text-[12px] font-normal border-gray-300 rounded-[2px] bg-white text-gray-600 hover:bg-gray-50">
            <span className="w-4 h-4 bg-green-600 text-white flex items-center justify-center rounded text-[10px] font-bold">X</span> 엑셀 다운로드
          </Button>
        </div>

        <div className="border border-gray-300 border-t-0 overflow-x-auto">
           <table className="w-full text-center border-collapse text-xs min-w-[3500px] table-fixed">
            <thead>
               <tr className="bg-[#f5f5f5] text-gray-700 h-10 border-b border-gray-300 font-semibold text-center border-t border-t-gray-400">
                <th rowSpan={2} className="border-r border-gray-300 w-24">날짜</th>
                <th rowSpan={2} className="border-r border-gray-300 w-24">구분</th>
                {regions.map((region, idx) => (
                    <th key={idx} colSpan={4} className="border-r border-gray-300">{region}</th>
                ))}
               </tr>
               <tr className="bg-[#f5f5f5] text-gray-700 h-8 border-b border-gray-300 font-semibold text-center">
                    {regions.map((_, idx) => (
                        <React.Fragment key={idx}>
                            <td className="border-r border-gray-300 w-24">판매금액</td>
                            <td className="border-r border-gray-300 w-20">구매건수</td>
                            <td className="border-r border-gray-300 w-20">구매자수</td>
                            <td className="border-r border-gray-300 w-20">구매개수</td>
                        </React.Fragment>
                    ))}
               </tr>
            </thead>
            <tbody>
                {days.map((date) => (
                    <React.Fragment key={date}>
                        {/* PC Row */}
                         <tr className="h-8 border-b border-gray-200 hover:bg-gray-50 text-gray-600">
                            <td rowSpan={4} className="border-r border-gray-200 bg-white">{date}</td>
                            <td className="border-r border-gray-200">pc</td>
                            {regions.map((_, idx) => (
                                <React.Fragment key={idx}>
                                    <td className="border-r border-gray-200">0</td>
                                    <td className="border-r border-gray-200">0</td>
                                    <td className="border-r border-gray-200">0</td>
                                    <td className="border-r border-gray-200">0</td>
                                </React.Fragment>
                            ))}
                        </tr>
                        {/* Mobile Row */}
                        <tr className="h-8 border-b border-gray-200 hover:bg-gray-50 text-gray-600">
                            <td className="border-r border-gray-200">mobile</td>
                            {regions.map((_, idx) => (
                                <React.Fragment key={idx}>
                                    <td className="border-r border-gray-200">0</td>
                                    <td className="border-r border-gray-200">0</td>
                                    <td className="border-r border-gray-200">0</td>
                                    <td className="border-r border-gray-200">0</td>
                                </React.Fragment>
                            ))}
                        </tr>
                        {/* Manual Row */}
                        <tr className="h-8 border-b border-gray-200 hover:bg-gray-50 text-gray-600">
                            <td className="border-r border-gray-200">수기주문</td>
                            {regions.map((_, idx) => (
                                <React.Fragment key={idx}>
                                    <td className="border-r border-gray-200">0</td>
                                    <td className="border-r border-gray-200">0</td>
                                    <td className="border-r border-gray-200">0</td>
                                    <td className="border-r border-gray-200">0</td>
                                </React.Fragment>
                            ))}
                        </tr>
                         {/* Total Row */}
                         <tr className="h-8 border-b border-gray-200 hover:bg-gray-50 text-gray-600 bg-[#E5EEF6]/50 font-bold">
                            <td className="border-r border-gray-200">총액</td>
                            {regions.map((_, idx) => (
                                <React.Fragment key={idx}>
                                    <td className="border-r border-gray-200">0</td>
                                    <td className="border-r border-gray-200">0</td>
                                    <td className="border-r border-gray-200">0</td>
                                    <td className="border-r border-gray-200">0</td>
                                </React.Fragment>
                            ))}
                        </tr>
                    </React.Fragment>
                ))}
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
            <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 주문통계의 집계 기준은 무엇인가요?</h4>
            <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>주문통계는 <span className="text-[#5BA0E8] font-bold">"결제완료"</span> 일자 기준으로 집계됩니다.</li>
              <li><span className="mr-1 text-red-500">·</span><span className="text-red-500">입금대기 / 상품준비중 / 배송중 / 배송완료 / 구매확정 / 취소 / 교환 / 반품 / 환불 건은 반영되지 않습니다.</span></li>
              <li><span className="mr-1"></span>예시) 1월 1일 주문완료 후 1월 8일 결제완료되었다면 해당건은 1월 8일자의 데이터로 집계됩니다.</li>
              <li><span className="mr-1">·</span>주문관리의 주문일 기준 주문건수와 금액이 다르게 보일 수 있으나, 실제 주문의 차이가 있는 것은 아닙니다.</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 지역의 기준은 무엇인가요?</h4>
            <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>지역 정보는 구매자의 수령지 정보를 기준으로 집계됩니다.</li>
            </ul>
          </div>
          
           <div>
            <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 판매금액이란 무엇인가요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>검색기간 동안 "결제완료"된 주문에 포함된 상품의 판매가이며, 배송비는 포함되지 않습니다.</li>
               <li><span className="mr-1">·</span>판매가는 "판매가 / 옵션가 / 추가상품가 / 텍스트옵션가"의 합계 금액입니다.</li>
               <li><span className="mr-1">·</span>할인금액 "상품할인, 회원할인, 쿠폰할인(상품/주문)"은 차감 적용되지 않습니다.</li>
            </ul>
          </div>

           <div>
             <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 구매건수란 무엇인가요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>검색기간 동안 결제완료된 총 주문 수를 의미하며, 회원 / 비회원 모두 집계됩니다.</li>
              <li><span className="mr-1">·</span>1명의 구매자가 여러 건의 주문을 결제한 경우, 결제한 주문 건수만큼 집계됩니다.</li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 구매자수란 무엇인가요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>검색기간 동안 결제완료된 주문을 진행한 총 사람 수를 의미하며, 회원 / 비회원 모두 집계됩니다.</li>
               <li><span className="mr-1">·</span>1명의 구매자가 여러 건의 주문을 결제완료하여도 구매자 수는 한번만 집계됩니다.</li>
                <li><span className="mr-1">·</span>로그인한 경우 : 로그인한 사용자는 ID 단위로 계산됩니다.</li>
                 <li><span className="mr-1"></span>└ 한 개의 ID로 접속했을 때 : 한 개의 ID로 여러 번 주문해도, 구매자수는 1명이 됩니다.</li>
                 <li><span className="mr-1"></span>└ 여러 개의 ID로 접속했을 때 : 만약 한 사람이 2개의 ID로 각각 주문했다면, 구매자 수는 2명이 됩니다.</li>
                 <li><span className="mr-1">·</span>비로그인한 경우 : 로그인하지 않은 사용자는 PC 단위로 계산됩니다.</li>
                 <li><span className="mr-1"></span>└ 한 개의 PC로 접속했을 때 : 한 개의 PC로 여러 번 주문해도, 구매자 수는 1명이 됩니다.</li>
                 <li><span className="mr-1"></span>└ 여러 개의 PC로 접속했을 때 : 만약 한 사람이 2개의 PC에서 각각 주문했다면, 구매자 수는 2명이 됩니다.</li>
                 <li><span className="mr-1">·</span>로그인하지 않고 주문했던 사용자가 로그인 후 추가 주문했을 경우, 구매자 수는 2명이 됩니다.</li>
                 <li><span className="mr-1"></span>(시간대별, 요일별, 월별 구매자수도 동일한 원칙에 따라 계산됨)</li>
            </ul>
          </div>

           <div>
             <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 구매개수란 무엇인가요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>검색기간 동안 결제완료(입금확인)된 주문의 각 상품별 총 구매개수를 의미합니다.</li>
               <li><span className="mr-1">·</span>"추가상품 / 텍스트옵션"의 구매 수량도 포함하여 집계됩니다.</li>
                <li><span className="mr-1">·</span>1개의 상품을 여러 개 주문한 경우 주문한 수량만큼 집계됩니다.</li>
                 <li><span className="mr-1"></span>예시) A 상품을 2개를 한 번에 주문하면 구매개수는 2건으로 집계됩니다.</li>
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

function TabButton({ label, active = false }: { label: string; active?: boolean }) {
    return (
        <button className={`px-4 py-2.5 text-xs border border-b-0 rounded-t-lg transition-colors font-bold ${active ? 'bg-white border-gray-300 text-gray-800 relative -mb-px pb-3' : 'bg-gray-50 border-transparent text-gray-500 hover:text-gray-700'}`}>
            {label}
        </button>
    )
}

function SummaryCard({ title, value, children, isValueHidden = false }: { title: string; value: string; children?: React.ReactNode, isValueHidden?: boolean }) {
    return (
        <div className="flex flex-col items-center p-6 bg-white flex-1 relative">
            <h3 className="text-gray-700 font-bold mb-4 bg-gray-200/50 w-full text-center py-2 absolute top-0 left-0">{title}</h3>
            <div className="pt-10 w-full flex flex-col items-center">
                {!isValueHidden && <div className="text-xl font-normal text-gray-800 mb-2">{value}</div>}
                {children}
            </div>
        </div>
    )
}
