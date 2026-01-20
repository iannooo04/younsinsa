"use client";

import { useState, useEffect, useCallback } from "react";
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
import { CalendarIcon, Youtube, ChevronUp, ChevronDown, FileSpreadsheet, Image as ImageIcon } from "lucide-react";
import { getProductsAction, restoreProductsAction, permanentlyDeleteProductsAction } from "@/actions/product-actions";
import { format } from "date-fns";


type ProductItem = {
    id: string;
    productCode: string;
    image: string | null;
    name: string;
    supplier: string;
    brand: string;
    displayStatus: string;
    saleStatus: string;
    stockStatus: string;
    stock: string;
    price: number;
    shippingFee: string;
    createdAt: Date | string;
    deletedAt: Date | string | null;
};

export default function DeletedProductsManagementPage() {
    // Data State
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    
    // Pagination State
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter State
    const [supplierType, setSupplierType] = useState('all');
    const [searchType, setSearchType] = useState('productName');
    const [keyword, setKeyword] = useState('');
    const [dateType, setDateType] = useState('delDate');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    // Selection State
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchTrigger, setSearchTrigger] = useState(0);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const result = await getProductsAction(page, pageSize, {
            searchType,
            keyword,
            startDate,
            endDate,
            dateType,
            isDeleted: true
        });

        if (result.success) {
            setProducts(result.items);
            setTotalCount(result.totalCount);
        }
        setLoading(false);
    }, [page, pageSize, searchType, keyword, startDate, endDate, dateType]);

    useEffect(() => {
        fetchData();
    }, [fetchData, searchTrigger]);

    const handleSearch = () => {
        setPage(1);
        setSearchTrigger(prev => prev + 1);
    };

    const handleSelectPage = (checked: boolean) => {
        if (checked) {
            setSelectedIds(products.map(p => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleCheckboxChange = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(item => item !== id));
        }
    };

    const handleRestore = async () => {
        if (selectedIds.length === 0) return alert("선택된 상품이 없습니다.");
        if (!confirm("선택한 상품을 복구하시겠습니까?")) return;
        
        const result = await restoreProductsAction(selectedIds);
        alert(result.message);
        if (result.success) {
            setSelectedIds([]);
            fetchData();
        }
    };

    const handlePermanentDelete = async () => {
        if (selectedIds.length === 0) return alert("선택된 상품이 없습니다.");
        if (!confirm("선택한 상품을 완전 삭제하시겠습니까? 삭제 후 복구가 불가능합니다.")) return;
        
        const result = await permanentlyDeleteProductsAction(selectedIds);
        alert(result.message);
        if (result.success) {
            setSelectedIds([]);
            fetchData();
        }
    };

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
                            <RadioGroup value={supplierType} onValueChange={setSupplierType} className="flex items-center gap-6">
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
                            <Select value={searchType} onValueChange={setSearchType}>
                                <SelectTrigger className="w-[120px] h-8 text-xs">
                                    <SelectValue placeholder="상품명" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="productName">상품명</SelectItem>
                                    <SelectItem value="productCode">상품코드</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input 
                                className="w-64 h-8" 
                                value={keyword} 
                                onChange={e => setKeyword(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                    </div>

                     {/* Row 3: Period Search */}
                     <div className="flex items-center">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">기간검색</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Select value={dateType} onValueChange={setDateType}>
                                <SelectTrigger className="w-[100px] h-8 text-xs">
                                    <SelectValue placeholder="삭제일" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="delDate">삭제일</SelectItem>
                                    <SelectItem value="regDate">등록일</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative">
                                <Input 
                                    className="w-32 h-8 pl-2 pr-8" 
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    placeholder="YYYY-MM-DD"
                                />
                                <CalendarIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                            <span className="text-gray-500">~</span>
                            <div className="relative">
                                <Input 
                                    className="w-32 h-8 pl-2 pr-8" 
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    placeholder="YYYY-MM-DD"
                                />
                                <CalendarIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                             <div className="flex gap-0.5 ml-2">
                                {["오늘", "7일", "15일", "1개월", "3개월", "전체"].map((period) => (
                                    <Button 
                                        key={period} 
                                        variant="outline" 
                                        onClick={() => setPeriod(period)}
                                        className={`h-8 px-3 text-xs rounded-sm bg-white text-gray-600 border-gray-300 hover:bg-gray-50`}
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
                        <Select defaultValue="delDesc">
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="삭제일 ↓" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="delDesc">삭제일 ↓</SelectItem>
                                <SelectItem value="delAsc">삭제일 ↑</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={pageSize.toString()} onValueChange={v => { setPageSize(Number(v)); setPage(1); }}>
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
                                <TableHead className="w-10 text-center p-0">
                                    <Checkbox 
                                        className="translate-y-[2px]" 
                                        checked={products.length > 0 && selectedIds.length === products.length}
                                        onCheckedChange={handleSelectPage}
                                    />
                                </TableHead>
                                <TableHead className="w-16 text-center font-bold text-gray-700 bg">번호</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">상품코드</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">이미지</TableHead>
                                <TableHead className="text-center font-bold text-gray-700 w-[300px]">상품명</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">공급사</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">노출상태</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">판매상태</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">재고</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">등록일/삭제일</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="h-40 text-center">로딩중...</TableCell>
                                </TableRow>
                            ) : products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="h-40 text-center text-gray-500">
                                        검색된 정보가 없습니다.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((item, index) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50 text-center text-xs text-gray-600 h-16">
                                        <TableCell className="p-0 text-center">
                                            <Checkbox 
                                                className="translate-y-[2px]" 
                                                checked={selectedIds.includes(item.id)}
                                                onCheckedChange={(checked) => handleCheckboxChange(item.id, !!checked)}
                                            />
                                        </TableCell>
                                        <TableCell className="text-gray-500 font-normal">{totalCount - ((page - 1) * pageSize) - index}</TableCell>
                                        <TableCell>{item.productCode}</TableCell>
                                         <TableCell className="py-1">
                                            <div className="flex justify-center">
                                                <div className="w-10 h-10 border border-gray-200 bg-white flex items-center justify-center">
                                                    <ImageIcon className="text-gray-300 w-5 h-5"/>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-left font-normal text-gray-800">
                                            {item.name}
                                        </TableCell>
                                        <TableCell>{item.supplier}</TableCell>
                                        <TableCell>
                                             {item.displayStatus}
                                        </TableCell>
                                        <TableCell>
                                            {item.saleStatus}
                                        </TableCell>
                                        <TableCell>{item.stock}</TableCell>
                                        <TableCell>
                                            <div className="space-y-0.5">
                                                <div>{item.createdAt ? format(new Date(item.createdAt), "yyyy-MM-dd") : '-'} /</div>
                                                <div>{item.deletedAt ? format(new Date(item.deletedAt), "yyyy-MM-dd") : '-'}</div>
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
                        <Button variant="outline" onClick={handleRestore} className="h-8 px-3 text-xs border-gray-300 text-gray-700 font-medium rounded-sm bg-white">상품복구</Button>
                        <Button variant="outline" onClick={handlePermanentDelete} className="h-8 px-3 text-xs border-gray-300 text-gray-700 font-medium rounded-sm bg-white">완전삭제</Button>
                    </div>
                     <Button variant="outline" className="h-8 px-3 text-xs border-gray-300 text-gray-700 font-medium rounded-sm flex items-center gap-1 bg-white">
                        <span className="text-green-600"><FileSpreadsheet size={14} /></span>
                        엑셀다운로드
                    </Button>
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-1 mt-6">
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
