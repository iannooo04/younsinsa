"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useParams } from "next/navigation";
import { getProductCommonInfoAction, updateProductCommonInfoAction } from "@/actions/product-common-info-actions";
import { format } from "date-fns";

export default function EditCommonInfoPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    
    const [formData, setFormData] = useState({
        title: "",
        exposureType: "ALL",
        startDate: "",
        endDate: "",
        displayStatus: "DISPLAY",
        isSameContent: true,
        contentPC: "",
        contentMobile: "",
        productCondition: { type: "ALL", ids: [] },
        exceptionCondition: { ids: [] },
    });

    useEffect(() => {
        async function load() {
            setFetching(true);
            const res = await getProductCommonInfoAction(id);
            if (res.success && res.data) {
                const item = res.data;
                setFormData({
                    title: item.title,
                    exposureType: item.exposureType,
                    startDate: item.startDate ? format(new Date(item.startDate), "yyyy-MM-dd") : "",
                    endDate: item.endDate ? format(new Date(item.endDate), "yyyy-MM-dd") : "",
                    displayStatus: item.displayStatus,
                    isSameContent: item.isSameContent,
                    contentPC: item.contentPC || "",
                    contentMobile: item.contentMobile || "",
                    productCondition: (item.productCondition as any) || { type: "ALL", ids: [] },
                    exceptionCondition: (item.exceptionCondition as any) || { ids: [] },
                });
            } else {
                alert(res.error || "데이터 부르기 실패");
                router.push("/admin/products/common-info");
            }
            setFetching(false);
        }
        if (id) load();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title) return alert("제목을 입력해주세요.");
        
        setLoading(true);
        const res = await updateProductCommonInfoAction(id, formData);
        if (res.success) {
            alert("수정되었습니다.");
            router.push("/admin/products/common-info");
        } else {
            alert(res.error || "수정 실패");
        }
        setLoading(false);
    };

    if (fetching) return <div className="p-10 text-center">로딩중...</div>;

    return (
        <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24">
            <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">공통정보 수정</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border border-gray-200">
                    <div className="bg-gray-50 p-3 border-b border-gray-200 font-bold text-gray-700">기본 정보</div>
                    <div className="p-4 space-y-4">
                        <div className="flex items-center">
                            <Label className="w-32 font-bold text-gray-700">공통정보 제목</Label>
                            <Input 
                                className="w-[500px] h-9" 
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="예: 상단 배송안내"
                            />
                        </div>

                        <div className="flex items-center">
                            <Label className="w-32 font-bold text-gray-700">노출 기간</Label>
                            <div className="flex items-center gap-6">
                                <RadioGroup 
                                    value={formData.exposureType} 
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, exposureType: val }))}
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="ALL" id="exp-all" />
                                        <Label htmlFor="exp-all">전체</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="UNLIMITED" id="exp-unlim" />
                                        <Label htmlFor="exp-unlim">제한없음</Label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="LIMITED" id="exp-lim" />
                                        <Label htmlFor="exp-lim">기간제한</Label>
                                    </div>
                                </RadioGroup>

                                {formData.exposureType === "LIMITED" && (
                                    <div className="flex items-center gap-2">
                                        <Input 
                                            type="date" 
                                            className="h-9 w-40" 
                                            value={formData.startDate}
                                            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                        />
                                        <span>~</span>
                                        <Input 
                                            type="date" 
                                            className="h-9 w-40" 
                                            value={formData.endDate}
                                            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Label className="w-32 font-bold text-gray-700">노출 상태</Label>
                            <RadioGroup 
                                value={formData.displayStatus} 
                                onValueChange={(val: any) => setFormData(prev => ({ ...prev, displayStatus: val }))}
                                className="flex gap-4"
                            >
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="DISPLAY" id="ds-show" />
                                    <Label htmlFor="ds-show">노출함</Label>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="HIDDEN" id="ds-hide" />
                                    <Label htmlFor="ds-hide">노출안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200">
                    <div className="bg-gray-50 p-3 border-b border-gray-200 font-bold text-gray-700">상세 내용</div>
                    <div className="p-4 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Checkbox 
                                id="same-content" 
                                checked={formData.isSameContent}
                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isSameContent: !!checked }))}
                            />
                            <Label htmlFor="same-content">PC/모바일 동일 적용</Label>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <Label className="block mb-2 font-bold text-gray-600">PC 내용 (또는 공통 내용)</Label>
                                <textarea 
                                    className="w-full h-40 p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                                    value={formData.contentPC}
                                    onChange={(e) => setFormData(prev => ({ ...prev, contentPC: e.target.value }))}
                                    placeholder="상세 내용을 입력하세요 (HTML 지원)"
                                />
                            </div>

                            {!formData.isSameContent && (
                                <div>
                                    <Label className="block mb-2 font-bold text-gray-600">모바일 내용</Label>
                                    <textarea 
                                        className="w-full h-40 p-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                                        value={formData.contentMobile}
                                        onChange={(e) => setFormData(prev => ({ ...prev, contentMobile: e.target.value }))}
                                        placeholder="모바일용 상세 내용을 입력하세요"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-3">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => router.back()}
                        className="w-32 h-10 font-bold"
                    >취소</Button>
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-32 h-10 bg-red-500 hover:bg-red-600 text-white font-bold"
                    >
                        {loading ? "수정중..." : "공통정보 수정"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
