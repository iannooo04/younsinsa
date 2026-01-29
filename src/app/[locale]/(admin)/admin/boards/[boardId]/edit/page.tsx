"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircle,
  Trash2
} from "lucide-react";
import { MemberGradeSelector } from "@/components/admin/boards/MemberGradeSelector";
import { TemplateRegistrationModal } from "@/components/admin/boards/TemplateRegistrationModal";
import { Link } from "@/i18n/routing";
import { getBoardAction, updateBoardAction } from "@/actions/board-create-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


// FormRow Component
interface FormRowProps {
    label: string;
    required?: boolean;
    help?: boolean;
    children: React.ReactNode;
}

const FormRow = ({ label, required, help, children }: FormRowProps) => (
    <div className="flex border-b border-gray-200">
        <div className="w-48 bg-[#FBFBFB] p-4 font-normal text-gray-700 flex items-start pt-3 border-r border-gray-200 relative">
            <span className="text-[13px]">{label}</span>
            {required && <span className="text-red-500 ml-1">*</span>}
            {help && <HelpCircle className="w-3.5 h-3.5 text-gray-400 ml-1 mt-0.5" />}
        </div>
        <div className="flex-1 p-3 flex items-center">
            {children}
        </div>
    </div>
);

// OptionItem Component
interface OptionItemProps {
    value: string;
    label: string | React.ReactNode;
}

const OptionItem = ({ value, label }: OptionItemProps) => {
    const id = React.useId();
    return (
        <div className="flex items-center gap-1.5">
            <RadioGroupItem value={value} id={id} className="w-4 h-4 text-red-500 border-gray-300" />
            <Label htmlFor={id} className="text-gray-700 cursor-pointer font-normal text-xs">{label}</Label>
        </div>
    );
};



