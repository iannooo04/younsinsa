"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { List, Youtube, HelpCircle } from "lucide-react";
import { createEssentialInfoTemplateAction } from "@/actions/product-essential-info-actions";
import SupplierPopup from "@/components/admin/SupplierPopup";

export default function CreateEssentialInfoPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    
    // Form State
    const [supplierType, setSupplierType] = useState("headquarters");
    const [selectedSupplierName, setSelectedSupplierName] = useState("");
    const [selectedSupplierId, setSelectedSupplierId] = useState("");
    const [isSupplierPopupOpen, setIsSupplierPopupOpen] = useState(false);
    const [essentialInfoName, setEssentialInfoName] = useState("");
    
    interface Item {
        id: number;
        type: 2 | 4;
        label1: string;
        value1: string;
        label2: string;
        value2: string;
    }
    const [items, setItems] = useState<Item[]>([]);

    const addItem = (type: 2 | 4) => {
        setItems(prev => [...prev, {
            id: Date.now(),
            type,
            label1: "",
            value1: "",
            label2: "",
            value2: ""
        }]);
    };

    const removeItem = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const updateItem = (id: number, field: keyof Item, value: string) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleSave = async () => {
        if (!essentialInfoName) return alert("필수정보명을 입력해주세요.");
        
        startTransition(async () => {
            const res = await createEssentialInfoTemplateAction({
                name: essentialInfoName,
                supplierId: supplierType === "supplier" ? selectedSupplierId : undefined,
                items: items.map(item => ({
                    type: item.type,
                    label1: item.label1,
                    value1: item.value1,
                    label2: item.label2,
                    value2: item.value2
                }))
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
        <div className="p-8 bg-white min-h-screen text-[13px] text-gray-700 leading-normal font-sans">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">상품 필수정보 등록</h1>
                <div className="flex gap-2">
                    <button 
                        onClick={() => router.push("/admin/products/info")}
                        className="flex items-center gap-1.5 px-4 h-9 bg-white border border-gray-300 rounded-[2px] hover:bg-gray-50 transition-colors"
                    >
                        <List size={16} className="text-gray-500" />
                        <span className="font-medium">목록</span>
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={isPending}
                        className="flex items-center gap-1.5 px-6 h-9 bg-[#FF3032] text-white rounded-[2px] hover:bg-[#E52B2D] transition-colors font-bold"
                    >
                        <span className="tracking-widest">{isPending ? "저장중" : "저장"}</span>
                    </button>
                </div>
            </div>

            {/* Warning Boxes */}
            <div className="space-y-4 mb-8">
                <div className="flex items-start gap-2 text-xs">
                    <div className="w-3.5 h-3.5 bg-[#FF3032] flex items-center justify-center rounded-[2px] mt-0.5 flex-shrink-0">
                        <span className="text-white font-bold text-[10px]">!</span>
                    </div>
                    <p>
                        <span className="text-[#FF3032] font-bold">공정거래위원회에서 공고한 전자상거래법 상품정보제공 고시에 관한 내용을 필독해 주세요!</span>
                        <a href="#" className="text-blue-500 underline ml-1 font-medium">내용 확인 &gt;</a>
                    </p>
                </div>

                <div className="flex items-start gap-2 text-xs pl-0.5">
                    <div className="w-3.5 h-3.5 bg-[#666] flex items-center justify-center rounded-[2px] mt-0.5 flex-shrink-0">
                        <span className="text-white font-bold text-[10px]">!</span>
                    </div>
                    <div className="text-gray-500 leading-relaxed">
                        <p>전자상거래법에 의거하여 판매 상품의 필수 (상세) 정보 등록이 필요합니다.</p>
                        <p>
                            <a href="#" className="text-blue-500 underline font-bold">품목별 상품정보고시 내용보기</a>를 참고하여 상품필수 정보를 등록하여 주세요.
                        </p>
                        <p>등록된 정보는 쇼핑몰 상품상세페이지에 상품기본정보 아래에 표형태로 출력되어 보여집니다.</p>
                    </div>
                </div>

                <div className="flex items-start gap-2 text-xs pl-0.5">
                    <div className="w-3.5 h-3.5 bg-[#FF3032] flex items-center justify-center rounded-[2px] mt-0.5 flex-shrink-0">
                        <span className="text-white font-bold text-[10px]">!</span>
                    </div>
                    <p>
                        <span className="text-[#FF3032] font-bold">전기용품 및 생활용품 판매 시 "전기용품 및 생활용품 안전관리법"에 관한 내용을 필독해 주세요!</span>
                        <a href="#" className="text-blue-500 underline ml-1 font-medium">내용 확인 &gt;</a>
                    </p>
                </div>

                <div className="flex items-start gap-2 text-xs pl-0.5">
                    <div className="w-3.5 h-3.5 bg-[#666] flex items-center justify-center rounded-[2px] mt-0.5 flex-shrink-0">
                        <span className="text-white font-bold text-[10px]">!</span>
                    </div>
                    <div className="text-gray-500 leading-relaxed">
                        <p>안전관리대상 제품은 안전인증 등의 표시(KC 인증마크 및 인증번호)를 소비자가 확인할 수 있도록 상품 상세페이지 내 표시해야 합니다.</p>
                        <p>
                            <a href="#" className="text-blue-500 underline font-bold">국가기술표준원(KATS) 제품안전정보센터</a>에서 인증대상 품목여부를 확인하여 등록하여 주세요.
                        </p>
                    </div>
                </div>
            </div>

            {/* Basic Info Section */}
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-lg font-bold text-gray-800 tracking-tight">기본정보</h2>
                    <HelpCircle size={16} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t-2 border-gray-800">
                    <div className="grid grid-cols-[160px_1fr] border-b border-gray-200 min-h-[50px]">
                        <div className="bg-[#f9f9f9] p-4 font-bold text-gray-700 border-r border-gray-200 flex items-center">
                            공급사 구분
                        </div>
                        <div className="p-3 flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="supplier" value="headquarters" checked={supplierType === "headquarters"} onChange={() => setSupplierType("headquarters")} className="radio radio-xs checked:bg-red-500" />
                                <span>본사</span>
                            </label>
                            <div className="flex items-center gap-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="supplier" 
                                        value="supplier" 
                                        checked={supplierType === "supplier"} 
                                        onChange={() => {
                                            setSupplierType("supplier");
                                            setIsSupplierPopupOpen(true);
                                        }} 
                                        className="radio radio-xs checked:bg-red-500" 
                                    />
                                    <span>공급사</span>
                                </label>
                                <button 
                                    onClick={() => setIsSupplierPopupOpen(true)}
                                    className={`px-3 py-1 text-xs rounded-sm transition-colors ${supplierType === "supplier" ? "bg-gray-500 text-white hover:bg-gray-600" : "bg-gray-300 text-white cursor-not-allowed"}`}
                                    disabled={supplierType !== "supplier"}
                                >
                                    공급사 선택
                                </button>
                                {supplierType === "supplier" && selectedSupplierName && (
                                    <span className="text-blue-600 font-medium ml-1">({selectedSupplierName})</span>
                                )}
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="supplier" value="none" checked={supplierType === "none"} onChange={() => setSupplierType("none")} className="radio radio-xs checked:bg-red-500" />
                                <span>구분없음</span>
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-[160px_1fr] border-b border-gray-200 min-h-[50px]">
                        <div className="bg-[#f9f9f9] p-4 font-bold text-gray-700 border-r border-gray-200 flex items-center">
                            <span className="text-red-500 mr-1">*</span> 필수정보명
                            <HelpCircle size={14} className="ml-1 text-gray-400 cursor-help" />
                        </div>
                        <div className="p-3 flex items-center gap-3">
                            <input 
                                type="text" 
                                value={essentialInfoName}
                                onChange={(e) => setEssentialInfoName(e.target.value)}
                                className="w-full max-w-[480px] h-9 border border-gray-300 px-3 py-1.5 focus:border-gray-500 outline-none" 
                                placeholder="필수정보명을 입력해주세요."
                            />
                            <span className="text-xs text-gray-400">{essentialInfoName.length} / 100</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Info Section */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-lg font-bold text-gray-800 tracking-tight">상세정보</h2>
                    <HelpCircle size={16} className="text-gray-400 cursor-help" />
                </div>
                <div className="w-full space-y-2">
                    <div className="flex items-center gap-3 mb-1">
                        <button 
                            type="button" 
                            onClick={() => addItem(4)}
                            className="px-2 py-1 border border-gray-300 bg-white text-xs text-gray-600 rounded-sm hover:bg-gray-50 flex items-center gap-2 h-7"
                        >
                            <div className="flex gap-0.5">
                                <div className="w-3 h-3 border border-gray-400"></div>
                                <div className="w-3 h-3 border border-gray-400"></div>
                                <div className="w-3 h-3 border border-gray-400"></div>
                                <div className="w-3 h-3 border border-gray-400"></div>
                            </div>
                            4칸 항목 추가
                        </button>
                        <button 
                            type="button" 
                            onClick={() => addItem(2)}
                            className="px-2 py-1 border border-gray-300 bg-white text-xs text-gray-600 rounded-sm hover:bg-gray-50 flex items-center gap-2 h-7"
                        >
                            <div className="flex gap-0.5">
                                <div className="w-3 h-3 border border-gray-400"></div>
                                <div className="w-3 h-3 border border-gray-400"></div>
                            </div>
                            2칸 항목 추가
                        </button>
                        
                        <div className="text-xs text-[#FF3032] flex items-center gap-1 font-medium ml-2">
                            <div className="w-3.5 h-3.5 bg-[#FF3032] flex items-center justify-center rounded-[2px]">
                                <span className="text-white font-bold text-[10px]">!</span>
                            </div>
                            항목과 내용 란에 아무 내용도 입력하지 않으면 저장되지 않습니다.
                        </div>
                    </div>

                    <div className="border border-gray-300 border-b-0 overflow-hidden">
                        <div className="w-full bg-[#bfbfbf] h-10 flex items-center text-white text-center text-xs border-b border-gray-300 px-0.5">
                            <div className="w-48 border-r border-gray-300/50 h-full flex items-center justify-center">항목</div>
                            <div className="flex-1 border-r border-gray-300/50 h-full flex items-center justify-center">내용</div>
                            <div className="w-48 border-r border-gray-300/50 h-full flex items-center justify-center">항목</div>
                            <div className="flex-1 border-r border-gray-300/50 h-full flex items-center justify-center">내용</div>
                            <div className="w-20 h-full flex items-center justify-center">-</div>
                        </div>
                        
                        {items.length === 0 ? (
                            <div className="h-40 flex items-center justify-center bg-[#fcfcfc] border-b border-gray-300 text-xs text-gray-400">
                                상세정보를 추가해주세요.
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item.id} className="flex items-center text-xs border-b border-gray-300 bg-white h-10">
                                    <div className="w-48 border-r border-gray-300 h-full flex items-center justify-center px-1">
                                        <input 
                                            type="text" 
                                            className="w-full h-7 border border-gray-300 px-2 outline-none focus:border-gray-500" 
                                            value={item.label1}
                                            onChange={(e) => updateItem(item.id, 'label1', e.target.value)}
                                        />
                                    </div>
                                    <div className={`border-r border-gray-300 h-full flex items-center justify-center px-1 ${item.type === 2 ? 'flex-[3]' : 'flex-1'}`}>
                                        <input 
                                            type="text" 
                                            className="w-full h-7 border border-gray-300 px-2 outline-none focus:border-gray-500" 
                                            value={item.value1}
                                            onChange={(e) => updateItem(item.id, 'value1', e.target.value)}
                                        />
                                    </div>
                                    {item.type === 4 && (
                                        <>
                                            <div className="w-48 border-r border-gray-300 h-full flex items-center justify-center px-1">
                                                <input 
                                                    type="text" 
                                                    className="w-full h-7 border border-gray-300 px-2 outline-none focus:border-gray-500" 
                                                    value={item.label2}
                                                    onChange={(e) => updateItem(item.id, 'label2', e.target.value)}
                                                />
                                            </div>
                                            <div className="flex-1 border-r border-gray-300 h-full flex items-center justify-center px-1">
                                                <input 
                                                    type="text" 
                                                    className="w-full h-7 border border-gray-300 px-2 outline-none focus:border-gray-500" 
                                                    value={item.value2}
                                                    onChange={(e) => updateItem(item.id, 'value2', e.target.value)}
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div className="w-20 h-full flex items-center justify-center">
                                        <button 
                                            type="button" 
                                            onClick={() => removeItem(item.id)}
                                            className="px-2 py-0.5 border border-gray-300 bg-white text-[11px] text-gray-400 rounded-sm hover:bg-gray-50 flex items-center gap-1"
                                        >
                                            <span className="text-gray-400">-</span> 삭제
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <button className="w-12 h-12 rounded-full bg-[#FF3032] text-white flex items-center justify-center shadow-lg hover:bg-[#E52B2D] transition-colors overflow-hidden">
                    <Youtube size={24} />
                </button>
                <button className="w-12 h-12 rounded-full bg-[#8250C6] text-white flex items-center justify-center shadow-lg hover:bg-[#7040B0] transition-colors text-[11px] leading-tight font-bold flex-col pt-0.5">
                    <span>따라</span>
                    <span>하기</span>
                </button>
            </div>

            <SupplierPopup 
                isOpen={isSupplierPopupOpen}
                onClose={() => setIsSupplierPopupOpen(false)}
                onConfirm={(supplier) => {
                    if (supplier && !Array.isArray(supplier)) {
                        setSelectedSupplierName(supplier.name);
                        setSelectedSupplierId(supplier.id);
                    }
                }}
            />
        </div>
    );
}
