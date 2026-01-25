"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TipTapEditor from "@/components/ui/TipTapEditor";
import Link from "next/link";
import { useState } from "react";
import { List, Youtube, ArrowUp, ArrowDown, HelpCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SupplierPopup from "@/components/admin/SupplierPopup";

export default function ProductUsageGuideRegisterPage() {
    const [providerType, setProviderType] = useState("hq");
    const [guideType, setGuideType] = useState("delivery");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [useSupplier, setUseSupplier] = useState("disabled");
    const [isDefault, setIsDefault] = useState(false);

    const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<{ id: string; name: string } | null>(null);

    const handleSave = () => {
        // Implement save logic here
        console.log({
            providerType,
            selectedSupplier,
            guideType,
            title,
            content,
            useSupplier,
            isDefault
        });
        alert("저장되었습니다. (Logic to be implemented)");
    };

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">상품 상세 이용안내 등록</h1>
                <div className="flex items-center gap-2">
                    <Link href="/admin/settings/product-usage-guide">
                        <Button variant="outline" className="h-9 px-4 text-xs font-bold border-gray-300">
                            <List size={14} className="mr-1" /> 목록
                        </Button>
                    </Link>
                    <Button 
                        className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white h-9 px-6 text-xs font-bold rounded-sm"
                        onClick={handleSave}
                    >
                        저장
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2">
                     <h2 className="text-lg font-bold text-gray-800">상품 상세 이용안내 내용</h2>
                     <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
               

                <div className="border border-gray-300 bg-white">
                    {/* Provider Type */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            <span className="text-[#FF424D] mr-1">•</span> 공급사 구분
                        </div>
                        <div className="p-3 flex items-center gap-6">
                            <RadioGroup 
                                value={providerType} 
                                onValueChange={(val) => {
                                    setProviderType(val);
                                    if(val === 'hq') setSelectedSupplier(null);
                                    if(val === 'supplier') setIsSupplierDialogOpen(true);
                                }} 
                                className="flex items-center gap-4"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="hq" id="provider-hq" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="provider-hq" className="font-normal cursor-pointer">본사</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="supplier" id="provider-supplier" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="provider-supplier" className="font-normal cursor-pointer">공급사</Label>
                                </div>
                            </RadioGroup>
                            
                             <Button 
                                type="button"
                                variant="ghost" 
                                size="sm" 
                                className="h-7 text-xs border border-gray-300 font-normal !bg-[#A3A3A3] text-white hover:bg-[#999999]"
                                onClick={() => {
                                    setProviderType("supplier");
                                    setIsSupplierDialogOpen(true);
                                }}
                            >
                                {selectedSupplier ? selectedSupplier.name : "공급사 선택"}
                            </Button>
                        </div>
                    </div>

                    {/* Guide Type */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                             <span className="text-[#FF424D] mr-1">•</span> 이용안내 종류
                        </div>
                        <div className="p-3">
                            <RadioGroup value={guideType} onValueChange={setGuideType} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="delivery" id="type-delivery" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="type-delivery" className="font-normal cursor-pointer">배송안내</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="as" id="type-as" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="type-as" className="font-normal cursor-pointer">AS안내</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="refund" id="type-refund" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="type-refund" className="font-normal cursor-pointer">환불안내</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="exchange" id="type-exchange" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="type-exchange" className="font-normal cursor-pointer">교환안내</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            <span className="text-[#FF424D] mr-1">•</span> 이용안내 제목
                        </div>
                        <div className="p-2">
                            <Input 
                                className="w-full h-9 rounded-sm border-gray-300"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            <span className="text-[#FF424D] mr-1">•</span> 이용안내 내용
                        </div>
                         <div className="p-2">
                             <TipTapEditor 
                                content={content} 
                                onChange={setContent} 
                            />
                        </div>
                    </div>

                    {/* Supplier Use */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                         <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            공급사 사용 여부
                        </div>
                        <div className="p-3">
                            <RadioGroup value={useSupplier} onValueChange={setUseSupplier} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="enabled" id="use-enabled" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="use-enabled" className="font-normal cursor-pointer">사용 가능</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="disabled" id="use-disabled" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="use-disabled" className="font-normal cursor-pointer">사용 불가</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
                
                 {/* Default Setting */}
                 <div className="border border-gray-300 bg-white">
                    <div className="grid grid-cols-[180px_1fr]">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            상품 등록시 기본
                        </div>
                        <div className="p-3 flex items-center gap-2">
                            <Checkbox 
                                id="is-default" 
                                className="w-4 h-4 border-gray-300 data-[state=checked]:bg-[#FF424D] data-[state=checked]:border-[#FF424D]"
                                checked={isDefault}
                                onCheckedChange={(checked) => setIsDefault(checked as boolean)}
                            />
                            <Label htmlFor="is-default" className="font-normal cursor-pointer text-gray-600">상품 등록 시 기본으로 노출되도록 설정합니다.</Label>
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

            <SupplierPopup 
                isOpen={isSupplierDialogOpen} 
                onClose={() => setIsSupplierDialogOpen(false)} 
                onConfirm={(supplier) => {
                    if (Array.isArray(supplier)) {
                        setSelectedSupplier(supplier[0] || null);
                    } else {
                        setSelectedSupplier(supplier);
                    }
                }} 
            />
        </div>
    );
}
