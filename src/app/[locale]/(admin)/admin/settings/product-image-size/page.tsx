"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Youtube, ArrowUp, ArrowDown, BookOpen, Plus, Minus } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { getProductImageSizeSettingsAction, updateProductImageSizeSettingsAction } from "@/actions/basic-policy-actions";

interface ImageSize {
    width: number | string;
}

interface BasicImages {
    [key: string]: ImageSize;
    zoom: ImageSize;
    detail: ImageSize;
    thumb: ImageSize;
}

interface ListImage {
    id: string;
    name: string;
    width: number | string;
    type: "default" | "added";
}

export default function ProductImageSizeSettingsPage() {
    const [isPending, startTransition] = useTransition();

    const [resizeMethod, setResizeMethod] = useState("ratio");
    const [basicImages, setBasicImages] = useState<BasicImages>({
        zoom: { width: 600 },
        detail: { width: 600 },
        thumb: { width: 150 }
    });
    const [listImages, setListImages] = useState<ListImage[]>([
         { id: "default", name: "리스트 이미지(기본)", width: 180, type: "default" }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getProductImageSizeSettingsAction();
            if (result.success && result.settings) {
                setResizeMethod(result.settings.resizeMethod);
                if (result.settings.basicImages) {
                    setBasicImages(result.settings.basicImages as unknown as BasicImages);
                }
                if (result.settings.listImages) {
                    setListImages(result.settings.listImages as unknown as ListImage[]);
                }
            }
        };
        fetchData();
    }, []);

    const handleSave = () => {
        startTransition(async () => {
            const result = await updateProductImageSizeSettingsAction({
                resizeMethod,
                basicImages: basicImages as unknown as Record<string, Record<string, number | string>>,
                listImages: listImages as unknown as Record<string, string | number>[]
            });
            if (result.success) {
                alert("저장되었습니다.");
            } else {
                alert(result.error || "저장 실패");
            }
        });
    };

    const handleBasicImageChange = (key: string, value: string) => {
        setBasicImages(prev => ({
            ...prev,
            [key]: { width: value }
        }));
    };

    const handleAddListImage = () => {
        if (listImages.length >= 10) {
            alert("리스트 이미지는 최대 10개까지 추가할 수 있습니다.");
            return;
        }
        const newItem: ListImage = {
            id: crypto.randomUUID(),
            name: `추가 이미지 ${listImages.length}`,
            width: 200,
            type: "added"
        };
        setListImages(prev => [...prev, newItem]);
    };

    const handleDeleteListImage = (id: string) => {
        setListImages(prev => prev.filter(item => item.id !== id));
    };

    const handleListImageChange = (id: string, value: string) => {
        setListImages(prev => prev.map(item => item.id === id ? { ...item, width: value } : item));
    };

    const defaultListImage = listImages.find(item => item.type === "default") || { id: "default", name: "리스트 이미지(기본)", width: 180, type: "default" };
    const addedListImages = listImages.filter(item => item.type !== "default");

    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">상품 이미지 사이즈 설정</h1>
                <Button 
                    className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium"
                    onClick={handleSave}
                    disabled={isPending}
                >
                    {isPending ? "저장 중..." : "저장"}
                </Button>
            </div>

            {/* Section 1: Image Size Setting Method */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">이미지사이즈 설정 방법</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border border-gray-300 border-x-0 border-b-0 space-y-4 pt-4">
                     <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 items-center flex">
                            설정 방법 선택
                        </div>
                        <div className="p-4 space-y-2">
                            <RadioGroup value={resizeMethod} onValueChange={setResizeMethod} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="ratio" id="ratio" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]"/>
                                    <Label htmlFor="ratio" className="font-normal cursor-pointer">가로 사이즈 기준 비율 조정 <span className="text-blue-500">(세로사이즈가 가로사이즈에 따라 자동 비율 조정됩니다.)</span></Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="fixed" id="fixed" className="text-[#FF424D] border-gray-300 data-[state=checked]:border-[#FF424D] data-[state=checked]:bg-[#FF424D]" />
                                    <Label htmlFor="fixed" className="font-normal cursor-pointer">가로 세로 사이즈 고정 <span className="text-blue-500">(가로 세로 사이즈를 직접 등록합니다.)</span></Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                <div className="text-xs space-y-1 text-gray-500 leading-relaxed">
                    <p className="text-[#FF424D] font-bold flex items-start gap-1">
                        <span className="w-3.5 h-3.5 flex justify-center items-center bg-[#FF424D] text-white pb-0.5 rounded-sm text-[10px] leading-none mt-0.5">!</span>
                        상품 이미지 사이즈 설정은 PC쇼핑몰에만 적용되며, 모바일쇼핑몰은 브라우저 크기에 따라 자동 비율 조정되어 출력 됩니다.
                    </p>
                    <p className="pl-5">가로 사이즈 기준 비율 조정 : 등록된 이미지의 가로 세로 비율이 일정하지 않은 경우 세로사이즈가 일정하지 않을 수 있습니다.</p>
                     <p className="pl-5">가로 세로 사이즈 고정 : 설정된 사이즈보다 크거나 작은 이미지를 등록하면 설정된 사이즈대로 확대/축소(리사이징) 됩니다.</p>
                </div>
            </div>

            {/* Section 2: Basic Image Size Settings */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">기본 이미지 사이즈 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border-t border-gray-400">
                     {/* Row 1: Zoom */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">확대 이미지</div>
                        <div className="p-4 flex items-center gap-2">
                            <span>가로</span>
                            <Input 
                                className="w-24 h-8" 
                                value={basicImages.zoom?.width} 
                                onChange={(e) => handleBasicImageChange("zoom", e.target.value)}
                            />
                            <span>픽셀(pixel) / 세로 : 가로사이즈에 따라 자동 비율 조정</span>
                            <Button variant="outline" size="sm" className="h-8 px-2 text-xs font-normal border-gray-300 text-gray-600">
                                <Plus size={12} className="mr-1"/> 추가
                            </Button>
                        </div>
                    </div>
                     {/* Row 2: Detail */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">상세 이미지</div>
                        <div className="p-4 flex items-center gap-2">
                            <span>가로</span>
                            <Input 
                                className="w-24 h-8" 
                                value={basicImages.detail?.width} 
                                onChange={(e) => handleBasicImageChange("detail", e.target.value)}
                            />
                            <span>픽셀(pixel) / 세로 : 가로사이즈에 따라 자동 비율 조정</span>
                            <Button variant="outline" size="sm" className="h-8 px-2 text-xs font-normal border-gray-300 text-gray-600">
                                <Plus size={12} className="mr-1"/> 추가
                            </Button>
                        </div>
                    </div>
                     {/* Row 3: Thumb */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">썸네일 이미지</div>
                        <div className="p-4 flex items-center gap-2">
                            <span>가로</span>
                            <Input 
                                className="w-24 h-8" 
                                value={basicImages.thumb?.width} 
                                onChange={(e) => handleBasicImageChange("thumb", e.target.value)}
                            />
                            <span>픽셀(pixel) / 세로 : 가로사이즈에 따라 자동 비율 조정</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: List Image Size Settings / Add */}
            <div className="space-y-4 pt-4">
                 <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">리스트 이미지 사이즈 설정 / 추가</h2>
                     <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border-t border-gray-400">
                    {/* Default Row */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center">{defaultListImage.name}</div>
                        <div className="p-4 space-y-2">
                             <div className="flex items-center gap-2">
                                <span>가로</span>
                                <Input 
                                    className="w-24 h-8" 
                                    value={defaultListImage.width} 
                                    onChange={(e) => handleListImageChange(defaultListImage.id, e.target.value)}
                                />
                                <span>픽셀(pixel) / 세로 : 가로사이즈에 따라 자동 비율 조정</span>
                                <Button 
                                    size="sm" 
                                    className="h-8 px-3 text-xs font-normal bg-[#555555] hover:bg-[#444444] text-white rounded-sm"
                                    onClick={handleAddListImage}
                                >
                                    리스트 이미지 추가
                                </Button>
                            </div>
                            <p className="text-[#FF424D] font-medium flex items-center gap-1 text-xs">
                                <span className="w-3.5 h-3.5 flex justify-center items-center bg-[#FF424D] text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                                리스트 이미지는 최대 10개까지 추가할 수 있습니다.
                            </p>
                        </div>
                    </div>

                    {/* Additional List Items */}
                    {addedListImages.map((item) => (
                        <div key={item.id} className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                            <div className="p-4 flex items-center justify-center">
                                <Button variant="outline" className="w-full h-8 text-gray-500 font-normal border-gray-300">{item.name}</Button>
                            </div>
                            <div className="p-4 flex items-center gap-2">
                                 <span>가로</span>
                                <Input 
                                    className="w-24 h-8" 
                                    value={item.width} 
                                    onChange={(e) => handleListImageChange(item.id, e.target.value)}
                                />
                                <span>픽셀(pixel) / 세로 : 가로사이즈에 따라 자동 비율 조정</span>
                                <Button 
                                    size="sm" 
                                    className="h-8 px-3 text-xs font-normal bg-[#555555] hover:bg-[#444444] text-white rounded-sm"
                                    onClick={() => handleDeleteListImage(item.id)}
                                >
                                    <Minus size={12} className="mr-1"/> 삭제
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                 <div className="space-y-1 text-xs text-gray-500 pt-2">
                    <p className="text-[#FF424D] font-bold flex items-center gap-1">
                        <span className="w-3.5 h-3.5 flex justify-center items-center bg-[#FF424D] text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                        리스트 이미지 설정값이 연동된 경우 수정만 가능합니다. (연동된 리스트 이미지 설정값 변경 시 삭제 가능)
                    </p>
                    <p className="text-[#FF424D] font-bold flex items-center gap-1">
                        <span className="w-3.5 h-3.5 flex justify-center items-center bg-[#FF424D] text-white pb-0.5 rounded-sm text-[10px] leading-none">!</span>
                        연동된 리스트 이미지 설정값은 하기 페이지에서 수정 가능합니다.
                    </p>
                    <div className="pl-5 space-y-0.5">
                        <p>상품 &gt; 상품 노출형태 관리 &gt; 테마 관리 <a href="#" className="text-blue-500 underline decoration-blue-500">바로가기 &gt;</a></p>
                        <p>상품 &gt; 상품 노출형태 관리 &gt; 관련상품 노출 설정 <a href="#" className="text-blue-500 underline decoration-blue-500">바로가기 &gt;</a></p>
                        <p>상품 &gt; 상품 노출형태 관리 &gt; 인기상품 노출 관리 <a href="#" className="text-blue-500 underline decoration-blue-500">바로가기 &gt;</a></p>
                        <p>상품 &gt; 상품 노출형태 관리 &gt; 검색창 추천상품 노출 설정 <a href="#" className="text-blue-500 underline decoration-blue-500">바로가기 &gt;</a></p>
                    </div>
                </div>
            </div>

             {/* Bottom Info */}
             <div className="border border-gray-200 p-6 space-y-4 pt-8 border-l-0 border-r-0 border-b-0 mt-12 bg-white">
                <div className="flex items-center gap-1 text-blue-500 font-bold mb-2">
                    <BookOpen size={16} />
                    <span>안내</span>
                </div>
                <div className="text-xs text-gray-500 space-y-4 leading-relaxed">
                    <div className="space-y-2">
                        <p className="font-bold text-gray-700 text-sm">[상품 이미지 사이즈 설정] 이미지 사이즈 변경 시 쇼핑몰 화면에 바로 적용되나요?</p>
                        <p>· 기본 이미지 사이즈인 &quot;확대이미지 / 상세이미지 / 썸네일이미지&quot;와 리스트 이미지의 경우 이미지 사이즈를 변경해도 쇼핑몰에 바로 적용되지 않습니다.</p>
                        <p> - 해당 부분은 상품 등록 시 기본값으로 적용되기 때문에, &quot;상품 &gt; 상품 관리 &gt; 상품 수정&quot;화면에서 이미지를 재등록하셔야 변경된 이미지 사이즈가 반영됩니다.</p>
                    </div>
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-12 h-12 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold"><Youtube size={20}/></span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-[#6E36E2] hover:bg-[#6E36E2]/90 shadow-lg text-white p-0 flex flex-col items-center justify-center border-0 gap-0">
                    <span className="text-[10px] leading-none">따라</span>
                    <span className="text-[10px] leading-none">하기</span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    <ArrowUp size={20} />
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    <ArrowDown size={20} />
                </Button>
            </div>
        </div>
    );
}
