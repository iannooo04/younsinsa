"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  Info,
  ChevronDown,
  Calendar as CalendarIcon
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";

export default function SmsSendPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">개별/전체 SMS 발송</h1>
        <Button className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
            SMS 발송
        </Button>
      </div>

      {/* SMS Sending Info Settings */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">SMS 발송 정보 설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Points */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    SMS 잔여 포인트
                </div>
                <div className="flex-1 p-4 flex items-center gap-2">
                   <span className="text-red-500 font-bold">0.0</span>
                   <span className="text-gray-600">포인트</span>
                   <Link href="/admin/sms/charge">
                       <Button variant="secondary" className="h-6 px-2 text-[11px] bg-[#AAAAAA] border border-[#AAAAAA] text-white rounded-[2px] hover:bg-[#999999] ml-1">SMS 포인트 충전하기</Button>
                   </Link>
                </div>
            </div>

            {/* Auth Number */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-start pt-6 border-r border-gray-200 min-h-[100px]">
                    <span className="text-red-500 mr-1">*</span> SMS 인증번호
                </div>
                <div className="flex-1 p-4">
                    <div className="flex items-center gap-2 mb-2">
                         <Input className="w-52 h-8 text-xs border-gray-300" />
                    </div>
                    <p className="text-red-500 text-[11px] flex items-center gap-1 mb-1">
                        <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span>무단으로 SMS 포인트가 사용되지 않도록 SMS 인증번호로 인증 후 발송할 수 있습니다.</span>
                    </p>
                     <p className="text-gray-500 text-[11px] flex items-center gap-1">
                        <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span>SMS 인증번호는 <Link href="#" className="underline text-blue-500">{"[마이페이지 > 쇼핑몰 관리]"}</Link> 에서 확인할 수 있습니다.</span>
                    </p>
                </div>
            </div>

             {/* Sender Number */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-start pt-6 border-r border-gray-200 min-h-[100px]">
                    <span className="text-red-500 mr-1">*</span> SMS 발신번호
                </div>
                <div className="flex-1 p-4">
                     <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500">등록된 SMS 발신번호가 없습니다.</span>
                        <Button variant="secondary" className="h-6 px-2 text-[11px] bg-[#AAAAAA] border border-[#AAAAAA] text-white rounded-[2px] hover:bg-[#999999]">발신번호 등록하기</Button>
                     </div>
                     <p className="text-gray-500 text-[11px] flex items-center gap-1 mb-1">
                        <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span>발신번호 사전등록제 : (전기통신사업법 제 84조의 2) 거짓으로 표시된 전화번호로 인한 이용자 피해 예방을 위해 사전 등록한 발신번호로만 SMS를 발송하실 수 있습니다. <Link href="#" className="underline text-blue-500">자세히보기 &gt;</Link></span>
                    </p>
                     <p className="text-red-500 text-[11px] flex items-center gap-1">
                        <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span>[SMS 설정]에 설정된 인증번호와 <Link href="#" className="underline text-red-500">{"[마이페이지 > 쇼핑몰 관리]"}</Link>에 설정된 인증번호가 일치해야 발신번호 정보가 정상 출력됩니다.</span>
                    </p>
                </div>
            </div>

            {/* Target Member Selection */}
            <div className="flex border-b border-gray-200">
                 <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-start pt-6 border-r border-gray-200 min-h-[140px]">
                    <span className="text-red-500 mr-1">*</span> 대상 회원 선택
                </div>
                <div className="flex-1 p-4">
                     <RadioGroup defaultValue="manual" className="flex items-center gap-6 mb-3">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="manual" id="target-manual" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="target-manual" className="text-gray-600 font-normal cursor-pointer text-xs">회원 직접 선택</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="grade" id="target-grade" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="target-grade" className="text-gray-600 font-normal cursor-pointer text-xs">회원 등급 선택</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="target-all" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="target-all" className="text-gray-600 font-normal cursor-pointer text-xs">전체 회원 발송</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="direct" id="target-direct" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="target-direct" className="text-gray-600 font-normal cursor-pointer text-xs">직접 입력</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="crm" id="target-crm" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="target-crm" className="text-gray-600 font-normal cursor-pointer text-xs">CRM 그룹 선택</Label>
                        </div>
                    </RadioGroup>
                    
                    <div className="bg-white">
                         <div className="flex items-center gap-2 mb-2">
                             <Button variant="outline" className="h-7 px-3 text-xs border-gray-300 text-gray-600 rounded-[2px] hover:bg-gray-50 bg-white">선택하기</Button>
                             <span className="text-xs text-gray-600">발송인원 총 <span className="text-red-500">0</span> 명 (<span className="text-red-500">수신거부 대상자 0 명 포함</span>)</span>
                         </div>
                         <div className="flex items-center gap-1.5 mb-2">
                             <Checkbox id="consent-only" className="border-red-500 data-[state=checked]:bg-red-500 text-white rounded-[2px] w-3.5 h-3.5" checked />
                             <Label htmlFor="consent-only" className="text-gray-800 font-bold cursor-pointer text-xs">수신동의한 회원에게만 발송</Label>
                         </div>
                         <p className="text-gray-500 text-[11px] flex items-center gap-1 mb-1">
                            <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                            <span>정보통신망법에 따라 수신거부한 회원에게는 광고성정보를 발송할 수 없으며, 위반시 과태료가 부과됩니다.</span>
                        </p>
                         <p className="text-gray-500 text-[11px] flex items-center gap-1">
                            <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                            <span>해외몰 회원에게는 SMS 발송이 제한되며, 국내몰 회원만 검색이 가능합니다.</span>
                        </p>
                    </div>
                </div>
            </div>

             {/* Sending Settings */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    발송 설정
                </div>
                <div className="flex-1 p-4 flex items-center gap-6">
                     <div className="flex items-center gap-1.5">
                         <RadioGroup defaultValue="instant" className="flex items-center gap-0">
                            <RadioGroupItem value="instant" id="send-instant" className="border-red-500 text-red-500 focus:ring-red-500" />
                         </RadioGroup>
                        <Label htmlFor="send-instant" className="text-gray-800 font-normal cursor-pointer text-xs">즉시 발송</Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <RadioGroup defaultValue="instant" className="flex items-center gap-0">
                            <RadioGroupItem value="scheduled" id="send-scheduled" className="border-gray-300 text-gray-600" />
                        </RadioGroup>
                        <Label htmlFor="send-scheduled" className="text-gray-600 font-normal cursor-pointer text-xs">예약 발송</Label>
                        <div className="flex items-center ml-1">
                             <Input className="w-32 h-7 text-xs border-gray-300 bg-gray-100 text-gray-400" placeholder="예약 일자 선택" disabled />
                             <span className="text-gray-600 ml-2">부터 순차 발송</span>
                        </div>
                    </div>
                </div>
            </div>
            
             {/* Advertising Message */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[60px]">
                    광고성 문자
                </div>
                <div className="flex-1 p-4">
                     <div className="flex items-center gap-1.5 mb-1.5">
                        <Checkbox id="ad-msg" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                        <Label htmlFor="ad-msg" className="text-gray-600 font-normal cursor-pointer text-xs">광고성 문구 추가</Label>
                     </div>
                     <p className="text-gray-500 text-[11px] flex items-center gap-1">
                        <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span>광고성 문구를 추가하려면 <Link href="#" className="text-blue-500 underline">{"{080 수신거부 사용신청}"}</Link>을 먼저 해주시기 바랍니다.</span>
                    </p>
                </div>
            </div>
            
             {/* Input Message Content */}
             <div className="flex border-b border-gray-200">
                 <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-start pt-6 border-r border-gray-200 min-h-[300px]">
                    <span className="text-red-500 mr-1">*</span> 발송 내용 입력
                </div>
                <div className="flex-1 p-4">
                     <div className="flex items-center justify-between w-[320px] mb-2">
                         <div className="flex items-center gap-1 text-[11px] text-gray-600">
                             <span className="bg-[#555555] text-white px-1 py-0.5 rounded-[2px] text-[10px]">!</span> SMS : 건당 1포인트 차감
                         </div>
                         <Button variant="outline" className="h-6 px-2 text-[11px] border-gray-300 text-gray-600 rounded-[2px] bg-white hover:bg-gray-50">치환코드 보기</Button>
                     </div>
                     
                     <div className="w-[320px] mb-2">
                        <textarea className="w-full h-48 border border-gray-300 rounded-[2px] p-2 text-sm resize-none" />
                        <div className="bg-[#F5F5F5] border border-t-0 border-gray-300 h-8 flex items-center px-2">
                              <Input className="w-10 h-5 text-xs border-None bg-transparent text-right p-0 mr-1" value="0" readOnly /> / 90 Bytes
                        </div>
                     </div>
                     
                      <p className="text-gray-500 text-[11px] flex items-center gap-1 mb-1">
                        <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span>URL 삽입 시 플러스샵 <Link href="#" className="text-gray-500 underline">{"{단축 URL}"}</Link> 앱을 이용하시면 짧고 간단하게 URL을 사용하실 수 있습니다. <Link href="#" className="text-blue-500 underline">바로가기</Link></span>
                    </p>
                      <div className="text-gray-500 text-[11px] flex items-start gap-1 pb-1">
                        <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                        <div className="leading-tight">
                            <span>치환코드 사용 시 LMS로 발송될 수 있으며 일부 문자가 포인트 부족으로 발송되지 않을 수 있습니다.</span><br/>
                            <span>- 포인트 충전 후 <Link href="#" className="text-blue-500 underline">SMS 발송 내역 보기</Link>에서 재발송하실 수 있습니다.</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-4">
                         <div className="relative">
                            <Button variant="outline" className="h-8 pl-3 pr-2 text-xs border-gray-300 text-gray-700 rounded-[2px] bg-white hover:bg-gray-50 flex items-center gap-1">
                                발송 내용 관리 <ChevronDown className="w-3 h-3" />
                            </Button>
                         </div>
                         <Button variant="outline" className="h-8 px-3 text-xs border-red-500 text-red-500 rounded-[2px] bg-white hover:bg-red-50 font-bold flex items-center gap-1">
                            <span className="text-lg leading-none pb-0.5">+</span> 현재 내용 저장
                        </Button>
                    </div>
                </div>
            </div>

        </div>
      </div>

       <hr className="border-gray-200 my-8" />

      {/* Guide Info */}
       <div className="text-gray-600 text-xs">
          <h3 className="font-bold flex items-center gap-1 mb-6 text-blue-500 text-[13px]">
              <Info className="w-4 h-4" /> 안내
          </h3>
          <div className="space-y-6">
              <div>
                  <h4 className="font-bold text-gray-700 text-xs mb-2">[대상회원 선택]SMS는 누구에게 발송할 수 있나요?</h4>
                   <ul className="list-none space-y-2 text-gray-500 pl-1">
                    <li>· 필수정보 안내 목적의 "주문접수 안내"와 같은 SMS는 수신동의 없이 보낼 수 있지만 <span className="text-red-500 font-bold">영리 목적의 광고성 정보 발송 시에는반드시 수신동의한 회원에게만 발송</span>해야 합니다.</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold text-gray-700 text-xs mb-2">[영리 목적의 광고성 정보]영리 목적의 광고성 정보는 어떻게 발송해야 하나요?</h4>
                   <ul className="list-none space-y-2 text-gray-500 pl-1">
                    <li>· 반드시 수신동의를 받은 회원에게만 발송해야 합니다.</li>
                    <li>· 오후 9시부터 그 다음 날 오전 8시에는 별도의 사전동의를 받은 경우가 아니면 발송해서는 안됩니다.</li>
                     <li>· SMS내용에 전송자의 명칭/연락처/수신거부기능(수신거부방법과 수신자가 비용부담하지 않는다는 내용(예시) 무료수신거부 080-000-0000))이 포함되어야 합니다.</li>
                     <li className="mt-4">· SMS내용 시작 부분에 (광고)를 명시해야 합니다.</li>
                     <li>· 위 내용을 위반하는 경우 3천만원 이하의 과태료가 부과됩니다.</li>
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
