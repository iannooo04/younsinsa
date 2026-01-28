"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function DeliveryCompanyCodePopup({ isOpen, onClose }: Props) {
    if (!isOpen) return null;

    const companies = [
        { id: 1, code: "12", name: "우체국택배" },
        { id: 2, code: "11", name: "우체국EMS" },
        { id: 3, code: "20", name: "DHL" },
        { id: 4, code: "21", name: "FEDEX" },
        { id: 5, code: "30", name: "UPS" },
        { id: 6, code: "37", name: "기타 택배" },
        { id: 7, code: "40", name: "등기, 소포" },
        { id: 8, code: "41", name: "화물배송" },
        { id: 9, code: "42", name: "방문수령" },
        { id: 10, code: "43", name: "퀵배송" },
        { id: 11, code: "44", name: "기타" },
    ];

    return (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
            <div className="bg-white w-[600px] shadow-xl border border-gray-300 relative">
                {/* Header */}
                <div className="p-4 border-b border-gray-400 flex justify-between items-center">
                    <h2 className="font-bold text-lg text-gray-900">배송업체번호 보기</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4">
                     <div className="border-t border-gray-400 border-b border-gray-200">
                        <table className="w-full text-sm text-center">
                            <thead className="bg-[#BDBDBD] text-white font-normal h-8">
                                <tr>
                                    <th className="w-20 font-normal border-r border-[#CDCDCD]">번호</th>
                                    <th className="w-32 font-normal border-r border-[#CDCDCD]">배송업체번호</th>
                                    <th className="font-normal">배송업체명</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 bg-white">
                                {companies.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-200 h-10">
                                        <td className="border-r border-[#CDCDCD]">{item.id}</td>
                                        <td className="border-r border-[#CDCDCD]">{item.code}</td>
                                        <td>{item.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 flex justify-center border-t border-gray-200">
                    <Button 
                        onClick={onClose}
                        variant="outline"
                        className="w-24 h-9 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 text-sm rounded-sm"
                    >
                        닫기
                    </Button>
                </div>
            </div>
        </div>
    );
}
