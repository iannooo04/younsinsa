"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getSuppliersAction } from "@/actions/supplier-actions";
import { Supplier } from "@/generated/prisma";
import { Search } from "lucide-react";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createAdminAction } from "@/actions/admin-actions";

export default function ManagerRegisterPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // 폼 상태
    const [formState, setFormState] = useState({
        adminType: "sub", // sub, supplier
        supplierId: "", // Selected Supplier ID
        userId: "",
        password: "",
        passwordConfirm: "",
        name: "",
        nickname: "",
        email: "",
        phone: "",
        mobile: "",
        isEmployee: true,
        department: "",
        position: "",
        duty: "",
        memo: "",
    });

    const [supplierName, setSupplierName] = useState("");
    const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [supplierKeyword, setSupplierKeyword] = useState("");
    const [supplierPage, setSupplierPage] = useState(1);
    const [supplierTotal, setSupplierTotal] = useState(0);

    const fetchSuppliers = async (page = 1) => {
        const result = await getSuppliersAction({
            page,
            pageSize: 5,
            filter: { keyword: supplierKeyword, keywordType: "integrated", status: "ACTIVE" }
        });
        if (result.success) {
            setSuppliers(result.items || []);
            setSupplierTotal(result.total || 0);
            setSupplierPage(page);
        }
    };

    const selectSupplier = (s: Supplier) => {
        setFormState(prev => ({ ...prev, supplierId: s.id }));
        setSupplierName(s.name);
        setIsSupplierDialogOpen(false);
    };

    const [permissionType, setPermissionType] = useState("all"); // all, selected

    const handleChange = (field: string, value: any) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (!formState.userId || !formState.password || !formState.name) {
            alert("필수 정보를 모두 입력해주세요.");
            return;
        }
        if (formState.password !== formState.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (formState.adminType === "supplier" && !formState.supplierId) {
             alert("공급사를 선택해주세요.");
             return;
        }

        startTransition(async () => {
            const result = await createAdminAction({
                ...formState,
                type: formState.adminType === "supplier" ? "SUPPLIER" : "SUB",
                supplierId: formState.adminType === "supplier" ? formState.supplierId : undefined,
                // 권한 설정은 일단 기본값으로 처리하거나 추후 상세 구현
            });

            if (result.success) {
                alert("운영자가 등록되었습니다.");
                router.push("/admin/settings/manager");
            } else {
                alert(result.error || "등록에 실패했습니다.");
            }
        });
    };

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
             {/* Header */}
             <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">운영자 등록</h1>
                <div className="flex gap-2">
                    <Link href="/admin/settings/manager">
                        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm h-9 px-4 text-sm font-medium">
                            취소
                        </Button>
                    </Link>
                    <Button 
                        className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium"
                        onClick={handleSubmit}
                        disabled={isPending}
                    >
                        {isPending ? "저장 중..." : "저장"}
                    </Button>
                </div>
            </div>

            <div className="text-xs text-red-500 font-medium mb-2">* 필수 입력 정보입니다.</div>

            {/* Basic Info Table */}
            <div className="border-t border-gray-400">
                <table className="w-full text-left text-xs border-collapse">
                    <tbody>
                        {/* 공급사 구분 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 w-[150px] border-r border-gray-200">
                                공급사 구분 <span className="text-red-500">*</span>
                            </th>
                            <td className="p-3">
                                <div className="flex flex-col gap-2">
                                    <RadioGroup 
                                        value={formState.adminType}
                                        onValueChange={(v) => handleChange("adminType", v)}
                                        className="flex items-center gap-6"
                                    >
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="sub" id="type-sub" />
                                            <Label htmlFor="type-sub" className="font-normal cursor-pointer">본사 부운영자</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="supplier" id="type-supplier" />
                                            <Label htmlFor="type-supplier" className="font-normal cursor-pointer">공급사 운영자</Label>
                                        </div>
                                    </RadioGroup>
                                    
                                    {formState.adminType === "supplier" && (
                                        <div className="flex items-center gap-2 mt-1">
                                            <Input 
                                                readOnly 
                                                value={supplierName} 
                                                placeholder="공급사를 선택하세요" 
                                                className="w-[200px] h-8 bg-gray-50" 
                                            />
                                            <Dialog open={isSupplierDialogOpen} onOpenChange={setIsSupplierDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button variant="secondary" size="sm" className="h-8 bg-gray-600 text-white hover:bg-gray-700">공급사 검색</Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-[500px] p-0 gap-0">
                                                    <DialogHeader className="p-4 border-b">
                                                        <DialogTitle className="text-lg font-bold">공급사 검색</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="p-4 space-y-4">
                                                        <div className="flex gap-2">
                                                            <Input 
                                                                placeholder="공급사명 검색" 
                                                                value={supplierKeyword}
                                                                onChange={(e) => setSupplierKeyword(e.target.value)}
                                                                className="h-9"
                                                            />
                                                            <Button onClick={() => fetchSuppliers(1)} className="h-9">검색</Button>
                                                        </div>
                                                        <div className="max-h-[300px] overflow-y-auto border rounded-sm">
                                                             <table className="w-full text-xs text-left">
                                                                <thead className="bg-gray-50 sticky top-0">
                                                                    <tr>
                                                                        <th className="p-2 border-b">공급사명</th>
                                                                        <th className="p-2 border-b">코드</th>
                                                                        <th className="p-2 border-b w-16">선택</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {suppliers.map(s => (
                                                                        <tr key={s.id} className="border-b hover:bg-gray-50">
                                                                            <td className="p-2">{s.name}</td>
                                                                            <td className="p-2">{s.code}</td>
                                                                            <td className="p-2">
                                                                                 <Button size="sm" onClick={() => selectSupplier(s)}>선택</Button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                             </table>
                                                        </div>
                                                        <div className="flex justify-center gap-1 mt-4">
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
                                    )}
                                </div>
                            </td>
                        </tr>

                        {/* 아이디 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">
                                아이디 <span className="text-red-500">*</span>
                            </th>
                            <td className="p-3">
                                <div className="flex gap-1 items-center">
                                    <Input 
                                        className="w-[200px] h-8 rounded-sm border-gray-300" 
                                        value={formState.userId}
                                        onChange={(e) => handleChange("userId", e.target.value)}
                                    />
                                    <Button variant="outline" size="sm" className="h-8 rounded-sm text-xs border-gray-300">중복확인</Button>
                                    <span className="text-gray-500 ml-2">영문 소문자/숫자, 4~16자</span>
                                </div>
                            </td>
                        </tr>

                        {/* 비밀번호 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">
                                비밀번호 <span className="text-red-500">*</span>
                            </th>
                            <td className="p-3">
                                <div className="flex gap-4 items-center">
                                    <Input 
                                        type="password"
                                        className="w-[200px] h-8 rounded-sm border-gray-300"
                                        value={formState.password}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                    />
                                    <span className="text-gray-500">영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10~16자</span>
                                </div>
                            </td>
                        </tr>

                        {/* 비밀번호 확인 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">
                                비밀번호 확인 <span className="text-red-500">*</span>
                            </th>
                            <td className="p-3">
                                <Input 
                                    type="password"
                                    className="w-[200px] h-8 rounded-sm border-gray-300" 
                                    value={formState.passwordConfirm}
                                    onChange={(e) => handleChange("passwordConfirm", e.target.value)}
                                />
                            </td>
                        </tr>

                        {/* 이름 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">
                                이름 <span className="text-red-500">*</span>
                            </th>
                            <td className="p-3">
                                <Input 
                                    className="w-[200px] h-8 rounded-sm border-gray-300" 
                                    value={formState.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                            </td>
                        </tr>

                        {/* 닉네임 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">닉네임</th>
                            <td className="p-3">
                                <Input 
                                    className="w-[200px] h-8 rounded-sm border-gray-300" 
                                    value={formState.nickname}
                                    onChange={(e) => handleChange("nickname", e.target.value)}
                                />
                            </td>
                        </tr>

                        {/* 이메일 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">
                                이메일 <span className="text-red-500">*</span>
                            </th>
                            <td className="p-3">
                                <div className="flex gap-1 items-center">
                                    <Input 
                                        className="w-[300px] h-8 rounded-sm border-gray-300" 
                                        value={formState.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                    />
                                </div>
                            </td>
                        </tr>

                        {/* 전화번호 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">전화번호</th>
                            <td className="p-3">
                                <Input 
                                    className="w-[200px] h-8 rounded-sm border-gray-300" 
                                    value={formState.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                />
                            </td>
                        </tr>

                        {/* 휴대폰번호 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">
                                휴대폰번호 <span className="text-red-500">*</span>
                            </th>
                            <td className="p-3">
                                <div className="flex gap-1 items-center">
                                    <Input 
                                        className="w-[200px] h-8 rounded-sm border-gray-300" 
                                        value={formState.mobile}
                                        onChange={(e) => handleChange("mobile", e.target.value)}
                                    />
                                    <div className="flex gap-1">
                                        <Checkbox id="sms" className="w-4 h-4 rounded-sm border-gray-300" />
                                        <Label htmlFor="sms" className="font-normal">SMS 수신동의</Label>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        {/* 직원여부 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">직원여부</th>
                            <td className="p-3">
                                <RadioGroup 
                                    value={formState.isEmployee ? "yes" : "no"}
                                    onValueChange={(v) => handleChange("isEmployee", v === "yes")}
                                    className="flex items-center gap-6"
                                >
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="yes" id="emp-yes" />
                                        <Label htmlFor="emp-yes" className="font-normal cursor-pointer">직원</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="no" id="emp-no" />
                                        <Label htmlFor="emp-no" className="font-normal cursor-pointer">비직원</Label>
                                    </div>
                                </RadioGroup>
                            </td>
                        </tr>

                        {/* 부서/직급/직책 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">부서/직급/직책</th>
                            <td className="p-3">
                                <div className="flex gap-2 items-center">
                                    <Input 
                                        className="w-[150px] h-8 rounded-sm border-gray-300" 
                                        placeholder="부서" 
                                        value={formState.department}
                                        onChange={(e) => handleChange("department", e.target.value)}
                                    />
                                    <Input 
                                        className="w-[150px] h-8 rounded-sm border-gray-300" 
                                        placeholder="직급" 
                                        value={formState.position}
                                        onChange={(e) => handleChange("position", e.target.value)}
                                    />
                                    <Input 
                                        className="w-[150px] h-8 rounded-sm border-gray-300" 
                                        placeholder="직책" 
                                        value={formState.duty}
                                        onChange={(e) => handleChange("duty", e.target.value)}
                                    />
                                </div>
                            </td>
                        </tr>

                        {/* 권한 설정 */}
                        <tr className="border-b border-gray-200">
                             <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">
                                권한 설정 <span className="text-red-500">*</span>
                            </th>
                            <td className="p-3">
                                <div className="space-y-3">
                                    <RadioGroup 
                                        value={permissionType}
                                        onValueChange={setPermissionType}
                                        className="flex items-center gap-6"
                                    >
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="all" id="perm-all" />
                                            <Label htmlFor="perm-all" className="font-normal cursor-pointer">전체 권한 (모든 메뉴 접근 가능)</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="selected" id="perm-selected" />
                                            <Label htmlFor="perm-selected" className="font-normal cursor-pointer">선택 권한 (메뉴별 설정)</Label>
                                        </div>
                                    </RadioGroup>
                                    
                                    {permissionType === "selected" && (
                                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-sm text-gray-500">
                                            * 등록 후 '운영자 권한 설정' 메뉴에서 상세 권한을 설정할 수 있습니다.
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>

                        {/* 메모 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">메모</th>
                            <td className="p-3">
                                <textarea 
                                    className="w-full h-20 p-2 border border-gray-300 rounded-sm text-xs resize-none focus:outline-none focus:border-blue-500"
                                    value={formState.memo}
                                    onChange={(e) => handleChange("memo", e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center pt-6 gap-2">
                <Link href="/admin/settings/manager">
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm h-10 px-8 text-sm font-medium">
                        취소
                    </Button>
                </Link>
                <Button 
                    className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-10 px-8 text-sm font-medium"
                    onClick={handleSubmit}
                    disabled={isPending}
                >
                    {isPending ? "저장 중..." : "저장"}
                </Button>
            </div>
            
            {/* Scroll Buttons */}
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
