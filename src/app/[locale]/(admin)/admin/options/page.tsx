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
import { CalendarIcon, Youtube, ChevronUp, Book, Plus } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function CommonlyUsedOptionsPage() {
    // Mock Data
    const optionsData = [
        { id: 11, manageName: "N_SIZE5", type: "일체형", name: "SIZE", supplier: "니아인터내셔널", regDate: "2025-12-18", modDate: "2025-12-18" },
        { id: 10, manageName: "S_M_SIZE", type: "일체형", name: "SIZE", supplier: "니아인터내셔널", regDate: "2025-12-17", modDate: "-" },
        { id: 9, manageName: "N_SIZE5", type: "일체형", name: "SIZE", supplier: "니아인터내셔널", regDate: "2025-12-17", modDate: "-" },
        { id: 8, manageName: "SIZE2", type: "일체형", name: "SIZE", supplier: "니아인터내셔널", regDate: "2025-12-16", modDate: "2025-12-16" },
        { id: 7, manageName: "N_SIZE4", type: "일체형", name: "SIZE", supplier: "니아인터내셔널", regDate: "2025-12-15", modDate: "2025-12-15" },
        { id: 6, manageName: "N_SIZE3", type: "일체형", name: "SIZE", supplier: "니아인터내셔널", regDate: "2025-12-12", modDate: "2025-12-12" },
        { id: 5, manageName: "H_SIZE", type: "일체형", name: "SIZE", supplier: "니아인터내셔널", regDate: "2025-12-11", modDate: "2025-12-12" },
        { id: 4, manageName: "F_SIZE", type: "일체형", name: "SIZE", supplier: "니아인터내셔널", regDate: "2025-12-11", modDate: "-" },
        { id: 3, manageName: "N_SIZE2", type: "일체형", name: "SIZE", supplier: "니아인터내셔널", regDate: "2025-12-10", modDate: "-" },
        { id: 2, manageName: "N_SIZE", type: "일체형", name: "SIZE", supplier: "니아인터내셔널", regDate: "2025-12-08", modDate: "2025-12-17" },
    ];

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">자주쓰는 옵션 관리</h1>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 h-9 px-4 font-medium flex items-center gap-1">
                    <Plus size={14} /> 옵션 등록
                </Button>
            </div>

            {/* Search Section */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-lg font-bold text-gray-800">옵션 검색</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-xs cursor-help">?</span>
                </div>
                
                <div className="border border-gray-300 bg-white">
                    {/* Row 1: Supplier */}
                    <div className="flex items-center border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">공급사 구분</div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <RadioGroup defaultValue="all" className="flex items-center gap-4">
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
                                </div>
                            </RadioGroup>
                            <Button variant="secondary" className="h-7 text-xs bg-gray-400 text-white hover:bg-gray-500 rounded-sm">
                                공급사 선택
                            </Button>
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
                                    <SelectItem value="name">옵션명</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input className="w-64 h-8" />
                        </div>
                    </div>

                    {/* Row 3: Option Display Type */}
                    <div className="flex items-center border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">옵션노출 방식</div>
                        <div className="flex-1 p-3">
                             <RadioGroup defaultValue="all" className="flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="all" id="type-all" />
                                    <Label htmlFor="type-all">전체</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="integrated" id="type-integrated" />
                                    <Label htmlFor="type-integrated">일체형</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="separated" id="type-separated" />
                                    <Label htmlFor="type-separated">분리형</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                     {/* Row 4: Period Search */}
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

                <div className="flex justify-center mt-6 mb-10">
                    <Button className="w-32 h-10 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-sm">검색</Button>
                </div>
            </div>

            {/* List Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-gray-800">
                        검색 <span className="text-red-500">11</span>개 / 전체 <span className="text-red-500">11</span>개
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
                            <TableRow className="bg-gray-100 hover:bg-gray-100">
                                <TableHead className="w-10 text-center p-0"><Checkbox className="translate-y-[2px]" /></TableHead>
                                <TableHead className="w-16 text-center font-bold text-gray-700">번호</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">옵션 관리명</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">옵션표시</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">옵션명</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">공급사</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">등록일</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">수정일</TableHead>
                                <TableHead className="w-20 text-center font-bold text-gray-700">수정</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {optionsData.map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-50 text-center text-xs text-gray-600 h-12">
                                    <TableCell className="p-0 text-center"><Checkbox className="translate-y-[2px]" /></TableCell>
                                    <TableCell className="text-gray-500 font-normal">{item.id}</TableCell>
                                    <TableCell className="text-left pl-4">{item.manageName}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.supplier}</TableCell>
                                    <TableCell>{item.regDate}</TableCell>
                                    <TableCell>{item.modDate}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" className="h-6 w-[50px] text-xs px-0 rounded-sm border-gray-300">수정</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center gap-2 mt-4">
                    <Button variant="outline" className="h-8 px-3 text-xs border-gray-300 text-gray-700 font-medium rounded-sm">선택 복사</Button>
                    <Button variant="outline" className="h-8 px-3 text-xs border-gray-300 text-gray-700 font-medium rounded-sm">선택 삭제</Button>
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-1 mt-6">
                    <Button variant="outline" className="h-8 w-8 p-0 text-gray-500 border-gray-300 rounded-sm bg-gray-50">{"<<"}</Button>
                    <Button variant="outline" className="h-8 w-8 p-0 text-gray-500 border-gray-300 rounded-sm bg-gray-50">{"<"}</Button>
                    <Button variant="default" className="h-8 w-8 p-0 bg-gray-700 text-white font-bold rounded-sm border-gray-700 hover:bg-gray-800">1</Button>
                    <Button variant="outline" className="h-8 w-8 p-0 text-gray-600 border-gray-300 rounded-sm hover:bg-gray-50">2</Button>
                    <Button variant="outline" className="h-8 w-8 p-0 text-gray-500 border-gray-300 rounded-sm bg-gray-50">{">"}</Button>
                    <Button variant="outline" className="h-8 w-8 p-0 text-gray-500 border-gray-300 rounded-sm bg-gray-50">{">>"}</Button>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="pt-8 border-t border-gray-300 space-y-6 mt-12">
                <div className="flex items-center gap-2">
                    <span className="text-blue-500"><Book size={16} /></span>
                    <h3 className="font-bold text-blue-500">안내</h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                         <h4 className="text-sm font-bold text-gray-700 mb-1">[상품 정보] 선택 복사는 무엇인가요?</h4>
                         <div className="text-xs text-gray-500 pl-2">
                            <p>· 자주쓰는 옵션 리스트 내 운영자가 선택한 옵션과 동일한 정보의 옵션이 추가 생성 됩니다.</p>
                            <p>· 유사한 옵션을 연속해서 등록 할 때 편리하게 사용할 수 있습니다.</p>
                         </div>
                    </div>
                     <div className="space-y-1">
                         <h4 className="text-sm font-bold text-gray-700 mb-1">[상품 정보] 선택 삭제는 무엇인가요?</h4>
                         <div className="text-xs text-gray-500 pl-2">
                            <p>· 자주쓰는 옵션 리스트 내 운영자가 선택한 옵션을 삭제처리 합니다.</p>
                            <p className="text-red-500 font-bold">· 삭제된 옵션정보는 복구가 불가능하므로 삭제 시 유의하시기 바랍니다.</p>
                         </div>
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
