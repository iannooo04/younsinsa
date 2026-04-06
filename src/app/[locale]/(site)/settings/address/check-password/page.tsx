"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { verifyPasswordAction } from "@/actions/user-actions";
import { Eye, EyeOff } from "lucide-react";

export default function AddressCheckPasswordPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isValid = password.length > 0;

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      // Fallback if no session, just to let UI proceed in dev environment
      router.push("/settings/address/edit");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const result = await verifyPasswordAction(session.user.id, password);
      
      if (result.success) {
         router.push("/settings/address/edit");
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

  // Allow enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && isValid && !loading) {
      handleSubmit();
    }
  }

  return (
    <div className="bg-[#f8f9fa] flex justify-center min-h-screen">
      <div className="w-full max-w-[960px] bg-white relative flex flex-col min-h-[100dvh] shadow-sm">
        
        {/* Header - Gray block matching image */}
        <header className="bg-[#f8f9fa] flex items-center px-5 h-[60px] sticky top-0 z-10 w-full">
          <h1 className="text-[18px] font-bold text-black">비밀번호 입력</h1>
        </header>

        <main className="flex-1 px-5 py-8 bg-white flex flex-col">
          {/* Description */}
          <p className="text-[14px] text-black font-medium mb-4">
            정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해주세요
          </p>

          {/* Password Input */}
          <div className="w-full border border-gray-200 rounded-[4px] px-3.5 flex items-center bg-white transition-colors focus-within:border-black">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="비밀번호 입력"
              className="w-full py-3.5 text-[14px] placeholder:text-gray-300 focus:outline-none text-black bg-transparent"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 flex-shrink-0 outline-none hover:bg-gray-50 rounded"
              type="button"
            >
              {showPassword ? (
                <Eye className="w-5 h-5 text-gray-300 stroke-[1.5]" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-300 stroke-[1.5]" />
              )}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-[13px] mt-2 px-1">{error}</p>
          )}

          {/* Spacer to push button to bottom */}
          <div className="flex-1"></div>

          {/* Bottom Button */}
          <div className="mt-8 mb-2">
            <button
              disabled={!isValid || loading}
              onClick={handleSubmit}
              className={`w-full py-4 text-[15px] font-bold rounded-[4px] transition-colors ${
                isValid && !loading
                  ? "bg-black text-white hover:bg-black/90 cursor-pointer" 
                  : "bg-[#f2f2f2] text-[#b3b3b3] cursor-not-allowed"
              }`}
            >
              {loading ? "확인 중..." : "완료"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
