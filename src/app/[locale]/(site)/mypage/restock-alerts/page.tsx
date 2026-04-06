import Image from 'next/image';

export default function RestockAlertsPage() {
  const dummyItems = [
    {
      id: 1,
      brand: "트래블",
      name: "하이커 투 턱 스웨트-팬츠 그레이",
      option: "[NO기모]EXTRA LARGE",
      status: "알림 해제됨",
      date: "2023.10.10",
      image: "https://image.msscdn.net/images/goods_img/20230811/3455122/3455122_16917637841323_500.jpg"
    },
    {
      id: 2,
      brand: "트래블",
      name: "하이커 투 턱 스웨트-팬츠 블랙",
      option: "[NO기모]EXTRA LARGE",
      status: "알림 해제됨",
      date: "2023.10.10",
      image: "https://image.msscdn.net/images/goods_img/20230811/3455121/3455121_16917637841312_500.jpg"
    }
  ];

  return (
    <div className="w-full bg-white min-h-[calc(100vh-60px)] pb-20 max-w-[800px] mx-auto border-l border-r border-gray-50">
      {/* Title Header */}
      <div className="bg-[#f5f5f5] px-6 py-5">
        <h1 className="text-[16px] font-bold text-black">재입고 알림내역</h1>
      </div>

      {/* Info List */}
      <div className="px-6 py-6 pb-2">
        <ul className="text-[12px] text-gray-500 space-y-1.5 list-none">
          <li className="relative pl-2 before:content-['•'] before:absolute before:left-[-4px] text-gray-500 tracking-tight">
            알림 신청 순서대로 발송됩니다.
          </li>
          <li className="relative pl-2 before:content-['•'] before:absolute before:left-[-4px] text-gray-500 tracking-tight">
            알림 신청 상품을 구매하거나, 60일이 지나면 자동 해제됩니다.
          </li>
          <li className="relative pl-2 before:content-['•'] before:absolute before:left-[-4px] text-gray-500 tracking-tight">
            인기 상품은 알림 후 조기 품절될 수 있습니다.
          </li>
          <li className="relative pl-2 before:content-['•'] before:absolute before:left-[-4px] text-gray-500 tracking-tight">
            알림 신청 당시의 상품 구성, 가격은 재입고 시 변경될 수 있습니다.
          </li>
        </ul>
      </div>

      {/* Item List */}
      <div className="px-6">
        {dummyItems.map((item) => (
          <div key={item.id} className="py-6 border-b border-gray-100">
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="w-[84px] h-[100px] bg-gray-100 relative rounded-sm overflow-hidden shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col py-1">
                <span className="text-[12px] font-bold text-black mb-0.5">{item.brand}</span>
                <span className="text-[13px] font-bold text-gray-900 mb-1">{item.name}</span>
                <span className="text-[12px] text-gray-600 mb-1 leading-snug">옵션 : {item.option}</span>
                <span className="text-[12px] text-gray-400 mt-1">{item.status}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button className="border border-gray-200 text-black text-[13px] font-bold py-2.5 rounded-[4px] hover:bg-gray-50 transition-colors">
                삭제
              </button>
              <button className="border border-gray-200 text-black text-[13px] font-bold py-2.5 rounded-[4px] hover:bg-gray-50 transition-colors">
                알림 재신청
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
