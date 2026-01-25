"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Exhibition {
    id: string;
    name: string;
    displayType: string;
    range: string;
    status: string;
    regDate: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selected: Exhibition | null) => void;
}

export default function ExhibitionPopup({ isOpen, onClose, onConfirm }: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
    const [loading, setLoading] = useState(false);
    
    // Search Filters
    const [name, setName] = useState("");
    const [displayType, setDisplayType] = useState("all");
    const [range, setRange] = useState("all");
    const [status, setStatus] = useState("all");
    
    const [selectedId, setSelectedId] = useState<string>("");

    useEffect(() => {
        if (isOpen) {
            setSelectedId("");
        }
    }, [isOpen]);

    const handleSearch = () => {
        // Mocking search for now
        setLoading(true);
        setTimeout(() => setLoading(false), 500);
    };

    const handleConfirm = () => {
        const selected = exhibitions.find(e => e.id === selectedId) || null;
        onConfirm(selected);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center font-sans">
            <div className="bg-white w-[900px] shadow-2xl border border-gray-300">
                {/* Header */}
                <div className="relative p-6 pb-2">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl text-gray-800 tracking-tight font-medium">기획전 선택</h2>
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
                        <div className="flex-1">
                            {/* Row: Name */}
                            <div className="flex border-b border-gray-200">
                                <div className="w-[140px] bg-gray-50 flex items-center pl-4 py-3 text-sm font-bold text-gray-700 border-r border-gray-200">
                                    기획전명
                                </div>
                                <div className="flex-1 p-2 flex items-center">
                                    <input 
                                        type="text" 
                                        className="w-full h-8 border border-gray-300 px-2 text-sm focus:outline-none"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Row: Display Type */}
                            <div className="flex border-b border-gray-200">
                                <div className="w-[140px] bg-gray-50 flex items-center pl-4 py-3 text-sm font-bold text-gray-700 border-r border-gray-200">
                                    진열유형
                                </div>
                                <div className="flex-1 p-2 flex items-center">
                                    <RadioGroup value={displayType} onValueChange={setDisplayType} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="disp-all" />
                                            <Label htmlFor="disp-all" className="text-sm">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="general" id="disp-gen" />
                                            <Label htmlFor="disp-gen" className="text-sm">일반형</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="group" id="disp-grp" />
                                            <Label htmlFor="disp-grp" className="text-sm">그룹형</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            {/* Row: Display Range */}
                            <div className="flex border-b border-gray-200">
                                <div className="w-[140px] bg-gray-50 flex items-center pl-4 py-3 text-sm font-bold text-gray-700 border-r border-gray-200">
                                    노출범위
                                </div>
                                <div className="flex-1 p-2 flex items-center">
                                    <RadioGroup value={range} onValueChange={setRange} className="flex gap-4 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="range-all" />
                                            <Label htmlFor="range-all" className="text-sm">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="pc_mobile" id="range-pc-mobile" />
                                            <Label htmlFor="range-pc-mobile" className="text-sm">PC+모바일</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="pc" id="range-pc" />
                                            <Label htmlFor="range-pc" className="text-sm">PC</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="mobile" id="range-mobile" />
                                            <Label htmlFor="range-mobile" className="text-sm">모바일</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            {/* Row: Status */}
                            <div className="flex">
                                <div className="w-[140px] bg-gray-50 flex items-center pl-4 py-3 text-sm font-bold text-gray-700 border-r border-gray-200">
                                    진행상태
                                </div>
                                <div className="flex-1 p-2 flex items-center">
                                    <RadioGroup value={status} onValueChange={setStatus} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="status-all" />
                                            <Label htmlFor="status-all" className="text-sm">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="ready" id="status-ready" />
                                            <Label htmlFor="status-ready" className="text-sm">대기</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="ongoing" id="status-ongoing" />
                                            <Label htmlFor="status-ongoing" className="text-sm">진행중</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="end" id="status-end" />
                                            <Label htmlFor="status-end" className="text-sm">종료</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                        <div className="w-[80px] border-l border-gray-200 flex items-center justify-center p-2">
                            <button 
                                className="bg-[#666666] text-white text-sm w-full h-[80%] hover:bg-[#555555]"
                                onClick={handleSearch}
                            >
                                검색
                            </button>
                        </div>
                    </div>

                    <div className="text-xs text-gray-600 mb-2">
                        검색 <span className="text-red-500 font-bold">0</span>개 / 전체 <span className="text-red-500 font-bold">0</span>개
                    </div>

                    {/* Table */}
                    <div className="border border-gray-300 border-b-0 h-[200px] overflow-y-auto">
                        <table className="w-full text-center text-xs border-collapse">
                            <thead className="bg-[#B0B0B0] text-white sticky top-0 z-10">
                                <tr className="h-9">
                                    <th className="w-12 border-r border-gray-400 font-normal">선택</th>
                                    <th className="w-12 border-r border-gray-400 font-normal">번호</th>
                                    <th className="border-r border-gray-400 font-normal px-2">기획전명</th>
                                    <th className="w-24 border-r border-gray-400 font-normal">진열유형</th>
                                    <th className="w-24 border-r border-gray-400 font-normal">노출범위</th>
                                    <th className="w-24 border-r border-gray-400 font-normal">진행상태</th>
                                    <th className="w-28 font-normal">등록일</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                {loading ? (
                                    <tr><td colSpan={7} className="py-10 border-b border-gray-300">Loading...</td></tr>
                                ) : exhibitions.length === 0 ? (
                                    <tr><td colSpan={7} className="py-10 border-b border-gray-300 text-gray-400">검색 할 기획전이 없습니다.</td></tr>
                                ) : (
                                    exhibitions.map((ex, index) => (
                                        <tr key={ex.id} className="h-10 border-b border-gray-300 hover:bg-gray-50">
                                            <td className="border-r border-gray-300">
                                                <input 
                                                    type="radio"
                                                    name="selected_exhibition"
                                                    className="radio radio-xs cursor-pointer"
                                                    checked={selectedId === ex.id}
                                                    onChange={() => setSelectedId(ex.id)}
                                                />
                                            </td>
                                            <td className="border-r border-gray-300">{index + 1}</td>
                                            <td className="border-r border-gray-300 text-left px-3">{ex.name}</td>
                                            <td className="border-r border-gray-300">{ex.displayType}</td>
                                            <td className="border-r border-gray-300">{ex.range}</td>
                                            <td className="border-r border-gray-300">{ex.status}</td>
                                            <td>{ex.regDate}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Confirmation Button */}
                    <div className="flex justify-center mt-6">
                         <button 
                            className="bg-[#666666] text-white text-base font-normal py-2 px-10 hover:bg-[#555555]"
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
