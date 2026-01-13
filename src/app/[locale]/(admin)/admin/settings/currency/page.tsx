"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CurrencySettingsPage() {
  const [baseCountry, setBaseCountry] = useState("kr");
  const [currencyDisplay, setCurrencyDisplay] = useState("won");
  const [weightUnit, setWeightUnit] = useState("g");





  return (
    <div className="p-6 space-y-6 bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-bold text-gray-900">금액 / 단위 기준 설정</h1>
            <span className="text-sm text-gray-500">쇼핑몰의 기본 금액 / 단위 기준 설정을 변경하실 수 있습니다.</span>
        </div>
        <Button className="bg-red-500 hover:bg-red-600 text-white px-6 rounded-sm">
          <Save className="w-4 h-4 mr-2" />
          저장
        </Button>
      </div>

      {/* Country Currency / Weight Unit Settings */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
          국가별 금액 / 무게 단위 표기 설정
          <span className="text-xs font-normal text-gray-400 border px-1 rounded cursor-help">?</span>
        </h2>
        
        <div className="border-t border-gray-400">
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">기준 국가</th>
                <td className="p-4">
                  <Select value={baseCountry} onValueChange={setBaseCountry}>
                    <SelectTrigger className="w-[200px] bg-white border-gray-300">
                      <SelectValue placeholder="국가 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kr">한국</SelectItem>
                      <SelectItem value="cn">중국</SelectItem>
                      <SelectItem value="us">미국</SelectItem>
                      <SelectItem value="jp">일본</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">금액 표시 방법</th>
                <td className="p-4 space-y-2">
                  <Select value={currencyDisplay} onValueChange={setCurrencyDisplay}>
                    <SelectTrigger className="w-[200px] bg-white border-gray-300">
                      <SelectValue placeholder="표시 방법 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="won">원</SelectItem>
                      <SelectItem value="symbol">￦</SelectItem>
                      <SelectItem value="won_symbol">원(￦)</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="bg-gray-600 text-white min-w-[14px] h-[14px] flex items-center justify-center rounded-[2px] text-[10px]">!</span>
                    <span>표시예제 : 1,300 원</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">무게 단위</th>
                <td className="p-4">
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger className="w-[200px] bg-white border-gray-300">
                      <SelectValue placeholder="무게 단위 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="g">그램(g)</SelectItem>
                      <SelectItem value="kg">킬로그램(kg)</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>



       {/* Floating Buttons (Optional) */}
       <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
        <Button className="rounded-full w-12 h-12 bg-red-500 hover:bg-red-600 shadow-lg text-white p-0 flex items-center justify-center border-0">
             <span className="text-[10px] leading-tight flex flex-col items-center font-medium"><span>따라</span><span>하기</span></span>
        </Button>
        <Button className="rounded-full w-12 h-12 bg-purple-600 hover:bg-purple-700 shadow-lg text-white p-0 flex items-center justify-center border-0">
             <span className="text-[10px] leading-tight flex flex-col items-center font-medium"><span>따라</span><span>하기</span></span>
        </Button>
        <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0">
            <span className="text-xl">↑</span>
        </Button>
        <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0">
            <span className="text-xl">↓</span>
        </Button>
      </div>

    </div>
  );
}
