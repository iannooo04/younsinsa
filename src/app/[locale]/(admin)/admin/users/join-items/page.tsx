"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";

export default function MemberJoinItemsPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">회원 가입 항목 관리</h1>
        <Button className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm font-bold border-0">
            저장
        </Button>
      </div>

       {/* Tabs */}
       <div className="flex items-center mb-6">
           <Button variant="outline" className="h-9 px-4 rounded-none border-gray-300 bg-white hover:bg-gray-50 flex items-center gap-1.5 text-xs font-normal">
               <span className="text-xs">🇰🇷</span> 기준몰
           </Button>
            <Button variant="outline" className="h-9 px-4 rounded-none border-gray-300 bg-[#FBFBFB] hover:bg-gray-50 flex items-center gap-1.5 text-xs text-gray-400 font-normal border-l-0">
               <span className="text-xs grayscale opacity-50">🇨🇳</span>
           </Button>
       </div>

      {/* Basic Info */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">기본 정보</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Member Type */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    회원구분
                </div>
                <div className="flex-1 p-3 flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="type-personal" className="border-gray-300 rounded-[2px]" defaultChecked disabled/>
                        <Label htmlFor="type-personal" className="text-gray-600 font-normal cursor-pointer text-xs">개인회원</Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="type-business" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="type-business" className="text-gray-600 font-normal cursor-pointer text-xs">사업자회원</Label>
                    </div>
                </div>
            </div>

            {/* ID */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    아이디
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="id-use" className="border-gray-300 rounded-[2px]" defaultChecked disabled/>
                        <Label htmlFor="id-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="id-required" className="border-gray-300 rounded-[2px]" defaultChecked disabled/>
                        <Label htmlFor="id-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                        <Input className="w-16 h-7 text-center border-gray-300" defaultValue="4" />
                        <span>~</span>
                        <Input className="w-16 h-7 text-center border-gray-300" defaultValue="50" />
                        <span>자 입력</span>
                    </div>
                </div>
            </div>

            {/* Name */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    이름
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="name-use" className="border-gray-300 rounded-[2px]" defaultChecked disabled/>
                        <Label htmlFor="name-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="name-required" className="border-gray-300 rounded-[2px]" defaultChecked disabled/>
                        <Label htmlFor="name-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                </div>
            </div>

            {/* Nickname */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    닉네임
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="nickname-use" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="nickname-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="nickname-required" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="nickname-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                        <Input className="w-16 h-7 text-center border-gray-300" defaultValue="2" />
                        <span>~</span>
                        <Input className="w-16 h-7 text-center border-gray-300" defaultValue="20" />
                        <span>자 입력</span>
                    </div>
                </div>
            </div>

             {/* Password */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    비밀번호
                </div>
                <div className="flex-1 p-3 flex flex-col gap-2">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5">
                            <Checkbox id="pw-use" className="border-gray-300 rounded-[2px]" defaultChecked disabled/>
                            <Label htmlFor="pw-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Checkbox id="pw-required" className="border-gray-300 rounded-[2px]" defaultChecked disabled/>
                            <Label htmlFor="pw-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                        </div>
                    </div>
                    <p className="text-[11px] text-red-500 flex items-start gap-1">
                        <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                        <span>
                            영문대문자/영문소문자/숫자/특수문자 중 2개 포함 10자리 이상 또는 3종류 이상을 조합하여 최소 8자리 이상의 길이로 설정<br/>
                            개인정보보호위원회 고시 [개인정보의 기술적·관리적 보호조치 기준]에 의한 비밀번호 설정 규칙입니다.
                        </span>
                    </p>
                </div>
            </div>

             {/* Email */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    이메일
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="email-use" className="border-red-500 text-red-500 rounded-[2px]" defaultChecked />
                        <Label htmlFor="email-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="email-required" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="email-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                    <div className="flex items-center gap-1.5 ml-8 bg-gray-50 px-2 py-1 rounded">
                         <Checkbox id="email-marketing" className="border-red-500 text-red-500 rounded-[2px]" defaultChecked />
                        <Label htmlFor="email-marketing" className="text-gray-600 font-normal cursor-pointer text-xs">정보/이벤트 메일 수신 동의 사용</Label>
                    </div>
                </div>
            </div>

            {/* Mobile */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    휴대폰번호
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="mobile-use" className="border-red-500 text-red-500 rounded-[2px]" defaultChecked />
                        <Label htmlFor="mobile-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="mobile-required" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="mobile-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                    <div className="flex items-center gap-1.5 ml-8 bg-gray-50 px-2 py-1 rounded">
                         <Checkbox id="mobile-marketing" className="border-red-500 text-red-500 rounded-[2px]" defaultChecked />
                        <Label htmlFor="mobile-marketing" className="text-gray-600 font-normal cursor-pointer text-xs">정보/이벤트 SMS 수신 동의 사용</Label>
                    </div>
                </div>
            </div>

            {/* Address */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    주소
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="address-use" className="border-red-500 text-red-500 rounded-[2px]" defaultChecked />
                        <Label htmlFor="address-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="address-required" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="address-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                </div>
            </div>

             {/* Phone */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    전화번호
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="phone-use" className="border-red-500 text-red-500 rounded-[2px]" defaultChecked />
                        <Label htmlFor="phone-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="phone-required" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="phone-required" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                </div>
            </div>
        </div>
      </div>

       {/* Business Info */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">사업자 정보</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
            {/* Company Name */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                   사업자회원
                </div>
                <div className="flex-1 p-3">
                    <div className="space-y-4">
                        <div className="flex items-center gap-6">
                             <div className="flex items-center gap-1.5">
                                <Checkbox id="company-name" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="company-name" className="text-gray-600 font-normal cursor-pointer text-xs">상호 (</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox id="company-name-req" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="company-name-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                            </div>
                        </div>

                         <div className="flex items-start gap-6">
                             <div className="flex items-center gap-1.5 mt-1">
                                <Checkbox id="biz-no" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="biz-no" className="text-gray-600 font-normal cursor-pointer text-xs">사업자번호 (</Label>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                                <Checkbox id="biz-no-req" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="biz-no-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                            </div>
                            <div className="flex flex-col gap-1 ml-4 bg-gray-50 p-2 rounded w-full">
                                 <div className="flex items-center gap-1.5">
                                    <Checkbox id="biz-dupe-check" className="border-red-500 text-red-500 rounded-[2px]" defaultChecked />
                                    <Label htmlFor="biz-dupe-check" className="text-gray-600 font-normal cursor-pointer text-xs">사업자번호 중복가입 제한 기능 사용</Label>
                                </div>
                                <p className="text-[11px] text-[#666666] flex items-center gap-1">
                                     <span className="inline-block bg-[#666666] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                                     설정 시점 이후 회원가입에 한해서만 중복가입 제한 기능이 적용됩니다.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                             <div className="flex items-center gap-1.5">
                                <Checkbox id="ceo" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="ceo" className="text-gray-600 font-normal cursor-pointer text-xs">대표자명 (</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox id="ceo-req" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="ceo-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                            </div>
                        </div>
                         <div className="flex items-center gap-6">
                             <div className="flex items-center gap-1.5">
                                <Checkbox id="biz-type" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="biz-type" className="text-gray-600 font-normal cursor-pointer text-xs">업태 (</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox id="biz-type-req" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="biz-type-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                             <div className="flex items-center gap-1.5">
                                <Checkbox id="biz-item" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="biz-item" className="text-gray-600 font-normal cursor-pointer text-xs">종목 (</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox id="biz-item-req" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="biz-item-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                             <div className="flex items-center gap-1.5">
                                <Checkbox id="biz-address" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="biz-address" className="text-gray-600 font-normal cursor-pointer text-xs">사업장 주소 (</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox id="biz-address-req" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="biz-address-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                            </div>
                        </div>
                         <div className="flex items-center gap-2">
                             <div className="flex items-center gap-1.5">
                                <Checkbox id="biz-cert" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="biz-cert" className="text-gray-600 font-normal cursor-pointer text-xs">사업자등록증 (</Label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Checkbox id="biz-cert-req" className="border-gray-300 rounded-[2px]" />
                                <Label htmlFor="biz-cert-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                            </div>
                             <Button variant="secondary" className="h-6 px-2 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888] ml-2">설정</Button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
      </div>

       {/* Additional Info */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">부가정보</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Fax */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    팩스번호
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="fax-use" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="fax-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="fax-req" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="fax-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                </div>
            </div>

            {/* Recommender Id */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    추천인아이디
                </div>
                <div className="flex-1 p-3 flex gap-6">
                    <div className="flex items-center gap-6 h-7">
                        <div className="flex items-center gap-1.5">
                            <Checkbox id="recomm-use" className="border-gray-300 rounded-[2px]" />
                            <Label htmlFor="recomm-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <Checkbox id="recomm-req" className="border-gray-300 rounded-[2px]" />
                            <Label htmlFor="recomm-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                            <Checkbox id="recomm-change-ban" className="border-gray-300 rounded-[2px]" />
                            <Label htmlFor="recomm-change-ban" className="text-gray-600 font-normal cursor-pointer text-xs">회원정보 변경 시 추천인아이디 등록 불가</Label>
                        </div>
                        <p className="text-[11px] text-[#666666] flex items-center gap-1">
                             <span className="inline-block bg-[#666666] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                             체크 시 회원 가입시에만 추천인아이디 등록이 가능합니다.
                        </p>
                        <p className="text-[11px] text-[#666666] flex items-center gap-1">
                             <span className="inline-block bg-[#666666] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                             <span>신규회원 가입 시 추천인을 등록하면 자동으로 지급되는 마일리지를 설정할 수 있습니다. <Link href="#" className="text-blue-500 hover:underline underline">마일리지 지급설정 바로가기</Link></span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Birthday */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    생일
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="birth-use" className="border-red-500 text-red-500 rounded-[2px]" defaultChecked />
                        <Label htmlFor="birth-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="birth-req" className="border-red-500 text-red-500 rounded-[2px]" defaultChecked />
                        <Label htmlFor="birth-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                    <div className="flex items-center gap-1.5 ml-8 border-l border-gray-200 pl-8">
                        <span className="text-gray-600">생일 양/음력 (</span>
                         <div className="flex items-center gap-1.5">
                            <Checkbox id="solar-lunar-use" className="border-gray-300 rounded-[2px]" />
                            <Label htmlFor="solar-lunar-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <Checkbox id="solar-lunar-req" className="border-gray-300 rounded-[2px]" />
                            <Label htmlFor="solar-lunar-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gender */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    성별
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="gender-use" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="gender-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="gender-req" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="gender-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                </div>
            </div>

            {/* Marital Status */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    결혼여부
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="marry-use" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="marry-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="marry-req" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="marry-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                     <div className="flex items-center gap-1.5 ml-8 border-l border-gray-200 pl-8">
                        <span className="text-gray-600">결혼 기념일 (</span>
                         <div className="flex items-center gap-1.5">
                            <Checkbox id="wedding-date-use" className="border-gray-300 rounded-[2px]" />
                            <Label htmlFor="wedding-date-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <Checkbox id="wedding-date-req" className="border-gray-300 rounded-[2px]" />
                            <Label htmlFor="wedding-date-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수 )</Label>
                        </div>
                    </div>
                </div>
            </div>

             {/* Job */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    직업
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="job-use" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="job-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="job-req" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="job-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                        <Button variant="secondary" className="h-6 px-2 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888]">설정</Button>
                        <span className="text-gray-600">직업 14개</span>
                    </div>
                </div>
            </div>

            {/* Interest */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    관심분야
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="interest-use" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="interest-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="interest-req" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="interest-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                        <Button variant="secondary" className="h-6 px-2 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888]">설정</Button>
                        <span className="text-gray-600">관심분야 7개</span>
                    </div>
                </div>
            </div>

            {/* Privacy Validity */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    개인정보유효기간
                </div>
                <div className="flex-1 p-3">
                    <div className="flex items-center gap-6 h-7 mb-2">
                        <div className="flex items-center gap-1.5">
                            <Checkbox id="privacy-use" className="border-gray-300 rounded-[2px]" />
                            <Label htmlFor="privacy-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <Checkbox id="privacy-req" className="border-gray-300 rounded-[2px]" />
                            <Label htmlFor="privacy-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                        </div>
                    </div>
                     <p className="text-[11px] text-red-500 flex items-center gap-1">
                        <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span>회원이 ‘휴면회원 방지기간’을 설정할 수 있는 항목입니다.</span>
                    </p>
                    <p className="text-[11px] text-red-500 flex items-center gap-1 pl-4">
                        <span>해당 설정 미사용 시, 기본값인 개인정보유효기간은 1년으로 자동 설정됩니다. <Link href="#" className="text-blue-500 hover:underline">관련 내용 자세히 보기&gt;</Link></span>
                    </p>
                </div>
            </div>

            {/* Memo */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                   남기는 말씀
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="memo-use" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="memo-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="memo-req" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="memo-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                    </div>
                </div>
            </div>
        </div>
      </div>

       {/* Additional Items */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">추가 정보</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             <div className="flex border-b border-gray-200 min-h-[50px] items-center">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center justify-center border-r border-gray-200 h-full">
                   <Input className="w-32 h-7 border-gray-300 bg-white" />
                </div>
                <div className="flex-1 p-3 flex items-center justify-between">
                     <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5">
                            <Checkbox id="add-use" className="border-gray-300 rounded-[2px]" />
                            <Label htmlFor="add-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <Checkbox id="add-req" className="border-gray-300 rounded-[2px]" />
                            <Label htmlFor="add-req" className="text-gray-600 font-normal cursor-pointer text-xs">필수</Label>
                        </div>
                         <Button variant="secondary" className="h-6 px-2 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888]">설정</Button>
                    </div>
                     <Button variant="outline" className="h-6 px-2 text-[11px] bg-white border-gray-300 text-gray-600 rounded-[2px] hover:bg-gray-50 flex items-center gap-1">
                        + 추가
                    </Button>
                </div>
            </div>
        </div>
      </div>

       {/* Anti-Automation */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">자동등록 방지</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                   자동등록방지문자
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="captcha-use" className="border-gray-300 rounded-[2px]" />
                        <Label htmlFor="captcha-use" className="text-gray-600 font-normal cursor-pointer text-xs">사용</Label>
                    </div>
                    <p className="text-[11px] text-red-500 flex items-center gap-1">
                        <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px]">!</span>
                        <span>사용함으로 선택 시 회원가입 항목에 자동등록방지 영역이 노출되지 않으면 스킨패치를 진행하시기 바랍니다.</span>
                    </p>
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
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0">
                         <ChevronUp className="w-4 h-4 rotate-180" />
                </Button>
            </div>
        </div>

    </div>
  );
}
