"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState, useTransition, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateAdminAction, getAdminByIdAction } from "@/actions/admin-actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getSuppliersAction } from "@/actions/supplier-actions";
import { Supplier } from "@/generated/prisma";

export default function ManagerEditPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params); 
    
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);

    // 폼 상태
    const [formState, setFormState] = useState({
        adminType: "sub", 
        supplierId: undefined as string | undefined,
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
        loginRestriction: "allowed",
        smsAutoSend: false,
        phoneInternal: "",
        ipRestriction: false,
    });

    const [supplierName, setSupplierName] = useState("");
    const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [supplierKeyword, setSupplierKeyword] = useState("");



    // Permission Dialog State
    const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
    const [openMenuFilter, setOpenMenuFilter] = useState(false);
    const [permissionScope, setPermissionScope] = useState("selected"); // all, selected
    const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([]);
    
    // TODO: Centralize this constant if used across multiple pages
    const MENU_ITEMS = [
        "관리자 기본", "기본설정", "상품", "주문/배송", "회원", "게시판", 
        "디자인", "모바일샵", "프로모션", "마케팅", "통계", "플러스샵", "파트너스"
    ];

    const fetchSuppliers = async (page = 1) => {
        const result = await getSuppliersAction({
            page,
            pageSize: 5,
            filter: { keyword: supplierKeyword, keywordType: "integrated", status: "ACTIVE" }
        });
        if (result.success) {
            setSuppliers(result.items || []);
            setSuppliers(result.items || []);
        }
    };

    const selectSupplier = (s: Supplier) => {
        setFormState(prev => ({ ...prev, supplierId: s.id }));
        setSupplierName(s.name);
        setIsSupplierDialogOpen(false);
    };



    // Fetch Data
    useEffect(() => {
        const fetchAdmin = async () => {
            const result = await getAdminByIdAction(id);
            if (result.success && result.admin) {
                const admin = result.admin;
                setFormState({
                    adminType: admin.type === "SUPPLIER" ? "supplier" : "sub", 
                    supplierId: admin.supplierId || undefined,
                    userId: admin.userId,
                    password: "", 
                    passwordConfirm: "",
                    name: admin.name,
                    nickname: admin.nickname || "",
                    email: admin.email || "",
                    phone: admin.phone || "",
                    mobile: admin.mobile || "",
                    isEmployee: admin.isEmployee,
                    department: admin.department || "",
                    position: admin.position || "",
                    duty: admin.duty || "",
                    memo: admin.memo || "",
                    loginRestriction: "allowed", // TODO: DB Schema should support this or default
                    smsAutoSend: false, // TODO
                    phoneInternal: "", // TODO
                    ipRestriction: false, // TODO
                });
                
                if (admin.supplier) {
                    setSupplierName(admin.supplier.name);
                }
            } else {
                alert("운영자 정보를 불러올 수 없습니다.");
                router.push("/admin/settings/manager");
            }
            setIsLoading(false);
        };
        fetchAdmin();
    }, [id, router]);

    const handleChange = (field: string, value: string | boolean) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (!formState.name) {
            alert("필수 정보를 입력해주세요.");
            return;
        }
        if (formState.password && formState.password !== formState.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (formState.adminType === "supplier" && !formState.supplierId) {
             alert("공급사를 선택해주세요.");
             return;
        }

        startTransition(async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const updateData: any = { ...formState };
            
            // 비밀번호를 입력하지 않았다면 전송하지 않음
            if (!updateData.password) {
                delete updateData.password;
                delete updateData.passwordConfirm;
            }

            const result = await updateAdminAction(id, {
                ...updateData,
                type: formState.adminType === "supplier" ? "SUPPLIER" : "SUB",
                supplierId: formState.adminType === "supplier" ? formState.supplierId : null,
            });

            if (result.success) {
                alert("운영자 정보가 수정되었습니다.");
                router.push("/admin/settings/manager");
            } else {
                alert(result.error || "수정에 실패했습니다.");
            }
        });
    };

    if (isLoading) {
        return <div className="p-6">로딩 중...</div>;
    }

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
             <div className="flex items-center justify-between pb-4 border-b border-gray-500">
                <h1 className="text-2xl font-bold text-gray-900">운영자 수정</h1>
                <div className="flex gap-2">
                    <Link href="/admin/settings/manager">
                        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm h-9 px-4 text-sm font-medium">
                           <span className="mr-1">≡</span> 목록
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

            <div className="flex items-center gap-2 mt-4">
                 <h3 className="font-bold text-base">기본정보</h3>
                 <span className="border border-gray-300 w-5 h-5 flex items-center justify-center text-gray-500 text-xs rounded-sm cursor-help">?</span>
            </div>

            <div className="border-t border-gray-400">
                <table className="w-full text-left text-xs border-collapse">
                    <tbody>
                        {/* 공급사 구분 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 w-[160px] border-r border-gray-200">
                                <span className="text-red-500 mr-1">*</span>공급사 구분
                            </th>
                            <td className="p-3">
                                <div className="flex flex-col gap-2">
                                    <RadioGroup 
                                        value={formState.adminType}
                                        onValueChange={(v) => {
                                            handleChange("adminType", v);
                                            if (v === "supplier") {
                                                setIsSupplierDialogOpen(true);
                                            }
                                        }}
                                        className="flex items-center gap-6"
                                    >
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="sub" id="type-sub" className="text-gray-400 border-gray-400 data-[state=checked]:text-red-500 data-[state=checked]:border-red-500" />
                                            <Label htmlFor="type-sub" className="font-normal cursor-pointer text-gray-600">본사</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-2 cursor-pointer" onClickCapture={() => setIsSupplierDialogOpen(true)}>
                                                <RadioGroupItem 
                                                    value="supplier" 
                                                    id="type-supplier" 
                                                    className="text-gray-400 border-gray-400 data-[state=checked]:text-red-500 data-[state=checked]:border-red-500"
                                                />
                                                <Label 
                                                    htmlFor="type-supplier" 
                                                    className="font-normal cursor-pointer text-gray-600"
                                                    onClick={() => setIsSupplierDialogOpen(true)}
                                                >
                                                    공급사
                                                </Label>
                                            </div>
                                            <div className="flex items-center ml-2 gap-2">
                                                <Button 
                                                    variant="secondary" 
                                                    size="sm" 
                                                    className="h-6 px-2 text-[11px] bg-gray-400 text-white hover:bg-gray-500 rounded-none"
                                                    onClick={() => setIsSupplierDialogOpen(true)}
                                                >
                                                    공급사 선택
                                                </Button>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                    
                                     {formState.adminType === "supplier" && (
                                        <div className="text-xs text-blue-600 mt-1">
                                            {supplierName ? `선택된 공급사: ${supplierName}` : "공급사를 선택해주세요."}
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>

                        {/* 아이디 & 비밀번호 */}
                        <tr className="border-b border-gray-200">
                            <td colSpan={2} className="p-0">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 w-[160px] border-r border-gray-200 border-b">
                                                <span className="text-red-500 mr-1">*</span>아이디
                                            </th>
                                            <td className="p-3 border-r border-gray-200 border-b w-[40%] text-gray-600">
                                                {formState.userId}
                                            </td>
                                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 w-[160px] border-r border-gray-200 border-b">
                                                <span className="text-red-500 mr-1">*</span>비밀번호
                                            </th>
                                            <td className="p-3 border-b align-top relative">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <input type="checkbox" id="pw-change" className="rounded-sm border-gray-300" />
                                                    <label htmlFor="pw-change" className="text-gray-700 cursor-pointer">변경</label>
                                                </div>
                                                <div className="text-red-500 space-y-1">
                                                     <p className="flex items-start gap-1"><span className="w-3 h-3 bg-[#FF424D] text-white rounded-sm flex items-center justify-center text-[10px] mt-0.5">!</span> <span>영문대/소문자, 숫자, 특수문자 중 2개 이상을<br/>조합하여 10~16자리 이하로 설정할 수 있습니다.</span></p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>

                        {/* 이름 & 닉네임 */}
                        <tr className="border-b border-gray-200">
                            <td colSpan={2} className="p-0">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 w-[160px] border-r border-gray-200">
                                                <span className="text-red-500 mr-1">*</span>이름
                                            </th>
                                            <td className="p-3 border-r border-gray-200 w-[40%]">
                                                 <div className="relative w-[180px]">
                                                    <Input 
                                                        className="w-full h-8 rounded-none border-gray-300 pr-12 focus:border-gray-400 focus:ring-0" 
                                                        value={formState.name}
                                                        onChange={(e) => handleChange("name", e.target.value)}
                                                    />
                                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-red-500 tracking-tighter">5 / 20</span>
                                                </div>
                                            </td>
                                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 w-[160px] border-r border-gray-200">
                                                닉네임
                                            </th>
                                            <td className="p-3">
                                                 <div className="relative w-[180px]">
                                                    <Input 
                                                        className="w-full h-8 rounded-none border-gray-300 pr-12 focus:border-gray-400 focus:ring-0" 
                                                        value={formState.nickname}
                                                        onChange={(e) => handleChange("nickname", e.target.value)}
                                                    />
                                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-red-500 tracking-tighter">5 / 20</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        
                        {/* 최종 로그인일 */}
                        <tr className="border-b border-gray-200">
                             <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 border-r border-gray-200">
                                최종 로그인일
                            </th>
                            <td className="p-3 text-gray-600">
                                2026-01-19 12:59:57
                            </td>
                        </tr>

                         {/* 로그인제한 */}
                         <tr className="border-b border-gray-200">
                             <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 border-r border-gray-200 align-middle">
                                로그인제한
                            </th>
                            <td className="p-3">
                                <div className="space-y-2">
                                     <RadioGroup 
                                        value={formState.loginRestriction}
                                        onValueChange={(v) => handleChange("loginRestriction", v)}
                                        className="flex items-center gap-6"
                                    >
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="allowed" id="login-allowed" className="text-gray-400 border-gray-400 data-[state=checked]:text-red-500 data-[state=checked]:border-red-500" />
                                            <Label htmlFor="login-allowed" className="font-normal cursor-pointer text-gray-600">로그인가능</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="restricted" id="login-restricted" className="text-gray-400 border-gray-400 data-[state=checked]:text-red-500 data-[state=checked]:border-red-500" />
                                            <Label htmlFor="login-restricted" className="font-normal cursor-pointer text-gray-600">로그인제한</Label>
                                        </div>
                                    </RadioGroup>
                                    <div className="text-[11px] text-gray-500 space-y-1 pl-1">
                                        <p className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-600 text-white rounded-sm flex items-center justify-center text-[9px] font-bold">!</span> '로그인제한' 설정 시 해당 운영자는 쇼핑몰 관리자에 접속할 수 없습니다.</p>
                                        <p className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-600 text-white rounded-sm flex items-center justify-center text-[9px] font-bold">!</span> 운영자 로그인을 5회 이상 실패할 경우 자동으로 '로그인제한' 상태로 변경됩니다.</p>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        {/* 이미지표시 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 border-r border-gray-200">
                                이미지표시
                            </th>
                            <td className="p-3">
                                <div className="flex items-center gap-2">
                                    <Button 
                                        variant="secondary" 
                                        size="sm" 
                                        className="h-7 bg-gray-400 text-white hover:bg-gray-500 rounded-none text-[11px] px-3"
                                    >
                                        찾아보기
                                    </Button>
                                    <div className="w-[200px] h-7 bg-[#f1f1f1] border border-gray-300 rounded-sm"></div>
                                </div>
                            </td>
                        </tr>
                        
                        {/* 직원여부 & 부서/직급/직책 */}
                        <tr className="border-b border-gray-200">
                             <td colSpan={2} className="p-0">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 w-[160px] border-r border-gray-200">
                                                직원여부
                                            </th>
                                            <td className="p-3 border-r border-gray-200 w-[40%]">
                                                <RadioGroup 
                                                    value={formState.isEmployee ? "yes" : "no"}
                                                    onValueChange={(v) => handleChange("isEmployee", v === "yes")}
                                                    className="flex items-center gap-4"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem value="yes" id="emp-yes" className="text-gray-400 border-gray-400 data-[state=checked]:text-red-500 data-[state=checked]:border-red-500" />
                                                        <Label htmlFor="emp-yes" className="font-normal cursor-pointer text-gray-600">직원</Label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem value="no" id="emp-no" className="text-gray-400 border-gray-400 data-[state=checked]:text-red-500 data-[state=checked]:border-red-500" />
                                                        <Label htmlFor="emp-no" className="font-normal cursor-pointer text-gray-600">비정규직</Label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem value="part" id="emp-part" className="text-gray-400 border-gray-400 data-[state=checked]:text-red-500 data-[state=checked]:border-red-500" />
                                                        <Label htmlFor="emp-part" className="font-normal cursor-pointer text-gray-600">아르바이트</Label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem value="dispatch" id="emp-dispatch" className="text-gray-400 border-gray-400 data-[state=checked]:text-red-500 data-[state=checked]:border-red-500" />
                                                        <Label htmlFor="emp-dispatch" className="font-normal cursor-pointer text-gray-600">파견직</Label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem value="retired" id="emp-retired" className="text-gray-400 border-gray-400 data-[state=checked]:text-red-500 data-[state=checked]:border-red-500" />
                                                        <Label htmlFor="emp-retired" className="font-normal cursor-pointer text-gray-600">퇴사자</Label>
                                                    </div>
                                                </RadioGroup>
                                            </td>
                                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 w-[160px] border-r border-gray-200">
                                                부서
                                            </th>
                                            <td className="p-3">
                                                 <select
                                                    className="w-[150px] h-8 rounded-sm border border-gray-300 text-xs px-2 focus:border-gray-400 focus:ring-0"
                                                    value={formState.department}
                                                    onChange={(e) => handleChange("department", e.target.value)}
                                                >
                                                    <option value="">=부서 선택=</option>
                                                    <option value="임원">임원</option>
                                                    <option value="재무회계팀">재무회계팀</option>
                                                    <option value="개발팀">개발팀</option>
                                                    <option value="디자인팀">디자인팀</option>
                                                    <option value="기획팀">기획팀</option>
                                                    <option value="운영지원팀">운영지원팀</option>
                                                    <option value="마케팅팀">마케팅팀</option>
                                                </select>
                                            </td>
                                        </tr>
                                         <tr>
                                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 border-r border-gray-200 border-t">
                                                직급
                                            </th>
                                            <td className="p-3 border-r border-gray-200 border-t">
                                                 <select
                                                    className="w-[150px] h-8 rounded-sm border border-gray-300 text-xs px-2 focus:border-gray-400 focus:ring-0"
                                                    value={formState.position}
                                                    onChange={(e) => handleChange("position", e.target.value)}
                                                >
                                                    <option value="">=직급 선택=</option>
                                                    <option value="회장">회장</option>
                                                    <option value="사장">사장</option>
                                                    <option value="전무">전무</option>
                                                    <option value="상무">상무</option>
                                                    <option value="이사">이사</option>
                                                    <option value="부장">부장</option>
                                                    <option value="차장">차장</option>
                                                    <option value="과장">과장</option>
                                                    <option value="대리">대리</option>
                                                    <option value="주임">주임</option>
                                                    <option value="사원">사원</option>
                                                </select>
                                            </td>
                                             <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 border-r border-gray-200 border-t">
                                                직책
                                            </th>
                                            <td className="p-3 border-t">
                                                 <select
                                                    className="w-[150px] h-8 rounded-sm border border-gray-300 text-xs px-2 focus:border-gray-400 focus:ring-0"
                                                    value={formState.duty}
                                                    onChange={(e) => handleChange("duty", e.target.value)}
                                                >
                                                    <option value="">=직책 선택=</option>
                                                    <option value="회장">회장</option>
                                                    <option value="사장">사장</option>
                                                    <option value="본부장">본부장</option>
                                                    <option value="팀장">팀장</option>
                                                    <option value="부서장">부서장</option>
                                                    <option value="사원">사원</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>

                        {/* SMS 자동발송 수신설정 */}
                        <tr className="border-b border-gray-200">
                             <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 border-r border-gray-200">
                                SMS 자동발송<br/>수신설정
                            </th>
                            <td className="p-3">
                                <RadioGroup 
                                    value={formState.smsAutoSend ? "yes" : "no"}
                                    onValueChange={(v) => handleChange("smsAutoSend", v === "yes")}
                                    className="flex flex-col gap-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="no" id="sms-no" className="text-gray-400 border-gray-400 data-[state=checked]:text-red-500 data-[state=checked]:border-red-500" />
                                        <Label htmlFor="sms-no" className="font-normal cursor-pointer text-gray-600">SMS 자동발송 수신안함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                       <RadioGroupItem value="yes" id="sms-yes" className="text-gray-400 border-gray-400 data-[state=checked]:text-red-500 data-[state=checked]:border-red-500" />
                                       <Label htmlFor="sms-yes" className="font-normal cursor-pointer text-gray-600">SMS 자동발송 수신함</Label>
                                    </div>
                                </RadioGroup>
                            </td>
                        </tr>

                        {/* 전화번호 & 내선번호 */}
                         <tr className="border-b border-gray-200">
                             <td colSpan={2} className="p-0">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 w-[160px] border-r border-gray-200 border-b">
                                                전화번호
                                            </th>
                                            <td className="p-3 border-r border-gray-200 border-b w-[40%] text-gray-600">
                                                 <Input 
                                                    className="w-[180px] h-8 rounded-none border-gray-300 focus:border-gray-400 focus:ring-0" 
                                                    value={formState.phone}
                                                    onChange={(e) => handleChange("phone", e.target.value)}
                                                />
                                            </td>
                                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 w-[160px] border-r border-gray-200 border-b">
                                                내선번호
                                            </th>
                                            <td className="p-3 border-b align-top">
                                                 <Input 
                                                    className="w-[80px] h-8 rounded-none border-gray-300 focus:border-gray-400 focus:ring-0" 
                                                    value={formState.phoneInternal}
                                                    onChange={(e) => handleChange("phoneInternal", e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>

                        {/* 휴대폰번호 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 border-r border-gray-200 align-top pt-4">
                                휴대폰번호 <span className="text-gray-400 text-[10px] ml-1">●</span>
                            </th>
                            <td className="p-3">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Input 
                                                className="w-[180px] h-8 rounded-none border-gray-300 focus:border-gray-400 focus:ring-0" 
                                                value={formState.mobile}
                                                onChange={(e) => handleChange("mobile", e.target.value)}
                                            />
                                            <Button variant="secondary" size="sm" className="h-8 px-3 rounded-none bg-gray-300 text-white hover:bg-gray-400 text-xs shadow-none">인증번호받기</Button>
                                        </div>
                                         <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-700 whitespace-nowrap">인증번호 :</span>
                                            <Input className="w-[150px] h-8 rounded-none border-gray-300 focus:border-gray-400 focus:ring-0" />
                                            <Button variant="secondary" size="sm" className="h-8 px-3 rounded-none bg-gray-600 text-white hover:bg-gray-700 text-xs shadow-none whitespace-nowrap">인증완료</Button>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">(미인증)</span>
                                        </div>
                                    </div>
                                    <div className="text-[11px] text-gray-500 space-y-1">
                                        <p className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-600 text-white rounded-sm flex items-center justify-center text-[9px] font-bold">!</span> 인증이 완료된 휴대폰번호는 관리자페이지 보안로그인 및 화면보안접속 시 인증정보로 사용할 수 있습니다. <span className="text-blue-500 underline cursor-pointer">운영보안설정 바로가기 &gt;</span></p>
                                        <div className="flex items-center gap-1">
                                            <span className="w-3 h-3 bg-gray-600 text-white rounded-sm flex items-center justify-center text-[9px] font-bold">!</span> 
                                            <span>인증번호는 SMS발신번호 및 SMS인증번호가 등록 되어있어야 하며, 잔여포인트가 있어야 발송 됩니다. (잔여포인트 : <span className="text-red-500">0</span>)</span>
                                            <Button variant="secondary" size="sm" className="h-5 px-2 text-[10px] bg-gray-400 text-white hover:bg-gray-500 rounded-none ml-1">SMS 포인트 충전하기</Button>
                                        </div>
                                        <p className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-600 text-white rounded-sm flex items-center justify-center text-[9px] font-bold">!</span> SMS발신번호 및 SMS인증번호 관리는 <span className="text-blue-500 underline cursor-pointer">[회원 &gt; SMS관리 &gt; SMS 설정]</span> 에서 확인할 수 있습니다.</p>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        {/* 이메일 */}
                         <tr className="border-b border-gray-200">
                             <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 border-r border-gray-200 align-top pt-4">
                                이메일
                            </th>
                            <td className="p-3">
                                 <div className="space-y-2">
                                     <div className="flex flex-wrap items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Input 
                                                className="w-[150px] h-8 rounded-none border-gray-300 focus:border-gray-400 focus:ring-0" 
                                                value={formState.email.split('@')[0] || ''}
                                                onChange={(e) => {
                                                    const currentDomain = formState.email.split('@')[1] || '';
                                                    handleChange("email", `${e.target.value}@${currentDomain}`);
                                                }}
                                            />
                                            <span className="text-gray-500">@</span>
                                            <Input 
                                                className="w-[150px] h-8 rounded-none border-gray-300 focus:border-gray-400 focus:ring-0" 
                                                value={formState.email.split('@')[1] || ''}
                                                onChange={(e) => {
                                                    const currentId = formState.email.split('@')[0] || '';
                                                    handleChange("email", `${currentId}@${e.target.value}`);
                                                }}
                                            />
                                            <select 
                                                className="w-[120px] h-8 border border-gray-300 rounded-none text-xs px-2 focus:border-gray-400 bg-white"
                                            >
                                                <option value="direct">직접입력</option>
                                                <option value="naver.com">naver.com</option>
                                            </select>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <Button variant="secondary" size="sm" className="h-8 px-3 rounded-none bg-gray-300 text-white hover:bg-gray-400 text-xs shadow-none whitespace-nowrap">인증번호받기</Button>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">(인증완료)</span>
                                        </div>
                                     </div>
                                     <div className="text-[11px] text-gray-500">
                                         <p className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-600 text-white rounded-sm flex items-center justify-center text-[9px] font-bold">!</span> 인증이 완료된 이메일은 관리자페이지 보안로그인 및 화면보안접속 시 인증정보로 사용할 수 있습니다. <span className="text-blue-500 underline cursor-pointer">운영보안설정 바로가기 &gt;</span></p>
                                     </div>
                                 </div>
                            </td>
                        </tr>

                        {/* 메모 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 border-r border-gray-200 align-top pt-4">메모</th>
                            <td className="p-3">
                                <textarea 
                                    className="w-full h-24 p-2 border border-gray-300 rounded-none text-xs resize-none focus:outline-none focus:border-gray-400 block"
                                    value={formState.memo}
                                    onChange={(e) => handleChange("memo", e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex items-center gap-2 pt-6">
                 <h3 className="font-bold text-base">권한 설정</h3>
                 <span className="border border-gray-300 w-5 h-5 flex items-center justify-center text-gray-500 text-xs rounded-sm cursor-help">?</span>
            </div>

            <div className="border-t border-gray-400">
                 <table className="w-full text-left text-xs border-collapse">
                    <tbody>
                         <tr className="border-b border-gray-200">
                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 w-[160px] border-r border-gray-200">
                                메뉴 권한 설정
                            </th>
                            <td className="p-3">
                                 <Button 
                                    variant="secondary" 
                                    size="sm" 
                                    className="h-8 px-4 bg-gray-400 text-white hover:bg-gray-500 rounded-none text-xs shadow-none"
                                    onClick={() => setIsPermissionDialogOpen(true)}
                                 >
                                    운영자 권한 설정
                                 </Button>
                            </td>
                         </tr>
                         <tr className="border-b border-gray-200">
                            <th className="bg-[#f9f9f9] p-3 font-bold text-gray-700 w-[160px] border-r border-gray-200">
                                운영자 IP 접속제한
                            </th>
                            <td className="p-3">
                                <RadioGroup 
                                    value={formState.ipRestriction ? "used" : "not_used"}
                                    onValueChange={(v) => handleChange("ipRestriction", v === "used")}
                                    className="flex items-center gap-6"
                                >
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="used" id="ip-used" className="text-gray-400 border-gray-400 data-[state=checked]:text-red-500 data-[state=checked]:border-red-500" />
                                        <Label htmlFor="ip-used" className="font-normal cursor-pointer text-gray-600">사용함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="not_used" id="ip-not-used" className="text-gray-400 border-gray-400 data-[state=checked]:text-red-500 data-[state=checked]:border-red-500" />
                                        <Label htmlFor="ip-not-used" className="font-normal cursor-pointer text-gray-600">사용안함</Label>
                                    </div>
                                </RadioGroup>
                            </td>
                         </tr>
                    </tbody>
                 </table>
            </div>

             {/* Floating Actions (Right Bottom) */}
             <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                 <Button className="rounded-full w-12 h-12 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold">YouTube</span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-[#6E36E2] hover:bg-[#6E36E2]/90 shadow-lg text-white p-0 flex flex-col items-center justify-center border-0 gap-0">
                    <span className="text-[10px] leading-none font-bold">따라</span>
                    <span className="text-[10px] leading-none font-bold">하기</span>
                </Button>
                <Button onClick={() => window.scrollTo(0, 0)} className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    ↑
                </Button>
                <Button onClick={() => window.scrollTo(0, 9999)} className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    ↓
                </Button>
            </div>

            <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
                <DialogContent className="max-w-[900px] p-0 gap-0 border-0 shadow-xl [&>button]:hidden h-[80vh] flex flex-col">
                    <DialogHeader className="p-4 border-b flex flex-row items-center justify-between m-0">
                        <DialogTitle className="text-xl font-bold text-gray-800">메뉴 권한 설정</DialogTitle>
                         <button onClick={() => setIsPermissionDialogOpen(false)} className="text-gray-500 hover:text-gray-700">
                             <span className="text-3xl font-light">&times;</span>
                         </button>
                    </DialogHeader>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                        {/* 권한 범위 설정 */}
                        <div className="bg-gray-50 p-4 border border-gray-200 flex items-center gap-6">
                            <span className="font-bold text-sm text-gray-700 w-20">권한 범위</span>
                            <RadioGroup 
                                value={permissionScope} 
                                onValueChange={setPermissionScope}
                                className="flex items-center gap-6"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="all" id="perm-all" />
                                    <Label htmlFor="perm-all" className="font-normal cursor-pointer text-sm">전체권한</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="selected" id="perm-selected" className="text-red-500 border-red-500" />
                                    <Label htmlFor="perm-selected" className="font-normal cursor-pointer text-sm">선택권한</Label>
                                </div>
                            </RadioGroup>
                            <Button variant="secondary" size="sm" className="h-7 bg-gray-400 hover:bg-gray-500 text-white text-xs rounded-none ml-2">기존 운영자 권한 불러오기</Button>
                        </div>

                        {/* 툴바 */}
                        <div className="flex justify-between items-center">
                            <Button variant="secondary" size="sm" className="h-8 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-None">권한 초기화</Button>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <button 
                                        className="h-8 border border-gray-300 text-xs px-2 rounded-sm bg-white flex items-center gap-2 min-w-[120px] justify-between"
                                        onClick={() => setOpenMenuFilter(!openMenuFilter)}
                                    >
                                        <span>노출 메뉴 선택</span>
                                        <span className="text-[10px]">▼</span>
                                    </button>
                                    {openMenuFilter && (
                                        <div className="absolute top-full left-0 mt-1 w-[200px] bg-white border border-gray-300 shadow-lg z-50 flex flex-col">
                                            <div className="p-2 border-b border-gray-200 bg-gray-100 font-bold text-xs text-center text-gray-700">
                                                노출 메뉴 선택
                                            </div>
                                            <div className="max-h-[300px] overflow-y-auto p-2 space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" id="menu-all" className="rounded-sm border-gray-300" />
                                                    <label htmlFor="menu-all" className="text-sm cursor-pointer hover:underline">전체 메뉴</label>
                                                </div>
                                                <div className="border-t border-dashed my-1"></div>
                                                {MENU_ITEMS.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-2">
                                                        <input type="checkbox" id={`menu-${idx}`} className="rounded-sm border-gray-300" />
                                                        <label htmlFor={`menu-${idx}`} className="text-sm cursor-pointer hover:underline">{item}</label>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-2 border-t border-gray-200 bg-gray-100 flex justify-center">
                                                <Button size="sm" variant="outline" className="h-7 text-xs bg-white border-gray-300 hover:bg-gray-50" onClick={() => setOpenMenuFilter(false)}>선택 메뉴 보기</Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <select className="h-8 border border-gray-300 text-xs px-2 rounded-sm bg-white focus:outline-none focus:border-blue-500">
                                    <option>1차 메뉴 기준으로 보기</option>
                                    <option>2차 메뉴 기준으로 보기</option>
                                    <option>3차 메뉴 기준으로 보기</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* 상단 컨트롤 및 헤더 */}
                        <div className="border-t border-gray-800">
                             {/* 일괄 적용 바 */}
                             <div className="bg-[#f9f9f9] border-b border-gray-300 p-2 flex justify-end items-center gap-2 text-xs">
                                 <span className="text-gray-600 font-bold">선택한 메뉴에</span>
                                 <select className="h-7 border border-gray-300 text-xs px-2 rounded-sm bg-white focus:outline-none focus:border-blue-500 w-32">
                                     <option>=권한 선택=</option>
                                     <option>권한없음</option>
                                     <option>읽기전용</option>
                                     <option>읽기/쓰기</option>
                                 </select>
                                 <Button size="sm" className="h-7 px-3 text-xs bg-gray-600 hover:bg-gray-700 text-white rounded-sm">일괄적용</Button>
                             </div>

                             <div className="flex bg-[#d1d1d1] border-b border-gray-300 text-xs font-bold text-gray-700 text-center items-center h-10">
                                 <div className="w-12 h-full flex justify-center items-center border-r border-gray-400">
                                     <input 
                                         type="checkbox" 
                                         className="w-4 h-4 rounded-sm border-gray-300"
                                         checked={selectedMenuItems.length === MENU_ITEMS.length && MENU_ITEMS.length > 0}
                                         onChange={(e) => {
                                             if (e.target.checked) {
                                                 setSelectedMenuItems([...MENU_ITEMS]);
                                             } else {
                                                 setSelectedMenuItems([]);
                                             }
                                         }}
                                     />
                                 </div>
                                 <div className="flex-1 h-full flex items-center justify-center border-r border-gray-400">메뉴명</div>
                                 <div className="w-40 h-full flex items-center justify-center border-r border-gray-400">권한설정</div>
                                 <div className="w-24 h-full flex items-center justify-center">추가설정</div>
                             </div>
                             <div className="border-b border-gray-300">
                                 {MENU_ITEMS.map((item, idx) => (
                                     <div key={idx} className="flex items-center h-12 border-b border-gray-100 hover:bg-gray-50 text-sm last:border-0">
                                         <div className="w-12 flex justify-center items-center">
                                             <input 
                                                 type="checkbox" 
                                                 className="w-4 h-4 rounded-sm border-gray-300"
                                                 checked={selectedMenuItems.includes(item)}
                                                 onChange={(e) => {
                                                     if (e.target.checked) {
                                                         setSelectedMenuItems(prev => [...prev, item]);
                                                     } else {
                                                         setSelectedMenuItems(prev => prev.filter(i => i !== item));
                                                     }
                                                 }}
                                             />
                                         </div>
                                         <div className="flex-1 flex items-center pl-4 font-bold text-gray-700 gap-2">
                                            <span className="bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] pb-0.5 cursor-pointer">+</span>
                                            {item}
                                         </div>
                                         <div className="w-40 flex justify-center">
                                             <select className="w-32 h-8 border border-gray-300 rounded-sm text-xs px-2">
                                                 <option>권한없음</option>
                                                 <option>읽기전용</option>
                                                 <option>읽기/쓰기</option>
                                             </select>
                                         </div>
                                         <div className="w-24 flex justify-center">
                                             <Button variant="outline" size="sm" className="h-6 text-xs border-gray-300 text-gray-600 bg-white hover:bg-gray-50">보기</Button>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                        </div>

                    </div>
                    
                    <div className="p-4 border-t bg-gray-50 flex justify-center gap-2">
                        <Button 
                            className="bg-[#4B5563] hover:bg-[#374151] text-white rounded-sm h-10 px-8"
                            onClick={() => setIsPermissionDialogOpen(false)}
                        >
                            확인
                        </Button>
                        <Button 
                            variant="outline" 
                            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm h-10 px-8"
                            onClick={() => setIsPermissionDialogOpen(false)}
                        >
                            취소
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={isSupplierDialogOpen} onOpenChange={setIsSupplierDialogOpen}>
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
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
