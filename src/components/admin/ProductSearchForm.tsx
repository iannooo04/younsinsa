"use client";

import { useState } from "react";
import { HelpCircle, ChevronRight } from "lucide-react";
import SupplierPopup from "@/components/admin/SupplierPopup";
import SearchSettingSavePopup from "@/components/admin/SearchSettingSavePopup";

import BrandPopup from "@/components/admin/BrandPopup";

export default function ProductSearchForm() {
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [supplierMode, setSupplierMode] = useState("all");
    
    // Supplier Popup State
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<{id: string, name: string} | null>(null);

    // Brand Popup State
    const [isBrandPopupOpen, setIsBrandPopupOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<{id: string, name: string} | null>(null);

    // Save Setting Popup State
    const [isSaveSettingPopupOpen, setIsSaveSettingPopupOpen] = useState(false);

    const handleSaveSettingConfirm = () => {
        // Implement confirm logic
        alert("검색 설정이 저장되었습니다.");
    };

    return (
        <div className="bg-white border rounded-sm mb-8">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
                <div className="flex items-center gap-2">
                    <h2 className="font-bold text-base text-gray-800">상품 검색</h2>
                    <HelpCircle size={16} className="text-gray-400 cursor-help" />
                </div>
                <button 
                    className="text-xs bg-gray-600 text-white px-2 py-1 rounded-sm hover:bg-gray-700"
                    onClick={() => setIsSaveSettingPopupOpen(true)}
                >
                    검색설정저장
                </button>
            </div>

            {/* Form Content */}
            <div className="px-6 py-4 text-sm text-gray-700">
                
                {/* Row 1: Supplier */}
                <div className="grid grid-cols-[120px_1fr] items-center gap-4 py-3 border-b border-gray-100">
                    <div className="font-bold">공급사 구분</div>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="supplier" 
                                className="radio radio-xs checked:bg-primary" 
                                checked={supplierMode === "all"} 
                                onChange={() => setSupplierMode("all")}
                            />
                            <span>전체</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="supplier" 
                                className="radio radio-xs checked:bg-primary" 
                                checked={supplierMode === "headquarters"} 
                                onChange={() => setSupplierMode("headquarters")}
                            />
                            <span>본사</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                name="supplier" 
                                className="radio radio-xs checked:bg-primary" 
                                checked={supplierMode === "supplier"} 
                                onChange={() => {
                                    setSupplierMode("supplier");
                                    setIsPopupOpen(true);
                                }}
                            />
                            <span>공급사</span>
                        </label>
                        <button 
                            className="btn btn-xs btn-outline rounded-sm font-normal text-gray-600"
                            onClick={() => setIsPopupOpen(true)}
                        >
                            공급사 선택
                        </button>
                        {selectedSupplier && (
                            <span className="text-blue-600 font-bold">[{selectedSupplier.name}]</span>
                        )}
                    </div>
                </div>

                {/* Row 2: Keyword */}
                <div className="grid grid-cols-[120px_1fr] items-center gap-4 py-3 border-b border-gray-100">
                    <div className="font-bold">검색어</div>
                    <div className="flex gap-2 w-full max-w-3xl">
                        <select className="select select-bordered select-sm w-32 rounded-sm bg-gray-50">
                            <option>상품명</option>
                            <option>상품코드</option>
                            <option>자체상품코드</option>
                            <option>검색 키워드</option>
                            <option disabled>==========</option>
                            <option>제조사</option>
                            <option>원산지</option>
                            <option>모델번호</option>
                            <option>HS코드</option>
                            <option>추가항목</option>
                            <option disabled>==========</option>
                            <option>관리자 메모</option>
                            <option>공급사명</option>
                        </select>
                        <input type="text" className="input input-bordered input-sm flex-1 rounded-sm" />
                    </div>
                </div>

                {/* Row 3: Date */}
                <div className="grid grid-cols-[120px_1fr] items-center gap-4 py-3 border-b border-gray-100">
                    <div className="font-bold">기간검색</div>
                    <div className="flex flex-wrap items-center gap-2">
                        <select className="select select-bordered select-sm w-32 rounded-sm bg-gray-50">
                            <option>등록일</option>
                            <option>수정일</option>
                        </select>
                        <div className="flex items-center gap-1">
                            <input type="date" className="input input-bordered input-sm rounded-sm w-36" />
                            <span className="text-gray-400">~</span>
                            <input type="date" className="input input-bordered input-sm rounded-sm w-36" />
                        </div>
                        <div className="flex gap-0.5 ml-2">
                            <button className="btn btn-xs bg-gray-100 hover:bg-gray-200 border-gray-300 rounded-sm font-normal">오늘</button>
                            <button className="btn btn-xs bg-gray-100 hover:bg-gray-200 border-gray-300 rounded-sm font-normal">7일</button>
                            <button className="btn btn-xs bg-gray-100 hover:bg-gray-200 border-gray-300 rounded-sm font-normal">15일</button>
                            <button className="btn btn-xs bg-gray-100 hover:bg-gray-200 border-gray-300 rounded-sm font-normal">1개월</button>
                            <button className="btn btn-xs bg-gray-100 hover:bg-gray-200 border-gray-300 rounded-sm font-normal">3개월</button>
                            <button className="btn btn-xs bg-gray-600 text-white hover:bg-gray-700 border-gray-600 rounded-sm font-normal">전체</button>
                        </div>
                    </div>
                </div>

                {/* Advanced Fields */}
                {isAdvancedOpen && (
                    <>
                        {/* Category */}
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4 py-3 border-b border-gray-100">
                            <div className="font-bold">카테고리</div>
                            <div className="flex items-center gap-2">
                                <select className="select select-bordered select-sm w-32 rounded-sm bg-gray-50"><option>=카테고리선택=</option></select>
                                <select className="select select-bordered select-sm w-32 rounded-sm bg-gray-50"><option>=카테고리선택=</option></select>
                                <select className="select select-bordered select-sm w-32 rounded-sm bg-gray-50"><option>=카테고리선택=</option></select>
                                <select className="select select-bordered select-sm w-32 rounded-sm bg-gray-50"><option>=카테고리선택=</option></select>
                                <label className="flex items-center gap-2 cursor-pointer ml-2">
                                    <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" />
                                    <span>카테고리 미지정 상품</span>
                                </label>
                            </div>
                        </div>

                         {/* Main Category */}
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4 py-3 border-b border-gray-100">
                            <div className="font-bold">메인분류</div>
                            <div className="flex items-center gap-2">
                                <select className="select select-bordered select-sm w-32 rounded-sm bg-gray-50">
                                    <option>=전체=</option>
                                    <option>PC쇼핑몰</option>
                                    <option>모바일쇼핑몰</option>
                                </select>
                                <select className="select select-bordered select-sm w-48 rounded-sm bg-gray-50"><option>=메인페이지 분류 선택=</option></select>
                            </div>
                        </div>

                        {/* Brand & Price (Grid 2 cols) */}
                        <div className="grid grid-cols-2 gap-x-12 py-3 border-b border-gray-100">
                            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">브랜드</div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        className="btn btn-xs btn-outline rounded-sm font-normal text-gray-600"
                                        onClick={() => setIsBrandPopupOpen(true)}
                                    >
                                        브랜드선택
                                    </button>
                                    {selectedBrand && (
                                        <span className="text-blue-600 font-bold ml-1">[{selectedBrand.name}]</span>
                                    )}
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" />
                                        <span>브랜드 미지정 상품</span>
                                    </label>
                                </div>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">판매가</div>
                                <div className="flex items-center gap-2">
                                    <input type="text" className="input input-bordered input-sm w-24 rounded-sm" />
                                    <span>이상 ~</span>
                                    <input type="text" className="input input-bordered input-sm w-24 rounded-sm" />
                                    <span>이하</span>
                                </div>
                            </div>
                        </div>

                        {/* Mileage */}
                        <div className="grid grid-cols-2 gap-x-12 py-3 border-b border-gray-100">
                             <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">마일리지</div>
                                <div className="flex items-center gap-2">
                                    <input type="text" className="input input-bordered input-sm w-24 rounded-sm" />
                                    <span>이상 ~</span>
                                    <input type="text" className="input input-bordered input-sm w-24 rounded-sm" />
                                    <span>이하</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">마일리지 지급방법</div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2"><input type="radio" name="mileage" className="radio radio-xs checked:bg-primary" defaultChecked /><span>전체</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="mileage" className="radio radio-xs checked:bg-primary" /><span>통합설정</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="mileage" className="radio radio-xs checked:bg-primary" /><span>개별설정</span></label>
                                </div>
                            </div>
                        </div>
                        
                         {/* Stock & Option */}
                        <div className="grid grid-cols-2 gap-x-12 py-3 border-b border-gray-100">
                             <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">상품 재고</div>
                                <div className="flex items-center gap-2">
                                    <input type="text" className="input input-bordered input-sm w-24 rounded-sm" />
                                    <span>개 이상 ~</span>
                                    <input type="text" className="input input-bordered input-sm w-24 rounded-sm" />
                                    <span>개 이하</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">옵션 사용</div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2"><input type="radio" name="option" className="radio radio-xs checked:bg-primary" defaultChecked /><span>전체</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="option" className="radio radio-xs checked:bg-primary" /><span>사용함</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="option" className="radio radio-xs checked:bg-primary" /><span>사용안함</span></label>
                                </div>
                            </div>
                        </div>

                         {/* Text Option & Add-on */}
                        <div className="grid grid-cols-2 gap-x-12 py-3 border-b border-gray-100">
                            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">텍스트옵션 사용</div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2"><input type="radio" name="textoption" className="radio radio-xs checked:bg-primary" defaultChecked /><span>전체</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="textoption" className="radio radio-xs checked:bg-primary" /><span>사용함</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="textoption" className="radio radio-xs checked:bg-primary" /><span>사용안함</span></label>
                                </div>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">추가상품 사용</div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2"><input type="radio" name="addproduct" className="radio radio-xs checked:bg-primary" defaultChecked /><span>전체</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="addproduct" className="radio radio-xs checked:bg-primary" /><span>사용함</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="addproduct" className="radio radio-xs checked:bg-primary" /><span>사용안함</span></label>
                                </div>
                            </div>
                        </div>
                        
                         {/* PC Exposure & Sale */}
                        <div className="grid grid-cols-2 gap-x-12 py-3 border-b border-gray-100">
                            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">PC쇼핑몰<br/>상품노출 상태</div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2"><input type="radio" name="pcexposure" className="radio radio-xs checked:bg-primary" defaultChecked /><span>전체</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="pcexposure" className="radio radio-xs checked:bg-primary" /><span>노출함</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="pcexposure" className="radio radio-xs checked:bg-primary" /><span>노출안함</span></label>
                                </div>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">PC쇼핑몰<br/>상품판매 상태</div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2"><input type="radio" name="pcsale" className="radio radio-xs checked:bg-primary" defaultChecked /><span>전체</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="pcsale" className="radio radio-xs checked:bg-primary" /><span>판매함</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="pcsale" className="radio radio-xs checked:bg-primary" /><span>판매안함</span></label>
                                </div>
                            </div>
                        </div>

                         {/* Mobile Exposure & Sale */}
                        <div className="grid grid-cols-2 gap-x-12 py-3 border-b border-gray-100">
                            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">모바일쇼핑몰<br/>상품노출 상태</div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2"><input type="radio" name="mobileexposure" className="radio radio-xs checked:bg-primary" defaultChecked /><span>전체</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="mobileexposure" className="radio radio-xs checked:bg-primary" /><span>노출함</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="mobileexposure" className="radio radio-xs checked:bg-primary" /><span>노출안함</span></label>
                                </div>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">모바일쇼핑몰<br/>상품판매 상태</div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2"><input type="radio" name="mobilesale" className="radio radio-xs checked:bg-primary" defaultChecked /><span>전체</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="mobilesale" className="radio radio-xs checked:bg-primary" /><span>판매함</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="mobilesale" className="radio radio-xs checked:bg-primary" /><span>판매안함</span></label>
                                </div>
                            </div>
                        </div>

                        {/* Sale Stock & SoldOut */}
                        <div className="grid grid-cols-2 gap-x-12 py-3 border-b border-gray-100">
                            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">판매 재고</div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2"><input type="radio" name="stock" className="radio radio-xs checked:bg-primary" defaultChecked /><span>전체</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="stock" className="radio radio-xs checked:bg-primary" /><span>무한정 판매</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="stock" className="radio radio-xs checked:bg-primary" /><span>재고량에 따름</span></label>
                                </div>
                            </div>
                           <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                                <div className="font-bold">품절 상태</div>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2"><input type="radio" name="soldout" className="radio radio-xs checked:bg-primary" defaultChecked /><span>전체</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="soldout" className="radio radio-xs checked:bg-primary" /><span>품절</span></label>
                                    <label className="flex items-center gap-2"><input type="radio" name="soldout" className="radio radio-xs checked:bg-primary" /><span>정상</span></label>
                                </div>
                            </div>
                        </div>



                        {/* Shipping Fee */}
                        <div className="grid grid-cols-[120px_1fr] items-center gap-4 bg-gray-50/50 p-2 -mx-2 mb-2">
                             <div className="font-bold">배송비 조건</div>
                             <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                     <label className="flex items-center gap-2"><input type="radio" name="shipping" className="radio radio-xs checked:bg-primary" defaultChecked /><span>전체</span></label>
                                     <label className="flex items-center gap-2"><input type="radio" name="shipping" className="radio radio-xs checked:bg-primary" /><span>배송비조건별</span></label>
                                     <label className="flex items-center gap-2"><input type="radio" name="shipping" className="radio radio-xs checked:bg-primary" /><span>상품별</span></label>
                                </div>
                                <div className="flex items-center gap-4">
                                     <label className="flex items-center gap-2"><input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" /><span>전체</span></label>
                                     <label className="flex items-center gap-2"><input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" /><span>배송비무료</span></label>
                                     <label className="flex items-center gap-2"><input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" /><span>금액별배송</span></label>
                                     <label className="flex items-center gap-2"><input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" /><span>수량별배송</span></label>
                                     <label className="flex items-center gap-2"><input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" /><span>무게별배송</span></label>
                                     <label className="flex items-center gap-2"><input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" /><span>고정배송비</span></label>
                                </div>
                             </div>
                        </div>
                    </>
                )}


                {/* Toggle Advanced */}
                <div className="pt-2 mt-2">
                    <button 
                        onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                    >
                        {isAdvancedOpen ? "상세검색 닫힘" : "상세검색 펼침"} 
                        {isAdvancedOpen ? <ChevronRight size={12} className="-rotate-90"/> : <ChevronRight size={12} />}
                    </button>
                </div>
            </div>

            {/* Search Button */}
            <div className="bg-gray-50 border-t p-4 flex justify-center">
                <button className="btn btn-neutral px-8 rounded-sm font-bold text-base min-h-[44px]">
                    검색
                </button>
            </div>

            {/* Popups */}
            <SupplierPopup 
                isOpen={isPopupOpen} 
                onClose={() => setIsPopupOpen(false)} 
                onConfirm={(val) => {
                    if (Array.isArray(val)) {
                        setSelectedSupplier(val[0] || null);
                    } else {
                        setSelectedSupplier(val);
                    }
                    setSupplierMode("supplier");
                    setIsPopupOpen(false);
                }} 
            />
            
            <BrandPopup 
                isOpen={isBrandPopupOpen}
                onClose={() => setIsBrandPopupOpen(false)}
                onConfirm={(val) => setSelectedBrand(val)}
            />

            <SearchSettingSavePopup
                isOpen={isSaveSettingPopupOpen}
                onClose={() => setIsSaveSettingPopupOpen(false)}
                onConfirm={handleSaveSettingConfirm}
            />
        </div>
    );
}
