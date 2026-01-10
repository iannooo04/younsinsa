"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Plus, Minus, Youtube, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";

export default function OperationSecuritySettingsPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">운영 보안 설정</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium">
                    저장
                </Button>
            </div>

            {/* Info Box */}
            <div className="border border-gray-300 p-6 bg-white">
                <h2 className="text-lg font-bold text-gray-800 mb-2">관리자 운영 보안이란?</h2>
                <div className="text-xs text-gray-600 leading-relaxed space-y-1">
                    <p>정보통신망을 통해 외부에서 개인정보처리시스템(쇼핑몰 등)에 접속 시 단순히 아이디와 비밀번호만을 이용할 경우, 해킹에 의해 접속정보가 유출되어 쇼핑몰이 쉽게 위험에 노출되게 됩니다.</p>
                    <p>이러한 위험성을 감소시키기 위해 아이디/비밀번호를 이용하는 인증과 별도로 휴대폰, 일회용비밀번호(OTP), IP인증 등을 활용한 추가적인 안전한 인증수단을 적용하여야 합니다.</p>
                    <p>해당 법령을 준수하지 않을 경우 개인정보 보호법 제 75조에 따라 5천만원 이하의 과태료에 처할 수 있습니다.</p>
                    <p>개인정보 보호법 및 개인정보 보호법 시행령 등 관련 법률 내용을 필독하시고 <span className="text-red-500 font-medium">“관리자 보안로그인”</span> 또는 <span className="text-red-500 font-medium">“관리자 IP 접속제한”</span> 을 설정하시기를 권장합니다. <a href="#" className="text-blue-500 underline">내용 확인 &gt;</a></p>
                </div>
            </div>

            {/* Section 1: Admin Security Authentication Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">관리자 보안인증 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">인증수단</div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="auth-sms" className="rounded-sm border-gray-300" />
                                    <Label htmlFor="auth-sms" className="font-normal">SMS인증</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="auth-email" className="rounded-sm border-gray-300" />
                                    <Label htmlFor="auth-email" className="font-normal">이메일인증</Label>
                                </div>
                            </div>
                            <div className="text-xs space-y-1">
                                <p className="text-red-500 font-medium">! 최고운영자 정보에 인증정보(SMS, 이메일)가 없습니다. 인증정보를 먼저 등록해주세요. <a href="#" className="underline text-blue-500">최고운영자 정보 수정하기 &gt;</a></p>
                                <p className="text-red-500">최고운영자의 인증정보가 등록되지 않으면 보안로그인/화면보안접속 설정과 관계없이 보안인증화면이 노출되지 않습니다</p>
                                <p className="text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 로그인한 운영자 정보에 인증정보(SMS, 이메일)가 없는 경우, 보안인증화면이 노출되지 않습니다.</p>
                                <p className="text-gray-500 ml-5">관리자 보안인증 설정을 사용 시, 운영자 정보에 인증정보를 등록해주세요. <a href="#" className="underline text-blue-500">운영자 정보 수정하기 &gt;</a></p>
                                <p className="text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 인증번호 SMS는 잔여포인트가 있어야 발송됩니다. (잔여포인트 : 0.0) <a href="#" className="underline text-blue-500">SMS포인트 충전하기 &gt;</a></p>
                                <p className="text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> SMS잔여포인트가 없는 경우 자동으로 이메일이 인증수단으로 노출되며, 포인트 충전 이후 설정한 인증수단으로 노출됩니다.</p>
                                <p className="text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 이메일인증은 주문처리 및 프로모션 등으로 인해 이메일이 대량으로 발송될 경우 인증번호 전송이 지연될 수 있으므로 SMS인증을 사용하시길 권장합니다.</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">보안로그인</div>
                        <div className="p-4 flex items-center gap-6">
                            <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="login-used" />
                                    <Label htmlFor="login-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="login-unused" />
                                    <Label htmlFor="login-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">화면보안접속</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="screen-used" />
                                    <Label htmlFor="screen-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="screen-unused" />
                                    <Label htmlFor="screen-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p>화면보안접속 사용 시 보안접속 인증화면이 노출되는 화면</p>
                                <p>- 기본설정&gt;관리정책&gt;운영자관리/운영자등록</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> - 기본설정&gt;관리정책&gt;운영보안설정</p>
                                <p className="ml-5">- 기본설정&gt;결제정책&gt;무통장입금은행관리</p>
                                <p className="ml-5">- 회원&gt;SMS관리&gt;개별/전체 SMS 발송</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Admin Login Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">관리자 로그인 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">관리자 자동 로그아웃</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="default" className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="default" id="logout-default" />
                                    <Label htmlFor="logout-default" className="font-normal cursor-pointer">기본설정</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="custom" id="logout-custom" />
                                    <Label htmlFor="logout-custom" className="font-normal cursor-pointer flex items-center gap-1">
                                        로그인 후 
                                        <select className="h-6 border border-gray-300 rounded-sm text-xs mx-1 w-16">
                                            <option>120</option>
                                        </select>
                                        분간 클릭이 없으면 자동 로그아웃
                                    </Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-red-500 mt-1 flex items-start gap-1"><span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 기본설정 시 모든 브라우저를 닫거나 수동으로 로그아웃을 한 경우 로그아웃 됩니다. 또한, 보안상의 이유로 일정 시간이 경과 되면 자동으로 로그아웃 됩니다.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">장기 미로그인 기간</div>
                        <div className="p-4 flex items-center gap-6">
                            <RadioGroup defaultValue="1year" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="3months" id="term-3m" />
                                    <Label htmlFor="term-3m" className="font-normal cursor-pointer">3개월</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="6months" id="term-6m" />
                                    <Label htmlFor="term-6m" className="font-normal cursor-pointer">6개월</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="1year" id="term-1y" />
                                    <Label htmlFor="term-1y" className="font-normal cursor-pointer">1년</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="2years" id="term-2y" />
                                    <Label htmlFor="term-2y" className="font-normal cursor-pointer">2년</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">장기 미로그인 운영자<br/>안내 사용여부</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="noti-used" />
                                    <Label htmlFor="noti-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="noti-unused" />
                                    <Label htmlFor="noti-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 사용함 설정 시, 장기 미로그인 운영자 안내 팝업이 노출됩니다.</p>
                                <p className="ml-5">사용을 원하지 않는 경우 사용안함으로 설정해주시면 됩니다.</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 장기 미로그인 운영자 수에 최고운영자/대표운영자도 포함되며, 최고운영자는 삭제 및 로그인 제한 처리가 불가 합니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: IP Access Restriction Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">IP 접속제한 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">관리자 IP 접속제한</div>
                        <div className="p-4 flex items-center gap-6">
                            <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="admin-ip-used" />
                                    <Label htmlFor="admin-ip-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="admin-ip-unused" />
                                    <Label htmlFor="admin-ip-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">쇼핑몰 IP 접속제한</div>
                        <div className="p-4 flex items-center gap-6">
                            <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="shop-ip-used" />
                                    <Label htmlFor="shop-ip-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="shop-ip-unused" />
                                    <Label htmlFor="shop-ip-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">국가별<br/>접속제한 설정 <HelpCircle size={12} className="inline text-gray-400" /></div>
                        <div className="p-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <div className="text-xs text-gray-600 mb-1">허용국가</div>
                                    <div className="border border-gray-300 h-48 overflow-y-auto p-1 bg-white">
                                        <ul className="text-xs space-y-1">
                                            {["가나 (Ghana)", "가봉 (Gabon)", "가이아나(Guyana)", "감비아 (Gambia)", "건지 섬(Guernsey)", "과들루프(Guadeloupe)", "과테말라(Guatemala)", "그레나다(Grenada)"].map((country, i) => (
                                                <li key={i} className="p-1 hover:bg-gray-100 cursor-pointer">{country}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                        <span className="bg-gray-700 text-white w-3 h-3 flex items-center justify-center text-[10px] rounded-sm">!</span> Shift 버튼을 누른 상태에서 선택하면 여러 항목을 동시에 선택할 수 있습니다.
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center gap-2 h-48 pt-6">
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                        <Plus size={16} />
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                        <Minus size={16} />
                                    </Button>
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-gray-600 mb-1">차단국가</div>
                                    <div className="border border-gray-300 h-48 bg-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">관리자 IP 접근시도 예<br/>외 등록 <HelpCircle size={12} className="inline text-gray-400" /></div>
                        <div className="p-4 space-y-2">
                             <Button variant="outline" size="sm" className="h-8 text-xs border-gray-300">
                                <Plus size={14} className="mr-1" /> 추가
                            </Button>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 특정 IP에 대한 로그인 접속시도 제한을 해지합니다.</p>
                                <p className="ml-5">외부연동 서비스를 사용할 때 설정하시면 로그인시도로 인한 로그인차단을 해지할 수 있으나, 보안상 해당 설정을 권장하지 않습니다.</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 관리자 IP 접속제한에 대한 예외 처리가 아닌, 접근시도에 대한 예외처리입니다.</p>
                            </div>
                            <div className="text-xs text-red-500 space-y-1 pt-2">
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 공인 IP에 대해서만 작동하며, 사설 IP 등록 시 작동하지 않습니다.</p>
                                <p className="ml-5">(사설 IP 대역 : 10.0.0.0 ~ 10.255.255.255, 172.16.0.0 ~ 172.31.255.255, 192.168.0.0 ~ 192.168.255.255)</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 유동적으로 변경되는 IP 등록 시 접속이 제한되실 수 있으니 주의바랍니다.</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> IP접속제한 설정 시 잘못된 IP 등록으로 사이트 접속 및 운영에 문제가 생길 수 있으므로 주의 바랍니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Shopping Mall Security Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">쇼핑몰 보안 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">xframe 옵션 설정</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="used" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="xframe-used" />
                                    <Label htmlFor="xframe-used" className="font-normal cursor-pointer flex items-center gap-1">사용함 <span className="text-red-500">(권고)</span></Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="xframe-unused" />
                                    <Label htmlFor="xframe-unused" className="font-normal cursor-pointer flex items-center gap-1">사용안함 <span className="text-red-500">(DDoS 및 Clickjacking 등 웹보안 취약)</span></Label>
                                </div>
                            </RadioGroup>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> DDoS 및 Clickjacking 등 웹보안을 지키기 위한 권고사항으로 xframe 옵션을 사용하시기 바랍니다.</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 옵션 설정 사용 시 같은 도메인을 사용할 경우에만 정상 동작되며, 다른 도메인은 사용할 경우 동작되지 않습니다.</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 옵션을 설정하지 않을 경우 모든 도메인에 정상 동작 하지만 웹보안 취약점이 발생될 수 있습니다.</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">회원 비밀번호 변경 추<br/>가 검증 설정</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="used" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="pwd-verify-used" />
                                    <Label htmlFor="pwd-verify-used" className="font-normal cursor-pointer flex items-center gap-1">사용함 <span className="text-red-500">(권고)</span></Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="pwd-verify-unused" />
                                    <Label htmlFor="pwd-verify-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 회원 비밀번호 변경 시, 세션 정보 탈취를 통해 다른 회원의 비밀번호를 변경할 수 없도록 검증 절차를 추가 합니다.</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 추가 되는 검증 절차는 내부 시스템으로만 진행되며, 쇼핑몰 회원이 별도로 진행하는 단계는 추가되지 않습니다.</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 쇼핑몰의 보안강화를 위해 사용하는 것을 권장 드리며, 사용하지 않을 경우 보안에 취약할 수 있습니다.</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 해당 설정은 반드시 <span className="text-red-500">PC와 모바일 쇼핑몰 모두 스킨패치 적용 후 변경</span>하여 주시기 바랍니다. <a href="#" className="font-bold">바로가기 &gt;</a></p>
                            </div>
                        </div>
                    </div>
                     <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">휴대폰 본인인증정보<br/>보안 설정</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="used" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="phone-auth-used" />
                                    <Label htmlFor="phone-auth-used" className="font-normal cursor-pointer flex items-center gap-1">사용함 <span className="text-red-500">(권고)</span></Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="phone-auth-unused" />
                                    <Label htmlFor="phone-auth-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 휴대폰 본인인증 시, 인증 된 정보를 변경하여 가입할 수 없도록 보안 로직을 실행합니다.</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 쇼핑몰의 보안강화를 위해 사용하는 것을 권장 드리며, 사용하지 않을 경우 보안에 취약할 수 있습니다.</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 해당 설정은 반드시 <span className="text-red-500">PC와 모바일 쇼핑몰 모두 스킨패치 적용 후 변경</span>하여 주시기 바랍니다. <a href="#" className="font-bold">바로가기 &gt;</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             {/* Section 5: Mall Screen Security Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">쇼핑몰 화면 보안 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t border-gray-400">
                     <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">마우스 드래그 차단</div>
                        <div className="p-4 space-y-2">
                             <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="drag-block-used" />
                                    <Label htmlFor="drag-block-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="drag-block-unused" />
                                    <Label htmlFor="drag-block-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> "사용함" 선택 시 마우스로 드래그하여 텍스트 내용을 선택할 수 없습니다.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">오른쪽 마우스 차단</div>
                        <div className="p-4 space-y-2">
                             <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="rightclick-block-used" />
                                    <Label htmlFor="rightclick-block-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="rightclick-block-unused" />
                                    <Label htmlFor="rightclick-block-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> "사용함" 선택 시 마우스 오른쪽 버튼을 클릭할 수 없습니다.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">관리자 차단해제</div>
                        <div className="p-4 space-y-2">
                             <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="admin-unblock-used" />
                                    <Label htmlFor="admin-unblock-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="admin-unblock-unused" />
                                    <Label htmlFor="admin-unblock-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> "사용함" 선택 시 관리자로 접속하면 ‘마우스 드래그 차단’과 ‘오른쪽 마우스 차단’을 해제합니다.</p>
                        </div>
                    </div>
                </div>
                <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <span className="bg-gray-700 text-white w-3 h-3 flex items-center justify-center text-[10px] rounded-sm">!</span> 인터넷 익스플로러(IE) 외 기타 브라우저에서는 지원되지 않을 수 있습니다.
                </div>
            </div>

            {/* Section 6: Download Security Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">다운로드 보안 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">사용여부</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="used" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="download-sec-used" />
                                    <Label htmlFor="download-sec-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="download-sec-unused" />
                                    <Label htmlFor="download-sec-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-700 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 정보통신망법 개인정보 보호조치에 따라 개인정보의 안전성 확보를 위한 다운로드 보안 설정을 '사용'하시길 권장합니다.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">보안범위 설정</div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center">
                                <div className="w-24 text-xs font-medium text-gray-700">본사</div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="scope-hq-order" className="rounded-sm border-gray-300" />
                                        <Label htmlFor="scope-hq-order" className="font-normal text-xs">주문/배송</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="scope-hq-member" className="rounded-sm border-gray-300" defaultChecked />
                                        <Label htmlFor="scope-hq-member" className="font-normal text-xs">회원</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="scope-hq-board" className="rounded-sm border-gray-300" />
                                        <Label htmlFor="scope-hq-board" className="font-normal text-xs">게시판</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="scope-hq-supplier" className="rounded-sm border-gray-300" />
                                        <Label htmlFor="scope-hq-supplier" className="font-normal text-xs">공급사</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="scope-hq-crema" className="rounded-sm border-gray-300" />
                                        <Label htmlFor="scope-hq-crema" className="font-normal text-xs">크리마 간편리뷰</Label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center border-t border-gray-100 pt-4">
                                <div className="w-24 text-xs font-medium text-gray-700">공급사</div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="scope-supplier-order" className="rounded-sm border-gray-300" />
                                        <Label htmlFor="scope-supplier-order" className="font-normal text-xs">주문/배송</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="scope-supplier-board" className="rounded-sm border-gray-300" />
                                        <Label htmlFor="scope-supplier-board" className="font-normal text-xs">게시글</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="scope-supplier-settle" className="rounded-sm border-gray-300" />
                                        <Label htmlFor="scope-supplier-settle" className="font-normal text-xs">정산</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">관리자 인증수단</div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="dl-auth-sms" className="rounded-sm border-gray-300" defaultChecked/>
                                    <Label htmlFor="dl-auth-sms" className="font-normal">SMS인증</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="dl-auth-email" className="rounded-sm border-gray-300" />
                                    <Label htmlFor="dl-auth-email" className="font-normal">이메일인증</Label>
                                </div>
                                 <div className="flex items-center gap-2">
                                    <Checkbox id="dl-auth-ip" className="rounded-sm border-gray-300" />
                                    <Label htmlFor="dl-auth-ip" className="font-normal">IP인증</Label>
                                </div>
                            </div>
                             <div className="text-xs space-y-1">
                                <p className="text-red-500 font-medium flex items-start gap-1"><span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 최고운영자 정보에 SMS인증정보(휴대폰번호)가 없습니다. 인증정보를 먼저 등록해주세요. <a href="#" className="underline text-blue-500">최고운영자 정보 수정하기 &gt;</a></p>
                                <p className="text-red-500 ml-5">운영자 휴대폰 번호 인증은 최고운영자의 휴대폰번호가 등록된 경우에만 사용 가능합니다.</p>
                                <p className="text-red-500 font-medium flex items-start gap-1"><span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 최고운영자 정보에 이메일 인증정보가 없습니다. 인증정보를 먼저 등록해주세요. <a href="#" className="underline text-blue-500">최고운영자 정보 수정하기 &gt;</a></p>
                                <p className="text-red-500 ml-5">이메일인증은 최고운영자의 이메일 정보가 등록된 경우에만 사용 가능합니다.</p>
                                <p className="text-gray-500 mt-2 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-700 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 이메일인증은 주문처리 및 프로모션 등으로 인해 이메일이 대량으로 발송될 경우 인증번호 전송이 지연될 수 있으므로 SMS인증을 사용하시길 권장합니다.</p>
                            </div>
                        </div>
                    </div>
                     <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">SMS인증 설정</div>
                        <div className="p-4 space-y-2">
                            <p className="font-bold text-gray-800">운영자 정보에 등록된 SMS로 관리자 보안 인증번호가 발송됩니다.</p>
                            <p className="text-xs text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-700 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 운영자 인증번호 SMS는 잔여포인트가 있어야 발송됩니다. (잔여포인트 : 0) <a href="#" className="underline text-blue-500">SMS포인트 충전하기 &gt;</a></p>
                            <p className="text-xs text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-700 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 로그인한 운영자 정보에 SMS 인증정보(휴대폰번호)가 없는 경우, 엑셀 다운로드가 불가합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center mt-8 text-gray-500 text-xs">
                © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
            </div>

             {/* Floating Actions */}
             <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-12 h-12 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold"><Youtube size={20}/></span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-[#6E36E2] hover:bg-[#6E36E2]/90 shadow-lg text-white p-0 flex flex-col items-center justify-center border-0 gap-0">
                    <span className="text-[10px] leading-none">따라</span>
                    <span className="text-[10px] leading-none">하기</span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    <ArrowUp size={20} />
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    <ArrowDown size={20} />
                </Button>
            </div>
        </div>
    );
}
