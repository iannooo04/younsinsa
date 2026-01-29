"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, ChevronUp, Camera } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function MemberGradeEditPage() {
    // Mock state for form fields - In a real app, these would be populated from data fetched by ID
    const [gradeName, setGradeName] = useState("일반회원");
    const [displayType, setDisplayType] = useState("icon");
    const [imageType, setImageType] = useState("use");
    const [evalException, setEvalException] = useState("use");
    const [applyBasis, setApplyBasis] = useState("sales");

    // File refs for direct registration
    // const directIconInputRef = useRef<HTMLInputElement>(null);
    // const directImageInputRef = useRef<HTMLInputElement>(null);
    // const [iconFileName, setIconFileName] = useState("");
    // const [imageFileName, setImageFileName] = useState("");

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFileName: (name: string) => void) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setFileName(e.target.files[0].name);
    //     }
    // };

    return (
        <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
             {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-gray-500">회원 &gt; 회원 관리 &gt; 회원 등급 수정</span>
                </div>
            </div>
            <div className="flex items-center justify-between mb-6">
                 <h1 className="text-2xl font-bold text-gray-900">회원 등급 수정</h1>
                 <div className="flex gap-2">
                    <Link href="/admin/users/grade">
                        <Button variant="outline" className="h-9 px-4 text-xs bg-white text-gray-600 border-gray-300 hover:bg-gray-50 rounded-[2px] font-bold">
                            <span className="mr-1">≡</span> 목록
                        </Button>
                    </Link>
                    <Button className="h-9 px-4 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
                        저장
                    </Button>
                 </div>
            </div>

            {/* Basic Settings */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="font-bold text-base text-gray-800">기본설정</h2>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="border-t border-gray-400 border-b border-gray-200">
                    {/* Grade Number */}
                     <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex items-center font-bold text-gray-700 text-xs">
                            회원등급번호
                        </div>
                        <div className="flex-1 p-4 bg-white flex items-center text-gray-600 text-xs">
                           1
                        </div>
                    </div>

                    {/* Grade Name */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex items-center font-bold text-gray-700 text-xs">
                            <span className="text-[#FF424D] mr-1">*</span> 회원등급이름
                        </div>
                        <div className="flex-1 p-4 bg-white flex items-center gap-2">
                            <Input 
                                value={gradeName}
                                onChange={(e) => setGradeName(e.target.value)}
                                className="w-64 h-8 text-xs border-gray-300 rounded-[2px]"
                            />
                            <span className="text-gray-400 text-xs">4 / 25</span>
                            <Button className="h-8 px-3 text-[11px] bg-[#333333] text-white rounded-[2px] hover:bg-[#222222]">등급이름 중복확인</Button>
                        </div>
                    </div>

                    {/* Grade Display */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex items-center font-bold text-gray-700 text-xs">
                            등급표시
                        </div>
                        <div className="flex-1 p-4 bg-white space-y-3">
                             <RadioGroup value={displayType} onValueChange={setDisplayType} className="flex flex-col space-y-3">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="text" id="disp-text" className="border-gray-300 text-[#FF424D]" />
                                    <Label htmlFor="disp-text" className="font-normal text-xs cursor-pointer">텍스트 : (회원등급이름에 등록된 텍스트 노출)</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                     <RadioGroupItem value="icon" id="disp-icon" className="border-gray-300 text-[#FF424D] mt-0.5" />
                                     <div className="flex flex-col gap-2">
                                         <Label htmlFor="disp-icon" className="font-normal text-xs cursor-pointer">기본 등급표시 아이콘</Label>
                                         <div className="flex gap-2 items-center">
                                             <div className="w-9 h-9 border border-gray-300 rounded-[2px] flex items-center justify-center bg-gray-50 text-gray-300">
                                                 <Camera size={16} />
                                             </div>
                                             <Button className="h-6 px-2 text-[11px] bg-[#333333] text-white rounded-[2px] hover:bg-[#222222]">삭제</Button>
                                             {/* Mock icons - first one selected-ish */}
                                             {[1, 2, 3, 4, 5].map(i => (
                                                 <div key={i} className={`w-6 h-6 border rounded-sm flex items-center justify-center ${i===1 ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-green-100'}`}>
                                                     {i===1 && <div className="w-3 h-3 bg-orange-800 rounded-full"></div>}
                                                 </div> 
                                             ))}
                                         </div>
                                     </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <RadioGroupItem value="direct" id="disp-direct" className="border-gray-300 text-[#FF424D] mt-0.5" />
                                    <div className="flex flex-col gap-1">
                                         <Label htmlFor="disp-direct" className="font-normal text-xs cursor-pointer">직접등록</Label>
                                         <div className="flex gap-1">
                                             <Button className="h-6 px-2 text-[11px] bg-[#333333] text-white rounded-[2px] hover:bg-[#222222]">찾아보기</Button>
                                             <Input disabled className="w-40 h-6 bg-gray-100 border-gray-300 rounded-[2px]" />
                                         </div>
                                         <p className="text-[11px] text-[#888888] flex items-center gap-1">
                                             <span className="bg-[#555] text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px]">!</span>
                                             jpg, jpeg, png, gif만 등록 가능하며, 기본 등급표시 아이콘은 16x16 pixel 입니다.
                                         </p>
                                    </div>
                                </div>
                             </RadioGroup>
                        </div>
                    </div>

                    {/* Grade Image */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex items-center font-bold text-gray-700 text-xs">
                            등급이미지
                        </div>
                        <div className="flex-1 p-4 bg-white space-y-3">
                            <RadioGroup value={imageType} onValueChange={setImageType} className="flex flex-col space-y-3">
                                 <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="none" id="img-none" className="border-gray-300 text-[#FF424D]" />
                                    <Label htmlFor="img-none" className="font-normal text-xs cursor-pointer">사용안함</Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                     <RadioGroupItem value="use" id="img-use" className="border-gray-300 text-[#FF424D] mt-0.5" />
                                     <div className="flex flex-col gap-2">
                                         <Label htmlFor="img-use" className="font-normal text-xs cursor-pointer">기본 등급 이미지</Label>
                                          <div className="flex gap-2 items-center">
                                             <div className="w-16 h-16 border border-gray-300 rounded-[2px] flex items-center justify-center bg-[#D4B886] text-white">
                                                {/* Selected Image Placeholder */}
                                                <div className="w-10 h-6 border-white rounded-full border-2"></div>
                                             </div>
                                             <Button className="h-6 px-2 text-[11px] bg-[#333333] text-white rounded-[2px] hover:bg-[#222222]">삭제</Button>
                                              {[1, 2, 3, 4, 5].map(i => (
                                                 <div key={i} className={`w-12 h-12 border rounded-full flex items-center justify-center text-white ${i===1 ? 'border-orange-400 bg-[#D4B886]' : 'border-gray-200 bg-[#8BC34A]'}`}>
                                                     <div className="w-6 h-4 border-white rounded-full border-2"></div>
                                                 </div> 
                                             ))}
                                          </div>
                                     </div>
                                </div>
                                 <div className="flex items-start space-x-2">
                                    <RadioGroupItem value="direct" id="img-direct" className="border-gray-300 text-[#FF424D] mt-0.5" />
                                    <div className="flex flex-col gap-1">
                                         <Label htmlFor="img-direct" className="font-normal text-xs cursor-pointer">직접등록</Label>
                                         <div className="flex gap-1">
                                             <Button className="h-6 px-2 text-[11px] bg-[#333333] text-white rounded-[2px] hover:bg-[#222222]">찾아보기</Button>
                                             <Input disabled className="w-40 h-6 bg-gray-100 border-gray-300 rounded-[2px]" />
                                         </div>
                                         <p className="text-[11px] text-[#888888] flex items-center gap-1">
                                             <span className="bg-[#555] text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px]">!</span>
                                             jpg, jpeg, png, gif만 등록 가능하며, 기본 등급이미지는 70x70 pixel 입니다.
                                         </p>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Grade Eval Criteria - Missing in edit screenshot but usually present, kept for consistency or can match register page structure but hide content? Screenshot doesn't show it but it's in register page... 
                        Wait, in the screenshot I see "등급평가 제외 설정" right after "등급이미지". 
                        The "등급평가기준치" row from Register page is NOT in the Edit page screenshot provided. 
                        I will REMOVE "등급평가기준치" to match the Edit page screenshot.
                    */}

                     {/* Grade Eval Exception */}
                     <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex items-center font-bold text-gray-700 text-xs">
                            등급평가 제외 설정
                        </div>
                        <div className="flex-1 p-4 bg-white">
                             <RadioGroup value={evalException} onValueChange={setEvalException} className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="unused" id="eval-unused" className="border-gray-300 text-[#FF424D]" />
                                    <Label htmlFor="eval-unused" className="font-normal text-xs cursor-pointer">사용안함</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="use" id="eval-use" className="border-gray-300 text-[#FF424D]" />
                                    <Label htmlFor="eval-use" className="font-normal text-xs cursor-pointer">회원등급 평가 시 제외</Label>
                                </div>
                             </RadioGroup>
                        </div>
                    </div>

                    {/* Payment Types */}
                     <div className="flex">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex items-center font-bold text-gray-700 text-xs">
                            사용가능한 결제수단
                            <HelpCircle className="w-3 h-3 ml-1 text-gray-400" />
                        </div>
                        <div className="flex-1 p-4 bg-white flex flex-col gap-2">
                             <div className="flex gap-4">
                                 <div className="flex items-center gap-1">
                                     <Checkbox id="pay-bank" defaultChecked className="border-gray-300 rounded-[2px] text-[#FF424D]" />
                                     <Label htmlFor="pay-bank" className="font-normal text-xs cursor-pointer">무통장</Label>
                                 </div>
                                  <div className="flex items-center gap-1">
                                     <Checkbox id="pay-pg" defaultChecked className="border-gray-300 rounded-[2px] text-[#FF424D]" />
                                     <Label htmlFor="pay-pg" className="font-normal text-xs cursor-pointer">PG결제수단</Label>
                                 </div>
                                  <div className="flex items-center gap-1">
                                     <Checkbox id="pay-mileage" defaultChecked className="border-gray-300 rounded-[2px] text-[#FF424D]" />
                                     <Label htmlFor="pay-mileage" className="font-normal text-xs cursor-pointer">마일리지 사용</Label>
                                 </div>
                                  <div className="flex items-center gap-1">
                                     <Checkbox id="pay-deposit" defaultChecked className="border-gray-300 rounded-[2px] text-[#FF424D]" />
                                     <Label htmlFor="pay-deposit" className="font-normal text-xs cursor-pointer">예치금 사용</Label>
                                 </div>
                             </div>
                             <div className="text-[11px] text-gray-500 space-y-1 mt-1">
                                  <p className="text-[#FF424D] flex items-center gap-1">
                                      <span className="bg-[#FF424D] text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px]">!</span>
                                      무통장 사용시에만 혜택을 제공하는 것은 여신전문금융업법에 저촉될 수 있습니다. <Link href="#" className="underline text-blue-500">[자세히보기]</Link>
                                  </p>
                                  <p className="flex items-start gap-1">
                                      <span className="bg-[#555] text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] flex-shrink-0 mt-0.5">!</span>
                                      회원등급별 사용가능한 결제수단과 상품&gt;상품관리&gt;상품등록 화면에서 상품별로 개별설정된 결제수단이 일치하지 않는 경우 해당 상품은 구매할 수 없으므로 설정 시 유의 바랍니다.
                                  </p>
                                   <p className="flex items-start gap-1">
                                      <span className="bg-[#555] text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] flex-shrink-0 mt-0.5">!</span>
                                      해외몰에서는 회원등급별 사용가능한 수단 설정과 상관없이 해외PG로만 결제가 가능합니다.
                                  </p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefit Settings */}
            <div className="mb-20">
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="font-bold text-base text-gray-800">혜택설정</h2>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                
                 <div className="border-t border-gray-400 border-b border-gray-200">
                     {/* Discount/Accumulation Basis */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex flex-col justify-center font-bold text-gray-700 text-xs">
                             <p>정률(%) 할인/적립 시</p>
                             <p>구매금액 기준</p>
                        </div>
                        <div className="flex-1 p-4 bg-white flex items-center gap-4 text-xs">
                            <span>판매가 + (</span>
                            <div className="flex items-center gap-1">
                                <Checkbox id="opt-price" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="opt-price" className="font-normal cursor-pointer">옵션가</Label>
                            </div>
                            <div className="flex items-center gap-1">
                                <Checkbox id="add-prod" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="add-prod" className="font-normal cursor-pointer">추가상품가</Label>
                            </div>
                             <div className="flex items-center gap-1">
                                <Checkbox id="text-opt" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="text-opt" className="font-normal cursor-pointer">텍스트옵션가</Label>
                            </div>
                            <span>)</span>
                        </div>
                    </div>

                     {/* Rounding standard */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex items-center font-bold text-gray-700 text-xs">
                            할인시 절사기준
                        </div>
                        <div className="flex-1 p-4 bg-white flex flex-col gap-1 text-xs">
                            <span className="font-bold">0.1원 단위로 버림</span>
                             <p className="text-[11px] text-[#888888] flex items-center gap-1">
                                 <span className="bg-[#555] text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px]">!</span>
                                 ※ [기본설정&gt;기본정책&gt;금액/단위 기준설정]에서 설정한 기준에 따름
                             </p>
                        </div>
                    </div>

                    {/* Apply Basis */}
                     <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex flex-col justify-center font-bold text-gray-700 text-xs">
                             <p>할인/적립 시 적용</p>
                             <p>금액 기준</p>
                        </div>
                         <div className="flex-1 p-4 bg-white space-y-2">
                             <RadioGroup value={applyBasis} onValueChange={setApplyBasis} className="flex items-center gap-6">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sales" id="apply-sales" className="border-gray-300 text-[#FF424D]" />
                                    <Label htmlFor="apply-sales" className="font-normal text-xs cursor-pointer">판매금액</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="payment" id="apply-payment" className="border-gray-300 text-[#FF424D]" />
                                    <Label htmlFor="apply-payment" className="font-normal text-xs cursor-pointer">결제금액</Label>
                                </div>
                             </RadioGroup>
                              <p className="text-[11px] text-[#888888] flex items-center gap-1">
                                 <span className="bg-[#555] text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] flex-shrink-0">!</span>
                                 결제금액 = 판매금액 - (상품 할인금액 + 쿠폰 할인금액)
                             </p>
                        </div>
                    </div>

                    {/* Additional Discount */}
                     <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex items-center font-bold text-gray-700 text-xs">
                            추가 할인
                        </div>
                        <div className="flex-1 p-4 bg-white flex items-center gap-2 text-xs">
                             <Select defaultValue="option">
                                 <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white"><SelectValue /></SelectTrigger>
                                 <SelectContent>
                                     <SelectItem value="option">옵션별</SelectItem>
                                     <SelectItem value="product">상품별</SelectItem>
                                     <SelectItem value="order">주문별</SelectItem>
                                     <SelectItem value="brand">브랜드별</SelectItem>
                                 </SelectContent>
                             </Select>
                             <span>구매금액이</span>
                             <Input className="w-24 h-7 text-xs border-gray-300 rounded-[2px]" defaultValue="0" />
                             <span>원 이상인 경우 해당상품</span>
                              <Input className="w-24 h-7 text-xs border-gray-300 rounded-[2px]" defaultValue="0.0" />
                             <span>% 추가 할인</span>
                        </div>
                    </div>
                     <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex flex-col justify-center font-bold text-gray-700 text-xs">
                             <p>추가 할인</p>
                             <p>적용제외</p>
                        </div>
                        <div className="flex-1 p-4 bg-white flex items-center gap-4 text-xs">
                             <div className="flex items-center gap-1">
                                <Checkbox id="ex-supplier" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="ex-supplier" className="font-normal cursor-pointer">특정 공급사</Label>
                            </div>
                             <div className="flex items-center gap-1">
                                <Checkbox id="ex-category" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="ex-category" className="font-normal cursor-pointer">특정 카테고리</Label>
                            </div>
                             <div className="flex items-center gap-1">
                                <Checkbox id="ex-brand" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="ex-brand" className="font-normal cursor-pointer">특정 브랜드</Label>
                            </div>
                             <div className="flex items-center gap-1">
                                <Checkbox id="ex-product" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="ex-product" className="font-normal cursor-pointer">특정 상품</Label>
                            </div>
                        </div>
                    </div>

                     {/* Duplicate Discount */}
                     <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex items-center font-bold text-gray-700 text-xs">
                            중복 할인
                        </div>
                        <div className="flex-1 p-4 bg-white flex items-center gap-2 text-xs">
                             <Select defaultValue="option">
                                 <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white"><SelectValue /></SelectTrigger>
                                 <SelectContent>
                                     <SelectItem value="option">옵션별</SelectItem>
                                     <SelectItem value="product">상품별</SelectItem>
                                     <SelectItem value="order">주문별</SelectItem>
                                 </SelectContent>
                             </Select>
                             <span>구매금액이</span>
                             <Input className="w-24 h-7 text-xs border-gray-300 rounded-[2px]" defaultValue="0" />
                             <span>원 이상인 경우 해당상품</span>
                              <Input className="w-24 h-7 text-xs border-gray-300 rounded-[2px]" defaultValue="0.0" />
                             <span>% 중복 할인</span>
                        </div>
                    </div>
                     <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex flex-col justify-center font-bold text-gray-700 text-xs">
                             <p>중복 할인 적용</p>
                        </div>
                        <div className="flex-1 p-4 bg-white flex items-center gap-4 text-xs">
                             <div className="flex items-center gap-1">
                                <Checkbox id="dup-supplier" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="dup-supplier" className="font-normal cursor-pointer">특정 공급사</Label>
                            </div>
                             <div className="flex items-center gap-1">
                                <Checkbox id="dup-category" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="dup-category" className="font-normal cursor-pointer">특정 카테고리</Label>
                            </div>
                             <div className="flex items-center gap-1">
                                <Checkbox id="dup-brand" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="dup-brand" className="font-normal cursor-pointer">특정 브랜드</Label>
                            </div>
                             <div className="flex items-center gap-1">
                                <Checkbox id="dup-product" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="dup-product" className="font-normal cursor-pointer">특정 상품</Label>
                            </div>
                        </div>
                    </div>

                     {/* Mileage Accumulation */}
                     <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex flex-col justify-center font-bold text-gray-700 text-xs">
                            <p>추가 마일리지 적립</p>
                        </div>
                         <div className="flex-1 p-4 bg-white flex items-center gap-2 text-xs">
                             <Select defaultValue="option">
                                 <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white"><SelectValue /></SelectTrigger>
                                 <SelectContent>
                                     <SelectItem value="option">옵션별</SelectItem>
                                    <SelectItem value="product">상품별</SelectItem>
                                    <SelectItem value="order">주문별</SelectItem>
                                 </SelectContent>
                             </Select>
                             <span>구매금액이</span>
                             <Input className="w-24 h-7 text-xs border-gray-300 rounded-[2px]" defaultValue="0" />
                             <span>원 이상인 경우</span>
                              <Input className="w-16 h-7 text-xs border-gray-300 rounded-[2px]" defaultValue="0.0" />
                             <span>% 추가적립</span>
                        </div>
                    </div>
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex items-center font-bold text-gray-700 text-xs">
                            추가 적립시 절사기준
                        </div>
                        <div className="flex-1 p-4 bg-white flex flex-col gap-1 text-xs">
                            <span className="font-bold">0.1원 단위로 버림</span>
                             <p className="text-[11px] text-[#888888] flex items-center gap-1">
                                 <span className="bg-[#555] text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px]">!</span>
                                 ※ [기본설정&gt;기본정책&gt;금액/단위 기준설정]에서 설정한 기준에 따름
                             </p>
                        </div>
                    </div>

                    {/* Shipping */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex items-center font-bold text-gray-700 text-xs">
                            배송비 혜택
                        </div>
                         <div className="flex-1 p-4 bg-white flex items-center gap-2 text-xs">
                             <Checkbox id="ship-free" className="border-gray-300 rounded-[2px]" />
                             <Label htmlFor="ship-free" className="font-normal cursor-pointer">배송비 무료</Label>
                        </div>
                    </div>

                    {/* Coupon */}
                     <div className="flex">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex items-center font-bold text-gray-700 text-xs">
                            쿠폰 혜택
                        </div>
                         <div className="flex-1 p-4 bg-white space-y-2">
                             <div className="flex gap-1">
                                 <Button className="h-6 px-2 text-[11px] bg-[#333333] text-white rounded-[2px] hover:bg-[#222222]">쿠폰선택</Button>
                                 <Button variant="outline" className="h-6 px-2 text-[11px] bg-white border-gray-300 text-gray-600 rounded-[2px] hover:bg-gray-50">신규쿠폰 등록</Button>
                             </div>
                             <div className="text-[11px] text-[#888888] space-y-1">
                                 <p className="flex items-center gap-1">
                                     <span className="bg-[#555] text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px]">!</span>
                                     사용기간은 '발급일로부터'로 중복사용 가능 여부는 '중복사용 가능'으로 설정된 쿠폰 사용을 권장드립니다.
                                 </p>
                                 <p className="flex items-center gap-1">
                                     <span className="bg-[#555] text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px]">!</span>
                                     설정쿠폰이 발급된 회원이 있을 경우 쿠폰혜택은 수정하실 수 없습니다.
                                 </p>
                                 <p className="flex items-center gap-1">
                                     <span className="bg-[#555] text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px]">!</span>
                                     쿠폰발급 시점 설정은 <span className="font-bold">회원등급관리</span> 페이지에서 설정하실 수 있습니다.
                                 </p>
                             </div>
                        </div>
                    </div>
                 </div>
            </div>
             <div className="h-12 bg-[#FBFBFB] border-b border-gray-200 mt-0 flex items-center justify-center gap-2">
                 <Button variant="outline" size="icon" className="h-7 w-7 rounded-[2px] border-gray-300 bg-white text-gray-400">
                     <ChevronUp className="w-3 h-3 rotate-90" />
                 </Button>
                  <Button variant="outline" size="icon" className="h-7 w-7 rounded-[2px] border-gray-300 bg-white text-gray-400">
                     <ChevronUp className="w-3 h-3 rotate-[270deg]" />
                 </Button>
                 <Button variant="outline" size="icon" className="h-7 w-7 rounded-[2px] border-gray-300 bg-white text-gray-400">
                     <ChevronUp className="w-3 h-3" />
                 </Button>
                  <Button variant="outline" size="icon" className="h-7 w-7 rounded-[2px] border-gray-300 bg-white text-gray-400">
                     <ChevronUp className="w-3 h-3 rotate-180" />
                 </Button>
             </div>
        </div>
    );
}
