"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Youtube, ArrowUp, ArrowDown } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { getProductBasicSettingsAction, updateProductBasicSettingsAction } from "@/actions/basic-policy-actions";

interface ModDateRange {
    [key: string]: boolean;
    productEdit: boolean;
    productList: boolean;
    productBatch: boolean;
    productExcel: boolean;
    productApprove: boolean;
}

export default function ProductBasicSettingsPage() {
    const [isPending, startTransition] = useTransition();
    
    // State
    const [modDateRange, setModDateRange] = useState<ModDateRange>({
        productEdit: true,
        productList: true,
        productBatch: true,
        productExcel: true,
        productApprove: true
    });
    const [modDatePopup, setModDatePopup] = useState("unused");
    const [imageLoadingEnhance, setImageLoadingEnhance] = useState("unused");
    const [priceExposure, setPriceExposure] = useState("exposed");
    const [optionPriceExposure, setOptionPriceExposure] = useState("exposed");

    useEffect(() => {
        const fetchData = async () => {
            const result = await getProductBasicSettingsAction();
            if (result.success && result.settings) {
                if (result.settings.modDateRange) {
                    setModDateRange(result.settings.modDateRange as unknown as ModDateRange);
                }
                setModDatePopup(result.settings.modDatePopup);
                setImageLoadingEnhance(result.settings.imageLoadingEnhance);
                setPriceExposure(result.settings.priceExposure);
                setOptionPriceExposure(result.settings.optionPriceExposure);
            }
        };
        fetchData();
    }, []);

    const handleSave = () => {
        startTransition(async () => {
            const result = await updateProductBasicSettingsAction({
                modDateRange,
                modDatePopup,
                imageLoadingEnhance,
                priceExposure,
                optionPriceExposure
            });
            if (result.success) {
                alert("저장되었습니다.");
            } else {
                alert(result.error || "저장 실패");
            }
        });
    };

    const handleCheckboxChange = (field: keyof ModDateRange, checked: boolean) => {
        setModDateRange(prev => ({ ...prev, [field]: checked }));
    };

    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">상품 기본 설정</h1>
                <Button 
                    className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium"
                    onClick={handleSave}
                    disabled={isPending}
                >
                    {isPending ? "저장 중..." : "저장"}
                </Button>
            </div>

            {/* Section 1: Product Management Operation Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">상품관리 운영설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border-t border-gray-400">
                    {/* Modification Date Range */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center gap-1">
                            상품수정일 변경<br/>범위 설정
                            <HelpCircle size={14} className="text-gray-400" />
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        id="mod-edit" 
                                        checked={modDateRange.productEdit} 
                                        onCheckedChange={(c) => handleCheckboxChange("productEdit", c as boolean)}
                                        className="w-4 h-4 border-gray-300 data-[state=checked]:bg-[#FF424D] data-[state=checked]:border-[#FF424D]" 
                                    />
                                    <Label htmlFor="mod-edit" className="font-normal cursor-pointer text-gray-700">상품 수정</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        id="mod-list" 
                                        checked={modDateRange.productList} 
                                        onCheckedChange={(c) => handleCheckboxChange("productList", c as boolean)}
                                        className="w-4 h-4 border-gray-300 data-[state=checked]:bg-[#FF424D] data-[state=checked]:border-[#FF424D]" 
                                    />
                                    <Label htmlFor="mod-list" className="font-normal cursor-pointer text-gray-700">상품 리스트</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        id="mod-batch" 
                                        checked={modDateRange.productBatch} 
                                        onCheckedChange={(c) => handleCheckboxChange("productBatch", c as boolean)}
                                        className="w-4 h-4 border-gray-300 data-[state=checked]:bg-[#FF424D] data-[state=checked]:border-[#FF424D]" 
                                    />
                                    <Label htmlFor="mod-batch" className="font-normal cursor-pointer text-gray-700">상품 일괄 관리</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        id="mod-excel" 
                                        checked={modDateRange.productExcel} 
                                        onCheckedChange={(c) => handleCheckboxChange("productExcel", c as boolean)}
                                        className="w-4 h-4 border-gray-300 data-[state=checked]:bg-[#FF424D] data-[state=checked]:border-[#FF424D]" 
                                    />
                                    <Label htmlFor="mod-excel" className="font-normal cursor-pointer text-gray-700">상품 엑셀 업로드</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        id="mod-approve" 
                                        checked={modDateRange.productApprove} 
                                        onCheckedChange={(c) => handleCheckboxChange("productApprove", c as boolean)}
                                        className="w-4 h-4 border-gray-300 data-[state=checked]:bg-[#FF424D] data-[state=checked]:border-[#FF424D]" 
                                    />
                                    <Label htmlFor="mod-approve" className="font-normal cursor-pointer text-gray-700">공급사 상품 승인</Label>
                                </div>
                            </div>
                            <p className="text-gray-500 font-medium flex items-center gap-1 text-xs">
                                <span className="w-3.5 h-3.5 flex justify-center items-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                                체크 한 범위 내에서 상품 정보 수정 시 상품수정일이 수정한 시간으로 변경됩니다.
                            </p>
                        </div>
                    </div>

                    {/* Modification Popup */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center gap-1">
                            상품수정일 변경<br/>확인 팝업
                        </div>
                        <div className="p-4 space-y-2">
                             <RadioGroup value={modDatePopup} onValueChange={setModDatePopup} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="popup-used" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="popup-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="popup-unused" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="popup-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <div className="space-y-1">
                                <p className="text-gray-500 font-medium flex items-center gap-1 text-xs">
                                    <span className="w-3.5 h-3.5 flex justify-center items-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                                    '사용함'의 경우, 상품 정보 수정 시 상품수정일을 현재시간으로 변경 할 것인지 확인하는 팝업이 노출됩니다.
                                </p>
                                <p className="text-gray-500 font-medium flex items-center gap-1 text-xs">
                                    <span className="w-3.5 h-3.5 flex justify-center items-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                                    '사용안함'의 경우, 상품수정일 업데이트 범위 내에서 상품 정보 수정 시 항상 업데이트 됩니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Image Output Settings */}
            <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">이미지 출력 설정</h2>
                     <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center gap-1">
                            이미지 로딩 향상
                             <HelpCircle size={14} className="text-gray-400" />
                        </div>
                        <div className="p-4">
                             <RadioGroup value={imageLoadingEnhance} onValueChange={setImageLoadingEnhance} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="img-used" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]"/>
                                    <Label htmlFor="img-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="img-unused" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]"/>
                                    <Label htmlFor="img-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>

             {/* Section 3: Alternative Text Display Settings */}
             <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">대체문구 표시설정</h2>
                     <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">
                            가격정보 노출여부
                        </div>
                        <div className="p-4 grid grid-cols-[1fr_360px] gap-8">
                            <div className="space-y-2">
                                <RadioGroup value={priceExposure} onValueChange={setPriceExposure} className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="exposed" id="price-exposed" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]"/>
                                        <Label htmlFor="price-exposed" className="font-normal cursor-pointer">노출함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="hidden" id="price-hidden" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]"/>
                                        <Label htmlFor="price-hidden" className="font-normal cursor-pointer">노출안함</Label>
                                    </div>
                                </RadioGroup>
                                 <p className="text-gray-500 font-medium flex items-center gap-1 text-xs">
                                    <span className="w-3.5 h-3.5 flex justify-center items-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                                    가격 대체문구로 출력시 "정가와 구매혜택"의 노출여부를 설정합니다.
                                </p>
                            </div>
                            
                            {/* Example UI Recreation */}
                            <div className="border border-gray-300 p-2 space-y-4">
                                <div className="flex gap-4">
                                     {/* Left Item */}
                                    <div className="flex-1 space-y-1">
                                         <div className="bg-gray-100 h-24 w-full mb-2"></div>
                                         <div className="text-[10px] text-gray-400">[시크릿블루] NHN COMMERCE</div>
                                         <div className="border-2 border-red-300 p-1 relative">
                                            <div className="text-xs text-gray-400 line-through">1,200원</div>
                                            <div className="text-lg font-bold text-gray-800">가격대체문구</div>
                                            <div className="flex items-center gap-1 text-[10px] text-blue-500 mt-1">
                                                <span className="w-3 h-3 bg-blue-500 rounded-sm"></span> 1,000 원
                                            </div>
                                             <div className="flex items-center gap-1 text-[10px] text-orange-500">
                                                <span className="w-3 h-3 bg-orange-500 rounded-sm"></span> 1000 원
                                            </div>
                                         </div>
                                    </div>
                                    
                                     {/* Right Item */}
                                     <div className="flex-1 space-y-1">
                                         <div className="bg-gray-100 h-24 w-full mb-2"></div>
                                          <div className="text-[10px] text-gray-400">[시크릿블루] NHN COMMERCE</div>
                                          <div className="border-2 border-red-300 p-1">
                                               <div className="text-lg font-bold text-gray-800">가격대체문구</div>
                                          </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Option Price Display Settings */}
             <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">옵션가 표시설정</h2>
                     <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">
                            선택옵션 옵션가 노출<br/>여부
                        </div>
                        <div className="p-4 grid grid-cols-[1fr_360px] gap-8">
                            <div className="space-y-2">
                                <RadioGroup value={optionPriceExposure} onValueChange={setOptionPriceExposure} className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="exposed" id="opt-exposed" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]"/>
                                        <Label htmlFor="opt-exposed" className="font-normal cursor-pointer">노출함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="hidden" id="opt-hidden" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                        <Label htmlFor="opt-hidden" className="font-normal cursor-pointer">노출안함</Label>
                                    </div>
                                </RadioGroup>
                                 <p className="text-gray-500 font-medium flex items-start gap-1 text-xs leading-relaxed">
                                    <span className="w-3.5 h-3.5 flex justify-center items-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-none mt-0.5">!</span>
                                    쇼핑몰 "상품 상세정보 / 장바구니 / 찜 리스트 / 주문서작성 / 마이페이지" 등에 선택된 "상품 옵션 / 텍스트 옵션"의 옵션가 금액 노출여부를 설정합니다.
                                </p>
                            </div>
                            
                            {/* Example UI Recreation */}
                            <div className="border border-gray-300 p-4 space-y-4">
                                <div className="space-y-2 relative">
                                    <div className="border border-gray-300 p-2 text-xs text-gray-500 flex justify-between items-center bg-white">
                                        <span>크림베이지/F : +10,000원</span>
                                        <ArrowDown size={12} />
                                    </div>
                                    <div className="bg-gray-50 p-2 border border-gray-200 flex items-center justify-between">
                                        <div className="relative border-2 border-red-300 p-1 bg-white">
                                             <div className="text-xs font-bold text-gray-800 flex items-center gap-1">
                                                크림베이지/F <span className="bg-[#A64D79] text-white text-[10px] px-1 py-0.5">쿠폰적용</span>
                                             </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <div className="border border-gray-300 bg-white px-2 py-0.5 text-xs">1</div>
                                             <span className="font-bold text-sm">42,000원</span>
                                             <span className="text-gray-400">x</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-2 relative">
                                    <div className="border border-gray-300 p-2 text-xs text-gray-500 flex justify-between items-center bg-white">
                                        <span>크림베이지/F : +10,000원</span>
                                        <ArrowDown size={12} />
                                    </div>
                                     <div className="bg-gray-50 p-2 border border-gray-200 flex items-center justify-between">
                                        <div className="relative border-2 border-red-300 p-1 bg-white">
                                             <div className="text-xs font-bold text-gray-800 flex items-center gap-1">
                                                크림베이지/F (+10,000원) <span className="bg-[#A64D79] text-white text-[10px] px-1 py-0.5">쿠폰적용</span>
                                             </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <div className="border border-gray-300 bg-white px-2 py-0.5 text-xs">1</div>
                                             <span className="font-bold text-sm">42,000원</span>
                                             <span className="text-gray-400">x</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
