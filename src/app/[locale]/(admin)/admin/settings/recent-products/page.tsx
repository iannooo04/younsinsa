"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Youtube, ArrowUp, ArrowDown, BookOpen } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { getRecentProductsSettingsAction, updateRecentProductsSettingsAction } from "@/actions/basic-policy-actions";

export default function RecentProductsSettingsPage() {
    const [isPending, startTransition] = useTransition();
    const [expirationHours, setExpirationHours] = useState(24);
    const [maxCount, setMaxCount] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getRecentProductsSettingsAction();
            if (result.success && result.settings) {
                setExpirationHours(result.settings.expirationHours);
                setMaxCount(result.settings.maxCount);
            }
        };
        fetchData();
    }, []);

    const handleSave = () => {
        startTransition(async () => {
             const result = await updateRecentProductsSettingsAction({
                 expirationHours,
                 maxCount
             });
             if (result.success) {
                 alert("저장되었습니다.");
             } else {
                 alert(result.error || "저장 실패");
             }
        });
    };

    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Breadcrumb */}
            <div className="text-xs text-gray-500 mb-2">
                기본설정 &gt; 상품 정책 &gt; <span className="font-bold text-gray-700 underline decoration-gray-700">최근 본 상품 설정</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">최근 본 상품 설정</h1>
                <Button 
                    className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium"
                    onClick={handleSave}
                    disabled={isPending}
                >
                    {isPending ? "저장 중..." : "저장"}
                </Button>
            </div>

            {/* Settings Section */}
            <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">최근 본 상품 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border-t border-gray-400">
                    {/* Time Setting */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            시간 설정
                        </div>
                        <div className="p-4 flex items-center gap-2">
                            <Input 
                                type="number"
                                className="w-40 h-8" 
                                value={expirationHours}
                                onChange={(e) => setExpirationHours(Number(e.target.value))}
                            />
                            <span className="text-gray-700 whitespace-nowrap">시간</span>
                        </div>
                    </div>

                    {/* Max Quantity Setting */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            최대 수량
                        </div>
                        <div className="p-4 flex items-center gap-2">
                             <Input 
                                type="number"
                                className="w-40 h-8" 
                                value={maxCount}
                                onChange={(e) => setMaxCount(Number(e.target.value))}
                            />
                            <span className="text-gray-700 whitespace-nowrap">개 상품</span>
                        </div>
                    </div>
                </div>
            </div>

             {/* Bottom Info */}
             <div className="border border-gray-200 p-6 space-y-4 pt-8 border-l-0 border-r-0 border-b-0 mt-12 bg-white">
                <div className="flex items-center gap-1 text-blue-500 font-bold mb-2">
                    <BookOpen size={16} />
                    <span>안내</span>
                </div>
                <div className="text-xs text-gray-500 space-y-4 leading-relaxed">
                    <div className="space-y-2">
                        <p className="font-bold text-gray-700 text-sm">[최대수량] 최근 본 상품의 최대수량은 무엇인가요?</p>
                        <p>· 최근 본 상품의 유지 개수를 설정하는 것입니다. 최근 본 상품의 최대 수량은 최대 50개까지 설정할 수 있습니다.</p>
                        <p>· 최근 본 상품은 방문자가 최근 관심을 가진 상품정보를 쇼핑몰에 머무는 동안 지속적으로 보여주기 때문에 구매효과를 이끌어낼 수 있습니다.</p>
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
