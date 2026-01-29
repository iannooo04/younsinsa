"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (maxSize: number) => void;
  initialMaxSize: number;
}

export default function BusinessCertConfigPopup({ isOpen, onClose, onConfirm, initialMaxSize }: Props) {
  const [maxSize, setMaxSize] = useState(initialMaxSize);

  useEffect(() => {
    if (isOpen) {
      setMaxSize(initialMaxSize);
    }
  }, [isOpen, initialMaxSize]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
      <div className="bg-white w-[500px] shadow-xl border border-gray-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="font-bold text-xl text-gray-900">사업자등록증 추가 설정</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-8 h-8 font-light" strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="border-t border-gray-400 border-b border-gray-200">
            <div className="flex bg-[#FBFBFB] border-b border-gray-200">
              <div className="w-52 p-4 flex items-center">
                <div className="w-1 h-1 bg-[#FF424D] mr-2"></div>
                <span className="text-gray-700 text-xs font-bold">업로드파일 최대크기</span>
              </div>
              <div className="flex-1 p-4 flex items-center bg-white border-l border-gray-200">
                 <Input 
                    type="number"
                    value={maxSize}
                    onChange={(e) => setMaxSize(Number(e.target.value))}
                    className="w-40 h-8 text-xs border-gray-300 rounded-[2px]" 
                  />
                  <span className="text-xs text-gray-700 ml-2">MByte(s)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center pb-6">
          <Button 
            onClick={() => onConfirm(maxSize)}
            className="w-24 h-10 bg-[#555555] hover:bg-[#444444] text-white text-sm font-medium rounded-[2px]"
          >
            적용
          </Button>
        </div>
      </div>
    </div>
  );
}
