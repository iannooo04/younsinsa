"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

// --- VAT Settings Actions ---

export async function getVatSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { vatSettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    vatSettings: {
                        create: {} // Create with defaults
                    }
                },
                include: { vatSettings: true },
            });
        }
        
        // If policy exists but vatSettings is null (should normally not happen if created with it, but for safety)
        if (!policy.vatSettings) {
             const newVat = await prisma.vatSettings.create({
                 data: { basicPolicyId: policy.id }
             });
             return {
                 success: true,
                 settings: {
                     ...newVat,
                     productVatRate: Number(newVat.productVatRate),
                     shippingVatRate: Number(newVat.shippingVatRate),
                 }
             };
        }

        return {
            success: true,
            settings: {
                ...policy.vatSettings,
                productVatRate: Number(policy.vatSettings.productVatRate),
                shippingVatRate: Number(policy.vatSettings.shippingVatRate),
            }
        };

    } catch (error) {
        console.error("getVatSettings error:", error);
        return { success: false, error: "VAT 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateVatSettingsAction(data: {
    productVatRate: string | number;
    shippingVatRate: string | number;
    customProductRates: Prisma.InputJsonValue;
    customShippingRates: Prisma.InputJsonValue;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) {
            return { success: false, error: "기본 정책을 찾을 수 없습니다." };
        }

        const vatSettings = await prisma.vatSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                productVatRate: data.productVatRate,
                shippingVatRate: data.shippingVatRate,
                customProductRates: data.customProductRates,
                customShippingRates: data.customShippingRates,
            },
            create: {
                basicPolicyId: policy.id,
                productVatRate: data.productVatRate,
                shippingVatRate: data.shippingVatRate,
                customProductRates: data.customProductRates,
                customShippingRates: data.customShippingRates,
            }
        });

        return {
            success: true,
            settings: {
                ...vatSettings,
                productVatRate: Number(vatSettings.productVatRate),
                shippingVatRate: Number(vatSettings.shippingVatRate),
            }
        };
    } catch (error) {
        console.error("updateVatSettings error:", error);
        return { success: false, error: "VAT 설정 저장에 실패했습니다." };
    }
}

// --- Guide Settings Actions ---



export async function getGuideSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { guideSettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                guideSettings: {
                        create: {
                            usageGuide: { kr: "", cn: "" },
                            withdrawalGuide: { kr: "", cn: "" }
                        }
                    },
                    vatSettings: { create: {} }
                },
                include: { guideSettings: true },
            });
        }

        if (!policy.guideSettings) {
             const newGuide = await prisma.guideSettings.create({
                 data: { 
                     basicPolicyId: policy.id,
                     usageGuide: { kr: "", cn: "" },
                     withdrawalGuide: { kr: "", cn: "" }
                 }
             });
             return { success: true, settings: newGuide };
        }

        return { success: true, settings: policy.guideSettings };

    } catch (error) {
        console.error("getGuideSettings error:", error);
        return { success: false, error: "이용/탈퇴 안내 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateGuideSettingsAction(data: {
    usageGuide: Prisma.InputJsonValue;
    withdrawalGuide: Prisma.InputJsonValue;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책을 찾을 수 없습니다." };

        const guideSettings = await prisma.guideSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                usageGuide: data.usageGuide,
                withdrawalGuide: data.withdrawalGuide,
            },
            create: {
                basicPolicyId: policy.id,
                usageGuide: data.usageGuide,
                withdrawalGuide: data.withdrawalGuide,
            }
        });

        return { success: true, settings: guideSettings };
    } catch (error) {
        console.error("updateGuideSettings error:", error);
        return { success: false, error: "설정 저장에 실패했습니다." };
    }
}

// --- Currency Settings Actions ---

export async function getCurrencySettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { currencySettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    currencySettings: {
                        create: {
                            baseCountry: "kr",
                            currencyDisplay: "won",
                            weightUnit: "g"
                        }
                    },
                     vatSettings: { create: {} }
                },
                include: { currencySettings: true },
            });
        }

        if (!policy.currencySettings) {
             const newCurrency = await prisma.currencySettings.create({
                 data: { 
                     basicPolicyId: policy.id,
                     baseCountry: "kr",
                     currencyDisplay: "won",
                     weightUnit: "g"
                 }
             });
             return { success: true, settings: newCurrency };
        }

        return { success: true, settings: policy.currencySettings };

    } catch (error) {
        console.error("getCurrencySettings error:", error);
        return { success: false, error: "금액/단위 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateCurrencySettingsAction(data: {
    baseCountry: string;
    currencyDisplay: string;
    weightUnit: string;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책을 찾을 수 없습니다." };

        const currencySettings = await prisma.currencySettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                baseCountry: data.baseCountry,
                currencyDisplay: data.currencyDisplay,
                weightUnit: data.weightUnit,
            },
            create: {
                basicPolicyId: policy.id,
                baseCountry: data.baseCountry,
                currencyDisplay: data.currencyDisplay,
                weightUnit: data.weightUnit,
            }
        });

        return { success: true, settings: currencySettings };
    } catch (error) {
        console.error("updateCurrencySettings error:", error);
        return { success: false, error: "설정 저장에 실패했습니다." };
    }
}

