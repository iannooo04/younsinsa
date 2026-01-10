"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  Calendar,
  AlertCircle
} from "lucide-react";

export default function AnalyticsMainPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">애널리틱스 메인페이지</h1>
      </div>

      {/* Analytics Info Alert */}
      <div className="bg-[#f0f4f9] border border-gray-200 rounded-[12px] p-6 mb-6 flex gap-4">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center">
            <span className="text-red-500 font-bold text-lg">!</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-1">애널리틱스란?</h3>
          <p className="text-gray-500 leading-relaxed mb-3">
            애널리틱스는 쇼핑몰 방문부터 주문, 회원가입까지 고객의 행동을 추적하는 웹 로그 분석 서비스입니다.<br />
            다른 통계 메뉴(매출분석, 회원분석등)와 데이터 집계 기준이 상이하여, 제공되는 데이터 값에 차이가 발생할 수 있습니다. 자세한 내용은 애널리틱스 가이드를 확인해주세요.
          </p>
          <Button variant="outline" className="h-8 px-4 text-xs font-normal border-gray-300 rounded-[4px] bg-white text-gray-700">
            애널리틱스 가이드
          </Button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="border border-gray-100 rounded-[20px] p-8 mb-8 flex justify-between items-center shadow-sm">
        <div className="space-y-6 flex-1">
          {/* Store */}
          <div className="flex items-center gap-8">
            <span className="w-20 font-bold text-gray-700">상점</span>
            <RadioGroup defaultValue="base" className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 leading-none">
                <RadioGroupItem value="base" id="base" className="w-4 h-4 text-red-500 border-gray-300" />
                <Label htmlFor="base" className="text-xs font-normal text-gray-600">기준몰</Label>
              </div>
              <div className="flex items-center gap-1.5 leading-none">
                <RadioGroupItem value="en" id="en" className="w-4 h-4 text-red-500 border-gray-300" />
                <Label htmlFor="en" className="text-xs font-normal text-gray-600">영문몰</Label>
              </div>
              <div className="flex items-center gap-1.5 leading-none">
                <RadioGroupItem value="cn" id="cn" className="w-4 h-4 text-red-500 border-gray-300" />
                <Label htmlFor="cn" className="text-xs font-normal text-gray-600">중문몰</Label>
              </div>
              <div className="flex items-center gap-1.5 leading-none">
                <RadioGroupItem value="jp" id="jp" className="w-4 h-4 text-red-500 border-gray-300" />
                <Label htmlFor="jp" className="text-xs font-normal text-gray-600">일문몰</Label>
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

      {/* Order Status */}
      <div className="bg-white border border-gray-100 rounded-[20px] p-8 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-gray-800">주문 현황</h2>
          <Button variant="outline" className="h-[26px] px-3 text-[11px] font-normal border-gray-300 rounded-[4px] bg-white text-gray-500">더보기</Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <OrderBlock label="주문 금액(원)" value="0" active />
          <OrderBlock label="주문자 수" value="0" />
          <OrderBlock label="주문 건수" value="0" />
          <OrderBlock label="주문 상품 개수" value="0" />
        </div>
      </div>

      {/* Visitor & Pageview Status */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <StatusGrid title="방문자 현황" moreLink="#">
          <StatCard label="전체 방문자 수" value="7" avg="0.9" active />
          <StatCard label="신규 방문자 수" value="3" avg="0.4" />
          <StatCard label="재방문자 수" value="4" avg="0.5" />
          <StatCard label="방문 횟수" value="7" avg="0.9" />
        </StatusGrid>

        <StatusGrid title="페이지뷰 현황" moreLink="#">
          <StatCard label="전체 방문자 PV" value="10" avg="1.2" active />
          <StatCard label="신규 방문자 PV" value="4" avg="0.5" />
          <StatCard label="재방문자 PV" value="6" avg="0.8" />
          <StatCard label="방문자당 PV" value="1.4" avg="0.2" />
        </StatusGrid>
      </div>

      {/* Popular Sections */}
      <div className="bg-white border border-gray-100 rounded-[20px] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-base font-bold text-gray-800">인기 페이지</h2>
          <Button variant="outline" className="h-[26px] px-3 text-[11px] font-normal border-gray-300 rounded-[4px] bg-white text-gray-500">더보기</Button>
        </div>
        
        {/* Charts Row 1 */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <ChartCard title="인기 페이지 TOP 10">
            <div className="flex flex-col items-center">
              <PieChart30_30_30_10 />
              <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-sm">
                <LegendItem color="#FF6358" label="메인 (30%)" />
                <LegendItem color="#97E064" label="상품상세 (30%)" />
                <LegendItem color="#6ED3E1" label="쇼핑몰 메인본문 (30%)" />
                <LegendItem color="#B465FF" label="상품 리스트 (10%)" />
              </div>
            </div>
          </ChartCard>

          <ChartCard title="인기 상품 TOP 10">
            <div className="flex flex-col items-center">
              <PieChart66_33 />
              <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-sm">
                <LegendItem color="#FF6358" label="여성 엠보 로고 모크넥 티셔츠 (66.7%)" />
                <LegendItem color="#97E064" label="여성 엠보 로고 모크넥 티셔츠 (33.3%)" />
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-2 gap-8">
          <ChartCard title="인기 카테고리 TOP 10">
             <div className="flex flex-col items-center">
              <PieChart100 />
              <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-sm">
                <LegendItem color="#FF6358" label="Golfwear (100%)" />
              </div>
            </div>
          </ChartCard>

          <ChartCard title="인기 게시판 TOP 10">
            <div className="flex flex-col items-center justify-center h-64 text-gray-400 font-normal">
              데이터가 없습니다
            </div>
          </ChartCard>
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

function OrderBlock({ label, value, active = false }: { label: string; value: string; active?: boolean }) {
  return (
    <div className={`p-6 rounded-[16px] text-left border ${active ? 'bg-[#E3F2FD] border-[#90CAF9]/30' : 'bg-[#F8FAFC] border-gray-100'}`}>
      <div className={`text-xs mb-3 font-normal ${active ? 'text-[#1E88E5]' : 'text-gray-500'}`}>{label}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  );
}

function StatusGrid({ title, children, moreLink }: { title: string; children: React.ReactNode; moreLink: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[20px] p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
        <Button variant="outline" className="h-[26px] px-3 text-[11px] font-normal border-gray-300 rounded-[4px] bg-white text-gray-500">더보기</Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function StatCard({ label, value, avg, active = false }: { label: string; value: string; avg: string; active?: boolean }) {
  return (
    <div className={`p-6 rounded-[16px] border ${active ? 'bg-[#E3F2FD] border-[#90CAF9]/30' : 'bg-[#F8FAFC] border-gray-100'}`}>
      <div className={`text-xs mb-4 font-normal ${active ? 'text-[#1E88E5]' : 'text-gray-500'}`}>{label}</div>
      <div className="text-2xl font-bold text-gray-800 mb-6">{value}</div>
      <div className="border-t border-gray-200/50 pt-4 flex justify-between items-center text-[11px]">
        <span className="text-gray-500">평균</span>
        <span className="text-gray-800 font-medium">{avg}</span>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#F8FAFC] rounded-[24px] p-10 border border-gray-50">
      <h3 className="text-[13px] font-bold text-gray-800 mb-8">{title}</h3>
      {children}
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      <div className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: color }} />
      <span className="text-[10px] text-gray-400 font-normal">{label}</span>
    </div>
  );
}

// SVG Mocks for Charts
function PieChart30_30_30_10() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="100" fill="#6ED3E1" />
      <path d="M 100 100 L 100 0 A 100 100 0 0 1 195.1 69.1 Z" fill="#FF6358" />
      <path d="M 100 100 L 195.1 69.1 A 100 100 0 0 1 130.9 195.1 Z" fill="#97E064" />
      <path d="M 100 100 L 100 200 A 100 100 0 0 1 30.9 169.1 Z" fill="#B465FF" />
      <text x="145" y="55" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">30%</text>
      <text x="145" y="145" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">30%</text>
      <text x="55" y="145" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">30%</text>
      <text x="65" y="180" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">10%</text>
    </svg>
  );
}

function PieChart66_33() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="100" fill="#97E064" />
      <path d="M 100 100 L 100 0 A 100 100 0 1 1 13.4 150 Z" fill="#FF6358" />
      <text x="75" y="60" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">66.7%</text>
      <text x="145" y="145" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">33.3%</text>
    </svg>
  );
}

function PieChart100() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="100" fill="#FF6358" />
      <line x1="100" y1="100" x2="200" y2="100" stroke="white" strokeWidth="1" />
      <text x="65" y="105" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">100%</text>
    </svg>
  );
}
