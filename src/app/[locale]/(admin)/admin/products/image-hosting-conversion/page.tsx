"use client";

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
import { CalendarIcon, Youtube, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function ImageHostingConversionPage() {
    // Mock Data
    const products = Array.from({ length: 10 }).map((_, i) => ({
        id: 290 - i,
        productCode: `1000000${290 - i}`,
        image: i % 2 === 0 ? "/placeholder-1.jpg" : null,
        name: i % 2 === 0 ? "여성 엠보 로고 모크넥 티셔츠" : "[26SS] 여성 깅엄 체크 메쉬 레이어드 베이스레이어",
        conversionCount: 0,
        supplier: "니아인터내셔널",
        displayStatusPC: "노출함",
        displayStatusMobile: "노출함",
        saleStatusPC: "판매함",
        saleStatusMobile: "판매함",
        stock: "∞",
        price: i % 2 === 0 ? "278,000원" : "338,000원",
        regDate: "2026-01-07"
    }));

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">이미지호스팅 일괄전환</h1>
            </div>

            {/* Info Box */}
            <div className="border border-gray-300 p-6 bg-white">
                <h2 className="text-sm font-bold text-gray-800 mb-2">이미지호스팅 일괄전환이란?</h2>
                <div className="text-xs text-gray-600 space-y-1 mb-4 leading-relaxed">
                    <p>오픈마켓에 입점한 운영자는 반드시 이미지호스팅을 사용해야 합니다.</p>
                    <p>내 상점에 등록한 상품수가 많을 경우 하나하나 이미지호스팅으로 수정하는 시간이 많이 걸리게 됩니다.</p>
                    <p>아래 기능은 내 쇼핑몰에 올려진 상품설명이미지를 이미지호스팅으로 빠르게 전환해주는 기능입니다.</p>
                    <p>이 기능을 사용하려면 이미지호스팅이 신청되어 있어야 합니다. <Button variant="secondary" className="h-6 text-xs bg-[#A4A4A4] text-white hover:bg-[#909090] rounded-sm px-2 ml-1" disabled>서비스 자세히 보기</Button></p>
                </div>
            </div>

            {/* Search Section */}
            <div>
                 <div className="flex items-center justify-between mb-2 mt-8">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-800">상품 검색</h2>
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
                                </SelectContent>
                            </Select>
                            <Input className="w-64 h-8" />
                        </div>
                    </div>

                     {/* Row 3: Period Search */}
                     <div className="flex items-center border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">기간검색</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Select defaultValue="regDate">
                                <SelectTrigger className="w-[100px] h-8 text-xs">
                                    <SelectValue placeholder="등록일" />
                                </SelectTrigger>
                                <SelectContent>
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

                    {/* Row 4: Category */}
                    <div className="flex items-center">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">카테고리</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Select><SelectTrigger className="w-32 h-8 text-xs"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem></SelectContent></Select>
                            <Select><SelectTrigger className="w-32 h-8 text-xs"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem></SelectContent></Select>
                            <Select><SelectTrigger className="w-32 h-8 text-xs"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem></SelectContent></Select>
                            <Select><SelectTrigger className="w-32 h-8 text-xs"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem></SelectContent></Select>
                            <div className="flex items-center gap-2 ml-2">
                                <Checkbox id="no-category" />
                                <Label htmlFor="no-category" className="text-gray-600">카테고리 미지정 상품</Label>
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
                        검색 <span className="text-red-500">290</span>개 / 전체 <span className="text-red-500">290</span>개
                    </div>
                    <div className="flex items-center gap-2">
                        <Select defaultValue="regDesc">
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="등록일 ↓" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="regDesc">등록일 ↓</SelectItem>
                                <SelectItem value="regAsc">등록일 ↑</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="10">
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="10개 보기" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10개 보기</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="border-t-2 border-gray-800 border-b border-gray-300">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#A4A4A4]/20 hover:bg-[#A4A4A4]/20 text-xs text-center font-bold text-gray-700 h-10">
                                <TableHead className="w-10 text-center p-0"><Checkbox className="translate-y-[2px]" /></TableHead>
                                <TableHead className="w-16 text-center text-white bg font-bold">번호</TableHead>
                                <TableHead className="text-center font-bold">상품코드</TableHead>
                                <TableHead className="text-center font-bold">이미지</TableHead>
                                <TableHead className="text-center font-bold w-[250px]">상품명</TableHead>
                                <TableHead className="text-center font-bold w-24 leading-tight bg-[#A4A4A4]/40">전환이 필요한<br/>이미지갯수</TableHead>
                                <TableHead className="text-center font-bold">공급사</TableHead>
                                <TableHead className="text-center font-bold bg-[#A4A4A4]/40">노출상태<div className="flex justify-center gap-4 font-normal text-[11px] mt-1"><span>PC</span><span>모바일</span></div></TableHead>
                                <TableHead className="text-center font-bold bg-[#A4A4A4]/40">판매상태<div className="flex justify-center gap-4 font-normal text-[11px] mt-1"><span>PC</span><span>모바일</span></div></TableHead>
                                <TableHead className="text-center font-bold">재고</TableHead>
                                <TableHead className="text-center font-bold">판매가</TableHead>
                                <TableHead className="text-center font-bold">등록일/수정일</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-50 text-center text-xs text-gray-600 h-16 border-b border-gray-200">
                                    <TableCell className="p-0 text-center"><Checkbox className="translate-y-[2px]" /></TableCell>
                                    <TableCell className="text-gray-500 font-normal">{item.id}</TableCell>
                                    <TableCell>{item.productCode}</TableCell>
                                    <TableCell className="py-1">
                                        <div className="flex justify-center">
                                            <div className="relative w-10 h-10 bg-gray-100"><Image src="/placeholder-image.png" alt="상품" fill className="object-cover" /></div> 
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-left pl-4 font-normal text-gray-800">{item.name}</TableCell>
                                    <TableCell className="text-blue-500 text-lg font-bold">{item.conversionCount}</TableCell>
                                    <TableCell>{item.supplier}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-center gap-4"><span>{item.displayStatusPC}</span><span>{item.displayStatusMobile}</span></div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center gap-4"><span>{item.saleStatusPC}</span><span>{item.saleStatusMobile}</span></div>
                                    </TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>
                                        <div className="text-[11px] space-y-0.5">
                                            <p>{item.regDate}</p>
                                            <p>{item.regDate}</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Bottom Actions */}
                <div className="py-4 border-b border-gray-300">
                     <Button variant="outline" className="h-8 bg-white border-gray-300 text-gray-600 hover:bg-gray-50 text-xs">전환하기</Button>
                </div>
                
                <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-2">
                     <span className="font-bold text-gray-600 px-1 border border-gray-400 rounded-[2px] text-[10px] h-4 flex items-center justify-center">!</span>
                     한 번에 많은 이미지를 일괄전환 할 경우 오류가 발생할 수 있으니 이미지 개수를 나누어 전환하시는 것을 권장합니다.
                </div>

                 {/* Pagination */}
                 <div className="flex justify-center gap-1 mt-6">
                    <Button variant="default" className="h-8 w-8 p-0 bg-gray-600 text-white font-bold rounded-sm border-gray-600 hover:bg-gray-700">1</Button>
                    {[2,3,4,5,6,7,8,9,10].map(p => (
                         <Button key={p} variant="outline" className="h-8 w-8 p-0 text-gray-500 border-gray-300 rounded-sm bg-white hover:bg-gray-50">{p}</Button>
                    ))}
                     <Button variant="outline" className="h-8 px-2 text-xs text-gray-500 border-gray-300 rounded-sm bg-white hover:bg-gray-50">{"> 다음"}</Button>
                     <Button variant="outline" className="h-8 px-2 text-xs text-gray-500 border-gray-300 rounded-sm bg-white hover:bg-gray-50">{">> 맨뒤"}</Button>
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
