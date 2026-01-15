"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Plus, ChevronDown } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { getSuppliersAction, SupplierSearchFilter, deleteSuppliersAction } from "@/actions/supplier-actions";
import { Supplier } from "@/generated/prisma";

export default function SupplierManagementPage() {
    // Data State
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [total, setTotal] = useState(0);
    const [isPending, startTransition] = useTransition();

    // Filter State
    const [filter, setFilter] = useState<SupplierSearchFilter>({
        keywordType: "integrated",
        keyword: "",
        status: "ALL",
    });
    
    // Pagination & Sorting State
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [orderBy, setOrderBy] = useState<"date_desc" | "date_asc" | "name_asc">("date_desc");

    // Checkbox State
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Fetch Data
    const fetchData = () => {
        startTransition(async () => {
            const result = await getSuppliersAction({
                page,
                pageSize,
                orderBy,
                filter,
            });
            if (result.success) {
                setSuppliers(result.items || []);
                setTotal(result.total || 0);
            }
        });
    };

    // Initial Fetch & Update on dependencies
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize, orderBy]); 

    const handleSearch = () => {
        setPage(1); // Reset to first page
        fetchData();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    // Checkbox Handlers
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(suppliers.map(a => a.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(item => item !== id));
        }
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) {
            alert("삭제할 공급사를 선택해주세요.");
            return;
        }
        if (!confirm("선택한 공급사를 정말 삭제하시겠습니까? 관련 상품 및 운영자 정보에 영향을 줄 수 있습니다.")) return;

        const result = await deleteSuppliersAction(selectedIds);
        
        if (result.success) {
            alert("삭제되었습니다.");
            setSelectedIds([]);
            fetchData(); 
        } else {
            alert(result.error || "삭제 실패");
        }
    };

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">공급사 관리</h1>
                <Link href="/admin/settings/supplier/register">
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 rounded-sm h-9 px-4 text-sm font-medium flex items-center gap-1">
                        <Plus size={14} /> 공급사 등록
                    </Button>
                </Link>
            </div>

            {/* Search Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">공급사 검색</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border-t border-gray-400 bg-white border-b border-gray-200">
                    <div className="grid grid-cols-[150px_1fr] divide-x border-b border-gray-200">
                        <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center">상태 구분</div>
                        <div className="p-3 flex items-center gap-6">
                            <RadioGroup 
                                value={filter.status} 
                                onValueChange={(v: any) => setFilter({ ...filter, status: v })}
                                className="flex items-center gap-6"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="ALL" id="status-all" />
                                    <Label htmlFor="status-all" className="font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="ACTIVE" id="status-active" />
                                    <Label htmlFor="status-active" className="font-normal cursor-pointer">정상</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="SUSPENDED" id="status-suspended" />
                                    <Label htmlFor="status-suspended" className="font-normal cursor-pointer">거래중지</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="WITHDRAWN" id="status-withdrawn" />
                                    <Label htmlFor="status-withdrawn" className="font-normal cursor-pointer">탈퇴/종료</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="grid grid-cols-[150px_1fr] divide-x">
                        <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center">검색어</div>
                        <div className="p-3 flex items-center gap-2">
                            <Select 
                                value={filter.keywordType} 
                                onValueChange={(v: any) => setFilter({ ...filter, keywordType: v })}
                            >
                                <SelectTrigger className="w-[120px] h-8 rounded-sm border-gray-300 bg-gray-50 text-xs">
                                    <SelectValue placeholder="=통합검색=" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="integrated">=통합검색=</SelectItem>
                                    <SelectItem value="code">공급사코드</SelectItem>
                                    <SelectItem value="name">공급사명</SelectItem>
                                    <SelectItem value="businessName">상호명</SelectItem>
                                    <SelectItem value="ceoName">대표자명</SelectItem>
                                    <SelectItem value="email">이메일</SelectItem>
                                    <SelectItem value="phone">전화번호</SelectItem>
                                </SelectContent>
                            </Select>
                            
                            <Input 
                                className="w-[300px] h-8 rounded-sm border-gray-300" 
                                placeholder="검색어 입력" 
                                value={filter.keyword}
                                onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced Search Toggle & Button */}
            <div className="flex flex-col items-center gap-4">
                <div className="w-full flex justify-start">
                    <button className="text-blue-500 text-xs flex items-center hover:underline">
                        상세검색 펼침 <ChevronDown size={14} />
                    </button>
                </div>
                <Button 
                    className="bg-[#4B5563] hover:bg-[#374151] text-white rounded-sm h-10 px-10 text-sm font-medium rounded-none"
                    onClick={handleSearch}
                    disabled={isPending}
                >
                    {isPending ? "검색 중..." : "검색"}
                </Button>
            </div>

            {/* List Section */}
            <div className="space-y-2 pt-8">
                <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-600">
                        검색 <span className="text-red-500 font-bold">{total}</span>개 / 
                        전체 <span className="text-red-500 font-bold">{total}</span>개
                    </div>
                    <div className="flex items-center gap-1">
                        <Select 
                            value={orderBy}
                            onValueChange={(v: any) => setOrderBy(v)}
                        >
                            <SelectTrigger className="w-[100px] h-8 rounded-sm border-gray-300 text-xs">
                                <SelectValue placeholder="등록일 ↓" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date_desc">등록일 ↓</SelectItem>
                                <SelectItem value="date_asc">등록일 ↑</SelectItem>
                                <SelectItem value="name_asc">가나다순</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select 
                            value={String(pageSize)}
                            onValueChange={(v) => setPageSize(Number(v))}
                        >
                            <SelectTrigger className="w-[100px] h-8 rounded-sm border-gray-300 text-xs">
                                <SelectValue placeholder="10개 보기" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10개 보기</SelectItem>
                                <SelectItem value="20">20개 보기</SelectItem>
                                <SelectItem value="50">50개 보기</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="border-t border-gray-400">
                    <table className="w-full text-center text-xs">
                        <thead className="bg-[#A6A6A6] text-white font-normal">
                            <tr>
                                <th className="py-2 w-10 border-r border-gray-400">
                                    <div className="flex justify-center">
                                        <Checkbox 
                                            className="bg-white border-white data-[state=checked]:text-black w-4 h-4 rounded-sm" 
                                            checked={suppliers.length > 0 && selectedIds.length === suppliers.length}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </div>
                                </th>
                                <th className="py-2 w-12 border-r border-gray-400">번호</th>
                                <th className="py-2 w-24 border-r border-gray-400">상태</th>
                                <th className="py-2 border-r border-gray-400">공급사명(코드)</th>
                                <th className="py-2 w-32 border-r border-gray-400">상호/대표자</th>
                                <th className="py-2 w-24 border-r border-gray-400">사업자번호</th>
                                <th className="py-2 w-32 border-r border-gray-400">연락처</th>
                                <th className="py-2 w-24 border-r border-gray-400">등록일</th>
                                <th className="py-2 w-20">관리</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 border-b border-gray-300">
                            {suppliers.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="py-10 text-gray-500">
                                        검색된 공급사가 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                suppliers.map((supplier, index) => (
                                    <tr key={supplier.id} className="hover:bg-gray-50">
                                        <td className="py-3 border-r border-gray-200">
                                            <div className="flex justify-center">
                                                <Checkbox 
                                                    className="border-gray-300 w-4 h-4 rounded-sm" 
                                                    checked={selectedIds.includes(supplier.id)}
                                                    onCheckedChange={(checked) => handleSelectOne(supplier.id, checked as boolean)}
                                                />
                                            </div>
                                        </td>
                                        <td className="py-3 border-r border-gray-200">
                                            {total - ((page - 1) * pageSize) - index}
                                        </td>
                                        <td className="py-3 border-r border-gray-200">
                                            {supplier.status === "ACTIVE" ? "정상" : 
                                             supplier.status === "SUSPENDED" ? <span className="text-red-500">중지</span> : "탈퇴"}
                                        </td>
                                        <td className="py-3 border-r border-gray-200 text-left px-4">
                                            <div className="font-medium text-blue-600">{supplier.name}</div>
                                            <div className="text-gray-400 text-[11px]">{supplier.code}</div>
                                        </td>
                                        <td className="py-3 border-r border-gray-200">
                                            {supplier.businessName || "-"}<br/>
                                            {supplier.ceoName && <span className="text-gray-500">({supplier.ceoName})</span>}
                                        </td>
                                        <td className="py-3 border-r border-gray-200">
                                            {supplier.businessNo || "-"}
                                        </td>
                                        <td className="py-3 border-r border-gray-200">
                                            {supplier.phone || "-"}<br/>
                                            {supplier.email && <span className="text-gray-500">{supplier.email}</span>}
                                        </td>
                                        <td className="py-3 border-r border-gray-200 text-gray-600">
                                            {new Date(supplier.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-3">
                                            <Link href={`/admin/settings/supplier/${supplier.id}`}>
                                                <Button variant="outline" size="sm" className="h-6 text-xs px-2 bg-white hover:bg-gray-50 border-gray-300 text-gray-600">
                                                    수정
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center gap-1 pt-2">
                     <Button 
                        variant="outline" 
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm h-8 px-3 text-xs"
                        onClick={handleDelete}
                    >
                        선택삭제
                    </Button>
                </div>

                {/* Pagination */}
                 <div className="flex justify-center mt-6 gap-1">
                    {Array.from({ length: Math.ceil(total / pageSize) || 1 }, (_, i) => i + 1).map((p) => (
                        <Button 
                            key={p}
                            variant="ghost" 
                            className={`h-8 w-8 p-0 rounded-none ${page === p ? 'bg-[#4B5563] text-white hover:bg-[#374151]' : 'hover:bg-gray-100'}`}
                            onClick={() => setPage(p)}
                        >
                            {p}
                        </Button>
                    ))}
                </div>
            </div>
            
             {/* Floating Actions */}
             <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button onClick={() => window.scrollTo(0, 0)} className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    ↑
                </Button>
                <Button onClick={() => window.scrollTo(0, 9999)} className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    ↓
                </Button>
            </div>
        </div>
    );
}
