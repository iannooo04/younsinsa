"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Youtube, ArrowUp, ArrowDown } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, useTransition } from "react";
import { getCartWishlistSettingsAction, updateCartWishlistSettingsAction } from "@/actions/basic-policy-actions";

interface CartWishlistSettingsState {
    // Cart
    cartStoragePeriodType: string;
    cartStorageDays: number;
    cartItemLimitType: string;
    cartItemLimitCount: number;
    cartSameProduct: string;
    cartZeroPrice: string;
    cartSoldOut: string;
    cartMovePageType: string;
    cartMovePageTarget: string;
    cartDirectBuy: string;

    // Wishlist
    wishItemLimitType: string;
    wishItemLimitCount: number;
    wishMoveToCart: string;
    wishSoldOut: string;
    wishMovePageType: string;
    wishMovePageTarget: string;
}

export default function CartWishlistSettingsPage() {
    const [isPending, startTransition] = useTransition();
    const [settings, setSettings] = useState<CartWishlistSettingsState>({
        cartStoragePeriodType: "period",
        cartStorageDays: 7,
        cartItemLimitType: "limit",
        cartItemLimitCount: 20,
        cartSameProduct: "increase",
        cartZeroPrice: "allow",
        cartSoldOut: "keep",
        cartMovePageType: "direct",
        cartMovePageTarget: "pc",
        cartDirectBuy: "only-current",
        wishItemLimitType: "limit",
        wishItemLimitCount: 20,
        wishMoveToCart: "delete",
        wishSoldOut: "keep",
        wishMovePageType: "direct",
        wishMovePageTarget: "pc",
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCartWishlistSettingsAction();
            if (result.success && result.settings) {
                setSettings({
                    cartStoragePeriodType: result.settings.cartStoragePeriodType,
                    cartStorageDays: result.settings.cartStorageDays,
                    cartItemLimitType: result.settings.cartItemLimitType,
                    cartItemLimitCount: result.settings.cartItemLimitCount,
                    cartSameProduct: result.settings.cartSameProduct,
                    cartZeroPrice: result.settings.cartZeroPrice,
                    cartSoldOut: result.settings.cartSoldOut,
                    cartMovePageType: result.settings.cartMovePageType,
                    cartMovePageTarget: result.settings.cartMovePageTarget,
                    cartDirectBuy: result.settings.cartDirectBuy || "only-current",
                    wishItemLimitType: result.settings.wishItemLimitType,
                    wishItemLimitCount: result.settings.wishItemLimitCount,
                    wishMoveToCart: result.settings.wishMoveToCart,
                    wishSoldOut: result.settings.wishSoldOut,
                    wishMovePageType: result.settings.wishMovePageType,
                    wishMovePageTarget: result.settings.wishMovePageTarget,
                });
            }
        };
        fetchData();
    }, []);

    const handleChange = (field: keyof CartWishlistSettingsState, value: string | number) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        startTransition(async () => {
            const result = await updateCartWishlistSettingsAction(settings);
            if (result.success) {
                alert("설정이 저장되었습니다.");
            } else {
                alert(result.error || "저장에 실패했습니다.");
            }
        });
    };

    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">장바구니 / 관심상품 설정</h1>
                    <span className="text-gray-500 text-sm">장바구니에 대한 기본 설정 및 제한 설정 등을 하실 수 있습니다.</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        onClick={handleSave} 
                        disabled={isPending}
                        className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium disabled:opacity-50"
                    >
                        {isPending ? "저장 중..." : "저장"}
                    </Button>
                </div>
            </div>

            {/* Section 1: Cart Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">장바구니 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border border-gray-300 border-t-2 border-t-gray-800">
                    {/* Row 1: Product Storage Period */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center">
                            상품보관기간
                        </div>
                        <div className="p-4 flex items-center gap-8">
                            <RadioGroup 
                                value={settings.cartStoragePeriodType} 
                                onValueChange={(val) => handleChange("cartStoragePeriodType", val)}
                                className="flex items-center gap-8"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="period" id="cart-period" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="cart-period" className="font-normal flex items-center gap-2 text-gray-700">
                                        <Input 
                                            className="w-16 h-7 text-right" 
                                            value={settings.cartStorageDays}
                                            onChange={(e) => handleChange("cartStorageDays", parseInt(e.target.value) || 0)}
                                            disabled={settings.cartStoragePeriodType !== "period"}
                                        /> 
                                        일동안 보관
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="forever" id="cart-forever" className="border-gray-300" />
                                    <Label htmlFor="cart-forever" className="font-normal text-gray-700">고객이 삭제할 때까지 보관</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 2: Storage Item Limit */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center">
                            보관상품 개수제한
                        </div>
                        <div className="p-4 flex items-center gap-8">
                            <RadioGroup 
                                value={settings.cartItemLimitType} 
                                onValueChange={(val) => handleChange("cartItemLimitType", val)}
                                className="flex items-center gap-8"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="limit" id="cart-limit" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="cart-limit" className="font-normal flex items-center gap-2 text-gray-700">
                                        <Input 
                                            className="w-16 h-7 text-right" 
                                            value={settings.cartItemLimitCount}
                                            onChange={(e) => handleChange("cartItemLimitCount", parseInt(e.target.value) || 0)}
                                            disabled={settings.cartItemLimitType !== "limit"}
                                        />
                                        개까지 보관
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unlimited" id="cart-unlimited" className="border-gray-300" />
                                    <Label htmlFor="cart-unlimited" className="font-normal text-gray-700">보관상품 개수제한 없음</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 3: Same Product */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-start pt-6 h-auto">
                            보관중인 상품과<br/>같은 상품을 담을 경우
                        </div>
                        <div className="p-4 space-y-2">
                            <RadioGroup 
                                value={settings.cartSameProduct}
                                onValueChange={(val) => handleChange("cartSameProduct", val)}
                                className="flex items-center gap-8"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="increase" id="same-increase" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="same-increase" className="font-normal text-gray-700">상품 수량 증가</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="no-change" id="same-no-change" className="border-gray-300" />
                                    <Label htmlFor="same-no-change" className="font-normal text-gray-700">상품 수량 변화 없음</Label>
                                </div>
                            </RadioGroup>
                            <div className="text-xs text-gray-500 pl-6 flex items-center gap-1">
                                <span className="bg-gray-600 text-white text-[10px] px-1 rounded-sm font-bold">!</span>
                                텍스트 옵션이 선택된 경우에는 수량이 증가되지 않고 분리되어 담깁니다.
                            </div>
                        </div>
                    </div>

                    {/* Row 4: Zero Price Product */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center">
                            가격이 0원인 상품을<br/>담을 경우
                        </div>
                        <div className="p-4 flex items-center gap-8">
                            <RadioGroup 
                                value={settings.cartZeroPrice}
                                onValueChange={(val) => handleChange("cartZeroPrice", val)}
                                className="flex items-center gap-8"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="allow" id="zero-allow" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="zero-allow" className="font-normal text-gray-700">장바구니에 담음</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="deny" id="zero-deny" className="border-gray-300" />
                                    <Label htmlFor="zero-deny" className="font-normal text-gray-700">장바구니에 담지 않음</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 5: Sold Out Product */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center">
                            품절상품 보관설정
                        </div>
                        <div className="p-4 flex items-center gap-8">
                            <RadioGroup 
                                value={settings.cartSoldOut}
                                onValueChange={(val) => handleChange("cartSoldOut", val)}
                                className="flex items-center gap-8"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="keep" id="soldout-keep" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="soldout-keep" className="font-normal text-gray-700">보관상품 품절 시에도 보관유지</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="delete" id="soldout-delete" className="border-gray-300" />
                                    <Label htmlFor="soldout-delete" className="font-normal text-gray-700">보관상품 품절 시 자동삭제</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 6: Navigation after adding to cart */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center">
                            상품 장바구니 보관시<br/>페이지 이동방법
                        </div>
                        <div className="p-4 flex items-center gap-8">
                            <RadioGroup 
                                value={settings.cartMovePageType}
                                onValueChange={(val) => handleChange("cartMovePageType", val)}
                                className="flex items-center gap-8"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="direct" id="nav-direct" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="nav-direct" className="font-normal text-gray-700">장바구니 페이지로 바로 이동</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="popup" id="nav-popup" className="border-gray-300" />
                                    <Label htmlFor="nav-popup" className="font-normal text-gray-700">장바구니 페이지 이동여부 확인팝업 노출</Label>
                                    <Select 
                                        value={settings.cartMovePageTarget} 
                                        onValueChange={(val) => handleChange("cartMovePageTarget", val)}
                                    >
                                        <SelectTrigger 
                                            className="w-[80px] h-7 text-xs ml-2"
                                            disabled={settings.cartMovePageType !== "popup"}
                                        >
                                            <SelectValue placeholder="PC" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pc">PC</SelectItem>
                                            <SelectItem value="mobile">Mobile</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 7: Direct Buy */}
                    <div className="grid grid-cols-[200px_1fr]">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center">
                            바로구매 설정
                        </div>
                        <div className="p-4 flex items-center gap-8">
                            <RadioGroup 
                                value={settings.cartDirectBuy}
                                onValueChange={(val) => handleChange("cartDirectBuy", val)}
                                className="flex items-center gap-8"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="only-current" id="buy-only-current" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="buy-only-current" className="font-normal text-gray-700">해당 상품만 구매</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="with-cart" id="buy-with-cart" className="border-gray-300" />
                                    <Label htmlFor="buy-with-cart" className="font-normal text-gray-700">기존 장바구니 상품과 같이 구매</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>


                </div>
            </div>

             {/* Section 2: Wishlist Settings */}
             <div className="space-y-4 pt-8">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">관심상품 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border border-gray-300 border-t-2 border-t-gray-800">
                    {/* Row 1: Item Count Limit */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center">
                            상품개수 제한
                        </div>
                        <div className="p-4 flex items-center gap-8">
                            <RadioGroup 
                                value={settings.wishItemLimitType}
                                onValueChange={(val) => handleChange("wishItemLimitType", val)}
                                className="flex items-center gap-8"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="limit" id="wish-limit" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="wish-limit" className="font-normal flex items-center gap-2 text-gray-700">
                                        <Input 
                                            className="w-16 h-7 text-right" 
                                            value={settings.wishItemLimitCount}
                                            onChange={(e) => handleChange("wishItemLimitCount", parseInt(e.target.value) || 0)}
                                            disabled={settings.wishItemLimitType !== "limit"}
                                        />
                                        개까지 보관
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unlimited" id="wish-unlimited" className="border-gray-300" />
                                    <Label htmlFor="wish-unlimited" className="font-normal text-gray-700">보관상품 개수제한 없음</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 2: Moving to Cart */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center">
                            장바구니로 상품이동시
                        </div>
                        <div className="p-4 flex items-center gap-8">
                            <RadioGroup 
                                value={settings.wishMoveToCart}
                                onValueChange={(val) => handleChange("wishMoveToCart", val)}
                                className="flex items-center gap-8"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="keep" id="move-keep" className="border-gray-300" />
                                    <Label htmlFor="move-keep" className="font-normal text-gray-700">상품 남김</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="delete" id="move-delete" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="move-delete" className="font-normal text-gray-700">상품 삭제</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 3: Sold Out Product Storage */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center">
                            품절상품 보관설정
                        </div>
                        <div className="p-4 flex items-center gap-8">
                            <RadioGroup 
                                value={settings.wishSoldOut}
                                onValueChange={(val) => handleChange("wishSoldOut", val)}
                                className="flex items-center gap-8"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="keep" id="wish-soldout-keep" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="wish-soldout-keep" className="font-normal text-gray-700">보관상품 품절 시에도 보관유지</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="delete" id="wish-soldout-delete" className="border-gray-300" />
                                    <Label htmlFor="wish-soldout-delete" className="font-normal text-gray-700">보관상품 품절 시 자동삭제</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 4: Page move */}
                    <div className="grid grid-cols-[200px_1fr]">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center">
                            상품 관심상품 보관시<br/>페이지 이동방법
                        </div>
                        <div className="p-4 flex items-center gap-8">
                            <RadioGroup 
                                value={settings.wishMovePageType}
                                onValueChange={(val) => handleChange("wishMovePageType", val)}
                                className="flex items-center gap-8"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="direct" id="wish-nav-direct" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="wish-nav-direct" className="font-normal text-gray-700">관심상품 페이지로 바로 이동</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="popup" id="wish-nav-popup" className="border-gray-300" />
                                    <Label htmlFor="wish-nav-popup" className="font-normal text-gray-700">관심상품 페이지 이동여부 확인팝업 노출</Label>
                                    <Select 
                                        value={settings.wishMovePageTarget} 
                                        onValueChange={(val) => handleChange("wishMovePageTarget", val)}
                                    >
                                        <SelectTrigger 
                                            className="w-[80px] h-7 text-xs ml-2"
                                            disabled={settings.wishMovePageType !== "popup"}
                                        >
                                            <SelectValue placeholder="PC" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pc">PC</SelectItem>
                                            <SelectItem value="mobile">Mobile</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>

             {/* Floating Actions */}
             <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-12 h-12 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold"><Youtube size={20}/></span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-[#6E36E2] hover:bg-[#6E36E2]/90 shadow-lg text-white p-0 flex flex-col items-center justify-center border-0 gap-0">
                    <span className="text-[10px] leading-none">따라</span>
                    <span className="text-[10px] leading-none">하기</span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    <ArrowUp size={20} />
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    <ArrowDown size={20} />
                </Button>
            </div>
        </div>
    );
}
