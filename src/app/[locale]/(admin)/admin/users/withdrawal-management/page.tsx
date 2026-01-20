"use client";

import React, { useEffect, useState, useCallback } from "react";
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
  Info
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
    getWithdrawnUsersAction, 
    deleteWithdrawnUsersAction, 
    GetWithdrawnUsersParams,
    restoreWithdrawnUsersAction
} from "@/actions/user-actions";
import { format } from "date-fns";
import { Prisma } from "@/generated/prisma";

type WithdrawnUser = Prisma.UserGetPayload<{
    include: {
        info: true
    }
}>;

export default function WithdrawalMemberManagementPage() {
  const [, setLoading] = useState(false);
  const [users, setUsers] = useState<WithdrawnUser[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  const [searchParams, setSearchParams] = useState<GetWithdrawnUsersParams>({
      page: 1,
      limit: 10,
      mallId: 'all',
      keyword: '',
      withdrawalType: 'all',
      canRejoin: 'all',
      startDate: format(new Date(new Date().setMonth(new Date().getMonth() - 1)), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
  });

  const handleSearch = useCallback(async (page = 1) => {
      setLoading(true);
      const params = { ...searchParams, page };
      const res = await getWithdrawnUsersAction(params);
      if (res.success) {
          // Type assertion might be needed if action return type isn't perfectly inferable as WithdrawnUser[]
          // but based on include in action it should be compatible.
          setUsers(res.items as WithdrawnUser[] || []);
          setTotal(res.total || 0);
          setSearchParams(curr => ({ ...curr, page }));
          setSelectedIds([]);
      } else {
          toast.error(res.error || "검색에 실패했습니다.");
      }
      setLoading(false);
  }, [searchParams]);

  useEffect(() => {
      handleSearch();
  }, [handleSearch]);

  const handleDelete = async () => {
      if (selectedIds.length === 0) {
          toast.error("선택된 회원이 없습니다.");
          return;
      }
      if (!confirm(`선택한 ${selectedIds.length}명의 회원 정보를 영구 삭제하시겠습니까?\n삭제된 정보는 복구할 수 없습니다.`)) return;

      const res = await deleteWithdrawnUsersAction(selectedIds);
      if (res.success) {
          toast.success("삭제되었습니다.");
          handleSearch(searchParams.page);
      } else {
           toast.error(res.error || "삭제에 실패했습니다.");
      }
  };

  // Optional: Restore functionality (hidden in current UI requirement but good to have prepared or hidden)
  const handleRestore = async () => {
       if (selectedIds.length === 0) return;
       if (!confirm("선택한 회원의 탈퇴 처리를 취소하고 복구하시겠습니까?")) return;
       
       const res = await restoreWithdrawnUsersAction(selectedIds);
       if (res.success) {
           toast.success("복구되었습니다.");
           handleSearch(searchParams.page);
       } else {
           toast.error(res.error || "복구에 실패했습니다.");
       }
  };

  const toggleSelectAll = (checked: boolean) => {
      if (checked) setSelectedIds(users.map(u => u.id));
      else setSelectedIds([]);
  };

  const toggleSelectOne = (id: string, checked: boolean) => {
      if (checked) setSelectedIds(prev => [...prev, id]);
      else setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const handleParamChange = (field: keyof GetWithdrawnUsersParams, value: string | number) => {
      setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">회원 탈퇴 / 삭제 관리</h1>
      </div>

      {/* Search Section */}
      <div className="mb-0">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">탈퇴내역 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
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

            {/* ID */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    아이디
                </div>
                <div className="flex-1 p-3 flex items-center gap-1">
                    <Input 
                        className="w-full h-7 text-xs border-gray-300" 
                        placeholder="검색어 전체를 정확히 입력하세요." 
                        value={searchParams.keyword}
                        onChange={(e) => handleParamChange('keyword', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(1)}
                    />
                </div>
            </div>

             {/* Withdrawal Date */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    탈퇴일
                </div>
                <div className="flex-1 p-3">
                     <div className="flex items-center gap-2">
                         <div className="relative">
                             <Input 
                                className="w-32 h-7 text-xs border-gray-300 pr-8" 
                                value={searchParams.startDate || ''}
                                onChange={(e) => handleParamChange('startDate', e.target.value)}
                                type="date"
                             />
                         </div>
                         <span className="text-gray-400">~</span>
                         <div className="relative">
                             <Input 
                                className="w-32 h-7 text-xs border-gray-300 pr-8" 
                                value={searchParams.endDate || ''}
                                onChange={(e) => handleParamChange('endDate', e.target.value)}
                                type="date"
                             />
                         </div>
                     </div>
                </div>
            </div>

            {/* Withdrawal Type & Rejoin */}
             <div className="flex border-b border-gray-200">
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    탈퇴유형
                </div>
                <div className="flex-1 p-3 border-r border-gray-200">
                     <RadioGroup 
                        value={searchParams.withdrawalType}
                        onValueChange={(v) => handleParamChange('withdrawalType', v)}
                        className="flex items-center gap-6"
                    >
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="type-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="type-all" className="text-gray-600 font-normal cursor-pointer text-xs">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="admin" id="type-admin" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="type-admin" className="text-gray-600 font-normal cursor-pointer text-xs">관리자삭제</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="user" id="type-user" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="type-user" className="text-gray-600 font-normal cursor-pointer text-xs">본인탈퇴</Label>
                        </div>
                    </RadioGroup>
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    재가입여부
                </div>
                <div className="flex-1 p-3">
                     <RadioGroup 
                        value={searchParams.canRejoin}
                        onValueChange={(v) => handleParamChange('canRejoin', v)}
                        className="flex items-center gap-6"
                    >
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="rejoin-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="rejoin-all" className="text-gray-600 font-normal cursor-pointer text-xs">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="possible" id="rejoin-possible" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="rejoin-possible" className="text-gray-600 font-normal cursor-pointer text-xs">가능</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="impossible" id="rejoin-impossible" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="rejoin-impossible" className="text-gray-600 font-normal cursor-pointer text-xs">불가능</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
        
         <div className="flex justify-center mt-6 mb-8">
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
               <div className="flex items-center gap-1">
                    <Select defaultValue="date_desc">
                        <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="탈퇴일 ↓" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date_desc">탈퇴일 ↓</SelectItem>
                            <SelectItem value="date_asc">탈퇴일 ↑</SelectItem>
                        </SelectContent>
                    </Select>
                   <Select 
                        value={String(searchParams.limit)}
                        onValueChange={(v) => {
                             handleParamChange('limit', Number(v));
                             handleSearch(1);
                        }}
                    >
                        <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="10개 보기" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10개 보기</SelectItem>
                            <SelectItem value="20">20개 보기</SelectItem>
                            <SelectItem value="50">50개 보기</SelectItem>
                        </SelectContent>
                    </Select>
               </div>
           </div>
           
           <div className="border-t-2 border-gray-400 border-b border-gray-200 min-h-[100px] mb-4">
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
                             <th className="w-32 border-r border-gray-300">상점 구분</th>
                             <th className="border-r border-gray-300">아이디</th>
                             <th className="w-24 border-r border-gray-300">탈퇴유형</th>
                             <th className="w-32 border-r border-gray-300">탈퇴일</th>
                             <th className="w-24 border-r border-gray-300">재가입여부</th>
                             <th className="w-24 border-r border-gray-300">탈퇴처리 IP</th>
                             <th className="w-24 border-r border-gray-300">처리자</th>
                             <th className="w-24">상세정보</th>
                         </tr>
                     </thead>
                     <tbody>
                         {users.length === 0 ? (
                             <tr className="h-14">
                                 <td colSpan={10} className="text-center text-gray-500">검색된 정보가 없습니다.</td>
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
                                     <td className="border-r border-gray-200 font-bold text-gray-800">{user.username}</td>
                                     <td className="border-r border-gray-200">
                                         {user.info?.withdrawalType === 'admin' ? '관리자삭제' : '본인탈퇴'}
                                     </td>
                                     <td className="border-r border-gray-200">
                                         {user.info?.withdrawalDate ? format(new Date(user.info.withdrawalDate), "yyyy-MM-dd HH:mm") : '-'}
                                     </td>
                                     <td className="border-r border-gray-200">
                                         {user.info?.canRejoin ? '가능' : '불가능'}
                                     </td>
                                     <td className="border-r border-gray-200">
                                         {user.info?.withdrawalIp || '-'}
                                     </td>
                                     <td className="border-r border-gray-200">
                                         {user.info?.processor || '-'}
                                     </td>
                                     <td>
                                         <Button variant="outline" className="h-6 px-2 text-[11px] border-gray-300">보기</Button>
                                     </td>
                                 </tr>
                             ))
                         )}
                     </tbody>
                </table>
           </div>

           {/* Footer Action */}
           <div className="bg-[#FBFBFB] p-3 flex justify-start gap-1 border border-gray-200 mb-12">
                  <Button onClick={handleDelete} variant="secondary" className="h-7 px-3 text-[11px] bg-white border border-gray-300 text-gray-600 rounded-[2px] hover:bg-gray-50">
                      선택 삭제
                  </Button>
                  {selectedIds.length > 0 && (
                      <Button onClick={handleRestore} variant="secondary" className="h-7 px-3 text-[11px] bg-blue-50 border border-blue-300 text-blue-600 rounded-[2px] hover:bg-blue-100">
                          선택 복구
                      </Button>
                  )}
           </div>
       </div>
       
        <hr className="border-gray-200 mb-6" />

      {/* Guide Info */}
       <div className="text-gray-600 text-xs">
          <h3 className="font-bold flex items-center gap-1 mb-2 text-blue-500 text-[13px]">
              <Info className="w-4 h-4" /> 안내
          </h3>
          <div className="space-y-4">
              <div>
                  <h4 className="font-bold text-gray-700 text-xs mb-1">탈퇴한 회원의 개인정보는 모두 삭제 되나요?</h4>
                   <ul className="list-none space-y-1 text-gray-500">
                    <li>· 개인정보 보호법 제 21조(개인정보 파기)에 의거하여 회원 정보는 탈퇴 후 5일 이내 자동 파기됩니다.</li>
                    <li>· 단, 재가입 기간을 제한한 상정의 경우 다음의 정보에 대해서는 명시한 기간 동안 보존합니다.</li>
                    <li className="pl-2">- 보존사유 : 쇼핑몰의 부정/불량 이용자의 재가입 방지를 위함</li>
                    <li className="pl-2">- 보존항목 : 쇼핑몰 탈퇴 회원의 아이디</li>
                    <li className="pl-2">- 보존기간 : 회원 가입 정책 관리 &gt; 탈퇴/재가입 설정에서 설정한 재가입 제한 기간 (최대 1년)</li>
                     <li>· 탈퇴 회원 정보를 삭제하는 경우 해당 정보는 그 즉시 삭제 됩니다.</li>
                  </ul>
              </div>
          </div>
      </div>
       
        {/* Floating Actions */}
        <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
            <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                <span className="text-[10px] font-bold">삭제</span>
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
