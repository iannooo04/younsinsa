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
  ChevronUp,
  Youtube,
  BookOpen,
  LayoutGrid, // 갤러리형
  ArrowLeftRight, // 상품이동형
  MessageSquare, // 말풍선형
} from "lucide-react";

export default function RelatedProductExposurePage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">관련상품 노출 설정</h1>
        <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm">
          저장
        </Button>
      </div>

      {/* PC Related Product Exposure Settings */}
      <div className="space-y-4 mb-10">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-300">
           <h2 className="text-lg font-bold text-gray-800">PC 관련상품 노출 설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="border-t border-gray-400">
             {/* Image Settings */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    이미지설정
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                    <Select defaultValue="list-image-180">
                        <SelectTrigger className="w-[280px] h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="리스트이미지(기본) - 180pixel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="list-image-180">리스트이미지(기본) - 180pixel</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="text-[11px] text-gray-500 flex items-center gap-1">
                        <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                        이미지는 <span className="text-blue-500 underline cursor-pointer">{"{기본설정>상품 정책>상품 이미지 사이즈 설정}"}</span>에서 관리할 수 있습니다.
                    </div>
                </div>
             </div>

             {/* Product Count */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    상품 노출 개수
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                    <span>가로 : </span>
                    <Select defaultValue="5">
                        <SelectTrigger className="w-16 h-7 text-xs border-gray-300">
                            <SelectValue placeholder="5" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                    </Select>
                    <span> X 세로 : </span>
                    <Select defaultValue="2">
                        <SelectTrigger className="w-16 h-7 text-xs border-gray-300">
                            <SelectValue placeholder="2" />
                        </SelectTrigger>
                        <SelectContent>
                             <SelectItem value="2">2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
             </div>

             {/* Sold Out Display & Sort */}
             <div className="grid grid-cols-[192px_1fr_192px_1fr] border-b border-gray-200">
                 <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    품절상품 노출
                 </div>
                 <div className="p-3 border-r border-gray-200">
                      <RadioGroup defaultValue="visible" className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="visible" id="pc-sold-visible" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="pc-sold-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="hidden" id="pc-sold-hidden" className="rounded-full border-gray-300 text-gray-600" />
                            <Label htmlFor="pc-sold-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                        </div>
                    </RadioGroup>
                 </div>
                 <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    품절상품 진열
                 </div>
                 <div className="p-3">
                      <RadioGroup defaultValue="order" className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="order" id="pc-sold-order" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="pc-sold-order" className="text-gray-700 font-normal cursor-pointer">정렬 순서대로 보여주기</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="end" id="pc-sold-end" className="rounded-full border-gray-300 text-gray-600" />
                            <Label htmlFor="pc-sold-end" className="text-gray-700 font-normal cursor-pointer">리스트 끝으로 보내기</Label>
                        </div>
                    </RadioGroup>
                 </div>
             </div>

             {/* Sold Out Icon Display & Icon Display */}
              <div className="grid grid-cols-[192px_1fr_192px_1fr] border-b border-gray-200">
                 <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    품절 아이콘 노출
                 </div>
                 <div className="p-3 border-r border-gray-200">
                      <RadioGroup defaultValue="visible" className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="visible" id="pc-icon-visible" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="pc-icon-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="hidden" id="pc-icon-hidden" className="rounded-full border-gray-300 text-gray-600" />
                            <Label htmlFor="pc-icon-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                        </div>
                    </RadioGroup>
                 </div>
                 <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    아이콘 노출
                 </div>
                 <div className="p-3">
                      <RadioGroup defaultValue="visible" className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="visible" id="pc-badge-visible" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="pc-badge-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="hidden" id="pc-badge-hidden" className="rounded-full border-gray-300 text-gray-600" />
                            <Label htmlFor="pc-badge-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                        </div>
                    </RadioGroup>
                 </div>
             </div>

             {/* Display Items Settings */}
             <div className="flex border-b border-gray-200">
                 <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 relative">
                     <span className="text-red-500 mr-1">•</span> 노출항목 설정
                 </div>
                 <div className="flex-1 p-3">
                     <div className="flex flex-wrap gap-x-6 gap-y-2">
                         {["이미지", "대표색상", "브랜드", "제조사", "상품명", "짧은설명", "정가", "판매가", "할인적용가", "쿠폰가", "상품할인금액", "마일리지", "모델번호", "상품코드"].map((item, idx) => (
                             <div key={idx} className="flex items-center gap-1.5">
                                 <Checkbox 
                                    id={`pc-item-${idx}`} 
                                    className={`w-3.5 h-3.5 border-gray-300 rounded-[2px] ${['이미지', '상품명', '판매가'].includes(item) ? 'data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500' : ''}`}
                                    defaultChecked={['이미지', '상품명', '판매가'].includes(item)}
                                 />
                                 <Label htmlFor={`pc-item-${idx}`} className="text-gray-600 font-normal cursor-pointer">{item}</Label>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>

             {/* Discount Price Settings */}
              <div className="flex border-b border-gray-200">
                 <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                     할인적용가 설정
                 </div>
                 <div className="p-3 border-r border-gray-200 flex-1">
                     <div className="flex gap-4">
                         <div className="flex items-center gap-1.5">
                             <Checkbox id="pc-discount" className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" defaultChecked/>
                             <Label htmlFor="pc-discount" className="text-gray-600 font-normal cursor-pointer">상품할인가</Label>
                         </div>
                         <div className="flex items-center gap-1.5">
                             <Checkbox id="pc-coupon" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"/>
                             <Label htmlFor="pc-coupon" className="text-gray-600 font-normal cursor-pointer">상품쿠폰할인가</Label>
                         </div>
                     </div>
                     <div className="text-[11px] text-[#888888] mt-1 flex items-center gap-1">
                         <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                         할인적용가 노출 시 적용할 할인금액을 설정합니다.
                     </div>
                 </div>
                  <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 justify-center">
                     취소선 추가 설정
                 </div>
                 <div className="p-3 flex-1">
                      <div className="flex gap-4">
                         <div className="flex items-center gap-1.5">
                             <Checkbox id="pc-strike-origin" className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" defaultChecked/>
                             <Label htmlFor="pc-strike-origin" className="text-gray-600 font-normal cursor-pointer">정가</Label>
                         </div>
                         <div className="flex items-center gap-1.5">
                             <Checkbox id="pc-strike-sale" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"/>
                             <Label htmlFor="pc-strike-sale" className="text-gray-600 font-normal cursor-pointer">판매가</Label>
                         </div>
                     </div>
                     <div className="text-[11px] text-[#888888] mt-1 flex items-start gap-1">
                         <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold mt-0.5 flex-shrink-0">!</span>
                         <div>
                            체크시 쇼핑몰에 취소선 효과가 적용되어 출력됩니다. (예시. 정가 <span className="line-through">12,000원</span>)<br/>
                            단, 판매가의 경우 할인가가 없는 상품에는 취소선이 적용되지 않습니다.
                         </div>
                     </div>
                 </div>
             </div>

             {/* Additional Item Settings */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-start pt-4 border-r border-gray-200">
                    노출항목 추가 설정
                </div>
                <div className="flex-1 p-3">
                    <div className="flex items-center gap-1.5">
                         <Checkbox id="pc-add-rate" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"/>
                         <Label htmlFor="pc-add-rate" className="text-gray-600 font-normal cursor-pointer">할인율</Label>
                    </div>
                     <div className="text-[11px] text-[#888888] mt-1 flex items-center gap-1">
                         <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                         (할인율) 체크 시 판매가 대비 할인율이 할인금액에 노출됩니다. (쿠폰가와 할인적용가에 적용됩니다.)
                     </div>
                </div>
             </div>
             
             {/* Related Product Connection */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    관련상품 연결
                </div>
                <div className="flex-1 p-3">
                     <RadioGroup defaultValue="new-tab" className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="current-tab" id="pc-conn-current" className="rounded-full border-gray-300 text-gray-600" />
                            <Label htmlFor="pc-conn-current" className="text-gray-700 font-normal cursor-pointer">현재창에서 관련상품 상세페이지 연결</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="new-tab" id="pc-conn-new" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="pc-conn-new" className="text-gray-700 font-normal cursor-pointer">새창으로 관련상품 상세페이지 연결</Label>
                        </div>
                     </RadioGroup>
                </div>
             </div>

             {/* Display Type */}
             <div className="flex border-b border-gray-200 min-h-[150px]">
                <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    디스플레이 유형
                </div>
                <div className="flex-1 p-3">
                    <RadioGroup defaultValue="gallery" className="flex flex-wrap gap-6">
                        {/* Gallery Type */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-16 border border-gray-300 bg-gray-100 flex items-center justify-center p-1">
                                <LayoutGrid className="text-gray-400 w-full h-full" />
                            </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="gallery" id="pc-disp-gallery" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="pc-disp-gallery" className="text-gray-700 text-xs cursor-pointer">갤러리형</Label>
                            </div>
                        </div>
                        {/* Move Type */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-16 border border-gray-300 bg-white flex flex-col items-center justify-center p-1 relative">
                                <ArrowLeftRight className="text-gray-400 w-8 h-8"/>
                                <div className="absolute bottom-1 w-full text-center text-[9px] text-red-500 border-t border-red-200">상품이 흘러가요</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="move" id="pc-disp-move" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="pc-disp-move" className="text-gray-700 text-xs cursor-pointer">상품이동형</Label>
                            </div>
                        </div>
                         {/* Vertical Move Type */}
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-24 h-16 border border-gray-300 bg-white flex flex-col items-center justify-center p-1 relative">
                                <ArrowLeftRight className="text-gray-400 w-8 h-8 transform rotate-90"/>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-4 flex items-center justify-center">
                                    <div className="h-full border-l border-red-200"></div>
                                </div>
                                 <div className="absolute bottom-1 w-full text-center text-[9px] text-red-500">상품이 흘러가요</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="v-move" id="pc-disp-vmove" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="pc-disp-vmove" className="text-gray-700 text-xs cursor-pointer">세로이동형</Label>
                            </div>
                        </div>
                         {/* Scroll Type */}
                         <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-16 border border-gray-300 bg-white flex flex-col items-center justify-center p-1 relative">
                                <div className="flex gap-1 mb-2">
                                     <div className="w-4 h-4 bg-gray-200"></div><div className="w-4 h-4 bg-gray-200"></div><div className="w-4 h-4 bg-gray-200"></div>
                                </div>
                                <div className="w-16 h-2 bg-gray-100 rounded-full relative">
                                    <div className="w-4 h-2 bg-red-500 rounded-full absolute left-0"></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="scroll" id="pc-disp-scroll" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="pc-disp-scroll" className="text-gray-700 text-xs cursor-pointer">스크롤형</Label>
                            </div>
                        </div>
                        {/* Highlight Type */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-16 border border-gray-300 bg-white grid grid-cols-3 gap-1 p-2">
                                <div className="bg-gray-200"></div>
                                <div className="border-2 border-red-500"></div>
                                <div className="bg-gray-200"></div>
                                <div className="bg-gray-200"></div>
                                <div className="bg-gray-200"></div>
                                <div className="bg-gray-200"></div>
                            </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="highlight" id="pc-disp-highlight" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="pc-disp-highlight" className="text-gray-700 text-xs cursor-pointer">선택강조형</Label>
                            </div>
                        </div>
                         {/* Simple Image Type */}
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-24 h-16 border border-gray-300 bg-white grid grid-cols-4 gap-1 p-2">
                                <div className="bg-gray-200 h-full"></div><div className="bg-gray-200 h-full"></div><div className="bg-gray-200 h-full"></div><div className="bg-gray-200 h-full"></div>
                                <div className="bg-gray-200 h-full"></div><div className="bg-gray-200 h-full"></div><div className="bg-gray-200 h-full"></div><div className="bg-gray-200 h-full"></div>
                             </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="simple" id="pc-disp-simple" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="pc-disp-simple" className="text-gray-700 text-xs cursor-pointer">심플이미지형</Label>
                            </div>
                        </div>
                        {/* Balloon Type */}
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-24 h-16 border border-gray-300 bg-white flex items-center justify-center relative">
                                <MessageSquare className="w-8 h-8 text-gray-300 fill-gray-100" />
                                <div className="absolute top-1 right-2 w-8 h-8 rounded-full bg-red-500 text-white text-[8px] flex flex-col items-center justify-center leading-none">
                                    <span>짧은</span>
                                    <span>설명글</span>
                                </div>
                             </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="balloon" id="pc-disp-balloon" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="pc-disp-balloon" className="text-gray-700 text-xs cursor-pointer">말풍선형</Label>
                            </div>
                        </div>
                         {/* Cart Type */}
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-24 h-16 border border-gray-300 bg-white flex gap-2 p-2 items-end justify-center">
                                <div className="w-8 h-10 bg-gray-200 relative"><div className="absolute bottom-0 right-0 text-red-500 font-bold text-[8px]">W</div></div>
                                <div className="w-8 h-10 bg-gray-200 relative"><div className="absolute bottom-0 right-0 text-red-500 font-bold text-[8px]">W</div></div>
                             </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="cart" id="pc-disp-cart" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="pc-disp-cart" className="text-gray-700 text-xs cursor-pointer">장바구니형</Label>
                            </div>
                        </div>
                         {/* Multi-Select Type */}
                         <div className="flex flex-col items-center gap-2">
                             <div className="w-24 h-16 border border-gray-300 bg-white flex gap-1 p-2 items-center justify-center">
                                  <div className="w-6 h-8 bg-gray-200 flex flex-col justify-end items-center"><span className="text-[6px]">w</span></div>
                                  <div className="w-6 h-8 bg-gray-200 flex flex-col justify-end items-center"><span className="text-[6px]">w</span></div>
                                  <div className="w-6 h-8 bg-gray-200 flex flex-col justify-end items-center"><span className="text-[6px]">w</span></div>
                             </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="multi" id="pc-disp-multi" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="pc-disp-multi" className="text-gray-700 text-xs cursor-pointer">복수선택형</Label>
                            </div>
                        </div>
                    </RadioGroup>
                </div>
             </div>
        </div>
      </div>

       {/* Mobile Related Product Exposure Settings */}
      <div className="space-y-4 mb-10">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-300">
           <h2 className="text-lg font-bold text-gray-800">모바일 관련상품 노출 설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="border-t border-gray-400">
             {/* Image Settings */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    이미지설정
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                    <Select defaultValue="list-image-180">
                        <SelectTrigger className="w-[280px] h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="리스트이미지(기본) - 180pixel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="list-image-180">리스트이미지(기본) - 180pixel</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="text-[11px] text-gray-500 flex items-center gap-1">
                        <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                        이미지는 <span className="text-blue-500 underline cursor-pointer">{"{기본설정>상품 정책>상품 이미지 사이즈 설정}"}</span>에서 관리할 수 있습니다.
                    </div>
                </div>
             </div>

             {/* Product Count */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    상품 노출 개수
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                    <span>가로 : </span>
                    <Select defaultValue="2">
                        <SelectTrigger className="w-16 h-7 text-xs border-gray-300">
                            <SelectValue placeholder="2" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">2</SelectItem>
                        </SelectContent>
                    </Select>
                    <span> X 세로 : </span>
                    <Select defaultValue="2">
                        <SelectTrigger className="w-16 h-7 text-xs border-gray-300">
                            <SelectValue placeholder="2" />
                        </SelectTrigger>
                        <SelectContent>
                             <SelectItem value="2">2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
             </div>

             {/* Sold Out Display & Sort (Same as PC) */}
             <div className="grid grid-cols-[192px_1fr_192px_1fr] border-b border-gray-200">
                 <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    품절상품 노출
                 </div>
                 <div className="p-3 border-r border-gray-200">
                      <RadioGroup defaultValue="visible" className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="visible" id="mo-sold-visible" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="mo-sold-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="hidden" id="mo-sold-hidden" className="rounded-full border-gray-300 text-gray-600" />
                            <Label htmlFor="mo-sold-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                        </div>
                    </RadioGroup>
                 </div>
                 <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    품절상품 진열
                 </div>
                 <div className="p-3">
                      <RadioGroup defaultValue="order" className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="order" id="mo-sold-order" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="mo-sold-order" className="text-gray-700 font-normal cursor-pointer">정렬 순서대로 보여주기</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="end" id="mo-sold-end" className="rounded-full border-gray-300 text-gray-600" />
                            <Label htmlFor="mo-sold-end" className="text-gray-700 font-normal cursor-pointer">리스트 끝으로 보내기</Label>
                        </div>
                    </RadioGroup>
                 </div>
             </div>

             {/* Sold Out Icon Display & Icon Display (Same as PC) */}
              <div className="grid grid-cols-[192px_1fr_192px_1fr] border-b border-gray-200">
                 <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    품절 아이콘 노출
                 </div>
                 <div className="p-3 border-r border-gray-200">
                      <RadioGroup defaultValue="visible" className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="visible" id="mo-icon-visible" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="mo-icon-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="hidden" id="mo-icon-hidden" className="rounded-full border-gray-300 text-gray-600" />
                            <Label htmlFor="mo-icon-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                        </div>
                    </RadioGroup>
                 </div>
                 <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    아이콘 노출
                 </div>
                 <div className="p-3">
                      <RadioGroup defaultValue="visible" className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="visible" id="mo-badge-visible" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="mo-badge-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="hidden" id="mo-badge-hidden" className="rounded-full border-gray-300 text-gray-600" />
                            <Label htmlFor="mo-badge-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                        </div>
                    </RadioGroup>
                 </div>
             </div>

             {/* Display Items Settings (Same as PC) */}
             <div className="flex border-b border-gray-200">
                 <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 relative">
                     <span className="text-red-500 mr-1">•</span> 노출항목 설정
                 </div>
                 <div className="flex-1 p-3">
                     <div className="flex flex-wrap gap-x-6 gap-y-2">
                         {["이미지", "대표색상", "브랜드", "제조사", "상품명", "짧은설명", "정가", "판매가", "할인적용가", "쿠폰가", "상품할인금액", "마일리지", "모델번호", "상품코드"].map((item, idx) => (
                             <div key={idx} className="flex items-center gap-1.5">
                                 <Checkbox 
                                    id={`mo-item-${idx}`} 
                                    className={`w-3.5 h-3.5 border-gray-300 rounded-[2px] ${['이미지', '상품명', '판매가'].includes(item) ? 'data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500' : ''}`}
                                    defaultChecked={['이미지', '상품명', '판매가'].includes(item)}
                                 />
                                 <Label htmlFor={`mo-item-${idx}`} className="text-gray-600 font-normal cursor-pointer">{item}</Label>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>

             {/* Discount Price Settings (Same as PC) */}
              <div className="flex border-b border-gray-200">
                 <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                     할인적용가 설정
                 </div>
                 <div className="p-3 border-r border-gray-200 flex-1">
                     <div className="flex gap-4">
                         <div className="flex items-center gap-1.5">
                             <Checkbox id="mo-discount" className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" defaultChecked/>
                             <Label htmlFor="mo-discount" className="text-gray-600 font-normal cursor-pointer">상품할인가</Label>
                         </div>
                         <div className="flex items-center gap-1.5">
                             <Checkbox id="mo-coupon" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"/>
                             <Label htmlFor="mo-coupon" className="text-gray-600 font-normal cursor-pointer">상품쿠폰할인가</Label>
                         </div>
                     </div>
                     <div className="text-[11px] text-[#888888] mt-1 flex items-center gap-1">
                         <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                         할인적용가 노출 시 적용할 할인금액을 설정합니다.
                     </div>
                 </div>
                  <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 justify-center">
                     취소선 추가 설정
                 </div>
                 <div className="p-3 flex-1">
                      <div className="flex gap-4">
                         <div className="flex items-center gap-1.5">
                             <Checkbox id="mo-strike-origin" className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" defaultChecked/>
                             <Label htmlFor="mo-strike-origin" className="text-gray-600 font-normal cursor-pointer">정가</Label>
                         </div>
                         <div className="flex items-center gap-1.5">
                             <Checkbox id="mo-strike-sale" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"/>
                             <Label htmlFor="mo-strike-sale" className="text-gray-600 font-normal cursor-pointer">판매가</Label>
                         </div>
                     </div>
                     <div className="text-[11px] text-[#888888] mt-1 flex items-start gap-1">
                         <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold mt-0.5 flex-shrink-0">!</span>
                         <div>
                            체크시 쇼핑몰에 취소선 효과가 적용되어 출력됩니다. (예시. 정가 <span className="line-through">12,000원</span>)<br/>
                            단, 판매가의 경우 할인가가 없는 상품에는 취소선이 적용되지 않습니다.
                         </div>
                     </div>
                 </div>
             </div>

             {/* Additional Item Settings (Same as PC) */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-start pt-4 border-r border-gray-200">
                    노출항목 추가 설정
                </div>
                <div className="flex-1 p-3">
                    <div className="flex items-center gap-1.5">
                         <Checkbox id="mo-add-rate" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"/>
                         <Label htmlFor="mo-add-rate" className="text-gray-600 font-normal cursor-pointer">할인율</Label>
                    </div>
                     <div className="text-[11px] text-[#888888] mt-1 flex items-center gap-1">
                         <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                         (할인율) 체크 시 판매가 대비 할인율이 할인금액에 노출됩니다. (쿠폰가와 할인적용가에 적용됩니다.)
                     </div>
                </div>
             </div>
             
             {/* Related Product Connection (Same as PC) */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    관련상품 연결
                </div>
                <div className="flex-1 p-3">
                     <RadioGroup defaultValue="new-tab" className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="current-tab" id="mo-conn-current" className="rounded-full border-gray-300 text-gray-600" />
                            <Label htmlFor="mo-conn-current" className="text-gray-700 font-normal cursor-pointer">현재창에서 관련상품 상세페이지 연결</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="new-tab" id="mo-conn-new" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="mo-conn-new" className="text-gray-700 font-normal cursor-pointer">새창으로 관련상품 상세페이지 연결</Label>
                        </div>
                     </RadioGroup>
                </div>
             </div>

             {/* Display Type - Mobile version */}
             <div className="flex border-b border-gray-200 min-h-[150px]">
                <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    디스플레이 유형
                </div>
                <div className="flex-1 p-3">
                    <RadioGroup defaultValue="gallery" className="flex flex-wrap gap-6">
                        {/* Gallery Type */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-16 border border-gray-300 bg-gray-100 flex items-center justify-center p-1">
                                <LayoutGrid className="text-gray-400 w-full h-full" />
                            </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="gallery" id="mo-disp-gallery" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="mo-disp-gallery" className="text-gray-700 text-xs cursor-pointer">갤러리형</Label>
                            </div>
                        </div>
                         {/* List Type (Mobile Exclusive Example in screenshot) */}
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-24 h-16 border border-gray-300 bg-white flex flex-col justify-center p-2 gap-1">
                                <div className="h-4 bg-gray-200 w-full flex items-center gap-1"><div className="w-4 h-4 bg-gray-400"></div><div className="h-1 bg-gray-400 flex-1"></div></div>
                                <div className="h-4 bg-gray-200 w-full flex items-center gap-1"><div className="w-4 h-4 bg-gray-400"></div><div className="h-1 bg-gray-400 flex-1"></div></div>
                             </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="list" id="mo-disp-list" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="mo-disp-list" className="text-gray-700 text-xs cursor-pointer">리스트형</Label>
                            </div>
                        </div>
                        {/* Move Type */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-16 border border-gray-300 bg-white flex flex-col items-center justify-center p-1 relative">
                                <ArrowLeftRight className="text-gray-400 w-8 h-8"/>
                                <div className="absolute bottom-1 w-full text-center text-[9px] text-red-500 border-t border-red-200">상품이 흘러가요</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="move" id="mo-disp-move" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="mo-disp-move" className="text-gray-700 text-xs cursor-pointer">상품이동형</Label>
                            </div>
                        </div>
                         {/* Scroll Type */}
                         <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-16 border border-gray-300 bg-white flex flex-col items-center justify-center p-1 relative">
                                <div className="flex gap-1 mb-2">
                                     <div className="w-4 h-4 bg-gray-200"></div><div className="w-4 h-4 bg-gray-200"></div><div className="w-4 h-4 bg-gray-200"></div>
                                </div>
                                <div className="w-16 h-2 bg-gray-100 rounded-full relative">
                                    <div className="w-4 h-2 bg-red-500 rounded-full absolute left-0"></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="scroll" id="mo-disp-scroll" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="mo-disp-scroll" className="text-gray-700 text-xs cursor-pointer">스크롤형</Label>
                            </div>
                        </div>
                         {/* Simple Image Type */}
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-24 h-16 border border-gray-300 bg-white grid grid-cols-4 gap-1 p-2">
                                <div className="bg-gray-200 h-full"></div><div className="bg-gray-200 h-full"></div><div className="bg-gray-200 h-full"></div><div className="bg-gray-200 h-full"></div>
                                <div className="bg-gray-200 h-full"></div><div className="bg-gray-200 h-full"></div><div className="bg-gray-200 h-full"></div><div className="bg-gray-200 h-full"></div>
                             </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="simple" id="mo-disp-simple" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="mo-disp-simple" className="text-gray-700 text-xs cursor-pointer">심플이미지형</Label>
                            </div>
                        </div>
                         {/* Cart Type */}
                        <div className="flex flex-col items-center gap-2">
                             <div className="w-24 h-16 border border-gray-300 bg-white flex gap-2 p-2 items-end justify-center">
                                <div className="w-8 h-10 bg-gray-200 relative"><div className="absolute bottom-0 right-0 text-red-500 font-bold text-[8px]">W</div></div>
                                <div className="w-8 h-10 bg-gray-200 relative"><div className="absolute bottom-0 right-0 text-red-500 font-bold text-[8px]">W</div></div>
                             </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="cart" id="mo-disp-cart" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="mo-disp-cart" className="text-gray-700 text-xs cursor-pointer">장바구니형</Label>
                            </div>
                        </div>
                         {/* Multi-Select Type */}
                         <div className="flex flex-col items-center gap-2">
                             <div className="w-24 h-16 border border-gray-300 bg-white flex gap-1 p-2 items-center justify-center">
                                  <div className="w-6 h-8 bg-gray-200 flex flex-col justify-end items-center"><span className="text-[6px]">w</span></div>
                                  <div className="w-6 h-8 bg-gray-200 flex flex-col justify-end items-center"><span className="text-[6px]">w</span></div>
                                  <div className="w-6 h-8 bg-gray-200 flex flex-col justify-end items-center"><span className="text-[6px]">w</span></div>
                             </div>
                            <div className="flex items-center gap-1">
                                <RadioGroupItem value="multi" id="mo-disp-multi" className="rounded-full border-gray-300 text-gray-600" />
                                <Label htmlFor="mo-disp-multi" className="text-gray-700 text-xs cursor-pointer">복수선택형</Label>
                            </div>
                        </div>
                    </RadioGroup>
                </div>
             </div>
        </div>
      </div>

       {/* Guide Section */}
      <div className="border-t border-gray-300 pt-6 space-y-4">
           <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs">
              <BookOpen className="w-4 h-4" /> 
              <span>안내</span>
           </div>
           <div className="text-xs space-y-2 text-gray-600">
              <h3 className="font-bold text-gray-800">[상품 정보] 관련상품 노출 순서 설정은 어떻게하나요?</h3>
              <p>· 관련상품 진열 순서는 "상품 {'>'} 상품 관리 {'>'} 상품 등록" 메뉴의 "관련상품 {'>'} 관련상품 설정" 항목에서 "자동 / 수동"으로 설정이 가능합니다.</p>
              <p className="pl-2">- 자동 : "상품 {'>'} 상품 노출형태 관리 {'>'} 관련상품 노출 설정"에 설정된 정보대로 같은 카테고리의 상품이 랜덤으로 노출됩니다.</p>
              <p className="pl-2">- 수동 : 운영자가 노출시키고 싶은 상품을 직접 선택하여 등록합니다.</p>
              
              <h3 className="font-bold text-gray-800 mt-4">[상품 정보] 노출항목 순서 변경은 어떻게하나요?</h3>
              <p>· 관련상품 노출 설정 페이지에서 노출항목 순서는 변경이 불가능하므로, "디자인" 메뉴에서 html 소스를 수정해야 합니다.</p>
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
