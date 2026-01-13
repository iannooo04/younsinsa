import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Youtube, ChevronUp, Book, Download } from "lucide-react";

export default function OrderPrintSettingsPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">주문서 인쇄 설정</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-gray-300 bg-white hover:bg-gray-50 rounded-md h-10 px-3 flex items-center gap-2">
                        <div className="bg-[#E5F9EE] p-1 rounded items-center flex justify-center">
                            <Download size={14} className="text-[#00C055]" strokeWidth={2.5} />
                        </div>
                        <span className="text-[#00C055] font-bold">엑셀다운로드</span>
                    </Button>
                    <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-10 px-6 font-bold">
                        저장
                    </Button>
                </div>
            </div>

            {/* Section 1: Transaction Statement Print Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">거래명세서 출력 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border border-gray-300 border-t-2 border-t-gray-800">
                    {/* Row 1 */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            쇼핑몰 동시 적용
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <Checkbox id="apply-mall-trans" className="rounded-[2px]" defaultChecked />
                                <Label htmlFor="apply-mall-trans" className="text-gray-700 font-normal">쇼핑몰에 적용 (고객 동일 조건 출력)</Label>
                            </div>
                            <div className="text-xs text-gray-500 flex items-start gap-1">
                                <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px] mt-0.5">!</span>
                                <div>
                                    <p>쇼핑몰 마이페이지에서 고객이 직접 출력할 수 있는 거래명세서에도 아래 조건이 동일하게 적용되며,</p>
                                    <p><span className="text-[#FF424D]">체크 해제시, 아래 설정된 조건들은 어드민 출력시에만 적용</span>되며, 고객은 기본값 조건으로만 적용되어(하단 도움말 참조) 출력됩니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            수량 합계 표시
                        </div>
                        <div className="p-4 flex items-center gap-6">
                            <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="qty-total-used" />
                                    <Label htmlFor="qty-total-used" className="font-normal text-gray-700">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="qty-total-unused" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="qty-total-unused" className="font-normal text-gray-700">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            상품코드 항목
                        </div>
                        <div className="p-4 flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Checkbox id="prod-code-trans" className="rounded-[2px]" />
                                <Label htmlFor="prod-code-trans" className="text-gray-700 font-normal">상품코드</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="own-code-trans" className="rounded-[2px]" />
                                <Label htmlFor="own-code-trans" className="text-gray-700 font-normal">자체상품코드</Label>
                            </div>
                        </div>
                    </div>

                    {/* Row 4 */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            합계 금액 포함 여부
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="shipping-fee" className="rounded-[2px] border-[#FF424D] data-[state=checked]:bg-[#FF424D] data-[state=checked]:text-white" defaultChecked />
                                    <Label htmlFor="shipping-fee" className="text-gray-700 font-normal">배송비</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="discount" className="rounded-[2px] border-[#FF424D] data-[state=checked]:bg-[#FF424D] data-[state=checked]:text-white" defaultChecked />
                                    <Label htmlFor="discount" className="text-gray-700 font-normal">할인금액</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="mileage" className="rounded-[2px]" />
                                    <Label htmlFor="mileage" className="text-gray-700 font-normal">마일리지</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="deposit" className="rounded-[2px]" />
                                    <Label htmlFor="deposit" className="text-gray-700 font-normal">예치금</Label>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 flex items-start gap-1">
                                <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px] mt-0.5">!</span>
                                <div>
                                    <p>거래 명세서 하단에 출력되는 (합계 금액)에 포함되는 금액 항목을 설정합니다.</p>
                                    <p>체크하지 않으면 세부항목에는 나오나, 합계금액에 해당 금액은 합산되어 출력되지 않습니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 5 */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            사업자 회원
                        </div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="biz-member-used" />
                                    <Label htmlFor="biz-member-used" className="font-normal text-gray-700">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="biz-member-unused" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="biz-member-unused" className="font-normal text-gray-700">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px]">!</span>
                                <span>주문자가 사업자 회원인 경우, 거래명세서 내 (공급받는자) 영역에 사업자 정보를 표기하여 출력합니다.</span>
                            </div>
                        </div>
                    </div>

                    {/* Row 6 */}
                    <div className="grid grid-cols-[200px_1fr]">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            하단 추가 정보 표기
                        </div>
                        <div className="p-4 flex items-center gap-6">
                             <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="footer-info-trans-used" />
                                    <Label htmlFor="footer-info-trans-used" className="font-normal text-gray-700">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="footer-info-trans-unused" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="footer-info-trans-unused" className="font-normal text-gray-700">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Order Details Print Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">주문내역서 출력 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border border-gray-300 border-t-2 border-t-gray-800">
                    {/* Row 1 */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            쇼핑몰 동시 적용
                        </div>
                        <div className="p-4 flex items-center gap-2">
                            <Checkbox id="apply-mall-order" className="rounded-[2px] border-[#FF424D] data-[state=checked]:bg-[#FF424D] data-[state=checked]:text-white" defaultChecked />
                            <Label htmlFor="apply-mall-order" className="text-gray-700 font-normal">주문내역서 (고객용) 동일 적용</Label>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            상품코드 항목
                        </div>
                        <div className="p-4 flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Checkbox id="prod-code-order" className="rounded-[2px]" />
                                <Label htmlFor="prod-code-order" className="text-gray-700 font-normal">상품코드</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="own-code-order" className="rounded-[2px]" />
                                <Label htmlFor="own-code-order" className="text-gray-700 font-normal">자체상품코드</Label>
                            </div>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            공급사명 표시
                        </div>
                        <div className="p-4 flex items-center gap-6">
                            <RadioGroup defaultValue="display" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="display" id="supplier-display" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="supplier-display" className="font-normal text-gray-700">표시</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="no-display" id="supplier-hide" />
                                    <Label htmlFor="supplier-hide" className="font-normal text-gray-700">표시안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 4 */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                         <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            상품이미지 표시
                        </div>
                        <div className="p-4 flex items-center gap-6">
                             <RadioGroup defaultValue="display" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="display" id="img-display" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="img-display" className="font-normal text-gray-700">표시</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="no-display" id="img-hide" />
                                    <Label htmlFor="img-hide" className="font-normal text-gray-700">표시안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 5 */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            결제정보 & 수단표시
                        </div>
                        <div className="p-4 flex items-center gap-6">
                            <RadioGroup defaultValue="display" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="display" id="pay-display" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="pay-display" className="font-normal text-gray-700">표시</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="no-display" id="pay-hide" />
                                    <Label htmlFor="pay-hide" className="font-normal text-gray-700">표시안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 6 */}
                    <div className="grid grid-cols-[200px_1fr] border-b border-gray-200">
                         <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                            관리자메모 표시
                        </div>
                        <div className="p-4 flex items-center gap-6">
                            <RadioGroup defaultValue="no-display" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="display" id="memo-display" />
                                    <Label htmlFor="memo-display" className="font-normal text-gray-700">표시</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="no-display" id="memo-hide" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="memo-hide" className="font-normal text-gray-700">표시안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 7 */}
                    <div className="grid grid-cols-[200px_1fr]">
                        <div className="bg-gray-50 py-4 px-4 font-bold text-gray-700 flex items-start border-r border-gray-200">
                            하단 추가 정보 표기
                        </div>
                         <div className="p-4 space-y-4">
                            <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="footer-info-order-used" />
                                    <Label htmlFor="footer-info-order-used" className="font-normal text-gray-700">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="footer-info-order-unused" className="border-[#FF424D] text-[#FF424D]" />
                                    <Label htmlFor="footer-info-order-unused" className="font-normal text-gray-700">사용안함</Label>
                                </div>
                            </RadioGroup>
                            
                            <Textarea className="min-h-[60px] resize-none" />
                            
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px]">!</span>
                                <span>주문내역서 하단에 필요에 따라 추가정보를 출력하실 수 있습니다.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="pt-8 border-t border-gray-300">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-blue-500"><Book size={16} /></span>
                    <h3 className="font-bold text-gray-700">안내</h3>
                </div>
                
                <h4 className="text-sm font-bold text-gray-600 mb-2">거래명세서 출력 설정 기본값은 무엇인가요?</h4>
                <ul className="text-xs text-gray-500 space-y-2 list-none pl-1">
                    <li className="flex items-start">
                        <span className="mr-1">·</span>
                        거래명세서 출력 설정에서 쇼핑몰 동시 적용을 해제하는 경우에 고객이 출력하는 거래명세서는 "거래명세서 기본 값"으로만 출력되며, 다음과 같습니다.
                    </li>
                    <li className="flex items-start">
                        <span className="mr-1">·</span>
                        수량 합계는 "사용안함"이므로 각 항목의 수량만 표시되고 최종 합산 수량은 표시되지 않습니다.
                    </li>
                    <li className="flex items-start">
                         <span className="mr-1">·</span>
                        기본값에 노출되는 합계 금액은 배송비와 할인금액만 포함되며, 고객이 주문 시 사용한 마일리지 혹은 예치금 금액에 포함되어 나오지 않습니다.
                    </li>
                     <li className="flex items-start">
                         <span className="mr-1">·</span>
                         사업자 회원에 대해서도 별도 사업자 정보를 표기하여 나오지 않으며, 하단정보 역시 사용안함 상태로 출력되게 됩니다.
                    </li>
                </ul>
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
