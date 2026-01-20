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
  FileSpreadsheet
} from "lucide-react";

export default function SignupCountPage() {
  const signupData = [
    { date: "2026-01-04", count: 0, ratio: "0%" },
    { date: "2026-01-05", count: 0, ratio: "0%" },
    { date: "2026-01-06", count: 0, ratio: "0%" },
    { date: "2026-01-07", count: 0, ratio: "0%" },
    { date: "2026-01-08", count: 0, ratio: "0%" },
    { date: "2026-01-09", count: 0, ratio: "0%" },
    { date: "2026-01-10", count: 0, ratio: "0%" },
    { date: "2026-01-11", count: 0, ratio: "0%" },
  ];

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">회원가입 수</h1>
      </div>

      {/* Filter Section */}
      <div className="border border-gray-100 rounded-[20px] p-8 mb-8 flex justify-between items-center shadow-sm">
        <div className="space-y-6 flex-1">
          {/* Store */}
          <div className="flex items-center gap-8">
            <span className="w-20 font-bold text-gray-700">상점</span>
            <RadioGroup defaultValue="all" className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 leading-none">
                <RadioGroupItem value="all" id="store-all" className="w-4 h-4 text-red-500 border-gray-300" />
                <Label htmlFor="store-all" className="text-xs font-normal text-gray-600">전체</Label>
              </div>
              <div className="flex items-center gap-1.5 leading-none">
                <RadioGroupItem value="base" id="store-base" className="w-4 h-4 text-red-500 border-gray-300" />
                <Label htmlFor="store-base" className="text-xs font-normal text-gray-600">기준몰</Label>
              </div>
              <div className="flex items-center gap-1.5 leading-none">
                <RadioGroupItem value="en" id="store-en" className="w-4 h-4 text-red-500 border-gray-300" />
                <Label htmlFor="store-en" className="text-xs font-normal text-gray-600">영문몰</Label>
              </div>
              <div className="flex items-center gap-1.5 leading-none">
                <RadioGroupItem value="cn" id="store-cn" className="w-4 h-4 text-red-500 border-gray-300" />
                <Label htmlFor="store-cn" className="text-xs font-normal text-gray-600">중문몰</Label>
              </div>
              <div className="flex items-center gap-1.5 leading-none">
                <RadioGroupItem value="jp" id="store-jp" className="w-4 h-4 text-red-500 border-gray-300" />
                <Label htmlFor="store-jp" className="text-xs font-normal text-gray-600">일문몰</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Period */}
          <div className="flex items-center gap-8">
            <span className="w-20 font-bold text-gray-700">기간</span>
            <div className="flex items-center gap-1">
              <PeriodButton label="오늘" />
              <PeriodButton label="7일" active />
              <PeriodButton label="15일" />
              <PeriodButton label="1개월" />
              <PeriodButton label="3개월" />
              <PeriodButton label="1년" />
              <div className="flex items-center gap-1 ml-4">
                <div className="relative">
                  <Input defaultValue="2026-01-04" className="w-32 h-8 text-xs border-gray-300 rounded-[8px] pl-3 pr-8" />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" />
                </div>
                <span className="text-gray-400">-</span>
                <div className="relative">
                  <Input defaultValue="2026-01-11" className="w-32 h-8 text-xs border-gray-300 rounded-[8px] pl-3 pr-8" />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Platform Type */}
          <div className="flex items-center gap-8">
            <span className="w-20 font-bold text-gray-700">플랫폼 유형</span>
            <RadioGroup defaultValue="all" className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 leading-none">
                <RadioGroupItem value="all" id="plat-all" className="w-4 h-4 text-red-500 border-gray-300" />
                <Label htmlFor="plat-all" className="text-xs font-normal text-gray-600">전체</Label>
              </div>
              <div className="flex items-center gap-1.5 leading-none">
                <RadioGroupItem value="pc" id="plat-pc" className="w-4 h-4 text-red-500 border-gray-300" />
                <Label htmlFor="plat-pc" className="text-xs font-normal text-gray-600">PC</Label>
              </div>
              <div className="flex items-center gap-1.5 leading-none">
                <RadioGroupItem value="mweb" id="plat-mweb" className="w-4 h-4 text-red-500 border-gray-300" />
                <Label htmlFor="plat-mweb" className="text-xs font-normal text-gray-600">모바일 웹</Label>
              </div>
              <div className="flex items-center gap-1.5 leading-none">
                <RadioGroupItem value="mapp" id="plat-mapp" className="w-4 h-4 text-red-500 border-gray-300" />
                <Label htmlFor="plat-mapp" className="text-xs font-normal text-gray-600">모바일 앱</Label>
              </div>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </RadioGroup>
          </div>

          {/* Statistical Unit */}
          <div className="flex items-center gap-8">
            <span className="w-20 font-bold text-gray-700">통계 단위</span>
            <Select defaultValue="day">
              <SelectTrigger className="w-32 h-8 text-xs border-gray-300 rounded-[8px]">
                <SelectValue placeholder="일 단위" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">일 단위</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button className="w-24 h-9 text-xs font-bold bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[4px] border-0">검색</Button>
          <Button variant="outline" className="w-24 h-9 text-xs font-bold border-gray-300 rounded-[4px] bg-white text-gray-700">초기화</Button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white border border-gray-100 rounded-[20px] p-8 mb-8 shadow-sm">
        <h2 className="text-base font-bold text-gray-800 mb-8">통계 요약</h2>
        <div className="grid grid-cols-3 gap-4">
          <SummaryCard label="회원가입 수" value="0" />
          <SummaryCard label="최대 회원가입 수" value="0" sub="2026-01-04" />
          <SummaryCard label="최소 회원가입 수" value="0" sub="2026-01-04" />
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white border border-gray-100 rounded-[20px] p-12 mb-8 shadow-sm">
        <div className="relative h-64 w-full">
           <SignupChartMock />
        </div>
        <div className="mt-8 flex justify-center gap-6">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              <div className="w-4 h-[1px] bg-[#FF6358]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF6358] border border-white -mx-1" />
              <div className="w-4 h-[1px] bg-[#FF6358]" />
            </div>
            <span className="text-[11px] text-gray-500">회원가입 수</span>
          </div>
        </div>
      </div>

      {/* Detail Table Section */}
      <div className="bg-white border border-gray-100 rounded-[20px] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-gray-800">통계 상세</h2>
          <Button variant="outline" className="h-[26px] px-3 gap-1 text-[11px] font-normal border-gray-300 rounded-[4px] bg-white text-gray-600">
            <FileSpreadsheet className="w-3.5 h-3.5 text-green-600" /> 엑셀 다운로드
          </Button>
        </div>
        <div className="border border-gray-100 rounded-[12px] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] h-10 border-b border-gray-100 text-gray-600 font-bold">
                <th className="px-6 border-r border-gray-100 w-1/3">일</th>
                <th className="px-6 border-r border-gray-100 w-1/3">회원가입 수</th>
                <th className="px-6 w-1/3">비율</th>
              </tr>
            </thead>
            <tbody>
              {signupData.map((row, idx) => (
                <tr key={idx} className="h-10 border-b border-gray-50 text-gray-700 hover:bg-gray-50/50">
                  <td className="px-6 border-r border-gray-50 font-normal">{row.date}</td>
                  <td className="px-6 border-r border-gray-50 font-normal">{row.count}</td>
                  <td className="px-6 font-normal">{row.ratio}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
      <div className="mt-12 py-6 text-center text-[11px] text-gray-400">
        © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
      </div>
    </div>
  );
}

function PeriodButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button className={`h-8 px-4 text-xs border ${active ? 'bg-white border-gray-400 text-gray-900 font-bold' : 'bg-white text-gray-500 border-gray-200'} first:rounded-l-[8px] last:rounded-r-[8px] -ml-[px] hover:z-10`}>
      {label}
    </button>
  );
}

