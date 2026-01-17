"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  HelpCircle,
  FileSpreadsheet,
  Youtube,
  ChevronUp,
} from "lucide-react";
import * as XLSX from "xlsx";
import { uploadProductsExcelAction } from "@/actions/product-actions";
import SupplierPopup from "@/components/admin/SupplierPopup";

export default function ProductExcelUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [supplierType, setSupplierType] = useState<"head" | "supplier">("head");
  const [selectedSupplier, setSelectedSupplier] = useState<{ id: string; name: string } | null>(null);
  const [isSupplierPopupOpen, setIsSupplierPopupOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    if (supplierType === 'supplier' && selectedSupplier) {
        formData.append("supplierId", selectedSupplier.id);
    }

    try {
      const res = await uploadProductsExcelAction(formData);
      alert(res.message);
      if (res.success) {
          setFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSampleDownload = () => {
    const headers = [
      ["설명", "상품명_기본*", "판매가*", "정가", "매입가", "재고*", "자체상품코드", "카테고리 코드*", "브랜드 코드", "짧은 설명"],
      ["excel DB", "goods_name", "goods_price", "fixed_price", "cost_price", "stock_cnt", "goods_cd", "category_code", "brand_code", "short_desc"],
      ["설명", "상품명", "판매가격", "정가", "매입가", "재고수량", "자체코드", "카테고리ID", "브랜드ID", "설명"],
      ["데이터", "샘플 상품 A", "10000", "12000", "8000", "100", "CODE001", "CATEGORY_ID_HERE", "BRAND_ID_HERE", "간단설명"]
    ];
    const ws = XLSX.utils.aoa_to_sheet(headers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sample");
    XLSX.writeFile(wb, "product_upload_sample.xlsx");
  };

  const tableData = [
    { name: "상품번호", eng: "goods_no", desc: "숫자 10자리의 unique 코드, 등록시에는 자동 생성 되므로 등록시에는 넣지 마세요." },
    { name: "상품명_기본", eng: "goods_name", desc: "250자 이내의 상품명, html 태그 사용 가능" },
    { name: "수수료", eng: "commission", desc: "수수료를 입력합니다." },
    { name: "자체상품코드", eng: "goods_cd", desc: "30자 이내, 영문 대소문자/숫자/특수문자를 이용하여 입력합니다. (단, 특수문자는 \"_\"(언더바) 외 입력 불가)" },
    { name: "상품명_메인", eng: "name_main", desc: "메인에 노출되는 250자 이내의 상품명, html 태그 사용 가능" },
    { name: "상품명_리스트", eng: "name_list", desc: "각종 리스트에 노출되는 250자 이내의 상품명, html 태그 사용 가능" },
    { name: "상품명_상세", eng: "name_detail", desc: "상품 상세 설명에 노출되는 250자 이내의 상품명, html 태그 사용 가능" },
    { name: "상품명_제휴", eng: "name_partner", desc: "상품 제휴 설명에 노출되는 250자 이내의 상품명, html 태그 사용 가능" },
    { name: "상품명_영문몰", eng: "global_data_2_goodsnm", desc: "입력시 별도의 해외상점 상품명이 등록됩니다." },
    { name: "상품명_중문몰", eng: "global_data_3_goodsnm", desc: "입력시 별도의 해외상점 상품명이 등록됩니다." },
    { name: "상품명_일문몰", eng: "global_data_4_goodsnm", desc: "입력시 별도의 해외상점 상품명이 등록됩니다." },
    { name: "검색 키워드", eng: "search_word", desc: "250자 이내의 검색어를 \",\"(콤마)로 구분해서 넣으세요" },
    { name: "상품 노출 시간", eng: "goods_open_dt", desc: "\"yyyy-mm-dd 00:00\" 형태로 넣으세요" },
    { name: "상품 상태", eng: "goods_state", desc: "n : 신상품 u :중고 r : 반품 f: 리퍼 d:전시 b : 스크래치" },
    { name: "상품 대표색상", eng: "goods_color", desc: "대표색상 등록시 [기본설정>기본정책>코드관리] 메뉴의 상품 대표색상 16진수 색상값을 입력합니다. 다중구분 : ^|^ / 예시) 8E562E^|^E91818" },
    { name: "결제 수단 설정", eng: "pay_limit_fl", desc: "n: 통합설정 y : 개별설정" },
    { name: "사용가능 결제수단", eng: "pay_limit", desc: "개별설정 시 사용가능한 결제수단 입력 (통합설정 시에는 넣지 마세요)\n무통장 사용:gb, PG결제 사용:pg, 마일리지 사용:gm, 예치금 사용:gd / 다중구분 : ^|^ 예시) gb^|^pg" },
    { name: "모델번호", eng: "model_no", desc: "30자 이내, 영문 대소문자/숫자/특수문자를 이용하여 입력합니다. (단, 특수문자는 \"_\"(언더바) 외 입력 불가)" },
    { name: "카테고리 코드", eng: "category_code", desc: "대표 카테고리 및 다중 카테고리 코드, 첫번째 코드가 대표 카테고리임, 다중인경우 \"Alt+Enter(개행)\"로 구분" },
    { name: "매입처 상품명", eng: "purchase_goods_name", desc: "입력시 별도의 매입처 상품명이 등록됩니다." },
    { name: "브랜드 코드", eng: "brand_code", desc: "브랜드명이 아닌 브랜드 코드를 넣으세요" },
    { name: "제조사", eng: "maker_name", desc: "30자 이내의 제조사명을 넣으세요" },
    { name: "원산지", eng: "origin_name", desc: "30자 이내의 원산지명을 넣으세요" },
    { name: "제조일", eng: "make_date", desc: "필요시에만 입력하세요, 입력 형식은 \"yyyy-mm-dd\"" },
    { name: "출시일", eng: "launch_date", desc: "필요시에만 입력하세요, 입력 형식은 \"yyyy-mm-dd\"" },
    { name: "유효일자 시작일", eng: "effective_start_ymd", desc: "필요시에만 입력하세요, 입력 형식은 \"yyyy-mm-dd\"" },
    { name: "유효일자 종료일", eng: "effective_end_ymd", desc: "필요시에만 입력하세요, 입력 형식은 \"yyyy-mm-dd\"" },
    { name: "구매가능 회원등급 설정", eng: "goods_permission", desc: "all:전체(회원+비회원),member:회원전용(비회원제외),group:특정회원등급" },
    { name: "구매가능 회원등급", eng: "goods_permission_group", desc: "구매가능 회원등급 설정시 회원등급 코드를 입력하세요. 구분은 \"||\" 입니다." },
    { name: "구매불가 고객 가격 대체문구 사용", eng: "goods_permission_price_string_fl", desc: "구매불가 고객 가격 대체문구사용이 필요한 경우 입력해주세요. y:사용함, n:사용안함, 기본은 n(사용안함)입니다." },
    { name: "구매불가 고객 가격 대체문구", eng: "goods_permission_price_string", desc: "30자 이내의 구매불가 고객 가격 대체문구를 입력해주세요." },
    { name: "성인인증 여부", eng: "only_adult_fl", desc: "성인인증이 필요한 경우 입력해주세요." },
    { name: "미인증 고객 상품 노출함", eng: "only_adult_display_fl", desc: "미인증 고객 상품 노출함이 필요한 경우 입력해주세요." },
    { name: "미인증 고객 상품 이미지 노출함", eng: "only_adult_image_fl", desc: "미인증 고객 상품 이미지 노출함이 필요한 경우 입력해주세요." },
    { name: "접근권한 회원등급 설정", eng: "goods_access", desc: "all:전체(회원+비회원),member:회원전용(비회원제외),group:특정회원등급" },
    { name: "접근권한 회원등급", eng: "goods_access_group", desc: "구매가능 회원등급 설정시 회원등급 코드를 입력하세요. 구분은 \"||\" 입니다." },
    { name: "접근불가 고객 상품 노출함", eng: "goods_access_display_fl", desc: "접근불가 고객 상품 노출이 필요한 경우 입력해주세요." },
    { name: "추가항목", eng: "add_info", desc: "필요시에만 입력하세요, 입력형식은 \"항목^|^내용\", 다중구분:Alt+Enter(개행)" },
    { name: "상품필수정보", eng: "goods_must_info", desc: "4칸인 경우 : 항목^|^내용^|^항목^|^내용, 2칸인 경우 : 항목^|^내용, 다중구분:Alt+Enter(개행)" },
    { name: "KC인증 표시 여부", eng: "kcmark_fl", desc: "y:사용함, n:사용안함, 기본은 n(사용안함)입니다." },
    { name: "KC인증 구분", eng: "kcmark_div_fl", desc: "다수의 인증을 받은 상품의 경우 정보구분(^|^)를 사용하여, 여러개의 인증정보를 등록할 수 있습니다.\n전기용품 안전관리법의 인증 대상을 선택합니다. 상품 엑셀 업로드 시, 아래 코드에서 선택하여 업로드 합니다.\n[어린이제품] 공급자적합성검사 : kcCd01 / [어린이제품] 안전인증 : kcCd02 / [어린이제품] 안전확인 : kcCd03 / [방송통신기자재] 잠정인증 : kcCd04 / [방송통신기자재] 적합등록 : kcCd05 / [방송통신기자재] 적합인증 : kcCd06 / [생활용품] 공급자적합성확인 : kcCd07 / [생활용품] 안전인증 : kcCd08 / [생활용품] 안전확인 : kcCd09 / [생활용품] 어린이보호포장 : kcCd10 / [전기용품] 공급자적합성확인 : kcCd11 / [전기용품] 안전인증 : kcCd12 / [전기용품] 안전확인 : kcCd13" },
    { name: "KC인증 번호", eng: "kcmark_no", desc: "다수의 정보를 입력하는 경우 정보구분 값(^|^)를 사용하세요.\n30자 이내, 영문 대소문자/숫자/특수문자를 이용하여 입력합니다. (단, 특수문자는 \"-\"(하이픈) 외 입력 불가)" },
    { name: "KC인증일자", eng: "kcmark_dt", desc: "다수의 정보를 입력하는 경우 정보구분 값(^|^)를 사용하세요.\nKC인증일자가 존재하지 않는 인증대상의 경우, 값을 입력하지 마세요.\n\"yyyy-mm-dd\" 형태로 넣으세요" },
    { name: "아이콘 기간(시작)", eng: "icon_start", desc: "기간 제한용 아이콘의 시작일자를 입력하세요, 입력형식은 \"yyyy-mm-dd HH:ii:ss\"" },
    { name: "아이콘 기간(끝)", eng: "icon_end", desc: "기간 제한용 아이콘의 만료일자를 입력하세요, 입력형식은 \"yyyy-mm-dd HH:ii:ss\"" },
    { name: "아이콘 코드", eng: "icon_period", desc: "기간 제한용 아이콘 코드를 입력하세요. 구분은 \"||\" 입니다." },
    { name: "아이콘 코드", eng: "icon_code", desc: "무제한용 아이콘 코드를 입력하세요. 구분은 \"||\" 입니다." },
    { name: "무게", eng: "weight", desc: "상품의 무게를 입력하세요." },
    { name: "용량", eng: "volume", desc: "상품의 용량을 입력하세요." },
    { name: "재고 설정", eng: "stock_type", desc: "y:재고, n:무한, 기본은 n(무한)입니다." },
    { name: "마일리지 정책", eng: "mileage_type", desc: "g:개별, c:통합, 기본은 c(통합)입니다." },
    { name: "마일리지 지급대상", eng: "mileage_group", desc: "all:전체회원, group:특정회원등급, 기본은 all(전체회원)입니다." },
    { name: "마일리지 지급 회원등급", eng: "mileage_group_info", desc: "마일리지 지급 회원등급 설정 시 회원등급 코드를 입력하세요. 구분은 \"||\" 입니다." },
    { name: "상품 개별 마일리지", eng: "mileage_goods", desc: "개별설정-특정회원등급 설정 시 마일리지 금액 값을 입력하세요. 다중구분 : Alt+Enter (개행)" },
    { name: "상품 개별 마일리지 단위", eng: "mileage_goods_unit", desc: "개별설정-특정회원등급 설정 시 입력한 마일리지 금액의 단위입니다. 다중구분 : Alt+Enter(개행)\npercent : %(퍼센트) mileage : 마일리지 설정 단위 문구" },
    { name: "상품 할인설정 사용 여부", eng: "goods_discount_fl", desc: "y:사용함, n:사용안함" },
    { name: "상품 할인가", eng: "goods_discount", desc: "" },
    { name: "상품 할인가 단위", eng: "goods_discount_unit", desc: "percent : %(퍼센트) price : 상품 할인가 설정 단위 문구" },
    { name: "묶음주문기준", eng: "fixed_sales", desc: "옵션기준 또는 상품기준으로 묶음주문단위를 설정할 수 있습니다. option : 옵션기준 goods : 상품기준, 기본은 option(옵션기준)입니다." },
    { name: "묶음주문단위", eng: "sales_unit", desc: "설정된 개수 단위로 주문 되며, 장바구니에 담깁니다." },
    { name: "품절 설정", eng: "soldout_yn", desc: "y:품절, n:정상, 기본은 n(정상)입니다." },
    { name: "과세/면세", eng: "tax_free_type", desc: "t:과세, f:면세 기본은 t(과세)입니다." },
    { name: "과세율", eng: "tax_percent", desc: "과세인경우 과세율을 나타내며, 기본은 10 입니다." },
    { name: "PC 노출 여부", eng: "display_pc_yn", desc: "PC 상품 노출여부입니다. y:노출함, n:노출안함, 기본은 y(노출함)입니다." },
    { name: "모바일 노출 여부", eng: "display_mobile_yn", desc: "모바일 상품 노출여부입니다. y:노출함, n:노출안함, 기본은 y(노출함)입니다." },
    { name: "PC 판매 여부", eng: "sell_pc_yn", desc: "PC 상품의 판매여부를 나타냅니다. y:판매함, n:판매안함, 기본은 y(판매함)입니다." },
    { name: "모바일 판매 여부", eng: "sell_mobile_yn", desc: "모바일 상품의 판매여부를 나타냅니다. y:판매함, n:판매안함, 기본은 y(판매함)입니다." },
    { name: "배송비 고유번호", eng: "deliverySno", desc: "배송비 코드를 입력해주세요. 기본코드는 1 입니다." },
    { name: "가격대체 문구", eng: "goods_price_string", desc: "가격을 대체할 문구 입니다. 해당 문구 작성시 해당상품은 구매가 되지 않습니다." },
    { name: "구매수량기준", eng: "fixed_cnt", desc: "옵션기준, 상품기준, ID기준으로 최소/최대 구매수량을 설정할 수 있습니다. option : 옵션기준 goods : 상품기준 id : ID기준, 기본은 option(옵션기준)입니다." },
    { name: "최소 구매 수량", eng: "min_cnt", desc: "최소 구매수량입니다. 기본은 1입니다." },
    { name: "최대 구매 수량", eng: "max_cnt", desc: "최대 구매수량입니다. 기본은 0이며, 0은 무한 구매 입니다." },
    { name: "상품판매기간 시작일", eng: "sales_start_ymd", desc: "필요시에만 입력하세요, 입력 형식은 \"yyyy-mm-dd 00:00\"" },
    { name: "상품판매기간 종료일", eng: "sales_end_ymd", desc: "필요시에만 입력하세요, 입력 형식은 \"yyyy-mm-dd 00:00\"" },
    { name: "도서공연비 소득공제 상품 적용 여부", eng: "culture_benefit_fl", desc: "도서공연비 소득공제 상품 적용 여부를 설정합니다. y: 적용, n: 미적용, 기본은 n(미적용)입니다." },
    { name: "외부동영상 연동 여부", eng: "external_video_fl", desc: "y:사용함, n:사용안함" },
    { name: "외부동영상 주소", eng: "external_video_url", desc: "" },
    { name: "외부동영상 너비", eng: "external_video_width", desc: "\"너비\"와 \"높이\"를 모두 입력하지 않으면 시스템 기본 사이즈 (640X360)로 등록됩니다." },
    { name: "외부동영상 높이", eng: "external_video_height", desc: "\"너비\"와 \"높이\"를 모두 입력하지 않으면 시스템 기본 사이즈 (640X360)로 등록됩니다." },
    { name: "판매가", eng: "goods_price", desc: "판매 가격입니다." },
    { name: "정가", eng: "fixed_price", desc: "정가입니다." },
    { name: "매입가", eng: "cost_price", desc: "매입가입니다." },
    { name: "옵션 사용 여부", eng: "option_yn", desc: "옵션 사용여부입니다. y:옵션, n:일반, 기본은 n 이며, 일반적인 옵션 없는 상품입니다." },
    { name: "옵션 표시 방법", eng: "option_display", desc: "s:일체형, d:분리형, 기본은 s(일체형)입니다." },
    { name: "옵션명", eng: "option_name", desc: "옵션 사용시 옵션명입니다. 구분은 \"^|^\" 입니다." },
    { name: "옵션값", eng: "option_value", desc: "옵션명을 여러 개 사용할 경우 조합된 상태의 옵션값을 입력하세요, 입력형식은 \"옵션값1^|^옵션값2\", 다중구분:Alt+Enter(개행)" },
    { name: "옵션이미지", eng: "option_image", desc: "입력형식은 \"옵션값1^|^이미지명\", 다중구분:Alt+Enter(개행)" },
    { name: "옵션매입가격", eng: "option_cost_price", desc: "다중구분:Alt+Enter(개행)" },
    { name: "옵션가격", eng: "option_price", desc: "상품의 판매가 기준 추가될 옵션가는 양수, 차감될 옵션가는 음수(마이너스)로 입력 합니다. 다중구분:Alt+Enter(개행)" },
    { name: "재고", eng: "stock_cnt", desc: "재고 이며, 옵션이 있는 경우는 각 옵션별로 \"Alt+Enter(개행)\"로 구분을 합니다." },
    { name: "옵션 노출여부", eng: "option_view_fl", desc: "옵션노출여부 이며, 옵션이 있는 경우는 각 옵션별로 \"Alt+Enter(개행)\"로 구분을 합니다." },
    { name: "옵션 품절여부", eng: "option_sell_fl", desc: "옵션품절여부 이며, 옵션이 있는 경우는 각 옵션별로 \"Alt+Enter(개행)\"로 구분을 합니다." },
    { name: "옵션 배송상태", eng: "option_delivery_fl", desc: "y:정상 n:배송지연 다중구분:Alt+Enter(개행)" },
    { name: "자체옵션코드", eng: "option_code", desc: "30자 이내, 영문 대소문자/숫자/특수문자를 이용하여 입력합니다. (단, 특수문자는 \"_\"(언더바) 외 입력 불가), 다중구분:Alt+Enter(개행)" },
    { name: "옵션 메모", eng: "option_memo", desc: "다중구분:Alt+Enter(개행)" },
    { name: "텍스트 옵션 사용여부", eng: "text_option_yn", desc: "y:사용함, n:사용안함, 기본은 n(사용안함)입니다." },
    { name: "텍스트 옵션", eng: "text_option", desc: "입력형식은 \"옵션명^|^필수여부^|^옵션금액^|^입력제한수\", 필수여부(y:필수, n:비필수), 다중구분:Alt+Enter(개행)" },
    { name: "배송일정 사용여부", eng: "delivery_schedule_yn", desc: "y:사용함, n:사용안함, 기본은 n(사용안함)입니다." },
    { name: "배송일정", eng: "delivery_schedule", desc: "입력형식은 발송소요일의 경우 \"send^|^d\" (d는 일), 당일발송 기준시간의 경우 \"time^|^HH:ii^|^안내문구 사용여부^|^안내문구\", 당일발송 기준시간(HH:ii는 시간:분), 안내문구 사용여부(y:사용함, n:사용안함)" },
    { name: "관련상품", eng: "relation_yn", desc: "n:사용안함, a:자동, m:수동, 기본은 n(사용안함)입니다." },
    { name: "관련상품 서로 등록 여부", eng: "relation_same_fl", desc: "관심상품을 서로 등록할지 여부를 등록합니다. n:사용안함, y:전체상품 사용함, s:선택상품 사용함, 기본은 n(사용안함 입니다)" },
    { name: "관련상품 코드", eng: "relation_code", desc: "수동인 경우 출력할 상품 코드입니다.구분은 \"||\" 입니다." },
    { name: "관련상품 노출기간", eng: "relation_goods_date", desc: "입력형식은 \"상품코드^|^노출 시작일자^|^노출 만료일자\", 다중구분:Alt+Enter(개행)" },
    { name: "관련상품 서로등록 상품코드", eng: "relation_goods_each", desc: "관련상품 서로 등록이 선택상품 사용함인 경우 서로등록 할 상품 코드입니다. 구분은 \"||\" 입니다." },
    { name: "추가상품 사용여부", eng: "add_goods_fl", desc: "y:사용함, n:사용안함, 기본은 n(사용안함)입니다." },
    { name: "추가상품 설정", eng: "add_goods", desc: "입력형식은 \"추가상품 표시명^|^필수여부^|^추가상품코드^|^추가상품코드\", 필수여부(y:필수, n:비필수), 다중구분:Alt+Enter(개행)" },
    { name: "이미지 돋보기 사용여부", eng: "imgDetail_view_fl", desc: "y:사용함, n:사용안함, 기본은 n(사용안함)입니다." },
    { name: "이미지 저장소", eng: "image_storage", desc: "웹(Web) 저장소 : local / 외부 저장소 : HTTP 경로 입력" },
    { name: "이미지 경로", eng: "image_path", desc: "등록시에는 자동 연결 되므로 넣지 마세요\n(이미지URL 직접 등록 시 빈값으로 입력)" },
    { name: "이미지명", eng: "image_name", desc: "이미지 종류와 이미지 명은 \"^|^\"로 구분하며 이미지 명은 파일형식까지 입력합니다. 다중구분:Alt+Enter(개행) 이미지 종류는 main(리스트), list(썸네일), detail(상품상세), magnify(확대), add1(추가 리스트) 입니다.\n\"기본설정>상품정책>상품 이미지 사이즈 설정\" 메뉴의 \"리스트 이미지 종류 추가\"항목에서 리스트 이미지 종류를 추가한 경우 \"이미지 종류\"에는 add1, add2, add3의 형식으로 입력합니다." },
    { name: "짧은 설명", eng: "short_desc", desc: "250자 이내의 간단한 상품 설명" },
    { name: "짧은 설명_영문몰", eng: "global_data_2_short_description", desc: "입력시 별도의 해외상점 짧은설명이 등록됩니다." },
    { name: "짧은 설명_중문몰", eng: "global_data_3_short_description", desc: "입력시 별도의 해외상점 짧은설명이 등록됩니다." },
    { name: "짧은 설명_일문몰", eng: "global_data_4_short_description", desc: "입력시 별도의 해외상점 짧은설명이 등록됩니다." },
    { name: "이벤트 문구", eng: "event_description", desc: "" },
    { name: "PC쇼핑몰 상세 설명", eng: "goods_desc_pc", desc: "상품에 대한 상세한 설명 입력" },
    { name: "모바일쇼핑몰 상세 설명", eng: "goods_desc_mobile", desc: "상품에 대한 상세한 설명(모바일용) 입력" },
    { name: "PC/모바일 상세설명 동일사용 여부", eng: "goods_desc_same_flag", desc: "y : 동일사용, n : 개별사용 (기본값 : y)" },
    { name: "쇼핑하우 노출여부", eng: "daum_flag", desc: "다음 쇼핑하우 노출여부 설정, y : 노출함(기본값), n : 노출안함" },
    { name: "네이버쇼핑 노출여부", eng: "naver_flag", desc: "네이버 쇼핑 노출여부 설정, y : 노출(기본값), n : 노출안함" },
    { name: "수입 및 제작 여부", eng: "naver_import_flag", desc: "f:해외구매대행 d:병행수입 o:주문제작" },
    { name: "판매 방식 구분", eng: "naver_product_flag", desc: "w : 도매 r : 렌탈 h:대여 i:할부 s: 예약판매 b: 구매대행 e: 리셀" },
    { name: "월 렌탈료", eng: "naver_product_monthly_rental_pay", desc: "판매 방식 구분이 \"렌탈\" 일 경우 필수, 최소 1원 이상 최대 999,999,999원 이하로 입력하세요." },
    { name: "총 렌탈료", eng: "naver_product_total_rental_pay", desc: "판매 방식 구분이 \"렌탈\" 일 경우 필수, 최소 1원 이상 최대 999,999,999원 이하로 입력하세요." },
    { name: "렌탈계약기간", eng: "naver_product_flag_rental_period", desc: "판매 방식 구분이 \"렌탈\" 일 경우 필수, 최소 1개월 이상 ~ 999개월 이하로 입력하세요." },
    { name: "주요사용연령대", eng: "naver_age_group", desc: "a : 성인 y : 청소년 c: 아동 b:유아" },
    { name: "주요사용성별", eng: "naver_gender", desc: "m : 남성 w : 여성 c: 공용" },
    { name: "검색태그", eng: "naver_tag", desc: "" },
    { name: "속성정보", eng: "naver_attribute", desc: "" },
    { name: "네이버카테고리ID", eng: "naver_category", desc: "" },
    { name: "가격비교페이지ID", eng: "naver_product_id", desc: "" },
    { name: "네이버페이 사용가능 표시", eng: "naver_npay_able", desc: "no : 전체(PC+모바일) 표시안함 pc: PC mobile : 모바일 all : 전체표시" },
    { name: "네이버페이 적립가능 표시", eng: "naver_npay_acum_able", desc: "no : 전체(PC+모바일) 표시안함 pc: PC mobile : 모바일 all : 전체표시" },
    { name: "브랜드 인증상품 여부", eng: "naver_brand_certification", desc: "y:인증함, n:인증안함, 기본은 n(인증안함)입니다.\n네이버쇼핑 브랜드패키지에 가입한 브랜드본사로 부터 인증 받은 상품만 'y(인증함)'으로 입력합니다." },
    { name: "네이버쇼핑 도서 노출여부", eng: "naverbook_flag", desc: "네이버쇼핑 도서 노출 여부 설정, y : 노출, n : 노출안함(기본값)" },
    { name: "ISBN코드", eng: "isbn", desc: "숫자 10자 또는 13자 입력" },
    { name: "도서 상품 타입", eng: "goods_type", desc: "P: 지류도서, E: E북, A:오디오북 (대문자로 입력)" },
    { name: "배송 안내 입력선택", eng: "detail_delivery_fl", desc: "no:사용안함, n:직접입력,selection:선택입력, 기본은 no(사용안함)입니다." },
    { name: "배송 안내", eng: "detail_delivery", desc: "배송 안내 입력선택이 직접입력(direct)인 경우 : 배송안내 내용을 입력합니다.\n배송 안내 입력선택이 선택입력(selection)인 경우 : [기본설정>상품정책>상품 상세 이용안내 관리] 메뉴에 등록된 배송안내의 6자리 코드를 입력합니다.기본코드는 002001 입니다." },
    { name: "AS 안내 입력선택", eng: "detail_as_fl", desc: "no:사용안함, n:직접입력,selection:선택입력, 기본은 no(사용안함)입니다." },
    { name: "AS 안내", eng: "detail_as", desc: "AS 안내 입력선택이 직접입력(direct)인 경우 : AS안내 내용을 입력합니다.\nAS 안내 입력선택이 선택입력(selection)인 경우 : [기본설정>상품정책>상품 상세 이용안내 관리] 메뉴에 등록된 AS안내의 6자리 코드를 입력합니다.기본코드는 003001 입니다." },
    { name: "환불 안내 입력선택", eng: "detail_refund_fl", desc: "no:사용안함, n:직접입력,selection:선택입력, 기본은 no(사용안함)입니다." },
    { name: "환불 안내", eng: "detail_refund", desc: "환불 안내 입력선택이 직접입력(direct)인 경우 : 환불안내 내용을 입력합니다.\n환불 안내 입력선택이 선택입력(selection)인 경우 : [기본설정>상품정책>상품 상세 이용안내 관리] 메뉴에 등록된 환불안내의 6자리 코드를 입력합니다.기본코드는 004001 입니다." },
    { name: "교환 안내 입력선택", eng: "detail_exchange_fl", desc: "no:사용안함, n:직접입력,selection:선택입력, 기본은 no(사용안함)입니다." },
    { name: "교환 안내", eng: "detail_exchange", desc: "교환 안내 입력선택이 직접입력(direct)인 경우 : 교환안내 내용을 입력합니다.\n교환 안내 입력선택이 선택입력(selection)인 경우 : [기본설정>상품정책>상품 상세 이용안내 관리] 메뉴에 등록된 교환안내의 6자리 코드를 입력합니다.기본코드는 005001 입니다." },
    { name: "상품 관리 메모", eng: "memo", desc: "관리자 메모를 입력" },
    { name: "HS 코드", eng: "hscode", desc: "해외상점 사용시 HS코드를 입력해 주세요.\n국가명^|^HS코드\n다중구분:Alt+Enter(개행)\nkr : 대한민국 us : 미국 cn : 중국 jp : 일본\n예시) kr^|^0101" },
    { name: "상품 개별 SEO 설정 사용여부", eng: "seo_tag_fl", desc: "y:사용함, n:사용안함, 기본은 n(사용안함)입니다." },
    { name: "타이틀", eng: "set_tag_title", desc: "해당 상품의 브라우저 타이틀 개별 문구. 한글기준 10자 이내 작성을 권장합니다." },
    { name: "메타태그 작성자", eng: "set_tag_author", desc: "해당 상품 페이지의 개별 작성자" },
    { name: "메타태그 설명", eng: "set_tag_description", desc: "해당 상품의 개별 요약내용. 공백 포함 80자 이내 작성을 권장합니다." },
    { name: "메타태그 키워드", eng: "set_tag_keyword", desc: "해당 상품의 개별 검색어.  \", \" (콤마)로 구분하여 10개 이내로 입력하는 것을 권장합니다." },
    { name: "메타 FBE 피드 설정", eng: "fb_vn", desc: "메타 FBE 피드 설정" },
    { name: "메타 FBE 피드 이미지", eng: "fb_image_name", desc: "메타 FBE 피드 이미지" },
    { name: "구글 쇼핑 노출여부", eng: "google_use_flag", desc: "구글 쇼핑 노출여부" },
  ];

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">상품 엑셀 업로드</h1>
      </div>

      {/* Upload Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2 p-2">
           <h2 className="text-sm font-bold text-gray-700">상품 업로드</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* File Upload Row */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    엑셀파일 업로드
                </div>
                <div className="flex-1 p-3 flex gap-1">
                   <div className="flex">
                      <Input 
                        type="text" 
                        value={file?.name || ""}
                        className="w-64 h-8 bg-white border-gray-300 rounded-none rounded-l-sm" 
                        placeholder="파일을 선택해주세요."
                        readOnly
                      />
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".xlsx,.xls"
                      />
                      <Button 
                        variant="secondary" 
                        onClick={() => fileInputRef.current?.click()}
                        className="h-8 bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-none rounded-r-sm text-xs px-3"
                      >
                          찾아보기
                      </Button>
                   </div>
                   <Button 
                    variant="outline" 
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="h-8 border-gray-300 text-gray-600 bg-white hover:bg-gray-50 text-xs px-3 ml-1"
                   >
                       {isUploading ? "업로드 중..." : "엑셀업로드"}
                   </Button>
                </div>
            </div>

            {/* Supplier Row */}
             <div className="flex border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    공급사 구분
                </div>
                <div className="flex-1 p-3 flex items-center">
                    <RadioGroup 
                        value={supplierType} 
                        onValueChange={(v: any) => setSupplierType(v)}
                        className="flex gap-4 items-center"
                    >
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="head" id="supplier-head" className="border-gray-300 text-gray-600 focus:ring-red-500" />
                            <Label htmlFor="supplier-head" className="text-gray-700 font-normal cursor-pointer">본사</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="supplier" id="supplier-provider" className="border-gray-300 text-gray-600 focus:ring-red-500" />
                            <Label htmlFor="supplier-provider" className="text-gray-700 font-normal cursor-pointer">공급사</Label>
                            {supplierType === 'supplier' && (
                                <div className="flex items-center gap-2 ml-2">
                                    <div className="h-7 px-2 flex items-center border border-gray-300 bg-white min-w-[100px]">
                                        {selectedSupplier?.name || "선택된 공급사 없음"}
                                    </div>
                                    <Button 
                                        variant="secondary" 
                                        className="h-6 text-[11px] bg-[#A4A4A4] text-white hover:bg-[#888888] rounded-sm px-2"
                                        onClick={() => setIsSupplierPopupOpen(true)}
                                    >
                                        공급사 선택
                                    </Button>
                                </div>
                            )}
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
      </div>

       <div className="border-t border-gray-300 my-8"></div>

      {/* Guide Section */}
      <div className="space-y-6 text-gray-600">
          {/* Sample Download */}
          <div>
              <h3 className="font-bold text-sm text-gray-800 mb-2">상품 엑셀 샘플 다운로드</h3>
              <ol className="list-decimal pl-5 space-y-1 text-xs text-gray-500">
                  <li>아래 "상품 엑셀 샘플 다운로드" 버튼을 눌러 샘플을 참고하시기 바랍니다.</li>
                  <li>엑셀 파일 저장은 반드시 "Excel 통합 문서(xlsx)" 혹은 "Excel 97-2003 통합문서(xls)"로 저장하셔야 합니다. 그 외 csv나 xml 파일등은 지원 되지 않습니다.</li>
              </ol>
              <div className="mt-2">
                 <Button 
                    variant="outline" size="sm" 
                    onClick={handleSampleDownload}
                    className="h-8 bg-white border-gray-300 hover:bg-gray-50 text-green-700 font-bold flex items-center gap-1.5 px-3"
                 >
                    <div className="bg-green-600 text-white p-0.5 rounded-[2px]">
                         <FileSpreadsheet className="w-3 h-3 text-white fill-current" />
                     </div>
                     상품 엑셀 샘플 다운로드
                 </Button>
              </div>
          </div>

          {/* Upload Method */}
          <div>
              <h3 className="font-bold text-sm text-gray-800 mb-2">상품 업로드 방법</h3>
              <ol className="list-decimal pl-5 space-y-1 text-xs text-gray-500">
                  <li>아래 항목 설명되어 있는 것을 기준으로 엑셀 파일을 작성을 합니다.</li>
                  <li>상품 다운로드에서 받은 엑셀이나 "상품 엑셀 샘플 다운로드"에서 받은 엑셀을 기준으로 파일을 작성을 합니다.</li>
                  <li>엑셀 파일 저장은 반드시 "Excel 통합 문서(xlsx)" 혹은 "Excel 97-2003 통합문서(xls)"로 저장하셔야 합니다. 해당 확장자 외 다른 확장자는 업로드 불가합니다.</li>
                  <li>작성된 엑셀 파일을 업로드 합니다.</li>
              </ol>
          </div>

          {/* Caution */}
          <div>
               <h3 className="font-bold text-sm text-gray-800 mb-2">주의사항</h3>
                <ol className="list-decimal pl-5 space-y-1 text-xs text-gray-500">
                  <li>엑셀 파일 저장은 반드시 "Excel 통합 문서(xlsx)" 혹은 "Excel 97-2003 통합문서(xls)" 만 저장 가능하며, csv 파일은 업로드 불가합니다.</li>
                  <li>엑셀 2003 사용자의 경우는 그냥 저장을 하시면 되고, 엑셀 2007 이나 엑셀 2010 인 경우는 새이름으로 저장을 선택 후 "Excel 통합 문서(xlsx)" 혹은 "Excel 97-2003 통합문서"로 저장을 하십시요.</li>
                  <li>엑셀의 내용이 너무 많은 경우 업로드가 불가능 할수 있으므로 100개나 200개 단위로 나누어 올리시기 바랍니다.</li>
                  <li>엑셀 파일이 작성이 완료 되었다면 하나의 상품만 테스트로 업로드하여 확인후 이상이 없으시면 나머지를 올리시기 바랍니다.</li>
                  <li>엑셀 내용 중 "1번째 줄은 설명", "2번째 줄은 excel DB 코드", "3번째 줄은 설명" 이며, "4번째 줄부터" 데이터 입니다.</li>
                  <li><span className="text-red-500">엑셀 내용 중 2번째 줄 "excel DB" 코드부터 3번째 줄 "설명"은 필수 데이터 입니다. 그리고 <span className="underline font-bold">반드시 내용은 "4번째 줄부터" 작성</span> 하셔야 합니다.</span></li>
                  <li><span className="text-red-500">신규상품 등록 시 필수 데이터인 "상품코드, 상품명" 정보 외 등록을 원하지 않는 항목의 필드는 삭제 또는 공란으로 남겨두고 올리시기 바랍니다.</span><br/><span className="text-red-500 ml-3">(삭제 또는 공란으로 남겨두고 업로드할 경우, 해당 항목의 정보는 기본값으로 등록됩니다.)</span></li>
                  <li>상품 수정은 [상품관리{">"}상품 엑셀 관리{">"}상품 다운로드]에서 다운로드하여 상품정보를 수정하여 올리시기 바랍니다.</li>
                  <li><span className="text-red-500">상품의 일부 내용만 수정할 경우, 수정을 원하지 않는 항목의 필드를 삭제하고 올리시기 바랍니다.</span><br/><span className="text-red-500 ml-3">(필드를 삭제하지 않고 공란으로 남겨둘 경우, 입력항목의 정보는 공란으로 등록되며 선택항목은 시스템 기본값으로 등록됩니다.)</span></li>
                  <li><span className="text-red-500">엑셀로 등록한 상품의 이미지는 "디자인{">"}이미지 브라우저{">"}이미지 브라우저 (Web FTP)" 메뉴의 "/data/goods/tmp/"폴더에 업로드 후 일괄처리해야 합니다.</span><br/><span className="text-gray-500 ml-3">(상품 이미지 일괄처리는 <span className="text-blue-500 underline cursor-pointer">상품{">"}상품 일괄 관리{">"}상품 이미지 일괄 처리</span>에서 등록할 수 있습니다.)</span></li>
                  <li>상품 엑셀 업로드 시 상품이미지 및 옵션이미지는 기존과 동일한 방법(웹 저장소)으로 등록/수정할 수 있습니다.<br/><span className="ml-3">상품 이미지/옵션이미지가 클라우드 저장소에 저장 중인 경우, 상품이미지 및 옵션이미지 관련 항목은 수정되지 않습니다.<br/><span className="ml-3">(상품이미지 및 옵션이미지 관련 항목 : 옵션이미지(option_image), 이미지 저장소(image_storage), 이미지 경로(image_path), 이미지명(image_name)</span></span></li>
              </ol>
          </div>
          
           {/* Item Description */}
           <div className="mt-10">
                <h3 className="font-bold text-sm text-gray-800 mb-2">항목 설명</h3>
                <p className="text-xs text-gray-500 mb-4">1. 아래 설명된 내용을 확인후 작성을 해주세요.</p>
                
                <table className="w-full text-xs text-left border-collapse border-t-2 border-gray-700">
                    <colgroup>
                        <col className="w-48" />
                        <col className="w-48" />
                        <col />
                    </colgroup>
                    <thead>
                        <tr className="bg-[#323232] text-white">
                            <th className="p-2 border border-black border-r-gray-500 border-l-0">한글필드명</th>
                            <th className="p-2 border border-black border-r-gray-500">영문필드명</th>
                            <th className="p-2 border border-black border-r-0">설명</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-900">
                        {tableData.map((row, idx) => (
                             <tr key={idx} className="border-b border-gray-300 bg-white">
                                <td className="p-2 border-r border-gray-300 font-bold bg-white">{row.name}</td>
                                <td className="p-2 border-r border-gray-300 text-blue-500">{row.eng}</td>
                                <td className="p-2 whitespace-pre-line">{row.desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
           </div>
      </div>

       {/* Floating Actions */}
        <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
            <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                <span className="text-[10px] font-bold"><Youtube size={16}/></span>
            </Button>
                <Button className="rounded-full w-10 h-10 bg-[#7B4DFF] hover:bg-[#7B4DFF]/90 shadow-lg text-white p-0 flex items-center justify-center border-0 text-[10px] leading-tight flex-col">
                <span className="block">따라</span>
                <span className="block">하기</span>
            </Button>
            <div className="flex flex-col gap-0 rounded-full bg-white shadow-lg overflow-hidden border border-gray-200">
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100 p-0">
                        <ChevronUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0 transform rotate-180">
                         <ChevronUp className="w-4 h-4" />
                </Button>
            </div>
        </div>

        <SupplierPopup 
            isOpen={isSupplierPopupOpen}
            onClose={() => setIsSupplierPopupOpen(false)}
            onConfirm={(s) => setSelectedSupplier(s)}
        />
    </div>
  );
}

