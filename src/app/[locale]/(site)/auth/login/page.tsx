// src/app/[locale]/(site)/auth/login/page.tsx

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import useLogin, { LoginFormValues } from "./hooks/useLogin";

export default function LoginPage() {
  const t = useTranslations("header"); // 임시로 header 네임스페이스 사용 (필요시 auth로 분리)
  const { form, onSubmit, isLoading, errorMessage } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 shadow-sm">
        {/* 헤더 영역 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-black tracking-tighter flex items-center justify-center gap-2">
            <span>YOUNSINSA</span>
            <span className="font-light text-gray-300 text-2xl">|</span>
            <span>FS-MALL</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            윤신사, FS-MALL를 하나의 계정으로 로그인하세요.
          </p>
        </div>

        {/* 로그인 폼 */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* 아이디 입력 */}
          <div>
            <input
              id="email"
              type="text"
              placeholder="통합계정 또는 이메일"
              {...register("email")}
              className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
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
              className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm`}
            />
            {/* 눈 아이콘 (비밀번호 표시 토글용 - UI만 구현) */}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400"
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
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* 에러 메시지 표시 */}
          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}

          {/* 로그인 버튼 */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </div>

          {/* 자동 로그인 및 링크들 */}
          <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
            <div className="flex items-center">
              <input
                id="auto-login"
                type="checkbox"
                {...register("autoLogin")}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="auto-login" className="ml-2 block text-sm">
                자동 로그인
              </label>
            </div>
            <div className="flex gap-2">
              <Link href="#" className="hover:text-black">
                아이디 찾기
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="#" className="hover:text-black">
                비밀번호 찾기
              </Link>
            </div>
          </div>
        </form>

        {/* 소셜 로그인 버튼들 */}
        <div className="mt-6 space-y-3">
          {/* 카카오 */}
          <button
            type="button"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-[#FEE500] hover:bg-[#FDD835] focus:outline-none"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 3C6.48 3 2 6.48 2 10.77c0 2.78 1.87 5.23 4.73 6.65-.21.78-.77 2.82-.88 3.23-.14.53.19.52.4.38.27-.18 4.26-2.88 4.93-3.37.27.04.54.06.82.06 5.52 0 10-3.48 10-7.77S17.52 3 12 3z" />
            </svg>
            카카오 시작하기
          </button>

          {/* Apple */}
          <button
            type="button"
            className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-black bg-white hover:bg-gray-50 focus:outline-none"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-.68-.32-1.35-.32-2.03 0-1.03.48-2.1.55-3.08-.4-1.92-1.87-2.92-4.75-1.93-7.5.76-2.12 2.63-3.1 4.58-3.1.95 0 1.77.37 2.45.65.68.27 1.3.27 1.98 0 .68-.28 1.5-.65 2.45-.65 1.7 0 3.27.75 4.18 2.05-3.62 1.75-3.03 6.3 1.05 7.95-.53 1.4-1.2 2.7-2.08 3.55zM12.03 7.25c-.15-2.23 1.68-4.08 3.75-4.25.25 2.3-2.03 4.38-3.75 4.25z" />
            </svg>
            Apple로 시작하기
          </button>
        </div>

        {/* 쿠폰 안내 문구 */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-900 font-medium">
            신규 가입 즉시 할인 쿠폰 지급
          </span>
          <Link
            href="/auth/signup"
            className="ml-2 text-xs border border-gray-300 rounded px-2 py-1 text-gray-600 hover:text-black hover:border-black transition-colors"
          >
            이메일 회원가입
          </Link>
        </div>
      </div>

      {/* 하단 비회원 주문 조회 */}
      <div className="max-w-md w-full mt-8 flex justify-between text-sm px-8">
        <span className="text-black font-medium">비회원으로 주문하셨나요?</span>
        <Link href="#" className="text-gray-500 hover:text-black underline">
          비회원 주문 조회
        </Link>
      </div>
    </div>
  );
}
