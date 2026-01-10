"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
  Info,
  Calendar as CalendarIcon
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";

export default function DormantMemberManagementPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">휴면 회원 관리</h1>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">휴면회원 검색</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Store */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    상점
                </div>
                <div className="flex-1 p-3">
                    <RadioGroup defaultValue="all" className="flex items-center gap-6">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="all" id="store-all" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="store-all" className="text-gray-600 font-normal cursor-pointer text-xs">전체</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="kr" id="store-kr" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="store-kr" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-1">
                                🇰🇷 기준몰
                            </Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="cn" id="store-cn" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="store-cn" className="text-gray-600 font-normal cursor-pointer text-xs flex items-center gap-1">
                                🇨🇳 중문몰
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            {/* Search Word */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-3 flex items-center gap-1">
                     <Select defaultValue="id">
                        <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="아이디" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="id">아이디</SelectItem>
                            <SelectItem value="name">이름</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="exact">
                        <SelectTrigger className="w-32 h-7 text-xs border-gray-300 bg-white">
                            <SelectValue placeholder="검색어 전체일치" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="exact">검색어 전체일치</SelectItem>
                            <SelectItem value="partial">검색어 부분일치</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input className="w-64 h-7 text-xs border-gray-300" placeholder="검색어 전체를 정확히 입력하세요." />
                </div>
            </div>

             {/* Dormant Date */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    휴면회원 전환일
                </div>
                <div className="flex-1 p-3">
                     <div className="flex items-center gap-2">
                         <div className="relative">
                             <Input className="w-32 h-7 text-xs border-gray-300 pr-8" defaultValue="2026-01-04" />
                             <CalendarIcon className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1.5" />
                         </div>
                         <span className="text-gray-400">~</span>
                         <div className="relative">
                             <Input className="w-32 h-7 text-xs border-gray-300 pr-8" defaultValue="2026-01-10" />
                             <CalendarIcon className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1.5" />
                         </div>
                     </div>
                </div>
            </div>
        </div>
        
         <div className="flex justify-center mt-6">
              <Button className="h-9 px-10 text-xs bg-[#555555] hover:bg-[#444444] text-white rounded-[2px] font-bold">
                검색
            </Button>
         </div>
      </div>

       {/* Search Results */}
       <div className="mb-0">
           <div className="flex items-center justify-between mb-2">
               <div className="text-xs">
                   검색 <span className="text-red-500 font-bold">0</span>명 / 전체 <span className="text-red-500 font-bold">0</span>명
               </div>
               <Select defaultValue="10">
                    <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white">
                        <SelectValue placeholder="10개 보기" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10개 보기</SelectItem>
                        <SelectItem value="20">20개 보기</SelectItem>
                        <SelectItem value="50">50개 보기</SelectItem>
                    </SelectContent>
                </Select>
           </div>
           
           <div className="border-t-2 border-gray-400 border-b border-gray-200 min-h-[100px] mb-4">
                <table className="w-full text-xs text-center border-collapse">
                     <thead>
                         <tr className="bg-[#B9B9B9] text-white h-9 border-b border-gray-300 font-normal">
                             <th className="w-10 border-r border-gray-300"><Checkbox className="border-gray-50 opacity-50 bg-white" /></th>
                             <th className="w-32 border-r border-gray-300">휴면회원 전환일</th>
                             <th className="w-24 border-r border-gray-300">상점 구분</th>
                             <th className="w-32 border-r border-gray-300">아이디</th>
                             <th className="w-24 border-r border-gray-300">이름</th>
                             <th className="w-24 border-r border-gray-300">회원등급</th>
                             <th className="w-24 border-r border-gray-300">마일리지</th>
                             <th className="w-24 border-r border-gray-300">예치금</th>
                             <th className="w-32 border-r border-gray-300">회원가입일</th>
                             <th className="">휴면해제</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr className="h-14">
                             <td colSpan={10} className="text-center text-gray-500">휴면회원으로 전환된 회원이 없습니다.</td>
                         </tr>
                     </tbody>
                </table>
           </div>

           {/* Footer Action */}
           <div className="bg-[#FBFBFB] p-3 flex justify-start gap-1 border border-gray-200 mb-12">
                  <Button variant="secondary" className="h-7 px-3 text-[11px] bg-white border border-gray-300 text-gray-600 rounded-[2px] hover:bg-gray-50">선택 휴면해제</Button>
                  <Button variant="secondary" className="h-7 px-3 text-[11px] bg-white border border-gray-300 text-gray-600 rounded-[2px] hover:bg-gray-50">선택 탈퇴처리</Button>
           </div>
       </div>

        <hr className="border-gray-200 mb-6" />

      {/* Guide Info */}
       <div className="text-gray-600 text-xs">
          <h3 className="font-bold flex items-center gap-1 mb-2 text-blue-500 text-[13px]">
              <Info className="w-4 h-4" /> 안내
          </h3>
          <div className="space-y-6">
              <div>
                  <h4 className="font-bold text-gray-700 text-xs mb-1">휴면회원 유의사항</h4>
                  <ul className="list-none space-y-1 text-gray-500">
                    <li>2023년 9월 15일 개인정보보호법 개정에 따라 개인정보 유효기간제가 폐지되어 상점별로 운영정책에 따라 자율적으로 휴변회원 사용여부를 설정할 수 있습니다.</li>
                    <li>휴면회원 사용 설정은 회원 &gt; 회원 관리 &gt; 휴면 회원 정책 에서 설정하실 수 있습니다.</li>
                    <li>휴면회원 기능을 '사용안함'으로 설정 시 기존 휴면상태로 전환된 회원은 휴면 회원 관리에서 수동으로 휴면해제 해주시면 됩니다.</li>
                  </ul>
              </div>

               <div>
                  <h4 className="font-bold text-gray-700 text-xs mb-1">[휴면회원전환일] 휴면회원전환일이란 무엇인가요?</h4>
                  <ul className="list-none space-y-1 text-gray-500">
                    <li>휴면회원 기능을 '사용함'으로 설정 시, 휴면회원이 쇼핑몰에 마지막으로 로그인한 지 1년(또는 별도로 정한 기간)경과 시 휴면회원으로 전환된 날짜를 말합니다.</li>
                  </ul>
              </div>

               <div>
                  <h4 className="font-bold text-gray-700 text-xs mb-1">휴면회원 해제 실패 사유</h4>
                  <p className="text-gray-500 mb-2">2023년 9월 15일 개인정보보호법 개정에 따라, 관리자가 휴면회원 대상으로 일반회원 전환을 진행할 경우 회원에게 사전 안내 고지를 반드시 진행해야 합니다.</p>
                  <p className="text-gray-500 mb-4">안내 고지는 이메일, SMS, 알림톡 중 최소 1가지 수단을 통해 발송되며, 해당 수단이 모두 불가능한 경우에는 회원이 직접 쇼핑몰에서 휴면 해제를 진행해야 합니다.</p>
                  
                  <p className="text-gray-500 mb-2">휴면회원 해제가 실패되는 경우, 아래 항목을 확인해주세요.</p>
                  <ol className="list-decimal pl-4 space-y-1 text-gray-500">
                      <li>회원의 휴대폰번호와 이메일 중 하나라도 기입되어 있는지 확인합니다. (둘 중 하나만 입력되어 있어도 안내 고지 발송이 가능합니다.)</li>
                      <li>자동 메일 설정이 '발송함' 으로 설정되어 있는지 확인합니다. <Link href="#" className="text-blue-500 underline hover:text-blue-600">[바로가기 &gt;]</Link></li>
                      <li>SMS 포인트가 있는지 확인합니다. <Link href="#" className="text-blue-500 underline hover:text-blue-600">[바로가기 &gt;]</Link></li>
                      <li>알림톡 설정이 '사용함' 으로 선택 되어 있는지 확인합니다. <Link href="#" className="text-blue-500 underline hover:text-blue-600">[바로가기 &gt;]</Link></li>
                      <li>SMS 자동 발송이 체크 되어 있는지 확인합니다. <Link href="#" className="text-blue-500 underline hover:text-blue-600">[바로가기 &gt;]</Link></li>
                      <li>관리자의 발신번호가 등록되어 있는지 확인합니다. <Link href="#" className="text-blue-500 underline hover:text-blue-600">[바로가기 &gt;]</Link></li>
                      <li>일시적인 통신오류로 인해 발송이 지연될 수 있으므로, 잠시후 다시 시도합니다.</li>
                  </ol>
              </div>

               <div className="text-gray-500 space-y-2">
                   <p>메일, SMS, 알림톡 중 하나라도 정상적으로 발송이 가능한 상태라면 휴면회원 해제가 가능합니다.</p>
                   <p>위 항목들은 가능한 수단이 정상 작동하고 있는지 점검하기 위한 내용입니다.</p>
                   <p className="mt-4">위 방법으로도 처리가 어려운 경우, NHN커머스 고객센터로 문의해 주시기 바랍니다.</p>
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
