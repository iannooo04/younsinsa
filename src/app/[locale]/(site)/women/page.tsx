"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";

export default function WomenPage() {
  // 1. 배너 슬라이드 데이터
  const bannerSlides = [
    {
      id: 1,
      left: {
        img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop",
        title: "2024 WINTER <br /> COLLECTION",
        desc: "우아함과 따뜻함의 공존",
        bgColor: "bg-stone-100",
      },
      center: {
        img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
        title: "홀리데이 룩",
        subTitle: "특별한 날을 위한 <br/> 스타일링",
        desc: "최대 70% 할인",
        bgColor: "bg-[#8B4513]",
        overlayColor: "bg-[#8B4513]/20",
      },
      right: {
        img: "https://images.unsplash.com/photo-1550614000-4b9519e09d66?q=80&w=800&auto=format&fit=crop",
        title: "니트웨어",
        subTitle: "포근한 겨울을 <br/> 준비하세요",
        desc: "베스트 아이템 모음",
        bgColor: "bg-[#D8C3A5]",
        overlayColor: "bg-[#D8C3A5]/20",
      },
    },
    {
      id: 2,
      left: {
        img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1600&auto=format&fit=crop",
        title: "NEW ARRIVALS <br /> 이번 주 신상품",
        desc: "가장 먼저 만나보는 트렌드",
        bgColor: "bg-gray-100",
      },
      center: {
        img: "https://images.unsplash.com/photo-1589810635657-232948472d98?q=80&w=800&auto=format&fit=crop",
        title: "디자이너 브랜드",
        subTitle: "감각적인 디자인",
        desc: "단독 혜택가",
        bgColor: "bg-black",
        overlayColor: "bg-black/20",
      },
      right: {
        img: "https://images.unsplash.com/photo-1485230905971-8bc6f849a6bc?q=80&w=800&auto=format&fit=crop",
        title: "액세서리",
        subTitle: "스타일의 완성 <br/> 포인트 아이템",
        desc: "주얼리 & 잡화",
        bgColor: "bg-pink-100",
        overlayColor: "bg-pink-100/20",
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

  // 3. 더미 데이터: 여성 의류 상품 목록
  const womenProducts = [
    {
      id: 1,
      brand: "마르디 메크르디",
      name: "SWEATSHIRT FLOWER MARDI_OATMEAL BLACK",
      price: "75,000원",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      brand: "시에",
      name: "벨라 하프코트 (Camel)",
      price: "289,000원",
      discount: "5%",
      img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      brand: "그로브",
      name: "23WINTER NEW ARRIVAL",
      price: "158,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      brand: "렉토",
      name: "STRUCTURED WOOL JACKET",
      price: "428,000원",
      discount: "15%",
      img: "https://images.unsplash.com/photo-1550614000-4b9519e09d66?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      brand: "이미스",
      name: "NEW LOGO CAP-BLACK",
      price: "38,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      brand: "무신사 스탠다드 우먼",
      name: "우먼즈 캐시미어 블렌드 핸드메이드 코트",
      price: "169,900원",
      discount: "20%",
      img: "https://images.unsplash.com/photo-1509631179647-b8d2162dcace?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      brand: "유라고",
      name: "울 발마칸 코트",
      price: "248,000원",
      discount: "12%",
      img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      brand: "스탠드오일",
      name: "Chubby Bag (Black)",
      price: "119,000원",
      discount: "5%",
      img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      brand: "시눈",
      name: "PUFF SLEEVE BLOUSE",
      price: "89,000원",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      brand: "던스트",
      name: "UNISEX CLASSIC WOOL BLAZER",
      price: "268,000원",
      discount: "15%",
      img: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="bg-white min-h-screen text-black">
      {/* Hero Section */}
      <section className="relative group bg-gray-100 overflow-hidden h-100 md:h-125">
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

        <div
          className="h-full flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannerSlides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full h-full grid grid-cols-1 md:grid-cols-4"
            >
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

      {/* Category Shortcuts */}
      <section className="container mx-auto px-4 py-8 border-b border-gray-100">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
             {["아우터", "상의", "원피스", "스커트", "팬츠", "가방", "신발", "액세서리"].map((category, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center min-w-[80px] h-[80px] rounded-full border border-gray-200 bg-gray-50 cursor-pointer hover:border-black hover:bg-white transition-all shrink-0"
            >
              <span className="text-sm font-bold text-gray-800">{category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">여성 베스트 아이템</h2>
          <Link
            href="#"
            className="text-xs text-gray-500 hover:text-black underline decoration-gray-300"
          >
            전체보기
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-10">
          {womenProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative w-full bg-[#f4f4f4] mb-3 overflow-hidden">
                <div className="aspect-3/4">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
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

      {/* Brand Focus */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">주목할 만한 브랜드</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-video bg-gray-200 relative group overflow-hidden cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover"
                alt="Women's Lookbook"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  24 WINTER LOOKBOOK
                </span>
              </div>
            </div>
            <div className="aspect-video bg-gray-200 relative group overflow-hidden cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover"
                alt="Women's Special Offer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  SEASON OFF UP TO 80%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
