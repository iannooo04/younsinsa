import { getPublicProductsAction } from "@/actions/product-actions";
import { Link } from "@/i18n/routing";
import Image from "next/image";

type PageProps = {
  params: Promise<{ categoryId: string }> | { categoryId: string };
  searchParams:
    | Promise<Record<string, string | string[] | undefined>>
    | Record<string, string | string[] | undefined>;
};

function pickFirst(v: string | string[] | undefined): string | undefined {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v[0];
  return undefined;
}

export default async function CategoryPage(props: PageProps) {
  const resolvedParams = await Promise.resolve(props.params);
  const resolvedSearchParams = await Promise.resolve(props.searchParams);

  const categoryIdRaw = resolvedParams.categoryId;
  // Removed strict regex check to support CUIDs/UUIDs
  
  // ?gf=A
  const gf = pickFirst(resolvedSearchParams.gf) || "A";
  // ?sort=newest
  const sort = (pickFirst(resolvedSearchParams.sort) as 'newest' | 'priceAsc' | 'priceDesc' | 'name') || "newest";

  // Fetch products
  const { items: products } = await getPublicProductsAction(1, 100, sort, { 
      categoryId: categoryIdRaw,
      gender: gf as 'M' | 'W' | 'A',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Category Products</h1>

      {/* Filter Debug Info (Optional, can be removed) */}
      <div className="text-sm text-gray-500 mb-6 hidden">
        <span>Category: {categoryIdRaw}</span>
        {gf && <span className="ml-4">Gender: {gf}</span>}
      </div>

      <div className="flex justify-end gap-4 mb-4 text-xs font-medium text-gray-500">
        <Link href={`/category/${categoryIdRaw}?gf=${gf}&sort=newest`} className={sort === 'newest' ? 'text-black font-bold' : 'hover:text-black'}>최신순</Link>
        <Link href={`/category/${categoryIdRaw}?gf=${gf}&sort=priceAsc`} className={sort === 'priceAsc' ? 'text-black font-bold' : 'hover:text-black'}>가격낮은순</Link>
        <Link href={`/category/${categoryIdRaw}?gf=${gf}&sort=priceDesc`} className={sort === 'priceDesc' ? 'text-black font-bold' : 'hover:text-black'}>가격높은순</Link>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
            상품이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col">
              {/* 이미지 영역 */}
              <div className="relative w-full bg-[#f4f4f4] mb-3 overflow-hidden rounded-sm">
                <div className="aspect-[3/4]">
                  {product.image ? (
                       <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                  ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-xs">No Image</div>
                  )}
                </div>
                {product.isSoldOut && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold text-xs uppercase">Sold Out</span>
                  </div>
                )}
              </div>

              {/* 정보 영역 */}
              <div className="px-1">
                <div className="text-[11px] font-bold text-black mb-1 truncate">
                  {product.brandName || "Brand"}
                </div>
                <div className="text-[13px] text-gray-700 leading-tight mb-2 line-clamp-2 h-[2.4em]">
                  {product.name}
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="font-bold text-black">{product.price.toLocaleString()}원</span>
                  {product.discountRate > 0 && <span className="text-red-500 text-xs">{product.discountRate}%</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
