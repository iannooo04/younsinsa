"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

import { getSuppliersSimpleAction } from "@/actions/supplier-actions";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selected: { id: string, name: string }[] | { id: string, name: string } | null) => void;
    multiSelect?: boolean;
}

export default function SupplierPopup({ isOpen, onClose, onConfirm, multiSelect = false }: Props) {
    const [suppliers, setSuppliers] = useState<{ id: string; name: string; createdAt: Date | string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen) {
            fetchSuppliers();
            setSelectedIds([]);
        }
    }, [isOpen]);

    const fetchSuppliers = async () => {
        setLoading(true);
        try {
            const res = await getSuppliersSimpleAction();
            if (res.success) {
                setSuppliers(res.items);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        // Simple client-side filtering handled by filteredSuppliers
    };

    const filteredSuppliers = suppliers.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(filteredSuppliers.map(s => s.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelect = (id: string, checked: boolean) => {
        if (multiSelect) {
            if (checked) {
                setSelectedIds(prev => [...prev, id]);
            } else {
                setSelectedIds(prev => prev.filter(i => i !== id));
            }
        } else {
            setSelectedIds(checked ? [id] : []);
        }
    };

    const handleConfirm = () => {
        const result = suppliers
            .filter(s => selectedIds.includes(s.id))
            .map(s => ({ id: s.id, name: s.name }));

        if (multiSelect) {
            onConfirm(result);
        } else {
            onConfirm(result[0] || null);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center font-sans">
            <div className="bg-white w-[800px] shadow-2xl border border-gray-300">
                {/* Header */}
                <div className="relative p-6 pb-2">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl text-gray-800 tracking-tight">공급사 선택</h2>
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
                            공급사명
                        </div>
                        <div className="flex-1 p-2 flex gap-1 items-center">
                            <input 
                                type="text" 
                                className="w-64 h-8 border border-gray-300 px-2 text-sm focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button 
                                className="bg-[#666666] text-white text-sm px-5 h-8 hover:bg-[#555555]"
                                onClick={handleSearch}
                            >
                                검색
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-gray-300 border-b-0 h-[300px] overflow-y-auto font-sans">
                        <table className="w-full text-center text-sm border-collapse">
                            <thead className="bg-[#B0B0B0] text-white sticky top-0 z-10">
                                <tr className="h-9">
                                    <th className="w-16 border-r border-gray-400 font-normal">
                                        <div className="flex justify-center items-center h-full">
                                            {multiSelect ? (
                                                <input 
                                                    type="checkbox" 
                                                    className="checkbox checkbox-xs border-white rounded-none"
                                                    checked={filteredSuppliers.length > 0 && selectedIds.length === filteredSuppliers.length}
                                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                                />
                                            ) : (
                                                "선택"
                                            )}
                                        </div>
                                    </th>
                                    <th className="w-16 border-r border-gray-400 font-normal">번호</th>
                                    <th className="border-r border-gray-400 font-normal px-2">공급사명</th>
                                    <th className="w-24 border-r border-gray-400 font-normal">상태</th>
                                    <th className="w-28 font-normal">등록일</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                {loading ? (
                                    <tr><td colSpan={5} className="py-10 border-b border-gray-300">Loading...</td></tr>
                                ) : filteredSuppliers.length === 0 ? (
                                    <tr><td colSpan={5} className="py-10 border-b border-gray-300 text-gray-400">검색 결과가 없습니다.</td></tr>
                                ) : (
                                    filteredSuppliers.map((supplier, index) => (
                                        <tr key={supplier.id} className="h-10 border-b border-gray-300 hover:bg-gray-50 text-[13px]">
                                            <td className="border-r border-gray-300">
                                                <div className="flex justify-center items-center h-full">
                                                    <input 
                                                        type={multiSelect ? "checkbox" : "radio"}
                                                        name={multiSelect ? undefined : "selected_supplier"}
                                                        className={`${multiSelect ? 'checkbox' : 'radio'} radio-xs cursor-pointer`}
                                                        checked={selectedIds.includes(supplier.id)}
                                                        onChange={(e) => handleSelect(supplier.id, e.target.checked)}
                                                    />
                                                </div>
                                            </td>
                                            <td className="border-r border-gray-300">{index + 1}</td>
                                            <td className="border-r border-gray-300 text-left px-3">{supplier.name}</td>
                                            <td className="border-r border-gray-300">운영</td>
                                            <td>{new Date(supplier.createdAt).toISOString().split('T')[0]}</td>
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
