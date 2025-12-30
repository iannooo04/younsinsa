"use client";

import { useTranslations } from "next-intl";

export default function SalePage() {
  // Mock Data for Sale Items
  const items = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    brand: "SALE BRAND",
    name: `Special Offer Item ${i + 1}`,
    price: "₩29,900",
    originalPrice: "₩89,000",
    discount: "64%",
    image: "https://via.placeholder.com/300x400/333/fff?text=Sale",
  }));

  return (
    <div className="w-full pb-20">
      {/* Hero Section */}
      <div className="w-full h-64 bg-gradient-to-r from-red-600 to-orange-600 text-white flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-black mb-2 tracking-tight">SPECIAL OFFER</h1>
        <p className="text-lg text-red-100 font-medium">
          Limited time offers. Up to 80% off.
        </p>
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
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                  {item.discount}
                </div>
              </div>
              <div className="text-xs font-bold text-gray-900 mb-1">
                {item.brand}
              </div>
              <div className="text-sm text-gray-600 mb-1 group-hover:underline">
                {item.name}
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm font-bold text-red-600">{item.price}</span>
                <span className="text-xs text-gray-400 line-through">{item.originalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
