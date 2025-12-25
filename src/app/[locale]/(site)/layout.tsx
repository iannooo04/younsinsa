// src/app/[locale]/(site)/layout.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import MainHeader from "@/components/layout/MainHeader";
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
      <MainHeader authed={authed} userLevel={userLevel} />
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <MainFooter />
    </div>
  );
}
