"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ImagePlus } from "lucide-react";

export default function PhotoAttachPopup() {
    const [uploadMethod, setUploadMethod] = useState("drag");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleConfirm = () => {
        // Mock save logic or message to opener
        window.close();
    };

    const handleCancel = () => {
        window.close();
    };

    return (
        <div className="flex flex-col h-screen bg-white text-sm font-sans">
            {/* Header */}
            <header className="h-10 bg-[#F5F5F5] border-b border-[#E5E5E5] px-4 flex items-center">
                <h1 className="font-bold text-gray-700">사진 첨부하기</h1>
            </header>

            {/* Content */}
            <div className="flex-1 p-5">
                {/* Method Selection */}
                <div className="flex items-center gap-4 mb-4">
                    <span className="font-bold text-gray-800">업로드방식 선택 :</span>
                    <RadioGroup 
                        value={uploadMethod} 
                        onValueChange={setUploadMethod} 
                        className="flex items-center gap-4"
                    >
                        <div className="flex items-center gap-1">
                            <RadioGroupItem value="drag" id="drag" className="text-[#FF424D] border-gray-400" />
                            <Label htmlFor="drag" className="font-normal cursor-pointer">드래그</Label>
                        </div>
                        <div className="flex items-center gap-1">
                            <RadioGroupItem value="file" id="file" className="border-gray-400" />
                            <Label htmlFor="file" className="font-normal cursor-pointer">파일업로드</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Notice */}
                <div className="text-gray-500 text-xs mb-4 leading-relaxed">
                    - 브라우저 보안등급/호환성 문제로 드래그방식이 지원되지 않을 경우,<br />
                    파일업로드방식으로 첨부가 가능합니다.
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 mb-2 text-xs font-bold">
                    <span className="text-[#00C73C]">0장</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-600">10장</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-[#00C73C]">0MB</span>
                </div>

                {/* Dropzone Area */}
                <div 
                    className="border border-[#E5E5E5] h-[200px] flex flex-col items-center justify-center bg-white mb-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    onDoubleClick={() => fileInputRef.current?.click()}
                >
                    <div className="flex flex-col items-center gap-2 text-gray-400 select-none">
                        <ImagePlus size={40} className="text-[#E5E5E5] fill-[#F5F5F5]" />
                        <span>마우스로 드래그해서 이미지를 추가해주세요.</span>
                        <span className="text-xs text-gray-300">(더블클릭하여 파일 선택)</span>
                    </div>
                </div>
                <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    multiple
                    accept="image/jpeg,image/gif,image/png,image/bmp,image/tiff,image/svg+xml"
                    onChange={(e) => {
                        // Handle file selection
                        console.log("Files selected:", e.target.files);
                    }}
                />

                {/* Footer Info */}
                <div className="text-xs text-gray-500">
                    <span className="text-[#00C73C] font-bold">한 장당 최대 5MB</span>의 이미지 파일을<br />
                    등록할 수 있습니다. (JPG, GIF, PNG, BMP, JPG, TIFF, SVG)
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="h-12 border-t border-[#E5E5E5] flex items-center justify-center gap-2 bg-white">
                <Button 
                    onClick={handleConfirm}
                    className="w-16 h-8 bg-white border border-[#D5D5D5] text-gray-700 hover:bg-gray-50 rounded-sm text-xs font-normal shadow-sm"
                >
                    확인
                </Button>
                <Button 
                    onClick={handleCancel}
                    className="w-16 h-8 bg-white border border-[#D5D5D5] text-gray-700 hover:bg-gray-50 rounded-sm text-xs font-normal shadow-sm"
                >
                    취소
                </Button>
            </div>
        </div>
    );
}
