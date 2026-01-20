"use client";

import { useState } from "react";
import { Search, Bell, ChevronUp, PartyPopper } from "lucide-react";
import Image from "next/image";

export default function EventFeaturesPage() {
  const [activeTab, setActiveTab] = useState("진행중");

  const tabs = ["진행중", "종료임박", "당첨자발표", "지난이벤트"];
  
  const iconCategories = [
    { name: "래플", icon: "🎟️" },
    { name: "체험단", icon: "🙋" },
    { name: "랜덤박스", icon: "🎁" },
    { name: "출석체크", icon: "✅" },
    { name: "쿠폰", icon: "🎫" },
    { name: "댓글이벤트", icon: "💬" },
    { name: "기획전", icon: "🎪" },
    { name: "브랜드위크", icon: "🚩" },
  ];

  const mainEvents = [
    { id: 1, title: "나이키 덩크 로우 범고래 래플", subtitle: "응모 기간: ~02.14", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: "아디다스 삼바 OG 발매 기념", subtitle: "선착순 구매 혜택", img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: "스투시 24SS 오픈", subtitle: "최대 50% 할인", img: "https://images.unsplash.com/photo-1521320207522-68046dd150c3?auto=format&fit=crop&w=600&q=80" },
    { id: 4, title: "뉴발란스 멤버스 위크", subtitle: "전품목 추가 20% 쿠폰", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80" },
  ];

  const raffleItems = [
    { id: 1, brand: "Jordan", name: "Air Jordan 1 Retro High OG", status: "응모중", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "Nike", name: "Travis Scott x Air Jordan 1 Low", status: "D-1", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "Adidas", name: "Yeezy Boost 350 V2", status: "오픈예정", img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "New Balance", name: "992 Grey", status: "응모중", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80" },
    { id: 5, brand: "Asics", name: "Gel-Kayano 14 JJJJound", status: "마감임박", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80" },
  ];

  const brandWeeks = [
    { id: 1, brand: "Covernat", name: "최대 70% 클리어런스", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "Thisisneverthat", name: "시즌오프 마지막 기회", img: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "Andersson Bell", name: "24SS 프리오더 15% 할인", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "Musinsa Standard", name: "감사제 전품목 할인", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-black text-orange-600 tracking-tighter cursor-pointer flex items-center gap-1">
              EVENTS & PROMOTION <PartyPopper className="w-5 h-5 fill-yellow-400 text-yellow-500" />
            </h1>
            <Bell className="w-6 h-6 text-gray-800" />
          </div>
          
          <div className="relative mb-3">
            <input 
              type="text" 
              placeholder="진행 중인 이벤트를 검색해보세요" 
              className="w-full bg-white border border-orange-500 rounded-md py-2.5 px-4 text-sm focus:outline-none placeholder-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5 opacity-50" />
          </div>

          <div className="flex gap-6 text-sm font-bold border-b border-transparent">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 relative ${activeTab === tab ? 'text-orange-600' : 'text-gray-400'}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Hero Banner */}
      <div className="w-full overflow-x-auto scrollbar-hide snap-xsnap-mandatory flex">
        <div className="min-w-full relative aspect-[4/3] md:aspect-[2/1] bg-gray-100 snap-center">
            <Image 
                src="https://images.unsplash.com/photo-1472851294608-415522f96387?auto=format&fit=crop&w=1600&q=80" 
                alt="Banner 1" 
                fill
                className="object-cover"
            />
            <div className="absolute bottom-8 left-4 text-white">
                <h2 className="text-2xl font-bold font-serif mb-1">Happy Week<br/>Festival</h2>
                <p className="text-sm opacity-90">일주일간의 특별한 혜택</p>
            </div>
        </div>
         <div className="min-w-full relative aspect-[4/3] md:aspect-[2/1] bg-gray-200 snap-center">
           <Image 
                src="https://images.unsplash.com/photo-1531297461136-82lw8l208?auto=format&fit=crop&w=1600&q=80" 
                 alt="Banner 2" 
                fill
                className="object-cover"
            />
             <div className="absolute bottom-8 left-4 text-white drop-shadow-md">
                <h2 className="text-2xl font-bold mb-1">Lucky Draw<br/>Challenge</h2>
                <p className="text-sm opacity-90">매일 매일 도전하세요</p>
            </div>
        </div>
      </div>

      {/* 3. Icon Categories */}
      <div className="py-4 px-2 overflow-x-auto scrollbar-hide border-b border-gray-100">
        <div className="flex gap-2 min-w-max px-2">
            {iconCategories.map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 min-w-[64px]">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-orange-50 text-orange-600`}>
                        {cat.icon}
                    </div>
                    <span className="text-[11px] text-gray-600 font-medium">{cat.name}</span>
                </div>
            ))}
        </div>
      </div>

      {/* 4. Main Events List */}
      <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">주목해야 할 메인 이벤트</h3>
                <h4 className="text-xl font-black text-black mt-1">HOT EVENTS</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mainEvents.map((event) => (
                <div key={event.id} className="relative aspect-[2/1] bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                     <Image src={event.img} alt={event.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                         <h3 className="text-white font-bold text-lg">{event.title}</h3>
                         <p className="text-gray-200 text-sm">{event.subtitle}</p>
                     </div>
                </div>
            ))}
        </div>
      </div>

      {/* 5. Raffle Zone */}
      <div className="py-8 px-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-gray-900">한정판 래플 존 <span className="text-red-500 ml-1 font-mono">D-Day</span></h3>
        </div>

        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
            {raffleItems.map((item) => (
                <div key={item.id} className="min-w-[140px] max-w-[140px] snap-start">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
                        <Image src={item.img} alt={item.name} fill className="object-cover" />
                        <div className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">{item.status}</div>
                    </div>
                    <p className="text-xs font-bold text-black mb-1 line-clamp-1">{item.brand}</p>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-1">{item.name}</p>
                    <button className="w-full bg-black text-white text-xs font-bold py-1.5 rounded disabled:bg-gray-300">응모하기</button>
                </div>
            ))}
        </div>
      </div>

       {/* 6. Brand Week */}
      <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">브랜드 위크</h3>
                <h4 className="text-xl font-black text-black mt-1">SPECIAL OFFERS</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {brandWeeks.map((brand) => (
                <div key={brand.id} className="relative">
                    <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
                         <Image src={brand.img} alt={brand.name} fill className="object-cover" />
                         <div className="absolute inset-0 bg-black/10"></div>
                         <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent">
                             <p className="text-white text-xs font-bold">{brand.brand}</p>
                             <p className="text-gray-200 text-[10px] mt-0.5 line-clamp-1">{brand.name}</p>
                         </div>
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
