"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle, HelpCircle, Plus } from "lucide-react";
import { useState, useEffect, useTransition, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getSeoSettingsAction, updateSeoSettingsAction } from "@/actions/basic-policy-actions";

type SeoTag = {
    title?: string;
    author?: string;
    description?: string;
    keywords?: string;
}

export default function SEOSettingsPage() {
    const [activeTab, setActiveTab] = useState<"kr" | "cn">("kr");
    const [robotTab, setRobotTab] = useState<"pc" | "mobile">("pc");
    const [tagTab, setTagTab] = useState<"common" | "product" | "category" | "brand" | "promotion" | "board">("common");
    const [otherPageTab, setOtherPageTab] = useState<"pc" | "mobile">("pc");
    
    // SEO Settings State
    const [pcRobotTxt, setPcRobotTxt] = useState("");
    const [mobileRobotTxt, setMobileRobotTxt] = useState("");
    const [majorPageTags, setMajorPageTags] = useState<Record<string, SeoTag>>({}); 
    const [ogImage, setOgImage] = useState("");
    const [ogTitle, setOgTitle] = useState("");
    const [ogDescription, setOgDescription] = useState("");
    const [sitemapPath, setSitemapPath] = useState("");
    const [rssPath, setRssPath] = useState("");
    const [pagePathType, setPagePathType] = useState("error");
    const [pagePathUrl, setPagePathUrl] = useState("");
    const [useCanonical, setUseCanonical] = useState("unused"); 
    const [relatedChannels, setRelatedChannels] = useState<string[]>([]);
    
    // Temporary state for UI inputs

    const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);
    const [isOtherPageDialogOpen, setIsOtherPageDialogOpen] = useState(false);
    const [otherPageForm, setOtherPageForm] = useState({
        type: "pc",
        path: "",
        title: "",
        author: "",
        description: "",
        keywords: ""
    });

    const [isPending, startTransition] = useTransition();

    // File Input Refs
    const ogImageInputRef = useRef<HTMLInputElement>(null);
    const sitemapInputRef = useRef<HTMLInputElement>(null);
    const rssInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getSeoSettingsAction();
            if (result.success && result.settings) {
                setPcRobotTxt(result.settings.pcRobotTxt || "");
                setMobileRobotTxt(result.settings.mobileRobotTxt || "");
                setMajorPageTags((result.settings.majorPageTags as Record<string, SeoTag>) || {});
                setOgImage(result.settings.ogImage || "");
                setOgTitle(result.settings.ogTitle || "");
                setOgDescription(result.settings.ogDescription || "");
                setSitemapPath(result.settings.sitemapPath || "");
                setRssPath(result.settings.rssPath || "");
                setPagePathType(result.settings.pagePathType || "error");
                setPagePathUrl(result.settings.pagePathUrl || "");
                setUseCanonical(result.settings.useCanonical ? "used" : "unused");
                setRelatedChannels((result.settings.relatedChannels as string[]) || []);
            }
        };
        fetchData();
    }, []);

    const handleSave = () => {
        startTransition(async () => {
            const result = await updateSeoSettingsAction({
                pcRobotTxt,
                mobileRobotTxt,
                majorPageTags,
                ogImage,
                ogTitle,
                ogDescription,
                sitemapPath,
                rssPath,
                pagePathType,
                pagePathUrl,
                useCanonical: useCanonical === "used",
                relatedChannels,
                otherPageTags: undefined
            });
            if (result.success) {
                alert("저장되었습니다.");
            } else {
                alert(result.error || "저장 실패");
            }
        });
    };

    // Helper to update major page tags
    const updateMajorPageTag = (key: string, value: string) => {
        setMajorPageTags((prev) => ({
            ...prev,
            [tagTab]: {
                ...(prev[tagTab] || {}),
                [key]: value
            }
        }));
    };

    const updateChannel = (index: number, value: string) => {
        if (relatedChannels.length === 0) {
             setRelatedChannels([value]);
             return;
        }
        const newChannels = [...relatedChannels];
        newChannels[index] = value;
        setRelatedChannels(newChannels);
    };

    const addNewChannel = () => {
        if (relatedChannels.length >= 9) {
            alert("최대 9개까지만 등록 가능합니다.");
            return;
        }
        setRelatedChannels([...(relatedChannels.length === 0 ? [""] : relatedChannels), ""]);
    };

    const removeChannel = (index: number) => {
        const newChannels = relatedChannels.filter((_, i) => i !== index);
        setRelatedChannels(newChannels);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
        if (e.target.files && e.target.files[0]) {
            // In a real app, you would upload the file here and get a URL.
            // For now, we'll just set the name to simulate the path selection.
            setter(e.target.files[0].name);
        }
    };
    
    const currentTagData = majorPageTags[tagTab] || { title: "", author: "", description: "", keywords: "" };

    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">검색엔진 최적화(SEO) 설정</h1>
                <Button 
                    className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium"
                    onClick={handleSave}
                    disabled={isPending}
                >
                    {isPending ? "저장 중..." : "저장"}
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
                                    value={robotTab === "pc" ? pcRobotTxt : mobileRobotTxt}
                                    onChange={(e) => robotTab === "pc" ? setPcRobotTxt(e.target.value) : setMobileRobotTxt(e.target.value)}
                                    placeholder=""
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
                                onClick={() => setTagTab(tab as "common" | "product" | "category" | "brand" | "promotion" | "board")}
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
                        <div className="flex justify-between items-start text-xs text-gray-500 pb-2 border-b border-gray-200 mb-4">
                            {tagTab === "common" ? (
                                <div className="flex gap-2">
                                    <span className="w-4 h-4 bg-[#555] text-white flex items-center justify-center text-[10px] rounded-sm shrink-0 mt-[2px] font-bold">!</span>
                                    <div className="space-y-1 leading-relaxed">
                                        <p>메인 페이지 및 기타페이지에 공통으로 적용됩니다.</p>
                                        <p>쇼핑몰 "상품, 카테고리, 브랜드, 기획전, 게시판"의 주요 페이지별 SEO 태그 설정을 하지 않았을 경우 공통 설정이 자동으로 적용됩니다.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 min-h-[24px]">
                                    <span className="w-4 h-4 bg-[#555] text-white flex items-center justify-center text-[10px] rounded-sm shrink-0 font-bold">!</span>
                                    <p>입력하지 않을 경우 공통 항목에 등록된 SEO 태그 설정 정보가 동일하게 적용됩니다.</p>
                                </div>
                            )}
                            <Button size="sm" className="h-6 text-xs bg-gray-400 text-white border-0 hover:bg-gray-500 rounded-sm shrink-0 ml-2" onClick={() => setIsCodeDialogOpen(true)}>치환코드 보기</Button>
                        </div>

                        <div className="grid grid-cols-[180px_1fr] gap-4 items-center">
                            <div className="font-medium text-gray-700 flex items-center gap-1">타이틀 (Title) <HelpCircle size={14} className="text-gray-400" /></div>
                            <div className="flex items-center gap-2">
                                <Input 
                                    className="flex-1 h-8 border-gray-300 rounded-sm" 
                                    value={currentTagData.title || ""}
                                    onChange={(e) => updateMajorPageTag("title", e.target.value)}
                                />
                                <span className="text-xs text-red-500 font-bold">{currentTagData.title?.length || 0} / 200</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-[180px_1fr] gap-4">
                            {tagTab === 'common' && (
                                <div className="col-start-2 text-xs text-gray-500 flex items-center gap-1">
                                    <span className="w-3 h-3 bg-gray-800 text-white flex items-center justify-center text-[10px] rounded-sm">!</span>
                                    입력하지 않을 경우 <span className="text-blue-500 underline cursor-pointer">기본설정{'>'}기본정책{'>'}기본정보설정</span>의 쇼핑몰 기본정보 중 상단타이틀에 등록된 정보가 적용됩니다.
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-[180px_1fr] gap-4 items-center pt-2">
                            <div className="font-medium text-gray-700 flex items-center gap-1">메타태그 작성자 (Author) <HelpCircle size={14} className="text-gray-400" /></div>
                            <div className="flex items-center gap-2">
                                <Input 
                                    className="flex-1 h-8 border-gray-300 rounded-sm"
                                    value={currentTagData.author || ""}
                                    onChange={(e) => updateMajorPageTag("author", e.target.value)}
                                />
                                <span className="text-xs text-red-500 font-bold">{currentTagData.author?.length || 0} / 200</span>
                            </div>
                        </div>

                         <div className="grid grid-cols-[180px_1fr] gap-4 items-center pt-2">
                            <div className="font-medium text-gray-700 flex items-center gap-1">메타태그 설명 (Description) <HelpCircle size={14} className="text-gray-400" /></div>
                            <div className="flex items-center gap-2">
                                <Input 
                                    className="flex-1 h-8 border-gray-300 rounded-sm" 
                                    value={currentTagData.description || ""}
                                    onChange={(e) => updateMajorPageTag("description", e.target.value)}
                                />
                            </div>
                        </div>

                         <div className="grid grid-cols-[180px_1fr] gap-4 items-center pt-2">
                            <div className="font-medium text-gray-700 flex items-center gap-1">메타태그 키워드 (Keywords) <HelpCircle size={14} className="text-gray-400" /></div>
                            <div className="flex items-center gap-2">
                                <Input 
                                    className="flex-1 h-8 border-gray-300 rounded-sm" 
                                    value={currentTagData.keywords || ""}
                                    onChange={(e) => updateMajorPageTag("keywords", e.target.value)}
                                />
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
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    ref={ogImageInputRef} 
                                    onChange={(e) => handleFileSelect(e, setOgImage)} 
                                    accept="image/*"
                                />
                                <Button 
                                    variant="outline" 
                                    className="h-7 text-xs rounded-sm border-gray-300 bg-gray-100 text-gray-600"
                                    onClick={() => ogImageInputRef.current?.click()}
                                >
                                    찾아보기
                                </Button>
                                <Input 
                                    className="w-64 h-7 border-gray-300 rounded-sm bg-gray-50" 
                                    value={ogImage}
                                    readOnly 
                                />
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
                             <Input 
                                className="w-full h-8 border-gray-300 rounded-sm" 
                                value={ogTitle}
                                onChange={(e) => setOgTitle(e.target.value)}
                             />
                        </div>
                    </div>

                    <div className="grid grid-cols-[180px_1fr] divide-x border-b border-gray-200">
                         <div className="p-4 bg-gray-50 font-medium text-gray-700">
                            대표설명<br/>
                            <span className="text-xs font-normal text-gray-500">(og:description, twitter:description)</span>
                        </div>
                        <div className="p-4 space-y-2">
                             <Input 
                                className="w-full h-8 border-gray-300 rounded-sm" 
                                value={ogDescription}
                                onChange={(e) => setOgDescription(e.target.value)}
                             />
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
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    ref={sitemapInputRef} 
                                    onChange={(e) => handleFileSelect(e, setSitemapPath)} 
                                    accept=".xml"
                                />
                                <Button 
                                    variant="outline" 
                                    className="h-7 text-xs rounded-sm border-gray-300 bg-gray-100 text-gray-600"
                                    onClick={() => sitemapInputRef.current?.click()}
                                >
                                    찾아보기
                                </Button>
                                <Input 
                                    className="w-64 h-7 border-gray-300 rounded-sm bg-gray-50" 
                                    value={sitemapPath}
                                    onChange={(e) => setSitemapPath(e.target.value)}
                                />
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
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    ref={rssInputRef} 
                                    onChange={(e) => handleFileSelect(e, setRssPath)} 
                                    accept=".xml"
                                />
                                <Button 
                                    variant="outline" 
                                    className="h-7 text-xs rounded-sm border-gray-300 bg-gray-100 text-gray-600"
                                    onClick={() => rssInputRef.current?.click()}
                                >
                                    찾아보기
                                </Button>
                                <Input 
                                    className="w-64 h-7 border-gray-300 rounded-sm bg-gray-50" 
                                    value={rssPath}
                                    onChange={(e) => setRssPath(e.target.value)}
                                />
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
                            <RadioGroup value={pagePathType} onValueChange={setPagePathType} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="error" id="path-error" />
                                    <Label htmlFor="path-error" className="font-normal text-sm text-gray-700">오류 페이지로 연결</Label>
                                    <Button size="sm" className="h-6 text-xs bg-gray-400 text-white border-0 hover:bg-gray-500 rounded-sm">미리보기</Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="custom" id="path-custom" />
                                    <Label htmlFor="path-custom" className="font-normal text-sm text-gray-700">설정한 경로로 연결</Label>
                                    {pagePathType === 'custom' && (
                                        <Input 
                                            className="w-64 h-7 border-gray-300 rounded-sm bg-gray-50" 
                                            value={pagePathUrl}
                                            onChange={(e) => setPagePathUrl(e.target.value)}
                                            placeholder="/example/path"
                                        />
                                    )}
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
                            <RadioGroup value={useCanonical} onValueChange={setUseCanonical} className="flex items-center gap-6">
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
                     {(relatedChannels.length > 0 ? relatedChannels : [""]).map((channel, index) => (
                        <div key={index} className="grid grid-cols-[180px_1fr] divide-x border-b border-gray-200 last:border-b-0">
                            <div className="p-4 bg-gray-50 font-medium text-gray-700">
                                <span>연관채널 {index + 1}</span>
                            </div>
                            <div className="p-4 flex gap-2">
                                <Input 
                                    className="w-full h-8 border-gray-300 rounded-sm" 
                                    placeholder="ex) https://www.facebook.com/nhncommerce" 
                                    value={channel}
                                    onChange={(e) => updateChannel(index, e.target.value)}
                                />
                                {index === 0 ? (
                                    <Button 
                                        variant="outline" 
                                        className="h-8 border-gray-400 text-gray-800 rounded-sm hover:bg-gray-50 flex items-center gap-1 font-normal w-[70px]"
                                        onClick={addNewChannel}
                                    >
                                        <Plus size={12} className="text-blue-600" /> 추가
                                    </Button>
                                ) : (
                                    <Button 
                                        variant="outline" 
                                        className="h-8 border-gray-300 text-gray-600 rounded-sm hover:bg-gray-50 w-[70px] font-normal"
                                        onClick={() => removeChannel(index)}
                                    >
                                        - 삭제
                                    </Button>
                                )}
                            </div>
                        </div>
                     ))}
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
                        <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-sm h-8 px-4 text-sm bg-white" onClick={() => setIsOtherPageDialogOpen(true)}>
                            페이지 추가
                        </Button>
                    </div>
                </div>
            </div>
            )}
            
            <Dialog open={isCodeDialogOpen} onOpenChange={setIsCodeDialogOpen}>
                <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-white block overflow-hidden">
                    <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
                        <DialogTitle className="text-xl font-bold text-gray-900">치환코드 보기</DialogTitle>
                         <DialogDescription className="sr-only">
                            SEO 설정에 사용할 수 있는 치환코드 목록입니다.
                        </DialogDescription>
                    </div>
                    <div className="p-6">
                        <table className="w-full border-t border-b border-gray-300 text-sm text-center">
                            <thead className="bg-[#bfbfbf] text-white font-normal">
                                <tr>
                                    <th className="py-2.5 w-20 border-r border-[#d4d4d4]">번호</th>
                                    <th className="py-2.5 border-r border-[#d4d4d4]">치환코드</th>
                                    <th className="py-2.5 w-40">설명</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                <tr>
                                    <td colSpan={3} className="py-10 text-center text-gray-500">등록된 치환코드가 없습니다.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Other Page Settings Dialog */}
            <Dialog open={isOtherPageDialogOpen} onOpenChange={setIsOtherPageDialogOpen}>
                <DialogContent className="sm:max-w-[800px] p-0 gap-0 bg-white block overflow-hidden">
                    <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
                        <DialogTitle className="text-xl font-bold text-gray-900">기타 페이지 SEO 태그 설정</DialogTitle>
                         <DialogDescription className="sr-only">
                            기타 페이지를 위한 SEO 태그를 설정합니다.
                        </DialogDescription>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <div className="border-t border-gray-300 text-sm">
                            {/* Page Classification */}
                            <div className="grid grid-cols-[160px_1fr] border-b border-gray-200">
                                <div className="bg-gray-50 p-3 pl-4 font-medium text-gray-700 flex items-center">페이지 분류</div>
                                <div className="p-3 pl-4 flex items-center">
                                    <RadioGroup 
                                        value={otherPageForm.type} 
                                        onValueChange={(val) => setOtherPageForm({...otherPageForm, type: val})} 
                                        className="flex items-center gap-6"
                                    >
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="pc" id="op-pc" className="text-[#c13030] border-gray-300" />
                                            <Label htmlFor="op-pc" className="font-normal text-gray-700 cursor-pointer">PC 쇼핑몰</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem value="mobile" id="op-mobile" className="text-[#c13030] border-gray-300" />
                                            <Label htmlFor="op-mobile" className="font-normal text-gray-700 cursor-pointer">모바일 쇼핑몰</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            {/* Page Path */}
                             <div className="grid grid-cols-[160px_1fr] border-b border-gray-200">
                                <div className="bg-gray-50 p-3 pl-4 font-medium text-gray-700 flex items-start pt-4">페이지 경로</div>
                                <div className="p-3 pl-4 space-y-2">
                                    <div className="flex items-center text-gray-600">
                                        http://sosexy7654.godomall.com/
                                        <Input 
                                            className="w-64 h-8 ml-1 border-gray-300 rounded-sm"
                                            value={otherPageForm.path}
                                            onChange={(e) => setOtherPageForm({...otherPageForm, path: e.target.value})}
                                        />
                                    </div>
                                     <div className="flex items-start gap-1 text-xs text-gray-500">
                                        <span className="w-3 h-3 bg-gray-600 text-white flex items-center justify-center text-[10px] rounded-sm shrink-0 mt-0.5 font-bold">!</span>
                                        <div className="space-y-0.5">
                                            <p>개별 SEO 태그를 설정할 페이지의 경로를 정확하게 입력해주세요.</p>
                                            <p className="text-gray-400">ex) service/company.php</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                             <div className="grid grid-cols-[160px_1fr] border-b border-gray-200">
                                <div className="bg-gray-50 p-3 pl-4 font-medium text-gray-700 flex items-center">타이틀 (Title)</div>
                                <div className="p-3 pl-4">
                                    <Input 
                                        className="w-full h-8 border-gray-300 rounded-sm" 
                                        value={otherPageForm.title}
                                        onChange={(e) => setOtherPageForm({...otherPageForm, title: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Author */}
                             <div className="grid grid-cols-[160px_1fr] border-b border-gray-200">
                                <div className="bg-gray-50 p-3 pl-4 font-medium text-gray-700 flex items-center">메타태그 작성자<br/>(Author)</div>
                                <div className="p-3 pl-4">
                                    <Input 
                                        className="w-full h-8 border-gray-300 rounded-sm" 
                                        value={otherPageForm.author}
                                        onChange={(e) => setOtherPageForm({...otherPageForm, author: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                             <div className="grid grid-cols-[160px_1fr] border-b border-gray-200">
                                <div className="bg-gray-50 p-3 pl-4 font-medium text-gray-700 flex items-center">메타태그 설명<br/>(Description)</div>
                                <div className="p-3 pl-4">
                                    <Input 
                                        className="w-full h-8 border-gray-300 rounded-sm" 
                                        value={otherPageForm.description}
                                        onChange={(e) => setOtherPageForm({...otherPageForm, description: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Keywords */}
                             <div className="grid grid-cols-[160px_1fr] border-b border-gray-200">
                                <div className="bg-gray-50 p-3 pl-4 font-medium text-gray-700 flex items-center">메타태그 키워드<br/>(Keywords)</div>
                                <div className="p-3 pl-4">
                                    <Input 
                                        className="w-full h-8 border-gray-300 rounded-sm" 
                                        value={otherPageForm.keywords}
                                        onChange={(e) => setOtherPageForm({...otherPageForm, keywords: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1 pt-2">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <span className="w-3 h-3 bg-gray-600 text-white flex items-center justify-center text-[10px] rounded-sm shrink-0 font-bold">!</span>
                                태그 입력 시, '쇼핑몰 이름' {'{seo_mallNm}'} 치환코드 사용이 가능합니다.
                            </div>
                            <div className="flex items-center gap-1 text-xs text-[#FF424D]">
                                <span className="w-3 h-3 bg-[#FF424D] text-white flex items-center justify-center text-[10px] rounded-sm shrink-0 font-bold">!</span>
                                기타 페이지 SEO태그 설정에서는 주요 페이지 (상품, 카테고리, 브랜드, 기획전, 게시판) SEO 태그 설정은 불가능합니다.
                            </div>
                        </div>

                        <div className="flex justify-center gap-1 pt-4 pb-2">
                            <Button variant="outline" className="w-[80px] h-[34px] border-gray-300 rounded-sm hover:bg-gray-50 text-gray-700" onClick={() => setIsOtherPageDialogOpen(false)}>닫기</Button>
                            <Button className="w-[80px] h-[34px] bg-[#4B4B4B] hover:bg-[#3E3E3E] text-white rounded-sm">저장</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
