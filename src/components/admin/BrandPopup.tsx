"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getBrandHierarchyAction } from "@/actions/product-actions";
import dayjs from "dayjs";

// Type definitions for the hierarchy returned by getBrandHierarchyAction
interface BrandHierarchy {
    id: string;
    name: string;
    createdAt: Date;
    children?: BrandHierarchy[];
}

interface BrandNode {
    id: string;
    no: number;
    country: string; // 'KR'
    name: string;
    date: string;
    depth: number;
    pathIds: string[]; // [depth1Id, depth2Id?, depth3Id?]
    pathNames: string[]; // ['Parent', 'Child', 'Grandchild']
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (brand: { id: string, name: string } | null) => void;
}

export default function BrandPopup({ isOpen, onClose, onConfirm }: Props) {
    const [allBrands, setAllBrands] = useState<BrandNode[]>([]);
    const [treeData, setTreeData] = useState<BrandHierarchy[]>([]);
    
    // Dropdown States
    const [selectedDepth1, setSelectedDepth1] = useState<string>("");
    const [selectedDepth2, setSelectedDepth2] = useState<string>("");
    const [selectedDepth3, setSelectedDepth3] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchBrands();
        }
    }, [isOpen]);

    const fetchBrands = async () => {
        setLoading(true);
        try {
            const rawTree = await getBrandHierarchyAction();
            setTreeData(rawTree as BrandHierarchy[]);

            const flattened: BrandNode[] = [];
            let counter = 1;

            // Helper function to flatten the tree for the table view
            const flattenNode = (node: BrandHierarchy, depth: number, accPathIds: string[], accPathNames: string[]) => {
                const currentPathIds = [...accPathIds, node.id];
                const currentPathNames = [...accPathNames, node.name];

                flattened.push({
                    id: node.id,
                    no: counter++,
                    country: "KR",
                    name: currentPathNames.join(' > '),
                    date: dayjs(node.createdAt).format("YYYY-MM-DD"),
                    depth,
                    pathIds: currentPathIds,
                    pathNames: currentPathNames
                });

                if (node.children && node.children.length > 0) {
                    node.children.forEach(child => flattenNode(child, depth + 1, currentPathIds, currentPathNames));
                }
            };

            rawTree.forEach((rootNode) => flattenNode(rootNode as BrandHierarchy, 1, [], []));

            // Reverse to match the mock descending order visually, if desired
            setAllBrands(flattened.reverse().map((b, idx) => ({ ...b, no: flattened.length - idx })));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        const brand = allBrands.find(b => b.id === selectedId) || null;
        onConfirm(brand ? { id: brand.id, name: brand.name } : null);
        onClose();
    };

    // Filter logic
    const filteredBrands = allBrands.filter(b => {
        // 1. Text Search Filter
        const matchesName = b.name.toLowerCase().includes(searchName.toLowerCase());
        
        // 2. Dropdown Filter
        let matchesDropdown = true;
        if (selectedDepth3) {
            matchesDropdown = b.id === selectedDepth3;
        } else if (selectedDepth2) {
            matchesDropdown = b.pathIds[1] === selectedDepth2 || b.id === selectedDepth2;
        } else if (selectedDepth1) {
            matchesDropdown = b.pathIds[0] === selectedDepth1 || b.id === selectedDepth1;
        }

        return matchesName && matchesDropdown;
    });

    // Derived states for dropdown options
    const depth1Options = treeData;
    const depth2Options = depth1Options.find(b => b.id === selectedDepth1)?.children || [];
    const depth3Options = depth2Options.find(b => b.id === selectedDepth2)?.children || [];

    const handleDepth1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepth1(e.target.value);
        setSelectedDepth2("");
        setSelectedDepth3("");
    };

    const handleDepth2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepth2(e.target.value);
        setSelectedDepth3("");
    };

    const handleDepth3Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepth3(e.target.value);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-sm w-[900px] shadow-lg max-h-[95vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-400">
                    <h2 className="text-xl font-bold text-gray-800">브랜드 선택</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={28} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    {/* Search Panel */}
                    <div className="flex border border-gray-200">
                        <div className="flex-1">
                            <div className="flex border-b border-gray-200 h-12 items-center">
                                <div className="w-32 bg-gray-50 h-full flex items-center px-4 font-bold text-gray-700 text-sm">브랜드명</div>
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
                                <div className="w-32 bg-gray-50 h-full flex items-center px-4 font-bold text-gray-700 text-sm">브랜드 선택</div>
                                <div className="flex-1 px-4 flex gap-2">
                                    <select 
                                        className="flex-1 h-8 border border-gray-300 rounded-sm px-1 text-sm bg-white focus:outline-none focus:border-gray-500"
                                        value={selectedDepth1}
                                        onChange={handleDepth1Change}
                                    >
                                        <option value="">= 1차 브랜드 =</option>
                                        {depth1Options.map(opt => (
                                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                                        ))}
                                    </select>
                                    
                                    <select 
                                        className="flex-1 h-8 border border-gray-300 rounded-sm px-1 text-sm bg-white focus:outline-none focus:border-gray-500 disabled:bg-gray-100"
                                        value={selectedDepth2}
                                        onChange={handleDepth2Change}
                                        disabled={!selectedDepth1}
                                    >
                                        <option value="">= 2차 브랜드 =</option>
                                        {depth2Options.map(opt => (
                                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                                        ))}
                                    </select>

                                    <select 
                                        className="flex-1 h-8 border border-gray-300 rounded-sm px-1 text-sm bg-white focus:outline-none focus:border-gray-500 disabled:bg-gray-100"
                                        value={selectedDepth3}
                                        onChange={handleDepth3Change}
                                        disabled={!selectedDepth2}
                                    >
                                        <option value="">= 3차 브랜드 =</option>
                                        {depth3Options.map(opt => (
                                            <option key={opt.id} value={opt.id}>{opt.name}</option>
                                        ))}
                                    </select>
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
                    <div className="mt-8 border-t border-gray-400 min-h-[300px]">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#bfbfbf] text-white text-sm">
                                    <th className="w-16 h-10 border-r border-[#afafaf] font-normal text-center">선택</th>
                                    <th className="w-16 border-r border-[#afafaf] font-normal text-center">번호</th>
                                    <th className="w-24 border-r border-[#afafaf] font-normal text-center">노출상점</th>
                                    <th className="border-r border-[#afafaf] font-normal text-center">브랜드명</th>
                                    <th className="w-40 font-normal text-center">등록일</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {loading ? (
                                    <tr><td colSpan={5} className="py-20 text-gray-400 text-sm">로딩중...</td></tr>
                                ) : filteredBrands.length > 0 ? (
                                    filteredBrands.map((item) => (
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
                                            조회된 브랜드가 없습니다.
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
