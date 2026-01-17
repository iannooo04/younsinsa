// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { locales, type AppLocale } from "@/i18n/routing";

export const metadata = {
  title: "NKBUS | No.1 패션 플랫폼",
  description: "브랜드 패션부터 뷰티, 라이프스타일까지. NKBUS에서 당신만의 스타일을 완성하세요.",
};

function isAppLocale(value: string): value is AppLocale {
  return (locales as readonly string[]).includes(value);
}

import SessionProvider from "@/components/auth/SessionProvider";
import { ToastProvider } from "@/lib/contexts/ToastContext";
import { Toaster } from "sonner";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const localeParam = resolvedParams.locale;

  if (!isAppLocale(localeParam)) {
    notFound();
  }

  setRequestLocale(localeParam);

  const messages = await getMessages({ locale: localeParam });

  return (
    <NextIntlClientProvider locale={localeParam} messages={messages}>
      <SessionProvider>
        <ToastProvider>
        {children}
        <Toaster />
      </ToastProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
