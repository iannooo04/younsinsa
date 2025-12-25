// src/app/[locale]/(site)/auth/login/hooks/useLogin.ts

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";

// 유효성 검사 스키마 (Zod)
const loginSchema = z.object({
  email: z.string().min(1, "아이디 또는 이메일을 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
  autoLogin: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function useLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      autoLogin: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // TODO: 실제 로그인 API 호출 로직 (예: fetch('/api/auth/login', ...))
      console.log("로그인 시도:", data);

      // (임시) 1초 후 로그인 성공 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 로그인 성공 시 메인 페이지로 이동
      router.push("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      setErrorMessage("아이디 또는 비밀번호를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    errorMessage,
  };
}
