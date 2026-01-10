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
  Youtube,
  ChevronUp,
} from "lucide-react";

export default function BoardTemplateManagementPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">게시글 양식 관리</h1>
        <Button className="h-10 px-8 text-base bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
          등록
        </Button>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-bold text-sm text-gray-800">게시글 양식 검색</h2>
          <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
          {/* Search Keyword */}
          <div className="flex border-b border-gray-200 min-h-[48px]">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              검색어
            </div>
            <div className="flex-1 p-2 flex items-center gap-1 px-4">
              <Select defaultValue="integrated">
                <SelectTrigger className="w-32 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue placeholder="=통합검색=" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="integrated">=통합검색=</SelectItem>
                </SelectContent>
              </Select>
              <Input className="w-48 h-8 text-xs border-gray-300 rounded-[2px]" />
            </div>
          </div>

          {/* Classification */}
          <div className="flex min-h-[48px]">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              분류
            </div>
            <div className="flex-1 p-2 flex items-center px-4">
              <RadioGroup defaultValue="all" className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="all" id="class-all" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 text-red-500 focus:ring-red-500 w-4 h-4" />
                  <Label htmlFor="class-all" className="text-gray-700 cursor-pointer text-xs font-normal">전체</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="mall" id="class-mall" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 text-red-500 focus:ring-red-500 w-4 h-4" />
                  <Label htmlFor="class-mall" className="text-gray-700 cursor-pointer text-xs font-normal">쇼핑몰 게시글 양식</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="admin" id="class-admin" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 text-red-500 focus:ring-red-500 w-4 h-4" />
                  <Label htmlFor="class-admin" className="text-gray-700 cursor-pointer text-xs font-normal">관리자 게시글 양식</Label>
                </div>
              </RadioGroup>
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
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] font-normal text-gray-500">
          검색 <span className="text-red-500 font-bold">0</span>개 / 전체 <span className="text-red-500 font-bold">0</span>개
        </div>
        <div className="flex items-center gap-1">
          <Select defaultValue="num_desc">
            <SelectTrigger className="w-24 h-8 text-[11px] border-gray-300 bg-white rounded-[2px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="num_desc">번호 ↓</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="10">
            <SelectTrigger className="w-28 h-8 text-[11px] border-gray-300 bg-white rounded-[2px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10개 보기</SelectItem>
            </SelectContent>
          </Select>
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
              <th className="w-48 border-r border-gray-300 font-normal">분류</th>
              <th className="border-r border-gray-300 font-normal">제목</th>
              <th className="w-48 border-r border-gray-300 font-normal">등록일 / 수정일</th>
              <th className="w-16 font-normal">수정</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-24">
              <td colSpan={6} className="text-gray-400 font-normal">템플릿이 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      <div className="bg-[#F9F9F9] p-3 border border-gray-200 flex items-center mb-8">
        <Button variant="outline" className="h-7 px-4 text-[11px] border-gray-300 rounded-[2px] bg-white hover:bg-gray-50 text-gray-700 font-normal">선택 삭제</Button>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-auto py-6 text-center text-[10px] text-gray-400 pt-12">
        © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
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
    </div>
  );
}
