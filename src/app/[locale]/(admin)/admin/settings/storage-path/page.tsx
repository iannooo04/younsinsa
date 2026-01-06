"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function StoragePathSettingsPage() {
  const registeredStorageItems = [
    "상품 이미지 저장소",
    "추가상품 이미지 저장소",
    "사은품 이미지 저장소",
    "타임세일 이미지 저장소",
    "공급사 이미지 저장소",
    "게시판 파일 저장소"
  ];

  const filePathItems = [
    "상품 이미지 경로",
    "상품상세 설명 이미지 경로",
    "상품상세 공통정보 내용 이미지 경로",
    "추가상품 설명 이미지 경로",
    "사은품 설명 이미지 경로",
    "게시글 첨부파일 경로",
    "게시글 이미지 경로",
    "게시판 상단/하단 디자인 이미지 경로",
    "기획전 이벤트 내용 이미지 경로",
    "브랜드 상단 영역 꾸미기 이미지 경로",
    "카테고리 상단 영역 꾸미기 이미지 경로"
  ];

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="pb-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900">저장소 경로 일괄 관리</h1>
      </div>

      {/* Warning Box */}
      <div className="border border-red-200 bg-white p-6 flex items-start gap-4">
        <div className="pt-1">
            <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <div className="space-y-1 text-sm">
            <p className="text-red-600 font-bold">이미지 또는 파일의 저장소가 변경되었을 경우에만 사용해 주세요.</p>
            <p className="text-gray-600">이미지 또는 파일의 저장소가 변경되었을 경우 고도몰에 등록되어 있는 이미지와 파일의 경로만 수정이 가능합니다.</p>
            <p className="text-gray-600">고도몰에 저장되어 있는 이미지와 파일을 변경된 저장소로 업로드 하지 않으니 주의 하시기 바랍니다.</p>
        </div>
      </div>

      {/* Settings Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-800">저장소 경로 변경</h2>
            <div className="border border-gray-300 rounded-sm w-5 h-5 flex items-center justify-center text-gray-400 text-xs cursor-help">?</div>
        </div>
        
        <div className="border-t border-gray-500">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                <tr>
                    <th className="py-3 px-4 w-40 text-left">구분</th>
                    <th className="py-3 px-4 text-left">항목</th>
                    <th className="py-3 px-4 w-32 text-center">경로 변경</th>
                    <th className="py-3 px-4 w-48 text-center">마지막 변경일시</th>
                </tr>
            </thead>
            <tbody>
              {/* Registered Storage Items */}
              {registeredStorageItems.map((item, index) => (
                <tr key={`reg-${index}`} className="border-b border-gray-200 hover:bg-gray-50">
                    {index === 0 && (
                        <td rowSpan={registeredStorageItems.length} className="p-4 align-middle font-medium text-gray-600 border-r border-gray-200">
                            등록 저장소 변경
                        </td>
                    )}
                    <td className="p-4 text-gray-700 border-r border-gray-200">{item}</td>
                    <td className="p-4 text-center border-r border-gray-200">
                        <Button variant="outline" className="h-8 px-3 text-sm font-normal text-gray-600 bg-white border-gray-300 hover:bg-gray-50">
                            변경
                        </Button>
                    </td>
                    <td className="p-4 text-center text-gray-400">-</td>
                </tr>
              ))}

              {/* File Path Items */}
              {filePathItems.map((item, index) => (
                <tr key={`file-${index}`} className="border-b border-gray-200 hover:bg-gray-50">
                    {index === 0 && (
                        <td rowSpan={filePathItems.length} className="p-4 align-middle font-medium text-gray-600 border-r border-gray-200">
                            파일 경로 변경
                        </td>
                    )}
                    <td className="p-4 text-gray-700 border-r border-gray-200">{item}</td>
                    <td className="p-4 text-center border-r border-gray-200">
                        <Button variant="outline" className="h-8 px-3 text-sm font-normal text-gray-600 bg-white border-gray-300 hover:bg-gray-50">
                            변경
                        </Button>
                    </td>
                    <td className="p-4 text-center text-gray-400">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
       {/* Floating Buttons (Copied from other pages for consistency if needed, but not explicitly asked for, removing for now to match screenshot exactly which shows them cut off typically or just side buttons) */}
       <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
        <Button className="rounded-full w-12 h-12 bg-red-500 hover:bg-red-600 shadow-lg text-white p-0 flex items-center justify-center border-0">
             <span className="text-[10px] leading-tight flex flex-col items-center font-medium"><span>따라</span><span>하기</span></span>
        </Button>
        <Button className="rounded-full w-12 h-12 bg-purple-600 hover:bg-purple-700 shadow-lg text-white p-0 flex items-center justify-center border-0">
             <span className="text-[10px] leading-tight flex flex-col items-center font-medium"><span>따라</span><span>하기</span></span>
        </Button>
        <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0">
            <span className="text-xl">↑</span>
        </Button>
        <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0">
            <span className="text-xl">↓</span>
        </Button>
      </div>

    </div>
  );
}
