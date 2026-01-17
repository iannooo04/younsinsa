"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { createFaqAction } from "@/actions/board-faq-actions";

export default function FaqCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    mallId: "KR",
    category: "delivery",
    question: "",
    answer: "",
    isBest: false
  });

  const handleSave = async () => {
    if (!formData.question) return toast.error("질문을 입력해주세요.");
    if (!formData.answer) return toast.error("답변을 입력해주세요.");

    setLoading(true);
    const res = await createFaqAction({
        mallId: formData.mallId,
        category: formData.category,
        question: formData.question,
        answer: formData.answer,
        isBest: formData.isBest
    });

    if (res.success) {
        toast.success("FAQ가 등록되었습니다.");
        router.push("/admin/boards/faq");
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
            <Link href="/admin/boards/faq">
                <Button variant="ghost" size="icon" className="h-8 w-8 -ml-2">
                    <ArrowLeft className="w-4 h-4" />
                </Button>
            </Link>
          <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">FAQ 등록</h1>
        </div>
        <Button onClick={handleSave} disabled={loading} className="h-10 px-8 text-base bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
          저장
        </Button>
      </div>

      <div className="border-t border-gray-400">
          {/* Mall ID */}
          <div className="flex border-b border-gray-200">
            <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              상점
            </div>
            <div className="flex-1 p-2 flex items-center">
               <RadioGroup value={formData.mallId} onValueChange={(v) => setFormData({...formData, mallId: v})} className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="KR" id="skin-base" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 text-red-500 focus:ring-red-500 w-4 h-4" />
                  <Label htmlFor="skin-base" className="text-gray-700 cursor-pointer text-xs font-normal flex items-center gap-1">
                    <span className="text-sm">🇰🇷</span> 기준몰
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="CN" id="skin-cn" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 text-red-500 focus:ring-red-500 w-4 h-4" />
                  <Label htmlFor="skin-cn" className="text-gray-700 cursor-pointer text-xs font-normal flex items-center gap-1">
                    <span className="text-sm">🇨🇳</span> 중문몰
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Category */}
          <div className="flex border-b border-gray-200">
             <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              카테고리
            </div>
            <div className="flex-1 p-2 flex items-center">
                 <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                    <SelectTrigger className="w-64 h-8 text-xs border-gray-300 bg-white rounded-[2px]">
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="delivery">배송</SelectItem>
                    <SelectItem value="return">반품/교환</SelectItem>
                    <SelectItem value="member">회원불편</SelectItem>
                    <SelectItem value="etc">기타</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>

           {/* Type (Best) */}
           <div className="flex border-b border-gray-200">
             <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              유형
            </div>
            <div className="flex-1 p-2 flex items-center gap-1.5">
                <Checkbox 
                    id="isBest" 
                    className="w-3.5 h-3.5 border-gray-300 rounded-[2px]"
                    checked={formData.isBest}
                    onCheckedChange={(c) => setFormData({...formData, isBest: c === true})}
                />
                <Label htmlFor="isBest" className="text-gray-700 font-normal cursor-pointer">베스트 FAQ로 설정</Label>
            </div>
          </div>

          {/* Question */}
           <div className="flex border-b border-gray-200">
             <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
              질문
            </div>
            <div className="flex-1 p-2 flex items-center">
                <Input 
                    value={formData.question}
                    onChange={(e) => setFormData({...formData, question: e.target.value})}
                    className="w-full max-w-3xl h-8 text-xs border-gray-300 rounded-[2px]" 
                />
            </div>
          </div>

          {/* Answer */}
          <div className="flex border-b border-gray-200 min-h-[300px]">
             <div className="w-32 bg-[#FBFBFB] p-3 pl-4 font-normal text-gray-700 flex items-start border-r border-gray-200 pt-32">
              답변
            </div>
            <div className="flex-1 p-2">
                <Textarea 
                    value={formData.answer}
                    onChange={(e) => setFormData({...formData, answer: e.target.value})}
                    className="w-full h-full min-h-[280px] text-xs border-gray-300 rounded-[2px] resize-none" 
                />
            </div>
          </div>
      </div>
       <div className="flex justify-center mt-8 gap-2">
            <Link href="/admin/boards/faq">
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
