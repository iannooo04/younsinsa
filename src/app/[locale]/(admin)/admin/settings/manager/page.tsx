"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Plus, ChevronDown } from "lucide-react";
import { useState, useEffect, useTransition, useCallback } from "react";
import { getAdminsAction, AdminSearchFilter, deleteAdminsAction } from "@/actions/admin-actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";

import { getSuppliersAction } from "@/actions/supplier-actions";
import { Admin, Supplier } from "@/generated/prisma";
import { X } from "lucide-react";

export default function ManagerManagementPage() {
    const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
    const [isDetailedSearchOpen, setIsDetailedSearchOpen] = useState(false);
    
    // Data State
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [total, setTotal] = useState(0);
    const [isPending, startTransition] = useTransition();

    // Supplier Dialog State
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [supplierTotal, setSupplierTotal] = useState(0);
    const [supplierPage, setSupplierPage] = useState(1);
    const [supplierKeyword, setSupplierKeyword] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState<{id: string, name: string} | null>(null);

    // Filter State
    const [filter, setFilter] = useState<AdminSearchFilter>({
        supplyType: "all",
        supplierId: undefined,
        keywordType: "integrated",
        matchType: "partial",
        keyword: "",
    });
    
    // ... existing pagination state ...
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [orderBy, setOrderBy] = useState<"date_desc" | "date_asc" | "last_login_desc" | "last_login_asc">("date_desc");

    // Checkbox State
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Fetch Data
    const fetchData = () => {
        startTransition(async () => {
            const result = await getAdminsAction({
                page,
                pageSize,
                orderBy,
                filter,
            });
            if (result.success) {
                setAdmins(result.items || []);
                setTotal(result.total || 0);
            }
        });
    };

    // Fetch Suppliers
    const fetchSuppliers = useCallback(async (page = 1) => {
        const result = await getSuppliersAction({
            page,
            pageSize: 5,
            orderBy: "name_asc",
            filter: {
                keyword: supplierKeyword,
                keywordType: "integrated",
                status: "ACTIVE"
            }
        });
        if (result.success) {
            setSuppliers(result.items || []);
            setSupplierTotal(result.total || 0);
            setSupplierPage(page);
        }
    }, [supplierKeyword]);

    // Effect for Suppliers (when dialog opens or keyword changes)
    useEffect(() => {
        if (isSupplierDialogOpen) {
            fetchSuppliers(1);
        }
    }, [isSupplierDialogOpen, supplierKeyword, fetchSuppliers]);

    // Initial Fetch & Update on dependencies
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize, orderBy, filter]); // Added filter to dependencies

    const handleSearch = () => {
        setPage(1); // Reset to first page
        fetchData();
    };
    
    // ... setup handlers ...
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    // ... Checkbox Handlers ... (keep existing)
     const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(admins.map(a => a.id));
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
            alert("삭제할 운영자를 선택해주세요.");
            return;
        }
        if (!confirm("선택한 운영자를 정말 삭제하시겠습니까?")) return;

        const result = await deleteAdminsAction(selectedIds);
        
        if (result.success) {
            alert("삭제되었습니다.");
            setSelectedIds([]);
            fetchData(); 
        } else {
            alert(result.error || "삭제 실패");
        }
    };

    const selectSupplier = (supplier: Supplier) => {
        setSelectedSupplier({ id: supplier.id, name: supplier.name });
        setFilter(prev => ({ ...prev, supplierId: supplier.id, supplyType: "supplier" }));
        setIsSupplierDialogOpen(false);
    };

    const clearSupplierSelection = () => {
        setSelectedSupplier(null);
        setFilter(prev => ({ ...prev, supplierId: undefined }));
    }

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header ... */}
             <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">운영자 관리</h1>
                <Link href="/admin/settings/manager/register">
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 rounded-sm h-9 px-4 text-sm font-medium flex items-center gap-1">
                        <Plus size={14} /> 운영자 등록
                    </Button>
                </Link>
            </div>

            {/* Search Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">운영자 검색</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border-t border-gray-400 bg-white border-b border-gray-200">
                    <div className="grid grid-cols-[150px_1fr] divide-x border-b border-gray-200">
                        <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center">공급사 구분</div>
                        <div className="p-3 flex items-center gap-6">
                            <RadioGroup 
                                value={filter.supplyType} 
                                onValueChange={(v) => {
                                    setFilter({ ...filter, supplyType: v as AdminSearchFilter['supplyType'] });
                                    if (v === 'supplier') {
                                        setIsSupplierDialogOpen(true);
                                    } else {
                                        clearSupplierSelection();
                                    }
                                }}
                                className="flex items-center gap-6"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="all" id="type-all" />
                                    <Label htmlFor="type-all" className="font-normal cursor-pointer">전체</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="headquarters" id="type-hq" />
                                    <Label htmlFor="type-hq" className="font-normal cursor-pointer">본사</Label>
                                </div>
                                <div className="flex items-center gap-2" onClickCapture={() => setIsSupplierDialogOpen(true)}>
                                    <RadioGroupItem value="supplier" id="type-supplier" />
                                    <Label 
                                        htmlFor="type-supplier" 
                                        className="font-normal cursor-pointer"
                                        onClick={() => setIsSupplierDialogOpen(true)}
                                    >
                                        공급사
                                    </Label>
                                </div>
                            </RadioGroup>
                             
                             <div className="flex items-center gap-2">
                                {selectedSupplier && (
                                    <span className="text-blue-600 font-medium text-xs border border-blue-200 bg-blue-50 px-2 py-1 rounded-sm flex items-center gap-1">
                                        {selectedSupplier.name}
                                        <X size={12} className="cursor-pointer" onClick={clearSupplierSelection} />
                                    </span>
                                )}
                                <Dialog open={isSupplierDialogOpen} onOpenChange={setIsSupplierDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button 
                                            variant="secondary" 
                                            size="sm" 
                                            className="h-7 text-xs bg-gray-400 text-white hover:bg-gray-500 border-0 rounded-sm"
                                        >
                                            공급사 선택
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-[500px] p-0 gap-0">
                                        <DialogHeader className="p-4 border-b">
                                            <DialogTitle className="text-lg font-bold">공급사 검색</DialogTitle>
                                        </DialogHeader>
                                        <div className="p-4 space-y-4">
                                            <div className="flex gap-2">
                                                <Input 
                                                    placeholder="공급사명 또는 코드 검색" 
                                                    value={supplierKeyword}
                                                    onChange={(e) => setSupplierKeyword(e.target.value)}
                                                    className="h-9 text-sm"
                                                />
                                                <Button onClick={() => fetchSuppliers(1)} className="h-9 bg-gray-700 hover:bg-gray-800">검색</Button>
                                            </div>
                                            
                                            <div className="border border-gray-200 rounded-sm max-h-[300px] overflow-y-auto">
                                                <table className="w-full text-left text-xs">
                                                    <thead className="bg-gray-50 font-medium text-gray-600 sticky top-0">
                                                        <tr>
                                                            <th className="p-2 border-b">공급사명</th>
                                                            <th className="p-2 border-b">코드</th>
                                                            <th className="p-2 border-b w-16">선택</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {suppliers.length === 0 ? (
                                                            <tr><td colSpan={3} className="p-4 text-center text-gray-500">검색 결과가 없습니다.</td></tr>
                                                        ) : (
                                                            suppliers.map(sup => (
                                                                <tr key={sup.id} className="border-b hover:bg-gray-50">
                                                                    <td className="p-2">{sup.name}</td>
                                                                    <td className="p-2 text-gray-500">{sup.code || "-"}</td>
                                                                    <td className="p-2">
                                                                        <Button size="sm" onClick={() => selectSupplier(sup)} className="h-6 text-xs bg-blue-500 hover:bg-blue-600">
                                                                            선택
                                                                        </Button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                            
                                            <div className="flex justify-center gap-1">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    disabled={supplierPage <= 1}
                                                    onClick={() => fetchSuppliers(supplierPage - 1)}
                                                >
                                                    &lt;
                                                </Button>
                                                <span className="flex items-center text-xs text-gray-500">
                                                    {supplierPage} / {Math.ceil(supplierTotal / 5) || 1}
                                                </span>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    disabled={supplierPage >= Math.ceil(supplierTotal / 5)}
                                                    onClick={() => fetchSuppliers(supplierPage + 1)}
                                                >
                                                    &gt;
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                             </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-[150px_1fr] divide-x border-b border-gray-200">
                        <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center">검색어</div>
                        <div className="p-3 flex items-center gap-2">
                            <Select 
                                value={filter.keywordType} 
                                onValueChange={(v) => setFilter({ ...filter, keywordType: v as AdminSearchFilter['keywordType'] })}
                            >
                                <SelectTrigger className="w-[120px] h-8 rounded-sm border-gray-300 bg-gray-50 text-xs text-gray-600">
                                    <SelectValue placeholder="=통합검색=" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="integrated">=통합검색=</SelectItem>
                                    <SelectItem value="id">아이디</SelectItem>
                                    <SelectItem value="name">이름</SelectItem>
                                    <SelectItem value="email">이메일</SelectItem>
                                    <SelectItem value="nickname">닉네임</SelectItem>
                                    <SelectItem value="phone">전화번호</SelectItem>
                                    <SelectItem value="mobile">휴대폰번호</SelectItem>
                                </SelectContent>
                            </Select>
                            
                            <Select 
                                value={filter.matchType}
                                onValueChange={(v) => setFilter({ ...filter, matchType: v as AdminSearchFilter['matchType'] })}
                            >
                                <SelectTrigger className="w-[140px] h-8 rounded-sm border-gray-300 bg-white text-xs text-gray-600">
                                    <SelectValue placeholder="검색어 전체일치" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="exact">검색어 전체일치</SelectItem>
                                    <SelectItem value="partial">검색어 부분포함</SelectItem>
                                </SelectContent>
                            </Select>

                            <Input 
                                className="w-[300px] h-8 rounded-sm border-gray-300 placeholder:text-gray-400" 
                                placeholder="검색어 전체를 정확히 입력하세요." 
                                value={filter.keyword}
                                onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>

                     {/* Expanded Fields */}
                     {isDetailedSearchOpen && (
                        <>
                            <div className="grid grid-cols-[150px_1fr] divide-x border-b border-gray-200">
                                <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center">장기 미로그인</div>
                                <div className="p-3 flex items-center gap-2">
                                     <div className="flex items-center gap-2">
                                        <Checkbox id="long-term-login" className="border-gray-300 rounded-sm w-4 h-4" />
                                        <Label htmlFor="long-term-login" className="font-normal text-gray-700 cursor-pointer">
                                            장기 미로그인 운영자 <span className="text-blue-500">(설정된 장기 미로그인 기간 : 1년)</span>
                                        </Label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-[150px_1fr] divide-x border-b border-gray-200">
                                <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center">
                                    SMS 자동발송<br/>수신설정
                                </div>
                                <div className="p-3 flex items-center gap-6">
                                     <RadioGroup defaultValue="all" className="flex items-center gap-6">
                                        {['전체', 'SMS 수신안함', '주문.배송 관련', '회원 관련', '프로모션 관련', '게시판 관련'].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <RadioGroupItem value={item} id={`sms-${idx}`} className="border-gray-300 text-[#c13030]" />
                                                <Label htmlFor={`sms-${idx}`} className="font-normal cursor-pointer text-gray-700">{item}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="grid grid-cols-[150px_1fr_150px_1fr] border-b border-gray-200">
                                {/* Employee Status Row */}
                                <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center border-r border-b border-gray-200">직원여부</div>
                                <div className="p-3 flex items-center border-r border-b border-gray-200">
                                    <RadioGroup defaultValue="all" className="flex items-center gap-6">
                                        {['전체', '직원', '비정규직', '아르바이트', '파견직', '퇴사자'].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <RadioGroupItem value={item} id={`emp-${idx}`} className="border-gray-300 text-[#c13030]" />
                                                <Label htmlFor={`emp-${idx}`} className="font-normal cursor-pointer text-gray-700 whitespace-nowrap">{item}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                                <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center border-r border-b border-gray-200">부서</div>
                                <div className="p-3 flex items-center border-b border-gray-200">
                                     <Select>
                                        <SelectTrigger className="w-[180px] h-8 rounded-sm border-gray-300 text-xs text-gray-600">
                                            <SelectValue placeholder="=부서 선택=" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">=부서 선택=</SelectItem>
                                            <SelectItem value="executive">임원</SelectItem>
                                            <SelectItem value="finance_accounting">재무회계팀</SelectItem>
                                            <SelectItem value="development">개발팀</SelectItem>
                                            <SelectItem value="design">디자인팀</SelectItem>
                                            <SelectItem value="planning">기획팀</SelectItem>
                                            <SelectItem value="operations_support">운영지원팀</SelectItem>
                                            <SelectItem value="marketing">마케팅팀</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Rank/Duty Row */}
                                <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center border-r border-gray-200">직급</div>
                                <div className="p-3 flex items-center border-r border-gray-200">
                                     <Select>
                                        <SelectTrigger className="w-[180px] h-8 rounded-sm border-gray-300 text-xs text-gray-600">
                                            <SelectValue placeholder="=직급 선택=" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">=직급 선택=</SelectItem>
                                            <SelectItem value="chairman">회장</SelectItem>
                                            <SelectItem value="president">사장</SelectItem>
                                            <SelectItem value="vp">전무</SelectItem>
                                            <SelectItem value="director">상무</SelectItem>
                                            <SelectItem value="board_member">이사</SelectItem>
                                            <SelectItem value="general_manager">부장</SelectItem>
                                            <SelectItem value="deputy_general_manager">차장</SelectItem>
                                            <SelectItem value="manager">과장</SelectItem>
                                            <SelectItem value="assistant_manager">대리</SelectItem>
                                            <SelectItem value="chief">주임</SelectItem>
                                            <SelectItem value="staff">사원</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="p-3 bg-gray-50 font-medium text-gray-700 flex items-center border-r border-gray-200">직책</div>
                                <div className="p-3 flex items-center">
                                     <Select>
                                        <SelectTrigger className="w-[180px] h-8 rounded-sm border-gray-300 text-xs text-gray-600">
                                            <SelectValue placeholder="=직책 선택=" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">=직책 선택=</SelectItem>
                                            <SelectItem value="chairman">회장</SelectItem>
                                            <SelectItem value="president">사장</SelectItem>
                                            <SelectItem value="division_head">본부장</SelectItem>
                                            <SelectItem value="team_leader">팀장</SelectItem>
                                            <SelectItem value="department_head">부서장</SelectItem>
                                            <SelectItem value="staff">사원</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </>
                     )}
                </div>
            </div>

            {/* Advanced Search Toggle & Button */}
            <div className="flex flex-col items-center gap-4">
                <div className="w-full flex justify-start">
                    <button 
                        className="text-blue-500 text-xs flex items-center hover:underline"
                        onClick={() => setIsDetailedSearchOpen(!isDetailedSearchOpen)}
                    >
                        {isDetailedSearchOpen ? "상세검색 닫기" : "상세검색 펼침"} 
                        {isDetailedSearchOpen ? <ChevronDown className="rotate-180 ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
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
                        전체 <span className="text-red-500 font-bold">{total}</span>개 | 
                        장기 미로그인 운영자 <span className="text-red-500 font-bold">0</span>개
                    </div>
                    <div className="flex items-center gap-1">
                        <Select 
                            value={orderBy}
                            onValueChange={(v) => setOrderBy(v as "date_desc" | "date_asc" | "last_login_desc" | "last_login_asc")}
                        >
                            <SelectTrigger className="w-[200px] h-8 rounded-sm border-gray-300 text-xs">
                                <SelectValue placeholder="등록일 ↓" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date_desc">등록일 ↓</SelectItem>
                                <SelectItem value="date_asc">등록일 ↑</SelectItem>
                                <SelectItem value="last_login_desc">최종 로그인 ↓</SelectItem>
                                <SelectItem value="last_login_asc">최종 로그인 ↑</SelectItem>
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
                                <SelectItem value="30">30개 보기</SelectItem>
                                <SelectItem value="40">40개 보기</SelectItem>
                                <SelectItem value="50">50개 보기</SelectItem>
                                <SelectItem value="60">60개 보기</SelectItem>
                                <SelectItem value="70">70개 보기</SelectItem>
                                <SelectItem value="80">80개 보기</SelectItem>
                                <SelectItem value="90">90개 보기</SelectItem>
                                <SelectItem value="100">100개 보기</SelectItem>
                                <SelectItem value="200">200개 보기</SelectItem>
                                <SelectItem value="300">300개 보기</SelectItem>
                                <SelectItem value="500">500개 보기</SelectItem>
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
                                            checked={admins.length > 0 && selectedIds.length === admins.length}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </div>
                                </th>
                                <th className="py-2 w-12 border-r border-gray-400">번호</th>
                                <th className="py-2 w-24 border-r border-gray-400">공급사 구분</th>
                                <th className="py-2 border-r border-gray-400">아이디/닉네임</th>
                                <th className="py-2 w-24 border-r border-gray-400">이름</th>
                                <th className="py-2 w-20 border-r border-gray-400">직원여부</th>
                                <th className="py-2 w-32 border-r border-gray-400">직원/부서/직급/직책</th>
                                <th className="py-2 w-32 border-r border-gray-400">연락처</th>
                                <th className="py-2 w-24 border-r border-gray-400">등록일</th>
                                <th className="py-2 w-24 border-r border-gray-400">최종로그인</th>
                                <th className="py-2 w-16">정보수정</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 border-b border-gray-300">
                            {admins.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="py-10 text-gray-500">
                                        검색된 운영자가 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                admins.map((admin, index) => (
                                    <tr key={admin.id} className="hover:bg-gray-50">
                                        <td className="py-3 border-r border-gray-200">
                                            <div className="flex justify-center">
                                                <Checkbox 
                                                    className="border-gray-300 w-4 h-4 rounded-sm" 
                                                    checked={selectedIds.includes(admin.id)}
                                                    onCheckedChange={(checked) => handleSelectOne(admin.id, checked as boolean)}
                                                />
                                            </div>
                                        </td>
                                        <td className="py-3 border-r border-gray-200">
                                            {total - ((page - 1) * pageSize) - index}
                                        </td>
                                        <td className="py-3 border-r border-gray-200">
                                            {admin.type === "SUPPLIER" ? "공급사" : "본사"}
                                        </td>
                                        <td className="py-3 border-r border-gray-200 text-left px-4">
                                            <div>{admin.userId}</div>
                                            {admin.type === "SUPER" && (
                                                <span className="text-blue-500 font-medium">(최고운영자)</span>
                                            )}
                                            {admin.nickname && <div className="text-gray-500">/ {admin.nickname}</div>}
                                        </td>
                                        <td className="py-3 border-r border-gray-200">{admin.name}</td>
                                        <td className="py-3 border-r border-gray-200">
                                            {admin.isEmployee ? "직원" : "-"}
                                        </td>
                                        <td className="py-3 border-r border-gray-200">
                                            {admin.department || "-"}/{admin.position || "-"}/{admin.duty || "-"}
                                        </td>
                                        <td className="py-3 border-r border-gray-200">
                                            {admin.mobile || "-"}<br/>
                                            <span className="text-gray-500">{admin.email}</span>
                                        </td>
                                        <td className="py-3 border-r border-gray-200 text-gray-600">
                                            {new Date(admin.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 border-r border-gray-200 text-gray-600">
                                            {admin.lastLoginAt ? new Date(admin.lastLoginAt).toLocaleDateString() : "-"}
                                        </td>
                                        <td className="py-3">
                                            <Link href={`/admin/settings/manager/${admin.id}`}>
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
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm h-8 px-3 text-xs">
                        선택 로그인 제한처리
                    </Button>
                </div>

                {/* Pagination (Simple Implementation) */}
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
                <Button className="rounded-full w-12 h-12 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px]">YouTube</span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-[#6E36E2] hover:bg-[#6E36E2]/90 shadow-lg text-white p-0 flex flex-col items-center justify-center border-0 gap-0">
                    <span className="text-[10px] leading-none">따라</span>
                    <span className="text-[10px] leading-none">하기</span>
                </Button>
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
