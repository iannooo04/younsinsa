"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HelpCircle, ChevronUp, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface CodeItem {
    id: number;
    codeNo: string;
    name: string;
    use: boolean;
}

// Moved outside component to avoid dependency issues
const jobItems: CodeItem[] = [
    { id: 1, codeNo: "01002001", name: "학생", use: true },
    { id: 2, codeNo: "01002002", name: "컴퓨터전문직", use: true },
    { id: 3, codeNo: "01002003", name: "회사원", use: true },
    { id: 4, codeNo: "01002004", name: "전업주부", use: true },
    { id: 5, codeNo: "01002005", name: "건축/토목", use: true },
    { id: 6, codeNo: "01002006", name: "금융업", use: true },
    { id: 7, codeNo: "01002007", name: "교수직", use: true },
    { id: 8, codeNo: "01002008", name: "공무원", use: true },
    { id: 9, codeNo: "01002009", name: "의료계", use: true },
    { id: 10, codeNo: "01002010", name: "법조계", use: true },
    { id: 11, codeNo: "01002011", name: "언론/출판", use: true },
    { id: 12, codeNo: "01002012", name: "자영업", use: true },
    { id: 13, codeNo: "01002013", name: "방송/연예/예술", use: true },
    { id: 14, codeNo: "01002014", name: "기타", use: true },
];

const interestItems: CodeItem[] = [
    { id: 101, codeNo: "01001001", name: "화장품/향수/미용품", use: true },
    { id: 102, codeNo: "01001002", name: "컴퓨터/SW", use: true },
    { id: 103, codeNo: "01001003", name: "의류/패션잡화", use: true },
    { id: 104, codeNo: "01001004", name: "생활/주방용품", use: true },
    { id: 105, codeNo: "01001005", name: "보석/시계/악세사리", use: true },
    { id: 106, codeNo: "01001006", name: "가전/카메라", use: true },
    { id: 107, codeNo: "01001007", name: "서적/음반/비디오", use: true },
];

