"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  ChevronsUp,
  ChevronDown,
  ChevronsDown,
} from "lucide-react";
import { getProductDetailExposureSettingsAction, updateProductDetailExposureSettingsAction } from "@/actions/basic-policy-actions";

export default function ProductDetailExposureItemsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [settings, setSettings] = useState({
    isMobileSame: true,
    pcExposureItems: [] as string[],
    mobileExposureItems: [] as string[],
    discountSettings: { productDiscount: true, couponDiscount: false },
    additionalSettings: { optionStock: true, icon: false, representativeColor: true, discountRate: false },
    strikeSettings: { consumerPrice: true, salePrice: false },
  });

  const allPossibleItems = [
    "배송일정", "상품코드", "자체상품코드", "브랜드", "제조사", "원산지", "모델번호", "상품상태", "유효기간",
    "짧은설명", "정가", "판매가", "할인적용가", "구매제한", "구매혜택", "쿠폰받기", "배송비"
  ];

  useEffect(() => {
    async function load() {
        setFetching(true);
        const res = await getProductDetailExposureSettingsAction();
        if (res.success && res.data) {
            const data = res.data;
            setSettings({
                isMobileSame: data.isMobileSame,
                pcExposureItems: (data.pcExposureItems as string[]) || [],
                mobileExposureItems: (data.mobileExposureItems as string[]) || [],
                discountSettings: (data.discountSettings as any) || { productDiscount: true, couponDiscount: false },
                additionalSettings: (data.additionalSettings as any) || { optionStock: true, icon: false, representativeColor: true, discountRate: false },
                strikeSettings: (data.strikeSettings as any) || { consumerPrice: true, salePrice: false },
            });
        }
        setFetching(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const res = await updateProductDetailExposureSettingsAction(settings);
    if (res.success) {
        alert("저장되었습니다.");
    } else {
        alert(res.error || "저장 실패");
    }
    setLoading(false);
  };

  if (fetching) return <div className="p-10 text-center">로딩중...</div>;

  const pcAvailable = allPossibleItems.filter(item => !settings.pcExposureItems.includes(item));
  const mobileAvailable = allPossibleItems.filter(item => !settings.mobileExposureItems.includes(item));

  const moveItem = (item: string, direction: 'add' | 'remove', type: 'pc' | 'mobile') => {
    if (type === 'pc') {
        if (direction === 'add') {
            setSettings(prev => ({ ...prev, pcExposureItems: [...prev.pcExposureItems, item] }));
        } else {
            setSettings(prev => ({ ...prev, pcExposureItems: prev.pcExposureItems.filter(i => i !== item) }));
        }
    } else {
        if (direction === 'add') {
            setSettings(prev => ({ ...prev, mobileExposureItems: [...prev.mobileExposureItems, item] }));
        } else {
            setSettings(prev => ({ ...prev, mobileExposureItems: prev.mobileExposureItems.filter(i => i !== item) }));
        }
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          상품상세 노출항목 설정 등록
        </h1>
        <Button 
            onClick={handleSave}
            disabled={loading}
            className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm"
        >
          {loading ? "저장중" : "저장"}
        </Button>
      </div>

      {/* Main Content */}
      <div className="border border-gray-300 border-b-0">
        <div className="bg-white p-3 border-b border-gray-300 flex items-center gap-2">
          <h2 className="text-sm font-bold text-gray-800">노출 항목 설정</h2>
          <div className="text-[11px] text-[#888888] flex items-center gap-1">
            <span className="bg-[#555555] text-white text-[9px] w-3 h-3 flex items-center justify-center rounded-[2px] font-bold">!</span>
            노출항목으로 설정되어 있더라도 내용이 등록되지 않은 항목은 쇼핑몰에 노출되지 않습니다.
          </div>
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        {/* Scope */}
        <div className="flex border-b border-gray-300">
          <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-300">
            적용범위
          </div>
          <div className="flex-1 p-3 flex items-center">
            <div className="flex items-center gap-1.5">
              <Checkbox
                id="apply-mobile"
                className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                checked={settings.isMobileSame}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, isMobileSame: !!checked }))}
              />
              <Label htmlFor="apply-mobile" className="text-gray-700 font-normal cursor-pointer">
                모바일 쇼핑몰 동일 적용
              </Label>
            </div>
          </div>
        </div>

        {/* PC Shop Exposure Items */}
        <div className="flex border-b border-gray-300 min-h-[400px]">
          <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center justify-start border-r border-gray-300">
            PC쇼핑몰 노출항목
          </div>
          <div className="flex-1 p-4 flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <span className="text-gray-600 font-bold">전체 항목</span>
              <div className="border border-gray-300 h-[300px] overflow-y-auto bg-white">
                {pcAvailable.map((item, idx) => (
                  <div key={idx} className="p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-gray-600" onClick={() => moveItem(item, 'add', 'pc')}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2">
                <div className="text-center font-bold text-gray-400">{'< >'}</div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <span className="text-gray-600 font-bold">선택항목</span>
              <div className="border border-gray-300 h-[300px] overflow-y-auto bg-white">
                {settings.pcExposureItems.map((item, idx) => (
                  <div key={idx} className="p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-gray-600" onClick={() => moveItem(item, 'remove', 'pc')}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {!settings.isMobileSame && (
            <div className="flex border-b border-gray-300 min-h-[400px]">
                <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center justify-start border-r border-gray-300">
                    모바일 쇼핑몰 노출항목
                </div>
                <div className="flex-1 p-4 flex gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                    <span className="text-gray-600 font-bold">전체 항목</span>
                    <div className="border border-gray-300 h-[300px] overflow-y-auto bg-white">
                        {mobileAvailable.map((item, idx) => (
                        <div key={idx} className="p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-gray-600" onClick={() => moveItem(item, 'add', 'mobile')}>
                            {item}
                        </div>
                        ))}
                    </div>
                    </div>

                    <div className="flex flex-col justify-center gap-2">
                        <div className="text-center font-bold text-gray-400">{'< >'}</div>
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                    <span className="text-gray-600 font-bold">선택항목</span>
                    <div className="border border-gray-300 h-[300px] overflow-y-auto bg-white">
                        {settings.mobileExposureItems.map((item, idx) => (
                        <div key={idx} className="p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-gray-600" onClick={() => moveItem(item, 'remove', 'mobile')}>
                            {item}
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        )}

        {/* Discount Price Settings */}
        <div className="flex border-b border-gray-300">
          <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-300">
            할인적용가 설정
          </div>
          <div className="flex-1 p-3">
            <div className="flex gap-6 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="discount-price"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  checked={settings.discountSettings.productDiscount}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, discountSettings: { ...prev.discountSettings, productDiscount: !!checked } }))}
                />
                <Label htmlFor="discount-price" className="text-gray-700 font-normal cursor-pointer">상품할인가</Label>
              </div>
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="coupon-price"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  checked={settings.discountSettings.couponDiscount}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, discountSettings: { ...prev.discountSettings, couponDiscount: !!checked } }))}
                />
                <Label htmlFor="coupon-price" className="text-gray-700 font-normal cursor-pointer">상품쿠폰할인가</Label>
              </div>
            </div>
            <div className="text-[11px] text-[#888888]">할인적용가 노출 시 적용할 할인금액을 설정합니다.</div>
          </div>
        </div>

        {/* Additional Exposure Item Settings */}
        <div className="flex border-b border-gray-300">
          <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-300">
            노출항목 추가 설정
          </div>
          <div className="flex-1 p-3">
            <div className="flex gap-6 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="option-stock"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  checked={settings.additionalSettings.optionStock}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, additionalSettings: { ...prev.additionalSettings, optionStock: !!checked } }))}
                />
                <Label htmlFor="option-stock" className="text-gray-700 font-normal cursor-pointer">옵션재고</Label>
              </div>
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="icon"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  checked={settings.additionalSettings.icon}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, additionalSettings: { ...prev.additionalSettings, icon: !!checked } }))}
                />
                <Label htmlFor="icon" className="text-gray-700 font-normal cursor-pointer">아이콘</Label>
              </div>
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="rep-color"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  checked={settings.additionalSettings.representativeColor}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, additionalSettings: { ...prev.additionalSettings, representativeColor: !!checked } }))}
                />
                <Label htmlFor="rep-color" className="text-gray-700 font-normal cursor-pointer">대표색상</Label>
              </div>
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="discount-rate"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  checked={settings.additionalSettings.discountRate}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, additionalSettings: { ...prev.additionalSettings, discountRate: !!checked } }))}
                />
                <Label htmlFor="discount-rate" className="text-gray-700 font-normal cursor-pointer">할인율</Label>
              </div>
            </div>
            <div className="text-[11px] text-[#888888]">(할인율) 체크 시 판매가 대비 할인율이 할인금액에 노출됩니다.</div>
          </div>
        </div>

        {/* Cancellation Line Settings */}
        <div className="flex border-b border-gray-300">
          <div className="w-48 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-300">
            취소선 추가 설정
          </div>
          <div className="flex-1 p-3">
            <div className="flex gap-6 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="strike-origin"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  checked={settings.strikeSettings.consumerPrice}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, strikeSettings: { ...prev.strikeSettings, consumerPrice: !!checked } }))}
                />
                <Label htmlFor="strike-origin" className="text-gray-700 font-normal cursor-pointer">정가</Label>
              </div>
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="strike-sale"
                  className="w-3.5 h-3.5 border-gray-300 rounded-[2px] data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                  checked={settings.strikeSettings.salePrice}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, strikeSettings: { ...prev.strikeSettings, salePrice: !!checked } }))}
                />
                <Label htmlFor="strike-sale" className="text-gray-700 font-normal cursor-pointer">판매가</Label>
              </div>
            </div>
            <div className="text-[11px] text-[#888888]">체크시 쇼핑몰에 취소선 효과가 적용되어 출력됩니다.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
