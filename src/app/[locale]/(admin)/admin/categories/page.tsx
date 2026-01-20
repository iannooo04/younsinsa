"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ChevronUp,
  Folder,
  HelpCircle,
  Play,
  File,
  Plus,
  Minus,

} from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { 
    getCategoriesAction, 
    createCategoryAction, 
    updateCategoryAction, 
    deleteCategoryAction 
} from "@/actions/category-actions";
import { Category } from "@/generated/prisma";

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
                // Orphan or parent not found, treat as root?
                rootItems.push(lookup[item.id]);
            }
        } else {
            rootItems.push(lookup[item.id]);
        }
    }
    return rootItems;
};

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState<CategoryWithChildren[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<CategoryWithChildren | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form State
  const [formData, setFormData] = useState({
      name: "",
      nameCN: "",
      nameEN: "",
      type: "GENERAL", // GENERAL, GROUP
      displayStatusPC: "DISPLAY", // DISPLAY, HIDDEN
      displayStatusMobile: "DISPLAY", 
      parentId: null as string | null,
      code: "",
      displayMethod: "NORMAL",
      // ... verify other fields from UI
  });

  const [mode, setMode] = useState<"create_root" | "create_sub" | "edit" | null>(null);

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
      setFormData({
          name: cat.name,
          nameCN: cat.nameCN || "",
          nameEN: cat.nameEN || "",
          type: cat.type,
          displayStatusPC: cat.displayStatusPC,
          displayStatusMobile: cat.displayStatusMobile,
          parentId: cat.parentId,
          code: cat.code || "",
          displayMethod: cat.displaySettings?.displayMethod || "NORMAL"
      });
  };

  const handleCreateRoot = () => {
      setSelectedCategory(null);
      setMode("create_root");
      setFormData({
          name: "",
          nameCN: "",
          nameEN: "",
          type: "GENERAL",
          displayStatusPC: "DISPLAY",
          displayStatusMobile: "DISPLAY",
          parentId: null,
          code: "",
          displayMethod: "NORMAL"
      });
  };

  const handleCreateSub = () => {
      if (!selectedCategory) {
          alert("상위 카테고리를 선택해주세요.");
          return;
      }
      setMode("create_sub");
      setFormData({
          name: "",
          nameCN: "",
          nameEN: "",
          type: "GENERAL",
          displayStatusPC: "DISPLAY",
          displayStatusMobile: "DISPLAY",
          parentId: selectedCategory.id, // Set current selection as parent
          code: "",
          displayMethod: "NORMAL"
      });
      // Keep selectedCategory highlighted as context
  };

  const handleSave = async () => {
      startTransition(async () => {
          let result;
          if (mode === "edit" && selectedCategory) {
             result = await updateCategoryAction(selectedCategory.id, formData);
          } else {
             // Create
             result = await createCategoryAction({
                 name: formData.name,
                 parentId: formData.parentId,
                 // Add other fields as needed to the create action
             });
             // Note: My createCategoryAction currently only takes basic fields. 
             // Ideally it should take all. I'll need to update the action or just pass what works for now.
          }

          if (result.success) {
              alert("저장되었습니다.");
              fetchCategories();
              if (result.category) {
                  // If created, select it? Or just refresh.
                  // handleSelectCategory(result.category); 
              }
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
                      <Folder className="w-4 h-4 text-sky-200 fill-sky-200" />
                  ) : (
                      <Folder className="w-4 h-4 text-gray-200 fill-gray-200" />
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
      <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">카테고리 관리</h1>
        <Button onClick={handleSave} disabled={isPending} className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm">
          {isPending ? "저장중" : "저장"}
        </Button>
      </div>

      <div className="flex gap-6 h-full">
        {/* Left Sidebar: Category Tree */}
        <div className="w-[320px] flex-shrink-0 border-r border-gray-200 pr-4 min-h-[800px]">
          <div className="flex gap-1 mb-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs px-2 rounded-sm border-gray-300 bg-white hover:bg-gray-50"
              onClick={handleCreateRoot}
            >
              1차 카테고리 생성
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs px-2 rounded-sm border-gray-300 bg-white hover:bg-gray-50"
              onClick={handleCreateSub}
            >
              하위 카테고리 생성
            </Button>
             <div className="flex gap-1 ml-auto">
                 <Button variant="ghost" size="icon" className="h-7 w-7"><Plus className="w-3 h-3 text-blue-500"/></Button>
                 <Button variant="ghost" size="icon" className="h-7 w-7"><Minus className="w-3 h-3 text-blue-500"/></Button>
             </div>
          </div>
          
          <div className="border border-gray-300 h-[800px] bg-white p-2 overflow-y-auto">
             <div className="tree-item flex items-center gap-1 py-1 text-gray-700 cursor-pointer">
                 <Play className="w-2 h-2 fill-gray-500 text-gray-500 transform rotate-90" />
                 <Folder className="w-4 h-4 text-orange-200 fill-orange-200" />
                 <span className="text-sm font-bold">전체 카테고리</span>
             </div>
             <div className="pl-4 mt-1">
                 {renderTree(categories)}
             </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-10 min-w-0">
          
          {/* Section 1: Category Info */}
          <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-black">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">
                          {mode === 'create_root' ? '1차 카테고리 생성' : 
                           mode === 'create_sub' ? '하위 카테고리 생성' : 
                           selectedCategory ?  '카테고리 정보' : '카테고리를 선택하세요'}
                      </h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  {selectedCategory && mode === 'edit' && (
                  <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm" className="h-7 text-xs bg-gray-400 text-white hover:bg-gray-500 rounded-sm">상품진열</Button>
                      <Button variant="outline" size="sm" onClick={handleDelete} className="h-7 text-xs text-red-500 border-red-200 hover:bg-red-50">삭제</Button>
                      <button className="flex items-center text-xs text-blue-600 font-bold">닫힘 <ChevronUp className="w-3 h-3 ml-1"/></button>
                  </div>
                  )}
              </div>

              {/* Form container */}
              <div className="border-t border-gray-200 text-xs">
                  {/* Row: Category Name */}
                  <div className="flex border-b border-gray-200">
                      <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-start pt-6 border-r border-gray-200 relative">
                           <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-red-500 rounded-full mb-0.5"></div>
                                <span>카테고리명</span>
                                <HelpCircle className="w-3 h-3 text-gray-400 ml-1" />
                            </div>
                      </div>
                      <div className="flex-1 p-3 space-y-2">
                          <div className="flex items-center gap-2">
                              <span className="w-10 font-bold text-gray-600">기준몰</span>
                              <Input 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-[300px] h-7 text-xs border-gray-300 rounded-sm" 
                              />
                              <span className="text-gray-400 text-[11px]"><strong className="text-red-500">{formData.name.length}</strong> / 30</span>
                          </div>
                      </div>
                  </div>

                  {/* Row: Category Type */}
                  <div className="flex border-b border-gray-200">
                      <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          카테고리 타입
                      </div>
                      <div className="flex-1 p-3">
                          <RadioGroup 
                            value={formData.type} 
                            onValueChange={(val) => setFormData({...formData, type: val})}
                            className="flex flex-col gap-2"
                          >
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="GENERAL" id="type-general" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                  <Label htmlFor="type-general" className="text-gray-700 font-normal">일반 카테고리 <span className="text-blue-500">(카테고리 페이지가 있고, 상품연결이 되는 일반적인 카테고리입니다)</span></Label>
                              </div>
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="GROUP" id="type-group" className="rounded-full border-gray-300 text-gray-600" />
                                  <Label htmlFor="type-group" className="text-gray-700 font-normal">그룹(구분) 카테고리 <span className="text-blue-500">(카테고리 페이지가 없고, 상품연결이 안되는 그룹(구분) 카테고리입니다)</span></Label>
                              </div>
                          </RadioGroup>
                      </div>
                  </div>

                  {/* Row: PC Display */}
                  <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          PC쇼핑몰<br/>노출상태
                      </div>
                      <div className="flex-1 p-3">
                           <RadioGroup 
                                value={formData.displayStatusPC} 
                                onValueChange={(val) => setFormData({...formData, displayStatusPC: val})}
                                className="flex gap-6"
                           >
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="DISPLAY" id="pc-visible" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                  <Label htmlFor="pc-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="HIDDEN" id="pc-hidden" className="rounded-full border-gray-300 text-gray-600" />
                                  <Label htmlFor="pc-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                              </div>
                          </RadioGroup>
                      </div>
                  </div>

                   {/* Row: Mobile Display */}
                   <div className="flex border-b border-gray-200">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          모바일쇼핑몰<br/>노출상태
                      </div>
                      <div className="flex-1 p-3">
                           <RadioGroup 
                                value={formData.displayStatusMobile} 
                                onValueChange={(val) => setFormData({...formData, displayStatusMobile: val})}
                                className="flex gap-6"
                           >
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="DISPLAY" id="mo-visible" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                  <Label htmlFor="mo-visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="HIDDEN" id="mo-hidden" className="rounded-full border-gray-300 text-gray-600" />
                                  <Label htmlFor="mo-hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                              </div>
                          </RadioGroup>
                      </div>
                  </div>

              </div>
          </div>

           {/* Section 2: Placeholder for other settings */}
           <div className="p-4 border border-gray-200 bg-gray-50 text-gray-500 text-center">
               ... 추가 설정 (테마, 추천상품, 꾸미기 등) ...
           </div>

           {/* Guide Section (Preserved simplified) */}
            <div className="mt-12 text-gray-600 text-xs space-y-8 border-t border-gray-300 pt-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-1 font-bold text-blue-500 mb-1">
                        <File className="w-3 h-3" /> 안내
                    </div>
                    <div className="font-bold text-gray-800">[카테고리 정보] 그룹(구분) 카테고리는 무엇인가요?</div>
                    <ul className="list-disc pl-4 space-y-1 text-gray-600">
                        <li>카테고리 페이지가 없고, 상품연결이 되지 않는 카테고리입니다.</li>
                        <li>상품 연결이 필요 없는 대표성이 있는 카테고리를 만들고 싶을 때 사용합니다.</li>
                    </ul>
                </div>
            </div>
            
             <div className="text-center text-[11px] text-[#888888] py-8 border-t border-[#E6E6E6] mt-10">
                © NHN COMMERCE Corp All Rights Reserved.
             </div>

        </div>
      </div>
    </div>
  );
}
