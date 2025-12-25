// src/app/[locale]/(site)/category/[categoryId]/page.tsx
import { notFound } from "next/navigation";

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
  if (!/^\d+$/.test(categoryIdRaw)) notFound();

  // ?gf=A
  const gf = pickFirst(resolvedSearchParams.gf);
  // ?sub=driver (서브아이템 클릭 시)
  const sub = pickFirst(resolvedSearchParams.sub);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Category {categoryIdRaw}</h1>

      <div className="mt-4 text-sm space-y-1">
        <div>
          <span className="font-semibold">gf:</span>{" "}
          <span>{gf ?? "(none)"}</span>
        </div>
        <div>
          <span className="font-semibold">sub:</span>{" "}
          <span>{sub ?? "(none)"}</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="rounded-lg border p-4">
          TODO: categoryId 기반 상품 목록 렌더링
        </div>
      </div>
    </div>
  );
}
