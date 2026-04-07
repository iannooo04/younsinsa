"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getCartItemsAction, CartItemDTO } from "@/actions/cart-actions";

const DELIVERY_REQUEST_OPTIONS = [
  "문 앞에 놔주세요",
  "경비실에 맡겨주세요",
  "택배함에 넣어주세요",
  "배송 전에 연락 주세요",
  "직접입력",
];

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState<CartItemDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState("직접입력");
  const [customRequest, setCustomRequest] = useState("");

  useEffect(() => {
    async function fetchCart() {
      const userId = session?.user?.id;
      if (userId) {
        const result = await getCartItemsAction(userId);
        if (result.success && result.items) {
          setCartItems(result.items);
        }
        setIsLoading(false);
      } else if (status === "unauthenticated") {
        setIsLoading(false);
      }
    }
    
    if (status !== "loading") {
      fetchCart();
    }
  }, [session, status]);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalItemPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = totalItemPrice === 0 ? 0 : (totalItemPrice >= 50000 ? 0 : 2500);
  const totalPayAmount = totalItemPrice + shippingFee;

  if (isLoading) {
    return <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">Loading...</div>;
  }


  return (
    <div className="bg-[#f8f9fa] min-h-screen relative">
      <div className="max-w-[1000px] mx-auto pt-6 pb-20 px-4">
        <h1 className="text-[24px] font-bold text-black mb-6">주문서</h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column */}
          <div className="flex-1 space-y-8 w-full">
            
            {/* Delivery Address Section */}
            <section className="bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-[18px] font-bold text-black flex items-center gap-2">
                  노이안 <span className="text-[11px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-[2px] font-normal">기본 배송지</span>
                </h2>
                <button className="text-[13px] border border-gray-200 px-3 py-1.5 rounded-[4px] font-medium hover:bg-gray-50">배송지 변경</button>
              </div>
              <div className="text-[14px] text-gray-800 space-y-1 mb-4">
                <p>경기 시흥시 능곡중앙로 34 (휴먼시아) 시흥시 능곡동 휴먼시아 아파트 904동 705호</p>
                <p>010-5363-3970</p>
              </div>
              
              <div className="relative mb-2">
                <div 
                  className="w-full border border-gray-200 rounded-[4px] py-3 px-4 text-[14px] bg-white cursor-pointer flex justify-between items-center hover:border-black transition-colors"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="text-gray-900 leading-tight">
                    {selectedRequest}
                  </span>
                  <svg className="w-4 h-4 text-gray-400 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {selectedRequest === "직접입력" && (
                <div className="relative">
                  <textarea 
                    className="w-full border border-gray-200 rounded-[4px] p-4 text-[14px] outline-none focus:border-black resize-none min-h-[80px]"
                    placeholder="부재 시 집 앞에 놔주세요"
                    value={customRequest}
                    onChange={(e) => setCustomRequest(e.target.value)}
                    maxLength={50}
                  ></textarea>
                  <div className="absolute right-2 bottom-2 text-[11px] text-gray-400">{customRequest.length}/50</div>
                </div>
              )}
            </section>

            {/* Order Items Section */}
            <section className="bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm">
              <h2 className="text-[18px] font-bold text-black mb-5">주문 상품 {totalQuantity}개</h2>
              
              {cartItems.length > 0 ? (
                <div className="space-y-4 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-[84px] h-[100px] bg-gray-100 relative rounded-sm overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col py-1 flex-1">
                        <span className="text-[12px] font-bold text-gray-900 mb-0.5">{item.brandName}</span>
                        <span className="text-[13px] font-medium text-gray-800 mb-1 line-clamp-2">{item.name}</span>
                        <span className="text-[12px] text-gray-400 mb-2">
                          {item.optionName && item.optionName !== "옵션 있음" ? `${item.optionName} / ` : ''}{item.quantity}개
                        </span>
                        <span className="text-[15px] font-bold text-gray-900">{(item.price * item.quantity).toLocaleString()}원</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[14px] text-gray-500 mb-4 h-[100px] flex items-center justify-center">담긴 상품이 없습니다.</div>
              )}
              <div className="bg-[#f8f9fa] rounded-[4px] py-3 text-center text-[13px] font-medium text-gray-700 mb-2">
                04.09(목) 도착 예정
              </div>
              <button className="w-full border border-gray-200 rounded-[4px] py-3 text-[14px] font-bold hover:bg-gray-50 transition-colors">
                쿠폰 사용
              </button>
            </section>

            {/* Payment Method Section */}
            <section className="bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm">
              <h2 className="text-[18px] font-bold text-black mb-5">결제 수단</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="w-5 h-5 accent-black focus:ring-black" defaultChecked />
                  <span className="font-bold text-[15px] text-black">카드 결제</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="w-5 h-5 accent-black focus:ring-black" />
                  <span className="font-bold text-[15px] text-black">알리 페이</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" className="w-5 h-5 accent-black focus:ring-black" />
                  <span className="font-bold text-[15px] text-black">위쳇 페이</span>
                </label>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="w-full lg:w-[320px] shrink-0 sticky top-24 space-y-4">
            
            <div className="bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm">
              <h2 className="text-[16px] font-bold text-black mb-5">결제 금액</h2>
              <div className="space-y-3 mb-5 border-b border-gray-100 pb-5">
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-600">상품 금액</span>
                  <span className="text-black font-medium">{totalItemPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-600">배송비</span>
                  <span className={shippingFee === 0 ? "text-blue-500 font-medium" : "text-black font-medium"}>
                    {shippingFee === 0 ? "무료배송" : `+${shippingFee.toLocaleString()}원`}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-white mb-2">
                <span className="flex-1 text-[16px] font-bold text-black">총 결제 금액</span>
                <span className="text-[22px] font-extrabold text-black tracking-tight">{totalPayAmount.toLocaleString()}원</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[8px] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between text-[13px] text-gray-500 mb-6">
                <span>주문 내용을 확인했으며 결제에 동의합니다.</span>
                <span className="underline cursor-pointer">자세히</span>
              </div>

              <button 
                className="w-full bg-black text-white py-4 text-[16px] font-bold rounded-[6px] hover:bg-black/90 transition-colors flex items-center justify-center gap-1 shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
              >
                <span className="text-white">{totalPayAmount.toLocaleString()}원 결제하기</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Delivery Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white w-full max-w-[420px] rounded-[12px] p-6 shadow-xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[18px] font-bold text-black">배송 요청사항</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-black hover:bg-gray-100 p-1 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col mt-2">
              {DELIVERY_REQUEST_OPTIONS.map((option) => (
                <button
                  key={option}
                  className={`w-full text-left py-4 text-[15px] ${
                    selectedRequest === option ? 'font-bold text-black' : 'text-gray-700 hover:text-black'
                  }`}
                  onClick={() => {
                    setSelectedRequest(option);
                    setIsModalOpen(false);
                    if (option !== "직접입력") {
                      setCustomRequest("");
                    }
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
