"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";
import { 
    getCartItemsAction, 
    CartItemDTO 
} from "@/actions/cart-actions";
import { createOrderAction } from "@/actions/order-actions";

export default function CheckoutPage() {
    const router = useRouter();
    const { data: session } = useSession();
    
    const [cartItems, setCartItems] = useState<CartItemDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [shippingInfo, setShippingInfo] = useState({
        recipientName: "",
        recipientPhone: "", // General Phone
        recipientMobile: "", // Mobile
        recipientZipcode: "",
        recipientAddress: "",
        recipientAddressDetail: "",
        shippingMessage: ""
    });

    const [paymentMethod, setPaymentMethod] = useState<"BANK_TRANSFER" | "CARD">("BANK_TRANSFER");
    const [depositorName, setDepositorName] = useState("");

    // Load Cart Items
    useEffect(() => {
        async function fetchCart() {
            const userId = session?.user?.id;
            if (userId) {
                const result = await getCartItemsAction(userId);
                if (result.success && result.items) {
                    setCartItems(result.items);
                } else {
                    alert("장바구니를 불러오는데 실패했습니다.");
                }
                setIsLoading(false);
            } else {
                // If not logged in, redirect to login?
                // For now, just stop loading.
                 setIsLoading(false);
            }
        }
        
        if (session?.user?.id) {
            fetchCart();
            // Pre-fill user info if possible (e.g. from session or other action)
            // For now, empty.
        }
    }, [session]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session?.user?.id) {
            alert("로그인이 필요합니다.");
            router.push("/member/login");
            return;
        }

        if (cartItems.length === 0) {
            alert("주문할 상품이 없습니다.");
            return;
        }

        if (!shippingInfo.recipientName || !shippingInfo.recipientMobile || !shippingInfo.recipientAddress) {
             alert("필수 배송 정보를 입력해주세요.");
             return;
        }

        if (paymentMethod === "BANK_TRANSFER" && !depositorName) {
            alert("입금자명을 입력해주세요.");
            return;
        }

        setIsSubmitting(true);

        const result = await createOrderAction({
            userId: session.user.id,
            cartItemIds: cartItems.map(item => item.id), // Buy All
            shippingInfo: {
                recipientName: shippingInfo.recipientName,
                recipientPhone: shippingInfo.recipientPhone,
                recipientMobile: shippingInfo.recipientMobile,
                recipientZipcode: shippingInfo.recipientZipcode,
                recipientAddress: shippingInfo.recipientAddress,
                recipientAddressDetail: shippingInfo.recipientAddressDetail,
                shippingMessage: shippingInfo.shippingMessage
            },
            paymentInfo: {
                method: paymentMethod,
                depositorName: paymentMethod === "BANK_TRANSFER" ? depositorName : undefined
            },
            ordererInfo: {
                name: session.user.name || "구매자",
                email: session.user.email || "",
                mobile: shippingInfo.recipientMobile // Fallback to recipient mobile for now
            }
        });

        if (result.success && result.orderId) {
            router.push(`/orders/complete/${result.orderId}`);
        } else {
            alert(result.message || "주문 생성에 실패했습니다.");
            setIsSubmitting(false);
        }
    };

    const totalItemPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shippingFee = totalItemPrice >= 50000 ? 0 : 3000;
    const totalPayAmount = totalItemPrice + shippingFee;

    if (isLoading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-white flex justify-center py-10">
            <div className="w-full max-w-[960px] px-4">
                <h1 className="text-2xl font-bold mb-8">주문/결제</h1>

                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
                    {/* Left Column: Input Forms */}
                    <div className="flex-1 space-y-8">
                        {/* 1. Recipient Info */}
                        <section>
                            <h2 className="text-lg font-bold mb-4 border-b pb-2">배송지 정보</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">수령인 <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        name="recipientName"
                                        value={shippingInfo.recipientName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 p-2 rounded-sm"
                                        placeholder="이름"
                                        required
                                    />
                                </div>
                                <div className="flex gap-4">
                                     <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1">휴대전화 <span className="text-red-500">*</span></label>
                                        <input 
                                            type="text" 
                                            name="recipientMobile"
                                            value={shippingInfo.recipientMobile}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 p-2 rounded-sm"
                                            placeholder="010-0000-0000"
                                            required
                                        />
                                     </div>
                                     <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1">전화번호</label>
                                        <input 
                                            type="text" 
                                            name="recipientPhone"
                                            value={shippingInfo.recipientPhone}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 p-2 rounded-sm"
                                            placeholder="선택사항"
                                        />
                                     </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">주소 <span className="text-red-500">*</span></label>
                                    <div className="flex gap-2 mb-2">
                                        <input 
                                            type="text" 
                                            name="recipientZipcode"
                                            value={shippingInfo.recipientZipcode}
                                            onChange={handleInputChange}
                                            className="w-32 border border-gray-300 p-2 rounded-sm"
                                            placeholder="우편번호"
                                            required
                                        />
                                        <button type="button" className="bg-gray-200 px-4 py-2 text-sm rounded-sm">우편번호 찾기</button> 
                                        {/* Implement Daum Postcode later */}
                                    </div>
                                    <input 
                                        type="text" 
                                        name="recipientAddress"
                                        value={shippingInfo.recipientAddress}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 p-2 rounded-sm mb-2"
                                        placeholder="기본 주소"
                                        required
                                    />
                                    <input 
                                        type="text" 
                                        name="recipientAddressDetail"
                                        value={shippingInfo.recipientAddressDetail}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 p-2 rounded-sm"
                                        placeholder="상세 주소"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">배송 요청사항</label>
                                    <input 
                                        type="text" 
                                        name="shippingMessage"
                                        value={shippingInfo.shippingMessage}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 p-2 rounded-sm"
                                        placeholder="예: 문 앞에 놓아주세요."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* 2. Order Items Summary */}
                        <section>
                            <h2 className="text-lg font-bold mb-4 border-b pb-2">주문 상품 정보</h2>
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-4 border-b pb-4 last:border-b-0">
                                         <div className="relative w-16 h-20 bg-gray-100 flex-shrink-0">
                                             <Image src={item.image} alt={item.name} fill className="object-cover" />
                                         </div>
                                         <div className="flex-1">
                                             <p className="text-sm font-bold">{item.name}</p>
                                             {item.optionName && <p className="text-xs text-gray-500">{item.optionName}</p>}
                                             <div className="text-sm mt-1">
                                                 <span>{item.quantity}개</span>
                                                 <span className="mx-2">|</span>
                                                 <span className="font-bold">{(item.price * item.quantity).toLocaleString()}원</span>
                                             </div>
                                         </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Payment & Summary */}
                    <div className="w-full md:w-[320px] shrink-0">
                        <div className="sticky top-10 space-y-6">
                            
                            {/* Payment Method */}
                             <section className="bg-gray-50 p-6 rounded-md border border-gray-200">
                                <h2 className="text-lg font-bold mb-4">결제 수단</h2>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="paymentMethod" 
                                            value="BANK_TRANSFER"
                                            checked={paymentMethod === "BANK_TRANSFER"}
                                            onChange={() => setPaymentMethod("BANK_TRANSFER")}
                                        />
                                        <span>무통장입금</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="paymentMethod" 
                                            value="CARD"
                                            checked={paymentMethod === "CARD"}
                                            onChange={() => setPaymentMethod("CARD")}
                                        />
                                        <span>신용/체크카드</span>
                                    </label>
                                </div>

                                {paymentMethod === "BANK_TRANSFER" && (
                                    <div className="mt-4 pt-4 border-t border-gray-300">
                                         <label className="block text-sm font-medium mb-1">입금자명 <span className="text-red-500">*</span></label>
                                         <input 
                                            type="text" 
                                            value={depositorName}
                                            onChange={(e) => setDepositorName(e.target.value)}
                                            className="w-full border border-gray-300 p-2 rounded-sm bg-white"
                                            placeholder="입금하시는 분 성함"
                                         />
                                    </div>
                                )}
                            </section>

                            {/* Price Summary */}
                            <section className="bg-black text-white p-6 rounded-md">
                                <h2 className="text-lg font-bold mb-4">결제 금액</h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>총 상품금액</span>
                                        <span>{totalItemPrice.toLocaleString()}원</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>배송비</span>
                                        <span>{shippingFee.toLocaleString()}원</span>
                                    </div>
                                    <div className="border-t border-gray-600 my-2 pt-2 flex justify-between text-lg font-bold">
                                        <span>최종 결제 금액</span>
                                        <span className="text-yellow-400">{totalPayAmount.toLocaleString()}원</span>
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full mt-6 py-3 font-bold text-center bg-white text-black rounded-sm hover:bg-gray-200 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? "처리 중..." : "결제하기"}
                                </button>
                            </section>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
