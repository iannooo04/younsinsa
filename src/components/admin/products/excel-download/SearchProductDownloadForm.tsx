"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { HelpCircle, FileSpreadsheet } from "lucide-react";
import SupplierPopup from "@/components/admin/SupplierPopup";

interface Field {
  label: string;
  name: string;
}

const FIELDS: Field[] = [
  { label: "상품번호", name: "goods_no" },
  { label: "상품명_기본", name: "goods_name" },
  { label: "수수료", name: "commission" },
  { label: "자체상품코드", name: "goods_cd" },
  { label: "상품명_메인", name: "name_main" },
  { label: "상품명_리스트", name: "name_list" },
  { label: "상품명_상세", name: "name_detail" },
  { label: "상품명_제휴", name: "name_partner" },
  { label: "상품명_영문몰", name: "global_data_2_goodsnm" },
  { label: "상품명_중문몰", name: "global_data_3_goodsnm" },
  { label: "상품명_일문몰", name: "global_data_4_goodsnm" },
  { label: "검색 키워드", name: "search_word" },
  { label: "상품 노출 시간", name: "goods_open_dt" },
  { label: "상품 상태", name: "goods_state" },
  { label: "상품 대표색상", name: "goods_color" },
  { label: "결제 수단 설정", name: "pay_limit_fl" },
  { label: "사용가능 결제수단", name: "pay_limit" },
  { label: "모델번호", name: "model_no" },
  { label: "카테고리 코드", name: "category_code" },
  { label: "매입처 상품명", name: "purchase_goods_name" },
  { label: "브랜드 코드", name: "brand_code" },
  { label: "제조사", name: "maker_name" },
  { label: "원산지", name: "origin_name" },
  { label: "제조일", name: "make_date" },
  { label: "출시일", name: "launch_date" },
  { label: "유효일자 시작일", name: "effective_start_ymd" },
  { label: "유효일자 종료일", name: "effective_end_ymd" },
  { label: "구매가능 회원등급 설정", name: "goods_permission" },
  { label: "구매가능 회원등급", name: "goods_permission_group" },
  { label: "구매불가 고객 가격 대체문구 사용", name: "goods_permission_price_string_fl" },
  { label: "구매불가 고객 가격 대체문구", name: "goods_permission_price_string" },
  { label: "성인인증 여부", name: "only_adult_fl" },
  { label: "미인증 고객 상품 노출함", name: "only_adult_display_fl" },
  { label: "미인증 고객 상품 이미지 노출함", name: "only_adult_image_fl" },
  { label: "접근권한 회원등급 설정", name: "goods_access" },
  { label: "접근권한 회원등급", name: "goods_access_group" },
  { label: "접근불가 고객 상품 노출함", name: "goods_access_display_fl" },
  { label: "추가항목", name: "add_info" },
  { label: "상품필수정보", name: "goods_must_info" },
  { label: "KC인증 표시여부", name: "kcmark_fl" },
  { label: "KC인증 구분", name: "kcmark_div_fl" },
  { label: "KC인증 번호", name: "kcmark_no" },
  { label: "KC인증일자", name: "kcmark_dt" },
  { label: "아이콘 기간 (시작)", name: "icon_start" },
  { label: "아이콘 기간 (끝)", name: "icon_end" },
  { label: "아이콘 코드", name: "icon_period" },
  { label: "아이콘 코드", name: "icon_code" },
  { label: "무게", name: "weight" },
  { label: "용량", name: "volume" },
  { label: "재고 설정", name: "stock_type" },
  { label: "마일리지 정책", name: "mileage_type" },
  { label: "마일리지 지급대상", name: "mileage_group" },
  { label: "마일리지 지급 회원등급", name: "mileage_group_info" },
  { label: "상품 개별 마일리지", name: "mileage_goods" },
  { label: "상품 개별 마일리지 단위", name: "mileage_goods_unit" },
  { label: "상품 할인설정 사용 여부", name: "goods_discount_fl" },
  { label: "상품 할인가", name: "goods_discount" },
  { label: "상품 할인가 단위", name: "goods_discount_unit" },
  { label: "묶음주문기준", name: "fixed_sales" },
  { label: "묶음주문단위", name: "sales_unit" },
  { label: "품절 설정", name: "soldout_yn" },
  { label: "과세/면세", name: "tax_free_type" },
  { label: "과세율", name: "tax_percent" },
  { label: "PC 노출 여부", name: "display_pc_yn" },
  { label: "모바일 노출 여부", name: "display_mobile_yn" },
  { label: "PC 판매 여부", name: "sell_pc_yn" },
  { label: "모바일 판매 여부", name: "sell_mobile_yn" },
  { label: "배송비 고유번호", name: "deliverySno" },
  { label: "가격대체 문구", name: "goods_price_string" },
  { label: "구매수량기준", name: "fixed_cnt" },
  { label: "최소 구매 수량", name: "min_cnt" },
  { label: "최대 구매 수량", name: "max_cnt" },
  { label: "상품판매기간 시작일", name: "sales_start_ymd" },
  { label: "상품판매기간 종료일", name: "sales_end_ymd" },
  { label: "도서공연비 소득공제 상품 적용 여부", name: "culture_benefit_fl" },
  { label: "외부동영상 연동 여부", name: "external_video_fl" },
  { label: "외부동영상 주소", name: "external_video_url" },
  { label: "외부동영상 너비", name: "external_video_width" },
  { label: "외부동영상 높이", name: "external_video_height" },
  { label: "판매가", name: "goods_price" },
  { label: "정가", name: "fixed_price" },
  { label: "매입가", name: "cost_price" },
  { label: "옵션 사용 여부", name: "option_yn" },
  { label: "옵션 표시 방법", name: "option_display" },
  { label: "옵션명", name: "option_name" },
  { label: "옵션값", name: "option_value" },
  { label: "옵션이미지", name: "option_image" },
  { label: "옵션매입가격", name: "option_cost_price" },
  { label: "옵션가격", name: "option_price" },
  { label: "재고", name: "stock_cnt" },
  { label: "옵션 노출여부", name: "option_view_fl" },
  { label: "옵션 품절여부", name: "option_sell_fl" },
  { label: "옵션 배송상태", name: "option_delivery_fl" },
  { label: "자체옵션코드", name: "option_code" },
  { label: "옵션 메모", name: "option_memo" },
  { label: "텍스트 옵션 사용여부", name: "text_option_yn" },
  { label: "텍스트 옵션", name: "text_option" },
  { label: "배송일정 사용여부", name: "delivery_schedule_yn" },
  { label: "배송일정", name: "delivery_schedule" },
  { label: "관련상품", name: "relation_yn" },
  { label: "관련상품 서로 등록 여부", name: "relation_same_fl" },
  { label: "관련상품 코드", name: "relation_code" },
  { label: "관련상품 노출기간", name: "relation_goods_date" },
  { label: "관련상품 서로등록 상품코드", name: "relation_goods_each" },
  { label: "추가상품 사용여부", name: "add_goods_fl" },
  { label: "추가상품 설정", name: "add_goods" },
  { label: "이미지 돋보기 사용여부", name: "imgDetail_view_fl" },
  { label: "이미지 저장소", name: "image_storage" },
  { label: "이미지 경로", name: "image_path" },
  { label: "이미지명", name: "image_name" },
  { label: "짧은 설명", name: "short_desc" },
  { label: "짧은_설명_영문몰", name: "global_data_2_short_description" },
  { label: "짧은_설명_중문몰", name: "global_data_3_short_description" },
  { label: "짧은_설명_일문몰", name: "global_data_4_short_description" },
  { label: "이벤트 문구", name: "event_description" },
  { label: "PC쇼핑몰 상세 설명", name: "goods_desc_pc" },
  { label: "모바일쇼핑몰 상세 설명", name: "goods_desc_mobile" },
  { label: "PC/모바일 상세설명 동일 사용 여부", name: "goods_desc_same_flag" },
  { label: "쇼핑하우 노출여부", name: "daum_flag" },
  { label: "네이버쇼핑 노출여부", name: "naver_flag" },
  { label: "수입 및 제작 여부", name: "naver_import_flag" },
  { label: "판매 방식 구분", name: "naver_product_flag" },
  { label: "월 렌탈료", name: "naver_product_monthly_rental_pay" },
  { label: "총 렌탈료", name: "naver_product_total_rental_pay" },
  { label: "렌탈계약기간", name: "naver_product_flag_rental_period" },
  { label: "주요사용연령대", name: "naver_age_group" },
  { label: "주요사용성별", name: "naver_gender" },
  { label: "검색태그", name: "naver_tag" },
  { label: "속성정보", name: "naver_attribute" },
  { label: "네이버카테고리ID", name: "naver_category" },
  { label: "가격비교페이지ID", name: "naver_product_id" },
  { label: "네이버페이 사용가능 표시", name: "naver_npay_able" },
  { label: "네이버페이 적립가능 표시", name: "naver_npay_acum_able" },
  { label: "브랜드 인증 상품 여부", name: "naver_brand_certification" },
  { label: "네이버쇼핑 도서 노출여부", name: "naverbook_flag" },
  { label: "ISBN코드", name: "isbn" },
  { label: "도서 상품 타입", name: "goods_type" },
  { label: "배송 안내 입력선택", name: "detail_delivery_fl" },
  { label: "배송 안내", name: "detail_delivery" },
  { label: "AS 안내 입력선택", name: "detail_as_fl" },
  { label: "AS 안내", name: "detail_as" },
  { label: "환불 안내 입력선택", name: "detail_refund_fl" },
  { label: "환불 안내", name: "detail_refund" },
  { label: "교환 안내 입력선택", name: "detail_exchange_fl" },
  { label: "교환 안내", name: "detail_exchange" },
  { label: "상품 관리 메모", name: "memo" },
  { label: "HS 코드", name: "hscode" },
  { label: "상품 개별 SEO 설정 사용여부", name: "seo_tag_fl" },
  { label: "타이틀", name: "set_tag_title" },
  { label: "메타태그 작성자", name: "set_tag_author" },
  { label: "메타태그 설명", name: "set_tag_description" },
  { label: "메타태그 키워드", name: "set_tag_keyword" },
  { label: "메타 FBE 피드 설정", name: "fb_vn" },
  { label: "메타 FBE 피드 이미지", name: "fb_image_name" },
  { label: "구글 쇼핑 노출여부", name: "google_use_flag" },
];

