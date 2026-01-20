"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState, useTransition, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupplierByIdAction, updateSupplierAction } from "@/actions/supplier-actions";
import { SupplierStatus } from "@/generated/prisma";

export default function SupplierEditPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);

    // 폼 상태
    const [formState, setFormState] = useState({
        name: "",
        code: "", 
        status: "ACTIVE" as SupplierStatus,
        
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

    useEffect(() => {
        const loadData = async () => {
             const result = await getSupplierByIdAction(id);
             if (result.success && result.supplier) {
                 const s = result.supplier;
                 setFormState({
                     name: s.name,
                     code: s.code || "",
                     status: s.status,
                     businessName: s.businessName || "",
                     ceoName: s.ceoName || "",
                     businessNo: s.businessNo || "",
                     subBusinessNo: s.subBusinessNo || "",
                     sector: s.sector || "",
                     detailSector: s.detailSector || "",
                     email: s.email || "",
                     phone: s.phone || "",
                     fax: s.fax || "",
                     zipCode: s.zipCode || "",
                     address: s.address || "",
                     addressDetail: s.addressDetail || "",
                     bankName: s.bankName || "",
                     accountNumber: s.accountNumber || "",
                     depositorName: s.depositorName || "",
                     commissionRate: Number(s.commissionRate) || 0,
                     shippingFee: s.shippingFee || 0,
                     memo: s.memo || "",
                 });
             } else {
                 alert("공급사 정보를 불러올 수 없습니다.");
                 router.push("/admin/settings/supplier");
             }
             setIsLoading(false);
        };
        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleChange = (field: string, value: string | number) => {
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
                status: formState.status as SupplierStatus,
                // Ensure number conversion
                commissionRate: Number(formState.commissionRate),
                shippingFee: Number(formState.shippingFee),
            };
            
            const result = await updateSupplierAction(id, dataToSubmit);

            if (result.success) {
                alert("공급사 정보가 수정되었습니다.");
                router.push("/admin/settings/supplier");
            } else {
                alert(result.error || "수정에 실패했습니다.");
            }
        });
    };

    if (isLoading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
             {/* Header */}
             <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">공급사 수정</h1>
                <div className="flex gap-2">
                    <Link href="/admin/settings/supplier">
                        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-sm h-9 px-4 text-sm font-medium">
                            취소
                        </Button>
                    </Link>
                    <Button 
                        className="bg-[#4B5563] hover:bg-[#374151] text-white rounded-sm h-9 px-8 text-sm font-medium"
                        onClick={handleSubmit}
                        disabled={isPending}
                    >
                        {isPending ? "수정 중..." : "수정"}
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
                                        className="w-[200px] h-8 rounded-sm border-gray-300 bg-gray-50"
                                        placeholder="자동생성"
                                        value={formState.code}
                                        readOnly
                                        disabled
                                    />
                                    <span className="text-gray-500 text-[11px]">* 코드는 수정할 수 없습니다.</span>
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
                    className="bg-[#4B5563] hover:bg-[#374151] text-white rounded-sm h-10 px-8 text-sm font-medium"
                    onClick={handleSubmit}
                    disabled={isPending}
                >
                    {isPending ? "수정 중..." : "수정"}
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
