"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
import { getMainPageDisplayGroupsAction, deleteMainPageDisplayGroupsAction } from "@/actions/product-display-actions";
import { format } from "date-fns";

export default function MainProductDisplayPage() {
    // Data State
    const [items, setItems] = useState<{
        id: number;
        mallType: string; // 'MOBILE' | 'PC'
        name: string;
        description: string | null;
        themeName: string | null;
        isExposed: boolean;
        createdAt: Date | string;
        updatedAt: Date | string;
        replaceCode?: string | null;
    }[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Pagination State
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter State
    const [searchType, setSearchType] = useState('all');
    const [keyword, setKeyword] = useState('');
    const [dateType, setDateType] = useState('regDate');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    // Advanced Search State
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
    const [mallType, setMallType] = useState('ALL');
    const [displayStatus, setDisplayStatus] = useState('all');
    const [sort, setSort] = useState('regDesc');
    
    // Selection State
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Trigger for refetching
    const [searchTrigger, setSearchTrigger] = useState(0);

    // Date Picker Refs
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);

    const handleDateIconClick = (ref: React.RefObject<HTMLInputElement | null>) => {
        try {
            ref.current?.showPicker();
        } catch {
            ref.current?.focus();
        }
    };

    // Fetch Data
    const fetchData = useCallback(async () => {
        setLoading(true);
        const result = await getMainPageDisplayGroupsAction(page, pageSize, {
            searchType,
            keyword,
            startDate,
            endDate,
            dateType,
            mallType,
            displayStatus,
            sort
        });

        if (result.success) {
            setItems(result.items);
            setTotalCount(result.totalCount);
        }
        setLoading(false);
    }, [page, pageSize, searchType, keyword, startDate, endDate, dateType, mallType, displayStatus, sort]);

    useEffect(() => {
        fetchData();
         
    }, [fetchData, searchTrigger]);

    const handleSearch = () => {
        setPage(1);
        setSearchTrigger(prev => prev + 1);
    };

    // Selection Handlers
    const handleCheckboxChange = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(item => item !== id));
        }
    };

    const handleSelectPage = (checked: boolean) => {
        if (checked) {
            setSelectedIds(items.map(p => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    // Bulk Delete
    const handleDelete = async () => {
        if (selectedIds.length === 0) return alert("삭제할 항목을 선택해주세요.");
        if (!confirm("선택한 항목을 삭제하시겠습니까?")) return;

        const result = await deleteMainPageDisplayGroupsAction(selectedIds);
        alert(result.message);
        if (result.success) {
            setSelectedIds([]);
            fetchData();
        }
    };

    // Date Helper
    const setPeriod = (period: string) => {
        const end = new Date();
        const start = new Date();
        
        switch (period) {
            case "오늘":
                break;
            case "7일":
                start.setDate(end.getDate() - 7);
                break;
            case "15일":
                start.setDate(end.getDate() - 15);
                break;
            case "1개월":
                start.setMonth(end.getMonth() - 1);
                break;
            case "3개월":
                start.setMonth(end.getMonth() - 3);
                break;
            case "전체":
                setStartDate("");
                setEndDate("");
                return;
            default:
                break;
        }
        if (period !== "전체") {
             setStartDate(format(start, "yyyy-MM-dd"));
             setEndDate(format(end, "yyyy-MM-dd"));
        }
    };

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">메인페이지 상품진열</h1>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 font-bold h-9 w-48 rounded-sm" onClick={() => window.location.href='/admin/products/main-display/create'}>
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
                            <Select value={searchType} onValueChange={setSearchType}>
                                <SelectTrigger className="w-[120px] h-8 text-xs">
                                    <SelectValue placeholder="=통합검색=" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">=통합검색=</SelectItem>
                                    <SelectItem value="name">분류명</SelectItem>
                                    <SelectItem value="desc">분류 설명</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input 
                                className="w-64 h-8" 
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                    </div>

                     {/* Row 2: Period Search */}
                     <div className="flex items-center">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">기간검색</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Select value={dateType} onValueChange={setDateType}>
                                <SelectTrigger className="w-[100px] h-8 text-xs">
                                    <SelectValue placeholder="등록일" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="regDate">등록일</SelectItem>
                                    <SelectItem value="modDate">수정일</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative">
                                <Input 
                                    className="w-32 h-8 pl-2 pr-8" 
                                    value={startDate} 
                                    onChange={(e) => setStartDate(e.target.value)}
                                    placeholder="YYYY-MM-DD"
                                />
                                <input 
                                    type="date"
                                    ref={startDateRef}
                                    className="absolute opacity-0 pointer-events-none w-0 h-0"
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <CalendarIcon 
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer hover:text-gray-600 transition-colors" 
                                    onClick={() => handleDateIconClick(startDateRef)}
                                />
                            </div>
                            <span className="text-gray-500">~</span>
                            <div className="relative">
                                <Input 
                                    className="w-32 h-8 pl-2 pr-8" 
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    placeholder="YYYY-MM-DD"
                                />
                                <input 
                                    type="date"
                                    ref={endDateRef}
                                    className="absolute opacity-0 pointer-events-none w-0 h-0"
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                                <CalendarIcon 
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer hover:text-gray-600 transition-colors" 
                                    onClick={() => handleDateIconClick(endDateRef)}
                                />
                            </div>
                             <div className="flex gap-0.5 ml-2">
                                {["오늘", "7일", "15일", "1개월", "3개월", "전체"].map((period) => (
                                    <Button 
                                        key={period} 
                                        variant="outline" 
                                        onClick={() => setPeriod(period)}
                                        className="h-8 px-3 text-xs rounded-sm bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                                    >
                                        {period}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {isAdvancedSearchOpen && (
                    <div className="border border-t-0 border-gray-300 bg-white">
                        <div className="flex border-b border-gray-200">
                            <div className="flex-1 flex border-r border-gray-200">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">쇼핑몰 유형</div>
                                <div className="flex-1 p-3 flex items-center gap-4">
                                    <RadioGroup value={mallType} onValueChange={setMallType} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="ALL" id="mall-all" />
                                            <Label htmlFor="mall-all" className="text-xs">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="PC" id="mall-pc" />
                                            <Label htmlFor="mall-pc" className="text-xs">PC쇼핑몰</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="MOBILE" id="mall-mobile" />
                                            <Label htmlFor="mall-mobile" className="text-xs">모바일쇼핑몰</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            <div className="flex-1 flex">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">노출상태</div>
                                <div className="flex-1 p-3 flex items-center gap-4">
                                    <RadioGroup value={displayStatus} onValueChange={setDisplayStatus} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="display-all" />
                                            <Label htmlFor="display-all" className="text-xs">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="exposed" id="display-exposed" />
                                            <Label htmlFor="display-exposed" className="text-xs">노출함</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="hidden" id="display-hidden" />
                                            <Label htmlFor="display-hidden" className="text-xs">노출안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                 <div 
                    className="mt-2 text-blue-500 text-xs flex items-center gap-1 cursor-pointer hover:underline"
                    onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
                >
                    상세검색 {isAdvancedSearchOpen ? '닫힘' : '펼침'} {isAdvancedSearchOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>

                <div className="flex justify-center mt-6 mb-10">
                    <Button onClick={handleSearch} className="w-32 h-10 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-sm">검색</Button>
                </div>
            </div>

            {/* List Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-gray-800">
                        검색 <span className="text-red-500">{totalCount}</span>개 / 전체 <span className="text-red-500">{totalCount}</span>개
                    </div>
                    <div className="flex items-center gap-2">
                        <Select value={sort} onValueChange={setSort}>
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="등록일 ↓" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="regDesc">등록일 ↓</SelectItem>
                                <SelectItem value="regAsc">등록일 ↑</SelectItem>
                                <SelectItem value="nameDesc">테마명 ↓</SelectItem>
                                <SelectItem value="nameAsc">테마명 ↑</SelectItem>
                                <SelectItem value="themeDesc">선택테마 ↓</SelectItem>
                                <SelectItem value="themeAsc">선택테마 ↑</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={pageSize.toString()} onValueChange={(v) => { setPageSize(Number(v)); setPage(1); }}>
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="10개 보기" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10개 보기</SelectItem>
                                <SelectItem value="20">20개 보기</SelectItem>
                                <SelectItem value="30">30개 보기</SelectItem>
                                <SelectItem value="40">40개 보기</SelectItem>
                                <SelectItem value="50">50개 보기</SelectItem>
                                <SelectItem value="60">60개 보기</SelectItem>
                                <SelectItem value="70">70개 보기</SelectItem>
                                <SelectItem value="80">80개 보기</SelectItem>
                                <SelectItem value="90">90개 보기</SelectItem>
                                <SelectItem value="100">100개 보기</SelectItem>
                                <SelectItem value="200">200개 보기</SelectItem>
                                <SelectItem value="300">300개 보기</SelectItem>
                                <SelectItem value="500">500개 보기</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="border-t-2 border-gray-800 border-b border-gray-300">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#A4A4A4]/20 hover:bg-[#A4A4A4]/20 text-xs text-center font-bold text-gray-700 h-10 whitespace-nowrap">
                                <TableHead className="w-10 text-center p-0">
                                    <Checkbox 
                                        className="translate-y-[2px]" 
                                        checked={items.length > 0 && selectedIds.length === items.length}
                                        onCheckedChange={handleSelectPage}
                                    />
                                </TableHead>
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
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={11} className="h-40 text-center">로딩중...</TableCell>
                                </TableRow>
                            ) : items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={11} className="h-40 text-center">검색된 진열 정보가 없습니다.</TableCell>
                                </TableRow>
                            ) : (
                                items.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50 text-center text-xs text-gray-600 h-16 border-b border-gray-200">
                                        <TableCell className="p-0 text-center">
                                            <Checkbox 
                                                className="translate-y-[2px]" 
                                                checked={selectedIds.includes(item.id)}
                                                onCheckedChange={(checked) => handleCheckboxChange(item.id, !!checked)}
                                            />
                                        </TableCell>
                                        <TableCell className="text-gray-500 font-normal">{item.id}</TableCell>
                                        <TableCell className="border-l border-gray-200">{item.mallType === 'MOBILE' ? '모바일쇼핑몰' : 'PC쇼핑몰'}</TableCell>
                                        <TableCell className="text-left pl-4 font-normal text-gray-800 border-l border-gray-200">{item.name}</TableCell>
                                        <TableCell className="border-l border-gray-200">{item.description}</TableCell>
                                        <TableCell className="border-l border-gray-200">{item.themeName}</TableCell>
                                        <TableCell className="border-l border-gray-200">{item.isExposed ? '노출함' : '노출안함'}</TableCell>
                                        <TableCell className="border-l border-gray-200">
                                            <div className="text-[11px] space-y-0.5">
                                                <p>{format(new Date(item.createdAt), 'yyyy-MM-dd')}</p>
                                                {/* <p>{format(new Date(item.updatedAt), 'yyyy-MM-dd')}</p> */}
                                            </div>
                                        </TableCell>
                                        <TableCell className="border-l border-gray-200">
                                            <Button variant="outline" className="h-6 text-xs px-2 bg-white hover:bg-gray-50 border-gray-300" onClick={() => window.location.href=`/admin/products/main-display/${item.id}`}>상품진열</Button>
                                        </TableCell>
                                        <TableCell className="border-l border-gray-200">
                                            <Button variant="outline" className="h-6 text-xs px-2 bg-white hover:bg-gray-50 border-gray-300">복사</Button>
                                        </TableCell>
                                        <TableCell className="text-left pl-4 font-mono text-gray-500 border-l border-gray-200 text-[11px] tracking-tight">
                                            {item.replaceCode || '-'}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                 {/* Pagination & Delete */}
                 <div className="flex justify-between items-center mt-4">
                    <Button 
                        variant="outline" 
                        onClick={handleDelete}
                        className="h-8 text-xs bg-white text-gray-600 border-gray-300 hover:bg-gray-50 mt-4"
                    >
                        선택 삭제
                    </Button>
                     <div className="flex justify-center gap-1 flex-1 -ml-20">
                         {/* Pagination Logic */}
                        <Button 
                            variant="outline" 
                            disabled={page === 1} 
                            onClick={() => setPage(1)}
                            className="h-8 w-8 p-0 text-gray-500 border-gray-300 rounded-sm bg-white hover:bg-gray-50"
                        >{"<<"}</Button>
                        <Button 
                            variant="outline" 
                            disabled={page === 1} 
                            onClick={() => setPage(p => Math.max(1, p-1))}
                            className="h-8 w-8 p-0 text-gray-500 border-gray-300 rounded-sm bg-white hover:bg-gray-50"
                        >{"<"}</Button>
                        
                         {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(p => p >= page - 2 && p <= page + 2)
                            .map(p => (
                            <Button 
                                key={p} 
                                variant={p === page ? "default" : "outline"}
                                onClick={() => setPage(p)}
                                className={`h-8 w-8 p-0 rounded-sm ${p === page ? "bg-gray-600 text-white font-bold border-gray-600 hover:bg-gray-700" : "text-gray-500 border-gray-300 bg-white hover:bg-gray-50"}`}
                            >
                                {p}
                            </Button>
                         ))}

                         <Button 
                            variant="outline" 
                            disabled={page >= totalPages} 
                            onClick={() => setPage(p => Math.min(totalPages, p+1))}
                            className="h-8 w-8 text-xs text-gray-500 border-gray-300 rounded-sm bg-white hover:bg-gray-50"
                        >{">"}</Button>
                         <Button 
                            variant="outline" 
                            disabled={page >= totalPages} 
                            onClick={() => setPage(totalPages)}
                            className="h-8 w-8 text-xs text-gray-500 border-gray-300 rounded-sm bg-white hover:bg-gray-50"
                        >{">>"}</Button>
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
