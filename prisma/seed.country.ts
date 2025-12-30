// prisma/seed.country.ts
import countries, { type LocaleData } from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json" with { type: "json" };
import { prisma } from "@/lib/prisma";

interface CountryRow {
  code: string; // ISO 3166-1 alpha-2 (A-Z 2 chars)
  name: string;
}

function normalizeCountries(): CountryRow[] {
  countries.registerLocale(en as LocaleData);

  // i18n-iso-countries는 ISO2 코드를 key로 반환(일반적으로 대문자)
  const names = countries.getNames("en") as Record<string, string>;

  // 코드/이름 정규화: 코드 대문자 2글자, 이름 trim
  const list: CountryRow[] = Object.entries(names)
    .map(([code, name]) => ({
      code: code.toUpperCase(),
      name: name.trim(),
    }))
    .filter((row) => /^[A-Z]{2}$/.test(row.code) && row.name.length > 0);

  // 혹시 모를 중복 코드 제거(마지막 값 유지)
  const dedup = new Map<string, string>();
  for (const row of list) {
    dedup.set(row.code, row.name);
  }

  return Array.from(dedup.entries()).map(([code, name]) => ({ code, name }));
}

async function main(): Promise<void> {
  const data = normalizeCountries();

  // prisma.createMany는 기본적으로 대량 삽입을 지원.
  // 데이터가 많지 않으므로 단일 호출로 충분.
  await prisma.country.createMany({
    data,
    skipDuplicates: true, // 이미 존재하는 code는 건너뜀 (@id Char(2))
  });

  // 선택: 검증용 로그
  const count = await prisma.country.count();
  // eslint-disable-next-line no-console
  console.log(`Seed OK: countries=${count}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err: unknown) => {
    // eslint-disable-next-line no-console
    console.error("Seed failed:", err);
    await prisma.$disconnect();
    process.exit(1);
  });
