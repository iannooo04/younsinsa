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
  ChevronDown,
  Lock
} from "lucide-react";
import React, { useEffect, useState, useTransition, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { 
    getCategoriesAction, 
    createCategoryAction, 
    updateCategoryAction 
} from "@/actions/category-actions";
import { Category } from "@/generated/prisma";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MemberGradeSelectPopup from "@/components/admin/MemberGradeSelectPopup";
import RecommendProductSelectPopup from "@/components/admin/RecommendProductSelectPopup";
import DecorationEditor from "@/components/admin/DecorationEditor";

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


const CategoryGuideSection = () => {
    return (
        <div className="border-t border-gray-900 pt-4 mt-8">
            <div className="flex items-center gap-2 mb-4">
                <File className="w-4 h-4 text-blue-500" />
                <h3 className="text-lg font-bold text-blue-500">안내</h3>
            </div>
            
            <div className="space-y-8 text-sm text-gray-600">
                {/* Group Category Info */}
                <div>
                    <h4 className="font-bold mb-2">[카테고리 정보] 그룹(구분) 카테고리는 무엇인가요?</h4>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>카테고리 페이지가 없고, 상품연결이 되지 않는 카테고리입니다.</li>
                        <li>상품 연결이 필요 없는 대표성이 있는 카테고리를 만들고 싶을 때 사용합니다.</li>
                        <li>디자인적으로 카테고리 사이에 구분선을 삽입하고 싶을 때 사용합니다.</li>
                        <li>그룹(구분) 카테고리는 하위 카테고리가 존재할 수 없으며, 1차 카테고리만 생성할 수 있습니다.</li>
                    </ul>
                    <div className="flex gap-8 border border-red-400 p-2 inline-block">
                        <div className="text-center">
                            <div className="border border-gray-300 p-2 mb-1 bg-white">
                                <div className="text-left text-xs font-mono">
                                    <div>- 카테고리</div>
                                    <div className="pl-2">├ 상의</div>
                                    <div className="pl-4">│ └ 자켓</div>
                                    <div className="pl-4">│ └ 코트</div>
                                    <div className="pl-2">├ 하의</div>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-gray-500">[관리자 화면]</span>
                        </div>
                        <div className="flex items-center text-blue-300">▶</div>
                        <div className="text-center">
                            <div className="border border-gray-300 p-2 mb-1 bg-white min-w-[100px] text-left">
                                <div className="font-bold underline mb-2">상의</div>
                                <div className="text-xs text-gray-500 pl-2">자켓</div>
                                <div className="text-xs text-gray-500 pl-2">코트</div>
                                <div className="border-b border-dashed border-gray-300 my-2"></div>
                                <div className="font-bold underline mb-2">하의</div>
                            </div>
                            <span className="text-xs font-bold text-gray-500">[쇼핑몰 화면]</span>
                        </div>
                    </div>
                </div>

                {/* Category Order/Move */}
                <div>
                    <h4 className="font-bold mb-2">[카테고리 정보] 카테고리 순서를 변경할 수 있나요?</h4>
                    <p className="mb-4">· 카테고리를 선택(클릭)하고 마우스 드래그하여 원하는 위치에 끌어다 놓으면 순서 변경이 가능합니다.</p>

                    <h4 className="font-bold mb-2">[카테고리 정보] 카테고리를 이동할 수 있나요?</h4>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>카테고리를 선택(클릭)하고 마우스 드래그하여 원하는 위치에 끌어다 놓으면 이동이 가능합니다.</li>
                        <li>카테고리 이동 시 4차(세분류) 카테고리 이상이 될 경우에는 이동이 되지 않습니다.</li>
                        <li>선택된 카테고리의 바로 아래 하위 카테고리로 이동은 불가능 합니다. (상위 카테고리로는 제한없이 이동 가능합니다.)</li>
                    </ul>
                    
                    <div className="flex gap-8">
                        <div>
                            <div className="text-red-500 font-bold mb-1 text-xs">• 이동 가능한 경우</div>
                            <div className="border border-red-400 p-2 bg-white">
                                <div className="text-xs font-mono">
                                    <div>- 의류</div>
                                    <div className="pl-2 bg-blue-50">└ 패션잡화</div>
                                    <div className="pl-4">└ 지갑</div>
                                    <div className="pl-4">└ 벨트</div>
                                    <div className="pl-2">└ 소품</div>
                                    <div className="pl-4 text-blue-500 font-bold">↳ 쿠션</div>
                                </div>
                            </div>
                        </div>
                        <div>
                             <div className="text-red-500 font-bold mb-1 text-xs">• 이동 불가능한 경우</div>
                             <div className="border border-red-400 p-2 bg-white">
                                <div className="text-xs font-mono">
                                    <div>- 의류</div>
                                    <div className="pl-2">└ 패션잡화</div>
                                    <div className="pl-4">└ 지갑</div>
                                    <div className="pl-4 bg-gray-100">└ 벨트 <span className="text-red-500 font-bold">X 패션잡화</span></div>
                                    <div className="pl-2">└ 소품 <span className="text-red-500 font-bold">X 지갑</span></div>
                                    <div className="pl-4">└ 쿠션 <span className="text-red-500 font-bold">X 벨트</span></div>
                                </div>
                            </div>
                            <div className="text-center text-xs font-bold text-gray-500 mt-1">[관리자 화면]</div>
                        </div>
                    </div>
                </div>

                {/* Icons Legend */}
                 <div>
                    <h4 className="font-bold mb-2">[카테고리 정보] 카테고리 폴더 이미지가 달라요.</h4>
                    <p className="mb-2">· 카테고리 폴더 이미지는 카테고리의 "타입, 노출상태, 접근권한"에 따라 다르게 노출됩니다.</p>
                    <div className="flex gap-2 mb-2">
                        <Folder className="w-5 h-5 text-sky-400 fill-sky-400" /> <span className="font-bold text-white bg-blue-400 rounded-sm px-1 text-xs mr-2">1</span>
                        <Folder className="w-5 h-5 text-orange-400 fill-orange-400" /> <span className="font-bold text-white bg-blue-400 rounded-sm px-1 text-xs mr-2">2</span>
                        <Folder className="w-5 h-5 text-gray-400 fill-gray-400" /> <span className="font-bold text-white bg-blue-400 rounded-sm px-1 text-xs mr-2">3</span>
                        <Folder className="w-5 h-5 text-sky-400 fill-sky-400 relative"><Lock className="absolute -bottom-1 -right-1 bg-white rounded-full border border-gray-300 w-3 h-3 p-0.5 text-gray-600" /></Folder> <span className="font-bold text-white bg-blue-400 rounded-sm px-1 text-xs">4</span>
                    </div>
                    <div className="text-xs space-y-2 text-gray-500">
                        <p>① <span className="font-bold text-gray-700">일반 카테고리 :</span> 접근 권한에 제한이 없고, PC / 모바일쇼핑몰 모두 노출된 상태의 일반 카테고리로 등록된 카테고리 입니다.</p>
                        <p className="pl-3">- 카테고리 타입 : 일반 카테고리, PC / 모바일쇼핑몰 노출상태 : 노출함, 접근 권한 : 전체(회원+비회원)</p>
                        
                        <p>② <span className="font-bold text-gray-700">그룹(구분) 카테고리 :</span> 접근 권한에 제한이 없고, PC / 모바일쇼핑몰 모두 노출된 상태의 그룹(구분) 카테고리로 등록된 카테고리 입니다.</p>
                        <p className="pl-3">- 카테고리 타입 : 그룹(구분) 카테고리, PC / 모바일쇼핑몰 노출상태 : 노출함, 접근 권한 : 전체(회원+비회원)</p>
                        
                        <p>③ <span className="font-bold text-gray-700">노출안함 카테고리 :</span> 접근 권한에 제한이 없고, PC쇼핑몰 또는 모바일쇼핑몰 노출안함 상태의 일반 카테고리로 등록된 카테고리 입니다.</p>
                        <p className="pl-3">- 카테고리 타입 : 일반 카테고리, PC / 모바일쇼핑몰 노출상태 : 노출안함, 접근 권한 : 전체(회원+비회원)</p>

                         <p>④ <span className="font-bold text-gray-700">접근 제한 카테고리 :</span> 접근 권한에 제한이 있고, PC / 모바일쇼핑몰 모두 노출된 상태의 일반 카테고리로 등록된 카테고리 입니다.</p>
                        <p className="pl-3">- 카테고리 타입 : 일반 카테고리, PC / 모바일쇼핑몰 노출상태 : 노출함, 접근 권한 : 회원전용(비회원제외) 또는 특정 회원등급</p>
                    </div>
                </div>

                {/* Product Count */}
                <div>
                    <h4 className="font-bold mb-2">[카테고리 정보] 등록 상품수는 무엇인가요?</h4>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>"등록 상품수"란 현재 선택된 카테고리에 연결된 상품의 총 수량입니다.</li>
                        <li>카테고리 트리 내 카테고리 선택(클릭) 시 "카테고리 정보" 영역에 "등록 상품수" 항목으로 노출됩니다.</li>
                        <li>선택된 카테고리에 하위 카테고리가 있는 경우 하위 카테고리에 연결된 상품을 포함하여 노출됩니다.</li>
                    </ul>
                    <div className="border border-red-400 p-1 inline-block bg-white relative">
                        <div className="flex gap-4 p-2 border border-gray-200">
                             <div className="w-40 border-r border-gray-200 pr-2">
                                 <div className="text-xs bg-blue-100 p-1 border border-blue-200 mb-1">카테고리</div>
                                 <div className="pl-2">📂 의류</div>
                                 <div className="pl-4">📂 패션잡화</div>
                             </div>
                             <div className="flex-1 space-y-2">
                                 <div className="border border-gray-200 p-2 bg-gray-50 flex items-center justify-between gap-4">
                                     <span className="font-bold">현재 카테고리</span>
                                     <div className="flex gap-1">
                                         <span className="border border-gray-300 bg-white px-2 py-0.5 text-xs">의류</span>
                                         <Button size="sm" className="h-5 text-[10px] bg-red-500 text-white">주소복사</Button>
                                     </div>
                                 </div>
                                  <div className="border border-gray-200 p-2 flex items-center gap-4">
                                     <span className="font-bold">등록 상품수</span>
                                     <span className="text-blue-500 font-bold">5 개가 등록되어 있습니다. <span className="text-xs font-normal text-blue-400">(하위 카테고리까지 포함)</span></span>
                                  </div>
                                  <div className="border border-gray-200 p-2 bg-gray-50 flex items-center justify-between gap-4">
                                     <span className="font-bold text-red-500">• 카테고리명</span>
                                      <div className="flex-1 border border-gray-300 bg-white p-1 text-xs flex justify-between">
                                         <span>의류</span>
                                         <span className="text-gray-400">2 / 30</span>
                                     </div>
                                  </div>
                                  <div className="text-right text-gray-500 text-xs">현재 카테고리 코드 : 001</div>
                             </div>
                        </div>
                         <div className="absolute top-0 right-0 bg-blue-500 text-white w-4 h-4 flex items-center justify-center text-[10px] font-bold">1</div>
                         <div className="absolute bottom-16 left-60 bg-blue-500 text-white w-4 h-4 flex items-center justify-center text-[10px] font-bold">2</div>
                        <div className="text-right text-xs font-bold text-gray-500 mt-1">[관리자 화면]</div>
                    </div>
                     <div className="text-xs space-y-2 text-gray-500 mt-2">
                        <p>① 카테고리 트리 내에서 등록된 카테고리를 선택(클릭)하면 우측 "카테고리 정보" 영역에 "현재 카테고리"와 "등록 상품수" 항목 및 카테고리명 항목 내 "카테고리 코드"가 추가 노출됩니다.</p>
                        <p>- 현재 카테고리 : 운영자가 선택한 카테고리의 "카테고리명"이 노출되며, "화면바로보기 / 주소복사 / 삭제" 버튼이 제공됩니다.</p>
                        <p>- [화면바로보기] 버튼 클릭 시 해당 카테고리의 쇼핑몰 카테고리페이지가 새탭으로 노출됩니다.</p>
                        <p>- [주소복사] 버튼 클릭 시 해당 카테고리의 쇼핑몰 카테고리페이지 주소가 클립보드에 복사됩니다.</p>
                        <p>- [삭제] 버튼 클릭 시 해당 카테고리가 삭제됩니다.</p>
                        <p>② 운영자가 선택한 카테고리의 "코드"가 노출됩니다.</p>
                        <p>- 카테고리 코드는 "상품 &gt; 상품 엑셀 관리 &gt; 상품 업로드"에서 엑셀파일을 통해 상품 등록 시 이용됩니다.</p>
                     </div>
                </div>
            </div>
        </div>
    );
}

export default function CategoryManagementPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryWithChildren[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithChildren | null>(null);

  const [isPending, startTransition] = useTransition();
  const [isGradePopupOpen, setIsGradePopupOpen] = useState(false);
  const [isProductSelectPopupOpen, setIsProductSelectPopupOpen] = useState(false);

  // Expanded UI States
  const [sectionsExpanded, setSectionsExpanded] = useState({
      basicInfo: true,
      pcTheme: true,
      mobileTheme: true,
      recommend: true,
      recommendDecoration: true,
      decoration: true,
      navDecoration: true,
  });

  // Decoration Sync States
  const [isNavSameDescription, setIsNavSameDescription] = useState(true);
  const [isRecommendSameDescription, setIsRecommendSameDescription] = useState(true);
  const [isListSameDescription, setIsListSameDescription] = useState(true);

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
      
      // New fields state (mocked for UI)
      exposureShops: ['all'],
      nameCN: "", // Example for multi-lang
      adultAuth: "NOT_USE",
      accessRights: "ALL",
      productDisplaySort: "AUTO",
      
      // Themes
      pcTheme: "default",
      mobileTheme: "default",

      // Recommend
      recommendScope: false,
      recommendStatusPC: "DISPLAY",
      recommendStatusMobile: "DISPLAY",
      recommendSort: "AUTO",
      recommendThemePC: "default",
      recommendThemeMobile: "default",

      
      // Recommend Decoration
      recommendDecorationSame: true,
      recommendDecorationPC: "",
      recommendDecorationMobile: "",
      
      // Decoration (HTML)
      decorationSame: true,
      decorationPC: "",
      decorationMobile: "",

  });

  const [mode, setMode] = useState<"create_root" | "create_sub" | "edit" | null>(null);

  // File Upload State & Refs
  const [pcHoverImageName, setPcHoverImageName] = useState("");
  const [pcImageName, setPcImageName] = useState("");
  const [mobileImageName, setMobileImageName] = useState("");

  const pcHoverImageInputRef = useRef<HTMLInputElement>(null);
  const pcImageInputRef = useRef<HTMLInputElement>(null);
  const mobileImageInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'pcHover' | 'pc' | 'mobile') => {
      const file = e.target.files?.[0];
      if (file) {
          if (type === 'pcHover') setPcHoverImageName(file.name);
          else if (type === 'pc') setPcImageName(file.name);
          else if (type === 'mobile') setMobileImageName(file.name);
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
      });
  };

  const handleSave = async () => {
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
             });
          }

          if (result.success) {
              alert("저장되었습니다.");
              fetchCategories();
          } else {
              alert(result.error || "실패했습니다.");
          }
      });
  };

  /*
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
  */

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
            <Button variant="outline" size="sm" className="h-7 text-xs px-2 rounded-sm border-gray-300 bg-white hover:bg-gray-50 text-gray-700" onClick={handleCreateRoot}>1차 카테고리 생성</Button>
            <Button variant="outline" size="sm" className="h-7 text-xs px-2 rounded-sm border-gray-300 bg-white hover:bg-gray-50 text-gray-700" onClick={handleCreateSub}>하위 카테고리 생성</Button>

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
                  {/* Exposure Shops */}
                  <div className="flex border-b border-gray-200 min-h-[50px]">
                      <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">노출상점</div>
                      <div className="flex-1 p-3 flex flex-col gap-2 justify-center">
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-1"><Checkbox checked className="border-gray-300 bg-red-500 border-red-500" /> <span className="text-red-500 font-bold">전체</span></label>
                            <label className="flex items-center gap-1"><Checkbox className="border-gray-300" /> 🇰🇷 기준몰</label>
                            <label className="flex items-center gap-1"><Checkbox className="border-gray-300" /> 🇨🇳 중문몰</label>
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
                               <span className="w-16 font-bold text-gray-600">기준몰</span>
                               <div className="relative">
                                   <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-[300px] h-7 text-xs pr-10" />
                                   <span className="absolute right-2 top-1.5 text-[10px] text-red-500 font-bold">{formData.name.length} / 30</span>
                               </div>
                           </div>
                           <div className="flex items-center gap-2">
                               <span className="w-16 flex items-center gap-1">🇨🇳</span>
                               <div className="relative bg-gray-100 rounded-sm">
                                   <Input disabled className="w-[300px] h-7 text-xs bg-gray-100" />
                                   <span className="absolute right-2 top-1.5 text-[10px] text-red-500 font-bold">0 / 30</span>
                               </div>
                               <label className="flex items-center gap-1 text-gray-600"><Checkbox checked className="border-gray-300 bg-red-500 border-red-500" /> 기준몰 카테고리명 공통사용</label>
                               <Button variant="secondary" size="sm" className="h-6 text-[11px] px-2 bg-gray-600 text-white hover:bg-gray-700 rounded-sm">참고 번역</Button>
                           </div>
                           <p className="flex items-center gap-1 text-gray-400 mt-1">
                                <span className="bg-black text-white text-[10px] px-1 font-bold rounded-sm">!</span> 기본적으로 입력된 텍스트로 해당 카테고리 보여집니다<br/>
                                <span className="ml-5">카테고리를 이미지로 노출하려면 아래 "카테고리 이미지등록" 항목에 이미지를 등록하세요.</span>
                           </p>
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
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex flex-col justify-center border-r border-gray-200">PC쇼핑몰<br/>노출상태</div>
                       <div className="flex-1 p-3 flex items-center">
                           <RadioGroup value={formData.displayStatusPC} onValueChange={(v) => setFormData({...formData, displayStatusPC: v})} className="flex gap-4">
                               <div className="flex items-center gap-2">
                                  <RadioGroupItem value="DISPLAY" id="pc-disp" className="text-red-500 border-red-500" />
                                  <Label htmlFor="pc-disp" className="font-normal">노출함</Label>
                               </div>
                               <div className="flex items-center gap-2">
                                  <RadioGroupItem value="HIDDEN" id="pc-hide" className="border-gray-400" />
                                  <Label htmlFor="pc-hide" className="font-normal text-gray-500">노출안함</Label>
                               </div>
                           </RadioGroup>
                       </div>
                  </div>
                   <div className="flex border-b border-gray-200 min-h-[50px]">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex flex-col justify-center border-r border-gray-200">모바일쇼핑몰<br/>노출상태</div>
                       <div className="flex-1 p-3 flex items-center">
                           <RadioGroup value={formData.displayStatusMobile} onValueChange={(v) => setFormData({...formData, displayStatusMobile: v})} className="flex gap-4">
                               <div className="flex items-center gap-2">
                                  <RadioGroupItem value="DISPLAY" id="mo-disp" className="text-red-500 border-red-500" />
                                  <Label htmlFor="mo-disp" className="font-normal">노출함</Label>
                               </div>
                               <div className="flex items-center gap-2">
                                  <RadioGroupItem value="HIDDEN" id="mo-hide" className="border-gray-400" />
                                  <Label htmlFor="mo-hide" className="font-normal text-gray-500">노출안함</Label>
                               </div>
                           </RadioGroup>
                       </div>
                  </div>

                   {/* Images */}
                  <div className="flex border-b border-gray-200 min-h-[50px]">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex flex-col justify-center border-r border-gray-200">PC쇼핑몰<br/>카테고리 이미지 등록</div>
                       <div className="flex-1 p-3 flex items-center gap-4">
                           <label className="flex items-center gap-1 text-gray-600"><Checkbox className="border-gray-300" /> 모바일 쇼핑몰과 동일 적용</label>
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
                           <div className="flex items-center gap-2">
                               <span className="font-bold">PC쇼핑몰<br/>마우스오버 이미지 등록</span>
                               <input 
                                   type="file" 
                                   className="hidden" 
                                   ref={pcHoverImageInputRef} 
                                   onChange={(e) => handleFileChange(e, 'pcHover')}
                               />
                               <Button 
                                   className="h-7 text-xs px-2 bg-gray-400 text-white border-0 hover:bg-gray-500 rounded-sm"
                                   onClick={() => pcHoverImageInputRef.current?.click()}
                               >
                                   찾아보기
                               </Button>
                               <div className="w-32 h-7 bg-gray-100 border border-gray-300 flex items-center px-2 text-xs text-gray-600 overflow-hidden whitespace-nowrap">
                                   {pcHoverImageName}
                               </div>
                           </div>
                       </div>
                  </div>
                  <div className="flex border-b border-gray-200 min-h-[50px]">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex flex-col justify-center border-r border-gray-200">모바일쇼핑몰<br/>카테고리 이미지 등록</div>
                       <div className="flex-1 p-3 flex items-center gap-2">
                           <input 
                               type="file" 
                               className="hidden" 
                               ref={mobileImageInputRef} 
                               onChange={(e) => handleFileChange(e, 'mobile')}
                           />
                           <Button 
                               className="h-7 text-xs px-2 bg-gray-400 text-white border-0 hover:bg-gray-500 rounded-sm"
                               onClick={() => mobileImageInputRef.current?.click()}
                           >
                               찾아보기
                           </Button>
                           <div className="w-32 h-7 bg-gray-100 border border-gray-300 flex items-center px-2 text-xs text-gray-600 overflow-hidden whitespace-nowrap">
                               {mobileImageName}
                           </div>
                       </div>
                  </div>

                  {/* Adult Auth */}
                   <div className="flex border-b border-gray-200 min-h-[80px]">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex flex-col justify-center border-r border-gray-200">성인인증</div>
                       <div className="flex-1 p-3 space-y-2">
                           <RadioGroup value={formData.adultAuth} onValueChange={(v) => setFormData({...formData, adultAuth: v})} className="flex gap-4">
                               <div className="flex items-center gap-2">
                                  <RadioGroupItem value="NOT_USE" id="adult-no" className="text-red-500 border-red-500" />
                                  <Label htmlFor="adult-no" className="font-normal">사용안함</Label>
                               </div>
                               <div className="flex items-center gap-2">
                                  <RadioGroupItem value="USE" id="adult-yes" className="border-gray-400" />
                                  <Label htmlFor="adult-yes" className="font-normal text-gray-500">사용함</Label>
                               </div>
                               <label className="flex items-center gap-1 text-gray-400 ml-2"><Checkbox checked className="border-gray-300" /> 미인증 고객 카테고리 노출함</label>
                               <label className="flex items-center gap-1 text-gray-600"><Checkbox className="border-gray-300" /> 하위 카테고리 동일 적용</label>
                           </RadioGroup>
                           <p className="flex items-start gap-1 text-gray-400">
                                <span className="bg-black text-white text-[10px] px-1 font-bold mt-0.5 rounded-sm">!</span> 
                                <span>해당 카테고리의 상품리스트 페이지 접속시 성인인증확인 인트로 페이지가 출력되어 보여집니다.<br/>성인인증 기능은 별도의 인증 서비스 초기완료 후 이용 가능합니다.</span>
                           </p>
                           <div className="text-blue-500 underline text-xs">휴대폰인증 설정 바로가기 아이핀인증 설정 바로가기</div> 
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

                  {/* Theme Select */}
                  <div className="flex min-h-[50px]">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex flex-col justify-center border-r border-gray-200">PC쇼핑몰<br/>테마선택</div>
                       <div className="flex-1 p-3 flex items-center gap-2 border-r border-gray-200">
                           <Select value={formData.pcTheme} onValueChange={(v) => setFormData({...formData, pcTheme: v})}>
                               <SelectTrigger className="w-32 h-7 text-xs"><SelectValue /></SelectTrigger>
                               <SelectContent><SelectItem value="default">카테고리테마</SelectItem></SelectContent>
                           </Select>
                           <Button className="h-7 bg-[#555555] hover:bg-[#444444] text-white text-xs font-bold rounded-sm px-3" onClick={() => router.push('/admin/categories/theme-register')}>테마 등록</Button>
                       </div>
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex flex-col justify-center border-r border-gray-200">모바일쇼핑몰<br/>테마선택</div>
                       <div className="flex-1 p-3 flex items-center gap-2">
                           <Select value={formData.mobileTheme} onValueChange={(v) => setFormData({...formData, mobileTheme: v})}>
                               <SelectTrigger className="w-32 h-7 text-xs"><SelectValue /></SelectTrigger>
                               <SelectContent><SelectItem value="default">카테고리테마</SelectItem></SelectContent>
                           </Select>
                           <Button className="h-7 bg-[#555555] hover:bg-[#444444] text-white text-xs font-bold rounded-sm px-3" onClick={() => router.push('/admin/categories/theme-register')}>테마 등록</Button>
                       </div>
                  </div>
              </div>
              )}
          </div>

          {/* Section 2: Selected Theme Info (PC) */}
          <div className="border-t border-gray-300 pt-4">
              <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">선택된 PC쇼핑몰 테마 정보</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                   <button onClick={() => toggleSection('pcTheme')} className="text-blue-500 text-xs font-bold flex items-center">
                       {sectionsExpanded.pcTheme ? '닫힘' : '열림'} <ChevronUp className={`w-3 h-3 ml-1 transform ${sectionsExpanded.pcTheme ? '' : 'rotate-180'}`} />
                   </button>
              </div>
              {sectionsExpanded.pcTheme && (
                 <div className="border border-gray-200 text-xs text-gray-700">
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">테마명</div>
                         <div className="flex-1 pl-4 flex items-center gap-2">
                             <span>카테고리테마</span> <Button variant="outline" className="h-5 text-[10px] px-1 bg-white border-gray-300" onClick={() => router.push('/admin/categories/theme-edit')}>수정</Button>
                         </div>
                     </div>
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">이미지 설정</div>
                         <div className="flex-1 pl-4">추가리스트2 280pixel</div>
                     </div>
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">상품 노출 개수</div>
                         <div className="flex-1 pl-4">가로 : 4 X 세로 : 5</div>
                     </div>
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">품절상품 노출</div>
                         <div className="flex-1 pl-4 border-r border-gray-200 h-full flex items-center">예</div>
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">품절상품 진열</div>
                         <div className="flex-1 pl-4">정렬 순서대로 보여주기</div>
                     </div>
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">품절 아이콘 노출</div>
                         <div className="flex-1 pl-4 border-r border-gray-200 h-full flex items-center">예</div>
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">아이콘 노출</div>
                         <div className="flex-1 pl-4">예</div>
                     </div>
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">노출항목 설정</div>
                         <div className="flex-1 pl-4">이미지,상품명,이미지,상품명,판매가</div>
                     </div>
                     <div className="flex h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">디스플레이 유형</div>
                         <div className="flex-1 pl-4">갤러리형</div>
                     </div>
                 </div>
              )}
          </div>

          {/* Section 3: Selected Theme Info (Mobile) */}
          <div className="border-t border-gray-300 pt-4">
              <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">선택된 모바일쇼핑몰 테마 정보</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                   <button onClick={() => toggleSection('mobileTheme')} className="text-blue-500 text-xs font-bold flex items-center">
                       {sectionsExpanded.mobileTheme ? '닫힘' : '열림'} <ChevronUp className={`w-3 h-3 ml-1 transform ${sectionsExpanded.mobileTheme ? '' : 'rotate-180'}`} />
                   </button>
              </div>
              {sectionsExpanded.mobileTheme && (
                 <div className="border border-gray-200 text-xs text-gray-700">
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">테마명</div>
                         <div className="flex-1 pl-4 flex items-center gap-2">
                             <span>카테고리테마</span> <Button variant="outline" className="h-5 text-[10px] px-1 bg-white border-gray-300" onClick={() => router.push('/admin/categories/theme-edit')}>수정</Button>
                         </div>
                     </div>
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">이미지 설정</div>
                         <div className="flex-1 pl-4">리스트이미지(기본) 180pixel</div>
                     </div>
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">상품 노출 개수</div>
                         <div className="flex-1 pl-4">가로 : 2 X 세로 : 5</div>
                     </div>
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">품절상품 노출</div>
                         <div className="flex-1 pl-4 border-r border-gray-200 h-full flex items-center">예</div>
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">품절상품 진열</div>
                         <div className="flex-1 pl-4">정렬 순서대로 보여주기</div>
                     </div>
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">품절 아이콘 노출</div>
                         <div className="flex-1 pl-4 border-r border-gray-200 h-full flex items-center">예</div>
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">아이콘 노출</div>
                         <div className="flex-1 pl-4">예</div>
                     </div>
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">노출항목 설정</div>
                         <div className="flex-1 pl-4">이미지,상품명,이미지,상품명,판매가</div>
                     </div>
                     <div className="flex h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">디스플레이 유형</div>
                         <div className="flex-1 pl-4">리스트형</div>
                     </div>
                 </div>
              )}
          </div>

          {/* Section 4: Recommendation Product Info */}
          <div className="border-t border-gray-300 pt-4">
              <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">추천상품 정보</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                   <button onClick={() => toggleSection('recommend')} className="text-blue-500 text-xs font-bold flex items-center">
                       {sectionsExpanded.recommend ? '닫힘' : '열림'} <ChevronUp className={`w-3 h-3 ml-1 transform ${sectionsExpanded.recommend ? '' : 'rotate-180'}`} />
                   </button>
              </div>
              {sectionsExpanded.recommend && (
                  <div className="border border-gray-200 text-xs text-gray-700">
                      <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">적용범위</div>
                         <div className="flex-1 pl-4 flex items-center gap-2">
                            <label className="flex items-center gap-1"><Checkbox  className="border-gray-300" /> 하위 카테고리 동일 적용</label>
                         </div>
                     </div>
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">PC쇼핑몰<br/>노출상태</div>
                         <div className="flex-1 pl-4 flex items-center">
                             {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                             <RadioGroup value={formData.recommendStatusPC} onValueChange={(v) => setFormData({...formData, recommendStatusPC: v as any})} className="flex gap-4">
                               <div className="flex items-center gap-1">
                                  <RadioGroupItem value="DISPLAY" id="rec-pc-disp" className="text-red-500 border-red-500" /> 
                                  <Label htmlFor="rec-pc-disp" className="font-normal cursor-pointer">노출함</Label>
                               </div>
                               <div className="flex items-center gap-1">
                                  <RadioGroupItem value="HIDDEN" id="rec-pc-hide" className="border-gray-400" />
                                  <Label htmlFor="rec-pc-hide" className="font-normal text-gray-500 cursor-pointer">노출안함</Label>
                               </div>
                             </RadioGroup>
                         </div>
                     </div>
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">모바일쇼핑몰<br/>노출상태</div>
                         <div className="flex-1 pl-4 flex items-center">
                             {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                             <RadioGroup value={formData.recommendStatusMobile} onValueChange={(v) => setFormData({...formData, recommendStatusMobile: v as any})} className="flex gap-4">
                               <div className="flex items-center gap-1">
                                  <RadioGroupItem value="DISPLAY" id="rec-mo-disp" className="text-red-500 border-red-500" />
                                  <Label htmlFor="rec-mo-disp" className="font-normal cursor-pointer">노출함</Label>
                               </div>
                               <div className="flex items-center gap-1">
                                  <RadioGroupItem value="HIDDEN" id="rec-mo-hide" className="border-gray-400" />
                                  <Label htmlFor="rec-mo-hide" className="font-normal text-gray-500 cursor-pointer">노출안함</Label>
                               </div>
                             </RadioGroup>
                         </div>
                     </div>
                     <div className="flex border-b border-gray-200 h-10 items-center">
                         <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">상품진열 타입</div>
                         <div className="flex-1 pl-4 flex items-center">
                              <RadioGroup value={formData.recommendSort} onValueChange={(v) => setFormData({...formData, recommendSort: v})} className="flex gap-4 items-center">
                                  <div className="flex items-center gap-1">
                                      <RadioGroupItem value="AUTO" id="rec-sort-auto" className="text-red-500 border-red-500" />
                                      <Label htmlFor="rec-sort-auto" className="font-normal cursor-pointer whitespace-nowrap">자동진열</Label>
                                  </div>
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
                                  <div className="flex items-center gap-1">
                                      <RadioGroupItem value="MANUAL" id="rec-sort-manual" className="border-gray-400" />
                                      <Label htmlFor="rec-sort-manual" className="font-normal text-gray-500 cursor-pointer whitespace-nowrap">수동진열</Label>
                                  </div>
                              </RadioGroup>
                         </div>
                     </div>
                     <div className="flex border-b border-gray-200 min-h-[50px]">
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex flex-col justify-center border-r border-gray-200">PC쇼핑몰<br/>테마선택</div>
                       <div className="flex-1 p-3 flex items-center gap-2 border-r border-gray-200">
                           <Select value={formData.recommendThemePC} onValueChange={(v) => setFormData({...formData, recommendThemePC: v})}>
                               <SelectTrigger className="w-32 h-7 text-xs"><SelectValue /></SelectTrigger>
                               <SelectContent><SelectItem value="default">추천상품테마</SelectItem></SelectContent>
                           </Select>
                           <Button className="h-7 bg-[#555555] hover:bg-[#444444] text-white text-xs font-bold rounded-sm px-3" onClick={() => router.push('/admin/categories/theme-register')}>테마 등록</Button>
                       </div>
                       <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex flex-col justify-center border-r border-gray-200">모바일쇼핑몰<br/>테마선택</div>
                       <div className="flex-1 p-3 flex items-center gap-2">
                           <Select value={formData.recommendThemeMobile} onValueChange={(v) => setFormData({...formData, recommendThemeMobile: v})}>
                               <SelectTrigger className="w-32 h-7 text-xs"><SelectValue /></SelectTrigger>
                               <SelectContent><SelectItem value="default">추천상품테마</SelectItem></SelectContent>
                           </Select>
                           <Button className="h-7 bg-[#555555] hover:bg-[#444444] text-white text-xs font-bold rounded-sm px-3" onClick={() => router.push('/admin/categories/theme-register')}>테마 등록</Button>
                       </div>
                     </div>
                  
                  {/* Selected PC Theme Info */}
                  <div className="mt-4 border border-gray-200 border-t-0 bg-white">
                      <div className="flex items-center justify-between p-3 border-t border-gray-200 border-b">
                          <div className="flex items-center gap-2">
                              <h2 className="text-lg font-bold text-gray-800">선택된 PC쇼핑몰 추천상품 테마 정보</h2>
                              <HelpCircle className="w-4 h-4 text-gray-400" />
                          </div>
                          <button className="text-blue-500 text-xs font-bold flex items-center">
                              닫힘 <ChevronUp className="w-3 h-3 ml-1" />
                          </button>
                      </div>
                      
                      {/* PC Theme Details */}
                      <div className="text-xs text-gray-700">
                          <div className="flex border-b border-gray-200 h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">테마명</div>
                              <div className="flex-1 pl-4 flex items-center gap-2">
                                  <span>추천상품테마</span> 
                                  <Button variant="outline" className="h-5 text-[10px] px-1 bg-white border-gray-300 rounded-sm" onClick={() => router.push('/admin/categories/theme-edit')}>수정</Button>
                              </div>
                          </div>
                          <div className="flex border-b border-gray-200 h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">이미지 설정</div>
                              <div className="flex-1 pl-4">추가리스트2 280pixel</div>
                          </div>
                          <div className="flex border-b border-gray-200 h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">상품 노출 개수</div>
                              <div className="flex-1 pl-4">가로 : 4 X 세로 : 5</div>
                          </div>
                          <div className="flex border-b border-gray-200 h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">품절상품 노출</div>
                              <div className="flex-1 pl-4 border-r border-gray-200 h-full flex items-center">예</div>
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">품절상품 진열</div>
                              <div className="flex-1 pl-4">정렬 순서대로 보여주기</div>
                          </div>
                          <div className="flex border-b border-gray-200 h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">품절 아이콘 노출</div>
                              <div className="flex-1 pl-4 border-r border-gray-200 h-full flex items-center">예</div>
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">아이콘 노출</div>
                              <div className="flex-1 pl-4">예</div>
                          </div>
                          <div className="flex border-b border-gray-200 h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">노출항목 설정</div>
                              <div className="flex-1 pl-4">이미지,상품명,이미지,상품명,판매가</div>
                          </div>
                          <div className="flex h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">갤러리형</div>
                              <div className="flex-1 pl-4">갤러리형</div>
                          </div>
                      </div>
                  </div>

                  {/* Selected Mobile Theme Info */}
                  <div className="mt-4 border border-gray-200 border-t-0 bg-white">
                      <div className="flex items-center justify-between p-3 border-t border-gray-200 border-b">
                          <div className="flex items-center gap-2">
                              <h2 className="text-lg font-bold text-gray-800">선택된 모바일쇼핑몰 추천상품 테마 정보</h2>
                              <HelpCircle className="w-4 h-4 text-gray-400" />
                          </div>
                          <button className="text-blue-500 text-xs font-bold flex items-center">
                              닫힘 <ChevronUp className="w-3 h-3 ml-1" />
                          </button>
                      </div>
                      
                      {/* Mobile Theme Details */}
                      <div className="text-xs text-gray-700">
                          <div className="flex border-b border-gray-200 h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">테마명</div>
                              <div className="flex-1 pl-4 flex items-center gap-2">
                                  <span>추천상품테마</span> 
                                  <Button variant="outline" className="h-5 text-[10px] px-1 bg-white border-gray-300 rounded-sm" onClick={() => router.push('/admin/categories/theme-register')}>수정</Button>
                              </div>
                          </div>
                          <div className="flex border-b border-gray-200 h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">이미지 설정</div>
                              <div className="flex-1 pl-4">리스트이미지(기본) 180pixel</div>
                          </div>
                          <div className="flex border-b border-gray-200 h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">상품 노출 개수</div>
                              <div className="flex-1 pl-4">가로 : 2 X 세로 : 5</div>
                          </div>
                          <div className="flex border-b border-gray-200 h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">품절상품 노출</div>
                              <div className="flex-1 pl-4 border-r border-gray-200 h-full flex items-center">예</div>
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">품절상품 진열</div>
                              <div className="flex-1 pl-4">정렬 순서대로 보여주기</div>
                          </div>
                          <div className="flex border-b border-gray-200 h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">품절 아이콘 노출</div>
                              <div className="flex-1 pl-4 border-r border-gray-200 h-full flex items-center">예</div>
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">아이콘 노출</div>
                              <div className="flex-1 pl-4">예</div>
                          </div>
                          <div className="flex border-b border-gray-200 h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">노출항목 설정</div>
                              <div className="flex-1 pl-4">이미지,상품명,이미지,상품명,판매가</div>
                          </div>
                          <div className="flex h-10 items-center">
                              <div className="w-44 bg-gray-50 pl-4 font-bold border-r border-gray-200 h-full flex items-center">갤러리형</div>
                              <div className="flex-1 pl-4">갤러리형</div>
                          </div>
                      </div>
                  </div>

                  {/* Selected Products List */}
                  <div className="mt-4 border border-gray-200 border-t-0 bg-white">
                      <div className="flex items-center justify-between p-3 border-t border-gray-200 border-b">
                          <div className="flex items-center gap-2">
                              <h2 className="text-lg font-bold text-gray-800">선택된 추천상품</h2>
                              <HelpCircle className="w-4 h-4 text-gray-400" />
                          </div>
                          <button className="text-blue-500 text-xs font-bold flex items-center">
                              닫힘 <ChevronUp className="w-3 h-3 ml-1" />
                          </button>
                      </div>
                      
                      {/* Product Table Header */}
                      <div className="grid grid-cols-[40px_60px_60px_1fr_100px_100px_60px_80px_140px_140px] bg-[#B0B0B0] text-white text-center text-xs font-bold py-2 border-b border-gray-300 items-center whitespace-nowrap">
                          <div className="flex justify-center"><Checkbox className="border-white data-[state=checked]:text-black" /></div>
                          <div>번호</div>
                          <div>이미지</div>
                          <div>상품명</div>
                          <div>판매가</div>
                          <div>공급사</div>
                          <div>재고</div>
                          <div>품절상태</div>
                          <div>PC쇼핑몰 노출상태</div>
                          <div>모바일쇼핑몰 노출상태</div>
                      </div>
                      
                      {/* Empty State */}
                      <div className="py-12 text-center text-gray-500 text-xs border-b border-gray-200">
                          등록된 상품이 없습니다.
                      </div>
                      
                      {/* Footer Actions */}
                       <div className="bg-gray-50 p-2 flex justify-between items-center">
                           <Button variant="outline" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm">선택 삭제</Button>
                           <Button variant="outline" className="h-8 text-xs bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm" onClick={() => setIsProductSelectPopupOpen(true)}>상품 선택</Button>
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
                // Here you would typically update the form data with selected grades
            }} 
          />
          <RecommendProductSelectPopup
             isOpen={isProductSelectPopupOpen}
             onClose={() => setIsProductSelectPopupOpen(false)}
             onConfirm={(selected) => {
                 console.log("Selected products:", selected);
                 setIsProductSelectPopupOpen(false);
             }}
          />


          {/* Section 5: Category Navigation Decoration */}
          <div className="border-t border-gray-300 pt-4">
              <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">카테고리 네비게이션 상단 영역 꾸미기</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                   <button onClick={() => toggleSection('navDecoration')} className="text-blue-500 text-xs font-bold flex items-center">
                       {sectionsExpanded.navDecoration ? '닫힘' : '열림'} <ChevronUp className={`w-3 h-3 ml-1 transform ${sectionsExpanded.navDecoration ? '' : 'rotate-180'}`} />
                   </button>
              </div>
              {sectionsExpanded.navDecoration && (
                  <div className="border border-gray-300 bg-white">
                      <div className="flex items-center h-10 border-b border-gray-300 bg-gray-50 px-2 gap-2">
                          <Button variant="secondary" className="h-7 text-xs !bg-[#333333] !text-white !hover:bg-[#222222] border-0 rounded-sm">PC쇼핑몰 상세 설명</Button>
                          <Button variant="outline" disabled={isNavSameDescription} className="h-7 text-xs bg-white text-gray-700 border-gray-300 hover:bg-gray-50 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed">모바일쇼핑몰 상세 설명</Button>
                          <label className="flex items-center gap-1 text-xs text-gray-700 ml-2">
                              <Checkbox 
                                checked={isNavSameDescription} 
                                onCheckedChange={(checked) => setIsNavSameDescription(checked as boolean)}
                                className="border-gray-300 bg-red-500 border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" 
                              /> 
                              PC/모바일 상세설명 동일사용
                          </label>
                      </div>
                      <div className="p-2">
                           <DecorationEditor />
                      </div>
                  </div>
              )}
          </div>

          {/* Section 6: Category Recommended Product Decoration */}
          <div className="border-t border-gray-300 pt-4">
              <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">카테고리 추천 상품 상단 영역 꾸미기</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                   <button onClick={() => toggleSection('recommendDecoration')} className="text-blue-500 text-xs font-bold flex items-center">
                       {sectionsExpanded.recommendDecoration ? '닫힘' : '열림'} <ChevronUp className={`w-3 h-3 ml-1 transform ${sectionsExpanded.recommendDecoration ? '' : 'rotate-180'}`} />
                   </button>
              </div>
              {sectionsExpanded.recommendDecoration && (
                  <div className="border border-gray-300 bg-white">
                      <div className="flex items-center h-10 border-b border-gray-300 bg-gray-50 px-2 gap-2">
                           <Button variant="secondary" className="h-7 text-xs !bg-[#333333] !text-white !hover:bg-[#222222] border-0 rounded-sm">PC쇼핑몰 상세 설명</Button>
                          <Button variant="outline" disabled={isRecommendSameDescription} className="h-7 text-xs bg-white text-gray-700 border-gray-300 hover:bg-gray-50 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed">모바일쇼핑몰 상세 설명</Button>
                          <label className="flex items-center gap-1 text-xs text-gray-700 ml-2">
                              <Checkbox 
                                checked={isRecommendSameDescription}
                                onCheckedChange={(checked) => setIsRecommendSameDescription(checked as boolean)}
                                className="border-gray-300 bg-red-500 border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" 
                              /> 
                              PC/모바일 상세설명 동일사용
                          </label>
                      </div>
                      <div className="p-2">
                           <DecorationEditor simpleToolbar />
                      </div>
                  </div>
              )}
          </div>

          {/* Section 7: Category List Decoration */}
          <div className="border-t border-gray-300 pt-4">
              <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-gray-800">카테고리 리스트 상단 영역 꾸미기</h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                   <button onClick={() => toggleSection('decoration')} className="text-blue-500 text-xs font-bold flex items-center">
                       {sectionsExpanded.decoration ? '닫힘' : '열림'} <ChevronUp className={`w-3 h-3 ml-1 transform ${sectionsExpanded.decoration ? '' : 'rotate-180'}`} />
                   </button>
              </div>
              {sectionsExpanded.decoration && (
                  <div className="border border-gray-300 bg-white">
                      <div className="flex items-center h-10 border-b border-gray-300 bg-gray-50 px-2 gap-2">
                           <Button variant="secondary" className="h-7 text-xs !bg-[#333333] !text-white !hover:bg-[#222222] border-0 rounded-sm">PC쇼핑몰 상세 설명</Button>
                          <Button variant="outline" disabled={isListSameDescription} className="h-7 text-xs bg-white text-gray-700 border-gray-300 hover:bg-gray-50 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed">모바일쇼핑몰 상세 설명</Button>
                          <label className="flex items-center gap-1 text-xs text-gray-700 ml-2">
                              <Checkbox 
                                checked={isListSameDescription}
                                onCheckedChange={(checked) => setIsListSameDescription(checked as boolean)}
                                className="border-gray-300 bg-red-500 border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500" 
                              /> 
                              PC/모바일 상세설명 동일사용
                          </label>
                      </div>
                      <div className="p-2">
                           <DecorationEditor simpleToolbar />
                      </div>
                  </div>
              )}
          </div>

          {/* Guide Section */}
          <CategoryGuideSection />
        </div>
      </div>
      {/* Floating Actions */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
        <Button className="rounded-full w-12 h-12 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
            <span className="text-[10px] font-bold">Youtube</span>
        </Button>
        <Button className="rounded-full w-12 h-12 bg-[#6E36E2] hover:bg-[#6E36E2]/90 shadow-lg text-white p-0 flex flex-col items-center justify-center border-0 gap-0">
            <span className="text-[10px] leading-none">따라</span>
            <span className="text-[10px] leading-none">하기</span>
        </Button>
        <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
            <ChevronUp size={20} />
        </Button>
        <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
            <ChevronDown size={20} />
        </Button>
      </div>
    </div>
  );
}

