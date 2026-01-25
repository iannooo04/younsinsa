"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { HelpCircle, Book, List as ListIcon } from "lucide-react"; // Renamed List to ListIcon to avoid conflict

export default function ThemeEditPage() {
    // Basic Info - Pre-filled based on image
    const [mallType, setMallType] = useState('PC');
    const [themeCode] = useState('A0000001'); // Pre-filled
    const [themeName, setThemeName] = useState('검색페이지테마'); // Pre-filled
    const [themeCategory, setThemeCategory] = useState('search');

    // Detail Settings
    const [imageSetting, setImageSetting] = useState('add_list_1'); // Additional List 1 - 220 pixel
    const [cols, setCols] = useState('4');
    const [rows, setRows] = useState('5');
    const [soldOutExposure, setSoldOutExposure] = useState('exposed');
    const [soldOutSort, setSoldOutSort] = useState('sort'); // Sort Order
    const [soldOutIcon, setSoldOutIcon] = useState('exposed');
    const [iconExposure, setIconExposure] = useState('exposed');
    
    // Checkboxes - Pre-filled based on image
    const [showImage, setShowImage] = useState(true);
    const [showBrand, setShowBrand] = useState(false);
    const [showManufacturer, setShowManufacturer] = useState(false);
    const [showName, setShowName] = useState(true);
    const [showShortDesc, setShowShortDesc] = useState(false);
    const [showPrice, setShowPrice] = useState(true); // Default Price
    const [showSalePrice, setShowSalePrice] = useState(true); // Sale Price
    const [showDiscountPrice, setShowDiscountPrice] = useState(false);
    const [showCouponPrice, setShowCouponPrice] = useState(false);
    const [showProductDiscount, setShowProductDiscount] = useState(false);
    const [showMileage, setShowMileage] = useState(false);
    const [showModelNo, setShowModelNo] = useState(false);
    const [showProductCode, setShowProductCode] = useState(false);
    const [showColor, setShowColor] = useState(false); // Representative Color

    const [discountProduct, setDiscountProduct] = useState(true);
    const [discountCoupon, setDiscountCoupon] = useState(false);
    
    const [strikePrice, setStrikePrice] = useState(true);
    const [strikeSalePrice, setStrikeSalePrice] = useState(false); 

    const [showDiscountRate, setShowDiscountRate] = useState(false);

    // Display Type
    const [displayType, setDisplayType] = useState('gallery');

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
             {/* Header */}
             <div className="flex items-center justify-between pb-4 border-b border-black">
                <h1 className="text-2xl font-bold text-gray-900">테마 수정</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-gray-300 h-9" onClick={() => window.history.back()}>
                        <ListIcon className="w-4 h-4 mr-1" /> 목록
                    </Button>
                    <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 h-9 text-white font-bold">저장</Button>
                </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">기본정보</h2>
                    <HelpCircle size={14} className="text-gray-400" />
                </div>
                
                <div className="border border-gray-300 text-xs">
                    <div className="flex border-b border-gray-200 min-h-[50px]">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center gap-1">쇼핑몰 유형 <HelpCircle size={14} className="text-gray-400" /></div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <RadioGroup value={mallType} onValueChange={setMallType} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="PC" id="mall-pc" className="text-gray-500 border-gray-400" />
                                    <Label htmlFor="mall-pc">PC쇼핑몰</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="MOBILE" id="mall-mobile" className="border-gray-400" />
                                    <Label htmlFor="mall-mobile">모바일쇼핑몰</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="flex border-b border-gray-200 min-h-[50px]">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">테마코드</div>
                        <div className="flex-1 p-3 text-gray-600 flex items-center">
                            {themeCode}
                        </div>
                    </div>
                    <div className="flex border-b border-gray-200 min-h-[50px]">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center gap-1"><span className="text-red-500 font-bold">•</span> 테마명 <HelpCircle size={14} className="text-gray-400" /></div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <div className="relative w-96">
                                <Input value={themeName} onChange={(e) => setThemeName(e.target.value)} className="pr-12 h-8" />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-red-500 font-bold">{themeName.length} / 60</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-b border-gray-200 min-h-[50px]">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center gap-1">테마분류 <HelpCircle size={14} className="text-gray-400" /></div>
                        <div className="flex-1 p-3 flex items-center">
                            <RadioGroup value={themeCategory} onValueChange={setThemeCategory} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="main" id="cat-main" className="border-gray-400" />
                                    <Label htmlFor="cat-main">메인테마</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="category" id="cat-category" className="border-gray-400" />
                                    <Label htmlFor="cat-category">카테고리테마</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="brand" id="cat-brand" className="border-gray-400" />
                                    <Label htmlFor="cat-brand">브랜드테마</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="search" id="cat-search" className="text-gray-500 border-gray-500" />
                                    <Label htmlFor="cat-search">검색페이지테마</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="recommend" id="cat-recommend" className="border-gray-400" />
                                    <Label htmlFor="cat-recommend">추천상품테마</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="plan" id="cat-plan" className="border-gray-400" />
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
                
                <div className="border border-gray-300 text-xs">
                    <div className="flex border-b border-gray-200 min-h-[50px]">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">이미지설정</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Select value={imageSetting} onValueChange={setImageSetting}>
                                <SelectTrigger className="w-64 h-8 text-xs">
                                    <SelectValue placeholder="이미지 설정 선택" />
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
                                <span className="bg-black text-white text-[10px] px-1 font-bold rounded-sm">!</span> 이지는 <span className="text-blue-500 underline cursor-pointer">기본설정&gt;상품 정책&gt;상품 이미지 사이즈 설정</span>에서 관리할 수 있습니다.
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex border-b border-gray-200 min-h-[50px]">
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">상품 노출 개수</div>
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

                    <div className="flex border-b border-gray-200 min-h-[50px]">
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">품절상품 노출</div>
                         <div className="flex-1 p-3 flex items-start flex-col justify-center gap-1 border-r border-gray-200">
                            <RadioGroup value={soldOutExposure} onValueChange={setSoldOutExposure} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="exposed" id="so-exposed" className="text-red-500 border-red-500" />
                                    <Label htmlFor="so-exposed">노출함</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hidden" id="so-hidden" className="border-gray-400" />
                                    <Label htmlFor="so-hidden">노출안함</Label>
                                </div>
                            </RadioGroup>
                             <p className="flex items-center gap-1 text-gray-400">
                                <span className="bg-black text-white text-[10px] px-1 font-bold rounded-sm">!</span> 페이코 서치 사용 시 해당 옵션은 페이코서치 데이터 수집 주기 시점에 적용됩니다.
                            </p>
                         </div>
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">품절상품 진열</div>
                         <div className="flex-1 p-3 flex items-start flex-col justify-center gap-1">
                            <RadioGroup value={soldOutSort} onValueChange={setSoldOutSort} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sort" id="so-sort" className="text-red-500 border-red-500" />
                                    <Label htmlFor="so-sort">정렬 순서대로 보여주기</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="end" id="so-end" className="border-gray-400" />
                                    <Label htmlFor="so-end">리스트 끝으로 보내기</Label>
                                </div>
                            </RadioGroup>
                            <p className="flex items-center gap-1 text-gray-400">
                                <span className="bg-black text-white text-[10px] px-1 font-bold rounded-sm">!</span> 페이코 서치 사용 시 '리스트 끝으로 보내기'옵션은 적용되지 않습니다.
                            </p>
                         </div>
                    </div>

                    <div className="flex border-b border-gray-200 min-h-[50px]">
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">품절 아이콘 노출</div>
                         <div className="flex-1 p-3 flex items-center gap-6 border-r border-gray-200">
                            <RadioGroup value={soldOutIcon} onValueChange={setSoldOutIcon} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="exposed" id="soi-exposed" className="text-red-500 border-red-500" />
                                    <Label htmlFor="soi-exposed">노출함</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hidden" id="soi-hidden" className="border-gray-400" />
                                    <Label htmlFor="soi-hidden">노출안함</Label>
                                </div>
                            </RadioGroup>
                         </div>
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">아이콘 노출</div>
                         <div className="flex-1 p-3 flex items-center gap-6">
                            <RadioGroup value={iconExposure} onValueChange={setIconExposure} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="exposed" id="icon-exposed" className="text-red-500 border-red-500" />
                                    <Label htmlFor="icon-exposed">노출함</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hidden" id="icon-hidden" className="border-gray-400" />
                                    <Label htmlFor="icon-hidden">노출안함</Label>
                                </div>
                            </RadioGroup>
                         </div>
                    </div>

                    <div className="flex border-b border-gray-200 min-h-[50px]">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center gap-1"><span className="text-red-500 font-bold">•</span> 노출항목 설정 <HelpCircle size={14} className="text-gray-400" /></div>
                        <div className="flex-1 p-3 flex flex-wrap gap-4 text-xs text-gray-700 items-center">
                           <label className="flex items-center gap-1"><Checkbox checked={showImage} onCheckedChange={(c) => setShowImage(!!c)} className={showImage ? "bg-[#FF424D] border-[#FF424D]" : "border-gray-300"} /> 이미지</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showColor} onCheckedChange={(c) => setShowColor(!!c)} className="border-gray-300" /> 대표색상</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showBrand} onCheckedChange={(c) => setShowBrand(!!c)} className="border-gray-300" /> 브랜드</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showManufacturer} onCheckedChange={(c) => setShowManufacturer(!!c)} className="border-gray-300" /> 제조사</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showName} onCheckedChange={(c) => setShowName(!!c)} className={showName ? "bg-[#FF424D] border-[#FF424D]" : "border-gray-300"} /> 상품명</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showShortDesc} onCheckedChange={(c) => setShowShortDesc(!!c)} className="border-gray-300" /> 짧은설명</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showPrice} onCheckedChange={(c) => setShowPrice(!!c)} className={showPrice ? "bg-[#FF424D] border-[#FF424D]" : "border-gray-300"} /> 정가</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showSalePrice} onCheckedChange={(c) => setShowSalePrice(!!c)} className={showSalePrice ? "bg-[#FF424D] border-[#FF424D]" : "border-gray-300"} /> 판매가</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showDiscountPrice} onCheckedChange={(c) => setShowDiscountPrice(!!c)} className="border-gray-300" /> 할인적용가</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showCouponPrice} onCheckedChange={(c) => setShowCouponPrice(!!c)} className="border-gray-300" /> 쿠폰가</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showProductDiscount} onCheckedChange={(c) => setShowProductDiscount(!!c)} className="border-gray-300" /> 상품할인금액</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showMileage} onCheckedChange={(c) => setShowMileage(!!c)} className="border-gray-300" /> 마일리지</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showModelNo} onCheckedChange={(c) => setShowModelNo(!!c)} className="border-gray-300" /> 모델번호</label>
                           <label className="flex items-center gap-1"><Checkbox checked={showProductCode} onCheckedChange={(c) => setShowProductCode(!!c)} className="border-gray-300" /> 상품코드</label>
                        </div>
                    </div>

                    <div className="flex border-b border-gray-200 min-h-[50px]">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">할인적용가 설정</div>
                        <div className="flex-1 p-3 border-r border-gray-200">
                             <div className="flex gap-4 mb-2">
                                <label className="flex items-center gap-1 text-xs text-gray-700"><Checkbox checked={discountProduct} onCheckedChange={(c) => setDiscountProduct(!!c)} className={discountProduct ? "bg-[#FF424D] border-[#FF424D]" : "border-gray-300"} /> 상품할인가</label>
                                <label className="flex items-center gap-1 text-xs text-gray-700"><Checkbox checked={discountCoupon} onCheckedChange={(c) => setDiscountCoupon(!!c)} className="border-gray-300" /> 상품쿠폰할인가</label>
                             </div>
                             <p className="flex items-center gap-1 text-xs text-gray-400">
                                <span className="bg-black text-white text-[10px] px-1 font-bold rounded-sm">!</span> 할인적용가 노출 시 적용할 할인금액을 설정합니다.
                             </p>
                        </div>
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">취소선 추가 설정</div>
                         <div className="flex-1 p-3">
                             <div className="flex gap-4 mb-2">
                                <label className="flex items-center gap-1 text-xs text-gray-700"><Checkbox checked={strikePrice} onCheckedChange={(c) => setStrikePrice(!!c)} className={strikePrice ? "bg-[#FF424D] border-[#FF424D]" : "border-gray-300"} /> 정가</label>
                                <label className="flex items-center gap-1 text-xs text-gray-700"><Checkbox checked={strikeSalePrice} onCheckedChange={(c) => setStrikeSalePrice(!!c)} className="border-gray-300" /> 판매가</label>
                             </div>
                             <p className="flex items-start gap-1 text-xs text-gray-400">
                                <span className="bg-black text-white text-[10px] px-1 font-bold mt-0.5 rounded-sm">!</span> 
                                <span>체크시 쇼핑몰에 취소선 효과가 적용되어 출력됩니다. (예시. <span className="line-through">정가 12,000원</span>)<br/>단, 판매가의 경우 할인가가 없는 상품에는 취소선이 적용되지 않습니다.</span>
                             </p>
                         </div>
                    </div>

                    <div className="flex border-b border-gray-200 min-h-[50px]">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">노출항목 추가 설정</div>
                         <div className="flex-1 p-3">
                             <div className="flex gap-4 mb-1">
                                <label className="flex items-center gap-1 text-xs text-gray-700"><Checkbox checked={showDiscountRate} onCheckedChange={(c) => setShowDiscountRate(!!c)} className="border-gray-300" /> 할인율</label>
                             </div>
                             <p className="flex items-center gap-1 text-xs text-gray-400">
                                <span className="bg-black text-white text-[10px] px-1 font-bold rounded-sm">!</span> (할인율) 체크 시 판매가 대비 할인율이 할인금액에 노출됩니다. (쿠폰가와 할인적용가에 적용됩니다.)
                             </p>
                         </div>
                    </div>

                    <div className="flex border-b border-gray-200 min-h-[100px] items-stretch">
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">디스플레이 유형</div>
                         <div className="flex-1 p-4 bg-white">
                             <RadioGroup value={displayType} onValueChange={setDisplayType} className="flex gap-4 flex-wrap">
                                {/* Gallery Type */}
                                <div className="flex flex-col gap-2 cursor-pointer" onClick={() => setDisplayType('gallery')}>
                                    <div className={`border-2 p-1 w-24 h-16 grid grid-cols-4 gap-1 ${displayType === 'gallery' ? 'border-[#FF424D]' : 'border-gray-300'}`}>
                                        {[...Array(8)].map((_,i) => <div key={i} className="bg-gray-200 h-full"></div>)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="gallery" id="dt-gallery" className={displayType === 'gallery' ? "text-red-500 border-red-500" : "border-gray-400"} />
                                        <Label htmlFor="dt-gallery" className="text-xs font-normal">갤러리형</Label>
                                    </div>
                                </div>

                                {/* List Type */}
                                <div className="flex flex-col gap-2 cursor-pointer" onClick={() => setDisplayType('list')}>
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
                                        <RadioGroupItem value="list" id="dt-list" className="border-gray-400" />
                                        <Label htmlFor="dt-list" className="text-xs font-normal">리스트형</Label>
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
                <div className="text-xs text-gray-600 space-y-6">
                    <div>
                        <p className="font-bold text-gray-800 mb-1">리스트 영역 노출항목 이외에 추가할 수 있는 항목은 없나요?</p>
                        <p>· 디자인페이지에 아래의 치환코드를 삽입하여 "회원등급에 따른 회원가, 상품에 등록된 후기 개수, 상품클릭수"를 노출할 수 있습니다.</p>
                    </div>
                    
                    <div>
                        <p className="font-bold text-gray-800 mb-1">· 회원등급가 노출 치환코드</p>
                        <p className="mb-2">* 회원등급번호를 입력한 경우에는 로그인 여부와 상관없이 해당 등급의 회원가로만 노출되고</p>
                        
                        <p className="mb-4">회원등급번호를 입력하지 않은 경우 로그인한 회원등급의 회원가로 노출됩니다.</p>
                        
                        <p className="mb-1">: 상품 리스트</p>
                        <p className="bg-gray-50 p-2 mb-2 text-gray-500 border border-gray-100 rounded-sm">{`-{=gd_currency_symbol()}{=gd_money_format(dataGoodsMemberGroupPrice(...value_, 회원등급번호 )) }{=gd_currency_string()}`}</p>
                        
                        <p className="mb-1">: 상품 상세페이지</p>
                        <p className="bg-gray-50 p-2 mb-1 text-gray-500 border border-gray-100 rounded-sm">{`-{=gd_money_format(dataGoodsMemberGroupPrice(goodsView, gMember.groupSno )) }`}</p>
                        <p className="text-gray-400 mb-1 pl-2">└ 로그인한 회원의 회원등급가로 노출됩니다.</p>
                        <p className="bg-gray-50 p-2 text-gray-500 border border-gray-100 rounded-sm">{`-{=gd_money_format(dataGoodsMemberGroupPrice(goodsView, 회원등급번호 )) }`}</p>
                    </div>

                    <div>
                        <p className="font-bold text-gray-800 mb-1">· 상품에 등록된 후기 개수 노출 치환코드</p>
                        <p className="mb-1">: 상품 리스트, 상세페이지 공용</p>
                        <p className="bg-gray-50 p-2 text-gray-500 border border-gray-100 rounded-sm">{`-{=gd_money_format(dataGoodsReviewCnt(상품코드 )) }`}</p>
                    </div>

                    <div>
                        <p className="font-bold text-gray-800 mb-1">· 상품클릭수 노출 치환코드</p>
                        <p className="mb-1">: 상품 상세페이지에만 적용</p>
                        <p className="bg-gray-50 p-2 text-gray-500 border border-gray-100 rounded-sm">{`-{=goodsView['hitCnt']}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
