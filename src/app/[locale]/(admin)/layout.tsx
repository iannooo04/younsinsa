// src/app/[locale]/(admin)/layout.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { ReactNode } from "react";
import { headers } from "next/headers";

import AdminSidebar from "@/components/admin/AdminSidebar";

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
    <div className="flex min-h-screen bg-base-200 text-base-content overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-base-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm px-3 py-1 bg-base-200 rounded-full font-medium">
              {authed ? `Level ${userLevel}` : "Guest"}
            </div>
            {/* Additional header items like notifications or user profile can go here */}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
