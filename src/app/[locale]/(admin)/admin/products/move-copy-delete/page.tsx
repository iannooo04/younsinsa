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
import { Link } from "@/i18n/routing";
import SupplierPopup from "@/components/admin/SupplierPopup";
import BrandPopup from "@/components/admin/BrandPopup";
import CategoryPopup from "@/components/admin/CategoryPopup";
import { 
    getProductsAction, 
    deleteProductsAction, 
    moveProductsCategoryAction, 
    copyProductsAction, 
    changeProductsBrandAction, 
    releaseProductsConnectionAction,
    getCategoriesSimpleAction
} from "@/actions/product-actions";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown, Book, Youtube, ChevronUp } from "lucide-react";

export default function ProductMoveCopyDeletePage() {
    // Data State
    const [products, setProducts] = useState<{
        id: string;
        productCode: string;
        image: null;
        name: string;
        supplier: string;
        brand: string;
        displayStatus: string;
        saleStatus: string;
        stockStatus: string;
        stock: string;
        price: number;
        shippingFee: string;
        createdAt: Date;
        deletedAt: Date | null;
    }[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    
    // Pagination State
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter State
    const [supplierType, setSupplierType] = useState('all'); // Not implemented in backend yet fully but added to UI
    const [searchType, setSearchType] = useState('productName');
    const [keyword, setKeyword] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateType, setDateType] = useState('regDate');
    
    // Advanced Search State
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
    const [categoryFilters, setCategoryFilters] = useState(['', '', '', '']);
    const [isUncategorized, setIsUncategorized] = useState(false);
    const [mainClassifications, setMainClassifications] = useState(['', '']);
    const [isNoBrand, setIsNoBrand] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minMileage, setMinMileage] = useState('');
    const [maxMileage, setMaxMileage] = useState('');
    const [mileageMethod, setMileageMethod] = useState('all');
    const [minStock, setMinStock] = useState('');
    const [maxStock, setMaxStock] = useState('');
    const [useOption, setUseOption] = useState('all');
    const [useTextOption, setUseTextOption] = useState('all');
    const [useAdditionalProduct, setUseAdditionalProduct] = useState('all');
    const [pcDisplayStatus, setPcDisplayStatus] = useState('all');
    const [pcSaleStatus, setPcSaleStatus] = useState('all');
    const [mobileDisplayStatus, setMobileDisplayStatus] = useState('all');
    const [mobileSaleStatus, setMobileSaleStatus] = useState('all');
    const [stockType, setStockType] = useState('all');
    const [soldOutStatus, setSoldOutStatus] = useState('all');
    const [shippingFeeType, setShippingFeeType] = useState('all');
    // const [shippingFeeDetails, setShippingFeeDetails] = useState<string[]>([]);
    
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
    
    // Supplier Popup State
    const [isSupplierPopupOpen, setIsSupplierPopupOpen] = useState(false);
    const [selectedSupplierName, setSelectedSupplierName] = useState<string>("");

    // Brand Popup State
    const [isBrandPopupOpen, setIsBrandPopupOpen] = useState(false);
    const [selectedBrandInfo, setSelectedBrandInfo] = useState<{id: string, name: string} | null>(null);
    
    // Selection State
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isAllSelected, setIsAllSelected] = useState(false); // For "Select All Search Results" logic if needed

    // Metadata for Dropdowns
    const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
    // const [brands, setBrands] = useState<{id: string, name: string}[]>([]);
    
    // Action Inputs
    const [bulkCategories, setBulkCategories] = useState<{id: string, name: string, code?: string, isMain: boolean}[]>([]);
    const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);

    // Trigger for refetching
    const [searchTrigger, setSearchTrigger] = useState(0);

    // Fetch Initial Metadata
    useEffect(() => {
        getCategoriesSimpleAction().then(setCategories);
        // getBrandsSimpleAction().then(setBrands);
    }, []);

    // Fetch Products
    const fetchData = useCallback(async () => {
        setLoading(true);
        const result = await getProductsAction(page, pageSize, {
            searchType,
            keyword,
            startDate,
            endDate,
            dateType,
            supplierType
        });

        if (result.success) {
            setProducts(result.items);
            setTotalCount(result.totalCount);
        }
        setLoading(false);
    }, [page, pageSize, searchType, keyword, startDate, endDate, dateType, supplierType]);

    useEffect(() => {
        fetchData();
    }, [fetchData, searchTrigger]);

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
    
    // Actions
    const handleDelete = async () => {
        if (selectedIds.length === 0) return alert("선택된 상품이 없습니다.");
        if (!confirm("선택한 상품을 삭제하시겠습니까?")) return;
        
        const result = await deleteProductsAction(selectedIds);
        alert(result.message);
        if (result.success) {
            setSelectedIds([]);
            fetchData();
        }
    };

    const handleMoveCategory = async () => {
        if (selectedIds.length === 0) return alert("선택된 상품이 없습니다.");
        const targetCategory = bulkCategories.find(c => c.isMain) || bulkCategories[0];
        if (!targetCategory) return alert("이동할 카테고리를 선택해주세요.");
        if (!confirm("선택한 상품의 카테고리를 이동하시겠습니까?")) return;

        const result = await moveProductsCategoryAction(selectedIds, targetCategory.id);
        alert(result.message);
        if (result.success) {
            setSelectedIds([]);
            fetchData();
        }
    };
    
    const handleCopyCategory = async () => {
        if (selectedIds.length === 0) return alert("선택된 상품이 없습니다.");
         // Copy needs a target category? or just dup in same? Logic says "Copy to Selected Category"
        const targetCategory = bulkCategories.find(c => c.isMain) || bulkCategories[0];
        if (!targetCategory) return alert("복사할 대상 카테고리를 선택해주세요.");
        if (!confirm("선택한 상품을 해당 카테고리로 복사하시겠습니까?")) return;

        const result = await copyProductsAction(selectedIds, targetCategory.id);
        alert(result.message);
        if (result.success) {
            setSelectedIds([]);
            fetchData();
        }
    };
    
    // Just simple copy in place if no category selected? 
    // Button says "Copy" next to Category Selection, so it implies Copy to that Category.

    const handleChangeBrand = async () => {
         if (selectedIds.length === 0) return alert("선택된 상품이 없습니다.");
        if (!selectedBrandInfo?.id) return alert("교체할 브랜드를 선택해주세요.");
        if (!confirm("선택한 상품의 브랜드를 교체하시겠습니까?")) return;

        const result = await changeProductsBrandAction(selectedIds, selectedBrandInfo.id);
        alert(result.message);
        if (result.success) {
            setSelectedIds([]);
            fetchData();
        }
    };

    const handleReleaseBrand = async () => {
        if (selectedIds.length === 0) return alert("선택된 상품이 없습니다.");
        if (!confirm("선택한 상품의 브랜드를 해제하시겠습니까?")) return;

        const result = await releaseProductsConnectionAction(selectedIds, 'brand');
        alert(result.message);
        if (result.success) {
             setSelectedIds([]);
            fetchData();
        }
    };
    
    // Date Helpers
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
                <h1 className="text-2xl font-bold text-gray-900">상품 이동/복사/삭제 관리</h1>
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
                            <RadioGroup 
                                value={supplierType} 
                                onValueChange={(val) => {
                                    setSupplierType(val);
                                    if (val === 'supplier') {
                                        setIsSupplierPopupOpen(true);
                                    }
                                }} 
                                className="flex items-center gap-6"
                            >
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
                                    <Button 
                                        variant="secondary" 
                                        className="h-7 text-xs bg-gray-400 text-white hover:bg-gray-500 rounded-sm ml-2"
                                        onClick={() => setIsSupplierPopupOpen(true)}
                                    >
                                        공급사 선택
                                    </Button>
                                    {selectedSupplierName && (
                                        <span className="text-xs text-blue-600 font-medium ml-2">
                                            선택됨: {selectedSupplierName}
                                        </span>
                                    )}
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 2: Search Term */}
                    <div className="flex items-center border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">검색어</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Select value={searchType} onValueChange={setSearchType}>
                                <SelectTrigger className="w-[140px] h-8 text-xs">
                                    <SelectValue placeholder="상품명" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="productName">상품명</SelectItem>
                                    <SelectItem value="productCode">상품코드</SelectItem>
                                    <SelectItem value="internalCode">자체상품코드</SelectItem>
                                    <SelectItem value="keyword">검색 키워드</SelectItem>
                                    <div className="flex items-center justify-center py-1 text-gray-300 text-[10px] select-none">
                                        ==========
                                    </div>
                                    <SelectItem value="manufacturer">제조사</SelectItem>
                                    <SelectItem value="origin">원산지</SelectItem>
                                    <SelectItem value="modelNumber">모델번호</SelectItem>
                                    <SelectItem value="hsCode">HS코드</SelectItem>
                                    <SelectItem value="additional">추가항목</SelectItem>
                                    <div className="flex items-center justify-center py-1 text-gray-300 text-[10px] select-none">
                                        ==========
                                    </div>
                                    <SelectItem value="adminMemo">관리자 메모</SelectItem>
                                    <SelectItem value="supplierName">공급사명</SelectItem>
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
                                    onChange={e => setStartDate(e.target.value)}
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
                                    onChange={e => setEndDate(e.target.value)}
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
                                        className={`h-8 px-3 text-xs rounded-sm bg-white text-gray-600 border-gray-300 hover:bg-gray-50`}
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
                        {/* Row 4: Category */}
                        <div className="flex items-center border-b border-gray-200">
                            <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">카테고리</div>
                            <div className="flex-1 p-3 flex items-center gap-2">
                                {[0, 1, 2, 3].map(i => (
                                    <Select key={i} value={categoryFilters[i]} onValueChange={(val) => {
                                        const newFilters = [...categoryFilters];
                                        newFilters[i] = val;
                                        setCategoryFilters(newFilters);
                                    }}>
                                        <SelectTrigger className="w-40 h-8 text-xs">
                                            <SelectValue placeholder="=카테고리선택=" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                ))}
                                <div className="flex items-center space-x-2 ml-4 shrink-0">
                                    <Checkbox id="no-category" checked={isUncategorized} onCheckedChange={(val) => setIsUncategorized(!!val)} />
                                    <Label htmlFor="no-category" className="text-xs whitespace-nowrap">카테고리 미지정 상품</Label>
                                </div>
                            </div>
                        </div>

                        {/* Row 5: Main Classification */}
                        <div className="flex items-center border-b border-gray-200">
                            <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">메인분류</div>
                            <div className="flex-1 p-3 flex items-center gap-2">
                                <Select value={mainClassifications[0]} onValueChange={(val) => setMainClassifications([val, mainClassifications[1]])}>
                                    <SelectTrigger className="w-40 h-8 text-xs">
                                        <SelectValue placeholder="=전체=" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">=전체=</SelectItem>
                                        <SelectItem value="pc">PC쇼핑몰</SelectItem>
                                        <SelectItem value="mobile">모바일쇼핑몰</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={mainClassifications[1]} onValueChange={(val) => setMainClassifications([mainClassifications[0], val])}>
                                    <SelectTrigger className="w-56 h-8 text-xs">
                                        <SelectValue placeholder="=메인페이지 분류 선택=" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">전체</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Row 6: Brand & Price */}
                        <div className="flex border-b border-gray-200">
                            <div className="flex-1 flex border-r border-gray-200">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">브랜드</div>
                                <div className="flex-1 p-3 flex items-center gap-4">
                                    <Button 
                                        variant="outline" 
                                        className="h-8 text-xs border-gray-300 rounded-sm" 
                                        onClick={() => setIsBrandPopupOpen(true)}
                                    >
                                        브랜드선택
                                    </Button>
                                    {selectedBrandInfo && (
                                        <span className="text-xs text-blue-600 font-medium">
                                            {selectedBrandInfo.name}
                                        </span>
                                    )}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="no-brand" checked={isNoBrand} onCheckedChange={(val) => setIsNoBrand(!!val)} />
                                        <Label htmlFor="no-brand" className="text-xs whitespace-nowrap">브랜드 미지정 상품</Label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">판매가</div>
                                <div className="flex-1 p-3 flex items-center gap-2">
                                    <Input className="w-24 h-8" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                                    <span className="text-xs whitespace-nowrap font-medium text-gray-600">이상 ~</span>
                                    <Input className="w-24 h-8" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                                    <span className="text-xs whitespace-nowrap font-medium text-gray-600">이하</span>
                                </div>
                            </div>
                        </div>

                        {/* Row 7: Mileage & Method */}
                        <div className="flex border-b border-gray-200">
                            <div className="flex-1 flex border-r border-gray-200">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">마일리지</div>
                                <div className="flex-1 p-3 flex items-center gap-2">
                                    <Input className="w-24 h-8" value={minMileage} onChange={e => setMinMileage(e.target.value)} />
                                    <span className="text-xs whitespace-nowrap font-medium text-gray-600">이상 ~</span>
                                    <Input className="w-24 h-8" value={maxMileage} onChange={e => setMaxMileage(e.target.value)} />
                                    <span className="text-xs whitespace-nowrap font-medium text-gray-600">이하</span>
                                </div>
                            </div>
                            <div className="flex-1 flex">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">마일리지 지급방법</div>
                                <div className="flex-1 p-3 flex items-center gap-4">
                                    <RadioGroup value={mileageMethod} onValueChange={setMileageMethod} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="mileage-all" />
                                            <Label htmlFor="mileage-all" className="text-xs">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="integrated" id="mileage-integrated" />
                                            <Label htmlFor="mileage-integrated" className="text-xs">통합설정</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="individual" id="mileage-individual" />
                                            <Label htmlFor="mileage-individual" className="text-xs">개별설정</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>

                        {/* Row 8: Stock & Option Use */}
                        <div className="flex border-b border-gray-200">
                            <div className="flex-1 flex border-r border-gray-200">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">상품 재고</div>
                                <div className="flex-1 p-3 flex items-center gap-2">
                                    <Input className="w-24 h-8" value={minStock} onChange={e => setMinStock(e.target.value)} />
                                    <span className="text-xs whitespace-nowrap font-medium text-gray-600">개 이상 ~</span>
                                    <Input className="w-24 h-8" value={maxStock} onChange={e => setMaxStock(e.target.value)} />
                                    <span className="text-xs whitespace-nowrap font-medium text-gray-600">개 이하</span>
                                </div>
                            </div>
                            <div className="flex-1 flex">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">옵션 사용</div>
                                <div className="flex-1 p-3 flex items-center gap-4">
                                    <RadioGroup value={useOption} onValueChange={setUseOption} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="option-all" />
                                            <Label htmlFor="option-all" className="text-xs">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="use" id="option-use" />
                                            <Label htmlFor="option-use" className="text-xs">사용함</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="option-no" />
                                            <Label htmlFor="option-no" className="text-xs">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>

                        {/* Row 9: Text Option & Additional Product */}
                        <div className="flex border-b border-gray-200">
                            <div className="flex-1 flex border-r border-gray-200">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">텍스트옵션 사용</div>
                                <div className="flex-1 p-3 flex items-center gap-4">
                                    <RadioGroup value={useTextOption} onValueChange={setUseTextOption} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="text-option-all" />
                                            <Label htmlFor="text-option-all" className="text-xs">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="use" id="text-option-use" />
                                            <Label htmlFor="text-option-use" className="text-xs">사용함</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="text-option-no" />
                                            <Label htmlFor="text-option-no" className="text-xs">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            <div className="flex-1 flex">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">추가상품 사용</div>
                                <div className="flex-1 p-3 flex items-center gap-4">
                                    <RadioGroup value={useAdditionalProduct} onValueChange={setUseAdditionalProduct} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="additional-all" />
                                            <Label htmlFor="additional-all" className="text-xs">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="use" id="additional-use" />
                                            <Label htmlFor="additional-use" className="text-xs">사용함</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="additional-no" />
                                            <Label htmlFor="additional-no" className="text-xs">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>

                        {/* Row 10: PC Display & Sale Status */}
                        <div className="flex border-b border-gray-200">
                            <div className="flex-1 flex border-r border-gray-200">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 leading-tight">PC쇼핑몰<br/>상품노출 상태</div>
                                <div className="flex-1 p-3 flex items-center gap-4">
                                    <RadioGroup value={pcDisplayStatus} onValueChange={setPcDisplayStatus} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="pc-display-all" />
                                            <Label htmlFor="pc-display-all" className="text-xs">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="display" id="pc-display-yes" />
                                            <Label htmlFor="pc-display-yes" className="text-xs">노출함</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="hidden" id="pc-display-no" />
                                            <Label htmlFor="pc-display-no" className="text-xs">노출안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            <div className="flex-1 flex">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 leading-tight">PC쇼핑몰<br/>상품판매 상태</div>
                                <div className="flex-1 p-3 flex items-center gap-4">
                                    <RadioGroup value={pcSaleStatus} onValueChange={setPcSaleStatus} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="pc-sale-all" />
                                            <Label htmlFor="pc-sale-all" className="text-xs">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="sale" id="pc-sale-yes" />
                                            <Label htmlFor="pc-sale-yes" className="text-xs">판매함</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="stop" id="pc-sale-no" />
                                            <Label htmlFor="pc-sale-no" className="text-xs">판매안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>

                        {/* Row 11: Mobile Display & Sale Status */}
                        <div className="flex border-b border-gray-200">
                            <div className="flex-1 flex border-r border-gray-200">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 leading-tight">모바일쇼핑몰<br/>상품노출 상태</div>
                                <div className="flex-1 p-3 flex items-center gap-4">
                                    <RadioGroup value={mobileDisplayStatus} onValueChange={setMobileDisplayStatus} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="mobile-display-all" />
                                            <Label htmlFor="mobile-display-all" className="text-xs">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="display" id="mobile-display-yes" />
                                            <Label htmlFor="mobile-display-yes" className="text-xs">노출함</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="hidden" id="mobile-display-no" />
                                            <Label htmlFor="mobile-display-no" className="text-xs">노출안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            <div className="flex-1 flex">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 leading-tight">모바일쇼핑몰<br/>상품판매 상태</div>
                                <div className="flex-1 p-3 flex items-center gap-4">
                                    <RadioGroup value={mobileSaleStatus} onValueChange={setMobileSaleStatus} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="mobile-sale-all" />
                                            <Label htmlFor="mobile-sale-all" className="text-xs">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="sale" id="mobile-sale-yes" />
                                            <Label htmlFor="mobile-sale-yes" className="text-xs">판매함</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="stop" id="mobile-sale-no" />
                                            <Label htmlFor="mobile-sale-no" className="text-xs">판매안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>

                        {/* Row 12: Sale Stock & Sold Out Status */}
                        <div className="flex border-b border-gray-200">
                            <div className="flex-1 flex border-r border-gray-200">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">판매 재고</div>
                                <div className="flex-1 p-3 flex items-center gap-4">
                                    <RadioGroup value={stockType} onValueChange={setStockType} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="stock-type-all" />
                                            <Label htmlFor="stock-type-all" className="text-xs">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="limitless" id="stock-type-limitless" />
                                            <Label htmlFor="stock-type-limitless" className="text-xs">무한정 판매</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="limit" id="stock-type-limit" />
                                            <Label htmlFor="stock-type-limit" className="text-xs">재고량에 따름</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            <div className="flex-1 flex">
                                <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">품절 상태</div>
                                <div className="flex-1 p-3 flex items-center gap-4">
                                    <RadioGroup value={soldOutStatus} onValueChange={setSoldOutStatus} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="soldout-all" />
                                            <Label htmlFor="soldout-all" className="text-xs">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="soldout" id="soldout-yes" />
                                            <Label htmlFor="soldout-yes" className="text-xs">품절</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="normal" id="soldout-no" />
                                            <Label htmlFor="soldout-no" className="text-xs">정상</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>

                        {/* Row 14: Shipping Fee Condition */}
                        <div className="flex">
                            <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 leading-tight">배송비 조건</div>
                            <div className="flex-1 p-3 space-y-3">
                                <RadioGroup value={shippingFeeType} onValueChange={setShippingFeeType} className="flex gap-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all" id="ship-all" />
                                        <Label htmlFor="ship-all" className="text-xs">전체</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="policy" id="ship-policy" />
                                        <Label htmlFor="ship-policy" className="text-xs">배송비조건별</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="product" id="ship-product" />
                                        <Label htmlFor="ship-product" className="text-xs">상품별</Label>
                                    </div>
                                </RadioGroup>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="ship-all-chk" />
                                        <Label htmlFor="ship-all-chk" className="text-xs">전체</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="ship-free" />
                                        <Label htmlFor="ship-free" className="text-xs">배송비무료</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="ship-price" />
                                        <Label htmlFor="ship-price" className="text-xs">금액별배송</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="ship-qty" />
                                        <Label htmlFor="ship-qty" className="text-xs">수량별배송</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="ship-weight" />
                                        <Label htmlFor="ship-weight" className="text-xs">무게별배송</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="ship-fixed" />
                                        <Label htmlFor="ship-fixed" className="text-xs">고정배송비</Label>
                                    </div>
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
                        <Select defaultValue="regDesc">
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="등록일 ↓" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="regDesc">등록일 ↓</SelectItem>
                                <SelectItem value="regAsc">등록일 ↑</SelectItem>
                                <SelectItem value="nameDesc">상품명 ↓</SelectItem>
                                <SelectItem value="nameAsc">상품명 ↑</SelectItem>
                                <SelectItem value="supplierDesc">공급사 ↓</SelectItem>
                                <SelectItem value="supplierAsc">공급사 ↑</SelectItem>
                                <SelectItem value="priceDesc">판매가 ↓</SelectItem>
                                <SelectItem value="priceAsc">판매가 ↑</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={pageSize.toString()} onValueChange={v => { setPageSize(Number(v)); setPage(1); }}>
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
                                <TableHead className="text-center font-bold">브랜드</TableHead>
                                <TableHead className="text-center font-bold">노출상태</TableHead>
                                <TableHead className="text-center font-bold">판매상태</TableHead>
                                <TableHead className="text-center font-bold">품절여부</TableHead>
                                <TableHead className="text-center font-bold">재고</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={11} className="h-40 text-center">로딩중...</TableCell>
                                </TableRow>
                            ) : products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={11} className="h-40 text-center">검색된 상품이 없습니다.</TableCell>
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
                                        <TableCell>{item.brand}</TableCell>
                                        <TableCell>{item.displayStatus}</TableCell>
                                        <TableCell>{item.saleStatus}</TableCell>
                                        <TableCell>{item.stockStatus}</TableCell>
                                        <TableCell>{item.stock}</TableCell>
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

            {/* Bulk Action Controls */}
             <div className="mt-10 border-t-2 border-gray-400">
                 <div className="flex items-center gap-2 py-4">
                     <Checkbox id="bulk-update" checked={isAllSelected} onCheckedChange={(c) => setIsAllSelected(!!c)} />
                     <Label htmlFor="bulk-update" className="text-xs text-gray-700 font-medium">검색된 상품 전체({totalCount}개 상품)를 수정합니다.</Label>
                 </div>
                 <div className="text-red-500 text-xs font-bold flex items-center gap-1 mb-4">
                     <span className="bg-red-500 text-white text-[10px] px-1 rounded-sm font-bold flex items-center justify-center w-4 h-4">!</span> 상품수가 많은 경우 비권장합니다. 가능하면 한 페이지씩 선택하여 수정하세요.
                 </div>

                 {/* Action Rows */}
                 <div className="border border-gray-300">
                     {/* Category Row */}
                     <div className="flex border-b border-gray-200">
                         <div className="w-32 bg-gray-50 p-4 border-r border-gray-200 flex items-center font-bold text-gray-700 text-xs text-center justify-center">
                             카테고리<br/>연결/이동/복사
                         </div>
                         <div className="flex-1 p-4 space-y-3 bg-white">
                             <div className="flex items-center gap-1">
                                 <Button 
                                    variant="outline" 
                                    className="h-7 text-xs border-gray-300 rounded-none !bg-gray-500 text-white !hover:bg-gray-500 px-3 shrink-0"
                                    onClick={() => setIsCategoryPopupOpen(true)}
                                 >
                                    카테고리 선택
                                 </Button>
                                 <Button variant="outline" className="h-7 text-xs border-gray-300 rounded-none bg-white text-gray-700 hover:bg-gray-50 px-3 shrink-0" disabled={bulkCategories.length === 0}>연결</Button>
                                 <Button variant="outline" onClick={handleMoveCategory} className="h-7 text-xs border-gray-300 rounded-none bg-white text-gray-700 hover:bg-gray-50 px-3 shrink-0" disabled={bulkCategories.length === 0}>이동</Button>
                                 <Button variant="outline" onClick={handleCopyCategory} className="h-7 text-xs border-gray-300 rounded-none bg-white text-gray-700 hover:bg-gray-50 px-3 shrink-0" disabled={bulkCategories.length === 0}>복사</Button>
                             </div>
                             
                             <div className="flex gap-2 items-start text-[11px] text-gray-500 py-1">
                                 <span className="font-bold text-white bg-[#666] px-1 rounded-[2px] text-[10px] w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">!</span>
                                 <div className="space-y-0.5">
                                    <p>상품 연결/이동/복사를 원하지 않는 카테고리는 ‘삭제’버튼을 이용하여 삭제할 수 있습니다.</p>
                                    <p>등록하신 카테고리 중 체크된 카테고리가 대표 카테고리로 설정됩니다.</p>
                                 </div>
                             </div>

                             {/* Category Sub-table */}
                             <div className="border border-gray-300 mt-2 max-w-4xl overflow-hidden rounded-sm">
                                 <Table className="border-collapse w-full">
                                     <TableHeader className="bg-[#A4A4A4] hover:bg-[#A4A4A4]">
                                         <TableRow className="h-8 border-none hover:bg-transparent">
                                             <TableHead className="text-white text-center text-[11px] font-bold h-8 border-r border-gray-300 w-24 p-0">대표 설정</TableHead>
                                             <TableHead className="text-white text-center text-[11px] font-bold h-8 border-r border-gray-300 p-0 text-center">카테고리 명</TableHead>
                                             <TableHead className="text-white text-center text-[11px] font-bold h-8 border-r border-gray-300 w-32 p-0">카테고리 코드</TableHead>
                                             <TableHead className="text-white text-center text-[11px] font-bold h-8 w-16 p-0">삭제</TableHead>
                                         </TableRow>
                                     </TableHeader>
                                     <TableBody>
                                         {bulkCategories.length === 0 ? (
                                             <TableRow className="h-20 border-none bg-white">
                                                 <TableCell colSpan={4} className="text-center text-[11px] text-gray-400 py-4 h-20">
                                                     카테고리를 선택해주세요.
                                                 </TableCell>
                                             </TableRow>
                                         ) : (
                                            bulkCategories.map((cat, idx) => (
                                                <TableRow key={cat.id || idx} className="h-8 border-b border-gray-200">
                                                    <TableCell className="text-center py-1">
                                                        <Checkbox 
                                                            checked={cat.isMain} 
                                                            onCheckedChange={() => {
                                                                setBulkCategories(prev => prev.map((c, i) => ({ ...c, isMain: i === idx })));
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-left py-1 text-[11px] px-4 font-normal text-gray-700">{cat.name}</TableCell>
                                                    <TableCell className="text-center py-1 text-[11px]">{cat.code || '-'}</TableCell>
                                                    <TableCell className="text-center py-1">
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm" 
                                                            className="h-5 text-[10px] px-2 py-0 border-gray-300 rounded-none bg-white font-normal"
                                                            onClick={() => setBulkCategories(prev => prev.filter((_, i) => i !== idx))}
                                                        >삭제</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                         )}
                                     </TableBody>
                                 </Table>
                             </div>
                             <div className="mt-2 text-left">
                                 <Button 
                                    variant="outline" 
                                    className="h-7 text-xs border-none rounded-none !bg-gray-500 text-white !hover:bg-gray-500 px-3"
                                    onClick={() => setBulkCategories([])}
                                    disabled={bulkCategories.length === 0}
                                 >전체삭제</Button>
                             </div>
                         </div>
                     </div>

                     {/* Brand Row */}
                     <div className="flex border-b border-gray-200">
                         <div className="w-32 bg-gray-50 p-4 border-r border-gray-200 flex items-center font-bold text-gray-700 text-xs">
                             브랜드 교체
                         </div>
                         <div className="flex-1 p-4 flex items-center gap-1 bg-white">
                             <Button 
                                variant="outline" 
                                className="h-7 text-xs border-gray-300 rounded-none !bg-gray-500 text-white !hover:bg-gray-500 px-3"
                                onClick={() => setIsBrandPopupOpen(true)}
                             >
                                브랜드 선택
                             </Button>
                             {selectedBrandInfo && (
                                <span className="text-xs text-blue-600 font-medium ml-2">
                                    {selectedBrandInfo.name}
                                </span>
                             )}
                             <Button variant="outline" onClick={handleChangeBrand} className="h-7 text-xs border-gray-300 rounded-none bg-white text-gray-700 hover:bg-gray-50 px-3 shrink-0" disabled={!selectedBrandInfo}>교체</Button>
                         </div>
                     </div>

                     {/* Full Release Row */}
                     <div className="flex border-b border-gray-200">
                         <div className="w-32 bg-gray-50 p-4 border-r border-gray-200 flex items-center font-bold text-gray-700 text-xs">
                             <Select defaultValue="full">
                                 <SelectTrigger className="h-8 text-xs w-full bg-white">
                                     <SelectValue placeholder="전체 해제" />
                                 </SelectTrigger>
                                 <SelectContent>
                                     <SelectItem value="full">전체 해제</SelectItem>
                                     <SelectItem value="category">카테고리 부분 해제</SelectItem>
                                     <SelectItem value="brand">브랜드 부분 해제</SelectItem>
                                 </SelectContent>
                             </Select>
                         </div>
                         <div className="flex-1 p-4 space-y-2">
                             <div className="flex gap-2">
                                <Button className="h-7 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-none font-bold border-0 px-4" disabled={true}>카테고리 전체 해제</Button>
                                <Button onClick={handleReleaseBrand} className="h-7 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-none font-bold border-0 px-4">브랜드 전체 해제</Button>
                             </div>
                             <div className="flex gap-1 items-start text-[11px] text-gray-500">
                                 <span className="font-bold text-gray-500 px-1 border border-gray-400 rounded-[2px] text-[10px] h-4 flex items-center justify-center">!</span>
                                 <div className="space-y-0.5">
                                    <p>카테고리 전체 해제 : 상품에 연결된 모든 카테고리 정보를 전체 삭제 합니다.</p>
                                    <p>브랜드 전체 해제 : 상품에 연결된 브랜드 정보를 전체 삭제 합니다.</p>
                                 </div>
                             </div>
                         </div>
                     </div>

                     {/* Delete Row */}
                      <div className="flex border-b border-gray-200">
                         <div className="w-32 bg-gray-50 p-4 border-r border-gray-200 flex items-center font-bold text-gray-700 text-xs">
                             상품 삭제
                         </div>
                         <div className="flex-1 p-4">
                             <Button variant="outline" onClick={handleDelete} className="h-7 text-xs border-red-500 text-red-500 bg-white hover:bg-red-50 rounded-none font-medium px-4">삭제</Button>
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

                <div className="space-y-6 text-xs text-gray-500 leading-relaxed">
                    <div className="space-y-1">
                         <h4 className="text-sm font-bold text-gray-700 mb-1">[상품 정보] 카테고리 연결 / 이동 / 복사는 무엇인가요?</h4>
                         <p>· 연결 : 선택된 상품을 해당 카테고리에 추가로 연결합니다.</p>
                         <p>· 이동 : 선택된 상품을 해당 카테고리로 이동시킵니다. 이동하는 경우 기존 연결된 카테고리는 삭제됩니다.</p>
                         <p>· 복사 : 선택된 상품을 해당 카테고리에 복사합니다. 해당 상품과 상품코드만 다른 상품이 선택한 카테고리에 추가로 생성됩니다.</p>
                    </div>
                     <div className="space-y-1">
                         <h4 className="text-sm font-bold text-gray-700 mb-1">[상품 정보] 브랜드 교체는 무엇인가요?</h4>
                         <p>· 검색된 전체 또는 일부 상품의 브랜드를 선택한 브랜드로 변경합니다. 교체하는 경우 기존 브랜드 정보는 삭제됩니다.</p>
                    </div>
                     <div className="space-y-1">
                         <h4 className="text-sm font-bold text-gray-700 mb-1">[상품 정보] 해제는 무엇인가요?</h4>
                         <p>· 검색된 전체 또는 일부 상품의 "카테고리, 브랜드" 정보를 일괄로 삭제가 가능합니다.</p>
                    </div>
                     <div className="space-y-1">
                         <h4 className="text-sm font-bold text-gray-700 mb-1">[상품 정보] 상품 삭제는 무엇인가요?</h4>
                         <p>· 검색된 전체 또는 일부 상품에 대해 일괄로 삭제가 가능합니다.</p>
                         <p className="mt-2">(삭제된 상품은 <Link href="/admin/products/deleted" className="text-blue-500 hover:underline">상품 {'>'} 상품 관리 {'>'} 삭제 상품 관리</Link> 메뉴에서 확인 가능합니다.)</p>
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

            <SupplierPopup 
                isOpen={isSupplierPopupOpen}
                onClose={() => setIsSupplierPopupOpen(false)}
                onConfirm={(supplier) => {
                    if (supplier) {
                        setSupplierType('supplier');
                        if (Array.isArray(supplier)) {
                            if (supplier.length > 0) {
                                setSelectedSupplierName(supplier[0].name);
                            }
                        } else {
                            setSelectedSupplierName(supplier.name);
                        }
                    }
                    setIsSupplierPopupOpen(false);
                }}
            />

            <BrandPopup 
                isOpen={isBrandPopupOpen}
                onClose={() => setIsBrandPopupOpen(false)}
                onConfirm={(brand) => {
                    if (brand) {
                        setSelectedBrandInfo({ id: brand.id, name: brand.name });
                    }
                    setIsBrandPopupOpen(false);
                }}
            />

            <CategoryPopup 
                isOpen={isCategoryPopupOpen}
                onClose={() => setIsCategoryPopupOpen(false)}
                onConfirm={(cat) => {
                    if (cat) {
                        if (!bulkCategories.find(c => c.id === cat.id)) {
                            setBulkCategories(prev => [...prev, { id: cat.id, name: cat.name, code: cat.id.slice(0, 8), isMain: prev.length === 0 }]);
                        }
                    }
                    setIsCategoryPopupOpen(false);
                }}
            />
        </div>
    );
}
