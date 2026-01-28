"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (address: { zipcode: string; address: string }) => void;
}

export default function PostalCodeSearchPopup({ isOpen, onClose, onComplete: _onComplete }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-[#F2F2F2] w-[600px] h-[500px] flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-12 bg-[#333333] text-white">
          <h2 className="text-sm font-bold">우편번호 찾기</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-0">
            <div className="bg-white p-5 pb-8">
                {/* Search Bar */}
                <div className="flex gap-0 mb-6 border border-[#FF424D] h-10">
                    <Input 
                        className="flex-1 h-full border-0 rounded-none focus-visible:ring-0 text-xs px-3 placeholder:text-gray-400"
                        placeholder="검색어(도로명,지번,건물명)를 입력해주세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button 
                        className="w-16 h-full bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-none font-bold text-xs m-0 border-0"
                    >
                        검색
                    </Button>
                </div>

                {/* TIP Section */}
                <div>
                    <h3 className="text-[#FF424D] text-xs font-bold mb-1">TIP</h3>
                    <p className="text-[11px] text-gray-500 mb-4">아래와 같이 검색하면 더욱 정확한 결과가 검색됩니다.</p>

                    <div className="space-y-3 text-[11px] text-gray-800">
                        <div>
                            <p className="font-bold mb-0.5">• 도로명 + 건물번호</p>
                            <p className="text-gray-500 pl-2">예) 영동대로 513, 제주 첨단로 242</p>
                        </div>
                        <div>
                            <p className="font-bold mb-0.5">• 지역명(동/리) + 번지</p>
                            <p className="text-gray-500 pl-2">예) 삼성동 25, 제주 영평동 2181</p>
                        </div>
                        <div>
                            <p className="font-bold mb-0.5">• 지역명(동/리) + 건물명(아파트명)</p>
                            <p className="text-gray-500 pl-2">예) 분당 주공, 삼성동 코엑스</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
