// src/app/[locale]/(member)/layout.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { ReactNode } from "react";

export default function MemberLayout({ children }: { children: ReactNode }) {
  // 🛠️ [수정] max-w 제한을 완전히 제거하고, 중앙 정렬만 담당하도록 수정
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[#FAFAFA]">
      {children}
    </div>
  );
}
