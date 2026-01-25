"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface MemberLevel {
    id: number;
    no: number;
    name: string;
    date: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selectedLevels: MemberLevel[]) => void;
}

// Dummy data or empty initial data
const DUMMY_LEVELS: MemberLevel[] = [
    { id: 1, no: 1, name: '일반회원', date: '2025-11-25' },
];

export default function MemberLevelPopup({ isOpen, onClose, onConfirm }: Props) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    if (!isOpen) return null;

    const toggleSelection = (id: number) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedIds.length === DUMMY_LEVELS.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(DUMMY_LEVELS.map(l => l.id));
        }
    };

    const handleConfirm = () => {
        const selected = DUMMY_LEVELS.filter(l => selectedIds.includes(l.id));
        onConfirm(selected);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-sm w-[600px] shadow-lg max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">회원 등급</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 bg-white">
                    {/* Search */}
                    <div className="border border-gray-200 bg-[#f9f9f9] p-4 flex gap-2 items-center mb-4">
                        <label className="text-sm font-bold text-gray-700 w-20">회원등급명</label>
                        <input type="text" className="flex-1 input input-sm h-8 border-gray-300 rounded-sm bg-white" />
                        <button className="px-6 py-1 bg-[#666] text-white text-sm font-bold rounded-sm hover:bg-[#555]">
                            검색
                        </button>
                    </div>

                    {/* Table */}
                    <div className="border-t border-gray-400">
                        <table className="w-full text-sm text-center">
                            <thead className="bg-[#bfbfbf] text-white h-10">
                                <tr>
                                    <th className="w-12 border-r border-[#afafaf] font-normal">
                                        <input 
                                            type="checkbox" 
                                            className="checkbox checkbox-xs rounded-sm border-white"
                                            checked={selectedIds.length === DUMMY_LEVELS.length && DUMMY_LEVELS.length > 0} 
                                            onChange={toggleAll}
                                        />
                                    </th>
                                    <th className="w-16 border-r border-[#afafaf] font-normal">번호</th>
                                    <th className="border-r border-[#afafaf] font-normal">회원등급명</th>
                                    <th className="w-32 font-normal">등록일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DUMMY_LEVELS.map((level) => (
                                    <tr key={level.id} className="border-b border-gray-200 hover:bg-gray-50 h-12">
                                        <td className="border-r border-gray-200">
                                            <input 
                                                type="checkbox" 
                                                className="checkbox checkbox-xs rounded-sm border-gray-400"
                                                checked={selectedIds.includes(level.id)}
                                                onChange={() => toggleSelection(level.id)}
                                            />
                                        </td>
                                        <td className="border-r border-gray-200 text-gray-600">{level.no}</td>
                                        <td className="border-r border-gray-200 text-left px-4 text-gray-800">{level.name}</td>
                                        <td className="text-gray-600">{level.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6">
                        <button className="w-8 h-8 bg-[#666] text-white text-sm font-bold rounded-sm">1</button>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-center mt-6">
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
