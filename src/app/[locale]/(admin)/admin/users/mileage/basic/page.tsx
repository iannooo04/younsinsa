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
import { Link } from "@/i18n/routing";

export default function MileageBasicSettingsPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold text-gray-900 leading-none">마일리지 기본 설정</h1>
            <span className="text-gray-500 text-xs text-[#888888] pb-0.5">마일리지 기본 설정을 하실 수 있습니다.</span>
        </div>
        <Button className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
            저장
        </Button>
      </div>

      {/* Main Settings */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">마일리지 기본설정</h2>
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
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    쇼핑몰 노출 이름
                </div>
                <div className="flex-1 p-4">
                   <Input className="w-40 h-7 text-xs border-gray-300" defaultValue="마일리지" />
                </div>
            </div>

             {/* Unit */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    쇼핑몰 노출 단위
                </div>
                <div className="flex-1 p-4">
                   <Input className="w-20 h-7 text-xs border-gray-300" defaultValue="원" />
                </div>
            </div>

            {/* Expiration */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[220px]">
                    마일리지 유효기간
                </div>
                <div className="flex-1 p-4">
                    <RadioGroup defaultValue="no-expire" className="flex flex-col gap-4">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="no-expire" id="expire-no" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="expire-no" className="text-gray-600 font-normal cursor-pointer text-xs">유효기간 없음</Label>
                        </div>
                        <div className="flex flex-col gap-3">
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="msg-expire" id="expire-yes" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="expire-yes" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-2">
                                    유효기간 있음 : 마일리지 적립일로부터 
                                    <div className="relative">
                                        <Input className="w-16 h-7 text-xs border-gray-300 bg-gray-100 text-right pr-2" defaultValue="365" disabled />
                                    </div>
                                    일 까지
                                </Label>
                            </div>
                            
                            <div className="flex items-center gap-4 pl-6 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <span>유효기간 만료</span>
                                    <Input className="w-14 h-7 text-xs border-gray-300 bg-gray-100 text-center" defaultValue="30" disabled />
                                    <span>일 전 마일리지 소멸 자동안내</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="alarm-sms" className="border-gray-300 rounded-[2px]" disabled />
                                    <Label htmlFor="alarm-sms" className="text-gray-600 font-normal cursor-pointer text-xs">SMS발송 <Link href="#" className="text-blue-500 underline">상세설정</Link></Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <Checkbox id="alarm-email" className="border-gray-300 rounded-[2px]" checked disabled />
                                    <Label htmlFor="alarm-email" className="text-gray-600 font-normal cursor-pointer text-xs">이메일발송 <Link href="#" className="text-blue-500 underline">상세설정</Link></Label>
                                </div>
                            </div>

                             <div className="pl-6 space-y-1">
                                <p className="text-[#888888] text-[11px] flex items-center gap-1">
                                    <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                                    <span className="text-[#888888]">※ SMS는 잔여포인트가 있어야 발송됩니다. (잔여포인트 : <span className="text-red-500">0.0</span> )</span>
                                    <Button variant="secondary" className="h-5 px-2 text-[11px] bg-[#AAAAAA] border border-[#AAAAAA] text-white rounded-[2px] hover:bg-[#999999] ml-1">SMS포인트 충전하기</Button>
                                </p>
                                <p className="text-[#888888] text-[11px] flex items-start gap-1">
                                    <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                                    <span className="text-[#888888]">※ SMS/이메일 자동안내 발송 여부는 자동 메일/SMS의 "마일리지 소멸" 항목 발송여부 설정에 따라 자동으로 설정됩니다.<br/>(체크박스 우측 "상세설정" 클릭 시 설정 페이지로 이동하실 수 있습니다.)</span>
                                </p>
                                 <p className="text-red-500 text-[11px] flex items-center gap-1">
                                    <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                                    <span>※ 카카오 알림톡을 사용중이신 경우, 마일리지 소멸 자동안내는 자동 SMS 설정이 아닌 카카오 알림톡 설정 기준으로 발송되오니 주의바랍니다.</span>
                                </p>
                            </div>
                        </div>
                    </RadioGroup>
                </div>
            </div>
            
            {/* Purchase Amount Base */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex flex-col justify-center border-r border-gray-200">
                    <span className="mb-1">사용/적립시</span>
                    <div className="flex items-center gap-1">
                        <span>구매금액 기준</span>
                        <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                </div>
                <div className="flex-1">
                   <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                             <div className="flex items-center gap-1.5">
                                <Checkbox id="price-sales" className="border-gray-300 rounded-[2px]" checked disabled />
                                <Label htmlFor="price-sales" className="text-gray-700 font-normal text-xs">판매가 + (</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox id="price-option" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="price-option" className="text-gray-600 font-normal cursor-pointer text-xs">옵션가</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <Checkbox id="price-add" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="price-add" className="text-gray-600 font-normal cursor-pointer text-xs">추가상품가</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <Checkbox id="price-text" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="price-text" className="text-gray-600 font-normal cursor-pointer text-xs">텍스트옵션가 )</Label>
                            </div>
                        </div>
                   </div>
                   <div className="p-4 bg-[#FBFBFB]">
                         <div className="flex items-center gap-6">
                            <span className="font-bold text-gray-700 w-32">할인 금액 포함 여부</span>
                             <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1.5">
                                    <Checkbox id="discount-product" className="border-gray-300 rounded-[2px]" />
                                    <Label htmlFor="discount-product" className="text-gray-600 font-normal cursor-pointer text-xs">상품 할인가 적용</Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <Checkbox id="discount-member" className="border-gray-300 rounded-[2px]" />
                                    <Label htmlFor="discount-member" className="text-gray-600 font-normal cursor-pointer text-xs">회원 할인가 적용</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="discount-coupon" className="border-gray-300 rounded-[2px]" />
                                    <Label htmlFor="discount-coupon" className="text-gray-600 font-normal cursor-pointer text-xs">(상품+주문)쿠폰 할인가 적용</Label>
                                </div>
                             </div>
                        </div>
                   </div>
                </div>
            </div>

            {/* Decimal */}
             <div className="flex">
                <div className="w-40 bg-[#FBFBFB] p-4 pl-4 font-bold text-gray-700 flex flex-col justify-center border-r border-gray-200 min-h-[60px]">
                    <span className="mb-0.5">정률(%) 사용/적립시</span>
                    <span>금액 끝자리 단위관리</span>
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center">
                   <p className="text-gray-900 mb-1">0.1원 단위로 버림</p>
                    <p className="text-[#888888] text-[11px] flex items-center gap-1">
                        <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span>※ <Link href="#" className="text-blue-500 underline">기본설정&gt;기본정책&gt;금액/단위 기준설정</Link>에서 설정한 기준에 따름</span>
                    </p>
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
                  <h4 className="font-bold text-red-500 text-xs mb-1">마일리지 유효기간 설정 시 유의사항</h4>
                   <ul className="list-none space-y-1 text-gray-500">
                    <li>· 마일리지는 공정거래위원회의 약관의 규제에 관한 법률에 따라 쇼핑몰의 이용약관상에 마일리지의 유효기간 또는 소멸 정책 등이 기재가 되어 있어야 합니다.</li>
                     <li className="pl-2">(마일리지 정책은 고객에게 지나치게 불리할 경우, 불공정약관으로 분리되어 규제대상이 될 수 있습니다.)</li>
                    <li>· 마일리지 관련 정책이 변경될 경우 최소 30일 전 변경사항을 홈페이지 공지사항 또는 이메일 등의 수단을 통해 사전에 고지하여야 합니다.</li>
                    <li>· 마일리지의 소멸과 관련하여 최소 30일 전부터 해당 회원에게 이메일 및 SMS 등을 통하여 마일리지의 내역 및 소멸 예정 일자를 통보하여야 합니다.</li>
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
