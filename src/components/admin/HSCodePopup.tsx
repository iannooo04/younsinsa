"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface HSCode {
    code: string;
    koName: string;
    enName: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (code: HSCode | null) => void;
    country: string;
}

export default function HSCodePopup({ isOpen, onClose, onConfirm, country }: Props) {
    const [selectedCode, setSelectedCode] = useState<HSCode | null>(null);

    // Placeholder for actual data or search functionality
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchResults, setSearchResults] = useState<HSCode[]>([]);

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(selectedCode);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-sm w-[800px] shadow-lg max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">{country} HS코드 선택</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 bg-white space-y-4">
                    {/* Notice */}
                    <div className="text-xs text-gray-800 space-y-1">
                        <div className="flex items-start gap-1">
                             <div className="w-3.5 h-3.5 bg-[#ff4d4f] flex items-center justify-center rounded-[2px] mt-0.5 shrink-0">
                                <span className="text-white text-[10px] font-bold">!</span>
                             </div>
                             <span className="text-[#ff4d4f] font-medium">HS코드란, 세계무역기구(WTO) 및 세계관세기구(WCO)가 무역통계 및 관세분류의 목적상 수출입 상품을 숫자 코드로 분류화 한 것으로, 수입 시 세금부과와 수출품의 통제 및 통계를 위한 중요한 분류법입니다.</span>
                        </div>
                        <p className="text-gray-500 pl-5">해외 배송 시, 통관에서 반드시 필요한 항목입니다. (원산지, 영문상품명, HS코드 필수 입력)</p>
                        <p className="text-gray-500 pl-5">정확한 관세 계산을 위하여 대한민국을 제외한 국가의 HS 코드는 해당국가의 세분류 번호까지 입력되어있는 코드(8자리 ~ 10자리)만 선택 가능합니다.</p>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-[#f9f9f9] border border-gray-200 p-4 flex items-center gap-4 mt-2">
                        <div className="w-24 font-bold text-sm text-gray-700">HS코드 검색</div>
                        <div className="flex-1 flex items-center gap-2">
                            <select className="select select-bordered select-sm h-8 rounded-sm w-40 bg-white border-gray-300">
                                <option>전체</option>
                            </select>
                            <input type="text" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm bg-white" />
                        </div>
                        <button className="px-4 py-1.5 bg-[#666] text-white text-sm font-bold rounded-sm hover:bg-[#555]">
                            검색
                        </button>
                    </div>

                    {/* Table Area */}
                    <div className="border-t border-gray-200 mt-4">
                        <table className="w-full text-sm text-center">
                            <thead className="bg-[#f9f9f9] h-10 border-b border-gray-200">
                                <tr>
                                    <th className="w-16 font-normal text-gray-700">선택</th>
                                    <th className="w-32 font-normal text-gray-700">HS코드</th>
                                    <th className="w-40 font-normal text-gray-700">한글품명</th>
                                    <th className="font-normal text-gray-700">영문품명</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State / Search Results */}
                                {searchResults.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-gray-500 text-center border-b border-gray-200">
                                            검색을 이용해 주세요.
                                        </td>
                                    </tr>
                                ) : (
                                    searchResults.map((code) => (
                                        <tr key={code.code} className="border-b border-gray-200 h-10 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedCode(code)}>
                                            <td>
                                                <input 
                                                    type="radio" 
                                                    name="hscode_select" 
                                                    checked={selectedCode?.code === code.code}
                                                    onChange={() => setSelectedCode(code)}
                                                    className="radio radio-xs"
                                                />
                                            </td>
                                            <td>{code.code}</td>
                                            <td>{code.koName}</td>
                                            <td>{code.enName}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-center mt-6 pt-4 border-t border-gray-200 border-none">
                         <button 
                            onClick={handleConfirm}
                            className="px-8 py-2 bg-[#666] text-white font-bold rounded-sm hover:bg-[#555]"
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
