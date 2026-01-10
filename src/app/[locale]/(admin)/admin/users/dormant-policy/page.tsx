"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  Info
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";

export default function DormantMemberPolicyPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold text-gray-900 leading-none">휴면 회원 정책</h1>
            <span className="text-gray-500 text-xs text-[#888888] pb-0.5">휴면회원의 가입 조건을 정합니다.</span>
        </div>
        <Button className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
            저장
        </Button>
      </div>

      {/* Usage Settings */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">휴면회원 사용 설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             <div className="flex">
                <div className="w-40 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[80px]">
                    사용설정
                </div>
                <div className="flex-1 p-4 flex items-center">
                    <RadioGroup defaultValue="used" className="flex items-center gap-6">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="used" id="policy-used" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="policy-used" className="text-gray-600 font-normal cursor-pointer text-xs">사용함</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="unused" id="policy-unused" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="policy-unused" className="text-gray-600 font-normal cursor-pointer text-xs">사용안함</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
        
        <div className="mt-2 text-[#888888] space-y-1">
             <p className="flex items-start gap-1">
                 <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 2023년 9월 15일 개인정보 보호법 개정으로 인해 개인정보 유효기간제가 폐지됨에 따라 상점별로 운영정책에 맞게 자율적으로 휴면회원 사용 여부를 설정할 수 있습니다.
             </p>
             <p className="flex items-start gap-1">
                 <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 휴면회원 기능을 '사용안함'으로 설정 시 다음 휴면전환 처리 시점부터 휴면 전환 대상자의 휴면 처리가 진행되지 않습니다. 단, 기존 처리된 휴면회원에 대해서는 영향이 없습니다.
             </p>
             <p className="flex items-start gap-1">
                 <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 휴면회원 기능을 '사용안함'으로 설정 시 기존 휴면상태로 전환된 회원은 <Link href="#" className="text-blue-500 underline hover:text-blue-600">회원&gt; 회원 관리&gt; 휴면 회원 관리</Link>에서 수동으로 휴면해제해주시면 됩니다.
             </p>
             <p className="flex items-start gap-1">
                 <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 휴면회원 기능을 '사용안함'으로 설정 시 기존 등록된 평생회원 이벤트와 휴면해제 감사 쿠폰의 진행 및 발급을 원치 않으시다면 수동으로 중지해주시면 됩니다. <Link href="#" className="text-blue-500 underline hover:text-blue-600">회원정보 이벤트 바로가기</Link> <Link href="#" className="text-blue-500 underline hover:text-blue-600">쿠폰 리스트 바로가기</Link>
             </p>
        </div>
      </div>

      {/* Policy Settings */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">휴면회원 정책</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Coversion Method */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    일반회원 전환방법
                </div>
                <div className="flex-1 p-4">
                    <RadioGroup defaultValue="no-auth" className="flex flex-col gap-4">
                         {/* Option 1 */}
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="no-auth" id="conv-no-auth" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="conv-no-auth" className="text-gray-700 font-normal cursor-pointer text-xs">로그인 후 본인인증단계 없이 일반회원으로 전환</Label>
                        </div>

                        {/* Option 2 */}
                        <div className="flex flex-col gap-2">
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="info-input" id="conv-info-input" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="conv-info-input" className="text-gray-700 font-normal cursor-pointer text-xs">회원정보에 등록되어있는 정보 입력 후 일반회원으로 전환</Label>
                            </div>
                            <div className="flex items-center gap-4 pl-6">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="info-phone" className="border-gray-300 rounded-[2px]" />
                                    <Label htmlFor="info-phone" className="text-gray-600 font-normal cursor-pointer text-xs">휴대폰번호</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="info-email" className="border-gray-300 rounded-[2px]" />
                                    <Label htmlFor="info-email" className="text-gray-600 font-normal cursor-pointer text-xs">이메일</Label>
                                </div>
                            </div>
                        </div>

                         {/* Option 3 */}
                        <div className="flex flex-col gap-2">
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="auth" id="conv-auth" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="conv-auth" className="text-gray-700 font-normal cursor-pointer text-xs">본인인증 이후 일반회원으로 전환</Label>
                            </div>
                            <div className="flex items-center gap-4 pl-6 flex-wrap">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="auth-sms" className="border-gray-300 rounded-[2px]" />
                                    <Label htmlFor="auth-sms" className="text-gray-600 font-normal cursor-pointer text-xs">동록된 휴대폰으로 인증번호 SMS수신</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="auth-email" className="border-gray-300 rounded-[2px]" />
                                    <Label htmlFor="auth-email" className="text-gray-600 font-normal cursor-pointer text-xs">동록된 이메일로 인증번호 수신</Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <Checkbox id="auth-ipin" className="border-gray-300 rounded-[2px]" />
                                    <Label htmlFor="auth-ipin" className="text-gray-600 font-normal cursor-pointer text-xs">아이핀본인인증</Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <Checkbox id="auth-mobile" className="border-gray-300 rounded-[2px]" />
                                    <Label htmlFor="auth-mobile" className="text-gray-600 font-normal cursor-pointer text-xs">휴대폰본인인증</Label>
                                </div>
                            </div>
                             <div className="pl-6 flex items-center gap-2">
                                <p className="text-[#888888] text-[11px] flex items-center gap-1">
                                    <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                                    <span>* SMS는 잔여포인트가 있어야 발송됩니다.</span>
                                </p>
                                <Button variant="secondary" className="h-5 px-2 text-[11px] bg-[#AAAAAA] border border-[#AAAAAA] text-white rounded-[2px] hover:bg-[#999999]">SMS포인트 충전하기</Button>
                            </div>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            {/* Grade Init */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex flex-col justify-center border-r border-gray-200 min-h-[80px]">
                    <span className="mb-1">회원등급 초기화 설정</span>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center gap-2">
                    <RadioGroup defaultValue="unused" className="flex flex-col gap-2">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="reset" id="grade-reset" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="grade-reset" className="text-gray-700 font-normal cursor-pointer text-xs">휴면회원 해제 시 기본회원으로 등급변경</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="unused" id="grade-unused" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="grade-unused" className="text-gray-700 font-normal cursor-pointer text-xs">사용안함</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            {/* Mileage Expiration */}
             <div className="flex">
                <div className="w-40 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[120px]">
                    마일리지 소멸 설정
                </div>
                <div className="flex-1 p-4">
                    <RadioGroup defaultValue="expire" className="flex flex-col gap-4">
                         {/* Option 1 */}
                         <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="expire" id="mileage-expire" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="mileage-expire" className="text-gray-700 font-normal cursor-pointer text-xs">휴면회원 해제 시 유효기간이 지난 마일리지 소멸</Label>
                            </div>
                            <div className="pl-6 text-[#888888] space-y-0.5">
                                 <p className="flex items-start gap-1">
                                     <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                                     <span>마일리지의 유효기간은 지급 당시의 <Link href="#" className="text-blue-500 underline hover:text-blue-600">회원 &gt; 마일리지 / 예치금관리 &gt; 마일리지 기본 설정</Link>을 따르며,</span>
                                 </p>
                                 <p className="pl-4">마일리지 소멸 시 자동안내(SMS, 이메일)는 방송되지 않습니다.</p>
                            </div>
                        </div>

                        {/* Option 2 */}
                         <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="reset-all" id="mileage-reset-all" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="mileage-reset-all" className="text-gray-700 font-normal cursor-pointer text-xs">휴면회원 전환 시 보유 마일리지 초기화</Label>
                            </div>
                             <p className="pl-6 text-red-500 flex items-start gap-1">
                                 <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                                 해당 설정 시 휴면회원의 마일리지 처리방침에 대한 별도 안내를 이용약관 및 공지사항 등을 통해 사전에 고지할 것을 권장합니다.
                            </p>
                        </div>
                    </RadioGroup>
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
          <div className="space-y-4">
              <div>
                  <h4 className="font-bold text-red-500 text-xs mb-1">휴면회원 마일리지 소멸 설정 시 유의사항</h4>
                  <ul className="list-none pl-1 space-y-1 text-gray-500">
                    <li className="flex items-start gap-1">
                        <span className="mt-1.5 w-0.5 h-0.5 bg-gray-400 rounded-full"></span>
                        마일리지는 공정거래위원회의 약관의 규제에 관한 법률에 따라 쇼핑몰의 이용약관상에 마일리지의 유효기간 또는 소멸 정책 등이 기재가 되어 있어야 합니다.
                    </li>
                    <li className="pl-2">
                        (마일리지 정책은 고객에게 지나치게 불리할 경우, 불공정약관으로 분리되어 규제대상이 될 수 있습니다.)
                    </li>
                    <li className="flex items-start gap-1">
                         <span className="mt-1.5 w-0.5 h-0.5 bg-gray-400 rounded-full"></span>
                        마일리지 관련 정책이 변경될 경우 최소 30일 전 변경사항을 홈페이지 공지사항 또는 이메일 등의 수단을 통해 사전에 고지하여야 합니다.
                    </li>
                    <li className="flex items-start gap-1">
                         <span className="mt-1.5 w-0.5 h-0.5 bg-gray-400 rounded-full"></span>
                        마일리지의 소멸과 관련하여 최소 30일 전부터 해당 회원에게 이메일 및 SMS 등을 통하여 마일리지의 내역 및 소멸 예정 일자를 통보하여야 합니다.
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
