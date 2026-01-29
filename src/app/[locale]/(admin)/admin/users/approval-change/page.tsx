/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircle,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
    getUsersAction, 
    processUserBatchAction,
    GetUsersParams 
} from "@/actions/user-actions";
import { getUserGradesAction } from "@/actions/user-grade-actions";
import { format } from "date-fns";

export default function JoinApprovalChangePage() {
  // State
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [grades, setGrades] = useState<any[]>([]);
  const [isDetailedSearchOpen, setIsDetailedSearchOpen] = useState(false);
  
  // Search State
  const [searchParams, setSearchParams] = useState<GetUsersParams>({
      page: 1,
      limit: 10,
      mallId: 'all',
      searchType: 'id',
      keyword: '',
      exactMatch: false,
      memberGrade: 'grade',
      memberType: 'all',
      approved: 'all',
      startDate: format(new Date(new Date().setMonth(new Date().getMonth() - 1)), "yyyy-MM-dd"), // 1 month ago
      endDate: format(new Date(), "yyyy-MM-dd"),
      
      // Detailed fields
      visitCountMin: undefined,
      visitCountMax: undefined,
      mileageMin: undefined,
      mileageMax: undefined,
      depositMin: undefined,
      depositMax: undefined,
      orderCountMin: undefined,
      orderCountMax: undefined,
      orderAmountMin: undefined,
      orderAmountMax: undefined,
      smsConsent: 'all',
      emailConsent: 'all',
      gender: 'all',
      maritalStatus: 'all', 
      // Dates
      lastLoginStart: '',
      lastLoginEnd: '',
      birthdayStart: '',
      birthdayEnd: '',
      anniversaryStart: '',
      anniversaryEnd: '',
      linkedProvider: 'all',
      joinPath: 'all',
  });

  // Selection State
  const [targetType, setTargetType] = useState<'selected' | 'all'>('selected');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Processing State
  const [processType, setProcessType] = useState<'join' | 'grade'>('join');
  const [targetStatus, setTargetStatus] = useState<string>('approved');
  const [targetGrade, setTargetGrade] = useState<string>("");

  const loadGrades = React.useCallback(async () => {
      const res = await getUserGradesAction();
      if (res.success) {
          setGrades(res.grades || []);
      }
  }, []);

  const handleSearch = React.useCallback(async (page = 1) => {
      const params = { ...searchParams, page };
      const res = await getUsersAction(params);
      if (res.success) {
          setUsers(res.items || []);
          setTotal(res.total || 0);
          setSearchParams(curr => ({ ...curr, page }));
          // Reset selection on search
          setSelectedIds([]);
      } else {
          toast.error(res.error || "검색에 실패했습니다.");
      }
  }, [searchParams]);

  useEffect(() => {
      loadGrades();
      handleSearch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProcess = async () => {
      if (targetType === 'selected' && selectedIds.length === 0) {
          toast.error("선택된 회원이 없습니다.");
          return;
      }

      if (processType === 'grade' && !targetGrade) {
          toast.error("변경할 등급을 선택해주세요.");
          return;
      }

      const confirmMsg = `총 ${targetType === 'selected' ? selectedIds.length : total}명의 회원을 ${processType === 'join' ? (targetStatus === 'approved' ? '승인' : '미승인') : '등급변경'} 처리하시겠습니까?`;
      if (!confirm(confirmMsg)) return;

      const res = await processUserBatchAction({
          targetType,
          selectedIds,
          searchParams: targetType === 'all' ? searchParams : undefined,
          actionType: processType === 'join' ? 'approve' : 'grade',
          value: processType === 'join' ? targetStatus : targetGrade
      });

      if (res.success) {
          toast.success(`${res.count}명의 정보가 변경되었습니다.`);
          handleSearch(searchParams.page); // Refresh
      } else {
          toast.error(res.error || "처리에 실패했습니다.");
      }
  };

  const toggleSelectAll = (checked: boolean) => {
      if (checked) {
          setSelectedIds(users.map(u => u.id));
      } else {
          setSelectedIds([]);
      }
  };

  const toggleSelectOne = (id: string, checked: boolean) => {
      if (checked) {
          setSelectedIds(prev => [...prev, id]);
      } else {
          setSelectedIds(prev => prev.filter(uid => uid !== id));
      }
  };

  const handleParamChange = (field: keyof GetUsersParams, value: any) => {
      setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  const setDateRange = (months: number | 'all' | 'today') => {
      const end = new Date();
      let start = new Date();
      
      if (months === 'today') {
          // start is today
      } else if (months === 'all') {
          start = new Date('2000-01-01');
      } else {
          start.setMonth(end.getMonth() - Number(months));
      }
      
      handleParamChange('startDate', format(start, 'yyyy-MM-dd'));
      handleParamChange('endDate', format(end, 'yyyy-MM-dd'));
  };


  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">가입승인/등급변경</h1>
        <Button onClick={handleProcess} className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
            가입승인/등급변경 처리
        </Button>
      </div>

      {/* Target Member Selection */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">대상회원 선택</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Target Selection */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    대상회원 선택
                </div>
                <div className="flex-1 p-3">
                    <RadioGroup 
                        value={targetType} 
                        onValueChange={(v: any) => setTargetType(v)}
                        className="flex items-center gap-6"
                    >
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="target-all" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="target-all" className="text-gray-600 font-normal cursor-pointer text-xs">검색회원 전체적용</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="selected" id="target-selected" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="target-selected" className="text-gray-600 font-normal cursor-pointer text-xs">회원선택 적용</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            {/* Store */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    상점
                </div>
                <div className="flex-1 p-3">
                    <RadioGroup 
                        value={searchParams.mallId}
                        onValueChange={(v) => handleParamChange('mallId', v)}
                        className="flex items-center gap-6"
                    >
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="store-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="store-all" className="text-gray-600 font-normal cursor-pointer text-xs">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="base" id="store-kr" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="store-kr" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-1">
                                🇰🇷 기준몰
                            </Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="chinese" id="store-cn" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="store-cn" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-1">
                                🇨🇳 중문몰
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            {/* Search Word */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-3 flex items-center gap-1">
                     <Select 
                        value={searchParams.searchType} 
                        onValueChange={(v) => handleParamChange('searchType', v)}
                    >
                        <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="아이디" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                            <SelectItem value="id">아이디</SelectItem>
                            <SelectItem value="name">이름</SelectItem>
                            <SelectItem value="nickname">닉네임</SelectItem>
                            <SelectItem value="email">이메일</SelectItem>
                            <SelectItem value="mobile">휴대폰번호</SelectItem>
                            <SelectItem value="phone">전화번호</SelectItem>
                            <SelectItem value="sep1" disabled className="justify-center opactiy-50">===========</SelectItem>
                            <SelectItem value="companyName">회사명</SelectItem>
                            <SelectItem value="businessNumber">사업자등록번호</SelectItem>
                            <SelectItem value="ceoName">대표자명</SelectItem>
                            <SelectItem value="sep2" disabled className="justify-center opactiy-50">===========</SelectItem>
                            <SelectItem value="recommenderId">추천인아이디</SelectItem>
                            <SelectItem value="fax">팩스번호</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select 
                        value={searchParams.exactMatch ? "exact" : "partial"} 
                        onValueChange={(v) => handleParamChange('exactMatch', v === "exact")}
                    >
                        <SelectTrigger className="w-32 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="검색어 전체일치" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="exact">검색어 전체일치</SelectItem>
                            <SelectItem value="partial">검색어 부분일치</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input 
                        className="w-64 h-7 text-xs border-gray-300" 
                        placeholder="검색어 입력" 
                        value={searchParams.keyword}
                        onChange={(e) => handleParamChange('keyword', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(1)}
                    />
                </div>
            </div>

             {/* Member Grade & Type */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    회원등급
                </div>
                <div className="flex-1 p-3 border-r border-gray-200">
                    <Select 
                        value={searchParams.memberGrade}
                        onValueChange={(v) => handleParamChange('memberGrade', v)}
                    >
                        <SelectTrigger className="w-32 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="등급" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="grade">등급</SelectItem>
                            {grades.map(g => (
                                <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    회원구분
                </div>
                <div className="flex-1 p-3">
                     <RadioGroup 
                        value={searchParams.memberType}
                        onValueChange={(v) => handleParamChange('memberType', v)}
                        className="flex items-center gap-6"
                    >
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="type-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="type-all" className="text-gray-600 font-normal cursor-pointer text-xs">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="personal" id="type-personal" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="type-personal" className="text-gray-600 font-normal cursor-pointer text-xs">개인회원</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="business" id="type-business" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="type-business" className="text-gray-600 font-normal cursor-pointer text-xs">사업자회원</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

             {/* Join Approval & Date */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    가입승인
                </div>
                <div className="flex-1 p-3 border-r border-gray-200">
                      <RadioGroup 
                        value={searchParams.approved}
                        onValueChange={(v) => handleParamChange('approved', v)}
                        className="flex items-center gap-6"
                    >
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="approval-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="approval-all" className="text-gray-600 font-normal cursor-pointer text-xs">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="approved" id="approval-approved" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="approval-approved" className="text-gray-600 font-normal cursor-pointer text-xs">승인</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="pending" id="approval-pending" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="approval-pending" className="text-gray-600 font-normal cursor-pointer text-xs">미승인</Label>
                        </div>
                    </RadioGroup>
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    회원가입일
                </div>
                <div className="flex-1 p-3">
                     <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-2">
                             <div className="relative">
                                 <Input 
                                    className="w-28 h-7 text-xs border-gray-300 pr-8" 
                                    value={searchParams.startDate || ''}
                                    onChange={(e) => handleParamChange('startDate', e.target.value)}
                                    type="date"
                                 />
                             </div>
                             <span className="text-gray-400">~</span>
                             <div className="relative">
                                 <Input 
                                    className="w-28 h-7 text-xs border-gray-300 pr-8" 
                                    value={searchParams.endDate || ''}
                                    onChange={(e) => handleParamChange('endDate', e.target.value)}
                                    type="date"
                                 />
                             </div>
                         </div>
                         <div className="flex gap-0">
                             <Button onClick={() => setDateRange('today')} variant="outline" className="h-6 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-l-[2px] rounded-r-none hover:bg-gray-50">오늘</Button>
                             <Button onClick={() => setDateRange(0.25)} variant="outline" className="h-6 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-none border-l-0 hover:bg-gray-50">7일</Button>
                             <Button onClick={() => setDateRange(0.5)} variant="outline" className="h-6 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-none border-l-0 hover:bg-gray-50">15일</Button>
                             <Button onClick={() => setDateRange(1)} variant="outline" className="h-6 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-none border-l-0 hover:bg-gray-50">1개월</Button>
                             <Button onClick={() => setDateRange(3)} variant="outline" className="h-6 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-none border-l-0 hover:bg-gray-50">3개월</Button>
                             <Button onClick={() => setDateRange('all')} variant="outline" className="h-6 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-r-[2px] rounded-l-none border-l-0 hover:bg-gray-50">전체</Button>
                         </div>
                     </div>
                </div>
            </div>
            
            {/* Detailed Search Rows */}
            {isDetailedSearchOpen && (
                <>
                    {/* Row 1: Visit Count / Last Login */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">방문횟수</div>
                        <div className="flex-1 p-3 border-r border-gray-200 flex items-center gap-2">
                            <Input className="w-24 h-7 text-xs" value={searchParams.visitCountMin || ''} onChange={(e) => handleParamChange('visitCountMin', Number(e.target.value))} placeholder="" />
                            <span>회 ~</span>
                            <Input className="w-24 h-7 text-xs" value={searchParams.visitCountMax || ''} onChange={(e) => handleParamChange('visitCountMax', Number(e.target.value))} placeholder="" />
                            <span>회</span>
                        </div>
                         <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">최종로그인일</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                             <Input type="date" className="w-32 h-7 text-xs" value={searchParams.lastLoginStart || ''} onChange={(e) => handleParamChange('lastLoginStart', e.target.value)} />
                             <span>~</span>
                             <Input type="date" className="w-32 h-7 text-xs" value={searchParams.lastLoginEnd || ''} onChange={(e) => handleParamChange('lastLoginEnd', e.target.value)} />
                        </div>
                    </div>

                    {/* Row 2: Mileage / Deposit */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">마일리지</div>
                        <div className="flex-1 p-3 border-r border-gray-200 flex items-center gap-2">
                            <Input className="w-24 h-7 text-xs" value={searchParams.mileageMin || ''} onChange={(e) => handleParamChange('mileageMin', Number(e.target.value))} />
                            <span>원 ~</span>
                            <Input className="w-24 h-7 text-xs" value={searchParams.mileageMax || ''} onChange={(e) => handleParamChange('mileageMax', Number(e.target.value))} />
                            <span>원</span>
                        </div>
                         <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">예치금</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Input className="w-24 h-7 text-xs" value={searchParams.depositMin || ''} onChange={(e) => handleParamChange('depositMin', Number(e.target.value))} />
                            <span>원 ~</span>
                            <Input className="w-24 h-7 text-xs" value={searchParams.depositMax || ''} onChange={(e) => handleParamChange('depositMax', Number(e.target.value))} />
                            <span>원</span>
                        </div>
                    </div>

                    {/* Row 3: Order Count / Amount */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">상품주문건수</div>
                        <div className="flex-1 p-3 border-r border-gray-200 flex items-center gap-2">
                            <Input className="w-24 h-7 text-xs" value={searchParams.orderCountMin || ''} onChange={(e) => handleParamChange('orderCountMin', Number(e.target.value))} />
                            <span>건 ~</span>
                            <Input className="w-24 h-7 text-xs" value={searchParams.orderCountMax || ''} onChange={(e) => handleParamChange('orderCountMax', Number(e.target.value))} />
                            <span>건</span>
                        </div>
                         <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">주문금액</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Input className="w-24 h-7 text-xs" value={searchParams.orderAmountMin || ''} onChange={(e) => handleParamChange('orderAmountMin', Number(e.target.value))} />
                            <span>원 ~</span>
                            <Input className="w-24 h-7 text-xs" value={searchParams.orderAmountMax || ''} onChange={(e) => handleParamChange('orderAmountMax', Number(e.target.value))} />
                            <span>원</span>
                        </div>
                    </div>

                    {/* Row 4: SMS / Email Consent */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">SMS수신동의</div>
                        <div className="flex-1 p-3 border-r border-gray-200">
                            <RadioGroup value={searchParams.smsConsent} onValueChange={(v) => handleParamChange('smsConsent', v)} className="flex gap-6">
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="all" id="sms-all"/><Label htmlFor="sms-all">전체</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="true" id="sms-true"/><Label htmlFor="sms-true">수신</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="false" id="sms-false"/><Label htmlFor="sms-false">수신거부</Label></div>
                            </RadioGroup>
                        </div>
                         <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">메일수신동의</div>
                        <div className="flex-1 p-3">
                             <RadioGroup value={searchParams.emailConsent} onValueChange={(v) => handleParamChange('emailConsent', v)} className="flex gap-6">
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="all" id="email-all"/><Label htmlFor="email-all">전체</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="true" id="email-true"/><Label htmlFor="email-true">수신</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="false" id="email-false"/><Label htmlFor="email-false">수신거부</Label></div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 5: Join Path / Long Term Idle */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">가입경로</div>
                        <div className="flex-1 p-3 border-r border-gray-200">
                            <RadioGroup value={searchParams.joinPath} onValueChange={(v) => handleParamChange('joinPath', v)} className="flex gap-6">
                                {/* Mocking Join Path as it's not in schema yet */}
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="all" id="path-all"/><Label htmlFor="path-all">전체</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="pc" id="path-pc"/><Label htmlFor="path-pc">PC</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="mobile" id="path-mobile"/><Label htmlFor="path-mobile">모바일</Label></div>
                            </RadioGroup>
                        </div>
                         <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">장기 미로그인</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                             <Input className="w-24 h-7 text-xs" placeholder="" />
                             <span>일 이상 로그인하지 않은 회원</span>
                        </div>
                    </div>

                    {/* Row 6: Gender / Birthday */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">성별</div>
                        <div className="flex-1 p-3 border-r border-gray-200">
                            <RadioGroup value={searchParams.gender} onValueChange={(v) => handleParamChange('gender', v)} className="flex gap-6">
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="all" id="gender-all"/><Label htmlFor="gender-all">전체</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="MALE" id="gender-m"/><Label htmlFor="gender-m">남자</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="FEMALE" id="gender-f"/><Label htmlFor="gender-f">여자</Label></div>
                            </RadioGroup>
                        </div>
                         <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">생일</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                             <Checkbox id="birth-specific" />
                             <Label htmlFor="birth-specific" className="whitespace-nowrap">특정일 검색</Label>
                             <Select defaultValue="all">
                                <SelectTrigger className="w-20 h-7"><SelectValue placeholder="전체" /></SelectTrigger>
                                <SelectContent><SelectItem value="all">전체</SelectItem></SelectContent>
                             </Select>
                             <Input type="date" className="w-32 h-7 text-xs" value={searchParams.birthdayStart || ''} onChange={(e) => handleParamChange('birthdayStart', e.target.value)} />
                             <span>~</span>
                             <Input type="date" className="w-32 h-7 text-xs" value={searchParams.birthdayEnd || ''} onChange={(e) => handleParamChange('birthdayEnd', e.target.value)} />
                        </div>
                    </div>

                    {/* Row 7: Marital / Anniversary */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">결혼여부</div>
                        <div className="flex-1 p-3 border-r border-gray-200">
                            <RadioGroup value={searchParams.maritalStatus} onValueChange={(v) => handleParamChange('maritalStatus', v)} className="flex gap-6">
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="all" id="marry-all"/><Label htmlFor="marry-all">전체</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="SINGLE" id="marry-single"/><Label htmlFor="marry-single">미혼</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="MARRIED" id="marry-married"/><Label htmlFor="marry-married">기혼</Label></div>
                            </RadioGroup>
                        </div>
                         <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">결혼기념일</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                             <Input type="date" className="w-32 h-7 text-xs" value={searchParams.anniversaryStart || ''} onChange={(e) => handleParamChange('anniversaryStart', e.target.value)} />
                             <span>~</span>
                             <Input type="date" className="w-32 h-7 text-xs" value={searchParams.anniversaryEnd || ''} onChange={(e) => handleParamChange('anniversaryEnd', e.target.value)} />
                        </div>
                    </div>

                    {/* Row 8: Info Validity / Dormant */}
                     <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">개인정보유효기간</div>
                        <div className="flex-1 p-3 border-r border-gray-200">
                             <RadioGroup defaultValue="all" className="flex gap-6">
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="all" id="valid-all"/><Label htmlFor="valid-all">전체</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="1" id="valid-1"/><Label htmlFor="valid-1">1년</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="3" id="valid-3"/><Label htmlFor="valid-3">3년</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="5" id="valid-5"/><Label htmlFor="valid-5">5년</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="out" id="valid-out"/><Label htmlFor="valid-out">탈퇴 시</Label></div>
                            </RadioGroup>
                        </div>
                         <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">휴면 전환 예정 회원</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                             <Checkbox id="dormant-check" />
                             <Label htmlFor="dormant-check">휴면 전환</Label>
                             <Select defaultValue="7">
                                <SelectTrigger className="w-20 h-7"><SelectValue placeholder="7" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="7">7</SelectItem>
                                    <SelectItem value="30">30</SelectItem>
                                </SelectContent>
                             </Select>
                             <span>일 전 회원</span>
                        </div>
                    </div>

                    {/* Row 9: Linked Accounts / Dormant Release */}
                     <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">연결계정</div>
                        <div className="flex-1 p-3 border-r border-gray-200">
                             <RadioGroup value={searchParams.linkedProvider} onValueChange={(v) => handleParamChange('linkedProvider', v)} className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="all" id="link-all"/><Label htmlFor="link-all">전체</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="payco" id="link-payco"/><Label htmlFor="link-payco">페이코</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="facebook" id="link-fb"/><Label htmlFor="link-fb">페이스북</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="naver" id="link-naver"/><Label htmlFor="link-naver">네이버</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="kakao" id="link-kakao"/><Label htmlFor="link-kakao">카카오</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="apple" id="link-apple"/><Label htmlFor="link-apple">애플</Label></div>
                                <div className="flex items-center gap-1.5"><RadioGroupItem value="google" id="link-google"/><Label htmlFor="link-google">구글</Label></div>
                            </RadioGroup>
                        </div>
                         <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">휴면해제일</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                             <Input type="date" className="w-32 h-7 text-xs" />
                             <span>~</span>
                             <Input type="date" className="w-32 h-7 text-xs" />
                        </div>
                    </div>
                </>
            )}
        </div>
        
         <div className="flex justify-between mt-4">
             <div 
                className="text-blue-500 text-xs flex items-center gap-1 cursor-pointer select-none"
                onClick={() => setIsDetailedSearchOpen(!isDetailedSearchOpen)}
             >
                 {isDetailedSearchOpen ? '상세검색 닫힘' : '상세검색 펼침'} 
                 {isDetailedSearchOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
             </div>
             <div></div> 
         </div>
         
         <div className="flex justify-center -mt-4">
              <Button onClick={() => handleSearch(1)} className="h-9 px-10 text-xs bg-[#555555] hover:bg-[#444444] text-white rounded-[2px] font-bold">
                검색
            </Button>
         </div>
      </div>

       {/* Search Results */}
       <div className="mb-0">
           <div className="flex items-center justify-between mb-2">
               <div className="text-xs">
                   검색 <span className="text-red-500 font-bold">{total}</span>명 / 전체 <span className="text-red-500 font-bold">?</span>명
               </div>
               <Select 
                  value={String(searchParams.limit)}
                  onValueChange={(v) => {
                      handleParamChange('limit', Number(v));
                      handleSearch(1); // Reload with new limit
                  }}
               >
                    <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white">
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
           
           <div className="border-t-2 border-gray-400 border-b border-gray-200 min-h-[100px] mb-8">
                <table className="w-full text-xs text-center border-collapse">
                     <thead>
                         <tr className="bg-[#B9B9B9] text-white h-9 border-b border-gray-300 font-normal">
                             <th className="w-10 border-r border-gray-300">
                                 <Checkbox 
                                    className="border-gray-50 opacity-50 bg-white"
                                    checked={users.length > 0 && selectedIds.length === users.length}
                                    onCheckedChange={toggleSelectAll}
                                 />
                             </th>
                             <th className="w-12 border-r border-gray-300">번호</th>
                             <th className="w-20 border-r border-gray-300">상점 구분</th>
                             <th className="border-r border-gray-300">아이디/닉네임</th>
                             <th className="w-24 border-r border-gray-300">이름</th>
                             <th className="w-20 border-r border-gray-300">등급</th>
                             <th className="w-24 border-r border-gray-300">주문금액</th>
                             <th className="w-24 border-r border-gray-300">상품주문건</th>
                             <th className="w-24 border-r border-gray-300">회원가입일</th>
                             <th className="w-24 border-r border-gray-300">최종로그인</th>
                             <th className="w-20">가입승인</th>
                         </tr>
                     </thead>
                     <tbody>
                         {users.length === 0 ? (
                             <tr className="h-14">
                                 <td colSpan={11} className="text-center text-gray-500">검색된 정보가 없습니다.</td>
                             </tr>
                         ) : (
                             users.map((user, idx) => (
                                 <tr key={user.id} className="h-10 border-b border-gray-200 hover:bg-gray-50">
                                     <td className="border-r border-gray-200">
                                         <Checkbox 
                                            className="border-gray-300"
                                            checked={selectedIds.includes(user.id)}
                                            onCheckedChange={(c) => toggleSelectOne(user.id, !!c)}
                                         />
                                     </td>
                                     <td className="border-r border-gray-200">{total - ((searchParams.page || 1) - 1) * (searchParams.limit || 10) - idx}</td>
                                     <td className="border-r border-gray-200">{user.mallId === 'KR' ? '한국' : '중국'}</td>
                                     <td className="border-r border-gray-200 text-left pl-3">
                                         <div className="font-bold">{user.username}</div>
                                         <div className="text-gray-500">{user.nickname}</div>
                                     </td>
                                     <td className="border-r border-gray-200">{user.name}</td>
                                     <td className="border-r border-gray-200">{user.info?.grade?.name || '-'}</td>
                                     <td className="border-r border-gray-200 text-right pr-3">
                                         {Number(user.totalOrderAmount || 0).toLocaleString()}원
                                     </td>
                                     <td className="border-r border-gray-200 text-right pr-3">
                                         {Number(user.orderCount || 0).toLocaleString()}건
                                     </td>
                                     <td className="border-r border-gray-200">
                                         {format(new Date(user.createdAt), "yyyy-MM-dd")}
                                     </td>
                                     <td className="border-r border-gray-200">
                                         {user.lastLoginAt ? format(new Date(user.lastLoginAt), "yyyy-MM-dd") : '-'}
                                     </td>
                                     <td>
                                         {user.info?.isApproved ? (
                                             <span className="text-blue-600 font-bold">승인</span>
                                         ) : (
                                             <span className="text-red-500">미승인</span>
                                         )}
                                     </td>
                                 </tr>
                             ))
                         )}
                     </tbody>
                </table>
           </div>

           {/* Processing Section */}
           <div className="border-t border-gray-400 border-b border-gray-200 mb-2">
                <div className="flex border-b border-gray-200">
                    <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                        처리항목
                    </div>
                    <div className="flex-1 p-3">
                        <RadioGroup 
                            value={processType}
                            onValueChange={(v: any) => setProcessType(v)}
                            className="flex items-center gap-6"
                        >
                             <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="join" id="process-join" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="process-join" className="text-gray-600 font-normal cursor-pointer text-xs">가입승인</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="grade" id="process-grade" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="process-grade" className="text-gray-600 font-normal cursor-pointer text-xs">등급변경</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                 <div className="flex border-b border-gray-200">
                    <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                        {processType === 'join' ? "변경상태선택" : "변경등급선택"}
                    </div>
                    <div className="flex-1 p-3">
                        {processType === 'join' ? (
                            <RadioGroup 
                                value={targetStatus}
                                onValueChange={(v) => setTargetStatus(v)}
                                className="flex items-center gap-6"
                            >
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="approved" id="status-approved" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="status-approved" className="text-gray-600 font-normal cursor-pointer text-xs">승인</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="pending" id="status-pending" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="status-pending" className="text-gray-600 font-normal cursor-pointer text-xs">미승인</Label>
                                </div>
                            </RadioGroup>
                        ) : (
                             <Select 
                                value={targetGrade}
                                onValueChange={setTargetGrade}
                            >
                                <SelectTrigger className="w-48 h-7 text-xs border-gray-300 bg-white">
                                    <SelectValue placeholder="등급 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                    {grades.map(g => (
                                        <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                </div>
           </div>

            <p className="text-[11px] text-red-500 flex items-start gap-1">
                 <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 자동발송 설정에 따라 회원상태 변경 시 회원에게 SMS/메일로 안내메시지가 발송되므로 주의하시기 바랍니다.
            </p>
       </div>
       
        {/* Floating Actions */}
        <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
            <Button onClick={handleProcess} className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                <span className="text-[10px] font-bold">처리</span>
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

    </div>
  );
}
