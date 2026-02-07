"use client";

import { useEffect, useState, useCallback } from "react";
import { getFaqsAction } from "@/actions/board-faq-actions";

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "전체" },
    { id: "배송", name: "배송" },
    { id: "주문/결제", name: "주문/결제" },
    { id: "취소/반품/교환", name: "취소/반품/교환" },
    { id: "회원/정보", name: "회원/정보" },
    { id: "서비스/기타", name: "서비스/기타" },
  ];

  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    const res = await getFaqsAction({
      category: category === "all" ? undefined : category,
      keyword: keyword || undefined,
      pageSize: 50,
    });
    if (res.success) {
      setFaqs(res.items || []);
    }
    setLoading(false);
  }, [category, keyword]);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFaqs();
  };

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-[800px] mx-auto px-5 py-10">
          <h1 className="text-2xl font-bold mb-8 text-center">자주 묻는 질문 (FAQ)</h1>
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative max-w-[600px] mx-auto">
            <input
              type="text"
              placeholder="궁금한 내용을 입력해 주세요."
              className="w-full h-14 pl-5 pr-20 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-black/5"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 h-10 px-6 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-colors"
            >
              검색
            </button>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
        <div className="max-w-[800px] mx-auto px-5 overflow-x-auto scrollbar-hide">
          <div className="flex gap-8 py-4 whitespace-nowrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`text-sm font-bold transition-colors pb-1 border-b-2 ${
                  category === cat.id
                    ? "text-black border-black"
                    : "text-gray-400 border-transparent hover:text-black"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-[800px] mx-auto px-5 mt-8">
        {loading ? (
          <div className="py-20 text-center text-gray-400">불러오는 중...</div>
        ) : faqs.length === 0 ? (
          <div className="py-20 text-center text-gray-400">검색 결과가 없습니다.</div>
        ) : (
          <div className="divide-y divide-gray-100 border-t border-gray-100">
            {faqs.map((faq) => (
              <div key={faq.id} className="group">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-5 flex items-start gap-4 text-left group-hover:bg-gray-50 transition-colors px-2"
                >
                  <span className="text-gray-300 font-bold mt-0.5">Q</span>
                  <div className="flex-1">
                    <span className="text-[12px] text-blue-600 mb-1 block">{faq.category}</span>
                    <p className="text-[14px] font-medium text-gray-800">{faq.question}</p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 h-4 text-gray-400 mt-1.5 transition-transform ${
                      openId === faq.id ? "rotate-180" : ""
                    }`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {openId === faq.id && (
                  <div className="px-5 pb-8 pt-2 bg-gray-50">
                    <div className="flex gap-4">
                      <span className="text-black font-bold mt-1">A</span>
                      <div
                        className="text-[13px] leading-relaxed text-gray-600 whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CSR Center Links */}
      <div className="max-w-[800px] mx-auto px-5 mt-20">
        <div className="bg-gray-50 rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="flex flex-col items-center justify-center text-center">
             <h3 className="font-bold mb-2">도움이 더 필요하신가요?</h3>
             <p className="text-xs text-gray-500 mb-4">1:1 문의를 남겨주시면 정성껏 답변해 드립니다.</p>
             <button className="px-6 py-2 border border-gray-300 rounded-sm text-sm font-bold hover:bg-white transition-colors">
               1:1 문의하기
             </button>
          </div>
          <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0">
             <h3 className="font-bold mb-1">고객센터 1544-7199</h3>
             <p className="text-xs text-gray-500">평일 09:00 - 18:00</p>
             <p className="text-[10px] text-gray-400 mt-1">(점심시간 12:00 - 13:00 제외)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
