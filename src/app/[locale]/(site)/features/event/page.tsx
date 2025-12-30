"use client";

import { useTranslations } from "next-intl";

export default function EventPage() {
  const events = [
    { id: 1, title: "SEASON OFF: UP TO 70%", date: "2024.01.01 ~ 2024.01.31", color: "bg-red-600" },
    { id: 2, title: "NEW YEAR COUPON PACK", date: "2024.01.01 ~ 2024.01.07", color: "bg-blue-600" },
    { id: 3, title: "FREE SHIPPING WEEK", date: "2024.01.10 ~ 2024.01.17", color: "bg-green-600" },
    { id: 4, title: "BRAND FOCUS: ADIDAS", date: "2024.01.15 ~ 2024.01.22", color: "bg-black" },
  ];

  return (
    <div className="w-full pb-20">
      <div className="w-full py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">PROMOTION</h1>
        <p className="text-gray-500">Check out our latest events and benefits.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 space-y-4">
        {events.map((event) => (
            <div key={event.id} className="relative w-full aspect-[3/1] rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-shadow">
                <div className={`absolute inset-0 ${event.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <h2 className="text-3xl font-black mb-2 tracking-tighter group-hover:scale-105 transition-transform">{event.title}</h2>
                    <p className="font-medium opacity-80">{event.date}</p>
                    <button className="mt-4 border border-white px-4 py-1.5 text-xs font-bold uppercase hover:bg-white hover:text-black transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
