"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircle,
  Calendar,
  Youtube,
  ChevronUp,
  FileSpreadsheet,
  BookOpen,
  Check,
  RefreshCw,
  Printer,
} from "lucide-react";
import SupplierPopup from "@/components/admin/SupplierPopup";
import MemberGradeSelectPopup from "@/components/admin/MemberGradeSelectPopup";
import BrandPopup from "@/components/admin/BrandPopup";
import SearchConditionChangePopup from "@/components/admin/SearchConditionChangePopup";
import SearchSettingSavePopup from "@/components/admin/SearchSettingSavePopup";
import SearchConfigPopup from "@/components/admin/SearchConfigPopup";
import { getOrdersAction } from "@/actions/order-actions";
import { format } from "date-fns";
import { OrderStatus } from "@/generated/prisma";

interface OrderItem {
    id: string;
    productName: string;
    quantity: number;
    price: number;
}

interface OrderListItem {
    id: string;
    orderNo: string;
    ordererName: string;
    mallId: string;
    createdAt: Date | string;
    totalPayAmount: number;
    totalItemPrice: number;
    shippingFee: number;
    paymentMethod: string;
    status: OrderStatus;
    items: OrderItem[];
    totalProductAmount?: number;
    totalShippingFee?: number;
    statusUpdatedAt?: Date | string;
}

