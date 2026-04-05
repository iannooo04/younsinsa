// src/app/[locale]/(site)/like/goods/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { getLikeCountsAction, getUserLikedProductsAction } from "@/actions/like-actions";
import LikeButton from "@/components/common/LikeButton";

// ----------------------------------------------------------------------
// 1. 타입 인터페이스
// ----------------------------------------------------------------------
interface LikedItem {
  id: string | number;
  brand: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  likes: string | number;
  rating: number;
  reviews: number | string;
  image: string;
  badges: string[];
  saleStatus?: string;
}

// ----------------------------------------------------------------------
// 2. 메인 페이지 컴포넌트
// ----------------------------------------------------------------------
export default function LikeGoodsPage() {
  const { data: session } = useSession();
  const [counts, setCounts] = useState({ items: 0, brands: 0 });
  const [likedItems, setLikedItems] = useState<LikedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 토글 상태 관리
  const [isSaleOnly, setIsSaleOnly] = useState(false);
  const [isSellingOnly, setIsSellingOnly] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (session?.user?.id) {
      // Fetch counts
      getLikeCountsAction(session.user.id).then(res => {
        if (isMounted) setCounts({ items: res.itemsCount, brands: res.brandsCount });
      });

      // Fetch products
      getUserLikedProductsAction().then(res => {
        if (isMounted) {
          if (res.success && res.items) {
             setLikedItems(res.items);
          }
          setIsLoading(false);
        }
      });
    } else if (session === null) {
      // Not logged in
      setIsLoading(false);
    }
    
    return () => { isMounted = false; };
  }, [session]);


  // 숫자 포맷터
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 필터 적용
  const filteredItems = likedItems.filter(item => {
     if (isSellingOnly && item.saleStatus && item.saleStatus !== 'ON_SALE') return false;
     if (isSaleOnly && item.discount <= 0) return false;
     return true;
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="w-full px-4 pt-4">
        {/* ================= 1. Title ================= */}
        <h1 className="text-[18px] font-bold text-black mb-6">좋아요</h1>

        {/* ================= 2. Tabs ================= */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-0 relative z-20 bg-white">
          <button className="pb-3 border-b-2 border-black text-black font-bold text-[14px]">
            상품 <span className="ml-1">{counts.items}</span>
          </button>
          <Link 
            href="/like/brands"
            className="pb-3 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-[14px]"
          >
            브랜드 <span className="ml-1">{counts.brands}</span>
          </Link>
          <Link 
            href="/like/snaps"
            className="pb-3 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-[14px]"
          >
            스냅 <span className="ml-1">0</span>
          </Link>
          <Link 
            href="/like/folders"
            className="pb-3 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-[14px]"
          >
            내폴더 <span className="ml-1">0</span>
          </Link>
        </div>

        {/* ================= 3. Sub Categories (Grey Box) ================= */}
        <div className="-mx-4 bg-[#F3F3F3] py-3 px-4 flex items-center gap-4 mt-0">
          <button className="text-[12px] font-bold text-black">전체</button>
          <div className="w-[1px] h-[10px] bg-gray-300"></div>
          <button className="text-[12px] text-gray-500 hover:text-black">
            상의
          </button>
          <div className="w-[1px] h-[10px] bg-gray-300"></div>
          <button className="text-[12px] text-gray-500 hover:text-black">
            스포츠/레저
          </button>
        </div>

        {/* ================= 4. Controls (Toggles & Sort) ================= */}
        <div className="flex justify-between items-center py-4 mb-6">
          <div className="flex items-center gap-4">
            {/* 세일중 토글 */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsSaleOnly(!isSaleOnly)}
            >
              <div
                className={`w-9 h-5 rounded-full relative transition-colors ${
                  isSaleOnly ? "bg-black" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    isSaleOnly ? "left-[18px]" : "left-0.5"
                  }`}
                ></div>
              </div>
              <span className="text-[12px] text-gray-600">세일중</span>
            </div>

            {/* 판매 중 상품만 보기 토글 */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsSellingOnly(!isSellingOnly)}
            >
              <div
                className={`w-9 h-5 rounded-full relative transition-colors ${
                  isSellingOnly ? "bg-black" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    isSellingOnly ? "left-[18px]" : "left-0.5"
                  }`}
                ></div>
              </div>
              <span className="text-[12px] text-gray-600">
                판매 중 상품만 보기
              </span>
            </div>
          </div>

          {/* 정렬 Dropdown */}
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-[12px] text-black">담은순</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>

        {/* ================= 5. Product Grid ================= */}
        {isLoading ? (
            <div className="py-20 text-center text-gray-400 border-t">찜한 상품을 불러오는 중입니다...</div>
        ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center text-gray-500 border-t">
              {likedItems.length === 0 ? "찜한 상품이 없습니다." : "조건에 맞는 상품이 없습니다."}
            </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-2 gap-y-10 border-t pt-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col group cursor-pointer relative"
              >
                {/* 이미지 영역 */}
                <div className="relative w-full aspect-[3/4] mb-3 bg-gray-100 overflow-hidden rounded-[4px]">
                  <Link href={`/product/${item.id}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  {/* 하트 아이콘 */}
                  <LikeButton productId={item.id} initialIsLiked={true} />
                </div>

                {/* 브랜드 */}
                <Link href={`/product/${item.id}`}>
                  <p className="text-[11px] font-bold text-black mb-1.5 truncate">
                    {item.brand}
                  </p>

                  {/* 상품명 */}
                  <p className="text-[12px] text-black font-medium leading-tight mb-2 line-clamp-2 h-[34px] break-all">
                    {item.name}
                  </p>

                  {/* 가격 정보 */}
                  <div className="mb-2">
                    {item.discount > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] font-bold text-red-600">
                          {item.discount}%
                        </span>
                        <span className="text-[14px] font-bold text-black">
                          {formatPrice(item.price)}원
                        </span>
                      </div>
                    ) : (
                      <span className="text-[14px] font-bold text-black">
                        {formatPrice(item.price)}원
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
