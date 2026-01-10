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
  List
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ReceiptIndividualPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold text-gray-900">현금영수증 개별발급</h1>
            <span className="text-gray-500 text-xs mb-1">현금영수증을 주문서가 아닌 개별적으로 발급요청이 가능합니다.</span>
        </div>
        <div className="flex gap-1">
             <Button variant="outline" className="h-9 px-4 rounded-sm text-xs border-gray-300 flex items-center gap-1 text-gray-600">
                <List className="w-4 h-4" /> 목록
            </Button>
            <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 px-4 rounded-sm text-xs">
                현금영수증 개별발급
            </Button>
        </div>
      </div>

       {/* Receipt Info Form */}
      <div className="mb-10">
          <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-2">
            <h3 className="text-sm font-bold text-gray-800">현금영수증 정보</h3>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          
           <table className="w-full text-xs border-collapse border-t border-gray-200">
                <tbody>
                    <tr className="border-b border-gray-200">
                        <th className="w-40 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            PG 업체
                        </th>
                        <td className="pl-4 py-2 border-r border-gray-200 w-[40%]">
                             <span className="text-gray-700">전자결제 서비스 업체와 계약이 필요합니다.</span>
                        </td>
                         <th className="w-40 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            신청 가능 여부
                        </th>
                         <td className="pl-4 py-2 text-red-500">
                             신청 불가
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            주문번호
                        </th>
                        <td colSpan={3} className="pl-4 py-2">
                             <div className="flex items-center gap-1">
                                <Input className="w-48 h-7 text-xs border-gray-300 rounded-sm" />
                                <Button variant="secondary" size="sm" className="h-7 px-3 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm disabled:opacity-50" disabled>
                                    유효성 검사
                                </Button>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            <span className="text-red-500 mr-1">•</span>신청자명
                        </th>
                        <td className="pl-4 py-2 border-r border-gray-200">
                             <Input className="w-48 h-7 text-xs border-gray-300 rounded-sm" />
                        </td>
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                           <span className="text-red-500 mr-1">•</span>상품명
                        </th>
                        <td className="pl-4 py-2">
                            <div className="flex items-center gap-1 text-gray-400">
                                <Input className="w-80 h-7 text-xs border-gray-300 rounded-sm" />
                                <span>0 / 250</span>
                            </div>
                        </td>
                    </tr>
                     <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            <span className="text-red-500 mr-1">•</span>휴대폰 번호
                        </th>
                        <td className="pl-4 py-2 border-r border-gray-200">
                             <Input className="w-48 h-7 text-xs border-gray-300 rounded-sm" />
                        </td>
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                           <span className="text-red-500 mr-1">•</span>이메일
                        </th>
                        <td className="pl-4 py-2">
                            <div className="flex items-center gap-2">
                                <Input className="w-36 h-7 text-xs border-gray-300 rounded-sm" />
                                <span>@</span>
                                <Input className="w-36 h-7 text-xs border-gray-300 rounded-sm" />
                                <Select>
                                    <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300 bg-white">
                                        <SelectValue placeholder="직접입력" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="direct">직접입력</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            <span className="text-red-500 mr-1">•</span>과세/면세 여부
                        </th>
                        <td className="pl-4 py-2 border-r border-gray-200">
                             <RadioGroup defaultValue="tax" className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="tax" id="type-tax" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="type-tax" className="text-gray-700 font-normal cursor-pointer">과세</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="tax_free" id="type-free" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="type-free" className="text-gray-700 font-normal cursor-pointer">면세</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="complex" id="type-complex" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="type-complex" className="text-gray-700 font-normal cursor-pointer">복합과세</Label>
                                </div>
                            </RadioGroup>
                        </td>
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                           <span className="text-red-500 mr-1">•</span>신청 금액
                        </th>
                        <td className="pl-4 py-3">
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <span className="w-16 text-gray-800">발행액</span>
                                    <span className="mr-2 text-gray-500">:</span>
                                    <Input className="w-36 h-7 text-xs border-gray-300 rounded-sm" />
                                </div>
                                 <div className="flex items-center">
                                    <span className="w-16 text-gray-800">공급액</span>
                                    <span className="mr-2 text-gray-500">:</span>
                                    <div className="w-36 h-7 bg-gray-100 border border-gray-300 flex items-center px-2 text-gray-500 rounded-sm">0</div>
                                </div>
                                 <div className="flex items-center">
                                    <span className="w-16 text-gray-800">부가세</span>
                                    <span className="mr-2 text-gray-500">:</span>
                                    <div className="w-36 h-7 bg-gray-100 border border-gray-300 flex items-center px-2 text-gray-500 rounded-sm">0</div>
                                </div>
                                 <div className="flex items-center">
                                    <span className="w-16 text-gray-800">면세</span>
                                    <span className="mr-2 text-gray-500">:</span>
                                    <div className="w-36 h-7 bg-gray-100 border border-gray-300 flex items-center px-2 text-gray-500 rounded-sm">0</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                     <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            <span className="text-red-500 mr-1">•</span>발행 용도
                        </th>
                        <td colSpan={3} className="pl-4 py-2">
                              <RadioGroup defaultValue="income" className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="income" id="usage-income" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="usage-income" className="text-gray-700 font-normal cursor-pointer">소득공제용</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="business" id="usage-business" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="usage-business" className="text-gray-700 font-normal cursor-pointer">지출증빙용</Label>
                                </div>
                            </RadioGroup>
                        </td>
                    </tr>
                     <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            <span className="text-red-500 mr-1">•</span>인증 종류
                        </th>
                        <td colSpan={3} className="pl-4 py-3">
                             <RadioGroup defaultValue="phone" className="flex items-center gap-6 mb-2">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="phone" id="auth-phone" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="auth-phone" className="text-gray-700 font-normal cursor-pointer">휴대폰번호</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="business_num" id="auth-business" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="auth-business" className="text-gray-700 font-normal cursor-pointer">사업자번호</Label>
                                </div>
                            </RadioGroup>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">휴대폰번호 :</span>
                                <Input className="w-44 h-7 text-xs border-gray-300 rounded-sm" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
      </div>

       {/* Admin Memo */}
      <div className="mb-10">
          <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-2">
            <h3 className="text-sm font-bold text-gray-800">관리자 메모</h3>
             <span className="bg-[#797979] text-white text-[10px] px-1 py-0.5 rounded-[2px] font-normal mx-1">!</span>
            <span className="text-gray-400 text-[11px] font-normal">관리자 메모를 작성합니다.</span>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>

          <table className="w-full text-xs border-collapse border-t border-gray-200">
              <tbody>
                  <tr className="border-b border-gray-200">
                       <th className="w-40 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200 align-top pt-4">
                            관리자 메모
                        </th>
                        <td className="pl-4 py-3">
                            <Textarea className="w-full h-24 border-gray-300 resize-none p-2" />
                        </td>
                  </tr>
              </tbody>
          </table>
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
