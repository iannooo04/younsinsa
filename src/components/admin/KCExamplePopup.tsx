"use client";

import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function KCExamplePopup({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="w-[800px] bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">KC인증 표시 예시</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={28} strokeWidth={1} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Example 1 */}
          <div className="space-y-3">
             <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="bg-gray-400 text-white w-3 h-3 flex items-center justify-center text-[10px] font-bold">!</span>
                KC인증 표시 기본 예시 입니다. (인증구분과 인증번호를 모두 입력한 경우)
             </div>
             <div className="border border-gray-300 p-6 flex gap-4 bg-white relative">
                <div className="flex-shrink-0 w-12 h-12 border-2 border-[#1a1a1a] flex items-center justify-center rounded-sm font-bold text-2xl">
                    KC
                </div>
                <div className="text-sm text-gray-700 leading-relaxed font-medium">
                    <p>〔어린이제품〕 안전확인 대상 품목으로 아래의 국가 통합인증 필함</p>
                    <p>인증번호 : <span className="underline cursor-pointer text-blue-800">CB113F002-6006</span></p>
                    <p className="text-xs text-gray-500 mt-1">(해당 인증 검사 정보는 판매자가 직접 등록한 것으로 등록 정보에 대한 책임은 판매자에게 있습니다.)</p>
                </div>
             </div>
          </div>

          {/* Example 2 */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-sm border border-gray-100">
             <div className="flex items-start gap-1.5 text-xs text-[#ff4d4f]">
                <span className="bg-[#ff4d4f] text-white w-3 h-3 flex items-center justify-center text-[10px] font-bold mt-0.5">!</span>
                <p className="font-bold">공급자적합성확인 대상 중 인증번호가 없는 경우, 인증번호를 별도로 입력하지 않아도 됩니다.<br/>인증번호 미 입력 시, 아래와 같이 노출됩니다.</p>
             </div>
             <div className="border border-gray-300 p-6 flex gap-4 bg-white">
                <div className="flex-shrink-0 w-12 h-12 border-2 border-[#1a1a1a] flex items-center justify-center rounded-sm font-bold text-2xl">
                    KC
                </div>
                <div className="text-sm text-gray-700 leading-relaxed font-medium">
                    <p>〔어린이제품〕 공급자적합성확인 대상 품목으로 아래의 국가 통합인증 필함</p>
                    <p className="text-xs text-gray-500 mt-1">(해당 인증 검사 정보는 판매자가 직접 등록한 것으로 등록 정보에 대한 책임은 판매자에게 있습니다.)</p>
                </div>
             </div>
          </div>

          {/* Bottom Close Button Area if needed, but the image shows x and confirmation is usually a footer button or just x. 
              The screenshot doesn't show a bottom button, just the content. 
              I'll add a 'Close' style button just in case for better UX, or just keep it simple.
          */}
        </div>
      </div>
    </div>
  );
}
