"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { getProductUsageGuideSettingsAction, updateProductUsageGuideSettingsAction } from "@/actions/basic-policy-actions";
import { Prisma } from "@/generated/prisma";

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
    const [, startTransition] = useTransition();
    const [guides, setGuides] = useState<Guide[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
             const result = await getProductUsageGuideSettingsAction();
             if (result.success && result.settings && result.settings.guides && Array.isArray(result.settings.guides) && result.settings.guides.length > 0) {
                 setGuides(result.settings.guides as unknown as Guide[]);
             } else {
                 setGuides([
                    {
                        id: 'dummy-1',
                        code: '100001',
                        type: 'delivery',
                        title: '기본 배송/교환/반품 안내',
                        isDefault: true,
                        supplier: 'hq',
                        regDate: '2026-01-21'
                    },
                    {
                        id: 'dummy-2',
                        code: '100002',
                        type: 'refund',
                        title: '반품/환불 안내 (공급사)',
                        isDefault: false,
                        supplier: '니아인터내셔널',
                        regDate: '2026-01-20'
                    }
                 ]);
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
             const result = await updateProductUsageGuideSettingsAction({ guides: newGuides as unknown as Prisma.InputJsonValue });
             if (result.success) {
                 setGuides(newGuides);
                 setSelectedIds([]);
                 alert("삭제되었습니다.");
             } else {
                 alert(result.error || "삭제 실패");
             }
        });
    };

    const filteredGuides = guides;

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
                    <Link href="/admin/settings/product-usage-guide/register-global">
                        <Button variant="outline" className="border-[#FF424D] text-[#FF424D] hover:bg-red-50 rounded-sm h-9 px-4 text-xs font-bold">
                            <Plus size={12} className="mr-1" /> 이용안내 등록 (해외몰 적용)
                        </Button>
                    </Link>
                    <Link href="/admin/settings/product-usage-guide/register">
                        <Button variant="outline" className="border-[#FF424D] text-[#FF424D] hover:bg-red-50 rounded-sm h-9 px-4 text-xs font-bold">
                            <Plus size={12} className="mr-1" /> 이용안내 등록
                        </Button>
                    </Link>
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
                                <SelectValue placeholder="등록일 ↑" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="reg_date_desc">등록일 ↑</SelectItem>
                                <SelectItem value="reg_date_asc">등록일 ↓</SelectItem>
                                <SelectItem value="title_desc">이용안내 제목 ↑</SelectItem>
                                <SelectItem value="title_asc">이용안내 제목 ↓</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select defaultValue="10">
                            <SelectTrigger className="w-32 h-8 rounded-sm border-gray-300">
                                <SelectValue placeholder="10개 보기" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                                <SelectItem value="10">10개 보기</SelectItem>
                                <SelectItem value="20">20개 보기</SelectItem>
                                <SelectItem value="30">30개 보기</SelectItem>
                                <SelectItem value="40">40개 보기</SelectItem>
                                <SelectItem value="50">50개 보기</SelectItem>
                                <SelectItem value="60">60개 보기</SelectItem>
                                <SelectItem value="70">70개 보기</SelectItem>
                                <SelectItem value="80">80개 보기</SelectItem>
                                <SelectItem value="90">90개 보기</SelectItem>
                                <SelectItem value="100">100개 보기</SelectItem>
                                <SelectItem value="200">200개 보기</SelectItem>
                                <SelectItem value="300">300개 보기</SelectItem>
                                <SelectItem value="500">500개 보기</SelectItem>
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
                                            <Link href={`/admin/settings/product-usage-guide/${guide.id}`}>
                                                <Button size="sm" className="h-7 text-xs px-3 bg-[#A3A3A3] hover:bg-[#999999] text-white rounded-sm font-normal">
                                                    수정
                                                </Button>
                                            </Link>
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

        </div>
    );
}
