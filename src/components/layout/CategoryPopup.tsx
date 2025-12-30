// src/components/layout/CategoryPopup.tsx
"use client";

import { useMemo, useState, useEffect, useRef } from "react";
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

// 2) 각 카테고리별 서브 아이템 정의 (성별 추가)
type SubItem = { id: string; icon: string; gender: "common" | "men" | "women" };

const GOLF_SUB_ITEMS: SubItem[] = [
  { id: "driver", icon: "🏌️‍♂️", gender: "common" },
  { id: "wood", icon: "🪵", gender: "common" },
  { id: "iron", icon: "🏒", gender: "common" },
  { id: "putter", icon: "⛳", gender: "common" },
  { id: "wedge", icon: "📐", gender: "common" },
  { id: "ball", icon: "⚪", gender: "common" },
  { id: "bag", icon: "🎒", gender: "common" },
  { id: "shoes", icon: "👟", gender: "common" },
  { id: "men_wear", icon: "👕", gender: "men" },
  { id: "women_wear", icon: "👚", gender: "women" },
  { id: "cap", icon: "🧢", gender: "common" },
  { id: "glove", icon: "🧤", gender: "common" },
  { id: "distance", icon: "📷", gender: "common" },
  { id: "accessory", icon: "🧳", gender: "common" },
  { id: "practice", icon: "🚩", gender: "common" },
];

const SHOES_SUB_ITEMS: SubItem[] = [
  { id: "sneakers", icon: "👟", gender: "common" },
  { id: "loafers", icon: "👞", gender: "men" },
  { id: "boots", icon: "🥾", gender: "women" },
  { id: "sandals", icon: "👡", gender: "common" },
  { id: "slippers", icon: "🩴", gender: "common" },
  { id: "running", icon: "🏃", gender: "common" },
  { id: "heels", icon: "👠", gender: "women" },
  { id: "flat", icon: "🩰", gender: "women" },
];

const TOP_SUB_ITEMS: SubItem[] = [
  { id: "tshirt", icon: "👕", gender: "common" },
  { id: "shirt", icon: "👔", gender: "men" },
  { id: "hoodie", icon: "🧥", gender: "common" },
  { id: "sweatshirt", icon: "👚", gender: "common" },
  { id: "knit", icon: "🧶", gender: "common" },
  { id: "sleeveless", icon: "🎽", gender: "women" },
];

const OUTER_SUB_ITEMS: SubItem[] = [
  { id: "jacket", icon: "🧥", gender: "common" },
  { id: "coat", icon: "🧥", gender: "common" },
  { id: "padding", icon: "🧣", gender: "common" },
  { id: "cardigan", icon: "🧶", gender: "women" },
  { id: "vest", icon: "🦺", gender: "men" },
  { id: "blazer", icon: "🕴️", gender: "men" },
];

const BOTTOM_SUB_ITEMS: SubItem[] = [
  { id: "jeans", icon: "👖", gender: "common" },
  { id: "slacks", icon: "👖", gender: "men" },
  { id: "shorts", icon: "🩳", gender: "common" },
  { id: "skirt", icon: "👗", gender: "women" },
  { id: "leggings", icon: "🧘", gender: "women" },
  { id: "sweatpants", icon: "🏃", gender: "common" },
];

const BAG_SUB_ITEMS: SubItem[] = [
  { id: "backpack", icon: "🎒", gender: "common" },
  { id: "tote", icon: "👜", gender: "women" },
  { id: "shoulder", icon: "🛍️", gender: "women" },
  { id: "crossbody", icon: "👜", gender: "common" },
  { id: "clutch", icon: "👛", gender: "women" },
  { id: "eco", icon: "🥡", gender: "common" },
];

const ACCESSORIES_SUB_ITEMS: SubItem[] = [
  { id: "hat", icon: "🧢", gender: "common" },
  { id: "jewelry", icon: "💍", gender: "women" },
  { id: "scarf", icon: "🧣", gender: "women" },
  { id: "belt", icon: "🥋", gender: "men" },
  { id: "sunglasses", icon: "🕶️", gender: "common" },
  { id: "watch", icon: "⌚", gender: "common" },
  { id: "socks", icon: "🧦", gender: "common" },
];

