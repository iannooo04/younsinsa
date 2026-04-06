import Image from 'next/image';

type OrderItem = {
  id: string;
  status: string;
  brand: string;
  name: string;
  option: string;
  price: string;
  image: string;
  store?: string;
  hasSnapView?: boolean;
};

type OrderGroup = {
  id: string;
  date: string;
  receiptOrDetail: string;
  items: OrderItem[];
};

export default function MyOrdersPage() {
  const dummyGroups: OrderGroup[] = [
    {
      id: "g1",
      date: "25.04.06(일)",
      receiptOrDetail: "영수증 번호 5202504060387",
      items: [
        {
          id: "1",
          status: "오프라인 구매 완료",
          brand: "무신사 스탠다드",
          name: "종이백",
          option: "FREE / 1개",
          price: "98원",
          store: "무신사 스탠다드 강남점",
          image: "https://image.msscdn.net/images/goods_img/20230811/3455122/3455122_16917637841323_500.jpg" // placeholder
        },
        {
          id: "2",
          status: "오프라인 구매 완료",
          brand: "무신사 스탠다드",
          name: "데님 워크 재킷",
          option: "L / 1개",
          price: "78,302원",
          store: "무신사 스탠다드 강남점",
          hasSnapView: true,
          image: "https://image.msscdn.net/images/goods_img/20230811/3455121/3455121_16917637841312_500.jpg" // placeholder
        }
      ]
    },
    {
      id: "g2",
      date: "24.06.24(월)",
      receiptOrDetail: "주문 상세",
      items: [
        {
          id: "3",
          status: "구매 확정",
          brand: "미즈노",
          name: "쿠션 양말 5족 세트",
          option: "24~26(M) / 1개",
          price: "18,900원",
          image: "https://image.msscdn.net/images/goods_img/20230811/3455120/3455120_16917637841201_500.jpg" // placeholder
        }
      ]
    }
  ];

  return (
    <div className="w-full bg-white min-h-[calc(100vh-60px)] pb-20 max-w-[800px] mx-auto border-x border-gray-50 flex flex-col">
      {/* Top Header Block */}
      <div className="bg-[#f8f8f8] px-5 pt-8 pb-0">
        <h1 className="text-[15px] font-bold text-black mb-5">주문 내역</h1>
        
        {/* Search Bar */}
        <div className="relative mb-5">
          <input 
            type="text" 
            placeholder="상품명 / 브랜드명으로 검색하세요." 
            className="w-full h-[40px] pl-4 pr-10 bg-white border border-gray-100 rounded-[4px] text-[12px] outline-none shadow-sm placeholder-gray-400 focus:border-gray-300"
          />
          <button className="absolute right-3 top-0 h-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-4 border-b border-gray-200 overflow-x-auto scrollbar-hide whitespace-nowrap scroll-smooth">
          <button className="text-[13px] font-bold text-black pb-2.5 border-b-2 border-black relative top-[1px]">전체</button>
          <button className="text-[13px] font-medium text-gray-500 pb-2.5 hover:text-black transition-colors">온라인 주문</button>
          <button className="text-[13px] font-medium text-gray-500 pb-2.5 hover:text-black transition-colors">오프라인 구매</button>
          <button className="text-[13px] font-medium text-gray-500 pb-2.5 hover:text-black transition-colors">유즈드</button>
          <button className="text-[13px] font-medium text-gray-500 pb-2.5 hover:text-black transition-colors">상품권</button>
          <button className="text-[13px] font-medium text-gray-500 pb-2.5 hover:text-black transition-colors">티켓</button>
        </div>
      </div>

      {/* Group List */}
      <div className="px-5">
        {dummyGroups.map((group) => (
          <div key={group.id} className="py-8 border-b border-gray-100">
            {/* Header: Date and Right Link/Text */}
            <div className="flex justify-between items-center mb-5">
              <span className="text-[16px] font-bold text-black">{group.date}</span>
              {group.receiptOrDetail === "주문 상세" ? (
                <button className="text-[12px] font-medium text-gray-400 underline underline-offset-2 hover:text-gray-600 transition-colors">주문 상세</button>
              ) : (
                <span className="text-[12px] font-medium text-gray-400">{group.receiptOrDetail}</span>
              )}
            </div>
            
            {/* Items inside group */}
            <div className="space-y-6">
              {group.items.map((item) => (
                <div key={item.id} className="flex flex-col">
                  {/* Context status */}
                  <div className="text-[12px] font-bold text-gray-600 mb-3">{item.status}</div>

                  {/* Product Card */}
                  <div className="flex gap-4 mb-4">
                    {/* Product Image */}
                    <div className="w-[84px] h-[100px] bg-gray-100 relative rounded-sm overflow-hidden shrink-0 border border-gray-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col py-0.5 flex-1 relative">
                      <span className="text-[12px] font-bold text-black mb-0.5">{item.brand}</span>
                      <span className="text-[12px] font-bold text-gray-800 mb-1">{item.name}</span>
                      <span className="text-[11px] text-gray-400 mb-1.5 leading-tight">{item.option}</span>
                      <span className="text-[13px] font-bold text-black">{item.price}</span>
                      
                      {item.hasSnapView && (
                        <button className="absolute right-0 bottom-0 text-[11px] font-bold text-black border border-gray-200 px-2 py-1 rounded-sm">
                          스냅 보기
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Store Link if exists */}
                  {item.store && (
                    <button className="w-full bg-[#f8f8f8] hover:bg-[#f2f2f2] transition-colors rounded-sm flex items-center justify-between px-4 py-3">
                      <span className="text-[12px] font-bold text-black">{item.store}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
