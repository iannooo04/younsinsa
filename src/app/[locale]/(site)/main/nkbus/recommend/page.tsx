// src/app/[locale]/(site)/main/recommend/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getPublicMainDisplayGroupsAction, getDisplayGroupProductsAction } from "@/actions/product-display-actions";
import BrandLogoGrid from "@/components/common/BrandLogoGrid";
import { getFeaturedBrandsAction } from "@/actions/brand-actions";
import { getActiveBannersAction } from "@/actions/banner-actions";
import LikeButton from "@/components/common/LikeButton";
import { getUserLikedProductsAction } from "@/actions/like-actions";
import HeroBannerSlider from "@/components/common/HeroBannerSlider";
interface ProductItem {
  id: string;
  image: string;
  brandName: string;
  name: string;
  price: number;
  consumerPrice: number;
  discountRate: number;
}

interface DisplayGroup {
    id: number;
    name: string;
    description: string | null;
    products: ProductItem[];
}

export default function HomePage() {
  const t = useTranslations("home");
  const [displayGroups, setDisplayGroups] = useState<DisplayGroup[]>([]);
  const [brands, setBrands] = useState<Awaited<ReturnType<typeof getFeaturedBrandsAction>>>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dynamicBanners, setDynamicBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [interestBasedProducts, setInterestBasedProducts] = useState<any[]>([]);


  useEffect(() => {
    async function fetchData() {
        setLoading(true);
        // Fetch Brands
        const fetchedBrands = await getFeaturedBrandsAction();
        setBrands(fetchedBrands);

        // Fetch Banners
        const bannersRes = await getActiveBannersAction('home');
        if (bannersRes.success) {
            setDynamicBanners(bannersRes.banners);
        }

        // Fetch Display Groups
        const groupsRes = await getPublicMainDisplayGroupsAction('PC');
        
        if (groupsRes.success && groupsRes.groups.length > 0) {
            const groupsWithProducts = await Promise.all(
                groupsRes.groups.map(async (group) => {
                    const prodRes = await getDisplayGroupProductsAction(group.id);
                    return {
                        id: group.id,
                        name: group.name,
                        description: group.description,
                        products: prodRes.success ? prodRes.products : []
                    };
                })
            );
            setDisplayGroups(groupsWithProducts);
        } else {
            // Removed fallback that generated "실시간 랭킹"
            setDisplayGroups([]);
        }

        // Fetch Liked Products
        const likesRes = await getUserLikedProductsAction();
        if (likesRes.success) {
            setInterestBasedProducts(likesRes.items);
        }

        setLoading(false);
    }
    fetchData();
  }, [t]);





  // 🛠️ 나의 관심 기반(찜) 상품 데이터는 서버에서 가져옵니다.

  // 3. 필터링 로직
  const searchParams = useSearchParams();
  const gf = searchParams.get("gf") || "A";

  const filteredGroups = useMemo(() => {
    if (gf === "A") return displayGroups;
    return displayGroups.map(group => ({
        ...group,
        products: group.products.filter(_p => {
            // Since we don't have gender in ProductItem anymore, we might need to add it 
            // OR just skip filtering for now. 
            // For now, let's keep it simple and skip gender-specific filtering if data doesn't provide it.
            return true;
        })
    }));
  }, [gf, displayGroups]);

  return (
    <div className="bg-white min-h-screen text-black">
      <HeroBannerSlider dynamicBanners={dynamicBanners} />



      {/* 4. Featured Brands Grid */}
      <section className="container mx-auto px-4 py-8 border-b border-gray-100">
         <div className="mb-6 flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-gray-900 mb-1">인기 브랜드</h3>
            <p className="text-sm text-gray-500">지금 가장 사랑받는 브랜드를 만나보세요</p>
         </div>
         <BrandLogoGrid brands={brands} />
      </section>

      {/* 4.5. 나의 관심 기반 상품 추천 (찜한 상품) */}
      {interestBasedProducts.length > 0 && (
      <section className="w-full pl-4 md:pl-6 pr-0 pt-12 pb-16 bg-white shrink-0">
        {/* 타이틀 및 더보기 */}
        <div className="flex justify-between items-end mb-4 bg-white relative pr-4 md:pr-6">
          <h2 className="text-[20px] font-extrabold text-black tracking-tight">나의 관심 기반 상품 추천</h2>
          <Link href="/like/goods" className="text-[12px] text-gray-500 font-medium hover:text-black transition-colors underline decoration-gray-300 underline-offset-4 cursor-pointer">
            더보기
          </Link>
        </div>

        {/* 원형 상품 아이콘 (관심/최근 본 상품 기준) */}
        <div className="flex gap-2.5 mb-5 overflow-visible">
          {interestBasedProducts.slice(0, 5).map((product, idx) => (
             <div key={product.id} className={`w-[45px] h-[45px] rounded-full ring-[1.5px] ${idx === 0 ? 'ring-black' : 'ring-transparent border border-gray-200'} p-[2px] cursor-pointer bg-white relative`}>
               <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
                  <Image src={product.image} fill className="object-cover" alt={product.name}/>
               </div>
             </div>
          ))}
        </div>

        {/* 안내 텍스트 */}
        <p className="text-[11px] font-bold text-black mb-4">
          회원님이 최근 찜한 <span className="underline decoration-black underline-offset-2">{interestBasedProducts[0]?.name}</span> 관련 상품
        </p>

        {/* 상품 가로 스크롤 리스트 */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {interestBasedProducts.map((product) => (
            <div key={product.id} className="min-w-[150px] md:min-w-[190px] lg:min-w-[210px] flex-shrink-0 flex flex-col cursor-pointer group">
              {/* 이미지 영역 */}
              <div className="relative w-full aspect-[4/5] bg-[#f4f4f4] mb-3 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <LikeButton productId={product.id} initialIsLiked={true} />
              </div>
              
              {/* 정보 영역 */}
              <div className="flex flex-col px-0.5 mt-auto">
                <span className="text-[11px] font-bold text-black mb-1 leading-none">{product.brand}</span>
                <span className="text-[12px] text-gray-800 leading-snug line-clamp-2 mb-2 min-h-[34px] font-medium">{product.name}</span>
                <div className="flex gap-1.5 items-center">
                  {product.discount > 0 && <span className="text-[#FF0000] font-bold text-[14px] tracking-tight">{product.discount}%</span>}
                  <span className="font-extrabold text-[15px] text-black tracking-tight">{product.price.toLocaleString()}원</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* 5. Product Display Groups */}
      {loading ? (
        <div className="container mx-auto px-4 py-20 text-center text-gray-400">
           {t("loading") || "Loading..."}
        </div>
      ) : (
        filteredGroups.map((group) => (
          <section key={group.id} className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">{group.name}</h2>
                {group.description && <p className="text-xs text-gray-400 mt-1">{group.description}</p>}
              </div>
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-black underline decoration-gray-300"
              >
                {t("viewAll")}
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-10">
              {group.products.map((product) => (
                <div key={product.id} className="group cursor-pointer flex flex-col">
                  {/* 이미지 영역 */}
                  <div className="relative w-full bg-[#f4f4f4] mb-3 overflow-hidden">
                    <div className="aspect-3/4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* 하트 아이콘 */}
                    <LikeButton productId={product.id} />
                  </div>

                  {/* 정보 영역 */}
                  <div className="px-1">
                    <div className="text-[11px] font-bold text-black mb-1 truncate">
                      {product.brandName}
                    </div>
                    <div className="text-[13px] text-gray-700 leading-tight mb-2 line-clamp-2 h-[2.4em]">
                      {product.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      {product.discountRate > 0 && (
                        <span className="text-red-600 font-bold">
                          {product.discountRate}%
                        </span>
                      )}
                      <span className="font-bold text-black">{product.price.toLocaleString()}원</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      )}

      {/* 5. Brand Focus Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">{t("brandFocusTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-video bg-gray-200 relative group overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&w=800&q=80"
                fill
                className="object-cover"
                alt="Brand Lookbook"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <span className="text-white text-3xl font-bold border-2 border-white px-6 py-2">
                  {t("lookbook")}
                </span>
              </div>
            </div>
            <div className="aspect-video bg-gray-200 relative group overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80"
                fill
                className="object-cover"
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
