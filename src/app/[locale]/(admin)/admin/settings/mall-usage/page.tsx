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

    // 1. Intro Page Settings
    const [pcIntro, setPcIntro] = useState(false);
    const [mobileIntro, setMobileIntro] = useState(false);

    // 2. Product Purchase Authority
    const [guestPurchase, setGuestPurchase] = useState("allow"); // allow(제한없음), disallow(회원만 가능)
    const [under14Restriction, setUnder14Restriction] = useState("unused");

    // 3. Mileage / Coupon Double Use
    const [mileageCouponDouble, setMileageCouponDouble] = useState("allow");

    // 4. Member Auto Logout
    const [memberAutoLogoutType, setMemberAutoLogoutType] = useState("default");
    const [memberAutoLogoutTime, setMemberAutoLogoutTime] = useState(60);

    // Legacy / Other (Still needed for API compatibility or future use, though UI might hide some)
    const [mallStatus, setMallStatus] = useState("open"); 
    const [mobileMall, setMobileMall] = useState("use");
    const [cartStoragePeriod, setCartStoragePeriod] = useState(7);
    const [soldOutDisplay, setSoldOutDisplay] = useState("display");

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
                
                // New fields
                setPcIntro(result.settings.pcIntro || false);
                setMobileIntro(result.settings.mobileIntro || false);
                setUnder14Restriction(result.settings.under14Restriction || "unused");
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
                pcIntro,
                mobileIntro,
                under14Restriction,
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

            {/* 1. Intro Page Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">인트로페이지 사용 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">사용설정</div>
                        <div className="p-4 space-y-3">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        id="pcIntro" 
                                        checked={pcIntro} 
                                        onCheckedChange={(c) => setPcIntro(!!c)} 
                                        className="rounded-sm border-gray-300"
                                    />
                                    <Label htmlFor="pcIntro" className="font-normal text-gray-700">PC 인트로페이지</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        id="mobileIntro" 
                                        checked={mobileIntro} 
                                        onCheckedChange={(c) => setMobileIntro(!!c)} 
                                        className="rounded-sm border-gray-300"
                                    />
                                    <Label htmlFor="mobileIntro" className="font-normal text-gray-700">모바일 인트로페이지</Label>
                                </div>
                            </div>
                            <p className="text-xs text-red-500 font-medium flex items-start gap-1 mt-1">
                                <span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                인트로페이지 접속권한 설정에 따라 전체 쇼핑몰 접속 권한이 자동 변경됩니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Product Purchase Authority (Guest Purchase) */}
            <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">상품 구매 권한</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t border-gray-400">
                     <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">상품 구매 권한</div>
                        <div className="p-4">
                            <RadioGroup value={guestPurchase} onValueChange={setGuestPurchase} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="allow" id="purchase-allow" />
                                    <Label htmlFor="purchase-allow" className="font-normal cursor-pointer">제한 없음</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="disallow" id="purchase-disallow" />
                                    <Label htmlFor="purchase-disallow" className="font-normal cursor-pointer">회원만 가능</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 pt-6">만14세 미만<br/>비회원 주문 제한</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup value={under14Restriction} onValueChange={setUnder14Restriction} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="under14-unused" />
                                    <Label htmlFor="under14-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="agree" id="under14-agree" />
                                    <Label htmlFor="under14-agree" className="font-normal cursor-pointer">'만 14세 이상입니다.' 동의 항목 사용</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="auth" id="under14-auth" />
                                    <Label htmlFor="under14-auth" className="font-normal cursor-pointer">주문자 본인인증 서비스 사용</Label>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-1 py-0.5">!</span>
                                    <span className="text-xs text-gray-500">본인인증 후 주문자가 만14세 미만일 경우, 비회원주문이 불가합니다.</span>
                                </div>
                            </RadioGroup>
                            
                            <div className="space-y-1 mt-2">
                                <p className="text-xs text-red-500 font-medium flex items-start gap-1">
                                    <span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                    개인정보 보호법에 따라 만 14세 미만의 아동의 개인정보 수집/이용 시 법정대리인의 동의 확인 후 개인정보 수집이 가능합니다. <a href="#" className="text-blue-500 underline">[자세히보기]</a>
                                </p>
                                <p className="text-xs text-gray-500 flex items-start gap-1 pl-1">
                                    <span className="w-3 h-3 flex items-center justify-center bg-gray-500 text-white text-[10px] rounded-sm mt-0.5">!</span>
                                    <span>
                                        본인인증 인증 서비스(아이핀인증/휴대폰인증)가 적용되어 있어야만 '본인인증 서비스 사용' 설정 시 본인인증 서비스가 실행됩니다.<br/>
                                        <a href="#" className="text-blue-500 underline">휴대폰인증 설정{'>'}</a> <a href="#" className="text-blue-500 underline">아이핀인증 설정{'>'}</a>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Mileage / Coupon Double Use Settings */}
            <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">마일리지 / 쿠폰 중복사용 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t border-gray-400">
                     <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">마일리지 / 쿠폰<br/>중복사용 설정</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup value={mileageCouponDouble} onValueChange={setMileageCouponDouble} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="allow" id="double-allow" />
                                    <Label htmlFor="double-allow" className="font-normal cursor-pointer">마일리지와 쿠폰 동시 사용 제한 없음. (허용)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="disallow" id="double-disallow" />
                                    <Label htmlFor="double-disallow" className="font-normal cursor-pointer">마일리지와 쿠폰 동시 사용 불가</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
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
