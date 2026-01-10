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
import { Youtube, ChevronUp } from "lucide-react";

export default function ProductRestockNotificationPage() {
    // Mock Data - Empty state as per screenshot
    const [restockRequests, setRestockRequests] = useState<any[]>([]);

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">상품 재입고 알림 신청 관리</h1>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 h-9 px-4 font-medium">
                    재입고 알림 상품 관리
                </Button>
            </div>

            {/* Search Section */}
            <div>
                 <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-lg font-bold text-gray-800">신청 내역 검색</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-xs cursor-help">?</span>
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
                            <Select defaultValue="integrated">
                                <SelectTrigger className="w-[120px] h-8 text-xs">
                                    <SelectValue placeholder="=통합검색=" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="integrated">=통합검색=</SelectItem>
                                    <SelectItem value="productName">상품명</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input className="w-64 h-8" />
                        </div>
                    </div>

                     {/* Row 3: Stock */}
                     <div className="flex items-center">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">재고</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                             <Input className="w-32 h-8" /> 
                             <span className="text-gray-600 text-xs">개 이상 ~</span>
                             <Input className="w-32 h-8" />
                             <span className="text-gray-600 text-xs">개 이하</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-6 mb-10">
                    <Button className="w-32 h-10 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-sm">검색</Button>
                </div>
            </div>

            {/* List Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-gray-800">
                        검색결과 <span className="text-red-500">{restockRequests.length}</span>개 / 전체 <span className="text-red-500">{restockRequests.length}</span>개
                    </div>
                    <div className="flex items-center gap-2">
                        <Select defaultValue="productNameAsc">
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="상품명 ↑" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="productNameAsc">상품명 ↑</SelectItem>
                                <SelectItem value="productNameDesc">상품명 ↓</SelectItem>
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
                            <TableRow className="bg-[#A4A4A4]/20 hover:bg-[#A4A4A4]/20">
                                <TableHead className="w-10 text-center p-0"><Checkbox className="translate-y-[2px]" /></TableHead>
                                <TableHead className="w-16 text-center font-bold text-gray-700">번호</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">공급사</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">상품명</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">옵션</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">재고</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">신청자</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">발송/미발송</TableHead>
                                <TableHead className="w-20 text-center font-bold text-gray-700">상세보기</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {restockRequests.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="h-40 text-center text-gray-500">
                                        검색된 정보가 없습니다.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                restockRequests.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50 text-center text-xs text-gray-600 h-12">
                                        <TableCell className="p-0 text-center"><Checkbox className="translate-y-[2px]" /></TableCell>
                                        <TableCell className="text-gray-500 font-normal">{item.id}</TableCell>
                                        <TableCell>{item.supplier}</TableCell>
                                        <TableCell className="text-left pl-4">{item.name}</TableCell>
                                        <TableCell>{item.option}</TableCell>
                                        <TableCell>{item.stock}</TableCell>
                                        <TableCell>{item.applicant}</TableCell>
                                        <TableCell>{item.status}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" className="h-6 w-[60px] text-xs px-0 rounded-sm border-gray-300">상세보기</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center mt-4">
                    <Button variant="outline" className="h-8 px-3 text-xs border-gray-300 text-gray-700 font-medium rounded-sm">선택 삭제</Button>
                </div>

                <div className="mt-6 text-xs text-red-500 leading-relaxed font-bold">
                    <p>! 노란색 리스트는 상품정보(상품명/옵션명/옵션값)가 변경된 리스트이며 재고량이 다를 수 있습니다.</p>
                    <p>! 빨간색 리스트는 상품이 삭제된 리스트이며, 완전 삭제된 상품의 경우 "완전삭제 " 로 표기됩니다.</p>
                    <p>해당 상품의 상품정보를 확인하신 후 재입고 알림 메세지를 전송해 주세요.</p>
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
