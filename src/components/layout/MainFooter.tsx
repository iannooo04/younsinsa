// src/components/layout/MainFooter.tsx

"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation"; // 경로 확인 훅

import { BasicInfoSettings } from "@/generated/prisma";

export default function MainFooter({ 
  basicInfo 
}: { 
  basicInfo?: BasicInfoSettings | null 
}) {
  const t = useTranslations("footer");
  const pathname = usePathname(); // 현재 경로 가져오기
  const searchParams = useSearchParams();
  const currentGf = searchParams?.get("gf") || "A";

  const getTabUrl = (key: string) => {
    switch (key) {
      case "nkbus":
        return `/main/nkbus/recommend?gf=${currentGf}`;
      case "golf":
        return `/main/golf/recommend?gf=${currentGf}`;
      case "player":
        return `/main/player/recommend?gf=${currentGf}`;
      case "women":
        return `/main/women/recommend?gf=${currentGf}`;
      case "shoes":
        return "/shoes";
      case "boutique":
        return "/boutique";
      default:
        return "#";
    }
  };

  // ✅ [수정] 장바구니(/orders/cart) 또는 좋아요(/like) 경로가 포함되면 푸터를 렌더링하지 않음
  if (
    pathname &&
    (pathname.includes("/orders/cart") || pathname.includes("/like"))
  ) {
    return null;
  }

  return (
    // 푸터 전체 배경색 bg-[#f9f9f9]
    <footer className="bg-[#f9f9f9] text-gray-600 mt-12">
      {/* 1. Top Service Tabs */}
      <div className="border-b border-gray-200 text-xs">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-3">
            {[
              "nkbus",
              "golf",
              "player",
              "women",
              "boutique",
              "shoes",
            ].map((key, idx) => (
              <Link
                key={idx}
                href={getTabUrl(key)}
                className={`px-3 py-1 font-bold cursor-pointer ${
                  idx === 0
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {t(`tabs.${key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Notice & Benefits & Payment Icons */}
      <div className="container mx-auto px-4 py-10 text-sm">
        <div className="flex flex-col">
          {/* (1) 공지사항 */}
          <div className="pb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-base text-black">
                {t("notice.title")}
              </h4>
              <Link
                href="#"
                className="text-gray-400 hover:text-black hover:underline text-xs"
              >
                {t("notice.viewAll")}
              </Link>
            </div>
            <ul className="space-y-3">
              {[0, 1, 2].map((idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center cursor-pointer hover:underline"
                >
                  <span className="truncate pr-4">
                    {t(`notice.items.${idx}`)}
                  </span>
                  <span className="text-gray-400 shrink-0 text-xs">
                    {t(`notice.dates.${idx}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* (2) 결제 혜택 */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-base text-black">
                {t("benefits.title")}
              </h4>
              <Link
                href="#"
                className="text-gray-400 hover:text-black hover:underline text-xs"
              >
                {t("benefits.viewAll")}
              </Link>
            </div>
            <ul className="space-y-3">
              {[0, 1, 2].map((idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer hover:underline"
                >
                  <span
                    className={`w-12 h-6 rounded-sm flex items-center justify-center text-[11px] font-bold shrink-0 ${
                      idx === 1
                        ? "bg-blue-500 text-white"
                        : "bg-yellow-400 text-black"
                    }`}
                  >
                    {t(`benefits.badges.${idx}`)}
                  </span>
                  <span className="truncate">{t(`benefits.items.${idx}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* (3) Payment Icons */}
          <div className="flex flex-wrap gap-3 opacity-70 grayscale mt-12">
            {[
              "VISA",
              "Master",
              "JCB",
              "AMEX",
              "AliPay",
              "WeChat",
            ].map((pay, i) => (
              <div
                key={i}
                className="bg-white border px-3 py-1.5 rounded text-xs font-bold text-gray-500"
              >
                {pay}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Footer Links & Legal */}
      <div className="border-t border-gray-200 pt-10 pb-20 text-sm">
        <div className="container mx-auto px-4">
          {/* Site Map Columns */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Column 1 */}
            <div>
              <h5 className="font-bold text-black mb-4">
                {t("sitemap.about.title")}
              </h5>
              <ul className="space-y-2 text-gray-500">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <li key={idx} className="hover:text-black cursor-pointer">
                    {t(`sitemap.about.items.${idx}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h5 className="font-bold text-black mb-4">
                {t("sitemap.store.title")}
              </h5>
              <ul className="space-y-2 text-gray-500">
                {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
                  <li key={idx} className="hover:text-black cursor-pointer">
                    {t(`sitemap.store.items.${idx}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h5 className="font-bold text-black mb-4">
                {t("sitemap.business.title")}
              </h5>
              <ul className="space-y-2 text-gray-500">
                {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
                  <li key={idx} className="hover:text-black cursor-pointer">
                    {t(`sitemap.business.items.${idx}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h5 className="font-bold text-black mb-4">
                {t("sitemap.partner.title")}
              </h5>
              <ul className="space-y-2 text-gray-500">
                {[0, 1, 2, 3].map((idx) => (
                  <li key={idx} className="hover:text-black cursor-pointer">
                    {t(`sitemap.partner.items.${idx}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5 */}
            <div>
              <h5 className="font-bold text-black mb-4">
                {t("sitemap.support.title")}
              </h5>
              <ul className="space-y-2 text-gray-500">
                {[0, 1, 2].map((idx) => {
                  const content = t(`sitemap.support.items.${idx}`);
                  if (idx === 1) { // FAQ
                    return (
                      <li key={idx} className="hover:text-black font-bold">
                        <Link href="/faq">{content}</Link>
                      </li>
                    );
                  }
                  return (
                    <li key={idx} className="hover:text-black cursor-pointer font-bold">
                      {content}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 text-gray-500 leading-relaxed">
                <p>{basicInfo?.csPhone || t("sitemap.support.phone")}</p>
                <p>{basicInfo?.operatingHours || t("sitemap.support.time")}</p>
                <p>{basicInfo?.csEmail || basicInfo?.repEmail || t("sitemap.support.email")}</p>
              </div>
            </div>
          </div>

          {/* Bottom Legal Info */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col gap-6">
              <div className="text-xs text-gray-400 leading-relaxed w-full">
                <p className="mb-2 font-bold text-gray-500">
                  {basicInfo?.shopName || "NKBUS"} | {t("legal.copyright")}
                </p>
                <p>
                  {basicInfo 
                    ? `${t("legal.companyLabel")}: ${basicInfo.companyName} | ${t("legal.ceoLabel")}: ${basicInfo.ceoName} | ${t("legal.addressLabel")}: ${basicInfo.address} ${basicInfo.addressDetail}`
                    : t("legal.companyInfo")
                  }
                  <br />
                  {basicInfo
                    ? `${t("legal.bizNumLabel")}: ${basicInfo.bizLicenseNum} | ${t("legal.onlineSalesLabel")}: ${basicInfo.onlineSalesLicense}`
                    : t("legal.bizInfo")
                  }
                </p>
                <p className="mt-2">
                  {t("legal.guarantee")}
                  <span className="underline cursor-pointer ml-1">
                    {t("legal.guaranteeCheck")}
                  </span>
                </p>
                <p className="mt-2 text-gray-300">{t("legal.disclaimer")}</p>

                <div className="flex flex-wrap gap-4 mt-4 font-bold text-gray-500">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <span key={idx} className="cursor-pointer hover:text-black">
                      {t(`legal.links.${idx}`)}
                    </span>
                  ))}
                </div>

                {/* 인증 정보 및 ISMS 로고 영역 */}
                <div className="mt-5 text-gray-500">
                  <p className="mb-2 hover:underline cursor-pointer">
                    {t("legal.ismsTitle")}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 opacity-60">
                      {/* ISMS Shield Icon SVG */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-gray-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.352-.199-2.668-.565-3.915a.75.75 0 00-.782-.587 11.209 11.209 0 01-7.887-3.079zM12 15.86a3.86 3.86 0 110-7.72 3.86 3.86 0 010 7.72z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-extrabold text-sm tracking-tighter">
                        ISMS
                      </span>
                    </div>
                    <span className="text-gray-400">{t("legal.ismsDesc")}</span>
                  </div>
                </div>
              </div>

              {/* Social Icons (왼쪽 하단) */}
              <div className="flex gap-3 shrink-0">
                {/* Instagram */}
                <Link
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.281.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.234-.047c-.78-.036-1.203-.166-1.484-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                  </svg>
                </Link>
                {/* Youtube (복구됨) */}
                <Link
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                  </svg>
                </Link>
                {/* X (Twitter) */}
                <Link
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                  </svg>
                </Link>
                {/* TikTok */}
                <Link
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
