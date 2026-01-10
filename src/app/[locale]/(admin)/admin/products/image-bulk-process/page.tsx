"use client";

import { Button } from "@/components/ui/button";
import { Youtube, ChevronUp, ChevronDown, Book } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function ProductImageBulkProcessPage() {
    return (
        <div className="p-6 space-y-6 bg-white min-h-screen font-sans text-sm pb-24">
            {/* Header */}
            <div className="flex items-end gap-2 pb-4 border-b border-gray-300">
                <h1 className="text-2xl font-bold text-gray-900">상품 이미지 일괄 처리</h1>
                <p className="text-gray-500 mb-1">엑셀로 업로드한 상품에 대해서 이미지를 일괄 등록할 수 있습니다.</p>
            </div>

            {/* Bulk Process Section */}
            <div className="border border-gray-300 bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="font-bold text-gray-800 text-lg">일괄처리</h2>
                    <span className="bg-gray-600 text-white w-4 h-4 text-[10px] flex items-center justify-center rounded-sm">!</span>
                    <span className="text-gray-500 text-xs">"/data/goods/tmp/" 폴더에 업로드한 이미지는 파일정보를 불러와야 내역 확인 및 이미지 일괄 처리가가능합니다.</span>
                    <span className="text-gray-400 border border-gray-300 rounded-sm px-1 text-xs cursor-help">?</span>
                </div>

                <div className="flex items-center">
                    <div className="w-40 bg-gray-50 p-3 pl-4 font-bold text-gray-700 text-xs border border-r-0 border-gray-200 h-12 flex items-center justify-center">
                        진행 정보
                    </div>
                    <div className="flex-1 p-3 flex items-center justify-between border border-gray-200 h-12">
                        <span className="text-gray-600 font-bold ml-2">
                            처리할 이미지 개수 : <span className="text-red-500">0</span>개 (처리가능 : <span className="text-blue-500">0</span>개 / 처리불가 : <span className="text-red-500">0</span>개)
                        </span>
                        <Button className="h-8 bg-[#A4A4A4] hover:bg-[#909090] text-white text-xs font-bold rounded-sm px-4">
                            파일정보 불러오기
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="pt-8 border-t border-gray-300 space-y-8 mt-12">
                <div className="flex items-center gap-2">
                    <span className="text-blue-500"><Book size={16} /></span>
                    <h3 className="font-bold text-blue-500">안내</h3>
                </div>

                <div className="space-y-6 text-xs text-gray-500 leading-relaxed pl-2">
                     <div className="space-y-2">
                         <h4 className="text-sm font-bold text-gray-700 mb-2">[상품 정보] 상품 이미지 일괄 처리란 무엇인가요?</h4>
                         <p>· 엑셀로 상품을 등록한 후, 상품 이미지를 등록할 때 사용합니다.</p>
                         <p>· 등록할 이미지 파일은 "디자인 {'>'} Web FTP {'>'} Web FTP" 메뉴의 "/data/goods/tmp/" 폴더에 업로드 하셔야 합니다.</p>
                         <p>· 이미지 파일명은 상품 엑셀 업로드 시 엑셀파일에 등록한 "이미지명"과 동일해야 합니다.</p>
                         <p>· 로컬 저장소 및 추가 저장소에 일괄 처리가 가능합니다. ("URL 직접입력"은 처리가 될수 없습니다.)</p>
                         <p className="text-red-500 font-bold pt-1">· 상품엑셀 업로드 시 등록한"이미지 저장소 / 이미지 경로 / 이미지명"정보와 실제 이미지 파일을 업로드한 경로가 상이한 경우</p>
                         <p className="text-red-500 font-bold">상품 이미지 일괄 처리가 정상적으로 이루어지지 않습니다.</p>
                    </div>

                    <div className="space-y-2">
                         <h4 className="text-sm font-bold text-gray-700 mb-2">[상품 정보] 상품 이미지 일괄 처리는 어떻게 하나요?</h4>
                         <p>· 로컬저장소의 WebFTP의 "/data/goods/"폴더에 "tmp" 폴더를 생성합니다.</p>
                         <p>· 등록할 이미지 파일을 "/data/goods/tmp/" 폴더에 업로드 합니다.</p>
                         <p>· [파일정보 불러오기] 버튼을 누릅니다.</p>
                         <p className="pt-2">· 하단의 "일괄처리 예정 리스트"에 이미지가 정상적으로 처리되었는지 확인합니다.</p>
                         <p className="pt-2">· [선택 일괄처리] 또는 [전체 일괄처리] 버튼을 클릭하여 이미지 일괄 처리를 진행합니다.</p>
                         <p className="pt-2">· 상품 이미지 일괄 처리에 성공한 이미지는 "/data/goods/tmp/" 폴더에서 자동으로 삭제됩니다.</p>
                    </div>

                    <div className="space-y-2">
                         <h4 className="text-sm font-bold text-gray-700 mb-2">[상품 정보] 상품 이미지를 파일 저장소의 추가 저장소에 저장할 수 있나요?</h4>
                         <p>· FTP 시작 경로 뒤에 "goods" 폴더가 생성이 되어 있어야 하며, 권한은 반드시 707 또는 777로 설정되어야 합니다.</p>
                         <p className="pt-2">· 외부에 저장이 되는 경우, 해당 저장소에 문제 발생 시 진행이 멈추게 됩니다. 이 경우 폴더 유무 및 폴더의 권한을 확인하시기 바랍니다.</p>
                         <p className="pt-2">· 상품 이미지 폴더는 "FTP 시작 경로/goods" 입니다. 반드시 "goods" 폴더가 있어야 합니다.</p>
                         <p className="pt-2">· 외부로 저장되는 경우는 속도가 매우 느려질 수 있는 점 유의하시기 바랍니다.</p>
                    </div>

                    <div className="space-y-2">
                         <h4 className="text-sm font-bold text-gray-700 mb-2">[상품 정보] 상품 이미지 일괄 처리 시 주의사항은 무엇인가요?</h4>
                         <p>· "/data/goods/tmp/" 폴더에 파일을 업로드를 하므로 해당 관리자 화면의 용량에 영향을 미칩니다.</p>
                         <p className="pt-2">· 용량이 부족한 경우 이미지 일괄처리가 되지 않습니다.</p>
                         <p className="pt-2">· 남은 용량이 많지 않은 경우 여러 번에 걸쳐 진행하시는 것을 권장합니다.</p>
                         <p className="pt-2">· 현재 등록된 상품 전부를 검색하여 처리되므로 상품이 많은 경우 처리 속도가 느려질 수 있습니다.</p>
                         <p className="pt-4 font-bold text-gray-800">· 상품 이미지 일괄 처리 시 원본 이미지의 "자동 리사이즈" 기능은 적용되지 않습니다.</p>
                         <p className="pt-2 font-bold text-gray-800">· 원하는 사이즈에 맞춰 이미지를 등록하기 위해서는 "기본설정 {'>'} 상품 정책 {'>'} 상품 이미지 사이즈 설정"에 맞는 각각의 이미지 파일을 Web FTP에 업로드하고</p>
                         <p className="font-bold text-gray-800 ml-1">엑셀 업로드 시 "이미지명"에 각 항목에 맞는 파일명을 입력해야 합니다.</p>
                    </div>
                </div>
            </div>

            {/* Floating Actions */}
            <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
                <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                    <span className="text-[10px] font-bold"><Youtube size={16}/></span>
                </Button>
                 <Button className="rounded-full w-10 h-10 bg-[#7B4DFF] hover:bg-[#7B4DFF]/90 shadow-lg text-white p-0 flex items-center justify-center border-0 text-[10px] leading-tight flex-col">
                    <span className="block">따라</span>
                    <span className="block">하기</span>
                </Button>
                <div className="flex flex-col gap-0 rounded-full bg-white shadow-lg overflow-hidden border border-gray-200">
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100">
                         <ChevronUp size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none transform rotate-180">
                         <ChevronUp size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
