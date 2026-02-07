"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updatePasswordAction } from "@/actions/user-actions";

const PasswordInput = ({ 
  placeholder, 
  value, 
  onChange, 
  show, 
  onToggle 
}: { 
  placeholder: string, 
  value: string, 
  onChange: (v: string) => void, 
  show: boolean, 
  onToggle: () => void 
}) => (
<div className="relative w-full">
    <input 
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[48px] px-3 border border-gray-200 rounded-[4px] text-[15px] focus:outline-none focus:border-black"
    />
    <button 
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1"
    >
        {show ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        )}
    </button>
</div>
);

export default function SettingsPasswordChangePage() {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const isValid = 
      currentPassword.length > 0 && 
      newPassword.length >= 6 && 
      newPassword === confirmPassword;

  const handleSubmit = async () => {
     if (!session?.user?.id) return;
     if (!isValid) return;
     
     setLoading(true);
     try {
         const res = await updatePasswordAction(session.user.id, currentPassword, newPassword);
         if (res.success) {
             alert("비밀번호가 성공적으로 변경되었습니다.");
             router.back();
         } else {
             alert(res.error || "비밀번호 변경 실패");
         }
     } catch (error) {
         console.error(error);
         alert("오류가 발생했습니다.");
     } finally {
         setLoading(false);
     }
  };

  return (
    <div className="bg-white flex justify-center min-h-screen">
      <div className="w-full max-w-[960px] bg-white relative shadow-sm flex flex-col h-screen">
        {/* Header */}
        <header className="flex items-center justify-center h-[56px] border-b border-gray-100 relative">
          <Link href="/settings" className="absolute left-5 text-black">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
             </svg>
          </Link>
          <h1 className="text-[16px] font-bold text-black">비밀번호 변경</h1>
        </header>

        <div className="p-5 flex-1 bg-white flex flex-col gap-3">
            <PasswordInput 
                placeholder="기존 비밀번호 입력"
                value={currentPassword}
                onChange={setCurrentPassword}
                show={showCurrent}
                onToggle={() => setShowCurrent(!showCurrent)}
            />
            
            <PasswordInput 
                placeholder="새 비밀번호"
                value={newPassword}
                onChange={setNewPassword}
                show={showNew}
                onToggle={() => setShowNew(!showNew)}
            />
            
            <PasswordInput 
                placeholder="새 비밀번호 확인"
                value={confirmPassword}
                onChange={setConfirmPassword}
                show={showConfirm}
                onToggle={() => setShowConfirm(!showConfirm)}
            />
            
            {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-red-500 text-[13px]">비밀번호가 일치하지 않습니다.</p>
            )}
        </div>

        {/* Bottom Button */}
        <div className="p-5 pb-8">
            <button 
                onClick={handleSubmit}
                disabled={!isValid || loading}
                className="w-full h-[52px] bg-gray-200 text-gray-500 rounded-[4px] font-bold text-[16px] disabled:opacity-70 hover:bg-black hover:text-white transition-colors"
                style={{
                    backgroundColor: isValid ? '#000' : '#eee',
                    color: isValid ? '#fff' : '#aaa'
                }}
            >
                {loading ? "변경 중..." : "비밀번호 변경하기"}
            </button>
        </div>
      </div>
    </div>
  );
}
