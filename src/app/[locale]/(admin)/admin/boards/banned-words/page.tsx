"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  HelpCircle,
  Info
} from "lucide-react";

export default function BoardBannedWordsPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">게시판 금칙어 관리</h1>
          <span className="text-gray-500 text-sm font-normal">게시판 금칙어 관리</span>
        </div>
        <Button className="h-10 px-8 text-base bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
          저장
        </Button>
      </div>

      {/* Main Section */}
      <div className="mb-12">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-bold text-sm text-gray-800">게시판 금칙어</h2>
          <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </div>

        <div className="border border-gray-300 rounded-[2px] overflow-hidden">
          <Textarea 
            className="min-h-[400px] w-full p-4 text-xs border-0 focus-visible:ring-0 resize-none font-normal text-gray-700"
            placeholder="예) 대출, 바카라, 로또"
          />
        </div>
      </div>

      {/* Guide Section */}
      <div className="border-t border-gray-200 pt-12 text-gray-600 text-[11px]">
        <h3 className="font-bold flex items-center gap-1 mb-6 text-blue-500 text-[13px]">
          <Info className="w-4 h-4 ml-[-2px]" /> 안내
        </h3>
        <div className="space-y-4 mb-12 font-normal text-gray-500">
          <div>
            <h4 className="font-bold text-gray-700 mb-2">[금칙어 관리] 금칙어는 어떨때 사용하나요?</h4>
            <div className="space-y-1.5 leading-relaxed pl-1">
              <p>· 게시판에 스팸글 또는 욕설 등의 글이 등록되지 않도록 차단하는 기능입니다.</p>
              <p>· 게시글을 등록할 때 금칙어가 포함되어 있을 경우 게시글이 등록되지 않도록 제한합니다.</p>
              <p>· 금칙어 등록시 단어별 구분은 ',' 콤마(,)로 등록합니다.(예: 운영자, 관리자 등)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-auto py-6 text-center text-[10px] text-gray-400 pt-12 border-t border-gray-100">
        © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
      </div>

          </div>
  );
}
