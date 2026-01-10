"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";

export default function GoogleLoginSettingsPage() {
  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">구글 아이디 로그인 설정</h1>
        <Button className="h-9 px-8 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
            저장
        </Button>
      </div>

      {/* Settings Section */}
      <div className="mb-0">
        <div className="flex items-center gap-1 mb-2">
           <h2 className="font-bold text-sm text-gray-800 tracking-tight">구글 아이디 로그인 설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400 stroke-[1.5]" />
        </div>

        <div className="border-t border-gray-300">
             <div className="flex border-b border-gray-200 min-h-[50px]">
                <div className="w-40 bg-[#F9F9F9] p-4 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
                    사용설정
                </div>
                <div className="flex-1 p-4 flex items-center">
                    <RadioGroup defaultValue="off" className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="on" id="google-on" className="border-gray-300 text-red-500 focus:ring-red-500 w-4 h-4" />
                            <Label htmlFor="google-on" className="text-gray-700 cursor-pointer text-xs">사용함</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="off" id="google-off" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 focus:ring-red-500 w-4 h-4" />
                            <Label htmlFor="google-off" className="text-gray-700 cursor-pointer text-xs font-bold md:font-normal">사용안함</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
      </div>
      
       {/* Bottom Copyright */}
        <div className="mt-auto pt-24 pb-6 text-center text-[10px] text-gray-400">
            © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
        </div>
    </div>
  );
}
