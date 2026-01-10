"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Youtube, ChevronUp } from "lucide-react";

export default function AutoDepositApplyPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">자동입금확인 서비스 신청</h1>
      </div>

      <div className="space-y-6">
          <div>
              <p className="text-gray-700 leading-relaxed text-xs">
                  자동입금확인 서비스는 (주)뱅크다에서 제공하는 서비스이며, 서비스 가입은 (주)뱅크다 회원으로 가입됨을 알려드립니다.<br/>
                  편리한 자동입금확인은 자동입금확인 및 계좌통합관리로 여러분의 업무를 충실히 도와드릴 서비스가 되어 드릴것을 약속드립니다.
              </p>
          </div>

          {/* Pricing Table */}
          <div>
              <div className="flex justify-between items-center mb-2">
                 <h3 className="font-bold text-gray-700 flex items-center gap-1 text-xs">
                      <span className="bg-blue-500 text-white w-3 h-3 flex items-center justify-center rounded-[2px] text-[8px] font-bold mt-0.5">▶</span>
                      이용요금안내
                 </h3>
                 <span className="text-gray-500 text-[11px]">(VAT포함)</span>
              </div>
              
              <table className="w-full text-center border-collapse border border-gray-300 text-xs text-gray-600">
                  <thead className="bg-[#F5F5F5]">
                      <tr>
                          <th className="border border-gray-300 py-3 w-32 font-bold" rowSpan={2}>서비스명</th>
                          <th className="border border-gray-300 py-3 font-bold" rowSpan={2}>상품구성</th>
                          <th className="border border-gray-300 py-2 font-bold" colSpan={5}>기간</th>
                      </tr>
                       <tr>
                          <th className="border border-gray-300 py-2 w-28 font-bold">1개월</th>
                          <th className="border border-gray-300 py-2 w-28 font-bold">3개월</th>
                          <th className="border border-gray-300 py-2 w-28 font-bold">6개월</th>
                          <th className="border border-gray-300 py-2 w-28 font-bold">1년</th>
                           <th className="border border-gray-300 py-2 w-28 font-bold">2년</th>
                            <th className="border border-gray-300 py-2 w-28 font-bold">3년</th>
                      </tr>
                  </thead>
                  <tbody>
                       <tr>
                          <td rowSpan={4} className="border border-gray-300 py-3 bg-white font-bold">뱅크다</td>
                          <td className="border border-gray-300 py-3 bg-white font-bold">기본형 : 3계좌</td>
                           <td className="border border-gray-300 py-3 bg-white">9,900</td>
                          <td className="border border-gray-300 py-3 bg-white">29,700</td>
                          <td className="border border-gray-300 py-3 bg-white">59,400</td>
                          <td colSpan={3} className="border border-gray-300 py-3 bg-white"></td>
                      </tr>
                       <tr>
                          <td className="border border-gray-300 py-3 bg-white font-bold">전략형 : 5계좌</td>
                           <td colSpan={3} rowSpan={3} className="border border-gray-300 py-3 bg-white"></td>
                           <td className="border border-gray-300 py-3 bg-white">77,000</td>
                          <td className="border border-gray-300 py-3 bg-white">154,000</td>
                           <td className="border border-gray-300 py-3 bg-white">231,000</td>
                      </tr>
                       <tr>
                          <td className="border border-gray-300 py-3 bg-white font-bold">심화형 : 10계좌</td>
                           <td className="border border-gray-300 py-3 bg-white">99,000</td>
                          <td className="border border-gray-300 py-3 bg-white">198,000</td>
                           <td className="border border-gray-300 py-3 bg-white">297,000</td>
                      </tr>
                       <tr>
                          <td className="border border-gray-300 py-3 bg-white font-bold">무제한</td>
                           <td className="border border-gray-300 py-3 bg-white">154,000</td>
                          <td className="border border-gray-300 py-3 bg-white">308,000</td>
                           <td className="border border-gray-300 py-3 bg-white">462,000</td>
                      </tr>
                       <tr>
                          <td rowSpan={4} className="border border-gray-300 py-3 bg-white font-bold">뱅크다퀵</td>
                          <td className="border border-gray-300 py-3 bg-white font-bold">퀵슬림형 : 1계좌</td>
                           <td className="border border-gray-300 py-3 bg-white">9,900</td>
                          <td className="border border-gray-300 py-3 bg-white">29,700</td>
                          <td className="border border-gray-300 py-3 bg-white">59,400</td>
                          <td className="border border-gray-300 py-3 bg-white">99,000</td>
                           <td className="border border-gray-300 py-3 bg-white">197,000</td>
                            <td className="border border-gray-300 py-3 bg-white">295,000</td>
                      </tr>
                       <tr>
                          <td className="border border-gray-300 py-3 bg-white font-bold">퀵기본형 : 3계좌</td>
                           <td className="border border-gray-300 py-3 bg-white">29,700</td>
                          <td className="border border-gray-300 py-3 bg-white">89,100</td>
                          <td className="border border-gray-300 py-3 bg-white">149,000</td>
                          <td className="border border-gray-300 py-3 bg-white">249,000</td>
                           <td className="border border-gray-300 py-3 bg-white">498,000</td>
                            <td className="border border-gray-300 py-3 bg-white">748,000</td>
                      </tr>
                       <tr>
                          <td className="border border-gray-300 py-3 bg-white font-bold">퀵전략형 : 5계좌</td>
                           <td className="border border-gray-300 py-3 bg-white">49,500</td>
                          <td className="border border-gray-300 py-3 bg-white">148,500</td>
                          <td className="border border-gray-300 py-3 bg-white">249,000</td>
                          <td className="border border-gray-300 py-3 bg-white">399,000</td>
                           <td className="border border-gray-300 py-3 bg-white">796,000</td>
                            <td className="border border-gray-300 py-3 bg-white">1,190,000</td>
                      </tr>
                       <tr>
                          <td className="border border-gray-300 py-3 bg-white font-bold">퀵심화형 : 10계좌</td>
                           <td className="border border-gray-300 py-3 bg-white">99,000</td>
                          <td className="border border-gray-300 py-3 bg-white">297,000</td>
                          <td className="border border-gray-300 py-3 bg-white">399,000</td>
                          <td className="border border-gray-300 py-3 bg-white">796,000</td>
                           <td className="border border-gray-300 py-3 bg-white">1,590,000</td>
                            <td className="border border-gray-300 py-3 bg-white">2,380,000</td>
                      </tr>
                  </tbody>
              </table>
          </div>

          {/* Guidelines */}
          <div className="text-xs text-gray-700">
              <h3 className="font-bold mb-1 flex items-center gap-1">
                  <span className="text-[10px]">▶</span> 이용 유의사항
              </h3>
              <ol className="list-decimal pl-4 space-y-1">
                  <li>보유하고 계신 해당 은행계좌의 "인터넷 뱅킹" 이용이 가능하셔야 합니다.<br/>
                      <span className="text-gray-500 text-[11px]">(해당 은행 영업점에서 "인터넷 뱅킹"을 신청하시기 바랍니다.</span>
                  </li>
                  <li>보유하고 계신 해당 은행계좌의 "빠른(스피드) 조회서비스" 이용이 가능하셔야 합니다.<br/>
                      <span className="text-gray-500 text-[11px]">(해당 은행 영업점 또는 인터넷뱅킹을 통해 "빠른(스피드) 조회서비스" 이용을 등록하시기 바랍니다.</span>
                  </li>
                  <li>
                       <span className="text-red-500 font-bold">뱅크다 고객지원센터 : 02:3663-3247</span>
                  </li>
              </ol>
          </div>

          <div className="flex justify-center my-10">
              <div className="border border-gray-400 p-4 px-10 flex flex-col items-center">
                   <h2 className="text-2xl font-bold flex items-center gap-2 mb-1">
                       <span className="text-[#FF9D00] text-3xl">●</span>
                       <span className="text-[#333399]">자동입금확인</span>
                       <span className="text-gray-400 font-normal">서비스신청</span>
                   </h2>
                   <p className="text-[10px] text-gray-400 tracking-widest self-end">SERVICE APPLY</p>
              </div>
          </div>
          
           {/* Info Sections */}
          <div className="space-y-10">
              <div>
                  <div className="bg-black text-white p-2 px-3 mb-3">
                      <h3 className="font-bold text-xs">자동입금확인 서비스란?</h3>
                  </div>
                  <div className="text-gray-700 text-xs leading-relaxed mb-6">
                      <p>쇼핑몰 운영시 주문고객님들이 여러개의 은행계좌로 상품금액을 입금할때 입금자명과 주문내역을 하나하나 대조하여 확인하는 번거로움을</p>
                      <p>해소하기 위한 서비스로 쇼핑몰에 관련된 은행계좌들의 입금내역과 쇼핑몰의 주문내역을 <span className="font-bold">자동으로 비교(Matching)</span>하여</p>
                      <p>입금이 완료된 주문내역을 자동으로 입금확인처리하는 서비스입니다.</p>
                  </div>
                  <div className="flex justify-center border border-gray-200 py-10">
                        {/* Diagram Placeholder - Recreated with text/css for layout */}
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
                             <div className="flex flex-col items-center gap-2">
                                 <span>고객입금</span>
                                 <div className="w-16 h-12 bg-white border border-gray-300 flex items-center justify-center text-[10px] shadow-sm relative">
                                     <div className="absolute top-[-10px] text-gray-400 text-[8px]">BANK</div>
                                     BANK
                                 </div>
                                 <span className="text-blue-500">주문고객</span>
                             </div>
                             <div className="h-[1px] w-10 bg-gray-300"></div>
                             <div className="flex flex-col items-center gap-2">
                                  <span>입금내역</span>
                                  <div className="w-12 h-16 bg-gray-100 border border-gray-300 shadow-sm"></div>
                                  <span className="text-blue-500">거래은행</span>
                             </div>
                             <div className="h-[1px] w-10 bg-gray-300 relative">
                                 <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-gray-400">입금/주문내역 비교</div>
                                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 text-lg">↔</div>
                             </div>
                             <div className="flex flex-col items-center gap-2">
                                  <div className="w-12 h-16 bg-gray-100 border border-gray-300 shadow-sm"></div>
                                  <span className="text-blue-500">통장입금확인 SYSTEM</span>
                             </div>
                              <div className="h-[1px] w-10 bg-orange-400"></div>
                             <div className="flex flex-col items-center gap-2">
                                  <div className="w-12 h-16 bg-gray-100 border border-gray-300 shadow-sm"></div>
                                  <span className="text-blue-500">쇼핑몰</span>
                             </div>
                              <div className="ml-4 border border-gray-200 p-2 bg-white">
                                  <div className="text-center font-bold mb-2">주문내역 자동입금확인</div>
                                  <table className="w-48 text-center text-[10px] border-collapse">
                                      <thead>
                                          <tr className="bg-gray-100 border-b border-gray-200">
                                              <th className="py-1">입금은행</th>
                                              <th className="py-1">처리여부</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr>
                                              <td className="py-1">국민은행</td>
                                              <td className="text-red-500 py-1">입금완료</td>
                                          </tr>
                                      </tbody>
                                  </table>
                                   <div className="text-center text-blue-500 mt-2 text-[10px]">쇼핑몰 관리자 입금체크</div>
                              </div>
                        </div>
                  </div>
              </div>

               <div>
                  <div className="bg-black text-white p-2 px-3 mb-3">
                      <h3 className="font-bold text-xs">계좌통합관리 서비스란?</h3>
                  </div>
                   <div className="text-gray-700 text-xs leading-relaxed mb-6">
                      <p>계좌통합관리 서비스는 고도몰 쇼핑몰 이용 고객분들이시면 누구나 쉽게 계좌정보만을 입력하여 <span className="font-bold">거래은행계좌들의 입출금내역을 통합적으로 조회관리</span>할 수 있는 서</p>
                      <p>비스입니다. 계좌정보와 거래내역은 방어벽이 구축되어있는 서버에서 관리되므로 기존의 계좌통합관리 서비스들보다 빠르고 안정적인 서비스를 제공 받으실 수 있습</p>
                      <p>니다.</p>
                  </div>
                   <div className="flex justify-center border border-gray-200 py-10">
                       <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
                             <div className="flex flex-col items-center gap-2">
                                  <div className="w-12 h-16 bg-white border border-gray-300 flex flex-col items-center justify-center text-[10px] shadow-sm relative">
                                     <div className="text-[8px] text-blue-500 font-bold">BANK</div>
                                 </div>
                                 <span className="text-blue-500">거래은행</span>
                             </div>
                              <div className="h-[1px] w-10 bg-gray-300 relative">
                                  <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-orange-500">입출금내역</div>
                              </div>
                             <div className="flex flex-col items-center gap-2">
                                  <div className="w-12 h-16 bg-gray-100 border border-gray-300 shadow-sm"></div>
                                  <span className="text-blue-500">계좌통합관리 SYSTEM</span>
                             </div>
                             <div className="h-[1px] w-10 bg-orange-400 relative">
                                 <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-blue-800">입출금내역 통합정리</div>
                             </div>
                              <div className="ml-4">
                                  <div className="border border-gray-300 w-64 h-32 bg-white p-1 text-[8px]">
                                      <div className="flex justify-between border-b border-gray-200 pb-1 mb-1">
                                          <span>▼ 계좌거래내역</span>
                                           <div className="flex gap-2 text-gray-400">
                                               <span>▼ 검색/인쇄</span>
                                                <span>▼ 계좌정보</span>
                                           </div>
                                      </div>
                                      <table className="w-full text-center border-collapse">
                                            <thead className="bg-[#222A3E] text-white">
                                                <tr>
                                                    <th>일자</th>
                                                    <th>은행명</th>
                                                    <th>내역</th>
                                                    <th>입금액</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-gray-100">
                                                    <td>2020/06/22</td>
                                                    <td>부산은행</td>
                                                    <td>서강희(예치금)</td>
                                                    <td className="text-blue-500 text-right pr-1">330,000</td>
                                                </tr>
                                                 <tr className="border-b border-gray-100">
                                                    <td>2020/06/22</td>
                                                    <td>부산은행</td>
                                                    <td>서강희(예치금)</td>
                                                    <td className="text-blue-500 text-right pr-1">300,000</td>
                                                </tr>
                                                 <tr className="border-b border-gray-100">
                                                    <td>2020/06/22</td>
                                                    <td>부산은행</td>
                                                    <td>원혜정(예치금)</td>
                                                    <td className="text-blue-500 text-right pr-1">325,500</td>
                                                </tr>
                                            </tbody>
                                      </table>
                                  </div>
                                  <div className="text-center text-blue-500 mt-2 text-[10px]">쇼핑몰 관리자 계좌통합관리</div>
                              </div>
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

    </div>
  );
}
