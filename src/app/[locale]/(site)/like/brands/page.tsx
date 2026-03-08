// src/app/[locale]/(site)/like/brands/page.tsx

"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

// ----------------------------------------------------------------------
// 1. 더미 데이터 (스크린샷 기반)
// ----------------------------------------------------------------------
const LIKED_BRANDS = [
  {
    id: 1,
    name: "본투원",
    logo: "https://image.msscdn.net/m_images/brand_logo/borntowin.png",
    likes: "3.3만",
    products: [
      {
        id: 101,
        name: "CHROME B FLEECE HOODIE ZIP-UP [BLACK]",
        brand: "본투원",
        price: 129000,
        image: "https://image.msscdn.net/images/goods_img/20231122/3719124/3719124_17006248981446_500.jpg",
      },
      {
        id: 102,
        name: "B SYMBOL BIG LOGO BALL CAP [CAMO]",
        brand: "본투원",
        price: 45000,
        image: "https://image.msscdn.net/images/goods_img/20230816/3465133/3465133_16921474252445_500.jpg",
      },
      {
        id: 103,
        name: "B-SYMBOL LOGO MUSCLE FIT T-SHIRTS [KHAKI]",
        brand: "본투원",
        price: 35000,
        originalPrice: 43750,
        discount: 20,
        image: "https://image.msscdn.net/images/goods_img/20230510/3295841/3295841_16836952758117_500.jpg",
      },
      {
        id: 104,
        name: "CHROME B FLEECE JACKET [BLACK]",
        brand: "본투원",
        price: 159000,
        image: "https://image.msscdn.net/images/goods_img/20231122/3719131/3719131_17006253457140_500.jpg",
      },
      {
        id: 105,
        name: "B1.5 BACKPACK NO PATCH VER [BLACK]",
        brand: "본투원",
        price: 164000,
        image: "https://image.msscdn.net/images/goods_img/20230222/3103855/3103855_16770415357117_500.jpg",
      },
      {
        id: 106,
        name: "CHROME B TRACK PANTS [BLACK]",
        brand: "본투원",
        price: 98000,
        image: "https://image.msscdn.net/images/goods_img/20231122/3719142/3719142_17006257857117_500.jpg",
      }
    ],
  },
  {
    id: 2,
    name: "스파이더",
    logo: "https://image.msscdn.net/m_images/brand_logo/spyder.png",
    likes: "1.2만",
    products: [
        {
            id: 201,
            name: "남성 에센셜 레귤러핏 후디 - BLACK",
            brand: "스파이더",
            price: 129000,
            image: "https://image.msscdn.net/images/goods_img/20230214/3090623/3090623_16763581172117_500.jpg",
        },
        {
            id: 202,
            name: "남성 에센셜 레귤러핏 맨투맨 - WHITE",
            brand: "스파이더",
            price: 109000,
            image: "https://image.msscdn.net/images/goods_img/20230214/3090615/3090615_16763579172117_500.jpg",
        }
    ]
  }
];

export default function LikeBrandsPage() {
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="w-full px-4 pt-4">
        {/* ================= 1. Title ================= */}
        <h1 className="text-[18px] font-bold text-black mb-6">좋아요</h1>

        {/* ================= 2. Tabs ================= */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-0 relative z-20 bg-white">
          <Link 
            href="/like/goods"
            className="pb-3 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-[14px]"
          >
            상품 <span className="ml-1 text-[11px]">4</span>
          </Link>
          <button className="pb-3 border-b-2 border-black text-black font-bold text-[14px]">
            브랜드 <span className="ml-1 text-[11px]">13</span>
          </button>
          <Link 
            href="/like/snaps"
            className="pb-3 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-[14px]"
          >
            스냅 <span className="ml-1 text-[11px]">0</span>
          </Link>
          <Link 
            href="/like/folders"
            className="pb-3 border-b-2 border-transparent text-gray-400 hover:text-black font-medium text-[14px]"
          >
            내폴더 <span className="ml-1 text-[11px]">0</span>
          </Link>
        </div>

        {/* ================= 3. Stats & FilterBar ================= */}
        <div className="flex justify-between items-center py-4 px-1">
          <span className="text-[13px] text-gray-400 font-medium">13개 브랜드</span>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-[12px] text-gray-600">담은순</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3 text-gray-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

        {/* ================= 4. Brand List ================= */}
        <div className="flex flex-col gap-14 mt-2">
          {LIKED_BRANDS.map((brand) => (
            <div key={brand.id} className="flex flex-col">
              {/* Brand Header */}
              <div className="flex justify-between items-center mb-4 px-1">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="relative w-8 h-8 rounded-full border border-gray-100 overflow-hidden bg-gray-50">
                    <Image src={brand.logo} alt={brand.name} fill className="object-contain p-1" />
                  </div>
                  <span className="text-[14px] font-bold text-black">{brand.name}</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-sm border border-gray-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5 text-red-600"
                    >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    <span className="text-[12px] font-bold text-black">{brand.likes}</span>
                </div>
              </div>

              {/* Product Preview (Horizontal Scroll) */}
              <div className="relative group">
                <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-2">
                    {brand.products.map((product) => (
                    <div key={product.id} className="min-w-[170px] flex flex-col cursor-pointer shrink-0">
                        {/* Image */}
                        <div className="relative aspect-[3/4] bg-gray-100 rounded-[2px] overflow-hidden mb-3">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                            {/* Heart Overlay */}
                            <div className="absolute bottom-2 right-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="white"
                                    className="w-4 h-4 text-white opacity-40"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </div>
                        </div>
                        {/* Info */}
                        <div className="px-1">
                            <p className="text-[12px] text-black font-medium leading-tight mb-2 line-clamp-2 h-[34px] break-all">
                                {product.name}
                            </p>
                            <div className="flex items-center gap-1.5">
                                {'discount' in product && (
                                    <span className="text-[13px] font-bold text-red-600">
                                        {(product as { discount: number }).discount}%
                                    </span>
                                )}
                                <span className="text-[13px] font-bold text-black">
                                    {formatPrice(product.price)}원
                                </span>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                {/* Arrow Button */}
                <div className="absolute right-[-14px] top-[30%] -translate-y-1/2 z-10 w-8 h-8 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
