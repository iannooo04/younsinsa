"use client";

import React, { useState } from "react";
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
  Calendar,
  Youtube,
  ChevronUp,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function UnknownDepositPage() {
    const [activePCSkin, setActivePCSkin] = useState('skin1');
    const [activeMobileSkin, setActiveMobileSkin] = useState('skin1');

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">미확인 입금자 관리</h1>
        <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 px-6 rounded-sm text-xs">
            저장
        </Button>
      </div>

       {/* Register Unknown Deposit */}
      <div className="mb-10">
          <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-2">
            <h3 className="text-sm font-bold text-gray-800">미확인 입금자 등록</h3>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          
           <table className="w-full text-xs border-collapse border-t border-gray-200">
                <tbody>
                    <tr className="border-b border-gray-200">
                        <th className="w-32 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            입금일자
                        </th>
                        <td className="pl-4 py-2">
                             <div className="flex items-center gap-1">
                                <Input className="w-32 h-7 text-xs border-gray-300 rounded-sm" defaultValue="2026-01-10" />
                                <Calendar className="w-4 h-4 text-gray-500" />
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            입금자
                        </th>
                         <td className="pl-4 py-2 flex items-center justify-between">
                            <Input className="w-64 h-7 text-xs border-gray-300 rounded-sm" />
                             
                            <div className="flex items-center bg-[#F8F9FB] px-4 py-2 mr-4 rounded border border-gray-100">
                                <span className="font-bold text-gray-600 mr-4">입금내역</span>
                                <div className="flex items-center gap-2">
                                     <Select>
                                        <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300 bg-white">
                                            <SelectValue placeholder="은행명" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bank">은행명</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Input className="w-40 h-7 text-xs border-gray-300 rounded-sm" />
                                    <span className="text-gray-600">원</span>
                                </div>
                                <Button variant="secondary" size="sm" className="ml-2 h-7 px-3 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm disabled:opacity-50" disabled>
                                    미입금자등록
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
             <div className="mt-4 text-[11px] text-[#A4A4A4] pl-1">
                 <p className="flex items-start gap-1">
                    <span className="bg-[#666666] text-white w-3 h-3 flex items-center justify-center text-[9px] rounded-[2px] mt-0.5">!</span>
                    <span>확인되지 않은 입금자 리스트를 등록해 주세요.<br/>등록된 미확인 입금자 리스트가 쇼핑몰에 노출되어 입금자를 찾을 수 있습니다.</span>
                 </p>
             </div>
      </div>

       {/* Unknown Deposit List */}
      <div className="mb-10">
          <div className="flex items-center gap-1 mb-2 border-t-2 border-gray-500 pt-4 bg-[#FBFBFB] border-b border-gray-200 p-3">
            <h3 className="text-sm font-bold text-gray-800">미확인 입금자 리스트</h3>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>

           <div className="border-b border-gray-200">
                 {/* Search Query */}
                 <div className="flex items-center text-xs border-b border-gray-200">
                    <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                        검색어
                    </div>
                    <div className="flex-1 p-3 flex gap-2">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300 bg-white">
                                <SelectValue placeholder="통합검색" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">통합검색</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select defaultValue="exact">
                            <SelectTrigger className="w-28 h-7 text-[11px] border-gray-300 bg-white">
                                <SelectValue placeholder="검색어 전체일치" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="exact">검색어 전체일치</SelectItem>
                            </SelectContent>
                        </Select>
                         <Input className="w-64 h-7 border-gray-300" placeholder="검색어 전체를 정확히 입력하세요." />
                         <Button className="bg-[#A4A4A4] hover:bg-[#888888] text-white h-7 px-3 text-[11px] rounded-sm">검색</Button>
                    </div>
                </div>

                 {/* Date Search */}
                 <div className="flex items-center text-xs">
                    <div className="w-36 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                        입금일자 검색
                    </div>
                    <div className="flex-1 p-3 flex items-center gap-2">
                         <div className="flex items-center gap-1">
                            <Input className="w-28 h-7 text-center border-gray-300" defaultValue="2026-01-04" />
                            <Calendar className="w-4 h-4 text-gray-500" />
                        </div>
                        <span>~</span>
                        <div className="flex items-center gap-1">
                            <Input className="w-28 h-7 text-center border-gray-300" defaultValue="2026-01-10" />
                            <Calendar className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="flex items-center gap-0.5 ml-1">
                             <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">오늘</Button>
                            <Button variant="default" size="sm" className="h-7 px-2 text-[11px] bg-gray-600 text-white rounded-sm hover:bg-gray-700">7일</Button>
                            <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">15일</Button>
                            <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1개월</Button>
                             <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">3개월</Button>
                            <Button variant="outline" size="sm" className="h-7 px-2 text-[11px] bg-white text-gray-600 rounded-sm border-gray-300 hover:bg-gray-50">1년</Button>
                        </div>
                    </div>
                </div>
            </div>
            
             {/* List Table */}
             <div className="border border-gray-300 border-t-0 mt-6 mb-4">
                 <table className="w-full text-xs text-center border-collapse">
                      <thead className="bg-[#BDBDBD] text-white font-normal">
                          <tr className="h-8">
                              <th className="w-10 border-r border-[#CDCDCD]">
                                  <Checkbox className="bg-white border-gray-300 rounded-[2px]" />
                              </th>
                              <th className="border-r border-[#CDCDCD] font-normal w-16">번호</th>
                              <th className="border-r border-[#CDCDCD] font-normal w-32">입금일자</th>
                              <th className="border-r border-[#CDCDCD] font-normal">고객명</th>
                              <th className="border-r border-[#CDCDCD] font-normal w-32">은행</th>
                              <th className="font-normal w-32">금액</th>
                          </tr>
                      </thead>
                      <tbody className="bg-white">
                         <tr>
                              <td colSpan={6} className="py-8 text-center text-gray-500 text-xs">
                                  검색된 정보가 없습니다.
                              </td>
                          </tr>
                      </tbody>
                 </table>
             </div>
             <div className="flex gap-1">
                 <Button className="bg-[#A4A4A4] hover:bg-[#888888] text-white h-7 px-3 text-[11px] rounded-sm">선택삭제</Button>
                 <Button className="bg-[#A4A4A4] hover:bg-[#888888] text-white h-7 px-3 text-[11px] rounded-sm">엑셀다운로드</Button>
             </div>
      </div>

       {/* Banner/Popup Settings */}
      <div className="mb-10">
          <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-2 mt-10">
            <h3 className="text-sm font-bold text-gray-800">미확인 입금자 배너/팝업 노출 설정</h3>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>

          <table className="w-full text-xs border-collapse">
                <tbody>
                    <tr className="border-b border-gray-200">
                        <th className="w-36 bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            배너 사용
                        </th>
                        <td className="pl-4 py-2">
                             <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="used" id="banner-used" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="banner-used" className="text-gray-700 font-normal cursor-pointer">사용</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="unused" id="banner-unused" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="banner-unused" className="text-gray-700 font-normal cursor-pointer">미사용</Label>
                                </div>
                            </RadioGroup>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            리스트 노출 기간
                        </th>
                        <td className="pl-4 py-2">
                             <RadioGroup defaultValue="3" className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="3" id="period-3" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="period-3" className="text-gray-700 font-normal cursor-pointer">3일</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="7" id="period-7" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="period-7" className="text-gray-700 font-normal cursor-pointer">7일</Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="14" id="period-14" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="period-14" className="text-gray-700 font-normal cursor-pointer">14일</Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="30" id="period-30" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="period-30" className="text-gray-700 font-normal cursor-pointer">30일</Label>
                                </div>
                                 <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="60" id="period-60" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="period-60" className="text-gray-700 font-normal cursor-pointer">60일</Label>
                                </div>
                            </RadioGroup>
                        </td>
                    </tr>
                     <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            입금 은행 숨김
                        </th>
                        <td className="pl-4 py-2">
                             <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="used" id="bank-hidden-used" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="bank-hidden-used" className="text-gray-700 font-normal cursor-pointer">사용</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="unused" id="bank-hidden-unused" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="bank-hidden-unused" className="text-gray-700 font-normal cursor-pointer">미사용</Label>
                                </div>
                            </RadioGroup>
                        </td>
                    </tr>
                     <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            입금 금액 숨김
                        </th>
                        <td className="pl-4 py-2">
                             <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="used" id="amount-hidden-used" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="amount-hidden-used" className="text-gray-700 font-normal cursor-pointer">사용</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="unused" id="amount-hidden-unused" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="amount-hidden-unused" className="text-gray-700 font-normal cursor-pointer">미사용</Label>
                                </div>
                            </RadioGroup>
                        </td>
                    </tr>
                     <tr className="border-b border-gray-200">
                        <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            뱅크다 자동 연동
                        </th>
                        <td className="pl-4 py-2">
                             <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="used" id="link-used" className="border-gray-300 text-gray-600" />
                                    <Label htmlFor="link-used" className="text-gray-700 font-normal cursor-pointer">사용</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="unused" id="link-unused" className="border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="link-unused" className="text-gray-700 font-normal cursor-pointer">미사용</Label>
                                </div>
                            </RadioGroup>
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            뱅크다 자동 연동 제한금액
                        </th>
                        <td className="pl-4 py-2 flex items-center gap-1">
                             <Input className="w-32 h-7 text-xs border-gray-300 rounded-sm" />
                             <span className="text-gray-600">원</span>
                        </td>
                    </tr>
                     <tr className="border-b border-gray-200">
                         <th className="bg-[#FBFBFB] text-left pl-4 py-3 font-normal text-gray-700 border-r border-gray-200">
                            치환코드
                        </th>
                         <td className="pl-4 py-3">
                             <div className="flex items-center gap-2 mb-1">
                                 <span className="text-gray-800 font-bold">{`{ghostDepositorBanner}`}</span>
                                 <Button variant="secondary" size="sm" className="h-5 px-2 text-[10px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm">복사하기</Button>
                             </div>
                             <p className="text-gray-500 text-[11px]">{`{!} 치환코드를 복사하여 PC와 모바일 각각의 디자인 메뉴에서 HTML 소스에 삽입 시 미확인 입금자 배너가 쇼핑몰에 노출됩니다.`}</p>
                        </td>
                    </tr>
                </tbody>
          </table>
      </div>

       {/* PC Design Settings */}
      <div className="mb-10">
          <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-2">
            <h3 className="text-sm font-bold text-gray-800">PC 미확인 입금자 디자인 설정</h3>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          
           <div className="border border-gray-200 p-4 bg-[#FBFBFB]">
               {/* Banner */}
               <div className="flex mb-6 items-center">
                   <div className="w-24 text-center font-normal text-gray-700 text-xs">배너</div>
                   <div className="flex-1 border-l border-gray-200 pl-4 bg-white py-4">
                       <RadioGroup defaultValue="template" className="flex items-center gap-4 mb-4">
                           <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="template" id="pc-banner-template" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="pc-banner-template" className="text-gray-700 font-normal cursor-pointer">템플릿에서 선택</Label>
                           </div>
                           <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="direct" id="pc-banner-direct" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="pc-banner-direct" className="text-gray-700 font-normal cursor-pointer">직접 업로드하기</Label>
                           </div>
                       </RadioGroup>
                       
                       <div className="flex gap-4 overflow-x-auto pb-2">
                           {[1, 2, 3, 4, 5, 6].map((i) => (
                               <div key={i} className="flex flex-col items-center gap-2">
                                   <div className={`w-36 h-12 bg-gray-100 border ${i===2 ? 'border-red-500' : 'border-gray-200'} flex items-center justify-center overflow-hidden`}>
                                       {/* Placeholder for banner images - Replace with colorful blocks */}
                                       <div className={`w-full h-full ${
                                           i === 1 ? 'bg-orange-500' : 
                                           i === 2 ? 'bg-white' : 
                                           i === 3 ? 'bg-blue-600' : 
                                           i === 4 ? 'bg-yellow-100' : 
                                           i === 5 ? 'bg-green-500' : 'bg-white'
                                        } flex items-center justify-center text-[10px] text-white`}>
                                            <span className="text-black font-bold">미확인 입금자 리스트</span>
                                        </div>
                                   </div>
                                    <RadioGroupItem value={`skin${i}`} className={`border-gray-300 ${i===2 ? 'text-red-500 border-red-500' : ''}`} />
                               </div>
                           ))}
                       </div>
                   </div>
               </div>

                {/* Skin */}
               <div className="flex items-center">
                   <div className="w-24 text-center font-normal text-gray-700 text-xs">스킨</div>
                   <div className="flex-1 border-l border-gray-200 pl-4 bg-white py-4">
                       <RadioGroup defaultValue="template" className="flex items-center gap-4 mb-4">
                           <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="template" id="pc-skin-template" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="pc-skin-template" className="text-gray-700 font-normal cursor-pointer">템플릿에서 선택</Label>
                           </div>
                           <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="direct" id="pc-skin-direct" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="pc-skin-direct" className="text-gray-700 font-normal cursor-pointer">직접 입력하기</Label>
                           </div>
                       </RadioGroup>
                       
                       <div className="flex gap-4 overflow-x-auto pb-2">
                           {[1, 2, 3, 4, 5].map((i) => (
                               <div key={i} className="flex flex-col items-center gap-2">
                                   <div className={`w-36 h-24 bg-white border ${activePCSkin === `skin${i}` ? 'border-red-500' : 'border-gray-200'} p-1`}>
                                        {/* Skin Preview Placeholder */}
                                         <div className="w-full h-4 bg-gray-100 mb-1 flex items-center px-1">
                                             <div className="w-2 h-2 rounded-full bg-red-400 mr-1"></div>
                                             <span className="text-[6px]">미확인 입금자 리스트</span>
                                         </div>
                                         <div className="border border-gray-100 h-10 mb-1"></div>
                                          <div className="grid grid-cols-4 gap-1">
                                              <div className="h-2 bg-gray-100"></div>
                                              <div className="h-2 bg-gray-100"></div>
                                              <div className="h-2 bg-gray-100"></div>
                                              <div className="h-2 bg-gray-100"></div>
                                          </div>
                                   </div>
                                    <div 
                                        onClick={() => setActivePCSkin(`skin${i}`)}
                                        className={`w-4 h-4 rounded-full border flex items-center justify-center cursor-pointer ${activePCSkin === `skin${i}` ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        {activePCSkin === `skin${i}` && <div className="w-2 h-2 rounded-full bg-red-500" />}
                                    </div>
                               </div>
                           ))}
                       </div>
                   </div>
               </div>
           </div>
      </div>

       {/* Mobile Design Settings */}
       <div className="mb-10">
          <div className="flex items-center gap-1 mb-2 border-b border-gray-800 pb-2">
            <h3 className="text-sm font-bold text-gray-800">모바일 미확인 입금자 디자인 설정</h3>
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </div>
          
           <div className="border border-gray-200 p-4 bg-[#FBFBFB]">
               {/* Banner */}
               <div className="flex mb-6 items-center">
                   <div className="w-24 text-center font-normal text-gray-700 text-xs">배너</div>
                   <div className="flex-1 border-l border-gray-200 pl-4 bg-white py-4">
                       <RadioGroup defaultValue="template" className="flex items-center gap-4 mb-4">
                           <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="template" id="mobile-banner-template" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="mobile-banner-template" className="text-gray-700 font-normal cursor-pointer">템플릿에서 선택</Label>
                           </div>
                           <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="direct" id="mobile-banner-direct" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="mobile-banner-direct" className="text-gray-700 font-normal cursor-pointer">직접 업로드하기</Label>
                           </div>
                       </RadioGroup>
                       
                       <div className="flex gap-4 overflow-x-auto pb-2">
                           {[1, 2, 3, 4, 5, 6].map((i) => (
                               <div key={i} className="flex flex-col items-center gap-2">
                                   <div className={`w-36 h-10 bg-gray-100 border ${i===1 ? 'border-red-500' : 'border-gray-200'} flex items-center justify-center overflow-hidden`}>
                                        <div className={`w-full h-full ${
                                           i === 1 ? 'bg-orange-500' : 
                                           i === 2 ? 'bg-white' : 
                                           i === 3 ? 'bg-blue-600' : 
                                           i === 4 ? 'bg-white' : 
                                           i === 5 ? 'bg-green-500' : 'bg-white'
                                        } flex items-center justify-center text-[10px] text-white`}>
                                            <span className="text-black font-bold">미확인 입금 고객</span>
                                        </div>
                                   </div>
                                     <RadioGroupItem value={`skin${i}`} className={`border-gray-300 ${i===1 ? 'text-red-500 border-red-500' : ''}`} />
                               </div>
                           ))}
                       </div>
                   </div>
               </div>

                {/* Skin */}
               <div className="flex items-center">
                   <div className="w-24 text-center font-normal text-gray-700 text-xs">스킨</div>
                   <div className="flex-1 border-l border-gray-200 pl-4 bg-white py-4">
                       <RadioGroup defaultValue="template" className="flex items-center gap-4 mb-4">
                           <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="template" id="mobile-skin-template" className="border-red-500 text-red-500 focus:ring-red-500" />
                                <Label htmlFor="mobile-skin-template" className="text-gray-700 font-normal cursor-pointer">템플릿에서 선택</Label>
                           </div>
                           <div className="flex items-center gap-1.5">
                                <RadioGroupItem value="direct" id="mobile-skin-direct" className="border-gray-300 text-gray-600" />
                                <Label htmlFor="mobile-skin-direct" className="text-gray-700 font-normal cursor-pointer">직접 입력하기(미리보기)</Label>
                           </div>
                       </RadioGroup>
                       
                       <div className="flex gap-4 overflow-x-auto pb-2">
                           {[1, 2, 3, 4, 5].map((i) => (
                               <div key={i} className="flex flex-col items-center gap-2">
                                    <div className={`w-36 h-32 bg-white border ${activeMobileSkin === `skin${i}` ? 'border-red-500' : 'border-gray-200'} p-1`}>
                                        {/* Mobile Skin Preview Placeholder */}
                                         <div className={`w-full h-8 mb-1 flex items-center px-2 justify-center text-white text-[8px] font-bold ${
                                              i === 1 ? 'bg-orange-500' : 
                                              i === 2 ? 'bg-black' : 
                                              i === 3 ? 'bg-blue-600' : 
                                              i === 4 ? 'bg-white border text-black' : 
                                              'bg-green-500'
                                         }`}>
                                             미확인 입금금액/입금자명
                                         </div>
                                          <div className="border border-gray-100 h-8 mb-1"></div>
                                          <div className="h-4 bg-gray-300 w-16 mx-auto"></div>
                                   </div>
                                    <div 
                                        onClick={() => setActiveMobileSkin(`skin${i}`)}
                                        className={`w-4 h-4 rounded-full border flex items-center justify-center cursor-pointer ${activeMobileSkin === `skin${i}` ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        {activeMobileSkin === `skin${i}` && <div className="w-2 h-2 rounded-full bg-red-500" />}
                                    </div>
                               </div>
                           ))}
                       </div>
                   </div>
               </div>
           </div>
      </div>
      
       {/* Copyright Footer */}
        <div className="mt-20 border-t border-gray-200 pt-10 text-center text-xs text-gray-500 pb-10">
            © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
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

    </div>
  );
}