export default function ReturnListPage() {
  const [isDetailSearchOpen, setIsDetailSearchOpen] = useState(true);
  const [isSupplierPopupOpen, setIsSupplierPopupOpen] = useState(false);
  const [isMemberGradePopupOpen, setIsMemberGradePopupOpen] = useState(false);
  const [isBrandPopupOpen, setIsBrandPopupOpen] = useState(false);
  const [isSearchConditionPopupOpen, setIsSearchConditionPopupOpen] = useState(false);
  const [isSearchSettingSavePopupOpen, setIsSearchSettingSavePopupOpen] = useState(false);
  const [isSearchConfigPopupOpen, setIsSearchConfigPopupOpen] = useState(false);
  const [searchConditionMode, setSearchConditionMode] = useState<'toMulti' | 'toSingle'>('toMulti');

  const [supplierType, setSupplierType] = useState("all");
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sort, setSort] = useState("order_date_desc");
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("order_no");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mallId, setMallId] = useState('all');

  const fetchOrders = useCallback(async () => {
      setLoading(true);
      try {
          const res = await getOrdersAction({
              page,
              limit,
              status: [OrderStatus.RETURN_REQUEST, OrderStatus.RETURN_COMPLETE],
              keyword,
              searchType,
              startDate: startDate || undefined,
              endDate: endDate || undefined,
              mallId
          });
          if (res.success) {
              setOrders(res.items as unknown as OrderListItem[] || []);
              setTotal(res.total || 0);
          }
      } catch (e) {
          console.error(e);
      }
      setLoading(false);
  }, [page, limit, keyword, searchType, startDate, endDate, mallId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = () => {
      setPage(1);
      fetchOrders();
  };

  const handleMemberGradeConfirm = (selectedGrades: unknown[]) => {
      console.log("Selected grades:", selectedGrades);
      // In a real app, you would add these to the search filter
  };

  const handleBrandConfirm = (brand: { id: string, name: string } | null) => {
      console.log("Selected brand:", brand);
      // In a real app, you would add this to the search filter
  };

  const handleCouponClick = () => {
      alert("쿠폰 선택 팝업은 아직 구현되지 않았습니다.");
  };

  const toggleSearchCondition = () => {
      setSearchConditionMode(prev => prev === 'toMulti' ? 'toSingle' : 'toMulti');
      setIsSearchConditionPopupOpen(false);
  };

  const handleSearchSettingSaveConfirm = () => {
      alert("검색 설정이 저장되었습니다.");
      setIsSearchSettingSavePopupOpen(false);
  };

  const handleSearchConfigConfirm = (selectedItems: string[]) => {
      console.log("Selected config items:", selectedItems);
      setIsSearchConfigPopupOpen(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">반품 리스트</h1>
      </div>

      {/* Search Section */}
      <div className="border-t-2 border-gray-500 border-b border-gray-200 mb-8 border-l border-r">
        {/* Search Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-[#FBFBFB]">
           <div className="flex items-center gap-2">
               <h2 className="font-bold text-gray-700">주문 검색</h2>
               <HelpCircle className="w-4 h-4 text-gray-400" />
           </div>
           <div className="flex gap-1">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsSearchConditionPopupOpen(true)}
                    className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 rounded-[2px] px-3"
                >
                    <RefreshCw className="w-3 h-3" />
                    검색조건 변환
                </Button>
                <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => setIsSearchSettingSavePopupOpen(true)}
                    className="h-8 text-xs bg-[#555555] text-white hover:bg-[#444444] rounded-sm px-3"
                >
                    검색설정저장
                </Button>
           </div>
        </div>

        <div className="p-0">
            {/* Store Selection */}
            <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    상점
                </div>
                <div className="flex-1 p-3 flex items-center gap-4">
                     <RadioGroup value={mallId} onValueChange={setMallId} className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all" id="store-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="store-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="KR" id="store-kr" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="store-kr" className="text-gray-700 font-normal cursor-pointer flex items-center gap-1">
                                    <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[8px] bg-white">🇰🇷</span>
                                    기준몰
                                </Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="CN" id="store-cn" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="store-cn" className="text-gray-700 font-normal cursor-pointer flex items-center gap-1">
                                    <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[8px] bg-red-600 text-white">🇨🇳</span>
                                    중문몰
                                </Label>
                            </div>
                        </RadioGroup>
                </div>
            </div>

            {/* Supplier Type */}
            <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    공급사 구분
                </div>
                <div className="flex-1 p-3 flex items-center gap-4">
                     <RadioGroup 
                        value={supplierType} 
                        onValueChange={(value) => {
                            setSupplierType(value);
                            if (value === "provider") {
                                setIsSupplierPopupOpen(true);
                            }
                        }}
                        className="flex gap-4"
                     >
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="all" id="supplier-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="supplier-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="head" id="supplier-head" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="supplier-head" className="text-gray-700 font-normal cursor-pointer">본사</Label>
                            </div>
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="provider" id="supplier-provider" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="supplier-provider" className="text-gray-700 font-normal cursor-pointer">공급사</Label>
                            </div>
                        </RadioGroup>
                        <Button 
                            onClick={() => setIsSupplierPopupOpen(true)}
                            className="h-7 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm px-2"
                        >
                            공급사 선택
                        </Button>
                </div>
            </div>

             {/* Search Query */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-3 flex gap-2">
                    <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300">
                            <SelectValue placeholder="주문번호" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="order_no">주문번호</SelectItem>
                            <SelectItem value="invoice_no">송장번호</SelectItem>
                            <SelectItem value="product_name">상품명</SelectItem>
                            <SelectItem value="product_code">상품코드</SelectItem>
                            <SelectItem value="own_product_code">자체 상품코드</SelectItem>
                            <SelectItem value="model_name">상품모델명</SelectItem>
                            <SelectItem value="manufacturer">제조사</SelectItem>
                            <SelectItem value="sep1" disabled>==========</SelectItem>
                            <SelectItem value="orderer_name">주문자명</SelectItem>
                            <SelectItem value="orderer_phone">주문자 전화번호</SelectItem>
                            <SelectItem value="orderer_mobile">주문자 휴대전화</SelectItem>
                            <SelectItem value="orderer_email">주문자 이메일</SelectItem>
                            <SelectItem value="recipient_name">수령자명</SelectItem>
                            <SelectItem value="recipient_phone">수령자 전화번호</SelectItem>
                            <SelectItem value="recipient_mobile">수령자 휴대전화</SelectItem>
                            <SelectItem value="depositor_name">입금자명</SelectItem>
                            <SelectItem value="sep2" disabled>==========</SelectItem>
                            <SelectItem value="member_id">아이디</SelectItem>
                            <SelectItem value="member_nickname">닉네임</SelectItem>
                            <SelectItem value="sep3" disabled>==========</SelectItem>
                            <SelectItem value="supplier_name">공급사명</SelectItem>
                        </SelectContent>
                    </Select>
                     <Input 
                        className="w-[400px] h-7 border-gray-300" 
                        placeholder="검색어 전체를 정확히 입력하세요." 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                     />
                </div>
            </div>

             {/* Date Search */}
             <div className="flex items-center text-xs">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    기간검색
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                     <Select defaultValue="return_request_date">
                        <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300">
                            <SelectValue placeholder="반품접수일" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="order_date">주문일</SelectItem>
                            <SelectItem value="payment_confirm_date">결제확인일</SelectItem>
                            <SelectItem value="invoice_input_date">송장입력일</SelectItem>
                            <SelectItem value="shipping_date">배송일</SelectItem>
                            <SelectItem value="delivery_complete_date">배송완료일</SelectItem>
                            <SelectItem value="purchase_confirm_date">구매확정일</SelectItem>
                            <SelectItem value="cancel_complete_date">취소완료일</SelectItem>
                            <SelectItem value="return_request_date">반품접수일</SelectItem>
                            <SelectItem value="return_complete_date">반품완료일</SelectItem>
                            <SelectItem value="exchange_request_date">교환접수일</SelectItem>
                            <SelectItem value="exchange_complete_date">교환완료일</SelectItem>
                            <SelectItem value="refund_request_date">환불접수일</SelectItem>
                            <SelectItem value="refund_complete_date">환불완료일</SelectItem>
                            <SelectItem value="bundle_shipping">묶음배송</SelectItem>
                        </SelectContent>
                    </Select>
                     <div className="flex items-center gap-1">
                        <Input 
                            type="date"
                            ref={startDateRef}
                            className="w-28 h-7 text-center border-gray-300" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="YYYY-MM-DD"
                        />
                        <Calendar 
                            className="w-4 h-4 text-gray-500 cursor-pointer" 
                            onClick={() => startDateRef.current?.showPicker()}
                        />
                    </div>
                    <span>~</span>
                    <div className="flex items-center gap-1">
                        <Input 
                            type="date"
                            ref={endDateRef}
                            className="w-28 h-7 text-center border-gray-300" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            placeholder="YYYY-MM-DD"
                        />
                        <Calendar 
                            className="w-4 h-4 text-gray-500 cursor-pointer" 
                            onClick={() => endDateRef.current?.showPicker()}
                        />
                    </div>
                    <div className="flex items-center gap-0.5 ml-1">
                        <Button onClick={() => { setStartDate(format(new Date(), "yyyy-MM-dd")); setEndDate(format(new Date(), "yyyy-MM-dd")); }} variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">오늘</Button>
                        <Button onClick={() => { 
                            const d = new Date(); d.setDate(d.getDate() - 7);
                            setStartDate(format(d, "yyyy-MM-dd")); 
                            setEndDate(format(new Date(), "yyyy-MM-dd")); 
                        }} variant="default" size="sm" className="h-7 px-2 text-[11px] bg-gray-600 text-white rounded-sm hover:bg-gray-700">7일</Button>
                        <Button onClick={() => { 
                            const d = new Date(); d.setDate(d.getDate() - 15);
                            setStartDate(format(d, "yyyy-MM-dd")); 
                            setEndDate(format(new Date(), "yyyy-MM-dd")); 
                        }} variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">15일</Button>
                         <Button onClick={() => { 
                            const d = new Date(); d.setMonth(d.getMonth() - 1);
                            setStartDate(format(d, "yyyy-MM-dd")); 
                            setEndDate(format(new Date(), "yyyy-MM-dd")); 
                        }} variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1개월</Button>
                         <Button onClick={() => { 
                            const d = new Date(); d.setMonth(d.getMonth() - 3);
                            setStartDate(format(d, "yyyy-MM-dd")); 
                            setEndDate(format(new Date(), "yyyy-MM-dd")); 
                        }} variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">3개월</Button>
                         <Button onClick={() => { 
                            const d = new Date(); d.setFullYear(d.getFullYear() - 1);
                            setStartDate(format(d, "yyyy-MM-dd")); 
                            setEndDate(format(new Date(), "yyyy-MM-dd")); 
                        }} variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1년</Button>
                    </div>
                </div>
            </div>

            {/* Detailed Search Content */}
            {isDetailSearchOpen && (
                <div className="border-t border-gray-200">
                     {/* Row 1: Order Type & Order Channel */}
                    <div className="flex border-b border-gray-200">
                        <div className="flex-1 flex items-center">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-full">
                                주문유형 <HelpCircle className="w-3 h-3 text-gray-400 ml-1" />
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                     <Checkbox id="type-all" className="rounded-[2px] border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:text-white" defaultChecked/>
                                     <Label htmlFor="type-all" className="font-normal text-gray-700">전체</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                     <Checkbox id="type-pc" className="rounded-[2px]"/>
                                     <Label htmlFor="type-pc" className="font-normal text-gray-700">PC쇼핑몰</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                     <Checkbox id="type-mobile" className="rounded-[2px]"/>
                                     <Label htmlFor="type-mobile" className="font-normal text-gray-700">모바일쇼핑몰</Label>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500">
                                    ( <Checkbox id="type-web" className="rounded-[2px] w-3 h-3"/><Label htmlFor="type-web" className="text-[11px] font-normal">WEB</Label>
                                     <Checkbox id="type-app" className="rounded-[2px] w-3 h-3"/><Label htmlFor="type-app" className="text-[11px] font-normal">APP</Label> )
                                </div>
                                <div className="flex items-center gap-2">
                                     <Checkbox id="type-manual" className="rounded-[2px]"/>
                                     <Label htmlFor="type-manual" className="font-normal text-gray-700">수기주문</Label>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center border-l border-gray-200">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-full">
                                주문채널구분
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="channel-all" className="rounded-[2px] border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:text-white" defaultChecked/>
                                     <Label htmlFor="channel-all" className="font-normal text-gray-700">전체</Label>
                                </div>
                                 <div className="flex items-center gap-2">
                                    <Checkbox id="channel-shopping" className="rounded-[2px]"/>
                                     <Label htmlFor="channel-shopping" className="font-normal text-gray-700">쇼핑몰</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="channel-payco" className="rounded-[2px]"/>
                                     <Label htmlFor="channel-payco" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-red-500 text-white flex justify-center items-center text-[9px] rounded-sm">P</span> 페이코</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="channel-naver" className="rounded-[2px]"/>
                                     <Label htmlFor="channel-naver" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-green-500 text-white flex justify-center items-center text-[9px] rounded-sm">N</span> 네이버페이</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="channel-etc" className="rounded-[2px]"/>
                                     <Label htmlFor="channel-etc" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-gray-500 text-white flex justify-center items-center text-[9px] rounded-sm">기</span> 기타</Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Payment Method */}
                    <div className="flex items-stretch text-xs border-b border-gray-200">
                         <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            결제수단
                        </div>
                        <div className="flex-1 p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <Checkbox id="pay-all" className="rounded-[2px] border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:text-white" defaultChecked/>
                                <Label htmlFor="pay-all" className="font-normal text-gray-700">전체</Label>
                            </div>
                            <div className="grid grid-cols-4 gap-y-2 gap-x-4">
                                {/* Row 1 */}
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-card" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-card" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-pink-300 text-white flex justify-center items-center text-[9px] rounded-sm">신</span> 신용카드</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-bank" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-bank" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-yellow-400 text-white flex justify-center items-center text-[9px] rounded-sm">무</span> 무통장 입금</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-full-discount" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-full-discount" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-red-500 text-white flex justify-center items-center text-[9px] rounded-sm">전</span> 전액할인</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-mileage" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-mileage" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-blue-500 text-white flex justify-center items-center text-[9px] rounded-sm">마</span> 마일리지</Label>
                                </div>

                                {/* Row 2 */}
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-deposit" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-deposit" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-green-500 text-white flex justify-center items-center text-[9px] rounded-sm">예</span> 예치금</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-escrow-trans" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-escrow-trans" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-purple-500 text-white flex justify-center items-center text-[9px] rounded-sm">계</span> 계좌이체 (에스크로)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-account" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-account" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-teal-400 text-white flex justify-center items-center text-[9px] rounded-sm">계</span> 계좌이체</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-virtual" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-virtual" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-yellow-500 text-white flex justify-center items-center text-[9px] rounded-sm">가</span> 가상계좌</Label>
                                </div>

                                {/* Row 3 */}
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-phone" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-phone" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-orange-400 text-white flex justify-center items-center text-[9px] rounded-sm">휴</span> 휴대폰결제</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-escrow-card" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-escrow-card" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-purple-400 text-white flex justify-center items-center text-[9px] rounded-sm">신</span> 신용카드 (에스크로)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-simple-phone" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-simple-phone" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-teal-400 text-white flex justify-center items-center text-[9px] rounded-sm">휴</span> 휴대폰 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-escrow-virtual" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-escrow-virtual" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-purple-400 text-white flex justify-center items-center text-[9px] rounded-sm">가</span> 가상계좌 (에스크로)</Label>
                                </div>

                                {/* Row 4 */}
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-simple-card" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-simple-card" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-teal-400 text-white flex justify-center items-center text-[9px] rounded-sm">신</span> 신용카드 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-simple-trans" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-simple-trans" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-teal-400 text-white flex justify-center items-center text-[9px] rounded-sm">계</span> 계좌이체 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-simple-virtual" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-simple-virtual" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-teal-400 text-white flex justify-center items-center text-[9px] rounded-sm">가</span> 가상계좌 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-simple-naver" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-simple-naver" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-green-500 text-white flex justify-center items-center text-[9px] rounded-sm">네</span> 네이버페이 (간편결제)</Label>
                                </div>

                                {/* Row 5 */}
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-simple-point" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-simple-point" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-teal-400 text-white flex justify-center items-center text-[9px] rounded-sm">포</span> 포인트 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="pay-etc" className="rounded-[2px]"/>
                                    <Label htmlFor="pay-etc" className="font-normal text-gray-700 flex items-center gap-1"><span className="w-4 h-4 bg-gray-400 text-white flex justify-center items-center text-[9px] rounded-sm">기</span> 기타</Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Invoice No */}
                     <div className="flex items-center text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-full">
                            송장번호
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-4">
                             <Select>
                                <SelectTrigger className="w-48 h-7 text-[11px] border-gray-300">
                                    <SelectValue placeholder="=배송 업체=" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cj">CJ대한통운</SelectItem>
                                    <SelectItem value="post">우체국택배</SelectItem>
                                </SelectContent>
                            </Select>
                            <RadioGroup defaultValue="all" className="flex gap-4">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="all" id="inv-all" className="border-red-500 text-red-500" />
                                    <Label htmlFor="inv-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="registered" id="inv-reg" className="border-gray-300"/>
                                    <Label htmlFor="inv-reg" className="text-gray-700 font-normal cursor-pointer">송장번호 등록</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="unregistered" id="inv-unreg" className="border-gray-300"/>
                                    <Label htmlFor="inv-unreg" className="text-gray-700 font-normal cursor-pointer">송장번호 미등록</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 4: Member Info & Delivery Info */}
                    <div className="flex border-b border-gray-200">
                        <div className="flex-1 flex items-center">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-full">
                                회원정보
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-4">
                                 <div className="flex items-center gap-2">
                                     <Checkbox id="mem-first" className="rounded-[2px]"/>
                                     <Label htmlFor="mem-first" className="font-normal text-gray-700">첫주문</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                     <Checkbox id="mem-withdrawal" className="rounded-[2px] border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:text-white" defaultChecked/>
                                     <Label htmlFor="mem-withdrawal" className="font-normal text-gray-700">탈퇴회원 주문</Label>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center border-l border-gray-200">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-full">
                                배송정보
                            </div>
                            <div className="flex-1 p-3 flex flex-col gap-2">
                                <div className="flex items-center gap-4">
                                     <div className="flex items-center gap-2">
                                        <Checkbox id="del-gift" className="rounded-[2px]"/>
                                        <Label htmlFor="del-gift" className="font-normal text-gray-700">사은품 포함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="del-msg" className="rounded-[2px]"/>
                                        <Label htmlFor="del-msg" className="font-normal text-gray-700">배송메세지 입력</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="del-memo" className="rounded-[2px]"/>
                                        <Label htmlFor="del-memo" className="font-normal text-gray-700">관리자메모 입력</Label>
                                    </div>
                                </div>
                                <div>
                                    <Select defaultValue="all">
                                        <SelectTrigger className="w-full h-7 text-[11px] border-gray-300">
                                            <SelectValue placeholder="=메모 구분=" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">=메모 구분=</SelectItem>
                                            <SelectItem value="receipt">접수</SelectItem>
                                            <SelectItem value="complete">완료</SelectItem>
                                            <SelectItem value="deposit">입금</SelectItem>
                                            <SelectItem value="shipping">배송</SelectItem>
                                            <SelectItem value="soldout">품절</SelectItem>
                                            <SelectItem value="exchange">교환</SelectItem>
                                            <SelectItem value="return">반품</SelectItem>
                                            <SelectItem value="refund">환불</SelectItem>
                                            <SelectItem value="as">A/S</SelectItem>
                                            <SelectItem value="etc">기타</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 5: Member Search & Payment Amount */}
                     <div className="flex border-b border-gray-200">
                        <div className="flex-1 flex items-center">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-full">
                                회원검색
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-4">
                                <RadioGroup defaultValue="all" className="flex gap-4">
                                     <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="all" id="mem-search-all" className="border-red-500 text-red-500" />
                                        <Label htmlFor="mem-search-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="non" id="mem-search-non" className="border-gray-300"/>
                                        <Label htmlFor="mem-search-non" className="text-gray-700 font-normal cursor-pointer">비회원</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="member" id="mem-search-mem" className="border-gray-300"/>
                                        <Label htmlFor="mem-search-mem" className="text-gray-700 font-normal cursor-pointer">회원</Label>
                                    </div>
                                </RadioGroup>
                                <Button 
                                    size="sm" 
                                    variant="secondary" 
                                    onClick={() => setIsMemberGradePopupOpen(true)}
                                    className="h-6 text-[11px] rounded-[2px] hover:bg-[#222222]"
                                    style={{ backgroundColor: '#333333', color: 'white' }}
                                >
                                    회원등급 선택
                                </Button>
                            </div>
                        </div>
                         <div className="flex-1 flex items-center border-l border-gray-200">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-full">
                                결제금액
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-2">
                                <Input className="w-32 h-7 border-gray-300" />
                                <span>원 ~</span>
                                <Input className="w-32 h-7 border-gray-300" />
                                <span>원</span>
                            </div>
                        </div>
                    </div>

                    {/* Row 6: Receipt Request */}
                    <div className="flex items-center text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-full">
                            영수증 신청
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-4">
                             <RadioGroup defaultValue="all" className="flex gap-4">
                                     <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="all" id="receipt-all" className="border-red-500 text-red-500" />
                                        <Label htmlFor="receipt-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="cash" id="receipt-cash" className="border-gray-300"/>
                                        <Label htmlFor="receipt-cash" className="text-gray-700 font-normal flex items-center gap-1 cursor-pointer"><span className="text-[9px] bg-green-500 text-white w-4 h-4 flex items-center justify-center rounded-sm">현</span> 현금영수증</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="tax" id="receipt-tax" className="border-gray-300"/>
                                        <Label htmlFor="receipt-tax" className="text-gray-700 font-normal flex items-center gap-1 cursor-pointer"><span className="text-[9px] bg-gray-400 text-white w-4 h-4 flex items-center justify-center rounded-sm">세</span> 세금계산서</Label>
                                    </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 7: Deposit Overdue & Delivery Delay */}
                    <div className="flex border-b border-gray-200">
                        <div className="flex-1 flex items-center">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-full">
                                입금경과일
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-2">
                                <Input className="w-full h-7 border-gray-300" />
                                <span className="text-gray-600 whitespace-nowrap">일 이상 경과</span>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center border-l border-gray-200">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-full">
                                배송지연일
                            </div>
                            <div className="flex-1 p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <Input className="w-full h-7 border-gray-300" />
                                    <span className="text-gray-600 whitespace-nowrap">일 이상 지연</span>
                                </div>
                                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                                    <span className="bg-gray-600 text-white w-3 h-3 flex justify-center items-center rounded-sm text-[8px]">!</span>
                                    입력 시 배송 전 주문상태만 검색 가능합니다.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 8: Promotion & Manual Payment */}
                     <div className="flex border-b border-gray-200">
                         <div className="flex-1 flex items-center">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-full">
                                프로모션 정보
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-2">
                                <Button 
                                    variant="secondary" 
                                    onClick={handleCouponClick}
                                    className="h-7 text-[11px] hover:bg-[#222222] rounded-[2px]"
                                    style={{ backgroundColor: '#333333', color: 'white' }}
                                >
                                    쿠폰선택
                                </Button>
                                <Checkbox id="promo-all" className="rounded-[2px]"/>
                                <Label htmlFor="promo-all" className="font-normal text-gray-700">쿠폰사용 주문 전체 검색</Label>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center border-l border-gray-200">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-full">
                                수동 결제완료 처리
                            </div>
                             <div className="flex-1 p-3 flex items-center gap-2">
                                <Checkbox id="manual-pay-only" className="rounded-[2px]"/>
                                <Label htmlFor="manual-pay-only" className="font-normal text-gray-700">수동 결제완료 처리 주문만 보기</Label>
                            </div>
                        </div>
                    </div>

                     {/* Row 9: Brand */}
                    <div className="flex items-center text-xs">
                         <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-full">
                            브랜드
                        </div>
                         <div className="flex-1 p-3 flex items-center gap-2">
                             <Button 
                                variant="secondary" 
                                onClick={() => setIsBrandPopupOpen(true)}
                                className="h-7 text-[11px] hover:bg-[#222222] rounded-[2px]"
                                style={{ backgroundColor: '#333333', color: 'white' }}
                             >
                                브랜드선택
                             </Button>
                             <Checkbox id="brand-none" className="rounded-[2px]"/>
                             <Label htmlFor="brand-none" className="font-normal text-gray-700">브랜드 미지정 상품</Label>
                        </div>
                    </div>

                </div>
            )}

            {/* Expand Detailed Search */}
            <div className="p-3 bg-white border-t border-gray-200">
                <button 
                  className="flex items-center text-blue-500 font-bold text-xs hover:underline"
                  onClick={() => setIsDetailSearchOpen(!isDetailSearchOpen)}
                >
                    상세검색 펼침 
                    <ChevronUp className={`w-3 h-3 ml-1 transform transition-transform ${isDetailSearchOpen ? '' : 'rotate-180'}`} />
                </button>
            </div>

        </div>
         
         <div className="bg-white p-4 flex justify-center border-t border-gray-200">
             <Button onClick={handleSearch} className="bg-[#555555] hover:bg-[#444444] text-white font-bold h-10 w-32 rounded-sm text-sm">검색</Button>
         </div>
      </div>

      {/* List Header */}
      <div className="flex justify-between items-end mb-2">
           <div className="text-xs text-gray-700 font-bold">
              검색 <span className="text-red-500">{total}</span>개 / 전체 <span className="text-red-500">{total}</span>개 <span className="text-gray-500 font-normal">( 검색된 주문 총 결제금액 : <span className="text-red-500">{orders.reduce((acc, cur) => acc + cur.totalPayAmount, 0).toLocaleString()}</span>원 )</span>
          </div>
          <div className="flex gap-1 items-center">
               <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="주문일 ↓" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="order_date_desc">주문일 ↓</SelectItem>
                        <SelectItem value="order_date_asc">주문일 ↑</SelectItem>
                        <SelectItem value="order_no_desc">주문번호 ↓</SelectItem>
                        <SelectItem value="order_no_asc">주문번호 ↑</SelectItem>
                        <SelectItem value="product_name_desc">상품명 ↓</SelectItem>
                        <SelectItem value="product_name_asc">상품명 ↑</SelectItem>
                        <SelectItem value="orderer_desc">주문자 ↓</SelectItem>
                        <SelectItem value="orderer_asc">주문자 ↑</SelectItem>
                        <SelectItem value="total_pay_amount_desc">총 결제금액 ↓</SelectItem>
                        <SelectItem value="total_pay_amount_asc">총 결제금액 ↑</SelectItem>
                        <SelectItem value="recipient_desc">수령자 ↓</SelectItem>
                        <SelectItem value="recipient_asc">수령자 ↑</SelectItem>
                        <SelectItem value="supplier_desc">공급사 ↓</SelectItem>
                        <SelectItem value="supplier_asc">공급사 ↑</SelectItem>
                    </SelectContent>
                </Select>
                 <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
                    <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="20개 보기" />
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
                 <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => setIsSearchConfigPopupOpen(true)}
                    className="h-7 text-[11px] bg-[#555555] text-white hover:bg-[#444444] rounded-sm ml-1"
                >
                    조회항목설정
                </Button>
          </div>
      </div>
      
      {/* Action Toolbar Top */}
      <div className="flex justify-between items-center bg-[#F9F9F9] p-2 border border-gray-300 border-b-0">
          <div className="flex items-center gap-1 text-xs">
              <Check className="w-3 h-3 text-red-500 mr-1" strokeWidth={4} />
              <span className="font-bold text-gray-600 mr-1">선택한 주문을</span>
              <Select defaultValue="status">
                  <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                      <SelectValue placeholder="=주문상태=" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="status">=주문상태=</SelectItem>
                      <SelectItem value="delivered">배송완료</SelectItem>
                      <SelectItem value="purchase_confirm">구매확정</SelectItem>
                      <SelectItem value="return_request">반품접수</SelectItem>
                      <SelectItem value="returning">반송중</SelectItem>
                      <SelectItem value="return_hold">반품보류</SelectItem>
                      <SelectItem value="return_picked_up">반품회수완료</SelectItem>
                      <SelectItem value="refund_request">환불접수</SelectItem>
                  </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-3 ml-1">
                  일괄처리
              </Button>
          </div>
           <div className="flex items-center gap-1">
              <Select defaultValue="print_select">
                 <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                      <SelectValue placeholder="=인쇄 선택=" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="print_select">=인쇄 선택=</SelectItem>
                      <SelectItem value="order_statement">주문내역서</SelectItem>
                      <SelectItem value="order_statement_customer">주문내역서 (고객용)</SelectItem>
                      <SelectItem value="simple_receipt">간이영수증</SelectItem>
                      <SelectItem value="transaction_statement">거래명세서</SelectItem>
                      <SelectItem value="tax_invoice">세금계산서</SelectItem>
                  </SelectContent>
              </Select>
               <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-2 font-normal flex items-center gap-1">
                   <Printer className="w-3 h-3" />
                  프린트
              </Button>
           </div>
      </div>

      {/* Table */}
      <div className="border border-gray-300 mb-4 overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse table-fixed min-w-[2000px]">
              <colgroup>
                  <col className="w-10" />
                  <col className="w-12" />
                  <col className="w-20" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="" />
                  <col className="w-16" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-20" />
                  <col className="w-20" />
                  <col className="w-24" />
                  <col className="w-24" />
              </colgroup>
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr className="h-10">
                      <th className="border-r border-[#CDCDCD]">
                          <Checkbox className="bg-white border-gray-300 rounded-[2px]"/>
                      </th>
                      <th className="border-r border-[#CDCDCD]">번호</th>
                      <th className="border-r border-[#CDCDCD]">상점구분</th>
                      <th className="border-r border-[#CDCDCD]">주문일시</th>
                      <th className="border-r border-[#CDCDCD] break-keep leading-tight px-1">반품신청일<br/>(반품접수일)</th>
                      <th className="border-r border-[#CDCDCD]">반품완료일시</th>
                      <th className="border-r border-[#CDCDCD]">주문번호</th>
                      <th className="border-r border-[#CDCDCD]">주문자</th>
                      <th className="border-r border-[#CDCDCD]">상품주문번호</th>
                      <th className="border-r border-[#CDCDCD]">주문상품</th>
                      <th className="border-r border-[#CDCDCD]">수량</th>
                      <th className="border-r border-[#CDCDCD]">상품금액</th>
                      <th className="border-r border-[#CDCDCD]">총 상품금액</th>
                      <th className="border-r border-[#CDCDCD]">배송비</th>
                      <th className="border-r border-[#CDCDCD]">총 배송비</th>
                      <th className="border-r border-[#CDCDCD]">결제방법</th>
                      <th className="border-r border-[#CDCDCD]">처리상태</th>
                      <th className="border-r border-[#CDCDCD]">사유</th>
                      <th className="border-r border-[#CDCDCD]">관리자메모</th>
                      <th className="">주문유형</th>
                  </tr>
              </thead>
              <tbody className="text-gray-600 bg-white">
                 {loading ? (
                    <tr>
                        <td colSpan={20} className="py-10 border-b border-gray-200 text-center text-sm">로딩중...</td>
                    </tr>
                  ) : orders.length === 0 ? (
                      <tr>
                          <td colSpan={20} className="py-10 border-b border-gray-200 text-center text-sm">
                              검색된 주문이 없습니다.
                          </td>
                      </tr>
                  ) : (
                      orders.map((order, idx) => (
                          <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 h-8">
                               <td className="border-r border-[#CDCDCD] flex justify-center items-center h-full pt-2">
                                   <Checkbox className="bg-white border-gray-300 rounded-[2px] w-4 h-4"/>
                               </td>
                               <td className="border-r border-[#CDCDCD]">{total - ((page - 1) * 20) - idx}</td>
                               <td className="border-r border-[#CDCDCD]">{order.mallId === 'KR' ? '🇰🇷' : '🇨🇳'}</td>
                               <td className="border-r border-[#CDCDCD]">{format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")}</td>
                               <td className="border-r border-[#CDCDCD]">{order.statusUpdatedAt && order.status === OrderStatus.RETURN_REQUEST ? format(new Date(order.statusUpdatedAt), "yyyy-MM-dd HH:mm") : '-'}</td>
                               <td className="border-r border-[#CDCDCD]">{order.status === OrderStatus.RETURN_COMPLETE ? (order.statusUpdatedAt ? format(new Date(order.statusUpdatedAt), "yyyy-MM-dd HH:mm") : '-') : '-'}</td>
                               <td className="border-r border-[#CDCDCD] text-blue-500 font-bold cursor-pointer hover:underline">{order.orderNo}</td>
                               <td className="border-r border-[#CDCDCD]">{order.ordererName}</td>
                               <td className="border-r border-[#CDCDCD]">-</td>
                                <td className="border-r border-[#CDCDCD] text-left px-2 truncate" title={order.items.map((i) => i.productName).join(', ')}>
                                  {order.items.length > 0 ? `${order.items[0].productName} ${order.items.length > 1 ? `외 ${order.items.length - 1}건` : ''}` : '-'}
                               </td>
                               <td className="border-r border-[#CDCDCD]">{order.items.length}</td>
                               <td className="border-r border-[#CDCDCD] text-right px-2">{order.totalItemPrice?.toLocaleString()}</td>
                               <td className="border-r border-[#CDCDCD] text-right px-2">{order.totalProductAmount?.toLocaleString() || 0}</td>
                               <td className="border-r border-[#CDCDCD] text-right px-2">{order.shippingFee?.toLocaleString()}</td>
                               <td className="border-r border-[#CDCDCD] text-right px-2">{order.totalShippingFee?.toLocaleString() || 0}</td>
                               <td className="border-r border-[#CDCDCD]">{order.paymentMethod || '무통장입금'}</td>
                               <td className="border-r border-[#CDCDCD] text-red-500 font-bold">
                                   {order.status === OrderStatus.RETURN_COMPLETE ? '반품완료' : '반품신청'}
                               </td>
                               <td className="border-r border-[#CDCDCD]">-</td>
                               <td className="border-r border-[#CDCDCD]">-</td>
                               <td className="">PC</td>
                          </tr>
                      ))
                  )}
              </tbody>
          </table>
      </div>

       {/* Action Toolbar Bottom */}
      <div className="flex justify-between items-center bg-[#F9F9F9] p-2 border border-gray-300 mb-4">
          <div className="flex items-center gap-1 text-xs">
              <Check className="w-3 h-3 text-red-500 mr-1" strokeWidth={4} />
              <span className="font-bold text-gray-600 mr-1">선택한 주문을</span>
              <Select defaultValue="status">
                  <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                      <SelectValue placeholder="=주문상태=" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="status">=주문상태=</SelectItem>
                      <SelectItem value="delivered">배송완료</SelectItem>
                      <SelectItem value="purchase_confirm">구매확정</SelectItem>
                      <SelectItem value="return_request">반품접수</SelectItem>
                      <SelectItem value="returning">반송중</SelectItem>
                      <SelectItem value="return_hold">반품보류</SelectItem>
                      <SelectItem value="return_picked_up">반품회수완료</SelectItem>
                      <SelectItem value="refund_request">환불접수</SelectItem>
                  </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-3 ml-1">
                  일괄처리
              </Button>
          </div>
          <div>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 hover:bg-gray-50 text-green-600 font-bold flex items-center gap-1.5 px-3 rounded-sm shadow-sm">
                <div className="bg-green-600 text-white p-0.5 rounded-[2px]">
                    <FileSpreadsheet className="w-3 h-3 text-white fill-current" />
                </div>
                엑셀다운로드
           </Button>
          </div>
      </div>
      
      <div className="border-t border-gray-300 mb-8 mt-10"></div>

      {/* Guide Section */}
       <div className="space-y-6 text-gray-600">
           <div>
              <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs mb-3">
                 <BookOpen className="w-4 h-4" /> 
                 <span>안내</span>
              </div>
              <div className="space-y-4">
                   <div>
                       <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                       <div className="pl-0 text-xs text-gray-500 space-y-1">
                           <p>· 반품 리스트의 주문상태는 추가할 수 없으나, "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "반품 상태 설정" 항목에서 운영자가 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                           <p>· 수정된 주문상태명은 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           <p>· 반품 리스트의 "반품접수, 반품회수완료" 상태는 운영자가 사용여부를 설정할 수 없으나,</p>
                           <p className="pl-2">"반송중, 반품보류" 상태는 반품 상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                       </div>
                  </div>

                  <div>
                       <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                       <div className="pl-0 text-xs text-gray-500 space-y-1">
                           <p>· 반품 리스트 내 주문은 상품별로 이전 단계인 "배송완료/구매확정" 또는 "반품접수/반송중/반품보류/반품회수완료"의 반품상태 중 선택하여 변경할 수 있습니다,</p>
                           <p>· "기본설정{">"}주문정책{">"}주문상태 설정"에서 "배송 상태 설정 / 구매확정 상태 설정" 항목에 추가된 주문상태가 있는 경우, 해당 주문상태로도 변경할 수 있습니다.</p>
                           <p className="text-red-500 font-bold">· 반품회수완료 상태로 변경 시 해당 주문은 "환불접수" 상태로 변경되어 환불 리스트로 이동되며, 반품리스트에서 노출되지 않습니다.</p>
                       </div>
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
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100 p-0">
                        <ChevronUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0 transform rotate-180">
                         <ChevronUp className="w-4 h-4" />
                </Button>
        </div>

        <SupplierPopup
            isOpen={isSupplierPopupOpen}
            onClose={() => setIsSupplierPopupOpen(false)}
            onConfirm={(selected) => {
                console.log("Selected supplier:", selected);
            }}
        />

        <MemberGradeSelectPopup 
           isOpen={isMemberGradePopupOpen}
           onClose={() => setIsMemberGradePopupOpen(false)}
           onConfirm={handleMemberGradeConfirm}
        />

        <BrandPopup
           isOpen={isBrandPopupOpen}
           onClose={() => setIsBrandPopupOpen(false)}
           onConfirm={handleBrandConfirm}
        />

        <SearchConditionChangePopup
            isOpen={isSearchConditionPopupOpen}
            onClose={() => setIsSearchConditionPopupOpen(false)}
            onConfirm={toggleSearchCondition}
            mode={searchConditionMode}
        />

        <SearchSettingSavePopup
            isOpen={isSearchSettingSavePopupOpen}
            onClose={() => setIsSearchSettingSavePopupOpen(false)}
            onConfirm={handleSearchSettingSaveConfirm}
        />

        <SearchConfigPopup
            isOpen={isSearchConfigPopupOpen}
            onClose={() => setIsSearchConfigPopupOpen(false)}
            onConfirm={handleSearchConfigConfirm}
        />

    </div>
</div>
  );
}
