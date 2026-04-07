"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AddressManagementPage() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedStatus = localStorage.getItem("demo_address_deleted");
    if (storedStatus === "true") {
      setIsDeleted(true);
    }
  }, []);

  const handleDelete = () => {
    if (window.confirm("정말 이 배송지를 삭제하시겠습니까?")) {
      setIsDeleted(true);
      localStorage.setItem("demo_address_deleted", "true");
    }
  };

  if (!isMounted) return null; // 하이드레이션 에러 방지

  return (
    <div className="bg-[#f8f9fa] flex justify-center min-h-screen">
      <div className="w-full max-w-[960px] bg-white relative shadow-sm flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#f8f9fa] border-b border-gray-100">
          <div className="flex items-center px-5 h-[60px]">
            <h1 className="text-[18px] font-bold text-black">배송지 관리</h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-5 py-6 bg-white">
          {/* Add Button */}
          <Link href="/settings/address/add" className="w-full py-3 border border-gray-200 rounded-[4px] text-[15px] font-medium text-black mb-8 flex items-center justify-center hover:bg-gray-50 transition-colors bg-white cursor-pointer">
            배송지 추가하기
          </Link>

          {/* Address List */}
          <div className="flex flex-col gap-6">
            {/* Address Item */}
            {!isDeleted ? (
              <div>
                {/* Name & Tags */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[16px] font-bold text-black">노*안</span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 bg-gray-100 text-[#666] text-[12px] rounded align-middle">기본 배송지</span>
                    <span className="px-1.5 py-0.5 bg-gray-100 text-[#666] text-[12px] rounded align-middle">최근 사용</span>
                  </div>
                </div>
                
                {/* Address Details */}
                <p className="text-[15px] text-black mb-1">
                  경기 시흥시 능곡중앙로 34 (휴먼시아) ********************
                </p>
                
                {/* Phone */}
                <p className="text-[15px] text-black mb-3.5">
                  010-****-3970
                </p>
                
                {/* Action Button */}
                <div className="flex gap-2">
                  <Link href="/settings/address/check-password" className="inline-block px-3.5 py-1.5 border border-gray-300 rounded-[4px] text-[13px] text-black hover:bg-gray-50 bg-white leading-none content-center">
                    수정
                  </Link>
                  <button onClick={handleDelete} className="inline-block px-3.5 py-1.5 border border-gray-300 rounded-[4px] text-[13px] text-black hover:bg-gray-50 bg-white leading-none">
                    삭제
                  </button>
                </div>
              </div>
            ) : (
               <div className="py-10 text-center text-gray-500 text-[14px]">
                 등록된 배송지가 없습니다.
               </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
