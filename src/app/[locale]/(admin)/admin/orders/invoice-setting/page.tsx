"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function InvoiceSettingPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">세금계산서 설정</h1>
        <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 px-6 rounded-sm text-xs">
            저장
        </Button>
      </div>

       {/* Basic Settings */}
      <div className="mb-10">
          <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-2">
            <h3 className="text-sm font-bold text-gray-800">기본설정</h3>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          
           <table className="w-full text-xs border-collapse border-t border-gray-200">
                <tbody>
                    <tr className="border-b border-gray-200">
                        <th className="w-48 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            발행 사용 설정
                        </th>
                        <td className="pl-4 py-2">
                             <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroup value="used" className="flex items-center">
                                            <RadioGroupItem value="used" id="issue-used" className="border-red-500 text-red-500 focus:ring-red-500" />
                                        </RadioGroup>
                                        <Label htmlFor="issue-used" className="text-gray-700 font-normal cursor-pointer">사용함</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                         <Checkbox id="normal-invoice" className="border-red-500 text-red-500 rounded-[2px]" defaultChecked/>
                                         <Label htmlFor="normal-invoice" className="text-gray-700 font-normal cursor-pointer">일반 세금계산서</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                         <Checkbox id="electronic-invoice" className="border-gray-300 text-gray-600 rounded-[2px]" />
                                         <Label htmlFor="electronic-invoice" className="text-gray-700 font-normal cursor-pointer">전자 세금계산서</Label>
                                    </div>
                                    <div className="flex items-center gap-1 text-[11px] text-[#999999]">
                                         <span className="bg-[#666666] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px]">!</span>
                                         법인사업자 및 직전년도 매출액 3억원 이상의 개인사업자는 의무발행 대상입니다.
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-6">
                                     <div className="flex items-center gap-1.5">
                                        <RadioGroup value="unused" className="flex items-center">
                                            <RadioGroupItem value="unused" id="issue-unused" className="border-gray-300 text-gray-600" />
                                        </RadioGroup>
                                        <Label htmlFor="issue-used" className="text-gray-700 font-normal cursor-pointer">사용안함</Label>
                                    </div>
                                     <div className="flex items-center gap-1 text-[11px] text-[#999999]">
                                         <span className="bg-[#666666] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px]">!</span>
                                         간이과세자는 세금계산서 발행이 불가능하므로 "사용안함" 설정하시기 바랍니다.
                                    </div>
                                </div>
                             </div>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                           세금계산서<br/>신청기간제한
                        </th>
                        <td className="pl-4 py-2">
                             <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                     <div className="flex items-center gap-1.5">
                                        <RadioGroup value="limit" className="flex items-center">
                                            <RadioGroupItem value="limit" id="limit-used" className="border-red-500 text-red-500 focus:ring-red-500" />
                                        </RadioGroup>
                                        <Label htmlFor="limit-used" className="text-gray-700 font-normal cursor-pointer">결제완료 기준 다음 달</Label>
                                    </div>
                                    <Select defaultValue="5">
                                        <SelectTrigger className="w-16 h-7 text-[11px] border-gray-300 bg-white">
                                            <SelectValue placeholder="5" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5">5</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <span className="text-gray-700">일까지 신청가능</span>
                                </div>
                                
                                <div className="flex items-center gap-6">
                                     <div className="flex items-center gap-1.5">
                                        <RadioGroup value="unused" className="flex items-center">
                                            <RadioGroupItem value="unused" id="limit-unused" className="border-gray-300 text-gray-600" />
                                        </RadioGroup>
                                        <Label htmlFor="limit-unused" className="text-gray-700 font-normal cursor-pointer">제한안함</Label>
                                    </div>
                                     <div className="flex items-center gap-1 text-[11px] text-[#999999]">
                                         <span className="bg-[#666666] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px]">!</span>
                                         재화, 용역의 공급시기가 속하는 달의 다음달 10일 경과 후 세금계산서 발행 시 가산세가 부과됩니다.
                                    </div>
                                </div>
                             </div>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200 align-top pt-4">
                           발행금액 포함항목
                        </th>
                        <td className="pl-4 py-3">
                             <div className="flex items-center gap-6 mb-2">
                                <div className="flex items-center gap-1.5">
                                     <Checkbox id="include-shipping" className="border-gray-300 text-gray-600 rounded-[2px]" />
                                     <Label htmlFor="include-shipping" className="text-gray-700 font-normal cursor-pointer">배송비</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                     <Checkbox id="include-mileage" className="border-gray-300 text-gray-600 rounded-[2px]" />
                                     <Label htmlFor="include-mileage" className="text-gray-700 font-normal cursor-pointer">마일리지 사용금액</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                     <Checkbox id="include-deposit" className="border-gray-300 text-gray-600 rounded-[2px]" />
                                     <Label htmlFor="include-deposit" className="text-gray-700 font-normal cursor-pointer">예치금 사용금액</Label>
                                </div>
                             </div>
                             <div className="text-[11px] text-[#999999] space-y-1">
                                 <p>신용카드로 결제한 건은 세금계산서 발행이 불가능하며 신용카드 매출전표로 부가가치세를 신고해야 합니다.</p>
                                 <p>사업자가 고객에게 매출액의 일정 비율에 해당하는 마일리지를 적립해 주고, 향후 그 고객이 재화를 공급받고<br/>그 대가의 일부 또는 전부를 적립된 마일리지로 결제하는 경우 해당 마일리지 상당액은 공급가액에 포함됩니다.(부가가치세법 시행령)</p>
                                 <p className="flex items-start gap-1">
                                    <span className="bg-[#666666] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] mt-0.5 min-w-[12px]">!</span>
                                    <span>신용카드로 결제한 건을 예치금으로 환불 시 기존 결제수단이 취소되지 않은 상태에서 세금계산서에 예치금 사용 금액을<br/>포함하는 경우 이중 증빙 발급상태가 될 수 있으므로 주의해야 합니다. 또한 마일리지와 같이 예치금을 지급한 경우는<br/>위에서 설명하고 있는 대로 예치금 사용 금액이 공급가액에 포함되어야 합니다.</span>
                                 </p>
                             </div>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                           발행일자
                        </th>
                        <td className="pl-4 py-2">
                             <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroup value="payment" className="flex items-center">
                                        <RadioGroupItem value="payment" id="date-payment" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    </RadioGroup>
                                    <Label htmlFor="date-payment" className="text-gray-700 font-normal cursor-pointer">결제완료 기준</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroup value="delivery" className="flex items-center">
                                        <RadioGroupItem value="delivery" id="date-delivery" className="border-gray-300 text-gray-600" />
                                    </RadioGroup>
                                    <Label htmlFor="date-delivery" className="text-gray-700 font-normal cursor-pointer mr-2">배송완료 기준</Label>
                                    <Checkbox id="all-products" className="border-gray-300 text-gray-600 rounded-[2px]" />
                                    <Label htmlFor="all-products" className="text-gray-700 font-normal cursor-pointer">주문에 포함된 '모든 상품' 배송완료 기준</Label>
                                </div>
                            </div>
                        </td>
                    </tr>
                     <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200 align-top pt-8">
                           주문서 작성페이지<br/>노출여부
                        </th>
                        <td className="pl-4 py-8">
                             <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroup value="show" className="flex items-center">
                                        <RadioGroupItem value="show" id="show-yes" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    </RadioGroup>
                                    <Label htmlFor="show-yes" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                                </div>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <RadioGroup value="hide" className="flex items-center">
                                        <RadioGroupItem value="hide" id="show-no" className="border-gray-300 text-gray-600" />
                                    </RadioGroup>
                                    <Label htmlFor="show-no" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                                </div>
                                <div className="text-[11px] text-[#999999] space-y-1">
                                     <p className="flex items-start gap-1">
                                        <span className="bg-[#666666] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] mt-0.5 min-w-[12px]">!</span>
                                        <span>주문서 작성 페이지에서 고객이 세금계산서를 신청할 수 있도록 설정할 수 있습니다.<br/>"노출안함" 선택 시 고객은 마이페이지 주문상세에서만 신청이 가능합니다.</span>
                                     </p>
                                     <p className="flex items-start gap-1 text-red-500">
                                        <span className="bg-red-500 text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] mt-0.5 min-w-[12px] font-bold">!</span>
                                        <span>"노출함" 설정 시에도, 계좌이체와 가상계좌, 에스크로 결제는 적용되지 않습니다.<br/>위의 결제수단의 경우 현금영수증과 세금계산서 중복신청이 가능하므로,<br/>세금계산서 발행 전에 반드시 현금영수증 발행여부를 체크하여 중복발행으로 인한 불이익이 없도록 주의하시기 바랍니다.</span>
                                     </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200 align-top pt-4">
                           이용안내 문구
                        </th>
                        <td className="pl-4 py-3">
                            <RadioGroup defaultValue="unused" className="flex items-center gap-6 mb-2">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="used" id="info-used" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="info-used" className="text-gray-700 font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="unused" id="info-unused" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="info-unused" className="text-gray-700 font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <Textarea className="w-full h-24 border-gray-300 resize-none p-2 mb-2" />
                            <p className="text-[11px] text-gray-700">"이용안내 문구" 경우에는 '치환코드 : {`{taxinvoiceInfo}`}' 를 이용하여 주문서 작성페이지 내 세금계산서 신청부분에 노출시킬 수 있습니다.</p>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200 align-top pt-4">
                           발행 신청 마감<br/>안내 문구
                        </th>
                        <td className="pl-4 py-3">
                            <RadioGroup defaultValue="unused" className="flex items-center gap-6 mb-2">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="used" id="deadline-used" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="deadline-used" className="text-gray-700 font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="unused" id="deadline-unused" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="deadline-unused" className="text-gray-700 font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <Textarea className="w-full h-24 border-gray-300 resize-none p-2 mb-2" />
                            <div className="flex items-center gap-1 text-[11px] text-[#999999]">
                                <span className="bg-[#666666] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] min-w-[12px]">!</span>
                                쇼핑몰 주문조회 상세화면에서 세금계산서 발행신청 기간이 지난 주문 건에 대하여 안내문구를 노출시킬 수 있습니다.
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
      </div>

       {/* Electronic Tax Invoice Settings */}
      <div className="mb-10">
          <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-2">
            <h3 className="text-sm font-bold text-gray-800">전자 세금계산서 설정</h3>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>

          <table className="w-full text-xs border-collapse border-t border-gray-200">
              <tbody>
                  <tr className="border-b border-gray-200">
                       <th className="w-48 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            고도빌 회원ID
                        </th>
                        <td className="pl-4 py-3">
                            <Input className="w-64 h-7 text-xs border-gray-300 rounded-sm" />
                        </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                       <th className="w-48 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200 align-top pt-4">
                            고도빌 API_KEY
                        </th>
                        <td className="pl-4 py-3">
                            <Input className="w-64 h-7 text-xs border-gray-300 rounded-sm mb-2" />
                            <div className="text-[11px] text-[#999999] space-y-1">
                                 <p className="flex items-start gap-1">
                                    <span className="bg-[#666666] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] mt-0.5 min-w-[12px]">!</span>
                                    <span>고도빌 홈페이지에서 로그인 후, 로그인박스에 있는 [API KEY] 버튼을 클릭하면 확인할 수 있습니다.<br/>API KEY 값을 복사하여, 삽입하시면 됩니다.</span>
                                 </p>
                            </div>
                        </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                       <th className="w-48 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            고도빌 바로가기
                        </th>
                        <td className="pl-4 py-3">
                            <Button variant="secondary" size="sm" className="h-7 px-3 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm">고도빌 바로가기</Button>
                        </td>
                  </tr>
              </tbody>
          </table>
      </div>
      
        {/* Copyright Footer */}
        <div className="mt-20 border-t border-gray-200 pt-10 text-center text-xs text-gray-500 pb-10">
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
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0 transform rotate-180">
                         <ChevronUp className="w-4 h-4" />
                </Button>
            </div>
        </div>

    </div>
  );
}
