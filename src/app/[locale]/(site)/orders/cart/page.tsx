"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import { 
    getCartItemsAction, 
    updateCartItemAction, 
    removeCartItemsAction,
    CartItemDTO 
} from "@/actions/cart-actions";
import { Heart, X, ChevronDown } from "lucide-react";

// 더미 데이터: 추천 아이템 (Keep as dummy for now)
const RECOMMENDED_ITEMS = [
  { id: 7, brand: "벤틀리골프", name: "DRIVER BD1", price: 2283000, originalPrice: 2283000, discount: 0, image: "https://image.msscdn.net/images/goods_img/20210826/2093554/2093554_2_500.jpg" },
  { id: 8, brand: "젝시오", name: "젝시오12 드라이버", price: 396000, originalPrice: 825000, discount: 52, image: "https://image.msscdn.net/images/goods_img/20230914/3558231/3558231_16946761565578_500.jpg" },
  { id: 9, brand: "우알롱", name: "Dynamic balloon over hoodie - Grey", price: 43500, originalPrice: 87000, discount: 50, image: "https://image.msscdn.net/images/goods_img/20230822/3474327/3474327_16926838848464_500.jpg" },
  { id: 10, brand: "제이미웨스트", name: "사이먼 드라이버 골프스킨", price: 58000, originalPrice: 58000, discount: 0, image: "https://image.msscdn.net/images/goods_img/20230821/3472099/3472099_16925828453472_500.jpg" },
  { id: 11, brand: "제이미웨스트", name: "플레임 드라이버 골프스킨", price: 58000, originalPrice: 58000, discount: 0, image: "https://image.msscdn.net/images/goods_img/20230821/3472064/3472064_16925821544259_500.jpg" },
  { id: 12, brand: "나이키", name: "에어 포스 1 '07 - 블랙", price: 149000, originalPrice: 149000, discount: 0, image: "https://image.msscdn.net/images/goods_img/20230821/3472052/3472052_16925816947231_500.jpg" },
];

