"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface MemberGrade {
    id: number;
    no: number;
    name: string;
    date: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selectedGrades: MemberGrade[]) => void;
}

const DUMMY_GRADES: MemberGrade[] = [
    { id: 1, no: 1, name: '일반회원', date: '2025-11-25' },
    { id: 2, no: 2, name: '우수회원', date: '2025-10-25' },
];

export default function MemberGradeSelectPopup({ isOpen, onClose, onConfirm }: Props) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    if (!isOpen) return null;

    const toggleSelection = (id: number) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedIds.length === DUMMY_GRADES.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(DUMMY_GRADES.map(l => l.id));
        }
    };

    const handleConfirm = () => {
        const selected = DUMMY_GRADES.filter(l => selectedIds.includes(l.id));
        onConfirm(selected);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-sm w-[600px] shadow-lg max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-900">
                    <h2 className="text-xl font-medium text-gray-800">회원 등급 선택</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={28} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 bg-white">
                    {/* Search */}
                    <div className="border border-gray-300 py-3 px-4 flex gap-2 items-center mb-6">
                        <label className="text-sm font-medium text-gray-700 w-24 pl-2">회원등급명</label>
                        <input type="text" className="flex-1 input input-sm h-8 border border-gray-300 rounded-sm bg-white px-2 focus:outline-none" />
                        <button className="px-6 py-1.5 bg-[#666] text-white text-sm rounded-sm hover:bg-[#555]">
                            검색
                        </button>
                    </div>

                    {/* Table */}
                    <div className="border-t border-gray-400">
                        <table className="w-full text-sm text-center">
                            <thead className="bg-[#bfbfbf] text-white h-10">
                                <tr>
                                    <th className="w-12 border-r border-[#afafaf] font-normal">
                                        <div className="flex items-center justify-center h-full">
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 rounded-sm border-white bg-white checked:bg-white checked:text-gray-500 accent-gray-500"
                                                checked={selectedIds.length === DUMMY_GRADES.length && DUMMY_GRADES.length > 0} 
                                                onChange={toggleAll}
                                            />
                                        </div>
                                    </th>
                                    <th className="w-16 border-r border-[#afafaf] font-normal">번호</th>
                                    <th className="border-r border-[#afafaf] font-normal">회원등급명</th>
                                    <th className="w-32 font-normal">등록일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DUMMY_GRADES.map((grade) => (
                                    <tr key={grade.id} className="border-b border-gray-200 hover:bg-gray-50 h-12">
                                        <td className="border-r border-gray-200">
                                            <div className="flex items-center justify-center">
                                                <input 
                                                    type="checkbox" 
                                                    className="w-4 h-4 rounded-sm border-gray-400"
                                                    checked={selectedIds.includes(grade.id)}
                                                    onChange={() => toggleSelection(grade.id)}
                                                />
                                            </div>
                                        </td>
                                        <td className="border-r border-gray-200 text-gray-600 font-sans">{grade.no}</td>
                                        <td className="border-r border-gray-200 text-left px-4 text-gray-800">{grade.name}</td>
                                        <td className="text-gray-600 font-sans">{grade.date}</td>
                                    </tr>
                                ))}
                                {DUMMY_GRADES.length === 0 && (
                                     <tr>
                                         <td colSpan={4} className="py-8 text-gray-500">검색된 회원등급이 없습니다.</td>
                                     </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6">
                        <button className="w-8 h-8 bg-[#666] text-white text-sm font-bold rounded-sm">1</button>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-center mt-8">
                         <button 
                            onClick={handleConfirm}
                            className="px-10 py-2.5 bg-[#666] text-white font-medium rounded-sm hover:bg-[#555]"
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
