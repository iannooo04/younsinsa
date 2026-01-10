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
  Calendar,
  Youtube,
  ChevronUp,
  BookOpen,
} from "lucide-react";

export default function DepositCheckPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">입금조회/실시간입금확인</h1>
         <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 font-bold h-9 px-4 rounded-sm text-xs flex items-center gap-1">
            <span className="text-lg leading-none mb-0.5">+</span> 수동매칭
        </Button>
      </div>

       {/* Search Section */}
      <div className="border border-gray-200 mb-8 border-t-2 border-t-gray-500">
        {/* Search Header */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-[#FBFBFB]">
           <h2 className="font-bold text-gray-700">입금내역 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="p-0">
             {/* Search Query */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-3 flex gap-2 border-r border-gray-200">
                    <Select defaultValue="all_search">
                        <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="=통합검색=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all_search">=통합검색=</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="exact_match">
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="검색어 전체일치" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="exact_match">검색어 전체일치</SelectItem>
                        </SelectContent>
                    </Select>
                     <Input className="w-[300px] h-7 border-gray-300" placeholder="검색어 전체를 정확히 입력하세요." />
                </div>
                 <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    현재상태/은행명
                </div>
                 <div className="flex-1 p-3 flex gap-2">
                     <Select defaultValue="all_status">
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="전체" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all_status">전체</SelectItem>
                        </SelectContent>
                     </Select>
                      <Select defaultValue="bank_desc">
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="↓ 은행검색" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bank_desc">↓ 은행검색</SelectItem>
                        </SelectContent>
                     </Select>
                 </div>
            </div>

             {/* Deposit Date Search */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    입금일
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                     <div className="flex items-center gap-1">
                        <Input className="w-28 h-7 text-center border-gray-300" defaultValue="2026-01-04" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <span>~</span>
                    <div className="flex items-center gap-1">
                        <Input className="w-28 h-7 text-center border-gray-300" defaultValue="2026-01-10" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-0.5 ml-1">
                         <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">오늘</Button>
                        <Button variant="default" size="sm" className="h-7 px-2 text-[11px] bg-gray-600 text-white rounded-sm hover:bg-gray-700">7일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">15일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1개월</Button>
                    </div>
                </div>
            </div>

            {/* Last Match Date Search */}
             <div className="flex items-center text-xs">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    최종 매칭일
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                     <div className="flex items-center gap-1">
                        <Input className="w-28 h-7 text-center border-gray-300" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <span>~</span>
                    <div className="flex items-center gap-1">
                         <Input className="w-28 h-7 text-center border-gray-300" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-0.5 ml-1">
                         <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">오늘</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">7일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">15일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1개월</Button>
                         <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">3개월</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1년</Button>
                    </div>
                </div>
            </div>
        </div>
        
         <div className="bg-white p-4 flex justify-center border-t border-gray-200 gap-2">
             <Button className="bg-[#555555] hover:bg-[#444444] text-white font-bold h-10 px-6 rounded-sm text-sm">실시간입금확인 실행하기</Button>
             <Button className="bg-[#555555] hover:bg-[#444444] text-white font-bold h-10 px-6 rounded-sm text-sm">통장입금내역 실시간조회</Button>
         </div>
      </div>

       {/* List Header */}
      <div className="flex justify-between items-end mb-2">
          <div className="text-xs text-gray-700 font-bold">
              검색 <span className="text-red-500">0</span>개 / 전체 <span className="text-red-500">0</span>개
          </div>
          <div className="flex gap-1 items-center">
               <Select defaultValue="deposit_date_asc">
                    <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="입금일 ↑" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="deposit_date_asc">입금일 ↑</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="10">
                    <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="10개 보기" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10개 보기</SelectItem>
                    </SelectContent>
                </Select>
          </div>
      </div>

      {/* Table */}
       <div className="border border-gray-300 mb-8 overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse min-w-[1200px]">
              <colgroup>
                  <col className="w-16" />
                  <col className="w-32" />
                  <col className="w-40" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="" />
              </colgroup>
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr className="h-10">
                      <th className="border-r border-[#CDCDCD] font-normal">번호</th>
                      <th className="border-r border-[#CDCDCD] font-normal">입금완료일</th>
                      <th className="border-r border-[#CDCDCD] font-normal">계좌번호</th>
                      <th className="border-r border-[#CDCDCD] font-normal">은행명</th>
                      <th className="border-r border-[#CDCDCD] font-normal">입금금액</th>
                      <th className="border-r border-[#CDCDCD] font-normal">입금자명</th>
                      <th className="border-r border-[#CDCDCD] font-normal">현재상태</th>
                      <th className="border-r border-[#CDCDCD] font-normal">최종 매칭일</th>
                      <th className="border-r border-[#CDCDCD] font-normal">주문번호</th>
                      <th className="font-normal">메모</th>
                  </tr>
              </thead>
              <tbody className="bg-white">
                  <tr>
                      <td colSpan={10} className="py-12 border-b border-gray-200 text-center">
                          <span className="text-orange-500 font-bold">검색된 정보가 없습니다.</span>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

      <div className="flex justify-center mb-10">
           <Button className="bg-[#555555] hover:bg-[#444444] text-white font-bold h-10 w-24 rounded-sm">일괄수정</Button>
      </div>

      <div className="border-t border-gray-300 mb-8"></div>

      {/* Guide Section */}
       <div className="space-y-6 text-gray-600">
           <div>
              <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs mb-3">
                 <BookOpen className="w-4 h-4" /> 
                 <span>안내</span>
              </div>
              
              <div className="space-y-6 text-xs text-gray-500">
                  <div className="space-y-1">
                      <p className="font-bold text-gray-700 text-[13px] mb-2">[주문 정보] 현재상태 항목은 무엇인가요?</p>
                       <p>· 비교·매칭 상태를 보여주는 항목입니다.</p>
                       <p className="pl-2">- 매칭실패 (불일치) : 입금정보가 맞지않아 매칭실패된 주문건으로 관리자는 해당 주문고객을 찾아 처리해야 합니다.</p>
                       <p className="pl-2">- 매칭실패 (동명이인) : 입금정보가 동일한 주문이 2건 이상이 있는 주문건으로 관리자는 해당 주문고객을 찾아 처리해야 합니다.</p>
                       <p className="pl-2">- 관리자입금확인 : 매칭실패건이 나온 경우 관리자는 해당 주문고객을 찾아 직접 입금확인으로 처리한 후 '관리자입금확인' 상태로 변경합니다.</p>
                       <p className="pl-2">- 관리자미확인 : 매칭실패건이 나온 경우 관리자가 입금자를 찾지 못하고 매칭범위에서는 제외시키려면 '관리자미확인' 상태로 변경합니다.</p>
                       <p className="pl-2">- 매칭성공 (by시스템) : 시스템(자동처리/실시간처리)에 의해 입금확인처리가 완료된 주문건입니다.</p>
                       <p className="pl-2">- 매칭성공 (by관리자) : 매칭성공된 주문건중 관리자가 주문리스트에서 이미 입금확인 단계로 처리한 주문건입니다.</p>
                       <p className="pl-2">- 수동매칭 (by관리자id) : '주문/배송{'>'}자동입금확인서비스{'>'}수동매칭' 메뉴에서 관리자가 수동으로 주문서와 매칭한 상태입니다.</p>
                  </div>

                   <div className="space-y-1">
                      <p className="font-bold text-gray-700 text-[13px] mb-2">[주문 정보] 자동입금확인 서비스란 무엇인가요?</p>
                       <p>· 내 쇼핑몰 은행계좌들의 입금내역과 주문내역을 자동으로 비교·매칭하여 통장에 입금된 내역을 자동으로 입금확인 처리하는 서비스입니다.</p>
                       <p>· 서비스개시일로부터 1시간 간격으로 입금내역을 조회하여 자동으로 입금확인 처리합니다.(서비스개시일 이전 주문은 매칭안됨)</p>
                       <p>· 비교·매칭 범위 : 기본적으로 7일간의 입금내역과 37일간의 주문내역을 조회하여 매칭 작업합니다.</p>
                       <p>· 비교·매칭 기준 : 은행, 계좌번호, 금액, 입금자명으로 매칭 작업합니다.</p>
                       <p>· 동일주문의 경우 : 은행, 계좌번호, 금액, 입금자명이 동일한 주문의 경우 '동명이인' 으로 처리되며, 반드시 수작업으로 입금확인 처리해야 합니다.</p>
                       <p>· 비교·매칭 주기 : 1시간 간격으로 자동 처리합니다.</p>
                  </div>

                   <div className="space-y-1">
                      <p className="font-bold text-gray-700 text-[13px] mb-2">[주문 정보] 실시간입금확인 실행하기란 무엇인가요?</p>
                       <p>· 자동 처리되는 1시간 간격보다 빠르게 입금확인처리가 필요한 경우 운영자가 직접 수동으로 입금확인 처리를 실행할 수 있습니다.</p>
                       <p>· 입금내역과 주문내역의 비교·매칭을 수동으로 실행 처리합니다.</p>
                       <p>· 비교·매칭 범위 : 입금일 검색항목 기간의 입금내역과 +30일간의 주문내역을 조회하여 매칭 작업합니다. (기본범위는 7일간의 입금내역, 입금일을 조정하여 수동처리가 가능)</p>
                       <p>· 비교·매칭 기준 : 자동입문행, 계좌번호, 금액, 입금자명으로 매칭 작업합니다.</p>
                  </div>

                  <div className="space-y-1">
                      <p className="font-bold text-gray-700 text-[13px] mb-2">[주문 정보] 통장입금내역 실시간조회란 무엇인가요?</p>
                       <p>· 입금일을 기준으로 입금확인된 내역을 단순히 조회만 하는 기능입니다.</p>
                  </div>
              </div>
           </div>
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
