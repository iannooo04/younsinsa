"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function PrivacyConsentHistoryPopup({ 
  open, 
  onOpenChange 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void 
}) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = React.useState(false);

  const handleConfirmSave = () => {
    setShowConfirmPopup(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="!max-w-[1000px] w-[1000px] p-0 gap-0 border-none bg-white font-sans text-xs">
          <DialogHeader className="p-4 border-b border-gray-200">
            <DialogTitle className="text-xl font-bold text-gray-900">개인정보수집 동의상태 변경내역</DialogTitle>
          </DialogHeader>

          <div className="p-6">
            {/* Form Section */}
            <div className="border border-gray-200 mb-6 bg-white">
              {/* Change Period */}
              <div className="grid grid-cols-[160px_1fr] border-b border-gray-200">
                <div className="bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">
                  변경 기간
                </div>
                <div className="p-3 flex items-center gap-6">
                  <RadioGroup defaultValue="7d" className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <RadioGroupItem value="3d" id="p-3d" />
                      <Label htmlFor="p-3d" className="text-xs">3일</Label>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <RadioGroupItem value="7d" id="p-7d" />
                      <Label htmlFor="p-7d" className="text-xs">7일</Label>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <RadioGroupItem value="15d" id="p-15d" />
                      <Label htmlFor="p-15d" className="text-xs">15일</Label>
                    </div>
                  </RadioGroup>
                  <Button 
                    variant="outline" 
                    className="h-7 text-[10px] border-gray-300 bg-white ml-2 shrink-0"
                    onClick={() => setShowConfirmPopup(true)}
                  >
                    변경기간 설정 저장
                  </Button>
                </div>
              </div>

              {/* Filename */}
              <div className="grid grid-cols-[160px_1fr] border-b border-gray-200">
                <div className="bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">
                  파일명
                </div>
                <div className="p-3 flex items-center gap-2">
                  <Input className="w-[300px] h-8 text-xs border-gray-300 bg-white" />
                  <span className="text-gray-400 shrink-0"><span className="text-red-500">0</span> / 50</span>
                </div>
              </div>

              {/* Password Usage and Limit */}
              <div className="grid grid-cols-[160px_340px_160px_1fr] border-b border-gray-200">
                <div className="bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">
                  비밀번호 사용여부
                </div>
                <div className="p-3 flex items-center gap-6 border-r border-gray-200">
                  <RadioGroup defaultValue="use" className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <RadioGroupItem value="use" id="pwd-use" />
                      <Label htmlFor="pwd-use" className="text-xs">사용</Label>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <RadioGroupItem value="none" id="pwd-none" />
                      <Label htmlFor="pwd-none" className="text-xs">사용하지않음</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">
                  엑셀파일 당 데이터 최대개수
                </div>
                <div className="p-3 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Input defaultValue="10000" className="w-[100px] h-8 text-center border-gray-300 text-xs bg-white" />
                    <span>개</span>
                  </div>
                  <div className="flex gap-1 text-gray-500 text-[10px] leading-tight shrink-0">
                    <span className="bg-gray-500 text-white rounded-[2px] w-3 h-3 flex items-center justify-center text-[9px] mt-0.5 font-bold shrink-0">!</span>
                    <span>다운로드 시간이 오래 걸리는 경우 데이터 최대개수 숫자를 조정하세요</span>
                  </div>
                </div>
              </div>

              {/* Password Setting */}
              <div className="grid grid-cols-[160px_340px_160px_1fr]">
                <div className="bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">
                  비밀번호 설정
                </div>
                <div className="p-3 flex items-center gap-2 border-r border-gray-200 relative">
                  <Input 
                    type={passwordVisible ? "text" : "password"} 
                    placeholder="영문/숫자/특수문자 2개 포함, 10~16자" 
                    className="h-8 text-[11px] border-gray-300 pr-8 bg-white"
                  />
                  <button 
                    onClick={() => setPasswordVisible(!passwordVisible)} 
                    className="absolute right-5 text-gray-400"
                  >
                    {passwordVisible ? <EyeOff size={14}/> : <Eye size={14}/>}
                  </button>
                </div>
                <div className="bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 border-r border-gray-200 flex items-center shrink-0">
                  비밀번호 확인
                </div>
                <div className="p-3 flex items-center gap-2 relative">
                  <Input 
                    type={confirmPasswordVisible ? "text" : "password"} 
                    className="h-8 text-xs border-gray-300 pr-8 bg-white"
                  />
                  <button 
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} 
                    className="absolute right-5 text-gray-400"
                  >
                    {confirmPasswordVisible ? <EyeOff size={14}/> : <Eye size={14}/>}
                  </button>
                </div>
              </div>
          </div>

          {/* Warnings */}
          <div className="space-y-1 mb-6">
            <div className="flex gap-1.5 text-xs">
              <span className="bg-red-500 text-white rounded-[2px] w-4 h-4 flex items-center justify-center text-[10px] font-bold">!</span>
              <span>개인정보를 개인PC에 저장할 시 암호화가 의무이므로 비밀번호 '사용'을 권장합니다. <a href="#" className="text-blue-500 underline">[자세히보기]</a></span>
            </div>
            <div className="flex gap-1.5 text-xs">
              <span className="bg-gray-500 text-white rounded-[2px] w-4 h-4 flex items-center justify-center text-[10px] font-bold">!</span>
              <span>개인정보 보호를 위해 '다운로드 보안 설정'을 사용하시길 권장합니다. <a href="#" className="text-blue-500 underline">운영 보안 설정</a></span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mb-8">
            <Button className="bg-gray-600 hover:bg-gray-700 text-white w-24 h-10 font-bold">요청</Button>
          </div>

          {/* Result Table */}
          <div className="border border-gray-300 overflow-hidden">
            <table className="w-full text-center border-collapse">
              <thead className="bg-[#BDBDBD] text-white">
                <tr className="h-10 text-[11px]">
                  <th className="border-r border-[#CDCDCD] font-normal w-12">번호</th>
                  <th className="border-r border-[#CDCDCD] font-normal w-32">다운로드 양식명</th>
                  <th className="border-r border-[#CDCDCD] font-normal">파일명</th>
                  <th className="border-r border-[#CDCDCD] font-normal w-20">파일구분</th>
                  <th className="border-r border-[#CDCDCD] font-normal w-20">파일상태</th>
                  <th className="border-r border-[#CDCDCD] font-normal w-20">요청자</th>
                  <th className="border-r border-[#CDCDCD] font-normal w-24">다운로드 기간</th>
                  <th className="font-normal w-20">다운로드</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-t border-gray-200">
                  <td colSpan={8} className="py-12 text-gray-500">
                    변경기간 선택 후 요청 버튼을 눌러주세요.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Confirmation Popup */}
    <Dialog open={showConfirmPopup} onOpenChange={setShowConfirmPopup}>
        <DialogContent className="max-w-[600px] p-0 gap-0 border border-gray-300 bg-white font-sans text-xs shadow-xl">
            <DialogHeader className="p-4 border-b border-gray-200">
                <DialogTitle className="text-2xl font-bold text-gray-800">확인</DialogTitle>
            </DialogHeader>
            <div className="p-8">
                <div className="text-gray-700 text-sm leading-relaxed mb-10">
                    <p>설정한 기간이 변경 기간 기본값으로 적용 됩니다. 저장하시겠습니까?</p>
                    <p>변경기간 설정 저장 시, 개인정보수집 동의상태 변경내역창은 종료 됩니다.</p>
                </div>
                <div className="flex justify-center gap-2">
                    <Button 
                        variant="outline" 
                        className="w-24 h-10 border-gray-300 text-gray-700 font-normal hover:bg-gray-50"
                        onClick={() => setShowConfirmPopup(false)}
                    >
                        취소
                    </Button>
                    <Button 
                        className="w-24 h-10 bg-[#666666] hover:bg-[#555555] text-white font-normal"
                        onClick={handleConfirmSave}
                    >
                        확인
                    </Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>
    </>
  );
}
