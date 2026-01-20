"use client";

import { useState } from "react";
import { Search, Bell, Heart, ChevronUp, Zap } from "lucide-react";
import Image from "next/image";

export default function ImmediatePage() {
  const [activeTab, setActiveTab] = useState("전체");

  const tabs = ["전체", "의류", "신발", "가방", "액세서리", "테크"];
  
  const iconCategories = [
    { name: "즉시출고", icon: "🚀" },
    { name: "당일배송", icon: "🚚" },
    { name: "새벽도착", icon: "🌙" },
    { name: "주말도착", icon: "📅" },
    { name: "선물포장", icon: "🎁" },
    { name: "한정판", icon: "⭐" },
    { name: "베스트", icon: "🏆" },
    { name: "세일", icon: "💸" },
  ];

  const spotItems = [
    { id: 1, brand: "나이키", name: "에어 포스 1 '07 화이트", price: "139,000원", discount: "", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "아디다스", name: "삼바 OG 클라우드 화이트", price: "139,000원", discount: "", img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "뉴발란스", name: "530 화이트 실버", price: "109,000원", discount: "10%", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "살로몬", name: "XT-6 블랙", price: "260,000원", discount: "5%", img: "https://images.unsplash.com/photo-1584735175315-9d5816093171?auto=format&fit=crop&w=600&q=80" },
    { id: 5, brand: "아식스", name: "젤 카야노 14 크림 블랙", price: "169,000원", discount: "", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80" },
  ];

  const dailySpecials = [
    { id: 1, brand: "스투시", name: "베이직 스투시 후드 블랙", price: "215,000원", discount: "15%", img: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "슈프림", name: "박스 로고 크루넥 헤더 그레이", price: "520,000원", discount: "5%", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "아이앱 스튜디오", name: "후디 블랙", price: "180,000원", discount: "10%", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "팔라스", name: "트라이 퍼그 후드 네이비", price: "245,000원", discount: "20%", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=600&q=80" },
  ];

  const clothingItems = [
    { id: 1, brand: "디스이즈네버댓", name: "T-Logo Hoodie Black", price: "89,000원", discount: "20%", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "커버낫", name: "C 로고 맨투맨", price: "59,000원", discount: "30%", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "예일", name: "원 포인트 후드 그레이", price: "69,000원", discount: "25%", img: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "마하그리드", name: "베이직 로고 티셔츠", price: "29,000원", discount: "10%", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80" },
    { id: 5, brand: "LMC", name: "OG 티셔츠 화이트", price: "39,000원", discount: "15%", img: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=600&q=80" },
  ];

  const rankingItems = [
    { id: 1, brand: "애플", name: "에어팟 맥스 실버", price: "719,000원", discount: "5%", img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "소니", name: "WH-1000XM5 블랙", price: "459,000원", discount: "12%", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "닌텐도", name: "스위치 OLED 화이트", price: "415,000원", discount: "8%", img: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "다이슨", name: "에어랩 멀티 스타일러", price: "699,000원", discount: "", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80" },
    { id: 5, brand: "삼성전자", name: "갤럭시 버즈2 프로", price: "179,000원", discount: "30%", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80" },
    { id: 6, brand: "LG전자", name: "스탠바이미 Go", price: "1,100,000원", discount: "10%", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-black text-blue-600 tracking-tighter cursor-pointer flex items-center gap-1">
              IMMEDIATE <Zap className="w-5 h-5 fill-yellow-400 text-yellow-500" />
            </h1>
            <Bell className="w-6 h-6 text-gray-800" />
          </div>
          
          <div className="relative mb-3">
            <input 
              type="text" 
              placeholder="내일 도착하는 상품을 검색해보세요" 
              className="w-full bg-white border border-blue-500 rounded-md py-2.5 px-4 text-sm focus:outline-none placeholder-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 opacity-50" />
          </div>

          <div className="flex gap-6 text-sm font-bold border-b border-transparent">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-400'}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600"></div>
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
                src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1600&q=80" 
                alt="Banner 1" 
                fill
                className="object-cover"
            />
            <div className="absolute bottom-8 left-4 text-white">
                <h2 className="text-2xl font-bold font-serif mb-1">내일 입고<br/>바로 나가는 즐거움</h2>
                <p className="text-sm opacity-90">밤 11시 전 주문 시 내일 도착</p>
            </div>
        </div>
         <div className="min-w-full relative aspect-[4/3] md:aspect-[2/1] bg-gray-200 snap-center">
           <Image 
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=80" 
                 alt="Banner 2" 
                fill
                className="object-cover"
            />
             <div className="absolute bottom-8 left-4 text-white drop-shadow-md">
                <h2 className="text-2xl font-bold mb-1">주말 데이트룩<br/>지금 주문하세요</h2>
                <p className="text-sm opacity-90">당일 출고 보장</p>
            </div>
        </div>
      </div>

      {/* 3. Icon Categories */}
      <div className="py-4 px-2 overflow-x-auto scrollbar-hide border-b border-gray-100">
        <div className="flex gap-2 min-w-max px-2">
            {iconCategories.map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 min-w-[64px]">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-blue-50 text-blue-600`}>
                        {cat.icon}
                    </div>
                    <span className="text-[11px] text-gray-600 font-medium">{cat.name}</span>
                </div>
            ))}
        </div>
      </div>

      {/* 4. Best Spot Items */}
      <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">지금 가장 많이 찾는 [즉시출고]</h3>
                <h4 className="text-xl font-black text-black mt-1">스니커즈</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>
        
        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
            {spotItems.map((product) => (
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

      {/* 5. Daily Special */}
      <div className="py-8 px-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-gray-900">마감 임박 <span className="text-red-500 ml-1 font-mono">03:45:12</span></h3>
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

      {/* 6. Basic Items */}
      <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">빠른 배송 의류</h3>
                <h4 className="text-xl font-black text-black mt-1">티셔츠/맨투맨</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>

        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
             {clothingItems.map((product) => (
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

      {/* 7. Real-time Ranking */}
      <div className="py-8 px-4 border-b border-gray-100">
         <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-3">실시간 배송 랭킹</h3>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {["전체", "테크", "패션", "라이프"].map((tag, idx) => (
                    <button key={idx} className={`px-3 py-1.5 border rounded-md text-xs whitespace-nowrap ${idx === 0 ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200'}`}>
                        {tag}
                    </button>
                ))}
            </div>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-8">
             {rankingItems.map((product, index) => (
                <div key={product.id} className="relative">
                    <div className="absolute top-0 left-0 z-10 bg-black text-white w-6 h-6 flex items-center justify-center text-xs font-bold rounded-tl-lg rounded-br-lg">
                        {index + 1}
                    </div>
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

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-4 z-40">
        <button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
            <ChevronUp className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
