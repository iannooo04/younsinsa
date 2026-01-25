"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface GuideOption {
    id: number;
    title: string;
    supplierShort: string;
    date: string;
    content: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selected: GuideOption | null) => void;
    popupTitle: string; // e.g., "배송안내 선택", "AS안내 선택"
    type: 'shipping' | 'as' | 'refund' | 'exchange';
}

const MOCK_DATA: Record<string, GuideOption[]> = {
    shipping: [
        { id: 1, title: "배송안내 - 기본", supplierShort: "니아인터내셔널", date: "2025-11-25", content: "기본 배송 안내 내용입니다..." }
    ],
    as: [
        { id: 1, title: "AS안내 - 기본", supplierShort: "니아인터내셔널", date: "2025-11-25", content: "기본 AS 안내 내용입니다..." }
    ],
    refund: [
        { id: 1, title: "환불안내 - 기본", supplierShort: "니아인터내셔널", date: "2025-11-25", content: "기본 환불 안내 내용입니다..." }
    ],
    exchange: [
        { id: 1, title: "교환안내 - 기본", supplierShort: "니아인터내셔널", date: "2025-11-25", content: "기본 교환 안내 내용입니다..." }
    ]
};

export default function GuidePopup({ isOpen, onClose, onConfirm, popupTitle, type }: Props) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const data = MOCK_DATA[type] || [];

    if (!isOpen) return null;

    const handleConfirm = () => {
        const selected = data.find(item => item.id === selectedId);
        onConfirm(selected || null);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center font-sans">
            <div className="bg-white w-[800px] shadow-2xl border border-gray-300">
                {/* Header */}
                <div className="relative p-6 pb-2">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl text-gray-800 tracking-tight">{popupTitle}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X size={32} strokeWidth={1} />
                        </button>
                    </div>
                    <div className="h-0.5 bg-gray-500 w-full mb-1"></div>
                </div>

                {/* Body */}
                <div className="px-6 pb-6">
                    {/* Search Area */}
                    <div className="border border-gray-200 mb-5 flex">
                        <div className="w-[120px] bg-gray-50 flex items-center pl-4 py-3 text-sm font-normal text-gray-700 border-r border-gray-200">
                            이용안내 제목
                        </div>
                        <div className="flex-1 p-2 flex gap-1 items-center bg-white">
                            <input 
                                type="text" 
                                className="flex-1 h-8 border border-gray-300 px-2 text-sm focus:outline-none"
                            />
                            <button className="bg-[#666666] text-white text-sm px-6 h-8 hover:bg-[#555555]">
                                검색
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-gray-300 border-b-0 h-[200px] overflow-y-auto">
                        <table className="w-full text-center text-sm border-collapse">
                            <thead className="bg-[#B0B0B0] text-white sticky top-0 z-10">
                                <tr className="h-9">
                                    <th className="w-16 border-r border-gray-400 font-normal">선택</th>
                                    <th className="w-16 border-r border-gray-400 font-normal">번호</th>
                                    <th className="border-r border-gray-400 font-normal px-2">이용안내 제목</th>
                                    <th className="w-40 border-r border-gray-400 font-normal">구분</th>
                                    <th className="w-28 font-normal">등록일</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                {data.length === 0 ? (
                                    <tr><td colSpan={5} className="py-10 border-b border-gray-300 text-gray-400">등록된 정보가 없습니다.</td></tr>
                                ) : (
                                    data.map((item, index) => (
                                        <tr key={item.id} className="h-10 border-b border-gray-300 hover:bg-gray-50">
                                            <td className="border-r border-gray-300">
                                                <div className="flex justify-center items-center h-full">
                                                    <input 
                                                        type="radio" 
                                                        name={`selected_guide_${type}`}
                                                        className="radio radio-xs cursor-pointer"
                                                        checked={selectedId === item.id}
                                                        onChange={() => setSelectedId(item.id)}
                                                    />
                                                </div>
                                            </td>
                                            <td className="border-r border-gray-300">{index + 1}</td>
                                            <td className="border-r border-gray-300 text-left px-3">{item.title}</td>
                                            <td className="border-r border-gray-300">{item.supplierShort}</td>
                                            <td>{item.date}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-5 mb-2">
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
        </div>
    );
}
