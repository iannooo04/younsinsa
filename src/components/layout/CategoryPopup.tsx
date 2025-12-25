// src/components/layout/CategoryPopup.tsx
"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

// 1) 카테고리 목록: 라우팅에 쓸 categoryId(숫자) 추가
const CATEGORY_ITEMS: Array<{
  id: string;
  label: string;
  color: string;
  categoryId: string;
}> = [
  { id: "golf", label: "G", color: "bg-green-600", categoryId: "104001" },
  { id: "shoes", label: "S", color: "bg-blue-600", categoryId: "104002" },
  { id: "top", label: "T", color: "bg-indigo-600", categoryId: "104003" },
  { id: "outer", label: "O", color: "bg-gray-600", categoryId: "104004" },
  { id: "bottom", label: "B", color: "bg-teal-600", categoryId: "104005" },
  { id: "bag", label: "B", color: "bg-orange-600", categoryId: "104006" },
  { id: "accessories", label: "A", color: "bg-pink-600", categoryId: "104007" },
  { id: "underwear", label: "U", color: "bg-purple-600", categoryId: "104008" },
  { id: "sports", label: "S", color: "bg-red-600", categoryId: "104009" },
  { id: "digital", label: "D", color: "bg-cyan-600", categoryId: "104010" },
];

// 2) 각 카테고리별 서브 아이템 정의
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

// 3) 브랜드: "무신사 방식"을 따라 slug(code)를 명시적으로 둠
type BrandItem = { name: string; slug: string; highlight?: boolean };

const BRAND_ITEMS: { women: BrandItem[]; plusSize: BrandItem[] } = {
  women: [
    { name: "CRKO", slug: "crko", highlight: false },
    { name: "공통-고유", slug: "common-unique", highlight: true },
    { name: "데일리마켓", slug: "daily-market", highlight: true },
    { name: "달트", slug: "dalt" },
    { name: "데놀리타", slug: "denolita" },
    { name: "감정", slug: "gamjung", highlight: true },
    { name: "페미니크", slug: "feminique", highlight: true },
    { name: "그원", slug: "thewon" },
    { name: "헤이레이디", slug: "hey-lady" },
    { name: "홀리콜릭", slug: "holicolic" },
    { name: "최면", slug: "hypnosis" },
    { name: "라걸", slug: "lagirl" },
    { name: "리린", slug: "ririn" },
    { name: "리넨느", slug: "rinenne", highlight: true },
    { name: "로컬맨션", slug: "local-mansion" },
    { name: "라일론", slug: "lylon" },
    { name: "다다니모드", slug: "dadanimo" },
    { name: "어쩌면 아기", slug: "maybe-baby", highlight: true },
    { name: "메이빈스", slug: "maybins" },
    { name: "메이메이", slug: "maymay" },
    { name: "밀크코코아", slug: "milk-cocoa" },
    { name: "모코블링", slug: "mocobling" },
    { name: "니어웨어", slug: "nearwear" },
    { name: "평범함", slug: "ordinary" },
    { name: "피버", slug: "fever" },
    { name: "프로스티", slug: "frosty" },
    { name: "세컨디세콘", slug: "secondisecon" },
    { name: "느리고", slug: "slowly" },
    { name: "스무스무드", slug: "smooth-mood", highlight: true },
    { name: "더클립", slug: "the-clip" },
    { name: "언더-vi", slug: "under-vi" },
    { name: "Y-GEE", slug: "y-gee", highlight: true },
    { name: "유이니", slug: "youini" },
    // 무신사 예시(실제 브랜드 코드 형태)
    { name: "ADIDAS", slug: "adidas", highlight: false }, // /brand/adidas :contentReference[oaicite:3]{index=3}
  ],
  plusSize: [
    { name: "핫핑", slug: "hotping" },
    { name: "로로텐", slug: "loroten" },
  ],
};

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
  const [activeCategory, setActiveCategory] = useState<string>("golf");

  const currentCategoryInfo = useMemo(() => {
    return (
      CATEGORY_ITEMS.find((c) => c.id === activeCategory) ?? CATEGORY_ITEMS[0]
    );
  }, [activeCategory]);

  const currentSubItems = SUB_ITEMS_MAP[activeCategory] ?? [];

  // ✅ 전체보기용 href(완성된 문자열)
  const categoryHref = useMemo(() => {
    return buildCategoryHref(currentCategoryInfo.categoryId, "A");
  }, [currentCategoryInfo.categoryId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white text-black shadow-2xl border border-gray-200 rounded-lg w-150 min-h-150 overflow-hidden relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black z-10"
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

        <div className="w-full px-4 pt-6 pb-2">
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

        <div className="flex-1 overflow-hidden">
          {selectedTab === "category" && (
            <div className="flex h-full">
              <ul className="w-48 border-r border-gray-100 pr-4 shrink-0 space-y-1 h-full overflow-y-auto scrollbar-hide px-4">
                {CATEGORY_ITEMS.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => setActiveCategory(item.id)}
                    className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-md flex justify-between items-center transition-colors ${
                      activeCategory === item.id
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {t(`categories.${item.id}`)}
                    {activeCategory === item.id && <span>›</span>}
                  </li>
                ))}
              </ul>

              <div className="flex-1 pl-8 pr-4 h-full overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg flex items-center gap-1">
                    <span
                      className={`${currentCategoryInfo.color} text-white text-[10px] px-1 rounded-sm`}
                    >
                      {currentCategoryInfo.label}
                    </span>
                    {t(`headings.${activeCategory}`)}
                  </h3>

                  <Link
                    href={categoryHref}
                    onClick={onClose}
                    className="text-xs text-gray-400 cursor-pointer hover:underline"
                  >
                    {t("headings.viewAll")}
                  </Link>
                </div>

                <div className="grid grid-cols-4 gap-y-8 gap-x-4 pb-10">
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
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform">
                          {sub.icon}
                        </div>
                        <span className="text-xs font-medium text-gray-700 group-hover:text-black text-center">
                          {t(`${activeCategory}Sub.${sub.id}`)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {selectedTab === "brand" && (
            <div className="h-full overflow-y-auto scrollbar-hide px-6 pb-10">
              <div className="mb-8">
                <h3 className="font-bold text-base mb-4 border-b border-gray-100 pb-2">
                  {t("headings.womenClothing")}
                </h3>

                <div className="grid grid-cols-5 gap-y-3 gap-x-2 text-sm text-gray-600">
                  {BRAND_ITEMS.women.map((brand) => {
                    const href = buildBrandHref(brand.slug, "A"); // ✅ /brand/{slug}?gf=A
                    return (
                      <Link
                        key={brand.slug}
                        href={href}
                        onClick={onClose}
                        className={`hover:text-black hover:underline ${
                          brand.highlight ? "text-pink-500 font-medium" : ""
                        }`}
                      >
                        {brand.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base mb-4 border-b border-gray-100 pb-2">
                  {t("headings.plusSize")}
                </h3>

                <div className="grid grid-cols-5 gap-y-3 gap-x-2 text-sm text-gray-600">
                  {BRAND_ITEMS.plusSize.map((brand) => {
                    const href = buildBrandHref(brand.slug, "A");
                    return (
                      <Link
                        key={brand.slug}
                        href={href}
                        onClick={onClose}
                        className="hover:text-black hover:underline"
                      >
                        {brand.name}
                      </Link>
                    );
                  })}
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
