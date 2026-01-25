"use client";

import { X } from "lucide-react";

interface FeeStep {
    id: number;
    condition: string;
    fee: string;
}

interface DetailData {
    type: string;
    taxRate: string;
    steps: FeeStep[];
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    data: DetailData | null;
}

export default function ShippingFeeDetailPopup({ isOpen, onClose, data }: Props) {
    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center font-sans px-4">
            <div className="bg-white w-full max-w-[600px] shadow-2xl border border-gray-300">
                {/* Header */}
                <div className="relative p-6 pb-2">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl text-gray-800 tracking-tight font-medium">배송비 설정 상세보기</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X size={32} strokeWidth={1} />
                        </button>
                    </div>
                    <div className="h-0.5 bg-gray-500 w-full mb-1"></div>
                </div>

                {/* Body */}
                <div className="px-6 pb-8">
                    {/* Info Area */}
                    <div className="border border-gray-200 mb-6 flex flex-col">
                        <div className="flex border-b border-gray-200">
                            <div className="w-[120px] bg-gray-50 flex items-center pl-4 py-3 text-sm font-normal text-gray-700 border-r border-gray-200">
                                배송비 유형
                            </div>
                            <div className="flex-1 p-3 text-sm text-gray-800">
                                {data.type}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[120px] bg-gray-50 flex items-center pl-4 py-3 text-sm font-normal text-gray-700 border-r border-gray-200">
                                부가세율
                            </div>
                            <div className="flex-1 p-3 text-sm text-gray-800">
                                {data.taxRate}
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-gray-300">
                        <table className="w-full text-center text-[13px] border-collapse">
                            <thead className="bg-[#B0B0B0] text-white">
                                <tr className="h-9">
                                    <th className="w-20 border-r border-gray-400 font-normal">번호</th>
                                    <th className="border-r border-gray-400 font-normal px-2">조건</th>
                                    <th className="w-32 font-normal">배송비</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                {data.steps.map((step, index) => (
                                    <tr key={index} className="h-10 border-b border-gray-300 last:border-b-0 hover:bg-gray-50">
                                        <td className="border-r border-gray-300">{step.id}</td>
                                        <td className="border-r border-gray-300 text-center px-3">{step.condition}</td>
                                        <td>{step.fee}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
