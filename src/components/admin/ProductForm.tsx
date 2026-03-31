"use client";

import { useState, useActionState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, ChevronUp, ChevronDown } from "lucide-react";
import { createProductAction, updateProductAction, uploadImageAction } from "@/actions/product-actions";

import { Brand, Category } from "@/generated/prisma";
import SupplierPopup from "./SupplierPopup";
import BrandPopup from "./BrandPopup";
import EssentialInfoPopup from "./EssentialInfoPopup";
import KCExamplePopup from "./KCExamplePopup";
import ShippingFeePopup from "./ShippingFeePopup";
import PhotoAttachmentPopup from "./PhotoAttachmentPopup";
import TipTapEditor from "@/components/ui/TipTapEditor";
import GuideEditor from "./GuideEditor";
import GuidePopup from "./GuidePopup";

interface Props {
    brands: Brand[];
    categories: Category[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialProduct?: any;
}

const initialState = {
    message: "",
    success: false,
};

export default function ProductForm({ categories, initialProduct }: Props) {
    const router = useRouter();
    const [state, formAction] = useActionState(initialProduct ? updateProductAction : createProductAction, initialState);
    
    const formRef = useRef<HTMLFormElement>(null);
    
    // UI States for collapsible sections
    const [sections, setSections] = useState({
        category: true,
        basic: true,
        payment: true,
        additional: true,
        essential: true,
        sales: true,
        mileage: true,
        price: true,

        product_image: true,
        detail: true,
        shipping: true,
        guide: true,
        seo: true,
    });

    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialProduct?.categoryId || "");
    const [selectedCategoriesList, setSelectedCategoriesList] = useState<Category[]>(
        initialProduct?.category ? [initialProduct.category] : []
    );
    const [selectedDepths, setSelectedDepths] = useState<string[]>([]);


    useEffect(() => {
        if (initialProduct?.categoryId && categories && selectedDepths.length === 0) {
            const path: string[] = [];
            let current = categories.find(c => c.id === initialProduct.categoryId);
            while (current) {
                path.unshift(current.id);
                current = categories.find(c => c.id === current?.parentId);
            }
            if (path.length > 0) {
                setSelectedDepths(path);
            }
        }
    }, [initialProduct?.categoryId, categories, selectedDepths.length]);


    const handleSelectDepth = (depthIndex: number, categoryId: string) => {
        const newDepths = [...selectedDepths.slice(0, depthIndex), categoryId];
        setSelectedDepths(newDepths);
        setSelectedCategoryId(categoryId);
    };
    
