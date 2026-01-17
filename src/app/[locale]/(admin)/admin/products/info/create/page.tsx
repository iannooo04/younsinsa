"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Plus, Minus, Youtube, ChevronUp, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import { createEssentialInfoTemplateAction } from "@/actions/product-essential-info-actions";

export default function CreateEssentialInfoPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState({
        name: "",
        supplierId: "",
        supplierType: "headquarters",
        items: [
            { label: "소재", value: "상세설명 참조", isRequired: true },
            { label: "색상", value: "상세설명 참조", isRequired: true },
            { label: "치수", value: "상세설명 참조", isRequired: true },
            { label: "제조사/수입자", value: "상세설명 참조", isRequired: true },
            { label: "제조국", value: "상세설명 참조", isRequired: true },
            { label: "세탁방법 및 취급시 주의사항", value: "상세설명 참조", isRequired: true },
            { label: "제조연월", value: "상세설명 참조", isRequired: true },
            { label: "품질보증기준", value: "상세설명 참조", isRequired: true },
            { label: "A/S 책임자와 전화번호", value: "상세설명 참조", isRequired: true },
        ]
    });

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { label: "", value: "", isRequired: false }]
        }));
    };

    const removeItem = (index: number) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const updateItem = (index: number, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.map((item, i) => i === index ? { ...item, [field]: value } : item)
        }));
    };

    const handleSave = async () => {
        if (!formData.name) return alert("필수정보명을 입력해주세요.");
        
        startTransition(async () => {
            const res = await createEssentialInfoTemplateAction({
                name: formData.name,
                supplierId: formData.supplierType === "supplier" ? formData.supplierId : undefined,
                items: formData.items,
            });
            if (res.success) {
                alert("저장되었습니다.");
                router.push("/admin/products/info");
            } else {
                alert(res.error || "저장 실패");
            }
        });
    };

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">상품 필수정보 등록</h1>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        onClick={() => router.back()}
                        className="h-9 px-4 border-gray-300"
                    >
                        취소
                    </Button>
                    <Button 
                        onClick={handleSave}
                        disabled={isPending}
                        className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 px-6 rounded-sm"
                    >
                        {isPending ? "저장중" : "저장"}
                    </Button>
                </div>
            </div>

            {/* Basic Info Section */}
            <div className="border border-gray-300 bg-white">
                <div className="flex items-center border-b border-gray-200">
                    <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center gap-1">
                        필수정보명 <span className="text-red-500">*</span>
                    </div>
                    <div className="flex-1 p-3">
                        <Input 
                            value={formData.name} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full max-w-md h-9" 
                            placeholder="예: 의류, 가전제품"
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">공급사 구분</div>
                    <div className="flex-1 p-3 flex items-center gap-6">
                        <RadioGroup 
                            value={formData.supplierType} 
                            onValueChange={(val) => setFormData({...formData, supplierType: val})}
                            className="flex items-center gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="headquarters" id="sup-head" />
                                <Label htmlFor="sup-head">본사</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="supplier" id="sup-vendor" />
                                <Label htmlFor="sup-vendor">공급사</Label>
                                <Button variant="secondary" className="h-7 text-xs bg-gray-400 text-white hover:bg-gray-500 rounded-sm ml-2" disabled={formData.supplierType !== "supplier"}>
                                    공급사 선택
                                </Button>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>

            {/* Items Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">필수항목 설정</h2>
                    <Button 
                        variant="outline" 
                        onClick={addItem}
                        className="h-8 text-xs border-gray-300"
                    >
                        <Plus size={14} className="mr-1" /> 항목 추가
                    </Button>
                </div>

                <div className="border-t-2 border-gray-800 border-b border-gray-300">
                    <table className="w-full">
                        <thead className="bg-[#A4A4A4]/20 border-b border-gray-300">
                            <tr>
                                <th className="w-16 p-3 text-center font-bold text-gray-700">순서</th>
                                <th className="p-3 text-center font-bold text-gray-700 border-x border-gray-300">항목명</th>
                                <th className="p-3 text-center font-bold text-gray-700 border-r border-gray-300">내용 (기본값)</th>
                                <th className="w-16 p-3 text-center font-bold text-gray-700">삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.items.map((item, index) => (
                                <tr key={index} className="border-b border-gray-200 last:border-0 h-12">
                                    <td className="text-center text-gray-500">{index + 1}</td>
                                    <td className="p-2 border-x border-gray-200">
                                        <Input 
                                            value={item.label} 
                                            onChange={(e) => updateItem(index, "label", e.target.value)}
                                            className="h-8 text-xs" 
                                        />
                                    </td>
                                    <td className="p-2 border-r border-gray-200">
                                        <Input 
                                            value={item.value} 
                                            onChange={(e) => updateItem(index, "value", e.target.value)}
                                            className="h-8 text-xs" 
                                        />
                                    </td>
                                    <td className="text-center">
                                        <Button 
                                            disabled={formData.items.length <= 1}
                                            variant="ghost" 
                                            onClick={() => removeItem(index)}
                                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                                        >
                                            <Minus size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="pt-8 border-t border-gray-300 space-y-6 mt-12">
                <div className="flex items-center gap-2">
                    <span className="text-blue-500"><Book size={16} /></span>
                    <h3 className="font-bold text-blue-500">안내</h3>
                </div>
                <div className="text-xs text-gray-500 leading-relaxed px-2">
                    <p>· 등록된 필수정보는 상품 등록/수정 시 선택하여 적용할 수 있습니다.</p>
                    <p>· 내용(기본값)을 입력해두면 상품 등록 시 해당 내용이 기본으로 입력됩니다.</p>
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <Youtube size={16}/>
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
