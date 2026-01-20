// src/app/[locale]/(site)/orders/cart/page.tsx

"use client";

import { useTranslations } from "next-intl";

import Image from "next/image";

// 더미 데이터: 내가 전에 보고 놓쳤던 상품
const RECENT_ITEMS = [
  {
    id: 1,
    brand: "노매뉴얼",
    name: "N.R HOODIE - BLACK",
    price: 57600,
    originalPrice: 96000,
    discount: 40,
    image:
      "https://image.msscdn.net/images/goods_img/20230823/3476831/3476831_16927598863674_500.jpg",
  },
  {
    id: 2,
    brand: "디키즈",
    name: "더블니 코듀로이 워크팬츠 Black",
    price: 95200,
    originalPrice: 119000,
    discount: 20,
    image:
      "https://image.msscdn.net/images/goods_img/20230906/3534597/3534597_16939634720973_500.jpg",
  },
  {
    id: 3,
    brand: "디키즈",
    name: "트윌 워크 재킷 Black",
    price: 169100,
    originalPrice: 199000,
    discount: 15,
    image:
      "https://image.msscdn.net/images/goods_img/20230906/3534608/3534608_16939639735998_500.jpg",
  },
  {
    id: 4,
    brand: "위크온바디오프",
    name: "[기모/사계절] 릴랙스 세미 와이드 ...",
    price: 39800,
    originalPrice: 66000,
    discount: 40,
    image:
      "https://image.msscdn.net/images/goods_img/20230911/3547167/3547167_16944136979603_500.jpg",
    optionSeparate: true,
  },
  {
    id: 5,
    brand: "디키즈",
    name: "워시드 배너 로고 볼캡 Navy",
    price: 49000,
    originalPrice: 0,
    discount: 0,
    image:
      "https://image.msscdn.net/images/goods_img/20230828/3488836/3488836_16931888494498_500.jpg",
  },
  {
    id: 6,
    brand: "디키즈",
    name: "42283 루즈핏 워크쇼츠 Olive...",
    price: 55000,
    originalPrice: 0,
    discount: 0,
    image:
      "https://image.msscdn.net/images/goods_img/20210517/1954133/1954133_1_500.jpg",
  },
];

// 더미 데이터: 추천 아이템
const RECOMMENDED_ITEMS = [
  {
    id: 7,
    brand: "브렌슨",
    name: "(Renew Ver.) 원턱 와이드 스웨트...",
    price: 29900,
    originalPrice: 39900,
    discount: 20,
    image:
      "https://image.msscdn.net/images/goods_img/20210826/2093554/2093554_2_500.jpg",
    optionSeparate: true,
  },
  {
    id: 8,
    brand: "혼다 모터사이클",
    name: "Vintage Cutoff Hoodie Spray...",
    price: 76300,
    originalPrice: 109000,
    discount: 30,
    image:
      "https://image.msscdn.net/images/goods_img/20230914/3558231/3558231_16946761565578_500.jpg",
  },
  {
    id: 9,
    brand: "미즈노",
    name: "LIGHT PADDING MTM_32YE46...",
    price: 104300,
    originalPrice: 149000,
    discount: 30,
    image:
      "https://image.msscdn.net/images/goods_img/20230822/3474327/3474327_16926838848464_500.jpg",
  },
  {
    id: 10,
    brand: "혼다 모터사이클",
    name: "Logo Artwork Sweat Pants...",
    price: 62300,
    originalPrice: 89000,
    discount: 30,
    image:
      "https://image.msscdn.net/images/goods_img/20230821/3472099/3472099_16925828453472_500.jpg",
  },
  {
    id: 11,
    brand: "혼다 모터사이클",
    name: "Honda Small Wing Rivet poi...",
    price: 76300,
    originalPrice: 109000,
    discount: 30,
    image:
      "https://image.msscdn.net/images/goods_img/20230821/3472064/3472064_16925821544259_500.jpg",
  },
  {
    id: 12,
    brand: "혼다 모터사이클",
    name: "Honda Wing logo Short...",
    price: 139300,
    originalPrice: 199000,
    discount: 30,
    image:
      "https://image.msscdn.net/images/goods_img/20230821/3472052/3472052_16925816947231_500.jpg",
  },
];

