"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

interface JoinStep2Props {
    onNext: () => void;
    onPrev: () => void;
}

export default function JoinStep2({ onNext, onPrev }: JoinStep2Props) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isFormValid = email.includes("@") && name.length >= 2 && nickname.length >= 2 && password.length >= 8 && password === confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsLoading(true);
        setError(null);

        try {
            // Deriving username from email prefix for now
            const username = email.split("@")[0];

            const response = await fetch("/api/member/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    name,
                    username,
                    nickname,
                }),
            });

            const result = await response.json();

            if (response.status === 409) {
                setError(result.message || "이미 사용 중인 이메일 또는 닉네임입니다.");
                setIsLoading(false);
                return;
            }

            if (!response.ok) {
                throw new Error(result.message || "가입 중 오류가 발생했습니다.");
            }

            // Auto-login after registration
            const signInResult = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (signInResult?.error) {
                console.error("Auto-login failed:", signInResult.error);
            }

            onNext();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Registration error:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
                <h1 className="text-xl font-bold">이미리 통합계정 가입</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold block">이메일</label>
                    <input
                        type="email"
                        placeholder="이메일을 입력해 주세요"
                        className="input input-bordered w-full h-12 focus:ring-1 focus:ring-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <p className="text-[11px] text-base-content/40">이미리 통합계정에서 사용할 이메일입니다.</p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold block">이름</label>
                    <input
                        type="text"
                        placeholder="이름을 입력해 주세요"
                        className="input input-bordered w-full h-12 focus:ring-1 focus:ring-black"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold block">닉네임</label>
                    <input
                        type="text"
                        placeholder="닉네임을 입력해 주세요"
                        className="input input-bordered w-full h-12 focus:ring-1 focus:ring-black"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold block">비밀번호</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="숫자, 영문, 특수문자 조합 최소 8자"
                            className="input input-bordered w-full h-12 pr-10 focus:ring-1 focus:ring-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="비밀번호 재입력"
                            className="input input-bordered w-full h-12 pr-10 focus:ring-1 focus:ring-primary"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {error && (
                    <p className="text-sm text-error text-center bg-error/10 py-2 rounded">{error}</p>
                )}

                <div className="pt-8 space-y-3">
                    <button
                        type="submit"
                        className={`w-full py-4 rounded-lg font-bold transition-all ${isFormValid && !isLoading
                            ? "bg-black text-white hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-black/20"
                            : "bg-base-200 text-base-content/30 cursor-not-allowed"
                            }`}
                        disabled={!isFormValid || isLoading}
                    >
                        {isLoading ? <span className="loading loading-spinner"></span> : "이미리 통합계정 가입하기"}
                    </button>

                    <button
                        type="button"
                        className="w-full py-3 text-sm text-base-content/60 hover:text-base-content transition-colors font-medium"
                        onClick={onPrev}
                        disabled={isLoading}
                    >
                        이전 단계로
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-base-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-base-content/40">Or continue with</span>
                    </div>
                </div>

                <button
                    type="button"
                    className="w-full py-3 border border-base-300 rounded-lg flex items-center justify-center gap-2 hover:bg-base-50 transition-colors"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    <span className="font-medium text-sm">Google 계정으로 가입</span>
                </button>
            </form>
        </div>
    );
}
