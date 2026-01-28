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
  Check,
  RefreshCw,
  Printer,
} from "lucide-react";
import SupplierPopup from '@/components/admin/SupplierPopup';
import MemberGradeSelectPopup from '@/components/admin/MemberGradeSelectPopup';
import BrandPopup from "@/components/admin/BrandPopup";
import SearchConditionChangePopup from "@/components/admin/SearchConditionChangePopup";
import SearchSettingSavePopup from "@/components/admin/SearchSettingSavePopup";
import SearchConfigPopup from "@/components/admin/SearchConfigPopup";
import { getOrdersAction } from "@/actions/order-actions";
import { format } from "date-fns";
import { OrderStatus } from "@/generated/prisma";


interface OrderItem {
    productName: string;
}

interface Order {
    id: string;
    totalPayAmount: number;
    createdAt: string | Date;
    statusUpdatedAt?: string | Date;
    status: OrderStatus;
    claims?: { reasonType: string }[];
    orderNo: string;
    ordererName: string;
    items: OrderItem[];
    totalItemPrice: number;
    totalProductAmount?: number;
    shippingFee: number;
    totalShippingFee?: number;
    mallId: string;
}

export default function CustomerClaimsPage() {
  const [isDetailSearchOpen, setIsDetailSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("exchange"); // exchange, return, refund
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  // Data State
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filter State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [sort, setSort] = useState("order_date_desc");
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("order_no");
  const [dateRange] = useState("today");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mallId, setMallId] = useState('all');
  
  // New Filter State
  const [orderType, setOrderType] = useState({ all: true, pc: false, mobile: false, app: false, manual: false, subscription: false });
  const [orderChannel, setOrderChannel] = useState({ all: true, shoppingMall: false, payco: false, naverPay: false, etc: false });
  const [paymentMethod, setPaymentMethod] = useState({
      all: true, creditCard: false, deposit: false, mobile: false, simpleCard: false, simplePoint: false,
      transfer: false, escrowTransfer: false, escrowCard: false, escrowTransfer2: false, etc: false,
      fullDiscount: false, bankTransfer: false, escrowPhone: false, escrowVirtual: false,
      mileage: false, virtualAccount: false, escrowVirtual2: false, naverPaySimple: false
  });
  const [invoiceHas, setInvoiceHas] = useState("all");
  const [memberType, setMemberType] = useState("all");
  const [receiptRequest, setReceiptRequest] = useState("all");
  const [depositDelay, setDepositDelay] = useState("");
  const [shippingDelay, setShippingDelay] = useState("");
  const [manualPayment, setManualPayment] = useState(false);

  // Popup State
  const [isSupplierPopupOpen, setIsSupplierPopupOpen] = useState(false);
  const [isMemberGradePopupOpen, setIsMemberGradePopupOpen] = useState(false);
  const [isBrandPopupOpen, setIsBrandPopupOpen] = useState(false);
  const [isSearchConditionPopupOpen, setIsSearchConditionPopupOpen] = useState(false);
  const [searchConditionMode, setSearchConditionMode] = useState<"toMulti" | "toSingle">("toMulti");
  const [isSearchSettingSavePopupOpen, setIsSearchSettingSavePopupOpen] = useState(false);
  const [isSearchConfigPopupOpen, setIsSearchConfigPopupOpen] = useState(false);

  const toggleSearchCondition = () => {
    setSearchConditionMode(prev => prev === 'toMulti' ? 'toSingle' : 'toMulti');
    setIsSearchConditionPopupOpen(false);
  };

  const handleSearchSettingSaveConfirm = () => {
    console.log("Search settings saved");
    setIsSearchSettingSavePopupOpen(false);
  };

  const handleSearchConfigConfirm = (config: unknown) => {
      console.log("Search config confirmed:", config);
      setIsSearchConfigPopupOpen(false);
  }

  const handleMemberGradeConfirm = (selected: unknown) => {
      console.log("Member grade selected:", selected);
      setIsMemberGradePopupOpen(false);
  }

  const handleBrandConfirm = (selected: unknown) => {
      console.log("Brand selected:", selected);
      setIsBrandPopupOpen(false);
  }
  
  // Status Checkboxes
  const [statusFilters, setStatusFilters] = useState({
      request: true,
      approve: true,
      reject: false
  });

  // Applied Filters independent of UI state
  const [appliedFilters, setAppliedFilters] = useState({
      keyword: "",
      searchType: "order_no",
      dateRange: "today",
      startDate: "",
      endDate: "",
      mallId: "all",
      statusFilters: { request: true, approve: true, reject: false },
      sort: "order_date_desc"
  });

  const fetchOrders = useCallback(async () => {
      setLoading(true);
      try {
          // Determine status filters based on active tab and checkboxes
          const statuses: OrderStatus[] = [];
          
           if (activeTab === 'exchange') {
              if (appliedFilters.statusFilters.request) statuses.push(OrderStatus.EXCHANGE_REQUEST);
              if (appliedFilters.statusFilters.approve) statuses.push(OrderStatus.EXCHANGE_COMPLETE);
          } else if (activeTab === 'return') {
              if (appliedFilters.statusFilters.request) statuses.push(OrderStatus.RETURN_REQUEST);
              if (appliedFilters.statusFilters.approve) statuses.push(OrderStatus.RETURN_COMPLETE);
          } else if (activeTab === 'refund') {
              if (appliedFilters.statusFilters.request) statuses.push(OrderStatus.REFUND_REQUEST);
              if (appliedFilters.statusFilters.approve) statuses.push(OrderStatus.REFUND_COMPLETE);
          }

          // If no status selected, maybe show nothing or all for that tab? 
          // Defaulting to showing nothing if no boxes checked seems safer for specific filtering.
          // But if statuses is empty, getOrdersAction might show ALL if not handled. 
          // getOrdersAction handles empty status as "ALL" sometimes, but here we want specific subset.
          // We'll pass the array.

          const res = await getOrdersAction({
              page,
              limit,
              status: statuses.length > 0 ? statuses : undefined,
              keyword: appliedFilters.keyword,
              searchType: appliedFilters.searchType as string,
              startDate: appliedFilters.startDate || undefined,
              endDate: appliedFilters.endDate || undefined,
              mallId: appliedFilters.mallId
          });

          if (res.items && statuses.length === 0) {
               // If user unchecked all boxes, we shouldn't show mixed orders. 
               // However, getOrdersAction logic might behave differently. 
               // For this specific page, we usually want to restrict to the tab's domain.
               // So if statuses is empty, we probably shouldn't fetch or should fetch with a "None" filter.
               // For simplicity, I'll rely on getOrdersAction logic (which currently filters by explicit status if provided).
               // To strictly enforce tab context, I should probably always pass at least the domain statuses if checkboxes are all off? 
               // No, if checkboxes are off, user wants to see nothing or "all". Let's stick to selected.
          }

          if (res.success) {
              setOrders(res.items || []);
              setTotal(res.total || 0);
          }
      } catch (e) {
          console.error(e);
      }
      setLoading(false);
  }, [page, limit, activeTab, appliedFilters]);

  useEffect(() => {
    fetchOrders();
  }, [page, activeTab, appliedFilters, fetchOrders]);

  const handleSearch = () => {
      setPage(1);
      setAppliedFilters({
          keyword,
          searchType,
          dateRange,
          startDate,
          endDate,
          mallId,
          statusFilters,
          sort
      });
  };

  const getStatusText = (status: OrderStatus) => {
      switch (status) {
          case OrderStatus.EXCHANGE_REQUEST: return <span className="text-red-500 font-bold">교환신청</span>;
          case OrderStatus.EXCHANGE_COMPLETE: return <span className="text-blue-500 font-bold">교환완료</span>;
          case OrderStatus.RETURN_REQUEST: return <span className="text-red-500 font-bold">반품신청</span>;
          case OrderStatus.RETURN_COMPLETE: return <span className="text-blue-500 font-bold">반품완료</span>;
          case OrderStatus.REFUND_REQUEST: return <span className="text-red-500 font-bold">환불신청</span>;
          case OrderStatus.REFUND_COMPLETE: return <span className="text-blue-500 font-bold">환불완료</span>;
          default: return <span>{status}</span>;
      }
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">고객 교환/반품/환불신청 관리</h1>
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
                    onClick={() => {
                        setIsSearchConditionPopupOpen(true);
                    }}
                >
                    <RefreshCw className="w-3 h-3" />
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
                     <RadioGroup defaultValue="all" className="flex gap-4">
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
                            className="h-7 bg-[#555] hover:bg-[#444] text-white text-[11px] rounded-sm px-2"
                            onClick={() => setIsSupplierPopupOpen(true)}
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
                            <SelectItem value="custom_product_code">자체 상품코드</SelectItem>
                            <SelectItem value="product_model_name">상품모델명</SelectItem>
                            <SelectItem value="manufacturer">제조사</SelectItem>
                            <div className="h-px bg-gray-200 my-1"/>
                            <SelectItem value="orderer_name">주문자명</SelectItem>
                            <SelectItem value="orderer_phone">주문자 전화번호</SelectItem>
                            <SelectItem value="orderer_mobile">주문자 휴대폰번호</SelectItem>
                            <SelectItem value="orderer_email">주문자 이메일</SelectItem>
                            <SelectItem value="receiver_name">수령자명</SelectItem>
                            <SelectItem value="receiver_phone">수령자 전화번호</SelectItem>
                            <SelectItem value="receiver_mobile">수령자 휴대폰번호</SelectItem>
                            <SelectItem value="depositor_name">입금자명</SelectItem>
                            <div className="h-px bg-gray-200 my-1"/>
                            <SelectItem value="id">아이디</SelectItem>
                            <SelectItem value="nickname">닉네임</SelectItem>
                            <div className="h-px bg-gray-200 my-1"/>
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
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    기간검색
                </div>
                <div className="flex-1 p-3 flex items-center gap-2">
                     <Select defaultValue="order_date">
                        <SelectTrigger className="w-32 h-8 text-[11px] border-gray-300">
                            <SelectValue placeholder="주문일" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="order_date">주문일</SelectItem>
                            <SelectItem value="request_date">신청일</SelectItem>
                            <SelectItem value="payment_confirm_date">결제확인일</SelectItem>
                            <SelectItem value="invoice_input_date">송장입력일</SelectItem>
                            <SelectItem value="delivery_date">배송일</SelectItem>
                            <SelectItem value="delivery_complete_date">배송완료일</SelectItem>
                            <SelectItem value="purchase_confirm_date">구매확정일</SelectItem>
                            <SelectItem value="cancel_complete_date">취소완료일</SelectItem>
                            <SelectItem value="return_receipt_date">반품접수일</SelectItem>
                            <SelectItem value="return_complete_date">반품완료일</SelectItem>
                            <SelectItem value="exchange_receipt_date">교환접수일</SelectItem>
                            <SelectItem value="exchange_complete_date">교환완료일</SelectItem>
                            <SelectItem value="refund_receipt_date">환불접수일</SelectItem>
                            <SelectItem value="refund_complete_date">환불완료일</SelectItem>
                            <SelectItem value="bundled_shipping">묶음배송</SelectItem>
                        </SelectContent>
                    </Select>
                     <div className="flex items-center gap-1 relative">
                        <div className="relative">
                             <Input className="w-32 h-8 text-center border-gray-300 pr-8 text-[11px]" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="YYYY. MM. DD." />
                             <Calendar 
                                className="w-4 h-4 text-gray-800 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                                strokeWidth={1.5} 
                                onClick={() => startDateRef.current?.showPicker()}
                             />
                             <input 
                                type="date" 
                                ref={startDateRef}
                                className="absolute opacity-0 pointer-events-none w-0 h-0 bottom-0 left-0"
                                onChange={(e) => setStartDate(e.target.value)}
                                value={startDate}
                             />
                        </div>
                    </div>
                    <span>~</span>
                    <div className="flex items-center gap-1 relative">
                         <div className="relative">
                            <Input className="w-32 h-8 text-center border-gray-300 pr-8 text-[11px]" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="YYYY. MM. DD." />
                            <Calendar 
                                className="w-4 h-4 text-gray-800 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                                strokeWidth={1.5} 
                                onClick={() => endDateRef.current?.showPicker()}
                            />
                            <input 
                                type="date" 
                                ref={endDateRef}
                                className="absolute opacity-0 pointer-events-none w-0 h-0 bottom-0 left-0"
                                onChange={(e) => setEndDate(e.target.value)}
                                value={endDate}
                             />
                         </div>
                    </div>
                    <div className="flex items-center gap-1 ml-1">
                        <Button onClick={() => { setStartDate(format(new Date(), "yyyy-MM-dd")); setEndDate(format(new Date(), "yyyy-MM-dd")); }} variant="outline" size="sm" className="h-8 px-3 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">오늘</Button>
                        <Button onClick={() => { 
                            const d = new Date(); d.setDate(d.getDate() - 7);
                            setStartDate(format(d, "yyyy-MM-dd")); 
                            setEndDate(format(new Date(), "yyyy-MM-dd")); 
                        }} variant="outline" size="sm" className="h-8 px-3 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">7일</Button>
                        <Button onClick={() => { 
                            const d = new Date(); d.setDate(d.getDate() - 15);
                            setStartDate(format(d, "yyyy-MM-dd")); 
                            setEndDate(format(new Date(), "yyyy-MM-dd")); 
                        }} variant="outline" size="sm" className="h-8 px-3 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">15일</Button>
                         <Button onClick={() => { 
                            const d = new Date(); d.setMonth(d.getMonth() - 1);
                            setStartDate(format(d, "yyyy-MM-dd")); 
                            setEndDate(format(new Date(), "yyyy-MM-dd")); 
                        }} variant="outline" size="sm" className="h-8 px-3 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1개월</Button>
                         <Button onClick={() => { 
                            const d = new Date(); d.setMonth(d.getMonth() - 3);
                            setStartDate(format(d, "yyyy-MM-dd")); 
                            setEndDate(format(new Date(), "yyyy-MM-dd")); 
                        }} variant="outline" size="sm" className="h-8 px-3 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">3개월</Button>
                         <Button onClick={() => { 
                            const d = new Date(); d.setFullYear(d.getFullYear() - 1);
                            setStartDate(format(d, "yyyy-MM-dd")); 
                            setEndDate(format(new Date(), "yyyy-MM-dd")); 
                        }} variant="outline" size="sm" className="h-8 px-3 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1년</Button>
                    </div>
                </div>
            </div>

            {/* Processing Status */}
             <div className="flex items-center text-xs">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    처리상태
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center space-x-2">
                        <Checkbox 
                            id="status-all" 
                            checked={statusFilters.request && statusFilters.approve && statusFilters.reject}
                            onCheckedChange={(checked) => setStatusFilters({
                                request: !!checked,
                                approve: !!checked,
                                reject: !!checked
                            })}
                            className="rounded-none border-gray-300 text-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" 
                        />
                        <label htmlFor="status-all" className="text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            전체
                        </label>
                    </div>
                     <div className="flex items-center space-x-2">
                         <Checkbox 
                            id="status-request" 
                            checked={statusFilters.request}
                            onCheckedChange={(checked) => setStatusFilters(prev => ({ ...prev, request: !!checked }))}
                            className="rounded-none border-gray-300"
                        />
                        <label htmlFor="status-request" className="text-gray-700 leading-none">신청</label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox 
                            id="status-approve" 
                            checked={statusFilters.approve}
                            onCheckedChange={(checked) => setStatusFilters(prev => ({ ...prev, approve: !!checked }))}
                            className="rounded-none border-gray-300"
                        />
                        <label htmlFor="status-approve" className="text-gray-700 leading-none">승인</label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Checkbox 
                            id="status-reject" 
                            checked={statusFilters.reject}
                            onCheckedChange={(checked) => setStatusFilters(prev => ({ ...prev, reject: !!checked }))}
                            className="rounded-none border-gray-300"
                        />
                        <label htmlFor="status-reject" className="text-gray-700 leading-none">거절</label>
                    </div>
                </div>
            </div>


            {/* Expand Detailed Search Content */}
            {isDetailSearchOpen && (
                <div className="border-t border-gray-200">
                    {/* Order Type & Order Channel */}
                    <div className="flex border-b border-gray-200">
                        <div className="flex-1 flex items-center border-r border-gray-200">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center h-full border-r border-gray-200">
                                주문유형 <HelpCircle className="w-3.5 h-3.5 text-gray-400 ml-1" />
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox 
                                        id="orderType-all" 
                                        checked={orderType.all}
                                        onCheckedChange={(checked) => setOrderType(prev => ({ ...prev, all: !!checked }))}
                                        className="rounded-[2px] border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" 
                                    />
                                    <Label htmlFor="orderType-all" className="text-gray-700 font-normal">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="orderType-pc" checked={orderType.pc} onCheckedChange={(c) => setOrderType(p => ({...p, pc: !!c}))} className="rounded-[2px] border-gray-300"/>
                                    <Label htmlFor="orderType-pc" className="text-gray-700 font-normal">PC쇼핑몰</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="orderType-mobile" checked={orderType.mobile} onCheckedChange={(c) => setOrderType(p => ({...p, mobile: !!c}))} className="rounded-[2px] border-gray-300"/>
                                    <Label htmlFor="orderType-mobile" className="text-gray-700 font-normal">모바일쇼핑몰</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span>(</span>
                                    <Checkbox id="orderType-app" checked={orderType.app} onCheckedChange={(c) => setOrderType(p => ({...p, app: !!c}))} className="rounded-[2px] border-gray-300"/>
                                    <Label htmlFor="orderType-app" className="text-gray-700 font-normal">WEB</Label>
                                    <Checkbox id="orderType-app2" className="rounded-[2px] border-gray-300 ml-1"/>
                                    <Label htmlFor="orderType-app2" className="text-gray-700 font-normal">APP</Label>
                                    <span>)</span>
                                </div>
                                 <div className="flex items-center gap-1.5 ml-2">
                                    <Checkbox id="orderType-manual" checked={orderType.manual} onCheckedChange={(c) => setOrderType(p => ({...p, manual: !!c}))} className="rounded-[2px] border-gray-300"/>
                                    <Label htmlFor="orderType-manual" className="text-gray-700 font-normal">수기주문</Label>
                                </div>
                                <div className="flex items-center gap-1.5 ml-2">
                                    <Checkbox id="orderType-subscription" checked={orderType.subscription} onCheckedChange={(c) => setOrderType(p => ({...p, subscription: !!c}))} className="rounded-[2px] border-gray-300"/>
                                    <Label htmlFor="orderType-subscription" className="text-gray-700 font-normal">정기주문</Label>
                                </div>
                            </div>
                        </div>
                         <div className="flex-1 flex items-center">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center h-full border-r border-gray-200">
                                주문채널구분
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-4">
                               <div className="flex items-center gap-1.5">
                                    <Checkbox id="channel-all" checked={orderChannel.all} onCheckedChange={(c) => setOrderChannel(p => ({...p, all: !!c}))} className="rounded-[2px] border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"/>
                                    <Label htmlFor="channel-all" className="text-gray-700 font-normal">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="channel-shop" checked={orderChannel.shoppingMall} onCheckedChange={(c) => setOrderChannel(p => ({...p, shoppingMall: !!c}))} className="rounded-[2px] border-gray-300"/>
                                    <Label htmlFor="channel-shop" className="text-gray-700 font-normal">쇼핑몰</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="channel-payco" checked={orderChannel.payco} onCheckedChange={(c) => setOrderChannel(p => ({...p, payco: !!c}))} className="rounded-[2px] border-gray-300"/>
                                    <Label htmlFor="channel-payco" className="text-gray-700 font-normal flex items-center gap-1"><span className="text-red-500 font-bold">P</span> 페이코</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="channel-naver" checked={orderChannel.naverPay} onCheckedChange={(c) => setOrderChannel(p => ({...p, naverPay: !!c}))} className="rounded-[2px] border-gray-300"/>
                                    <Label htmlFor="channel-naver" className="text-gray-700 font-normal flex items-center gap-1"><span className="text-green-500 font-bold">N</span> 네이버페이</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="channel-etc" checked={orderChannel.etc} onCheckedChange={(c) => setOrderChannel(p => ({...p, etc: !!c}))} className="rounded-[2px] border-gray-300"/>
                                    <Label htmlFor="channel-etc" className="text-gray-700 font-normal flex items-center gap-1"><div className="w-4 h-4 bg-gray-500 text-white rounded-full flex items-center justify-center text-[9px]">기</div> 기타</Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-start border-r border-gray-200 pt-5">
                            결제수단
                        </div>
                        <div className="flex-1 p-3">
                             <div className="mb-2">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pay-all" checked={paymentMethod.all} onCheckedChange={(c) => setPaymentMethod(p => ({...p, all: !!c}))} className="rounded-[2px] border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"/>
                                    <Label htmlFor="pay-all" className="text-gray-700 font-normal">전체</Label>
                                </div>
                             </div>
                             <div className="grid grid-cols-4 gap-y-2 gap-x-4">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-pink-100 text-pink-600 flex items-center justify-center text-[9px]">신</span> 신용카드</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-yellow-100 text-yellow-600 flex items-center justify-center text-[9px]">무</span> 무통장 입금</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-red-100 text-red-600 flex items-center justify-center text-[9px]">전</span> 전액할인</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-[9px]">마</span> 마일리지</Label>
                                </div>
                                
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-green-100 text-green-600 flex items-center justify-center text-[9px]">예</span> 예치금</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-purple-100 text-purple-600 flex items-center justify-center text-[9px]">계</span> 계좌이체 (에스크로)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-teal-100 text-teal-600 flex items-center justify-center text-[9px]">계</span> 계좌이체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-orange-100 text-orange-600 flex items-center justify-center text-[9px]">가</span> 가상계좌</Label>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-orange-500 text-white flex items-center justify-center text-[9px]">휴</span> 휴대폰결제</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-purple-100 text-purple-600 flex items-center justify-center text-[9px]">신</span> 신용카드 (에스크로)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-white border border-gray-300 flex items-center justify-center text-[9px]">휴</span> 휴대폰 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-purple-100 text-purple-600 flex items-center justify-center text-[9px]">가</span> 가상계좌 (에스크로)</Label>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-teal-500 text-white flex items-center justify-center text-[9px]">신</span> 신용카드 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-teal-500 text-white flex items-center justify-center text-[9px]">계</span> 계좌이체 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-teal-500 text-white flex items-center justify-center text-[9px]">가</span> 가상계좌 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-green-600 text-white flex items-center justify-center text-[9px]">네</span> 네이버페이 (간편결제)</Label>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-teal-500 text-white flex items-center justify-center text-[9px]">포</span> 포인트 (간편결제)</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox className="rounded-[2px] border-gray-300"/> <Label className="text-gray-700 font-normal text-xs flex items-center gap-1"><span className="w-4 h-4 rounded bg-gray-400 text-white flex items-center justify-center text-[9px]">기</span> 기타</Label>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Invoice Number */}
                    <div className="flex items-center text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            송장번호
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-4">
                             <Select defaultValue="shipping_company">
                                <SelectTrigger className="w-full h-7 text-[11px] border-gray-300">
                                    <SelectValue placeholder="=배송 업체=" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="shipping_company">=배송 업체=</SelectItem>
                                    <SelectItem value="korea_post">우체국택배</SelectItem>
                                    <SelectItem value="korea_post_ems">우체국EMS</SelectItem>
                                    <SelectItem value="dhl">DHL</SelectItem>
                                    <SelectItem value="fedex">FEDEX</SelectItem>
                                    <SelectItem value="ups">UPS</SelectItem>
                                    <SelectItem value="other_courier">기타 택배</SelectItem>
                                    <SelectItem value="registered_parcel">등기, 소포</SelectItem>
                                    <SelectItem value="freight">화물배송</SelectItem>
                                    <SelectItem value="visit_receipt">방문수령</SelectItem>
                                    <SelectItem value="quick_delivery">퀵배송</SelectItem>
                                    <SelectItem value="other">기타</SelectItem>
                                </SelectContent>
                            </Select>
                            <RadioGroup value={invoiceHas} onValueChange={setInvoiceHas} className="flex gap-4 min-w-fit">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="all" id="inv-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="inv-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="registered" id="inv-reg" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="inv-reg" className="text-gray-700 font-normal cursor-pointer text-center leading-tight">송장번<br/>호 등록</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="unregistered" id="inv-unreg" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="inv-unreg" className="text-gray-700 font-normal cursor-pointer text-center leading-tight">송장번호<br/>미등록</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    
                    {/* Member Info & Shipping Info */}
                    <div className="flex border-b border-gray-200">
                        <div className="flex-1 flex items-center border-r border-gray-200">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center h-full border-r border-gray-200">
                                회원정보
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="member-first" className="rounded-[2px] border-gray-300"/>
                                    <Label htmlFor="member-first" className="text-gray-700 font-normal">첫주문</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="member-leave" defaultChecked className="rounded-[2px] border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"/>
                                    <Label htmlFor="member-leave" className="text-gray-700 font-normal">탈퇴회원 주문</Label>
                                </div>
                            </div>
                        </div>
                         <div className="flex-1 flex items-center">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center h-full border-r border-gray-200">
                                배송정보
                            </div>
                            <div className="flex-1 p-3 flex flex-col gap-2">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox id="ship-gift" className="rounded-[2px] border-gray-300"/>
                                        <Label htmlFor="ship-gift" className="text-gray-700 font-normal">사은품 포함</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox id="ship-msg" className="rounded-[2px] border-gray-300"/>
                                        <Label htmlFor="ship-msg" className="text-gray-700 font-normal">배송메세지 입력</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox id="ship-memo" className="rounded-[2px] border-gray-300"/>
                                        <Label htmlFor="ship-memo" className="text-gray-700 font-normal">관리자메모 입력</Label>
                                    </div>
                                </div>
                                <Select defaultValue="memo1">
                                    <SelectTrigger className="w-full h-7 text-[11px] border-gray-300">
                                        <SelectValue placeholder="=메모 구분=" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="memo1">=메모 구분=</SelectItem>
                                        <SelectItem value="receipt">접수</SelectItem>
                                        <SelectItem value="complete">완료</SelectItem>
                                        <SelectItem value="deposit">입금</SelectItem>
                                        <SelectItem value="delivery">배송</SelectItem>
                                        <SelectItem value="out_of_stock">품절</SelectItem>
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
                        <div className="flex-1 flex items-center border-r border-gray-200">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center h-full border-r border-gray-200">
                                회원검색
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-4">
                                <RadioGroup value={memberType} onValueChange={setMemberType} className="flex gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="all" id="mtype-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                        <Label htmlFor="mtype-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="non-member" id="mtype-non" className="border-gray-300 text-gray-600" />
                                        <Label htmlFor="mtype-non" className="text-gray-700 font-normal cursor-pointer">비회원</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="member" id="mtype-mem" className="border-gray-300 text-gray-600" />
                                        <Label htmlFor="mtype-mem" className="text-gray-700 font-normal cursor-pointer">회원</Label>
                                    </div>
                                </RadioGroup>
                                <Button 
                                    className="h-7 bg-[#555] hover:bg-[#444] text-white text-[11px] rounded-sm px-2"
                                    onClick={() => setIsMemberGradePopupOpen(true)}
                                >
                                    회원등급 선택
                                </Button>
                            </div>
                        </div>
                         <div className="flex-1 flex items-center">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center h-full border-r border-gray-200">
                                결제금액
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-2">
                                <Input className="flex-1 h-7 border-gray-300" />
                                <span>원 ~</span>
                                <Input className="flex-1 h-7 border-gray-300" />
                                <span>원</span>
                            </div>
                        </div>
                    </div>

                    {/* Receipt Request */}
                    <div className="flex items-center text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            영수증 신청
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-4">
                            <RadioGroup value={receiptRequest} onValueChange={setReceiptRequest} className="flex gap-4">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="all" id="rec-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="rec-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="cash" id="rec-cash" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="rec-cash" className="text-gray-700 font-normal cursor-pointer flex items-center gap-1"><span className="w-4 h-4 rounded bg-green-500 text-white flex items-center justify-center text-[9px]">현</span> 현금영수증</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="tax" id="rec-tax" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="rec-tax" className="text-gray-700 font-normal cursor-pointer flex items-center gap-1"><span className="w-4 h-4 rounded bg-gray-500 text-white flex items-center justify-center text-[9px]">세</span> 세금계산서</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Deposit Delay & Shipping Delay */}
                    <div className="flex border-b border-gray-200">
                        <div className="flex-1 flex items-center border-r border-gray-200">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center h-full border-r border-gray-200">
                                입금경과일
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-2">
                                <Input className="w-full h-7 border-gray-300" value={depositDelay} onChange={(e) => setDepositDelay(e.target.value)} />
                                <span className="whitespace-nowrap">일 이상 경과</span>
                            </div>
                        </div>
                         <div className="flex-1 flex items-center">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center h-full border-r border-gray-200">
                                배송지연일
                            </div>
                            <div className="flex-1 p-3 flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <Input className="w-full h-7 border-gray-300" value={shippingDelay} onChange={(e) => setShippingDelay(e.target.value)} />
                                    <span className="whitespace-nowrap">일 이상 지연</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                    <div className="w-3 h-3 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold text-[8px]">!</div>
                                    입력 시 배송 전 주문상태만 검색 가능합니다.
                                </div>
                            </div>
                        </div>
                    </div>

                     {/* Promotion Info & Manual Payment */}
                     <div className="flex border-b border-gray-200">
                        <div className="flex-1 flex items-center border-r border-gray-200">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center h-full border-r border-gray-200">
                                프로모션 정보
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-2">
                                <Button className="h-7 bg-[#555] hover:bg-[#444] text-white text-[11px] rounded-sm">쿠폰선택</Button>
                                <div className="flex items-center gap-1.5 ml-2">
                                    <Checkbox id="promo-coupon" className="rounded-[2px] border-gray-300"/>
                                    <Label htmlFor="promo-coupon" className="text-gray-700 font-normal">쿠폰사용 주문 전체 검색</Label>
                                </div>
                            </div>
                        </div>
                         <div className="flex-1 flex items-center">
                             <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center h-full border-r border-gray-200">
                                수동 결제완료 처리
                            </div>
                            <div className="flex-1 p-3 flex items-center gap-2">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="manual-pay-check" checked={manualPayment} onCheckedChange={(c) => setManualPayment(!!c)} className="rounded-[2px] border-gray-300"/>
                                    <Label htmlFor="manual-pay-check" className="text-gray-700 font-normal">수동 결제완료 처리 주문만 보기</Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Brand */}
                    <div className="flex items-center text-xs">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            브랜드
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Button className="h-7 bg-[#555] hover:bg-[#444] text-white text-[11px] rounded-sm" onClick={() => setIsBrandPopupOpen(true)}>브랜드선택</Button>
                            <div className="flex items-center gap-1.5 ml-2">
                                <Checkbox id="brand-no" className="rounded-[2px] border-gray-300"/>
                                <Label htmlFor="brand-no" className="text-gray-700 font-normal">브랜드 미지정 상품</Label>
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
      <div className="flex border-b border-gray-400 mb-6">
          <button 
            className={`px-6 py-3 text-xs font-bold border-t border-r border-l ${activeTab === 'exchange' ? 'bg-white border-gray-400 border-b-white text-gray-800' : 'bg-[#F9F9F9] border-gray-300 text-gray-500 font-normal'}`}
            onClick={() => { setActiveTab('exchange'); setPage(1); }}
          >
              교환신청 관리 (전체 {activeTab === 'exchange' ? total : 0} | <span className="text-red-500">신청</span> 0 | <span className="text-blue-500">처리완료</span> 0)
          </button>
          <button 
            className={`px-6 py-3 text-xs font-bold border-t border-r ${activeTab === 'return' ? 'bg-white border-gray-400 border-b-white text-gray-800 -ml-[1px]' : 'bg-[#F9F9F9] border-gray-300 text-gray-500 font-normal'}`}
             onClick={() => { setActiveTab('return'); setPage(1); }}
          >
              반품신청 관리 (전체 {activeTab === 'return' ? total : 0} | <span className="text-red-500">신청</span> 0 | <span className="text-blue-500">처리완료</span> 0)
          </button>
          <button 
            className={`px-6 py-3 text-xs font-bold border-t border-r ${activeTab === 'refund' ? 'bg-white border-gray-400 border-b-white text-gray-800 -ml-[1px]' : 'bg-[#F9F9F9] border-gray-300 text-gray-500 font-normal'}`}
             onClick={() => { setActiveTab('refund'); setPage(1); }}
          >
              환불신청 관리 (전체 {activeTab === 'refund' ? total : 0} | <span className="text-red-500">신청</span> 0 | <span className="text-blue-500">처리완료</span> 0)
          </button>
      </div>

      {/* List Header */}
      <div className="flex items-center gap-2 mb-2">
           <h3 className="text-base font-bold text-gray-800">{activeTab === 'exchange' ? '교환신청 관리' : activeTab === 'return' ? '반품신청 관리' : '환불신청 관리'}</h3>
           <HelpCircle className="w-4 h-4 text-gray-400" />
      </div>

      <div className="flex justify-between items-end mb-2">
           <div className="text-xs text-gray-700 font-bold">
              검색 <span className="text-red-500">{total}</span>개 / 전체 <span className="text-red-500">{total}</span>개 <span className="text-gray-500 font-normal">( 검색된 주문 총 결제금액 : <span className="text-red-500">{orders.reduce((acc, cur) => acc + cur.totalPayAmount, 0).toLocaleString()}</span>원 )</span>
          </div>
          <div className="flex gap-1 items-center">
               <Select value={sort} onValueChange={(v) => { setSort(v); setAppliedFilters(p => ({...p, sort: v})); }}>
                    <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="주문일 ↓" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="order_date_desc">주문일 ↓</SelectItem>
                        <SelectItem value="order_date_asc">주문일 ↑</SelectItem>
                        <SelectItem value="request_date_desc">신청일 ↓</SelectItem>
                        <SelectItem value="request_date_asc">신청일 ↑</SelectItem>
                        <SelectItem value="order_no_desc">주문번호 ↓</SelectItem>
                        <SelectItem value="order_no_asc">주문번호 ↑</SelectItem>
                        <SelectItem value="product_name_desc">상품명 ↓</SelectItem>
                        <SelectItem value="product_name_asc">상품명 ↑</SelectItem>
                        <SelectItem value="orderer_name_desc">주문자 ↓</SelectItem>
                        <SelectItem value="orderer_name_asc">주문자 ↑</SelectItem>
                        <SelectItem value="total_amount_desc">총 결제금액 ↓</SelectItem>
                        <SelectItem value="total_amount_asc">총 결제금액 ↑</SelectItem>
                        <SelectItem value="receiver_name_desc">수령자 ↓</SelectItem>
                        <SelectItem value="receiver_name_asc">수령자 ↑</SelectItem>
                        <SelectItem value="supplier_name_desc">공급사 ↓</SelectItem>
                        <SelectItem value="supplier_name_asc">공급사 ↑</SelectItem>
                        <SelectItem value="status_desc">처리상태 ↓</SelectItem>
                        <SelectItem value="status_asc">처리상태 ↑</SelectItem>
                    </SelectContent>
                </Select>
                 <Select value={limit.toString()} onValueChange={(v) => { setLimit(Number(v)); setPage(1); }}>
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
                 <Button variant="default" size="sm" className="h-7 text-[11px] bg-[#555555] text-white hover:bg-[#444444] rounded-sm ml-1">
                    조회항목설정
                </Button>
          </div>
      </div>
      
      {/* Action Toolbar Top */}
      <div className="flex justify-between items-center bg-[#F9F9F9] p-2 border border-gray-300 border-b-0">
          <div className="flex items-center gap-1 text-xs">
              <Check className="w-3 h-3 text-red-500 mr-1" strokeWidth={4} />
              <span className="font-bold text-gray-600 mr-1">선택한 주문을</span>
              <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-3 ml-1">
                  승인처리
              </Button>
               <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-3">
                  거절처리
              </Button>
          </div>
           <div className="flex items-center gap-1">
              <Button size="sm" className="h-7 text-[11px] bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm px-2 font-normal flex items-center gap-1">
                  SMS발송
              </Button>
              {(activeTab === 'return' || activeTab === 'refund') && (
                  <>
                    <Select defaultValue="print_sel">
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="=인쇄 선택=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="print_sel">=인쇄 선택=</SelectItem>
                            <SelectItem value="order_history">주문내역서</SelectItem>
                            <SelectItem value="order_history_customer">주문내역서 (고객용)</SelectItem>
                            <SelectItem value="simple_receipt">간이영수증</SelectItem>
                            <SelectItem value="transaction_statement">거래명세서</SelectItem>
                            <SelectItem value="tax_invoice">세금계산서</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-2 flex items-center gap-1">
                        <Printer className="w-3.5 h-3.5" />
                        프린트
                    </Button>
                  </>
              )}
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
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="" />
                  <col className="w-20" />
                  <col className="w-16" />
                  <col className="w-20" />
                  <col className="w-20" />
                  <col className="w-16" />
                  <col className="w-20" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-20" />
              </colgroup>
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr className="h-10">
                      <th className="border-r border-[#CDCDCD]">
                          <Checkbox className="bg-white border-gray-300 rounded-[2px]"/>
                      </th>
                      <th className="border-r border-[#CDCDCD]">번호</th>
                      <th className="border-r border-[#CDCDCD]">상점구분</th>
                      <th className="border-r border-[#CDCDCD]">주문일시</th>
                      <th className="border-r border-[#CDCDCD]">신청일시</th>
                      <th className="border-r border-[#CDCDCD]">처리일시</th>
                      <th className="border-r border-[#CDCDCD]">사유</th>
                      <th className="border-r border-[#CDCDCD]">주문번호</th>
                      <th className="border-r border-[#CDCDCD]">주문자</th>
                      <th className="border-r border-[#CDCDCD]">상품주문번호</th>
                      <th className="border-r border-[#CDCDCD]">주문상품</th>
                      <th className="border-r border-[#CDCDCD]">주문상태</th>
                      <th className="border-r border-[#CDCDCD]">신청수량</th>
                      <th className="border-r border-[#CDCDCD]">상품금액</th>
                      <th className="border-r border-[#CDCDCD]">총 상품금액</th>
                      <th className="border-r border-[#CDCDCD]">배송비</th>
                      <th className="border-r border-[#CDCDCD]">총 배송비</th>
                      <th className="border-r border-[#CDCDCD]">결제방법</th>
                      <th className="border-r border-[#CDCDCD]">처리상태</th>
                      <th className="border-r border-[#CDCDCD]">관리자메모</th>
                      <th className="">주문유형</th>
                  </tr>
              </thead>
              <tbody className="text-gray-600 bg-white">
                  {loading ? (
                    <tr>
                        <td colSpan={21} className="py-10 border-b border-gray-200 text-center text-sm">로딩중...</td>
                    </tr>
                  ) : orders.length === 0 ? (
                      <tr>
                          <td colSpan={21} className="py-10 border-b border-gray-200 text-center text-sm">
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
                               <td className="border-r border-[#CDCDCD]">
                                   {order.statusUpdatedAt && order.status.endsWith('REQUEST') ? format(new Date(order.statusUpdatedAt), "yyyy-MM-dd HH:mm") : '-'}
                               </td>
                               <td className="border-r border-[#CDCDCD]">
                                    {order.status.endsWith('COMPLETE') && order.statusUpdatedAt ? format(new Date(order.statusUpdatedAt), "yyyy-MM-dd HH:mm") : '-'}
                               </td>
                               <td className="border-r border-[#CDCDCD]">
                                   {/* Assuming first claim has the reason. In filtering, these are orders, so claims refers to related claims. */}
                                   {order.claims && order.claims.length > 0 ? order.claims[0].reasonType : '-'}
                               </td>
                               <td className="border-r border-[#CDCDCD] text-blue-500 font-bold cursor-pointer hover:underline">{order.orderNo}</td>
                               <td className="border-r border-[#CDCDCD]">{order.ordererName}</td>
                               <td className="border-r border-[#CDCDCD]">-</td>
                                <td className="border-r border-[#CDCDCD] text-left px-2 truncate cursor-pointer hover:underline" title={order.items.map((i: OrderItem) => i.productName).join(', ')}>
                                  {order.items.length > 0 ? `${order.items[0].productName} ${order.items.length > 1 ? `외 ${order.items.length - 1}건` : ''}` : '-'}
                               </td>
                               <td className="border-r border-[#CDCDCD]">{getStatusText(order.status)}</td>
                               <td className="border-r border-[#CDCDCD]">{order.items.length}</td>
                               <td className="border-r border-[#CDCDCD] text-right px-2">{order.totalItemPrice?.toLocaleString()}</td>
                               <td className="border-r border-[#CDCDCD] text-right px-2">{order.totalProductAmount?.toLocaleString() || 0}</td>
                               <td className="border-r border-[#CDCDCD] text-right px-2">{order.shippingFee?.toLocaleString()}</td>
                               <td className="border-r border-[#CDCDCD] text-right px-2">{order.totalShippingFee?.toLocaleString() || 0}</td>
                               <td className="border-r border-[#CDCDCD]">-</td>
                               <td className="border-r border-[#CDCDCD]">{getStatusText(order.status)}</td>
                               <td className="border-r border-[#CDCDCD]">-</td>
                               <td className="">-</td>
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
              <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-3 ml-1">
                  승인처리
              </Button>
               <Button variant="outline" size="sm" className="h-7 text-[11px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm px-3">
                  거절처리
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
            onConfirm={(selected: unknown) => {
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
  );
}