export default function CartPage() {
  const t = useTranslations("cart");

  // 숫자 포맷터 (예: 1,000)
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    // 전체 배경은 흰색, 내용은 중앙 정렬
    <div className="min-h-screen bg-white flex justify-center">
      {/* 마이페이지와 동일한 960px 너비 적용 (여백 일치) */}
      <div className="w-full max-w-[960px] bg-[#F9F9F9] min-h-screen pb-[100px] relative shadow-sm">
        {/* 🛠️ [수정] pt-10 -> pt-3 (타이틀을 더 위쪽으로 올림) */}
        <div className="px-4 pt-3">
          {/* 1. 상단 타이틀 */}
          <h1 className="text-[18px] font-bold text-black mb-6">
            {t("title")}
          </h1>

          {/* 2. 상단 배너 */}
          <div className="w-full h-[100px] bg-white border border-[#E5E5E5] mb-10 flex items-center justify-between px-8 overflow-hidden relative">
            <div className="z-10">
              <p className="text-[16px] font-bold text-black">
                {t("banner.title")}
              </p>
              <p className="text-[13px] text-[#666]">{t("banner.subtitle")}</p>
            </div>
            {/* 배너 이미지 (우측) */}
            <div className="w-[180px] h-full relative">
              <div className="absolute inset-y-0 right-0 w-full bg-gray-200">
                <Image
                  src="https://image.msscdn.net/images/goods_img/20230823/3476831/3476831_16927598863674_500.jpg"
                  alt="banner"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
            </div>
          </div>

          {/* 3. 장바구니 비어있음 영역 */}
          <div className="flex flex-col items-center justify-center py-20 mb-16">
            <p className="text-[14px] font-bold text-black mb-4">
              {t("empty_message")}
            </p>
            <button className="px-4 py-2 bg-white border border-[#E5E5E5] text-[12px] font-medium text-black rounded-[3px] hover:bg-gray-50 transition-colors">
              {t("view_liked_items")}
            </button>
          </div>

          {/* 4. 내가 전에 보고 놓쳤던 상품 다시보기 */}
          <div className="mb-16">
            <h2 className="text-[16px] font-bold text-black mb-4">
              {t("recently_viewed_title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-8">
              {RECENT_ITEMS.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  t={t}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </div>

          {/* 5. 스포티 스타일 브랜드 아이템 추천 */}
          <div className="mb-20">
            <h2 className="text-[16px] font-bold text-black mb-4">
              {t("recommended_title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-8">
              {RECOMMENDED_ITEMS.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  t={t}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 6. 하단 고정 버튼 */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#E5E5E5] p-4 flex justify-center z-50">
          <button className="w-full max-w-[960px] h-[56px] bg-black text-white text-[16px] font-bold rounded-[3px] hover:bg-[#333] transition-colors">
            {t("continue_shopping")}
          </button>
        </div>
      </div>
    </div>
  );
}

// 개별 상품 카드 컴포넌트
function ProductCard({
  item,
  t,
  formatPrice,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  formatPrice: (price: number) => string;
}) {
  return (
    <div className="flex flex-col group cursor-pointer">
      <div className="relative w-full aspect-[3/4] mb-3 bg-gray-100 overflow-hidden rounded-[4px]">
        {/* 상품 이미지 */}
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* 하트 아이콘 */}
        <div className="absolute bottom-2 right-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6 drop-shadow-md"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
      </div>

      {/* 브랜드 */}
      <p className="text-[11px] font-bold text-black mb-1 truncate">
        {item.brand}
      </p>

      {/* 상품명 */}
      <p className="text-[12px] text-black leading-tight mb-2 line-clamp-2 h-[32px]">
        {item.name}
      </p>

      {/* 가격 정보 */}
      <div className="mt-auto">
        {item.discount > 0 ? (
          <div className="flex flex-col">
            {/* 할인율 + 할인가 */}
            <div className="flex items-center gap-1">
              <span className="text-[13px] font-bold text-[#FF0000]">
                {item.discount}%
              </span>
              <span className="text-[13px] font-bold text-black">
                {formatPrice(item.price)}
                {t("unit_won")}
              </span>
            </div>
            {/* 정가 (취소선) */}
            <span className="text-[11px] text-[#AAAAAA] line-through">
              {formatPrice(item.originalPrice)}
              {t("unit_won")}
            </span>
          </div>
        ) : (
          <span className="text-[13px] font-bold text-black">
            {formatPrice(item.price)}
            {t("unit_won")}
          </span>
        )}

        {/* 옵션비 별도 뱃지 (있을 경우만) */}
        {item.optionSeparate && (
          <p className="text-[10px] text-[#999] mt-1">
            {t("option_fee_separate")}
          </p>
        )}
      </div>
    </div>
  );
}
