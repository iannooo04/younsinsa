"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Plus, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function ManagerManagementPage() {
    const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">운영자 관리</h1>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 rounded-sm h-9 px-4 text-sm font-medium flex items-center gap-1">
                    <Plus size={14} /> 운영자 등록
                </Button>
            </div>

            {/* Search Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">운영자 검색</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border-t border-gray-400 bg-white border-b border-gray-200">
                    <div className="grid grid-cols-[150px_1fr] divide-x border-b border-gray-200">
                        <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center">공급사 구분</div>
                        <div className="p-3 flex items-center gap-6">
                            <RadioGroup defaultValue="all" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="all" id="type-all" />
                                    <Label htmlFor="type-all" className="font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="headquarters" id="type-hq" />
                                    <Label htmlFor="type-hq" className="font-normal cursor-pointer">본사</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="supplier" id="type-supplier" />
                                    <Label htmlFor="type-supplier" className="font-normal cursor-pointer">공급사</Label>
                                </div>
                            </RadioGroup>
                             <Dialog open={isSupplierDialogOpen} onOpenChange={setIsSupplierDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="secondary" size="sm" className="h-7 text-xs bg-gray-400 text-white hover:bg-gray-500 border-0 rounded-sm">
                                        공급사 선택
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[700px] p-0 gap-0">
                                    <DialogHeader className="p-6 pb-2 border-b border-black">
                                        <DialogTitle className="text-xl font-bold text-gray-900">공급사 선택</DialogTitle>
                                    </DialogHeader>
                                    
                                    <div className="p-4 space-y-4">
                                        {/* Popup Search */}
                                        <div className="bg-gray-50 p-4 border-t border-b border-gray-200 flex items-center gap-4">
                                            <span className="font-medium text-gray-700 w-20">공급사명</span>
                                            <div className="flex items-center gap-2 flex-1">
                                                <Input className="h-8 border-gray-300 w-full" />
                                                <Button className="h-8 w-24 bg-[#4B5563] text-white hover:bg-[#374151] rounded-none">
                                                    검색
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Popup Table */}
                                        <div className="border border-gray-300">
                                            <table className="w-full text-center text-xs">
                                                <thead className="bg-[#A6A6A6] text-white">
                                                    <tr>
                                                        <th className="py-2 w-12 border-r border-gray-400">
                                                            <div className="flex justify-center">
                                                                <Checkbox className="bg-white border-white data-[state=checked]:text-black w-4 h-4 rounded-sm" />
                                                            </div>
                                                        </th>
                                                        <th className="py-2 w-16 border-r border-gray-400">번호</th>
                                                        <th className="py-2 border-r border-gray-400">공급사명</th>
                                                        <th className="py-2 w-24 border-r border-gray-400">상태</th>
                                                        <th className="py-2 w-32">등록일</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr className="hover:bg-gray-50">
                                                        <td className="py-3 border-r border-gray-200">
                                                            <div className="flex justify-center">
                                                                <Checkbox className="border-gray-300 w-4 h-4 rounded-sm" />
                                                            </div>
                                                        </td>
                                                        <td className="py-3 border-r border-gray-200">1</td>
                                                        <td className="py-3 border-r border-gray-200 text-left px-4 font-medium">니어인터내셔널</td>
                                                        <td className="py-3 border-r border-gray-200">운영</td>
                                                        <td className="py-3 text-gray-600">2025-11-25</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Popup Pagination */}
                                        <div className="flex justify-center py-2">
                                           <Button variant="ghost" className="h-8 w-8 p-0 rounded-none bg-[#4B5563] text-white hover:bg-[#374151]">
                                                1
                                            </Button>
                                        </div>

                                        {/* Popup Footer */}
                                        <div className="flex justify-center pt-2">
                                            <Button 
                                                className="w-24 h-10 bg-[#4B5563] text-white hover:bg-[#374151] rounded-none text-sm font-medium"
                                                onClick={() => setIsSupplierDialogOpen(false)}
                                            >
                                                확인
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <div className="grid grid-cols-[150px_1fr] divide-x">
                        <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center">검색어</div>
                        <div className="p-3 flex items-center gap-2">
                            <Select defaultValue="integrated">
                                <SelectTrigger className="w-[120px] h-8 rounded-sm border-gray-300 bg-gray-50 text-xs">
                                    <SelectValue placeholder="=통합검색=" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="integrated">=통합검색=</SelectItem>
                                    <SelectItem value="id">아이디</SelectItem>
                                    <SelectItem value="name">이름</SelectItem>
                                    <SelectItem value="email">이메일</SelectItem>
                                    <SelectItem value="nickname">닉네임</SelectItem>
                                    <SelectItem value="phone">전화번호</SelectItem>
                                    <SelectItem value="mobile">휴대폰번호</SelectItem>
                                </SelectContent>
                            </Select>
                            
                            <Select defaultValue="exact">
                                <SelectTrigger className="w-[140px] h-8 rounded-sm border-gray-300 bg-white text-xs">
                                    <SelectValue placeholder="검색어 전체일치" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="exact">검색어 전체일치</SelectItem>
                                    <SelectItem value="partial">검색어 부분포함</SelectItem>
                                </SelectContent>
                            </Select>

                            <Input className="w-[300px] h-8 rounded-sm border-gray-300" placeholder="검색어 전체를 정확히 입력하세요." />
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced Search Toggle & Button */}
            <div className="flex flex-col items-center gap-4">
                <div className="w-full flex justify-start">
                    <button className="text-blue-500 text-xs flex items-center hover:underline">
                        상세검색 펼침 <ChevronDown size={14} />
                    </button>
                </div>
                <Button className="bg-[#4B5563] hover:bg-[#374151] text-white rounded-sm h-10 px-10 text-sm font-medium rounded-none">
                    검색
                </Button>
            </div>

            {/* List Section */}
            <div className="space-y-2 pt-8">
                <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-600">
                        검색 <span className="text-red-500 font-bold">2</span>개 / 
                        전체 <span className="text-red-500 font-bold">2</span>개 | 
                        장기 미로그인 운영자 <span className="text-red-500 font-bold">0</span>개
                    </div>
                    <div className="flex items-center gap-1">
                        <Select defaultValue="date_desc">
                            <SelectTrigger className="w-[100px] h-8 rounded-sm border-gray-300 text-xs">
                                <SelectValue placeholder="등록일 ↓" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date_desc">등록일 ↓</SelectItem>
                                <SelectItem value="date_asc">등록일 ↑</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="10">
                            <SelectTrigger className="w-[100px] h-8 rounded-sm border-gray-300 text-xs">
                                <SelectValue placeholder="10개 보기" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10개 보기</SelectItem>
                                <SelectItem value="20">20개 보기</SelectItem>
                                <SelectItem value="50">50개 보기</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="border-t border-gray-400">
                    <table className="w-full text-center text-xs">
                        <thead className="bg-[#A6A6A6] text-white font-normal">
                            <tr>
                                <th className="py-2 w-10 border-r border-gray-400">
                                    <div className="flex justify-center">
                                        <Checkbox className="bg-white border-white data-[state=checked]:text-black w-4 h-4 rounded-sm" />
                                    </div>
                                </th>
                                <th className="py-2 w-12 border-r border-gray-400">번호</th>
                                <th className="py-2 w-24 border-r border-gray-400">공급사 구분</th>
                                <th className="py-2 border-r border-gray-400">아이디/닉네임</th>
                                <th className="py-2 w-24 border-r border-gray-400">이름</th>
                                <th className="py-2 w-20 border-r border-gray-400">직원여부</th>
                                <th className="py-2 w-32 border-r border-gray-400">직원/부서/직급/직책</th>
                                <th className="py-2 w-32 border-r border-gray-400">연락처</th>
                                <th className="py-2 w-24 border-r border-gray-400">등록일</th>
                                <th className="py-2 w-24 border-r border-gray-400">최종로그인</th>
                                <th className="py-2 w-16">정보수정</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 border-b border-gray-300">
                             <tr className="hover:bg-gray-50">
                                <td className="py-3 border-r border-gray-200">
                                    <div className="flex justify-center">
                                        <Checkbox className="border-gray-300 w-4 h-4 rounded-sm" />
                                    </div>
                                </td>
                                <td className="py-3 border-r border-gray-200">2</td>
                                <td className="py-3 border-r border-gray-200">본사</td>
                                <td className="py-3 border-r border-gray-200 text-left px-4">
                                    admin01 / 관리자01
                                </td>
                                <td className="py-3 border-r border-gray-200">관리자01</td>
                                <td className="py-3 border-r border-gray-200">직원</td>
                                <td className="py-3 border-r border-gray-200">
                                    /<br/>/
                                </td>
                                <td className="py-3 border-r border-gray-200">
                                    010-7129-6105<br/>
                                    <span className="text-gray-500">no-reply@godomall.com</span>
                                </td>
                                <td className="py-3 border-r border-gray-200 text-gray-600">2025-12-04</td>
                                <td className="py-3 border-r border-gray-200 text-gray-600">2026-01-07</td>
                                <td className="py-3">
                                    <Button variant="outline" size="sm" className="h-6 text-xs px-2 bg-white hover:bg-gray-50 border-gray-300 text-gray-600">
                                        수정
                                    </Button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="py-3 border-r border-gray-200">
                                    <div className="flex justify-center">
                                        <Checkbox className="border-gray-300 w-4 h-4 rounded-sm" />
                                    </div>
                                </td>
                                <td className="py-3 border-r border-gray-200">1</td>
                                <td className="py-3 border-r border-gray-200">본사</td>
                                <td className="py-3 border-r border-gray-200 text-left px-4">
                                    sosexy76<br/>
                                    <span className="text-blue-500 font-medium">(최고운영자)</span>
                                </td>
                                <td className="py-3 border-r border-gray-200">전체관리자</td>
                                <td className="py-3 border-r border-gray-200">직원</td>
                                <td className="py-3 border-r border-gray-200">
                                    /<br/>/
                                </td>
                                <td className="py-3 border-r border-gray-200">
                                    010-7129-6105
                                </td>
                                <td className="py-3 border-r border-gray-200 text-gray-600">2025-12-02</td>
                                <td className="py-3 border-r border-gray-200 text-gray-600">2026-01-07</td>
                                <td className="py-3">
                                    <Button variant="outline" size="sm" className="h-6 text-xs px-2 bg-white hover:bg-gray-50 border-gray-300 text-gray-600">
                                        수정
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center gap-1 pt-2">
                     <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm h-8 px-3 text-xs">
                        선택삭제
                    </Button>
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm h-8 px-3 text-xs">
                        선택 로그인 제한처리
                    </Button>
                </div>

                {/* Pagination */}
                 <div className="flex justify-center mt-6">
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-none bg-[#4B5563] text-white hover:bg-[#374151]">
                        1
                    </Button>
                </div>
            </div>
            
             {/* Floating Actions */}
             <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-12 h-12 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px]">YouTube</span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-[#6E36E2] hover:bg-[#6E36E2]/90 shadow-lg text-white p-0 flex flex-col items-center justify-center border-0 gap-0">
                    <span className="text-[10px] leading-none">따라</span>
                    <span className="text-[10px] leading-none">하기</span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    ↑
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    ↓
                </Button>
            </div>
        </div>
    );
}
