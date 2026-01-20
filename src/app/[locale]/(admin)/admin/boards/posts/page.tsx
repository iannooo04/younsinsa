"use client";

import React from "react";
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
import { getPostsAction, deletePostsAction, getSimpleBoardListAction } from "@/actions/board-post-actions";
import { toast } from "sonner";
import { format } from "date-fns";
import { Link } from "@/i18n/routing";

export default function PostManagementPage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<{ id: string; subject: string; author: string; createdAt: Date | string; 
      views: number; answerStatus: string | null; boardName: string; isAnswered: boolean; }[]>([]);
  const [boards, setBoards] = useState<{ id: string; name: string; boardId: string }[]>([]);
  const [total, setTotal] = useState(0);
  
  // Filters
  const [boardId, setBoardId] = useState("all");
  const [startDate, setStartDate] = useState(format(new Date(new Date().setMonth(new Date().getMonth() - 1)), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [answerStatus, setAnswerStatus] = useState("all");
  const [searchType, setSearchType] = useState("subject");
  const [keyword, setKeyword] = useState("");
  const [pageSize, setPageSize] = useState("10");
  const [page, setPage] = useState(1);

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);



  const fetchBoards = useCallback(async () => {
      const res = await getSimpleBoardListAction();
      if (res.success) setBoards(res.list || []);
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await getPostsAction({
        page,
        pageSize: Number(pageSize),
        boardId: boardId === 'all' ? undefined : boardId,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        answerStatus: answerStatus === 'all' ? undefined : answerStatus,
        searchType: searchType as "subject" | "content" | "writer",
        keyword
    });

    if (res.success) {
        setPosts(res.items || []);
        setTotal(res.total || 0);
    } else {
        toast.error(res.error || "목록을 불러오는데 실패했습니다.");
    }
    setLoading(false);
  }, [page, pageSize, boardId, startDate, endDate, answerStatus, searchType, keyword]);

  useEffect(() => {
    fetchBoards();
    fetchPosts();
  }, [fetchBoards, fetchPosts]);

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
                  {boards.map(b => (
                      <SelectItem key={b.id} value={b.id}>{b.name} ({b.boardId})</SelectItem>
                  ))}
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
            <div className="flex-1 p-2 flex items-center gap-1">
              <Select defaultValue="reg_date">
                <SelectTrigger className="w-24 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reg_date">등록일</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="WAITING">답변대기</SelectItem>
                  <SelectItem value="COMPLETE">답변완료</SelectItem>
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
                  <SelectItem value="content">내용</SelectItem>
                  <SelectItem value="writer">작성자</SelectItem>
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

      {/* Results Controls */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] font-normal text-gray-500">
          검색 <span className="text-red-500 font-bold">{total}</span>개/ 전체 <span className="text-red-500 font-bold">{total}</span>개
        </div>
        <div className="flex items-center gap-1">
            <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="w-28 h-8 text-[11px] border-gray-300 bg-white rounded-[2px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10개 보기</SelectItem>
              <SelectItem value="20">20개 보기</SelectItem>
              <SelectItem value="50">50개 보기</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Section */}
      <div className="border-t-2 border-gray-400 border-b border-gray-200 mb-4">
        <table className="w-full text-xs text-center border-collapse">
          <thead>
            <tr className="bg-[#B9B9B9] text-white h-10 border-b border-gray-300 font-normal">
              <th className="w-12 border-r border-gray-300">
                <Checkbox 
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-gray-400 w-3.5 h-3.5 rounded-[2px]" 
                    checked={posts.length > 0 && selectedIds.length === posts.length}
                    onCheckedChange={toggleAll}
                />
              </th>
              <th className="w-16 border-r border-gray-300 font-normal">번호</th>
              <th className="border-r border-gray-300 font-normal">제목</th>
              <th className="w-24 border-r border-gray-300 font-normal">작성자</th>
              <th className="w-32 border-r border-gray-300 font-normal">작성일</th>
              <th className="w-16 border-r border-gray-300 font-normal">조회</th>
              <th className="w-24 border-r border-gray-300 font-normal">답변상태</th>
              <th className="w-32 border-r border-gray-300 font-normal">게시판</th>
              <th className="w-24 font-normal">관리</th>
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
                        <td className="border-r border-gray-200">{total - ((page - 1) * Number(pageSize)) - index}</td>
                        <td className="border-r border-gray-200 text-left px-2">
                            {post.subject}
                        </td>
                        <td className="border-r border-gray-200">{post.author}</td>
                        <td className="border-r border-gray-200">{format(new Date(post.createdAt), 'yyyy-MM-dd')}</td>
                        <td className="border-r border-gray-200">{post.views}</td>
                        <td className="border-r border-gray-200">
                            {post.answerStatus === 'WAITING' ? '답변대기' : post.answerStatus === 'COMPLETE' ? '답변완료' : '-'}
                        </td>
                        <td className="border-r border-gray-200">{post.boardName}</td>
                        <td>
                            <Button variant="outline" className="h-6 px-2 text-[10px] border-gray-300 leading-none">관리</Button>
                        </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions & Excel */}
      <div className="bg-[#F9F9F9] p-3 border border-gray-200 flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="text-xs font-bold text-gray-600 ml-1 flex items-center gap-1">
            <span className="text-red-500 font-bold">✓</span> 선택한 게시글 {selectedIds.length}개
          </div>
          <Button onClick={handleDelete} variant="outline" className="h-7 px-4 text-[11px] border-gray-300 rounded-[2px] bg-white hover:bg-gray-50 text-gray-700">삭제</Button>
        </div>
        <Button variant="outline" className="h-7 px-3 text-[11px] border-gray-300 rounded-[2px] bg-white hover:bg-gray-50 text-[#1D6F42] flex items-center gap-1">
          <FileSpreadsheet className="w-3.5 h-3.5" /> 엑셀다운로드
        </Button>
      </div>

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


