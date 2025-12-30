// src/components/layout/SearchPopup.tsx
"use client";

import React from "react";

interface SearchPopupProps {
  onClose: () => void;
}

export default function SearchPopup({ onClose }: SearchPopupProps) {
  // 1. 최근 검색어 데이터
  const recentSearches = ["패딩", "나시", "난시"];

  // 2. 인기 검색어 데이터 (1~10위)
  const popularSearches = [
    { rank: 1, keyword: "니트", status: "-" },
    { rank: 2, keyword: "패딩", status: "-" },
    { rank: 3, keyword: "후드티", status: "-" },
    { rank: 4, keyword: "무스탕", status: "-" },
    { rank: 5, keyword: "코트", status: "-" },
    { rank: 6, keyword: "맨투맨", status: "-" },
    { rank: 7, keyword: "경량패딩", status: "-" },
    { rank: 8, keyword: "이미리 스탠다드", status: "-" },
    { rank: 9, keyword: "어그", status: "up" },
    { rank: 10, keyword: "목도리", status: "up" },
  ];

  // 3. 급상승 검색어 데이터 (1~10위)
  const risingSearches = [
    { rank: 1, keyword: "토마스모어" },
    { rank: 2, keyword: "호카" },
    { rank: 3, keyword: "뮬" },
    { rank: 4, keyword: "와이드 슬랙스" },
    { rank: 5, keyword: "스트라이프 셔츠" },
    { rank: 6, keyword: "기모 바지" },
    { rank: 7, keyword: "벤투스" },
    { rank: 8, keyword: "무탠다드 경량패딩" },
    { rank: 9, keyword: "어그부츠" },
    { rank: 10, keyword: "니트패딩" },
  ];

  // 랭킹 아이콘 렌더링 헬퍼
  const renderStatus = (status?: string) => {
    if (status === "up")
      return <span className="text-red-500 text-[10px]">▲</span>;
    if (status === "down")
      return <span className="text-blue-500 text-[10px]">▼</span>;
    return <span className="text-gray-300 text-[10px]">-</span>;
  };

  return (
    // 전체 화면을 덮는 오버레이 (z-50)
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-start">
      {/* 🛠️ [수정] 검색창 컨테이너
          - bg-white -> bg-[#F9F9F9] (연한 회색 배경으로 변경)
          - top-0 absolute: 화면 최상단에 고정
          - w-full: 가로 꽉 채움
      */}
      <div className="absolute top-0 left-0 w-full bg-[#F9F9F9] shadow-xl overflow-hidden pb-10">
        {/* 상단 검색바 영역 */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200 gap-4 max-w-7xl mx-auto w-full">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="flex-1 text-lg font-bold placeholder-gray-400 outline-none h-10 bg-transparent"
            autoFocus
          />
          {/* 검색 아이콘 (장식용) */}
          <button className="text-gray-400 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="text-black hover:bg-gray-200 rounded-full p-1 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 컨텐츠 영역 (가운데 정렬을 위해 max-w-7xl mx-auto 추가) */}
        <div className="max-w-7xl mx-auto w-full px-8 py-6 flex flex-col gap-10 h-[600px] overflow-y-auto scrollbar-hide">
          {/* 1. 최근 검색어 */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-black">최근 검색어</h3>
              <button className="text-xs text-gray-400 underline hover:text-black">
                모두삭제
              </button>
            </div>
            <div className="flex gap-2">
              {recentSearches.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md bg-white hover:bg-gray-50 cursor-pointer shadow-sm"
                >
                  <span className="text-sm text-gray-600">{item}</span>
                  <button className="text-gray-300 hover:text-black ml-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 2. 인기 검색어 */}
          <div>
            <div className="flex justify-between items-end mb-4 border-b border-transparent">
              <h3 className="text-sm font-bold text-black">인기 검색어</h3>
              <span className="text-xs text-gray-400">12.24 21:20, 기준</span>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              {/* 왼쪽 컬럼 (1~5위) */}
              <div className="flex flex-col gap-3">
                {popularSearches.slice(0, 5).map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-blue-600 w-3">
                        {item.rank}
                      </span>
                      <span className="text-sm text-gray-700 group-hover:underline group-hover:text-black">
                        {item.keyword}
                      </span>
                    </div>
                    {renderStatus(item.status)}
                  </div>
                ))}
              </div>
              {/* 오른쪽 컬럼 (6~10위) */}
              <div className="flex flex-col gap-3">
                {popularSearches.slice(5, 10).map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-gray-800 w-3">
                        {item.rank}
                      </span>
                      <span className="text-sm text-gray-700 group-hover:underline group-hover:text-black">
                        {item.keyword}
                      </span>
                    </div>
                    {renderStatus(item.status)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. 급상승 검색어 */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-sm font-bold text-black">급상승 검색어</h3>
              <span className="text-xs text-gray-400">12.24 21:20, 기준</span>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              {/* 왼쪽 컬럼 (1~5위) */}
              <div className="flex flex-col gap-3">
                {risingSearches.slice(0, 5).map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-blue-600 w-3">
                        {item.rank}
                      </span>
                      <span className="text-sm text-gray-700 group-hover:underline group-hover:text-black">
                        {item.keyword}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* 오른쪽 컬럼 (6~10위) */}
              <div className="flex flex-col gap-3">
                {risingSearches.slice(5, 10).map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-gray-800 w-3">
                        {item.rank}
                      </span>
                      <span className="text-sm text-gray-700 group-hover:underline group-hover:text-black">
                        {item.keyword}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
