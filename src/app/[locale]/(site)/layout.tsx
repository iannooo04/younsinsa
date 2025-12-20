export const dynamic = "force-dynamic";
export const revalidate = 0;

import MainHeader from "@/components/layout/MainHeader";
// [추가됨] 방금 만든 Footer 컴포넌트 불러오기
import MainFooter from "@/components/layout/MainFooter";
import { headers } from "next/headers";
import type { ReactNode } from "react";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const h = await headers();
  const authed = Boolean(h.get("x-user-id"));
  const rawLevel = h.get("x-user-level");
  const userLevel = Number.isFinite(Number(rawLevel)) ? Number(rawLevel) : 0;

  return (
    <div className="min-h-dvh bg-base-200 text-base-content flex flex-col">
      {/* 1. 상단 헤더 */}
      <MainHeader authed={authed} userLevel={userLevel} />

      {/* 2. 메인 콘텐츠 (flex-1로 남은 공간 차지) */}
      <main className="flex-1 w-full flex flex-col">{children}</main>

      {/* 3. [추가됨] 하단 푸터 */}
      <MainFooter />
    </div>
  );
}
