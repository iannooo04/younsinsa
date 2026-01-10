"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HelpCircle, Youtube, ArrowUp, ArrowDown, BookOpen } from "lucide-react";

export default function OrderBasicSettingsPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">주문 기본 설정</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium">
                    저장
                </Button>
            </div>

            {/* Section 1: Order Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">주문 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border-t border-gray-400">
                    {/* Confirmation Check */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            결제페이지<br/>청약의사 재확인 설정
                        </div>
                        <div className="p-4 flex items-center gap-6">
                            <RadioGroup defaultValue="used" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="confirm-used" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="confirm-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="confirm-unused" />
                                    <Label htmlFor="confirm-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Auto Delivery Complete */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            자동배송완료
                        </div>
                        <div className="p-4 space-y-2">
                             <RadioGroup defaultValue="unused" className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="delivery-used" />
                                    <Label htmlFor="delivery-used" className="font-normal cursor-pointer flex items-center gap-2">
                                        '배송중'으로 주문상태 변경한 뒤 <Input className="w-16 h-7 mx-1" defaultValue="7" /> 일 후 '배송완료'로 자동 주문상태 변경
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="delivery-unused" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="delivery-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Auto Purchase Confirmation */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            자동구매확정
                        </div>
                        <div className="p-4 space-y-2">
                             <RadioGroup defaultValue="unused" className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="purchase-used" />
                                    <Label htmlFor="purchase-used" className="font-normal cursor-pointer flex items-center gap-2">
                                        '배송완료'로 주문상태 변경한 뒤 <Input className="w-16 h-7 mx-1" defaultValue="7" /> 일 후 '구매확인'으로 자동 주문상태 변경
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="purchase-unused" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="purchase-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Refund Reconfirmation */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            환불 진행 재확인<br/>사용설정
                        </div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="refund-used" />
                                    <Label htmlFor="refund-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="refund-unused" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="refund-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-gray-500 flex items-center gap-1 text-xs">
                                <span className="w-3.5 h-3.5 flex justify-center items-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                                환불 처리 시 환불 진행 여부를 한번 더 확인하여 안전하게 환불 처리를 할 수 있습니다.
                            </p>
                        </div>
                    </div>

                     {/* Customer Claim Request */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            고객 교환/반품/환불<br/>신청기능 사용설정
                        </div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="unused" className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="claim-used" />
                                    <Label htmlFor="claim-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="claim-unused" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="claim-unused" className="font-normal cursor-pointer">사용안함</Label>
                                    <span className="text-gray-400 text-xs flex items-center gap-1 ml-2">
                                         <span className="w-3.5 h-3.5 flex justify-center items-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                                          사용안함 선택 시 쇼핑몰에서 구매자가 직접 교환/반품/환불 신청할 수 없습니다.
                                    </span>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>

             {/* Section 2: Claim Processing Default Display Settings */}
             <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">클레임 처리 기본 노출 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border-t border-gray-400">
                    {/* Admin Order Cancel */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            관리자 주문취소 시
                        </div>
                        <div className="p-4 space-y-2 text-sm text-gray-700">
                             <div className="grid grid-cols-[150px_1fr] items-center">
                                <span>재고 수량 복원 설정</span>
                                <RadioGroup defaultValue="restore" className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="restore" id="cancel-stock-restore" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]"/>
                                        <Label htmlFor="cancel-stock-restore" className="font-normal cursor-pointer">복원함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="norestore" id="cancel-stock-norestore" />
                                        <Label htmlFor="cancel-stock-norestore" className="font-normal cursor-pointer">복원안함</Label>
                                    </div>
                                </RadioGroup>
                             </div>
                             <div className="grid grid-cols-[150px_1fr] items-center">
                                <span>쿠폰 복원 설정</span>
                                <RadioGroup defaultValue="norestore" className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="restore" id="cancel-coupon-restore" />
                                        <Label htmlFor="cancel-coupon-restore" className="font-normal cursor-pointer">복원함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="norestore" id="cancel-coupon-norestore" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                        <Label htmlFor="cancel-coupon-norestore" className="font-normal cursor-pointer">복원안함</Label>
                                    </div>
                                </RadioGroup>
                             </div>
                             <div className="grid grid-cols-[150px_1fr] items-center">
                                <span>사은품 지급 설정</span>
                                <RadioGroup defaultValue="provide" className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="provide" id="cancel-gift-provide" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]"/>
                                        <Label htmlFor="cancel-gift-provide" className="font-normal cursor-pointer">지급함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="noprovide" id="cancel-gift-noprovide" />
                                        <Label htmlFor="cancel-gift-noprovide" className="font-normal cursor-pointer">지급안함</Label>
                                    </div>
                                </RadioGroup>
                             </div>
                        </div>
                    </div>

                    {/* Admin Exchange Request */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            관리자 교환접수 시
                        </div>
                        <div className="p-4 space-y-2 text-sm text-gray-700">
                             <div className="grid grid-cols-[280px_1fr] items-center">
                                <span>교환취소 상품에 사용한 쿠폰 복원 여부</span>
                                <RadioGroup defaultValue="norestore" className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="restore" id="exchange-coupon-restore" />
                                        <Label htmlFor="exchange-coupon-restore" className="font-normal cursor-pointer">복원함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="norestore" id="exchange-coupon-norestore" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                        <Label htmlFor="exchange-coupon-norestore" className="font-normal cursor-pointer">복원안함</Label>
                                    </div>
                                </RadioGroup>
                             </div>
                             <div className="grid grid-cols-[280px_1fr] items-center">
                                <span>교환취소 상품의 사은품 지급여부</span>
                                <RadioGroup defaultValue="provide" className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="provide" id="exchange-gift-provide" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                        <Label htmlFor="exchange-gift-provide" className="font-normal cursor-pointer">지급함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="noprovide" id="exchange-gift-noprovide" />
                                        <Label htmlFor="exchange-gift-noprovide" className="font-normal cursor-pointer">지급안함</Label>
                                    </div>
                                </RadioGroup>
                             </div>
                             <div className="grid grid-cols-[280px_1fr] items-center">
                                <span>교환추가 상품에 적용된 마일리지 지급 여부</span>
                                <RadioGroup defaultValue="provide" className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="provide" id="exchange-mileage-provide" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                        <Label htmlFor="exchange-mileage-provide" className="font-normal cursor-pointer">지급함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="noprovide" id="exchange-mileage-noprovide" />
                                        <Label htmlFor="exchange-mileage-noprovide" className="font-normal cursor-pointer">지급안함</Label>
                                    </div>
                                </RadioGroup>
                             </div>
                             <div className="grid grid-cols-[280px_1fr] items-center">
                                <span>교환추가 상품에 적용된 쿠폰 마일리지 지급 여부</span>
                                <RadioGroup defaultValue="provide" className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="provide" id="exchange-coupon-mileage-provide" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                        <Label htmlFor="exchange-coupon-mileage-provide" className="font-normal cursor-pointer">지급함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="noprovide" id="exchange-coupon-mileage-noprovide" />
                                        <Label htmlFor="exchange-coupon-mileage-noprovide" className="font-normal cursor-pointer">지급안함</Label>
                                    </div>
                                </RadioGroup>
                             </div>
                        </div>
                    </div>

                    {/* Admin Refund Complete */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">
                            관리자 환불완료 시
                        </div>
                        <div className="p-4 space-y-2 text-sm text-gray-700">
                             <div className="grid grid-cols-[150px_1fr] items-center">
                                <span>재고 수량 복원 설정</span>
                                <RadioGroup defaultValue="norestore" className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="restore" id="refund-stock-restore" />
                                        <Label htmlFor="refund-stock-restore" className="font-normal cursor-pointer">복원함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="norestore" id="refund-stock-norestore" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                        <Label htmlFor="refund-stock-norestore" className="font-normal cursor-pointer">복원안함</Label>
                                    </div>
                                </RadioGroup>
                             </div>
                             <div className="grid grid-cols-[150px_1fr] items-center">
                                <span>쿠폰 복원 설정</span>
                                <RadioGroup defaultValue="norestore" className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="restore" id="refund-coupon-restore" />
                                        <Label htmlFor="refund-coupon-restore" className="font-normal cursor-pointer">복원함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="norestore" id="refund-coupon-norestore" className="text-[#FF424D] border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                        <Label htmlFor="refund-coupon-norestore" className="font-normal cursor-pointer">복원안함</Label>
                                    </div>
                                </RadioGroup>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-gray-400 font-medium flex items-center gap-1 pt-2">
                    <span className="w-3.5 h-3.5 flex justify-center items-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                    주문 클레임 처리 시 재고, 쿠폰복원 등 처리방안의 기본 선택값을 설정할 수 있습니다. 클레임 처리 화면 접근 시 설정한 값이 기본으로 선택되어 노출됩니다.
                </div>
            </div>

             {/* Bottom Info */}
             <div className="border border-gray-200 p-6 space-y-4 pt-8 border-l-0 border-r-0 border-b-0 mt-12 bg-white">
                <div className="flex items-center gap-1 text-blue-500 font-bold mb-2">
                    <BookOpen size={16} />
                    <span>안내</span>
                </div>
                <div className="text-xs text-gray-500 space-y-2 leading-relaxed">
                    <p className="font-bold text-gray-700 text-sm mb-1">자동배송완료/자동구매확정 기능 사용 시, 주문상태는 언제 변경이 되나요?</p>
                    <p>· 자동배송완료 : 매일 약 오전 1시에 '배송일'을 기준으로 (설정값)일이 지난 주문의 상태를 '배송완료'로 일괄 변경합니다.</p>
                    <p>· 자동구매확정 : 매일 약 오전 1시에 '배송완료일'을 기준으로 (설정값)일이 지난 주문의 상태를 '구매확정'으로 일괄 변경합니다.</p>
                    <p>· 날짜 비교 시 '배송일'과 '배송완료일'의 시간은 비교하지 않으며, 일자 기준으로만 비교하여 주문상태를 변경합니다.</p>
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
