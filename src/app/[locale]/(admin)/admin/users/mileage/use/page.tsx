"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Link } from "@/i18n/routing";

export default function MileageUseSettingsPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold text-gray-900 leading-none">마일리지 사용 설정</h1>
            <span className="text-gray-500 text-xs text-[#888888] pb-0.5">마일리지 사용에 대한 설정을 하실 수 있습니다.</span>
        </div>
        <Button className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
            저장
        </Button>
      </div>

      {/* Main Settings */}
      <div className="mb-0">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">마일리지 사용설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Min Holding Limit */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    최소 보유마일리지 제한
                </div>
                <div className="flex-1 p-4 flex items-center gap-2">
                   <Input className="w-24 h-7 text-xs border-gray-300" defaultValue="0" />
                   <span className="text-gray-600">원 이상 보유한 경우 결제시 사용 가능</span>
                </div>
            </div>

            {/* Min Purchase Amount Limit */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex flex-col justify-center gap-1 border-r border-gray-200">
                   <div className="flex items-center gap-1">
                        <span>최소 상품구매금액 제한</span>
                    </div>
                     <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 p-4">
                     <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-600">구매금액 합계가</span>
                        <Input className="w-24 h-7 text-xs border-gray-300" defaultValue="0" />
                        <span className="text-gray-600">원 이상인 경우 결제시 사용 가능</span>
                     </div>
                     <div className="flex items-center gap-6">
                        <RadioGroup defaultValue="exclude" className="flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="exclude" id="price-exclude" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="price-exclude" className="text-gray-600 font-normal cursor-pointer text-xs">할인금액 미포함 가격기준</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="include" id="price-include" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="price-include" className="text-gray-600 font-normal cursor-pointer text-xs">할인금액 포함 가격기준</Label>
                            </div>
                        </RadioGroup>
                     </div>
                </div>
            </div>

            {/* Min Use Limit */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    최소 사용마일리지 제한
                </div>
                <div className="flex-1 p-4 flex items-center gap-2">
                   <span className="text-gray-600">1회 결제 시 최소</span>
                   <Input className="w-24 h-7 text-xs border-gray-300" defaultValue="0" />
                   <span className="text-gray-600">원 이상 사용 가능</span>
                </div>
            </div>

            {/* Max Use Limit */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[120px]">
                    최대 사용금액 제한
                </div>
                <div className="flex-1 p-4">
                     <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-600">1회 결제 시 최대</span>
                        <Input className="w-24 h-7 text-xs border-gray-300" defaultValue="0" />
                        <Select defaultValue="won">
                            <SelectTrigger className="w-16 h-7 text-xs border-gray-300 bg-white">
                                <SelectValue placeholder="원" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="won">원</SelectItem>
                                <SelectItem value="percent">%</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-gray-600">까지 사용 가능</span>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[#888888] text-[11px] flex items-center gap-1">
                            <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                            <span className="text-[#888888]">정액(원)으로 설정 시 구매금액 기준 : 할인이 모두 적용된 결제금액</span>
                        </p>
                        <p className="text-[#888888] text-[11px] flex items-start gap-1">
                            <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                            <span className="text-[#888888]">정률(%)로 설정 시 <Link href="#" className="text-blue-500 underline">마일리지 기본설정</Link> 에서 설정한 구매금액 기준에 따름<br />구매금액 기준 : 판매가</span>
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Delivery Fee Inclusion */}
             <div className="flex">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[100px]">
                    배송비 포함 여부
                </div>
                <div className="flex-1 p-4">
                     <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-700">사용 마일리지 제한 금액에</span>
                         <RadioGroup defaultValue="include" className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="include" id="shipping-include" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="shipping-include" className="text-gray-600 font-normal cursor-pointer text-xs">배송비 포함</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="exclude" id="shipping-exclude" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="shipping-exclude" className="text-gray-600 font-normal cursor-pointer text-xs">배송비 미포함</Label>
                            </div>
                        </RadioGroup>
                     </div>
                    <div className="space-y-1">
                         <p className="text-red-500 text-[11px] flex items-center gap-1">
                            <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                            <span>"배송비 미포함"으로 설정할 경우, 고객은 배송비를 제외한 상품금액에 대해서만 마일리지 사용이 가능합니다.</span>
                        </p>
                         <p className="text-red-500 text-[11px] flex items-center gap-1">
                            <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                            <span>배송비 포함 여부 설정은 예치금 사용에 대해서도 동일하게 처리됩니다.</span>
                        </p>
                    </div>
                </div>
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
