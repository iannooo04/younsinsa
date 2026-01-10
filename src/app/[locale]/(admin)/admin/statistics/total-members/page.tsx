"use client";

import React, { useState } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TotalMembersPage() {
  const [activeTab, setActiveTab] = useState("daily");

  const detailData = [
    { date: "2026-01-05", total: 1, new: 0, unapproved: 0, dormant: 0, withdrawn: 0 },
    { date: "2026-01-06", total: 1, new: 0, unapproved: 0, dormant: 0, withdrawn: 0 },
    { date: "2026-01-07", total: 1, new: 0, unapproved: 0, dormant: 0, withdrawn: 0 },
    { date: "2026-01-08", total: 1, new: 0, unapproved: 0, dormant: 0, withdrawn: 0 },
    { date: "2026-01-09", total: 1, new: 0, unapproved: 0, dormant: 0, withdrawn: 0 },
    { date: "2026-01-10", total: 1, new: 0, unapproved: 0, dormant: 0, withdrawn: 0 },
    { date: "2026-01-11", total: 1, new: 0, unapproved: 0, dormant: 0, withdrawn: 0 },
  ];

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">전체 회원분석</h1>
      </div>

      {/* Search Section */}
      <div className="border border-gray-200 mb-8 overflow-hidden rounded-[4px]">
        <div className="bg-[#f8fafc] px-4 py-2 border-b border-gray-200 flex items-center gap-1 font-bold text-gray-700">
          전체회원 검색 <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </div>
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr className="border-b border-gray-100">
                <th className="bg-[#f8fafc] w-32 px-4 py-3 font-normal text-gray-600 border-r border-gray-100">상점</th>
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
            <TabsTrigger value="daily" className="px-6 h-full data-[state=active]:bg-white data-[state=active]:border-2 data-[state=active]:border-b-0 data-[state=active]:border-gray-300 rounded-none bg-[#f8fafc] border border-gray-200 border-b-0 text-gray-600 font-normal transition-none mr-[-1px]">일별 회원 현황</TabsTrigger>
            <TabsTrigger value="monthly" className="px-6 h-full border border-gray-200 border-b-0 rounded-none bg-[#f8fafc] text-gray-600 font-normal transition-none mr-[-1px]">월별 회원 현황</TabsTrigger>
            <TabsTrigger value="gender" className="px-6 h-full border border-gray-200 border-b-0 rounded-none bg-[#f8fafc] text-gray-600 font-normal transition-none mr-[-1px]">회원 성별 현황</TabsTrigger>
            <TabsTrigger value="age" className="px-6 h-full border border-gray-200 border-b-0 rounded-none bg-[#f8fafc] text-gray-600 font-normal transition-none mr-[-1px]">회원 연령별 현황</TabsTrigger>
            <TabsTrigger value="region" className="px-6 h-full border border-gray-200 border-b-0 rounded-none bg-[#f8fafc] text-gray-600 font-normal transition-none">회원 지역별 현황</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Summary Table */}
      <div className="border border-gray-200 overflow-hidden mb-8">
        <table className="w-full text-center border-collapse text-[11px]">
          <thead>
            <tr className="bg-[#f8fafc] text-gray-600 h-10 border-b border-gray-200">
              <th className="px-4 border-r border-gray-200 font-normal bg-[#eaf1f7] text-gray-700 w-1/5">총 회원수</th>
              <th className="px-4 border-r border-gray-200 font-normal w-1/5">총 신규회원수</th>
              <th className="px-4 border-r border-gray-200 font-normal w-1/5">총 가입 미승인회원수</th>
              <th className="px-4 border-r border-gray-200 font-normal w-1/5">총 휴면회원수</th>
              <th className="px-4 font-normal w-1/5">총 탈퇴회원수</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-16 text-lg text-gray-900 border-b border-gray-200">
              <td className="px-4 border-r border-gray-100 bg-blue-50/20">1</td>
              <td className="px-4 border-r border-gray-100 font-normal">0</td>
              <td className="px-4 border-r border-gray-100 font-normal">0</td>
              <td className="px-4 border-r border-gray-100 font-normal">0</td>
              <td className="px-4 font-normal">0</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Chart Section */}
      <div className="border border-gray-300 p-8 mb-8 relative">
        <div className="h-[300px] w-full border-l border-b border-gray-300 relative">
          {/* Y Axis */}
          <div className="absolute left-[-25px] h-full flex flex-col justify-between py-0 text-gray-700 font-medium">
            <span>1.2</span>
            <span>1</span>
            <span>0.8</span>
            <span>0.6</span>
            <span>0.4</span>
            <span>0.2</span>
            <span>0</span>
          </div>
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className={`w-full h-px ${i === 6 ? '' : 'bg-gray-100'}`} />
            ))}
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
          {/* Data Line (Total Members - Red) */}
          <div className="absolute top-[50px] left-0 w-full h-[1.5px] bg-[#C1504D]" />
          {/* Data Line (Others - Baseline) */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#4BACC6]" />
        </div>
        
        {/* Legend */}
        <div className="mt-12 flex justify-center gap-4 text-[11px] text-gray-600 items-center">
          <div className="flex items-center gap-1">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-red-500" />
            <div className="w-3 h-[2px] bg-[#C1504D]" />
            <span>총 회원수</span>
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-orange-400" />
            <div className="w-3 h-[2px] bg-[#F1975A]" />
            <span>신규회원</span>
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-yellow-400" />
            <div className="w-3 h-[2px] bg-[#A9C168]" />
            <span>미승인회원</span>
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-green-400" />
            <div className="w-3 h-[2px] bg-[#9BB7D0]" />
            <span>휴면회원</span>
          </div>
          <div className="flex items-center gap-1">
            <input type="checkbox" checked readOnly className="w-3 h-3 accent-cyan-400" />
            <div className="w-3 h-[2px] bg-[#4BACC6]" />
            <span>탈퇴회원</span>
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
              <tr className="bg-[#f8fafc] text-gray-700 font-bold h-10 border-b border-gray-300">
                <th className="px-4 border-r border-gray-200">날짜</th>
                <th className="px-4 border-r border-gray-200">총 회원수</th>
                <th className="px-4 border-r border-gray-200">신규회원수</th>
                <th className="px-4 border-r border-gray-200">가입 미승인회원수</th>
                <th className="px-4 border-r border-gray-200">휴면회원수</th>
                <th className="px-4">탈퇴회원수</th>
              </tr>
            </thead>
            <tbody>
              {detailData.map((row, idx) => (
                <tr key={idx} className="h-10 border-b border-gray-200 font-normal">
                   <td className="px-4 border-r border-gray-200">{row.date}</td>
                   <td className="px-4 border-r border-gray-200">{row.total}</td>
                   <td className="px-4 border-r border-gray-200">{row.new}</td>
                   <td className="px-4 border-r border-gray-200">{row.unapproved}</td>
                   <td className="px-4 border-r border-gray-200">{row.dormant}</td>
                   <td className="px-4">{row.withdrawn}</td>
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