export default function CodeManagementPage() {
    const searchParams = useSearchParams();

    const groupParam = searchParams.get('group') || 'job';

    const [category, setCategory] = useState("member");
    const [codeGroup, setCodeGroup] = useState(groupParam);
    
    // Arrays moved outside

    const [items, setItems] = useState<CodeItem[]>([]);

    useEffect(() => {
        if (codeGroup === 'job') {
            setItems(jobItems);
        } else if (codeGroup === 'interest') {
            setItems(interestItems);
        }
    }, [codeGroup]);

    const handleAddItem = () => {
        // Generic logic to add item based on current list
        const prefix = codeGroup === 'job' ? "010020" : "010010";
        const newItem = {
            id: Date.now(), // simple unique id
            codeNo: prefix + (items.length + 1).toString().padStart(2, '0'),
            name: "",
            use: true
        };
        setItems([...items, newItem]);
    };

    const handleDeleteItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleUsageChange = (id: number, val: boolean) => {
        setItems(items.map(item => item.id === id ? { ...item, use: val } : item));
    }

    const handleGroupChange = (val: string) => {
        setCodeGroup(val);
        // Update URL without refresh to keep state in sync if user refreshes
        // router.push(`?group=${val}`); // Optional: depends on if we want URL to reflect state always
    };

    return (
        <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
             {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">코드 관리</h1>
            </div>

            {/* Language Tabs */}
             <div className="flex items-center mb-6">
                 <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 border-b-white bg-white font-bold text-gray-800 text-xs">
                     <span className="w-4 h-4 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-[10px]">🇰🇷</span>
                     기준몰
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 border border-l-0 border-gray-200 bg-[#F9F9F9] text-gray-500 text-xs hover:bg-gray-50">
                      <div className="w-4 h-3 bg-red-500 relative">
                           <span className="absolute top-0 left-0 text-[6px] text-yellow-300 font-bold p-[1px]">★</span>
                      </div>
                 </button>
             </div>

            {/* Filter Section */}
             <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="font-bold text-base text-gray-800">코드 관리</h2>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
                 <div className="border-t border-gray-400 border-b border-gray-200 bg-[#FBFBFB] p-4 flex items-center gap-4">
                     <div className="flex items-center gap-2">
                         <span className="font-bold text-gray-700 w-16">구분</span>
                         <Select value={category} onValueChange={setCategory}>
                             <SelectTrigger className="w-40 h-8 bg-white border-gray-300 text-xs">
                                 <SelectValue placeholder="선택" />
                             </SelectTrigger>
                             <SelectContent>
                                 <SelectItem value="member">회원</SelectItem>
                             </SelectContent>
                         </Select>
                     </div>
                     <div className="flex items-center gap-2 ml-8">
                         <span className="font-bold text-gray-700 w-24">코드 그룹 선택</span>
                         <Select value={codeGroup} onValueChange={handleGroupChange}>
                             <SelectTrigger className="w-40 h-8 bg-white border-gray-300 text-xs">
                                 <SelectValue placeholder="선택" />
                             </SelectTrigger>
                             <SelectContent>
                                 <SelectItem value="job">직업</SelectItem>
                                 <SelectItem value="interest">관심분야</SelectItem>
                             </SelectContent>
                         </Select>
                     </div>
                 </div>
             </div>

             {/* Table Controls */}
             <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center gap-1">
                     <Button variant="outline" size="icon" className="h-7 w-7 rounded-[2px] border-gray-300 bg-white hover:bg-gray-50">
                         <ChevronDown className="w-3 h-3 text-gray-500" />
                     </Button>
                      <Button variant="outline" size="icon" className="h-7 w-7 rounded-[2px] border-gray-300 bg-white hover:bg-gray-50">
                         <ChevronDown className="w-3 h-3 text-gray-500 rotate-180" />
                     </Button>
                      <Button variant="outline" size="icon" className="h-7 w-7 rounded-[2px] border-gray-300 bg-white hover:bg-gray-50">
                         <ChevronUp className="w-3 h-3 text-gray-500" />
                     </Button>
                      <Button variant="outline" size="icon" className="h-7 w-7 rounded-[2px] border-gray-300 bg-white hover:bg-gray-50">
                         <ChevronUp className="w-3 h-3 text-gray-500 rotate-180" />
                     </Button>
                 </div>
             </div>

            {/* Data Table */}
            <div className="border-t border-gray-400">
                {/* Table Header */}
                 <div className="flex bg-[#A2A2A2] text-white font-medium text-center h-9 items-center text-xs">
                     <div className="w-16 border-r border-[#B5B5B5]">번호</div>
                     <div className="w-32 border-r border-[#B5B5B5]">코드번호</div>
                     <div className="flex-1 border-r border-[#B5B5B5]">항목명</div>
                     <div className="w-24 border-r border-[#B5B5B5]">사용설정</div>
                     <div className="w-24">추가/삭제</div>
                 </div>

                 {/* Table Body */}
                 <div className="bg-white text-xs">
                     {items.map((item, index) => (
                         <div key={item.id} className="flex items-center border-b border-gray-200 h-11 hover:bg-[#F9F9F9]">
                             <div className="w-16 text-center text-gray-600 border-r border-gray-200 h-full flex items-center justify-center">
                                 {index + 1}
                             </div>
                             <div className="w-32 text-center text-gray-600 border-r border-gray-200 h-full flex items-center justify-center">
                                 {item.codeNo}
                             </div>
                             <div className="flex-1 px-4 border-r border-gray-200 h-full flex items-center">
                                 <Input 
                                    value={item.name} 
                                    className="w-full h-7 border-gray-300 rounded-[2px] text-xs" 
                                    onChange={(e) => setItems(items.map(i => i.id === item.id ? { ...i, name: e.target.value } : i))}
                                 />
                             </div>
                             <div className="w-24 border-r border-gray-200 h-full flex items-center justify-center">
                                  <Select 
                                    value={item.use ? "use" : "unused"} 
                                    onValueChange={(val) => handleUsageChange(item.id, val === "use")}
                                  >
                                     <SelectTrigger className="w-16 h-7 text-[11px] border-gray-300 bg-white">
                                         <SelectValue />
                                     </SelectTrigger>
                                     <SelectContent>
                                         <SelectItem value="use">사용</SelectItem>
                                         <SelectItem value="unused">사용안함</SelectItem>
                                     </SelectContent>
                                 </Select>
                             </div>
                             <div className="w-24 h-full flex items-center justify-center">
                                 {index === 0 ? (
                                     <Button 
                                        variant="outline" 
                                        className="h-6 px-2 text-[11px] border-gray-300 text-gray-600 hover:bg-gray-50 rounded-[2px]"
                                        onClick={handleAddItem}
                                     >
                                         + 추가
                                     </Button>
                                 ) : (
                                     <Button 
                                        variant="outline" 
                                        className="h-6 px-2 text-[11px] border-gray-300 text-gray-600 hover:bg-gray-50 rounded-[2px]"
                                        onClick={() => handleDeleteItem(item.id)}
                                     >
                                         - 삭제
                                     </Button>
                                 )}
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
             <div className="h-12 bg-[#FBFBFB] border-b border-gray-200 mt-0 flex items-center justify-center gap-2">
                 <Button variant="outline" size="icon" className="h-7 w-7 rounded-[2px] border-gray-300 bg-white text-gray-400">
                     <ChevronUp className="w-3 h-3 rotate-90" />
                 </Button>
                  <Button variant="outline" size="icon" className="h-7 w-7 rounded-[2px] border-gray-300 bg-white text-gray-400">
                     <ChevronUp className="w-3 h-3 rotate-[270deg]" />
                 </Button>
                 <Button variant="outline" size="icon" className="h-7 w-7 rounded-[2px] border-gray-300 bg-white text-gray-400">
                     <ChevronUp className="w-3 h-3" />
                 </Button>
                  <Button variant="outline" size="icon" className="h-7 w-7 rounded-[2px] border-gray-300 bg-white text-gray-400">
                     <ChevronUp className="w-3 h-3 rotate-180" />
                 </Button>
             </div>

            {/* Bottom Actions - Save Button */}
            <div className="fixed bottom-6 right-6 z-50">
                 <Button className="h-10 px-8 text-sm bg-[#FF424D] hover:bg-[#FF424D]/90 text-white font-bold rounded-[2px] shadow-lg">
                    저장
                </Button>
            </div>
        </div>
    );
}
