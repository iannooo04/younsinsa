"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, Youtube, ChevronUp, Book } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function PCSecurityServerPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">PC쇼핑몰 보안서버 관리</h1>
                <div className="flex gap-2">
                    <Button variant="secondary" className="bg-gray-400 hover:bg-gray-500 text-white rounded-sm h-10 px-6 font-bold">
                        SSL 보안서버 신청
                    </Button>
                    <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-10 px-6 font-bold">
                        저장
                    </Button>
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">PC쇼핑몰 보안서버 관리</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                {/* Table */}
                <div className="border border-gray-300 border-t-2 border-t-gray-800 text-sm">
                    {/* Table Header */}
                    <div className="grid grid-cols-6 bg-gray-100 text-center font-bold text-gray-700 h-10 items-center border-b border-gray-300">
                        <div>도메인 정보</div>
                        <div>연결 상점</div>
                        <div>사용여부</div>
                        <div>서비스 상태</div>
                        <div>보안서버 만료일</div>
                        <div>상세설정</div>
                    </div>

                    {/* Empty State */}
                    <div className="flex items-center justify-center h-24 text-gray-500 bg-gray-50/50">
                        연결된 도메인이 없습니다.
                    </div>
                </div>

                {/* Alerts */}
                <div className="space-y-1 text-xs text-gray-500">
                     <div className="flex items-start gap-1">
                        <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px] mt-0.5 font-bold shrink-0">!</span>
                        <p>
                            기본 제공 도메인의 경우 보안서버 설치가 불가합니다. 보안서버 설정은 <span className="text-gray-900 font-bold">마이페이지 &gt; 도메인 연결</span>에서 연결한 도메인 별로 사용 설정이 가능합니다.
                        </p>
                    </div>
                    <div className="flex items-start gap-1">
                        <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px] mt-0.5 font-bold shrink-0">!</span>
                        <p>
                            보안서버 도메인에 대한 연결 상점 설정은 <span className="text-gray-900 font-bold">"기본설정 &gt; 해외상점 &gt; 해외 상점 설정"</span> 의 도메인 연결을 통해 설정하실 수 있습니다.
                        </p>
                    </div>
                    <div className="flex items-start gap-1 text-[#FF424D]">
                         <span className="bg-[#FF424D] text-white text-[10px] px-1 rounded-[2px] mt-0.5 font-bold shrink-0">!</span>
                        <p>
                            <span className="font-bold">자동입금확인 서비스를 이용하는 경우, 보안서버 적용 후 서비스정보에서 '결과수신 URL'을 '사용중인 대표 보안서버 도메인/outconn/bank_sock.php'으로 변경해주셔야 정상적인 서비스 이용이 가능합니다.</span> <Link href="#" className="text-gray-500 underline">바로가기 &gt;</Link>
                        </p>
                    </div>
                    <div className="flex items-start gap-1">
                        <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px] mt-0.5 font-bold shrink-0">!</span>
                        <p>
                            PC쇼핑몰과 모바일쇼핑몰 보안서버는 별도로 적용하셔야 합니다. 모바일쇼핑몰 보안서버 관리 <Link href="#" className="font-bold underline">바로가기 &gt;</Link>
                        </p>
                    </div>
                    <div className="flex items-start gap-1">
                        <span className="bg-gray-600 text-white text-[10px] px-1 rounded-[2px] mt-0.5 font-bold shrink-0">!</span>
                        <div>
                            <p>보안서버 사용 시 외부 서비스에 저장된 도메인 정보를 https:// 로 변경해야 하며, 수정하지 않을 경우 오류가 발생할 수 있습니다.</p>
                            <p>ex) PG사의 관리자 페이지 內 가상 계좌 입금 통보 URL 정보, 간편 로그인 인증업체의 개발자 센터 內 callback URL 등</p>
                        </div>
                    </div>
                </div>
            </div>

             {/* Bottom Info */}
             <div className="pt-8 border-t border-gray-300 space-y-6">
                <div className="flex items-center gap-2">
                    <span className="text-blue-500"><Book size={16} /></span>
                    <h3 className="font-bold text-blue-500">안내</h3>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-bold text-gray-700">보안서버(SSL) 구축 의무 강화 안내</h4>
                    <div className="text-xs text-gray-500 space-y-1 pl-2">
                        <p>· 정보통신망법에 따라 보안서버(SSL) 구축 의무사항 위반 시 민원이 발생할 경우 사전경고없이 최고 3,000만원의 과태료가 부과됩니다.</p>
                        <p className="pl-2">(적용대상 : 온라인 쇼핑몰 및 회원가입/로그인/주문/결제/게시판 등의 이용과정에서 이름, 주민등록번호, 연락처 등을 취급하는 웹사이트)</p>
                        <p>· 운영하는 사이트의 개인정보 취급 여부를 반드시 확인하시고, 의무사항 적용 대상에 해당하는 사이트는 보안서버 사용을 필수로 설정하여 주세요.</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <h4 className="text-sm font-bold text-[#FF424D]">보안서버(SSL) 서비스 기간 만료 안내</h4>
                    <div className="text-xs text-gray-500 space-y-1 pl-2">
                        <p>· 보안서버 신청 후 실제 세팅 완료까지 업무일 기준 1~3일까지 소요될 수 있으므로, <span className="font-bold">만료일 최소 3일전에 연장 신청</span>해주시기 바랍니다.</p>
                        <p>· 다만, 보안서버 만료로 쇼핑몰 접속이 불가해지는 상황을 예방하기 위해 <span className="font-bold text-[#FF424D]">보안서버 만료 시간 기준 최대 48시간 이내에 보안서버 적용이 자동으로 해지 될 수 있습니다.</span></p>
                        <p className="pl-2">이는 보다 안전한 쇼핑몰 운영을 위한 것이므로 양해 부탁드립니다.</p>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1 pl-2 mt-4">
                        <p>· 보안서버 연장 시 보안 인증서는 신규로 발급되며, <span className="font-bold text-[#FF424D]">만료일은 신규 발급일을 기준으로 책정됩니다.</span></p>
                        <p>· 보안서버가 연장되지 않아 발생할 수 있는 불이익에 대해서는 [엔에이치엔커머스(주)]에서는 책임을 지지 않습니다.</p>
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
