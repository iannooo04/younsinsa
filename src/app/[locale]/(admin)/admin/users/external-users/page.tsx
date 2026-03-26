"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ExternalUserListPage() {
  const [users] = useState([
    {
      id: "1",
      username: "test120",
      name: "test120",
      email: "test120@aa.com",
      level: "0",
      country: "KR",
      otp: "미사용",
      joinDate: "2026. 2. 26. 오후 3:10:39",
    },
    {
      id: "2",
      username: "dldks3504",
      name: "노이안",
      email: "dldks3504@gmail.com",
      level: "0",
      country: "KR",
      otp: "미사용",
      joinDate: "2026. 2. 25. 오후 8:29:36",
    },
    {
      id: "3",
      username: "test104",
      name: "test104",
      email: "test104@aa.com",
      level: "0",
      country: "SG",
      otp: "미사용",
      joinDate: "2026. 2. 24. 오후 9:16:33",
    },
    {
      id: "4",
      username: "test103",
      name: "test103",
      email: "test103@aa.com",
      level: "0",
      country: "KR",
      otp: "미사용",
      joinDate: "2026. 2. 24. 오후 9:15:26",
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState("20");
  const [sort, setSort] = useState("recent");
  const [search, setSearch] = useState("");

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(users.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((uid) => uid !== id));
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-800 font-sans">
      {/* Page Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            유저 목록
            <span className="text-[11px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full mt-1">
              신규 추가 페이지 ✨
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">총 107건</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 px-4 text-sm bg-white border-gray-300">
            테스트 회원 생성
          </Button>
          <Button variant="outline" className="h-9 px-4 text-sm bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed">
            선택 삭제
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-300 p-5 mb-6 flex gap-6 items-end shadow-sm">
        <div className="flex-1">
          <label className="block text-[13px] text-gray-600 mb-1.5 font-medium">검색</label>
          <Input 
            placeholder="아이디/이름/이메일/추천코드" 
            className="w-full text-sm h-10 border-gray-300 bg-gray-50/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="w-[300px]">
          <label className="block text-[13px] text-gray-600 mb-1.5 font-medium">정렬</label>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="h-10 text-sm border-gray-300 bg-gray-50/50">
              <SelectValue placeholder="정렬 방식" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">최근 생성 ↓</SelectItem>
              <SelectItem value="oldest">오래된 순 ↑</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[180px]">
          <label className="block text-[13px] text-gray-600 mb-1.5 font-medium">페이지 크기</label>
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="h-10 text-sm border-gray-300 bg-gray-50/50">
              <SelectValue placeholder="갯수" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20">20개씩</SelectItem>
              <SelectItem value="50">50개씩</SelectItem>
              <SelectItem value="100">100개씩</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden p-5">
        <div className="flex items-center gap-2 mb-4">
          <Checkbox 
            id="selectAll" 
            checked={users.length > 0 && selectedIds.length === users.length}
            onCheckedChange={toggleSelectAll}
            className="border-gray-400"
          />
          <label htmlFor="selectAll" className="text-sm text-gray-600 cursor-pointer">
            현재 페이지 전체 선택
          </label>
        </div>

        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 font-medium">
              <th className="py-3 px-2 w-12 font-medium">선택</th>
              <th className="py-3 px-4 font-medium">아이디</th>
              <th className="py-3 px-4 font-medium">이름</th>
              <th className="py-3 px-4 font-medium">이메일</th>
              <th className="py-3 px-4 font-medium">레벨</th>
              <th className="py-3 px-4 font-medium">국가</th>
              <th className="py-3 px-4 font-medium">OTP</th>
              <th className="py-3 px-4 font-medium">가입일</th>
              <th className="py-3 px-4 font-medium text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-2">
                  <Checkbox 
                    checked={selectedIds.includes(user.id)}
                    onCheckedChange={(c) => toggleSelectOne(user.id, !!c)}
                    className="border-gray-400"
                  />
                </td>
                <td className="py-4 px-4 font-semibold text-teal-500">{user.username}</td>
                <td className="py-4 px-4 text-gray-700">{user.name}</td>
                <td className="py-4 px-4 text-gray-600">{user.email}</td>
                <td className="py-4 px-4 text-gray-600">{user.level}</td>
                <td className="py-4 px-4 text-gray-600 font-medium">{user.country}</td>
                <td className="py-4 px-4 text-gray-600">{user.otp}</td>
                <td className="py-4 px-4 text-gray-500 text-[13px]">{user.joinDate}</td>
                <td className="py-4 px-4 text-center">
                  <span className="text-blue-500 font-bold cursor-pointer hover:underline text-lg">!</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-8 flex justify-center text-sm text-gray-500">
           {/* Pagination placeholder matching the design */}
           <div className="flex gap-2">
             <button className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-50">&lt;</button>
             <button className="w-8 h-8 rounded border border-blue-500 bg-blue-50 text-blue-600 font-medium">1</button>
             <button className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-50">2</button>
             <button className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-50">3</button>
             <button className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-50">&gt;</button>
           </div>
        </div>
      </div>
    </div>
  );
}
