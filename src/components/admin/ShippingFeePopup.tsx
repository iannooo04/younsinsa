"use client";

import { useState } from "react";
import { X } from "lucide-react";
import ShippingFeeDetailPopup from "./ShippingFeeDetailPopup";

interface ShippingFeeOption {
    id: number;
    name: string;
    supplierType: string;
    method: string;
    type: string;
    setting: string;
    chargeMethod: string;
    paymentMethod: string;
    areaExtraFee: string;
    date: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selected: ShippingFeeOption | null) => void;
}

const MOCK_DATA: ShippingFeeOption[] = [
    {
        id: 4,
        name: "기본 - 금액별배송비 (기본설정)",
        supplierType: "니아인터내셔널",
        method: "택배",
        type: "금액별배송비",
        setting: "상세보기",
        chargeMethod: "배송비조건별",
        paymentMethod: "선불",
        areaExtraFee: "없음",
        date: "2025-11-25"
    },
    {
        id: 3,
        name: "기본 - 배송비무료",
        supplierType: "니아인터내셔널",
        method: "택배",
        type: "배송비무료",
        setting: "0원",
        chargeMethod: "배송비조건별",
        paymentMethod: "선불",
        areaExtraFee: "없음",
        date: "2025-11-25"
    },
    {
        id: 2,
        name: "기본 - 수량별배송비",
        supplierType: "니아인터내셔널",
        method: "택배",
        type: "수량별배송비",
        setting: "상세보기",
        chargeMethod: "배송비조건별",
        paymentMethod: "선불",
        areaExtraFee: "없음",
        date: "2025-11-25"
    },
    {
        id: 1,
        name: "기본 - 고정배송비",
        supplierType: "니아인터내셔널",
        method: "택배",
        type: "고정배송비",
        setting: "2,500원",
        chargeMethod: "배송비조건별",
        paymentMethod: "선불",
        areaExtraFee: "없음",
        date: "2025-11-25"
    }
];

