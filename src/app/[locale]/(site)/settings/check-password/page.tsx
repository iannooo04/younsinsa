"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { verifyPasswordAction } from "@/actions/user-actions";

export default function CheckPasswordPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isValid = password.length > 0;

  const handleSubmit = async () => {
    if (!session?.user?.id) return;
    
    setLoading(true);
    setError(null);

    try {
      const result = await verifyPasswordAction(session.user.id, password);
      
      if (result.success) {
         router.push("/settings/member-info");
      } else {
         setError(result.error || "비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center">
      <div className="w-full max-w-[480px] bg-white relative flex flex-col h-screen">
        {/* Header */}
        <header className="flex items-center h-[56px] px-4 sticky top-0 bg-white z-10">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <h1 className="text-[18px] font-bold text-black ml-1">비밀번호 입력</h1>
        </header>

        <div className="flex-1 px-5 pt-4">
          {/* Description */}
          <p className="text-[14px] text-black mb-8 leading-snug">
            정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해주세요
          </p>

          {/* Password Input */}
          <div className="relative border-b border-gray-200">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-full py-3 pr-10 text-[16px] placeholder-gray-400 focus:outline-none text-black bg-transparent"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
            >
              {showPassword ? (
                // Eye Off Icon
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5 text-gray-400"
                >
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.44 0 .87-.03 1.28-.09" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              ) : (
                // Eye On Icon
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5 text-gray-400"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-[13px] mt-2">{error}</p>
            )}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="p-5 pb-8">
           <button
             disabled={!isValid || loading}
             onClick={handleSubmit}
             className={`w-full py-4 text-[16px] font-bold rounded-[4px] transition-colors ${
               isValid && !loading
                 ? "bg-black text-white cursor-pointer hover:bg-black/90" 
                 : "bg-[#EBEBEB] text-[#999999] cursor-not-allowed"
             }`}
           >
             {loading ? "확인 중..." : "완료"}
           </button>
        </div>
      </div>
    </div>
  );
}
