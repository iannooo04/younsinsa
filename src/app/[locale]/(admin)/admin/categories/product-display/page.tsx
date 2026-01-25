"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, ChevronUp, ChevronDown } from "lucide-react";
import { 
    getCategoryLevelsAction, 
    getCategoryDisplaySettingsAction, 
    saveCategoryDisplaySettingsAction,
    getCategoryProductsAction 
} from "@/actions/category-display-actions";

export default function CategoryProductDisplayPage() {
    const router = useRouter();
    
    // Categories Hierarchy
    interface Category {
        id: string;
        name: string;
        children?: Category[];
    }
    const [categories, setCategories] = useState<Category[]>([]);
    
    // Selection State
    const [selectedDepth1, setSelectedDepth1] = useState<string>("");
    const [selectedDepth2, setSelectedDepth2] = useState<string>("");
    const [selectedDepth3, setSelectedDepth3] = useState<string>("");
    const [selectedDepth4, setSelectedDepth4] = useState<string>("");

    const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
    // const [currentCategoryName, setCurrentCategoryName] = useState<string>("");

    // Data Display State
    const [displaySettings, setDisplaySettings] = useState<{
        displayType: string;
        displayMethod: string;
        pcTheme: string;
        mobileTheme: string;
    } | null>(null);
    const [productCount, setProductCount] = useState(0);
    const [products, setProducts] = useState<{
        id: string;
        name: string;
        price: number;
        stockQuantity: number;
        supplier?: { name: string } | null;
        imageUrl?: string;
    }[]>([]);
    const [loading, setLoading] = useState(false);

    // Load Categories
    useEffect(() => {
        getCategoryLevelsAction().then(res => {
            if (res.success) setCategories(res.items);
        });
    }, []);

    // Derived Lists based on selection
    const depth1Items = categories;
    const depth2Items = depth1Items.find(c => c.id === selectedDepth1)?.children || [];
    const depth3Items = depth2Items.find((c: Category) => c.id === selectedDepth2)?.children || [];
    const depth4Items = depth3Items.find((c: Category) => c.id === selectedDepth3)?.children || [];

    // Handle Search / Load Category Data
    const handleSearch = async () => {
        // Determine the deepest selected category
        const targetId = selectedDepth4 || selectedDepth3 || selectedDepth2 || selectedDepth1;
        
        if (!targetId) {
            alert("카테고리를 선택해주세요.");
            return;
        }

        // Find category name
        if (selectedDepth4) {
            // categoryName = depth4Items.find((c: Category) => c.id === selectedDepth4)?.name || "";
        } else if (selectedDepth3) {
            // categoryName = depth3Items.find((c: Category) => c.id === selectedDepth3)?.name || "";
        } else if (selectedDepth2) {
            // categoryName = depth2Items.find((c: Category) => c.id === selectedDepth2)?.name || "";
        } else if (selectedDepth1) {
            // categoryName = depth1Items.find((c: Category) => c.id === selectedDepth1)?.name || "";
        }

        setCurrentCategoryId(targetId);
        // setCurrentCategoryName(categoryName);
        setLoading(true);

        try {
            const [settingsRes, productsRes] = await Promise.all([
                getCategoryDisplaySettingsAction(targetId),
                getCategoryProductsAction(targetId)
            ]);

            if (settingsRes.success) {
                const s = settingsRes.settings;
                setDisplaySettings(s ? {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    displayType: (s as any).displayType || "기본진열",
                    displayMethod: s.displayMethod || "자동",
                    pcTheme: s.pcTheme || "기본형",
                    mobileTheme: s.mobileTheme || "기본형"
                } : { 
                    displayType: "기본진열", 
                    displayMethod: "자동",
                    pcTheme: "기본형", 
                    mobileTheme: "기본형" 
                });
                setProductCount(settingsRes.productCount || 0);
            }
            
            if (productsRes.success) {
                setProducts(productsRes.items || []);
            }
        } catch(e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!currentCategoryId || !displaySettings) {
            alert("카테고리를 선택하고 설정을 확인해주세요.");
            return;
        }

        const res = await saveCategoryDisplaySettingsAction(currentCategoryId, {
            displayMethod: displaySettings.displayMethod,
            pcTheme: displaySettings.pcTheme,
            mobileTheme: displaySettings.mobileTheme
        });

        alert(res.message || "저장되었습니다.");
    };

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">카테고리페이지 상품진열</h1>
                <Button 
                    onClick={handleSave}
                    className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold h-9 w-20 rounded-sm"
                >
                    저장
                </Button>
            </div>

            {/* Category Selection Section */}
            <div>
                <div className="flex items-center gap-1 mb-2">
                    <h2 className="text-sm font-bold text-gray-800">카테고리 선택</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                </div>
                
                <div className="border border-gray-300 bg-white">
                    <div className="flex items-center">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 h-14 flex items-center">카테고리 선택</div>
                        <div className="flex-1 p-3 flex items-center gap-1 h-14">
                            {/* Depth 1 */}
                            <Select value={selectedDepth1} onValueChange={(val) => {
                                setSelectedDepth1(val); 
                                setSelectedDepth2(""); 
                                setSelectedDepth3(""); 
                                setSelectedDepth4("");
                            }}>
                                <SelectTrigger className="w-40 h-8 text-xs"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger>
                                <SelectContent>
                                    {depth1Items.map((c: Category) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
 
                             {/* Depth 2 */}
                             <Select value={selectedDepth2} onValueChange={(val) => {
                                 setSelectedDepth2(val); 
                                 setSelectedDepth3(""); 
                                 setSelectedDepth4("");
                             }}>
                                 <SelectTrigger disabled={!selectedDepth1} className="w-40 h-8 text-xs"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger>
                                 <SelectContent>
                                     {depth2Items.map((c: Category) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                 </SelectContent>
                             </Select>
 
                             {/* Depth 3 */}
                             <Select value={selectedDepth3} onValueChange={(val) => {
                                 setSelectedDepth3(val); 
                                 setSelectedDepth4("");
                             }}>
                                 <SelectTrigger disabled={!selectedDepth2} className="w-40 h-8 text-xs"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger>
                                 <SelectContent>
                                     {depth3Items.map((c: Category) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                 </SelectContent>
                             </Select>
 
                              {/* Depth 4 */}
                              <Select value={selectedDepth4} onValueChange={setSelectedDepth4}>
                                 <SelectTrigger disabled={!selectedDepth3} className="w-40 h-8 text-xs"><SelectValue placeholder="=카테고리선택=" /></SelectTrigger>
                                 <SelectContent>
                                     {depth4Items.map((c: Category) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>

                            <Button 
                                onClick={handleSearch}
                                className="h-8 bg-[#555555] hover:bg-[#444444] text-white text-xs font-bold rounded-sm px-4 ml-1"
                            >
                                검색
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selected Category Info Section */}
            <div>
                <div className="flex items-center gap-1 mb-2 mt-4">
                    <h2 className="text-sm font-bold text-gray-800">선택된 카테고리 정보</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                </div>
                
                <div className="border-t-2 border-gray-400 border-b border-gray-300 bg-white">
                    <div className="flex text-xs text-center">
                        <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 flex items-center justify-center gap-1 border-r border-gray-200">
                            진열타입 <span className="text-gray-400 border border-gray-400 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-normal cursor-help">?</span>
                        </div>
                        <div className="flex-1 bg-white p-3 border-r border-gray-200 flex items-center justify-center text-gray-700">
                            {displaySettings?.displayType || '-'}
                        </div>
                        
                        <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 flex items-center justify-center gap-1 border-r border-gray-200">
                            진열방법 <span className="text-gray-400 border border-gray-400 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-normal cursor-help">?</span>
                        </div>
                        <div className="flex-1 bg-white p-3 border-r border-gray-200 flex items-center justify-center text-gray-700">
                            {displaySettings?.displayMethod || '-'}
                        </div>
                        
                        <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 border-r border-gray-200">PC쇼핑몰 테마</div>
                        <div className="flex-1 bg-white p-3 border-r border-gray-200 flex items-center justify-center text-gray-700">
                            {displaySettings?.pcTheme || '-'}
                        </div>
                        
                        <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 border-r border-gray-200">모바일쇼핑몰 테마</div>
                        <div className="flex-1 bg-white p-3 border-r border-gray-200 flex items-center justify-center text-gray-700">
                            {displaySettings?.mobileTheme || '-'}
                        </div>
                        
                        <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700">상품개수</div>
                        <div className="flex-1 bg-white p-3 flex items-center justify-center font-bold text-blue-600">
                            {productCount}개
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-4 mb-4">
                <Button 
                    className="bg-[#555] hover:bg-[#444] text-white h-8 text-xs rounded-sm" 
                    onClick={() => router.push('/admin/categories')}
                >
                    진열방법 수정
                </Button>
            </div>

            {/* Display Product Settings Section */}
            <div>
                <div className="flex items-center gap-1 mb-2 mt-2">
                    <h2 className="text-sm font-bold text-gray-800">진열 상품 설정</h2>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                </div>
                    
                <div className="border-t-2 border-gray-400 border-b border-gray-300">
                    <div className="grid grid-cols-[40px_80px_60px_1fr_100px_120px_80px_80px] bg-[#f1f1f1] text-xs text-center font-bold text-gray-700 h-10 items-center border-b border-gray-300">
                        <div className="flex justify-center"><Checkbox className="w-4 h-4 rounded-[2px]" /></div>
                        <div>진열순서</div>
                        <div>이미지</div>
                        <div>상품명</div>
                        <div>판매가</div>
                        <div>공급사</div>
                        <div>재고</div>
                        <div>품절</div>
                    </div>
                    
                    {loading ? (
                        <div className="h-32 flex items-center justify-center text-gray-500 text-xs bg-white">
                            로딩중...
                        </div>
                    ) : products.length === 0 ? (
                        <div className="h-32 flex items-center justify-center text-gray-400 text-xs bg-white">
                            선택된 상품이 없습니다.
                        </div>
                    ) : (
                        <div>
                            {products.map((p, idx) => (
                                <div key={p.id} className="grid grid-cols-[40px_80px_60px_1fr_100px_120px_80px_80px] text-xs text-center h-16 items-center border-b border-gray-200 hover:bg-gray-50 bg-white">
                                    <div className="flex justify-center"><Checkbox className="w-4 h-4 rounded-[2px]" /></div>
                                    <div className="text-gray-500">{idx + 1}</div>
                                    <div className="flex justify-center">
                                        <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 border border-gray-200">
                                            {p.imageUrl ? (
                                                <div className="relative w-full h-full">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                "IMG"
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-left px-2 truncate font-medium text-gray-700">{p.name}</div>
                                    <div className="text-right px-4 font-mono">{p.price?.toLocaleString() || 0}</div>
                                    <div className="text-gray-500">{p.supplier?.name || "본사"}</div>
                                    <div>{p.stockQuantity || 0}</div>
                                    <div>{p.stockQuantity <= 0 ? "품절" : "정상"}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-12 h-12 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <Play className="w-5 h-5 fill-white" />
                </Button>
                <Button className="rounded-full w-12 h-12 bg-[#6E36E2] hover:bg-[#6E36E2]/90 shadow-lg text-white p-0 flex flex-col items-center justify-center border-0 gap-0">
                    <span className="text-[10px] leading-none">따라</span>
                    <span className="text-[10px] leading-none">하기</span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <ChevronUp size={20} />
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <ChevronDown size={20} />
                </Button>
            </div>
        </div>
    );
}
