"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { HelpCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ExternalServicesPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 pb-4 border-b border-gray-400">외부서비스 설정</h1>
            </div>

            {/* Google Stats Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">구글 통계</h2>
                    <Button className="bg-red-600 hover:bg-red-700 text-white rounded-sm h-8 px-6 text-sm">
                        저장
                    </Button>
                </div>
                
                <div className="border-t border-b border-gray-300">
                    <div className="grid grid-cols-[150px_1fr] divide-x border-b border-gray-200">
                         <div className="bg-gray-50 p-4 flex items-center gap-1 font-medium text-gray-700">
                            측정 ID
                            <HelpCircle size={14} className="text-gray-400" />
                        </div>
                        <div className="p-3 flex items-center gap-4">
                            <Input 
                                placeholder="측정 ID 입력" 
                                className="w-80 h-9 rounded-none border-gray-300"
                            />
                            <Link href="#" className="text-gray-600 hover:underline flex items-center text-sm">
                                구글 애널리틱스 바로가기 {'>'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* External Script Management Section */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">외부 스크립트 관리</h2>
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 rounded-sm h-9 px-4 text-sm flex items-center gap-1">
                        <Plus size={14} /> 외부 스크립트 등록
                    </Button>
                </div>

                <div className="border-t border-gray-400">
                    <table className="w-full text-center text-sm">
                        <thead className="bg-[#A6A6A6] text-white">
                            <tr>
                                <th className="py-2 w-10 border-r border-gray-400">
                                    <div className="flex justify-center">
                                        <Checkbox className="bg-white border-white data-[state=checked]:text-black" />
                                    </div>
                                </th>
                                <th className="py-2 w-16 border-r border-gray-400 font-medium">번호</th>
                                <th className="py-2 w-24 border-r border-gray-400 font-medium">상점 구분</th>
                                <th className="py-2 border-r border-gray-400 font-medium">서비스명</th>
                                <th className="py-2 w-32 border-r border-gray-400 font-medium">등록일</th>
                                <th className="py-2 w-24 border-r border-gray-400 font-medium">등록자</th>
                                <th className="py-2 w-24 border-r border-gray-400 font-medium">사용설정</th>
                                <th className="py-2 w-20 font-medium">수정</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={8} className="py-12 text-gray-500 border-b border-gray-300">
                                    등록된 외부스크립트가 없습니다.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Bottom Actions */}
                <div className="pt-2">
                     <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-sm h-8 px-4 text-sm">
                        선택삭제
                    </Button>
                </div>
            </div>
        </div>
    );
}
