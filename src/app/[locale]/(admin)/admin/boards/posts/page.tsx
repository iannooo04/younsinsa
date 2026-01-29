"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  Info,
  FileSpreadsheet
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { getPostsAction, deletePostsAction } from "@/actions/board-post-actions";
import { toast } from "sonner";
import { format, subDays, subMonths, subYears } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@/i18n/routing";

export default function PostManagementPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostManagementContent />
    </Suspense>
  );
}

function PostManagementContent() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<{ id: string; subject: string; author: string; createdAt: Date | string; 
      views: number; answerStatus: string | null; boardName: string; isAnswered: boolean; }[]>([]);
  // const [boards, setBoards] = useState<{ id: string; name: string; boardId: string }[]>([]);
  const [total, setTotal] = useState(0);

  // Filters
  const searchParams = useSearchParams();
  const [boardId, setBoardId] = useState(searchParams.get("boardId") || "all");
  const [dateType, setDateType] = useState<"createdAt" | "updatedAt">("createdAt");
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [answerStatus, setAnswerStatus] = useState("all");
  const [searchType, setSearchType] = useState("subject");
  const [keyword, setKeyword] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [sortBy, setSortBy] = useState("num_desc");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("general");

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);



  // const fetchBoards = useCallback(async () => {
  //     const res = await getSimpleBoardListAction();
  //     if (res.success) setBoards(res.list || []);
  // }, []);
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await getPostsAction({
        page,
        pageSize: Number(pageSize),
        boardId: boardId === 'all' ? undefined : boardId,
        dateType,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        answerStatus: answerStatus === 'all' ? undefined : answerStatus,
        searchType: searchType as "subject" | "content" | "writer",
        keyword,
        sortBy: sortBy as "num_desc" | "num_asc" | "date_desc" | "date_asc"
    });

    if (res.success) {
        setPosts(res.items || []);
        setTotal(res.total || 0);
    } else {
        toast.error(res.error || "목록을 불러오는데 실패했습니다.");
    }
    setLoading(false);
  }, [page, pageSize, boardId, dateType, startDate, endDate, answerStatus, searchType, keyword, sortBy]);

  const setDateRange = (range: 'today' | '7d' | '15d' | '1m' | '3m' | '1y' | 'all') => {
      const end = new Date();
      let start = new Date();

      switch(range) {
          case 'today': start = end; break;
          case '7d': start = subDays(end, 7); break;
          case '15d': start = subDays(end, 15); break;
          case '1m': start = subMonths(end, 1); break;
          case '3m': start = subMonths(end, 3); break;
          case '1y': start = subYears(end, 1); break;
          case 'all': 
              setStartDate("");
              setEndDate("");
              return;
      }
      
      setStartDate(format(start, "yyyy-MM-dd"));
      setEndDate(format(end, "yyyy-MM-dd"));
  };

  useEffect(() => {
    // fetchBoards();
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async () => {
      if (selectedIds.length === 0) return toast.error("선택된 게시글이 없습니다.");
      if (!confirm("선택한 게시글을 삭제하시겠습니까?")) return;

      const res = await deletePostsAction(selectedIds);
      if (res.success) {
          toast.success("삭제되었습니다.");
          setSelectedIds([]);
          fetchPosts(); // Refresh
      } else {
          toast.error(res.error || "삭제 실패");
      }
  };

  const toggleSelect = (id: string) => {
      if (selectedIds.includes(id)) {
          setSelectedIds(selectedIds.filter(i => i !== id));
      } else {
          setSelectedIds([...selectedIds, id]);
      }
  };

  const toggleAll = () => {
      if (selectedIds.length === posts.length) {
          setSelectedIds([]);
      } else {
          setSelectedIds(posts.map(p => p.id));
      }
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">게시글 관리</h1>
          <span className="text-gray-500 text-sm">게시물을 수정하고 관리합니다.</span>
        </div>
        <Link href="/admin/boards/posts/create">
            <Button className="h-10 px-8 text-base bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
            등록
            </Button>
        </Link>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-bold text-sm text-gray-800">게시글 관리</h2>
          <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
          {/* Board & Prefix */}
          <div className="flex border-b border-gray-200">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              게시판
            </div>
            <div className="flex-1 p-2 flex items-center gap-1 border-r border-gray-200">
              <Select value={boardId} onValueChange={setBoardId}>
                <SelectTrigger className="w-64 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue placeholder="게시판 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">=전체 게시판=</SelectItem>
                  <SelectItem value="cooperation">광고 · 제휴게시판(cooperation)</SelectItem>
                  <SelectItem value="event">이벤트(event)</SelectItem>
                  <SelectItem value="notice">공지사항(notice)</SelectItem>
                  <SelectItem value="qa">1:1문의(qa)</SelectItem>
                  <SelectItem value="goodsqa">상품문의(goodsqa)</SelectItem>
                  <SelectItem value="goodsreview">상품후기(goodsreview)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              말머리
            </div>
            <div className="flex-1 p-2 flex items-center">
              <span className="text-gray-700 ml-2">-</span>
            </div>
          </div>

          {/* Date Selection */}
          <div className="flex border-b border-gray-200">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              일자
            </div>
            <div className="flex-1 p-2 flex items-center gap-4">
              <RadioGroup 
                defaultValue="createdAt" 
                value={dateType} 
                onValueChange={(val) => setDateType(val as "createdAt" | "updatedAt")}
                className="flex items-center gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="createdAt" id="r_createdAt" />
                  <Label htmlFor="r_createdAt" className="font-normal text-gray-600">등록일 기준</Label>
                </div>
                <div className="flex items-center space-x-2">
                   <RadioGroupItem value="updatedAt" id="r_updatedAt" />
                   <Label htmlFor="r_updatedAt" className="font-normal text-gray-600">수정일 기준</Label>
                </div>
              </RadioGroup>

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

              <div className="flex items-center gap-1 ml-1">
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

          {/* Answer Status */}
          <div className="flex border-b border-gray-200">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              답변상태
            </div>
            <div className="flex-1 p-2 flex items-center">
              <Select value={answerStatus} onValueChange={setAnswerStatus}>
                <SelectTrigger className="w-24 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">=전체=</SelectItem>
                  <SelectItem value="receipt">접수</SelectItem>
                  <SelectItem value="waiting">답변대기</SelectItem>
                  <SelectItem value="complete">답변완료</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Keyword */}
          <div className="flex">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              검색어
            </div>
            <div className="flex-1 p-2 flex items-center gap-1">
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-24 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue placeholder="제목" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subject">제목</SelectItem>
                  <SelectItem value="nickname">닉네임</SelectItem>
                  <SelectItem value="name">이름</SelectItem>
                  <SelectItem value="id">아이디</SelectItem>
                  <SelectItem value="content">내용</SelectItem>
                  <SelectItem value="subject_content">제목+내용</SelectItem>
                  <SelectItem value="product_name">상품명</SelectItem>
                  <SelectItem value="product_code">상품코드</SelectItem>
                  <SelectItem value="own_product_code">자체상품코드</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-64 h-8 text-xs border-gray-300 rounded-[2px]" 
                placeholder="검색어에 포함된 내용을 입력하세요." 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={() => { setPage(1); fetchPosts(); }} className="h-10 px-12 text-sm bg-[#555555] hover:bg-[#444444] text-white rounded-[2px] font-bold">
            검색
          </Button>
        </div>
      </div>

      {/* Tabs & List Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b border-gray-200 p-0 h-10 bg-transparent rounded-none mb-6">
          <TabsTrigger 
            value="general" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 text-gray-500 font-bold px-6 h-10 bg-transparent"
          >
            일반 게시물
          </TabsTrigger>
          <TabsTrigger 
            value="reported_posts" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 text-gray-500 font-bold px-6 h-10 bg-transparent"
          >
            신고 게시물
          </TabsTrigger>
          <TabsTrigger 
            value="reported_comments" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 text-gray-500 font-bold px-6 h-10 bg-transparent"
          >
            신고 댓글
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-0">
            {/* Top Stats & Excel */}
            <div className="flex items-center justify-between mb-4">
                <div className="text-[11px] font-normal text-gray-500">
                검색 <span className="text-red-500 font-bold">{total}</span>개 / 전체 <span className="text-red-500 font-bold">{total}</span>개
                </div>
                <Button variant="outline" className="h-7 px-3 text-[11px] border-gray-300 rounded-[2px] bg-white hover:bg-gray-50 text-gray-700 flex items-center gap-1">
                    <FileSpreadsheet className="w-3.5 h-3.5" /> 엑셀 다운로드
                </Button>
            </div>

            {/* List Controls Row */}
            <div className="bg-[#F9F9F9] p-2 border border-gray-200 flex items-center justify-between mb-0 border-b-0">
                <Button onClick={handleDelete} variant="outline" className="h-7 px-4 text-[11px] border-red-200 text-red-500 rounded-[2px] bg-red-50 hover:bg-red-100 font-normal">
                    선택 삭제
                </Button>
                
                <div className="flex items-center gap-1">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white rounded-[2px]">
                        <SelectValue placeholder="번호 내림차순" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="num_desc">번호 내림차순</SelectItem>
                        <SelectItem value="num_asc">번호 오름차순</SelectItem>
                        <SelectItem value="date_desc">최근 등록순</SelectItem>
                        <SelectItem value="date_asc">과거 등록순</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={pageSize} onValueChange={setPageSize}>
                        <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300 bg-white rounded-[2px]">
                        <SelectValue />
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

            {/* Table Section */}
            <div className="border border-gray-200 border-t-0 mb-4">
                <table className="w-full text-xs text-center border-collapse">
                <thead>
                    <tr className="bg-[#EFEFEF] text-gray-700 h-10 border-b border-gray-200 font-normal">
                    <th className="w-10 border-r border-gray-200">
                        <Checkbox 
                            className="border-gray-400 data-[state=checked]:bg-white data-[state=checked]:text-gray-600 w-3.5 h-3.5 rounded-[2px]" 
                            checked={posts.length > 0 && selectedIds.length === posts.length}
                            onCheckedChange={toggleAll}
                        />
                    </th>
                    <th className="w-16 border-r border-gray-200 font-normal text-gray-500">번호</th>
                    <th className="border-r border-gray-200 font-normal text-gray-500">제목</th>
                    <th className="w-24 border-r border-gray-200 font-normal text-gray-500">작성자</th>
                    <th className="w-24 border-r border-gray-200 font-normal text-gray-500">작성일</th>
                    <th className="w-16 border-r border-gray-200 font-normal text-gray-500">조회</th>
                    <th className="w-24 border-r border-gray-200 font-normal text-gray-500">답변상태</th>
                    <th className="w-24 border-r border-gray-200 font-normal text-gray-500">답변일</th>
                    <th className="w-24 font-normal text-gray-500">수정/답변</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr className="h-40">
                            <td colSpan={9} className="text-gray-400 text-sm">로딩중...</td>
                        </tr>
                    ) : posts.length === 0 ? (
                        <tr className="h-40">
                            <td colSpan={9} className="text-gray-400 text-sm">게시물이 없습니다.</td>
                        </tr>
                    ) : (
                        posts.map((post, index) => (
                            <tr key={post.id} className="h-10 border-b border-gray-200 hover:bg-gray-50">
                                <td className="border-r border-gray-200">
                                    <Checkbox 
                                        className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"
                                        checked={selectedIds.includes(post.id)}
                                        onCheckedChange={() => toggleSelect(post.id)}
                                    />
                                </td>
                                <td className="border-r border-gray-200 text-gray-500">{total - ((page - 1) * Number(pageSize)) - index}</td>
                                <td className="border-r border-gray-200 text-left px-3 text-gray-700">
                                    {post.subject}
                                </td>
                                <td className="border-r border-gray-200 text-gray-600">{post.author}</td>
                                <td className="border-r border-gray-200 text-gray-600">{format(new Date(post.createdAt), 'yyyy-MM-dd')}</td>
                                <td className="border-r border-gray-200 text-gray-600">{post.views}</td>
                                <td className="border-r border-gray-200 text-gray-600">
                                    {post.answerStatus === 'WAITING' ? '답변대기' : post.answerStatus === 'COMPLETE' ? '답변완료' : '-'}
                                </td>
                                <td className="border-r border-gray-200 text-gray-600">
                                    {/* Placeholder for Answer Date, likely would be updatedAt if status is COMPLETE, or separate field */}
                                    {post.answerStatus === 'COMPLETE' ? format(new Date(), 'yyyy-MM-dd') : '-'}
                                </td>
                                <td>
                                    <Button variant="outline" className="h-6 px-2 text-[10px] border-gray-300 leading-none bg-white text-gray-600 rounded-[2px]">
                                        수정/답변
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
                </table>
            </div>
        </TabsContent>
        <TabsContent value="reported_posts" className="mt-0">
             {/* Top Stats & Excel */}
            <div className="flex items-center justify-between mb-4">
                <div className="text-[11px] font-normal text-gray-500">
                검색 <span className="text-red-500 font-bold">0</span>개 / 전체 <span className="text-red-500 font-bold">0</span>개
                </div>
                <Button variant="outline" className="h-7 px-3 text-[11px] border-gray-300 rounded-[2px] bg-white hover:bg-gray-50 text-gray-700 flex items-center gap-1">
                    <FileSpreadsheet className="w-3.5 h-3.5" /> 엑셀 다운로드
                </Button>
            </div>

            {/* List Controls Row */}
            <div className="bg-[#F9F9F9] p-2 border border-gray-200 flex items-center justify-between mb-0 border-b-0">
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-7 px-4 text-[11px] border-red-200 text-red-500 rounded-[2px] bg-red-50 hover:bg-red-100 font-normal">
                        선택 삭제
                    </Button>
                    <Button className="h-7 px-4 text-[11px] border border-gray-700 text-white rounded-[2px] bg-[#444444] hover:bg-[#333333] font-normal">
                        신고해제
                    </Button>
                </div>
                
                <div className="flex items-center gap-1">
                     <Select value={pageSize} onValueChange={setPageSize}>
                        <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300 bg-white rounded-[2px]">
                        <SelectValue />
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

             {/* Table Section */}
            <div className="border border-gray-200 border-t-0 mb-4">
                <table className="w-full text-xs text-center border-collapse">
                <thead>
                    <tr className="bg-[#EFEFEF] text-gray-700 h-10 border-b border-gray-200 font-normal">
                    <th className="w-10 border-r border-gray-200">
                        <Checkbox className="border-gray-400 data-[state=checked]:bg-white data-[state=checked]:text-gray-600 w-3.5 h-3.5 rounded-[2px]" />
                    </th>
                    <th className="w-16 border-r border-gray-200 font-normal text-gray-500">번호</th>
                    <th className="border-r border-gray-200 font-normal text-gray-500">제목</th>
                    <th className="w-24 border-r border-gray-200 font-normal text-gray-500">신고일</th>
                    <th className="w-48 border-r border-gray-200 font-normal text-gray-500">신고내용</th>
                    <th className="w-24 font-normal text-gray-500">관리</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="h-40">
                        <td colSpan={6} className="text-gray-400 text-sm">게시물이 없습니다.</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </TabsContent>
        <TabsContent value="reported_comments" className="mt-0">
             {/* Top Stats & Excel */}
            <div className="flex items-center justify-between mb-4">
                <div className="text-[11px] font-normal text-gray-500">
                검색 <span className="text-red-500 font-bold">0</span>개 / 전체 <span className="text-red-500 font-bold">0</span>개
                </div>
                <Button variant="outline" className="h-7 px-3 text-[11px] border-gray-300 rounded-[2px] bg-white hover:bg-gray-50 text-gray-700 flex items-center gap-1">
                    <FileSpreadsheet className="w-3.5 h-3.5" /> 엑셀 다운로드
                </Button>
            </div>

            {/* List Controls Row */}
            <div className="bg-[#F9F9F9] p-2 border border-gray-200 flex items-center justify-between mb-0 border-b-0">
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-7 px-4 text-[11px] border-red-200 text-red-500 rounded-[2px] bg-red-50 hover:bg-red-100 font-normal">
                        선택 삭제
                    </Button>
                    <Button className="h-7 px-4 text-[11px] border border-gray-700 text-white rounded-[2px] bg-[#444444] hover:bg-[#333333] font-normal">
                        신고해제
                    </Button>
                </div>
                
                 <div className="flex items-center gap-1">
                     <Select value={pageSize} onValueChange={setPageSize}>
                        <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300 bg-white rounded-[2px]">
                        <SelectValue />
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

             {/* Table Section */}
            <div className="border border-gray-200 border-t-0 mb-4">
                <table className="w-full text-xs text-center border-collapse">
                <thead>
                    <tr className="bg-[#EFEFEF] text-gray-700 h-10 border-b border-gray-200 font-normal">
                    <th className="w-10 border-r border-gray-200">
                        <Checkbox className="border-gray-400 data-[state=checked]:bg-white data-[state=checked]:text-gray-600 w-3.5 h-3.5 rounded-[2px]" />
                    </th>
                    <th className="w-16 border-r border-gray-200 font-normal text-gray-500">번호</th>
                    <th className="border-r border-gray-200 font-normal text-gray-500">제목</th>
                    <th className="w-24 border-r border-gray-200 font-normal text-gray-500">신고일</th>
                    <th className="w-48 border-r border-gray-200 font-normal text-gray-500">신고내용</th>
                    <th className="w-24 font-normal text-gray-500">관리</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="h-40">
                        <td colSpan={6} className="text-gray-400 text-sm">게시물이 없습니다.</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </TabsContent>
      </Tabs>

      {(activeTab === 'reported_posts' || activeTab === 'reported_comments') && (
        <div className="text-red-500 text-[11px] mb-8">
            • 신고 된 게시물의 경우 PC 및 모바일쇼핑몰에서 노출되지 않으니 신속히 확인하시어 대응하는 것을 권장 드립니다.
        </div>
      )}

      {/* Guide Section */}
      <div className="border-t border-gray-200 pt-12 text-gray-600 text-[11px]">
        <h3 className="font-bold flex items-center gap-1 mb-6 text-blue-500 text-[13px]">
          <Info className="w-4 h-4 ml-[-2px]" /> 안내
        </h3>
        <div className="space-y-12 mb-12">
          <div>
            <h4 className="font-bold text-gray-700 mb-2">[게시글 관리] 게시글 이동은 어떻게 하나요?</h4>
            <ul className="list-none space-y-2 text-gray-500 pl-1 leading-relaxed">
              <li>· 이동할 게시글의 [수정] 버튼 클릭 후 게시판 이동의 체크박스에 체크한 뒤에 이동할 게시판을 선택하고 [저장] 버튼을 클릭하면 됩니다.</li>
              <li>· 이동할 게시글은 같은 유형의 게시판으로만 이동할 수 있습니다.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-700 mb-2">[게시글 관리] 1:1게시판이나 상품문의 게시판 답변상태는 어떻게 변경하나요?</h4>
            <ul className="list-none space-y-2 text-gray-500 pl-1 leading-relaxed">
              <li>· 1:1게시판 또는 상품문의 게시판에서 답변할 게시글의 [답변] 버튼을 클릭합니다.</li>
              <li>· 답변내용 입력 후 답변상태를 답변의 내용에 따라 "접수 / 답변대기 / 답변완료"로 변경할 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="pb-6 text-center text-[10px] text-gray-400 border-t border-gray-100 pt-6">
        © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
      </div>

      {/* Floating Actions */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
        <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
          <span className="text-[10px] font-bold"><Youtube size={16} /></span>
        </Button>
        <Button className="rounded-full w-10 h-10 bg-[#7B4DFF] hover:bg-[#7B4DFF]/90 shadow-lg text-white p-0 flex items-center justify-center border-0 text-[10px] leading-tight flex-col">
          <span className="block">따라</span>
          <span className="block">하기</span>
        </Button>
        <div className="flex flex-col gap-0 rounded-full bg-white shadow-lg overflow-hidden border border-gray-200">
          <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100 p-0">
            <ChevronUp className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0 rotate-180">
            <ChevronUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}


