"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { getStorageSettingsAction, updateStorageSettingsAction } from "@/actions/basic-policy-actions";
import { Prisma } from "@/generated/prisma";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

// Define the structure of our settings
interface PathSetting {
    path: string;
    updatedAt: string | null;
}

interface StorageSettingsMap {
    [key: string]: PathSetting;
}

const STORAGE_KEYS = [
    { label: "상품 이미지 저장소", key: "productImageStorage" },
    { label: "추가상품 이미지 저장소", key: "additionalProductImageStorage" },
    { label: "사은품 이미지 저장소", key: "giftImageStorage" },
    { label: "타임세일 이미지 저장소", key: "timeSaleImageStorage" },
    { label: "공급사 이미지 저장소", key: "supplierImageStorage" },
    { label: "게시판 파일 저장소", key: "boardFileStorage" },
];

const FILE_PATH_KEYS = [
    { label: "상품 이미지 경로", key: "productImagePath" },
    { label: "상품상세 설명 이미지 경로", key: "productDetailImagePath" },
    { label: "상품상세 공통정보 내용 이미지 경로", key: "productCommonInfoImagePath" },
    { label: "추가상품 설명 이미지 경로", key: "additionalProductDescriptionImagePath" },
    { label: "사은품 설명 이미지 경로", key: "giftDescriptionImagePath" },
    { label: "게시글 첨부파일 경로", key: "boardFilePath" },
    { label: "게시글 이미지 경로", key: "boardImagePath" },
    { label: "게시판 상단/하단 디자인 이미지 경로", key: "boardDesignImagePath" },
    { label: "기획전 이벤트 내용 이미지 경로", key: "promotionEventImagePath" },
    { label: "브랜드 상단 영역 꾸미기 이미지 경로", key: "brandTopDecorationImagePath" },
    { label: "카테고리 상단 영역 꾸미기 이미지 경로", key: "categoryTopDecorationImagePath" },
];

