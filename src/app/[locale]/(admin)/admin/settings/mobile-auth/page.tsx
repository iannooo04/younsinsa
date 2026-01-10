"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Youtube, ArrowUp, ArrowDown, BookOpen } from "lucide-react";

export default function MobileAuthSettingsPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Breadcrumb */}
            <div className="text-xs text-gray-500 mb-2">
                기본설정 &gt; 본인확인 인증 서비스 &gt; <span className="font-bold text-gray-700 underline decoration-gray-700">휴대폰인증 설정</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">휴대폰인증 설정</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium">
                    저장
                </Button>
            </div>

            {/* Settings Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">휴대폰인증 사용 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="w-full">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-300 w-full justify-start">
                        <div className="w-32 py-2 text-center border border-gray-300 border-b-0 bg-white font-bold text-gray-800 border-t-2 border-t-black cursor-pointer -mb-[1px]">
                            NHN KCP
                        </div>
                        <div className="w-32 py-2 text-center border border-gray-300 border-b-0 border-l-0 bg-gray-50 text-gray-500 cursor-pointer">
                            드림시큐리티
                        </div>
                         {/* Spacer to complete the line if needed, but flex container border-b handles it */}
                    </div>

                    {/* Content */}
                    <div className="border border-gray-300 border-t-0 text-sm">
                        {/* Usage Setting */}
                        <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                            <div className="p-4 bg-gray-50 font-medium text-gray-700">사용 설정</div>
                            <div className="p-4 space-y-2">
                                <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="used" id="auth-used" />
                                        <Label htmlFor="auth-used" className="font-normal cursor-pointer">사용함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="unused" id="auth-unused" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                        <Label htmlFor="auth-unused" className="font-normal cursor-pointer">사용안함</Label>
                                    </div>
                                </RadioGroup>
                                <p className="text-gray-500 flex items-center gap-1 text-xs">
                                     <span className="w-3.5 h-3.5 flex justify-center items-center bg-gray-800 text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                                    서비스 신청 전인 경우 먼저 서비스를 신청하세요. <a href="#" className="text-blue-500 underline decoration-blue-500">서비스 자세히보기 &gt;</a>
                                </p>
                            </div>
                        </div>

                        {/* Partner Code */}
                        <div className="grid grid-cols-[180px_1fr]">
                            <div className="p-4 bg-gray-50 font-medium text-gray-700">회원사 CODE</div>
                            <div className="p-4 text-[#FF424D]">
                                미승인
                            </div>
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
                <div className="text-xs text-gray-500 space-y-2 leading-relaxed">
                    <p className="font-bold text-gray-700 text-sm mb-1">[회원 가입 시, 휴대폰 본인확인 정보 사용] 회원 가입 시, 휴대폰 본인확인 정보 사용이란 무엇인가요?</p>
                    <p>· [회원가입 시, 휴대폰 본인확인 정보 사용] 기능은 휴대폰 본인인증 시 확인된 개인정보를 회원가입 정보로 사용할 지 여부를 설정하는 기능으로, 본인인증 진행여부와는 무관합니다.</p>
                    <p>· 해당 기능의 사용여부에 따라 고객은 인증된 정보 중 일부(이름, 휴대폰번호, 생일, 성별)를 수정하여 회원가입을 진행할 수 있습니다.</p>
                    <p>· 본인인증으로 확인 된 정보와 다른 정보로 회원가입이 가능해지는 경우 본인인증 관련 이슈가 발생할 수 있기 때문에 '사용함'으로 설정하시는 것을 권장 드립니다.</p>
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
