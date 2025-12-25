// src/app/[locale]/(member)/layout.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { ReactNode } from "react";

export default function MemberLayout({ children }: { children: ReactNode }) {
  // member 영역은 보통 헤더/푸터 없이 “센터 정렬” 로그인 UI가 많음
  return (
    <div className="min-h-dvh bg-base-200 text-base-content flex items-center justify-center p-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
