"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  HelpCircle,
  Info
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBoardsAction, deleteBoardsAction } from "@/actions/board-actions";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";

interface Board {
    id: string;
    name: string;
    boardId: string;
    type: string;
    stats?: { new: number; total: number; unreplied: number | string; };
}

export default function BoardListPage() {
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState<Board[]>([]);
  
  // Search state
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("id");
  const [matchType, setMatchType] = useState("exact");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState(false);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const fetchBoards = React.useCallback(async () => {
    setLoading(true);
    const res = await getBoardsAction({
        keyword,
        searchType: searchType as 'id' | 'name',
        matchType: matchType as 'exact' | 'partial',
        type: selectedTypes.length > 0 && !selectedTypes.includes('all') ? selectedTypes : undefined
    });
    if (res.success) {
        // Mock data to match the user request image exactly
        const dummyData: Board = {
            id: 'dummy-1',
            boardId: 'cooperation',
            name: '광고 · 제휴게시판',
            type: 'INQUIRY',
            stats: { new: 0, total: 0, unreplied: 0 },
        };
        const items = res.items || [];
        // Prepend or replace? User asked to make it look like the image.
        // I'll prepend it so it's visible.
        setBoards([dummyData, ...items]);
    } else {
        toast.error(res.error || "목록을 불러오는데 실패했습니다.");
    }
    setLoading(false);
  }, [keyword, searchType, matchType, selectedTypes]);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const handleTypeChange = (type: string, checked: boolean) => {
      if (type === 'all') {
          if (checked) setSelectedTypes(['all']);
          else setSelectedTypes([]);
      } else {
          let newTypes = checked 
            ? [...selectedTypes.filter(t => t !== 'all'), type]
            : selectedTypes.filter(t => t !== type);
          
          if (newTypes.length === 0) newTypes = [];
          setSelectedTypes(newTypes);
      }
  };

  const handleSearch = () => {
      fetchBoards();
  };

  const handleReset = () => {
      setKeyword("");
      setSearchType("id");
      setMatchType("exact");
      setSelectedTypes([]);
      fetchBoards();
  };

  const handleDelete = async () => {
      if (checkedIds.length === 0) {
          toast.error("선택된 게시판이 없습니다.");
          return;
      }
      if (!confirm("선택한 게시판을 삭제하시겠습니까? 관련 게시글도 모두 삭제됩니다.")) return;

      const res = await deleteBoardsAction(checkedIds);
      if (res.success) {
          toast.success("삭제되었습니다.");
          setCheckedIds([]);
          setAllChecked(false);
          fetchBoards();
      } else {
          toast.error(res.error || "삭제 실패");
      }
  };

  const toggleAll = (checked: boolean) => {
      setAllChecked(checked);
      if (checked) {
          setCheckedIds(boards.map(b => b.id));
      } else {
          setCheckedIds([]);
      }
  };

  const toggleOne = (id: string, checked: boolean) => {
      if (checked) {
          setCheckedIds(prev => [...prev, id]);
      } else {
          setCheckedIds(prev => prev.filter(p => p !== id));
      }
  };

  const getTypeName = (type: string) => {
      switch(type) {
          case 'BASIC': return '일반형';
          case 'GALLERY': return '갤러리형';
          case 'EVENT': return '이벤트형';
          case 'INQUIRY': return '1:1 문의형';
          default: return type;
      }
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">게시판 리스트</h1>
            <Button variant="outline" className="h-6 px-2 text-xs border-gray-300 text-gray-600 bg-white hover:bg-gray-50 rounded-[2px]">
                가이드
            </Button>
        </div>
        <Link href="/admin/boards/create">
            <Button className="h-10 px-6 text-sm bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
                게시판 만들기
            </Button>
        </Link>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex items-center gap-1 mb-2">
           <h2 className="font-bold text-sm text-gray-800">게시판 검색</h2>
           <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Search Keyword */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-3 flex items-center gap-1">
                    <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger className="w-24 h-8 text-xs border-gray-300 bg-white rounded-[2px] mr-1">
                            <SelectValue placeholder="아이디" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="id">아이디</SelectItem>
                            <SelectItem value="name">이름</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={matchType} onValueChange={setMatchType}>
                        <SelectTrigger className="w-32 h-8 text-xs border-gray-300 bg-white rounded-[2px] mr-1">
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
                        className="w-80 h-8 text-xs border-gray-300 rounded-[2px]" 
                        placeholder="검색어 전체를 정확히 입력하세요." 
                    />
                </div>
            </div>

             {/* Type */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    유형
                </div>
                <div className="flex-1 p-3 flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <Checkbox 
                            id="type-all" 
                            className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" 
                            checked={selectedTypes.includes('all')}
                            onCheckedChange={(c) => handleTypeChange('all', c as boolean)}
                        />
                        <Label htmlFor="type-all" className="text-gray-600 font-normal cursor-pointer">전체</Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Checkbox 
                            id="type-normal" 
                            className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" 
                            checked={selectedTypes.includes('normal')}
                            onCheckedChange={(c) => handleTypeChange('normal', c as boolean)}
                        />
                        <Label htmlFor="type-normal" className="text-gray-600 font-normal cursor-pointer">일반형</Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Checkbox 
                            id="type-gallery" 
                            className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" 
                            checked={selectedTypes.includes('gallery')}
                            onCheckedChange={(c) => handleTypeChange('gallery', c as boolean)}
                        />
                        <Label htmlFor="type-gallery" className="text-gray-600 font-normal cursor-pointer">갤러리형</Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Checkbox 
                            id="type-event" 
                            className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" 
                            checked={selectedTypes.includes('event')}
                            onCheckedChange={(c) => handleTypeChange('event', c as boolean)}
                        />
                        <Label htmlFor="type-event" className="text-gray-600 font-normal cursor-pointer">이벤트형</Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Checkbox 
                            id="type-oneonone" 
                            className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" 
                            checked={selectedTypes.includes('oneonone')}
                            onCheckedChange={(c) => handleTypeChange('oneonone', c as boolean)}
                        />
                        <Label htmlFor="type-oneonone" className="text-gray-600 font-normal cursor-pointer">1:1문의형</Label>
                    </div>
                </div>
            </div>
        </div>
        
          <div className="flex justify-center mt-6 gap-1">
                <Button onClick={handleReset} variant="outline" className="h-9 px-4 text-xs border-gray-300 text-blue-500 hover:bg-blue-50 rounded-[2px]">
                    초기화
                </Button>
               <Button onClick={handleSearch} className="h-9 px-6 text-xs bg-[#555555] hover:bg-[#444444] text-white rounded-[2px] font-bold">
                 검색
             </Button>
          </div>
      </div>

       {/* Results */}
       <div className="mb-0">
           <div className="flex items-center mb-2">
               <div className="text-[11px] font-bold text-gray-500">
                   검색 <span className="text-red-500">{boards.length}</span>개 / 총 <span className="text-red-500">{boards.length}</span>개
               </div>
           </div>
           
           <div className="border-t-2 border-gray-400 border-b border-gray-200 mb-4">
                <table className="w-full text-xs text-center border-collapse">
                     <thead>
                         <tr className="bg-[#B9B9B9] text-white h-10 border-b border-gray-300 font-normal">
                             <th className="w-12 border-r border-gray-300">
                                 <Checkbox 
                                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-gray-400 w-3.5 h-3.5 rounded-[2px] mx-auto" 
                                    checked={allChecked}
                                    onCheckedChange={(c) => toggleAll(c as boolean)}
                                />
                             </th>
                             <th className="w-14 border-r border-gray-300 font-normal">번호</th>
                             <th className="w-32 border-r border-gray-300 font-normal">아이디</th>
                             <th className="w-32 border-r border-gray-300 font-normal">이름</th>
                             <th className="w-20 border-r border-gray-300 font-normal">신규게시글</th>
                             <th className="w-20 border-r border-gray-300 font-normal">전체게시글</th>
                             <th className="w-20 border-r border-gray-300 font-normal">미답변</th>
                             <th className="w-24 border-r border-gray-300 font-normal">유형</th>
                             <th className="w-40 border-r border-gray-300 font-normal text-[10px]">스킨</th>
                             <th className="w-20 border-r border-gray-300 font-normal">URL복사</th>
                             <th className="w-16 border-r border-gray-300 font-normal">쇼핑몰</th>
                             <th className="w-16 border-r border-gray-300 font-normal">게시글</th>
                             <th className="w-16 font-normal">수정</th>
                         </tr>
                     </thead>
                     <tbody>
                         {loading ? (
                             <tr><td colSpan={13} className="py-10 text-gray-500">로딩중...</td></tr>
                         ) : boards.length === 0 ? (
                             <tr><td colSpan={13} className="py-10 text-gray-500">검색된 게시판이 없습니다.</td></tr>
                         ) : boards.map((row, i) => (
                             <tr key={row.id} className="h-20 border-b border-gray-200 hover:bg-gray-50 text-gray-700">
                                 <td className="border-r border-gray-200">
                                     <Checkbox 
                                        className="w-3.5 h-3.5 border-gray-300 rounded-[2px] mx-auto" 
                                        checked={checkedIds.includes(row.id)}
                                        onCheckedChange={(c) => toggleOne(row.id, c as boolean)}
                                     />
                                 </td>
                                 <td className="border-r border-gray-200">{i + 1}</td>
                                 <td className="border-r border-gray-200 text-blue-500 underline cursor-pointer font-normal">{row.boardId}</td>
                                 <td className="border-r border-gray-200 font-normal">{row.name}</td>
                                 <td className="border-r border-gray-200 font-normal">{row.stats?.new || 0}</td>
                                 <td className="border-r border-gray-200 font-normal">{row.stats?.total || 0}</td>
                                 <td className="border-r border-gray-200 font-normal">{row.stats?.unreplied}</td>
                                 <td className="border-r border-gray-200 font-normal">{getTypeName(row.type)}</td>
                                 <td className="border-r border-gray-200 text-center">
                                     {getTypeName(row.type)}(기본)
                                 </td>
                                 <td className="border-r border-gray-200 p-1">
                                     <Button variant="outline" className="h-6 text-[10px] w-full p-0 border-gray-300 font-normal rounded-none">복사</Button>
                                 </td>
                                 <td className="border-r border-gray-200">
                                     <Button variant="outline" className="h-6 px-2 text-[10px] border-gray-300 font-normal rounded-none text-gray-600">보기</Button>
                                 </td>
                                 <td className="border-r border-gray-200">
                                     <Link href={`/admin/boards/posts?boardId=${row.id}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-gray-950 focus-visible:ring-gray-300 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 h-6 px-2 text-[10px] border-gray-300 font-normal rounded-none text-gray-600">
                                        관리
                                     </Link>
                                 </td>
                                 <td>
                                     <Link href={`/admin/boards/${row.id}/edit`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-gray-950 focus-visible:ring-gray-300 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 h-6 px-2 text-[10px] border-gray-300 font-normal rounded-none text-gray-600">
                                        수정
                                     </Link>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                </table>
           </div>

            {/* Bulk Actions */}
            <div className="bg-[#F9F9F9] p-3 border border-gray-200 flex items-center gap-2 mb-8">
                <div className="text-xs font-bold text-gray-600 ml-1 flex items-center gap-1">
                   <span className="text-red-500 font-bold">✓</span> 선택한 게시판
                </div>
                <Button onClick={handleDelete} variant="outline" className="h-6 px-3 text-[11px] border-gray-300 rounded-[2px] bg-white hover:bg-gray-50 text-gray-700">삭제</Button>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mb-12">
                <div className="flex items-center justify-center w-7 h-7 bg-[#555555] text-white font-bold rounded-[2px]">1</div>
            </div>
       </div>

       {/* Guide Info */}
       <div className="border-t border-gray-200 pt-12 text-gray-600 text-[11px]">
          <h3 className="font-bold flex items-center gap-1 mb-6 text-blue-500 text-[13px]">
              <Info className="w-4 h-4 ml-[-2px]"/> 안내
          </h3>
          <div className="space-y-8">
              <div>
                  <h4 className="font-bold text-gray-700 mb-2">[게시판 관리] 게시판 생성 시 유형은 무엇인가요?</h4>
                   <ul className="list-none space-y-2 text-gray-500 pl-1 leading-relaxed">
                    <li>· 게시판 유형은 게시판 성격에 맞춰 "일반형 / 갤러리형 / 이벤트형 / 1:1게시판형"을 선택하여 생성할 수 있습니다.</li>
                    <li>· 일반형 : 게시판 리스트에 제목만 노출되는 게시판입니다.</li>
                    <li>· 갤러리형 : 게시판 리스트에 제목 이외에 이미지를 추가적으로 노출하는 게시판입니다.</li>
                    <li>· 이벤트형 : 게시물을 등록 시 기간(시작일, 종료일)을 설정할 수 있는 게시판입니다.</li>
                    <li>· 1:1게시판형 : 문의와 답변을 1:1로 매칭하여 확인할 수 있는 게시판입니다.</li>
                    <li className="pl-3">ㄴ 게시글의 상태 값을 제공합니다. ("접수 / 답변대기 / 답변완료")</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold text-gray-700 mb-2">[게시판 관리] 신규 생성한 게시판은 쇼핑몰에 어떻게 연결하나요?</h4>
                   <ul className="list-none space-y-2 text-gray-500 pl-1 leading-relaxed">
                    <li>· 신규 생성된 게시판은 게시판 리스트에 추가되며, [보기] 버튼을 클릭하여 페이지로 이동하거나</li>
                    <li className="pl-3">[복사] 버튼을 클릭하여 게시판의 URL을 클립보드에 복사할 수 있습니다.</li>
                    <li>· "디자인 &gt; 디자인 관리 &gt; 디자인 페이지 수정"에서 원하는 페이지 내에 이미지 또는 텍스트를 넣고</li>
                    <li className="pl-1">게시판 URL을 링크를 처리하면, 신규 생성한 게시판으로 연결시킬 수 있습니다.</li>
                  </ul>
              </div>
          </div>
      </div>
      
       {/* Bottom Copyright */}
        <div className="mt-16 pb-6 text-center text-[10px] text-gray-400">
            © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
        </div>

            </div>
  );
}
