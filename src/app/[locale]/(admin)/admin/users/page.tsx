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
  Youtube,
  ChevronUp,
  ChevronDown,
  Download,
  Calendar,
  Search,
  Info
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { getUsersAction, getUserGradesAction } from "@/actions/user-actions";

export default function MemberListPage() {
  // Filter States
  const [mallId, setMallId] = useState('all');
  const [searchType, setSearchType] = useState('id');
  const [keyword, setKeyword] = useState('');
  const [exactMatch, setExactMatch] = useState('exact');
  const [memberGrade, setMemberGrade] = useState('grade');
  const [memberType, setMemberType] = useState('all');
  const [approved, setApproved] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Data States
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [grades, setGrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isDetailSearchOpen, setIsDetailSearchOpen] = useState(false);

  useEffect(() => {
    fetchGrades();
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchGrades = async () => {
    const res = await getUserGradesAction();
    if (res.success) {
      setGrades(res.grades || []);
    }
  };

  const fetchUsers = async () => {
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
        setUsers(res.items || []);
        setTotal(res.total || 0);
      }
    } catch(e) {
      console.error(e);
    }
    setLoading(false);
  };

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
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">회원 리스트</h1>
        <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 h-8">+ 회원 등록</Button>
      </div>

       {/* Search Section */}
      <div className="border border-gray-200 mb-8 border-t-2 border-t-gray-500">
        {/* Search Header */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-[#FBFBFB]">
           <h2 className="font-bold text-gray-700">회원 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="p-0">
             {/* Shop Select */}
             <div className="flex items-center text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    상점
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <RadioGroup value={mallId} onValueChange={setMallId} className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="shop-all" className="border-red-500 text-red-500 focus:ring-red-500" />
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
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-3 flex gap-2">
                    <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="아이디" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="id">아이디</SelectItem>
                            <SelectItem value="name">이름</SelectItem>
                            <SelectItem value="email">이메일</SelectItem>
                            <SelectItem value="nickname">닉네임</SelectItem>
                            <SelectItem value="mobile">휴대폰번호</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select value={exactMatch} onValueChange={setExactMatch}>
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="검색어 전체일치" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="exact">검색어 전체일치</SelectItem>
                            <SelectItem value="partial">검색어 부분일치</SelectItem>
                        </SelectContent>
                    </Select>
                     <Input 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-[400px] h-7 border-gray-300 text-xs" 
                        placeholder="검색어 입력" 
                     />
                </div>
            </div>

             {/* Member Grade and Type */}
             <div className="flex text-xs border-b border-gray-200">
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    회원등급
                </div>
                 <div className="flex-1 p-3 border-r border-gray-200">
                     <Select value={memberGrade} onValueChange={setMemberGrade}>
                        <SelectTrigger className="w-48 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="등급" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="grade">전체 등급</SelectItem>
                            {grades.map(g => (
                                <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    회원구분
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <RadioGroup value={memberType} onValueChange={setMemberType} className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="type-all" className="border-red-500 text-red-500 focus:ring-red-500" />
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
                <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    가입승인
                </div>
                 <div className="flex-1 p-3 flex items-center gap-6 border-r border-gray-200">
                     <RadioGroup value={approved} onValueChange={setApproved} className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="approve-all" className="border-red-500 text-red-500 focus:ring-red-500" />
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
                 <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    회원가입일
                </div>
                <div className="flex-1 p-3">
                     <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                             <div className="flex items-center gap-1">
                                <Input 
                                    value={startDate} 
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-32 h-7 text-center border-gray-300"
                                    placeholder="YYYY-MM-DD"
                                />
                                <Calendar className="w-4 h-4 text-gray-500" />
                            </div>
                            <span>~</span>
                            <div className="flex items-center gap-1">
                                <Input 
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-32 h-7 text-center border-gray-300" 
                                    placeholder="YYYY-MM-DD"
                                />
                                <Calendar className="w-4 h-4 text-gray-500" />
                            </div>
                        </div>
                        <div className="flex items-center gap-0.5">
                             <Button onClick={() => setDateRange('today')} variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">오늘</Button>
                            <Button onClick={() => setDateRange(7)} variant="default" size="sm" className="h-7 px-2 text-[11px] bg-gray-600 text-white rounded-sm hover:bg-gray-700">7일</Button>
                            <Button onClick={() => setDateRange(15)} variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">15일</Button>
                            <Button onClick={() => setDateRange(1)} variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1개월</Button>
                             <Button onClick={() => setDateRange(3)} variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">3개월</Button>
                            <Button onClick={() => setDateRange('all')} variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">전체</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="px-4 py-2 border-t border-gray-200">
             <button 
                className="text-blue-500 text-xs flex items-center hover:underline"
                onClick={() => setIsDetailSearchOpen(!isDetailSearchOpen)}
            >
                 상세검색 펼침 <ChevronDown className={`w-3 h-3 ml-1 transform transition-transform ${isDetailSearchOpen ? 'rotate-180' : ''}`} />
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
                    </SelectContent>
                </Select>
               <Select defaultValue="10">
                    <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300">
                        <SelectValue placeholder="10개 보기" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10개 보기</SelectItem>
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
                                   <div className="font-bold text-gray-800">{user.username}</div>
                                   <div className="text-gray-500 text-[11px]">{user.nickname || '-'}</div>
                               </td>
                               <td className="border-r border-gray-200">{user.name}</td>
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
                 <Button variant="outline" className="h-8 px-3 text-[11px] bg-white border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 flex items-center gap-1">
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

    </div>
  );
}
