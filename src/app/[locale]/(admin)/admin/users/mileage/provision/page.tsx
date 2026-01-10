"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  Info
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

export default function MileageProvisionSettingsPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold text-gray-900 leading-none">마일리지 지급 설정</h1>
            <span className="text-gray-500 text-xs text-[#888888] pb-0.5">마일리지 지급에 대한 설정을 하실 수 있습니다.</span>
        </div>
        <Button className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
            저장
        </Button>
      </div>

      {/* Provision Settings */}
      <div className="mb-0">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">마일리지 지급설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Usage */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    사용 설정
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
        </div>
      </div>

      {/* Integrated Purchase Mileage Settings */}
      <div className="mt-8 mb-0">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">구매 마일리지 통합 설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Basic Provision */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex flex-col justify-center border-r border-gray-200 min-h-[140px]">
                    <span className="mb-1">상품 구매 시</span>
                    <span>기본 지급 마일리지</span>
                </div>
                <div className="flex-1 p-4">
                    <RadioGroup defaultValue="percent" className="flex flex-col gap-4">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="percent" id="basic-percent" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="basic-percent" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-1">
                                구매금액의 <Input className="w-16 h-7 text-xs border-gray-300" defaultValue="0" /> % 를 마일리지로 지급
                            </Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="amount-unit" id="basic-amount-unit" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="basic-amount-unit" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-1">
                                구매금액으로 <Input className="w-16 h-7 text-xs border-gray-300" disabled /> 원 단위로 <Input className="w-16 h-7 text-xs border-gray-300" disabled /> 마일리지 지급
                            </Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="amount-item" id="basic-amount-item" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="basic-amount-item" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-1">
                                구매금액과 상관없이 구매상품 1개 단위로 <Input className="w-16 h-7 text-xs border-gray-300" disabled /> 마일리지 지급
                            </Label>
                        </div>
                    </RadioGroup>
                    <p className="mt-2 text-[#888888] text-[11px] flex items-center gap-1">
                        <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span className="text-[#888888]">회원 &gt; 마일리지 / 예치금 관리 &gt; 마일리지 기본 설정에서 설정한 구매금액 기준에 따름 : 판매가</span>
                    </p>
                </div>
            </div>

            {/* Additional Provision */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    추가 지급 마일리지
                </div>
                <div className="flex-1 p-4">
                   <p className="text-gray-600 mb-2">회원등급이 "일반회원"인 경우 추가 지급 하지 않음</p>
                   <Link href="#" className="text-blue-500 underline text-xs">회원등급별 혜택 설정 &gt;</Link>
                </div>
            </div>

            {/* Exception Settings */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex flex-col justify-center gap-1 border-r border-gray-200 min-h-[160px]">
                    <div className="flex items-center gap-1">
                        <span>마일리지 사용시</span>
                    </div>
                    <div className="flex items-center gap-1">
                         <span>지급 예외 설정</span>
                         <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                </div>
                <div className="flex-1 p-4">
                    <p className="text-gray-600 mb-2 font-bold">마일리지를 사용한 주문 건에 대해</p>
                    <RadioGroup defaultValue="give" className="flex flex-col gap-2">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="give" id="except-give" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="except-give" className="text-gray-600 font-normal cursor-pointer text-xs">구매 마일리지 지급함</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="no-give" id="except-no-give" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="except-no-give" className="text-gray-600 font-normal cursor-pointer text-xs">구매 마일리지 지급안함</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="recalc" id="except-recalc" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="except-recalc" className="text-gray-600 font-normal cursor-pointer text-xs">지급률 재계산 (상품구매 금액 - 사용 마일리지 금액으로 해당 상품의 마일리지 지급금액 재계산)</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="deduct-amount" id="except-deduct-amount" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="except-deduct-amount" className="text-gray-600 font-normal cursor-pointer text-xs">지급금액 차감 (지급예정 마일리지를 미리 계산하여 사용 마일리지를 차감하고 지급)</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="deduct-rate" id="except-deduct-rate" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="except-deduct-rate" className="text-gray-600 font-normal cursor-pointer text-xs">지급률 차감 (구매금액 대비 사용 마일리지 비율을 구한 후, 해당 비율로 지급 예정 마일리지도 동일 비율로 차감)</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            {/* Provision Timing */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    지급 시점
                </div>
                <div className="flex-1 p-4 flex items-center gap-3">
                   <span className="text-gray-600">구매확정시 지급</span>
                   <Link href="#" className="text-blue-500 underline text-xs">주문상태별 적립시점 설정 &gt;</Link>
                   <div className="flex items-center gap-1.5 ml-4">
                        <Checkbox id="grace-period" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="grace-period" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-1">
                             지급 유예기능 사용 : 
                             <Select defaultValue="7">
                                <SelectTrigger className="w-16 h-7 text-xs border-gray-300 bg-white ml-1">
                                    <SelectValue placeholder="7일" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7">7일</SelectItem>
                                    <SelectItem value="14">14일</SelectItem>
                                </SelectContent>
                            </Select>
                        </Label>
                    </div>
                </div>
            </div>
        </div>
      </div>

       {/* Event Mileage Settings */}
       <div className="mt-8 mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">이벤트성 마일리지 설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* New Member */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[100px]">
                    신규회원 가입
                </div>
                <div className="flex-1 p-4 gap-2 flex flex-col justify-center">
                    <div className="flex items-center gap-1.5">
                       <span className="text-gray-600">신규회원 가입 시</span>
                       <Input className="w-20 h-7 text-xs border-gray-300" defaultValue="0" />
                       <span className="text-gray-600">원 지급</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="email-consent" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="email-consent" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-1">
                            이메일 수신동의 시 <Input className="w-20 h-7 text-xs border-gray-300" defaultValue="0" /> 원 추가 지급
                        </Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                         <Checkbox id="sms-consent" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="sms-consent" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-1">
                            SMS 수신동의 시 <Input className="w-20 h-7 text-xs border-gray-300" defaultValue="0" /> 원 추가 지급
                        </Label>
                    </div>
                </div>
            </div>

            {/* Recommender */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[100px]">
                    추천인 등록
                </div>
                <div className="flex-1 p-4 gap-2 flex flex-col justify-center">
                    <div className="flex items-center gap-1.5">
                       <span className="text-gray-600">추천인 아이디를 등록한 회원에게</span>
                       <Input className="w-20 h-7 text-xs border-gray-300 bg-gray-100"  disabled />
                       <span className="text-gray-600">원 지급</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                       <span className="text-gray-600">추천인으로 등록된 회원에게</span>
                       <Input className="w-20 h-7 text-xs border-gray-300 bg-gray-100"  disabled />
                       <span className="text-gray-600">원 지급</span>
                       <Checkbox id="limit-count" className="border-gray-300 rounded-[2px] ml-2" disabled />
                       <Label htmlFor="limit-count" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-1">
                           지급횟수 <Input className="w-20 h-7 text-xs border-gray-300 bg-gray-100" disabled /> 회로 제한
                        </Label>
                    </div>
                     <p className="text-[#888888] text-[11px] flex items-center gap-1">
                        <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span className="text-[#888888]">* 회원가입 시 추천인 아이디를 입력하도록 설정해야 사용하실 수 있습니다.</span>
                        <Link href="#" className="text-blue-500 underline">회원가입항목 설정&gt;</Link>
                    </p>
                </div>
            </div>

            {/* Birthday */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    생일축하
                </div>
                <div className="flex-1 p-4 flex items-center gap-1.5">
                     <span className="text-gray-600">생일인 회원에게</span>
                     <Input className="w-24 h-7 text-xs border-gray-300" defaultValue="0" />
                     <span className="text-gray-600">원을(를) 마일리지로 지급</span>
                </div>
            </div>
        </div>
      </div>
      
       <hr className="border-gray-200 mb-6" />

      {/* Guide Info */}
       <div className="text-gray-600 text-xs">
          <h3 className="font-bold flex items-center gap-1 mb-2 text-blue-500 text-[13px]">
              <Info className="w-4 h-4" /> 안내
          </h3>
          <h4 className="font-bold text-gray-700 text-xs mb-2">주문 시, 고객이 마일리지를 사용한 경우, 마일리지 지급 비율을 조정할 수 있나요?</h4>
          <div className="space-y-4">
               <div>
                  <p className="text-gray-500 mb-1">· "마일리지 사용시 지급 예외 설정" 을 통하여 주문 시, 고객이 마일리지를 사용한 경우에 대한 설정이 가능합니다.</p>
                  <p className="text-gray-500 mb-1 pl-2">- 이 때의 마일리지란, "상품 마일리지"를 뜻하며, "회원등급별 추가 지급" 이나 "마일리지 지급 쿠폰"에 영향을 미치지는 않습니다.</p>
                  <p className="text-gray-500 mb-2 pl-2">- 각 설정은 다음과 같습니다. (다만, 상품별 계산되는 조건의 경우에는 주문단위 조건보다 1~2원의 차액이 발생할 수 있습니다.)</p>
                  
                  <ul className="list-none space-y-3 pl-1 text-gray-500">
                       <li>
                           <p>· 구매 마일리지 지급함</p>
                           <p className="pl-2">- 사용 마일리지를 사용한 것과 상관없이 최초 지급해야하는 마일리지를 그대로 지급하는 설정.</p>
                       </li>
                       <li>
                           <p>· 구매 마일리지 지급안함</p>
                           <p className="pl-2">- 마일리지를 사용한 경우에는 상품 마일리지 자체를 아예 지급하지 않음.</p>
                       </li>
                       <li>
                           <p>· 지급률 재계산</p>
                           <p className="pl-2">- "지급률 재계산"은 상품별로 계산되어 지급됩니다.</p>
                           <p className="pl-2">- 고객이 사용한 마일리지를 각 상품별 구매금액 비율로 나눈 후에, 각 상품금액에서 마일리지를 차감한 금액을 실제 상품금액으로 적립율을 계산하는 방식입니다.</p>
                           <p className="pl-2">- 다만 여러 상품이 존재하는 경우 마지막 상품은 사용마일리지를 구매금액 비율로 나누어지 않고 남은 금액으로 뺍니다.</p>
                       </li>
                       <li>
                           <p>· 지급금액 차감</p>
                           <p className="pl-2">- "지급률 지급금액"은 상품별로 계산되어 지급됩니다.</p>
                           <p className="pl-2">- 고객이 사용한 마일리지를 각 상품별 구매금액 비율로 나눈 후에, 마일리지 사용하지 않았을 경우 지급 예상되는 마일리지에서 차감하는 방식입니다.</p>
                           <p className="pl-2">- 만약 차감 금액이 더 커서 마이너스 금액이 나올 경우에는 0원 처리합니다.</p>
                       </li>
                        <li>
                           <p>· 지급률 차감</p>
                           <p className="pl-2">- "지급률 차감"은 주문단위로 계산되어 지급됩니다.</p>
                           <p className="pl-2">- 마일리지 사용 금액 자체를 하나의 할인율이라고 인지하며, 전체 주문금액에서 마일리지 사용 금액을 비율로 계산합니다.</p>
                           <p className="pl-2 indent-1">이렇게 산출 된 할인율을, 마일리지 사용하지 않았을 경우 지급 예상되는 마일리지에 적용하여 계산하는 방식입니다.</p>
                       </li>
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
