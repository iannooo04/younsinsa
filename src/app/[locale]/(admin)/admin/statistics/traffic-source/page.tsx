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

export default function TrafficSourcePage() {
  const trafficData = [
    { source: "네이버", count: 0, ratio: "0%" },
    { source: "다음", count: 0, ratio: "0%" },
    { source: "카카오", count: 0, ratio: "0%" },
    { source: "구글", count: 0, ratio: "0%" },
    { source: "유튜브", count: 0, ratio: "0%" },
    { source: "인스타그램", count: 0, ratio: "0%" },
    { source: "네이트", count: 0, ratio: "0%" },
    { source: "빙", count: 0, ratio: "0%" },
    { source: "기타", count: 2, ratio: "20%" },
    { source: "직접 유입", count: 8, ratio: "80%" },
  ];

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">유입 경로</h1>
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
            </RadioGroup>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button className="w-24 h-9 text-xs font-bold bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[4px] border-0">검색</Button>
          <Button variant="outline" className="w-24 h-9 text-xs font-bold border-gray-300 rounded-[4px] bg-white text-gray-700">초기화</Button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white border border-gray-100 rounded-[20px] p-10 mb-8 shadow-sm grid grid-cols-[1fr_400px] gap-8">
        {/* Line Chart */}
        <div className="flex flex-col">
          <div className="relative h-72 w-full mb-8">
             <TrafficLineChartMock />
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 max-w-2xl mx-auto">
            <LegendItem color="#FF6358" label="네이버" />
            <LegendItem color="#97E064" label="다음" />
            <LegendItem color="#6ED3E1" label="카카오" />
            <LegendItem color="#B465FF" label="구글" />
            <LegendItem color="#FFB84D" label="유튜브" />
            <LegendItem color="#4CAF50" label="인스타그램" />
            <LegendItem color="#2196F3" label="네이트" />
            <LegendItem color="#E91E63" label="빙" />
            <LegendItem color="#CDDC39" label="기타" />
            <LegendItem color="#59D5A3" label="직접 유입" thick />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex flex-col items-center justify-center border-l border-gray-50 pl-8">
          <TrafficPieChartMock />
          <div className="mt-8 flex gap-6">
            <PieLegendItem color="#59D5A3" label="직접 유입" />
            <PieLegendItem color="#CDDC39" label="기타" />
          </div>
        </div>
      </div>

      {/* Detail Table Section */}
      <div className="bg-white border border-gray-100 rounded-[20px] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-gray-800">통계 상세 <span className="text-sm font-normal text-gray-500 ml-2">전체 유입수 10</span></h2>
          <Button variant="outline" className="h-[26px] px-3 gap-1 text-[11px] font-normal border-gray-300 rounded-[4px] bg-white text-gray-600">
            <FileSpreadsheet className="w-3.5 h-3.5 text-green-600" /> 엑셀 다운로드
          </Button>
        </div>
        <div className="border border-gray-100 rounded-[12px] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8fafc] h-10 border-b border-gray-100 text-gray-600 font-bold">
                <th className="px-6 border-r border-gray-100 w-1/3 flex items-center gap-1 h-10">
                  유입 경로 <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                </th>
                <th className="px-6 border-r border-gray-100 w-1/3">유입 수</th>
                <th className="px-6 w-1/3">비율</th>
              </tr>
            </thead>
            <tbody>
              {trafficData.map((row, idx) => (
                <tr key={idx} className="h-10 border-b border-gray-50 text-gray-700 hover:bg-gray-50/50">
                  <td className="px-6 border-r border-gray-50 font-normal">{row.source}</td>
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

function LegendItem({ color, label, thick = false, rounded = true }: { color: string; label: string; thick?: boolean; rounded?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      {thick ? (
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5" style={{ backgroundColor: color }} />
          <div className="w-1.5 h-1.5 rounded-full border border-white -mx-1.5" style={{ backgroundColor: color }} />
          <div className="w-3 h-0.5" style={{ backgroundColor: color }} />
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <div className="w-3 h-[1px]" style={{ backgroundColor: color }} />
          <div className="w-1.5 h-1.5 rounded-full border border-white -mx-1.5" style={{ backgroundColor: color }} />
          <div className="w-3 h-[1px]" style={{ backgroundColor: color }} />
        </div>
      )}
      <span className="text-[10px] text-gray-500 font-normal">{label}</span>
    </div>
  );
}

function TrafficLineChartMock() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1000 220" preserveAspectRatio="none">
      {/* Grid lines */}
      {[0, 0.75, 1.5, 2.25, 3].map((val, i) => (
        <React.Fragment key={val}>
           <line x1="50" y1={200 - (val / 3) * 180} x2="950" y2={200 - (val / 3) * 180} stroke="#f1f5f9" strokeWidth="1" />
           <text x="40" y={205 - (val / 3) * 180} fill="#94a3b8" fontSize="10" textAnchor="end">{val}</text>
        </React.Fragment>
      ))}
      
      {/* Dates X-axis */}
      {["2026-01-04", "2026-01-05", "2026-01-06", "2026-01-07", "2026-01-08", "2026-01-09", "2026-01-10", "2026-01-11"].map((date, i) => (
        <text key={date} x={50 + i * (900 / 7)} y="215" fill="#94a3b8" fontSize="10" textAnchor="middle" transform={`rotate(-15, ${50 + i * (900 / 7)}, 215)`}>{date}</text>
      ))}

      {/* Direct Traffic (Thick Greenish) */}
      <path d="M 50 200 L 178.5 140 L 307 20 L 435.5 20 L 564 120 L 692.5 180 L 821 200 L 950 200" fill="none" stroke="#59D5A3" strokeWidth="2" />
      
      {/* Others (Yellowish) */}
      <path d="M 50 200 L 178.5 80 L 307 200" fill="none" stroke="#CDDC39" strokeWidth="1.5" />
      
      {/* All other sources at zero */}
      <line x1="50" y1="200" x2="950" y2="200" stroke="#f1f5f9" strokeWidth="1" />
    </svg>
  );
}

function PieLegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      <div className="w-3.5 h-3.5 rounded-[2px]" style={{ backgroundColor: color }} />
      <span className="text-[11px] text-[#888] font-normal">{label}</span>
    </div>
  );
}

function TrafficPieChartMock() {
  return (
    <div className="relative w-[180px] h-[180px]">
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="-rotate-[110deg]">
        <circle cx="50" cy="50" r="25" fill="transparent" stroke="#CDDC39" strokeWidth="50" />
        <circle 
          cx="50" 
          cy="50" 
          r="25" 
          fill="transparent" 
          stroke="#59D5A3" 
          strokeWidth="50" 
          strokeDasharray={`${2 * Math.PI * 25 * 0.8} ${2 * Math.PI * 25 * 0.2}`}
          className="transition-all duration-1000"
        />
      </svg>
      {/* Labels */}
      <span className="absolute top-[28%] left-[22%] text-white text-[13px] font-bold">80%</span>
      <span className="absolute bottom-[28%] right-[22%] text-white text-[13px] font-bold">20%</span>
    </div>
  );
}
