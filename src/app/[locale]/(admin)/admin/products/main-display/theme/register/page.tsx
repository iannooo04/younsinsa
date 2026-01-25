"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { HelpCircle, MoveHorizontal, MoveVertical, Book } from "lucide-react";

export default function ThemeRegisterPage() {
    // Basic Info
    const [mallType, setMallType] = useState('PC');
    const [themeName, setThemeName] = useState('');
    const [themeCategory, setThemeCategory] = useState('main');

    // Detail Settings
    const [imageSetting, setImageSetting] = useState('list_default');
    const [cols, setCols] = useState('4');
    const [rows, setRows] = useState('5');
    const [soldOutExposure, setSoldOutExposure] = useState('exposed');
    const [soldOutSort, setSoldOutSort] = useState('sort');
    const [soldOutIcon, setSoldOutIcon] = useState('exposed');
    const [iconExposure, setIconExposure] = useState('exposed');
    
    // Checkboxes
    const [showImage, setShowImage] = useState(true);
    const [showBrand, setShowBrand] = useState(false);
    const [showManufacturer, setShowManufacturer] = useState(false);
    const [showName, setShowName] = useState(true);
    const [showShortDesc, setShowShortDesc] = useState(false);
    const [showPrice, setShowPrice] = useState(false);
    const [showSalePrice, setShowSalePrice] = useState(false);
    const [showDiscountPrice, setShowDiscountPrice] = useState(false);
    const [showCouponPrice, setShowCouponPrice] = useState(false);
    const [showProductDiscount, setShowProductDiscount] = useState(false);
    const [showMileage, setShowMileage] = useState(false);
    const [showModelNo, setShowModelNo] = useState(false);
    const [showProductCode, setShowProductCode] = useState(false);

    const [discountProduct, setDiscountProduct] = useState(true);
    const [discountCoupon, setDiscountCoupon] = useState(false);
    
    const [strikePrice, setStrikePrice] = useState(true);
    const [strikeSalePrice, setStrikeSalePrice] = useState(false); // Using "P" (Price) or "S" (Sale) logic if needed, simplied to checkbox for now

    const [showDiscountRate, setShowDiscountRate] = useState(false);

    // Display Type
    const [displayType, setDisplayType] = useState('gallery');

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
             {/* Header */}
             <div className="flex items-center justify-between pb-4 border-b border-black">
                <h1 className="text-2xl font-bold text-gray-900">테마 등록</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-gray-300 h-9" onClick={() => window.history.back()}>목록</Button>
                    <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 h-9 text-white font-bold">저장</Button>
                </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">기본정보</h2>
                    <HelpCircle size={14} className="text-gray-400" />
                </div>
                
                <div className="border border-gray-300">
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center gap-1">쇼핑몰 유형 <HelpCircle size={14} className="text-gray-400" /></div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <RadioGroup value={mallType} onValueChange={setMallType} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="PC" id="mall-pc" className="text-red-500 border-red-500" />
                                    <Label htmlFor="mall-pc">PC쇼핑몰</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="MOBILE" id="mall-mobile" />
                                    <Label htmlFor="mall-mobile">모바일쇼핑몰</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">테마코드</div>
                        <div className="flex-1 p-3 text-gray-600">
                            테마 등록 저장 시 자동 생성됩니다.
                        </div>
                    </div>
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center gap-1"><span className="text-red-500 font-bold">•</span> 테마명 <HelpCircle size={14} className="text-gray-400" /></div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <div className="relative w-96">
                                <Input value={themeName} onChange={(e) => setThemeName(e.target.value)} className="pr-12 h-8" />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-red-500 font-bold">{themeName.length} / 60</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center gap-1">테마분류 <HelpCircle size={14} className="text-gray-400" /></div>
                        <div className="flex-1 p-3">
                            <RadioGroup value={themeCategory} onValueChange={setThemeCategory} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="main" id="cat-main" className="text-red-500 border-red-500" />
                                    <Label htmlFor="cat-main">메인테마</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="category" id="cat-category" />
                                    <Label htmlFor="cat-category">카테고리테마</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="brand" id="cat-brand" />
                                    <Label htmlFor="cat-brand">브랜드테마</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="search" id="cat-search" />
                                    <Label htmlFor="cat-search">검색페이지테마</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="recommend" id="cat-recommend" />
                                    <Label htmlFor="cat-recommend">추천상품테마</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="plan" id="cat-plan" />
                                    <Label htmlFor="cat-plan">기획전테마</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>

            {/* List Settings */}
            <div className="space-y-4 pt-4">
                 <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">리스트 영역 상세 설정</h2>
                    <HelpCircle size={14} className="text-gray-400" />
                </div>
                
                <div className="border border-gray-300">
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 text-[13px]">이미지설정</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Select value={imageSetting} onValueChange={setImageSetting}>
                                <SelectTrigger className="w-64 h-8 text-xs">
                                    <SelectValue placeholder="리스트이미지(기본) - 180 pixel" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="list_default">리스트이미지(기본) - 180 pixel</SelectItem>
                                    <SelectItem value="list_group">리스트그룹형 - 166 pixel</SelectItem>
                                    <SelectItem value="simple">심플이미지형 - 248 pixel</SelectItem>
                                    <SelectItem value="add_list_1">추가리스트1 - 220 pixel</SelectItem>
                                    <SelectItem value="add_list_2">추가리스트2 - 280 pixel</SelectItem>
                                    <SelectItem value="add_image_1">추가이미지1 - 310 pixel</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="text-gray-400 text-xs flex items-center gap-1 whitespace-nowrap">
                                <span className="bg-black text-white text-[10px] px-1 font-bold">!</span> 이미지는 <span className="text-blue-500 underline cursor-pointer">기본설정&gt;상품 정책&gt;상품 이미지 사이즈 설정</span>에서 관리할 수 있습니다.
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex border-b border-gray-200">
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 text-[13px]">상품 노출 개수</div>
                         <div className="flex-1 p-3 flex items-center gap-2 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                                <span>가로 :</span>
                                <Input value={cols} onChange={(e) => setCols(e.target.value)} className="w-16 h-8 text-center" />
                            </div>
                            <span className="mx-1">X</span>
                            <div className="flex items-center gap-1">
                                <span>세로 :</span>
                                <Input value={rows} onChange={(e) => setRows(e.target.value)} className="w-16 h-8 text-center" />
                            </div>
                         </div>
                    </div>

                    <div className="flex border-b border-gray-200">
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 text-[13px]">품절상품 노출</div>
                         <div className="flex-1 p-3 flex items-center gap-6 border-r border-gray-200">
                            <RadioGroup value={soldOutExposure} onValueChange={setSoldOutExposure} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="exposed" id="so-exposed" className="text-red-500 border-red-500" />
                                    <Label htmlFor="so-exposed">노출함</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hidden" id="so-hidden" />
                                    <Label htmlFor="so-hidden">노출안함</Label>
                                </div>
                            </RadioGroup>
                         </div>
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 text-[13px]">품절상품 진열</div>
                         <div className="flex-1 p-3 flex items-center gap-6">
                            <RadioGroup value={soldOutSort} onValueChange={setSoldOutSort} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sort" id="so-sort" className="text-red-500 border-red-500" />
                                    <Label htmlFor="so-sort">정렬 순서대로 보여주기</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="end" id="so-end" />
                                    <Label htmlFor="so-end">리스트 끝으로 보내기</Label>
                                </div>
                            </RadioGroup>
                         </div>
                    </div>

                    <div className="flex border-b border-gray-200">
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 text-[13px]">품절 아이콘 노출</div>
                         <div className="flex-1 p-3 flex items-center gap-6 border-r border-gray-200">
                            <RadioGroup value={soldOutIcon} onValueChange={setSoldOutIcon} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="exposed" id="soi-exposed" className="text-red-500 border-red-500" />
                                    <Label htmlFor="soi-exposed">노출함</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hidden" id="soi-hidden" />
                                    <Label htmlFor="soi-hidden">노출안함</Label>
                                </div>
                            </RadioGroup>
                         </div>
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 text-[13px]">아이콘 노출</div>
                         <div className="flex-1 p-3 flex items-center gap-6">
                            <RadioGroup value={iconExposure} onValueChange={setIconExposure} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="exposed" id="icon-exposed" className="text-red-500 border-red-500" />
                                    <Label htmlFor="icon-exposed">노출함</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hidden" id="icon-hidden" />
                                    <Label htmlFor="icon-hidden">노출안함</Label>
                                </div>
                            </RadioGroup>
                         </div>
                    </div>

                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 text-[13px] flex items-center gap-1"><span className="text-red-500 font-bold">•</span> 노출항목 설정 <HelpCircle size={14} className="text-gray-400" /></div>
                        <div className="flex-1 p-3 flex flex-wrap gap-4 text-xs text-gray-700">
                           <label className="flex items-center gap-1"><Checkbox checked={showImage} onCheckedChange={(c) => setShowImage(!!c)} className={showImage ? "bg-[#FF424D] border-[#FF424D]" : ""} /> 이미지</label>
                           <label className="flex items-center gap-1"><Checkbox checked={false} /> 대표색상</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showBrand} onCheckedChange={(c) => setShowBrand(!!c)} /> 브랜드</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showManufacturer} onCheckedChange={(c) => setShowManufacturer(!!c)} /> 제조사</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showName} onCheckedChange={(c) => setShowName(!!c)} className={showName ? "bg-[#FF424D] border-[#FF424D]" : ""} /> 상품명</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showShortDesc} onCheckedChange={(c) => setShowShortDesc(!!c)} /> 짧은설명</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showPrice} onCheckedChange={(c) => setShowPrice(!!c)} /> 정가</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showSalePrice} onCheckedChange={(c) => setShowSalePrice(!!c)} /> 판매가</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showDiscountPrice} onCheckedChange={(c) => setShowDiscountPrice(!!c)} /> 할인적용가</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showCouponPrice} onCheckedChange={(c) => setShowCouponPrice(!!c)} /> 쿠폰가</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showProductDiscount} onCheckedChange={(c) => setShowProductDiscount(!!c)} /> 상품할인금액</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showMileage} onCheckedChange={(c) => setShowMileage(!!c)} /> 마일리지</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showModelNo} onCheckedChange={(c) => setShowModelNo(!!c)} /> 모델번호</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showProductCode} onCheckedChange={(c) => setShowProductCode(!!c)} /> 상품코드</label>
                        </div>
                    </div>

                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 text-[13px]">할인적용가 설정</div>
                        <div className="flex-1 p-3 border-r border-gray-200">
                             <div className="flex gap-4 mb-2">
                                <label className="flex items-center gap-1 text-xs text-gray-700"><Checkbox checked={discountProduct} onCheckedChange={(c) => setDiscountProduct(!!c)} className={discountProduct ? "bg-[#FF424D] border-[#FF424D]" : ""} /> 상품할인가</label>
                                <label className="flex items-center gap-1 text-xs text-gray-700"><Checkbox checked={discountCoupon} onCheckedChange={(c) => setDiscountCoupon(!!c)} /> 상품쿠폰할인가</label>
                             </div>
                             <p className="flex items-center gap-1 text-xs text-gray-400">
                                <span className="bg-black text-white text-[10px] px-1 font-bold">!</span> 할인적용가 노출 시 적용할 할인금액을 설정합니다.
                             </p>
                        </div>
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 text-[13px]">취소선 추가 설정</div>
                         <div className="flex-1 p-3">
                             <div className="flex gap-4 mb-2">
                                <label className="flex items-center gap-1 text-xs text-gray-700"><Checkbox checked={strikePrice} onCheckedChange={(c) => setStrikePrice(!!c)} className={strikePrice ? "bg-[#FF424D] border-[#FF424D]" : ""} /> 정가</label>
                                <label className="flex items-center gap-1 text-xs text-gray-700"><Checkbox checked={strikeSalePrice} onCheckedChange={(c) => setStrikeSalePrice(!!c)} /> 판매가</label>
                             </div>
                             <p className="flex items-start gap-1 text-xs text-gray-400">
                                <span className="bg-black text-white text-[10px] px-1 font-bold mt-0.5">!</span> 
                                <span>체크시 쇼핑몰에 취소선 효과가 적용되어 출력됩니다. (예시. <span className="line-through">정가 12,000원</span>)<br/>단, 판매가의 경우 할인가가 없는 상품에는 취소선이 적용되지 않습니다.</span>
                             </p>
                         </div>
                    </div>

                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 text-[13px]">노출항목 추가 설정</div>
                         <div className="flex-1 p-3">
                             <div className="flex gap-4 mb-2">
                                <label className="flex items-center gap-1 text-xs text-gray-700"><Checkbox checked={showDiscountRate} onCheckedChange={(c) => setShowDiscountRate(!!c)} /> 할인율</label>
                             </div>
                             <p className="flex items-center gap-1 text-xs text-gray-400">
                                <span className="bg-black text-white text-[10px] px-1 font-bold">!</span> (할인율) 체크 시 판매가 대비 할인율이 할인금액에 노출됩니다. (쿠폰가와 할인적용가에 적용됩니다.)
                             </p>
                         </div>
                    </div>

                    <div className="flex border-b border-gray-200 items-stretch">
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 text-[13px] flex items-center">디스플레이 유형</div>
                         <div className="flex-1 p-4 bg-white">
                             <RadioGroup value={displayType} onValueChange={setDisplayType} className="flex gap-4 flex-wrap">
                                {/* Gallery Type */}
                                <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setDisplayType('gallery')}>
                                    <div className={`border-2 p-1 w-24 h-16 grid grid-cols-4 gap-1 ${displayType === 'gallery' ? 'border-[#FF424D]' : 'border-gray-300'}`}>
                                        {[...Array(8)].map((_,i) => <div key={i} className="bg-gray-200 h-full"></div>)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="gallery" id="dt-gallery" className={displayType === 'gallery' ? "text-red-500 border-red-500" : ""} />
                                        <Label htmlFor="dt-gallery" className="text-xs">갤러리형</Label>
                                    </div>
                                </div>

                                {/* List Type */}
                                <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setDisplayType('list')}>
                                     <div className={`border-2 p-1 w-24 h-16 flex flex-col gap-1 ${displayType === 'list' ? 'border-[#FF424D]' : 'border-gray-300'}`}>
                                        {[...Array(3)].map((_,i) => (
                                            <div key={i} className="flex gap-1 h-3">
                                                <div className="w-3 bg-gray-200"></div>
                                                <div className="flex-1 bg-gray-100 flex flex-col gap-0.5 justify-center">
                                                    <div className="h-[2px] w-full bg-gray-300"></div>
                                                    <div className="h-[2px] w-2/3 bg-gray-200"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="list" id="dt-list" />
                                        <Label htmlFor="dt-list" className="text-xs">리스트형</Label>
                                    </div>
                                </div>

                                 {/* List Group Type */}
                                 <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setDisplayType('list_group')}>
                                     <div className={`border-2 p-1 w-24 h-16 flex flex-col gap-1 ${displayType === 'list_group' ? 'border-[#FF424D]' : 'border-gray-300'}`}>
                                        <div className="flex gap-2 h-full">
                                            <div className="w-1/3 flex flex-col gap-1">
                                                <div className="h-2 bg-gray-200"></div>
                                                 <div className="h-2 bg-gray-200"></div>
                                                  <div className="h-2 bg-gray-200"></div>
                                            </div>
                                            <div className="w-2/3 bg-gray-100 p-1">
                                                <div className="w-full h-full bg-gray-200"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="list_group" id="dt-list-group" />
                                        <Label htmlFor="dt-list-group" className="text-xs">리스트그룹형</Label>
                                    </div>
                                </div>
                                
                                {/* Product Move Type */}
                                <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setDisplayType('product_move')}>
                                     <div className={`border-2 p-1 w-24 h-16 flex flex-col items-center justify-center relative ${displayType === 'product_move' ? 'border-[#FF424D]' : 'border-gray-300'}`}>
                                        <div className="flex gap-1">
                                            <div className="w-6 h-8 bg-gray-200"></div>
                                            <div className="w-6 h-8 bg-gray-200"></div>
                                            <div className="w-6 h-8 bg-gray-200"></div>
                                        </div>
                                        <MoveHorizontal className="absolute text-red-400 w-10" strokeWidth={1}/>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="product_move" id="dt-product-move" />
                                        <Label htmlFor="dt-product-move" className="text-xs">상품이동형</Label>
                                    </div>
                                </div>

                                {/* Vertical Move Type */}
                                <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setDisplayType('vertical_move')}>
                                     <div className={`border-2 p-1 w-24 h-16 flex flex-col items-center justify-center relative ${displayType === 'vertical_move' ? 'border-[#FF424D]' : 'border-gray-300'}`}>
                                         <div className="flex flex-col gap-1">
                                            <div className="w-6 h-4 bg-gray-200"></div>
                                            <div className="w-6 h-4 bg-gray-200"></div>
                                        </div>
                                        <MoveVertical className="absolute text-red-400 w-6 right-2" strokeWidth={1}/>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="vertical_move" id="dt-vertical-move" />
                                        <Label htmlFor="dt-vertical-move" className="text-xs">세로이동형</Label>
                                    </div>
                                </div>
                                
                                 {/* Scroll Type */}
                                 <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setDisplayType('scroll')}>
                                     <div className={`border-2 p-1 w-24 h-16 flex flex-col items-center justify-center relative ${displayType === 'scroll' ? 'border-[#FF424D]' : 'border-gray-300'}`}>
                                         <div className="w-full flex gap-1 overflow-hidden px-1">
                                            <div className="w-5 h-8 bg-gray-200"></div>
                                            <div className="w-5 h-8 bg-gray-200"></div>
                                            <div className="w-5 h-8 bg-gray-200"></div>
                                        </div>
                                         <div className="w-full h-1 bg-gray-100 mt-1 rounded-full"><div className="w-1/3 h-full bg-red-400 rounded-full"></div></div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="scroll" id="dt-scroll" />
                                        <Label htmlFor="dt-scroll" className="text-xs">스크롤형</Label>
                                    </div>
                                </div>
                                
                                {/* Choose Highlight Type */}
                                <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setDisplayType('highlight')}>
                                     <div className={`border-2 p-1 w-24 h-16 grid grid-cols-3 gap-1 ${displayType === 'highlight' ? 'border-[#FF424D]' : 'border-gray-300'}`}>
                                        <div className="bg-gray-200 w-full h-full border-2 border-red-500"></div>
                                        <div className="bg-gray-200 w-full h-full"></div>
                                        <div className="bg-gray-200 w-full h-full"></div>
                                        <div className="bg-gray-200 w-full h-full"></div>
                                        <div className="bg-gray-200 w-full h-full"></div>
                                        <div className="bg-gray-200 w-full h-full"></div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="highlight" id="dt-highlight" />
                                        <Label htmlFor="dt-highlight" className="text-xs">선택강조형</Label>
                                    </div>
                                </div>
                                
                                 {/* Simple Image Type */}
                                 <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setDisplayType('simple')}>
                                     <div className={`border-2 p-1 w-24 h-16 grid grid-cols-4 gap-1 place-items-center ${displayType === 'simple' ? 'border-[#FF424D]' : 'border-gray-300'}`}>
                                        {[...Array(8)].map((_,i) => <div key={i} className="bg-gray-300 w-full h-full"></div>)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="simple" id="dt-simple" />
                                        <Label htmlFor="dt-simple" className="text-xs">심플이미지형</Label>
                                    </div>
                                </div>

                                {/* Balloon Type */}
                                <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setDisplayType('balloon')}>
                                     <div className={`border-2 p-1 w-24 h-16 flex items-center justify-center ${displayType === 'balloon' ? 'border-[#FF424D]' : 'border-gray-300'}`}>
                                        <div className="bg-red-500 rounded-full w-8 h-8 flex items-center justify-center text-white text-[8px] text-center p-1 leading-tight uppercase font-bold">
                                            짧은<br/>설명글
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="balloon" id="dt-balloon" />
                                        <Label htmlFor="dt-balloon" className="text-xs">말풍선형</Label>
                                    </div>
                                </div>

                                {/* Basket Type */}
                                <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setDisplayType('basket')}>
                                     <div className={`border-2 p-1 w-24 h-16 flex justify-around items-center ${displayType === 'basket' ? 'border-[#FF424D]' : 'border-gray-300'}`}>
                                        <div className="w-8 h-10 bg-gray-200 flex flex-col justify-end items-center pb-1"><div className="w-5 h-2 border border-red-500"></div></div>
                                        <div className="w-8 h-10 bg-gray-200 flex flex-col justify-end items-center pb-1"><div className="w-5 h-2 border border-red-500"></div></div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="basket" id="dt-basket" />
                                        <Label htmlFor="dt-basket" className="text-xs">장바구니형</Label>
                                    </div>
                                </div>

                                {/* Tab Type */}
                                <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setDisplayType('tab')}>
                                     <div className={`border-2 p-1 w-24 h-16 flex flex-col gap-1 ${displayType === 'tab' ? 'border-[#FF424D]' : 'border-gray-300'}`}>
                                        <div className="flex gap-1 w-full">
                                            <div className="bg-red-500 h-2 w-1/3"></div>
                                            <div className="bg-gray-300 h-2 w-1/3"></div>
                                            <div className="bg-gray-300 h-2 w-1/3"></div>
                                        </div>
                                        <div className="w-full h-full bg-gray-100 p-1 flex gap-1">
                                            <div className="bg-gray-200 w-1/3 h-full"></div>
                                            <div className="bg-gray-200 w-1/3 h-full"></div>
                                            <div className="bg-gray-200 w-1/3 h-full"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="tab" id="dt-tab" />
                                        <Label htmlFor="dt-tab" className="text-xs">탭진열형</Label>
                                    </div>
                                </div>

                             </RadioGroup>
                         </div>
                    </div>
                </div>
            </div>

            {/* Guide Info */}
            <hr className="border-gray-200 my-6" />
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-500">
                    <Book size={16} />
                    <h3 className="font-bold text-sm">안내</h3>
                </div>
                <div className="text-xs text-gray-600 space-y-4">
                    <div>
                        <p className="font-bold text-gray-800 mb-1">리스트 영역 노출항목 이외에 추가할 수 있는 항목은 없나요?</p>
                        <p>- 디자인페이지에 아래의 치환코드를 삽입하여 "회원등급에 따른 회원가, 상품에 등록된 후기 개수, 상품클릭수"를 노출할 수 있습니다.</p>
                    </div>
                    
                    <div>
                        <p className="font-bold text-gray-800 mb-1">· 회원등급가 노출 치환코드</p>
                        <p className="mb-2">* 회원등급번호를 입력한 경우에는 로그인 여부와 상관없이 해당 등급의 회원가로만 노출되고</p>
                        <p className="mb-2">회원등급번호를 입력하지 않은 경우 로그인한 회원등급의 회원가로 노출됩니다.</p>
                        
                        <p>: 상품 리스트</p>
                        <p className="bg-gray-50 p-1 pl-2 mb-2">{`-{=gd_currency_symbol()}{=gd_money_format(dataGoodsMemberGroupPrice(...value_, 회원등급번호 )) }{=gd_currency_string()}`}</p>
                        
                        <p>: 상품 상세페이지</p>
                        <p className="bg-gray-50 p-1 pl-2 mb-1">{`-{=gd_money_format(dataGoodsMemberGroupPrice(goodsView, gMember.groupSno )) }`}</p>
                        <p className="text-gray-400 mb-1">└ 로그인한 회원의 회원등급가로 노출됩니다.</p>
                        <p className="bg-gray-50 p-1 pl-2">{`-{=gd_money_format(dataGoodsMemberGroupPrice(goodsView, 회원등급번호 )) }`}</p>
                    </div>

                    <div>
                        <p className="font-bold text-gray-800 mb-1">· 상품에 등록된 후기 개수 노출 치환코드</p>
                        <p className="mb-1">: 상품 리스트, 상세페이지 공용</p>
                        <p className="bg-gray-50 p-1 pl-2">{`-{=gd_money_format(dataGoodsReviewCnt(상품코드 )) }`}</p>
                    </div>

                    <div>
                        <p className="font-bold text-gray-800 mb-1">· 상품클릭수 노출 치환코드</p>
                        <p className="mb-1">: 상품 상세페이지에만 적용</p>
                        <p className="bg-gray-50 p-1 pl-2">{`-{=goodsView['hitCnt']}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


