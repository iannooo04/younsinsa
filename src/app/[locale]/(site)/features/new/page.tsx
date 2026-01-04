"use client";

import { useState } from "react";
import { Search, Bell, Heart, ChevronUp, Sparkles } from "lucide-react";

export default function NewFeaturesPage() {
  const [activeTab, setActiveTab] = useState("전체");

  const tabs = ["전체", "브랜드", "럭셔리", "뷰티", "라이프"];
  
  const iconCategories = [
    { name: "오늘신상", icon: "✨" },
    { name: "단독발매", icon: "🔥" },
    { name: "한정판", icon: "💎" },
    { name: "재입고", icon: "📦" },
    { name: "해외신상", icon: "✈️" },
    { name: "프리오더", icon: "⏳" },
    { name: "룩북", icon: "📒" },
    { name: "쇼케이스", icon: "🎤" },
  ];

  const newBrands = [
    { id: 1, brand: "앤더슨벨", name: "유니섹스 엠브로이더리 후드", price: "189,000원", discount: "", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "쿠어", name: "캐시미어 블렌드 니트", price: "98,000원", discount: "5%", img: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "인사일런스", name: "울 발마칸 코트", price: "269,000원", discount: "10%", img: "https://images.unsplash.com/photo-1550614000-4b9519e09d66?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "유스", name: "와이드 데님 팬츠", price: "148,000원", discount: "", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
    { id: 5, brand: "포터리", name: "울 스포츠 자켓", price: "459,000원", discount: "", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" },
  ];

  const exclusiveItems = [
    { id: 1, brand: "아디다스", name: "삼바 OG 클라우드 화이트", price: "139,000원", discount: "", img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "나이키", name: "V2K 런 서밋 화이트", price: "139,000원", discount: "", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "뉴발란스", name: "1906R 실버 메탈릭", price: "179,000원", discount: "", img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "아식스", name: "젤 1130 화이트", price: "109,000원", discount: "", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80" },
  ];

  const upcomingDrops = [
    { id: 1, brand: "슈프림", name: "24SS Collection Drop 1", date: "02.15 11:00", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "팔라스", name: "Ultimo Week 4", date: "02.16 11:00", img: "https://images.unsplash.com/photo-1520903920248-185d8009995f?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "스투시", name: "Spring 24 Delivery 2", date: "02.17 10:00", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "아이앱", name: "10th Anniversary Pack", date: "02.19 12:00", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80" },
  ];

  const editorPicks = [
    { id: 1, brand: "르메르", name: "크루아상 백 스몰 브라운", price: "1,680,000원", discount: "", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80" },
    { id: 2, brand: "더로우", name: "마고 백 15 블랙", price: "6,500,000원", discount: "", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80" },
    { id: 3, brand: "보테가 베네타", name: "카세트 백 패디드", price: "4,200,000원", discount: "", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80" },
    { id: 4, brand: "프라다", name: "리나일론 백팩 미디움", price: "2,450,000원", discount: "", img: "https://images.unsplash.com/photo-1553062407-98eeb64fb1a6?auto=format&fit=crop&w=600&q=80" },
    { id: 5, brand: "미우미우", name: "완더 마테라쎄 호보백", price: "3,150,000원", discount: "", img: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80" },
    { id: 6, brand: "셀린느", name: "트리오페 숄더백", price: "3,850,000원", discount: "", img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-black text-purple-600 tracking-tighter cursor-pointer flex items-center gap-1">
              NEW ARRIVALS <Sparkles className="w-5 h-5 fill-yellow-400 text-yellow-500" />
            </h1>
            <Bell className="w-6 h-6 text-gray-800" />
          </div>
          
          <div className="relative mb-3">
            <input 
              type="text" 
              placeholder="매일 업데이트되는 신상품을 만나보세요" 
              className="w-full bg-white border border-purple-500 rounded-md py-2.5 px-4 text-sm focus:outline-none placeholder-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500 w-5 h-5 opacity-50" />
          </div>

          <div className="flex gap-6 text-sm font-bold border-b border-transparent">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 relative ${activeTab === tab ? 'text-purple-600' : 'text-gray-400'}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-600"></div>
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
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80" 
                alt="Banner 1" 
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-4 text-white">
                <h2 className="text-2xl font-bold font-serif mb-1">New Season<br/>Open</h2>
                <p className="text-sm opacity-90">가장 먼저 만나는 봄</p>
            </div>
        </div>
         <div className="min-w-full relative aspect-[4/3] md:aspect-[2/1] bg-gray-200 snap-center">
           <img 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80" 
                 alt="Banner 2" 
                className="w-full h-full object-cover"
            />
             <div className="absolute bottom-8 left-4 text-white drop-shadow-md">
                <h2 className="text-2xl font-bold mb-1">Brand Showcase<br/>Exclusive</h2>
                <p className="text-sm opacity-90">단독 런칭 혜택</p>
            </div>
        </div>
      </div>

      {/* 3. Icon Categories */}
      <div className="py-4 px-2 overflow-x-auto scrollbar-hide border-b border-gray-100">
        <div className="flex gap-2 min-w-max px-2">
            {iconCategories.map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 min-w-[64px]">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-purple-50 text-purple-600`}>
                        {cat.icon}
                    </div>
                    <span className="text-[11px] text-gray-600 font-medium">{cat.name}</span>
                </div>
            ))}
        </div>
      </div>

      {/* 4. New Brands */}
      <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">주목할 만한 신규 브랜드</h3>
                <h4 className="text-xl font-black text-black mt-1">이주의 발견</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>
        
        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
            {newBrands.map((product) => (
                <div key={product.id} className="min-w-[140px] max-w-[140px] snap-start">
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 relative">
                         <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
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

      {/* 5. Exclusive Drop */}
      <div className="py-8 px-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-gray-900">NKBUS 단독 발매</h3>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            {exclusiveItems.map((product) => (
                <div key={product.id}>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">EXCLUSIVE</div>
                        <button className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500 bg-white/80 p-1 rounded-full">
                           <Heart size={14} />
                        </button>
                    </div>
                    <p className="text-xs font-bold text-black mb-1">{product.brand}</p>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-1">{product.name}</p>
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-black">{product.price}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

       {/* 6. Upcoming Schedule */}
      <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">발매 예정</h3>
                <h4 className="text-xl font-black text-black mt-1">UPCOMING</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">캘린더 보기</span>
        </div>

        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
             {upcomingDrops.map((drop) => (
                <div key={drop.id} className="min-w-[150px] max-w-[150px] snap-start relative">
                    <div className="aspect-[4/5] bg-gray-900 rounded-lg overflow-hidden mb-2 relative opacity-90">
                         <img src={drop.img} alt={drop.name} className="w-full h-full object-cover opacity-60" />
                         <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2 text-center">
                            <span className="text-xs font-bold mb-1 opacity-80">DROP</span>
                            <span className="text-lg font-black leading-tight">{drop.date}</span>
                         </div>
                    </div>
                    <p className="text-xs font-bold text-black mb-1">{drop.brand}</p>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-1">{drop.name}</p>
                </div>
            ))}
        </div>
      </div>

      {/* 7. Editor's Pick */}
      <div className="py-8 px-4 border-b border-gray-100">
         <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-3">에디터 픽: 럭셔리 신상</h3>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {["가방", "지갑", "신발", "의류", "액세서리"].map((tag, idx) => (
                    <button key={idx} className={`px-3 py-1.5 border rounded-md text-xs whitespace-nowrap ${idx === 0 ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200'}`}>
                        {tag}
                    </button>
                ))}
            </div>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-8">
             {editorPicks.map((product, index) => (
                <div key={product.id} className="relative">
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 relative">
                         <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
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

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-4 z-40">
        <button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
            <ChevronUp className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
