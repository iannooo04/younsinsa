"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  ChevronsUp,
  ChevronDown,
  ChevronsDown,
} from "lucide-react";

export default function ProductDetailExposureItemsPage() {
  const [availableItems, setAvailableItems] = useState([
    "배송일정",
    "상품코드",
    "자체상품코드",
    "브랜드",
    "제조사",
    "원산지",
    "모델번호",
    "상품상태",
    "유효기간",
  ]);

  const [selectedItems, setSelectedItems] = useState([
    "짧은설명",
    "정가",
    "판매가",
    "할인적용가",
    "구매제한",
    "구매혜택",
    "쿠폰받기",
    "배송비",
  ]);

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          상품상세 노출항목 설정 등록
        </h1>
        <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm">
          저장
        </Button>
      </div>

      {/* Main Content */}
      <div className="border border-gray-300 border-b-0">
        {/* Exposure Item Settings Header */}
        <div className="bg-white p-3 border-b border-gray-300 flex items-center gap-2">
          <h2 className="text-sm font-bold text-gray-800">노출 항목 설정</h2>
          <div className="text-[11px] text-[#888888] flex items-center gap-1">
            <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">
              !
            </span>
            노출항목으로 설정되어 있더라도 내용이 등록되지 않은 항목은 쇼핑몰에
            노출되지 않습니다.
          </div>
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        {/* Scope */}
        <div className="flex border-b border-gray-300">
          <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-300">
            적용범위
          </div>
          <div className="flex-1 p-3 flex items-center">
            <div className="flex items-center gap-1.5">
              <Checkbox
                id="apply-mobile"
                className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                defaultChecked
              />
              <Label
                htmlFor="apply-mobile"
                className="text-gray-700 font-normal cursor-pointer"
              >
                모바일 쇼핑몰 동일 적용
              </Label>
            </div>
          </div>
        </div>

        {/* PC Shop Exposure Items */}
        <div className="flex border-b border-gray-300 min-h-[400px]">
          <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center justify-start border-r border-gray-300">
            PC쇼핑몰 노출항목
          </div>
          <div className="flex-1 p-4 flex gap-4">
            {/* Available Items List */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-bold">전체 항목</span>
                <Select defaultValue="default">
                  <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300">
                    <SelectValue placeholder="기본순서" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">기본순서</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="border border-gray-300 h-[300px] overflow-y-auto bg-white">
                {availableItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-gray-600"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 border-gray-300 rounded-sm hover:bg-gray-50 bg-white"
              >
                <span className="text-lg text-gray-500 font-bold">+</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 border-gray-300 rounded-sm hover:bg-gray-50 bg-white"
              >
                <span className="text-lg text-gray-500 font-bold">-</span>
              </Button>
              <Button
                variant="outline"
                className="w-12 h-12 border-gray-300 rounded-sm hover:bg-gray-50 bg-white flex flex-col items-center justify-center gap-0 p-0"
              >
                <span className="text-[10px] text-gray-600 leading-none">
                  전체
                </span>
                <span className="text-[10px] text-gray-600 leading-none">
                  추가
                </span>
                <span className="text-xs text-gray-600 font-bold leading-none mt-0.5">
                  +
                </span>
              </Button>
              <Button
                variant="outline"
                className="w-12 h-12 border-gray-300 rounded-sm hover:bg-gray-50 bg-white flex flex-col items-center justify-center gap-0 p-0"
              >
                <span className="text-[10px] text-gray-600 leading-none">
                  전체
                </span>
                <span className="text-[10px] text-gray-600 leading-none">
                  삭제
                </span>
                <span className="text-xs text-gray-600 font-bold leading-none mt-0.5">
                  -
                </span>
              </Button>
            </div>

            {/* Selected Items List */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-bold">선택항목</span>
                  <Button
                    variant="secondary"
                    className="h-6 text-[11px] px-2 bg-gray-400 text-white hover:bg-gray-500 rounded-sm"
                  >
                    선택항목 전체보기
                  </Button>
                </div>
                <div className="flex gap-0 border border-gray-300 rounded-sm overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 p-0 hover:bg-gray-50 border-r border-gray-300 rounded-none bg-white"
                  >
                    <ChevronsUp className="w-3 h-3 text-gray-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 p-0 hover:bg-gray-50 border-r border-gray-300 rounded-none bg-white"
                  >
                    <ChevronUp className="w-3 h-3 text-gray-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 p-0 hover:bg-gray-50 border-r border-gray-300 rounded-none bg-white"
                  >
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 p-0 hover:bg-gray-50 rounded-none bg-white"
                  >
                    <ChevronsDown className="w-3 h-3 text-gray-400" />
                  </Button>
                </div>
              </div>
              <div className="border border-gray-300 h-[300px] overflow-y-auto bg-white">
                {selectedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-gray-600"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="space-y-1 mt-1">
                <div className="text-[11px] text-[#888888] flex items-center gap-1">
                  <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">
                    !
                  </span>
                  Shift 버튼을 누른 상태에서 선택하면 여러 항목을 동시에 선택할
                  수 있습니다.
                </div>
                <div className="text-[11px] text-[#888888] flex items-start gap-1">
                  <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold mt-0.5 flex-shrink-0">
                    !
                  </span>
                  "배송비"항목 미노출 설정 시, 배송비 선불/착불 선택조건 상품은
                  자동으로 선불로 선택되어 배송비가 부과됩니다.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Selected Items Info */}
        <div className="flex border-b border-gray-300">
          <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-300">
            선택항목 전체보기
          </div>
          <div className="flex-1 p-3 flex items-center text-gray-600">
            [선택항목 전체보기] 버튼을 클릭하면 현재 선택된 다운로드 항목을
            확인할 수 있습니다.
          </div>
        </div>

        {/* Discount Price Settings */}
        <div className="flex border-b border-gray-300">
          <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-300">
            할인적용가 설정
          </div>
          <div className="flex-1 p-3">
            <div className="flex gap-6 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="discount-price"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  defaultChecked
                />
                <Label
                  htmlFor="discount-price"
                  className="text-gray-700 font-normal cursor-pointer"
                >
                  상품할인가
                </Label>
              </div>
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="coupon-price"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"
                />
                <Label
                  htmlFor="coupon-price"
                  className="text-gray-700 font-normal cursor-pointer"
                >
                  상품쿠폰할인가
                </Label>
              </div>
            </div>
            <div className="text-[11px] text-[#888888] flex items-center gap-1">
              <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">
                !
              </span>
              할인적용가 노출 시 적용할 할인금액을 설정합니다.
            </div>
          </div>
        </div>

        {/* Additional Exposure Item Settings */}
        <div className="flex border-b border-gray-300">
          <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-300">
            노출항목 추가 설정
          </div>
          <div className="flex-1 p-3">
            <div className="flex gap-6 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="option-stock"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  defaultChecked
                />
                <Label
                  htmlFor="option-stock"
                  className="text-gray-700 font-normal cursor-pointer"
                >
                  옵션재고
                </Label>
              </div>
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="icon"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"
                />
                <Label
                  htmlFor="icon"
                  className="text-gray-700 font-normal cursor-pointer"
                >
                  아이콘
                </Label>
              </div>
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="rep-color"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  defaultChecked
                />
                <Label
                  htmlFor="rep-color"
                  className="text-gray-700 font-normal cursor-pointer"
                >
                  대표색상
                </Label>
              </div>
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="discount-rate"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"
                />
                <Label
                  htmlFor="discount-rate"
                  className="text-gray-700 font-normal cursor-pointer"
                >
                  할인율
                </Label>
              </div>
            </div>
            <div className="text-[11px] text-[#888888] flex items-center gap-1">
              <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">
                !
              </span>
              (할인율) 체크 시 판매가 대비 할인율이 할인금액에 노출됩니다.
              (쿠폰가와 할인적용가에 적용됩니다.)
            </div>
          </div>
        </div>

        {/* Cancellation Line Settings */}
        <div className="flex border-b border-gray-300">
          <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-300">
            취소선 추가 설정
          </div>
          <div className="flex-1 p-3">
            <div className="flex gap-6 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="strike-origin"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  defaultChecked
                />
                <Label
                  htmlFor="strike-origin"
                  className="text-gray-700 font-normal cursor-pointer"
                >
                  정가
                </Label>
              </div>
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="strike-sale"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"
                />
                <Label
                  htmlFor="strike-sale"
                  className="text-gray-700 font-normal cursor-pointer"
                >
                  판매가
                </Label>
              </div>
            </div>
            <div className="text-[11px] text-[#888888] flex items-start gap-1">
              <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold mt-0.5 flex-shrink-0">
                !
              </span>
              <div>
                체크시 쇼핑몰에 취소선 효과가 적용되어 출력됩니다. (예시. 정가{" "}
                <span className="line-through">12,000원</span>)
                <br />
                단, 판매가의 경우 할인가가 없는 상품에는 취소선이 적용되지
                않습니다.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Actions */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
        <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
          <span className="text-[10px] font-bold">
            <Youtube size={16} />
          </span>
        </Button>
        <Button className="rounded-full w-10 h-10 bg-[#7B4DFF] hover:bg-[#7B4DFF]/90 shadow-lg text-white p-0 flex items-center justify-center border-0 text-[10px] leading-tight flex-col">
          <span className="block">따라</span>
          <span className="block">하기</span>
        </Button>
        <div className="flex flex-col gap-0 rounded-full bg-white shadow-lg overflow-hidden border border-gray-200">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100 p-0"
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0 transform rotate-180"
          >
             <ChevronUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
