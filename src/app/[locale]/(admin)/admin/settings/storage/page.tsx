"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
// Check if we have RadioGroup, usually we do in shadcn-like setups. I'll stick to native input if I can't verify,
// but looking at previous file `select` was available. I'll use native inputs for simplicity and speed unless I see a reason not to.

export default function FileStorageSettingsPage() {
  return (
    <div className="p-6 space-y-6 bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900">파일 저장소 관리</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm h-10 px-4">
                저장소 경로 일괄 관리
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white px-8 rounded-sm h-10">
                저장
            </Button>
        </div>
      </div>

      {/* Storage Settings Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-800">파일 저장소 관리</h2>
            <div className="border border-gray-300 rounded-sm w-5 h-5 flex items-center justify-center text-gray-400 text-xs cursor-help">?</div>
        </div>
        
        <div className="border-t border-gray-500">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {/* Default Storage Row */}
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700 align-top">기본 저장소</th>
                <td className="p-0">
                  {/* Inner Table-like structure for the specific details */}
                    <div className="w-full">
                        <div className="flex border-b border-gray-100">
                            <div className="w-32 p-3 bg-gray-50 text-gray-600 font-medium">스킨</div>
                            <div className="p-3 text-gray-700 flex-1">
                                /data <span className="text-gray-400 text-xs ml-1">※ 기본적인 모든 이미지 및 파일</span>
                            </div>
                        </div>
                        <div className="flex border-b border-gray-100">
                            <div className="w-32 p-3 bg-gray-50 text-gray-600 font-medium">상품, 게시판</div>
                            <div className="p-3 text-gray-700 flex-1">NHN Cloud Storage</div>
                        </div>
                        <div className="p-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="default_storage_setting" className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-500" defaultChecked />
                                <span className="text-gray-700">상품 등록 시 기본 저장소로 노출되도록 설정합니다.</span>
                            </label>
                        </div>
                    </div>
                </td>
              </tr>

              {/* Add Storage Row */}
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700 bg-opacity-50">파일저장소 추가</th>
                <td className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600 h-8 px-3 rounded-sm flex items-center gap-1">
                            <Plus className="w-3 h-3" />
                            추가
                        </Button>
                        <Button variant="outline" className="border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600 h-8 px-3 rounded-sm flex items-center gap-1">
                            <Plus className="w-3 h-3" />
                            AWS(S3) 추가
                        </Button>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span className="bg-gray-600 text-white w-4 h-4 flex items-center justify-center rounded-[2px] text-[10px] font-bold">!</span>
                        <span>최대 5개까지 파일 저장소를 추가하실 수 있습니다.</span>
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
