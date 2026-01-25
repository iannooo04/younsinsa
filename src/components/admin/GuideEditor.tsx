"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import TipTapEditor from "@/components/ui/TipTapEditor";

interface Props {
    content: string;
    onChange: (value: string) => void;
    onPhotoClick: () => void;
}

export default function GuideEditor({ content, onChange, onPhotoClick }: Props) {
    const [activeMode, setActiveMode] = useState<'editor' | 'html' | 'text'>('editor');

    return (
        <div className="border border-gray-300">
            {/* Toolbar */}
            <div className="bg-[#f0f0f0] border-b border-gray-300 p-1 flex items-center gap-1 flex-wrap">
                <select className="select select-xs h-6 min-h-0 bg-white border border-gray-400 rounded-none text-xs w-16"><option>굴림</option></select>
                <select className="select select-xs h-6 min-h-0 bg-white border border-gray-400 rounded-none text-xs w-12"><option>9pt</option></select>
                <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                {['B', 'I', 'U', 'S'].map(t => <button key={t} type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs font-bold hover:bg-gray-100">{t}</button>)}
                <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                {['Left', 'Center', 'Right', 'Justify'].map(t => <button key={t} type="button" className="w-6 h-6 bg-white border border-gray-300 text-xs hover:bg-gray-100">≡</button>)}
                <div className="w-[1px] h-4 bg-gray-400 mx-1"></div>
                <button 
                    type="button" 
                    onClick={onPhotoClick}
                    className="px-2 h-6 bg-white border border-gray-300 text-xs flex items-center gap-1 hover:bg-gray-100 ml-auto"
                >
                    📷 사진
                </button>
            </div>
            
            {/* Content */}
            <div className="relative">
                <input type="hidden" name="description_guide" value={content} />
                
                {activeMode === 'editor' && (
                    <TipTapEditor 
                        content={content} 
                        onChange={onChange}
                    />
                )}
                
                {activeMode === 'html' && (
                    <textarea 
                        className="w-full h-64 p-4 outline-none resize-none border-b border-gray-300 font-mono text-xs leading-relaxed text-gray-800"
                        value={content}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="HTML 코드를 입력하세요."
                    />
                )}
                
                {activeMode === 'text' && (
                    <textarea 
                        className="w-full h-64 p-4 outline-none resize-none border-b border-gray-300 text-xs leading-relaxed text-gray-800 font-sans"
                        value={content.replace(/<[^>]*>?/gm, '')} 
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="텍스트를 입력하세요."
                    />
                )}
                
                 {/* Resize Handle Overlay */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#fffce5] border border-gray-300 px-3 py-1 text-[11px] text-gray-600 shadow-sm flex items-center gap-2">
                    아래 영역을 드래그하여 입력창 크기를 조절할 수 있습니다.
                    <button className="text-gray-400 hover:text-gray-600"><X size={12}/></button>
                </div>

                {/* Bottom Bar */}
                 <div className="bg-[#f2f2f2] border-t border-gray-300 flex justify-between items-center h-6 px-1">
                    <div className="flex-1 text-center cursor-ns-resize">
                         <span className="text-[10px] text-gray-500">↕ 입력창 크기조절</span>
                    </div>
                    <div className="flex bg-white border border-gray-300">
                        <button 
                            type="button" 
                            onClick={() => setActiveMode('editor')}
                            className={`px-2 py-0.5 text-[10px] font-bold border-r border-gray-300 ${activeMode === 'editor' ? 'bg-gray-100' : ''}`}
                        >
                            Editor
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setActiveMode('html')}
                            className={`px-2 py-0.5 text-[10px] border-r border-gray-300 ${activeMode === 'html' ? 'bg-gray-100 font-bold' : ''}`}
                        >
                            HTML
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setActiveMode('text')}
                            className={`px-2 py-0.5 text-[10px] ${activeMode === 'text' ? 'bg-gray-100 font-bold' : ''}`}
                        >
                            TEXT
                        </button>
                    </div>
                 </div>
            </div>
        </div>
    );
}
