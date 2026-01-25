"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { HelpCircle, List, Youtube, ChevronUp } from "lucide-react";
import SupplierPopup from "@/components/admin/SupplierPopup";

export default function CreateCommonlyUsedOptionPage() {
    const router = useRouter();

    // Form State
    const [supplierType, setSupplierType] = useState("본사");
    const [manageName, setManageName] = useState("");
    const [displayType, setDisplayType] = useState("일체형");
    const [optionCount, setOptionCount] = useState("");
    const [isSupplierPopupOpen, setIsSupplierPopupOpen] = useState(false);
    const [selectedSupplierName, setSelectedSupplierName] = useState("");

    // Options Registration State
    const [options, setOptions] = useState([
        { id: 1, name: "", values: [""] }
    ]);

    const handleAddValue = (optionId: number) => {
        setOptions(prev => prev.map(opt => 
            opt.id === optionId ? { ...opt, values: [...opt.values, ""] } : opt
        ));
    };

    const handleRemoveValue = (optionId: number, valueIndex: number) => {
        setOptions(prev => prev.map(opt => 
            opt.id === optionId ? { ...opt, values: opt.values.filter((_, i) => i !== valueIndex) } : opt
        ));
    };

    const handleValueChange = (optionId: number, valueIndex: number, newValue: string) => {
        setOptions(prev => prev.map(opt => 
            opt.id === optionId ? { 
                ...opt, 
                values: opt.values.map((v, i) => i === valueIndex ? newValue : v) 
            } : opt
        ));
    };

    const handleOptionNameChange = (optionId: number, newName: string) => {
        setOptions(prev => prev.map(opt => 
            opt.id === optionId ? { ...opt, name: newName } : opt
        ));
    };

    // Update options based on count
    const handleOptionCountChange = (count: string) => {
        setOptionCount(count);
        const num = parseInt(count);
        if (!isNaN(num)) {
            const newOptions = Array.from({ length: num }, (_, i) => ({
                id: i + 1,
                name: options[i]?.name || "",
                values: options[i]?.values || [""]
            }));
            setOptions(newOptions);
        }
    };

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">자주쓰는 옵션 등록</h1>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        onClick={() => router.back()}
                        className="h-9 px-4 border-gray-300 text-gray-700 flex items-center gap-1 rounded-sm"
                    >
                        <List size={16} /> 목록
                    </Button>
                    <Button className="h-9 px-8 bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold rounded-sm border-0">
                        저장
                    </Button>
                </div>
            </div>

            {/* Form Section */}
            <div>
                <div className="flex items-center gap-1 mb-2">
                    <h2 className="text-lg font-bold text-gray-800">자주쓰는 옵션 등록</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border-t-2 border-gray-800">
                    {/* Row 1: Supplier */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-[180px] bg-gray-50 p-4 font-bold text-gray-700 flex items-center">공급사 구분</div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <RadioGroup 
                                value={supplierType} 
                                onValueChange={(val) => {
                                    setSupplierType(val);
                                    if (val === '공급사') setIsSupplierPopupOpen(true);
                                }} 
                                className="flex items-center gap-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="본사" id="sup-head" className="radio-xs" />
                                    <Label htmlFor="sup-head">본사</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="공급사" id="sup-vendor" className="radio-xs" />
                                    <Label htmlFor="sup-vendor">공급사</Label>
                                </div>
                            </RadioGroup>
                            <button 
                                type="button"
                                className="h-7 text-xs bg-[#aeaeae] text-white rounded-sm px-3 ml-2 flex items-center justify-center transition-none hover:bg-[#aeaeae] active:bg-[#aeaeae] cursor-pointer"
                                onClick={() => setIsSupplierPopupOpen(true)}
                            >
                                공급사 선택
                            </button>
                            {selectedSupplierName && (
                                <span className="text-xs text-blue-600 font-medium">
                                    {selectedSupplierName}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Row 2: Management Name */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-[180px] bg-gray-50 p-4 font-bold text-gray-700 flex items-center gap-1">
                            <span className="text-red-500">*</span> 옵션 관리 명
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Input 
                                className="w-64 h-8 rounded-sm border-gray-300" 
                                value={manageName}
                                onChange={(e) => setManageName(e.target.value)}
                            />
                            <span className="text-xs text-gray-400">
                                <span className="text-red-500">{manageName.length}</span> / 30
                            </span>
                        </div>
                    </div>

                    {/* Row 3: Display Type */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-[180px] bg-gray-50 p-4 font-bold text-gray-700 flex items-center gap-1">
                            옵션 노출 방식
                        </div>
                        <div className="flex-1 p-3">
                            <RadioGroup value={displayType} onValueChange={setDisplayType} className="flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="일체형" id="disp-int" className="radio-xs" />
                                    <Label htmlFor="disp-int">일체형</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="분리형" id="disp-sep" className="radio-xs" />
                                    <Label htmlFor="disp-sep">분리형</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 4: Option Count */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-[180px] bg-gray-50 p-4 font-bold text-gray-700 flex items-center gap-1">
                            <span className="text-red-500">*</span> 옵션 개수
                        </div>
                        <div className="flex-1 p-3">
                            <Select value={optionCount} onValueChange={handleOptionCountChange}>
                                <SelectTrigger className="w-[140px] h-8 text-xs rounded-sm border-gray-300">
                                    <SelectValue placeholder="=옵션 개수=" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <SelectItem key={num} value={num.toString()}>{num}개</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 5: Options Registration */}
                    <div className="flex">
                        <div className="w-[180px] bg-gray-50 p-4 font-bold text-gray-700 flex items-start gap-1 pt-8">
                            <span className="text-red-500">*</span> 자주쓰는 옵션 등록
                        </div>
                        <div className="flex-1 p-4">
                            <p className="text-xs text-[#FF424D] mb-4">
                                옵션값에 &amp; 특수문자 사용 시, 옵션 이미지가 출력되지 않으니 주의하시기 바랍니다.
                            </p>
                            
                            {optionCount && (
                                <div className="w-full max-w-[600px]">
                                    {/* Table Header */}
                                    <div className="flex bg-[#f2f4f7] border border-gray-300 text-center font-bold text-gray-700 h-10 items-center">
                                        <div className="w-1/2 border-r border-gray-300">옵션명</div>
                                        <div className="w-1/2">옵션값</div>
                                    </div>

                                    {/* Table Body */}
                                    {options.map(opt => (
                                        <div key={opt.id} className="flex border-l border-r border-b border-gray-300 min-h-[120px]">
                                            <div className="w-1/2 p-4 flex items-center justify-center border-r border-gray-300">
                                                <Input 
                                                    className="w-full h-8 rounded-sm border-gray-300 text-center"
                                                    placeholder="옵션명"
                                                    value={opt.name}
                                                    onChange={(e) => handleOptionNameChange(opt.id, e.target.value)}
                                                />
                                            </div>
                                            <div className="w-1/2 p-4 space-y-2">
                                                {opt.values.map((val, idx) => (
                                                    <div key={idx} className="flex gap-1 items-center">
                                                        <Input 
                                                            className="flex-1 h-8 rounded-sm border-gray-300"
                                                            placeholder="옵션값"
                                                            value={val}
                                                            onChange={(e) => handleValueChange(opt.id, idx, e.target.value)}
                                                        />
                                                        {idx === 0 ? (
                                                            <button 
                                                                type="button" 
                                                                className="h-8 px-2 text-xs border border-gray-300 text-gray-600 rounded-sm hover:bg-gray-50 flex items-center justify-center"
                                                                onClick={() => handleAddValue(opt.id)}
                                                            >
                                                                + 추가
                                                            </button>
                                                        ) : (
                                                            <button 
                                                                type="button" 
                                                                className="h-8 px-2 text-xs border border-gray-300 text-gray-400 rounded-sm hover:bg-gray-50 flex items-center justify-center"
                                                                onClick={() => handleRemoveValue(opt.id, idx)}
                                                            >
                                                                - 삭제
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold"><Youtube size={16}/></span>
                </Button>
                 <Button className="rounded-full w-10 h-10 bg-[#7B4DFF] hover:bg-[#7B4DFF]/90 shadow-lg text-white p-0 flex items-center justify-center border-0 text-[10px] leading-tight flex-col">
                    <span className="block">따라</span>
                    <span className="block">하기</span>
                </Button>
                <div className="flex flex-col gap-0 rounded-full bg-white shadow-lg overflow-hidden border border-gray-200">
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100">
                         <ChevronUp size={16} />
                    </Button>
                </div>
            </div>

            <SupplierPopup 
                isOpen={isSupplierPopupOpen}
                onClose={() => setIsSupplierPopupOpen(false)}
                onConfirm={(supplier) => {
                    if (supplier) {
                        setSupplierType("공급사");
                        if (Array.isArray(supplier)) {
                            if (supplier.length > 0) setSelectedSupplierName(supplier[0].name);
                        } else {
                            setSelectedSupplierName(supplier.name);
                        }
                    }
                    setIsSupplierPopupOpen(false);
                }}
            />
        </div>
    );
}
