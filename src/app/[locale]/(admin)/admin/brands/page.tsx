"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useTransition, useCallback } from "react";
import { Brand } from "@/generated/prisma";
import { 
  getBrandsAction, 
  getBrandAction,
  createBrandAction, 
  updateBrandAction, 
  deleteBrandAction 
} from "@/actions/brand-actions";
import { uploadImageAction } from "@/actions/product-actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronUp,
  Folder,
  HelpCircle,
  Play,
  File,
} from "lucide-react";
import MemberGradeSelectPopup from "@/components/admin/MemberGradeSelectPopup";

interface BrandWithChildren extends Brand {
  children?: BrandWithChildren[];
}

interface BrandHtmlContents {
  navTopPC: string;
  navTopMobile: string;
  recTopPC: string;
  recTopMobile: string;
  listTopPC: string;
  listTopMobile: string;
}

const buildTree = (items: BrandWithChildren[]) => {
  const rootItems: BrandWithChildren[] = [];
  const lookup: { [key: string]: BrandWithChildren } = {};

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

export default function BrandManagementPage() {
  const _router = useRouter();
  // const [brands, setBrands] = useState<BrandWithChildren[]>([]); // Unused
  const [brandTree, setBrandTree] = useState<BrandWithChildren[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<BrandWithChildren | null>(null);
  const [isPending, startTransition] = useTransition();
  const [mode, setMode] = useState<"edit" | "create_root" | "create_sub" | null>(null);
  // File Input Refs
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  // Selected Files State
  const [imageFile, setImageFile] = useState<File | null>(null);

  const resetUploadState = () => {
      setImageFile(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
  };

  // Member Grade Popup State
  const [isMemberGradePopupOpen, setIsMemberGradePopupOpen] = useState(false);
  // const [selectedMemberGrades, setSelectedMemberGrades] = useState<any[]>([]); // Unused

  // Product Select Popup State
  const [_isProductSelectPopupOpen, setIsProductSelectPopupOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
      name: "",
      nameCN: "",
      nameEN: "",
      customUrl: "",
      type: "GENERAL",
      isExposedKR: true,
      isExposedCN: true,
      displayStatusPC: "DISPLAY",
      displayStatusMobile: "DISPLAY",
      parentId: null as string | null,
      isAdultAuth: false,
      accessType: "ALL",
      accessInaccessibleExposed: false,
      accessApplyToChildren: false,
      productDisplayType: "AUTO",
      productDisplaySort: "RECENT",
      pcTheme: "브랜드테마",
      mobileTheme: "브랜드테마",

      // 이미지 설정
      logoUrl: "",
      pcImageUrl: "",
      pcMouseoverImageUrl: "",
      mobileImageUrl: "",

      // SEO 설정
      isSeoUsed: false,
      seoTitle: "",
      seoAuthor: "",
      seoDescription: "",
      seoKeywords: [] as string[],

      // 추천 상품 설정
      isRecApplyToChildren: false,
      isRecExposedPC: true,
      isRecExposedMobile: true,
      recProductDisplayType: "AUTO",
      recPcTheme: "추천상품테마",
      recMobileTheme: "추천상품테마",

      // 꾸미기 (HTML Content)
      htmlContents: {
          navTopPC: "",
          navTopMobile: "",
          recTopPC: "",
          recTopMobile: "",
          listTopPC: "",
          listTopMobile: ""
      },

      // 선택된 추천 상품
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recommendedProducts: [] as { productId: string, product?: Record<string, any> }[],
  });

  const fetchBrands = useCallback(async () => {
    const res = await getBrandsAction();
    const tree = buildTree(res as BrandWithChildren[]);
    // setBrands(res as BrandWithChildren[]);
    setBrandTree(tree);
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
      const file = e.target.files?.[0];
      if (file) {
          setFile(file);
      }
  };



  const handleSelectBrand = async (brand: BrandWithChildren) => {
    startTransition(async () => {
        const fullBrand = await getBrandAction(brand.id);
        if (!fullBrand) return;

        setSelectedBrand(fullBrand as unknown as BrandWithChildren);
        setMode("edit");
        resetUploadState();

        const htmlContents = (fullBrand.htmlContents as unknown as BrandHtmlContents) || {
            navTopPC: "",
            navTopMobile: "",
            recTopPC: "",
            recTopMobile: "",
            listTopPC: "",
            listTopMobile: ""
        };

        setFormData({
            name: fullBrand.name,
            nameCN: fullBrand.nameCN || "",
            nameEN: fullBrand.nameEN || "",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            customUrl: (fullBrand as any).customUrl || "",
            type: fullBrand.type,
            isExposedKR: fullBrand.isExposedKR,
            isExposedCN: fullBrand.isExposedCN,
            displayStatusPC: fullBrand.displayStatusPC,
            displayStatusMobile: fullBrand.displayStatusMobile,
            parentId: fullBrand.parentId,
            isAdultAuth: fullBrand.isAdultAuth,
            accessType: fullBrand.accessType,
            accessInaccessibleExposed: (fullBrand as unknown as { accessInaccessibleExposed: boolean }).accessInaccessibleExposed || false,
            accessApplyToChildren: (fullBrand as unknown as { accessApplyToChildren: boolean }).accessApplyToChildren || false,
            productDisplayType: fullBrand.productDisplayType,
            productDisplaySort: (fullBrand as unknown as { productDisplaySort: string }).productDisplaySort || "RECENT",
            pcTheme: fullBrand.pcTheme || "브랜드테마",
            mobileTheme: fullBrand.mobileTheme || "브랜드테마",

            // 이미지 설정
            logoUrl: fullBrand.logoUrl || "",
            pcImageUrl: fullBrand.pcImageUrl || "",
            pcMouseoverImageUrl: fullBrand.pcMouseoverImageUrl || "",
            mobileImageUrl: fullBrand.mobileImageUrl || "",

            // SEO 설정
            isSeoUsed: fullBrand.isSeoUsed,
            seoTitle: fullBrand.seoTitle || "",
            seoAuthor: fullBrand.seoAuthor || "",
            seoDescription: fullBrand.seoDescription || "",
            seoKeywords: fullBrand.seoKeywords || [],

            // 추천 상품 설정
            isRecApplyToChildren: fullBrand.isRecApplyToChildren,
            isRecExposedPC: fullBrand.isRecExposedPC,
            isRecExposedMobile: fullBrand.isRecExposedMobile,
            recProductDisplayType: fullBrand.recProductDisplayType,
            recPcTheme: fullBrand.recPcTheme || "추천상품테마",
            recMobileTheme: fullBrand.recMobileTheme || "추천상품테마",

            htmlContents,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            recommendedProducts: (fullBrand as unknown as { recommendedProducts: any[] }).recommendedProducts || [],
        });
    });
  };

  const handleCreateRoot = () => {
    setSelectedBrand(null);
    setMode("create_root");
    resetUploadState();
    setFormData({
      name: "",
      nameCN: "",
      nameEN: "",
      customUrl: "",
      type: "GENERAL",
      isExposedKR: true,
      isExposedCN: true,
      displayStatusPC: "DISPLAY",
      displayStatusMobile: "DISPLAY",
      parentId: null,
      isAdultAuth: false,
      accessType: "ALL",
      accessInaccessibleExposed: false,
      accessApplyToChildren: false,
      productDisplayType: "AUTO",
      productDisplaySort: "RECENT",
      pcTheme: "브랜드테마",
      mobileTheme: "브랜드테마",
      logoUrl: "",
      pcImageUrl: "",
      pcMouseoverImageUrl: "",
      mobileImageUrl: "",
      isSeoUsed: false,
      seoTitle: "",
      seoAuthor: "",
      seoDescription: "",
      seoKeywords: [],
      isRecApplyToChildren: false,
      isRecExposedPC: true,
      isRecExposedMobile: true,
      recProductDisplayType: "AUTO",
      recPcTheme: "추천상품테마",
      recMobileTheme: "추천상품테마",
      htmlContents: {
          navTopPC: "",
          navTopMobile: "",
          recTopPC: "",
          recTopMobile: "",
          listTopPC: "",
          listTopMobile: ""
      },
      recommendedProducts: [],
    });
  };

  const handleCreateSub = () => {
    if (!selectedBrand) {
      alert("상위 브랜드를 선택해주세요.");
      return;
    }
    setMode("create_sub");
    resetUploadState();
    setFormData({
      name: "",
      nameCN: "",
      nameEN: "",
      customUrl: "",
      type: "GENERAL",
      isExposedKR: true,
      isExposedCN: true,
      displayStatusPC: "DISPLAY",
      displayStatusMobile: "DISPLAY",
      parentId: selectedBrand.id,
      isAdultAuth: false,
      accessType: "ALL",
      accessInaccessibleExposed: false,
      accessApplyToChildren: false,
      productDisplayType: "AUTO",
      productDisplaySort: "RECENT",
      pcTheme: "브랜드테마",
      mobileTheme: "브랜드테마",
      logoUrl: "",
      pcImageUrl: "",
      pcMouseoverImageUrl: "",
      mobileImageUrl: "",
      isSeoUsed: false,
      seoTitle: "",
      seoAuthor: "",
      seoDescription: "",
      seoKeywords: [],
      isRecApplyToChildren: false,
      isRecExposedPC: true,
      isRecExposedMobile: true,
      recProductDisplayType: "AUTO",
      recPcTheme: "추천상품테마",
      recMobileTheme: "추천상품테마",
      htmlContents: {
          navTopPC: "",
          navTopMobile: "",
          recTopPC: "",
          recTopMobile: "",
          listTopPC: "",
          listTopMobile: ""
      },
      recommendedProducts: [],
    });
  };

  const handleSave = async () => {
      let uploadedLogoUrl = formData.logoUrl;

      // Handle image uploads before starting transition
      if (imageFile) {
          const uploadData = new FormData();
          uploadData.append("file", imageFile);
          try {
              const res = await uploadImageAction(uploadData);
              if (res.success && res.url) {
                  uploadedLogoUrl = res.url;
              }
          } catch (e) {
              console.error("Failed to upload brand image:", e);
          }
      }

    startTransition(async () => {
      let result;
      const payload = {
          ...formData,
          logoUrl: uploadedLogoUrl,
          pcImageUrl: uploadedLogoUrl,
          mobileImageUrl: uploadedLogoUrl,
          pcMouseoverImageUrl: formData.pcMouseoverImageUrl,
          nameCN: formData.name, // Ensure CN name is same
          displayStatusMobile: formData.displayStatusPC, // Sync display status
          mobileTheme: formData.pcTheme, // Sync theme
          recMobileTheme: formData.recPcTheme, // Sync rec theme
          isRecExposedMobile: formData.isRecExposedPC, // Sync rec exposure
          htmlContents: {
              ...formData.htmlContents,
              navTopMobile: formData.htmlContents.navTopPC,
              recTopMobile: formData.htmlContents.recTopPC,
              listTopMobile: formData.htmlContents.listTopPC,
          },
          recommendedProducts: formData.recommendedProducts.map((rp, index) => ({
              productId: rp.productId,
              order: index
          }))
      };

      if (mode === "edit" && selectedBrand) {
        result = await updateBrandAction(selectedBrand.id, payload);
      } else {
        result = await createBrandAction(payload); // Apply synced fields to new brands too
      }

      if (result.success) {
        alert("저장되었습니다.");
        resetUploadState();
        fetchBrands();
      } else {
        alert(result.error || "실패했습니다.");
      }
    });
  };

  const _handleSelectProducts = async () => {
      setIsProductSelectPopupOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _handleProductSelectConfirm = (selectedProducts: { id: number | string; [key: string]: any }[]) => {
      const newProducts = selectedProducts.map(p => ({
          productId: String(p.id),
          product: p
      }));
      
      // Filter out duplicates if necessary, or just append
      // For now, let's append but check for existing IDs to avoid exact duplicates
      const existingIds = new Set(formData.recommendedProducts.map(rp => rp.productId));
      const filteredNew = newProducts.filter(np => !existingIds.has(np.productId));

      if (filteredNew.length === 0 && newProducts.length > 0) {
          alert("이미 추가된 상품들입니다.");
          setIsProductSelectPopupOpen(false);
          return;
      }

      setFormData({
          ...formData,
          recommendedProducts: [...formData.recommendedProducts, ...filteredNew]
      });
      setIsProductSelectPopupOpen(false);
  };

  const _handleRemoveSelectedProducts = () => {
      // For simplicity, let's just remove all for now or implement selection state
      setFormData({
          ...formData,
          recommendedProducts: []
      });
  };

  const handleDelete = async () => {
    if (!selectedBrand) return;
    if (!confirm("정말 삭제하시겠습니까?")) return;

    startTransition(async () => {
      const res = await deleteBrandAction(selectedBrand.id);
      if (res.success) {
        alert("삭제되었습니다.");
        fetchBrands();
        setSelectedBrand(null);
        setMode(null);
      } else {
        alert(res.error);
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMemberGradeConfirm = (selectedGrades: any[]) => {
      // setSelectedMemberGrades(selectedGrades);
      console.log("Selected Grades:", selectedGrades);
  };

  const renderTree = (nodes: BrandWithChildren[], depth = 0) => {
    return nodes.map((node) => (
      <div key={node.id} className="select-none">
        <div
          className={`flex items-center gap-1 py-1 cursor-pointer hover:bg-blue-50 ${
            selectedBrand?.id === node.id ? "bg-blue-100" : ""
          }`}
          style={{ paddingLeft: `${depth * 16}px` }}
          onClick={(e) => {
            e.stopPropagation();
            handleSelectBrand(node);
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
        <h1 className="text-2xl font-bold text-gray-900">브랜드 관리</h1>
        <Button 
            onClick={handleSave} 
            disabled={isPending}
            className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm"
        >
          {isPending ? "저장중" : "저장"}
        </Button>
      </div>

      <div className="flex gap-6 h-full">
        {/* Left Sidebar: Brand Tree */}
        <div className="w-[250px] flex-shrink-0 border-r border-gray-200 pr-4 min-h-[800px]">
          <div className="flex gap-1 mb-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs px-2 rounded-sm border-gray-300 bg-white hover:bg-gray-50"
              onClick={handleCreateRoot}
            >
              1차 브랜드 생성
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs px-2 rounded-sm border-gray-300 bg-white hover:bg-gray-50"
              onClick={handleCreateSub}
            >
              하위 브랜드 생성
            </Button>

          </div>
          
          <div className="border border-gray-300 h-full bg-white p-2 overflow-y-auto">
             <div className="tree-item flex items-center gap-1 py-1 text-gray-700 cursor-pointer">
                 <Play className="w-2 h-2 fill-gray-500 text-gray-500 transform rotate-90" />
                 <Folder className="w-4 h-4 text-orange-200 fill-orange-200" />
                 <span className="text-sm font-bold">브랜드</span>
             </div>
             <div className="pl-4">
                 {renderTree(brandTree)}
             </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-10 min-w-0">
          
          {/* Section 1: Brand Info */}
          <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-black">
                  <div className="flex items-center gap-2">
                       <h2 className="text-lg font-bold text-gray-800">
                          {mode === 'create_root' ? '1차 브랜드 생성' : 
                           mode === 'create_sub' ? '하위 브랜드 생성' : 
                           selectedBrand ?  '브랜드 정보' : '브랜드를 선택하세요'}
                      </h2>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                  </div>
                  {selectedBrand && mode === 'edit' && (
                  <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm" className="h-7 text-xs bg-gray-400 text-white hover:bg-gray-500 rounded-sm">상품진열</Button>
                      <Button variant="outline" size="sm" onClick={handleDelete} className="h-7 text-xs text-red-500 border-red-200 hover:bg-red-50">삭제</Button>
                      <button className="flex items-center text-xs text-blue-600 font-bold">닫힘 <ChevronUp className="w-3 h-3 ml-1"/></button>
                  </div>
                  )}
              </div>

              <div className="border-t border-gray-200 text-xs">
                  {/* Row: Brand Name */}
                  <div className="flex border-b border-gray-200">
                      <div className="w-[220px] bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-start pt-6 border-r border-gray-200 relative">
                           <div className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-red-500 rounded-full mb-0.5"></div>
                                <span>브랜드명</span>
                                <HelpCircle className="w-3 h-3 text-gray-400 ml-1" />
                            </div>
                      </div>
                       <div className="flex-1 p-3 space-y-2">
                          <div className="flex items-center gap-2">
                              <Input 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value, nameCN: e.target.value})}
                                className="w-[300px] h-7 text-xs border-gray-300 rounded-sm" 
                                placeholder="브랜드명을 입력하세요"
                              />
                              <span className="text-gray-400 text-[11px]"><strong className="text-red-500">{formData.name.length}</strong> / 30</span>
                          </div>
                          <div className="text-[11px] text-gray-500 mt-2 pl-0">
                             <p className="flex items-center gap-1">
                                 <span className="bg-gray-600 text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[1px] font-bold">!</span>
                                 기본적으로 입력된 텍스트로 해당 브랜드 보여집니다
                             </p>
                             <p className="flex items-center gap-1 mt-1 pl-4 text-gray-400">
                                 브랜드를 이미지로 노출하려면 아래 "브랜드 이미지등록" 항목에 이미지를 등록하세요.
                             </p>
                          </div>
                      </div>
                  </div>

                  {/* Row: Brand Type */}
                  <div className="flex border-b border-gray-200">
                       <div className="w-[220px] bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          브랜드 타입
                      </div>
                       <div className="flex-1 p-3">
                          <RadioGroup 
                            value={formData.type} 
                            onValueChange={(val) => setFormData({...formData, type: val})}
                            className="flex flex-col gap-2"
                          >
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="GENERAL" id="type-general" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                  <Label htmlFor="type-general" className="text-gray-700 font-normal">일반 브랜드 <span className="text-blue-500">(브랜드 페이지가 있고, 상품연결이 되는 일반적인 브랜드입니다)</span></Label>
                              </div>
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="GROUP" id="type-group" className="rounded-full border-gray-300 text-gray-600" />
                                  <Label htmlFor="type-group" className="text-gray-700 font-normal">그룹(구분) 브랜드 <span className="text-blue-500">(브랜드 페이지가 없고, 상품연결이 안되는 그룹(구분) 브랜드입니다)</span></Label>
                              </div>
                          </RadioGroup>
                      </div>
                  </div>

                  {/* Row: Display Status */}
                  <div className="flex border-b border-gray-200">
                        <div className="w-[220px] bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          쇼핑몰 노출상태
                      </div>
                       <div className="flex-1 p-3">
                           <RadioGroup 
                                value={formData.displayStatusPC} 
                                onValueChange={(val) => setFormData({...formData, displayStatusPC: val, displayStatusMobile: val})}
                                className="flex gap-6"
                           >
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="DISPLAY" id="visible" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                  <Label htmlFor="visible" className="text-gray-700 font-normal cursor-pointer">노출함</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                  <RadioGroupItem value="HIDDEN" id="hidden" className="rounded-full border-gray-300 text-gray-600" />
                                  <Label htmlFor="hidden" className="text-gray-700 font-normal cursor-pointer">노출안함</Label>
                              </div>
                          </RadioGroup>
                      </div>
                  </div>

                  {/* Row: Brand Image */}
                  <div className="flex border-b border-gray-200">
                        <div className="w-[220px] bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          브랜드 이미지 등록
                      </div>
                      <div className="flex-1 p-3 flex flex-col justify-center gap-2">
                          <div className="flex items-center gap-1">
                               <input 
                                  type="file" 
                                  className="hidden" 
                                  ref={imageInputRef} 
                                  onChange={(e) => handleFileChange(e, setImageFile)}
                               />
                               <Button variant="secondary" size="sm" onClick={() => imageInputRef.current?.click()} className="h-7 text-xs !bg-[#333333] text-white !hover:bg-[#222222] rounded-none px-3">찾아보기</Button>
                               <div className="w-[180px] h-7 border border-gray-300 bg-[#F1F1F1] flex items-center px-2 text-xs text-gray-600 truncate">
                                   {imageFile ? imageFile.name : ""}
                               </div>
                          </div>
                      </div>
                  </div>



                   {/* Row: Access Permission */}
                   <div className="flex border-b border-gray-200">
                        <div className="w-[220px] bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          접근 권한
                      </div>
                       <div className="flex-1 p-3">
                           <div className="flex flex-col gap-2">
                               <RadioGroup 
                                value={formData.accessType} 
                                onValueChange={(val: string) => {
                                    setFormData({...formData, accessType: val});
                                    if (val === "SPECIFIC") {
                                        setIsMemberGradePopupOpen(true);
                                    }
                                }}
                                className="flex flex-row items-center gap-6"
                               >
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="ALL" id="access-all" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                    <Label htmlFor="access-all" className="text-gray-700 font-normal cursor-pointer">전체(회원+비회원)</Label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="MEMBER" id="access-member" className="rounded-full border-gray-300 text-gray-600" />
                                    <Label htmlFor="access-member" className="text-gray-700 font-normal cursor-pointer">회원전용(비회원제외)</Label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <RadioGroupItem value="SPECIFIC" id="access-specific" className="rounded-full border-gray-300 text-gray-600" />
                                    <Label htmlFor="access-specific" className="text-gray-700 font-normal cursor-pointer">특정 회원등급</Label>
                                    <Button 
                                        variant="secondary" 
                                        size="sm" 
                                        className="h-6 text-xs bg-gray-400 text-white rounded-none px-2 ml-1"
                                        onClick={() => setIsMemberGradePopupOpen(true)}
                                    >회원등급 선택</Button>
                                    <label className="flex items-center gap-1.5 cursor-pointer ml-2">
                                        <span className="text-gray-500">(</span>
                                        <Checkbox 
                                          className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" 
                                          checked={formData.accessInaccessibleExposed}
                                          onCheckedChange={(checked) => setFormData({...formData, accessInaccessibleExposed: !!checked})}
                                        />
                                        <span className="text-gray-500 text-xs">접근불가 고객 브랜드 노출함 )</span>
                                    </label>
                                  </div>
                               </RadioGroup>
                               <label className="flex items-center gap-1.5 cursor-pointer mt-1">
                                   <Checkbox 
                                     className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" 
                                     checked={formData.accessApplyToChildren}
                                     onCheckedChange={(checked) => setFormData({...formData, accessApplyToChildren: !!checked})}
                                   />
                                   <span className="text-gray-700 text-xs">하위 브랜드 동일 적용</span>
                               </label>
                           </div>
                      </div>
                  </div>

                   {/* Row: Product Display Type */}
                   <div className="flex border-b border-gray-200">
                       <div className="w-[220px] bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                          상품진열 타입
                      </div>
                       <div className="flex-1 p-3">
                           <div className="flex flex-col gap-2 mb-2">
                                <RadioGroup 
                                    value={formData.productDisplayType} 
                                    onValueChange={(val: string) => setFormData({...formData, productDisplayType: val})}
                                    className="flex flex-col gap-2"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="AUTO" id="disp-auto" className="rounded-full border-red-500 text-red-500 focus:ring-red-500" />
                                            <Label htmlFor="disp-auto" className="text-gray-700 font-normal cursor-pointer">자동진열</Label>
                                        </div>
                                         <Select 
                                            value={formData.productDisplaySort} 
                                            onValueChange={(val: string) => setFormData({...formData, productDisplaySort: val})}
                                            disabled={formData.productDisplayType !== 'AUTO'}
                                         >
                                            <SelectTrigger className="w-48 h-7 text-xs border-red-500 rounded-sm text-gray-700">
                                                <SelectValue placeholder="최근 등록 상품 위로" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="RECENT_DESC">최근 등록 상품 위로</SelectItem>
                                                <SelectItem value="RECENT_ASC">최근 등록 상품 아래로</SelectItem>
                                                <SelectItem value="MOD_DESC">최근 수정 상품 위로</SelectItem>
                                                <SelectItem value="MOD_ASC">최근 수정 상품 아래로</SelectItem>
                                                <SelectItem value="NAME_ASC">상품명 가나다순</SelectItem>
                                                <SelectItem value="NAME_DESC">상품명 가나다역순</SelectItem>
                                                <SelectItem value="PRICE_DESC">판매가 높은 상품 위로</SelectItem>
                                                <SelectItem value="PRICE_ASC">판매가 높은 상품 아래로</SelectItem>
                                                <SelectItem value="SALES_DESC">판매량 높은 상품 위로</SelectItem>
                                                <SelectItem value="SALES_ASC">판매량 높은 상품 아래로</SelectItem>
                                                <SelectItem value="VIEW_DESC">조회수 높은 상품 위로</SelectItem>
                                                <SelectItem value="VIEW_ASC">조회수 높은 상품 아래로</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="MANUAL" id="disp-manual" className="rounded-full border-gray-300 text-gray-600" />
                                        <Label htmlFor="disp-manual" className="text-gray-700 font-normal cursor-pointer">수동진열</Label>
                                    </div>
                                </RadioGroup>
                           </div>
                           <p className="text-blue-500 text-[11px]">수동진열 : [브랜드 페이지 상품진열]에서 진열순서를 별도로 설정할 수 있습니다.</p>
                      </div>
                  </div>


              </div>
          </div>





                {/* Footer */}
                <div className="text-center text-[11px] text-[#888888] py-8 border-t border-[#E6E6E6] mt-10">
                   © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-[#DA5A4A]">5.1.23.1206.5ccf2dd6</span>)
                </div>

        </div>
      </div>

             <MemberGradeSelectPopup 
        isOpen={isMemberGradePopupOpen} 
        onClose={() => setIsMemberGradePopupOpen(false)} 
        onConfirm={handleMemberGradeConfirm} 
      />

    </div>
  );
}
