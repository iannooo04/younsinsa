"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface JoinStep2Props {
    onNext: () => void;
    onPrev: () => void;
}

export default function JoinStep2({ onNext, onPrev }: JoinStep2Props) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isFormValid = email.includes("@") && name.length >= 2 && password.length >= 8 && password === confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsLoading(true);
        setError(null);

        try {
            // Deriving username from email prefix for now
            const username = email.split("@")[0] + "_" + Math.random().toString(36).slice(2, 5);

            const response = await fetch("/api/member/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    name,
                    username,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "가입 중 오류가 발생했습니다.");
            }

            onNext();
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
                        className="input input-bordered w-full h-12 focus:ring-1 focus:ring-primary"
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
                        className="input input-bordered w-full h-12 focus:ring-1 focus:ring-primary"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold block">비밀번호</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="숫자, 영문, 특수문자 조합 최소 8자"
                            className="input input-bordered w-full h-12 pr-10 focus:ring-1 focus:ring-primary"
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
                            ? "bg-primary text-primary-content hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/20"
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
            </form>
        </div>
    );
}
