"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { useParams } from "next/navigation";

interface DecorationEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    simpleToolbar?: boolean;
}

export default function DecorationEditor({ value = "", onChange, simpleToolbar = false }: DecorationEditorProps) {
    const params = useParams();
    const [activeTab, setActiveTab] = useState<"EDITOR" | "HTML" | "TEXT">("EDITOR");

    const handlePhotoClick = () => {
        window.open(`/${params.locale}/popup/photo-attach`, 'PhotoAttachment', 'width=500,height=550');
    };

    return (
        <div className="border border-gray-300 bg-white">
            <div className="p-2">
                {/* Toolbar */}
                <div className="border border-gray-300 bg-gray-50 p-1 flex items-center gap-1 flex-wrap mb-2">
                    <select className="h-6 text-xs border border-gray-300 rounded-sm"><option>굴림</option></select>
                    <select className="h-6 text-xs border border-gray-300 rounded-sm"><option>9pt</option></select>
                    
                    {!simpleToolbar && (
                        <>
                            <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 font-bold">B</Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 italic">I</Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 underline">U</Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 line-through">S</Button>
                            <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-xs"><AlignLeft className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-xs"><AlignCenter className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-xs"><AlignRight className="w-4 h-4" /></Button>
                            <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-xs"><LinkIcon className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-xs"><ImageIcon className="w-4 h-4" /></Button>
                        </>
                    )}

                    {!simpleToolbar ? (
                         <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-1 ml-auto text-xs bg-white border border-gray-300 flex items-center gap-1"
                            onClick={handlePhotoClick}
                        >
                            <span className="w-3 h-3 bg-gray-400 rounded-full"></span> 사진
                        </Button>
                    ) : (
                        <>
                            <div className="flex-1"></div>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-1 text-xs bg-white border border-gray-300 flex items-center gap-1"
                                onClick={handlePhotoClick}
                            >
                                <span className="w-3 h-3 bg-gray-400 rounded-full"></span> 사진
                            </Button>
                        </>
                    )}
                </div>

                {/* Editor Content Area */}
                <div className="border border-gray-300 min-h-[300px] relative bg-white">
                    {activeTab === "EDITOR" && (
                        <div className="w-full h-full min-h-[300px] p-2 outline-none" contentEditable>
                            {/* Visual Editor Content */}
                        </div>
                    )}
                     {activeTab === "HTML" && (
                        <textarea 
                            className="w-full h-full min-h-[300px] p-2 outline-none resize-none font-mono text-xs" 
                            placeholder="HTML source code..." 
                            value={value}
                            onChange={(e) => onChange?.(e.target.value)}
                        />
                    )}
                     {activeTab === "TEXT" && (
                        <textarea 
                            className="w-full h-full min-h-[300px] p-2 outline-none resize-none text-xs" 
                            placeholder="Plain text content..." 
                            value={value}
                            onChange={(e) => onChange?.(e.target.value)}
                        />
                    )}

                    {/* Resize Handle (Visual only) */}
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-100 border-t border-gray-300 flex items-center justify-center text-[10px] text-gray-500 cursor-ns-resize">
                        아래 영역을 드래그하여 입력창 크기를 조절할 수 있습니다. <X className="w-3 h-3 ml-auto mr-2 cursor-pointer" />
                    </div>
                    
                    {/* Tabs */}
                    <div className="absolute bottom-[-24px] right-0 flex border border-gray-300 bg-white">
                        <button 
                            onClick={() => setActiveTab("EDITOR")}
                            className={`px-2 py-0.5 text-[10px] border-r border-gray-300 ${activeTab === "EDITOR" ? "bg-gray-50 font-bold" : "bg-white text-gray-500"}`}
                        >
                            Editor
                        </button>
                        <button 
                            onClick={() => setActiveTab("HTML")}
                            className={`px-2 py-0.5 text-[10px] border-r border-gray-300 ${activeTab === "HTML" ? "bg-gray-50 font-bold" : "bg-white text-gray-500"}`}
                        >
                            HTML
                        </button>
                        <button 
                            onClick={() => setActiveTab("TEXT")}
                            className={`px-2 py-0.5 text-[10px] ${activeTab === "TEXT" ? "bg-gray-50 font-bold" : "bg-white text-gray-500"}`}
                        >
                            TEXT
                        </button>
                    </div>
                </div>
                <div className="mt-8 text-center text-[10px] text-gray-400 border-t border-gray-200 cursor-ns-resize">
                    ▴ 입력창 크기 조절
                </div>
            </div>
        </div>
    );
}
