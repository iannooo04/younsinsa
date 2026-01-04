"use client";

import { useState } from "react";
import { Search, Bell, Heart, ChevronUp, Globe } from "lucide-react";

export default function ProxyFeaturesPage() {
  const [activeTab, setActiveTab] = useState("전체");

  const tabs = ["전체", "미국", "유럽", "일본", "영국", "중국"];
  
  const iconCategories = [
    { name: "타임딜", icon: "⏰" },
    { name: "관세면제", icon: "💸" },
    { name: "무료배송", icon: "✈️" },
    { name: "명품관", icon: "💎" },
    { name: "직구랭킹", icon: "🏆" },
    { name: "리퍼브", icon: "♻️" },
    { name: "식품/건강", icon: "💊" },
    { name: "홈데코", icon: "🏠" },
  ];

  const countryFocus = [
    { id: 1, country: "USA", title: "미국 패션의 중심", desc: "폴로, 타미힐피거, 갭 등 아메리칸 캐주얼", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80" },
    { id: 2, country: "FRANCE", title: "파리지앵의 감성", desc: "메종키츠네, 아미, 산드로 등 프렌치 시크", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
    { id: 3, country: "JAPAN", title: "도쿄 스트릿", desc: "빔즈, 휴먼메이드, 오라리 등 일본 브랜드", img: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80" },
    { id: 4, country: "UK", title: "브리티시 헤리티지", desc: "바버, 버버리, 비비안웨스트우드", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80" },
  ];

  const risingBrands = [
    { id: 1, brand: "Stussy (US)", name: "8 Ball Fleece Jacket", price: "289,000원", discount: "", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "Arc'teryx (CA)", name: "Beta LT Jacket Black", price: "680,000원", discount: "5%", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "Supreme (US)", name: "Box Logo Crewneck", price: "520,000원", discount: "", img: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "Carhartt WIP (EU)", name: "Detroit Jacket Hamilton", price: "328,000원", discount: "10%", img: "https://images.unsplash.com/photo-1550614000-4b9519e09d66?auto=format&fit=crop&w=600&q=80" },
    { id: 5, brand: "Ralph Lauren (US)", name: "Chino Cap Beige", price: "69,000원", discount: "15%", img: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=600&q=80" },
  ];

  const hotDeals = [
    { id: 1, brand: "Maison Kitsune", name: "Double Fox Head Patch", price: "159,000원", discount: "35%", img: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "Ami Paris", name: "Small Heart Logo Hoodie", price: "389,000원", discount: "25%", img: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "Patagonia", name: "Retro-X Fleece Jacket", price: "249,000원", discount: "30%", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "Barbour", name: "Ashby Wax Jacket", price: "359,000원", discount: "40%", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" },
  ];

  const categoryItems = [
    { id: 1, title: "Camping", subtitle: "스노우피크, 헬리녹스 등", img: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: "Tech", subtitle: "마샬, 뱅앤올룹슨", img: "https://images.unsplash.com/photo-1543512214-318c7c853290?auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: "Sneakers", subtitle: "구하기 힘든 한정판", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80" },
    { id: 4, title: "Luxury", subtitle: "유럽 부티크 직배송", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-black text-teal-600 tracking-tighter cursor-pointer flex items-center gap-1">
              GLOBAL AGENT <Globe className="w-5 h-5 text-teal-500" />
            </h1>
            <Bell className="w-6 h-6 text-gray-800" />
          </div>
          
          <div className="relative mb-3">
            <input 
              type="text" 
              placeholder="전 세계 상품을 한 번에 검색하세요" 
              className="w-full bg-white border border-teal-500 rounded-md py-2.5 px-4 text-sm focus:outline-none placeholder-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 w-5 h-5 opacity-50" />
          </div>

          <div className="flex gap-6 text-sm font-bold border-b border-transparent">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 relative ${activeTab === tab ? 'text-teal-600' : 'text-gray-400'}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Hero Banner */}
      <div className="w-full overflow-x-auto scrollbar-hide snap-xsnap-mandatory flex">
        <div className="min-w-full relative aspect-[4/3] md:aspect-[2/1] bg-gray-100 snap-center">
            <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80" 
                alt="Banner 1" 
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-4 text-white">
                <h2 className="text-2xl font-bold font-serif mb-1">Global Shopping<br/>Week</h2>
                <p className="text-sm opacity-90">전 세계 인기 상품을 집 앞으로</p>
            </div>
        </div>
         <div className="min-w-full relative aspect-[4/3] md:aspect-[2/1] bg-gray-200 snap-center">
           <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80" 
                 alt="Banner 2" 
                className="w-full h-full object-cover"
            />
             <div className="absolute bottom-8 left-4 text-white drop-shadow-md">
                <h2 className="text-2xl font-bold mb-1">No Tax<br/>Event</h2>
                <p className="text-sm opacity-90">관부가세 부담 없이 쇼핑하세요</p>
            </div>
        </div>
      </div>

      {/* 3. Icon Categories */}
      <div className="py-4 px-2 overflow-x-auto scrollbar-hide border-b border-gray-100">
        <div className="flex gap-2 min-w-max px-2">
            {iconCategories.map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 min-w-[64px]">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-teal-50 text-teal-600`}>
                        {cat.icon}
                    </div>
                    <span className="text-[11px] text-gray-600 font-medium">{cat.name}</span>
                </div>
            ))}
        </div>
      </div>

      {/* 4. Country Focus */}
      <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">국가별 직구 트렌드</h3>
                <h4 className="text-xl font-black text-black mt-1">WORLD WIDE</h4>
            </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
            {countryFocus.map((country) => (
                <div key={country.id} className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden group">
                     <img src={country.img} alt={country.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                     <div className="absolute top-3 left-3 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-sm">
                        {country.country}
                     </div>
                     <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                         <h3 className="font-bold text-lg mb-1">{country.title}</h3>
                         <p className="text-xs opacity-90 line-clamp-2">{country.desc}</p>
                     </div>
                </div>
            ))}
        </div>
      </div>

      {/* 5. Hot Deals */}
      <div className="py-8 px-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-gray-900">현지 핫딜가 <span className="text-red-500 ml-1 font-mono">SALE</span></h3>
        </div>

        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
            {hotDeals.map((item) => (
                <div key={item.id} className="min-w-[140px] max-w-[140px] snap-start">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">-{item.discount}</div>
                        <button className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500 bg-white/80 p-1 rounded-full">
                           <Heart size={14} />
                        </button>
                    </div>
                    <p className="text-xs font-bold text-black mb-1 line-clamp-1">{item.brand}</p>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-1">{item.name}</p>
                    <div className="flex items-center gap-1">
                         <span className="text-xs text-gray-400 line-through">450,000원</span>
                         <span className="text-sm font-bold text-red-500">{item.price}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

       {/* 6. Rising Global Brands */}
      <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">글로벌 라이징 브랜드</h3>
                <h4 className="text-xl font-black text-black mt-1">BEST CHOICE</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8">
             {risingBrands.map((product) => (
                <div key={product.id} className="w-full">
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 relative">
                         <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                         <span className="absolute top-2 right-2 text-xs">✈️</span>
                         <button className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500">
                           <Heart size={18} />
                         </button>
                    </div>
                    <p className="text-xs font-bold text-black mb-1">{product.brand}</p>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-2 leading-snug h-[2.5em]">{product.name}</p>
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-black">{product.price}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* 7. Category Collections */}
      <div className="py-8 px-4 border-b border-gray-100">
         <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-3">카테고리별 컬렉션</h3>
         </div>
         
         <div className="grid grid-cols-2 gap-4">
             {categoryItems.map((item) => (
                 <div key={item.id} className="relative rounded-lg overflow-hidden aspect-[16/9] group cursor-pointer">
                     <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex flex-col items-center justify-center text-center p-2">
                         <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                         <p className="text-gray-200 text-xs">{item.subtitle}</p>
                     </div>
                 </div>
             ))}
         </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-4 z-40">
        <button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
            <ChevronUp className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
