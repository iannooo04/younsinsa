// src/components/layout/MainHeader.tsx

"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import CategoryPopup from "./CategoryPopup"; // 분리한 컴포넌트 import
import SearchPopup from "./SearchPopup"; // 🛠️ [신규] 검색 팝업 import

interface MainHeaderProps {
  authed?: boolean; // 로그인 여부
  userLevel?: number; // 유저 레벨
}

export default function MainHeader({ authed, userLevel }: MainHeaderProps) {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // 🍔 햄버거 메뉴 토글 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🔍 검색 팝업 토글 상태 관리 (신규)
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [initialTab, setInitialTab] = useState<
    "category" | "brand" | "service"
  >("category");

  // 메뉴 열기 핸들러 (탭 지정 가능)
  const openMenuWithTab = (tab: "category" | "brand" | "service") => {
    setInitialTab(tab);
    setIsMenuOpen(true);
  };

  // 언어 변경 핸들러
  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  // ✅ [수정] 심플 헤더를 보여줄 경로인지 확인
  // 마이페이지, 장바구니, 오프라인, 좋아요 페이지만 심플 헤더(검색창 숨김) 적용
  // yimili 관련 페이지는 포함되지 않으므로 검색창이 나옵니다.
  const isSimplePage =
    pathname.includes("/mypage") ||
    pathname.includes("/orders/cart") ||
    pathname.includes("/offline") ||
    pathname.includes("/like");

  return (
    // 배경: 검정, 텍스트: 흰색
    <header className="border-b border-gray-800 bg-black text-white relative z-40">
      {/* 1. Top Bar */}
      <div
        className={`w-full px-4 text-xs flex justify-between items-center relative z-50 ${
          isSimplePage ? "py-4" : "py-3 border-b border-gray-900"
        }`}
      >
        <div className="flex gap-6 items-center">
          {/* ✅ [수정 1] 상단 바(Top Bar)에 있는 YIMILI 로고 클릭 시 추천 페이지로 이동 */}
          {isSimplePage ? (
            <Link
              href="/main/yimili/recommend?gf=A"
              className="text-xl font-black tracking-tighter text-white cursor-pointer"
            >
              YIMILI
            </Link>
          ) : (
            <>
              {/* 🍔 햄버거 버튼 */}
              <button
                onClick={() => openMenuWithTab("category")}
                className="p-1 hover:bg-gray-800 rounded-md transition-colors -mr-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              {/* 왼쪽 탭 메뉴 */}
              <Link
                href="/main/yimili/recommend?gf=A"
                className="cursor-pointer hover:text-gray-300 font-bold"
              >
                {t("topBar.brand")}
              </Link>
              <span className="cursor-pointer hover:text-gray-300 font-bold">
                {t("topBar.beauty")}
              </span>
              <span className="cursor-pointer hover:text-gray-300 font-bold">
                {t("topBar.player")}
              </span>
              <span className="cursor-pointer hover:text-gray-300 font-bold">
                {t("topBar.outlet")}
              </span>
            </>
          )}
        </div>

        {/* 🛠️ 우측 메뉴 영역 */}
        <div className="flex gap-5 items-center text-xs">
          {/* 오프라인 스토어 */}
          <Link
            href="/offline"
            className="flex items-center gap-5 border-r border-gray-700 pr-5 cursor-pointer"
          >
            <span className="hover:text-gray-300 font-medium">
              오프라인 스토어
            </span>
          </Link>

          {/* 검색 (아이콘 + 텍스트) */}
          <button
            onClick={() => setIsSearchOpen(true)} // 🛠️ [추가] 검색 버튼 클릭 시 팝업 오픈
            className="flex items-center gap-1 hover:text-gray-300 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <span>검색</span>
          </button>

          {/* 좋아요 (아이콘 + 텍스트) */}
          <Link
            href="/like/goods"
            className="flex items-center gap-1 hover:text-gray-300 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <span>좋아요</span>
          </Link>

          {/* 마이 (아이콘 + 텍스트) */}
          <Link
            href="/mypage"
            className="flex items-center gap-1 hover:text-gray-300 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <span>마이</span>
          </Link>

          {/* 장바구니 (아이콘 + 텍스트) */}
          <Link
            href="/orders/cart"
            className="flex items-center gap-1 hover:text-gray-300 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span>장바구니</span>
          </Link>

          {/* 로그인 버튼 (비로그인 시 노출) */}
          {!authed && (
            <Link href="/member/login">
              <button className="border border-white bg-[#1A1A1A] text-white px-2.5 py-1 text-xs font-bold rounded-[3px] hover:bg-gray-800 transition-colors tracking-tight ml-1 cursor-pointer">
                로그인 / 회원가입
              </button>
            </Link>
          )}

          {/* 🌐 언어 변경 드롭다운 */}
          <div className="dropdown dropdown-end ml-1">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-xs text-white flex items-center gap-1 px-1 hover:bg-gray-800 h-auto min-h-0 py-1 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S12 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <span className="uppercase text-[10px]">{locale}</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-50 menu p-2 shadow bg-white text-black rounded-box w-32 border border-gray-200 mt-1"
            >
              <li>
                <button
                  className={
                    locale === "ko"
                      ? "active bg-gray-200 w-full text-left"
                      : "w-full text-left"
                  }
                  onClick={() => handleLanguageChange("ko")}
                >
                  🇰🇷 한국어
                </button>
              </li>
              <li>
                <button
                  className={
                    locale === "en"
                      ? "active bg-gray-200 w-full text-left"
                      : "w-full text-left"
                  }
                  onClick={() => handleLanguageChange("en")}
                >
                  🇺🇸 English
                </button>
              </li>
              <li>
                <button
                  className={
                    locale === "ja"
                      ? "active bg-gray-200 w-full text-left"
                      : "w-full text-left"
                  }
                  onClick={() => handleLanguageChange("ja")}
                >
                  🇯🇵 日本語
                </button>
              </li>
              <li>
                <button
                  className={
                    locale === "zh"
                      ? "active bg-gray-200 w-full text-left"
                      : "w-full text-left"
                  }
                  onClick={() => handleLanguageChange("zh")}
                >
                  🇨🇳 中文
                </button>
              </li>
              <li>
                <button
                  className={
                    locale === "vi"
                      ? "active bg-gray-200 w-full text-left"
                      : "w-full text-left"
                  }
                  onClick={() => handleLanguageChange("vi")}
                >
                  🇻🇳 Tiếng Việt
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Main Header (로고 & 검색창 영역) - ✅ [수정] 심플 페이지가 아닐 때만 노출 */}
      {!isSimplePage && (
        <div className="w-full px-4 py-6">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            {/* ✅ [수정 2] 검색창 왼쪽의 큰 YIMILI 로고 클릭 시 추천 페이지로 이동 */}
            <Link
              href="/main/yimili/recommend?gf=A"
              className="text-3xl font-black tracking-tighter text-white shrink-0"
            >
              YIMILI
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-5xl relative mx-auto">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                onClick={() => setIsSearchOpen(true)} // 🛠️ [추가] 인풋 클릭 시 팝업 오픈
                className="input input-bordered w-full rounded-lg border-transparent focus:outline-none bg-white text-black placeholder-gray-500 px-6 pr-12 h-9 text-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-black cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Category Nav (하단 메뉴) - ✅ [수정] 심플 페이지가 아닐 때만 노출 */}
      {!isSimplePage && (
        <div className="bg-black text-white border-t border-gray-900 relative">
          <div className="w-full px-4 flex items-center">
            {/* 네비게이션 항목 */}
            <nav className="flex gap-5 py-3 text-sm font-bold overflow-x-auto whitespace-nowrap scrollbar-hide">
              {/* 🛠️ [수정] TOPSALE 버튼 경로 수정 */}
              <Link
                href="/main/yimili/recommend?gf=A"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {t("nav.bestseller")}
              </Link>

              {/* 🛠️ [추가] Special Offer 버튼 경로 수정: /main/yimili/sale?gf=A */}
              <Link
                href="/main/yimili/sale?gf=A"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                Special Offer
              </Link>

              <Link
                href="/category/104003"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {t("nav.women")}
              </Link>
              <Link
                href="/category/104002"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {t("nav.shoes")}
              </Link>
              <Link
                href="/category/104009"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {t("nav.swimwear")}
              </Link>
              <Link
                href="/category/104009"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {t("nav.yoga")}
              </Link>
              <Link
                href="/category/104007"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {t("nav.accessories")}
              </Link>
              <Link
                href="/category/104006"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {t("nav.pants")}
              </Link>
              <Link
                href="/features/immediate"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {t("nav.spot")}
              </Link>
              <Link
                href="/features/sale"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {t("nav.special")}
              </Link>
              <Link
                href="/features/new"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {t("nav.new")}
              </Link>
              <Link
                href="/features/event"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {t("nav.activity")}
              </Link>
              {/* 주황색 텍스트 */}
              <Link
                href="/features/proxy"
                className="text-orange-500 hover:text-orange-400 transition-colors cursor-pointer"
              >
                {t("nav.agent")}
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* 🆕 팝업 메가 메뉴 (초기 탭 전달) */}
      {isMenuOpen && (
        <CategoryPopup
          onClose={() => setIsMenuOpen(false)}
          initialTab={initialTab}
        />
      )}

      {/* 🔍 [신규] 검색 팝업 (전체 화면 오버레이) */}
      {isSearchOpen && <SearchPopup onClose={() => setIsSearchOpen(false)} />}
    </header>
  );
}
