"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";


import { cn } from "@/lib/utils";

interface MemberGradeSelectorProps {
    disabled?: boolean;
    value?: string[];
    onChange?: (value: string[]) => void;
    className?: string;
}

export function MemberGradeSelector({ disabled, value = [], onChange, className }: MemberGradeSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    // Mock data for grades
    const grades = [
        { id: 'normal', label: '일반회원' },
        // Add more mock grades if needed
    ];
    // TODO:
    // - [x] Fix syntax error
    // - [/] Verify UI
    const toggleOpen = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (id: string, checked: boolean) => {
        if (!onChange) return;
        if (checked) {
            onChange([...value, id]);
        } else {
            onChange(value.filter(v => v !== id));
        }
    };

    const handleSelectAll = (checked: boolean) => {
        if (!onChange) return;
        if (checked) {
            onChange(grades.map(g => g.id));
        } else {
            onChange([]);
        }
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={cn("relative w-full max-w-sm", className)} ref={containerRef}>
            <div 
                className={cn(
                    "flex items-center w-full h-8 border rounded-[2px] bg-white px-3 gap-2 transition-colors",
                    disabled ? "bg-gray-50 border-gray-200 cursor-not-allowed" : "border-gray-500 cursor-pointer hover:border-gray-600",
                    isOpen && "border-gray-900 ring-1 ring-gray-900"
                )}
                onClick={toggleOpen}
            >
                <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <input 
                    type="text"
                    className="flex-1 min-w-0 bg-transparent border-none text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed"
                    placeholder="회원등급 선택/검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={disabled}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={() => {
                        if (!disabled && !isOpen) setIsOpen(true);
                    }}
                />
                <div className="w-[1px] h-3 bg-gray-300 mx-1"></div>
                <button 
                    type="button"
                    className="flex items-center gap-1 text-xs text-[#3b82f6] font-medium shrink-0 hover:text-blue-700"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Logic for "All" button
                    }}
                >
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isOpen ? "rotate-180" : "")} />
                    전체
                </button>
            </div>

            {isOpen && !disabled && (
                <div className="absolute top-full left-0 mt-1 w-[300px] bg-white border border-gray-200 rounded-[8px] shadow-lg z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-2 max-h-48 overflow-y-auto space-y-1">
                        {grades.map((grade) => (
                            <div key={grade.id} className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded-sm cursor-pointer" onClick={() => handleSelect(grade.id, !value.includes(grade.id))}>
                                <div className={cn(
                                    "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                                    value.includes(grade.id) ? "bg-gray-900 border-gray-900" : "border-gray-300 bg-white"
                                )}>
                                    {value.includes(grade.id) && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className="text-xs text-gray-700">{grade.label}</span>
                            </div>
                        ))}
                        {grades.length === 0 && (
                            <div className="text-center py-4 text-xs text-gray-400">검색 결과가 없습니다.</div>
                        )}
                    </div>
                    
                    <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-white">
                        <button 
                            type="button" 
                            className="text-xs text-blue-600 hover:underline font-medium underline-offset-2"
                            onClick={() => handleSelectAll(true)}
                        >
                            전체 선택
                        </button>
                        <Button 
                            size="sm" 
                            className="h-8 px-4 text-xs bg-[#404040] hover:bg-[#333333] text-white rounded-[4px] font-normal"
                            onClick={() => setIsOpen(false)}
                        >
                            선택 완료
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
