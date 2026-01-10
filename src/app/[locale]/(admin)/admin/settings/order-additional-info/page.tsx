"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Youtube, Plus, ChevronsUp, ChevronUp, ChevronDown, ChevronsDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function OrderAdditionalInfoSettingsPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">주문서 추가정보 관리</h1>
                <Button variant="outline" className="border-[#FF424D] text-[#FF424D] hover:bg-red-50 rounded-sm h-9 px-4 text-xs font-bold bg-white">
                    <Plus size={12} className="mr-1" /> 추가정보 등록
                </Button>
            </div>

            {/* Locale Tabs */}
            <Tabs defaultValue="kr" className="w-full">
                <TabsList className="h-10 p-0 bg-transparent border-b border-gray-300 w-full justify-start rounded-none">
                    <TabsTrigger 
                        value="kr" 
                        className="h-full px-6 rounded-t-sm border border-b-0 border-gray-300 data-[state=active]:bg-white data-[state=active]:border-gray-800 data-[state=active]:border-b-white relative top-[1px] rounded-none shadow-none"
                    >
                        <span className="mr-2">🇰🇷</span> 기준몰
                    </TabsTrigger>
                    <TabsTrigger 
                        value="cn" 
                        className="h-full px-6 rounded-t-sm border border-b-0 border-gray-300 bg-gray-50 data-[state=active]:bg-white data-[state=active]:border-gray-800 data-[state=active]:border-b-white relative top-[1px] rounded-none shadow-none"
                    >
                        <span className="mr-2">🇨🇳</span>
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Section 1: Usage Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">추가정보 사용 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border border-gray-300 border-t-2 border-t-gray-800">
                    <div className="grid grid-cols-[200px_1fr] bg-white">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            추가정보 사용여부
                        </div>
                        <div className="p-4 flex items-center gap-4">
                            <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="use-yes" className="border-gray-300" />
                                    <Label htmlFor="use-yes" className="font-normal text-gray-700">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="use-no" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="use-no" className="font-normal text-gray-700">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-7 px-4 text-xs font-bold ml-4">
                                저장
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Info List */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">추가정보 리스트</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                {/* Top Action Bar */}
                <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-300 border-b-0">
                    <div className="flex bg-white border border-gray-300 rounded-sm">
                        <Button variant="ghost" size="icon" className="h-7 w-8 rounded-none border-r border-gray-300 hover:bg-gray-50 text-gray-400">
                            <ChevronsUp size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-8 rounded-none border-r border-gray-300 hover:bg-gray-50 text-gray-400">
                            <ChevronUp size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-8 rounded-none border-r border-gray-300 hover:bg-gray-50 text-gray-400">
                            <ChevronDown size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-8 rounded-none hover:bg-gray-50 text-gray-400">
                            <ChevronsDown size={14} />
                        </Button>
                    </div>
                    <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-7 px-4 text-xs font-bold">
                        순서저장
                    </Button>
                </div>

                {/* Table */}
                <div className="border border-gray-300 text-center text-xs">
                    {/* Header */}
                    <div className="grid grid-cols-[40px_80px_100px_80px_80px_200px_120px_100px_100px_100px_140px_80px] bg-gray-400 text-white font-normal border-b border-gray-300"> {/* Header color matching screenshot gray */}
                        <div className="py-2 flex items-center justify-center border-r border-gray-300/50"><Checkbox className="bg-white border-0 rounded-[2px] w-3 h-3" /></div>
                        <div className="py-2 flex items-center justify-center border-r border-gray-300/50">노출순서</div>
                        <div className="py-2 flex items-center justify-center border-r border-gray-300/50">상점 구분</div>
                        <div className="py-2 flex items-center justify-center border-r border-gray-300/50">노출상태</div>
                        <div className="py-2 flex items-center justify-center border-r border-gray-300/50">필수여부</div>
                        <div className="py-2 flex items-center justify-center border-r border-gray-300/50">항목명</div>
                        <div className="py-2 flex items-center justify-center border-r border-gray-300/50">노출유형</div>
                        <div className="py-2 flex items-center justify-center border-r border-gray-300/50">상세설정</div>
                        <div className="py-2 flex items-center justify-center border-r border-gray-300/50">상품조건</div>
                        <div className="py-2 flex items-center justify-center border-r border-gray-300/50">예외조건</div>
                        <div className="py-2 flex items-center justify-center border-r border-gray-300/50">등록일/수정일</div>
                        <div className="py-2 flex items-center justify-center">수정</div>
                    </div>

                    {/* Empty State */}
                    <div className="py-12 bg-white text-gray-600 border-b border-gray-300">
                        등록된 주문서 추가정보가 없습니다.
                    </div>
                </div>

                {/* Bottom Action Bar */}
                 <div className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-300 border-t-0">
                    <div className="flex bg-white border border-gray-300 rounded-sm">
                        <Button variant="ghost" size="icon" className="h-7 w-8 rounded-none border-r border-gray-300 hover:bg-gray-50 text-gray-400">
                            <ChevronsUp size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-8 rounded-none border-r border-gray-300 hover:bg-gray-50 text-gray-400">
                            <ChevronUp size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-8 rounded-none border-r border-gray-300 hover:bg-gray-50 text-gray-400">
                            <ChevronDown size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-8 rounded-none hover:bg-gray-50 text-gray-400">
                            <ChevronsDown size={14} />
                        </Button>
                    </div>
                    <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-7 px-4 text-xs font-bold">
                        순서저장
                    </Button>
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-12 h-12 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold"><Youtube size={20}/></span>
                </Button>
            </div>
        </div>
    );
}
