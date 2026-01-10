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

export default function PopularPagesPage() {
  const [activeTab, setActiveTab] = useState("page");

  const pageDetailData = [
    { rank: 1, url: "/", name: "메인", pv: 3, ratio: "30%" },
    { rank: 2, url: "goods/goods_view.php", name: "상품상세", pv: 3, ratio: "30%" },
    { rank: 3, url: "main/index.php", name: "쇼핑몰 메인본문", pv: 3, ratio: "30%" },
    { rank: 4, url: "goods/goods_list.php", name: "상품 리스트", pv: 1, ratio: "10%" },
  ];

  const goodsDetailData = [
    { rank: 1, code: "1000000290", name: "여성 엠보 로고 모크넥 티셔츠", pv: 2, ratio: "66.7%" },
    { rank: 2, code: "1000000289", name: "여성 엠보 로고 모크넥 티셔츠", pv: 1, ratio: "33.3%" },
  ];

  const categoryDetailData = [
    { rank: 1, code: "007", name: "Golfwear", pv: 1, ratio: "100%" },
  ];

  const boardDetailData: any[] = [];

  const getActiveTabPV = () => {
    switch (activeTab) {
      case "page": return 10;
      case "goods": return 3;
      case "category": return 1;
      case "board": return 0;
      default: return 0;
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">인기 페이지</h1>
      </div>

      {/* Filter Section */}
      <div className="border border-gray-100 rounded-[20px] p-8 mb-8 flex justify-between items-center shadow-sm">
        <div className="space-y-6 flex-1">
          {/* Store */}
          <div className="flex items-center gap-8">
            <span className="w-20 font-bold text-gray-700">상점</span>
            <RadioGroup defaultValue="base" className="flex items-center gap-4">
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
        </div>

        <div className="flex flex-col gap-2">
          <Button className="w-24 h-9 text-xs font-bold bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[4px] border-0">검색</Button>
          <Button variant="outline" className="w-24 h-9 text-xs font-bold border-gray-300 rounded-[4px] bg-white text-gray-700">초기화</Button>
        </div>
      </div>

      {/* Top 10 Charts Grid */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Popular Pages TOP 10 */}
        <div className="bg-white border border-gray-100 rounded-[20px] p-10 shadow-sm flex flex-col items-center">
          <h2 className="w-full text-base font-bold text-gray-800 mb-8">인기 페이지 TOP 10</h2>
          <PieChart30_30_30_10 />
          <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-sm">
            <LegendItem color="#FF6358" label="메인 (30%)" />
            <LegendItem color="#97E064" label="상품상세 (30%)" />
            <LegendItem color="#6ED3E1" label="쇼핑몰 메인본문 (30%)" />
            <LegendItem color="#B465FF" label="상품 리스트 (10%)" />
          </div>
        </div>

        {/* Popular Products TOP 10 */}
        <div className="bg-white border border-gray-100 rounded-[20px] p-10 shadow-sm flex flex-col items-center">
          <h2 className="w-full text-base font-bold text-gray-800 mb-8">인기 상품 TOP 10</h2>
          <PieChart66_33 />
          <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-sm">
            <LegendItem color="#FF6358" label="여성 엠보 로고 모크넥 티셔츠 (66.7%)" />
            <LegendItem color="#97E064" label="여성 엠보 로고 모크넥 티셔츠 (33.3%)" />
          </div>
        </div>

        {/* Popular Category TOP 10 */}
        <div className="bg-white border border-gray-100 rounded-[20px] p-10 shadow-sm flex flex-col items-center">
          <h2 className="w-full text-base font-bold text-gray-800 mb-8">인기 카테고리 TOP 10</h2>
          <PieChart100 />
          <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-sm">
            <LegendItem color="#FF6358" label="Golfwear (100%)" />
          </div>
        </div>

        {/* Popular Board TOP 10 */}
        <div className="bg-white border border-gray-100 rounded-[20px] p-10 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="w-full text-base font-bold text-gray-800 mb-8 self-start">인기 게시판 TOP 10</h2>
          <div className="flex-1 flex items-center justify-center text-gray-400 font-normal">
            데이터가 없습니다
          </div>
        </div>
      </div>

      {/* Detail Section Tabs */}
      <div className="mb-4">
        <Tabs defaultValue="page" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="bg-transparent border-b border-gray-100 w-full justify-start rounded-none h-10 p-0">
            <TabsTrigger value="page" className="px-6 h-full data-[state=active]:border-b-2 data-[state=active]:border-gray-800 data-[state=active]:text-gray-900 rounded-none text-gray-500 font-bold border-transparent transition-none">페이지</TabsTrigger>
            <TabsTrigger value="goods" className="px-6 h-full data-[state=active]:border-b-2 data-[state=active]:border-gray-800 data-[state=active]:text-gray-900 rounded-none text-gray-500 font-bold border-transparent transition-none">상품</TabsTrigger>
            <TabsTrigger value="category" className="px-6 h-full data-[state=active]:border-b-2 data-[state=active]:border-gray-800 data-[state=active]:text-gray-900 rounded-none text-gray-500 font-bold border-transparent transition-none">카테고리</TabsTrigger>
            <TabsTrigger value="board" className="px-6 h-full data-[state=active]:border-b-2 data-[state=active]:border-gray-800 data-[state=active]:text-gray-900 rounded-none text-gray-500 font-bold border-transparent transition-none">게시판</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Detail Table Container */}
      <div className="bg-white border border-gray-100 rounded-[20px] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-gray-800">통계 상세 <span className="text-sm font-normal text-gray-500 ml-2">전체 방문자 PV <span className="text-red-500">{getActiveTabPV()}</span></span></h2>
          <Button variant="outline" className="h-[26px] px-3 gap-1 text-[11px] font-normal border-gray-300 rounded-[4px] bg-white text-gray-600">
            <FileSpreadsheet className="w-3.5 h-3.5 text-green-600" /> 엑셀 다운로드
          </Button>
        </div>
        
        {activeTab === "page" && (
          <div className="border border-gray-100 rounded-[12px] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] h-10 border-b border-gray-100 text-gray-600 font-bold">
                  <th className="px-6 border-r border-gray-100 w-24">순위</th>
                  <th className="px-6 border-r border-gray-100 w-1/3">페이지 URL</th>
                  <th className="px-6 border-r border-gray-100 w-1/4">페이지명</th>
                  <th className="px-6 border-r border-gray-100">페이지뷰(PV)</th>
                  <th className="px-6">비율</th>
                </tr>
              </thead>
              <tbody>
                {pageDetailData.map((row, idx) => (
                  <tr key={idx} className="h-10 border-b border-gray-50 text-gray-700 hover:bg-gray-50/50">
                    <td className="px-6 border-r border-gray-50 font-normal">{row.rank}</td>
                    <td className="px-6 border-r border-gray-50 font-normal">{row.url}</td>
                    <td className="px-6 border-r border-gray-50 font-normal">{row.name}</td>
                    <td className="px-6 border-r border-gray-50 font-normal">{row.pv}</td>
                    <td className="px-6 font-normal">{row.ratio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "goods" && (
          <>
            <div className="border border-gray-100 rounded-[12px] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] h-10 border-b border-gray-100 text-gray-600 font-bold">
                    <th className="px-6 border-r border-gray-100 w-24">순위</th>
                    <th className="px-6 border-r border-gray-100 w-[180px]">상품번호</th>
                    <th className="px-6 border-r border-gray-100">상품명</th>
                    <th className="px-6 border-r border-gray-100 w-[180px]">페이지뷰(PV)</th>
                    <th className="px-6 w-[180px]">비율</th>
                  </tr>
                </thead>
                <tbody>
                  {goodsDetailData.map((row, idx) => (
                    <tr key={idx} className="h-10 border-b border-gray-50 text-gray-700 hover:bg-gray-50/50">
                      <td className="px-6 border-r border-gray-50 font-normal">{row.rank}</td>
                      <td className="px-6 border-r border-gray-50 font-normal">{row.code}</td>
                      <td className="px-6 border-r border-gray-50 font-normal">{row.name}</td>
                      <td className="px-6 border-r border-gray-50 font-normal">{row.pv}</td>
                      <td className="px-6 font-normal">{row.ratio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-900 flex items-center gap-1.5 font-bold">
              <span className="w-1 h-1 bg-gray-900 rounded-full" />
              최대 100위 까지의 인기 상품만 조회 가능합니다.
            </p>
          </>
        )}

        {activeTab === "category" && (
          <>
            <div className="border border-gray-100 rounded-[12px] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] h-10 border-b border-gray-100 text-gray-600 font-bold">
                    <th className="px-6 border-r border-gray-100 w-24">순위</th>
                    <th className="px-6 border-r border-gray-100 w-[180px]">카테고리 코드</th>
                    <th className="px-6 border-r border-gray-100">카테고리명</th>
                    <th className="px-6 border-r border-gray-100 w-[180px]">페이지뷰(PV)</th>
                    <th className="px-6 w-[180px]">비율</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryDetailData.map((row, idx) => (
                    <tr key={idx} className="h-10 border-b border-gray-50 text-gray-700 hover:bg-gray-50/50">
                      <td className="px-6 border-r border-gray-50 font-normal">{row.rank}</td>
                      <td className="px-6 border-r border-gray-50 font-normal">{row.code}</td>
                      <td className="px-6 border-r border-gray-50 font-normal">{row.name}</td>
                      <td className="px-6 border-r border-gray-50 font-normal">{row.pv}</td>
                      <td className="px-6 font-normal">{row.ratio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-900 flex items-center gap-1.5 font-bold">
              <span className="w-1 h-1 bg-gray-900 rounded-full" />
              최대 100위 까지의 인기 카테고리만 조회 가능합니다.
            </p>
          </>
        )}

        {activeTab === "board" && (
          <>
            <div className="border border-gray-100 rounded-[12px] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] h-10 border-b border-gray-100 text-gray-600 font-bold">
                    <th className="px-6 border-r border-gray-100 w-24">순위</th>
                    <th className="px-6 border-r border-gray-100">게시판명</th>
                    <th className="px-6 border-r border-gray-100 w-[180px]">페이지뷰(PV)</th>
                    <th className="px-6 w-[180px]">비율</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-10 border-b border-gray-50">
                    <td colSpan={4} className="text-center py-8 text-gray-600 font-normal">조회 결과가 없습니다.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-900 flex items-center gap-1.5 font-bold">
              <span className="w-1 h-1 bg-gray-900 rounded-full" />
              최대 100위 까지의 인기 게시판만 조회 가능합니다.
            </p>
          </>
        )}
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

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      <div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: color }} />
      <span className="text-[10px] text-gray-500 font-normal">{label}</span>
    </div>
  );
}

// SVG Mocks for Charts
function PieChart30_30_30_10() {
  const getSPath = (start: number, end: number) => {
    const s = (start - 90) * (Math.PI / 180);
    const e = (end - 90) * (Math.PI / 180);
    const x1 = 110 + 100 * Math.cos(s);
    const y1 = 110 + 100 * Math.sin(s);
    const x2 = 110 + 100 * Math.cos(e);
    const y2 = 110 + 100 * Math.sin(e);
    return `M 110 110 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="relative w-[220px] h-[220px]">
      <svg width="220" height="220" viewBox="0 0 220 220">
        {/* Red 30% (0-108 deg) */}
        <path d={getSPath(0, 108)} fill="#FF6358" />
        {/* Green 30% (108-216 deg) */}
        <path d={getSPath(108, 216)} fill="#97E064" />
        {/* Cyan 30% (216-324 deg) */}
        <path d={getSPath(216, 324)} fill="#6ED3E1" />
        {/* Purple 10% (324-360 deg) */}
        <path d={getSPath(324, 360)} fill="#B465FF" />
        
        {/* Labels - positioned approx at mid-angle of each slice */}
        <text x="145" y="70" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">30%</text>
        <text x="65" y="115" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">30%</text>
        <text x="120" y="170" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">30%</text>
        <text x="175" y="130" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">10%</text>
      </svg>
    </div>
  );
}

function PieChart66_33() {
  const getSPath = (start: number, end: number) => {
    const s = (start - 90) * (Math.PI / 180);
    const e = (end - 90) * (Math.PI / 180);
    const x1 = 110 + 100 * Math.cos(s);
    const y1 = 110 + 100 * Math.sin(s);
    const x2 = 110 + 100 * Math.cos(e);
    const y2 = 110 + 100 * Math.sin(e);
    const large = end - start > 180 ? 1 : 0;
    return `M 110 110 L ${x1} ${y1} A 100 100 0 ${large} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="relative w-[220px] h-[220px]">
      <svg width="220" height="220" viewBox="0 0 220 220">
        {/* Red 66.7% (0-240 deg) */}
        <path d={getSPath(0, 240)} fill="#FF6358" />
        {/* Green 33.3% (240-360 deg) */}
        <path d={getSPath(240, 360)} fill="#97E064" />
        
        {/* Labels */}
        <text x="100" y="80" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">66.7%</text>
        <text x="160" y="155" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">33.3%</text>
      </svg>
    </div>
  );
}

function PieChart100() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220">
      <circle cx="110" cy="110" r="100" fill="#FF6358" />
      <line x1="110" y1="110" x2="210" y2="110" stroke="#EB5E52" strokeWidth="1" />
      <text x="75" y="115" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">100%</text>
    </svg>
  );
}
