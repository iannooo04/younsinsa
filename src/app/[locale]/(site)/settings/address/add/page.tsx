"use client";

import React, { useState } from "react";
import DaumPostcode, { Address } from "react-daum-postcode";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

export default function AddressAddPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";
    
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setPostcode(data.zonecode);
    setAddress(fullAddress);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#f8f9fa] flex justify-center min-h-screen w-full">
      <div className="w-full max-w-[960px] bg-white relative shadow-sm flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#f8f9fa] border-b border-gray-100">
          <div className="flex items-center px-5 h-[60px]">
            <h1 className="text-[18px] font-bold text-black">배송지 추가</h1>
          </div>
        </header>

        {/* Form Content */}
        <main className="flex-1 px-5 py-8 bg-white flex flex-col">
          <div className="flex flex-col gap-7 flex-1">
            
            {/* Name */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-bold text-black">이름</label>
              <input 
                type="text" 
                placeholder="받는 분의 이름을 입력해주세요" 
                className="border border-gray-200 rounded-[4px] px-3.5 py-3.5 text-[14px] w-full focus:outline-none focus:border-black placeholder:text-gray-300 text-black hidden-arrow"
              />
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-bold text-black">휴대폰번호</label>
              <input 
                type="text" 
                placeholder="휴대폰번호를 입력해주세요." 
                className="border border-gray-200 rounded-[4px] px-3.5 py-3.5 text-[14px] w-full focus:outline-none focus:border-black placeholder:text-gray-300 text-black"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-bold text-black">주소</label>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="우편번호" 
                    value={postcode}
                    readOnly
                    className="border border-gray-200 rounded-[4px] px-3.5 py-3.5 text-[14px] flex-1 focus:outline-none focus:border-black placeholder:text-gray-300 text-black bg-white"
                  />
                  
                  {/* Address Selection Modal */}
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <button type="button" className="border border-gray-200 rounded-[4px] px-5 py-3.5 text-[14px] text-black font-medium hover:bg-gray-50 bg-white flex-shrink-0 transition-colors">
                        주소 찾기
                      </button>
                    </DialogTrigger>
                    
                    <DialogContent className="w-full max-w-[500px] h-full sm:h-auto sm:max-h-[80vh] p-0 gap-0 sm:rounded-[8px] bg-white border-0 shadow-xl [&>button]:hidden flex flex-col overflow-hidden">
                      <DialogHeader className="px-5 h-[56px] border-b border-gray-100 flex-shrink-0 flex flex-row items-center justify-center relative sticky top-0 bg-white z-10 w-full space-y-0">
                        <DialogTitle className="text-[18px] font-bold text-black text-center">우편번호 찾기</DialogTitle>
                        <DialogClose className="absolute right-4 top-1/2 -translate-y-1/2 p-1 focus:outline-none opacity-70 hover:opacity-100 transition-opacity">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </DialogClose>
                      </DialogHeader>
                      <div className="flex-1 w-full bg-white relative overflow-y-auto">
                        <DaumPostcode 
                          onComplete={handleComplete} 
                          className="w-full h-full"
                          style={{ height: '500px' }}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>

                </div>
                <input 
                  type="text" 
                  placeholder="주소" 
                  value={address}
                  readOnly
                  className="border border-gray-200 rounded-[4px] px-3.5 py-3.5 text-[14px] w-full focus:outline-none focus:border-black placeholder:text-gray-300 text-black bg-white"
                />
                <input 
                  type="text" 
                  placeholder="상세주소" 
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  className="border border-gray-200 rounded-[4px] px-3.5 py-3.5 text-[14px] w-full focus:outline-none focus:border-black placeholder:text-gray-300 text-black"
                />
              </div>
            </div>

            {/* Shipping Request */}
            <div className="flex flex-col gap-2.5">
              <label className="text-[14px] font-bold text-black">배송 요청사항 (선택)</label>
              <div className="relative">
                <select className="border border-gray-200 rounded-[4px] px-3.5 py-3.5 text-[14px] w-full appearance-none focus:outline-none focus:border-black text-gray-500 bg-white">
                  <option value="">배송 요청사항을 선택해주세요</option>
                  <option value="1">문 앞에 놓아주세요</option>
                  <option value="2">경비실에 맡겨주세요</option>
                  <option value="3">배송 전에 연락주세요</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ccc" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Set as Default */}
            <div className="flex items-center gap-2 mt-1">
              <input 
                type="checkbox" 
                id="isDefault" 
                className="w-4 h-4 border-gray-200 rounded-[2px] bg-white text-black accent-black focus:ring-black cursor-pointer"
              />
              <label htmlFor="isDefault" className="text-[14px] text-black font-medium cursor-pointer select-none">
                기본 배송지로 설정
              </label>
            </div>
            
          </div>

          {/* Bottom Button */}
          <div className="mt-12 mb-2">
            <button className="w-full bg-black text-white rounded-[4px] py-4 text-[15px] font-bold hover:bg-black/90 transition-colors">
              저장하기
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