// --- Storage Settings Actions ---

export async function getStorageSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { storageSettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    storageSettings: {
                        create: {
                            storagePaths: {},
                            filePaths: {}
                        }
                    },
                     vatSettings: { create: {} }
                },
                include: { storageSettings: true },
            });
        }

        if (!policy.storageSettings) {
             const newStorage = await prisma.storageSettings.create({
                 data: { 
                     basicPolicyId: policy.id,
                     storagePaths: {},
                     filePaths: {}
                 }
             });
             return { success: true, settings: newStorage };
        }

        return { success: true, settings: policy.storageSettings };

    } catch (error) {
        console.error("getStorageSettings error:", error);
        return { success: false, error: "저장소 경로 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateStorageSettingsAction(data: {
    storagePaths: Prisma.InputJsonValue;
    filePaths: Prisma.InputJsonValue;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책을 찾을 수 없습니다." };

        const storageSettings = await prisma.storageSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                storagePaths: data.storagePaths,
                filePaths: data.filePaths,
            },
            create: {
                basicPolicyId: policy.id,
                storagePaths: data.storagePaths,
                filePaths: data.filePaths,
            }
        });

        return { success: true, settings: storageSettings };
    } catch (error) {
        console.error("updateStorageSettings error:", error);
        return { success: false, error: "설정 저장에 실패했습니다." };
    }
}

// --- SEO Settings Actions ---

export async function getSeoSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { seoSettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    seoSettings: {
                        create: {
                            pagePathType: "error",
                            useCanonical: false
                        }
                    },
                     vatSettings: { create: {} }
                },
                include: { seoSettings: true },
            });
        }

        if (!policy.seoSettings) {
             const newSeo = await prisma.seoSettings.create({
                 data: { 
                     basicPolicyId: policy.id,
                     pagePathType: "error",
                     useCanonical: false
                 }
             });
             return { success: true, settings: newSeo };
        }

        return { success: true, settings: policy.seoSettings };

    } catch (error) {
        console.error("getSeoSettings error:", error);
        return { success: false, error: "SEO 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateSeoSettingsAction(data: {
    pcRobotTxt?: string;
    mobileRobotTxt?: string;
    majorPageTags?: Prisma.InputJsonValue;
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
    sitemapPath?: string;
    rssPath?: string;
    pagePathType?: string;
    pagePathUrl?: string;
    useCanonical?: boolean;
    relatedChannels?: Prisma.InputJsonValue;
    otherPageTags?: Prisma.InputJsonValue;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책을 찾을 수 없습니다." };

        const seoSettings = await prisma.seoSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                pcRobotTxt: data.pcRobotTxt,
                mobileRobotTxt: data.mobileRobotTxt,
                majorPageTags: data.majorPageTags,
                ogImage: data.ogImage,
                ogTitle: data.ogTitle,
                ogDescription: data.ogDescription,
                sitemapPath: data.sitemapPath,
                rssPath: data.rssPath,
                pagePathType: data.pagePathType,
                pagePathUrl: data.pagePathUrl,
                useCanonical: data.useCanonical,
                relatedChannels: data.relatedChannels,
                otherPageTags: data.otherPageTags,
            },
            create: {
                basicPolicyId: policy.id,
                pcRobotTxt: data.pcRobotTxt,
                mobileRobotTxt: data.mobileRobotTxt,
                majorPageTags: data.majorPageTags,
                ogImage: data.ogImage,
                ogTitle: data.ogTitle,
                ogDescription: data.ogDescription,
                sitemapPath: data.sitemapPath,
                rssPath: data.rssPath,
                pagePathType: data.pagePathType || "error",
                pagePathUrl: data.pagePathUrl,
                useCanonical: data.useCanonical || false,
                relatedChannels: data.relatedChannels,
                otherPageTags: data.otherPageTags,
            }
        });

        return { success: true, settings: seoSettings };
    } catch (error) {
        console.error("updateSeoSettings error:", error);
        return { success: false, error: "설정 저장에 실패했습니다." };
    }
}

// --- Exchange Rate Settings Actions ---

