"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, Youtube, ArrowUp, ArrowDown, BookOpen, ExternalLink, Image as ImageIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useTransition } from "react";
import { getOverseasShippingSettingsAction, updateOverseasShippingSettingsAction } from "@/actions/basic-policy-actions";

interface ShippingCondition {
    rateStandard: string;
    useInsurance: boolean;
    boxWeight: number | string;
    countryGroupCount: number;
}

interface ShippingConditions {
    [key: string]: ShippingCondition;
}

export default function OverseasShippingConditionPage() {
    const [isPending, startTransition] = useTransition();
    const [conditions, setConditions] = useState<ShippingConditions>({
        "en_US": { rateStandard: "ems", useInsurance: false, boxWeight: 0.0, countryGroupCount: 1 },
        "zh_CN": { rateStandard: "ems", useInsurance: false, boxWeight: 0.0, countryGroupCount: 1 },
        "ja_JP": { rateStandard: "ems", useInsurance: false, boxWeight: 0.0, countryGroupCount: 1 }
    });


    useEffect(() => {
        const fetchData = async () => {
             const result = await getOverseasShippingSettingsAction();
             if (result.success && result.settings && result.settings.conditions) {
                 setConditions(result.settings.conditions as unknown as ShippingConditions);
             }
        };
        fetchData();
    }, []);

    const handleSave = () => {
        startTransition(async () => {
            const result = await updateOverseasShippingSettingsAction({ conditions });
            if (result.success) {
                alert("저장되었습니다.");
            } else {
                alert(result.error || "저장 실패");
            }
        });
    };

    const handleConditionChange = (mallCode: string, field: keyof ShippingCondition, value: any) => {
        setConditions(prev => ({
            ...prev,
            [mallCode]: {
                ...prev[mallCode],
                [field]: value
            }
        }));
    };

    const malls = [
        { code: "en_US", name: "영문몰", flag: "🇺🇸", color: "text-blue-600" },
        { code: "zh_CN", name: "중문몰", flag: "🇨🇳", color: "text-red-600" },
        { code: "ja_JP", name: "일문몰", flag: "🇯🇵", color: "text-red-500" },
    ];

    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">해외 배송조건 관리</h1>
                <Button 
                    className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium"
                    onClick={handleSave}
                    disabled={isPending}
                >
                    {isPending ? "저장 중..." : "저장"}
                </Button>
            </div>

            {/* Table Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">해외 배송조건 관리</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border border-gray-300 border-b-0">
                    <table className="w-full text-sm text-center">
                        <thead className="bg-[#A3A3A3] text-white font-bold">
                            <tr>
                                <th className="py-2 px-4 border-r border-gray-400 w-32">상점 구분</th>
                                <th className="py-2 px-4 border-r border-gray-400">배송비기준</th>
                                <th className="py-2 px-4 border-r border-gray-400 w-32">보험료 청구</th>
                                <th className="py-2 px-4 border-r border-gray-400 w-32">박스부여무게</th>
                                <th className="py-2 px-4 border-r border-gray-400 w-32">배송국가그룹 수</th>
                                <th className="py-2 px-4 w-24">관리</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {malls.map((mall) => {
                                const condition = conditions[mall.code] || { rateStandard: "ems", useInsurance: false, boxWeight: 0, countryGroupCount: 1 };
                                return (
                                    <tr key={mall.code} className="border-b border-gray-200">
                                        <td className="py-4 px-4 border-r border-gray-200">
                                            <div className="flex items-center justify-center gap-2 font-bold">
                                                <span className="text-lg">{mall.flag}</span>
                                                <span>{mall.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 border-r border-gray-200">
                                            <Select 
                                                value={condition.rateStandard} 
                                                onValueChange={(val) => handleConditionChange(mall.code, "rateStandard", val)}
                                            >
                                                <SelectTrigger className="w-full h-8 border-gray-300">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ems">우체국 EMS 표준 요율표 사용</SelectItem>
                                                    <SelectItem value="custom">직접 설정</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="py-4 px-4 border-r border-gray-200">
                                             <Select 
                                                value={condition.useInsurance ? "true" : "false"} 
                                                onValueChange={(val) => handleConditionChange(mall.code, "useInsurance", val === "true")}
                                            >
                                                <SelectTrigger className="w-full h-8 border-gray-300">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="true">O</SelectItem>
                                                    <SelectItem value="false">X</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="py-4 px-4 border-r border-gray-200">
                                             <div className="flex items-center gap-1">
                                                <Input 
                                                    value={condition.boxWeight} 
                                                    onChange={(e) => handleConditionChange(mall.code, "boxWeight", e.target.value)}
                                                    className="w-full h-8 text-right"
                                                    type="number"
                                                    step="0.01"
                                                />
                                                <span>kg</span>
                                             </div>
                                        </td>
                                        <td className="py-4 px-4 border-r border-gray-200 space-y-1">
                                            <div>{condition.countryGroupCount}</div>
                                            <Button variant="outline" size="sm" className="h-6 text-xs px-2 bg-white border-gray-300 text-gray-600 font-normal rounded-sm">
                                                그룹보기
                                            </Button>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Button variant="outline" size="sm" className="h-7 px-3 bg-white border-gray-300 text-gray-600 font-normal rounded-sm">
                                                관리
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Keeping it for now although dynamic list is small) */}
                <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" className="w-8 h-8 p-0 bg-gray-500 text-white hover:bg-gray-600 rounded-sm">1</Button>
                    </div>
                </div>
            </div>

            {/* Bottom Info */}
             <div className="border border-gray-200 p-6 space-y-6 pt-8 border-l-0 border-r-0 border-b-0 mt-12 bg-white">
                <div className="flex items-center gap-1 text-blue-500 font-bold mb-2">
                    <BookOpen size={16} />
                    <span>안내</span>
                </div>
                <div className="text-xs text-gray-500 space-y-8 leading-relaxed">
                    <div className="space-y-2">
                        <p className="font-bold text-gray-700 text-sm">· 해외배송비를 설정하기 위해서는 무엇부터 설정해야 하나요?</p>
                        <p>해외 배송을 설정하기 위해서는 대략적으로 다음의 절차를 진행하셔야 합니다.</p>
                        <ol className="list-decimal list-inside space-y-2 pl-2">
                            <li>배송업체를 선택 및 사용처리. <span className="font-bold">(기본설정 &gt; 배송정책 &gt; 배송업체 관리)</span></li>
                            <li>
                                배송업체에 따른 배송비를 확인한 후, 기본 배송비조건 관리에서 해외몰에 맞는 무게별 배송비를 등록합니다. <span className="font-bold">(기본설정 &gt; 배송정책 &gt; 배송비조건 관리)</span>
                                <p className="pl-5 pt-1 text-gray-400">(우체국EMS 자동요율표를 사용하는 업체는 자동설정을 사용하시면 됩니다.)</p>
                            </li>
                            <li>해외 배송그룹을 등록합니다 <span className="font-bold">(기본설정 &gt; 해외상점 &gt; 해외 배송그룹 관리)</span></li>
                            <li><span className="font-bold">해외 배송조건</span> 관리에서 상황에 맞는 설정을 모두 진행합니다.</li>
                            <li><span className="font-bold">상품마다 상품무게를 입력합니다.</span> (모든 상품무게가 동일하다면 기본포장 입력값을 활용하세요)</li>
                        </ol>
                        <p className="pt-2">위의 순서는 편의를 위해 일반적인 방법을 간략하게 알려드린 것으로, 각 업체별 상황에 맞게 진행해주시면 됩니다.</p>
                        <div className="flex items-center gap-1 text-gray-400 pt-1">
                            <ImageIcon size={14} /> <span>1484686571945727.png</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="font-bold text-gray-700 text-sm">· 기본 포장 입력값은 어떻게 적용되나요?</p>
                        <p>해외 배송은 기본적으로 무게를 기준으로 진행합니다. 이 때, 상품의 무게가 없다면, 배송비를 책정하기가 어렵습니다.</p>
                        <p>따라서, 상품의 무게가 없는 경우에는 이를 방지하기 위하여 "기본포장 입력값"에 입력된 무게가 상품의 기본무게로 적용됩니다.</p>
                        <p>(상품의 무게가 입력된 경우에는, 해당 상품의 무게가 적용되며 기본포장 입력값의 무게는 적용되지 않습니다.</p>
                    </div>

                    <div className="space-y-2">
                        <p className="font-bold text-gray-700 text-sm">· 해외 배송비를 설정하기 어려운데 쉬운 방법이 없을까요?</p>
                        <p>해외배송시 많이 이용하는 배송업체인 우체국 EMS에 대한 자동 요율표를 사용하실 수 있습니다.</p>
                        <p className="font-bold text-red-500">· '우체국 EMS 표준 요율표 사용' 조건을 선택할 경우에는, 별도의 해외배송비 설정없이 자동으로 해외배송비가 책정됩니다.</p>
                        <div className="flex items-center font-bold">
                            <span className="text-red-500">· 해당 금액은 EMS 요금표의 비서류 요금표가 적용되어 있습니다.</span>
                            <span className="ml-1 text-gray-700 flex items-center gap-0.5 cursor-pointer hover:text-gray-900 border border-gray-300 rounded-sm px-1 py-0.5 text-[10px] h-4 bg-white">
                                <ExternalLink size={10} /> EMS 요금표 확인하기
                            </span>
                        </div>
                        <p>또한, 자동으로 책정되는 EMS요율표에 대해서 각 상점별 상황에 맞게 특정 금액(비율)으로 배송비를 추가로 부여(차감)하여 해외배송비를 받을 수 있습니다.</p>
                    </div>

                     <div className="space-y-2">
                        <p className="font-bold text-gray-700 text-sm">· 배송가능 국가 선택이 무엇인가요?</p>
                        <p>해외 배송을 보낼 수 있는 국가를 선택하셔야 합니다. 보통 해외배송업체의 경우, 나라보다는 국가그룹으로 배송비를 청구함으로 국가그룹을 등록하시면 됩니다.</p>
                        <p>배송 국가 그룹으로 설정된 국가는 주문서 작성페이지 국가 선택칸에 표시됩니다. (설정되지 않는 국가는 고객이 선택할 수 없어 주문이 이루어지지 않습니다.)</p>
                    </div>

                     <div className="space-y-2">
                        <p className="font-bold text-gray-700 text-sm">· 배송가능 국가 선택에서 배송비조건에 아무런 값도 나오지 않는데 어떻게 해야 하나요?</p>
                        <p>배송비조건은 기본설정에서 등록하는 배송비조건 중 “무게별배송비”로 등록된 건에 한해서 선택이 가능합니다.</p>
                        <p>따라서 배송비 조건설정을 위하여 [기본설정 &gt; 배송 정책 &gt; 배송비조건 관리] 메뉴에서 미리 무게별배송비를 등록해놓으셔야 합니다.</p>
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
