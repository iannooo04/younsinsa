"use client";

import { X, ChevronUp, ChevronDown, ChevronsUp, ChevronsDown, Plus, Minus } from "lucide-react";
import { useState } from "react";
// Using standard HTML elements to avoid any potential component conflicts
/* import { Button } from "@/components/ui/button"; */

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedItems: string[]) => void;
}

const ALL_ITEMS = [
  "선택", "번호", "상점구분", "주문일시", "입금일시", "주문번호", "주문자", "주문유형",
  "주문상품", "주문상품(해외상점)", "총 상품금액", "총 배송비", "총 할인금액", 
  "총 부가결제금액", "총 주문금액", "총 실결제금액", 
  "총 상품금액(해외상점)", "총 배송비(해외상점)", "총 할인금액(해외상점)", 
  "총 주문금액(해외상점)", "총 실결제금액(해외상점)", 
  "결제방법", "결제상태", "미배송", "배송중", "배송완료", "취소", "교환", "반품", "환불", 
  "수령자", "배송 메시지", "영수증 신청여부", "사은품", "관리자메모", "주문자휴대폰번호"
];

const DEFAULT_VISIBLE_ITEMS = [
  "선택", "번호", "상점구분", "주문일시", "입금일시", "주문번호", "주문자", "주문유형",
  "주문상품", "주문상품(해외상점)", "총 상품금액", "총 배송비", "총 할인금액", 
  "총 부가결제금액", "총 주문금액", "총 실결제금액", 
  "총 상품금액(해외상점)", "총 배송비(해외상점)", "총 할인금액(해외상점)", 
  "총 주문금액(해외상점)", "총 실결제금액(해외상점)", 
  "결제방법", "결제상태", "미배송", "배송중", "배송완료", "취소", "교환", "반품", "환불", 
  "수령자", "배송 메시지", "영수증 신청여부", "사은품", "관리자메모", "주문자휴대폰번호"
];