export async function getExchangeRateSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { exchangeRateSettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                   exchangeRateSettings: {
                        create: {
                            rates: {}
                        }
                   },
                   vatSettings: { create: {} }
                },
                include: { exchangeRateSettings: true },
            });
        }

        if (!policy.exchangeRateSettings) {
             const newExchange = await prisma.exchangeRateSettings.create({
                 data: { 
                     basicPolicyId: policy.id,
                     rates: {
                        "USD": { "mode": "auto", "rate": 1436.5, "adjustment": 0 },
                        "CNY": { "mode": "auto", "rate": 204.86, "adjustment": 0 },
                        "JPY": { "mode": "auto", "rate": 9.1839, "adjustment": 0 },
                        "EUR": { "mode": "auto", "rate": 1689.56, "adjustment": 0 }
                     }
                 }
             });
             return { success: true, settings: newExchange };
        }

        // Check if rates is empty, if so populate default
        if (Object.keys(policy.exchangeRateSettings.rates as object).length === 0) {
             const defaultRates = {
                "USD": { "mode": "auto", "rate": 1436.5, "adjustment": 0 },
                "CNY": { "mode": "auto", "rate": 204.86, "adjustment": 0 },
                "JPY": { "mode": "auto", "rate": 9.1839, "adjustment": 0 },
                "EUR": { "mode": "auto", "rate": 1689.56, "adjustment": 0 }
             };
             await prisma.exchangeRateSettings.update({
                 where: { id: policy.exchangeRateSettings.id },
                 data: { rates: defaultRates }
             });
             policy.exchangeRateSettings.rates = defaultRates;
        }

        return { success: true, settings: policy.exchangeRateSettings };

    } catch (error) {
        console.error("getExchangeRateSettings error:", error);
        return { success: false, error: "환율 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateExchangeRateSettingsAction(data: {
    rates: Prisma.InputJsonValue;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책을 찾을 수 없습니다." };

        const exchangeRateSettings = await prisma.exchangeRateSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                rates: data.rates,
            },
            create: {
                basicPolicyId: policy.id,
                rates: data.rates,
            }
        });

        return { success: true, settings: exchangeRateSettings };
    } catch (error) {
        console.error("updateExchangeRateSettings error:", error);
        return { success: false, error: "설정 저장에 실패했습니다." };
    }
}

