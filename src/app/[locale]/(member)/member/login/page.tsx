// src/app/[locale]/(member)/member/login/page.tsx

"use client";

import { Link } from "@/i18n/routing";
import useLogin from "./hooks/useLogin";

export default function LoginPage() {
  const { form, onSubmit, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    // 1. 화면 고정 (스크롤 방지)
    <div className="h-screen w-full bg-[#F9F9F9] flex flex-col justify-center items-center overflow-hidden">
      {/* 2. 컨텐츠 래퍼 (너비 600px 유지) */}
      <div className="w-[600px]">
        {/* 상단 타이틀 */}
        <h1 className="text-[20px] font-bold text-black mb-5 tracking-tight self-start pl-0">
          로그인/회원가입
        </h1>

        {/* 3. 로그인 컨테이너 (흰색 배경) */}
        {/* - px-[60px]: 좌우 여백을 충분히 주어 내부 컨텐츠 너비를 480px로 맞춤 (사진 비율)
           - pt-12 pb-12: 상하 여백 적절히 배치
        */}
        <div className="w-full bg-white px-[60px] pt-[50px] pb-[50px] rounded-[2px]">
          {/* 로고 영역 */}
          <div className="text-center mb-10">
            <h2 className="flex items-center justify-center gap-3 mb-2">
              <span className="text-[28px] font-black tracking-tighter text-black font-sans">
                NKBUS
              </span>
            </h2>
            <p className="text-[13px] text-black tracking-tight font-medium">
              NKBUS를 하나의 계정으로 로그인하세요.
            </p>
          </div>

          {/* 로그인 폼 */}
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            {/* 아이디 입력 */}
            <div>
              <input
                id="email"
                type="text"
                placeholder="통합계정 또는 이메일"
                {...register("email")}
                // 🛠️ [복원] h-[42px] -> h-[50px] (사진과 같은 높이로 복원)
                className={`block w-full h-[50px] px-4 border ${errors.email ? "border-red-500" : "border-[#E5E5E5]"
                  } rounded-[3px] text-[14px] placeholder-[#B2B2B2] text-black focus:outline-none focus:border-black transition-colors`}
              />
              {errors.email && (
                <p className="text-red-500 text-[12px] mt-1 text-left pl-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="비밀번호"
                {...register("password")}
                // 🛠️ [복원] h-[42px] -> h-[50px]
                className={`block w-full h-[50px] px-4 border ${errors.password ? "border-red-500" : "border-[#E5E5E5]"
                  } rounded-[3px] text-[14px] placeholder-[#B2B2B2] text-black focus:outline-none focus:border-black transition-colors`}
              />
              {/* 눈 아이콘 */}
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#B2B2B2] hover:text-black cursor-pointer"
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              {errors.password && (
                <p className="text-red-500 text-[12px] mt-1 text-left pl-1">
                  {errors.password.message}
                </p>
              )}
            </div>


            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              // 🛠️ [복원] h-[42px] -> h-[50px]
              className="w-full h-[50px] flex justify-center items-center bg-black hover:bg-[#333] text-white text-[14px] font-bold rounded-[3px] focus:outline-none disabled:opacity-50 mt-2"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>

            {/* 자동 로그인 및 링크 */}
            <div className="flex items-center justify-between mt-3 text-[13px] text-[#888888]">
              <div className="flex items-center">
                <input
                  id="auto-login"
                  type="checkbox"
                  {...register("autoLogin")}
                  className="w-[18px] h-[18px] border-[#D3D3D3] rounded-[2px] text-black focus:ring-0 cursor-pointer accent-black mr-2"
                />
                <label
                  htmlFor="auto-login"
                  className="cursor-pointer select-none tracking-tight"
                >
                  자동 로그인
                </label>
              </div>
              <div className="flex items-center gap-3 tracking-tight">
                <Link href="#" className="hover:text-black transition-colors">
                  아이디 찾기
                </Link>
                <span className="text-[#E5E5E5] text-[10px] h-[10px] border-r border-[#E5E5E5]"></span>
                <Link href="#" className="hover:text-black transition-colors">
                  비밀번호 찾기
                </Link>
              </div>
            </div>
          </form>



          {/* 하단 회원가입 유도 */}
          <div className="mt-8 text-center flex items-center justify-center gap-2">
            <span className="text-[13px] text-black font-medium tracking-tight">
              신규 가입 즉시 할인 쿠폰 지급
            </span>
            <Link
              href="/member/join"
              className="inline-block text-[11px] font-bold border border-[#E5E5E5] rounded-[3px] px-3 py-[6px] text-[#333] bg-white hover:text-black hover:border-black transition-colors"
            >
              이메일 회원가입
            </Link>
          </div>

          {/* 최하단 비회원 주문 조회 (하단 여백 확보) */}
          <div className="mt-20 flex justify-between items-center text-[13px]">
            <span className="text-black font-bold tracking-tight">
              비회원으로 주문하셨나요?
            </span>
            <Link
              href="#"
              className="text-black font-bold border-b border-black pb-[1px] hover:opacity-70 leading-tight"
            >
              비회원 주문 조회
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
