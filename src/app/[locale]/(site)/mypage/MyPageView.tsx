"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// ----------------------------------------------------------------------
// 1. 공통 컴포넌트: 메뉴 아이템 (화살표 포함)
// ----------------------------------------------------------------------
interface MenuItemProps {
  title: string;
  subText?: string; // 타이틀 아래 작은 설명 (예: 할인 정보)
  badge?: string; // '신규' 뱃지 등
  hasArrow?: boolean;
  onClick?: () => void;
  className?: string;
}

const MenuItem = ({
  title,
  subText,
  badge,
  hasArrow = true,
  onClick,
  className = "",
}: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between py-4 px-5 bg-white cursor-pointer hover:bg-gray-50 transition-colors ${className}`}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-[15px] text-black font-medium">{title}</span>
          {badge && (
            <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded-sm font-bold">
              {badge}
            </span>
          )}
        </div>
        {subText && (
          <span className="text-[12px] text-gray-500 mt-1">{subText}</span>
        )}
      </div>

      {hasArrow && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#ccc"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// 2. 뷰 컴포넌트 (Props로 데이터 받음)
// ----------------------------------------------------------------------

// Define a type for the user data prop
interface MyPageViewProps {
  user: {
    id: string;
    name: string | null;
    nickname: string | null;
    image: string | null;
    mobile: string | null;
    email: string | null;
    info: {
      mileage: number;
      deposit: number;
      grade: {
        name: string;
        discountRate: number;
        mileageRate: number;
      } | null;
    } | null;
  } | null;
  reviewableCount?: number;
  couponCount?: number;
}

export default function MyPageView({ user, reviewableCount: _reviewableCount = 0, couponCount = 0 }: MyPageViewProps) {
  return (
    // 전체 배경은 흰색, 내용은 중앙 정렬
    <div className="bg-white flex justify-center">
      <div className="w-full max-w-[960px] bg-[#F2F2F2] relative shadow-sm">
        {/* ================= Header Area ================= */}
        <header className="bg-white sticky top-0 z-50">
          <div className="flex items-center justify-between px-5 h-[56px]">
            <h1 className="text-[18px] font-bold text-black">마이</h1>
            <div className="flex items-center gap-4">
              {/* 알림 아이콘 */}
              <Link href="/alerts" className="p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="black"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </Link>
              {/* 설정 아이콘 */}
              <Link href="/settings" className="p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="black"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </header>

        {/* ================= User Profile Section ================= */}
        <section className="bg-white pt-2 pb-6 px-5">
          <div className="flex items-center justify-between mb-5">
            <Link href="/settings" className="flex items-center gap-3">
              {/* 아바타 이미지 */}
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-200 border border-gray-100 relative flex items-center justify-center">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-[18px] font-bold text-black">{user?.nickname || user?.name || "로그인이 필요합니다"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-gray-400 -ml-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

        </section>

        {/* ================= Stats Grid ================= */}
        <section className="bg-white border-t border-gray-100">
          <div className="grid grid-cols-2 py-5">
            {/* 쿠폰 */}
            <div className="flex flex-col px-5 border-r border-gray-100 cursor-pointer">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[12px] text-gray-800">쿠폰</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-[16px] font-bold text-black">
                {couponCount.toLocaleString()}장
              </span>
            </div>

            {/* 나의 활동 */}
            <div className="flex flex-col px-5 cursor-pointer">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[12px] text-gray-800">나의 활동</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <ul className="flex items-center gap-4 text-[16px] font-bold text-black">
                <li>
                  <Link href="/mypage/reviews" className="hover:text-gray-600">
                    상품 후기
                  </Link>
                </li>
                <li>
                  <Link href="/mypage/inquiries" className="hover:text-gray-600">
                    상품 문의
                  </Link>
                </li>
              </ul>
            </div>
          </div>


        </section>



        {/* ================= Menu Group 1 ================= */}
        <section className="mt-2 bg-white flex flex-col divide-y divide-gray-50">
          <Link href="/mypage/orders">
            <MenuItem
              title="주문 내역"
              subText="온·오프라인, 상품권, 티켓 주문 내역 모아보기"
            />
          </Link>
          <Link href="/mypage/claims">
            <MenuItem title="취소/반품/교환 내역" />
          </Link>
          <Link href="/mypage/restock-alerts">
            <MenuItem title="재입고 알림 내역" />
          </Link>
          <Link href="/mypage/reviews">
            <MenuItem title="상품 후기" />
          </Link>
        </section>



        {/* ================= Menu Group 4 (CS) ================= */}
        <section className="mt-2 bg-white flex flex-col divide-y divide-gray-50">
          <Link href="/faq">
            <MenuItem title="고객센터" />
          </Link>
          <Link href="/mypage/inquiries">
            <MenuItem title="상품 문의 내역" />
          </Link>
          <Link href="/notices">
            <MenuItem title="공지사항" />
          </Link>
        </section>
      </div>
    </div>
  );
}
