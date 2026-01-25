"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface EssentialInfo {
  id: number;
  no: number;
  name: string;
  createdAt: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (info: EssentialInfo) => void;
}

export default function EssentialInfoPopup({ isOpen, onClose }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="w-[800px] bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">상품 필수정보</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={28} strokeWidth={1} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Area */}
          <div className="border border-gray-200 flex items-center">
            <div className="w-32 bg-gray-50 p-4 text-sm font-medium text-gray-700 border-r border-gray-200">
              필수정보명
            </div>
            <div className="flex-1 p-3 flex gap-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 px-3 py-1.5 outline-none focus:border-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-[#666] text-white px-8 py-1.5 text-sm hover:bg-[#555] transition-colors">
                검색
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="border-t border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-[#bfbfbf] text-white">
                <tr>
                  <th className="w-16 py-3 font-normal border-r border-gray-300">선택</th>
                  <th className="w-16 py-3 font-normal border-r border-gray-300">번호</th>
                  <th className="py-3 font-normal border-r border-gray-300">필수정보명</th>
                  <th className="w-40 py-3 font-normal">등록일</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    검색을 이용해 주세요.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={onClose}
              className="bg-[#666] text-white px-10 py-2.5 text-sm hover:bg-[#555] transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
