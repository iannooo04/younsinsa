"use client";

import React, { useState, useRef, DragEvent } from "react";
import { X, ImagePlus } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (files: File[]) => void;
}

export default function PhotoAttachmentPopup({ isOpen, onClose, onConfirm }: Props) {
    const [uploadMode, setUploadMode] = useState<"drag" | "file">("drag");
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
            addFiles(newFiles);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            addFiles(newFiles);
        }
    };

    const addFiles = (newFiles: File[]) => {
        // Limit to 10 files total
        setFiles(prev => {
            const combined = [...prev, ...newFiles];
            return combined.slice(0, 10);
        });
    };

    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-[500px] shadow-lg rounded-sm overflow-hidden font-sans">
                {/* Header */}
                <div className="bg-[#f2f2f2] px-4 py-3 border-b border-gray-300 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 text-sm">사진 첨부하기</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 text-sm">
                    {/* Mode Selection */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-gray-800">업로드방식 선택 :</span>
                        <label className="flex items-center gap-1 cursor-pointer">
                            <input 
                                type="radio" 
                                name="uploadMode" 
                                className="radio radio-xs checked:bg-red-500" 
                                checked={uploadMode === "drag"} 
                                onChange={() => setUploadMode("drag")}
                            />
                            <span>드래그</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                            <input 
                                type="radio" 
                                name="uploadMode" 
                                className="radio radio-xs checked:bg-red-500" 
                                checked={uploadMode === "file"} 
                                onChange={() => setUploadMode("file")}
                            />
                            <span>파일업로드</span>
                        </label>
                    </div>

                    <div className="mb-4 text-xs text-gray-600 leading-relaxed">
                        - 브라우저 보안등급/호환성 문제로 드래그방식이 지원되지 않을 경우,<br/>
                        파일업로드방식으로 첨부가 가능합니다.
                    </div>

                    {/* Status Line */}
                    <div className="flex items-center gap-1 mb-2 font-bold text-sm">
                        <span className="text-green-600">{files.length}장</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-600">10장</span>
                        <span className="text-gray-300 mx-1">|</span>
                        <span className="text-green-600">{totalSizeMB}MB</span>
                    </div>

                    {/* Drop Area */}
                    <div 
                        className="w-full h-40 border border-gray-200 bg-[#fbfbfb] flex flex-col items-center justify-center mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            className="hidden" 
                            multiple 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {files.length === 0 ? (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                <ImagePlus size={40} strokeWidth={1} className="text-green-500 fill-green-50" />
                                <span className="text-gray-400">마우스로 드래그해서 이미지를 추가해주세요.</span>
                            </div>
                        ) : (
                            <div className="w-full h-full p-2 grid grid-cols-5 gap-2 overflow-y-auto">
                                {files.map((file, idx) => (
                                    <div key={idx} className="relative aspect-square bg-gray-200 group">
                                         {/* Simple preview or placeholder */}
                                         <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500 break-all p-1 text-center bg-white border">
                                            {file.name}
                                         </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer Info */}
                    <div className="text-xs text-gray-500 border-t border-gray-100 pt-3">
                        <p className="mb-1">
                            <span className="text-green-600 font-bold">한 장당 최대 5MB</span>의 이미지 파일을
                        </p>
                        <p>등록할 수 있습니다. (JPG, GIF, PNG, BMP, JPG, TIFF, SVG)</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-1 pb-5">
                    <button 
                        onClick={() => onConfirm(files)}
                        className="w-16 h-8 bg-white border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-50"
                    >
                        확인
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-16 h-8 bg-white border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-50"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}
