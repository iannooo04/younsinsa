"use client";

import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type CodeItem = {
    id: string;
    codeNo: string;
    name: string;
    inUse: boolean;
};

export default function CodeSettingsPage() {
    const [activeTab, setActiveTab] = useState<"kr" | "cn">("kr");
    const [selectedType, setSelectedType] = useState("member");
    const [selectedGroup, setSelectedGroup] = useState("interest");

    const [allCodes, setAllCodes] = useState<{ kr: CodeItem[]; cn: CodeItem[] }>({
        kr: [
            { id: "k1", codeNo: "01001001", name: "화장품/향수/미용품", inUse: true },
            { id: "k2", codeNo: "01001002", name: "컴퓨터/SW", inUse: true },
            { id: "k3", codeNo: "01001003", name: "의류/패션잡화", inUse: true },
            { id: "k4", codeNo: "01001004", name: "생활/주방용품", inUse: true },
            { id: "k5", codeNo: "01001005", name: "보석/시계/악세사리", inUse: true },
            { id: "k6", codeNo: "01001006", name: "가전/카메라", inUse: true },
            { id: "k7", codeNo: "01001007", name: "서적/음반/비디오", inUse: true },
        ],
        cn: [
             { id: "c1", codeNo: "01001001", name: "화장품/향수/미용품", inUse: true },
             { id: "c2", codeNo: "01001002", name: "컴퓨터/SW", inUse: true },
             { id: "c3", codeNo: "01001003", name: "의류/패션잡화", inUse: true },
             { id: "c4", codeNo: "01001004", name: "생활/주방용품", inUse: true },
             { id: "c5", codeNo: "01001005", name: "보석/시계/악세사리", inUse: true },
             { id: "c6", codeNo: "01001006", name: "가전/카메라", inUse: true },
             { id: "c7", codeNo: "01001007", name: "서적/음반/비디오", inUse: true },
        ]
    });

    const currentCodes = allCodes[activeTab];

    const handleAddCode = () => {
        const currentList = allCodes[activeTab];
        const newId = `${activeTab}${Date.now()}`;
        // Simple mock logic for next code number based on current list
        const lastCode = currentList.length > 0 ? parseInt(currentList[currentList.length - 1].codeNo) : 1001000;
        const nextCode = (lastCode + 1).toString().padStart(8, '0');

        const newCodeItem = {
            id: newId,
            codeNo: nextCode,
            name: "",
            inUse: true
        };

        setAllCodes({
            ...allCodes,
            [activeTab]: [...currentList, newCodeItem]
        });
    };

    const handleDeleteCode = (id: string) => {
        setAllCodes({
            ...allCodes,
            [activeTab]: allCodes[activeTab].filter(c => c.id !== id)
        });
    };

    const updateCodeName = (index: number, newName: string) => {
        const newCodes = [...allCodes[activeTab]];
        newCodes[index].name = newName;
        setAllCodes({ ...allCodes, [activeTab]: newCodes });
    };

    const updateCodeInUse = (index: number, inUse: boolean) => {
        const newCodes = [...allCodes[activeTab]];
        newCodes[index].inUse = inUse;
        setAllCodes({ ...allCodes, [activeTab]: newCodes });
    };

    // Options definitions
    const categoryOptions = {
        kr: [
            { value: "member", label: "회원" },
            { value: "admin", label: "운영자" },
            { value: "board", label: "게시판" },
            { value: "order", label: "주문" },
            { value: "product", label: "상품" },
            { value: "excel", label: "엑셀다운로드" },
        ],
        cn: [
            { value: "member", label: "회원" },
            { value: "board", label: "게시판" },
        ]
    };

    const groupOptions = {
        kr: [
            { value: "interest", label: "관심분야" },
            { value: "job", label: "직업" },
            { value: "withdrawal", label: "탈퇴/불편 사항" },
            { value: "email", label: "메일도메인" },
            { value: "mileage", label: "마일리지 지급/차감 사유" },
            { value: "deposit", label: "예치금 지급/차감 사유" },
            { value: "sms", label: "SMS 문구" },
        ],
        cn: [
            { value: "interest", label: "관심분야" },
            { value: "job", label: "직업" },
            { value: "withdrawal", label: "탈퇴/불편 사항" },
        ]
    };

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen pb-24 font-sans text-sm">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">코드 관리</h1>
                <Button className="bg-red-500 hover:bg-red-600 text-white px-6 rounded-sm h-9">
                    저장
                </Button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-gray-300">
                <button
                    onClick={() => {
                        setActiveTab("kr");
                        setSelectedType("member");
                        setSelectedGroup("interest");
                    }}
                    className={`px-4 py-2 border-t border-l border-r rounded-t-sm flex items-center gap-2 text-sm ${
                        activeTab === "kr" 
                        ? "bg-white border-b-white -mb-[1px] font-bold text-gray-800" 
                        : "bg-gray-50 text-gray-500 border-gray-300"
                    }`}
                >
                    <span className="text-lg">🇰🇷</span> 
                    {activeTab === "kr" && <span>기준몰</span>}
                </button>
                <button
                    onClick={() => {
                        setActiveTab("cn");
                        setSelectedType("member");
                        setSelectedGroup("interest");
                    }}
                    className={`px-4 py-2 border-t border-l border-r rounded-t-sm flex items-center gap-2 text-sm ${
                        activeTab === "cn" 
                        ? "bg-white border-b-white -mb-[1px] font-bold text-gray-800" 
                        : "bg-gray-50 text-gray-500 border-gray-300"
                    }`}
                >
                    <span className="text-lg">🇨🇳</span> 
                    {activeTab === "cn" && <span>중문몰</span>}
                </button>
            </div>

            {/* Filter Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">코드 관리</h2>
                    <span className="text-xs font-normal text-gray-400 border px-1 rounded cursor-help">?</span>
                </div>

                <div className="border-t border-b border-gray-300 bg-white">
                    <div className="grid grid-cols-[120px_1fr_120px_1fr] divide-x border-b border-gray-200">
                        <div className="p-3 bg-gray-50 font-medium flex items-center">구분</div>
                        <div className="p-3">
                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger className="w-[180px] h-8 bg-white border-gray-300 rounded-sm">
                                    <SelectValue>
                                        {categoryOptions[activeTab].find((opt) => opt.value === selectedType)?.label}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryOptions[activeTab].map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="p-3 bg-gray-50 font-medium flex items-center">코드 그룹 선택</div>
                        <div className="p-3">
                            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                                <SelectTrigger className="w-[180px] h-8 bg-white border-gray-300 rounded-sm">
                                    <SelectValue>
                                        {groupOptions[activeTab].find((opt) => opt.value === selectedGroup)?.label}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                     {groupOptions[activeTab].map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Controls Top */}
            <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-sm bg-white border-gray-300 text-gray-600 hover:bg-gray-50">
                    <span className="text-xs">▼</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-sm bg-white border-gray-300 text-gray-600 hover:bg-gray-50">
                    <span className="text-xs">▲</span>
                </Button>
                <div className="w-4" /> {/* Spacer */}
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-sm bg-white border-gray-300 text-gray-600 hover:bg-gray-50 transform rotate-180">
                    <span className="text-xs">▲</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-sm bg-white border-gray-300 text-gray-600 hover:bg-gray-50 transform rotate-180">
                    <span className="text-xs">▼</span>
                </Button>
            </div>

            {/* Data Table */}
            <div className="border border-gray-300">
                <table className="w-full text-sm text-center">
                    <thead className="bg-[#A6A6A6] text-white font-medium">
                        <tr>
                            <th className="w-16 py-2 border-r border-gray-400">번호</th>
                            <th className="w-32 py-2 border-r border-gray-400">코드번호</th>
                            <th className="py-2 border-r border-gray-400">항목명</th>
                            <th className="w-24 py-2 border-r border-gray-400">사용설정</th>
                            <th className="w-24 py-2">추가/삭제</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {currentCodes.map((code, index) => (
                            <tr key={code.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-2 border-r border-gray-200 text-gray-500">{index + 1}</td>
                                <td className="py-2 border-r border-gray-200 font-mono text-gray-600">{code.codeNo}</td>
                                <td className="py-2 px-4 border-r border-gray-200 text-left">
                                    <Input 
                                        value={code.name} 
                                        onChange={(e) => updateCodeName(index, e.target.value)}
                                        className="h-8 rounded-sm border-gray-300"
                                    />
                                </td>
                                <td className="py-2 border-r border-gray-200 px-2">
                                    <Select 
                                        value={code.inUse ? "use" : "unused"}
                                        onValueChange={(val) => updateCodeInUse(index, val === "use")}
                                    >
                                        <SelectTrigger className="h-8 w-full bg-white border-gray-300 rounded-sm">
                                            <SelectValue>
                                                {code.inUse ? "사용" : "미사용"}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="use">사용</SelectItem>
                                            <SelectItem value="unused">미사용</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>
                                <td className="py-2 px-2">
                                    {index === 0 ? (
                                        <Button 
                                            variant="outline" 
                                            className="h-8 w-full bg-white hover:bg-gray-50 border-gray-300 text-gray-600 rounded-sm text-xs flex items-center justify-center gap-1"
                                            onClick={handleAddCode}
                                        >
                                            <Plus size={12} /> 추가
                                        </Button>
                                    ) : (
                                        <Button 
                                            variant="outline" 
                                            className="h-8 w-full bg-white hover:bg-gray-50 border-gray-300 text-gray-600 rounded-sm text-xs flex items-center justify-center gap-1"
                                            onClick={() => handleDeleteCode(code.id)}
                                        >
                                            <Minus size={12} /> 삭제
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table Controls Bottom */}
            <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-sm bg-white border-gray-300 text-gray-600 hover:bg-gray-50">
                    <span className="text-xs">▼</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-sm bg-white border-gray-300 text-gray-600 hover:bg-gray-50">
                    <span className="text-xs">▲</span>
                </Button>
                <div className="w-4" /> {/* Spacer */}
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-sm bg-white border-gray-300 text-gray-600 hover:bg-gray-50 transform rotate-180">
                    <span className="text-xs">▲</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-sm bg-white border-gray-300 text-gray-600 hover:bg-gray-50 transform rotate-180">
                    <span className="text-xs">▼</span>
                </Button>
            </div>


                    </div>
    );
}
