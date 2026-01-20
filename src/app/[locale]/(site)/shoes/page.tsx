"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function ShoesPage() {
  // 1. Banner Slides
  const bannerSlides = [
    {
      id: 1,
      left: {
        img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop",
        title: "SNEAKERS <br /> OF THE WEEK",
        desc: "이번 주 가장 핫한 스니커즈",
        bgColor: "bg-stone-200",
      },
      center: {
        img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
        title: "나이키 한정판",
        subTitle: "드로우 응모 <br/> 마감 임박",
        desc: "지금 바로 참여하세요",
        bgColor: "bg-[#111111]",
        overlayColor: "bg-[#111111]/20",
      },
      right: {
        img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop",
        title: "러닝화 세일",
        subTitle: "가볍고 편안한 <br/> 러닝을 위해",
        desc: "최대 50% 할인",
        bgColor: "bg-[#4A90E2]",
        overlayColor: "bg-[#4A90E2]/20",
      },
    },
    {
      id: 2,
      left: {
        img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1600&auto=format&fit=crop",
        title: "BOOTS <br /> COLLECTION",
        desc: "겨울 스타일의 완성, 부츠",
        bgColor: "bg-gray-200",
      },
      center: {
        img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop",
        title: "반스",
        subTitle: "클래식은 <br/> 영원하다",
        desc: "스테디셀러 모음",
        bgColor: "bg-red-800",
        overlayColor: "bg-red-800/20",
      },
      right: {
        img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop",
        title: "구두 & 로퍼",
        subTitle: "포멀한 룩을 <br/> 위한 선택",
        desc: "출근룩 추천",
        bgColor: "bg-amber-900",
        overlayColor: "bg-amber-900/20",
      },
    },
  ];

  // 2. Slide State
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

  // 3. Products Data
  const shoesProducts = [
    {
      id: 1,
      brand: "나이키",
      name: "에어 포스 1 '07",
      price: "139,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      brand: "닥터마틴",
      name: "제이든 스무스 가죽 플랫폼 부츠",
      price: "240,000원",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      brand: "뉴발란스",
      name: "MR530SG",
      price: "119,000원",
      discount: "5%",
      img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      brand: "컨버스",
      name: "척 70 클래식 블랙",
      price: "99,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      brand: "아디다스",
      name: "가젤 볼드",
      price: "129,000원",
      discount: "15%",
      img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      brand: "어그",
      name: "클래식 울트라 미니",
      price: "219,000원",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      brand: "살로몬",
      name: "XT-6 Black",
      price: "260,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1584735175315-9d5816093171?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      brand: "크록스",
      name: "클래식 클로그",
      price: "59,900원",
      discount: "20%",
      img: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      brand: "반스",
      name: "올드스쿨",
      price: "79,000원",
      discount: "5%",
      img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      brand: "호카",
      name: "본디 8",
      price: "199,000원",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80",
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

      {/* Category Shortcuts */}
      <section className="container mx-auto px-4 py-8 border-b border-gray-100">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {["스니커즈", "구두", "부츠/워커", "샌들/슬리퍼", "스포츠화", "양말/레그웨어"].map((category, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center min-w-[80px] h-[80px] rounded-full border border-gray-200 bg-gray-50 cursor-pointer hover:border-black hover:bg-white transition-all shrink-0"
            >
              <span className="text-sm font-bold text-gray-800 text-center leading-tight">
                {category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">인기 신발 랭킹</h2>
          <Link
            href="#"
            className="text-xs text-gray-500 hover:text-black underline decoration-gray-300"
          >
            전체보기
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-10">
          {shoesProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer flex flex-col">
              <div className="relative w-full bg-[#f4f4f4] mb-3 overflow-hidden">
                <div className="aspect-3/4">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
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
              <Image
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
                fill
                className="object-cover"
                alt="Sneakers Lookbook"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  NIKE x STUSSY
                </span>
              </div>
            </div>
            <div className="aspect-video bg-gray-200 relative group overflow-hidden cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
                fill
                className="object-cover"
                alt="Shoes Special Offer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  WEEKLY RAFFLE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
