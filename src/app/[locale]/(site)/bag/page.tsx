"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function BagPage() {
  // 1. Banner Slides
  const bannerSlides = [
    {
      id: 1,
      left: {
        img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1600&auto=format&fit=crop",
        title: "NEW SEASON <br /> BAGS",
        desc: "새로운 시즌을 위한 가방",
        bgColor: "bg-orange-100",
      },
      center: {
        img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
        title: "백팩 컬렉션",
        subTitle: "편안함과 <br/> 스타일",
        desc: "신학기 준비",
        bgColor: "bg-[#2C3E50]",
        overlayColor: "bg-[#2C3E50]/20",
      },
      right: {
        img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
        title: "명품관",
        subTitle: "럭셔리 백 <br/> 특가",
        desc: "최대 40% 할인",
        bgColor: "bg-[#800000]",
        overlayColor: "bg-[#800000]/20",
      },
    },
    {
      id: 2,
      left: {
        img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1600&auto=format&fit=crop",
        title: "DAILY BAG <br /> ESSENTIALS",
        desc: "매일 들고 싶은 가방",
        bgColor: "bg-stone-200",
      },
      center: {
        img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
        title: "미니백",
        subTitle: "가볍게 <br/> 포인트",
        desc: "인기 컬러 재입고",
        bgColor: "bg-[#D2691E]",
        overlayColor: "bg-[#D2691E]/20",
      },
      right: {
        img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
        title: "에코백",
        subTitle: "지구를 생각하는 <br/> 착한 소비",
        desc: "다양한 디자인",
        bgColor: "bg-[#556B2F]",
        overlayColor: "bg-[#556B2F]/20",
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
  const bagProducts = [
    {
      id: 1,
      brand: "스탠드오일",
      name: "Chubby Bag (Black)",
      price: "119,000원",
      discount: "5%",
      img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      brand: "포터",
      name: "TANKER 2WAY BRIEFCASE",
      price: "628,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1553062407-98eeb64fb1a6?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      brand: "마뗑킴",
      name: "ACCORDION MINI BAG",
      price: "98,000원",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      brand: "프라이탁",
      name: "F41 HAWAII FIVE-O",
      price: "198,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      brand: "아카이브앱크",
      name: "fling bag (lamb skin)",
      price: "169,000원",
      discount: "15%",
      img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      brand: "잔스포츠",
      name: "슈퍼브레이크",
      price: "49,000원",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1553062407-98eeb64fb1a6?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      brand: "분크",
      name: "Toque tote S",
      price: "285,000원",
      discount: "",
      img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      brand: "칼린",
      name: "코지 백",
      price: "72,000원",
      discount: "20%",
      img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      brand: "오소이",
      name: "TONI MINI",
      price: "298,000원",
      discount: "5%",
      img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      brand: "조셉앤스테이시",
      name: "Lucky Pleats Knit M",
      price: "69,800원",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
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
          {["백팩", "크로스백", "숄더백", "토트백", "에코백", "지갑", "파우치"].map((category, idx) => (
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
          <h2 className="text-xl font-bold">인기 가방</h2>
          <Link
            href="#"
            className="text-xs text-gray-500 hover:text-black underline decoration-gray-300"
          >
            전체보기
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-10">
          {bagProducts.map((product) => (
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
                src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80"
                fill
                className="object-cover"
                alt="Bag Lookbook"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  STAND OIL
                </span>
              </div>
            </div>
            <div className="aspect-video bg-gray-200 relative group overflow-hidden cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
                fill
                className="object-cover"
                alt="Bag Special Offer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  DESIGNER BAG DISCOUNT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
