// src/app/[locale]/(site)/orders/cart/page.tsx

"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import { 
    getCartItemsAction, 
    updateCartItemAction, 
    removeCartItemsAction,
    CartItemDTO 
} from "@/actions/cart-actions";

// 더미 데이터: 추천 아이템 (Keep as dummy for now)
const RECOMMENDED_ITEMS = [
  {
    id: 7,
    brand: "브렌슨",
    name: "(Renew Ver.) 원턱 와이드 스웨트...",
    price: 29900,
    originalPrice: 39900,
    discount: 20,
    image:
      "https://image.msscdn.net/images/goods_img/20210826/2093554/2093554_2_500.jpg",
    optionSeparate: true,
  },
  {
    id: 8,
    brand: "혼다 모터사이클",
    name: "Vintage Cutoff Hoodie Spray...",
    price: 76300,
    originalPrice: 109000,
    discount: 30,
    image:
      "https://image.msscdn.net/images/goods_img/20230914/3558231/3558231_16946761565578_500.jpg",
  },
  {
    id: 9,
    brand: "미즈노",
    name: "LIGHT PADDING MTM_32YE46...",
    price: 104300,
    originalPrice: 149000,
    discount: 30,
    image:
      "https://image.msscdn.net/images/goods_img/20230822/3474327/3474327_16926838848464_500.jpg",
  },
  {
    id: 10,
    brand: "혼다 모터사이클",
    name: "Logo Artwork Sweat Pants...",
    price: 62300,
    originalPrice: 89000,
    discount: 30,
    image:
      "https://image.msscdn.net/images/goods_img/20230821/3472099/3472099_16925828453472_500.jpg",
  },
  {
    id: 11,
    brand: "혼다 모터사이클",
    name: "Honda Small Wing Rivet poi...",
    price: 76300,
    originalPrice: 109000,
    discount: 30,
    image:
      "https://image.msscdn.net/images/goods_img/20230821/3472064/3472064_16925821544259_500.jpg",
  },
  {
    id: 12,
    brand: "혼다 모터사이클",
    name: "Honda Wing logo Short...",
    price: 139300,
    originalPrice: 199000,
    discount: 30,
    image:
      "https://image.msscdn.net/images/goods_img/20230821/3472052/3472052_16925816947231_500.jpg",
  },
];

