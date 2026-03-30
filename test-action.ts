import { createBrandAction } from "./src/actions/brand-actions";

async function main() {
    const payload = {
        name: "Test Sub Brand 3",
        nameCN: "Test Sub Brand 3",
        nameEN: "",
        customUrl: "",
        type: "GENERAL",
        isExposedKR: true,
        isExposedCN: true,
        displayStatusPC: "DISPLAY",
        displayStatusMobile: "DISPLAY",
        parentId: "cm0abcde12345", // We will put a real parent ID or just null to test
        isAdultAuth: false,
        accessType: "ALL",
        productDisplayType: "AUTO",
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
    
    console.log("Creating...");
    const result = await createBrandAction(payload);
    console.log(result);
}

main();
