"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
} from "lucide-react";

export default function SearchRecommendationPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">검색창 추천상품 노출 설정</h1>
        <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm">
          저장
        </Button>
      </div>

      <div className="space-y-10">
        {/* List Details Settings */}
        <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-300">
               <h2 className="text-lg font-bold text-gray-800">리스트 영역 상세 설정</h2>
               <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="border border-gray-300 border-b-0 text-xs">
                {/* Row 1: Exposure Status (PC & Mobile) */}
                <div className="flex border-b border-gray-200">
                    <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                        PC쇼핑몰 노출상태
                    </div>
                    <div className="p-3 border-r border-gray-200 flex-1">
                        <RadioGroup defaultValue="visible" className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="visible" id="pc-visible" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="pc-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="hidden" id="pc-hidden" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="pc-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                        모바일쇼핑몰 노출상태
                    </div>
                    <div className="p-3 flex-1">
                        <RadioGroup defaultValue="visible" className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="visible" id="mo-visible" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="mo-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="hidden" id="mo-hidden" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="mo-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                {/* Row 2: Image Settings */}
                <div className="flex border-b border-gray-200">
                    <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                        이미지설정
                    </div>
                    <div className="flex-1 p-3 flex items-center gap-2">
                         <Select defaultValue="list-180">
                            <SelectTrigger className="w-64 h-7 text-xs border-gray-300">
                                <SelectValue placeholder="리스트이미지(기본) - 180 pixel" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="list-180">리스트이미지(기본) - 180 pixel</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="text-[11px] text-[#888888] flex items-center gap-1 ml-1">
                            <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                            이미지는 <span className="text-blue-500 underline cursor-pointer">기본설정{">"}상품 정책{">"}상품 이미지 사이즈 설정</span>에서 관리할 수 있습니다.
                        </div>
                    </div>
                </div>

                {/* Row 3: Product Exposure Method & Sold Out Exposure */}
                <div className="flex border-b border-gray-200">
                     <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                        상품 노출 방식
                    </div>
                    <div className="p-3 border-r border-gray-200 flex-1">
                         <RadioGroup defaultValue="random" className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="random" id="method-random" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="method-random" className="text-gray-700 font-normal cursor-pointer">랜덤</Label>
                            </div>
                        </RadioGroup>
                    </div>
                     <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                        품절상품 노출
                    </div>
                    <div className="p-3 flex-1">
                        <RadioGroup defaultValue="visible" className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="visible" id="sold-visible" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="sold-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="hidden" id="sold-hidden" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="sold-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                {/* Row 4: Display Items */}
                <div className="flex border-b border-gray-200">
                    <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                        <span className="text-red-500 mr-1">•</span> 노출항목 설정
                    </div>
                    <div className="flex-1 p-3">
                         <div className="flex flex-wrap gap-x-6 gap-y-2">
                             {[
                               { label: "이미지", checked: true },
                               { label: "대표색상", checked: false },
                               { label: "브랜드", checked: false },
                               { label: "제조사", checked: false },
                               { label: "상품명", checked: true },
                               { label: "짧은설명", checked: false },
                               { label: "정가", checked: false },
                               { label: "판매가", checked: false },
                               { label: "할인적용가", checked: false },
                               { label: "쿠폰가", checked: false },
                               { label: "상품할인금액", checked: false },
                               { label: "마일리지", checked: false },
                               { label: "모델번호", checked: false },
                               { label: "상품코드", checked: false },
                             ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-1.5">
                                    <Checkbox
                                        id={`item-${idx}`}
                                        className={`w-3.5 h-3.5 border-gray-300 rounded-[2px] ${item.checked ? 'data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500' : ''}`}
                                        defaultChecked={item.checked}
                                     />
                                    <Label htmlFor={`item-${idx}`} className="text-gray-600 font-normal cursor-pointer">{item.label}</Label>
                                </div>
                             ))}
                          </div>
                    </div>
                </div>

                {/* Row 5: Discount & Strikethrough Settings */}
                <div className="flex border-b border-gray-200">
                    <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                        할인적용가 설정
                    </div>
                    <div className="p-3 border-r border-gray-200 flex-1">
                          <div className="flex gap-4 mb-1">
                              <div className="flex items-center gap-1.5">
                                  <Checkbox id="discount-price" className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" defaultChecked/>
                                  <Label htmlFor="discount-price" className="text-gray-600 font-normal cursor-pointer">상품할인가</Label>
                              </div>
                              <div className="flex items-center gap-1.5">
                                  <Checkbox id="coupon-price" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"/>
                                  <Label htmlFor="coupon-price" className="text-gray-600 font-normal cursor-pointer">상품쿠폰할인가</Label>
                              </div>
                          </div>
                          <div className="text-[11px] text-[#888888] flex items-center gap-1">
                              <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                              할인적용가 노출 시 적용할 할인금액을 설정합니다.
                          </div>
                    </div>
                     <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                        취소선 추가 설정
                    </div>
                    <div className="p-3 flex-1">
                         <div className="flex gap-4 mb-1">
                              <div className="flex items-center gap-1.5">
                                  <Checkbox id="strike-origin" className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" defaultChecked/>
                                  <Label htmlFor="strike-origin" className="text-gray-600 font-normal cursor-pointer">정가</Label>
                              </div>
                              <div className="flex items-center gap-1.5">
                                  <Checkbox id="strike-sale" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"/>
                                  <Label htmlFor="strike-sale" className="text-gray-600 font-normal cursor-pointer">판매가</Label>
                              </div>
                          </div>
                          <div className="text-[11px] text-[#888888] flex items-start gap-1">
                              <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold mt-0.5 flex-shrink-0">!</span>
                              <div>
                                  체크시 쇼핑몰에 취소선 효과가 적용되어 출력됩니다. (예시. 정가 <span className="line-through">12,000원</span>)<br/>
                                  단, 판매가의 경우 할인가가 없는 상품에는 취소선이 적용되지 않습니다.
                              </div>
                          </div>
                    </div>
                </div>

                 {/* Row 6: Additional Items */}
                <div className="flex border-b border-gray-200">
                    <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                        노출항목 추가 설정
                    </div>
                    <div className="flex-1 p-3">
                         <div className="flex items-center gap-1.5 mb-1">
                              <Checkbox id="add-rate" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"/>
                              <Label htmlFor="add-rate" className="text-gray-600 font-normal cursor-pointer">할인율</Label>
                         </div>
                         <div className="text-[11px] text-[#888888] flex items-center gap-1">
                              <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                              (할인율) 체크 시 판매가 대비 할인율이 할인금액에 노출됩니다. (쿠폰가와 할인적용가에 적용됩니다.)
                          </div>
                    </div>
                </div>

            </div>
        </div>

        {/* Display Product Settings */}
        <div className="space-y-4">
             <div className="flex items-center gap-2 pb-2 border-b border-gray-300">
               <h2 className="text-lg font-bold text-gray-800">노출상품 설정</h2>
               <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="border-t-2 border-[#BEBEBE] mb-4 overflow-x-auto">
                <table className="w-full text-xs text-center border-collapse table-fixed min-w-[1000px]">
                    <colgroup>
                        <col className="w-10" />
                        <col className="w-16" />
                        <col className="w-20" />
                        <col className="" />
                        <col className="w-24" />
                        <col className="w-24" />
                        <col className="w-12" />
                        <col className="w-16" />
                        <col className="w-28" />
                        <col className="w-28" />
                        <col className="w-14" />
                        <col className="w-14" />
                    </colgroup>
                    <thead className="bg-[#BDBDBD] text-white font-normal">
                        <tr>
                            <th className="py-2 border-r border-[#CDCDCD]">
                                <Checkbox className="bg-white border-gray-300 rounded-[2px]"/>
                            </th>
                            <th className="py-2 border-r border-[#CDCDCD]">번호</th>
                            <th className="py-2 border-r border-[#CDCDCD]">이미지</th>
                            <th className="py-2 border-r border-[#CDCDCD]">상품명</th>
                            <th className="py-2 border-r border-[#CDCDCD]">판매가</th>
                            <th className="py-2 border-r border-[#CDCDCD]">공급사</th>
                            <th className="py-2 border-r border-[#CDCDCD]">재고</th>
                            <th className="py-2 border-r border-[#CDCDCD]">품절상태</th>
                            <th className="py-2 border-r border-[#CDCDCD]">PC쇼핑몰 노출상태</th>
                            <th className="py-2 border-r border-[#CDCDCD]">모바일쇼핑몰 노출상태</th>
                            <th className="py-2 border-r border-[#CDCDCD]">진열</th>
                            <th className="py-2">삭제</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 bg-white">
                        <tr>
                            <td colSpan={12} className="py-10 border-b border-gray-200 text-center text-gray-400">
                                선택된 상품이 없습니다.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div className="flex justify-between items-center bg-[#F9F9F9] p-3 border-t border-b border-gray-200 mb-10">
                <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 hover:bg-gray-50 text-gray-700 rounded-none shadow-sm px-3 font-normal">선택 삭제</Button>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 hover:bg-gray-50 text-gray-700 rounded-none shadow-sm px-3 font-normal">상품 선택</Button>
            </div>
        </div>

      </div>

      {/* Floating Actions */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
        <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
            <span className="text-[10px] font-bold"><Youtube size={16}/></span>
        </Button>
        <Button className="rounded-full w-10 h-10 bg-[#7B4DFF] hover:bg-[#7B4DFF]/90 shadow-lg text-white p-0 flex items-center justify-center border-0 text-[10px] leading-tight flex-col">
            <span className="block">따라</span>
            <span className="block">하기</span>
        </Button>
        <div className="flex flex-col gap-0 rounded-full bg-white shadow-lg overflow-hidden border border-gray-200">
            <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100 p-0">
                    <ChevronUp className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0 transform rotate-180">
                     <ChevronUp className="w-4 h-4" />
            </Button>
        </div>
      </div>
    </div>
  );
}
