"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";

interface MainHeaderProps {
  authed?: boolean; // 로그인 여부
  userLevel?: number; // 유저 레벨
}

export default function MainHeader({ authed, userLevel }: MainHeaderProps) {
  const t = useTranslations("header");
  const locale = useLocale(); // 현재 언어 확인 (예: 'ko')
  const router = useRouter();
  const pathname = usePathname();

  // 언어 변경 핸들러
  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    // 배경: 검정, 텍스트: 흰색
    <header className="border-b border-gray-800 bg-black text-white relative z-40">
      {/* 1. Top Bar */}
      <div className="w-full px-4 text-xs py-2 flex justify-between items-center relative z-50 border-b border-gray-900">
        <div className="flex gap-4">
          <span>{t("topBar.brand")}</span>
          <span>{t("topBar.beauty")}</span>
          <span>{t("topBar.player")}</span>
          <span>{t("topBar.outlet")}</span>
        </div>

        <div className="flex gap-4 items-center">
          {authed ? (
            <>
              <span>
                {t("topBar.userPrefix")} Lv.{userLevel} {t("topBar.userSuffix")}
              </span>
              <span className="cursor-pointer hover:underline">
                {t("topBar.mypage")}
              </span>
              <span className="cursor-pointer hover:underline">
                {t("topBar.logout")}
              </span>
            </>
          ) : (
            <>
              <span className="cursor-pointer hover:underline">
                {t("topBar.login")}
              </span>
              <span className="cursor-pointer hover:underline">
                {t("topBar.join")}
              </span>
              <span className="cursor-pointer hover:underline">
                {t("topBar.mypage")}
              </span>
            </>
          )}

          {/* 🌐 언어 변경 드롭다운 */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-xs text-white flex items-center gap-1 px-1 hover:bg-gray-800"
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
              <span className="uppercase">{locale}</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-50 menu p-2 shadow bg-white text-black rounded-box w-32 border border-gray-200 mt-1"
            >
              <li>
                <button
                  className={locale === "ko" ? "active bg-gray-200" : ""}
                  onClick={() => handleLanguageChange("ko")}
                >
                  🇰🇷 한국어
                </button>
              </li>
              <li>
                <button
                  className={locale === "en" ? "active bg-gray-200" : ""}
                  onClick={() => handleLanguageChange("en")}
                >
                  🇺🇸 English
                </button>
              </li>
              <li>
                <button
                  className={locale === "ja" ? "active bg-gray-200" : ""}
                  onClick={() => handleLanguageChange("ja")}
                >
                  🇯🇵 日本語
                </button>
              </li>
              <li>
                <button
                  className={locale === "zh" ? "active bg-gray-200" : ""}
                  onClick={() => handleLanguageChange("zh")}
                >
                  🇨🇳 中文
                </button>
              </li>
              <li>
                <button
                  className={locale === "vi" ? "active bg-gray-200" : ""}
                  onClick={() => handleLanguageChange("vi")}
                >
                  🇻🇳 Tiếng Việt
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. Main Header (로고, 검색창, 아이콘) */}
      <div className="w-full px-4 py-6">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-black tracking-tighter text-white shrink-0"
          >
            YOUNSINSA
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-3xl relative mx-auto">
            {/* 🛠️ [수정] rounded-full -> rounded-lg (또는 rounded-md)로 변경하여 모서리만 살짝 깎음 */}
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="input input-bordered w-full rounded-lg border-transparent focus:outline-none bg-white text-black placeholder-gray-500 px-6 pr-12"
            />
            <button className="absolute right-5 top-1/2 -translate-y-1/2 text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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

          {/* Icons */}
          <div className="flex gap-6 items-center shrink-0">
            <button className="btn btn-ghost btn-circle text-white hover:bg-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button className="btn btn-ghost btn-circle text-white hover:bg-gray-800">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-red-600 text-white border-none">
                  2
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category Nav (하단 메뉴) */}
      <div className="bg-black text-white border-t border-gray-900">
        <div className="w-full px-4">
          <nav className="flex gap-5 py-3 text-sm font-bold overflow-x-auto whitespace-nowrap scrollbar-hide">
            <Link href="#" className="hover:text-gray-300 transition-colors">
              {t("nav.ranking")}
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              {t("nav.sale")}
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              {t("nav.brand")}
            </Link>
            <Link
              href="#"
              className="hover:text-gray-300 text-red-400 transition-colors"
            >
              {t("nav.seasonOff")}
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              {t("nav.outer")}
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              {t("nav.top")}
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              {t("nav.bottom")}
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              {t("nav.shoes")}
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              {t("nav.sport")}
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              {t("nav.beauty")}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
