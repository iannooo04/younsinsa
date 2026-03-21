"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
} from "lucide-react";

export default function BoardSkinManagementPage() {
  const skinData = [
    { no: 8, type: "모바일쇼핑몰", design: "glance", code: "default", name: "일반형(기본)", count: "1 개", align: "-", width: "-", date: "2025-12-02" },
    { no: 7, type: "모바일쇼핑몰", design: "glance", code: "event", name: "이벤트(기본)", count: "1 개", align: "-", width: "-", date: "2025-12-02" },
    { no: 6, type: "모바일쇼핑몰", design: "glance", code: "gallery", name: "갤러리(기본)", count: "1 개", align: "-", width: "-", date: "2025-12-02" },
    { no: 5, type: "모바일쇼핑몰", design: "glance", code: "qa", name: "1:1문의(기본)", count: "3 개", align: "-", width: "-", date: "2025-12-02" },
    { no: 4, type: "PC쇼핑몰", design: "glance", code: "default", name: "일반형(기본)", count: "1 개", align: "가운데정렬", width: "100%", date: "2025-12-02" },
    { no: 3, type: "PC쇼핑몰", design: "glance", code: "event", name: "이벤트(기본)", count: "1 개", align: "가운데정렬", width: "100%", date: "2025-12-02" },
    { no: 2, type: "PC쇼핑몰", design: "glance", code: "gallery", name: "갤러리(기본)", count: "1 개", align: "가운데정렬", width: "100%", date: "2025-12-02" },
    { no: 1, type: "PC쇼핑몰", design: "glance", code: "qa", name: "1:1문의(기본)", count: "3 개", align: "가운데정렬", width: "100%", date: "2025-12-02" },
  ];

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">게시판 스킨 관리</h1>
        <Button className="h-10 px-8 text-base bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
          등록
        </Button>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-bold text-sm text-gray-800">게시판 스킨 검색</h2>
          <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
          {/* Store */}
          <div className="flex border-b border-gray-200 min-h-[48px]">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              상점
            </div>
            <div className="flex-1 p-2 flex items-center px-4">
              <RadioGroup defaultValue="base" className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="base" id="skin-base" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 text-red-500 focus:ring-red-500 w-4 h-4" />
                  <Label htmlFor="skin-base" className="text-gray-700 cursor-pointer text-xs font-normal flex items-center gap-1">
                    <span className="text-sm">🇰🇷</span> 기준몰
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="cn" id="skin-cn" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 text-red-500 focus:ring-red-500 w-4 h-4" />
                  <Label htmlFor="skin-cn" className="text-gray-700 cursor-pointer text-xs font-normal flex items-center gap-1">
                    <span className="text-sm">🇨🇳</span> 중문몰
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Search Keyword */}
          <div className="flex border-b border-gray-200 min-h-[48px]">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              검색어
            </div>
            <div className="flex-1 p-2 flex items-center gap-1 px-4">
              <Select defaultValue="code">
                <SelectTrigger className="w-24 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="code">스킨코드</SelectItem>
                </SelectContent>
              </Select>
              <Input className="w-48 h-8 text-xs border-gray-300 rounded-[2px]" />
            </div>
          </div>

          {/* Division */}
          <div className="flex border-b border-gray-200 min-h-[48px]">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              구분
            </div>
            <div className="flex-1 p-2 flex items-center px-4">
              <RadioGroup defaultValue="pc" className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="all" id="div-all" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 text-red-500 focus:ring-red-500 w-4 h-4" />
                  <Label htmlFor="div-all" className="text-gray-700 cursor-pointer text-xs font-normal">전체</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="pc" id="div-pc" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 text-red-500 focus:ring-red-500 w-4 h-4" />
                  <Label htmlFor="div-pc" className="text-gray-700 cursor-pointer text-xs font-normal">PC쇼핑몰</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="mobile" id="div-mo" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 text-red-500 focus:ring-red-500 w-4 h-4" />
                  <Label htmlFor="div-mo" className="text-gray-700 cursor-pointer text-xs font-normal">모바일쇼핑몰</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Applied Design Skin */}
          <div className="flex border-b border-gray-200 min-h-[48px]">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              적용 디자인 스킨
            </div>
            <div className="flex-1 p-2 flex items-center px-4">
              <Select defaultValue="glance">
                <SelectTrigger className="w-64 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="glance">PC : 글랜스(glance) - 사용/작업중인 스킨</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Type */}
          <div className="flex min-h-[48px]">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              유형
            </div>
            <div className="flex-1 p-2 flex items-center gap-6 px-4">
              <div className="flex items-center gap-1.5 ">
                <Checkbox id="type-all" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                <Label htmlFor="type-all" className="text-gray-700 cursor-pointer text-xs font-normal">전체</Label>
              </div>
              <div className="flex items-center gap-1.5 ">
                <Checkbox id="type-normal" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                <Label htmlFor="type-normal" className="text-gray-700 cursor-pointer text-xs font-normal">일반형</Label>
              </div>
              <div className="flex items-center gap-1.5 ">
                <Checkbox id="type-gallery" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                <Label htmlFor="type-gallery" className="text-gray-700 cursor-pointer text-xs font-normal">갤러리형</Label>
              </div>
              <div className="flex items-center gap-1.5 ">
                <Checkbox id="type-event" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                <Label htmlFor="type-event" className="text-gray-700 cursor-pointer text-xs font-normal">이벤트형</Label>
              </div>
              <div className="flex items-center gap-1.5 ">
                <Checkbox id="type-qa" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                <Label htmlFor="type-qa" className="text-gray-700 cursor-pointer text-xs font-normal">1:1문의형</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button className="h-10 px-12 text-sm bg-[#555555] hover:bg-[#444444] text-white rounded-[2px] font-bold border-0">
            검색
          </Button>
        </div>
      </div>

      {/* Results Controls */}
      <div className="mb-2">
        <div className="text-[11px] font-normal text-gray-500">
          검색 <span className="text-red-500 font-bold">8</span>개 / 전체 <span className="text-red-500 font-bold">8</span>건
        </div>
      </div>

      {/* Table Section */}
      <div className="border-t-2 border-gray-400 border-b border-gray-200 mb-4">
        <table className="w-full text-xs text-center border-collapse">
          <thead>
            <tr className="bg-[#B9B9B9] text-white h-10 border-b border-gray-300 font-normal">
              <th className="w-12 border-r border-gray-300">
                <Checkbox className="border-white data-[state=checked]:bg-white data-[state=checked]:text-gray-400 w-3.5 h-3.5 rounded-[2px]" />
              </th>
              <th className="w-16 border-r border-gray-300 font-normal">번호</th>
              <th className="w-24 border-r border-gray-300 font-normal">구분</th>
              <th className="w-32 border-r border-gray-300 font-normal">적용 디자인스킨</th>
              <th className="w-24 border-r border-gray-300 font-normal">스킨코드</th>
              <th className="border-r border-gray-300 font-normal">스킨명</th>
              <th className="w-20 border-r border-gray-300 font-normal">적용개수</th>
              <th className="w-24 border-r border-gray-300 font-normal">정렬</th>
              <th className="w-20 border-r border-gray-300 font-normal">넓이</th>
              <th className="w-32 border-r border-gray-300 font-normal">등록일</th>
              <th className="w-16 border-r border-gray-300 font-normal">수정</th>
              <th className="w-16 font-normal">삭제</th>
            </tr>
          </thead>
          <tbody>
            {skinData.map((row, i) => (
              <tr key={i} className="h-10 border-b border-gray-200 hover:bg-gray-50 text-gray-700">
                <td className="border-r border-gray-200"><Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" /></td>
                <td className="border-r border-gray-200 font-normal">{row.no}</td>
                <td className="border-r border-gray-200 font-normal">{row.type}</td>
                <td className="border-r border-gray-200 font-normal">{row.design}</td>
                <td className="border-r border-gray-200 font-normal">{row.code}</td>
                <td className="border-r border-gray-200 font-normal text-left px-4">{row.name}</td>
                <td className="border-r border-gray-200 font-normal">{row.count}</td>
                <td className="border-r border-gray-200 font-normal">{row.align}</td>
                <td className="border-r border-gray-200 font-normal">{row.width}</td>
                <td className="border-r border-gray-200 font-normal">{row.date}</td>
                <td className="border-r border-gray-200">
                  <Button variant="outline" className="h-6 px-2 text-[11px] border-gray-300 rounded-none bg-white font-normal hover:bg-gray-50">수정</Button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      <div className="bg-[#F9F9F9] p-3 border border-gray-200 flex items-center gap-2 mb-8">
        <div className="text-xs font-bold text-gray-600 ml-1 flex items-center gap-1">
          <span className="text-red-500 font-bold">✓</span> 선택한 스킨
        </div>
        <Button variant="outline" className="h-7 px-4 text-[11px] border-gray-300 rounded-[2px] bg-white hover:bg-gray-50 text-gray-700">삭제</Button>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center justify-center w-7 h-7 bg-[#555555] text-white font-bold rounded-[2px]">1</div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-auto py-6 text-center text-[10px] text-gray-400 pt-12">
        © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
      </div>

          </div>
  );
}
