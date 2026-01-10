"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { HelpCircle, Youtube, ArrowUp, ArrowDown } from "lucide-react";

export default function ExchangeRateSettingsPage() {
    return (
        <div className="p-6 space-y-8 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">환율 설정</h1>
                <Button className="bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm h-9 px-8 text-sm font-medium">
                    저장
                </Button>
            </div>

            {/* Exchange Rate Table Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">환율 설정</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                </div>

                <div className="border border-gray-300 border-b-0">
                    <table className="w-full text-sm text-center">
                        <thead className="bg-[#A3A3A3] text-white font-bold">
                            <tr>
                                <th className="py-2 px-4 border-r border-gray-400 w-16">번호</th>
                                <th className="py-2 px-4 border-r border-gray-400 w-48">화폐</th>
                                <th className="py-2 px-4 border-r border-gray-400 w-32">환율처리방식</th>
                                <th className="py-2 px-4 border-r border-gray-400">환율설정</th>
                                <th className="py-2 px-4 border-r border-gray-400 w-32">추가환율조정</th>
                                <th className="py-2 px-4 w-32">최종적용환율(원)</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {/* KRW */}
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-4 border-r border-gray-200">1</td>
                                <td className="py-3 px-4 border-r border-gray-200">KRW - Won ( ₩ )</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 flex items-center justify-center gap-2">
                                    <span>1 KRW =</span>
                                    <Input value="1" disabled className="w-24 h-7 bg-gray-100 text-right" />
                                    <span>KRW</span>
                                </td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4"></td>
                            </tr>
                            
                            {/* USD */}
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-4 border-r border-gray-200">2</td>
                                <td className="py-3 px-4 border-r border-gray-200">USD - U.S Dollar ( $ )</td>
                                <td className="py-3 px-4 border-r border-gray-200">
                                    <Select defaultValue="auto">
                                        <SelectTrigger className="w-full h-8 border-gray-300">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="auto">자동환율</SelectItem>
                                            <SelectItem value="manual">수동환율</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>
                                <td className="py-3 px-4 border-r border-gray-200 flex items-center justify-center gap-2">
                                    <span>1 USD =</span>
                                    <Input defaultValue="1436.5" className="w-24 h-7 text-right bg-gray-100" />
                                    <span>KRW</span>
                                </td>
                                <td className="py-3 px-4 border-r border-gray-200">
                                    <Input defaultValue="0" className="w-full h-7 text-right" />
                                </td>
                                <td className="py-3 px-4">1436.5</td>
                            </tr>

                            {/* CNY */}
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-4 border-r border-gray-200">3</td>
                                <td className="py-3 px-4 border-r border-gray-200">CNY - Yuan ( ¥ )</td>
                                <td className="py-3 px-4 border-r border-gray-200">
                                    <Select defaultValue="auto">
                                        <SelectTrigger className="w-full h-8 border-gray-300">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="auto">자동환율</SelectItem>
                                            <SelectItem value="manual">수동환율</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>
                                <td className="py-3 px-4 border-r border-gray-200 flex items-center justify-center gap-2">
                                    <span>1 CNY =</span>
                                    <Input defaultValue="204.86" className="w-24 h-7 text-right bg-gray-100" />
                                    <span>KRW</span>
                                </td>
                                <td className="py-3 px-4 border-r border-gray-200">
                                    <Input defaultValue="0" className="w-full h-7 text-right" />
                                </td>
                                <td className="py-3 px-4">204.86</td>
                            </tr>

                            {/* JPY */}
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-4 border-r border-gray-200">4</td>
                                <td className="py-3 px-4 border-r border-gray-200">JPY - Yen ( ¥ )</td>
                                <td className="py-3 px-4 border-r border-gray-200">
                                    <Select defaultValue="auto">
                                        <SelectTrigger className="w-full h-8 border-gray-300">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="auto">자동환율</SelectItem>
                                            <SelectItem value="manual">수동환율</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>
                                <td className="py-3 px-4 border-r border-gray-200 flex items-center justify-center gap-2">
                                    <span>1 JPY =</span>
                                    <Input defaultValue="9.1839" className="w-24 h-7 text-right bg-gray-100" />
                                    <span>KRW</span>
                                </td>
                                <td className="py-3 px-4 border-r border-gray-200">
                                    <Input defaultValue="0" className="w-full h-7 text-right" />
                                </td>
                                <td className="py-3 px-4">9.1839</td>
                            </tr>

                            {/* EUR */}
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-4 border-r border-gray-200">5</td>
                                <td className="py-3 px-4 border-r border-gray-200">EUR - euro ( € )</td>
                                <td className="py-3 px-4 border-r border-gray-200">
                                    <Select defaultValue="auto">
                                        <SelectTrigger className="w-full h-8 border-gray-300">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="auto">자동환율</SelectItem>
                                            <SelectItem value="manual">수동환율</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>
                                <td className="py-3 px-4 border-r border-gray-200 flex items-center justify-center gap-2">
                                    <span>1 EUR =</span>
                                    <Input defaultValue="1689.56" className="w-24 h-7 text-right bg-gray-100" />
                                    <span>KRW</span>
                                </td>
                                <td className="py-3 px-4 border-r border-gray-200">
                                    <Input defaultValue="0" className="w-full h-7 text-right" />
                                </td>
                                <td className="py-3 px-4">1689.56</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="text-xs space-y-1.5 mt-4">
                    <p className="text-gray-500 font-medium flex items-start gap-1">
                        <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                        환율의 경우, 그 특성상 환차손이 발생할 수 있으므로, 이에 대한 각별한 유의가 필요합니다.
                    </p>
                     <p className="text-gray-500 pl-5">
                        환율 정보를 변경할 경우, 그 즉시 모든 상품의 기준금액을 기준으로 일괄적용 됩니다.
                    </p>
                    <p className="text-red-500 font-medium flex items-start gap-1">
                        <span className="w-4 flex justify-center bg-red-500 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                        자동환율은 행정안전부 공공데이터 포털의 관세 환율정보 API를 기준으로 매일 갱신 됩니다.
                    </p>
                     <p className="text-blue-500 pl-5">
                        네트워크 장애 등으로 인하여 부득이하게 해당 정보를 정상적으로 인지하지 못할 경우에는 그 전일 최종적으로 성공한 값을 표시합니다.
                    </p>
                     <p className="text-gray-500 pl-5 pt-2">
                        상품에 적용 되는 환율은 "최종적용환율(원)" 입니다. 따라서, 추가환율조정(+/- 숫자 입력 모두 가능)을 통해 환율적용을 유동적으로 변경할 수 있습니다.
                    </p>
                    <p className="text-gray-500 font-medium flex items-start gap-1">
                        <span className="w-4 flex justify-center bg-gray-600 text-white pb-0.5 rounded-sm text-[10px] leading-3 mt-0.5">!</span> 
                        추가환율조정 값을 입력하는 경우, 환율설정 항목에 적용된 값을 기준으로 환율이 해당 값만큼 반영되어 최종적용환율이 됩니다.
                    </p>
                    <p className="text-blue-500 pl-5">
                        (상품에 최종 적용되는 환율 = 최종적용환율(원) = 환율설정 + 추가환율조정)
                    </p>
                </div>
            </div>

            {/* History Table Section */}
            <div className="space-y-4 pt-8">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">환율 변경 이력</h2>
                    <HelpCircle size={14} className="text-gray-400 cursor-help" />
                    <span className="text-xs text-gray-400 ml-1 font-medium bg-gray-100 px-1 py-0.5 flex items-center gap-1">
                         <span className="bg-gray-500 text-white text-[10px] w-3 h-3 flex items-center justify-center rounded-xs">!</span>
                         환율 변경 이력은 최근 12개월까지의 내역을 확인 할 수 있습니다.
                    </span>
                </div>

                <div className="border border-gray-300 border-b-0">
                    <table className="w-full text-sm text-center">
                        <thead className="bg-[#A3A3A3] text-white font-bold">
                            <tr>
                                <th className="py-2 px-4 border-r border-gray-400 w-32">작업구분</th>
                                <th className="py-2 px-4 border-r border-gray-400 w-24">화폐</th>
                                <th className="py-2 px-4 border-r border-gray-400">변경이력</th>
                                <th className="py-2 px-4 border-r border-gray-400 w-48">변경일시</th>
                                <th className="py-2 px-4 border-r border-gray-400 w-32">변경자</th>
                                <th className="py-2 px-4 w-32">변경IP</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                             <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">자동 환율 데이터 갱신</td>
                                <td className="py-3 px-4 border-r border-gray-200">2026-01-10 13:11:20</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">27.1.192.91</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">자동 환율 데이터 갱신</td>
                                <td className="py-3 px-4 border-r border-gray-200">2026-01-09 14:12:40</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">27.1.192.91</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">자동 환율 데이터 갱신</td>
                                <td className="py-3 px-4 border-r border-gray-200">2026-01-07 17:10:56</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">27.1.192.91</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">자동 환율 데이터 갱신</td>
                                <td className="py-3 px-4 border-r border-gray-200">2026-01-06 23:30:38</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">27.1.192.91</td>
                            </tr>
                             <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">자동 환율 데이터 갱신</td>
                                <td className="py-3 px-4 border-r border-gray-200">2026-01-05 16:56:46</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">127.255.255.255</td>
                            </tr>
                            <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">자동 환율 데이터 갱신</td>
                                <td className="py-3 px-4 border-r border-gray-200">2025-12-26 13:00:19</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">127.255.255.255</td>
                            </tr>
                             <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">자동 환율 데이터 갱신</td>
                                <td className="py-3 px-4 border-r border-gray-200">2025-12-23 10:14:31</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">127.255.255.255</td>
                            </tr>
                             <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">자동 환율 데이터 갱신</td>
                                <td className="py-3 px-4 border-r border-gray-200">2025-12-21 14:16:25</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">127.255.255.255</td>
                            </tr>
                             <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">자동 환율 데이터 갱신</td>
                                <td className="py-3 px-4 border-r border-gray-200">2025-12-18 16:04:00</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">127.255.255.255</td>
                            </tr>
                             <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">자동 환율 데이터 갱신</td>
                                <td className="py-3 px-4 border-r border-gray-200">2025-12-10 16:03:55</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">106.251.79.102</td>
                            </tr>
                             <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">자동 환율 데이터 갱신</td>
                                <td className="py-3 px-4 border-r border-gray-200">2025-12-08 15:20:19</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">121.166.205.55</td>
                            </tr>
                             <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">자동 환율 데이터 갱신</td>
                                <td className="py-3 px-4 border-r border-gray-200">2025-12-07 13:44:16</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">127.255.255.255</td>
                            </tr>
                             <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">자동 환율 데이터 갱신</td>
                                <td className="py-3 px-4 border-r border-gray-200">2025-12-06 07:48:16</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">127.255.255.255</td>
                            </tr>
                             <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">환율설정저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">변경사항 없음</td>
                                <td className="py-3 px-4 border-r border-gray-200">2025-12-05 22:02:09</td>
                                <td className="py-3 px-4 border-r border-gray-200">sosexy76</td>
                                <td className="py-3 px-4">127.255.255.255</td>
                            </tr>
                             <tr className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 border-r border-gray-200">자동환율저장</td>
                                <td className="py-3 px-4 border-r border-gray-200">-</td>
                                <td className="py-3 px-4 border-r border-gray-200 text-left pl-8">변경사항 없음</td>
                                <td className="py-3 px-4 border-r border-gray-200">2025-12-05 22:01:45</td>
                                <td className="py-3 px-4 border-r border-gray-200"></td>
                                <td className="py-3 px-4">127.255.255.255</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-6">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" className="w-8 h-8 p-0 bg-gray-500 text-white hover:bg-gray-600 rounded-sm">1</Button>
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