export default function StoragePathSettingsPage() {
  const [storagePaths, setStoragePaths] = useState<StorageSettingsMap>({});
  const [filePaths, setFilePaths] = useState<StorageSettingsMap>({});
  
  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ type: 'storage' | 'file', key: string, label: string, currentPath: string } | null>(null);
  const [newPath, setNewPath] = useState("");
  const [targetDomainType, setTargetDomainType] = useState("기본 경로");
  const [changeDomainType, setChangeDomainType] = useState("기본 경로");

  const [isPending, startTransition] = useTransition();

  const fetchData = async () => {
      const result = await getStorageSettingsAction();
      if (result.success && result.settings) {
          // Normalize data structure if needed
          setStoragePaths((result.settings.storagePaths as unknown as StorageSettingsMap) || {});
          setFilePaths((result.settings.filePaths as unknown as StorageSettingsMap) || {});
      }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEditDialog = (type: 'storage' | 'file', key: string, label: string, currentData: PathSetting | undefined) => {
      setEditingItem({
          type,
          key,
          label,
          currentPath: currentData?.path || ""
      });
      setNewPath(currentData?.path || "");
      setTargetDomainType("기본 경로");
      setChangeDomainType("기본 경로");
      setIsDialogOpen(true);
  };

  const handleSavePath = () => {
      if (!editingItem) return;

      const timestamp = new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0]; // Simple formatting

      const updatedSetting: PathSetting = {
          path: newPath,
          updatedAt: timestamp
      };

      const newStoragePaths = { ...storagePaths };
      const newFilePaths = { ...filePaths };

      if (editingItem.type === 'storage') {
          newStoragePaths[editingItem.key] = updatedSetting;
      } else {
          newFilePaths[editingItem.key] = updatedSetting;
      }

      startTransition(async () => {
          const result = await updateStorageSettingsAction({
              storagePaths: newStoragePaths as unknown as Prisma.InputJsonValue,
              filePaths: newFilePaths as unknown as Prisma.InputJsonValue
          });

          if (result.success) {
              setStoragePaths(newStoragePaths);
              setFilePaths(newFilePaths);
              setIsDialogOpen(false);
          } else {
              alert(result.error || "저장 실패");
          }
      });
  };

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
              {STORAGE_KEYS.map((item, index) => {
                  const data = storagePaths[item.key];
                  return (
                    <tr key={item.key} className="border-b border-gray-200 hover:bg-gray-50">
                        {index === 0 && (
                            <td rowSpan={STORAGE_KEYS.length} className="p-4 align-middle font-medium text-gray-600 border-r border-gray-200 bg-white">
                                등록 저장소 변경
                            </td>
                        )}
                        <td className="p-4 text-gray-700 border-r border-gray-200">
                            <div>{item.label}</div>
                            {data?.path && <div className="text-xs text-blue-600 mt-1">{data.path}</div>}
                        </td>
                        <td className="p-4 text-center border-r border-gray-200">
                            <Button variant="outline" size="sm" onClick={() => openEditDialog('storage', item.key, item.label, data)}>
                                변경
                            </Button>
                        </td>
                        <td className="p-4 text-center text-gray-400">
                            {data?.updatedAt || "-"}
                        </td>
                    </tr>
                  );
              })}

              {/* File Path Items */}
              {FILE_PATH_KEYS.map((item, index) => {
                  const data = filePaths[item.key];
                  return (
                    <tr key={item.key} className="border-b border-gray-200 hover:bg-gray-50">
                        {index === 0 && (
                            <td rowSpan={FILE_PATH_KEYS.length} className="p-4 align-middle font-medium text-gray-600 border-r border-gray-200 bg-white">
                                파일 경로 변경
                            </td>
                        )}
                        <td className="p-4 text-gray-700 border-r border-gray-200">
                            <div>{item.label}</div>
                            {data?.path && <div className="text-xs text-blue-600 mt-1">{data.path}</div>}
                        </td>
                        <td className="p-4 text-center border-r border-gray-200">
                            <Button variant="outline" size="sm" onClick={() => openEditDialog('file', item.key, item.label, data)}>
                                변경
                            </Button>
                        </td>
                        <td className="p-4 text-center text-gray-400">
                             {data?.updatedAt || "-"}
                        </td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-white overflow-hidden block">
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
                <DialogTitle className="text-xl font-bold text-gray-900">저장소 경로 변경하기</DialogTitle>
                <DialogDescription className="sr-only">
                    {editingItem?.label}의 저장소 경로를 변경합니다.
                </DialogDescription>
            </div>
            
            <div className="p-6">
                <h3 className="text-base font-medium text-gray-800 mb-3">{editingItem?.label}</h3>
                
                <div className="border-t border-gray-400 border-b border-gray-200 mb-4">
                    {/* Header */}
                    <div className="flex border-b border-gray-200 bg-[#bfbfbf] text-white text-center text-xs font-normal">
                        <div className="w-[140px] py-2 border-r border-[#d4d4d4] bg-[#b3b3b3]">구분</div>
                        <div className="flex-1 py-2 bg-[#b3b3b3]">도메인</div>
                    </div>
                    
                    {/* Row 1: Target Domain */}
                    <div className="flex border-b border-gray-200 items-center h-12">
                        <div className="w-[140px] h-full flex items-center pl-4 text-sm text-gray-900 bg-white border-r border-gray-200">변경 대상 도메인</div>
                        <div className="flex-1 h-full p-2 bg-white flex items-center gap-1">
                            <select 
                                className="h-8 border border-gray-300 rounded-sm text-sm px-2 w-[120px]"
                                value={targetDomainType}
                                onChange={(e) => setTargetDomainType(e.target.value)}
                            >
                                <option value="">=저장소 선택=</option>
                                <option value="기본 경로">기본 경로</option>
                                <option value="직접입력">직접입력</option>
                            </select>
                            {targetDomainType === "직접입력" ? (
                                <input 
                                    type="text" 
                                    className="h-8 flex-1 border border-gray-300 rounded-sm px-2 text-sm outline-none focus:border-gray-500"
                                    placeholder="http(s)를 포함하여 도메인을 입력하세요."
                                />
                            ) : (
                                <div className="h-8 flex-1 bg-[#f5f5f5] border border-gray-300 rounded-sm px-2 flex items-center text-sm text-gray-500 cursor-not-allowed">
                                    /
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Row 2: Change Domain */}
                    <div className="flex items-center h-12">
                        <div className="w-[140px] h-full flex items-center pl-4 text-sm text-gray-900 bg-white border-r border-gray-200">변경 도메인</div>
                        <div className="flex-1 h-full p-2 bg-white flex items-center gap-1">
                            <select 
                                className="h-8 border border-gray-300 rounded-sm text-sm px-2 w-[120px]"
                                value={changeDomainType}
                                onChange={(e) => setChangeDomainType(e.target.value)}
                            >
                                <option value="">=저장소 선택=</option>
                                <option value="기본 경로">기본 경로</option>
                                <option value="직접입력">직접입력</option>
                            </select>
                            {changeDomainType === "직접입력" ? (
                                <input 
                                    type="text" 
                                    className="h-8 flex-1 border border-gray-300 rounded-sm px-2 text-sm outline-none focus:border-gray-500"
                                    value={newPath}
                                    onChange={(e) => setNewPath(e.target.value)}
                                    placeholder="http(s)를 포함하여 도메인을 입력하세요."
                                />
                            ) : (
                                <input 
                                    type="text" 
                                    className="h-8 flex-1 border border-gray-300 rounded-sm px-2 text-sm outline-none focus:border-gray-500"
                                    value={newPath}
                                    onChange={(e) => setNewPath(e.target.value)}
                                    placeholder="/"
                                />
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="text-[11px] text-gray-500 space-y-1.5">
                    <div className="flex items-start gap-1.5">
                        <span className="w-3.5 h-3.5 bg-[#666] text-white rounded-[2px] flex items-center justify-center font-bold mt-[1px] text-[10px]">!</span>
                        <span>저장소 경로 변경은 1회 1번 변경이 가능합니다.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                        <span className="w-3.5 h-3.5 bg-[#666] text-white rounded-[2px] flex items-center justify-center font-bold mt-[1px] text-[10px]">!</span>
                        <span>변경 대상 도메인이 다수일 경우 도메인의 수만큼 반복해서 변경 도메인으로 변경하시기 바랍니다.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                        <span className="w-3.5 h-3.5 bg-[#666] text-white rounded-[2px] flex items-center justify-center font-bold mt-[1px] text-[10px]">!</span>
                        <span>도메인을 직접 입력할 경우 입력한 도메인을 저장하지 않으므로 신중하게 변경하시기 바랍니다.</span>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center gap-1.5 p-6 border-t border-gray-200">
                <button onClick={() => setIsDialogOpen(false)} className="w-20 h-10 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-sm hover:bg-gray-50">취소</button>
                <button onClick={handleSavePath} disabled={isPending} className="w-20 h-10 bg-[#555] text-white text-sm font-medium rounded-sm hover:bg-[#444] disabled:opacity-50">확인</button>
            </div>
          </DialogContent>
      </Dialog>
    </div>
  );
}
