
import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { getMyPageDataAction } from "@/actions/user-actions";
import SettingsProfileSection from "./SettingsProfileSection";

// Reusable Menu Item Component
const SettingsMenuItem = ({
  title,
  subText,
  onClick,
  href,
}: {
  title: string;
  subText?: string;
  onClick?: () => void;
  href?: string;
}) => {
  const content = (
    <div className="flex items-center justify-between py-5 px-5 bg-white cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
      <div className="flex flex-col gap-1">
        <span className="text-[15px] text-black font-medium">{title}</span>
        {subText && <span className="text-[13px] text-gray-400">{subText}</span>}
      </div>
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
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return <div onClick={onClick}>{content}</div>;
};

export default async function SettingsPage() {
  const session = await auth();
  
  // Fetch real data
  const { user } = await getMyPageDataAction(session?.user?.id as string);

  return (
    <div className="bg-white flex justify-center min-h-screen">
      <div className="w-full max-w-[960px] bg-white relative shadow-sm">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white">
          <div className="flex items-center px-5 h-[56px]">
            <h1 className="text-[18px] font-bold text-black">설정</h1>
          </div>
        </header>

        {/* Profile Section */}
        <SettingsProfileSection user={user} />

        {/* Menu List */}
        <section className="border-t border-gray-100">
          <SettingsMenuItem
             title="회원정보 변경"
             subText="이름, 생년월일, 휴대폰번호, 이메일"
             href="/settings/check-password"
          />
          <SettingsMenuItem
             title="비밀번호 변경"
             href="/settings/password-change"
          />
          <SettingsMenuItem
             title="나의 맞춤 정보"
             subText="체형, 피부, 취향 정보 입력하고 상품 추천 받기"
             href="/settings/custom-info"
          />
          <SettingsMenuItem
             title="간편 로그인 설정"
             href="#"
          />
          <SettingsMenuItem
             title="배송지 관리"
             href="#"
          />
          <SettingsMenuItem
             title="환불 계좌 관리"
             href="#"
          />
          <SettingsMenuItem
             title="알림 설정"
             href="#"
          />
          <SettingsMenuItem
             title="브랜드 멤버십 연동"
             href="#"
          />
          <SettingsMenuItem
             title="회원 탈퇴"
             href="#"
          />
        </section>
      </div>
    </div>
  );
}
