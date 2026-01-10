"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, Youtube, ArrowUp, ArrowDown, BookOpen } from "lucide-react";

export default function OverseasPaymentSettingsPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <div className="flex items-end gap-2">
                     <h1 className="text-2xl font-bold text-gray-900 leading-none">해외 결제 설정</h1>
                     <span className="text-gray-500 text-xs">계약된 해외 결제(PG)의 설정을 하실 수 있습니다.</span>
                </div>
               
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-6 text-sm font-medium">
                    PG 정보 저장
                </Button>
            </div>

            {/* Payment Tabs Section */}
            <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">해외 결제 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="w-full">
                    {/* Tabs */}
                    <div className="flex border border-gray-300 border-b-0">
                        <div className="flex-1 py-3 text-center border-r border-gray-300 bg-white font-bold text-gray-800 border-t-2 border-t-black cursor-pointer">
                            ALIPAY
                        </div>
                        <div className="flex-1 py-3 text-center border-r border-gray-300 bg-gray-50 text-gray-500 border-b border-b-gray-300 cursor-pointer hover:bg-white">
                            UNIONPAY
                        </div>
                        <div className="flex-1 py-3 text-center border-r border-gray-300 bg-gray-50 text-gray-500 border-b border-b-gray-300 cursor-pointer hover:bg-white">
                            PayPal
                        </div>
                        <div className="flex-1 py-3 text-center bg-gray-50 text-gray-500 border-b border-b-gray-300 cursor-pointer hover:bg-white">
                            VISA/Master/JCB
                        </div>
                    </div>

                    {/* Content */}
                    <div className="border border-gray-300 border-t-0 text-sm">
                        {/* Usage Status */}
                        <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                            <div className="p-4 bg-gray-50 font-medium text-gray-700">사용여부</div>
                            <div className="p-4 space-y-2">
                                <p className="text-red-500 font-bold flex items-center gap-1 text-xs">
                                     <span className="w-3.5 h-3.5 flex justify-center items-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                                     해외 결제(PG) 신청 전 또는 승인대기상태입니다.
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="text-gray-500 flex items-center gap-1 text-xs">
                                        <span className="w-3.5 h-3.5 flex justify-center items-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                                        신청 전인 경우 먼저 서비스를 신청하세요.
                                    </p>
                                    <Button size="sm" className="h-6 text-xs px-2 bg-gray-400 hover:bg-gray-500 text-white rounded-sm font-normal">
                                        해외 결제(PG) 신청
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Approved Currency */}
                        <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                             <div className="p-4 bg-gray-50 font-medium text-gray-700">승인 가능 화폐</div>
                             <div className="p-4 text-xl font-medium text-gray-800">
                                USD / CNY
                             </div>
                        </div>

                        {/* ALIPAY Merchant ID */}
                        <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                             <div className="p-4 bg-gray-50 font-medium text-gray-700">ALIPAY 상점 ID</div>
                             <div className="p-4">
                                <p className="text-red-500 font-bold flex items-center gap-1 text-xs">
                                     <span className="w-3.5 h-3.5 flex justify-center items-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                                     해외 결제(PG) 신청 전 또는 승인대기상태입니다.
                                </p>
                             </div>
                        </div>

                         {/* ALIPAY Merchant Key */}
                         <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                             <div className="p-4 bg-gray-50 font-medium text-gray-700">ALIPAY 상점 Key</div>
                             <div className="p-4">
                                <p className="text-red-500 font-bold flex items-center gap-1 text-xs">
                                     <span className="w-3.5 h-3.5 flex justify-center items-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                                     해외 결제(PG) 신청 전 또는 승인대기상태입니다.
                                </p>
                             </div>
                        </div>

                        {/* Alipay Site */}
                        <div className="grid grid-cols-[200px_1fr]">
                             <div className="p-4 bg-gray-50 font-medium text-gray-700">Alpay 사이트</div>
                             <div className="p-4 flex gap-1">
                                <Button size="sm" className="h-7 text-xs px-3 bg-gray-400 hover:bg-gray-500 text-white rounded-sm font-normal">
                                    상점 관리자모드 바로가기
                                </Button>
                                 <Button size="sm" className="h-7 text-xs px-3 bg-gray-400 hover:bg-gray-500 text-white rounded-sm font-normal">
                                    사이트 바로가기
                                </Button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

             {/* Bottom Info */}
             <div className="border border-gray-200 p-6 space-y-8 pt-8 border-l-0 border-r-0 border-b-0 mt-12 bg-white">
                <div className="flex items-center gap-1 text-blue-500 font-bold mb-2">
                    <BookOpen size={16} />
                    <span>안내</span>
                </div>
                <div className="text-xs text-gray-500 space-y-8 leading-relaxed">
                    <div className="space-y-2">
                        <p className="font-bold text-gray-700 text-sm">· 해외 결제 설정은 어떻게 해야하나요?</p>
                        <p>해외 결제 설정 역시 국내 통합PG와 마찬가지로 PG제휴사를 통해 계약 진행을 하셔야 사용이 가능합니다.</p>
                        <p>PayPal 이나 기타 다른 PG결제 서비스 모두 제휴사와의 제휴를 통해 제공되는 서비스입니다.</p>
                        <p>자세한 사항은 부가서비스 메뉴의 "해외 결제" 내용을 참고하시기 바랍니다.</p>
                    </div>

                    <div className="space-y-2">
                        <p className="font-bold text-gray-700 text-sm">· 해외 결제를 국내몰(한국몰)에도 설정할 수 있나요?</p>
                        <p>국내몰에서도 해외 결제를 이용하기 위해서는 PG제휴사와 국내몰 결제에 대한 추가 계약이 필요하며,</p>
                        <p>이용 가능한 해외 결제 PG사는 Alipay / Unionpay / VISA/Master/JCB 에서만 이용 가능합니다.</p>
                        <p className="text-blue-600">계약 완료 후 각 해외결제 수단별 "사용 상점" 설정 항목에서 국내몰에 대하여 체크 후 저장 시 국내몰에서도 주문서 작성페이지의 결제 수단에 해외 결제수단이 노출됩니다.</p>
                        <p>고객이 해외 결제 수단을 선택하게 되면, 결제금액은 해당 결제수단의 <span className="font-bold">"승인 가능화폐"</span> 단위 금액으로 변경되어 결제가 이루어집니다.</p>
                        <p>이 때의 환율은 <span className="font-bold">[기본설정&gt;해외상점&gt;환율설정]</span> 에서 설정한 환율을 참고합니다.</p>
                    </div>

                    <div className="space-y-2">
                         <p>※ <span className="font-bold text-gray-800">PayPal의 경우</span>, 다른 해외 결제수단과 달리 국내쇼핑몰의 모든 페이지에서 노출되는 금액이 모두 USD 금액으로 (병행)노출되어야만</p>
                         <p className="pl-3">승인심사가 가능하도록 정책이 변경됨에 따라, 국내몰에서 지원되는 해외 결제 수단에 포함되지 않습니다.</p>
                         <p className="pl-3">해당 PG 제휴사에 대해서 국내몰도 지원 가능하도록 추후 개선될 예정입니다.</p>
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
