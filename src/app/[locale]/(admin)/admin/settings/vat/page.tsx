"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Plus, Minus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import { getVatSettingsAction, updateVatSettingsAction } from "@/actions/basic-policy-actions";
import { useEffect, useTransition } from "react";

export default function VatSettingsPage() {
  const [productVatRate, setProductVatRate] = useState("10");
  const [shippingVatRate, setShippingVatRate] = useState("10");

  const [customProductRates, setCustomProductRates] = useState<{ id: number; value: string }[]>([]);
  const [customShippingRates, setCustomShippingRates] = useState<{ id: number; value: string }[]>([]);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchData = async () => {
        const result = await getVatSettingsAction();
        if (result.success && result.settings) {
            const s = result.settings;
            // Convert Decimal to string
            setProductVatRate(String(s.productVatRate));
            setShippingVatRate(String(s.shippingVatRate));
            
            // Ensure array type for JSON fields
            if (Array.isArray(s.customProductRates)) {
                setCustomProductRates(s.customProductRates as any[]);
            }
            if (Array.isArray(s.customShippingRates)) {
                setCustomShippingRates(s.customShippingRates as any[]);
            }
        }
    };
    fetchData();
  }, []);

  const handleSave = () => {
      startTransition(async () => {
          const result = await updateVatSettingsAction({
              productVatRate,
              shippingVatRate,
              customProductRates,
              customShippingRates
          });
          if (result.success) {
              alert("저장되었습니다.");
          } else {
              alert(result.error || "저장 실패");
          }
      });
  };

  const handleAddCustomRate = (type: 'product' | 'shipping') => {
    const newRate = { id: Date.now(), value: "" };
    if (type === 'product') {
      setCustomProductRates([...customProductRates, newRate]);
    } else {
      setCustomShippingRates([...customShippingRates, newRate]);
    }
  };

  const handleDeleteCustomRate = (type: 'product' | 'shipping', id: number) => {
    if (type === 'product') {
        setCustomProductRates(customProductRates.filter(rate => rate.id !== id));
    } else {
        setCustomShippingRates(customShippingRates.filter(rate => rate.id !== id));
    }
  };

  const handleCustomRateChange = (type: 'product' | 'shipping', id: number, newValue: string) => {
    if (type === 'product') {
        setCustomProductRates(customProductRates.map(rate => rate.id === id ? { ...rate, value: newValue } : rate));
    } else {
        setCustomShippingRates(customShippingRates.map(rate => rate.id === id ? { ...rate, value: newValue } : rate));
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-2">
        기본설정 &gt; 기본정책 &gt; 부가세율 설정
      </div>

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900">부가세율 설정</h1>
        <Button 
          className="bg-red-500 hover:bg-red-600 text-white px-6 rounded-sm"
          onClick={handleSave}
          disabled={isPending}
        >
          <Save className="w-4 h-4 mr-2" />
          {isPending ? "저장 중..." : "저장"}
        </Button>
      </div>

      {/* Product VAT Settings */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
          상품 부가세 설정
          <span className="text-xs font-normal text-gray-400 border px-1 rounded cursor-help">?</span>
        </h2>
        
        <div className="border-t border-gray-400">
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">부가세 세율</th>
                <td className="p-4">
                  <RadioGroup 
                    value={productVatRate} 
                    onValueChange={setProductVatRate}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10" id="p-vat-10" />
                      <Label htmlFor="p-vat-10" className="font-normal text-gray-900">10%</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="p-vat-0" />
                      <Label htmlFor="p-vat-0" className="font-normal text-gray-900 mr-2">0%(면세)</Label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-6 text-xs px-2 border-gray-300 text-gray-600 hover:bg-gray-50 gap-1"
                        onClick={() => handleAddCustomRate('product')}
                      >
                        <Plus className="w-3 h-3" />
                        추가
                      </Button>
                    </div>
                    {/* Custom Product Rates */}
                    {customProductRates.map((rate) => (
                        <div key={rate.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={`custom_product_${rate.id}`} id={`p-vat-${rate.id}`} />
                            <div className="flex items-center gap-1">
                                <Input 
                                    className="w-20 h-7 text-xs" 
                                    value={rate.value}
                                    onChange={(e) => handleCustomRateChange('product', rate.id, e.target.value)}
                                />
                                <span className="text-sm">
                                    %
                                </span>
                            </div>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-7 text-xs px-2 border-gray-300 text-gray-600 hover:bg-gray-50 gap-1"
                                onClick={() => handleDeleteCustomRate('product', rate.id)}
                            >
                                <Minus className="w-3 h-3" />
                                삭제
                            </Button>
                        </div>
                    ))}
                  </RadioGroup>

                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-start gap-1.5 text-xs text-gray-500">
                      <div className="bg-gray-600 text-white text-[10px] w-3.5 h-3.5 flex items-center justify-center rounded-sm mt-0.5 font-bold">!</div>
                      <span>선택된 세율은 <Link href="/admin/products/create" className="text-blue-500 hover:underline cursor-pointer">상품&gt;상품관리&gt;상품등록</Link> 에서 상품 등록 시 기본 세율이 됩니다.</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-red-500">
                      <div className="bg-red-500 text-white text-[10px] w-3.5 h-3.5 flex items-center justify-center rounded-sm mt-0.5 font-bold">!</div>
                      <span>세금계산서는 부가가치세율이 10% 또는 0%인 경우에만 발급할 수 있으며, 그 외 세율로 설정된 상품이 포함된 주문은 세금계산서가 발급되지 않으므로 유의 바랍니다.</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping VAT Settings */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
          배송비 부가세 설정
          <span className="text-xs font-normal text-gray-400 border px-1 rounded cursor-help">?</span>
        </h2>
        
        <div className="border-t border-gray-400">
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">부가세 세율</th>
                <td className="p-4">
                  <RadioGroup 
                    value={shippingVatRate} 
                    onValueChange={setShippingVatRate}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10" id="s-vat-10" />
                      <Label htmlFor="s-vat-10" className="font-normal text-gray-900">10%</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="s-vat-0" />
                      <Label htmlFor="s-vat-0" className="font-normal text-gray-900 mr-2">0%(면세)</Label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-6 text-xs px-2 border-gray-300 text-gray-600 hover:bg-gray-50 gap-1"
                        onClick={() => handleAddCustomRate('shipping')}
                      >
                        <Plus className="w-3 h-3" />
                        추가
                      </Button>
                    </div>
                     {/* Custom Shipping Rates */}
                     {customShippingRates.map((rate) => (
                        <div key={rate.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={`custom_shipping_${rate.id}`} id={`s-vat-${rate.id}`} />
                            <div className="flex items-center gap-1">
                                <Input 
                                    className="w-20 h-7 text-xs" 
                                    value={rate.value}
                                    onChange={(e) => handleCustomRateChange('shipping', rate.id, e.target.value)}
                                />
                                <span className="text-sm">
                                    %
                                </span>
                            </div>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-7 text-xs px-2 border-gray-300 text-gray-600 hover:bg-gray-50 gap-1"
                                onClick={() => handleDeleteCustomRate('shipping', rate.id)}
                            >
                                <Minus className="w-3 h-3" />
                                삭제
                            </Button>
                        </div>
                    ))}
                  </RadioGroup>

                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-start gap-1.5 text-xs text-gray-500">
                      <div className="bg-gray-600 text-white text-[10px] w-3.5 h-3.5 flex items-center justify-center rounded-sm mt-0.5 font-bold">!</div>
                      <span>선택된 세율은 <span className="text-blue-500 hover:underline cursor-pointer">기본설정&gt;배송정책&gt;배송비조건 등록</span> 에서 배송비조건 등록 시 기본 세율이 됩니다.</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-red-500">
                      <div className="bg-red-500 text-white text-[10px] w-3.5 h-3.5 flex items-center justify-center rounded-sm mt-0.5 font-bold">!</div>
                      <span>세금계산서는 부가가치세율이 10% 또는 0%인 경우에만 발급할 수 있으며, 그 외 세율로 설정된 상품이 포함된 주문은 세금계산서가 발급되지 않으므로 유의 바랍니다.</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
