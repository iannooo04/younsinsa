"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { addToCartAction } from "@/actions/cart-actions";
import { useEffect } from "react";
import { Heart, ChevronRight, ChevronLeft, Star, X, Plus, Minus } from "lucide-react";

import ReviewList from "@/components/review/ReviewList";
import QnaList from "@/components/qna/QnaList";
import AddToCartModal from "@/components/cart/AddToCartModal";

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
    brandLogoUrl: string | null;
    categoryName: string;
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
  const { data: session } = useSession(); 
  const currentUserId = userId || session?.user?.id;

  const [selectedImage, setSelectedImage] = useState(product.images[0] || null);
  const [isAddingRequest, setIsAddingRequest] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState<"info" | "review" | "qna" | "delivery">("info");
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  
  // -- Multiple Items State --
  interface SelectedItem {
    id: string; // variant.id or 'default'
    name: string;
    price: number;
    quantity: number;
  }
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  // If product has no options, auto-add the default product to the list
  useEffect(() => {
    if (product.options.length === 0 && selectedItems.length === 0) {
      setSelectedItems([{
        id: 'default',
        name: product.name,
        price: product.price,
        quantity: 1
      }]);
    }
  }, [product, selectedItems.length]);

  const handleOptionSelect = (optionId: string, valueId: string) => {
      const newOptions = { ...selectedOptions, [optionId]: valueId };
      setSelectedOptions(newOptions);

      // Check if all options are selected
      const allSelected = product.options.every(opt => newOptions[opt.id]);
      if (allSelected) {
          const variant = product.variants.find(v => {
              return Object.values(newOptions).every(valId => v.optionValues.includes(valId));
          });

          if (variant) {
              if (variant.stock <= 0) {
                  alert("품절된 옵션입니다.");
                  setSelectedOptions({});
                  return;
              }

              // Create human-readable option string
              const optionNames = product.options.map(opt => {
                 const selectedValId = newOptions[opt.id];
                 const val = opt.values.find(v => v.id === selectedValId);
                 return val?.name;
              }).join(" · ");

              setSelectedItems(prev => {
                 const existing = prev.find(p => p.id === variant.id);
                 if (existing) {
                     alert("이미 선택된 옵션입니다.");
                     return prev; // don't add duplicate, user can change quantity below
                 }
                 return [...prev, {
                     id: variant.id,
                     name: optionNames,
                     price: variant.price,
                     quantity: 1
                 }];
              });

              // Reset dropdowns for next selection
              setSelectedOptions({});
          }
      }
  };

  const handleQtyChange = (id: string, delta: number) => {
      setSelectedItems(prev => prev.map(item => {
          if (item.id === id) {
             const newQty = item.quantity + delta;
             return { ...item, quantity: newQty < 1 ? 1 : newQty };
          }
          return item;
      }));
  };

  const handleRemoveItem = (id: string) => {
      setSelectedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddToCart = async () => {
    if (!currentUserId) {
        if (confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
            router.push("/member/login");
        }
        return;
    }

    if (selectedItems.length === 0) {
        alert("상품 옵션을 선택해주세요.");
        return;
    }

    setIsAddingRequest(true);
    try {
        let hasError = false;
        // submit each item line sequentially or in parallel
        for (const item of selectedItems) {
            const result = await addToCartAction(
                currentUserId,
                product.id,
                item.id === 'default' ? undefined : item.id,
                item.quantity
            );
            if (!result.success) hasError = true;
        }

        if (!hasError) {
            // Show modal instead of native confirm
            setIsCartModalOpen(true);
            // reset list after adding to cart
            setSelectedItems([]);
        } else {
            alert("일부 상품을 장바구니에 담는데 실패했습니다.");
        }
    } catch (error) {
        console.error("Add to cart error:", error);
        alert("오류가 발생했습니다.");
    } finally {
        setIsAddingRequest(false);
    }
  };

  const totalQuantity = selectedItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = selectedItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const isSoldOut = product.options.length === 0 && false; // Assuming base product stock isn't fully tracked here unless using variants


  return (
    <div className="container mx-auto px-4 pt-0 pb-0">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-[3%]">
        {/* Left: Images */}
        <div className="w-full lg:w-[67%] flex flex-col gap-4">
          <div className="mb-1.5 mt-2">
              <div className="text-[13px] text-gray-500 hover:text-black">Home &gt; 상의 &gt; {product.name} ({product.brandName})</div>
          </div>
          <div className="flex flex-row gap-4 h-[calc(100vh-120px)]">
              {product.images.length > 1 && (
                  <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar w-20 shrink-0">
                      {product.images.map((img, idx) => (
                          <div 
                              key={idx} 
                              className={`relative w-20 h-20 bg-gray-100 overflow-hidden flex-shrink-0 cursor-pointer border-2 transition-colors ${selectedImage === img ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                              onClick={() => setSelectedImage(img)}
                          >
                               <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                          </div>
                      ))}
                  </div>
              )}
              
              <div className="relative flex-1 bg-gray-50 overflow-hidden group">
                  {selectedImage ? (
                      <Image src={selectedImage} alt={product.name} fill className="object-contain" priority />
                  ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                  )}

                  {product.images.length > 1 && (
                      <>
                          <button 
                              onClick={() => {
                                  const idx = product.images.indexOf(selectedImage || "");
                                  if (idx > 0) setSelectedImage(product.images[idx - 1]);
                              }}
                              className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:text-black transition-opacity duration-200 opacity-0 group-hover:opacity-100 ${product.images.indexOf(selectedImage || "") === 0 ? 'hidden' : ''}`}
                          >
                              <ChevronLeft size={24} />
                          </button>
                          <button 
                              onClick={() => {
                                  const idx = product.images.indexOf(selectedImage || "");
                                  if (idx < product.images.length - 1) setSelectedImage(product.images[idx + 1]);
                              }}
                              className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:text-black transition-opacity duration-200 opacity-0 group-hover:opacity-100 ${product.images.indexOf(selectedImage || "") === product.images.length - 1 ? 'hidden' : ''}`}
                          >
                              <ChevronRight size={24} />
                          </button>
                      </>
                  )}
              </div>
          </div>
        </div>

        {/* Spacer for fixed right box to prevent layout shift */}
        <div className="shrink-0 hidden lg:block" style={{ width: "calc(30% + 0.75 * (50vw - 50%))" }}></div>

        {/* Right: Product Info */}
        <div 
          className="shrink-0 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 shadow-sm p-6 xl:p-7 flex flex-col gap-4 relative lg:fixed lg:top-[73px] lg:right-0 lg:z-[50] w-full lg:w-[32%] xl:w-[30%] lg:h-[calc(100vh-73px)] overflow-y-auto"
        >
          <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                   <div className="w-9 h-9 rounded-full border border-gray-200 flex flex-col items-center justify-center text-[7px] bg-white text-gray-500 overflow-hidden text-center leading-[1.1] font-medium tracking-tight whitespace-nowrap px-1 relative">
                       {product.brandLogoUrl ? (
                           <Image src={product.brandLogoUrl} alt={product.brandName} fill className="object-contain p-1" />
                       ) : (
                           product.brandName.length <= 4 ? product.brandName : product.brandName.split(" ").slice(0, 3).map((w, i) => <span key={i}>{w}</span>)
                       )}
                   </div>
                   <span className="font-bold text-gray-900 text-[15px]">{product.brandName}</span>
                   <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-[2px] font-bold">단독</span>
              </div>
              <button className="flex items-center gap-1 border border-gray-200 rounded-[4px] px-3 py-1.5 hover:bg-gray-50">
                   <Heart size={15} /> <span className="font-bold text-[13px]">13만</span>
              </button>
          </div>

          <div>
              <div className="text-[13px] text-gray-500 mb-2 truncate">
                  {product.categoryName} &gt; {product.name} ({product.brandName})
              </div>
              <h1 className="text-[22px] font-bold text-gray-900 leading-[1.3] mb-2 break-keep">{product.name}</h1>
              <div className="flex gap-1.5 flex-wrap">
                  <span className="text-[11px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-[2px]">무신사단독</span>
                  <span className="text-[11px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-[2px]">아울렛</span>
              </div>
          </div>

          <div className="flex items-center gap-2">
              <div className="flex items-center text-[15px] font-bold text-gray-900">
                  <Star className="text-orange-400 fill-orange-400 w-[15px] h-[15px] mr-1" /> 4.8
              </div>
              <span className="text-[13px] text-gray-500 border-b border-gray-500 leading-none pb-[1px] cursor-pointer">후기 236개</span>
              <span className="text-[11px] border border-[#aeb6fa] text-[#6d7bff] bg-[#f4f5ff] px-2 py-[2px] rounded-full flex items-center gap-1 ml-1 cursor-pointer">
                  <span className="font-extrabold text-[10px] text-white bg-[#6d7bff] rounded-full px-1.5 py-[1px] leading-tight">AI</span> AI 요약 보기
              </span>
          </div>

          <div className="mt-2">
              {product.consumerPrice > product.price && (
                  <div className="text-gray-400 line-through text-[15px] font-medium">{product.consumerPrice.toLocaleString()}원</div>
              )}
              <div className="flex items-baseline gap-2">
                  {product.consumerPrice > product.price && (
                      <span className="text-[26px] font-extrabold text-[#ff1414]">{Math.round(((product.consumerPrice - product.price) / product.consumerPrice) * 100)}%</span>
                  )}
                  <span className="text-[26px] font-bold text-gray-900">{product.price.toLocaleString()}원</span>
              </div>
          </div>

          <div className="bg-[#f4f8ff] flex items-center justify-between p-4 rounded-[4px] mt-2 cursor-pointer transition-colors hover:bg-[#eef4ff]">
              <span className="text-[#3b82f6] font-bold text-[14px]">첫 구매 20% 쿠폰 받으러 가기</span>
              <ChevronRight className="text-[#3b82f6] w-4 h-4" />
          </div>

          <div className="mt-2 space-y-3">
              {product.options.length > 0 && (
                  product.options.map(opt => (
                      <div key={opt.id} className="relative">
                          <select 
                              onChange={(e) => handleOptionSelect(opt.id, e.target.value)} 
                              value={selectedOptions[opt.id] || ""}
                              className="w-full border border-gray-200 rounded-[4px] py-3.5 px-4 text-[15px] text-gray-500 appearance-none bg-white cursor-pointer hover:border-black focus:outline-none focus:border-black font-medium transition-colors mb-1"
                          >
                              <option value="" disabled>{opt.name}</option>
                              {opt.values.map(val => (
                                  <option key={val.id} value={val.id}>{val.name}</option>
                              ))}
                          </select>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 rotate-90 pointer-events-none" />
                      </div>
                  ))
              )}
          </div>

          {/* Selected Variant Boxes */}
          {selectedItems.length > 0 && (
              <div className="mt-4 space-y-2">
                  {selectedItems.map(item => (
                      <div key={item.id} className="bg-[#f5f5f5] p-4 rounded-[6px] relative">
                          {/* Top: Name & Remove */}
                          <div className="flex justify-between items-start mb-2 pr-6">
                              <span className="text-[15px] text-gray-900 leading-tight font-medium break-keep">{item.name}</span>
                              <button onClick={() => handleRemoveItem(item.id)} className="absolute right-4 top-4">
                                  <X className="w-[18px] h-[18px] text-gray-500 hover:text-black" />
                              </button>
                          </div>
                          
                          {/* Middle: Delivery Expected Badge (Mocked based on user image) */}
                          <div className="flex items-center gap-1.5 mb-4">
                              <span className="text-[13px] text-gray-600 font-medium tracking-tight">05.28(목) 이내 발송 예정</span>
                              <span className="text-[11px] bg-gray-200 text-gray-600 px-[5px] py-[2px] rounded-[3px] font-semibold tracking-tighter">주문제작</span>
                          </div>

                          {/* Bottom: Quantity & Price */}
                          <div className="flex items-center justify-between">
                              {/* Qty Selector */}
                              <div className="flex items-center border border-gray-300 rounded-[3px] bg-white h-[36px]">
                                  <button onClick={() => handleQtyChange(item.id, -1)} disabled={item.quantity <= 1} className="w-9 h-full flex items-center justify-center text-gray-400 hover:text-black disabled:opacity-30">
                                      <Minus size={16} />
                                  </button>
                                  <div className="w-10 h-full flex items-center justify-center text-[14px] text-black font-medium border-x border-gray-100">
                                      {item.quantity}
                                  </div>
                                  <button onClick={() => handleQtyChange(item.id, 1)} className="w-9 h-full flex items-center justify-center text-gray-400 hover:text-black">
                                      <Plus size={16} />
                                  </button>
                              </div>
                              {/* Price */}
                              <div className="text-[18px] font-bold text-gray-900 font-sans tracking-tight">
                                  {(item.price * item.quantity).toLocaleString()}원
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          )}

          {/* Total Summary */}
          {selectedItems.length > 0 && (
              <div className="mt-4 flex justify-between items-end border-t border-gray-200 pt-5 pb-2">
                  <div className="text-[15px] font-bold text-gray-900">
                      총 {totalQuantity}개
                  </div>
                  <div className="text-[22px] font-bold text-gray-900 tracking-tight">
                      {totalPrice.toLocaleString()}원
                  </div>
              </div>
          )}

          <div className="bg-[#f8f9fa] p-[10px] rounded-[4px] flex items-center justify-between mt-1 mb-2 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-sm overflow-hidden relative border border-gray-200 shrink-0">
                       {product.images[0] && <Image src={product.images[0]} alt="product minature" fill className="object-cover" />}
                  </div>
                  <span className="text-[13px] font-bold text-gray-900 tracking-tight">품절된 상품을 관리자에게 문의해보세요.</span>
              </div>
              <ChevronRight className="text-gray-400 w-4 h-4 ml-2 shrink-0" />
          </div>

          <div className="flex gap-[6px] mt-1 mb-10 lg:mb-0">
              <div className="flex flex-col items-center justify-center border border-gray-200 rounded-[4px] px-3 py-1 hover:bg-gray-50 cursor-pointer w-14 shrink-0 transition-colors">
                  <Heart size={20} className="text-gray-800" strokeWidth={1.5} />
                  <span className="text-[11px] font-bold mt-[2px] text-gray-800">829</span>
              </div>
              <button 
                  onClick={handleAddToCart}
                  disabled={isSoldOut || isAddingRequest || selectedItems.length === 0}
                  className="flex-1 border border-gray-300 py-3.5 font-bold text-[15px] rounded-[4px] hover:border-black transition-colors text-gray-900 bg-white disabled:opacity-50"
              >
                  {isAddingRequest ? '담는 중...' : '장바구니'}
              </button>
              <button 
                  disabled={isSoldOut || isAddingRequest || selectedItems.length === 0}
                  className="flex-1 py-3.5 font-bold text-[15px] rounded-[4px] transition-colors bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500"
              >
                  {isSoldOut ? '품절' : '구매하기'}
              </button>
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="mt-20 w-full lg:w-[67%]">
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
                <div className="prose max-w-none text-gray-600 whitespace-wrap text-left overflow-hidden">
                    {product.description ? (
                         <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    ) : (
                         "상품 상세 설명이 없습니다."
                    )}
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

      {/* Cart Modal Overlay */}
      <AddToCartModal 
         isOpen={isCartModalOpen} 
         onClose={() => setIsCartModalOpen(false)} 
         productImage={product.images[0]} 
      />
    </div>
  );
}
