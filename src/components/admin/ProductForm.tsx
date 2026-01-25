"use client";

import { useState, useActionState, useRef } from "react";
import { useRouter } from "next/navigation";

import { HelpCircle, ChevronUp, ChevronDown, Calendar } from "lucide-react";
import { createProductAction } from "@/actions/product-actions";

import { Brand, Category } from "@/generated/prisma";
import SupplierPopup from "./SupplierPopup";
import BrandPopup from "./BrandPopup";
import HSCodePopup from "./HSCodePopup";
import MemberLevelPopup from "./MemberLevelPopup";
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
}

const initialState = {
    message: "",
    success: false,
};

export default function ProductForm({ categories }: Props) {
    const router = useRouter();
    const [state, formAction] = useActionState(createProductAction, initialState);
    
    const formRef = useRef<HTMLFormElement>(null);
    
    // UI States for collapsible sections
    const [sections, setSections] = useState({
        category: true,
        display: true,
        basic: true,
        image: true,
        payment: true,
        additional: true,
        essential: true,
        sales: true,
        mileage: true,
        discount: true,
        price: true,
        option: true,
        text_option: true,
        product_image: true,
        detail: true,
        shipping: true,
        related: true,
        magnifier: true,
        video: true,
        guide: true,
        seo: true,
        admin_memo: true,
    });

    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [selectedCategoriesList, setSelectedCategoriesList] = useState<Category[]>([]);
    
    // Editor State
    const [descContent, setDescContent] = useState("");
    const [activeEditorMode, setActiveEditorMode] = useState<'editor' | 'html' | 'text'>('editor');
    const [productNameType, setProductNameType] = useState('basic');
    const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false);
    
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

    const handlePhotoConfirm = (files: File[]) => {
        setIsPhotoPopupOpen(false);
        if (files.length === 0) return;

        // Mock upload - create local object URLs
        const imagesHtml = files.map(file => {
            const url = URL.createObjectURL(file);
            return `<img src="${url}" alt="${file.name}" style="max-width: 100%;" />`;
        }).join('<br/>');

        if (photoTarget === 'desc') {
             setDescContent(prev => prev + '<br/>' + imagesHtml);
        } else if (photoTarget === 'shipping') {
            setShippingGuideContent(prev => prev + '\n' + imagesHtml);
        } else if (photoTarget === 'as') {
            setAsGuideContent(prev => prev + '\n' + imagesHtml);
        } else if (photoTarget === 'refund') {
            setRefundGuideContent(prev => prev + '\n' + imagesHtml);
        } else if (photoTarget === 'exchange') {
            setExchangeGuideContent(prev => prev + '\n' + imagesHtml);
        }
    };
    
    const openPhotoPopup = (target: 'desc' | 'shipping' | 'as' | 'refund' | 'exchange') => {
        setPhotoTarget(target);
        setIsPhotoPopupOpen(true);
    };
    
    // Supplier Popup State
    const [isSupplierPopupOpen, setIsSupplierPopupOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedSupplierName, setSelectedSupplierName] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [supplierType, setSupplierType] = useState("본사");

    // Brand Popup State
    const [isBrandPopupOpen, setIsBrandPopupOpen] = useState(false);
    const [selectedBrandName, setSelectedBrandName] = useState<string>("");

    // HSCode Popup State
    interface HSCodeRow {
        id: number;
        country: string;
        code: string;
    }
    const [isHSCodePopupOpen, setIsHSCodePopupOpen] = useState(false);
    const [selectedHSCode, setSelectedHSCode] = useState<string>(""); // Default Korea code
    const [additionalHSCodes, setAdditionalHSCodes] = useState<HSCodeRow[]>([]);
    const [activeHSCodeRowId, setActiveHSCodeRowId] = useState<number | null>(null); // null = default row

    // Essential Info Popup State
    const [isEssentialInfoPopupOpen, setIsEssentialInfoPopupOpen] = useState(false);
    const [isKCExamplePopupOpen, setIsKCExamplePopupOpen] = useState(false);

    const handleAddHSCode = () => {
        setAdditionalHSCodes(prev => [...prev, { id: Date.now(), country: '미국', code: '' }]);
    };

    const handleRemoveHSCode = (id: number) => {
        setAdditionalHSCodes(prev => prev.filter(row => row.id !== id));
    };

    const handleHSCodeRowChange = (id: number, field: keyof HSCodeRow, value: string) => {
        setAdditionalHSCodes(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
    };



    // Date Picker States & Refs for Additional Info
    const manufactureDateRef = useRef<HTMLInputElement>(null);
    const releaseDateRef = useRef<HTMLInputElement>(null);
    const validStartDateRef = useRef<HTMLInputElement>(null);
    const validEndDateRef = useRef<HTMLInputElement>(null);

    const [manufactureDate, setManufactureDate] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [validStartDate, setValidStartDate] = useState("");
    const [validEndDate, setValidEndDate] = useState("");



    const handleAdditionalDateIconClick = (ref: React.RefObject<HTMLInputElement | null>) => {
        try {
            ref.current?.showPicker();
        } catch {
            ref.current?.focus();
        }
    };

    // Member Level Popup State
    interface MemberLevel {
        id: number;
        no: number;
        name: string;
        date: string;
    }
    const [isMemberLevelPopupOpen, setIsMemberLevelPopupOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedMemberLevels, setSelectedMemberLevels] = useState<MemberLevel[]>([]);
    const [memberLevelOption, setMemberLevelOption] = useState("전체(회원+비회원)");
    
    // Access Authority Member Level State
    const [accessAuthMemberLevelOption, setAccessAuthMemberLevelOption] = useState("전체(회원+비회원)");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedAccessAuthMemberLevels, setSelectedAccessAuthMemberLevels] = useState<MemberLevel[]>([]);
    
    // Valid target: 'purchase' (default/existing) or 'access' (new)
    const [memberLevelPopupTarget, setMemberLevelPopupTarget] = useState<'purchase' | 'access' | null>(null);

    // Date Picker State (Original Exposure Date)
    const datePickerRef = useRef<HTMLInputElement>(null);
    const [exposureDate, setExposureDate] = useState(new Date().toISOString().slice(0, 16).replace('T', ' '));
    
    // Sales Period States & Refs
    const salesStartDateRef = useRef<HTMLInputElement>(null);
    const salesEndDateRef = useRef<HTMLInputElement>(null);
    const [salesPeriodOption, setSalesPeriodOption] = useState("제한없음");
    const [salesStartDate, setSalesStartDate] = useState(new Date().toISOString().slice(0, 16).replace('T', ' ').split(' ')[0] + " 00:00");
    const [salesEndDate, setSalesEndDate] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 6);
        return d.toISOString().slice(0, 16).replace('T', ' ').split(' ')[0] + " 23:59";
    });

    const handleSalesDateShortcut = (days: number) => {
        const start = new Date();
        const end = new Date();
        end.setDate(start.getDate() + (days === 0 ? 0 : days - 1));
        
        setSalesStartDate(start.toISOString().slice(0, 10) + " 00:00");
        setSalesEndDate(end.toISOString().slice(0, 10) + " 23:59");
    };

    const handleSalesMonthShortcut = (months: number) => {
        const start = new Date();
        const end = new Date();
        end.setMonth(start.getMonth() + months);
        
        setSalesStartDate(start.toISOString().slice(0, 10) + " 00:00");
        setSalesEndDate(end.toISOString().slice(0, 10) + " 23:59");
    };

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

    const handleDateIconClick = () => {
        try {
            datePickerRef.current?.showPicker();
        } catch {
            // Fallback for browsers not supporting showPicker, though unlikely on modern desktop
            datePickerRef.current?.focus(); 
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            // value comes as YYYY-MM-DDTHH:mm, replace T with space to match format
            setExposureDate(e.target.value.replace('T', ' '));
        }
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [essentialItems, setEssentialItems] = useState<EssentialItem[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleAddEssentialItem = (type: 2 | 4) => {
        setEssentialItems(prev => [...prev, { 
            id: Date.now(), 
            type, 
            label1: '', 
            value1: '', 
            label2: '', 
            value2: '' 
        }]);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleRemoveEssentialItem = (id: number) => {
        setEssentialItems(prev => prev.filter(item => item.id !== id));
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleEssentialItemChange = (id: number, field: keyof EssentialItem, value: string) => {
        setEssentialItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleCopyEssentialItem = (label: string, value: string) => {
        setEssentialItems(prev => [...prev, {
            id: Date.now(),
            type: 2, // Assuming copy creates a 2-slot looking item (filling first pair)
            label1: label,
            value1: value,
            label2: '',
            value2: ''
        }]);
    };

    // Additional Items State
    interface AdditionalItem {
        id: number;
        name: string;
        value: string;
    }
    const [additionalItems, setAdditionalItems] = useState<AdditionalItem[]>([]);

    const handleAddAdditionalItem = () => {
        setAdditionalItems(prev => [...prev, { id: Date.now(), name: '', value: '' }]);
    };

    const handleRemoveAdditionalItem = (id: number) => {
        setAdditionalItems(prev => prev.filter(item => item.id !== id));
    };

     const handleAdditionalItemChange = (id: number, field: 'name' | 'value', text: string) => {
        setAdditionalItems(prev => prev.map(item => item.id === id ? { ...item, [field]: text } : item));
    };
    // Color Picker State
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleColorClick = (color: string) => {
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
                <h2 className="text-xl font-bold text-gray-800">상품 등록</h2>
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
                        저장
                    </button>
                </div>
            </div>

            <form ref={formRef} action={formAction} className="space-y-8 px-4">
                <input type="hidden" name="categoryId" value={selectedCategoryId} />
                
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
                             <div className="flex-1 border border-gray-300 overflow-y-auto">
                                <div className="p-2 border-b bg-gray-50 text-xs font-bold text-gray-700">=카테고리선택=</div>
                                <ul className="text-sm">
                                    {categories.map(cat => (
                                        <li 
                                            key={cat.id} 
                                            onClick={() => setSelectedCategoryId(cat.id)}
                                            className={`cursor-pointer px-3 py-1.5 hover:bg-blue-50 ${selectedCategoryId === cat.id ? 'bg-[#516d99] text-white' : 'text-gray-600'}`}
                                        >
                                            {cat.name}
                                        </li>
                                    ))}
                                </ul>
                             </div>
                             {/* Category Depth 2 (Mock) */}
                             <div className="flex-1 border border-gray-300 bg-white">
                                <div className="p-2 border-b bg-gray-50 text-xs font-bold text-gray-700">=카테고리선택=</div>
                             </div>
                             {/* Category Depth 3 (Mock) */}
                             <div className="flex-1 border border-gray-300 bg-white">
                                <div className="p-2 border-b bg-gray-50 text-xs font-bold text-gray-700">=카테고리선택=</div>
                             </div>
                             {/* Category Depth 4 (Mock) */}
                             <div className="flex-1 border border-gray-300 bg-white">
                                <div className="p-2 border-b bg-gray-50 text-xs font-bold text-gray-700">=카테고리선택=</div>
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

                {/* 3. 노출 및 판매상태 설정 */}
                <Section title="노출 및 판매상태 설정" isOpen={sections.display} onToggle={() => toggleSection('display')}>
                    <Row label="PC쇼핑몰 노출상태" help>
                        <RadioGroup name="pc_display" options={['노출함', '노출안함']} />
                    </Row>
                    <Row label="PC쇼핑몰 판매상태" help>
                        <RadioGroup name="pc_sale" options={['판매함', '판매안함']} />
                    </Row>
                    <Row label="모바일쇼핑몰 노출상태">
                        <RadioGroup name="mobile_display" options={['노출함', '노출안함']} />
                    </Row>
                    <Row label="모바일쇼핑몰 판매상태">
                         <RadioGroup name="mobile_sale" options={['판매함', '판매안함']} />
                    </Row>
                    <Row label="메인상품 진열 상태">
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="border border-gray-200">
                                <div className="bg-gray-100 p-2 text-xs font-bold text-center border-b">PC쇼핑몰</div>
                                <div className="p-3 space-y-2">
                                    <Checkbox label="New Arrivals" />
                                    <Checkbox label="Best Sellers" />
                                    <Checkbox label="MD Pick" />
                                </div>
                            </div>
                            <div className="border border-gray-200">
                                <div className="bg-gray-100 p-2 text-xs font-bold text-center border-b">모바일쇼핑몰</div>
                                <div className="p-3 space-y-2">
                                     <Checkbox label="New Arrivals" />
                                     <Checkbox label="Best Sellers" />
                                </div>
                            </div>
                        </div>
                         <div className="mt-2 text-xs text-gray-500 flex items-start gap-1">
                             <span className="font-bold bg-gray-400 text-white px-1 rounded-sm text-[10px]">!</span>
                             <span>자동진열로 설정된 메인분류는 체크(진열)상태가 기본이며, 체크해제시 해당 메인분류의 진열 예외 상품으로 저장됩니다.</span>
                        </div>
                    </Row>
                     <Row label="인기상품 포함 상태">
                        <div className="text-xs text-gray-500 flex items-start gap-1">
                             <span className="font-bold bg-gray-400 text-white px-1 rounded-sm text-[10px]">!</span>
                             <span>인기상품 수집 범위가 전체 상품으로 설정된 경우 체크(포함) 상태가 기본이며, 체크 해제 시 해당 인기상품의 수집 예외 상품으로 저장됩니다.</span>
                        </div>
                     </Row>
                </Section>

                {/* 4. 기본 정보 */}
                <Section title="기본 정보" isOpen={sections.basic} onToggle={() => toggleSection('basic')}>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Row label="상품코드">
                            <span className="text-gray-500 text-sm">상품 등록시 자동 생성됩니다.</span>
                        </Row>
                         <Row label="자체 상품코드" help>
                             <div className="flex items-center w-full">
                                <input type="text" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm min-w-0" />
                                <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">0 / 30</span>
                             </div>
                        </Row>
                    </div>

                    <Row label="기준몰 상품명" required help>
                        <div className="space-y-3 w-full">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="name_type" 
                                        className="radio radio-xs border-gray-300" 
                                        checked={productNameType === 'basic'}
                                        onChange={() => setProductNameType('basic')}
                                    />
                                    <span className="text-sm text-gray-700">기본 상품명</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="name_type" 
                                        className="radio radio-xs border-gray-300 checked:bg-[#ff4d4f]" 
                                        checked={productNameType === 'expanded'}
                                        onChange={() => setProductNameType('expanded')}
                                    />
                                    <span className="text-sm text-gray-700 font-bold">확장 상품명</span>
                                </label>
                            </div>

                            <div className="bg-gray-50 p-3 border border-gray-200 rounded-sm space-y-3">
                                {/* Basic Name (Always Visible) */}
                                <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                    <span className="text-sm font-bold text-gray-700">기본</span>
                                     <div className="flex items-center gap-2 w-full">
                                        <input type="text" name="name" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm" required />
                                        <span className="text-xs text-gray-400">0 / 250</span>
                                     </div>
                                </div>

                                {/* Expanded Fields */}
                                {productNameType === 'expanded' && (
                                    <>
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                            <span className="text-sm font-bold text-gray-700">메인</span>
                                             <div className="flex items-center gap-2 w-full">
                                                <input type="text" name="name_main" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm" />
                                                <span className="text-xs text-gray-400">0 / 250</span>
                                             </div>
                                        </div>
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                            <span className="text-sm font-bold text-gray-700">리스트</span>
                                             <div className="flex items-center gap-2 w-full">
                                                <input type="text" name="name_list" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm" />
                                                <span className="text-xs text-gray-400">0 / 250</span>
                                             </div>
                                        </div>
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                            <span className="text-sm font-bold text-gray-700">상세</span>
                                             <div className="flex items-center gap-2 w-full">
                                                <input type="text" name="name_detail" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm" />
                                                <span className="text-xs text-gray-400">0 / 250</span>
                                             </div>
                                        </div>
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                            <span className="text-sm font-bold text-gray-700">제휴</span>
                                             <div className="flex items-center gap-2 w-full">
                                                <input type="text" name="name_affiliate" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm" />
                                                <span className="text-xs text-gray-400">0 / 250</span>
                                             </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Overseas Store Product Name */}
                            <div className="border border-gray-200 rounded-sm">
                                <div className="bg-[#f9f9f9] px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                                    해외 상점 상품명(기본)
                                </div>
                                <div className="p-4 bg-white flex gap-4 items-start">
                                    <div className="w-8 pt-1 flex justify-center">
                                        <div className="w-6 h-4 bg-red-600 relative border border-gray-200 shadow-sm">
                                            <span className="absolute top-0 left-0.5 text-[8px] leading-3 text-yellow-400">★</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2 w-full">
                                            <input type="text" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm bg-gray-100" disabled />
                                            <div className="bg-gray-50 border border-gray-200 px-2 h-8 flex items-center text-xs text-gray-500 rounded-sm w-16 justify-center">0 / 250</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <label className="flex items-center gap-1.5 cursor-pointer">
                                                <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300 checked:bg-[#ff4d4f] rounded-[2px]" defaultChecked />
                                                <span className="text-sm text-gray-600 tracking-tight">기준몰 기본 상품명 공통사용</span>
                                            </label>
                                            <button type="button" className="px-2 py-1 bg-[#666] text-white text-xs rounded-sm hover:bg-[#555]">참고 번역</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="font-bold bg-gray-400 text-white px-1 rounded-sm text-[10px]">!</span>
                                "확장 상품명"제휴" 상품명을 입력하면 외부연동(네이버 쇼핑 등)시 별도의 상품명을 사용할 수 있습니다.
                            </div>
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

                    <Row label="상품 노출시간" help>
                        <div className="flex items-center gap-1 relative">
                            <input 
                                type="text" 
                                className="input input-sm h-8 w-40 border-gray-300 rounded-sm text-center" 
                                value={exposureDate}
                                onChange={(e) => setExposureDate(e.target.value)}
                            />
                            <input 
                                type="datetime-local"
                                ref={datePickerRef}
                                className="absolute opacity-0 pointer-events-none w-0 h-0 bottom-0 left-0"
                                onChange={handleDateChange}
                            />
                            <button 
                                type="button" 
                                onClick={handleDateIconClick}
                                className="w-8 h-8 border border-gray-300 bg-white flex items-center justify-center rounded-sm hover:bg-gray-50"
                            >
                                <Calendar size={16} className="text-gray-500" />
                            </button>
                            <span className="text-gray-700 ml-1">부터</span>
                        </div>
                    </Row>


                </Section>

                {/* 5. 이미지 설정 */}
                <Section title="이미지 설정" isOpen={sections.image} onToggle={() => toggleSection('image')}>
                    <Row label="저장소 선택">
                        <div className="flex items-center gap-2">
                            <select className="select select-bordered select-sm h-8 rounded-sm" defaultValue="default">
                                <option disabled>=저장소 선택=</option>
                                <option value="default">기본 경로</option>
                                <option value="direct">URL 직접입력</option>
                            </select>
                             <div className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="font-bold bg-gray-400 text-white px-1 rounded-sm text-[10px]">!</span>
                                저장소 관리는 기본설정&gt;기본 정책&gt;파일 저장소 관리에서 가능합니다.
                            </div>
                        </div>
                    </Row>

                </Section>



                <Section title="추가 정보" helpText="help" isOpen={sections.additional} onToggle={() => toggleSection('additional')}>
                    <Row label="매입처 상품명">
                         <div className="w-full">
                            <label className="flex items-center gap-2 cursor-pointer mb-2">
                                <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" />
                                <span className="text-sm text-gray-700">체크시 기본 상품명이 매입처 상품명에 추가됩니다.</span>
                            </label>
                            <div className="flex items-center w-full">
                                <input type="text" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm min-w-0" />
                                <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">0 / 250</span>
                             </div>
                         </div>
                    </Row>
                    
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
                        <Row label="모델번호" help>
                             <div className="flex items-center w-full">
                                <input type="text" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm min-w-0" />
                                <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">0 / 30</span>
                             </div>
                        </Row>
                    </div>

                    <Row label="HS코드">
                        <div className="space-y-2">
                             <div className="flex items-center gap-1">
                                <select className="select select-bordered select-sm h-8 rounded-sm w-32 bg-[#f2f2f2]">
                                    <option>대한민국</option>
                                </select>
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setActiveHSCodeRowId(null);
                                        setIsHSCodePopupOpen(true);
                                    }}
                                    className="px-3 py-1 bg-[#999] text-white text-xs rounded-sm hover:bg-[#888]"
                                >
                                    HS코드 선택
                                </button>
                                <input type="text" className="input input-sm h-8 w-40 border-gray-300 rounded-sm" value={selectedHSCode} disabled />
                                <button type="button" onClick={handleAddHSCode} className="px-3 py-1 border border-gray-300 bg-white text-xs rounded-sm hover:bg-gray-50 flex items-center gap-1">
                                    <span className="font-bold">+</span> 추가
                                </button>
                             </div>
                             
                             {/* Dynamic HS Code Rows */}
                             {additionalHSCodes.map(row => (
                                <div key={row.id} className="flex items-center gap-1">
                                    <select 
                                        className="select select-bordered select-sm h-8 rounded-sm w-32 border-red-500 text-gray-800"
                                        value={row.country}
                                        onChange={(e) => handleHSCodeRowChange(row.id, 'country', e.target.value)}
                                    >
                                        <option value="미국">미국</option>
                                        <option value="중국">중국</option>
                                        <option value="일본">일본</option>
                                    </select>
                                    <button 
                                        type="button" 
                                        onClick={() => {
                                            setActiveHSCodeRowId(row.id);
                                            setIsHSCodePopupOpen(true);
                                        }}
                                        className="px-3 py-1 bg-[#999] text-white text-xs rounded-sm hover:bg-[#888]"
                                    >
                                        HS코드 선택
                                    </button>
                                    <input type="text" className="input input-sm h-8 w-40 border-gray-300 rounded-sm" value={row.code} disabled />
                                    <button 
                                        type="button" 
                                        onClick={() => handleRemoveHSCode(row.id)}
                                        className="px-3 py-1 border border-gray-300 bg-white text-xs rounded-sm hover:bg-gray-50 flex items-center gap-1"
                                    >
                                        <span className="font-bold">-</span> 삭제
                                    </button>
                                </div>
                             ))}
                             <div className="text-xs text-gray-400 flex items-center gap-1">
                                <span className="font-bold bg-gray-500 text-white px-1 rounded-sm text-[10px]">!</span>
                                추가 버튼을 이용하여 국가별 HS코드를 추가 입력할 수 있습니다.
                             </div>
                        </div>
                    </Row>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Row label="제조일">
                            <div className="flex items-center gap-1 relative">
                                <input 
                                    type="text" 
                                    className="input input-sm h-8 w-40 border-gray-300 rounded-sm text-center placeholder-gray-300" 
                                    placeholder="수기입력 가능"
                                    value={manufactureDate} 
                                    onChange={(e) => setManufactureDate(e.target.value)}
                                />
                                <input 
                                    type="date" 
                                    ref={manufactureDateRef} 
                                    className="absolute opacity-0 pointer-events-none w-0 h-0 bottom-0 left-0" 
                                    onChange={(e) => setManufactureDate(e.target.value)} 
                                />
                                <button 
                                    type="button" 
                                    onClick={() => handleAdditionalDateIconClick(manufactureDateRef)}
                                    className="w-8 h-8 border border-gray-300 bg-white flex items-center justify-center rounded-sm hover:bg-gray-50"
                                >
                                    <Calendar size={16} className="text-gray-500" />
                                </button>
                            </div>
                        </Row>
                        <Row label="출시일">
                            <div className="flex items-center gap-1 relative">
                                <input 
                                    type="text" 
                                    className="input input-sm h-8 w-40 border-gray-300 rounded-sm text-center placeholder-gray-300" 
                                    placeholder="수기입력 가능" 
                                    value={releaseDate} 
                                    onChange={(e) => setReleaseDate(e.target.value)}
                                />
                                <input 
                                    type="date" 
                                    ref={releaseDateRef} 
                                    className="absolute opacity-0 pointer-events-none w-0 h-0 bottom-0 left-0" 
                                    onChange={(e) => setReleaseDate(e.target.value)} 
                                />
                                <button 
                                    type="button" 
                                    onClick={() => handleAdditionalDateIconClick(releaseDateRef)}
                                    className="w-8 h-8 border border-gray-300 bg-white flex items-center justify-center rounded-sm hover:bg-gray-50"
                                >
                                    <Calendar size={16} className="text-gray-500" />
                                </button>
                            </div>
                        </Row>
                    </div>
                    
                    <Row label="유효일자">
                        <div className="flex items-center gap-1 relative">
                            <span className="text-sm text-gray-700 mr-2">시작일 / 종료일</span>
                             <input 
                                type="text" 
                                className="input input-sm h-8 w-32 border-gray-300 rounded-sm text-center placeholder-gray-300" 
                                placeholder="수기입력 가능" 
                                value={validStartDate}
                                onChange={(e) => setValidStartDate(e.target.value)}
                             />
                             <input 
                                type="date" 
                                ref={validStartDateRef} 
                                className="absolute opacity-0 pointer-events-none w-0 h-0 bottom-0 left-0" 
                                onChange={(e) => setValidStartDate(e.target.value)} 
                            />
                            <button 
                                type="button" 
                                onClick={() => handleAdditionalDateIconClick(validStartDateRef)}
                                className="w-8 h-8 border border-gray-300 bg-white flex items-center justify-center rounded-sm hover:bg-gray-50"
                            >
                                <Calendar size={16} className="text-gray-500" />
                            </button>
                            <span className="text-gray-500 mx-1">~</span>
                            <div className="relative flex items-center gap-1">
                                <input 
                                    type="text" 
                                    className="input input-sm h-8 w-32 border-gray-300 rounded-sm text-center placeholder-gray-300" 
                                    placeholder="수기입력 가능" 
                                    value={validEndDate}
                                    onChange={(e) => setValidEndDate(e.target.value)}
                                />
                                <input 
                                    type="date" 
                                    ref={validEndDateRef} 
                                    className="absolute opacity-0 pointer-events-none w-0 h-0 bottom-0 left-0" 
                                    onChange={(e) => setValidEndDate(e.target.value)} 
                                />
                                <button 
                                    type="button" 
                                    onClick={() => handleAdditionalDateIconClick(validEndDateRef)}
                                    className="w-8 h-8 border border-gray-300 bg-white flex items-center justify-center rounded-sm hover:bg-gray-50"
                                >
                                    <Calendar size={16} className="text-gray-500" />
                                </button>
                            </div>
                        </div>
                    </Row>

                    <Row label="구매가능 회원등급" help>
                        <div className="space-y-2">
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex items-center gap-4">
                                    {['전체(회원+비회원)', '회원전용(비회원제외)', '특정회원등급'].map((option) => (
                                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="member_level" 
                                                className="radio radio-xs" 
                                                checked={memberLevelOption === option}
                                                onChange={() => {
                                                    setMemberLevelOption(option);
                                                    if (option === '특정회원등급') {
                                                        setMemberLevelPopupTarget('purchase');
                                                        setIsMemberLevelPopupOpen(true);
                                                    }
                                                }}
                                            />
                                            <span className="text-sm">{option}</span>
                                        </label>
                                    ))}
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setMemberLevelPopupTarget('purchase');
                                        setIsMemberLevelPopupOpen(true);
                                    }}
                                    className="px-2 py-1 bg-gray-400 text-white text-xs rounded-sm hover:bg-gray-500"
                                >
                                    회원등급 선택
                                </button>
                                <label className="flex items-center gap-2 cursor-pointer ml-2">
                                    <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" />
                                    <span className="text-sm text-gray-500">구매불가 고객 가격 대체문구 사용</span>
                                </label>
                            </div>
                             <div className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="font-bold bg-gray-500 text-white px-1 rounded-sm text-[10px]">!</span>
                                "구매불가 고객 가격 대체문구 사용"에 체크 및 내용 입력 시, 구매가 불가능한 고객들을 대상으로 가격 대신 해당 문구가 노출됩니다.
                             </div>
                        </div>
                    </Row>

                    <Row label="성인인증" help>
                        <div className="relative w-full">
                            <div className="space-y-3">
                                <div className="flex items-center gap-6">
                                    <RadioGroup name="adult_auth" options={['사용안함', '사용함']} defaultValue="사용안함" />
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" checked disabled />
                                        <span className="text-sm text-gray-400">미인증 고객 상품 노출함</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" />
                                        <span className="text-sm text-gray-500">미인증 고객 상품 이미지 노출함</span>
                                    </label>
                                </div>
                                <div className="text-xs text-gray-400 space-y-1">
                                    <p className="flex items-start gap-1">
                                         <span className="font-bold bg-gray-500 text-white px-1 rounded-sm text-[10px]">!</span>
                                         해당 상품의 상세페이지 접근시 성인인증확인 인트로 페이지가 출력되며, 진열 이미지는 19금 이미지로 대체되어 보여집니다.
                                    </p>
                                    <p className="pl-5">성인인증 기능은 별도의 인증 서비스 신청완료 후 이용 가능합니다.</p>
                                    <p className="pl-5 pt-1">
                                        <a href="#" className="text-blue-500 underline">휴대폰인증 설정 바로가기</a> <a href="#" className="text-blue-500 underline ml-2">아이핀인증 설정 바로가기</a>
                                    </p>
                                    <p className="flex items-center gap-1 text-red-500 mt-2">
                                        <span className="font-bold bg-red-500 text-white px-1 rounded-sm text-[10px]">!</span>
                                        구 실명인증 서비스는 성인인증 수단으로 연결되지 않습니다.
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                    </Row>

                    <Row label="접근 권한">
                         <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-4">
                                {['전체(회원+비회원)', '회원전용(비회원제외)', '특정회원등급'].map((option) => (
                                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="access_auth_2" 
                                            className="radio radio-xs" 
                                            checked={accessAuthMemberLevelOption === option}
                                            onChange={() => {
                                                setAccessAuthMemberLevelOption(option);
                                                if (option === '특정회원등급') {
                                                    setMemberLevelPopupTarget('access');
                                                    setIsMemberLevelPopupOpen(true);
                                                }
                                            }}
                                        />
                                        <span className="text-sm">{option}</span>
                                    </label>
                                ))}
                            </div>
                            <button 
                                type="button" 
                                onClick={() => {
                                    setMemberLevelPopupTarget('access');
                                    setIsMemberLevelPopupOpen(true);
                                }}
                                className="px-2 py-1 bg-gray-400 text-white text-xs rounded-sm hover:bg-gray-500"
                            >
                                회원등급 선택
                            </button>
                            <label className="flex items-center gap-2 cursor-pointer ml-4">
                                <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" defaultChecked />
                                <span className="text-sm text-gray-500">접근불가 고객 상품 노출함</span>
                            </label>
                            
                             {/* Scroll buttons overlay simulation */}
                             <div className="absolute right-0 -mr-6 top-0 flex flex-col gap-1">
                                <button className="w-8 h-8 rounded-full bg-[#d0d0d0] text-white flex items-center justify-center mb-1">↑</button>
                                <button className="w-8 h-8 rounded-full bg-[#d0d0d0] text-white flex items-center justify-center">↓</button>
                            </div>
                         </div>
                    </Row>

                    <Row label="추가항목" help>
                        <div className="w-full space-y-2">
                            <div className="flex items-center gap-2">
                                <button 
                                    type="button" 
                                    onClick={handleAddAdditionalItem}
                                    className="px-3 py-1 border border-gray-300 bg-white text-xs rounded-sm hover:bg-gray-50 flex items-center gap-1"
                                >
                                    <span className="text-gray-600 font-bold">+</span> 항목추가
                                </button>
                                <div className="text-xs text-gray-500 flex items-center gap-1 ml-2">
                                    <span className="font-bold bg-gray-500 text-white px-1 rounded-sm text-[10px]">!</span>
                                    상품특성에 맞게 항목을 추가할 수 있습니다 (예. 감독, 저자, 출판사, 유통사, 상품영문명 등)
                                </div>
                            </div>
                            
                            {/* Table */}
                            <div className="border border-gray-300 border-b-0">
                                {/* Header */}
                                <div className="w-full bg-[#bfbfbf] h-9 flex items-center text-white text-center text-xs border-b border-gray-300">
                                    <div className="w-20 border-r border-gray-300/50 h-full flex items-center justify-center">순서</div>
                                    <div className="w-48 border-r border-gray-300/50 h-full flex items-center justify-center">항목</div>
                                    <div className="flex-1 border-r border-gray-300/50 h-full flex items-center justify-center">내용</div>
                                    <div className="w-20 h-full flex items-center justify-center">삭제</div>
                                </div>
                                
                                {/* Rows */}
                                {additionalItems.length === 0 ? (
                                    <div className="h-20 flex items-center justify-center bg-[#f9f9f9] border-b border-gray-300 text-xs text-gray-500">
                                        추가된 항목이 없습니다.
                                    </div>
                                ) : (
                                    additionalItems.map((item, index) => (
                                        <div key={item.id} className="flex items-center text-xs border-b border-gray-300 bg-white">
                                            <div className="w-20 border-r border-gray-300 h-9 flex items-center justify-center text-gray-600">
                                                {index + 1}
                                            </div>
                                            <div className="w-48 border-r border-gray-300 h-9 flex items-center justify-center px-2">
                                                <input 
                                                    type="text" 
                                                    className="w-full h-6 border border-gray-300 px-2 outline-none" 
                                                    value={item.name}
                                                    onChange={(e) => handleAdditionalItemChange(item.id, 'name', e.target.value)}
                                                />
                                            </div>
                                            <div className="flex-1 border-r border-gray-300 h-9 flex items-center justify-center px-2">
                                                <input 
                                                    type="text" 
                                                    className="w-full h-6 border border-gray-300 px-2 outline-none" 
                                                    value={item.value}
                                                    onChange={(e) => handleAdditionalItemChange(item.id, 'value', e.target.value)}
                                                />
                                            </div>
                                            <div className="w-20 h-9 flex items-center justify-center">
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleRemoveAdditionalItem(item.id)}
                                                    className="px-2 py-0.5 border border-gray-300 bg-white text-[11px] rounded-sm hover:bg-gray-50 flex items-center gap-1"
                                                >
                                                    <span className="text-gray-400">-</span> 삭제
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </Row>
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
                        <Row label="상품 무게 / 용량" help>
                             <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="w-10 text-xs text-gray-500">무게</span>
                                    <input type="text" className="input input-sm h-7 w-20 border-gray-300 rounded-sm text-right" defaultValue="0" />
                                    <span className="text-xs">g</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-10 text-xs text-gray-500">용량</span>
                                    <input type="text" className="input input-sm h-7 w-20 border-gray-300 rounded-sm text-right" defaultValue="0" />
                                    <span className="text-xs">ml</span>
                                </div>
                            </div>
                        </Row>
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-2">
                         <Row label="판매 재고">
                            <RadioGroup name="stock_type" options={['무한정 판매', '재고량에 따름']} defaultValue="무한정 판매" />
                         </Row>
                         <Row label="상품 재고">
                             <div className="flex items-center gap-2">
                                <input type="number" className="input input-sm h-8 w-24 border-gray-300 rounded-sm text-right" defaultValue="0" />
                                <span>개</span>
                             </div>
                         </Row>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Row label="묶음주문 단위">
                             <div className="flex items-center gap-2">
                                <select className="select select-bordered select-xs w-24" defaultValue="옵션기준">
                                    <option value="옵션기준">옵션기준</option>
                                    <option value="상품기준">상품기준</option>
                                </select>
                                <input type="number" className="input input-sm h-8 w-16 border-gray-300 rounded-sm text-right" defaultValue="1" />
                                <span className="text-sm">개 단위로 주문 및 장바구니에 담김</span>
                             </div>
                        </Row>
                        <Row label="품절 상태">
                             <RadioGroup name="soldout_status" options={['정상', '품절(수동)']} defaultValue="정상" />
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

                    <Row label="판매기간" help>
                        <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-4">
                                {['제한없음', '시작일 / 종료일'].map(option => (
                                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name="sales_period" 
                                            className="radio radio-xs checked:bg-red-500" 
                                            checked={salesPeriodOption === option}
                                            onChange={() => setSalesPeriodOption(option)}
                                        />
                                        <span className="text-sm">{option}</span>
                                    </label>
                                ))}
                            </div>
                            
                            <div className="flex items-center gap-1">
                                <input 
                                    type="text" 
                                    className="input input-sm h-8 w-40 border-gray-300 bg-gray-50 rounded-sm text-center text-xs" 
                                    value={salesStartDate}
                                    readOnly
                                />
                                <button 
                                    type="button" 
                                    onClick={() => salesStartDateRef.current?.showPicker()}
                                    className="w-8 h-8 border border-gray-300 bg-white flex items-center justify-center rounded-sm hover:bg-gray-50"
                                >
                                    <Calendar size={16} className="text-gray-500" />
                                </button>
                                <input 
                                    type="datetime-local" 
                                    ref={salesStartDateRef}
                                    className="absolute invisible w-0 h-0"
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            setSalesStartDate(e.target.value.replace('T', ' '));
                                            setSalesPeriodOption('시작일 / 종료일');
                                        }
                                    }}
                                />
                            </div>

                            <span className="text-gray-400">~</span>

                            <div className="flex items-center gap-1">
                                <input 
                                    type="text" 
                                    className="input input-sm h-8 w-40 border-gray-300 bg-gray-50 rounded-sm text-center text-xs" 
                                    value={salesEndDate}
                                    readOnly
                                />
                                <button 
                                    type="button" 
                                    onClick={() => salesEndDateRef.current?.showPicker()}
                                    className="w-8 h-8 border border-gray-300 bg-white flex items-center justify-center rounded-sm hover:bg-gray-50"
                                >
                                    <Calendar size={16} className="text-gray-500" />
                                </button>
                                <input 
                                    type="datetime-local" 
                                    ref={salesEndDateRef}
                                    className="absolute invisible w-0 h-0"
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            setSalesEndDate(e.target.value.replace('T', ' '));
                                            setSalesPeriodOption('시작일 / 종료일');
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex gap-0.5 ml-2">
                                {[
                                    { label: '오늘', value: 1 },
                                    { label: '7일', value: 7 },
                                    { label: '15일', value: 15 },
                                    { label: '1개월', value: '1m' },
                                    { label: '3개월', value: '3m' },
                                    { label: '1년', value: '1y' }
                                ].map((t) => (
                                    <button 
                                        key={t.label} 
                                        type="button" 
                                        onClick={() => {
                                            if (t.value === '1m') handleSalesMonthShortcut(1);
                                            else if (t.value === '3m') handleSalesMonthShortcut(3);
                                            else if (t.value === '1y') handleSalesMonthShortcut(12);
                                            else handleSalesDateShortcut(t.value as number);
                                            setSalesPeriodOption('시작일 / 종료일');
                                        }}
                                        className={`px-2 py-1 border border-gray-300 text-xs rounded-sm bg-white hover:bg-gray-50`}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Row>

                     <Row label="재입고 알림">
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-400" />
                                <span className="text-sm">상품 재입고 알림 사용</span>
                            </label>
                            <div className="text-xs text-gray-500 flex items-start gap-1">
                                <span className="font-bold bg-gray-400 text-white px-1 rounded-sm text-[10px]">!</span>
                                상품/옵션 품절시 쇼핑몰 상세페이지에 재입고 알림신청 버튼이 노출됩니다.
                            </div>
                        </div>
                    </Row>
                </Section>



                {/* 10. 상품 할인/혜택 설정 */}
                <Section title="상품 할인/혜택 설정" isOpen={sections.discount} onToggle={() => toggleSection('discount')}>
                    <Row label="적용방법">
                        <div className="w-full">
                            <div className="mb-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="discount_method" className="radio radio-xs checked:bg-[#ff4d4f] border-gray-300" defaultChecked />
                                    <span className="text-sm font-bold">개별설정</span>
                                </label>
                            </div>
                            
                            <div className="bg-[#f9f9f9] p-4 border border-gray-200 rounded-sm">
                                {/* 상품 할인 설정 */}
                                <div className="mb-6">
                                    <h4 className="font-bold text-sm text-gray-800 mb-2 pl-1">상품 할인 설정</h4>
                                    <div className="bg-white border border-gray-200">
                                        <div className="flex items-center border-b border-gray-200">
                                            <div className="w-32 bg-[#f9f9f9] p-3 text-sm font-bold text-gray-700 border-r border-gray-200">사용여부</div>
                                            <div className="p-3 flex items-center gap-6">
                                                <RadioGroup name="discount_usage" options={['사용안함', '사용함']} defaultValue="사용안함" />
                                            </div>
                                        </div>
                                        <div className="p-2 text-xs text-gray-500 flex items-center gap-1">
                                            <span className="font-bold bg-gray-500 text-white px-1 rounded-sm text-[10px] min-w-[14px] text-center">!</span>
                                            <span>절사기준 <a href="#" className="text-blue-600 underline">[기본설정&gt;기본정책&gt;금액/단위 기준설정]</a>에서 설정한 기준에 따름 : 0.1원 단위로 버림</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 혜택 제외 설정 */}
                                <div>
                                    <div className="flex items-center gap-1 mb-2 pl-1">
                                        <h4 className="font-bold text-sm text-gray-800">혜택 제외 설정</h4>
                                        <span className="font-bold bg-[#333] text-white px-1 rounded-sm text-[10px] min-w-[14px] text-center">!</span>
                                        <span className="text-xs text-gray-400">상품 할인 설정의 진행유형 및 기간과 상관없이 별도 설정이 가능합니다.</span>
                                    </div>
                                    
                                    <div className="bg-white border border-gray-200">
                                        <div className="flex border-b border-gray-200">
                                            <div className="w-32 bg-[#f9f9f9] p-3 text-sm font-bold text-gray-700 border-r border-gray-200 flex items-center">제외 혜택 선택</div>
                                            <div className="p-3 flex flex-col gap-1.5">
                                                {['회원 추가 할인혜택 적용 제외', '회원 중복 할인혜택 적용 제외', '회원 추가 마일리지 적립 적용 제외', '상품쿠폰 할인/적립 혜택 적용 제외'].map(label => (
                                                    <label key={label} className="flex items-center gap-2 cursor-pointer">
                                                        <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" />
                                                        <span className="text-sm text-gray-600">{label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-32 bg-[#f9f9f9] p-3 text-sm font-bold text-gray-700 border-r border-gray-200 self-stretch flex items-center">제외 대상 선택</div>
                                            <div className="p-3 flex items-center gap-4">
                                                <RadioGroup name="exclusion_target" options={['전체회원', '특정회원등급']} defaultValue="전체회원" />
                                                <button type="button" className="px-2 py-1 bg-[#aeaeae] text-white text-xs rounded-sm">회원등급 선택</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                <input type="text" className="input input-sm h-8 w-32 border-gray-300 rounded-sm text-right" placeholder="0" />
                                <span className="ml-1 text-sm text-gray-600">원</span>
                            </div>
                            <div className="w-[120px] bg-[#f9f9f9] p-3 text-sm font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">매입가</div>
                            <div className="flex-1 p-2 flex items-center border-r border-gray-200">
                                <input type="text" className="input input-sm h-8 w-32 border-gray-300 rounded-sm text-right" placeholder="0" />
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
                                <input type="text" className="input input-sm h-8 w-32 border-gray-300 rounded-sm text-right" placeholder="0" />
                                <span className="ml-1 text-sm text-gray-600">원</span>
                            </div>
                            <div className="w-[120px] bg-[#f9f9f9] p-3 text-sm font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">공급가</div>
                            <div className="flex-1 p-2 flex items-center border-r border-gray-200">
                                <input type="text" className="input input-sm h-8 w-32 border-gray-300 rounded-sm text-right" placeholder="0" />
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

                {/* 12. 옵션/재고 설정 */}
                <Section title="옵션/재고 설정" isOpen={sections.option} onToggle={() => toggleSection('option')}>
                    <Row label="옵션 사용">
                        <RadioGroup name="option_usage" options={['사용함', '사용안함']} defaultValue="사용안함" />
                    </Row>
                </Section>

                {/* 13. 텍스트 옵션 / 추가상품 설정 */}
                <Section title="텍스트 옵션 / 추가상품 설정" isOpen={sections.text_option} onToggle={() => toggleSection('text_option')}>
                    <Row label="텍스트 옵션">
                        <RadioGroup name="text_option_usage" options={['사용함', '사용안함']} defaultValue="사용안함" />
                    </Row>
                     <Row label="추가상품" help>
                        <RadioGroup name="additional_product_usage" options={['사용함', '사용안함']} defaultValue="사용안함" />
                    </Row>
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

                    <Row label="이미지 저장소">
                        <div className="text-sm">
                            기본 경로 ( <label className="inline-flex items-center gap-1 cursor-pointer"><input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" /> <span>URL 직접입력 추가사용</span></label> )
                        </div>
                    </Row>
                    
                    <Row label="원본 이미지">
                        <div className="w-full py-2">
                             <label className="flex items-center gap-2 cursor-pointer mb-2">
                                <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-400 checked:bg-[#ff4d4f]" defaultChecked />
                                <span className="text-sm">체크시 개별이미지의 선택된 사이즈로 자동 리사이즈되어 등록됩니다.</span>
                            </label>
                            <div className="space-y-1.5 mb-2">
                                {originImages.map((img, index) => (
                                    <div key={img.id} className="flex gap-1">
                                        <input 
                                            type="file" 
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
                         {/* Editor Tabs */}
                        <div className="bg-[#f2f2f2] border-b border-gray-300 p-1 flex items-center justify-between">
                            <div className="flex">
                                <div className="bg-[#777] text-white text-xs px-3 py-2 font-bold cursor-pointer">PC쇼핑몰 상세 설명</div>
                                <div className="bg-[#f2f2f2] text-gray-500 text-xs px-3 py-2 border-r border-gray-300 cursor-pointer hover:bg-white">모바일쇼핑몰 상세 설명</div>
                            </div>
                            <label className="flex items-center gap-1 text-xs px-2">
                                <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-400 checked:bg-red-500" defaultChecked />
                                <span>PC/모바일 상세설명 동일사용</span>
                            </label>
                        </div>

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

                {/* 12. 관련상품 */}
                <Section title="관련상품" isOpen={sections.related} onToggle={() => toggleSection('related')}>
                    <Row label="관련상품 설정">
                        <div className="flex items-center gap-4">
                            <RadioGroup name="related_products" options={['사용안함', '자동(같은 카테고리 상품이 무작위로 보여짐)', '수동(아래 직접 선택등록)']} defaultValue="사용안함" />
                        </div>
                    </Row>
                </Section>



                 {/* 13. 상품이미지 돋보기 */}
                <Section title="상품이미지 돋보기" isOpen={sections.magnifier} onToggle={() => toggleSection('magnifier')}>
                     <Row label="사용상태">
                         <RadioGroup name="magnifier" options={['사용함', '사용안함']} defaultValue="사용안함" />
                    </Row>
                </Section>

                 {/* 14. 외부 동영상(YouTube) 등록 */}
                 <Section title="외부 동영상(YouTube) 등록" isOpen={sections.video} onToggle={() => toggleSection('video')}>
                     <Row label="사용상태">
                         <RadioGroup name="youtube_video" options={['사용함', '사용안함']} defaultValue="사용안함" />
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



                {/* 17. 관리자 메모 */}
                <Section title="관리자 메모" helpText="help" isOpen={sections.admin_memo} onToggle={() => toggleSection('admin_memo')}>
                    <Row label="관리자 메모">
                         <textarea className="w-full h-20 p-2 border border-gray-300 rounded-sm outline-none resize-none"></textarea>
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
                        // The brand.name in dummy data includes category path (e.g. Malbon Golf > Men...), 
                        // matching the user request to just "show popup like photo", but typically we might just want the brand name.
                        // For now we'll use the full string as user might expect.
                        // Or maybe just split ' > ' and take first part? 
                        // The screenshot shows 'brand name' column has 'Malbon Golf > ...'.
                        // I'll assume the input should show this selected Name.
                        setSelectedBrandName(brand.name);
                    }
                }}
            />

            <HSCodePopup
                isOpen={isHSCodePopupOpen}
                onClose={() => {
                    setIsHSCodePopupOpen(false);
                    setActiveHSCodeRowId(null);
                }}
                onConfirm={(code) => {
                    if (code) {
                        if (activeHSCodeRowId === null) {
                            setSelectedHSCode(code.code);
                        } else {
                            handleHSCodeRowChange(activeHSCodeRowId, 'code', code.code);
                        }
                    }
                    setActiveHSCodeRowId(null);
                }}
                country={activeHSCodeRowId === null ? "대한민국" : additionalHSCodes.find(r => r.id === activeHSCodeRowId)?.country || ""}
            />

            <MemberLevelPopup 
                isOpen={isMemberLevelPopupOpen}
                onClose={() => setIsMemberLevelPopupOpen(false)}
                onConfirm={(levels) => {
                    if (memberLevelPopupTarget === 'purchase') {
                        setSelectedMemberLevels(levels);
                    } else if (memberLevelPopupTarget === 'access') {
                        setSelectedAccessAuthMemberLevels(levels);
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

function Checkbox({ label }: { label: string }) {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
             <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300 text-blue-600" />
             <span className="text-sm text-gray-700">{label}</span>
        </label>
    );
}
