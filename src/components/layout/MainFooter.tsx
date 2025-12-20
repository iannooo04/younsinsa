"use client";

import Link from "next/link";

export default function MainFooter() {
  return (
    <footer className="bg-[#f9f9f9] text-gray-600 text-xs border-t border-gray-200 mt-12">
      {/* 1. Top Service Tabs (이미지 1 참고) */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-3">
            {[
              "MUSINSA",
              "BEAUTY",
              "PLAYER",
              "OUTLET",
              "BOUTIQUE",
              "SHOES",
              "kids",
              "USED",
            ].map((item, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 font-bold cursor-pointer ${
                  idx === 0
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Notice & Benefits (이미지 1 참고) */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 공지사항 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-sm text-black">공지사항</h4>
              <Link
                href="#"
                className="text-gray-400 hover:text-black hover:underline"
              >
                전체보기
              </Link>
            </div>
            <ul className="space-y-3">
              <li className="flex justify-between items-center cursor-pointer hover:underline">
                <span className="truncate pr-4">
                  무신사 USED 판매 불가 상품 처리 방식 변경 안내
                </span>
                <span className="text-gray-400 shrink-0">2025.12.12</span>
              </li>
              <li className="flex justify-between items-center cursor-pointer hover:underline">
                <span className="truncate pr-4">
                  [무신사스토어/29CM] 무신사 통합 서비스 이용약관 개정 안내
                </span>
                <span className="text-gray-400 shrink-0">2025.12.12</span>
              </li>
              <li className="flex justify-between items-center cursor-pointer hover:underline">
                <span className="truncate pr-4">
                  개인정보처리방침 개정 내용 사전 안내(12/15 시행)
                </span>
                <span className="text-gray-400 shrink-0">2025.12.10</span>
              </li>
            </ul>
          </div>

          {/* 결제 혜택 */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-sm text-black">결제 혜택</h4>
              <Link
                href="#"
                className="text-gray-400 hover:text-black hover:underline"
              >
                전체보기
              </Link>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 cursor-pointer hover:underline">
                <span className="w-10 h-5 bg-yellow-400 rounded-sm flex items-center justify-center text-[10px] font-bold text-black shrink-0">
                  PAY
                </span>
                <span className="truncate">
                  카카오페이 x 신한카드 13만원 이상 결제 시 5천원 할인
                </span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer hover:underline">
                <span className="w-10 h-5 bg-blue-500 rounded-sm flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                  CARD
                </span>
                <span className="truncate">
                  무신사페이 x 삼성카드 15만원 이상 결제 시 5천원 할인
                </span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer hover:underline">
                <span className="w-10 h-5 bg-yellow-400 rounded-sm flex items-center justify-center text-[10px] font-bold text-black shrink-0">
                  PAY
                </span>
                <span className="truncate">
                  카카오페이 x 페이머니 10만원 이상 결제 시 4천원 할인
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Payment Icons & Footer Links (이미지 2 참고) */}
      <div className="bg-[#f9f9f9] border-t border-gray-200 pt-10 pb-20">
        <div className="container mx-auto px-4">
          {/* Payment Icons */}
          <div className="flex flex-wrap gap-3 mb-10 opacity-70 grayscale">
            {[
              "VISA",
              "Master",
              "JCB",
              "AMEX",
              "PAYCO",
              "Toss",
              "NAVER",
              "Kakao",
            ].map((pay, i) => (
              <div
                key={i}
                className="bg-white border px-2 py-1 rounded text-[10px] font-bold text-gray-500"
              >
                {pay}
              </div>
            ))}
          </div>

          {/* Site Map Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Column 1 */}
            <div>
              <h5 className="font-bold text-black mb-4">어바웃 무신사</h5>
              <ul className="space-y-2 text-gray-500">
                {[
                  "회사 소개",
                  "비즈니스 소개",
                  "지속 가능성",
                  "뉴스룸",
                  "채용 정보",
                ].map((item) => (
                  <li key={item} className="hover:text-black cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Column 2 */}
            <div>
              <h5 className="font-bold text-black mb-4">오프라인 스토어</h5>
              <ul className="space-y-2 text-gray-500">
                {[
                  "무신사 스토어",
                  "무신사 스탠다드",
                  "29CM",
                  "무신사 엠프티",
                  "무신사 스퀘어",
                  "무신사 뷰티",
                  "무신사 테라스",
                  "아즈니섬",
                ].map((item) => (
                  <li key={item} className="hover:text-black cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Column 3 */}
            <div>
              <h5 className="font-bold text-black mb-4">비즈니스</h5>
              <ul className="space-y-2 text-gray-500">
                {[
                  "29CM",
                  "솔드아웃",
                  "엠프티",
                  "무신사 파트너스",
                  "무신사 스튜디오",
                  "무신사 트레이딩",
                  "무신사 로지스틱스",
                ].map((item) => (
                  <li key={item} className="hover:text-black cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Column 4 (Contact) */}
            <div>
              <div className="mb-6">
                <h5 className="font-bold text-black mb-4">파트너 지원</h5>
                <ul className="space-y-2 text-gray-500">
                  <li className="hover:text-black cursor-pointer">입점 문의</li>
                  <li className="hover:text-black cursor-pointer">
                    광고/제휴 문의
                  </li>
                  <li className="hover:text-black cursor-pointer">협찬 문의</li>
                  <li className="hover:text-black cursor-pointer">
                    공동/대량 구매 문의
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-black mb-4">고객 지원</h5>
                <ul className="space-y-2 text-gray-500">
                  <li className="hover:text-black cursor-pointer font-bold">
                    1:1 문의하기
                  </li>
                  <li className="hover:text-black cursor-pointer">
                    FAQ 자주 묻는 질문
                  </li>
                  <li className="hover:text-black cursor-pointer">
                    안전 거래 센터
                  </li>
                </ul>
                <div className="mt-4 text-gray-500 leading-relaxed">
                  <p className="font-bold text-black">고객센터 1544-7199</p>
                  <p>
                    운영시간 : 평일 09:00 - 18:00 (점심시간 12:00 - 13:00 제외)
                  </p>
                  <p>cs@musinsa.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal Info */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="text-[10px] text-gray-400 leading-relaxed">
                <p className="mb-2 font-bold text-gray-500">
                  © MUSINSA ALL RIGHTS RESERVED
                </p>
                <p>
                  (주) 무신사 | 대표자 : 조만호, 박준모 | 주소 : 서울특별시
                  성동구 아차산로 13길 11, 1층 (성수동2가, 무신사캠퍼스 엔1)
                  <br />
                  사업자등록번호 : 211-88-79575 | 통신판매업 :
                  2022-서울성동-01952 | 호스팅사업자 : (주)무신사
                </p>
                <p className="mt-2">
                  당사는 고객님이 현금 결제한 금액에 대해 우리은행과
                  채무지급보증 계약을 체결하여 안전거래를 보장하고 있습니다.
                  <span className="underline cursor-pointer ml-1">
                    서비스 가입사실 확인
                  </span>
                </p>
                <p className="mt-2 text-gray-300">
                  일부 상품의 경우 주식회사 무신사는 통신판매의 당사자가 아닌
                  통신판매중개자로서 상품, 상품정보, 거래에 대한 책임이 제한될
                  수 있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시기
                  바랍니다.
                </p>

                <div className="flex flex-wrap gap-4 mt-4 font-bold text-gray-500">
                  <span className="cursor-pointer hover:text-black">
                    개인정보처리방침
                  </span>
                  <span className="cursor-pointer hover:text-black">
                    이용약관
                  </span>
                  <span className="cursor-pointer hover:text-black">
                    결제대행 위탁사
                  </span>
                  <span className="cursor-pointer hover:text-black">
                    분쟁해결기준
                  </span>
                  <span className="cursor-pointer hover:text-black">
                    영상정보처리기기 운영·관리방침
                  </span>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                {/* Instagram */}
                <Link
                  href="#"
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.281.11-.705.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.234-.047c-.78-.036-1.203-.166-1.484-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                  </svg>
                </Link>
                {/* Youtube */}
                <Link
                  href="#"
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
