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
import { CalendarIcon, Youtube, ChevronUp, ChevronDown, Check, Book } from "lucide-react";

export default function ProductStockDisplayManagementPage() {
    // Mock Data based on the screenshot
    const products = Array.from({ length: 10 }).map((_, i) => ({
        id: 969 - i,
        productCode: i === 0 ? "1000000290" : i === 4 ? "1000000289" : i === 8 ? "1000000288" : "",
        image: i === 0 ? "/placeholder-1.jpg" : i === 4 ? "/placeholder-2.jpg" : i === 8 ? "/placeholder-3.jpg" : null, 
        name: i === 0 || i === 4 ? "여성 엠보 로고 모크넥 티셔츠" : i === 8 ? "[26SS] 여성 깅엄 체크 메쉬 레이어드 베이스레이어" : "",
        supplier: "니아인터내셔널",
        displayStatusPC: "노출함",
        displayStatusMobile: "노출함",
        saleStatusPC: "판매함",
        saleStatusMobile: "판매함",
    })).filter(p => p.productCode !== ""); // Only keep rows with data for visual matching

    // Filling up to 10 rows with empty logic if needed, but for visual matching I'll just map the visible ones or mock 10 items.
    // The screenshot shows numbers 969 to 960. 
    const mockList = [
        { id: 969, code: "1000000290", img: true, name: "여성 엠보 로고 모크넥 티셔츠" },
        { id: 968, code: "", img: false, name: "" },
        { id: 967, code: "", img: false, name: "" },
        { id: 966, code: "", img: false, name: "" },
        { id: 965, code: "1000000289", img: true, name: "여성 엠보 로고 모크넥 티셔츠" },
        { id: 964, code: "", img: false, name: "" },
        { id: 963, code: "", img: false, name: "" },
        { id: 962, code: "", img: false, name: "" },
        { id: 961, code: "1000000288", img: true, name: "[26SS] 여성 깅엄 체크 메쉬 레이어드 베이스레이어" },
        { id: 960, code: "", img: false, name: "" },
    ];

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">상품 품절/노출/재고 관리</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm">저장</Button>
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
                        검색 <span className="text-red-500">969</span>개 / 전체 <span className="text-red-500">969</span>개
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
                        <Button variant="secondary" className="h-8 text-xs bg-gray-600 text-white hover:bg-gray-700 rounded-sm px-3">
                            조회항목설정
                        </Button>
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
                                <TableHead className="text-center font-bold">노출상태(PC)</TableHead>
                                <TableHead className="text-center font-bold">노출상태(모바일)</TableHead>
                                <TableHead className="text-center font-bold">판매상태(PC)</TableHead>
                                <TableHead className="text-center font-bold">판매상태(모바일)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Bulk Edit Row */}
                            <TableRow className="bg-white hover:bg-white h-12">
                                <TableCell colSpan={6} className="text-left p-4">
                                    <Button className="h-7 bg-gray-600 hover:bg-gray-700 text-white text-xs font-bold rounded-sm px-3">선택상품 일괄적용</Button>
                                </TableCell>
                                <TableCell className="p-2">
                                     <Select>
                                        <SelectTrigger className="h-8 text-xs w-full"><SelectValue placeholder="선택" /></SelectTrigger>
                                        <SelectContent><SelectItem value="show">노출함</SelectItem><SelectItem value="hide">노출안함</SelectItem></SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="p-2">
                                     <Select>
                                        <SelectTrigger className="h-8 text-xs w-full"><SelectValue placeholder="선택" /></SelectTrigger>
                                        <SelectContent><SelectItem value="show">노출함</SelectItem><SelectItem value="hide">노출안함</SelectItem></SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="p-2">
                                     <Select>
                                        <SelectTrigger className="h-8 text-xs w-full"><SelectValue placeholder="선택" /></SelectTrigger>
                                        <SelectContent><SelectItem value="sell">판매함</SelectItem><SelectItem value="stop">판매안함</SelectItem></SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="p-2">
                                     <Select>
                                        <SelectTrigger className="h-8 text-xs w-full"><SelectValue placeholder="선택" /></SelectTrigger>
                                        <SelectContent><SelectItem value="sell">판매함</SelectItem><SelectItem value="stop">판매안함</SelectItem></SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>

                            {/* Product List */}
                            {mockList.map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-50 text-center text-xs text-gray-600 h-16 border-b border-gray-200">
                                    <TableCell className="p-0 text-center"><Checkbox className="translate-y-[2px]" /></TableCell>
                                    <TableCell className="text-gray-500 font-normal">{item.id}</TableCell>
                                    <TableCell>{item.code}</TableCell>
                                    <TableCell className="py-1">
                                        <div className="flex justify-center">
                                            {item.img && <img src={`/placeholder${item.id}.jpg`} alt="상품" className="w-10 h-10 bg-gray-100 object-cover" />}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-left pl-4 font-normal text-gray-800">{item.name}</TableCell>
                                    <TableCell>{item.code ? "니아인터내셔널" : ""}</TableCell>
                                    <TableCell className="p-2">
                                       {item.code && <Select defaultValue="show">
                                            <SelectTrigger className="h-8 text-xs w-full"><SelectValue /></SelectTrigger>
                                            <SelectContent><SelectItem value="show">노출함</SelectItem><SelectItem value="hide">노출안함</SelectItem></SelectContent>
                                        </Select>}
                                    </TableCell>
                                    <TableCell className="p-2">
                                        {item.code && <Select defaultValue="show">
                                            <SelectTrigger className="h-8 text-xs w-full"><SelectValue /></SelectTrigger>
                                            <SelectContent><SelectItem value="show">노출함</SelectItem><SelectItem value="hide">노출안함</SelectItem></SelectContent>
                                        </Select>}
                                    </TableCell>
                                    <TableCell className="p-2">
                                        {item.code && <Select defaultValue="sell">
                                            <SelectTrigger className="h-8 text-xs w-full"><SelectValue /></SelectTrigger>
                                            <SelectContent><SelectItem value="sell">판매함</SelectItem><SelectItem value="stop">판매안함</SelectItem></SelectContent>
                                        </Select>}
                                    </TableCell>
                                    <TableCell className="p-2">
                                        {item.code && <Select defaultValue="sell">
                                            <SelectTrigger className="h-8 text-xs w-full"><SelectValue /></SelectTrigger>
                                            <SelectContent><SelectItem value="sell">판매함</SelectItem><SelectItem value="stop">판매안함</SelectItem></SelectContent>
                                        </Select>}
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

             {/* Condition Settings */}
             <div className="mt-10 border border-t-2 border-gray-300 p-6 bg-gray-50">
                 <div className="flex">
                    <div className="w-24 font-bold text-gray-700 pt-2 text-xs">조건설정</div>
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2">
                             <Checkbox id="update-all" />
                             <Label htmlFor="update-all" className="text-sm text-gray-600">검색된 상품 전체(969개 상품)를 수정합니다.</Label>
                        </div>
                        <div className="text-red-500 text-xs font-bold flex items-center gap-1">
                             <span className="bg-red-500 text-white text-[10px] px-1 rounded-sm">!</span> 상품수가 많은 경우 비권장합니다. 가능하면 한 페이지씩 선택하여 수정하세요.
                        </div>
                        
                        {/* Grid for settings */}
                        <div className="grid grid-cols-[1fr_1fr_0.8fr_1fr_1fr_1fr_1.5fr] gap-4">
                            {/* Headers */}
                            <div className="flex">
                                <span className="bg-[#4a58b8] text-white text-xs w-5 h-5 flex items-center justify-center rounded-sm mr-1">1</span>
                                <div className="text-center w-full">
                                    <div className="text-xs font-bold text-gray-700 mb-1">노출상태</div>
                                    <div className="flex gap-1">
                                        <div className="flex-1 text-center bg-white border border-gray-200 py-1 text-xs text-gray-600">PC</div>
                                        <div className="flex-1 text-center bg-white border border-gray-200 py-1 text-xs text-gray-600">모바일</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="bg-[#4a58b8] text-white text-xs w-5 h-5 flex items-center justify-center rounded-sm mr-1">2</span>
                                <div className="text-center w-full">
                                    <div className="text-xs font-bold text-gray-700 mb-1">판매상태</div>
                                    <div className="flex gap-1">
                                        <div className="flex-1 text-center bg-white border border-gray-200 py-1 text-xs text-gray-600">PC</div>
                                        <div className="flex-1 text-center bg-white border border-gray-200 py-1 text-xs text-gray-600">모바일</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <span className="bg-[#4a58b8] text-white text-xs w-5 h-5 flex items-center justify-center rounded-sm mr-1">3</span>
                                    <span className="text-xs font-bold text-gray-700">품절상태</span>
                                </div>
                                <div className="h-[26px]"></div> {/* Spacer to align with sub-headers if needed, or just layout */}
                            </div>
                             <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <span className="bg-[#4a58b8] text-white text-xs w-5 h-5 flex items-center justify-center rounded-sm mr-1">4</span>
                                    <span className="text-xs font-bold text-gray-700">옵션 노출상태</span>
                                </div>
                            </div>
                             <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <span className="bg-[#4a58b8] text-white text-xs w-5 h-5 flex items-center justify-center rounded-sm mr-1">5</span>
                                    <span className="text-xs font-bold text-gray-700">옵션 품절상태</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <span className="text-xs font-bold text-gray-700 ml-6">옵션 배송상태</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center mb-1">
                                    <span className="bg-[#4a58b8] text-white text-xs w-5 h-5 flex items-center justify-center rounded-sm mr-1">6</span>
                                    <span className="text-xs font-bold text-gray-700">재고</span>
                                </div>
                            </div>
                        </div>

                        {/* Controls Row */}
                        <div className="grid grid-cols-[1fr_1fr_0.8fr_1fr_1fr_1fr_1.5fr] gap-4 pt-1">
                             <div className="flex gap-1">
                                <Select><SelectTrigger className="h-8 text-xs flex-1"><SelectValue placeholder="선택" /></SelectTrigger><SelectContent><SelectItem value="a">A</SelectItem></SelectContent></Select>
                                <Select><SelectTrigger className="h-8 text-xs flex-1"><SelectValue placeholder="선택" /></SelectTrigger><SelectContent><SelectItem value="a">A</SelectItem></SelectContent></Select>
                             </div>
                             <div className="flex gap-1">
                                <Select><SelectTrigger className="h-8 text-xs flex-1"><SelectValue placeholder="선택" /></SelectTrigger><SelectContent><SelectItem value="a">A</SelectItem></SelectContent></Select>
                                <Select><SelectTrigger className="h-8 text-xs flex-1"><SelectValue placeholder="선택" /></SelectTrigger><SelectContent><SelectItem value="a">A</SelectItem></SelectContent></Select>
                             </div>
                             <div>
                                 <Select><SelectTrigger className="h-8 text-xs w-full"><SelectValue placeholder="선택" /></SelectTrigger><SelectContent><SelectItem value="a">A</SelectItem></SelectContent></Select>
                             </div>
                             <div>
                                 <Select><SelectTrigger className="h-8 text-xs w-full"><SelectValue placeholder="선택" /></SelectTrigger><SelectContent><SelectItem value="a">A</SelectItem></SelectContent></Select>
                             </div>
                             <div>
                                 <Select><SelectTrigger className="h-8 text-xs w-full"><SelectValue placeholder="선택" /></SelectTrigger><SelectContent><SelectItem value="a">A</SelectItem></SelectContent></Select>
                             </div>
                             <div>
                                 <Select><SelectTrigger className="h-8 text-xs w-full"><SelectValue placeholder="선택" /></SelectTrigger><SelectContent><SelectItem value="a">A</SelectItem></SelectContent></Select>
                             </div>
                             <div>
                                 <div className="flex gap-1 mb-1">
                                    <Select><SelectTrigger className="h-8 text-xs w-20"><SelectValue placeholder="선택" /></SelectTrigger><SelectContent><SelectItem value="add">추가</SelectItem></SelectContent></Select>
                                    <Input className="h-8 flex-1" />
                                 </div>
                                 <div className="flex items-center gap-1">
                                     <Checkbox id="unlimited" className="w-3 h-3" />
                                     <Label htmlFor="unlimited" className="text-xs text-gray-600">무한정 판매</Label>
                                 </div>
                             </div>
                        </div>

                         <div className="space-y-1 text-[11px] text-gray-500 mt-2 border-t border-gray-200 pt-3">
                             <div className="flex gap-1 items-start">
                                 <span className="font-bold text-gray-600 px-1 border border-gray-400 rounded-[2px] text-[10px] h-4 flex items-center justify-center">!</span>
                                 <div className="space-y-0.5">
                                    <p>재고는 "추가/차감/변경" 중 선택하여 수정 가능합니다.</p>
                                    <p>"추가/차감"을 선택하고 저장하면, 현재의 상품 재고에 입력한 수량 만큼 "추가/차감"되고, "변경"을 선택하면 입력한 수량과 재고 수량이 동일하게 변경됩니다.</p>
                                    <p>"무한정 판매"를 체크한 경우 입력한 재고 수량과 관계없이 무한정 판매 상품으로 변경됩니다.</p>
                                    <p>수정 중 상품 주문으로 재고 수량에 변동이 생기면, 현재 재고의 수량과 관계없이 변동된 수량에서 "추가/차감"됩니다.</p>
                                 </div>
                             </div>
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
                         <p>· 노출상태, 판매상태, 품절상태, 옵션 노출상태, 옵션 판매상태, 재고"를 입력 후 [선택상품 일괄적용] 버튼 클릭 시 선택된 상품에 일괄 적용됩니다.</p>
                         <p>· 일괄적용은 "노출상태, 판매상태, 품절상태, 옵션 노출상태, 옵션 판매상태, 재고" 중 수정 정보가 입력된 항목만 적용됩니다.</p>
                         <p>· 수정 정보가 입력되지 않은 항목은 기존의 정보가 유지됩니다.</p>
                         <p>· 상품 리스트내 선택되지 않은 상품에는 적용되지 않습니다.</p>
                         <p>· 일괄 적용 후 [저장] 버튼을 클릭해야 변경된 정보로 수정됩니다.</p>
                         <p className="text-red-500">· 상품의 "노출/판매/품절상태"는 해당 상품에 등록된 여러 개의 옵션 중 하나만 선택되어도 적용됩니다.</p>
                    </div>
                     <div className="space-y-1">
                         <h4 className="text-sm font-bold text-gray-700 mb-1">[상품 정보] 상품별로 다른 조건을 설정하여 수정할 수 있나요?</h4>
                         <p>· 상품 리스트 내 상품별 "노출상태, 판매상태, 품절상태, 옵션 노출상태, 옵션 판매상태, 재고"정보를 운영자가 직접 설정하여 수정할 수 있습니다.</p>
                         <p>· "노출상태, 판매상태, 품절상태, 옵션 노출상태, 옵션 판매상태, 재고" 중 일부 항목만 부분적으로 수정 가능합니다.</p>
                         <p>· 수정 정보가 입력되지 않은 항목은 기존의 가격 정보가 유지됩니다.</p>
                         <p>· 상품 리스트내 선택되지 않은 상품은 수정되지 않습니다.</p>
                         <p>· 정보 입력 후 [저장] 버튼을 클릭해야 변경된 정보로 수정됩니다.</p>
                    </div>
                     <div className="space-y-1">
                         <h4 className="text-sm font-bold text-gray-700 mb-1">[상품 정보] 조건설정은 무엇인가요?</h4>
                         <p>· 검색된 전체 또는 일부 상품의 "노출상태, 판매상태, 품절상태, 옵션 노출상태, 옵션 판매상태, 재고"를 일괄 수정 가능합니다.</p>
                         <p className="text-red-500 mt-2">- 검색된 상품수가 많은 경우 전체 상품의 정보를 일괄로 수정하는 것은 권장하지 않습니다.</p>
                         <p className="text-red-500 mt-2">가능하면 한 페이지씩 선택하여 수정하시는 것을 권장합니다.</p>
                         <p className="text-red-500 mt-2">- 수정 후에는 이전 상태로 복원이 되지 않으므로 설정 시 유의하시기 바랍니다.</p>
                    </div>
                     <div className="space-y-1 mt-4">
                        <p>① 노출상태 : 상품의 쇼핑몰 화면 노출여부를 설정할 수 있습니다.</p>
                        <p>② 판매상태 : 상품의 판매여부를 설정할 수 있습니다.</p>
                        <p>③ 품절상태 : 상품의 품절여부를 설정할 수 있습니다.</p>
                        <p>④ 옵션 노출상태 : 옵션의 쇼핑몰 화면 노출여부를 설정할 수 있습니다.</p>
                        <p>⑤ 옵션 품절상태 : 옵션의 품절여부를 설정할 수 있습니다.</p>
                        <p>⑥ 재고 : 옵션의 재고 수량을 수정할 수 있습니다.</p>
                        <p className="text-red-500 pl-4">- 수정 중 상품 주문으로 재고 수량에 변동이 생기면, 현재 재고의 수량과 관계없이 변동된 수량에서 "추가/차감"됩니다.</p>
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
