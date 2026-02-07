"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { getOrderDetailAction } from "@/actions/order-actions";
import { useParams } from "next/navigation";

// Simple type definition for Order with items
type OrderDetail = Awaited<ReturnType<typeof getOrderDetailAction>>['order'];

export default function OrderCompletePage() {
    const router = useRouter();
    const params = useParams();
    const orderId = params.orderId as string;

    const [order, setOrder] = useState<OrderDetail>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOrder() {
            if (!orderId) return;
            const result = await getOrderDetailAction(orderId);
            if (result.success && result.order) {
                setOrder(result.order);
            } else {
                alert(result.message || "주문 정보를 불러올 수 없습니다.");
            }
            setIsLoading(false);
        }
        fetchOrder();
    }, [orderId]);

    const formatPrice = (price: number) => price.toLocaleString();

    if (isLoading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
    if (!order) return <div className="min-h-screen flex justify-center items-center">주문을 찾을 수 없습니다.</div>;

    return (
        <div className="min-h-screen bg-white flex justify-center py-10">
            <div className="w-full max-w-[800px] px-4">
                <div className="text-center mb-12">
                     <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                         ✓
                     </div>
                     <h1 className="text-3xl font-bold mb-2">주문이 완료되었습니다.</h1>
                     <p className="text-gray-600">주문번호: <span className="font-bold text-black">{order.orderNo}</span></p>
                </div>

                <div className="border border-gray-200 rounded-md p-6 mb-8">
                    <h2 className="text-lg font-bold mb-4 border-b pb-2">배송지 정보</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex">
                            <span className="w-24 text-gray-500">받는사람</span>
                            <span className="font-medium">{order.recipientName}</span>
                        </div>
                        <div className="flex">
                            <span className="w-24 text-gray-500">연락처</span>
                            <span className="font-medium">{order.recipientMobile}</span>
                        </div>
                        <div className="flex">
                            <span className="w-24 text-gray-500">주소</span>
                            <span className="font-medium">
                                [{order.recipientZipcode}] {order.recipientAddress} {order.recipientAddressDetail}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-24 text-gray-500">배송메세지</span>
                            <span className="font-medium">{order.shippingMessage || "-"}</span>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-md p-6 mb-8">
                    <h2 className="text-lg font-bold mb-4 border-b pb-2">결제 정보</h2>
                    <div className="space-y-2 text-sm">
                         <div className="flex">
                            <span className="w-24 text-gray-500">결제수단</span>
                            <span className="font-medium">
                                {order.paymentMethod === 'BANK_TRANSFER' ? '무통장입금' : '신용/체크카드'}
                            </span>
                        </div>
                        {order.paymentMethod === 'BANK_TRANSFER' && (
                             <div className="flex">
                                <span className="w-24 text-gray-500">입금자명</span>
                                <span className="font-medium">{order.depositorName}</span>
                            </div>
                        )}
                        <div className="flex mt-4 pt-4 border-t border-dashed">
                             <span className="w-24 font-bold text-lg">결제금액</span>
                             <span className="font-bold text-lg text-blue-600">{formatPrice(order.totalPayAmount)}원</span>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button 
                        onClick={() => router.push("/")}
                        className="px-8 py-3 bg-black text-white font-bold rounded-sm hover:bg-gray-800 transition-colors"
                    >
                        쇼핑 계속하기
                    </button>
                    <button 
                        onClick={() => router.push("/mypage/orders")}
                        className="ml-4 px-8 py-3 border border-gray-300 font-bold rounded-sm hover:border-black transition-colors"
                    >
                        주문 내역 확인
                    </button>
                </div>
            </div>
        </div>
    );
}