const UNDERWEAR_SUB_ITEMS: SubItem[] = [
  { id: "bra", icon: "👙", gender: "women" },
  { id: "panties", icon: "🩲", gender: "women" },
  { id: "boxers", icon: "🩳", gender: "men" },
  { id: "pajamas", icon: "🛌", gender: "common" },
  { id: "robe", icon: "👘", gender: "women" },
  { id: "thermal", icon: "🌡️", gender: "common" },
];

const SPORTS_SUB_ITEMS: SubItem[] = [
  { id: "gym", icon: "🏋️", gender: "common" },
  { id: "yoga", icon: "🧘", gender: "women" },
  { id: "swimwear", icon: "🩱", gender: "common" },
  { id: "camping", icon: "⛺", gender: "common" },
  { id: "fishing", icon: "🎣", gender: "men" },
  { id: "bike", icon: "🚴", gender: "common" },
];

const DIGITAL_SUB_ITEMS: SubItem[] = [
  { id: "case", icon: "📱", gender: "common" },
  { id: "earphone", icon: "🎧", gender: "common" },
  { id: "charger", icon: "🔋", gender: "common" },
  { id: "laptop_bag", icon: "💻", gender: "common" },
  { id: "speaker", icon: "🔊", gender: "common" },
  { id: "camera", icon: "📸", gender: "common" },
];

const SUB_ITEMS_MAP: Record<string, SubItem[]> = {
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
  name: string;
  enName: string;
  slug: string;
  category: string; // 필터링용 카테고리
  tag?: string;     // 뱃지 (단독 등)
  initial?: string; // 초성 (자동 계산 가능하지만 편의상)
};

