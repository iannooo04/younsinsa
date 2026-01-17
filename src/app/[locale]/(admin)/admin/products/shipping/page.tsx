
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
import { CalendarIcon, Youtube, ChevronUp, ChevronDown, Book } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getProductsAction } from "@/actions/product-actions";
import { getShippingPoliciesAction, updateProductShippingPolicyAction } from "@/actions/shipping-actions";
import { format } from "date-fns";

export default function ProductShippingManagementPage() {
    // Data State
    const [products, setProducts] = useState<any[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [shippingPolicies, setShippingPolicies] = useState<{id: number, name: string}[]>([]);

    // Pagination State
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter State
    const [supplierType, setSupplierType] = useState('all');
    const [searchType, setSearchType] = useState('productName');
    const [keyword, setKeyword] = useState('');
    const [dateType, setDateType] = useState('regDate');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    // Selection State
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

    // Action Input
    const [targetPolicyId, setTargetPolicyId] = useState<string>("");

    // Trigger for refetching
    const [searchTrigger, setSearchTrigger] = useState(0);

    // Fetch Initial Metadata (Shipping Policies)
    useEffect(() => {
        getShippingPoliciesAction().then(result => {
            if (result.success) setShippingPolicies(result.items);
        });
    }, []);

    // Fetch Products
    const fetchData = useCallback(async () => {
        setLoading(true);
        const result = await getProductsAction(page, pageSize, {
            supplierType: supplierType === 'all' ? undefined : supplierType,
            searchType,
            keyword,
            startDate,
            endDate,
            dateType
        });

        if (result.success) {
            setProducts(result.items);
            setTotalCount(result.totalCount);
        }
        setLoading(false);
    }, [page, pageSize, searchTrigger, supplierType, searchType, keyword, startDate, endDate, dateType]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData]);

    const handleSearch = () => {
        setPage(1);
        setSearchTrigger(prev => prev + 1);
    };

    // Selection Handlers
    const handleCheckboxChange = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(item => item !== id));
        }
    };

    const handleSelectPage = (checked: boolean) => {
        if (checked) {
            setSelectedIds(products.map(p => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    // Bulk Update Handler
    const handleUpdateShippingPolicy = async () => {
        if (selectedIds.length === 0) return alert("선택된 상품이 없습니다.");
        if (!targetPolicyId) return alert("적용할 배송비 조건을 선택해주세요.");
        if (!confirm("선택한 상품의 배송비 조건을 수정하시겠습니까?")) return;

        const result = await updateProductShippingPolicyAction(selectedIds, parseInt(targetPolicyId));
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
                <h1 className="text-2xl font-bold text-gray-900">상품 배송 관리</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm" onClick={handleUpdateShippingPolicy}>저장</Button>
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
                     <div className="flex items-center border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">기간검색</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Select value={dateType} onValueChange={setDateType}>
                                <SelectTrigger className="w-[100px] h-8 text-xs">
                                    <SelectValue placeholder="등록일" />
                                </SelectTrigger>
                                <SelectContent>
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
                                        className={`h-8 px-3 text-xs rounded-sm ${period === "전체" ? "bg-gray-700 text-white border-gray-700 hover:bg-gray-800" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`}
                                    >
                                        {period}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Row 4: Shipping Condition */}
                    <div className="flex">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">배송비 조건</div>
                        <div className="flex-1 p-3 space-y-2">
                             {/* Radio Group */}
                             <div className="flex items-center gap-6">
                                <RadioGroup defaultValue="all" className="flex items-center gap-6">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all" id="shipping-all" />
                                        <Label htmlFor="shipping-all">전체</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="condition" id="shipping-condition" />
                                        <Label htmlFor="shipping-condition">배송비조건별</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="product" id="shipping-product" />
                                        <Label htmlFor="shipping-product">상품별</Label>
                                    </div>
                                </RadioGroup>
                             </div>
                             {/* Checkbox Group */}
                             <div className="flex items-center gap-6 pt-1">
                                 {[
                                     { id: "check-all", label: "전체", checked: true },
                                     { id: "check-free", label: "배송비무료" },
                                     { id: "check-price", label: "금액별배송" },
                                     { id: "check-qty", label: "수량별배송" },
                                     { id: "check-weight", label: "무게별배송" },
                                     { id: "check-fixed", label: "고정배송비" }
                                 ].map(item => (
                                     <div key={item.id} className="flex items-center space-x-2">
                                        <Checkbox id={item.id} defaultChecked={item.checked} className={item.id === "check-all" ? "bg-red-500 border-red-500 text-white" : ""} />
                                        <Label htmlFor={item.id}>{item.label}</Label>
                                     </div>
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
                        <Select defaultValue="regDesc">
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="등록일 ↓" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="regDesc">등록일 ↓</SelectItem>
                                <SelectItem value="regAsc">등록일 ↑</SelectItem>
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
                    </div>
                </div>

                <div className="border-t-2 border-gray-800 border-b border-gray-300">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#A4A4A4]/20 hover:bg-[#A4A4A4]/20 text-xs text-center font-bold text-gray-700 h-10">
                                <TableHead className="w-10 text-center p-0">
                                    <Checkbox 
                                        className="translate-y-[2px]" 
                                        checked={products.length > 0 && selectedIds.length === products.length}
                                        onCheckedChange={handleSelectPage}
                                    />
                                </TableHead>
                                <TableHead className="w-16 text-center text-white bg font-bold">번호</TableHead>
                                <TableHead className="text-center font-bold">상품코드</TableHead>
                                <TableHead className="text-center font-bold">이미지</TableHead>
                                <TableHead className="text-center font-bold w-[300px]">상품명</TableHead>
                                <TableHead className="text-center font-bold">공급사</TableHead>
                                <TableHead className="text-center font-bold">노출상태</TableHead>
                                <TableHead className="text-center font-bold">판매상태</TableHead>
                                <TableHead className="text-center font-bold">판매가</TableHead>
                                <TableHead className="text-center font-bold">배송비</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="h-40 text-center">로딩중...</TableCell>
                                </TableRow>
                            ) : products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="h-40 text-center">검색된 상품이 없습니다.</TableCell>
                                </TableRow>
                            ) : (
                                products.map((item, index) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50 text-center text-xs text-gray-600 h-16 border-b border-gray-200">
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
                                                <div className="w-10 h-10 bg-gray-100 object-cover flex items-center justify-center text-[10px] text-gray-400">img</div> 
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-left pl-4 font-normal text-gray-800">{item.name}</TableCell>
                                        <TableCell>{item.supplier}</TableCell>
                                        <TableCell>{item.displayStatus}</TableCell>
                                        <TableCell>{item.saleStatus}</TableCell>
                                        <TableCell>{item.price?.toLocaleString()}원</TableCell>
                                        <TableCell>{item.shippingFee}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
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

            {/* Bulk Action Controls / Condition Settings */}
             <div className="mt-10 border border-gray-300 bg-gray-50 flex">
                 {/* Left Side: Setting Type Select */}
                 <div className="w-40 border-r border-gray-300 p-4 flex flex-col items-center justify-center gap-2">
                     <Select defaultValue="shipping">
                        <SelectTrigger className="w-full bg-white"><SelectValue placeholder="배송비" /></SelectTrigger>
                        <SelectContent><SelectItem value="shipping">배송비</SelectItem></SelectContent>
                     </Select>
                     <span className="text-xs font-bold text-gray-700">조건설정</span>
                 </div>

                 {/* Right Side: Detailed Settings */}
                 <div className="flex-1 p-6 space-y-4 bg-white">
                      <div className="flex items-center gap-2">
                         <Checkbox id="bulk-update-shipping" checked={isAllSelected} onCheckedChange={(c) => setIsAllSelected(!!c)} disabled />
                         <Label htmlFor="bulk-update-shipping" className="text-xs text-gray-700">검색된 상품 전체({totalCount}개 상품)를 수정합니다. (미구현)</Label>
                     </div>
                     <div className="text-red-500 text-xs font-bold flex items-center gap-1">
                         <span className="bg-red-500 text-white text-[10px] px-1 rounded-sm">!</span> 상품수가 많은 경우 비권장합니다. 가능하면 한 페이지씩 선택하여 수정하세요.
                     </div>
                     
                     <div className="flex items-center border border-gray-200">
                         <div className="w-32 bg-gray-50 p-3 pl-4 font-bold text-gray-700 text-xs border-r border-gray-200">
                             배송비 선택
                         </div>
                         <div className="flex-1 p-3 flex items-center gap-2">
                            <Select value={targetPolicyId} onValueChange={setTargetPolicyId}>
                                <SelectTrigger className="w-48 h-7 text-xs">
                                     <SelectValue placeholder="배송비 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    {shippingPolicies.length > 0 ? (
                                        shippingPolicies.map(policy => (
                                            <SelectItem key={policy.id} value={policy.id.toString()}>{policy.name}</SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="none" disabled>등록된 배송 정책이 없습니다.</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            <span className="text-[11px] text-gray-500 flex items-center gap-1">
                                <span className="bg-gray-700 text-white text-[10px] px-1 rounded-sm">!</span>
                                배송비는 <Link href="#" className="text-blue-500 underline hover:text-blue-600">[기본설정{'>'}배송 정책{'>'}배송비조건 관리]</Link>에서 추가할 수 있습니다.
                            </span>
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
                         <h4 className="text-sm font-bold text-gray-700 mb-1">[상품 정보] 조건설정은 무엇인가요?</h4>
                         <p>· 검색된 전체 또는 일부 상품의 "배송비" 또는 "배송일정"을 일괄 수정 가능합니다.</p>
                         <p className="text-red-500 mt-1">- 검색된 상품수가 많은 경우 전체 상품의 정보를 일괄로 수정하는 것은 권장하지 않습니다.</p>
                         <p className="text-red-500">가능하면 한 페이지씩 선택하여 수정하시는 것을 권장합니다.</p>
                         <p className="text-red-500">- 수정 후에는 이전 상태로 복원이 되지 않으므로 설정 시 유의하시기 바랍니다.</p>
                    </div>
                    <div className="space-y-1 pt-2">
                        <p>· 배송비 선택 : 상품에 등록할 배송비 조건을 선택 등록합니다.</p>
                        <p>· "<Link href="#" className="text-blue-500 hover:underline">기본설정 {'>'} 배송 정책 {'>'} 배송비조건 관리</Link>" 메뉴에 등록된 배송비 조건이 노출됩니다.</p>
                        <p>· 등록된 배송비는 쇼핑몰 상품 상세페이지의 "배송비" 항목에 노출 됩니다.</p>
                    </div>
                     <div className="space-y-1 pt-2">
                        <p>· 배송일정 : 상품의 배송일정(발송소요일, 당일발송 기준시간)을 설정 가능합니다.</p>
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
