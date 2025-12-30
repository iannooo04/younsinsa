"use client";

import { useTranslations } from "next-intl";

export default function ProxyPage() {
  return (
    <div className="w-full bg-black text-white pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
        {/* Abstract Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900 via-black to-black opacity-60" />
        
        <div className="relative z-20 space-y-6 animate-fade-in-up">
          <span className="text-orange-500 font-bold tracking-widest text-sm uppercase">Global Personal Shopper</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
            YIMILI <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">AGENT</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            We source exclusive items from around the world just for you. <br/>
            Experience the premium purchasing agency service without boundaries.
          </p>
          <button className="mt-8 px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold tracking-wider uppercase transition-colors rounded-sm">
            Request Service
          </button>
        </div>
      </div>

      {/* Process Section */}
      <div className="w-full max-w-6xl mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "REQUEST", desc: "Submit your wish list item URL or image." },
            { step: "02", title: "PAYMENT", desc: "Confirm the quote and proceed with payment." },
            { step: "03", title: "PURCHASE", desc: "Our local agents purchase the item directly." },
            { step: "04", title: "DELIVERY", desc: "Receive your item safely at your doorstep." },
          ].map((item, idx) => (
            <div key={idx} className="border-t border-orange-900/50 pt-6 group hover:border-orange-500 transition-colors duration-500">
              <span className="text-5xl font-black text-white/10 group-hover:text-orange-600/20 transition-colors">{item.step}</span>
              <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-orange-500 transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Brands */}
      <div className="w-full bg-white text-black py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black tracking-tighter mb-2">SOURCING BRANDS</h2>
              <p className="text-gray-500">We mainly source from these premium global brands.</p>
            </div>
            <span className="text-xs font-bold underline cursor-pointer">VIEW ALL BRANDS</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["SUPREME", "STUSSY", "PALACE", "KITH", "HUMAN MADE", "NOAH", "AIMÉ LEON DORE", "WTAPS", "NEIGHBORHOOD", "BAPE"].map((brand) => (
                <div key={brand} className="aspect-video bg-gray-50 flex items-center justify-center font-bold text-lg border border-gray-100 hover:border-black hover:bg-white transition-all cursor-pointer">
                    {brand}
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Banner */}
       <div className="w-full py-24 text-center px-4">
          <h3 className="text-2xl font-bold mb-4">Have questions about customs & duties?</h3>
          <p className="text-gray-500 mb-8">Check our detailed guide regarding international shipping.</p>
          <button className="border border-white/20 hover:bg-white hover:text-black px-6 py-2 text-sm transition-colors text-gray-300">
            READ GUIDE
          </button>
       </div>
    </div>
  );
}
