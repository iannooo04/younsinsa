"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, HelpCircle, Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function SEOSettingsPage() {
    const [activeTab, setActiveTab] = useState<"kr" | "cn">("kr");
    const [robotTab, setRobotTab] = useState<"pc" | "mobile">("pc");
    const [tagTab, setTagTab] = useState<"common" | "product" | "category" | "brand" | "promotion" | "board">("common");
    const [otherPageTab, setOtherPageTab] = useState<"pc" | "mobile">("pc");
    const [canonicalUrl, setCanonicalUrl] = useState("unused");
    const [pagePath, setPagePath] = useState("error");

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">검색엔진 최적화(SEO) 설정</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium">
                    저장
                </Button>
            </div>

            {/* Info Box */}
            <div className="border border-gray-300 p-4 flex gap-3 items-start bg-white">
                <AlertCircle className="text-[#FF424D] shrink-0 mt-0.5" size={24} />
                <div className="text-gray-600 space-y-1 text-xs leading-relaxed">
                    <p className="font-bold text-gray-800">검색엔진 최적화란?</p>
                    <p>검색엔진에서 특정 키워드 등으로 검색을 했을 때, 쇼핑몰을 보다 효과적으로 노출시킬 수 있도록 최적화하는 웹사이트 구성방식입니다.</p>
                    <p>검색엔진 최적화를 통해 검색결과 노출 순위를 높여 내 쇼핑몰과 관련된 키워드로 쇼핑몰을 홍보할 수 있습니다.</p>
                </div>
            </div>

            {/* Main Tabs */}
            <div className="flex items-center gap-1 border-b border-gray-300 mt-6">
                <button
                    onClick={() => setActiveTab("kr")}
                    className={`px-4 py-2 border-t border-l border-r rounded-t-sm flex items-center gap-2 text-sm ${
                        activeTab === "kr" 
                        ? "bg-white border-b-white -mb-[1px] font-bold text-gray-800" 
                        : "bg-gray-50 text-gray-500 border-gray-300"
                    }`}
                >
                    <span className="text-lg">🇰🇷</span> 
                    {activeTab === "kr" && <span>기준몰</span>}
                </button>
                <button
                    onClick={() => setActiveTab("cn")}
                    className={`px-4 py-2 border-t border-l border-r rounded-t-sm flex items-center gap-2 text-sm ${
                        activeTab === "cn" 
                        ? "bg-white border-b-white -mb-[1px] font-bold text-gray-800" 
                        : "bg-gray-50 text-gray-500 border-gray-300"
                    }`}
                >
                    <span className="text-lg">🇨🇳</span> 
                    {activeTab === "cn" && <span>중문몰</span>}
                </button>
            </div>

            {/* Section 1: Search Robot Crawling Settings */}
            {activeTab === "kr" && (
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800 pb-2">검색로봇 정보수집 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 mb-2" />
                </div>
                
                <div className="border border-gray-300 bg-white">
                    {/* Sub Tabs */}
                    <div className="flex border-b border-gray-300 bg-gray-50">
                        <button 
                            onClick={() => setRobotTab("pc")}
                            className={`px-6 py-3 text-sm font-medium border-r border-gray-200 ${robotTab === "pc" ? "bg-white text-gray-900 border-b-white -mb-[1px]" : "text-gray-500"}`}
                        >
                            PC 쇼핑몰
                        </button>
                        <button 
                            onClick={() => setRobotTab("mobile")}
                            className={`px-6 py-3 text-sm font-medium border-r border-gray-200 ${robotTab === "mobile" ? "bg-white text-gray-900 border-b-white -mb-[1px]" : "text-gray-500"}`}
                        >
                            모바일 쇼핑몰
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-[200px_1fr] divide-x divide-gray-200 min-h-[300px]">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">
                             <div>검색로봇 정보수집</div>
                             <div>허용설정 <HelpCircle size={12} className="inline text-gray-400" /></div>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-[200px_1fr] gap-4 h-full">
                                <div className="text-gray-700 pt-2 font-medium">
                                    검색로봇 접근제어<br/>상세설정<br/>(robots.txt)
                                </div>
                                <Textarea 
                                    className="h-[250px] font-mono text-sm resize-none border-gray-300"
                                    defaultValue={`# Default Bot Policy List provided by GODOMALL
User-agent: mj12bot
User-agent: SemrushBot
User-agent: ClaudeBot
User-agent: GPTBot
Disallow: /

User-agent: facebookexternalhit
User-agent: DotBot
User-agent: Screaming Frog SEO Spider
User-agent: heritrix
User-agent: bingbot
User-agent: owasp`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {/* Section 2: Major Page SEO Tag Settings */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800 pb-2">주요 페이지 SEO 태그 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 mb-2" />
                </div>
                
                <div className="border border-gray-300 bg-white">
                    {/* Sub Tabs */}
                    <div className="flex border-b border-gray-300 bg-gray-50">
                        {["common", "product", "category", "brand", "promotion", "board"].map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => setTagTab(tab as any)}
                                className={`px-6 py-3 text-sm font-medium border-r border-gray-200 ${tagTab === tab ? "bg-white text-gray-900 border-b-white -mb-[1px]" : "text-gray-500"}`}
                            >
                                {tab === "common" && "공통"}
                                {tab === "product" && "상품"}
                                {tab === "category" && "카테고리"}
                                {tab === "brand" && "브랜드"}
                                {tab === "promotion" && "기획전"}
                                {tab === "board" && "게시판"}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 space-y-4">
                         <div className="text-xs text-gray-500 space-y-1 pb-2 border-b border-gray-200 mb-4">
                            <p>메인 페이지 및 기타페이지에 공통으로 적용됩니다.</p>
                            <p>쇼핑몰 "상품, 카테고리, 브랜드, 기획전, 게시판"의 주요 페이지별 SEO 태그 설정을 하지 않았을 경우 공통 설정이 자동으로 적용됩니다.</p>
                            <div className="flex justify-end -mt-6">
                                <Button size="sm" variant="outline" className="h-6 text-xs bg-gray-400 text-white border-0 hover:bg-gray-500 rounded-sm">치환코드 보기</Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-[180px_1fr] gap-4 items-center">
                            <div className="font-medium text-gray-700 flex items-center gap-1">타이틀 (Title) <HelpCircle size={14} className="text-gray-400" /></div>
                            <div className="flex items-center gap-2">
                                <Input className="flex-1 h-8 border-gray-300 rounded-sm" defaultValue="{seo_mallNm}" />
                                <span className="text-xs text-red-500 font-bold">12 / 200</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-[180px_1fr] gap-4">
                            <div className="col-start-2 text-xs text-gray-500 flex items-center gap-1">
                                <span className="w-3 h-3 bg-gray-800 text-white flex items-center justify-center text-[10px] rounded-sm">!</span>
                                입력하지 않을 경우 <span className="text-blue-500 underline cursor-pointer">기본설정{'>'}기본정책{'>'}기본정보설정</span>의 쇼핑몰 기본정보 중 상단타이틀에 등록된 정보가 적용됩니다.
                            </div>
                        </div>

                        <div className="grid grid-cols-[180px_1fr] gap-4 items-center pt-2">
                            <div className="font-medium text-gray-700 flex items-center gap-1">메타태그 작성자 (Author) <HelpCircle size={14} className="text-gray-400" /></div>
                            <div className="flex items-center gap-2">
                                <Input className="flex-1 h-8 border-gray-300 rounded-sm" />
                                <span className="text-xs text-red-500 font-bold">0 / 200</span>
                            </div>
                        </div>

                         <div className="grid grid-cols-[180px_1fr] gap-4 items-center pt-2">
                            <div className="font-medium text-gray-700 flex items-center gap-1">메타태그 설명 (Description) <HelpCircle size={14} className="text-gray-400" /></div>
                            <div className="flex items-center gap-2">
                                <Input className="flex-1 h-8 border-gray-300 rounded-sm" defaultValue="{seo_mallNm}" />
                            </div>
                        </div>

                         <div className="grid grid-cols-[180px_1fr] gap-4 items-center pt-2">
                            <div className="font-medium text-gray-700 flex items-center gap-1">메타태그 키워드 (Keywords) <HelpCircle size={14} className="text-gray-400" /></div>
                            <div className="flex items-center gap-2">
                                <Input className="flex-1 h-8 border-gray-300 rounded-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Open Graph / X Meta Tag Basic Settings */}
            {activeTab === "kr" && (
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800 pb-2">오픈그래프/X 메타태그 기본설정</h2>
                    <HelpCircle size={14} className="text-gray-400 mb-2" />
                </div>
                
                <div className="border-t border-b border-gray-300 bg-white">
                     <div className="grid grid-cols-[180px_1fr] divide-x border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">대표이미지</div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="h-7 text-xs rounded-sm border-gray-300 bg-gray-100 text-gray-600">찾아보기</Button>
                                <Input className="w-64 h-7 border-gray-300 rounded-sm bg-gray-50" readOnly />
                            </div>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p>대표 이미지 사이즈는 최소 600pixel(픽셀) 이상, 파일형식은 jpg, gif, png만 등록해 주세요.</p>
                                <p>페이스북에서 권장하는 미리보기 이미지 사이즈는 1200x627px이며 최소 권장 사이즈는 PC에서 400x209px, 모바일에서 560x292px 입니다.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-[180px_1fr] divide-x border-b border-gray-200">
                         <div className="p-4 bg-gray-50 font-medium text-gray-700">
                            대표제목<br/>
                            <span className="text-xs font-normal text-gray-500">(og:title, twitter:title)</span>
                        </div>
                        <div className="p-4 flex items-center">
                             <Input className="w-full h-8 border-gray-300 rounded-sm" defaultValue="{=gMall.mallNm}" />
                        </div>
                    </div>

                    <div className="grid grid-cols-[180px_1fr] divide-x border-b border-gray-200">
                         <div className="p-4 bg-gray-50 font-medium text-gray-700">
                            대표설명<br/>
                            <span className="text-xs font-normal text-gray-500">(og:description, twitter:description)</span>
                        </div>
                        <div className="p-4 space-y-2">
                             <Input className="w-full h-8 border-gray-300 rounded-sm" defaultValue="엔큐버스" />
                             <div className="flex items-center gap-1 text-xs text-gray-500">
                                <span className="w-3 h-3 bg-gray-800 text-white flex items-center justify-center text-[10px] rounded-sm">!</span>
                                오픈그래프/X 메타태그 설명으로 사용되며, 기본설정의 메타태그 설명과는 별개로 동작합니다.
                             </div>
                        </div>
                    </div>
                </div>
                 <div className="text-xs text-gray-500 space-y-1 pl-1">
                     <p>쇼핑몰 URL을 SNS로 전송시 대표이미지와 쇼핑몰 소개 내용을 설정할 수 있습니다.</p>
                     <p>쇼핑몰 상품상세페이지에서 상품정보 SNS공유 시 노출되는 문구는 <span className="text-blue-500 underline cursor-pointer">"프로모션{'>'}SNS서비스 관리{'>'}SNS공유하기 설정"</span>에서 설정하실 수 있습니다.</p>
                     <p>대표이미지와 대표설명을 설정하지 않는 경우 소셜 정책에 따라 임의의 정보가 노출됩니다.</p>
                 </div>
            </div>
            )}

            {/* Section 4: Sitemap Settings */}
            {activeTab === "kr" && (
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800 pb-2">사이트맵 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 mb-2" />
                </div>
                <div className="border-t border-b border-gray-300 bg-white">
                     <div className="grid grid-cols-[180px_1fr] divide-x border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">사이트맵 경로</div>
                        <div className="p-4 space-y-2">
                             <div className="flex items-center gap-2">
                                <Button variant="outline" className="h-7 text-xs rounded-sm border-gray-300 bg-gray-100 text-gray-600">찾아보기</Button>
                                <Input className="w-64 h-7 border-gray-300 rounded-sm bg-gray-50" readOnly />
                            </div>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p><span className="w-3 h-3 inline-flex bg-gray-800 text-white items-center justify-center text-[10px] rounded-sm mr-1">!</span>확장자가 .xml 인 파일만 등록 가능하며, 업로드 가능한 파일 크기는 최대 10MB입니다.</p>
                                <p><span className="w-3 h-3 inline-flex bg-gray-800 text-white items-center justify-center text-[10px] rounded-sm mr-1">!</span>등록한 파일 경로는 http://sosexy7654.godomall.com/sitemap.xml 입니다.</p>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
            )}

             {/* Section 5: RSS Settings */}
            {activeTab === "kr" && (
             <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800 pb-2">RSS 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 mb-2" />
                </div>
                <div className="border-t border-b border-gray-300 bg-white">
                     <div className="grid grid-cols-[180px_1fr] divide-x border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">RSS 경로</div>
                        <div className="p-4 space-y-2">
                             <div className="flex items-center gap-2">
                                <Button variant="outline" className="h-7 text-xs rounded-sm border-gray-300 bg-gray-100 text-gray-600">찾아보기</Button>
                                <Input className="w-64 h-7 border-gray-300 rounded-sm bg-gray-50" readOnly />
                            </div>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p><span className="w-3 h-3 inline-flex bg-gray-800 text-white items-center justify-center text-[10px] rounded-sm mr-1">!</span>확장자가 .xml 인 파일만 등록 가능하며, 업로드 가능한 파일 크기는 최대 10MB입니다.</p>
                                <p><span className="w-3 h-3 inline-flex bg-gray-800 text-white items-center justify-center text-[10px] rounded-sm mr-1">!</span>등록한 파일 경로는 http://sosexy7654.godomall.com/rss.xml 입니다.</p>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
            )}

            {/* Section 6: Page Path Settings */}
             <div className="space-y-4 pt-4">
               <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800 pb-2">페이지 경로 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 mb-2" />
                </div>
                <div className="border-t border-b border-gray-300 bg-white">
                     <div className="grid grid-cols-[180px_1fr] divide-x border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">
                            페이지 없음<br/>경로설정 <HelpCircle size={12} className="inline text-gray-400" />
                        </div>
                        <div className="p-4">
                            <RadioGroup value={pagePath} onValueChange={setPagePath} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="error" id="path-error" />
                                    <Label htmlFor="path-error" className="font-normal text-sm text-gray-700">오류 페이지로 연결</Label>
                                    <Button size="sm" variant="outline" className="h-6 text-xs bg-gray-400 text-white border-0 hover:bg-gray-500 rounded-sm">미리보기</Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="custom" id="path-custom" />
                                    <Label htmlFor="path-custom" className="font-normal text-sm text-gray-700">설정한 경로로 연결</Label>
                                </div>
                            </RadioGroup>
                        </div>
                     </div>
                </div>
            </div>

             {/* Section 7: Canonical URL Settings */}
            {activeTab === "kr" && (
             <div className="space-y-4 pt-4">
               <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800 pb-2">대표 URL(Canonical URL) 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 mb-2" />
                </div>
                <div className="border-t border-b border-gray-300 bg-white">
                     <div className="grid grid-cols-[180px_1fr] divide-x border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">
                            사용설정 <HelpCircle size={12} className="inline text-gray-400" />
                        </div>
                        <div className="p-4">
                            <RadioGroup value={canonicalUrl} onValueChange={setCanonicalUrl} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="canonical-used" />
                                    <Label htmlFor="canonical-used" className="font-normal text-sm text-gray-700">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="canonical-unused" />
                                    <Label htmlFor="canonical-unused" className="font-normal text-sm text-gray-700">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                     </div>
                </div>
            </div>
            )}

             {/* Section 8: Related Channel Settings */}
            {activeTab === "kr" && (
             <div className="space-y-4 pt-4">
               <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800 pb-2">연관채널 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 mb-2" />
                </div>
                <div className="border-t border-b border-gray-300 bg-white">
                     <div className="grid grid-cols-[180px_1fr] divide-x border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">연관채널 1</div>
                        <div className="p-4 flex gap-2">
                             <Input className="w-full h-8 border-gray-300 rounded-sm" placeholder="ex) https://www.facebook.com/nhncommerce" />
                             <Button variant="outline" className="h-8 border-gray-300 rounded-sm text-gray-600 bg-white hover:bg-gray-50">
                                <Plus size={14} className="mr-1" /> 추가
                             </Button>
                        </div>
                     </div>
                </div>
                <div className="text-xs text-gray-500 space-y-1 pl-1">
                     <p>쇼핑몰과 관련된 SNS채널주소를 URL로 입력하시면 네이버 검색결과의 연관채널 부문에 해당 채널이 노출될 수 있습니다.</p>
                     <p><span className="w-3 h-3 inline-flex bg-gray-800 text-white items-center justify-center text-[10px] rounded-sm mr-1">!</span>네이버 정책에 따라 네이버 블로그/카페, 스토어팜, 포스트, 폴라, 페이스북, 인스타그램, 아이튠즈, 구글 플레이 스토어만 지원하며 최대 9개 채널만 연동 가능합니다.</p>
                </div>
            </div>
            )}

            {/* Section 9: Other Page SEO Tag Settings */}
            {activeTab === "kr" && (
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800 pb-2">기타 페이지 SEO 태그 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 mb-2" />
                </div>
                
                 <div className="border border-gray-300 bg-white">
                    {/* Sub Tabs */}
                    <div className="flex border-b border-gray-300 bg-gray-50">
                        <button 
                            onClick={() => setOtherPageTab("pc")}
                            className={`px-6 py-3 text-sm font-medium border-r border-gray-200 ${otherPageTab === "pc" ? "bg-white text-gray-900 border-b-white -mb-[1px]" : "text-gray-500"}`}
                        >
                            PC 쇼핑몰
                        </button>
                        <button 
                            onClick={() => setOtherPageTab("mobile")}
                            className={`px-6 py-3 text-sm font-medium border-r border-gray-200 ${otherPageTab === "mobile" ? "bg-white text-gray-900 border-b-white -mb-[1px]" : "text-gray-500"}`}
                        >
                            모바일 쇼핑몰
                        </button>
                    </div>

                    <div className="border-b border-gray-300">
                        <table className="w-full text-center text-sm">
                            <thead className="bg-[#A6A6A6] text-white">
                                <tr>
                                    <th className="py-2 w-10 border-r border-gray-400">
                                        <div className="flex justify-center">
                                            <Checkbox className="bg-white border-white data-[state=checked]:text-black" />
                                        </div>
                                    </th>
                                    <th className="py-2 w-16 border-r border-gray-400 font-medium">번호</th>
                                    <th className="py-2 border-r border-gray-400 font-medium">페이지 경로</th>
                                    <th className="py-2 border-r border-gray-400 font-medium">타이틀</th>
                                    <th className="py-2 border-r border-gray-400 font-medium">메타태그 설명</th>
                                    <th className="py-2 w-20 font-medium">수정</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={6} className="py-12 text-gray-500 border-b border-gray-300">
                                        등록된 페이지가 없습니다.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="p-2 flex justify-between bg-gray-50">
                         <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-sm h-8 px-4 text-sm bg-white">
                            선택 삭제
                        </Button>
                        <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-sm h-8 px-4 text-sm bg-white">
                            페이지 추가
                        </Button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}
