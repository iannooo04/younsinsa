// src/app/[locale]/(site)/like/goods/page.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ----------------------------------------------------------------------
// 1. 더미 데이터
// ----------------------------------------------------------------------
const LIKED_ITEMS = [
  {
    id: 1,
    brand: "노매뉴얼",
    name: "COWICHAN HOODED ZIP-UP - BLACK",
    price: 125600,
    originalPrice: 157000,
    discount: 20,
    likes: "4.6천",
    rating: 4.8,
    reviews: 138,
    image:
      "https://image.msscdn.net/images/goods_img/20230823/3476831/3476831_16927598863674_500.jpg",
    badges: [],
  },
  {
    id: 2,
    brand: "폴로 랄프 로렌",
    name: "[적립금 7%] 케이블니트 코튼 스웨터 - 네이비",
    price: 259000,
    originalPrice: 0,
    discount: 0,
    likes: "7.9천",
    rating: 4.9,
    reviews: "1천+",
    image:
      "https://image.msscdn.net/images/goods_img/20230906/3534597/3534597_16939634720973_500.jpg",
    badges: ["무배", "내일(월) 도착보장"],
  },
  {
    id: 3,
    brand: "본투원",
    name: "BRN ECLIPSE SEAMLESS HALF ZIP UP LONG SLEEVE [BLACK]",
    price: 105000,
    originalPrice: 0,
    discount: 0,
    likes: 352,
    rating: 4.8,
    reviews: 19,
    image:
      "https://image.msscdn.net/images/goods_img/20230906/3534608/3534608_16939639735998_500.jpg",
    badges: [],
  },
];

// ----------------------------------------------------------------------
// 2. 메인 페이지 컴포넌트
// ----------------------------------------------------------------------
export default function LikeGoodsPage() {
  // 토글 상태 관리
  const [isSaleOnly, setIsSaleOnly] = useState(false);
  const [isSellingOnly, setIsSellingOnly] = useState(false);

  // 숫자 포맷터
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 🛠️ [수정] pt-10 -> pt-4 로 변경하여 상단 여백 축소 */}
      <div className="w-full px-4 pt-4">
        {/* ================= 1. Title ================= */}
        <h1 className="text-[18px] font-bold text-black mb-6">좋아요</h1>

        {/* ================= 2. Tabs ================= */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-0 relative z-20 bg-white">
          <button className="pb-3 border-b-2 border-black text-black font-bold text-[14px]">
            상품 <span className="ml-1">3</span>
          </button>
          <button className="pb-3 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-[14px]">
            브랜드 <span className="ml-1">13</span>
          </button>
          <button className="pb-3 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-[14px]">
            스냅 <span className="ml-1">0</span>
          </button>
          <button className="pb-3 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-[14px]">
            내폴더 <span className="ml-1">0</span>
          </button>
        </div>

        {/* ================= 3. Sub Categories (Grey Box) ================= */}
        <div className="-mx-4 bg-[#F3F3F3] py-3 px-4 flex items-center gap-4 mt-0">
          <button className="text-[12px] font-bold text-black">전체</button>
          <div className="w-[1px] h-[10px] bg-gray-300"></div>
          <button className="text-[12px] text-gray-500 hover:text-black">
            상의
          </button>
          <div className="w-[1px] h-[10px] bg-gray-300"></div>
          <button className="text-[12px] text-gray-500 hover:text-black">
            스포츠/레저
          </button>
        </div>

        {/* ================= 4. Controls (Toggles & Sort) ================= */}
        <div className="flex justify-between items-center py-4 mb-6">
          <div className="flex items-center gap-4">
            {/* 세일중 토글 */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsSaleOnly(!isSaleOnly)}
            >
              <div
                className={`w-9 h-5 rounded-full relative transition-colors ${
                  isSaleOnly ? "bg-black" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    isSaleOnly ? "left-[18px]" : "left-0.5"
                  }`}
                ></div>
              </div>
              <span className="text-[12px] text-gray-600">세일중</span>
            </div>

            {/* 판매 중 상품만 보기 토글 */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsSellingOnly(!isSellingOnly)}
            >
              <div
                className={`w-9 h-5 rounded-full relative transition-colors ${
                  isSellingOnly ? "bg-black" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    isSellingOnly ? "left-[18px]" : "left-0.5"
                  }`}
                ></div>
              </div>
              <span className="text-[12px] text-gray-600">
                판매 중 상품만 보기
              </span>
            </div>
          </div>

          {/* 정렬 Dropdown */}
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-[12px] text-black">담은순</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>

        {/* ================= 5. Product Grid ================= */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-2 gap-y-10">
          {LIKED_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col group cursor-pointer relative"
            >
              {/* 이미지 영역 */}
              <div className="relative w-full aspect-[3/4] mb-3 bg-gray-100 overflow-hidden rounded-[4px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* 하트 아이콘 (Active: Red) */}
                <div className="absolute bottom-2 right-2 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-red-600 drop-shadow-sm"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                </div>
              </div>

              {/* 브랜드 */}
              <p className="text-[11px] font-bold text-black mb-1.5 truncate">
                {item.brand}
              </p>

              {/* 상품명 */}
              <p className="text-[12px] text-black font-medium leading-tight mb-2 line-clamp-2 h-[34px] break-all">
                {item.name}
              </p>

              {/* 가격 정보 */}
              <div className="mb-2">
                {item.discount > 0 ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-bold text-red-600">
                      {item.discount}%
                    </span>
                    <span className="text-[14px] font-bold text-black">
                      {formatPrice(item.price)}원
                    </span>
                  </div>
                ) : (
                  <span className="text-[14px] font-bold text-black">
                    {formatPrice(item.price)}원
                  </span>
                )}
              </div>

              {/* 리뷰 & 좋아요 Stats */}
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium mb-1">
                <div className="flex items-center gap-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3 h-3 text-red-500"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                  <span>{item.likes}</span>
                </div>
                <div className="w-[1px] h-[8px] bg-gray-300"></div>
                <div className="flex items-center gap-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3 h-3 text-yellow-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-black font-bold">{item.rating}</span>
                  <span>({item.reviews})</span>
                </div>
              </div>

              {/* 배지 (무배 등) */}
              {item.badges.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className={`text-[9px] px-1 py-0.5 border rounded-sm ${
                        badge.includes("도착보장")
                          ? "border-blue-200 text-blue-600 bg-blue-50"
                          : "border-gray-200 text-gray-600"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ================= 6. Bottom Banner (Dummy) ================= */}
        <div className="mt-20 w-full h-[120px] bg-gray-100 flex items-center justify-between px-10 rounded-sm relative overflow-hidden">
          <div className="z-10">
            <p className="font-bold text-[14px]">단 일주일 브랜드위크</p>
            <p className="text-[12px] text-gray-600 mt-1">
              위캔더스 외 최대 80% 할인
            </p>
          </div>
          {/* Banner Image Placeholder */}
          <div className="w-[100px] h-[100px] bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
