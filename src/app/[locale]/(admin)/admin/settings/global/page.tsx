"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, Youtube, ArrowUp, ArrowDown, BookOpen, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function GlobalShopSettingsPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">해외 상점 설정</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium">
                    저장
                </Button>
            </div>

            {/* Shop Tabs */}
            <div className="flex border border-gray-300 border-b-0 w-fit mt-4">
                <div className="flex items-center gap-2 px-6 py-3 border-r border-gray-300 bg-white cursor-pointer min-w-[120px] justify-center border-t-2 border-t-red-500">
                    <span className="text-lg">🇺🇸</span>
                    <span className="font-bold text-gray-800">영문몰</span>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 border-r border-gray-300 bg-gray-50 hover:bg-white cursor-pointer min-w-[120px] justify-center border-b border-b-gray-300">
                    <span className="text-lg">🇨🇳</span>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 border-r border-gray-300 bg-gray-50 hover:bg-white cursor-pointer min-w-[120px] justify-center border-b border-b-gray-300">
                    <span className="text-lg">🇯🇵</span>
                </div>
            </div>

            <div className="space-y-4 -mt-4 pt-8"> {/* Negative margin to pull up to tabs if needed, or just normal spacing */}
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">해외 상점 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>
                
                <div className="border-t border-gray-400">
                    {/* Domain */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center gap-1">
                            도메인 <HelpCircle size={14} className="text-gray-400" />
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-800">
                                <span className="w-12">임시 :</span>
                                <span>https://sosexy7654.godomall.com/us/</span>
                                <span className="text-gray-500">( 영문몰 대표도메인 )</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-800">
                                <span className="w-12">연결 :</span>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-7 text-xs px-2 bg-gray-100 border-gray-300 text-gray-600 font-normal">
                                            <Plus size={12} className="mr-1" /> 연결도메인 추가
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl bg-white p-0 gap-0">
                                        <DialogHeader className="px-6 py-4 border-b border-gray-200">
                                            <DialogTitle className="text-xl font-bold text-gray-800">연결 도메인 추가</DialogTitle>
                                        </DialogHeader>
                                        <div className="p-6 space-y-6">
                                            <div className="flex items-center border-b border-gray-200 pb-6">
                                                <Label className="w-32 text-gray-700 font-bold">도메인 입력</Label>
                                                <Input className="w-80 h-8 rounded-sm" />
                                            </div>
                                            <div className="space-y-3 text-xs text-gray-600">
                                                <p className="flex items-start gap-1">
                                                    <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5 font-bold">!</span>
                                                    <span>
                                                        도메인 연결을 신청하시기 전에<br />
                                                        반드시 “소유 도메인”의 네임서버정보가 고도의 네임서버 정보로 되어있는지 확인하세요!!
                                                    </span>
                                                </p>
                                                <p className="flex items-start gap-1">
                                                    <span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5 font-bold">!</span>
                                                    <span>
                                                        <a href="#" className="text-blue-500 underline decoration-blue-500">‘마이페이지 &gt; 도메인 연결’</a>
                                                        <span className="text-red-500">에서 해당 솔루션에 연결한 도메인만 연결신청이 가능합니다.</span>
                                                    </span>
                                                </p>
                                                <p className="flex items-start gap-1">
                                                    <span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5 font-bold">!</span>
                                                    <span className="text-red-500 leading-relaxed">
                                                        아래 2가지 도메인은 해외몰 도메인 연결 신청이 불가합니다.<br />
                                                        ① '기본설정 &gt; 기본 정보 설정 &gt; 쇼핑몰 기본 정보'에 입력한 '쇼핑몰 도메인'<br />
                                                        ② 현재 관리자에 접속한 도메인 주소
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <DialogFooter className="sm:justify-center gap-2 border-t border-gray-200 p-4 bg-gray-50/50">
                                            <Button className="bg-gray-400 hover:bg-gray-500 text-white rounded-sm px-8 h-9 font-normal">연결 신청하기</Button>
                                            <Button variant="outline" className="border-gray-300 rounded-sm px-8 h-9 bg-white hover:bg-gray-50 font-normal">취소</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Button variant="outline" size="sm" className="h-7 text-xs px-2 bg-white border-gray-300 text-gray-600 font-normal">
                                    도메인 신청하기
                                </Button>
                            </div>
                            <div className="text-xs space-y-1 mt-2">
                                <p className="text-red-500 font-medium flex items-start gap-1">
                                    <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                    해외상점의 연결도메인을 추가할 경우, 반드시 기준몰에서 사용하지 않는 도메인만 입력하시기 바랍니다.
                                </p>
                                <p className="text-gray-400 pl-5">
                                    기준몰(국내몰)과 연결된 도메인을 추가하시면, 기준몰을 포함한 전체 쇼핑몰 이용에 문제가 발생할 수 있습니다.
                                </p>
                                <p className="text-gray-500 flex items-start gap-1">
                                    <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                    추가한 도메인 중 해외상점의 대표 도메인을 설정할 수 있습니다.
                                </p>
                                <p className="text-gray-400 pl-5">
                                    해외 상점 이동 시 대표 도메인으로 연결되나, 보안서버가 연결 되어 있는 경우보안서버 도메인으로 자동 페이지 변경됩니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Usage Setting */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center gap-1">
                            <span className="text-red-500 text-[10px] align-top mr-0.5">●</span>
                            사용설정
                        </div>
                        <div className="p-4 space-y-2">
                            <RadioGroup defaultValue="unused" className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="used" id="usage-used" />
                                    <Label htmlFor="usage-used" className="font-normal cursor-pointer">사용</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="usage-unused" />
                                    <Label htmlFor="usage-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                            </RadioGroup>
                            <p className="text-xs text-red-500 font-medium flex items-start gap-1">
                                <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                해외상점을 사용하기 위해서는 "환율설정"을 반드시 입력하셔야만 정상적으로 사용이 가능합니다..
                            </p>
                            <p className="text-gray-500 pl-5 text-xs">
                                환율설정은 <a href="#" className="text-blue-500 underline">"기본설정 &gt; 해외상점 &gt; 환율설정"</a> 에서 설정하실 수 있습니다.
                            </p>
                        </div>
                    </div>

                    {/* Language Setting */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center gap-1">
                            <span className="text-red-500 text-[10px] align-top mr-0.5">●</span>
                            언어설정
                        </div>
                        <div className="p-4 flex items-center gap-2 text-sm">
                            <span className="text-lg">🇺🇸</span>
                            <span className="text-gray-800">English(영어)</span>
                        </div>
                    </div>

                    {/* Currency Setting */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center gap-1">
                            <span className="text-red-500 text-[10px] align-top mr-0.5">●</span>
                            사용화폐
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="text-sm">결제화폐 : USD - U.S Dollar ( $ )</div>
                            <div className="flex items-center gap-2 text-sm">
                                <span>금액 표시 방법 :</span>
                                <Select defaultValue="dollar">
                                    <SelectTrigger className="w-[120px] h-8 rounded-sm border-gray-300 bg-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dollar">$</SelectItem>
                                        <SelectItem value="usd">USD</SelectItem>
                                        <SelectItem value="us-dollar">U.S Dollar</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-gray-800">표시예제 : $ 1,000</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span>소수점 자리 노출 :</span>
                                <RadioGroup defaultValue="2decimals" className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="unused" id="decimal-unused" />
                                        <Label htmlFor="decimal-unused" className="font-normal cursor-pointer text-gray-600">사용안함</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="2decimals" id="decimal-used" />
                                        <Label htmlFor="decimal-used" className="font-normal cursor-pointer text-gray-600">사용함 (소수점 2자리)</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>

                    {/* Reference Currency */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">참조화폐</div>
                        <div className="p-4">
                            <RadioGroup defaultValue="unused" className="grid grid-cols-3 gap-y-2 max-w-lg">
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="unused" id="ref-unused" />
                                    <Label htmlFor="ref-unused" className="font-normal cursor-pointer">사용안함</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="krw" id="ref-krw" />
                                    <Label htmlFor="ref-krw" className="font-normal cursor-pointer">KRW - Won(₩)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="usd" id="ref-usd" />
                                    <Label htmlFor="ref-usd" className="font-normal cursor-pointer">USD - U.S Dollar ( $ )</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="jpy" id="ref-jpy" />
                                    <Label htmlFor="ref-jpy" className="font-normal cursor-pointer">JPY - Yen(¥)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="cny" id="ref-cny" />
                                    <Label htmlFor="ref-cny" className="font-normal cursor-pointer">CNY - Yuan(¥)</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="eur" id="ref-eur" />
                                    <Label htmlFor="ref-eur" className="font-normal cursor-pointer">EUR - euro(€)</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Priority Region */}
                    <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700">우선지역</div>
                        <div className="p-4 space-y-2">
                             <Select defaultValue="usa">
                                <SelectTrigger className="w-[200px] h-8 rounded-sm border-gray-300 bg-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="usa">미국</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500 flex items-start gap-1">
                                <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                우선지역의 경우, 주문서 작성 페이지에서 주소정보 입력항목에서의 우선적으로 노출되는 국가를 설정합니다.
                            </p>
                        </div>
                    </div>

                     {/* Design Skin */}
                     <div className="grid grid-cols-[180px_1fr] border-b border-gray-200">
                        <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-start gap-1 pt-6">
                            <span className="text-red-500 text-[10px] align-top mr-0.5 mt-0.5">●</span>
                            디자인 스킨
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="border border-gray-300">
                                <div className="grid grid-cols-[150px_1fr] bg-gray-400 text-white text-center text-xs h-8 items-center font-bold">
                                    <div className="border-r border-gray-300 h-full flex items-center justify-center">구분</div>
                                    <div className="h-full flex items-center justify-center">디자인 스킨 선택</div>
                                </div>
                                <div className="grid grid-cols-[150px_1fr] border-b border-gray-200 items-center">
                                    <div className="p-2 text-center text-xs font-medium border-r border-gray-200">PC 쇼핑몰</div>
                                    <div className="p-2">
                                        <Select defaultValue="1234">
                                            <SelectTrigger className="w-full h-8 rounded-sm border-gray-300 bg-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1234">1234 (1234 - Korean (한국어))</SelectItem>
                                                 <SelectItem value="english-default">영문몰 Default 스킨</SelectItem>
                                                <SelectItem value="moment-kr">(moment - Korean (한국어))</SelectItem>
                                                <SelectItem value="moment-cn">(moment_cn - Chinese (简体中文))</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[150px_1fr] items-center">
                                    <div className="p-2 text-center text-xs font-medium border-r border-gray-200">모바일 쇼핑몰</div>
                                    <div className="p-2">
                                         <Select defaultValue="english-default">
                                            <SelectTrigger className="w-full h-8 rounded-sm border-gray-300 bg-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="english-default">영문몰 Default 스킨</SelectItem>
                                                <SelectItem value="moment-kr">(moment - Korean (한국어))</SelectItem>
                                                <SelectItem value="moment-cn">(moment_cn - Chinese (简体中文))</SelectItem>
                                                <SelectItem value="moment-jp">(moment_jp - Japanese (にほんご))</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs space-y-1">
                                <p className="text-red-500 font-medium flex items-start gap-1">
                                    <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                                    해외몰 사용시에는 “해외몰 지원 스킨 (Story_g(스토리지), Moment(모먼트))”을 적용하셔야만 정상적인 이용이 가능합니다.
                                </p>
                                <p className="text-gray-400 pl-5">
                                    그 외 스킨을 해외몰 디자인으로 사용하기 위해서는 <span className="font-bold text-gray-600">해외몰 기능 지원 함수나 치환코드 등을 추가 적용</span> 하셔야만 합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="border border-gray-200 p-6 space-y-6 pt-8 border-l-0 border-r-0 border-b-0 mt-12 bg-white">
                <div className="flex items-center gap-1 text-blue-500 font-bold mb-2">
                    <BookOpen size={16} />
                    <span>안내</span>
                </div>
                <div className="text-xs text-gray-500 space-y-6 leading-relaxed">
                    <div className="space-y-2">
                        <p className="font-bold text-gray-700 text-sm">· 해외상점 기능은 무엇인가요?</p>
                        <p>해외 상점 설정은 기존 국내 소비자뿐만 아니라, 해외 소비자들도 손쉽게 구매할 수 있도록 <span className="font-bold">'언어팩'</span>과 <span className="font-bold">'해외 PG'</span> 및 이를 지원하는 <span className="font-bold">'해외몰 전용스킨'</span>을 제공하는 기능입니다.</p>
                        <p>제공되는 해외몰은 총 3개몰이며, 각각 <span className="text-red-500 font-bold">영문몰 / 중문몰 / 일문몰</span> 로 명칭되어 지원합니다. (기존 운영몰은 기준몰이라고 명칭합니다)</p>
                        <p>따라서, "해외상점" 메뉴에서 간단하게 사용여부, 환율, 해외배송비 및 해외 PG설정을 진행하시면 되며,</p>
                        <p>그 외의 설정은 기존에 설정하신 정보를 토대로 운영이 가능합니다.</p>
                        <p>별도로 해외몰을 위해 전부 설정을 하는 방식이 아닌, 기준몰에서 해외고객을 위해 일부 설정이 추가된 형태라고 보시면 됩니다.</p>
                        <p className="font-bold text-blue-600">다만, 해외상점을 운영하기 위해서는 사용으로 선택하시는 몰(영문몰 / 중문몰 / 일문몰)에 대한 <span className="underline">각각의 디자인 스킨 작업을 해주셔야 합니다.</span></p>
                    </div>

                    <div className="space-y-2">
                        <p className="font-bold text-gray-700 text-sm">· 해외상점 기능에서 지원되는 기능은 무엇인가요?</p>
                        <p>크게 3가지 기능을 추가적으로 지원한다고 보시면 됩니다.</p>
                        <p><span className="text-blue-500 font-bold">* 해외 언어 지원 :</span> 영어 / 일어 / 중국어(간체) 3개 언어가 지원되며 향후 확대해나갈 예정입니다.</p>
                        <p><span className="text-blue-500 font-bold">* 해외 화페 지원 :</span> 달러 / 위안 / 엔화 에 대한 화폐단위를 지원하며 이에 대한 환율설정 기능을 제공합니다. (추가화폐로 유로 지원)</p>
                        <p><span className="text-blue-500 font-bold">* 해외 PG 지원 :</span> <span className="font-bold">Paypal, 해외신용카드결제(VISA / Master / JCB), 중화권 Alipay / Unionpay</span> PG 사를 지원합니다.</p>
                        <p className="pl-20">해외PG의 경우, 개별계약의 번거로움 없이 '해외결제' 부가서비스를 통해 편리하게 가입하실 수 있습니다.</p>
                    </div>

                    <div className="space-y-2">
                        <p className="font-bold text-gray-700 text-sm">· 해외상점 기능을 이용하기 위해서는 디자인을 새로 해야 하나요?</p>
                        <p>해외상점 기능을 이용한 해외몰 운영시에는 국내몰과 달리 화폐단위 노출 및 언어팩 지원, 해외 배송비 지원 등의 기능이 달라져 기존과 다른 스킨을 사용하셔야 합니다.</p>
                        <p>국내몰은 기존 디자인 그대로 이용하시는데 큰 문제가 없으나 <span className="font-bold text-red-500">해외몰은 해외몰 전용 스킨을 설치하여 디자인 작업을 하셔야 합니다.</span></p>
                        <p>해외상점 기능을 원활하게 사용하실 수 있는 기본스킨이 같이 출시되었으며, 각 해외몰 전용스킨이 무료로 제공됩니다.</p>
                        <p className="text-red-500">(기존 제공되었던 무료스킨이나 별도 구매하셨던 스킨을 해외몰 스킨으로도 적용하여 사용하시려면,</p>
                        <p className="text-red-500 pl-2">해외몰 지원스킨을 참고하여 각 페이지별로 해외몰 기능을 지원하는 함수나 치환코드 등을 참고하여 적용하셔야만 합니다.)</p>
                        <p className="text-blue-500 font-bold">* 해외몰 지원 스킨 : 스토리지, 모먼트, 프레쉬, 퓨어, 더 리빙, 해피키즈, 투에이엠, 마임</p>
                    </div>
                </div>
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
