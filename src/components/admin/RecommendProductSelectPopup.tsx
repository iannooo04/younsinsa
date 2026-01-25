"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronsLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/ui-table";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RecommendProductSelectPopupProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirm: (selectedProducts: any[]) => void;
}

export default function RecommendProductSelectPopup({
  isOpen,
  onClose,
  onConfirm,
}: RecommendProductSelectPopupProps) {
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  const toggleSelectAll = (checked: boolean) => {
      if (checked) {
          setSelectedProductIds(products.map(p => p.id));
      } else {
          setSelectedProductIds([]);
      }
  };

  const toggleSelect = (id: number) => {
      setSelectedProductIds(prev => 
          prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
      );
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Mock Data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products: any[] = [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="bg-white w-[1000px] max-h-[90vh] flex flex-col shadow-xl rounded-sm overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-gray-900">
          <h2 className="text-xl font-bold text-gray-900">
            브랜드 추천상품에 진열할 상품 설정
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Search Table */}
          <div className="border border-gray-300 mb-6 text-sm">
            {/* ... Search Filters ... */}
            <div className="flex border-b border-gray-300">
              <div className="w-32 bg-[#f9f9f9] p-3 pl-4 flex items-center border-r border-gray-300 font-bold">
                검색어
              </div>
              <div className="flex-1 p-2 flex items-center gap-2">
                <Select defaultValue="name">
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue placeholder="상품명" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">상품명</SelectItem>
                    <SelectItem value="code">상품코드</SelectItem>
                    <SelectItem value="own_code">자체상품코드</SelectItem>
                    <SelectItem value="keyword">검색 키워드</SelectItem>
                    <SelectItem value="sep1" disabled>===========</SelectItem>
                    <SelectItem value="manufacturer">제조사</SelectItem>
                    <SelectItem value="origin">원산지</SelectItem>
                    <SelectItem value="model_no">모델번호</SelectItem>
                    <SelectItem value="hs_code">HS코드</SelectItem>
                    <SelectItem value="additional_item">추가항목</SelectItem>
                    <SelectItem value="sep2" disabled>===========</SelectItem>
                    <SelectItem value="admin_memo">관리자 메모</SelectItem>
                    <SelectItem value="supplier_name">공급사명</SelectItem>
                  </SelectContent>
                </Select>
                <Input className="w-80 h-8 text-xs" />
              </div>
            </div>
            
            <div className="flex border-b border-gray-300">
              <div className="w-32 bg-[#f9f9f9] p-3 pl-4 flex items-center border-r border-gray-300 font-bold">
                카테고리 선택
              </div>
              <div className="flex-1 p-2 flex items-center gap-2">
                 {[1, 2, 3, 4].map(idx => (
                     <Select key={idx}>
                        <SelectTrigger className="w-36 h-8 text-xs text-gray-500">
                            <SelectValue placeholder="=카테고리선택=" />
                        </SelectTrigger>
                        <SelectContent><SelectItem value="none">선택안함</SelectItem></SelectContent>
                     </Select>
                 ))}
                 <label className="flex items-center gap-1 ml-2 text-xs">
                    <Checkbox className="w-4 h-4 rounded-sm border-gray-300" />
                    미지정 상품
                 </label>
              </div>
            </div>

            <div className="flex border-b border-gray-300">
              <div className="w-32 bg-[#f9f9f9] p-3 pl-4 flex items-center border-r border-gray-300 font-bold">
                브랜드
              </div>
              <div className="flex-1 p-2 flex items-center gap-2">
                 {[1, 2, 3].map(idx => (
                     <Select key={idx}>
                        <SelectTrigger className="w-36 h-8 text-xs text-gray-500">
                            <SelectValue placeholder="=브랜드선택=" />
                        </SelectTrigger>
                        <SelectContent><SelectItem value="none">선택안함</SelectItem></SelectContent>
                     </Select>
                 ))}
                 <label className="flex items-center gap-1 ml-2 text-xs">
                    <Checkbox className="w-4 h-4 rounded-sm border-gray-300" />
                    미지정 상품
                 </label>
              </div>
            </div>

            <div className="flex border-b border-gray-300">
              <div className="w-32 bg-[#f9f9f9] p-3 pl-4 flex items-center border-r border-gray-300 font-bold">
                판매가
              </div>
              <div className="flex-1 p-2 flex items-center gap-2">
                 <Input className="w-32 h-8 text-xs" />
                 <span>이상 ~</span>
                 <Input className="w-32 h-8 text-xs" />
                 <span>이하</span>
              </div>
            </div>

            <div className="flex">
              <div className="w-32 bg-[#f9f9f9] p-3 pl-4 flex items-center border-r border-gray-300 font-bold">
                기간검색
              </div>
              <div className="flex-1 p-2 flex items-center gap-2">
                 <Select defaultValue="reg_date">
                    <SelectTrigger className="w-24 h-8 text-xs">
                        <SelectValue placeholder="등록일" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="reg_date">등록일</SelectItem>
                        <SelectItem value="mod_date">수정일</SelectItem>
                    </SelectContent>
                 </Select>
                 <div className="flex items-center gap-1">
                     <Input type="date" className="w-32 h-8 text-xs" />
                 </div>
                 <span>~</span>
                 <div className="flex items-center gap-1">
                     <Input type="date" className="w-32 h-8 text-xs" />
                 </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <Button className="w-24 bg-[#555] hover:bg-[#444] text-white rounded-sm h-10 font-bold">검색</Button>
          </div>


          {/* Product List */}
          <div className="border-t border-gray-900">
             <Table className="text-xs">
                <TableHeader>
                    <TableRow className="bg-[#f0f0f0] border-b border-gray-300 hover:bg-[#f0f0f0]">
                        <TableHead className="w-10 text-center">
                            <Checkbox 
                                className="w-4 h-4 rounded-sm border-gray-300 bg-white" 
                                checked={products.length > 0 && selectedProductIds.length === products.length}
                                onCheckedChange={(checked) => toggleSelectAll(!!checked)}
                            />
                        </TableHead>
                        <TableHead className="text-center w-14 text-gray-600 font-bold">번호</TableHead>
                        <TableHead className="text-center w-16 text-gray-600 font-bold">이미지</TableHead>
                        <TableHead className="text-center text-gray-600 font-bold">상품명</TableHead>
                        <TableHead className="text-center w-24 text-gray-600 font-bold">판매가</TableHead>
                        <TableHead className="text-center w-28 text-gray-600 font-bold">공급사</TableHead>
                        <TableHead className="text-center w-16 text-gray-600 font-bold">재고</TableHead>
                        <TableHead className="text-center w-20 text-gray-600 font-bold">품절상태</TableHead>
                        <TableHead className="text-center w-32 text-gray-600 font-bold bg-[#e6e6e6] whitespace-nowrap">PC쇼핑몰 노출상태</TableHead>
                        <TableHead className="text-center w-32 text-gray-600 font-bold bg-[#e6e6e6] whitespace-nowrap">모바일쇼핑몰 노출상태</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={10} className="text-center py-10 text-gray-500">
                                검색된 상품이 없습니다.
                            </TableCell>
                        </TableRow>
                    ) : (
                        products.map((product) => (
                        <TableRow 
                            key={product.id} 
                            className={`hover:bg-gray-50 border-b border-gray-200 h-14 ${selectedProductIds.includes(product.id) ? 'bg-blue-50' : ''}`}
                            onClick={() => toggleSelect(product.id)}
                        >
                            <TableCell className="text-center p-0">
                                <Checkbox 
                                    className="w-4 h-4 rounded-sm border-gray-300" 
                                    checked={selectedProductIds.includes(product.id)}
                                    // onClick={(e) => e.stopPropagation()}
                                    onCheckedChange={() => toggleSelect(product.id)}
                                />
                            </TableCell>
                            <TableCell className="text-center text-gray-500">{product.id}</TableCell>
                            <TableCell className="text-center p-1">
                                <div className="w-10 h-10 bg-gray-100 mx-auto border border-gray-200">
                                    {/* Placeholder Image */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {product.image && <img src={product.image} alt="" className="w-full h-full object-cover" />}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="text-blue-500 hover:underline cursor-pointer">{product.name}</div>
                                <div className="flex gap-1 mt-1">
                                    {product.badges.includes("BEST") && <span className="bg-gray-500 text-white text-[10px] px-1 py-0.5 rounded-sm">BEST</span>}
                                    {product.badges.includes("주문폭주") && <span className="bg-orange-600 text-white text-[10px] px-1 py-0.5 rounded-sm">주문폭주</span>}
                                </div>
                            </TableCell>
                            <TableCell className="text-center font-bold text-gray-700">{product.price} 원</TableCell>
                            <TableCell className="text-center text-gray-500">{product.supplier}</TableCell>
                            <TableCell className="text-center text-gray-500">{product.stock}</TableCell>
                            <TableCell className="text-center text-gray-500">{product.status}</TableCell>
                            <TableCell className="text-center text-gray-500">{product.pcStatus}</TableCell>
                            <TableCell className="text-center text-gray-500">{product.mobileStatus}</TableCell>
                        </TableRow>
                        ))
                    )}
                </TableBody>
             </Table>
          </div>

          <div className="flex justify-center mt-6 gap-0">
             <Button variant="outline" className="w-8 h-8 p-0 rounded-none border-gray-300 text-gray-500 hover:bg-gray-50"><ChevronsLeft className="w-4 h-4" /></Button>
             <Button variant="outline" className="w-8 h-8 p-0 rounded-none border-gray-300 border-l-0 text-gray-500 hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></Button>
             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(page => (
                 <Button 
                    key={page} 
                    variant={page === 1 ? "secondary" : "outline"} 
                    className={`w-8 h-8 p-0 rounded-none border-l-0 border-gray-300 hover:bg-gray-50 text-xs ${page === 1 ? 'bg-[#555] text-white hover:bg-[#444] border-[#555]' : 'text-gray-600'}`}
                >
                    {page}
                </Button>
             ))}
             <Button variant="outline" className="w-12 h-8 p-0 rounded-none border-l-0 border-gray-300 text-gray-500 hover:bg-gray-50 text-xs flex items-center justify-center gap-1"><span className="text-[10px]">&gt;</span> 다음</Button>
             <Button variant="outline" className="w-12 h-8 p-0 rounded-none border-l-0 border-gray-300 text-gray-500 hover:bg-gray-50 text-xs flex items-center justify-center gap-1"><span className="text-[10px]">&gt;&gt;</span> 맨뒤</Button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-300 flex justify-center bg-gray-50">
          <Button 
            onClick={() => {
                const selectedItems = products.filter(p => selectedProductIds.includes(p.id));
                onConfirm(selectedItems);
            }} 
            className="w-24 h-10 bg-[#555] hover:bg-[#444] text-white font-bold rounded-sm"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
