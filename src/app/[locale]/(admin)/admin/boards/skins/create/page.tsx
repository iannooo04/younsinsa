"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Upload, Lock, Paperclip, Image as ImageIcon } from "lucide-react";
import Link from 'next/link';

// Reusing OptionItem from other admin pages
const OptionItem = ({ value, label, id }: { value: string; label: string; id?: string }) => {
    const generatedId = React.useId();
    const finalId = id || generatedId;
    return (
        <div className="flex items-center gap-2">
            <RadioGroupItem value={value} id={finalId} className="border-gray-300 w-4 h-4 text-gray-900" />
            <Label htmlFor={finalId} className="font-normal text-xs text-gray-700 cursor-pointer">{label}</Label>
        </div>
    );
};

// Reusing FormRow from other admin pages
const FormRow = ({ label, children, required, help, className }: { label: string; children: React.ReactNode; required?: boolean; help?: boolean; className?: string }) => {
    return (
        <div className={`flex border-b border-gray-100 last:border-0 ${className}`}>
            <div className="w-48 bg-[#FBFBFB] p-4 flex items-center border-r border-gray-100">
                <span className="text-xs font-bold text-gray-700">
                    {required && <span className="text-red-500 mr-1">*</span>}
                    {label}
                    {help && <span className="ml-1 inline-block w-3.5 h-3.5 leading-3 text-[10px] text-center rounded-full border border-gray-400 text-gray-400 cursor-help">?</span>}
                </span>
            </div>
            <div className="flex-1 p-4 flex items-center bg-white">
                {children}
            </div>
        </div>
    );
};

