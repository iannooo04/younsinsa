"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HelpCircle, Youtube, ChevronUp, AlertCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PGSettingsPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <div className="flex items-end gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">전자결제(PG) 설정</h1>
                    <span className="text-gray-500 text-sm mb-1">계약된 전자결제(PG)의 설정을 하실 수 있습니다.</span>
                </div>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-10 px-6 font-bold">
                    PG 정보 저장
                </Button>
            </div>

            {/* Alert */}
            <div className="flex items-center gap-2 text-[#FF424D] font-bold text-xs">
                <AlertCircle size={14} className="fill-[#FF424D] text-white" />
                <span>아래 전자결제(PG) 업체중 계약을 맺은 한곳만 클릭한 후 정보를 입력하세요</span>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="kcp" className="w-full">
                <TabsList className="w-full h-12 bg-gray-50 border border-gray-300 rounded-none p-0 justify-start">
                    <TabsTrigger 
                        value="kcp" 
                        className="h-full px-6 rounded-none data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-gray-800 data-[state=active]:border-b-white data-[state=active]:text-gray-900 text-gray-500 border-r border-gray-200"
                    >
                        NHN KCP
                    </TabsTrigger>
                    <TabsTrigger value="inicis" className="h-full px-6 rounded-none data-[state=active]:bg-white text-gray-500 border-r border-gray-200">KG 이니시스</TabsTrigger>
                    <TabsTrigger value="toss" className="h-full px-6 rounded-none data-[state=active]:bg-white text-gray-500 border-r border-gray-200">토스페이먼츠 (구 LGU+)</TabsTrigger>
                    <TabsTrigger value="mobilians" className="h-full px-6 rounded-none data-[state=active]:bg-white text-gray-500 border-r border-gray-200">KG모빌리언스(구 올앳)</TabsTrigger>
                    <TabsTrigger value="nice" className="h-full px-6 rounded-none data-[state=active]:bg-white text-gray-500 border-r border-gray-200">나이스페이</TabsTrigger>
                    <TabsTrigger value="easypay" className="h-full px-6 rounded-none data-[state=active]:bg-white text-gray-500 border-r border-gray-200">이지페이</TabsTrigger>
                    <TabsTrigger value="galaxia" className="h-full px-6 rounded-none data-[state=active]:bg-white text-gray-500">갤럭시아머머니트리</TabsTrigger>
                </TabsList>

                <TabsContent value="kcp" className="mt-8 space-y-8">
                    {/* General Payment Settings */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-gray-800">NHN KCP 일반결제 설정</h2>
                            <HelpCircle size={14} className="text-gray-400 cursor-help" />
                        </div>

                        <div className="border border-gray-300 border-t-2 border-t-gray-800">
                             {/* Rows */}
                            <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    PG사 모듈 버전
                                </div>
                                <div className="p-4 flex items-center text-gray-600">
                                    NHN KCP WEB 표준결제창 (V.3.0.0 - 20151125) / NHN KCP SmartPhone WEB 결제창 (V.3.0.0 - 20151125)
                                </div>
                            </div>

                            <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    결제수단 설정
                                </div>
                                <div className="p-4 flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="pay-card" className="rounded-[2px]" />
                                        <Label htmlFor="pay-card" className="font-normal text-gray-700">신용카드</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="pay-bank" className="rounded-[2px]" />
                                        <Label htmlFor="pay-bank" className="font-normal text-gray-700">계좌이체</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="pay-virtual" className="rounded-[2px]" />
                                        <Label htmlFor="pay-virtual" className="font-normal text-gray-700">가상계좌</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="pay-mobile" className="rounded-[2px]" />
                                        <Label htmlFor="pay-mobile" className="font-normal text-gray-700">휴대폰</Label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    NHN KCP 사이트 코드
                                </div>
                                <div className="p-4 space-y-2">
                                    <p className="text-[#FF424D] font-bold text-xs flex items-center gap-1">
                                        <span className="bg-[#FF424D] text-white text-[10px] px-1 rounded-[2px]">!</span>
                                        전자결제(PG) 신청 전 또는 승인대기상태입니다.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px]">!</span>
                                        신청 전인 경우 먼저 서비스를 신청하세요.
                                        <Button variant="secondary" className="h-6 text-xs bg-gray-400 hover:bg-gray-500 text-white rounded-sm ml-2">전자결제(PG) 신청</Button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    NHN KCP 사이트 키
                                </div>
                                <div className="p-4">
                                     <p className="text-[#FF424D] font-bold text-xs flex items-center gap-1">
                                        <span className="bg-[#FF424D] text-white text-[10px] px-1 rounded-[2px]">!</span>
                                        전자결제(PG) 신청 전 또는 승인대기상태입니다.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    일반 할부 사용 설정
                                </div>
                                <div className="p-4">
                                    <RadioGroup defaultValue="general" className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="lump" id="installment-lump" />
                                            <Label htmlFor="installment-lump" className="font-normal text-gray-700">일시불 결제</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="general" id="installment-general" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="installment-general" className="font-normal text-gray-700">일반 할부 결제</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    일반 할부 기간 설정
                                </div>
                                <div className="p-4 flex items-center gap-2">
                                    <Input defaultValue="12" className="w-20 h-8" />
                                    <span className="text-gray-700">개월 까지 할부 설정</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    무이자 할부 사용 설정
                                </div>
                                <div className="p-4">
                                     <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="unused" id="interest-free-unused" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="interest-free-unused" className="font-normal text-gray-700">사용안함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="period" id="interest-free-period" />
                                            <Label htmlFor="interest-free-period" className="font-normal text-gray-700">사용함 (아래기간 설정)</Label>
                                        </div>
                                         <div className="flex items-center gap-2">
                                            <RadioGroupItem value="admin" id="interest-free-admin" />
                                            <Label htmlFor="interest-free-admin" className="font-normal text-gray-700">사용함 (NHN KCP 상점 관리자 모드에서 설정)</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    결제창 스킨
                                </div>
                                <div className="p-4">
                                    <RadioGroup defaultValue="skin1" className="flex items-center gap-6 flex-wrap">
                                        {[...Array(11)].map((_, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <RadioGroupItem 
                                                    value={`skin${i+1}`} 
                                                    id={`skin${i+1}`} 
                                                    className={i === 0 ? "border-[#FF424D] text-[#FF424D]" : ""}
                                                />
                                                <Label htmlFor={`skin${i+1}`} className="font-normal text-gray-700">스킨{i+1}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    가상계좌 입금기한
                                </div>
                                <div className="p-4 flex items-center gap-2">
                                    <Input defaultValue="3" className="w-20 h-8" />
                                    <span className="text-gray-700">일</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    가상계좌 입금내역<br/>실시간 통보 URL
                                </div>
                                <div className="p-4 space-y-2">
                                    <p className="font-bold text-gray-600">http://쇼핑몰도메인/payment/kcp/pg_vbank_return.php</p>
                                    <div className="space-y-1 text-xs text-gray-500">
                                        <p className="flex items-start gap-1">
                                            <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px] mt-0.5">!</span>
                                            NHN KCP 상점 관리자모드 ( 상점정보 관리 - 정보변경 - 공통 URL 정보 )에 "공통 URL" 등록 후 "인코딩 설정"을 반드시 "UTF-8"로 해주셔야 합니다.
                                        </p>
                                        <p className="flex items-start gap-1">
                                            <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px] mt-0.5">!</span>
                                            쇼핑몰도메인은 대표도메인 사용을 권장합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>

                             <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    앱 스키마 설정<br/><span className="text-xs font-normal">app scheme</span>
                                </div>
                                <div className="p-4">
                                     <Input className="w-[300px] h-8" />
                                </div>
                            </div>

                             <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    과세 정보 설정
                                </div>
                                <div className="p-4 space-y-2">
                                    <RadioGroup defaultValue="taxable" className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="taxable" id="tax-taxable" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="tax-taxable" className="font-normal text-gray-700">과세</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="taxfree" id="tax-free" />
                                            <Label htmlFor="tax-free" className="font-normal text-gray-700">면세</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="composite" id="tax-composite" />
                                            <Label htmlFor="tax-composite" className="font-normal text-gray-700">복합과세</Label>
                                        </div>
                                    </RadioGroup>
                                    <div className="space-y-1 text-xs text-[#FF424D]">
                                         <p className="flex items-start gap-1 font-bold">
                                            <span className="bg-[#FF424D] text-white text-[10px] px-1 rounded-[2px] mt-0.5">!</span>
                                            NHN KCP와 계약한 과세정보로 꼭! 설정해주세요.
                                        </p>
                                        <p className="pl-5">
                                            - 설정한 과세정보로 결제 요청 되므로 계약하지 않은 과세정보를 설정하는 경우 부분취소가 어려울 수 있습니다.
                                        </p>
                                    </div>
                                    <p className="flex items-start gap-1 text-xs text-gray-500">
                                        <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px] mt-0.5">!</span>
                                        복합과세(면/과세 상품 동시 취급)로 쇼핑몰을 운영하신다면 반드시 PG사와 복합과세 계약 후 사용하시기 바랍니다.
                                    </p>
                                </div>
                            </div>

                             <div className="grid grid-cols-[200px_1fr]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    NHN KCP 사이트
                                </div>
                                <div className="p-4 flex gap-2">
                                    <Button variant="secondary" className="h-8 text-xs bg-gray-400 hover:bg-gray-500 text-white rounded-sm">NHN KCP 상점 관리자모드 바로가기</Button>
                                    <Button variant="secondary" className="h-8 text-xs bg-gray-400 hover:bg-gray-500 text-white rounded-sm">NHN KCP 사이트 바로가기</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Escrow Settings */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-gray-800">에스크로 설정</h2>
                            <HelpCircle size={14} className="text-gray-400 cursor-help" />
                        </div>

                         <div className="border border-gray-300 border-t-2 border-t-gray-800">
                            <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    PG사 모듈 버전
                                </div>
                                <div className="p-4 flex items-center text-gray-600">
                                    NHN KCP 표준결제창 Escrow (V.3.0.1 - 20160325) / NHN KCP SmartPhone Escrow (V.3.0.0 - 20151125)
                                </div>
                            </div>

                             <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    사용 설정
                                </div>
                                <div className="p-4">
                                     <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="used" id="escrow-used" />
                                            <Label htmlFor="escrow-used" className="font-normal text-gray-700">사용함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="unused" id="escrow-unused" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="escrow-unused" className="font-normal text-gray-700">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                             <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    결제수단 설정
                                </div>
                                <div className="p-4 flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="esc-card" className="rounded-[2px]" />
                                        <Label htmlFor="esc-card" className="font-normal text-gray-700">신용카드</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="esc-bank" className="rounded-[2px]" />
                                        <Label htmlFor="esc-bank" className="font-normal text-gray-700">계좌이체</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="esc-virtual" className="rounded-[2px]" />
                                        <Label htmlFor="esc-virtual" className="font-normal text-gray-700">가상계좌</Label>
                                    </div>
                                </div>
                            </div>

                             <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    배송 소요일
                                </div>
                                <div className="p-4 flex items-center gap-2">
                                    <Input defaultValue="5" className="w-20 h-8" />
                                    <span className="text-gray-700">일</span>
                                </div>
                            </div>

                             <div className="grid grid-cols-[200px_1fr]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    구매 안전 표시
                                </div>
                                <div className="p-4">
                                     <RadioGroup defaultValue="nodisplay" className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="display" id="safety-display" />
                                            <Label htmlFor="safety-display" className="font-normal text-gray-700">표시함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="nodisplay" id="safety-nodisplay" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="safety-nodisplay" className="font-normal text-gray-700">표시안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                         </div>
                    </div>

                    {/* Cash Receipt Settings */}
                    <div className="space-y-4">
                         <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-gray-800">현금영수증 설정</h2>
                            <HelpCircle size={14} className="text-gray-400 cursor-help" />
                        </div>

                         <div className="border border-gray-300 border-t-2 border-t-gray-800">
                             <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    PG사 모듈 버전
                                </div>
                                <div className="p-4 flex items-center text-gray-600">
                                    KCP V6.2 HUB_CASH (V 1.0.3 - 20120321)
                                </div>
                            </div>

                            <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    사용 설정
                                </div>
                                <div className="p-4">
                                     <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="used" id="cash-used" />
                                            <Label htmlFor="cash-used" className="font-normal text-gray-700">사용함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="unused" id="cash-unused" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="cash-unused" className="font-normal text-gray-700">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                             <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    필수 신청
                                </div>
                                <div className="p-4 space-y-2">
                                     <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="used" id="cash-req-used" />
                                            <Label htmlFor="cash-req-used" className="font-normal text-gray-700">사용함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="unused" id="cash-req-unused" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="cash-req-unused" className="font-normal text-gray-700">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                    <p className="flex items-start gap-1 text-xs text-gray-500">
                                        <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px] mt-0.5">!</span>
                                        현금성 거래 시, 고객이 주문서 작성 시점에 현금영수증을 필수로 신청하도록 설정하는 기능입니다.
                                    </p>
                                </div>
                            </div>

                             <div className="grid grid-cols-[200px_1fr] border-b border-gray-200 min-h-[50px]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    신청 기간 제한
                                </div>
                                <div className="p-4 flex items-center gap-2">
                                    <span className="text-gray-700">결제완료일로 부터</span>
                                    <Select defaultValue="3">
                                        <SelectTrigger className="w-[60px] h-8">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="3">3일</SelectItem>
                                            <SelectItem value="5">5일</SelectItem>
                                            <SelectItem value="7">7일</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <span className="text-gray-700">이내 신청 가능</span>
                                </div>
                            </div>

                             <div className="grid grid-cols-[200px_1fr]">
                                <div className="bg-gray-50 p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                                    현금영수증 발급방법
                                </div>
                                <div className="p-4">
                                     <RadioGroup defaultValue="auto" className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="auto" id="issue-auto" className="border-[#FF424D] text-[#FF424D]" />
                                            <Label htmlFor="issue-auto" className="font-normal text-gray-700">자동 발급</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="manual" id="issue-manual" />
                                            <Label htmlFor="issue-manual" className="font-normal text-gray-700">관리자 직접 발급</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                         </div>
                    </div>
                </TabsContent>
            </Tabs>

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
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100">
                         <ChevronUp size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none transform rotate-180">
                         <ChevronUp size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