export default function SearchProductDownloadForm() {
  const [supplierType, setSupplierType] = useState<"head" | "supplier">("head");
  const [selectedSupplier, setSelectedSupplier] = useState<{ id: string; name: string } | null>(null);
  const [isSupplierPopupOpen, setIsSupplierPopupOpen] = useState(false);
  const [optionYn, setOptionYn] = useState("all");
  const [addGoodsYn, setAddGoodsYn] = useState("all");
  const [displayYn, setDisplayYn] = useState("all");
  const [mileagePolicy, setMileagePolicy] = useState("all");
  const [textOptionYn, setTextOptionYn] = useState("all");
  const [sellYn, setSellYn] = useState("all");
  const [downloadRange, setDownloadRange] = useState("partial");
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeCount, setRangeCount] = useState(100);
  const [selectedFields, setSelectedFields] = useState<Set<string>>(new Set(FIELDS.map(f => f.name))); // Select all by default

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFields(new Set(FIELDS.map(f => f.name)));
    } else {
      setSelectedFields(new Set());
    }
  };

  const handleFieldToggle = (name: string) => {
    const newSelected = new Set(selectedFields);
    if (newSelected.has(name)) {
      newSelected.delete(name);
    } else {
      newSelected.add(name);
    }
    setSelectedFields(newSelected);
  };

  const FieldRow = ({ fields }: { fields: (Field | undefined)[] }) => {
    return (
      <div className="flex border-b border-gray-200">
        {fields.map((field, idx) => (
          <React.Fragment key={idx}>
            {field ? (
              <>
                <div className="w-10 flex items-center justify-center border-r border-gray-200">
                  <Checkbox 
                    checked={selectedFields.has(field.name)}
                    onCheckedChange={() => handleFieldToggle(field.name)}
                    className="rounded-[2px]"
                  />
                </div>
                <div className="flex-1 bg-gray-50 flex items-center px-4 border-r border-gray-200 text-gray-700 text-xs">
                  {field.label}
                </div>
                <div className="flex-1 flex items-center px-4 border-r border-gray-200 text-gray-800 text-xs text-left">
                  {field.name}
                </div>
              </>
            ) : (
             <div className="flex-[3] border-r border-gray-200 bg-gray-50" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Chunk fields into groups of 3 for the grid layout
  const fieldRows = [];
  for (let i = 0; i < FIELDS.length; i += 3) {
    fieldRows.push([FIELDS[i], FIELDS[i+1], FIELDS[i+2]]);
  }

  return (
    <div>
        <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-bold text-gray-700">상품 검색과 원하는 항목체크 후 다운로드 받기</h3>
            <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border border-gray-300 border-b-0 text-xs">
            {/* Download Button Row */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    다운로드
                </div>
                <div className="flex-1 p-2">
                    <Button 
                        variant="outline" size="sm" 
                        className="h-8 bg-white border-gray-300 hover:bg-gray-50 text-green-600 font-bold flex items-center gap-1.5 px-3"
                    >
                        <div className="bg-green-600 text-white p-0.5 rounded-[2px]">
                            <FileSpreadsheet className="w-3 h-3 text-white fill-current" />
                        </div>
                        엑셀 다운로드
                    </Button>
                </div>
            </div>

            {/* Supplier Row */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    공급사 구분
                </div>
                <div className="flex-1 p-2 flex items-center">
                    <RadioGroup 
                        value={supplierType} 
                        onValueChange={(v) => {
                            const newVal = v as "head" | "supplier";
                            setSupplierType(newVal);
                            if (newVal === "supplier") {
                                setIsSupplierPopupOpen(true);
                            }
                        }}
                        className="flex gap-6 items-center"
                    >
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="head" id="s-head" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="s-head" className="text-gray-700 font-normal cursor-pointer">본사</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="supplier" id="s-supplier" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="s-supplier" className="text-gray-700 font-normal cursor-pointer">공급사</Label>
                            <div className="flex items-center gap-2 ml-2">
                                <div className="h-7 px-2 flex items-center border border-gray-300 bg-white min-w-[100px]">
                                    {selectedSupplier?.name || "선택된 공급사 없음"}
                                </div>
                                <Button 
                                    variant="secondary" 
                                    className="h-6 text-[11px] bg-gray-700 text-white hover:bg-gray-600 rounded-sm px-2"
                                    onClick={() => setIsSupplierPopupOpen(true)}
                                >
                                    공급사 선택
                                </Button>
                            </div>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            {/* Search Keyword */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    검색어
                </div>
                <div className="flex-1 p-2 flex items-center gap-1">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-32 h-8 text-xs border-gray-300">
                            <SelectValue placeholder="=통합검색=" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">=통합검색=</SelectItem>
                            <SelectItem value="name">상품명</SelectItem>
                            <SelectItem value="code">상품코드</SelectItem>
                            <SelectItem value="own_code">자체상품코드</SelectItem>
                            <SelectItem value="keyword">검색 키워드</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input className="w-64 h-8 text-xs border-gray-300" />
                </div>
            </div>

            {/* Category Select */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    분류선택
                </div>
                <div className="flex-1 p-2 flex items-center gap-1">
                     <Select><SelectTrigger className="w-32 h-8 text-xs border-gray-300"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger><SelectContent><SelectItem value="all">=카테고리선택=</SelectItem></SelectContent></Select>
                     <Select><SelectTrigger className="w-32 h-8 text-xs border-gray-300"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger><SelectContent><SelectItem value="all">=카테고리선택=</SelectItem></SelectContent></Select>
                     <Select><SelectTrigger className="w-32 h-8 text-xs border-gray-300"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger><SelectContent><SelectItem value="all">=카테고리선택=</SelectItem></SelectContent></Select>
                     <Select><SelectTrigger className="w-32 h-8 text-xs border-gray-300"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger><SelectContent><SelectItem value="all">=카테고리선택=</SelectItem></SelectContent></Select>
                </div>
            </div>

            {/* Brand Select */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    브랜드 선택
                </div>
                <div className="flex-1 p-2 flex items-center gap-1">
                      <Select><SelectTrigger className="w-32 h-8 text-xs border-gray-300"><SelectValue placeholder="=브랜드선택=" /></SelectTrigger><SelectContent><SelectItem value="all">=브랜드선택=</SelectItem></SelectContent></Select>
                      <Select><SelectTrigger className="w-32 h-8 text-xs border-gray-300"><SelectValue placeholder="=브랜드선택=" /></SelectTrigger><SelectContent><SelectItem value="all">=브랜드선택=</SelectItem></SelectContent></Select>
                      <Select><SelectTrigger className="w-32 h-8 text-xs border-gray-300"><SelectValue placeholder="=브랜드선택=" /></SelectTrigger><SelectContent><SelectItem value="all">=브랜드선택=</SelectItem></SelectContent></Select>
                </div>
            </div>

            {/* Price & Mileage (Double Column Row) */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    상품가격
                </div>
                <div className="flex-1 p-2 flex items-center gap-1 border-r border-gray-200">
                    <Input className="w-24 h-8 text-xs border-gray-300" />
                    <span>원 ~</span>
                    <Input className="w-24 h-8 text-xs border-gray-300" />
                    <span>원</span>
                </div>
                 <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    마일리지
                </div>
                <div className="flex-1 p-2 flex items-center gap-1">
                    <Input className="w-24 h-8 text-xs border-gray-300" />
                    <span>~</span>
                    <Input className="w-24 h-8 text-xs border-gray-300" />
                </div>
            </div>

            {/* Option & Mileage Policy */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    옵션 여부
                </div>
                <div className="flex-1 p-2 flex items-center border-r border-gray-200">
                     <RadioGroup value={optionYn} onValueChange={setOptionYn} className="flex gap-4">
                        <div className="flex items-center gap-1"><RadioGroupItem value="all" id="opt-all"/><Label htmlFor="opt-all">전체</Label></div>
                        <div className="flex items-center gap-1"><RadioGroupItem value="y" id="opt-y"/><Label htmlFor="opt-y">옵션사용</Label></div>
                        <div className="flex items-center gap-1"><RadioGroupItem value="n" id="opt-n"/><Label htmlFor="opt-n">옵션미사용</Label></div>
                     </RadioGroup>
                </div>
                 <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    마일리지 정책
                </div>
                <div className="flex-1 p-2 flex items-center">
                     <RadioGroup value={mileagePolicy} onValueChange={setMileagePolicy} className="flex gap-4">
                        <div className="flex items-center gap-1"><RadioGroupItem value="all" id="mil-all"/><Label htmlFor="mil-all">전체</Label></div>
                        <div className="flex items-center gap-1"><RadioGroupItem value="global" id="mil-g"/><Label htmlFor="mil-g">통합설정</Label></div>
                        <div className="flex items-center gap-1"><RadioGroupItem value="individual" id="mil-i"/><Label htmlFor="mil-i">개별설정</Label></div>
                     </RadioGroup>
                </div>
            </div>

            {/* Additional Goods & Text Option */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    추가상품 여부
                </div>
                <div className="flex-1 p-2 flex items-center border-r border-gray-200">
                     <RadioGroup value={addGoodsYn} onValueChange={setAddGoodsYn} className="flex gap-4">
                        <div className="flex items-center gap-1"><RadioGroupItem value="all" id="add-all"/><Label htmlFor="add-all">전체</Label></div>
                        <div className="flex items-center gap-1"><RadioGroupItem value="y" id="add-y"/><Label htmlFor="add-y">옵션사용</Label></div>
                        <div className="flex items-center gap-1"><RadioGroupItem value="n" id="add-n"/><Label htmlFor="add-n">옵션미사용</Label></div>
                     </RadioGroup>
                </div>
                 <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    텍스트옵션 여부
                </div>
                <div className="flex-1 p-2 flex items-center">
                     <RadioGroup value={textOptionYn} onValueChange={setTextOptionYn} className="flex gap-4">
                        <div className="flex items-center gap-1"><RadioGroupItem value="all" id="txt-all"/><Label htmlFor="txt-all">전체</Label></div>
                        <div className="flex items-center gap-1"><RadioGroupItem value="y" id="txt-y"/><Label htmlFor="txt-y">옵션사용</Label></div>
                        <div className="flex items-center gap-1"><RadioGroupItem value="n" id="txt-n"/><Label htmlFor="txt-n">옵션미사용</Label></div>
                     </RadioGroup>
                </div>
            </div>

            {/* Display & Sell Status */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    상품출력 여부
                </div>
                <div className="flex-1 p-2 flex items-center border-r border-gray-200">
                     <RadioGroup value={displayYn} onValueChange={setDisplayYn} className="flex gap-4">
                        <div className="flex items-center gap-1"><RadioGroupItem value="all" id="disp-all"/><Label htmlFor="disp-all">전체</Label></div>
                        <div className="flex items-center gap-1"><RadioGroupItem value="y" id="disp-y"/><Label htmlFor="disp-y">출력</Label></div>
                        <div className="flex items-center gap-1"><RadioGroupItem value="n" id="disp-n"/><Label htmlFor="disp-n">미출력</Label></div>
                     </RadioGroup>
                </div>
                 <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    상품판매 여부
                </div>
                <div className="flex-1 p-2 flex items-center">
                     <RadioGroup value={sellYn} onValueChange={setSellYn} className="flex gap-4">
                        <div className="flex items-center gap-1"><RadioGroupItem value="all" id="sell-all"/><Label htmlFor="sell-all">전체</Label></div>
                        <div className="flex items-center gap-1"><RadioGroupItem value="y" id="sell-y"/><Label htmlFor="sell-y">판매</Label></div>
                        <div className="flex items-center gap-1"><RadioGroupItem value="n" id="sell-n"/><Label htmlFor="sell-n">판매중지</Label></div>
                     </RadioGroup>
                </div>
            </div>

            {/* Sort & Download Range */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    상품 정렬 방식
                </div>
                <div className="flex-1 p-2 flex items-center border-r border-gray-200">
                     <Select defaultValue="reg_date_asc">
                        <SelectTrigger className="w-32 h-8 text-xs border-gray-300">
                            <SelectValue placeholder="등록일" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="reg_date_asc">등록일↑</SelectItem>
                            <SelectItem value="reg_date_desc">등록일↓</SelectItem>
                            <SelectItem value="name_asc">상품명↑</SelectItem>
                            <SelectItem value="name_desc">상품명↓</SelectItem>
                            <SelectItem value="price_asc">가격순↑</SelectItem>
                            <SelectItem value="price_desc">가격순↓</SelectItem>
                        </SelectContent>
                     </Select>
                </div>
                 <div className="w-40 bg-[#FBFBFB] px-4 py-3 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    다운로드 범위
                </div>
                <div className="flex-1 p-2 flex items-center">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <RadioGroup value={downloadRange} onValueChange={(v: any) => setDownloadRange(v)} className="flex gap-4 items-center">
                        <div className="flex items-center gap-1"><RadioGroupItem value="all" id="r-all"/><Label htmlFor="r-all">전체</Label></div>
                        <div className="flex items-center gap-1"><RadioGroupItem value="partial" id="r-part"/><Label htmlFor="r-part">부분</Label></div>
                    </RadioGroup>
                    <Input 
                        className="w-20 h-7 text-xs border-gray-300 ml-2" 
                        value={rangeStart}
                        onChange={(e) => setRangeStart(parseInt(e.target.value) || 0)}
                    />
                    <span className="ml-1 text-gray-600">번째 부터</span>
                    <Input 
                        className="w-20 h-7 text-xs border-gray-300 ml-2" 
                        value={rangeCount}
                        onChange={(e) => setRangeCount(parseInt(e.target.value) || 0)}
                    />
                    <span className="ml-1 text-gray-600">개의 상품</span>
                </div>
            </div>
            
            {/* Field Selection Table */}
            <div className="mt-0 border-t-0">
                 {/* Table Header */}
                 <div className="flex border-b border-gray-300 bg-[#A6A6A6] text-white font-bold h-9 items-center text-center">
                     <div className="w-10 border-r border-gray-300 h-full flex items-center justify-center">
                        <Checkbox 
                            checked={selectedFields.size === FIELDS.length}
                            onCheckedChange={handleSelectAll}
                            className="bg-white border-none rounded-[2px]"
                        />
                     </div>
                     <div className="flex-1 border-r border-gray-300 h-full flex items-center justify-center">한글필드명</div>
                     <div className="flex-1 border-r border-gray-300 h-full flex items-center justify-center">영문필드명</div>
                     
                     <div className="w-10 border-r border-gray-300 h-full flex items-center justify-center">
                        <Checkbox className="bg-white border-none rounded-[2px]" checked={true} disabled />
                     </div>
                     <div className="flex-1 border-r border-gray-300 h-full flex items-center justify-center">한글필드명</div>
                     <div className="flex-1 border-r border-gray-300 h-full flex items-center justify-center">영문필드명</div>

                     <div className="w-10 border-r border-gray-300 h-full flex items-center justify-center">
                        <Checkbox className="bg-white border-none rounded-[2px]" checked={true} disabled />
                     </div>
                     <div className="flex-1 border-r border-gray-300 h-full flex items-center justify-center">한글필드명</div>
                     <div className="flex-1 h-full flex items-center justify-center">영문필드명</div>
                 </div>

                 {/* Table Rows */}
                 {fieldRows.map((rowFields, idx) => (
                    <FieldRow key={idx} fields={rowFields} />
                 ))}
            </div>
        </div>



        <SupplierPopup 
            isOpen={isSupplierPopupOpen}
            onClose={() => setIsSupplierPopupOpen(false)}
            onConfirm={(s) => {
                 if (Array.isArray(s)) {
                    setSelectedSupplier(s[0] || null);
                 } else {
                    setSelectedSupplier(s);
                 }
                setSupplierType('supplier');
            }}
        />
    </div>
  );
}
