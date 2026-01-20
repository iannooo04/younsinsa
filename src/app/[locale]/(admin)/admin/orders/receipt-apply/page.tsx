"use client";

import React from "react";
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
  Download,
  ChevronDown
} from "lucide-react";

export default function ReceiptApplyPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold text-gray-900">현금영수증 발급/조회</h1>
            <span className="text-gray-500 text-xs mb-1">현금영수증 신청/대기/완료 처리된 주문 리스트 입니다.</span>
        </div>
        <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 px-4 rounded-sm text-xs">
            현금영수증 개별발급
        </Button>
      </div>

       {/* Search Section */}
      <div className="border border-gray-200 mb-8 border-t-2 border-t-gray-500">
        {/* Search Header */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-[#FBFBFB]">
           <h2 className="font-bold text-gray-700">현금영수증 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="p-0">
             {/* Search Term */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-3 flex gap-2">
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
                     <Input className="w-[400px] h-7 border-gray-300" placeholder="검색어 전체를 정확히 입력하세요." />
                </div>
            </div>

             {/* Period Search */}
             <div className="flex items-center text-xs">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    기간검색
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                     <Select defaultValue="request_date">
                        <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="신청일" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="request_date">신청일</SelectItem>
                        </SelectContent>
                    </Select>
                    
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
                         <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">3개월</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1년</Button>
                    </div>
                </div>
            </div>
        </div>
        
         <div className="bg-white p-4 flex flex-col items-center justify-center border-t border-gray-200 gap-2 relative">
             <div className="absolute left-4 top-4">
                 <button className="text-blue-500 text-xs flex items-center hover:underline">
                     상세검색펼침 <ChevronDown className="w-3 h-3 ml-1" />
                 </button>
             </div>
             <Button className="bg-[#555555] hover:bg-[#444444] text-white font-bold h-10 px-10 rounded-sm text-sm">검색</Button>
         </div>
      </div>

       {/* List Header */}
      <div className="flex justify-between items-end mb-2">
          <div className="text-xs text-gray-700 font-bold flex items-center gap-4">
              <span>검색 <span className="text-red-500">0</span>개 / 전체 <span className="text-red-500">0</span>개</span>
              <span className="text-[#999999] font-normal flex items-center gap-1">
                  <span className="bg-[#666666] text-white w-3 h-3 flex items-center justify-center rounded-[2px] text-[10px]">!</span>
                  현금성 거래 시, 현금영수증이 자동 발행되도록 PG사와 계약한 경우 현금영수증이 이미 발행되었을 수 있으니 PG 관리자에서 확인 후 발급하시기 바랍니다.
              </span>
          </div>
          <div className="flex gap-1 items-center">
               <Select defaultValue="order_no_desc">
                    <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="주문번호 ↓" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="order_no_desc">주문번호 ↓</SelectItem>
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
       <div className="border border-gray-300 mb-4 overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse min-w-[1500px]">
              <colgroup>
                  <col className="w-10" />
                  <col className="w-12" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-20" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-16" />
                  <col className="w-16" />
                  <col className="w-16" />
              </colgroup>
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr className="h-10">
                      <th className="border-r border-[#CDCDCD] font-normal">
                          <Checkbox className="bg-white border-gray-300 rounded-[2px]" />
                      </th>
                      <th className="border-r border-[#CDCDCD] font-normal">번호</th>
                      <th className="border-r border-[#CDCDCD] font-normal">신청일자</th>
                      <th className="border-r border-[#CDCDCD] font-normal">처리일자</th>
                      <th className="border-r border-[#CDCDCD] font-normal">주문번호</th>
                      <th className="border-r border-[#CDCDCD] font-normal">신청자</th>
                      <th className="border-r border-[#CDCDCD] font-normal">과세/면세</th>
                      <th className="border-r border-[#CDCDCD] font-normal">발급금액</th>
                      <th className="border-r border-[#CDCDCD] font-normal">결제방법</th>
                      <th className="border-r border-[#CDCDCD] font-normal">주문상태</th>
                      <th className="border-r border-[#CDCDCD] font-normal">발행상태</th>
                      <th className="border-r border-[#CDCDCD] font-normal">정보</th>
                      <th className="border-r border-[#CDCDCD] font-normal">영수증</th>
                      <th className="font-normal">처리</th>
                  </tr>
              </thead>
              <tbody className="bg-white">
                  <tr>
                      <td colSpan={14} className="py-12 border-b border-gray-200 text-center text-gray-500">
                          검색된 정보가 없습니다.
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

      <div className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-2">
               <span className="text-red-500 font-bold text-xs">✔</span>
               <span className="text-gray-700 font-bold text-xs">선택한 현금영수증을</span>
               <Button variant="outline" className="h-8 px-3 text-xs border-gray-300">일괄발급</Button>
           </div>
           
           <Button variant="outline" className="h-8 px-3 text-xs border-gray-300 text-green-600 hover:text-green-700 hover:bg-green-50 flex items-center gap-1">
               <span className="text-green-600 bg-green-100 p-0.5 rounded-sm"><Download className="w-3 h-3"/></span>
               엑셀 다운로드
           </Button>
      </div>
      
       <div className="flex items-start gap-1 mb-10 text-[11px] text-[#999999]">
            <span className="bg-[#666666] text-white w-3 h-3 flex items-center justify-center rounded-[2px] mt-0.5">!</span>
            <span>현금성 거래 시, 현금영수증이 자동 발행되도록 PG사와 계약한 경우 현금영수증이 이미 발행되었을 수 있으니 PG 관리자에서 확인 후 발급하시기 바랍니다.</span>
       </div>

      <div className="border-t border-gray-300 mb-8"></div>

      {/* Guide Section */}
       <div className="space-y-8 text-gray-600">
           <div>
              <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs mb-3">
                 <BookOpen className="w-4 h-4" /> 
                 <span>안내</span>
              </div>
              
              <div className="space-y-6 text-xs text-gray-500">
                  <div className="space-y-1">
                      <p className="font-bold text-gray-700 text-[13px] mb-2">현금영수증 의무발행</p>
                       <p>· 소득세법 제162조의3, 법인세법 117조의2에 따라 현금영수증 의무발행 업종의 경우, 거래 건당 10만 원 이상 현금 결제시(가상계좌, 계좌이체, 무통장입금) 현금영수증을 반드시 발행하여야 합니다.</p>
                       <p className="underline text-gray-700 mb-1 cursor-pointer">현금영수증 의무발행업종 확인하기 {'>'}</p>
                       <p className="text-red-500">· 소비자가 현금영수증 발급을 요청하지 않는 경우라도 10만원 이상 거래가 발생한 경우 국세청 발급 번호 010-000-1234로 발급하여야 합니다.</p>
                       <p>· 현금성 거래수단으로 10만원 이상 거래 시 마일리지 또는 예치금을 포함하여 결제한 경우에도 현금영수증을 발급하여야 하므로 유의하여 현금영수증을 발급하시기 바랍니다.</p>
                       <p> - 예시) 예치금 2만원, 현금 8만원 결제한 경우에도 현금영수증을 반드시 발급하여야 합니다.</p>
                       <p className="text-red-500">· 현금영수증 발급의무를 위반할 경우 미발급 금액의 20%에 상당하는 과태료가 부과되므로 유의하시기 바랍니다.</p>
                       <p>· 주문처리과정에서 주문정보가 변경된 경우 운영 방침에 맞게 재발행 해주시기 바랍니다.</p>
                  </div>

                   <div className="space-y-1">
                      <p className="font-bold text-gray-700 text-[13px] mb-2">[현금영수증 정보] 발행상태는 무엇인가요?</p>
                       <p>· 발급요청된 현금영수증의 발급상태가 "발급요청/발급완료/발급취소/발급거절/발급실패"로 구분되어 노출됩니다.</p>
                       <p> - 발급요청 : 현금영수증 발급을 신청한 상태입니다.</p>
                       <p> - 발급완료 : 현금영수증이 발급된 상태입니다.</p>
                       <p> - 발급취소 : 현금영수증 발급 후 취소한 상태입니다.</p>
                       <p> - 발급거절 : 현금영수증 발급 신청을 거절한 상태입니다.</p>
                       <p> - 발급실패 : 현금영수증 발급 신청하였으나 실패한 상태입니다.</p>
                  </div>

                   <div className="space-y-1">
                      <p className="font-bold text-gray-700 text-[13px] mb-2">[현금영수증 정보] 상태별 처리 방법이 달라지나요?</p>
                       <p>· 현금영수증의 발행상태에 따라 처리할 수 있는 상태가 달라집니다.</p>
                       <p> - 발급 : 발행상태가 "발급요청"일 때 처리할 수 있습니다.</p>
                       <p> - 거절 : 발행상태가 "발급요청"일 때 처리할 수 있습니다.</p>
                       <p> - 재요청 : 발행상태가 "발급거절 및 발행실패"일 때 처리할 수 있습니다.</p>
                       <p> - 취소 : 발행상태가 "발급완료"일 때 처리할 수 있습니다.</p>
                       <p> - 삭제 : 발행상태가 "발급거절"이거나, "발급취소"일 때 처리할 수 있습니다.</p>
                       <p> - 영수증 : 발행상태가 "발급완료"일 때 확인할 수 있습니다.</p>
                  </div>

                  <div className="space-y-1">
                      <p className="font-bold text-gray-700 text-[13px] mb-2">현금영수증 처리 시 주의사항</p>
                       <p>· 현금영수증 발급 요청 시 주문자명에 특수문자((쉼표(,), `, &, ;,₩,|, `,`,{`<`},{`>`})는 제외하고 신청되므로 실제 주문자명과 다를 수 있습니다.</p>
                       <p>· 자동 발급의 경우 입금 시 자동 발급되며, 주문 전체 환불완료 시 자동 취소됩니다.</p>
                       <p>· 관리자 직접 발급을 원하실 경우 [발급]버튼을 클릭하시면 현금영수증이 발급 됩니다. (주문 전체 환불완료 시 자동 취소됩니다.)</p>
                       <p>· 주문상태가 결제완료 일때 발급을 해주시고, 환불시에는 [취소] 버튼으로 취소처리하시면 됩니다.</p>
                       <p>· 주문상태는 주문처리 단계 중 후순위 단계가 우선 표시되며, 정상과 클레임 상태가 모두 포함된 경우 클레임 상태가 우선 표시됩니다.</p>
                       <p>· 현금영수증 신청/발급 주문에 포함된 일부 상품의 처리상태만 변경된 경우에도 주문상태가 업데이트 됩니다.</p>
                       <p className="pl-2"> - 정상 상태 : 구매확정 {'>'} 배송완료 {'>'} 배송 {'>'} 상품준비 {'>'} 결제 {'>'} 미입금</p>
                       <p className="pl-2"> - 클레임 상태 : 환불 {'>'} 반품 {'>'} 교환 {'>'} 취소</p>
                       <p>· [영수증] 버튼을 클릭하시면 발급 또는 발급취소 된 현금영수증을 확인할 수 있습니다.</p>
                       <p>· 결제금액의 변동이 있는 현금영수증 신청건은 금액이 빨간색으로 변경되어 표시됩니다.(금액표시형태 : <span className="text-red-500">1,000원</span>)</p>
                       <p className="text-blue-500">· 빨간색으로 표시된 발급금액을 클릭하면 재발급처리가 가능합니다.</p>
                       <p className="text-red-500">· 변경된 주문서 결제금액은 자동으로 출력됩니다.</p>
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
