/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  Info,
  ChevronDown,
  ChevronsUp,
  ChevronsDown
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import {
    getMemberGradeSettingsAction,
    updateMemberGradeSettingsAction,
    getUserGradesAction,
    deleteUserGradesAction,
    updateUserGradeOrderAction
} from "@/actions/user-grade-actions";

export default function MemberGradePage() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>({
      gradeDisplayName: "등급",
      couponEvalDone: false,
      couponGradeChangeOnly: false,
      couponManualEdit: false,
      couponExcelUpdate: false,
      couponExcelChangeOnly: false
  });
  const [grades, setGrades] = useState<any[]>([]);
  const [selectedGradeIds, setSelectedGradeIds] = useState<Set<string>>(new Set());

  useEffect(() => {
      loadData();
  }, []);

  async function loadData() {
      setLoading(true);
      try {
          const [settingsRes, gradesRes] = await Promise.all([
              getMemberGradeSettingsAction(),
              getUserGradesAction()
          ]);

          if (settingsRes.success && settingsRes.settings) {
              setSettings(settingsRes.settings);
          }
          if (gradesRes.success && gradesRes.grades) {
              setGrades(gradesRes.grades);
          }
      } catch {
          toast.error("데이터를 불러오는 중 오류가 발생했습니다.");
      }
      setLoading(false);
  }

  // --- Settings Handlers ---

  const handleDisplayNameChange = async () => {
      if (!settings) return;
      const res = await updateMemberGradeSettingsAction({ gradeDisplayName: settings.gradeDisplayName });
      if (res.success) {
          toast.success("노출이름이 변경되었습니다.");
      } else {
          toast.error(res.error || "변경 실패");
      }
  };

  const handleSettingsSave = async () => {
      if (!settings) return;
      // Filter only settings fields
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, basicPolicyId, ...data } = settings;
      const res = await updateMemberGradeSettingsAction(data);
       if (res.success) {
          toast.success("설정이 저장되었습니다.");
      } else {
          toast.error(res.error || "저장 실패");
      }
  };

  const updateSetting = (key: string, value: any) => {
      setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  // --- Grade List Handlers ---

  const toggleSelect = (id: string) => {
      const next = new Set(selectedGradeIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setSelectedGradeIds(next);
  };

  const toggleSelectAll = () => {
      if (selectedGradeIds.size === grades.length) {
          setSelectedGradeIds(new Set());
      } else {
          setSelectedGradeIds(new Set(grades.map(g => g.id)));
      }
  };

  const handleDelete = async () => {
      if (selectedGradeIds.size === 0) {
          toast.warning("삭제할 등급을 선택해주세요.");
          return;
      }
      if (!confirm("선택한 등급을 삭제하시겠습니까?")) return;

      const res = await deleteUserGradesAction(Array.from(selectedGradeIds));
      if (res.success) {
          toast.success("삭제되었습니다.");
          setSelectedGradeIds(new Set());
          loadData(); // Reload to refresh list
      } else {
          toast.error(res.error || "삭제 실패");
      }
  };

  // --- Ordering ---
  const moveSelected = (direction: 'top' | 'up' | 'down' | 'bottom') => {
        if (selectedGradeIds.size === 0) return;
        
        let newGrades = [...grades];
        // Sort selected indices to handle moving correctly
        const selectedIndices = newGrades
            .map((g, i) => selectedGradeIds.has(g.id) ? i : -1)
            .filter(i => i !== -1)
            .sort((a, b) => a - b);
        
        if (selectedIndices.length === 0) return;

        if (direction === 'up') {
            for (const idx of selectedIndices) {
                if (idx > 0 && !selectedGradeIds.has(newGrades[idx-1].id)) {
                    // Swap
                    [newGrades[idx], newGrades[idx-1]] = [newGrades[idx-1], newGrades[idx]];
                }
            }
        } else if (direction === 'down') {
            for (const idx of selectedIndices.reverse()) {
                 if (idx < newGrades.length - 1 && !selectedGradeIds.has(newGrades[idx+1].id)) {
                    // Swap
                    [newGrades[idx], newGrades[idx+1]] = [newGrades[idx+1], newGrades[idx]];
                }
            }
        } else if (direction === 'top') {
             const selectedItems = newGrades.filter(g => selectedGradeIds.has(g.id));
             const unselectedItems = newGrades.filter(g => !selectedGradeIds.has(g.id));
             newGrades = [...selectedItems, ...unselectedItems];
        } else if (direction === 'bottom') {
             const selectedItems = newGrades.filter(g => selectedGradeIds.has(g.id));
             const unselectedItems = newGrades.filter(g => !selectedGradeIds.has(g.id));
             newGrades = [...unselectedItems, ...selectedItems];
        }

        setGrades(newGrades);
  };

  const handleOrderSave = async () => {
      const orderItems = grades.map((g, index) => ({ id: g.id, orderIndex: index + 1 }));
      const res = await updateUserGradeOrderAction(orderItems);
      if (res.success) {
          toast.success("등급 순서가 저장되었습니다.");
      } else {
          toast.error(res.error || "순서 저장 실패");
      }
  };


  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">회원 등급 관리</h1>
        {/* Placeholder for create button - assuming separate page or modal not implemented yet */}
        <Button variant="outline" className="h-9 px-4 text-xs bg-white text-[#FF424D] border-[#FF424D] hover:bg-red-50 rounded-sm font-bold flex items-center gap-1">
            <span className="text-lg leading-none mb-0.5">+</span> 회원등급 등록
        </Button>
      </div>

      {/* Grade Display Name Change */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">회원등급 노출이름 변경</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200 bg-[#FBFBFB] flex items-center">
            <div className="w-48 p-4 pl-4 font-bold text-gray-700 text-xs text-left">
                쇼핑몰페이지 노출이름
            </div>
            <div className="flex-1 p-3 bg-white border-l border-gray-200">
                <div className="flex items-center gap-1">
                     <Input 
                        className="w-48 h-7 text-xs border-gray-300 rounded-sm" 
                        value={settings.gradeDisplayName} 
                        onChange={(e) => updateSetting('gradeDisplayName', e.target.value)}
                     />
                     <Button onClick={handleDisplayNameChange} variant="secondary" className="h-7 px-3 text-[11px] bg-white border border-gray-300 text-gray-600 rounded-[2px] hover:bg-gray-50">변경</Button>
                </div>
            </div>
        </div>
      </div>

       {/* Coupon Benefit Settings */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-2 mb-2">
           <div className="flex items-center gap-2">
                <h2 className="font-bold text-base text-gray-800">회원등급 쿠폰 혜택 설정</h2>
                <HelpCircle className="w-4 h-4 text-gray-400" />
           </div>
           <Button onClick={handleSettingsSave} className="h-7 px-4 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
                저장
           </Button>
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200 flex">
            <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex flex-col justify-center text-xs border-r border-gray-200">
                <span className="mb-1">쿠폰 혜택 지급 시</span>
                <span>쿠폰 발급 시점 설정</span>
            </div>
            <div className="flex-1 p-4 bg-white">
                <div className="space-y-2">
                     <div className="flex items-center gap-1.5">
                        <Checkbox 
                            id="eval-done" 
                            className="border-gray-300 rounded-[2px]" 
                            checked={settings.couponEvalDone}
                            onCheckedChange={(c) => updateSetting('couponEvalDone', c)}
                        />
                        <Label htmlFor="eval-done" className="text-gray-600 font-normal cursor-pointer text-xs">회원등급 평가 완료 시 발급</Label>
                        <span className="text-gray-400">(</span>
                        <Checkbox 
                            id="grade-change-only" 
                            className="border-gray-300 rounded-[2px]" 
                            checked={settings.couponGradeChangeOnly}
                            onCheckedChange={(c) => updateSetting('couponGradeChangeOnly', c)}
                            disabled={!settings.couponEvalDone}
                        />
                        <Label htmlFor="grade-change-only" className={`font-normal text-xs ${!settings.couponEvalDone ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 cursor-pointer'}`}>등급 변경 시에만 발급</Label>
                        <span className="text-gray-400">)</span>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox 
                            id="manual-edit" 
                            className="border-gray-300 rounded-[2px]" 
                            checked={settings.couponManualEdit}
                            onCheckedChange={(c) => updateSetting('couponManualEdit', c)}
                        />
                        <Label htmlFor="manual-edit" className="text-gray-600 font-normal cursor-pointer text-xs">회원등급을 직접 수정 시 발급</Label>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <Checkbox 
                            id="excel-update" 
                            className="border-gray-300 rounded-[2px]" 
                            checked={settings.couponExcelUpdate}
                            onCheckedChange={(c) => updateSetting('couponExcelUpdate', c)}
                        />
                        <Label htmlFor="excel-update" className="text-gray-600 font-normal cursor-pointer text-xs">회원 엑셀 업호드로 회원등급 업데이트 시 발급</Label>
                         <span className="text-gray-400">(</span>
                        <Checkbox 
                            id="excel-change-only" 
                            className="border-gray-300 rounded-[2px]" 
                            checked={settings.couponExcelChangeOnly}
                            onCheckedChange={(c) => updateSetting('couponExcelChangeOnly', c)}
                            disabled={!settings.couponExcelUpdate}
                        />
                        <Label htmlFor="excel-change-only" className={`font-normal text-xs ${!settings.couponExcelUpdate ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 cursor-pointer'}`}>등급변경 시에만 발급</Label>
                        <span className="text-gray-400">)</span>
                    </div>
                     <p className="text-[11px] text-[#888888] flex items-start gap-1 mt-2">
                         <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                         '회원등급 평가 완료 시 발급' 설정 시 수동 발급은 [회원등급 수동평가] 버튼 클릭 시, 자동 발급은 등급 평가일에 쿠폰이 발급됩니다.
                    </p>
                    <p className="text-[11px] text-[#888888] flex items-start gap-1">
                         <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                         '등급 변경 시에만 발급' 체크를 하면, 해당 이벤트 발생 시 회원등급이 변경된 회원들에게만 쿠폰이 발급됩니다.
                    </p>
                </div>
            </div>
        </div>
         <div className="mt-2 text-[11px] text-[#888888] flex items-start gap-1">
             <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
             <span>회원 등급 변경으로 인한 쿠폰 혜택 지급 시 자동 SMS 항목인 '회원등급 변경안내'와 '수동쿠폰 발급 안내'가 모두 발송될 수 있으니, 발송 설정을 확인해주세요. <Link href="#" className="text-blue-500 hover:underline">자동 SMS 설정&gt;</Link></span>
         </div>
      </div>

       {/* Grade List */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">회원등급 리스트</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="flex items-center gap-1 mb-2">
             <div className="flex border border-gray-300 rounded-[2px] overflow-hidden">
                <button onClick={() => moveSelected('top')} className="w-7 h-7 bg-white flex items-center justify-center hover:bg-gray-50 border-r border-gray-300 text-gray-500">
                    <ChevronsUp size={14} strokeWidth={1.5} />
                </button>
                 <button onClick={() => moveSelected('up')} className="w-7 h-7 bg-white flex items-center justify-center hover:bg-gray-50 border-r border-gray-300 text-gray-500">
                    <ChevronUp size={14} strokeWidth={1.5} />
                </button>
                 <button onClick={() => moveSelected('down')} className="w-7 h-7 bg-white flex items-center justify-center hover:bg-gray-50 border-r border-gray-300 text-gray-500">
                    <ChevronDown size={14} strokeWidth={1.5} />
                </button>
                 <button onClick={() => moveSelected('bottom')} className="w-7 h-7 bg-white flex items-center justify-center hover:bg-gray-50 text-gray-500">
                    <ChevronsDown size={14} strokeWidth={1.5} />
                </button>
             </div>
             <Button onClick={handleOrderSave} variant="secondary" className="h-7 px-3 text-[11px] bg-white border border-gray-300 text-gray-600 rounded-[2px] hover:bg-gray-50">순서저장</Button>
        </div>

        <div className="border-t-2 border-gray-400 border-b border-gray-200">
             <table className="w-full text-xs text-center border-collapse">
                 <thead>
                     <tr className="bg-[#B9B9B9] text-white h-9 border-b border-gray-300 font-normal">
                         <th className="w-10 border-r border-gray-300">
                            <Checkbox 
                                className="border-gray-50 opacity-80"
                                checked={grades.length > 0 && selectedGradeIds.size === grades.length}
                                onCheckedChange={toggleSelectAll}
                            />
                         </th>
                         <th className="w-20 border-r border-gray-300">등급순서</th>
                         <th className="border-r border-gray-300">회원등급명</th>
                         <th className="w-24 border-r border-gray-300">회원수</th>
                         <th className="w-32 border-r border-gray-300">등급혜택</th>
                         <th className="w-32 border-r border-gray-300">이용결제수단</th>
                         <th className="w-32 border-r border-gray-300">등록일</th>
                         <th className="w-24 border-r border-gray-300">등록자</th>
                         <th className="w-24">정보수정</th>
                     </tr>
                 </thead>
                 <tbody>
                    {grades.length === 0 ? (
                        <tr className="h-20 bg-white">
                            <td colSpan={9} className="text-gray-500">등록된 회원 등급이 없습니다.</td>
                        </tr>
                    ) : (
                        grades.map((grade, index) => (
                            <tr key={grade.id} className="h-14 border-b border-gray-200 text-gray-600 hover:bg-gray-50">
                                <td className="border-r border-gray-200">
                                    <Checkbox 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={selectedGradeIds.has(grade.id)}
                                        onCheckedChange={() => toggleSelect(grade.id)}
                                    />
                                </td>
                                <td className="border-r border-gray-200">{index + 1}</td>
                                <td className="border-r border-gray-200 text-left pl-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-[#C69C6D] rounded-full flex items-center justify-center text-[8px] text-white overflow-hidden relative">
                                            <span className="absolute w-full h-full bg-[#C69C6D] rounded-full transform rotate-45 scale-75 border-2 border-[#A67C4D]"></span>
                                        </div>
                                        <div className="flex flex-col items-start leading-tight">
                                            <span className="font-bold text-gray-800">{grade.name}</span>
                                            {/* Assuming isDefault checks if it's the default join grade? Schema has isDefault. */}
                                            {grade.isDefault && <span className="text-blue-500 text-[11px]">[가입회원등급]</span>}
                                        </div>
                                    </div>
                                </td>
                                <td className="border-r border-gray-200">{grade._count?.users || 0}</td>
                                <td className="border-r border-gray-200 flex flex-col justify-center h-full gap-0.5">
                                    {(grade.discountRate > 0 || grade.mileageRate > 0) ? (
                                        <>
                                            {grade.discountRate > 0 && <span>구매 {grade.discountRate}% 할인</span>}
                                            {grade.mileageRate > 0 && <span>구매 {grade.mileageRate}% 적립</span>}
                                        </>
                                    ) : (
                                        <span>없음</span>
                                    )}
                                </td>
                                <td className="border-r border-gray-200">제한없음</td>
                                <td className="border-r border-gray-200 font-['Roboto']">
                                    {new Date(grade.createdAt).toISOString().split('T')[0]}
                                </td>
                                <td className="border-r border-gray-200">
                                    관리자<br/>()
                                </td>
                                <td className="">
                                    <Button variant="secondary" className="h-6 px-2 text-[11px] bg-white border border-gray-300 text-gray-600 rounded-[2px] hover:bg-gray-50">수정</Button>
                                </td>
                            </tr>
                        ))
                    )}
                 </tbody>
             </table>
             <div className="bg-[#FBFBFB] p-3 flex justify-between items-center border-t border-gray-200">
                  <Button 
                    onClick={handleDelete}
                    variant="secondary" 
                    className="h-7 px-3 text-[11px] bg-white border border-gray-300 text-gray-600 rounded-[2px] hover:bg-gray-50"
                  >
                      선택 삭제
                  </Button>
                  <Button variant="secondary" className="h-7 px-3 text-[11px] bg-white border border-gray-300 text-gray-600 rounded-[2px] hover:bg-gray-50">회원등급 수동평가</Button>
             </div>
        </div>
      </div>

       <hr className="border-gray-200 mb-6" />

      {/* Guide Info */}
       <div className="text-gray-600 text-xs">
          <h3 className="font-bold flex items-center gap-1 mb-2 text-blue-500 text-[13px]">
              <Info className="w-4 h-4" /> 안내
          </h3>
          <div className="space-y-4">
              <div>
                  <h4 className="font-bold text-gray-800 text-xs mb-1">[회원등급 정보] 회원등급 삭제 시 주의사항</h4>
                  <ul className="list-disc pl-4 space-y-1 text-gray-500">
                    <li>회원등급은 운영자가 직접 삭제 및 수정이 가능합니다.</li>
                    <li>단, 가입회원등급 및 등급이 적용되어 있는 회원이 있는 경우 해당 등급은 삭제할 수 없습니다.</li>
                    <li>회원등급 내 회원 수는 휴면회원을 제외한 회원 수에 대해서만 집계합니다.</li>
                    <li className="text-red-500">회원등급을 삭제할 경우 해당 등급이 적용된 휴면회원의 등급은 가입회원등급으로 자동 변경됩니다.</li>
                  </ul>
              </div>
          </div>
      </div>
       
        {/* Floating Actions */}
        <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
            <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                <span className="text-[10px] font-bold"><Youtube size={16}/></span>
            </Button>
                <Button className="rounded-full w-10 h-10 bg-[#7B4DFF] hover:bg-[#7B4DFF]/90 shadow-lg text-white p-0 flex items-center justify-center border-0 text-[10px] leading-tight flex-col">
                <span className="block">따라</span>
                <span className="block">하기</span>
            </Button>
            <div className="flex flex-col gap-0 rounded-full bg-white shadow-lg overflow-hidden border border-gray-200">
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100 p-0">
                        <ChevronUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0">
                         <ChevronUp className="w-4 h-4 rotate-180" />
                </Button>
            </div>
        </div>

    </div>
  );
}
