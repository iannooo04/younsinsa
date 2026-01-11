"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar, Youtube, ChevronUp, HelpCircle, FileSpreadsheet } from "lucide-react";

export default function SalesStatisticsPage() {
  const [activeTab, setActiveTab] = useState("daily");

  const summaryData = {
    total: { amount: 0, sales: 0, refund: 0 },
    max: { amount: 0, date: "2026-01-11" },
    min: { amount: 0, date: "2026-01-11" },
    pc: { amount: 0, sales: 0, refund: 0 },
    mobile: { amount: 0, sales: 0, refund: 0 },
    manual: { amount: 0, sales: 0, refund: 0 },
  };

  const tableData = [
    { date: "2026-01-07", type: "pc", sales: 0, productSales: 0, productDiscount: 0, payment: 0, shipping: 0, shippingDiscount: 0, shippingPayment: 0, totalSales: 0, productPay: 0, shippingPay: 0 },
    { date: "2026-01-07", type: "mobile", sales: 0, productSales: 0, productDiscount: 0, payment: 0, shipping: 0, shippingDiscount: 0, shippingPayment: 0, totalSales: 0, productPay: 0, shippingPay: 0 },
    { date: "2026-01-07", type: "manual", sales: 0, productSales: 0, productDiscount: 0, payment: 0, shipping: 0, shippingDiscount: 0, shippingPayment: 0, totalSales: 0, productPay: 0, shippingPay: 0 },
    { date: "2026-01-07", type: "total", sales: 0, productSales: 0, productDiscount: 0, payment: 0, shipping: 0, shippingDiscount: 0, shippingPayment: 0, totalSales: 0, productPay: 0, shippingPay: 0 },
    // ... repeat for other dates if needed, just showing structure
  ];

  // Helper to render summarized rows for 2026-01-07 to 2026-01-11 as per screenshot
  // The screenshot shows empty data (0s). I will render a few days.
  const days = ["2026-01-07", "2026-01-08", "2026-01-09", "2026-01-10", "2026-01-11"];

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">매출통계</h1>
        <Button variant="outline" className="h-8 text-xs border-gray-300 text-gray-600">
            통계 수집 방식 설정
        </Button>
      </div>

       <div className="flex items-center gap-1 mb-2">
         <h2 className="text-base font-bold text-gray-700">매출 검색</h2>
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
      </div>

      {/* Search Button */}
      <div className="flex justify-center mb-10">
        <Button className="w-24 h-10 bg-[#4B5563] hover:bg-[#374151] text-white font-bold rounded-[2px]">
          검색
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-4 bg-gray-100 border-b border-gray-300 px-1 pt-1 flex gap-1">
          <TabButton active label="일별 매출현황" />
          <TabButton label="시간대별 매출현황" />
          <TabButton label="요일별 매출현황" />
          <TabButton label="월별 매출현황" />
          <TabButton label="회원구분 매출현황" />
          <TabButton label="과세구분 매출현황" />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-6 border border-gray-300 divide-x divide-gray-300 mb-8 bg-[#F3F6F9]/50">
          <SummaryCard title="총 매출금액" amount="0원">
              <SummaryRow label="판매금액" value="0" />
              <SummaryRow label="환불금액" value="0" />
          </SummaryCard>
          <div className="text-center p-4 py-6 flex flex-col justify-center bg-white">
               <h3 className="text-gray-600 font-bold mb-4">최대 매출금액</h3>
               <div className="text-xl text-gray-800 mb-2">0원</div>
               <div className="text-[11px] text-gray-500">2026-01-11</div>
          </div>
          <div className="text-center p-4 py-6 flex flex-col justify-center bg-white">
               <h3 className="text-gray-600 font-bold mb-4">최소 매출금액</h3>
               <div className="text-xl text-gray-800 mb-2">0원</div>
               <div className="text-[11px] text-gray-500">2026-01-11</div>
          </div>
          <SummaryCard title="PC쇼핑몰 매출금액" amount="0원" bg="bg-white">
              <SummaryRow label="판매금액" value="0" />
              <SummaryRow label="환불금액" value="0" />
          </SummaryCard>
          <SummaryCard title="모바일쇼핑몰 매출금액" amount="0원" bg="bg-white">
              <SummaryRow label="판매금액" value="0" />
              <SummaryRow label="환불금액" value="0" />
          </SummaryCard>
          <SummaryCard title="수기주문 매출금액" amount="0원" bg="bg-white">
              <SummaryRow label="판매금액" value="0" />
              <SummaryRow label="환불금액" value="0" />
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
           <table className="w-full text-center border-collapse text-xs min-w-[1200px]">
            <thead>
               <tr className="bg-[#f5f5f5] text-gray-700 h-10 border-b border-gray-300 font-semibold text-center border-t border-t-gray-400">
                <th rowSpan={2} className="border-r border-gray-300 w-24">날짜</th>
                <th rowSpan={2} className="border-r border-gray-300 w-24">구분</th>
                <th rowSpan={2} className="border-r border-gray-300 w-24">매출금액</th>
                <th colSpan={9} className="border-gray-300 h-8">판매금액</th>
               </tr>
               <tr className="bg-[#f5f5f5] text-gray-700 h-8 border-b border-gray-300 font-semibold text-center">
                    <th className="border-r border-gray-300 w-24 border-l border-l-gray-300">상품판매가</th>
                    <th className="border-r border-gray-300 w-24 text-red-500">(-) 상품할인</th>
                    <th className="border-r border-gray-300 w-24">결제금액</th>
                    <th className="border-r border-gray-300 w-24">배송비</th>
                    <th className="border-r border-gray-300 w-24 text-red-500">(-) 배송비할인</th>
                    <th className="border-r border-gray-300 w-24">결제금액</th>
                    <th className="border-r border-gray-300 w-24">판매총액</th>
                    <th className="border-r border-gray-300 w-24 text-red-500">(-) 상품결제금액</th>
                    <th className="w-24 text-red-500">(-) 배송비결제금액</th>
               </tr>
            </thead>
            <tbody>
                {days.map((date) => (
                    <React.Fragment key={date}>
                        {/* PC Row */}
                         <tr className="h-8 border-b border-gray-200 hover:bg-gray-50 text-gray-600">
                            <td rowSpan={4} className="border-r border-gray-200 bg-white">{date}</td>
                            <td className="border-r border-gray-200">pc</td>
                            <td className="border-r border-gray-200 font-bold text-black">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="">0</td>
                        </tr>
                        {/* Mobile Row */}
                        <tr className="h-8 border-b border-gray-200 hover:bg-gray-50 text-gray-600">
                            <td className="border-r border-gray-200">mobile</td>
                            <td className="border-r border-gray-200 font-bold text-black">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="">0</td>
                        </tr>
                        {/* Manual Row */}
                        <tr className="h-8 border-b border-gray-200 hover:bg-gray-50 text-gray-600">
                            <td className="border-r border-gray-200">수기주문</td>
                            <td className="border-r border-gray-200 font-bold text-black">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="">0</td>
                        </tr>
                         {/* Total Row */}
                         <tr className="h-8 border-b border-gray-200 hover:bg-gray-50 text-gray-600 bg-[#E5EEF6]/50 font-bold">
                            <td className="border-r border-gray-200">총액</td>
                            <td className="border-r border-gray-200 text-black">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="border-r border-gray-200">0</td>
                            <td className="">0</td>
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
            <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 매출금액과 주문리스트 결제금액이 다른 이유는 무엇인가요?</h4>
            <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>매출통계 데이터 중 "판매금액"의 경우 마일리지/예치금이 포함된 금액인 반면, 주문리스트의 "결제금액"의 경우 마일리지/예치금 등의 부가결제금액을 차감한 금액입니다.</li>
              <li><span className="mr-1">·</span>매출통계에서는 주문상태를 "결제완료"로 처리한 시점에 "판매금액"이 집계되며, "입금대기" 상태의 주문 건은 집계되지 않습니다.</li>
              <li><span className="mr-1">·</span>"결제완료" 처리 이후에 다시 "입금대기" 상태로 변경되더라도 이미 집계된 매출통계 데이터는 수정되지 않습니다.</li>
              <li><span className="mr-1">·</span>이미 집계된 주문 건을 "입금대기" 상태로 변경한 후 해당 주문을 취소할 경우, 주문리스트에서 해당 주문에 대해 확인할 수 없습니다.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 총 매출금액이란 무엇인가요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>검색기간 동안의 각 주문유형별 매출금액을 합한 금액이 집계됩니다.</li>
               <li><span className="mr-1">·</span>주문유형은 "PC쇼핑몰, 모바일쇼핑몰, 수기주문"으로 구분됩니다.</li>
               <li><span className="mr-1">·</span>총 매출총액 = PC쇼핑몰 매출금액 + 모바일쇼핑몰 매출금액 + 수기주문 매출금액</li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 매출금액이란 무엇인가요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>각 주문유형별 판매금액에서 환불금액을 차감한 금액이 집계됩니다.</li>
              <li><span className="mr-1">·</span>매출금액 = 판매금액 - 환불금액</li>
            </ul>
          </div>
           <div>
             <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 판매금액이란 무엇인가요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>판매금액 : 검색기간 동안에 "결제완료"된 주문만 집계되며, 해당 주문의 상품과 배송비 실 결제금액의 합계가 "판매총액"으로 집계됩니다.</li>
               <li><span className="mr-1">·</span>판매금액 = 상품 결제금액 + 배송비 결제금액</li>
               <li><span className="mr-1">·</span>상품 결제금액 = 상품판매가 - 상품할인</li>
               <li><span className="mr-1">·</span>배송비 결제금액 = 배송비 - 배송비 할인</li>
            </ul>
          </div>
           <div>
             <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 환불금액이란 무엇인가요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>검색기간 동안에 "환불완료" 및 "교환완료" 처리된 주문만 집계되며, 해당 주문의 상품과 배송비 실 결제금액의 합계가 "환불총액"으로 집계됩니다.</li>
              <li><span className="mr-1">·</span>환불금액 = 상품결제금액 + 배송비결제금액</li>
               <li><span className="mr-1">·</span>상품결제금액 = 상품판매가 - 상품할인</li>
               <li><span className="mr-1">·</span>배송비결제금액 = 배송비 - 배송비 할인</li>
            </ul>
          </div>
            <div>
             <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 상품판매가와 배송비의 집계 기준은 무엇인가요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>상품판매가 : 검색기간 동안에 결제완료 / 환불완료된 상품의 판매가 총액이 집계됩니다.</li>
               <li><span className="mr-1">·</span>상품판매가에는 상품의 "판매가, 옵션가, 텍스트 옵션가, 추가상품가"가 포함되어 집계됩니다.</li>
                <li><span className="mr-1">·</span>배송비 : 검색기간 동안에 결제완료 / 환불완료된 상품 구매 시 발생한 배송비의 총액이 집계됩니다.</li>
                 <li><span className="mr-1">·</span>주문완료 시 구매자의 배송비 결제여부와 상관없이 최초 발생된 배송비 금액이 모두 집계됩니다.</li>
            </ul>
          </div>
           <div>
             <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 할인금액이란 무엇인가요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>상품할인 : 검색기간 동안에 결제완료된 상품 중 구매자가 결제 시 할인받은 총액이 집계됩니다.</li>
               <li><span className="mr-1">·</span>상품할인에는 "상품할인, 회원할인, 쿠폰할인(상품 / 주문)" 금액이 포함되어 집계됩니다.</li>
                <li><span className="mr-1">·</span>배송비할인 : 검색기간 동안에 결제완료된 배송비 중 구매자가 결제 시 할인받은 총액이 집계됩니다.</li>
                 <li><span className="mr-1">·</span>배송비할인에는 "쿠폰할인(배송비 쿠폰), 회원 할인" 의 총액이 집계됩니다.</li>
            </ul>
          </div>
           <div>
             <h4 className="font-bold text-gray-800 mb-1">[통계 정보] 실제금액이란 무엇인가요?</h4>
             <ul className="list-none pl-1 space-y-1">
              <li><span className="mr-1">·</span>상품 결제금액 : 검색기간 동안에 결제완료된 상품의 판매가에서 상품할인 금액을 차감한 구매자의 실 결제금액의 총액이 집계됩니다.</li>
               <li><span className="mr-1">·</span>배송비 결제금액 : 검색기간 동안에 결제완료된 배송비에서 배송비할인을 차감한 구매자의 실 결제금액의 총액이 집계됩니다.</li>
                <li><span className="mr-1">·</span>구매자가 결제 시 사용한 "마일리지 / 예치금" 금액은 차감되지 않습니다.</li>
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

function SummaryCard({ title, amount, children, bg = "bg-[#F3F6F9]/50" }: { title: string; amount: string; children: React.ReactNode, bg?: string }) {
    return (
        <div className={`text-center p-4 py-6 ${bg}`}>
            <h3 className="text-gray-600 font-bold mb-4">{title}</h3>
            <div className="text-xl font-normal text-gray-800 mb-6">{amount}</div>
            <div className="space-y-2 text-xs text-gray-600 px-2">
                {children}
            </div>
        </div>
    )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between border-b border-dotted border-gray-300 pb-1 last:border-0 last:pb-0">
            <span>{label}</span>
            <span>{value}</span>
        </div>
    )
}
