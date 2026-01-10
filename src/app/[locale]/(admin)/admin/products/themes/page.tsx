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
import {
  HelpCircle,
  Calendar,
  ChevronDown,
  Youtube,
  MoveUp,
  MoveDown,
  BookOpen, // Using BookOpen as a substitute for the blue book icon
} from "lucide-react";

export default function ThemeManagementPage() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Mock Data
  const themes = [
    {
      id: 16,
      mallType: "PC쇼핑몰",
      code: "B0000003",
      category: "메인테마",
      name: "상단 상품진열",
      imageSize: "추가이미지1 - 310 pixel",
      productCount: "4 X 1",
      appliedCount: 1,
      regDate: "2025-12-02",
    },
    {
      id: 15,
      mallType: "PC쇼핑몰",
      code: "B0000004",
      category: "메인테마",
      name: "하단 상품진열",
      imageSize: "추가이미지1 - 310 pixel",
      productCount: "4 X 2",
      appliedCount: 1,
      regDate: "2025-12-02",
    },
    {
      id: 14,
      mallType: "모바일쇼핑몰",
      code: "B0000005",
      category: "메인테마",
      name: "상단 상품진열",
      imageSize: "리스트이미지(기본) - 180 pixel",
      productCount: "2 X 2",
      appliedCount: 1,
      regDate: "2025-12-02",
    },
    {
      id: 13,
      mallType: "모바일쇼핑몰",
      code: "B0000006",
      category: "메인테마",
      name: "하단 상품진열",
      imageSize: "리스트이미지(기본) - 180 pixel",
      productCount: "1 X 6",
      appliedCount: 1,
      regDate: "2025-12-02",
    },
    {
      id: 12,
      mallType: "PC쇼핑몰",
      code: "A0000001",
      category: "검색페이지테마",
      name: "검색페이지테마",
      imageSize: "추가리스트1 - 220 pixel",
      productCount: "4 X 5",
      appliedCount: 0,
      regDate: "2025-11-25",
    },
    {
      id: 11,
      mallType: "모바일쇼핑몰",
      code: "A0000002",
      category: "검색페이지테마",
      name: "검색페이지테마",
      imageSize: "리스트이미지(기본) - 180 pixel",
      productCount: "2 X 5",
      appliedCount: 0,
      regDate: "2025-11-25",
    },
    {
      id: 10,
      mallType: "PC쇼핑몰",
      code: "B0000001",
      category: "메인테마",
      name: "메인테마",
      imageSize: "리스트이미지(기본) - 180 pixel",
      productCount: "4 X 2",
      appliedCount: 0,
      regDate: "2025-11-25",
    },
    {
      id: 9,
      mallType: "모바일쇼핑몰",
      code: "B0000002",
      category: "메인테마",
      name: "메인테마",
      imageSize: "리스트이미지(기본) - 180 pixel",
      productCount: "2 X 2",
      appliedCount: 0,
      regDate: "2025-11-25",
    },
    {
      id: 8,
      mallType: "PC쇼핑몰",
      code: "C0000001",
      category: "브랜드테마",
      name: "브랜드테마",
      imageSize: "추가리스트2 - 280 pixel",
      productCount: "4 X 5",
      appliedCount: 23,
      regDate: "2025-11-25",
      editDate: "2025-12-05",
    },
     {
      id: 7,
      mallType: "모바일쇼핑몰",
      code: "C0000002",
      category: "브랜드테마",
      name: "브랜드테마",
      imageSize: "리스트이미지(기본) - 180 pixel",
      productCount: "2 X 5",
      appliedCount: 23,
      regDate: "2025-11-25",
       editDate: "2025-12-05",
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(themes.map((t) => t.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-sm pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">테마 관리</h1>
        <Button
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-50"
        >
          + 테마 등록
        </Button>
      </div>

      {/* Search Section */}
      <div className="border border-gray-200 mb-8">
        <div className="flex items-center gap-2 p-3 bg-gray-50 border-b border-gray-200">
           <h2 className="font-bold text-gray-700">테마 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        <div className="p-4 space-y-4">
             {/* Row 1: Theme Name */}
            <div className="flex items-center text-xs">
                <div className="w-32 font-bold text-gray-700">테마명</div>
                <div className="flex-1">
                    <Input className="w-[300px] h-8" />
                </div>
            </div>
             {/* Row 2: Date Search */}
             <div className="flex items-center text-xs">
                <div className="w-32 font-bold text-gray-700">기간검색</div>
                <div className="flex-1 flex items-center gap-2">
                     <Select defaultValue="reg_date">
                        <SelectTrigger className="w-24 h-8 text-[11px] border-gray-300">
                            <SelectValue placeholder="등록일" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="reg_date">등록일</SelectItem>
                        </SelectContent>
                    </Select>
                     <div className="flex items-center gap-1">
                        <Input className="w-28 h-8 text-center" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <span>~</span>
                    <div className="flex items-center gap-1">
                        <Input className="w-28 h-8 text-center" />
                        <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-0.5">
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-l-sm border-r-0 hover:bg-gray-50">오늘</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-none border-r-0 hover:bg-gray-50">7일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-none border-r-0 hover:bg-gray-50">15일</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-none border-r-0 hover:bg-gray-50">1개월</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-none border-r-0 hover:bg-gray-50">3개월</Button>
                        <Button variant="default" size="sm" className="h-7 px-2 text-[11px] bg-gray-600 text-white rounded-r-sm hover:bg-gray-700">전체</Button>
                    </div>
                </div>
            </div>
        </div>
        
         <div className="px-4 pb-4">
             <button className="text-blue-500 text-xs flex items-center gap-1 font-bold">
                 상세검색 펼침 <ChevronDown className="w-3 h-3" />
             </button>
         </div>
         
         <div className="bg-[#888888] p-3 flex justify-center">
             <Button className="bg-[#444444] hover:bg-[#333333] text-white font-bold h-9 w-24">검색</Button>
         </div>
      </div>

      {/* List Header */}
      <div className="flex justify-between items-end mb-2">
          <div className="text-xs">
              검색 <span className="text-red-500 font-bold">16</span>개 / 전체 <span className="text-red-500 font-bold">16</span>개
          </div>
          <div className="flex gap-1">
               <Select defaultValue="date_asc">
                    <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="등록일 ↑" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date_asc">등록일 ↑</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="10">
                    <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="10개 보기" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10개 보기</SelectItem>
                    </SelectContent>
                </Select>
          </div>
      </div>

      {/* Table */}
      <div className="border-t-2 border-gray-400 mb-4">
          <table className="w-full text-xs text-center border-collapse">
              <thead className="bg-[#F1F1F1] text-gray-700 font-bold">
                  <tr>
                      <th className="py-3 border-b border-gray-300 w-10">
                          <Checkbox 
                            checked={selectedItems.length === themes.length && themes.length > 0}
                            onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                            className="bg-white"
                          />
                      </th>
                      <th className="py-3 border-b border-gray-300 w-12">번호</th>
                      <th className="py-3 border-b border-gray-300 w-24">쇼핑몰 유형</th>
                       <th className="py-3 border-b border-gray-300 w-24">테마코드</th>
                      <th className="py-3 border-b border-gray-300 w-24">테마분류</th>
                      <th className="py-3 border-b border-gray-300">테마명</th>
                      <th className="py-3 border-b border-gray-300 w-48">리스트 이미지 사이즈</th>
                      <th className="py-3 border-b border-gray-300 w-32">리스트 상품 노출개수</th>
                      <th className="py-3 border-b border-gray-300 w-20">적용개수</th>
                      <th className="py-3 border-b border-gray-300 w-28">등록일</th>
                      <th className="py-3 border-b border-gray-300 w-16">수정</th>
                  </tr>
              </thead>
              <tbody className="text-gray-600">
                  {themes.map((theme) => (
                      <tr key={theme.id} className="hover:bg-gray-50">
                          <td className="py-3 border-b border-gray-200">
                               <Checkbox 
                                checked={selectedItems.includes(theme.id)}
                                onCheckedChange={(checked) => handleSelectItem(theme.id, checked as boolean)}
                               />
                          </td>
                          <td className="py-3 border-b border-gray-200">{theme.id}</td>
                          <td className="py-3 border-b border-gray-200">{theme.mallType}</td>
                          <td className="py-3 border-b border-gray-200">{theme.code}</td>
                          <td className="py-3 border-b border-gray-200">{theme.category}</td>
                          <td className="py-3 border-b border-gray-200">{theme.name}</td>
                          <td className="py-3 border-b border-gray-200">{theme.imageSize}</td>
                           <td className="py-3 border-b border-gray-200">{theme.productCount}</td>
                          <td className="py-3 border-b border-gray-200">{theme.appliedCount}</td>
                          <td className="py-3 border-b border-gray-200">
                              <div>{theme.regDate}</div>
                              {theme.editDate && <div className="text-gray-400">{theme.editDate}</div>}
                          </td>
                          <td className="py-3 border-b border-gray-200">
                               <Button variant="outline" size="sm" className="h-6 px-2 text-[11px] border-gray-300 hover:bg-gray-50">수정</Button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>

      {/* Pagination & Actions */}
      <div className="flex justify-between items-center bg-[#F9F9F9] p-2 border-t border-b border-gray-200 mb-10">
          <Button variant="outline" size="sm" className="h-7 text-xs bg-white border-gray-300 hover:bg-gray-50 text-gray-600">선택 삭제</Button>
           <div className="flex gap-0.5">
               <Button variant="outline" size="sm" className="w-7 h-7 p-0 bg-[#333] text-white border-none rounded-none hover:bg-[#222]">1</Button>
               <Button variant="outline" size="sm" className="w-7 h-7 p-0 bg-white text-gray-600 border border-gray-300 rounded-none hover:bg-gray-50">2</Button>
           </div>
           <div className="w-20"></div> {/* Spacer for center alignment */}
      </div>

      {/* Guide Section */}
      <div className="border-t border-gray-300 pt-6 space-y-4">
           <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs">
              <BookOpen className="w-4 h-4" /> 
              <span>안내</span>
           </div>
           <div className="text-xs space-y-2 text-gray-600">
              <h3 className="font-bold text-gray-800">[상품 정보] 테마란 무엇인가요?</h3>
              <p>· 테마란 쇼핑몰 상품 진열영역에 노출되는 상품의 "개수, 이미지 사이즈, 노출항목, 디스플레이 유형" 등을 미리 저장해 놓은 것을 말합니다.</p>
              <p>· 테마는 "메인페이지 / 카테고리페이지 / 브랜드페이지 / 검색페이지 / 추천상품페이지 / 기획전페이지"의 테마를 등록할 수 있습니다.</p>
              <p>· 등록된 테마는 "상품 진열 관리" 메뉴에서 상품 진열 설정 시 선택하여 사용할 수 있습니다.</p>
              <p>· PC쇼핑몰과 모바일쇼핑몰 각각의 테마를 등록할 수 있습니다.</p>
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
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100 p-0">
                        <MoveUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0">
                        <MoveDown className="w-4 h-4" />
                </Button>
            </div>
        </div>

    </div>
  );
}
