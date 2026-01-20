"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Youtube, ChevronUp } from "lucide-react";
import { getProductBasicSettingsAction, updateProductBasicSettingsAction } from "@/actions/basic-policy-actions";

export default function ClassificationSettingsPage() {
    const [isPending, startTransition] = useTransition();
    const [settings, setSettings] = useState<Record<string, unknown> | null>(null);
    const [formData, setFormData] = useState({
        subBrandProductDisplay: "unsold",
        parentCategoryAutoRegister: "unused",
        navCategoryUsage: "used",
        navBrandUsage: "used",
        countCategoryUsage: "used",
        countBrandUsage: "used",
        // Keep other fields from ProductBasicSettings
        modDateRange: {},
        modDatePopup: "unused",
        imageLoadingEnhance: "unused",
        priceExposure: "exposed",
        optionPriceExposure: "exposed",
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        const res = await getProductBasicSettingsAction();
        if (res.success && res.settings) {
            setSettings(res.settings);
            setFormData({
                subBrandProductDisplay: res.settings.subBrandProductDisplay,
                parentCategoryAutoRegister: res.settings.parentCategoryAutoRegister,
                navCategoryUsage: res.settings.navCategoryUsage,
                navBrandUsage: res.settings.navBrandUsage,
                countCategoryUsage: res.settings.countCategoryUsage,
                countBrandUsage: res.settings.countBrandUsage,
                modDateRange: res.settings.modDateRange as Record<string, unknown>,
                modDatePopup: res.settings.modDatePopup,
                imageLoadingEnhance: res.settings.imageLoadingEnhance,
                priceExposure: res.settings.priceExposure,
                optionPriceExposure: res.settings.optionPriceExposure,
            });
        }
    };

    const handleSave = async () => {
        startTransition(async () => {
            const res = await updateProductBasicSettingsAction(formData);
            if (res.success) {
                alert("저장되었습니다.");
                fetchSettings();
            } else {
                alert(res.error || "저장 실패");
            }
        });
    };

    if (!settings) return <div className="p-6">로딩중...</div>;

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">분류 설정 관리</h1>
                <Button 
                    onClick={handleSave}
                    disabled={isPending}
                    className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm"
                >
                    {isPending ? "저장중" : "저장"}
                </Button>
            </div>

            {/* Sub-brand Product Display Settings */}
            <div>
                 <div className="flex items-center gap-1 mb-2 mt-4">
                    <h2 className="text-sm font-bold text-gray-800">하위브랜드 상품진열 설정</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                </div>
                
                <div className="border-t border-gray-400 bg-white text-xs">
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200 relative">
                             <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-red-500 rounded-full mb-0.5"></div>
                                <span>진열여부</span>
                            </div>
                        </div>
                        <div className="flex-1 p-4 flex items-center">
                             <RadioGroup 
                                value={formData.subBrandProductDisplay} 
                                onValueChange={(val: string) => setFormData({...formData, subBrandProductDisplay: val})}
                                className="flex gap-6"
                             >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="sold" id="sb-sold" className="rounded-full border-gray-300 text-gray-600 focus:ring-gray-400" />
                                    <Label htmlFor="sb-sold" className="font-normal text-gray-700 cursor-pointer">진열함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unsold" id="sb-unsold" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="sb-unsold" className="font-normal text-gray-700 cursor-pointer">진열안함</Label>
                                </div>
                             </RadioGroup>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-[#888888] text-[11px]">
                    <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                    하위브랜드 상품진열을 "진열함"으로 설정하면, 현재 브랜드에 속한 모든 하위브랜드의 상품들이 함께 진열됩니다.
                </div>
            </div>

            {/* Parent Category Auto-register Settings */}
            <div>
                 <div className="flex items-center gap-1 mb-2 mt-8">
                    <h2 className="text-sm font-bold text-gray-800">상위카테고리 자동등록 설정</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                </div>
                
                <div className="border-t border-gray-400 bg-white text-xs">
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200 relative">
                             <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-red-500 rounded-full mb-0.5"></div>
                                <span>사용여부</span>
                            </div>
                        </div>
                        <div className="flex-1 p-4 flex items-center">
                             <RadioGroup 
                                value={formData.parentCategoryAutoRegister} 
                                onValueChange={(val: string) => setFormData({...formData, parentCategoryAutoRegister: val})}
                                className="flex gap-6"
                             >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="pc-used" className="rounded-full border-gray-300 text-gray-600 focus:ring-gray-400" />
                                    <Label htmlFor="pc-used" className="font-normal text-gray-700 cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="pc-unused" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="pc-unused" className="font-normal text-gray-700 cursor-pointer">사용안함</Label>
                                </div>
                             </RadioGroup>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-[#888888] text-[11px]">
                    <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
                    상위카테고리 자동등록을 "사용함"으로 설정하면, 상품 엑셀 업로드 시 카테고리 코드에 기재된 카테고리에 속한 모든 상위카테고리가 상품에 자동 등록됩니다.
                </div>
            </div>

            {/* Navigation Area Settings */}
            <div>
                 <div className="flex items-center gap-1 mb-2 mt-8">
                    <h2 className="text-sm font-bold text-gray-800">네비게이션 영역 설정</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                </div>
                
                <div className="border-t border-gray-400 bg-white text-xs border-b border-gray-200">
                    {/* Row 1: Usage */}
                    <div className="flex border-b border-gray-200">
                        {/* Label */}
                         <div className="w-48 bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                             <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-red-500 rounded-full mb-0.5"></div>
                                <span>사용여부</span>
                            </div>
                        </div>
                        {/* Controls */}
                        <div className="flex-1 border-r border-gray-200">
                            <div className="flex items-center h-12 border-b border-gray-200 px-4">
                                <span className="w-24 text-gray-600">카테고리</span>
                                <RadioGroup 
                                    value={formData.navCategoryUsage} 
                                    onValueChange={(val: string) => setFormData({...formData, navCategoryUsage: val})}
                                >
                                    <div className="flex gap-6 items-center">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="used" id="nav-cat-used" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                        <Label htmlFor="nav-cat-used" className="font-normal text-gray-700 cursor-pointer">사용함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="unused" id="nav-cat-unused" className="rounded-full border-gray-300 text-gray-600 focus:ring-gray-400" />
                                        <Label htmlFor="nav-cat-unused" className="font-normal text-gray-700 cursor-pointer">사용안함</Label>
                                    </div>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="flex items-center h-12 px-4">
                                <span className="w-24 text-gray-600">브랜드</span>
                                <RadioGroup 
                                    value={formData.navBrandUsage} 
                                    onValueChange={(val: string) => setFormData({...formData, navBrandUsage: val})}
                                >
                                    <div className="flex gap-6 items-center">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="used" id="nav-brand-used" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                        <Label htmlFor="nav-brand-used" className="font-normal text-gray-700 cursor-pointer">사용함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="unused" id="nav-brand-unused" className="rounded-full border-gray-300 text-gray-600 focus:ring-gray-400" />
                                        <Label htmlFor="nav-brand-unused" className="font-normal text-gray-700 cursor-pointer">사용안함</Label>
                                    </div>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                        {/* Preview */}
                        <div className="w-[300px] p-4 flex flex-col justify-center">
                            <div className="text-[#999999] text-[10px] mb-1">[쇼핑몰 예시화면]</div>
                            <div className="border border-gray-200 p-2 pl-3">
                                <div className="font-bold text-gray-800 mb-2 text-[11px]">여성의류</div>
                                <div className="border border-red-400 p-1 flex gap-4 text-[10px] text-gray-600">
                                    <span className="border-b border-gray-400">상의</span>
                                    <span>원피스</span>
                                    <span>하의</span>
                                    <span>아우터</span>
                                    <span>악세사리</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Product Count Display */}
                    <div className="flex">
                        {/* Label */}
                         <div className="w-48 bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                             <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-red-500 rounded-full mb-0.5"></div>
                                <span>상품수 노출여부</span>
                            </div>
                        </div>
                        {/* Controls */}
                        <div className="flex-1 border-r border-gray-200">
                            <div className="flex items-center h-14 border-b border-gray-200 px-4">
                                <span className="w-24 text-gray-600">카테고리</span>
                                <RadioGroup 
                                    value={formData.countCategoryUsage} 
                                    onValueChange={(val: string) => setFormData({...formData, countCategoryUsage: val})}
                                >
                                    <div className="flex gap-6 items-center">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="used" id="count-cat-used" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                        <Label htmlFor="count-cat-used" className="font-normal text-gray-700 cursor-pointer">사용함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="unused" id="count-cat-unused" className="rounded-full border-gray-300 text-gray-600 focus:ring-gray-400" />
                                        <Label htmlFor="count-cat-unused" className="font-normal text-gray-700 cursor-pointer">사용안함</Label>
                                    </div>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="flex items-center h-14 px-4">
                                <span className="w-24 text-gray-600">브랜드</span>
                                <RadioGroup 
                                    value={formData.countBrandUsage} 
                                    onValueChange={(val: string) => setFormData({...formData, countBrandUsage: val})}
                                >
                                    <div className="flex gap-6 items-center">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="used" id="count-brand-used" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                        <Label htmlFor="count-brand-used" className="font-normal text-gray-700 cursor-pointer">사용함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="unused" id="count-brand-unused" className="rounded-full border-gray-300 text-gray-600 focus:ring-gray-400" />
                                        <Label htmlFor="count-brand-unused" className="font-normal text-gray-700 cursor-pointer">사용안함</Label>
                                    </div>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                        {/* Preview */}
                        <div className="w-[300px] p-4 flex flex-col justify-center">
                            <div className="text-[#999999] text-[10px] mb-1">[쇼핑몰 예시화면]</div>
                            <div className="border border-gray-200 p-2 pl-3">
                                <div className="font-bold text-gray-800 mb-2 text-[11px]">여성의류</div>
                                <div className="flex gap-2 text-[10px] text-gray-600">
                                    <span className="border border-red-400 px-0.5">상의(7)</span>
                                    <span className="border border-red-400 px-0.5">원피스(8)</span>
                                    <span className="border border-red-400 px-0.5">하의(5)</span>
                                    <span className="border border-red-400 px-0.5">아우터(2)</span>
                                    <span className="border border-red-400 px-0.5">악세사리(1)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold"><Youtube size={16}/></span>
                </Button>
                 <Button className="rounded-full w-10 h-10 bg-[#7B4DFF] hover:bg-[#7B4DFF]/90 shadow-lg text-white p-0 flex items-center justify-center border-0 text-[10px] leading-tight flex-col">
                    <span className="block">따라</span>
                    <span className="block">하기</span>
                </Button>
                <div className="flex flex-col gap-0 rounded-full bg-white shadow-lg overflow-hidden border border-gray-200">
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100">
                         <ChevronUp size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none transform rotate-180">
                         <ChevronUp size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
