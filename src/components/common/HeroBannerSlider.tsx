"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HeroBannerSlider({ dynamicBanners }: { dynamicBanners: any[] }) {
  // 배너 슬라이드 데이터
  const bannerSlides = useMemo(() => {
    if (!dynamicBanners || dynamicBanners.length === 0) return [];
    
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

  // 슬라이드 상태 관리
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

  // 배너 3초 자동 슬라이드
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

  if (bannerSlides.length === 0) {
    return (
      <section className="relative bg-gray-100 overflow-hidden h-100 md:h-125 flex items-center justify-center">
        <p className="text-gray-400 text-sm font-medium">등록된 배너가 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="relative group bg-gray-100 overflow-hidden h-100 md:h-125">
      {/* 화살표 버튼 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-black">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* 슬라이드 컨테이너 */}
      <div
        className={`h-full flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {/* 심리스(Seamless) 무한 롤링을 위해 1번 슬라이드를 맨 끝에 복제해서 붙입니다 */}
        {[...bannerSlides, ...(bannerSlides.length > 1 ? [bannerSlides[0]] : [])].map((slide, index) => (
          <div key={`${slide.id}-${index}`} className="min-w-full h-full grid grid-cols-1 md:grid-cols-4">
            {/* 왼쪽 */}
            <div
              className={`md:col-span-2 relative ${slide.left.bgColor} overflow-hidden cursor-pointer group/item`}
              onClick={() => { if (slide.left.link) window.open(slide.left.link, "_self"); }}
            >
              {slide.left.img && (
                <Image src={slide.left.img} alt={slide.left.title} fill className="object-cover group-hover/item:scale-105 transition-transform duration-700" />
              )}
              <div className="absolute bottom-8 left-8 text-white z-10 drop-shadow-md">
                <h2 className="text-3xl font-bold leading-tight mb-2" dangerouslySetInnerHTML={{ __html: slide.left.title }} />
                <p className="text-sm font-medium opacity-90">{slide.left.desc}</p>
              </div>
            </div>
            {/* 중앙 */}
            <div
              className={`md:col-span-1 relative ${slide.center.bgColor} overflow-hidden cursor-pointer group/item`}
              onClick={() => { if (slide.center.link) window.open(slide.center.link, "_self"); }}
            >
              {slide.center.img && (
                <Image src={slide.center.img} alt={slide.center.title} fill className="object-cover group-hover/item:scale-105 transition-transform duration-700" />
              )}
              <div className="absolute top-8 left-6 right-6 text-white z-10 drop-shadow-md">
                <h2 className="text-2xl font-bold leading-snug mb-1">{slide.center.title}</h2>
              </div>
              <div className="absolute bottom-8 left-6 text-white z-10 drop-shadow-md">
                <h3 className="text-lg font-bold mb-1" dangerouslySetInnerHTML={{ __html: slide.center.subTitle! }} />
                <p className="text-xs opacity-80">{slide.center.desc}</p>
              </div>
            </div>
            {/* 오른쪽 */}
            <div
              className={`md:col-span-1 relative ${slide.right.bgColor} overflow-hidden cursor-pointer group/item`}
              onClick={() => { if (slide.right.link) window.open(slide.right.link, "_self"); }}
            >
              {slide.right.img && (
                <Image src={slide.right.img} alt={slide.right.title} fill className="object-cover group-hover/item:scale-105 transition-transform duration-700" />
              )}
              <div className="absolute top-8 left-6 text-white z-10 drop-shadow-md">
                <h2 className="text-xl font-bold">{slide.right.title}</h2>
              </div>
              <div className="absolute bottom-8 left-6 text-white z-10 drop-shadow-md">
                <h3 className="text-lg font-bold leading-tight mb-1" dangerouslySetInnerHTML={{ __html: slide.right.subTitle! }} />
                <p className="text-xs opacity-80">{slide.right.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
