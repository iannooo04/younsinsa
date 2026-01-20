"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TipTapEditor from "@/components/ui/TipTapEditor";
import { useState, useEffect, useTransition } from "react";
import { Save } from "lucide-react";
import { getBasicInfoSettingsAction, updateBasicInfoSettingsAction, BasicInfoSettingsData } from "@/actions/basic-info-actions";

export default function BasicInfoSettingsPage() {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("kr"); // 'kr', 'cn', etc.
  
  const [settings, setSettings] = useState<BasicInfoSettingsData>({
    shopName: "",
    shopNameEng: "",
    topTitle: "",
    faviconPath: "",
    domain: "",
    repCategory: "",
    companyName: "",
    bizLicenseNum: "",
    ceoName: "",
    bizCondition: "",
    bizItem: "",
    repEmail: "",
    zipCode: "",
    address: "",
    addressDetail: "",
    shipZipCode: "",
    shipAddress: "",
    shipAddrDetail: "",
    returnZipCode: "",
    returnAddress: "",
    returnAddrDetail: "",
    repPhone: "",
    fax: "",
    onlineSalesLicense: "",
    sealImagePath: "",
    cashReceiptLogoType: "none",
    csPhone: "",
    csEmail: "",
    operatingHours: "",
    companyIntro: ""
  });

  useEffect(() => {
    const fetchData = async () => {
        const result = await getBasicInfoSettingsAction();
        if (result.success && result.settings) {
            // Prisma returns the object with additional fields (id, basicPolicyId, etc.)
            // We cast it to match our state type or just use spread.
            // Using unknown cast to bypass strict typing of exact match if extra fields exist.
            setSettings(result.settings as unknown as BasicInfoSettingsData);
        }
    };
    fetchData();
  }, []);

  const handleChange = (field: keyof BasicInfoSettingsData, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleBizLicenseChange = (part: 0 | 1 | 2, value: string) => {
    const parts = settings.bizLicenseNum ? settings.bizLicenseNum.split('-') : ["", "", ""];
    // Ensure we have 3 parts
    while (parts.length < 3) parts.push("");
    parts[part] = value;
    handleChange("bizLicenseNum", parts.join('-'));
  };

  const handleEmailChange = (field: 'repEmail' | 'csEmail', part: 0 | 1, value: string) => {
     const current = settings[field] || "";
     const parts = current.split('@');
     while (parts.length < 2) parts.push("");
     parts[part] = value;
     handleChange(field, parts.join('@'));
  };

  const handleSave = () => {
    startTransition(async () => {
        const result = await updateBasicInfoSettingsAction(settings);
        if (result.success) {
            alert("저장되었습니다.");
        } else {
            alert(result.error || "저장 실패");
        }
    });
  };

  const bizLicenseParts = settings.bizLicenseNum ? settings.bizLicenseNum.split('-') : ["", "", ""];
  const repEmailParts = settings.repEmail ? settings.repEmail.split('@') : ["", ""];
  const csEmailParts = settings.csEmail ? settings.csEmail.split('@') : ["", ""];

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-end gap-4">
          <h1 className="text-2xl font-bold text-gray-900">기본 정보 설정</h1>
          <p className="text-sm text-gray-500 pb-1">
            쇼핑몰의 기본적인 정보를 변경하실 수 있습니다.
          </p>
        </div>
        <Button 
            className="bg-red-500 hover:bg-red-600 text-white px-6"
            onClick={handleSave}
            disabled={isPending}
        >
          <Save className="w-4 h-4 mr-2" />
          {isPending ? "저장 중..." : "저장"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("kr")}
          className={`px-6 py-3 text-sm font-medium flex items-center gap-2 border-t border-l border-r rounded-t-lg ${
            activeTab === "kr"
              ? "bg-white text-gray-900 border-b-white -mb-px"
              : "bg-gray-50 text-gray-500 border-b-gray-200"
          }`}
        >
          <span>🇰🇷 기준몰</span>
        </button>
        <button
          onClick={() => setActiveTab("cn")}
          className={`px-6 py-3 text-sm font-medium flex items-center gap-2 border-t border-r rounded-t-lg ${
            activeTab === "cn"
              ? "bg-white text-gray-900 border-b-white -mb-px"
              : "bg-gray-50 text-gray-500 border-b-gray-200"
          }`}
        >
          <span>🇨🇳</span>
        </button>
      </div>

      {/* Section 1: 쇼핑몰 기본 정보 */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          쇼핑몰 기본 정보
          <span className="text-xs font-normal text-gray-400 border px-1 rounded">?</span>
        </h2>
        
        <div className="border-t border-gray-200">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {/* Row 1 */}
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">쇼핑몰명</th>
                <td className="p-4 border-r border-gray-200 w-1/3">
                  <Input 
                    value={settings.shopName} 
                    onChange={(e) => handleChange("shopName", e.target.value)} 
                    className="max-w-[300px]" 
                  />
                </td>
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">쇼핑몰영문명</th>
                <td className="p-4">
                  <Input 
                    value={settings.shopNameEng}
                    onChange={(e) => handleChange("shopNameEng", e.target.value)}
                    className="max-w-[300px]" 
                  />
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">상단타이틀</th>
                <td className="p-4 border-r border-gray-200">
                  <Input 
                    value={settings.topTitle} 
                    onChange={(e) => handleChange("topTitle", e.target.value)}
                    className="max-w-[300px]" 
                  />
                </td>
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">파비콘</th>
                <td className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-gray-100 text-gray-600">찾아보기</Button>
                      <Input readOnly value={settings.faviconPath} className="max-w-[200px] bg-gray-50" />
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="bg-gray-700 text-white text-[10px] px-1 rounded">!</span>
                      이미지사이즈 16x16 pixel, 파일형식 ico로 등록해야 합니다
                    </p>
                  </div>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700 flex items-center gap-1 h-full">
                  <span className="text-red-500">*</span> 쇼핑몰 도메인
                </th>
                <td colSpan={3} className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-500">http://</span>
                    <Input 
                        value={settings.domain} 
                        onChange={(e) => handleChange("domain", e.target.value)}
                        className="max-w-[300px]" 
                    />
                    <Button variant="secondary" size="sm" className="bg-gray-500 hover:bg-gray-600 text-white">도메인 신청하기</Button>
                    <Button variant="secondary" size="sm" className="bg-gray-500 hover:bg-gray-600 text-white">도메인 연결/관리</Button>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p className="flex items-center gap-1">
                      <span className="bg-gray-700 text-white text-[10px] px-1 rounded">!</span>
                      입력 시 쇼핑몰 및 관리자 화면에 도메인 정보가 노출됩니다.
                    </p>
                    <p className="pl-5">
                      실제 쇼핑몰 접속 도메인의 추가 및 변경은 [도메인 연결/관리] 버튼을 통해서 가능합니다. <a href="#" className="text-blue-500 underline">도움말 바로가기 &gt;</a>
                    </p>
                  </div>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700 flex items-center gap-1">
                  <span className="text-red-500">*</span> 대표카테고리
                </th>
                <td colSpan={3} className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{settings.repCategory}</span>
                    <Button variant="outline" size="sm" className="bg-gray-500 hover:bg-gray-600 text-white border-0">대표카테고리 선택</Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: 회사 정보 */}
      <div className="space-y-4 mt-8">
        <h2 className="text-lg font-bold flex items-center gap-2">
          회사 정보
          <span className="text-xs font-normal text-gray-400 border px-1 rounded">?</span>
        </h2>
        
        <div className="border-t border-gray-200">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {/* Row 1 */}
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">상호(회사명)</th>
                <td className="p-4 border-r border-gray-200 w-1/3">
                  <Input 
                    value={settings.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                    className="max-w-[300px]" 
                  />
                </td>
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">사업자등록번호</th>
                <td className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Input 
                        value={bizLicenseParts[0] || ""} 
                        onChange={(e) => handleBizLicenseChange(0, e.target.value)}
                        className="w-[60px] text-center" 
                    />
                    <span>-</span>
                    <Input 
                        value={bizLicenseParts[1] || ""} 
                        onChange={(e) => handleBizLicenseChange(1, e.target.value)}
                        className="w-[60px] text-center" 
                    />
                    <span>-</span>
                    <Input 
                        value={bizLicenseParts[2] || ""} 
                        onChange={(e) => handleBizLicenseChange(2, e.target.value)}
                        className="w-[80px] text-center" 
                    />
                    <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 p-0 flex items-center justify-center">
                       <span className="text-[10px]">▶</span>
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p className="flex items-start gap-1">
                      <span className="bg-gray-700 text-white text-[10px] px-1 rounded mt-0.5">!</span>
                      <span>인터넷 쇼핑몰 운영자는 전자상거래법에 의해 사업자정보 공개페이지를 쇼핑몰 홈페이지 초기 화면에 연결해야 합니다. <a href="#" className="text-blue-500 underline">자세히보기 &gt;</a></span>
                    </p>
                    <p className="flex items-start gap-1">
                      <span className="bg-gray-700 text-white text-[10px] px-1 rounded mt-0.5">!</span>
                      <span>사업자번호를 입력하면 쇼핑몰 하단 푸터에 자동으로 사업자정보 공개페이지가 연결됩니다. <a href="#" className="text-blue-500 underline">통신판매사업자 정보 확인 &gt;</a></span>
                    </p>
                  </div>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">대표자명</th>
                <td colSpan={3} className="p-4">
                  <Input 
                    value={settings.ceoName} 
                    onChange={(e) => handleChange("ceoName", e.target.value)}
                    className="max-w-[300px]" 
                  />
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">업태</th>
                <td className="p-4 border-r border-gray-200">
                  <Input 
                    value={settings.bizCondition} 
                    onChange={(e) => handleChange("bizCondition", e.target.value)}
                    className="max-w-[300px]" 
                  />
                </td>
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">종목</th>
                <td className="p-4">
                  <Input 
                    value={settings.bizItem} 
                    onChange={(e) => handleChange("bizItem", e.target.value)}
                    className="max-w-[300px]" 
                  />
                </td>
              </tr>
              {/* Row 4: 대표 이메일 */}
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700 flex items-center gap-1">
                  <span className="text-red-500">*</span> 대표 이메일
                </th>
                <td colSpan={3} className="p-4">
                   <RadioGroup defaultValue="direct" className="flex gap-6 mb-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="email-default" />
                        <Label htmlFor="email-default" className="font-normal">기본 이메일</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="direct" id="email-direct" />
                        <Label htmlFor="email-direct" className="font-normal">직접 입력</Label>
                      </div>
                   </RadioGroup>
                   <div className="flex items-center gap-2 mb-3">
                      <Input 
                        value={repEmailParts[0] || ""} 
                        onChange={(e) => handleEmailChange("repEmail", 0, e.target.value)}
                        className="w-[150px]" 
                      />
                      <span>@</span>
                      <Input 
                        value={repEmailParts[1] || ""} 
                        onChange={(e) => handleEmailChange("repEmail", 1, e.target.value)}
                        className="w-[150px]" 
                      />
                      <Select 
                        value={repEmailParts[1]} 
                        onValueChange={(val) => {
                            if (val !== "direct") handleEmailChange("repEmail", 1, val);
                        }}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="직접입력" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="direct">직접입력</SelectItem>
                          <SelectItem value="naver.com">naver.com</SelectItem>
                          <SelectItem value="gmail.com">gmail.com</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>
                   <div className="text-xs text-gray-500 space-y-1">
                      <p>• 대표 이메일은 쇼핑몰에서 고객에게 메일 발송 시 기본 발송자 이메일 정보로 사용됩니다.</p>
                      <div className="flex items-start gap-1">
                        <span className="bg-gray-700 text-white text-[10px] px-1 rounded mt-0.5">!</span>
                        <div className="space-y-1">
                           <p>몰 생성 시 기본 이메일 주소로 설정됩니다.</p>
                           <p>25년 2월부터 네이버(naver) 이메일을 사용할 경우 메일 발송이 불가하오니 기본 이메일 사용을 권장합니다.</p>
                           <p>포털(gmail, hanmail 등) 도메인으로 사용할 경우, 고객의 메일 수신이 차단될 수 있습니다. <a href="#" className="text-blue-500 underline">메일 레코드 등록 가이드 보기 &gt;</a></p>
                        </div>
                      </div>
                   </div>
                </td>
              </tr>
              {/* Row 5: 사업장 주소 */}
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">사업장 주소</th>
                <td colSpan={3} className="p-4 space-y-2">
                  <div className="flex gap-2">
                    <Input 
                        value={settings.zipCode} 
                        onChange={(e) => handleChange("zipCode", e.target.value)}
                        className="w-[100px]" 
                    />
                    <Button variant="secondary" size="sm" className="bg-gray-500 hover:bg-gray-600 text-white">우편번호찾기</Button>
                  </div>
                  <div className="flex gap-2 w-full max-w-[800px]">
                    <Input 
                        value={settings.address} 
                        onChange={(e) => handleChange("address", e.target.value)}
                        className="flex-1" 
                    />
                    <Input 
                        value={settings.addressDetail} 
                        onChange={(e) => handleChange("addressDetail", e.target.value)}
                        className="w-[300px]" 
                    />
                  </div>
                </td>
              </tr>
              {/* Row 6: 출고지 주소 */}
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">출고지 주소</th>
                 <td colSpan={3} className="p-4">
                  <div className="flex items-center gap-6">
                    <RadioGroup defaultValue="same" className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="same" id="ship-same" />
                          <Label htmlFor="ship-same" className="font-normal">사업장 주소와 동일</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="new" id="ship-new" />
                          <Label htmlFor="ship-new" className="font-normal">주소 등록</Label>
                        </div>
                    </RadioGroup>
                    <Button variant="secondary" size="sm" className="bg-gray-700 hover:bg-gray-800 text-white h-7 text-xs">출고지 관리</Button>
                  </div>
                 </td>
              </tr>
              {/* Row 7: 반품/교환지 주소 */}
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">반품/교환지 주소</th>
                 <td colSpan={3} className="p-4">
                  <div className="flex items-center gap-6">
                    <RadioGroup defaultValue="same" className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="same" id="return-same" />
                          <Label htmlFor="return-same" className="font-normal">사업장 주소와 동일</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ship-same" id="return-ship-same" />
                          <Label htmlFor="return-ship-same" className="font-normal">출고지 주소와 동일</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="new" id="return-new" />
                          <Label htmlFor="return-new" className="font-normal">주소 등록</Label>
                        </div>
                    </RadioGroup>
                    <Button variant="secondary" size="sm" className="bg-gray-700 hover:bg-gray-800 text-white h-7 text-xs">반품/교환지 관리</Button>
                  </div>
                 </td>
              </tr>
              {/* Row 8: 대표전화 / 팩스번호 */}
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">대표전화</th>
                <td className="p-4 border-r border-gray-200">
                  <Input 
                    value={settings.repPhone} 
                    onChange={(e) => handleChange("repPhone", e.target.value)}
                    className="max-w-[300px]" 
                  />
                </td>
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">팩스번호</th>
                <td className="p-4">
                  <Input 
                    value={settings.fax} 
                    onChange={(e) => handleChange("fax", e.target.value)}
                    className="max-w-[300px]" 
                  />
                </td>
              </tr>
              {/* Row 9: 통신판매신고번호 */}
              <tr className="border-b border-gray-200">
                 <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">통신판매신고번호</th>
                 <td colSpan={3} className="p-4">
                   <Input 
                    value={settings.onlineSalesLicense} 
                    onChange={(e) => handleChange("onlineSalesLicense", e.target.value)}
                    className="max-w-[300px]" 
                   />
                 </td>
              </tr>
              {/* Row 10: 인감 이미지 등록 */}
              <tr className="border-b border-gray-200">
                 <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">인감 이미지 등록</th>
                 <td colSpan={3} className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-gray-500 hover:bg-gray-600 text-white border-0">찾아보기</Button>
                      <Input readOnly value={settings.sealImagePath} className="max-w-[200px] bg-gray-50" />
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="bg-gray-700 text-white text-[10px] px-1 rounded">!</span>
                      * 가로x세로 74픽셀, jpg/png/gif만 가능 <br/>
                      &nbsp;&nbsp;&nbsp;등록된 인감 이미지는 "일반 세금계산서, 간이영수증, 거래명세서" 등에 사용됩니다.
                    </p>
                  </div>
                 </td>
              </tr>
              {/* Row 11: 현금영수증 가맹점 로고 */}
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">현금영수증 가맹점<br/>로고 하단푸터<br/>노출여부</th>
                 <td colSpan={3} className="p-4">
                    <RadioGroup 
                        value={settings.cashReceiptLogoType} 
                        onValueChange={(val) => handleChange("cashReceiptLogoType", val)}
                        className="flex gap-6"
                    >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="shop" id="cash-shop" />
                          <Label htmlFor="cash-shop" className="font-normal">현금영수증 가맹점</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="required" id="cash-required" />
                          <Label htmlFor="cash-required" className="font-normal">현금영수증 의무발행 가맹점</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                          <RadioGroupItem value="direct" id="cash-direct" />
                          <Label htmlFor="cash-direct" className="font-normal">노출 이미지 직접등록</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="cash-none" />
                          <Label htmlFor="cash-none" className="font-normal text-red-500 font-bold">노출 안함</Label>
                        </div>
                    </RadioGroup>
                 </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

       {/* Section 3: 고객센터 */}
      <div className="space-y-4 mt-8">
        <h2 className="text-lg font-bold flex items-center gap-2">
          고객센터
          <span className="text-xs font-normal text-gray-400 border px-1 rounded">?</span>
        </h2>
        
        <div className="border-t border-gray-200">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {/* Row 1 */}
              <tr className="border-b border-gray-200">
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">전화번호</th>
                <td className="p-4 border-r border-gray-200 w-1/3">
                  <Input 
                    value={settings.csPhone} 
                    onChange={(e) => handleChange("csPhone", e.target.value)}
                    className="max-w-[300px]" 
                  />
                </td>
                <th className="w-48 bg-gray-50 p-4 text-left font-medium text-gray-700">팩스번호</th>
                <td className="p-4">
                  <Input className="max-w-[300px]" />
                </td>
              </tr>
              {/* Row 2: 이메일 */}
              <tr className="border-b border-gray-200">
                <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">이메일</th>
                 <td colSpan={3} className="p-4">
                   <RadioGroup defaultValue="direct" className="flex gap-6 mb-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="cs-email-default" />
                        <Label htmlFor="cs-email-default" className="font-normal">기본 이메일</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="direct" id="cs-email-direct" />
                        <Label htmlFor="cs-email-direct" className="font-normal">직접 입력</Label>
                      </div>
                   </RadioGroup>
                   <div className="flex items-center gap-2">
                      <Input 
                        value={csEmailParts[0] || ""} 
                        onChange={(e) => handleEmailChange("csEmail", 0, e.target.value)}
                        className="w-[150px]" 
                      />
                      <span>@</span>
                      <Input 
                        value={csEmailParts[1] || ""} 
                        onChange={(e) => handleEmailChange("csEmail", 1, e.target.value)}
                        className="w-[150px]" 
                      />
                      <Select
                        value={csEmailParts[1]} 
                        onValueChange={(val) => {
                            if (val !== "direct") handleEmailChange("csEmail", 1, val);
                        }}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="직접입력" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="direct">직접입력</SelectItem>
                          <SelectItem value="naver.com">naver.com</SelectItem>
                          <SelectItem value="gmail.com">gmail.com</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>
                 </td>
              </tr>
              {/* Row 3: 운영시간 (New Added) */}
              <tr className="border-b border-gray-200">
                 <th className="bg-gray-50 p-4 text-left font-medium text-gray-700">운영시간</th>
                 <td colSpan={3} className="p-4">
                   <Textarea
                     value={settings.operatingHours}
                     onChange={(e) => handleChange("operatingHours", e.target.value)}
                     className="max-w-[500px] h-[100px]"
                   />
                 </td>
              </tr>
            </tbody>
           </table>
        </div>
      </div>

       {/* Section 4: 회사소개 내용 수정 (New Added) */}
       <div className="space-y-4 mt-8">
        <h2 className="text-lg font-bold flex items-center gap-2">
          회사소개 내용 수정
          <span className="text-xs font-normal text-gray-400 border px-1 rounded">?</span>
        </h2>
        <div className="border border-gray-200 p-2">
             <TipTapEditor content={settings.companyIntro} onChange={(content) => handleChange("companyIntro", content)} />
        </div>
      </div>

      {/* Information / Legal Section (New Added) */}
      <div className="mt-12 text-xs text-gray-500 space-y-4 py-8 border-t border-gray-200">
          <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
             <span className="w-4 h-4 rounded-sm border border-blue-500 flex items-center justify-center text-[10px]">!</span>
             안내
          </div>
          <div className="space-y-2">
              <p className="font-bold text-gray-700">[통신판매신고번호] 통신판매업신고란 무엇인가요?</p>
              <p>• 전기통신매체, 광고물 등을 통해 소비자와 직접 상거래가 이루어지는 통신 판매업을 하고자 하는 경우 반드시 신고하여야 합니다.</p>
              <p>• 미신고/ 허위신고 시 3천만원 이하의 벌금이 부과됩니다.</p>
              <p className="pl-2">(단 6개월간 거래규모 1200만원 미만, 거래횟수 20회 미만인 경우는 신고 면제대상입니다.</p>
              <p>• 신고처는 시/군/구청의 지역경제과입니다.</p>
          </div>

          <div className="space-y-2">
              <p className="font-bold text-gray-700">[통신판매신고번호] 통신판매업신고와 부가통신사업자신고는 다른가요?</p>
              <p>• 부가통신사업자란 통신판매업신고와 별도로 인터넷을 이용하여 부가통신역무를 제공하는 사업자에 대한 신고입니다.</p>
              <p>• 자본금 1억원 이하인 경우는 신고 면제대상입니다. • 미신고 시 2년 이하의 징역 또는 1억원 이하의 벌금이 부과됩니다.</p>
              <p>또한 부가통신사업신고를 한 날로부터 1년 이내에 사업을 시작하지 않거나 1년 이상 휴업을 하게 되면 1년 이내의 사업정지 명령을 받을 수 있습니다.</p>
              <p>• 신고처는 관활 체신청입니다.</p>
          </div>
      </div>
      
      {/* Footer (New Added) */}
      <div className="text-center text-xs text-gray-400 pb-8">
         © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-400">5.1.23.1206.5ccf2dd6</span>)
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
