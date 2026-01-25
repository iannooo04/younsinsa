-- AlterTable
ALTER TABLE "MallUsageSettings" ADD COLUMN     "mileageCouponDouble" TEXT NOT NULL DEFAULT 'allow',
ADD COLUMN     "mobileIntro" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pcIntro" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "under14Restriction" TEXT NOT NULL DEFAULT 'unused';

-- AlterTable
ALTER TABLE "MemberGradeSettings" ADD COLUMN     "gradeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "inputPeriod" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "BasicInfoSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "shopName" TEXT NOT NULL DEFAULT '엔큐버스',
    "shopNameEng" TEXT NOT NULL DEFAULT 'nKubus',
    "topTitle" TEXT NOT NULL DEFAULT 'nKubus',
    "faviconPath" TEXT NOT NULL DEFAULT '',
    "domain" TEXT NOT NULL DEFAULT 'sosexy7654.godomall.com',
    "repCategory" TEXT NOT NULL DEFAULT '구매대행',
    "companyName" TEXT NOT NULL DEFAULT '니아인터내셔널',
    "bizLicenseNum" TEXT NOT NULL DEFAULT '291-81-0245',
    "ceoName" TEXT NOT NULL DEFAULT '윤지현',
    "bizCondition" TEXT NOT NULL DEFAULT '도소매',
    "bizItem" TEXT NOT NULL DEFAULT '전자상거래',
    "repEmail" TEXT NOT NULL DEFAULT 'sosexy76@naver.com',
    "zipCode" TEXT NOT NULL DEFAULT '06136',
    "address" TEXT NOT NULL DEFAULT '서울특별시 강남구 논현로102길 5(역삼동)',
    "addressDetail" TEXT NOT NULL DEFAULT '4층',
    "shipZipCode" TEXT NOT NULL DEFAULT '',
    "shipAddress" TEXT NOT NULL DEFAULT '',
    "shipAddrDetail" TEXT NOT NULL DEFAULT '',
    "returnZipCode" TEXT NOT NULL DEFAULT '',
    "returnAddress" TEXT NOT NULL DEFAULT '',
    "returnAddrDetail" TEXT NOT NULL DEFAULT '',
    "repPhone" TEXT NOT NULL DEFAULT '01071296105',
    "fax" TEXT NOT NULL DEFAULT '',
    "onlineSalesLicense" TEXT NOT NULL DEFAULT '2022-서울 강남-0',
    "sealImagePath" TEXT NOT NULL DEFAULT '',
    "cashReceiptLogoType" TEXT NOT NULL DEFAULT 'none',
    "csPhone" TEXT NOT NULL DEFAULT '',
    "csEmail" TEXT NOT NULL DEFAULT 'sosexy76@naver.com',
    "operatingHours" TEXT NOT NULL,
    "companyIntro" TEXT NOT NULL,

    CONSTRAINT "BasicInfoSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalShopSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "settings" JSONB NOT NULL,

    CONSTRAINT "GlobalShopSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderAdditionalInfoSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "usageSettings" JSONB NOT NULL,
    "items" JSONB NOT NULL,

    CONSTRAINT "OrderAdditionalInfoSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BasicInfoSettings_basicPolicyId_key" ON "BasicInfoSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "GlobalShopSettings_basicPolicyId_key" ON "GlobalShopSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderAdditionalInfoSettings_basicPolicyId_key" ON "OrderAdditionalInfoSettings"("basicPolicyId");

-- AddForeignKey
ALTER TABLE "BasicInfoSettings" ADD CONSTRAINT "BasicInfoSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalShopSettings" ADD CONSTRAINT "GlobalShopSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAdditionalInfoSettings" ADD CONSTRAINT "OrderAdditionalInfoSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
