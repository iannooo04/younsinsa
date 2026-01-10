"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, Youtube, ArrowUp, ArrowDown, BookOpen } from "lucide-react";

export default function PasswordChangeGuideSettingsPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">비밀번호 변경안내 설정</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium">
                    저장
                </Button>
            </div>

            {/* Main Settings Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">비밀번호 변경안내 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t border-gray-400">
                    {/* Admin Usage Setting */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">관리자 사용설정</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="used" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="admin-used" />
                                    <Label htmlFor="admin-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="admin-unused" />
                                    <Label htmlFor="admin-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-gray-500 flex items-start gap-1">
                                <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                장기간 비밀번호를 변경하지 않은 관리자가 관리자 화면 로그인 시 비밀번호 변경을 안내합니다.
                            </p>
                        </div>
                    </div>

                    {/* Mall Usage Setting */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">쇼핑몰 사용설정</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="used" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="mall-used" />
                                    <Label htmlFor="mall-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="mall-unused" />
                                    <Label htmlFor="mall-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-gray-500 flex items-start gap-1">
                                <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                장기간 비밀번호를 변경하지 않은 회원이 쇼핑몰 화면 로그인 시 비밀번호 변경을 안내합니다.
                            </p>
                        </div>
                    </div>

                    {/* Change Cycle */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">비밀번호 변경<br/>안내 주기</div>
                        <div className="p-4 flex items-center gap-2 text-sm">
                            <span>비밀번호 최종 변경일 기준</span>
                            <Select defaultValue="3">
                                <SelectTrigger className="w-[60px] h-8 rounded-sm border-gray-300">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="6">6</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="month">
                                <SelectTrigger className="w-[80px] h-8 rounded-sm border-gray-300">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="month">개월</SelectItem>
                                    <SelectItem value="day">일</SelectItem>
                                </SelectContent>
                            </Select>
                            <span>마다 로그인 시 안내</span>
                        </div>
                    </div>

                    {/* Re-notification Cycle */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">비밀번호 변경<br/>재안내 주기</div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Select defaultValue="3">
                                    <SelectTrigger className="w-[60px] h-8 rounded-sm border-gray-300">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="6">6</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select defaultValue="month">
                                    <SelectTrigger className="w-[80px] h-8 rounded-sm border-gray-300">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="month">개월</SelectItem>
                                        <SelectItem value="day">일</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span>마다 로그인 시 재안내</span>
                            </div>
                            <p className="text-xs text-gray-500 flex items-start gap-1">
                                <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                비밀번호 변경안내 화면에서 [다음에 변경하기] 선택 시 재안내할 기간을 설정합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="border border-gray-200 p-6 space-y-4 pt-8 border-l-0 border-r-0 border-b-0 mt-8">
                <div className="flex items-center gap-1 text-blue-500 font-bold mb-2">
                    <BookOpen size={16} />
                    <span>안내</span>
                </div>
                <div className="text-xs text-gray-500 space-y-2 leading-relaxed">
                    <p className="font-bold text-gray-700">[비밀번호변경 재안내주기] 비밀번호변경 재안내주기란 무엇인가요?</p>
                    <ul className="list-disc pl-4 space-y-1 marker:text-gray-300">
                        <li>운영자 및 회원이 관리자화면 / 쇼핑몰의 비밀번호변경안내 화면에서 [다음에 변경하기] 클릭 시 비밀번호변경안내가 재노출되는 주기입니다.</li>
                        <li>쇼핑몰 보안 및 회원정보 보호를 위해 운영자 및 회원이 설정한 기간 동안 관리자화면 / 쇼핑몰의 비밀번호를 변경하지 않았을 경우, <br/> 비밀번호변경안내 화면을 노출할 범위 및 기간을 반드시 설정하여 주기적으로 비밀번호를 변경하도록 해야 합니다.</li>
                    </ul>
                    <p className="text-blue-500 mt-2">
                        개인정보위원회의 기술적 · 관리적 보호조치 기준에 따라, 정보통신서비스 제공자등은 개인정보 취급자를 대상으로<br/>
                        비밀번호에 유효기간을 설정하여 6개월에 1회 이상 변경하도록 안내하여야 합니다.
                    </p>
                </div>
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
