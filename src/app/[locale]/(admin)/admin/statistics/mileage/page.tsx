"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  Calendar,
  FileSpreadsheet
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MileageAnalysisPage() {
  const [activeTab, setActiveTab] = useState("daily");

  const detailData = [
    { date: "2026-01-05", remain: 0, giveCount: 0, giveAmount: 0, useCount: 0, useAmount: 0, expireCount: 0, expireAmount: 0 },
    { date: "2026-01-06", remain: 0, giveCount: 0, giveAmount: 0, useCount: 0, useAmount: 0, expireCount: 0, expireAmount: 0 },
    { date: "2026-01-07", remain: 0, giveCount: 0, giveAmount: 0, useCount: 0, useAmount: 0, expireCount: 0, expireAmount: 0 },
    { date: "2026-01-08", remain: 0, giveCount: 0, giveAmount: 0, useCount: 0, useAmount: 0, expireCount: 0, expireAmount: 0 },
    { date: "2026-01-09", remain: 0, giveCount: 0, giveAmount: 0, useCount: 0, useAmount: 0, expireCount: 0, expireAmount: 0 },
    { date: "2026-01-10", remain: 0, giveCount: 0, giveAmount: 0, useCount: 0, useAmount: 0, expireCount: 0, expireAmount: 0 },
    { date: "2026-01-11", remain: 0, giveCount: 0, giveAmount: 0, useCount: 0, useAmount: 0, expireCount: 0, expireAmount: 0 },
  ];

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">회원 마일리지 분석</h1>
      </div>

      {/* Search Section */}
      <div className="border border-gray-200 mb-8 overflow-hidden rounded-[4px]">
        <div className="bg-[#f8fafc] px-4 py-2 border-b border-gray-200 flex items-center gap-1 font-bold text-gray-700">
          마일리지 검색 <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </div>
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr>
                <th className="bg-[#f8fafc] w-32 px-4 py-3 font-normal text-gray-600 border-r border-gray-100">기간검색</th>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <div className="relative">
                      <Input defaultValue="2026-01-05" className="w-32 h-7 text-xs border-gray-300 rounded-[2px] pl-2 pr-7 px-0 py-0" />
                      <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2" />
                    </div>
                    <span className="text-gray-400">~</span>
                    <div className="relative">
                      <Input defaultValue="2026-01-11" className="w-32 h-7 text-xs border-gray-300 rounded-[2px] pl-2 pr-7 px-0 py-0" />
                      <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2" />
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
            </tbody>
          </table>
          <div className="flex justify-center p-6 border-t border-gray-100">
            <Button className="w-20 h-9 bg-[#666] hover:bg-[#555] text-white rounded-none font-normal text-sm">검색</Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b border-gray-300 w-full justify-start rounded-none h-10 p-0 overflow-hidden">
            <TabsTrigger value="daily" className="px-6 h-full data-[state=active]:bg-white data-[state=active]:border-2 data-[state=active]:border-b-0 data-[state=active]:border-gray-300 rounded-none bg-[#f8fafc] border border-gray-200 border-b-0 text-gray-600 font-normal transition-none mr-[-1px]">일별 마일리지 현황</TabsTrigger>
            <TabsTrigger value="monthly" className="px-6 h-full border border-gray-200 border-b-0 rounded-none bg-[#f8fafc] text-gray-600 font-normal transition-none">월별 마일리지 현황</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Summary Table */}
      <div className="border border-gray-200 overflow-hidden mb-8">
        <table className="w-full text-center border-collapse text-[10px]">
          <thead>
            <tr className="bg-[#f8fafc] text-gray-600 h-10 border-b border-gray-200">
              <th className="px-2 border-r border-gray-200 font-normal bg-[#eaf1f7] text-gray-700">총 잔여 마일리지</th>
              <th className="px-2 border-r border-gray-200 font-normal">총 지급건수</th>
              <th className="px-2 border-r border-gray-200 font-normal">총 지급금액</th>
              <th className="px-2 border-r border-gray-200 font-normal">총 사용건수</th>
              <th className="px-2 border-r border-gray-200 font-normal">총 사용금액</th>
              <th className="px-2 border-r border-gray-200 font-normal">총 소멸건수</th>
              <th className="px-2 font-normal">총 소멸금액</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-14 text-[13px] text-gray-900 border-b border-gray-200">
              <td className="px-2 border-r border-gray-100 bg-blue-50/20">0</td>
              <td className="px-2 border-r border-gray-100">0</td>
              <td className="px-2 border-r border-gray-100">0</td>
              <td className="px-2 border-r border-gray-100">0</td>
              <td className="px-2 border-r border-gray-100">0</td>
              <td className="px-2 border-r border-gray-100">0</td>
              <td className="px-2">0</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Chart Section */}
      <div className="border border-gray-300 p-8 mb-8 relative">
        <div className="h-[300px] w-full border-l border-b border-gray-300 relative">
          {/* Y Axis */}
          <div className="absolute left-[-25px] h-full flex flex-col justify-between py-0 text-gray-700 font-medium">
            <span>6</span>
            <span>4</span>
            <span>2</span>
            <span>0</span>
          </div>
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="w-full h-px bg-gray-100" />
            <div className="w-full h-px bg-gray-100" />
            <div className="w-full h-px bg-gray-100" />
            <div className="w-full h-[0.5px]" />
          </div>
          {/* X Axis Labels */}
          <div className="absolute bottom-[-30px] w-full flex justify-between px-0 text-[10px] text-gray-700 font-medium whitespace-nowrap">
            <span>20260105</span>
            <span>20260106</span>
            <span>20260107</span>
            <span>20260108</span>
            <span>20260109</span>
            <span>20260110</span>
            <span>20260111</span>
          </div>
          {/* Baseline Graph Line */}
          <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#9BB7D0]" />
        </div>
        
        {/* Legend */}
        <div className="mt-12 flex justify-center gap-4 text-[11px] text-gray-600 items-center">
          <div className="flex items-center gap-1">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-red-500" />
            <div className="w-3 h-[2px] bg-[#C1504D]" />
            <span>잔여 금액</span>
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-orange-400" />
            <div className="w-3 h-[2px] bg-[#F1975A]" />
            <span>지급 금액</span>
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-yellow-400" />
            <div className="w-3 h-[2px] bg-orange-400 opacity-50" />
            <span>사용 금액</span>
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-green-400" />
            <div className="w-3 h-[2px] bg-[#9BB7D0]" />
            <span>소멸 금액</span>
          </div>
        </div>
      </div>

      {/* Detail Table */}
      <div className="relative">
        <div className="flex justify-end mb-2">
          <Button variant="outline" className="h-[26px] px-3 gap-1 text-[11px] font-normal border-gray-300 rounded-[4px] bg-white text-gray-600">
            <FileSpreadsheet className="w-3.5 h-3.5 text-green-600" /> 엑셀 다운로드
          </Button>
        </div>
        <div className="border border-gray-300 overflow-hidden">
          <table className="w-full text-center border-collapse text-gray-600">
            <thead>
              <tr className="bg-[#f8fafc] text-gray-700 font-bold h-10 border-b border-gray-300 text-[11px]">
                <th className="px-2 border-r border-gray-200">날짜</th>
                <th className="px-2 border-r border-gray-200">잔여 마일리지</th>
                <th className="px-2 border-r border-gray-200">지급건수</th>
                <th className="px-2 border-r border-gray-200">지급금액</th>
                <th className="px-2 border-r border-gray-200">사용건수</th>
                <th className="px-2 border-r border-gray-200">사용금액</th>
                <th className="px-2 border-r border-gray-200">소멸건수</th>
                <th className="px-2">소멸금액</th>
              </tr>
            </thead>
            <tbody>
              {detailData.map((row, idx) => (
                <tr key={idx} className="h-10 border-b border-gray-200 font-normal">
                   <td className="px-2 border-r border-gray-200">{row.date}</td>
                   <td className="px-2 border-r border-gray-200 font-bold text-gray-800">{row.remain}</td>
                   <td className="px-2 border-r border-gray-200">{row.giveCount}</td>
                   <td className="px-2 border-r border-gray-200">{row.giveAmount}</td>
                   <td className="px-2 border-r border-gray-200">{row.useCount}</td>
                   <td className="px-2 border-r border-gray-200">{row.useAmount}</td>
                   <td className="px-2 border-r border-gray-200">{row.expireCount}</td>
                   <td className="px-2">{row.expireAmount}</td>
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

      {/* Footer */}
      <div className="mt-12 py-6 text-center text-[10px] text-gray-400 border-t border-gray-100">
        © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
      </div>
    </div>
  );
}

function PeriodButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button className={`h-6 px-3 text-[11px] border ${active ? 'bg-[#777] border-[#777] text-white' : 'bg-white text-gray-600 border-gray-300'} rounded-[2px] hover:z-10`}>
      {label}
    </button>
  );
}
