"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Youtube, ChevronUp, ChevronDown, HelpCircle, Search } from "lucide-react";
import { 
    getCategoryLevelsAction, 
    getCategoryDisplaySettingsAction, 
    saveCategoryDisplaySettingsAction,
    getCategoryProductsAction 
} from "@/actions/category-display-actions";

export default function CategoryProductDisplayPage() {
    // Categories Hierarchy
    const [categories, setCategories] = useState<any[]>([]);
    
    // Selection State
    const [selectedDepth1, setSelectedDepth1] = useState<string>("");
    const [selectedDepth2, setSelectedDepth2] = useState<string>("");
    const [selectedDepth3, setSelectedDepth3] = useState<string>("");
    const [selectedDepth4, setSelectedDepth4] = useState<string>("");

    const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);

    // Data Display State
    const [displaySettings, setDisplaySettings] = useState<any>(null);
    const [productCount, setProductCount] = useState(0);
    const [products, setProducts] = useState<any[]>([]);
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
    const depth3Items = depth2Items.find((c: any) => c.id === selectedDepth2)?.children || [];
    const depth4Items = depth3Items.find((c: any) => c.id === selectedDepth3)?.children || [];

    // Handle Search / Load Category Data
    const handleSearch = async () => {
        // Determine the deepest selected category
        let targetId = selectedDepth4 || selectedDepth3 || selectedDepth2 || selectedDepth1;
        
        if (!targetId) {
            alert("카테고리를 선택해주세요.");
            return;
        }

        setCurrentCategoryId(targetId);
        setLoading(true);

        try {
            const [settingsRes, productsRes] = await Promise.all([
                getCategoryDisplaySettingsAction(targetId),
                getCategoryProductsAction(targetId)
            ]);

            if (settingsRes.success) {
                setDisplaySettings(settingsRes.settings || { 
                    displayMethod: "NORMAL", 
                    pcTheme: "기본형", 
                    mobileTheme: "기본형" 
                });
                setProductCount(settingsRes.productCount);
            }
            
            if (productsRes.success) {
                setProducts(productsRes.items);
            }
        } catch(e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!currentCategoryId || !displaySettings) return;

        const res = await saveCategoryDisplaySettingsAction(currentCategoryId, {
            displayMethod: displaySettings.displayMethod,
            pcTheme: displaySettings.pcTheme,
            mobileTheme: displaySettings.mobileTheme
        });

        alert(res.message);
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
                                setSelectedDepth1(val); setSelectedDepth2(""); setSelectedDepth3(""); setSelectedDepth4("");
                            }}>
                                <SelectTrigger className="w-40 h-8 text-xs"><SelectValue placeholder="=1차 카테고리=" /></SelectTrigger>
                                <SelectContent>
                                    {depth1Items.map((c: any) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>

                            {/* Depth 2 */}
                            <Select value={selectedDepth2} onValueChange={(val) => {
                                setSelectedDepth2(val); setSelectedDepth3(""); setSelectedDepth4("");
                            }}>
                                <SelectTrigger disabled={!selectedDepth1} className="w-40 h-8 text-xs"><SelectValue placeholder="=2차 카테고리=" /></SelectTrigger>
                                <SelectContent>
                                    {depth2Items.map((c: any) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>

                            {/* Depth 3 */}
                            <Select value={selectedDepth3} onValueChange={(val) => {
                                setSelectedDepth3(val); setSelectedDepth4("");
                            }}>
                                <SelectTrigger disabled={!selectedDepth2} className="w-40 h-8 text-xs"><SelectValue placeholder="=3차 카테고리=" /></SelectTrigger>
                                <SelectContent>
                                    {depth3Items.map((c: any) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>

                             {/* Depth 4 */}
                             <Select value={selectedDepth4} onValueChange={setSelectedDepth4}>
                                <SelectTrigger disabled={!selectedDepth3} className="w-40 h-8 text-xs"><SelectValue placeholder="=4차 카테고리=" /></SelectTrigger>
                                <SelectContent>
                                    {depth4Items.map((c: any) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
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
            {currentCategoryId && (
                <div>
                    <div className="flex items-center gap-1 mb-2 mt-4">
                        <h2 className="text-sm font-bold text-gray-800">선택된 카테고리 정보 ({currentCategoryId})</h2>
                        <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-[10px] cursor-help h-[18px] flex items-center justify-center">?</span>
                    </div>
                    
                    <div className="border-t border-gray-300 bg-white">
                        <div className="flex text-xs text-center border-b border-gray-200">
                            <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 flex items-center justify-center gap-1 border-r border-gray-200">
                                진열타입 <span className="text-gray-400 border border-gray-400 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-normal cursor-help">?</span>
                            </div>
                            <div className="flex-1 bg-white p-3 border-r border-gray-200 flex items-center justify-center">
                                {/* Simple Dropdown for Demo */}
                                <Select 
                                    value={displaySettings?.displayMethod || "NORMAL"} 
                                    onValueChange={(v) => setDisplaySettings({...displaySettings, displayMethod: v})}
                                >
                                    <SelectTrigger className="h-7 w-full border-0 focus:ring-0 text-center"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="NORMAL">기본진열</SelectItem>
                                        <SelectItem value="EVENT">이벤트형</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 flex items-center justify-center gap-1 border-r border-gray-200">
                                진열방법 <span className="text-gray-400 border border-gray-400 rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px] font-normal cursor-help">?</span>
                            </div>
                            <div className="flex-1 bg-white p-3 border-r border-gray-200 flex items-center justify-center text-gray-500">
                                설정불가(자동)
                            </div>
                            
                            <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 border-r border-gray-200">PC쇼핑몰 테마</div>
                            <div className="flex-1 bg-white p-3 border-r border-gray-200 flex items-center justify-center">
                                {displaySettings?.pcTheme || '-'}
                            </div>
                            
                            <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 border-r border-gray-200">모바일쇼핑몰 테마</div>
                            <div className="flex-1 bg-white p-3 border-r border-gray-200 flex items-center justify-center">
                                {displaySettings?.mobileTheme || '-'}
                            </div>
                            
                            <div className="flex-1 bg-gray-50 p-3 font-bold text-gray-700 border-r border-gray-200">상품개수</div>
                            <div className="flex-1 bg-white p-3 flex items-center justify-center font-bold text-blue-600">
                                {productCount}개
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Display Product Settings Section */}
            {currentCategoryId && (
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
                                            <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">IMG</div>
                                        </div>
                                        <div className="text-left px-2 truncate font-medium text-gray-700">{p.name}</div>
                                        <div className="text-right px-4 font-mono">{p.price?.toLocaleString()}</div>
                                        <div className="text-gray-500">{p.supplier?.name || "본사"}</div>
                                        <div>{p.stockQuantity}</div>
                                        <div>{p.stockQuantity <= 0 ? "품절" : "-"}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

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
        </div>
    );
}
