"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getOrdersAction } from "@/actions/order-actions";
import type { OrderStatus } from "@/generated/prisma";
import { format } from "date-fns";
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
  Youtube,
  ChevronUp,
  FileSpreadsheet,
  BookOpen,
  RefreshCcw,
  Printer
} from "lucide-react";
import SupplierPopup from "@/components/admin/SupplierPopup";
import MemberGradeSelectPopup from "@/components/admin/MemberGradeSelectPopup";
import BrandPopup from "@/components/admin/BrandPopup";
import SearchConditionChangePopup from "@/components/admin/SearchConditionChangePopup";
import SearchConfigPopup from "@/components/admin/SearchConfigPopup";
import SearchSettingSavePopup from "@/components/admin/SearchSettingSavePopup";

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
}

export default function OrderIntegratedListPage() {
  const [isDetailSearchOpen, setIsDetailSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("주문통합리스트");
  const [viewType, setViewType] = useState<"order" | "product_order">("order");
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSupplierPopupOpen, setIsSupplierPopupOpen] = useState(false);
  const [isMemberGradePopupOpen, setIsMemberGradePopupOpen] = useState(false);
  const [isBrandPopupOpen, setIsBrandPopupOpen] = useState(false);
  const [isSearchConditionPopupOpen, setIsSearchConditionPopupOpen] = useState(false);
  const [isSearchConfigPopupOpen, setIsSearchConfigPopupOpen] = useState(false);
  const [isSearchSettingSavePopupOpen, setIsSearchSettingSavePopupOpen] = useState(false);
  const [isMultiSearchMode, setIsMultiSearchMode] = useState(false);
  const [multiSearchItems, setMultiSearchItems] = useState([{ id: 0, type: "order_no", value: "" }]);
  const [supplierType, setSupplierType] = useState("all");
  
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  // Filter States
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("order_no");
  const [mallId, setMallId] = useState("all");
  const [startDate, setStartDate] = useState(format(new Date(new Date().setDate(new Date().getDate() - 7)), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  
  const tabs = [
    "주문통합리스트",
    "입금대기 리스트",
    "결제완료 리스트",
    "상품준비중 리스트",
    "배송중 리스트",
    "배송완료 리스트",
    "구매확정 리스트",
    "결제 중단/실패 리스트"
  ];

  const fetchOrders = React.useCallback(async () => {
    setLoading(true);
    try {
        const res = await getOrdersAction({
            page,
            limit,
            tab: activeTab,
            startDate,
            endDate,
            keyword,
            searchType,
            mallId
        });
        
        if (res.success) {
            setOrders((res.items as unknown as OrderListItem[]) || []);
            setTotal(res.total || 0);
        } else {
            setOrders([]);
            setTotal(0);
        }
    } catch (e) {
        console.error(e);
    }
    setLoading(false);
  }, [activeTab, page, limit, startDate, endDate, keyword, searchType, mallId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearch = () => {
      setPage(1);
      fetchOrders();
  };


  const getDescription = (tab: string) => {
      switch(tab) {
          case "주문통합리스트": return "취소/환불/반품/교환을 포함한 전체 주문리스트입니다.";
          case "입금대기 리스트": return "무통장입금 주문 건 중 아직 입금확인이 되지 않은 주문리스트입니다.";
          case "결제완료 리스트": return "결제가 완료되어 배송을 위한 상품확인 전 단계의 주문리스트입니다.";
          case "상품준비중 리스트": return "배송을 위해 상품을 준비하는 단계의 주문리스트입니다.";
          case "배송중 리스트": return "상품이 발송되어 배송업체로 전달된 상태의 주문리스트입니다.";
          case "배송완료 리스트": return "고객이 상품을 수령한 상태의 주문리스트입니다.";
          case "구매확정 리스트": return "고객이 상품 수령 후 구매를 확정한 주문리스트입니다.";
          case "결제 중단/실패 리스트": return "결제 과정에서 중단되거나 실패한 주문리스트입니다.";
          default: return "";
      }
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
        {/* Top Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-200 pb-1">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-t-sm text-sm font-bold transition-colors ${
                        activeTab === tab
                        ? "bg-[#555555] text-white"
                        : "bg-white text-gray-500 hover:bg-gray-100 border border-transparent"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{activeTab}</h1>
            <span className="text-gray-500 text-xs mb-1">{getDescription(activeTab)}</span>
        </div>
        <Link href="/admin/orders/manual">
          <Button
            variant="outline"
            className="text-red-500 border-red-500 hover:bg-red-50 font-bold h-9 px-4 rounded-sm"
          >
            + 수기주문 등록
          </Button>
        </Link>
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
                    className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-1 rounded-sm"
                    onClick={() => setIsSearchConditionPopupOpen(true)}
                >
                    <RefreshCcw className="w-3 h-3" />
                    검색조건 변환
                </Button>
                <Button
                    variant="default" 
                    size="sm" 
                    className="h-7 text-[11px] bg-[#555555] text-white hover:bg-[#444444] rounded-sm"
                    onClick={() => setIsSearchSettingSavePopupOpen(true)}
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
                    {isMultiSearchMode ? (
                        <div className="flex gap-2 w-full">
                            {multiSearchItems.map((item, index) => (
                                <div key={item.id} className="flex flex-col gap-2 flex-1 min-w-0">
                                    <div className="flex items-center gap-1">
                                        <Select 
                                            value={item.type} 
                                            onValueChange={(val) => {
                                                const newItems = [...multiSearchItems];
                                                newItems[index].type = val;
                                                setMultiSearchItems(newItems);
                                            }}
                                        >
                                            <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300">
                                                <SelectValue placeholder="주문번호" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="order_no">주문번호</SelectItem>
                                                <SelectItem value="invoice_no">송장번호</SelectItem>
                                                <SelectItem value="depositor_name">입금자명</SelectItem>
                                                <SelectItem value="member_id">아이디</SelectItem>
                                                <SelectItem value="member_nickname">닉네임</SelectItem>
                                                <SelectItem value="sep1" disabled>==========</SelectItem>
                                                <SelectItem value="orderer_name">주문자명</SelectItem>
                                                <SelectItem value="orderer_phone">주문자 전화번호</SelectItem>
                                                <SelectItem value="orderer_mobile">주문자 휴대전화</SelectItem>
                                                <SelectItem value="orderer_email">주문자 이메일</SelectItem>
                                                <SelectItem value="recipient_name">수령자명</SelectItem>
                                                <SelectItem value="recipient_phone">수령자 전화번호</SelectItem>
                                                <SelectItem value="recipient_mobile">수령자 휴대전화</SelectItem>
                                                <SelectItem value="sep2" disabled>==========</SelectItem>
                                                <SelectItem value="supplier_name">공급사명</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {index === 0 ? (
                                             <Button 
                                                size="sm" 
                                                className="h-7 text-[11px] bg-[#3d4bb5] text-white hover:bg-[#2e3a94] rounded-sm px-2 border border-[#2e3a94] shadow-sm"
                                                onClick={() => setMultiSearchItems([...multiSearchItems, { id: Date.now(), type: "order_no", value: "" }])}
                                            >
                                                추가
                                            </Button>
                                        ) : (
                                            <Button 
                                                size="sm" 
                                                variant="outline"
                                                className="h-7 text-[11px] bg-white text-gray-600 hover:bg-gray-50 rounded-sm px-2 border-gray-300"
                                                onClick={() => {
                                                    const newItems = multiSearchItems.filter((_, i) => i !== index);
                                                    setMultiSearchItems(newItems);
                                                }}
                                            >
                                                삭제
                                            </Button>
                                        )}
                                    </div>
                                    <textarea 
                                        className="w-full h-20 border border-gray-300 p-2 text-xs focus:outline-none focus:border-gray-500 resize-none rounded-sm"
                                        placeholder="Enter 또는 ','로 구분하여 최대 10개까지 복수 검색이 가능합니다."
                                        value={item.value}
                                        onChange={(e) => {
                                             const newItems = [...multiSearchItems];
                                             newItems[index].value = e.target.value;
                                             setMultiSearchItems(newItems);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
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
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        </>
                    )}
                </div>
            </div>

             {/* Date Search */}
             <div className="flex items-center text-xs">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    기간검색
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                     <Select defaultValue="order_date">
                        <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300">
                            <SelectValue placeholder="주문일" />
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
                        />

                    </div>
                    <div className="flex items-center gap-0.5 ml-1">
                        <Button variant="outline" size="sm" onClick={() => {
                            setStartDate(format(new Date(), "yyyy-MM-dd"));
                            setEndDate(format(new Date(), "yyyy-MM-dd"));
                        }} className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">오늘</Button>
                        <Button variant="outline" size="sm" onClick={() => {
                            setStartDate(format(new Date(new Date().setDate(new Date().getDate() - 7)), "yyyy-MM-dd"));
                            setEndDate(format(new Date(), "yyyy-MM-dd"));
                        }} className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">7일</Button>
                        <Button variant="outline" size="sm" onClick={() => {
                            setStartDate(format(new Date(new Date().setDate(new Date().getDate() - 15)), "yyyy-MM-dd"));
                            setEndDate(format(new Date(), "yyyy-MM-dd"));
                        }} className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">15일</Button>
                        <Button variant="outline" size="sm" onClick={() => {
                            setStartDate(format(new Date(new Date().setMonth(new Date().getMonth() - 1)), "yyyy-MM-dd"));
                            setEndDate(format(new Date(), "yyyy-MM-dd"));
                        }} className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1개월</Button>
                        <Button variant="outline" size="sm" onClick={() => {
                            setStartDate(format(new Date(new Date().setMonth(new Date().getMonth() - 3)), "yyyy-MM-dd"));
                            setEndDate(format(new Date(), "yyyy-MM-dd"));
                        }} className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">3개월</Button>
                        <Button variant="outline" size="sm" onClick={() => {
                            setStartDate(format(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), "yyyy-MM-dd"));
                            setEndDate(format(new Date(), "yyyy-MM-dd"));
                        }} className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1년</Button>
                    </div>
                </div>
            </div>

            {isDetailSearchOpen && (
                <div className="border-t border-gray-200">
                    {/* Order Type & Channel */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 text-xs">
                            주문유형 <HelpCircle className="w-3 h-3 text-gray-400 ml-1" />
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-12 text-xs">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="order-type-all" className="rounded-[2px] border-red-500 text-red-500" defaultChecked />
                                    <Label htmlFor="order-type-all" className="font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="order-type-pc" className="rounded-[2px] border-gray-300" />
                                    <Label htmlFor="order-type-pc" className="font-normal cursor-pointer">PC쇼핑몰</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="order-type-mobile" className="rounded-[2px] border-gray-300" />
                                    <Label htmlFor="order-type-mobile" className="font-normal cursor-pointer">모바일쇼핑몰</Label>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    ( <Checkbox id="order-type-web" className="rounded-[2px] border-gray-300" /> <Label htmlFor="order-type-web" className="font-normal cursor-pointer">WEB</Label>
                                      <Checkbox id="order-type-app" className="rounded-[2px] border-gray-300 ml-2" /> <Label htmlFor="order-type-app" className="font-normal cursor-pointer">APP</Label> )
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="order-type-manual" className="rounded-[2px] border-gray-300" />
                                    <Label htmlFor="order-type-manual" className="font-normal cursor-pointer">수기주문</Label>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 border-l border-gray-200 pl-8">
                                <div className="font-bold w-24">주문채널구분</div>
                                <div className="flex items-center gap-4">
                                     <div className="flex items-center gap-1.5">
                                        <Checkbox id="channel-all" className="rounded-[2px] border-red-500 text-red-500" defaultChecked />
                                        <Label htmlFor="channel-all" className="font-normal cursor-pointer">전체</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox id="channel-mall" className="rounded-[2px] border-gray-300" />
                                        <Label htmlFor="channel-mall" className="font-normal cursor-pointer">쇼핑몰</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox id="channel-payco" className="rounded-[2px] border-gray-300 bg-red-500 text-white border-none" checked />
                                        <Label htmlFor="channel-payco" className="font-normal cursor-pointer">페이코</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox id="channel-naver" className="rounded-[2px] border-gray-300 bg-green-500 text-white border-none" checked />
                                        <Label htmlFor="channel-naver" className="font-normal cursor-pointer">네이버페이</Label>
                                    </div>
                                     <div className="flex items-center gap-1.5">
                                        <Checkbox id="channel-etc" className="rounded-[2px] border-gray-300 bg-gray-400 text-white border-none" checked />
                                        <Label htmlFor="channel-etc" className="font-normal cursor-pointer">기타</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 text-xs">
                            결제수단
                        </div>
                        <div className="flex-1 p-3 flex flex-col gap-2 text-xs">
                             <div className="flex items-center gap-1.5 mb-1">
                                <Checkbox id="pay-all" className="rounded-[2px] border-red-500 text-red-500" defaultChecked />
                                <Label htmlFor="pay-all" className="font-normal cursor-pointer">전체</Label>
                             </div>
                             <div className="grid grid-cols-4 gap-y-2 gap-x-8">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-card" className="rounded-[2px] border-gray-300 border-none bg-pink-100 text-pink-600" />
                                    <span className="w-4 h-4 rounded-[2px] bg-red-100 text-red-500 flex items-center justify-center text-[9px] font-bold">신</span>
                                    <Label htmlFor="pay-card" className="font-normal cursor-pointer">신용카드</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-bank" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-yellow-100 text-yellow-600 flex items-center justify-center text-[9px] font-bold">무</span>
                                    <Label htmlFor="pay-bank" className="font-normal cursor-pointer">무통장 입금</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-discount" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-red-500 text-white flex items-center justify-center text-[9px] font-bold">전</span>
                                    <Label htmlFor="pay-discount" className="font-normal cursor-pointer">전액할인</Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-mileage" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">마</span>
                                    <Label htmlFor="pay-mileage" className="font-normal cursor-pointer">마일리지</Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-deposit" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-green-500 text-white flex items-center justify-center text-[9px] font-bold">예</span>
                                    <Label htmlFor="pay-deposit" className="font-normal cursor-pointer">예치금</Label>
                                </div>
                                
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-escrow" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-purple-500 text-white flex items-center justify-center text-[9px] font-bold">계</span>
                                    <Label htmlFor="pay-escrow" className="font-normal cursor-pointer">계좌이체 (에스크로)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-virtual-escrow" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-teal-500 text-white flex items-center justify-center text-[9px] font-bold">계</span>
                                    <Label htmlFor="pay-virtual-escrow" className="font-normal cursor-pointer">계좌이체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-virtual" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-yellow-500 text-white flex items-center justify-center text-[9px] font-bold">가</span>
                                    <Label htmlFor="pay-virtual" className="font-normal cursor-pointer">가상계좌</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-phone" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-orange-500 text-white flex items-center justify-center text-[9px] font-bold">휴</span>
                                    <Label htmlFor="pay-phone" className="font-normal cursor-pointer">휴대폰결제</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-card-escrow" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-purple-100 text-purple-600 flex items-center justify-center text-[9px] font-bold">신</span>
                                    <Label htmlFor="pay-card-escrow" className="font-normal cursor-pointer">신용카드 (에스크로)</Label>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-phone-simple" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-teal-500 text-white flex items-center justify-center text-[9px] font-bold">휴</span>
                                    <Label htmlFor="pay-phone-simple" className="font-normal cursor-pointer">휴대폰 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-virtual-simple" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-purple-500 text-white flex items-center justify-center text-[9px] font-bold">가</span>
                                    <Label htmlFor="pay-virtual-simple" className="font-normal cursor-pointer">가상계좌 (에스크로)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-card-simple" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-teal-500 text-white flex items-center justify-center text-[9px] font-bold">신</span>
                                    <Label htmlFor="pay-card-simple" className="font-normal cursor-pointer">신용카드 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-transfer-simple" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-teal-500 text-white flex items-center justify-center text-[9px] font-bold">계</span>
                                    <Label htmlFor="pay-transfer-simple" className="font-normal cursor-pointer">계좌이체 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-virtual-simple2" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-teal-500 text-white flex items-center justify-center text-[9px] font-bold">가</span>
                                    <Label htmlFor="pay-virtual-simple2" className="font-normal cursor-pointer">가상계좌 (간편결제)</Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-naver" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-green-500 text-white flex items-center justify-center text-[9px] font-bold">네</span>
                                    <Label htmlFor="pay-naver" className="font-normal cursor-pointer">네이버페이 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-point" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-teal-500 text-white flex items-center justify-center text-[9px] font-bold">포</span>
                                    <Label htmlFor="pay-point" className="font-normal cursor-pointer">포인트 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-etc" className="rounded-[2px] border-gray-300" />
                                     <span className="w-4 h-4 rounded-[2px] bg-gray-400 text-white flex items-center justify-center text-[9px] font-bold">기</span>
                                    <Label htmlFor="pay-etc" className="font-normal cursor-pointer">기타</Label>
                                </div>
                             </div>
                        </div>
                    </div>

                     {/* Invoice No */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 text-xs">
                            송장번호
                        </div>
                         <div className="flex-1 p-3 flex items-center gap-4 text-xs">
                             <Select>
                                <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                                    <SelectValue placeholder="=배송 업체=" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">=배송 업체=</SelectItem>
                                    <SelectItem value="post">우체국택배</SelectItem>
                                    <SelectItem value="ems">우체국EMS</SelectItem>
                                    <SelectItem value="dhl">DHL</SelectItem>
                                    <SelectItem value="fedex">FEDEX</SelectItem>
                                    <SelectItem value="ups">UPS</SelectItem>
                                    <SelectItem value="other_parcel">기타 택배</SelectItem>
                                    <SelectItem value="registered">등기, 소포</SelectItem>
                                    <SelectItem value="freight">화물배송</SelectItem>
                                    <SelectItem value="pickup">방문수령</SelectItem>
                                    <SelectItem value="quick">퀵배송</SelectItem>
                                    <SelectItem value="other">기타</SelectItem>
                                </SelectContent>
                            </Select>
                            <RadioGroup defaultValue="all" className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="all" id="invoice-all" className="border-red-500 text-red-500" />
                                    <Label htmlFor="invoice-all" className="font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="registered" id="invoice-registered" className="border-gray-300" />
                                    <Label htmlFor="invoice-registered" className="font-normal cursor-pointer">송장번호 등록</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="unregistered" id="invoice-unregistered" className="border-gray-300" />
                                    <Label htmlFor="invoice-unregistered" className="font-normal cursor-pointer">송장번호 미등록</Label>
                                </div>
                            </RadioGroup>
                         </div>
                    </div>

                    {/* Member Info & Delivery Info */}
                    <div className="flex border-b border-gray-200">
                         <div className="w-1/2 flex border-r border-gray-200">
                            <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 text-xs">
                                회원정보
                            </div>
                             <div className="flex-1 p-3 flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="member-first" className="rounded-[2px] border-gray-300" />
                                    <Label htmlFor="member-first" className="font-normal cursor-pointer">첫주문</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="member-withdrawn" className="rounded-[2px] border-red-500 text-red-500" checked />
                                    <Label htmlFor="member-withdrawn" className="font-normal cursor-pointer">탈퇴회원 주문</Label>
                                </div>
                             </div>
                         </div>
                         <div className="w-1/2 flex">
                            <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 text-xs">
                                배송정보
                            </div>
                             <div className="flex-1 p-3 flex flex-col gap-2 text-xs">
                                 <div className="flex items-center gap-4">
                                      <div className="flex items-center gap-1.5">
                                        <Checkbox id="delivery-gift" className="rounded-[2px] border-gray-300" />
                                        <Label htmlFor="delivery-gift" className="font-normal cursor-pointer">사은품 포함</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox id="delivery-msg" className="rounded-[2px] border-gray-300" />
                                        <Label htmlFor="delivery-msg" className="font-normal cursor-pointer">배송메세지 입력</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox id="delivery-memo" className="rounded-[2px] border-gray-300" />
                                        <Label htmlFor="delivery-memo" className="font-normal cursor-pointer">관리자메모 입력</Label>
                                    </div>
                                 </div>
                                 <Select>
                                    <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                                        <SelectValue placeholder="=메모 구분=" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">=메모 구분=</SelectItem>
                                        <SelectItem value="receipt">접수</SelectItem>
                                        <SelectItem value="complete">완료</SelectItem>
                                        <SelectItem value="deposit">입금</SelectItem>
                                        <SelectItem value="delivery">배송</SelectItem>
                                        <SelectItem value="soldout">품절</SelectItem>
                                        <SelectItem value="exchange">교환</SelectItem>
                                        <SelectItem value="return">반품</SelectItem>
                                        <SelectItem value="refund">환불</SelectItem>
                                        <SelectItem value="as">A/S</SelectItem>
                                        <SelectItem value="other">기타</SelectItem>
                                    </SelectContent>
                                </Select>
                             </div>
                         </div>
                    </div>

                    {/* Member Search & Payment Amount */}
                     <div className="flex border-b border-gray-200">
                         <div className="w-1/2 flex border-r border-gray-200">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 text-xs">
                                회원검색
                            </div>
                             <div className="flex-1 p-3 flex items-center gap-4 text-xs">
                                 <RadioGroup defaultValue="all" className="flex items-center gap-4">
                                     <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="all" id="mem-search-all" className="border-red-500 text-red-500" />
                                        <Label htmlFor="mem-search-all" className="font-normal cursor-pointer">전체</Label>
                                    </div>
                                     <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="non-member" id="mem-search-non" className="border-gray-300" />
                                        <Label htmlFor="mem-search-non" className="font-normal cursor-pointer">비회원</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="member" id="mem-search-mem" className="border-gray-300" />
                                        <Label htmlFor="mem-search-mem" className="font-normal cursor-pointer">회원</Label>
                                    </div>
                                    <Button 
                                        size="sm" 
                                        className="h-6 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm px-2"
                                        onClick={() => setIsMemberGradePopupOpen(true)}
                                    >
                                        회원등급 선택
                                    </Button>
                                 </RadioGroup>
                             </div>
                         </div>
                          <div className="w-1/2 flex">
                            <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 text-xs">
                                결제금액
                            </div>
                             <div className="flex-1 p-3 flex items-center gap-2 text-xs">
                                <Input className="w-32 h-7 border-gray-300" />
                                <span>원 ~</span>
                                <Input className="w-32 h-7 border-gray-300" />
                                <span>원</span>
                             </div>
                         </div>
                     </div>

                    {/* Receipt Request */}
                    <div className="flex border-b border-gray-200">
                         <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 text-xs">
                            영수증 신청
                        </div>
                         <div className="flex-1 p-3 flex items-center gap-4 text-xs">
                              <RadioGroup defaultValue="all" className="flex items-center gap-4">
                                     <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="all" id="receipt-all" className="border-red-500 text-red-500" />
                                        <Label htmlFor="receipt-all" className="font-normal cursor-pointer">전체</Label>
                                    </div>
                                     <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="cash" id="receipt-cash" className="border-gray-300" />
                                         <span className="w-4 h-4 rounded-[2px] bg-green-500 text-white flex items-center justify-center text-[9px] font-bold">현</span>
                                        <Label htmlFor="receipt-cash" className="font-normal cursor-pointer">현금영수증</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="tax" id="receipt-tax" className="border-gray-300" />
                                        <span className="w-4 h-4 rounded-[2px] bg-gray-400 text-white flex items-center justify-center text-[9px] font-bold">세</span>
                                        <Label htmlFor="receipt-tax" className="font-normal cursor-pointer">세금계산서</Label>
                                    </div>
                                 </RadioGroup>
                         </div>
                    </div>

                    {/* Overdue & Delayed */}
                    <div className="flex border-b border-gray-200">
                         <div className="w-1/2 flex border-r border-gray-200">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 text-xs">
                                입금경과일
                            </div>
                             <div className="flex-1 p-3 flex items-center gap-2 text-xs">
                                <Input className="w-20 h-7 border-gray-300" />
                                <span>일 이상 경과</span>
                             </div>
                         </div>
                          <div className="w-1/2 flex">
                            <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 text-xs h-[50px]">
                                배송지연일
                            </div>
                             <div className="flex-1 p-3 flex flex-col gap-1 text-xs justify-center">
                                <div className="flex items-center gap-2">
                                     <Input className="w-20 h-7 border-gray-300" />
                                    <span>일 이상 지연</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-400 text-[11px]">
                                    <span className="bg-gray-600 text-white w-3 h-3 flex items-center justify-center text-[9px] rounded-[1px]">!</span>
                                    입력 시 배송 전 주문상태만 검색 가능합니다.
                                </div>
                             </div>
                         </div>
                     </div>

                     {/* Promotion & Manual Payment */}
                     <div className="flex border-b border-gray-200">
                         <div className="w-1/2 flex border-r border-gray-200">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 text-xs">
                                프로모션 정보
                            </div>
                             <div className="flex-1 p-3 flex items-center gap-2 text-xs">
                                <Button size="sm" className="h-6 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm px-2">
                                    쿠폰선택
                                </Button>
                                <Checkbox id="promo-coupon" className="rounded-[2px] border-gray-300 ml-2" />
                                <Label htmlFor="promo-coupon" className="font-normal cursor-pointer">쿠폰사용 주문 전체 검색</Label>
                             </div>
                         </div>
                          <div className="w-1/2 flex">
                            <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 text-xs">
                                수동 결제완료 처리
                            </div>
                             <div className="flex-1 p-3 flex items-center gap-2 text-xs">
                                <Checkbox id="manual-pay" className="rounded-[2px] border-gray-300" />
                                <Label htmlFor="manual-pay" className="font-normal cursor-pointer">수동 결제완료 처리 주문만 보기</Label>
                             </div>
                         </div>
                     </div>

                      {/* Brand */}
                     <div className="flex">
                         <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 text-xs">
                            브랜드
                        </div>
                         <div className="flex-1 p-3 flex items-center gap-4 text-xs">
                            <Button 
                                size="sm" 
                                className="h-6 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm px-2"
                                onClick={() => setIsBrandPopupOpen(true)}
                            >
                                브랜드선택
                            </Button>
                            <div className="flex items-center gap-1.5">
                                <Checkbox id="brand-unspecified" className="rounded-[2px] border-gray-300" />
                                <Label htmlFor="brand-unspecified" className="font-normal cursor-pointer">브랜드 미지정 상품</Label>
                            </div>
                         </div>
                     </div>

                </div>
            )}

            <div className="p-3 bg-white border-t border-gray-200">
                <button 
                  className="flex items-center text-blue-500 font-bold text-xs hover:underline"
                  onClick={() => setIsDetailSearchOpen(!isDetailSearchOpen)}
                >
                    {isDetailSearchOpen ? '상세검색 닫힘' : '상세검색 펼침'}
                    <ChevronUp className={`w-3 h-3 ml-1 transform transition-transform ${isDetailSearchOpen ? '' : 'rotate-180'}`} />
                </button>
            </div>

        </div>
         
         <div className="bg-white p-4 flex justify-center border-t border-gray-200">
             <Button onClick={handleSearch} className="bg-[#555555] hover:bg-[#444444] text-white font-bold h-10 w-32 rounded-sm text-sm">검색</Button>
         </div>
      </div>
      
      {/* Tabs */}
      <div className="flex mb-4">
          <div 
            onClick={() => setViewType("order")}
            className={`px-4 py-2 border border-gray-300 border-b-white text-xs cursor-pointer relative top-[1px] z-10 ${viewType === "order" ? "bg-white text-gray-900 font-bold" : "bg-[#F5F5F5] text-gray-500 border-l-0"}`}
          >
              주문번호별
          </div>
          <div 
            onClick={() => setViewType("product_order")}
            className={`px-4 py-2 border border-gray-300 border-l-0 text-xs cursor-pointer relative top-[1px] z-10 ${viewType === "product_order" ? "bg-white text-gray-900 font-bold border-b-white" : "bg-[#F5F5F5] text-gray-500 border-b-gray-300"}`}
          >
              상품주문번호별
          </div>
          <div className="flex-1 border-b border-gray-300"></div>
      </div>

      {/* List Header */}
      <div className="flex justify-between items-end mb-2">
          <div className="text-xs text-gray-700 font-bold">
              검색 <span className="text-red-500">{total}</span>개 / 전체 <span className="text-red-500">{total}</span>개 <span className="text-gray-500 font-normal">( 검색된 주문 총 결제금액 : <span className="text-red-500">{orders.reduce((acc, cur) => acc + cur.totalPayAmount, 0).toLocaleString()}</span>원 )</span>
          </div>
          <div className="flex gap-1 items-center">
               <Select defaultValue="order_date_desc">
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
                        <SelectItem value="total_price_desc">총 결제금액 ↓</SelectItem>
                        <SelectItem value="total_price_asc">총 결제금액 ↑</SelectItem>
                        <SelectItem value="recipient_desc">수령자 ↓</SelectItem>
                        <SelectItem value="recipient_asc">수령자 ↑</SelectItem>
                        <SelectItem value="supplier_desc">공급사 ↓</SelectItem>
                        <SelectItem value="supplier_asc">공급사 ↑</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="20">
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
                    className="h-7 text-[11px] bg-[#555555] text-white hover:bg-[#444444] rounded-sm ml-1"
                    onClick={() => setIsSearchConfigPopupOpen(true)}
                 >
                    조회항목설정
                </Button>
          </div>
      </div>
      
      {/* Action Toolbar */}
      {viewType === "product_order" ? (
         <div className="flex justify-between items-center bg-[#F9F9F9] p-2 border border-gray-300 border-b-0">
             <div className="flex items-center gap-1 text-xs">
                 <div className="flex items-center gap-1 text-xs font-bold text-gray-700 mr-2 whitespace-nowrap">
                     <span className="text-red-500">✔</span>
                     <span>선택한 주문을</span>
                 </div>
                 <Select defaultValue="status">
                     <SelectTrigger className="w-32 h-8 text-xs border-gray-300 bg-white">
                         <SelectValue placeholder="=주문상태=" />
                     </SelectTrigger>
                     <SelectContent>
                         <SelectItem value="status">=주문상태=</SelectItem>
                          <SelectItem value="payment_waiting">입금대기</SelectItem>
                          <SelectItem value="payment_completed">결제완료</SelectItem>
                     </SelectContent>
                 </Select>
                 <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                     일괄처리
                 </Button>
                 <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                     취소처리
                 </Button>
             </div>
             <div>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                    입금요청 SMS발송
                </Button>
             </div>
         </div>
      ) : activeTab === "입금대기 리스트" || activeTab === "결제완료 리스트" || activeTab === "상품준비중 리스트" || activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트" ? (
        <div className="flex justify-between items-center bg-white p-2 border border-gray-300 border-b-0">
            <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-red-500 mr-2 border-r border-gray-300 pr-3 whitespace-nowrap flex-shrink-0 w-max">
                    <span className="text-gray-600">선택한 주문을</span>
                </span>
                <Select defaultValue="status">
                    <SelectTrigger className="w-32 h-8 text-xs border-gray-300">
                        <SelectValue placeholder="=주문상태=" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="status">=주문상태=</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                    일괄처리
                </Button>
                {activeTab === "입금대기 리스트" && (
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                        취소처리
                    </Button>
                )}
                {activeTab === "상품준비중 리스트" && (
                    <>
                        <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                            송장번호 저장
                        </Button>
                        <Button variant="default" size="sm" className="h-8 text-xs bg-[#232B3E] hover:bg-[#1a2130] text-white border border-[#232B3E] rounded-sm">
                            묶음배송처리
                        </Button>
                        <Button variant="default" size="sm" className="h-8 text-xs bg-[#232B3E] hover:bg-[#1a2130] text-white border border-[#232B3E] rounded-sm">
                            묶음배송해제
                        </Button>
                    </>
                )}
            </div>
            {activeTab === "입금대기 리스트" ? (
                 <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                    입금요청 이메일발송
                 </Button>
            ) : (
                <div className="flex items-center gap-1">
                    <Button size="sm" className="h-8 text-[11px] bg-[#111111] hover:bg-black text-white rounded-sm px-3 font-bold border border-[#111111]">
                        이메일발송
                    </Button>
                    <Select defaultValue="print_select">
                       <SelectTrigger className="w-28 h-8 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="=인쇄 선택=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="print_select">=인쇄 선택=</SelectItem>
                            <SelectItem value="order_statement">주문내역서</SelectItem>
                            <SelectItem value="order_statement_customer">주문내역서 (고객용)</SelectItem>
                            <SelectItem value="receipt_simple">간이영수증</SelectItem>
                            <SelectItem value="transaction_statement">거래명세서</SelectItem>
                            <SelectItem value="tax_invoice">세금계산서</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="h-8 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-2 font-normal flex items-center gap-1">
                        <Printer className="w-3 h-3" />
                        프린트
                    </Button>
                </div>
            )}
        </div>
      ) : activeTab === "결제 중단/실패 리스트" ? (
        <div className="flex justify-between items-center bg-white p-2 border border-gray-300 border-b-0">
             <div className="flex items-center gap-2 text-xs">
                 <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                     <span className="text-red-500">✔</span>
                     <span>선택한 주문을</span>
                 </div>
                 <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                     삭제처리
                 </Button>
             </div>
        </div>
      ) : (
        <div className="flex justify-between items-center bg-[#F9F9F9] p-2 border border-gray-300 border-b-0">
            <div className="flex items-center gap-1">
                <Button size="sm" className="h-7 text-[11px] bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm px-3 font-bold border border-[#FF424D]">
                    이메일발송
                </Button>
                <Select defaultValue="print_select">
                   <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                        <SelectValue placeholder="=인쇄 선택=" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="print_select">=인쇄 선택=</SelectItem>
                        <SelectItem value="order_statement">주문내역서</SelectItem>
                        <SelectItem value="order_statement_customer">주문내역서 (고객용)</SelectItem>
                        <SelectItem value="receipt_simple">간이영수증</SelectItem>
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
      )}

      {/* Table */}
      <div className="border border-gray-300 mb-4 overflow-x-auto">
        {viewType === "product_order" ? (
             <table className="w-full text-xs text-center border-collapse table-fixed min-w-[1800px]">
                <colgroup>
                    <col className="w-10" />
                    <col className="w-12" />
                    <col className="w-20" />
                    <col className="w-24" />
                    <col className="w-20" />
                    <col className="w-20" />
                    <col className="w-32" />
                    <col className="" />
                    <col className="w-12" />
                    <col className="w-20" />
                    <col className="w-20" />
                    <col className="w-20" />
                    <col className="w-20" />
                    <col className="w-24" />
                    <col className="w-20" />
                    <col className="w-20" />
                    <col className="w-20" />
                </colgroup>
                <thead className="bg-[#A3A3A3] text-white font-normal h-10">
                    <tr>
                        <th className="border-r border-[#CDCDCD]">
                            <div className="flex justify-center">
                                <Checkbox className="bg-white border-gray-300 rounded-[2px] w-4 h-4"/>
                            </div>
                        </th>
                        <th className="border-r border-[#CDCDCD]">번호</th>
                        <th className="border-r border-[#CDCDCD]">상점구분</th>
                        <th className="border-r border-[#CDCDCD]">주문일시</th>
                        <th className="border-r border-[#CDCDCD]">경과일자</th>
                        <th className="border-r border-[#CDCDCD]">주문자</th>
                        <th className="border-r border-[#CDCDCD]">상품주문번호</th>
                        <th className="border-r border-[#CDCDCD]">주문상품</th>
                        <th className="border-r border-[#CDCDCD]">수량</th>
                        <th className="border-r border-[#CDCDCD]">상품금액</th>
                        <th className="border-r border-[#CDCDCD]">총상품금액</th>
                        <th className="border-r border-[#CDCDCD]">배송비</th>
                        <th className="border-r border-[#CDCDCD]">총 배송비</th>
                        <th className="border-r border-[#CDCDCD]">총 주문금액</th>
                        <th className="border-r border-[#CDCDCD]">결제방법</th>
                        <th className="border-r border-[#CDCDCD]">처리상태</th>
                        <th className="border-r border-[#CDCDCD]">입금자</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                     <tr>
                        <td colSpan={17} className="py-10 text-center text-gray-500">
                             검색된 주문이 없습니다.
                        </td>
                     </tr>
                </tbody>
             </table>
        ) : activeTab === "입금대기 리스트" ? (
          <table className="w-full text-xs text-center border-collapse table-fixed min-w-[1200px]">
               <colgroup>
                  <col className="w-10" />
                  <col className="w-16" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-40" />
                  <col className="w-32" />
                  <col className="" />
                  <col className="w-32" />
               </colgroup>
               <thead className="bg-[#A3A3A3] text-white font-normal h-10">
                   <tr>
                       <th className="border-r border-[#CDCDCD]">
                           <div className="flex justify-center">
                               <Checkbox className="bg-white border-gray-300 rounded-[2px] w-4 h-4"/>
                           </div>
                       </th>
                       <th className="border-r border-[#CDCDCD]">번호</th>
                       <th className="border-r border-[#CDCDCD]">상점구분</th>
                       <th className="border-r border-[#CDCDCD]">주문일시</th>
                       <th className="border-r border-[#CDCDCD]">경과일자</th>
                       <th className="border-r border-[#CDCDCD]">주문번호</th>
                       <th className="border-r border-[#CDCDCD]">주문자</th>
                       <th className="border-r border-[#CDCDCD]">주문상품</th>
                       <th>총 상품금액</th>
                   </tr>
               </thead>
               <tbody className="text-gray-600 bg-white">
                   {loading ? (
                        <tr><td colSpan={9} className="py-20 border-b border-gray-200 text-center text-sm">로딩중...</td></tr>
                   ) : orders.length === 0 ? (
                        <tr><td colSpan={9} className="py-20 border-b border-gray-200 text-center text-sm">검색된 주문이 없습니다.</td></tr>
                   ) : (
                       orders.map((order, idx) => (
                           <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 text-xs text-center h-8">
                               <td className="border-r border-[#CDCDCD]"><div className="flex justify-center"><Checkbox className="bg-white border-gray-300 rounded-[2px] w-4 h-4"/></div></td>
                               <td className="border-r border-[#CDCDCD]">{total - ((page - 1) * limit) - idx}</td>
                               <td className="border-r border-[#CDCDCD]">{order.mallId === 'KR' ? '🇰🇷' : '🇨🇳'}</td>
                               <td className="border-r border-[#CDCDCD]">{format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")}</td>
                               <td className="border-r border-[#CDCDCD] text-red-500 font-bold">{Math.floor((new Date().getTime() - new Date(order.createdAt).getTime()) / (1000 * 3600 * 24))}일</td>
                               <td className="border-r border-[#CDCDCD] text-blue-500 font-bold cursor-pointer hover:underline">{order.orderNo}</td>
                               <td className="border-r border-[#CDCDCD]">{order.ordererName}</td>
                               <td className="border-r border-[#CDCDCD] text-left px-2 truncate max-w-[200px]" title={order.items.map((i: OrderItem) => i.productName).join(', ')}>
                                  {order.items.length > 0 ? `${order.items[0].productName} ${order.items.length > 1 ? `외 ${order.items.length - 1}건` : ''}` : '-'}
                               </td>
                               <td className="text-right px-2 font-bold">{order.totalPayAmount.toLocaleString()}</td>
                           </tr>
                       ))
                   )}
               </tbody>
          </table>
        ) : activeTab === "결제완료 리스트" || activeTab === "상품준비중 리스트" || activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트" ? (
          <table className="w-full text-xs text-center border-collapse table-fixed min-w-[1200px]">
               <colgroup>
                  <col className="w-10" />
                  <col className="w-16" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-40" />
                  <col className="w-32" />
                  <col className="" />
                  {(activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트") && <col className="w-32" />}
               </colgroup>
               <thead className="bg-[#A3A3A3] text-white font-normal h-10">
                   <tr>
                       <th className="border-r border-[#CDCDCD]">
                           <div className="flex justify-center">
                               <Checkbox className="bg-white border-gray-300 rounded-[2px] w-4 h-4"/>
                           </div>
                       </th>
                       <th className="border-r border-[#CDCDCD]">번호</th>
                       <th className="border-r border-[#CDCDCD]">상점구분</th>
                       <th className="border-r border-[#CDCDCD]">주문일시</th>
                       <th className="border-r border-[#CDCDCD]">주문번호</th>
                       <th className="border-r border-[#CDCDCD]">주문자</th>
                       <th className={`${(activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트") ? "border-r border-[#CDCDCD]" : ""}`}>주문상품</th>
                       {(activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트") && <th>총 상품금액</th>}
                   </tr>
               </thead>
               <tbody className="text-gray-600 bg-white">
                   {loading ? (
                        <tr><td colSpan={8} className="py-20 border-b border-gray-200 text-center text-sm">로딩중...</td></tr>
                   ) : orders.length === 0 ? (
                        <tr><td colSpan={8} className="py-20 border-b border-gray-200 text-center text-sm">검색된 주문이 없습니다.</td></tr>
                   ) : (
                       orders.map((order, idx) => (
                           <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 text-xs text-center h-8">
                               <td className="border-r border-[#CDCDCD]"><div className="flex justify-center"><Checkbox className="bg-white border-gray-300 rounded-[2px] w-4 h-4"/></div></td>
                               <td className="border-r border-[#CDCDCD]">{total - ((page - 1) * limit) - idx}</td>
                               <td className="border-r border-[#CDCDCD]">{order.mallId === 'KR' ? '🇰🇷' : '🇨🇳'}</td>
                               <td className="border-r border-[#CDCDCD]">{format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")}</td>
                               <td className="border-r border-[#CDCDCD] text-blue-500 font-bold cursor-pointer hover:underline">{order.orderNo}</td>
                               <td className="border-r border-[#CDCDCD]">{order.ordererName}</td>
                               <td className={`border-r border-[#CDCDCD] text-left px-2 truncate max-w-[200px]`} title={order.items.map((i: OrderItem) => i.productName).join(', ')}>
                                  {order.items.length > 0 ? `${order.items[0].productName} ${order.items.length > 1 ? `외 ${order.items.length - 1}건` : ''}` : '-'}
                               </td>
                               {(activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트") && (
                                   <td className="text-right px-2 font-bold">{order.totalPayAmount.toLocaleString()}</td>
                               )}
                           </tr>
                       ))
                   )}
               </tbody>
          </table>
        ) : activeTab === "결제 중단/실패 리스트" ? (
          <table className="w-full text-xs text-center border-collapse table-fixed min-w-[1200px]">
               <colgroup>
                  <col className="w-10" />
                  <col className="w-16" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-40" />
                  <col className="w-32" />
                   <col className="w-40" />
                  <col className="" />
               </colgroup>
               <thead className="bg-[#A3A3A3] text-white font-normal h-10">
                   <tr>
                       <th className="border-r border-[#CDCDCD]">
                           <div className="flex justify-center">
                               <Checkbox className="bg-white border-gray-300 rounded-[2px] w-4 h-4"/>
                           </div>
                       </th>
                       <th className="border-r border-[#CDCDCD]">번호</th>
                       <th className="border-r border-[#CDCDCD]">상점구분</th>
                       <th className="border-r border-[#CDCDCD]">주문일시</th>
                       <th className="border-r border-[#CDCDCD]">주문번호</th>
                       <th className="border-r border-[#CDCDCD]">주문자</th>
                        <th className="border-r border-[#CDCDCD]">상품주문번호</th>
                       <th>주문상품</th>
                   </tr>
               </thead>
               <tbody className="text-gray-600 bg-white">
                   {loading ? (
                        <tr><td colSpan={8} className="py-20 border-b border-gray-200 text-center text-sm">로딩중...</td></tr>
                   ) : orders.length === 0 ? (
                        <tr><td colSpan={8} className="py-20 border-b border-gray-200 text-center text-sm">검색된 주문이 없습니다.</td></tr>
                   ) : (
                       orders.map((order, idx) => (
                           <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 text-xs text-center h-8">
                               <td className="border-r border-[#CDCDCD]"><div className="flex justify-center"><Checkbox className="bg-white border-gray-300 rounded-[2px] w-4 h-4"/></div></td>
                               <td className="border-r border-[#CDCDCD]">{total - ((page - 1) * limit) - idx}</td>
                               <td className="border-r border-[#CDCDCD]">{order.mallId === 'KR' ? '🇰🇷' : '🇨🇳'}</td>
                               <td className="border-r border-[#CDCDCD]">{format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")}</td>
                               <td className="border-r border-[#CDCDCD] text-blue-500 font-bold cursor-pointer hover:underline">{order.orderNo}</td>
                               <td className="border-r border-[#CDCDCD]">{order.ordererName}</td>
                               <td className="border-r border-[#CDCDCD] text-center">-</td>
                               <td className="text-left px-2 truncate max-w-[200px]" title={order.items.map((i: OrderItem) => i.productName).join(', ')}>
                                  {order.items.length > 0 ? `${order.items[0].productName} ${order.items.length > 1 ? `외 ${order.items.length - 1}건` : ''}` : '-'}
                               </td>
                           </tr>
                       ))
                   )}
               </tbody>
          </table>
        ) : (
          <table className="w-full text-xs text-center border-collapse table-fixed min-w-[1800px]">
              <colgroup>
                  <col className="w-10" />
                  <col className="w-12" />
                  <col className="w-20" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-16" />
                  <col className="w-16" />
                  <col className="w-16" />
                  <col className="w-12" />
                  <col className="w-12" />
                  <col className="w-12" />
                  <col className="w-12" />
                  <col className="w-24" />
                  <col className="w-24" />
              </colgroup>
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr>
                      <th className="py-2.5 border-r border-[#CDCDCD]">
                          <Checkbox className="bg-white border-gray-300 rounded-[2px]"/>
                      </th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">번호</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">상점구분</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">주문일시</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">주문번호</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">주문자</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">주문상품</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">총 상품금액</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">총 배송비</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">총 주문금액</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">결제방법</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">결제상태</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">미배송</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">배송중</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">배송완료</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">취소</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">교환</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">반품</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">환불</th>
                      <th className="py-2.5 border-r border-[#CDCDCD]">관리자메모</th>
                      <th className="py-2.5">주문유형</th>
                  </tr>
              </thead>
              <tbody className="text-gray-600 bg-white">
                  {loading ? (
                       <tr>
                           <td colSpan={21} className="py-10 border-b border-gray-200 text-center text-sm">
                               로딩중...
                           </td>
                       </tr>
                  ) : orders.length === 0 ? (
                      <tr>
                          <td colSpan={21} className="py-10 border-b border-gray-200 text-center text-sm">
                              검색된 주문이 없습니다.
                          </td>
                      </tr>
                  ) : (
                      orders.map((order, idx) => (
                          <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 text-xs text-center h-8">
                               <td className="border-r border-[#CDCDCD]">
                                   <div className="flex justify-center">
                                      <Checkbox className="bg-white border-gray-300 rounded-[2px] w-4 h-4"/>
                                   </div>
                               </td>
                               <td className="border-r border-[#CDCDCD]">{total - ((page - 1) * limit) - idx}</td>
                               <td className="border-r border-[#CDCDCD]">{order.mallId === 'KR' ? '🇰🇷' : '🇨🇳'}</td>
                               <td className="border-r border-[#CDCDCD]">{format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")}</td>
                               <td className="border-r border-[#CDCDCD] text-blue-500 font-bold cursor-pointer hover:underline">{order.orderNo}</td>
                               <td className="border-r border-[#CDCDCD]">{order.ordererName}</td>
                               <td className="border-r border-[#CDCDCD] text-left px-2 truncate max-w-[200px]" title={order.items.map((i: OrderItem) => i.productName).join(', ')}>
                                  {order.items.length > 0 ? `${order.items[0].productName} ${order.items.length > 1 ? `외 ${order.items.length - 1}건` : ''}` : '-'}
                               </td>
                               <td className="border-r border-[#CDCDCD] text-right px-2">{order.totalItemPrice.toLocaleString()}</td>
                               <td className="border-r border-[#CDCDCD] text-right px-2">{order.shippingFee.toLocaleString()}</td>
                               <td className="border-r border-[#CDCDCD] text-right px-2 font-bold">{order.totalPayAmount.toLocaleString()}</td>
                               <td className="border-r border-[#CDCDCD]">{order.paymentMethod}</td>
                               <td className="border-r border-[#CDCDCD]">{order.status}</td>
                               <td className="border-r border-[#CDCDCD] text-gray-400">-</td>
                               <td className="border-r border-[#CDCDCD] text-gray-400">-</td>
                               <td className="border-r border-[#CDCDCD] text-gray-400">-</td>
                               <td className="border-r border-[#CDCDCD] text-gray-400">-</td>
                               <td className="border-r border-[#CDCDCD] text-gray-400">-</td>
                               <td className="border-r border-[#CDCDCD] text-gray-400">-</td>
                               <td className="text-gray-400">-</td>
                          </tr>
                      ))
                  )}
              </tbody>
          </table>
        )}
      </div>

      {/* Excel Download */}
      {/* Excel Download & Bottom Actions */}
      {activeTab === "입금대기 리스트" || activeTab === "결제완료 리스트" || activeTab === "상품준비중 리스트" || activeTab === "배송중 리스트" || activeTab === "배송완료 리스트" || activeTab === "구매확정 리스트" ? (
         <div className="flex justify-between items-center bg-white p-2 border border-gray-300 mb-10">
            <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-red-500 mr-2 border-r border-gray-300 pr-3 whitespace-nowrap flex-shrink-0 w-max">
                    <span className="text-gray-600">선택한 주문을</span>
                </span>
                <Select defaultValue="status">
                    <SelectTrigger className="w-32 h-8 text-xs border-gray-300">
                         <SelectValue placeholder="=주문상태=" />
                    </SelectTrigger>
                    <SelectContent>
                         <SelectItem value="status">=주문상태=</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                    일괄처리
                </Button>
                {activeTab === "입금대기 리스트" && (
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                        취소처리
                    </Button>
                )}
                {activeTab === "상품준비중 리스트" && (
                    <>
                        <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                            송장번호 저장
                        </Button>
                        <Button variant="default" size="sm" className="h-8 text-xs bg-[#232B3E] hover:bg-[#1a2130] text-white border border-[#232B3E] rounded-sm">
                            묶음배송처리
                        </Button>
                        <Button variant="default" size="sm" className="h-8 text-xs bg-[#232B3E] hover:bg-[#1a2130] text-white border border-[#232B3E] rounded-sm">
                            묶음배송해제
                        </Button>
                    </>
                )}
            </div>
             <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-green-500 hover:bg-green-50 text-green-600 font-bold flex items-center gap-1.5 px-3 rounded-sm shadow-sm transition-colors">
                 <div className="bg-green-600 text-white p-0.5 rounded-[2px]">
                     <FileSpreadsheet className="w-3 h-3 text-white fill-current" />
                 </div>
                 엑셀다운로드
            </Button>
        </div>
      ) : activeTab === "결제 중단/실패 리스트" ? (
         <div className="flex justify-between items-center bg-white p-2 border border-gray-300 mb-10">
             <div className="flex items-center gap-2 text-xs">
                 <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                     <span className="text-red-500">✔</span>
                     <span>선택한 주문을</span>
                 </div>
                 <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                     삭제처리
                 </Button>
             </div>
             <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-green-500 hover:bg-green-50 text-green-600 font-bold flex items-center gap-1.5 px-3 rounded-sm shadow-sm transition-colors">
                 <div className="bg-green-600 text-white p-0.5 rounded-[2px]">
                     <FileSpreadsheet className="w-3 h-3 text-white fill-current" />
                 </div>
                 엑셀다운로드
            </Button>
        </div>
      ) : (
      <div className="flex justify-between items-center mb-10 bg-[#F9F9F9] p-2 border border-gray-300 border-t-0">
          {viewType === "product_order" ? (
             <div className="flex items-center gap-1 text-xs">
                 <div className="flex items-center gap-1 text-xs font-bold text-gray-700 mr-2 whitespace-nowrap">
                     <span className="text-red-500">✔</span>
                     <span>선택한 주문을</span>
                 </div>
                 <Select defaultValue="status">
                     <SelectTrigger className="w-32 h-8 text-xs border-gray-300 bg-white">
                         <SelectValue placeholder="=주문상태=" />
                     </SelectTrigger>
                     <SelectContent>
                         <SelectItem value="status">=주문상태=</SelectItem>
                          <SelectItem value="payment_waiting">입금대기</SelectItem>
                          <SelectItem value="payment_completed">결제완료</SelectItem>
                     </SelectContent>
                 </Select>
                 <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                     일괄처리
                 </Button>
                 <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">
                     취소처리
                 </Button>
             </div>
          ) : (
             <div></div>
          )}
          
           <div className="flex justify-end">
               <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 hover:bg-gray-50 text-green-600 font-bold flex items-center gap-1.5 px-3 rounded-sm shadow-sm">
                    <div className="bg-green-600 text-white p-0.5 rounded-[2px]">
                        <FileSpreadsheet className="w-3 h-3 text-white fill-current" />
                    </div>
                    엑셀다운로드
               </Button>
           </div>
      </div>
      )}
      
      <div className="border-t border-gray-300 mb-8"></div>

       {/* Guide Section */}
       <div className="space-y-6 text-gray-600">
           <div>
              <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs mb-3">
                 <BookOpen className="w-4 h-4" /> 
                 <span>안내</span>
              </div>
              {activeTab === "입금대기 리스트" ? (
                  <div className="space-y-4">
                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 리스트의 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "주문 상태 설정" 항목에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 리스트 내 주문은 다음 단계인 "결제완료" 상태로만 변경할 수 있으며, 주문의 일부 상품만 부분적으로 결제완료 상태로 변경이 불가능합니다.</p>
                               <p>· "기본설정{">"}주문정책{">"}주문상태 설정"에서 "입금 상태 설정" 항목에 추가된 주문상태가 있는 경우, 해당 주문상태로도 변경할 수 있습니다.</p>
                           </div>
                      </div>

                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 일부 상품만 부분취소할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 상태의 주문만 취소할 수 있으며, 주문의 일부 상품만 부분적으로 취소할 수 없습니다.</p>
                               <p>· 취소된 주문은 "취소/교환/반품/환불 관리{">"}취소 리스트"에서 확인 가능합니다.</p>
                               <p className="text-red-500 font-bold">· 취소된 주문 정보는 복구가 불가능하므로 신중하게 해야합니다.</p>
                           </div>
                      </div>
                  </div>
              ) : activeTab === "결제완료 리스트" ? (
                  <div className="space-y-4">
                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 결제완료 리스트의 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "입금 상태 설정" 항목에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 결제완료 리스트 내 주문은 상품별로 다음 단계인 "상품준비중/구매발주/상품입고/상품출고" 상태로 변경할 수 있습니다,</p>
                               <p>· "기본설정{">"}주문정책{">"}주문상태 설정"에서 "입금 상태 설정 / 상품 상태 설정" 항목에 추가된 주문상태가 있는 경우, 해당 주문상태로도 변경할 수 있습니다.</p>
                           </div>
                      </div>

                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 결제완료 상태를 입금대기 상태로 변경할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 주문리스트에서 결제완료 상태의 주문을 "입금대기" 상태로 변경할 수 없습니다.</p>
                               <p>· 결제완료 상태에서 입금대기 상태로 변경은 해당 주문의 "주문 상세정보" 페이지에서만 가능합니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 출고전 취소할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 상태의 주문만 취소할 수 있으므로, 결제완료 상태의 주문은 취소처리가 불가능합니다.</p>
                               <p>· 결제완료 상태의 주문은 해당 주문의 "주문 상세정보" 페이지 내 "클레임 접수" 항목에서 "환불접수"를 통해 구매자에게 결제금액 환불 및 주문철회가 가능합니다.</p>
                               <p>· 환불접수된 주문은 "취소/교환/반품/환불 관리{">"}환불 리스트"에서 확인 가능합니다.</p>
                           </div>
                      </div>
                  </div>
              ) : activeTab === "상품준비중 리스트" ? (
                  <div className="space-y-4">
                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 상품준비중 리스트의 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "상품 상태 설정" 항목에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 상품준비중 리스트 내 주문은 상품별로 다음 단계인 "상품준비중/구매발주/상품입고/상품출고" 또는 이전 단계인 "결제완료" 상태로 변경할 수 있습니다,</p>
                               <p>· "기본설정{">"}주문정책{">"}주문상태 설정"에서 "상품 상태 설정 / 입금 상태 설정" 항목에 추가된 주문상태가 있는 경우, 해당 주문상태로도 변경할 수 있습니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 출고전 취소할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 상태의 주문만 취소할 수 있으므로, 상품준비중 상태의 주문은 취소처리가 불가능합니다.</p>
                               <p>· 상품준비중 상태의 주문은 해당 주문의 "주문 상세정보" 페이지 내 "클레임 접수" 항목에서 "환불접수"를 통해 구매자에게 결제금액 환불 및 주문철회가 가능합니다.</p>
                               <p>· 환불접수된 주문은 "취소/교환/반품/환불 관리{">"}환불 리스트"에서 확인 가능합니다.</p>
                           </div>
                      </div>
                  </div>
              ) : activeTab === "배송중 리스트" ? (
                  <div className="space-y-4">
                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 배송중 리스트의 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "배송 상태 설정" 항목에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 배송중 리스트 내 주문은 상품별로 다음 단계인 "배송완료" 또는 이전 단계인 "상품준비중/구매발주/상품입고/상품출고" 상태로 변경할 수 있습니다,</p>
                               <p>· "기본설정{">"}주문정책{">"}주문상태 설정"에서 "배송 상태 설정 / 상품 상태 설정" 항목에 추가된 주문상태가 있는 경우, 해당 주문상태로도 변경할 수 있습니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 출고전 취소할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 상태의 주문만 취소할 수 있으므로, 배송중 상태의 주문은 취소처리가 불가능합니다.</p>
                               <p>· 배송중 상태의 주문은 해당 주문의 "주문 상세정보" 페이지 내 "클레임 접수" 항목에서 "반품접수"가 가능합니다.</p>
                               <p>· 반품접수된 주문은 "취소/교환/반품/환불 관리{">"}반품 리스트"에서 확인 가능합니다.</p>
                               <p>· 반품접수된 주문은 "환불접수" 상태로 변경이 가능하며, 환불 리스트에서 구매자에게 결제금액 환불이 가능합니다.</p>
                           </div>
                      </div>
                  </div>
              ) : activeTab === "배송완료 리스트" ? (
                  <div className="space-y-4">
                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 배송완료 리스트의 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "배송 상태 설정" 항목에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 배송완료 리스트 내 주문은 상품별로 다음 단계인 "구매확정" 또는 이전 단계인 "배송중" 상태로 변경할 수 있습니다,</p>
                               <p>· "기본설정{">"}주문정책{">"}주문상태 설정"에서 "배송 상태 설정" 항목에 추가된 주문상태가 있는 경우, 해당 주문상태로도 변경할 수 있습니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 출고전 취소할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 상태의 주문만 취소할 수 있으므로, 배송완료 상태의 주문은 취소처리가 불가능합니다.</p>
                               <p>· 배송완료 상태의 주문은 해당 주문의 "주문 상세정보" 페이지 내 "클레임 접수" 항목에서 "반품접수"가 가능합니다.</p>
                               <p>· 반품접수된 주문은 "취소/교환/반품/환불 관리{">"}반품 리스트"에서 확인 가능합니다.</p>
                               <p>· 반품접수된 주문은 "환불접수" 상태로 변경이 가능하며, 환불 리스트에서 구매자에게 결제금액 환불이 가능합니다.</p>
                           </div>
                      </div>
                  </div>
              ) : activeTab === "구매확정 리스트" ? (
                  <div className="space-y-4">
                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 구매확정 리스트의 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "구매확정 상태 설정" 항목에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 구매확정 리스트 내 주문은 상품별로 이전 단계인 "배송완료" 상태로 변경할 수 있습니다,</p>
                               <p>· "기본설정{">"}주문정책{">"}주문상태 설정"에서 "구매확정 상태 설정 / 배송 상태 설정" 항목에 추가된 주문상태가 있는 경우, 해당 주문상태로도 변경할 수 있습니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 출고전 취소할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 입금대기 상태의 주문만 취소할 수 있으므로, 구매확정 상태의 주문은 취소처리가 불가능합니다.</p>
                               <p>· 구매확정 상태의 주문은 해당 주문의 "주문 상세정보" 페이지 내 "클레임 접수" 항목에서 "반품접수"가 가능합니다.</p>
                               <p>· 반품접수된 주문은 "취소/교환/반품/환불 관리{">"}반품 리스트"에서 확인 가능합니다.</p>
                               <p>· 반품접수된 주문은 "환불접수" 상태로 변경이 가능하며, 환불 리스트에서 구매자에게 결제금액 환불이 가능합니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 구매확정 상태에서 구매자도 반품접수가 가능한가요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 구매확정 상태의 주문은 관리자페이지에서 운영자만 반품 또는 교환접수가 가능합니다.</p>
                               <p>· 구매자의 경우 쇼핑몰 마이페이지에서 구매확정 이전 상태의 주문만 "취소/교환/반품/환불신청"을 할 수 있습니다.</p>
                               <p className="pl-2">- 입금대기 상태 주문은 구매자가 쇼핑몰 마이페이지에서 직접 취소처리가 가능합니다.</p>
                               <p className="pl-2">(구매자가 직접 취소처리한 주문은 "취소/교환/반품/환불 관리{">"}취소 리스트" 메뉴에서 "고객요청취소" 상태로 노출됩니다.)</p>
                               <p className="pl-2">- 배송중, 배송완료 상태 주문은 구매자가 쇼핑몰 마이페이지에서 교환신청 또는 반품신청이 가능하며, 상품준비중 상태 주문은 환불신청이 가능합니다.</p>
                               <p className="pl-2">(구매자가 "교환/반품/환불신청"한 주문은 "취소/교환/반품/환불 관리{">"}고객 교환/반품/환불신청 관리" 페이지에서 확인할 수 있으며, <span className="text-red-500 font-bold">운영자는 구매자의 교환/반품/환불신청을 "승인 또는 거절"처리가 가능</span>합니다.)</p>
                           </div>
                      </div>
                  </div>
              ) : activeTab === "결제 중단/실패 리스트" ? (
                  <div className="space-y-4">
                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 결제 실패/시도란 무엇인가요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 결제실패/시도란 구매자의 주문결제가 정상적으로 완료되지 않은 상태 입니다.</p>
                               <p>· 결제실패/시도 리스트의 주문상태는 "결제시도, 고객결제중단, 결제실패"로 구분됩니다.</p>
                               <p className="pl-2">- 결제시도 : 결제가 진행은 되었으나 알수없는 원인에 의해 정상적으로 완료가 되지 않은 상태입니다.</p>
                               <p className="pl-2">- 고객결제중단 : 결제진행 중 구매자가 결제창을 닫거하는 행위로 인해 결제가 중단된 상태입니다.</p>
                               <p className="pl-2">- 결제실패 : 구매자는 정상적으로 결제를 완료하였으나 PG사에서 결제승인이 실패된 상태입니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 결제 실패/시도 리스트의 주문상태는 추가할 수 없으나, "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴 내 "실패 상태 설정" 항목에서 운영자가 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 수정된 주문상태명은 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                               <p>· 결제 실패/시도 리스트의 "결제시도, 고객결제중단, 결제실패" 상태는 구매자의 주문결제 결과에 따라 시스템에서 자동으로 적용되므로 운영자가 사용여부를 설정할 수 없습니다.</p>
                           </div>
                      </div>

                       <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 변경할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 결제 실패/시도 리스트 내 주문의 상태는 변경이 불가능하며, 삭제처리만 가능합니다.</p>
                               <p className="text-red-500 font-bold">· 삭제된 주문 정보는 복구가 불가능하므로 신중하게 해야합니다.</p>
                           </div>
                      </div>
                  </div>
              ) : (
                  <div className="space-y-4">
                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태를 추가할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 주문상태는 "기본설정{">"}주문정책{">"}주문상태 설정" 메뉴에서 운영자가 추가할 수 있으며, 관리자페이지와 쇼핑몰페이지에 노출될 주문상태명을 각각 수정할 수 있습니다.</p>
                               <p>· 주문상태 설정 메뉴의 "사용설정"항목에 체크박스가 체크된 주문상태만 관리자페이지와 쇼핑몰페이지에 노출되며, 체크가 되지않은 경우 노출되지 않습니다.</p>
                               <p>· 추가 또는 수정된 주문상태는 저장 즉시 관리자페이지와 쇼핑몰페이지에 반영되어 수정된 정보로 노출됩니다.</p>
                           </div>
                      </div>

                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 결제완료 상태를 입금대기 상태로 변경할 수 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 주문리스트에서 결제완료 상태의 주문을 "입금대기" 상태로 변경할 수 없습니다.</p>
                               <p>· 결제완료 상태에서 입금대기 상태로 변경은 해당 주문의 "주문 상세정보" 페이지에서만 가능합니다.</p>
                           </div>
                      </div>

                      <div>
                           <h3 className="font-bold text-gray-800 mb-1 text-xs">[주문 정보] 주문상태 변경에 제한이 있나요?</h3>
                           <div className="pl-0 text-xs text-gray-500 space-y-1">
                               <p>· 주문리스트 내 선택된 주문의 상태를 "결제완료/상품준비중/배송중/배송완료/구매확정" 중 선택하여 변경할 수 있습니다.</p>
                               <p>· 입금대기 상태의 주문은 "결제완료" 상태로만 변경할 수 있으며, 주문의 일부 상품만 부분적으로 결제완료 상태로 변경이 불가능합니다.</p>
                               <p>· "취소/교환/반품/환불" 등의 주문상태로 변경은 해당 주문의 "주문 상세정보" 페이지에서 내 "클레임 접수" 항목에서 가능합니다.</p>
                               <p>· 교환/반품/환불접수 상태의 주문은 "취소/교환/반품/환불 관리"의 각각의 상태별 메뉴에서 변경할 수 있습니다.</p>
                           </div>
                      </div>
                  </div>
              )}
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
            onConfirm={(selected) => {
                console.log("Selected grades:", selected);
            }}
        />
        <BrandPopup
            isOpen={isBrandPopupOpen}
            onClose={() => setIsBrandPopupOpen(false)}
            onConfirm={(brand) => {
                console.log("Selected brand:", brand);
            }}
        />

        <SearchConditionChangePopup
            isOpen={isSearchConditionPopupOpen}
            onClose={() => setIsSearchConditionPopupOpen(false)}
            onConfirm={() => {
                setIsMultiSearchMode(!isMultiSearchMode);
                setIsSearchConditionPopupOpen(false);
            }}
            mode={isMultiSearchMode ? 'toSingle' : 'toMulti'}
        />

        <SearchConfigPopup
            isOpen={isSearchConfigPopupOpen}
            onClose={() => setIsSearchConfigPopupOpen(false)}
            onConfirm={(items) => {
                console.log("Selected items:", items);
                setIsSearchConfigPopupOpen(false);
            }}
        />

        <SearchSettingSavePopup
            isOpen={isSearchSettingSavePopupOpen}
            onClose={() => setIsSearchSettingSavePopupOpen(false)}
            onConfirm={() => {
                console.log("Search settings saved");
                setIsSearchSettingSavePopupOpen(false);
            }}
        />

    </div>
  );
}
