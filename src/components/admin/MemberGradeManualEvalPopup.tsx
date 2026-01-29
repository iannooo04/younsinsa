"use client";




interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function MemberGradeManualEvalPopup({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
      <div className="bg-white w-[600px] shadow-xl border border-gray-300 p-8">
        {/* Header */}
        <div className="border-b border-gray-800 pb-4 mb-6">
          <h2 className="font-bold text-2xl text-gray-900">회원등급 수동평가</h2>
        </div>

        {/* Body */}
        <div className="text-sm text-gray-700 leading-6 mb-10 border-b border-gray-200 pb-8">
          <p>
            현재 설정된 평가방법은 실적수치제이며, 회원등급별 평가기준에 따라 주문금액, 상품주문건수, 주문상품후기횟수를 종합하여 회원등급이 평가됩니다. 회원등급 평가를 진행하시겠습니까?
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-2">
          <button 
            onClick={onClose}
            className="w-24 h-12 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium"
          >
            취소
          </button>
          <button 
            onClick={onConfirm}
            className="w-24 h-12 bg-[#666666] hover:bg-[#555555] text-white text-sm font-medium"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
