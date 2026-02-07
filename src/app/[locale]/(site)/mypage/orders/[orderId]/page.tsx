"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import { getOrderDetailAction, type OrderDetail } from "@/actions/order-actions";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getOrderStatusKo, getPaymentMethodKo } from "@/lib/order-utils";

export default function OrderDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrderDetail = useCallback(async () => {
    if (!session?.user?.id) return;
    const result = await getOrderDetailAction(orderId, session.user.id);
    if (result.success && result.order) {
      setOrder(result.order as OrderDetail);
    } else {
      alert(result.message || "주문 상세 정보를 불러올 수 없습니다.");
      router.back();
    }
    setIsLoading(false);
  }, [orderId, session, router]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/member/login");
      return;
    }

    if (session?.user?.id && orderId) {
      fetchOrderDetail();
    }
  }, [session, status, orderId, fetchOrderDetail, router]);

  if (isLoading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  if (!order) return null;

  return (
    <div className="bg-white min-h-screen flex justify-center pb-20">
      <div className="w-full max-w-[960px] p-5">
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => router.back()} className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <h1 className="text-xl font-bold">주문 상세</h1>
        </div>

        <div className="space-y-8">
           {/* Order Summary Header */}
           <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
             <div className="flex flex-col md:flex-row md:justify-between gap-4">
               <div>
                  <p className="text-[12px] text-gray-500 mb-1">주문일시 {new Date(order.createdAt).toLocaleString()}</p>
                  <p className="text-lg font-bold">주문번호 {order.orderNo}</p>
               </div>
               <div className="flex items-center">
                  <span className="px-4 py-2 bg-black text-white font-bold rounded-sm text-sm">
                    {getOrderStatusKo(order.status)}
                  </span>
               </div>
             </div>
           </div>

           {/* Ordered Items */}
           <section>
             <h2 className="text-[16px] font-bold mb-4 border-b pb-2">주문 상품 정보</h2>
             <div className="divide-y divide-gray-100">
                {order.items.map((item) => (
                 <div key={item.id} className="flex gap-5 py-5">
                   <div className="relative w-24 h-32 bg-gray-100 flex-shrink-0">
                      {item.product?.images?.[0]?.url ? (
                        <Image src={item.product.images[0].url} alt={item.productName} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                      )}
                   </div>
                   <div className="flex-1">
                      <p className="text-[15px] font-bold text-black mb-1">{item.productName}</p>
                      <p className="text-[13px] text-gray-500">{item.optionName || "기본 옵션"}</p>
                      <div className="mt-3 flex items-center justify-between">
                         <div className="space-x-2">
                           <span className="text-[15px] font-bold">{item.price.toLocaleString()}원</span>
                           <span className="text-gray-300">|</span>
                           <span className="text-[13px]">{item.quantity}개</span>
                         </div>
                         <span className="text-[13px] font-bold text-gray-800">{getOrderStatusKo(item.status)}</span>
                      </div>
                      
                      {item.trackingNumber && (
                        <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-xs rounded-sm flex justify-between">
                          <span>{item.deliveryCompany}</span>
                          <span className="font-bold underline">{item.trackingNumber}</span>
                        </div>
                      )}
                   </div>
                 </div>
               ))}
             </div>
           </section>

           {/* Shipping Info */}
           <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-gray-100 p-6 rounded-lg">
                <h2 className="text-[15px] font-bold mb-4 border-b pb-2">배송지 정보</h2>
                <div className="space-y-3 text-[13px] text-gray-700">
                   <div className="flex"><span className="w-24 text-gray-400">수령인</span><span>{order.recipientName}</span></div>
                   <div className="flex"><span className="w-24 text-gray-400">연락처</span><span>{order.recipientMobile} {order.recipientPhone && `/ ${order.recipientPhone}`}</span></div>
                   <div className="flex"><span className="w-24 text-gray-400">주소</span><span className="flex-1">[{order.recipientZipcode}] {order.recipientAddress} {order.recipientAddressDetail}</span></div>
                   <div className="flex border-t border-gray-50 pt-2"><span className="w-24 text-gray-400">배송메모</span><span>{order.shippingMessage || "-"}</span></div>
                </div>
              </div>

              <div className="border border-gray-100 p-6 rounded-lg bg-gray-50">
                <h2 className="text-[15px] font-bold mb-4 border-b pb-2">결제 정보</h2>
                <div className="space-y-3 text-[13px] text-gray-700">
                   <div className="flex justify-between"><span>상품합계</span><span>{order.totalItemPrice.toLocaleString()}원</span></div>
                   <div className="flex justify-between"><span>배송비</span><span>{order.shippingFee.toLocaleString()}원</span></div>
                   <div className="flex justify-between border-t border-gray-200 pt-3 text-[16px]">
                      <span className="font-bold">최종 결제 금액</span>
                      <span className="font-bold text-black">{order.totalPayAmount.toLocaleString()}원</span>
                   </div>
                   <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-[12px] text-gray-500 mb-1">결제수단</p>
                      <p className="font-bold">{getPaymentMethodKo(order.paymentMethod)}</p>
                      {order.depositorName && <p className="text-[12px] mt-1 text-gray-600">입금자: {order.depositorName}</p>}
                   </div>
                </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
