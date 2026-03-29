"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  HelpCircle
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getMemberJoinPolicyAction, updateMemberJoinPolicyAction } from "@/actions/member-policy-actions";
import { toast } from "sonner";

export default function MemberJoinPolicyPage() {
  const [loading, setLoading] = useState(true);
  
  // State
  const [approvalMethod, setApprovalMethod] = useState("none");
  const [simpleLoginAuthMethod, setSimpleLoginAuthMethod] = useState("use");
  const [rejoinLimitMethod, setRejoinLimitMethod] = useState("unused");
  const [rejoinLimitDays, setRejoinLimitDays] = useState(0);
  const [fraudulentIds, setFraudulentIds] = useState("");

  useEffect(() => {
    async function fetchData() {
        setLoading(true);
        const result = await getMemberJoinPolicyAction();
        if (result.success && result.policy) {
            const p = result.policy;
            setApprovalMethod(p.approvalMethod);
            setSimpleLoginAuthMethod(p.simpleLoginAuthMethod);
            setRejoinLimitMethod(p.rejoinLimitMethod);
            setRejoinLimitDays(p.rejoinLimitDays);
            setFraudulentIds(p.fraudulentIds);
        } else {
            toast.error(result.error || "정책을 불러오는데 실패했습니다.");
        }
        setLoading(false);
    }
    fetchData();
  }, []);

  const handleSave = async () => {
      const data = {
          approvalMethod,
          ageLimitMethod: "none",
          useAgeConsent: false,
          underageAge: 14,
          underageAction: "approval",
          simpleLoginAuthMethod,
          rejoinLimitMethod,
          rejoinLimitDays,
          fraudulentIds
      };
      
      const result = await updateMemberJoinPolicyAction(data);
      if (result.success) {
          toast.success("저장되었습니다.");
      } else {
          toast.error(result.error || "저장에 실패했습니다.");
      }
  };

  if (loading) {
      return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">회원 가입 정책 관리</h1>
        <Button 
            onClick={handleSave}
            className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm font-bold border-0">
            저장
        </Button>
      </div>

      {/* Join Settings */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">가입 설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Approval Usage */}
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    가입승인 사용설정 <HelpCircle className="w-3.5 h-3.5 text-gray-400 ml-1" />
                </div>
                <div className="flex-1 p-4 flex flex-col gap-2">
                    <RadioGroup value={approvalMethod} onValueChange={setApprovalMethod} className="flex flex-col gap-2">
                         <div className="flex items-center gap-2">
                            <RadioGroupItem value="none" id="approval-none" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="approval-none" className="text-gray-700 font-normal cursor-pointer text-xs">승인 절차 없이 가입</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="all" id="approval-all" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="approval-all" className="text-gray-700 font-normal cursor-pointer text-xs">승인 후 가입</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="business" id="approval-business" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="approval-business" className="text-gray-700 font-normal cursor-pointer text-xs">사업자회원만 승인 후 가입</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

        </div>
      </div>


       
        
    </div>
  );
}
