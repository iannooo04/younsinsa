import { getPublicProductsAction } from "@/actions/product-actions";
import { Link } from "@/i18n/routing";
import Image from "next/image";

type SearchPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function pickFirst(v: string | string[] | undefined): string | undefined {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v[0];
  return undefined;
}

export default async function SearchPage(props: SearchPageProps) {
  const searchParams = await props.searchParams;
  const keyword = pickFirst(searchParams.keyword) || "";
  const gf = pickFirst(searchParams.gf) || "A";
  const sort = (pickFirst(searchParams.sort) as 'newest' | 'priceAsc' | 'priceDesc') || "newest";

  // Fetch products based on keyword and gender
  const { items: products, totalCount } = await getPublicProductsAction(1, 100, sort, {
    keyword: keyword,
    gender: gf as 'M' | 'W' | 'A',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {keyword ? (
            <>
              &quot;<span className="text-blue-600">{keyword}</span>&quot;에 대한 검색 결과
            </>
          ) : (
            "검색 결과"
          )}
        </h1>
        <p className="text-sm text-gray-500">총 {totalCount}개의 상품이 검색되었습니다.</p>
      </div>

      <div className="flex justify-end gap-4 mb-4 text-xs font-medium text-gray-500">
        <Link href={`/search?keyword=${keyword}&gf=${gf}&sort=newest`} className={sort === 'newest' ? 'text-black font-bold' : 'hover:text-black'}>최신순</Link>
        <Link href={`/search?keyword=${keyword}&gf=${gf}&sort=priceAsc`} className={sort === 'priceAsc' ? 'text-black font-bold' : 'hover:text-black'}>가격낮은순</Link>
        <Link href={`/search?keyword=${keyword}&gf=${gf}&sort=priceDesc`} className={sort === 'priceDesc' ? 'text-black font-bold' : 'hover:text-black'}>가격높은순</Link>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center text-gray-500 border-t">
          검색된 상품이 없습니다. 다른 검색어를 입력해 보세요.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 border-t pt-8">
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
                    <div className="flex items-center justify-center h-full text-gray-400 text-xs text-center p-4">
                      No Image
                    </div>
                  )}
                  {product.isSoldOut && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">SOLD OUT</span>
                    </div>
                  )}
                </div>
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
                  {product.discountRate > 0 && (
                    <span className="text-red-500 text-xs font-bold">{product.discountRate}%</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
