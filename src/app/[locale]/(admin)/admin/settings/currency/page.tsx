"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CurrencySettingsPage() {
  const [baseCountry, setBaseCountry] = useState("kr");
  const [currencyDisplay, setCurrencyDisplay] = useState("won");
  const [weightUnit, setWeightUnit] = useState("g");
  const [volumeUnit, setVolumeUnit] = useState("ml");

  const [productRoundingUnit, setProductRoundingUnit] = useState("0.1");
  const [productRoundingMethod, setProductRoundingMethod] = useState("floor");

  const [mileageRoundingUnit, setMileageRoundingUnit] = useState("0.1");
  const [mileageRoundingMethod, setMileageRoundingMethod] = useState("floor");

  const [couponRoundingUnit, setCouponRoundingUnit] = useState("0.1");
  const [couponRoundingMethod, setCouponRoundingMethod] = useState("floor");

  const [memberRoundingUnit, setMemberRoundingUnit] = useState("0.1");
  const [memberRoundingMethod, setMemberRoundingMethod] = useState("floor");


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
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">용량 단위</th>
                <td className="p-4">
                   <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                    <SelectTrigger className="w-[200px] bg-white border-gray-300">
                      <SelectValue placeholder="용량 단위 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ml">밀리리터(ml)</SelectItem>
                      <SelectItem value="l">리터(L)</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Currency Rounding Settings */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
          금액 절사 기준 설정
          <span className="text-xs font-normal text-gray-400 border px-1 rounded cursor-help">?</span>
        </h2>
        
        <div className="border-t border-gray-400">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {/* Product Price Rounding */}
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">상품금액</th>
                <td className="p-4 flex items-center gap-2">
                   <Select value={productRoundingUnit} onValueChange={setProductRoundingUnit}>
                    <SelectTrigger className="w-[120px] bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.1">0.1</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-gray-600">단위</span>
                  
                  <Select value={productRoundingMethod} onValueChange={setProductRoundingMethod}>
                    <SelectTrigger className="w-[120px] bg-white border-gray-300">
                       <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="floor">버림</SelectItem>
                      <SelectItem value="round">반올림</SelectItem>
                      <SelectItem value="ceil">올림</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-1 text-xs text-gray-500 ml-2">
                    <span className="bg-gray-600 text-white min-w-[14px] h-[14px] flex items-center justify-center rounded-[2px] text-[10px]">!</span>
                    <span>상품 할인이나 일괄 가격 수정 시 적용되는 절사 기준입니다.</span>
                  </div>
                </td>
              </tr>

              {/* Mileage Rounding */}
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">마일리지</th>
                <td className="p-4 flex items-center gap-2">
                   <Select value={mileageRoundingUnit} onValueChange={setMileageRoundingUnit}>
                    <SelectTrigger className="w-[120px] bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.1">0.1</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-gray-600">단위</span>
                  
                  <Select value={mileageRoundingMethod} onValueChange={setMileageRoundingMethod}>
                    <SelectTrigger className="w-[120px] bg-white border-gray-300">
                       <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="floor">버림</SelectItem>
                      <SelectItem value="round">반올림</SelectItem>
                      <SelectItem value="ceil">올림</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>

              {/* Coupon Rounding */}
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">쿠폰</th>
                <td className="p-4 flex items-center gap-2">
                   <Select value={couponRoundingUnit} onValueChange={setCouponRoundingUnit}>
                    <SelectTrigger className="w-[120px] bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.1">0.1</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-gray-600">단위</span>
                  
                  <Select value={couponRoundingMethod} onValueChange={setCouponRoundingMethod}>
                    <SelectTrigger className="w-[120px] bg-white border-gray-300">
                       <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="floor">버림</SelectItem>
                      <SelectItem value="round">반올림</SelectItem>
                      <SelectItem value="ceil">올림</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>

              {/* Member Level Rounding */}
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">회원등급별</th>
                <td className="p-4 flex items-center gap-2">
                   <Select value={memberRoundingUnit} onValueChange={setMemberRoundingUnit}>
                    <SelectTrigger className="w-[120px] bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.1">0.1</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-gray-600">단위</span>
                  
                  <Select value={memberRoundingMethod} onValueChange={setMemberRoundingMethod}>
                    <SelectTrigger className="w-[120px] bg-white border-gray-300">
                       <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="floor">버림</SelectItem>
                      <SelectItem value="round">반올림</SelectItem>
                      <SelectItem value="ceil">올림</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-1 text-xs text-gray-500 ml-2">
                    <span className="bg-gray-600 text-white min-w-[14px] h-[14px] flex items-center justify-center rounded-[2px] text-[10px]">!</span>
                    <span>회원 등급에 주어지는 추가할인 / 중복할인 혜택에 적용되는 절사 기준입니다.</span>
                  </div>
                </td>
              </tr>

              {/* Supplier Rounding (Fixed) */}
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">공급사 정산</th>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="font-bold">0.1 단위 버림</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500 ml-2">
                        <span className="bg-gray-600 text-white min-w-[14px] h-[14px] flex items-center justify-center rounded-[2px] text-[10px]">!</span>
                        <span>공급사에 수수료 정산 시 적용되는 절사 기준입니다. (기준 변경 불가)</span>
                    </div>
                  </div>
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
