"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  HelpCircle,
  Youtube,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import AddressBookPopup from "@/components/admin/AddressBookPopup";
import MemberSearchPopup from "@/components/admin/MemberSearchPopup";
import PostalCodeSearchPopup from "@/components/admin/PostalCodeSearchPopup";
import MemberCartPopup from "@/components/admin/MemberCartPopup";

export default function ManualOrderRegistrationPage() {
  const router = useRouter();
  const [isAddressPopupOpen, setIsAddressPopupOpen] = React.useState(false);
  const [isMemberSearchOpen, setIsMemberSearchOpen] = React.useState(false);
  const [isCartPopupOpen, setIsCartPopupOpen] = React.useState(false);
  const [isPostalPopupOpen, setIsPostalPopupOpen] = React.useState(false);
  // Track which address field triggered the popup (orderer or recipient)
  const [memberType, setMemberType] = React.useState("non-member");
  const [mileageUsed, setMileageUsed] = React.useState("0");
  const [depositUsed, setDepositUsed] = React.useState("0");

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">수기주문 등록</h1>
        <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 px-6 rounded-sm text-xs">
            저장
        </Button>
      </div>

      {/* Order Products */}
      <div className="mb-10">
          <div className="flex items-center gap-1 mb-2">
            <h3 className="text-sm font-bold text-gray-800">주문상품</h3>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="border border-gray-300 mb-2">
            <table className="w-full text-xs text-center border-collapse">
                 <colgroup>
                    <col className="w-10" />
                    <col className="w-32" />
                    <col className="" />
                    <col className="w-24" />
                    <col className="w-24" />
                    <col className="w-24" />
                    <col className="w-24" />
                    <col className="w-24" />
                </colgroup>
                <thead className="bg-[#BDBDBD] text-white font-normal">
                    <tr className="h-8">
                        <th className="border-r border-[#CDCDCD]">
                             <Checkbox className="bg-white border-gray-300 rounded-[2px]"/>
                        </th>
                        <th className="border-r border-[#CDCDCD] font-normal">공급사</th>
                        <th className="border-r border-[#CDCDCD] font-normal">주문상품</th>
                        <th className="border-r border-[#CDCDCD] font-normal">수량</th>
                        <th className="border-r border-[#CDCDCD] font-normal">판매가</th>
                        <th className="border-r border-[#CDCDCD] font-normal">할인/적립</th>
                        <th className="border-r border-[#CDCDCD] font-normal">합계금액</th>
                        <th className="font-normal">배송비</th>
                    </tr>
                </thead>
                 <tbody className="bg-white">
                    <tr>
                        <td colSpan={8} className="py-2 text-center text-gray-400">
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-between p-3">
              <Button variant="outline" size="sm" className="h-8 text-xs bg-white border-gray-300 text-gray-600 rounded-sm hover:bg-gray-50">
                  선택삭제
              </Button>

               <div>
                {memberType === 'member' && (
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-xs bg-white border-gray-300 text-gray-600 rounded-sm hover:bg-gray-50 mr-1"
                        onClick={() => setIsCartPopupOpen(true)}
                    >
                        회원 장바구니 상품추가
                    </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => router.push('/admin/products/main-display/product-selection')} className="h-8 text-xs bg-white border-gray-300 text-gray-600 rounded-sm hover:bg-gray-50">
                    상품추가
                </Button>
               </div>
          </div>
          </div>
      </div>

     <div className="grid grid-cols-2 gap-8 mb-10">
         {/* Orderer Info */}
         <div>
            <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-2">
                <h3 className="text-sm font-bold text-gray-800">주문자 정보</h3>
                <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
            
            <table className="w-full text-xs border-collapse">
                <tbody>
                    <tr className="border-b border-gray-200">
                        <th className="w-32 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">
                            <span className="text-red-500 mr-1">*</span>회원구분 <HelpCircle className="w-3.5 h-3.5 text-gray-400 inline-block align-middle ml-1" />
                        </th>

                        <td className="pl-4 py-2">
                            <RadioGroup value={memberType} onValueChange={setMemberType} className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="non-member" id="type-non-member" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="type-non-member" className="text-gray-700 font-normal cursor-pointer">비회원</Label>
                                </div>
                                <Button size="sm" className="h-6 px-2 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm" onClick={() => setIsAddressPopupOpen(true)}>
                                    자주쓰는 주소
                                </Button>
                                 <div className="flex items-center gap-1.5 ml-2">
                                    <RadioGroupItem value="member" id="type-member" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="type-member" className="text-gray-700 font-normal cursor-pointer">회원</Label>
                                </div>
                                <Button size="sm" className="h-6 px-2 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm" onClick={() => setIsMemberSearchOpen(true)}>
                                    회원 선택
                                </Button>
                            </RadioGroup>
                        </td>
                    </tr>
                    {memberType === 'member' && (
                        <tr className="border-b border-gray-200">
                            <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">
                                <span className="text-red-500 mr-1">*</span>회원ID
                            </th>
                            <td className="pl-4 py-2">
                                <Input className="w-full h-7 text-xs border-gray-300 rounded-sm bg-gray-100" readOnly />
                            </td>
                        </tr>
                    )}
                    <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">
                            <span className="text-red-500 mr-1">*</span>주문자명
                        </th>
                        <td className="pl-4 py-2">
                             <Input className="w-64 h-7 text-xs border-gray-300 rounded-sm" />
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">
                            전화번호
                        </th>
                         <td className="pl-4 py-2">
                             <Input className="w-64 h-7 text-xs border-gray-300 rounded-sm" />
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">
                             <span className="text-red-500 mr-1">*</span>휴대폰번호
                        </th>
                         <td className="pl-4 py-2">
                             <Input className="w-64 h-7 text-xs border-gray-300 rounded-sm" />
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">
                             <span className="text-red-500 mr-1">*</span>이메일
                        </th>
                         <td className="pl-4 py-2 flex items-center gap-1">
                             <Input className="w-64 h-7 text-xs border-gray-300 rounded-sm" />
                              <Select defaultValue="direct">
                                <SelectTrigger className="w-48 h-7 text-[11px] border-gray-300 rounded-sm">
                                    <SelectValue placeholder="직접입력" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="direct">직접입력</SelectItem>
                                    <SelectItem value="hanmail.net">hanmail.net</SelectItem>
                                    <SelectItem value="daum.net">daum.net</SelectItem>
                                    <SelectItem value="nate.com">nate.com</SelectItem>
                                    <SelectItem value="hotmail.com">hotmail.com</SelectItem>
                                    <SelectItem value="gmail.com">gmail.com</SelectItem>
                                    <SelectItem value="icloud.com">icloud.com</SelectItem>
                                </SelectContent>
                            </Select>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 align-top pt-4">
                             <span className="text-red-500 mr-1">*</span>주소
                        </th>
                         <td className="pl-4 py-3 space-y-1">
                             <div className="flex gap-1">
                                 <Input className="w-24 h-7 text-xs border-gray-300 rounded-sm bg-gray-100" readOnly />
                                 <Button 
                                    size="sm" 
                                    className="h-7 px-3 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm"
                                    onClick={() => {
                                        setIsPostalPopupOpen(true);
                                    }}
                                 >우편번호찾기</Button>
                             </div>
                             <Input className="w-full h-7 text-xs border-gray-300 rounded-sm bg-gray-100" readOnly />
                             <Input className="w-full h-7 text-xs border-gray-300 rounded-sm" />
                        </td>
                    </tr>
                </tbody>
            </table>
         </div>

         {/* Recipient Info */}
         <div>
            <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-2">
                <h3 className="text-sm font-bold text-gray-800">수령자 정보</h3>
                <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
            
             <table className="w-full text-xs border-collapse">
                <tbody>
                    <tr className="border-b border-gray-200">
                        <th className="w-32 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 h-[49px]">
                            배송지확인
                        </th>
                        <td className="pl-4 py-2">
                            <div className="flex items-center gap-1.5">
                                <Checkbox id="same-info" className="rounded-[2px] border-gray-300" />
                                <Label htmlFor="same-info" className="text-gray-700 font-normal cursor-pointer">주문자 정보와 동일</Label>
                                {memberType === 'member' && (
                                    <Button size="sm" className="h-6 px-2 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm ml-2">
                                        배송지 목록
                                    </Button>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 h-[45px]">
                            <span className="text-red-500 mr-1">*</span>수령자명
                        </th>
                        <td className="pl-4 py-2">
                             <Input className="w-64 h-7 text-xs border-gray-300 rounded-sm" />
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 h-[45px]">
                            전화번호
                        </th>
                         <td className="pl-4 py-2">
                             <Input className="w-64 h-7 text-xs border-gray-300 rounded-sm" />
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 h-[45px]">
                             <span className="text-red-500 mr-1">*</span>휴대폰번호
                        </th>
                         <td className="pl-4 py-2">
                             <Input className="w-64 h-7 text-xs border-gray-300 rounded-sm" />
                        </td>
                    </tr>
                     <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 align-top pt-4 h-[129px]">
                             <span className="text-red-500 mr-1">*</span>주소
                        </th>
                         <td className="pl-4 py-3 space-y-1">
                             <div className="flex gap-1">
                                 <Input className="w-24 h-7 text-xs border-gray-300 rounded-sm bg-gray-100" readOnly />
                                 <Button 
                                    size="sm" 
                                    className="h-7 px-3 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm"
                                    onClick={() => {
                                        setIsPostalPopupOpen(true);
                                    }}
                                 >우편번호찾기</Button>
                             </div>
                             <Input className="w-full h-7 text-xs border-gray-300 rounded-sm bg-gray-100" readOnly />
                             <Input className="w-full h-7 text-xs border-gray-300 rounded-sm" />
                        </td>
                    </tr>
                     <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 align-top pt-3 h-[45px]">
                             배송 메세지
                        </th>
                         <td className="pl-4 py-2">
                             <Textarea className="w-full h-20 text-xs border-gray-300 rounded-sm resize-none" />
                        </td>
                    </tr>
                </tbody>
            </table>
         </div>
     </div>

     {/* Payment Info Section - Split Layout */}
     <div className="grid grid-cols-1 gap-10 mb-10">
        <div>
             <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-2">
                <h3 className="text-sm font-bold text-gray-800">결제정보</h3>
                 <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
             <table className="w-full text-xs border-collapse">
                 <tbody>
                     <tr className="border-b border-gray-200">
                         <th className="w-48 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">상품 합계 금액</th>
                         <td className="pl-4 py-3">0원</td>
                     </tr>
                      <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">배송비</th>
                         <td className="pl-4 py-3">0원</td>
                     </tr>
                      <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">할인 및 적립 <HelpCircle className="w-3.5 h-3.5 text-gray-400 inline-block align-middle ml-1" /></th>
                         <td className="pl-4 py-3 flex items-center">
                            {memberType === 'member' && (
                                <Button size="sm" className="h-4 w-4 p-0 mr-2 bg-blue-500 hover:bg-blue-600 rounded-[2px] text-white flex items-center justify-center text-[10px]">-</Button>
                            )}
                             할인 : (-)0원 ( 상품 0원, 회원 0원, 쿠폰 0원 )
                         </td>
                     </tr>
                     {memberType === 'member' && (
                         <>
                            <tr className="border-b border-gray-200">
                                <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 align-top pt-4">쿠폰 사용</th>
                                <td className="pl-4 py-3">
                                    <div className="flex items-center gap-2 mb-1">
                                         <Button variant="outline" size="sm" className="h-7 px-3 text-[11px] bg-white border-gray-300 text-gray-600 rounded-sm hover:bg-gray-50">
                                            쿠폰 조회 및 적용
                                        </Button>
                                        <div className="text-gray-500 text-[11px] flex items-center">
                                            <span className="bg-gray-500 text-white w-3 h-3 flex items-center justify-center text-[10px] rounded-[2px] mr-1">!</span>
                                            쿠폰 수동발급은 <span className="text-blue-500 underline cursor-pointer ml-1">프로모션{'>'}쿠폰 관리{'>'}쿠폰 리스트</span>에서 가능합니다.
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">마일리지 사용</th>
                                <td className="pl-4 py-3 flex items-center gap-2">
                                    <Input 
                                        className="w-32 h-7 text-xs border-gray-300 rounded-sm text-right px-2" 
                                        value={mileageUsed}
                                        onChange={(e) => setMileageUsed(e.target.value)}
                                    />
                                    <span className="text-gray-600">원</span>
                                    <div className="flex items-center gap-1 ml-2">
                                        <Checkbox id="use-all-mileage" className="rounded-[2px] border-gray-300" />
                                        <Label htmlFor="use-all-mileage" className="text-gray-600 font-normal">전액 사용하기</Label>
                                        <span className="text-blue-500 ml-1">(보유 마일리지 : 0원)</span>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">예치금 사용</th>
                                <td className="pl-4 py-3 flex items-center gap-2">
                                    <Input 
                                        className="w-32 h-7 text-xs border-gray-300 rounded-sm text-right px-2" 
                                        value={depositUsed}
                                        onChange={(e) => setDepositUsed(e.target.value)}
                                    />
                                    <span className="text-gray-600">원</span>
                                     <div className="flex items-center gap-1 ml-2">
                                        <Checkbox id="use-all-deposit" className="rounded-[2px] border-gray-300" />
                                        <Label htmlFor="use-all-deposit" className="text-gray-600 font-normal">전액 사용하기</Label>
                                        <span className="text-blue-500 ml-1">(보유 예치금 : 0원)</span>
                                    </div>
                                </td>
                            </tr>
                         </>
                     )}
                      <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">최종 결제 금액</th>
                         <td className="pl-4 py-3">0원</td>
                     </tr>
                 </tbody>
             </table>
        </div>
     </div>

     <div className="grid grid-cols-2 gap-8 mb-10">
         {/* Payment Method */}
         <div>
            <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-2">
                <h3 className="text-sm font-bold text-gray-800">결제수단</h3>
                 <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
             <table className="w-full text-xs border-collapse">
                <tbody>
                    <tr className="border-b border-gray-200">
                        <th className="w-32 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">
                            입금자명
                        </th>
                        <td className="pl-4 py-2">
                             <Input className="w-64 h-7 text-xs border-gray-300 rounded-sm" />
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 align-top pt-3">
                            입금계좌
                        </th>
                        <td className="pl-4 py-3">
                            <p className="text-red-500 mb-2 font-bold"><span className="bg-red-500 text-white text-[10px] w-3 h-3 inline-flex items-center justify-center rounded-[2px] mr-1">!</span>기본설정 {'>'} 결제 정책 {'>'} 무통장 입금 은행 관리등록을 해주세요.</p>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-7 px-3 text-[11px] bg-white border-gray-300 text-gray-600 rounded-sm hover:bg-gray-50"
                                onClick={() => router.push('/admin/settings/bank-accounts')}
                            >
                                무통장 입금 은행 관리 등록하기
                            </Button>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">
                            영수증 신청
                        </th>
                        <td className="pl-4 py-2">
                             <RadioGroup defaultValue="none" className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="none" id="receipt-none" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="receipt-none" className="text-gray-700 font-normal cursor-pointer">신청안함</Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="cash" id="receipt-cash" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="receipt-cash" className="text-gray-700 font-normal cursor-pointer">현금영수증</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="tax" id="receipt-tax" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="receipt-tax" className="text-gray-700 font-normal cursor-pointer">세금계산서</Label>
                                </div>
                            </RadioGroup>
                        </td>
                    </tr>
                </tbody>
             </table>
         </div>

         {/* Admin Memo */}
         <div>
             <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-2">
                <h3 className="text-sm font-bold text-gray-800">관리자 메모</h3>
                 <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
             <table className="w-full text-xs border-collapse">
                <tbody>
                    <tr className="border-b border-gray-200">
                        <th className="w-32 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700">
                            메모 구분
                        </th>
                        <td className="pl-4 py-2">
                             <Select>
                                <SelectTrigger className="w-40 h-7 text-[11px] border-gray-300 rounded-sm">
                                    <SelectValue placeholder="=메모 구분=" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">=메모 구분=</SelectItem>
                                    <SelectItem value="receipt">접수</SelectItem>
                                    <SelectItem value="complete">완료</SelectItem>
                                    <SelectItem value="deposit">입금</SelectItem>
                                    <SelectItem value="shipping">배송</SelectItem>
                                    <SelectItem value="out_of_stock">품절</SelectItem>
                                    <SelectItem value="exchange">교환</SelectItem>
                                    <SelectItem value="return">반품</SelectItem>
                                    <SelectItem value="refund">환불</SelectItem>
                                    <SelectItem value="as">A/S</SelectItem>
                                    <SelectItem value="other">기타</SelectItem>
                                </SelectContent>
                            </Select>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 align-top pt-3 h-[180px]">
                            메모 내용
                        </th>
                        <td className="pl-4 py-3 h-full">
                            <Textarea className="w-full h-40 text-xs border-gray-300 rounded-sm resize-none" />
                        </td>
                    </tr>
                </tbody>
             </table>
         </div>
     </div>

     <div className="border-t border-gray-300 mb-8 mt-10"></div>


      {/* Guide Section */}
       <div className="space-y-6 text-gray-600">
           <div>
              <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs mb-3">
                 <BookOpen className="w-4 h-4" /> 
                 <span>안내</span>
              </div>
              <div className="space-y-4">
                   <div>
                       <h3 className="font-bold text-gray-800 mb-1 text-xs">[수기주문] 수기주문 등록 시 주의사항</h3>
                       <div className="pl-0 text-xs text-gray-500 space-y-2">
                           <p>· 수기주문을 통한 마일리지 혜택 지급 시점 이전에 휴면전환된 회원에게는 주문 마일리지가 지급되지 않습니다.</p>
                           <p>· 휴면예정일이 7일 이내인 회원은 가급적 쇼핑몰을 통해 직접 주문하는 것을 권장합니다.</p>
                           <p>· 마일리지 혜택 지급 시점은 기본설정 {'>'} 주문 정책 {'>'} 주문 상태 설정에서 확인할 수 있습니다.</p>
                       </div>
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
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0 transform rotate-180">
                         <ChevronUp className="w-4 h-4" />
                </Button>
            </div>
            </div>

        <AddressBookPopup 
            isOpen={isAddressPopupOpen} 
            onClose={() => setIsAddressPopupOpen(false)}
            onConfirm={() => setIsAddressPopupOpen(false)}
        />
        <MemberSearchPopup
            isOpen={isMemberSearchOpen}
            onClose={() => setIsMemberSearchOpen(false)}
            onConfirm={(member) => {
                if (member) {
                    // Logic to populate member info would go here
                    // For now, just close the popup and maybe switch to member mode
                    setMemberType("member");
                }
                setIsMemberSearchOpen(false);
            }}
        />
        <PostalCodeSearchPopup
            isOpen={isPostalPopupOpen}
            onClose={() => setIsPostalPopupOpen(false)}
            onComplete={(_addressData) => {
                // Here you would handle the selected address data
                // For now, we just close the popup
                setIsPostalPopupOpen(false);
            }}
        />
        <MemberCartPopup
            isOpen={isCartPopupOpen}
            onClose={() => setIsCartPopupOpen(false)}
        />
    </div>
  );
}
