"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  HelpCircle,
  FileSpreadsheet,
} from "lucide-react";
import * as XLSX from "xlsx";
import { getProductsForExcelAction } from "@/actions/product-actions";

export default function ProductExcelDownloadPage() {
  const [range, setRange] = useState<"all" | "partial">("all");
  const [start, setStart] = useState(1);
  const [qty, setQty] = useState(300);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await getProductsForExcelAction({
        range,
        start,
        count: qty
      });

      if (res.success && res.items) {
        // Transform data for Excel
        const excelData = res.items.map((p: Record<string, unknown> & {
          code: string | null;
          name: string;
          supplier?: { name: string } | null;
          brand?: { name: string } | null;
          category?: { name: string } | null;
          price: number;
          consumerPrice: number;
          supplyPrice: number;
          stockQuantity: number;
          createdAt: Date;
          displayStatusPC: string;
          displayStatusMobile: string;
        }) => ({
          "상품코드": p.code || "",
          "상품명": p.name,
          "공급사": p.supplier?.name || "본사",
          "브랜드": p.brand?.name || "-",
          "카테고리": p.category?.name || "-",
          "판매가": p.price,
          "소비자가": p.consumerPrice,
          "공급가": p.supplyPrice,
          "재고": p.stockQuantity,
          "등록일": p.createdAt.toISOString().split('T')[0],
          "PC노출": p.displayStatusPC === 'DISPLAY' ? 'Y' : 'N',
          "모바일노출": p.displayStatusMobile === 'DISPLAY' ? 'Y' : 'N'
        }));

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Products");
        XLSX.writeFile(wb, `products_export_${new Date().toISOString().split('T')[0]}.xlsx`);
      } else {
        alert("데이터를 가져오는 중 오류가 발생했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("다운로드 중 오류가 발생했습니다.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">상품 엑셀 다운로드</h1>
      </div>

      {/* Main Content Area */}
        <div className="mb-8">
             <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-bold text-gray-700">상품 전체를 다운로드 받습니다.</h3>
                <HelpCircle className="w-4 h-4 text-gray-400" />
             </div>

             <div className="border-t border-gray-400 border-b border-gray-200">
                 {/* Row 1: Download Button */}
                 <div className="flex border-b border-gray-200">
                     <div className="w-40 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                         다운로드
                     </div>
                     <div className="flex-1 p-3">
                         <Button 
                            variant="outline" size="sm" 
                            disabled={isDownloading}
                            onClick={handleDownload}
                            className="h-8 bg-white border-gray-300 hover:bg-gray-50 text-green-600 font-bold flex items-center gap-1.5 px-3"
                         >
                             <div className="bg-green-600 text-white p-0.5 rounded-[2px]">
                                 <FileSpreadsheet className="w-3 h-3 text-white fill-current" />
                             </div>
                             {isDownloading ? "다운로드 중..." : "엑셀 다운로드"}
                         </Button>
                     </div>
                 </div>



                  {/* Row 3: Download Range */}
                 <div className="flex border-gray-200">
                     <div className="w-40 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                         다운로드 범위
                     </div>
                     <div className="flex-1 p-3 flex items-center">
                          <RadioGroup 
                            value={range} 
                            onValueChange={(v: string) => setRange(v as "all" | "partial")}
                            className="flex gap-6 items-center"
                          >
                              <div className="flex items-center gap-1.5">
                                  <RadioGroupItem value="all" id="range-all" className="border-gray-300 text-gray-600 focus:ring-red-500" />
                                  <Label htmlFor="range-all" className="text-gray-700 font-normal cursor-pointer">전체</Label>
                              </div>
                              <div className="flex items-center gap-1.5">
                                  <RadioGroupItem value="partial" id="range-partial" className="border-gray-300 text-gray-600 focus:ring-red-500" />
                                  <Label htmlFor="range-partial" className="text-gray-700 font-normal cursor-pointer">부분</Label>
                              </div>
                          </RadioGroup>
                          {range === 'partial' && (
                            <div className="flex items-center ml-2 gap-2 text-gray-600">
                                <Input 
                                    className="w-20 h-7 text-xs border-gray-300" 
                                    type="number"
                                    value={start}
                                    onChange={(e) => setStart(parseInt(e.target.value) || 1)}
                                />
                                <span>번째 부터</span>
                                <Input 
                                    className="w-20 h-7 text-xs border-gray-300" 
                                    type="number"
                                    value={qty}
                                    onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                                />
                                <span>개의 상품</span>
                            </div>
                          )}
                     </div>
                 </div>
             </div>
        </div>

    </div>
  );
}