export default function CartPage() {
  const t = useTranslations("cart");
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState<CartItemDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 숫자 포맷터 (예: 1,000)
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    async function fetchCart() {
        if (status === "loading") return;
        
        // If not logged in, we assume empty or check local storage in future.
        const userId = session?.user?.id;
        if (userId) {
            setIsLoading(true);
            try {
                const result = await getCartItemsAction(userId);
                if (result.success && result.items) {
                    setCartItems(result.items);
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }
    fetchCart();
  }, [session, status]);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
      if (newQuantity < 1) return;
      
      // Optimistic update
      const previousItems = [...cartItems];
      setCartItems(prev => prev.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));

      try {
          const result = await updateCartItemAction(itemId, newQuantity);
          if (!result.success) {
              alert(result.message || "Failed to update quantity");
              setCartItems(previousItems);
          }
      } catch (error) {
          console.error("Update failed", error);
          setCartItems(previousItems);
      }
  };

  const handleRemoveItem = async (itemId: string) => {
      if (!confirm("장바구니에서 삭제하시겠습니까?")) return;

      // Optimistic update
      const previousItems = [...cartItems];
      setCartItems(prev => prev.filter(item => item.id !== itemId));

      try {
          const result = await removeCartItemsAction([itemId]);
          if (!result.success) {
              alert(result.message || "Failed to remove item");
              setCartItems(previousItems);
          }
      } catch (error) {
          console.error("Remove failed", error);
          setCartItems(previousItems);
      }
  };

  if (status === "loading" || (status === "authenticated" && isLoading)) {
      return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    // 전체 배경은 흰색, 내용은 중앙 정렬
    <div className="min-h-screen bg-white flex justify-center">
      {/* 마이페이지와 동일한 960px 너비 적용 (여백 일치) */}
      <div className="w-full max-w-[960px] bg-[#F9F9F9] min-h-screen pb-[100px] relative shadow-sm">
        {/* 🛠️ [수정] pt-10 -> pt-3 (타이틀을 더 위쪽으로 올림) */}
        <div className="px-4 pt-3">
          {/* 1. 상단 타이틀 */}
          <h1 className="text-[18px] font-bold text-black mb-6">
            {t("title")}
          </h1>

          {/* 2. 장바구니 아이템 리스트 */}
          {cartItems.length > 0 ? (
            <div className="bg-white border border-[#E5E5E5] mb-10">
                {cartItems.map((item) => (
                    <div key={item.id} className="p-4 border-b border-[#EEE] last:border-b-0 flex gap-4">
                        {/* Checkbox (Optional implementation) */}
                        {/* <input type="checkbox" className="mt-2" /> */}
                        
                        {/* Image */}
                        <div className="relative w-[80px] h-[100px] bg-gray-100 flex-shrink-0">
                            <Image 
                                src={item.image} 
                                alt={item.name} 
                                fill 
                                className="object-cover" 
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-[14px] font-bold text-black">{item.name}</h3>
                                {item.optionName && (
                                    <p className="text-[12px] text-[#666] mt-1">{item.optionName}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <button 
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    className="w-6 h-6 border border-[#DDD] flex items-center justify-center bg-white"
                                >-</button>
                                <span className="text-[13px] w-8 text-center">{item.quantity}</span>
                                <button 
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    className="w-6 h-6 border border-[#DDD] flex items-center justify-center bg-white"
                                >+</button>
                            </div>
                        </div>

                        {/* Price & Delete */}
                        <div className="flex flex-col items-end justify-between">
                            <button onClick={() => handleRemoveItem(item.id)} className="text-[18px] text-[#999]">&times;</button>
                            <span className="text-[14px] font-bold">
                                {formatPrice(item.price * item.quantity)}{t("unit_won")}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
          ) : (
             /* 3. 장바구니 비어있음 영역 */
            <div className="flex flex-col items-center justify-center py-20 mb-16">
                <p className="text-[14px] font-bold text-black mb-4">
                {t("empty_message")}
                </p>
                <div 
                  className="px-4 py-2 bg-white border border-[#E5E5E5] text-[12px] font-medium text-black rounded-[3px] hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {/* Navigate to main or similar */}}
                >
                  {t("view_liked_items")}
                </div>
            </div>
          )}

          {/* 5. 스포티 스타일 브랜드 아이템 추천 (DUMMY) */}
          <div className="mb-20">
            <h2 className="text-[16px] font-bold text-black mb-4">
              {t("recommended_title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-2 gap-y-8">
              {RECOMMENDED_ITEMS.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  t={t}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 6. 하단 고정 버튼 (Total Price) */}
        {cartItems.length > 0 && (
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#E5E5E5] p-4 flex justify-center z-50">
            <button 
                onClick={() => router.push("/orders/checkout")}
                className="w-full max-w-[960px] h-[56px] bg-black text-white text-[16px] font-bold rounded-[3px] hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
            >
                <span>{cartItems.length}개 상품 구매하기</span>
                <span>
                    ({formatPrice(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0))}{t("unit_won")})
                </span>
            </button>
            </div>
        )}
      </div>
    </div>
  );
}

// 개별 상품 카드 컴포넌트 (For Recommendations)
function ProductCard({
  item,
  t,
  formatPrice,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  formatPrice: (price: number) => string;
}) {
  return (
    <div className="flex flex-col group cursor-pointer">
      <div className="relative w-full aspect-[3/4] mb-3 bg-gray-100 overflow-hidden rounded-[4px]">
        {/* 상품 이미지 */}
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* 브랜드 */}
      <p className="text-[11px] font-bold text-black mb-1 truncate">
        {item.brand}
      </p>

      {/* 상품명 */}
      <p className="text-[12px] text-black leading-tight mb-2 line-clamp-2 h-[32px]">
        {item.name}
      </p>

      {/* 가격 정보 */}
      <div className="mt-auto">
        {item.discount > 0 ? (
          <div className="flex flex-col">
            {/* 할인율 + 할인가 */}
            <div className="flex items-center gap-1">
              <span className="text-[13px] font-bold text-[#FF0000]">
                {item.discount}%
              </span>
              <span className="text-[13px] font-bold text-black">
                {formatPrice(item.price)}
                {t("unit_won")}
              </span>
            </div>
            {/* 정가 (취소선) */}
            <span className="text-[11px] text-[#AAAAAA] line-through">
              {formatPrice(item.originalPrice)}
              {t("unit_won")}
            </span>
          </div>
        ) : (
          <span className="text-[13px] font-bold text-black">
            {formatPrice(item.price)}
            {t("unit_won")}
          </span>
        )}
      </div>
    </div>
  );
}
