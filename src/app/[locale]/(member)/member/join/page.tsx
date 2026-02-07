"use client";

import React, { useState } from "react";
import JoinStep1 from "./JoinStep1";
import JoinStep2 from "./JoinStep2";
import JoinStep3 from "./JoinStep3";

export default function JoinPage() {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center py-10">
            <div className="w-full max-w-lg bg-white min-h-[600px] shadow-2xl rounded-[32px] overflow-hidden border border-white/20 backdrop-blur-xl transition-all duration-500">
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-base-200">
                    <div
                        className="h-full bg-black transition-all duration-700 ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                <div className="p-6 md:p-8">
                    {step === 1 && <JoinStep1 onNext={nextStep} />}
                    {step === 2 && <JoinStep2 onNext={nextStep} onPrev={prevStep} />}
                    {step === 3 && <JoinStep3 />}
                </div>
            </div>
        </main>
    );
}
