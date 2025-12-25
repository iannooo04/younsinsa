"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

// --- [데이터 영역] ---

// 1. 카테고리 목록 (색상 및 배지 텍스트 포함)
const CATEGORY_ITEMS = [
  { id: "golf", label: "G", color: "bg-green-600" },
  { id: "shoes", label: "S", color: "bg-blue-600" },
  { id: "top", label: "T", color: "bg-indigo-600" },
  { id: "outer", label: "O", color: "bg-gray-600" },
  { id: "bottom", label: "B", color: "bg-teal-600" },
  { id: "bag", label: "B", color: "bg-orange-600" },
  { id: "accessories", label: "A", color: "bg-pink-600" },
  { id: "underwear", label: "U", color: "bg-purple-600" },
  { id: "sports", label: "S", color: "bg-red-600" },
  { id: "digital", label: "D", color: "bg-cyan-600" },
];

// 2. 각 카테고리별 서브 아이템 정의
const GOLF_SUB_ITEMS = [
  { id: "driver", icon: "🏌️‍♂️" },
  { id: "wood", icon: "🪵" },
  { id: "iron", icon: "🏒" },
  { id: "putter", icon: "⛳" },
  { id: "wedge", icon: "📐" },
  { id: "ball", icon: "⚪" },
  { id: "bag", icon: "🎒" },
  { id: "shoes", icon: "👟" },
  { id: "men_wear", icon: "👕" },
  { id: "women_wear", icon: "👚" },
  { id: "cap", icon: "🧢" },
  { id: "glove", icon: "🧤" },
  { id: "distance", icon: "📷" },
  { id: "accessory", icon: "🧳" },
  { id: "practice", icon: "🚩" },
];

const SHOES_SUB_ITEMS = [
  { id: "sneakers", icon: "👟" },
  { id: "loafers", icon: "👞" },
  { id: "boots", icon: "🥾" },
  { id: "sandals", icon: "👡" },
  { id: "slippers", icon: "🩴" },
  { id: "running", icon: "🏃" },
  { id: "heels", icon: "👠" },
  { id: "flat", icon: "🩰" },
];

const TOP_SUB_ITEMS = [
  { id: "tshirt", icon: "👕" },
  { id: "shirt", icon: "👔" },
  { id: "hoodie", icon: "🧥" },
  { id: "sweatshirt", icon: "👚" },
  { id: "knit", icon: "🧶" },
  { id: "sleeveless", icon: "🎽" },
];

const OUTER_SUB_ITEMS = [
  { id: "jacket", icon: "🧥" },
  { id: "coat", icon: "🧥" },
  { id: "padding", icon: "🧣" },
  { id: "cardigan", icon: "🧶" },
  { id: "vest", icon: "🦺" },
  { id: "blazer", icon: "🕴️" },
];

const BOTTOM_SUB_ITEMS = [
  { id: "jeans", icon: "👖" },
  { id: "slacks", icon: "👖" },
  { id: "shorts", icon: "🩳" },
  { id: "skirt", icon: "👗" },
  { id: "leggings", icon: "🧘" },
  { id: "sweatpants", icon: "🏃" },
];

const BAG_SUB_ITEMS = [
  { id: "backpack", icon: "🎒" },
  { id: "tote", icon: "👜" },
  { id: "shoulder", icon: "🛍️" },
  { id: "crossbody", icon: "👜" },
  { id: "clutch", icon: "👛" },
  { id: "eco", icon: "🥡" },
];

const ACCESSORIES_SUB_ITEMS = [
  { id: "hat", icon: "🧢" },
  { id: "jewelry", icon: "💍" },
  { id: "scarf", icon: "🧣" },
  { id: "belt", icon: "🥋" },
  { id: "sunglasses", icon: "🕶️" },
  { id: "watch", icon: "⌚" },
  { id: "socks", icon: "🧦" },
];

