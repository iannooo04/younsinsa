"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  Info
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SmsChargePage() {
  const chargeOptions = [
    { points: "500 포인트", price: "10,000원", sms: "20원/1건", lms: "60원/1건", talk: "12원/1건", friend: "28원/1건", value: "500" },
    { points: "1,000 포인트", price: "20,000원", sms: "20원/1건", lms: "60원/1건", talk: "12원/1건", friend: "28원/1건", value: "1000" },
    { points: "10,500 포인트", price: "200,000원", sms: "19원/1건", lms: "57원/1건", talk: "11.4원/1건", friend: "26.6원/1건", value: "10500" },
    { points: "21,500 포인트", price: "400,000원", sms: "18.6원/1건", lms: "55.8원/1건", talk: "11.2원/1건", friend: "26원/1건", value: "21500" },
    { points: "55,000 포인트", price: "900,000원", sms: "16.4원/1건", lms: "49.2원/1건", talk: "9.8원/1건", friend: "23원/1건", value: "55000" },
    { points: "110,000 포인트", price: "1,650,000원", sms: "15원/1건", lms: "45원/1건", talk: "9원/1건", friend: "21원/1건", value: "110000" },
    { points: "320,000 포인트", price: "4,480,000원", sms: "14원/1건", lms: "42원/1건", talk: "8.4원/1건", friend: "19.6원/1건", value: "320000" },
    { points: "500,000 포인트", price: "5,455,000원", sms: "10.9원/1건", lms: "32.7원/1건", talk: "6.5원/1건", friend: "15.3원/1건", value: "500000" },
    { points: "1,000,000 포인트", price: "10,000,000원", sms: "10원/1건", lms: "30원/1건", talk: "6원/1건", friend: "14원/1건", value: "1000000" },
  ];

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">SMS 포인트 충전</h1>
        <div className="flex gap-2">
            <Button variant="outline" className="h-9 px-4 text-xs border-gray-300 text-gray-700 rounded-[2px] bg-white hover:bg-gray-50 font-normal">
                SMS 충전 내역보기
            </Button>
            <Button className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
                SMS 포인트 충전
            </Button>
        </div>
      </div>

      {/* SMS points display */}
      <div className="mb-10">
        <div className="flex items-center gap-1 mb-2">
           <h2 className="font-bold text-base text-gray-800 tracking-tight">SMS 잔여 포인트</h2>
           <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             <div className="flex">
                <div className="w-40 bg-[#FBFBFB] p-6 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[120px] text-xs">
                    SMS 잔여 포인트
                </div>
                <div className="flex-1 p-6">
                   <div className="text-red-500 font-bold mb-3 text-sm">0.0 포인트</div>
                   <ul className="space-y-1 text-gray-800 text-xs">
                       <li className="flex items-center gap-1.5">
                           <span className="text-[10px]">•</span> 
                           SMS 발송 시: SMS 0 건 | LMS 0 건
                       </li>
                       <li className="flex items-center gap-1.5">
                           <span className="text-[10px]">•</span> 
                           카카오 알림톡 발송 시: 0 건
                       </li>
                       <li className="flex items-center gap-1.5">
                           <span className="text-[10px]">•</span> 
                           카카오 친구톡 발송 시: 0 건
                       </li>
                   </ul>
                </div>
            </div>
        </div>
      </div>

      {/* Product Selection */}
      <div className="mb-0">
        <div className="flex items-center gap-1 mb-2">
           <h2 className="font-bold text-base text-gray-800 tracking-tight">충전 상품 선택</h2>
           <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </div>

        <div className="border-t-2 border-gray-400">
             <RadioGroup defaultValue="500">
                 <table className="w-full text-xs text-center border-collapse">
                      <thead className="bg-[#B9B9B9] text-white">
                          <tr className="h-10 font-normal">
                              <th className="w-20 border-r border-gray-300 font-normal whitespace-nowrap">결제선택</th>
                              <th className="border-r border-gray-300 font-normal whitespace-nowrap">발송 건/포인트</th>
                              <th className="border-r border-gray-300 font-normal whitespace-nowrap">사용요금</th>
                              <th className="border-r border-gray-300 font-normal whitespace-nowrap">SMS(건당 1포인트)</th>
                              <th className="border-r border-gray-300 font-normal whitespace-nowrap">LMS(건당 3포인트)</th>
                              <th className="border-r border-gray-300 font-normal whitespace-nowrap font-normal">알림톡(건당 0.6포인트)</th>
                              <th className="font-normal whitespace-nowrap">친구톡(텍스트 기준 건당 1.4포인트)</th>
                          </tr>
                      </thead>
                      <tbody>
                          {chargeOptions.map((opt, i) => (
                              <tr key={i} className={`h-10 border-b border-gray-200 text-gray-700 bg-white`}>
                                  <td className="border-r border-gray-200">
                                      <div className="flex justify-center">
                                          <RadioGroupItem value={opt.value} id={`opt-${i}`} className="border-gray-400 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 focus:ring-red-500 w-4 h-4" />
                                      </div>
                                  </td>
                                  <td className="border-r border-gray-200">{opt.points}</td>
                                  <td className="border-r border-gray-200">{opt.price}</td>
                                  <td className="border-r border-gray-200">{opt.sms}</td>
                                  <td className="border-r border-gray-200">{opt.lms}</td>
                                  <td className="border-r border-gray-200">{opt.talk}</td>
                                  <td>{opt.friend}</td>
                              </tr>
                          ))}
                      </tbody>
                 </table>
             </RadioGroup>
        </div>
        
         <div className="mt-4 flex items-center gap-1.5 ml-1">
            <span className="bg-red-500 text-white w-3.5 h-3.5 text-[10px] text-center leading-[14px] rounded-[2px] font-bold">!</span>
            <span className="text-red-500 text-xs font-bold">충전된 SMS는 환불되지 않습니다. 위 사용요금과 단가는 부가세 별도 가격입니다.</span>
         </div>
      </div>

       <hr className="border-gray-200 my-12" />

      {/* Guide Info */}
       <div className="text-gray-600 text-[11px]">
          <h3 className="font-bold flex items-center gap-1 mb-6 text-blue-500 text-[13px]">
              <Info className="w-4 h-4" /> 안내
          </h3>
          <div className="space-y-6">
              <div>
                  <h4 className="font-bold text-gray-700 mb-2">{"[SMS잔여포인트] SMS잔여포인트가 무엇인가요?"}</h4>
                   <ul className="list-none space-y-2 text-gray-500 pl-1 leading-relaxed">
                    <li>· 고도몰에서는 자동 및 개별 / 전체SMS를 발송하려면 SMS포인트를 충전하여 포인트 잔액(SMS잔여포인트)이 있어야 합니다.</li>
                    <li>· SMS는 단문메시지(SMS, 90byte 이하)당 1포인트, 장문메시지(LMS, 90byte 초과 2000byte 이하)당 3포인트가 소요됩니다.</li>
                    <li>· 카카오알림톡은 0.6포인트가 소요됩니다.</li>
                    <li>· 카카오친구톡은 메시지 타입에 따라 텍스트형: 1.4포인트, 이미지형/와이드 이미지형: 2.2포인트, 와이드 아이템 리스트형/캐러셀 피드형: 2.7포인트가 소요됩니다.</li>
                  </ul>
              </div>
          </div>
      </div>
      
       {/* Bottom Copyright */}
        <div className="mt-16 mb-6 text-center text-[10px] text-gray-400">
            © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
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
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0">
                         <ChevronUp className="w-4 h-4 rotate-180" />
                </Button>
            </div>
        </div>

    </div>
  );
}
