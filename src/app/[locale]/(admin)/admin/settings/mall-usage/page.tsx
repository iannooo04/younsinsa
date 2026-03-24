"use client";

import { Button } from "@/components/ui/button";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { getMallUsageSettingsAction, updateMallUsageSettingsAction } from "@/actions/management-policy-actions";

export default function MallUsageSettingsPage() {
    const [isPending, startTransition] = useTransition();

    // 4. Member Auto Logout
    const [memberAutoLogoutType, setMemberAutoLogoutType] = useState("default");
    const [memberAutoLogoutTime, setMemberAutoLogoutTime] = useState(60);

    // Legacy / Other (Still needed for API compatibility or future use, though UI might hide some)
    const [mallStatus, setMallStatus] = useState("open"); 
    const [mobileMall, setMobileMall] = useState("use");
    const [guestPurchase, setGuestPurchase] = useState("allow");
    const [cartStoragePeriod, setCartStoragePeriod] = useState(7);
    const [soldOutDisplay, setSoldOutDisplay] = useState("display");
    const [under14Restriction, setUnder14Restriction] = useState("allow");
    const [pcIntro, setPcIntro] = useState(false);
    const [mobileIntro, setMobileIntro] = useState(false);
    const [mileageCouponDouble, setMileageCouponDouble] = useState("allow");

    useEffect(() => {
        const fetchData = async () => {
            const result = await getMallUsageSettingsAction();
            if (result.success && result.settings) {
                setMallStatus(result.settings.mallStatus);
                setMobileMall(result.settings.mobileMall);
                setCartStoragePeriod(result.settings.cartStoragePeriod);
                setSoldOutDisplay(result.settings.soldOutDisplay);
                setGuestPurchase(result.settings.guestPurchase || "allow");
                setUnder14Restriction(result.settings.under14Restriction || "allow");
                setMemberAutoLogoutType(result.settings.memberAutoLogoutType);
                setMemberAutoLogoutTime(result.settings.memberAutoLogoutTime || 60);
                setPcIntro(result.settings.pcIntro ?? false);
                setMobileIntro(result.settings.mobileIntro ?? false);
                setMileageCouponDouble(result.settings.mileageCouponDouble || "allow");
            }
        };
        fetchData();
    }, []);

    const handleSave = () => {
        startTransition(async () => {
            const result = await updateMallUsageSettingsAction({
                mallStatus,
                mobileMall,
                guestPurchase,
                cartStoragePeriod,
                soldOutDisplay,
                memberAutoLogoutType,
                memberAutoLogoutTime,
                under14Restriction,
                pcIntro,
                mobileIntro,
                mileageCouponDouble,
            });
            if (result.success) {
                alert("저장되었습니다.");
            } else {
                alert(result.error || "저장 실패");
            }
        });
    };

    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-32">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">쇼핑몰 이용 설정</h1>
                <Button 
                    className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium"
                    onClick={handleSave}
                    disabled={isPending}
                >
                    {isPending ? "저장 중..." : "설정 저장"}
                </Button>
            </div>

            {/* 4. Member Auto Logout */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">회원의 자동 로그아웃</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">자동 로그아웃</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup value={memberAutoLogoutType} onValueChange={setMemberAutoLogoutType} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="default" id="logout-default" />
                                    <Label htmlFor="logout-default" className="font-normal cursor-pointer">기본설정 (회원이 브라우저를 닫거나 수동 로그아웃 할 때 로그아웃)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="custom" id="logout-custom" />
                                    <Label htmlFor="logout-custom" className="font-normal cursor-pointer flex items-center gap-1">
                                        로그인 후 
                                        <select 
                                            className="h-7 border border-gray-300 rounded-sm text-xs mx-1 w-16 px-1"
                                            value={memberAutoLogoutTime}
                                            onChange={(e) => setMemberAutoLogoutTime(Number(e.target.value))}
                                            disabled={memberAutoLogoutType === "default"}
                                        >
                                            <option value={30}>30</option>
                                            <option value={60}>60</option>
                                            <option value={120}>120</option>
                                        </select>
                                        분간 클릭이 없으면 자동 로그아웃 함
                                    </Label>
                                </div>
                            </RadioGroup>
                             <p className="text-xs text-red-500 font-medium flex items-start gap-1 mt-1">
                                <span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                기본설정 시 모든 브라우저를 닫거나 수동으로 로그아웃을 한 경우 로그아웃 됩니다. 또한, 보안상의 이유로 일정 시간이 경과 되면 자동으로 로그아웃 됩니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

                     </div>
    );
}
