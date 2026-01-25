"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Plus, Minus, Youtube, ArrowUp, ArrowDown } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { getSecuritySettingsAction, updateSecuritySettingsAction } from "@/actions/management-policy-actions";

export default function OperationSecuritySettingsPage() {
    const [isPending, startTransition] = useTransition();

    // Security Settings State
    const [authEmailEnabled, setAuthEmailEnabled] = useState(false);
    const [securityLogin, setSecurityLogin] = useState("unused");
    const [screenSecurity, setScreenSecurity] = useState("unused");
    
    // Login Settings
    const [adminAutoLogoutType, setAdminAutoLogoutType] = useState("default");
    const [adminAutoLogoutTime, setAdminAutoLogoutTime] = useState(120);
    const [longTermUnusedPeriod, setLongTermUnusedPeriod] = useState("1year");
    const [longTermUnusedNotice, setLongTermUnusedNotice] = useState("unused");

    // IP & Country Settings
    const [adminIpRestriction, setAdminIpRestriction] = useState("unused");
    const [shopIpRestriction, setShopIpRestriction] = useState("unused");
    const [allowedCountries, setAllowedCountries] = useState<string[]>([]);
    const [blockedCountries, setBlockedCountries] = useState<string[]>([]);
    const [adminIpExceptions, setAdminIpExceptions] = useState<{ ip: string; memo: string }[]>([]);

    // Mall Screen Security
    const [dragBlock, setDragBlock] = useState("unused");
    const [rightClickBlock, setRightClickBlock] = useState("unused");
    const [adminUnblock, setAdminUnblock] = useState("unused");

    // Temporary Country List for selection (Simplified)
    const [allCountries] = useState([
        "가나 (Ghana)", "가봉(Gabon)", "가이아나(Guyana)", "감비아(Gambia)", "건지 섬(Guernsey)", "과들루프(Guadeloupe)", "과테말라(Guatemala)", "그레나다(Grenada)", "그리스(Greece)", "그린랜드(Greenland)", "기니(Guinea)", "기니비사우(Guinea-Bissau)", "나미비아(Namibia)", "나우루(Nauru)", "나이지리아(Nigeria)", "남극(Antarctica)", "남수단(South Sudan)", "남아프리카 공화국(South Africa)", "네덜란드(Netherlands)", "네덜란드령 안틸리스(Netherlands Antilles)", "네팔(Nepal)", "노르웨이(Norway)", "노퍽 섬(Norfolk Island)", "뉴질랜드(New Zealand (Aotearoa))", "뉴칼레도니아(New Caledonia)", "니우에(Niue)", "니제르(Niger)", "니카라과(Nicaragua)", 
        "대만(Taiwan)", "대한민국(Korea (South))", "덴마크(Denmark)", "도미니카 공화국(Dominican Republic)", "도미니카 연방(Dominica)", "독일(Germany)", "동티모르(East Timor)", "라오스(Laos)", "라이베리아(Liberia)", "라트비아(Latvia)", "러시아(Russia)", "레바논(Lebanon)", "레소토(Lesotho)", "레위니옹(Reunion)", "루마니아(Romania)", "룩셈부르그(Luxembourg)", "르완다(Rwanda)", "리비아(Libya)", "리투아니아(Lithuania)", "리히텐슈타인(Liechtenstein)", 
        "마다가스카르(Madagascar)", "마르티니크(Martinique)", "마셜 제도(Marshall Islands)", "마요트(Mayotte)", "마카오(Macau)", "마케도니아 공화국(Macedonia)", "말라위(Malawi)", "말레이시아(Malaysia)", "말리(Mali)", "맨 섬(Isle of Mann)", "멕시코(Mexico)", "모나코(Monaco)", "모로코(Morocco)", "모리셔스(Mauritius)", "모리타니(Mauritania)", "모잠비크(Mozambique)", "몬세라트(Montserrat)", "몬테네그로(Montenegro)", "몰도바(Moldova)", "몰디브(Maldives)", "몰타(Malta)", "몽골(Mongolia)", "미국(United States)", "미국령 괌(Guam)", "미국령 군소 제도(United States Minor Outlying Islands)", "미국령 버진아일랜드(Virgin Islands (U.S.))", "미국령 사모아(American Samoa)", "미얀마(Burma (Myanmar))", "미크로네시아 연방(Micronesia)", 
        "바누아투(Vanuatu)", "바레인(Bahrain)", "바베이도스(Barbados)", "바티칸 시국(Vatican City State (Holy See))", "바하마(Bahamas)", "방글라데시(Bangladesh)", "버뮤다(Bermuda)", "베네수엘라(Venezuela)", "베넹(Benin)", "베트남(Viet Nam)", "벨기에(Belgium)", "벨라루스(Belarus)", "벨리세(Belize)", "보스니아 헤르체코비나(Bosnia and Herzegovina)", "보츠와나(Botswana)", "볼리비아(Bolivia)", "볼벳도(Bouvet Island)", "부룬디(Burundi)", "부르키나파소(Burkina Faso)", "부탄(Bhutan)", "북마리아나 제도(Northern Mariana Islands)", "불가리아(Bulgaria)", "브라질(Brazil)", "브루나이(Brunei Darussalam)", 
        "사모아(Samoa)", "사우디아라비아(Saudi Arabia)", "사우스조지아 사우스샌드위치 제도(S. Georgia and S. Sandwich Isls.)", "산마리노(San Marino)", "상투메 프린시페(Sao Tome and Principe)", "생피에르 미클롱(St. Pierre and Miquelon)", "서사하라(Western Sahara)", "세네갈(Senegal)", "세르비아(Republic of Serbia)", "세르비아 몬테네그로(Serbia and Montenegro)", "세이셸(Seychelles)", "세인트 루시아(Saint Lucia)", "세인트 빈센트 그레나딘(Saint Vincent and the Grenadines)", "세인트 크리스토퍼 네비스(Saint Kitts and Nevis)", "세인트헬레나(St. Helena)", "소말리아(Somalia)", "솔로몬 제도(Solomon Islands)", "수단(Sudan)", "수리남(Suriname)", "스리랑카(Sri Lanka)", "스발바르 얀마옌(Svalbard and Jan Mayen Islands)", "스와질란드(Swaziland)", "스웨덴(Sweden)", "스위스(Switzerland)", "스페인(Spain)", "슬로바키아(Slovak Republic)", "슬로베니아(Slovenia)", "시리아(Syria)", "시에라리온(Sierra Leone)", "신트마르텐(Saint Martin (Netherlands))", "싱가포르(Singapore)", 
        "아랍에미리트(United Arab Emirates)", "아루바(Aruba)", "아르메니아(Armenia)", "아르헨티나(Argentina)", "아이슬란드(Iceland)", "아이티(Haiti)", "아일랜드(Ireland)", "아제르바이잔(Azerbaijan)", "아프카니스탄(Afghanistan)", "안도라(Andorra)", "알바니아(Albania)", "알제리(Algeria)", "앙골라(Angola)", "앙귈라(Anguilla)", "앤티가 바부다(Antigua and Barbuda)", "에리트레아(Eritrea)", "에스토니아(Estonia)", "에콰도르(Ecuador)", "에티오피아(Ethiopia)", "엘살바도르(El Salvador)", "영국(United Kingdom)", "영국령 버진아일랜드(Virgin Islands (British))", "영국령 인도양 지역(British Indian Ocean Territory)", "예멘(Yemen)", "오만(Oman)", "오스트리아(Austria)", "온두라스(Honduras)", "올란도 제도(Aland Islands)", "요르단(Jordan)", "우간다(Uganda)", "우루과이(Uruguay)", "우즈베키스탄(Uzbekistan)", "우크라이나(Ukraine)", "월리스푸투나(Wallis and Futuna Islands)", "이라크(Iraq)", "이란(Iran)", "이스라엘(Israel)", "이집트(Egypt)", "이탈리아(Italy)", "인도(India)", "인도네시아(Indonesia)", "일본(Japan)", 
        "자메이카(Jamaica)", "잠비아(Zambia)", "저지 (Bailiwick of Jersey)", "적도 기니(Equatorial Guinea)", "조선민주주의 인민공화국(Korea (North))", "조지아(Georgia)", "중앙아프리카 공화국(Central African Republic)", "중화인민공화국(China)", "지부티(Djibouti)", "지브롤(Gibraltar)", "짐바브웨(Zimbabwe)", 
        "차드(Chad)", "체코(Czech Republic)", "칠레(Chile)", 
        "카메룬(Cameroon)", "카보베르데(Cape Verde)", "카자흐스탄(Kazakhstan)", "카타르(Qatar)", "캄보디아(Cambodia)", "캐나다(Canada)", "케냐(Kenya)", "케이맨 제도(Cayman Islands)", "코모로(Comoros)", "코스타리카(Costa Rica)", "코코스 제도(Cocos (Keeling) Islands)", "코트디부아르(Ivory Coast)", "콜롬비아(Colombia)", "콩고(Congo)", "콩고 민주 공화국(Democratic Republic of Congo)", "쿠바(Cuba)", "쿠웨이트(Kuwait)", "쿡 제도(Cook Islands)", "크로아티아(Croatia (Hrvatska))", "크리스마스 섬(Christmas Island)", "키르기즈스탄(Kyrgyzstan)", "키리바티(Kiribati)", "키프로스(Cyprus)", 
        "타지키스탄(Tajikistan)", "탄자니아(Tanzania)", "태국(Thailand)", "터크스 케이커스 제도(Turks and Caicos Islands)", "터키(Turkey)", "토고(Togo)", "토켈라우(Tokelau)", "통가(Tonga)", "투르크메니스탄(Turkmenistan)", "투발루(Tuvalu)", "튀니지(Tunisia)", "트리니다드 토바고(Trinidad and Tobago)", 
        "파나마(Panama)", "파라과이(Paraguay)", "파키스탄(Pakistan)", "파푸아뉴기니(Papua New Guinea)", "팔라우(Palau)", "팔레스타인(Palestinian Territory, Occupied)", "페로 제도(Faroe Islands)", "페루(Peru)", "포르투칼(Portugal)", "포클랜드 제도(Falkland Islands (Malvinas))", "폴란드(Poland)", "푸에르토리코(Puerto Rico)", "프랑스(France)", "프랑스령 기아나(French Guiana)", "프랑스령 남방 및 남극(French Southern Territories)", "프랑스령 폴리네시아(French Polynesia)", "피지(Fiji)", "핀란드(Finland)", "필리핀(Philippines)", "핏케언 제도(Pitcairn)", 
        "허드 맥도널드 제도(Heard and McDonald Islands)", "헝가리(Hungary)", "호주(Australia)", "홍콩(Hong Kong)"
    ]); 
    
    // Selection state for Country Lists
    const [selectedAllowed, setSelectedAllowed] = useState<string[]>([]);
    const [selectedBlocked, setSelectedBlocked] = useState<string[]>([]); 

    useEffect(() => {
        const fetchData = async () => {
            const result = await getSecuritySettingsAction();
            if (result.success && result.settings) {
                setAuthEmailEnabled(result.settings.authEmailEnabled);
                setSecurityLogin(result.settings.securityLogin);
                setScreenSecurity(result.settings.screenSecurity);
                setAdminAutoLogoutType(result.settings.adminAutoLogoutType);
                setAdminAutoLogoutTime(result.settings.adminAutoLogoutTime || 120);
                setLongTermUnusedPeriod(result.settings.longTermUnusedPeriod);
                setLongTermUnusedNotice(result.settings.longTermUnusedNotice);
                setAdminIpRestriction(result.settings.adminIpRestriction);
                setShopIpRestriction(result.settings.shopIpRestriction);
                
                // Initialize Allowed/Blocked Lists
                const loadedAllowed = (result.settings.allowedCountries as string[]) || [];
                const loadedBlocked = (result.settings.blockedCountries as string[]) || [];
                
                // If both are empty (initial state), populate allowed with allCountries
                if (loadedAllowed.length === 0 && loadedBlocked.length === 0) {
                    setAllowedCountries(allCountries);
                    setBlockedCountries([]);
                } else {
                    setAllowedCountries(loadedAllowed);
                    setBlockedCountries(loadedBlocked);
                }

                setAdminIpExceptions((result.settings.adminIpExceptions as { ip: string; memo: string }[]) || []);
                setDragBlock(result.settings.dragBlock);
                setRightClickBlock(result.settings.rightClickBlock);
                setAdminUnblock(result.settings.adminUnblock);
            }
        };
        fetchData();
    }, [allCountries]);

    const handleSave = () => {
        startTransition(async () => {
            const result = await updateSecuritySettingsAction({
                authEmailEnabled,
                securityLogin,
                screenSecurity,
                adminAutoLogoutType,
                adminAutoLogoutTime,
                longTermUnusedPeriod,
                longTermUnusedNotice,
                adminIpRestriction,
                shopIpRestriction,
                allowedCountries,
                blockedCountries,
                adminIpExceptions,
                dragBlock,
                rightClickBlock,
                adminUnblock,
            });
            if (result.success) {
                alert("저장되었습니다.");
            } else {
                alert(result.error || "저장 실패");
            }
        });
    };

    const toggleSelection = (item: string, list: string[], setList: (items: string[]) => void) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const moveToBlocked = () => {
        const newBlocked = [...blockedCountries, ...selectedAllowed];
        const newAllowed = allowedCountries.filter(c => !selectedAllowed.includes(c));
        setBlockedCountries(newBlocked);
        setAllowedCountries(newAllowed);
        setSelectedAllowed([]);
    };

    const moveToAllowed = () => {
        const newAllowed = [...allowedCountries, ...selectedBlocked];
        const newBlocked = blockedCountries.filter(c => !selectedBlocked.includes(c));
        setAllowedCountries(newAllowed);
        setBlockedCountries(newBlocked);
        setSelectedBlocked([]);
    };

    const handleAddIpException = () => {
        setAdminIpExceptions([...adminIpExceptions, { ip: "", memo: "" }]);
    };
    
    const handleIpChange = (index: number, partIndex: number, value: string) => {
        const newExceptions = [...adminIpExceptions];
        const currentIp = newExceptions[index].ip || "...";
        const parts = currentIp.split(".").map(p => p || "");
        while(parts.length < 4) parts.push("");
        
        parts[partIndex] = value;
        newExceptions[index].ip = parts.join(".");
        setAdminIpExceptions(newExceptions);
    };

    const handleRemoveIpException = (index: number) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            const newExceptions = [...adminIpExceptions];
            newExceptions.splice(index, 1);
            setAdminIpExceptions(newExceptions);
        }
    };

    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* ... Header ... */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">운영 보안 설정</h1>
                <Button 
                    className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium"
                    onClick={handleSave}
                    disabled={isPending}
                >
                    {isPending ? "저장 중..." : "저장"}
                </Button>
            </div>
            {/* Info Box */}
            <div className="border border-gray-300 p-6 bg-white">
                <h2 className="text-lg font-bold text-gray-800 mb-2">관리자 운영 보안이란?</h2>
                <div className="text-xs text-gray-600 leading-relaxed space-y-1">
                    <p>정보통신망을 통해 외부에서 개인정보처리시스템(쇼핑몰 등)에 접속 시 단순히 아이디와 비밀번호만을 이용할 경우, 해킹에 의해 접속정보가 유출되어 쇼핑몰이 쉽게 위험에 노출되게 됩니다.</p>
                    <p>이러한 위험성을 감소시키기 위해 아이디/비밀번호를 이용하는 인증과 별도로 휴대폰, 일회용비밀번호(OTP), IP인증 등을 활용한 추가적인 안전한 인증수단을 적용하여야 합니다.</p>
                    <p>해당 법령을 준수하지 않을 경우 개인정보 보호법 제 75조에 따라 5천만원 이하의 과태료에 처할 수 있습니다.</p>
                    <p>개인정보 보호법 및 개인정보 보호법 시행령 등 관련 법률 내용을 필독하시고 <span className="text-red-500 font-medium">“관리자 보안로그인”</span> 또는 <span className="text-red-500 font-medium">“관리자 IP 접속제한”</span> 을 설정하시기를 권장합니다. <a href="#" className="text-blue-500 underline">내용 확인 &gt;</a></p>
                </div>
            </div>

            {/* Section 1: Admin Security Authentication Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">관리자 보안인증 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">인증수단</div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center gap-4">

                                <div className="flex items-center gap-2">
                                    <Checkbox 
                                        id="auth-email" 
                                        className="rounded-sm border-gray-300" 
                                        checked={authEmailEnabled}
                                        onCheckedChange={(checked) => setAuthEmailEnabled(checked as boolean)}
                                    />
                                    <Label htmlFor="auth-email" className="font-normal">이메일인증</Label>
                                </div>
                            </div>
                            <div className="text-xs space-y-1">
                                <p className="text-red-500 font-medium">! 최고운영자 정보에 인증정보(SMS, 이메일)가 없습니다. 인증정보를 먼저 등록해주세요. <a href="#" className="underline text-blue-500">최고운영자 정보 수정하기 &gt;</a></p>
                                <p className="text-red-500">최고운영자의 인증정보가 등록되지 않으면 보안로그인/화면보안접속 설정과 관계없이 보안인증화면이 노출되지 않습니다</p>
                                <p className="text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 로그인한 운영자 정보에 인증정보(SMS, 이메일)가 없는 경우, 보안인증화면이 노출되지 않습니다.</p>
                                <p className="text-gray-500 ml-5">관리자 보안인증 설정을 사용 시, 운영자 정보에 인증정보를 등록해주세요. <a href="#" className="underline text-blue-500">운영자 정보 수정하기 &gt;</a></p>

                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">보안로그인</div>
                        <div className="p-4 flex items-center gap-6">
                            <RadioGroup value={securityLogin} onValueChange={setSecurityLogin} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="login-used" />
                                    <Label htmlFor="login-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="login-unused" />
                                    <Label htmlFor="login-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">화면보안접속</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup value={screenSecurity} onValueChange={setScreenSecurity} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="screen-used" />
                                    <Label htmlFor="screen-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="screen-unused" />
                                    <Label htmlFor="screen-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p>화면보안접속 사용 시 보안접속 인증화면이 노출되는 화면</p>
                                <p>- 기본설정&gt;관리정책&gt;운영자관리/운영자등록</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> - 기본설정&gt;관리정책&gt;운영보안설정</p>
                                <p className="ml-5">- 기본설정&gt;결제정책&gt;무통장입금은행관리</p>
                                <p className="ml-5">- 회원&gt;SMS관리&gt;개별/전체 SMS 발송</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Admin Login Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">관리자 로그인 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">관리자 자동 로그아웃</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup value={adminAutoLogoutType} onValueChange={setAdminAutoLogoutType} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="default" id="logout-default" />
                                    <Label htmlFor="logout-default" className="font-normal cursor-pointer">기본설정</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="custom" id="logout-custom" />
                                    <Label htmlFor="logout-custom" className="font-normal cursor-pointer flex items-center gap-1">
                                        로그인 후 
                                        <select 
                                            className="h-6 border border-gray-300 rounded-sm text-xs mx-1 w-16"
                                            value={adminAutoLogoutTime}
                                            onChange={(e) => setAdminAutoLogoutTime(Number(e.target.value))}
                                            disabled={adminAutoLogoutType === "default"}
                                        >
                                            <option value={60}>60</option>
                                            <option value={120}>120</option>
                                            <option value={180}>180</option>
                                        </select>
                                        분간 클릭이 없으면 자동 로그아웃
                                    </Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-red-500 mt-1 flex items-start gap-1"><span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 기본설정 시 모든 브라우저를 닫거나 수동으로 로그아웃을 한 경우 로그아웃 됩니다. 또한, 보안상의 이유로 일정 시간이 경과 되면 자동으로 로그아웃 됩니다.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">장기 미로그인 기간</div>
                        <div className="p-4 flex items-center gap-6">
                            <RadioGroup value={longTermUnusedPeriod} onValueChange={setLongTermUnusedPeriod} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="3months" id="term-3m" />
                                    <Label htmlFor="term-3m" className="font-normal cursor-pointer">3개월</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="6months" id="term-6m" />
                                    <Label htmlFor="term-6m" className="font-normal cursor-pointer">6개월</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="1year" id="term-1y" />
                                    <Label htmlFor="term-1y" className="font-normal cursor-pointer">1년</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="2years" id="term-2y" />
                                    <Label htmlFor="term-2y" className="font-normal cursor-pointer">2년</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">장기 미로그인 운영자<br/>안내 사용여부</div>
                        <div className="p-4 space-y-2">
                            <RadioGroup value={longTermUnusedNotice} onValueChange={setLongTermUnusedNotice} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="noti-used" />
                                    <Label htmlFor="noti-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="noti-unused" />
                                    <Label htmlFor="noti-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 사용함 설정 시, 장기 미로그인 운영자 안내 팝업이 노출됩니다.</p>
                                <p className="ml-5">사용을 원하지 않는 경우 사용안함으로 설정해주시면 됩니다.</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 장기 미로그인 운영자 수에 최고운영자/대표운영자도 포함되며, 최고운영자는 삭제 및 로그인 제한 처리가 불가 합니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: IP Access Restriction Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">IP 접속제한 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border-t border-gray-400">
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">관리자 IP 접속제한</div>
                        <div className="p-4 flex items-center gap-6">
                            <RadioGroup value={adminIpRestriction} onValueChange={setAdminIpRestriction} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="admin-ip-used" />
                                    <Label htmlFor="admin-ip-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="admin-ip-unused" />
                                    <Label htmlFor="admin-ip-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">쇼핑몰 IP 접속제한</div>
                        <div className="p-4 flex items-center gap-6">
                            <RadioGroup value={shopIpRestriction} onValueChange={setShopIpRestriction} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="shop-ip-used" />
                                    <Label htmlFor="shop-ip-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="shop-ip-unused" />
                                    <Label htmlFor="shop-ip-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">국가별<br/>접속제한 설정 <HelpCircle size={12} className="inline text-gray-400" /></div>
                        <div className="p-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <div className="text-xs text-gray-600 mb-1">허용국가</div>
                                    <div className="border border-gray-300 h-48 overflow-y-auto p-1 bg-white">
                                        <ul className="text-xs space-y-1">
                                            {allowedCountries.map((country, i) => (
                                                <li 
                                                    key={i} 
                                                    className={`p-1 cursor-pointer ${selectedAllowed.includes(country) ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"}`}
                                                    onClick={() => toggleSelection(country, selectedAllowed, setSelectedAllowed)}
                                                >
                                                    {country}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                        <span className="bg-gray-700 text-white w-3 h-3 flex items-center justify-center text-[10px] rounded-sm">!</span> Shift 버튼을 누른 상태에서 선택하면 여러 항목을 동시에 선택할 수 있습니다.
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center gap-2 h-48 pt-6">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="h-10 w-10 p-0"
                                        onClick={moveToBlocked}
                                        disabled={selectedAllowed.length === 0}
                                    >
                                        <Plus size={24} />
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="h-10 w-10 p-0"
                                        onClick={moveToAllowed}
                                        disabled={selectedBlocked.length === 0}
                                    >
                                        <Minus size={24} />
                                    </Button>
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-gray-600 mb-1">차단국가</div>
                                    <div className="border border-gray-300 h-48 overflow-y-auto p-1 bg-white">
                                        <ul className="text-xs space-y-1">
                                            {blockedCountries.map((country, i) => (
                                                <li 
                                                    key={i} 
                                                    className={`p-1 cursor-pointer ${selectedBlocked.includes(country) ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"}`}
                                                    onClick={() => toggleSelection(country, selectedBlocked, setSelectedBlocked)}
                                                >
                                                    {country}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">관리자 IP 접근시도 예<br/>외 등록 <HelpCircle size={12} className="inline text-gray-400" /></div>
                        <div className="p-4 space-y-2">
                             <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 text-xs border-gray-300"
                                onClick={handleAddIpException}
                            >
                                <Plus size={14} className="mr-1" /> 추가
                            </Button>

                            {/* Exception List */}
                            <div className="space-y-2">
                                {adminIpExceptions.map((item, index) => {
                                    const parts = item.ip ? item.ip.split(".") : ["", "", "", ""];
                                    // Ensure we always have 4 parts for rendering
                                    while(parts.length < 4) parts.push("");

                                    return (
                                        <div key={index} className="flex items-center gap-1">
                                            <Input 
                                                className="w-14 h-8 rounded-sm text-center px-1" 
                                                value={parts[0]} 
                                                onChange={(e) => handleIpChange(index, 0, e.target.value)}
                                                maxLength={3}
                                            />
                                            <span className="text-gray-400">.</span>
                                            <Input 
                                                className="w-14 h-8 rounded-sm text-center px-1" 
                                                value={parts[1]} 
                                                onChange={(e) => handleIpChange(index, 1, e.target.value)}
                                                maxLength={3}
                                            />
                                            <span className="text-gray-400">.</span>
                                            <Input 
                                                className="w-14 h-8 rounded-sm text-center px-1" 
                                                value={parts[2]} 
                                                onChange={(e) => handleIpChange(index, 2, e.target.value)}
                                                maxLength={3}
                                            />
                                            <span className="text-gray-400">.</span>
                                            <Input 
                                                className="w-14 h-8 rounded-sm text-center px-1" 
                                                value={parts[3]} 
                                                onChange={(e) => handleIpChange(index, 3, e.target.value)}
                                                maxLength={3}
                                            />
                                            <div className="flex items-center gap-1 ml-2 mr-2 whitespace-nowrap">
                                                <Checkbox id={`range-${index}`} className="rounded-sm border-gray-300" />
                                                <Label htmlFor={`range-${index}`} className="font-normal text-xs text-gray-600">대역 지정</Label>
                                            </div>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="h-8 text-xs border-gray-300 text-gray-600 bg-white hover:bg-gray-50 px-3"
                                                onClick={() => handleRemoveIpException(index)}
                                            >
                                                <Minus size={12} className="mr-1" /> 삭제
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="text-xs text-gray-500 space-y-1">
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 특정 IP에 대한 로그인 접속시도 제한을 해지합니다.</p>
                                <p className="ml-5">외부연동 서비스를 사용할 때 설정하시면 로그인시도로 인한 로그인차단을 해지할 수 있으나, 보안상 해당 설정을 권장하지 않습니다.</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 관리자 IP 접속제한에 대한 예외 처리가 아닌, 접근시도에 대한 예외처리입니다.</p>
                            </div>
                            <div className="text-xs text-red-500 space-y-1 pt-2">
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 공인 IP에 대해서만 작동하며, 사설 IP 등록 시 작동하지 않습니다.</p>
                                <p className="ml-5">(사설 IP 대역 : 10.0.0.0 ~ 10.255.255.255, 172.16.0.0 ~ 172.31.255.255, 192.168.0.0 ~ 192.168.255.255)</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 유동적으로 변경되는 IP 등록 시 접속이 제한되실 수 있으니 주의바랍니다.</p>
                                <p className="flex items-start gap-1"><span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> IP접속제한 설정 시 잘못된 IP 등록으로 사이트 접속 및 운영에 문제가 생길 수 있으므로 주의 바랍니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Shopping Mall Security Settings */}


             {/* Section 5: Mall Screen Security Settings */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">쇼핑몰 화면 보안 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                <div className="border-t border-gray-400">
                     <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">마우스 드래그 차단</div>
                        <div className="p-4 space-y-2">
                             <RadioGroup value={dragBlock} onValueChange={setDragBlock} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="drag-block-used" />
                                    <Label htmlFor="drag-block-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="drag-block-unused" />
                                    <Label htmlFor="drag-block-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> "사용함" 선택 시 마우스로 드래그하여 텍스트 내용을 선택할 수 없습니다.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">오른쪽 마우스 차단</div>
                        <div className="p-4 space-y-2">
                             <RadioGroup value={rightClickBlock} onValueChange={setRightClickBlock} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="rightclick-block-used" />
                                    <Label htmlFor="rightclick-block-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="rightclick-block-unused" />
                                    <Label htmlFor="rightclick-block-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> "사용함" 선택 시 마우스 오른쪽 버튼을 클릭할 수 없습니다.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">관리자 차단해제</div>
                        <div className="p-4 space-y-2">
                             <RadioGroup value={adminUnblock} onValueChange={setAdminUnblock} className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="admin-unblock-used" />
                                    <Label htmlFor="admin-unblock-used" className="font-normal cursor-pointer">사용함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="admin-unblock-unused" />
                                    <Label htmlFor="admin-unblock-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-gray-500 flex items-start gap-1"><span className="w-4 flex justify-center bg-gray-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> "사용함" 선택 시 관리자로 접속하면 ‘마우스 드래그 차단’과 ‘오른쪽 마우스 차단’을 해제합니다.</p>
                        </div>
                    </div>
                </div>
                <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <span className="bg-gray-700 text-white w-3 h-3 flex items-center justify-center text-[10px] rounded-sm">!</span> 인터넷 익스플로러(IE) 외 기타 브라우저에서는 지원되지 않을 수 있습니다.
                </div>
            </div>


            
            <div className="flex justify-center mt-8 text-gray-500 text-xs">
                © NHN COMMERCE Corp All Rights Reserved. (ver : <span className="text-red-500">5.1.23.1206.5ccf2dd6</span>)
            </div>

             {/* Floating Actions */}
             <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-12 h-12 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold"><Youtube size={20}/></span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-[#6E36E2] hover:bg-[#6E36E2]/90 shadow-lg text-white p-0 flex flex-col items-center justify-center border-0 gap-0">
                    <span className="text-[10px] leading-none">따라</span>
                    <span className="text-[10px] leading-none">하기</span>
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    <ArrowUp size={20} />
                </Button>
                <Button className="rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-400 shadow-lg text-white p-0 flex items-center justify-center border-0 text-xl font-bold">
                    <ArrowDown size={20} />
                </Button>
            </div>
        </div>
    );
}
