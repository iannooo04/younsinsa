"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createBannerAction, updateBannerAction } from "@/actions/banner-actions";
import { uploadImageAction } from "@/actions/product-actions";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BannerForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const isEdit = !!initialData;

    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [imageUrl, setImageUrl] = useState(initialData?.pcImage || initialData?.mobileImage || "");
    const [linkUrl, setLinkUrl] = useState(initialData?.linkUrl || "");
    const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder?.toString() || "0");
    const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
    const [targetGroup, setTargetGroup] = useState(initialData?.targetGroup || "home");
    const [isPermanent, setIsPermanent] = useState(!initialData?.startDate && !initialData?.endDate);
    
    // YYYY-MM-DD
    const [startDate, setStartDate] = useState(initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : "");
    const [endDate, setEndDate] = useState(initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : "");

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await uploadImageAction(formData);
            if (res.success && res.url) {
                setImageUrl(res.url);
            } else {
                alert("이미지 업로드에 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("이미지 업로드 중 오류가 발생했습니다.");
        }
    };

    const handleSubmit = async () => {
        if (!title.trim()) return alert("배너명을 입력해주세요.");
        if (!imageUrl) return alert("배너 이미지를 등록해 주세요.");

        setLoading(true);
        const data = {
            title,
            description,
            pcImage: imageUrl,
            mobileImage: imageUrl,
            linkUrl,
            displayOrder: parseInt(displayOrder, 10),
            isActive,
            targetGroup,
            startDate: isPermanent || !startDate ? null : new Date(startDate),
            endDate: isPermanent || !endDate ? null : new Date(endDate + 'T23:59:59'),
        };

        if (isEdit) {
            const res = await updateBannerAction(initialData.id, data);
            alert(res.message);
            if (res.success) router.push('/admin/products/banners');
        } else {
            const res = await createBannerAction(data);
            alert(res.message);
            if (res.success) router.push('/admin/products/banners');
        }
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto font-sans text-sm pb-24 bg-white rounded shadow-sm border mt-6">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-xl font-bold">{isEdit ? "메인 배너 수정" : "메인 배너 등록"}</h1>
                <div className="space-x-2">
                    <Button variant="outline" onClick={() => router.back()} disabled={loading}>취소</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit} disabled={loading}>
                        {isEdit ? "수정완료" : "등록완료"}
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-4 gap-4 items-center border-b pb-4">
                    <Label className="font-bold text-gray-700">배너명 (필수)</Label>
                    <div className="col-span-3">
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="배너명 입력" className="max-w-md" />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 items-center border-b pb-4">
                    <Label className="font-bold text-gray-700">설명문구 (서브텍스트)</Label>
                    <div className="col-span-3">
                        <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="설명문구 입력 (선택사항)" className="max-w-md" />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 items-center border-b pb-4">
                    <Label className="font-bold text-gray-700">노출 위치 (그룹)</Label>
                    <div className="col-span-3">
                        <Select value={targetGroup} onValueChange={setTargetGroup}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="카테고리 선택" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="home">홈 메인</SelectItem>
                                <SelectItem value="shoes">신발 메인</SelectItem>
                                <SelectItem value="bag">가방 메인</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 items-start border-b pb-4">
                    <Label className="font-bold text-gray-700 pt-2">배너 이미지</Label>
                    <div className="col-span-3 space-y-4">
                        <Input type="file" accept="image/*" onChange={handleImageUpload} className="max-w-md" />
                        {imageUrl && (
                            <div className="relative w-[300px] h-[150px] border rounded bg-gray-50 overflow-hidden">
                                <Image src={imageUrl} alt="Banner Image" fill sizes="300px" className="object-contain" />
                            </div>
                        )}
                        <p className="text-xs text-gray-500">권장 사이즈: 비율에 맞게 업로드해 주세요.</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 items-center border-b pb-4">
                    <Label className="font-bold text-gray-700">연결 링크 URL</Label>
                    <div className="col-span-3">
                        <Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://..." className="max-w-xl" />
                        <p className="text-xs text-gray-500 mt-1">배너 클릭 시 이동할 경로 (예: /ko/board/12)</p>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 items-center border-b pb-4">
                    <Label className="font-bold text-gray-700">노출 순서</Label>
                    <div className="col-span-3 flex items-center gap-2">
                        <Input 
                            type="number" 
                            value={displayOrder} 
                            onChange={(e) => setDisplayOrder(e.target.value)} 
                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                            className="w-24" 
                        />
                        <span className="text-xs text-gray-500">지정된 숫자가 낮을수록 먼저 노출됩니다 (기본: 0)</span>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 items-center border-b pb-4">
                    <Label className="font-bold text-gray-700">사용 여부</Label>
                    <div className="col-span-3 flex items-center space-x-2">
                        <Checkbox id="is-active" checked={isActive} onCheckedChange={(c) => setIsActive(!!c)} />
                        <Label htmlFor="is-active" className="cursor-pointer">사용함 (체크 해제시 화면에 노출되지 않음)</Label>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 items-center pb-4">
                    <Label className="font-bold text-gray-700">노출 기간 설정</Label>
                    <div className="col-span-3 space-y-3">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="is-perm" checked={isPermanent} onCheckedChange={(c) => setIsPermanent(!!c)} />
                            <Label htmlFor="is-perm" className="cursor-pointer">기간 무제한 설정 (상시 노출)</Label>
                        </div>
                        {!isPermanent && (
                            <div className="flex items-center gap-2">
                                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-40" />
                                <span>~</span>
                                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-40" />
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
