"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, X } from "lucide-react";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupplierAction } from "@/actions/supplier-actions";

export default function SupplierRegisterPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // 폼 상태
    const [formState, setFormState] = useState({
        name: "",
        code: "", // 시스템 자동생성이면 생략 가능하지만 수동 입력도 지원
        status: "ACTIVE",
        
        businessName: "",
        ceoName: "",
        businessNo: "",
        subBusinessNo: "",
        sector: "",
        detailSector: "",
        
        email: "",
        phone: "",
        fax: "",
        zipCode: "",
        address: "",
        addressDetail: "",
        
        bankName: "",
        accountNumber: "",
        depositorName: "",
        
        commissionRate: 0,
        shippingFee: 0,
        
        memo: "",
    });

    const handleChange = (field: string, value: any) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (!formState.name) {
            alert("공급사명을 입력해주세요.");
            return;
        }

        startTransition(async () => {
            const dataToSubmit = {
                ...formState,
                // Ensure number conversion
                commissionRate: Number(formState.commissionRate),
                shippingFee: Number(formState.shippingFee),
            };
            
            const result = await createSupplierAction(dataToSubmit);

            if (result.success) {
                alert("공급사가 등록되었습니다.");
                router.push("/admin/settings/supplier");
            } else {
                alert(result.error || "등록에 실패했습니다.");
            }
        });
    };

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
             {/* Header */}
             <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">공급사 등록</h1>
                <div className="flex gap-2">
                    <Link href="/admin/settings/supplier">
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

            {/* Basic Info */}
            <h3 className="text-lg font-bold text-gray-800 mt-6 mb-2">기본 정보</h3>
            <div className="border-t border-gray-400">
                <table className="w-full text-left text-xs border-collapse">
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 w-[150px] border-r border-gray-200">
                                공급사명 <span className="text-red-500">*</span>
                            </th>
                            <td className="p-3">
                                <Input 
                                    className="w-[300px] h-8 rounded-sm border-gray-300"
                                    value={formState.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                            </td>
                        </tr>
                         <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">
                                공급사 코드
                            </th>
                            <td className="p-3">
                                <div className="flex items-center gap-2">
                                    <Input 
                                        className="w-[200px] h-8 rounded-sm border-gray-300"
                                        placeholder="자동생성 (입력 시 수동설정)"
                                        value={formState.code}
                                        onChange={(e) => handleChange("code", e.target.value)}
                                    />
                                    <span className="text-gray-500 text-[11px]">* 미입력 시 자동 생성됩니다.</span>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 border-r border-gray-200">
                                상태
                            </th>
                            <td className="p-3">
                                <RadioGroup 
                                    value={formState.status}
                                    onValueChange={(v) => handleChange("status", v)}
                                    className="flex items-center gap-6"
                                >
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="ACTIVE" id="st-active" />
                                        <Label htmlFor="st-active" className="cursor-pointer">정상</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="SUSPENDED" id="st-suspended" />
                                        <Label htmlFor="st-suspended" className="cursor-pointer">거래중지</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="WITHDRAWN" id="st-withdrawn" />
                                        <Label htmlFor="st-withdrawn" className="cursor-pointer">탈퇴/종료</Label>
                                    </div>
                                </RadioGroup>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Business Info */}
            <h3 className="text-lg font-bold text-gray-800 mt-8 mb-2">사업자 정보</h3>
            <div className="border-t border-gray-400">
                <table className="w-full text-left text-xs border-collapse">
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 w-[150px] border-r border-gray-200">사업자 정보</th>
                            <td className="p-3 space-y-2">
                                <div className="flex gap-2 items-center">
                                    <span className="w-20 inline-block font-medium">상호명</span>
                                    <Input className="w-[200px] h-8 rounded-sm border-gray-300" value={formState.businessName} onChange={(e) => handleChange("businessName", e.target.value)} />
                                    <span className="w-20 inline-block font-medium pl-4">대표자명</span>
                                    <Input className="w-[150px] h-8 rounded-sm border-gray-300" value={formState.ceoName} onChange={(e) => handleChange("ceoName", e.target.value)} />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className="w-20 inline-block font-medium">사업자번호</span>
                                    <Input className="w-[200px] h-8 rounded-sm border-gray-300" value={formState.businessNo} onChange={(e) => handleChange("businessNo", e.target.value)} />
                                    <span className="w-20 inline-block font-medium pl-4">종사업장번호</span>
                                    <Input className="w-[100px] h-8 rounded-sm border-gray-300" value={formState.subBusinessNo} onChange={(e) => handleChange("subBusinessNo", e.target.value)} />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className="w-20 inline-block font-medium">업태</span>
                                    <Input className="w-[200px] h-8 rounded-sm border-gray-300" value={formState.sector} onChange={(e) => handleChange("sector", e.target.value)} />
                                    <span className="w-20 inline-block font-medium pl-4">종목</span>
                                    <Input className="w-[200px] h-8 rounded-sm border-gray-300" value={formState.detailSector} onChange={(e) => handleChange("detailSector", e.target.value)} />
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 w-[150px] border-r border-gray-200">연락처/주소</th>
                            <td className="p-3 space-y-2">
                                <div className="flex gap-2 items-center">
                                    <span className="w-20 inline-block font-medium">이메일</span>
                                    <Input className="w-[250px] h-8 rounded-sm border-gray-300" value={formState.email} onChange={(e) => handleChange("email", e.target.value)} />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className="w-20 inline-block font-medium">전화번호</span>
                                    <Input className="w-[150px] h-8 rounded-sm border-gray-300" value={formState.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                                    <span className="w-20 inline-block font-medium pl-4">팩스</span>
                                    <Input className="w-[150px] h-8 rounded-sm border-gray-300" value={formState.fax} onChange={(e) => handleChange("fax", e.target.value)} />
                                </div>
                                <div className="flex gap-2 items-center pt-1">
                                    <span className="w-20 inline-block font-medium">주소</span>
                                    <Input placeholder="우편번호" className="w-[80px] h-8 rounded-sm border-gray-300" value={formState.zipCode} onChange={(e) => handleChange("zipCode", e.target.value)} />
                                    <Button size="sm" variant="outline" className="h-8 text-xs">우편번호 검색</Button>
                                </div>
                                <div className="flex gap-2 items-center pl-[88px]">
                                    <Input placeholder="기본주소" className="w-[300px] h-8 rounded-sm border-gray-300" value={formState.address} onChange={(e) => handleChange("address", e.target.value)} />
                                    <Input placeholder="상세주소" className="w-[200px] h-8 rounded-sm border-gray-300" value={formState.addressDetail} onChange={(e) => handleChange("addressDetail", e.target.value)} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Settlement Info */}
            <h3 className="text-lg font-bold text-gray-800 mt-8 mb-2">정산/계약 정보</h3>
            <div className="border-t border-gray-400">
                <table className="w-full text-left text-xs border-collapse">
                    <tbody>
                         <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 w-[150px] border-r border-gray-200">정산 계좌</th>
                            <td className="p-3">
                                 <div className="flex gap-2 items-center">
                                    <Input placeholder="은행명" className="w-[120px] h-8 rounded-sm border-gray-300" value={formState.bankName} onChange={(e) => handleChange("bankName", e.target.value)} />
                                    <Input placeholder="계좌번호" className="w-[200px] h-8 rounded-sm border-gray-300" value={formState.accountNumber} onChange={(e) => handleChange("accountNumber", e.target.value)} />
                                    <Input placeholder="예금주" className="w-[120px] h-8 rounded-sm border-gray-300" value={formState.depositorName} onChange={(e) => handleChange("depositorName", e.target.value)} />
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 w-[150px] border-r border-gray-200">수수료/배송비</th>
                            <td className="p-3">
                                 <div className="flex gap-2 items-center mb-2">
                                    <span className="w-20 inline-block font-medium">수수료율</span>
                                    <Input type="number" className="w-[80px] h-8 rounded-sm border-gray-300 text-right" value={formState.commissionRate} onChange={(e) => handleChange("commissionRate", e.target.value)} />
                                    <span>%</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <span className="w-20 inline-block font-medium">기본 배송비</span>
                                    <Input type="number" className="w-[100px] h-8 rounded-sm border-gray-300 text-right" value={formState.shippingFee} onChange={(e) => handleChange("shippingFee", e.target.value)} />
                                    <span>원</span>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <th className="bg-gray-50 p-3 font-medium text-gray-700 w-[150px] border-r border-gray-200">관리자 메모</th>
                            <td className="p-3">
                                <textarea 
                                    className="w-full h-20 p-2 border border-gray-300 rounded-sm text-xs resize-none focus:outline-none"
                                    value={formState.memo}
                                    onChange={(e) => handleChange("memo", e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center pt-6 gap-2">
                <Link href="/admin/settings/supplier">
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
