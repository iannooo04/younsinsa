"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { HelpCircle, Plus, Check } from "lucide-react";

export default function OverseasShippingGroupPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">해외 배송그룹 관리</h1>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 rounded-sm h-9 px-4 text-sm font-bold flex items-center gap-1">
                    <Plus size={14} /> 해외 배송그룹 등록
                </Button>
            </div>

            {/* Table Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">해외 배송그룹 관리</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border border-gray-300 border-b-0">
                    <table className="w-full text-sm text-center">
                        <thead className="bg-[#A3A3A3] text-white font-bold h-10">
                            <tr>
                                <th className="w-10 border-r border-gray-400">
                                    <div className="flex justify-center">
                                        <Checkbox className="w-4 h-4 border-gray-300 bg-white data-[state=checked]:bg-white data-[state=checked]:text-black" />
                                    </div>
                                </th>
                                <th className="border-r border-gray-400 w-20">번호</th>
                                <th className="border-r border-gray-400">배송그룹명</th>
                                <th className="border-r border-gray-400 w-40">배송국가그룹 수</th>
                                <th className="border-r border-gray-400 w-40">등록일/수정일</th>
                                <th className="w-32">관리</th>
                            </tr>
                        </thead>
                        <tbody>
                             {/* Empty State / Content Placeholders would go here */}
                             {/* For now, just the footer control row as seen in image */}
                        </tbody>
                    </table>
                     {/* Batch Action Row */}
                     <div className="bg-gray-100 p-2.5 border-t border-gray-300 flex items-center gap-2 border-b">
                        <span className="text-red-500 font-bold flex items-center gap-1 text-xs">
                             <Check size={14} strokeWidth={4} /> 선택한 배송그룹을
                        </span>
                        <Button variant="outline" size="sm" className="h-7 text-xs px-3 bg-white border-gray-300 text-gray-600 font-normal rounded-sm">
                            삭제처리
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
