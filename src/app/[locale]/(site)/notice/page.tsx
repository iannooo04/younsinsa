// src/app/[locale]/(site)/notice/page.tsx

import { useTranslations } from "next-intl";

export default function NoticePage() {
  const t = useTranslations("notice"); // 'notice' 네임스페이스 사용

  // 더미 데이터 (언어팩 키 매핑)
  const notices = [
    {
      id: 1,
      typeKey: "notice", // json의 types.notice
      titleKey: "1", // json의 items.1
      date: "2025.12.10",
    },
    {
      id: 2,
      typeKey: "event", // json의 types.event
      titleKey: "2", // json의 items.2
      date: "2025.12.08",
    },
    {
      id: 3,
      typeKey: "maintenance", // json의 types.maintenance
      titleKey: "3", // json의 items.3
      date: "2025.12.05",
    },
    {
      id: 4,
      typeKey: "notice",
      titleKey: "4",
      date: "2025.12.01",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-black border-b-2 border-black pb-4">
        {t("pageTitle")}
      </h1>

      <div className="flex flex-col">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="flex justify-between items-center py-5 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-sm ${
                    notice.typeKey === "notice"
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {t(`types.${notice.typeKey}`)}
                </span>
                <span className="text-gray-400 text-xs">{notice.date}</span>
              </div>
              <h3 className="text-base font-medium text-gray-800 mt-1">
                {t(`items.${notice.titleKey}`)}
              </h3>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
