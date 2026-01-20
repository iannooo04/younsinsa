"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HelpCircle, Youtube, ArrowUp, ArrowDown, Plus } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { getOrderStatusSettingsAction, updateOrderStatusSettingsAction } from "@/actions/basic-policy-actions";

// Define types locally or import (ensure BenefitSettings matches backend default)
type BenefitSettings = {
    mileageGrant: string; 
    couponGrant: string;
    stockDeduct: string;
    mileageRestoreCancel: boolean;
    couponRestoreCancel: boolean;
    stockRestoreCancel: boolean;
    mileageRestoreReturn: boolean;
    mileageRestoreExchange: boolean;
    mileageRestoreRefund: boolean;
};

type StatusConfig = {
    adminName?: string;
    mallName?: string;
    use?: boolean;
};

type StatusSettingsMap = {
    [key: string]: StatusConfig;
};

export default function OrderStatusSettingsPage() {
    const [isPending, startTransition] = useTransition();
    const [autoCancelDays, setAutoCancelDays] = useState(3);
    const [statusSettings, setStatusSettings] = useState<StatusSettingsMap>({});
    const [benefitSettings, setBenefitSettings] = useState<BenefitSettings>({
        mileageGrant: "payment_complete",
        couponGrant: "payment_complete",
        stockDeduct: "deposit_wait", // 'stock' usually means order/deposit
        mileageRestoreCancel: true,
        couponRestoreCancel: true,
        stockRestoreCancel: true,
        mileageRestoreReturn: true,
        mileageRestoreExchange: true,
        mileageRestoreRefund: true
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOrderStatusSettingsAction();
            if (result.success && result.settings) {
                setAutoCancelDays(result.settings.autoCancelDays);
                setStatusSettings((result.settings.statusSettings as unknown as StatusSettingsMap) || {});
                if (result.settings.benefitSettings) {
                    setBenefitSettings(result.settings.benefitSettings as unknown as BenefitSettings);
                }
            }
        };
        fetchData();
    }, []);

    const handleSave = () => {
        startTransition(async () => {
             const result = await updateOrderStatusSettingsAction({
                 autoCancelDays,
                 statusSettings,
                 benefitSettings
             });
             if (result.success) {
                 alert("저장되었습니다.");
             } else {
                 alert(result.error || "저장 실패");
             }
        });
    };

    const handleConfigChange = (key: string, field: keyof StatusConfig, value: string | boolean) => {
        setStatusSettings(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                [field]: value
            }
        }));
    };

    const handleBenefitChange = (field: keyof BenefitSettings, value: string | boolean) => {
        setBenefitSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const getVal = (key: string, field: keyof StatusConfig, defaultVal: string | boolean) => {
        return statusSettings[key]?.[field] ?? defaultVal;
    };

    const renderCustomRadio = (currentValue: string, targetValue: string, onClick: () => void, colorClass = "border-gray-400", activeColorClass = "bg-gray-600") => {
        const isSelected = currentValue === targetValue;
        return (
            <div 
                className={`w-4 h-4 rounded-full border flex items-center justify-center cursor-pointer ${isSelected ? colorClass.replace('border-', 'border-') : colorClass}`}
                onClick={onClick}
            >
                {isSelected && <div className={`w-2 h-2 rounded-full ${activeColorClass}`} />}
            </div>
        );
    };

    const renderRow = (key: string, title: string, desc: string, defaultCheck: boolean, checkColor: 'gray'|'red' = 'gray', disabled: boolean = false) => {
        const use = getVal(key, 'use', defaultCheck) as boolean;
        const adminName = getVal(key, 'adminName', title) as string;
        const mallName = getVal(key, 'mallName', title) as string;
        
        // Logic for showing dots/checks in last 3 columns
        const showMileageGrant = benefitSettings.mileageGrant === key;
        const showCouponGrant = benefitSettings.couponGrant === key;
        
        // Logic for stock deduct
        // 'stock' -> deposit_wait
        // 'stock-pay' -> payment_complete
        // 'stock-del' -> delivering?
        const showStockDeduct = benefitSettings.stockDeduct === key;

        // Logic for Restore (simplified for Cancel/Return sections)
        // If key is in Cancel group, show dots if restore flags are true
        const isCancelGroup = ["auto_cancel", "soldout_cancel", "admin_cancel", "customer_cancel_request"].includes(key);
        const showMileageRestore = isCancelGroup && benefitSettings.mileageRestoreCancel;
        const showCouponRestore = isCancelGroup && benefitSettings.couponRestoreCancel;
        const showStockRestore = isCancelGroup && benefitSettings.stockRestoreCancel;

        // Need to render based on column structure which differs by section (Restore vs Grant)
        // However, renderRow is generic.
        // We can pass a 'type' to renderRow or infer from key?
        // Or simply render all possibilities and let the parent grid hide them?
        // Parent grid is fixed: 
        // Col 6: Benefit Grant/Restore (Mileage)
        // Col 7: Benefit Grant/Restore (Coupon)
        // Col 8: Stock Deduct/Restore
        
        return (
            <div key={key} className="border-b border-gray-200 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px] text-center text-xs text-gray-600 items-center hover:bg-gray-50">
                <div className="py-3 font-bold text-gray-800">{title}</div>
                <div className="py-3 px-4 text-left flex items-start gap-1">
                    <span className="w-4 h-4 flex-none bg-gray-600 text-white rounded-sm text-[10px] flex items-center justify-center font-bold">!</span>
                    {desc}
                </div>
                <div className="py-3 px-2">
                    <Input 
                        className="h-7 text-xs" 
                        value={adminName} 
                        onChange={(e) => handleConfigChange(key, 'adminName', e.target.value)} 
                    />
                </div>
                <div className="py-3 px-2">
                    <Input 
                        className="h-7 text-xs" 
                        value={mallName} 
                        onChange={(e) => handleConfigChange(key, 'mallName', e.target.value)} 
                    />
                </div>
                <div className="py-3 flex justify-center">
                    <Checkbox 
                        className={`w-4 h-4 ${checkColor === 'red' ? 'border-[#FF424D] data-[state=checked]:bg-[#FF424D]' : 'border-gray-300'}`}
                        checked={use}
                        onCheckedChange={(c) => handleConfigChange(key, 'use', c === true)}
                        disabled={disabled}
                    />
                </div>
                
                {/* Dynamic Columns */}
                <div className="py-3 bg-gray-50 border-l border-r border-gray-200 h-full flex items-center justify-center">
                    {(showMileageGrant || showMileageRestore) && <div className="w-3 h-3 rounded-full bg-gray-400"></div>}
                </div>
                <div className="py-3 bg-gray-50 border-r border-gray-200 h-full flex items-center justify-center">
                    {(showCouponGrant || showCouponRestore) && <div className="w-3 h-3 rounded-full bg-gray-400"></div>}
                </div>
                <div className="py-3 bg-gray-50 h-full flex items-center justify-center">
                    {(showStockDeduct || showStockRestore) && <div className="w-3 h-3 rounded-full bg-red-400"></div>}
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">주문 상태 설정</h1>
                    <span className="text-gray-500 text-sm">주문 상태에 대한 처리 방법을 변경하거나 상태명을 변경하거나 추가를 하실 수 있습니다.</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-[#FF424D] text-[#FF424D] hover:bg-red-50 rounded-sm h-9 px-4 text-xs font-bold bg-white">
                        <Plus size={12} className="mr-1" /> 해외몰 주문상태 관리
                    </Button>
                    <Button 
                        className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium"
                        onClick={handleSave}
                        disabled={isPending}
                    >
                        {isPending ? "저장 중..." : "저장"}
                    </Button>
                </div>
            </div>

            {/* Section 1: Order Status Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">주문 상태별 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border border-gray-300 border-b-0">
                    {/* Table Header */}
                    <div className="bg-gray-100 text-center font-bold text-gray-700 text-xs border-b border-gray-300 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px]">
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">기준상태</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">상태설명</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">관리자페이지<br/>노출이름</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">쇼핑몰페이지<br/>노출이름</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">사용<br/>설정</div>
                        
                        <div className="border-r border-gray-300">
                            <div className="py-2 border-b border-gray-300">혜택지급시점</div>
                            <div className="grid grid-cols-2 h-full">
                                <div className="py-2 border-r border-gray-300">마일리지</div>
                                <div className="py-2">쿠폰</div>
                            </div>
                        </div>

                        <div className="border-r border-gray-300">
                            <div className="py-2 border-b border-gray-300">혜택차감시점</div>
                            <div className="grid grid-cols-2 h-full">
                                <div className="py-2 border-r border-gray-300">마일리지</div>
                                <div className="py-2">쿠폰</div>
                            </div>
                        </div>

                        <div className="py-3 flex items-center justify-center h-full row-span-2">재고차감<br/>시점</div>
                    </div>

                    {/* Group 1: Header */}
                    <div className="bg-blue-50/50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <span className="text-blue-500 font-bold text-xs">주문 상태 설정</span>
                            <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 bg-white border-gray-300 text-gray-600"><Plus size={10} className="mr-1"/>추가</Button>
                        </div>
                        <div className="flex">
                             {/* Grant (160px) - Empty */}
                             <div className="w-[160px] flex items-center justify-center shrink-0"></div>
                             {/* Deduct (160px) - Checkboxes */}
                             <div className="w-[160px] flex items-center justify-center shrink-0">
                                <div className="w-[80px] flex justify-center"><Checkbox disabled className="w-4 h-4 bg-gray-100 border-gray-300" /></div>
                                <div className="w-[80px] flex justify-center"><Checkbox disabled className="w-4 h-4 bg-gray-100 border-gray-300" /></div>
                             </div>
                             {/* Stock (90px) - Radio */}
                             <div className="w-[90px] flex justify-center shrink-0">
                                {renderCustomRadio(benefitSettings.stockDeduct, "deposit_wait", () => handleBenefitChange('stockDeduct', 'deposit_wait'), "border-[#FF424D]", "bg-[#FF424D]")}
                            </div>
                        </div>
                    </div>

                    {/* Row: 입금대기 */}
                    {renderRow("deposit_wait", "입금대기", "주문 후 입금 전 상태로 무통장, 가상계좌, 기타가 해당됩니다.", true, 'gray', true)}

                     {/* Group 2: Payment Status */}
                    <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">입금 상태 설정</span>
                            <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 bg-white border-gray-300 text-gray-600"><Plus size={10} className="mr-1"/>추가</Button>
                            <span className="text-[#FF424D] text-xs font-bold flex items-center ml-4">
                                <span className="w-3.5 h-3.5 flex justify-center items-center bg-[#FF424D] text-white pb-0.5 rounded-sm text-[10px] leading-none mr-1">!</span>
                                통계데이터는 해당 &quot;입금 상태 설정&quot; 그룹의 주문상태로 변경한 시점부터 집계됩니다.
                            </span>
                        </div>
                        <div className="flex">
                             {/* Grant (160px) */}
                            <div className="w-[160px] flex items-center justify-center shrink-0">
                                <div className="w-[80px] flex justify-center">
                                    <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap cursor-pointer">
                                        {renderCustomRadio(benefitSettings.mileageGrant, "payment_complete", () => handleBenefitChange('mileageGrant', 'payment_complete'))}
                                        (결제완료 시)
                                    </Label>
                                </div>
                                <div className="w-[80px] flex justify-center">
                                    <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap cursor-pointer">
                                        {renderCustomRadio(benefitSettings.couponGrant, "payment_complete", () => handleBenefitChange('couponGrant', 'payment_complete'))}
                                        (결제완료 시)
                                    </Label>
                                </div>
                            </div>
                             {/* Deduct (160px) - Mixed */}
                             <div className="w-[160px] flex items-center justify-center shrink-0"></div>
                             {/* Stock (90px) */}
                             <div className="w-[90px] flex justify-center shrink-0">
                                 {renderCustomRadio(benefitSettings.stockDeduct, "payment_complete", () => handleBenefitChange('stockDeduct', 'payment_complete'))}
                             </div>
                        </div>
                    </div>

                    {/* Row: 결제완료 */}
                    {renderRow("payment_complete", "결제완료", "입금확인된 상태, 또는 결제완료된 상태입니다.", true, 'gray', true)}

                     {/* Group 3: Product Status */}
                    <div className="bg-blue-50/50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <span className="text-blue-500 font-bold text-xs">상품 상태 설정</span>
                            <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 bg-white border-gray-300 text-gray-600"><Plus size={10} className="mr-1"/>추가</Button>
                        </div>
                    </div>

                    {renderRow("product_prep", "상품준비중", "배송준비 단계로 상품여부를 확인하는 단계입니다.", true)}
                    {renderRow("purchase_order", "구매발주", "배송준비 단계로 상품부족시 발주하는 단계입니다.", false)}
                    {renderRow("product_in", "상품입고", "배송준비 단계로 부족상품이 입고된 상태입니다.", false)}
                    {renderRow("product_out", "상품출고", "배송준비 완료 단계입니다.", false)}

                    {/* Group 4: Delivery Status */}
                     <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">배송 상태 설정</span>
                            <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 bg-white border-gray-300 text-gray-600"><Plus size={10} className="mr-1"/>추가</Button>
                        </div>
                        <div className="flex">
                             {/* Grant (160px) */}
                            <div className="w-[160px] flex items-center justify-center shrink-0">
                                <div className="w-[80px] flex justify-center">
                                    <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap cursor-pointer">
                                        {renderCustomRadio(benefitSettings.mileageGrant, "delivery_complete", () => handleBenefitChange('mileageGrant', 'delivery_complete'))}
                                        (배송완료 시)
                                    </Label>
                                </div>
                                <div className="w-[80px] flex justify-center">
                                    <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap cursor-pointer">
                                        {renderCustomRadio(benefitSettings.couponGrant, "delivery_complete", () => handleBenefitChange('couponGrant', 'delivery_complete'))}
                                        (배송완료 시)
                                    </Label>
                                </div>
                            </div>
                             {/* Deduct (160px) */}
                             <div className="w-[160px] flex items-center justify-center shrink-0"></div>
                             {/* Stock (90px) */}
                             <div className="w-[90px] flex justify-center shrink-0">
                                <div className="invisible">
                                    {renderCustomRadio(benefitSettings.stockDeduct, "stock-del", () => {})}
                                </div>
                             </div>
                        </div>
                    </div>

                    {renderRow("delivering", "배송중", "상품이 출고되서 배송중인 상태입니다.", true)}
                    {renderRow("delivery_complete", "배송완료", "배송 완료된 상태입니다. (고객이 수취확인하거나, 관리자가 변경한 상태", true)}

                    {/* Group 5: Purchase Confirm */}
                    <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">구매확정 상태 설정</span>
                            <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 bg-white border-gray-300 text-gray-600"><Plus size={10} className="mr-1"/>추가</Button>
                        </div>
                        <div className="flex">
                             {/* Grant (160px) */}
                            <div className="w-[160px] flex items-center justify-center shrink-0">
                                <div className="w-[80px] flex justify-center">
                                    <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap cursor-pointer">
                                        {renderCustomRadio(benefitSettings.mileageGrant, "purchase_confirm", () => handleBenefitChange('mileageGrant', 'purchase_confirm'), "border-[#FF424D]", "bg-[#FF424D]")}
                                        (구매확정 시)
                                    </Label>
                                </div>
                                <div className="w-[80px] flex justify-center">
                                    <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap cursor-pointer">
                                        {renderCustomRadio(benefitSettings.couponGrant, "purchase_confirm", () => handleBenefitChange('couponGrant', 'purchase_confirm'), "border-[#FF424D]", "bg-[#FF424D]")}
                                        (구매확정 시)
                                    </Label>
                                </div>
                            </div>
                            {/* Deduct (160px) */}
                            <div className="w-[160px] flex items-center justify-center shrink-0"></div>
                            {/* Stock (90px) */}
                            <div className="w-[90px] flex justify-center shrink-0"></div>
                        </div>
                    </div>
                    {renderRow("purchase_confirm", "구매확정", "구매확정된 상태입니디. (고객이 구매확정하거나, 관리자가 상태변경)", true)}

                </div>
            </div>

            {/* Section 2: Cancel Status Settings */}
            <div className="space-y-4 pt-8">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">취소 상태별 설정</h2>
                     <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                 <div className="border border-gray-300 border-b-0">
                    {/* Header */}
                    <div className="bg-gray-100 text-center font-bold text-gray-700 text-xs border-b border-gray-300 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px]">
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">기준상태</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">상태설명</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">관리자페이지<br/>노출이름</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">쇼핑몰페이지<br/>노출이름</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">사용<br/>설정</div>
                        
                        <div className="border-r border-gray-300">
                            <div className="py-2 border-b border-gray-300">혜택복원시점</div>
                            <div className="grid grid-cols-2 h-full">
                                <div className="py-2 border-r border-gray-300">마일리지</div>
                                <div className="py-2">쿠폰</div>
                            </div>
                        </div>

                         <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">재고복원시점</div>
                        <div className="py-3 flex items-center justify-center h-full row-span-2">재고차감시점</div>
                    </div>

                    {/* Group 1: Cancel Status */}
                    <div className="bg-blue-50/50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">취소 상태 설정</span>
                            <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 bg-white border-gray-300 text-gray-600"><Plus size={10} className="mr-1"/>추가</Button>
                             <span className="text-gray-700 text-xs flex items-center ml-4">
                                : <Input 
                                    className="w-12 h-6 mx-1 text-center" 
                                    value={autoCancelDays}
                                    onChange={(e) => setAutoCancelDays(Number(e.target.value))}
                                  /> 일 동안 미입금시 주문자동취소 <span className="text-gray-400 ml-1">(자동취소를 원하지 않는 경우 0으로 설정)</span>
                            </span>
                        </div>
                        <div className="flex justify-end pr-[55px] gap-[68px]"> {/* Align */}
                            <div className="flex gap-[68px] mr-12">
                                <div className="flex justify-center w-4"><Checkbox className="w-4 h-4 bg-gray-100 border-gray-300" disabled checked={benefitSettings.mileageRestoreCancel} /></div>
                                <div className="flex justify-center w-4"><Checkbox className="w-4 h-4 bg-gray-100 border-gray-300" disabled checked={benefitSettings.couponRestoreCancel} /></div>
                            </div>
                             <div className="flex justify-center w-4"><Checkbox 
                                className="w-4 h-4 border-[#FF424D] data-[state=checked]:bg-[#FF424D]" 
                                checked={benefitSettings.stockRestoreCancel}
                                onCheckedChange={(c) => handleBenefitChange('stockRestoreCancel', c === true)}
                             /></div>
                        </div>
                    </div>

                    {renderRow("auto_cancel", "자동취소", "주문접수 후 오랜동안 미입금 되거나, 가상계좌 만료된 상태입니다.", true)}
                    {renderRow("soldout_cancel", "품절취소", "주문접수 후 상품재고가 없어 취소된 상태입니다.", true)}
                    {renderRow("admin_cancel", "관리자취소", "주문접수 후 관리자가 여러 원인에의해 임의 취소한 상태입니다.", true)}
                    {renderRow("customer_cancel_request", "고객취소요청", "주문접수 단계에서 고객이 취소요청을 한 상태입니다.", true)}


                    {/* Group 2: Failure Status */}
                    <div className="bg-blue-50/50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <span className="text-blue-500 font-bold text-xs">실패 상태 설정</span>
                        </div>
                    </div>
                    {renderRow("customer_payment_stop", "고객결제중단", "고객이 결제완료 전 PG사 결제창을 닫거나 다른 페이지로 이동한 상태입니다.", true)}
                    {renderRow("payment_fail", "결제실패", "고객결제 후 PG사에서 결제실패 결과값을 받은 상태입니다.", true)}
                    {renderRow("pg_check_needed", "PG확인요망", "고객결제 후 PG사에서 결과값을 받지 못하여 PG사에서 확인이 필요한 상태입니다.", true)}

                    {/* Group 3: Return Status */}
                    <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">반품 상태 설정</span>
                             <HelpCircle size={14} className="text-gray-400 cursor-help" />
                        </div>
                         <div className="flex justify-end pr-[55px] gap-[68px]">
                            <div className="flex gap-[68px] mr-12 invisible"></div>
                             <div className="flex justify-end gap-1 items-center">
                                 <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap cursor-pointer">
                                    <Checkbox 
                                        className="w-4 h-4 border-[#FF424D] data-[state=checked]:bg-[#FF424D]" 
                                        checked={benefitSettings.mileageRestoreReturn}
                                        onCheckedChange={(c) => handleBenefitChange('mileageRestoreReturn', c === true)}
                                    />
                                    (반품회수완료 시)
                                </Label>
                             </div>
                        </div>
                    </div>
                    {renderRow("return_request", "반품접수", "배송후 환불/교환 목적으로 반품을 접수하는 단계입니다.", true)}
                    {renderRow("returning", "반송중", "고객이 반품한 상품을 쇼핑몰에서 다시 고객에게 반송하는 단계입니다.", true, 'red')}
                    {renderRow("return_hold", "반품보류", "고객이 접수한 반품요청을 보류처리한 상태입니다.", true, 'red')}
                    {renderRow("return_complete", "반품회수완료", "고객이 반품한 상품이 쇼핑몰에 회수완료 된 상태입니다.", true)}

                    {/* Group 4: Exchange Status */}
                    <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">교환 취소 상태 설정</span>
                        </div>
                          <div className="flex justify-end pr-[55px] gap-[68px]">
                            <div className="flex gap-[68px] mr-12 invisible"></div>
                             <div className="flex justify-end gap-1 items-center">
                                 <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap cursor-pointer">
                                    <Checkbox 
                                        className="w-4 h-4 border-[#FF424D] data-[state=checked]:bg-[#FF424D]" 
                                        checked={benefitSettings.mileageRestoreExchange}
                                        onCheckedChange={(c) => handleBenefitChange('mileageRestoreExchange', c === true)}
                                    />
                                    (교환완료 시)
                                </Label>
                             </div>
                        </div>
                    </div>
                    {renderRow("exchange_request", "교환접수", "반품 접수이후 상품 교환 접수 단계입니다.", true)}
                    {renderRow("exchange_returning", "반송중", "고객이 상품교환을 위해 받은 상품을 다시 반송하는 단계입니다.", true, 'red')}
                    {renderRow("exchange_reshipping", "재배송중", "반송된 상품을 확인하고 교환상품을 재발송하는 단계입니다.", true, 'red')}
                    {renderRow("exchange_hold", "교환보류", "고객이 접수한 반품요청을 보류처리한 상태입니다.", true, 'red')}
                    {renderRow("exchange_complete", "교환완료", "교환상품이 배송완료된 상태입니다.", true)}

                    {/* Group 5: Refund Status */}
                     <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">환불 상태 설정</span>
                             <HelpCircle size={14} className="text-gray-400 cursor-help" />
                        </div>
                          <div className="flex justify-end pr-[55px] gap-[68px]">
                            <div className="flex gap-[68px] mr-12 invisible"></div>
                             <div className="flex justify-end gap-1 items-center">
                                 <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap cursor-pointer">
                                    <Checkbox 
                                        className="w-4 h-4 border-gray-300 data-[state=checked]:bg-gray-500 data-[state=checked]:border-gray-500" 
                                        checked={benefitSettings.mileageRestoreRefund}
                                        onCheckedChange={(c) => handleBenefitChange('mileageRestoreRefund', c === true)}
                                    />
                                    (환불완료 시)
                                </Label>
                             </div>
                        </div>
                    </div>
                    {renderRow("refund_request", "환불접수", "입금확인 또는 반품요청 이후 관리자가 환불 처리하는 단계입니다.", true, 'gray')}
                    {renderRow("refund_hold", "환불보류", "고객이 접수한 환불요청을 보류처리한 상태입니다.", true, 'red')}
                    {renderRow("refund_complete", "환불완료", "환불이 완료된 상태로, 해당주문상품이 취소완료된 상태입니다.", true, 'gray')}

                 </div>
            </div>

             {/* Footer Copyright */}
            <div className="text-center text-xs text-gray-500 pt-8 pb-4">
                &copy; NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-[#FF424D]">5.1.23.1206.5ccf2dd6</span>)
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
