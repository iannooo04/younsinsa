"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

import { getSuppliersSimpleAction } from "@/actions/supplier-actions";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selectedSupplier: { id: string, name: string } | null) => void;
}

export default function SupplierPopup({ isOpen, onClose, onConfirm }: Props) {
    const [suppliers, setSuppliers] = useState<{ id: string; name: string; createdAt: Date | string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchSuppliers();
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

    const handleConfirm = () => {
        if (selectedId) {
            const selected = suppliers.find(s => s.id === selectedId);
            onConfirm(selected ? { id: selected.id, name: selected.name } : null);
        } else {
            onConfirm(null);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
            <div className="bg-white w-[600px] shadow-xl border border-gray-300">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300">
                    <h2 className="font-bold text-lg text-gray-800">공급사 선택</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 bg-white">
                    {/* Search Area */}
                    <div className="bg-gray-50 border border-gray-200 p-3 mb-4 flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-700 w-20 pl-2">공급사명</span>
                        <input 
                            type="text" 
                            className="input input-bordered input-sm rounded-sm flex-1 bg-white" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-sm btn-neutral rounded-sm px-6 font-normal" onClick={handleSearch}>검색</button>
                    </div>

                    {/* Table */}
                    <div className="border border-gray-300">
                        <table className="table table-sm w-full text-center">
                            <thead className="bg-[#b3b3b3] text-white font-normal text-sm">
                                <tr>
                                    <th className="w-10 border-r border-gray-300 font-normal">
                                        <input type="checkbox" className="checkbox checkbox-xs rounded-none border-gray-400" disabled />
                                    </th>
                                    <th className="w-16 border-r border-gray-300 font-normal">번호</th>
                                    <th className="border-r border-gray-300 font-normal">공급사명</th>
                                    <th className="w-20 border-r border-gray-300 font-normal">상태</th>
                                    <th className="w-28 font-normal">등록일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={5} className="py-8">Loading...</td></tr>
                                ) : filteredSuppliers.length === 0 ? (
                                    <tr><td colSpan={5} className="py-8 text-gray-400">검색 결과가 없습니다.</td></tr>
                                ) : (
                                    filteredSuppliers.map((supplier, index) => (
                                        <tr key={supplier.id} className="border-b border-gray-200 hover:bg-gray-50 text-xs text-gray-600">
                                            <td className="border-r border-gray-200">
                                                <input 
                                                    type="checkbox" 
                                                    className="checkbox checkbox-xs rounded-sm border-gray-300" 
                                                    checked={selectedId === supplier.id}
                                                    onChange={() => setSelectedId(selectedId === supplier.id ? null : supplier.id)}
                                                />
                                            </td>
                                            <td className="border-r border-gray-200">{index + 1}</td>
                                            <td className="border-r border-gray-200 text-left px-2">{supplier.name}</td>
                                            <td className="border-r border-gray-200">운영</td>
                                            <td>{new Date(supplier.createdAt).toISOString().split('T')[0]}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        <button className="btn btn-sm btn-square bg-gray-600 text-white border-none rounded-sm min-h-0 h-7 w-7 text-xs">1</button>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 flex justify-center">
                    <button 
                        className="btn btn-neutral rounded-sm px-8 font-bold text-sm min-h-0 h-9"
                        onClick={handleConfirm}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
