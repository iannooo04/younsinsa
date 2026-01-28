"use client";

import React, { useState } from "react";
import { 
  HelpCircle, 
  Youtube
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SecurityAuthPopup from "@/components/admin/SecurityAuthPopup";

export default function BankAccountManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [usageFilter, setUsageFilter] = useState("all");
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Breadcrumbs */}
      <div className="text-[11px] text-gray-500 mb-6 flex items-center gap-1">
        <span>기본설정</span>
        <span>{'>'}</span>
        <span>결제 정책</span>
        <span>{'>'}</span>
        <span className="font-bold text-gray-700">무통장 입금 은행 관리</span>
      </div>

      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">무통장 입금 은행 관리</h1>
        <Button 
            variant="outline" 
            className="border-[#FF424D] text-[#FF424D] hover:bg-[#FF424D]/5 font-bold h-9 px-4 rounded-sm text-xs flex items-center gap-1"
            onClick={() => setIsAuthPopupOpen(true)}
        >
             <span className="text-lg leading-none mb-0.5">+</span> 무통장 입금 은행 등록
        </Button>
      </div>

      {/* Search Section */}
      <div className="mb-10">
          <div className="flex items-center gap-1 mb-2">
            <h3 className="text-sm font-bold text-gray-800">등록은행 검색</h3>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="border-t-2 border-gray-500 border-b border-gray-300">
             {/* Search Criteria */}
             <div className="flex border-b border-gray-200 min-h-[50px]">
                <div className="w-40 bg-[#FBFBFB] flex items-center pl-4 font-bold text-gray-700">
                    검색어
                </div>
                <div className="flex-1 flex items-center p-2 gap-1">
                     <Select defaultValue="all">
                        <SelectTrigger className="w-32 h-8 text-xs border-gray-300 rounded-sm bg-white">
                            <SelectValue placeholder="=통합검색=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">=통합검색=</SelectItem>
                            <SelectItem value="name">은행명</SelectItem>
                            <SelectItem value="account">계좌번호</SelectItem>
                            <SelectItem value="holder">예금주</SelectItem>
                        </SelectContent>
                    </Select>

                     <Select defaultValue="exact">
                        <SelectTrigger className="w-32 h-8 text-xs border-gray-300 rounded-sm bg-white">
                            <SelectValue placeholder="검색어 전체일치" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="exact">검색어 전체일치</SelectItem>
                            <SelectItem value="partial">검색어 부분포함</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input 
                        className="w-80 h-8 text-xs border-gray-300 rounded-sm" 
                        placeholder="검색어 전체를 정확히 입력하세요."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
             </div>

             {/* Usage Filter */}
             <div className="flex min-h-[50px]">
                <div className="w-40 bg-[#FBFBFB] flex items-center pl-4 font-bold text-gray-700">
                    사용설정
                </div>
                <div className="flex-1 flex items-center p-2">
                     <RadioGroup 
                        value={usageFilter} 
                        onValueChange={setUsageFilter} 
                        className="flex items-center gap-6"
                    >
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="usage-all" className="border-gray-300 text-[#FF424D]" />
                            <Label htmlFor="usage-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                             <RadioGroupItem value="used" id="usage-used" className="border-gray-300 text-[#FF424D]" />
                            <Label htmlFor="usage-used" className="text-gray-700 font-normal cursor-pointer">사용함</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                             <RadioGroupItem value="unused" id="usage-unused" className="border-gray-300 text-[#FF424D]" />
                            <Label htmlFor="usage-unused" className="text-gray-700 font-normal cursor-pointer">사용안함</Label>
                        </div>
                    </RadioGroup>
                </div>
             </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button className="bg-[#555555] hover:bg-[#444444] text-white w-24 h-10 rounded-sm font-normal text-sm">
              검색
            </Button>
          </div>
      </div>

       {/* List Section */}
      <div className="mb-20">
         <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-500">
                검색 <span className="text-red-500 font-bold">0</span>개 / 전체 <span className="text-red-500 font-bold">0</span>개
            </div>
            <div className="flex items-center gap-1">
                 <Select defaultValue="date_desc">
                    <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300 rounded-sm bg-white">
                        <SelectValue placeholder="등록일 ↓" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date_desc">등록일 ↓</SelectItem>
                        <SelectItem value="date_asc">등록일 ↑</SelectItem>
                        <SelectItem value="bank_desc">은행명 ↓</SelectItem>
                        <SelectItem value="bank_asc">은행명 ↑</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="10">
                    <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300 rounded-sm bg-white">
                        <SelectValue placeholder="10개 보기" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10개 보기</SelectItem>
                        <SelectItem value="20">20개 보기</SelectItem>
                        <SelectItem value="30">30개 보기</SelectItem>
                        <SelectItem value="40">40개 보기</SelectItem>
                        <SelectItem value="50">50개 보기</SelectItem>
                        <SelectItem value="60">60개 보기</SelectItem>
                        <SelectItem value="70">70개 보기</SelectItem>
                        <SelectItem value="80">80개 보기</SelectItem>
                        <SelectItem value="90">90개 보기</SelectItem>
                        <SelectItem value="100">100개 보기</SelectItem>
                        <SelectItem value="200">200개 보기</SelectItem>
                        <SelectItem value="300">300개 보기</SelectItem>
                        <SelectItem value="500">500개 보기</SelectItem>
                    </SelectContent>
                </Select>
            </div>
         </div>

         <div className="border-t border-gray-400 border-b border-gray-300">
            <table className="w-full text-xs text-center border-collapse">
                <thead className="bg-[#A3A3A3] text-white">
                    <tr className="h-9">
                        <th className="w-10 border-r border-[#CDCDCD] font-normal">
                             <Checkbox className="bg-white border-gray-300 rounded-[2px]" />
                        </th>
                        <th className="w-16 border-r border-[#CDCDCD] font-normal">번호</th>
                        <th className="border-r border-[#CDCDCD] font-normal">은행명</th>
                        <th className="w-60 border-r border-[#CDCDCD] font-normal">계좌번호</th>
                        <th className="w-40 border-r border-[#CDCDCD] font-normal">예금주</th>
                        <th className="w-32 border-r border-[#CDCDCD] font-normal">치환코드</th>
                        <th className="w-24 border-r border-[#CDCDCD] font-normal">사용설정</th>
                        <th className="w-32 border-r border-[#CDCDCD] font-normal">등록일</th>
                        <th className="w-20 font-normal">수정</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={9} className="py-20 text-gray-500 text-center border-b border-gray-200">
                            검색된 정보가 없습니다.
                        </td>
                    </tr>
                </tbody>
            </table>
         </div>

         <div className="flex justify-between items-center mt-3 p-3 bg-[#FBFBFB] border border-gray-200">
             <div className="flex gap-1">
                <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-600 rounded-sm hover:bg-gray-50 px-3">
                    선택 복사
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-600 rounded-sm hover:bg-gray-50 px-3">
                    선택 삭제
                </Button>
             </div>
             
             <div className="flex items-center gap-2 text-xs text-gray-700">
                 <span>일괄노출 치환코드 :</span>
                 <Button size="sm" className="h-7 text-[11px] bg-[#999999] border border-gray-300 text-white rounded-sm hover:bg-[#888888] px-3">
                    코드보기
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 px-3">
                    복사
                </Button>
             </div>
         </div>
      </div>
        
      {/* Floating Action Buttons */}
      <div className="fixed bottom-10 right-10 flex flex-col gap-2 z-50">
        <button className="w-12 h-12 bg-[#FF424D] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#FF424D]/90 transition-colors">
            <Youtube className="w-6 h-6" />
        </button>
        <button className="w-12 h-12 bg-[#6b46c1] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#6b46c1]/90 transition-colors">
            <div className="text-[10px] leading-tight text-center font-bold">
                따라<br/>하기
            </div>
        </button>
        <button className="w-12 h-12 bg-[#ced4da] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#adb5bd] transition-colors">
            <span className="text-xl font-bold">↓</span>
        </button>
      </div>

      <SecurityAuthPopup 
        isOpen={isAuthPopupOpen} 
        onClose={() => setIsAuthPopupOpen(false)} 
      />

    </div>
  );
}
