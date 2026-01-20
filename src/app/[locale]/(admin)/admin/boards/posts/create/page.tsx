"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";
import { getSimpleBoardListAction, createPostAction } from "@/actions/board-post-actions";

export default function PostCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState<{ id: string; name: string }[]>([]);

  const [formData, setFormData] = useState({
    boardId: "",
    subject: "",
    content: "",
    authorName: "관리자",
    isNotice: false,
    isSecret: false,
    answerStatus: "WAITING"
  });

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
      const res = await getSimpleBoardListAction();
      if (res.success) {
          setBoards(res.list || []);
          if (res.list && res.list.length > 0) {
              setFormData(prev => ({ ...prev, boardId: res.list[0].id }));
          }
      }
  };

  const handleSave = async () => {
      if (!formData.boardId) return toast.error("게시판을 선택해주세요.");
      if (!formData.subject) return toast.error("제목을 입력해주세요.");
      if (!formData.content) return toast.error("내용을 입력해주세요.");

      setLoading(true);
      const res = await createPostAction({
          boardId: formData.boardId,
          subject: formData.subject,
          content: formData.content,
          authorName: formData.authorName,
          isNotice: formData.isNotice,
          isSecret: formData.isSecret,
          answerStatus: formData.answerStatus
      });

      if (res.success) {
          toast.success("게시글이 등록되었습니다.");
          router.push("/admin/boards/posts");
      } else {
          toast.error(res.error || "등록 실패");
      }
      setLoading(false);
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <div className="flex items-baseline gap-2">
            <Link href="/admin/boards/posts">
                <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2">
                    <ArrowLeft className="w-4 h-4" />
                </Button>
            </Link>
          <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">게시글 등록</h1>
        </div>
        <Button onClick={handleSave} disabled={loading} className="h-10 px-8 text-base bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
          저장
        </Button>
      </div>

      <div className="border-t border-gray-400">
          {/* Board Select */}
          <div className="flex border-b border-gray-200">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              게시판 선택
            </div>
            <div className="flex-1 p-2 flex items-center">
               <Select value={formData.boardId} onValueChange={(v) => setFormData({...formData, boardId: v})}>
                <SelectTrigger className="w-64 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                  <SelectValue placeholder="게시판 선택" />
                </SelectTrigger>
                <SelectContent>
                  {boards.map(b => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Options */}
          <div className="flex border-b border-gray-200">
             <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              옵션
            </div>
            <div className="flex-1 p-2 flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                    <Checkbox 
                        id="notice" 
                        className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"
                        checked={formData.isNotice}
                        onCheckedChange={(c) => setFormData({...formData, isNotice: c === true})}
                    />
                    <Label htmlFor="notice" className="text-gray-700 font-normal cursor-pointer">공지사항</Label>
                </div>
                <div className="flex items-center gap-1.5">
                    <Checkbox 
                        id="secret" 
                        className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"
                        checked={formData.isSecret}
                        onCheckedChange={(c) => setFormData({...formData, isSecret: c === true})}
                    />
                    <Label htmlFor="secret" className="text-gray-700 font-normal cursor-pointer">비밀글</Label>
                </div>
            </div>
          </div>

          {/* Subject */}
           <div className="flex border-b border-gray-200">
             <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              제목
            </div>
            <div className="flex-1 p-2 flex items-center">
                <Input 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full max-w-2xl h-8 text-xs border-gray-300 rounded-[2px]" 
                />
            </div>
          </div>

          {/* Writer */}
           <div className="flex border-b border-gray-200">
             <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              작성자
            </div>
            <div className="flex-1 p-2 flex items-center">
                <Input 
                    value={formData.authorName}
                    onChange={(e) => setFormData({...formData, authorName: e.target.value})}
                    className="w-48 h-8 text-xs border-gray-300 rounded-[2px]" 
                />
            </div>
          </div>

          {/* Content */}
          <div className="flex border-b border-gray-200 min-h-[300px]">
             <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-start border-r border-gray-200 pt-32">
              내용
            </div>
            <div className="flex-1 p-2">
                <Textarea 
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full h-full min-h-[280px] text-xs border-gray-300 rounded-[2px] resize-none" 
                />
            </div>
          </div>
      </div>
       <div className="flex justify-center mt-8 gap-2">
            <Link href="/admin/boards/posts">
                <Button variant="outline" className="h-10 px-12 text-sm border-gray-300 text-gray-700 rounded-[2px] font-bold">
                    취소
                </Button>
            </Link>
          <Button onClick={handleSave} className="h-10 px-12 text-sm bg-[#555555] hover:bg-[#444444] text-white rounded-[2px] font-bold">
            저장
          </Button>
        </div>
    </div>
  );
}
