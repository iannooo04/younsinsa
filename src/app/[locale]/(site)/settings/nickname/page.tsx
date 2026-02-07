"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateNicknameAction, getNicknameSuggestionAction, getMyPageDataAction } from "@/actions/user-actions";

export default function SettingsNicknamePage() {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const [nickname, setNickname] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  
  // Initialize with current nickname
  React.useEffect(() => {
    // We could fetch fresh data or rely on session if updated
    // For now, let's use session user if available, or fetch
    if (session?.user?.id) {
        getMyPageDataAction(session.user.id).then(res => {
            if(res.success && res.user) {
                setNickname(res.user.nickname || res.user.name || "");
            }
        });
    }
  }, [session?.user?.id]);

  const handleSuggestion = async () => {
    const res = await getNicknameSuggestionAction();
    if (res.success && res.nickname) {
      setNickname(res.nickname);
    }
  };

  const handleSubmit = async () => {
     if (!session?.user?.id) return;
     if (!nickname.trim()) {
         alert("닉네임을 입력해주세요.");
         return;
     }
     
     setLoading(true);
     try {
         const res = await updateNicknameAction(session.user.id, nickname);
         if (res.success) {
             alert("닉네임철 성공적으로 변경되었습니다.");
             // Update session if needed
             await updateSession();
             router.back();
         } else {
             alert(res.error || "변경 실패");
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
          <h1 className="text-[16px] font-bold text-black">닉네임 변경</h1>
        </header>

        <div className="p-5 flex-1 bg-white">
            <div className="mb-2">
                <h3 className="text-[14px] font-bold text-black">이번 달 수정 가능 횟수 (4회/4회)</h3>
            </div>
            
            <div className="flex gap-2 mb-2">
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임 입력(최대 8자)"
                        maxLength={8}
                        className="w-full h-[48px] px-3 border border-gray-300 rounded-[4px] text-[15px] focus:outline-none focus:border-black"
                    />
                </div>
                <button 
                  onClick={handleSuggestion}
                  className="px-4 h-[48px] border border-gray-200 rounded-[4px] text-[13px] font-medium text-black hover:bg-gray-50 whitespace-nowrap"
                >
                    닉네임 추천받기
                </button>
            </div>
            
            <p className="text-[13px] text-gray-400">현재 닉네임: {session?.user?.name || ""}</p>
        </div>

        {/* Bottom Button */}
        <div className="p-5 pb-8">
            <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-[52px] bg-gray-200 text-gray-500 rounded-[4px] font-bold text-[16px] disabled:opacity-70 hover:bg-black hover:text-white transition-colors"
                style={{
                    backgroundColor: nickname.trim().length > 0 ? '#000' : '#eee',
                    color: nickname.trim().length > 0 ? '#fff' : '#aaa'
                }}
            >
                {loading ? "변경 중..." : "변경하기"}
            </button>
        </div>
      </div>
    </div>
  );
}
