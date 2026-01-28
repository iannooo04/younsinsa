"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecurityAuthPopup({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white w-[800px] shadow-lg p-10">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">보안인증</h2>
        <div className="border-t-2 border-gray-600 mb-6"></div>

        {/* Description */}
        <div className="flex items-center gap-2 mb-6 text-gray-600 text-xs">
            <span className="bg-gray-600 text-white w-4 h-4 flex items-center justify-center text-[10px] font-bold rounded-[2px]">!</span>
            <span>쇼핑몰 보안을 위하여 NHN커머스 회원정보로 인증 후 접근하실 수 있습니다.</span>
        </div>

        {/* Form Table */}
        <div className="border-t border-gray-300 border-b border-gray-300 mb-8">
            {/* Auth Method */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] flex items-center pl-6 py-4 font-normal text-gray-700 text-xs text-left">
                    인증수단
                </div>
                <div className="flex-1 flex items-center px-6 py-4 gap-4">
                    <RadioGroup defaultValue="phone" className="flex items-center">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="phone" id="auth-phone" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="auth-phone" className="text-gray-700 font-normal cursor-pointer text-xs">NHN커머스 회원 휴대폰번호 인증</Label>
                        </div>
                    </RadioGroup>
                    <Button className="h-7 bg-[#A4A4A4] hover:bg-[#999999] text-white text-[11px] rounded-sm px-3">
                        인증번호 요청
                    </Button>
                </div>
            </div>

            {/* Auth Code */}
            <div className="flex">
                <div className="w-40 bg-[#FBFBFB] flex items-center pl-6 py-4 font-normal text-gray-700 text-xs text-left">
                    인증번호
                </div>
                <div className="flex-1 flex items-center px-6 py-4 gap-2">
                    <Input className="w-48 h-7 text-xs border-gray-300 rounded-sm" />
                    <span className="text-red-500 text-xs">남은 인증시간 : -분 -초</span>
                </div>
            </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-center gap-1">
            <Button 
                variant="outline" 
                className="w-24 h-10 border-gray-400 text-gray-700 hover:bg-gray-50 text-sm rounded-sm"
                onClick={onClose}
            >
                닫기
            </Button>
            <Button 
                className="w-24 h-10 bg-[#555555] hover:bg-[#444444] text-white text-sm rounded-sm"
                onClick={onClose}
            >
                인증완료
            </Button>
        </div>

      </div>
    </div>
  );
}
