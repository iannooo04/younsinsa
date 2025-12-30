// src/app/[locale]/(site)/mypage/page.tsx

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
// 2. 메인 페이지 컴포넌트
// ----------------------------------------------------------------------
export default function MyPage() {
  return (
    // 전체 배경은 흰색, 내용은 중앙 정렬
    <div className="bg-white flex justify-center">
      {/* 🛠️ [수정] 
         1. min-h-screen 제거: 컨텐츠 높이만큼만 배경을 차지하게 하여 푸터가 바로 붙도록 함
         2. pb-20 제거: 하단 내부 여백 제거
      */}
      <div className="w-full max-w-[960px] bg-[#F2F2F2] relative shadow-sm">
        {/* ================= Header Area ================= */}
        <header className="bg-white sticky top-0 z-50">
          <div className="flex items-center justify-between px-5 h-[56px]">
            <h1 className="text-[18px] font-bold text-black">마이</h1>
            <div className="flex items-center gap-4">
              {/* 알림 아이콘 */}
              <button className="p-1">
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
              </button>
              {/* 설정 아이콘 */}
              <button className="p-1">
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
              </button>
            </div>
          </div>
        </header>

        {/* ================= User Profile Section ================= */}
        <section className="bg-white pt-2 pb-6 px-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              {/* 아바타 이미지 (더미) */}
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-gray-200 border border-gray-100 relative">
                <Image
                  src="https://image.msscdn.net/images/goods_img/20230823/3476831/3476831_16927598863674_500.jpg" // 더미 이미지
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[18px] font-bold text-black">이안왕자</span>
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
            </div>
            <button className="border border-gray-200 rounded-[4px] px-2.5 py-1.5 text-[12px] font-medium text-black">
              스냅 프로필
            </button>
          </div>

          {/* 등급 배너 */}
          <div className="w-full bg-[#F3F8FF] rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer">
            <span className="text-[13px] font-bold text-[#0078FF]">
              LV.3 패밀리 · 0.5% 할인 · 최대 2.5% 적립 · 무료배송
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#0078FF"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </section>

        {/* ================= Stats Grid ================= */}
        <section className="bg-white border-t border-gray-100">
          <div className="grid grid-cols-3 py-5">
            {/* 적립금 */}
            <div className="flex flex-col px-5 border-r border-gray-100 cursor-pointer">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[12px] text-gray-800">적립금</span>
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
              <span className="text-[16px] font-bold text-black">5,637원</span>
            </div>

            {/* 이미리머니 */}
            <div className="flex flex-col px-5 border-r border-gray-100 cursor-pointer">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[12px] text-gray-800">이미리머니</span>
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
              <span className="text-[16px] font-bold text-black">충전하기</span>
            </div>

            {/* 쿠폰 */}
            <div className="flex flex-col px-5 cursor-pointer">
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
              <span className="text-[16px] font-bold text-black">249장</span>
            </div>
          </div>

          {/* 후기 작성 Row */}
          <div className="border-t border-gray-100">
            <MenuItem title="작성 가능한 후기 0개" />
          </div>
        </section>

        {/* ================= Banner 1 (Photo Booth) ================= */}
        <section className="mt-2 bg-white">
          <div className="w-full bg-[#E86F66] h-[70px] flex items-center justify-between px-6 relative overflow-hidden cursor-pointer">
            {/* 배너 텍스트 */}
            <div className="z-10 ml-[80px]">
              <p className="text-white text-[14px] font-bold">
                이미리 AI 포토부스
              </p>
              <p className="text-white text-[12px] opacity-90">
                AI로 내 사진을 특별하게 만들어보세요
              </p>
            </div>
            {/* 배너 장식 (노란 박스 등 - CSS로 흉내) */}
            <div className="absolute left-0 top-0 bottom-0 w-[80px] bg-[#F1E866] flex items-center justify-center">
              {/* 화살표 아이콘 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#999"
                className="w-5 h-5 ml-auto mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
            {/* 이미지 플레이스홀더 */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-gray-300 rounded overflow-hidden border-2 border-white z-20">
              <Image
                src="https://image.msscdn.net/images/goods_img/20230823/3476831/3476831_16927598863674_500.jpg" // 예시
                alt="AI"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ================= Menu Group 1 ================= */}
        <section className="mt-2 bg-white flex flex-col divide-y divide-gray-50">
          <MenuItem
            title="주문 내역"
            subText="온·오프라인, 상품권, 티켓 주문 내역 모아보기"
          />
          <MenuItem title="취소/반품/교환 내역" />
          <MenuItem title="재입고 알림 내역" />
          <MenuItem title="최근 본 상품" />
          <MenuItem
            title="이미리 USED"
            badge="신규"
            subText="무지 쉬운 중고 거래"
          />
          <MenuItem
            title="나의 맞춤 정보"
            subText="체형, 피부, 취향 정보 입력하고 상품 추천받기"
          />
        </section>

        {/* ================= Banner 2 (Benefits) ================= */}
        <section className="mt-2 bg-white py-4 px-5">
          <div className="w-full bg-[#F5F5F5] rounded-lg h-[64px] flex items-center justify-between px-4 relative overflow-hidden cursor-pointer">
            <div className="z-10">
              <p className="text-[13px] font-bold text-black">
                매일 새로운 미션 혜택받기
              </p>
              <p className="text-[12px] text-gray-500">
                무퀴즈, 래플 등 매일 쏟아지는 혜택
              </p>
            </div>
            {/* 우측 코인 이미지 영역 (색상으로 대체) */}
            <div className="w-[80px] h-full bg-black absolute right-0 top-0 flex items-center justify-center">
              <span className="text-white text-[10px]">COIN IMG</span>
            </div>
          </div>
        </section>

        {/* ================= Menu Group 2 ================= */}
        <section className="bg-white flex flex-col divide-y divide-gray-50">
          <MenuItem
            title="이벤트/회원혜택"
            badge="신규"
            subText="출석체크 등 매일 새로운 미션으로 혜택받기"
          />
          <MenuItem title="개선 의견/리서치 참여" />
          <MenuItem title="체험단 신청/응모 내역" />
          <MenuItem title="래플 응모 내역" />
          <MenuItem title="크리에이터 마켓플레이스" badge="신규" />
          <MenuItem title="이미리 큐레이터 서비스" badge="신규" />
          <MenuItem
            title="이미리머니/머니 상품권 등록"
            badge="신규"
            subText="친구에게 이미리를 선물하세요"
          />
        </section>

        {/* ================= Menu Group 3 ================= */}
        <section className="mt-2 bg-white flex flex-col divide-y divide-gray-50">
          <MenuItem title="이미리페이 관리" />
          <MenuItem
            title="이미리 현대카드 할인 정보"
            subText="이미리 첫 결제 즉시 할인과 카드 5% 청구할인받기"
          />
        </section>

        {/* ================= Menu Group 4 (CS) ================= */}
        <section className="mt-2 bg-white flex flex-col divide-y divide-gray-50">
          <MenuItem title="고객센터" />
          <MenuItem title="1:1 문의 내역" />
          <MenuItem title="상품 문의 내역" />
          <MenuItem title="공지사항" />
        </section>

        {/* ================= Footer (Logout) ================= */}
        {/* 🛠️ [수정] mb-10 제거하여 하단 여백 없애고 푸터와 붙도록 함 */}
        <section className="bg-white px-5 py-6 mt-2">
          <button className="text-[13px] text-gray-500 underline decoration-gray-400 underline-offset-4">
            로그아웃
          </button>
        </section>
      </div>
    </div>
  );
}
