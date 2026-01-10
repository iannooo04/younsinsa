"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, Youtube, ChevronUp } from "lucide-react";

export default function AutoDepositGuidePage() {
  const [activeTab, setActiveTab] = useState("bankda");

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">자동입금확인 서비스 안내</h1>
      </div>

        {/* Hero Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">자동 입금확인</h2>
        <p className="text-sm text-gray-500 mb-6">입금내역 자동처리를 통한 효율적인 업무시간 활용</p>
        <div className="w-24 h-1 bg-red-500 mb-8"></div>
        
        <div className="border border-gray-200 p-8 text-center bg-white mb-10">
            <p className="text-sm text-gray-600">
                자동 입금확인 서비스는 고객의 <span className="text-red-500 font-bold">주문내역에 대한 입금확인을 자동 처리</span>하여 쇼핑몰 관리의 효율성을 극대화 할 수 있습니다.
            </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
            {/* Bankda Card */}
            <div className={`border p-8 py-10 flex flex-col items-center bg-[#FFF9F2] ${activeTab === 'bankda' ? 'border-[#FF9D00] border-2' : 'border-[#FF9D00]/20'}`}>
                <div className="mb-6">
                     <span className="text-3xl font-black text-gray-800 tracking-tighter">BANKDA</span>
                </div>
                <ul className="text-left space-y-4 mb-8 w-full px-4">
                    <li className="flex items-start gap-2">
                        <div className="min-w-4 min-h-4 rounded-full bg-[#FF9D00] flex items-center justify-center mt-0.5">
                            <Check className="w-3 h-3 text-white stroke-[4]" />
                        </div>
                        <div>
                             <p className="text-sm text-gray-700 font-bold">최대 10분~1시간마다 입금확인 자동 처리</p>
                             <p className="text-xs text-gray-500 mt-1">- 뱅크다 : 1시간 / 뱅크다퀵 : 10분 이내</p>
                        </div>
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="min-w-4 min-h-4 rounded-full bg-[#FF9D00] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white stroke-[4]" />
                        </div>
                        <p className="text-sm text-gray-700 font-bold">다중계좌 통합관리</p>
                    </li>
                     <li className="flex items-center gap-2">
                        <div className="min-w-4 min-h-4 rounded-full bg-[#FF9D00] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white stroke-[4]" />
                        </div>
                        <p className="text-sm text-gray-700 font-bold">동명이인 자동분류</p>
                    </li>
                     <li className="flex items-center gap-2">
                        <div className="min-w-4 min-h-4 rounded-full bg-[#FF9D00] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white stroke-[4]" />
                        </div>
                        <p className="text-sm text-gray-700 font-bold">입금내역 추적 가능</p>
                    </li>
                </ul>
                <Button 
                    className="bg-[#FF8A00] hover:bg-[#E67C00] text-white font-bold h-10 w-40 rounded py-2 text-sm"
                    onClick={() => setActiveTab('bankda')}
                >
                    뱅크다 신청 <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>

            {/* PayAction Card */}
            <div className={`border p-8 py-10 flex flex-col items-center bg-[#F5F5FF] ${activeTab === 'payaction' ? 'border-[#7B6EED] border-2' : 'border-[#7B6EED]/20'}`}>
                <div className="mb-6 flex items-center gap-1">
                     <span className="text-3xl font-black text-gray-800 tracking-tighter flex items-center gap-1">
                        <span className="text-[#7B6EED] text-4xl">⚡</span> PayAction
                     </span>
                </div>
                 <ul className="text-left space-y-4 mb-8 w-full px-4">
                    <li className="flex items-center gap-2">
                        <div className="min-w-4 min-h-4 rounded-full bg-[#7B6EED] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white stroke-[4]" />
                        </div>
                        <p className="text-sm text-gray-700 font-bold">1초 무통장입금 자동확인 서비스</p>
                    </li>
                    <li className="flex items-center gap-2">
                         <div className="min-w-4 min-h-4 rounded-full bg-[#7B6EED] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white stroke-[4]" />
                        </div>
                        <p className="text-sm text-gray-700 font-bold">수동매칭도 즉시 입금확인 처리</p>
                    </li>
                     <li className="flex items-center gap-2">
                         <div className="min-w-4 min-h-4 rounded-full bg-[#7B6EED] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white stroke-[4]" />
                        </div>
                        <p className="text-sm text-gray-700 font-bold">다중계좌 통합관리</p>
                    </li>
                     <li className="flex items-center gap-2">
                        <div className="min-w-4 min-h-4 rounded-full bg-[#7B6EED] flex items-center justify-center">
                            <Check className="w-3 h-3 text-white stroke-[4]" />
                        </div>
                        <p className="text-sm text-gray-700 font-bold">현금영수증 자동/수동 발행도 1초만에</p>
                    </li>
                </ul>
                 <Button 
                    className="bg-[#7B6EED] hover:bg-[#685CC9] text-white font-bold h-10 w-40 rounded py-2 text-sm"
                    onClick={() => setActiveTab('payaction')}
                 >
                    페이액션 신청 <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="border border-gray-300">
           <div className="flex border-b border-gray-300">
               <button 
                  className={`flex-1 py-4 text-center font-bold text-sm ${activeTab === 'bankda' ? 'bg-[#222A3E] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('bankda')}
                >
                   뱅크다
               </button>
               <button 
                  className={`flex-1 py-4 text-center font-bold text-sm ${activeTab === 'payaction' ? 'bg-[#222A3E] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('payaction')}
                >
                   페이액션
               </button>
           </div>
           
           <div className="p-8">
               {activeTab === 'bankda' && (
                   <div className="space-y-12">
                       {/* Process */}
                       <div>
                           <h3 className="text-base font-bold text-gray-700 mb-6">서비스 이용 프로세스</h3>
                           <div className="border border-gray-200 p-8 mb-4">
                               <div className="flex items-center justify-between px-10">
                                   <div className="text-center">
                                       <p className="text-red-500 text-lg font-bold mb-2">STEP 1</p>
                                       <p className="text-xs text-gray-600">은행계좌</p>
                                       <p className="text-xs text-gray-600">빠른 조회 신청</p>
                                   </div>
                                    <ChevronRight className="w-8 h-8 text-gray-400" />
                                   <div className="text-center">
                                       <p className="text-red-500 text-lg font-bold mb-2">STEP 2</p>
                                       <p className="text-xs text-gray-600">서비스 신청</p>
                                       <p className="text-xs text-gray-600">및 결제</p>
                                   </div>
                                    <ChevronRight className="w-8 h-8 text-gray-400" />
                                   <div className="text-center">
                                        <p className="text-red-500 text-lg font-bold mb-2">STEP 3</p>
                                       <p className="text-xs text-gray-600">서비스 설정</p>
                                   </div>
                                    <ChevronRight className="w-8 h-8 text-gray-400" />
                                   <div className="text-center">
                                       <p className="text-red-500 text-lg font-bold mb-2">STEP 4</p>
                                       <p className="text-xs text-gray-600">서비스 이용</p>
                                   </div>
                               </div>
                           </div>
                           <div className="space-y-1 text-xs text-gray-500 pl-1">
                               <p>· 빠른조회 서비스 신청은 해당 은행 영업점 또는 인터넷뱅킹을 통해 등록 가능합니다.</p>
                               <p>· <span className="text-red-500">이용문의</span></p>
                               <p className="pl-2">- 뱅크다 : 02-3663-3247 (거래내역 및 계좌관련 오류, 자동입금확인 페이지 오류)</p>
                               <p className="pl-2">- NHN커머스 : 1688-7662 (자동입금확인처리, 결제문의)</p>
                               <p>· <span className="text-red-500">이용문의</span></p>
                           </div>
                       </div>

                       {/* Available Banks */}
                       <div>
                           <h3 className="text-base font-bold text-gray-700 mb-6">서비스 이용 가능 금융기관</h3>
                           <div className="grid grid-cols-5 gap-4">
                               {['KB 국민은행', 'IBK기업은행', 'NH농협은행', 'KDB산업은행', 'MG새마을금고', 'KEB 하나은행', 'SC제일은행', 'Sh수협은행', '신한은행', '신협', 'citibank', 'KEB 외환은행', 'BNK 부산은행', '전북은행', '우리은행', '우체국', '광주은행', 'iM뱅크', 'BNK 경남은행', '제주은행'].map((bank, i) => (
                                   <div key={i} className="border border-gray-200 h-16 flex items-center justify-center bg-white p-2">
                                        {/* Placeholder for Logos - Using text for now as images are not provided */}
                                       <span className="text-xs font-bold text-gray-600 flex items-center gap-1">
                                            {/* Simple colorful icon placeholder */}
                                            <span className="w-3 h-3 rounded-full bg-blue-500/20 inline-block mr-1"></span>
                                            {bank}
                                       </span>
                                   </div>
                               ))}
                           </div>
                            <div className="mt-4 text-xs">
                                <a href="#" className="text-blue-500 hover:underline">빠른 계좌조회 신청 방법 안내 바로가기 →</a>
                            </div>
                       </div>

                       {/* Pricing */}
                       <div>
                           <h3 className="text-base font-bold text-gray-700 mb-6">이용요금 <span className="text-xs text-gray-400 font-normal ml-2">VAT 포함</span></h3>
                           <table className="w-full text-center border-collapse border border-gray-300 text-xs">
                               <thead className="bg-[#F5F5F5]">
                                   <tr>
                                       <th className="border border-gray-300 py-3 w-32 font-normal">서비스명</th>
                                       <th className="border border-gray-300 py-3 font-normal">상품구성</th>
                                       <th className="border border-gray-300 py-3 w-28 font-normal">1개월</th>
                                       <th className="border border-gray-300 py-3 w-28 font-normal">3개월</th>
                                       <th className="border border-gray-300 py-3 w-28 font-normal">6개월</th>
                                       <th className="border border-gray-300 py-3 w-28 font-normal">1년</th>
                                        <th className="border border-gray-300 py-3 w-28 font-normal">2년</th>
                                         <th className="border border-gray-300 py-3 w-28 font-normal">3년</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   <tr>
                                       <td rowSpan={4} className="border border-gray-300 py-3 bg-white font-bold text-gray-700">뱅크다퀵</td>
                                       <td className="border border-gray-300 py-3 bg-white text-left pl-4">퀵 심화형 : 10계좌</td>
                                       <td className="border border-gray-300 py-3 bg-white">99,000원</td>
                                       <td className="border border-gray-300 py-3 bg-white">297,000원</td>
                                       <td className="border border-gray-300 py-3 bg-white">399,000원</td>
                                       <td className="border border-gray-300 py-3 bg-white">796,000원</td>
                                       <td className="border border-gray-300 py-3 bg-white">1,590,000원</td>
                                       <td className="border border-gray-300 py-3 bg-white">2,380,000원</td>
                                   </tr>
                                    <tr>
                                       <td className="border border-gray-300 py-3 bg-white text-left pl-4">퀵 전략형 : 5계좌</td>
                                       <td className="border border-gray-300 py-3 bg-white">49,500원</td>
                                       <td className="border border-gray-300 py-3 bg-white">148,500원</td>
                                        <td className="border border-gray-300 py-3 bg-white">249,000원</td>
                                       <td className="border border-gray-300 py-3 bg-white">399,000원</td>
                                       <td className="border border-gray-300 py-3 bg-white">796,000원</td>
                                        <td className="border border-gray-300 py-3 bg-white">1,190,000원</td>
                                   </tr>
                                   <tr>
                                       <td className="border border-gray-300 py-3 bg-white text-left pl-4">퀵 기본형 : 3계좌</td>
                                        <td className="border border-gray-300 py-3 bg-white">29,700원</td>
                                       <td className="border border-gray-300 py-3 bg-white">89,100원</td>
                                       <td className="border border-gray-300 py-3 bg-white">149,000원</td>
                                        <td className="border border-gray-300 py-3 bg-white">249,000원</td>
                                        <td className="border border-gray-300 py-3 bg-white">498,000원</td>
                                         <td className="border border-gray-300 py-3 bg-white">748,000원</td>
                                   </tr>
                                   <tr>
                                        <td className="border border-gray-300 py-3 bg-white text-left pl-4">퀵 슬림형 : 1계좌</td>
                                        <td className="border border-gray-300 py-3 bg-white">9,900원</td>
                                        <td className="border border-gray-300 py-3 bg-white">29,700원</td>
                                        <td className="border border-gray-300 py-3 bg-white">59,400원</td>
                                        <td className="border border-gray-300 py-3 bg-white">99,000원</td>
                                        <td className="border border-gray-300 py-3 bg-white">197,000원</td>
                                        <td className="border border-gray-300 py-3 bg-white">295,000원</td>
                                   </tr>
                                    <tr>
                                       <td rowSpan={4} className="border border-gray-300 py-3 bg-white font-bold text-gray-700">뱅크다</td>
                                        <td className="border border-gray-300 py-3 bg-white text-left pl-4">무제한</td>
                                        <td colSpan={3} rowSpan={3} className="border border-gray-300 py-3 bg-white text-gray-400">-</td>
                                         <td className="border border-gray-300 py-3 bg-white">154,000원</td>
                                          <td className="border border-gray-300 py-3 bg-white">308,000원</td>
                                           <td className="border border-gray-300 py-3 bg-white">462,000원</td>
                                   </tr>
                                    <tr>
                                        <td className="border border-gray-300 py-3 bg-white text-left pl-4">심화형 : 10계좌</td>
                                         <td className="border border-gray-300 py-3 bg-white">99,000원</td>
                                          <td className="border border-gray-300 py-3 bg-white">198,000원</td>
                                           <td className="border border-gray-300 py-3 bg-white">297,000원</td>
                                   </tr>
                                    <tr>
                                       <td className="border border-gray-300 py-3 bg-white text-left pl-4">전략형 : 5계좌</td>
                                        <td className="border border-gray-300 py-3 bg-white">77,000원</td>
                                         <td className="border border-gray-300 py-3 bg-white">154,000원</td>
                                          <td className="border border-gray-300 py-3 bg-white">231,000원</td>
                                    </tr>
                                     <tr>
                                        <td className="border border-gray-300 py-3 bg-white text-left pl-4">기본형 : 3계좌</td>
                                         <td className="border border-gray-300 py-3 bg-white">9,900원</td>
                                        <td className="border border-gray-300 py-3 bg-white">29,700원</td>
                                        <td className="border border-gray-300 py-3 bg-white">59,400원</td>
                                        <td colSpan={3} className="border border-gray-300 py-3 bg-white text-gray-400 -">-</td>
                                   </tr>
                               </tbody>
                           </table>
                       </div>
                       
                        {/* Manual Link */}
                       <div>
                           <h3 className="text-base font-bold text-gray-700 mb-2">매뉴얼</h3>
                           <a href="#" className="text-blue-500 hover:underline text-xs">뱅크다 매뉴얼 보기 →</a>
                       </div>

                       {/* FAQ */}
                       <div className="space-y-6">
                           <h3 className="text-base font-bold text-gray-700">자주 묻는 질문</h3>
                           
                           <div className="space-y-2">
                               <p className="flex items-start gap-2 text-sm font-bold text-gray-700">
                                   <span className="text-red-500 font-bold">Q</span> 수동조회는 어떻게 하나요?
                               </p>
                               <p className="text-xs text-gray-500 pl-5 leading-relaxed">
                                   실시간으로 바로 내역을 확인해야 할 경우에는 계좌정보 코너에서 등록된 은행명 우측의 UPDATE버튼을 눌러주면, 평균 1분내의 최신 내역이 갱신됩니다. 계좌거래내역 코너에서 갱신된 내역을 확인 할 수 있습니다.
                               </p>
                           </div>

                           <div className="space-y-2">
                               <p className="flex items-start gap-2 text-sm font-bold text-gray-700">
                                   <span className="text-red-500 font-bold">Q</span> 입금자명, 입금은행, 은행 모두 맞는데 자동처리가 안됩니다.
                               </p>
                               <p className="text-xs text-gray-500 pl-5 leading-relaxed">
                                   자동입금서비스는 서비스 신청 후 결제완료가 된 시점부터 해당 서비스가 실행됩니다. 서비스 이전에 발생된 주문 건은 서비스 비교 범위에 포함되지 않습니다.
                               </p>
                           </div>

                            <div className="space-y-2">
                               <p className="flex items-start gap-2 text-sm font-bold text-gray-700">
                                   <span className="text-red-500 font-bold">Q</span> 뱅크다를 뱅크다퀵으로 서비스 전환 할 수 있나요?
                               </p>
                               <p className="text-xs text-gray-500 pl-5 leading-relaxed">
                                   뱅크다' → '뱅크다퀵' 또는 '뱅크다퀵' → '뱅크다'서비스로 전환되지 않습니다. (서비스별 별도 이용)
                               </p>
                           </div>

                            <div className="space-y-2">
                               <p className="flex items-start gap-2 text-sm font-bold text-gray-700">
                                   <span className="text-red-500 font-bold">Q</span> 환불 규정은 어떻게 되나요?
                               </p>
                               <p className="text-xs text-gray-500 pl-5 leading-relaxed">
                                   무통장자동입금 서비스는 환불이 불가능한 서비스로, 도중 이용 중지를 하더라도 남은 기간에 해당하는 금액이 환불되지 않습니다. 환불 관련 추가 문의는 1:1문의 부탁 드립니다.
                               </p>
                           </div>
                       </div>
                       
                        <div className="border-t border-gray-200 my-8"></div>

                       {/* Notes */}
                       <div>
                           <h3 className="text-base font-bold text-gray-700 mb-4">유의사항</h3>
                           <div className="space-y-2 text-xs text-gray-500">
                               <p className="flex items-start gap-1">
                                   <span className="text-red-500 font-bold mt-0.5 ml-0 text-[10px]">●</span>
                                   <span>본 서비스는 보유하신 해당 계좌의 <span className="text-red-500">"빠른 조회 서비스"</span>가능해야 이용하실 수 있습니다.</span>
                                </p>
                                <p className="pl-3 text-[#999999]">- 빠른조회 서비스 신청은 해당 은행 영업점 또는 인터넷뱅킹을 통해 등록 가능합니다.</p>

                                <p className="flex items-start gap-1 mt-3">
                                   <span className="text-red-500 font-bold mt-0.5 ml-0 text-[10px]">●</span>
                                   <span>뱅크다 서비스의 수동업데이트 주기는 30분입니다. 보다 빠른 확인이 필요하면 뱅크다퀵을 이용하시기 바랍니다.</span>
                                </p>

                                <p className="flex items-start gap-1 mt-3">
                                   <span className="text-red-500 font-bold mt-0.5 ml-0 text-[10px]">●</span>
                                   <span>뱅크다와 뱅크다퀵은 계좌번호를 중복으로 사용할 수 없습니다.</span>
                                </p>

                                <p className="flex items-start gap-1 mt-3">
                                   <span className="text-red-500 font-bold mt-0.5 ml-0 text-[10px]">●</span>
                                   <span className="text-red-500">서비스 신규신청자에 뱅크다 5계좌+뱅크다퀵 3계좌 1개월 무료체험 또는 뱅크다퀵 15일 무료체험이 가능합니다.</span>
                                </p>
                                <p className="pl-3 text-red-500">뱅크다퀵 신청 이력이 없는 경우에는 PG 승인완료 시 뱅크다퀵 1개월 무료체험이 가능합니다.</p>
                                <p className="pl-3 text-[#999999]">사용기간 만료 시 서비스가 중단되며, 지속적인 서비스 이용을 원한다면 만료 이전에 서비스 신청하시기 바랍니다.</p>

                                <p className="flex items-start gap-1 mt-3">
                                   <span className="text-red-500 font-bold mt-0.5 ml-0 text-[10px]">●</span>
                                   <span>무료체험 중 서비스 변경 사항 발생 시 남은 기간과 상관없이 이용 종료되며, 무료체험 프로모션은 내부 사정에 의해 사전 안내 없이 조기 종료될 수 있습니다.</span>
                                </p>

                                <p className="flex items-start gap-1 mt-3">
                                   <span className="text-red-500 font-bold mt-0.5 ml-0 text-[10px]">●</span>
                                   <span>솔루션 이전 시, 서비스 잔여기간이 남아있을 경우 잔여기간에 대해 이전이 가능하지만, <span className="text-red-500">이전 후 쇼핑몰에서 무료체험 및 신규신청을 할 경우 서비스 이전이 불가</span>하니 이점 유의 부탁 드립니다.</span>
                                </p>

                                <p className="flex items-start gap-1 mt-3">
                                   <span className="text-red-500 font-bold mt-0.5 ml-0 text-[10px]">●</span>
                                   <span>서비스 종류 후 재신청 할 경우 15일 이내의 거래내역만을 수집합니다.</span>
                                </p>
                                <p className="pl-3 text-[#999999]">- 서비스 변경 등으로 계좌삭제 후 재등록 시 15일 이내 진행하실 것을 권장 드립니다.</p>
                           </div>
                       </div>
                       
                       <div className="flex justify-center pt-8">
                           <Button className="bg-black hover:bg-gray-800 text-white font-bold h-12 w-48 text-base">
                               뱅크다 신청
                           </Button>
                       </div>
                   </div>
               )}
                {activeTab === 'payaction' && (
                   <div className="p-10 text-center text-gray-500">
                       페이액션 서비스 안내 내용이 여기에 표시됩니다.
                   </div>
               )}
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

    </div>
  );
}
