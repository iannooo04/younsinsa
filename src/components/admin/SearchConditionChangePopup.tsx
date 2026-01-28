"use client";

import { X } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    mode: 'toMulti' | 'toSingle';
}

export default function SearchConditionChangePopup({ isOpen, onClose, onConfirm, mode }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-sm w-[600px] shadow-lg flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-400">
                    <h2 className="text-xl font-bold text-gray-800">확인</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={28} />
                    </button>
                </div>

                <div className="p-10 flex flex-col items-center justify-center min-h-[120px]">
                    <p className="text-gray-800 text-lg">
                        <span className="text-red-500 font-bold">{mode === 'toMulti' ? '다중' : '단일'}</span> 검색조건으로 전환하시겠습니까?
                    </p>
                </div>

                {/* Footer Action */}
                <div className="flex justify-center gap-2 mb-8 px-6">
                     <button 
                        onClick={onClose}
                        className="w-24 h-10 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium rounded-sm"
                    >
                        취소
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="w-24 h-10 bg-[#666] text-white text-sm font-medium rounded-sm hover:bg-[#555] transition-colors"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
