"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  HelpCircle,
  Info
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";
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

       {/* Simple Login Settings */}
       <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">간편 로그인 기본설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    본인인증 제외설정
                </div>
                <div className="flex-1 p-4 flex items-center gap-2">
                    <span className="text-gray-600 mr-2">간편 로그인으로 회원가입 시 본인인증 절차</span>
                     <RadioGroup value={simpleLoginAuthMethod} onValueChange={setSimpleLoginAuthMethod} className="flex items-center gap-4">
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="use" id="simple-auth-use" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="simple-auth-use" className="text-gray-700 font-normal cursor-pointer text-xs">사용함</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="exclude" id="simple-auth-exclude" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="simple-auth-exclude" className="text-gray-700 font-normal cursor-pointer text-xs">제외함</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
         <div className="mt-2 space-y-1">
             <p className="text-[11px] text-[#888888] flex items-start gap-1">
                 <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 원더 아이디 로그인의 경우, '사용함'으로 설정하여도 본인인증 서비스가 실행되지 않습니다.
            </p>
            <p className="text-[11px] text-[#888888] flex items-start gap-1">
                 <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 <span>본인확인 인증 서비스(휴대폰인증/아이핀인증)가 적용되어 있어야만 '사용함' 설정 시 본인인증 서비스가 실행됩니다. <Link href="#" className="text-blue-500 hover:underline">휴대폰인증 설정&gt;</Link> <Link href="#" className="text-blue-500 hover:underline">아이핀인증 설정&gt;</Link></span>
            </p>
         </div>
      </div>

       {/* Withdrawal / Re-join Settings */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">탈퇴/재가입 설정</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    재가입 기간제한
                </div>
                <div className="flex-1 p-4 flex flex-col gap-2">
                    <RadioGroup value={rejoinLimitMethod} onValueChange={setRejoinLimitMethod} className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                             <RadioGroupItem value="limit" id="rejoin-limit" className="border-gray-300 text-gray-600 focus:ring-0" />
                             <Label htmlFor="rejoin-limit" className="text-gray-700 font-normal cursor-pointer text-xs">회원탈퇴/삭제 후</Label>
                             <Input 
                                className="w-16 h-7 text-center bg-[#EDEFF2] border-gray-300" 
                                value={rejoinLimitDays}
                                onChange={(e) => setRejoinLimitDays(Number(e.target.value))}
                                disabled={rejoinLimitMethod !== 'limit'}
                            />
                             <span className="text-gray-700">일 동안 재가입 불가</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                             <RadioGroupItem value="unused" id="rejoin-unused" className="border-red-500 text-red-500 focus:ring-red-500" />
                             <Label htmlFor="rejoin-unused" className="text-gray-700 font-normal cursor-pointer text-xs">사용안함</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
         <div className="mt-2 space-y-1">
            <p className="text-[11px] text-red-500 flex items-start gap-1">
                 <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                 탈퇴회원의 재가입 기간 제한을 위하여 탈퇴회원의 ID, IP는 재가입 제한 설정한 기간동안 보관 후 파기되므로 이를 개인정보보호법에 의거하여<br/>
                 쇼핑몰 개인정보처리방침 내 반드시 명시하시기 바랍니다.
            </p>
         </div>
      </div>

       {/* Join Disabled IDs */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">가입불가 회원아이디</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-4 font-bold text-gray-700 flex items-center border-r border-gray-200">
                    가입불가 회원아이디
                </div>
                <div className="flex-1 p-4">
                    <Textarea 
                        className="w-full h-24 resize-none border-gray-300 text-xs text-gray-600" 
                        value={fraudulentIds}
                        onChange={(e) => setFraudulentIds(e.target.value)}
                    />
                     <p className="text-[11px] text-[#888888] flex items-start gap-1 mt-1">
                         <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                         회원가입을 제한할 아이디를 쉼표(,)로 구분하여 입력하세요.
                    </p>
                </div>
            </div>
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Footer Info */}
      <div className="text-gray-600 text-xs">
          <h3 className="font-bold flex items-center gap-1 mb-2 text-blue-500">
              <Info className="w-4 h-4" /> 안내
          </h3>
          <div className="space-y-2">
              <p className="font-bold text-gray-800">회원 탈퇴 시, 탈퇴 회원의 개인정보는 모두 삭제 되나요?</p>
              <div className="text-gray-600 pl-2 space-y-1">
                <p>· 고도몰은 탈퇴회원 재가입 기간 제한 기능을 위해, 탈퇴 회원의 ID, IP 정보를 최대 1년 동안 보관하고 있습니다.</p>
                <p>· 해당 부분은 개인정보보호법에 의거 쇼핑몰 이용 고객에게 안내 되어야 하오니 쇼핑몰 개인정보처리방침 약관에 반드시 명시하시기 바랍니다.</p>
                <p>· 단, 탈퇴 회원 정보를 삭제하는 경우 해당 정보는 그 즉시 삭제 됩니다.</p>
              </div>
          </div>
      </div>
       
        
    </div>
  );
}
