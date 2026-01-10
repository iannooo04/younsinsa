"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  Calendar,
  FileSpreadsheet,
  AlertCircle,
  BookOpen
} from "lucide-react";

export default function CategoryAnalysisPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">카테고리 분석</h1>
      </div>

      {/* Search Section */}
      <div className="border border-gray-200 mb-8 overflow-hidden rounded-[4px]">
        <div className="bg-[#f8fafc] px-4 py-2 border-b border-gray-200 flex items-center gap-1 font-bold text-gray-700">
          카테고리 검색 <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </div>
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr className="border-b border-gray-100">
                <th className="bg-[#f8fafc] w-32 px-4 py-3 font-normal text-gray-600 border-r border-gray-100 uppercase">상점</th>
                <td className="px-4 py-3">
                  <RadioGroup defaultValue="all" className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 leading-none">
                      <RadioGroupItem value="all" id="store-all" className="w-3.5 h-3.5 text-red-500 border-gray-300" />
                      <Label htmlFor="store-all" className="text-xs font-normal text-gray-600 cursor-pointer">전체</Label>
                    </div>
                    <div className="flex items-center gap-1.5 leading-none">
                      <RadioGroupItem value="base" id="store-base" className="w-3.5 h-3.5 text-red-500 border-gray-300" />
                      <Label htmlFor="store-base" className="text-xs font-normal text-gray-600 cursor-pointer flex items-center gap-1">
                        <img src="https://flagcdn.com/w20/kr.png" alt="KR" className="w-4 h-2.5 object-cover" /> 기준몰
                      </Label>
                    </div>
                    <div className="flex items-center gap-1.5 leading-none">
                      <RadioGroupItem value="cn" id="store-cn" className="w-3.5 h-3.5 text-red-500 border-gray-300" />
                      <Label htmlFor="store-cn" className="text-xs font-normal text-gray-600 cursor-pointer flex items-center gap-1">
                        <img src="https://flagcdn.com/w20/cn.png" alt="CN" className="w-4 h-2.5 object-cover" /> 중문몰
                      </Label>
                    </div>
                  </RadioGroup>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <th className="bg-[#f8fafc] w-32 px-4 py-3 font-normal text-gray-600 border-r border-gray-100">기간검색</th>
                <td className="px-4 py-3 text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="relative">
                      <Input defaultValue="2026-01-05" className="w-32 h-7 text-xs border-gray-300 rounded-[2px] pl-2 pr-7 px-0 py-0" />
                      <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2 blur-[0.2px]" />
                    </div>
                    <span className="text-gray-400 mx-1">~</span>
                    <div className="relative">
                      <Input defaultValue="2026-01-11" className="w-32 h-7 text-xs border-gray-300 rounded-[2px] pl-2 pr-7 px-0 py-0" />
                      <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2 blur-[0.2px]" />
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                       <PeriodButton label="오늘" />
                       <PeriodButton label="7일" active />
                       <PeriodButton label="15일" />
                       <PeriodButton label="1개월" />
                       <PeriodButton label="3개월" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-100 text-gray-600">
                <th className="bg-[#f8fafc] w-32 px-4 py-3 font-normal text-gray-600 border-r border-gray-100">카테고리</th>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 flex-wrap">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40 h-7 text-xs rounded-[2px] border-gray-300">
                        <SelectValue placeholder="=카테고리선택=" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">=카테고리선택=</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40 h-7 text-xs rounded-[2px] border-gray-300">
                        <SelectValue placeholder="=카테고리선택=" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="all">=카테고리선택=</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40 h-7 text-xs rounded-[2px] border-gray-300">
                        <SelectValue placeholder="=카테고리선택=" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="all">=카테고리선택=</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40 h-7 text-xs rounded-[2px] border-gray-300">
                        <SelectValue placeholder="=카테고리선택=" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="all">=카테고리선택=</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </td>
              </tr>
              <tr className="text-gray-600">
                <th className="bg-[#f8fafc] w-32 px-4 py-3 font-normal text-gray-600 border-r border-gray-100">검색범위</th>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Select defaultValue="1">
                      <SelectTrigger className="w-48 h-7 text-xs rounded-[2px] border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">카테고리 미지정 상품 미포함</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="1">
                      <SelectTrigger className="w-40 h-7 text-xs rounded-[2px] border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">하위 카테고리 포함</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="1">
                      <SelectTrigger className="w-48 h-7 text-xs rounded-[2px] border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">대표카테고리 기준 데이터 표시</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="bg-white px-4 py-3 border-t border-gray-100 space-y-1">
             <div className="flex items-start gap-1.5 text-red-500">
               <AlertCircle className="w-3.5 h-3.5 mt-0.5 fill-red-500 text-white" />
               <span>통계 데이터는 2시간마다 집계되므로 주문데이터와 약 1시간~2시간의 데이터 오차가 있을 수 있습니다.</span>
             </div>
             <div className="flex items-start gap-1.5 text-red-500">
               <AlertCircle className="w-3.5 h-3.5 mt-0.5 fill-red-500 text-white" />
               <span>다중카테고리 기준 데이터가 2018년 12월 05일부터 제공됨에 따라 2018년 12월 05일 이전 데이터는 다중카테고리 기준 데이터가 제공되지 않습니다.</span>
             </div>
          </div>
          <div className="flex justify-center p-6 border-t border-gray-100">
            <Button className="w-20 h-9 bg-[#666] hover:bg-[#555] text-white rounded-none font-normal text-sm">검색</Button>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-3 border-t-2 border-gray-300 bg-white mb-8">
        <SummaryBox label="총 상품금액" value="0" />
        <SummaryBox label="총 구매수량" value="0" />
        <SummaryBox label="총 구매건수" value="0" />
      </div>

      {/* Table Section */}
      <div className="mb-12">
        <div className="flex justify-end mb-2">
           <Button variant="outline" className="h-[26px] px-3 gap-1 text-[11px] font-normal border-gray-300 rounded-[4px] bg-white text-gray-600">
            <FileSpreadsheet className="w-3.5 h-3.5 text-green-600" /> 엑셀 다운로드
          </Button>
        </div>
        <div className="border border-gray-300 overflow-hidden">
          <table className="w-full text-center border-collapse text-gray-600 text-[11px]">
            <thead>
              <tr className="bg-[#f8fafc] text-gray-700 font-bold border-b border-gray-300">
                <th rowSpan={2} className="px-2 py-4 border-r border-gray-200">순위</th>
                <th rowSpan={2} className="px-2 py-4 border-r border-gray-200">카테고리 코드</th>
                <th rowSpan={2} className="px-2 py-4 border-r border-gray-200 min-w-[120px]">카테고리 명</th>
                <th colSpan={4} className="border-r border-gray-200 h-9">상품금액</th>
                <th colSpan={4} className="h-9">구매수량</th>
              </tr>
              <tr className="bg-[#f8fafc] text-gray-700 font-bold border-b border-gray-300 h-9">
                <th className="px-2 border-r border-gray-200 font-normal text-[10px]">PC</th>
                <th className="px-2 border-r border-gray-200 font-normal text-[10px]">모바일</th>
                <th className="px-2 border-r border-gray-200 font-normal text-[10px]">수기주문</th>
                <th className="px-2 border-r border-gray-200 bg-[#f1f1f1] w-20">합계</th>
                <th className="px-2 border-r border-gray-200 font-normal text-[10px]">PC</th>
                <th className="px-2 border-r border-gray-200 font-normal text-[10px]">모바일</th>
                <th className="px-2 border-r border-gray-200 font-normal text-[10px]">수기주문</th>
                <th className="px-2 bg-[#f1f1f1] w-20">합계</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-[120px] text-gray-700">
                <td colSpan={11} className="text-center font-bold">데이터가 존재하지 않습니다.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Guide Section */}
      <div className="border-t-2 border-gray-800 pt-6 space-y-8 text-gray-700 mb-20 text-[12px]">
        <div className="flex items-center gap-1.5 text-blue-600 font-bold mb-2">
          <BookOpen className="w-4 h-4" /> 안내
        </div>
        
        <div className="space-y-4">
          <section>
            <h3 className="font-bold mb-1">[통계 정보] 카테고리 분석의 기준은 무엇인가요?</h3>
            <ul className="list-none space-y-0.5 pl-2">
              <li>· 카테고리 분석의 데이터는 상품에 등록된 "대표카테고리"를 기준으로 집계됩니다.</li>
              <li>· 카테고리가 연결되지 않은 상품의 데이터는 집계되지 않습니다.</li>
              <li>· 해당 기간동안 결제가 완료된 상품의 데이터가 집계됩니다.</li>
              <li>· 결제완료 이후 "취소 / 교환 / 반품 / 환불" 건의 데이터는 적용되지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold mb-1">[통계 정보] 상품금액이란 무엇인가요?</h3>
            <ul className="list-none space-y-0.5 pl-2">
              <li>· 상품금액은 결제완료된 상품의 판매가에 구매수량을 곱한 금액입니다.</li>
              <li>· 상품금액은 실제 결제금액이 아니며, 회원 / 쿠폰 할인 / 마일리지 / 예치금 사용 금액 등은 차감되지 않습니다.</li>
              <li>· 상품금액에는 옵션가가 반영되지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold mb-1">[통계 정보] 순위선정 기준은 무엇인가요?</h3>
            <ul className="list-none space-y-0.5 pl-2">
              <li>· 순위는 "상품금액"이 가장 높은 순으로 적용되며, 동일한 값이 있는 경우 "카테고리 코드, 카테고리명"의 오름차순으로 적용됩니다.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold mb-1">[통계 정보] 주문된 상품의 판매가와 집계된 금액이 차이가 나는 경우가 있나요?</h3>
            <ul className="list-none space-y-0.5 pl-2">
              <li>· 상품의 판매가를 변경하였을 경우, 당일 주문 건에 한해 실제 판매가와 집계된 금액의 차이가 발생할 수 있습니다.</li>
            </ul>
          </section>
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

      {/* Footer */}
      <div className="mt-12 py-6 text-center text-[11px] text-gray-500 border-t border-gray-100 italic">
        © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500 font-normal">5.1.23.1206.5ccf2dd6</span>)
      </div>
    </div>
  );
}

function PeriodButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button className={`h-6 px-3 text-[11px] border ${active ? 'bg-[#777] border-[#777] text-white' : 'bg-white text-gray-600 border-gray-300'} rounded-[2px] transition-none`}>
      {label}
    </button>
  );
}

function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-gray-200 last:border-r-0">
      <div className="bg-[#eaf1f7] text-gray-700 font-bold h-10 flex items-center justify-center border-b border-gray-200">
        {label}
      </div>
      <div className="p-4 bg-white">
        <div className="text-2xl font-normal text-center mb-4 text-gray-900">{value}</div>
        <div className="border border-gray-100">
          <table className="w-full text-center border-collapse text-[10px] text-gray-500">
             <tbody>
                <tr className="border-b border-gray-100 h-7">
                  <th className="bg-white px-2 font-normal border-r border-gray-100 w-1/3">PC</th>
                  <th className="bg-white px-2 font-normal border-r border-gray-100 w-1/3">모바일</th>
                  <th className="bg-white px-2 font-normal w-1/3">수기주문</th>
                </tr>
                <tr className="h-7 text-gray-900">
                  <td className="px-2 border-r border-gray-100">0</td>
                  <td className="px-2 border-r border-gray-100">0</td>
                  <td className="px-2">0</td>
                </tr>
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
