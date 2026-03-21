"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircle,
  Info,
} from "lucide-react";
import { getFaqsAction, deleteFaqsAction } from "@/actions/board-faq-actions";
import { toast } from "sonner";
import { format, subDays, subMonths, subYears } from "date-fns";
import { Link } from "@/i18n/routing";

export default function FAQManagementPage() {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [faqs, setFaqs] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  
  // Filters
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all"); // 'all', 'normal', 'best'
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [searchType, setSearchType] = useState("integrated");
  const [keyword, setKeyword] = useState("");
  
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  
  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const setDateRange = (range: 'today' | '7d' | '15d' | '1m' | '3m' | '1y') => {
      const end = new Date();
      let start = new Date();

      switch(range) {
          case 'today': start = end; break;
          case '7d': start = subDays(end, 7); break;
          case '15d': start = subDays(end, 15); break;
          case '1m': start = subMonths(end, 1); break;
          case '3m': start = subMonths(end, 3); break;
          case '1y': start = subYears(end, 1); break;
      }
      
      setStartDate(format(start, "yyyy-MM-dd"));
      setEndDate(format(end, "yyyy-MM-dd"));
  };

  const fetchFaqs = React.useCallback(async () => {
    setLoading(true);
    const res = await getFaqsAction({
        category: category,
        isBest: type === 'best',
        keyword,
        page,
        pageSize,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        searchType
    });

    if (res.success) {
        setFaqs(res.items || []);
        setTotal(res.total || 0);
    } else {
        toast.error("데이터를 불러오는데 실패했습니다.");
    }
    setLoading(false);
  }, [category, type, keyword, page, pageSize, startDate, endDate, searchType]);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const handleDelete = async () => {
    if (selectedIds.length === 0) return toast.error("선택된 항목이 없습니다.");
    if (!confirm("선택한 FAQ를 삭제하시겠습니까?")) return;

    const res = await deleteFaqsAction(selectedIds);
    if (res.success) {
        toast.success("삭제되었습니다.");
        setSelectedIds([]);
        fetchFaqs();
    } else {
        toast.error("삭제 실패");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
        setSelectedIds(faqs.map(f => f.id));
    } else {
        setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
      if (checked) setSelectedIds([...selectedIds, id]);
      else setSelectedIds(selectedIds.filter(i => i !== id));
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">FAQ 관리</h1>
          <span className="text-gray-500 text-sm font-normal">FAQ를 수정하고 관리합니다.</span>
        </div>
        <Link href="/admin/boards/faq/create">
            <Button className="h-10 px-8 text-base bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
            등록
            </Button>
        </Link>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-bold text-sm text-gray-800">FAQ 검색</h2>
          <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
          {/* Category */}
          <div className="flex border-b border-gray-200 min-h-[48px]">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              카테고리
            </div>
            <div className="flex-1 p-2 flex items-center px-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-48 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue placeholder="=전체=" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">=전체=</SelectItem>
                  <SelectItem value="register_info">회원가입/정보</SelectItem>
                  <SelectItem value="payment_delivery">결제/배송</SelectItem>
                  <SelectItem value="exchange_return">교환/반품/환불</SelectItem>
                  <SelectItem value="mileage">마일리지 적립</SelectItem>
                  <SelectItem value="etc">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Type */}
          <div className="flex border-b border-gray-200 min-h-[48px]">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              유형
            </div>
            <div className="flex-1 p-2 flex items-center gap-6 px-4">
               <RadioGroup value={type} onValueChange={setType} className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="all" id="type-all" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 text-red-500 focus:ring-red-500 w-4 h-4" />
                  <Label htmlFor="type-all" className="text-gray-700 cursor-pointer text-xs font-normal">전체</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="normal" id="type-normal" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 text-red-500 focus:ring-red-500 w-4 h-4" />
                  <Label htmlFor="type-normal" className="text-gray-700 cursor-pointer text-xs font-normal">일반</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="best" id="type-best" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 text-red-500 focus:ring-red-500 w-4 h-4" />
                  <Label htmlFor="type-best" className="text-gray-700 cursor-pointer text-xs font-normal">베스트</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Registration Date */}
          <div className="flex border-b border-gray-200 min-h-[48px]">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              등록일
            </div>
            <div className="flex-1 p-2 flex items-center gap-4 px-4">
               <div className="flex items-center">
                  {['오늘', '7일', '15일', '1개월', '3개월', '1년'].map((label, idx) => {
                      const ranges = ['today', '7d', '15d', '1m', '3m', '1y'] as const;
                      return (
                        <Button 
                            key={label}
                            variant="outline"
                            onClick={() => setDateRange(ranges[idx])}
                            className="h-8 px-3 text-xs border-gray-300 rounded-none first:rounded-l-[2px] last:rounded-r-[2px] -ml-[1px] first:ml-0 bg-[#F9F9F9] hover:bg-white text-gray-600 font-normal"
                        >
                            {label}
                        </Button>
                      );
                  })}
              </div>
              <div className="flex items-center gap-2">
                  <div className="relative">
                    <Input 
                      type="date"
                      className="w-32 h-8 text-xs border-gray-300 rounded-[2px] pr-2" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <span className="text-gray-400">~</span>
                  <div className="relative">
                   <Input 
                      type="date"
                      className="w-32 h-8 text-xs border-gray-300 rounded-[2px] pr-2" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex min-h-[48px]">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              검색
            </div>
            <div className="flex-1 p-2 flex items-center gap-1 px-4">
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-32 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue placeholder="=통합검색=" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="integrated">=통합검색=</SelectItem>
                  <SelectItem value="subject">제목</SelectItem>
                  <SelectItem value="content">내용</SelectItem>
                  <SelectItem value="answer">답변</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full max-w-sm h-8 text-xs border-gray-300 rounded-[2px]" 
                placeholder="검색어를 입력해주세요."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={() => { setPage(1); fetchFaqs(); }} className="h-10 px-12 text-sm bg-[#555555] hover:bg-[#444444] text-white rounded-[2px] font-bold border-0">
            검색
          </Button>
        </div>
      </div>

      {/* Results Controls */}
      <div className="mb-2">
        <div className="text-[11px] font-normal text-gray-500">
          검색 <span className="text-red-500 font-bold">{total}</span> / 전체 <span className="text-red-500 font-bold">{total}</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="border-t-2 border-gray-400 border-b border-gray-200 mb-4">
        <table className="w-full text-xs text-center border-collapse">
          <thead>
            <tr className="bg-[#B9B9B9] text-white h-10 border-b border-gray-300 font-normal text-[11px]">
              <th className="w-12 border-r border-gray-300">
                <Checkbox 
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-gray-400 w-3.5 h-3.5 rounded-[2px]" 
                    checked={faqs.length > 0 && selectedIds.length === faqs.length}
                    onCheckedChange={handleSelectAll}
                />
              </th>
              <th className="w-20 border-r border-gray-300 font-normal">번호</th>
              <th className="w-32 border-r border-gray-300 font-normal">카테고리</th>
              <th className="border-r border-gray-300 font-normal">제목</th>
              <th className="w-24 border-r border-gray-300 font-normal">유형</th>
              <th className="w-32 border-r border-gray-300 font-normal">등록일</th>
              <th className="w-24 font-normal">수정</th>
            </tr>
          </thead>
          <tbody>
             {loading ? (
                 <tr className="h-40"><td colSpan={7} className="text-gray-400">로딩중...</td></tr>
             ) : faqs.length === 0 ? (
                <tr className="h-40"><td colSpan={7} className="text-gray-400">FAQ가 없습니다.</td></tr>
             ) : (
                 faqs.map((faq, index) => (
                    <tr key={faq.id} className="h-10 border-b border-gray-200 hover:bg-gray-50">
                        <td className="border-r border-gray-200">
                            <Checkbox 
                                className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"
                                checked={selectedIds.includes(faq.id)}
                                onCheckedChange={(c) => handleSelectOne(faq.id, c as boolean)}
                            />
                        </td>
                        <td className="border-r border-gray-200">{total - ((page - 1) * pageSize) - index}</td>
                        <td className="border-r border-gray-200">{faq.category}</td>
                        <td className="border-r border-gray-200 text-left px-4">{faq.question}</td>
                        <td className="border-r border-gray-200">
                            {faq.isBest ? '베스트' : '일반'}
                        </td>
                        <td className="border-r border-gray-200">{format(new Date(faq.createdAt), 'yyyy-MM-dd')}</td>
                        <td>
                            <Button variant="outline" className="h-6 px-2 text-[10px] border-gray-300 font-normal">수정</Button>
                        </td>
                    </tr>
                 ))
             )}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      <div className="bg-[#FBFBFB] p-3 border border-gray-200 flex items-center gap-2 mb-8">
        <div className="text-xs font-bold text-gray-600 ml-1 flex items-center gap-1">
          <span className="text-red-500 font-bold">✓</span> 선택한 FAQ {selectedIds.length}개
        </div>
        <Button onClick={handleDelete} variant="outline" className="h-7 px-4 text-[11px] border-gray-300 rounded-[2px] bg-white hover:bg-gray-50 text-gray-700 font-normal">삭제</Button>
      </div>

      {/* Guide Section */}
      <div className="border-t border-gray-200 pt-12 text-gray-600 text-[11px]">
        <h3 className="font-bold flex items-center gap-1 mb-6 text-blue-500 text-[13px]">
          <Info className="w-4 h-4 ml-[-2px]" /> 안내
        </h3>
        <div className="space-y-4 mb-12 font-normal text-gray-500 leading-relaxed">
          <div>
            <h4 className="font-bold text-gray-700 mb-2">[FAQ 관리] FAQ가 무엇인가요?</h4>
            <div className="space-y-3.5 pl-1 pr-12">
              <p>· Frequently Asked Question의 약자로 쇼핑몰 이용자가 자주하는 질문에 대한 대답을 미리 작성하여 해결 방안을</p>
              <p className="ml-1">사전에 제공하는 것입니다. 이용자들은 1:1문의를 등록하기 전 FAQ를 통해 빠르게 문제를 처리할 수 있습니다.</p>
              <p>· 등록된 FAQ의 수가 많을수록 쇼핑몰 운영 리소스를 줄일 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-auto py-6 text-center text-[10px] text-gray-400 pt-12">
        © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
      </div>

          </div>
  );
}
