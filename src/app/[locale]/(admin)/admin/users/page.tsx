"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  Download,
  Calendar,
  Info
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { getUsersAction } from "@/actions/user-actions";
import { getUserGradesAction } from "@/actions/user-grade-actions";
import { PrivacyConsentHistoryPopup } from "@/components/popups/privacy-consent-history-popup";

export default function MemberListPage() {
  const router = useRouter();
  // Filter States
  const [mallId, setMallId] = useState('all');
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const lastLoginStartRef = useRef<HTMLInputElement>(null);
  const lastLoginEndRef = useRef<HTMLInputElement>(null);
  const birthdayStartRef = useRef<HTMLInputElement>(null);
  const birthdayEndRef = useRef<HTMLInputElement>(null);
  const anniversaryStartRef = useRef<HTMLInputElement>(null);
  const anniversaryEndRef = useRef<HTMLInputElement>(null);
  const dormantReleaseStartRef = useRef<HTMLInputElement>(null);
  const dormantReleaseEndRef = useRef<HTMLInputElement>(null);
  
  const [searchType, setSearchType] = useState('id');
  const [keyword, setKeyword] = useState('');
  const [exactMatch, setExactMatch] = useState('exact');
  const [memberGrade, setMemberGrade] = useState('grade');
  const [memberType, setMemberType] = useState('all');
  const [approved, setApproved] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Detailed Search States
  const [visitMin, setVisitMin] = useState('');
  const [visitMax, setVisitMax] = useState('');
  const [lastLoginStart, setLastLoginStart] = useState('');
  const [lastLoginEnd, setLastLoginEnd] = useState('');
  const [mileageMin, setMileageMin] = useState('');
  const [mileageMax, setMileageMax] = useState('');
  const [depositMin, setDepositMin] = useState('');
  const [depositMax, setDepositMax] = useState('');
  const [orderMin, setOrderMin] = useState('');
  const [orderMax, setOrderMax] = useState('');
  const [amountMin, setAmountMin] = useState('');
  const [amountMax, setAmountMax] = useState('');
  const [smsAgree, setSmsAgree] = useState('all');
  const [emailAgree, setEmailAgree] = useState('all');
  const [joinRoute, setJoinRoute] = useState('all');
  const [longTermLoginDays, setLongTermLoginDays] = useState('');
  const [gender, setGender] = useState('all');
  const [birthdaySearch, setBirthdaySearch] = useState(false);
  const [birthdayType, setBirthdayType] = useState('all');
  const [birthdayStart, setBirthdayStart] = useState('');
  const [birthdayEnd, setBirthdayEnd] = useState('');
  const [marriageStatus, setMarriageStatus] = useState('all');
  const [anniversaryStart, setAnniversaryStart] = useState('');
  const [anniversaryEnd, setAnniversaryEnd] = useState('');
  const [privacyTerm, setPrivacyTerm] = useState('all');
  const [dormantTarget, setDormantTarget] = useState(false);
  const [dormantTargetDays, setDormantTargetDays] = useState('7');
  const [snsType, setSnsType] = useState('all');
  const [dormantReleaseStart, setDormantReleaseStart] = useState('');
  const [dormantReleaseEnd, setDormantReleaseEnd] = useState('');
  
  // Data States
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isDetailSearchOpen, setIsDetailSearchOpen] = useState(false);
  const [isPrivacyPopupOpen, setIsPrivacyPopupOpen] = useState(false);
  
  const fetchGrades = useCallback(async () => {
    const res = await getUserGradesAction();
    if (res.success) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setGrades((res.grades as any[]) || []);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUsersAction({
        page,
        limit,
        mallId,
        searchType,
        keyword,
        exactMatch: exactMatch === 'exact',
        memberGrade: memberGrade === 'grade' ? undefined : memberGrade,
        memberType,
        approved,
        startDate: startDate || undefined,
        endDate: endDate || undefined
      });
      
      if (res.success) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setUsers((res.items as any[]) || []);
        setTotal(res.total || 0);
      }
    } catch(e) {
      console.error(e);
    }
    setLoading(false);
  }, [page, limit, mallId, searchType, keyword, exactMatch, memberGrade, memberType, approved, startDate, endDate]);

  useEffect(() => {
    fetchGrades();
    fetchUsers();
  }, [fetchGrades, fetchUsers]);

  const handleSearch = () => {
    setPage(1);
    fetchUsers();
  };

  const setDateRange = (months: number | 'today' | 'all') => {
      const end = new Date();
      const start = new Date();
      
      if (months === 'today') {
          // start is today
      } else if (months === 'all') {
          setStartDate('');
          setEndDate('');
          return;
      } else {
        // days calculation for logic
        // But requested buttons are: Today, 7 days, 15 days, 1 month, 3 months, All
        if (months === 7) start.setDate(start.getDate() - 7);
        else if (months === 15) start.setDate(start.getDate() - 15);
        else {
           // assumption months is actual month count if not 7/15
           start.setMonth(start.getMonth() - (months as number));
        }
      }
      
      setStartDate(format(start, 'yyyy-MM-dd'));
      setEndDate(format(end, 'yyyy-MM-dd'));
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <style jsx global>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none;
          -webkit-appearance: none;
        }
      `}</style>
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">회원 리스트</h1>
        <Button 
          variant="outline" 
          className="border-red-500 text-red-500 hover:bg-red-50 h-8"
          onClick={() => router.push('/admin/users/create')}
        >
          + 회원 등록
        </Button>
      </div>

       {/* Search Section */}
      <div className="border border-gray-200 mb-8 border-t-2 border-t-gray-500">
        {/* Search Header */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-[#FBFBFB]">
           <h2 className="font-bold text-gray-700">회원 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="p-0">
             {/* Permanent Basic Fields */}
             {/* Shop Select */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                    상점
                </div>
                <div className="flex-1 p-3 flex items-center gap-6 min-h-[44px]">
                    <RadioGroup value={mallId} onValueChange={setMallId} className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="shop-all" className="border-gray-300 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="shop-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="base" id="shop-base" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="shop-base" className="text-gray-700 font-normal cursor-pointer flex items-center gap-1"><span className="text-xs">🇰🇷</span> 기준몰</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="chinese" id="shop-cn" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="shop-cn" className="text-gray-700 font-normal cursor-pointer flex items-center gap-1"><span className="text-xs">🇨🇳</span> 중문몰</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

             {/* Search Term */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                    검색어
                </div>
                <div className="flex-1 p-3 flex flex-wrap gap-2 min-h-[44px] py-1.5 px-3">
                    <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="아이디" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="id">아이디</SelectItem>
                            <SelectItem value="name">이름</SelectItem>
                            <SelectItem value="nickname">닉네임</SelectItem>
                            <SelectItem value="email">이메일</SelectItem>
                            <SelectItem value="mobile">휴대폰번호</SelectItem>
                            <SelectItem value="phone">전화번호</SelectItem>
                            <SelectSeparator />
                            <SelectItem value="company">회사명</SelectItem>
                            <SelectItem value="biz_number">사업자등록번호</SelectItem>
                            <SelectItem value="ceo_name">대표자명</SelectItem>
                            <SelectSeparator />
                            <SelectItem value="referrer_id">추천인아이디</SelectItem>
                            <SelectItem value="fax">팩스번호</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select value={exactMatch} onValueChange={setExactMatch}>
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="검색어 전체일치" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="exact">검색어 전체일치</SelectItem>
                            <SelectItem value="partial">검색어 부분포함</SelectItem>
                        </SelectContent>
                    </Select>
                     <Input 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-[400px] h-7 border-gray-300 text-xs" 
                        placeholder="검색어 전체를 정확히 입력하세요." 
                     />
                </div>
            </div>

            {/* Conditionally Visible Detailed Search Section */}
            {isDetailSearchOpen && (
                <>
                    {/* Member Grade and Type */}
                    <div className="flex text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                            회원등급
                        </div>
                        <div className="flex-1 p-3 border-r border-gray-200 min-h-[44px] py-1.5">
                            <Select value={memberGrade} onValueChange={setMemberGrade}>
                                <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                                    <SelectValue placeholder="등급" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="grade">등급</SelectItem>
                                    <SelectItem value="regular">일반회원</SelectItem>
                                    {grades.map(g => (
                                        <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                            회원구분
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6 min-h-[44px]">
                            <RadioGroup value={memberType} onValueChange={setMemberType} className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="all" id="type-all" className="border-gray-300 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="type-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="personal" id="type-personal" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="type-personal" className="text-gray-700 font-normal cursor-pointer">개인회원</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="business" id="type-business" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="type-business" className="text-gray-700 font-normal cursor-pointer">사업자회원</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Join Approval and Date */}
                    <div className="flex text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                            가입승인
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6 border-r border-gray-200 min-h-[44px]">
                            <RadioGroup value={approved} onValueChange={setApproved} className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="all" id="approve-all" className="border-gray-300 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="approve-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="approved" id="approve-yes" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="approve-yes" className="text-gray-700 font-normal cursor-pointer">승인</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="pending" id="approve-no" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="approve-no" className="text-gray-700 font-normal cursor-pointer">미승인</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[80px]">
                            회원가입일
                        </div>
                        <div className="flex-1 p-3 min-h-[80px] flex flex-col justify-center gap-2">
                             <div className="flex items-center gap-2 flex-wrap">
                                <div className="flex items-center gap-1">
                                    <Input 
                                        ref={startDateRef}
                                        type="date"
                                        value={startDate} 
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-34 h-7 text-center border-gray-300"
                                        placeholder="YYYY-MM-DD"
                                    />
                                    <Calendar 
                                        onClick={() => startDateRef.current?.showPicker()}
                                        className="w-4 h-4 text-gray-500 cursor-pointer" 
                                    />
                                </div>
                                <span>~</span>
                                <div className="flex items-center gap-1">
                                    <Input 
                                        ref={endDateRef}
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-34 h-7 text-center border-gray-300" 
                                        placeholder="YYYY-MM-DD"
                                    />
                                    <Calendar 
                                        onClick={() => endDateRef.current?.showPicker()}
                                        className="w-4 h-4 text-gray-500 cursor-pointer" 
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-1 flex-wrap">
                                <Button onClick={() => setDateRange('today')} variant="outline" size="sm" className="h-6 px-2 text-[10px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50 font-normal">오늘</Button>
                                <Button onClick={() => setDateRange(7)} variant="default" size="sm" className="h-6 px-2 text-[10px] bg-gray-600 text-white rounded-sm hover:bg-gray-700 font-normal">7일</Button>
                                <Button onClick={() => setDateRange(15)} variant="outline" size="sm" className="h-6 px-2 text-[10px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50 font-normal">15일</Button>
                                <Button onClick={() => setDateRange(1)} variant="outline" size="sm" className="h-6 px-2 text-[10px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50 font-normal">1개월</Button>
                                <Button onClick={() => setDateRange(3)} variant="outline" size="sm" className="h-6 px-2 text-[10px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50 font-normal">3개월</Button>
                                <Button onClick={() => setDateRange('all')} variant="outline" size="sm" className="h-6 px-2 text-[10px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50 font-normal">전체</Button>
                            </div>
                        </div>
                    </div>

                    {/* Visit Count and Last Login Date */}
                    <div className="flex text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                            방문횟수
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-1 border-r border-gray-200 min-h-[44px] py-1.5 text-[11px]">
                            <Input value={visitMin} onChange={(e) => setVisitMin(e.target.value)} className="w-20 h-7 border-gray-300 text-center" />
                            <span>회 ~</span>
                            <Input value={visitMax} onChange={(e) => setVisitMax(e.target.value)} className="w-20 h-7 border-gray-300 text-center" />
                            <span>회</span>
                        </div>
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                            최종로그인일
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-2 min-h-[44px] py-1.5 px-3">
                             <div className="flex items-center gap-1">
                                 <Input ref={lastLoginStartRef} type="date" value={lastLoginStart} onChange={(e) => setLastLoginStart(e.target.value)} className="w-34 h-7 text-center border-gray-300 [&::-webkit-calendar-picker-indicator]:hidden" placeholder="YYYY-MM-DD" />
                                 <Calendar onClick={() => lastLoginStartRef.current?.showPicker()} className="w-4 h-4 text-gray-500 cursor-pointer" />
                             </div>
                             <span>~</span>
                             <div className="flex items-center gap-1">
                                 <Input ref={lastLoginEndRef} type="date" value={lastLoginEnd} onChange={(e) => setLastLoginEnd(e.target.value)} className="w-34 h-7 text-center border-gray-300 [&::-webkit-calendar-picker-indicator]:hidden" placeholder="YYYY-MM-DD" />
                                 <Calendar onClick={() => lastLoginEndRef.current?.showPicker()} className="w-4 h-4 text-gray-500 cursor-pointer" />
                             </div>
                        </div>
                    </div>

                    {/* Mileage and Deposit */}
                    <div className="flex text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                            마일리지
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-1 border-r border-gray-200 min-h-[44px] py-1.5 text-[11px]">
                            <Input value={mileageMin} onChange={(e) => setMileageMin(e.target.value)} className="w-24 h-7 border-gray-300 text-center" />
                            <span>원 ~</span>
                            <Input value={mileageMax} onChange={(e) => setMileageMax(e.target.value)} className="w-24 h-7 border-gray-300 text-center" />
                            <span>원</span>
                        </div>
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                            예치금
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-1 min-h-[44px] py-1.5 px-3 text-[11px]">
                            <Input value={depositMin} onChange={(e) => setDepositMin(e.target.value)} className="w-24 h-7 border-gray-300 text-center" />
                            <span>원 ~</span>
                            <Input value={depositMax} onChange={(e) => setDepositMax(e.target.value)} className="w-24 h-7 border-gray-300 text-center" />
                            <span>원</span>
                        </div>
                    </div>

                    {/* Order Count and Amount */}
                    <div className="flex text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-10">
                            상품주문건수
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-1 border-r border-gray-200 h-10 py-1.5">
                            <Input value={orderMin} onChange={(e) => setOrderMin(e.target.value)} className="w-16 h-7 border-gray-300 text-center" />
                            <span>건 ~</span>
                            <Input value={orderMax} onChange={(e) => setOrderMax(e.target.value)} className="w-16 h-7 border-gray-300 text-center" />
                            <span>건</span>
                        </div>
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-10">
                            주문금액
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-1 h-10 py-1.5 px-3">
                            <Input value={amountMin} onChange={(e) => setAmountMin(e.target.value)} className="w-20 h-7 border-gray-300 text-center" />
                            <span>원 ~</span>
                            <Input value={amountMax} onChange={(e) => setAmountMax(e.target.value)} className="w-20 h-7 border-gray-300 text-center" />
                            <span>원</span>
                        </div>
                    </div>

                    {/* SMS and Email Agree */}
                    <div className="flex text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                            SMS수신동의
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6 border-r border-gray-200 min-h-[44px] py-1.5">
                            <RadioGroup value={smsAgree} onValueChange={setSmsAgree} className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="all" id="sms-all" className="border-gray-300 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="sms-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="agree" id="sms-agree" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="sms-agree" className="text-gray-700 font-normal cursor-pointer">수신</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="reject" id="sms-reject" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="sms-reject" className="text-gray-700 font-normal cursor-pointer">수신거부</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                            메일수신동의
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6 min-h-[44px] py-1.5 px-3">
                            <RadioGroup value={emailAgree} onValueChange={setEmailAgree} className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="all" id="mail-all" className="border-gray-300 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="mail-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="agree" id="mail-agree" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="mail-agree" className="text-gray-700 font-normal cursor-pointer">수신</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="reject" id="mail-reject" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="mail-reject" className="text-gray-700 font-normal cursor-pointer">수신거부</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Join Route and Long-term non-login */}
                    <div className="flex text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-10">
                            가입경로
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6 border-r border-gray-200 h-10 py-1.5">
                            <RadioGroup value={joinRoute} onValueChange={setJoinRoute} className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="all" id="route-all" className="border-gray-300 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="route-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="pc" id="route-pc" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="route-pc" className="text-gray-700 font-normal cursor-pointer">PC</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="mobile" id="route-mobile" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="route-mobile" className="text-gray-700 font-normal cursor-pointer">모바일</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-10">
                            장기 미로그인
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-1 h-10 py-1.5 px-3">
                            <Input value={longTermLoginDays} onChange={(e) => setLongTermLoginDays(e.target.value)} className="w-16 h-7 border-gray-300 text-center" />
                            <span>일 이상 로그인하지 않은 회원</span>
                        </div>
                    </div>

                    {/* Gender and Birthday */}
                    <div className="flex text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                            성별
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6 border-r border-gray-200 min-h-[44px] py-1.5">
                            <RadioGroup value={gender} onValueChange={setGender} className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="all" id="gender-all" className="border-gray-300 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="gender-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="male" id="gender-male" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="gender-male" className="text-gray-700 font-normal cursor-pointer">남자</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="female" id="gender-female" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="gender-female" className="text-gray-700 font-normal cursor-pointer">여자</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[80px]">
                            생일 <HelpCircle className="w-3 h-3 text-gray-400 ml-1" />
                        </div>
                        <div className="flex-1 p-3 min-h-[80px] py-1.5 px-3 flex flex-col justify-center gap-2">
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex items-center gap-1.5 whitespace-nowrap">
                                    <Checkbox checked={birthdaySearch} onCheckedChange={(checked) => setBirthdaySearch(!!checked)} id="birth-search" className="rounded-[2px] border-gray-300" />
                                    <Label htmlFor="birth-search" className="cursor-pointer">특정일 검색</Label>
                                </div>
                                <Select value={birthdayType} onValueChange={setBirthdayType}>
                                    <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                                        <SelectValue placeholder="전체" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">전체</SelectItem>
                                        <SelectItem value="solar">양력</SelectItem>
                                        <SelectItem value="lunar">음력</SelectItem>
                                    </SelectContent>
                                </Select>
                                 <div className="flex items-center gap-2 flex-wrap">
                                     <div className="flex items-center gap-1">
                                         <Input ref={birthdayStartRef} type="date" value={birthdayStart} onChange={(e) => setBirthdayStart(e.target.value)} className="w-34 h-7 text-center border-gray-300 [&::-webkit-calendar-picker-indicator]:hidden" placeholder="YYYY-MM-DD" />
                                         <Calendar onClick={() => birthdayStartRef.current?.showPicker()} className="w-4 h-4 text-gray-500 cursor-pointer" />
                                     </div>
                                     <span>~</span>
                                     <div className="flex items-center gap-1">
                                         <Input ref={birthdayEndRef} type="date" value={birthdayEnd} onChange={(e) => setBirthdayEnd(e.target.value)} className="w-34 h-7 text-center border-gray-300 [&::-webkit-calendar-picker-indicator]:hidden" placeholder="YYYY-MM-DD" />
                                         <Calendar onClick={() => birthdayEndRef.current?.showPicker()} className="w-4 h-4 text-gray-500 cursor-pointer" />
                                     </div>
                                 </div>
                            </div>
                        </div>
                    </div>

                    {/* Marriage Status and Anniversary */}
                    <div className="flex text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-10">
                            결혼여부
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6 border-r border-gray-200 h-10 py-1.5">
                            <RadioGroup value={marriageStatus} onValueChange={setMarriageStatus} className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="all" id="marriage-all" className="border-gray-300 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="marriage-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="single" id="marriage-single" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="marriage-single" className="text-gray-700 font-normal cursor-pointer">미혼</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="married" id="marriage-done" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="marriage-done" className="text-gray-700 font-normal cursor-pointer">기혼</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-10">
                            결혼기념일
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-2 h-10 py-1.5 px-3">
                             <div className="flex items-center gap-1">
                                 <Input ref={anniversaryStartRef} type="date" value={anniversaryStart} onChange={(e) => setAnniversaryStart(e.target.value)} className="w-34 h-7 text-center border-gray-300 [&::-webkit-calendar-picker-indicator]:hidden" placeholder="YYYY-MM-DD" />
                                 <Calendar onClick={() => anniversaryStartRef.current?.showPicker()} className="w-4 h-4 text-gray-500 cursor-pointer" />
                             </div>
                             <span>~</span>
                             <div className="flex items-center gap-1">
                                 <Input ref={anniversaryEndRef} type="date" value={anniversaryEnd} onChange={(e) => setAnniversaryEnd(e.target.value)} className="w-34 h-7 text-center border-gray-300 [&::-webkit-calendar-picker-indicator]:hidden" placeholder="YYYY-MM-DD" />
                                 <Calendar onClick={() => anniversaryEndRef.current?.showPicker()} className="w-4 h-4 text-gray-500 cursor-pointer" />
                             </div>
                        </div>
                    </div>

                    {/* Privacy Retention Term and Dormant Upcoming */}
                    <div className="flex text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                            개인정보보유효기간
                        </div>
                        <div className="flex-1 p-3 flex flex-wrap items-center gap-6 border-r border-gray-200 min-h-[44px] py-1.5 text-[11px]">
                            <RadioGroup value={privacyTerm} onValueChange={setPrivacyTerm} className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="all" id="privacy-all" className="border-gray-300 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="privacy-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="1" id="privacy-1" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="privacy-1" className="text-gray-700 font-normal cursor-pointer">1년</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="3" id="privacy-3" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="privacy-3" className="text-gray-700 font-normal cursor-pointer">3년</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="5" id="privacy-5" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="privacy-5" className="text-gray-700 font-normal cursor-pointer">5년</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="withdrawal" id="privacy-out" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="privacy-out" className="text-gray-700 font-normal cursor-pointer">탈퇴 시</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[44px]">
                            휴면 전환 예정 회원
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-1.5 min-h-[44px] py-1.5 px-3">
                            <Checkbox checked={dormantTarget} onCheckedChange={(checked) => setDormantTarget(!!checked)} id="dormant-check" className="rounded-[2px] border-gray-300" />
                            <Label htmlFor="dormant-check" className="cursor-pointer whitespace-nowrap">휴면 전환</Label>
                            <Select value={dormantTargetDays} onValueChange={setDormantTargetDays}>
                                <SelectTrigger className="w-20 h-7 text-[11px] border-gray-300 bg-white">
                                    <SelectValue placeholder="7" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7">7</SelectItem>
                                    <SelectItem value="30">30</SelectItem>
                                    <SelectItem value="60">60</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="whitespace-nowrap">일 전 회원</span>
                        </div>
                    </div>

                    {/* SNS Linked Accounts and Dormancy Release Date */}
                    <div className="flex text-xs border-b border-gray-200">
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[80px]">
                            연결계정
                        </div>
                        <div className="flex-1 p-3 border-r border-gray-200 min-h-[80px] py-2">
                            <RadioGroup value={snsType} onValueChange={setSnsType} className="flex flex-wrap gap-x-6 gap-y-2">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="all" id="sns-all" className="border-gray-300 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="sns-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="payco" id="sns-payco" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="sns-payco" className="text-gray-700 font-normal cursor-pointer">페이코</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="facebook" id="sns-facebook" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="sns-facebook" className="text-gray-700 font-normal cursor-pointer">페이스북</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="naver" id="sns-naver" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="sns-naver" className="text-gray-700 font-normal cursor-pointer">네이버</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="kakao" id="sns-kakao" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="sns-kakao" className="text-gray-700 font-normal cursor-pointer">카카오</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="wemep" id="sns-wemep" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="sns-wemep" className="text-gray-700 font-normal cursor-pointer">위메프</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="apple" id="sns-apple" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="sns-apple" className="text-gray-700 font-normal cursor-pointer">애플</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="google" id="sns-google" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="sns-google" className="text-gray-700 font-normal cursor-pointer">구글</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[80px]">
                            휴면해제일
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-2 px-3 py-1.5 min-h-[80px]">
                             <div className="flex items-center gap-1">
                                 <Input ref={dormantReleaseStartRef} type="date" value={dormantReleaseStart} onChange={(e) => setDormantReleaseStart(e.target.value)} className="w-34 h-7 text-center border-gray-300 [&::-webkit-calendar-picker-indicator]:hidden" placeholder="YYYY-MM-DD" />
                                 <Calendar onClick={() => dormantReleaseStartRef.current?.showPicker()} className="w-4 h-4 text-gray-500 cursor-pointer" />
                             </div>
                             <span>~</span>
                             <div className="flex items-center gap-1">
                                 <Input ref={dormantReleaseEndRef} type="date" value={dormantReleaseEnd} onChange={(e) => setDormantReleaseEnd(e.target.value)} className="w-34 h-7 text-center border-gray-300 [&::-webkit-calendar-picker-indicator]:hidden" placeholder="YYYY-MM-DD" />
                                 <Calendar onClick={() => dormantReleaseEndRef.current?.showPicker()} className="w-4 h-4 text-gray-500 cursor-pointer" />
                             </div>
                        </div>
                    </div>
                </>
            )}
        </div>

        <div className="px-4 py-2 border-t border-gray-200">
             <button 
                className="text-blue-500 text-xs flex items-center hover:underline"
                onClick={() => setIsDetailSearchOpen(!isDetailSearchOpen)}
            >
                 {isDetailSearchOpen ? '상세검색 닫힘' : '상세검색 펼침'} <ChevronUp className={`w-3 h-3 ml-1 transform transition-transform ${isDetailSearchOpen ? '' : 'rotate-180'}`} />
             </button>
        </div>
        
         <div className="bg-white p-4 flex flex-col items-center justify-center border-t border-gray-200 gap-2 mb-0">
             <Button onClick={handleSearch} className="bg-[#555555] hover:bg-[#444444] text-white font-bold h-10 px-10 rounded-sm text-sm">검색</Button>
         </div>
      </div>


       {/* List Header */}
      <div className="flex justify-between items-end mb-2">
          <div className="text-xs text-gray-700 font-bold flex items-center gap-1">
              <span>검색 <span className="text-red-500">{total}</span>명</span>
              <span className="text-gray-300">|</span>
               <span>전체 <span className="text-red-500">{total}</span>명</span>
          </div>
          <div className="flex gap-1">
               <Select defaultValue="date-desc">
                    <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="회원가입일 ↓" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date-desc">회원가입일 ↓</SelectItem>
                        <SelectItem value="date-asc">회원가입일 ↑</SelectItem>
                        <SelectItem value="last-login-desc">최종로그인 ↓</SelectItem>
                        <SelectItem value="last-login-asc">최종로그인 ↑</SelectItem>
                        <SelectItem value="dormant-desc">휴면해제일 ↓</SelectItem>
                        <SelectItem value="dormant-asc">휴면해제일 ↑</SelectItem>
                        <SelectItem value="visit-desc">방문횟수 ↓</SelectItem>
                        <SelectItem value="visit-asc">방문횟수 ↑</SelectItem>
                        <SelectItem value="name-desc">이름 ↓</SelectItem>
                        <SelectItem value="name-asc">이름 ↑</SelectItem>
                        <SelectItem value="id-desc">아이디 ↓</SelectItem>
                        <SelectItem value="id-asc">아이디 ↑</SelectItem>
                        <SelectItem value="mileage-desc">마일리지 ↓</SelectItem>
                        <SelectItem value="mileage-asc">마일리지 ↑</SelectItem>
                        <SelectItem value="deposit-desc">예치금 ↓</SelectItem>
                        <SelectItem value="deposit-asc">예치금 ↑</SelectItem>
                        <SelectItem value="order-amount-desc">주문금액 ↓</SelectItem>
                        <SelectItem value="order-amount-asc">주문금액 ↑</SelectItem>
                    </SelectContent>
                </Select>
               <Select defaultValue="10" onValueChange={(_val) => setPage(1)}>
                    <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300">
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

      {/* Table */}
       <div className="border border-gray-300 mb-2 overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse min-w-[2000px]">
               <colgroup>
                  <col className="w-10" />
                  <col className="w-12" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-24" />
              </colgroup>
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr className="h-10">
                      <th className="border-r border-[#CDCDCD] font-normal">
                          <Checkbox className="bg-white border-gray-300 rounded-[2px]" />
                      </th>
                      <th className="border-r border-[#CDCDCD] font-normal">번호</th>
                      <th className="border-r border-[#CDCDCD] font-normal">상점 구분</th>
                      <th className="border-r border-[#CDCDCD] font-normal">아이디/닉네임</th>
                      <th className="border-r border-[#CDCDCD] font-normal">이름</th>
                      <th className="border-r border-[#CDCDCD] font-normal">등급</th>
                      <th className="border-r border-[#CDCDCD] font-normal">마일리지</th>
                      <th className="border-r border-[#CDCDCD] font-normal">예치금</th>
                      <th className="border-r border-[#CDCDCD] font-normal">상품주문건수</th>
                      <th className="border-r border-[#CDCDCD] font-normal">주문금액</th>
                      <th className="border-r border-[#CDCDCD] font-normal">회원가입일</th>
                      <th className="border-r border-[#CDCDCD] font-normal">최종로그인</th>
                       <th className="border-r border-[#CDCDCD] font-normal">휴면해제일</th>
                        <th className="border-r border-[#CDCDCD] font-normal">가입승인</th>
                         <th className="border-r border-[#CDCDCD] font-normal">메일/SMS 발송</th>
                      <th className="font-normal">정보수정</th>
                  </tr>
              </thead>
              <tbody className="bg-white">
                  {loading ? (
                       <tr>
                          <td colSpan={16} className="py-24 border-b border-gray-200 text-center text-gray-500">
                              로딩중...
                          </td>
                      </tr>
                  ) : users.length === 0 ? (
                      <tr>
                          <td colSpan={16} className="py-24 border-b border-gray-200 text-center text-gray-500">
                              검색된 정보가 없습니다.
                          </td>
                      </tr>
                  ) : (
                      users.map((user, idx) => (
                          <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                               <td className="border-r border-gray-200 py-2">
                                   <Checkbox className="bg-white border-gray-300 rounded-[2px] w-4 h-4 mx-auto" />
                               </td>
                               <td className="border-r border-gray-200">{total - ((page - 1) * 10) - idx}</td>
                               <td className="border-r border-gray-200">{user.mallId === 'KR' ? '🇰🇷 기준몰' : '🇨🇳 중문몰'}</td>
                               <td className="border-r border-gray-200">
                                   <Link href={`/admin/users/${user.id}`} className="font-bold text-blue-600 hover:underline">
                                       {user.username}
                                   </Link>
                                   <div className="text-gray-500 text-[11px]">{user.nickname || '-'}</div>
                               </td>
                               <td className="border-r border-gray-200">
                                   <Link href={`/admin/users/${user.id}`} className="hover:underline">
                                       {user.name}
                                   </Link>
                               </td>
                               <td className="border-r border-gray-200">{user.info?.grade?.name || '일반회원'}</td>
                               <td className="border-r border-gray-200">{user.info?.mileage?.toLocaleString()}</td>
                               <td className="border-r border-gray-200">{user.info?.deposit?.toLocaleString()}</td>
                               <td className="border-r border-gray-200">{user.orderCount?.toLocaleString()}</td>
                               <td className="border-r border-gray-200">{user.totalOrderAmount?.toLocaleString()}</td>
                               <td className="border-r border-gray-200">{format(new Date(user.createdAt), 'yyyy-MM-dd')}</td>
                               <td className="border-r border-gray-200">{user.info?.lastLoginAt ? format(new Date(user.info.lastLoginAt), 'yyyy-MM-dd HH:mm') : '-'}</td>
                               <td className="border-r border-gray-200">-</td>
                               <td className="border-r border-gray-200">{user.info?.isApproved ? '승인' : '미승인'}</td>
                               <td className="border-r border-gray-200">
                                   <Button variant="outline" size="sm" className="h-6 px-1.5 text-[10px]">발송</Button>
                               </td>
                               <td>
                                   <Button variant="outline" size="sm" className="h-6 px-2 text-[10px] bg-white border-gray-300">수정</Button>
                               </td>
                          </tr>
                      ))
                  )}
              </tbody>
          </table>
      </div>

       {/* Bottom Controls */}
       <div className="flex justify-between items-center mb-8">
            <div className="flex gap-1">
                 <Button variant="outline" className="h-8 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50">선택 가입승인</Button>
                 <Button variant="outline" className="h-8 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50">선택 탈퇴처리</Button>
            </div>
            <div className="flex gap-1">
                 <Button 
                    variant="outline" 
                    className="h-8 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 flex items-center gap-1"
                    onClick={() => setIsPrivacyPopupOpen(true)}
                  >
                    <span className="bg-gray-600 text-white rounded-[2px] w-3 h-3 flex items-center justify-center text-[10px] font-bold">!</span>
                    개인정보수집 동의상태 변경내역
                 </Button>
                <Button variant="outline" className="h-8 px-3 text-[11px] bg-white border-gray-300 text-green-600 hover:text-green-700 hover:bg-green-50 flex items-center gap-1 rounded-sm">
                   <span className="text-green-600 bg-green-100 p-0.5 rounded-sm"><Download className="w-3 h-3"/></span>
                   엑셀다운로드
               </Button>
            </div>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Footer Info */}
      <div className="text-gray-600 text-xs">
          <h3 className="font-bold flex items-center gap-1 mb-2 text-blue-500">
              <Info className="w-4 h-4" /> 안내
          </h3>
          <div className="space-y-1">
              <p className="font-bold text-gray-800">회원의 주문금액은 어떤 기준으로 집계되나요?</p>
              <p className="text-gray-600 pl-2">- 회원의 주문금액은 구매확정된 주문에 대해서만 집계됩니다.</p>
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
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0">
                         <ChevronUp className="w-4 h-4 rotate-180" />
                </Button>
            </div>
        </div>

        <PrivacyConsentHistoryPopup open={isPrivacyPopupOpen} onOpenChange={setIsPrivacyPopupOpen} />
    </div>
  );
}
