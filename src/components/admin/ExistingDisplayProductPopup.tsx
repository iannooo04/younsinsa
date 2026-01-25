"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/ui-table";
import { Checkbox } from "@/components/ui/checkbox";

interface ExistingDisplayProductPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ExistingDisplayProductPopup({ isOpen, onClose }: ExistingDisplayProductPopupProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [mallType, setMallType] = useState("all");
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const mockData = [
        { id: 4, name: "New Arrivals", method: "수동진열", mallType: "PC쇼핑몰", date: "2025-12-02" },
        { id: 3, name: "Best Sellers", method: "수동진열", mallType: "PC쇼핑몰", date: "2025-12-02" },
        { id: 2, name: "New Arrivals", method: "수동진열", mallType: "모바일쇼핑몰", date: "2025-12-02" },
        { id: 1, name: "Best Sellers", method: "수동진열", mallType: "모바일쇼핑몰", date: "2025-12-02" },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-white p-0 overflow-hidden gap-0">
                <DialogHeader className="p-4 border-b border-gray-200">
                    <DialogTitle className="text-lg font-medium text-gray-900">기존 진열상품 선택</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-4">
                    {/* Search Section */}
                    <div className="border border-gray-200">
                        <div className="flex border-b border-gray-200">
                            <div className="w-32 bg-gray-50 flex items-center pl-4 text-xs font-bold text-gray-700 h-10">분류명</div>
                            <div className="flex-1 flex items-center p-1 px-2 gap-2">
                                <Input 
                                    className="h-7 text-xs flex-1 rounded-none border-gray-300"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button className="h-7 text-xs bg-[#555] hover:bg-[#444] text-white rounded-sm px-4">검색</Button>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-32 bg-gray-50 flex items-center pl-4 text-xs font-bold text-gray-700 h-10">쇼핑몰 유형</div>
                            <div className="flex-1 flex items-center p-1 px-2">
                                <RadioGroup value={mallType} onValueChange={setMallType} className="flex gap-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="all" id="popup-mall-all" className={mallType === 'all' ? "text-red-500 border-red-500" : ""} />
                                        <Label htmlFor="popup-mall-all" className="text-xs font-normal cursor-pointer">전체</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="pc" id="popup-mall-pc" className={mallType === 'pc' ? "text-red-500 border-red-500" : ""} />
                                        <Label htmlFor="popup-mall-pc" className="text-xs font-normal cursor-pointer">PC쇼핑몰</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="mobile" id="popup-mall-mobile" className={mallType === 'mobile' ? "text-red-500 border-red-500" : ""} />
                                        <Label htmlFor="popup-mall-mobile" className="text-xs font-normal cursor-pointer">모바일쇼핑몰</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="border-t border-gray-400">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#A4A4A4] hover:bg-[#A4A4A4] h-8 text-white">
                                    <TableHead className="w-12 text-center text-white font-normal p-0 h-8">선택</TableHead>
                                    <TableHead className="w-12 text-center text-white font-normal p-0 h-8">번호</TableHead>
                                    <TableHead className="text-center text-white font-normal h-8">분류명</TableHead>
                                    <TableHead className="w-24 text-center text-white font-normal h-8">진열방법</TableHead>
                                    <TableHead className="w-24 text-center text-white font-normal h-8">쇼핑몰 유형</TableHead>
                                    <TableHead className="w-24 text-center text-white font-normal h-8">등록일</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockData.map((item) => (
                                    <TableRow key={item.id} className="h-9 hover:bg-gray-50 border-b border-gray-200">
                                        <TableCell className="p-0 text-center">
                                            <Checkbox 
                                                checked={selectedId === item.id} 
                                                onCheckedChange={() => setSelectedId(selectedId === item.id ? null : item.id)}
                                                className="w-4 h-4 rounded-sm border-gray-300 translate-y-[2px]"
                                            />
                                        </TableCell>
                                        <TableCell className="p-0 text-center text-xs text-gray-600">{item.id}</TableCell>
                                        <TableCell className="p-0 pl-2 text-xs text-gray-600">{item.name}</TableCell>
                                        <TableCell className="p-0 text-center text-xs text-gray-600">{item.method}</TableCell>
                                        <TableCell className="p-0 text-center text-xs text-gray-600">{item.mallType}</TableCell>
                                        <TableCell className="p-0 text-center text-xs text-gray-600 tracking-tighter">{item.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-center pt-2">
                        <Button onClick={onClose} className="bg-[#666] hover:bg-[#555] text-white w-24 rounded-none h-9">
                            확인
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
