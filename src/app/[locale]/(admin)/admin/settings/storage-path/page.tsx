"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, Save } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { getStorageSettingsAction, updateStorageSettingsAction } from "@/actions/basic-policy-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const [isPending, startTransition] = useTransition();

  const fetchData = async () => {
      const result = await getStorageSettingsAction();
      if (result.success && result.settings) {
          // Normalize data structure if needed
          setStoragePaths(result.settings.storagePaths as any || {});
          setFilePaths(result.settings.filePaths as any || {});
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
              storagePaths: newStoragePaths,
              filePaths: newFilePaths
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
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>경로 변경</DialogTitle>
                  <DialogDescription>
                      {editingItem?.label}의 저장소 경로를 변경합니다.
                  </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                  <div className="space-y-2">
                      <Label htmlFor="path-input">새로운 경로</Label>
                      <Input 
                        id="path-input" 
                        value={newPath} 
                        onChange={(e) => setNewPath(e.target.value)} 
                        placeholder="/data/skin/front/..."
                      />
                  </div>
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>취소</Button>
                  <Button onClick={handleSavePath} disabled={isPending}>
                    {isPending ? "저장 중..." : "저장"}
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  );
}
