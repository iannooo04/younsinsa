// src/app/[locale]/(admin)/layout.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { ReactNode } from "react";
import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // admin 영역은 필요하면 여기서 x-user-level 등을 읽어 UI 분기 가능
  const h = await headers();
  const authed = Boolean(h.get("x-user-id"));
  const rawLevel = h.get("x-user-level");
  const userLevel = Number.isFinite(Number(rawLevel)) ? Number(rawLevel) : 0;

  return (
    <div className="min-h-dvh bg-base-200 text-base-content">
      <div className="border-b bg-base-100">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Admin</div>
          <div className="text-sm opacity-70">
            {authed ? `level ${userLevel}` : "guest"}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
    </div>
  );
}