const UNDERWEAR_SUB_ITEMS = [
  { id: "bra", icon: "👙" },
  { id: "panties", icon: "🩲" },
  { id: "boxers", icon: "🩳" },
  { id: "pajamas", icon: "🛌" },
  { id: "robe", icon: "👘" },
  { id: "thermal", icon: "🌡️" },
];

const SPORTS_SUB_ITEMS = [
  { id: "gym", icon: "🏋️" },
  { id: "yoga", icon: "🧘" },
  { id: "swimwear", icon: "🩱" },
  { id: "camping", icon: "⛺" },
  { id: "fishing", icon: "🎣" },
  { id: "bike", icon: "🚴" },
];

const DIGITAL_SUB_ITEMS = [
  { id: "case", icon: "📱" },
  { id: "earphone", icon: "🎧" },
  { id: "charger", icon: "🔋" },
  { id: "laptop_bag", icon: "💻" },
  { id: "speaker", icon: "🔊" },
  { id: "camera", icon: "📸" },
];

// 통합 맵
const SUB_ITEMS_MAP: Record<string, typeof GOLF_SUB_ITEMS> = {
  golf: GOLF_SUB_ITEMS,
  shoes: SHOES_SUB_ITEMS,
  top: TOP_SUB_ITEMS,
  outer: OUTER_SUB_ITEMS,
  bottom: BOTTOM_SUB_ITEMS,
  bag: BAG_SUB_ITEMS,
  accessories: ACCESSORIES_SUB_ITEMS,
  underwear: UNDERWEAR_SUB_ITEMS,
  sports: SPORTS_SUB_ITEMS,
  digital: DIGITAL_SUB_ITEMS,
};

// 3. 브랜드 (고유명사는 그대로 유지)
const BRAND_ITEMS = {
  women: [
    "CRKO",
    "공통-고유",
    "데일리마켓",
    "달트",
    "데놀리타",
    "감정",
    "페미니크",
    "그원",
    "헤이레이디",
    "홀리콜릭",
    "최면",
    "라걸",
    "리린",
    "리넨느",
    "로컬맨션",
    "라일론",
    "다다니모드",
    "어쩌면 아기",
    "메이빈스",
    "메이메이",
    "밀크코코아",
    "모코블링",
    "니어웨어",
    "평범함",
    "피버",
    "프로스티",
    "세컨디세콘",
    "느리고",
    "스무스무드",
    "더클립",
    "언더-vi",
    "Y-GEE",
    "유이니",
  ],
  plusSize: ["핫핑", "로로텐"],
};

// --- [컴포넌트] ---

interface CategoryPopupProps {
  onClose: () => void;
  initialTab?: "category" | "brand" | "service";
}

