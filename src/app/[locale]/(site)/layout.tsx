// src/app/[locale]/(site)/layout.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { auth } from "@/auth";
import type { ReactNode } from "react";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const authed = !!session?.user;
  const user = session?.user as any;
  const userLevel = user?.level || 1;

  return (
    <div className="min-h-dvh bg-base-200 text-base-content flex flex-col">
      <MainHeader authed={authed} userLevel={userLevel} />
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <MainFooter />
    </div>
  );
}
