/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircle,
  ChevronUp,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getGradeEvaluationAction, updateGradeEvaluationAction } from "@/actions/user-grade-actions";

export default function GradeEvaluationPage() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);
  const [grades, setGrades] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
        const res = await getGradeEvaluationAction();
        if (res.success) {
            setSettings(res.settings);
            setGrades(res.grades || []);
        } else {
            toast.error(res.error || "데이터를 불러오는데 실패했습니다.");
        }
        setLoading(false);
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    const res = await updateGradeEvaluationAction({ settings, grades });
    if (res.success) {
        toast.success("저장되었습니다.");
    } else {
        toast.error(res.error || "저장에 실패했습니다.");
    }
  };

  const handleSettingsChange = (field: string, value: any) => {
    setSettings((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleScoreSettingsChange = (category: string, field: string, value: any) => {
      setSettings((prev: any) => ({
          ...prev,
          scoreSettings: {
              ...prev.scoreSettings,
              [category]: {
                  ...prev.scoreSettings?.[category],
                  [field]: value
              }
          }
      }));
  };

  const handleGradeChange = (gradeId: string, field: string, value: any) => {
      setGrades((prev) => prev.map(g => g.id === gradeId ? { ...g, [field]: value } : g));
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!settings) return <div className="p-6">Error loading settings.</div>;

  const scoreSettings = settings.scoreSettings || {};

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">회원등급 평가방법 설정</h1>
        <Button onClick={handleSave} className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0">
            저장
        </Button>
      </div>

      {/* Evaluation Method Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">회원등급 평가방법</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Auto/Manual */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[100px]">
                    자동/수동평가
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center gap-2">
                    <RadioGroup 
                        value={settings.evaluationMethod} 
                        onValueChange={(val) => handleSettingsChange("evaluationMethod", val)}
                        className="flex items-center gap-4"
                    >
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="manual" id="eval-manual" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="eval-manual" className="text-gray-700 font-normal cursor-pointer text-xs">수동 평가</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="auto" id="eval-auto" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="eval-auto" className="text-gray-700 font-normal cursor-pointer text-xs">자동 평가</Label>
                        </div>
                    </RadioGroup>
                     <p className="text-[11px] text-[#888888] flex items-start gap-1">
                         <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                         자동 평가 선택 시 설정된 평가방법 및 평가기준의 산출기간/등급산정일에 따라 회원등급이 자동 평가됩니다.
                    </p>
                    <p className="text-[11px] text-[#888888] flex items-start gap-1">
                         <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                         수동 평가 선택 시 회원등급이 자동으로 평가되지 않습니다. 실적에 따른 평가 필요 시 [회원등급 수동평가]를 눌러 회원등급을 평가합니다.
                    </p>
                </div>
            </div>

            {/* Downgrade */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-[80px]">
                    하향평가 사용여부
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center gap-2">
                     <RadioGroup 
                        value={settings.downgradeUsage}
                        onValueChange={(val) => handleSettingsChange("downgradeUsage", val)}
                        className="flex items-center gap-4"
                    >
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="use" id="downgrade-use" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="downgrade-use" className="text-gray-700 font-normal cursor-pointer text-xs">사용함</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="unused" id="downgrade-unused" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="downgrade-unused" className="text-gray-700 font-normal cursor-pointer text-xs">사용안함</Label>
                        </div>
                    </RadioGroup>
                     <p className="text-[11px] text-[#888888] flex items-start gap-1">
                         <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                         사용안함으로 설정할 경우, 자동/수동 평가에 따라 회원의 등급순서가 하향되지 않습니다
                    </p>
                </div>
            </div>

            {/* Method 1: Performance Figures */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200 h-[80px]">
                     <div className="flex items-center gap-1.5">
                        <input 
                            type="radio" 
                            id="method-figures" 
                            name="eval-method" 
                            className="w-3.5 h-3.5 border-gray-300 text-red-500 focus:ring-red-500" 
                            checked={settings.criteriaMethod === "figures"}
                            onChange={() => handleSettingsChange("criteriaMethod", "figures")}
                        />
                        <Label htmlFor="method-figures" className="text-gray-700 font-bold cursor-pointer text-xs">실적 수치제</Label>
                    </div>
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center gap-1">
                    <p className="text-xs text-gray-600">주문금액, 상품주문건수, 주문상품후기횟수를 종합하여 평가하는 방법입니다. 회원등급별 평가기준을 입력하세요.</p>
                     <p className="text-[11px] text-[#888888] flex items-start gap-1">
                         <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                         수동 평가 선택 시 회원등급이 자동으로 평가되지 않고 [회원등급 수동평가]를 눌러 회원등급을 평가합니다.
                    </p>
                </div>
            </div>

             {/* Method 2: Performance Score */}
             <div className="flex">
                <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200 min-h-[160px]">
                    <div className="flex items-center gap-1.5">
                        <input 
                            type="radio" 
                            id="method-score" 
                            name="eval-method" 
                            className="w-3.5 h-3.5 border-gray-300 text-gray-600 focus:ring-0" 
                             checked={settings.criteriaMethod === "score"}
                             onChange={() => handleSettingsChange("criteriaMethod", "score")}
                        />
                        <Label htmlFor="method-score" className="text-gray-700 font-normal cursor-pointer text-xs">실적 점수제</Label>
                    </div>
                </div>
                <div className="flex-1 p-0">
                    <div className="flex flex-col h-full">
                        {/* Headers */}
                        <div className="flex h-9 border-b border-gray-200 bg-[#FBFBFB] text-gray-700 font-bold items-center text-center">
                            <div className="flex-1 border-r border-gray-200">쇼핑몰 전체 실적</div>
                            <div className="flex-1">모바일샵 추가 실적</div>
                        </div>
                        {/* Row 1: Amount */}
                        <div className="flex h-12 border-b border-gray-200 items-center">
                            <div className="flex-1 border-r border-gray-200 px-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 w-32 shrink-0">
                                    <Checkbox 
                                        id="score-amt" 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={scoreSettings.orderAmount?.used || false}
                                        onCheckedChange={(c) => handleScoreSettingsChange("orderAmount", "used", c)}
                                        disabled={settings.criteriaMethod !== "score"}
                                    />
                                    <Label htmlFor="score-amt" className="text-gray-600 text-xs font-normal cursor-pointer">주문금액</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input 
                                        className="w-20 h-7 text-right bg-white border-gray-300" 
                                        value={scoreSettings.orderAmount?.unit || 0}
                                        onChange={(e) => handleScoreSettingsChange("orderAmount", "unit", Number(e.target.value))}
                                        disabled={settings.criteriaMethod !== "score"}
                                    />
                                    <span className="text-gray-600 w-8 text-center">원 당</span>
                                    <Input 
                                        className="w-16 h-7 text-right bg-white border-gray-300" 
                                        value={scoreSettings.orderAmount?.point || 0}
                                        onChange={(e) => handleScoreSettingsChange("orderAmount", "point", Number(e.target.value))}
                                        disabled={settings.criteriaMethod !== "score"}
                                    />
                                    <span className="text-gray-600 w-4">점</span>
                                </div>
                            </div>
                            <div className="flex-1 px-4 flex items-center justify-between">
                                <div className="w-32 shrink-0"></div> {/* Spacer for symmetry if needed, or just justify-end */}
                                <div className="flex items-center gap-2 w-full justify-end">
                                    <Input 
                                        className="w-20 h-7 text-right bg-white border-gray-300" 
                                        value={scoreSettings.mobileOrderAmount?.unit || 0}
                                        onChange={(e) => handleScoreSettingsChange("mobileOrderAmount", "unit", Number(e.target.value))}
                                        disabled={settings.criteriaMethod !== "score"}
                                    />
                                    <span className="text-gray-600 w-8 text-center">원 당</span>
                                    <Input 
                                        className="w-16 h-7 text-right bg-white border-gray-300" 
                                        value={scoreSettings.mobileOrderAmount?.point || 0}
                                        onChange={(e) => handleScoreSettingsChange("mobileOrderAmount", "point", Number(e.target.value))}
                                        disabled={settings.criteriaMethod !== "score"}
                                    />
                                    <span className="text-gray-600 w-4">점</span>
                                </div>
                            </div>
                        </div>

                         {/* Row 2: Count */}
                        <div className="flex h-12 border-b border-gray-200 items-center">
                            <div className="flex-1 border-r border-gray-200 px-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 w-32 shrink-0">
                                    <Checkbox 
                                        id="score-cnt" 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={scoreSettings.orderCount?.used || false}
                                        onCheckedChange={(c) => handleScoreSettingsChange("orderCount", "used", c)}
                                        disabled={settings.criteriaMethod !== "score"}
                                    />
                                    <Label htmlFor="score-cnt" className="text-gray-600 text-xs font-normal cursor-pointer">상품주문건수</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600 mr-2">구매 1회당</span>
                                    <Input 
                                        className="w-16 h-7 text-right bg-white border-gray-300" 
                                        value={scoreSettings.orderCount?.point || 0}
                                        onChange={(e) => handleScoreSettingsChange("orderCount", "point", Number(e.target.value))}
                                        disabled={settings.criteriaMethod !== "score"}
                                    />
                                    <span className="text-gray-600 w-4">점</span>
                                </div>
                            </div>
                             <div className="flex-1 px-4 flex items-center gap-2">
                                {/* Placeholder for mobile count if needed */}
                            </div>
                        </div>

                         {/* Row 3: Review */}
                        <div className="flex h-12 border-b border-gray-200 items-center">
                            <div className="flex-1 border-r border-gray-200 px-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 w-32 shrink-0">
                                    <Checkbox 
                                        id="score-review" 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={scoreSettings.reviewCount?.used || false}
                                        onCheckedChange={(c) => handleScoreSettingsChange("reviewCount", "used", c)}
                                        disabled={settings.criteriaMethod !== "score"}
                                    />
                                    <Label htmlFor="score-review" className="text-gray-600 text-xs font-normal cursor-pointer">주문상품후기</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600 mr-2">구매 후기당</span>
                                    <Input 
                                        className="w-16 h-7 text-right bg-white border-gray-300" 
                                        value={scoreSettings.reviewCount?.point || 0}
                                        onChange={(e) => handleScoreSettingsChange("reviewCount", "point", Number(e.target.value))}
                                        disabled={settings.criteriaMethod !== "score"}
                                    />
                                    <span className="text-gray-600 w-4">점</span>
                                </div>
                            </div>
                            <div className="flex-1 px-4"></div>
                        </div>

                         {/* Row 4: Login */}
                        <div className="flex h-12 items-center">
                            <div className="flex-1 border-r border-gray-200 px-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 w-32 shrink-0">
                                    <Checkbox 
                                        id="score-login" 
                                        className="border-gray-300 rounded-[2px]" 
                                        checked={scoreSettings.loginCount?.used || false}
                                        onCheckedChange={(c) => handleScoreSettingsChange("loginCount", "used", c)}
                                        disabled={settings.criteriaMethod !== "score"}
                                    />
                                    <Label htmlFor="score-login" className="text-gray-600 text-xs font-normal cursor-pointer">로그인 횟수</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600 mr-2">1회/일 로그인당</span>
                                    <Input 
                                        className="w-16 h-7 text-right bg-white border-gray-300" 
                                        value={scoreSettings.loginCount?.point || 0}
                                        onChange={(e) => handleScoreSettingsChange("loginCount", "point", Number(e.target.value))}
                                        disabled={settings.criteriaMethod !== "score"}
                                    />
                                    <span className="text-gray-600 w-4">점</span>
                                </div>
                            </div>
                            <div className="flex-1 px-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

       {/* Criteria by Grade */}
      <div className="mb-24">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">회원등급별 평가기준</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="border-t-2 border-gray-400 border-b border-gray-200 overflow-x-auto">
             <table className="w-full text-xs text-center border-collapse table-fixed min-w-[1200px]">
                 <colgroup>
                    <col className="w-[120px]" />
                    <col className="w-[120px]" />
                    <col />
                    <col className="w-[150px]" />
                    <col className="w-[120px]" />
                 </colgroup>
                 <thead>
                     <tr className="bg-[#EDEFF2] h-10 text-gray-700 font-bold border-b border-gray-300">
                         <th className="border-r border-gray-300 row-span-2">회원등급명</th>
                         <th className="border-r border-gray-300 row-span-2">등급혜택</th>
                         <th className="border-r border-gray-300 border-b border-gray-300" colSpan={2}>
                             {settings.criteriaMethod === "figures" ? "실적 수치" : "실적 점수"}
                         </th>
                         <th className="border-r border-gray-300 row-span-2">실적계산기간</th>
                         <th className="row-span-2">등급 평가일</th>
                     </tr>
                      <tr className="bg-[#EDEFF2] h-10 text-gray-700 font-bold border-b border-gray-300">
                         <th className="border-r border-gray-300">쇼핑몰 전체실적</th>
                         <th className="border-r border-gray-300">모바일샵 추가실적</th>
                     </tr>
                 </thead>
                 <tbody>
                     {grades.map((grade) => (
                         <tr key={grade.id} className="border-b border-gray-200">
                             <td className="border-r border-gray-200 p-4 font-bold text-gray-700">{grade.name}</td>
                             <td className="border-r border-gray-200 p-4">
                                 <div className="flex flex-col gap-1 items-start pl-2 text-blue-500">
                                     <span className="hover:underline cursor-pointer">추가 {grade.discountRate}% 할인</span>
                                     <span className="hover:underline cursor-pointer">추가 {grade.mileageRate}% 적립</span>
                                 </div>
                             </td>
                             <td className="border-r border-gray-200 p-4 text-left">
                                 {settings.criteriaMethod === "figures" ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-12 text-gray-600">주문금액</span>
                                            <div className="flex items-center gap-1">
                                                <Input 
                                                    className="w-20 h-7 text-center border-gray-300 bg-white" 
                                                    value={grade.minPurchaseAmount || 0} 
                                                    onChange={(e) => handleGradeChange(grade.id, "minPurchaseAmount", Number(e.target.value))}
                                                />
                                                <span className="text-gray-600">원 이상 ~</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-12 text-gray-600">상품주문건수</span>
                                            <div className="flex items-center gap-1">
                                                <Input 
                                                    className="w-20 h-7 text-center border-gray-300 bg-white" 
                                                    value={grade.minOrderCount || 0} 
                                                    onChange={(e) => handleGradeChange(grade.id, "minOrderCount", Number(e.target.value))}
                                                />
                                                <span className="text-gray-600">회 이상</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-12 text-gray-600">주문상품후기</span>
                                            <div className="flex items-center gap-1">
                                                <Input 
                                                    className="w-20 h-7 text-center border-gray-300 bg-white" 
                                                    value={grade.minReviewCount || 0} 
                                                    onChange={(e) => handleGradeChange(grade.id, "minReviewCount", Number(e.target.value))}
                                                />
                                                <span className="text-gray-600">개 이상</span>
                                            </div>
                                        </div>
                                    </div>
                                 ) : (
                                    <div className="space-y-2">
                                         <div className="flex items-center gap-2">
                                            <span className="w-12 text-gray-600">점수</span>
                                            <div className="flex items-center gap-1">
                                                <Input 
                                                    className="w-20 h-7 text-center border-gray-300 bg-white" 
                                                    value={grade.minScore || 0} 
                                                    onChange={(e) => handleGradeChange(grade.id, "minScore", Number(e.target.value))}
                                                />
                                                <span className="text-gray-600">점 이상</span>
                                            </div>
                                        </div>
                                    </div>
                                 )}
                             </td>
                              <td className="border-r border-gray-200 p-4 text-left">
                                 {/* Mobile shop additional criteria - hidden for now as defined in mock */}
                             </td>
                             <td className="border-r border-gray-200 p-4 text-left align-top">
                                 <div className="space-y-2">
                                     <RadioGroup 
                                        value={grade.calcPeriodType}
                                        onValueChange={(val) => handleGradeChange(grade.id, "calcPeriodType", val)}
                                        className="gap-2"
                                     >
                                        <div className="flex items-center gap-1.5">
                                            <RadioGroupItem value="unlimit" id={`period-unlimit-${grade.id}`} className="w-3.5 h-3.5 border-gray-300 text-gray-600" />
                                            <Label htmlFor={`period-unlimit-${grade.id}`} className="text-gray-600 font-normal cursor-pointer">기간제한 없음</Label>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <RadioGroupItem value="limit" id={`period-limit-${grade.id}`} className="w-3.5 h-3.5 border-gray-300 text-gray-600" />
                                            <Label htmlFor={`period-limit-${grade.id}`} className="text-gray-600 font-normal cursor-pointer">기간제한 있음</Label>
                                        </div>
                                     </RadioGroup>
                                     <div className="flex items-center gap-1">
                                         <Select value={grade.calcPeriodStart} onValueChange={(val) => handleGradeChange(grade.id, "calcPeriodStart", val)}>
                                            <SelectTrigger className="w-24 h-7 text-xs border-gray-300 bg-white">
                                                <SelectValue placeholder="직전(어제)" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="prev">직전(어제)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                         <span className="text-gray-600">부터</span>
                                     </div>
                                      <div className="flex items-center gap-1">
                                         <Select value={String(grade.calcPeriod)} onValueChange={(val) => handleGradeChange(grade.id, "calcPeriod", Number(val))}>
                                            <SelectTrigger className="w-16 h-7 text-xs border-gray-300 bg-white">
                                                <SelectValue placeholder="3" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="6">6</SelectItem>
                                                <SelectItem value="12">12</SelectItem>
                                            </SelectContent>
                                        </Select>
                                         <span className="text-gray-600">개월간</span>
                                     </div>
                                 </div>
                             </td>
                             <td className="p-4 align-top">
                                  <div className="space-y-2">
                                      <div className="flex items-center gap-1">
                                         <Select value={String(grade.evalCycle)} onValueChange={(val) => handleGradeChange(grade.id, "evalCycle", Number(val))}>
                                            <SelectTrigger className="w-14 h-7 text-xs border-gray-300 bg-white">
                                                <SelectValue placeholder="1" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1</SelectItem>
                                            </SelectContent>
                                        </Select>
                                         <span className="text-gray-600">개월마다</span>
                                     </div>
                                     <div className="flex items-center gap-1">
                                         <span className="text-gray-600">해당월</span>
                                         <Select value={String(grade.evalDay)} onValueChange={(val) => handleGradeChange(grade.id, "evalDay", Number(val))}>
                                            <SelectTrigger className="w-14 h-7 text-xs border-gray-300 bg-white">
                                                <SelectValue placeholder="1" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="10">10</SelectItem>
                                                <SelectItem value="20">20</SelectItem>
                                            </SelectContent>
                                        </Select>
                                         <span className="text-gray-600">일</span>
                                     </div>
                                  </div>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
        </div>
      </div>
       
        {/* Floating Actions */}
        <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
            <Button onClick={handleSave} className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                <span className="text-[10px] font-bold">저장</span>
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
