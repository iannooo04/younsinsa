"use client";

import React, { useState } from "react";
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
  Search, // Using Search icon
  X,
} from "lucide-react";

// Reusable Section Component
const SettingsSection = ({
  title,
  isOpen = true,
  children,
}: {
  title: string;
  isOpen?: boolean;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between pb-2 border-b border-black">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center text-xs text-blue-500 font-bold"
        >
          {open ? "닫힘" : "열림"} <ChevronUp className={`w-3 h-3 ml-1 transform ${open ? "" : "rotate-180"}`} />
        </button>
      </div>
      {open && <div className="border-t border-gray-200">{children}</div>}
    </div>
  );
};

export default function SearchSettingsPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">검색창 관련 설정</h1>
        <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm">
          저장
        </Button>
      </div>

      <div className="space-y-10">
        {/* 1. Search Bar Settings */}
        <SettingsSection title="검색창 설정">
          <div className="flex border-b border-gray-200">
            <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
              통합검색 조건 선택
            </div>
            <div className="flex-1 p-4">
              <div className="flex flex-wrap gap-6 mb-2">
                 {[
                   { label: "상품명", checked: true },
                   { label: "브랜드", checked: false },
                   { label: "상품코드", checked: false },
                   { label: "자체상품코드", checked: false },
                   { label: "제조사", checked: false },
                   { label: "원산지", checked: false },
                   { label: "검색키워드", checked: false },
                 ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                        <Checkbox 
                            id={`search-cond-${idx}`} 
                            className={`w-3.5 h-3.5 border-gray-300 rounded-[2px] ${item.checked ? 'data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500' : ''}`}
                            defaultChecked={item.checked}
                         />
                        <Label htmlFor={`search-cond-${idx}`} className="text-gray-600 font-normal cursor-pointer">{item.label}</Label>
                    </div>
                 ))}
              </div>
               <div className="text-[11px] text-[#888888] flex items-center gap-1">
                  <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                  검색조건이 많을 수록 쇼핑몰 내 검색속도가 느려질 수 있습니다.
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* 2. Product Search Keyword Settings */}
        <SettingsSection title="상품 검색 키워드 설정">
           <div className="flex border-b border-gray-200">
            <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
              사용상태
            </div>
            <div className="flex-1 p-4">
               <RadioGroup defaultValue="unused" className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="used" id="keyword-used" className="rounded-full border-gray-300 text-gray-600" />
                        <Label htmlFor="keyword-used" className="text-gray-700 font-normal cursor-pointer">사용함</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="unused" id="keyword-unused" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                        <Label htmlFor="keyword-unused" className="text-gray-700 font-normal cursor-pointer">사용안함</Label>
                    </div>
                </RadioGroup>
            </div>
          </div>
          <div className="p-4">
              <div className="text-[11px] text-[#888888] space-y-1">
                   <p className="text-gray-400 mb-2">쇼핑몰 검색어 입력란에 검색 키워드를 노출하여 고객들에게 여러 가지 이벤트 프로모션을 노출 할 수 있습니다.</p>
                   <div className="flex items-center gap-1">
                      <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                   </div>
              </div>
          </div>
        </SettingsSection>

        {/* 3. Recent Search Terms Settings */}
        <SettingsSection title="최근 검색어 설정">
           <div className="flex min-h-[160px]">
             <div className="flex-1 flex flex-col">
                <div className="flex border-b border-gray-200 flex-1">
                    <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    PC쇼핑몰<br/>노출개수
                    </div>
                    <div className="flex-1 p-4 flex items-center">
                        <Select defaultValue="10">
                            <SelectTrigger className="w-32 h-8 text-xs border-gray-300">
                                <SelectValue placeholder="10" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="flex border-b border-gray-200 flex-1">
                    <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    모바일쇼핑몰<br/>노출개수
                    </div>
                    <div className="flex-1 p-4 flex items-center">
                         <Select defaultValue="10">
                            <SelectTrigger className="w-32 h-8 text-xs border-gray-300">
                                <SelectValue placeholder="10" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
             </div>

             {/* Visual Example Area */}
             <div className="w-[500px] border-b border-gray-200 p-6 flex flex-col">
                <div className="text-gray-400 text-[11px] mb-2">[쇼핑몰 예시화면]</div>
                <div className="border border-gray-300 p-4 rounded-sm">
                    <div className="relative mb-2">
                        <div className="w-full h-10 border border-gray-300 rounded-full px-4 flex items-center justify-between">
                            <span className="w-0.5 h-4 bg-gray-800 animate-pulse"></span>
                             <Search className="w-5 h-5 text-red-500" />
                        </div>
                        
                        {/* Dropdown simulation */}
                        <div className="absolute top-11 width-full left-0 right-0 border border-gray-400 bg-white shadow-sm z-10 text-xs">
                             <div className="p-3 border-b border-gray-200 text-red-500 font-bold">최근검색어</div>
                             <div className="p-3 py-2 flex justify-between items-center text-gray-600 hover:bg-gray-50">
                                 <span>블루베리</span>
                                 <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                     <span>2016.12.19</span>
                                     <X className="w-3 h-3 cursor-pointer hover:text-gray-600" />
                                 </div>
                             </div>
                             <div className="p-3 py-2 flex justify-between items-center text-gray-600 hover:bg-gray-50">
                                 <span>사과</span>
                                 <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                     <span>2016.12.19</span>
                                     <X className="w-3 h-3 cursor-pointer hover:text-gray-600" />
                                 </div>
                             </div>
                             <div className="p-3 pt-2 text-red-500 font-bold cursor-pointer hover:underline text-[11px]">
                                 전체삭제
                             </div>
                        </div>
                    </div>
                </div>
             </div>
           </div>
           
           <div className="p-4 border-b border-gray-200">
              <div className="text-[11px] text-[#888888] space-y-1">
                   <p className="text-gray-400 mb-2">쇼핑몰 내 최근 검색했던 단어를 빠르고 편리하게 재검색 할 수 있도록 최근검색어를 제공합니다.</p>
                   <div className="flex items-center gap-1">
                      <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                   </div>
              </div>
          </div>
        </SettingsSection>

        {/* 4. Popular Search Terms Settings */}
        <SettingsSection title="인기 검색어 설정">
           <div className="flex">
             <div className="flex-1 flex flex-col">
                <div className="flex border-b border-gray-200 h-full">
                    <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    인기 검색어 등<br/>록
                    </div>
                    <div className="flex-1 p-4 flex items-center">
                        <Button variant="outline" size="sm" className="h-8 border-gray-300 text-gray-600 bg-white hover:bg-gray-50">
                           <span className="mr-1 text-lg leading-none mb-0.5">+</span> 검색어 추가
                        </Button>
                    </div>
                </div>
             </div>

             {/* Visual Example Area */}
             <div className="w-[500px] border-b border-gray-200 p-6 flex flex-col justify-center">
                <div className="text-gray-400 text-[11px] mb-2">[쇼핑몰 예시화면]</div>
                <div className="border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="border border-gray-300 h-9 flex items-center w-full">
                            <div className="px-3 border-r border-gray-200 h-full flex items-center text-gray-600 bg-white">
                                상품명 <ChevronUp className="w-3 h-3 ml-2 rotate-180 text-gray-400"/>
                            </div>
                            <div className="flex-1 px-3 text-gray-800 text-sm">
                                블루베리
                            </div>
                        </div>
                        <Button className="h-9 w-20 bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-none">
                            검색 <Search className="w-3 h-3 ml-1" />
                        </Button>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                        <span className="bg-[#888888] text-white px-1.5 py-0.5 text-[10px]">인기검색어</span>
                        <div className="flex gap-3 text-gray-600">
                            <span className="cursor-pointer hover:underline">복숭아</span>
                            <span className="text-gray-300">|</span>
                            <span className="cursor-pointer hover:underline">키위</span>
                             <span className="text-gray-300">|</span>
                            <span className="cursor-pointer hover:underline">애플망고</span>
                        </div>
                    </div>
                </div>
             </div>
           </div>

           <div className="p-4 border-b border-gray-200">
              <div className="text-[11px] text-[#888888] space-y-1">
                   <div className="flex items-start gap-1 text-gray-500">
                      <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold mt-0.5 flex-shrink-0">!</span>
                      <p>검색 페이지 내 인기 검색어를 노출하여 주력상품, 이벤트상품 등을 검색할 수 있도록 유도합니다.</p>
                   </div>
                   <p className="text-gray-400 pl-4">다른 페이지에서의 인기 검색어 노출은, 해당 디자인 수정페이지에서 {"{dataHitKeyword()}"} 치환코드 예제를 활용하여 적용하시기 바랍니다.</p>
                   <div className="flex items-center gap-1 mt-2">
                       <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                   </div>
              </div>
          </div>
        </SettingsSection>

        {/* 5. Quick Search Settings */}
        <SettingsSection title="Quick 검색 설정">
           <div className="flex border-b border-gray-200">
            <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
              사용상태
            </div>
            <div className="flex-1 p-4">
               <RadioGroup defaultValue="unused" className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="used" id="quick-used" className="rounded-full border-gray-300 text-gray-600" />
                        <Label htmlFor="quick-used" className="text-gray-700 font-normal cursor-pointer">사용함</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <RadioGroupItem value="unused" id="quick-unused" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                        <Label htmlFor="quick-unused" className="text-gray-700 font-normal cursor-pointer">사용안함</Label>
                    </div>
                </RadioGroup>
            </div>
          </div>
        </SettingsSection>

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
