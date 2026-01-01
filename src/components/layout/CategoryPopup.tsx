// src/components/layout/CategoryPopup.tsx
"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// 1) [삭제] 하드코딩된 카테고리 목록 제거
// const CATEGORY_ITEMS = ... (삭제됨)

// 2) 각 카테고리별 서브 아이템 정의 (성별 추가)
type SubItem = { id: string; icon: string; gender: "common" | "men" | "women"; name?: string };

// 2) [삭제] 하드코딩된 서브 아이템 및 맵 제거
// const SUB_ITEMS_MAP = ... (삭제됨)
// 🧑‍💻 [유틸] 한글 초성 추출 함수
function getInitialConsonant(text: string) {
  const CHO_HANGUL = [
    "ㄱ", "7", "ㄴ", "ㄷ", "9", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
  ];
  // 7=꾼, 9=뚱 처럼 된 index 보정 필요없음 (일반적인 초성 범위만)
  const CHO_PERIOD = Math.floor("까".charCodeAt(0) - "가".charCodeAt(0));
  const CHO_START = "가".charCodeAt(0);

  const code = text.charCodeAt(0);
  if (code >= CHO_START && code <= "힣".charCodeAt(0)) {
    const choIndex = Math.floor((code - CHO_START) / CHO_PERIOD);
    // ㄱ,ㄲ,ㄴ,ㄷ,ㄸ,ㄹ... 순서에서 매핑 필요.
    // 간단 버전을 위해 매핑 테이블 사용 권장.
    // 여기서는 "ㄱ"~"ㅎ" 범위에 정확히 매핑되는 표준 초성 리스트 사용.
    const CHO = [
      "ㄱ", "ㄲ", "ㄴ", "ㄷ", "따", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
    ];
    // 필터용으로는 ㄲ->ㄱ, ㄸ->ㄷ 등으로 매핑하는게 좋음
    const MAP: Record<string, string> = {
      "ㄲ": "ㄱ", "ㄸ": "ㄷ", "ㅃ": "ㅂ", "ㅆ": "ㅅ", "ㅉ": "ㅈ"
    };
    const ch = CHO[choIndex];
    return MAP[ch] || ch;
  }
  return text.charAt(0).toUpperCase(); // 영문/숫자는 그대로
}

// 🗂️ [데이터] 전체 브랜드 리스트 (확장)
type BrandData = {
  id: string;
  parentId?: string | null;
  name: string;
  enName?: string;
  slug: string;
  category: string; // 필터링용 카테고리
  tag?: string;     // 뱃지 (단독 등)
  initial?: string; // 초성 (자동 계산 가능하지만 편의상)
  logoUrl?: string;
  description?: string;
};

const ALL_BRANDS_DATA: BrandData[] = [];


interface CategoryPopupProps {
  onClose: () => void;
  initialTab?: "category" | "brand" | "service";
}

function buildCategoryHref(
  categoryId: string,
  gf: string,
  sub?: string
): string {
  const qs = new URLSearchParams();
  qs.set("gf", gf);
  if (sub) qs.set("sub", sub);

  const safeCategoryId = encodeURIComponent(categoryId);
  const query = qs.toString();
  return query.length > 0
    ? `/category/${safeCategoryId}?${query}`
    : `/category/${safeCategoryId}`;
}

function buildBrandHref(brandSlug: string, gf: string): string {
  const qs = new URLSearchParams();
  qs.set("gf", gf);

  const safeBrandSlug = encodeURIComponent(brandSlug);
  const query = qs.toString();
  return query.length > 0
    ? `/brand/${safeBrandSlug}?${query}`
    : `/brand/${safeBrandSlug}`;
}

