"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
  ChevronUp,
  Folder,
  HelpCircle,
  Play,
  File,
  Plus,
  Minus,
  Youtube,
  ChevronDown
} from "lucide-react";
import React from "react";

export default function BrandManagementPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-sm pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">브랜드 관리</h1>
        <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm">
          저장
        </Button>
      </div>

      <div className="flex gap-6 h-full">
        {/* Left Sidebar: Brand Tree */}
        <div className="w-[280px] flex-shrink-0 border-r border-gray-200 pr-4 min-h-[800px]">
          <div className="flex gap-1 mb-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs px-2 rounded-sm border-gray-300 bg-white hover:bg-gray-50"
            >
              1차 브랜드 생성
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs px-2 rounded-sm border-gray-300 bg-white hover:bg-gray-50"
            >
              하위 브랜드 생성
            </Button>
             <div className="flex gap-1 ml-auto">
                 <Button variant="ghost" size="icon" className="h-7 w-7"><Plus className="w-3 h-3 text-blue-500"/></Button>
                 <Button variant="ghost" size="icon" className="h-7 w-7"><Minus className="w-3 h-3 text-blue-500"/></Button>
             </div>
          </div>
          
          <div className="border border-gray-300 h-full bg-white p-2 overflow-y-auto">
             <div className="tree-item flex items-center gap-1 py-1 text-gray-700 cursor-pointer">
                 <Play className="w-2 h-2 fill-gray-500 text-gray-500 transform rotate-90" />
                 <Folder className="w-4 h-4 text-orange-200 fill-orange-200" />
                 <span className="text-sm">브랜드</span>
             </div>
             <div className="pl-4">
                 {[
                    'Malbon Golf', 'G/FORE', 'Titleist', 'LANVIN BLANC', 'FootJoy', 
                    'SOUTHCAPE', 'PXG', 'DESCENTE Golf', 'St.Andrews', 'Pearly Gates', 
                    'Master Bunny Edition', 'AmazingCre', 'BOSS Golf', 'A.P.C Golf'
                 ].map((item) => (
                     <div key={item} className="flex items-center gap-1 py-1 cursor-pointer hover:bg-blue-50">
                         <Folder className="w-4 h-4 text-sky-200 fill-sky-200" />
                         <span className="text-sm text-gray-700">{item}</span>
                     </div>
                 ))}
             </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-10 min-w-0">
          
          {/* Section 1: Brand Info */}
          <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-black">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">브랜드 정보</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm" className="h-7 text-xs bg-gray-400 text-white hover:bg-gray-500 rounded-sm">상품진열</Button>
                      <button className="flex items-center text-xs text-blue-600 font-bold">닫힘 <ChevronUp className="w-3 h-3 ml-1"/></button>
                  </div>
              </div>

              <div className="border-t border-gray-200 text-xs">
                  {/* Row: Exposure Shop */}
                  <div className="flex border-b border-gray-200">
                      <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          노출상점
                      </div>
                      <div className="flex-1 p-3 flex flex-col gap-2">
                          <div className="flex items-center gap-6">
                              <label className="flex items-center gap-1.5 cursor-pointer">
                                  <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" defaultChecked/>
                                  <span className="text-gray-700">전체</span>
                              </label>
                              <label className="flex items-center gap-1.5 cursor-pointer">
                                  <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" defaultChecked/>
                                  <div className="flex items-center gap-1"><span className="text-lg leading-none">🇰🇷</span> <span className="text-gray-700">기준몰</span></div>
                              </label>
                              <label className="flex items-center gap-1.5 cursor-pointer">
                                  <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" defaultChecked/>
                                  <div className="flex items-center gap-1"><span className="text-lg leading-none">🇨🇳</span> <span className="text-gray-700">중문몰</span></div>
                              </label>
                          </div>
                          <div>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                                <span className="text-gray-700">하위 브랜드 동일 적용</span>
                            </label>
                          </div>
                      </div>
                  </div>

                  {/* Row: Brand Name */}
                  <div className="flex border-b border-gray-200">
                      <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-start pt-6 border-r border-gray-200 relative">
                           <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-red-500 rounded-full mb-0.5"></div>
                                <span>브랜드명</span>
                                <HelpCircle className="w-3 h-3 text-gray-400 ml-1" />
                            </div>
                      </div>
                      <div className="flex-1 p-3 space-y-2">
                          <div className="flex items-center gap-2">
                              <span className="w-14 font-bold text-gray-600">기준몰</span>
                              <Input className="w-[300px] h-7 text-xs border-gray-300 rounded-sm" />
                              <span className="text-gray-400 text-[11px]"><strong className="text-red-500">0</strong> / 30</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <span className="w-14 flex justify-start text-lg">🇨🇳</span>
                              <Input className="w-[300px] h-7 text-xs border-gray-300 rounded-sm" />
                              <span className="text-gray-400 text-[11px]"><strong className="text-red-500">0</strong> / 30</span>
                          </div>
                          <div className="flex items-center gap-4 pl-[64px]">
                               <label className="flex items-center gap-1.5 cursor-pointer">
                                  <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500" defaultChecked />
                                  <span className="text-[11px] text-gray-700">기준몰 브랜드명 공통사용</span>
                               </label>
                               <Button variant="secondary" size="sm" className="h-6 text-[11px] bg-gray-600 text-white hover:bg-gray-700 rounded-sm px-2">참고 번역</Button>
                          </div>
                          <div className="text-[11px] text-gray-500 mt-2 pl-0">
                             <p className="flex items-center gap-1">
                                 <span className="bg-gray-600 text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[1px] font-bold">!</span>
                                 기본적으로 입력된 텍스트로 해당 브랜드 보여집니다
                             </p>
                             <p className="flex items-center gap-1 mt-1 pl-4 text-gray-400">
                                 브랜드를 이미지로 노출하려면 아래 "브랜드 이미지등록" 항목에 이미지를 등록하세요.
                             </p>
                          </div>
                      </div>
                  </div>

                  {/* Row: Brand Type */}
                  <div className="flex border-b border-gray-200">
                      <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          브랜드 타입
                      </div>
                      <div className="flex-1 p-3">
                          <RadioGroup defaultValue="general" className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="general" id="type-general" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                  <Label htmlFor="type-general" className="text-gray-700 font-normal">일반 브랜드 <span className="text-blue-500">(브랜드 페이지가 있고, 상품연결이 되는 일반적인 브랜드입니다)</span></Label>
                              </div>
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="group" id="type-group" className="rounded-full border-gray-300 text-gray-600" />
                                  <Label htmlFor="type-group" className="text-gray-700 font-normal">그룹(구분) 브랜드 <span className="text-blue-500">(브랜드 페이지가 없고, 상품연결이 안되는 그룹(구분) 브랜드입니다)</span></Label>
                              </div>
                          </RadioGroup>
                      </div>
                  </div>

                  {/* Row: PC Display */}
                  <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          PC쇼핑몰<br/>노출상태
                      </div>
                      <div className="flex-1 p-3">
                           <RadioGroup defaultValue="visible" className="flex gap-6">
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="visible" id="pc-visible" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                  <Label htmlFor="pc-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="hidden" id="pc-hidden" className="rounded-full border-gray-300 text-gray-600" />
                                  <Label htmlFor="pc-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                              </div>
                          </RadioGroup>
                      </div>
                  </div>

                   {/* Row: Mobile Display */}
                   <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          모바일쇼핑몰<br/>노출상태
                      </div>
                      <div className="flex-1 p-3">
                           <RadioGroup defaultValue="visible" className="flex gap-6">
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="visible" id="mo-visible" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                  <Label htmlFor="mo-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="hidden" id="mo-hidden" className="rounded-full border-gray-300 text-gray-600" />
                                  <Label htmlFor="mo-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                              </div>
                          </RadioGroup>
                      </div>
                  </div>

                  {/* Row: PC Image */}
                  <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          PC쇼핑몰<br/>브랜드 이미지 등록
                      </div>
                      <div className="flex-1 p-3 flex flex-col justify-center gap-2">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                              <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                              <span className="text-gray-700">모바일 쇼핑몰과 동일 적용</span>
                          </label>
                          <div className="flex items-center gap-1">
                               <Button variant="secondary" size="sm" className="h-7 text-xs bg-[#A4A4A4] text-white hover:bg-[#909090] rounded-none px-3">찾아보기</Button>
                               <div className="w-[180px] h-7 border border-gray-300 bg-[#F1F1F1]"></div>
                          </div>
                      </div>
                      <div className="w-56 bg-white p-3 font-bold text-gray-700 flex flex-col justify-center gap-2 border-l border-gray-200 items-start">
                          <span>PC쇼핑몰<br/>마우스오버 이미지 등록</span>
                      </div>
                       <div className="flex-1 p-3 flex flex-col justify-center gap-2 border-l border-gray-200">
                           <div className="flex items-center gap-1">
                               <Button variant="secondary" size="sm" className="h-7 text-xs bg-[#A4A4A4] text-white hover:bg-[#909090] rounded-none px-3">찾아보기</Button>
                               <div className="w-[180px] h-7 border border-gray-300 bg-[#F1F1F1]"></div>
                          </div>
                      </div>
                  </div>

                   {/* Row: Mobile Image */}
                  <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          모바일쇼핑몰<br/>브랜드 이미지 등록
                      </div>
                      <div className="flex-1 p-3 flex items-center">
                          <div className="flex items-center gap-1">
                               <Button variant="secondary" size="sm" className="h-7 text-xs bg-[#A4A4A4] text-white hover:bg-[#909090] rounded-none px-3">찾아보기</Button>
                               <div className="w-[200px] h-7 border border-gray-300 bg-[#F1F1F1]"></div>
                          </div>
                      </div>
                  </div>

                   {/* Row: Adult Auth */}
                   <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          성인인증
                      </div>
                      <div className="flex-1 p-3 space-y-2">
                           <RadioGroup defaultValue="unused" className="flex gap-6 items-center">
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="unused" id="adult-unused" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                  <Label htmlFor="adult-unused" className="text-gray-700 font-normal cursor-pointer">사용안함</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="used" id="adult-used" className="rounded-full border-gray-300 text-gray-600" />
                                  <Label htmlFor="adult-used" className="text-gray-700 font-normal cursor-pointer">사용함</Label>
                                  <span className="text-gray-400 text-[11px] flex items-center gap-1">( <Checkbox className="w-3 h-3 border-gray-300" /> 미인증 고객 브랜드 노출함 )</span>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                  <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" id="adult-sub" />
                                  <Label htmlFor="adult-sub" className="text-gray-700 font-normal cursor-pointer">하위 브랜드 동일 적용</Label>
                              </div>
                          </RadioGroup>
                          <div className="text-[11px] text-gray-500 space-y-1 mt-2">
                             <p className="flex items-center gap-1">
                                 <span className="bg-gray-600 text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[1px] font-bold">!</span>
                                 해당 카테고리의 상품리스트 페이지 접근시 성인인증확인 인트로 페이지가 출력되어 보여집니다.
                             </p>
                             <p className="pl-4">성인인증 기능은 별도의 인증 서비스 신청완료 후 이용 가능합니다.</p>
                             <div className="pl-4 flex gap-2">
                                 <a href="#" className="underline text-blue-500">휴대폰인증 설정 바로가기</a>
                                 <a href="#" className="underline text-blue-500">아이핀인증 설정 바로가기</a>
                             </div>
                             <p className="flex items-center gap-1 text-red-500 pl-0 pt-1">
                                 <span className="bg-red-500 text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[1px] font-bold">!</span>
                                 구 실명인증 서비스는 성인인증 수단으로 연결되지 않습니다.
                             </p>
                          </div>
                      </div>
                  </div>

                  {/* Row: Access Permission */}
                   <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          접근 권한
                      </div>
                      <div className="flex-1 p-3">
                           <RadioGroup defaultValue="all" className="flex flex-col gap-2">
                              <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="all" id="access-all" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="access-all" className="text-gray-700 font-normal cursor-pointer">전체(회원+비회원)</Label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="member" id="access-member" className="rounded-full border-gray-300 text-gray-600" />
                                    <Label htmlFor="access-member" className="text-gray-700 font-normal cursor-pointer">회원전용(비회원제외)</Label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="specific" id="access-specific" className="rounded-full border-gray-300 text-gray-600" />
                                    <Label htmlFor="access-specific" className="text-gray-700 font-normal cursor-pointer">특정 회원등급</Label>
                                    <Button variant="secondary" disabled className="h-6 text-[11px] rounded-none px-2 py-0 bg-[#A4A4A4] text-white">회원등급 선택</Button>
                                    <span className="text-gray-500 flex items-center gap-1 text-[11px]">( <Checkbox className="w-3 h-3 border-gray-300" /> 접근불가 고객 브랜드 노출함 )</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                      <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" id="access-sub" />
                                      <Label htmlFor="access-sub" className="text-gray-700 font-normal cursor-pointer">하위 브랜드 동일 적용</Label>
                                  </div>
                              </div>
                          </RadioGroup>
                      </div>
                  </div>

                   {/* Row: Product Display Type */}
                   <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          상품진열 타입
                      </div>
                      <div className="flex-1 p-3">
                           <div className="flex items-center gap-2 mb-2">
                                <RadioGroup defaultValue="auto" className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="auto" id="disp-auto" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                        <Label htmlFor="disp-auto" className="text-gray-700 font-normal cursor-pointer">자동진열</Label>
                                        <Select defaultValue="recent">
                                            <SelectTrigger className="w-40 h-6 text-xs border-gray-300 rounded-sm ml-2">
                                                <SelectValue placeholder="최근 등록 상품 위로" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="recent">최근 등록 상품 위로</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="manual" id="disp-manual" className="rounded-full border-gray-300 text-gray-600" />
                                        <Label htmlFor="disp-manual" className="text-gray-700 font-normal cursor-pointer">수동진열</Label>
                                    </div>
                                </RadioGroup>
                           </div>
                           <p className="text-blue-500 text-[11px]">수동진열 : [브랜드 페이지 상품진열]에서 진열순서를 별도로 설정할 수 있습니다.</p>
                      </div>
                  </div>

                  {/* Row: Theme Selection */}
                   <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          PC쇼핑몰<br/>테마선택
                      </div>
                      <div className="flex-1 p-3 flex items-center gap-2 border-r border-gray-200">
                           <Select defaultValue="brand-theme">
                                <SelectTrigger className="w-32 h-7 text-xs border-gray-300 rounded-sm">
                                    <SelectValue placeholder="브랜드테마" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="brand-theme">브랜드테마</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="secondary" size="sm" className="h-7 text-xs bg-gray-600 text-white hover:bg-gray-700 rounded-sm px-3">테마 등록</Button>
                      </div>
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          모바일쇼핑몰<br/>테마선택
                      </div>
                      <div className="flex-1 p-3 flex items-center gap-2">
                           <Select defaultValue="brand-theme">
                                <SelectTrigger className="w-32 h-7 text-xs border-gray-300 rounded-sm">
                                    <SelectValue placeholder="브랜드테마" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="brand-theme">브랜드테마</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="secondary" size="sm" className="h-7 text-xs bg-gray-600 text-white hover:bg-gray-700 rounded-sm px-3">테마 등록</Button>
                      </div>
                  </div>
              </div>
          </div>

           {/* Section 2: Selected PC Theme Info */}
          <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-gray-300">
                  <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-gray-800">선택된 PC쇼핑몰 테마 정보</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <button className="flex items-center text-xs text-blue-600 font-bold">닫힘 <ChevronUp className="w-3 h-3 ml-1"/></button>
              </div>
              <div className="border-t border-gray-400 text-xs">
                   {/* Table Rows for Theme Info - PC */}
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">테마명</div>
                       <div className="p-3 flex items-center gap-2">
                           <span>브랜드테마</span>
                           <Button variant="outline" size="sm" className="h-5 text-[10px] px-2 border-gray-300 bg-white">수정</Button>
                       </div>
                   </div>
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">이미지 설정</div>
                       <div className="p-3">추가리스트2 280pixel</div>
                   </div>
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">상품 노출 개수</div>
                       <div className="p-3">가로 : 4 X 세로 : 5</div>
                   </div>
                   <div className="grid grid-cols-[176px_1fr_176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">품절상품 노출</div>
                       <div className="p-3 border-r border-gray-200">예</div>
                        <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">품절상품 진열</div>
                       <div className="p-3">정렬 순서대로 보여주기</div>
                   </div>
                    <div className="grid grid-cols-[176px_1fr_176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">품절 아이콘 노출</div>
                       <div className="p-3 border-r border-gray-200">예</div>
                        <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">아이콘 노출</div>
                       <div className="p-3">예</div>
                   </div>
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">노출항목 설정</div>
                       <div className="p-3">이미지,상품명,이미지,상품명,판매가</div>
                   </div>
                    <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">디스플레이 유형</div>
                       <div className="p-3">갤러리형</div>
                   </div>
              </div>
          </div>

           {/* Section 3: Selected Mobile Theme Info */}
          <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-gray-300">
                  <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-gray-800">선택된 모바일쇼핑몰 테마 정보</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <button className="flex items-center text-xs text-blue-600 font-bold">닫힘 <ChevronUp className="w-3 h-3 ml-1"/></button>
              </div>
              <div className="border-t border-gray-400 text-xs">
                   {/* Table Rows for Theme Info - Mobile */}
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">테마명</div>
                       <div className="p-3 flex items-center gap-2">
                           <span>브랜드테마</span>
                           <Button variant="outline" size="sm" className="h-5 text-[10px] px-2 border-gray-300 bg-white">수정</Button>
                       </div>
                   </div>
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">이미지 설정</div>
                       <div className="p-3">리스트이미지(기본) 180pixel</div>
                   </div>
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">상품 노출 개수</div>
                       <div className="p-3">가로 : 2 X 세로 : 5</div>
                   </div>
                   <div className="grid grid-cols-[176px_1fr_176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">품절상품 노출</div>
                       <div className="p-3 border-r border-gray-200">예</div>
                        <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">품절상품 진열</div>
                       <div className="p-3">정렬 순서대로 보여주기</div>
                   </div>
                    <div className="grid grid-cols-[176px_1fr_176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">품절 아이콘 노출</div>
                       <div className="p-3 border-r border-gray-200">예</div>
                        <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">아이콘 노출</div>
                       <div className="p-3">예</div>
                   </div>
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">노출항목 설정</div>
                       <div className="p-3">이미지,상품명,이미지,상품명,판매가</div>
                   </div>
                    <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">디스플레이 유형</div>
                       <div className="p-3">리스트형</div>
                   </div>
              </div>
          </div>

          {/* Section 4: Recommended Products Info */}
          <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-black">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">추천상품 정보</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <button className="flex items-center text-xs text-blue-600 font-bold">닫힘 <ChevronUp className="w-3 h-3 ml-1"/></button>
              </div>

               <div className="border-t border-gray-200 text-xs">
                  {/* Row: Scope */}
                  <div className="flex border-b border-gray-200">
                      <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          적용범위
                      </div>
                      <div className="flex-1 p-3">
                           <div className="flex items-center gap-2">
                                  <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" id="rec-scope" />
                                  <Label htmlFor="rec-scope" className="text-gray-700 font-normal cursor-pointer">하위 브랜드 동일 적용</Label>
                            </div>
                      </div>
                  </div>
                   {/* Row: PC Display */}
                  <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          PC쇼핑몰<br/>노출상태
                      </div>
                      <div className="flex-1 p-3">
                           <RadioGroup defaultValue="visible" className="flex gap-6">
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="visible" id="rec-pc-visible" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                  <Label htmlFor="rec-pc-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="hidden" id="rec-pc-hidden" className="rounded-full border-gray-300 text-gray-600" />
                                  <Label htmlFor="rec-pc-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                              </div>
                          </RadioGroup>
                      </div>
                  </div>
                   {/* Row: Mobile Display */}
                   <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          모바일쇼핑몰<br/>노출상태
                      </div>
                      <div className="flex-1 p-3">
                           <RadioGroup defaultValue="visible" className="flex gap-6">
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="visible" id="rec-mo-visible" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                  <Label htmlFor="rec-mo-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="hidden" id="rec-mo-hidden" className="rounded-full border-gray-300 text-gray-600" />
                                  <Label htmlFor="rec-mo-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                              </div>
                          </RadioGroup>
                      </div>
                  </div>
                   {/* Row: Display Type */}
                   <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          상품진열 타입
                      </div>
                      <div className="flex-1 p-3">
                           <div className="flex items-center gap-2">
                                <RadioGroup defaultValue="auto" className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="auto" id="rec-disp-auto" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                        <Label htmlFor="rec-disp-auto" className="text-gray-700 font-normal cursor-pointer">자동진열</Label>
                                         <Select defaultValue="recent">
                                            <SelectTrigger className="w-40 h-6 text-xs border-gray-300 rounded-sm ml-2">
                                                <SelectValue placeholder="최근 등록 상품 위로" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="recent">최근 등록 상품 위로</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="manual" id="rec-disp-manual" className="rounded-full border-gray-300 text-gray-600" />
                                        <Label htmlFor="rec-disp-manual" className="text-gray-700 font-normal cursor-pointer">수동진열</Label>
                                    </div>
                                </RadioGroup>
                           </div>
                      </div>
                  </div>
                   {/* Row: Theme Selection */}
                   <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          PC쇼핑몰<br/>테마선택
                      </div>
                      <div className="flex-1 p-3 flex items-center gap-2 border-r border-gray-200">
                           <Select defaultValue="rec-theme">
                                <SelectTrigger className="w-32 h-7 text-xs border-gray-300 rounded-sm">
                                    <SelectValue placeholder="추천상품테마" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rec-theme">추천상품테마</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="secondary" size="sm" className="h-7 text-xs bg-gray-600 text-white hover:bg-gray-700 rounded-sm px-3">테마 등록</Button>
                      </div>
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          모바일쇼핑몰<br/>테마선택
                      </div>
                      <div className="flex-1 p-3 flex items-center gap-2">
                           <Select defaultValue="rec-theme">
                                <SelectTrigger className="w-32 h-7 text-xs border-gray-300 rounded-sm">
                                    <SelectValue placeholder="추천상품테마" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rec-theme">추천상품테마</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="secondary" size="sm" className="h-7 text-xs bg-gray-600 text-white hover:bg-gray-700 rounded-sm px-3">테마 등록</Button>
                      </div>
                  </div>
               </div>
          </div>
          
           {/* Section 5: Selected PC Rec Theme Info */}
           <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-gray-300">
                  <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-gray-800">선택된 PC쇼핑몰 추천상품 테마 정보</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <button className="flex items-center text-xs text-blue-600 font-bold">닫힘 <ChevronUp className="w-3 h-3 ml-1"/></button>
              </div>
              {/* Reuse structure from Section 2 but with Rec Theme Data */}
              <div className="border-t border-gray-400 text-xs">
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">테마명</div>
                       <div className="p-3 flex items-center gap-2">
                           <span>추천상품테마</span>
                           <Button variant="outline" size="sm" className="h-5 text-[10px] px-2 border-gray-300 bg-white">수정</Button>
                       </div>
                   </div>
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">이미지 설정</div>
                       <div className="p-3">추가리스트2 280pixel</div>
                   </div>
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">상품 노출 개수</div>
                       <div className="p-3">가로 : 4 X 세로 : 5</div>
                   </div>
                    {/* ... */}
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">디스플레이 유형</div>
                       <div className="p-3">갤러리형</div>
                   </div>
              </div>
           </div>

           {/* Section 6: Selected Mobile Rec Theme Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-gray-300">
                  <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-gray-800">선택된 모바일쇼핑몰 추천상품 테마 정보</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <button className="flex items-center text-xs text-blue-600 font-bold">닫힘 <ChevronUp className="w-3 h-3 ml-1"/></button>
              </div>
              <div className="border-t border-gray-400 text-xs">
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">테마명</div>
                       <div className="p-3 flex items-center gap-2">
                           <span>추천상품테마</span>
                           <Button variant="outline" size="sm" className="h-5 text-[10px] px-2 border-gray-300 bg-white">수정</Button>
                       </div>
                   </div>
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">이미지 설정</div>
                       <div className="p-3">리스트이미지(기본) 180pixel</div>
                   </div>
                   <div className="grid grid-cols-[176px_1fr] border-b border-gray-200">
                       <div className="bg-gray-50 p-3 pl-4 font-bold text-gray-700 border-r border-gray-200">디스플레이 유형</div>
                       <div className="p-3">갤러리형</div>
                   </div>
              </div>
           </div>

           {/* Section 7: Selected Products */}
           <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-black">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">선택된 추천상품</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <button className="flex items-center text-xs text-blue-600 font-bold">닫힘 <ChevronUp className="w-3 h-3 ml-1"/></button>
              </div>

               <div className="border-t border-gray-400 text-xs">
                    {/* Header */}
                   <div className="bg-[#BFBFBF] text-white flex text-center font-bold">
                       <div className="w-10 py-3 border-r border-gray-300 flex items-center justify-center"><Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" /></div>
                       <div className="w-12 py-3 border-r border-gray-300">번호</div>
                       <div className="w-16 py-3 border-r border-gray-300">이미지</div>
                       <div className="flex-1 py-3 border-r border-gray-300">상품명</div>
                       <div className="w-24 py-3 border-r border-gray-300">판매가</div>
                       <div className="w-24 py-3 border-r border-gray-300">공급사</div>
                       <div className="w-20 py-3 border-r border-gray-300">재고</div>
                       <div className="w-16 py-3 border-r border-gray-300">품절상태</div>
                       <div className="w-20 py-3 border-r border-gray-300 leading-tight">PC쇼핑몰<br/>노출상태</div>
                       <div className="w-24 py-3 leading-tight">모바일쇼핑몰<br/>노출상태</div>
                   </div>
                   {/* Empty State */}
                   <div className="h-24 flex items-center justify-center border-b border-gray-200 text-gray-500">
                       등록된 상품이 없습니다.
                   </div>
               </div>
               
               <div className="flex justify-between mt-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs px-3 border-gray-300 bg-white hover:bg-gray-50 text-gray-600">선택 삭제</Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs px-3 border-gray-300 bg-white hover:bg-gray-50 text-gray-600">상품 선택</Button>
               </div>
           </div>

            {/* Section 8: Decoration */}
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-black">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">브랜드 네비게이션 상단 영역 꾸미기</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <button className="flex items-center text-xs text-blue-600 font-bold">닫힘 <ChevronUp className="w-3 h-3 ml-1"/></button>
              </div>

               <div className="flex items-end justify-between border-b border-gray-300 mb-2">
                  <div className="flex">
                      <div className="px-4 py-2 bg-gray-500 text-white text-xs font-bold border-t border-l border-r border-gray-500 cursor-pointer">PC쇼핑몰 상세 설명</div>
                      <div className="px-4 py-2 bg-white text-gray-500 text-xs border-t border-l border-r border-gray-300 cursor-pointer border-b border-b-white transform translate-y-[1px]">모바일쇼핑몰 상세 설명</div>
                  </div>
                   <div className="flex items-center gap-1.5 cursor-pointer pb-2">
                      <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500" defaultChecked />
                      <span className="text-xs text-gray-700">PC/ 모바일 상세설명 동일사용</span>
                   </div>
               </div>

                {/* Fake Editor */}
                <div className="border border-gray-300">
                    <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2 items-center text-xs overflow-x-auto">
                        <select className="border border-gray-300 h-6 px-1 rounded-sm"><option>글꼴</option></select>
                        <select className="border border-gray-300 h-6 px-1 rounded-sm"><option>9pt</option></select>
                        <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                        <span className="font-bold border border-gray-300 px-1.5 h-6 flex items-center bg-white">가</span>
                        <span className="italic border border-gray-300 px-1.5 h-6 flex items-center bg-white">가</span>
                        <span className="underline border border-gray-300 px-1.5 h-6 flex items-center bg-white">가</span>
                         <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                        <File className="w-4 h-4 text-gray-600" />
                        <div className="ml-auto flex items-center gap-1 border border-gray-300 px-2 h-6 bg-white cursor-pointer">
                            <span className="text-[10px]">사진</span>
                        </div>
                    </div>
                    <div className="h-64 bg-white relative">
                         <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-100 border-t border-gray-200 flex items-center justify-center text-[10px] text-gray-500">
                            아래 영역을 드래그하여 입력창 크기를 조절할 수 있습니다. <span className="ml-auto mr-2 cursor-pointer">X</span>
                         </div>
                    </div>
                     <div className="flex items-center justify-end bg-gray-50 border-t border-gray-300 px-2 py-1 gap-1 text-[10px] text-gray-600">
                        <span>Editor</span>
                        <span className="border-l border-gray-300 pl-1">HTML</span>
                        <span className="border-l border-gray-300 pl-1">TEXT</span>
                    </div>
                </div>
            </div>

            {/* Section 9: Brand Recommended Products Top Decoration */}
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-black">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">브랜드 추천 상품 상단 영역 꾸미기</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <button className="flex items-center text-xs text-blue-600 font-bold">닫힘 <ChevronUp className="w-3 h-3 ml-1"/></button>
              </div>

               <div className="flex items-end justify-between border-b border-gray-300 mb-2">
                  <div className="flex">
                      <div className="px-4 py-2 bg-gray-500 text-white text-xs font-bold border-t border-l border-r border-gray-500 cursor-pointer">PC쇼핑몰 상세 설명</div>
                      <div className="px-4 py-2 bg-white text-gray-500 text-xs border-t border-l border-r border-gray-300 cursor-pointer border-b border-b-white transform translate-y-[1px]">모바일쇼핑몰 상세 설명</div>
                  </div>
                   <div className="flex items-center gap-1.5 cursor-pointer pb-2">
                      <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500" defaultChecked />
                      <span className="text-xs text-gray-700">PC/ 모바일 상세설명 동일사용</span>
                   </div>
               </div>

                {/* Fake Editor */}
                <div className="border border-gray-300">
                    <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2 items-center text-xs overflow-x-auto">
                        <select className="border border-gray-300 h-6 px-1 rounded-sm"><option>글꼴</option></select>
                        <select className="border border-gray-300 h-6 px-1 rounded-sm"><option>9pt</option></select>
                        <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                        <span className="font-bold border border-gray-300 px-1.5 h-6 flex items-center bg-white">가</span>
                        <span className="italic border border-gray-300 px-1.5 h-6 flex items-center bg-white">가</span>
                        <span className="underline border border-gray-300 px-1.5 h-6 flex items-center bg-white">가</span>
                         <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                        <File className="w-4 h-4 text-gray-600" />
                        <div className="ml-auto flex items-center gap-1 border border-gray-300 px-2 h-6 bg-white cursor-pointer">
                            <span className="text-[10px]">사진</span>
                        </div>
                    </div>
                    <div className="h-64 bg-white relative">
                         <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-100 border-t border-gray-200 flex items-center justify-center text-[10px] text-gray-500">
                            아래 영역을 드래그하여 입력창 크기를 조절할 수 있습니다. <span className="ml-auto mr-2 cursor-pointer">X</span>
                         </div>
                    </div>
                     <div className="flex items-center justify-end bg-gray-50 border-t border-gray-300 px-2 py-1 gap-1 text-[10px] text-gray-600">
                        <span>Editor</span>
                        <span className="border-l border-gray-300 pl-1">HTML</span>
                        <span className="border-l border-gray-300 pl-1">TEXT</span>
                    </div>
                </div>
            </div>

             {/* Section 10: Brand List Top Decoration */}
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-black">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">브랜드 리스트 상단 영역 꾸미기</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <button className="flex items-center text-xs text-blue-600 font-bold">닫힘 <ChevronUp className="w-3 h-3 ml-1"/></button>
              </div>

               <div className="flex items-end justify-between border-b border-gray-300 mb-2">
                  <div className="flex">
                      <div className="px-4 py-2 bg-gray-500 text-white text-xs font-bold border-t border-l border-r border-gray-500 cursor-pointer">PC쇼핑몰 상세 설명</div>
                      <div className="px-4 py-2 bg-white text-gray-500 text-xs border-t border-l border-r border-gray-300 cursor-pointer border-b border-b-white transform translate-y-[1px]">모바일쇼핑몰 상세 설명</div>
                  </div>
                   <div className="flex items-center gap-1.5 cursor-pointer pb-2">
                      <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500" defaultChecked />
                      <span className="text-xs text-gray-700">PC/ 모바일 상세설명 동일사용</span>
                   </div>
               </div>

                {/* Fake Editor */}
                <div className="border border-gray-300">
                    <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2 items-center text-xs overflow-x-auto">
                        <select className="border border-gray-300 h-6 px-1 rounded-sm"><option>글꼴</option></select>
                        <select className="border border-gray-300 h-6 px-1 rounded-sm"><option>9pt</option></select>
                        <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                        <span className="font-bold border border-gray-300 px-1.5 h-6 flex items-center bg-white">가</span>
                        <span className="italic border border-gray-300 px-1.5 h-6 flex items-center bg-white">가</span>
                        <span className="underline border border-gray-300 px-1.5 h-6 flex items-center bg-white">가</span>
                         <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                        <File className="w-4 h-4 text-gray-600" />
                        <div className="ml-auto flex items-center gap-1 border border-gray-300 px-2 h-6 bg-white cursor-pointer">
                            <span className="text-[10px]">사진</span>
                        </div>
                    </div>
                    <div className="h-64 bg-white relative">
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-100 border-t border-gray-200 flex items-center justify-center text-[10px] text-gray-500">
                            아래 영역을 드래그하여 입력창 크기를 조절할 수 있습니다. <span className="ml-auto mr-2 cursor-pointer">X</span>
                         </div>
                    </div>
                     <div className="flex items-center justify-end bg-gray-50 border-t border-gray-300 px-2 py-1 gap-1 text-[10px] text-gray-600">
                        <span>Editor</span>
                        <span className="border-l border-gray-300 pl-1">HTML</span>
                        <span className="border-l border-gray-300 pl-1">TEXT</span>
                    </div>
                </div>
            </div>

            {/* Section 11: SEO Settings */}
             <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-gray-300">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">브랜드 개별 SEO 태그 설정</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" className="h-6 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#909090] rounded-none px-2">치환코드 보기</Button>
                    <button className="flex items-center text-xs text-blue-600 font-bold">닫힘 <ChevronUp className="w-3 h-3 ml-1"/></button>
                  </div>
              </div>
              
              <div className="border-t border-gray-400 text-xs bg-white">
                  <div className="flex border-b border-gray-200">
                      <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          개별 설정 사용여부
                      </div>
                      <div className="flex-1 p-3">
                           <RadioGroup defaultValue="unused" className="flex gap-6 items-center">
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="used" id="seo-used" className="rounded-full border-gray-300 text-gray-600" />
                                  <Label htmlFor="seo-used" className="text-gray-700 font-normal cursor-pointer">사용함</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="unused" id="seo-unused" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                  <Label htmlFor="seo-unused" className="text-gray-700 font-normal cursor-pointer">사용안함</Label>
                              </div>
                          </RadioGroup>
                          <div className="text-[11px] text-[#888888] mt-2 flex items-start gap-1">
                                <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold flex-shrink-0 mt-0.5">!</span>
                                <div>
                                    <p>'사용함' 선택 시 기본설정 &gt; 검색엔진 최적화(SEO) 설정보다 개별 설정이 우선적으로 적용됩니다.</p>
                                    <p>설정 결과는 검색 엔진에 따라 평균 2주 ~ 3주 후에 반영될 수 있습니다.</p>
                                </div>
                          </div>
                      </div>
                  </div>
                   <div className="flex border-b border-gray-200">
                      <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          타이틀 (Title)
                      </div>
                      <div className="flex-1 p-3">
                          <Input className="w-full h-8 border-gray-300 rounded-sm" />
                      </div>
                  </div>
                   <div className="flex border-b border-gray-200">
                      <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          메타태그 작성자 (Author)
                      </div>
                      <div className="flex-1 p-3">
                          <Input className="w-full h-8 border-gray-300 rounded-sm" />
                      </div>
                  </div>
                   <div className="flex border-b border-gray-200">
                      <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          메타태그 설명 (Description)
                      </div>
                      <div className="flex-1 p-3">
                          <Input className="w-full h-8 border-gray-300 rounded-sm" />
                      </div>
                  </div>
                   <div className="flex border-b border-gray-200">
                      <div className="w-48 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          메타태그 키워드 (Keywords)
                      </div>
                      <div className="flex-1 p-3">
                          <Input className="w-full h-8 border-gray-300 rounded-sm" />
                      </div>
                  </div>
              </div>
            </div>

            {/* Section 12: Guide/Info */}
            <div className="mt-12 text-gray-600 text-xs space-y-8 border-t border-gray-300 pt-8">
                {/* Guide 1 */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1 font-bold text-blue-500 mb-1">
                        <File className="w-3 h-3" /> 안내
                    </div>
                    <div className="font-bold text-gray-800">[브랜드 정보] 그룹(구분) 브랜드는 무엇인가요?</div>
                    <ul className="list-disc pl-4 space-y-1 text-gray-600">
                        <li>브랜드 페이지가 없고, 상품연결이 되지 않는 브랜드입니다.</li>
                        <li>상품 연결이 필요 없는 대표성이 있는 브랜드를 만들고 싶을 때 사용합니다.</li>
                        <li>디자인적으로 브랜드 사이에 구분선을 삽입하고 싶을 때 사용합니다.</li>
                        <li>그룹(구분) 브랜드는 하위 브랜드가 존재할 수 없으며, 1차 브랜드만 생성할 수 있습니다.</li>
                    </ul>
                    <div className="flex gap-4 mt-4">
                        <div className="border border-red-300 p-1 bg-white inline-block">
                           <div className="text-[10px] text-gray-400 mb-1">[관리자 화면]</div>
                           {/* Placeholder for Image 1 - Admin View */}
                           <div className="w-[150px] h-[100px] bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-300 text-[10px]">
                               Admin Tree View
                           </div>
                        </div>
                        <div className="border border-red-300 p-1 bg-white inline-block">
                           <div className="text-[10px] text-gray-400 mb-1">[쇼핑몰 화면]</div>
                           {/* Placeholder for Image 2 - Shop View */}
                           <div className="w-[100px] h-[150px] bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-300 text-[10px]">
                               Shop Menu View
                           </div>
                        </div>
                    </div>
                </div>

                {/* Guide 2 */}
                 <div className="space-y-2">
                    <div className="font-bold text-gray-800">[브랜드 정보] 브랜드 순서를 변경할 수 있나요?</div>
                    <ul className="list-disc pl-4 space-y-1 text-gray-600">
                        <li>브랜드를 선택(클릭)하고 마우스 드래그하여 원하는 위치에 끌어다 놓으면 순서 변경이 가능합니다.</li>
                    </ul>
                </div>

                {/* Guide 3 */}
                 <div className="space-y-2">
                    <div className="font-bold text-gray-800">[브랜드 정보] 브랜드를 이동할 수 있나요?</div>
                    <ul className="list-disc pl-4 space-y-1 text-gray-600">
                        <li>브랜드를 선택(클릭)하고 마우스 드래그하여 원하는 위치에 끌어다 놓으면 이동이 가능합니다.</li>
                        <li>브랜드 이동 시 3차(세분류) 브랜드 이상이 될 경우에는 이동이 되지 않습니다.</li>
                        <li>선택된 브랜드의 바로 아래 하위 브랜드로 이동은 불가능 합니다. (상위 브랜드로는 제한없이 이동 가능합니다.)</li>
                    </ul>
                     <div className="flex gap-8 mt-4">
                        <div className="">
                           <div className="text-xs font-bold text-red-500 mb-2">· 이동 가능한 경우</div>
                           <div className="border border-red-400 p-1 bg-white inline-block">
                                {/* Placeholder for Image 3 - Move Yes */}
                               <div className="w-[200px] h-[120px] bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-300 text-[10px]">
                                   Move Possible Example
                               </div>
                           </div>
                        </div>
                         <div className="">
                           <div className="text-xs font-bold text-red-500 mb-2">· 이동 불가능한 경우</div>
                           <div className="border border-red-400 p-1 bg-white inline-block">
                                {/* Placeholder for Image 4 - Move No */}
                               <div className="w-[200px] h-[120px] bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-300 text-[10px]">
                                   Move Impossible Example
                               </div>
                           </div>
                           <div className="text-center text-[10px] text-gray-500 mt-1">[관리자 화면]</div>
                        </div>
                    </div>
                </div>

                {/* Guide 4 */}
                 <div className="space-y-2">
                    <div className="font-bold text-gray-800">[브랜드 정보] 브랜드 폴더 이미지가 달라요.</div>
                    <ul className="list-disc pl-4 space-y-1 text-gray-600">
                        <li>브랜드 폴더 이미지는 브랜드의 "타입, 노출상태, 접근권한"에 따라 다르게 노출됩니다.</li>
                    </ul>
                    <div className="border border-red-300 p-2 inline-block bg-white mt-2">
                         {/* Placeholder for Image 5 - Folder Icons */}
                         <div className="w-[200px] h-[30px] bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-300 text-[10px] mb-1">
                               Icons
                         </div>
                         <div className="text-[10px] text-gray-400 text-right">[관리자 화면]</div>
                    </div>
                    <div className="space-y-1 mt-2 text-[11px] text-gray-600">
                        <p>① 일반 브랜드 : 접근 권한에 제한이 없고, PC / 모바일쇼핑몰 모두 노출된 상태의 일반 브랜드로 등록된 브랜드 입니다.</p>
                        <p className="pl-4 text-gray-500">- 브랜드 타입 : 일반 브랜드, PC / 모바일쇼핑몰 노출상태 : 노출함, 접근 권한 : 전체(회원+비회원)</p>
                         <p>② 그룹(구분) 브랜드 : 접근 권한에 제한이 없고, PC / 모바일쇼핑몰 모두 노출된 상태의 그룹(구분) 브랜드로 등록된 브랜드 입니다.</p>
                        <p className="pl-4 text-gray-500">- 브랜드 타입 : 그룹(구분) 브랜드, PC / 모바일쇼핑몰 노출상태 : 노출함, 접근 권한 : 전체(회원+비회원)</p>
                         <p>③ 노출안함 브랜드 : 접근 권한에 제한이 없고, PC쇼핑몰 또는 모바일쇼핑몰 노출안함 상태의 일반 브랜드로 등록된 브랜드 입니다.</p>
                        <p className="pl-4 text-gray-500">- 브랜드 타입 : 일반 브랜드, PC / 모바일쇼핑몰 노출상태 : 노출안함, 접근 권한 : 전체(회원+비회원)</p>
                         <p>④ 접근 제한 브랜드 : 접근 권한에 제한이 있고, PC / 모바일쇼핑몰 모두 노출된 상태의 일반 브랜드로 등록된 브랜드 입니다.</p>
                        <p className="pl-4 text-gray-500">- 브랜드 타입 : 일반 브랜드, PC / 모바일쇼핑몰 노출상태 : 노출함, 접근 권한 : 회원전용(비회원제외) 또는 특정 회원등급</p>
                    </div>
                </div>

                 {/* Guide 5 */}
                 <div className="space-y-2">
                    <div className="font-bold text-gray-800">[브랜드 정보] 등록 상품수는 무엇인가요?</div>
                    <ul className="list-disc pl-4 space-y-1 text-gray-600">
                        <li>"등록 상품수"란 현재 선택된 브랜드에 연결된 상품의 총 수량입니다.</li>
                        <li>브랜드 트리 내 브랜드 선택(클릭) 시 "브랜드 정보" 영역에 "등록 상품수" 항목으로 노출됩니다.</li>
                        <li>선택된 브랜드에 하위 브랜드가 있는 경우 하위 브랜드에 연결된 상품을 포함하여 노출됩니다.</li>
                    </ul>
                     <div className="border border-red-400 inline-block mt-2">
                        {/* Placeholder for Image 6 - Product Count */}
                       <div className="w-[500px] h-[200px] bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-300 text-[10px]">
                           Product Count Admin View
                       </div>
                    </div>
                    <div className="text-right text-[10px] text-gray-500 w-[500px]">[관리자 화면]</div>
                    
                    <div className="space-y-1 mt-2 text-[11px] text-gray-600">
                        <p>① 브랜드 트리 내에서 등록된 브랜드를 선택(클릭)하면 우측 "브랜드 정보" 영역에 "현재 브랜드"와 "등록 상품수" 항목 및</p>
                        <p className="pl-3">브랜드명 항목 내 "브랜드 코드"가 추가 노출됩니다.</p>
                        <p className="pl-3">- 현재 브랜드 : 운영자가 선택한 브랜드의 "브랜드명"이 노출되며 "화면바로보기 / 주소복사 / 삭제" 버튼이 제공됩니다.</p>
                        <p className="pl-3">- [화면바로보기] 버튼 클릭 시 해당 브랜드의 쇼핑몰 브랜드페이지가 새탭으로 노출됩니다.</p>
                         <p className="pl-3">- [주소복사] 버튼 클릭 시 해당 브랜드의 쇼핑몰 브랜드페이지 주소가 클립보드에 복사됩니다.</p>
                        <p className="pl-3">- [삭제] 버튼 클릭 시 해당 브랜드가 삭제됩니다.</p>
                        <p>② 운영자가 선택한 브랜드의 "코드"가 노출됩니다.</p>
                        <p className="pl-3">- 브랜드 코드는 "상품 &gt; 상품 엑셀 관리 &gt; 상품 업로드"에서 엑셀파일을 통해 상품 등록 시 이용됩니다.</p>
                    </div>
                </div>

            </div>

                {/* Footer */}
                <div className="text-center text-[11px] text-[#888888] py-8 border-t border-[#E6E6E6] mt-10">
                   © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-[#DA5A4A]">5.1.23.1206.5ccf2dd6</span>)
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
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100">
                         <ChevronUp size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none transform rotate-180">
                         <ChevronUp size={16} />
                    </Button>
                </div>
            </div>
    </div>
  );
}
