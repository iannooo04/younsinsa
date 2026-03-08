// src/app/[locale]/(site)/like/snaps/page.tsx

"use client";

import React from "react";
import { Link } from "@/i18n/routing";

export default function LikeSnapsPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="w-full px-4 pt-4">
        {/* ================= 1. Title ================= */}
        <h1 className="text-[18px] font-bold text-black mb-6">좋아요</h1>

        {/* ================= 2. Tabs ================= */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-0 relative z-20 bg-white">
          <Link 
            href="/like/goods"
            className="pb-3 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-[14px]"
          >
            상품 <span className="ml-1 text-[11px]">4</span>
          </Link>
          <Link 
            href="/like/brands"
            className="pb-3 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-[14px]"
          >
            브랜드 <span className="ml-1 text-[11px]">13</span>
          </Link>
          <button className="pb-3 border-b-2 border-black text-black font-bold text-[14px]">
            스냅 <span className="ml-1 text-[11px]">0</span>
          </button>
          <Link 
            href="/like/folders"
            className="pb-3 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-[14px]"
          >
            내폴더 <span className="ml-1 text-[11px]">0</span>
          </Link>
        </div>

        {/* ================= 3. Empty State ================= */}
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <p className="text-[16px] font-bold text-black mb-2">좋아요한 스냅이 없습니다.</p>
          <p className="text-[13px] text-gray-400 mb-6">관심 있는 스냅을 모아보세요.</p>
          <button className="px-6 py-2.5 border border-gray-200 text-[13px] font-bold text-black rounded-sm hover:bg-gray-50 transition-colors">
            스냅 보러가기
          </button>
        </div>
      </div>
    </div>
  );
}
