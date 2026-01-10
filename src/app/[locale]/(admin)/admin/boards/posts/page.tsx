"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  Info,
  Calendar,
  FileSpreadsheet
} from "lucide-react";

export default function PostManagementPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">게시글 관리</h1>
          <span className="text-gray-500 text-sm">게시물을 수정하고 관리합니다.</span>
        </div>
        <Button className="h-10 px-8 text-base bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
          등록
        </Button>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-bold text-sm text-gray-800">게시글 관리</h2>
          <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
          {/* Board & Prefix */}
          <div className="flex border-b border-gray-200">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              게시판
            </div>
            <div className="flex-1 p-2 flex items-center gap-1 border-r border-gray-200">
              <Select defaultValue="cooperation">
                <SelectTrigger className="w-64 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue placeholder="게시판 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cooperation">광고 · 제휴게시판 (cooperation)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              말머리
            </div>
            <div className="flex-1 p-2 flex items-center">
              <span className="text-gray-700 ml-2">-</span>
            </div>
          </div>

          {/* Date Selection */}
          <div className="flex border-b border-gray-200">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              일자
            </div>
            <div className="flex-1 p-2 flex items-center gap-1">
              <Select defaultValue="reg_date">
                <SelectTrigger className="w-24 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reg_date">등록일</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1 ml-1">
                <div className="relative">
                  <Input className="w-32 h-8 text-xs border-gray-300 rounded-[2px] pr-8" defaultValue="2026-01-05" />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-2 top-2" />
                </div>
                <span className="text-gray-400">~</span>
                <div className="relative">
                  <Input className="w-32 h-8 text-xs border-gray-300 rounded-[2px] pr-8" defaultValue="2026-01-11" />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-2 top-2" />
                </div>
              </div>
              <div className="flex items-center gap-0 ml-2">
                <DateButton label="오늘" />
                <DateButton label="7일" active />
                <DateButton label="15일" />
                <DateButton label="1개월" />
                <DateButton label="3개월" />
                <DateButton label="1년" />
              </div>
            </div>
          </div>

          {/* Answer Status */}
          <div className="flex border-b border-gray-200">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              답변상태
            </div>
            <div className="flex-1 p-2 flex items-center">
              <Select defaultValue="all">
                <SelectTrigger className="w-24 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">=전체=</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Keyword */}
          <div className="flex">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              검색어
            </div>
            <div className="flex-1 p-2 flex items-center gap-1">
              <Select defaultValue="subject">
                <SelectTrigger className="w-24 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue placeholder="제목" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subject">제목</SelectItem>
                </SelectContent>
              </Select>
              <Input className="w-64 h-8 text-xs border-gray-300 rounded-[2px]" placeholder="검색어에 포함된 내용을 입력하세요." />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button className="h-10 px-12 text-sm bg-[#555555] hover:bg-[#444444] text-white rounded-[2px] font-bold">
            검색
          </Button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex border-b border-gray-300 mb-6">
        <TabItem label="일반 게시물" active />
        <TabItem label="신고 게시물" />
        <TabItem label="신고 댓글" />
      </div>

      {/* Results Controls */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] font-normal text-gray-500">
          검색 <span className="text-red-500 font-bold">0</span>개/ 전체 <span className="text-red-500 font-bold">0</span>개
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
              <th className="border-r border-gray-300 font-normal">제목</th>
              <th className="w-24 border-r border-gray-300 font-normal">작성자</th>
              <th className="w-32 border-r border-gray-300 font-normal">작성일</th>
              <th className="w-16 border-r border-gray-300 font-normal">조회</th>
              <th className="w-24 border-r border-gray-300 font-normal">답변상태</th>
              <th className="w-32 border-r border-gray-300 font-normal">답변일</th>
              <th className="w-24 font-normal">수정/답변</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-40">
              <td colSpan={9} className="text-gray-400 text-sm">게시물이 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bulk Actions & Excel */}
      <div className="bg-[#F9F9F9] p-3 border border-gray-200 flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="text-xs font-bold text-gray-600 ml-1 flex items-center gap-1">
            <span className="text-red-500 font-bold">✓</span> 선택한 게시글
          </div>
          <Button variant="outline" className="h-7 px-4 text-[11px] border-gray-300 rounded-[2px] bg-white hover:bg-gray-50 text-gray-700">삭제</Button>
        </div>
        <Button variant="outline" className="h-7 px-3 text-[11px] border-gray-300 rounded-[2px] bg-white hover:bg-gray-50 text-[#1D6F42] flex items-center gap-1">
          <FileSpreadsheet className="w-3.5 h-3.5" /> 엑셀다운로드
        </Button>
      </div>

      {/* Guide Section */}
      <div className="border-t border-gray-200 pt-12 text-gray-600 text-[11px]">
        <h3 className="font-bold flex items-center gap-1 mb-6 text-blue-500 text-[13px]">
          <Info className="w-4 h-4 ml-[-2px]" /> 안내
        </h3>
        <div className="space-y-12 mb-12">
          <div>
            <h4 className="font-bold text-gray-700 mb-2">[게시글 관리] 게시글 이동은 어떻게 하나요?</h4>
            <ul className="list-none space-y-2 text-gray-500 pl-1 leading-relaxed">
              <li>· 이동할 게시글의 [수정] 버튼 클릭 후 게시판 이동의 체크박스에 체크한 뒤에 이동할 게시판을 선택하고 [저장] 버튼을 클릭하면 됩니다.</li>
              <li>· 이동할 게시글은 같은 유형의 게시판으로만 이동할 수 있습니다.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-700 mb-2">[게시글 관리] 1:1게시판이나 상품문의 게시판 답변상태는 어떻게 변경하나요?</h4>
            <ul className="list-none space-y-2 text-gray-500 pl-1 leading-relaxed">
              <li>· 1:1게시판 또는 상품문의 게시판에서 답변할 게시글의 [답변] 버튼을 클릭합니다.</li>
              <li>· 답변내용 입력 후 답변상태를 답변의 내용에 따라 "접수 / 답변대기 / 답변완료"로 변경할 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="pb-6 text-center text-[10px] text-gray-400 border-t border-gray-100 pt-6">
        © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
      </div>

      {/* Floating Actions */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
        <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
          <span className="text-[10px] font-bold"><Youtube size={16} /></span>
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

function DateButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button className={`h-8 px-3 text-[11px] border whitespace-nowrap flex-shrink-0 ${active ? 'bg-[#555555] text-white border-[#555555]' : 'bg-white text-gray-600 border-gray-300'} first:rounded-l-[2px] last:rounded-r-[2px] -ml-[1px] hover:z-10`}>
      {label}
    </button>
  );
}

function TabItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div className={`px-6 py-3 text-sm cursor-pointer border-t-[3px] border-x border-b ${active ? 'border-t-[#FF424D] border-x-gray-300 border-b-white bg-white font-bold text-gray-800' : 'border-t-transparent border-x-transparent border-b-transparent text-gray-500 hover:text-gray-700'} -mb-[1px]`}>
      {label}
    </div>
  );
}
