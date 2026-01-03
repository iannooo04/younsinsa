"use client";

import { useState } from "react";
import { HelpCircle, ChevronUp, ChevronDown, Check, X } from "lucide-react";

interface Props {
    brands: any[];
    categories: any[];
}

export default function ProductForm({ brands, categories }: Props) {
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

    const toggleSection = (key: keyof typeof sections) => {
        setSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="pb-20">
            {/* Top Header Actions */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">상품 등록</h2>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50 flex items-center gap-1">
                        <span className="text-gray-500">≡</span> 목록
                    </button>
                    <button className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50">
                        기존상품 복사
                    </button>
                    <button className="px-6 py-2 bg-[#ff4d4f] text-white text-sm font-bold hover:bg-[#ff3032]">
                        저장
                    </button>
                </div>
            </div>

            <form className="space-y-8 px-4">
                
                {/* 1. 카테고리 연결 */}
                <Section title="카테고리 연결" isOpen={sections.category} onToggle={() => toggleSection('category')} 
                    helpText="카테고리가 먼저 등록되어 있어야 카테고리 연결이 가능합니다."
                    extraLink={{ text: "카테고리 등록하기 >", href: "#" }}
                >
                    <div className="p-4 bg-white">
                        <div className="flex gap-2 h-48 mb-4">
                            {[1, 2, 3, 4].map((level) => (
                                <div key={level} className="flex-1 border border-gray-300 p-2 overflow-y-auto">
                                    <div className="text-gray-400 text-xs mb-2">=카테고리선택=</div>
                                    {/* Mock items for first column */}
                                    {level === 1 && (
                                        <ul className="text-sm space-y-1">
                                            <li className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 p-1">New Arrivals</li>
                                            <li className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 p-1">Best Sellers</li>
                                            <li className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 p-1">Outer</li>
                                            <li className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 p-1">Top</li>
                                        </ul>
                                    )}
                                </div>
                            ))}
                            <div className="flex flex-col justify-center px-4">
                                <button type="button" className="px-6 py-8 bg-[#555] text-white font-bold hover:bg-[#444]">
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
                     <div className="h-24 flex items-center justify-center text-gray-400 text-sm bg-white">
                        선택된 카테고리가 없습니다.
                    </div>
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
                        <Row label="공급사 구분">
                            <div className="flex items-center gap-4">
                                <RadioGroup name="supplier" options={['본사', '공급사']} defaultValue="본사" />
                                <button type="button" className="px-2 py-1 bg-gray-400 text-white text-xs rounded-sm">공급사 선택</button>
                            </div>
                        </Row>
                        <Row label="수수료" help>
                            <div className="flex items-center gap-2">
                                <input type="text" className="input input-sm h-8 w-24 border-gray-300 rounded-sm text-right" defaultValue="0.00" />
                                <span>%</span>
                            </div>
                        </Row>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <Row label="상품코드">
                            <span className="text-gray-500 text-sm">상품 등록시 자동 생성됩니다.</span>
                        </Row>
                         <Row label="자체 상품코드" help>
                             <div className="flex items-center w-full max-w-xs">
                                <input type="text" className="input input-sm h-8 w-full border-gray-300 rounded-sm" />
                                <span className="text-xs text-gray-400 ml-2">0 / 30</span>
                             </div>
                        </Row>
                    </div>

                    <Row label="상품명" required help>
                        <div className="space-y-3 w-full">
                            <RadioGroup name="name_type" options={['기본 상품명', '확장 상품명']} defaultValue="기본 상품명" />
                            <div className="bg-gray-50 p-3 border border-gray-200 rounded-sm">
                                <div className="grid grid-cols-[100px_1fr] items-center gap-4 mb-2">
                                    <span className="text-sm font-bold text-gray-700">기준몰 상품명</span>
                                    <div className="bg-gray-100 p-2 text-sm text-gray-400">입력된 상품명이 없습니다.</div>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                    <span className="text-sm font-bold text-gray-700">기본</span>
                                     <div className="flex items-center gap-2 w-full">
                                        <input type="text" name="name" className="input input-sm h-8 flex-1 border-gray-300 rounded-sm" required />
                                        <span className="text-xs text-gray-400">0 / 250</span>
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
                        <div className="flex items-center gap-2">
                            <input type="text" className="input input-sm h-8 w-32 border-gray-300 rounded-sm bg-gray-100" defaultValue="수기입력 가능" disabled />
                            <span className="text-gray-500">부터</span>
                        </div>
                    </Row>

                    <Row label="상품상태">
                        <RadioGroup name="condition" options={['신상품', '중고', '반품', '리퍼', '전시', '스크래치']} defaultValue="신상품" />
                    </Row>

                     <Row label="상품 대표색상">
                        <div className="flex gap-1">
                            {['#8B4513', '#FF0000', '#FFA500', '#FFD700', '#FFFF00', '#ADFF2F', '#008000', '#006400', '#87CEEB', '#0000FF', '#000080', '#FFC0CB', '#FFFFFF', '#D3D3D3', '#808080', '#000000'].map(color => (
                                <div key={color} className="w-6 h-6 border border-gray-300 cursor-pointer" style={{ backgroundColor: color }}></div>
                            ))}
                        </div>
                    </Row>
                </Section>

                {/* 5. 이미지 설정 */}
                <Section title="이미지 설정" isOpen={sections.image} onToggle={() => toggleSection('image')}>
                    <Row label="저장소 선택">
                        <div className="flex items-center gap-2">
                            <select className="select select-bordered select-sm h-8 rounded-sm">
                                <option>기본 경로</option>
                            </select>
                             <div className="text-xs text-gray-500 flex items-center gap-1">
                                <span className="font-bold bg-gray-400 text-white px-1 rounded-sm text-[10px]">!</span>
                                저장소 관리는 기본설정&gt;기본 정책&gt;파일 저장소 관리에서 가능합니다.
                            </div>
                        </div>
                    </Row>
                    {/* Simplified Image Uploader */}
                    <div className="p-4 bg-white border-b">
                         <div className="flex gap-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-24 h-24 border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 bg-gray-50 cursor-pointer hover:bg-gray-100">
                                    <span className="text-2xl">+</span>
                                    <span className="text-xs">이미지 {i}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* 6. 결제 정보 */}
                <Section title="결제 정보" isOpen={sections.payment} onToggle={() => toggleSection('payment')}>
                    <Row label="결제수단 설정">
                         <div className="space-y-4 py-2">
                            <div className="flex items-center gap-4">
                                <input type="radio" name="payment_method" className="radio radio-xs checked:bg-red-500 checkbox-accent" defaultChecked />
                                <span className="text-sm font-bold w-20">통합설정</span>
                                <span className="text-sm text-blue-600 cursor-pointer hover:underline">기본설정&gt;결제정책&gt;결제 수단 설정에서 설정한 기준에 따름</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <input type="radio" name="payment_method" className="radio radio-xs" />
                                <span className="text-sm text-gray-600 w-20">개별설정</span>
                                <span className="text-sm text-gray-600">이 상품의 구매 가능한 결제수단 기준을 따로 설정함</span>
                            </div>
                            <div className="text-xs text-gray-500 pt-2 border-t mt-2">
                                <p>상품의 개별결제수단을 설정하는 경우 선택된 결제수단으로만 상품 구매가 가능합니다.</p>
                                <p className="flex items-start gap-1 mt-1">
                                    <span className="font-bold bg-gray-400 text-white px-1 rounded-sm text-[10px]">!</span>
                                    신용카드 가맹점인 경우, 결제수단을 현금으로만 제한하는 것은 여신전문금융업법 위반이 되어 처벌 받을 수 있습니다.
                                </p>
                            </div>
                        </div>
                    </Row>
                </Section>

                {/* 7. 추가 정보 (New Section) */}
                <Section title="추가 정보" isOpen={sections.additional} onToggle={() => toggleSection('additional')}>
                    <Row label="접근 권한">
                         <div className="flex items-center gap-4 flex-wrap">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="access_auth" className="radio radio-xs checked:bg-red-500" defaultChecked />
                                <span className="text-sm">전체(회원+비회원)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="access_auth" className="radio radio-xs" />
                                <span className="text-sm">회원전용(비회원제외)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="access_auth" className="radio radio-xs" />
                                <span className="text-sm">특정회원등급</span>
                            </label>
                            <button type="button" className="px-2 py-1 bg-gray-400 text-white text-xs rounded-sm hover:bg-gray-500">회원등급 선택</button>
                            <label className="flex items-center gap-2 cursor-pointer ml-4">
                                <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-300" />
                                <span className="text-sm text-gray-500">접근불가 고객 상품 노출함</span>
                            </label>
                         </div>
                    </Row>
                    <Row label="추가항목" help>
                        <div className="w-full space-y-2">
                            <div className="flex items-center gap-2">
                                <button type="button" className="px-3 py-1 border border-gray-300 bg-white text-xs rounded-sm hover:bg-gray-50 flex items-center gap-1">
                                    <span className="text-gray-600 font-bold">+</span> 항목추가
                                </button>
                                <div className="text-xs text-gray-500 flex items-center gap-1 ml-2">
                                    <span className="font-bold bg-gray-500 text-white px-1 rounded-sm text-[10px]">!</span>
                                    상품특성에 맞게 항목을 추가할 수 있습니다 (예. 감독, 저자, 출판사, 유통사, 상품영문명 등)
                                </div>
                            </div>
                            
                            {/* Table Header like bar */}
                            <div className="w-full bg-[#bfbfbf] h-9 flex items-center text-white text-center text-xs mt-2">
                                <div className="w-20 border-r border-gray-400/30">순서</div>
                                <div className="w-48 border-r border-gray-400/30">항목</div>
                                <div className="flex-1 border-r border-gray-400/30">내용</div>
                                <div className="w-20">삭제</div>
                            </div>
                            {/* Placeholder for items if needed, empty for now as in new state */}
                        </div>
                    </Row>
                </Section>

                {/* 7. 상품 필수정보 */}
                <Section title="상품 필수정보" isOpen={sections.essential} onToggle={() => toggleSection('essential')}>
                    <div className="p-4 bg-white text-sm space-y-2 border-b">
                        <p className="text-red-500 font-bold flex items-center gap-1">
                             <span className="font-bold bg-red-500 text-white px-1 rounded-sm text-[10px]">!</span>
                             공정거래위원회에서 공고한 전자상거래법 상품정보제공 고시에 관한 내용을 필독해 주세요! <a href="#" className="underline">내용 확인 &gt;</a>
                        </p>
                    </div>
                    <Row label="필수정보 선택" help>
                        <button type="button" className="px-3 py-1 bg-gray-500 text-white text-xs rounded-sm hover:bg-gray-600">필수정보 선택</button>
                        <button type="button" className="px-3 py-1 bg-white border border-gray-300 text-xs rounded-sm ml-2 hover:bg-gray-50">+ 필수정보 추가</button>
                    </Row>
                    <Row label="KC인증 표시 여부">
                        <div className="space-y-2">
                            <RadioGroup name="kc_cert" options={['사용함', '사용안함']} defaultValue="사용안함" />
                            <div className="text-xs text-gray-500 flex items-start gap-1">
                                <span className="font-bold bg-gray-400 text-white px-1 rounded-sm text-[10px]">!</span>
                                <div>안전관리대상 제품은 안전인증 등의 표시(KC 인증마크 및 인증번호)를 소비자가 확인할 수 있도록... <a href="#" className="text-blue-600 underline">국가기술표준원</a>에서 확인하세요.</div>
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
                                <select className="select select-bordered select-xs w-16" defaultValue="10"><option>10</option></select>
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

                    <Row label="도서공연비 소득공제 상품 적용 여부">
                         <div className="space-y-1">
                             <RadioGroup name="culture_deduction" options={['미적용', '적용']} defaultValue="미적용" />
                             <div className="text-xs text-gray-500 flex items-start gap-1 mt-1">
                                <span className="font-bold bg-gray-400 text-white px-1 rounded-sm text-[10px]">!</span>
                                도서공연비 소득공제 대상 사업자로 계약이 되어있는 경우 '적용'으로 선택해주세요.
                            </div>
                        </div>
                    </Row>

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
                                <select className="select select-bordered select-xs w-24"><option>옵션기준</option></select>
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
                            <RadioGroup name="sales_period" options={['제한없음', '시작일 / 종료일']} defaultValue="제한없음" />
                             <input type="text" className="input input-sm h-8 w-40 border-gray-300 bg-gray-100 rounded-sm text-center text-xs" defaultValue="2026-01-04 00:00" disabled />
                             <span>~</span>
                             <input type="text" className="input input-sm h-8 w-40 border-gray-300 bg-gray-100 rounded-sm text-center text-xs" defaultValue="2026-01-10 23:59" disabled />
                             <div className="flex gap-0.5 ml-2">
                                {['오늘', '7일', '15일', '1개월', '3개월', '1년'].map(t => (
                                    <button key={t} type="button" className={`px-2 py-1 border border-gray-300 text-xs rounded-sm ${t === '7일' ? 'bg-[#555] text-white border-[#555]' : 'bg-white hover:bg-gray-50'}`}>{t}</button>
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

                {/* 9. 마일리지 설정 */}
                <Section title="마일리지 설정" isOpen={sections.mileage} onToggle={() => toggleSection('mileage')}>
                      <Row label="지급방법 선택">
                           <RadioGroup name="mileage_method" options={['통합설정', '개별설정']} defaultValue="통합설정" />
                      </Row>
                      <Row label="대상 선택">
                           <div className="flex items-center gap-2">
                                <RadioGroup name="mileage_target" options={['전체회원', '특정회원등급']} defaultValue="전체회원" />
                                <button disabled className="px-2 py-1 bg-gray-300 text-white text-xs rounded-sm cursor-not-allowed">회원등급 선택</button>
                           </div>
                      </Row>
                       <Row label="금액 설정">
                           <div className="text-sm">구매 금액의 0%를 마일리지로 지급</div>
                      </Row>
                      <div className="p-4 bg-white text-xs text-gray-500 space-y-1 border-b">
                         <p><span className="text-blue-600">통합설정 회원&gt;마일리지/예치금 관리&gt;마일리지 지급설정</span>에서 설정한 기준에 따름 : 구매 금액의 0%를 마일리지로 지급</p>
                          <div className="flex items-start gap-1">
                                <span className="font-bold bg-gray-400 text-white px-1 rounded-sm text-[10px]">!</span>
                                <div>구매금액 <span className="text-blue-600">회원&gt;마일리지/예치금 관리&gt;마일리지 기본설정</span>에서 설정한 기준에 따름 : 판매가</div>
                          </div>
                      </div>
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
                            <div className="flex gap-1 mb-2">
                                <button type="button" className="px-3 py-1 bg-[#aeaeae] text-white text-xs rounded-sm hover:bg-gray-500">찾아보기</button>
                                <input type="text" className="input input-sm h-7 w-64 border-gray-300 bg-gray-50" disabled />
                                <button type="button" className="px-3 py-1 border border-gray-300 bg-white text-xs rounded-sm hover:bg-gray-50 flex items-center gap-1">
                                    <span className="font-bold text-gray-500">+</span> 추가
                                </button>
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

                     <Row label="짧은 설명" help>
                        <div className="w-full space-y-2">
                             <div className="flex items-center gap-2">
                                <span className="text-xs font-bold w-12">기준몰</span>
                                <input type="text" className="input input-sm h-8 w-full border-gray-300 rounded-sm" />
                                <span className="text-xs text-gray-400 w-10 text-right">0 / 250</span>
                             </div>
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">🇨🇳</span>
                                <div className="flex-1 bg-gray-100 p-2 border border-gray-200">
                                     <label className="flex items-center gap-2">
                                         <input type="checkbox" className="checkbox checkbox-xs rounded-sm border-gray-400 checked:bg-red-500" defaultChecked />
                                         <span className="text-sm">기준몰 기본 상품명 공통사용</span>
                                     </label>
                                      <button className="bg-[#555] text-white text-xs px-2 py-0.5 ml-2">참고 번역</button>
                                </div>
                                <span className="text-xs text-gray-400 w-10 text-right">0 / 250</span>
                             </div>
                        </div>
                    </Row>
                    
                    <Row label="이벤트문구">
                        <div className="w-full space-y-1">
                             <input type="text" className="input input-sm h-8 w-full border-gray-300 rounded-sm" />
                             <span className="text-xs text-gray-400 block text-right">0 / 250</span>
                             <div className="text-xs text-gray-500 space-y-1 mt-2">
                                 <p>마케팅 제휴서비스 (네이버 쇼핑, 다음 쇼핑하우) 이용 시 공통으로 사용되는 항목입니다.</p>
                                 <a href="#" className="text-blue-600 underline block">네이버 쇼핑 설정 바로가기</a>
                                 <p>"마케팅&gt;네이버쇼핑 설정&gt;네이버쇼핑 이벤트 문구 설정&gt;상품별 문구 사용" 설정 후 사용하세요.</p>
                                 <div className="flex items-start gap-1">
                                    <span className="font-bold bg-gray-500 text-white px-1 rounded-sm text-[10px]">!</span>
                                    이벤트 문구(공통문구+상품별 문구)는 최대 100자까지 입력 가능합니다.
                                 </div>
                                 <a href="#" className="text-blue-600 underline block mt-2">다음 쇼핑하우 설정 바로가기</a>
                             </div>
                        </div>
                    </Row>

                    <div className="border-t border-gray-200">
                        {/* Editor Tabs & Toolbar Mock */}
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
                        
                        {/* Legacy Toolbar Visual Mock */}
                        <div className="bg-[#f0f0f0] border-b border-gray-300 p-1 flex items-center gap-1 flex-wrap">
                            <select className="select select-xs h-6 min-h-0 bg-white border border-gray-400 rounded-none text-xs w-16"><option>굴림</option></select>
                            <select className="select select-xs h-6 min-h-0 bg-white border border-gray-400 rounded-none text-xs w-12"><option>9pt</option></select>
                            <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                            {['B', 'I', 'U', 'S'].map(t => <button key={t} type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs font-bold hover:bg-gray-100">{t}</button>)}
                            <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                             {['Left', 'Center', 'Right', 'Justify'].map(t => <button key={t} type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100">≡</button>)}
                             <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                             <button type="button" className="px-2 h-6 bg-white border border-gray-300 text-xs flex items-center gap-1 hover:bg-gray-100">📷 사진</button>
                        </div>
                        
                        {/* Editor Content Area */}
                        <div className="relative">
                            <textarea className="w-full h-80 p-4 outline-none resize-none border-b border-gray-300" placeholder=""></textarea>
                            <div className="absolute bottom-0 w-full bg-[#f9f9f9] border-t border-gray-200 text-center py-1 cursor-ns-resize text-xs text-gray-400 hover:bg-gray-100">
                                ↕ 입력창 크기 조절
                            </div>
                            <div className="absolute bottom-1 right-1 flex">
                                 <button type="button" className="px-2 py-0.5 border border-gray-300 bg-white text-xs">Editor</button>
                                 <button type="button" className="px-2 py-0.5 border border-gray-300 bg-white text-xs">HTML</button>
                                 <button type="button" className="px-2 py-0.5 border border-gray-300 bg-white text-xs">TEXT</button>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 11. 배송 설정 */}
                <Section title="배송 설정" isOpen={sections.shipping} onToggle={() => toggleSection('shipping')}>
                    <Row label="배송비 선택" help>
                        <div className="flex items-center gap-2">
                            <button type="button" className="px-2 py-1 bg-[#aeaeae] text-white text-xs rounded-sm">배송비 선택</button>
                            <span className="text-sm">선택된 배송비 : 기본 - 금액별배송비 (택배)</span>
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
                                
                                <button type="button" className="px-2 py-1 bg-[#aeaeae] text-white text-xs rounded-sm">선택</button>
                                <span className="text-sm text-gray-600">선택된 배송안내 : 배송안내 - 기본</span>
                            </div>

                            {/* Editor Mock */}
                            <div className="border border-gray-300">
                                {/* Toolbar */}
                                <div className="bg-[#f0f0f0] border-b border-gray-300 p-1 flex items-center gap-1 flex-wrap">
                                    <select className="select select-xs h-6 min-h-0 bg-white border border-gray-400 rounded-none text-xs w-16"><option>굴림</option></select>
                                    <select className="select select-xs h-6 min-h-0 bg-white border border-gray-400 rounded-none text-xs w-12"><option>9pt</option></select>
                                    <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                    {['가', '가', '가', '가'].map((t, i) => <button key={i} type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs text-gray-600 hover:bg-gray-100">{t}</button>)}
                                    <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                     <button type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100 flex items-center justify-center text-red-500 font-bold">A</button>
                                     <button type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100 flex items-center justify-center">가</button>
                                     <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                     {['Left', 'Center', 'Right', 'Justify'].map(t => <button key={t} type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100">≡</button>)}
                                     <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                     <button type="button" className="px-2 h-6 bg-white border border-gray-300 text-xs flex items-center gap-1 hover:bg-gray-100 ml-auto">📷 사진</button>
                                </div>
                                
                                {/* Content */}
                                <div className="relative">
                                    <textarea 
                                        className="w-full h-64 p-4 outline-none resize-none text-xs leading-relaxed text-gray-800 font-sans" 
                                        defaultValue={`- 배송비 : 기본배송료는 2,500원 입니다. (도서,산간,오지 일부지역은 배송비가 추가될 수 있습니다) 50,000원 이상 구매시 무료배송입니다.
- 본 상품의 평균 배송일은 0일입니다.(입금 확인 후) 설치 상품의 경우 다소 늦어질 수 있습니다.[배송예정일은 주문시점(주문순서)에 따른 유동성이 발생하므로 평균 배송일과는 차이가 발생할 수 있습니다.]
- 본 상품의 배송 가능일은 0일 입니다. 배송 가능일이란 본 상품을 주문 하신 고객님들께 상품 배송이 가능한 기간을 의미합니다. (단, 연휴 및 공휴일은 기간 계산시 제외하며 현금 주문일 경우 입금일 기준 입니다.)`}
                                    ></textarea>
                                    
                                     {/* Resize Handle Overlay */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#fffce5] border border-gray-300 px-3 py-1 text-[11px] text-gray-600 shadow-sm flex items-center gap-2">
                                        아래 영역을 드래그하여 입력창 크기를 조절할 수 있습니다.
                                        <button className="text-gray-400 hover:text-gray-600"><X size={12}/></button>
                                    </div>

                                    {/* Bottom Bar */}
                                     <div className="bg-[#f2f2f2] border-t border-gray-300 flex justify-between items-center h-6 px-1">
                                        <div className="flex-1 text-center cursor-ns-resize">
                                             <span className="text-[10px] text-gray-500">↕ 입력창 크기조절</span>
                                        </div>
                                        <div className="flex bg-white border border-gray-300">
                                            <button type="button" className="px-2 py-0.5 text-[10px] bg-gray-100 font-bold border-r border-gray-300">Editor</button>
                                            <button type="button" className="px-2 py-0.5 text-[10px] border-r border-gray-300">HTML</button>
                                            <button type="button" className="px-2 py-0.5 text-[10px]">TEXT</button>
                                        </div>
                                     </div>
                                </div>
                            </div>
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
                                
                                <button type="button" className="px-2 py-1 bg-[#aeaeae] text-white text-xs rounded-sm">선택</button>
                                <span className="text-sm text-gray-600">선택된 AS안내 : AS안내 - 기본</span>
                            </div>

                            {/* Editor Mock */}
                            <div className="border border-gray-300">
                                {/* Toolbar */}
                                <div className="bg-[#f0f0f0] border-b border-gray-300 p-1 flex items-center gap-1 flex-wrap">
                                    <select className="select select-xs h-6 min-h-0 bg-white border border-gray-400 rounded-none text-xs w-16"><option>굴림</option></select>
                                    <select className="select select-xs h-6 min-h-0 bg-white border border-gray-400 rounded-none text-xs w-12"><option>9pt</option></select>
                                    <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                    {['가', '가', '가', '가'].map((t, i) => <button key={i} type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs text-gray-600 hover:bg-gray-100">{t}</button>)}
                                    <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                     <button type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100 flex items-center justify-center text-red-500 font-bold">A</button>
                                     <button type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100 flex items-center justify-center">가</button>
                                     <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                     {['Left', 'Center', 'Right', 'Justify'].map(t => <button key={t} type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100">≡</button>)}
                                     <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                     <button type="button" className="px-2 h-6 bg-white border border-gray-300 text-xs flex items-center gap-1 hover:bg-gray-100 ml-auto">📷 사진</button>
                                </div>
                                
                                {/* Content */}
                                <div className="relative">
                                    <textarea 
                                        className="w-full h-64 p-4 outline-none resize-none text-xs leading-relaxed text-gray-800 font-sans" 
                                        defaultValue={`- 소비자분쟁해결 기준(공정거래위원회 고시)에 따라 피해를 보상받을 수 있습니다.
- A/S는 판매자에게 문의하시기 바랍니다.`}
                                    ></textarea>
                                    
                                     {/* Resize Handle Overlay */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#fffce5] border border-gray-300 px-3 py-1 text-[11px] text-gray-600 shadow-sm flex items-center gap-2">
                                        아래 영역을 드래그하여 입력창 크기를 조절할 수 있습니다.
                                        <button className="text-gray-400 hover:text-gray-600"><X size={12}/></button>
                                    </div>

                                    {/* Bottom Bar */}
                                     <div className="bg-[#f2f2f2] border-t border-gray-300 flex justify-between items-center h-6 px-1">
                                        <div className="flex-1 text-center cursor-ns-resize">
                                             <span className="text-[10px] text-gray-500">↕ 입력창 크기조절</span>
                                        </div>
                                        <div className="flex bg-white border border-gray-300">
                                            <button type="button" className="px-2 py-0.5 text-[10px] bg-gray-100 font-bold border-r border-gray-300">Editor</button>
                                            <button type="button" className="px-2 py-0.5 text-[10px] border-r border-gray-300">HTML</button>
                                            <button type="button" className="px-2 py-0.5 text-[10px]">TEXT</button>
                                        </div>
                                     </div>
                                </div>
                            </div>
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
                                
                                <button type="button" className="px-2 py-1 bg-[#aeaeae] text-white text-xs rounded-sm">선택</button>
                                <span className="text-sm text-gray-600">선택된 환불안내 : 환불안내 - 기본</span>
                            </div>

                            {/* Editor Mock */}
                            <div className="border border-gray-300">
                                {/* Toolbar */}
                                <div className="bg-[#f0f0f0] border-b border-gray-300 p-1 flex items-center gap-1 flex-wrap">
                                    <select className="select select-xs h-6 min-h-0 bg-white border border-gray-400 rounded-none text-xs w-16"><option>굴림</option></select>
                                    <select className="select select-xs h-6 min-h-0 bg-white border border-gray-400 rounded-none text-xs w-12"><option>9pt</option></select>
                                    <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                    {['가', '가', '가', '가'].map((t, i) => <button key={i} type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs text-gray-600 hover:bg-gray-100">{t}</button>)}
                                    <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                     <button type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100 flex items-center justify-center text-red-500 font-bold">A</button>
                                     <button type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100 flex items-center justify-center">가</button>
                                     <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                     {['Left', 'Center', 'Right', 'Justify'].map(t => <button key={t} type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100">≡</button>)}
                                     <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                     <button type="button" className="px-2 h-6 bg-white border border-gray-300 text-xs flex items-center gap-1 hover:bg-gray-100 ml-auto">📷 사진</button>
                                </div>
                                
                                {/* Content */}
                                <div className="relative">
                                    <textarea 
                                        className="w-full h-64 p-4 outline-none resize-none text-xs leading-relaxed text-gray-800 font-sans" 
                                        defaultValue={`- 상품 청약철회 가능기간은 상품 수령일로 부터 7일 이내 입니다.`}
                                    ></textarea>
                                    
                                     {/* Resize Handle Overlay */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#fffce5] border border-gray-300 px-3 py-1 text-[11px] text-gray-600 shadow-sm flex items-center gap-2">
                                        아래 영역을 드래그하여 입력창 크기를 조절할 수 있습니다.
                                        <button className="text-gray-400 hover:text-gray-600"><X size={12}/></button>
                                    </div>

                                    {/* Bottom Bar */}
                                     <div className="bg-[#f2f2f2] border-t border-gray-300 flex justify-between items-center h-6 px-1">
                                        <div className="flex-1 text-center cursor-ns-resize">
                                             <span className="text-[10px] text-gray-500">↕ 입력창 크기조절</span>
                                        </div>
                                        <div className="flex bg-white border border-gray-300">
                                            <button type="button" className="px-2 py-0.5 text-[10px] bg-gray-100 font-bold border-r border-gray-300">Editor</button>
                                            <button type="button" className="px-2 py-0.5 text-[10px] border-r border-gray-300">HTML</button>
                                            <button type="button" className="px-2 py-0.5 text-[10px]">TEXT</button>
                                        </div>
                                     </div>
                                </div>
                            </div>
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
                                
                                <button type="button" className="px-2 py-1 bg-[#aeaeae] text-white text-xs rounded-sm">선택</button>
                                <span className="text-sm text-gray-600">선택된 교환안내 : 교환안내 - 기본</span>
                            </div>

                            {/* Editor Mock */}
                            <div className="border border-gray-300">
                                {/* Toolbar */}
                                <div className="bg-[#f0f0f0] border-b border-gray-300 p-1 flex items-center gap-1 flex-wrap">
                                    <select className="select select-xs h-6 min-h-0 bg-white border border-gray-400 rounded-none text-xs w-16"><option>굴림</option></select>
                                    <select className="select select-xs h-6 min-h-0 bg-white border border-gray-400 rounded-none text-xs w-12"><option>9pt</option></select>
                                    <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                    {['가', '가', '가', '가'].map((t, i) => <button key={i} type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs text-gray-600 hover:bg-gray-100">{t}</button>)}
                                    <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                     <button type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100 flex items-center justify-center text-red-500 font-bold">A</button>
                                     <button type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100 flex items-center justify-center">가</button>
                                     <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                     {['Left', 'Center', 'Right', 'Justify'].map(t => <button key={t} type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100">≡</button>)}
                                     <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                                     <button type="button" className="px-2 h-6 bg-white border border-gray-300 text-xs flex items-center gap-1 hover:bg-gray-100 ml-auto">📷 사진</button>
                                </div>
                                
                                {/* Content */}
                                <div className="relative">
                                    <textarea 
                                        className="w-full h-64 p-4 outline-none resize-none text-xs leading-relaxed text-gray-800 font-sans" 
                                        defaultValue={`- 상품 택(tag)제거 또는 개봉으로 상품 가치 훼손 시에는 상품수령후 7일 이내라도 교환 및 반품이 불가능합니다.
- 저단가 상품, 일부 특가 상품은 고객 변심에 의한 교환, 반품은 고객께서 배송비를 부담하셔야 합니다(제품의 하자,배송오류는 제외)
- 일부 상품은 신모델 출시, 부품가격 변동 등 제조사 사정으로 가격이 변동될 수 있습니다.
- 신발의 경우, 실외에서 착화하였거나 사용흔적이 있는 경우에는 교환/반품 기간내라도 교환 및 반품이 불가능 합니다.
- 수제화 중 개별 주문제작상품(굽높이,발볼,사이즈 변경)의 경우에는 제작완료, 인수 후에는 교환/반품기간내라도 교환 및 반품이 불가능 합니다.
- 수입,명품 제품의 경우, 제품 및 본 상품의 박스 훼손, 분실 등으로 인한 상품 가치 훼손 시 교환 및 반품이 불가능 하오니, 양해 바랍니다.
- 일부 특가 상품의 경우, 인수 후에는 제품 하자나 오배송의 경우를 제외한 고객님의 단순변심에 의한 교환, 반품이 불가능할 수 있사오니, 각 상품의 상품상세정보를 꼭 참조하십시오.`}
                                    ></textarea>
                                    
                                     {/* Resize Handle Overlay */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#fffce5] border border-gray-300 px-3 py-1 text-[11px] text-gray-600 shadow-sm flex items-center gap-2">
                                        아래 영역을 드래그하여 입력창 크기를 조절할 수 있습니다.
                                        <button className="text-gray-400 hover:text-gray-600"><X size={12}/></button>
                                    </div>

                                    {/* Bottom Bar */}
                                     <div className="bg-[#f2f2f2] border-t border-gray-300 flex justify-between items-center h-6 px-1">
                                        <div className="flex-1 text-center cursor-ns-resize">
                                             <span className="text-[10px] text-gray-500">↕ 입력창 크기조절</span>
                                        </div>
                                        <div className="flex bg-white border border-gray-300">
                                            <button type="button" className="px-2 py-0.5 text-[10px] bg-gray-100 font-bold border-r border-gray-300">Editor</button>
                                            <button type="button" className="px-2 py-0.5 text-[10px] border-r border-gray-300">HTML</button>
                                            <button type="button" className="px-2 py-0.5 text-[10px]">TEXT</button>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Section>

                {/* 16. 상품 개별 SEO 태그 설정 */}
                <Section title="상품 개별 SEO 태그 설정" helpText="help" isOpen={sections.seo} onToggle={() => toggleSection('seo')}>
                    <Row label="개별 설정 사용여부">
                        <div className="space-y-2 py-2">
                             <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="seo_usage" value="used" className="radio radio-xs border-gray-300" />
                                    <span className="text-sm text-gray-700">사용함</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="seo_usage" value="unused" className="radio radio-xs checked:bg-[#ff4d4f] border-gray-300" defaultChecked />
                                    <span className="text-sm text-gray-700">사용안함</span>
                                </label>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                 <div className="flex items-start gap-1">
                                    <span className="font-bold bg-[#333] text-white px-1 rounded-sm text-[10px] mt-0.5 min-w-[14px] text-center">!</span>
                                    <div>‘사용함’ 선택 시 기본설정 &gt; 검색엔진 최적화(SEO) 설정보다 개별 설정이 우선적으로 적용됩니다.</div>
                                 </div>
                                 <div className="pl-5">설정 결과는 검색 엔진에 따라 평균 2주 ~ 3주 후에 반영될 수 있습니다.</div>
                            </div>
                        </div>
                    </Row>
                    <Row label="타이틀 (Title)">
                        <input type="text" className="input input-sm w-full border-gray-300 rounded-sm bg-white" />
                    </Row>
                    <Row label="메타태그 작성자 (Author)">
                         <input type="text" className="input input-sm w-full border-gray-300 rounded-sm bg-white" />
                    </Row>
                    <Row label="메타태그 설명 (Description)">
                         <input type="text" className="input input-sm w-full border-gray-300 rounded-sm bg-white" />
                    </Row>
                    <Row label="메타태그 키워드 (Keywords)">
                         <input type="text" className="input input-sm w-full border-gray-300 rounded-sm bg-white" />
                    </Row>
                </Section>

                {/* 17. 관리자 메모 */}
                <Section title="관리자 메모" helpText="help" isOpen={sections.admin_memo} onToggle={() => toggleSection('admin_memo')}>
                    <Row label="관리자 메모">
                         <textarea className="w-full h-20 p-2 border border-gray-300 rounded-sm outline-none resize-none"></textarea>
                    </Row>
                </Section>

            </form>
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
