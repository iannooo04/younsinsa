"use client";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function SearchSettingSavePopup({ isOpen, onClose, onConfirm }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
            <div className="bg-white w-[500px] shadow-xl border border-gray-300 p-6">
                {/* Header */}
                <div className="border-b border-gray-800 pb-2 mb-4">
                    <h2 className="font-bold text-xl text-gray-900">확인</h2>
                </div>

                {/* Body */}
                <div className="text-sm text-gray-700 space-y-4 mb-8">
                    <p>
                        현재 설정된 검색조건을 저장하시겠습니까? 저장 후 기본 검색설정으로 사용됩니다.<br/>
                        <span className="text-gray-500">(직접 입력한 검색어와 조회기간은 저장되지 않습니다.)</span>
                    </p>
                    <p>
                        검색결과의 &quot;정렬조건&quot;과 &quot;페이지당 출력수 설정&quot;(20개 보기 권장)도 같이 저장되며,<br/>
                        <span className="text-red-600">출력수가 많을 경우 리스트 접근 시, 부하문제로 페이지로딩이 오래 걸릴 수 있습니다.</span>
                    </p>
                </div>

                {/* Footer buttons */}
                <div className="flex justify-center gap-2">
                    <button 
                        onClick={onClose}
                        className="w-24 h-10 border border-gray-400 bg-white hover:bg-gray-50 text-gray-800 text-sm font-medium"
                    >
                        취소
                    </button>
                    <button 
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="w-24 h-10 bg-[#555] hover:bg-[#444] text-white text-sm font-medium"
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
