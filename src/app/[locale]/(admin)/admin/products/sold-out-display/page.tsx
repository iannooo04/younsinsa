"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Youtube, ChevronUp, Skull } from "lucide-react";

export default function SoldOutProductDisplayPage() {
    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">품절상품 진열설정</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm">저장</Button>
            </div>

            {/* PC Settings Section */}
            <div>
                 <div className="flex items-center gap-1 mb-2 mt-4">
                    <h2 className="text-sm font-bold text-gray-800">PC 품절상품 표시 설정</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                </div>
                
                <div className="border border-gray-300 bg-white text-xs">
                    {/* Image Overlay Settings */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-4 font-bold text-gray-700 flex flex-col justify-center border-r border-gray-200 relative">
                            <span className="leading-relaxed">상품<br/>이미지<br/>오버레이</span>
                            <span className="absolute left-2 top-4 w-1 h-1 bg-red-500 rounded-full"></span>
                        </div>
                        <div className="flex-1 p-4">
                             <RadioGroup defaultValue="black-circle">
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                {/* Option 1: None */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white text-gray-400">
                                        사용안함
                                    </div>
                                    <RadioGroupItem value="none" id="pc-overlay-none" />
                                </div>
                                
                                {/* Option 2: Black Circle */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white relative">
                                        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">SOLD OUT</div>
                                    </div>
                                    <RadioGroupItem value="black-circle" id="pc-overlay-black-circle" />
                                </div>

                                {/* Option 3: Diagonal */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white relative overflow-hidden">
                                        <div className="absolute w-[140%] h-[1px] bg-gray-400 transform -rotate-45"></div>
                                        <div className="relative bg-black text-white text-[10px] px-2 py-0.5 font-bold">SOLD OUT</div>
                                    </div>
                                    <RadioGroupItem value="diagonal" id="pc-overlay-diagonal" />
                                </div>
                                
                                {/* Option 4: Red Circle */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white relative">
                                        <div className="w-16 h-16 rounded-full bg-[#FF424D] flex items-center justify-center text-white text-[11px] font-bold">품절</div>
                                    </div>
                                    <RadioGroupItem value="red-circle" id="pc-overlay-red-circle" />
                                </div>

                                {/* Option 5: Red Box Diagonal */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white relative overflow-hidden">
                                        <div className="absolute w-[140%] h-[1px] bg-[#FF424D] transform -rotate-45"></div>
                                        <div className="relative bg-[#FF424D] text-white text-[11px] px-3 py-0.5 font-bold">품절</div>
                                    </div>
                                    <RadioGroupItem value="red-diagonal" id="pc-overlay-red-diagonal" />
                                </div>
                                
                                {/* Option 6: Crossed Box */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white relative">
                                        <div className="absolute inset-0 border border-gray-300 m-1">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-full h-[1px] bg-gray-300 absolute transform rotate-45"></div>
                                                <div className="w-full h-[1px] bg-gray-300 absolute transform -rotate-45"></div>
                                            </div>
                                        </div>
                                        <div className="relative font-bold text-gray-800 text-[10px] bg-white px-1 z-10">SOLD OUT</div>
                                    </div>
                                    <RadioGroupItem value="crossed" id="pc-overlay-crossed" />
                                </div>

                                {/* Option 7: Simple Text */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white relative">
                                        <div className="font-bold text-gray-800 text-xs">SOLD OUT !</div>
                                    </div>
                                    <RadioGroupItem value="text" id="pc-overlay-text" />
                                </div>
                                
                                 {/* Option 8: Skull */}
                                 <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex flex-col items-center justify-center bg-white relative gap-1">
                                        <Skull className="w-10 h-10 text-gray-600" />
                                        <div className="font-permanent-marker text-[10px] text-gray-600 transform -rotate-6">SOLD OUT</div>
                                    </div>
                                    <RadioGroupItem value="skull" id="pc-overlay-skull" />
                                </div>
                                
                                {/* Option 9: Custom */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white text-gray-400 text-xs text-center p-2">
                                        사용자 설...
                                    </div>
                                    <RadioGroupItem value="Custom" id="pc-overlay-custom" />
                                </div>
                                </div>
                             </RadioGroup>
                        </div>
                    </div>

                    {/* Sold Out Icon Settings */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-4 font-bold text-gray-700 flex flex-col justify-center border-r border-gray-200 relative">
                            <span className="leading-relaxed">품절<br/>아이콘</span>
                            <span className="absolute left-2 top-4 w-1 h-1 bg-red-500 rounded-full"></span>
                        </div>
                        <div className="flex-1 p-4 flex flex-col justify-center gap-3">
                             <div className="flex items-center gap-2">
                                <RadioGroupItem value="unused" id="pc-icon-unused" className="rounded-full border-gray-300 text-gray-600 focus:ring-gray-400" /> 
                                <Label htmlFor="pc-icon-unused" className="font-normal text-gray-700 cursor-pointer">사용안함</Label>
                             </div>
                             <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border border-red-500 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                                <Label className="font-normal text-gray-700">기본 아이콘</Label>
                                <div className="bg-[#A4A4A4] text-white px-3 py-1 text-xs font-bold ml-1">품절</div>
                             </div>
                             <div className="flex items-center gap-2">
                                <RadioGroupItem value="custom" id="pc-icon-custom" className="rounded-full border-gray-300 text-gray-600 focus:ring-gray-400" />
                                <Label htmlFor="pc-icon-custom" className="font-normal text-gray-700 cursor-pointer">대체 아이콘</Label>
                                <Button size="sm" variant="secondary" className="h-6 bg-[#A4A4A4] hover:bg-[#909090] text-white text-[11px] rounded-none px-2">찾아보기</Button>
                                <div className="w-40 h-6 border border-gray-300 bg-[#F1F1F1]"></div>
                             </div>
                        </div>
                    </div>

                     {/* Price Display Settings */}
                     <div className="flex">
                        <div className="w-40 bg-gray-50 p-4 font-bold text-gray-700 flex flex-col justify-center border-r border-gray-200 relative">
                            <span className="leading-relaxed">가격<br/>표시<br/>설정</span>
                            <span className="absolute left-2 top-4 w-1 h-1 bg-red-500 rounded-full"></span>
                             <span className="absolute left-1/2 bottom-4 transform -translate-x-1/2 text-gray-400 border border-gray-400 rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-normal cursor-help">?</span>
                        </div>
                        <div className="flex-1 p-4 flex flex-col justify-center gap-3">
                             <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border border-red-500 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                                <Label className="font-normal text-gray-700">가격 표시</Label>
                             </div>
                             <div className="flex items-center gap-2">
                                <RadioGroupItem value="alt-text" id="pc-price-alt-text" className="rounded-full border-gray-300 text-gray-600 focus:ring-gray-400" />
                                <Label htmlFor="pc-price-alt-text" className="font-normal text-gray-700 cursor-pointer">가격 대체 문구</Label>
                             </div>
                             <div className="flex items-center gap-2">
                                <RadioGroupItem value="image" id="pc-price-image" className="rounded-full border-gray-300 text-gray-600 focus:ring-gray-400" />
                                <Label htmlFor="pc-price-image" className="font-normal text-gray-700 cursor-pointer">이미지 노출</Label>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Settings Section */}
            <div>
                 <div className="flex items-center gap-1 mb-2 mt-8">
                    <h2 className="text-sm font-bold text-gray-800">모바일 품절상품 표시 설정</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                </div>
                
                 <div className="border border-gray-300 bg-white text-xs">
                    {/* Image Overlay Settings (Mobile) */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-4 font-bold text-gray-700 flex flex-col justify-center border-r border-gray-200 relative">
                            <span className="leading-relaxed">상품<br/>이미지<br/>오버레이</span>
                            <span className="absolute left-2 top-4 w-1 h-1 bg-red-500 rounded-full"></span>
                        </div>
                        <div className="flex-1 p-4">
                             <RadioGroup defaultValue="black-circle">
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                {/* Option 1: None */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white text-gray-400">
                                        사용안함
                                    </div>
                                    <RadioGroupItem value="none" id="mo-overlay-none" />
                                </div>
                                {/* ... Repeat items for Mobile if needed, simplifying for brevity since layout is identical */}
                                 {/* Option 2: Black Circle */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white relative">
                                        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">SOLD OUT</div>
                                    </div>
                                    <RadioGroupItem value="black-circle" id="mo-overlay-black-circle" />
                                </div>
                                {/* Option 3: Diagonal */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white relative overflow-hidden">
                                        <div className="absolute w-[140%] h-[1px] bg-gray-400 transform -rotate-45"></div>
                                        <div className="relative bg-black text-white text-[10px] px-2 py-0.5 font-bold">SOLD OUT</div>
                                    </div>
                                    <RadioGroupItem value="diagonal" id="mo-overlay-diagonal" />
                                </div>
                                 {/* Option 4: Red Circle */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white relative">
                                        <div className="w-16 h-16 rounded-full bg-[#FF424D] flex items-center justify-center text-white text-[11px] font-bold">품절</div>
                                    </div>
                                    <RadioGroupItem value="red-circle" id="mo-overlay-red-circle" />
                                </div>
                                {/* Option 5: Red Box Diagonal */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white relative overflow-hidden">
                                        <div className="absolute w-[140%] h-[1px] bg-[#FF424D] transform -rotate-45"></div>
                                        <div className="relative bg-[#FF424D] text-white text-[11px] px-3 py-0.5 font-bold">품절</div>
                                    </div>
                                    <RadioGroupItem value="red-diagonal" id="mo-overlay-red-diagonal" />
                                </div>
                                 {/* Option 6: Crossed Box */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white relative">
                                        <div className="absolute inset-0 border border-gray-300 m-1">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-full h-[1px] bg-gray-300 absolute transform rotate-45"></div>
                                                <div className="w-full h-[1px] bg-gray-300 absolute transform -rotate-45"></div>
                                            </div>
                                        </div>
                                        <div className="relative font-bold text-gray-800 text-[10px] bg-white px-1 z-10">SOLD OUT</div>
                                    </div>
                                    <RadioGroupItem value="crossed" id="mo-overlay-crossed" />
                                </div>
                                 {/* Option 7: Simple Text */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex items-center justify-center bg-white relative">
                                        <div className="font-bold text-gray-800 text-xs">SOLD OUT !</div>
                                    </div>
                                    <RadioGroupItem value="text" id="mo-overlay-text" />
                                </div>
                                 {/* Option 8: Skull */}
                                 <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 border border-gray-200 flex flex-col items-center justify-center bg-white relative gap-1">
                                        <Skull className="w-10 h-10 text-gray-600" />
                                        <div className="font-permanent-marker text-[10px] text-gray-600 transform -rotate-6">SOLD OUT</div>
                                    </div>
                                    <RadioGroupItem value="skull" id="mo-overlay-skull" />
                                </div>
                                </div>
                             </RadioGroup>
                        </div>
                    </div>
                    {/* Icon & Price Settings (Mobile) - truncated for brevity but implying existence or user can scroll */}
                     <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-4 font-bold text-gray-700 flex flex-col justify-center border-r border-gray-200 relative">
                            <span className="leading-relaxed">품절<br/>아이콘</span>
                        </div>
                        <div className="flex-1 p-4 flex flex-col justify-center gap-3">
                             <div className="flex items-center gap-2">
                                <RadioGroupItem value="unused" id="mo-icon-unused" className="rounded-full border-gray-300 text-gray-600 focus:ring-gray-400" />
                                <Label htmlFor="mo-icon-unused" className="font-normal text-gray-700 cursor-pointer">사용안함</Label>
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
