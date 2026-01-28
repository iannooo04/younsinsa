"use client";

import React from "react";
import { X, Plus, Equal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberCartPopup({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white w-[1000px] h-[600px] flex flex-col shadow-lg">
        {/* Header - usually common in these popups, though not explicitly in crop, it's safer to have one with Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">회원 장바구니 상품추가</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between overflow-auto">
            
            {/* Empty State / Product List Area */}
            <div className="flex-1 flex items-center justify-center border-b border-gray-100 min-h-[200px]">
                <p className="text-gray-500 text-sm">장바구니에 담겨있는 상품이 없습니다.</p>
            </div>

            {/* Warning Text */}
            <div className="mt-4 mb-4">
                <div className="text-[#FF424D] text-[11px] leading-tight flex items-start gap-1">
                    <span className="font-bold bg-[#FF424D] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] mt-0.5">!</span>
                    <div>
                        <p>주문상품 리스트에서만 "쿠폰적용/변경/취소"가 가능합니다.</p>
                        <p>상품의 묶음수량 및 최소/최대 구매수량이 변경된 경우, 변경된 수량이 적용되어 주문상품으로 추가됩니다.</p>
                    </div>
                </div>
            </div>

            {/* Summary Box */}
            <div className="border border-gray-300 p-6 flex items-center justify-end bg-white mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>총 <strong className="text-black">0</strong> 개의 상품금액</span>
                    <strong className="text-black text-lg">0원</strong>
                    
                    <div className="mx-2 bg-gray-400 rounded-full p-0.5 text-white">
                        <Plus className="w-3 h-3" />
                    </div>

                    <span>배송비</span>
                    <strong className="text-black text-lg">0원</strong>

                    <div className="mx-2 bg-black rounded-full p-0.5 text-white">
                        <Equal className="w-3 h-3" />
                    </div>

                    <strong className="text-black text-2xl">0원</strong>
                </div>
                <div className="absolute mt-16 mr-6 text-xs text-gray-500">
                    적립예정 마일리지 : 0 원
                </div>
            </div>
            
             {/* Bottom Buttons */}
             <div className="flex justify-center gap-1">
                <Button 
                    variant="outline"
                    className="w-32 h-10 rounded-sm border-gray-400 text-gray-700 hover:bg-gray-50 text-xs"
                    onClick={onClose}
                >
                    선택 상품 주문
                </Button>
                <Button 
                    className="w-32 h-10 rounded-sm bg-[#404040] hover:bg-[#333333] text-white text-xs"
                    onClick={onClose}
                >
                    전체 상품 주문
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
