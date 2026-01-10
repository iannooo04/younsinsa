"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  Info
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function DepositSettingsPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">예치금 설정</h1>
        <Button className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
            저장
        </Button>
      </div>

      {/* Main Settings */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">예치금 설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Usage */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    사용설정
                </div>
                <div className="flex-1 p-4">
                    <RadioGroup defaultValue="used" className="flex items-center gap-6">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="used" id="usage-used" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="usage-used" className="text-gray-600 font-normal cursor-pointer text-xs">사용함</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="unused" id="usage-unused" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="usage-unused" className="text-gray-600 font-normal cursor-pointer text-xs">사용안함</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            {/* Name */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center gap-1 border-r border-gray-200">
                    <span className="text-red-500 mr-1">●</span>쇼핑몰 노출 이름
                </div>
                <div className="flex-1 p-4">
                   <Input className="w-52 h-7 text-xs border-gray-300" defaultValue="예치금" />
                </div>
            </div>

             {/* Unit */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center gap-1 border-r border-gray-200">
                     <span className="text-red-500 mr-1">●</span>쇼핑몰 노출 단위
                </div>
                <div className="flex-1 p-4">
                   <Input className="w-24 h-7 text-xs border-gray-300" defaultValue="원" />
                </div>
            </div>
        </div>
      </div>
      
       <hr className="border-gray-200 mb-6" />

      {/* Guide Info */}
       <div className="text-gray-600 text-xs">
          <h3 className="font-bold flex items-center gap-1 mb-6 text-blue-500 text-[13px]">
              <Info className="w-4 h-4" /> 안내
          </h3>
          <div className="space-y-6">
              <div>
                  <h4 className="font-bold text-gray-600 text-xs mb-2">[예치금] 예치금으로 구매해도 현금영수증이 발급되나요?</h4>
                   <ul className="list-none space-y-1 text-gray-500">
                    <li>· 예치금으로 구매한 건에 대해서는 현금영수증이 발급되지 않습니다.</li>
                    <li>- 신용카드로 결제한 주문 환불금액을 예치금으로 지급하는 경우, 이중으로 신고가 되지 않도록 증빙 발급에 유의 바랍니다.</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold text-gray-600 text-xs mb-2">[예치금] 예치금 지급 시 유의해야 할 점이 있나요?</h4>
                   <ul className="list-none space-y-1 text-gray-500">
                    <li>· 신용카드로 결제한 주문 환불금액을 예치금으로 지급 후 즉시 현금화하는 경우 신용카드 불법할인(카드깡)으로 여신전문금융법에 위반되므로 유의 바랍니다.</li>
                  </ul>
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
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0">
                         <ChevronUp className="w-4 h-4 rotate-180" />
                </Button>
            </div>
        </div>

    </div>
  );
}
