"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Youtube, ChevronUp, HelpCircle, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PageviewAnalysisPage() {
  const [activeTab, setActiveTab] = useState("popular");

  const data = [
    { rank: 1, url: "robots.txt", name: "", pv: 7, ratio: 46.67, time: "00분 01초" },
    { rank: 2, url: "goods/goods_list.php", name: "상품 리스트", pv: 5, ratio: 33.33, time: "00분 01초" },
    { rank: 3, url: "goods/goods_view.php", name: "상품상세화면", pv: 2, ratio: 13.33, time: "00분 01초" },
    { rank: 4, url: "cn/goods/goods_list.php", name: "", pv: 1, ratio: 6.67, time: "00분 01초" },
  ];

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">페이지뷰 분석</h1>
      </div>

       <div className="flex items-center gap-1 mb-2">
         <h2 className="text-base font-bold text-gray-700">페이지뷰 검색</h2>
         <HelpCircle className="w-4 h-4 text-gray-400" />
      </div>

      {/* Search Filter Section */}
      <div className="border-t border-gray-400 mb-6">
        {/* Period */}
        <div className="flex border-b border-gray-200">
          <div className="w-40 bg-gray-50 p-3 flex items-center font-bold text-gray-700">
            조회기간
          </div>
          <div className="flex-1 p-3 flex items-center gap-2">
            <div className="relative">
              <Input defaultValue="2026-01-04" className="w-32 h-8 text-xs border-gray-300 rounded-[4px] pl-3 pr-8" />
              <Calendar className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" />
            </div>
            <span className="text-gray-400">~</span>
            <div className="relative">
              <Input defaultValue="2026-01-11" className="w-32 h-8 text-xs border-gray-300 rounded-[4px] pl-3 pr-8" />
              <Calendar className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" />
            </div>
            <div className="flex items-center ml-2 border border-gray-300 rounded overflow-hidden divide-x divide-gray-300">
              <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-600 transition-colors">전일</button>
              <button className="px-3 py-1.5 bg-gray-600 text-white font-bold transition-colors">7일</button>
              <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-600 transition-colors">15일</button>
              <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-600 transition-colors">1개월</button>
              <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-600 transition-colors">3개월</button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="flex justify-center mb-10">
        <Button className="w-24 h-10 bg-[#4B5563] hover:bg-[#374151] text-white font-bold rounded-[2px]">
          검색
        </Button>
      </div>

      {/* Tab */}
      <div className="flex mb-4">
          <button className="px-6 py-2 border border-gray-400 border-b-white bg-white font-bold text-gray-800 text-xs">
              인기 페이지
          </button>
          <div className="flex-1 border-b border-gray-400"></div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-2 p-3 bg-[#f5f5f5] border border-gray-200 rounded-[2px] border-b-0">
        <div className="flex items-center gap-2">
            <span className="text-gray-600 font-normal">페이지뷰 합계 <span className="text-[#FF424D]">15</span> 개</span>
        </div>
        <Button variant="outline" className="h-[26px] px-3 gap-1.5 text-[12px] font-normal border-gray-300 rounded-[2px] bg-white text-gray-600 hover:bg-gray-50">
            <span className="w-4 h-4 bg-green-600 text-white flex items-center justify-center rounded text-[10px] font-bold">X</span> 엑셀 다운로드
        </Button>
      </div>

      {/* Results Table Section */}
      <div className="mb-12">
        <div className="border border-gray-300 border-t-0">
           <table className="w-full text-center border-collapse text-xs">
            <thead>
               <tr className="bg-[#f5f5f5] text-gray-700 h-10 border-b border-gray-300 font-semibold text-center">
                <th className="border-r border-gray-300 w-24">순위</th>
                <th className="border-r border-gray-300 w-1/4">페이지 URL</th>
                <th className="border-r border-gray-300 w-1/5">페이지명</th>
                <th className="border-r border-gray-300 w-24">페이지뷰</th>
                <th className="border-r border-gray-300">비율</th>
                <th className="w-32">평균체류시간</th>
               </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                  <tr key={idx} className="h-12 border-b border-gray-200 hover:bg-gray-50">
                      <td className="border-r border-gray-200 text-gray-600">{item.rank}</td>
                      <td className="border-r border-gray-200 text-gray-600 text-left px-4">{item.url}</td>
                      <td className="border-r border-gray-200 text-gray-600">{item.name}</td>
                      <td className="border-r border-gray-200 text-gray-600">{item.pv}</td>
                      <td className="border-r border-gray-200 px-6 py-2">
                        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden relative">
                            <div 
                                className="h-full bg-[#29C5E0] flex items-center pl-2 text-white font-bold text-[10px]"
                                style={{ width: `${item.ratio}%` }}
                            >
                                {item.ratio}%
                            </div>
                        </div>
                      </td>
                      <td className="text-gray-600">{item.time}</td>
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
       <div className="mt-12 py-6 text-center text-[11px] text-gray-400 border-t border-gray-300 mt-12">
        © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
      </div>

    </div>
  );
}
