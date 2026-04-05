"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Heart, ChevronUp } from "lucide-react";
import Image from "next/image";
import BrandLogoGrid from "@/components/common/BrandLogoGrid";
import { getFeaturedBrandsAction } from "@/actions/brand-actions";
import { getActiveBannersAction } from "@/actions/banner-actions";
import HeroBannerSlider from "@/components/common/HeroBannerSlider";

export default function WomenRecommendPage() {
  const [brands, setBrands] = useState<Awaited<ReturnType<typeof getFeaturedBrandsAction>>>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dynamicBanners, setDynamicBanners] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getFeaturedBrandsAction();
      setBrands(data);

      const bannersRes = await getActiveBannersAction('women');
      if (bannersRes.success) {
          setDynamicBanners(bannersRes.banners || []);
      }
    }
    fetchData();
  }, []);

  const [activeTab, setActiveTab] = useState("추천");

  const tabs = ["추천", "랭킹", "스타일", "세일", "우먼위크"];
  
  const iconCategories = [
    { name: "우먼위크", icon: "🧣" },
    { name: "아우터", icon: "🧥" },
    { name: "상의", icon: "👚" },
    { name: "바지", icon: "👖" },
    { name: "원피스", icon: "👗" },
    { name: "스커트", icon: "🩰" },
    { name: "가방", icon: "👜" },
    { name: "신발", icon: "👠" },
    { name: "속옷", icon: "👙" },
    { name: "주얼리", icon: "💍" },
    { name: "모자", icon: "👒" },
    { name: "뷰티", icon: "💄" },
    { name: "기타", icon: "➕" },
  ];

  const risingBrands = [
    { id: 1, brand: "마르디 메크르디", name: "FLOWER MARDI SWEATSHIRT", price: "75,000원", discount: "10%", img: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "마뗑킴", name: "ACCORDION MINI BAG", price: "98,000원", discount: "5%", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "스탠드오일", name: "Chubby Bag", price: "119,000원", discount: "5%", img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "시에", name: "벨라 하프 코트", price: "289,000원", discount: "", img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=600&q=80" },
    { id: 5, brand: "이미스", name: "NEW LOGO CAP", price: "38,000원", discount: "", img: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=600&q=80" },
  ];

  const basicItems = [
    { id: 1, brand: "유라고", name: "울 발마칸 코트", price: "248,000원", discount: "15%", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "무신사 스탠다드", name: "우먼즈 캐시미어 블렌드 코트", price: "169,900원", discount: "20%", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "시눈", name: "PUFF SLEEVE BLOUSE", price: "89,000원", discount: "10%", img: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "던스트", name: "CLASSIC WOOL BLAZER", price: "268,000원", discount: "12%", img: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=600&q=80" },
    { id: 5, brand: "그로브", name: "23WINTER KNIT", price: "158,000원", discount: "5%", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80" },
  ];

  const dailySpecials = [
    { id: 1, brand: "렉토", name: "STRUCTURED WOOL JACKET", price: "428,000원", discount: "25%", img: "https://images.unsplash.com/photo-1550614000-4b9519e09d66?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "아카이브앱크", name: "fling bag (lamb skin)", price: "169,000원", discount: "15%", img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "비비안웨스트우드", name: "Mayfair Bas Relief Pendant", price: "250,000원", discount: "20%", img: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "닥터마틴", name: "Jadon Smooth Leather Boots", price: "240,000원", discount: "30%", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80" },
  ];

  const styleItems = [
    { id: 1, img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80" },
    { id: 2, img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
    { id: 3, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80" },
    { id: 4, img: "https://images.unsplash.com/photo-1485230905971-8bc6f849a6bc?auto=format&fit=crop&w=600&q=80" },
  ];



  const outerItems = [
    { id: 1, brand: "인사일런스 우먼", name: "캐시미어 발마칸 코트", price: "289,000원", discount: "10%", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "유라고", name: "덤블 하프 자켓", price: "189,000원", discount: "15%", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "시티브리즈", name: "울 블렌드 더플 코트", price: "259,000원", discount: "20%", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "파르티멘토 우먼", name: "비건 레더 무스탕", price: "129,000원", discount: "30%", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Women Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-black text-pink-600 tracking-tighter cursor-pointer">NKBUS WOMEN</h1>
            <Bell className="w-6 h-6 text-gray-800" />
          </div>
          
          <div className="relative mb-3">
            <input 
              type="text" 
              placeholder="찾으시는 브랜드나 상품을 검색해 보세요" 
              className="w-full bg-white border border-pink-500 rounded-md py-2.5 px-4 text-sm focus:outline-none placeholder-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500 w-5 h-5 opacity-50" />
          </div>

          <div className="flex gap-6 text-sm font-bold border-b border-transparent">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 relative ${activeTab === tab ? 'text-pink-600' : 'text-gray-400'}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-600"></div>
                )}
                {tab === "우먼위크" && <span className="absolute -top-1 -right-1 w-1 h-1 bg-red-500 rounded-full"></span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Hero Banner */}
      <HeroBannerSlider dynamicBanners={dynamicBanners} />

      {/* 3. Icon Categories */}
      <div className="py-4 px-2 overflow-x-auto scrollbar-hide border-b border-gray-100">
        <div className="flex gap-2 min-w-max px-2">
            {iconCategories.map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 min-w-[64px]">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-pink-50 text-pink-600`}>
                        {cat.icon}
                    </div>
                    <span className="text-[11px] text-gray-600 font-medium">{cat.name}</span>
                </div>
            ))}
        </div>
      </div>

      {/* 4. Rising Brands */}
      <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">우먼 급상승 브랜드</h3>
                <h4 className="text-xl font-black text-black mt-1">마르디 메크르디</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>
        
        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
            {risingBrands.map((product) => (
                <div key={product.id} className="min-w-[140px] max-w-[140px] snap-start">
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 relative">
                         <Image src={product.img} alt={product.name} fill className="object-cover" />
                         <button className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500">
                            <Heart size={18} />
                         </button>
                    </div>
                    <p className="text-xs font-bold text-black mb-1 line-clamp-1">{product.brand}</p>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-2 leading-snug h-[2.5em]">{product.name}</p>
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-red-500">{product.discount}</span>
                        <span className="text-sm font-bold text-black">{product.price}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* 5. Basic Items */}
      <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">기본이 최고다</h3>
                <h4 className="text-xl font-black text-black mt-1">베이직 아이템</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>

        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
             {basicItems.map((product) => (
                <div key={product.id} className="min-w-[150px] max-w-[150px] snap-start">
                    <div className="aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden mb-2 relative">
                         <Image src={product.img} alt={product.name} fill className="object-cover" />
                         <button className="absolute bottom-2 right-2 text-white drop-shadow-md hover:text-red-500">
                           <Heart size={18} />
                         </button>
                    </div>
                    <p className="text-xs font-bold text-black mb-1">{product.brand}</p>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-2 leading-snug h-[2.5em]">{product.name}</p>
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-red-500">{product.discount}</span>
                        <span className="text-sm font-bold text-black">{product.price}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* 6. Daily Special */}
      <div className="py-8 px-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-gray-900">오늘의 특가 <span className="text-red-500 ml-1 font-mono">14:02:59</span></h3>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            {dailySpecials.map((product) => (
                <div key={product.id}>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
                        <Image src={product.img} alt={product.name} fill className="object-cover" />
                        <button className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500 bg-white/80 p-1 rounded-full">
                           <Heart size={14} />
                        </button>
                    </div>
                    <p className="text-xs font-bold text-black mb-1">{product.brand}</p>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-1">{product.name}</p>
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-red-500">{product.discount}</span>
                        <span className="text-sm font-bold text-black">{product.price}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

       {/* 7. Trending Styles */}
       <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-gray-900">요즘 뜨는 스타일</h3>
             <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"><ChevronUp className="w-4 h-4 rotate-[-90deg]" /></button>
                 <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"><ChevronUp className="w-4 h-4 rotate-90deg" /></button>
             </div>
        </div>
        
        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
            {styleItems.map((item) => (
                <div key={item.id} className="min-w-[160px] max-w-[160px] snap-start">
                    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
                         <Image src={item.img} alt="Trending" fill className="object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* 8. Category Recommendation: Outer */}
      <div className="py-8 px-4">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">카테고리별 추천</h3>
                <h4 className="text-xl font-black text-black mt-1">겨울 아우터</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8">
             {outerItems.map((product) => (
                <div key={product.id} className="w-full">
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 relative">
                         <Image src={product.img} alt={product.name} fill className="object-cover" />
                         <button className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500">
                           <Heart size={18} />
                         </button>
                    </div>
                    <p className="text-xs font-bold text-black mb-1">{product.brand}</p>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-2 leading-snug h-[2.5em]">{product.name}</p>
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-red-500">{product.discount}</span>
                        <span className="text-sm font-bold text-black">{product.price}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* 9. Featured Brands Grid */}
      <div className="py-8 px-4 border-b border-gray-100">
         <div className="mb-4 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-gray-900 mb-1">인기 브랜드</h3>
            <p className="text-sm text-gray-500">지금 가장 사랑받는 브랜드를 만나보세요</p>
         </div>
         <BrandLogoGrid brands={brands} />
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-4 z-40">
        <button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xs font-bold">전체</span>
        </button>
      </div>

    </div>
  );
}
