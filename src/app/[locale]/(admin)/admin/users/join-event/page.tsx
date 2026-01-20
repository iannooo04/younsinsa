"use client";

import React from "react";
import { Button } from "@/components/ui/button";
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
  AlertCircle
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";

export default function MemberJoinEventPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">회원가입 이벤트</h1>
        <div className="flex gap-1">
            <Button variant="outline" className="h-9 px-4 text-xs bg-white text-gray-700 border-gray-300 hover:bg-gray-50 rounded-[2px]">
                이벤트 현황
            </Button>
            <Button className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
                저장
            </Button>
        </div>
      </div>

      {/* New Member Benefits Info */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">신규회원 가입 혜택</h2>
           <span className="text-[#888888] text-[11px] font-normal">신규가입회원에게 제공 중인 혜택정보입니다.</span>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200 bg-[#FBFBFB]">
             <div className="flex border-b border-gray-200">
                <div className="w-40 p-4 font-bold text-gray-700 text-xs text-left">
                    쿠폰
                </div>
                <div className="flex-1 p-4 bg-white border-l border-gray-200">
                    <span className="text-gray-600">등록된 '회원가입 축하 쿠폰'이 없습니다. </span>
                    <Link href="#" className="text-blue-500 underline hover:text-blue-600">신규쿠폰 등록&gt;</Link>
                </div>
            </div>
             <div className="flex">
                <div className="w-40 p-4 font-bold text-gray-700 text-xs text-left">
                    마일리지
                </div>
                <div className="flex-1 p-4 bg-white border-l border-gray-200">
                    <div className="space-y-1 text-gray-600">
                        <p>신규회원 가입 시 0원 지급</p>
                        <p>이메일 수신동의 시 미지급</p>
                        <p>SMS 수신동의 시 미지급</p>
                        <Link href="#" className="text-blue-500 underline hover:text-blue-600 inline-block mt-1">마일리지 지급 설정&gt;</Link>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
          <div className="h-10 px-6 flex items-center justify-center border border-gray-400 border-b-white bg-white font-bold text-gray-800 text-xs cursor-pointer -mb-[1px]">
              주문 간단 가입
          </div>
           <div className="h-10 px-6 flex items-center justify-center border border-gray-200 bg-[#FBFBFB] text-gray-500 text-xs cursor-pointer border-l-0">
              회원가입 유도 푸시
          </div>
      </div>

      {/* Info Box */}
      <div className="border border-gray-200 p-5 flex gap-4 items-start mb-8">
          <AlertCircle className="w-10 h-10 text-[#FF424D]" strokeWidth={1.5} />
          <div>
              <h3 className="font-bold text-gray-700 text-xs mb-1">주문 간단 가입이란?</h3>
              <p className="text-gray-600 leading-relaxed">
                  비회원 주문 시 이메일, 비밀번호 입력만으로 회원가입이 가능하고, 주문 시 주문정보가 회원정보에 바로 반영되는 기능입니다.<br/>
                  비회원 주문 고객에게 신규가입 혜택을 알리고, 즉시 사용 가능한 혜택을 제공하여 회원전환율을 높여보세요!
              </p>
          </div>
      </div>

      {/* Basic Settings */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">주문 간단 가입 기본설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Usage */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    사용 설정
                </div>
                <div className="flex-1 p-3">
                    <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="used" id="basic-used" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="basic-used" className="text-gray-600 font-normal cursor-pointer text-xs">사용함</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="unused" id="basic-unused" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="basic-unused" className="text-gray-600 font-normal cursor-pointer text-xs">사용안함</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            {/* Scope */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    진행범위
                </div>
                <div className="flex-1 p-3">
                    <RadioGroup defaultValue="pcmobile" className="flex items-center gap-6">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="pcmobile" id="scope-pcmobile" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="scope-pcmobile" className="text-gray-600 font-normal cursor-pointer text-xs">PC+모바일</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="pc" id="scope-pc" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="scope-pc" className="text-gray-600 font-normal cursor-pointer text-xs">PC</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="mobile" id="scope-mobile" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="scope-mobile" className="text-gray-600 font-normal cursor-pointer text-xs">모바일</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            {/* Coupon Benefit */}
             <div className="flex">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[100px]">
                    쿠폰 혜택
                </div>
                <div className="flex-1 p-3">
                     <div className="flex items-center gap-1 mb-2">
                        <Select defaultValue="select">
                            <SelectTrigger className="w-64 h-7 text-xs border-gray-300 bg-white">
                                <SelectValue placeholder="쿠폰 선택" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="select">쿠폰 선택</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="secondary" className="h-7 px-3 text-[11px] bg-[#AAAAAA] border border-[#AAAAAA] text-white rounded-[2px] hover:bg-[#999999]">신규쿠폰 등록</Button>
                     </div>
                     <p className="text-[11px] text-[#888888] flex items-start gap-1">
                         <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                         선택가능 쿠폰: 발급상태가 '발급중/일시정지'이며, 발급방식이 '자동발급'인 주문 간단 가입 쿠폰
                    </p>
                    <p className="text-[11px] text-[#888888] flex items-start gap-1 pl-4 mb-1">
                         사용범위는 'PC+모바일' / 제한조건은 최소로 설정된 쿠폰 사용을 권장드립니다.
                    </p>
                    <p className="text-[11px] text-[#888888] flex items-start gap-1">
                         <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                         쿠폰 혜택 설정 시, '주문 간단 가입'을 통해 가입한 회원에게 신규회원 가입 혜택 외에 선택된 쿠폰이 추가로 발급됩니다
                    </p>
                </div>
            </div>
        </div>
      </div>

       {/* Banner Settings */}
      <div className="mb-24">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">이벤트 배너 설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Usage */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    사용 설정
                </div>
                <div className="flex-1 p-3">
                    <RadioGroup defaultValue="used" className="flex items-center gap-6">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="used" id="banner-used" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="banner-used" className="text-gray-600 font-normal cursor-pointer text-xs">사용함</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="unused" id="banner-unused" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="banner-unused" className="text-gray-600 font-normal cursor-pointer text-xs">사용안함</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

             {/* Banner Settings */}
             <div className="flex">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[200px]">
                    배너 설정
                </div>
                <div className="flex-1 p-3">
                     <RadioGroup defaultValue="default" className="flex items-center gap-6 mb-4">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="default" id="banner-default" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="banner-default" className="text-gray-600 font-normal cursor-pointer text-xs">기본 배너</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="custom" id="banner-custom" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="banner-custom" className="text-gray-600 font-normal cursor-pointer text-xs">이미지 직접 등록</Label>
                        </div>
                    </RadioGroup>

                    {/* Banner Preview */}
                    <div className="w-[400px] h-[180px] bg-[#EAF5FF] rounded-sm relative flex items-center justify-center overflow-hidden">
                        <div className="absolute top-4 left-8 text-[#2B78C5] leading-tight">
                            <h3 className="text-2xl font-bold tracking-tighter mb-1">간단 가입<span className="text-gray-700">하고</span></h3>
                            <h3 className="text-2xl font-bold tracking-tighter">
                                <span className="text-[#004B96]">즉시 혜택 받아가세요!</span>
                            </h3>
                        </div>
                         {/* Decorative elements to mimic the screenshot */}
                        <div className="absolute top-4 left-32 w-16 h-16 border-[3px] border-dotted border-white/50 rounded-full opacity-50"></div>
                         <div className="absolute bottom-[-20px] left-[40px] w-32 h-32 bg-white/20 rounded-full"></div>
                         <div className="absolute top-8 right-12 w-20 h-20 border-[4px] border-dotted border-white/50 rounded-full opacity-60"></div>
                           <div className="absolute top-[30%] left-[20%] w-3 h-3 bg-[#A3C7EB] rounded-full opacity-50"></div>
                           <div className="absolute top-[20%] left-[30%] w-4 h-4 border border-[#A3C7EB] rounded-full opacity-50"></div>
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
