"use client";

import { useState } from "react";
import { FileSpreadsheet, Settings } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { deleteProductsAction } from "@/actions/product-actions";
import { useRouter } from "next/navigation";

interface Product {
    id: string;
    code: string | null;
    name: string;
    price: number;
    supplier: { id: string; name: string } | null;
    displayStatusPC: string;
    displayStatusMobile: string;
    saleStatusPC: string;
    saleStatusMobile: string;
    stockType: string;
    stockQuantity: number;
    soldOutStatus: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    images?: { url: string }[];
}

interface Props {
    initialProducts: Product[];
}

export default function ProductTable({ initialProducts }: Props) {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const toggleSelectAll = (checked: boolean) => {
        if (checked) setSelectedIds(products.map((p) => p.id));
        else setSelectedIds([]);
    };

    const toggleSelect = (id: string, checked: boolean) => {
        if (checked) setSelectedIds([...selectedIds, id]);
        else setSelectedIds(selectedIds.filter(sid => sid !== id));
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) return alert("선택된 상품이 없습니다.");
        if (!confirm(`${selectedIds.length}개 상품을 삭제하시겠습니까?`)) return;

        setIsDeleting(true);
        const res = await deleteProductsAction(selectedIds);
        if (res.success) {
            alert(res.message);
            // Refresh list or optimistic update
            setProducts(prev => prev.filter(p => !selectedIds.includes(p.id)));
            setSelectedIds([]);
            router.refresh();
        } else {
            alert(res.message);
        }
        setIsDeleting(false);
    };

    const soldOutCount = products.filter((p) => 
        (p.stockType === 'LIMITED' && p.stockQuantity <= 0) || p.soldOutStatus === 'SOLDOUT_MANUAL'
    ).length;
    const displayedPcCount = products.filter((p) => p.displayStatusPC === 'DISPLAY').length;
    const displayedMobileCount = products.filter((p) => p.displayStatusMobile === 'DISPLAY').length;

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
                    <span>노출 : PC {displayedPcCount}개 / 모바일 {displayedMobileCount}개</span>
                </div>
                <div className="flex items-center gap-2">
                    <select className="select select-bordered select-xs rounded-sm">
                        <option>등록일 ↓</option>
                        <option>등록일 ↑</option>
                        <option>상품명 ↓</option>
                    </select>
                    <select className="select select-bordered select-xs rounded-sm">
                        <option>10개 보기</option>
                        <option>20개 보기</option>
                        <option>50개 보기</option>
                    </select>
                </div>
            </div>

            {/* Action Toolbar */}
            <div className="bg-gray-50 border p-2 flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                        <button className="px-3 py-1.5 bg-gray-600 text-white text-xs font-bold rounded-sm">상품 노출/판매 수정</button>
                        <button className="px-3 py-1.5 bg-gray-500 text-white text-xs font-bold rounded-sm">인기상품노출수정</button>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                        <button className="btn btn-xs bg-white border-gray-300 rounded-sm font-normal text-gray-700 h-8">메인상품진열</button>
                        <button className="btn btn-xs bg-white border-gray-300 rounded-sm font-normal text-gray-700 h-8">분류관리</button>
                        <button className="btn btn-xs bg-white border-gray-300 rounded-sm font-normal text-gray-700 h-8">수정일변경</button>
                        <button className="btn btn-xs bg-white border-gray-300 rounded-sm font-normal text-gray-700 h-8">품절처리</button>
                        <button className="btn btn-xs bg-white border-gray-300 rounded-sm font-normal text-gray-700 h-8">선택 복사</button>
                        <button onClick={handleDeleteSelected} disabled={isDeleting} className="btn btn-xs bg-white border-gray-300 rounded-sm font-normal text-gray-700 h-8">
                            {isDeleting ? "삭제중..." : "선택 삭제"}
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                     <button className="btn btn-xs bg-gray-600 text-white border-none rounded-sm h-8">조회항목설정</button>
                     <button className="btn btn-xs bg-green-600 text-white border-none rounded-sm flex items-center gap-1 h-8">
                        <FileSpreadsheet size={12} /> 엑셀다운로드
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border-t border-gray-300">
                <table className="table table-sm w-full text-center border-l border-r border-b">
                    <thead className="bg-gray-100 text-gray-700 border-b border-gray-300">
                        <tr>
                            <th className="w-10"><input type="checkbox" className="checkbox checkbox-xs rounded-sm" onChange={(e) => toggleSelectAll(e.target.checked)} /></th>
                            <th className="w-16">번호</th>
                            <th>상품코드</th>
                            <th>이미지</th>
                            <th className="min-w-[200px]">상품명</th>
                            <th>판매가</th>
                            <th>공급사</th>
                            <th>노출상태</th>
                            <th>판매상태</th>
                            <th>재고</th>
                            <th>등록일/수정일</th>
                            <th>수정</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {products.map((product, index: number) => (
                            <tr key={product.id} className="hover:bg-gray-50 border-b border-gray-200">
                                <td>
                                    <input 
                                        type="checkbox" 
                                        className="checkbox checkbox-xs rounded-sm" 
                                        checked={selectedIds.includes(product.id)}
                                        onChange={(e) => toggleSelect(product.id, e.target.checked)}
                                    />
                                </td>
                                <td>{products.length - index}</td>
                                <td className="font-mono text-gray-500">{product.code || product.id.substring(0,8)}</td>
                                <td>
                                    <div className="flex justify-center">
                                        <div className="w-10 h-10 border bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                            {product.images?.[0] ? (
                                                <Image 
                                                    src={product.images[0].url} 
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
                                <td className="font-bold text-gray-800">{product.price?.toLocaleString()}원</td>
                                <td className="text-gray-500">{product.supplier?.name || "-"}</td>
                                <td>
                                    <div className="space-y-1">
                                        <div>PC | <span className={product.displayStatusPC === 'DISPLAY' ? "text-blue-600" : "text-gray-400"}>
                                            {product.displayStatusPC === 'DISPLAY' ? '노출함' : '노출안함'}
                                        </span></div>
                                        <div>모바일 | <span className={product.displayStatusMobile === 'DISPLAY' ? "text-blue-600" : "text-gray-400"}>
                                            {product.displayStatusMobile === 'DISPLAY' ? '노출함' : '노출안함'}
                                        </span></div>
                                    </div>
                                </td>
                                <td>
                                    <div className="space-y-1">
                                        <div>PC | <span className={product.saleStatusPC === 'ON_SALE' ? "text-blue-600" : "text-gray-400"}>
                                            {product.saleStatusPC === 'ON_SALE' ? '판매함' : '판매안함'}
                                        </span></div>
                                        <div>모바일 | <span className={product.saleStatusMobile === 'ON_SALE' ? "text-blue-600" : "text-gray-400"}>
                                            {product.saleStatusMobile === 'ON_SALE' ? '판매함' : '판매안함'}
                                        </span></div>
                                    </div>
                                </td>
                                <td>
                                    {product.stockType === 'LIMITLESS' ? '∞' : product.stockQuantity?.toLocaleString()}
                                </td>
                                <td className="text-gray-500 text-[11px]">
                                    <div>{new Date(product.createdAt).toISOString().split('T')[0]}</div>
                                    <div>{new Date(product.updatedAt).toISOString().split('T')[0]}</div>
                                </td>
                                <td>
                                    <Link href={`/admin/products/edit/${product.id}`}>
                                        <button className="btn btn-xs btn-outline border-gray-300 text-gray-600 font-normal h-6 min-h-0 rounded-sm">수정</button>
                                    </Link>
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