export default function BoardEditPage({ params }: { params: Promise<{ boardId: string }> }) {
  const router = useRouter();
  const { boardId: id } = React.use(params);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [formData, setFormData] = useState({
      usePcMall: "use",
      useMobileMall: "use",
      type: "normal",
      boardId: "",
      name: "",
      listAccess: "all",
      readAccess: "all",
      writeAccess: "all",
      commentAccess: "member",
      useReply: "use",
      useComment: "use",
      authorDisplay: "nickname",
      useProductLink: "no",
      productLinkType: "prod",
      maxFileSize: "10",
      itemsPerPage: "15",
      subjectLimit: "30",
      showNotice: true,
      useEditor: "use",
      headerHtml: "",
      footerHtml: "",
      seoUse: "no",
      seoTitle: "",
      seoAuthor: "",
      seoDescription: "",
      seoKeywords: "",
      useCategory: "no",
      useRepresentativeImage: "no", // representative image exposure
      representativeImageType: "upload", // representative image type
      useAnswerSearch: "no", // answer search exposure
      useImageDisplay: "use", // attached image display
  });

  const [prefixes, setPrefixes] = useState([{ id: '1', text: '' }]);

  const handleAddPrefix = () => {
    setPrefixes([...prefixes, { id: Date.now().toString(), text: '' }]);
  };

  const handleRemovePrefix = (id: string) => {
    setPrefixes(prefixes.filter(p => p.id !== id));
  };

  const [allowedDomains, setAllowedDomains] = useState([{ id: '1', domain1: '', domain2: '' }]);

  const handleAddDomainRow = () => {
    setAllowedDomains([...allowedDomains, { id: Date.now().toString(), domain1: '', domain2: '' }]);
  };

  const handleRemoveDomainRow = (id: string) => {
    setAllowedDomains(allowedDomains.filter(d => d.id !== id));
  };

  useEffect(() => {
    const fetchBoard = async () => {
        setLoading(true);
        
        // Mock data for dummy-1 (UI test item)
        if (id === 'dummy-1') {
             setFormData(prev => ({
                ...prev,
                boardId: 'cooperation',
                name: '광고 · 제휴게시판',
                type: 'one', // INQUIRY
                useReply: 'use',
             }));
             setLoading(false);
             return;
        }

        const res = await getBoardAction(id);
        if (res.success && res.board) {
            const b = res.board;
            
            // Map Back types
            const mapType = (t: string) => {
                if (t === 'GALLERY') return 'gallery';
                if (t === 'EVENT') return 'event';
                if (t === 'INQUIRY') return 'one';
                return 'normal';
            };
            const mapAccess = (val: string) => val.toLowerCase();
            const mapAuthor = (val: string) => val.toLowerCase(); // NAME, ID, NICKNAME -> name, id, nickname

            setFormData({
                usePcMall: b.usePcMall ? "use" : "no",
                useMobileMall: b.useMobileMall ? "use" : "no",
                type: mapType(b.type),
                boardId: b.boardId,
                name: b.name,
                listAccess: mapAccess(b.listAccess),
                readAccess: mapAccess(b.readAccess),
                writeAccess: mapAccess(b.writeAccess),
                commentAccess: mapAccess(b.commentAccess),
                useReply: b.useReply ? "use" : "no",
                useComment: b.useComment ? "use" : "no",
                authorDisplay: mapAuthor(b.authorDisplay),
                useProductLink: b.useProductLink ? "use" : "no",
                productLinkType: "prod", // Not strictly in DB model yet, default
                maxFileSize: String(b.maxFileSize),
                itemsPerPage: String(b.itemsPerPage),
                subjectLimit: String(b.subjectLimit),
                showNotice: b.showNotice,
                useEditor: b.useEditor ? "use" : "no",
                headerHtml: b.headerHtml || "",
                footerHtml: b.footerHtml || "",
                seoUse: b.seoTitle ? "use" : "no",
                seoTitle: b.seoTitle || "",
                seoAuthor: b.seoAuthor || "",
                seoDescription: b.seoDescription || "",
                seoKeywords: b.seoKeywords || "",
                useCategory: "no",
                useRepresentativeImage: "no",
                representativeImageType: "upload",
                useAnswerSearch: "no",
                useImageDisplay: "use"
            });
        } else {
            // User requested to enter page unconditionally even if error.
            // Just show error toast but don't redirect.
            toast.error(res.error || "게시판 정보를 가져오지 못했습니다.");
            // router.push('/admin/boards'); // Removed redirect
        }
        setLoading(false);
    };
    fetchBoard();
  }, [id, router]);

  const handleChange = (key: string, value: string | boolean) => {
      setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!formData.boardId) return toast.error("게시판 아이디를 입력해주세요.");
    if (!formData.name) return toast.error("게시판명을 입력해주세요.");

    setSaving(true);
    
    // Map data (Same as create)
    const mapType = (t: string) => {
        if (t === 'gallery') return 'GALLERY';
        if (t === 'event') return 'EVENT';
        if (t === 'one') return 'INQUIRY';
        return 'BASIC';
    };

    const mapAuthor = (t: string) => {
        if (t === 'name') return 'NAME';
        if (t === 'id') return 'ID';
        return 'NICKNAME';
    };

    const result = await updateBoardAction({
        id: id,
        usePcMall: formData.usePcMall === 'use',
        useMobileMall: formData.useMobileMall === 'use',
        type: mapType(formData.type),
        boardId: formData.boardId,
        name: formData.name,
        listAccess: formData.listAccess,
        readAccess: formData.readAccess,
        writeAccess: formData.writeAccess,
        commentAccess: formData.commentAccess,
        useReply: formData.useReply === 'use',
        useComment: formData.useComment === 'use',
        useProductLink: formData.useProductLink === 'use',
        authorDisplay: mapAuthor(formData.authorDisplay),
        maxFileSize: Number(formData.maxFileSize) || 10,
        itemsPerPage: Number(formData.itemsPerPage) || 15,
        subjectLimit: Number(formData.subjectLimit) || 30,
        showNotice: formData.showNotice,
        useEditor: formData.useEditor === 'use',
        headerHtml: formData.headerHtml,
        footerHtml: formData.footerHtml,
        seoTitle: formData.seoTitle,
        seoAuthor: formData.seoAuthor,
        seoDescription: formData.seoDescription,
        seoKeywords: formData.seoKeywords
    });

    if (result.success) {
        toast.success("게시판이 수정되었습니다.");
        router.refresh();
    } else {
        toast.error(result.error || "수정 실패");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <div className="flex items-baseline gap-2">
            <Link href="/admin/boards" className="mr-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-300">
                    <span className="text-gray-500">{"<"}</span>
                </Button>
            </Link>
          <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">게시판 수정</h1>
          <Button variant="outline" className="h-6 px-2 text-xs border-gray-300 text-gray-600 bg-white hover:bg-gray-50 rounded-[2px]">
            가이드
          </Button>
        </div>
        <Button onClick={handleSave} disabled={saving} className="h-10 px-10 text-base bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
          수정
        </Button>
      </div>

      {/* Basic Settings Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-base text-gray-800">기본설정</h2>
          <span className="text-[11px] text-red-500 font-normal">*는 필수 입력 항목입니다.</span>
        </div>

        <div className="border-t border-gray-400">
          {/* PC Mall Use */}
          <FormRow label="PC쇼핑몰 사용여부" required help>
            <div className="flex flex-col gap-2">
              <RadioGroup value={formData.usePcMall} onValueChange={(v) => handleChange('usePcMall', v)} className="flex items-center gap-6">
                <OptionItem value="use" label="사용함" />
                <OptionItem value="no" label="사용안함" />
              </RadioGroup>
            </div>
          </FormRow>

          {/* Mobile Mall Use */}
          <FormRow label="모바일쇼핑몰 사용여부" required help>
             <div className="flex flex-col gap-2">
              <RadioGroup value={formData.useMobileMall} onValueChange={(v) => handleChange('useMobileMall', v)} className="flex items-center gap-6">
                <OptionItem value="use" label="사용함" />
                <OptionItem value="no" label="사용안함" />
              </RadioGroup>
            </div>
          </FormRow>

          {/* Type */}
          <FormRow label="유형" required help>
             <RadioGroup value={formData.type} onValueChange={(v) => handleChange('type', v)} className="flex items-center gap-10">
                <div className="flex flex-col gap-2 items-start">
                   <OptionItem value="normal" label="일반형" />
                   <div className="w-24 h-12 border border-gray-200 bg-[#FBFBFB] flex flex-col p-1.5 gap-1 opacity-50">
                      <div className="w-full h-1 bg-gray-300" />
                      <div className="w-full h-1 bg-gray-300" />
                      <div className="w-2/3 h-1 bg-gray-300" />
                   </div>
                </div>
                {/* Simplified visual representation for other types to save space */}
                <div className="flex flex-col gap-2 items-start">
                    <OptionItem value="one" label="1:1 문의형" />
                    <div className="w-24 h-12 border border-gray-200 bg-[#FBFBFB] flex flex-col p-1.5 gap-1">
                      <div className="w-full h-1.5 bg-gray-300" />
                      <div className="w-2/3 h-1.5 bg-gray-300" />
                      <div className="w-full h-1.5 bg-gray-300" />
                   </div>
                </div>
             </RadioGroup>
          </FormRow>

          {/* ID */}
          <FormRow label="아이디" required>
            <div className="font-bold text-sm text-gray-900">
                {formData.boardId}
            </div>
          </FormRow>

          {/* Board Name */}
          <FormRow label="게시판명" required>
             <Input 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-[450px] h-8 text-xs border-gray-300 rounded-[2px]" 
             />
          </FormRow>

          {/* Board Address (Display Only) */}
           <FormRow label="PC게시판 주소">
              <div className="text-gray-600 flex items-center gap-2">
                (쇼핑몰 주소) http://sosexy7654.godomall.com/board/list.php?bdId={formData.boardId}
                <Button variant="outline" size="icon" className="h-5 w-5 border-gray-300 rounded-[2px]"><span className="text-[10px]">📄</span></Button>
              </div>
           </FormRow>
           <FormRow label="모바일게시판 주소">
              <div className="text-gray-600 flex items-center gap-2">
                (쇼핑몰 주소) http://m-sosexy7654.godomall.com/board/list.php?bdId={formData.boardId}
                 <Button variant="outline" size="icon" className="h-5 w-5 border-gray-300 rounded-[2px]"><span className="text-[10px]">📄</span></Button>
              </div>
           </FormRow>


          {/* Board Skin - Simplified for verify */}
          <FormRow label="게시판 스킨" required help>
             <div className="w-full max-w-4xl border border-gray-200 bg-[#FBFBFB]">
                <div className="flex border-b border-gray-200">
                    <div className="w-24 p-3 border-r border-gray-200 font-normal text-center bg-[#FBFBFB] flex items-center justify-center text-xs">구분</div>
                    <div className="w-64 p-3 border-r border-gray-200 font-normal bg-[#FBFBFB] flex items-center pl-4 text-xs">사용중인 디자인 스킨</div>
                    <div className="flex-1 p-3 font-normal bg-[#FBFBFB] flex items-center pl-4 text-xs">게시판 디자인 스킨 선택</div>
                </div>
                
                {/* PC Shopping Mall - Adjusted to match image exactly */}
                <div className="flex border-b border-gray-200 bg-white">
                     <div className="w-24 border-r border-gray-200 flex items-center justify-center font-normal text-gray-700 bg-white text-xs">PC 쇼핑몰</div>
                     <div className="flex-1 flex flex-col">
                        {/* KR Row */}
                        <div className="flex border-b border-gray-100 h-10 items-center">
                            <div className="w-64 border-r border-gray-200 h-full flex items-center pl-4 gap-2 text-xs text-gray-700">
                                <span>🇰🇷</span> glance
                            </div>
                            <div className="flex-1 h-full flex items-center px-2">
                                <Select defaultValue="default">
                                   <SelectTrigger className="w-full h-7 text-xs border-gray-300 rounded-[2px]"><SelectValue placeholder="선택해주세요" /></SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="default">1:1문의(기본) (qa)</SelectItem>
                                   </SelectContent>
                                </Select>
                            </div>
                        </div>
                        {/* CN Row */}
                        <div className="flex h-10 items-center">
                             <div className="w-64 border-r border-gray-200 h-full flex items-center pl-4 gap-2 text-xs text-gray-700">
                                <span>🇨🇳</span> mime_cn
                            </div>
                            <div className="flex-1 h-full flex items-center px-2">
                                <Select defaultValue="default">
                                   <SelectTrigger className="w-full h-7 text-xs border-gray-300 rounded-[2px]"><SelectValue placeholder="선택해주세요" /></SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="default">1:1문의(기본) (qa)</SelectItem>
                                   </SelectContent>
                                </Select>
                            </div>
                        </div>
                     </div>
                </div>

                {/* Mobile Shopping Mall */}
                <div className="flex bg-white">
                     <div className="w-24 border-r border-gray-200 flex items-center justify-center font-normal text-gray-700 bg-white text-xs">모바일 쇼핑몰</div>
                     <div className="flex-1 flex flex-col">
                        {/* KR Row */}
                        <div className="flex border-b border-gray-100 h-10 items-center">
                            <div className="w-64 border-r border-gray-200 h-full flex items-center pl-4 gap-2 text-xs text-gray-700">
                                <span>🇰🇷</span> glance
                            </div>
                            <div className="flex-1 h-full flex items-center px-2">
                                <Select defaultValue="default">
                                   <SelectTrigger className="w-full h-7 text-xs border-gray-300 rounded-[2px]"><SelectValue placeholder="선택해주세요" /></SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="default">1:1문의(기본) (qa)</SelectItem>
                                   </SelectContent>
                                </Select>
                            </div>
                        </div>
                        {/* CN Row */}
                        <div className="flex h-10 items-center">
                             <div className="w-64 border-r border-gray-200 h-full flex items-center pl-4 gap-2 text-xs text-gray-700">
                                <span>🇨🇳</span> mime_cn
                            </div>
                            <div className="flex-1 h-full flex items-center px-2">
                                <Select defaultValue="default">
                                   <SelectTrigger className="w-full h-7 text-xs border-gray-300 rounded-[2px]"><SelectValue placeholder="선택해주세요" /></SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="default">1:1문의(기본) (qa)</SelectItem>
                                   </SelectContent>
                                </Select>
                            </div>
                        </div>
                     </div>
                </div>
             </div>
             <div className="mt-2">
                 <Link href="/admin/boards/skins/create">
                     <Button variant="outline" className="h-7 px-3 text-[11px] border-gray-300 rounded-[2px] bg-white text-gray-700 font-normal">게시판 스킨등록</Button>
                 </Link>
             </div>
          </FormRow>

          {/* List Permission */}
          <FormRow label="리스트권한 설정">
             <RadioGroup value={formData.listAccess} onValueChange={(v) => handleChange('listAccess', v)} className="flex items-center gap-4 flex-wrap">
                <OptionItem value="all" label="전체(회원+비회원)" />
                <OptionItem value="admin" label="관리자 전용" />
                <OptionItem value="member" label="회원전용(비회원제외)" />
                <div className="flex items-center gap-2">
                    <OptionItem value="grade" label="특정회원등급" />
                    <MemberGradeSelector disabled={formData.listAccess !== 'grade'} />
                </div>
             </RadioGroup>
          </FormRow>

           {/* Read Permission */}
           <FormRow label="읽기권한 설정">
             <RadioGroup value={formData.readAccess} onValueChange={(v) => handleChange('readAccess', v)} className="flex items-center gap-4 flex-wrap">
                <OptionItem value="all" label="전체(회원+비회원)" />
                <OptionItem value="admin" label="관리자 전용" />
                <OptionItem value="member" label="회원전용(비회원제외)" />
                <div className="flex items-center gap-2">
                    <OptionItem value="grade" label="특정회원등급" />
                     <MemberGradeSelector disabled={formData.readAccess !== 'grade'} />
                </div>
             </RadioGroup>
          </FormRow>

           {/* Write Permission */}
           <FormRow label="쓰기권한 설정">
             <RadioGroup value={formData.writeAccess} onValueChange={(v) => handleChange('writeAccess', v)} className="flex items-center gap-4 flex-wrap">
                <OptionItem value="all" label="전체(회원+비회원)" />
                <OptionItem value="admin" label="관리자 전용" />
                <OptionItem value="member" label="회원전용(비회원제외)" />
                <div className="flex items-center gap-2">
                    <OptionItem value="grade" label="특정회원등급" />
                     <MemberGradeSelector disabled={formData.writeAccess !== 'grade'} />
                </div>
             </RadioGroup>
          </FormRow>

          {/* Answer Type */}
          <FormRow label="답변 기능" help>
             <div className="flex items-center gap-2">
                <RadioGroup value={formData.useReply} onValueChange={(v) => handleChange('useReply', v)} className="flex items-center gap-6">
                   <OptionItem value="use" label="사용함" />
                   <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </div>
          </FormRow>

           {/* Answer Permission */}
           <FormRow label="답변권한 설정">
              <RadioGroup value={formData.commentAccess} onValueChange={(v) => handleChange('commentAccess', v)} className="flex items-center gap-4 flex-wrap">
                 <OptionItem value="all" label="전체(회원+비회원)" />
                 <OptionItem value="admin" label="관리자 전용" />
                 <OptionItem value="member" label="회원전용(비회원제외)" />
                 <div className="flex items-center gap-2">
                     <OptionItem value="grade" label={
                        <div className="flex flex-col leading-none gap-0.5">
                            <span>특정회원</span>
                            <span>등급</span>
                        </div>
                     } />
                      <MemberGradeSelector disabled={formData.commentAccess !== 'grade'} />
                 </div>
              </RadioGroup>
           </FormRow>

          {/* Author Display Method */}
          <FormRow label="작성자 표시방법">
              <RadioGroup value={formData.authorDisplay} onValueChange={(v) => handleChange('authorDisplay', v)} className="flex items-center gap-6">
                 <OptionItem value="name" label="이름표시" />
                 <OptionItem value="nickname" label="닉네임표시" />
                 <OptionItem value="id" label="아이디표시" />
              </RadioGroup>
          </FormRow>

          {/* Author Exposure Restriction */}
          <FormRow label="작성자 노출제한">
             <Select defaultValue="all">
                <SelectTrigger className="w-48 h-8 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">전체노출</SelectItem>
                    <SelectItem value="1">1글자 노출</SelectItem>
                    <SelectItem value="2">2글자 노출</SelectItem>
                </SelectContent>
             </Select>
          </FormRow>

          {/* Admin Display Method */}
          <FormRow label="운영자 표시방법">
               <RadioGroup defaultValue="nickname" className="flex items-center gap-6">
                 <OptionItem value="nickname" label="닉네임표시" />
                 <OptionItem value="image" label="이미지표시" />
              </RadioGroup>
          </FormRow>

          {/* Supplier Display Method */}
          <FormRow label="공급사 표시방법">
               <RadioGroup defaultValue="nickname" className="flex items-center gap-6">
                 <OptionItem value="nickname" label="닉네임표시" />
                 <OptionItem value="image" label="이미지표시" />
              </RadioGroup>
          </FormRow>

          {/* Storage Path */}
          <FormRow label="저장 위치" help>
              <Select defaultValue="default">
                <SelectTrigger className="w-48 h-8 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger>
                <SelectContent><SelectItem value="default">기본 경로</SelectItem></SelectContent>
             </Select>
          </FormRow>

          {/* Auto Delete Setting (3 years) */}
          <FormRow label="게시글 3년 경과 자동 삭제 설정" help>
             <div className="flex flex-col gap-2">
                <RadioGroup defaultValue="no" className="flex items-center gap-6">
                   <OptionItem value="use" label="사용함" />
                   <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </div>
          </FormRow>

          {/* Mileage Use */}
          <FormRow label="마일리지 사용유무">
              <RadioGroup defaultValue="no" className="flex items-center gap-6">
                 <OptionItem value="use" label="사용함" />
                 <OptionItem value="no" label="사용안함" />
              </RadioGroup>
          </FormRow>
        </div>
      </div>

      {/* Function Settings Section */}
      <div className="mb-12">
         <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-base text-gray-800">기능설정</h2>
        </div>
        <div className="border-t border-gray-400">
             {/* Product Link */}
             <FormRow label="상품 연동" help>
                <div className="flex flex-col gap-3">
                   <div className="flex items-center gap-2">
                        <RadioGroup defaultValue="no" className="flex items-center gap-6">
                            <OptionItem value="use" label="사용" />
                            <OptionItem value="no" label="사용안함" />
                        </RadioGroup>
                   </div>
                   <div className="flex items-center gap-2 text-gray-600 font-normal text-xs bg-gray-50 p-2 rounded-sm">
                       <span className="mr-2">상품/주문연동:</span>
                       <RadioGroup defaultValue="product" className="flex items-center gap-4">
                            <OptionItem value="product" label="상품" />
                            <OptionItem value="order" label="주문상품" />
                       </RadioGroup>
                   </div>
                </div>
             </FormRow>

             {/* Post Recommendation */}
             <FormRow label="게시글 추천">
                <RadioGroup defaultValue="no" className="flex items-center gap-6">
                    <OptionItem value="use" label="사용" />
                    <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>

             {/* Basic Post Template */}
             <FormRow label="기본 게시글 양식 설정" help>
                 <div className="flex items-center gap-2">
                     <Select defaultValue="none">
                        <SelectTrigger className="w-64 h-8 text-xs border-gray-300 bg-white"><SelectValue placeholder="=선택없음="/></SelectTrigger>
                        <SelectContent><SelectItem value="none">=선택없음=</SelectItem></SelectContent>
                     </Select>
                     <Button variant="outline" onClick={() => setShowTemplateModal(true)} className="h-8 px-3 text-xs border-gray-300 rounded-[2px] font-normal text-gray-700 bg-white">게시글 양식 등록</Button>
                 </div>
             </FormRow>

             <TemplateRegistrationModal open={showTemplateModal} onOpenChange={setShowTemplateModal} />

             {/* Prefix Function */}
             {/* Prefix Function */}
             <FormRow label="말머리 기능" help>
                 <div className="flex flex-col gap-2 w-full">
                    <RadioGroup value={formData.useCategory} onValueChange={(v) => handleChange('useCategory', v)} className="flex items-center gap-6">
                        <OptionItem value="use" label="사용" />
                        <OptionItem value="no" label="사용안함" />
                    </RadioGroup>
                    <p className="text-[11px] text-gray-500 mt-1 mb-2">* 글작성시 제목앞에 특정단어를 넣는 기능입니다</p>

                    {formData.useCategory === 'use' && (
                        <div className="border border-gray-200 rounded-[2px] bg-white w-full max-w-4xl">
                            {/* Title Row */}
                            <div className="flex border-b border-gray-100 items-center">
                                <div className="w-[120px] bg-[#FBFBFB] p-3 text-xs text-gray-700 font-bold border-r border-gray-100">
                                    말머리 타이틀
                                </div>
                                <div className="flex-1 p-2">
                                    <Input 
                                        className="w-full h-8 text-xs border-gray-300 rounded-[2px]" 
                                        placeholder="말머리 타이틀을 입력하세요."
                                    />
                                </div>
                            </div>
                            {/* Input Row */}
                            <div className="flex items-start">
                                <div className="w-[120px] bg-[#FBFBFB] p-3 text-xs text-gray-700 font-bold border-r border-gray-100 h-full min-h-[80px] flex items-center justify-center">
                                    말머리 입력
                                </div>
                                <div className="flex-1 p-2 flex flex-col gap-2">
                                    {prefixes.map((prefix) => (
                                        <div key={prefix.id} className="flex items-center gap-2">
                                            <Input 
                                                className="w-64 h-8 text-xs border-gray-300 rounded-[2px]" 
                                                placeholder="말머리를 입력하세요."
                                                value={prefix.text}
                                                onChange={(e) => {
                                                    setPrefixes(prefixes.map(p => p.id === prefix.id ? { ...p, text: e.target.value } : p));
                                                }}
                                            />
                                            <Select defaultValue="none">
                                                <SelectTrigger className="w-64 h-8 text-xs border-gray-300 bg-white"><SelectValue placeholder="=선택없음="/></SelectTrigger>
                                                <SelectContent><SelectItem value="none">=선택없음=</SelectItem></SelectContent>
                                            </Select>
                                            <button onClick={() => handleRemovePrefix(prefix.id)}>
                                                <Trash2 className="w-4 h-4 text-gray-500" />
                                            </button>
                                        </div>
                                    ))}
                                    <div>
                                        <Button variant="outline" onClick={handleAddPrefix} className="h-7 px-3 text-xs border-gray-300 rounded-[2px] bg-white text-gray-700 font-normal shadow-sm">
                                            <span className="mr-1 text-sm">+</span> 추가
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                 </div>
             </FormRow>

             {/* View Count Display */}
             <FormRow label="조회수 표시 설정" help>
                 <div className="flex items-center gap-6">
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="view-pc" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" defaultChecked />
                        <Label htmlFor="view-pc" className="text-gray-700 font-normal text-xs">PC쇼핑몰</Label>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="view-mobile" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" defaultChecked />
                        <Label htmlFor="view-mobile" className="text-gray-700 font-normal text-xs">모바일쇼핑몰</Label>
                     </div>
                 </div>
             </FormRow>

             {/* Hit Increase per View */}
             <FormRow label="조회당 Hit증가수" required>
                 <div className="flex items-center gap-2">
                     <Input className="w-20 h-8 text-xs border-gray-300 rounded-[2px]" defaultValue="1" />
                     <span className="text-gray-600">개</span>
                     <div className="flex items-center gap-1.5 ml-4">
                        <Checkbox id="ip-limit" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                        <Label htmlFor="ip-limit" className="text-gray-700 font-normal text-xs">IP 중복제한</Label>
                     </div>
                 </div>
             </FormRow>

             {/* Secret Post Setting */}
             <FormRow label="비밀글 설정">
                  <RadioGroup defaultValue="secret-check" className="flex items-center gap-4 flex-wrap">
                      <OptionItem value="normal" label="작성시 기본 일반글" />
                      <OptionItem value="secret-check" label="작성시 기본 비밀글" />
                      <OptionItem value="always-normal" label="무조건 일반글" />
                      <OptionItem value="always-secret" label="무조건 비밀글" />
                  </RadioGroup>
             </FormRow>

             {/* Secret Post Title Setting */}
             <FormRow label="비밀글 제목설정" required>
                  <div className="flex items-center gap-4">
                      <RadioGroup defaultValue="expose" className="flex items-center gap-4">
                          <OptionItem value="expose" label="제목 노출" />
                          <OptionItem value="specify" label="제목 지정" />
                      </RadioGroup>
                      <Input className="w-64 h-8 text-xs border-gray-300 rounded-[2px] bg-gray-50" disabled />
                  </div>
             </FormRow>
             
             {/* Start Number */}
             <FormRow label="게시물 시작번호" required>
                 <Input className="w-32 h-8 text-xs border-gray-300 rounded-[2px]" defaultValue="1" />
             </FormRow>

             {/* NEW Icon Effect */}
             <FormRow label="NEW아이콘 효력" required>
                  <div className="flex items-center gap-2">
                     <Input className="w-32 h-8 text-xs border-gray-300 rounded-[2px]" defaultValue="24" />
                     <span className="text-gray-600">시간</span>
                  </div>
             </FormRow>

             {/* HOT Icon Condition */}
             <FormRow label="HOT아이콘 조건" required>
                  <div className="flex items-center gap-2 text-gray-600">
                     <span>조회수</span>
                     <Input className="w-20 h-8 text-xs border-gray-300 rounded-[2px]" defaultValue="100" />
                     <span>회 이상 게시글</span>
                  </div>
             </FormRow>
        </div>
      </div>

       {/* Spam Prevention Settings */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-base text-gray-800">스팸방지 설정</h2>
        </div>
        <div className="border-t border-gray-400">
             <FormRow label="허용 태그">
                 <div className="flex items-center gap-6">
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="tag-iframe" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                        <Label htmlFor="tag-iframe" className="text-gray-700 font-normal text-xs">iframe</Label>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="tag-embed" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                        <Label htmlFor="tag-embed" className="text-gray-700 font-normal text-xs">embed</Label>
                     </div>
                 </div>
             </FormRow>
             
             <FormRow label="허용 도메인" help>
                 <div className="flex flex-col gap-2">
                     {allowedDomains.map((row) => (
                        <div key={row.id} className="flex items-center gap-2">
                            <Input 
                                className="w-64 h-8 text-xs border-gray-300 rounded-[2px]" 
                                placeholder="youtube.com"
                                value={row.domain1}
                                onChange={(e) => {
                                    setAllowedDomains(allowedDomains.map(d => d.id === row.id ? { ...d, domain1: e.target.value } : d));
                                }}
                            />
                            <Input 
                                className="w-64 h-8 text-xs border-gray-300 rounded-[2px]" 
                                placeholder="naver.com"
                                value={row.domain2}
                                onChange={(e) => {
                                    setAllowedDomains(allowedDomains.map(d => d.id === row.id ? { ...d, domain2: e.target.value } : d));
                                }}
                            />
                            <button onClick={() => handleRemoveDomainRow(row.id)}>
                                <Trash2 className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                     ))}
                     <div>
                        <Button variant="outline" onClick={handleAddDomainRow} className="h-7 px-3 text-xs border-gray-300 rounded-[2px] font-normal text-gray-700 bg-white shadow-sm">키워드 추가</Button>
                     </div>
                 </div>
             </FormRow>

             <FormRow label="게시글 스팸방지">
                 <div className="flex items-center gap-6">
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="spam-external" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" defaultChecked />
                        <Label htmlFor="spam-external" className="text-gray-700 font-normal text-xs">외부유입차단</Label>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="spam-captcha" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" defaultChecked />
                        <Label htmlFor="spam-captcha" className="text-gray-700 font-normal text-xs">자동등록방지문자</Label>
                     </div>
                 </div>
             </FormRow>
        </div>
      </div>

       {/* List Screen Settings */}
       <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-base text-gray-800">리스트화면 설정</h2>
          <span className="text-[11px] text-red-500 font-normal">*는 필수 입력 항목입니다.</span>
        </div>
        <div className="border-t border-gray-400">
             <FormRow label="공지사항 노출설정" required help>
                 <div className="flex items-center gap-2">
                     <span className="text-gray-700 text-xs">항목 수 :</span>
                     <Input className="w-20 h-8 text-xs border-gray-300 rounded-[2px]" defaultValue="3" />
                     <span className="text-gray-600 mr-2">개</span>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="notice-list" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" defaultChecked />
                        <Label htmlFor="notice-list" className="text-gray-700 font-normal text-xs">리스트 내 노출</Label>
                     </div>
                      <div className="flex items-center gap-1.5 ml-2">
                        <Checkbox id="notice-first" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" defaultChecked />
                        <Label htmlFor="notice-first" className="text-gray-700 font-normal text-xs">첫페이지만 노출</Label>
                     </div>
                 </div>
             </FormRow>

             <FormRow label="제목글 제한" required>
                 <div className="flex items-center gap-2">
                     <Input className="w-20 h-8 text-xs border-gray-300 rounded-[2px]" defaultValue="30" />
                     <span className="text-gray-600">자</span>
                 </div>
             </FormRow>

              <FormRow label="페이지당 게시물수" required help>
                 <Input className="w-20 h-8 text-xs border-gray-300 rounded-[2px]" defaultValue="15" />
             </FormRow>

             <FormRow label="대표 이미지 노출 여부">
                 <div className="flex flex-col gap-3">
                    <RadioGroup value={formData.useRepresentativeImage} onValueChange={(v) => handleChange('useRepresentativeImage', v)} className="flex items-center gap-6">
                        <OptionItem value="use" label="사용함" />
                        <OptionItem value="no" label="사용안함" />
                    </RadioGroup>
                    {formData.useRepresentativeImage === 'use' && (
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span>대표 이미지 설정 :</span>
                            <RadioGroup value={formData.representativeImageType} onValueChange={(v) => handleChange('representativeImageType', v)} className="flex items-center gap-4">
                                <OptionItem value="upload" label="업로드 이미지" />
                                <OptionItem value="editor" label="에디터 이미지" />
                           </RadioGroup>
                        </div>
                    )}
                </div>
             </FormRow>

             <FormRow label="리스트 이미지 크기" required help>
                 <div className="flex items-center gap-2">
                     <Input className="w-32 h-8 text-xs border-gray-300 rounded-[2px]" defaultValue="178" />
                     <span className="text-gray-500">*</span>
                     <Input className="w-32 h-8 text-xs border-gray-300 rounded-[2px]" defaultValue="227" />
                 </div>
             </FormRow>

             <FormRow label="공지글 이미지 노출 여부" help>
                 <div className="flex items-center gap-6">
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="notice-img-pc" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" defaultChecked />
                        <Label htmlFor="notice-img-pc" className="text-gray-700 font-normal text-xs">PC 쇼핑몰</Label>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="notice-img-mobile" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" defaultChecked />
                        <Label htmlFor="notice-img-mobile" className="text-gray-700 font-normal text-xs">모바일 쇼핑몰</Label>
                     </div>
                 </div>
             </FormRow>

             <FormRow label="검색 시 답변글 노출여부" help>
                <div className="flex flex-col gap-2">
                    <RadioGroup value={formData.useAnswerSearch} onValueChange={(v) => handleChange('useAnswerSearch', v)} className="flex items-center gap-6">
                        <OptionItem value="use" label="사용" />
                        <OptionItem value="no" label="사용안함" />
                    </RadioGroup>
                    {formData.useAnswerSearch === 'use' && (
                        <div className="flex items-center gap-4 mt-1">
                             <div className="flex items-center gap-1.5">
                                <Checkbox id="answer-search-mall" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" defaultChecked />
                                <Label htmlFor="answer-search-mall" className="text-gray-700 font-normal text-xs">쇼핑몰 화면 적용</Label>
                             </div>
                             <div className="flex items-center gap-1.5">
                                <Checkbox id="answer-search-admin" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" defaultChecked />
                                <Label htmlFor="answer-search-admin" className="text-gray-700 font-normal text-xs">관리자 화면 적용</Label>
                             </div>
                        </div>
                    )}
                </div>
             </FormRow>
        </div>
      </div>

       {/* Writer Screen Settings */}
       <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-base text-gray-800">작성자 화면 설정</h2>
          <span className="text-[11px] text-red-500 font-normal">*는 필수 입력 항목입니다.</span>
        </div>
        <div className="border-t border-gray-400">
             <FormRow label="에디터 사용">
                <RadioGroup defaultValue="use" className="flex items-center gap-6">
                    <OptionItem value="use" label="사용함" />
                    <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>

             <FormRow label="휴대폰 작성">
                <RadioGroup defaultValue="no" className="flex items-center gap-6">
                    <OptionItem value="use" label="사용함" />
                    <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>

             <FormRow label="이메일 작성">
                <RadioGroup defaultValue="no" className="flex items-center gap-6">
                    <OptionItem value="use" label="사용함" />
                    <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>

             <FormRow label="업로드 파일 사용">
                <RadioGroup defaultValue="use" className="flex items-center gap-6">
                    <OptionItem value="use" label="사용함" />
                    <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>

             <FormRow label="업로드파일 최대크기" required>
                 <div className="flex items-center gap-2">
                     <Input className="w-20 h-8 text-xs border-gray-300 rounded-[2px]" defaultValue="2" />
                     <span className="text-gray-600">MByte(s)</span>
                 </div>
             </FormRow>
             
              <FormRow label="링크">
                <RadioGroup defaultValue="no" className="flex items-center gap-6">
                    <OptionItem value="use" label="사용함" />
                    <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>
        </div>
      </div>
      
      {/* Post Content Screen Settings */}
       <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-base text-gray-800">게시글 내용 화면설정</h2>
        </div>
        <div className="border-t border-gray-400">
             <FormRow label="첨부파일 이미지 표시" help>
                <RadioGroup value={formData.useImageDisplay} onValueChange={(v) => handleChange('useImageDisplay', v)} className="flex items-center gap-6">
                    <OptionItem value="use" label="사용함" />
                    <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>

             {formData.useImageDisplay === 'use' && (
                <>
                    <FormRow label="이미지 리사이즈" help>
                        <div className="flex items-center gap-2">
                            <Input className="w-20 h-8 text-xs border-gray-300 rounded-[2px]" defaultValue="700" />
                            <span className="text-gray-600">px</span>
                        </div>
                    </FormRow>

                    <FormRow label="노출 위치">
                        <RadioGroup defaultValue="top" className="flex items-center gap-6">
                            <OptionItem value="top" label="본문상단" />
                            <OptionItem value="bottom" label="본문하단" />
                        </RadioGroup>
                    </FormRow>
                </>
             )}

             <FormRow label="리스트화면 노출">
                <RadioGroup defaultValue="use" className="flex items-center gap-6">
                    <OptionItem value="use" label="사용함" />
                    <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>

             <FormRow label="IP 노출">
                <div className="flex flex-col gap-3">
                   <RadioGroup defaultValue="use" className="flex items-center gap-6">
                        <OptionItem value="use" label="사용함" />
                        <OptionItem value="no" label="사용안함" />
                    </RadioGroup>
                    <div className="flex items-center gap-1.5">
                        <Checkbox id="ip-mask" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" defaultChecked/>
                        <Label htmlFor="ip-mask" className="text-gray-700 font-normal text-xs">IP 끝자리 암호화표기</Label>
                    </div>
                </div>
             </FormRow>
        </div>
      </div>
      
       {/* Top/Bottom Decoration Settings */}
       <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-base text-gray-800">상단 하단 꾸미기</h2>
        </div>
        <div className="border-t border-gray-400 bg-white p-6 border-b border-gray-200">
             <div className="flex gap-6">
                 <div className="w-32 pt-10 font-normal text-gray-700 text-xs">
                     상단디자인<br/>(Header)
                 </div>
                 <div className="flex-1">
                     <div className="border border-gray-300 rounded-[2px] overflow-hidden">
                         {/* Mock Toolbar */}
                         <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center gap-2">
                             <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                                <Button variant="ghost" size="icon" className="h-6 w-6"><span className="text-gray-500 text-xs">↩</span></Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6"><span className="text-gray-500 text-xs">↪</span></Button>
                             </div>
                             <div className="flex items-center gap-2 border-r border-gray-300 pr-2">
                                 <span className="text-xs text-gray-600 font-serif">A</span>
                                 <span className="text-xs text-gray-600 font-bold">B</span>
                                 <span className="text-xs text-gray-600 underline">U</span>
                             </div>
                              <div className="flex items-center gap-2">
                                 <span className="text-xs text-gray-600">≡</span>
                                 <span className="text-xs text-gray-600">⋮≡</span>
                             </div>
                             <div className="flex-1"></div>
                             <div className="flex items-center gap-1">
                                 <span className="text-xs text-gray-600">🔗</span>
                                 <span className="text-xs text-gray-600">🖼️</span>
                                 <span className="text-xs text-gray-600">code</span>
                             </div>
                         </div>
                         <textarea 
                            className="w-full h-48 p-4 text-xs resize-y outline-none" 
                            placeholder="내용을 입력하세요."
                            value={formData.headerHtml}
                            onChange={(e) => handleChange('headerHtml', e.target.value)}
                         />
                         <div className="border-t border-gray-100 p-1 bg-gray-50 text-[10px] text-gray-400 text-right pr-2">
                             Words: 0   문자: 0
                         </div>
                     </div>
                 </div>
             </div>

             <div className="flex gap-6 mt-6">
                 <div className="w-32 pt-10 font-normal text-gray-700 text-xs">
                     하단디자인<br/>(Footer)
                 </div>
                 <div className="flex-1">
                     <div className="border border-gray-300 rounded-[2px] overflow-hidden">
                         {/* Mock Toolbar */}
                         <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center gap-2">
                            <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                                <Button variant="ghost" size="icon" className="h-6 w-6"><span className="text-gray-500 text-xs">↩</span></Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6"><span className="text-gray-500 text-xs">↪</span></Button>
                             </div>
                             <div className="flex items-center gap-2 border-r border-gray-300 pr-2">
                                 <span className="text-xs text-gray-600 font-serif">A</span>
                                 <span className="text-xs text-gray-600 font-bold">B</span>
                             </div>
                             <div className="flex-1"></div>
                             <div className="flex items-center gap-1">
                                 <span className="text-xs text-gray-600">🔗</span>
                                 <span className="text-xs text-gray-600">🖼️</span>
                                 <span className="text-xs text-gray-600">code</span>
                             </div>
                         </div>
                         <textarea 
                            className="w-full h-48 p-4 text-xs resize-y outline-none" 
                            placeholder="내용을 입력하세요."
                            value={formData.footerHtml}
                            onChange={(e) => handleChange('footerHtml', e.target.value)}
                         />
                          <div className="border-t border-gray-100 p-1 bg-gray-50 text-[10px] text-gray-400 text-right pr-2">
                             Words: 0   문자: 0
                         </div>
                     </div>
                 </div>
             </div>
        </div>
      </div>

      {/* SEO Tag Settings */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold text-base text-gray-800">게시판 개별 SEO 태그 설정</h2>
          <Button variant="outline" className="h-7 px-3 text-xs border-gray-300 rounded-[2px] text-gray-600 bg-white">
              <span className="mr-1">?</span> 치환코드 보기
          </Button>
        </div>
        <div className="border-t border-gray-400">
             <FormRow label="개별 설정 사용여부" help>
                <RadioGroup value={formData.seoUse} onValueChange={(v) => handleChange('seoUse', v)} className="flex items-center gap-6">
                    <OptionItem value="use" label="사용함" />
                    <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>

             <FormRow label="타이틀 (Title)">
                 <Input 
                    className="w-full max-w-4xl h-8 text-xs border-gray-300 rounded-[2px]" 
                    placeholder="타이틀을 입력하세요"
                    value={formData.seoTitle}
                    onChange={(e) => handleChange('seoTitle', e.target.value)}
                 />
             </FormRow>

             <FormRow label="메타태그 작성자 (Author)">
                 <Input 
                    className="w-full max-w-4xl h-8 text-xs border-gray-300 rounded-[2px]" 
                    placeholder="메타태그 작성자를 입력하세요"
                    value={formData.seoAuthor}
                    onChange={(e) => handleChange('seoAuthor', e.target.value)}
                 />
             </FormRow>
             
              <FormRow label="메타태그 설명 (Description)">
                 <Input 
                    className="w-full max-w-4xl h-8 text-xs border-gray-300 rounded-[2px]" 
                    placeholder="메타태그에 대한 설명을 입력하세요"
                    value={formData.seoDescription}
                    onChange={(e) => handleChange('seoDescription', e.target.value)}
                 />
             </FormRow>

              <FormRow label="메타태그 키워드 (Keywords)">
                 <Input 
                    className="w-full max-w-4xl h-8 text-xs border-gray-300 rounded-[2px]" 
                    placeholder="메타태그 키워드를 입력하세요"
                    value={formData.seoKeywords}
                    onChange={(e) => handleChange('seoKeywords', e.target.value)}
                 />
             </FormRow>
        </div>
      </div>

      {/* Information Guide / Footer Note */}
      <div className="mb-24 px-1">
          <div className="flex items-center gap-1 mb-2">
              <span className="text-gray-700 font-bold text-[13px]">🗣 안내</span>
          </div>
          <div className="text-gray-600 text-[11px] leading-relaxed mb-4">
              <span className="font-bold text-gray-800">[쓰기권한 추가 기준], [중복작성 제한] 상품후기(goodsreview) 게시판의 후기 작성 권한은 어떻게 제한하나요?</span><br/>
              • 상품후기(goodsreview) 게시판의 경우, 쓰기권한 추가 기준 / 중복작성 제한 항목의 설정에 따라 후기 작성 권한을 제한할 수 있습니다.<br/>
              • "쓰기권한 추가 기준" 설정을 "구매 내역이 존재하는 경우에만 후기 작성 가능"으로 설정한 경우, 작성 가능 시점 이후 주문 건에 대해 후기 작성이 가능합니다.<br/>
              - 관리자가 추가한 주문 상태가 있을 경우 해당 주문상태도 포함되며, 클레임 주문상태들은 제외됩니다.<br/>
              - 쓰기 권한이 "관리자 전용"으로 설정되어 있을 경우, 주문상태와 상관없이 작성 가능합니다.
          </div>
          
          <div className="border border-gray-300 bg-white">
              <div className="flex bg-[#FBFBFB] border-b border-gray-300 text-gray-700 font-normal text-xs text-center">
                  <div className="w-1/4 p-2 border-r border-gray-300">쓰기권한 추가 기준</div>
                  <div className="w-1/4 p-2 border-r border-gray-300">중복작성 제한</div>
                  <div className="w-1/2 p-2">후기 작성 가능 여부</div>
              </div>
               <div className="flex border-b border-gray-200 text-gray-600 text-[11px]">
                  <div className="w-1/4 p-3 border-r border-gray-200 flex items-center justify-center text-center bg-white">
                      구매여부 상관 없이 작성 가능
                  </div>
                   <div className="w-1/4 border-r border-gray-200 bg-white">
                       <div className="p-3 border-b border-gray-200 h-1/2 flex items-center justify-center text-center text-gray-400">제한 없음</div>
                       <div className="p-3 h-1/2 flex items-center justify-center text-center text-gray-800 font-medium">1회만 작성 가능하도록 제한</div>
                   </div>
                   <div className="w-1/2 bg-white">
                       <div className="p-3 border-b border-gray-200 h-1/2 flex items-center">동일 상품에 대해 중복 작성 가능</div>
                        <div className="p-3 h-1/2 flex flex-col justify-center gap-1">
                            <span>동일 상품에 대해 1회만 작성 가능</span>
                            <span className="text-gray-400">- 회원 ID 기준</span>
                            <span className="text-gray-400">- 비회원 후기 작성 제한 불가</span>
                        </div>
                   </div>
              </div>

               <div className="flex text-gray-600 text-[11px]">
                  <div className="w-1/4 p-3 border-r border-gray-200 flex items-center justify-center text-center bg-white">
                      구매 내역이 존재하는 경우에만<br/>후기 작성 가능
                  </div>
                   <div className="w-1/4 border-r border-gray-200 bg-white">
                       <div className="p-3 border-b border-gray-200 h-1/2 flex items-center justify-center text-center text-gray-400">제한 없음</div>
                       <div className="p-3 h-1/2 flex items-center justify-center text-center text-gray-800 font-medium">1회만 작성 가능하도록 제한</div>
                   </div>
                   <div className="w-1/2 bg-white">
                       <div className="p-3 border-b border-gray-200 h-1/2 flex items-center">주문한 상품/옵션에 대해 후기 중복 작성 가능</div>
                        <div className="p-3 h-1/2 flex flex-col justify-center gap-1">
                            <span>주문한 상품/옵션에 대해 1회만 작성 가능</span>
                            <span className="text-gray-400">- 주문번호 내 동일 상품/옵션 기준으로 횟수 제한</span>
                            <span className="text-gray-400">- 회원 ID 기준</span>
                            <span className="text-gray-400">- 비회원은 주문번호로 로그인 시 후기 작성 가능</span>
                            <span className="text-gray-400">- 동일상품 재주문 시 후기 작성 가능</span>
                        </div>
                   </div>
              </div>
          </div>
      </div>

    </div>
  );
}
