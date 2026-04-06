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
    { id: "취소/교환/반품", name: "취소/교환/반품" },
    { id: "상품/AS 문의", name: "상품/AS 문의" },
    { id: "주문/결제", name: "주문/결제" },
    { id: "서비스", name: "서비스" },
    { id: "이용 안내", name: "이용 안내" },
    { id: "회원 정보", name: "회원 정보" },
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
    <div className="w-full bg-[#fcfcfc] min-h-[calc(100vh-60px)] pb-24 max-w-[800px] mx-auto relative">
      {/* Header & Search */}
      <div className="px-5 pt-8 pb-4">
        <h1 className="text-[18px] font-bold mb-4">FAQ</h1>
        
        {/* Search Box */}
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            type="text"
            placeholder="무엇을 도와드릴까요?"
            className="w-full h-[40px] pl-4 pr-10 bg-white border border-gray-100 rounded-[4px] text-[13px] outline-none shadow-sm placeholder-gray-400 focus:border-gray-300"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-0 h-full flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </form>
      </div>

      {/* Categories */}
      <div className="sticky top-0 bg-[#fcfcfc] z-10 px-5">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 border-b border-gray-100 whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`text-[13px] pb-2 relative transition-colors ${
                category === cat.id
                  ? "text-black font-bold"
                  : "text-gray-400 hover:text-black font-medium"
              }`}
            >
              {cat.name}
              {category === cat.id && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-black" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="bg-white mx-5 mt-2 rounded-[4px] shadow-sm mb-6 pb-2">
        {loading ? (
          <div className="py-20 text-center text-gray-400 text-[13px]">불러오는 중...</div>
        ) : faqs.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-[13px]">검색 결과가 없습니다.</div>
        ) : (
          <div className="divide-y divide-gray-100 flex flex-col">
            {faqs.map((faq) => (
              <div key={faq.id} className="group">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-5 flex items-start gap-4 text-left transition-colors px-4 relative"
                >
                  <div className="flex-1 pr-6">
                    <span className="text-[12px] text-gray-400 font-medium mb-1 block">{faq.category}</span>
                    <p className="text-[14px] font-bold text-gray-900 leading-snug">{faq.question}</p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 h-4 text-gray-400 mt-5 absolute right-4 transition-transform ${
                      openId === faq.id ? "rotate-180" : ""
                    }`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {openId === faq.id && (
                  <div className="px-4 pb-6 pt-1 bg-white">
                    <div
                      className="text-[13px] leading-relaxed text-gray-600 whitespace-pre-wrap ml-1"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="px-5 mt-4">
        <button className="w-full max-w-[800px] mx-auto block bg-black text-white text-[14px] font-bold py-4 rounded-[4px]">
          1:1 문의하기
        </button>
      </div>
    </div>
  );
}
