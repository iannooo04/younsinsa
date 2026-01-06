"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useState } from "react";

export default function GuideSettingsPage() {
  const [countryTab, setCountryTab] = useState<"kr" | "cn">("kr");

  const [usageContent, setUsageContent] = useState({
    kr: `{rc_mallNm} 이용안내

■ 회원가입안내
    ① 저희 {rc_mallNm}은 기본적으로는 회원제로 운영하고 있습니다.
    ② 회원가입비나 월회비, 연회비등 어떠한 비용도 청구하지 않는 100% 무료 입니다.
    ③ 회원 가입시 기본 가입 축하금으로 OOO원 의 마일리지가 지급됩니다.
    ④ 구매시 상품별로 적용된 마일리지는는 OOO원 이상이면 사용하실 수가 있습니다.

■ 마일리지 제도
    ① 저희{rc_mallNm}은 마일리지를 사용할 수 있습니다.
    ② 마일리지 100점은 현금 100원과 같습니다.
    ③ 마일리지는 OOO원 이상되어야 사용하실 수가 있고 OOO원 이 넘는 금액의 적립금은 사용하실 수가 없습니다.`,
    cn: `{rc_mallNm} 使用指南

■ 会员注册指南
    ① 我们 {rc_mallNm} 基本上实行会员制运营。
    ② 注册费、月费、年费等不收取任何费用，100% 免费。
    ③ 注册会员时，将作为基本注册祝贺金支付 OOO 元的积分。
    ④ 购买时按商品适用的积分在 OOO 元以上即可使用。

■ 积分制度
    ① 我们 {rc_mallNm} 可以使用积分。
    ② 100 积分相当于 100 韩元现金。
    ③ 积分必须达到 OOO 元以上才能使用，超过 OOO 元金额的积分不能使用。`
  });

  const [withdrawalContent, setWithdrawalContent] = useState({
    kr: `{rc_mallNm} 탈퇴안내

회원님께서 회원 탈퇴를 원하신다니 저희 쇼핑몰의 서비스가 많이 부족하고 미흡했나 봅니다.
불편하셨던 점이나 불만사항을 알려주시면 적극 반영해서 고객님의 불편함을 해결해 드리도록 노력하겠습니다.

■ 아울러 회원 탈퇴시의 아래 사항을 숙지하시기 바랍니다.
1. 회원 탈퇴 시 회원님의 정보는 상품 반품 및 A/S를 위해 전자상거래 등에서의 소비자 보호에 관한 법률에 의거한
    고객정보 보호정책에따라 관리 됩니다.
2. 탈퇴 시 회원님께서 보유하셨던 마일리지는 삭제 됩니다`,
    cn: `{rc_mallNm} 注销指南

既然会员您希望注销会员，看来我们商城的服务还有很多不足和欠缺。
如果您能告知不论之处或不满事项，我们将积极反映，努力为您解决不便。

■ 此外，请在注销会员时熟知以下事项。
1. 注销会员时，会员的信息将根据电子商务等中的消费者保护相关法律，
    为了商品退货及 A/S 而根据客户信息保护政策进行管理。
2. 注销时会员持有的积分将被删除`
  });

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900">이용 / 탈퇴 안내</h1>
        <Button className="bg-red-500 hover:bg-red-600 text-white px-6 rounded-sm">
          <Save className="w-4 h-4 mr-2" />
          저장
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
