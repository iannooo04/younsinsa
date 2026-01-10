"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Youtube, ArrowUp, ArrowDown } from "lucide-react";

export default function PasswordSearchSettingsPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">비밀번호 찾기 설정</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium">
                    저장
                </Button>
            </div>

            {/* Email Authentication Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">이메일 인증</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">사용설정</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="used" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="email-used" />
                                    <Label htmlFor="email-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="email-unused" />
                                    <Label htmlFor="email-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-gray-500 flex items-start gap-1">
                                <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                회원정보에 등록된 이메일 주소로 비밀번호 찾기 인증번호를 발송합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Authentication Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">휴대폰번호 인증</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">사용설정</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="used" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="mobile-used" />
                                    <Label htmlFor="mobile-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="mobile-unused" />
                                    <Label htmlFor="mobile-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p className="flex items-start gap-1">
                                    <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                    회원정보에 등록된 휴대폰 번호로 비밀번호 찾기 인증번호를 발송합니다.
                                </p>
                                <p className="flex items-start gap-1">
                                    <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                    <span>
                                        휴대폰 인증은 SMS 잔여포인트가 없으면 노출되지 않습니다. (잔여포인트 : <span className="text-red-500">0.0</span> ) <a href="#" className="text-blue-500 underline">SMS포인트 충전하기&gt;</a>
                                    </span>
                                </p>
                                <p className="flex items-start gap-1">
                                    <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                    <span>
                                        자동 SMS 설정 또는 카카오 알림톡 설정에서 ‘비밀번호 찾기 인증번호’ 항목을 자동발송으로 설정해야 인증번호가 발송됩니다. <a href="#" className="text-blue-500 underline">SMS발송 상세설정&gt;</a> <a href="#" className="text-blue-500 underline">카카오 알림톡 상세설정&gt;</a>
                                    </span>
                                </p>
                                <p className="flex items-start gap-1">
                                    <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                    회원정보에 휴대폰 정보가 등록되지 않은 회원에게는 노출되지 않습니다.
                                </p>
                            </div>
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
