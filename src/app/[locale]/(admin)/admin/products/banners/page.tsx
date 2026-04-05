"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/ui-table";
import { Plus } from "lucide-react";
import { getBannersAction, deleteBannersAction } from "@/actions/banner-actions";
import { format } from "date-fns";
import Image from "next/image";

export default function BannerListPage() {
    // Data State
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [items, setItems] = useState<any[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Pagination State
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Filter State
    const [keyword, _setKeyword] = useState('');
    const [targetGroup, setTargetGroup] = useState('all');
    const [isActive, _setIsActive] = useState('all');
    const [sort, setSort] = useState('orderAsc');
    
    // Selection State
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Trigger for refetching
    const [searchTrigger, setSearchTrigger] = useState(0);

    // Fetch Data
    const fetchData = useCallback(async () => {
        setLoading(true);
        const result = await getBannersAction(page, pageSize, {
            keyword,
            targetGroup,
            isActive,
            sort
        });

        if (result.success) {
            setItems(result.items || []);
            setTotalCount(result.totalCount || 0);
        }
        setLoading(false);
    }, [page, pageSize, keyword, targetGroup, isActive, sort]);

    useEffect(() => {
        fetchData();
    }, [fetchData, searchTrigger]);

    const _handleSearch = () => {
        setPage(1);
        setSearchTrigger(prev => prev + 1);
    };

    // Selection Handlers
    const handleCheckboxChange = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(item => item !== id));
        }
    };

    const handleSelectPage = (checked: boolean) => {
        if (checked) {
            setSelectedIds(items.map(p => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    // Bulk Delete
    const handleDelete = async () => {
        if (selectedIds.length === 0) return alert("삭제할 배너를 선택해주세요.");
        if (!confirm("선택한 배너를 삭제하시겠습니까?")) return;

        const result = await deleteBannersAction(selectedIds);
        alert(result.message);
        if (result.success) {
            setSelectedIds([]);
            fetchData();
        }
    };

    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">메인 배너 관리</h1>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 font-bold h-9 w-32 rounded-sm" onClick={() => window.location.href='/admin/products/banners/create'}>
                    <Plus size={16} className="mr-1" /> 배너 등록
                </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 border-b border-gray-200 pb-4">
                {[{id: 'all', label: '전체'}, {id: 'home', label: '홈'}, {id: 'golf', label: '골프'}, {id: 'player', label: '플레이어'}, {id: 'women', label: '우먼'}].map((cat) => (
                    <Button 
                        key={cat.id} 
                        variant={targetGroup === cat.id ? "default" : "outline"} 
                        className={`h-8 px-5 rounded-full text-xs font-bold ${targetGroup === cat.id ? 'bg-gray-900 text-white hover:bg-gray-800' : 'text-gray-600 bg-white hover:bg-gray-50 border-gray-300'}`}
                        onClick={() => { setTargetGroup(cat.id); setPage(1); }}
                    >
                        {cat.label}
                    </Button>
                ))}
            </div>

            {/* List Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-gray-800">
                        검색 <span className="text-red-500">{totalCount}</span>개 / 전체 <span className="text-red-500">{totalCount}</span>개
                    </div>
                    <div className="flex items-center gap-2">
                        <Select value={sort} onValueChange={setSort}>
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="노출순서 ↑" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="regDesc">등록일 ↓</SelectItem>
                                <SelectItem value="regAsc">등록일 ↑</SelectItem>
                                <SelectItem value="orderAsc">노출순서 ↑</SelectItem>
                                <SelectItem value="orderDesc">노출순서 ↓</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={pageSize.toString()} onValueChange={(v) => { setPageSize(Number(v)); setPage(1); }}>
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="10개 보기" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10개 보기</SelectItem>
                                <SelectItem value="20">20개 보기</SelectItem>
                                <SelectItem value="30">30개 보기</SelectItem>
                                <SelectItem value="50">50개 보기</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="border-t-2 border-gray-800 border-b border-gray-300">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#A4A4A4]/20 hover:bg-[#A4A4A4]/20 text-xs text-center font-bold text-gray-700 h-10 whitespace-nowrap">
                                <TableHead className="w-10 text-center p-0">
                                    <Checkbox 
                                        className="translate-y-[2px]" 
                                        checked={items.length > 0 && selectedIds.length === items.length}
                                        onCheckedChange={handleSelectPage}
                                    />
                                </TableHead>
                                <TableHead className="w-16 text-center border-l border-gray-300">순서</TableHead>
                                <TableHead className="w-24 text-center border-l border-gray-300">이미지</TableHead>
                                <TableHead className="text-center border-l border-gray-300 text-left pl-4">배너명 / 설명</TableHead>
                                <TableHead className="w-24 text-center border-l border-gray-300">노출그룹</TableHead>
                                <TableHead className="w-24 text-center border-l border-gray-300">상태</TableHead>
                                <TableHead className="w-48 text-center border-l border-gray-300">노출 기간</TableHead>
                                <TableHead className="w-32 text-center border-l border-gray-300">등록일</TableHead>
                                <TableHead className="w-20 text-center border-l border-gray-300">관리</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="h-40 text-center text-gray-500">로딩중...</TableCell>
                                </TableRow>
                            ) : items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="h-40 text-center text-gray-500">등록된 배너가 없습니다.</TableCell>
                                </TableRow>
                            ) : (
                                items.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50 text-center text-xs text-gray-600 border-b border-gray-200">
                                        <TableCell className="p-0 text-center">
                                            <Checkbox 
                                                className="translate-y-[2px]" 
                                                checked={selectedIds.includes(item.id)}
                                                onCheckedChange={(checked) => handleCheckboxChange(item.id, !!checked)}
                                            />
                                        </TableCell>
                                        <TableCell className="text-gray-500 font-bold border-l border-gray-200">{item.displayOrder}</TableCell>
                                        <TableCell className="border-l border-gray-200 p-2 text-center">
                                            {item.pcImage ? (
                                                <div className="relative w-[100px] h-[40px] mx-auto border border-gray-100 bg-gray-100 rounded overflow-hidden">
                                                    <Image src={item.pcImage} alt={item.title} fill className="object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-[80px] h-[30px] mx-auto bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">No Image</div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-left pl-4 border-l border-gray-200">
                                            <div className="font-bold text-gray-800 text-[13px]">{item.title}</div>
                                            {item.description && <div className="text-gray-500 mt-0.5">{item.description}</div>}
                                            {item.linkUrl && <a href={item.linkUrl} target="_blank" className="text-blue-500 hover:underline text-[11px] mt-1 block max-w-sm truncate">{item.linkUrl}</a>}
                                        </TableCell>
                                        <TableCell className="border-l border-gray-200 font-bold text-teal-600">{item.targetGroup.toUpperCase()}</TableCell>
                                        <TableCell className="border-l border-gray-200">
                                            {item.isActive 
                                                ? <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">노출함</span> 
                                                : <span className="text-red-500 bg-red-50 px-2 py-1 rounded">노출안함</span>
                                            }
                                        </TableCell>
                                        <TableCell className="border-l border-gray-200 text-gray-500">
                                            {!item.startDate && !item.endDate ? "상시 노출" : (
                                                <div className="space-y-1">
                                                    <div>{item.startDate ? format(new Date(item.startDate), 'yyyy-MM-dd HH:mm') : '상시'}</div>
                                                    <div>~ {item.endDate ? format(new Date(item.endDate), 'yyyy-MM-dd HH:mm') : '상시'}</div>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="border-l border-gray-200 text-gray-500">
                                            {format(new Date(item.createdAt), 'yyyy-MM-dd')}
                                        </TableCell>
                                        <TableCell className="border-l border-gray-200">
                                            <Button 
                                                variant="outline" 
                                                className="h-7 text-xs px-3 bg-white hover:bg-gray-50 border-gray-300" 
                                                onClick={() => window.location.href=`/admin/products/banners/${item.id}`}
                                            >
                                                수정
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                
                 {/* Delete & Pagination */}
                 <div className="flex justify-between items-center mt-4 relative">
                    <div className="w-[120px] shrink-0">
                        <Button 
                            variant="outline" 
                            onClick={handleDelete}
                            disabled={selectedIds.length === 0}
                            className={`h-8 text-xs transition-colors relative z-10 ${selectedIds.length > 0 ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700' : 'bg-white text-gray-400 border-gray-200 cursor-not-allowed'}`}
                        >
                            선택 삭제
                        </Button>
                    </div>
                    {/* Pagination perfectly centered and not overlapping */}
                    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                        <div className="flex gap-1 pointer-events-auto">
                        <Button 
                            variant="outline" 
                            disabled={page === 1} 
                            onClick={() => setPage(1)}
                            className="h-8 w-8 p-0 text-gray-500 border-gray-300 rounded-sm bg-white hover:bg-gray-50"
                        >{"<<"}</Button>
                        <Button 
                            variant="outline" 
                            disabled={page === 1} 
                            onClick={() => setPage(p => Math.max(1, p-1))}
                            className="h-8 w-8 p-0 text-gray-500 border-gray-300 rounded-sm bg-white hover:bg-gray-50"
                        >{"<"}</Button>
                        
                         {Array.from({ length: totalPages || 1 }, (_, i) => i + 1)
                            .filter(p => p >= page - 2 && p <= page + 2)
                            .map(p => (
                            <Button 
                                key={p} 
                                variant={p === page ? "default" : "outline"}
                                onClick={() => setPage(p)}
                                className={`h-8 w-8 p-0 rounded-sm ${p === page ? "bg-gray-600 text-white font-bold border-gray-600 hover:bg-gray-700" : "text-gray-500 border-gray-300 bg-white hover:bg-gray-50"}`}
                            >
                                {p}
                            </Button>
                         ))}

                         <Button 
                            variant="outline" 
                            disabled={page >= (totalPages || 1)} 
                            onClick={() => setPage(p => Math.min(totalPages || 1, p+1))}
                            className="h-8 w-8 text-xs text-gray-500 border-gray-300 rounded-sm bg-white hover:bg-gray-50"
                        >{">"}</Button>
                         <Button 
                            variant="outline" 
                            disabled={page >= (totalPages || 1)} 
                            onClick={() => setPage(totalPages || 1)}
                            className="h-8 w-8 text-xs text-gray-500 border-gray-300 rounded-sm bg-white hover:bg-gray-50"
                        >{">>"}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
