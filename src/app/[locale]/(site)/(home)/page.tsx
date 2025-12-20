"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale(); // 현재 적용된 언어 코드 (ko, en 등)

  // 더미 데이터: 상품 목록
  // ⚠️ 주의: 이 데이터들은 코드에 고정되어 있어 언어를 바꿔도 번역되지 않습니다.
  // 번역하려면 이 텍스트들도 json 파일로 옮겨야 합니다.
  const products = [
    {
      id: 1,
      brand: "Thisisneverthat",
      name: "T-Logo Hoodie Black",
      price: "89,000",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      brand: "Covernat",
      name: "C-Logo Crewneck Grey",
      price: "59,000",
      discount: "15%",
      img: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      brand: "Nike",
      name: "Air Force 1 '07",
      price: "139,000",
      discount: "",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      brand: "Adidas",
      name: "Samba OG White",
      price: "119,000",
      discount: "5%",
      img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      brand: "Andersson Bell",
      name: "Unisex Fabrik Jacket",
      price: "248,000",
      discount: "20%",
      img: "https://images.unsplash.com/photo-1551028919-ac7bcb7d0125?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 6,
      brand: "Musinsa Standard",
      name: "Wide Slack Black",
      price: "33,900",
      discount: "",
      img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 7,
      brand: "North Face",
      name: "1996 Eco Nuptse",
      price: "399,000",
      discount: "10%",
      img: "https://images.unsplash.com/photo-1544022613-e87ca1920295?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 8,
      brand: "Stussy",
      name: "Basic Stussy Tee",
      price: "68,000",
      discount: "",
      img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=80",
    },
  ];

  const menuKeys = [
    "menuRanking",
    "menuCoupon",
    "menuEvent",
    "menuOutlet",
    "menuStyle",
    "menuLimited",
    "menuLuxury",
    "menuBeauty",
  ];

  return (
    <div className="bg-white min-h-screen text-black">
      {/* 🔴 디버깅용: 현재 언어가 무엇인지 화면 맨 위에 표시합니다. 나중에 지우세요. */}
      {/* <div className="bg-red-500 text-white p-2 text-center font-bold">
        현재 언어 모드: {locale.toUpperCase()} (URL: /{locale})
      </div> */}

      {/* 2. Hero Section (Banner Style) */}
      <section className="bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[500px]">
          {/* Main Banner Left */}
          <div className="md:col-span-2 relative bg-gray-800 text-white flex items-center justify-center overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
              alt="Main Banner"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="relative z-10 text-center p-8">
              <div className="text-sm font-bold tracking-widest mb-2 text-yellow-400">
                {t("bannerTag")}
              </div>
              <h2
                className="text-5xl md:text-6xl font-black mb-4 uppercase"
                dangerouslySetInnerHTML={{ __html: t.raw("bannerTitle") }}
              />
              <p className="text-xl mb-6">{t("bannerDesc")}</p>
              <button className="btn btn-outline text-white hover:bg-white hover:text-black rounded-none border-white">
                {t("bannerButton")}
              </button>
            </div>
          </div>

          {/* Side Banners Right */}
          <div className="grid grid-rows-2 h-full">
            <div className="relative bg-gray-700 flex items-center justify-center overflow-hidden group cursor-pointer border-b border-gray-600 md:border-l">
              <img
                src="https://images.unsplash.com/photo-1522335789203-abd6538d8ad3?auto=format&fit=crop&w=600&q=80"
                alt="Sub Banner 1"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative z-10 text-white text-center">
                <h3 className="text-2xl font-bold">{t("newArrivalsTitle")}</h3>
                <p className="text-sm">{t("newArrivalsDesc")}</p>
              </div>
            </div>
            <div className="relative bg-gray-600 flex items-center justify-center overflow-hidden group cursor-pointer md:border-l">
              <img
                src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80"
                alt="Sub Banner 2"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative z-10 text-white text-center">
                <h3 className="text-2xl font-bold">{t("editorsPickTitle")}</h3>
                <p className="text-sm">{t("editorsPickDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shortcut Icons (Menu) */}
      <section className="container mx-auto px-4 py-6 border-b border-gray-100">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {menuKeys.map((key, idx) => (
            <button
              key={idx}
              className="flex flex-col items-center min-w-[70px] gap-2 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl group-hover:bg-black group-hover:text-white transition-colors">
                {idx % 2 === 0 ? "🛍️" : "🔥"}
              </div>
              <span className="text-xs font-medium text-gray-600">
                {t(key)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Product Grid (Commerce Core) */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold">{t("rankingTitle")}</h2>
          <Link href="#" className="text-sm text-gray-500 hover:text-black">
            {t("viewAll")} &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image */}
              <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden rounded-md">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute right-3 top-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  ❤️
                </button>
                <div className="absolute left-0 top-0 bg-black text-white text-xs px-2 py-1 font-bold">
                  {product.id}
                  {t("rankSuffix")}
                </div>
              </div>

              {/* Info */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-gray-800">
                  {product.brand}
                </div>
                <div className="text-sm text-gray-600 leading-tight line-clamp-1">
                  {product.name}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-bold text-lg">{product.price}원</span>
                  {product.discount && (
                    <span className="text-red-500 font-bold text-sm">
                      {product.discount}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <div className="badge badge-outline badge-sm text-xs text-gray-400 border-gray-300">
                    {t("couponAvailable")}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Brand Focus Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">{t("brandFocusTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-video bg-gray-200 relative group overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover"
                alt="Brand Lookbook"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  {t("lookbook")}
                </span>
              </div>
            </div>
            <div className="aspect-video bg-gray-200 relative group overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full object-cover"
                alt="Special Offer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  {t("specialOffer")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
