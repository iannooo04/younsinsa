"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";

export default function AccessoriesPage() {
  // 1. Banner Slides
  const bannerSlides = [
    {
      id: 1,
      left: {
        img: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1600&auto=format&fit=crop",
        title: "JEWELRY <br /> COLLECTION",
        desc: "당신을 빛내줄 아이템",
        bgColor: "bg-orange-50",
      },
      center: {
        img: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=800&auto=format&fit=crop",
        title: "겨울 모자",
        subTitle: "스타일과 보온 <br/> 모두 잡으세요",
        desc: "비니 & 베레모",
        bgColor: "bg-[#2F4F4F]",
        overlayColor: "bg-[#2F4F4F]/20",
      },
      right: {
        img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
        title: "아이웨어",
        subTitle: "젠틀몬스터 <br/> 신규 입점",
        desc: "단독 혜택",
        bgColor: "bg-[#000000]",
        overlayColor: "bg-[#000000]/20",
      },
    },
    {
      id: 2,
      left: {
        img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1600&auto=format&fit=crop",
        title: "SCARF & <br /> MUFFLER",
        desc: "포근한 겨울을 위한 준비",
        bgColor: "bg-gray-100",
      },
      center: {
        img: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?q=80&w=800&auto=format&fit=crop",
        title: "이미스",
        subTitle: "트렌디한 <br/> 볼캡 컬렉션",
        desc: "재입고 완료",
        bgColor: "bg-[#1E3A8A]",
        overlayColor: "bg-[#1E3A8A]/20",
      },
      right: {
        img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop",
        title: "양말",
        subTitle: "센스있는 <br/> 포인트",
        desc: "3+1 기획전",
        bgColor: "bg-[#8B4513]",
        overlayColor: "bg-[#8B4513]/20",
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
  const accProducts = [
    {
      id: 1,
      brand: "비비안웨스트우드",
      name: "Mayfair Bas Relief Pendant",
      price: "250,000원",
      discount: "5%",
      img: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      brand: "젠틀몬스터",
      name: "랭 01",
      price: "280,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      brand: "엠엘비",
      name: "루키 볼캡 NY",
      price: "36,000원",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      brand: "아크네 스튜디오",
      name: "Canada Scarf Grey Melange",
      price: "240,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1520903920248-185d8009995f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      brand: "티파니앤코",
      name: "리턴 투 티파니 하트 태그",
      price: "850,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      brand: "카시오",
      name: "AQ-230GA-9DMQ",
      price: "68,000원",
      discount: "15%",
      img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      brand: "이미스",
      name: "NEW LOGO CAP-GREEN",
      price: "38,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      brand: "판도라",
      name: "모먼츠 스네이크 체인 팔찌",
      price: "98,000원",
      discount: "20%",
      img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      brand: "헤이",
      name: "classic layered necklace",
      price: "42,000원",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      brand: "삭스어필",
      name: "Fox Pattern Socks",
      price: "12,000원",
      discount: "5%",
      img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=600&q=80",
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
          {["모자", "주얼리", "머플러/스카프", "가방(잡화)", "안경/선글라스", "벨트", "양말"].map((category, idx) => (
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
          <h2 className="text-xl font-bold">인기 액세서리</h2>
          <Link
            href="#"
            className="text-xs text-gray-500 hover:text-black underline decoration-gray-300"
          >
            전체보기
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-10">
          {accProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer flex flex-col">
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
                src="https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover"
                alt="Accessories Lookbook"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  GENTLE MONSTER
                </span>
              </div>
            </div>
            <div className="aspect-video bg-gray-200 relative group overflow-hidden cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover"
                alt="Accessories Special Offer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  HOLIDAY GIFT GUIDE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
