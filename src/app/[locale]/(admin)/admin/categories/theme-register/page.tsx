"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ThemeRegisterPage() {
    const router = useRouter();

    return (
        <div className="p-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-900 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">테마 등록</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-9 px-4 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-sm" onClick={() => router.back()}>목록</Button>
                    <Button className="h-9 px-4 bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold rounded-sm">저장</Button>
                </div>
            </div>

            <div className="space-y-8">
                {/* Basic Info */}
                <div>
                     <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-sm font-bold text-gray-800">기본정보</h2>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="border border-t-0 border-gray-300 text-xs text-gray-700 border-l-0 border-r-0">
                        {/* Mall Type */}
                        <div className="flex border-t border-b border-gray-200 min-h-[50px]">
                            <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">쇼핑몰 유형 <HelpCircle className="w-3 h-3 text-gray-400 ml-1" /></div>
                            <div className="flex-1 p-3 flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="mallType" className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-500" checked onChange={()=>{}} />
                                    <span>PC쇼핑몰</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="mallType" className="w-4 h-4 text-gray-300 border-gray-300" onChange={()=>{}} />
                                    <span>모바일쇼핑몰</span>
                                </label>
                            </div>
                        </div>
                        {/* Theme Code */}
                        <div className="flex border-b border-gray-200 min-h-[50px]">
                            <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">테마코드</div>
                            <div className="flex-1 p-3 flex items-center text-gray-500">
                                테마 등록 저장 시 자동 생성됩니다.
                            </div>
                        </div>
                         {/* Theme Name */}
                        <div className="flex border-b border-gray-200 min-h-[50px]">
                            <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200 text-red-500"><span className="text-red-500 mr-1">•</span> 테마명 <HelpCircle className="w-3 h-3 text-gray-400 ml-1" /></div>
                            <div className="flex-1 p-3 flex items-center gap-2">
                                <div className="relative">
                                     <Input className="w-[300px] h-8 text-xs pr-10 rounded-sm border-gray-300" />
                                     <span className="absolute right-2 top-2 text-[10px] text-red-500 font-bold">0 / 60</span>
                                </div>
                            </div>
                        </div>
                        {/* Theme Classification */}
                        <div className="flex border-b border-gray-200 min-h-[50px]">
                             <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">테마분류 <HelpCircle className="w-3 h-3 text-gray-400 ml-1" /></div>
                            <div className="flex-1 p-3 flex items-center gap-4 flex-wrap">
                                 {['메인테마', '카테고리테마', '브랜드테마', '검색페이지테마', '추천상품테마', '기획전테마'].map((item, idx) => (
                                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="themeClass" className="w-4 h-4 text-gray-600 border-gray-300" defaultChecked={item === '카테고리테마'} />
                                        <span>{item}</span>
                                    </label>
                                 ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* List Area Detail Settings */}
                <div>
                     <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-sm font-bold text-gray-800">리스트 영역 상세 설정</h2>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                     <div className="border border-t-0 border-gray-300 text-xs text-gray-700 border-l-0 border-r-0">
                         {/* Image Setting */}
                        <div className="flex border-t border-b border-gray-200 min-h-[50px]">
                            <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">이미지설정</div>
                            <div className="flex-1 p-3 flex items-center gap-2">
                                <Select defaultValue="180">
                                    <SelectTrigger className="w-60 h-8 text-xs border-gray-300 rounded-sm"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="180">리스트이미지(기본) - 180 pixel</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="bg-black text-white w-4 h-4 flex items-center justify-center text-[10px] font-bold rounded-sm">!</span>
                                <span className="text-gray-400">이미지는 <span className="text-blue-500 underline cursor-pointer">기본설정&gt;상품 정책&gt;상품 이미지 사이즈 설정</span>에서 관리할 수 있습니다.</span>
                            </div>
                        </div>
                        {/* Product Count */}
                         <div className="flex border-b border-gray-200 min-h-[50px]">
                            <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">상품 노출 개수</div>
                            <div className="flex-1 p-3 flex items-center gap-2 whitespace-nowrap">
                                <span>가로 : </span> <Input className="w-16 h-8 text-xs text-center border-gray-300 rounded-sm" defaultValue="4" />
                                <span>X 세로 : </span> <Input className="w-16 h-8 text-xs text-center border-gray-300 rounded-sm" defaultValue="5" />
                            </div>
                        </div>
                         {/* Sold Out Display */}
                        <div className="flex border-b border-gray-200 min-h-[50px]">
                            <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">품절상품 노출</div>
                            <div className="flex-1 p-3 flex items-center gap-4 border-r border-gray-200">
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="soldoutDisp" className="w-4 h-4 text-red-500 border-gray-300" checked onChange={()=>{}} /> 노출함</label>
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="soldoutDisp" className="w-4 h-4 text-gray-300 border-gray-300" onChange={()=>{}} /> 노출안함</label>
                            </div>
                             <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">품절상품 진열</div>
                            <div className="flex-1 p-3 flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="soldoutSort" className="w-4 h-4 text-red-500 border-gray-300" checked onChange={()=>{}} /> 정렬 순서대로 보여주기</label>
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="soldoutSort" className="w-4 h-4 text-gray-300 border-gray-300" onChange={()=>{}} /> 리스트 끝으로 보내기</label>
                            </div>
                        </div>
                        {/* Sold Out Icon Display */}
                        <div className="flex border-b border-gray-200 min-h-[50px]">
                            <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">품절 아이콘 노출</div>
                            <div className="flex-1 p-3 flex items-center gap-4 border-r border-gray-200">
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="soldoutIcon" className="w-4 h-4 text-red-500 border-gray-300" checked onChange={()=>{}} /> 노출함</label>
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="soldoutIcon" className="w-4 h-4 text-gray-300 border-gray-300" onChange={()=>{}} /> 노출안함</label>
                            </div>
                             <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">아이콘 노출</div>
                            <div className="flex-1 p-3 flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="iconDisp" className="w-4 h-4 text-red-500 border-gray-300" checked onChange={()=>{}} /> 노출함</label>
                                <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="iconDisp" className="w-4 h-4 text-gray-300 border-gray-300" onChange={()=>{}} /> 노출안함</label>
                            </div>
                        </div>
                        {/* Display Items */}
                        <div className="flex border-b border-gray-200 min-h-[50px]">
                            <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200 text-red-500"><span className="text-red-500 mr-1">•</span> 노출항목 설정 <HelpCircle className="w-3 h-3 text-gray-400 ml-1" /></div>
                            <div className="flex-1 p-3 flex items-center gap-4 flex-wrap">
                                {['이미지', '대표색상', '브랜드', '제조사', '상품명', '짧은설명', '정가', '판매가', '할인적용가', '쿠폰가', '상품할인금액', '마일리지', '모델번호', '상품코드'].map((item, idx) => (
                                    <label key={idx} className="flex items-center gap-1 cursor-pointer">
                                        <input type="checkbox" className="rounded-sm border-gray-300 w-4 h-4 checked:bg-red-500 checked:border-red-500" defaultChecked={['이미지', '상품명'].includes(item)} />
                                        <span>{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {/* Discount / Strike */}
                         <div className="flex border-b border-gray-200 min-h-[50px]">
                            <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">할인적용가 설정</div>
                            <div className="flex-1 p-3 flex flex-col justify-center gap-2 border-r border-gray-200">
                                 <div className="flex gap-4">
                                     <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" className="rounded-sm border-gray-300 w-4 h-4 checked:bg-red-500 checked:border-red-500" defaultChecked /> <span>상품할인가</span></label>
                                     <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" className="rounded-sm border-gray-300 w-4 h-4" /> <span>상품쿠폰할인가</span></label>
                                 </div>
                                 <div className="flex items-start gap-1 text-gray-400">
                                     <span className="bg-black text-white w-3 h-3 flex items-center justify-center text-[10px] font-bold rounded-sm mt-0.5">!</span>
                                     <span>할인적용가 노출 시 적용할 할인금액을 설정합니다.</span>
                                 </div>
                            </div>
                            <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">취소선 추가 설정</div>
                            <div className="flex-1 p-3 flex flex-col justify-center gap-2">
                                <div className="flex gap-4">
                                     <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" className="rounded-sm border-gray-300 w-4 h-4 checked:bg-red-500 checked:border-red-500" defaultChecked /> <span>정가</span></label>
                                     <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" className="rounded-sm border-gray-300 w-4 h-4" /> <span>판매가</span></label>
                                 </div>
                                 <div className="flex items-start gap-1 text-gray-400">
                                     <span className="bg-black text-white w-3 h-3 flex items-center justify-center text-[10px] font-bold rounded-sm mt-0.5">!</span>
                                     <span>체크시 쇼핑몰에 취소선 효과가 적용되어 출력됩니다. (예시. <span className="line-through">정가</span> →2,000원)<br/>단, 판매가의 경우 할인가가 없는 상품에는 취소선이 적용되지 않습니다.</span>
                                 </div>
                            </div>
                        </div>
                        {/* Additional Item Display */}
                        <div className="flex border-b border-gray-200 min-h-[50px]">
                            <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200">노출항목 추가 설정</div>
                            <div className="flex-1 p-3 flex flex-col justify-center gap-2">
                                <label className="flex items-center gap-1 cursor-pointer"><input type="checkbox" className="rounded-sm border-gray-300 w-4 h-4" /> <span>활인율</span></label>
                                <div className="flex items-start gap-1 text-gray-400">
                                     <span className="bg-black text-white w-3 h-3 flex items-center justify-center text-[10px] font-bold rounded-sm mt-0.5">!</span>
                                     <span>{`{할인율} 체크 시 판매가 대비 할인율이 할인금액에 노출됩니다. (쿠폰가와 할인적용가에 적용됩니다.)`}</span>
                                 </div>
                            </div>
                        </div>

                        {/* Display Type */}
                        <div className="flex min-h-[50px]">
                             <div className="w-44 bg-gray-50 p-3 pl-4 font-bold flex items-center border-r border-gray-200 text-gray-800">디스플레이 유형</div>
                             <div className="flex-1 p-3 flex gap-6">
                                 {/* Mock Type Icons */}
                                 {[
                                     { name: '갤러리형', active: true },
                                     { name: '리스트형', active: false },
                                     { name: '리스트그룹형', active: false },
                                     { name: '선택강조형', active: false },
                                     { name: '심플이미지형', active: false },
                                     { name: '말풍선형', active: false },
                                     { name: '장바구니형', active: false },
                                 ].map((type, idx) => (
                                     <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer">
                                         <div className={`w-24 h-16 border rounded-sm flex items-center justify-center bg-gray-50 ${type.active ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}>
                                             {/* Mocking visual representation with boxes */}
                                             <div className="grid grid-cols-3 gap-1 w-full px-2">
                                                <div className="h-4 bg-gray-300"></div><div className="h-4 bg-gray-300"></div><div className="h-4 bg-gray-300"></div>
                                                <div className="h-4 bg-gray-300"></div><div className="h-4 bg-gray-300"></div><div className="h-4 bg-gray-300"></div>
                                             </div>
                                         </div>
                                         <label className="flex items-center gap-1 cursor-pointer">
                                             <input type="radio" name="dispType" className="w-4 h-4 text-red-500 border-gray-300" checked={type.active} onChange={()=>{}} />
                                             <span className={type.active ? 'text-gray-800 font-bold' : 'text-gray-500'}>{type.name}</span>
                                         </label>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </div>
                </div>

                {/* Guide Text */}
                <div className="border-t border-gray-300 pt-6">
                    <div className="flex items-center gap-2 mb-4">
                        <HelpCircle className="w-4 h-4 text-blue-500" />
                        <h3 className="text-sm font-bold text-blue-500">안내</h3>
                    </div>
                    
                    <div className="text-xs text-gray-500 space-y-4">
                        <div className="space-y-1">
                            <h4 className="font-bold text-gray-700">리스트 영역 노출항목 이외에 추가할 수 있는 항목은 없나요?</h4>
                            <p>· 디자인페이지에 아래의 치환코드를 삽입하여 “회원등급에 따른 회원가, 상품에 등록된 후기 개수, 상품클릭수”를 노출할 수 있습니다.</p>
                        </div>
                         <div className="space-y-1">
                            <h4 className="font-bold text-gray-700">회원등급가 노출 치환코드</h4>
                            <p>* 회원등급번호를 입력한 경우에는 로그인 여부와 상관없이 해당 등급의 회원가로만 노출되고</p>
                            <p className="mt-2">회원등급번호를 입력하지 않은 경우 로그인한 회원등급의 회원가로 노출됩니다.</p>
                            <p>: 상품 리스트</p>
                            <p className="font-mono bg-gray-50 p-1 inline-block text-gray-600">{`{=gd_currency_symbol()}{=gd_money_format(dataGoodsMemberGroupPrice(.value_, 회원등급번호 )) }{=gd_currency_string()}`}</p>
                             <p>: 상품 상세페이지</p>
                             <p className="font-mono bg-gray-50 p-1 block text-gray-600 mb-1">{`{=gd_money_format(dataGoodsMemberGroupPrice(goodsView, gMember.groupSno )) }`}</p>
                             <p className="pl-4">└ 로그인한 회원의 회원등급가로 노출됩니다.</p>
                             <p className="font-mono bg-gray-50 p-1 block text-gray-600 mt-1">{`{=gd_money_format(dataGoodsMemberGroupPrice(goodsView, 회원등급번호 )) }`}</p>
                        </div>
                        <div className="space-y-1">
                             <h4 className="font-bold text-gray-700">상품에 등록된 후기 개수 노출 치환코드</h4>
                             <p className="mt-2">:상품 리스트, 상세페이지 공용</p>
                             <p className="font-mono bg-gray-50 p-1 block text-gray-600">{`- {=gd_money_format(dataGoodsReviewCnt(상품코드 )) }`}</p>
                        </div>
                         <div className="space-y-1">
                             <h4 className="font-bold text-gray-700">상품클릭수 노출 치환코드</h4>
                             <p className="mt-2">:상품 상세페이지에만 적용</p>
                             <p className="font-mono bg-gray-50 p-1 block text-gray-600">{`- {=goodsView['hitCnt']}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
