"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/ui-table";
import { Youtube, ChevronUp, Image as ImageIcon, HelpCircle } from "lucide-react";
import ExistingDisplayProductPopup from "@/components/admin/ExistingDisplayProductPopup";

export default function ProductDisplayCreatePage() {
    // Basic Info State
    const [mallType, setMallType] = useState('PC');
    const [isExposed, setIsExposed] = useState('exposed');
    const [categoryName, setCategoryName] = useState('');
    const [categoryDesc, setCategoryDesc] = useState('');
    const [displayMethod, setDisplayMethod] = useState('manual');
    const [topMoreExposed, setTopMoreExposed] = useState('exposed');
    const [bottomMoreExposed, setBottomMoreExposed] = useState('exposed');
    const [imageFileName, setImageFileName] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('top');
    const [isExistingProductPopupOpen, setIsExistingProductPopupOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFileName(e.target.files[0].name);
        }
    };

    // Display Product List - Empty initially for Create page
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const products: any[] = [];

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
             {/* Header */}
             <div className="flex items-center justify-between pb-4 border-b border-black">
                <h1 className="text-2xl font-bold text-gray-900">메인페이지 분류 등록</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-gray-300 h-9" onClick={() => window.history.back()}>목록</Button>
                    <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 h-9 text-white font-bold">저장</Button>
                </div>
            </div>

            {/* Basic Info Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">기본정보</h2>
                    <HelpCircle size={14} className="text-gray-400" />
                </div>
                
                <div className="border border-gray-300">
                    {/* Row 1 */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">쇼핑몰 유형</div>
                        <div className="flex-1 p-3 flex items-center gap-6 border-r border-gray-200">
                            <RadioGroup value={mallType} onValueChange={setMallType} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="PC" id="info-mall-pc" className="text-red-500 border-red-500" />
                                    <Label htmlFor="info-mall-pc">PC쇼핑몰</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="MOBILE" id="info-mall-mobile" />
                                    <Label htmlFor="info-mall-mobile">모바일쇼핑몰</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">노출상태</div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <RadioGroup value={isExposed} onValueChange={setIsExposed} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="exposed" id="info-exposed" className="text-red-500 border-red-500" />
                                    <Label htmlFor="info-exposed">노출함</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hidden" id="info-hidden" />
                                    <Label htmlFor="info-hidden">노출안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center gap-1">
                            <span className="text-red-500 font-bold">•</span> 분류명 <HelpCircle size={14} className="text-gray-400" />
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-2 border-r border-gray-200">
                            <div className="relative w-64">
                                <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="pr-12 h-8" />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-red-500 font-bold">0 / 30</span>
                            </div>
                        </div>
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center gap-1">
                            분류 설명 <HelpCircle size={14} className="text-gray-400" />
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-2">
                            <div className="relative flex-1">
                                <Input value={categoryDesc} onChange={(e) => setCategoryDesc(e.target.value)} className="pr-12 h-8 w-full" />
                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-red-500 font-bold">0 / 100</span>
                            </div>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="flex border-b border-gray-200">
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">분류 이미지 등록</div>
                         <div className="flex-1 p-3 flex items-center gap-2">
                            <div className="flex flex-1 gap-2">
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                <Button 
                                    className="bg-[#9ca3af] hover:bg-[#9ca3af]/90 text-white h-8 w-20 text-xs rounded-sm"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    찾아보기
                                </Button>
                                <Input 
                                    disabled 
                                    value={imageFileName}
                                    className="bg-gray-100 h-8 flex-1 border-gray-300" 
                                    readOnly
                                />
                            </div>
                         </div>
                    </div>

                     {/* Row 4 */}
                     <div className="flex border-b border-gray-200">
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center gap-1">
                             <span className="text-red-500 font-bold">•</span> 테마 선택
                        </div>
                         <div className="flex-1 p-3 flex items-center gap-2 border-r border-gray-200">
                            <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                                <SelectTrigger className="w-32 h-8 text-xs">
                                    <SelectValue placeholder="상단 상품진열" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>메인테마</SelectLabel>
                                        <SelectItem value="top">상단 상품진열</SelectItem>
                                        <SelectItem value="bottom">하단 상품진열</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Button className="bg-[#555] hover:bg-[#555]/90 text-white h-8 text-xs rounded-sm" onClick={() => window.location.href='/admin/products/main-display/theme/register'}>테마 등록</Button>
                         </div>
                         <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">진열방법 선택</div>
                        <div className="flex-1 p-3 flex items-center gap-4">
                            <RadioGroup value={displayMethod} onValueChange={setDisplayMethod} className="flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="manual" id="method-manual" className="text-red-500 border-red-500" />
                                    <Label htmlFor="method-manual" className="whitespace-nowrap">수동진열</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="auto" id="method-auto" />
                                    <Label htmlFor="method-auto" className="whitespace-nowrap">자동진열</Label>
                                </div>
                            </RadioGroup>
                             <Select defaultValue="recent">
                                <SelectTrigger className="w-[180px] h-8 text-xs border-gray-300">
                                    <SelectValue placeholder="최근 등록 상품 위로" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">최근 등록 상품 위로</SelectItem>
                                    <SelectItem value="recent_desc">최근 등록 상품 아래로</SelectItem>
                                    <SelectItem value="mod_desc">최근 수정 상품 위로</SelectItem>
                                    <SelectItem value="mod_asc">최근 수정 상품 아래로</SelectItem>
                                    <SelectItem value="name_asc">상품명 가나다순</SelectItem>
                                    <SelectItem value="name_desc">상품명 가나다역순</SelectItem>
                                    <SelectItem value="price_desc">판매가 높은 상품 위로</SelectItem>
                                    <SelectItem value="price_asc">판매가 높은 상품 아래로</SelectItem>
                                    <SelectItem value="sales_desc">판매량 높은 상품 위로</SelectItem>
                                    <SelectItem value="sales_asc">판매량 높은 상품 아래로</SelectItem>
                                    <SelectItem value="view_desc">조회수 높은 상품 위로</SelectItem>
                                    <SelectItem value="view_asc">조회수 높은 상품 아래로</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 5 */}
                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">상단 더보기 노출 상태</div>
                        <div className="flex-1 p-3 flex items-center gap-6 border-r border-gray-200">
                            <RadioGroup value={topMoreExposed} onValueChange={setTopMoreExposed} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="exposed" id="top-exposed" className="text-red-500 border-red-500" />
                                    <Label htmlFor="top-exposed">노출함</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hidden" id="top-hidden" />
                                    <Label htmlFor="top-hidden">노출안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 flex items-center">하단 더보기 노출 상태</div>
                        <div className="flex-1 p-3 flex items-center gap-6">
                            <RadioGroup value={bottomMoreExposed} onValueChange={setBottomMoreExposed} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="exposed" id="bottom-exposed" className="text-red-500 border-red-500" />
                                    <Label htmlFor="bottom-exposed">노출함</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hidden" id="bottom-hidden" />
                                    <Label htmlFor="bottom-hidden">노출안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 space-y-1 text-xs text-gray-500">
                     <p>상단 더보기 : 쇼핑몰 메인페이지에서 해당 분류의 상품 리스트 페이지로 이동되어 등록된 상품 전체를 확인 할 수 있습니다.</p>
                     <p>하단 더보기 : 쇼핑몰 메인페이지에서 해당 분류에 등록된 상품 전체를 확인 할 수 있습니다..</p>
                     <p className="flex items-start gap-1">
                        <span className="font-bold bg-black text-white px-1 leading-tight">!</span>
                        <span>(디스플레이 유형이 "상품이동형/세로이동형/스크롤형/탭진열형" 테마는 하단 더보기 노출상태를 노출함으로써 설정하여도 쇼핑몰에 노출되지 않습니다.)</span>
                     </p>
                     <p className="text-red-500">진열방법 선택 : 선택된 테마의 디스플레이 유형이 '탭 진열형'인 경우 수동진열만 사용할 수 있습니다..</p>
                     <p className="text-red-500 pl-20">자동진열 선택 시 상품은 최대 500개 까지만 진열됩니다.</p>
                </div>
            </div>

             {/* Selected Theme Info Section */}
             <div className="space-y-4 pt-4 border-t border-gray-300">
                 <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">선택된 테마 정보</h2>
                    <HelpCircle size={14} className="text-gray-400" />
                </div>
                 <div className="border border-gray-300">
                     <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">테마명</div>
                         <div className="flex-1 p-3 flex items-center gap-2">
                            메인테마 <Button variant="outline" className="h-6 text-xs bg-white text-gray-600 border-gray-300 px-2" onClick={() => window.location.href='/admin/products/main-display/theme/register'}>수정</Button>
                         </div>
                     </div>
                     <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">이미지 설정</div>
                         <div className="flex-1 p-3 text-gray-800">
                            리스트이미지(기본) 180pixel
                         </div>
                     </div>
                     <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">상품 노출 개수</div>
                         <div className="flex-1 p-3 text-gray-800">
                            가로 : 4 X 세로 : 2
                         </div>
                     </div>
                     <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">품절상품 노출</div>
                         <div className="flex-1 p-3 text-gray-800 border-r border-gray-200">
                            예
                         </div>
                          <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">품절상품 진열</div>
                         <div className="flex-1 p-3 text-gray-800">
                            정렬 순서대로 보여주기
                         </div>
                     </div>
                     <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">품절 아이콘 노출</div>
                         <div className="flex-1 p-3 text-gray-800 border-r border-gray-200">
                            예
                         </div>
                          <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">아이콘 노출</div>
                         <div className="flex-1 p-3 text-gray-800">
                            예
                         </div>
                     </div>
                      <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">노출항목 설정</div>
                         <div className="flex-1 p-3 text-gray-800">
                            이미지,상품명,이미지,상품명,판매가
                         </div>
                     </div>
                     <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700">디스플레이 유형</div>
                         <div className="flex-1 p-3 text-gray-800">
                            갤러리형
                         </div>
                     </div>
                 </div>
             </div>

             {/* Display Product Settings Section */}
             <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">진열상품 설정</h2>
                    <HelpCircle size={14} className="text-gray-400" />
                </div>
                 <div className="border-t-2 border-gray-600 border-b border-gray-300">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#A4A4A4] hover:bg-[#A4A4A4] text-xs text-center font-bold text-white h-10 whitespace-nowrap">
                                <TableHead className="w-10 text-center p-0 text-white"><Checkbox className="border-gray-200 bg-white" /></TableHead>
                                <TableHead className="text-center w-16 text-white">진열순서</TableHead>
                                <TableHead className="text-center w-16 text-white">이미지</TableHead>
                                <TableHead className="text-center text-white">상품명</TableHead>
                                <TableHead className="text-center w-24 text-white">판매가</TableHead>
                                <TableHead className="text-center w-32 text-white">공급사</TableHead>
                                <TableHead className="text-center w-16 text-white">재고</TableHead>
                                <TableHead className="text-center w-20 text-white">품절상태</TableHead>
                                <TableHead className="text-center w-20 text-white">PC쇼핑몰 노출상태</TableHead>
                                <TableHead className="text-center w-20 text-white">모바일쇼핑몰 노출상태</TableHead>
                            </TableRow>
                        </TableHeader>
                         <TableBody>
                            {products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="h-20 text-center text-gray-500 text-xs">선택된 상품이 없습니다.</TableCell>
                                </TableRow>
                            ) : (
                                products.map((product) => (
                                    <TableRow key={product.id} className="text-xs text-gray-600 text-center hover:bg-gray-50 h-14 border-b border-gray-200">
                                       <TableCell className="p-0"><Checkbox className="translate-y-[2px]" /></TableCell>
                                       <TableCell>{product.id}</TableCell>
                                       <TableCell>
                                           <div className="h-10 w-10 bg-gray-100 mx-auto rounded-sm overflow-hidden flex items-center justify-center">
                                                <ImageIcon size={20} className="text-gray-400" />
                                           </div>
                                       </TableCell>
                                       <TableCell className="text-left pl-4">
                                           <div className="text-blue-500 hover:underline cursor-pointer">{product.name}</div>
                                       </TableCell>
                                       <TableCell className="text-right pr-4 font-normal text-gray-800">{product.price}</TableCell>
                                       <TableCell>{product.supplier}</TableCell>
                                       <TableCell>{product.stock}</TableCell>
                                       <TableCell>{product.status}</TableCell>
                                       <TableCell>{product.pc}</TableCell>
                                       <TableCell>{product.mobile}</TableCell>
                                    </TableRow>
                                ))
                            )}
                         </TableBody>
                    </Table>
                 </div>
                 
                 <div className="flex justify-between items-center bg-gray-50 border border-gray-200 p-3">
                     <Button variant="outline" className="h-8 bg-white border-gray-300 text-xs">선택 삭제</Button>
                     <div className="flex gap-2">
                        <Button variant="outline" className="h-8 bg-white border-gray-300 text-xs" onClick={() => setIsExistingProductPopupOpen(true)}>기존 진열상품 불러오기</Button>
                        <Button 
                            variant="outline" 
                            className="h-8 bg-white border-gray-300 text-xs" 
                            onClick={() => window.open('/admin/products/main-display/product-selection', 'ProductSelection', 'width=1400,height=800,scrollbars=yes')}
                        >
                            상품 선택
                        </Button>
                     </div>
                 </div>
             </div>

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

            <ExistingDisplayProductPopup 
                isOpen={isExistingProductPopupOpen}
                onClose={() => setIsExistingProductPopupOpen(false)}
            />
        </div>
    );
}
