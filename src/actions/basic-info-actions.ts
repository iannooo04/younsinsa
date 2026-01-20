"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type BasicInfoSettingsData = {
  shopName: string;
  shopNameEng: string;
  topTitle: string;
  faviconPath: string;
  domain: string;
  repCategory: string;
  companyName: string;
  bizLicenseNum: string;
  ceoName: string;
  bizCondition: string;
  bizItem: string;
  repEmail: string;
  zipCode: string;
  address: string;
  addressDetail: string;
  shipZipCode: string;
  shipAddress: string;
  shipAddrDetail: string;
  returnZipCode: string;
  returnAddress: string;
  returnAddrDetail: string;
  repPhone: string;
  fax: string;
  onlineSalesLicense: string;
  sealImagePath: string;
  cashReceiptLogoType: string;
  csPhone: string;
  csEmail: string;
  operatingHours: string;
  companyIntro: string;
};

export async function getBasicInfoSettingsAction() {
  try {
    const existingPolicy = await prisma.basicPolicy.findFirst({
        include: { basicInfoSettings: true }
    });

    let policy = existingPolicy;

    if (!policy) {
        policy = await prisma.basicPolicy.create({
            data: {
                basicInfoSettings: { 
                    create: {
                        operatingHours: "",
                        companyIntro: ""
                    } 
                },
                vatSettings: { create: {} }
            },
            include: { basicInfoSettings: true }
        }) as typeof existingPolicy;
    }

    if (!policy) {
        return { success: false, error: "기본 정책을 불러오는데 실패했습니다." };
    }

    if (!policy.basicInfoSettings) {
        const defaultSettings = {
            basicPolicyId: policy.id,
            shopName: "엔큐버스",
            shopNameEng: "nKubus",
            topTitle: "nKubus",
            domain: "sosexy7654.godomall.com",
            repCategory: "구매대행",
            companyName: "니아인터내셔널",
            bizLicenseNum: "291-81-0245",
            ceoName: "윤지현",
            bizCondition: "도소매",
            bizItem: "전자상거래",
            repEmail: "sosexy76@naver.com",
            zipCode: "06136",
            address: "서울특별시 강남구 논현로102길 5(역삼동)",
            addressDetail: "4층",
            repPhone: "01071296105",
            onlineSalesLicense: "2022-서울 강남-0",
            csEmail: "sosexy76@naver.com",
            operatingHours: "AM10:00\nPM07:00",
            companyIntro: `<p>인터넷 비즈니스는 이제 우리 삶에서 가장 중요한 연결 매개체로 자리 잡았습니다.</p>
<p>NHN커머스는 다년간 오직 한길, 전자상거래 솔루션만 전문적으로 개발/운영하여 왔습니다.</p>
<p><br></p>
<p>NHN커머스는 웹비즈니스의 구축보다 사후관리를 더욱 중요하게 생각합니다. 운영 과정에서 더 큰 도움이 되고자 노력합니다.</p>
<p><br></p>
<p>NHN커머스는 치열한 경쟁시대에서 앞서나갈 수 있도록 강력하게 도와드리는 가장 든든한 조력자가 될 것입니다.</p>
<p>말뿐이 아닌 지속적인 솔루션 개발과 고쿼리티 웹 사이트 맞춤 컨설팅으로 고객 제일주의를 실현하겠습니다.</p>
<p><br></p>
<p>고객을 위해 흘리는 땀을 두려워하지 않는 정직한 기업이 될 것을 약속드립니다.</p>
<p><br></p>
<p>NHN커머스의 문은 고객 여러분께 항상 열려있습니다.</p>
<p><br></p>
<p>한 분 한 분 고객님들과 같이 커가는 NHN커머스가 되겠습니다.</p>
<p><br></p>
<p>감사합니다.</p>`
        };
        const newSettings = await prisma.basicInfoSettings.create({
            data: defaultSettings
        });
        return { success: true, settings: newSettings };
    }

    return { success: true, settings: policy.basicInfoSettings };

  } catch (error) {
    console.error("getBasicInfoSettingsAction error:", error);
    return { success: false, error: "기본 정보를 불러오는데 실패했습니다." };
  }
}

export async function updateBasicInfoSettingsAction(data: BasicInfoSettingsData) {
    try {
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책을 찾을 수 없습니다." };

        const settings = await prisma.basicInfoSettings.upsert({
            where: { basicPolicyId: policy.id },
            update: { 
                shopName: data.shopName,
                shopNameEng: data.shopNameEng,
                topTitle: data.topTitle,
                faviconPath: data.faviconPath,
                domain: data.domain,
                repCategory: data.repCategory,
                companyName: data.companyName,
                bizLicenseNum: data.bizLicenseNum,
                ceoName: data.ceoName,
                bizCondition: data.bizCondition,
                bizItem: data.bizItem,
                repEmail: data.repEmail,
                zipCode: data.zipCode,
                address: data.address,
                addressDetail: data.addressDetail,
                shipZipCode: data.shipZipCode,
                shipAddress: data.shipAddress,
                shipAddrDetail: data.shipAddrDetail,
                returnZipCode: data.returnZipCode,
                returnAddress: data.returnAddress,
                returnAddrDetail: data.returnAddrDetail,
                repPhone: data.repPhone,
                fax: data.fax,
                onlineSalesLicense: data.onlineSalesLicense,
                sealImagePath: data.sealImagePath,
                cashReceiptLogoType: data.cashReceiptLogoType,
                csPhone: data.csPhone,
                csEmail: data.csEmail,
                operatingHours: data.operatingHours,
                companyIntro: data.companyIntro
            },
            create: {
                basicPolicyId: policy.id,
                ...data
            }
        });
        
        revalidatePath("/admin/settings");
        return { success: true, settings };
    } catch (error) {
        console.error("updateBasicInfoSettingsAction error:", error);
        return { success: false, error: "기본 정보 저장에 실패했습니다." };
    }
}
