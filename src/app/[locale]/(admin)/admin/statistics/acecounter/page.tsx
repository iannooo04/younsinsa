"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, ChevronUp, Youtube } from "lucide-react";

export default function AceCounterPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 pb-4 border-b-2 border-gray-800">에이스카운터 신청/관리</h1>

      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-base font-bold text-gray-700">가입정보</h2>
        <HelpCircle className="w-4 h-4 text-gray-400" />
      </div>

      {/* Subscription Form */}
      <div className="border-t border-gray-400 border-b border-gray-200 mb-2">
        <div className="grid grid-cols-2">
            {/* Row 1 */}
            <div className="flex items-center border-b border-gray-100 h-12">
                <div className="w-32 bg-gray-50 h-full flex items-center pl-4 font-bold text-gray-600">
                    <span className="text-red-500 mr-1">*</span> 가입자명
                </div>
                <div className="flex-1 pl-4">
                    <Input className="w-40 h-8 rounded-[2px]" />
                </div>
            </div>
            <div className="flex items-center border-b border-gray-100 h-12">
                <div className="w-32 bg-gray-50 h-full flex items-center pl-4 font-bold text-gray-600">
                    <span className="text-red-500 mr-1">*</span> E-Mail
                </div>
                <div className="flex-1 pl-4 flex items-center gap-1">
                    <Input className="w-32 h-8 rounded-[2px]" />
                    <span>@</span>
                    <Input className="w-32 h-8 rounded-[2px]" />
                    <Select defaultValue="direct">
                        <SelectTrigger className="w-28 h-8 rounded-[2px]">
                           <SelectValue placeholder="직접입력" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="direct">직접입력</SelectItem>
                           <SelectItem value="naver">naver.com</SelectItem>
                           <SelectItem value="gmail">gmail.com</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

             {/* Row 2 */}
            <div className="flex items-center border-b border-gray-100 h-12">
                <div className="w-32 bg-gray-50 h-full flex items-center pl-4 font-bold text-gray-600">
                    <span className="text-red-500 mr-1">*</span> 휴대폰번호
                </div>
                <div className="flex-1 pl-4">
                    <Input className="w-40 h-8 rounded-[2px]" />
                </div>
            </div>
            <div className="flex items-center border-b border-gray-100 h-12">
                <div className="w-32 bg-gray-50 h-full flex items-center pl-4 font-bold text-gray-600">
                    뉴스레터 수신여부
                </div>
                <div className="flex-1 pl-4 flex items-center gap-4">
                    <RadioGroup defaultValue="allow" className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="allow" id="r1" className="text-red-500 border-gray-300" />
                            <Label htmlFor="r1" className="font-normal text-gray-600">수신허용</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="deny" id="r2" className="text-red-500 border-gray-300" />
                            <Label htmlFor="r2" className="font-normal text-gray-600">수신거부</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
      </div>

      <div className="text-[11px] text-gray-400 mb-6 space-y-1 pl-1">
        <p className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-500 text-white rounded-[2px] flex items-center justify-center font-bold text-[9px]">!</span> 서비스 안내 (결제정보/종료일) 발송 시 E-mail 및 휴대폰번호로 안내해 드립니다.</p>
        <p className="flex items-center gap-1 text-red-500"><span className="w-3 h-3 bg-red-500 text-white rounded-[2px] flex items-center justify-center font-bold text-[9px]">!</span> 에이스카운터 데이터 분석은 서비스 신청 도메인을 기준으로 진행 됩니다. 추가로 연결 된 도메인에 대한 데이터 분석은 추후 지원 될 예정입니다.</p>
      </div>

      {/* Terms Section */}
      <h2 className="text-base font-bold text-gray-700 mb-2">에이스카운터 약관동의 및 서비스신청</h2>
      <div className="border border-gray-400 p-4 h-64 overflow-y-scroll mb-2 text-gray-600 leading-relaxed bg-white">
        <p className="mb-4 text-center font-bold">에이스카운터 서비스 이용약관</p>
        <p className="mb-2 font-bold">제 1 조 (목적)</p>
        <p className="mb-4">본 약관은 ㈜엔에이치엔데이터(이하 “회사”)가 제공하는 실시간 웹사이트 트래픽 및 방문객 분석 서비스인 AceCounter™(이하 “서비스”) 신청에 따른 회원가입, 서비스 품질, 이용조건 및 절차, 권리 및 책임을 규정함을 목적으로 합니다.</p>
        <p className="mb-2 font-bold">제 2 조 (용어의 정의)</p>
        <p>1. 서비스 : 회사가 NHN커머스 회원(이하 “회원”이라 한다)에게 제공하는 실시간 웹사이트 트래픽 및 방문객 분석 서비스인 AceCounter™를 말함.</p>
        <p>2. 회원 : 본 약관에 따라 NHN커머스 내에서 회사와 서비스 이용계약을 체결한 개인이나 법인 또는 법인에 준하는 단체를 말함.</p>
        <p>3. 아이디 (ID) : 정상적인 서비스를 받기 위하여 회원이 부여 받는 구분문자를 말함.</p>
        <p>4. 이용신청 : 회사가 정한 별도의 기준과 절차에 따라 서비스 이용을 신청하는 것을 말함.</p>
        {/* Placeholder for more text if needed */}
        <div className="h-40"></div>
      </div>
      <div className="flex items-center gap-2 mb-8 pl-1">
        <Checkbox id="terms" className="border-gray-300 w-4 h-4 rounded-[2px]" />
        <Label htmlFor="terms" className="text-xs text-gray-600 font-normal">(필수)에이스카운터 서비스 신청 및 이용약관에 동의합니다.</Label>
      </div>


      {/* Third Party Info Provision */}
      <h2 className="text-base font-bold text-gray-700 mb-2">개인정보 제3자 제공</h2>
      <div className="border border-gray-400 p-4 h-40 overflow-y-scroll mb-2 text-gray-600 leading-relaxed bg-white">
         <p className="mb-4 text-center font-bold">개인정보 제3자 제공</p>
         <p>1. 제공받는 자 : ㈜엔에이치엔데이터</p>
         <p>2. 이용목적 : 쇼핑몰 통계 서비스</p>
         <p>3. 제공항목 : 이름, 이메일, 휴대폰번호</p>
         <p>4. 보유 및 이용기간 : 서비스 해지 후 파기</p>
         <p>※ 개인정보 제3자 제공에 대해 거부하실 수 있으며, 거부 시 쇼핑몰 통계 서비스 이용이 제한 됩니다.</p>
      </div>
       <div className="flex items-center gap-2 mb-12 pl-1">
        <Checkbox id="privacy" className="border-gray-300 w-4 h-4 rounded-[2px]" />
        <Label htmlFor="privacy" className="text-xs text-gray-600 font-normal">(필수) 개인정보 제3자 제공에 동의합니다.</Label>
      </div>

      {/* Button */}
      <div className="flex justify-center mb-16">
        <Button className="w-32 h-11 bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold text-sm rounded-[2px]">
            서비스 신청
        </Button>
      </div>
      
       {/* Guide Section */}
       <div className="border-t border-gray-300 pt-6">
        <h3 className="flex items-center gap-2 text-[#5BA0E8] font-bold mb-4 text-xs">
           <span className="w-4 h-4 border border-[#5BA0E8] flex items-center justify-center text-[10px] font-serif">i</span> 
           안내
        </h3>
        <div className="space-y-6 text-xs text-gray-600">
           <div>
            <h4 className="font-bold text-gray-800 mb-1 leading-relaxed">[주의사항] 고도몰 운영자 에이스카운터 사용 안내</h4>
            <div className="mt-4">
                 <p className="text-red-500 font-bold mb-4">※ 에이스카운터 신청 연동 기능만을 지원하는 것이며, 에이스카운터의 모든 기능은 고도몰 솔루션과는 무관합니다. <a href="#" className="underline text-gray-900 font-normal">패치바로가기 &gt;</a></p>
                 <p className="mb-4">1. 2020년 01월 13일 이전 무료스킨을 사용하시는 경우 반드시 스킨패치를 적용해야 에이스카운터 사용이 가능합니다.</p>
                 <p className="mb-1">2. 에이스카운터 서비스는 쇼핑몰 방문자의 행동과 특성을 분석하기 때문에 형태정보 제공을 위한 정보수집 안내를 하여야 합니다.</p>
                 <p className="mb-1 pl-3">서비스 이용 전에 반드시 아래 가이드에 따라 "개인정보처리방침"을 수정하고 개정 내용을 고지하여주세요.</p>
                 <p className="mb-1 pl-3 text-gray-500">- 관리자 &gt; 기본설정 &gt; 약관/개인정보처리방침 &gt; 개인정보처리방침 (10. 행태정보 제공에 대한 매체사 고지 항목 추가)</p>
                 <p className="pl-3 text-gray-500">- 행태정보 제공에 대한 매체사 고지 내용 추가</p>
            </div>
          </div>
          
           <div>
            <h4 className="text-[#5BA0E8] font-bold mb-2 cursor-pointer hover:underline">10. 행태정보 제공에 대한 매체사 고지</h4>
            <p className="text-[#5BA0E8] font-bold mb-2 cursor-pointer hover:underline">회사는 아래의 광고사업자가 회사 서비스 내 생성정보 분석 툴을 통해 온라인상의 이용자 행태정보를</p>
            <p className="text-[#5BA0E8] font-bold mb-1 cursor-pointer hover:underline">수집하고, 이용자 대상 맞춤형 광고 서비스 전송 목적으로 이용할 수 있도록 허용하고 있습니다.</p>
            <p className="text-[#5BA0E8] font-bold cursor-pointer hover:underline mb-4">- ㈜엔에이치엔데이터 (NHN DATA)</p>

            <div className="flex gap-4 mb-6">
                 {/* Mock Images for Guide, using gray boxes if real images not available or placeholder */}
                 <div className="w-[45%] h-52 bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400">
                    Image 1
                 </div>
                 <div className="w-[50%] h-44 bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400">
                    Image 2
                 </div>
            </div>

            <p className="mb-1">3. 에이스카운터 서비스는 기준몰(국내몰)과 해외몰 모두 데이터 측정이 가능합니다.</p>
            <p className="mb-1 text-gray-500 pl-2">- 기준몰(국내몰)과 해외몰 모두 기본도메인 데이터를 측정합니다.</p>
            <p className="mb-6 text-gray-500 pl-2">- 도메인을 추가를 원하는 경우 에이스카운터 [서비스관리 &gt; 정보수정/관리 &gt; 서비스정보수정] 메뉴에서 ‘도메인’을 추가해야 데이터 측정이 가능합니다.</p>

            <p className="mb-2">4. 회원 아이디별 분석을 원하시는 경우 아래 내용을 참고하여 “개인정보처리방침”을 수정하고 개정 내용을 고지하여 주세요.</p>
            <p className="mb-4 text-gray-600 pl-2">개인정보처리방침 개인정보의 처리위탁 관련 조항에 하단과 같이 수탁업체, 위탁업무 내용, 개인정보 보유 및 이용 기간을 명기해 주시기 바랍니다.</p>
            <p className="text-gray-500 pl-2 mb-1">- 관리자 &gt; 기본설정 &gt; 약관/개인정보처리방침 &gt; 개인정보처리방침</p>
            <p className="text-gray-500 pl-2 mb-6">- 개인정보 처리방침 추가</p>
            
            <div className="bg-white p-4 border border-gray-200 rounded">
                <h5 className="font-bold text-[#5BA0E8] mb-2">개인정보의 처리위탁</h5>
                <p className="text-[#5BA0E8] mb-4 leading-relaxed">회사는 서비스 향상을 위해서 개인정보처리를 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게<br/>관리될 수 있도록 필요한 사항을 규정하고 있습니다. 회사의 개인정보 위탁처리 기관 및 위탁업무 내용은 다음과 같습니다.</p>
                <p className="text-[#5BA0E8] mb-2">- 수탁업체 : ㈜엔에이치엔데이터</p>
                <p className="text-[#5BA0E8] mb-2">- 위탁업무 내용 : 로그분석 서비스</p>
                <p className="text-[#5BA0E8]">- 개인정보 보유 및 이용기간 : 회원 탈퇴 시 혹은 위탁계약 종료 시</p>
            </div>
             <p className="text-red-500 mt-4">※ 도메인 추가 연결 시 모든 데이터는 페이지 기준으로 합산되며, 기준몰(국내몰)/해외몰 을 구분하여 확인할 수 없습니다.</p>
             <p className="text-red-500">※ 모바일 웹 사이트, 해외몰을 구분하여 데이터 측정을 하길 원하는 경우 서비스 추가로 신청해주세요.</p>

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
