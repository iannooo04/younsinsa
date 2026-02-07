"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import { getMyOrdersAction } from "@/actions/order-actions";
import Image from "next/image";
import Link from "next/link";
import { getOrderStatusKo } from "@/lib/order-utils";
import { Order, OrderItem, Product, ProductImage } from "@/generated/prisma";

type OrderWithDetail = Order & {
  items: (OrderItem & {
    product: (Product & {
      images: ProductImage[];
    }); // Product might be optional in OrderItem if deleted, but usually present. checkout schema.
    // Schema: product: Product?
  })[];
};

export default function MyOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderWithDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/member/login");
      return;
    }

    if (session?.user?.id) {
      fetchOrders(session.user.id);
    }
  }, [session, status, router]);

  const fetchOrders = async (userId: string) => {
    const result = await getMyOrdersAction(userId);
    if (result.success) {
      setOrders((result.items as unknown) as OrderWithDetail[] || []);
    }
    setIsLoading(false);
  };

  if (isLoading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;

  return (
    <div className="bg-white min-h-screen flex justify-center">
      <div className="w-full max-w-[960px] p-5">
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => router.back()} className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <h1 className="text-xl font-bold">주문 내역</h1>
        </div>

        {orders.length === 0 ? (
          <div className="py-20 text-center text-gray-500 border-t">
            주문 내역이 없습니다.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-100">
                  <span className="text-sm font-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                  <Link href={`/mypage/orders/${order.id}`} className="text-xs text-blue-600 font-medium">상세보기 &gt;</Link>
                </div>
                <div className="p-4 bg-white">
                  <div className="mb-3">
                    <span className="text-[12px] font-bold px-2 py-0.5 bg-black text-white rounded-sm mr-2">
                        {getOrderStatusKo(order.status)}
                    </span>
                    <span className="text-[12px] text-gray-400">주문번호 {order.orderNo}</span>
                  </div>
                  
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-3 first:pt-0">
                      <div className="relative w-16 h-20 bg-gray-100 flex-shrink-0">
                        {item.product?.images?.[0]?.url ? (
                          <Image src={item.product.images[0].url} alt={item.productName} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Image</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-black truncate">{item.productName}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.optionName || "기본 옵션"}</p>
                        <div className="mt-2 flex items-baseline gap-2">
                           <span className="text-sm font-bold text-black">{item.price.toLocaleString()}원</span>
                           <span className="text-xs text-gray-400">{item.quantity}개</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[13px] text-gray-600">총 결제금액</span>
                    <span className="text-[16px] font-bold text-black">{order.totalPayAmount.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
