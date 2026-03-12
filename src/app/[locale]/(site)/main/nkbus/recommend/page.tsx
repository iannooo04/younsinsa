// src/app/[locale]/(site)/main/recommend/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getPublicMainDisplayGroupsAction, getDisplayGroupProductsAction } from "@/actions/product-display-actions";
import BrandLogoGrid from "@/components/common/BrandLogoGrid";
import { getFeaturedBrandsAction } from "@/actions/brand-actions";

interface ProductItem {
  id: string;
  image: string;
  brandName: string;
  name: string;
  price: number;
  consumerPrice: number;
  discountRate: number;
}

interface DisplayGroup {
    id: number;
    name: string;
    description: string | null;
    products: ProductItem[];
}

export default function HomePage() {
  const t = useTranslations("home");
  const [displayGroups, setDisplayGroups] = useState<DisplayGroup[]>([]);
  const [brands, setBrands] = useState<Awaited<ReturnType<typeof getFeaturedBrandsAction>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        setLoading(true);
        // Fetch Brands
        const fetchedBrands = await getFeaturedBrandsAction();
        setBrands(fetchedBrands);

        // Fetch Display Groups
        const groupsRes = await getPublicMainDisplayGroupsAction('PC');
        
        if (groupsRes.success && groupsRes.groups.length > 0) {
            const groupsWithProducts = await Promise.all(
                groupsRes.groups.map(async (group) => {
                    const prodRes = await getDisplayGroupProductsAction(group.id);
                    return {
                        id: group.id,
                        name: group.name,
                        description: group.description,
                        products: prodRes.success ? prodRes.products : []
                    };
                })
            );
            setDisplayGroups(groupsWithProducts);
        } else {
            // Removed fallback that generated "실시간 랭킹"
            setDisplayGroups([]);
        }
        setLoading(false);
    }
    fetchData();
  }, [t]);

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
        img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop",
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
      img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=100&q=80",
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
      img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=100&q=80",
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
    { id: 2, title: "이미리 AI 포토부스", icon: "🤖", bg: "bg-blue-100" },
    { id: 3, title: "100원 래플 x 투썸", icon: "🍰", bg: "bg-red-50" },
    { id: 4, title: "최저가 보상제", icon: "💰", bg: "bg-orange-50" },
    { id: 5, title: "매일 아울렛 입고", icon: "🧥", bg: "bg-orange-100" },
    { id: 6, title: "최대 8% 적립", icon: "M", bg: "bg-black text-white" },
    { id: 7, title: "타임세일", icon: "⏰", bg: "bg-gray-100" },
    { id: 8, title: "라이브", icon: "📺", bg: "bg-gray-100" },
    { id: 9, title: "이미리 월간 랭킹", icon: "🏆", bg: "bg-yellow-50" },
    { id: 10, title: "체험단", icon: "🧢", bg: "bg-blue-50" },
  ];

  // 3. 필터링 로직
  const searchParams = useSearchParams();
  const gf = searchParams.get("gf") || "A";

  const filteredGroups = useMemo(() => {
    if (gf === "A") return displayGroups;
    return displayGroups.map(group => ({
        ...group,
        products: group.products.filter(_p => {
            // Since we don't have gender in ProductItem anymore, we might need to add it 
            // OR just skip filtering for now. 
            // For now, let's keep it simple and skip gender-specific filtering if data doesn't provide it.
            return true;
        })
    }));
  }, [gf, displayGroups]);

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
                <Image
                  src={slide.left.img}
                  alt={slide.left.title}
                  fill
                  className="object-cover group-hover/item:scale-105 transition-transform duration-700"
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
                <Image
                  src={slide.center.img}
                  alt={slide.center.title}
                  fill
                  className="object-cover opacity-90 group-hover/item:scale-105 transition-transform duration-700"
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
                <Image
                  src={slide.right.img}
                  alt={slide.right.title}
                  fill
                  className="object-cover group-hover/item:scale-105 transition-transform duration-700"
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
              <div className="absolute right-4 bottom-0 w-24 h-24 group-hover:scale-110 transition-transform duration-300 relative">
                  <Image
                    src={banner.img}
                    alt={banner.title}
                    fill
                    className="object-contain"
                  />
              </div>
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

      {/* 4. Featured Brands Grid */}
      <section className="container mx-auto px-4 py-8 border-b border-gray-100">
         <div className="mb-6 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-gray-900 mb-1">인기 브랜드</h3>
            <p className="text-sm text-gray-500">지금 가장 사랑받는 브랜드를 만나보세요</p>
         </div>
         <BrandLogoGrid brands={brands} />
      </section>

      {/* 5. Product Display Groups */}
      {loading ? (
        <div className="container mx-auto px-4 py-20 text-center text-gray-400">
           {t("loading") || "Loading..."}
        </div>
      ) : (
        filteredGroups.map((group) => (
          <section key={group.id} className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">{group.name}</h2>
                {group.description && <p className="text-xs text-gray-400 mt-1">{group.description}</p>}
              </div>
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-black underline decoration-gray-300"
              >
                {t("viewAll")}
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-10">
              {group.products.map((product) => (
                <div key={product.id} className="group cursor-pointer flex flex-col">
                  {/* 이미지 영역 */}
                  <div className="relative w-full bg-[#f4f4f4] mb-3 overflow-hidden">
                    <div className="aspect-3/4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* 하트 아이콘 */}
                    <button className="absolute right-2 bottom-2 text-white/70 hover:text-white transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 fill-transparent hover:fill-white"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    </button>
                  </div>

                  {/* 정보 영역 */}
                  <div className="px-1">
                    <div className="text-[11px] font-bold text-black mb-1 truncate">
                      {product.brandName}
                    </div>
                    <div className="text-[13px] text-gray-700 leading-tight mb-2 line-clamp-2 h-[2.4em]">
                      {product.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      {product.discountRate > 0 && (
                        <span className="text-red-600 font-bold">
                          {product.discountRate}%
                        </span>
                      )}
                      <span className="font-bold text-black">{product.price.toLocaleString()}원</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      )}

      {/* 5. Brand Focus Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">{t("brandFocusTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-video bg-gray-200 relative group overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&w=800&q=80"
                fill
                className="object-cover"
                alt="Brand Lookbook"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  {t("lookbook")}
                </span>
              </div>
            </div>
            <div className="aspect-video bg-gray-200 relative group overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
                fill
                className="object-cover"
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
