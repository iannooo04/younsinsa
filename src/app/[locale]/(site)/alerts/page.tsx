
import React from "react";

export default function AlertsPage() {
  return (
    <div className="bg-white min-h-screen flex justify-center">
      <div className="w-full max-w-[960px] relative shadow-sm">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white">
          <div className="flex items-center justify-between px-5 h-[56px]">
            <h1 className="text-[18px] font-bold text-black">알림</h1>
            <button className="p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] pb-20">
          <span className="text-[14px] text-gray-500">
            도착한 알림이 없습니다
          </span>
        </div>
      </div>
    </div>
  );
}
