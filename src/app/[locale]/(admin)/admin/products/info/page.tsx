"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/ui-table";
import { CalendarIcon, Youtube, ChevronUp, Book, Plus, FileSpreadsheet } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getEssentialInfoTemplatesAction,    deleteEssentialInfoTemplatesAction,
    copyEssentialInfoTemplatesAction,
} from "@/actions/product-essential-info-actions";
import SupplierPopup from "@/components/admin/SupplierPopup";

export default function ProductEssentialInfoPage() {
    const [isPending, startTransition] = useTransition();
    interface EssentialInfo {
        id: string;
        name: string;
        supplierName: string;
        regDate: string;
        modDate: string;
    }
    const [essentialInfos, setEssentialInfos] = useState<EssentialInfo[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [supplierType, setSupplierType] = useState("all");
    const [keyword, setKeyword] = useState("");
    const [isSupplierPopupOpen, setIsSupplierPopupOpen] = useState(false);
    const [selectedSuppliers, setSelectedSuppliers] = useState<{ id: string, name: string }[]>([]);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        setLoading(true);
        const res = await getEssentialInfoTemplatesAction();
        if (res.success) {
            setEssentialInfos(res.items || []);
        }
        setLoading(false);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds(essentialInfos.map(t => t.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelect = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedIds(prev => [...prev, id]);
        } else {
            setSelectedIds(prev => prev.filter(i => i !== id));
        }
    };

    const handleDelete = async () => {
        if (selectedIds.length === 0) return alert("선택된 정보가 없습니다.");
        if (!confirm("선택한 정보를 삭제하시겠습니까?")) return;

        startTransition(async () => {
            const res = await deleteEssentialInfoTemplatesAction(selectedIds);
            if (res.success) {
                alert("삭제되었습니다.");
                setSelectedIds([]);
                fetchTemplates();
            } else {
                alert(res.error || "삭제 실패");
            }
        });
    };

    const handleCopy = async () => {
        if (selectedIds.length === 0) return alert("선택된 정보가 없습니다.");
        if (!confirm("선택한 정보를 복사하시겠습니까?")) return;

        startTransition(async () => {
            const res = await copyEssentialInfoTemplatesAction(selectedIds);
            if (res.success) {
                alert("복사되었습니다.");
                setSelectedIds([]);
                fetchTemplates();
            } else {
                alert(res.error || "복사 실패");
            }
        });
    };

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">상품 필수정보 관리</h1>
                <Link href="/admin/products/info/create">
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 h-9 px-4 font-medium flex items-center gap-1">
                        <Plus size={14} /> 상품 필수정보 등록
                    </Button>
                </Link>
            </div>

            {/* Search Section */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-lg font-bold text-gray-800">필수정보 검색</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-xs cursor-help">?</span>
                </div>
                
                <div className="border border-gray-300 bg-white">
                    {/* Row 1: Supplier */}
                    <div className="flex items-center border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">공급사 구분</div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <RadioGroup 
                                value={supplierType} 
                                onValueChange={setSupplierType}
                                className="flex items-center gap-6"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="all" id="supplier-all" />
                                    <Label htmlFor="supplier-all">전체</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="headquarters" id="supplier-headquarters" />
                                    <Label htmlFor="supplier-headquarters">본사</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="supplier" id="supplier-supplier" />
                                    <Label htmlFor="supplier-supplier" onClick={() => {
                                        setSupplierType("supplier");
                                        setIsSupplierPopupOpen(true);
                                    }}>공급사</Label>
                                    <Button 
                                        variant="secondary" 
                                        className={`h-7 text-xs rounded-sm ml-2 ${supplierType === "supplier" ? "bg-gray-500 text-white hover:bg-gray-600" : "bg-gray-300 text-white cursor-not-allowed"}`}
                                        disabled={supplierType !== "supplier"}
                                        onClick={() => setIsSupplierPopupOpen(true)}
                                    >
                                        공급사 선택
                                    </Button>
                                    {supplierType === "supplier" && selectedSuppliers.length > 0 && (
                                        <span className="text-blue-600 font-medium ml-1">
                                            ({selectedSuppliers.map(s => s.name).join(", ")})
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="none" id="supplier-none" />
                                    <Label htmlFor="supplier-none">구분없음</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 2: Essential Info Name */}
                    <div className="flex items-center border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">필수정보명</div>
                        <div className="flex-1 p-3">
                            <Input className="w-64 h-8" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                        </div>
                    </div>

                     {/* Row 3: Period Search */}
                     <div className="flex items-center">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">기간검색</div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <Select defaultValue="regDate">
                                <SelectTrigger className="w-[100px] h-8 text-xs">
                                    <SelectValue placeholder="등록일" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="regDate">등록일</SelectItem>
                                    <SelectItem value="modDate">수정일</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative">
                                <Input className="w-32 h-8 pl-2 pr-8" />
                                <CalendarIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                            <span className="text-gray-500">~</span>
                            <div className="relative">
                                <Input className="w-32 h-8 pl-2 pr-8" />
                                <CalendarIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                             <div className="flex gap-0.5 ml-2">
                                {["오늘", "7일", "15일", "1개월", "3개월", "전체"].map((period) => (
                                    <Button 
                                        key={period} 
                                        variant="outline" 
                                        className={`h-8 px-3 text-xs rounded-sm ${period === "전체" ? "bg-gray-700 text-white border-gray-700 hover:bg-gray-800" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`}
                                    >
                                        {period}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-6 mb-10">
                    <Button className="w-32 h-10 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-sm">검색</Button>
                </div>
            </div>

            {/* List Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-gray-800">
                        검색 <span className="text-red-500">{essentialInfos.length}</span>개 / 전체 <span className="text-red-500">{essentialInfos.length}</span>개
                    </div>
                    <div className="flex items-center gap-2">
                        <Select defaultValue="regDesc">
                            <SelectTrigger className="w-32 h-8 text-xs">
                                <SelectValue placeholder="등록일 ↓" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="regDesc">등록일 ↓</SelectItem>
                                <SelectItem value="regAsc">등록일 ↑</SelectItem>
                                <SelectItem value="nameDesc">필수정보명 ↓</SelectItem>
                                <SelectItem value="nameAsc">필수정보명 ↑</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="10">
                            <SelectTrigger className="w-32 h-8 text-xs">
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

                <div className="border-t-2 border-gray-800 border-b border-gray-300">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#A4A4A4]/20 hover:bg-[#A4A4A4]/20">
                                <TableHead className="w-10 text-center p-0">
                                    <Checkbox 
                                        className="translate-y-[2px]" 
                                        checked={essentialInfos.length > 0 && selectedIds.length === essentialInfos.length}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </TableHead>
                                <TableHead className="w-16 text-center font-bold text-gray-700 bg">번호</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">필수정보명</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">공급사</TableHead>
                                <TableHead className="text-center font-bold text-gray-700">등록일/수정일</TableHead>
                                <TableHead className="w-20 text-center font-bold text-gray-700">수정</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-40 text-center text-gray-500">
                                        로딩중...
                                    </TableCell>
                                </TableRow>
                            ) : essentialInfos.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-40 text-center text-gray-500">
                                        검색된 정보가 없습니다.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                essentialInfos.map((item, idx) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50 text-center text-xs text-gray-600 h-12">
                                        <TableCell className="p-0 text-center">
                                            <Checkbox 
                                                className="translate-y-[2px]" 
                                                checked={selectedIds.includes(item.id)}
                                                onCheckedChange={(checked) => handleSelect(item.id, !!checked)}
                                            />
                                        </TableCell>
                                        <TableCell className="text-gray-500 font-normal">{essentialInfos.length - idx}</TableCell>
                                        <TableCell className="text-left pl-4">{item.name}</TableCell>
                                        <TableCell>{item.supplierName}</TableCell>
                                        <TableCell>
                                            <div>{item.regDate}</div>
                                            {item.modDate !== item.regDate && <div className="text-gray-400">{item.modDate}</div>}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/admin/products/info/edit/${item.id}`}>
                                                <Button variant="outline" className="h-6 w-[50px] text-xs px-0 rounded-sm border-gray-300">수정</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="outline" 
                            onClick={handleCopy}
                            disabled={isPending}
                            className="h-8 px-3 text-xs border-gray-300 text-gray-700 font-medium rounded-sm"
                        >
                            {isPending ? "복사중" : "선택 복사"}
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={handleDelete}
                            disabled={isPending}
                            className="h-8 px-3 text-xs border-gray-300 text-gray-700 font-medium rounded-sm"
                        >
                            {isPending ? "삭제중" : "선택 삭제"}
                        </Button>
                    </div>
                    <Button variant="outline" className="h-8 px-3 text-xs border-gray-300 text-gray-700 font-medium rounded-sm flex items-center gap-1">
                        <span className="text-green-600"><FileSpreadsheet size={14} /></span>
                        엑셀다운로드
                    </Button>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="pt-8 border-t border-gray-300 space-y-6 mt-12">
                <div className="flex items-center gap-2">
                    <span className="text-blue-500"><Book size={16} /></span>
                    <h3 className="font-bold text-blue-500">안내</h3>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                         <h4 className="text-sm font-bold text-gray-700 mb-1">[상품 정보] 상품정보 제공고시는 무엇인가요?</h4>
                         <div className="text-xs text-gray-500 pl-2 leading-relaxed">
                            <p>· 공정거래위원회에서는 의류, 영상가전, 가구, 화장품, 식품, 도서 등 상품 품목을 38개로 분류하고, 각 품목별로 상품정보를 의무적으로 소비자에게 제공하도록 법으로 규정하고 있습니다.</p>
                         </div>
                    </div>
                     <div className="space-y-1">
                         <h4 className="text-sm font-bold text-gray-700 mb-1">상품 등의 정보제공에 관한 고시(상품정보 제공고시)</h4>
                         <div className="text-xs text-gray-500 pl-2 leading-relaxed">
                            <p>· 본 고시는 공정거래위원회에서 제정·운영하고 있으며 "전자상거래 등에서의 소비자보호에 관한 법률" 제 13조 제4항에 따라,</p>
                            <p>통신판매업자로 신고한 판매자는 누구나 등록한 상품페이지 상에 구체적으로 소비자에게 제공해야 할 재화 등의 정보와 거래조건에 대해</p>
                            <p>작성하여 소비자의 합리적인 선택을 유도하고 소비자의 피해를 사전적으로 예방하기 위해 시행하는 제도입니다.</p>
                         </div>
                    </div>
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold"><Youtube size={16}/></span>
                </Button>
                 <Button className="rounded-full w-10 h-10 bg-[#7B4DFF] hover:bg-[#7B4DFF]/90 shadow-lg text-white p-0 flex items-center justify-center border-0 text-[10px] leading-tight flex-col">
                    <span className="block">따라</span>
                    <span className="block">하기</span>
                </Button>
                <div className="flex flex-col gap-0 rounded-full bg-white shadow-lg overflow-hidden border border-gray-200">
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100">
                         <ChevronUp size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none transform rotate-180">
                         <ChevronUp size={16} />
                    </Button>
                </div>
            </div>
            <SupplierPopup 
                isOpen={isSupplierPopupOpen}
                onClose={() => setIsSupplierPopupOpen(false)}
                onConfirm={(selected) => {
                    if (Array.isArray(selected)) {
                        setSelectedSuppliers(selected);
                    }
                }}
                multiSelect={true}
            />
        </div>
    );
}
