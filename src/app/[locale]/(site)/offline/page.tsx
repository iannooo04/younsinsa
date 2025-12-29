// src/app/[locale]/(site)/offline/page.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";

// ----------------------------------------------------------------------
// 1. 더미 데이터 (스크린샷 기반)
// ----------------------------------------------------------------------
const TABS = [
  "전체",
  "무신사 스토어",
  "무신사 스탠다드",
  "29CM",
  "무신사 엠프티",
  "무신사 스페이스",
  "아즈니섬",
  "무신사 테라스",
];

const STORES = [
  {
    id: 1,
    name: "무신사 스토어 성수",
    address: "서울 성동구 성수동2가 322-13 1F",
  },
  {
    id: 2,
    name: "무신사 스토어 홍대",
    address: "서울 마포구 양화로 164 (유림빌딩) B1F-3F",
  },
  {
    id: 3,
    name: "무신사 스토어 대구",
    address: "대구 중구 동성로6길 12-13 1F-3F",
  },
  {
    id: 4,
    name: "무신사 스토어 강남",
    address: "서울 서초구 강남대로 441 (서산빌딩) B1F-2F",
  },
  {
    id: 5,
    name: "무신사 걸즈 타임스퀘어 영등포점",
    address: "서울 영등포구 영중로 15 (타임스퀘어) 3F",
  },
  {
    id: 6,
    name: "무신사 메가스토어 용산",
    address: "서울 용산구 한강대로23길 55 (용산역) 아이파크몰 패션파크 2F",
  },
  {
    id: 7,
    name: "무신사 킥스 홍대(26.01.09 오픈 예정)",
    address: "서울 마포구 양화로 164 (유림빌딩) B1F-3F", // 주소는 예시로 홍대와 동일하게 설정
  },
];

// ----------------------------------------------------------------------
// 2. 컴포넌트
// ----------------------------------------------------------------------
export default function OfflineStorePage() {
  const [activeTab, setActiveTab] = useState("전체");

  return (
    // 전체 배경색 연한 회색
    <div className="min-h-screen bg-[#F5F5F5] flex justify-center pb-20">
      {/* 🛠️ [수정] max-w-[960px] -> max-w-[640px]
         컨텐츠 폭을 줄여서 좌우 회색 여백을 더 많이 확보함
      */}
      <div className="w-full max-w-[640px] bg-white relative shadow-sm">
        {/* ================= Header ================= */}
        <header className="px-5 py-4 flex items-center justify-between sticky top-0 bg-white z-50">
          <h1 className="text-[18px] font-bold text-black">오프라인 스토어</h1>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S12 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </button>
        </header>

        {/* ================= Tabs ================= */}
        <div className="border-b border-gray-100">
          <div className="flex overflow-x-auto scrollbar-hide px-4">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-1 py-3 mr-5 text-[14px] font-medium border-b-[2px] transition-colors ${
                  activeTab === tab
                    ? "border-black text-black font-bold"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ================= Filter Bar ================= */}
        <div className="bg-[#F9F9F9] px-5 py-3 flex items-center justify-between text-[12px] text-gray-500">
          <span>63개 스토어</span>
          <button className="flex items-center gap-1 cursor-pointer">
            <span className="text-gray-600">전국</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>

        {/* ================= Content Area ================= */}
        <div className="px-5 pt-6">
          {/* Banner */}
          <div className="w-full bg-[#F5F5F5] rounded-lg p-4 mb-8 flex items-center justify-between cursor-pointer hover:bg-gray-200 transition-colors">
            <div className="flex items-center gap-3">
              {/* 로고 박스 */}
              <div className="w-10 h-10 bg-[#333333] rounded-md flex flex-col items-center justify-center text-white">
                <span className="text-[8px] font-light leading-none mb-0.5">
                  musinsa
                </span>
                <span className="text-[8px] font-bold leading-none">
                  standard
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-black">
                  무신사 스탠다드
                </span>
                <span className="text-[12px] text-gray-500">
                  오프라인 크루 채용 공고
                </span>
              </div>
            </div>
            {/* Arrow Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#999"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>

          {/* Store List */}
          <div className="flex flex-col">
            {STORES.map((store) => (
              <div
                key={store.id}
                className="py-6 border-b border-gray-100 last:border-0 cursor-pointer"
              >
                <h3 className="text-[15px] font-bold text-black mb-1.5">
                  {store.name}
                </h3>
                <p className="text-[13px] text-gray-500 font-light">
                  {store.address}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= Floating Share Button ================= */}
        <div className="fixed bottom-8 left-8 z-50">
          <button className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