export default function CartPage() {
  const t = useTranslations("cart");
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [cartItems, setCartItems] = useState<CartItemDTO[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTargetId, setDeleteTargetId] = useState<string | 'selected' | null>(null);

  // 숫자 포맷터 (예: 1,000)
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    async function fetchCart() {
        if (status === "loading") return;
        
        const userId = session?.user?.id;
        if (userId) {
            setIsLoading(true);
            try {
                const result = await getCartItemsAction(userId);
                if (result.success && result.items) {
                    setCartItems(result.items);
                    // 기본적으로 모든 아이템 선택 상태로 시작
                    setSelectedItemIds(result.items.map(item => item.id));
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

  // -- 수량 조절 및 삭제 로직 --
  const _handleQuantityChange = async (itemId: string, newQuantity: number) => {
      if (newQuantity < 1) return;
      const previousItems = [...cartItems];
      setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));

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

  const confirmDelete = async () => {
      if (!deleteTargetId) return;

      if (deleteTargetId === 'selected') {
          const previousItems = [...cartItems];
          setCartItems(prev => prev.filter(item => !selectedItemIds.includes(item.id)));
          const idsToDelete = [...selectedItemIds];
          setSelectedItemIds([]);

          try {
              const result = await removeCartItemsAction(idsToDelete);
              if (!result.success) {
                  alert(result.message || "삭제 실패");
                  setCartItems(previousItems);
                  setSelectedItemIds(idsToDelete);
              }
          } catch (error) {
              console.error("Bulk remove failed", error);
              setCartItems(previousItems);
              setSelectedItemIds(idsToDelete);
          }
      } else {
          const itemId = deleteTargetId;
          const previousItems = [...cartItems];
          setCartItems(prev => prev.filter(item => item.id !== itemId));
          setSelectedItemIds(prev => prev.filter(id => id !== itemId));

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
      }
      setDeleteTargetId(null);
  };

  const handleRemoveSelectedClick = () => {
      if (selectedItemIds.length === 0) return alert("선택된 상품이 없습니다.");
      setDeleteTargetId('selected');
  };

  // -- 체크박스 로직 --
  const handleToggleSelectAll = () => {
      if (selectedItemIds.length === cartItems.length) {
          setSelectedItemIds([]);
      } else {
          setSelectedItemIds(cartItems.map(item => item.id));
      }
  };

  const handleToggleBrand = (brandItems: CartItemDTO[]) => {
      const brandItemIds = brandItems.map(i => i.id);
      const isAllSelected = brandItemIds.every(id => selectedItemIds.includes(id));
      
      if (isAllSelected) {
          setSelectedItemIds(prev => prev.filter(id => !brandItemIds.includes(id)));
      } else {
          setSelectedItemIds(prev => Array.from(new Set([...prev, ...brandItemIds])));
      }
  };

  const handleToggleItem = (itemId: string) => {
      if (selectedItemIds.includes(itemId)) {
          setSelectedItemIds(prev => prev.filter(id => id !== itemId));
      } else {
          setSelectedItemIds(prev => [...prev, itemId]);
      }
  };

  // -- 데이터 가공 --
  // 브랜드별 그룹핑 (ex: { "벤틀리골프": [CartItemDTO], "무신사스탠다드": [...] })
  const itemsByBrand = useMemo(() => {
      const grouped: Record<string, CartItemDTO[]> = {};
      cartItems.forEach(item => {
          const brand = item.brandName || "일반브랜드";
          if (!grouped[brand]) grouped[brand] = [];
          grouped[brand].push(item);
      });
      return grouped;
  }, [cartItems]);

  // 선택된 아이템 총액 계산
  const selectedItemsDetails = cartItems.filter(item => selectedItemIds.includes(item.id));
  const totalOriginalPrice = selectedItemsDetails.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const totalActualPrice = selectedItemsDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const discountAmount = totalOriginalPrice - totalActualPrice;
  const shippingCost = selectedItemsDetails.length > 0 ? (totalActualPrice >= 50000 ? 0 : 3000) : 0;
  const finalPrice = totalActualPrice + shippingCost;
  const rewardPoints = selectedItemsDetails.length > 0 ? Math.floor(totalActualPrice * 0.05) : 0; // Mock 5% reward

  if (status === "loading" || (status === "authenticated" && isLoading)) {
      return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col items-center pt-8 pb-32">
      {/* Container */}
      <div className="w-full max-w-[1200px] px-4 md:px-8">
        
        {/* Title */}
        <h1 className="text-[24px] font-bold text-black mb-6">장바구니</h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start relative justify-between">
          
          {/* =========== LEFT COLUMN: CART ITEMS =========== */}
          <div className="flex-1 w-full lg:max-w-[64%] bg-transparent flex flex-col gap-5">
            
            {/* 상단 컨트롤 바 */}
            {cartItems.length > 0 && (
                <div className="bg-white p-4 flex items-center justify-between border-b-[2px] border-black">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="w-[18px] h-[18px] accent-black cursor-pointer"
                            checked={selectedItemIds.length === cartItems.length && cartItems.length > 0}
                            onChange={handleToggleSelectAll}
                        />
                        <span className="text-[15px] font-bold text-gray-900">전체 선택</span>
                    </label>
                    <button 
                        onClick={handleRemoveSelectedClick}
                        className="text-[13px] font-bold border border-gray-300 px-3 py-1.5 rounded-[3px] text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        선택 삭제
                    </button>
                </div>
            )}

            {cartItems.length === 0 ? (
                <div className="bg-white flex flex-col items-center justify-center py-32 mb-8 shadow-sm">
                    <p className="text-[15px] text-gray-500 mb-4">{t("empty_message")}</p>
                    <button 
                        onClick={() => router.push("/")}
                        className="px-6 py-2 bg-black text-white text-[14px] font-bold rounded-[3px] hover:bg-gray-800 transition-colors"
                    >
                        쇼핑 계속하기
                    </button>
                </div>
            ) : (
                /* 브랜드 반복 렌더링 */
                Object.entries(itemsByBrand).map(([brandName, items]) => {
                    const brandItemIds = items.map(i => i.id);
                    const isAllBrandSelected = brandItemIds.every(id => selectedItemIds.includes(id));
                    
                    return (
                        <div key={brandName} className="bg-white shadow-sm flex flex-col rounded-[2px] overflow-hidden">
                            {/* 브랜드 헤더 */}
                            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="w-[18px] h-[18px] accent-black cursor-pointer"
                                        checked={isAllBrandSelected}
                                        onChange={() => handleToggleBrand(items)}
                                    />
                                    <span className="text-[16px] font-bold text-gray-900">{brandName}</span>
                                </label>
                                <button className="text-[13px] text-gray-500 underline underline-offset-2 hover:text-black">
                                    브랜드숍
                                </button>
                            </div>

                            {/* 상품 리스트 */}
                            <div className="flex flex-col">
                                {items.map((item, idx) => (
                                    <div key={item.id} className={`p-5 flex flex-col ${idx !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                        
                                        <div className="flex gap-4 relative">
                                            {/* 개별 아이템 체크박스 */}
                                            <input 
                                                type="checkbox" 
                                                className="w-[18px] h-[18px] accent-black cursor-pointer mt-1"
                                                checked={selectedItemIds.includes(item.id)}
                                                onChange={() => handleToggleItem(item.id)}
                                            />
                                            
                                            {/* 상품 이미지 */}
                                            <div className="relative w-[90px] h-[110px] bg-gray-100 rounded-[3px] overflow-hidden shrink-0 border border-gray-100">
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            </div>

                                            {/* 상품 정보 */}
                                            <div className="flex-1 pr-8">
                                                <h3 className="text-[15px] text-gray-900 font-bold mb-1 leading-snug">{item.name}</h3>
                                                <p className="text-[13px] text-gray-500 mb-2">
                                                    {item.optionName ? `${item.optionName} / ${item.quantity}개` : `기본 옵션 / ${item.quantity}개`}
                                                </p>
                                                <div className="text-[18px] font-bold text-gray-900 font-sans tracking-tight">
                                                    {formatPrice(item.price * item.quantity)}원
                                                </div>
                                            </div>

                                            {/* 닫기 버튼 */}
                                            <button 
                                                onClick={() => setDeleteTargetId(item.id)}
                                                className="absolute right-0 top-0 text-gray-400 hover:text-black"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* 배송 예정 메시지 */}
                                        <div className="mt-4 bg-[#f8f9fa] rounded-[3px] py-3 text-center text-[12px] font-medium text-gray-700">
                                            주문 제작 05.28(목) 발송 예정 <span className="inline-flex w-[14px] h-[14px] rounded-full border border-gray-400 items-center justify-center text-[9px] text-gray-500 ml-0.5 align-middle">i</span>
                                        </div>

                                        {/* 옵션 & 쿠폰 버튼 */}
                                        <div className="flex gap-2 mt-3 w-full">
                                            <button className="flex-1 py-2.5 border border-gray-200 rounded-[3px] text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                                옵션 변경
                                            </button>
                                            <button className="flex-1 py-2.5 border border-gray-200 rounded-[3px] text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                                쿠폰 사용
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })
            )}

            {/* =========== 추천 상품 섹션 (Slider Mock) =========== */}
            <div className="mt-6 mb-8">
                <h2 className="text-[18px] font-bold text-black mb-4 tracking-tight">내가 전에 보고 놓쳤던 상품 다시보기</h2>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 pr-4">
                    {RECOMMENDED_ITEMS.map((item) => (
                        <div key={item.id} className="w-[140px] shrink-0 group cursor-pointer flex flex-col relative">
                            <div className="w-[140px] h-[175px] bg-gray-200 relative mb-3 rounded-[2px] overflow-hidden">
                                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                                <button className="absolute bottom-2 right-2 text-gray-400 hover:text-red-500 transition-colors">
                                    <Heart className="w-5 h-5" strokeWidth={2} />
                                </button>
                            </div>
                            <p className="text-[11px] font-bold text-gray-900 leading-tight mb-1 truncate">{item.brand}</p>
                            <p className="text-[13px] text-gray-800 leading-snug line-clamp-2 h-[38px] break-keep">{item.name}</p>
                            <div className="mt-1 flex items-baseline gap-1">
                                {item.discount > 0 && <span className="text-[14px] font-bold text-red-500">{item.discount}%</span>}
                                <span className="text-[14px] font-bold text-gray-900">{formatPrice(item.price)}원</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-10">
                <h2 className="text-[18px] font-bold text-black mb-4 tracking-tight">캐주얼 스타일 브랜드 아이템 추천</h2>
                {/* Could add another slider here like the image */}
            </div>

          </div>


          <div className="w-full lg:w-[34%] xl:w-[360px] shrink-0 flex flex-col gap-4 sticky top-[80px]">
              
              {/* Box 1: 구매 금액 */}
              <div className="bg-white p-6 shadow-sm rounded-[2px]">
                  <h3 className="text-[18px] font-bold text-gray-900 mb-5">구매 금액</h3>
                  
                  <div className="space-y-4 mb-5 border-b border-gray-100 pb-5">
                      <div className="flex justify-between items-center text-[15px]">
                          <span className="text-gray-600">상품 금액</span>
                          <span className="text-gray-900 font-medium">{formatPrice(totalOriginalPrice)}원</span>
                      </div>
                      <div className="flex justify-between items-center text-[15px]">
                          <span className="text-gray-600">할인 금액</span>
                          <span className={`${discountAmount > 0 ? 'text-[#3b82f6]' : 'text-gray-900'} font-medium`}>{discountAmount > 0 ? `-${formatPrice(discountAmount)}원` : "0원"}</span>
                      </div>
                      <div className="flex justify-between items-center text-[15px]">
                          <span className="text-gray-600">배송비</span>
                          <span className={shippingCost === 0 && selectedItemsDetails.length > 0 ? "text-[#3b82f6] font-medium" : "text-gray-900 font-medium"}>
                              {selectedItemsDetails.length === 0 ? "0원" : shippingCost === 0 ? "무료배송" : `${formatPrice(shippingCost)}원`}
                          </span>
                      </div>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                      <span className="text-[16px] font-bold text-gray-900">총 구매 금액</span>
                      <span className="text-[20px] font-bold text-gray-900">{formatPrice(finalPrice)}원</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] text-gray-500">
                      <span>적립혜택 예상</span>
                      <span>최대 {formatPrice(rewardPoints)}원</span>
                  </div>
              </div>

              {/* Box 2: 결제 혜택 */}
              <div className="bg-white p-6 shadow-sm rounded-[2px] flex flex-col">
                  <h3 className="text-[18px] font-bold text-gray-900 mb-5">결제 혜택</h3>
                  
                  <div className="mb-5">
                      <h4 className="text-[14px] font-bold text-gray-900 mb-3">무신사 현대카드 혜택</h4>
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center shrink-0">
                                  {/* mock card icon */}
                                  <div className="w-3 h-1.5 bg-white opacity-20" />
                              </div>
                              <span className="text-[14px] text-gray-700">무신사 현대카드 즉시 할인 3만원</span>
                          </div>
                          <button className="text-[11px] font-bold px-2 py-1 border border-gray-300 rounded-[2px]">할인 받기</button>
                      </div>
                  </div>

                  <div className="mb-5">
                      <h4 className="text-[14px] font-bold text-gray-900 mb-3">즉시 할인</h4>
                      <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                              {/* toss icon */}
                              <div className="w-4 h-4 rounded-full bg-[#0050ff] flex items-center justify-center shrink-0">
                                  <span className="text-[10px] text-white">t</span>
                              </div>
                              <span className="text-[13px] text-gray-700 truncate">토스페이 × 삼성카드 <span className="text-gray-500">15만원 이상 결제 시 6천원 즉시 ...</span></span>
                          </div>
                          <div className="flex items-center gap-2">
                              {/* nh icon */}
                              <div className="w-4 h-4 rounded-full bg-[#18a44b] flex items-center justify-center shrink-0">
                                  <span className="text-[10px] text-white">n</span>
                              </div>
                              <span className="text-[13px] text-gray-700 truncate">무신사페이 × 농협카드 <span className="text-gray-500">8만원 이상 결제 시 3천원 즉...</span></span>
                          </div>
                      </div>
                  </div>

                  {/* Blue Banner Map */}
                  <div className="bg-[#eff5ff] rounded-[6px] p-4 flex items-center justify-between cursor-pointer hover:bg-[#e4efff] transition-colors">
                      <div className="flex items-center gap-3">
                          <div className="w-[42px] h-[42px] bg-white rounded-[4px] flex items-center justify-center font-bold text-[10px] tracking-tight shadow-sm shrink-0">
                              <span className="text-black">M</span> <span className="text-gray-500 font-normal">Money</span>
                          </div>
                          <div className="flex flex-col">
                              <span className="text-[14px] font-bold text-gray-900 leading-tight mb-0.5">무신사머니 첫 결제 시</span>
                              <span className="text-[14px] font-bold text-[#3b82f6] leading-tight">10% 추가 적립</span>
                          </div>
                      </div>
                      <button className="bg-[#dfebff] text-gray-700 border border-[#c4daff] text-[12px] font-bold px-3 py-1.5 rounded-[4px]">
                          혜택 확인
                      </button>
                  </div>

                  <div className="mt-5 border-t border-gray-100 pt-5 flex justify-between items-center cursor-pointer">
                      <span className="text-[14px] font-bold text-gray-900">유의 사항</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
              </div>

              {/* Checkout Button */}
              <button 
                  onClick={() => selectedItemIds.length > 0 ? router.push("/orders/checkout") : alert("상품을 선택해주세요.")}
                  className={`w-full py-4 rounded-[4px] text-[16px] font-bold text-white transition-colors flex items-center justify-center gap-2 mt-2 ${selectedItemIds.length > 0 ? 'bg-black hover:bg-gray-800' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                  <span>{selectedItemIds.length}개 상품 구매하기</span>
              </button>


          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-[16px] w-[320px] p-6 shadow-xl relative overflow-hidden flex flex-col items-center animate-in fade-in zoom-in duration-200">
                <h3 className="text-[18px] font-bold text-black mb-8 mt-2 text-center">상품을 삭제하시겠습니까?</h3>
                <div className="flex gap-2 w-full">
                    <button 
                        onClick={() => setDeleteTargetId(null)}
                        className="flex-1 py-[14px] bg-white border border-gray-300 rounded-[8px] text-[15px] font-bold text-black transition-colors hover:bg-gray-50 flex items-center justify-center leading-none"
                    >
                        취소
                    </button>
                    <button 
                        onClick={confirmDelete}
                        className="flex-1 py-[14px] bg-black text-white rounded-[8px] text-[15px] font-bold transition-colors hover:bg-gray-800 flex items-center justify-center leading-none"
                    >
                        삭제하기
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
