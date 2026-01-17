"use client";

import React from "react";
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
  Youtube,
  ChevronUp,
  Info,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { createBoardAction, checkBoardIdAction } from "@/actions/board-create-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BoardCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
      seoUse: "no", // "no" by default
      seoTitle: "",
      seoAuthor: "",
      seoDescription: "",
      seoKeywords: ""
  });

  const handleChange = (key: string, value: string | boolean) => {
      setFormData(prev => ({ ...prev, [key]: value }));
  };

  const checkId = async () => {
      if (!formData.boardId) {
          toast.error("아이디를 입력해주세요.");
          return;
      }
      const res = await checkBoardIdAction(formData.boardId);
      if (res.success && res.available) {
          toast.success("사용 가능한 아이디입니다.");
      } else {
          toast.error("이미 사용 중인 아이디입니다.");
      }
  };

  const handleSave = async () => {
    if (!formData.boardId) return toast.error("게시판 아이디를 입력해주세요.");
    if (!formData.name) return toast.error("게시판명을 입력해주세요.");

    setLoading(true);
    
    // Map data
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

    const result = await createBoardAction({
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
        toast.success("게시판이 생성되었습니다.");
        router.push('/admin/boards');
    } else {
        toast.error(result.error || "생성 실패");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">게시판 등록</h1>
          <span className="text-gray-500 text-sm">커뮤니티 메뉴에서 서비스하는 게시판을 등록합니다.</span>
        </div>
        <Button onClick={handleSave} disabled={loading} className="h-10 px-10 text-base bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
          저장
        </Button>
      </div>

      {/* Basic Settings Section */}
      <div className="mb-12">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-bold text-base text-gray-800">기본설정</h2>
          <HelpCircle className="w-4 h-4 text-gray-400 stroke-[1.5]" />
        </div>

        <div className="border-t border-gray-400">
          {/* PC Mall Use */}
          <FormRow label="PC쇼핑몰 사용여부" required>
            <div className="flex flex-col gap-2">
              <RadioGroup value={formData.usePcMall} onValueChange={(v) => handleChange('usePcMall', v)} className="flex items-center gap-6">
                <OptionItem value="use" label="사용" />
                <OptionItem value="no" label="사용안함" />
              </RadioGroup>
              <div className="flex items-start gap-1 text-[11px] text-gray-400 leading-relaxed">
                 <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5 flex-shrink-0">!</span>
                 <span>"사용 안함" 설정 시 쇼핑몰 회원(비회원포함)접근을 하지 못하도록 설정합니다.<br/>관리자에서 접근 시 사용여부 설정과 상관없이 접속이 가능합니다.</span>
              </div>
            </div>
          </FormRow>

          {/* Mobile Mall Use */}
          <FormRow label="모바일쇼핑몰 사용여부" required>
             <div className="flex flex-col gap-2">
              <RadioGroup value={formData.useMobileMall} onValueChange={(v) => handleChange('useMobileMall', v)} className="flex items-center gap-6">
                <OptionItem value="use" label="사용" />
                <OptionItem value="no" label="사용안함" />
              </RadioGroup>
              <div className="flex items-start gap-1 text-[11px] text-gray-400 leading-relaxed">
                 <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5 flex-shrink-0">!</span>
                 <span>"사용 안함" 설정 시 쇼핑몰 회원(비회원포함)접근을 하지 못하도록 설정합니다.<br/>관리자에서 접근 시 사용여부 설정과 상관없이 접속이 가능합니다.</span>
              </div>
            </div>
          </FormRow>

          {/* Type */}
          <FormRow label="유형" required help>
            <div className="flex flex-col gap-3">
               <RadioGroup value={formData.type} onValueChange={(v) => handleChange('type', v)} className="flex items-center gap-10">
                  <div className="flex flex-col gap-2 items-start">
                     <OptionItem value="normal" label="일반형" />
                     <div className="w-36 h-20 border border-gray-200 bg-[#FBFBFB] flex flex-col p-2 gap-1">
                        <div className="w-full h-1 bg-gray-300" />
                        <div className="w-full h-1 bg-gray-300" />
                        <div className="w-2/3 h-1 bg-gray-300" />
                        <div className="w-full h-1 bg-gray-300" />
                     </div>
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                     <OptionItem value="gallery" label="갤러리형" />
                     <div className="w-36 h-20 border border-gray-200 bg-[#FBFBFB] grid grid-cols-3 p-1.5 gap-1">
                        <div className="bg-gray-300" /><div className="bg-gray-300" /><div className="bg-gray-300" />
                        <div className="bg-gray-300" /><div className="bg-gray-300" /><div className="bg-gray-300" />
                     </div>
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                     <OptionItem value="event" label="이벤트형" />
                     <div className="w-36 h-20 border border-gray-200 bg-[#FBFBFB] flex flex-col p-2 gap-2">
                        <div className="flex gap-2"><div className="w-10 h-6 bg-gray-300"/><div className="flex-1 space-y-1"><div className="h-1 bg-gray-300"/><div className="h-1 bg-gray-300"/></div></div>
                        <div className="flex gap-2"><div className="w-10 h-6 bg-gray-300"/><div className="flex-1 space-y-1"><div className="h-1 bg-gray-300"/><div className="h-1 bg-gray-300"/></div></div>
                     </div>
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                     <OptionItem value="one" label="1:1 문의형" />
                     <div className="w-36 h-20 border border-gray-200 bg-[#FBFBFB] flex flex-col p-2 gap-1.5">
                        <div className="w-full h-2 bg-gray-300" />
                        <div className="w-2/3 h-2 bg-gray-300" />
                        <div className="w-full h-2 bg-gray-300" />
                     </div>
                  </div>
               </RadioGroup>
               <div className="flex items-center gap-1 text-[11px] text-gray-400">
                  <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px]">!</span>
                  <span>1:1 문의형 게시판은 댓글 기능이 제공되지 않습니다.</span>
               </div>
            </div>
          </FormRow>

          {/* ID */}
          <FormRow label="아이디" required help>
            <div className="flex items-center gap-1">
               <Input 
                   value={formData.boardId}
                   onChange={(e) => handleChange('boardId', e.target.value)}
                   className="w-48 h-7 text-xs border-gray-300 rounded-[2px]" 
               />
               <Button onClick={checkId} variant="outline" className="h-7 px-3 text-[11px] border-gray-300 rounded-[2px] bg-white text-gray-700 font-normal">중복확인</Button>
            </div>
          </FormRow>

          {/* Board Name */}
          <FormRow label="게시판명" required>
             <Input 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-[450px] h-7 text-xs border-gray-300 rounded-[2px]" 
             />
          </FormRow>

          {/* Board Skin */}
          <FormRow label="게시판 스킨" help>
             <div className="w-full max-w-4xl border border-gray-200">
                <table className="w-full text-center border-collapse text-[11px]">
                   <thead className="bg-[#FBFBFB] border-b border-gray-200">
                      <tr className="h-9">
                         <th className="font-normal w-24 border-r border-gray-200">구분</th>
                         <th className="font-normal w-64 border-r border-gray-200">사용중인 디자인 스킨</th>
                         <th className="font-normal">게시판 디자인 스킨 선택</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-200">
                      <tr className="h-12">
                         <td className="bg-white font-bold border-r border-gray-200" rowSpan={2}>PC 쇼핑몰</td>
                         <td className="bg-white border-r border-gray-200">
                            <div className="flex items-center gap-2 pl-4">
                               <span className="text-xs">🇰🇷</span> glance
                            </div>
                         </td>
                         <td className="bg-white p-2">
                            <Select defaultValue="placeholder">
                               <SelectTrigger className="w-full h-8 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger>
                               <SelectContent><SelectItem value="placeholder">선택해주세요</SelectItem></SelectContent>
                            </Select>
                         </td>
                      </tr>
                      <tr className="h-12">
                         <td className="bg-white border-r border-gray-200 border-t border-gray-200">
                            <div className="flex items-center gap-2 pl-4">
                               <span className="text-xs">🇨🇳</span> mime_cn
                            </div>
                         </td>
                         <td className="bg-white p-2 border-t border-gray-200">
                           <Select defaultValue="placeholder">
                               <SelectTrigger className="w-full h-8 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger>
                               <SelectContent><SelectItem value="placeholder">선택해주세요</SelectItem></SelectContent>
                            </Select>
                         </td>
                      </tr>
                      <tr className="h-12 border-t-2 border-gray-200">
                        <td className="bg-white font-bold border-r border-gray-200" rowSpan={2}>모바일 쇼핑몰</td>
                        <td className="bg-white border-r border-gray-200">
                           <div className="flex items-center gap-2 pl-4">
                              <span className="text-xs">🇰🇷</span> glance
                           </div>
                        </td>
                        <td className="bg-white p-2">
                            <Select defaultValue="placeholder">
                               <SelectTrigger className="w-full h-8 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger>
                               <SelectContent><SelectItem value="placeholder">선택해주세요</SelectItem></SelectContent>
                            </Select>
                        </td>
                      </tr>
                       <tr className="h-12">
                         <td className="bg-white border-r border-gray-200 border-t border-gray-200">
                            <div className="flex items-center gap-2 pl-4">
                               <span className="text-xs">🇨🇳</span> mime_cn
                            </div>
                         </td>
                         <td className="bg-white p-2 border-t border-gray-200">
                           <Select defaultValue="placeholder">
                               <SelectTrigger className="w-full h-8 text-xs border-gray-300 bg-white"><SelectValue/></SelectTrigger>
                               <SelectContent><SelectItem value="placeholder">선택해주세요</SelectItem></SelectContent>
                            </Select>
                         </td>
                      </tr>
                   </tbody>
                </table>
             </div>
             <div className="flex flex-col gap-1.5 mt-2">
                <div className="flex items-start gap-1 text-[11px] text-gray-400">
                   <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">!</span>
                   <span>쇼핑몰 디자인 사용스킨 변경 시 이전에 생성한 게시판 스킨은 사용할 수 없습니다.<br/>사용 스킨 변경 시 게시판 스킨을 다시한번 확인하시기 바랍니다.</span>
                </div>
                <div className="flex justify-end pr-2 md:pr-0">
                    <Button variant="outline" className="h-7 px-3 text-[11px] border-gray-300 rounded-[2px] bg-white text-gray-700 font-normal">게시판 스킨등록</Button>
                </div>
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
                    <Button variant="outline" className="h-6 px-2 text-[10px] border-gray-300 bg-[#999999] text-white rounded-[2px]">회원등급 선택</Button>
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
                    <Button variant="outline" className="h-6 px-2 text-[10px] border-gray-300 bg-[#999999] text-white rounded-[2px]">회원등급 선택</Button>
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
                    <Button variant="outline" className="h-6 px-2 text-[10px] border-gray-300 bg-[#999999] text-white rounded-[2px]">회원등급 선택</Button>
                </div>
             </RadioGroup>
          </FormRow>

          {/* Answer Type */}
          <FormRow label="답변 기능">
             <div className="flex flex-col gap-2">
                <RadioGroup value={formData.useReply} onValueChange={(v) => handleChange('useReply', v)} className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                       <RadioGroupItem value="use" id="ans-use" className="border-red-500 text-red-500 w-4 h-4" />
                       <div className="flex items-center gap-1">
                          <Label htmlFor="ans-use" className="text-gray-700 cursor-pointer text-xs">사용</Label>
                          <div className="flex items-center gap-1 pl-1">
                             <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                             <span className="text-gray-600">답변관리 기능 사용</span>
                          </div>
                          <span className="text-gray-700">)</span>
                       </div>
                    </div>
                   <OptionItem value="no" label="사용안함" />
                </RadioGroup>
                <div className="flex items-start gap-1 text-[11px] text-gray-400">
                   <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">!</span>
                   <span>답변관리 기능 사용 시 운영자 작성 답변글은 답변완료인 글만 쇼핑몰에 노출되며, 사용 전에 작성된 답변글은 답변완료로 처리 시 노출됩니다.</span>
                </div>
             </div>
          </FormRow>

          {/* Answer Permission */}
          <FormRow label="답변권한 설정">
             <RadioGroup defaultValue="all" className="flex items-center gap-4 flex-wrap">
                <OptionItem value="all" label="전체(회원+비회원)" />
                <OptionItem value="admin" label="관리자 전용" />
                <OptionItem value="member" label="회원전용(비회원제외)" />
                <div className="flex items-center gap-2">
                    <OptionItem value="grade" label="특정회원등급" />
                    <Button variant="outline" className="h-6 px-2 text-[10px] border-gray-300 bg-[#999999] text-white rounded-[2px]">회원등급 선택</Button>
                </div>
             </RadioGroup>
          </FormRow>

          {/* Comment Function */}
          <FormRow label="댓글 기능">
              <RadioGroup value={formData.useComment} onValueChange={(v) => handleChange('useComment', v)} className="flex items-center gap-6">
                 <OptionItem value="use" label="사용" />
                 <OptionItem value="no" label="사용안함" />
              </RadioGroup>
          </FormRow>

          {/* Comment Permission */}
          <FormRow label="댓글권한 설정">
              <RadioGroup value={formData.commentAccess} onValueChange={(v) => handleChange('commentAccess', v)} className="flex items-center gap-4 flex-wrap">
                <OptionItem value="all" label="전체(회원+비회원)" />
                <OptionItem value="admin" label="관리자 전용" />
                <OptionItem value="member" label="회원전용(비회원제외)" />
                <div className="flex items-center gap-2">
                    <OptionItem value="grade" label="특정회원등급" />
                    <Button variant="outline" className="h-6 px-2 text-[10px] border-gray-300 bg-[#999999] text-white rounded-[2px]">회원등급 선택</Button>
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
                <SelectContent><SelectItem value="all">전체노출</SelectItem></SelectContent>
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

          {/* Delete Setting */}
          <FormRow label="게시글 삭제 설정">
              <div className="flex flex-col gap-2">
                 <RadioGroup defaultValue="only_post" className="flex flex-col gap-2">
                    <OptionItem value="only_post" label="답변글이 있는 게시글 삭제시, 해당 글만 삭제" />
                    <OptionItem value="all" label="답변글이 있는 게시글 삭제시, 답변글도 함께 삭제" />
                 </RadioGroup>
                 <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px]">!</span>
                    <span>답변글이 있는 게시글 삭제시, 삭제하고자 하는 게시글 하위의 모든 답변글이 함께 삭제됩니다.</span>
                 </div>
              </div>
          </FormRow>

          {/* Auto Delete Setting (3 years) */}
          <FormRow label="게시글 3년 경과 자동 삭제 설정">
             <div className="flex flex-col gap-2">
                <RadioGroup defaultValue="no" className="flex items-center gap-6">
                   <OptionItem value="use" label="사용" />
                   <OptionItem value="no" label="사용안함" />
                </RadioGroup>
                <div className="flex items-start gap-1 text-[11px] text-gray-400">
                    <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">!</span>
                    <span>상품후기 게시판을 "사용함"으로 설정할 경우, <Link href="#" className="text-blue-500 underline">[회원 &gt; 회원관리 &gt; 회원등급 평가방법 설정]</Link>에서 '주문상품후기'에 대한 기간제한이 3년으로 제한될 수 있습니다.</span>
                </div>
             </div>
          </FormRow>

          {/* Mileage Use */}
          <FormRow label="마일리지 사용유무">
              <RadioGroup defaultValue="no" className="flex items-center gap-6">
                 <OptionItem value="use" label="사용" />
                 <OptionItem value="no" label="사용안함" />
              </RadioGroup>
          </FormRow>
        </div>
      </div>

      {/* Function Settings Section */}
      <div className="mb-12">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-bold text-base text-gray-800">기능설정</h2>
          <HelpCircle className="w-4 h-4 text-gray-400 stroke-[1.5]" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
            {/* Product Link */}
            <FormRow label="상품 연동">
                <div className="flex flex-col gap-4">
                   <RadioGroup value={formData.useProductLink} onValueChange={(v) => handleChange('useProductLink', v)} className="flex items-center gap-6">
                      <OptionItem value="use" label="사용" />
                      <OptionItem value="no" label="사용안함" />
                   </RadioGroup>
                   
                   <div className="bg-[#FBFBFB] border border-gray-200 p-4 flex flex-col gap-4">
                      <div className="flex items-center gap-6">
                         <span className="font-bold text-gray-700 w-24">상품/주문연동</span>
                         <RadioGroup value={formData.productLinkType} onValueChange={(v) => handleChange('productLinkType', v)} className="flex items-center gap-6">
                            <OptionItem value="prod" label="상품" />
                            <OptionItem value="order" label="주문상품" />
                         </RadioGroup>
                      </div>
                      <div className="flex flex-col gap-1.5 text-gray-400 text-[11px] leading-relaxed ml-24">
                         <div className="flex gap-1.5 items-start">
                            <span className="bg-gray-400 text-white w-3.5 h-3.5 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">※</span>
                            <span>상품 / 주문상품 연동 사용 시 등록된 상품 또는 주문상품 중 1개를 선택하여 게시글을 작성 할 수 있습니다. (단 주문상품에서 입금대기는 제외됩니다.)</span>
                         </div>
                         <div className="flex gap-1.5 items-start">
                            <span className="bg-gray-400 text-white w-3.5 h-3.5 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">※</span>
                            <span>주문내역 중복 사용 체크 시 다른 게시글에 연동하여 등록한 주문 상품을 신규 게시글 등록 시 다시 선택할 수 있습니다.<br/>미체크 시 해당 게시판에 주문상품 연동은 1회로 제한됩니다.</span>
                         </div>
                         <div className="flex gap-1.5 items-start">
                            <span className="bg-gray-400 text-white w-3.5 h-3.5 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">※</span>
                            <span>상품문의 게시판은 상품만 설정 가능합니다.</span>
                         </div>
                         <div className="flex gap-1.5 items-start">
                            <span className="bg-gray-400 text-white w-3.5 h-3.5 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">※</span>
                            <span>상품후기 게시판은 쓰기권한 추가 기준의 설정값에 따라 "상품", "주문상품" 설정값이 결정됩니다.</span>
                         </div>
                      </div>
                   </div>
                </div>
            </FormRow>

            {/* Rating Use */}
            <FormRow label="게시글 작성 시 별점">
               <RadioGroup defaultValue="no" className="flex items-center gap-6">
                  <OptionItem value="use" label="사용" />
                  <OptionItem value="no" label="사용안함" />
               </RadioGroup>
            </FormRow>

            {/* Recommendation Use */}
            <FormRow label="게시글 추천">
               <RadioGroup defaultValue="no" className="flex items-center gap-6">
                  <OptionItem value="use" label="사용" />
                  <OptionItem value="no" label="사용안함" />
               </RadioGroup>
            </FormRow>

            {/* Board Template Setting */}
            <FormRow label="기본 게시글 양식 설정">
               <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-1">
                    <Select defaultValue="none">
                       <SelectTrigger className="w-64 h-8 text-xs border-gray-300 bg-white"><SelectValue placeholder="=선택없음="/></SelectTrigger>
                       <SelectContent><SelectItem value="none">=선택없음=</SelectItem></SelectContent>
                    </Select>
                    <Button className="h-8 px-3 text-xs bg-[#555555] hover:bg-[#444444] text-white rounded-[2px] border-0">게시글 양식 등록</Button>
                 </div>
                 <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px]">!</span>
                    <span>에디터 미사용 시 쇼핑몰 게시글 양식은 텍스트만 노출됩니다.</span>
                 </div>
               </div>
            </FormRow>

            {/* Prefix Function */}
            <FormRow label="말머리 기능" help>
               <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-1.5">
                    <Checkbox className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                    <span className="text-gray-700">말머리 사용</span>
                    <Link href="#" className="text-blue-500 underline ml-1">글작성시 제목앞에 특정단어를 넣는 기능입니다</Link>
                 </div>
                 <div className="flex items-start gap-1 text-[11px] text-gray-400">
                    <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">!</span>
                    <span>말머리 게시글 양식 설정: 말머리 선택에 따른 게시글 양식을 설정할 수 있습니다. 기본 게시글 양식과 중복 사용이 가능하되, 말머리에 설정한 게시글 양식이 있는 경우 말머리 게시글 양식이 우선적으로 노출됩니다.</span>
                 </div>
               </div>
            </FormRow>

            {/* View Count Setting */}
            <FormRow label="조회수 표시 설정">
               <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="pc-view" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" checked />
                        <Label htmlFor="pc-view" className="text-gray-700 cursor-pointer">PC쇼핑몰</Label>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox id="mo-view" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" checked />
                        <Label htmlFor="mo-view" className="text-gray-700 cursor-pointer">모바일쇼핑몰</Label>
                     </div>
                  </div>
                   <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px]">!</span>
                    <span>PC쇼핑몰, 모바일쇼핑몰 전체 체크 시, PC 및 모바일쇼핑몰의 리스트 및 상세 영역의 조회수가 노출됩니다.</span>
                 </div>
               </div>
            </FormRow>

            {/* Hit Count Increment */}
            <FormRow label="조회당 Hit증가수" required>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-gray-700">
                       <Input className="w-16 h-7 text-xs border-gray-300 rounded-[2px]" defaultValue="1" />
                       <span>개</span>
                    </div>
                    <div className="flex items-center gap-1.5 ml-4">
                       <Checkbox id="ip-limit" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                       <Label htmlFor="ip-limit" className="text-gray-700 cursor-pointer">IP 중복제한</Label>
                    </div>
                </div>
            </FormRow>

            {/* Private Post Setting */}
            <FormRow label="비밀글 설정">
               <RadioGroup defaultValue="normal" className="flex items-center gap-6 flex-wrap">
                  <OptionItem value="normal" label="작성시 기본 일반글" />
                  <OptionItem value="secret_def" label="작성시 기본 비밀글" />
                  <OptionItem value="always_normal" label="무조건 일반글" />
                  <OptionItem value="always_secret" label="무조건 비밀글" />
               </RadioGroup>
            </FormRow>

            {/* Private Subject Setting */}
            <FormRow label="비밀글 제목설정" required>
                <RadioGroup defaultValue="expose" className="flex items-center gap-4">
                   <OptionItem value="expose" label="제목 노출" />
                   <div className="flex items-center gap-2">
                      <OptionItem value="spec" label="제목 지정" />
                      <Input className="w-80 h-7 text-xs border-gray-300 rounded-[2px]" />
                   </div>
                </RadioGroup>
            </FormRow>

            {/* Private Comment Setting */}
            <FormRow label="비밀댓글 설정" required>
               <RadioGroup defaultValue="normal" className="flex items-center gap-6 flex-wrap">
                  <OptionItem value="normal" label="작성시 기본 일반댓글" />
                  <OptionItem value="secret_def" label="작성시 기본 비밀댓글" />
                  <OptionItem value="always_normal" label="무조건 일반댓글" />
                  <OptionItem value="always_secret" label="무조건 비밀댓글" />
               </RadioGroup>
            </FormRow>

            {/* Private Comment Subject Setting */}
             <FormRow label="비밀댓글 제목설정" required>
                <RadioGroup defaultValue="expose" className="flex items-center gap-4">
                   <OptionItem value="expose" label="제목 노출" />
                   <div className="flex items-center gap-2">
                      <OptionItem value="spec" label="제목 지정" />
                      <Input className="w-80 h-7 text-xs border-gray-300 rounded-[2px]" />
                   </div>
                </RadioGroup>
            </FormRow>

            {/* Starting Num */}
            <FormRow label="게시물 시작번호" required>
                <Input className="w-16 h-7 text-xs border-gray-300 rounded-[2px]" defaultValue="1" />
            </FormRow>

            {/* NEW Icon Effect */}
            <FormRow label="NEW아이콘 효과" required>
                <div className="flex items-center gap-1.5">
                   <Input className="w-16 h-7 text-xs border-gray-300 rounded-[2px]" defaultValue="24" />
                   <span className="text-gray-700">시간</span>
                </div>
            </FormRow>

            {/* HOT Icon Condition */}
            <FormRow label="HOT아이콘 조건" required>
                <div className="flex items-center gap-1.5 text-gray-700">
                   <span>조회수</span>
                   <Input className="w-16 h-7 text-xs border-gray-300 rounded-[2px]" defaultValue="100" />
                   <span>회 이상 게시글</span>
                </div>
            </FormRow>
        </div>
      </div>

      {/* Spam Prevention Section */}
      <div className="mb-12">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-bold text-base text-gray-800">스팸방지 설정</h2>
          <HelpCircle className="w-4 h-4 text-gray-400 stroke-[1.5]" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
            {/* Allowed Tags */}
            <FormRow label="허용 태그">
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-1.5">
                      <Checkbox id="tag-iframe" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                      <Label htmlFor="tag-iframe" className="text-gray-700 cursor-pointer">iframe</Label>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <Checkbox id="tag-embed" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                      <Label htmlFor="tag-embed" className="text-gray-700 cursor-pointer">embed</Label>
                   </div>
                </div>
            </FormRow>

            {/* Allowed Domains */}
            <FormRow label="허용 도메인">
               <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1 flex-wrap">
                      <Input className="w-64 h-7 text-xs border-gray-300 rounded-[2px]" />
                      <Input className="w-64 h-7 text-xs border-gray-300 rounded-[2px]" />
                      <Button variant="outline" className="h-7 px-3 text-[11px] border-gray-300 rounded-[2px] bg-white text-gray-700 font-normal">+ 추가</Button>
                  </div>
                   <div className="flex items-start gap-1 text-[11px] text-gray-400">
                    <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">!</span>
                    <span>허용된 도메인의 컨텐츠에 대해 허용태그 사용이 가능합니다. 예) youtube.com</span>
                 </div>
               </div>
            </FormRow>

            {/* Comment Spam Prevention */}
            <FormRow label="댓글 스팸방지">
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-1.5">
                      <Checkbox id="spam-ext" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" checked />
                      <Label htmlFor="spam-ext" className="text-gray-700 cursor-pointer">외부유입차단</Label>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <Checkbox id="spam-auto" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" checked />
                      <Label htmlFor="spam-auto" className="text-gray-700 cursor-pointer">자동등록방지문자</Label>
                   </div>
                    <div className="flex items-center gap-1.5">
                      <Checkbox id="spam-sec" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" checked />
                      <Label htmlFor="spam-sec" className="text-gray-700 cursor-pointer">비밀댓글 암호보안</Label>
                   </div>
                </div>
            </FormRow>

            {/* Post Spam Prevention */}
            <FormRow label="게시글 스팸방지">
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-1.5">
                      <Checkbox id="post-spam-ext" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" checked />
                      <Label htmlFor="post-spam-ext" className="text-gray-700 cursor-pointer">외부유입차단</Label>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <Checkbox id="post-spam-auto" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" checked />
                      <Label htmlFor="post-spam-auto" className="text-gray-700 cursor-pointer">자동등록방지문자</Label>
                   </div>
                </div>
            </FormRow>
        </div>
      </div>

       {/* List Screen Settings Section */}
       <div className="mb-12">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-bold text-base text-gray-800">리스트화면 설정</h2>
          <HelpCircle className="w-4 h-4 text-gray-400 stroke-[1.5]" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Notice Display */}
             <FormRow label="공지사항 노출설정">
                <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-6">
                       <div className="flex items-center gap-1 text-gray-700">
                          <Input className="w-16 h-7 text-xs border-gray-300 rounded-[2px]" defaultValue="3" />
                          <span>개</span>
                       </div>
                       <div className="flex items-center gap-1.5">
                          <Checkbox 
                            id="list-notice" 
                            className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" 
                            checked={formData.showNotice}
                            onCheckedChange={(c) => handleChange('showNotice', c === true)}
                          />
                          <Label htmlFor="list-notice" className="text-gray-700 cursor-pointer">리스트 내 노출</Label>
                       </div>
                       <div className="flex items-center gap-1.5">
                          <Checkbox id="first-notice" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" checked />
                          <Label htmlFor="first-notice" className="text-gray-700 cursor-pointer">첫페이지한 노출</Label>
                       </div>
                   </div>
                   <div className="space-y-1 mt-1 text-gray-400 text-[11px]">
                       <div className="flex items-start gap-1">
                          <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">!</span>
                          <span>리스트 내 노출 설정 시 공지사항 글이 리스트 상단 이외에 본문리스트에 노출됩니다.</span>
                       </div>
                       <div className="flex items-start gap-1">
                          <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">!</span>
                          <span>첫페이지에 노출 설정 시 공지사항 글이 첫페이지에만 노출됩니다.</span>
                       </div>
                   </div>
                </div>
             </FormRow>

             {/* Subject Limit */}
             <FormRow label="제목글 제한" required>
                 <div className="flex items-center gap-1.5 text-gray-700">
                    <Input 
                       value={formData.subjectLimit}
                       onChange={(e) => handleChange('subjectLimit', e.target.value)}
                       className="w-16 h-7 text-xs border-gray-300 rounded-[2px]" 
                    />
                    <span>자</span>
                 </div>
             </FormRow>

             {/* Items Per Page */}
             <FormRow label="페이지당 게시물수" required>
                 <div className="flex flex-col gap-2 text-gray-700">
                    <Input 
                       value={formData.itemsPerPage}
                       onChange={(e) => handleChange('itemsPerPage', e.target.value)}
                       className="w-16 h-7 text-xs border-gray-300 rounded-[2px]" 
                    />
                    <div className="flex items-center gap-1 text-[11px] text-gray-400">
                        <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px]">!</span>
                        <span>게시판 전체보기의 페이지별 게시물 노출 개수를 설정합니다.</span>
                    </div>
                 </div>
             </FormRow>

              {/* Representative Image Exposure */}
              <FormRow label="대표 이미지 노출 여부">
                 <div className="flex flex-col gap-3">
                    <RadioGroup defaultValue="no" className="flex items-center gap-6">
                        <OptionItem value="use" label="사용" />
                        <OptionItem value="no" label="사용안함" />
                    </RadioGroup>
                    <div className="flex items-center gap-6 bg-[#FBFBFB] border border-gray-200 p-2 pl-4">
                       <span className="font-bold text-gray-600 w-24">대표 이미지 설정</span>
                       <RadioGroup defaultValue="upload" className="flex items-center gap-6">
                           <OptionItem value="upload" label="업로드 이미지" />
                           <OptionItem value="editor" label="에디터 이미지" />
                       </RadioGroup>
                    </div>
                 </div>
              </FormRow>

              {/* In Search Answer Exposure */}
              <FormRow label="검색 시 답변글 노출여부">
                 <div className="flex flex-col gap-2">
                    <RadioGroup defaultValue="no" className="flex items-center gap-6">
                        <OptionItem value="use" label="사용함" />
                        <OptionItem value="no" label="사용안함" />
                    </RadioGroup>
                    <div className="space-y-1 mt-1 text-gray-400 text-[11px]">
                       <div className="flex items-start gap-1">
                          <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">!</span>
                          <span>검색 시 원본글에 등록된 답변글도 검색결과에 노출시킬지 여부를 설정할 수 있습니다.</span>
                       </div>
                       <div className="flex items-start gap-1">
                          <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">!</span>
                          <span>검색결과 때 노출되는 답변글은 페이지당 게시물 수에 포함되지 않습니다.</span>
                       </div>
                   </div>
                 </div>
              </FormRow>
        </div>
      </div>

       {/* Author Screen Settings Section */}
       <div className="mb-0">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-bold text-base text-gray-800">작성자 화면 설정</h2>
          <HelpCircle className="w-4 h-4 text-gray-400 stroke-[1.5]" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Editor Use */}
             <FormRow label="에디터 사용">
                <RadioGroup value={formData.useEditor} onValueChange={(v) => handleChange('useEditor', v)} className="flex items-center gap-6">
                   <OptionItem value="use" label="사용함" />
                   <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>

             {/* Phone Writing */}
             <FormRow label="휴대폰 작성">
                <RadioGroup defaultValue="no" className="flex items-center gap-6">
                   <OptionItem value="use" label="사용함" />
                   <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>
             
              {/* Email Writing */}
              <FormRow label="이메일 작성">
                <RadioGroup defaultValue="no" className="flex items-center gap-6">
                   <OptionItem value="use" label="사용함" />
                   <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>

             {/* File Upload */}
             <FormRow label="업로드 파일 사용">
                <RadioGroup defaultValue="use" className="flex items-center gap-6">
                   <OptionItem value="use" label="사용함" />
                   <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>

             {/* Max File Size */}
             <FormRow label="업로드파일 최대크기" required>
                <div className="flex items-center gap-1.5 text-gray-700">
                   <Input 
                        value={formData.maxFileSize}
                        onChange={(e) => handleChange('maxFileSize', e.target.value)}
                        className="w-16 h-7 text-xs border-gray-300 rounded-[2px]" 
                    />
                   <span>MByte(s)</span>
                </div>
             </FormRow>

              {/* Link Use */}
              <FormRow label="링크">
                <RadioGroup defaultValue="no" className="flex items-center gap-6">
                   <OptionItem value="use" label="사용함" />
                   <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>
        </div>
      </div>

      {/* Post Content Screen Settings Section */}
      <div className="mb-12">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-bold text-sm text-gray-800">게시글 내용 화면설정</h2>
          <HelpCircle className="w-4 h-4 text-gray-400 stroke-[1.5]" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Attached Image Display */}
             <FormRow label="첨부파일 이미지 표시">
                <div className="flex flex-col gap-2">
                    <RadioGroup defaultValue="use" className="flex items-center gap-6">
                        <OptionItem value="use" label="사용함" />
                        <OptionItem value="no" label="사용안함" />
                    </RadioGroup>
                    <div className="flex items-start gap-1 text-[11px] text-gray-400">
                        <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">!</span>
                        <span>첨부파일로 등록된 이미지를 게시글 본문 상단에 노출할 수 있습니다.</span>
                    </div>
                </div>
             </FormRow>

             {/* Image Resize */}
             <FormRow label="이미지 리사이즈">
                <div className="flex flex-col gap-2 text-gray-700">
                    <div className="flex items-center gap-1.5">
                        <Input className="w-16 h-7 text-xs border-gray-300 rounded-[2px]" defaultValue="700" />
                        <span>px</span>
                    </div>
                    <div className="space-y-1 text-gray-400 text-[11px]">
                       <div className="flex items-start gap-1">
                          <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">!</span>
                          <span>첨부파일 이미지 업로드 시 제한된 값보다 이미지 넓이가 클 경우 설정된 값으로 리사이즈하여 노출합니다.</span>
                       </div>
                       <div className="flex items-start gap-1">
                          <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5">!</span>
                          <span>모바일은 디바이스 해상도보다 클 경우 모바일 해상도로 리사이즈하여 노출됩니다.</span>
                       </div>
                    </div>
                </div>
             </FormRow>

             {/* Exposure Location */}
             <FormRow label="노출 위치">
                <RadioGroup defaultValue="top" className="flex items-center gap-6">
                   <OptionItem value="top" label="본문상단" />
                   <OptionItem value="bottom" label="본문하단" />
                </RadioGroup>
             </FormRow>

             {/* Exposure on List Page */}
             <FormRow label="리스트화면 노출">
                <RadioGroup defaultValue="use" className="flex items-center gap-6">
                   <OptionItem value="use" label="사용함" />
                   <OptionItem value="no" label="사용안함" />
                </RadioGroup>
             </FormRow>

             {/* IP Exposure */}
             <FormRow label="IP 노출">
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-1.5">
                      <Checkbox id="ip-author" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                      <Label htmlFor="ip-author" className="text-gray-700 cursor-pointer">글쓴이의 IP를 보여줍니다</Label>
                   </div>
                   <div className="flex items-center gap-1.5">
                      <Checkbox id="ip-crypt" className="w-3.5 h-3.5 border-gray-300 rounded-[2px]" />
                      <Label htmlFor="ip-crypt" className="text-gray-700 cursor-pointer">IP 끝자리 암호화표기</Label>
                   </div>
                </div>
             </FormRow>
        </div>
      </div>

      {/* Decoration Section */}
      <div className="mb-12">
        <div className="flex items-center gap-1 mb-2">
          <h2 className="font-bold text-sm text-gray-800">상단 하단 꾸미기</h2>
          <HelpCircle className="w-4 h-4 text-gray-400 stroke-[1.5]" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Header Design */}
             <FormRow label={"상단디자인\n(Header)"}>
                <div className="w-full flex flex-col py-2">
                    <textarea 
                        className="w-full h-32 border border-gray-300 p-2 text-xs font-mono"
                        value={formData.headerHtml}
                        onChange={(e) => handleChange('headerHtml', e.target.value)}
                        placeholder="HTML을 입력하세요."
                    />
                </div>
             </FormRow>

             {/* Footer Design */}
             <FormRow label={"하단디자인\n(Footer)"}>
                <div className="w-full flex flex-col py-2">
                    <textarea 
                        className="w-full h-32 border border-gray-300 p-2 text-xs font-mono"
                        value={formData.footerHtml}
                        onChange={(e) => handleChange('footerHtml', e.target.value)}
                        placeholder="HTML을 입력하세요."
                    />
                </div>
             </FormRow>
        </div>
      </div>

      {/* SEO Settings Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <h2 className="font-bold text-sm text-gray-800">게시판 개별 SEO 태그 설정</h2>
            <HelpCircle className="w-4 h-4 text-gray-400 stroke-[1.5]" />
          </div>
          <Button variant="outline" className="h-7 px-3 text-[11px] border-gray-300 rounded-[2px] bg-[#B9B9B9] text-white hover:bg-gray-400 border-0">치환코드 보기</Button>
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Use Status */}
             <FormRow label="개별 설정 사용여부">
                <div className="flex flex-col gap-2">
                   <RadioGroup value={formData.seoUse} onValueChange={(v) => handleChange('seoUse', v)} className="flex items-center gap-6">
                      <OptionItem value="use" label="사용함" />
                      <OptionItem value="no" label="사용안함" />
                   </RadioGroup>
                   <div className="flex items-start gap-1 text-[11px] text-gray-400 leading-relaxed">
                      <span className="bg-gray-500 text-white w-3 h-3 text-[9px] flex items-center justify-center rounded-[2px] mt-0.5 flex-shrink-0">!</span>
                      <span>'사용함' 선택 시 기본설정 &gt; 검색엔진 최적화(SEO) 설정보다 개별 설정이 우선적으로 적용됩니다.<br/>설정 결과는 검색 엔진에 따라 평균 2주 ~ 3주 후에 반영될 수 있습니다.</span>
                   </div>
                </div>
             </FormRow>

             {/* Title */}
             <FormRow label="타이틀 (Title)">
                <Input 
                    value={formData.seoTitle}
                    onChange={(e) => handleChange('seoTitle', e.target.value)}
                    className="w-full h-7 text-xs border-gray-300 rounded-[2px]" 
                />
             </FormRow>

             {/* Author */}
             <FormRow label="메타태그 작성자 (Author)">
                <Input 
                    value={formData.seoAuthor}
                    onChange={(e) => handleChange('seoAuthor', e.target.value)}
                    className="w-full h-7 text-xs border-gray-300 rounded-[2px]" 
                />
             </FormRow>

             {/* Description */}
             <FormRow label="메타태그 설명 (Description)">
                <Input 
                    value={formData.seoDescription}
                    onChange={(e) => handleChange('seoDescription', e.target.value)}
                    className="w-full h-7 text-xs border-gray-300 rounded-[2px]" 
                />
             </FormRow>

             {/* Keywords */}
             <FormRow label="메타태그 키워드 (Keywords)">
                <Input 
                    value={formData.seoKeywords}
                    onChange={(e) => handleChange('seoKeywords', e.target.value)}
                    className="w-full h-7 text-xs border-gray-300 rounded-[2px]" 
                />
             </FormRow>
        </div>
      </div>

       {/* Guide Info */}
       <div className="border-t border-gray-200 pt-12 text-gray-600 text-[11px]">
          <h3 className="font-bold flex items-center gap-1 mb-6 text-blue-500 text-[13px]">
              <Info className="w-4 h-4 ml-[-2px]"/> 안내
          </h3>
          <div className="space-y-12 mb-12">
              <div>
                  <h4 className="font-bold text-gray-700 mb-2">[게시판 관리] 게시판 생성 시 유형은 무엇인가요?</h4>
                   <ul className="list-none space-y-2 text-gray-500 pl-1 leading-relaxed">
                    <li>· 게시판 유형은 게시판 성격에 맞춰 "일반형 / 갤러리형 / 이벤트형 / 1:1게시판형"을 선택하여 생성할 수 있습니다.</li>
                    <li>· 일반형 : 게시판 리스트에 제목만 노출되는 게시판입니다.</li>
                    <li>· 갤러리형 : 게시판 리스트에 제목 이외에 이미지를 추가적으로 노출하는 게시판입니다.</li>
                    <li>· 이벤트형 : 게시물을 등록 시 기간(시작일, 종료일)을 설정할 수 있는 게시판입니다.</li>
                    <li>· 1:1게시판형 : 문의와 답변을 1:1로 매칭하여 확인할 수 있는 게시판입니다.</li>
                    <li className="pl-3">ㄴ 게시글의 상태 값을 제공합니다. ("접수 / 답변대기 / 답변완료")</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold text-gray-700 mb-2">[게시판 관리] 신규 생성한 게시판은 쇼핑몰에 어떻게 연결하나요?</h4>
                   <ul className="list-none space-y-2 text-gray-500 pl-1 leading-relaxed">
                    <li>· 신규 생성된 게시판은 게시판 리스트에 추가되며, [보기] 버튼을 클릭하여 페이지로 이동하거나</li>
                    <li className="pl-3">[PC] / [모바일] 버튼을 클릭하여 게시판의 URL을 클립보드에 복사할 수 있습니다.</li>
                    <li>· "디자인 &gt; 디자인 관리 &gt; 디자인 페이지 수정"에서 원하는 페이지 내에 이미지 또는 텍스트를 넣고</li>
                    <li className="pl-1">게시판 URL을 링크를 처리하면, 신규 생성한 게시판으로 연결시킬 수 있습니다.</li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-bold text-gray-700 mb-2">[쓰기권한 추가 기준], [중복작성 제한] 상품후기(goodsreview) 게시판의 후기 작성 권한은 어떻게 제한하나요?</h4>
                   <ul className="list-none space-y-2 text-gray-500 pl-1 leading-relaxed">
                    <li>· 상품후기(goodsreview) 게시판의 경우, 쓰기권한 추가 기준 / 중복작성 제한 항목의 설정에 따라 후기 작성 권한을 제한할 수 있습니다.</li>
                    <li>· "쓰기권한 추가 기준" 설정을 "구매 내역이 존재하는 경우에만 후기 작성 가능"으로 설정한 경우, 작성 가능 시점 이후 주문 건에 대해 후기 작성이 가능합니다.</li>
                    <li className="pl-3">- 관리자가 추가한 주문 상태가 있을 경우 해당 주문상태도 포함되며, 클레임 주문상태들은 제외됩니다.</li>
                    <li className="pl-3">- 쓰기 권한이 "관리자 전용"으로 설정되어 있을 경우, 주문상태와 상관없이 작성 가능합니다.</li>
                  </ul>
              </div>
          </div>
      </div>

       {/* Bottom Copyright */}
        <div className="pb-6 text-center text-[10px] text-gray-400">
            © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
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
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100 p-0">
                        <ChevronUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0">
                         <ChevronUp className="w-4 h-4 rotate-180" />
                </Button>
            </div>
        </div>
    </div>
  );
}

