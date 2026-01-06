"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Save } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface AgreementItem {
  id: number;
  title: string;
  content: string;
}

interface AgreementSection {
  usage: string;
  items: AgreementItem[];
}

interface MarketingSection {
  usage: string;
  content: string;
}

interface TermsConfig {
  standardUsage: string;
  applyDateYear: string;
  applyDateMonth: string;
  applyDateDay: string;
  ftcLogo: string;
}

interface PrivacyOfficer {
  name: string;
  position: string;
  department: string;
  phone: string;
  emailId: string;
  emailDomain: string;
}

export default function TermsSettingsPage() {
  const [activeTab, setActiveTab] = useState("terms"); // 'terms', 'privacy', 'collect'
  const [countryTab, setCountryTab] = useState<"kr" | "cn">("kr");

  const [termsContent, setTermsContent] = useState({
    kr: `제1조(목적)

표준약관 제10023호

이 약관은 {rc_companyNm} 회사(전자거래 사업자)가 운영하는 {rc_mallNm} 사이버 몰(이하 “몰”이라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버몰과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
※ 「PC통신등을 이용하는 전자거래에 대해서도 그 성질에 반하지 않는한 이 약관을 준용합니다」

제2조(정의)

① “몰”이란 {rc_companyNm} 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
② “이용자”란 “몰”에 접속하여 이 약관에 따라 “몰”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
③ ‘회원’이라 함은 “몰”에 개인정보를 제공하여 회원등록을 한 자로서, “몰”의 정보를 지속적으로 제공받으며, “몰”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
④ ‘비회원’이라 함은 회원에 가입하지 않고 “몰”이 제공하는 서비스를 이용하는 자를 말합니다.

제3조(약관등의 명시와 설명 및 개정)

① “몰”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호·모사전송번호·전자우편주소, 사업자등록번호, 통신판매업신고번호, 개인정보 보호책임자등을 이용자가 쉽게 알 수 있도록 “몰”의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
② “몰”은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회·배송책임·환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
③ “몰”은 전자상거래등에서의소비자보호에관한법률, 약관의규제에관한법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진등에관한법률, 방문판매등에관한법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.`,
    cn: `第1条（目的）

标准条款第10023号

本条款旨在规定利用{rc_companyNm}公司（电子交易运营商）运营的{rc_mallNm}网络商城（以下简称“商城”）提供的互联网相关服务（以下简称“服务”）时，网络商城与用户的权利、义务及责任事项。
※ 「对于利用PC通信等的电子交易，只要不违背其性质，准用本条款」

第2条（定义）

① “商城”是指{rc_companyNm}公司为了向用户提供财物或劳务，利用计算机等信息通信设备设定为可以交易财物或劳务的虚拟营业场所，同时也作为运营网络商城的运营商的含义使用。
② “用户”是指接入“商城”，根据本条款接受“商城”提供的服务的会员及非会员。`
  });

  const [termsConfig, setTermsConfig] = useState<{ kr: TermsConfig; cn: TermsConfig }>({
    kr: {
      standardUsage: "standard",
      applyDateYear: "",
      applyDateMonth: "",
      applyDateDay: "",
      ftcLogo: "none"
    },
    cn: {
      standardUsage: "standard",
      applyDateYear: "",
      applyDateMonth: "",
      applyDateDay: "",
      ftcLogo: "none"
    }
  });

  const [privacyContent, setPrivacyContent] = useState({
    kr: `[ 개인정보처리방침 ]

{rc_mallNm}(주)는 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개하며, 본 개인정보처리방침을 홈페이지 첫 화면에 공개함으로써 이용자들이 언제나 용이하게 보실 수 있도록 조치하고 있습니다. 개인정보 처리방침은 정부의 법률 및 지침 변경이나 회사의 내부 방침 변경 등으로 인하여 수시로 변경될 수 있고, 이에 따른 개인정보 처리방침의 지속적인 개선을 위하여 필요한 절차를 정하고 있습니다. 이용자들께서는 사이트 방문 시 수시로 확인하시기 바랍니다.

{rc_mallNm}(주)의 개인정보 처리방침은 다음과 같은 내용을 담고 있습니다.

1. 개인정보 수집에 대한 동의
2. 수집하는 개인정보 항목 및 수집방법
3. 개인정보의 수집 및 이용목적
4. 수집하는 개인정보의 보유 및 이용기간
5. 개인정보의 파기 절차 및 방법
6. 수집한 개인정보의 공유 및 제공
7. 이용자 자신의 개인정보 관리(열람,정정,삭제 등)에 관한 사항
8. 쿠키(Cookie)의 운용 및 거부
9. 개인정보의 위탁처리
10. 개인정보보호를 위한 기술적/관리적 대책
11. 개인정보 관련 의견수렴 및 불만처리에 관한 사항`,
    cn: `[ 隐私政策 ]

{rc_mallNm}（株）为了保护用户的个人信息并迅速、顺利地处理相关投诉，特制定并公开如下个人信息处理方针...`
  });

  const [privacyOfficer, setPrivacyOfficer] = useState<{ kr: PrivacyOfficer; cn: PrivacyOfficer }>({
    kr: {
      name: "",
      position: "",
      department: "",
      phone: "",
      emailId: "",
      emailDomain: "직접입력"
    },
    cn: {
      name: "",
      position: "",
      department: "",
      phone: "",
      emailId: "",
      emailDomain: "직접입력"
    }
  });

  // State for Personal Information Collection Agreement Items (Localized)
  const initialCollectMemberRequired = `회사는 회원가입, 민원 등 고객상담 처리, 본인확인(14세 미만 아동 확인) 등 의사소통을 위한 정보 활용 및 이벤트 등과 같은 마케팅용도 활용, 회원의 서비스 이용에 대한 통계, 이용자들의 개인정보를 통한 서비스 개발을 위해 아래와 같은 개인정보를 수집하고 있습니다.

1. - 목적 : 이용자 식별 및 본인여부 확인
   - 항목 : 이름, 아이디, 비밀번호,닉네임, 이메일, 휴대폰번호, 주소, 전화번호 등
   - 보유 및 이용기간 : 회원탈퇴 후 5일까지

2. - 목적 : 민원 등 고객 고충처리
   - 항목 : 이름, 아이디, 이메일, 휴대폰번호, 전화번호, 주소, 구매자정보,결제정보,상품 구매/취소/교환/반품/환불 정보, 수령인 정보
   - 보유 및 이용기간 : 회원탈퇴 후 5일까지

3. - 목적 : 만 14세 미만 아동 확인`;

  const [collectMemberRequired, setCollectMemberRequired] = useState<{ kr: string; cn: string }>({
    kr: initialCollectMemberRequired,
    cn: initialCollectMemberRequired, // Placeholder for CN
  });

  const initialCollectMemberOptionalCollection: AgreementSection = {
    usage: 'none',
    items: [
      {
        id: 1,
        title: '주문/결제 및 배송서비스',
        content: `회사는 주문 시 구매 및 대금결제와 물품배송 또는 청구지 발송, 불만 처리 등을 원활하게 진행하기 위해 아래와 같은 개인정보를 수집하고 있습니다.

- 수집/이용목적 : 주문/결제 시 상품 배송
- 수집항목 : 구매자정보(이름,전화번호,휴대폰번호,이메일), 상품 구매/취소/반품/교환/환불 정보, 수령인 정보(이름, 주소, 전화번호, 휴대폰번호)`
      }
    ]
  };

  const [collectMemberOptionalCollection, setCollectMemberOptionalCollection] = useState<{ kr: AgreementSection; cn: AgreementSection }>({
    kr: initialCollectMemberOptionalCollection,
    cn: JSON.parse(JSON.stringify(initialCollectMemberOptionalCollection)), // Deep copy for initial state
  });

  const initialCollectMemberOptionalDelegation: AgreementSection = {
    usage: 'none',
    items: [
      {
        id: 1,
        title: '고객 클래임 처리를 위한 CS 위탁',
        content: `회사는 보다 나은 서비스 제공 및 이용자의 민원 등 고객상담 처리에 대해 원활한 업무 수행을 위해 아래와 같이 외부 전문업체에 위탁하여 운영하고 있습니다.

- 개인정보 처리위탁을 받는 자 : (주) 000
- 처리위탁 업무내용 : 마케팅을 위한 개인정보 이용`
      }
    ]
  };

  const [collectMemberOptionalDelegation, setCollectMemberOptionalDelegation] = useState<{ kr: AgreementSection; cn: AgreementSection }>({
    kr: initialCollectMemberOptionalDelegation,
    cn: JSON.parse(JSON.stringify(initialCollectMemberOptionalDelegation)),
  });

  const initialCollectMemberOptionalThirdParty: AgreementSection = {
    usage: 'none',
    items: [
      {
        id: 1,
        title: '마케팅 활용을 위한 개인정보 제3자 제공 동의',
        content: `회사는 보다 나은 서비스 제공 및 이벤트 등과 같은 마케팅용도 활용에 대해 원활한 업무 수행을 위해 아래와 같이 외부 전문업체에 위탁하여 운영하고 있습니다.

- 제공받는 자 : (주) 000
- 이용목적 : 마케팅을 위한 개인정보 이용`
      },
      {
         id: 2,
         title: '공급사 상품 판매 및 배송을 위한 개인정보 제3자 제공 동의',
         content: `- 제공받는 자 : 공급사 판매자
- 이용목적 : 판매자와 구매자의 거래의 원활한 진행, 본인의사의확인, 고객 상담 및 불만처리, 상품과 경품 배송을 위한 배송지 확인 등
- 제공항목 : 구매자 이름, 전화번호, ID, 휴대폰번호, 이메일주소, 상품 구매정보, 상품 수취인 정보(이름, 주소, 전화번호)
- 보유/이용기간 : 배송완료 후 한달`
      }
    ]
  };

  const [collectMemberOptionalThirdParty, setCollectMemberOptionalThirdParty] = useState<{ kr: AgreementSection; cn: AgreementSection }>({
    kr: initialCollectMemberOptionalThirdParty,
    cn: JSON.parse(JSON.stringify(initialCollectMemberOptionalThirdParty)),
  });

  const initialCollectNonMemberOrder = `회사는 회원가입, 민원 등 고객상담 처리, 본인확인(14세 미만 아동 확인) 등 의사소통을 위한 정보 활용 및 이벤트 등과 같은 마케팅용도 활용, 회원의 서비스 이용에 대한 통계, 이용자들의 개인정보를 통한 서비스 개발을 위해 아래와 같은 개인정보를 수집하고 있습니다.

- 수집항목 : 구매자정보(이름,전화번호,휴대폰번호,이메일), 상품 구매/취소/반품/교환/환불 정보, 수령인 정보(이름, 주소, 전화번호, 휴대폰번호) 비회원 비밀번호
- 수집/이용목적: 서비스 제공 및 계약의 이행, 구매 및 대금결제, 물품배송 또는 청구지 발송, 불만처리 등 민원처리, 회원관리 등을 위한 목적
- 이용기간 : 개인정보 수집 및 이용목적 달성 시 까지

원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 일정기간 동안 개인정보를 보관할 수 있습니다.
그 밖의 사항은 (주) 000 개인정보처리방침을 준수합니다.`;

  const [collectNonMemberOrder, setCollectNonMemberOrder] = useState<{ kr: string; cn: string }>({
    kr: initialCollectNonMemberOrder,
    cn: initialCollectNonMemberOrder,
  });

  const initialCollectNonMemberPost = `회사는 비회원의 게시글 등록 시 콘텐츠 등록 및 고객 문의 응대 등을 원활하게 진행하기 위해 아래와 같은 개인정보를 수집하고 있습니다.

- 수집항목: 이름, 비밀번호,닉네임,휴대폰번호,이메일,IP
- 수집/이용목적: 게시글 접수 및 결과 회신
- 이용기간: 개인정보 수집 및 이용목적 달성 시 까지

원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 일정기간 동안 개인정보를 보관할 수 있습니다.
그 밖의 사항은 (주) 000 개인정보처리방침을 준수합니다.`;

  const [collectNonMemberPost, setCollectNonMemberPost] = useState<{ kr: string; cn: string }>({
    kr: initialCollectNonMemberPost,
    cn: initialCollectNonMemberPost,
  });

  const initialCollectNonMemberComment = `회사는 비회원의 게시글 등록 시 콘텐츠 등록 및 고객 문의 응대 등을 원활하게 진행하기 위해 아래와 같은 개인정보를 수집하고 있습니다.

- 수집항목: 이름, 비밀번호,닉네임,휴대폰번호,이메일,IP
- 수집/이용목적: 게시글 접수 및 결과 회신
- 이용기간: 개인정보 수집 및 이용목적 달성 시 까지

원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 일정기간 동안 개인정보를 보관할 수 있습니다.
그 밖의 사항은 (주) 000 개인정보처리방침을 준수합니다.`;

  const [collectNonMemberComment, setCollectNonMemberComment] = useState<{ kr: string; cn: string }>({
    kr: initialCollectNonMemberComment,
    cn: initialCollectNonMemberComment,
  });

  const initialCollectNonMemberMarketing: MarketingSection = {
      usage: 'none',
      content: `마케팅 활용을 위한 개인정보 수집 · 이용 동의

- 수집항목: 휴대폰번호
- 이용목적: 마케팅을 위한 개인정보 이용
- 이용기간: 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
            단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 일정기간 동안 개인정보를 보관할 수 있습니다.
그 밖의 사항은 (주) 000 개인정보처리방침을 준수합니다.`
  };

  const [collectNonMemberMarketing, setCollectNonMemberMarketing] = useState<{ kr: MarketingSection; cn: MarketingSection }>({
      kr: initialCollectNonMemberMarketing,
      cn: JSON.parse(JSON.stringify(initialCollectNonMemberMarketing)),
  });

  const initialCollectSupplierProvision = `- 제공받는 자 : {rc_scmNm} 공급사
- 이용목적 : 상품 및 경품(서비스) 배송(전송), 반품, 환불, 고객상담 등 정보통신서비스제공계약 및 전자상거래(통신판매)계약의 이행을 위해 필요한 업무의 처리
- 수집항목 : 구매자정보(닉네임, 이름, 휴대전화 번호, 이메일주소), 수령인정보(이름, 휴대전화 번호, 수령인 주소), 상품 구매, 취소, 반품, 교환정보, 송장정보
- 보유 / 이용기간 : 상품 제공 완료 후 3개월`;

  const [collectSupplierProvision, setCollectSupplierProvision] = useState<{ kr: string; cn: string }>({
    kr: initialCollectSupplierProvision,
    cn: initialCollectSupplierProvision,
  });

  const addItem = (setter: React.Dispatch<React.SetStateAction<AgreementSection>>) => {
      setter((prev) => ({
          ...prev,
          items: [...prev.items, { id: Date.now(), title: '', content: '' }]
      }));
  };

  const removeItem = (setter: React.Dispatch<React.SetStateAction<AgreementSection>>, id: number) => {
      setter((prev) => ({
          ...prev,
          items: prev.items.filter((item) => item.id !== id)
      }));
  };
  
  // Helper to create a setter that updates only the current country's state
  const getLocalizedSetter = <T,>(
    setter: React.Dispatch<React.SetStateAction<{ kr: T; cn: T }>>,
    country: "kr" | "cn"
  ) => {
    return (valueOrFn: React.SetStateAction<T>) => {
      setter((prev) => {
        const currentCountryValue = prev[country];
        const newValue = valueOrFn instanceof Function ? valueOrFn(currentCountryValue) : valueOrFn;
        return {
          ...prev,
          [country]: newValue,
        };
      });
    };
  };

  const updateTermsConfig = (key: keyof TermsConfig, value: string) => {
    setTermsConfig(prev => ({
      ...prev,
      [countryTab]: {
        ...prev[countryTab],
        [key]: value
      }
    }));
  };

  const updatePrivacyOfficer = (key: keyof PrivacyOfficer, value: string) => {
    setPrivacyOfficer(prev => ({
      ...prev,
      [countryTab]: {
        ...prev[countryTab],
        [key]: value
      }
    }));
  };

  const renderOptionalSection = <T extends AgreementSection | MarketingSection>(title: string, state: T, setter: React.Dispatch<React.SetStateAction<T>>, isList = true) => (
      <div className="border-t border-gray-200">
          <table className="w-full border-collapse text-sm">
              <tbody>
                  <tr className="border-b border-gray-200">
                      <td colSpan={2} className="p-4 py-2 bg-white text-gray-800 font-bold border-b border-gray-200">
                          {title}
                      </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                      <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700 border-r border-gray-200">사용여부</th>
                      <td className="p-4">
                          <RadioGroup 
                              value={state.usage} 
                              onValueChange={(val) => setter({ ...state, usage: val })}
                              className="flex gap-6"
                          >
                               <div className="flex items-center space-x-2">
                                   <RadioGroupItem value="use" id={`${title}-use`} />
                                   <Label htmlFor={`${title}-use`} className="font-normal text-gray-900">사용</Label>
                               </div>
                               <div className="flex items-center space-x-2">
                                   <RadioGroupItem value="none" id={`${title}-none`} />
                                   <Label htmlFor={`${title}-none`} className="font-normal text-gray-900">사용하지 않음</Label>
                               </div>
                          </RadioGroup>
                      </td>
                  </tr>
                   <tr className="border-b border-gray-200">
                      <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700 border-r border-gray-200 align-top pt-8">내용입력</th>
                      <td className="p-4 bg-white">
                          {isList && 'items' in state ? (
                              <div className="space-y-4">
                                  <div>
                                      <Button variant="outline" size="sm" onClick={() => addItem(setter as unknown as React.Dispatch<React.SetStateAction<AgreementSection>>)} className="h-8 text-xs border-gray-300">
                                          + 추가
                                      </Button>
                                  </div>
                                  {state.items.map((item) => (
                                      <div key={item.id} className="border border-gray-300 rounded-sm p-4 space-y-2 relative">
                                          <div className="flex justify-between items-center mb-2">
                                               <Input 
                                                  value={item.title} 
                                                  onChange={(e) => {
                                                      const newItems = state.items.map((i) => i.id === item.id ? {...i, title: e.target.value} : i);
                                                      setter({ ...state, items: newItems } as T);
                                                  }}
                                                  className="w-full max-w-md font-bold text-gray-700"
                                                  placeholder="항목 제목 입력"
                                               />
                                               <Button variant="outline" size="sm" onClick={() => removeItem(setter as unknown as React.Dispatch<React.SetStateAction<AgreementSection>>, item.id)} className="text-gray-500 hover:text-red-500 h-7 text-xs border-gray-300">
                                                   - 삭제
                                               </Button>
                                          </div>
                                          <Textarea 
                                              value={item.content}
                                              onChange={(e) => {
                                                  const newItems = state.items.map((i) => i.id === item.id ? {...i, content: e.target.value} : i);
                                                  setter({ ...state, items: newItems } as T);
                                              }}
                                              className="min-h-[150px] resize-y text-gray-600 text-sm leading-relaxed" 
                                          />
                                      </div>
                                  ))}
                              </div>
                          ) : (
                                'content' in state && (
                                  <Textarea 
                                      value={state.content}
                                      onChange={(e) => setter({ ...state, content: e.target.value } as T)}
                                      className="min-h-[150px] resize-y text-gray-600 text-sm leading-relaxed w-full"
                                  />
                                )
                          )}
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  );

  const handleTermsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTermsContent(prev => ({
      ...prev,
      [countryTab]: e.target.value
    }));
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrivacyContent(prev => ({
      ...prev,
      [countryTab]: e.target.value
    }));
  };

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h1 className="text-2xl font-bold text-gray-900">약관 / 개인정보처리방침</h1>
        <Button className="bg-red-500 hover:bg-red-600 text-white px-6">
          <Save className="w-4 h-4 mr-2" />
          저장
        </Button>
      </div>

      {/* Warning Banner */}
      <div className="bg-white border text-gray-800 p-4 rounded-md flex items-start gap-3 shadow-sm">
        <AlertCircle className="w-10 h-10 text-red-500 shrink-0 mt-1" />
        <div className="text-sm space-y-1">
          <p className="font-bold">약관 / 개인정보처리방침 내 양식은 쇼핑몰 운영에 도움을 드리기 위해 제공하는 샘플 양식입니다!</p>
          <p>운영하시는 쇼핑몰 운영 방침 및 수집 내용에 따라 약관 및 개인정보처리방침 내용을 확인 하신 후 꼭!! 수정하여 사용하시기 바랍니다.</p>
          <p>수집하는 개인정보에 대해 명확하게 안내되지 않은 경우, 개인정보 보호법에 따라 처벌받을 수 있으므로 유의 하시기 바랍니다.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-4">
          {/* Country Tabs */}
          <div className="flex border-b">
            <button
                onClick={() => setCountryTab("kr")}
                className={`px-6 py-2 text-sm font-medium flex items-center gap-2 border-t border-l border-r rounded-t-lg ${
                    countryTab === "kr"
                    ? "bg-white text-gray-900 border-b-white -mb-px"
                    : "bg-gray-50 text-gray-500 border-b-gray-200"
                }`}
            >
                <span>{countryTab === "kr" ? "🇰🇷 기준몰" : "🇰🇷"}</span>
            </button>
            <button
                onClick={() => setCountryTab("cn")}
                className={`px-6 py-2 text-sm font-medium flex items-center gap-2 border-t border-r rounded-t-lg ${
                    countryTab === "cn"
                    ? "bg-white text-gray-900 border-b-white -mb-px"
                    : "bg-gray-50 text-gray-500 border-b-gray-200"
                }`}
            >
                <span>{countryTab === "cn" ? "🇨🇳 중문몰" : "🇨🇳"}</span>
            </button>
          </div>

          {/* Sub Tabs */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-t-md border-b">
             <button
               onClick={() => setActiveTab("terms")}
               className={`px-4 py-2 text-sm font-medium ${activeTab === "terms" ? "bg-white text-gray-900 shadow-sm border rounded-t-md border-b-white -mb-px relative top-[1px]" : "text-gray-500 hover:text-gray-700"}`}
             >
               이용약관
             </button>
             <button
               onClick={() => setActiveTab("privacy")}
               className={`px-4 py-2 text-sm font-medium ${activeTab === "privacy" ? "bg-white text-gray-900 shadow-sm border rounded-t-md border-b-white -mb-px relative top-[1px]" : "text-gray-500 hover:text-gray-700"}`}
             >
               개인정보처리방침
             </button>
             <button
               onClick={() => setActiveTab("collect")}
               className={`px-4 py-2 text-sm font-medium ${activeTab === "collect" ? "bg-white text-gray-900 shadow-sm border rounded-t-md border-b-white -mb-px relative top-[1px]" : "text-gray-500 hover:text-gray-700"}`}
             >
               개인정보수집 동의항목 설정
             </button>
          </div>
      </div>

       {/* Content Area */}
       <div className="space-y-6">
           {/* Section Header */}
           <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    {activeTab === 'terms' ? '이용약관 내용' : activeTab === 'privacy' ? '개인정보처리방침 내용' : '개인정보수집 동의항목 설정'}
                    <span className="text-xs font-normal text-gray-400 border px-1 rounded">?</span>
                </h2>
                
                <Dialog>
                    <DialogTrigger asChild>
                         {activeTab === 'collect' ? null : (
                            <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                                약관 관리
                            </Button>
                         )}
                    </DialogTrigger>
                    <DialogContent className="min-w-[900px] p-0 overflow-hidden bg-white">
                        <DialogHeader className="p-4 bg-white border-b">
                            <DialogTitle>약관 관리</DialogTitle>
                        </DialogHeader>
                        <div className="p-6 space-y-6">
                             <table className="w-full border-t border-gray-200 text-sm">
                                <tbody>
                                    <tr className="border-b border-gray-200">
                                        <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700 border-r border-gray-200">이전 약관 노출 여부</th>
                                        <td className="p-4">
                                            <RadioGroup defaultValue="none" className="flex gap-6 mb-2">
                                                 <div className="flex items-center space-x-2">
                                                     <RadioGroupItem value="show" id="popup-show" />
                                                     <Label htmlFor="popup-show" className="font-normal text-gray-900">노출함</Label>
                                                 </div>
                                                 <div className="flex items-center space-x-2">
                                                     <RadioGroupItem value="none" id="popup-none" />
                                                     <Label htmlFor="popup-none" className="font-normal text-gray-900">노출 안함</Label>
                                                 </div>
                                            </RadioGroup>
                                            <div className="flex items-start gap-1 text-xs text-gray-500">
                                                <span className="bg-gray-700 text-white text-[10px] px-1 rounded mt-0.5">!</span>
                                                이전 약관 노출 여부를 &quot;노출함&quot;으로 선택 시, 이전약관보기에 등록된 &quot;쇼핑몰 노출함 상태 체크된 약관&quot;이 쇼핑몰에 모두 노출됩니다.
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                         <th className="bg-gray-50 p-4 text-left font-medium text-gray-700 align-middle border-r border-gray-200">약관 리스트</th>
                                         <td className="p-4 h-[300px] align-top bg-white">
                                             <div className="border-t-2 border-gray-400 border-b border-gray-200">
                                                <div className="grid grid-cols-[60px_100px_1fr_150px_80px] bg-gray-100/50 text-gray-700 text-center text-xs font-bold divide-x divide-white border-b border-gray-300">
                                                    <div className="py-2 bg-[#b6b6b6] text-white">번호</div>
                                                    <div className="py-2 bg-[#b6b6b6] text-white">쇼핑몰노출</div>
                                                    <div className="py-2 bg-[#b6b6b6] text-white">약관명</div>
                                                    <div className="py-2 bg-[#b6b6b6] text-white">등록일/수정일</div>
                                                    <div className="py-2 bg-[#b6b6b6] text-white">보기</div>
                                                </div>
                                                <div className="grid grid-cols-[60px_100px_1fr_150px_80px] bg-white text-center text-sm divide-x divide-gray-200 items-center">
                                                    <div className="py-2">1</div>
                                                    <div className="py-2 flex justify-center">
                                                       <Checkbox className="border-gray-300 data-[state=checked]:bg-gray-400 data-[state=checked]:border-gray-400" checked disabled />
                                                    </div>
                                                    <div className="py-2 text-left px-4">
                                                        {activeTab === 'terms' ? '이용약관' : '개인정보처리방침'} <span className="text-red-500">(현재시행중)</span>
                                                    </div>
                                                    <div className="py-2 text-gray-500">2025-11-25</div>
                                                    <div className="py-2 flex justify-center">
                                                        <Button variant="outline" size="sm" className="h-7 text-xs px-2 border-gray-300 bg-white">보기</Button>
                                                    </div>
                                                </div>
                                             </div>
                                         </td>
                                    </tr>
                                </tbody>
                             </table>

                             <div className="flex justify-center pt-4 border-t border-gray-200 mt-0">
                                 <Button className="bg-red-500 hover:bg-red-600 text-white px-8 rounded-sm h-10 w-[100px]">저장</Button>
                             </div>
                        </div>
                    </DialogContent>
                </Dialog>
           </div>

           {/* Content Body Based on Tab */}
           {activeTab === 'terms' && (
               <div className="border-t border-gray-200">
                 <table className="w-full border-collapse text-sm">
                     <tbody>
                         <tr className="border-b border-gray-200">
                             <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">표준약관 사용여부</th>
                             <td className="p-4">
                                 <RadioGroup 
                                    value={termsConfig[countryTab].standardUsage} 
                                    onValueChange={(val) => updateTermsConfig('standardUsage', val)}
                                    className="flex gap-6"
                                 >
                                     <div className="flex items-center space-x-2">
                                         <RadioGroupItem value="standard" id="terms-standard" />
                                         <Label htmlFor="terms-standard" className="font-normal text-gray-900"><span className="text-red-500 font-bold">●</span> 표준 약관 사용</Label>
                                     </div>
                                     <div className="flex items-center space-x-2">
                                         <RadioGroupItem value="custom" id="terms-custom" />
                                         <Label htmlFor="terms-custom" className="font-normal text-gray-900">약관 직접입력</Label>
                                     </div>
                                 </RadioGroup>
                             </td>
                         </tr>
                         <tr className="border-b border-gray-200">
                            <td colSpan={2} className="p-4 bg-gray-100/50">
                                <div className="bg-white border rounded-md overflow-hidden">
                                    <div className="bg-gray-100 px-4 py-2 text-xs font-bold text-gray-600 border-b">
                                        전자상거래(인터넷사이버몰) 표준약관 - 표준약관 제10023호
                                    </div>
                                    <div className="p-0">
                                        <Textarea
                                            className="w-full min-h-[400px] border-0 focus-visible:ring-0 rounded-none p-4 resize-y text-gray-700 leading-relaxed"
                                            value={termsContent[countryTab as 'kr' | 'cn']}
                                            onChange={handleTermsChange}
                                        />
                                    </div>
                                    <div className="bg-gray-50 border-t py-1 px-2 text-center text-xs text-gray-500 cursor-s-resize hover:bg-gray-100 flex items-center justify-center relative">
                                        <span className="absolute right-4 text-xs">⤨</span>
                                        아래 영역을 드래그하여 입력창 크기를 조절할 수 있습니다.
                                    </div>
                                </div>
                            </td>
                         </tr>
                         <tr className="border-b border-gray-200">
                             <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">약관적용일</th>
                             <td className="p-4 flex items-center gap-2">
                                 <Input 
                                    className="w-24 bg-white" 
                                    value={termsConfig[countryTab].applyDateYear}
                                    onChange={(e) => updateTermsConfig('applyDateYear', e.target.value)}
                                 /> <span className="text-gray-500">년</span>
                                 <Input 
                                    className="w-16 bg-white" 
                                    value={termsConfig[countryTab].applyDateMonth}
                                    onChange={(e) => updateTermsConfig('applyDateMonth', e.target.value)}
                                 /> <span className="text-gray-500">월</span>
                                 <Input 
                                    className="w-16 bg-white" 
                                    value={termsConfig[countryTab].applyDateDay}
                                    onChange={(e) => updateTermsConfig('applyDateDay', e.target.value)}
                                 /> <span className="text-gray-500">일</span>
                             </td>
                         </tr>
                         <tr className="border-b border-gray-200">
                             <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">공정거래위원회 로고<br/>하단푸터 노출여부</th>
                             <td className="p-4">
                                 <RadioGroup 
                                    value={termsConfig[countryTab].ftcLogo} 
                                    onValueChange={(val) => updateTermsConfig('ftcLogo', val)}
                                    className="flex gap-6"
                                >
                                     <div className="flex items-center space-x-2">
                                         <RadioGroupItem value="default" id="logo-default" />
                                         <Label htmlFor="logo-default" className="font-normal">기본 로고 이미지 노출</Label>
                                     </div>
                                     <div className="flex items-center space-x-2">
                                         <RadioGroupItem value="custom" id="logo-custom" />
                                         <Label htmlFor="logo-custom" className="font-normal">노출 이미지 직접등록</Label>
                                     </div>
                                     <div className="flex items-center space-x-2">
                                         <RadioGroupItem value="none" id="logo-none" />
                                         <Label htmlFor="logo-none" className="font-normal text-red-500 font-bold">노출 안함</Label>
                                     </div>
                                 </RadioGroup>
                             </td>
                         </tr>
                     </tbody>
                 </table>
               </div>
           )}

           {activeTab === 'privacy' && (
              <div className="space-y-8">
               <div className="border-t border-gray-200">
                 <table className="w-full border-collapse text-sm">
                     <tbody>
                         <tr className="border-b border-gray-200">
                             <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700 align-top">
                                개인정보처리방침 내용<br/>
                                <Button variant="secondary" size="sm" className="mt-2 bg-gray-400 text-white hover:bg-gray-500 text-xs h-7">치환코드 보기</Button>
                             </th>
                             <td className="p-4 bg-gray-100/50">
                                <div className="bg-white border rounded-md overflow-hidden">
                                    <div className="bg-gray-100 px-4 py-2 text-xs font-bold text-gray-600 border-b">
                                        [ 개인정보처리방침 ]
                                    </div>
                                    <div className="p-0">
                                        <Textarea
                                            className="w-full min-h-[400px] border-0 focus-visible:ring-0 rounded-none p-4 resize-y text-gray-700 leading-relaxed"
                                            value={privacyContent[countryTab as 'kr' | 'cn']}
                                            onChange={handlePrivacyChange}
                                        />
                                    </div>
                                    <div className="bg-gray-50 border-t py-1 px-2 text-center text-xs text-gray-500 cursor-s-resize hover:bg-gray-100 flex items-center justify-center relative">
                                        <span className="absolute right-4 text-xs">⤨</span>
                                        아래 영역을 드래그하여 입력창 크기를 조절할 수 있습니다.
                                    </div>
                                </div>
                             </td>
                         </tr>
                     </tbody>
                 </table>
               </div>

               {/* Privacy Officer Section */}
               <div className="space-y-4">
                   <h2 className="text-lg font-bold flex items-center gap-2">
                        개인정보 보호책임자 입력
                        <span className="text-xs font-normal text-gray-400 border px-1 rounded">?</span>
                   </h2>
                   <div className="border-t border-gray-200">
                        <table className="w-full border-collapse text-sm">
                             <tbody>
                                 <tr className="border-b border-gray-200">
                                     <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">보호 책임자 이름</th>
                                     <td className="p-4" colSpan={3}>
                                         <Input 
                                            className="w-64" 
                                            value={privacyOfficer[countryTab].name}
                                            onChange={(e) => updatePrivacyOfficer('name', e.target.value)}
                                         />
                                     </td>
                                 </tr>
                                 <tr className="border-b border-gray-200">
                                     <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">보호 책임자 직책</th>
                                     <td className="p-4 border-r border-gray-200 w-[40%]">
                                         <Input 
                                            className="w-full" 
                                            value={privacyOfficer[countryTab].position}
                                            onChange={(e) => updatePrivacyOfficer('position', e.target.value)}
                                         />
                                     </td>
                                     <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">보호 책임자 부서</th>
                                     <td className="p-4">
                                         <Input 
                                            className="w-full" 
                                            value={privacyOfficer[countryTab].department}
                                            onChange={(e) => updatePrivacyOfficer('department', e.target.value)}
                                         />
                                     </td>
                                 </tr>
                                 <tr className="border-b border-gray-200">
                                     <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">보호 책임자 전화번호</th>
                                     <td className="p-4" colSpan={3}>
                                         <Input 
                                            className="w-64" 
                                            value={privacyOfficer[countryTab].phone}
                                            onChange={(e) => updatePrivacyOfficer('phone', e.target.value)}
                                         />
                                     </td>
                                 </tr>
                                 <tr className="border-b border-gray-200">
                                     <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">보호 책임자 이메일</th>
                                     <td className="p-4" colSpan={3}>
                                        <div className="flex items-center gap-2">
                                            <Input 
                                                className="w-48" 
                                                value={privacyOfficer[countryTab].emailId}
                                                onChange={(e) => updatePrivacyOfficer('emailId', e.target.value)}
                                            />
                                            <span>@</span>
                                            <Input 
                                                className="w-48" 
                                                value={privacyOfficer[countryTab].emailDomain}
                                                onChange={(e) => updatePrivacyOfficer('emailDomain', e.target.value)}
                                            />
                                            <select 
                                                className="border border-gray-200 rounded-md h-10 px-3 text-sm min-w-[120px]"
                                                value={privacyOfficer[countryTab].emailDomain}
                                                onChange={(e) => updatePrivacyOfficer('emailDomain', e.target.value)}
                                            >
                                                <option value="직접입력">직접입력</option>
                                                <option value="gmail.com">gmail.com</option>
                                                <option value="naver.com">naver.com</option>
                                            </select>
                                        </div>
                                     </td>
                                 </tr>
                             </tbody>
                        </table>
                   </div>
               </div>
              </div>
           )}

           {activeTab === 'collect' && (
             <div className="space-y-12">
               {/* Member Section */}
               <div className="space-y-4">
                   <h2 className="text-lg font-bold flex items-center gap-2">
                        회원 대상 동의항목 설정
                        <span className="text-xs font-normal text-gray-400 border px-1 rounded">?</span>
                   </h2>
                   
                   <div className="border-t border-gray-200">
                       <table className="w-full border-collapse text-sm">
                           <tbody>
                               <tr className="border-b border-gray-200">
                                  <td colSpan={2} className="p-4 py-2 bg-white text-gray-800 font-bold border-b border-gray-200">
                                      [필수] 개인정보 수집.이용 동의
                                  </td>
                               </tr>
                               <tr className="border-b border-gray-200">
                                   <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700 border-r border-gray-200 align-top pt-8">내용입력</th>
                                   <td className="p-4 bg-white">
                                       <Textarea 
                                           className="w-full min-h-[200px] border-gray-300 resize-y text-gray-700 leading-relaxed"
                                           value={collectMemberRequired[countryTab]}
                                           onChange={(e) => setCollectMemberRequired(prev => ({...prev, [countryTab]: e.target.value}))}
                                       />
                                   </td>
                               </tr>
                           </tbody>
                       </table>
                       
                       {/* Optional Sections */}
                       {renderOptionalSection('[선택] 개인정보 수집.이용 동의', collectMemberOptionalCollection[countryTab], getLocalizedSetter(setCollectMemberOptionalCollection, countryTab))}
                       {renderOptionalSection('[선택] 개인정보 처리 위탁 동의', collectMemberOptionalDelegation[countryTab], getLocalizedSetter(setCollectMemberOptionalDelegation, countryTab))}
                       {renderOptionalSection('[선택] 개인정보 제3자 제공 동의', collectMemberOptionalThirdParty[countryTab], getLocalizedSetter(setCollectMemberOptionalThirdParty, countryTab))}
                   </div>
               </div>

                {/* Non-Member Section */}
                <div className="space-y-4">
                   <h2 className="text-lg font-bold flex items-center gap-2">
                        비회원 대상 동의항목 설정
                        <span className="text-xs font-normal text-gray-400 border px-1 rounded">?</span>
                   </h2>
                   <div className="border-t border-gray-200">
                      {/* Non-Member Order */}
                      <table className="w-full border-collapse text-sm border-b border-gray-200">
                           <tbody>
                               <tr className="border-b border-gray-200">
                                  <td colSpan={2} className="p-4 py-2 bg-white text-gray-800 font-bold border-b border-gray-200">
                                      [필수] 개인정보 수집 · 이용 동의 (비회원 주문 시)
                                  </td>
                               </tr>
                               <tr>
                                   <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700 border-r border-gray-200 align-top pt-8">내용입력</th>
                                   <td className="p-4 bg-white">
                                       <Textarea 
                                           className="w-full min-h-[200px] border-gray-300 resize-y text-gray-700 leading-relaxed"
                                           value={collectNonMemberOrder[countryTab]}
                                           onChange={(e) => setCollectNonMemberOrder(prev => ({...prev, [countryTab]: e.target.value}))}
                                       />
                                   </td>
                               </tr>
                           </tbody>
                       </table>

                       {/* Non-Member Post */}
                      <table className="w-full border-collapse text-sm border-b border-gray-200">
                           <tbody>
                               <tr className="border-b border-gray-200">
                                  <td colSpan={2} className="p-4 py-2 bg-white text-gray-800 font-bold border-b border-gray-200">
                                      [필수] 개인정보 수집 · 이용 동의 (비회원 게시글 등록 시)
                                  </td>
                               </tr>
                               <tr>
                                   <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700 border-r border-gray-200 align-top pt-8">내용입력</th>
                                   <td className="p-4 bg-white">
                                       <Textarea 
                                           className="w-full min-h-[200px] border-gray-300 resize-y text-gray-700 leading-relaxed"
                                           value={collectNonMemberPost[countryTab]}
                                           onChange={(e) => setCollectNonMemberPost(prev => ({...prev, [countryTab]: e.target.value}))}
                                       />
                                   </td>
                               </tr>
                           </tbody>
                       </table>

                       {/* Non-Member Comment */}
                      <table className="w-full border-collapse text-sm border-b border-gray-200">
                           <tbody>
                               <tr className="border-b border-gray-200">
                                  <td colSpan={2} className="p-4 py-2 bg-white text-gray-800 font-bold border-b border-gray-200">
                                      [필수] 개인정보 수집 · 이용 동의 (비회원 댓글 등록 시)
                                  </td>
                               </tr>
                               <tr>
                                   <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700 border-r border-gray-200 align-top pt-8">내용입력</th>
                                   <td className="p-4 bg-white">
                                       <Textarea 
                                           className="w-full min-h-[200px] border-gray-300 resize-y text-gray-700 leading-relaxed"
                                           value={collectNonMemberComment[countryTab]}
                                           onChange={(e) => setCollectNonMemberComment(prev => ({...prev, [countryTab]: e.target.value}))}
                                       />
                                   </td>
                               </tr>
                           </tbody>
                       </table>

                       {/* Non-Member Marketing */}
                       {renderOptionalSection('[선택] 마케팅 활용을 위한 개인정보 수집 · 이용 동의 (비회원 주문 시)', collectNonMemberMarketing[countryTab], getLocalizedSetter(setCollectNonMemberMarketing, countryTab), false)}
                   </div>
                </div>

                {/* Supplier Section */}
                <div className="space-y-4">
                   <h2 className="text-lg font-bold flex items-center gap-2">
                        회원/비회원 주문 시 상품 공급사 개인정보 제공 동의
                        <span className="text-xs font-normal text-gray-400 border px-1 rounded">?</span>
                   </h2>
                   <div className="border-t border-gray-200">
                       <table className="w-full border-collapse text-sm">
                           <tbody>
                               <tr className="border-b border-gray-200">
                                  <td colSpan={2} className="p-4 py-2 bg-white text-gray-800 font-bold border-b border-gray-200">
                                      [필수] 회원/비회원 주문 시 상품 공급사 개인정보 제공 동의
                                  </td>
                               </tr>
                               <tr className="border-b border-gray-200">
                                   <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700 border-r border-gray-200 align-top pt-8">내용입력</th>
                                   <td className="p-4 bg-white">
                                       <Textarea 
                                           className="w-full min-h-[200px] border-gray-300 resize-y text-gray-700 leading-relaxed"
                                           value={collectSupplierProvision[countryTab]}
                                           onChange={(e) => setCollectSupplierProvision(prev => ({...prev, [countryTab]: e.target.value}))}
                                       />
                                   </td>
                               </tr>
                           </tbody>
                       </table>
                   </div>
                </div>
             </div>
           )}
       </div>

       {/* Guide Section */}
       <div className="mt-12 text-xs text-gray-500 space-y-6 py-8 border-t border-gray-200">
          <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
             <span className="w-4 h-4 rounded-sm border border-blue-500 flex items-center justify-center text-[10px]">!</span>
             안내
          </div>

          {activeTab === 'terms' ? (
              <>
                <div className="space-y-2">
                    <p className="font-bold text-gray-700 text-sm">[표준약관이용여부] 표준약관이란 무엇인가요?</p>
                    <p>건전한 거래질서를 확립하고 불공정한 내용의 약관이 통용되는 것을 방지하기 위하여 공정거래위원회에서 마련한 표준약관입니다.</p>
                    <p>전자상거래 표준약관을 사용하시면 공정거래위원회 표준약관 로고를 사용하실 수 있습니다.</p>
                    <p className="pl-1">(단, 표준약관을 사용하지 않음에도 공정거래위원회 표준약관 로고를 표시한 경우 &quot;전자상거래 등에서의 소비자보호에 관한 법률&quot;에 의거하여 심사와 시정조치 및 이행조치를 받을 수 있습니다.)</p>
                </div>

                <div className="space-y-2">
                    <p className="font-bold text-gray-700 text-sm">이용약관 관리 시 주의사항</p>
                    <p>&quot;이용약관 내용&quot;은 전자상거래(인터넷사이버몰) 표준약관 내용이 기본적으로 선택 및 제공되고 있습니다.</p>
                    <p>쇼핑몰 운영 방침에 따라 약관 수정이 가능하며, 표준약관 사용여부를 &quot;약관 직접입력&quot;으로 체크하신 뒤 수정하시면 됩니다.</p>
                    <p className="text-gray-500">약관 내용 개정 시에는 <span className="text-red-500 font-bold">적용일자 및 개정 사유를 명시하여 현행 약관과 함께 쇼핑몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지</span>해야 합니다.</p>
                </div>
              </>
          ) : activeTab === 'privacy' ? (
              <div className="space-y-2">
                 <p className="font-bold text-gray-700 text-sm">개인정보처리방침 관리 시 주의사항</p>
                 <p>&quot;개인정보처리방침 내용&quot;에 입력되어 있는 내용은 샘플로 제공되는 내용입니다.</p>
                 <p className="text-red-500 font-bold flex items-center gap-1">
                    쇼핑몰 운영 시, 관련 법령과 쇼핑몰 운영 방침에 맞게 개인정보처리방침 내용을 수정하셔야 합니다. (개인정보보호 법령 확인 ☞ 바로가기)
                 </p>
              </div>
          ) : null}
       </div>

      {/* Floating Buttons */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
        <Button className="rounded-full w-12 h-12 bg-red-500 hover:bg-red-600 shadow-lg text-white p-0 flex items-center justify-center">
             <span className="text-[10px] leading-tight flex flex-col items-center"><span>따라</span><span>하기</span></span>
        </Button>
        <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center">
            <span className="text-xl">↑</span>
        </Button>
        <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center">
            <span className="text-xl">↓</span>
        </Button>
      </div>

    </div>
  );
}
