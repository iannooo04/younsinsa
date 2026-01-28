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

interface Member {
  id: number;
  shopType: string;
  userId: string;
  name: string;
  grade: string;
  email: string;
  phone: string;
  mobile: string;
  dormancyDate: string;
  isDormantSoon?: boolean; // For styling row background
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedMember: Member | null) => void;
}

export default function MemberSearchPopup({ isOpen, onClose, onConfirm }: Props) {
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  // Mock data matching the screenshot
  const members: Member[] = [
    {
      id: 1,
      shopType: "기준몰",
      userId: "dlekdus0264",
      name: "이다연",
      grade: "일반회원",
      email: "dlekdus0264@gmail.com",
      phone: "010-4263-0074",
      mobile: "010-4263-0074",
      dormancyDate: "2026-12-02",
      isDormantSoon: false,
    },
    // Add more mock data if needed for testing, or keep it simple as per screenshot
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white w-[1000px] max-h-[90vh] flex flex-col shadow-lg rounded-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">회원검색</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Search Filters */}
          <div className="bg-[#FBFBFB] p-4 mb-6 text-xs border-t-2 border-gray-500 border-b border-gray-200">
             <div className="flex items-center gap-2">
                 <span className="w-24 font-bold text-gray-700 pl-2">검색어</span>
                 <Select defaultValue="id">
                    <SelectTrigger className="w-32 h-8 text-xs border-gray-300 rounded-sm bg-white">
                        <SelectValue placeholder="아이디" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="id">아이디</SelectItem>
                        <SelectItem value="name">이름</SelectItem>
                        <SelectItem value="nickname">닉네임</SelectItem>
                        <SelectItem value="email">이메일</SelectItem>
                        <SelectItem value="mobile">휴대폰번호</SelectItem>
                        <SelectItem value="phone">전화번호</SelectItem>
                        <div className="h-px bg-gray-200 my-1 mx-1" />
                        <SelectItem value="business_no">사업자등록번호</SelectItem>
                        <SelectItem value="ceo_name">대표자명</SelectItem>
                        <div className="h-px bg-gray-200 my-1 mx-1" />
                        <SelectItem value="fax">팩스번호</SelectItem>
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
                    className="flex-1 h-8 text-xs border-gray-300 rounded-sm" 
                    placeholder="검색어 전체를 정확히 입력하세요."
                />

                <Button className="bg-[#555555] hover:bg-[#444444] text-white w-20 h-8 rounded-sm ml-1">
                    검색
                </Button>
             </div>
          </div>

          {/* Info Text */}
          <div className="flex items-center gap-1.5 mb-2 text-[11px] text-gray-500">
              <span className="bg-gray-600 text-white w-3 h-3 flex items-center justify-center rounded-[2px] font-bold text-[9px]">!</span>
              휴면 전환 예정일이 7일 이내인 회원의 배경은 회색으로 표시됩니다.
          </div>

          {/* Table */}
          <div className="border-t border-gray-500 border-b border-gray-300 min-h-[200px]">
            <table className="w-full text-xs text-center border-collapse table-fixed">
                <colgroup>
                    <col className="w-10" />
                    <col className="w-12" />
                    <col className="w-20" />
                    <col className="w-28" />
                    <col className="w-20" />
                    <col className="w-24" />
                    <col className="w-40" />
                    <col className="w-28" />
                    <col className="w-28" />
                    <col className="w-24" />
                </colgroup>
              <thead className="bg-[#A3A3A3] text-white font-normal h-8">
                <tr>
                  <th className="border-r border-[#CDCDCD] font-normal"></th>
                  <th className="border-r border-[#CDCDCD] font-normal">번호</th>
                  <th className="border-r border-[#CDCDCD] font-normal">상점 구분</th>
                  <th className="border-r border-[#CDCDCD] font-normal">아이디/닉네임</th>
                  <th className="border-r border-[#CDCDCD] font-normal">이름</th>
                  <th className="border-r border-[#CDCDCD] font-normal">등급</th>
                  <th className="border-r border-[#CDCDCD] font-normal">이메일</th>
                  <th className="border-r border-[#CDCDCD] font-normal">전화번호</th>
                  <th className="border-r border-[#CDCDCD] font-normal">휴대폰번호</th>
                  <th className="font-normal">휴면예정일</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {members.length > 0 ? (
                    members.map((member) => (
                        <tr 
                            key={member.id} 
                            className={`h-12 border-b border-gray-200 hover:bg-gray-50 ${member.isDormantSoon ? 'bg-gray-100' : ''}`}
                        >
                            <td className="border-r border-gray-200">
                                <div className="flex justify-center">
                                    <input 
                                        type="radio" 
                                        name="member-select"
                                        checked={selectedMemberId === member.id}
                                        onChange={() => setSelectedMemberId(member.id)}
                                        className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                </div>
                            </td>
                            <td className="border-r border-gray-200 text-gray-600">{member.id}</td>
                            <td className="border-r border-gray-200 text-gray-600">
                                <span className="flex items-center justify-center gap-1">
                                    <span className="text-lg">🇰🇷</span>
                                    {member.shopType}
                                </span>
                            </td>
                            <td className="border-r border-gray-200 text-gray-600">{member.userId}</td>
                            <td className="border-r border-gray-200 text-gray-600">{member.name}</td>
                            <td className="border-r border-gray-200 text-gray-600">{member.grade}</td>
                            <td className="border-r border-gray-200 text-gray-600">{member.email}</td>
                            <td className="border-r border-gray-200 text-gray-600 px-2 break-all">{member.phone}</td>
                            <td className="border-r border-gray-200 text-gray-600 px-2 break-all">{member.mobile}</td>
                            <td className="text-gray-600 px-1">{member.dormancyDate}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={10} className="py-20 text-gray-500 text-center text-xs">
                            검색된 회원이 없습니다.
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>

           {/* Pagination */}
           <div className="flex justify-center mt-6 gap-1">
                <Button variant="ghost" className="w-8 h-8 p-0 bg-[#555555] text-white hover:bg-[#444444] rounded-sm text-xs">
                    1
                </Button>
           </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 p-6 pb-8 border-t border-gray-200">
          <Button 
            className="w-24 h-10 text-sm font-bold bg-[#666666] hover:bg-[#555555] text-white rounded-none"
            onClick={() => {
                const selected = members.find(m => m.id === selectedMemberId);
                onConfirm(selected || null);
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
