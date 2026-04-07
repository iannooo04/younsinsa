"use client";

import React, { useState, useEffect } from "react";

export default function RefundAccountPage() {
  const [account, setAccount] = useState<{
    bank: string;
    accountNumber: string;
    holder: string;
  } | null>({
    bank: "신한은행",
    accountNumber: "110-123-456789",
    holder: "노*안",
  });
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const deleted = localStorage.getItem("demo_refund_account_deleted");
    if (deleted === "true") {
      setAccount(null);
    }
  }, []);

  const handleDelete = () => {
    if (window.confirm("정말 이 환불 계좌를 삭제하시겠습니까?")) {
      setAccount(null);
      localStorage.setItem("demo_refund_account_deleted", "true");
    }
  };

  if (!isMounted) return null;

  return (
    <div className="bg-[#f8f9fa] flex justify-center min-h-screen">
      <div className="w-full max-w-[960px] bg-white relative shadow-sm flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#f8f9fa] border-b border-gray-100">
          <div className="flex items-center px-5 h-[60px]">
            <h1 className="text-[18px] font-bold text-black">환불 계좌 관리</h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-5 py-6 bg-white">
          {!account ? (
             <div className="flex flex-col items-center justify-center py-20 border border-gray-100 rounded-[8px]">
               <div className="mb-4 text-gray-300">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                 </svg>
               </div>
               <p className="text-[15px] text-gray-500 mb-6">등록된 환불 계좌가 없습니다.</p>
               <button 
                 onClick={() => {
                     setAccount({ bank: "국민은행", accountNumber: "123456-01-123456", holder: "노*안" });
                     localStorage.removeItem("demo_refund_account_deleted");
                 }}
                 className="px-6 py-3 bg-black text-white rounded-[4px] text-[14px] font-bold hover:bg-black/90 transition-colors"
               >
                 계좌 등록하기
               </button>
             </div>
          ) : (
             <div className="flex flex-col border border-gray-100 rounded-[8px] p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                   <div className="flex items-center gap-2">
                     <span className="text-[16px] text-black font-bold">기본 환불계좌</span>
                     <span className="px-1.5 py-0.5 bg-gray-100 text-[#666] text-[12px] rounded align-middle">등록됨</span>
                   </div>
                   <button onClick={handleDelete} className="text-[13px] text-gray-400 hover:text-[#ff4e50] transition-colors underline">삭제</button>
                </div>

                <div>
                   <p className="text-[13px] text-gray-500 mb-1">은행</p>
                   <p className="text-[16px] text-black font-medium mb-4">{account.bank}</p>
                   
                   <p className="text-[13px] text-gray-500 mb-1">계좌번호</p>
                   <p className="text-[16px] text-black font-medium mb-4">{account.accountNumber}</p>
                   
                   <p className="text-[13px] text-gray-500 mb-1">예금주</p>
                   <p className="text-[16px] text-black font-medium">{account.holder}</p>
                </div>

                {/* Edit Button */}
                <div className="mt-6 pt-4 border-t border-gray-50">
                  <button onClick={() => alert('계좌 수정 기능')} className="w-full py-3.5 border border-gray-300 rounded-[4px] text-[14px] font-medium text-black hover:bg-gray-50 bg-white transition-colors">
                    계좌 정보 수정
                  </button>
                </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}
