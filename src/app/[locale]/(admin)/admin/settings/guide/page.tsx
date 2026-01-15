"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { getGuideSettingsAction, updateGuideSettingsAction } from "@/actions/basic-policy-actions";

interface GuideContent {
  kr: string;
  cn: string;
}

export default function GuideSettingsPage() {
  const [countryTab, setCountryTab] = useState<"kr" | "cn">("kr");
  const [isPending, startTransition] = useTransition();

  const [usageContent, setUsageContent] = useState<GuideContent>({ kr: "", cn: "" });
  const [withdrawalContent, setWithdrawalContent] = useState<GuideContent>({ kr: "", cn: "" });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getGuideSettingsAction();
      if (result.success && result.settings) {
        setUsageContent((result.settings.usageGuide as unknown as GuideContent) ?? { kr: "", cn: "" });
        setWithdrawalContent((result.settings.withdrawalGuide as unknown as GuideContent) ?? { kr: "", cn: "" });
      }
    };
    fetchData();
  }, []);

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateGuideSettingsAction({
        usageGuide: usageContent,
        withdrawalGuide: withdrawalContent
      });
      if (result.success) {
        alert("저장되었습니다.");
      } else {
        alert(result.error || "저장 실패");
      }
    });
  };

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900">이용 / 탈퇴 안내</h1>
        <Button 
            className="bg-red-500 hover:bg-red-600 text-white px-6 rounded-sm"
            onClick={handleSave}
            disabled={isPending}
        >
          <Save className="w-4 h-4 mr-2" />
          {isPending ? "저장 중..." : "저장"}
        </Button>
      </div>

       {/* Tabs */}
       <div className="space-y-4">
          {/* Country Tabs */}
          <div className="flex border-b border-gray-300">
            <button
                onClick={() => setCountryTab("kr")}
                className={`px-6 py-2 text-sm font-medium flex items-center gap-2 border-t border-l border-r rounded-t-sm h-10 min-w-[120px] justify-center ${
                    countryTab === "kr"
                    ? "bg-white text-gray-900 border-b-white -mb-px relative z-10 font-bold"
                    : "bg-gray-50 text-gray-500 border-b-gray-300"
                }`}
            >
                <span className="text-lg">🇰🇷</span> <span>기준몰</span>
            </button>
            <button
                onClick={() => setCountryTab("cn")}
                className={`px-6 py-2 text-sm font-medium flex items-center gap-2 border-t border-r rounded-t-sm h-10 min-w-[60px] justify-center ${
                    countryTab === "cn"
                    ? "bg-white text-gray-900 border-b-white -mb-px relative z-10 font-bold"
                    : "bg-gray-50 text-gray-500 border-b-gray-300"
                }`}
            >
                <span className="text-lg">🇨🇳</span> <span>중문몰</span>
            </button>
          </div>
      </div>

      {/* Usage Guide Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
          이용안내
          <span className="text-xs font-normal text-gray-400 border px-1 rounded cursor-help">?</span>
        </h2>
        
        <div className="border-t border-gray-400">
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700 align-middle">내용입력</th>
                <td className="p-4 bg-white">
                  <Textarea 
                      className="w-full min-h-[300px] border-gray-300 resize-y text-gray-600 text-sm leading-relaxed p-4"
                      value={usageContent[countryTab]}
                      onChange={(e) => setUsageContent(prev => ({...prev, [countryTab]: e.target.value}))}
                  />
                  <div className="mt-2 text-xs text-gray-500 flex items-start gap-1.5">
                    <span className="bg-gray-600 text-white min-w-[14px] h-[14px] flex items-center justify-center rounded-[2px] text-[10px] mt-0.5">!</span>
                    <div className="space-y-0.5">
                        <p>쇼핑몰명은 치환코드 &#123;rc_mallNm&#125;로 제공되며, 입력 시 기본정보 설정에 등록된 &quot;쇼핑몰명&quot;이 자동으로 표시됩니다.</p>
                        <p>등록한 내용은 쇼핑몰 하단의 [이용안내] 화면에 표시됩니다.</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdrawal Guide Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
          탈퇴안내
          <span className="text-xs font-normal text-gray-400 border px-1 rounded cursor-help">?</span>
        </h2>
        
        <div className="border-t border-gray-400">
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700 align-middle">내용입력</th>
                <td className="p-4 bg-white">
                  <Textarea 
                      className="w-full min-h-[300px] border-gray-300 resize-y text-gray-600 text-sm leading-relaxed p-4"
                      value={withdrawalContent[countryTab]}
                      onChange={(e) => setWithdrawalContent(prev => ({...prev, [countryTab]: e.target.value}))}
                  />
                  <div className="mt-2 text-xs text-gray-500 flex items-start gap-1.5">
                    <span className="bg-gray-600 text-white min-w-[14px] h-[14px] flex items-center justify-center rounded-[2px] text-[10px] mt-0.5">!</span>
                    <div className="space-y-0.5">
                        <p>쇼핑몰명은 치환코드 &#123;rc_mallNm&#125;로 제공되며, 입력 시 기본정보 설정에 등록된 &quot;쇼핑몰명&quot;이 자동으로 표시됩니다.</p>
                        <p>등록한 내용은 쇼핑몰 하단의 [이용안내] 화면에 표시됩니다.</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Buttons (Optional) */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
        <Button className="rounded-full w-12 h-12 bg-red-500 hover:bg-red-600 shadow-lg text-white p-0 flex items-center justify-center border-0">
             <span className="text-[10px] leading-tight flex flex-col items-center font-medium"><span>따라</span><span>하기</span></span>
        </Button>
        <Button className="rounded-full w-12 h-12 bg-purple-600 hover:bg-purple-700 shadow-lg text-white p-0 flex items-center justify-center border-0">
             <span className="text-[10px] leading-tight flex flex-col items-center font-medium"><span>따라</span><span>하기</span></span>
        </Button>
        <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0">
            <span className="text-xl">↑</span>
        </Button>
        <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0">
            <span className="text-xl">↓</span>
        </Button>
      </div>
    </div>
  );
}
