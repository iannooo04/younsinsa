import { prisma } from "./src/lib/prisma";

async function main() {
  try {
    const payload = {
      name: "Test Brand",
      nameCN: "Test Brand",
      nameEN: "",
      customUrl: "",
      type: "GENERAL",
      isExposedKR: true,
      isExposedCN: true,
      displayStatusPC: "DISPLAY",
      displayStatusMobile: "DISPLAY",
      isAdultAuth: false,
      accessType: "ALL",
      productDisplayType: "AUTO",
      pcTheme: "브랜드테마",
      mobileTheme: "브랜드테마",
      isSeoUsed: false,
      isRecApplyToChildren: false,
      isRecExposedPC: true,
      isRecExposedMobile: true,
      recProductDisplayType: "AUTO",
      recPcTheme: "추천상품테마",
      recMobileTheme: "추천상품테마",
      htmlContents: {
        navTopPC: "",
        navTopMobile: "",
        recTopPC: "",
        recTopMobile: "",
        listTopPC: "",
        listTopMobile: ""
      }
    };

    const newBrand = await prisma.brand.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: payload as any,
    });
    console.log("Success:", newBrand);
  } catch (err: unknown) {
    console.error("Prisma Error:", (err as Error).message);
  }
}

main().finally(() => prisma.$disconnect());
