// src/app/[locale]/(site)/layout.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { auth } from "@/auth";
import type { ReactNode } from "react";
import { getBasicInfoSettingsAction } from "@/actions/basic-info-actions";
import { getCategoriesAction } from "@/actions/category-actions";
import { getBrandsAction } from "@/actions/brand-actions";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const authed = !!session?.user;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = session?.user as any;
  const userLevel = user?.level || 1;

  // Fetch basic info, categories, and brands for dynamic display
  const [basicInfoRes, categories, brands] = await Promise.all([
    getBasicInfoSettingsAction(),
    getCategoriesAction(),
    getBrandsAction()
  ]);

  const basicInfo = basicInfoRes.success ? basicInfoRes.settings : null;

  return (
    <div className="min-h-dvh bg-base-200 text-base-content flex flex-col">
      <MainHeader 
        authed={authed} 
        userLevel={userLevel} 
        categories={categories}
        brands={brands}
        basicInfo={basicInfo} 
      />
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <MainFooter basicInfo={basicInfo} />
    </div>
  );
}
