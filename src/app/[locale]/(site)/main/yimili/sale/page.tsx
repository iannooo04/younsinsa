"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// =============================================================================
// [공통 컴포넌트]
// =============================================================================

// 1. 섹션 헤더 (타이틀 + 타이머 + 더보기)
const SectionHeader = ({
  title,
  timer,
  hasMore = false,
}: {
  title: string;
  timer?: string;
  hasMore?: boolean;
}) => (
  <div className="flex justify-between items-end mb-4 mt-12 first:mt-0 border-b border-black pb-3 px-4">
    <div className="flex items-center gap-3">
      <h2 className="text-[20px] font-bold text-black">{title}</h2>
      {timer && (
        <span className="text-[20px] font-bold text-red-600">{timer}</span>
      )}
    </div>
    {hasMore && (
      <Link
        href="#"
        className="text-[12px] text-gray-500 hover:text-black hover:underline"
      >
        더보기
      </Link>
    )}
  </div>
);

// 2. 필터 칩 (회색 버튼 리스트)
const FilterChips = ({
  items,
  activeItem,
}: {
  items: string[];
  activeItem?: string;
}) => (
  <div className="flex flex-wrap gap-1 mb-4 px-4">
    {items.map((item, idx) => (
      <button
        key={idx}
        className={`px-3 py-1.5 text-[12px] border rounded-[2px] transition-colors ${item === activeItem || (idx === 0 && !activeItem)
            ? "bg-black text-white border-black font-bold"
            : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-black"
          }`}
      >
        {item}
      </button>
    ))}
  </div>
);

// 3. 파란색 배너
const BlueBanner = ({ text }: { text: string }) => (
  <div className="w-full bg-[#0055FF] text-white text-[13px] font-bold py-3 px-4 mb-6 rounded-[2px] mx-4 box-border max-w-[calc(100%-32px)]">
    {text}
  </div>
);

// 4. 상품 카드
interface ProductProps {
  id: number;
  brand: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  isLimited?: boolean; // 한정수량 여부
  stockLeft?: number; // 남은 수량
  totalStock?: number; // 전체 수량
  tags?: string[];
  gender: string;
}

