// src/app/[locale]/(site)/like/folders/page.tsx

"use client";

import React from "react";
import { Link } from "@/i18n/routing";

export default function MyFoldersPage() {
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
          <Link 
            href="/like/snaps"
            className="pb-3 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-[14px]"
          >
             스냅 <span className="ml-1 text-[11px]">0</span>
          </Link>
          <button className="pb-3 border-b-2 border-black text-black font-bold text-[14px]">
            내폴더 <span className="ml-1 text-[11px]">0</span>
          </button>
        </div>

        {/* ================= 3. Content Area ================= */}
        <div className="py-12 px-1">
          <div className="flex flex-col gap-4">
             {/* Square Folder Creation Box */}
             <div className="w-[240px] aspect-square bg-white border border-gray-200 rounded-[2px] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1} 
                    stroke="currentColor" 
                    className="w-10 h-10 text-gray-400"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
             </div>

             {/* Description */}
             <div>
                <p className="text-[14px] font-bold text-black mb-1">새폴더 만들기</p>
                <p className="text-[12px] text-gray-400">나만의 폴더를 만들어보세요</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
