"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { getAdminsAction, deleteAdminsAction } from "@/actions/admin-actions";
import Link from "next/link";

import { Admin } from "@/generated/prisma";

export default function ManagerManagementPage() {
    // Data State
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [total, setTotal] = useState(0);
    const [_isPending, startTransition] = useTransition();

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
            });
            if (result.success) {
                setAdmins(result.items || []);
                setTotal(result.total || 0);
            }
        });
    };

    // Initial Fetch & Update on dependencies
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize, orderBy]);

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
            
                     </div>
    );
}
