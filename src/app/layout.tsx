// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NKBUS | No.1 패션 플랫폼",
  description: "브랜드 패션부터 뷰티, 라이프스타일까지. NKBUS에서 당신만의 스타일을 완성하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Root layout에서 locale별 lang을 동적으로 바꾸려면 구조가 더 필요함.
  // 우선 기본값으로 ko를 둠(Next-Intl은 별도로 locale을 주입).
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
