"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getCategoriesSimpleAction } from "@/actions/product-actions";

interface Category {
    id: string;
    no?: number;
    name: string;
    date?: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (category: Category | null) => void;
}

export default function CategoryPopup({ isOpen, onClose, onConfirm }: Props) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await getCategoriesSimpleAction();
            // Map simple category (id, name) to our Category interface
            const formatted = res.map((cat, idx) => ({
                id: cat.id,
                no: idx + 1,
                name: cat.name,
                date: "2025-12-05" // Mock date as in image
            }));
            setCategories(formatted);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCategories = categories.filter(c => 
        c.name.toLowerCase().includes(searchName.toLowerCase())
    );

    const handleConfirm = () => {
        const cat = categories.find(c => c.id === selectedId) || null;
        onConfirm(cat);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-sm w-[900px] shadow-lg max-h-[95vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-400">
                    <h2 className="text-xl font-bold text-gray-800">카테고리</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={28} />
                    </button>
                </div>

                <div className="p-6">
                    {/* Search Panel */}
                    <div className="flex border border-gray-200">
                        <div className="flex-1">
                            <div className="flex border-b border-gray-200 h-12 items-center">
                                <div className="w-32 bg-gray-50 h-full flex items-center px-4 font-bold text-gray-700 text-sm">카테고리명</div>
                                <div className="flex-1 px-4">
                                    <input 
                                        type="text" 
                                        value={searchName}
                                        onChange={(e) => setSearchName(e.target.value)}
                                        className="w-full h-8 border border-gray-300 rounded-sm px-2 text-sm focus:outline-none focus:border-gray-500" 
                                    />
                                </div>
                            </div>
                            <div className="flex h-12 items-center">
                                <div className="w-32 bg-gray-50 h-full flex items-center px-4 font-bold text-gray-700 text-sm">카테고리 선택</div>
                                <div className="flex-1 px-4 flex gap-2">
                                    {[1, 2, 3].map(i => (
                                        <select key={i} className="flex-1 h-8 border border-gray-300 rounded-sm px-1 text-sm bg-white focus:outline-none focus:border-gray-500">
                                            <option>=카테고리선택=</option>
                                        </select>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-24 bg-gray-100 flex items-center justify-center border-l border-gray-200">
                            <button className="w-full h-full bg-[#666] text-white text-sm font-bold hover:bg-[#555] transition-colors">
                                검색
                            </button>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="mt-8 border-t border-gray-400 overflow-x-auto min-h-[300px]">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#bfbfbf] text-white text-sm">
                                    <th className="w-12 h-10 border-r border-[#afafaf] font-normal text-center">
                                        <input type="checkbox" className="w-4 h-4 translate-y-[2px]" disabled />
                                    </th>
                                    <th className="w-16 border-r border-[#afafaf] font-normal text-center">번호</th>
                                    <th className="w-24 border-r border-[#afafaf] font-normal text-center">노출상점</th>
                                    <th className="border-r border-[#afafaf] font-normal text-center">카테고리명</th>
                                    <th className="w-40 font-normal text-center">등록일</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {loading ? (
                                    <tr><td colSpan={5} className="py-20 text-gray-400 text-sm">로딩중...</td></tr>
                                ) : filteredCategories.length > 0 ? (
                                    filteredCategories.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-200 text-sm h-10 hover:bg-gray-50">
                                            <td className="border-r border-gray-200">
                                                <div className="flex justify-center">
                                                    <div 
                                                        onClick={() => setSelectedId(item.id)}
                                                        className={`w-4 h-4 rounded-full border border-gray-400 cursor-pointer flex items-center justify-center ${selectedId === item.id ? 'bg-[#666]' : 'bg-white'}`}
                                                    >
                                                        {selectedId === item.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border-r border-gray-200 text-gray-600">{item.no}</td>
                                            <td className="border-r border-gray-200">
                                                <div className="flex justify-center">
                                                    <div className="w-4 h-3 bg-white border border-gray-400 flex items-center justify-center p-0.5 relative overflow-hidden">
                                                       <div className="absolute inset-0 bg-white"></div>
                                                       <div className="w-1.5 h-1.5 rounded-full bg-red-600 z-10"></div>
                                                       <div className="absolute top-0 left-0 w-full h-full">
                                                            <div className="absolute top-0 left-0 w-1 h-3 flex flex-col gap-0.5">
                                                                <div className="h-px w-full bg-black"></div>
                                                                <div className="h-px w-full bg-black"></div>
                                                                <div className="h-px w-full bg-black"></div>
                                                            </div>
                                                       </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border-r border-gray-200 text-left px-4 text-gray-800">{item.name}</td>
                                            <td className="text-gray-600">{item.date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-gray-400 text-sm">
                                            조회된 카테고리가 없습니다.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 gap-2">
                        <button className="w-8 h-8 flex items-center justify-center bg-[#666] text-white text-xs font-bold rounded-sm cursor-default">1</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 text-xs hover:bg-gray-100 rounded-sm">2</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 text-xs hover:bg-gray-100 rounded-sm">3</button>
                    </div>

                    {/* Bottom Action */}
                    <div className="flex justify-center mt-8">
                        <button 
                            onClick={handleConfirm}
                            className="bg-[#666] text-white px-12 py-2 text-sm font-bold rounded-sm hover:bg-[#555] transition-colors"
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
