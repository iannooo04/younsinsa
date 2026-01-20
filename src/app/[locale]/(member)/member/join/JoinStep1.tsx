"use client";

import React, { useState } from "react";
import Link from "next/link";

interface JoinStep1Props {
    onNext: () => void;
}

export default function JoinStep1({ onNext }: JoinStep1Props) {
    const [agreements, setAgreements] = useState({
        all: false,
        age: false,
        service: false,
        marketing: false,
        ad: false,
    });

    const handleAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setAgreements({
            all: checked,
            age: checked,
            service: checked,
            marketing: checked,
            ad: checked,
        });
    };

    const handleChange = (name: keyof typeof agreements) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreements((prev) => {
            const next = { ...prev, [name]: e.target.checked };
            next.all = next.age && next.service && next.marketing && next.ad;
            return next;
        });
    };

    const isMandatoryAgreed = agreements.age && agreements.service;

    return (
        <div className="max-w-md mx-auto p-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
                <h1 className="text-xl font-bold">이미리 통합계정 이용 동의</h1>
                <div className="p-4 border rounded-lg bg-base-100 shadow-sm border-base-300">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-black text-2xl tracking-tighter">YIMILI</span>
                        <span className="text-base-300 text-2xl font-light">|</span>
                        <span className="font-bold text-xl">29CM</span>
                    </div>
                    <p className="text-xl font-bold leading-tight">
                        이미리와 29CM, 하나의 계정으로<br /> 더 편리하게 쇼핑하세요
                    </p>
                    <p className="text-sm text-base-content/60 mt-2">
                        이미리와 29CM의 회원 제도가 &apos;이미리 통합계정&apos;으로 합쳐집니다.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-md font-bold">이미리 통합계정 이용 약관 동의</h2>

                <div className="space-y-4 p-4 border rounded-lg border-base-300">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            checked={agreements.all}
                            onChange={handleAllChange}
                        />
                        <span className="font-bold">약관 전체 동의하기 (선택 동의 포함)</span>
                    </label>

                    <div className="divider my-0"></div>

                    <div className="space-y-4 ml-2">
                        <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={agreements.age}
                                    onChange={handleChange('age')}
                                />
                                <span className="text-sm">만 14세 이상입니다. (필수)</span>
                            </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={agreements.service}
                                    onChange={handleChange('service')}
                                />
                                <span className="text-sm">서비스 이용 약관 동의 (필수)</span>
                            </div>
                            <Link href="#" className="text-xs underline text-base-content/40 hover:text-primary transition-colors">자세히</Link>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={agreements.marketing}
                                    onChange={handleChange('marketing')}
                                />
                                <span className="text-sm">마케팅 목적의 개인정보 수집 및 이용 동의 (선택)</span>
                            </div>
                            <Link href="#" className="text-xs underline text-base-content/40 hover:text-primary transition-colors">자세히</Link>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={agreements.ad}
                                    onChange={handleChange('ad')}
                                />
                                <span className="text-sm">광고성 정보 수신 동의 (선택)</span>
                            </div>
                            <Link href="#" className="text-xs underline text-base-content/40 hover:text-primary transition-colors">자세히</Link>
                        </label>
                    </div>
                </div>
            </div>

            <div className="text-[10px] text-base-content/50 space-y-1">
                <p>• 약관에 동의하시면 같은 방식으로 본인인증한 29CM 계정과 연결되어 29CM의 약관도 함께 동의 처리됩니다.</p>
                <p>• 기존 약관에 동의하셨더라도 내용이 개정되었으므로 다시 동의가 필요합니다.</p>
                <p>• 선택 항목에 동의하지 않아도 통합계정과 적립금 서비스는 정상적으로 이용하실 수 있습니다.</p>
                <p>• 정보주체의 개인정보 및 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여 안전하게 관리하고 있습니다. 자세한 사항은 <Link href="#" className="underline">개인정보처리방침</Link> 에서 확인할 수 있습니다.</p>
            </div>

            <button
                className={`w-full py-4 rounded-lg font-bold transition-all ${isMandatoryAgreed
                        ? "bg-primary text-primary-content hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/20"
                        : "bg-base-200 text-base-content/30 cursor-not-allowed"
                    }`}
                disabled={!isMandatoryAgreed}
                onClick={onNext}
            >
                동의하고 본인인증하기
            </button>
        </div>
    );
}
