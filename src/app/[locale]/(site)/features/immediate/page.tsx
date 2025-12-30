"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function ImmediatePage() {
  const t = useTranslations();

  // Mock Data for Immediate Shipment Items
  const items = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    brand: "YIMILI",
    name: `Immediate Delivery Item ${i + 1}`,
    price: "₩45,000",
    image: "https://via.placeholder.com/300x400/eee/999?text=Immediate",
  }));

  return (
    <div className="w-full pb-20">
      {/* Hero Section */}
      <div className="w-full h-64 bg-gradient-to-r from-blue-900 to-slate-900 text-white flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-black mb-2 tracking-tight">IMMEDIATE</h1>
        <p className="text-lg text-blue-100 font-medium">
          Order now, ship today. Fast delivery guaranteed.
        </p>
      </div>

      {/* Filter / Sort Bar */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 px-6 flex justify-between items-center z-10">
        <span className="font-bold text-black">{items.length} Items</span>
        <div className="flex gap-4 text-sm font-medium text-gray-500">
          <span className="cursor-pointer text-black">Newest</span>
          <span className="cursor-pointer hover:text-black">Price Low</span>
          <span className="cursor-pointer hover:text-black">Price High</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {items.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                  Today
                </div>
              </div>
              <div className="text-xs font-bold text-gray-900 mb-1">
                {item.brand}
              </div>
              <div className="text-sm text-gray-600 mb-1 group-hover:underline">
                {item.name}
              </div>
              <div className="text-sm font-bold text-black">{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
