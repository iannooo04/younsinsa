"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ChevronUp,
  Folder,
  HelpCircle,
  Play
} from "lucide-react";
import React, { useEffect, useState, useTransition, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { 
    getCategoriesAction, 
    createCategoryAction, 
    updateCategoryAction,
    deleteCategoryAction
} from "@/actions/category-actions";
import { uploadImageAction } from "@/actions/product-actions";
import { Category } from "@/generated/prisma";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MemberGradeSelectPopup from "@/components/admin/MemberGradeSelectPopup";

interface CategoryWithChildren extends Category {
    children?: CategoryWithChildren[];
    displaySettings?: {
        displayMethod: string;
    } | null;
}

const buildTree = (items: CategoryWithChildren[]) => {
    const rootItems: CategoryWithChildren[] = [];
    const lookup: { [key: string]: CategoryWithChildren } = {};

    for (const item of items) {
        lookup[item.id] = { ...item, children: [] };
    }

    for (const item of items) {
        if (item.parentId) {
            const parent = lookup[item.parentId];
            if (parent) {
                parent.children?.push(lookup[item.id]);
            } else {
                rootItems.push(lookup[item.id]);
            }
        } else {
            rootItems.push(lookup[item.id]);
        }
    }
    return rootItems;
};


export default function CategoryManagementPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryWithChildren[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithChildren | null>(null);

  const [isPending, startTransition] = useTransition();
  const [isGradePopupOpen, setIsGradePopupOpen] = useState(false);

  // Expanded UI States
  const [sectionsExpanded, setSectionsExpanded] = useState({
      basicInfo: true,
  });

  const toggleSection = (section: keyof typeof sectionsExpanded) => {
      setSectionsExpanded(prev => ({...prev, [section]: !prev[section]}));
  };

  const [formData, setFormData] = useState({
      name: "",
      type: "GENERAL",
      displayStatusPC: "DISPLAY",
      displayStatusMobile: "DISPLAY",
      parentId: null as string | null,
      code: "",
      customUrl: "",
      
      // New fields state (mocked for UI)
      exposureShops: ['all'],
      nameCN: "", // Example for multi-lang
      adultAuth: "NOT_USE",
      accessRights: "ALL",
      productDisplaySort: "AUTO",
      


  });

  const [mode, setMode] = useState<"create_root" | "create_sub" | "edit" | null>(null);

  // File Upload State & Refs
  const [pcImageName, setPcImageName] = useState("");
  const [_mobileImageName, _setMobileImageName] = useState("");

  const pcImageInputRef = useRef<HTMLInputElement>(null);
  const _mobileImageInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'pc' | 'mobile') => {
      const file = e.target.files?.[0];
      if (file) {
          if (type === 'pc') setPcImageName(file.name);
          else if (type === 'mobile') _setMobileImageName(file.name);
      }
  };

  const fetchCategories = React.useCallback(async () => {
      const res = await getCategoriesAction();
      const tree = buildTree(res as CategoryWithChildren[]);
      setCategories(tree);
  }, []);

  useEffect(() => {
      fetchCategories();
  }, [fetchCategories]);

  const handleSelectCategory = (cat: CategoryWithChildren) => {
      setSelectedCategory(cat);
      setMode("edit");
      // Populate form with existing data + defaults for new fields
      setFormData({
          ...formData, // Keep defaults for missing fields
          name: cat.name,
          parentId: cat.parentId,
          type: cat.type || "GENERAL",
          displayStatusPC: cat.displayStatusPC || "DISPLAY",
          displayStatusMobile: cat.displayStatusMobile || "DISPLAY",
          code: cat.code || "",
          customUrl: cat.customUrl || "",
      });
  };

  const handleCreateRoot = () => {
      setSelectedCategory(null);
      setMode("create_root");
      setFormData({
          ...formData,
          name: "",
          parentId: null,
          type: "GENERAL",
          displayStatusPC: "DISPLAY",
          displayStatusMobile: "DISPLAY",
          code: "",
          customUrl: "",
      });
  };

  const handleCreateSub = () => {
      if (!selectedCategory) {
          alert("상위 카테고리를 선택해주세요.");
          return;
      }
      setMode("create_sub");
      setFormData({
          ...formData,
          name: "",
          parentId: selectedCategory.id,
          type: "GENERAL",
          displayStatusPC: "DISPLAY",
          displayStatusMobile: "DISPLAY",
          code: "",
          customUrl: "",
      });
  };

  const handleSave = async () => {
      // Because we await image uploads, we cannot place them inside startTransition.
      // We will do the async work first, then wrap the action calls in startTransition.
      let uploadedImageUrl: string | undefined = undefined;

      try {
          if (pcImageInputRef.current?.files?.[0]) {
              const uploadData = new FormData();
              uploadData.append("file", pcImageInputRef.current.files[0]);
              const res = await uploadImageAction(uploadData);
              if (res.success) uploadedImageUrl = res.url;
          }
      } catch (e) {
          console.error("Image upload failed:", e);
          alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
          return;
      }

      startTransition(async () => {
          let result;
          if (mode === "edit" && selectedCategory) {
             result = await updateCategoryAction(selectedCategory.id, {
                 name: formData.name,
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 type: formData.type as any, // Cast as needed for Prisma enum
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 displayStatusPC: formData.displayStatusPC as any,
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 displayStatusMobile: formData.displayStatusMobile as any,
                 code: formData.code,
                 customUrl: formData.customUrl,
                 imageUrl: uploadedImageUrl,
             });
          } else {
             result = await createCategoryAction({
                 name: formData.name,
                 parentId: formData.parentId,
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 type: formData.type as any,
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 displayStatusPC: formData.displayStatusPC as any,
                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
                 displayStatusMobile: formData.displayStatusMobile as any,
                 code: formData.code,
                 customUrl: formData.customUrl,
                 imageUrl: uploadedImageUrl,
             });
          }

          if (result.success) {
              alert("저장되었습니다.");
              
              // 폼 리셋 (이미지 파일)
              if (pcImageInputRef.current) pcImageInputRef.current.value = "";
              setPcImageName("");

              fetchCategories();
          } else {
              alert(result.error || "실패했습니다.");
          }
      });
  };

  const handleDelete = async () => {
      if (!selectedCategory) return;
      if (!confirm("정말 삭제하시겠습니까?")) return;

      startTransition(async () => {
          const res = await deleteCategoryAction(selectedCategory.id);
          if (res.success) {
              alert("삭제되었습니다.");
              fetchCategories();
              setSelectedCategory(null);
              setMode(null);
          } else {
              alert(res.error);
          }
      });
  };

  const renderTree = (nodes: CategoryWithChildren[], depth = 0) => {
      return nodes.map(node => (
          <div key={node.id} className="select-none">
              <div 
                  className={`flex items-center gap-1 py-1 cursor-pointer hover:bg-blue-50 ${selectedCategory?.id === node.id ? 'bg-blue-100' : ''}`}
                  style={{ paddingLeft: `${depth * 16}px` }}
                  onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCategory(node);
                  }}
              >
                  {node.children && node.children.length > 0 ? (
                      <Folder className="w-4 h-4 text-sky-300 fill-sky-300" />
                  ) : (
                      <Folder className="w-4 h-4 text-gray-300 fill-gray-300" />
                  )}
                  <span className="text-sm text-gray-700">{node.name}</span>
              </div>
              {node.children && node.children.length > 0 && (
                  <div>{renderTree(node.children, depth + 1)}</div>
              )}
          </div>
      ));
  };


  return (
    <div className="p-6 bg-white min-h-screen font-sans text-sm pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-900 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">카테고리 관리</h1>
        <Button onClick={handleSave} disabled={isPending} className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm">
          {isPending ? "저장중" : "저장"}
        </Button>
      </div>

      <div className="flex gap-4 h-full">
        {/* Left Sidebar: Category Tree */}
        <div className="w-[250px] flex-shrink-0 min-h-[800px]">
          <div className="flex gap-1 mb-2">
            <Button 
                variant={mode === 'create_root' ? 'default' : 'outline'}
                size="sm" 
                className={`h-7 text-xs px-3 rounded-sm transition-colors ${mode === 'create_root' ? 'bg-[#FF424D] hover:bg-[#FF424D]/90 text-white border-0' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`} 
                onClick={handleCreateRoot}
            >
                1차 카테고리 생성
            </Button>
            <Button 
                variant={mode === 'create_sub' ? 'default' : 'outline'}
                size="sm" 
                className={`h-7 text-xs px-3 rounded-sm transition-colors ${mode === 'create_sub' ? 'bg-[#FF424D] hover:bg-[#FF424D]/90 text-white border-0' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`} 
                onClick={handleCreateSub}
            >
                하위 카테고리 생성
            </Button>

          </div>
          
          <div className="border border-gray-300 h-[800px] bg-white p-2 overflow-y-auto">
             <div className="tree-item flex items-center gap-1 py-1 text-gray-700 cursor-pointer">
                 <Play className="w-2 h-2 fill-gray-500 text-gray-500 transform rotate-90" />
                 <Folder className="w-4 h-4 text-orange-200 fill-orange-200" />
                 <span className="text-sm font-bold">카테고리</span>
             </div>
             <div className="pl-4 mt-1">
                 {renderTree(categories)}
             </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-8 min-w-0">
          
          {/* Section 1: Category Info */}
          <div>
              <div className="flex items-center justify-between pb-2 border-b border-gray-300">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">카테고리 정보</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                   <div className="flex items-center gap-2">
                       <Button 
                           variant="secondary" 
                           size="sm" 
                           className="h-7 text-xs bg-gray-400 text-white hover:bg-gray-500 rounded-sm"
                           onClick={() => router.push('/admin/categories/product-display')}
                       >
                           상품진열
                       </Button>
                       <button onClick={() => toggleSection('basicInfo')} className="text-blue-500 text-xs font-bold flex items-center">
                           {sectionsExpanded.basicInfo ? '닫힘' : '열림'} <ChevronUp className={`w-3 h-3 ml-1 transform ${sectionsExpanded.basicInfo ? '' : 'rotate-180'}`} />
                       </button>
                   </div>
              </div>

              {sectionsExpanded.basicInfo && (
              <div className="border border-t-0 border-gray-300 text-xs text-gray-700 border-l-0 border-r-0">
                  {/* Current Category (Edit Mode) */}
                  {mode === 'edit' && selectedCategory && (
                  <div className="flex border-b border-gray-200 min-h-[50px] bg-red-50">
                      <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">현재 카테고리</div>
                      <div className="flex-1 p-3 flex items-center justify-between">
                          <span className="font-bold">{selectedCategory.name}</span>
                          <Button 
                              variant="destructive" 
                              size="sm" 
                              className="h-7 text-xs px-3 rounded-sm bg-red-500 hover:bg-red-600 text-white"
                              onClick={handleDelete}
                              disabled={isPending}
                          >
                              삭제
                          </Button>
                      </div>
                  </div>
                  )}

                  {/* Exposure Shops */}
                  <div className="flex border-b border-gray-200 min-h-[50px]">
                      <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">노출상점</div>
                      <div className="flex-1 p-3 flex flex-col gap-2 justify-center">
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-1"><Checkbox checked className="border-gray-300 bg-red-500 border-red-500" /> <span className="text-red-500 font-bold">전체</span></label>
                          </div>
                          <label className="flex items-center gap-1 text-gray-500"><Checkbox className="border-gray-300" /> 하위 카테고리 동일 적용</label>
                      </div>
                  </div>

                  {/* Category Name */}
                  <div className="flex border-b border-gray-200 min-h-[80px]">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center gap-1 border-r border-gray-200">
                           <span className="text-red-500 font-bold">•</span> 카테고리명 <HelpCircle className="w-3 h-3 text-gray-400" />
                       </div>
                       <div className="flex-1 p-3 space-y-2">
                           <div className="flex items-center gap-2">
                               <div className="relative">
                                   <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-[300px] h-7 text-xs pr-10" />
                                   <span className="absolute right-2 top-1.5 text-[10px] text-red-500 font-bold">{formData.name.length} / 30</span>
                               </div>
                           </div>
                           <p className="flex flex-col gap-1 text-gray-400 mt-2">
                                <span className="flex items-center gap-1"><span className="bg-black text-white text-[10px] px-1 font-bold rounded-sm">!</span> 기본적으로 입력된 텍스트로 해당 카테고리가 보여집니다</span>
                                <span className="ml-5">카테고리를 이미지로 노출하려면 아래 "카테고리 이미지등록" 항목에 이미지를 등록하세요.</span>
                           </p>
                       </div>
                  </div>

                  {/* Custom URL */}
                  <div className="flex border-b border-gray-200 min-h-[50px]">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center gap-1 border-r border-gray-200">
                           커스텀 주소 <span title="입력 시 기본 링크 대신 이 주소로 연결됩니다." className="inline-flex cursor-help"><HelpCircle className="w-3 h-3 text-gray-400" /></span>
                       </div>
                       <div className="flex-1 p-3 flex flex-col justify-center">
                           <div className="flex items-center gap-2">
                               <Input value={formData.customUrl} onChange={(e) => setFormData({...formData, customUrl: e.target.value})} placeholder="예: https://example.com/promotion 또는 /exhibition/special" className="w-[400px] h-7 text-xs" />
                           </div>
                           <p className="text-gray-400 mt-1 text-[11px]">입력하지 않으면 기본 주소(/category/카테고리ID)로 연결됩니다.</p>
                       </div>
                  </div>

                  {/* Category Type */}
                  <div className="flex border-b border-gray-200 min-h-[50px]">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">카테고리 타입</div>
                       <div className="flex-1 p-3">
                           <RadioGroup value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})} className="flex flex-col gap-2">
                               <div className="flex items-center gap-2">
                                  <RadioGroupItem value="GENERAL" id="t-gen" className="text-red-500 border-red-500" />
                                  <Label htmlFor="t-gen" className="font-normal">일반 카테고리 <span className="text-blue-500">(카테고리 페이지가 있고, 상품연결이 되는 일반적인 카테고리입니다)</span></Label>
                               </div>
                               <div className="flex items-center gap-2">
                                  <RadioGroupItem value="GROUP" id="t-group" className="border-gray-400" />
                                  <Label htmlFor="t-group" className="font-normal text-gray-500">그룹(구분) 카테고리 <span className="text-blue-500">(카테고리 페이지가 없고, 상품연결이 안되는 그룹(구분) 카테고리입니다)</span></Label>
                               </div>
                           </RadioGroup>
                       </div>
                  </div>

                  {/* Display Status */}
                  <div className="flex border-b border-gray-200 min-h-[50px]">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">노출상태</div>
                       <div className="flex-1 p-3 flex items-center">
                           <RadioGroup value={formData.displayStatusPC} onValueChange={(v) => setFormData({...formData, displayStatusPC: v, displayStatusMobile: v})} className="flex gap-4">
                               <div className="flex items-center gap-2">
                                  <RadioGroupItem value="DISPLAY" id="disp-yes" className="text-red-500 border-red-500" />
                                  <Label htmlFor="disp-yes" className="font-normal">노출함</Label>
                               </div>
                               <div className="flex items-center gap-2">
                                  <RadioGroupItem value="HIDDEN" id="disp-no" className="border-gray-400" />
                                  <Label htmlFor="disp-no" className="font-normal text-gray-500">노출안함</Label>
                               </div>
                           </RadioGroup>
                       </div>
                  </div>

                   {/* Images */}
                  <div className="flex border-b border-gray-200 min-h-[50px]">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">카테고리 이미지 등록</div>
                       <div className="flex-1 p-3 flex items-center gap-4">
                           <div className="flex items-center gap-2">
                               <input 
                                   type="file" 
                                   className="hidden" 
                                   ref={pcImageInputRef} 
                                   onChange={(e) => handleFileChange(e, 'pc')}
                               />
                               <Button 
                                   className="h-7 text-xs px-2 bg-gray-400 text-white border-0 hover:bg-gray-500 rounded-sm"
                                   onClick={() => pcImageInputRef.current?.click()}
                               >
                                   찾아보기
                               </Button>
                               <div className="w-32 h-7 bg-gray-100 border border-gray-300 flex items-center px-2 text-xs text-gray-600 overflow-hidden whitespace-nowrap">
                                   {pcImageName}
                               </div>
                           </div>
                       </div>
                  </div>

                  {/* Access Rights */}
                  <div className="flex border-b border-gray-200 min-h-[50px]">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex flex-col justify-center border-r border-gray-200">접근 권한</div>
                       <div className="flex-1 p-3 flex flex-col gap-2 justify-center">
                           <div className="flex items-center gap-4">
                               <RadioGroup 
                                   value={formData.accessRights} 
                                   onValueChange={(v) => {
                                       setFormData({...formData, accessRights: v});
                                       if (v === 'GRADE') {
                                           setIsGradePopupOpen(true);
                                       }
                                   }} 
                                   className="flex items-center gap-4"
                               >
                                   <div className="flex items-center gap-2">
                                      <RadioGroupItem value="ALL" id="acc-all" className="text-red-500 border-red-500" />
                                      <Label htmlFor="acc-all" className="font-normal whitespace-nowrap cursor-pointer">전체(회원+비회원)</Label>
                                   </div>
                                   <div className="flex items-center gap-2">
                                      <RadioGroupItem value="MEMBER" id="acc-mem" className="border-gray-400" />
                                      <Label htmlFor="acc-mem" className="font-normal text-gray-500 whitespace-nowrap cursor-pointer">회원전용(비회원제외)</Label>
                                   </div>
                                   <div className="flex items-center gap-2 whitespace-nowrap">
                                      <RadioGroupItem value="GRADE" id="acc-grade" className="border-gray-400" />
                                      <Label htmlFor="acc-grade" className="font-normal text-gray-500 whitespace-nowrap cursor-pointer">특정 회원등급</Label>
                                      <Button 
                                        type="button"
                                        className="h-6 bg-black text-white text-[11px] border-0 px-2 ml-1 whitespace-nowrap rounded-sm hover:bg-gray-800"
                                        onClick={() => setIsGradePopupOpen(true)}
                                      >
                                          회원등급 선택
                                      </Button>
                                   </div>
                               </RadioGroup>
                               <label className="flex items-center gap-1 text-gray-800 whitespace-nowrap select-none cursor-pointer">
                                   ( <Checkbox checked className="border-gray-300 w-4 h-4 rounded-sm data-[state=checked]:bg-[#FF424D] data-[state=checked]:border-[#FF424D]" /> 
                                   <span className="text-sm">접근불가 고객 카테고리 노출함</span> )
                               </label>
                           </div>
                           <label className="flex items-center gap-1 text-gray-600 select-none cursor-pointer">
                               <Checkbox className="border-gray-300 w-4 h-4 rounded-sm" /> 
                               <span className="text-sm">하위 카테고리 동일 적용</span>
                           </label>
                       </div>
                  </div>

                  {/* Product Display Sort */}
                  <div className="flex border-b border-gray-200 min-h-[50px]">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex flex-col justify-center border-r border-gray-200">상품진열 타입</div>
                       <div className="flex-1 p-3">
                           <RadioGroup value={formData.productDisplaySort} onValueChange={(v) => setFormData({...formData, productDisplaySort: v})} className="flex flex-row items-center gap-6">
                               <div className="flex items-center gap-2">
                                  <RadioGroupItem value="AUTO" id="disp-auto" className="text-red-500 border-red-500" />
                                  <Label htmlFor="disp-auto" className="font-normal">자동진열</Label>
                                  <Select defaultValue="recent_desc">
                                      <SelectTrigger className="w-48 h-7 text-xs border-gray-300 rounded-sm"><SelectValue placeholder="최근 등록 상품 위로" /></SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="recent_desc">최근 등록 상품 위로</SelectItem>
                                          <SelectItem value="recent_asc">최근 등록 상품 아래로</SelectItem>
                                          <SelectItem value="updated_desc">최근 수정 상품 위로</SelectItem>
                                          <SelectItem value="updated_asc">최근 수정 상품 아래로</SelectItem>
                                          <SelectItem value="name_asc">상품명 가나다순</SelectItem>
                                          <SelectItem value="name_desc">상품명 가나다역순</SelectItem>
                                          <SelectItem value="price_desc">판매가 높은 상품 위로</SelectItem>
                                          <SelectItem value="price_asc">판매가 높은 상품 아래로</SelectItem>
                                          <SelectItem value="sales_desc">판매량 높은 상품 위로</SelectItem>
                                          <SelectItem value="sales_asc">판매량 높은 상품 아래로</SelectItem>
                                          <SelectItem value="views_desc">조회수 높은 상품 위로</SelectItem>
                                          <SelectItem value="views_asc">조회수 높은 상품 아래로</SelectItem>
                                      </SelectContent>
                                  </Select>
                               </div>
                               <div className="flex items-center gap-2">
                                  <RadioGroupItem value="MANUAL" id="disp-manual" className="border-gray-400" />
                                  <Label htmlFor="disp-manual" className="font-normal text-gray-500">수동진열</Label>
                               </div>
                           </RadioGroup>
                           <div className="text-blue-500 text-xs mt-1">수동진열 : {'{카테고리 페이지 상품진열}'}에서 진열순서를 별도로 설정할 수 있습니다.</div>
                       </div>
                  </div>

              </div>
              )}
          </div>


          <MemberGradeSelectPopup 
            isOpen={isGradePopupOpen} 
            onClose={() => setIsGradePopupOpen(false)} 
            onConfirm={(selected) => {
                console.log("Selected grades:", selected);
            }} 
          />
        </div>
      </div>
    </div>
  );
}

