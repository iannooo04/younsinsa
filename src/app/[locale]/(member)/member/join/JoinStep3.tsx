"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, Home } from "lucide-react";

export default function JoinStep3() {
    return (
        <div className="max-w-md mx-auto p-4 space-y-10 py-16 text-center animate-in zoom-in fade-in duration-700">
            <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-gray-200 rounded-full blur-2xl animate-pulse"></div>
                    <CheckCircle2 size={80} className="text-gray-800 relative" strokeWidth={1.5} />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-black tracking-tight underline decoration-gray-300 decoration-8 underline-offset-4">WELCOME!</h1>
                    <p className="text-xl font-bold pt-2">반갑습니다!</p>
                    <p className="text-base-content/60">이미리 통합계정 가입이<br />성공적으로 완료되었습니다.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-10">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-3 bg-gray-800 text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-xl shadow-gray-200"
                >
                    <ShoppingBag size={20} />
                    쇼핑하러 가기
                </Link>
                <Link
                    href="/main"
                    className="flex items-center justify-center gap-3 border border-base-300 py-4 rounded-xl font-bold hover:bg-base-100 transition-colors"
                >
                    <Home size={20} />
                    메인 페이지로
                </Link>
            </div>

            <div className="p-6 bg-base-200/50 rounded-2xl border border-base-300/50">
                <p className="text-sm font-medium mb-1">지금 바로 첫 구매 혜택을 확인하세요!</p>
                <p className="text-xs text-base-content/50">가입 축하 쿠폰이 지급되었습니다.</p>
            </div>
        </div>
    );
}