export default function CategoryPopup({
  onClose,
  initialTab = "category",
}: CategoryPopupProps) {
  const t = useTranslations("popup");

  const [selectedTab, setSelectedTab] = useState<
    "category" | "brand" | "service"
  >(initialTab);
  
  // activeCategory in Dynamic Mode: Stores the ID of the selected admin category
  const [activeCategory, setActiveCategory] = useState<string>("");

  // 🔹 [Brand Tab State]
  const [selectedBrandCategory, setSelectedBrandCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConsonant, setSelectedConsonant] = useState("인기");
  
  // 🔹 [Gender Filter State]
  const [selectedGender, setSelectedGender] = useState<"all" | "men" | "women">("all");

  // 🔹 [Admin Data State]
  const [adminCategories, setAdminCategories] = useState<any[]>([]);
  const [brandsData, setBrandsData] = useState<BrandData[]>([]);

  // 📡 [Data Fetching]
  // 📡 [Data Fetching]
  useEffect(() => {
    fetch("/api/popup/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAdminCategories(data);
          
          // Set default active category to the first root category
          const rootCats = data.filter((c: any) => !c.parentId);
          if (rootCats.length > 0) {
            setActiveCategory(rootCats[0].id);
          }
        }
      })
      .catch((err) => console.error("Failed to fetch admin categories:", err));

      // Fetch Brands
      fetch("/api/popup/brands")
        .then((res) => res.json())
        .then((data) => {
             if (Array.isArray(data)) {
                 const mapped = data.map((b: any) => ({
                    id: b.id,
                    parentId: b.parentId,
                    name: b.name,
                    enName: b.enName, 
                    slug: b.slug || b.id,
                    category: b.category || "기타",
                    logoUrl: b.logoUrl,
                    description: b.description
                 }));
                 setBrandsData(mapped);
             }
        })
        .catch((err) => console.error("Failed to fetch brands:", err));
  }, []);

  //  [스크롤 잠금] 팝업이 열릴 때 백그라운드 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // 🛠️ [Dynamic Logic] Root & Child Categories
  const rootCategories = useMemo(() => {
    return adminCategories.filter(c => !c.parentId);
  }, [adminCategories]);

  // 🏷️ [Brand Logic] Top Level Brands for Sidebar
  const topLevelBrands = useMemo(() => {
    return brandsData.filter(b => !b.parentId);
  }, [brandsData]);

  const currentCategoryInfo = useMemo(() => {
    const found = rootCategories.find(c => c.id === activeCategory);
    if (found) {
        return {
            id: found.id,
            label: found.name.charAt(0).toUpperCase(),
            color: "bg-black", // Default color
            categoryId: found.code || found.id
        };
    }
    return { id: "", label: "", color: "bg-gray-500", categoryId: "" };
  }, [activeCategory, rootCategories]);

  // 🔍 [필터 로직] 카테고리 성별 필터링
  const currentSubItems = useMemo(() => {
    // Admin Dynamic Children
    const children = adminCategories.filter(c => c.parentId === activeCategory);
    
    let items = children.map(c => ({
        id: c.slug || c.id,
        icon: c.imageUrl || "📁", // Default icon
        gender: "common",
        name: c.name
    }));

    if (selectedGender === "all") return items;
    // common은 항상 포함 + 선택된 성별
    return items.filter(
      (item) => item.gender === "common" || item.gender === selectedGender
    );
  }, [activeCategory, selectedGender, adminCategories]);

  // ✅ 전체보기용 href(완성된 문자열)
  const categoryHref = useMemo(() => {
    return buildCategoryHref(currentCategoryInfo.categoryId, "A");
  }, [currentCategoryInfo.categoryId]);

  // 🖱️ [휠 이벤트] 스크롤 시 카테고리 전환 처리
  const isThrottled = useRef(false);

  const handleWheel = (e: React.WheelEvent) => {
    // 카테고리 탭일 때만 동작
    if (selectedTab !== "category") return;

    // 쓰로틀링: 더 자연스러운 전환을 위해 시간 단축 (100ms)
    if (isThrottled.current) return;

    // 감도 조절: 10 (더 적은 움직임으로도 반응)
    if (e.deltaY > 10) {
      // 아래로 스크롤 -> 다음 카테고리
      const currentIndex = rootCategories.findIndex(
        (c) => c.id === activeCategory
      );
      if (currentIndex < rootCategories.length - 1) {
        setActiveCategory(rootCategories[currentIndex + 1].id);
        isThrottled.current = true;
        setTimeout(() => {
          isThrottled.current = false;
        }, 100);
      }
    } else if (e.deltaY < -10) {
      // 위로 스크롤 -> 이전 카테고리
      const currentIndex = rootCategories.findIndex(
        (c) => c.id === activeCategory
      );
      if (currentIndex > 0) {
        setActiveCategory(rootCategories[currentIndex - 1].id);
        isThrottled.current = true;
        setTimeout(() => {
          isThrottled.current = false;
        }, 100);
      }
    }
  };

  // 🔍 [필터 로직] 브랜드 필터링
  const filteredBrands = useMemo(() => {
    // Top-level items are folders; exclude them from the brand list/search
    let result = brandsData.filter(b => b.parentId);

    // 1. 카테고리 필터
    // 1. 브랜드 계층 필터 (Left Sidebar)
    if (selectedBrandCategory !== "전체") {
      // selectedBrandCategory contains the NAME of the parent brand
      const parentBrand = topLevelBrands.find(b => b.name === selectedBrandCategory);
      
      if (parentBrand) {
        // Show ONLY children (sub-brands) of the selected parent
        // Exclude the parent brand itself from the list
        result = result.filter(b => b.parentId === parentBrand.id);
      } else {
        // Fallback: name matching if we missed something, or empty
         result = []; 
      }
    }

    // 2. 검색어 필터
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (brand) =>
          brand.name.toLowerCase().includes(query) ||
          (brand.enName && brand.enName.toLowerCase().includes(query))
      );
    }

    // 3. 초성/필터 탭
    if (selectedConsonant !== "인기") {
      if (selectedConsonant === "A-Z") {
        // 영문 시작
        result = result.filter((brand) => /^[A-Za-z]/.test(brand.name) || (brand.enName && /^[A-Za-z]/.test(brand.enName)));
      } else if (selectedConsonant === "0-9") {
        // 숫자 시작
        result = result.filter((brand) => /^[0-9]/.test(brand.name) || (brand.enName && /^[0-9]/.test(brand.enName)));
      } else {
        // 한글 초성 (ㄱ, ㄴ, ...)
        result = result.filter((brand) => getInitialConsonant(brand.name) === selectedConsonant);
      }
    }

    return result;
  }, [brandsData, selectedBrandCategory, searchQuery, selectedConsonant]);


  return (
    // 🛠️ [수정] 배경 오버레이 클릭 시 onClose 실행
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      {/* 팝업 본문 */}
      <div
        className="bg-white text-black shadow-2xl border border-gray-200 rounded-lg w-150 h-[700px] overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black z-10 cursor-pointer"
          aria-label="Close"
          type="button"
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

        <div className="w-full px-4 pt-6 pb-2 shrink-0">
          <div className="flex justify-between items-end border-b border-gray-200 mb-4 pb-4 font-bold text-lg">
            <div className="flex gap-6 shrink-0">
              <button
                onClick={() => setSelectedTab("category")}
                className={`pb-1 ${
                  selectedTab === "category"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-400 hover:text-black"
                }`}
                type="button"
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
                type="button"
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
                type="button"
              >
                {t("tabs.service")}
              </button>
            </div>

            {(selectedTab === "category" || selectedTab === "brand") && (
              <div className="flex gap-3 text-sm text-gray-500 pb-1.5 mr-8">
                <span
                  onClick={() => setSelectedGender("all")}
                  className={`cursor-pointer hover:text-black ${
                    selectedGender === "all" ? "font-bold text-black" : ""
                  }`}
                >
                  {t("filters.all")}
                </span>
                <span
                  onClick={() => setSelectedGender("men")}
                  className={`cursor-pointer hover:text-black ${
                    selectedGender === "men" ? "font-bold text-black" : ""
                  }`}
                >
                  {t("filters.men")}
                </span>
                <span
                  onClick={() => setSelectedGender("women")}
                  className={`cursor-pointer hover:text-black ${
                    selectedGender === "women" ? "font-bold text-black" : ""
                  }`}
                >
                  {t("filters.women")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 메인 콘텐츠 영역 (min-h-0 필수) */}
        <div className="flex-1 overflow-hidden min-h-0 relative">
          {selectedTab === "category" && (
            <div className="flex h-full">
              {/* 왼쪽 카테고리 리스트 (Brand 스타일 적용) */}
              <ul className="w-32 border-r border-gray-100 shrink-0 h-full overflow-y-auto bg-gray-50 text-sm font-medium text-gray-500 custom-scroll">
                {rootCategories.length === 0 && (
                     <li className="text-gray-400 text-sm px-4 py-3">Loading...</li>
                )}
                {rootCategories.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => setActiveCategory(item.id)}
                    className={`cursor-pointer px-4 py-3 hover:bg-white hover:text-black hover:font-bold transition-colors ${
                      activeCategory === item.id
                        ? "bg-white text-black font-bold"
                        : ""
                    }`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>

              {/* 오른쪽 상세 아이템 리스트 (Brand 리스트 스타일 적용) */}
              <div className="flex-1 flex flex-col h-full overflow-hidden pl-0">
                <div className="px-6 pt-5 pb-3 shrink-0 flex justify-between items-end border-b border-gray-50">
                   <div className="text-xs text-gray-500">
                        {rootCategories.find(c => c.id === activeCategory)?.name} <span className="text-gray-300">|</span> {currentSubItems.length}개
                   </div>
                   <Link
                    href={categoryHref}
                    onClick={onClose}
                    className="text-xs text-gray-400 hover:underline"
                   >
                    {t("headings.viewAll")}
                   </Link>
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scroll">
                  {currentSubItems.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-gray-400">
                          {t("noItems")}
                      </div>
                  ) : (
                  <div className="grid grid-cols-4 gap-6 pb-10">
                  {currentSubItems.map((sub) => {
                    const subHref = buildCategoryHref(
                      currentCategoryInfo.categoryId,
                      "A",
                      sub.id
                    );

                    return (
                      <Link
                        key={sub.id}
                        href={subHref}
                        onClick={onClose}
                        className="flex flex-col items-center group cursor-pointer"
                      >
                        <div className="w-16 h-16 mb-3 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
                             {sub.icon.startsWith("http") || sub.icon.startsWith("/") ? (
                               <img
                                 src={sub.icon}
                                 alt={sub.name}
                                 className="h-full w-auto object-contain"
                               />
                             ) : (
                               <span className="text-4xl text-gray-400 group-hover:text-black transition-colors">{sub.icon}</span>
                             )}
                        </div>
                        <span className="text-xs font-medium text-gray-600 text-center group-hover:text-black group-hover:font-bold break-keep leading-tight px-1">
                             {sub.name || t(`${activeCategory}Sub.${sub.id}`)}
                        </span>
                      </Link>
                    );
                  })}
                  </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {selectedTab === "brand" && (
            <div className="flex h-full">
              {/* 1. Left Sidebar (Brand Categories) */}
               <ul className="w-32 border-r border-gray-100 shrink-0 h-full overflow-y-auto bg-gray-50 text-sm font-medium text-gray-500 custom-scroll">
                 <li
                   onClick={() => setSelectedBrandCategory("전체")}
                   className={`cursor-pointer px-4 py-3 hover:bg-white hover:text-black hover:font-bold transition-colors ${
                     selectedBrandCategory === "전체"
                       ? "bg-white text-black font-bold"
                       : ""
                   }`}
                 >
                   전체
                 </li>
                 {topLevelBrands.map((brand) => (
                   <li
                     key={brand.id}
                     onClick={() => setSelectedBrandCategory(brand.name)}
                     className={`cursor-pointer px-4 py-3 hover:bg-white hover:text-black hover:font-bold transition-colors ${
                       selectedBrandCategory === brand.name
                         ? "bg-white text-black font-bold"
                         : ""
                     }`}
                   >
                     {brand.name}
                   </li>
                 ))}
               </ul>

              {/* 2. Right Content Area */}
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Search Bar */}
                <div className="px-6 pt-5 pb-3 shrink-0">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="브랜드를 검색하세요"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-10 pl-4 pr-10 border border-gray-300 rounded-sm text-sm placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Filter Tabs (Popular / Consonants) */}
                <div className="px-6 py-2 border-b border-gray-100 flex items-center gap-4 text-sm shrink-0 overflow-x-auto scrollbar-hide">
                  <span
                    onClick={() => setSelectedConsonant("인기")}
                    className={`pb-1 cursor-pointer shrink-0 ${
                      selectedConsonant === "인기"
                        ? "font-bold text-black border-b-2 border-black"
                        : "text-gray-400"
                    }`}
                  >
                    인기
                  </span>
                  
                  {/* (옵션) 하트 필터 아이콘 - 좋아요 필터 기능 활성화 */}
                  <span 
                    onClick={() => setSelectedConsonant("좋아요")}
                    className={`cursor-pointer shrink-0 ${
                      selectedConsonant === "좋아요" ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={selectedConsonant === "좋아요" ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </span>

                  {[
                    "ㄱ",
                    "ㄴ",
                    "ㄷ",
                    "ㄹ",
                    "ㅁ",
                    "ㅂ",
                    "ㅅ",
                    "ㅇ",
                    "ㅈ",
                    "ㅊ",
                    "ㅋ",
                    "ㅌ",
                    "ㅍ",
                    "ㅎ",
                    "A-Z",
                    "0-9",
                  ].map((char) => (
                    <span
                      key={char}
                      onClick={() => setSelectedConsonant(char)}
                      className={`cursor-pointer px-1 shrink-0 ${
                        selectedConsonant === char
                          ? "text-black font-bold"
                          : "text-gray-400 hover:text-black"
                      }`}
                    >
                      {char}
                    </span>
                  ))}
                  <span className="ml-auto text-xs text-black font-medium cursor-pointer shrink-0 flex items-center gap-1">
                    가나다 <span className="text-[10px]">⇄</span>
                  </span>
                </div>

                {/* Brand List */}
                <div className="flex-1 overflow-y-auto p-6 custom-scroll">
                  <div className="text-xs text-gray-500 mb-4">
                    {selectedConsonant === "좋아요" 
                      ? "좋아요" 
                      : selectedConsonant !== "인기" 
                        ? selectedConsonant 
                        : (selectedBrandCategory === "전체" ? "인기" : selectedBrandCategory)} <span className="text-gray-300">|</span> {filteredBrands.length}개
                  </div>

                  {filteredBrands.length === 0 ? (
                    <div className="text-center text-gray-400 py-10">
                      검색 결과가 없습니다.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredBrands.map((brand, idx) => (
                        <Link
                          key={idx}
                          href={buildBrandHref(brand.slug, selectedGender === "men" ? "M" : selectedGender === "women" ? "W" : "A")}
                          onClick={onClose}
                          className="flex items-center justify-between group cursor-pointer py-1"
                        >
                          <div className="flex items-center gap-3">
                            {/* Brand Logo Placeholder */}
                            <div className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center bg-gray-50 text-[10px] text-gray-400 font-bold overflow-hidden shrink-0">
                              {brand.logoUrl ? (
                                <img src={brand.logoUrl} alt={brand.name} className="w-full h-full object-cover" />
                              ) : brand.slug === "nkbus-standard" ? (
                                <span className="text-black">NKBUS</span>
                              ) : (
                                brand.name.substring(0, 2)
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-black group-hover:underline">
                                  {brand.name}
                                </span>
                                {brand.tag && (
                                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1 py-0.5 rounded-sm">
                                    {brand.tag}
                                  </span>
                                )}
                              </div>
                              {brand.enName ? (
                                <div className="text-xs text-gray-400 mt-0.5">
                                  {brand.enName}
                                </div>
                              ) : (
                                <div className="text-xs text-gray-400 mt-0.5 uppercase">
                                  {brand.slug.replace("-", " ")}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Heart Icon */}
                          <div className="text-gray-300 hover:text-red-500 transition-colors">
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
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                              />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

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
