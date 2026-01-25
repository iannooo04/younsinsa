"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/ui-table";
import { CalendarIcon, ChevronUp, ChevronDown, ChevronsUp, ChevronsDown } from "lucide-react";

export default function ProductSelectionPage() {
    const router = useRouter();

    // Left Search State
    const [supplierType, setSupplierType] = useState('all');
    const [searchType, setSearchType] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');
    const [dateType, setDateType] = useState('reg_date');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    const [isDetailSearchOpen, setIsDetailSearchOpen] = useState(false);

    // Detailed Search State
    const [isCategoryUnspecified, setIsCategoryUnspecified] = useState(false);
    const [isBrandUnspecified, setIsBrandUnspecified] = useState(false);
    const [pcExposure, setPcExposure] = useState('all');
    const [mobileExposure, setMobileExposure] = useState('all');
    const [pcSales, setPcSales] = useState('all');
    const [mobileSales, setMobileSales] = useState('all');
    const [stockStatus, setStockStatus] = useState('all');
    const [soldOutStatus, setSoldOutStatus] = useState('all');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Mock Data - Source List (Left)
    const sourceProducts = [
        { id: 290, image: '/placeholder.png', name: '여성 엠보 로고 모크넥 티셔츠', price: '278,000원', supplier: '나이아인터내셔널', stock: '∞', status: '정상', tags: ['BEST', '주문폭주'] },
        { id: 289, image: '/placeholder.png', name: '여성 엠보 로고 모크넥 티셔츠', price: '278,000원', supplier: '나이아인터내셔널', stock: '∞', status: '정상', tags: [] },
        { id: 288, image: '/placeholder.png', name: '[26SS] 여성 깅엄 체크 메쉬 레이어드 베이스레이어', price: '338,000원', supplier: '나이아인터내셔널', stock: '∞', status: '정상', tags: [] },
        { id: 287, image: '/placeholder.png', name: '[26SS] 여성 깅엄 체크 메쉬 레이어드 베이스레이어', price: '338,000원', supplier: '나이아인터내셔널', stock: '∞', status: '정상', tags: [] },
    ];

    // Mock Data - Target List (Right)
    const targetProducts = [
        { id: 1, image: '/placeholder.png', name: '[Malbon Golf] 여성 리트리 경량 다운베스트_WHITE (WOMAN)', price: '459,000원', supplier: '나이아인터내셔널', stock: '∞', status: '정상', tags: [] },
        { id: 2, image: '/placeholder.png', name: '미니멀 블랙 프레임', price: '19,800원', supplier: '나이아인터내셔널', stock: '∞', status: '정상', tags: ['NEW', '자체제작'] },
        { id: 3, image: '/placeholder.png', name: '투명 빈티지 클래식', price: '32,040원', supplier: '나이아인터내셔널', stock: '∞', status: '정상', tags: ['최다판매', 'EVENT'] },
        { id: 4, image: '/placeholder.png', name: '크림색 캣아이 선글라스', price: '16,200원', supplier: '나이아인터내셔널', stock: '∞', status: '정상', tags: [] },
        { id: 5, image: '/placeholder.png', name: '투명 실버 선글라스', price: '13,500원', supplier: '나이아인터내셔널', stock: '∞', status: '정상', tags: ['BEST', 'EVENT'] },
        { id: 6, image: '/placeholder.png', name: '스퀘어 크리스탈 루시드', price: '28,800원', supplier: '나이아인터내셔널', stock: '∞', status: '정상', tags: ['주문폭주'] },
        { id: 7, image: '/placeholder.png', name: '클래식 블랙 라운드 선글라스', price: '18,000원', supplier: '나이아인터내셔널', stock: '∞', status: '정상', tags: ['당일발송'] },
    ];

    return (
        <div className="p-4 min-h-screen bg-white font-sans text-xs">
            <div className="flex gap-4 h-full">
                {/* Left Panel: Search & Select */}
                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">상품선택</h1>
                        <span className="text-gray-500 text-xs mt-1">최대 등록 가능한 상품수는 <span className="text-red-500">500</span>개 입니다. 500개 초과시 기존 등록된 상품은 <span className="text-red-500">자동 삭제</span> 됩니다</span>
                    </div>

                    <div className="border border-gray-300">
                        {/* Supplier Type */}
                        <div className="flex border-b border-gray-200">
                             <div className="w-24 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center">공급사 구분</div>
                             <div className="flex-1 p-2 flex items-center gap-4">
                                <RadioGroup value={supplierType} onValueChange={setSupplierType} className="flex gap-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all" id="supp-all" className="text-red-500 border-red-500" />
                                        <Label htmlFor="supp-all">전체</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="head" id="supp-head" />
                                        <Label htmlFor="supp-head">본사</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="supplier" id="supp-supplier" />
                                        <Label htmlFor="supp-supplier">공급사</Label>
                                    </div>
                                </RadioGroup>
                                <Button variant="outline" className="h-6 text-xs bg-gray-300 text-white border-0 hover:bg-gray-400">공급사 선택</Button>
                             </div>
                        </div>

                        {/* Search Word */}
                        <div className="flex border-b border-gray-200">
                             <div className="w-24 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center">검색어</div>
                             <div className="flex-1 p-2 flex items-center gap-2">
                                <Select value={searchType} onValueChange={setSearchType}>
                                    <SelectTrigger className="w-24 h-7 text-xs border-gray-300">
                                        <SelectValue placeholder="상품명" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="name">상품명</SelectItem>
                                        <SelectItem value="code">상품코드</SelectItem>
                                        <SelectItem value="custom_code">자체상품코드</SelectItem>
                                        <SelectItem value="keywords">검색 키워드</SelectItem>
                                        <div className="h-px bg-gray-200 my-1 mx-1" />
                                        <SelectItem value="manufacturer">제조사</SelectItem>
                                        <SelectItem value="origin">원산지</SelectItem>
                                        <SelectItem value="model_no">모델번호</SelectItem>
                                        <SelectItem value="hs_code">HS코드</SelectItem>
                                        <SelectItem value="additional_item">추가항목</SelectItem>
                                        <div className="h-px bg-gray-200 my-1 mx-1" />
                                        <SelectItem value="admin_memo">관리자 메모</SelectItem>
                                        <SelectItem value="supplier_name">공급사명</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="h-7 w-64 border-gray-300" />
                             </div>
                        </div>

                        {/* Period Search */}
                        <div className="flex border-b border-gray-200">
                             <div className="w-24 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center">기간검색</div>
                             <div className="flex-1 p-2 flex items-center gap-2">
                                <Select value={dateType} onValueChange={setDateType}>
                                    <SelectTrigger className="w-24 h-7 text-xs border-gray-300">
                                        <SelectValue placeholder="등록일" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="reg_date">등록일</SelectItem>
                                        <SelectItem value="mod_date">수정일</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex items-center gap-1">
                                    <div className="relative">
                                        <Input 
                                            className="w-28 h-7 text-xs pr-8 border-gray-300 cursor-pointer" 
                                            value={startDate} 
                                            readOnly 
                                            onClick={() => startDateRef.current?.showPicker()}
                                        />
                                        <CalendarIcon 
                                            className="absolute right-2 top-1.5 w-4 h-4 text-gray-400 cursor-pointer" 
                                            onClick={() => startDateRef.current?.showPicker()}
                                        />
                                        <input 
                                            type="date" 
                                            ref={startDateRef}
                                            className="invisible absolute top-0 left-0 w-0 h-0"
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <span>~</span>
                                    <div className="relative">
                                        <Input 
                                            className="w-28 h-7 text-xs pr-8 border-gray-300 cursor-pointer" 
                                            value={endDate} 
                                            readOnly 
                                            onClick={() => endDateRef.current?.showPicker()}
                                        />
                                        <CalendarIcon 
                                            className="absolute right-2 top-1.5 w-4 h-4 text-gray-400 cursor-pointer" 
                                            onClick={() => endDateRef.current?.showPicker()}
                                        />
                                        <input 
                                            type="date" 
                                            ref={endDateRef}
                                            className="invisible absolute top-0 left-0 w-0 h-0"
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                             </div>
                        </div>
                        
                        {/* Detail Search Toggle & Button */}
                        <div 
                            className="p-2 flex justify-between items-center bg-gray-50/50 border-b border-gray-200 cursor-pointer"
                            onClick={() => setIsDetailSearchOpen(!isDetailSearchOpen)}
                        >
                             <div className="text-blue-500 text-xs hover:underline flex items-center">
                                {isDetailSearchOpen ? '상세검색 닫힘' : '상세검색 펼침'} 
                                {isDetailSearchOpen ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
                             </div>
                        </div>

                        {/* Detailed Search Content */}
                        {isDetailSearchOpen && (
                            <div className="bg-white">
                                {/* Category */}
                                <div className="flex border-b border-gray-200">
                                    <div className="w-24 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">카테고리</div>
                                    <div className="flex-1 p-2 flex flex-col gap-2">
                                        <div className="flex gap-1">
                                            <Select><SelectTrigger className="w-40 h-7 text-xs border-gray-300"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger><SelectContent /></Select>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Checkbox 
                                                id="cat-unspecified" 
                                                checked={isCategoryUnspecified} 
                                                onCheckedChange={(c) => setIsCategoryUnspecified(!!c)} 
                                                className="w-4 h-4 border-gray-300 rounded-sm"
                                            />
                                            <Label htmlFor="cat-unspecified" className="font-normal text-gray-700">카테고리 미지정 상품</Label>
                                        </div>
                                    </div>
                                </div>

                                {/* Brand */}
                                <div className="flex border-b border-gray-200">
                                    <div className="w-24 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">브랜드</div>
                                    <div className="flex-1 p-2 flex flex-col gap-2">
                                        <div className="flex gap-1">
                                            <Select><SelectTrigger className="w-40 h-7 text-xs border-gray-300"><SelectValue placeholder="=브랜드선택=" /></SelectTrigger><SelectContent /></Select>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Checkbox 
                                                id="brand-unspecified" 
                                                checked={isBrandUnspecified} 
                                                onCheckedChange={(c) => setIsBrandUnspecified(!!c)} 
                                                className="w-4 h-4 border-gray-300 rounded-sm"
                                            />
                                            <Label htmlFor="brand-unspecified" className="font-normal text-gray-700">브랜드 미지정 상품</Label>
                                        </div>
                                    </div>
                                </div>

                                {/* PC Display Status */}
                                <div className="flex border-b border-gray-200">
                                    <div className="w-24 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 leading-tight">PC쇼핑몰<br/>상품노출<br/>상태</div>
                                    <div className="flex-1 p-2 flex items-center">
                                        <RadioGroup value={pcExposure} onValueChange={setPcExposure} className="flex gap-4">
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="all" id="pc-exp-all" /><Label htmlFor="pc-exp-all">전체</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="exposed" id="pc-exp-exposed" className="text-red-500 border-red-500 checked:bg-red-500" /><Label htmlFor="pc-exp-exposed">노출함</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="hidden" id="pc-exp-hidden" /><Label htmlFor="pc-exp-hidden">노출안함</Label></div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                {/* Mobile Display Status */}
                                <div className="flex border-b border-gray-200">
                                    <div className="w-24 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 leading-tight">모바일쇼핑몰<br/>상품노출<br/>상태</div>
                                    <div className="flex-1 p-2 flex items-center">
                                        <RadioGroup value={mobileExposure} onValueChange={setMobileExposure} className="flex gap-4">
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="all" id="mo-exp-all" className="text-red-500 border-red-500 checked:bg-red-500" /><Label htmlFor="mo-exp-all">전체</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="exposed" id="mo-exp-exposed" /><Label htmlFor="mo-exp-exposed">노출함</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="hidden" id="mo-exp-hidden" /><Label htmlFor="mo-exp-hidden">노출안함</Label></div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                {/* PC Sales Status */}
                                <div className="flex border-b border-gray-200">
                                    <div className="w-24 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 leading-tight">PC쇼핑몰<br/>상품판매<br/>상태</div>
                                    <div className="flex-1 p-2 flex items-center">
                                        <RadioGroup value={pcSales} onValueChange={setPcSales} className="flex gap-4">
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="all" id="pc-sale-all" /><Label htmlFor="pc-sale-all">전체</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="selling" id="pc-sale-selling" className="text-red-500 border-red-500 checked:bg-red-500" /><Label htmlFor="pc-sale-selling">판매함</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="stop" id="pc-sale-stop" /><Label htmlFor="pc-sale-stop">판매안함</Label></div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                {/* Mobile Sales Status */}
                                <div className="flex border-b border-gray-200">
                                    <div className="w-24 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 leading-tight">모바일쇼핑몰<br/>상품판매<br/>상태</div>
                                    <div className="flex-1 p-2 flex items-center">
                                        <RadioGroup value={mobileSales} onValueChange={setMobileSales} className="flex gap-4">
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="all" id="mo-sale-all" className="text-red-500 border-red-500 checked:bg-red-500" /><Label htmlFor="mo-sale-all">전체</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="selling" id="mo-sale-selling" /><Label htmlFor="mo-sale-selling">판매함</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="stop" id="mo-sale-stop" /><Label htmlFor="mo-sale-stop">판매안함</Label></div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                {/* Stock Status */}
                                <div className="flex border-b border-gray-200">
                                    <div className="w-24 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 leading-tight">상품재고<br/>상태</div>
                                    <div className="flex-1 p-2 flex items-center">
                                        <RadioGroup value={stockStatus} onValueChange={setStockStatus} className="flex gap-4">
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="all" id="stock-all" className="text-red-500 border-red-500 checked:bg-red-500" /><Label htmlFor="stock-all">전체</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="unlimited" id="stock-unlimited" /><Label htmlFor="stock-unlimited">무한정 판매</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="instock" id="stock-instock" /><Label htmlFor="stock-instock">재고있음</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="outstock" id="stock-outstock" /><Label htmlFor="stock-outstock">재고없음</Label></div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                {/* Sold Out Status */}
                                <div className="flex border-b border-gray-200">
                                    <div className="w-24 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 leading-tight">품절 상태</div>
                                    <div className="flex-1 p-2 flex items-center">
                                        <RadioGroup value={soldOutStatus} onValueChange={setSoldOutStatus} className="flex gap-4">
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="all" id="sold-all" className="text-red-500 border-red-500 checked:bg-red-500" /><Label htmlFor="sold-all">전체</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="soldout" id="sold-soldout" /><Label htmlFor="sold-soldout">품절</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="normal" id="sold-normal" /><Label htmlFor="sold-normal">정상</Label></div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex border-b border-gray-200">
                                    <div className="w-24 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 leading-tight">판매가</div>
                                    <div className="flex-1 p-2 flex items-center gap-2">
                                        <Input className="w-48 h-7 text-xs border-gray-300" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                        <span>~</span>
                                        <Input className="w-48 h-7 text-xs border-gray-300" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex justify-center mb-2">
                         <Button className="bg-[#555] hover:bg-[#444] text-white w-24 h-9 rounded-sm">검색</Button>
                    </div>

                    <div className="flex justify-between items-end mb-2">
                         <div className="text-xs text-gray-600">
                            검색 <span className="text-red-500 font-bold">290</span>개 / 전체 <span className="text-red-500 font-bold">290</span>개
                         </div>
                         <div className="flex gap-2">
                            <Select defaultValue="reg_date_desc">
                                <SelectTrigger className="w-32 h-7 text-xs border-gray-300">
                                    <SelectValue placeholder="등록일 ↓" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="reg_date_desc">등록일 ↓</SelectItem>
                                    <SelectItem value="reg_date_asc">등록일 ↑</SelectItem>
                                    <SelectItem value="name_desc">상품명 ↓</SelectItem>
                                    <SelectItem value="name_asc">상품명 ↑</SelectItem>
                                    <SelectItem value="price_desc">판매가 ↓</SelectItem>
                                    <SelectItem value="price_asc">판매가 ↑</SelectItem>
                                    <SelectItem value="supplier_desc">공급사 ↓</SelectItem>
                                    <SelectItem value="supplier_asc">공급사 ↑</SelectItem>
                                    <SelectItem value="manufacturer_desc">제조사 ↓</SelectItem>
                                    <SelectItem value="manufacturer_asc">제조사 ↑</SelectItem>
                                    <SelectItem value="payment_asc">결제 ↑</SelectItem>
                                    <SelectItem value="view_asc">조회 ↑</SelectItem>
                                    <SelectItem value="purchase_asc">구매율 ↑</SelectItem>
                                    <SelectItem value="cart_asc">담기 ↑</SelectItem>
                                    <SelectItem value="interest_asc">관심 ↑</SelectItem>
                                    <SelectItem value="review_asc">후기 ↑</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="10">
                                <SelectTrigger className="w-24 h-7 text-xs border-gray-300">
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

                    {/* Source List Table */}
                    <div className="border-t-2 border-gray-500 border-b border-gray-300">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#A4A4A4] hover:bg-[#A4A4A4] h-8">
                                    <TableHead className="w-8 p-0 text-center"><Checkbox className="border-gray-300 bg-white" /></TableHead>
                                    <TableHead className="w-12 text-center text-white p-0 h-8 font-normal">번호</TableHead>
                                    <TableHead className="w-14 text-center text-white p-0 h-8 font-normal">이미지</TableHead>
                                    <TableHead className="text-center text-white p-0 h-8 font-normal">상품명</TableHead>
                                    <TableHead className="w-20 text-center text-white p-0 h-8 font-normal">판매가</TableHead>
                                    <TableHead className="w-24 text-center text-white p-0 h-8 font-normal">공급사</TableHead>
                                    <TableHead className="w-12 text-center text-white p-0 h-8 font-normal">재고</TableHead>
                                    <TableHead className="w-16 text-center text-white p-0 h-8 font-normal">품절여부</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sourceProducts.map((p) => (
                                    <TableRow key={p.id} className="h-16 hover:bg-gray-50 border-b border-gray-200 text-xs text-gray-600">
                                        <TableCell className="p-0 text-center"><Checkbox className="border-gray-300" /></TableCell>
                                        <TableCell className="p-0 text-center">{p.id}</TableCell>
                                        <TableCell className="p-0 text-center">
                                            <div className="w-10 h-10 bg-gray-100 mx-auto" />
                                        </TableCell>
                                        <TableCell className="pl-3 text-left">
                                            <div className="text-blue-500 cursor-pointer hover:underline mb-1">{p.name}</div>
                                            <div className="flex gap-1">
                                                {p.tags.map(t => (
                                                    <span key={t} className={`px-1 text-[10px] text-white ${t === 'BEST' ? 'bg-gray-400' : 'bg-[#ea580c]'}`}>{t}</span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-0 text-center text-gray-800 font-bold">{p.price}</TableCell>
                                        <TableCell className="p-0 text-center truncate px-1">{p.supplier}</TableCell>
                                        <TableCell className="p-0 text-center">{p.stock}</TableCell>
                                        <TableCell className="p-0 text-center">{p.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Middle Action Buttons */}
                <div className="w-16 flex flex-col justify-center gap-2 items-center">
                    <Button variant="outline" className="w-14 h-12 flex flex-col items-center justify-center gap-1 bg-white border-gray-300 hover:bg-gray-50">
                        <span>추가</span>
                        <span className="text-lg leading-none text-gray-400">+</span>
                    </Button>
                    <Button variant="outline" className="w-14 h-14 flex flex-col items-center justify-center gap-0 bg-white border-red-500 hover:bg-red-50 text-red-500">
                        <span>선택</span>
                        <span>완료</span>
                        <ChevronDown className="w-4 h-4 mt-0.5" />
                    </Button>
                    <Button variant="outline" className="w-14 h-12 flex flex-col items-center justify-center gap-1 bg-white border-gray-300 hover:bg-gray-50">
                        <span>삭제</span>
                        <span className="text-lg leading-none text-gray-400">-</span>
                    </Button>
                </div>

                {/* Right Panel: Registered List */}
                <div className="flex-1 flex flex-col gap-4">
                     <div className="flex items-center gap-2 mb-2 h-[28px]">
                        <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">선택된 카테고리 정보 <span className="text-gray-400 text-sm font-normal border border-gray-300 rounded-sm px-1 cursor-help">?</span></h1>
                    </div>

                    {/* Selected Category Info Table */}
                    <div className="border-t-2 border-gray-500 border-b border-gray-300 mb-4">
                        <div className="flex border-b border-gray-200">
                            <div className="w-32 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                진열타입 <span className="ml-1 text-gray-400 text-xs border border-gray-300 rounded-full w-4 h-4 flex items-center justify-center cursor-help">?</span>
                            </div>
                            <div className="flex-1 p-2 flex items-center"></div>
                             <div className="w-32 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                진열방법 <span className="ml-1 text-gray-400 text-xs border border-gray-300 rounded-full w-4 h-4 flex items-center justify-center cursor-help">?</span>
                            </div>
                            <div className="flex-1 p-2 flex items-center"></div>
                        </div>
                         <div className="flex">
                            <div className="w-32 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">PC쇼핑몰 테마</div>
                            <div className="flex-1 p-2 flex items-center"></div>
                            <div className="w-32 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">모바일쇼핑몰 테마</div>
                            <div className="flex-1 p-2 flex items-center"></div>
                             <div className="w-32 bg-gray-50 p-2 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">상품개수</div>
                            <div className="flex-1 p-2 flex items-center"></div>
                        </div>
                    </div>

                    <div className="flex justify-end mb-4">
                        <Button className="bg-[#555] hover:bg-[#444] text-white h-8 text-xs rounded-sm" onClick={() => router.push('/admin/products/category-display')}>진열방법 수정</Button>
                    </div>

                     <div className="flex items-center gap-2 mb-2 h-[28px]">
                        <h1 className="text-xl font-bold text-gray-900 whitespace-nowrap">진열 상품 설정 <span className="text-gray-400 text-sm font-normal border border-gray-300 rounded-sm px-1 cursor-help">?</span></h1>
                    </div>
                    
                    {/* Controls */}
                    <div className="bg-gray-50 border border-gray-200 p-2 flex justify-between items-center mb-2">
                        <div className="flex gap-0.5">
                            <Button variant="outline" size="icon" className="w-7 h-7 bg-white border-gray-300 rounded-sm"><ChevronsDown size={14} /></Button>
                            <Button variant="outline" size="icon" className="w-7 h-7 bg-white border-gray-300 rounded-sm"><ChevronDown size={14} /></Button>
                            <Button variant="outline" size="icon" className="w-7 h-7 bg-white border-gray-300 rounded-sm"><ChevronUp size={14} /></Button>
                            <Button variant="outline" size="icon" className="w-7 h-7 bg-white border-gray-300 rounded-sm"><ChevronsUp size={14} /></Button>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600 whitespace-nowrap">
                            <span className="font-bold text-red-500">✔</span> 선택한 상품을
                            <Input className="w-10 h-6 mx-1 border-gray-300 text-center" />
                            번 위치로
                            <Button variant="outline" className="h-6 px-2 text-xs bg-white border-gray-300 ml-1">이동</Button>
                            <Button variant="outline" className="h-6 px-2 text-xs bg-white border-gray-300">고정</Button>
                        </div>
                    </div>

                    {/* Target List Table */}
                    <div className="border-t-2 border-gray-500 border-b border-gray-300">
                         <Table>
                            <TableHeader>
                                <TableRow className="bg-[#A4A4A4] hover:bg-[#A4A4A4] h-8">
                                    <TableHead className="w-8 p-0 text-center"><Checkbox className="border-gray-300 bg-white" /></TableHead>
                                    <TableHead className="w-14 text-center text-gray-700 bg-gray-100 p-0 h-8 font-normal border-r border-gray-200">진열순서</TableHead>
                                    <TableHead className="w-14 text-center text-gray-700 bg-gray-100 p-0 h-8 font-normal border-r border-gray-200">이미지</TableHead>
                                    <TableHead className="text-center text-gray-700 bg-gray-100 p-0 h-8 font-normal border-r border-gray-200">상품명</TableHead>
                                    <TableHead className="w-20 text-center text-gray-700 bg-gray-100 p-0 h-8 font-normal border-r border-gray-200">판매가</TableHead>
                                    <TableHead className="w-24 text-center text-gray-700 bg-gray-100 p-0 h-8 font-normal border-r border-gray-200">공급사</TableHead>
                                    <TableHead className="w-12 text-center text-gray-700 bg-gray-100 p-0 h-8 font-normal border-r border-gray-200">재고</TableHead>
                                    <TableHead className="w-16 text-center text-gray-700 bg-gray-100 p-0 h-8 font-normal border-r border-gray-200">품절상태</TableHead>
                                    <TableHead className="w-24 text-center text-gray-700 bg-gray-100 p-0 h-8 font-normal border-r border-gray-200">등록일/수정일</TableHead>
                                    <TableHead className="w-24 text-center text-gray-700 bg-gray-100 p-0 h-8 font-normal border-r border-gray-200">PC쇼핑몰 노출상태</TableHead>
                                    <TableHead className="w-24 text-center text-gray-700 bg-gray-100 p-0 h-8 font-normal">모바일쇼핑몰 노출상태</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {targetProducts.map((p, i) => (
                                    <TableRow key={p.id} className="h-16 hover:bg-gray-50 border-b border-gray-200 text-xs text-gray-600">
                                        <TableCell className="p-0 text-center border-r border-gray-200"><Checkbox className="border-gray-300" /></TableCell>
                                        <TableCell className="p-0 text-center border-r border-gray-200">{i + 1}</TableCell>
                                        <TableCell className="p-0 text-center border-r border-gray-200">
                                            <div className="w-10 h-10 bg-gray-100 mx-auto" />
                                        </TableCell>
                                        <TableCell className="pl-3 text-left border-r border-gray-200">
                                            <div className="text-blue-500 cursor-pointer hover:underline mb-1">{p.name}</div>
                                             <div className="flex gap-1">
                                                {p.tags.map(t => (
                                                    <span key={t} className={`px-1 text-[10px] text-white ${t === 'BEST' ? 'bg-gray-400' : 'bg-black'}`}>{t}</span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-0 text-center text-gray-800 font-normal border-r border-gray-200">{p.price}</TableCell>
                                        <TableCell className="p-0 text-center truncate px-1 border-r border-gray-200">{p.supplier}</TableCell>
                                        <TableCell className="p-0 text-center border-r border-gray-200">{p.stock}</TableCell>
                                        <TableCell className="p-0 text-center border-r border-gray-200">{p.status}</TableCell>
                                        <TableCell className="p-0 text-center border-r border-gray-200">
                                            <div>2023-01-01</div>
                                            <div>2023-01-02</div>
                                        </TableCell>
                                        <TableCell className="p-0 text-center border-r border-gray-200">
                                            <div className="w-4 h-4 border border-gray-300 mx-auto rounded-full" />
                                        </TableCell>
                                        <TableCell className="p-0 text-center">
                                            <div className="w-4 h-4 border border-gray-300 mx-auto rounded-full" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Bottom Controls */}
                    <div className="bg-gray-50 border border-gray-200 p-2 flex justify-between items-center mb-2">
                        <div className="flex gap-0.5">
                            <Button variant="outline" size="icon" className="w-7 h-7 bg-white border-gray-300 rounded-sm"><ChevronsDown size={14} /></Button>
                            <Button variant="outline" size="icon" className="w-7 h-7 bg-white border-gray-300 rounded-sm"><ChevronDown size={14} /></Button>
                            <Button variant="outline" size="icon" className="w-7 h-7 bg-white border-gray-300 rounded-sm"><ChevronUp size={14} /></Button>
                            <Button variant="outline" size="icon" className="w-7 h-7 bg-white border-gray-300 rounded-sm"><ChevronsUp size={14} /></Button>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600 whitespace-nowrap">
                            <span className="font-bold text-red-500">✔</span> 선택한 상품을
                            <Input className="w-10 h-6 mx-1 border-gray-300 text-center" />
                            번 위치로
                            <Button variant="outline" className="h-6 px-2 text-xs bg-white border-gray-300 ml-1">이동</Button>
                            <Button variant="outline" className="h-6 px-2 text-xs bg-white border-gray-300">고정</Button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <div className="flex justify-center gap-2 mt-6">
                <Button variant="outline" className="w-24 border-gray-300 text-gray-700 bg-white" onClick={() => window.close()}>취소</Button>
                <Button className="w-24 bg-[#555] hover:bg-[#444] text-white font-bold">선택완료</Button>
            </div>
        </div>
    );
}
