"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { getShippingPoliciesAction } from "@/actions/shipping-actions";
import ShippingFeeDetailPopup from "./ShippingFeeDetailPopup";

interface ShippingPolicy {
    id: number;
    name: string;
    supplierType: string;
    shippingMethod: string;
    shippingFeeType: string;
    feeSetting: string;
    feeChargingMethod: string;
    paymentMethod: string;
    isAreaSpecific: boolean;
    createdAt: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selected: ShippingPolicy | null) => void;
}

export default function ShippingPolicyPopup({ isOpen, onClose, onConfirm }: Props) {
    const [policies, setPolicies] = useState<ShippingPolicy[]>([]);
    const [loading, setLoading] = useState(false);
    
    // Search Filters
    const [policyName, setPolicyName] = useState("");
    const [policyType, setPolicyType] = useState("all");
    const [feeTypes, setFeeTypes] = useState<string[]>(["all"]);
    
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [detailData, setDetailData] = useState<any>(null);

    useEffect(() => {
        if (isOpen) {
            fetchPolicies();
            setSelectedId(null);
        }
    }, [isOpen]);

    const fetchPolicies = async () => {
        setLoading(true);
        try {
            const res = await getShippingPoliciesAction();
            if (res.success) {
                // Formatting data for the table based on existing policies or mock
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const formatted = (res.items || []).map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    supplierType: "니아인터내셔널", // Mock or from data
                    shippingMethod: "택배",
                    shippingFeeType: item.feeType === 'free' ? '배송비무료' : 
                                    item.feeType === 'fixed' ? '고정배송비' : 
                                    item.feeType === 'price' ? '금액별배송' : '기타',
                    feeSetting: item.feeType === 'fixed' ? `${item.baseFee}원` : 
                                item.feeType === 'free' ? '0원' : '상세보기',
                    feeChargingMethod: "배송비조건별",
                    paymentMethod: "선불",
                    isAreaSpecific: false,
                    createdAt: "2025-11-25"
                }));
                setPolicies(formatted);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchPolicies();
    };

    const handleConfirm = () => {
        const selected = policies.find(p => p.id === selectedId) || null;
        onConfirm(selected);
        onClose();
    };

    const handleFeeTypeChange = (type: string, checked: boolean) => {
        if (type === "all") {
            setFeeTypes(checked ? ["all", "free", "price", "qty", "weight", "fixed"] : []);
        } else {
            if (checked) {
                const newTypes = [...feeTypes.filter(t => t !== "all"), type];
                if (newTypes.length === 5) setFeeTypes(["all", ...newTypes]);
                else setFeeTypes(newTypes);
            } else {
                setFeeTypes(feeTypes.filter(t => t !== type && t !== "all"));
            }
        }
    };

    const handleOpenDetail = (policy: ShippingPolicy) => {
        // Mock data based on the image provided
        const mockData = {
            type: policy.shippingFeeType || "금액별배송비",
            taxRate: "과세 10.0%",
            steps: [
                { id: 1, condition: "0 ~ 50,000원", fee: "2,500원" },
                { id: 2, condition: "50,000원 이상", fee: "0원" }
            ]
        };
        setDetailData(mockData);
        setIsDetailOpen(true);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center font-sans px-4">
            <div className="bg-white w-full max-w-[1000px] shadow-2xl border border-gray-300">
                {/* Header */}
                <div className="relative p-6 pb-2">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl text-gray-800 tracking-tight font-medium">배송비 선택</h2>
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
                                    배송비 조건명
                                </div>
                                <div className="flex-1 p-2 flex items-center">
                                    <input 
                                        type="text" 
                                        className="w-[300px] h-8 border border-gray-300 px-2 text-sm focus:outline-none"
                                        value={policyName}
                                        onChange={(e) => setPolicyName(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Row: Policy Type & Fee Types */}
                            <div className="flex">
                                <div className="w-[140px] bg-gray-50 flex items-center pl-4 py-3 text-sm font-bold text-gray-700 border-r border-gray-200">
                                    배송 정책
                                </div>
                                <div className="flex-1 p-2 space-y-2">
                                    <RadioGroup value={policyType} onValueChange={setPolicyType} className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="pol-all" />
                                            <Label htmlFor="pol-all" className="text-sm">전체</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="condition" id="pol-cond" />
                                            <Label htmlFor="pol-cond" className="text-sm">배송비조건별</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="product" id="pol-prod" />
                                            <Label htmlFor="pol-prod" className="text-sm">상품별</Label>
                                        </div>
                                    </RadioGroup>
                                    <div className="flex items-center gap-4 pt-1">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox 
                                                id="fee-all" 
                                                checked={feeTypes.includes("all")} 
                                                onCheckedChange={(c) => handleFeeTypeChange("all", !!c)}
                                                className="bg-red-500 border-red-500"
                                            />
                                            <Label htmlFor="fee-all" className="text-sm">전체</Label>
                                        </div>
                                        {[
                                            { id: "free", label: "배송비무료" },
                                            { id: "price", label: "금액별배송" },
                                            { id: "qty", label: "수량별배송" },
                                            { id: "weight", label: "무게별배송" },
                                            { id: "fixed", label: "고정배송비" }
                                        ].map(item => (
                                            <div key={item.id} className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id={`fee-${item.id}`}
                                                    checked={feeTypes.includes(item.id)}
                                                    onCheckedChange={(c) => handleFeeTypeChange(item.id, !!c)}
                                                />
                                                <Label htmlFor={`fee-${item.id}`} className="text-sm">{item.label}</Label>
                                            </div>
                                        ))}
                                    </div>
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

                    {/* Table */}
                    <div className="border border-gray-300 border-b-0 overflow-x-auto">
                        <table className="w-full text-center text-[12px] border-collapse min-w-[900px]">
                            <thead className="bg-[#B0B0B0] text-white">
                                <tr className="h-9">
                                    <th className="w-12 border-r border-gray-400 font-normal">선택</th>
                                    <th className="w-12 border-r border-gray-400 font-normal">번호</th>
                                    <th className="border-r border-gray-400 font-normal px-2">배송비조건명</th>
                                    <th className="w-28 border-r border-gray-400 font-normal">공급사구분</th>
                                    <th className="w-20 border-r border-gray-400 font-normal">배송방식</th>
                                    <th className="w-24 border-r border-gray-400 font-normal">배송비유형</th>
                                    <th className="w-24 border-r border-gray-400 font-normal">배송비설정</th>
                                    <th className="w-28 border-r border-gray-400 font-normal">배송비부과방법</th>
                                    <th className="w-20 border-r border-gray-400 font-normal">결제방법</th>
                                    <th className="w-32 border-r border-gray-400 font-normal">지역별추가배송비</th>
                                    <th className="w-24 font-normal">등록일</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                {loading ? (
                                    <tr><td colSpan={11} className="py-10 border-b border-gray-300">Loading...</td></tr>
                                ) : policies.length === 0 ? (
                                    <tr><td colSpan={11} className="py-10 border-b border-gray-300 text-gray-400">등록된 배송 정책이 없습니다.</td></tr>
                                ) : (
                                    policies.map((p, index) => (
                                        <tr key={index} className="h-12 border-b border-gray-300 hover:bg-gray-50">
                                            <td className="border-r border-gray-300">
                                                <div className="flex justify-center">
                                                    <input 
                                                        type="radio"
                                                        name="selected_policy"
                                                        className="radio radio-xs cursor-pointer"
                                                        checked={selectedId === p.id}
                                                        onChange={() => setSelectedId(p.id)}
                                                    />
                                                </div>
                                            </td>
                                            <td className="border-r border-gray-300">{policies.length - index}</td>
                                            <td className="border-r border-gray-300 text-left px-3 text-gray-800 font-normal">{p.name}</td>
                                            <td className="border-r border-gray-300">{p.supplierType}</td>
                                            <td className="border-r border-gray-300">{p.shippingMethod}</td>
                                            <td className="border-r border-gray-300">{p.shippingFeeType}</td>
                                            <td className="border-r border-gray-300">
                                                {p.feeSetting === '상세보기' ? (
                                                    <button 
                                                        className="bg-gray-600 text-white text-[10px] px-1.5 py-0.5 rounded-sm hover:bg-gray-700"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleOpenDetail(p);
                                                        }}
                                                    >
                                                        상세보기
                                                    </button>
                                                ) : p.feeSetting}
                                            </td>
                                            <td className="border-r border-gray-300">{p.feeChargingMethod}</td>
                                            <td className="border-r border-gray-300">{p.paymentMethod}</td>
                                            <td className="border-r border-gray-300">{p.isAreaSpecific ? '있음' : '없음'}</td>
                                            <td>{p.createdAt}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex justify-center mt-6">
                        <div className="w-8 h-8 bg-gray-600 text-white flex items-center justify-center text-sm font-bold">1</div>
                    </div>

                    {/* Confirmation Button */}
                    <div className="flex justify-center mt-6">
                         <button 
                            className="bg-[#666666] text-white text-base font-normal py-2 px-10 hover:bg-[#555555] rounded-sm"
                            onClick={handleConfirm}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>

            <ShippingFeeDetailPopup 
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                data={detailData}
            />
        </div>
    );
}