export default function BoardSkinCreatePage() {
    return (
        <div className="w-full h-full bg-[#f5f5f5] p-5 overflow-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 bg-white border-gray-300">
                        <ChevronLeft className="h-4 w-4 text-gray-600" />
                    </Button>
                    <h1 className="text-lg font-bold text-gray-900">게시판 스킨 등록</h1>
                    <Button variant="outline" size="sm" className="h-6 text-xs border-gray-300 bg-white text-gray-600">가이드</Button>
                </div>
                <div className="flex gap-2">
                    <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white">저장</Button>
                </div>
            </div>

            <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm">
                 <div className="p-5 pb-0 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-bold text-sm text-gray-800">기본 정보</h2>
                    <span className="text-xs text-gray-500"><span className="text-red-500">*</span>는 필수 입력 항목입니다.</span>
                </div>
                
                <div className="flex flex-col">
                    {/* Applied Design Skin */}
                    <FormRow label="적용 디자인스킨" required help>
                        <RadioGroup defaultValue="standard" className="flex items-center gap-6">
                            <OptionItem value="standard" label="기준몰" />
                            <OptionItem value="chinese" label="중문몰" />
                        </RadioGroup>
                    </FormRow>

                    {/* Classification */}
                    <FormRow label="구분">
                         <RadioGroup defaultValue="pc" className="flex items-center gap-6">
                            <OptionItem value="pc" label="PC쇼핑몰" />
                            <OptionItem value="mobile" label="모바일쇼핑몰" />
                        </RadioGroup>
                    </FormRow>

                    {/* Type */}
                    <FormRow label="유형">
                        <RadioGroup defaultValue="general" className="flex items-start gap-6">
                            <div className="flex flex-col gap-2">
                                <OptionItem value="general" label="일반형" />
                                <div className="border border-gray-200 p-2 rounded-sm bg-gray-50">
                                   <div className="w-24 h-16 bg-white border border-gray-200 flex flex-col gap-1 p-1">
                                       <div className="w-full h-2 bg-gray-200"></div>
                                       <div className="w-full h-2 bg-gray-100"></div>
                                       <div className="w-full h-2 bg-gray-100"></div>
                                       <div className="w-full h-2 bg-gray-100"></div>
                                   </div>
                                </div>
                            </div>
                             <div className="flex flex-col gap-2">
                                <OptionItem value="gallery" label="갤러리형" />
                                <div className="border border-gray-200 p-2 rounded-sm bg-gray-50">
                                   <div className="w-24 h-16 bg-white border border-gray-200 grid grid-cols-3 gap-1 p-1">
                                       <div className="bg-gray-200 h-full"></div>
                                       <div className="bg-gray-200 h-full"></div>
                                       <div className="bg-gray-200 h-full"></div>
                                       <div className="bg-gray-200 h-full"></div>
                                       <div className="bg-gray-200 h-full"></div>
                                       <div className="bg-gray-200 h-full"></div>
                                   </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <OptionItem value="event" label="이벤트형" />
                                <div className="border border-gray-200 p-2 rounded-sm bg-gray-50">
                                   <div className="w-24 h-16 bg-white border border-gray-200 flex flex-col gap-1 p-1">
                                       <div className="flex gap-1 h-6">
                                           <div className="w-8 bg-gray-200 h-full"></div>
                                           <div className="flex-1 flex flex-col gap-1">
                                                <div className="w-full h-2 bg-gray-100"></div>
                                                <div className="w-full h-2 bg-gray-100"></div>
                                           </div>
                                       </div>
                                       <div className="flex gap-1 h-6">
                                           <div className="w-8 bg-gray-200 h-full"></div>
                                           <div className="flex-1 flex flex-col gap-1">
                                                <div className="w-full h-2 bg-gray-100"></div>
                                                <div className="w-full h-2 bg-gray-100"></div>
                                           </div>
                                       </div>
                                   </div>
                                </div>
                            </div>
                             <div className="flex flex-col gap-2">
                                <OptionItem value="inquiry" label="1:1 문의형" />
                                <div className="border border-gray-200 p-2 rounded-sm bg-gray-50">
                                   <div className="w-24 h-16 bg-white border border-gray-200 flex flex-col gap-1 p-1">
                                       <div className="w-full h-2 bg-gray-300"></div>
                                       <div className="w-full h-2 bg-gray-100"></div>
                                       <div className="w-full h-2 bg-gray-100"></div>
                                   </div>
                                </div>
                            </div>
                        </RadioGroup>
                    </FormRow>

                    {/* Skin Code */}
                    <FormRow label="스킨코드" required help>
                        <div className="flex items-center gap-2 w-full max-w-xl">
                            <Input placeholder="영문,숫자로 2~30자 입력하세요." className="flex-1 h-8 text-xs border-gray-300" />
                            <Button className="h-8 px-4 bg-[#555555] hover:bg-[#444444] text-white text-xs">중복확인</Button>
                        </div>
                    </FormRow>

                    {/* Board Skin Name */}
                    <FormRow label="게시판 스킨명" required>
                         <Input placeholder="한글, 영문 대소문자, 숫자 최대 100자 입력 가능" className="w-full max-w-lg h-8 text-xs border-gray-300" />
                    </FormRow>
                    
                    {/* Board Position */}
                    <FormRow label="게시판 위치">
                         <RadioGroup defaultValue="center" className="flex items-start gap-6">
                            <div className="flex flex-col gap-2">
                                <OptionItem value="left" label="좌측 정렬" />
                                <div className="border border-gray-200 p-2 rounded-sm bg-gray-50">
                                   <div className="w-24 h-16 bg-white border border-gray-200 flex p-1 gap-1">
                                       <div className="w-8 h-full bg-gray-300 border-2 border-red-500"></div>
                                       <div className="flex-1 h-full bg-gray-100"></div>
                                   </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <OptionItem value="center" label="센터 정렬" />
                                <div className="border border-gray-200 p-2 rounded-sm bg-gray-50">
                                   <div className="w-24 h-16 bg-white border border-gray-200 flex p-1 gap-1">
                                       <div className="w-4 h-full bg-gray-100"></div>
                                       <div className="w-10 h-full bg-gray-300 border-2 border-red-500"></div>
                                       <div className="w-4 h-full bg-gray-100"></div>
                                   </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <OptionItem value="right" label="우측 정렬" />
                                <div className="border border-gray-200 p-2 rounded-sm bg-gray-50">
                                   <div className="w-24 h-16 bg-white border border-gray-200 flex p-1 gap-1">
                                       <div className="flex-1 h-full bg-gray-100"></div>
                                       <div className="w-8 h-full bg-gray-300 border-2 border-red-500"></div>
                                   </div>
                                </div>
                            </div>
                        </RadioGroup>
                    </FormRow>

                    {/* Board Width */}
                    <FormRow label="게시판 넓이" required>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Input defaultValue="100" className="w-24 h-8 text-xs border-gray-300" />
                                <Select defaultValue="percent">
                                    <SelectTrigger className="w-16 h-8 text-xs border-gray-300"><SelectValue/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="percent">%</SelectItem>
                                        <SelectItem value="px">px</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="border border-gray-200 p-2 rounded-sm bg-gray-50 flex items-center justify-center">
                                <div className="w-20 h-10 bg-gray-300 relative flex items-center justify-center border border-gray-400">
                                     <div className="w-full border-t border-red-500 absolute top-1/2 left-0"></div>
                                     <div className="absolute top-1/2 left-0 w-[1px] h-2 bg-red-500 -mt-1"></div>
                                     <div className="absolute top-1/2 right-0 w-[1px] h-2 bg-red-500 -mt-1"></div>
                                </div>
                            </div>
                        </div>
                    </FormRow>

                     {/* PC Icon Management */}
                     <div className="flex border-b border-gray-100 last:border-0 h-[400px]">
                        <div className="w-48 bg-[#FBFBFB] p-4 flex items-center justify-center border-r border-gray-100">
                            <span className="text-xs font-bold text-gray-700">pc아이콘 관리</span>
                        </div>
                        <div className="flex-1 p-4 bg-white">
                             <table className="w-full text-center border border-gray-200 text-xs">
                                <thead className="bg-gray-100 h-10 border-b border-gray-200 font-bold text-gray-700">
                                    <tr>
                                        <th className="border-r border-gray-200 w-24">아이콘 종류</th>
                                        <th className="border-r border-gray-200 w-24">아이콘 미리보기</th>
                                        <th className="border-r border-gray-200 w-40">아이콘 등록</th>
                                        <th>아이콘 예시 화면</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {/* Notice */}
                                    <tr className="h-10">
                                        <td className="border-r border-gray-200 text-gray-600">공지글</td>
                                        <td className="border-r border-gray-200"><span className="bg-[#FF424D] text-white text-[10px] px-1 py-0.5 rounded-[1px]">공지</span></td>
                                        <td className="border-r border-gray-200 p-1">
                                            <Button variant="outline" size="sm" className="w-full h-7 text-[11px] border-gray-300"><Upload className="w-3 h-3 mr-1"/>파일 찾기</Button>
                                        </td>
                                        <td rowSpan={7} className="p-4 align-top text-left text-gray-500">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="bg-[#FF424D] text-white text-[10px] px-1 py-0.5 rounded-[1px]">공지</span>
                                                    <Lock size={12} className="text-gray-400" />
                                                    <span>이미 주문했는데 추가하고</span>
                                                    <ImageIcon size={12} className="text-gray-400" />
                                                    <span className="bg-orange-500 text-white text-[10px] px-1 py-0.5 rounded-[1px] font-bold">N</span>
                                                    <span className="bg-red-500 text-white text-[10px] px-1 py-0.5 rounded-[1px] font-bold">HOT</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                     <span className="w-8 text-center text-xs">10</span>
                                                     <span className="text-orange-400 text-xs font-bold">↳ RE :</span>
                                                     <span>이미 주문했는데 추가하고</span>
                                                      <span className="bg-orange-500 text-white text-[10px] px-1 py-0.5 rounded-[1px] font-bold">N</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                     <span className="w-8 text-center text-xs">9</span>
                                                     <Lock size={12} className="text-gray-400" />
                                                     <span>무료배송쿠폰 사용 안내</span>
                                                     <Paperclip size={12} className="text-gray-400" />
                                                     <ImageIcon size={12} className="text-gray-400" />
                                                     <span className="bg-orange-500 text-white text-[10px] px-1 py-0.5 rounded-[1px] font-bold">N</span>
                                                     <span className="bg-red-500 text-white text-[10px] px-1 py-0.5 rounded-[1px] font-bold">HOT</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Secret */}
                                    <tr className="h-10">
                                        <td className="border-r border-gray-200 text-gray-600">비밀글</td>
                                        <td className="border-r border-gray-200"><div className="flex justify-center"><Lock size={14} className="text-gray-300" /></div></td>
                                        <td className="border-r border-gray-200 p-1">
                                             <Button variant="outline" size="sm" className="w-full h-7 text-[11px] border-gray-300"><Upload className="w-3 h-3 mr-1"/>파일 찾기</Button>
                                        </td>
                                    </tr>
                                    {/* Attachment */}
                                    <tr className="h-10">
                                        <td className="border-r border-gray-200 text-gray-600">첨부파일</td>
                                        <td className="border-r border-gray-200"><div className="flex justify-center"><Paperclip size={14} className="text-gray-300" /></div></td>
                                        <td className="border-r border-gray-200 p-1">
                                             <Button variant="outline" size="sm" className="w-full h-7 text-[11px] border-gray-300"><Upload className="w-3 h-3 mr-1"/>파일 찾기</Button>
                                        </td>
                                    </tr>
                                    {/* Image */}
                                    <tr className="h-10">
                                        <td className="border-r border-gray-200 text-gray-600">이미지</td>
                                        <td className="border-r border-gray-200"><div className="flex justify-center"><ImageIcon size={14} className="text-gray-300" /></div></td>
                                        <td className="border-r border-gray-200 p-1">
                                             <Button variant="outline" size="sm" className="w-full h-7 text-[11px] border-gray-300"><Upload className="w-3 h-3 mr-1"/>파일 찾기</Button>
                                        </td>
                                    </tr>
                                    {/* NEW */}
                                    <tr className="h-10">
                                        <td className="border-r border-gray-200 text-gray-600">NEW</td>
                                        <td className="border-r border-gray-200"><span className="bg-orange-500 text-white text-[10px] px-1 py-0.5 rounded-[1px] font-bold">N</span></td>
                                        <td className="border-r border-gray-200 p-1">
                                             <Button variant="outline" size="sm" className="w-full h-7 text-[11px] border-gray-300"><Upload className="w-3 h-3 mr-1"/>파일 찾기</Button>
                                        </td>
                                    </tr>
                                    {/* HOT */}
                                     <tr className="h-10">
                                        <td className="border-r border-gray-200 text-gray-600">HOT</td>
                                        <td className="border-r border-gray-200"><span className="bg-red-500 text-white text-[10px] px-1 py-0.5 rounded-[1px] font-bold">HOT</span></td>
                                        <td className="border-r border-gray-200 p-1">
                                             <Button variant="outline" size="sm" className="w-full h-7 text-[11px] border-gray-300"><Upload className="w-3 h-3 mr-1"/>파일 찾기</Button>
                                        </td>
                                    </tr>
                                    {/* Answer */}
                                    <tr className="h-10">
                                        <td className="border-r border-gray-200 text-gray-600">답변글</td>
                                        <td className="border-r border-gray-200"><span className="text-orange-400 text-xs font-bold">↳</span></td>
                                        <td className="border-r border-gray-200 p-1">
                                             <Button variant="outline" size="sm" className="w-full h-7 text-[11px] border-gray-300"><Upload className="w-3 h-3 mr-1"/>파일 찾기</Button>
                                        </td>
                                    </tr>
                                </tbody>
                             </table>
                        </div>
                    </div>

                    {/* Post Line Height */}
                    <FormRow label="게시글 줄높이" required>
                         <div className="flex items-center gap-2">
                             <Input defaultValue="100" className="w-24 h-8 text-xs border-gray-300" />
                             <span className="text-xs text-gray-600">px</span>
                             <div className="w-16 h-10 border border-gray-200 bg-gray-300 ml-4 flex flex-col justify-between items-center py-1">
                                 <div className="w-[1px] bg-red-500 h-[40%] relative">
                                     <div className="absolute top-0 -left-1 w-2 border-t border-red-500"></div>
                                      <div className="absolute bottom-0 -left-1 w-2 border-t border-red-500"></div>
                                 </div>
                                  <div className="w-[1px] bg-red-500 h-[40%] relative">
                                        <div className="absolute top-0 -left-1 w-2 border-t border-red-500"></div>
                                      <div className="absolute bottom-0 -left-1 w-2 border-t border-red-500"></div>
                                  </div>
                             </div>
                         </div>
                    </FormRow>

                </div>
            </div>
            
             <div className="flex justify-end gap-2 mt-5">
                 <Link href="/admin/boards/create">
                    <Button variant="outline" size="icon" className="h-10 w-10 border-gray-300 rounded-full bg-white shadow-md hover:bg-gray-50 text-gray-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 19V5M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Button>
                 </Link>
            </div>
        </div>
    );
}
