"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedAddresses: unknown[]) => void;
}

export default function AddressBookPopup({ isOpen, onClose, onConfirm }: Props) {
  const [selectedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white w-[1000px] max-h-[90vh] flex flex-col shadow-lg rounded-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">자주쓰는 주소</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Search Filters */}
          <div className="border-t-2 border-gray-500 border-b border-gray-200 mb-6 text-xs">
            <div className="flex border-b border-gray-200">
              <div className="w-32 bg-[#FBFBFB] p-2 pl-4 font-bold text-gray-700 flex items-center">
                그룹
              </div>
              <div className="flex-1 p-2">
                 <Select defaultValue="all">
                    <SelectTrigger className="w-40 h-7 text-xs border-gray-300 rounded-sm">
                        <SelectValue placeholder="=통합그룹=" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">=통합그룹=</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex">
              <div className="w-32 bg-[#FBFBFB] p-2 pl-4 font-bold text-gray-700 flex items-center">
                검색어
              </div>
              <div className="flex-1 p-2 flex items-center gap-1">
                 <Select defaultValue="all_search">
                    <SelectTrigger className="w-32 h-7 text-xs border-gray-300 rounded-sm">
                        <SelectValue placeholder="=통합검색=" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all_search">=통합검색=</SelectItem>
                        <SelectItem value="group">그룹</SelectItem>
                        <SelectItem value="name">이름</SelectItem>
                        <SelectItem value="email">이메일</SelectItem>
                        <SelectItem value="phone">전화번호</SelectItem>
                        <SelectItem value="mobile">휴대폰번호</SelectItem>
                        <SelectItem value="memo">메모</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="exact">
                    <SelectTrigger className="w-32 h-7 text-xs border-gray-300 rounded-sm">
                        <SelectValue placeholder="검색어 전체일치" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="exact">검색어 전체일치</SelectItem>
                        <SelectItem value="partial">검색어 부분포함</SelectItem>
                    </SelectContent>
                </Select>
                <Input 
                    className="w-80 h-7 text-xs border-gray-300 rounded-sm" 
                    placeholder="검색어 전체를 정확히 입력하세요."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <Button className="bg-[#555555] hover:bg-[#444444] text-white w-24 h-9 rounded-sm">
              검색
            </Button>
          </div>

          {/* List Section */}
          <div className="mb-2 text-xs">
            검색 <span className="text-red-500 font-bold">0</span>개 / 전체 <span className="text-red-500 font-bold">0</span>개
          </div>

          <div className="border-t border-gray-500 border-b border-gray-300 min-h-[200px]">
            <table className="w-full text-xs text-center border-collapse">
              <thead className="bg-[#A3A3A3] text-white font-normal h-8">
                <tr>
                  <th className="w-10 border-r border-[#CDCDCD] font-normal">선택</th>
                  <th className="w-12 border-r border-[#CDCDCD] font-normal">번호</th>
                  <th className="w-20 border-r border-[#CDCDCD] font-normal">그룹</th>
                  <th className="w-20 border-r border-[#CDCDCD] font-normal">이름</th>
                  <th className="border-r border-[#CDCDCD] font-normal">주소</th>
                  <th className="w-24 border-r border-[#CDCDCD] font-normal">이메일</th>
                  <th className="w-32 border-r border-[#CDCDCD] font-normal">전화번호/휴대폰번호</th>
                  <th className="w-24 border-r border-[#CDCDCD] font-normal">사업자번호</th>
                  <th className="w-32 border-r border-[#CDCDCD] font-normal">회사명/(대표자명)</th>
                  <th className="w-20 font-normal">메모</th>
                </tr>
              </thead>
              <tbody>
                  {/* Empty State */}
                  <tr>
                      <td colSpan={10} className="py-20 text-gray-500 text-center text-xs">
                          검색된 정보가 없습니다.
                      </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 p-6 border-t border-gray-200">
           <Button 
            variant="outline" 
            className="w-20 text-xs rounded-sm border-gray-300 bg-white hover:bg-gray-50 text-gray-900" 
            onClick={onClose}
          >
            취소
          </Button>
          <Button 
            className="w-20 text-xs rounded-sm bg-[#555555] hover:bg-[#444444] text-white"
            onClick={() => onConfirm(selectedIds)}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
