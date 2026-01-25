"use server";

import prisma from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma";

// --- Security Settings Actions ---

export async function getSecuritySettingsAction() {
    try {
        let policy = await prisma.managementPolicy.findFirst({
            include: { securitySettings: true },
        });

        if (!policy) {
            policy = await prisma.managementPolicy.create({
                data: {
                    securitySettings: {
                        create: {} // Create with defaults
                    }
                },
                include: { securitySettings: true },
            });
        }

        if (!policy.securitySettings) {
             const newSecurity = await prisma.securitySettings.create({
                 data: { managementPolicyId: policy.id }
             });
             return { success: true, settings: newSecurity };
        }

        return { success: true, settings: policy.securitySettings };

    } catch (error) {
        console.error("getSecuritySettings error:", error);
        return { success: false, error: "보안 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateSecuritySettingsAction(data: {
    authEmailEnabled: boolean;
    securityLogin: string;
    screenSecurity: string;
    adminAutoLogoutType: string;
    adminAutoLogoutTime?: number;
    longTermUnusedPeriod: string;
    longTermUnusedNotice: string;
    adminIpRestriction: string;
    shopIpRestriction: string;
    allowedCountries?: Prisma.InputJsonValue; // Json
    blockedCountries?: Prisma.InputJsonValue; // Json
    adminIpExceptions?: Prisma.InputJsonValue; // Json
    dragBlock: string;
    rightClickBlock: string;
    adminUnblock: string;
}) {
    try {
        const policy = await prisma.managementPolicy.findFirst();
        if (!policy) return { success: false, error: "관리 정책을 찾을 수 없습니다." };

        const securitySettings = await prisma.securitySettings.upsert({
            where: { managementPolicyId: policy.id },
            update: {
                authEmailEnabled: data.authEmailEnabled,
                securityLogin: data.securityLogin,
                screenSecurity: data.screenSecurity,
                adminAutoLogoutType: data.adminAutoLogoutType,
                adminAutoLogoutTime: data.adminAutoLogoutTime,
                longTermUnusedPeriod: data.longTermUnusedPeriod,
                longTermUnusedNotice: data.longTermUnusedNotice,
                adminIpRestriction: data.adminIpRestriction,
                shopIpRestriction: data.shopIpRestriction,
                allowedCountries: data.allowedCountries,
                blockedCountries: data.blockedCountries,
                adminIpExceptions: data.adminIpExceptions,
                dragBlock: data.dragBlock,
                rightClickBlock: data.rightClickBlock,
                adminUnblock: data.adminUnblock,
            },
            create: {
                managementPolicyId: policy.id,
                authEmailEnabled: data.authEmailEnabled,
                securityLogin: data.securityLogin,
                screenSecurity: data.screenSecurity,
                adminAutoLogoutType: data.adminAutoLogoutType,
                adminAutoLogoutTime: data.adminAutoLogoutTime,
                longTermUnusedPeriod: data.longTermUnusedPeriod,
                longTermUnusedNotice: data.longTermUnusedNotice,
                adminIpRestriction: data.adminIpRestriction,
                shopIpRestriction: data.shopIpRestriction,
                allowedCountries: data.allowedCountries,
                blockedCountries: data.blockedCountries,
                adminIpExceptions: data.adminIpExceptions,
                dragBlock: data.dragBlock,
                rightClickBlock: data.rightClickBlock,
                adminUnblock: data.adminUnblock,
            }
        });

        return { success: true, settings: securitySettings };
    } catch (error) {
        console.error("updateSecuritySettings error:", error);
        return { success: false, error: "설정 저장에 실패했습니다." };
    }
}


// --- Mall Usage Settings Actions ---

export async function getMallUsageSettingsAction() {
    try {
        let policy = await prisma.managementPolicy.findFirst({
            include: { mallUsageSettings: true },
        });

        if (!policy) {
            policy = await prisma.managementPolicy.create({
                data: {
                    mallUsageSettings: {
                        create: {}
                    },
                    securitySettings: {
                        create: {}
                    }
                },
                include: { mallUsageSettings: true },
            });
        }

        if (!policy.mallUsageSettings) {
             const newMallUsage = await prisma.mallUsageSettings.create({
                 data: { managementPolicyId: policy.id }
             });
             return { success: true, settings: newMallUsage };
        }

        return { success: true, settings: policy.mallUsageSettings };

    } catch (error) {
        console.error("getMallUsageSettings error:", error);
        return { success: false, error: "쇼핑몰 이용 설정을 불러오는데 실패했습니다." };
    }
}

export async function updateMallUsageSettingsAction(data: {
    mallStatus: string;
    mobileMall: string;
    guestPurchase: string;
    cartStoragePeriod: number;
    soldOutDisplay: string;
    memberAutoLogoutType: string;
    memberAutoLogoutTime?: number;
    pcIntro: boolean;
    mobileIntro: boolean;
    under14Restriction: string;
    mileageCouponDouble: string;
}) {
    try {
        const policy = await prisma.managementPolicy.findFirst();
        if (!policy) return { success: false, error: "관리 정책을 찾을 수 없습니다." };

        const mallUsageSettings = await prisma.mallUsageSettings.upsert({
            where: { managementPolicyId: policy.id },
            update: {
                mallStatus: data.mallStatus,
                mobileMall: data.mobileMall,
                guestPurchase: data.guestPurchase,
                cartStoragePeriod: data.cartStoragePeriod,
                soldOutDisplay: data.soldOutDisplay,
                memberAutoLogoutType: data.memberAutoLogoutType,
                memberAutoLogoutTime: data.memberAutoLogoutTime,
                pcIntro: data.pcIntro,
                mobileIntro: data.mobileIntro,
                under14Restriction: data.under14Restriction,
                mileageCouponDouble: data.mileageCouponDouble,
            },
            create: {
                managementPolicyId: policy.id,
                mallStatus: data.mallStatus,
                mobileMall: data.mobileMall,
                guestPurchase: data.guestPurchase,
                cartStoragePeriod: data.cartStoragePeriod,
                soldOutDisplay: data.soldOutDisplay,
                memberAutoLogoutType: data.memberAutoLogoutType,
                memberAutoLogoutTime: data.memberAutoLogoutTime,
                pcIntro: data.pcIntro,
                mobileIntro: data.mobileIntro,
                under14Restriction: data.under14Restriction,
                mileageCouponDouble: data.mileageCouponDouble,
            }
        });

        return { success: true, settings: mallUsageSettings };
    } catch (error) {
        console.error("updateMallUsageSettings error:", error);
        return { success: false, error: "쇼핑몰 이용 설정 저장에 실패했습니다." };
    }
}
