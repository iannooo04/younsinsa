// src/app/[locale]/(site)/brand/[brandSlug]/page.tsx
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ brandSlug: string }> | { brandSlug: string };
  searchParams:
    | Promise<Record<string, string | string[] | undefined>>
    | Record<string, string | string[] | undefined>;
};

function pickFirst(v: string | string[] | undefined): string | undefined {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v[0];
  return undefined;
}

function isSafeBrandSlug(slug: string): boolean {
  // 이미리 예시(adidas 등)에 맞춰 보수적으로 제한
  // 필요하면 허용 범위 넓혀도 됨(예: 한글, % 인코딩 등)
  return /^[a-z0-9][a-z0-9-_]{0,63}$/i.test(slug);
}

export default async function BrandPage(props: PageProps) {
  const resolvedParams = await Promise.resolve(props.params);
  const resolvedSearchParams = await Promise.resolve(props.searchParams);

  const brandSlugRaw = resolvedParams.brandSlug;

  // slug 검증
  if (!isSafeBrandSlug(brandSlugRaw)) notFound();

  // ?gf=A
  const gf = pickFirst(resolvedSearchParams.gf);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Brand {brandSlugRaw}</h1>

      <div className="mt-4 text-sm">
        <div>
          <span className="font-semibold">gf:</span>{" "}
          <span>{gf ?? "(none)"}</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="rounded-lg border p-4">
          TODO: brandSlug 기반 상품/룩북/스타일/매거진 섹션 렌더링
        </div>
      </div>
    </div>
  );
}
