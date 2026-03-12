"use client";

import { useState, useEffect } from "react";
import { Search, Bell, Heart, ChevronUp } from "lucide-react";
import Image from "next/image";
import BrandLogoGrid from "@/components/common/BrandLogoGrid";
import { getFeaturedBrandsAction } from "@/actions/brand-actions";

export default function PlayerRecommendPage() {
  const [brands, setBrands] = useState<Awaited<ReturnType<typeof getFeaturedBrandsAction>>>([]);

  useEffect(() => {
    async function loadBrands() {
      const data = await getFeaturedBrandsAction();
      setBrands(data);
    }
    loadBrands();
  }, []);

  const [activeTab, setActiveTab] = useState("추천");

  const tabs = ["추천", "랭킹", "세일", "발매", "스포츠위크"];
  
  const iconCategories = [
    { name: "스포츠워크", icon: "🧥" },
    { name: "러닝", icon: "🏃" },
    { name: "워터", icon: "🏊" },
    { name: "유니폼", icon: "👕" },
    { name: "피트니스", icon: "🏋️" },
    { name: "아웃도어", icon: "🏔️" },
    { name: "골프", icon: "⛳" },
    { name: "요가/필라테스", icon: "🧘" },
    { name: "캠핑", icon: "⛺" },
    { name: "테니스", icon: "🎾" },
    { name: "축구", icon: "⚽" },
    { name: "야구", icon: "⚾" },
    { name: "라이딩", icon: "🚴" },
    { name: "배드민턴", icon: "🏸" },
    { name: "기타", icon: "➕" },
  ];

  const buffProducts = [
    { id: 1, brand: "버프", name: "오리지널 에코스트레치 넥웨어 BLACK", price: "22,400원", discount: "30%", img: "https://image.msscdn.net/images/goods_img/20230918/3565576/3565576_16950201419779_500.jpg" },
    { id: 2, brand: "버프", name: "써모넷 넥웨어 SKARET GREY", price: "30,100원", discount: "30%", img: "https://image.msscdn.net/images/goods_img/20231023/3648601/3648601_16980481267566_500.jpg" },
    { id: 3, brand: "버프", name: "오리지널 에코스트레치 넥웨어 NEDRE GRAPHITE", price: "22,400원", discount: "30%", img: "https://image.msscdn.net/images/goods_img/20210903/2108744/2108744_1_500.jpg" },
    { id: 4, brand: "버프", name: "쿨넷UV 넥웨어 LOGO MULTI", price: "22,400원", discount: "30%", img: "https://image.msscdn.net/images/goods_img/20220317/2424901/2424901_1_500.jpg" },
    { id: 5, brand: "버프", name: "드라이플렉스 넥웨어 WASHED BLUE", price: "32,200원", discount: "30%", img: "https://image.msscdn.net/images/goods_img/20221109/2930777/2930777_1_500.jpg" },
  ];

  const basicItems = [
    { id: 1, brand: "허그본", name: "무지 머슬핏 반팔 5컬러", price: "20,900원", discount: "16%", img: "https://image.msscdn.net/images/goods_img/20190529/1057866/1057866_1_500.jpg" },
    { id: 2, brand: "블랙몬스터핏", name: "[3PACK]무지 쿨론 기능성 쿨 반팔 티셔츠 3P", price: "25,900원", discount: "32%", img: "https://image.msscdn.net/images/goods_img/20230526/3327666/3327666_16850853556426_500.jpg" },
    { id: 3, brand: "몰든", name: "프리미엄 머슬핏 무지 티셔츠", price: "27,900원", discount: "10%", img: "https://image.msscdn.net/images/goods_img/20210419/1905666/1905666_1_500.jpg" },
    { id: 4, brand: "프리덤", name: "에센셜 오버핏 티셔츠_2color", price: "27,300원", discount: "30%", img: "https://image.msscdn.net/images/goods_img/20230412/3227447/3227447_16812854157833_500.jpg" },
    { id: 5, brand: "볼란테", name: "Voltex Compression NO.1 [Black]", price: "28,320원", discount: "52%", img: "https://image.msscdn.net/images/goods_img/20230510/3289065/3289065_16836968564073_500.jpg" },
  ];

  const dailySpecials = [
    { id: 1, brand: "그랜드보떼", name: "Basic GDB Sweat [IVORY]", price: "69,000원", discount: "25%", img: "https://image.msscdn.net/images/goods_img/20230912/3553254/3553254_16945035544778_500.jpg" },
    { id: 2, brand: "오프그리드", name: "인시전 포켓 나일론 팬츠-블랙", price: "70,850원", discount: "35%", img: "https://image.msscdn.net/images/goods_img/20230823/3487519/3487519_16927585544262_500.jpg" },
    { id: 3, brand: "버터플라이 스포츠웨어", name: "유니폼 저지 쇼츠 네이비", price: "52,950원", discount: "24%", img: "https://image.msscdn.net/images/goods_img/20230426/3262959/3262959_16824908076632_500.jpg" },
    { id: 4, brand: "그랜드보떼", name: "SIGNATURE HOODY [IVORY]", price: "84,000원", discount: "25%", img: "https://image.msscdn.net/images/goods_img/20230912/3553267/3553267_16945036735626_500.jpg" },
  ];

  const trendItems = [
    { id: 1, img: "https://image.msscdn.net/images/goods_img/20231019/3642145/3642145_16977005479633_500.jpg" }, // Padded styling
    { id: 2, img: "https://image.msscdn.net/images/goods_img/20231102/3679815/3679815_16989098906325_500.jpg" },
    { id: 3, img: "https://image.msscdn.net/images/goods_img/20231012/3625771/3625771_16970921509355_500.jpg" },
    { id: 4, img: "https://image.msscdn.net/images/goods_img/20221101/2916698/2916698_16672856401662_500.jpg" },
  ];

  const fitnessItems = [
    { id: 1, brand: "NKBUS 스탠다드 스포츠", name: "[유러피안] 라이트쉘 윈터자켓(2color)", price: "188,100원", discount: "37%", img: "https://image.msscdn.net/images/goods_img/20221006/2844883/2844883_1_500.jpg" },
    { id: 2, brand: "칼렉스", name: "액티브 풋볼 9부 기모 팬츠 블랙 GA5850 BK", price: "27,120원", discount: "38%", img: "https://image.msscdn.net/images/goods_img/20210930/2157077/2157077_1_500.jpg" },
    { id: 3, brand: "데상트", name: "여성 롱 캐논 구스다운 블랙 SP422SDJ07", price: "289,500원", discount: "50%", img: "https://image.msscdn.net/images/goods_img/20221118/2957945/2957945_1_500.jpg" },
    { id: 4, brand: "본투윈", name: "B-SYMBOL LOGO SEMI WIDE PANTS [MELANGE GREY]", price: "75,000원", discount: "31%", img: "https://image.msscdn.net/images/goods_img/20230221/3095311/3095311_16769614486940_500.jpg" },
    { id: 5, brand: "블랙몬스터핏", name: "[3PACK]무지 쿨론 기능성 쿨 반팔 티셔츠 3P", price: "25,900원", discount: "32%", img: "https://image.msscdn.net/images/goods_img/20230526/3327666/3327666_16850853556426_500.jpg" },
  ];

  const golfItems = [
    { id: 1, brand: "아다바트", name: "우먼즈 웜소프트 모크넥 티셔츠 5Color", price: "8,900원", discount: "67%", img: "https://image.msscdn.net/images/goods_img/20230912/3553254/3553254_16945035544778_500.jpg" },
    { id: 2, brand: "아다바트", name: "맨즈 퀼팅 경량자켓 3Color", price: "27,900원", discount: "65%", img: "https://image.msscdn.net/images/goods_img/20230823/3487519/3487519_16927585544262_500.jpg" },
    { id: 3, brand: "아다바트", name: "우먼즈 반팔 카라티셔츠 3color", price: "12,900원", discount: "52%", img: "https://image.msscdn.net/images/goods_img/20210903/2108744/2108744_1_500.jpg" },
    { id: 4, brand: "아다바트", name: "[3PACK] 맨즈 밴딩 7부팬츠", price: "35,900원", discount: "61%", img: "https://image.msscdn.net/images/goods_img/20220317/2424901/2424901_1_500.jpg" },
    { id: 5, brand: "아다바트", name: "인퀼팅 점퍼 여성 3color", price: "37,000원", discount: "72%", img: "https://image.msscdn.net/images/goods_img/20221109/2930777/2930777_1_500.jpg" },
    { id: 6, brand: "아다바트", name: "맨즈 웜소프트 모크넥 티셔츠", price: "8,900원", discount: "67%", img: "https://image.msscdn.net/images/goods_img/20230918/3565576/3565576_16950201419779_500.jpg" },
  ];

  const chapterXItems = [
    { id: 1, brand: "챕터엑스", name: "퀵 드라이 액티브 러너스 후디 (Black)", price: "53,200원", discount: "30%", img: "https://image.msscdn.net/images/goods_img/20230918/3565576/3565576_16950201419779_500.jpg" },
    { id: 2, brand: "챕터엑스", name: "퀵 드라이 액티브 러너스 후디 (Beige)", price: "53,200원", discount: "30%", img: "https://image.msscdn.net/images/goods_img/20231023/3648601/3648601_16980481267566_500.jpg" },
    { id: 3, brand: "챕터엑스", name: "챕터 에어 와플 후디 (Green)", price: "64,400원", discount: "30%", img: "https://image.msscdn.net/images/goods_img/20210903/2108744/2108744_1_500.jpg" },
    { id: 4, brand: "챕터엑스", name: "웜 트래커 스티치 하프집업 (Black)", price: "48,300원", discount: "30%", img: "https://image.msscdn.net/images/goods_img/20220317/2424901/2424901_1_500.jpg" },
    { id: 5, brand: "챕터엑스", name: "그리드 텍스쳐 트레킹 후디 (Charcoal)", price: "46,200원", discount: "30%", img: "https://image.msscdn.net/images/goods_img/20221109/2930777/2930777_1_500.jpg" },
    { id: 6, brand: "챕터엑스", name: "쉐이드로고 웨이브 라이트 다운 자켓", price: "98,000원", discount: "42%", img: "https://image.msscdn.net/images/goods_img/20230918/3565576/3565576_16950201419779_500.jpg" },
  ];

  const longSleeveItems = [
    { id: 1, brand: "드릭스", name: "특양면 오버핏 롱 슬리브 티셔츠_5color", price: "25,900원", discount: "30%", img: "https://image.msscdn.net/images/goods_img/20190529/1057866/1057866_1_500.jpg" },
    { id: 2, brand: "베르만 어패럴", name: "와플 오버핏 롱슬리브 빈티지 차콜", price: "44,750원", discount: "43%", img: "https://image.msscdn.net/images/goods_img/20230526/3327666/3327666_16850853556426_500.jpg" },
    { id: 3, brand: "리그", name: "우먼 러님 기모 후드 긴팔티셔츠 RZTS7201", price: "55,890원", discount: "19%", img: "https://image.msscdn.net/images/goods_img/20210419/1905666/1905666_1_500.jpg" },
    { id: 4, brand: "허그본", name: "무지 머슬핏 긴팔 5컬러", price: "19,240원", discount: "29%", img: "https://image.msscdn.net/images/goods_img/20230412/3227447/3227447_16812854157833_500.jpg" },
    { id: 5, brand: "바이텍", name: "특양면 무지 머슬핏 긴팔 티셔츠_2Color", price: "39,000원", discount: "11%", img: "https://image.msscdn.net/images/goods_img/20230510/3289065/3289065_16836968564073_500.jpg" },
    { id: 6, brand: "웨이든", name: "[2PACK]액티브+ 박시 롱슬리브", price: "51,480원", discount: "34%", img: "https://image.msscdn.net/images/goods_img/20190529/1057866/1057866_1_500.jpg" },
  ];



  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Player Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-black text-blue-500 tracking-tighter cursor-pointer">NKBUS PLAYER</h1>
            <Bell className="w-6 h-6 text-gray-800" />
          </div>
          
          <div className="relative mb-3">
            <input 
              type="text" 
              placeholder="스포츠/레저 상품을 검색해 보세요." 
              className="w-full bg-white border border-blue-500 rounded-md py-2.5 px-4 text-sm focus:outline-none placeholder-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 opacity-50" />
          </div>

          <div className="flex gap-6 text-sm font-bold border-b border-transparent">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 relative ${activeTab === tab ? 'text-blue-500' : 'text-gray-400'}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500"></div>
                )}
                {tab === "스포츠위크" && <span className="absolute -top-1 -right-1 w-1 h-1 bg-red-500 rounded-full"></span>}
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
                src="https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_651f6868dfd05.jpg" 
                alt="Banner 1" 
                fill
                className="object-cover"
            />
            <div className="absolute bottom-8 left-4 text-white">
                <h2 className="text-2xl font-bold font-serif mb-1">가장 갖고 싶은<br/>인기 아이템 추천</h2>
                <p className="text-sm opacity-90">룰루레몬</p>
            </div>
        </div>
         {/* Banner 2 */}
         <div className="min-w-full relative aspect-[4/3] md:aspect-[2/1] bg-gray-200 snap-center">
           <Image 
                src="https://image.msscdn.net/images/goods_img/20230825/3485791/3485791_16929422055139_500.jpg" 
                 alt="Banner 2" 
                fill
                className="object-cover"
            />
             <div className="absolute bottom-8 left-4 text-white drop-shadow-md">
                <h2 className="text-2xl font-bold mb-1">과하지 않은 실루엣<br/>740 라인</h2>
                <p className="text-sm opacity-90">뉴발란스</p>
            </div>
        </div>
         {/* Banner 3 */}
         <div className="min-w-full relative aspect-[4/3] md:aspect-[2/1] bg-gray-300 snap-center">
            <Image 
                src="https://image.msscdn.net/images/goods_img/20231102/3679815/3679815_16989098906325_500.jpg" 
                 alt="Banner 3" 
                fill
                className="object-cover"
            />
             <div className="absolute bottom-8 left-4 text-white drop-shadow-md">
                <h2 className="text-2xl font-bold mb-1">감각적 경량 아우터<br/>최대 50% 할인</h2>
                <p className="text-sm opacity-90">오스트리아</p>
            </div>
        </div>
      </div>

      {/* 3. Icon Categories */}
      <div className="py-4 px-2 overflow-x-auto scrollbar-hide border-b border-gray-100">
        <div className="flex gap-2 min-w-max px-2">
            {iconCategories.map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 min-w-[64px]">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-blue-50 text-blue-500`}>
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
                <h3 className="text-lg font-bold text-gray-900 leading-tight">플레이어 급상승 인기 브랜드 추천</h3>
                <h4 className="text-xl font-black text-black mt-1">버프</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>
        
        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
            {buffProducts.map((product) => (
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
                <h3 className="text-lg font-bold text-gray-900 leading-tight">스포츠 베이직 아이템 추천</h3>
                <h4 className="text-xl font-black text-black mt-1">반소매 티셔츠</h4>
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
             <h3 className="text-lg font-bold text-gray-900">하루특가 <span className="text-red-500 ml-1 font-mono">20:03:17</span></h3>
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

      {/* 7. Trending Items */}
      <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-bold text-gray-900">지금 많이 찾는 스포츠 아이템 추천</h3>
             <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"><ChevronUp className="w-4 h-4 rotate-[-90deg]" /></button>
                 <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center"><ChevronUp className="w-4 h-4 rotate-90deg" /></button>
             </div>
        </div>
        
        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
            {trendItems.map((item) => (
                <div key={item.id} className="min-w-[160px] max-w-[160px] snap-start">
                    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative">
                         <Image src={item.img} alt="Trending" fill className="object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* 8. Category Specific */}
      <div className="py-8 px-4">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">스포츠 종목 아이템 추천</h3>
                <h4 className="text-xl font-black text-black mt-1">피트니스</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8">
             {fitnessItems.map((product) => (
                <div key={product.id} className="w-full">
                    <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 relative">
                         <Image src={product.img} alt={product.name} fill className="object-cover" />
                         <div className="absolute top-2 left-2 flex gap-1">
                             <span className="w-2 h-2 rounded-full bg-blue-900"></span>
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

      {/* 9. Golf Recommended Brands */}
      <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">골프 추천 브랜드</h3>
                <h4 className="text-xl font-black text-black mt-1">아다바트</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>
        
        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
            {golfItems.map((product) => (
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

      {/* 10. Player Rising Popular Brands Recommendation */}
      <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">플레이어 급상승 인기 브랜드 추천</h3>
                <h4 className="text-xl font-black text-black mt-1">챕터엑스</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>
        
        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
            {chapterXItems.map((product) => (
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

       {/* 11. Sports Basic Item Recommendation */}
       <div className="py-8 px-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">스포츠 베이직 아이템 추천</h3>
                <h4 className="text-xl font-black text-black mt-1">긴소매 티셔츠</h4>
            </div>
            <span className="text-xs text-gray-400 underline cursor-pointer">더보기</span>
        </div>

        <div className="flex overflow-x-auto gap-3 scrollbar-hide py-2 -mx-4 px-4 snap-x">
             {longSleeveItems.map((product) => (
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

      {/* 12. Featured Brands Grid */}
      <div className="py-8 px-4 border-b border-gray-100">
         <div className="mb-4 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-gray-900 mb-1">인기 브랜드</h3>
            <p className="text-sm text-gray-500">지금 가장 사랑받는 브랜드를 만나보세요</p>
         </div>
         <BrandLogoGrid brands={brands} />
      </div>

      {/* Floating Action Button for Filter/Sort if needed, but not in image */}
      <div className="fixed bottom-6 right-4 z-40">
        <button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xs font-bold">전체</span>
        </button>
      </div>

    </div>
  );
}
