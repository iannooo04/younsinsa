"use client";

import { useState } from "react";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/ui-table";
import { CalendarIcon, Youtube, ChevronUp, ChevronDown, Plus, FileSpreadsheet, Image as ImageIcon } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function DeletedProductsManagementPage() {
    // Mock Data based on the screenshot
    const deletedProducts = [
        {
            id: 1,
            productCode: "1000000182",
            image: null,
            name: "남성 사우스크로스 히든 버튼 하이넥 티셔츠_멜란지 그레이",
            price: "438,000원",
            supplier: "니아인터내셔널",
            displayStatus: { pc: "노출함", mobile: "노출함" },
            saleStatus: { pc: "판매함", mobile: "판매함" },
            stock: "∞",
            regDate: "2025-12-15",
            delDate: "2025-12-15",
        }
    ];

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">삭제 상품 관리</h1>
            </div>

            {/* Search Section */}
            <div>
                 <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-800">삭제 상품 검색</h2>
                        <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-xs cursor-help">?</span>
                    </div>
                     <Button variant="secondary" className="h-6 text-xs bg-gray-600 text-white hover:bg-gray-700 rounded-sm px-2">
                        검색설정저장
                    </Button>
                </div>
                
                <div className="border border-gray-300 bg-white">
                    {/* Row 1: Supplier */}
                    <div className="flex items-center border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">공급사 구분</div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <RadioGroup defaultValue="all" className="flex items-center gap-6">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="all" id="supplier-all" />
                                    <Label htmlFor="supplier-all">전체</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="headquarters" id="supplier-headquarters" />
                                    <Label htmlFor="supplier-headquarters">본사</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="supplier" id="supplier-supplier" />
                                    <Label htmlFor="supplier-supplier">공급사</Label>
                                    <Button variant="secondary" className="h-7 text-xs bg-gray-400 text-white hover:bg-gray-500 rounded-sm ml-2" disabled>
                                        공급사 선택
                                    </Button>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 2: Search Term */}
                    <div className="flex items-center border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">검색어</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Select defaultValue="productName">
                                <SelectTrigger className="w-[120px] h-8 text-xs">
                                    <SelectValue placeholder="상품명" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="productName">상품명</SelectItem>
                                    <SelectItem value="productCode">상품코드</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input className="w-64 h-8" />
                        </div>
                    </div>

                     {/* Row 3: Period Search */}
                     <div className="flex items-center">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">기간검색</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Select defaultValue="delDate">
                                <SelectTrigger className="w-[100px] h-8 text-xs">
                                    <SelectValue placeholder="삭제일" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="delDate">삭제일</SelectItem>
                                    <SelectItem value="regDate">등록일</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative">
                                <Input className="w-32 h-8 pl-2 pr-8" />
                                <CalendarIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                            <span className="text-gray-500">~</span>
                            <div className="relative">
                                <Input className="w-32 h-8 pl-2 pr-8" />
                                <CalendarIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                             <div className="flex gap-0.5 ml-2">
                                {["오늘", "7일", "15일", "1개월", "3개월", "전체"].map((period) => (
                                    <Button 
                                        key={period} 
                                        variant="outline" 
                                        className={`h-8 px-3 text-xs rounded-sm ${period === "전체" ? "bg-gray-700 text-white border-gray-700 hover:bg-gray-800" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`}
                                    >
                                        {period}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-2 text-blue-500 text-xs flex items-center gap-1 cursor-pointer hover:underline">
                    상세검색 펼침 <ChevronDown size={14} />
                </div>

                <div className="flex justify-center mt-6 mb-10">
                    <Button className="w-32 h-10 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-sm">검색</Button>
                </div>
            </div>

            {/* List Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-gray-800">
                        검색 <span className="text-red-500">{deletedProducts.length}</span>개 / 전체 <span className="text-red-500">{deletedProducts.length}</span>개
                    </div>
                    <div className="flex items-center gap-2">
                        <Select defaultValue="delDesc">
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="삭제일 ↓" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="delDesc">삭제일 ↓</SelectItem>
                                <SelectItem value="delAsc">삭제일 ↑</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="10">
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="10개 보기" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10개 보기</SelectItem>
                                <SelectItem value="20">20개 보기</SelectItem>
                                <SelectItem value="50">50개 보기</SelectItem>
                            </SelectContent>
                        </Select>
                         <Button variant="secondary" className="h-8 text-xs bg-gray-600 text-white hover:bg-gray-700 rounded-sm px-3">
                            조회항목설정
                        </Button>
                    </div>
                </div>

                <div className="border-t-2 border-gray-800 border-b border-gray-300">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#A4A4A4]/20 hover:bg-[#A4A4A4]/20 text-xs">
                                <TableHead className="w-10 text-center p-0"><Checkbox className="translate-y-[2px]" /></TableHead>
                                <TableHead className="w-16 text-center font-bold text-gray-700 bg">번호</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">상품코드</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">이미지</TableHead>
                                <TableHead className="text-center font-bold text-gray-700 w-[300px]">상품명</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">판매가</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">공급사</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">노출상태</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">판매상태</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">재고</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">등록일/삭제일</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {deletedProducts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={11} className="h-40 text-center text-gray-500">
                                        검색된 정보가 없습니다.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                deletedProducts.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50 text-center text-xs text-gray-600 h-16">
                                        <TableCell className="p-0 text-center"><Checkbox className="translate-y-[2px]" /></TableCell>
                                        <TableCell className="text-gray-500 font-normal">{item.id}</TableCell>
                                        <TableCell>{item.productCode}</TableCell>
                                         <TableCell className="py-1">
                                            <div className="flex justify-center">
                                                <div className="w-10 h-10 border border-gray-200 bg-white flex items-center justify-center">
                                                    <ImageIcon className="text-gray-300 w-5 h-5"/>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-left">
                                             <div className="text-blue-500 hover:underline cursor-pointer font-medium truncate w-[280px]">
                                                {item.name}
                                            </div>
                                        </TableCell>
                                       
                                        <TableCell className="font-bold text-gray-800">{item.price}</TableCell>
                                        <TableCell>{item.supplier}</TableCell>
                                        <TableCell>
                                             <div className="space-y-0.5">
                                                <div>PC | {item.displayStatus.pc}</div>
                                                <div>모바일 | {item.displayStatus.mobile}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-0.5">
                                                <div>PC | {item.saleStatus.pc}</div>
                                                <div>모바일 | {item.saleStatus.mobile}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{item.stock}</TableCell>
                                        <TableCell>
                                            <div className="space-y-0.5">
                                                <div>{item.regDate} /</div>
                                                <div>{item.delDate}</div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="bg-gray-100 p-3 flex justify-between items-center mt-0 border border-t-0 border-gray-300">
                     <div className="flex items-center gap-2">
                        <Button variant="outline" className="h-8 px-3 text-xs border-gray-300 text-gray-700 font-medium rounded-sm bg-white">상품복구</Button>
                        <Button variant="outline" className="h-8 px-3 text-xs border-gray-300 text-gray-700 font-medium rounded-sm bg-white">완전삭제</Button>
                    </div>
                     <Button variant="outline" className="h-8 px-3 text-xs border-gray-300 text-gray-700 font-medium rounded-sm flex items-center gap-1 bg-white">
                        <span className="text-green-600"><FileSpreadsheet size={14} /></span>
                        엑셀다운로드
                    </Button>
                </div>

                {/* Pagination */}
                 <div className="flex justify-center gap-1 mt-6">
                    <Button variant="default" className="h-8 w-8 p-0 bg-gray-600 text-white font-bold rounded-sm border-gray-600 hover:bg-gray-700">1</Button>
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
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100">
                         <ChevronUp size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none transform rotate-180">
                         <ChevronUp size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
