import { createBrandAction } from "./src/actions/brand-actions";

async function main() {
    const payload = {
        name: "Test Brand 2",
        nameCN: "Test Brand 2",
        nameEN: "",
        customUrl: "",
        type: "GENERAL",
        isExposedKR: true,
        isExposedCN: true,
        displayStatusPC: "DISPLAY",
        displayStatusMobile: "DISPLAY",
        parentId: null,
        isAdultAuth: false,
        accessType: "ALL",
        accessInaccessibleExposed: false,
        accessApplyToChildren: false,
        productDisplayType: "AUTO",
        productDisplaySort: "RECENT",
        pcTheme: "브랜드테마",
        mobileTheme: "브랜드테마",
        logoUrl: "",
        pcImageUrl: "",
        pcMouseoverImageUrl: "",
        mobileImageUrl: "",
        isSeoUsed: false,
        seoTitle: "",
        seoAuthor: "",
        seoDescription: "",
        seoKeywords: [],
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
        },
        recommendedProducts: [],
    };

    const res = await createBrandAction(payload);
    console.log("Result:", res);
}

main().catch(console.error);
