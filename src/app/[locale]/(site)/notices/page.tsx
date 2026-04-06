import Link from 'next/link';

export default function NoticesPage() {
  return (
    <div className="w-full bg-[#f5f5f5] min-h-[calc(100vh-60px)] flex flex-col pb-20 max-w-[800px] mx-auto">
      {/* Header */}
      <header className="bg-white flex items-center justify-between px-4 h-14 border-b border-gray-100 shrink-0">
        <Link href="/mypage" className="p-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <h1 className="text-[16px] font-bold">공지사항</h1>
        <Link href="/" className="p-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </Link>
      </header>

      {/* Empty State */}
      <div className="flex-1 flex items-center justify-center text-[13px] text-gray-400 bg-[#f5f5f5]">
        등록된 공지사항이 없습니다.
      </div>
    </div>
  );
}
