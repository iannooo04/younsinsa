"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TipTapEditor from "@/components/ui/TipTapEditor";
import Link from "next/link";
import { useState, useEffect } from "react";
import { List, Youtube, ArrowUp, ArrowDown, HelpCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SupplierPopup from "@/components/admin/SupplierPopup";
import { useParams } from "next/navigation";

// Dummy data for example
const DUMMY_DATA = {
    'dummy-1': {
        id: 'dummy-1',
        providerType: 'hq',
        guideType: 'delivery',
        title: '배송안내 - 기본',
        content: `
        <p>- 배송비 : 기본배송료는 <strong>2,500원</strong> 입니다. (도서,산간,오지 일부지역은 배송비가 추가될 수 있습니다) <strong>50,000원</strong> 이상 구매시 무료배송입니다.</p>
        <p>- 본 상품의 평균 배송일은 0일입니다.(입금 확인 후) 설치 상품의 경우 다소 늦어질 수 있습니다.[배송예정일은 주문시점(주문순서)에 따른 유동성이 발생하므로 평균 배송일과는 차이가 발생할 수 있습니다.]</p>
        <p>- 본 상품의 배송 가능일은 0일 입니다. 배송 가능일이란 본 상품을 주문 하신 고객님들께 상품 배송이 가능한 기간을 의미합니다. (단, 연휴 및 공휴일은 기간 계산시 제외하며 현금 주문일 경우 입금일 기준 입니다.)</p>
        `,
        useSupplier: 'disabled',
        isDefault: true,
        supplierName: null
    }
};

export default function ProductUsageGuideEditPage() {
    const params = useParams();
    const id = params.id as string;

    const [providerType, setProviderType] = useState("hq");
    const [guideType, setGuideType] = useState("delivery");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [useSupplier, setUseSupplier] = useState("disabled");
    const [isDefault, setIsDefault] = useState(false);

    const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<{ id: string; name: string } | null>(null);

    useEffect(() => {
        // Fetch data based on ID. For now using dummy data.
        if (id && DUMMY_DATA[id as keyof typeof DUMMY_DATA]) {
            const data = DUMMY_DATA[id as keyof typeof DUMMY_DATA];
            setProviderType(data.providerType);
            setGuideType(data.guideType);
            setTitle(data.title);
            setContent(data.content);
            setUseSupplier(data.useSupplier);
            setIsDefault(data.isDefault);
            if (data.supplierName) {
                // In real app, fetch supplier details
            }
        }
    }, [id]);

    const handleSave = () => {
        // Implement save logic here
        console.log({
            id,
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
                <h1 className="text-2xl font-bold text-gray-900">상품 상세 이용안내 수정</h1>
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
                            <div className="flex items-center gap-2 text-gray-700">
                                {guideType === 'delivery' && '배송안내'}
                                {guideType === 'as' && 'AS안내'}
                                {guideType === 'refund' && '환불안내'}
                                {guideType === 'exchange' && '교환안내'}
                                {/* In edit mode, guide type is usually fixed or just display text as per screenshot? 
                                    Screenshot showing just text "배송안내" implies it might be non-editable or just displayed differently.
                                    But registration had radios. Edit usually allows change? 
                                    The screenshot shows text "배송안내". It seems read-only or just a display. 
                                    I will keep it read-only text for now based on image.
                                */}
                            </div>
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
