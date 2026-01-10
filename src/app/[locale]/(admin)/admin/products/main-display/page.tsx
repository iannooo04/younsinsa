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
import { CalendarIcon, Youtube, ChevronUp, ChevronDown, Book, Plus } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function MainProductDisplayPage() {
    // Mock Data based on the screenshot
    const displayItems = [
        {
            id: 4,
            type: "PC쇼핑몰",
            name: "New Arrivals",
            desc: "",
            theme: "상단 상품진열",
            display: "노출함",
            regDate: "2025-12-02",
            modDate: "2026-01-07",
            code: "{=includeWidget('goods/_goods_display_main.html','sno','1')}",
        },
        {
            id: 3,
            type: "PC쇼핑몰",
            name: "Best Sellers",
            desc: "",
            theme: "하단 상품진열",
            display: "노출함",
            regDate: "2025-12-02",
            modDate: "2026-01-07",
            code: "{=includeWidget('goods/_goods_display_main.html','sno','2')}",
        },
        {
            id: 2,
            type: "모바일쇼핑몰",
            name: "New Arrivals",
            desc: "",
            theme: "상단 상품진열",
            display: "노출함",
            regDate: "2025-12-02",
            modDate: "2026-01-07",
            code: "{=includeWidget('goods/_goods_display_main.html','sno','3')}",
        },
        {
            id: 1,
            type: "모바일쇼핑몰",
            name: "Best Sellers",
            desc: "",
            theme: "하단 상품진열",
            display: "노출함",
            regDate: "2025-12-02",
            modDate: "2026-01-07",
            code: "{=includeWidget('goods/_goods_display_main.html','sno','4')}",
        }
    ];

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">메인페이지 상품진열</h1>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 font-bold h-9 w-48 rounded-sm">
                    <Plus size={16} className="mr-1" /> 메인페이지 분류 등록
                </Button>
            </div>

            {/* Search Section */}
            <div>
                 <div className="flex items-center justify-between mb-2 mt-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-800">분류 검색</h2>
                        <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-xs cursor-help">?</span>
                    </div>
                </div>
                
                <div className="border border-gray-300 bg-white">
                    {/* Row 1: Category Name */}
                    <div className="flex items-center border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">분류명</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Select defaultValue="combined">
                                <SelectTrigger className="w-[120px] h-8 text-xs">
                                    <SelectValue placeholder="=통합검색=" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="combined">=통합검색=</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input className="w-64 h-8" />
                        </div>
                    </div>

                     {/* Row 2: Period Search */}
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
                        검색 <span className="text-red-500">4</span>개 / 전체 <span className="text-red-500">4</span>개
                    </div>
                    <div className="flex items-center gap-2">
                        <Select defaultValue="regDesc">
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="등록일 ↑" />
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
                                <TableHead className="w-16 text-center">번호</TableHead>
                                <TableHead className="text-center w-32 border-l border-gray-300">쇼핑몰 유형</TableHead>
                                <TableHead className="text-center border-l border-gray-300">분류명</TableHead>
                                <TableHead className="text-center border-l border-gray-300 w-24">분류 설명</TableHead>
                                <TableHead className="text-center border-l border-gray-300 w-32">선택테마</TableHead>
                                <TableHead className="text-center border-l border-gray-300 w-24">노출상태</TableHead>
                                <TableHead className="text-center border-l border-gray-300 w-32">등록일</TableHead>
                                <TableHead className="text-center border-l border-gray-300 w-24">상품진열</TableHead>
                                <TableHead className="text-center border-l border-gray-300 w-24">코드복사</TableHead>
                                <TableHead className="text-center border-l border-gray-300 w-[500px]">치환코드</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {displayItems.map((item) => (
                                <TableRow key={item.id} className="hover:bg-gray-50 text-center text-xs text-gray-600 h-16 border-b border-gray-200">
                                    <TableCell className="p-0 text-center"><Checkbox className="translate-y-[2px]" /></TableCell>
                                    <TableCell className="text-gray-500 font-normal">{item.id}</TableCell>
                                    <TableCell className="border-l border-gray-200">{item.type}</TableCell>
                                    <TableCell className="text-left pl-4 font-normal text-gray-800 border-l border-gray-200">{item.name}</TableCell>
                                    <TableCell className="border-l border-gray-200">{item.desc}</TableCell>
                                    <TableCell className="border-l border-gray-200">{item.theme}</TableCell>
                                    <TableCell className="border-l border-gray-200">{item.display}</TableCell>
                                    <TableCell className="border-l border-gray-200">
                                        <div className="text-[11px] space-y-0.5">
                                            <p>{item.regDate}</p>
                                            <p>{item.modDate}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="border-l border-gray-200">
                                        <Button variant="outline" className="h-6 text-xs px-2 bg-white hover:bg-gray-50 border-gray-300">상품진열</Button>
                                    </TableCell>
                                    <TableCell className="border-l border-gray-200">
                                        <Button variant="outline" className="h-6 text-xs px-2 bg-white hover:bg-gray-50 border-gray-300">복사</Button>
                                    </TableCell>
                                    <TableCell className="text-left pl-4 font-mono text-gray-500 border-l border-gray-200 text-[11px] tracking-tight">{item.code}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                 {/* Pagination & Delete */}
                 <div className="flex justify-between items-center mt-4">
                    <Button variant="outline" className="h-8 text-xs bg-white text-gray-600 border-gray-300 hover:bg-gray-50 mt-4">선택 삭제</Button>
                     <div className="flex justify-center gap-1 flex-1 -ml-20">
                        <Button variant="default" className="h-8 w-8 p-0 bg-gray-600 text-white font-bold rounded-sm border-gray-600 hover:bg-gray-700">1</Button>
                    </div>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="pt-8 border-t border-gray-300 space-y-6 mt-12 pb-32">
                <div className="flex items-center gap-2">
                    <span className="text-blue-500"><Book size={16} /></span>
                    <h3 className="font-bold text-blue-500">안내</h3>
                </div>

                <div className="space-y-4 text-xs text-gray-500 leading-relaxed pl-1">
                     <div className="space-y-2">
                         <h4 className="text-sm font-bold text-gray-700 mb-2">[상품 정보] 메인페이지 상품진열은 무엇인가요?</h4>
                         <p>· 쇼핑몰 메인페이지에 진열할 상품의 종류 및 순서 등의 분류 정보를 미리 등록하여 노출상태 설정만으로 간편하게 쇼핑몰에 상품을 노출할 수 있습니다.</p>
                         <p>· PC쇼핑몰과 모바일쇼핑몰 각각의 메인페이지에 진열할 상품을 설정할 수 있습니다.</p>
                         <p className="text-red-500 font-bold">· 쇼핑몰 메인페이지에 노출 가능한 분류 개수는 최대 10개 입니다.</p>
                         <p>· 분류 등록 시 메인페이지 상품 진열 영역의 "타이틀명", 상품의 "진열 순서, 이미지 사이즈, 노출항목, 디스플레이 유형" 등을 설정할 수 있습니다.</p>
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
