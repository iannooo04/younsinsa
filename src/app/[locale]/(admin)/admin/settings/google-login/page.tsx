"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";
import { getGoogleLoginSettingsAction, updateGoogleLoginSettingsAction } from "@/actions/basic-policy-actions";

export default function GoogleLoginSettingsPage() {
    const [isPending, startTransition] = useTransition();

    const [usage, setUsage] = useState("unused");
    const [clientId, setClientId] = useState("");
    const [clientSecret, setClientSecret] = useState("");

    // Callback URL state (derived from window location or default)
    const [callbackUrl, setCallbackUrl] = useState("https://your-mall.com/api/auth/callback/google");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCallbackUrl(`${window.location.origin}/api/auth/callback/google`);
        }
        
        const fetchData = async () => {
            const result = await getGoogleLoginSettingsAction();
            if (result.success && result.settings) {
                setUsage(result.settings.usage || "unused");
                setClientId(result.settings.clientId || "");
                setClientSecret(result.settings.clientSecret || "");
            }
        };
        fetchData();
    }, []);

    const handleSave = () => {
        startTransition(async () => {
            const result = await updateGoogleLoginSettingsAction({
                usage,
                clientId,
                clientSecret
            });
            if (result.success) {
                alert("저장되었습니다.");
            } else {
                alert(result.error || "저장 실패");
            }
        });
    };

    return (
        <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-gray-800 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 leading-none mt-2">구글 아이디 로그인 설정</h1>
                <Button 
                    className="h-9 px-8 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-[2px] font-bold border-0"
                    onClick={handleSave}
                    disabled={isPending}
                >
                    {isPending ? "저장 중..." : "저장"}
                </Button>
            </div>

            {/* Guide Box */}
            <div className="border border-gray-300 p-5 mb-8 bg-white">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                        <span className="w-5 h-5 rounded-full border border-red-500 text-red-500 flex items-center justify-center text-xs font-bold">!</span>
                    </div>
                    <div className="space-y-1.5">
                        <p className="font-bold text-gray-800 text-sm">구글 아이디 로그인 사용 시 주의사항</p>
                        <p className="text-gray-600">구글 아이디 로그인을 사용하기 위해서는 먼저 구글 클라우드 플랫폼에서 프로젝트 생성 및 API 키 발급이 필요합니다.</p>
                        <p className="text-gray-600">발급받은 Client ID와 Client Secret 키를 아래 설정에 정확히 입력해주세요.</p>
                        <p className="text-gray-600">Callback URI는 <span className="text-blue-600 font-medium">{callbackUrl}</span> 입니다. 구글 콘솔 설정 시 이 주소를 '승인된 리디렉션 URI'에 등록해주세요.</p>
                        <div className="pt-2">
                            <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline flex items-center gap-1">
                                구글 개발자 콘솔 바로가기 &gt;
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Section */}
            <div className="mb-0">
                <div className="flex items-center gap-1 mb-2">
                    <h2 className="font-bold text-sm text-gray-800 tracking-tight">구글 아이디 로그인 설정</h2>
                </div>

                <div className="border-t border-gray-400">
                    <div className="flex border-b border-gray-200 min-h-[50px]">
                        <div className="w-40 bg-[#F9F9F9] p-4 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
                            사용설정
                        </div>
                        <div className="flex-1 p-4 flex items-center">
                            <RadioGroup value={usage} onValueChange={setUsage} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="google-used" className="border-gray-300 text-red-500 focus:ring-red-500 w-4 h-4" />
                                    <Label htmlFor="google-used" className="text-gray-700 cursor-pointer text-xs">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="google-unused" className="border-gray-300 data-[state=checked]:border-red-500 data-[state=checked]:text-red-500 focus:ring-red-500 w-4 h-4" />
                                    <Label htmlFor="google-unused" className="text-gray-700 cursor-pointer text-xs font-bold md:font-normal">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-[#F9F9F9] p-4 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
                            Client ID <span className="text-red-500 ml-1">*</span>
                        </div>
                        <div className="flex-1 p-4">
                            <Input 
                                type="text" 
                                className="w-[400px] h-8 border border-gray-300 rounded-sm px-2 text-xs focus:outline-none focus:border-gray-400" 
                                placeholder="구글 콘솔에서 발급받은 Client ID 입력" 
                                value={clientId}
                                onChange={(e) => setClientId(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-[#F9F9F9] p-4 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
                            Client Secret <span className="text-red-500 ml-1">*</span>
                        </div>
                        <div className="flex-1 p-4">
                            <Input 
                                type="password" 
                                className="w-[400px] h-8 border border-gray-300 rounded-sm px-2 text-xs focus:outline-none focus:border-gray-400" 
                                placeholder="구글 콘솔에서 발급받은 Client Secret 입력"
                                value={clientSecret}
                                onChange={(e) => setClientSecret(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex border-b border-gray-200">
                        <div className="w-40 bg-[#F9F9F9] p-4 pl-4 font-normal text-gray-700 flex items-center border-r border-gray-200">
                            Callback URL
                        </div>
                        <div className="flex-1 p-4 flex items-center gap-2">
                            <Input 
                                type="text" 
                                className="w-[500px] h-8 border border-gray-300 rounded-sm px-2 text-xs bg-gray-50 text-gray-600" 
                                value={callbackUrl} 
                                readOnly 
                            />
                            <Button 
                                variant="outline" 
                                className="h-8 border-gray-300 text-xs bg-white text-gray-700 hover:bg-gray-50"
                                onClick={() => {
                                    navigator.clipboard.writeText(callbackUrl);
                                    alert('복사되었습니다.');
                                }}
                            >
                                복사
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="mt-auto pt-24 pb-6 text-center text-[10px] text-gray-400">
                © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
            </div>
        </div>
    );
}
