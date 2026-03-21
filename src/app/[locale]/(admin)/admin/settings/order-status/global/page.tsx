"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useTransition } from "react";
import { getOrderStatusSettingsAction, updateOrderStatusSettingsAction } from "@/actions/basic-policy-actions";


type StatusConfig = {
    adminName?: string;
    mallName?: string;
    mallName_cn?: string; // Added for Global Settings
    use?: boolean;
};

type StatusSettingsMap = {
    [key: string]: StatusConfig;
};

// Define Groups and Statuses
const STATUS_GROUPS = [
    {
        name: "주문상태별\n설정",
        statuses: [
            { key: "deposit_wait", name: "입금대기" },
            { key: "payment_complete", name: "결제완료" },
            { key: "product_prep", name: "상품준비중" },
            { key: "purchase_order", name: "구매발주" },
            { key: "product_in", name: "상품입고" },
            { key: "product_out", name: "상품출고" },
            { key: "delivering", name: "배송중" },
            { key: "delivery_complete", name: "배송완료" },
            { key: "purchase_confirm", name: "구매확정" },
        ]
    },
    {
        name: "취소상태별\n설정",
        statuses: [
            { key: "auto_cancel", name: "자동취소" },
            { key: "soldout_cancel", name: "품절취소" },
            { key: "admin_cancel", name: "관리자취소" },
            { key: "customer_cancel_request", name: "고객요청취소" },
            { key: "payment_attempt", name: "결제시도" },
            { key: "customer_payment_stop", name: "고객결제중단" },
            { key: "payment_fail", name: "결제실패" },
            { key: "pg_check_needed", name: "PG확인요망" },
            { key: "return_request", name: "반품접수" },
            { key: "returning", name: "반송중" },
            { key: "return_hold", name: "반품보류" },
            { key: "return_complete", name: "반품회수완료" },
            { key: "exchange_request", name: "교환접수" },
            { key: "exchange_returning", name: "반송중" },
            { key: "exchange_reshipping", name: "재배송중" },
            { key: "exchange_hold", name: "교환보류" },
            { key: "exchange_complete", name: "교환완료" },
            { key: "refund_request", name: "환불접수" },
            { key: "refund_hold", name: "환불보류" },
            { key: "refund_complete", name: "환불완료" },
        ]
    }
];

export default function GlobalOrderStatusPage() {
    const [isPending, startTransition] = useTransition();
    const [statusSettings, setStatusSettings] = useState<StatusSettingsMap>({});
    
    // Need benefitSettings to pass to update action (action requires it) regarding previous implementation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [benefitSettings, setBenefitSettings] = useState<any>({});
    const [autoCancelDays, setAutoCancelDays] = useState(3);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOrderStatusSettingsAction();
            if (result.success && result.settings) {
                setStatusSettings((result.settings.statusSettings as unknown as StatusSettingsMap) || {});
                if (result.settings.benefitSettings) {
                    setBenefitSettings(result.settings.benefitSettings);
                }
                setAutoCancelDays(result.settings.autoCancelDays);
            }
        };
        fetchData();
    }, []);

    const handleSave = () => {
        startTransition(async () => {
             const result = await updateOrderStatusSettingsAction({
                 autoCancelDays,
                 statusSettings,
                 benefitSettings
             });
             if (result.success) {
                 alert("저장되었습니다.");
             } else {
                 alert(result.error || "저장 실패");
             }
        });
    };

    const handleNameChange = (key: string, value: string) => {
        setStatusSettings(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                mallName_cn: value
            }
        }));
    };

    const getVal = <K extends keyof StatusConfig>(key: string, field: K): StatusConfig[K] | undefined => {
        return statusSettings[key]?.[field];
    };

    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">해외몰 주문 상태 관리</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium"
                        onClick={handleSave}
                        disabled={isPending}
                    >
                        {isPending ? "저장 중..." : "저장"}
                    </Button>
                </div>
            </div>

            {/* Section */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800">주문 상태 관리</h2>
                
                <div className="border border-gray-300">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 bg-gray-100 text-center font-bold">
                            <tr>
                                <th scope="col" className="w-[100px] border-r border-b border-gray-300 py-3 bg-[#F5F7FA] whitespace-nowrap" rowSpan={2}>
                                    구분
                                </th>
                                <th scope="col" className="w-[150px] border-r border-b border-gray-300 py-3 bg-[#F5F7FA] whitespace-nowrap" rowSpan={2}>
                                    기준상태
                                </th>
                                <th scope="col" className="w-[100px] border-r border-b border-gray-300 py-3 bg-[#F5F7FA] whitespace-nowrap" rowSpan={2}>
                                    사용여부
                                </th>
                                <th scope="col" className="border-b border-gray-300 py-3 bg-[#F5F7FA] whitespace-nowrap" colSpan={2}>
                                    쇼핑몰페이지 노출이름
                                </th>
                            </tr>
                            <tr className="bg-[#F5F7FA]">
                                <th scope="col" className="border-r border-b border-gray-300 py-2 w-[150px]">
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-lg">🇰🇷</span> 기준몰
                                    </div>
                                </th>
                                <th scope="col" className="border-b border-gray-300 py-2">
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-lg">🇨🇳</span> 중문몰
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {STATUS_GROUPS.map((group) => (
                                group.statuses.map((status, index) => {
                                    // Logic to match screenshot exactly:
                                    // Some items show '-' instead of '사용' or '미사용'
                                    const forcedDash = ["purchase_order", "product_in", "product_out"]; 
                                    const isDash = forcedDash.includes(status.key);
                                    
                                    // logic from screenshot for 'payment_attempt': seems to have no usage text?
                                    // Actually in crop 2, '결제시도' has empty usage cell.
                                    const isEmptyUsage = status.key === "payment_attempt";

                                    const use = getVal(status.key, 'use');
                                    // default to true if undefined for display unless it's a dash item
                                    const isUse = use !== false; 
                                    
                                    let displayUse = isUse ? "사용" : "미사용";
                                    if (isDash) displayUse = "-";
                                    if (isEmptyUsage) displayUse = "";

                                    const mallName = getVal(status.key, 'mallName') || status.name;
                                    const mallName_cn = getVal(status.key, 'mallName_cn') || "";

                                    return (
                                        <tr key={status.key} className="bg-white border-b border-gray-200 hover:bg-gray-50 text-gray-600 text-center text-xs">
                                            {index === 0 && (
                                                <td 
                                                    className="border-r border-gray-300 font-bold text-gray-800 bg-[#F9FAFB]" 
                                                    rowSpan={group.statuses.length}
                                                >
                                                    <div className="flex items-center justify-center h-full py-4">
                                                        <span className="writing-mode-vertical-rl text-center tracking-widest whitespace-nowrap">
                                                            {group.name.replace('\n', '')}
                                                        </span>
                                                    </div>
                                                </td>
                                            )}
                                            <td className="border-r border-gray-200 py-4">
                                                {status.name}
                                            </td>
                                            <td className="border-r border-gray-200 py-4">
                                                {displayUse}
                                            </td>
                                            <td className="border-r border-gray-200 px-4 py-3 text-left pl-10">
                                                {mallName}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Input 
                                                    className="h-8 text-xs w-full border-gray-300 rounded-sm" 
                                                    value={mallName_cn}
                                                    onChange={(e) => handleNameChange(status.key, e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Buttons (Scroll to top/down) */}
                    </div>
    );
}
