"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getSuppliersAction } from "@/actions/supplier-actions";
import { Supplier } from "@/generated/prisma";
import { useState, useTransition, useRef, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createAdminAction, checkAdminIdAction } from "@/actions/admin-actions";

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
        loginRestriction: "allowed",
        smsAutoSend: false,
        phoneInternal: "",
        ipRestriction: false,
    });

    const [supplierName, setSupplierName] = useState("");
    const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [supplierKeyword, setSupplierKeyword] = useState("");

    // Image Upload State
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const [alertDialog, setAlertDialog] = useState({ open: false, title: "경고", message: "" });
    
    const handleCheckDuplicateId = async () => {
        const userId = formState.userId;

        if (!userId) {
            setAlertDialog({ open: true, title: "경고", message: "아이디를 입력해주세요." });
            return;
        }

        if (userId.length <= 4) {
             setAlertDialog({ open: true, title: "경고", message: "입력된 아이디 길이가 너무 짧습니다." });
             return;
        }

        if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]|\s/.test(userId)) {
             setAlertDialog({ open: true, title: "경고", message: "아이디 항목이 잘못 되었습니다." });
             return;
        }

        try {
            const result = await checkAdminIdAction(userId);
            if (result.success) {
                if (result.exists) {
                     setAlertDialog({ open: true, title: "경고", message: `${userId}는 이미 등록된 아이디 입니다` });
                } else {
                     setAlertDialog({ open: true, title: "경고", message: "사용 가능한 아이디입니다." });
                }
            } else {
                 setAlertDialog({ open: true, title: "오류", message: result.error || "중복 확인에 실패했습니다." });
            }
        } catch (e) {
            console.error(e);
            setAlertDialog({ open: true, title: "오류", message: "중복 확인 중 오류가 발생했습니다." });
        }
    };

    const fetchSuppliers = async (page = 1) => {
        const result = await getSuppliersAction({
            page,
            pageSize: 5,
            filter: { keyword: supplierKeyword, keywordType: "integrated", status: "ACTIVE" }
        });
        if (result.success) {
            setSuppliers(result.items || []);
        }
    };

    const selectSupplier = (s: Supplier) => {
        setFormState(prev => ({ ...prev, supplierId: s.id, adminType: "supplier" }));
        setSupplierName(s.name);
        setIsSupplierDialogOpen(false);
    };

    const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);
    const [openMenuFilter, setOpenMenuFilter] = useState(false);
    const [permissionScope, setPermissionScope] = useState("selected"); // all, selected
    const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([]);

    const MENU_ITEMS = [
        "관리자 기본", "기본설정", "상품", "주문/배송", "회원", "게시판", 
        "프로모션", "디자인", "앱서비스", "부가서비스", "마케팅", "모바일샵", 
        "공급사", "통계", "속도개선관리", "개발소스관리", "마켓연동"
    ];

    const handleChange = (field: string, value: string | boolean) => {
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
            const { 
                adminType, 
                ...rest 
            } = formState;

            const result = await createAdminAction({
                ...rest,
                type: adminType === "supplier" ? "SUPPLIER" : "SUB",
                supplierId: adminType === "supplier" ? formState.supplierId : undefined,
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
                            <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 w-[160px] border-r border-gray-200 text-left">
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
                                            <RadioGroupItem value="sub" id="type-sub" className="text-red-500 border-red-500" />
                                            <Label htmlFor="type-sub" className="font-normal cursor-pointer text-gray-600">본사</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-2 cursor-pointer" onClickCapture={() => setIsSupplierDialogOpen(true)}>
                                                <RadioGroupItem 
                                                    value="supplier" 
                                                    id="type-supplier" 
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
                                                      className="h-7 px-3 text-xs bg-gray-500 text-white hover:bg-gray-600 rounded-none"
                                                      onClick={() => setIsSupplierDialogOpen(true)}
                                                  >
                                                      공급사 선택
                                                  </Button>
                                                  {supplierName && (
                                                      <div className="text-xs text-gray-900 font-medium">
                                                          {supplierName}
                                                      </div>
                                                  )}
                                              </div>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </td>
                        </tr>

                        {/* 아이디 & 비밀번호 Row Group */}
                        <tr className="border-b border-gray-200">
                           <td colSpan={2} className="p-0">
                               <table className="w-full">
                                   <tbody>
                                       <tr>
                                            <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 w-[160px] border-r border-gray-200 text-left border-b">
                                                <span className="text-red-500 mr-1">*</span>아이디
                                            </th>
                                            <td className="p-3 border-r border-gray-200 border-b w-[40%]">
                                                <div className="flex gap-1 items-center">
                                                    <div className="relative">
                                                        <Input 
                                                            className="w-[180px] h-8 rounded-sm border-gray-300 pr-10" 
                                                            value={formState.userId}
                                                            onChange={(e) => handleChange("userId", e.target.value)}
                                                        />
                                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-red-500">0 / 50</span>
                                                    </div>
                                                    <Button 
                                                        variant="secondary" 
                                                        size="sm" 
                                                        className="h-8 px-3 rounded-none bg-gray-400 text-white hover:bg-gray-500 text-xs shadow-none"
                                                        onClick={handleCheckDuplicateId}
                                                    >
                                                        중복확인
                                                    </Button>
                                                </div>
                                            </td>
                                            <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 w-[160px] border-r border-gray-200 text-left border-b">
                                                <span className="text-red-500 mr-1">*</span>비밀번호
                                            </th>
                                            <td className="p-3 border-b">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-gray-500 w-20">비밀번호</span>
                                                        <div className="relative">
                                                            <Input 
                                                                type="password"
                                                                className="w-[180px] h-7 rounded-none border-gray-300 pr-10"
                                                                value={formState.password}
                                                                onChange={(e) => handleChange("password", e.target.value)}
                                                            />
                                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-red-500">0 / 16</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-gray-500 w-20">비밀번호확인</span>
                                                        <div className="relative">
                                                            <Input 
                                                                type="password"
                                                                className="w-[180px] h-7 rounded-none border-gray-300 pr-10" 
                                                                value={formState.passwordConfirm}
                                                                onChange={(e) => handleChange("passwordConfirm", e.target.value)}
                                                            />
                                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-red-500">0 / 16</span>
                                                        </div>
                                                    </div>
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
                                            <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 w-[160px] border-r border-gray-200 text-left">
                                                <span className="text-red-500 mr-1">*</span>이름
                                            </th>
                                            <td className="p-3 border-r border-gray-200 w-[40%]">
                                                <div className="relative w-[180px]">
                                                    <Input 
                                                        className="w-full h-8 rounded-sm border-gray-300 pr-10" 
                                                        value={formState.name}
                                                        onChange={(e) => handleChange("name", e.target.value)}
                                                    />
                                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-red-500">0 / 20</span>
                                                </div>
                                            </td>
                                            <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 w-[160px] border-r border-gray-200 text-left">
                                                닉네임
                                            </th>
                                            <td className="p-3">
                                                 <div className="relative w-[180px]">
                                                    <Input 
                                                        className="w-full h-8 rounded-sm border-gray-300 pr-10" 
                                                        value={formState.nickname}
                                                        onChange={(e) => handleChange("nickname", e.target.value)}
                                                    />
                                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-red-500">0 / 20</span>
                                                </div>
                                            </td>
                                       </tr>
                                   </tbody>
                               </table>
                           </td>
                        </tr>

                        {/* 로그인제한 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 border-r border-gray-200 text-left">
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
                                            <RadioGroupItem value="allowed" id="login-allowed" className="text-red-500 border-red-500" />
                                            <Label htmlFor="login-allowed" className="font-normal cursor-pointer text-gray-600">로그인가능</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="restricted" id="login-restricted" />
                                            <Label htmlFor="login-restricted" className="font-normal cursor-pointer text-gray-600">로그인제한</Label>
                                        </div>
                                    </RadioGroup>
                                    <div className="text-[11px] text-gray-500 space-y-1">
                                        <p className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-600 text-white rounded-sm flex items-center justify-center text-[9px] font-bold">!</span> '로그인제한' 설정 시 해당 운영자는 쇼핑몰 관리자에 접속할 수 없습니다.</p>
                                        <p className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-600 text-white rounded-sm flex items-center justify-center text-[9px] font-bold">!</span> 운영자 로그인을 5회 이상 실패할 경우 자동으로 '로그인제한' 상태로 변경됩니다.</p>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        {/* 이미지표시 */}
                        <tr className="border-b border-gray-200">
                            <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 border-r border-gray-200 text-left">
                                이미지표시
                            </th>
                            <td className="p-3">
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    <Button 
                                        variant="secondary" 
                                        size="sm" 
                                        className="h-8 bg-gray-400 text-white hover:bg-gray-500 rounded-none text-xs"
                                        onClick={handleBrowseClick}
                                    >
                                        찾아보기
                                    </Button>
                                    <div className="w-[200px] h-8 bg-gray-100 border border-gray-200 flex items-center px-2 text-xs text-gray-600 truncate">
                                        {fileName}
                                    </div>
                                </div>
                            </td>
                        </tr>

                        {/* 직원여부 & 부서/직급/직책 */}
                        <tr className="border-b border-gray-200">
                            <td colSpan={2} className="p-0">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 w-[160px] border-r border-gray-200 text-left">
                                                직원여부
                                            </th>
                                            <td className="p-3 border-r border-gray-200 w-[40%]">
                                                <RadioGroup 
                                                    value={formState.isEmployee ? "yes" : "no"}
                                                    onValueChange={(v) => handleChange("isEmployee", v === "yes")}
                                                    className="flex items-center gap-4"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem value="yes" id="emp-yes" className="text-red-500 border-red-500" />
                                                        <Label htmlFor="emp-yes" className="font-normal cursor-pointer text-gray-600">직원</Label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem value="no" id="emp-no" />
                                                        <Label htmlFor="emp-no" className="font-normal cursor-pointer text-gray-600">비정규직</Label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem value="part" id="emp-part" />
                                                        <Label htmlFor="emp-part" className="font-normal cursor-pointer text-gray-600">아르바이트</Label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem value="dispatch" id="emp-dispatch" />
                                                        <Label htmlFor="emp-dispatch" className="font-normal cursor-pointer text-gray-600">파견직</Label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <RadioGroupItem value="retired" id="emp-retired" />
                                                        <Label htmlFor="emp-retired" className="font-normal cursor-pointer text-gray-600">퇴사자</Label>
                                                    </div>
                                                </RadioGroup>
                                            </td>
                                            <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 w-[160px] border-r border-gray-200 text-left">
                                                부서
                                            </th>
                                            <td className="p-3">
                                                 <select
                                                    className="w-[150px] h-8 rounded-sm border border-gray-300 text-xs px-2 focus:outline-none focus:border-blue-500"
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
                                             <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 border-r border-gray-200 border-t text-left">
                                                 직급
                                             </th>
                                             <td className="p-3 border-r border-gray-200 border-t">
                                                  <select
                                                    className="w-[150px] h-8 rounded-sm border border-gray-300 text-xs px-2 focus:outline-none focus:border-blue-500"
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
                                              <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 border-r border-gray-200 border-t text-left">
                                                 직책
                                             </th>
                                             <td className="p-3 border-t">
                                                  <select
                                                    className="w-[150px] h-8 rounded-sm border border-gray-300 text-xs px-2 focus:outline-none focus:border-blue-500"
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
                            <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 border-r border-gray-200 text-left">
                                SMS 자동발송<br/>수신설정
                            </th>
                            <td className="p-3">
                                <RadioGroup 
                                    value={formState.smsAutoSend ? "yes" : "no"}
                                    onValueChange={(v) => handleChange("smsAutoSend", v === "yes")}
                                    className="flex flex-col gap-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="no" id="sms-no" className="text-red-500 border-red-500" />
                                        <Label htmlFor="sms-no" className="font-normal cursor-pointer text-gray-600">SMS 자동발송 수신안함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                       <RadioGroupItem value="yes" id="sms-yes" />
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
                                             <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 w-[160px] border-r border-gray-200 text-left">
                                                전화번호
                                            </th>
                                            <td className="p-3 border-r border-gray-200 w-[40%]">
                                                <Input 
                                                    className="w-[180px] h-8 rounded-sm border-gray-300" 
                                                    value={formState.phone}
                                                    onChange={(e) => handleChange("phone", e.target.value)}
                                                />
                                            </td>
                                            <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 w-[160px] border-r border-gray-200 text-left">
                                                내선번호
                                            </th>
                                            <td className="p-3">
                                                 <Input 
                                                    className="w-[80px] h-8 rounded-sm border-gray-300" 
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
                            <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 border-r border-gray-200 text-left">
                                휴대폰번호 <span className="text-gray-400 text-xs">(?)</span>
                            </th>
                            <td className="p-3">
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Input 
                                                className="w-[180px] h-8 rounded-sm border-gray-300" 
                                                value={formState.mobile}
                                                onChange={(e) => handleChange("mobile", e.target.value)}
                                            />
                                            <Button variant="secondary" size="sm" className="h-8 px-3 rounded-none bg-gray-400 text-white hover:bg-gray-500 text-xs shadow-none whitespace-nowrap">인증번호받기</Button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-700 whitespace-nowrap">인증번호 :</span>
                                            <Input className="w-[150px] h-8 rounded-sm border-gray-300" />
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
                             <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 border-r border-gray-200 text-left">
                                이메일
                            </th>
                            <td className="p-3">
                                 <div className="space-y-2">
                                     <div className="flex flex-wrap items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Input 
                                                className="w-[150px] h-8 rounded-sm border-gray-300" 
                                                value={formState.email.split('@')[0] || ''}
                                                onChange={(e) => {
                                                    const currentDomain = formState.email.split('@')[1] || '';
                                                    handleChange("email", `${e.target.value}@${currentDomain}`);
                                                }}
                                            />
                                            <span className="text-gray-500">@</span>
                                            <Input 
                                                className="w-[150px] h-8 rounded-sm border-gray-300" 
                                                value={formState.email.split('@')[1] || ''}
                                                onChange={(e) => {
                                                    const currentId = formState.email.split('@')[0] || '';
                                                    handleChange("email", `${currentId}@${e.target.value}`);
                                                }}
                                            />
                                            <div className="relative w-[140px] shrink-0">
                                                <select 
                                                    className="w-full h-8 border border-gray-300 rounded-sm text-xs px-2 appearance-none bg-white focus:outline-none focus:border-blue-500 pr-6"
                                                    onChange={(e) => {
                                                        const selectedDomain = e.target.value;
                                                        const currentId = formState.email.split('@')[0] || '';
                                                        if (selectedDomain === "직접입력") {
                                                            handleChange("email", `${currentId}@`);
                                                        } else {
                                                            handleChange("email", `${currentId}@${selectedDomain}`);
                                                        }
                                                    }}
                                                >
                                                    <option value="직접입력">직접입력</option>
                                                    <option value="hanmail.net">hanmail.net</option>
                                                    <option value="daum.net">daum.net</option>
                                                    <option value="nate.com">nate.com</option>
                                                    <option value="hotmail.com">hotmail.com</option>
                                                    <option value="gmail.com">gmail.com</option>
                                                    <option value="icloud.com">icloud.com</option>
                                                </select>
                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-[10px] pointer-events-none">▼</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <Button variant="secondary" size="sm" className="h-8 px-3 rounded-none bg-gray-400 text-white hover:bg-gray-500 text-xs shadow-none whitespace-nowrap">인증번호받기</Button>
                                            <span className="text-xs font-bold text-gray-700 whitespace-nowrap">인증번호 :</span>
                                            <Input className="w-[120px] h-8 rounded-sm border-gray-300" />
                                            <Button variant="secondary" size="sm" className="h-8 px-3 rounded-none bg-gray-600 text-white hover:bg-gray-700 text-xs shadow-none whitespace-nowrap">인증완료</Button>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">(미인증)</span>
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
                            <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 border-r border-gray-200 text-left">메모</th>
                            <td className="p-3">
                                <textarea 
                                    className="w-full h-24 p-2 border border-gray-300 rounded-sm text-xs resize-none focus:outline-none focus:border-blue-500 block"
                                    value={formState.memo}
                                    onChange={(e) => handleChange("memo", e.target.value)}
                                />
                            </td>
                        </tr>

                        {/* 권한 설정 (별도 섹션으로 분리됨에 따라 여기서는 제거하거나 아래쪽으로 이동) */}
                        {/* 이미지상 권한 설정은 별도 헤더를 가진 섹션으로 보임. 테이블 끊고 새로 시작해야 함. */}
                    </tbody>
                </table>
            </div>

            {/* 권한 설정 Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">권한 설정</h2>
                    <span className="border border-gray-300 w-5 h-5 flex items-center justify-center text-gray-500 text-xs rounded-sm cursor-help">?</span>
                </div>
                <div className="border-t border-gray-400">
                     <table className="w-full text-left text-xs border-collapse">
                        <tbody>
                             <tr className="border-b border-gray-200">
                                <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 w-[160px] border-r border-gray-200 text-left">
                                    메뉴 권한 설정
                                </th>
                                <td className="p-3">
                                     <Button 
                                        variant="secondary" 
                                        size="sm" 
                                        className="h-8 px-4 bg-gray-400 text-white hover:bg-gray-500 rounded-none text-xs"
                                        onClick={() => setIsPermissionDialogOpen(true)}
                                     >
                                        운영자 권한 설정
                                     </Button>
                                </td>
                             </tr>
                             <tr className="border-b border-gray-200">
                                <th className="bg-[#fbfbfb] p-3 font-normal text-gray-700 w-[160px] border-r border-gray-200 text-left">
                                    운영자 IP 접속제한
                                </th>
                                <td className="p-3">
                                    <RadioGroup 
                                        value={formState.ipRestriction ? "used" : "not_used"}
                                        onValueChange={(v) => handleChange("ipRestriction", v === "used")}
                                        className="flex items-center gap-6"
                                    >
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="used" id="ip-used" />
                                            <Label htmlFor="ip-used" className="font-normal cursor-pointer text-gray-600">사용함</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="not_used" id="ip-not-used" className="text-red-500 border-red-500" />
                                            <Label htmlFor="ip-not-used" className="font-normal cursor-pointer text-gray-600">사용안함</Label>
                                        </div>
                                    </RadioGroup>
                                </td>
                             </tr>
                        </tbody>
                     </table>
                </div>
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

            <Dialog open={alertDialog.open} onOpenChange={(open) => setAlertDialog(prev => ({ ...prev, open }))}>
                <DialogContent className="max-w-[400px] p-0 gap-0 border-0 shadow-xl [&>button]:hidden">
                    <div className="p-6 bg-white rounded-sm space-y-4">
                        <div className="flex justify-between items-center border-b pb-2 border-gray-500">
                             <DialogTitle className="font-bold text-lg">{alertDialog.title}</DialogTitle>
                             <button onClick={() => setAlertDialog(prev => ({ ...prev, open: false }))} className="text-gray-500 hover:text-gray-700">
                                 <span className="text-2xl">&times;</span>
                             </button>
                        </div>
                        <div className="py-2 text-sm text-gray-700 min-h-[40px]">
                            {alertDialog.message}
                        </div>
                        <div className="flex justify-center border-t border-gray-100 pt-4">
                             <Button 
                                className="bg-gray-600 hover:bg-gray-700 text-white rounded-none w-24 h-9" 
                                onClick={() => setAlertDialog(prev => ({ ...prev, open: false }))}
                             >
                                 확인
                             </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
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
                                             {["관리자 기본", "상품", "주문/배송", "회원", "게시판", "공급사", "통계"].includes(item) && (
                                                <Button variant="outline" size="sm" className="h-7 px-3 text-xs border-gray-300 bg-white hover:bg-gray-50">보기</Button>
                                             )}
                                         </div>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </div>

                    <div className="p-4 border-t bg-white flex justify-center gap-2">
                         <Button variant="outline" onClick={() => setIsPermissionDialogOpen(false)} className="h-10 px-8 rounded-none border-gray-300 hover:bg-gray-50">취소</Button>
                         <Button className="h-10 px-8 rounded-none bg-gray-600 hover:bg-gray-700 text-white" onClick={() => setIsPermissionDialogOpen(false)}>확인</Button>
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
                </DialogContent>
            </Dialog>
        </div>
    );
}