export default function ShippingFeePopup({ isOpen, onClose, onConfirm }: Props) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [detailPopupState, setDetailPopupState] = useState<{
        isOpen: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any;
    }>({
        isOpen: false,
        data: null
    });

    if (!isOpen) return null;

    const handleConfirm = () => {
        const selected = MOCK_DATA.find(item => item.id === selectedId);
        onConfirm(selected || null);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center font-sans">
            <div className="bg-white w-[1000px] shadow-2xl border border-gray-300">
                {/* Header */}
                <div className="relative p-6 pb-2">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl text-gray-800 tracking-tight">배송비 선택</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X size={32} strokeWidth={1} />
                        </button>
                    </div>
                    <div className="h-0.5 bg-gray-500 w-full mb-1"></div>
                </div>

                {/* Body */}
                <div className="px-6 pb-6">
                    {/* Search Area */}
                    <div className="border border-gray-200 mb-5 grid grid-cols-[150px_1fr_120px]">
                        {/* Row 1 */}
                        <div className="bg-gray-50 flex items-center pl-4 py-3 text-sm font-normal text-gray-700 border-r border-b border-gray-200">
                            배송비 조건명
                        </div>
                        <div className="p-2 flex items-center bg-white border-b border-gray-200">
                            <input 
                                type="text" 
                                className="w-full max-w-[400px] h-8 border border-gray-300 px-2 text-sm focus:outline-none"
                            />
                        </div>
                        <div className="row-span-2 border-l border-gray-200 flex items-center justify-center p-2 bg-white">
                            <button className="bg-[#666666] text-white text-sm w-full h-full max-h-[80px] hover:bg-[#555555]">
                                검색
                            </button>
                        </div>

                        {/* Row 2 */}
                        <div className="bg-gray-50 flex items-center pl-4 py-3 text-sm font-normal text-gray-700 border-r border-gray-200">
                            배송 정책
                        </div>
                        <div className="p-3 bg-white space-y-2">
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="policy" className="radio radio-xs" defaultChecked />
                                    <span className="text-sm">전체</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="policy" className="radio radio-xs" />
                                    <span className="text-sm">배송비조건별</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="policy" className="radio radio-xs" />
                                    <span className="text-sm">상품별</span>
                                </label>
                            </div>
                            <div className="flex items-center gap-4 flex-wrap">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-xs rounded-none border-gray-300" defaultChecked />
                                    <span className="text-sm">전체</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-xs rounded-none border-gray-300" />
                                    <span className="text-sm">배송비무료</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-xs rounded-none border-gray-300" />
                                    <span className="text-sm">금액별배송</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-xs rounded-none border-gray-300" />
                                    <span className="text-sm">수량별배송</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-xs rounded-none border-gray-300" />
                                    <span className="text-sm">무게별배송</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-xs rounded-none border-gray-300" />
                                    <span className="text-sm">고정배송비</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-gray-300 border-b-0">
                        <table className="w-full text-center text-[12px] border-collapse">
                            <thead className="bg-[#B0B0B0] text-white">
                                <tr className="h-9">
                                    <th className="w-12 border-r border-gray-400 font-normal">선택</th>
                                    <th className="w-12 border-r border-gray-400 font-normal">번호</th>
                                    <th className="border-r border-gray-400 font-normal px-2">배송비조건명</th>
                                    <th className="w-24 border-r border-gray-400 font-normal">공급사구분</th>
                                    <th className="w-16 border-r border-gray-400 font-normal">배송방식</th>
                                    <th className="w-20 border-r border-gray-400 font-normal">배송비유형</th>
                                    <th className="w-20 border-r border-gray-400 font-normal">배송비설정</th>
                                    <th className="w-24 border-r border-gray-400 font-normal">배송비부과방법</th>
                                    <th className="w-16 border-r border-gray-400 font-normal">결제방법</th>
                                    <th className="w-24 border-r border-gray-400 font-normal">지역별추가배송비</th>
                                    <th className="w-20 font-normal">등록일</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                {MOCK_DATA.map((item) => (
                                    <tr key={item.id} className="h-10 border-b border-gray-300 hover:bg-gray-50">
                                        <td className="border-r border-gray-300">
                                            <div className="flex justify-center items-center h-full">
                                                <input 
                                                    type="radio" 
                                                    name="selected_shipping"
                                                    className="radio radio-xs cursor-pointer"
                                                    checked={selectedId === item.id}
                                                    onChange={() => setSelectedId(item.id)}
                                                />
                                            </div>
                                        </td>
                                        <td className="border-r border-gray-300">{item.id}</td>
                                        <td className="border-r border-gray-300 text-left px-2">{item.name}</td>
                                        <td className="border-r border-gray-300">{item.supplierType}</td>
                                        <td className="border-r border-gray-300">{item.method}</td>
                                        <td className="border-r border-gray-300">{item.type}</td>
                                        <td className="border-r border-gray-300">
                                            {item.setting === "상세보기" ? (
                                                <button 
                                                    onClick={() => setDetailPopupState({
                                                        isOpen: true,
                                                        data: {
                                                            type: item.type,
                                                            taxRate: "과세 10.0%",
                                                            conditions: [
                                                                { id: 1, condition: "0 ~ 50,000원", fee: "2,500원" },
                                                                { id: 2, condition: "50,000원 이상", fee: "0원" }
                                                            ]
                                                        }
                                                    })}
                                                    className="px-2 py-0.5 bg-[#666666] text-white text-[11px] rounded-sm hover:bg-[#444444]"
                                                >
                                                    상세보기
                                                </button>
                                            ) : (
                                                item.setting
                                            )}
                                        </td>
                                        <td className="border-r border-gray-300">{item.chargeMethod}</td>
                                        <td className="border-r border-gray-300">{item.paymentMethod}</td>
                                        <td className="border-r border-gray-300">{item.areaExtraFee}</td>
                                        <td>{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 mb-2">
                        <button className="w-8 h-8 bg-[#666666] text-white text-sm flex items-center justify-center hover:bg-[#555555]">1</button>
                    </div>
                    
                    {/* Confirmation Button */}
                    <div className="flex justify-center mt-4">
                         <button 
                            className="bg-[#666666] text-white text-base font-medium py-2 px-10 hover:bg-[#555555]"
                            onClick={handleConfirm}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>

            <ShippingFeeDetailPopup 
                isOpen={detailPopupState.isOpen}
                onClose={() => setDetailPopupState(prev => ({ ...prev, isOpen: false }))}
                data={detailPopupState.data}
            />
        </div>
    );
}
