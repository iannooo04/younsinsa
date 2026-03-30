"use client";

import { useState, useTransition } from "react";
import { FileSpreadsheet, Settings } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { permanentlyDeleteProductsAction } from "@/actions/product-actions";

interface Product {
    id: string;
    productCode: string;
    name: string;
    price: number;
    supplier: string;
    brand: string;
    displayStatus: string;
    saleStatus: string;
    stock: string;
    stockStatus: string;
    shippingFee: string;
    createdAt: string | Date;
    updatedAt?: string | Date;
    image: string | null;
}

interface Props {
    initialProducts: Product[];
}

export default function ProductTable({ initialProducts }: Props) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();

    const soldOutCount = products.filter((p) => p.stockStatus === '품절').length;
    const displayedCount = products.filter((p) => p.displayStatus === '노출함').length;

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(products.map(p => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelect = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleDelete = () => {
        if (selectedIds.length === 0) {
            alert("삭제할 상품을 선택해주세요.");
            return;
        }

        if (confirm("선택한 상품을 영구적으로 삭제하시겠습니까? (삭제 후 복구 불가능합니다)")) {
            startTransition(async () => {
                const res = await permanentlyDeleteProductsAction(selectedIds);
                if (res.success) {
                    alert("선택한 상품이 삭제되었습니다.");
                    setProducts(products.filter(p => !selectedIds.includes(p.id)));
                    setSelectedIds([]);
                } else {
                    alert(res.message || "상품 삭제 중 오류가 발생했습니다.");
                }
            });
        }
    };

    return (
        <div className="space-y-4">
            
            {/* Status Bar */}
            <div className="flex justify-between items-center text-sm border-b pb-2">
                <div className="flex gap-2 text-gray-600">
                    <span className="font-bold text-red-600">검색 {products.length}개</span>
                    <span>/</span>
                    <span>전체 {products.length}개</span>
                    <span>|</span>
                    <span>품절 {soldOutCount}개</span>
                    <span>|</span>
                    <span>노출 : {displayedCount}개</span>
                </div>
                <div className="flex items-center gap-2">
                    <select className="select select-bordered select-xs rounded-sm">
                        <option>등록일 ↓</option>
                        <option>등록일 ↑</option>
                        <option>상품명 ↓</option>
                        <option>상품명 ↑</option>
                        <option>판매가 ↓</option>
                        <option>판매가 ↑</option>
                        <option>제조사 ↓</option>
                        <option>제조사 ↑</option>
                        <option>결제 ↑</option>
                        <option>조회 ↑</option>
                        <option>구매율 ↑</option>
                        <option>담기 ↑</option>
                        <option>관심 ↑</option>
                        <option>후기 ↑</option>
                    </select>
                    <select className="select select-bordered select-xs rounded-sm">
                        <option>10개 보기</option>
                        <option>20개 보기</option>
                        <option>30개 보기</option>
                        <option>40개 보기</option>
                        <option>50개 보기</option>
                        <option>60개 보기</option>
                        <option>70개 보기</option>
                        <option>80개 보기</option>
                        <option>90개 보기</option>
                        <option>100개 보기</option>
                        <option>200개 보기</option>
                        <option>300개 보기</option>
                        <option>500개 보기</option>
                    </select>
                </div>
            </div>

            {/* Action Toolbar */}
            <div className="bg-gray-50 border p-2 flex justify-end items-center">
                <div className="flex items-center gap-1">
                     <button 
                        className="btn btn-xs bg-white text-gray-700 border-gray-300 hover:bg-gray-100 min-h-8 h-8 font-normal rounded-sm flex items-center gap-1 shadow-sm px-3"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending ? "삭제중..." : "선택 삭제"}
                    </button>
                     <button className="btn btn-xs bg-green-600 hover:bg-green-700 text-white border-none rounded-sm flex items-center gap-1 h-8 px-3">
                        <FileSpreadsheet size={12} /> 엑셀다운로드
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border-t border-gray-300">
                <table className="table table-sm w-full text-center border-l border-r border-b">
                    <thead className="bg-gray-100 text-gray-700 border-b border-gray-300">
                        <tr>
                            <th className="w-10">
                                <input 
                                    type="checkbox" 
                                    className="checkbox checkbox-sm rounded-sm"
                                    checked={products.length > 0 && selectedIds.length === products.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="w-16">번호</th>
                            <th>상품코드</th>
                            <th>이미지</th>
                            <th className="min-w-[200px]">상품명</th>
                            <th>판매가</th>
                            <th>노출상태</th>
                            <th>판매상태</th>
                            <th>재고</th>
                            <th className="whitespace-nowrap min-w-[90px]">등록일/수정일</th>
                            <th className="whitespace-nowrap w-[60px]">수정</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {products.map((product, index: number) => (
                            <tr key={product.id} className="hover:bg-gray-50 border-b border-gray-200">
                                <td>
                                    <input 
                                        type="checkbox" 
                                        className="checkbox checkbox-sm rounded-sm"
                                        checked={selectedIds.includes(product.id)}
                                        onChange={() => handleSelect(product.id)}
                                    />
                                </td>
                                <td>{products.length - index}</td>
                                <td className="font-mono text-gray-500">{product.productCode}</td>
                                <td>
                                    <div className="flex justify-center">
                                        <div className="w-10 h-10 border bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                            {product.image ? (
                                                <Image 
                                                    src={product.image} 
                                                    alt="" 
                                                    fill
                                                    className="object-cover" 
                                                    sizes="40px"
                                                />
                                            ) : (
                                                <span className="text-gray-300 text-[10px]">No Img</span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="text-left">
                                    <Link href={`/admin/products/edit/${product.id}`} className="text-blue-600 hover:underline font-medium block truncate max-w-[200px]">
                                        {product.name}
                                    </Link>
                                    <div className="flex gap-1 mt-1">
                                         {/* Tags can go here */}
                                    </div>
                                </td>
                                <td className="font-bold text-gray-800 whitespace-nowrap align-middle">{product.price?.toLocaleString()}원</td>
                                <td>
                                    <span className={product.displayStatus === '노출함' ? "text-blue-600" : "text-gray-400"}>
                                        {product.displayStatus}
                                    </span>
                                </td>
                                <td>
                                    <span className={product.saleStatus === '판매함' ? "text-blue-600" : "text-gray-400"}>
                                        {product.saleStatus}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-gray-600 font-medium">
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="text-gray-500 text-[11px] whitespace-nowrap align-middle">
                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <div>{new Date(product.createdAt).toISOString().split('T')[0]}</div>
                                        {product.updatedAt && <div>{new Date(product.updatedAt).toISOString().split('T')[0]}</div>}
                                    </div>
                                </td>
                                <td className="whitespace-nowrap align-middle">
                                    <div className="flex items-center justify-center">
                                        <Link href={`/admin/products/edit/${product.id}`}>
                                            <button className="btn btn-xs btn-outline border-gray-300 text-gray-600 font-normal h-6 min-h-0 rounded-sm whitespace-nowrap">수정</button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                             <tr>
                                <td colSpan={12} className="py-10 text-gray-500">등록된 상품이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center py-4">
                <div className="join">
                    <button className="join-item btn btn-sm btn-outline rounded-sm text-gray-500">1</button>
                    <button className="join-item btn btn-sm btn-outline rounded-sm text-gray-500">2</button>
                    <button className="join-item btn btn-sm btn-outline rounded-sm text-gray-500">3</button>
                    <button className="join-item btn btn-sm btn-outline rounded-sm text-gray-500">다음</button>
                </div>
            </div>
            
            {/* Footer Info */}
            <div className="border-t-2 border-gray-400 mt-8 pt-6 pb-20">
                <div className="flex items-center gap-1 text-blue-500 mb-2">
                    <Settings size={14} />
                    <span className="font-bold">안내</span>
                </div>
                <div className="text-xs text-gray-500 space-y-3">
                     <div>
                        <span className="font-bold block mb-1 text-gray-700">[상품 정보] 선택 삭제는 무엇인가요?</span>
                        관리자 페이지에서 선택한 상품을 삭제할 수 있습니다. 삭제된 상품은 복구할 수 없습니다.
                     </div>
                     <div>
                        <span className="font-bold block mb-1 text-gray-700">[상품 정보] 메인상품진열은 무엇인가요?</span>
                        메인 페이지에 노출될 상품을 설정할 수 있습니다.
                     </div>
                </div>
            </div>
        </div>
    );
}