function FormRow({ label, required = false, help = false, children }: { label: string, required?: boolean, help?: boolean, children: React.ReactNode }) {
  return (
    <div className="flex border-b border-gray-200 min-h-[48px]">
      <div className="w-52 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center border-r border-gray-200 relative">
        <div className="flex items-center gap-1">
            {required && <span className="text-red-500 mr-0.5">•</span>}
            {label}
            {help && <HelpCircle className="w-3.5 h-3.5 text-gray-300" />}
        </div>
      </div>
      <div className="flex-1 p-3 flex items-center">
        {children}
      </div>
    </div>
  );
}

function OptionItem({ value, label, id }: { value: string, label: string, id?: string }) {
   const finalId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
   return (
    <div className="flex items-center gap-2">
      <RadioGroupItem value={value} id={finalId} className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 focus:ring-red-500 w-4 h-4" />
      <Label htmlFor={finalId} className="text-gray-700 cursor-pointer text-xs font-normal">{label}</Label>
    </div>
   );
}

function EditorMock() {
  return (
    <div className="w-full border border-gray-200">
        {/* Toolbar */}
        <div className="bg-[#FBFBFB] border-b border-gray-200 p-1 flex items-center justify-between">
            <div className="flex items-center gap-0.5">
                <div className="px-2 py-0.5 border border-gray-300 bg-white text-[10px] flex items-center gap-1 cursor-default">글꼴 <div className="border-l border-gray-300 h-3 ml-1" /> <ChevronUp className="w-2.5 h-2.5 rotate-180" /></div>
                <div className="px-2 py-0.5 border border-gray-300 bg-white text-[10px] flex items-center gap-1 cursor-default">9pt <div className="border-l border-gray-300 h-3 ml-1" /> <ChevronUp className="w-2.5 h-2.5 rotate-180" /></div>
                <div className="h-4 w-[1px] bg-gray-300 mx-1" />
                <div className="p-1 hover:bg-gray-100 cursor-pointer font-bold border border-transparent">가</div>
                <div className="p-1 hover:bg-gray-100 cursor-pointer italic border border-transparent">가</div>
                <div className="p-1 hover:bg-gray-100 cursor-pointer underline border border-transparent">가</div>
                {/* Simplified icons */}
                <div className="h-4 w-[1px] bg-gray-300 mx-1" />
                <div className="flex items-center gap-1 opacity-50"><div className="w-4 h-4 bg-gray-200 rounded-sm"/><div className="w-4 h-4 bg-gray-200 rounded-sm"/></div>
            </div>
            <div className="flex items-center gap-1">
                <div className="p-1 border border-gray-300 bg-white flex items-center gap-1 px-2 text-[10px] cursor-default opacity-70">🔴 사진</div>
            </div>
        </div>
        {/* Content Area */}
        <div className="h-64 bg-white relative">
            <div className="absolute inset-0 bg-transparent" />
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-white border border-gray-300 shadow-sm px-4 py-1 text-[11px] text-gray-500 flex items-center gap-2">
                아래 영역을 드래그하여 입력창 크기를 조절할 수 있습니다. <span className="text-gray-300 cursor-pointer">X</span>
            </div>
        </div>
        {/* Resize Bar & Status */}
        <div className="bg-[#FBFBFB] border-t border-gray-200 p-0.5 flex items-center justify-between text-[10px] text-gray-400">
            <div className="flex-1 text-center font-bold">↕ 입력창 크기 조절</div>
            <div className="flex border-l border-gray-200">
                <div className="px-2 py-0.5 border-r border-gray-200 hover:bg-gray-100 cursor-pointer text-gray-600">Editor</div>
                <div className="px-2 py-0.5 border-r border-gray-200 hover:bg-gray-100 cursor-pointer">HTML</div>
                <div className="px-2 py-0.5 hover:bg-gray-100 cursor-pointer">TEXT</div>
            </div>
        </div>
    </div>
  );
}
