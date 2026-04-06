import Image from 'next/image';

export default function ClaimsPage() {
  const dummyItems = [
    {
      id: 1,
      date: "23.03.02(목)",
      status: "교환 요청",
      brand: "트래블",
      name: "하이커 투 턱 스웨트-팬츠 그린",
      option: "[NO기모]EXTRA LARGE / 1개",
      price: "35,112원",
      image: "https://image.msscdn.net/images/goods_img/20230811/3455122/3455122_16917637841323_500.jpg"
    },
    {
      id: 2,
      date: "23.03.02(목)",
      status: "교환 요청",
      brand: "트래블",
      name: "하이커 투 턱 스웨트-팬츠 그린",
      option: "[NO기모]EXTRA LARGE / 1개",
      price: "35,112원",
      image: "https://image.msscdn.net/images/goods_img/20230811/3455122/3455122_16917637841323_500.jpg"
    }
  ];

  return (
    <div className="w-full bg-white min-h-[calc(100vh-60px)] pb-20 max-w-[800px] mx-auto border-x border-gray-50 flex flex-col">
      {/* Top Header Block */}
      <div className="bg-[#f8f8f8] px-5 pt-8 pb-0">
        <h1 className="text-[15px] font-bold text-black mb-5">취소/반품/교환 내역</h1>
        
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
        <div className="flex gap-4 border-b border-gray-200">
          <button className="text-[13px] font-bold text-black pb-2.5 border-b-2 border-black relative top-[1px]">전체</button>
          <button className="text-[13px] font-medium text-gray-500 pb-2.5 hover:text-black transition-colors">취소/반품</button>
          <button className="text-[13px] font-medium text-gray-500 pb-2.5 hover:text-black transition-colors">교환</button>
        </div>
      </div>

      {/* Item List */}
      <div className="px-5">
        {dummyItems.map((item) => (
          <div key={item.id} className="py-6 border-b border-gray-100">
            {/* Header: Date and Order Detail Link */}
            <div className="flex justify-between items-center mb-5">
              <span className="text-[16px] font-bold text-black">{item.date}</span>
              <button className="text-[12px] font-medium text-gray-400 underline underline-offset-2 hover:text-gray-600 transition-colors">주문 상세</button>
            </div>
            
            {/* Context status */}
            <div className="text-[12px] font-bold text-gray-600 mb-3">{item.status}</div>

            {/* Product Card */}
            <div className="flex gap-4">
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
              <div className="flex flex-col py-0.5">
                <span className="text-[12px] font-bold text-black mb-0.5">{item.brand}</span>
                <span className="text-[12px] font-bold text-gray-800 mb-1">{item.name}</span>
                <span className="text-[11px] text-gray-400 mb-1.5 leading-tight">{item.option}</span>
                <span className="text-[13px] font-bold text-black">{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
