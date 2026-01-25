"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Youtube, ArrowUp, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useTransition, use } from "react";
import { getOverseasShippingSettingsAction, updateOverseasShippingSettingsAction } from "@/actions/basic-policy-actions";

type Props = {
    params: Promise<{
        code: string;
    }>;
};

interface ShippingCondition {
    rateStandard: string;
    useInsurance: boolean;
    boxWeight: number | string;
    countryGroupCount: number;
    // New fields based on the image
    defaultWeight?: number | string; // 기본 포장 입력값
    additionalFee?: number | string; // 추가 배송요금
    additionalFeeType?: "won" | "percent"; // 추가 배송요금 타입
    shippingConditionName?: string; // 자체 설정 배송비 조건명 (if needed for custom)
}

interface ShippingConditions {
    [key: string]: ShippingCondition;
}

const MALL_INFO: Record<string, { name: string; flag: string }> = {
    "en_US": { name: "영문몰", flag: "🇺🇸" },
    "zh_CN": { name: "중문몰", flag: "🇨🇳" },
    "ja_JP": { name: "일문몰", flag: "🇯🇵" }
};

export default function EditOverseasShippingConditionPage({ params }: Props) {
    const { code } = use(params);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [allConditions, setAllConditions] = useState<ShippingConditions>({});
    const [formData, setFormData] = useState<ShippingCondition>({
        rateStandard: "ems",
        useInsurance: false,
        boxWeight: 0,
        countryGroupCount: 1,
        defaultWeight: 0,
        additionalFee: 0,
        additionalFeeType: "won"
    });

    const mallInfo = MALL_INFO[code];

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOverseasShippingSettingsAction();
            if (result.success && result.settings && result.settings.conditions) {
                const conditions = result.settings.conditions as unknown as ShippingConditions;
                setAllConditions(conditions);
                if (conditions[code]) {
                    setFormData(conditions[code]);
                }
            }
        };
        fetchData();
    }, [code]);

    const handleSave = () => {
        if (!code) return;

        startTransition(async () => {
            const updatedConditions = {
                ...allConditions,
                [code]: formData
            };

            const result = await updateOverseasShippingSettingsAction({ 
                conditions: updatedConditions as unknown as Record<string, Record<string, string | number | boolean>> 
            });

            if (result.success) {
                alert("저장되었습니다.");
                router.back();
            } else {
                alert(result.error || "저장 실패");
            }
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateField = (field: keyof ShippingCondition, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (!mallInfo) {
        return <div className="p-6">존재하지 않는 상점 코드입니다.</div>;
    }

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="space-y-4">
                <div className="text-xs text-gray-500">
                    기본설정 &gt; 해외상점 &gt; 해외 배송조건 설정
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-900">
                    <h1 className="text-xl font-bold text-gray-900">해외 배송조건 설정</h1>
                    <Button 
                        className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium"
                        onClick={handleSave}
                        disabled={isPending}
                    >
                        {isPending ? "저장 중..." : "저장"}
                    </Button>
                </div>
            </div>

            {/* Form Table */}
            <div className="border border-t-2 border-t-gray-700 border-gray-300">
                {/* 상점명 */}
                <div className="flex border-b border-gray-200">
                    <div className="w-48 bg-[#F9F9F9] p-4 flex items-center font-bold text-gray-700">
                        상점명
                    </div>
                    <div className="p-4 flex items-center gap-2">
                        <span className="text-lg">{mallInfo.flag}</span>
                        <span className="font-bold text-gray-800">{mallInfo.name}</span>
                    </div>
                </div>

                {/* 기본 포장 입력값 */}
                <div className="flex border-b border-gray-200">
                    <div className="w-48 bg-[#F9F9F9] p-4 font-bold text-gray-700 pt-6">
                        기본 포장 입력값
                    </div>
                    <div className="p-4 space-y-2 flex-1">
                        <div className="flex items-center gap-4">
                            <span className="w-20 text-gray-600">무게 설정</span>
                            <div className="flex items-center gap-2">
                                <Input 
                                    className="w-24 h-8 text-right" 
                                    value={formData.defaultWeight || 0}
                                    onChange={(e) => updateField("defaultWeight", e.target.value)}
                                    type="number"
                                />
                                <span className="text-gray-600">kg (0.01kg 단위로 입력 가능)</span>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                            <p className="flex gap-1">
                                <span className="bg-gray-500 text-white w-3 h-3 flex items-center justify-center text-[10px] rounded-xs mt-0.5">!</span>
                                <span>상품 추가시 해당 값을 디폴트로 세팅합니다.</span>
                            </p>
                            <p className="pl-4">무게의 경우, 각 상품등록시 상품별 입력된 상품무게가 우선되며, 해당값이 없을 경우, 위에 설정된 무게로 계산합니다.</p>
                        </div>
                    </div>
                </div>

                {/* 박스 무게 */}
                <div className="flex border-b border-gray-200">
                    <div className="w-48 bg-[#F9F9F9] p-4 font-bold text-gray-700 flex items-center">
                        박스 무게
                    </div>
                    <div className="p-4 space-y-2 flex-1">
                         <div className="flex items-center gap-2">
                            <Input 
                                className="w-24 h-8 text-right" 
                                value={formData.boxWeight}
                                onChange={(e) => updateField("boxWeight", e.target.value)}
                                type="number"
                            />
                            <span className="text-gray-600">kg (0.01kg 단위로 입력 가능)</span>
                        </div>
                         <div className="text-xs text-gray-500">
                            <p className="flex gap-1">
                                <span className="bg-gray-500 text-white w-3 h-3 flex items-center justify-center text-[10px] rounded-xs mt-0.5">!</span>
                                <span>배송료 계산시 배송비 조건이 상품 무게일 경우 상품의 최종 합산 무게에 해당 박스 무게를 더합니다.</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* 배송비 기준 설정 */}
                <div className="flex border-b border-gray-200">
                    <div className="w-48 bg-[#F9F9F9] p-4 font-bold text-gray-700 pt-6">
                        배송비 기준 설정
                    </div>
                    <div className="p-4 space-y-4 flex-1">
                        <RadioGroup 
                            value={formData.rateStandard} 
                            onValueChange={(val) => updateField("rateStandard", val)}
                            className="flex flex-col gap-3"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="custom" id="custom" />
                                <Label htmlFor="custom" className="font-normal cursor-pointer">자체 설정 - 배송비조건 사용</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="ems" id="ems" />
                                <Label htmlFor="ems" className="font-normal cursor-pointer">우체국 EMS 표준 요율표 사용</Label>
                            </div>
                        </RadioGroup>

                        {formData.rateStandard === 'ems' && (
                            <div className="bg-gray-50 p-4 rounded-sm space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-700 font-medium whitespace-nowrap">추가 배송요금 부여</span>
                                    <Input 
                                        className="w-24 h-8 text-right" 
                                        value={formData.additionalFee || 0}
                                        onChange={(e) => updateField("additionalFee", e.target.value)}
                                        type="number"
                                    />
                                    <Select 
                                        value={formData.additionalFeeType || "won"} 
                                        onValueChange={(val) => updateField("additionalFeeType", val)}
                                    >
                                        <SelectTrigger className="w-16 h-8">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="won">원</SelectItem>
                                            <SelectItem value="percent">%</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="text-xs text-gray-500">
                                    <p className="flex gap-1">
                                        <span className="bg-gray-500 text-white w-3 h-3 flex items-center justify-center text-[10px] rounded-xs mt-0.5">!</span>
                                        <span>자동 책정된 우체국 EMS 배송비에서 해당 금액만큼 추가 청구됩니다.</span>
                                    </p>
                                </div>
                            </div>
                        )}
                        
                         {formData.rateStandard === 'custom' && (
                              <div className="bg-gray-50 p-4 rounded-sm">
                                  {/* Placeholder for custom settings if needed, based on image only EMS section is detailed */}
                                  <span className="text-gray-500 text-xs">배송비조건 관리에서 설정한 무게별 배송비 조건을 따릅니다.</span>
                              </div>
                         )}
                    </div>
                </div>

                {/* 해외배송 보험료 */}
                <div className="flex">
                    <div className="w-48 bg-[#F9F9F9] p-4 font-bold text-gray-700 pt-6">
                        해외배송 보험료
                    </div>
                    <div className="p-4 space-y-3 flex-1">
                         <RadioGroup 
                            value={formData.useInsurance ? "true" : "false"} 
                            onValueChange={(val) => updateField("useInsurance", val === "true")}
                            className="flex gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="insurance-on" />
                                <Label htmlFor="insurance-on" className="font-normal cursor-pointer">청구</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="insurance-off" />
                                <Label htmlFor="insurance-off" className="font-normal cursor-pointer">청구하지 않음</Label>
                            </div>
                        </RadioGroup>
                         <div className="text-xs text-gray-500 leading-relaxed">
                            <p className="flex gap-1 items-start">
                                <span className="bg-gray-500 text-white w-3 h-3 min-w-[12px] flex items-center justify-center text-[10px] rounded-xs mt-0.5">!</span>
                                <span>'해외배송 보험료'란, EMS를 이용하여 해외배송시 분리/파손되는 상품에 대하여 우체국에서 해당 상품가에 따라 보상받을 수 있는 서비스로 배송비와 별개로 고객이 부담하는 비용입니다.</span>
                            </p>
                             <p className="pl-4 text-gray-400">&gt; 보험료 기본요금 : 최초 2,800원 청구(~114,300원 이하), 114,300원 단위로 초과시마다 550원 추가 청구</p>
                        </div>
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
