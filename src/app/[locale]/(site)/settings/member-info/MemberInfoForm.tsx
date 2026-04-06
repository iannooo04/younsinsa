"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateMemberInfoAction } from "@/actions/user-actions";

type FormUser = {
    id?: string | null;
    name?: string | null;
    mobile?: string | null;
    email?: string | null;
    info?: { birthday?: string | Date | null } | null;
};

export default function MemberInfoForm({ user }: { user: FormUser }) {
    const router = useRouter();
    const [name] = useState(user?.name || "");
    
    // YYYY-MM-DD
    const initialBirthday = user?.info?.birthday ? new Date(user.info.birthday).toISOString().split('T')[0] : "";
    const [birthday, setBirthday] = useState(initialBirthday);
    
    const [mobile, setMobile] = useState(user?.mobile || "");
    const [email, setEmail] = useState(user?.email || "");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!user?.id) return;
        setLoading(true);
        try {
             const data = {
                 name,
                 mobile,
                 email,
                 birthday: birthday ? new Date(birthday) : undefined
             };
             const res = await updateMemberInfoAction(user.id, data);
             if (res.success) {
                 alert("회원정보가 성공적으로 변경되었습니다.");
                 router.refresh();
             } else {
                 alert(res.error || "변경 실패");
             }
        } catch (_e) {
             alert("오류가 발생했습니다.");
        } finally {
             setLoading(false);
        }
    };

    return (
        <div className="p-8 pb-16">
            <div className="space-y-6 max-w-[600px] mx-auto sm:mx-0">
                {/* Name */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                    <span className="w-[100px] text-[14px] font-medium text-black">이름</span>
                    <input 
                        type="text" 
                        value={name} 
                        disabled
                        className="flex-1 w-full h-[48px] px-3.5 border border-gray-200 bg-gray-50 text-gray-500 rounded-[4px] text-[14px] focus:outline-none cursor-not-allowed"
                    />
                </div>

                {/* Birthday */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                    <span className="w-[100px] text-[14px] font-medium text-black">생년월일</span>
                    <input 
                        type="date" 
                        value={birthday} 
                        onChange={e => setBirthday(e.target.value)}
                        className="flex-1 w-full h-[48px] px-3.5 border border-gray-300 rounded-[4px] text-[14px] focus:outline-none focus:border-black"
                    />
                </div>

                {/* Mobile */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                    <span className="w-[100px] text-[14px] font-medium text-black">휴대폰번호</span>
                    <input 
                        type="text" 
                        value={mobile} 
                        onChange={e => setMobile(e.target.value)}
                        className="flex-1 w-full h-[48px] px-3.5 border border-gray-300 rounded-[4px] text-[14px] focus:outline-none focus:border-black"
                        placeholder="010-1234-5678"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                    <span className="w-[100px] text-[14px] font-medium text-black">이메일</span>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        className="flex-1 w-full h-[48px] px-3.5 border border-gray-300 rounded-[4px] text-[14px] focus:outline-none focus:border-black"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 max-w-[600px] mx-auto sm:mx-0">
                <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full h-[52px] bg-black text-white rounded-[4px] text-[15px] font-bold hover:bg-black/90 transition-colors disabled:opacity-50"
                >
                    {loading ? "저장 중..." : "변경하기"}
                </button>
            </div>
        </div>
    );
}
