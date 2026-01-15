"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Youtube, ArrowUp, ArrowDown } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { getMallUsageSettingsAction, updateMallUsageSettingsAction } from "@/actions/management-policy-actions";

export default function MallUsageSettingsPage() {
    const [isPending, startTransition] = useTransition();

    const [mallStatus, setMallStatus] = useState("open");
    const [mobileMall, setMobileMall] = useState("use");
    const [guestPurchase, setGuestPurchase] = useState("allow");
    const [cartStoragePeriod, setCartStoragePeriod] = useState(7);
    const [soldOutDisplay, setSoldOutDisplay] = useState("display");
    const [memberAutoLogoutType, setMemberAutoLogoutType] = useState("default");
    const [memberAutoLogoutTime, setMemberAutoLogoutTime] = useState(60);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getMallUsageSettingsAction();
            if (result.success && result.settings) {
                setMallStatus(result.settings.mallStatus);
                setMobileMall(result.settings.mobileMall);
                setGuestPurchase(result.settings.guestPurchase);
                setCartStoragePeriod(result.settings.cartStoragePeriod);
                setSoldOutDisplay(result.settings.soldOutDisplay);
                setMemberAutoLogoutType(result.settings.memberAutoLogoutType);
                setMemberAutoLogoutTime(result.settings.memberAutoLogoutTime || 60);
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

            {/* Section 1: Mall Operation Status */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">쇼핑몰 운영설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">쇼핑몰 운영상태</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup value={mallStatus} onValueChange={setMallStatus} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="open" id="mall-open" />
                                    <Label htmlFor="mall-open" className="font-normal cursor-pointer">정상운영</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="construction" id="mall-construction" />
                                    <Label htmlFor="mall-construction" className="font-normal cursor-pointer">공사중</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-gray-500 mt-1">
                                * '공사중' 설정 시 쇼핑몰 접속 시 '공사중' 안내 페이지가 노출되며 쇼핑몰 이용이 제한됩니다. (단, 운영자/부운영자는 접속 가능)
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">모바일 쇼핑몰 설정</div>
                        <div className="p-4">
                            <RadioGroup value={mobileMall} onValueChange={setMobileMall} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="use" id="mobile-use" />
                                    <Label htmlFor="mobile-use" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="not-use" id="mobile-not-use" />
                                    <Label htmlFor="mobile-not-use" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Purchase Settings */}
            <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">구매/결제 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t border-gray-400">
                     <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">비회원 구매</div>
                        <div className="p-4">
                            <RadioGroup value={guestPurchase} onValueChange={setGuestPurchase} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="allow" id="guest-allow" />
                                    <Label htmlFor="guest-allow" className="font-normal cursor-pointer">가능</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="disallow" id="guest-disallow" />
                                    <Label htmlFor="guest-disallow" className="font-normal cursor-pointer">불가능 (회원전용)</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">장바구니 보관기간</div>
                        <div className="p-4 flex items-center gap-2">
                            <span className="text-sm">상품 담은 후</span>
                            <select 
                                className="h-8 border border-gray-300 rounded-sm text-sm px-2"
                                value={cartStoragePeriod}
                                onChange={(e) => setCartStoragePeriod(Number(e.target.value))}
                            >
                                <option value="7">7일</option>
                                <option value="15">15일</option>
                                <option value="30">30일</option>
                                <option value="90">90일</option>
                            </select>
                            <span className="text-sm">동안 보관</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Display Settings */}
             <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">상품 진열 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t border-gray-400">
                     <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">품절 상품 진열</div>
                        <div className="p-4 space-y-2">
                             <RadioGroup value={soldOutDisplay} onValueChange={setSoldOutDisplay} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="display" id="soldout-display" />
                                    <Label htmlFor="soldout-display" className="font-normal cursor-pointer">진열함 (품절 아이콘 표시)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="hide" id="soldout-hide" />
                                    <Label htmlFor="soldout-hide" className="font-normal cursor-pointer">진열안함 (목록에서 숨김)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="back" id="soldout-back" />
                                    <Label htmlFor="soldout-back" className="font-normal cursor-pointer">진열 리스트 맨 뒤로 보냄</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Member Auto Logout */}
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