export default function CategoryPopup({
  onClose,
  initialTab = "category",
}: CategoryPopupProps) {
  const t = useTranslations("popup");

  const [selectedTab, setSelectedTab] = useState<
    "category" | "brand" | "service"
  >(initialTab);
  // 카테고리 탭 내부에서 선택된 카테고리 (기본값: 골프)
  const [activeCategory, setActiveCategory] = useState<string>("golf");

  // 현재 선택된 카테고리 정보 찾기
  const currentCategoryInfo =
    CATEGORY_ITEMS.find((c) => c.id === activeCategory) || CATEGORY_ITEMS[0];
  const currentSubItems = SUB_ITEMS_MAP[activeCategory] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white text-black shadow-2xl border border-gray-200 rounded-lg w-[600px] min-h-[600px] overflow-hidden relative flex flex-col">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="w-full px-4 pt-6 pb-2">
          {/* 상단 탭 영역 */}
          <div className="flex justify-between items-end border-b border-gray-200 mb-4 pb-4 font-bold text-lg">
            {/* 왼쪽: 탭 버튼들 */}
            <div className="flex gap-6 shrink-0">
              <button
                onClick={() => setSelectedTab("category")}
                className={`pb-1 ${
                  selectedTab === "category"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {t("tabs.category")}
              </button>
              <button
                onClick={() => setSelectedTab("brand")}
                className={`pb-1 ${
                  selectedTab === "brand"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {t("tabs.brand")}
              </button>
              <button
                onClick={() => setSelectedTab("service")}
                className={`pb-1 ${
                  selectedTab === "service"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {t("tabs.service")}
              </button>
            </div>

            {/* 오른쪽: 필터 (카테고리 탭일 때만 표시) */}
            {selectedTab === "category" && (
              <div className="flex gap-3 text-sm text-gray-500 pb-1.5 mr-8">
                <span className="font-bold text-black cursor-pointer">
                  {t("filters.all")}
                </span>
                <span className="cursor-pointer hover:text-black">
                  {t("filters.men")}
                </span>
                <span className="cursor-pointer hover:text-black">
                  {t("filters.women")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="flex-1 overflow-hidden">
          {/* 1. 카테고리 탭 내용 */}
          {selectedTab === "category" && (
            <div className="flex h-full">
              {/* 왼쪽 사이드바 */}
              <ul className="w-48 border-r border-gray-100 pr-4 shrink-0 space-y-1 h-full overflow-y-auto scrollbar-hide px-4">
                {CATEGORY_ITEMS.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => setActiveCategory(item.id)} // 클릭 시 활성 카테고리 변경
                    className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-md flex justify-between items-center transition-colors ${
                      activeCategory === item.id
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {/* categories 키 사용 */}
                    {t(`categories.${item.id}`)}
                    {activeCategory === item.id && <span>›</span>}
                  </li>
                ))}
              </ul>

              {/* 오른쪽 콘텐츠 (동적 렌더링) */}
              <div className="flex-1 pl-8 pr-4 h-full overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg flex items-center gap-1">
                    {/* 카테고리별 배지 색상 및 텍스트 적용 */}
                    <span
                      className={`${currentCategoryInfo.color} text-white text-[10px] px-1 rounded-sm`}
                    >
                      {currentCategoryInfo.label}
                    </span>
                    {/* headings 키 동적 사용: headings.golf, headings.shoes ... */}
                    {t(`headings.${activeCategory}`)}
                  </h3>
                  <span className="text-xs text-gray-400 cursor-pointer hover:underline">
                    {t("headings.viewAll")}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-y-8 gap-x-4 pb-10">
                  {currentSubItems.map((sub, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">
                        {sub.icon}
                      </div>
                      <span className="text-xs font-medium text-gray-700 group-hover:text-black text-center">
                        {/* {categoryId}Sub.{itemId} 형태의 키 사용 (예: shoesSub.sneakers) */}
                        {t(`${activeCategory}Sub.${sub.id}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. 브랜드 탭 내용 */}
          {selectedTab === "brand" && (
            <div className="h-full overflow-y-auto scrollbar-hide px-6 pb-10">
              <div className="mb-8">
                <h3 className="font-bold text-base mb-4 border-b border-gray-100 pb-2">
                  {t("headings.womenClothing")}
                </h3>
                <div className="grid grid-cols-5 gap-y-3 gap-x-2 text-sm text-gray-600">
                  {BRAND_ITEMS.women.map((brand, idx) => (
                    <span
                      key={idx}
                      className={`cursor-pointer hover:text-black hover:underline ${
                        [
                          "감정",
                          "공통-고유",
                          "페미니크",
                          "데일리마켓",
                          "리넨느",
                          "어쩌면 아기",
                          "Y-GEE",
                          "스무스무드",
                        ].includes(brand)
                          ? "text-pink-500 font-medium"
                          : ""
                      }`}
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base mb-4 border-b border-gray-100 pb-2">
                  {t("headings.plusSize")}
                </h3>
                <div className="grid grid-cols-5 gap-y-3 gap-x-2 text-sm text-gray-600">
                  {BRAND_ITEMS.plusSize.map((brand, idx) => (
                    <span
                      key={idx}
                      className="cursor-pointer hover:text-black hover:underline"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. 서비스 탭 */}
          {selectedTab === "service" && (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              {t("servicePlaceholder")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