export async function fetchLiveExchangeRateAction(currencyCode: string) {
    try {
        // Use a public API. Note: In production, use a reliable paid service or cache results.
        // We use exchangerate-api.com as an example of a free endpoint.
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${currencyCode}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch rate for ${currencyCode}`);
        }
        const data = await response.json();
        // The API returns 1 Base = X KRW.
        const rate = data.rates["KRW"];
        if (!rate) throw new Error("KRW rate not found");

        return { success: true, rate };
    } catch (error) {
        console.error(`fetchLiveExchangeRateAction error for ${currencyCode}:`, error);
        return { success: false, error: "환율 정보를 가져오는데 실패했습니다." };
    }
}

// --- Overseas Shipping Settings Actions ---

export async function getOverseasShippingSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { overseasShippingSettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    overseasShippingSettings: {
                        create: {
                            conditions: {}
                        }
                    },
                    vatSettings: { create: {} }
                },
                include: { overseasShippingSettings: true },
            });
        }

        if (!policy.overseasShippingSettings) {
             const newSettings = await prisma.overseasShippingSettings.create({
                 data: { 
                     basicPolicyId: policy.id,
                     conditions: {
                        "en_US": { "rateStandard": "ems", "useInsurance": false, "boxWeight": 0.0, "countryGroupCount": 1 },
                        "zh_CN": { "rateStandard": "ems", "useInsurance": false, "boxWeight": 0.0, "countryGroupCount": 1 },
                        "ja_JP": { "rateStandard": "ems", "useInsurance": false, "boxWeight": 0.0, "countryGroupCount": 1 }
                     }
                 }
             });
             return { success: true, settings: newSettings };
        }

        // Initialize if empty
        if (!policy.overseasShippingSettings.conditions || Object.keys(policy.overseasShippingSettings.conditions as object).length === 0) {
             const defaultConditions = {
                "en_US": { "rateStandard": "ems", "useInsurance": false, "boxWeight": 0.0, "countryGroupCount": 1 },
                "zh_CN": { "rateStandard": "ems", "useInsurance": false, "boxWeight": 0.0, "countryGroupCount": 1 },
                "ja_JP": { "rateStandard": "ems", "useInsurance": false, "boxWeight": 0.0, "countryGroupCount": 1 }
             };
             await prisma.overseasShippingSettings.update({
                 where: { id: policy.overseasShippingSettings.id },
                 data: { conditions: defaultConditions }
             });
             policy.overseasShippingSettings.conditions = defaultConditions;
        }

        return { success: true, settings: policy.overseasShippingSettings };

    } catch (error) {
        console.error("getOverseasShippingSettings error:", error);
        return { success: false, error: "해외 배송조건 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateOverseasShippingSettingsAction(data: {
    conditions: Prisma.InputJsonValue;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책을 찾을 수 없습니다." };

        const settings = await prisma.overseasShippingSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                conditions: data.conditions,
            },
            create: {
                basicPolicyId: policy.id,
                conditions: data.conditions,
            }
        });

        return { success: true, settings: settings };
    } catch (error) {
        console.error("updateOverseasShippingSettings error:", error);
        return { success: false, error: "설정 저장에 실패했습니다." };
    }
}

// --- Product Basic Settings Actions ---

export async function getProductBasicSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { productBasicSettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    productBasicSettings: {
                        create: {
                            modDateRange: {
                                productEdit: true,
                                productList: true,
                                productBatch: true,
                                productExcel: true,
                                productApprove: true
                            }
                        }
                    },
                    vatSettings: { create: {} }
                },
                include: { productBasicSettings: true },
            });
        }

        if (!policy.productBasicSettings) {
             const newSettings = await prisma.productBasicSettings.create({
                 data: { 
                     basicPolicyId: policy.id,
                     modDateRange: { 
                         productEdit: true, 
                         productList: true, 
                         productBatch: true, 
                         productExcel: true, 
                         productApprove: true 
                     }
                 }
             });
             // Manually attach to policy to return
             policy.productBasicSettings = newSettings;
        }
        
        // Initialize JSON if empty
        const currentSettings = policy.productBasicSettings;
        if (currentSettings && (!currentSettings.modDateRange || Object.keys(currentSettings.modDateRange as object).length === 0)) {
            const defaultRange = { 
                 productEdit: true, 
                 productList: true, 
                 productBatch: true, 
                 productExcel: true, 
                 productApprove: true 
            };
            await prisma.productBasicSettings.update({
                where: { id: currentSettings.id },
                data: { modDateRange: defaultRange }
            });
            currentSettings.modDateRange = defaultRange;
        }

        // Initialize new fields if they are defaults or missing (optional but good for consistency)
        return { success: true, settings: policy.productBasicSettings };

    } catch (error) {
        console.error("getProductBasicSettings error:", error);
        return { success: false, error: "상품 기본 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateProductBasicSettingsAction(data: {
    modDateRange?: Prisma.InputJsonValue;
    modDatePopup?: string;
    imageLoadingEnhance?: string;
    priceExposure?: string;
    optionPriceExposure?: string;
    subBrandProductDisplay?: string;
    parentCategoryAutoRegister?: string;
    navCategoryUsage?: string;
    navBrandUsage?: string;
    countCategoryUsage?: string;
    countBrandUsage?: string;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책을 찾을 수 없습니다." };

        await prisma.productBasicSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                modDateRange: data.modDateRange,
                modDatePopup: data.modDatePopup,
                imageLoadingEnhance: data.imageLoadingEnhance,
                priceExposure: data.priceExposure,
                optionPriceExposure: data.optionPriceExposure,
                subBrandProductDisplay: data.subBrandProductDisplay,
                parentCategoryAutoRegister: data.parentCategoryAutoRegister,
                navCategoryUsage: data.navCategoryUsage,
                navBrandUsage: data.navBrandUsage,
                countCategoryUsage: data.countCategoryUsage,
                countBrandUsage: data.countBrandUsage
            },
            create: {
                basicPolicyId: policy.id,
                modDateRange: data.modDateRange || {},
                modDatePopup: data.modDatePopup || "unused",
                imageLoadingEnhance: data.imageLoadingEnhance || "unused",
                priceExposure: data.priceExposure || "exposed",
                optionPriceExposure: data.optionPriceExposure || "exposed",
                subBrandProductDisplay: data.subBrandProductDisplay || "unsold",
                parentCategoryAutoRegister: data.parentCategoryAutoRegister || "unused",
                navCategoryUsage: data.navCategoryUsage || "used",
                navBrandUsage: data.navBrandUsage || "used",
                countCategoryUsage: data.countCategoryUsage || "used",
                countBrandUsage: data.countBrandUsage || "used"
            }
        });


        revalidatePath("/admin/products/classification-settings");
        return { success: true };
    } catch (error) {
        console.error("updateProductBasicSettingsAction error:", error);
        return { success: false, error: "저장 중 오류가 발생했습니다." };
    }
}

export async function getProductDetailExposureSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { productDetailExposureSettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    vatSettings: { create: {} }
                },
                include: { productDetailExposureSettings: true },
            });
        }

        if (!policy.productDetailExposureSettings) {
             const defaultSettings = {
                basicPolicyId: policy.id,
                isMobileSame: true,
                pcExposureItems: ["짧은설명", "정가", "판매가", "할인적용가", "구매제한", "구매혜택", "쿠폰받기", "배송비"],
                mobileExposureItems: ["짧은설명", "정가", "판매가", "할인적용가", "구매제한", "구매혜택", "쿠폰받기", "배송비"],
                discountSettings: { productDiscount: true, couponDiscount: false },
                additionalSettings: { optionStock: true, icon: false, representativeColor: true, discountRate: false },
                strikeSettings: { consumerPrice: true, salePrice: false },
            };
            const settings = await prisma.productDetailExposureSettings.create({
                data: defaultSettings,
            });
            return { success: true, data: settings };
        }

        return { success: true, data: policy.productDetailExposureSettings };
    } catch (error) {
        console.error("getProductDetailExposureSettingsAction error:", error);
        return { success: false, error: "데이터를 가져오는데 실패했습니다." };
    }
}

export async function updateProductDetailExposureSettingsAction(data: {
    isMobileSame: boolean;
    pcExposureItems: Prisma.InputJsonValue;
    mobileExposureItems: Prisma.InputJsonValue;
    discountSettings: Prisma.InputJsonValue;
    additionalSettings: Prisma.InputJsonValue;
    strikeSettings: Prisma.InputJsonValue;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) throw new Error("Basic policy not found");

        await prisma.productDetailExposureSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                isMobileSame: data.isMobileSame,
                pcExposureItems: data.pcExposureItems,
                mobileExposureItems: data.mobileExposureItems,
                discountSettings: data.discountSettings,
                additionalSettings: data.additionalSettings,
                strikeSettings: data.strikeSettings,
            },
            create: {
                basicPolicyId: policy.id,
                isMobileSame: data.isMobileSame,
                pcExposureItems: data.pcExposureItems,
                mobileExposureItems: data.mobileExposureItems,
                discountSettings: data.discountSettings,
                additionalSettings: data.additionalSettings,
                strikeSettings: data.strikeSettings,
            }
        });

        revalidatePath("/admin/products/detail-exposure");
        return { success: true };
    } catch (error) {
        console.error("updateProductDetailExposureSettingsAction error:", error);
        return { success: false, error: "저장에 실패했습니다." };
    }
}

// --- Product Image Size Settings Actions ---
export async function getProductImageSizeSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { productImageSizeSettings: true }
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    vatSettings: { create: {} }
                },
                include: { productImageSizeSettings: true }
            });
        }

        if (!policy.productImageSizeSettings) {
             const defaultSettings = {
                basicPolicyId: policy.id,
                resizeMethod: "ratio",
                basicImages: {
                    zoom: { width: 600 },
                    detail: { width: 600 },
                    thumb: { width: 150 }
                },
                listImages: [
                    { id: "img1", name: "리스트 이미지(기본)", width: 180, type: "default" }
                ]
            };
            const settings = await prisma.productImageSizeSettings.create({
                data: defaultSettings
            });
            return { success: true, settings: settings };
        }

        return { success: true, settings: policy.productImageSizeSettings };
    } catch (error) {
        console.error("getProductImageSizeSettingsAction error:", error);
        return { success: false, error: "이미지 설정을 가져오는데 실패했습니다." };
    }
}

export async function updateProductImageSizeSettingsAction(data: {
    resizeMethod: string;
    basicImages: Prisma.InputJsonValue;
    listImages: Prisma.InputJsonValue;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) throw new Error("Policy not found");

        await prisma.productImageSizeSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                resizeMethod: data.resizeMethod,
                basicImages: data.basicImages,
                listImages: data.listImages
            },
            create: {
                basicPolicyId: policy.id,
                resizeMethod: data.resizeMethod,
                basicImages: data.basicImages,
                listImages: data.listImages
            }
        });
        return { success: true };
    } catch (error) {
        console.error("updateProductImageSizeSettingsAction error:", error);
        return { success: false, error: "저장 실패" };
    }
}

// --- Product Usage Guide Settings Actions ---
export async function getProductUsageGuideSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { productUsageGuideSettings: true }
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    vatSettings: { create: {} }
                },
                include: { productUsageGuideSettings: true }
            });
        }

        if (!policy.productUsageGuideSettings) {
            const settings = await prisma.productUsageGuideSettings.create({
                data: {
                    basicPolicyId: policy.id,
                    guides: []
                }
            });
            return { success: true, settings: settings };
        }

        return { success: true, settings: policy.productUsageGuideSettings };
    } catch (error) {
        console.error("getProductUsageGuideSettingsAction error:", error);
        return { success: false, error: "이용안내 설정을 가져오는데 실패했습니다." };
    }
}

export async function updateProductUsageGuideSettingsAction(data: {
    guides: Prisma.InputJsonValue;
}) {
    try {
      const policy = await prisma.basicPolicy.findFirst();
      if (!policy) return { success: false, error: "Basic Policy not found" };

      const settings = await prisma.productUsageGuideSettings.upsert({
        where: { basicPolicyId: policy.id },
        update: {
          guides: data.guides
        },
        create: {
          basicPolicyId: policy.id,
          guides: data.guides
        }
      });
      return { success: true, settings };
    } catch (e) {
      console.error(e);
      return { success: false, error: "Update failed" };
    }
}

// --- Recent Products Settings Actions ---
export async function getRecentProductsSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { recentProductsSettings: true }
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    vatSettings: { create: {} }
                },
                include: { recentProductsSettings: true }
            });
        }

        if (!policy.recentProductsSettings) {
            const settings = await prisma.recentProductsSettings.create({
                data: {
                    basicPolicyId: policy.id,
                    expirationHours: 24,
                    maxCount: 10
                }
            });
            return { success: true, settings: settings };
        }

        return { success: true, settings: policy.recentProductsSettings };
    } catch (error) {
        console.error("getRecentProductsSettingsAction error:", error);
        return { success: false, error: "최근 본 상품 설정을 가져오는데 실패했습니다." };
    }
}

export async function updateRecentProductsSettingsAction(data: {
    expirationHours: number;
    maxCount: number;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "Basic Policy not found" };

        const settings = await prisma.recentProductsSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                expirationHours: data.expirationHours,
                maxCount: data.maxCount
            },
            create: {
                basicPolicyId: policy.id,
                expirationHours: data.expirationHours,
                maxCount: data.maxCount
            }
        });
        return { success: true, settings };
    } catch (error) {
        console.error("updateRecentProductsSettingsAction error:", error);
        return { success: false, error: "저장 실패" };
    }
}

// --- Order Status Settings Actions ---

export async function getOrderStatusSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { orderStatusSettings: true }
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    vatSettings: { create: {} },
                },
                include: { orderStatusSettings: true }
            });
        }

        if (!policy.orderStatusSettings) {
            const settings = await prisma.orderStatusSettings.create({
                data: {
                    basicPolicyId: policy.id,
                    autoCancelDays: 3,
                    benefitSettings: {
                        point: "payment",
                        coupon: "download",
                        stock: "order"
                    }
                }
            });
            return { success: true, settings: settings };
        }

        return { success: true, settings: policy.orderStatusSettings };
    } catch (error) {
        console.error("getOrderStatusSettingsAction error:", error);
        return { success: false, error: "주문 상태 설정을 가져오는데 실패했습니다." };
    }
}

export async function updateOrderStatusSettingsAction(data: {
    autoCancelDays: number;
    statusSettings: Prisma.InputJsonValue;
    benefitSettings: Prisma.InputJsonValue;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "Basic Policy not found" };

        const settings = await prisma.orderStatusSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                autoCancelDays: data.autoCancelDays,
                statusSettings: data.statusSettings,
                benefitSettings: data.benefitSettings
            },
            create: {
                basicPolicyId: policy.id,
                autoCancelDays: data.autoCancelDays,
                statusSettings: data.statusSettings,
                benefitSettings: data.benefitSettings
            }
        });
        return { success: true, settings };
    } catch (error) {
        console.error("updateOrderStatusSettingsAction error:", error);
        return { success: false, error: "저장 실패" };
    }
}

// --- Order Print Settings Actions ---

export async function getOrderPrintSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { orderPrintSettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    orderPrintSettings: {
                        create: {} // Create with defaults
                    },
                    vatSettings: { create: {} }
                },
                include: { orderPrintSettings: true },
            });
        }

        if (!policy.orderPrintSettings) {
             const newSettings = await prisma.orderPrintSettings.create({
                 data: { 
                     basicPolicyId: policy.id 
                 }
             });
             return { success: true, settings: newSettings };
        }

        return { success: true, settings: policy.orderPrintSettings };

    } catch (error) {
        console.error("getOrderPrintSettings error:", error);
        return { success: false, error: "주문서 인쇄 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateOrderPrintSettingsAction(data: {
    applyMallTrans: boolean;
    qtyTotalUsed: boolean;
    prodCodeTrans: boolean;
    ownCodeTrans: boolean;
    includeShippingFee: boolean;
    includeDiscount: boolean;
    includeMileage: boolean;
    includeDeposit: boolean;
    bizMemberUsed: boolean;
    footerInfoTransUsed: boolean;

    applyMallOrder: boolean;
    prodCodeOrder: boolean;
    ownCodeOrder: boolean;
    supplierDisplay: string;
    imgDisplay: string;
    payDisplay: string;
    memoDisplay: string;

    footerInfoOrderUsed: boolean;
    footerInfoOrderText: string;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책을 찾을 수 없습니다." };

        const settings = await prisma.orderPrintSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                applyMallTrans: data.applyMallTrans,
                qtyTotalUsed: data.qtyTotalUsed,
                prodCodeTrans: data.prodCodeTrans,
                ownCodeTrans: data.ownCodeTrans,
                includeShippingFee: data.includeShippingFee,
                includeDiscount: data.includeDiscount,
                includeMileage: data.includeMileage,
                includeDeposit: data.includeDeposit,
                bizMemberUsed: data.bizMemberUsed,
                footerInfoTransUsed: data.footerInfoTransUsed,

                applyMallOrder: data.applyMallOrder,
                prodCodeOrder: data.prodCodeOrder,
                ownCodeOrder: data.ownCodeOrder,
                supplierDisplay: data.supplierDisplay,
                imgDisplay: data.imgDisplay,
                payDisplay: data.payDisplay,
                memoDisplay: data.memoDisplay,
                footerInfoOrderUsed: data.footerInfoOrderUsed,
                footerInfoOrderText: data.footerInfoOrderText
            },
            create: {
                basicPolicyId: policy.id,
                applyMallTrans: data.applyMallTrans,
                qtyTotalUsed: data.qtyTotalUsed,
                prodCodeTrans: data.prodCodeTrans,
                ownCodeTrans: data.ownCodeTrans,
                includeShippingFee: data.includeShippingFee,
                includeDiscount: data.includeDiscount,
                includeMileage: data.includeMileage,
                includeDeposit: data.includeDeposit,
                bizMemberUsed: data.bizMemberUsed,
                footerInfoTransUsed: data.footerInfoTransUsed,

                applyMallOrder: data.applyMallOrder,
                prodCodeOrder: data.prodCodeOrder,
                ownCodeOrder: data.ownCodeOrder,
                supplierDisplay: data.supplierDisplay,
                imgDisplay: data.imgDisplay,
                payDisplay: data.payDisplay,
                memoDisplay: data.memoDisplay,
                footerInfoOrderUsed: data.footerInfoOrderUsed,
                footerInfoOrderText: data.footerInfoOrderText
            }
        });

        return { success: true, settings };
    } catch (error) {
        console.error("updateOrderPrintSettings error:", error);
        return { success: false, error: "설정 저장에 실패했습니다." };
    }
}

// --- Cart/Wishlist Settings Actions ---

export async function getCartWishlistSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { cartWishlistSettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    cartWishlistSettings: {
                        create: {} // Create with defaults
                    },
                    vatSettings: { create: {} }
                },
                include: { cartWishlistSettings: true },
            });
        }

        if (!policy.cartWishlistSettings) {
             const newSettings = await prisma.cartWishlistSettings.create({
                 data: { 
                     basicPolicyId: policy.id 
                 }
             });
             return { success: true, settings: newSettings };
        }

        return { success: true, settings: policy.cartWishlistSettings };

    } catch (error) {
        console.error("getCartWishlistSettings error:", error);
        return { success: false, error: "장바구니/관심상품 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateCartWishlistSettingsAction(data: {
    cartStoragePeriodType: string;
    cartStorageDays: number;
    cartItemLimitType: string;
    cartItemLimitCount: number;
    cartSameProduct: string;
    cartZeroPrice: string;
    cartSoldOut: string;
    cartMovePageType: string;
    cartMovePageTarget: string;
    cartDirectBuy: string;

    wishItemLimitType: string;
    wishItemLimitCount: number;
    wishMoveToCart: string;
    wishSoldOut: string;
    wishMovePageType: string;
    wishMovePageTarget: string;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책을 찾을 수 없습니다." };

        const settings = await prisma.cartWishlistSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                cartStoragePeriodType: data.cartStoragePeriodType,
                cartStorageDays: data.cartStorageDays,
                cartItemLimitType: data.cartItemLimitType,
                cartItemLimitCount: data.cartItemLimitCount,
                cartSameProduct: data.cartSameProduct,
                cartZeroPrice: data.cartZeroPrice,
                cartSoldOut: data.cartSoldOut,
                cartMovePageType: data.cartMovePageType,
                cartMovePageTarget: data.cartMovePageTarget,
                cartDirectBuy: data.cartDirectBuy,

                wishItemLimitType: data.wishItemLimitType,
                wishItemLimitCount: data.wishItemLimitCount,
                wishMoveToCart: data.wishMoveToCart,
                wishSoldOut: data.wishSoldOut,
                wishMovePageType: data.wishMovePageType,
                wishMovePageTarget: data.wishMovePageTarget,
            },
            create: {
                basicPolicyId: policy.id,
                cartStoragePeriodType: data.cartStoragePeriodType,
                cartStorageDays: data.cartStorageDays,
                cartItemLimitType: data.cartItemLimitType,
                cartItemLimitCount: data.cartItemLimitCount,
                cartSameProduct: data.cartSameProduct,
                cartZeroPrice: data.cartZeroPrice,
                cartSoldOut: data.cartSoldOut,
                cartMovePageType: data.cartMovePageType,
                cartMovePageTarget: data.cartMovePageTarget,
                cartDirectBuy: data.cartDirectBuy,

                wishItemLimitType: data.wishItemLimitType,
                wishItemLimitCount: data.wishItemLimitCount,
                wishMoveToCart: data.wishMoveToCart,
                wishSoldOut: data.wishSoldOut,
                wishMovePageType: data.wishMovePageType,
                wishMovePageTarget: data.wishMovePageTarget,
            }
        });

        return { success: true, settings };
    } catch (error) {
        console.error("updateCartWishlistSettings error:", error);
        return { success: false, error: "설정 저장에 실패했습니다." };
    }
}


// --- Google Login Settings Actions ---

export async function getGoogleLoginSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { googleLoginSettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    vatSettings: { create: {} }
                },
                include: { googleLoginSettings: true },
            });
        }

        if (!policy.googleLoginSettings) {
             const newSettings = await prisma.googleLoginSettings.create({
                 data: { 
                     basicPolicyId: policy.id 
                 }
             });
             return { success: true, settings: newSettings };
        }

        return { success: true, settings: policy.googleLoginSettings };

    } catch (error) {
        console.error("getGoogleLoginSettingsAction error:", error);
        return { success: false, error: "구글 로그인 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateGoogleLoginSettingsAction(data: {
    usage: string;
    clientId: string;
    clientSecret: string;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책을 찾을 수 없습니다." };

        const settings = await prisma.googleLoginSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                usage: data.usage,
                clientId: data.clientId,
                clientSecret: data.clientSecret,
            },
            create: {
                basicPolicyId: policy.id,
                usage: data.usage,
                clientId: data.clientId,
                clientSecret: data.clientSecret,
            }
        });

        return { success: true, settings };
    } catch (error) {
        console.error("updateGoogleLoginSettingsAction error:", error);
        return { success: false, error: "설정 저장에 실패했습니다." };
    }
}

// --- Mobile Auth Settings Actions ---

export async function getMobileAuthSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { mobileAuthSettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    vatSettings: { create: {} }
                },
                include: { mobileAuthSettings: true },
            });
        }

        if (!policy.mobileAuthSettings) {
             const newSettings = await prisma.mobileAuthSettings.create({
                 data: { 
                     basicPolicyId: policy.id 
                 }
             });
             return { success: true, settings: newSettings };
        }

        return { success: true, settings: policy.mobileAuthSettings };

    } catch (error) {
        console.error("getMobileAuthSettingsAction error:", error);
        return { success: false, error: "휴대폰 인증 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateMobileAuthSettingsAction(data: {
    provider: string;
    usage: string;
    partnerCode?: string;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책을 찾을 수 없습니다." };

        const settings = await prisma.mobileAuthSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                provider: data.provider,
                usage: data.usage,
                partnerCode: data.partnerCode,
            },
            create: {
                basicPolicyId: policy.id,
                provider: data.provider,
                usage: data.usage,
                partnerCode: data.partnerCode,
            }
        });

        return { success: true, settings };
    } catch (error) {
        console.error("updateMobileAuthSettingsAction error:", error);
        return { success: false, error: "설정 저장에 실패했습니다." };
    }
}

// --- Order Basic Settings Actions ---

export async function getOrderBasicSettingsAction() {
    try {
        let policy = await prisma.basicPolicy.findFirst({
            include: { orderBasicSettings: true },
        });

        if (!policy) {
            policy = await prisma.basicPolicy.create({
                data: {
                    vatSettings: { create: {} }
                },
                include: { orderBasicSettings: true },
            });
        }

        if (!policy.orderBasicSettings) {
            const defaultClaimSettings = {
                cancel: { stockRestore: "restore", couponRestore: "norestore", giftProvide: "provide" },
                exchange: { couponRestore: "norestore", giftProvide: "provide", mileageProvide: "provide", couponMileageProvide: "provide" },
                refund: { stockRestore: "norestore", couponRestore: "norestore" }
            };

             const newSettings = await prisma.orderBasicSettings.create({
                 data: { 
                     basicPolicyId: policy.id,
                     claimSettings: defaultClaimSettings
                 }
             });
             return { success: true, settings: newSettings };
        }

        // Initialize claimSettings if empty (though Prisma usually handles this via defaults if set, but claimSettings is Json type without default in schema? No, it has no default in schema I saw)
        // Schema: claimSettings Json
        // So we should verify it has content.
        
        return { success: true, settings: policy.orderBasicSettings };

    } catch (error) {
        console.error("getOrderBasicSettingsAction error:", error);
        return { success: false, error: "주문 기본 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateOrderBasicSettingsAction(data: {
    confirmCheck: string;
    autoDeliveryComplete: string;
    autoDeliveryCompleteDays: number;
    autoPurchaseConfirmation: string;
    autoPurchaseConfirmationDays: number;
    refundReconfirm: string;
    customerClaimRequest: string;
    claimSettings: Prisma.InputJsonValue;
}) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책을 찾을 수 없습니다." };

        const settings = await prisma.orderBasicSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: {
                confirmCheck: data.confirmCheck,
                autoDeliveryComplete: data.autoDeliveryComplete,
                autoDeliveryCompleteDays: data.autoDeliveryCompleteDays,
                autoPurchaseConfirmation: data.autoPurchaseConfirmation,
                autoPurchaseConfirmationDays: data.autoPurchaseConfirmationDays,
                refundReconfirm: data.refundReconfirm,
                customerClaimRequest: data.customerClaimRequest,
                claimSettings: data.claimSettings,
            },
            create: {
                basicPolicyId: policy.id,
                confirmCheck: data.confirmCheck,
                autoDeliveryComplete: data.autoDeliveryComplete,
                autoDeliveryCompleteDays: data.autoDeliveryCompleteDays,
                autoPurchaseConfirmation: data.autoPurchaseConfirmation,
                autoPurchaseConfirmationDays: data.autoPurchaseConfirmationDays,
                refundReconfirm: data.refundReconfirm,
                customerClaimRequest: data.customerClaimRequest,
                claimSettings: data.claimSettings,
            }
        });

        return { success: true, settings };
    } catch (error) {
        console.error("updateOrderBasicSettingsAction error:", error);
        return { success: false, error: "설정 저장에 실패했습니다." };
    }
}
