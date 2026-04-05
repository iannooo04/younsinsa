"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toggleProductLikeAction, getUserLikedProductIdsAction } from "@/actions/like-actions";

// 무의미한 API 반복 호출을 막기 위한 전역 캐시
let cachedLikedIds: Set<string> | null = null;
let fetchPromise: Promise<string[]> | null = null;
let lastSessionId: string | null | undefined = undefined;

export default function LikeButton({ productId, initialIsLiked }: { productId: string | number, initialIsLiked?: boolean }) {
  const { data: session, status } = useSession();
  const [isLiked, setIsLiked] = useState(initialIsLiked ?? false);
  const [isLoading, setIsLoading] = useState(initialIsLiked === undefined);

  useEffect(() => {
    // 1. prop로 상태를 주입받은 경우 캐시나 API 호출 없이 즉시 렌더링
    if (initialIsLiked !== undefined) {
      setIsLiked(initialIsLiked);
      setIsLoading(false);
      return;
    }

    if (status === "loading") return;

    // 2. 세션이 바뀌면(로그인/로그아웃) 캐시 무효화
    const currentSessionId = session?.user?.id || null;
    if (lastSessionId !== undefined && lastSessionId !== currentSessionId) {
      cachedLikedIds = null;
      fetchPromise = null;
    }
    lastSessionId = currentSessionId;

    let isMounted = true;

    const fetchLikes = async () => {
      try {
        if (!fetchPromise) {
          fetchPromise = getUserLikedProductIdsAction().then(res => res.likedIds || []);
        }
        const ids = await fetchPromise;
        if (isMounted) {
          if (!cachedLikedIds) {
            cachedLikedIds = new Set(ids);
          }
          setIsLiked(cachedLikedIds.has(String(productId)));
          setIsLoading(false);
        }
      } catch (_err) {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchLikes();

    return () => { isMounted = false; };
  }, [productId, initialIsLiked, session, status]);

  const toggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 낙관적 업데이트 (Optimistic Update)
    const previousState = isLiked;
    setIsLiked(!isLiked);

    const res = await toggleProductLikeAction(String(productId));
    
    if (res.success) {
      if (cachedLikedIds) {
          if (res.isLiked) cachedLikedIds.add(String(productId));
          else cachedLikedIds.delete(String(productId));
      }
    } else {
      // 롤백
      setIsLiked(previousState);
      if (res.requireLogin) {
        alert("로그인이 필요한 기능입니다.");
      } else if (res.error) {
        alert(res.error);
      }
    }
  };

  return (
    <button 
      onClick={toggleLike}
      className={`absolute right-2 bottom-2 z-10 transition-transform active:scale-90 cursor-pointer p-1 ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
      disabled={isLoading}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isLiked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.7}
        stroke="currentColor"
        className={`w-[22px] h-[22px] transition-colors drop-shadow-md ${
          isLiked ? "text-red-500 stroke-transparent" : "text-gray-400 hover:text-red-400 bg-white/20 rounded-full"
        }`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    </button>
  );
}
