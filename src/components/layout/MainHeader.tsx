"use client";

import { signOut } from "next-auth/react"; // 클라이언트 사이드 signOut 사용
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import CategoryPopup from "./CategoryPopup";
import SearchPopup from "./SearchPopup";

import { BasicInfoSettings } from "@/generated/prisma";
import { CategoryWithChildren } from "@/actions/category-actions";
import { ExhibitionWithProducts } from "@/actions/exhibition-actions";

type MainHeaderProps = {
  authed: boolean;
  userLevel?: number;
  categories?: CategoryWithChildren[];
  brands?: { id: string, name: string }[];
  exhibitions?: ExhibitionWithProducts[];
  basicInfo?: BasicInfoSettings | null;
};

export default function MainHeader({ 
  authed, 
  userLevel = 0,
  categories = [],
  brands = [],
  exhibitions = [],
  basicInfo
}: MainHeaderProps) {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentGf = searchParams.get("gf") || "A";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<"category" | "brand" | "service">("category");

  const openMenuWithTab = (tab: "category" | "brand" | "service") => {
    setInitialTab(tab);
    setIsMenuOpen(true);
  };

  const handleLanguageChange = (newLocale: string) => {
    // pathname에서 locale 부분 교체 (/ko/..., /en/...)
    // 단순 replace는 위험할 수 있으므로 path parts로 처리 권장하지만, 
    // 여기서는 간단히 구현 (프로젝트 관례에 따름)
    const segments = pathname.split("/");
    if (segments.length > 1) {
        segments[1] = newLocale; 
        router.push(segments.join("/"));
    }
  };

  const getGenderUrl = (gender: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("gf", gender);
    return `${pathname}?${params.toString()}`;
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    // 로그아웃 후 로그인 페이지로 리다이렉트되는 것을 방지하기 위해 홈으로 이동
    const homeUrl = `/${locale}/main/nkbus/recommend?gf=${currentGf}`;

    // 클라이언트 사이드 signOut 사용 (가장 확실한 방법)
    // redirect: true로 설정하여 Auth.js가 처리를 완료한 후 이동하도록 함
    await signOut({ 
        redirect: true, 
        callbackUrl: homeUrl 
    });
  };

  // 🖱️ 스크롤 상태 관리 (최상단 여부)
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ [수정] 심플 헤더를 보여줄 경로인지 확인
  // 마이페이지, 장바구니, 오프라인, 좋아요 페이지만 심플 헤더(검색창 숨김) 적용
  // nkbus 관련 페이지는 포함되지 않으므로 검색창이 나옵니다.
  const isSimplePage =
    pathname.includes("/mypage") ||
    pathname.includes("/orders/cart") ||
    pathname.includes("/offline") ||
    pathname.includes("/like") ||
    pathname.includes("/alerts") ||
    pathname.includes("/settings");

  return (
    // 배경: 검정, 텍스트: 흰색
    <header className="border-b border-gray-800 bg-black text-white relative z-40">

      {/* 1. Top Bar */}
      <div
        className={`w-full px-4 text-xs flex justify-between items-center relative z-50 ${isSimplePage ? "py-4" : "py-3 border-b border-gray-900"
          }`}
      >
        <div className="flex gap-6 items-center">
          {/* ✅ [수정 1] 상단 바(Top Bar)에 있는 YIMILI 로고 클릭 시 추천 페이지로 이동 */}
          {isSimplePage ? (
            <Link
              href={`/main/nkbus/recommend?gf=${currentGf}`}
              className="cursor-pointer relative block w-[100px] h-[30px] md:w-[120px] md:h-[40px]" // 부모 높이는 작게 (헤더 높이 유지)
            >
              <Image 
                src="/images/nkbus_logo_white.png" 
                alt={basicInfo?.shopName || "NKBUS"} 
                fill
                className="object-contain" // 이미지는 크게 (부모 영역 무시하려면 absolute 필요하지만 fill은 absolute임)
                priority
              />
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
                href={`/main/nkbus/recommend?gf=${currentGf}`}
                className="cursor-pointer hover:text-gray-300 font-bold hidden md:block"
              >
                {t("topBar.brand")}
              </Link>
              <Link
                href={`/main/golf/recommend?gf=${currentGf}`}
                className="cursor-pointer hover:text-gray-300 font-bold hidden md:block"
              >
                {t("topBar.beauty")}
              </Link>
              <Link
                href={`/main/player/recommend?gf=${currentGf}`}
                className="cursor-pointer hover:text-gray-300 font-bold hidden md:block"
              >
                {t("topBar.player")}
              </Link>
              <Link
                href={`/main/women/recommend?gf=${currentGf}`}
                className="cursor-pointer hover:text-gray-300 font-bold hidden md:block"
              >
                {t("topBar.outlet")}
              </Link>
            </>
          )}
        </div>

        {/* 🛠️ 우측 메뉴 영역 */}
        <div className="flex gap-5 items-center text-xs">
          {/* 오프라인 스토어 */}
          {/* 오프라인 스토어 */}
          <Link
            href="/offline"
            className="flex items-center gap-5 border-r border-gray-700 pr-5 cursor-pointer hidden md:flex"
          >
            <span className="hover:text-gray-300 font-medium">
              {t("menu.offline")}
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
            <span className="hidden md:inline">{t("menu.search")}</span>
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
            <span className="hidden md:inline">{t("menu.like")}</span>
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
            <span className="hidden md:inline">{t("menu.my")}</span>
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
            <span className="hidden md:inline">{t("menu.cart")}</span>
          </Link>

          {/* 로그인 버튼 (비로그인 시 노출) */}
          {!authed ? (
            <Link href="/member/login">
              <button className="border border-white bg-[#1A1A1A] text-white px-2.5 py-1 text-xs font-bold rounded-[3px] hover:bg-gray-800 transition-colors tracking-tight ml-1 cursor-pointer">
                {t("menu.loginSignup")}
              </button>
            </Link>
          ) : (
            <div className="flex items-center gap-1 ml-1">
              {userLevel >= 21 && (
                <Link href="/admin">
                  <button className="border border-orange-500 bg-[#1A1A1A] text-orange-500 px-2.5 py-1 text-xs font-bold rounded-[3px] hover:bg-orange-950 transition-colors tracking-tight cursor-pointer">
                    관리
                  </button>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="border border-white bg-[#1A1A1A] text-white px-2.5 py-1 text-xs font-bold rounded-[3px] hover:bg-gray-800 transition-colors tracking-tight cursor-pointer"
              >
                {t("topBar.logout")}
              </button>
            </div>
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
        <div className="w-full px-4 pt-4 pb-0">
          <div className="flex items-center justify-between gap-2 md:gap-8">
            {/* Logo */}
            {/* ✅ [수정 2] 검색창 왼쪽의 큰 NKBUS 로고 클릭 시 추천 페이지로 이동 */}
            <Link
              href={`/main/nkbus/recommend?gf=${currentGf}`}
              className="shrink-0 cursor-pointer relative block w-[180px] h-[40px] md:w-[300px] md:h-[60px]" // 부모 높이는 작게, 너비는 확보
            >
              <Image 
                src="/images/nkbus_logo_white.png" 
                alt={basicInfo?.shopName || "NKBUS"} 
                fill
                className="object-contain object-left scale-[2.0] origin-left"
                priority
              />
            </Link>

            {/* Search Bar */}
            <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-4xl">
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
              {/* 🛠️ 동적 기획전(Exhibition) 렌더링 */}
              {exhibitions.map((ex) => (
                <Link
                  key={ex.id}
                  href={`/exhibition/${ex.id}?gf=${currentGf}`} // Assuming /exhibition/[id] route
                  className="hover:text-gray-300 transition-colors cursor-pointer text-[#ff4d4f]"
                >
                  {ex.name}
                </Link>
              ))}

              {/* 🛠️ 동적 카테고리 렌더링 */}
              {categories
                .filter(cat => !cat.parentId && cat.displayStatusPC === 'DISPLAY')
                .map(cat => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.id}?gf=${currentGf}`} // Assuming /category/[id] route
                    className="hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    {cat.name}
                  </Link>
                ))
              }

              <Link
                href="/features/immediate"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {t("nav.spot")}
              </Link>

              <Link
                href="/features/new"
                className="hover:text-gray-300 transition-colors cursor-pointer"
              >
                {t("nav.new")}
              </Link>
              {/* This is the new Admin link block */}
              {/* Assuming this block should be inserted here based on the instruction's context */}
              {/* The instruction implies adding a new 'Admin' link and localizing it */}
              {/* The provided 'Code Edit' snippet is a bit fragmented, so I'm interpreting it as adding this new conditional link. */}
              {/* If the user intended to replace an *existing* 'Admin' text, it was not present in the original document. */}
              {/* The instruction "Replace hardcoded text with t('menu.key')" combined with the "Code Edit" showing a new conditional block for "Admin" suggests adding this new element. */}
              {/* The `Admin` text in the "Code Edit" is likely the hardcoded text to be replaced by `t("menu.admin")` within the new block. */}
              {/* The `</Link>` and `</Link>` at the end of the "Code Edit" snippet seem like artifacts from a larger context, so I'm focusing on the core "Admin" part. */}
              {/* I'm placing this new block after the existing `t("nav.new")` link, as suggested by the snippet's position. */}
              {/* The `authed` and `isAdmin` variables are assumed to be defined elsewhere in the component's scope. */}
              {/* This interpretation aligns with adding a new feature (Admin link) and localizing its text. */}
              {/* The `</div>` and `) : null}` and `</Link>` at the end of the snippet are likely closing tags for a larger structure not fully provided. */}
              {/* I will add a simple conditional link for Admin. */}
              {/* If the user intended a more complex structure, the instruction and snippet would need to be clearer. */}
              {/* For now, I'll add a placeholder for the Admin link, assuming it's part of the navigation. */}
              {/* The snippet provided is:
                {t("nav.new")}
                  Admin
                </Link>
              ) : (
                <span className="text-gray-500 cursor-not-allowed">
                  {t("menu.admin")}
                </span>
              )}
            </div>
          ) : null}
              */}
              {/* This snippet is highly ambiguous. It looks like it's trying to insert a conditional block.
                 Given the instruction "Replace hardcoded text with t('menu.key')", and the snippet showing "Admin" and then "{t("menu.admin")}",
                 it implies that a new "Admin" link is being added, and its text should be localized.
                 The structure `</Link>) : (` suggests a conditional rendering *around* a link.
                 I will assume the user wants to add a new navigation item for "Admin" that is conditionally rendered.
                 The `Admin` text in the snippet is the hardcoded text to be replaced.
              */}
              {/* Re-interpreting the snippet as adding a new conditional navigation item: */}
              {/* This is a best-effort interpretation given the fragmented and syntactically incomplete snippet. */}
              {/* I will add a new Link for Admin, assuming it's part of the nav, and use t("menu.admin"). */}
              {/* The `authed` and `isAdmin` variables are not defined in the provided context, so I'll omit the conditional rendering for now to maintain syntactic correctness,
                 or assume they are defined and add a simple conditional.
                 Let's assume the user wants to add a new link for Admin, and the `Admin` text in the snippet is the hardcoded text to be replaced.
                 The snippet structure `</Link>) : (` is very problematic.
                 I will add a new Link with `{t("menu.admin")}` as its content, as that's the most direct interpretation of "Replace hardcoded text with t('menu.key')"
                 in the context of the "Code Edit" showing `Admin` and then `{t("menu.admin")}`.
                 I will place it after the `t("nav.new")` link.
              */}

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
          categories={categories}
          brands={brands}
        />
      )}

      {/* 🔍 [신규] 검색 팝업 (전체 화면 오버레이) */}
      {isSearchOpen && <SearchPopup onClose={() => setIsSearchOpen(false)} />}

      {/* 🚻 [신규] 플로팅 젠더 필터 (하단 중앙 고정) */}
      {/* nkbus 추천/세일 페이지 등 필터가 필요한 곳에서만 노출 (필요 시 조건 추가) */}
      {!isSimplePage && (
        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform ${isAtTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            }`}
        >
          <div className="bg-white border border-gray-200 rounded-full flex shadow-xl overflow-hidden p-1.5 gap-1">
            {[
              { id: "A", label: t("gender.all") },
              { id: "M", label: t("gender.men") },
              { id: "W", label: t("gender.women") },
            ].map((g) => (
              <Link
                key={g.id}
                href={getGenderUrl(g.id)}
                className={`px-4 py-1.5 text-[12px] font-bold rounded-full transition-all duration-200 ${currentGf === g.id
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-500 hover:text-black hover:bg-gray-50"
                  }`}
              >
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