function SummaryCard({ label, value, sub, active = false }: { label: string; value: string; sub?: string; active?: boolean }) {
  return (
    <div className={`p-6 rounded-[16px] border ${active ? 'bg-[#E3F2FD] border-[#90CAF9]/30' : 'bg-[#F8FAFC] border-gray-50'}`}>
      <div className={`text-[11px] mb-3 font-normal ${active ? 'text-[#1E88E5]' : 'text-gray-500'}`}>{label}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      {sub && <div className="text-[10px] text-gray-400 mt-2 font-normal text-right">{sub}</div>}
    </div>
  );
}

function SignupChartMock() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="none">
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map((val) => (
        <React.Fragment key={val}>
           <line x1="50" y1={180 - (val / 4) * 160} x2="950" y2={180 - (val / 4) * 160} stroke="#f1f5f9" strokeWidth="1" />
           <text x="40" y={185 - (val / 4) * 160} fill="#94a3b8" fontSize="10" textAnchor="end">{val}</text>
        </React.Fragment>
      ))}
      
      {/* Dates X-axis */}
      {["2026-01-04", "2026-01-05", "2026-01-06", "2026-01-07", "2026-01-08", "2026-01-09", "2026-01-10", "2026-01-11"].map((date, i) => (
        <text key={date} x={50 + i * (900 / 7)} y="195" fill="#94a3b8" fontSize="10" textAnchor="middle" transform={`rotate(-15, ${50 + i * (900 / 7)}, 195)`}>{date}</text>
      ))}

      {/* Data Line (Zero currently) */}
      <line x1="50" y1="180" x2="950" y2="180" stroke="#FF6358" strokeWidth="1" />
    </svg>
  );
}