const ProductCard = ({ item }: { item: ProductProps }) => {
  const formatPrice = (n: number) =>
    n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="flex flex-col group cursor-pointer">
      <div className="relative w-full aspect-[3/4] bg-gray-100 mb-3 overflow-hidden rounded-[4px]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.isLimited && (
          <div className="absolute bottom-0 left-0 bg-red-600 text-white text-[10px] px-1.5 py-0.5 font-bold">
            한정수량
          </div>
        )}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* 하트 아이콘 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-white drop-shadow-md"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
        </div>
      </div>

      <p className="text-[11px] font-bold text-black mb-1 truncate">
        {item.brand}
      </p>
      <p className="text-[12px] text-black leading-tight mb-2 line-clamp-2 h-[32px]">
        {item.name}
      </p>

      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-[14px] font-bold text-red-600">
          {item.discount}%
        </span>
        <span className="text-[14px] font-bold text-black">
          {formatPrice(item.price)}원
        </span>
      </div>

      {item.originalPrice > 0 && (
        <span className="text-[11px] text-gray-400 line-through mb-2">
          {formatPrice(item.originalPrice)}원
        </span>
      )}

      {/* 한정 수량 게이지 바 */}
      {item.isLimited &&
        item.stockLeft !== undefined &&
        item.totalStock !== undefined && (
          <div className="mt-1">
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-red-600"
                style={{
                  width: `${(item.stockLeft / item.totalStock) * 100}%`,
                }}
              ></div>
            </div>
            <div className="flex items-center gap-1 text-[10px]">
              <span className="text-red-600 font-bold">
                {item.stockLeft}개 남음
              </span>
              <span className="text-gray-400">/ {item.totalStock}개</span>
            </div>
          </div>
        )}

      {/* 태그 */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex gap-1 mt-2">
          {item.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-100 text-[10px] text-gray-600 px-1 py-0.5 rounded-[2px]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// [더미 데이터]
// =============================================================================

const LIMITED_ITEMS = [
  {
    id: 1,
    brand: "플랙",
    name: "런업 X 플랙 하프 집업 스웨트셔츠 라이트 그레이",
    price: 15800,
    originalPrice: 79000,
    discount: 80,
    image:
      "https://image.msscdn.net/images/goods_img/20230823/3476831/3476831_16927598863674_500.jpg",
    isLimited: true,
    stockLeft: 75,
    totalStock: 100,
    gender: "M",
  },
  {
    id: 2,
    brand: "우알롱",
    name: "Dynamic balloon over hoodie - MELANGE WHITE",
    price: 17400,
    originalPrice: 89000,
    discount: 80,
    image:
      "https://image.msscdn.net/images/goods_img/20230906/3534597/3534597_16939634720973_500.jpg",
    isLimited: true,
    stockLeft: 30,
    totalStock: 85,
    gender: "M",
  },
  {
    id: 3,
    brand: "게인스보로",
    name: "골든로고 조거팬츠_화이트멜란지",
    price: 18900,
    originalPrice: 69000,
    discount: 73,
    image:
      "https://image.msscdn.net/images/goods_img/20230906/3534608/3534608_16939639735998_500.jpg",
    isLimited: true,
    stockLeft: 83,
    totalStock: 100,
    gender: "M",
  },
  {
    id: 4,
    brand: "키뮤어",
    name: "릴렉스드 세미 크롭 맨투맨_오트밀",
    price: 13800,
    originalPrice: 69000,
    discount: 80,
    image:
      "https://image.msscdn.net/images/goods_img/20240124/3817429/3817429_17060773995878_500.jpg",
    isLimited: true,
    stockLeft: 127,
    totalStock: 230,
    gender: "M",
  },
  {
    id: 5,
    brand: "우알롱",
    name: "Washing curve pocket wide denim pants - GREY",
    price: 25350,
    originalPrice: 169000,
    discount: 85,
    image:
      "https://image.msscdn.net/images/goods_img/20230830/3509930/3509930_16933588229986_500.jpg",
    isLimited: true,
    stockLeft: 103,
    totalStock: 153,
    gender: "M",
  },
  {
    id: 6,
    brand: "트릴리온",
    name: "페인티드 체크 레이어드 후드 셔츠",
    price: 11960,
    originalPrice: 59000,
    discount: 80,
    image:
      "https://image.msscdn.net/images/goods_img/20230913/3555986/3555986_16945892837279_500.jpg",
    isLimited: true,
    stockLeft: 25,
    totalStock: 50,
    gender: "M",
  },
];

const DAILY_ITEMS = [
  {
    id: 11,
    brand: "브랜슨",
    name: "(Renew Ver.) 원턱 와이드 스웨트 팬츠 ( 8Color ) ( 기모선택 )",
    price: 26990,
    originalPrice: 37900,
    discount: 28,
    image:
      "https://image.msscdn.net/images/goods_img/20210902/2105676/2105676_4_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 12,
    brand: "트릴리온",
    name: "바이오스톤 워싱 와이드 데님 팬츠 (BLUE GRAY)",
    price: 27990,
    originalPrice: 54000,
    discount: 48,
    image:
      "https://image.msscdn.net/images/goods_img/20220222/2376605/2376605_1_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 13,
    brand: "디미트리블랙",
    name: "ASI 2WAY 어센틱 후드 윈드브레이커 자켓_블랙",
    price: 39890,
    originalPrice: 89000,
    discount: 54,
    image:
      "https://image.msscdn.net/images/goods_img/20230220/3089602/3089602_16768727823469_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 14,
    brand: "토피",
    name: "더블 사이드 라인 트랙 버티컬 팬츠 (BROWN)",
    price: 30700,
    originalPrice: 64000,
    discount: 52,
    image:
      "https://image.msscdn.net/images/goods_img/20220901/2763865/2763865_1_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 15,
    brand: "언노운 플래닛",
    name: "프론트 슬릿 데님 롱 스커트 블랙",
    price: 44880,
    originalPrice: 74800,
    discount: 40,
    image:
      "https://image.msscdn.net/images/goods_img/20230327/3181677/3181677_16798993883398_500.jpg",
    isLimited: false,
    gender: "W",
  },
];

const BRAND_WEEK_BANNERS = [
  {
    id: 1,
    title: "허그유어스킨",
    img: "https://image.msscdn.net/mfile_s01/_shopstaff/250.staff_5f4cb9366f034.jpg",
  },
  {
    id: 2,
    title: "탄산마그네슘",
    img: "https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6552e64846430.jpg",
  },
  {
    id: 3,
    title: "배드블러드",
    img: "https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_659ca23223049.jpg",
  },
];

const SEASON_OFF_ITEMS = [
  {
    id: 21,
    brand: "이미리 스탠다드",
    name: "캐시미어 블렌드 오버사이즈 싱글 코트 [블랙]",
    price: 139000,
    originalPrice: 0,
    discount: 20,
    image:
      "https://image.msscdn.net/images/goods_img/20200820/1558847/1558847_3_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 22,
    brand: "이미리 스탠다드",
    name: "캐시미어 100 머플러 [블랙]",
    price: 49900,
    originalPrice: 0,
    discount: 15,
    image:
      "https://image.msscdn.net/images/goods_img/20201026/1663445/1663445_1_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 23,
    brand: "이미리 스탠다드",
    name: "와치 캡 [블랙]",
    price: 12900,
    originalPrice: 0,
    discount: 10,
    image:
      "https://image.msscdn.net/images/goods_img/20191127/1236166/1236166_2_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 24,
    brand: "이미리 스탠다드",
    name: "캐시미어 블렌드 머플러 [그레이]",
    price: 29900,
    originalPrice: 0,
    discount: 10,
    image:
      "https://image.msscdn.net/images/goods_img/20181023/885642/885642_1_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 25,
    brand: "이미리 스탠다드",
    name: "미니 어그 부츠 [그레이]",
    price: 39900,
    originalPrice: 0,
    discount: 20,
    image:
      "https://image.msscdn.net/images/goods_img/20221012/2852899/2852899_1_500.jpg",
    isLimited: false,
    gender: "W",
  },
];

const CATEGORY_SALE_ITEMS = [
  {
    id: 31,
    brand: "폴루션",
    name: "REVERSIBLE SHRPA JACKET BROWN",
    price: 34900,
    originalPrice: 179000,
    discount: 80,
    image:
      "https://image.msscdn.net/images/goods_img/20231018/3638202/3638202_16976100523293_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 32,
    brand: "네네츠 어센틱",
    name: "CITY SNAP PULLOVER FLEECE IVORY",
    price: 50940,
    originalPrice: 84900,
    discount: 40,
    image:
      "https://image.msscdn.net/images/goods_img/20221102/2916962/2916962_1_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 33,
    brand: "피지컬가먼츠",
    name: "P9023 PCGS 후리스 집업 [블랙]",
    price: 89000,
    originalPrice: 129000,
    discount: 30,
    image:
      "https://image.msscdn.net/images/goods_img/20221013/2855239/2855239_1_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 34,
    brand: "디스이즈네버댓",
    name: "T Sherpa Fleece Jacket Grey",
    price: 135200,
    originalPrice: 169000,
    discount: 20,
    image:
      "https://image.msscdn.net/images/goods_img/20220921/2808796/2808796_1_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 35,
    brand: "고요웨어",
    name: "알로이 플리스 후디 자켓 (블랙)",
    price: 178200,
    originalPrice: 198000,
    discount: 10,
    image:
      "https://image.msscdn.net/images/goods_img/20221020/2876652/2876652_1_500.jpg",
    isLimited: false,
    gender: "M",
  },
];

const COUPON_ITEMS = [
  {
    id: 41,
    brand: "닉앤니콜",
    name: "[ESSENTIAL] USEFUL OVER SHORT PADDING",
    price: 49990,
    originalPrice: 199000,
    discount: 75,
    image:
      "https://image.msscdn.net/images/goods_img/20221110/2932970/2932970_1_500.jpg",
    isLimited: false,
    gender: "W",
  },
  {
    id: 42,
    brand: "닉앤니콜",
    name: "MINIMAL NN HIGHNECK PUFFER PADDING",
    price: 39990,
    originalPrice: 199000,
    discount: 80,
    image:
      "https://image.msscdn.net/images/goods_img/20221110/2932968/2932968_1_500.jpg",
    isLimited: false,
    gender: "W",
  },
  {
    id: 43,
    brand: "퍼스텝",
    name: "필드 다잉 루즈핏 셔츠 모스그린",
    price: 41570,
    originalPrice: 69000,
    discount: 41,
    image:
      "https://image.msscdn.net/images/goods_img/20210310/1836286/1836286_1_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 44,
    brand: "9999아카이브",
    name: "ARC cap",
    price: 35280,
    originalPrice: 49000,
    discount: 28,
    image:
      "https://image.msscdn.net/images/goods_img/20230414/3233376/3233376_16814402322313_500.jpg",
    isLimited: false,
    gender: "A",
  },
  {
    id: 45,
    brand: "시티브리즈",
    name: "울 레이어드 카라 코트_CHARCOAL",
    price: 143960,
    originalPrice: 299000,
    discount: 52,
    image:
      "https://image.msscdn.net/images/goods_img/20221025/2889240/2889240_1_500.jpg",
    isLimited: false,
    gender: "W",
  },
];

const REWARD_ITEMS = [
  {
    id: 51,
    brand: "캘빈클라인 언더웨어",
    name: "여성 아이콘 코튼 모달 AF 비키니",
    price: 23400,
    originalPrice: 39000,
    discount: 40,
    image:
      "https://image.msscdn.net/images/goods_img/20210930/2157096/2157096_1_500.jpg",
    isLimited: false,
    gender: "W",
  },
  {
    id: 52,
    brand: "캘빈클라인 언더웨어",
    name: "여성 아이콘 코튼 모달 T팬티",
    price: 31200,
    originalPrice: 39000,
    discount: 20,
    image:
      "https://image.msscdn.net/images/goods_img/20230821/3472096/3472096_16925828456885_500.jpg",
    isLimited: false,
    gender: "W",
  },
  {
    id: 53,
    brand: "캘빈클라인 언더웨어",
    name: "남성 WB 코튼 스트레치 버라이어티 팩",
    price: 43690,
    originalPrice: 93000,
    discount: 53,
    image:
      "https://image.msscdn.net/images/goods_img/20230117/3028308/3028308_16739379899380_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 54,
    brand: "마인드브릿지",
    name: "[웜]두곳_[웜]세미 와이드 밴딩 슬랙스",
    price: 35910,
    originalPrice: 79800,
    discount: 55,
    image:
      "https://image.msscdn.net/images/goods_img/20220905/2769979/2769979_1_500.jpg",
    isLimited: false,
    gender: "M",
  },
  {
    id: 55,
    brand: "퍼스텝",
    name: "[2PACK] 2pack 마일(사계절용) 벌룬 스웨트 팬츠",
    price: 58900,
    originalPrice: 89000,
    discount: 36,
    image:
      "https://image.msscdn.net/images/goods_img/20210825/2085375/2085375_1_500.jpg",
    isLimited: false,
    gender: "M",
  },
];

// =============================================================================
// [메인 페이지]
// =============================================================================
export default function YimiliSalePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 20,
    seconds: 8,
  });

  // 타이머 로직 (단순 감소)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timerString = `${String(timeLeft.hours).padStart(2, "0")}:${String(
    timeLeft.minutes
  ).padStart(2, "0")}:${String(timeLeft.seconds).padStart(2, "0")}`;

  // 🚻 필터링 로직
  const searchParams = useSearchParams();
  const gf = searchParams.get("gf") || "A";

  const filterByGf = (items: any[]) => {
    if (gf === "A") return items;
    return items.filter((item) => item.gender === gf || item.gender === "A");
  };

  const filteredLimitedItems = useMemo(
    () => filterByGf(LIMITED_ITEMS),
    [gf]
  );
  const filteredDailyItems = useMemo(() => filterByGf(DAILY_ITEMS), [gf]);
  const filteredSeasonOffItems = useMemo(
    () => filterByGf(SEASON_OFF_ITEMS),
    [gf]
  );
  const filteredCategorySaleItems = useMemo(
    () => filterByGf(CATEGORY_SALE_ITEMS),
    [gf]
  );
  const filteredCouponItems = useMemo(() => filterByGf(COUPON_ITEMS), [gf]);
  const filteredRewardItems = useMemo(() => filterByGf(REWARD_ITEMS), [gf]);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="w-full">
        {" "}
        {/* 가로 여백 제거: container mx-auto max-w-[1200px] px-4 -> w-full */}
        {/* 1. 한정수량 선착순 특가 */}
        <section className="mb-16 pt-10">
          <SectionHeader title="한정수량 선착순 특가" timer={timerString} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
            {" "}
            {/* 그리드 내부에만 여백 추가 */}
            {filteredLimitedItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
        {/* 2. 하루특가 */}
        <section className="mb-16">
          <SectionHeader title="하루특가" timer={timerString} hasMore />
          <FilterChips
            items={[
              "브랜드",
              "전체",
              "무배당발",
              "상의",
              "소품",
              "아우터",
              "바지",
              "뷰티",
              "가방",
              "스포츠/레저",
            ]}
            activeItem="전체"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
            {filteredDailyItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
        {/* 3. 브랜드위크 */}
        <section className="mb-16">
          <SectionHeader title="브랜드위크" hasMore />
          <FilterChips
            items={[
              "여성 브랜드 추천",
              "유니섹스 브랜드 추천",
              "남성 브랜드 추천",
            ]}
            activeItem="여성 브랜드 추천"
          />
          <div className="flex flex-wrap gap-2 mb-4 px-4">
            {[
              "허그유어스킨",
              "배드블러드",
              "오드스튜디오",
              "벤힛",
              "락케이크",
              "튜드먼트",
              "탄산마그네슘",
            ].map((tag, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 text-[12px] border rounded-full ${idx === 0
                    ? "border-black font-bold"
                    : "border-gray-200 text-gray-500"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="px-4">
            <div className="w-full bg-[#EBF0FF] text-[#0055FF] text-[13px] font-bold py-3 px-4 mb-6 rounded-[2px]">
              ⚡️ 최대 30% 할인 + 15% 쿠폰
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 px-4">
            {BRAND_WEEK_BANNERS.map((banner) => (
              <div
                key={banner.id}
                className="relative aspect-[16/9] bg-gray-100 rounded-[4px] overflow-hidden cursor-pointer"
              >
                <Image
                  src={banner.img}
                  alt={banner.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          {/* 브랜드 위크 하단 상품 리스트 (예시로 5개만) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
            {/* 데이터 재사용 */}
            {filteredDailyItems.slice(0, 5).map((item) => (
              <ProductCard
                key={item.id}
                item={{
                  ...item,
                  brand: "허그유어스킨",
                  name: "슬릿 플리츠 미디 스커트",
                  price: 96100,
                  discount: 19,
                }}
              />
            ))}
          </div>
        </section>
        {/* 4. 무탠다드 시즌오프 */}
        <section className="mb-16">
          <SectionHeader title="무탠다드 시즌오프" hasMore />
          <FilterChips
            items={[
              "무탠다드",
              "무탠다드 우먼",
              "무탠다드 키즈",
              "무탠다드 스포츠",
              "무탠다드 뷰티",
              "무탠다드 홈",
            ]}
            activeItem="무탠다드"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
            {filteredSeasonOffItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
        {/* 5. 지금 주목받는 카테고리 세일 */}
        <section className="mb-16">
          <SectionHeader title="지금 주목받는 카테고리 세일" />
          <FilterChips
            items={[
              "플리스",
              "경량 패딩/패딩 베스트",
              "숏패딩/숏헤비 아우터",
              "코트",
              "후드 집업",
              "카디건",
            ]}
            activeItem="플리스"
          />
          <div className="px-4">
            <BlueBanner text="인기 카테고리를 할인 가격으로" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
            {filteredCategorySaleItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
        {/* 6. 쿠폰으로 만나는 인기 추천템 */}
        <section className="mb-16">
          <SectionHeader title="쿠폰으로 만나는 인기 추천템" />
          <FilterChips
            items={[
              "전체",
              "뷰티",
              "신발",
              "상의",
              "아우터",
              "바지",
              "원피스/스커트",
              "가방",
            ]}
            activeItem="전체"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
            {filteredCouponItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
        {/* 7. 최저가 보상 */}
        <section className="mb-16">
          <SectionHeader title="최저가 보상" hasMore />
          <FilterChips
            items={[
              "전체",
              "뷰티",
              "신발",
              "상의",
              "아우터",
              "바지",
              "원피스/스커트",
              "가방",
            ]}
            activeItem="전체"
          />
          <div className="px-4">
            <BlueBanner text="이미리 최대 혜택가, 차액 적립금 보상" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
            {filteredRewardItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
