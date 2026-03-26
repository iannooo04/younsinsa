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
import { getActiveBannersAction } from "@/actions/banner-actions";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dynamicBanners, setDynamicBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        setLoading(true);
        // Fetch Brands
        const fetchedBrands = await getFeaturedBrandsAction();
        setBrands(fetchedBrands);

        // Fetch Banners
        const bannersRes = await getActiveBannersAction('home');
        if (bannersRes.success) {
            setDynamicBanners(bannersRes.banners);
        }

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
  const bannerSlides = useMemo(() => {
    if (dynamicBanners.length === 0) return [];
    
    const chunks = [];
    for (let i = 0; i < dynamicBanners.length; i += 3) {
      const left = dynamicBanners[i];
      const center = dynamicBanners[i + 1];
      const right = dynamicBanners[i + 2];
      
      chunks.push({
        id: i,
        left: left ? { img: left.pcImage, title: left.title, desc: left.description || '', link: left.linkUrl || '', bgColor: "bg-gray-800" } : { img: "", title: "", desc: "", link: "", bgColor: "bg-gray-200" },
        center: center ? { img: center.pcImage, title: center.title, subTitle: "", desc: center.description || '', link: center.linkUrl || '', bgColor: "bg-black", overlayColor: "bg-black/20" } : { img: "", title: "", subTitle: "", desc: "", link: "", bgColor: "bg-gray-200", overlayColor: "" },
        right: right ? { img: right.pcImage, title: right.title, subTitle: "", desc: right.description || '', link: right.linkUrl || '', bgColor: "bg-pink-600", overlayColor: "bg-pink-600/20" } : { img: "", title: "", subTitle: "", desc: "", link: "", bgColor: "bg-gray-200", overlayColor: "" },
      });
    }
    return chunks;
  }, [dynamicBanners]);

  // 2. 슬라이드 상태 관리
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const prevSlide = () => {
    if (bannerSlides.length <= 1) return;
    if (currentSlide <= 0) {
      setIsTransitioning(false);
      setCurrentSlide(bannerSlides.length - 1);
    } else {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const nextSlide = () => {
    if (bannerSlides.length <= 1) return;
    if (currentSlide >= bannerSlides.length) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  useEffect(() => {
    if (bannerSlides.length <= 1) return;
    if (currentSlide === bannerSlides.length) {
      // 복제된 첫 번째 슬라이드에 도달하면 애니메이션 대기 후 실제로 0번(첫 번째)으로 눈속임 이동
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 500); // Tailwind duration-500 과 동일한 시간
      return () => clearTimeout(timeout);
    }
  }, [currentSlide, bannerSlides.length]);

  // 🛠️ [신규] 배너 3초 자동 슬라이드 (오른쪽에서 왼쪽으로 무조건 한 방향 롤링)
  useEffect(() => {
    if (bannerSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= bannerSlides.length) return prev;
        setIsTransitioning(true);
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  // 🛠️ [신규] 상단 배너 바로가기 데이터 (가로 9칸 x 2줄 그리드)
  const topShortcutBanners = [
    { id: 1, title: "아디다스 와플 컬렉션", brandLogo: "adidas", bg: "bg-[#F3F3F3]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 2, title: "아디다스 × 띠그클럽", brandLogo: "adidas", bg: "bg-[#F2E5E5]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 3, title: "캘빈클라인 인더 시티", brandLogo: "CalvinKlein", bg: "bg-[#EFEAE2]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 4, title: "산리오 캐릭터즈 × 뚜오미오", brandLogo: "Sanrio", bg: "bg-[#F6E8EF]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 5, title: "팀버랜드 × 메타마운드", brandLogo: "Timberland", bg: "bg-[#EFEAE2]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 6, title: "KBO + 스타벅스", brandLogo: "STARBUCKS", bg: "bg-[#F3F3F3]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 7, title: "푸마 스프린트 매쉬", brandLogo: "PUMA", bg: "bg-[#EFEAE2]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 8, title: "팀버랜드 × 와코마리아", brandLogo: "Timberland", bg: "bg-[#F3F3F3]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 9, title: "수아레 × 패션플래닛", brandLogo: "SUARE", bg: "bg-[#F3F3F3]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 10, title: "탄산마그네슘 × 송이송이", brandLogo: "", bg: "bg-[#F2E5E5]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 11, title: "스탠리1913 × 유벤투스", brandLogo: "STANLEY", bg: "bg-[#E8F0EA]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 12, title: "인더스트 × 후디진호", brandLogo: "INDUST", bg: "bg-[#F3F3F3]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 13, title: "에어맥스 데이", brandLogo: "NIKE", bg: "bg-[#F2E5E5]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 14, title: "쿠빈 굿즈 컬렉션", brandLogo: "COSMOPOL", bg: "bg-[#EAEAEA]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 15, title: "이슬쌤의 아이 팔레트", brandLogo: "LUVUM", bg: "bg-[#E6ECEE]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 16, title: "르아브 크리에이터 컬렉션", brandLogo: "LEARVE", bg: "bg-[#EAEAEA]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 17, title: "반스 컬러이즈드 슬립온", brandLogo: "VANS", bg: "bg-[#F3F3F3]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
    { id: 18, title: "리복 클럽 C 로머", brandLogo: "Reebok", bg: "bg-[#F2E5E5]", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" },
  ];

  // 🛠️ [신규] 하단 아이콘 바로가기 데이터 (가로 11칸 그리드)
  const bottomShortcutIcons = [
    { id: 1, title: "유즈드 수수료 ↓", icon: "🍋" },
    { id: 2, title: "브랜드위크", icon: "🛍️" },
    { id: 3, title: "최대 8%적립", icon: "M" },
    { id: 4, title: "무퀴즈", icon: "🧩" },
    { id: 5, title: "무신사 월간 랭킹", icon: "👟" },
    { id: 6, title: "최저가 보상제", icon: "💰" },
    { id: 7, title: "매일 아울렛 입고", icon: "🧥" },
    { id: 8, title: "타임세일", icon: "⏰" },
    { id: 9, title: "라이브", icon: "📺" },
    { id: 10, title: "체험단", icon: "🧢" },
    { id: 11, title: "서비스 전체보기", icon: "≡" },
  ];

  // 🛠️ [신규] 나의 관심 기반 상품 추천 데이터 
  const interestBasedProducts = [
    {
      id: 1,
      brand: "디미트리블랙",
      name: "[10주년기획] ⊗ 모두의 커브드 치노 팬츠_4 COLOR",
      price: 34900,
      discount: 30,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      brand: "트릴리온",
      name: "[기획] 커브드 와이드 절개 코튼 팬츠_5color",
      price: 29800,
      discount: 31,
      image: "https://images.unsplash.com/photo-1542272604-780c96850d76?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      brand: "시그니처",
      name: "와이드 커브드 다트 코튼 팬츠[베이지]",
      price: 34900,
      discount: 34,
      image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      brand: "키유어",
      name: "커브드 와이드 코튼 팬츠_베이지 [벨트/키링 선택]",
      price: 43450,
      discount: 45,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      brand: "르아르",
      name: "커브드 코튼 치노 팬츠 [베이지]",
      price: 39900,
      discount: 5,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      brand: "인템포무드",
      name: "코튼 레이온 파라슈트 팬츠",
      price: 49900,
      discount: 32,
      image: "https://images.unsplash.com/photo-1542272604-780c96850d76?auto=format&fit=crop&w=400&q=80",
    },
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
          className={`h-full flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* 심리스(Seamless) 무한 롤링을 위해 1번 슬라이드를 맨 끝에 복제해서 붙입니다 */}
          {[...bannerSlides, ...(bannerSlides.length > 1 ? [bannerSlides[0]] : [])].map((slide, index) => (
            <div
              key={`${slide.id}-${index}`}
              className="min-w-full h-full grid grid-cols-1 md:grid-cols-4"
            >
              {/* 왼쪽 */}
              <div
                className={`md:col-span-2 relative ${slide.left.bgColor} overflow-hidden cursor-pointer group/item`}
                onClick={() => {
                  if (slide.left.link) window.open(slide.left.link, "_self");
                }}
              >
                {slide.left.img && (
                  <Image
                    src={slide.left.img}
                    alt={slide.left.title}
                    fill
                    className="object-cover group-hover/item:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute bottom-8 left-8 text-white z-10 drop-shadow-md">
                  <h2
                    className="text-3xl font-bold leading-tight mb-2"
                    dangerouslySetInnerHTML={{ __html: slide.left.title }}
                  />
                  <p className="text-sm font-medium opacity-90">
                    {slide.left.desc}
                  </p>
                </div>
              </div>
              {/* 중앙 */}
              <div
                className={`md:col-span-1 relative ${slide.center.bgColor} overflow-hidden cursor-pointer group/item`}
                onClick={() => {
                  if (slide.center.link) window.open(slide.center.link, "_self");
                }}
              >
                {slide.center.img && (
                  <Image
                    src={slide.center.img}
                    alt={slide.center.title}
                    fill
                    className="object-cover group-hover/item:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute top-8 left-6 right-6 text-white z-10 drop-shadow-md">
                  <h2 className="text-2xl font-bold leading-snug mb-1">
                    {slide.center.title}
                  </h2>
                </div>
                <div className="absolute bottom-8 left-6 text-white z-10 drop-shadow-md">
                  <h3
                    className="text-lg font-bold mb-1"
                    dangerouslySetInnerHTML={{ __html: slide.center.subTitle! }}
                  />
                  <p className="text-xs opacity-80">{slide.center.desc}</p>
                </div>
              </div>
              {/* 오른쪽 */}
              <div
                className={`md:col-span-1 relative ${slide.right.bgColor} overflow-hidden cursor-pointer group/item`}
                onClick={() => {
                  if (slide.right.link) window.open(slide.right.link, "_self");
                }}
              >
                {slide.right.img && (
                  <Image
                    src={slide.right.img}
                    alt={slide.right.title}
                    fill
                    className="object-cover group-hover/item:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute top-8 left-6 text-white z-10 drop-shadow-md">
                  <h2 className="text-xl font-bold">{slide.right.title}</h2>
                </div>
                <div className="absolute bottom-8 left-6 text-white z-10 drop-shadow-md">
                  <h3
                    className="text-lg font-bold leading-tight mb-1"
                    dangerouslySetInnerHTML={{ __html: slide.right.subTitle! }}
                  />
                  <p className="text-xs opacity-80">{slide.right.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Shortcut Banners & Icons (Menu) - 그리드 사진 디자인 적용 */}
      <section className="container mx-auto px-4 py-8 border-b border-gray-100">
        {/* 상단 18개 배너 그리드 (9열 2행) - 스크롤 없음 */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 mb-3">
          {topShortcutBanners.map((banner) => (
            <div
              key={banner.id}
              className={`relative ${banner.bg} rounded-md h-[90px] flex flex-col items-center justify-end pb-2 cursor-pointer hover:opacity-90 transition-opacity`}
            >
              {banner.brandLogo && (
                <div className="absolute top-1.5 right-1.5 text-[8px] font-bold opacity-60 uppercase tracking-tighter max-w-[50%] truncate text-right">
                  {banner.brandLogo}
                </div>
              )}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-10">
                <Image
                  src={banner.img}
                  alt={banner.title}
                  fill
                  className="object-contain drop-shadow-sm mix-blend-multiply"
                />
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-center leading-tight px-1 z-10 whitespace-nowrap overflow-hidden text-ellipsis w-[95%]">
                {banner.title}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 11개 아이콘 그리드 (11열 1행) - 스크롤 없음 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-1.5">
          {bottomShortcutIcons.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 bg-white rounded flex items-center justify-center gap-1.5 h-10 cursor-pointer hover:border-gray-800 transition-colors px-1"
            >
              <div className={`w-4 h-4 flex items-center justify-center text-[10px] font-extrabold rounded-full ${item.icon === "M" ? "bg-black text-white" : ""}`}>
                {item.icon !== "M" && item.icon}
                {item.icon === "M" && "M"}
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-gray-800 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                {item.title}
              </span>
            </div>
          ))}
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

      {/* 4.5. 나의 관심 기반 상품 추천 (신규 영역) */}
      <section className="w-full pl-4 md:pl-6 pr-0 pt-12 pb-16 bg-white shrink-0">
        {/* 타이틀 및 더보기 */}
        <div className="flex justify-between items-end mb-4 bg-white relative pr-4 md:pr-6">
          <h2 className="text-[20px] font-extrabold text-black tracking-tight">나의 관심 기반 상품 추천</h2>
          <Link href="/interest" className="text-[12px] text-gray-500 font-medium hover:text-black transition-colors underline decoration-gray-300 underline-offset-4 cursor-pointer">
            더보기
          </Link>
        </div>

        {/* 원형 상품 아이콘 (관심/최근 본 상품 기준) */}
        <div className="flex gap-2.5 mb-5 overflow-visible">
          {/* 선택됨 (검은 테두리) */}
          <div className="w-[45px] h-[45px] rounded-full ring-[1.5px] ring-black p-[2px] cursor-pointer bg-white relative">
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
               <Image src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=100&q=80" fill className="object-cover" alt="interest item 1"/>
            </div>
          </div>
          {/* 선택안됨 (회색 테두리) */}
          <div className="w-[45px] h-[45px] rounded-full ring-[1.5px] ring-transparent border border-gray-200 p-[2px] cursor-pointer hover:border-gray-400 transition-colors bg-white relative">
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
               <Image src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" fill className="object-cover" alt="interest item 2"/>
            </div>
          </div>
        </div>

        {/* 안내 텍스트 */}
        <p className="text-[11px] font-bold text-black mb-4">
          최근 본 <span className="underline decoration-black underline-offset-2">디미트리블랙 코튼 팬츠</span> 연관 상품
        </p>

        {/* 상품 가로 스크롤 리스트 */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {interestBasedProducts.map((product) => (
            <div key={product.id} className="min-w-[150px] md:min-w-[190px] lg:min-w-[210px] flex-shrink-0 flex flex-col cursor-pointer group">
              {/* 이미지 영역 */}
              <div className="relative w-full aspect-[4/5] bg-[#f4f4f4] mb-3 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute right-2 bottom-2 text-white/80 hover:text-white transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[20px] h-[20px] fill-transparent hover:fill-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
              </div>
              
              {/* 정보 영역 */}
              <div className="flex flex-col px-0.5 mt-auto">
                <span className="text-[11px] font-bold text-black mb-1 leading-none">{product.brand}</span>
                <span className="text-[12px] text-gray-800 leading-snug line-clamp-2 mb-2 min-h-[34px] font-medium">{product.name}</span>
                <div className="flex gap-1.5 items-center">
                  <span className="text-[#FF0000] font-bold text-[14px] tracking-tight">{product.discount}%</span>
                  <span className="font-extrabold text-[15px] text-black tracking-tight">{product.price.toLocaleString()}원</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
