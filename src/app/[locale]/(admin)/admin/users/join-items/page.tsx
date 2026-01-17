"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { HelpCircle, Youtube, ChevronUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import { getMemberJoinItemSettingsAction, updateMemberJoinItemSettingsAction } from "@/actions/member-policy-actions";

export default function MemberJoinItemsPage() {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<any>({
        memberType: { personal: true, business: false },
        items: {
            id: { use: true, required: true, min: 4, max: 16 },
            password: { use: true, required: true },
            name: { use: true, required: true },
            nickname: { use: true, required: true, min: 2, max: 20 },
            email: { use: true, required: true, marketing: true },
            mobile: { use: true, required: true, marketing: true },
            address: { use: true, required: true },
            phone: { use: true, required: false },
            companyName: { use: false, required: false },
            businessNo: { use: false, required: false, overlap: true },
            ceo: { use: false, required: false },
            service: { use: false, required: false },
            item: { use: false, required: false },
            businessAddress: { use: false, required: false },
            businessImage: { use: false, required: false },
            fax: { use: false, required: false },
            recommenderId: { use: false, required: false, noChange: false },
            birth: { use: true, required: true, calendar: true },
            sex: { use: false, required: false },
            marriun: { use: false, required: false, date: true },
            job: { use: false, required: false },
            interest: { use: false, required: false },
            expiration: { use: false, required: false },
            memo: { use: false, required: false }
        },
        customItems: [],
        captcha: { use: false }
    });

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const res = await getMemberJoinItemSettingsAction();
            if (res.success && res.settings && res.settings.schema) {
                // Merge with default structure to ensure all keys exist
                const fetched = res.settings.schema as any;
                setSettings((prev: any) => ({
                    ...prev,
                    ...fetched,
                    items: { ...prev.items, ...fetched.items },
                    memberType: { ...prev.memberType, ...fetched.memberType },
                    captcha: { ...prev.captcha, ...fetched.captcha }
                }));
            } else {
                toast.error(res.error || "설정을 불러오는데 실패했습니다.");
            }
            setLoading(false);
        }
        loadData();
    }, []);

    const handleSave = async () => {
        const res = await updateMemberJoinItemSettingsAction(settings);
        if (res.success) {
            toast.success("저장되었습니다.");
        } else {
            toast.error(res.error || "저장에 실패했습니다.");
        }
    };

    const updateMemberType = (key: string, value: boolean) => {
        setSettings((prev: any) => ({
            ...prev,
            memberType: { ...prev.memberType, [key]: value }
        }));
    };

    const updateItem = (itemKey: string, field: string, value: any) => {
        setSettings((prev: any) => ({
            ...prev,
            items: {
                ...prev.items,
                [itemKey]: {
                    ...prev.items[itemKey],
                    [field]: value
                }
            }
        }));
    };

    const updateCaptcha = (value: boolean) => {
        setSettings((prev: any) => ({
            ...prev,
            captcha: { ...prev.captcha, use: value }
        }));
    };

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">회원 가입 항목 관리</h1>
                <Button onClick={handleSave} className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm font-bold border-0">
                    저장
                </Button>
            </div>

            {/* Basic Info */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="font-bold text-base text-gray-800">기본 정보</h2>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>

                <div className="border-t border-gray-400 border-b border-gray-200">
                    {/* Member Type */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            회원구분
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="type-personal" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.memberType.personal} 
                                    disabled 
                                />
                                <Label htmlFor="type-personal" className="text-gray-600 font-normal cursor-pointer text-xs">개인회원</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="type-business" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.memberType.business}
                                    onCheckedChange={(c) => updateMemberType('business', c as boolean)}
                                />
                                <Label htmlFor="type-business" className="text-gray-600 font-normal cursor-pointer text-xs">사업자회원</Label>
                            </div>
                        </div>
                    </div>

                    {/* ID */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            아이디
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox id="id-use" className="border-gray-300 rounded-[2px]" checked={settings.items.id.use} disabled />
                                <Label htmlFor="id-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox id="id-required" className="border-gray-300 rounded-[2px]" checked={settings.items.id.required} disabled />
                                <Label htmlFor="id-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                            <div className="flex items-center gap-1 ml-4">
                                <Input 
                                    className="w-16 h-7 text-center border-gray-300" 
                                    value={settings.items.id.min}
                                    onChange={(e) => updateItem('id', 'min', Number(e.target.value))}
                                />
                                <span>~</span>
                                <Input 
                                    className="w-16 h-7 text-center border-gray-300" 
                                    value={settings.items.id.max}
                                    onChange={(e) => updateItem('id', 'max', Number(e.target.value))}
                                />
                                <span>자 입력</span>
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            이름
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox id="name-use" className="border-gray-300 rounded-[2px]" checked={settings.items.name.use} disabled />
                                <Label htmlFor="name-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox id="name-required" className="border-gray-300 rounded-[2px]" checked={settings.items.name.required} disabled />
                                <Label htmlFor="name-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                        </div>
                    </div>

                    {/* Nickname */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            닉네임
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="nickname-use" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.nickname.use}
                                    onCheckedChange={(c) => updateItem('nickname', 'use', c)}
                                />
                                <Label htmlFor="nickname-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="nickname-required" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.nickname.required}
                                    onCheckedChange={(c) => updateItem('nickname', 'required', c)}
                                />
                                <Label htmlFor="nickname-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                            <div className="flex items-center gap-1 ml-4">
                                <Input 
                                    className="w-16 h-7 text-center border-gray-300" 
                                    value={settings.items.nickname.min}
                                    onChange={(e) => updateItem('nickname', 'min', Number(e.target.value))}
                                />
                                <span>~</span>
                                <Input 
                                    className="w-16 h-7 text-center border-gray-300"
                                    value={settings.items.nickname.max}
                                    onChange={(e) => updateItem('nickname', 'max', Number(e.target.value))}
                                />
                                <span>자 입력</span>
                            </div>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            비밀번호
                        </div>
                        <div className="flex-1 p-3 flex flex-col gap-2">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pw-use" className="border-gray-300 rounded-[2px]" checked={settings.items.password.use} disabled />
                                    <Label htmlFor="pw-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox id="pw-required" className="border-gray-300 rounded-[2px]" checked={settings.items.password.required} disabled />
                                    <Label htmlFor="pw-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                                </div>
                            </div>
                            <p className="text-[11px] text-red-500 flex items-start gap-1">
                                <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                                <span>
                                    영문대문자/영문소문자/숫자/특수문자 중 2개 포함 10자리 이상 또는 3종류 이상을 조합하여 최소 8자리 이상의 길이로 설정<br/>
                                    개인정보보호위원회 고시 [개인정보의 기술적·관리적 보호조치 기준]에 의한 비밀번호 설정 규칙입니다.
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            이메일
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="email-use" 
                                    className="border-red-500 text-red-500 rounded-[2px]" 
                                    checked={settings.items.email.use}
                                    onCheckedChange={(c) => updateItem('email', 'use', c)}
                                />
                                <Label htmlFor="email-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="email-required" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.email.required}
                                    onCheckedChange={(c) => updateItem('email', 'required', c)}
                                />
                                <Label htmlFor="email-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                            <div className="flex items-center gap-1.5 ml-8 bg-gray-50 px-2 py-1 rounded">
                                <Checkbox 
                                    id="email-marketing" 
                                    className="border-red-500 text-red-500 rounded-[2px]" 
                                    checked={settings.items.email.marketing}
                                    onCheckedChange={(c) => updateItem('email', 'marketing', c)}
                                />
                                <Label htmlFor="email-marketing" className="text-gray-600 font-normal cursor-pointer text-xs">정보/이벤트 메일 수신 동의 사용</Label>
                            </div>
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            휴대폰번호
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="mobile-use" 
                                    className="border-red-500 text-red-500 rounded-[2px]" 
                                    checked={settings.items.mobile.use}
                                    onCheckedChange={(c) => updateItem('mobile', 'use', c)}
                                />
                                <Label htmlFor="mobile-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="mobile-required" 
                                    className="border-gray-300 rounded-[2px]"
                                    checked={settings.items.mobile.required}
                                    onCheckedChange={(c) => updateItem('mobile', 'required', c)}
                                />
                                <Label htmlFor="mobile-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                            <div className="flex items-center gap-1.5 ml-8 bg-gray-50 px-2 py-1 rounded">
                                <Checkbox 
                                    id="mobile-marketing" 
                                    className="border-red-500 text-red-500 rounded-[2px]" 
                                    checked={settings.items.mobile.marketing}
                                    onCheckedChange={(c) => updateItem('mobile', 'marketing', c)}
                                />
                                <Label htmlFor="mobile-marketing" className="text-gray-600 font-normal cursor-pointer text-xs">정보/이벤트 SMS 수신 동의 사용</Label>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            주소
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="address-use" 
                                    className="border-red-500 text-red-500 rounded-[2px]" 
                                    checked={settings.items.address.use}
                                    onCheckedChange={(c) => updateItem('address', 'use', c)}
                                />
                                <Label htmlFor="address-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="address-required" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.address.required}
                                    onCheckedChange={(c) => updateItem('address', 'required', c)}
                                />
                                <Label htmlFor="address-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            전화번호
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="phone-use" 
                                    className="border-red-500 text-red-500 rounded-[2px]" 
                                    checked={settings.items.phone.use}
                                    onCheckedChange={(c) => updateItem('phone', 'use', c)}
                                />
                                <Label htmlFor="phone-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="phone-required" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.phone.required}
                                    onCheckedChange={(c) => updateItem('phone', 'required', c)}
                                />
                                <Label htmlFor="phone-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Business Info */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="font-bold text-base text-gray-800">사업자 정보</h2>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>

                <div className="border-t border-gray-400 border-b border-gray-200">
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            사업자회원
                        </div>
                        <div className="flex-1 p-3">
                            <div className="space-y-4">
                                {/* Company Name */}
                                <div className="flex items-center">
                                    <div className="w-40 flex items-center gap-1.5">
                                        <Checkbox 
                                            id="company-name" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.companyName.use}
                                            onCheckedChange={(c) => updateItem('companyName', 'use', c)}
                                        />
                                        <Label htmlFor="company-name" className="text-gray-600 font-normal cursor-pointer text-xs">상호 (</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox 
                                            id="company-name-req" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.companyName.required}
                                            onCheckedChange={(c) => updateItem('companyName', 'required', c)}
                                        />
                                        <Label htmlFor="company-name-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                                    </div>
                                </div>

                                {/* Business No */}
                                <div className="flex items-start">
                                    <div className="w-40 flex items-center gap-1.5 mt-1">
                                        <Checkbox 
                                            id="biz-no" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.businessNo.use}
                                            onCheckedChange={(c) => updateItem('businessNo', 'use', c)}
                                        />
                                        <Label htmlFor="biz-no" className="text-gray-600 font-normal cursor-pointer text-xs">사업자번호 (</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <Checkbox 
                                            id="biz-no-req" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.businessNo.required}
                                            onCheckedChange={(c) => updateItem('businessNo', 'required', c)}
                                        />
                                        <Label htmlFor="biz-no-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                                    </div>
                                    <div className="flex flex-col gap-1 ml-6 bg-gray-50 p-2 rounded max-w-md">
                                        <div className="flex items-center gap-1.5">
                                            <Checkbox 
                                                id="biz-dupe-check" 
                                                className="border-red-500 text-red-500 rounded-[2px]" 
                                                checked={settings.items.businessNo.overlap}
                                                onCheckedChange={(c) => updateItem('businessNo', 'overlap', c)}
                                            />
                                            <Label htmlFor="biz-dupe-check" className="text-gray-600 font-normal cursor-pointer text-xs">사업자번호 중복가입 제한 기능 사용</Label>
                                        </div>
                                        <p className="text-[11px] text-[#666666] flex items-center gap-1">
                                            <span className="inline-block bg-[#666666] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                                            설정 시점 이후 회원가입에 한해서만 중복가입 제한 기능이 적용됩니다.
                                        </p>
                                    </div>
                                </div>

                                {/* CEO Name */}
                                <div className="flex items-center">
                                    <div className="w-40 flex items-center gap-1.5">
                                        <Checkbox 
                                            id="ceo" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.ceo.use}
                                            onCheckedChange={(c) => updateItem('ceo', 'use', c)}
                                        />
                                        <Label htmlFor="ceo" className="text-gray-600 font-normal cursor-pointer text-xs">대표자명 (</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox 
                                            id="ceo-req" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.ceo.required}
                                            onCheckedChange={(c) => updateItem('ceo', 'required', c)}
                                        />
                                        <Label htmlFor="ceo-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                                    </div>
                                </div>

                                {/* Service Type (Up-tae) */}
                                <div className="flex items-center">
                                    <div className="w-40 flex items-center gap-1.5">
                                        <Checkbox 
                                            id="biz-type" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.service.use}
                                            onCheckedChange={(c) => updateItem('service', 'use', c)}
                                        />
                                        <Label htmlFor="biz-type" className="text-gray-600 font-normal cursor-pointer text-xs">업태 (</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox 
                                            id="biz-type-req" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.service.required}
                                            onCheckedChange={(c) => updateItem('service', 'required', c)}
                                        />
                                        <Label htmlFor="biz-type-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                                    </div>
                                </div>

                                {/* Item (Jong-mok) */}
                                <div className="flex items-center">
                                    <div className="w-40 flex items-center gap-1.5">
                                        <Checkbox 
                                            id="biz-item" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.item.use}
                                            onCheckedChange={(c) => updateItem('item', 'use', c)}
                                        />
                                        <Label htmlFor="biz-item" className="text-gray-600 font-normal cursor-pointer text-xs">종목 (</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox 
                                            id="biz-item-req" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.item.required}
                                            onCheckedChange={(c) => updateItem('item', 'required', c)}
                                        />
                                        <Label htmlFor="biz-item-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                                    </div>
                                </div>

                                {/* Business Address */}
                                <div className="flex items-center">
                                    <div className="w-40 flex items-center gap-1.5">
                                        <Checkbox 
                                            id="biz-address" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.businessAddress.use}
                                            onCheckedChange={(c) => updateItem('businessAddress', 'use', c)}
                                        />
                                        <Label htmlFor="biz-address" className="text-gray-600 font-normal cursor-pointer text-xs">사업장 주소 (</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox 
                                            id="biz-address-req" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.businessAddress.required}
                                            onCheckedChange={(c) => updateItem('businessAddress', 'required', c)}
                                        />
                                        <Label htmlFor="biz-address-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                                    </div>
                                </div>

                                {/* Business Certificate */}
                                <div className="flex items-center">
                                    <div className="w-40 flex items-center gap-1.5">
                                        <Checkbox 
                                            id="biz-cert" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.businessImage.use}
                                            onCheckedChange={(c) => updateItem('businessImage', 'use', c)}
                                        />
                                        <Label htmlFor="biz-cert" className="text-gray-600 font-normal cursor-pointer text-xs">사업자등록증 (</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox 
                                            id="biz-cert-req" 
                                            className="border-gray-300 rounded-[2px]" 
                                            checked={settings.items.businessImage.required}
                                            onCheckedChange={(c) => updateItem('businessImage', 'required', c)}
                                        />
                                        <Label htmlFor="biz-cert-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                                    </div>
                                    <Button variant="secondary" className="h-6 px-2 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888] ml-2">설정</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="font-bold text-base text-gray-800">부가정보</h2>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>

                <div className="border-t border-gray-400 border-b border-gray-200">
                    {/* Fax */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            팩스번호
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="fax-use" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.fax.use}
                                    onCheckedChange={(c) => updateItem('fax', 'use', c)}
                                />
                                <Label htmlFor="fax-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="fax-req" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.fax.required}
                                    onCheckedChange={(c) => updateItem('fax', 'required', c)}
                                />
                                <Label htmlFor="fax-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                        </div>
                    </div>

                    {/* Recommender Id */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            추천인아이디
                        </div>
                        <div className="flex-1 p-3 flex gap-6">
                            <div className="flex items-center gap-6 h-7">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox 
                                        id="recomm-use" 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={settings.items.recommenderId.use}
                                        onCheckedChange={(c) => updateItem('recommenderId', 'use', c)}
                                    />
                                    <Label htmlFor="recomm-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox 
                                        id="recomm-req" 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={settings.items.recommenderId.required}
                                        onCheckedChange={(c) => updateItem('recommenderId', 'required', c)}
                                    />
                                    <Label htmlFor="recomm-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox 
                                        id="recomm-change-ban" 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={settings.items.recommenderId.noChange}
                                        onCheckedChange={(c) => updateItem('recommenderId', 'noChange', c)}
                                    />
                                    <Label htmlFor="recomm-change-ban" className="text-gray-600 font-normal cursor-pointer text-xs">회원정보 변경 시 추천인아이디 등록 불가</Label>
                                </div>
                                <p className="text-[11px] text-[#666666] flex items-center gap-1">
                                    <span className="inline-block bg-[#666666] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                                    체크 시 회원 가입시에만 추천인아이디 등록이 가능합니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Birthday */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            생일
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="birth-use" 
                                    className="border-red-500 text-red-500 rounded-[2px]" 
                                    checked={settings.items.birth.use}
                                    onCheckedChange={(c) => updateItem('birth', 'use', c)}
                                />
                                <Label htmlFor="birth-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="birth-req" 
                                    className="border-red-500 text-red-500 rounded-[2px]" 
                                    checked={settings.items.birth.required}
                                    onCheckedChange={(c) => updateItem('birth', 'required', c)}
                                />
                                <Label htmlFor="birth-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                            <div className="flex items-center gap-1.5 ml-8 border-l border-gray-200 pl-8">
                                <span className="text-gray-600">생일 양/음력 (</span>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox 
                                        id="solar-lunar-use" 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={settings.items.birth.calendar}
                                        onCheckedChange={(c) => updateItem('birth', 'calendar', c)}
                                    />
                                    <Label htmlFor="solar-lunar-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                                </div>
                                {/* Note: original had req for solar-lunar which is not in schema but maybe implicit? Or maybe I should add it if strictly needed. Keeping simple. */}
                                <div className="flex items-center gap-1.5">
                                     <Checkbox 
                                        id="solar-lunar-req" 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={settings.items.birth.calendar} // Sync for now or just visual
                                        disabled
                                     />
                                    <Label htmlFor="solar-lunar-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            성별
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="gender-use" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.sex.use}
                                    onCheckedChange={(c) => updateItem('sex', 'use', c)}
                                />
                                <Label htmlFor="gender-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="gender-req" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.sex.required}
                                    onCheckedChange={(c) => updateItem('sex', 'required', c)}
                                />
                                <Label htmlFor="gender-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                        </div>
                    </div>

                    {/* Marital Status */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            결혼여부
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="marry-use" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.marriun.use}
                                    onCheckedChange={(c) => updateItem('marriun', 'use', c)}
                                />
                                <Label htmlFor="marry-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="marry-req" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.marriun.required}
                                    onCheckedChange={(c) => updateItem('marriun', 'required', c)}
                                />
                                <Label htmlFor="marry-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                            <div className="flex items-center gap-1.5 ml-8 border-l border-gray-200 pl-8">
                                <span className="text-gray-600">결혼 기념일 (</span>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox 
                                        id="wedding-date-use" 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={settings.items.marriun.date}
                                        onCheckedChange={(c) => updateItem('marriun', 'date', c)}
                                    />
                                    <Label htmlFor="wedding-date-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox 
                                        id="wedding-date-req" 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={settings.items.marriun.date}
                                        disabled
                                    />
                                    <Label htmlFor="wedding-date-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            직업
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="job-use" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.job.use}
                                    onCheckedChange={(c) => updateItem('job', 'use', c)}
                                />
                                <Label htmlFor="job-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="job-req" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.job.required}
                                    onCheckedChange={(c) => updateItem('job', 'required', c)}
                                />
                                <Label htmlFor="job-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <Button variant="secondary" className="h-6 px-2 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888]">설정</Button>
                                <span className="text-gray-600">직업 14개</span>
                            </div>
                        </div>
                    </div>

                    {/* Interest */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            관심분야
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="interest-use" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.interest.use}
                                    onCheckedChange={(c) => updateItem('interest', 'use', c)}
                                />
                                <Label htmlFor="interest-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="interest-req" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.interest.required}
                                    onCheckedChange={(c) => updateItem('interest', 'required', c)}
                                />
                                <Label htmlFor="interest-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <Button variant="secondary" className="h-6 px-2 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888]">설정</Button>
                                <span className="text-gray-600">관심분야 7개</span>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Validity */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            개인정보유효기간
                        </div>
                        <div className="flex-1 p-3">
                            <div className="flex items-center gap-6 h-7 mb-2">
                                <div className="flex items-center gap-1.5">
                                    <Checkbox 
                                        id="privacy-use" 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={settings.items.expiration.use}
                                        onCheckedChange={(c) => updateItem('expiration', 'use', c)}
                                    />
                                    <Label htmlFor="privacy-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Checkbox 
                                        id="privacy-req" 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={settings.items.expiration.required}
                                        onCheckedChange={(c) => updateItem('expiration', 'required', c)}
                                    />
                                    <Label htmlFor="privacy-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                                </div>
                            </div>
                            <p className="text-[11px] text-red-500 flex items-center gap-1">
                                <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                                <span>회원이 ‘휴면회원 방지기간’을 설정할 수 있는 항목입니다.</span>
                            </p>
                        </div>
                    </div>

                    {/* Memo */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            남기는 말씀
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="memo-use" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.memo.use}
                                    onCheckedChange={(c) => updateItem('memo', 'use', c)}
                                />
                                <Label htmlFor="memo-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="memo-req" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.items.memo.required}
                                    onCheckedChange={(c) => updateItem('memo', 'required', c)}
                                />
                                <Label htmlFor="memo-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Anti-Automation */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="font-bold text-base text-gray-800">자동등록 방지</h2>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>

                <div className="border-t border-gray-400 border-b border-gray-200">
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            자동등록방지문자
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <div className="flex items-center gap-1.5">
                                <Checkbox 
                                    id="captcha-use" 
                                    className="border-gray-300 rounded-[2px]" 
                                    checked={settings.captcha.use}
                                    onCheckedChange={(c) => updateCaptcha(c as boolean)}
                                />
                                <Label htmlFor="captcha-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                            </div>
                            <p className="text-[11px] text-red-500 flex items-center gap-1">
                                <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                                <span>사용함으로 선택 시 회원가입 항목에 자동등록방지 영역이 노출되지 않으면 스킨패치를 진행하시기 바랍니다.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold"><Youtube size={16}/></span>
                </Button>
                <Button className="rounded-full w-10 h-10 bg-[#7B4DFF] hover:bg-[#7B4DFF]/90 shadow-lg text-white p-0 flex items-center justify-center border-0 text-[10px] leading-tight flex-col">
                    <span className="block">따라</span>
                    <span className="block">하기</span>
                </Button>
                <div className="flex flex-col gap-0 rounded-full bg-white shadow-lg overflow-hidden border border-gray-200">
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100 p-0">
                        <ChevronUp className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0">
                        <ChevronUp className="w-4 h-4 rotate-180" />
                    </Button>
                </div>
            </div>

        </div>
    );
}
