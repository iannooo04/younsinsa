
import React from "react";
import { auth } from "@/auth";
import { getMyPageDataAction } from "@/actions/user-actions";

// Helper for masking
function maskEmail(email: string | null | undefined) {
  if (!email) return "";
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  
  const visibleLen = Math.min(3, local.length);
  const maskedLocal = local.slice(0, visibleLen) + "*".repeat(local.length - visibleLen);
  
  return `${maskedLocal}@${domain}`; // Simple masking as per image
}

function maskPhone(phone: string | null | undefined) {
    if (!phone) return "";
    // Expecting 010-1234-5678 format or similar
    // Simple mask for 010-****-5678
    const parts = phone.split("-");
    if (parts.length === 3) {
        return `${parts[0]}-****-${parts[2]}`;
    }
    return phone;
}

function maskBirthday(date: Date | null | undefined) {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    // 2004.**.** style
    return `${year}.**.**`;
}

export default async function MemberInfoPage() {
  const session = await auth();
  const { user } = await getMyPageDataAction(session?.user?.id as string);

  return (
    <div className="bg-white min-h-screen flex justify-center">
      <div className="w-full max-w-[960px] bg-white relative">
        {/* Header */}
        <section className="bg-[#F9F9F9] px-5 py-6 border-b border-gray-100">
             <h1 className="text-[16px] font-bold text-black">회원정보 변경</h1>
        </section>

        {/* Content */}
        <div className="p-8">
            <div className="space-y-4 max-w-[600px]">
                {/* Name */}
                <div className="flex items-start">
                    <span className="w-[100px] text-[14px] font-medium text-black pt-1">이름</span>
                    <span className="text-[14px] text-black">{user?.name}</span>
                </div>

                {/* Birthday */}
                <div className="flex items-start">
                    <span className="w-[100px] text-[14px] font-medium text-black pt-1">생년월일</span>
                    <span className="text-[14px] text-black">{maskBirthday(user?.info?.birthday)}</span>
                </div>

                {/* Mobile */}
                <div className="flex items-start">
                    <span className="w-[100px] text-[14px] font-medium text-black pt-1">휴대폰번호</span>
                    <span className="text-[14px] text-black">{maskPhone(user?.mobile)}</span>
                </div>

                {/* Email */}
                <div className="flex items-center">
                    <span className="w-[100px] text-[14px] font-medium text-black">이메일</span>
                    <div className="flex items-center gap-2">
                         <span className="text-[14px] text-black">{maskEmail(user?.email)}</span>
                         <span className="bg-[#FFEFEF] text-[#FF4848] text-[11px] px-2 py-0.5 rounded-[2px] font-bold">인증 필요</span>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-8 max-w-[600px]">
                <button className="flex-1 py-3 bg-white border border-gray-200 rounded-[4px] text-[13px] font-bold text-black hover:bg-gray-50 transition-colors">
                    회원정보 변경
                </button>
                <button className="flex-1 py-3 bg-white border border-gray-200 rounded-[4px] text-[13px] font-bold text-black hover:bg-gray-50 transition-colors">
                    이메일 인증
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
