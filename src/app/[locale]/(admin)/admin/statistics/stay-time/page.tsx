"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  Calendar,
  FileSpreadsheet
} from "lucide-react";

export default function StayTimePage() {
  const stayTimeData = [
    { date: "2026-01-04", m1: 0, m3: 0, m5: 0, m10: 0, m15: 0, m30: 0, h1: 0, h1plus: 0, totalTime: "0:00:00", visitors: 0, perVisitor: "0:00:00" },
    { date: "2026-01-05", m1: 3, m3: 0, m5: 0, m10: 0, m15: 0, m30: 0, h1: 0, h1plus: 0, totalTime: "0:00:15", visitors: 3, perVisitor: "0:00:05" },
    { date: "2026-01-06", m1: 3, m3: 0, m5: 0, m10: 0, m15: 0, m30: 0, h1: 0, h1plus: 0, totalTime: "0:00:03", visitors: 3, perVisitor: "0:00:01" },
    { date: "2026-01-07", m1: 1, m3: 0, m5: 0, m10: 0, m15: 0, m30: 0, h1: 0, h1plus: 0, totalTime: "0:00:03", visitors: 1, perVisitor: "0:00:03" },
    { date: "2026-01-08", m1: 1, m3: 0, m5: 0, m10: 0, m15: 0, m30: 0, h1: 0, h1plus: 0, totalTime: "0:00:01", visitors: 1, perVisitor: "0:00:01" },
    { date: "2026-01-09", m1: 0, m3: 0, m5: 0, m10: 0, m15: 0, m30: 0, h1: 0, h1plus: 0, totalTime: "0:00:00", visitors: 0, perVisitor: "0:00:00" },
    { date: "2026-01-10", m1: 0, m3: 0, m5: 0, m10: 0, m15: 0, m30: 0, h1: 0, h1plus: 0, totalTime: "0:00:00", visitors: 0, perVisitor: "0:00:00" },
  ];

  const categories = [
    "1분 미만",
    "3분 미만",
    "5분 미만",
    "10분 미만",
    "15분 미만",
    "30분 미만",
    "1시간 미만",
    "1시간 이상"
  ];

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">쇼핑몰 체류시간</h1>
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
              <PeriodButton label="어제" />
              <PeriodButton label="7일" active />
              <PeriodButton label="15일" />
              <PeriodButton label="1개월" />
              <PeriodButton label="3개월" />
              <PeriodButton label="1년" />
              <div className="flex items-center gap-1 ml-4">
                <div className="relative">
                  <Input defaultValue="2026-01-04" className="w-32 h-8 text-xs border-gray-200 rounded-[4px] pl-3 pr-8" />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" />
                </div>
                <span className="text-gray-400">-</span>
                <div className="relative">
                  <Input defaultValue="2026-01-10" className="w-32 h-8 text-xs border-gray-200 rounded-[4px] pl-3 pr-8" />
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
        </div>

        <div className="flex flex-col gap-2">
          <Button className="w-24 h-8 text-xs font-bold bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[4px] border-0">검색</Button>
          <Button variant="outline" className="w-24 h-8 text-xs font-bold border-gray-200 rounded-[4px] bg-white text-gray-700">초기화</Button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white border border-gray-100 rounded-[20px] p-8 shadow-sm mb-8">
        <h2 className="text-base font-bold text-gray-800 mb-6">통계 요약</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#f8fafc] rounded-[12px] p-6">
            <div className="text-gray-500 text-[11px] mb-2 font-medium">전체 방문자 수</div>
            <div className="text-2xl font-bold text-gray-900">8</div>
          </div>
          <div className="bg-[#f8fafc] rounded-[12px] p-6">
            <div className="text-gray-500 text-[11px] mb-2 font-medium">총 체류시간</div>
            <div className="text-2xl font-bold text-gray-900">00시 00분 22초</div>
          </div>
          <div className="bg-[#f8fafc] rounded-[12px] p-6">
            <div className="text-gray-500 text-[11px] mb-2 font-medium">방문자당 체류시간</div>
            <div className="text-2xl font-bold text-gray-900">00시 00분 02초</div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white border border-gray-100 rounded-[20px] p-10 shadow-sm mb-8">
        <div className="relative h-[400px] w-full flex">
          {/* Y Axis Labels */}
          <div className="flex flex-col justify-between h-[350px] w-20 text-right pr-4 text-gray-600 font-medium">
            {categories.map((cat, i) => (
              <span key={i} className="leading-none">{cat}</span>
            ))}
          </div>
          {/* Chart Area */}
          <div className="flex-1 relative h-[350px] border-l border-b border-gray-300">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex justify-between px-0">
              {[0, 2, 4, 6, 8].map((val) => (
                <div key={val} className="h-full w-px bg-gray-100 relative">
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-gray-600 font-medium">{val}</span>
                </div>
              ))}
            </div>
            {/* Bars */}
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              <div className="h-5 bg-[#9494C1] rounded-r-[2px] w-[100%] transition-all duration-1000" />
              <div className="h-5 w-0" />
              <div className="h-5 w-0" />
              <div className="h-5 w-0" />
              <div className="h-5 w-0" />
              <div className="h-5 w-0" />
              <div className="h-5 w-0" />
              <div className="h-5 w-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Detail Table Container */}
      <div className="bg-white border border-gray-100 rounded-[20px] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-gray-800">통계 상세</h2>
          <Button variant="outline" className="h-[26px] px-3 gap-1 text-[11px] font-normal border-gray-300 rounded-[4px] bg-white text-gray-600">
            <FileSpreadsheet className="w-3.5 h-3.5 text-green-600" /> 엑셀 다운로드
          </Button>
        </div>
        
        <div className="border border-gray-100 rounded-[12px] overflow-hidden">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] h-12 border-b border-gray-100 text-gray-600 font-bold">
                <th rowSpan={2} className="px-4 border-r border-gray-100 min-w-[100px]">일자</th>
                <th colSpan={8} className="px-4 border-b border-r border-gray-100">체류시간별 방문자 수</th>
                <th rowSpan={2} className="px-4 border-r border-gray-100">총 체류시간</th>
                <th rowSpan={2} className="px-4 border-r border-gray-100">전체 방문자 수</th>
                <th rowSpan={2} className="px-4">방문자당 체류시간</th>
              </tr>
              <tr className="bg-[#f8fafc] h-10 border-b border-gray-100 text-[10px] text-gray-500 font-bold">
                <th className="px-2 border-r border-gray-100 font-bold">1분 미만</th>
                <th className="px-2 border-r border-gray-100 font-bold">3분 미만</th>
                <th className="px-2 border-r border-gray-100 font-bold">5분 미만</th>
                <th className="px-2 border-r border-gray-100 font-bold">10분 미만</th>
                <th className="px-2 border-r border-gray-100 font-bold">15분 미만</th>
                <th className="px-2 border-r border-gray-100 font-bold">30분 미만</th>
                <th className="px-2 border-r border-gray-100 font-bold">1시간 미만</th>
                <th className="px-2 border-r border-gray-100 font-bold">1시간 이상</th>
              </tr>
            </thead>
            <tbody>
              {stayTimeData.map((row, idx) => (
                <tr key={idx} className="h-10 border-b border-gray-50 text-gray-700 hover:bg-gray-50/50">
                  <td className="px-4 border-r border-gray-50 font-normal">{row.date}</td>
                  <td className="px-2 border-r border-gray-50 font-normal">{row.m1}</td>
                  <td className="px-2 border-r border-gray-50 font-normal">{row.m3}</td>
                  <td className="px-2 border-r border-gray-50 font-normal">{row.m5}</td>
                  <td className="px-2 border-r border-gray-50 font-normal">{row.m10}</td>
                  <td className="px-2 border-r border-gray-50 font-normal">{row.m15}</td>
                  <td className="px-2 border-r border-gray-50 font-normal">{row.m30}</td>
                  <td className="px-2 border-r border-gray-50 font-normal">{row.h1}</td>
                  <td className="px-2 border-r border-gray-50 font-normal">{row.h1plus}</td>
                  <td className="px-4 border-r border-gray-50 font-normal">{row.totalTime}</td>
                  <td className="px-4 border-r border-gray-50 font-normal">{row.visitors}</td>
                  <td className="px-4 font-normal">{row.perVisitor}</td>
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
