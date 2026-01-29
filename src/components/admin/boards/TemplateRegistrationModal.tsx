"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Bold, AlignLeft, AlignCenter, AlignRight,
  Link as LinkIcon, Image as ImageIcon, Code, MoreVertical, Type
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface TemplateRegistrationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TemplateRegistrationModal({ open, onOpenChange }: TemplateRegistrationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[800px] p-0 gap-0 border-0 rounded-[8px] overflow-hidden flex flex-col">
        <DialogHeader className="px-5 py-4 border-b border-gray-200 flex flex-row items-center justify-between m-0">
            <DialogTitle className="text-base font-bold text-gray-900">게시글 양식 등록</DialogTitle>
        </DialogHeader>
        
        <div className="p-5 flex flex-col gap-0 bg-white">
             {/* Classification */}
             <div className="flex border-t border-gray-200">
                <div className="w-[120px] bg-[#FBFBFB] p-3 pl-4 flex items-center border-r border-gray-200 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-700">분류</span>
                </div>
                <div className="flex-1 p-3 flex items-center border-b border-gray-200 px-4">
                    <RadioGroup defaultValue="mall" className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="mall" id="tm-mall" className="border-gray-300 w-4 h-4 text-gray-900" />
                            <Label htmlFor="tm-mall" className="font-normal text-xs text-gray-700 cursor-pointer">쇼핑몰 게시글 양식</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="admin" id="tm-admin" className="border-gray-300 w-4 h-4 text-gray-900" />
                            <Label htmlFor="tm-admin" className="font-normal text-xs text-gray-700 cursor-pointer">관리자 게시글 양식</Label>
                        </div>
                    </RadioGroup>
                </div>
             </div>

             {/* Title */}
             <div className="flex">
                <div className="w-[120px] bg-[#FBFBFB] p-3 pl-4 flex items-center border-r border-gray-200 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-700"><span className="text-red-500 mr-1">*</span>제목</span>
                </div>
                <div className="flex-1 p-3 flex items-center border-b border-gray-200 px-4">
                    <Input className="h-8 text-xs border-gray-300 w-full" />
                </div>
             </div>

             {/* Content */}
             <div className="flex h-[450px]">
                <div className="w-[120px] bg-[#FBFBFB] p-3 pl-4 flex items-start pt-4 border-r border-gray-200 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-700"><span className="text-red-500 mr-1">*</span>내용</span>
                </div>
                <div className="flex-1 p-4 border-b border-gray-200 flex flex-col">
                    {/* Editor Toolbar */}
                    <div className="border border-gray-200 rounded-t-sm border-b-0 p-2 flex items-center gap-1 bg-white">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-gray-600 hover:bg-gray-100"><Type size={16} /><span className="ml-1 text-[10px]">▼</span></Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-gray-600 hover:bg-gray-100"><span className="text-xs">A</span><span className="text-[10px]">▼</span></Button>
                        <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:bg-gray-100"><Bold size={16} /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:bg-gray-100"><span className="font-bold text-sm">A</span><span className="text-[10px] align-top text-red-500 ml-[1px]">●</span></Button>
                        <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:bg-gray-100"><AlignLeft size={16} /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:bg-gray-100"><AlignCenter size={16} /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:bg-gray-100"><AlignRight size={16} /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:bg-gray-100"><span className="text-xs font-serif">¶</span><span className="text-[10px]">▼</span></Button>
                        <div className="flex-1"></div>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:bg-gray-100"><LinkIcon size={16} /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:bg-gray-100"><ImageIcon size={16} /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:bg-gray-100"><Code size={16} /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:bg-gray-100"><MoreVertical size={16} /></Button>
                    </div>
                    
                    {/* Editor Content Area */}
                    <div className="border border-gray-200 flex-1 p-4 bg-white relative">
                        <textarea 
                            className="w-full h-full resize-none border-0 focus:ring-0 p-0 text-sm text-gray-600 placeholder:text-gray-300 font-sans leading-relaxed"
                            placeholder="내용을 입력하세요."
                        />
                    </div>
                    
                    {/* Editor Status Bar */}
                    <div className="border border-gray-200 border-t-0 rounded-b-sm bg-white p-2 px-3 flex justify-end text-[11px] text-gray-400 gap-3">
                        <span>Words : 0</span>
                        <span>문자 : 0</span>
                    </div>
                </div>
             </div>
        </div>

        <DialogFooter className="mr-0 p-4 pt-2 border-t border-gray-100 bg-white flex justify-end gap-1">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="h-8 px-4 text-xs border-gray-300 text-gray-600 font-bold rounded-[2px] bg-white hover:bg-gray-50">취소</Button>
            <Button className="h-8 px-4 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold rounded-[2px] border-0 box-border">저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
