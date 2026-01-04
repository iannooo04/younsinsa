import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { useToast } from "@/lib/contexts/ToastContext";

// 유효성 검사 스키마 (Zod)
const loginSchema = z.object({
  email: z.string().min(1, "아이디 또는 이메일을 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
  autoLogin: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function useLogin() {
  const router = useRouter();
  const { showToast } = useToast();
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
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log("NextAuth signIn result:", result);

      if (result?.error) {
        let msg = "아이디 또는 비밀번호를 확인해주세요.";

        if (result.error.includes("USER_NOT_FOUND") || result.code === "USER_NOT_FOUND") {
          msg = "등록되지 않은 아이디입니다.";
        } else if (result.error.includes("INVALID_PASSWORD") || result.code === "INVALID_PASSWORD") {
          msg = "비밀번호가 일치하지 않습니다.";
        }

        showToast(msg, "error");
        setErrorMessage(msg);
        return;
      }

      if (result?.ok) {
        showToast("성공적으로 로그인되었습니다.", "success");
        // 로그인 성공 시 메인 페이지로 이동
        router.push("/");
        router.refresh();
      }
    } catch (error: any) {
      console.error("로그인 실패:", error);
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
