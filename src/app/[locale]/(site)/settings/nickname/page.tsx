"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { updateNicknameAction, getNicknameSuggestionAction, getMyPageDataAction } from "@/actions/user-actions";

export default function SettingsNicknamePage() {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const [nickname, setNickname] = React.useState("");
  const [currentNickname, setCurrentNickname] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [editCount, setEditCount] = React.useState(4);
  
  // Initialize with current nickname
  React.useEffect(() => {
    // We could fetch fresh data or rely on session if updated
    // For now, let's use session user if available, or fetch
    if (session?.user?.id) {
        getMyPageDataAction(session.user.id).then(res => {
            if(res.success && res.user) {
                const fetchedName = res.user.nickname || res.user.name || "";
                setNickname(""); // Clear input when loaded
                setCurrentNickname(fetchedName);
            }
        });

        // 이번 달을 기준으로 로컬스토리지에서 수정 가능 횟수 추적 
        const currentMonth = new Date().getMonth();
        const storageKey = `nickname_edits_${session.user.id}_${currentMonth}`;
        const storedEdits = localStorage.getItem(storageKey);
        
        if (storedEdits !== null) {
            setEditCount(parseInt(storedEdits, 10));
        } else {
            localStorage.setItem(storageKey, "4");
            setEditCount(4);
        }
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
     if (editCount <= 0) {
         alert("이번 달 닉네임 수정 가능 횟수를 모두 소진했습니다.");
         return;
     }
     if (!nickname.trim()) {
         alert("닉네임을 입력해주세요.");
         return;
     }
     
     setLoading(true);
     try {
         const res = await updateNicknameAction(session.user.id, nickname);
         if (res.success) {
             alert("닉네임이 성공적으로 변경되었습니다.");
             setCurrentNickname(nickname);
             
             // 차감 로직 처리
             const currentMonth = new Date().getMonth();
             const storageKey = `nickname_edits_${session.user.id}_${currentMonth}`;
             const newCount = Math.max(0, editCount - 1);
             setEditCount(newCount);
             localStorage.setItem(storageKey, newCount.toString());
             
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
    <div className="w-full bg-white min-h-[calc(100vh-60px)] flex flex-col max-w-[800px] mx-auto border-x border-gray-50 text-[14px]">
      {/* Header */}
      <div className="bg-[#f5f5f5] px-6 py-6 border-b border-gray-100/50">
        <h1 className="text-[17px] font-bold text-black">닉네임 변경</h1>
      </div>

      <div className="px-6 pt-10 flex-1 flex flex-col">
          <div className="mb-3">
              <h3 className="text-[15px] font-bold text-black">이번 달 수정 가능 횟수 ({editCount}회/4회)</h3>
          </div>
          
          <div className="flex gap-2 mb-2">
              <input 
                  type="text" 
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="닉네임 입력(최대 8자)"
                  maxLength={8}
                  className="flex-1 min-w-0 h-[44px] px-3.5 border border-gray-300/80 rounded-[4px] text-[14px] focus:outline-none focus:border-black placeholder:text-gray-400 placeholder:font-light"
              />
              <button 
                onClick={handleSuggestion}
                className="px-5 h-[44px] border border-gray-200/80 rounded-[4px] text-[13px] font-medium text-black hover:bg-gray-50 whitespace-nowrap bg-white flex-shrink-0"
              >
                  닉네임 추천받기
              </button>
          </div>
          
          <p className="text-[13px] text-gray-500 mt-1 font-medium tracking-tight">현재 닉네임:{currentNickname}</p>
      </div>

      {/* Bottom Button */}
      <div className="px-6 pb-10">
          <button 
              onClick={handleSubmit}
              disabled={loading || nickname.trim().length === 0}
              className={`w-full h-[52px] rounded-[4px] font-bold text-[14px] transition-all duration-200 ${
                  nickname.trim().length > 0 
                      ? 'bg-black text-white hover:bg-gray-900' 
                      : 'bg-[#eeeeee] text-[#b4b4b4]'
              }`}
          >
              {loading ? "변경 중..." : "변경하기"}
          </button>
      </div>
    </div>
  );
}
