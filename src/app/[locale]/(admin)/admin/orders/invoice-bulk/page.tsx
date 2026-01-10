"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircle,
  Calendar,
  Youtube,
  ChevronUp,
  FileSpreadsheet,
  BookOpen,
  Check,
  AlertCircle
} from "lucide-react";

export default function InvoiceBulkPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-end gap-2 pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">송장일괄등록</h1>
        <span className="text-gray-500 mb-1">송장을 일괄 등록하고 배송상태를 변경할 수 있습니다.</span>
      </div>

      {/* Invoice Registration Section */}
      <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
              <h2 className="font-bold text-gray-800 text-sm">송장등록</h2>
               <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>

          <div className="border-t border-gray-400 border-b border-gray-200 p-4 bg-white">
              <div className="flex items-center gap-2 mb-2">
                 <div className="flex items-center">
                    <span className="w-32 font-bold text-gray-700">송장 엑셀파일 등록</span>
                    <Button variant="secondary" size="sm" className="h-7 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm px-2 mr-4">
                        샘플파일보기
                    </Button>
                 </div>
                 
                 <div className="flex items-center gap-1">
                     <Button variant="secondary" size="sm" className="h-7 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm px-2">
                        찾아보기
                    </Button>
                    <Input className="w-64 h-7 bg-[#F5F5F5] border-gray-300" disabled />
                    <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-3">
                        등록하기
                    </Button>
                    <span className="text-gray-500 flex items-center gap-1 ml-1">
                         <AlertCircle className="w-3 h-3 text-gray-500 fill-current" />
                         1회 최대 1,000건까지 등록하실 수 있습니다.
                    </span>
                 </div>
              </div>
          </div>
          
           <div className="mt-2 text-red-500 font-bold flex items-center gap-1 mb-2">
                <span className="bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-sm">!</span>
                자동발송 설정에 따라 배송상태 변경 시 회원에게 SMS/메일로 안내메시지가 발송되므로 주의하시기 바랍니다.
           </div>

           <div className="border border-gray-300 p-4 bg-white">
                <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-gray-700">송장일괄등록 방법</span>
                     <Button variant="secondary" size="sm" className="h-6 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm px-2">
                        배송업체번호 보기
                    </Button>
                </div>
                <div className="text-gray-600 space-y-1 pl-1">
                     <p>샘플파일을 다운로드 받아 입력양식을 확인합니다.</p>
                     <p>주문번호, 상품주문번호, 배송업체번호, 송장번호, 배송일, 배송완료일을 입력하고 엑셀 파일로 저장 후 등록합니다.</p>
                     <p>송장번호와 함께 배송일을 입력하면 배송중으로, 배송완료일을 입력하면 배송완료로 주문상태가 자동 변경됩니다.</p>
                     <p className="text-red-500">상품주문번호 상태가 기본설정{'>'}주문정책{'>'}주문상태설정 메뉴의 "입금 상태 설정/상품 상태 설정/배송 상태 설정" 그룹에 포함된 경우에만 송장번호가 일괄등록됩니다.</p>
                </div>
           </div>
      </div>

      {/* History Search Section */}
      <div className="border-t-2 border-gray-500 border-b border-gray-200 mb-8 border-l border-r">
        {/* Search Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-[#FBFBFB]">
           <div className="flex items-center gap-2">
               <h2 className="font-bold text-gray-700">송장일괄등록 내역보기</h2>
               <HelpCircle className="w-4 h-4 text-gray-400" />
           </div>
        </div>

        <div className="p-0">
            {/* Supplier Type */}
            <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    공급사 구분
                </div>
                <div className="flex-1 p-3 flex items-center gap-4">
                     <RadioGroup defaultValue="all" className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all" id="supplier-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="supplier-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="head" id="supplier-head" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="supplier-head" className="text-gray-700 font-normal cursor-pointer">본사</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="provider" id="supplier-provider" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="supplier-provider" className="text-gray-700 font-normal cursor-pointer">공급사</Label>
                            </div>
                        </RadioGroup>
                        <Button variant="secondary" className="h-6 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm px-2">
                            공급사 선택
                        </Button>
                </div>
            </div>

             {/* Search Query */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-14">
                    검색어
                </div>
                <div className="flex-1 p-3 flex items-center border-r border-gray-200 gap-2 h-14">
                    <Select defaultValue="total_search">
                        <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                            <SelectValue placeholder="=통합검색=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="total_search">=통합검색=</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="all_match">
                        <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                            <SelectValue placeholder="검색어 전체일치" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all_match">검색어 전체일치</SelectItem>
                        </SelectContent>
                    </Select>
                     <Input className="w-[200px] h-7 border-gray-300" placeholder="검색어 전체를 정확히 입력하세요." />
                </div>
                
                 <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-14">
                    등록상태
                </div>
                <div className="flex-1 p-3 flex items-center gap-4 h-14">
                     <RadioGroup defaultValue="all" className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all" id="status-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="status-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="success" id="status-success" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="status-success" className="text-gray-700 font-normal cursor-pointer">성공</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="fail" id="status-fail" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="status-fail" className="text-gray-700 font-normal cursor-pointer">실패</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="change-fail" id="status-change-fail" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="status-change-fail" className="text-gray-700 font-normal cursor-pointer">주문상태변경실패</Label>
                            </div>
                        </RadioGroup>
                </div>
            </div>

             {/* Registration Date Search */}
             <div className="flex items-center text-xs">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    등록일 검색
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                     <div className="flex items-center gap-1">
                        <Input className="w-32 h-7 text-center border-gray-300" defaultValue="2026-01-04 00:00:00" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <span>~</span>
                    <div className="flex items-center gap-1">
                        <Input className="w-32 h-7 text-center border-gray-300" defaultValue="2026-01-10 20:26:18" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-0.5 ml-1">
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">오늘</Button>
                        <Button variant="default" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">7일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">15일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1개월</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">3개월</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1년</Button>
                    </div>
                </div>
            </div>
        </div>
         
         <div className="bg-white p-4 flex justify-center border-t border-gray-200">
             <Button className="bg-[#555555] hover:bg-[#444444] text-white font-bold h-10 w-32 rounded-sm text-sm">검색</Button>
         </div>
      </div>

       {/* List Header */}
      <div className="flex justify-between items-end mb-2 border-b border-gray-300 pb-2">
          <div className="flex items-center gap-2">
               <h3 className="text-sm font-bold text-gray-800">송장일괄등록 리스트</h3>
               <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
      </div>
      <div className="flex justify-between items-center mb-2">
            <div className="text-xs text-gray-700 font-bold">
              검색결과 <span className="text-red-500">0</span>개 / 전체 <span className="text-red-500">0</span>개
          </div>
          <div className="flex gap-1 items-center">
                 <Select defaultValue="20">
                    <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="20개 보기" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="20">20개 보기</SelectItem>
                    </SelectContent>
                </Select>
          </div>
      </div>
      

      {/* Table */}
      <div className="border border-gray-300 mb-4 overflow-x-auto border-b-0">
          <table className="w-full text-xs text-center border-collapse table-fixed">
              <colgroup>
                  <col className="w-16" />
                  <col className="w-40" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-24" />
              </colgroup>
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr className="h-10">
                      <th className="border-r border-[#CDCDCD]">번호</th>
                      <th className="border-r border-[#CDCDCD]">등록일시</th>
                      <th className="border-r border-[#CDCDCD]">등록자</th>
                      <th className="border-r border-[#CDCDCD]">공급사</th>
                      <th className="border-r border-[#CDCDCD]">전체건수</th>
                      <th className="border-r border-[#CDCDCD]">성공건수</th>
                      <th className="border-r border-[#CDCDCD]">실패건수</th>
                      <th className="border-r border-[#CDCDCD]">주문상태변경실패건수</th>
                      <th className="">상세내역</th>
                  </tr>
              </thead>
              <tbody className="text-gray-600 bg-white">
                  <tr>
                      <td colSpan={9} className="py-20 border-b border-gray-200 text-center text-sm">
                          조회 내역이 없습니다.
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
      
       <div className="border-b border-gray-300 mb-10"></div>


      {/* Guide Section */}
       <div className="space-y-6 text-gray-600">
           <div>
              <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs mb-3">
                 <BookOpen className="w-4 h-4" /> 
                 <span>안내</span>
              </div>
              <div className="space-y-4">
                  <div>
                       <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 배송일과 배송완료일은 필수로 입력해야 하나요?</h3>
                       <div className="pl-0 text-xs text-gray-500 space-y-1">
                           <p>· 배송일과 배송완료일 모두 입력하지 않은 경우, 해당 주문에 송장번호만 등록되고 주문상태는 변경되지 않습니다.</p>
                           <p>· 송장일괄등록 시 배송일과 배송완료일을 모두 입력한 경우, 해당 주문에 입력된 날짜가 배송일/배송완료일로 각각 등록되고 주문의 상태는 "배송완료" 상태로 변경됩니다.</p>
                       </div>
                  </div>

                  <div>
                       <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 송장번호를 입력하면 SMS(문자)/메일이 자동 발송되나요?</h3>
                       <div className="pl-0 text-xs text-gray-500 space-y-1">
                           <p>· 자동 SMS(문자)/메일 발송은 주문상태가 변경되면 주문자 휴대폰번호로 주문처리 상태가 안내되므로, 주문상태를 변경하지 않고 송장번호만 입력하는 경우 발송되지않습니다.</p>
                           <p>· 주문상태가 변경되어 구매자에게 자동 SMS(문자)/메일 발송이 된 후, 이전 주문상태로 원복하여 재변경처리 시에는 1차 상태변경 시 "SMS(문자)/메일" 발송이 되었으므로 재발송되지 않습니다.</p>
                           <p className="text-red-500 font-bold">(주문상태 원복으로 인해 구매자에게 추가 안내가 필요한 경우 운영자가 수기로 발송해야 합니다.)</p>
                           <p>· SMS(문자) 자동발송은 "회원{'>'}SMS 관리{'>'}자동 SMS 설정{'>'} 메뉴의 "주문배송관련" 항목에서 설정할 수 있습니다.</p>
                           <p>· 메일 자동발송은 "회원{'>'}메일관리{'>'}자동 메일 설정" 메뉴의 "주문/배송관련" 항목에서 설정할 수 있습니다.</p>
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
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0 transform rotate-180">
                         <ChevronUp className="w-4 h-4" />
                </Button>
            </div>
        </div>

    </div>
  );
}
