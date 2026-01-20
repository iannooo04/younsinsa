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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@/i18n/routing";

export default function SmsSettingsPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">SMS 설정</h1>
        <Button className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
            설정 저장
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
                       <Button className="h-6 px-2 text-[11px] bg-[#999999] border border-[#999999] text-white rounded-[2px] hover:bg-[#888888] ml-1">SMS 포인트 충전하기</Button>
                   </Link>
                </div>
            </div>

            {/* Auth Number */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[100px]">
                    SMS 인증번호
                </div>
                <div className="flex-1 p-4">
                    <div className="flex items-center gap-2 mb-2">
                         <div className="bg-gray-100 border border-gray-300 px-3 text-gray-500 tracking-widest rounded-[2px] w-48 text-center text-base h-7 flex items-center justify-center whitespace-nowrap">
                             * * * * * * * * * * *
                         </div>
                         <Button className="h-7 px-3 text-[11px] bg-[#999999] border border-[#999999] text-white rounded-[2px] hover:bg-[#888888]">SMS 인증번호 변경하기</Button>
                    </div>
                    <p className="text-red-500 text-[11px] flex items-center gap-1 mb-1">
                        <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span><Link href="#" className="underline">{"[마이페이지 > 쇼핑몰 관리]"}</Link> 에서 SMS 인증번호를 확인 및 변경할 수 있습니다.</span>
                    </p>
                     <p className="text-red-500 text-[11px] flex items-center gap-1">
                        <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span>반드시 <Link href="#" className="underline">{"[마이페이지 > 쇼핑몰 관리]"}</Link>에 설정된 SMS 인증번호와 동일한 번호로 설정하셔야만, SMS가 발송됩니다. (자동 SMS 포함, 다른 SMS 서비스 모두 해당됨)</span>
                    </p>
                </div>
            </div>

             {/* Sender Number */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[100px]">
                    SMS 발신번호
                </div>
                <div className="flex-1 p-4">
                     <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500 font-bold">등록된 SMS 발신번호가 없습니다.</span>
                        <Button className="h-7 px-3 text-[11px] bg-[#999999] border border-[#999999] text-white rounded-[2px] hover:bg-[#888888]">발신번호 등록하기</Button>
                     </div>
                     <p className="text-gray-500 text-[11px] flex items-center gap-1 mb-1">
                        <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span>발신번호 사전등록제 : (전기통신사업법 제 84조의 2) 거짓으로 표시된 전화번호로 인한 이용자 피해 예방을 위해 사전 등록한 발신번호로만 SMS를 발송하실 수 있습니다. <b>자세히보기 &gt;</b></span>
                    </p>
                     <p className="text-red-500 text-[11px] flex items-center gap-1">
                        <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span>[SMS 설정]에 설정된 인증번호와 <Link href="#" className="underline">{"[마이페이지 > 쇼핑몰 관리]"}</Link>에 설정된 인증번호가 일치해야 발신번호 정보가 정상 출력됩니다.</span>
                    </p>
                </div>
            </div>

            {/* Message Method */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex flex-col justify-center border-r border-gray-200 min-h-[80px]">
                    <span>90 Byte 초과시</span>
                    <span>메시지 전송 방법</span>
                </div>
                <div className="flex-1 p-4">
                     <RadioGroup defaultValue="90byte" className="flex items-center gap-6 mb-2">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="90byte" id="method-90byte" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="method-90byte" className="text-gray-600 font-normal cursor-pointer text-xs">90byte 까지만 SMS 발송</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="split" id="method-split" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="method-split" className="text-gray-600 font-normal cursor-pointer text-xs">분할 SMS 발송</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="lms" id="method-lms" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="method-lms" className="text-gray-600 font-normal cursor-pointer text-xs">LMS 발송</Label>
                        </div>
                    </RadioGroup>
                    <p className="text-gray-500 text-[11px] flex items-start gap-1">
                        <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                        <span className="text-[#888888]">자동발송 문구가 쇼핑몰명, 주문번호 등으로 인하여 90Byte를 초과할 경우의 메시지 전송 방법 입니다.<br />'90Byte 까지만 SMS 발송'으로 설정할 경우 90Byte 초과시 메시지가 짤릴 수 있습니다.</span>
                    </p>
                </div>
            </div>

            {/* 080 Unsubscribe */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    080 수신거부 번호
                </div>
                <div className="flex-1 p-4">
                     <p className="mb-1 text-xs"><Link href="#" className="text-blue-500 underline font-bold">{"{080 수신거부 사용신청}"}</Link>을 먼저 해주시기 바랍니다.</p>
                     <p className="text-red-500 text-[11px] flex items-center gap-1">
                        <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span>광고성 문자의 경우 메시지가 시작되는 부분에 (광고) 표시, 메시지가 끝나는 부분에 무료수신거부가 포함되어야 합니다.</span>
                    </p>
                </div>
            </div>

        </div>
      </div>
      
       {/* SMS Condition / Message Settings */}
       <div className="mb-0">
          <div className="flex items-center gap-2 mb-2">
             <h2 className="font-bold text-base text-gray-800">SMS 발송 조건 / 문구 설정</h2>
             <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>

          <Tabs defaultValue="order" className="w-full">
                <TabsList className="bg-transparent p-0 justify-start gap-0 h-9 mb-0 w-full rounded-none border-b border-gray-300">
                     <TabsTrigger 
                        value="order" 
                        className="rounded-none border-t border-l border-r border-gray-300 bg-white data-[state=active]:bg-white data-[state=active]:border-gray-800 data-[state=active]:border-b-white data-[state=active]:text-gray-900 font-bold text-xs relative top-[1px] h-9 px-6 text-gray-600"
                    >
                        주문배송관련
                    </TabsTrigger>
                     <TabsTrigger 
                        value="member" 
                        className="rounded-none border-t border-r border-gray-300 bg-[#F9F9F9] data-[state=active]:bg-white data-[state=active]:border-gray-800 data-[state=active]:border-l data-[state=active]:border-b-white data-[state=active]:text-gray-900 font-normal text-xs relative top-[1px] h-9 px-6 text-gray-500"
                    >
                        회원관련
                    </TabsTrigger>
                    <TabsTrigger 
                        value="coupon" 
                        className="rounded-none border-t border-r border-gray-300 bg-[#F9F9F9] data-[state=active]:bg-white data-[state=active]:border-gray-800 data-[state=active]:border-l data-[state=active]:border-b-white data-[state=active]:text-gray-900 font-normal text-xs relative top-[1px] h-9 px-6 text-gray-500"
                    >
                        쿠폰/프로모션관련
                    </TabsTrigger>
                     <TabsTrigger 
                        value="post" 
                        className="rounded-none border-t border-r border-gray-300 bg-[#F9F9F9] data-[state=active]:bg-white data-[state=active]:border-gray-800 data-[state=active]:border-l data-[state=active]:border-b-white data-[state=active]:text-gray-900 font-normal text-xs relative top-[1px] h-9 px-6 text-gray-500"
                    >
                        게시물등록 알림
                    </TabsTrigger>
                </TabsList>
                
                {/* Order Tab Content */}
                <TabsContent value="order" className="mt-0">
                    <div className="border border-t-0 border-gray-300 bg-white">
                    <table className="w-full text-xs text-center border-collapse">
                        <thead className="bg-[#F8F9FA] text-gray-700 font-bold border-b border-gray-200">
                            <tr>
                                <th className="py-3 border-r border-gray-200 w-64" rowSpan={2}>발송항목</th>
                                <th className="py-3 border-r border-gray-200 w-48" rowSpan={2}>발송종류</th>
                                <th className="py-2 border-b border-gray-200" colSpan={3}>발송대상 및 SMS 문구설정</th>
                            </tr>
                            <tr>
                                <th className="py-2 border-r border-gray-200 w-1/3">회원</th>
                                <th className="py-2 border-r border-gray-200 w-1/3">본사 운영자</th>
                                <th className="py-2 w-1/3">공급사 운영자</th>
                            </tr>
                        </thead>
                       <tbody className="divide-y divide-gray-200">
                           {/* Row 1: Order Receipt */}
                           <tr>
                               <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                   주문접수
                                   <div className="font-normal text-gray-400 mt-1 text-[11px] leading-tight flex justify-center items-center gap-1 whitespace-nowrap">
                                      <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] flex-shrink-0">!</span>
                                      <span>(무통장 입금 주문 건의 주문접수 시)</span>
                                   </div>
                               </td>
                               <td className="p-4 border-r border-gray-200"></td>
                               <td className="p-4 border-r border-gray-200 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="order-member-chk" className="border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 rounded-[2px] w-3.5 h-3.5" checked />
                                       <Label htmlFor="order-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{orderName}님의
{orderNo} 주문이 접수되었습니다. 감사합니다.`} />
                               </td>
                               <td className="p-4 border-r border-gray-200 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="order-hq-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                       <Label htmlFor="order-hq-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{orderName}님의
{orderNo} 주문이 접수되었습니다.`}/>
                               </td>
                               <td className="p-4 text-center align-middle text-red-500 font-bold">
                                   회원 전용
                               </td>
                           </tr>

                           {/* Row 2: Deposit Confirm */}
                           <tr>
                               <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                   입금확인
                                    <div className="font-normal text-gray-400 mt-1 text-[11px] leading-tight flex justify-center items-center gap-1 whitespace-nowrap">
                                      <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] flex-shrink-0">!</span>
                                      <span>(무통장 입금 주문 건의 입금확인 및 카드결제 시)</span>
                                   </div>
                               </td>
                               <td className="p-4 border-r border-gray-200">
                                   <div className="flex items-center justify-center gap-1 text-gray-600">
                                       최근 <Select defaultValue="15"><SelectTrigger className="w-14 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="15">15일</SelectItem></SelectContent></Select> 주문건만 발송
                                   </div>
                               </td>
                               <td className="p-4 border-r border-gray-200 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="deposit-member-chk" className="border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 rounded-[2px] w-3.5 h-3.5" checked />
                                       <Label htmlFor="deposit-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{orderName}님의
{orderNo} 주문이 결제완료 되었습니다. 감사합니다.`}/>
                               </td>
                               <td className="p-4 border-r border-gray-200 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="deposit-hq-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                       <Label htmlFor="deposit-hq-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`관리자
{orderName}님의
{orderNo} 주문이 결제완료 되었습니다.`}/>
                               </td>
                               <td className="p-4 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="deposit-sup-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                       <Label htmlFor="deposit-sup-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`공급사
{orderName}님의
{orderNo} 주문이 결제완료 되었습니다.`}/>
                               </td>
                           </tr>

                           {/* Row 3: Deposit Request */}
                            <tr>
                               <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                   입금요청
                                    <div className="font-normal text-gray-400 mt-1 text-[11px] leading-tight flex justify-center items-center gap-1 whitespace-nowrap">
                                      <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] flex-shrink-0">!</span>
                                      <span>(무통장 입금 주문 건의 주문접수 시)</span>
                                   </div>
                               </td>
                               <td className="p-4 border-r border-gray-200 text-center">
                                   <div className="flex items-center justify-center gap-1 text-gray-600 mb-2">
                                       최근 <Select defaultValue="3"><SelectTrigger className="w-12 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="3">3일</SelectItem></SelectContent></Select> 주문건만 발송
                                   </div>
                                   <div className="h-px bg-gray-200 my-2 w-full"></div>
                                   <div className="flex items-center justify-center gap-1 text-gray-600 mt-2">
                                       <Checkbox className="border-gray-300 w-3.5 h-3.5 mr-1" /> 주문 <Select defaultValue="3"><SelectTrigger className="w-12 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="3">3일</SelectItem></SelectContent></Select> 후
                                   </div>
                                   <div className="flex items-center justify-center gap-1 text-gray-600 mt-1">
                                        <Select defaultValue="10"><SelectTrigger className="w-14 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="10">10시</SelectItem></SelectContent></Select> 재발송
                                   </div>
                               </td>
                               <td className="p-4 border-r border-gray-200 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="req-member-chk" className="border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 rounded-[2px] w-3.5 h-3.5" checked />
                                       <Label htmlFor="req-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <div className="relative">
                                    <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{orderName}님,
{settlePrice}원 {account}로 입금부탁드립니다`}/>
                                        <div className="absolute right-[-80px] top-8 bg-gray-200 text-xs px-2 py-1 rounded text-gray-600 border border-gray-300 shadow-sm">
                                            자동발송시 체크
                                            <div className="absolute left-[-5px] top-2 w-2 h-2 bg-gray-200 rotate-45 border-l border-b border-gray-300"></div>
                                        </div>
                                   </div>
                               </td>
                               <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500">
                                   회원 전용
                               </td>
                               <td className="p-4 text-center align-middle text-red-500">
                                   회원 전용
                               </td>
                           </tr>

                           {/* Row 4: Delivery Guide */}
                           <tr>
                               <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                   상품배송 안내
                                    <div className="font-normal text-gray-400 mt-1 text-[11px] leading-tight flex justify-center items-center gap-1 whitespace-nowrap">
                                      <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] flex-shrink-0">!</span>
                                      <span>(배송중으로 배송상태 변경 시)</span>
                                   </div>
                               </td>
                               <td className="p-4 border-r border-gray-200">
                                   <div className="flex items-center justify-center gap-1 text-gray-600 mb-2">
                                       최근 <Select defaultValue="15"><SelectTrigger className="w-14 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="15">15일</SelectItem></SelectContent></Select> 주문건만 발송
                                   </div>
                                   <div className="h-px bg-gray-200 my-2 w-full"></div>
                                   <div className="flex items-center justify-center gap-1 text-gray-600 mt-2">
                                       <Checkbox className="border-gray-300 w-3.5 h-3.5 mr-1" /> 야간시간에도 발송
                                   </div>
                                    <div className="text-[10px] text-gray-400 mt-1 flex items-start justify-center gap-1">
                                       <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                                       (정보통신망법에 의해 08:00 ~ 21:00 에만 발송)
                                   </div>
                                   <div className="mt-2">
                                       <Select defaultValue="once"><SelectTrigger className="w-full h-7 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="once">주문번호 기준 1회만 발송</SelectItem></SelectContent></Select>
                                   </div>
                               </td>
                               <td className="p-4 border-r border-gray-200 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="del-member-chk" className="border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 rounded-[2px] w-3.5 h-3.5" checked />
                                       <Label htmlFor="del-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <textarea className="w-full h-20 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{orderName}님의 주문상품이 배송되었습니다!`} />
                               </td>
                               <td className="p-4 border-r border-gray-200 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="del-hq-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                       <Label htmlFor="del-hq-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <textarea className="w-full h-20 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{orderName}님의 주문상품이 배송되었습니다!`} />
                               </td>
                               <td className="p-4 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="del-sup-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                       <Label htmlFor="del-sup-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <textarea className="w-full h-20 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{orderName}님의 주문상품이 배송되었습니다!`} />
                               </td>
                           </tr>

                             {/* Row 5: Invoice Guide */}
                           <tr>
                               <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                   송장번호 안내
                                    <div className="font-normal text-gray-400 mt-1 text-[11px] leading-tight flex justify-center items-center gap-1 whitespace-nowrap">
                                      <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] flex-shrink-0">!</span>
                                      <span>(배송중으로 배송상태 변경 시)</span>
                                   </div>
                               </td>
                               <td className="p-4 border-r border-gray-200">
                                   <div className="flex items-center justify-center gap-1 text-gray-600 mb-2">
                                       최근 <Select defaultValue="15"><SelectTrigger className="w-14 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="15">15일</SelectItem></SelectContent></Select> 주문건만 발송
                                   </div>
                                   <div className="h-px bg-gray-200 my-2 w-full"></div>
                                   <div className="flex items-center justify-center gap-1 text-gray-600 mt-2">
                                       <Checkbox className="border-gray-300 w-3.5 h-3.5 mr-1" /> 야간시간에도 발송
                                   </div>
                                    <div className="text-[10px] text-gray-400 mt-1 flex items-start justify-center gap-1">
                                       <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                                       (정보통신망법에 의해 08:00 ~ 21:00 에만 발송)
                                   </div>
                                   <div className="mt-2">
                                       <Select defaultValue="once"><SelectTrigger className="w-full h-7 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="once">주문번호 기준 1회만 발송</SelectItem></SelectContent></Select>
                                   </div>
                               </td>
                               <td className="p-4 border-r border-gray-200 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="inv-member-chk" className="border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 rounded-[2px] w-3.5 h-3.5" checked />
                                       <Label htmlFor="inv-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <textarea className="w-full h-20 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{orderName}님 주문하신 상품이
{deliveryName}/{invoiceNo}로 발송되었습니다`} />
                               </td>
                               <td className="p-4 border-r border-gray-200 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="inv-hq-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                       <Label htmlFor="inv-hq-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <textarea className="w-full h-20 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{orderNo} 주문이
{deliveryName}/{invoiceNo}로 발송되었습니다`} />
                               </td>
                               <td className="p-4 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="inv-sup-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                       <Label htmlFor="inv-sup-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <textarea className="w-full h-20 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{orderNo} 주문이
{deliveryName}/{invoiceNo}로 발송되었습니다`} />
                               </td>
                           </tr>

                           {/* Row 9: Out of Stock */}
                            <tr>
                               <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                   상품품절
                                    <div className="font-normal text-gray-400 mt-1 text-[11px] leading-tight flex justify-center items-center gap-1 whitespace-nowrap">
                                      <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] flex-shrink-0">!</span>
                                      <span>(회원주문으로 인해 상품품절 시)</span>
                                   </div>
                               </td>
                               <td className="p-4 border-r border-gray-200">
                                   
                               </td>
                               <td className="p-4 border-r border-gray-200 text-center align-middle text-blue-500">
                                   운영자 전용
                               </td>
                               <td className="p-4 border-r border-gray-200 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="soldout-hq-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                       <Label htmlFor="soldout-hq-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <textarea className="w-full h-20 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{goodsNm}이
{orderName}님 주문에 의해 품절되었습니다`} />
                               </td>
                               <td className="p-4 text-left align-top">
                                   <div className="flex items-center gap-1.5 mb-2">
                                       <Checkbox id="soldout-sup-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                       <Label htmlFor="soldout-sup-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                   </div>
                                   <textarea className="w-full h-20 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{goodsNm}이
{orderName}님 주문에 의해 품절되었습니다`} />
                               </td>
                           </tr>
                       </tbody>
                    </table>
                </div>
                </TabsContent>

                {/* Member Tab Content */}
                <TabsContent value="member" className="mt-0">
                    <div className="border border-t-0 border-gray-300 bg-white">
                        <table className="w-full text-xs text-center border-collapse">
                            <thead className="bg-[#F8F9FA] text-gray-700 font-bold border-b border-gray-200">
                                <tr>
                                    <th className="py-3 border-r border-gray-200 w-64" rowSpan={2}>발송항목</th>
                                    <th className="py-3 border-r border-gray-200 w-48" rowSpan={2}>발송종류</th>
                                    <th className="py-2 border-b border-gray-200" colSpan={3}>발송대상 및 SMS 문구설정</th>
                                </tr>
                                <tr>
                                    <th className="py-2 border-r border-gray-200 w-1/3">회원</th>
                                    <th className="py-2 border-r border-gray-200 w-1/3">본사 운영자</th>
                                    <th className="py-2 w-1/3">공급사 운영자</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {/* 회원가입 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                        회원가입
                                        <div className="font-normal text-gray-400 mt-1 text-[11px] leading-tight flex justify-center items-center gap-1 whitespace-nowrap">
                                            <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] flex-shrink-0">!</span>
                                            <span>(회원가입 시 발송)</span>
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center">
                                        <div className="flex items-center justify-center gap-1 text-gray-600">
                                            <Checkbox id="member-sign-incl" className="border-gray-300 w-3.5 h-3.5 mr-1" />
                                            <Label htmlFor="member-sign-incl" className="text-gray-600 text-[11px] cursor-pointer">승인대기 회원포함</Label>
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="signup-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="signup-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{name} 회원님의 가입을 진심으로 축하드립니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="signup-hq-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="signup-hq-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{name}회원님이 회원가입 하셨습니다!`} />
                                    </td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 가입승인 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                        가입승인
                                        <div className="font-normal text-gray-400 mt-1 text-[11px] leading-tight flex justify-center items-center gap-1 whitespace-nowrap">
                                            <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] flex-shrink-0">!</span>
                                            <span>(가입승인 완료 시 발송)</span>
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200"></td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="approv-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="approv-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{name} 회원님의 가입이 승인되었습니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 비밀번호 찾기 인증번호 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                        비밀번호 찾기 인증번호
                                        <div className="font-normal text-gray-400 mt-1 text-[11px] leading-tight flex justify-center items-center gap-1 whitespace-nowrap">
                                            <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] flex-shrink-0">!</span>
                                            <span>(비밀번호 찾기 요청 시 발송)</span>
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200"></td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="pwd-member-chk" className="border-red-500 data-[state=checked]:bg-red-500 rounded-[2px] w-3.5 h-3.5" checked />
                                            <Label htmlFor="pwd-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
회원님의 인증번호는 {[rc_certificationCode]}입니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 휴면회원 전환 사전안내 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">휴면회원 전환 사전안내</td>
                                    <td className="p-4 border-r border-gray-200 text-center">
                                        <div className="flex items-center justify-center gap-1 text-gray-600">
                                            <Select defaultValue="10"><SelectTrigger className="w-14 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="10">10시</SelectItem></SelectContent></Select> 발송
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="dormant-pre-member-chk" className="border-red-500 data-[state=checked]:bg-red-500 rounded-[2px] w-3.5 h-3.5" checked />
                                            <Label htmlFor="dormant-pre-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{name}님이 {rc_sleepScheduleDt}에 휴면회원 전환예정입니다.(로...`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 휴면회원 전환 안내 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">휴면회원 전환 안내</td>
                                    <td className="p-4 border-r border-gray-200 text-center">
                                        <div className="flex items-center justify-center gap-1 text-gray-600">
                                            <Select defaultValue="10"><SelectTrigger className="w-14 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="10">10시</SelectItem></SelectContent></Select> 발송
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="dormant-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="dormant-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{name}님이 {rc_sleepScheduleDt}에 휴면회원 전환되었습니다.(로...`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 휴면회원 해제 인증번호 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">휴면회원 해제 인증번호</td>
                                    <td className="p-4 border-r border-gray-200"></td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="dormant-rel-member-chk" className="border-red-500 data-[state=checked]:bg-red-500 rounded-[2px] w-3.5 h-3.5" checked />
                                            <Label htmlFor="dormant-rel-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
휴면회원해제를 위한 인증번호는 {[rc_certificationCode]}입...`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 일반회원 전환 안내 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                        일반회원 전환 안내
                                        <div className="font-normal text-gray-400 mt-1 text-[11px] leading-tight flex justify-center items-center gap-1 whitespace-nowrap">
                                            <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] flex-shrink-0">!</span>
                                            <span>(휴면회원 해제 시 발송)</span>
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200"></td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="general-rel-member-chk" className="border-red-500 data-[state=checked]:bg-red-500 rounded-[2px] w-3.5 h-3.5" checked />
                                            <Label htmlFor="general-rel-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{memNm}님의 계정이 {rc_scheduleDt}에 일반회원으로 전환 되었습니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 수신동의여부확인 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">수신동의여부확인</td>
                                    <td className="p-4 border-r border-gray-200 text-center">
                                        <div className="mb-2">
                                            <Link href="#" className="text-blue-500 text-[10px] leading-none block mb-1">수신동의여부 안내메일<br/>발송불가 회원 대상</Link>
                                            <div className="h-px bg-gray-200 my-1 w-full scale-x-50 mx-auto"></div>
                                        </div>
                                        <div className="flex items-center justify-center gap-1 text-gray-600">
                                            <Select defaultValue="8"><SelectTrigger className="w-14 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="8">8시</SelectItem></SelectContent></Select> 발송
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="agreemt-member-chk" className="border-red-500 data-[state=checked]:bg-red-500 rounded-[2px] w-3.5 h-3.5" checked />
                                            <Label htmlFor="agreemt-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{smsAgreementDt}에 광고수신에 동의/ 수신동의 철회 : 마이페이지에서 변...`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 회원등급 변경안내 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">회원등급 변경안내</td>
                                    <td className="p-4 border-r border-gray-200 text-center">
                                        <div className="flex items-center justify-center gap-1 text-gray-600">
                                            <Select defaultValue="8"><SelectTrigger className="w-14 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="8">8시</SelectItem></SelectContent></Select> 발송
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="grade-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="grade-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{name}님의 회원등급이 {rc_groupNm}으로 변경되었습니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 마일리지 지급안내 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">마일리지 지급안내</td>
                                    <td className="p-4 border-r border-gray-200"></td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="mil-plus-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="mil-plus-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{name}님께 마일리지 {rc_mileage}원이 지급되었습니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 마일리지 차감안내 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">마일리지 차감안내</td>
                                    <td className="p-4 border-r border-gray-200"></td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="mil-minus-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="mil-minus-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{name}님께 마일리지 {rc_mileage}원이 차감되었습니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 마일리지 소멸안내 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">마일리지 소멸안내</td>
                                    <td className="p-4 border-r border-gray-200 text-center">
                                        <div className="flex items-center justify-center gap-1 text-gray-600">
                                            <Select defaultValue="9"><SelectTrigger className="w-14 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="9">9시</SelectItem></SelectContent></Select> 발송
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="mil-del-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="mil-del-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{rc_deleteScheduleDt}에 소멸될 마일리지는 {rc_mileage}원입니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 예치금 지급안내 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">예치금 지급안내</td>
                                    <td className="p-4 border-r border-gray-200"></td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="dep-plus-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="dep-plus-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{name}님께 예치금 {rc_deposit}원이 지급되었습니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 예치금 차감안내 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">예치금 차감안내</td>
                                    <td className="p-4 border-r border-gray-200"></td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="dep-minus-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="dep-minus-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{name}님께 예치금 {rc_deposit}원이 차감되었습니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </TabsContent>

                {/* Post Tab Content */}
                <TabsContent value="post" className="mt-0">
                    <div className="border border-t-0 border-gray-300 bg-white">
                        <table className="w-full text-xs text-center border-collapse">
                            <thead className="bg-[#F8F9FA] text-gray-700 font-bold border-b border-gray-200">
                                <tr>
                                    <th className="py-3 border-r border-gray-200 w-64" rowSpan={2}>발송항목</th>
                                    <th className="py-3 border-r border-gray-200 w-64" rowSpan={2}>발송종류</th>
                                    <th className="py-2 border-b border-gray-200" colSpan={3}>발송대상 및 SMS 문구설정</th>
                                </tr>
                                <tr>
                                    <th className="py-2 border-r border-gray-200 w-1/3">회원</th>
                                    <th className="py-2 border-r border-gray-200 w-1/3">본사 운영자</th>
                                    <th className="py-2 w-1/3">공급사 운영자</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {/* 상품후기 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                        상품후기
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center">
                                         <div className="flex items-center justify-center gap-1 text-gray-600 mb-2 whitespace-nowrap">
                                            <Checkbox id="review-night-chk" className="border-gray-300 w-3.5 h-3.5 mr-1" />
                                            <Label htmlFor="review-night-chk" className="text-gray-600 font-bold cursor-pointer text-xs whitespace-nowrap">야간시간에도 발송</Label>
                                         </div>
                                         <div className="text-[10px] text-gray-400 mt-1 flex items-center justify-center gap-1 whitespace-nowrap">
                                            <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] flex-shrink-0">!</span>
                                            <span>(정보통신망법에 의해 08:00 ~ 21:00 에만 발송)</span>
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="review-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="review-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[shopName]}
{rc_mallNm}님의 상품후기에 답변이 등록되었습니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="review-hq-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="review-hq-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`상품후기게시판에
{rc_mallNm}님이 새로운
글을 등록했습니다.`} />
                                    </td>
                                    <td className="p-4 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="review-sup-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="review-sup-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[shopName]}
공급 상품후기게시판에
{rc_mallNm}님이 새로운 글...`} />
                                    </td>
                                </tr>

                                {/* 상품문의 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                        상품문의
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center">
                                         <div className="flex items-center justify-center gap-1 text-gray-600 mb-2">
                                            <Checkbox id="inquiry-night-chk" className="border-gray-300 w-3.5 h-3.5 mr-1" />
                                            <Label htmlFor="inquiry-night-chk" className="text-gray-600 font-bold cursor-pointer text-xs">야간시간에도 발송</Label>
                                         </div>
                                         <div className="text-[10px] text-gray-400 mt-1 flex items-start justify-center gap-1">
                                            <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5 flex-shrink-0">!</span>
                                            <span>(정보통신망법에 의해 08:00<br />~ 21:00 에만 발송)</span>
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="inquiry-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="inquiry-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[shopName]}
{rc_mallNm}님의 상품문의에 답변이 등록되었습니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="inquiry-hq-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="inquiry-hq-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`상품문의게시판에
{rc_mallNm}님이 새로운
글을 등록했습니다.`} />
                                    </td>
                                    <td className="p-4 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="inquiry-sup-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="inquiry-sup-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[shopName]}
공급 상품문의게시판에
{rc_mallNm}님이 새로운 글...`} />
                                    </td>
                                </tr>

                                {/* 1:1문의 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                        1:1문의
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center">
                                         <div className="flex items-center justify-center gap-1 text-gray-600 mb-2">
                                            <Checkbox id="direct-night-chk" className="border-gray-300 w-3.5 h-3.5 mr-1" />
                                            <Label htmlFor="direct-night-chk" className="text-gray-600 font-bold cursor-pointer text-xs">야간시간에도 발송</Label>
                                         </div>
                                         <div className="text-[10px] text-gray-400 mt-1 flex items-start justify-center gap-1">
                                            <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5 flex-shrink-0">!</span>
                                            <span>(정보통신망법에 의해 08:00<br />~ 21:00 에만 발송)</span>
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="direct-member-chk" className="border-red-500 data-[state=checked]:bg-red-500 rounded-[2px] w-3.5 h-3.5" checked />
                                            <Label htmlFor="direct-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[shopName]}
{rc_mallNm}님의 1:1문의에 답변이 등록되었습니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="direct-hq-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="direct-hq-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`1:1문의게시판에
{rc_mallNm}님이 새로운
글을 등록했습니다.`} />
                                    </td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 공지사항 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                        공지사항
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center">
                                         <div className="flex items-center justify-center gap-1 text-gray-600 mb-2">
                                            <Checkbox id="notice-night-chk" className="border-gray-300 w-3.5 h-3.5 mr-1" />
                                            <Label htmlFor="notice-night-chk" className="text-gray-600 font-bold cursor-pointer text-xs">야간시간에도 발송</Label>
                                         </div>
                                         <div className="text-[10px] text-gray-400 mt-1 flex items-start justify-center gap-1">
                                            <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5 flex-shrink-0">!</span>
                                            <span>(정보통신망법에 의해 08:00<br />~ 21:00 에만 발송)</span>
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="notice-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="notice-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[shopName]}
{rc_mallNm}님의 공지사항에 답변이 등록되었습니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="notice-hq-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="notice-hq-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`공지사항게시판에
{rc_mallNm}님이 새로운
글을 등록했습니다.`} />
                                    </td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 이벤트 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                        이벤트
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center">
                                         <div className="flex items-center justify-center gap-1 text-gray-600 mb-2">
                                            <Checkbox id="event-night-chk" className="border-gray-300 w-3.5 h-3.5 mr-1" />
                                            <Label htmlFor="event-night-chk" className="text-gray-600 font-bold cursor-pointer text-xs">야간시간에도 발송</Label>
                                         </div>
                                         <div className="text-[10px] text-gray-400 mt-1 flex items-start justify-center gap-1">
                                            <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5 flex-shrink-0">!</span>
                                            <span>(정보통신망법에 의해 08:00<br />~ 21:00 에만 발송)</span>
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="event-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="event-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[shopName]}
{rc_mallNm}님의 이벤트에 답변이 등록되었습니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="event-hq-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="event-hq-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`이벤트게시판에
{rc_mallNm}님이 새로운
글을 등록했습니다.`} />
                                    </td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>

                                {/* 광고 · 제휴게시판 */}
                                <tr>
                                    <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                        광고 · 제휴게시판
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-center">
                                         <div className="flex items-center justify-center gap-1 text-gray-600 mb-2">
                                            <Checkbox id="ad-night-chk" className="border-gray-300 w-3.5 h-3.5 mr-1" />
                                            <Label htmlFor="ad-night-chk" className="text-gray-600 font-bold cursor-pointer text-xs">야간시간에도 발송</Label>
                                         </div>
                                         <div className="text-[10px] text-gray-400 mt-1 flex items-start justify-center gap-1">
                                            <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5 flex-shrink-0">!</span>
                                            <span>(정보통신망법에 의해 08:00<br />~ 21:00 에만 발송)</span>
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="ad-member-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="ad-member-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[shopName]}
{rc_mallNm}님의 광고 · 제휴게시판에 답변이 등록되었습니다.`} />
                                    </td>
                                    <td className="p-4 border-r border-gray-200 text-left align-top">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Checkbox id="ad-hq-chk" className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                            <Label htmlFor="ad-hq-chk" className="text-gray-700 cursor-pointer">자동발송</Label>
                                        </div>
                                        <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`광고 · 제휴게시판게시판에
{rc_mallNm}님이 새로운
글을 등록했습니다.`} />
                                    </td>
                                    <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </TabsContent>

                {/* Coupon Tab Content */}
                <TabsContent value="coupon" className="mt-0">
                    <div className="border border-t-0 border-gray-300 bg-white">
                        <table className="w-full text-xs text-center border-collapse">
                            <thead className="bg-[#F8F9FA] text-gray-700 font-bold border-b border-gray-200">
                                <tr>
                                    <th className="py-3 border-r border-gray-200 w-64" rowSpan={2}>발송항목</th>
                                    <th className="py-3 border-r border-gray-200 w-64" rowSpan={2}>발송종류</th>
                                    <th className="py-2 border-b border-gray-200" colSpan={3}>발송대상 및 SMS 문구설정</th>
                                </tr>
                                <tr>
                                    <th className="py-2 border-r border-gray-200 w-1/3">회원</th>
                                    <th className="py-2 border-r border-gray-200 w-1/3">본사 운영자</th>
                                    <th className="py-2 w-1/3">공급사 운영자</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {[
                                    { title: "첫 구매 축하 쿠폰", night: true },
                                    { title: "구매 감사 쿠폰", night: true },
                                    { title: "생일 축하 쿠폰", time: "8" },
                                    { title: "회원가입 축하 쿠폰", night: true },
                                    { title: "출석 체크 감사 쿠폰", night: true },
                                    { title: "회원 정보 이벤트 쿠폰", night: true },
                                    { title: "휴면회원 해제 감사 쿠폰", night: true },
                                    { title: "수동쿠폰 발급 안내", night: true, hasHq: true },
                                    { title: "쿠폰만료 안내", expiry: true },
                                    { title: "생일축하", sub: "(생일회원 체크 후 발송)", time: "10" }
                                ].map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="p-4 border-r border-gray-200 bg-[#FBFBFB] font-bold text-gray-700 text-center">
                                            {row.title}
                                            {row.sub && <div className="font-normal text-gray-400 mt-1 text-[11px] leading-tight flex justify-center items-center gap-1">{row.sub}</div>}
                                        </td>
                                        <td className="p-4 border-r border-gray-200 text-center">
                                            <Link href="#" className="text-blue-500 text-[11px] font-bold block mb-2 underline">수신동의 회원만 발송</Link>
                                            <div className="h-px bg-gray-100 my-2 w-full scale-x-75 mx-auto"></div>
                                            {row.night && (
                                                <>
                                                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-2 mt-2 whitespace-nowrap">
                                                        <Checkbox id={`night-${idx}`} className="border-gray-300 w-3.5 h-3.5 mr-1" />
                                                        <Label htmlFor={`night-${idx}`} className="text-gray-600 font-bold cursor-pointer text-xs whitespace-nowrap">야간시간에도 발송</Label>
                                                    </div>
                                                    <div className="text-[10px] text-gray-400 mt-1 flex items-center justify-center gap-1 whitespace-nowrap">
                                                        <span className="inline-block bg-[#555555] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] flex-shrink-0">!</span>
                                                        <span>(정보통신망법에 의해 08:00 ~ 21:00 에만 발송)</span>
                                                    </div>
                                                </>
                                            )}
                                            {row.time && (
                                                <div className="flex items-center justify-center gap-1 text-gray-600 mt-2">
                                                    <Select defaultValue={row.time}><SelectTrigger className="w-14 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value={row.time}>{row.time}시</SelectItem></SelectContent></Select> 발송
                                                </div>
                                            )}
                                            {row.expiry && (
                                                <div className="flex flex-col items-center gap-2 mt-2">
                                                    <div className="flex items-center justify-center gap-1 text-gray-600">
                                                        쿠폰만료 <Select defaultValue="7"><SelectTrigger className="w-14 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="7">7일</SelectItem></SelectContent></Select> 전
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1 text-gray-600">
                                                        <Select defaultValue="11"><SelectTrigger className="w-14 h-6 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="11">11시</SelectItem></SelectContent></Select> 발송
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 border-r border-gray-200 text-left align-top">
                                            <div className="flex items-center gap-1.5 mb-2">
                                                <Checkbox id={`mem-${idx}`} className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                                <Label htmlFor={`mem-${idx}`} className="text-gray-700 cursor-pointer">자동발송</Label>
                                            </div>
                                            <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={
                                                row.title === "생일축하" ? `{[rc_mallNm]}
{name}님의 생일을 진심으로 축하드립니다.` : 
                                                row.title.includes("생일") ? `{[rc_mallNm]}
{name}님의 생일을 축하드리며, 쿠폰을 발급해드렸으니 많은 이용 부탁드립니...` :
                                                `{[rc_mallNm]}
