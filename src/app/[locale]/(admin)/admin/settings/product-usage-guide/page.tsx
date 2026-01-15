"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HelpCircle, Youtube, ArrowUp, ArrowDown, Plus } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { getProductUsageGuideSettingsAction, updateProductUsageGuideSettingsAction } from "@/actions/basic-policy-actions";

interface Guide {
    id: string;
    code: string;
    type: string; // delivery, refund, exchange
    title: string;
    isDefault?: boolean;
    supplier: string;
    regDate: string;
}

export default function ProductUsageGuidePage() {
    const [isPending, startTransition] = useTransition();
    const [guides, setGuides] = useState<Guide[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    
    // Filter States
    const [providerType, setProviderType] = useState("all");
    const [searchType, setSearchType] = useState("total");
    const [keyword, setKeyword] = useState("");
    const [guideType, setGuideType] = useState("none");

    useEffect(() => {
        const fetchData = async () => {
             const result = await getProductUsageGuideSettingsAction();
             if (result.success && result.settings && result.settings.guides) {
                 setGuides(result.settings.guides as unknown as Guide[]);
             }
        };
        fetchData();
    }, []);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(guides.map(g => g.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(item => item !== id));
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) {
            alert("선택된 항목이 없습니다.");
            return;
        }

        if (!confirm("선택한 항목을 삭제하시겠습니까?")) return;

        const newGuides = guides.filter(g => !selectedIds.includes(g.id));
        
        startTransition(async () => {
             const result = await updateProductUsageGuideSettingsAction(newGuides);
             if (result.success) {
                 setGuides(newGuides);
                 setSelectedIds([]);
                 alert("삭제되었습니다.");
             } else {
                 alert(result.error || "삭제 실패");
             }
        });
    };

    // Filtering Logic
    const filteredGuides = guides.filter(guide => {
        // Provider
        if (providerType === "hq" && guide.supplier !== "hq") return false;
        if (providerType === "supplier" && guide.supplier === "hq") return false;

        // Guide Type
        if (guideType !== "none" && guide.type !== guideType) return false;

        // Keyword
        if (keyword) {
            if (searchType === "total") {
                if (!guide.title.includes(keyword) && !guide.code.includes(keyword)) return false;
            } else if (searchType === "title") {
                 if (!guide.title.includes(keyword)) return false;
            } else if (searchType === "code") {
                 if (!guide.code.includes(keyword)) return false;
            }
        }
        return true;
    });

    const getTypeName = (type: string) => {
        switch(type) {
            case 'delivery': return '[배송안내]';
            case 'refund': return '[환불안내]';
            case 'exchange': return '[교환안내]';
            default: return `[${type}]`;
        }
    };

    const getSupplierName = (supplier: string) => {
        return supplier === 'hq' ? '본사' : supplier; // Assuming 'hq' means 본사
    };

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">상품 상세 이용안내 관리</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-[#FF424D] text-[#FF424D] hover:bg-red-50 rounded-sm h-9 px-4 text-xs font-bold">
                        <Plus size={12} className="mr-1" /> 이용안내 등록 (해외몰 적용)
                    </Button>
                    <Button variant="outline" className="border-[#FF424D] text-[#FF424D] hover:bg-red-50 rounded-sm h-9 px-4 text-xs font-bold">
                        <Plus size={12} className="mr-1" /> 이용안내 등록
                    </Button>
                </div>
            </div>

            {/* Search Section */}
            <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">이용안내 검색</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border border-gray-300 bg-white">
                    {/* Provider Type */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center">공급사 구분</div>
                        <div className="p-3 flex items-center gap-6">
                            <RadioGroup value={providerType} onValueChange={setProviderType} className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="all" id="provider-all" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="provider-all" className="font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="hq" id="provider-hq" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="provider-hq" className="font-normal cursor-pointer">본사</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="supplier" id="provider-supplier" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="provider-supplier" className="font-normal cursor-pointer">공급사</Label>
                                </div>
                            </RadioGroup>
                            <Button disabled variant="outline" size="sm" className="h-7 text-xs bg-gray-100 text-gray-400 border-gray-300 font-normal">
                                공급사 선택
                            </Button>
                        </div>
                    </div>

                    {/* Search Keyword */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center">검색어</div>
                        <div className="p-3 flex items-center gap-2">
                            <Select value={searchType} onValueChange={setSearchType}>
                                <SelectTrigger className="w-32 h-8 rounded-sm bg-white border-gray-300">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="total">=통합검색=</SelectItem>
                                    <SelectItem value="title">제목</SelectItem>
                                    <SelectItem value="code">코드</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input 
                                className="w-72 h-8 rounded-sm" 
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Guide Type */}
                    <div className="grid grid-cols-[180px_1fr]">
                        <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center">이용안내 종류</div>
                        <div className="p-3 py-4">
                            <RadioGroup value={guideType} onValueChange={setGuideType} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="none" id="type-none" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="type-none" className="font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="delivery" id="type-delivery" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="type-delivery" className="font-normal cursor-pointer">배송안내</Label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="refund" id="type-refund" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="type-refund" className="font-normal cursor-pointer">환불안내</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="exchange" id="type-exchange" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="type-exchange" className="font-normal cursor-pointer">교환안내</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center py-4 border-b border-gray-300">
                    <Button className="bg-[#555555] hover:bg-[#444444] text-white rounded-sm w-32 h-10 text-sm font-bold">
                        검 색
                    </Button>
                </div>
            </div>

            {/* List Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm">
                        검색 <span className="text-[#FF424D] font-bold">{filteredGuides.length}</span>개 / 전체 <span className="text-[#FF424D] font-bold">{guides.length}</span>개
                    </div>
                    <div className="flex items-center gap-2">
                        <Select defaultValue="reg_date_desc">
                            <SelectTrigger className="w-32 h-8 rounded-sm border-gray-300">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="reg_date_desc">등록일 ↑</SelectItem>
                                <SelectItem value="reg_date_asc">등록일 ↓</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select defaultValue="10">
                            <SelectTrigger className="w-32 h-8 rounded-sm border-gray-300">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10개 보기</SelectItem>
                                <SelectItem value="20">20개 보기</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="border border-gray-300 border-b-0">
                    <table className="w-full text-sm text-center">
                        <thead className="bg-[#A3A3A3] text-white font-bold h-10">
                            <tr>
                                <th className="w-10 border-r border-gray-400">
                                    <div className="flex justify-center">
                                         <Checkbox 
                                            className="w-4 h-4 border-gray-300 bg-white data-[state=checked]:bg-white data-[state=checked]:text-black" 
                                            checked={filteredGuides.length > 0 && selectedIds.length === filteredGuides.length}
                                            onCheckedChange={handleSelectAll}
                                         />
                                    </div>
                                </th>
                                <th className="border-r border-gray-400 w-16">번호</th>
                                <th className="border-r border-gray-400 w-32">이용안내 코드</th>
                                <th className="border-r border-gray-400 w-32">이용안내 종류</th>
                                <th className="border-r border-gray-400">이용안내 제목</th>
                                <th className="border-r border-gray-400 w-32">공급사 구분</th>
                                <th className="border-r border-gray-400 w-32">등록일</th>
                                <th className="w-20">수정</th>
                            </tr>
                        </thead>
                         <tbody className="text-gray-600">
                            {filteredGuides.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="py-10 text-gray-500">검색된 이용안내가 없습니다.</td>
                                </tr>
                            ) : (
                                filteredGuides.map((guide, index) => (
                                    <tr key={guide.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="py-3 px-4 border-r border-gray-200">
                                            <div className="flex justify-center">
                                                <Checkbox 
                                                    className="w-4 h-4 border-gray-300" 
                                                    checked={selectedIds.includes(guide.id)}
                                                    onCheckedChange={(checked) => handleSelectOne(guide.id, checked as boolean)}
                                                />
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 border-r border-gray-200">{filteredGuides.length - index}</td>
                                        <td className="py-3 px-4 border-r border-gray-200">{guide.code}</td>
                                        <td className="py-3 px-4 border-r border-gray-200">{getTypeName(guide.type)}</td>
                                        <td className="py-3 px-4 border-r border-gray-200 text-left pl-4">
                                            <div className="font-medium text-gray-800">{guide.title}</div>
                                            {guide.isDefault && <div className="text-xs text-gray-400">(기본설정)</div>}
                                        </td>
                                        <td className="py-3 px-4 border-r border-gray-200">{getSupplierName(guide.supplier)}</td>
                                        <td className="py-3 px-4 border-r border-gray-200">{guide.regDate}</td>
                                        <td className="py-3 px-4">
                                             <Button size="sm" className="h-7 text-xs px-3 bg-[#A3A3A3] hover:bg-[#999999] text-white rounded-sm font-normal">
                                                수정
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Footer Actions */}
                    <div className="bg-white p-2.5 border-t border-gray-300 flex items-center gap-2 border-b">
                         <div className="ml-2 flex items-center gap-1">
                             <Button variant="outline" size="sm" className="h-7 text-xs px-3 bg-white border-gray-300 text-gray-600 font-normal rounded-sm">
                                선택 이용안내 복사
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-7 text-xs px-3 bg-white border-gray-300 text-gray-600 font-normal rounded-sm"
                                onClick={handleDeleteSelected}
                            >
                                선택 이용안내 삭제
                            </Button>
                         </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" className="w-8 h-8 p-0 bg-gray-500 text-white hover:bg-gray-600 rounded-sm">1</Button>
                    </div>
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-12 h-12 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold"><Youtube size={20}/></span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-[#6E36E2] hover:bg-[#6E36E2]/90 shadow-lg text-white p-0 flex flex-col items-center justify-center border-0 gap-0">
                    <span className="text-[10px] leading-none">따라</span>
                    <span className="text-[10px] leading-none">하기</span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    <ArrowUp size={20} />
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    <ArrowDown size={20} />
                </Button>
            </div>
        </div>
    );
}