const ALL_BRANDS_DATA: BrandData[] = [
  { name: "이미리 스탠다드 우먼", enName: "YIMILI STANDARD WOMAN", slug: "yimili-standard", category: "의류", tag: "단독" },
  { name: "아디다스", enName: "ADIDAS", slug: "adidas", category: "스포츠/레저" },
  { name: "노스페이스", enName: "THE NORTH FACE", slug: "northface", category: "스포츠/레저" },
  { name: "뉴발란스", enName: "NEW BALANCE", slug: "newbalance", category: "신발" },
  { name: "나이키", enName: "NIKE", slug: "nike", category: "스포츠/레저" },
  { name: "리", enName: "LEE", slug: "lee", category: "의류" },
  { name: "마뗑킴", enName: "MATIN KIM", slug: "matin-kim", category: "패션소품" },
  { name: "디미트리블랙", enName: "DIMITRI BLACK", slug: "dimitri-black", category: "의류", tag: "단독" },
  { name: "엠엘비", enName: "MLB", slug: "mlb", category: "의류" },
  { name: "스파오", enName: "SPAO", slug: "spao", category: "의류" },
  { name: "코드그라피", enName: "CODEGRAPHY", slug: "codegraphy", category: "의류" },
  { name: "커버낫", enName: "COVERNAT", slug: "covernat", category: "의류" },
  { name: "푸마", enName: "PUMA", slug: "puma", category: "스포츠/레저" },
  { name: "닥터마틴", enName: "DR. MARTENS", slug: "drmartens", category: "신발" },
  { name: "반스", enName: "VANS", slug: "vans", category: "스니커즈" },
  { name: "컨버스", enName: "CONVERSE", slug: "converse", category: "스니커즈" },
  { name: "크록스", enName: "CROCS", slug: "crocs", category: "신발" },
  { name: "살로몬", enName: "SALOMON", slug: "salomon", category: "스포츠/레저" },
  { name: "아식스", enName: "ASICS", slug: "asics", category: "신발" },
  { name: "오니츠카타이거", enName: "ONITSUKA TIGER", slug: "onitsuka", category: "신발" },
  { name: "젠틀몬스터", enName: "GENTLE MONSTER", slug: "gentlemonster", category: "패션소품" },
  { name: "탬버린즈", enName: "TAMBURINS", slug: "tamburins", category: "뷰티" },
  { name: "설화수", enName: "SULWHASOO", slug: "sulwhasoo", category: "뷰티" },
  { name: "헤라", enName: "HERA", slug: "hera", category: "뷰티" },
  { name: "롬앤", enName: "ROMAND", slug: "romand", category: "뷰티" },
  { name: "삼성전자", enName: "SAMSUNG", slug: "samsung", category: "디지털/라이프" },
  { name: "소니", enName: "SONY", slug: "sony", category: "디지털/라이프" },
  { name: "애플", enName: "APPLE", slug: "apple", category: "디지털/라이프" },
  { name: "젤리캣", enName: "JELLYCAT", slug: "jellycat", category: "키즈" },
  { name: "폴로 랄프 로젠", enName: "POLO RALPH LAUREN", slug: "polo", category: "의류" },
  // ⛳️ [신규] 골프 브랜드 추가
  { name: "말본골프", enName: "Malbon Golf", slug: "malbon-golf", category: "골프" },
  { name: "지포어", enName: "G/FORE", slug: "g-fore", category: "골프" },
  { name: "타이틀리스트", enName: "Titleist", slug: "titleist", category: "골프" },
  { name: "랑방블랑", enName: "LANVIN BLANC", slug: "lanvin-blanc", category: "골프" },
  { name: "풋조이", enName: "FootJoy", slug: "footjoy", category: "골프" },
  { name: "사우스케이프", enName: "SOUTHCAPE", slug: "southcape", category: "골프" },
  { name: "피엑스지", enName: "PXG", slug: "pxg", category: "골프" },
  { name: "데상트골프", enName: "DESCENTE Golf", slug: "descente-golf", category: "골프" },
  { name: "세인트앤드류스", enName: "St.Andrews", slug: "st-andrews", category: "골프" },
  { name: "파리게이츠", enName: "Pearly Gates", slug: "pearly-gates", category: "골프" },
  { name: "마스터바니에디션", enName: "Master Bunny Edition", slug: "master-bunny-edition", category: "골프" },
  { name: "어메이징크리", enName: "AmazingCre", slug: "amazingcre", category: "골프" },
  { name: "보스골프", enName: "BOSS Golf", slug: "boss-golf", category: "골프" },
  { name: "아페쎄골프", enName: "A.P.C Golf", slug: "apc-golf", category: "골프" },
];


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

  // 🔹 [Brand Tab State]
  const [selectedBrandCategory, setSelectedBrandCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConsonant, setSelectedConsonant] = useState("인기");
  
  // 🔹 [Gender Filter State]
  const [selectedGender, setSelectedGender] = useState<"all" | "men" | "women">("all");

  // 🔒 [스크롤 잠금] 팝업이 열릴 때 백그라운드 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const currentCategoryInfo = useMemo(() => {
    return (
      CATEGORY_ITEMS.find((c) => c.id === activeCategory) ?? CATEGORY_ITEMS[0]
    );
  }, [activeCategory]);

  // 🔍 [필터 로직] 카테고리 성별 필터링
  const currentSubItems = useMemo(() => {
    const items = SUB_ITEMS_MAP[activeCategory] ?? [];
    if (selectedGender === "all") return items;
    // common은 항상 포함 + 선택된 성별
    return items.filter(
      (item) => item.gender === "common" || item.gender === selectedGender
    );
  }, [activeCategory, selectedGender]);

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
      const currentIndex = CATEGORY_ITEMS.findIndex(
        (c) => c.id === activeCategory
      );
      if (currentIndex < CATEGORY_ITEMS.length - 1) {
        setActiveCategory(CATEGORY_ITEMS[currentIndex + 1].id);
        isThrottled.current = true;
        setTimeout(() => {
          isThrottled.current = false;
        }, 100);
      }
    } else if (e.deltaY < -10) {
      // 위로 스크롤 -> 이전 카테고리
      const currentIndex = CATEGORY_ITEMS.findIndex(
        (c) => c.id === activeCategory
      );
      if (currentIndex > 0) {
        setActiveCategory(CATEGORY_ITEMS[currentIndex - 1].id);
        isThrottled.current = true;
        setTimeout(() => {
          isThrottled.current = false;
        }, 100);
      }
    }
  };

  // 🔍 [필터 로직] 브랜드 필터링
  const filteredBrands = useMemo(() => {
    let result = ALL_BRANDS_DATA;

    // 1. 카테고리 필터
    if (selectedBrandCategory !== "전체") {
      result = result.filter(
        (brand) => brand.category === selectedBrandCategory
      );
    }

    // 2. 검색어 필터
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (brand) =>
          brand.name.toLowerCase().includes(query) ||
          brand.enName.toLowerCase().includes(query)
      );
    }

    // 3. 초성/필터 탭
    if (selectedConsonant !== "인기") {
      if (selectedConsonant === "A-Z") {
        // 영문 시작
        result = result.filter((brand) => /^[A-Z]/i.test(brand.enName));
      } else if (selectedConsonant === "0-9") {
        // 숫자 시작
        result = result.filter((brand) => /^[0-9]/.test(brand.name) || /^[0-9]/.test(brand.enName));
      } else {
        // 한글 초성 (ㄱ, ㄴ, ...)
        result = result.filter((brand) => getInitialConsonant(brand.name) === selectedConsonant);
      }
    }

    return result;
  }, [selectedBrandCategory, searchQuery, selectedConsonant]);


  return (
    // 🛠️ [수정] 배경 오버레이 클릭 시 onClose 실행
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      {/* 팝업 본문 */}
      <div
        className="bg-white text-black shadow-2xl border border-gray-200 rounded-lg w-150 h-150 overflow-hidden relative flex flex-col"
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

            {selectedTab === "category" && (
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
              {/* 왼쪽 카테고리 리스트 */}
              <ul className="w-48 border-r border-gray-100 pr-4 shrink-0 space-y-1 h-full overflow-y-auto px-4 custom-scroll">
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

              {/* 오른쪽 상세 아이템 리스트 */}
              <div className="flex-1 pl-8 pr-4 h-full overflow-y-auto custom-scroll">
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
            <div className="flex h-full">
              {/* 1. Left Sidebar (Brand Categories) */}
              <ul className="w-40 border-r border-gray-100 shrink-0 h-full overflow-y-auto bg-gray-50 text-sm font-medium text-gray-500 custom-scroll">
                {[
                  "전체",
                  "의류",
                  "골프", // 뷰티 -> 골프 교체
                  "신발",
                  "스니커즈",
                  "가방",
                  "패션소품",
                  "속옷/홈웨어",
                  "스포츠/레저",
                  "디지털/라이프",
                  "키즈",
                ].map((cat) => (
                  <li
                    key={cat}
                    onClick={() => setSelectedBrandCategory(cat)}
                    className={`cursor-pointer px-5 py-3 hover:bg-white hover:text-black hover:font-bold transition-colors ${
                      selectedBrandCategory === cat
                        ? "bg-white text-black font-bold"
                        : ""
                    }`}
                  >
                    {cat}
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
                  
                  {/* (옵션) 하트 필터 아이콘 - 현재는 기능 없음 */}
                  <span className="text-gray-400 cursor-pointer shrink-0">
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
                    브랜드 <span className="text-gray-300">|</span> {filteredBrands.length}개
                  </div>

                  {filteredBrands.length === 0 ? (
                    <div className="text-center text-gray-400 py-10">
                      검색 결과가 없습니다.
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredBrands.map((brand, idx) => (
                        <Link
                          key={idx}
                          href={buildBrandHref(brand.slug, "A")}
                          onClick={onClose}
                          className="flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            {/* Brand Logo Placeholder */}
                            <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center bg-gray-50 text-[10px] text-gray-400 font-bold overflow-hidden shrink-0">
                              {/* In a real app, use <Image> */}
                              {brand.slug === "yimili-standard" ? (
                                <span className="text-black">YIMILI</span>
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