${row.title}을 발급해드렸으니 많은 이용 부탁드립니다.`
                                            } />
                                        </td>
                                        {row.hasHq ? (
                                            <td className="p-4 border-r border-gray-200 text-left align-top">
                                                <div className="flex items-center gap-1.5 mb-2">
                                                    <Checkbox id={`hq-${idx}`} className="border-gray-300 rounded-[2px] w-3.5 h-3.5" />
                                                    <Label htmlFor={`hq-${idx}`} className="text-gray-700 cursor-pointer">자동발송</Label>
                                                </div>
                                                <textarea className="w-full h-24 border border-gray-300 rounded-[2px] p-2 text-xs resize-none text-gray-600" defaultValue={`{[rc_mallNm]}
{rc_memid} {name} 회원님에게 {[CouponName]} 쿠폰이 발급되었습니다.`} />
                                            </td>
                                        ) : (
                                            <td className="p-4 border-r border-gray-200 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                        )}
                                        <td className="p-4 text-center align-middle text-red-500 font-bold">회원 전용</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>

          </Tabs>
      </div>

       <hr className="border-gray-200 my-8" />

      {/* Guide Info */}
       <div className="text-gray-600 text-xs">
          <h3 className="font-bold flex items-center gap-1 mb-6 text-blue-500 text-[13px]">
              <Info className="w-4 h-4" /> 안내
          </h3>
          <div className="space-y-6">
              <div>
                  <h4 className="font-bold text-gray-700 text-xs mb-2">[운영자 수신 설정]자동SMS는 운영자별로 수신여부를 설정할 수 있나요?</h4>
                   <ul className="list-none space-y-2 text-gray-500 pl-1">
                    <li>· "기본설정 &gt; 관리정책 &gt; 운영자관리"에서 운영자 등록 및 수정 시 자동SMS 수신여부를 메뉴별로 선택할 수 있습니다.</li>
                    <li>· 자동SMS 수신여부를 설정한 운영자는 선택된 메뉴의 SMS만 수신할 수 있습니다.</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold text-gray-700 text-xs mb-2">회원 관련 자동 SMS의 발송은 언제 되나요?</h4>
                   <ul className="list-none space-y-2 text-gray-500 pl-1">
                    <li>· 회원가입, 비밀번호 찾기 인증번호, 휴면회원 해제 인증번호, 마일리지 지급/차감 안내, 예치금 지급/차감 안내 SMS는 즉시 발송됩니다.</li>
                    <li>· 회원 관련 자동 SMS 중 수신동의여부확인과 회원등급 변경안내 SMS는 오전 8시,마일리지 소멸안내 SMS는 오전 9시, 휴면회원전환 사전안내 SMS는 오전 10시에 일괄로 발송됩니다.</li>
                    <li className="mt-4">· 쿠폰/프로모션 관련 자동 SMS 중 생일축하쿠폰 SMS는 오전 8시, 생일축하 SMS는 오전 10시에 일괄로 발송됩니다.</li>
                     <li>· "회원&gt;회원 관리&gt;회원 엑셀 업로드"에서 엑셀업로드 기능을 통해 신규 회원 등록 시에도 자동발송으로 설정된 SMS가 발송됩니다. (회원가입/마일리지 지급/회원가입 축하 쿠폰)</li>
                  </ul>
              </div>
          </div>
      </div>
      
       {/* Bottom Copyright */}
       <div className="mt-10 mb-6 text-center text-[10px] text-gray-400">
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