export default function SearchConfigPopup({ isOpen, onClose, onConfirm }: Props) {
  const [allItems] = useState<string[]>(ALL_ITEMS);
  const [selectedAllItems, setSelectedAllItems] = useState<string[]>([]);
  
  const [visibleItems, setVisibleItems] = useState<string[]>(DEFAULT_VISIBLE_ITEMS);
  const [selectedVisibleItems, setSelectedVisibleItems] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleSelection = (item: string, listType: 'all' | 'visible') => {
    if (listType === 'all') {
      setSelectedAllItems(prev => 
        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
      );
    } else {
      setSelectedVisibleItems(prev => 
        prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
      );
    }
  };

  const handleAdd = () => {
    const newItems = Array.from(new Set([...visibleItems, ...selectedAllItems]));
    setVisibleItems(newItems);
    setSelectedAllItems([]);
  };

  const handleRemove = () => {
    const newItems = visibleItems.filter(item => !selectedVisibleItems.includes(item));
    setVisibleItems(newItems);
    setSelectedVisibleItems([]);
  };

  const moveItem = (direction: 'top' | 'up' | 'down' | 'bottom') => {
    if (selectedVisibleItems.length === 0) return;
    
    let newItems = [...visibleItems];
    const indices = selectedVisibleItems.map(item => newItems.indexOf(item)).sort((a, b) => a - b);
    
    if (direction === 'up') {
      if (indices[0] > 0) {
        indices.forEach(idx => {
          [newItems[idx - 1], newItems[idx]] = [newItems[idx], newItems[idx - 1]];
        });
      }
    } else if (direction === 'down') {
      if (indices[indices.length - 1] < newItems.length - 1) {
        for (let i = indices.length - 1; i >= 0; i--) {
          const idx = indices[i];
          [newItems[idx], newItems[idx + 1]] = [newItems[idx + 1], newItems[idx]];
        }
      }
    } else if (direction === 'top') {
        const selected = newItems.filter(item => selectedVisibleItems.includes(item));
        const nonSelected = newItems.filter(item => !selectedVisibleItems.includes(item));
        newItems = [...selected, ...nonSelected];
    } else if (direction === 'bottom') {
        const selected = newItems.filter(item => selectedVisibleItems.includes(item));
        const nonSelected = newItems.filter(item => !selectedVisibleItems.includes(item));
        newItems = [...nonSelected, ...selected];
    }
    
    setVisibleItems(newItems);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-sm w-[800px] shadow-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-400">
          <h2 className="text-xl font-bold text-gray-800">조회항목 설정</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={28} />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
            {/* Top Controls */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex-1 pr-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-gray-700">전체 조회항목</span>
                        <select className="w-32 h-8 text-xs border border-gray-300 rounded-sm px-2 focus:outline-none">
                            <option value="default">기본순서</option>
                            <option value="asc">가나다순</option>
                            <option value="desc">가나다역순</option>
                        </select>
                    </div>
                    <div className="border border-gray-300 h-[300px] overflow-y-auto bg-white">
                        {allItems.map((item) => (
                            <div 
                                key={`all-${item}`}
                                className={`px-3 py-2 text-sm border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedAllItems.includes(item) ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                                onClick={() => toggleSelection(item, 'all')}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Center Buttons */}
                <div className="flex flex-col justify-center gap-2 px-2 pt-20">
                    <button 
                         className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-50 rounded-sm"
                        onClick={handleAdd}
                    >
                        <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                         className="w-8 h-8 flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-50 rounded-sm"
                        onClick={handleRemove}
                    >
                        <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                </div>

                <div className="flex-1 pl-2">
                    <div className="flex justify-between items-center mb-2">
                         <span className="text-sm font-bold text-gray-700">노출 조회항목</span>
                         <div className="flex border border-gray-300 rounded-sm overflow-hidden">
                             <button onClick={() => moveItem('top')} className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50 border-r border-gray-300">
                                 <ChevronsUp className="w-3 h-3 text-gray-500" />
                             </button>
                             <button onClick={() => moveItem('up')} className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50 border-r border-gray-300">
                                <ChevronUp className="w-3 h-3 text-gray-500" />
                             </button>
                             <button onClick={() => moveItem('down')} className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50 border-r border-gray-300">
                                <ChevronDown className="w-3 h-3 text-gray-500" />
                             </button>
                             <button onClick={() => moveItem('bottom')} className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50">
                                <ChevronsDown className="w-3 h-3 text-gray-500" />
                             </button>
                         </div>
                    </div>
                    <div className="border border-gray-300 h-[300px] overflow-y-auto bg-white">
                        {visibleItems.map((item) => (
                            <div 
                                key={`visible-${item}`}
                                className={`px-3 py-2 text-sm border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedVisibleItems.includes(item) ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                                onClick={() => toggleSelection(item, 'visible')}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Options */}
            <div className="mt-4 flex items-center border-t border-gray-300 pt-4">
                 <div className="w-40 bg-[#F5F5F5] py-2 px-4 text-xs font-bold text-gray-700 border border-gray-200">
                     주문상세창 노출 설정
                 </div>
                 <div className="flex-1 p-2 border-t border-b border-r border-gray-200">
                    <select className="w-64 h-8 text-xs border border-gray-300 rounded-sm px-2 focus:outline-none">
                        <option value="tab">주문상세창 탭으로 띄우기</option>
                        <option value="one_tab">주문상세창 하나의 탭으로 띄우기</option>
                        <option value="new_window">주문상세창 새창으로 띄우기</option>
                        <option value="one_new_window">주문상세창 하나의 새창으로 띄우기</option>
                    </select>
                 </div>
            </div>

            {/* Warnings */}
            <div className="mt-4 space-y-1">
                <p className="text-xs text-red-500 flex items-center gap-1">
                     <span className="font-bold">!</span> 노출 조회항목이 많은 경우 주문 검색 속도가 느려질 수 있습니다.
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="font-bold">!</span> Shift 버튼을 누른 상태에서 선택하면 여러 항목을 동시에 선택할 수 있습니다.
                </p>
            </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-center gap-2 mb-6 px-6">
             <button 
                onClick={onConfirm.bind(null, visibleItems)}
                className="w-20 h-9 bg-[#A4A4A4] text-white text-sm font-medium rounded-sm hover:bg-[#888888] transition-colors"
            >
                설정
            </button>
             <button 
                onClick={onClose}
                className="w-20 h-9 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium rounded-sm"
            >
                취소
            </button>
        </div>
      </div>
    </div>
  );
}
