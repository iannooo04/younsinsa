"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";

const PaymentBadge = ({ char, color }: { char: string, color: string }) => (
    <span className={`w-5 h-5 flex items-center justify-center text-white text-[11px] rounded-[3px] mr-2 shrink-0 ${color}`}>
        {char}
    </span>
);

export default function PaymentMethodSettingsPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <div className="flex items-end gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">결제 수단 설정</h1>
                    <span className="text-gray-500 text-sm mb-1">각 결제 수단의 명칭을 변경하실 수 있습니다.</span>
                </div>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-10 px-6 font-bold">
                    저장
                </Button>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">결제 수단 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                {/* Table */}
                <div className="border border-gray-300 border-t-2 border-t-gray-800 text-sm">
                    {/* Table Header */}
                    <div className="grid grid-cols-[180px_1fr_1fr_1fr] bg-gray-100 text-center font-bold text-gray-700 h-12 items-center border-b border-gray-300">
                        <div>결제 기준</div>
                        <div>결제 수단 명칭</div>
                        <div>노출 이름</div>
                        <div>사용 설정</div>
                    </div>

                    {/* General Payment Section */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        {/* Title Column */}
                        <div className="flex items-center justify-center bg-gray-50 text-gray-700 font-bold border-r border-gray-200 py-4">
                            일반 결제
                        </div>
                        
                        {/* Rows */}
                        <div className="divide-y divide-gray-200 text-gray-600">
                            {/* Row 1: Bank Transfer */}
                            <div className="grid grid-cols-[1fr_1fr_1fr] items-center min-h-[80px] py-4 px-4">
                                <div className="flex items-center pl-4">
                                    <PaymentBadge char="무" color="bg-[#8D5A34]" />
                                    <span>무통장 입금</span>
                                </div>
                                <div className="flex justify-center">
                                    <Input defaultValue="무통장 입금" className="w-[180px] h-8 text-xs" />
                                </div>
                                <div className="flex justify-center">
                                    <RadioGroup defaultValue="used" className="flex flex-col gap-3 items-start">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="used" id="general-bank-used" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="general-bank-used" className="font-normal">사용함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="unused" id="general-bank-unused" />
                                            <Label htmlFor="general-bank-unused" className="font-normal">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            {/* Row 2: Credit Card */}
                            <div className="grid grid-cols-[1fr_1fr_1fr] items-center min-h-[80px] py-4 px-4">
                                <div className="flex items-center pl-4">
                                    <PaymentBadge char="신" color="bg-[#FF424D]" />
                                    <span>신용카드</span>
                                </div>
                                <div className="flex justify-center">
                                    <Input defaultValue="신용카드" className="w-[180px] h-8 text-xs" />
                                </div>
                                <div className="flex justify-center">
                                    <RadioGroup defaultValue="unused" className="flex flex-col gap-3 items-start">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="used" id="general-card-used" />
                                            <Label htmlFor="general-card-used" className="font-normal">사용함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="unused" id="general-card-unused" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="general-card-unused" className="font-normal">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            {/* Row 3: Account Transfer */}
                            <div className="grid grid-cols-[1fr_1fr_1fr] items-center min-h-[80px] py-4 px-4">
                                <div className="flex items-center pl-4">
                                    <PaymentBadge char="계" color="bg-[#4B96F3]" />
                                    <span>계좌이체</span>
                                </div>
                                <div className="flex justify-center">
                                    <Input defaultValue="계좌이체" className="w-[180px] h-8 text-xs" />
                                </div>
                                <div className="flex justify-center">
                                    <RadioGroup defaultValue="unused" className="flex flex-col gap-3 items-start">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="used" id="general-transfer-used" />
                                            <Label htmlFor="general-transfer-used" className="font-normal">사용함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="unused" id="general-transfer-unused" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="general-transfer-unused" className="font-normal">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                             {/* Row 4: Virtual Account */}
                             <div className="grid grid-cols-[1fr_1fr_1fr] items-center min-h-[80px] py-4 px-4">
                                <div className="flex items-center pl-4">
                                    <PaymentBadge char="가" color="bg-[#FBC02D]" />
                                    <span>가상계좌</span>
                                </div>
                                <div className="flex justify-center">
                                    <Input defaultValue="가상계좌" className="w-[180px] h-8 text-xs" />
                                </div>
                                <div className="flex justify-center">
                                    <RadioGroup defaultValue="unused" className="flex flex-col gap-3 items-start">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="used" id="general-virtual-used" />
                                            <Label htmlFor="general-virtual-used" className="font-normal">사용함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="unused" id="general-virtual-unused" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="general-virtual-unused" className="font-normal">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            {/* Row 5: Mobile */}
                            <div className="grid grid-cols-[1fr_1fr_1fr] items-center min-h-[80px] py-4 px-4">
                                <div className="flex items-center pl-4">
                                    <PaymentBadge char="휴" color="bg-[#FF7043]" />
                                    <span>휴대폰</span>
                                </div>
                                <div className="flex justify-center">
                                    <Input defaultValue="휴대폰결제" className="w-[180px] h-8 text-xs" />
                                </div>
                                <div className="flex justify-center">
                                    <RadioGroup defaultValue="unused" className="flex flex-col gap-3 items-start">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="used" id="general-mobile-used" />
                                            <Label htmlFor="general-mobile-used" className="font-normal">사용함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="unused" id="general-mobile-unused" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="general-mobile-unused" className="font-normal">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </div>

                     {/* Escrow Payment Section */}
                     <div className="grid grid-cols-[180px_1fr]">
                        {/* Title Column */}
                        <div className="flex items-center justify-center bg-gray-50 text-gray-700 font-bold border-r border-gray-200 py-4">
                            에스크로 결제
                        </div>
                        
                        {/* Rows */}
                        <div className="divide-y divide-gray-200 text-gray-600">
                            {/* Row 1: Credit Card */}
                            <div className="grid grid-cols-[1fr_1fr_1fr] items-center min-h-[80px] py-4 px-4">
                                <div className="flex items-center pl-4">
                                    <PaymentBadge char="신" color="bg-[#AB47BC]" />
                                    <span>신용카드</span>
                                </div>
                                <div className="flex justify-center">
                                    <Input defaultValue="신용카드" className="w-[180px] h-8 text-xs" />
                                </div>
                                <div className="flex justify-center">
                                    <RadioGroup defaultValue="unused" className="flex flex-col gap-3 items-start">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="used" id="escrow-card-used" />
                                            <Label htmlFor="escrow-card-used" className="font-normal">사용함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="unused" id="escrow-card-unused" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="escrow-card-unused" className="font-normal">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            {/* Row 2: Account Transfer */}
                            <div className="grid grid-cols-[1fr_1fr_1fr] items-center min-h-[80px] py-4 px-4">
                                <div className="flex items-center pl-4">
                                    <PaymentBadge char="계" color="bg-[#AB47BC]" />
                                    <span>계좌이체</span>
                                </div>
                                <div className="flex justify-center">
                                    <Input defaultValue="계좌이체" className="w-[180px] h-8 text-xs" />
                                </div>
                                <div className="flex justify-center">
                                    <RadioGroup defaultValue="unused" className="flex flex-col gap-3 items-start">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="used" id="escrow-transfer-used" />
                                            <Label htmlFor="escrow-transfer-used" className="font-normal">사용함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="unused" id="escrow-transfer-unused" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="escrow-transfer-unused" className="font-normal">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                             {/* Row 3: Virtual Account */}
                             <div className="grid grid-cols-[1fr_1fr_1fr] items-center min-h-[80px] py-4 px-4">
                                <div className="flex items-center pl-4">
                                    <PaymentBadge char="가" color="bg-[#AB47BC]" />
                                    <span>가상계좌</span>
                                </div>
                                <div className="flex justify-center">
                                    <Input defaultValue="가상계좌" className="w-[180px] h-8 text-xs" />
                                </div>
                                <div className="flex justify-center">
                                    <RadioGroup defaultValue="unused" className="flex flex-col gap-3 items-start">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="used" id="escrow-virtual-used" />
                                            <Label htmlFor="escrow-virtual-used" className="font-normal">사용함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="unused" id="escrow-virtual-unused" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="escrow-virtual-unused" className="font-normal">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center gap-2 py-2">
                    <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px] w-4 h-4 flex items-center justify-center shrink-0">!</span>
                    <span className="text-gray-500 text-xs">전자결제(PG) 신청 전인 경우 먼저 서비스를 신청하세요.</span>
                    <Button variant="outline" className="h-6 text-white text-xs bg-gray-400 hover:bg-gray-500 border-0 rounded-sm px-2">
                        전자결제 (PG) 신청
                    </Button>
                </div>
            </div>

                    </div>
    );
}
