"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { Heart } from "lucide-react";

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productImage: string;
}

// 더미 추천 상품 데이터
const RECOMMENDED_ITEMS_1 = [
  { id: 1, brand: "허그본", name: "무지 머슬핏 반팔 5컬러", price: 20000, discount: 20, image: "https://image.msscdn.net/images/goods_img/20230525/3322198/3322198_16850020188044_500.jpg" },
  { id: 2, brand: "베르만 어패럴", name: "와플 오버핏 롱슬리브 빈티지 차콜", price: 46750, discount: 40, image: "https://image.msscdn.net/images/goods_img/20220822/2733076/2733076_16611388085461_500.jpg" },
  { id: 3, brand: "나인티플러스", name: "테이퍼드 롱팬츠-블랙", price: 49000, discount: 0, image: "https://image.msscdn.net/images/goods_img/20220311/2412854/2412854_16469601003426_500.jpg" },
  { id: 4, brand: "드릭스", name: "(건조기사용가능) 코튼 머슬핏 반팔", price: 18900, discount: 21, image: "https://image.msscdn.net/images/goods_img/20230309/3135546/3135546_16783307484347_500.jpg" },
];

const RECOMMENDED_ITEMS_2 = [
  { id: 5, brand: "네파", name: "남여공용 코듀라 트레킹화", price: 89000, discount: 10, image: "https://image.msscdn.net/images/goods_img/20230224/3094055/3094055_16772186981451_500.jpg" },
  { id: 6, brand: "몽벨", name: "경량 패딩 자켓 블랙", price: 129000, discount: 15, image: "https://image.msscdn.net/images/goods_img/20221014/2857410/2857410_16657152012624_500.jpg" },
  { id: 7, brand: "컬럼비아", name: "남성 베이직 폴로 롱슬리브", price: 59000, discount: 0, image: "https://image.msscdn.net/images/goods_img/20230712/3382759/3382759_16891295968436_500.jpg" },
  { id: 8, brand: "K2", name: "하이킹 백팩 25L", price: 109000, discount: 5, image: "https://image.msscdn.net/images/goods_img/20230404/3204365/3204365_16805872473456_500.jpg" }
];

export default function AddToCartModal({ isOpen, onClose, productImage }: AddToCartModalProps) {
  const router = useRouter();

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-[#f8f9fa] w-full max-w-[500px] h-[85vh] md:h-[90vh] flex flex-col rounded-[2px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Section */}
        <div className="bg-[#f4f5f7] px-5 py-5 flex items-center gap-4 shrink-0 mt-3 mx-4 mb-2 rounded-[4px] border border-gray-100">
           <div className="w-12 h-12 bg-white rounded-md overflow-hidden relative border border-gray-200 shrink-0 flex items-center justify-center p-1">
               {productImage ? (
                   <Image src={productImage} alt="product" fill className="object-contain" />
               ) : (
                   <div className="w-full h-full bg-gray-200" />
               )}
           </div>
           <p className="font-bold text-[16px] text-gray-900 tracking-tight">장바구니에 상품을 담았습니다</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-2 font-sans pb-10 custom-scrollbar">
            
            {/* Section 1 */}
            <div className="mt-4 mb-8">
                <h3 className="font-bold text-[17px] text-gray-900 mb-4 tracking-tight">나와 비슷한 고객들이 구매한 상품</h3>
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
                    {RECOMMENDED_ITEMS_1.map(item => (
                        <div key={item.id} className="w-[120px] shrink-0 group cursor-pointer flex flex-col">
                            <div className="w-[120px] h-[160px] bg-gray-200 relative mb-2 rounded-[2px] overflow-hidden">
                                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                <button className="absolute bottom-1.5 right-1.5 p-1 pt-1.5 text-gray-400 hover:text-red-500 transition-colors">
                                    <Heart size={16} />
                                </button>
                            </div>
                            <p className="text-[11px] font-bold text-gray-900 leading-tight mb-1 truncate">{item.brand}</p>
                            <p className="text-[12px] text-gray-700 leading-snug line-clamp-2 h-[34px] break-keep">{item.name}</p>
                            <div className="mt-1 flex items-baseline gap-1">
                                {item.discount > 0 && <span className="text-[13px] font-bold text-red-500">{item.discount}%</span>}
                                <span className="text-[13px] font-bold text-gray-900">{item.price.toLocaleString()}원</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 2 */}
            <div className="mb-4">
                <h3 className="font-bold text-[17px] text-gray-900 mb-4 tracking-tight">스포츠 종목 아이템 추천 등산/아웃도어</h3>
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
                    {RECOMMENDED_ITEMS_2.map(item => (
                        <div key={item.id} className="w-[120px] shrink-0 group cursor-pointer flex flex-col">
                            <div className="w-[120px] h-[160px] bg-gray-200 relative mb-2 rounded-[2px] overflow-hidden">
                                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                <button className="absolute bottom-1.5 right-1.5 p-1 pt-1.5 text-gray-400 hover:text-red-500 transition-colors">
                                    <Heart size={16} />
                                </button>
                            </div>
                            <p className="text-[11px] font-bold text-gray-900 leading-tight mb-1 truncate">{item.brand}</p>
                            <p className="text-[12px] text-gray-700 leading-snug line-clamp-2 h-[34px] break-keep">{item.name}</p>
                            <div className="mt-1 flex items-baseline gap-1">
                                {item.discount > 0 && <span className="text-[13px] font-bold text-red-500">{item.discount}%</span>}
                                <span className="text-[13px] font-bold text-gray-900">{item.price.toLocaleString()}원</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-white px-5 py-4 border-t border-gray-200 flex gap-2 shrink-0">
            <button 
               onClick={onClose}
               className="flex-1 py-3.5 border border-gray-300 rounded-[3px] text-[15px] font-bold text-gray-800 hover:bg-gray-50 transition-colors leading-none"
            >
                닫기
            </button>
            <button 
               onClick={() => {
                   onClose();
                   router.push("/orders/cart");
               }}
               className="flex-1 py-3.5 bg-black rounded-[3px] text-[15px] font-bold text-white hover:bg-gray-800 transition-colors leading-none"
            >
                장바구니 보기
            </button>
        </div>
      </div>
    </div>
  );
}