    // Editor State
    const [descContent, setDescContent] = useState(initialProduct?.descriptionPC || "");
    const [activeEditorMode, setActiveEditorMode] = useState<'editor' | 'html' | 'text'>('editor');
    const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false);
    const [_isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    
    // Guide Content States
    const [shippingGuideContent, setShippingGuideContent] = useState(`- 배송비 : 기본배송료는 2,500원 입니다. (도서,산간,오지 일부지역은 배송비가 추가될 수 있습니다) 50,000원 이상 구매시 무료배송입니다.
- 본 상품의 평균 배송일은 0일입니다.(입금 확인 후) 설치 상품의 경우 다소 늦어질 수 있습니다.[배송예정일은 주문시점(주문순서)에 따른 유동성이 발생하므로 평균 배송일과는 차이가 발생할 수 있습니다.]
- 본 상품의 배송 가능일은 0일 입니다. 배송 가능일이란 본 상품을 주문 하신 고객님들께 상품 배송이 가능한 기간을 의미합니다. (단, 연휴 및 공휴일은 기간 계산시 제외하며 현금 주문일 경우 입금일 기준 입니다.)`);
    const [asGuideContent, setAsGuideContent] = useState(`- 소비자분쟁해결 기준(공정거래위원회 고시)에 따라 피해를 보상받을 수 있습니다.
- A/S는 판매자에게 문의하시기 바랍니다.`);
    const [refundGuideContent, setRefundGuideContent] = useState(`- 상품 청약철회 가능기간은 상품 수령일로 부터 7일 이내 입니다.`);
    const [exchangeGuideContent, setExchangeGuideContent] = useState(`- 상품 택(tag)제거 또는 개봉으로 상품 가치 훼손 시에는 상품수령후 7일 이내라도 교환 및 반품이 불가능합니다.
- 저단가 상품, 일부 특가 상품은 고객 변심에 의한 교환, 반품은 고객께서 배송비를 부담하셔야 합니다(제품의 하자,배송오류는 제외)
- 일부 상품은 신모델 출시, 부품가격 변동 등 제조사 사정으로 가격이 변동될 수 있습니다.
- 신발의 경우, 실외에서 착화하였거나 사용흔적이 있는 경우에는 교환/반품 기간내라도 교환 및 반품이 불가능 합니다.
- 수제화 중 개별 주문제작상품(굽높이,발볼,사이즈 변경)의 경우에는 제작완료, 인수 후에는 교환/반품기간내라도 교환 및 반품이 불가능 합니다.
- 수입,명품 제품의 경우, 제품 및 본 상품의 박스 훼손, 분실 등으로 인한 상품 가치 훼손 시 교환 및 반품이 불가능 하오니, 양해 바랍니다.
- 일부 특가 상품의 경우, 인수 후에는 제품 하자나 오배송의 경우를 제외한 고객님의 단순변심에 의한 교환, 반품이 불가능할 수 있사오니, 각 상품의 상품상세정보를 꼭 참조하십시오.`);

    const [photoTarget, setPhotoTarget] = useState<'desc' | 'shipping' | 'as' | 'refund' | 'exchange'>('desc');

    const handlePhotoConfirm = async (files: File[]) => {
        setIsPhotoPopupOpen(false);
        if (files.length === 0) return;
        setIsUploadingPhoto(true);

        try {
            const uploadedUrls: string[] = [];
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);
                const res = await uploadImageAction(formData);
                if (res.success && res.url) {
                    uploadedUrls.push(res.url);
                } else {
                    alert(`사진 업로드 실패: ${file.name}`);
                }
            }

            if (uploadedUrls.length === 0) return;

            const imagesHtml = uploadedUrls.map(url => {
                return `<img src="${url}" alt="image" style="max-width: 100%;" />`;
            }).join('<br/>');

            if (photoTarget === 'desc') {
                 setDescContent((prev: string) => prev + '<br/>' + imagesHtml);
            } else if (photoTarget === 'shipping') {
                setShippingGuideContent((prev: string) => prev + '\n' + imagesHtml);
            } else if (photoTarget === 'as') {
                setAsGuideContent((prev: string) => prev + '\n' + imagesHtml);
            } else if (photoTarget === 'refund') {
                setRefundGuideContent((prev: string) => prev + '\n' + imagesHtml);
            } else if (photoTarget === 'exchange') {
                setExchangeGuideContent((prev: string) => prev + '\n' + imagesHtml);
            }
        } catch (error) {
            console.error("Error uploading photos:", error);
            alert("사진 업로드 중 오류가 발생했습니다.");
        } finally {
            setIsUploadingPhoto(false);
        }
    };
    
    const openPhotoPopup = (target: 'desc' | 'shipping' | 'as' | 'refund' | 'exchange') => {
        setPhotoTarget(target);
        setIsPhotoPopupOpen(true);
    };
    
    // Supplier Popup State
    const [isSupplierPopupOpen, setIsSupplierPopupOpen] = useState(false);
     
    const [_selectedSupplierName, setSelectedSupplierName] = useState<string>("");
     
    const [_supplierType, _setSupplierType] = useState("본사");

    // Brand Popup State
    const [isBrandPopupOpen, setIsBrandPopupOpen] = useState(false);
    const [selectedBrandName, setSelectedBrandName] = useState<string>(initialProduct?.brand?.name || "");
    const [selectedBrandId, setSelectedBrandId] = useState<string>(initialProduct?.brandId || "");

    // Essential Info Popup State
    const [isEssentialInfoPopupOpen, setIsEssentialInfoPopupOpen] = useState(false);
    const [isKCExamplePopupOpen, setIsKCExamplePopupOpen] = useState(false);




    // Origin Image States
    interface OriginImage {
        id: number;
        name: string;
    }
    const [originImages, setOriginImages] = useState<OriginImage[]>([{ id: 0, name: "" }]);

    const handleAddOriginImageRow = () => {
        setOriginImages(prev => [...prev, { id: Date.now(), name: "" }]);
    };

    const handleRemoveOriginImageRow = (id: number) => {
        setOriginImages(prev => prev.filter(item => item.id !== id));
    };

    const handleOriginImageFileChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setOriginImages(prev => prev.map(item => item.id === id ? { ...item, name: file.name } : item));
        }
    };

    // Shipping Fee Popup State
    const [isShippingFeePopupOpen, setIsShippingFeePopupOpen] = useState(false);
    const [selectedShippingFee, setSelectedShippingFee] = useState<string>("기본 - 금액별배송비 (택배)");

    // Guide Popup States
    const [guidePopupState, setGuidePopupState] = useState<{
        isOpen: boolean;
        type: 'shipping' | 'as' | 'refund' | 'exchange';
        title: string;
    }>({
        isOpen: false,
        type: 'shipping',
        title: '배송안내 선택'
    });

    const [selectedGuides, setSelectedGuides] = useState({
        shipping: "배송안내 - 기본",
        as: "AS안내 - 기본",
        refund: "환불안내 - 기본",
        exchange: "교환안내 - 기본"
    });

    const openGuidePopup = (type: 'shipping' | 'as' | 'refund' | 'exchange', title: string) => {
        setGuidePopupState({ isOpen: true, type, title });
    };

    // Essential Info Items
    interface EssentialItem {
        id: number;
        type: 2 | 4; // 2 slots or 4 slots
        label1: string;
        value1: string;
        label2: string;
        value2: string;
    }
     
    const [_essentialItems, setEssentialItems] = useState<EssentialItem[]>([]);

     
    const _handleAddEssentialItem = (type: 2 | 4) => {
        setEssentialItems(prev => [...prev, { 
            id: Date.now(), 
            type, 
            label1: '', 
            value1: '', 
            label2: '', 
            value2: '' 
        }]);
    };

     
    const _handleRemoveEssentialItem = (id: number) => {
        setEssentialItems(prev => prev.filter(item => item.id !== id));
    };

     
    const _handleEssentialItemChange = (id: number, field: keyof EssentialItem, value: string) => {
        setEssentialItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };
    
     
    const _handleCopyEssentialItem = (label: string, value: string) => {
        setEssentialItems(prev => [...prev, {
            id: Date.now(),
            type: 2, // Assuming copy creates a 2-slot looking item (filling first pair)
            label1: label,
            value1: value,
            label2: '',
            value2: ''
        }]);
    };


    // Color Picker State
     
    const [_selectedColor, setSelectedColor] = useState<string | null>(null);

     
    const _handleColorClick = (color: string) => {
        setSelectedColor(color);
    };
    const handleAddCategory = () => {
        if (!selectedCategoryId) return alert("카테고리를 선택해주세요.");
        const categoryToAdd = categories.find(c => c.id === selectedCategoryId);
        if (categoryToAdd && !selectedCategoriesList.find(c => c.id === categoryToAdd.id)) {
            setSelectedCategoriesList([...selectedCategoriesList, categoryToAdd]);
        }
    };

    const handleRemoveCategory = (id: string) => {
        setSelectedCategoriesList(selectedCategoriesList.filter(c => c.id !== id));
    };

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="pb-20">
            {/* Top Header Actions */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">{initialProduct ? "상품 수정" : "상품 등록"}</h2>
                <div className="flex gap-2">

                    <button 
                        type="button"
                        onClick={() => router.push('/admin/products')}
                        className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 flex items-center gap-1"
                    >
                        <span className="text-gray-500">≡</span> 목록
                    </button>
                    <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50">
                        기존상품 복사
                    </button>
                    <button 
                        onClick={() => formRef.current?.requestSubmit()}
                        className="px-6 py-2 bg-[#ff4d4f] text-white text-sm font-bold hover:bg-[#ff3032]"
                    >
                        {initialProduct ? "수정" : "저장"}
                    </button>
                </div>
            </div>

            <form ref={formRef} action={formAction} className="space-y-8 px-4">
                {initialProduct && <input type="hidden" name="id" value={initialProduct.id} />}
                <input type="hidden" name="categoryId" value={selectedCategoryId} />
                <input type="hidden" name="brandId" value={selectedBrandId} />
                
                {state.message && (
                    <div className={`p-4 rounded-md ${state.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {state.message}
                    </div>
                )}

                {/* 1. 카테고리 연결 */}
                <Section title="카테고리 연결" isOpen={sections.category} onToggle={() => toggleSection('category')} 
                    helpText="카테고리가 먼저 등록되어 있어야 카테고리 연결이 가능합니다."
                    extraLink={{ text: "카테고리 등록하기 >", href: "/admin/categories" }}
                >
                    <div className="p-4 bg-white">
                        <div className="flex gap-2 h-48 mb-4">
                             {/* Category Depth 1 */}
                             <div className="flex-1 border border-gray-300 overflow-y-auto bg-white">
                                <div className="p-2 border-b bg-gray-50 text-xs font-bold text-gray-700 sticky top-0">=카테고리선택=</div>
                                <ul className="text-sm">
                                    {categories.filter(c => !c.parentId).map(cat => (
                                        <li 
                                            key={cat.id} 
                                            onClick={() => handleSelectDepth(0, cat.id)}
                                            className={`cursor-pointer px-3 py-1.5 hover:bg-blue-50 ${selectedDepths[0] === cat.id ? 'bg-[#516d99] text-white font-bold' : 'text-gray-600'}`}
                                        >
                                            {cat.name} {categories.some(child => child.parentId === cat.id) && <span className="float-right text-[10px] text-gray-400 mt-1">&gt;</span>}
                                        </li>
                                    ))}
                                </ul>
                             </div>
                             {/* Category Depth 2 */}
                             <div className="flex-1 border border-gray-300 overflow-y-auto bg-white">
                                <div className="p-2 border-b bg-gray-50 text-xs font-bold text-gray-700 sticky top-0">=카테고리선택=</div>
                                <ul className="text-sm">
                                    {selectedDepths[0] ? categories.filter(c => c.parentId === selectedDepths[0]).map(cat => (
                                        <li 
                                            key={cat.id} 
                                            onClick={() => handleSelectDepth(1, cat.id)}
                                            className={`cursor-pointer px-3 py-1.5 hover:bg-blue-50 ${selectedDepths[1] === cat.id ? 'bg-[#516d99] text-white font-bold' : 'text-gray-600'}`}
                                        >
                                            {cat.name} {categories.some(child => child.parentId === cat.id) && <span className="float-right text-[10px] text-gray-400 mt-1">&gt;</span>}
                                        </li>
                                    )) : null}
                                </ul>
                             </div>
                             {/* Category Depth 3 */}
                             <div className="flex-1 border border-gray-300 overflow-y-auto bg-white">
                                <div className="p-2 border-b bg-gray-50 text-xs font-bold text-gray-700 sticky top-0">=카테고리선택=</div>
                                <ul className="text-sm">
                                    {selectedDepths[1] ? categories.filter(c => c.parentId === selectedDepths[1]).map(cat => (
                                        <li 
                                            key={cat.id} 
                                            onClick={() => handleSelectDepth(2, cat.id)}
                                            className={`cursor-pointer px-3 py-1.5 hover:bg-blue-50 ${selectedDepths[2] === cat.id ? 'bg-[#516d99] text-white font-bold' : 'text-gray-600'}`}
                                        >
                                            {cat.name} {categories.some(child => child.parentId === cat.id) && <span className="float-right text-[10px] text-gray-400 mt-1">&gt;</span>}
                                        </li>
                                    )) : null}
                                </ul>
                             </div>
                             {/* Category Depth 4 */}
                             <div className="flex-1 border border-gray-300 overflow-y-auto bg-white">
                                <div className="p-2 border-b bg-gray-50 text-xs font-bold text-gray-700 sticky top-0">=카테고리선택=</div>
                                <ul className="text-sm">
                                    {selectedDepths[2] ? categories.filter(c => c.parentId === selectedDepths[2]).map(cat => (
                                        <li 
                                            key={cat.id} 
                                            onClick={() => handleSelectDepth(3, cat.id)}
                                            className={`cursor-pointer px-3 py-1.5 hover:bg-blue-50 ${selectedDepths[3] === cat.id ? 'bg-[#516d99] text-white font-bold' : 'text-gray-600'}`}
                                        >
                                            {cat.name}
                                        </li>
                                    )) : null}
                                </ul>
                             </div>
                             
                             {/* Select Button */}
                             <div className="flex items-center">
                                 <button 
                                    type="button"
                                    onClick={handleAddCategory}
                                    className="w-24 h-12 bg-[#666] text-white font-bold rounded-sm hover:bg-[#555]"
                                 >
                                    선택
                                 </button>
                             </div>
                        </div>
                    </div>
                </Section>

                {/* 2. 선택된 카테고리 */}
                <Section title="선택된 카테고리" isOpen={true} onToggle={() => {}}>
                     <div className="bg-gray-50 p-4 border-b text-sm text-gray-600">
                        <p>카테고리 등록 시 상위카테고리는 자동 등록되며, 등록된 카테고리에 상품이 노출됩니다.</p>
                        <p className="flex items-start gap-1 mt-1 text-gray-500 text-xs">
                            <span className="font-bold bg-gray-400 text-white px-1 rounded-sm text-[10px]">!</span>
                            <span>상품 노출을 원하지 않는 카테고리는 '삭제'버튼을 이용하여 삭제할 수 있습니다. 
                            <br/>등록하신 카테고리들 중 체크된 카테고리가 대표 카테고리로 설정됩니다.</span>
                        </p>
                        <div className="mt-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-400" />
                                <span>상단 고정진열 적용 (체크 시 선택된 모든 카테고리의 쇼핑몰 상품 페이지 최상단에 진열됩니다.)</span>
                            </label>
                        </div>
                    </div>
                    {/* Empty state or list would go here */}
                    {selectedCategoriesList.length > 0 ? (
                        <div className="border border-gray-300 border-b-0 mt-4">
                            <table className="w-full text-center text-sm border-collapse">
                                <thead className="bg-[#bfbfbf] text-white font-normal">
                                    <tr>
                                        <th className="py-2 w-24 border-r border-gray-400/50 font-normal">노출상점</th>
                                        <th className="py-2 w-24 border-r border-gray-400/50 font-normal">대표설정</th>
                                        <th className="py-2 border-r border-gray-400/50 font-normal">연결된 카테고리</th>
                                        <th className="py-2 w-32 border-r border-gray-400/50 font-normal">카테고리 코드</th>
                                        <th className="py-2 w-24 font-normal">연결해제</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {selectedCategoriesList.map((cat, idx) => (
                                        <tr key={cat.id} className="border-b border-gray-300 hover:bg-gray-50">
                                            <td className="py-2 border-r border-gray-300">
                                                <div className="bg-white border border-gray-300 w-4 h-4 mx-auto"></div>
                                            </td>
                                            <td className="py-2 border-r border-gray-300">
                                                <input type="radio" name="representative_category" className="radio radio-xs checked:bg-blue-600" defaultChecked={idx === 0} />
                                            </td>
                                            <td className="py-2 border-r border-gray-300 text-left px-4 font-bold">
                                                {cat.name}
                                            </td>
                                            <td className="py-2 border-r border-gray-300 text-gray-500">
                                                {cat.code}
                                            </td>
                                            <td className="py-2">
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleRemoveCategory(cat.id)}
                                                    className="px-2 py-1 border border-gray-300 text-xs rounded-sm hover:bg-gray-100 bg-white"
                                                >
                                                    삭제
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="h-24 flex items-center justify-center text-gray-400 text-sm bg-white border border-gray-200 mt-4">
                            선택된 카테고리가 없습니다.
                        </div>
                    )}
                </Section>



                {/* 4. 기본 정보 */}
                <Section title="기본 정보" isOpen={sections.basic} onToggle={() => toggleSection('basic')}>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Row label="상품코드">
                            <span className="text-gray-500 text-sm">상품 등록시 자동 생성됩니다.</span>
                        </Row>
                        <Row label="노출 상태" required help>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-gray-700">쇼핑몰 노출</span>
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input type="radio" name="display_status" value="노출함" className="radio radio-xs checked:bg-red-500" defaultChecked={initialProduct ? initialProduct.displayStatusPC === 'DISPLAY' : true} />
                                        <span className="text-sm">노출함</span>
                                    </label>
                                    <label className="flex items-center gap-1 cursor-pointer">
                                        <input type="radio" name="display_status" value="노출안함" className="radio radio-xs" defaultChecked={initialProduct ? initialProduct.displayStatusPC !== 'DISPLAY' : false} />
                                        <span className="text-sm">노출안함</span>
                                    </label>
                                </div>
                            </div>
                        </Row>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                         <Row label="자체 상품코드" help>
                             <div className="flex items-center w-full">
                                <input type="text" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm min-w-0" />
                                <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">0 / 30</span>
                             </div>
                        </Row>
                    </div>

                    <Row label="기준몰 상품명" required help>
                         <div className="flex items-center gap-2 w-full max-w-2xl">
                            <input type="text" name="name" defaultValue={initialProduct?.name} className="input input-sm h-8 flex-1 border-gray-300 rounded-sm" required />
                            <span className="text-xs text-gray-400">0 / 250</span>
                         </div>
                    </Row>
                    
                    <Row label="검색 키워드" help>
                        <div className="w-full space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-400" />
                                <span className="text-sm">체크시 기본 상품명이 검색 키워드에 추가됩니다.</span>
                            </label>
                            <input type="text" className="input input-sm h-8 w-full border-gray-300 rounded-sm" />
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="font-bold bg-gray-400 text-white px-1 rounded-sm text-[10px]">!</span>
                                상품상세 페이지의 메타태그와 상품 검색시 키워드로 사용하실 수 있습니다.
                            </div>
                        </div>
                    </Row>

                </Section>



                <Section title="추가 정보" helpText="help" isOpen={sections.additional} onToggle={() => toggleSection('additional')}>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Row label="브랜드">
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex items-center gap-1 w-full">
                                    <input type="text" className="input input-sm h-8 w-24 border-gray-300 rounded-sm bg-gray-100 flex-shrink-0" value={selectedBrandName} disabled />
                                    <button 
                                        type="button" 
                                        onClick={() => setIsBrandPopupOpen(true)}
                                        className="px-2 py-1 bg-[#999] text-white text-xs rounded-sm hover:bg-[#888] whitespace-nowrap flex-shrink-0"
                                    >
                                        브랜드 선택
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => router.push('/admin/brands')}
                                        className="px-2 py-1 border border-gray-300 bg-white text-xs rounded-sm hover:bg-gray-50 whitespace-nowrap flex-shrink-0"
                                    >
                                        + 브랜드 추가
                                    </button>
                                </div>
                                <div className="text-xs text-red-500 mt-1 flex items-start gap-1">
                                    <span className="font-bold bg-red-500 text-white px-1 rounded-sm text-[10px] flex-shrink-0">!</span>
                                    <div className="leading-tight">
                                        대표 카테고리와 노출상점이 다른 경우<br/>
                                        브랜드 페이지에 상품이 노출되지않습니다.
                                    </div>
                                </div>
                            </div>
                        </Row>
                        <Row label="제조사" help>
                             <div className="flex items-center w-full">
                                <input type="text" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm min-w-0" />
                                <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">0 / 30</span>
                             </div>
                        </Row>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                         <Row label="원산지" help>
                             <div className="flex items-center w-full">
                                <input type="text" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm min-w-0" />
                                <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">0 / 30</span>
                             </div>
                        </Row>

                    </div>


                    

                    









                </Section>



                {/* 8. 판매 정보 */}
                <Section title="판매 정보" isOpen={sections.sales} onToggle={() => toggleSection('sales')}>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                         <Row label="과세/면세">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2"><input type="radio" name="tax" className="radio radio-xs checked:bg-red-500" defaultChecked /> <span>과세</span></label>
                                <select className="select select-bordered select-xs w-24" defaultValue="10">
                                    <option value="">=세율=</option>
                                    <option value="10">10</option>
                                </select>
                                <span>%</span>
                                <label className="flex items-center gap-2"><input type="radio" name="tax" className="radio radio-xs" /> <span>면세</span></label>
                            </div>
                        </Row>
                         <Row label="재고 수량">
                             <div className="flex items-center w-full">
                                <input type="number" name="stockQuantity" defaultValue={initialProduct?.stockQuantity || 0} className="input input-sm h-8 w-32 border-gray-300 rounded-sm text-right" />
                                <span className="text-sm text-gray-600 ml-1">개</span>
                             </div>
                        </Row>
                    </div>




                    <Row label="구매수량 설정" help>
                        <div className="flex items-center gap-4">
                            <RadioGroup name="purchase_limit" options={['제한없음']} defaultValue="제한없음" />
                            <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-sm border border-gray-200">
                                <span className="text-xs text-gray-500">옵션기준 v</span>
                                <span className="text-xs">최소 구매 수량 :</span>
                                <input type="text" className="w-12 h-6 border text-center text-xs" />
                                <span className="text-xs">개 / 최대 구매 수량 :</span>
                                <input type="text" className="w-12 h-6 border text-center text-xs" />
                                <span className="text-xs">개</span>
                            </div>
                        </div>
                    </Row>


                </Section>




                {/* 11. 가격 설정 */}
                <Section title="가격 설정" isOpen={sections.price} onToggle={() => toggleSection('price')}>
                     <div className="border-b border-gray-200">
                        {/* Row 1 */}
                        <div className="flex border-b border-gray-200 last:border-b-0">
                            <div className="w-[120px] bg-[#f9f9f9] p-3 text-sm font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">정가</div>
                            <div className="flex-1 p-2 flex items-center border-r border-gray-200">
                                <input type="text" name="consumerPrice" defaultValue={initialProduct?.consumerPrice || ''} className="input input-sm h-8 w-32 border-gray-300 rounded-sm text-right" placeholder="0" />
                                <span className="ml-1 text-sm text-gray-600">원</span>
                            </div>
                            <div className="w-[120px] bg-[#f9f9f9] p-3 text-sm font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">매입가</div>
                            <div className="flex-1 p-2 flex items-center border-r border-gray-200">
                                <input type="text" name="supplyPrice" defaultValue={initialProduct?.supplyPrice || ''} className="input input-sm h-8 w-32 border-gray-300 rounded-sm text-right" placeholder="0" />
                                <span className="ml-1 text-sm text-gray-600">원</span>
                            </div>
                             <div className="w-[120px] bg-[#f9f9f9] p-3 text-sm font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">
                                가격 대체 문구 <HelpCircle size={14} className="ml-1 text-gray-400" />
                            </div>
                            <div className="flex-[2] p-2 flex items-center">
                                <input type="text" className="input input-sm h-8 w-48 border-gray-300 rounded-sm" />
                                <span className="ml-2 text-xs text-gray-400">0 / 30</span>
                            </div>
                        </div>
                        {/* Row 2 */}
                        <div className="flex">
                            <div className="w-[120px] bg-[#f9f9f9] p-3 text-sm font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">판매가</div>
                            <div className="flex-1 p-2 flex items-center border-r border-gray-200">
                                <input type="text" name="price" defaultValue={initialProduct?.price || ''} className="input input-sm h-8 w-32 border-gray-300 rounded-sm text-right" placeholder="0" />
                                <span className="ml-1 text-sm text-gray-600">원</span>
                            </div>
                             <div className="w-[120px] bg-[#f9f9f9] p-3 text-sm font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">
                                수수료율 <HelpCircle size={14} className="ml-1 text-gray-400" />
                            </div>
                            <div className="p-2 flex items-center border-r border-gray-200 w-32 shrink-0">
                                <input type="text" className="input input-sm h-8 w-20 border-gray-300 rounded-sm text-right bg-gray-100" placeholder="0.00" disabled />
                                <span className="ml-1 text-sm text-gray-600">%</span>
                            </div>
                             <div className="w-[100px] bg-[#f9f9f9] p-3 text-sm font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">
                                수수료액
                            </div>
                             <div className="flex-1 p-2 flex items-center">
                                <input type="text" className="input input-sm h-8 w-24 border-gray-300 rounded-sm text-right bg-gray-100" placeholder="0" disabled />
                                <span className="ml-1 text-sm text-gray-600">원</span>
                            </div>
                        </div>
                    </div>
                </Section>



                {/* 14. 상품 이미지 (New Position) */}
                <Section title="상품 이미지" isOpen={sections.product_image} onToggle={() => toggleSection('product_image')}>
                    {/* Top Help Text */}
                    <div className="bg-white p-4 border-b border-gray-200 text-xs text-gray-500 space-y-1">
                        <p>처음 상품 이미지를 등록 하신다면, 반드시 <a href="#" className="text-blue-600 underline">상품 이미지 사이즈 설정</a> 먼저 설정하세요!</p>
                        <p>자동리사이즈는 원본 이미지만 등록하면 나머지 이미지들은 자동으로 리사이징 되는 간편한 기능입니다.</p>
                        <p>이미지 개별 등록 시 “직접 업로드와 URL 직접입력” 방식 모두 사용할 수 있으며, URL 직접입력으로 등록된 이미지는 리사이즈되지 않습니다.</p>
                        <div className="flex items-start gap-1">
                             <span className="font-bold bg-[#333] text-white px-1 rounded-sm text-[10px] mt-0.5">!</span>
                             <div>"직접 업로드와 URL 직접입력" 방식 모두 사용하여 이미지를 여러장 등록한 경우 "확대/상세 이미지"외 나머지 이미지에는 "직접 업로드"된 이미지만 적용됩니다.<br/>이미지파일의 용량은 모두 합해서10MB까지만 등록할 수 있습니다.</div>
                        </div>
                        <p className="text-[#ff4d4f]">상품이미지는 되도록이면 영문으로만 올려주세요. 한글로 올리는 경우 제휴서비스 문제 및 일부 컴퓨터에서 안보이는 현상이 있습니다.</p>
                        <div className="flex items-center gap-1 text-[#ff4d4f] font-bold mt-2">
                            <span className="font-bold bg-[#ff4d4f] text-white px-1 rounded-sm text-[10px]">!</span>
                            상품 이미지가 클라우드 저장소에 등록중인 경우 상품 이미지 수정이 불가합니다.
                        </div>
                    </div>


                    
                    <Row label="원본 이미지">
                        <div className="w-full py-2">
                             <label className="flex items-center gap-2 cursor-pointer mb-2">
                                <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-400 checked:bg-[#ff4d4f]" defaultChecked />
                                <span className="text-sm">체크시 개별이미지의 선택된 사이즈로 자동 리사이즈되어 등록됩니다.</span>
                            </label>
                            {initialProduct?.images && initialProduct.images.length > 0 && (
                                <div className="mb-4">
                                    <div className="text-sm font-bold text-gray-700 mb-2">기존 등록된 이미지:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {initialProduct.images.map((img: { id: string; url: string }) => (
                                            <div key={img.id} className="relative w-20 h-20 border border-gray-200 rounded-sm overflow-hidden bg-white">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={img.url} alt="product image" className="object-cover w-full h-full" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="space-y-1.5 mb-2">
                                {originImages.map((img, index) => (
                                    <div key={img.id} className="flex gap-1">
                                        <input 
                                            type="file" 
                                            name="images"
                                            id={`origin-file-${img.id}`}
                                            className="hidden" 
                                            accept="image/*"
                                            onChange={(e) => handleOriginImageFileChange(img.id, e)}
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => document.getElementById(`origin-file-${img.id}`)?.click()}
                                            className="px-3 py-1 bg-[#aeaeae] text-white text-xs rounded-sm hover:bg-gray-500"
                                        >
                                            찾아보기
                                        </button>
                                        <input 
                                            type="text" 
                                            className="input input-sm h-7 w-64 border-gray-300 bg-gray-50" 
                                            value={img.name}
                                            readOnly 
                                            placeholder="파일을 선택해주세요"
                                        />
                                        {index === 0 ? (
                                            <button 
                                                type="button" 
                                                onClick={handleAddOriginImageRow}
                                                className="px-3 py-1 border border-gray-300 bg-white text-xs rounded-sm hover:bg-gray-50 flex items-center gap-1 min-w-[60px] justify-center"
                                            >
                                                <span className="font-bold text-gray-500">+</span> 추가
                                            </button>
                                        ) : (
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveOriginImageRow(img.id)}
                                                className="px-3 py-1 border border-gray-300 bg-white text-xs rounded-sm hover:bg-gray-50 flex items-center gap-1 min-w-[60px] justify-center text-gray-600"
                                            >
                                                <span className="font-bold text-gray-400">-</span> 삭제
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                             <div className="text-xs text-gray-500 flex items-start gap-1">
                                 <span className="font-bold bg-[#333] text-white px-1 rounded-sm text-[10px] mt-0.5">!</span>
                                 <div>
                                    <span className="text-[#ff4d4f]">원본 이미지</span>는 자동리사이즈 기능을 위한 이미지로 따로 <span className="text-[#ff4d4f]">저장되지 않습니다.</span><br/>
                                    원본 이미지를 추가로 등록한 경우, 썸네일/리스트/운영자 추가 이미지에는 <span className="text-[#ff4d4f]">처음 등록한 이미지만 적용</span>됩니다.
                                 </div>
                            </div>
                        </div>
                    </Row>
                    
                    {/* 개별 이미지 List */}
                    <div className="grid grid-cols-[160px_1fr] border-b border-gray-200 last:border-b-0 min-h-[50px]">
                        <div className="bg-[#f9f9f9] p-4 flex text-sm font-bold text-gray-700 border-r border-gray-200">
                            개별이미지
                        </div>
                        <div className="w-full">
                            {[
                                { label: '확대 이미지', size: 600 },
                                { label: '상세 이미지', size: 600 },
                                { label: '썸네일 이미지', size: 150 },
                                { label: '리스트이미지(기본)', size: 180 },
                                { label: '리스트그룹형', size: 166 },
                                { label: '심플이미지형', size: 248 },
                                { label: '추가리스트1', size: 220 },
                                { label: '추가리스트2', size: 280 },
                                { label: '추가이미지1', size: 310 },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center px-3 py-3 border-b border-gray-100 last:border-none hover:bg-gray-50">
                                    <div className="w-32 text-sm font-bold text-gray-600">{item.label}</div>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-400 checked:bg-[#ff4d4f]" defaultChecked />
                                        <span className="text-sm text-gray-600">“가로 {item.size} pixel(픽셀)” 로 자동 리사이즈 합니다.</span>
                                    </label>
                                </div>
                            ))}
                            
                             <div className="p-4 text-xs text-[#ff4d4f] border-t border-gray-200 bg-white">
                                <div className="flex items-start gap-1">
                                     <span className="font-bold bg-[#ff4d4f] text-white px-1 rounded-sm text-[10px] mt-0.5">!</span>
                                     <div>
                                        개별이미지의 “자동 리사이즈” 기능은 원본 이미지를 대상으로만 적용됩니다.<br/>
                                        원본이미지를 등록하지 않고 개별이미지의 자동 리사이즈를 체크한 경우 이미지는 등록되지 않습니다.
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
                <Section title="상품 상세 설명" isOpen={sections.detail} onToggle={() => toggleSection('detail')}>
                    <div className="bg-gray-50 p-4 border-b">
                        <div className="text-xs text-red-500 font-bold mb-1 flex items-start gap-1">
                             <span className="font-bold bg-gray-500 text-white px-1 rounded-sm text-[10px]">!</span>
                             모든 이미지파일의 외부링크 (옥션, G마켓 등의 오픈마켓 포함)는 지원되지 않습니다.
                        </div>
                        <div className="text-xs text-gray-500 pl-4">
                            G마켓, 11번가, 옥션 등의 오픈마켓 판매를 위한 이미지는 고도호스팅의 <a href="#" className="text-blue-600 underline">이미지호스팅 서비스</a>를 이용해 주시기 바랍니다.
                        </div>
                    </div>

                    <div className="border-t border-gray-200">
                        {/* Photo Button Toolbar */}
                        <div className="bg-[#f0f0f0] border-b border-gray-300 p-1 flex items-center gap-1">
                             <button 
                                type="button" 
                                onClick={() => openPhotoPopup('desc')}
                                className="px-2 h-6 bg-white border border-gray-300 text-xs flex items-center gap-1 hover:bg-gray-100"
                            >
                                📷 사진
                            </button>
                        </div>
                        
                        {/* Editor Content Area */}
                        <div className="relative">
                            <input type="hidden" name="description" value={descContent} />
                            
                            {activeEditorMode === 'editor' && (
                                <TipTapEditor 
                                    content={descContent} 
                                    onChange={setDescContent}
                                />
                            )}
                            
                            {activeEditorMode === 'html' && (
                                <textarea 
                                    className="w-full h-[400px] p-4 outline-none resize-none border-b border-gray-300 font-mono text-sm" 
                                    value={descContent}
                                    onChange={(e) => setDescContent(e.target.value)}
                                    placeholder="HTML 코드를 입력하세요."
                                />
                            )}
                            
                            {activeEditorMode === 'text' && (
                                <textarea 
                                    className="w-full h-[400px] p-4 outline-none resize-none border-b border-gray-300 text-sm" 
                                    value={descContent.replace(/<[^>]*>?/gm, '')} 
                                    onChange={(e) => setDescContent(e.target.value)} // Note: This is simple text binding. In a real app you might want to wrap plain text in <p> tags or similar when going back to HTML.
                                    placeholder="텍스트를 입력하세요."
                                />
                            )}

                            <div className="absolute bottom-0 w-full bg-[#f9f9f9] border-t border-gray-200 text-center py-1 cursor-ns-resize text-xs text-gray-400 hover:bg-gray-100">
                                ↕ 입력창 크기 조절
                            </div>
                            <div className="absolute bottom-1 right-1 flex z-10">
                                 <button 
                                    type="button" 
                                    onClick={() => setActiveEditorMode('editor')}
                                    className={`px-2 py-0.5 border border-gray-300 text-xs ${activeEditorMode === 'editor' ? 'bg-gray-200 font-bold' : 'bg-white'}`}
                                >
                                    Editor
                                </button>
                                 <button 
                                    type="button" 
                                    onClick={() => setActiveEditorMode('html')}
                                    className={`px-2 py-0.5 border border-gray-300 text-xs ${activeEditorMode === 'html' ? 'bg-gray-200 font-bold' : 'bg-white'}`}
                                >
                                    HTML
                                </button>
                                 <button 
                                    type="button" 
                                    onClick={() => {
                                        if (confirm('TEXT 모드로 전환하면 HTML 태그가 삭제됩니다. 계속하시겠습니까?')) {
                                            setActiveEditorMode('text');
                                            // Optional: strip tags effectively here if we wanted to change the underlying state, 
                                            // but for now the visual textarea handles the strip view. 
                                            // If we really want to convert the content, we should do:
                                            // setDescContent(prev => prev.replace(/<[^>]*>?/gm, ''));
                                        }
                                    }}
                                    className={`px-2 py-0.5 border border-gray-300 text-xs ${activeEditorMode === 'text' ? 'bg-gray-200 font-bold' : 'bg-white'}`}
                                >
                                    TEXT
                                </button>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 11. 배송 설정 */}
                <Section title="배송 설정" isOpen={sections.shipping} onToggle={() => toggleSection('shipping')}>
                    <Row label="배송비 선택" help>
                        <div className="flex items-center gap-2">
                            <button 
                                type="button" 
                                onClick={() => setIsShippingFeePopupOpen(true)}
                                className="px-2 py-1 bg-[#aeaeae] text-white text-xs rounded-sm hover:bg-gray-500"
                            >
                                배송비 선택
                            </button>
                            <span className="text-sm">선택된 배송비 : {selectedShippingFee}</span>
                        </div>
                        <div className="ml-2 text-xs text-gray-400 flex items-center gap-1">
                             <span className="font-bold bg-gray-500 text-white px-1 rounded-sm text-[10px]">!</span>
                             배송비는 <a href="#" className="text-blue-600 underline">기본설정&gt;배송 정책&gt;배송비조건 관리</a>에서 추가할 수 있습니다.
                        </div>
                    </Row>
                    <Row label="배송일정 사용">
                        <RadioGroup name="shipping_schedule" options={['사용함', '사용안함']} defaultValue="사용안함" />
                    </Row>
                </Section>



                {/* 15. 이용안내 */}
                <Section title="이용안내" isOpen={sections.guide} onToggle={() => toggleSection('guide')}>
                    <div className="bg-white p-3 border-b border-gray-200 text-xs text-gray-500 flex items-center gap-1">
                         <span className="font-bold bg-[#333] text-white px-1 rounded-sm text-[10px]">!</span>
                         <div>이용안내는 <a href="#" className="text-blue-600 underline">기본설정&gt;상품 정책&gt;상품 상세 이용안내 관리</a>에서 추가할 수 있습니다. (해외몰 쇼핑몰화면의 경우, [직접입력],[선택입력] 항목과 상관없이 "<a href="#" className="text-blue-600 underline">해외몰 적용 이용안내</a>"가 대체되어 노출됩니다.)</div>
                    </div>
                    
                    <Row label="배송안내 선택">
                        <div className="w-full">
                            <div className="flex items-center gap-4 mb-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="guide_type" value="none" className="radio radio-xs border-gray-300" />
                                    <span className="text-sm text-gray-700">사용안함</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="guide_type" value="manual" className="radio radio-xs border-gray-300" />
                                    <span className="text-sm text-gray-700">직접입력</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="guide_type" value="select" className="radio radio-xs checked:bg-[#ff4d4f] border-gray-300" defaultChecked />
                                    <span className="text-sm text-gray-700 font-bold">선택입력</span>
                                </label>
                                
                                <button 
                                    type="button" 
                                    onClick={() => openGuidePopup('shipping', '배송안내 선택')}
                                    className="px-2 py-1 bg-[#aeaeae] text-white text-xs rounded-sm hover:bg-gray-500"
                                >
                                    선택
                                </button>
                                <span className="text-sm text-gray-600">선택된 배송안내 : {selectedGuides.shipping}</span>
                            </div>

                            {/* Guide Editor */}
                            <GuideEditor 
                                content={shippingGuideContent}
                                onChange={setShippingGuideContent}
                                onPhotoClick={() => openPhotoPopup('shipping')}
                            />
                        </div>
                    </Row>
                    <Row label="AS안내 선택">
                        <div className="w-full">
                            <div className="flex items-center gap-4 mb-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="as_guide_type" value="none" className="radio radio-xs border-gray-300" />
                                    <span className="text-sm text-gray-700">사용안함</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="as_guide_type" value="manual" className="radio radio-xs border-gray-300" />
                                    <span className="text-sm text-gray-700">직접입력</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="as_guide_type" value="select" className="radio radio-xs checked:bg-[#ff4d4f] border-gray-300" defaultChecked />
                                    <span className="text-sm text-gray-700 font-bold">선택입력</span>
                                </label>
                                
                                <button 
                                    type="button" 
                                    onClick={() => openGuidePopup('as', 'AS안내 선택')}
                                    className="px-2 py-1 bg-[#aeaeae] text-white text-xs rounded-sm hover:bg-gray-500"
                                >
                                    선택
                                </button>
                                <span className="text-sm text-gray-600">선택된 AS안내 : {selectedGuides.as}</span>
                            </div>

                            {/* Guide Editor */}
                            <GuideEditor 
                                content={asGuideContent}
                                onChange={setAsGuideContent}
                                onPhotoClick={() => openPhotoPopup('as')}
                            />
                        </div>
                    </Row>
                    <Row label="환불안내 선택">
                        <div className="w-full">
                            <div className="flex items-center gap-4 mb-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="refund_guide_type" value="none" className="radio radio-xs border-gray-300" />
                                    <span className="text-sm text-gray-700">사용안함</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="refund_guide_type" value="manual" className="radio radio-xs border-gray-300" />
                                    <span className="text-sm text-gray-700">직접입력</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="refund_guide_type" value="select" className="radio radio-xs checked:bg-[#ff4d4f] border-gray-300" defaultChecked />
                                    <span className="text-sm text-gray-700 font-bold">선택입력</span>
                                </label>
                                
                                <button 
                                    type="button" 
                                    onClick={() => openGuidePopup('refund', '환불안내 선택')}
                                    className="px-2 py-1 bg-[#aeaeae] text-white text-xs rounded-sm hover:bg-gray-500"
                                >
                                    선택
                                </button>
                                <span className="text-sm text-gray-600">선택된 환불안내 : {selectedGuides.refund}</span>
                            </div>

                            {/* Guide Editor */}
                            <GuideEditor 
                                content={refundGuideContent}
                                onChange={setRefundGuideContent}
                                onPhotoClick={() => openPhotoPopup('refund')}
                            />
                        </div>
                    </Row>
                    <Row label="교환안내 선택">
                        <div className="w-full">
                            <div className="flex items-center gap-4 mb-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="exchange_guide_type" value="none" className="radio radio-xs border-gray-300" />
                                    <span className="text-sm text-gray-700">사용안함</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="exchange_guide_type" value="manual" className="radio radio-xs border-gray-300" />
                                    <span className="text-sm text-gray-700">직접입력</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="exchange_guide_type" value="select" className="radio radio-xs checked:bg-[#ff4d4f] border-gray-300" defaultChecked />
                                    <span className="text-sm text-gray-700 font-bold">선택입력</span>
                                </label>
                                
                                <button 
                                    type="button" 
                                    onClick={() => openGuidePopup('exchange', '교환안내 선택')}
                                    className="px-2 py-1 bg-[#aeaeae] text-white text-xs rounded-sm hover:bg-gray-500"
                                >
                                    선택
                                </button>
                                <span className="text-sm text-gray-600">선택된 교환안내 : {selectedGuides.exchange}</span>
                            </div>

                            {/* Guide Editor */}
                            <GuideEditor 
                                content={exchangeGuideContent}
                                onChange={setExchangeGuideContent}
                                onPhotoClick={() => openPhotoPopup('exchange')}
                            />
                        </div>
                    </Row>
                </Section>

            </form>

            <PhotoAttachmentPopup 
                isOpen={isPhotoPopupOpen}
                onClose={() => setIsPhotoPopupOpen(false)}
                onConfirm={handlePhotoConfirm}
            />

            <SupplierPopup 
                isOpen={isSupplierPopupOpen}
                onClose={() => setIsSupplierPopupOpen(false)}
                onConfirm={(supplier) => {
                    if (supplier) {
                        if (Array.isArray(supplier)) {
                            if (supplier.length > 0) {
                                setSelectedSupplierName(supplier[0].name);
                            }
                        } else {
                            setSelectedSupplierName(supplier.name);
                        }
                    }
                }}
            />

            <BrandPopup 
                isOpen={isBrandPopupOpen}
                onClose={() => setIsBrandPopupOpen(false)}
                onConfirm={(brand) => {
                    if (brand) {
                        setSelectedBrandName(brand.name);
                        setSelectedBrandId(brand.id);
                    } else {
                        setSelectedBrandName("");
                        setSelectedBrandId("");
                    }
                }}
            />


            <EssentialInfoPopup 
                isOpen={isEssentialInfoPopupOpen}
                onClose={() => setIsEssentialInfoPopupOpen(false)}
            />
            <KCExamplePopup 
                isOpen={isKCExamplePopupOpen} 
                onClose={() => setIsKCExamplePopupOpen(false)} 
            />

            <ShippingFeePopup 
                isOpen={isShippingFeePopupOpen}
                onClose={() => setIsShippingFeePopupOpen(false)}
                onConfirm={(selected) => {
                    if (selected) {
                        setSelectedShippingFee(selected.name);
                    }
                }}
            />

            <GuidePopup 
                isOpen={guidePopupState.isOpen}
                popupTitle={guidePopupState.title}
                type={guidePopupState.type}
                onClose={() => setGuidePopupState(prev => ({ ...prev, isOpen: false }))}
                onConfirm={(selected) => {
                    if (selected) {
                        setSelectedGuides(prev => ({
                            ...prev,
                            [guidePopupState.type]: selected.title
                        }));
                    }
                }}
            />
        </div>
    );
}


// --- Sub Components ---

function Section({ title, isOpen, onToggle, helpText, extraLink, children }: { 
    title: string; 
    isOpen: boolean; 
    onToggle: () => void; 
    helpText?: string;
    extraLink?: { text: string; href: string };
    children: React.ReactNode;
}) {
    return (
        <div className="border-t-2 border-gray-800">
            <div className="bg-[#fbfbfb] p-3 flex justify-between items-center border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800 text-base">{title}</h3>
                    {helpText && <HelpCircle size={16} className="text-gray-400 cursor-help" />}
                    {extraLink && <a href={extraLink.href} className="text-red-500 text-xs hover:underline ml-2">{extraLink.text}</a>}
                </div>
                <button type="button" onClick={onToggle} className="text-xs text-blue-600 flex items-center hover:underline">
                    {isOpen ? '닫힘' : '열림'} {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
            </div>
            {isOpen && (
                <div className="bg-white border-l border-r border-b border-gray-200">
                    {children}
                </div>
            )}
        </div>
    );
}

function Row({ label, required, help, children }: { label: string; required?: boolean; help?: boolean; children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-[160px_1fr] border-b border-gray-200 last:border-b-0 min-h-[50px]">
            <div className="bg-[#f9f9f9] p-4 flex items-center text-sm font-bold text-gray-700 border-r border-gray-200">
                {required && <span className="text-[#ff4d4f] mr-1">*</span>}
                {label}
                {help && <HelpCircle size={14} className="ml-1 text-gray-400" />}
            </div>
            <div className="p-3 flex items-center">
                {children}
            </div>
        </div>
    );
}

function RadioGroup({ name, options, defaultValue }: { name: string; options: string[]; defaultValue?: string }) {
    return (
        <div className="flex items-center gap-6">
            {options.map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="radio" 
                        name={name} 
                        value={opt} 
                        defaultChecked={opt === defaultValue}
                        className="radio radio-xs checked:bg-[#ff4d4f] border-gray-300" 
                    />
                    <span className="text-sm text-gray-700">{opt}</span>
                </label>
            ))}
        </div>
    );
}

