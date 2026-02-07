"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { addToCartAction } from "@/actions/cart-actions";

import ReviewList from "@/components/review/ReviewList";
import QnaList from "@/components/qna/QnaList";

interface ProductDetailClientProps {
  userId?: string;
  product: {
    id: string;
    name: string;
    price: number;
    consumerPrice: number;
    description: string | null;
    images: string[];
    brandName: string;
    options: {
      id: string;
      name: string;
      values: {
        id: string;
        name: string;
      }[];
    }[];
    variants: {
      id: string;
      price: number;
      stock: number;
      optionValues: string[];
    }[];
  };
}

export default function ProductDetailClient({ product, userId }: ProductDetailClientProps) {
  const router = useRouter();
  const { data: session } = useSession(); // Still use session for client-side checks if needed, but props.userId is prioritized
  const currentUserId = userId || session?.user?.id;

  const [selectedImage, setSelectedImage] = useState(product.images[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingRequest, setIsAddingRequest] = useState(false);
  
  // Tabs State
  const [activeTab, setActiveTab] = useState<"info" | "review" | "qna" | "delivery">("info");
  
  // Selection state: { [optionId]: valueId }
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // ... (currentVariant and other logic remains same)
  const currentVariant = useMemo(() => {
    if (product.options.length === 0) return null;
    const allSelected = product.options.every(opt => selectedOptions[opt.id]);
    if (!allSelected) return null;
    return product.variants.find(v => {
        return Object.values(selectedOptions).every(valId => v.optionValues.includes(valId));
    });
  }, [product.options, product.variants, selectedOptions]);

  const currentPrice = currentVariant ? currentVariant.price : product.price;
  const isSoldOut = currentVariant ? currentVariant.stock <= 0 : false;

  const handleOptionSelect = (optionId: string, valueId: string) => {
      setSelectedOptions(prev => ({ ...prev, [optionId]: valueId }));
  };

  const handleAddToCart = async () => {
    if (!currentUserId) {
        if (confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
            router.push("/member/login");
        }
        return;
    }

    if (product.options.length > 0 && !currentVariant) {
        alert("필수 옵션을 선택해주세요.");
        return;
    }
    if (isSoldOut) {
        alert("품절된 상품입니다.");
        return;
    }

    setIsAddingRequest(true);
    try {
        const result = await addToCartAction(
            currentUserId,
            product.id,
            currentVariant?.id,
            quantity
        );

        if (result.success) {
            if (confirm("장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?")) {
                router.push("/orders/cart");
            }
        } else {
            alert(result.message || "장바구니 담기에 실패했습니다.");
        }
    } catch (error) {
        console.error("Add to cart error:", error);
        alert("오류가 발생했습니다.");
    } finally {
        setIsAddingRequest(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-4">
        <Link href="/" className="text-sm text-gray-500 hover:text-black">Home</Link>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-sm text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
            {selectedImage ? (
              <Image src={selectedImage} alt={product.name} fill className="object-cover" priority />
            ) : (
               <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
            )}
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, idx) => (
                <div 
                    key={idx} 
                    className={`relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 cursor-pointer border ${selectedImage === img ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                    onClick={() => setSelectedImage(img)}
                >
                  <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="py-2">
            <div className="text-sm font-bold text-gray-900 mb-1">{product.brandName}</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4 break-keep leading-snug">{product.name}</h1>
            <div className="flex items-center gap-2 mb-6 border-b pb-6">
                <span className="text-2xl font-bold">{currentPrice.toLocaleString()}원</span>
                {product.consumerPrice > currentPrice && (
                    <span className="text-gray-400 line-through text-sm">{product.consumerPrice.toLocaleString()}원</span>
                )}
            </div>

            {/* Options */}
            <div className="space-y-6 mb-8">
                {product.options.map(opt => (
                    <div key={opt.id}>
                        <label className="block text-sm font-bold mb-2">{opt.name}</label>
                        <div className="flex flex-wrap gap-2">
                            {opt.values.map(val => (
                                <button
                                    key={val.id}
                                    onClick={() => handleOptionSelect(opt.id, val.id)}
                                    className={`px-4 py-2 text-sm border rounded-sm transition-colors ${selectedOptions[opt.id] === val.id ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black'}`}
                                >
                                    {val.name}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                {/* Quantity */}
                <div>
                     <label className="block text-sm font-bold mb-2">수량</label>
                     <div className="flex items-center border w-max rounded-sm">
                         <button className="px-3 py-1 hover:bg-gray-100" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                         <span className="px-3 py-1 border-x min-w-[3rem] text-center">{quantity}</span>
                         <button className="px-3 py-1 hover:bg-gray-100" onClick={() => setQuantity(q => q + 1)}>+</button>
                     </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button 
                    disabled={isSoldOut || isAddingRequest}
                    className={`flex-1 py-4 font-bold text-lg rounded-sm transition-colors ${isSoldOut ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                    {isSoldOut ? '품절' : '바로 구매하기'}
                </button>
                <button 
                    onClick={handleAddToCart}
                    disabled={isSoldOut || isAddingRequest}
                    className="flex-1 border border-gray-300 py-4 font-bold text-lg rounded-sm hover:border-black transition-colors"
                >
                    {isAddingRequest ? '담는 중...' : '장바구니'}
                </button>
            </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="mt-20">
        <div className="flex border-b border-gray-200 mb-8 sticky top-0 bg-white z-10">
            {[{ id: "info", label: "상세정보" }, { id: "review", label: "상품후기" }, { id: "qna", label: "상품문의" }, { id: "delivery", label: "배송/교환/반품" }].map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "info" | "review" | "qna" | "delivery")}
                    className={`flex-1 py-4 text-center text-sm font-bold transition-colors ${activeTab === tab.id ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-black'}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>

        <div className="min-h-[400px]">
            {activeTab === "info" && (
                <div className="prose max-w-none text-gray-600 whitespace-pre-wrap text-center">
                    {product.description || "상품 상세 설명이 없습니다."}
                </div>
            )}
            
            {activeTab === "review" && (
                <ReviewList productId={product.id} userId={currentUserId} />
            )}

            {activeTab === "qna" && (
                <QnaList productId={product.id} userId={currentUserId} />
            )}

            {activeTab === "delivery" && (
                <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-8 rounded">
                    <h3 className="font-bold text-black mb-4 text-lg">배송안내</h3>
                    <p className="mb-6">
                        - 배송 기간은 주문일(무통장입금은 결제완료일)로부터 1일(24시간) ~ 5일정도 걸립니다.<br/>
                        - 지정일 배송이 필요한 경우 Q&A게시판이나 고객센터로 문의 주세요.<br/>
                        - 기본 배송료는 2,500원이며 50,000원 이상 구매시 무료배송입니다. (제주 및 도서산간 지역 추가비용 발생)
                    </p>
                    <h3 className="font-bold text-black mb-4 text-lg">교환 및 반품안내</h3>
                    <p>
                        - 상품 수령 후 7일 이내에 교환 및 반품신청이 가능합니다.<br/>
                        - 고객 변심에 의한 교환/반품 시 왕복배송비(5,000원)는 고객부담입니다.<br/>
                        - 상품 불량 및 오배송의 경우 배송비는 무료입니다.
                    </p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
