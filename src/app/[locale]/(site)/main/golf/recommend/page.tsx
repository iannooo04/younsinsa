"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Heart } from "lucide-react";
import Image from "next/image";
import BrandLogoGrid from "@/components/common/BrandLogoGrid";
import { getFeaturedBrandsAction } from "@/actions/brand-actions";

export default function GolfRecommendPage() {
  const [brands, setBrands] = useState<Awaited<ReturnType<typeof getFeaturedBrandsAction>>>([]);

  useEffect(() => {
    async function loadBrands() {
      const data = await getFeaturedBrandsAction();
      setBrands(data);
    }
    loadBrands();
  }, []);

  const [activeTab, setActiveTab] = useState("추천");

  const tabs = ["추천", "랭킹", "스타일", "발매", "골프위크"];
  
  const iconCategories = [
    { name: "골프워크", icon: "🏌️" },
    { name: "필드룩", icon: "⛳" },
    { name: "드라이버", icon: "🏌️‍♂️" },
    { name: "아이언", icon: "🏸" },
    { name: "퍼터", icon: "🏒" },
    { name: "골프백", icon: "🎒" },
    { name: "골프화", icon: "👟" },
    { name: "골프공", icon: "⚪" },
    { name: "모자", icon: "🧢" },
    { name: "장갑", icon: "🧤" },
    { name: "거리측정기", icon: "🔭" },
    { name: "보스턴백", icon: "👜" },
    { name: "연습용품", icon: "🎯" },
    { name: "기타", icon: "➕" },
  ];

  const malbonProducts = [
    { id: 1, brand: "말본골프", name: "말본 스크립트 스웨트셔츠 GREEN", price: "219,000원", discount: "10%", img: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "말본골프", name: "쿠퍼 바시티 재킷 BEIGE", price: "459,000원", discount: "5%", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "말본골프", name: "M 버킷햇 WHITE", price: "89,000원", discount: "10%", img: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "말본골프", name: "클래식 캐디백 GREEN", price: "798,000원", discount: "5%", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80" },
    { id: 5, brand: "말본골프", name: "플레이어 스탠드백 BLACK", price: "648,000원", discount: "5%", img: "https://images.unsplash.com/photo-1553062407-98eeb64fb1a6?auto=format&fit=crop&w=600&q=80" },
  ];

  const basicItems = [
    { id: 1, brand: "타이틀리스트", name: "투어 퍼포먼스 모자", price: "35,000원", discount: "10%", img: "https://images.unsplash.com/photo-1521320207522-68046dd150c3?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "풋조이", name: "웨더소프 골프장갑", price: "15,000원", discount: "20%", img: "https://image.msscdn.net/images/goods_img/20230526/3327666/3327666_16850853556426_500.jpg" },
    { id: 3, brand: "캘러웨이", name: "크롬소프트 골프공", price: "65,000원", discount: "15%", img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "나이키골프", name: "드라이핏 폴로", price: "79,000원", discount: "20%", img: "https://images.unsplash.com/photo-1563911892437-1cda75894b0d?auto=format&fit=crop&w=600&q=80" },
    { id: 5, brand: "PXG", name: "베이직 로고 바이저", price: "69,000원", discount: "5%", img: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=600&q=80" },
  ];

  const dailySpecials = [
    { id: 1, brand: "제이린드버그", name: "남성 윈드브레이커 NVY", price: "289,000원", discount: "30%", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "마크앤로나", name: "스컬 카모 카트백", price: "450,000원", discount: "25%", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "어뉴골프", name: "하이브리드 스탠드백", price: "520,000원", discount: "20%", img: "https://images.unsplash.com/photo-1553062407-98eeb64fb1a6?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "왁", name: "여성 플리츠 스커트", price: "189,000원", discount: "30%", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80" },
  ];


  const fieldItems = [
    { id: 1, brand: "지포어", name: "MG4+ 골프화", price: "350,000원", discount: "10%", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "타이틀리스트 어패럴", name: "남성 투어핏 팬츠", price: "268,000원", discount: "5%", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "풋조이 어패럴", name: "여성 하이브리드 자켓", price: "248,000원", discount: "15%", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "마스터바니", name: "로고 패턴 풀오버", price: "398,000원", discount: "20%", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=600&q=80" },
    { id: 5, brand: "파리게이츠", name: "스마일 패턴 모자", price: "89,000원", discount: "10%", img: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=600&q=80" },
  ];



  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Golf Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-black text-green-700 tracking-tighter cursor-pointer">NKBUS GOLF</h1>
            <Bell className="w-6 h-6 text-gray-800" />
          </div>
          
          <div className="relative mb-3">
            <input 
              type="text" 
              placeholder="골프 용품/브랜드를 검색해 보세요." 
              className="w-full bg-white border border-green-700 rounded-md py-2.5 px-4 text-sm focus:outline-none placeholder-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-green-700 w-5 h-5 opacity-50" />
          </div>

          <div className="flex gap-6 text-sm font-bold border-b border-transparent">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 relative ${activeTab === tab ? 'text-green-700' : 'text-gray-400'}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-green-700"></div>
                )}
                {tab === "골프위크" && <span className="absolute -top-1 -right-1 w-1 h-1 bg-red-500 rounded-full"></span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Hero Banner (Horizontal Scroll) */}
      <div className="w-full overflow-x-auto scrollbar-hide snap-xsnap-mandatory flex">
        {/* Banner 1 */}
        <div className="min-w-full relative aspect-[4/3] md:aspect-[2/1] bg-gray-100 snap-center">
            <Image 
                src="https://images.unsplash.com/photo-1535131749006-b7f58c9f0363?q=80&w=1600&auto=format&fit=crop" 
                alt="Banner 1" 
                fill
                className="object-cover"
            />
            <div className="absolute bottom-8 left-4 text-white">
                <h2 className="text-2xl font-bold font-serif mb-1">2024 S/S<br/>골프웨어 컬렉션</h2>
                <p className="text-sm opacity-90">필드 위 새로운 스타일</p>
            </div>
        </div>
         {/* Banner 2 */}
         <div className="min-w-full relative aspect-[4/3] md:aspect-[2/1] bg-gray-200 snap-center">
           <Image 
                src="https://images.unsplash.com/photo-1593111774240-d529f12db4bb?q=80&w=1600&auto=format&fit=crop" 
                 alt="Banner 2" 
                fill
                className="object-cover"
            />
             <div className="absolute bottom-8 left-4 text-white drop-shadow-md">
                <h2 className="text-2xl font-bold mb-1">완벽한 스윙을 위한<br/>프리미엄 클럽</h2>
                <p className="text-sm opacity-90">타이틀리스트 & 테일러메이드</p>
            </div>
        </div>
      </div>

      {/* 3. Icon Categories */}
      <div className="py-4 px-2 overflow-x-auto scrollbar-hide border-b border-gray-100">
        <div className="flex gap-2 min-w-max px-2">
            {iconCategories.map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 min-w-[64px]">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-green-50 text-green-700`}>
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
                <h3 className="text-lg font-bold text-gray-900 leading-tight">골프 급상승 인기 브랜드</h3>
                <h4 className="text-xl font-black text-black mt-1">말본골프</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>
        
        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
            {malbonProducts.map((product) => (
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
                <h3 className="text-lg font-bold text-gray-900 leading-tight">골프 필수 아이템</h3>
                <h4 className="text-xl font-black text-black mt-1">준비된 골퍼의 선택</h4>
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
             <h3 className="text-lg font-bold text-gray-900">골프 타임세일 <span className="text-red-500 ml-1 font-mono">12:00:00</span></h3>
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

      {/* 8. Category Specific */}
      <div className="py-8 px-4">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">카테고리별 추천</h3>
                <h4 className="text-xl font-black text-black mt-1">필드 웨어</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8">
             {fieldItems.map((product) => (
                <div key={product.id} className="w-full">
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 relative">
                         <Image src={product.img} alt={product.name} fill className="object-cover" />
                         <div className="absolute top-2 left-2 flex gap-1">
                             <span className="w-2 h-2 rounded-full bg-green-700"></span>
                             <span className="w-2 h-2 rounded-full bg-black"></span>
                         </div>
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

      {/* 12. Featured Brands Grid */}
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
