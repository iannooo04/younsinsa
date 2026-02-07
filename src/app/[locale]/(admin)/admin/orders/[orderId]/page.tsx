"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderDetailAction, updateOrderStatusAction } from "@/actions/order-actions";
import { OrderStatus } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const router = useRouter();

  const [order, setOrder] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<OrderStatus | "">("");

  const loadOrder = useCallback(async () => {
        setLoading(true);
        const res = await getOrderDetailAction(orderId);
        if (res.success && res.order) {
            setOrder(res.order);
            setStatus(res.order.status);
        } else {
            alert(res.message || "주문 정보를 불러오는데 실패했습니다.");
            router.push("/admin/orders");
        }
        setLoading(false);
    }, [orderId, router]);

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId, loadOrder]);

  async function handleStatusUpdate() {
    if (!status || status === order.status) return;
    if (!confirm("주문 상태를 변경하시겠습니까?")) return;

    const res = await updateOrderStatusAction(orderId, status as OrderStatus);
    if (res.success) {
      alert("주문 상태가 변경되었습니다.");
      loadOrder(); // Reload to refresh data
    } else {
      alert(res.message || "상태 변경에 실패했습니다.");
    }
  }

  if (loading) return <div className="p-10 text-center">로딩중...</div>;
  if (!order) return <div className="p-10 text-center">주문을 찾을 수 없습니다.</div>;

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-sm pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Link href="/admin/orders">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">주문 상세 정보</h1>
          <span className="text-gray-500 text-sm ml-2">({order.orderNo})</span>
        </div>
        <div className="flex items-center gap-2">
            <Select value={status} onValueChange={(val) => setStatus(val as OrderStatus)}>
                <SelectTrigger className="w-40 border-gray-300">
                    <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent>
                    {Object.values(OrderStatus).map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button onClick={handleStatusUpdate} className="bg-[#3d4bb5] hover:bg-[#2e3a94] text-white gap-2">
                <Save className="w-4 h-4" />
                상태 저장
            </Button>
        </div>
      </div>

      <div className="space-y-8">
          
        {/* 1. 주문 기본 정보 */}
        <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-[#3d4bb5] pl-2">주문 기본 정보</h2>
            <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                <div className="flex border-b border-gray-100 py-2">
                    <div className="w-32 font-bold text-gray-600">주문번호</div>
                    <div>{order.orderNo}</div>
                </div>
                <div className="flex border-b border-gray-100 py-2">
                    <div className="w-32 font-bold text-gray-600">주문일시</div>
                    <div>{format(new Date(order.createdAt), "yyyy-MM-dd HH:mm:ss")}</div>
                </div>
                <div className="flex border-b border-gray-100 py-2">
                    <div className="w-32 font-bold text-gray-600">현재상태</div>
                    <div className="font-bold text-[#3d4bb5]">{order.status}</div>
                </div>
                 <div className="flex border-b border-gray-100 py-2">
                    <div className="w-32 font-bold text-gray-600">회원정보</div>
                    <div>
                        {order.user ? (
                            <span>{order.user.name} ({order.user.username})</span>
                        ) : (
                            <span className="text-gray-500">비회원 주문</span>
                        )}
                    </div>
                </div>
            </div>
        </section>

        {/* 2. 결제 정보 */}
        <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-[#3d4bb5] pl-2">결제 정보</h2>
            <div className="bg-gray-50 p-4 rounded-sm border border-gray-200">
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-bold text-gray-600">결제방법</span>
                        <span>{order.paymentMethod} {order.depositorName && `(입금자: ${order.depositorName})`}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-bold text-gray-600">총 상품금액</span>
                        <span>{order.totalItemPrice?.toLocaleString()}원</span>
                    </div>
                     <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-bold text-gray-600">배송비</span>
                        <span>{order.shippingFee?.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-bold text-gray-600">할인금액</span>
                        <span className="text-red-500">-{order.discountAmount?.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between pt-2">
                        <span className="font-bold text-lg text-gray-800">총 결제금액</span>
                        <span className="font-bold text-lg text-red-600">{order.totalPayAmount?.toLocaleString()}원</span>
                    </div>
                </div>
            </div>
        </section>

        {/* 3. 주문 상품 정보 */}
        <section>
             <h2 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-[#3d4bb5] pl-2">주문 상품 정보</h2>
             <div className="overflow-x-auto border border-gray-300">
                 <table className="w-full text-sm text-center">
                     <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-300">
                         <tr>
                             <th className="py-3 px-4 text-left">상품명/옵션</th>
                             <th className="py-3 px-4 w-24">수량</th>
                             <th className="py-3 px-4 w-32">상품금액</th>
                             <th className="py-3 px-4 w-32">합계</th>
                             <th className="py-3 px-4 w-32">상태</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-200">
                         {order.items?.map((item: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                             <tr key={item.id} className="hover:bg-gray-50">
                                 <td className="py-3 px-4 text-left">
                                     <div className="font-medium">{item.productName}</div>
                                     {item.optionName && <div className="text-xs text-gray-500 mt-0.5">옵션: {item.optionName}</div>}
                                 </td>
                                 <td className="py-3 px-4">{item.quantity}</td>
                                 <td className="py-3 px-4">{item.price.toLocaleString()}원</td>
                                 <td className="py-3 px-4 font-bold">{(item.price * item.quantity).toLocaleString()}원</td>
                                 <td className="py-3 px-4">
                                     <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                                         item.status === 'DEPOSIT_WAIT' ? 'bg-yellow-100 text-yellow-700' :
                                         item.status === 'PAYMENT_COMPLETE' ? 'bg-blue-100 text-blue-700' :
                                         item.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                         'bg-gray-100 text-gray-700'
                                     }`}>
                                         {item.status}
                                     </span>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
        </section>

        {/* 4. 배송지 정보 */}
        <section>
            <h2 className="text-lg font-bold text-gray-800 mb-3 border-l-4 border-[#3d4bb5] pl-2">배송지 정보</h2>
            <div className="bg-white border border-gray-200 rounded-sm">
                <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-100">
                        <tr>
                            <th className="bg-gray-50 dark:bg-gray-50/50 w-40 text-left py-3 px-4 font-bold text-gray-600">수령자명</th>
                            <td className="py-3 px-4">{order.recipientName}</td>
                        </tr>
                        <tr>
                            <th className="bg-gray-50 dark:bg-gray-50/50 text-left py-3 px-4 font-bold text-gray-600">연락처</th>
                            <td className="py-3 px-4">
                                {order.recipientMobile} {order.recipientPhone && `/ ${order.recipientPhone}`}
                            </td>
                        </tr>
                        <tr>
                             <th className="bg-gray-50 dark:bg-gray-50/50 text-left py-3 px-4 font-bold text-gray-600">주소</th>
                             <td className="py-3 px-4">
                                 [{order.recipientZipcode}] {order.recipientAddress} {order.recipientAddressDetail}
                             </td>
                        </tr>
                        <tr>
                            <th className="bg-gray-50 dark:bg-gray-50/50 text-left py-3 px-4 font-bold text-gray-600">배송메세지</th>
                            <td className="py-3 px-4 text-gray-600">{order.shippingMessage || "-"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

      </div>
    </div>
  );
}
