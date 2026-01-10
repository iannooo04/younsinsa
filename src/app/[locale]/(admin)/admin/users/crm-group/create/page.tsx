"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Youtube,
  ChevronUp,
  Plus
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

export default function CrmGroupCreatePage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">CRM 그룹 등록</h1>
      </div>

       {/* Basic Settings */}
       <div className="mb-8 border border-gray-200 rounded-sm">
           <div className="p-4 bg-white border-b border-gray-100">
               <h2 className="text-sm font-bold text-gray-800">기본 설정</h2>
           </div>
           
           <div className="bg-white">
                {/* Store */}
                <div className="flex border-b border-gray-100 min-h-[50px]">
                    <div className="w-40 bg-[#FBFBFB] p-4 pl-6 text-gray-700 font-bold flex items-center border-r border-gray-100">
                        <span className="text-red-500 mr-1">*</span> 상점
                    </div>
                    <div className="flex-1 p-4 flex items-center">
                        <RadioGroup defaultValue="all" className="flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all" id="store-all" className="border-gray-800 text-gray-800 focus:ring-gray-800" />
                                <Label htmlFor="store-all" className="text-gray-800 font-bold cursor-pointer text-xs">전체</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="kr" id="store-kr" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="store-kr" className="text-gray-600 font-normal cursor-pointer text-xs">기준몰</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="en" id="store-en" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="store-en" className="text-gray-600 font-normal cursor-pointer text-xs">영문몰</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="cn" id="store-cn" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="store-cn" className="text-gray-600 font-normal cursor-pointer text-xs">중문몰</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="jp" id="store-jp" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="store-jp" className="text-gray-600 font-normal cursor-pointer text-xs">일문몰</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                {/* Template Type */}
                <div className="flex border-b border-gray-100 min-h-[80px]">
                    <div className="w-40 bg-[#FBFBFB] p-4 pl-6 text-gray-700 font-bold flex items-center border-r border-gray-100">
                        <span className="text-red-500 mr-1">*</span> 템플릿 유형
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-center">
                        <RadioGroup defaultValue="direct" className="space-y-3">
                             <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="direct" id="tmpl-direct" className="border-gray-800 text-gray-800 focus:ring-gray-800" />
                                    <Label htmlFor="tmpl-direct" className="text-gray-800 font-bold cursor-pointer text-xs">직접 입력</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="new-member" id="tmpl-new-member" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="tmpl-new-member" className="text-gray-600 font-normal cursor-pointer text-xs">신규회원 구매유도</Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="cart" id="tmpl-cart" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="tmpl-cart" className="text-gray-600 font-normal cursor-pointer text-xs">장바구니 알림</Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="churn" id="tmpl-churn" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="tmpl-churn" className="text-gray-600 font-normal cursor-pointer text-xs">회원 이탈방지</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="repurchase" id="tmpl-repurchase" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="tmpl-repurchase" className="text-gray-600 font-normal cursor-pointer text-xs">상품 재구매 회원</Label>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="coupon" id="tmpl-coupon" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="tmpl-coupon" className="text-gray-600 font-normal cursor-pointer text-xs">쿠폰 사용 유도</Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="mileage" id="tmpl-mileage" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="tmpl-mileage" className="text-gray-600 font-normal cursor-pointer text-xs">마일리지 사용 유도</Label>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                {/* Group Name */}
                 <div className="flex border-b border-gray-100 min-h-[50px]">
                    <div className="w-40 bg-[#FBFBFB] p-4 pl-6 text-gray-700 font-bold flex items-center border-r border-gray-100">
                        <span className="text-red-500 mr-1">*</span> 그룹명
                    </div>
                    <div className="flex-1 p-4 flex items-center">
                        <div className="relative w-full max-w-2xl">
                             <Input className="w-full h-8 text-xs border-gray-300 pr-12" placeholder="그룹명 입력" />
                             <span className="absolute right-3 top-2 text-gray-400 text-[11px]">0 / 20</span>
                        </div>
                    </div>
                </div>

                {/* Extraction Cycle */}
                <div className="flex border-b border-gray-100 min-h-[50px]">
                    <div className="w-40 bg-[#FBFBFB] p-4 pl-6 text-gray-700 font-bold flex items-center border-r border-gray-100">
                        <span className="text-red-500 mr-1">*</span> 데이터 추출 주기
                    </div>
                    <div className="flex-1 p-4 flex items-center">
                        <RadioGroup defaultValue="one-time" className="flex items-center gap-6">
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="one-time" id="cycle-one-time" className="border-gray-800 text-gray-800 focus:ring-gray-800" />
                                <Label htmlFor="cycle-one-time" className="text-gray-800 font-bold cursor-pointer text-xs">1회 추출</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="recurring" id="cycle-recurring" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="cycle-recurring" className="text-gray-600 font-normal cursor-pointer text-xs">반복 추출</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
           </div>
       </div>

        {/* Member Condition Settings */}
       <div className="mb-8 border border-gray-200 rounded-sm">
           <div className="p-4 bg-white border-b border-gray-100">
               <h2 className="text-sm font-bold text-gray-800">회원 조건 설정</h2>
           </div>
           
           <div className="bg-white">
                {/* Member Grade */}
                <div className="flex border-b border-gray-100 min-h-[50px]">
                    <div className="w-40 bg-[#FBFBFB] p-4 pl-6 text-gray-700 font-bold flex items-center border-r border-gray-100">
                        <span className="text-red-500 mr-1">*</span> 회원 등급
                    </div>
                    <div className="flex-1 p-4 flex items-center">
                        <RadioGroup defaultValue="all" className="flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all" id="grade-all" className="border-gray-800 text-gray-800 focus:ring-gray-800" />
                                <Label htmlFor="grade-all" className="text-gray-800 font-bold cursor-pointer text-xs">전체 회원</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="select" id="grade-select" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="grade-select" className="text-gray-600 font-normal cursor-pointer text-xs">회원 등급</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                {/* Gender */}
                <div className="flex border-b border-gray-100 min-h-[50px]">
                    <div className="w-40 bg-[#FBFBFB] p-4 pl-6 text-gray-700 font-bold flex items-center border-r border-gray-100">
                        <span className="text-red-500 mr-1">*</span> 성별
                    </div>
                    <div className="flex-1 p-4 flex items-center gap-8">
                        <div className="flex items-center gap-1.5">
                            <Checkbox id="gender-none" className="border-gray-400 rounded-[2px]" checked />
                            <Label htmlFor="gender-none" className="text-gray-600 font-normal cursor-pointer text-xs">미입력</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Checkbox id="gender-male" className="border-gray-400 rounded-[2px]" checked />
                            <Label htmlFor="gender-male" className="text-gray-600 font-normal cursor-pointer text-xs">남자</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Checkbox id="gender-female" className="border-gray-400 rounded-[2px]" checked />
                            <Label htmlFor="gender-female" className="text-gray-600 font-normal cursor-pointer text-xs">여자</Label>
                        </div>
                    </div>
                </div>

                {/* SMS Consent */}
                <div className="flex border-b border-gray-100 min-h-[50px]">
                    <div className="w-40 bg-[#FBFBFB] p-4 pl-6 text-gray-700 font-bold flex items-center border-r border-gray-100">
                        <span className="text-red-500 mr-1">*</span> SMS 수신동의
                    </div>
                    <div className="flex-1 p-4 flex items-center gap-8">
                        <div className="flex items-center gap-1.5">
                            <Checkbox id="sms-agree" className="border-gray-400 rounded-[2px]" checked />
                            <Label htmlFor="sms-agree" className="text-gray-600 font-normal cursor-pointer text-xs">동의</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Checkbox id="sms-disagree" className="border-gray-400 rounded-[2px]" checked />
                            <Label htmlFor="sms-disagree" className="text-gray-600 font-normal cursor-pointer text-xs">미동의</Label>
                        </div>
                    </div>
                </div>

                {/* Email Consent */}
                <div className="flex border-b border-gray-100 min-h-[50px]">
                    <div className="w-40 bg-[#FBFBFB] p-4 pl-6 text-gray-700 font-bold flex items-center border-r border-gray-100">
                        <span className="text-red-500 mr-1">*</span> 이메일 수신동의
                    </div>
                    <div className="flex-1 p-4 flex items-center gap-8">
                        <div className="flex items-center gap-1.5">
                            <Checkbox id="email-agree" className="border-gray-400 rounded-[2px]" checked />
                            <Label htmlFor="email-agree" className="text-gray-600 font-normal cursor-pointer text-xs">동의</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Checkbox id="email-disagree" className="border-gray-400 rounded-[2px]" checked />
                            <Label htmlFor="email-disagree" className="text-gray-600 font-normal cursor-pointer text-xs">미동의</Label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Action Condition Settings */}
       <div className="mb-8 border border-gray-200 rounded-sm">
           <div className="p-4 bg-white border-b border-gray-100">
               <h2 className="text-sm font-bold text-gray-800">행동 조건 설정</h2>
           </div>
           
           <div className="bg-white p-4">
                <div className="bg-[#F8F9FA] rounded-[4px] mb-4">
                     <div className="flex items-center min-h-[60px] p-4">
                        <div className="w-40 font-bold text-gray-700 pl-2">행동 조건 1</div>
                        <div className="flex-1">
                             <Select>
                                <SelectTrigger className="w-60 h-8 text-xs border-gray-300 rounded-[4px] bg-white">
                                    <SelectValue placeholder="조건 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">조건 선택</SelectItem>
                                    <SelectItem value="purchase">구매 이력</SelectItem>
                                    <SelectItem value="login">로그인 이력</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                     </div>
                </div>

                <div className="flex justify-center">
                    <Button variant="outline" className="h-9 px-6 border-gray-300 text-gray-700 flex items-center gap-1 rounded-[4px] hover:bg-gray-50">
                        <Plus className="w-4 h-4" /> 추가
                    </Button>
                </div>
           </div>
       </div>

        {/* Footer Actions */}
        <div className="mt-4 border-t border-gray-300 bg-[#E6E8EB] p-4 flex justify-end">
             <Button className="h-10 px-8 bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold rounded-[4px] text-sm">
                 저장
            </Button>
        </div>

       
        {/* Floating Actions */}
        <div className="fixed right-6 bottom-20 flex flex-col gap-2 z-50">
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
