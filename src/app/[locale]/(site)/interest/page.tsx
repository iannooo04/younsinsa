"use client";

import Image from "next/image";

export default function InterestPage() {

  // 디자인 시안(이미지)과 동일한 데이터를 구성합니다. (총 12개, 한 줄에 6개씩)
  const products = [
    {
      id: 1,
      brand: "디미트리블랙",
      name: "[10주년기획] ⊗ 모두의 커브드 치노 팬츠_4 COLOR",
      price: 34900,
      discount: 30,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      brand: "어널러코드",
      name: "브루니 커브드 코튼 팬츠 (3color)",
      price: 34300,
      discount: 30,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      brand: "트릴리온",
      name: "[기획] 커브드 와이드 절개 코튼 팬츠_5color",
      price: 29800,
      discount: 31,
      image: "https://images.unsplash.com/photo-1542272604-780c96850d76?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      brand: "시그니처",
      name: "트위스트 커브드 코튼 팬츠[4COLORS]",
      price: 34900,
      discount: 34,
      image: "https://images.unsplash.com/photo-1542272604-780c96850d76?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      brand: "시그니처",
      name: "와이드 커브드 다트 코튼 팬츠[베이지]",
      price: 34900,
      discount: 34,
      image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&w=400&q=80",
      fastDelivery: true
    },
    {
      id: 6,
      brand: "트릴리온",
      name: "[기획] 커브드 벌룬 절개 코튼 팬츠_5color",
      price: 33800,
      discount: 25,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80",
    },
    // 하단 줄 (6개)
    {
      id: 7,
      brand: "키유어",
      name: "커브드 와이드 코튼 팬츠_베이지 [벨트/키링 선택]",
      price: 43450,
      discount: 45,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 8,
      brand: "르아르",
      name: "커브드 코튼 치노 팬츠 [베이지]",
      price: 39900,
      discount: 5,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 9,
      brand: "인템포무드",
      name: "코튼 레이온 파라슈트 팬츠",
      price: 49900,
      discount: 32,
      image: "https://images.unsplash.com/photo-1542272604-780c96850d76?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 10,
      brand: "무신사 스탠다드",
      name: "와이드 치노 팬츠 [베이지]",
      price: 33900,
      discount: 10,
      image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 11,
      brand: "라퍼지스토어",
      name: "원턱 커브드 코튼 팬츠",
      price: 42000,
      discount: 20,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 12,
      brand: "토마스모어",
      name: "코튼 와이드 팬츠 (브라운)",
      price: 59000,
      discount: 15,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
    }
  ];

  return (
    <div className="bg-white min-h-screen text-black pb-20">
      <div className="container mx-auto px-4 pt-10">
        <h2 className="text-[20px] font-extrabold text-black tracking-tight mb-8">나의 관심 기반 상품 추천</h2>

        {/* 6칸짜리 그리드 적용 (이미지와 동일한 배열) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-[14px] gap-y-10">
          {products.map((product) => (
            <div key={product.id} className="cursor-pointer group flex flex-col">
              {/* 이미지 컨테이너 */}
              <div className="relative w-full aspect-[4/5] bg-[#f4f4f4] mb-3 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* 찜 하트 아이콘 */}
                <button className="absolute right-2 bottom-2 text-white/80 hover:text-white transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[20px] h-[20px] fill-transparent hover:fill-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
              </div>

              {/* 상품 정보 컨테이너 */}
              <div className="flex flex-col px-0.5 mt-auto">
                <span className="text-[11px] font-bold text-black mb-1 leading-none">{product.brand}</span>
                <span className="text-[12px] text-gray-800 leading-snug line-clamp-2 mb-2 min-h-[34px] font-medium">{product.name}</span>
                <div className="flex gap-1.5 items-center mb-1">
                  <span className="text-[#FF0000] font-bold text-[14px] tracking-tight">{product.discount}%</span>
                  <span className="font-extrabold text-[15px] text-black tracking-tight">{product.price.toLocaleString()}원</span>
                </div>
                {/* 무배당일 내일(금) 도착보장 뱃지 */}
                {product.fastDelivery && (
                  <div className="text-[11px] text-[#4C6AD2] font-semibold flex items-center gap-1 mt-0.5">
                    <span className="border border-[#4C6AD2] px-1 py-[1px] rounded-[3px] text-[9px] leading-none mb-[1px]">무배당일</span>
                    내일(금) 도착보장
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
