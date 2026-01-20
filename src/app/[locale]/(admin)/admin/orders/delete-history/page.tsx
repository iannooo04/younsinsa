"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import { 
    createOrderDeleteRequestAction, 
    getOrderDeleteRequestsAction, 
    executeOrderDeleteAction 
} from "@/actions/order-actions";
import { format } from "date-fns";

interface OrderDeleteRequest {
    id: string;
    totalCount: number;
    createdAt: Date;
    createdBy: string | null;
    deletedAt: Date | null;
    processedBy: string | null;
    status: string;
}

export default function OrderDeleteHistoryPage() {
  const [requests, setRequests] = useState<OrderDeleteRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [page] = useState(1);
  const [limit] = useState(20);

  const fetchRequests = React.useCallback(async () => {
      setLoading(true);
      try {
          const res = await getOrderDeleteRequestsAction({ page, limit });
          if (res.success) {
              setRequests(res.items || []);
              setTotal(res.total || 0);
          }
      } catch (e) {
          console.error(e);
      }
      setLoading(false);
  }, [page, limit]);

  useEffect(() => {
      fetchRequests();
  }, [fetchRequests]);

  const handleCreateRequest = () => {
      if (!confirm("5년 이상 경과된 주문 내역을 삭제 대상으로 생성하시겠습니까?")) return;

      startTransition(async () => {
          const res = await createOrderDeleteRequestAction();
          if (res.success) {
              alert(`${res.count}건의 삭제 대상 주문이 생성되었습니다.`);
              fetchRequests();
          } else {
              alert(res.error || "요청 생성 실패");
          }
      });
  };

  const handleExecuteDelete = (id: string) => {
      if (!confirm("정말로 해당 주문 내역들을 영구 삭제하시겠습니까?\n삭제 후에는 복구가 불가능합니다.")) return;

      startTransition(async () => {
          const res = await executeOrderDeleteAction(id);
          if (res.success) {
              alert("삭제가 완료되었습니다.");
              fetchRequests();
          } else {
              alert(res.error || "삭제 처리 실패");
          }
      });
  };

  const getStatusLabel = (status: string) => {
      switch (status) {
          case "PENDING": return <span className="text-blue-600 font-bold">대기중</span>;
          case "COMPLETED": return <span className="text-gray-500">완료</span>;
          case "EXPIRED": return <span className="text-red-500">만료</span>;
          default: return status;
      }
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-end gap-2 pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">주문 내역 삭제</h1>
        <span className="text-gray-500 mb-1">5년 이상 경과한 주문서를 삭제, 관리할 수 있습니다.</span>
      </div>

      {/* Info Box */}
      <div className="border border-gray-400 p-5 mb-8 text-gray-600 bg-white">
          <h3 className="font-bold text-gray-800 text-sm mb-3">주문 내역 삭제란?</h3>
          <div className="space-y-1 leading-relaxed">
              <p>전자상거래 등에서의 소비자 보호 법률에 따라, 주문 발생 후 거래 기록에 대해 자신의 정보처리시스템을 통하여 처리한 범위 내에서 최대 5년 까지 개인정보를 보유할 수 있으며, 목적 달성 및 보유기간이 지난 개인정보에 대해서는 지체없이 개인정보를 복구 · 재생할 수 없도록 파기 해야 합니다.</p>
              <p>해당 법령을 준수하지 않을 경우 2년 이하의 징역 또는 2천만원 이하의 벌금에 처할 수 있으므로 개인정보 보호 의무에 따라 5년 이상된 주문 내역에 대해 지속적인 운영 관리 하실 것을 권장합니다. <span className="text-gray-400 cursor-pointer">내용확인{'>'}</span></p>
              <p className="text-red-500 font-normal mt-2">삭제한 주문 내역에 대해서는 복원 및 복구가 절대 불가하며, 삭제 후 엑셀다운로드 또한 불가하므로 삭제 시 유의하시기 바랍니다.</p>
          </div>
      </div>

      {/* Search Section */}
      <div className="border-t-2 border-gray-500 border-b border-gray-200 mb-8 border-l border-r">
        {/* Search Header */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-[#FBFBFB]">
           <h2 className="font-bold text-gray-700">삭제 대상 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="p-0">
            {/* Store Selection */}
            <div className="flex items-center text-xs border-b border-gray-200 h-10">
                <div className="w-36 bg-[#FBFBFB] pl-4 font-bold text-gray-700 flex items-center h-full border-r border-gray-200">
                    상점
                </div>
                <div className="flex-1 pl-4 flex items-center gap-4 h-full">
                     <RadioGroup defaultValue="kr" className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="kr" id="store-kr" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="store-kr" className="text-gray-700 font-normal cursor-pointer flex items-center gap-1">
                                    <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[8px] bg-white">🇰🇷</span>
                                    기준몰
                                </Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="cn" id="store-cn" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="store-cn" className="text-gray-700 font-normal cursor-pointer flex items-center gap-1">
                                    <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[8px] bg-red-600 text-white">🇨🇳</span>
                                    중문몰
                                </Label>
                            </div>
                        </RadioGroup>
                </div>
            </div>

            {/* Exception Supplier */}
            <div className="flex items-center text-xs h-10">
                <div className="w-36 bg-[#FBFBFB] pl-4 font-bold text-gray-700 flex items-center h-full border-r border-gray-200">
                    예외 공급사 <HelpCircle className="w-3.5 h-3.5 text-gray-400 ml-1" />
                </div>
                <div className="flex-1 pl-4 flex items-center h-full">
                        <Button variant="secondary" className="h-6 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm px-2">
                            공급사 선택
                        </Button>
                </div>
            </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="mb-10 text-center">
            <div className="flex justify-start text-gray-400 text-[11px] mb-1 gap-1">
                <span className="flex items-center justify-center w-3 h-3 bg-gray-500 text-white font-bold rounded-[2px] text-[9px]">!</span>
                삭제 주문 내역 생성 요청 후 24시간 이내 삭제 대상 내역이 생성됩니다.
            </div>
            <div className="flex justify-start text-gray-400 text-[11px] mb-4 gap-1">
                <span className="flex items-center justify-center w-3 h-3 bg-gray-500 text-white font-bold rounded-[2px] text-[9px]">!</span>
                주문삭제대상 검색은 '주문번호'를 기준으로 진행되므로 삭제 대상에서 제외한 공급사의 주문도 삭제될 수 있습니다.
            </div>
          <Button 
            className="bg-[#555555] hover:bg-[#444444] text-white font-bold h-9 px-6 rounded-sm text-xs"
            onClick={handleCreateRequest}
            disabled={isPending}
          >
              {isPending ? "생성 중..." : "삭제 주문 내역 생성"}
          </Button>
      </div>

       {/* List Header */}
      <div className="flex items-center gap-1 mb-2">
           <h3 className="text-sm font-bold text-gray-800">삭제 대상 내역</h3>
           <span className="bg-[#FF424D] text-white text-[10px] w-3.5 h-3.5 flex items-center justify-center rounded-[2px] font-bold">!</span>
           <span className="text-[#FF424D] text-xs">생성된 삭제 주문 내역은 24시간 내에만 삭제가 가능합니다</span>
           <HelpCircle className="w-4 h-4 text-gray-400 ml-1" />
      </div>

      {/* Table */}
      <div className="border border-gray-300 mb-12 overflow-hidden">
          <table className="w-full text-xs text-center border-collapse table-fixed">
              <colgroup>
                  <col className="w-16" />
                  <col className="w-32" />
                  <col className="w-40" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-48" />
              </colgroup>
              <thead className="bg-[#BDBDBD] text-white font-normal">
                  <tr className="h-8">
                      <th className="border-r border-[#CDCDCD] font-normal">번호</th>
                      <th className="border-r border-[#CDCDCD] font-normal">삭제주문건수</th>
                      <th className="border-r border-[#CDCDCD] font-normal">생성일시</th>
                      <th className="border-r border-[#CDCDCD] font-normal">생성자</th>
                      <th className="border-r border-[#CDCDCD] font-normal">삭제일시</th>
                      <th className="border-r border-[#CDCDCD] font-normal">처리자</th>
                      <th className="border-r border-[#CDCDCD] font-normal">처리상태</th>
                      <th className="font-normal">처리</th>
                  </tr>
              </thead>
              <tbody className="text-gray-600 bg-white">
                  {loading ? (
                    <tr>
                        <td colSpan={8} className="py-12 border-b border-gray-200 text-center text-xs text-gray-400">
                            로딩중...
                        </td>
                    </tr>
                  ) : requests.length === 0 ? (
                      <tr>
                          <td colSpan={8} className="py-12 border-b border-gray-200 text-center text-xs text-gray-400">
                              생성된 삭제 주문 내역이 없습니다.
                          </td>
                      </tr>
                  ) : (
                      requests.map((req, idx) => (
                          <tr key={req.id} className="border-b border-gray-200 h-8 hover:bg-gray-50">
                              <td className="border-r border-[#CDCDCD]">{total - idx}</td>
                              <td className="border-r border-[#CDCDCD]">{req.totalCount}</td>
                              <td className="border-r border-[#CDCDCD]">{format(new Date(req.createdAt), "yyyy-MM-dd HH:mm")}</td>
                              <td className="border-r border-[#CDCDCD]">{req.createdBy || '-'}</td>
                              <td className="border-r border-[#CDCDCD]">{req.deletedAt ? format(new Date(req.deletedAt), "yyyy-MM-dd HH:mm") : '-'}</td>
                              <td className="border-r border-[#CDCDCD]">{req.processedBy || '-'}</td>
                              <td className="border-r border-[#CDCDCD]">{getStatusLabel(req.status)}</td>
                              <td>
                                  {req.status === "PENDING" && (
                                     <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="h-6 text-[10px] px-2 py-0 border-red-500 text-red-500 hover:bg-red-50"
                                        onClick={() => handleExecuteDelete(req.id)}
                                     >
                                         삭제실행
                                     </Button>
                                  )}
                              </td>
                          </tr>
                      ))
                  )}
              </tbody>
          </table>
      </div>
      
       <div className="border-b border-gray-400 mb-10"></div>


      {/* Guide Section */}
       <div className="space-y-8 text-gray-600">
           <div>
              <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs mb-3">
                 <BookOpen className="w-4 h-4" /> 
                 <span>안내</span>
              </div>
              <div className="space-y-6">
                  <div>
                       <h3 className="font-bold text-gray-700 mb-2 text-xs">주문정보 삭제 요청 시 바로 삭제되나요?</h3>
                       <div className="pl-0 text-xs text-gray-500 space-y-2 leading-relaxed">
                           <p>· 주문 데이터 삭제의 경우 요청 즉시 삭제하는 것이 아닌 시스템 내부적으로 설정된 특정 시점에 진행됩니다.</p>
                           <p>· 이는 대용량 데이터 처리나 기타 부하 이슈 방지 등 시스템의 안정을 위함이 오니</p>
                           <p className="pl-1">거래기록 보유 기간을 초과하여 삭제되지 않도록 미리 삭제요청을 진행하시는 것을 권장드립니다.</p>
                       </div>
                  </div>

                  <div>
                       <h3 className="font-bold text-gray-700 mb-2 text-xs">[주문정보] 외부연동 된 주문이 삭제된 경우 어떻게 되나요?</h3>
                       <div className="pl-0 text-xs text-gray-500 space-y-2 leading-relaxed">
                           <p>· 관리자 내 주문 내역이 삭제된 외부 연동 주문건의 경우, 외부 채널(네이버페이 주문형 등)에서 주문 내역 변경에 대해 데이터 전송되어도</p>
                           <p>이미 삭제된 주문건은 주문내역이 재생성 되지 않으며, 상태 변경 또한 반영되지 않습니다.</p>
                           <p>삭제된 주문내역은 복구 및 확인이 불가하므로 처리가 완료된 주문 건에 대해서만 삭제하실 것을 권고드립니다.</p>
                       </div>
                  </div>
                  
                  <div>
                       <h3 className="font-bold text-gray-700 mb-2 text-xs">[주문정보] 주문 내역 삭제 시 작성된 상품 후기는 어떻게 되나요?</h3>
                       <div className="pl-0 text-xs text-gray-500 space-y-2 leading-relaxed">
                           <p>· 주문 내역 삭제 전 작성 된 상품후기는 주문 내역이 삭제되어도 유지되어 쇼핑몰에 노출 됩니다. (단, 주문번호 및 주문자 정보 등은 노출되지 않을 수 있습니다.)</p>
                           <p>· 네이버페이 주문형 구매평의 경우 주문 내역 삭제 전 작성된 구매평은 유지되며, 신규 작성 및 수정은 불가하오니 유의하시기 바랍니다.</p>
                       </div>
                  </div>
              </div>
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

    </div>
  );
}
