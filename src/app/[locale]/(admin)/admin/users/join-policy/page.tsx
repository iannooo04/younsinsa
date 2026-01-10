"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  Info
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";

export default function MemberJoinPolicyPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">회원 가입 정책 관리</h1>
        <Button className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm font-bold border-0">
            저장
        </Button>
      </div>

      {/* Join Settings */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">가입 설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Approval Usage */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    가입승인 사용설정 <HelpCircle className="w-3.5 h-3.5 text-gray-400 ml-1" />
                </div>
                <div className="flex-1 p-4 flex flex-col gap-2">
                    <RadioGroup defaultValue="none" className="flex flex-col gap-2">
                         <div className="flex items-center gap-2">
                            <RadioGroupItem value="none" id="approval-none" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="approval-none" className="text-gray-700 font-normal cursor-pointer text-xs">승인 절차 없이 가입</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="all" id="approval-all" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="approval-all" className="text-gray-700 font-normal cursor-pointer text-xs">승인 후 가입</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="business" id="approval-business" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="approval-business" className="text-gray-700 font-normal cursor-pointer text-xs">사업자회원만 승인 후 가입</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

             {/* Age Limit */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    가입연령제한 설정 <HelpCircle className="w-3.5 h-3.5 text-gray-400 ml-1" />
                </div>
                <div className="flex-1 p-4 bg-white">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                             <input type="radio" id="age-limit-none" name="age-limit" className="w-3 h-3 border-gray-300 text-gray-600 focus:ring-0" />
                             <Label htmlFor="age-limit-none" className="text-gray-700 font-normal cursor-pointer text-xs">제한 안함</Label>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-6">
                             <Checkbox id="age-consent" className="border-gray-300 rounded-[2px]" />
                             <Label htmlFor="age-consent" className="text-gray-700 font-normal cursor-pointer text-xs">'만 14세 이상입니다.' 동의 항목 사용</Label>
                             <span className="text-[11px] text-gray-400 ml-1 bg-[#F4F4F4] px-1 rounded-sm border border-gray-200">!</span>
                             <span className="text-[11px] text-gray-400">가입연령제한 설정 ‘제한 안함’사용 시 해당 설정 사용을 권장합니다.</span>
                        </div>

                         <div className="flex items-center gap-2">
                             <div className="flex items-center gap-1">
                                 <span>만</span>
                                 <Select defaultValue="14">
                                    <SelectTrigger className="w-16 h-7 text-[11px] border-gray-300 bg-white">
                                        <SelectValue placeholder="14" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="14">14</SelectItem>
                                        <SelectItem value="15">15</SelectItem>
                                        <SelectItem value="19">19</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span>미만인 경우</span>
                             </div>

                             <RadioGroup defaultValue="approval" className="flex items-center gap-4 ml-4">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="approval" id="underage-approval" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="underage-approval" className="text-gray-700 font-normal cursor-pointer text-xs">운영자 승인 후 가입</Label>
                                </div>
                             </RadioGroup>
                             <Button variant="secondary" className="h-6 px-2 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888]">법정대리인 동의서 샘플 다운로드</Button>
                        </div>
                         <div className="flex items-center gap-2 ml-[165px]">
                             <RadioGroup defaultValue="approval" className="flex items-center">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="ban" id="underage-ban" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="underage-ban" className="text-gray-700 font-normal cursor-pointer text-xs">가입불가</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
         <div className="mt-2 space-y-1">
            <p className="text-[11px] text-red-500 flex items-start gap-1">
                 <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 개인정보 보호법에 따라 만 14세 미만의 아동은 법정대리인의 동의 확인 후 회원가입이 가능합니다. <Link href="#" className="underline">[자세히보기]</Link>
            </p>
             <p className="text-[11px] text-[#888888] flex items-start gap-1">
                 <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 '운영자 승인 후 가입' 및 '가입불가'로 설정 시 본인인증서비스를 사용하거나 회원가입 항목의 '생일'항목을 필수로 설정해야 합니다. 본인인증서비스 또는 생일 필수 설정이 없는 경우, 만 14세 미만 회원을 판단할 수 없으므로 '미승인' 상태로 가입되거나, 가입이 불가하오니 주의해주시기 바랍니다.
            </p>
             <p className="text-[11px] text-[#888888] flex items-start gap-1 ml-4">
                 <span className="inline-block bg-[#888888] text-white w-1 h-3 text-[9px] text-center leading-3 mr-1 mt-0.5">I</span>
                 <span>본인인증서비스: <Link href="#" className="text-blue-500 hover:underline">휴대폰인증 설정&gt;</Link> <Link href="#" className="text-blue-500 hover:underline">아이핀인증 설정&gt;</Link></span>
            </p>
             <p className="text-[11px] text-[#888888] flex items-start gap-1 ml-4">
                 <span className="inline-block bg-[#888888] text-white w-1 h-3 text-[9px] text-center leading-3 mr-1 mt-0.5">I</span>
                 <span>생일 항목 사용 및 필수 설정: <Link href="#" className="text-blue-500 hover:underline">회원 가입 항목 관리&gt;</Link></span>
            </p>
         </div>
      </div>

       {/* Simple Login Settings */}
       <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">간편 로그인 기본설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    본인인증 제외설정
                </div>
                <div className="flex-1 p-4 flex items-center gap-2">
                    <span className="text-gray-600 mr-2">간편 로그인으로 회원가입 시 본인인증 절차</span>
                     <RadioGroup defaultValue="use" className="flex items-center gap-4">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="use" id="simple-auth-use" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="simple-auth-use" className="text-gray-700 font-normal cursor-pointer text-xs">사용함</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="exclude" id="simple-auth-exclude" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="simple-auth-exclude" className="text-gray-700 font-normal cursor-pointer text-xs">제외함</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
         <div className="mt-2 space-y-1">
             <p className="text-[11px] text-[#888888] flex items-start gap-1">
                 <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 '가입연령제한 설정'이 '운영자 승인 후 가입' 및 '가입불가' 이고 가입 항목 중 '생일'이 필수가 아닌 경우, 본인확인인증서비스가 필수이므로 '제외함'설정이 불가합니다.<br/>
                 상단의 가입연령제한 설정 및 "<Link href="#" className="text-blue-500 hover:underline">회원&gt;회원 관리&gt;회원 가입 항목 관리</Link>"의 설정을 확인해주시기 바랍니다.
            </p>
             <p className="text-[11px] text-[#888888] flex items-start gap-1">
                 <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 원더 아이디 로그인의 경우, '사용함'으로 설정하여도 본인인증 서비스가 실행되지 않습니다.
            </p>
            <p className="text-[11px] text-[#888888] flex items-start gap-1">
                 <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 <span>본인확인 인증 서비스(휴대폰인증/아이핀인증)가 적용되어 있어야만 '사용함' 설정 시 본인인증 서비스가 실행됩니다. <Link href="#" className="text-blue-500 hover:underline">휴대폰인증 설정&gt;</Link> <Link href="#" className="text-blue-500 hover:underline">아이핀인증 설정&gt;</Link></span>
            </p>
         </div>
      </div>

       {/* Withdrawal / Re-join Settings */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">탈퇴/재가입 설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    재가입 기간제한
                </div>
                <div className="flex-1 p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                         <input type="radio" id="rejoin-limit" name="rejoin" className="w-3 h-3 border-gray-300 text-gray-600 focus:ring-0" />
                         <Label htmlFor="rejoin-limit" className="text-gray-700 font-normal cursor-pointer text-xs">회원탈퇴/삭제 후</Label>
                         <Input className="w-16 h-7 text-center bg-[#EDEFF2] border-gray-300" defaultValue="0" disabled/>
                         <span className="text-gray-700">일 동안 재가입 불가</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                         <input type="radio" id="rejoin-unused" name="rejoin" className="w-3 h-3 border-red-500 text-red-500 focus:ring-red-500" defaultChecked/>
                         <Label htmlFor="rejoin-unused" className="text-gray-700 font-normal cursor-pointer text-xs">사용안함</Label>
                    </div>
                </div>
            </div>
        </div>
         <div className="mt-2 space-y-1">
            <p className="text-[11px] text-red-500 flex items-start gap-1">
                 <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 탈퇴회원의 재가입 기간 제한을 위하여 탈퇴회원의 ID, IP는 재가입 제한 설정한 기간동안 보관 후 파기되므로 이를 개인정보보호법에 의거하여<br/>
                 쇼핑몰 개인정보처리방침 내 반드시 명시하시기 바랍니다.
            </p>
         </div>
      </div>

       {/* Join Disabled IDs */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">가입불가 회원아이디</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    가입불가 회원아이디
                </div>
                <div className="flex-1 p-4">
                    <Textarea className="w-full h-24 resize-none border-gray-300 text-xs text-gray-600" defaultValue="admin,administration,administrator,master,webmaster,manage,manager,godo,godomall" />
                     <p className="text-[11px] text-[#888888] flex items-start gap-1 mt-1">
                         <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                         회원가입을 제한할 아이디를 쉼표(,)로 구분하여 입력하세요.
                    </p>
                </div>
            </div>
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Footer Info */}
      <div className="text-gray-600 text-xs">
          <h3 className="font-bold flex items-center gap-1 mb-2 text-blue-500">
              <Info className="w-4 h-4" /> 안내
          </h3>
          <div className="space-y-2">
              <p className="font-bold text-gray-800">회원 탈퇴 시, 탈퇴 회원의 개인정보는 모두 삭제 되나요?</p>
              <div className="text-gray-600 pl-2 space-y-1">
                <p>· 고도몰은 탈퇴회원 재가입 기간 제한 기능을 위해, 탈퇴 회원의 ID, IP 정보를 최대 1년 동안 보관하고 있습니다.</p>
                <p>· 해당 부분은 개인정보보호법에 의거 쇼핑몰 이용 고객에게 안내 되어야 하오니 쇼핑몰 개인정보처리방침 약관에 반드시 명시하시기 바랍니다.</p>
                <p>· 단, 탈퇴 회원 정보를 삭제하는 경우 해당 정보는 그 즉시 삭제 됩니다.</p>
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
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0">
                         <ChevronUp className="w-4 h-4 rotate-180" />
                </Button>
            </div>
        </div>

    </div>
  );
}
