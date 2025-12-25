"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();

  // 1. 배너 슬라이드 데이터
  const bannerSlides = [
    {
      id: 1,
      left: {
        img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1600&auto=format&fit=crop",
        title: "요즘 방한 <br /> 슈즈 트렌드",
        desc: "어그, 23.65 외",
        bgColor: "bg-gray-200",
      },
      center: {
        img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop",
        title: "키즈 크리스마스 위크",
        subTitle: "인기 선물 특가",
        desc: "최대 80% 할인",
        bgColor: "bg-[#A40000]",
        overlayColor: "bg-[#A40000]/20",
      },
      right: {
        img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop",
        title: "스포츠위크",
        subTitle: "2만원으로 만나는 <br/> 스포츠 럭키 박스",
        desc: "인기 운동 용품 당첨의 기회",
        bgColor: "bg-[#5D85C3]",
        overlayColor: "bg-[#5D85C3]/20",
      },
    },
    {
      id: 2,
      left: {
        img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1600&auto=format&fit=crop",
        title: "24 F/W <br /> 시즌 오프 시작",
        desc: "최대 80% 할인 혜택",
        bgColor: "bg-gray-800",
      },
      center: {
        img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
        title: "럭셔리 부티크",
        subTitle: "하이엔드 컬렉션",
        desc: "매일 업데이트 되는 신상",
        bgColor: "bg-black",
        overlayColor: "bg-black/20",
      },
      right: {
        img: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?q=80&w=800&auto=format&fit=crop",
        title: "뷰티 어워즈",
        subTitle: "올해 가장 사랑받은 <br/> 뷰티 아이템",
        desc: "단독 특가 진행 중",
        bgColor: "bg-pink-600",
        overlayColor: "bg-pink-600/20",
      },
    },
  ];

  // 2. 슬라이드 상태 관리
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? bannerSlides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === bannerSlides.length - 1 ? 0 : prev + 1
    );
  };

  // 🛠️ [신규] 상단 배너 바로가기 데이터 (사진 참고)
  const topShortcutBanners = [
    {
      id: 1,
      title: "화심주조 미라온",
      bg: "bg-[#EAE5DD]",
      img: "https://images.unsplash.com/photo-1563911892437-1cda75894b0d?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 2,
      title: "스노우피크 15% 쿠폰",
      bg: "bg-[#DDE4EA]",
      img: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 3,
      title: "키즈 크리스마스 위크",
      bg: "bg-[#EAE0DD]",
      img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 4,
      title: "뷰티 30% 쿠폰",
      bg: "bg-[#EADCD9]",
      img: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?auto=format&fit=crop&w=100&q=80",
      badge: "30%",
    },
    {
      id: 5,
      title: "스포츠 최대 20% 쿠폰",
      bg: "bg-[#DDE6EA]",
      img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 6,
      title: "카비시 x 킥플립 동화",
      bg: "bg-[#EAE5DD]",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 7,
      title: "2025 슈즈 리포트",
      bg: "bg-[#E2E2E8]",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80",
    },
  ];

  // 🛠️ [신규] 하단 아이콘 바로가기 데이터 (사진 참고)
  const bottomShortcutIcons = [
    {
      id: 1,
      title: "유즈드 라스트 찬스 쿠폰",
      icon: "🎫",
      bg: "bg-yellow-100",
    },
    { id: 2, title: "무신사 AI 포토부스", icon: "🤖", bg: "bg-blue-100" },
    { id: 3, title: "100원 래플 x 투썸", icon: "🍰", bg: "bg-red-50" },
    { id: 4, title: "최저가 보상제", icon: "💰", bg: "bg-orange-50" },
    { id: 5, title: "매일 아울렛 입고", icon: "🧥", bg: "bg-orange-100" },
    { id: 6, title: "최대 8% 적립", icon: "M", bg: "bg-black text-white" },
    { id: 7, title: "타임세일", icon: "⏰", bg: "bg-gray-100" },
    { id: 8, title: "라이브", icon: "📺", bg: "bg-gray-100" },
    { id: 9, title: "무신사 월간 랭킹", icon: "🏆", bg: "bg-yellow-50" },
    { id: 10, title: "체험단", icon: "🧢", bg: "bg-blue-50" },
  ];

  // 더미 데이터: 상품 목록 (10개로 증가)
  const products = [
    {
      id: 1,
      brand: "넌블랭크",
      name: "세미 와이드 핏 슬랙스_DARK BROWN",
      price: "53,100원",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      brand: "어반드레스",
      name: "125CM 슈퍼 롱 오버핏 더블 코트",
      price: "79,900원",
      discount: "58%",
      img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      brand: "조셉트",
      name: "PAUL BLACK",
      price: "99,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1614252235316-06f87760bca8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      brand: "마인드브릿지",
      name: "[루즈핏 선택]투구_테이퍼드 밴딩 슬랙스 - 5color",
      price: "39,900원",
      discount: "50%",
      img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      brand: "데꼬로소",
      name: "시에르 피크드 더블 오버핏 자켓 [브라운]",
      price: "141,550원",
      discount: "29%",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      brand: "넌블랭크",
      name: "[SET UP] 세미 오버핏 자켓 COAL GREY",
      price: "178,200원",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1551488852-d81a2506e3df?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      brand: "인사일런스",
      name: "솔리스트 오버사이즈 캐시미어 코트 BLACK",
      price: "289,000원",
      discount: "15%",
      img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      brand: "닥터마틴",
      name: "1461 모노 3홀 블랙",
      price: "210,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      brand: "드로우핏",
      name: "오버사이즈 울 트렌치 코트 [BEIGE]",
      price: "228,000원",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1520975661595-64536ef86809?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      brand: "토피",
      name: "와이드 데님 팬츠 (LIGHT BLUE)",
      price: "49,000원",
      discount: "12%",
      img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="bg-white min-h-screen text-black">
      {/* 2. Hero Section (Slider) */}
      <section className="relative group bg-gray-100 overflow-hidden h-100 md:h-125">
        {/* 화살표 버튼 */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* 슬라이드 컨테이너 */}
        <div
          className="h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerSlides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full h-full grid grid-cols-1 md:grid-cols-4"
            >
              {/* 왼쪽 */}
              <div
                className={`md:col-span-2 relative ${slide.left.bgColor} overflow-hidden cursor-pointer group/item`}
              >
                <img
                  src={slide.left.img}
                  alt={slide.left.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-8 left-8 text-white z-10 drop-shadow-md">
                  <h2
                    className="text-3xl font-bold leading-tight mb-2"
                    dangerouslySetInnerHTML={{ __html: slide.left.title }}
                  />
                  <p className="text-sm font-medium opacity-90">
                    {slide.left.desc}
                  </p>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* 중앙 */}
              <div
                className={`md:col-span-1 relative ${slide.center.bgColor} overflow-hidden cursor-pointer group/item`}
              >
                <img
                  src={slide.center.img}
                  alt={slide.center.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/item:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-8 left-6 right-6 text-white z-10">
                  <h2 className="text-2xl font-bold leading-snug mb-1">
                    {slide.center.title}
                  </h2>
                </div>
                <div className="absolute bottom-8 left-6 text-white z-10">
                  <h3
                    className="text-lg font-bold mb-1"
                    dangerouslySetInnerHTML={{ __html: slide.center.subTitle! }}
                  />
                  <p className="text-xs opacity-80">{slide.center.desc}</p>
                </div>
                <div
                  className={`absolute inset-0 ${slide.center.overlayColor} pointer-events-none`}
                />
              </div>
              {/* 오른쪽 */}
              <div
                className={`md:col-span-1 relative ${slide.right.bgColor} overflow-hidden cursor-pointer group/item`}
              >
                <img
                  src={slide.right.img}
                  alt={slide.right.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-8 left-6 text-white z-10">
                  <h2 className="text-xl font-bold">{slide.right.title}</h2>
                </div>
                <div className="absolute bottom-8 left-6 text-white z-10">
                  <h3
                    className="text-lg font-bold leading-tight mb-1"
                    dangerouslySetInnerHTML={{ __html: slide.right.subTitle! }}
                  />
                  <p className="text-xs opacity-80">{slide.right.desc}</p>
                </div>
                <div
                  className={`absolute inset-0 ${slide.right.overlayColor} pointer-events-none`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Shortcut Banners & Icons (Menu) - 사진 디자인 적용 */}
      <section className="container mx-auto px-4 py-8 border-b border-gray-100">
        {/* 상단 배너형 바로가기 (가로 스크롤) */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide mb-2">
          {topShortcutBanners.map((banner) => (
            <div
              key={banner.id}
              className={`min-w-70 h-25 ${banner.bg} rounded-md relative cursor-pointer overflow-hidden group shrink-0`}
            >
              {/* 이미지 */}
              <img
                src={banner.img}
                alt={banner.title}
                className="absolute right-4 bottom-0 w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
              />
              {/* 텍스트 */}
              <div className="absolute top-4 left-4 z-10">
                <h3 className="font-bold text-sm text-gray-800 leading-tight w-32 break-keep">
                  {banner.title}
                </h3>
              </div>
              {/* 뱃지 (옵션) */}
              {banner.badge && (
                <div className="absolute top-0 right-4 bg-red-500 text-white text-[10px] px-1.5 py-0.5 font-bold rounded-b-sm">
                  {banner.badge}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 하단 아이콘형 바로가기 (가로 스크롤) */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {bottomShortcutIcons.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 min-w-max border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:border-black transition-colors shrink-0"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${item.bg}`}
              >
                {item.icon}
              </div>
              <span className="text-xs font-bold text-gray-800">
                {item.title}
              </span>
            </div>
          ))}
          {/* 서비스 전체보기 버튼 */}
          <div className="flex items-center gap-2 min-w-max border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:border-black transition-colors shrink-0 bg-gray-50">
            <span className="text-gray-500 text-lg">≡</span>
            <span className="text-xs font-bold text-gray-800">
              서비스 전체보기
            </span>
          </div>
        </div>
      </section>

      {/* 4. Product Grid (사진 디자인 적용) */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{t("rankingTitle")}</h2>
          <Link
            href="#"
            className="text-xs text-gray-500 hover:text-black underline decoration-gray-300"
          >
            {t("viewAll")}
          </Link>
        </div>

        {/* 🛠️ [수정] 그리드 디자인: md:grid-cols-5로 변경하여 한 줄에 5개 표시 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer flex flex-col"
            >
              {/* 이미지 영역 */}
              <div className="relative w-full bg-[#f4f4f4] mb-3 overflow-hidden">
                <div className="aspect-3/4">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* 하트 아이콘 (우측 하단) */}
                <button className="absolute right-2 bottom-2 text-white/70 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 fill-transparent hover:fill-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </button>
              </div>

              {/* 정보 영역 */}
              <div className="px-1">
                <div className="text-[11px] font-bold text-black mb-1 truncate">
                  {product.brand}
                </div>
                <div className="text-[13px] text-gray-700 leading-tight mb-2 line-clamp-2 h-[2.4em]">
                  {product.name}
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  {product.discount && (
                    <span className="text-red-600 font-bold">
                      {product.discount}
                    </span>
                  )}
                  <span className="font-bold text-black">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Brand Focus Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">{t("brandFocusTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-video bg-gray-200 relative group overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover"
                alt="Brand Lookbook"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  {t("lookbook")}
                </span>
              </div>
            </div>
            <div className="aspect-video bg-gray-200 relative group overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover"
                alt="Special Offer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  {t("specialOffer")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
