"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Youtube, ArrowUp, ArrowDown, Plus } from "lucide-react";

export default function OrderStatusSettingsPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">주문 상태 설정</h1>
                    <span className="text-gray-500 text-sm">주문 상태에 대한 처리 방법을 변경하거나 상태명을 변경하거나 추가를 하실 수 있습니다.</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-[#FF424D] text-[#FF424D] hover:bg-red-50 rounded-sm h-9 px-4 text-xs font-bold bg-white">
                        <Plus size={12} className="mr-1" /> 해외몰 주문상태 관리
                    </Button>
                    <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium">
                        저장
                    </Button>
                </div>
            </div>

            {/* Section 1: Order Status Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">주문 상태별 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border border-gray-300 border-b-0">
                    {/* Table Header */}
                    <div className="bg-gray-100 text-center font-bold text-gray-700 text-xs border-b border-gray-300 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px]">
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">기준상태</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">상태설명</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">관리자페이지<br/>노출이름</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">쇼핑몰페이지<br/>노출이름</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">사용<br/>설정</div>
                        
                        {/* Benefits Grant Header */}
                        <div className="border-r border-gray-300">
                            <div className="py-2 border-b border-gray-300">혜택지급시점</div>
                            <div className="grid grid-cols-2 h-full">
                                <div className="py-2 border-r border-gray-300">마일리지</div>
                                <div className="py-2">쿠폰</div>
                            </div>
                        </div>

                        {/* Benefits Deduct Header */}
                        <div className="border-r border-gray-300">
                            <div className="py-2 border-b border-gray-300">혜택차감시점</div>
                            <div className="grid grid-cols-2 h-full">
                                <div className="py-2 border-r border-gray-300">마일리지</div>
                                <div className="py-2">쿠폰</div>
                            </div>
                        </div>

                        <div className="py-3 flex items-center justify-center h-full row-span-2">재고차감<br/>시점</div>
                    </div>

                    {/* Group 1: Just Header Row */}
                    <div className="bg-blue-50/50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <span className="text-blue-500 font-bold text-xs">주문 상태 설정</span>
                            <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 bg-white border-gray-300 text-gray-600"><Plus size={10} className="mr-1"/>추가</Button>
                        </div>
                        <div className="flex items-center gap-20 pr-8">
                             <div className="flex gap-14">
                                <Checkbox disabled className="w-4 h-4 bg-gray-100 border-gray-300" />
                                <Checkbox disabled className="w-4 h-4 bg-gray-100 border-gray-300" />
                            </div>
                             <RadioGroup defaultValue="stock" className="flex">
                                <RadioGroupItem value="stock" className="text-[#FF424D] border-[#FF424D] w-4 h-4" />
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row: 입금대기 */}
                    <div className="border-b border-gray-200 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px] text-center text-xs text-gray-600 items-center hover:bg-gray-50">
                        <div className="py-3 font-bold text-gray-800">입금대기</div>
                        <div className="py-3 px-4 text-left flex items-start gap-1">
                             <span className="w-4 h-4 flex-none bg-gray-600 text-white rounded-sm text-[10px] flex items-center justify-center font-bold">!</span>
                             주문 후 입금 전 상태로 무통장, 가상계좌, 기타가 해당됩니다.
                        </div>
                        <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue="입금대기" /></div>
                        <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue="입금대기" /></div>
                        <div className="py-3 flex justify-center"><Checkbox className="w-4 h-4 border-gray-300" checked disabled /></div>
                        <div className="py-3 bg-gray-50 border-l border-r border-gray-200 h-full"></div>
                        <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                        <div className="py-3 bg-gray-50 h-full"></div>
                    </div>


                     {/* Group 2: Payment Status */}
                    <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 flex items-center justify-between grid grid-cols-[1fr_200px] gap-0"> {/* Adjusted to align with right columns roughly or just use flex */}
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">입금 상태 설정</span>
                            <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 bg-white border-gray-300 text-gray-600"><Plus size={10} className="mr-1"/>추가</Button>
                            <span className="text-[#FF424D] text-xs font-bold flex items-center ml-4">
                                <span className="w-3.5 h-3.5 flex justify-center items-center bg-[#FF424D] text-white pb-0.5 rounded-sm text-[10px] leading-none mr-1">!</span>
                                통계데이터는 해당 "입금 상태 설정" 그룹의 주문상태로 변경한 시점부터 집계됩니다.
                            </span>
                        </div>
                        <div className="flex justify-end bg-transparent pr-[40px] gap-[68px]"> {/* Manually aligning to columns */}
                            <div className="flex gap-[68px] mr-12">
                                <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap">
                                    <RadioGroupItem value="pay-mileage" className="w-4 h-4 border-gray-400" />
                                    (결제완료 시)
                                </Label>
                                <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap">
                                    <RadioGroupItem value="pay-coupon" className="w-4 h-4 border-gray-400" />
                                    (결제완료 시)
                                </Label>
                            </div>
                             <RadioGroupItem value="stock-pay" className="w-4 h-4 border-gray-300" disabled />
                        </div>
                    </div>

                    {/* Row: 결제완료 */}
                    <div className="border-b border-gray-200 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px] text-center text-xs text-gray-600 items-center hover:bg-gray-50">
                        <div className="py-3 font-bold text-gray-800">결제완료</div>
                        <div className="py-3 px-4 text-left flex items-start gap-1">
                             <span className="w-4 h-4 flex-none bg-gray-600 text-white rounded-sm text-[10px] flex items-center justify-center font-bold">!</span>
                             입금확인된 상태, 또는 결제완료된 상태입니다.
                        </div>
                        <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue="결제완료" /></div>
                        <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue="결제완료" /></div>
                        <div className="py-3 flex justify-center"><Checkbox className="w-4 h-4 border-gray-300" checked disabled /></div>
                        <div className="py-3 bg-gray-50 border-l border-r border-gray-200 h-full"></div>
                        <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                        <div className="py-3 bg-gray-50 h-full"></div>
                    </div>

                     {/* Group 3: Product Status */}
                    <div className="bg-blue-50/50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <span className="text-blue-500 font-bold text-xs">상품 상태 설정</span>
                            <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 bg-white border-gray-300 text-gray-600"><Plus size={10} className="mr-1"/>추가</Button>
                        </div>
                    </div>

                    {[
                        { title: "상품준비중", desc: "배송준비 단계로 상품여부를 확인하는 단계입니다.", check: true },
                        { title: "구매발주", desc: "배송준비 단계로 상품부족시 발주하는 단계입니다.", check: false },
                        { title: "상품입고", desc: "배송준비 단계로 부족상품이 입고된 상태입니다.", check: false },
                        { title: "상품출고", desc: "배송준비 완료 단계입니다.", check: false }
                    ].map((item, idx) => (
                        <div key={idx} className="border-b border-gray-200 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px] text-center text-xs text-gray-600 items-center hover:bg-gray-50">
                            <div className="py-3 font-bold text-gray-800">{item.title}</div>
                            <div className="py-3 px-4 text-left flex items-start gap-1">
                                <span className="w-4 h-4 flex-none bg-gray-600 text-white rounded-sm text-[10px] flex items-center justify-center font-bold">!</span>
                                {item.desc}
                            </div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 flex justify-center"><Checkbox className="w-4 h-4 border-gray-300" checked={item.check} /></div>
                            <div className="py-3 bg-gray-50 border-l border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 h-full"></div>
                        </div>
                    ))}

                    {/* Group 4: Delivery Status */}
                     <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">배송 상태 설정</span>
                            <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 bg-white border-gray-300 text-gray-600"><Plus size={10} className="mr-1"/>추가</Button>
                        </div>
                        <div className="flex justify-end gap-[68px] pr-[160px]"> {/* Adjusted padding to push left */}
                             <div className="flex gap-[68px] mr-0">
                                <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap">
                                    <RadioGroupItem value="del-mileage" className="w-4 h-4 border-gray-400" />
                                    (배송완료 시)
                                </Label>
                                <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap">
                                    <RadioGroupItem value="del-coupon" className="w-4 h-4 border-gray-400" />
                                    (배송완료 시)
                                </Label>
                            </div>
                             <RadioGroupItem value="stock-del" className="w-4 h-4 border-gray-300 invisible" /> {/* Placeholder */}
                        </div>
                    </div>

                    {[
                        { title: "배송중", desc: "상품이 출고되서 배송중인 상태입니다.", check: true },
                        { title: "배송완료", desc: "배송 완료된 상태입니다. (고객이 수취확인하거나, 관리자가 변경한 상태", check: true }
                    ].map((item, idx) => (
                        <div key={idx} className="border-b border-gray-200 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px] text-center text-xs text-gray-600 items-center hover:bg-gray-50">
                            <div className="py-3 font-bold text-gray-800">{item.title}</div>
                            <div className="py-3 px-4 text-left flex items-start gap-1">
                                <span className="w-4 h-4 flex-none bg-gray-600 text-white rounded-sm text-[10px] flex items-center justify-center font-bold">!</span>
                                {item.desc}
                            </div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 flex justify-center"><Checkbox className="w-4 h-4 border-gray-300" checked={item.check} /></div>
                            <div className="py-3 bg-gray-50 border-l border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 h-full"></div>
                        </div>
                    ))}

                    {/* Group 5: Purchase Confirm */}
                    <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">구매확정 상태 설정</span>
                            <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 bg-white border-gray-300 text-gray-600"><Plus size={10} className="mr-1"/>추가</Button>
                        </div>
                        <div className="flex justify-end gap-[68px] pr-[160px]">
                            <div className="flex gap-[68px] mr-1">
                                <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap">
                                    <RadioGroupItem value="conf-mileage" className="w-4 h-4 border-[#FF424D] text-[#FF424D]" />
                                    (구매확정 시)
                                </Label>
                                <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap">
                                    <RadioGroupItem value="conf-coupon" className="w-4 h-4 border-[#FF424D] text-[#FF424D]" />
                                    (구매확정 시)
                                </Label>
                            </div>
                        </div>
                    </div>
                     <div className="border-b border-gray-200 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px] text-center text-xs text-gray-600 items-center hover:bg-gray-50">
                        <div className="py-3 font-bold text-gray-800">구매확정</div>
                        <div className="py-3 px-4 text-left flex items-start gap-1">
                                <span className="w-4 h-4 flex-none bg-gray-600 text-white rounded-sm text-[10px] flex items-center justify-center font-bold">!</span>
                                구매확정된 상태입니디. (고객이 구매확정하거나, 관리자가 상태변경)
                        </div>
                        <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue="구매확정" /></div>
                        <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue="구매확정" /></div>
                        <div className="py-3 flex justify-center"><Checkbox className="w-4 h-4 border-gray-300" checked /></div>
                        <div className="py-3 bg-gray-50 border-l border-r border-gray-200 h-full"></div>
                        <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                        <div className="py-3 bg-gray-50 h-full"></div>
                    </div>

                </div>
            </div>

            {/* Section 2: Cancel Status Settings */}
            <div className="space-y-4 pt-8">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">취소 상태별 설정</h2>
                     <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                 <div className="border border-gray-300 border-b-0">
                    {/* Header */}
                    <div className="bg-gray-100 text-center font-bold text-gray-700 text-xs border-b border-gray-300 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px]">
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">기준상태</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">상태설명</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">관리자페이지<br/>노출이름</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">쇼핑몰페이지<br/>노출이름</div>
                        <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">사용<br/>설정</div>
                        
                        {/* Restoration Header */}
                        <div className="border-r border-gray-300">
                            <div className="py-2 border-b border-gray-300">혜택복원시점</div>
                            <div className="grid grid-cols-2 h-full">
                                <div className="py-2 border-r border-gray-300">마일리지</div>
                                <div className="py-2">쿠폰</div>
                            </div>
                        </div>

                         <div className="py-3 flex items-center justify-center border-r border-gray-300 h-full row-span-2">재고복원시점</div>
                        <div className="py-3 flex items-center justify-center h-full row-span-2">재고차감시점</div>
                    </div>

                    {/* Group 1: Cancel Status */}
                    <div className="bg-blue-50/50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">취소 상태 설정</span>
                            <Button variant="outline" size="sm" className="h-6 text-[10px] px-2 bg-white border-gray-300 text-gray-600"><Plus size={10} className="mr-1"/>추가</Button>
                             <span className="text-gray-700 text-xs flex items-center ml-4">
                                : <Input className="w-12 h-6 mx-1 text-center" defaultValue="0" /> 일 동안 미입금시 주문자동취소 <span className="text-gray-400 ml-1">(자동취소를 원하지 않는 경우 0으로 설정)</span>
                            </span>
                        </div>
                        <div className="flex justify-end pr-[55px] gap-[68px]"> {/* Align */}
                            <div className="flex gap-[68px] mr-12">
                                <div className="flex justify-center w-4"><Checkbox className="w-4 h-4 bg-gray-100 border-gray-300" disabled checked /></div>
                                <div className="flex justify-center w-4"><Checkbox className="w-4 h-4 bg-gray-100 border-gray-300" disabled checked /></div>
                            </div>
                             <div className="flex justify-center w-4"><Checkbox className="w-4 h-4 border-[#FF424D] data-[state=checked]:bg-[#FF424D]" checked/></div>
                        </div>
                    </div>

                    {[
                        { title: "자동취소", desc: "주문접수 후 오랜동안 미입금 되거나, 가상계좌 만료된 상태입니다." },
                        { title: "품절취소", desc: "주문접수 후 상품재고가 없어 취소된 상태입니다." },
                        { title: "관리자취소", desc: "주문접수 후 관리자가 여러 원인에의해 임의 취소한 상태입니다." },
                        { title: "고객취소요청", desc: "주문접수 단계에서 고객이 취소요청을 한 상태입니다." },
                    ].map((item, idx) => (
                        <div key={idx} className="border-b border-gray-200 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px] text-center text-xs text-gray-600 items-center hover:bg-gray-50">
                            <div className="py-3 font-bold text-gray-800">{item.title}</div>
                            <div className="py-3 px-4 text-left flex items-start gap-1">
                                <span className="w-4 h-4 flex-none bg-gray-600 text-white rounded-sm text-[10px] flex items-center justify-center font-bold">!</span>
                                {item.desc}
                            </div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 flex justify-center"><Checkbox className="w-4 h-4 border-gray-300" checked /></div>
                           <div className="py-3 bg-gray-50 border-l border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 h-full"></div>
                        </div>
                    ))}

                    {/* Group 2: Failure Status */}
                    <div className="bg-blue-50/50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <span className="text-blue-500 font-bold text-xs">실패 상태 설정</span>
                        </div>
                    </div>
                     {[
                        { title: "고객결제중단", desc: "고객이 결제완료 전 PG사 결제창을 닫거나 다른 페이지로 이동한 상태입니다." },
                        { title: "결제실패", desc: "고객결제 후 PG사에서 결제실패 결과값을 받은 상태입니다." },
                        { title: "PG확인요망", desc: "고객결제 후 PG사에서 결과값을 받지 못하여 PG사에서 확인이 필요한 상태입니다." },
                    ].map((item, idx) => (
                        <div key={idx} className="border-b border-gray-200 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px] text-center text-xs text-gray-600 items-center hover:bg-gray-50">
                            <div className="py-3 font-bold text-gray-800">{item.title}</div>
                            <div className="py-3 px-4 text-left flex items-start gap-1">
                                <span className="w-4 h-4 flex-none bg-gray-600 text-white rounded-sm text-[10px] flex items-center justify-center font-bold">!</span>
                                {item.desc}
                            </div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 flex justify-center"><Checkbox className="w-4 h-4 border-gray-300" checked /></div>
                             <div className="py-3 bg-gray-50 border-l border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 h-full"></div>
                        </div>
                    ))}

                    {/* Group 3: Return Status */}
                    <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">반품 상태 설정</span>
                             <HelpCircle size={14} className="text-gray-400 cursor-help" />
                        </div>
                         <div className="flex justify-end pr-[55px] gap-[68px]">
                            <div className="flex gap-[68px] mr-12 invisible"></div>
                             <div className="flex justify-end gap-1 items-center">
                                 <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap">
                                    <Checkbox className="w-4 h-4 border-[#FF424D] data-[state=checked]:bg-[#FF424D]" checked/>
                                    (반품회수완료 시)
                                </Label>
                             </div>
                        </div>
                    </div>
                     {[
                        { title: "반품접수", desc: "배송후 환불/교환 목적으로 반품을 접수하는 단계입니다.", manualCheck: true },
                        { title: "반송중", desc: "고객이 반품한 상품을 쇼핑몰에서 다시 고객에게 반송하는 단계입니다.", manualCheck: true, checkColor: 'red' },
                        { title: "반품보류", desc: "고객이 접수한 반품요청을 보류처리한 상태입니다.", manualCheck: true, checkColor: 'red' },
                        { title: "반품회수완료", desc: "고객이 반품한 상품이 쇼핑몰에 회수완료 된 상태입니다.", manualCheck: true },
                    ].map((item, idx) => (
                        <div key={idx} className="border-b border-gray-200 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px] text-center text-xs text-gray-600 items-center hover:bg-gray-50">
                            <div className="py-3 font-bold text-gray-800">{item.title}</div>
                            <div className="py-3 px-4 text-left flex items-start gap-1">
                                <span className="w-4 h-4 flex-none bg-gray-600 text-white rounded-sm text-[10px] flex items-center justify-center font-bold">!</span>
                                {item.desc}
                            </div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 flex justify-center">
                                {item.checkColor === 'red' ? 
                                    <Checkbox className="w-4 h-4 border-[#FF424D] data-[state=checked]:bg-[#FF424D]" checked /> : 
                                    <Checkbox className="w-4 h-4 border-gray-300" checked />
                                }
                            </div>
                            <div className="py-3 bg-gray-50 border-l border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 h-full"></div>
                        </div>
                    ))}

                    {/* Group 4: Exchange Status */}
                    <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">교환 취소 상태 설정</span>
                        </div>
                          <div className="flex justify-end pr-[55px] gap-[68px]">
                            <div className="flex gap-[68px] mr-12 invisible"></div>
                             <div className="flex justify-end gap-1 items-center">
                                 <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap">
                                    <Checkbox className="w-4 h-4 border-[#FF424D] data-[state=checked]:bg-[#FF424D]" checked/>
                                    (교환완료 시)
                                </Label>
                             </div>
                        </div>
                    </div>
                     {[
                        { title: "교환접수", desc: "반품 접수이후 상품 교환 접수 단계입니다.", check: true },
                        { title: "반송중", desc: "고객이 상품교환을 위해 받은 상품을 다시 반송하는 단계입니다.", check: true, checkColor: 'red' },
                        { title: "재배송중", desc: "반송된 상품을 확인하고 교환상품을 재발송하는 단계입니다.", check: true, checkColor: 'red' },
                        { title: "교환보류", desc: "고객이 접수한 반품요청을 보류처리한 상태입니다.", check: true, checkColor: 'red' },
                        { title: "교환완료", desc: "교환상품이 배송완료된 상태입니다.", check: true }
                    ].map((item, idx) => (
                        <div key={idx} className="border-b border-gray-200 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px] text-center text-xs text-gray-600 items-center hover:bg-gray-50">
                            <div className="py-3 font-bold text-gray-800">{item.title}</div>
                            <div className="py-3 px-4 text-left flex items-start gap-1">
                                <span className="w-4 h-4 flex-none bg-gray-600 text-white rounded-sm text-[10px] flex items-center justify-center font-bold">!</span>
                                {item.desc}
                            </div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 flex justify-center">
                                  {item.checkColor === 'red' ? 
                                    <Checkbox className="w-4 h-4 border-[#FF424D] data-[state=checked]:bg-[#FF424D]" checked /> : 
                                    <Checkbox className="w-4 h-4 border-gray-300" checked />
                                }
                            </div>
                            <div className="py-3 bg-gray-50 border-l border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 h-full"></div>
                        </div>
                    ))}

                    {/* Group 5: Refund Status */}
                     <div className="bg-gray-50 border-b border-gray-200 py-2 px-4 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <span className="text-blue-500 font-bold text-xs">환불 상태 설정</span>
                             <HelpCircle size={14} className="text-gray-400 cursor-help" />
                        </div>
                          <div className="flex justify-end pr-[55px] gap-[68px]">
                            <div className="flex gap-[68px] mr-12 invisible"></div>
                             <div className="flex justify-end gap-1 items-center">
                                 <Label className="flex flex-col items-center gap-1 font-normal text-xs text-gray-500 whitespace-nowrap">
                                    <Checkbox className="w-4 h-4 border-gray-300" checked/>
                                    (환불완료 시)
                                </Label>
                             </div>
                        </div>
                    </div>
                     {[
                        { title: "환불접수", desc: "입금확인 또는 반품요청 이후 관리자가 환불 처리하는 단계입니다.", checkColor: 'gray' },
                        { title: "환불보류", desc: "고객이 접수한 환불요청을 보류처리한 상태입니다.", checkColor: 'red' },
                        { title: "환불완료", desc: "환불이 완료된 상태로, 해당주문상품이 취소완료된 상태입니다.", checkColor: 'gray' }
                    ].map((item, idx) => (
                        <div key={idx} className="border-b border-gray-200 grid grid-cols-[120px_1fr_120px_120px_60px_160px_160px_90px] text-center text-xs text-gray-600 items-center hover:bg-gray-50">
                            <div className="py-3 font-bold text-gray-800">{item.title}</div>
                            <div className="py-3 px-4 text-left flex items-start gap-1">
                                <span className="w-4 h-4 flex-none bg-gray-600 text-white rounded-sm text-[10px] flex items-center justify-center font-bold">!</span>
                                {item.desc}
                            </div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 px-2"><Input className="h-7 text-xs" defaultValue={item.title} /></div>
                            <div className="py-3 flex justify-center">
                                 {item.checkColor === 'red' ? 
                                    <Checkbox className="w-4 h-4 border-[#FF424D] data-[state=checked]:bg-[#FF424D]" checked /> : 
                                    <Checkbox className="w-4 h-4 border-gray-300" checked />
                                }
                            </div>
                            <div className="py-3 bg-gray-50 border-l border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 border-r border-gray-200 h-full"></div>
                            <div className="py-3 bg-gray-50 h-full"></div>
                        </div>
                    ))}
                 </div>
            </div>

             {/* Footer Copyright */}
            <div className="text-center text-xs text-gray-500 pt-8 pb-4">
                © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-[#FF424D]">5.1.23.1206.5ccf2dd6</span>)
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
