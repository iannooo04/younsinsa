"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function ManagerPermissionPage() {
    const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">운영자 권한 설정</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium">
                    저장
                </Button>
            </div>

            <div className="grid grid-cols-[450px_1fr] gap-8 items-start">
                
                {/* LEFT COLUMN: Manager Search */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-800">운영자 검색</h2>
                        <HelpCircle size={14} className="text-gray-400 cursor-help" />
                    </div>

                    {/* Search Filters */}
                    <div className="border border-gray-300 bg-white">
                        <div className="grid grid-cols-[100px_1fr] border-b border-gray-200">
                            <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center text-xs">공급사 구분</div>
                            <div className="p-3 flex items-center gap-4">
                                <RadioGroup defaultValue="hq" className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="hq" id="type-hq" />
                                        <Label htmlFor="type-hq" className="font-normal cursor-pointer text-xs">본사</Label>
                                    </div>
                                    <div className="flex items-center gap-2" onClickCapture={() => setIsSupplierDialogOpen(true)}>
                                        <RadioGroupItem value="supplier" id="type-supplier" />
                                        <Label 
                                            htmlFor="type-supplier" 
                                            className="font-normal cursor-pointer text-xs"
                                            onClick={() => setIsSupplierDialogOpen(true)}
                                        >
                                            공급사
                                        </Label>
                                    </div>
                                </RadioGroup>
                                <Dialog open={isSupplierDialogOpen} onOpenChange={setIsSupplierDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="secondary" size="sm" className="h-6 text-xs bg-gray-400 text-white hover:bg-gray-500 border-0 rounded-sm">
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
                        <div className="grid grid-cols-[100px_1fr]">
                            <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center text-xs">검색어</div>
                            <div className="p-3">
                                <div className="flex gap-1 mb-1">
                                    <Select defaultValue="integrated">
                                        <SelectTrigger className="w-full h-7 rounded-sm border-gray-300 bg-gray-50 text-xs">
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
                                        <SelectTrigger className="w-full h-7 rounded-sm border-gray-300 bg-white text-xs">
                                            <SelectValue placeholder="검색어 전체일치" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="exact">검색어 전체일치</SelectItem>
                                            <SelectItem value="partial">검색어 부분포함</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex gap-1">
                                    <Input className="h-8 rounded-sm border-gray-300 text-xs" placeholder="검색어 전체를 정확히 입력하세요." />
                                    <Button className="h-8 w-16 bg-[#4B5563] text-white hover:bg-[#374151] rounded-none text-xs">
                                        검색
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Manager List Table */}
                    <div className="border-t border-gray-400">
                        <table className="w-full text-center text-xs">
                            <thead className="bg-[#A6A6A6] text-white font-normal">
                                <tr>
                                    <th className="py-2 w-8 border-r border-gray-400">
                                        <div className="flex justify-center">
                                            <Checkbox className="bg-white border-white data-[state=checked]:text-black w-3 h-3 rounded-sm" />
                                        </div>
                                    </th>
                                    <th className="py-2 w-10 border-r border-gray-400">번호</th>
                                    <th className="py-2 w-20 border-r border-gray-400">공급사 구분</th>
                                    <th className="py-2 border-r border-gray-400">아이디/닉네임</th>
                                    <th className="py-2 w-20 border-r border-gray-400">이름</th>
                                    <th className="py-2 w-16">개별수정</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 border-b border-gray-300">
                                <tr className="hover:bg-gray-50">
                                    <td className="py-3 border-r border-gray-200">
                                        <div className="flex justify-center">
                                            <Checkbox className="border-gray-300 w-3 h-3 rounded-sm" />
                                        </div>
                                    </td>
                                    <td className="py-3 border-r border-gray-200">2</td>
                                    <td className="py-3 border-r border-gray-200">본사</td>
                                    <td className="py-3 border-r border-gray-200">
                                        admin01 / 관리자01
                                    </td>
                                    <td className="py-3 border-r border-gray-200">관리자01</td>
                                    <td className="py-3">
                                        <Button variant="outline" size="sm" className="h-6 text-[10px] px-1 bg-white hover:bg-gray-50 border-gray-300 text-gray-600">
                                            권한보기
                                        </Button>
                                    </td>
                                </tr>
                                <tr className="bg-blue-50/30 hover:bg-blue-50/50">
                                    <td className="py-3 border-r border-gray-200">
                                        <div className="flex justify-center">
                                            <Checkbox className="border-gray-300 w-3 h-3 rounded-sm" />
                                        </div>
                                    </td>
                                    <td className="py-3 border-r border-gray-200">1</td>
                                    <td className="py-3 border-r border-gray-200">본사</td>
                                    <td className="py-3 border-r border-gray-200">
                                        <div>sosexy76</div>
                                        <div className="text-blue-500">(최고운영자)</div>
                                    </td>
                                    <td className="py-3 border-r border-gray-200">전체관리자</td>
                                    <td className="py-3">
                                        <Button variant="outline" size="sm" className="h-6 text-[10px] px-1 bg-white hover:bg-gray-50 border-gray-300 text-gray-600">
                                            권한보기
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="flex justify-center mt-4">
                        <Button variant="ghost" className="h-6 w-6 p-0 rounded-none bg-[#4B5563] text-white hover:bg-[#374151] text-xs">
                            1
                        </Button>
                    </div>
                </div>

                {/* RIGHT COLUMN: Menu Permission Settings */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-800">메뉴 권한 설정</h2>
                        <HelpCircle size={14} className="text-gray-400 cursor-help" />
                    </div>

                    <div className="bg-gray-50 p-4 border border-gray-300 text-xs">
                        <div className="flex items-center gap-8">
                            <span className="font-bold text-gray-700 w-16">권한 범위</span>
                            <RadioGroup defaultValue="selected" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="all" id="perm-all" />
                                    <Label htmlFor="perm-all" className="font-normal cursor-pointer">전체권한</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="selected" id="perm-selected" />
                                    <Label htmlFor="perm-selected" className="font-normal cursor-pointer">선택권한</Label>
                                </div>
                            </RadioGroup>
                            <Button variant="secondary" size="sm" className="h-6 text-xs bg-gray-400 text-white hover:bg-gray-500 border-0 rounded-sm">
                                기존 운영자 권한 불러오기
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Button variant="outline" className="h-7 text-xs bg-[#4B5563] text-white hover:bg-[#374151] border-0 rounded-sm px-3">
                            권한 초기화
                        </Button>
                        <div className="flex gap-1">
                            <Select defaultValue="visible_menu">
                                <SelectTrigger className="w-[120px] h-7 rounded-sm border-gray-300 bg-white text-xs">
                                    <SelectValue placeholder="노출 메뉴 선택" />
                                </SelectTrigger>
                                <SelectContent className="w-[150px] p-0">
                                    <div className="bg-[#CCCCCC] p-2 text-xs font-medium text-gray-700">노출 메뉴 선택</div>
                                    <div className="p-2 space-y-1.5 max-h-[300px] overflow-y-auto">
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="menu-all" className="w-4 h-4 rounded-none border-gray-400 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" defaultChecked />
                                            <Label htmlFor="menu-all" className="text-xs text-gray-800 font-normal">전체 메뉴</Label>
                                        </div>
                                        <div className="border-b border-dashed border-gray-300 my-1"></div>
                                        {[
                                            "관리자 기본", "기본설정", "상품", "주문/배송", "회원", "게시판", 
                                            "프로모션", "디자인", "앱서비스", "부가서비스"
                                        ].map((menu) => (
                                            <div key={menu} className="flex items-center gap-2">
                                                <Checkbox id={`menu-${menu}`} className="w-4 h-4 rounded-none border-gray-400" />
                                                <Label htmlFor={`menu-${menu}`} className="text-xs text-gray-800 font-normal">{menu}</Label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-[#D9D9D9] p-2 flex justify-center">
                                        <Button className="w-full h-8 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-sm text-xs font-normal">
                                            선택 메뉴 보기
                                        </Button>
                                    </div>
                                </SelectContent>
                            </Select>
                             <Select defaultValue="level_1">
                                <SelectTrigger className="w-[150px] h-7 rounded-sm border-gray-300 bg-white text-xs">
                                    <SelectValue placeholder="1차 메뉴 기준으로 보기" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="level_3">3차 메뉴 기준으로 보기</SelectItem>
                                    <SelectItem value="level_2">2차 메뉴 기준으로 보기</SelectItem>
                                    <SelectItem value="level_1">1차 메뉴 기준으로 보기</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-2 border border-gray-300 border-b-0 flex justify-end items-center gap-2 text-xs">
                        <span className="text-gray-600 whitespace-nowrap">선택한 메뉴에</span>
                        <Select defaultValue="none">
                            <SelectTrigger className="w-[110px] h-7 rounded-sm border-gray-300 bg-white text-xs">
                                <SelectValue placeholder="=권한 선택=" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">=권한 선택=</SelectItem>
                                <SelectItem value="no_limit">권한없음</SelectItem>
                                <SelectItem value="read">읽기</SelectItem>
                                <SelectItem value="read_write">읽기+쓰기</SelectItem>
                            </SelectContent>
                        </Select>
                         <Button className="h-7 bg-[#4B5563] text-white hover:bg-[#374151] border-0 rounded-sm text-xs px-3">
                            일괄적용
                        </Button>
                    </div>

                    <div className="border border-gray-400 border-t-0 h-[500px] overflow-y-auto relative">
                         <table className="w-full text-center text-xs">
                            <thead className="bg-[#A6A6A6] text-white font-normal sticky top-0 z-10">
                                <tr>
                                    <th className="py-2 w-10 border-r border-gray-400">
                                         <div className="flex justify-center">
                                            <Checkbox className="bg-white border-white data-[state=checked]:text-black w-3 h-3 rounded-sm" />
                                        </div>
                                    </th>
                                    <th className="py-2 border-r border-gray-400">메뉴명</th>
                                    <th className="py-2 w-32 border-r border-gray-400">권한설정</th>
                                    <th className="py-2 w-16">추가설정</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {[
                                    { name: "관리자 기본", hasView: true },
                                    { name: "기본설정", hasView: false },
                                    { name: "상품", hasView: true },
                                    { name: "주문/배송", hasView: true },
                                    { name: "회원", hasView: true },
                                    { name: "게시판", hasView: true },
                                    { name: "프로모션", hasView: false },
                                    { name: "디자인", hasView: false },
                                    { name: "앱서비스", hasView: false },
                                    { name: "부가서비스", hasView: false },
                                    { name: "마케팅", hasView: false },
                                    { name: "모바일샵", hasView: false },
                                    { name: "공급사", hasView: true },
                                    { name: "통계", hasView: true },
                                    { name: "속도개선관리", hasView: false },
                                    { name: "개발소스관리", hasView: false },
                                    { name: "마켓연동", hasView: false, isSquareIcon: true },
                                ].map((menu, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="py-2 border-r border-gray-200">
                                             <div className="flex justify-center">
                                                <Checkbox className="border-gray-300 w-3 h-3 rounded-sm" />
                                            </div>
                                        </td>
                                        <td className="py-2 border-r border-gray-200 text-left px-4 flex items-center gap-1">
                                            {menu.isSquareIcon ? (
                                                <div className="w-4 h-4 flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 bg-black rounded-none"></div>
                                                </div>
                                            ) : (
                                                <div className="w-4 h-4 bg-black text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer">
                                                    <Plus size={10} />
                                                </div>
                                            )}
                                            {menu.name}
                                        </td>
                                        <td className="py-2 border-r border-gray-200 px-2">
                                            <Select defaultValue="no">
                                                <SelectTrigger className="w-full h-7 rounded-sm border-gray-300 bg-white text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="no">권한없음</SelectItem>
                                                    <SelectItem value="read">읽기권한</SelectItem>
                                                    <SelectItem value="write">쓰기권한</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="py-2 px-1">
                                            {menu.hasView && (
                                                <Button variant="outline" size="sm" className="h-6 w-full text-[10px] px-1 bg-white hover:bg-gray-50 border-gray-300 text-gray-600">
                                                    보기
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center gap-2 pt-2 bg-gray-50 p-4 border border-gray-300">
                        <span className="text-xs font-bold text-gray-700 w-24">권한 변경사유 :</span>
                        <Input className="h-8 rounded-sm border-gray-300 bg-white flex-1 text-xs" placeholder="예) 담당업무 변경" />
                    </div>
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
