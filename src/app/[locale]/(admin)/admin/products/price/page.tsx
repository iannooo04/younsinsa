"use client";

import React from "react";
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
import { CalendarIcon, Youtube, ChevronUp, ChevronDown, Check, Book } from "lucide-react";
import Image from "next/image";

export default function ProductPriceManagementPage() {
    // Mock Data based on the screenshot
    const products = Array.from({ length: 10 }).map((_, i) => ({
        id: 290 - i,
        productCode: `1000000${290 - i}`,
        image: null, // Placeholder
        name: i % 2 === 0 ? "여성 엠보 로고 모크넥 티셔츠" : "[26SS] 여성 깅엄 체크 메쉬 레이어드 베이스레이어",
        supplier: "니아인터내셔널",
        displayStatus: "노출함",
        saleStatus: "판매함",
        retailPrice: 0,
        purchasePrice: 0,
    }));

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">상품 가격 관리</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9">저장</Button>
            </div>

            {/* Search Section */}
            <div>
                 <div className="flex items-center justify-between mb-2">
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
                            <Select defaultValue="regDate">
                                <SelectTrigger className="w-[100px] h-8 text-xs">
                                    <SelectValue placeholder="등록일" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="regDate">등록일</SelectItem>
                                    <SelectItem value="modDate">수정일</SelectItem>
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
                                <SelectItem value="20">20개 보기</SelectItem>
                                <SelectItem value="50">50개 보기</SelectItem>
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
                                <TableHead className="text-center font-bold w-[300px]">상품명</TableHead>
                                <TableHead className="text-center font-bold">공급사</TableHead>
                                <TableHead className="text-center font-bold">노출상태</TableHead>
                                <TableHead className="text-center font-bold">판매상태</TableHead>
                                <TableHead className="text-center font-bold w-40">정가</TableHead>
                                <TableHead className="text-center font-bold w-40">매입가</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Bulk Edit Row */}
                            <TableRow className="bg-white hover:bg-white h-12">
                                <TableCell colSpan={8} className="text-left p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center text-red-500 font-bold text-xs gap-1">
                                            <Check size={14} strokeWidth={3} /> 선택한 상품
                                        </div>
                                        <Button className="h-7 bg-gray-600 hover:bg-gray-700 text-white text-xs font-bold rounded-sm px-3 ml-2">가격 일괄적용</Button>
                                    </div>
                                </TableCell>
                                <TableCell className="p-2">
                                    <div className="flex items-center gap-1 justify-center">
                                       <Input className="h-8 w-24 text-right" /> <span className="text-xs">원</span>
                                    </div>
                                </TableCell>
                                <TableCell className="p-2">
                                    <div className="flex items-center gap-1 justify-center">
                                        <Input className="h-8 w-24 text-right" /> 
                                    </div>
                                </TableCell>
                            </TableRow>

                            {/* Product List */}
                            {products.map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-50 text-center text-xs text-gray-600 h-16">
                                    <TableCell className="p-0 text-center"><Checkbox className="translate-y-[2px]" /></TableCell>
                                    <TableCell className="text-gray-500 font-normal">{item.id}</TableCell>
                                    <TableCell>{item.productCode}</TableCell>
                                    <TableCell className="py-1">
                                        <div className="flex justify-center">
                                            <div className="relative w-10 h-10 bg-gray-100"><Image src="/placeholder-image.png" alt="상품" fill className="object-cover" /></div> 
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-left pl-4 font-normal text-gray-800">{item.name}</TableCell>
                                    <TableCell>{item.supplier}</TableCell>
                                    <TableCell>{item.displayStatus}</TableCell>
                                    <TableCell>{item.saleStatus}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 justify-center">
                                            <Input className="h-8 w-24 text-right" defaultValue={item.retailPrice} /> <span className="text-xs">원</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 justify-center">
                                            <Input className="h-8 w-24 text-right" defaultValue={item.purchasePrice} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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

             {/* Price Condition Settings */}
             <div className="mt-10 border border-t-2 border-gray-300 p-6 bg-gray-50">
                 <div className="flex">
                    <div className="w-40 font-bold text-gray-700 pt-2">가격조건설정</div>
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2">
                             <Checkbox id="update-all" />
                             <Label htmlFor="update-all" className="text-sm text-gray-600">검색된 상품 전체(290개 상품)를 수정합니다.</Label>
                        </div>
                        <div className="text-red-500 text-xs font-bold flex items-center gap-1">
                             ! 상품수가 많은 경우 비권장합니다. 가능하면 한 페이지씩 선택하여 수정하세요.
                        </div>
                        <div className="flex items-center flex-wrap gap-2 text-sm text-gray-700 bg-white p-3 border border-gray-300 rounded-sm">
                             <Select defaultValue="sellPrice">
                                <SelectTrigger className="w-24 h-8 text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sellPrice">판매가</SelectItem>
                                    <SelectItem value="retailPrice">정가</SelectItem>
                                </SelectContent>
                            </Select>
                            <span>에서</span>
                            <Input className="w-24 h-8 text-right" />
                            <Select defaultValue="won">
                                <SelectTrigger className="w-16 h-8 text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="won">원</SelectItem>
                                    <SelectItem value="percent">%</SelectItem>
                                </SelectContent>
                            </Select>
                            <span>을</span>
                            <Select defaultValue="discount">
                                <SelectTrigger className="w-20 h-8 text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="discount">할인</SelectItem>
                                    <SelectItem value="markup">할증</SelectItem>
                                </SelectContent>
                            </Select>
                            <span>된 가격으로</span>
                            <Select defaultValue="sellPrice">
                                <SelectTrigger className="w-24 h-8 text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sellPrice">판매가</SelectItem>
                                    <SelectItem value="retailPrice">정가</SelectItem>
                                </SelectContent>
                            </Select>
                            <span>을 일괄적으로 수정합니다. (절사기준 : 0.1원 단위로 버림)</span>
                        </div>
                    </div>
                </div>
             </div>

            {/* Bottom Info */}
            <div className="pt-8 border-t border-gray-300 space-y-6 mt-12">
                <div className="flex items-center gap-2">
                    <span className="text-blue-500"><Book size={16} /></span>
                    <h3 className="font-bold text-blue-500">안내</h3>
                </div>

                <div className="space-y-4 text-xs text-gray-500 leading-relaxed">
                    <div className="space-y-1">
                         <h4 className="text-sm font-bold text-gray-700 mb-1">[상품 정보] 선택상품 일괄적용은 무엇인가요?</h4>
                         <p>· 상품리스트 첫번째 줄에 "정가, 매입가, 판매가"를 입력 후 [선택상품 일괄적용] 버튼 클릭 시 선택된 상품에 일괄 적용됩니다.</p>
                         <p>· 일괄적용은 "정가, 매입가, 판매가" 중 수정 정보가 입력된 항목만 적용됩니다.</p>
                         <p>· 수정 정보가 입력되지 않은 항목은 기존의 가격 정보가 유지됩니다.</p>
                         <p>· 상품 리스트내 선택되지 않은 상품에는 적용되지 않습니다.</p>
                         <p>· 일괄 적용 후 [저장] 버튼을 클릭해야 변경된 정보로 수정됩니다.</p>
                    </div>
                     <div className="space-y-1">
                         <h4 className="text-sm font-bold text-gray-700 mb-1">[상품 정보] 가격정보를 상품별로 다르게 수정할 수 있나요?</h4>
                         <p>· 상품 리스트 내 상품별 "정가, 매입가, 판매가"정보를 운영자가 직접 입력하여 수정할 수 있습니다.</p>
                         <p>· "정가, 매입가, 판매가" 중 일부 항목만 부분적으로 수정 가능합니다.</p>
                         <p>· 수정 정보가 입력되지 않은 항목은 기존의 가격 정보가 유지됩니다.</p>
                         <p>· 상품 리스트내 선택되지 않은 상품은 수정되지 않습니다.</p>
                         <p>· 가격 정보 입력 후 [저장] 버튼을 클릭해야 변경된 정보로 수정됩니다.</p>
                    </div>
                     <div className="space-y-1">
                         <h4 className="text-sm font-bold text-gray-700 mb-1">[상품 정보] 가격조건설정은 무엇인가요?</h4>
                         <p>· 검색된 전체 또는 일부 상품의 "정가, 매입가, 판매가"를 일괄 수정 가능합니다.</p>
                         <p className="text-red-500 font-bold mt-2">· 검색된 상품수가 많은 경우 전체 상품의 가격을 일괄로 수정하는 것은 권장하지 않습니다.</p>
                         <p className="text-red-500 font-bold mt-2">가능하면 한 페이지씩 선택하여 수정하시는 것을 권장합니다.</p>
                         <p className="text-red-500 font-bold mt-2">· 수정 후에는 이전 상태로 복원이 되지 않으므로 설정 시 유의하시기 바랍니다.</p>
                    </div>
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
