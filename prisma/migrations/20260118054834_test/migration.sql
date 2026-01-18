/*
  Warnings:

  - You are about to drop the column `autoDeliveryCompleteUse` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `autoPurchaseConfirmDays` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `autoPurchaseConfirmUse` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `cancelCouponRestore` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `cancelGiftProvide` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `cancelStockRestore` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `confirmPayerUse` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `customerClaimUse` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `exchangeCouponMileageProvide` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `exchangeCouponRestore` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `exchangeGiftProvide` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `exchangeMileageProvide` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `refundCheckUse` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `refundCouponRestore` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `refundStockRestore` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `OrderBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `imageLoadingImprove` on the `ProductBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `optionPriceExposed` on the `ProductBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `priceSubstituteExposed` on the `ProductBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `updatePopup` on the `ProductBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `updateScopeApprove` on the `ProductBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `updateScopeBatch` on the `ProductBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `updateScopeEdit` on the `ProductBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `updateScopeExcel` on the `ProductBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `updateScopeList` on the `ProductBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductBasicSettings` table. All the data in the column will be lost.
  - You are about to drop the column `basicImageSizes` on the `ProductImageSizeSettings` table. All the data in the column will be lost.
  - You are about to drop the column `listImageSizes` on the `ProductImageSizeSettings` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProductImageSizeSettings` table. All the data in the column will be lost.
  - You are about to drop the `Attachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BannedWord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BoardCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BoardSkin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Faq` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductUsageGuide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecentProductSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupportAssignment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[basicPolicyId]` on the table `OrderBasicSettings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[basicPolicyId]` on the table `ProductBasicSettings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[basicPolicyId]` on the table `ProductImageSizeSettings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `basicPolicyId` to the `OrderBasicSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `claimSettings` to the `OrderBasicSettings` table without a default value. This is not possible if the table is not empty.
  - Made the column `autoDeliveryCompleteDays` on table `OrderBasicSettings` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `basicPolicyId` to the `ProductBasicSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modDateRange` to the `ProductBasicSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basicImages` to the `ProductImageSizeSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basicPolicyId` to the `ProductImageSizeSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listImages` to the `ProductImageSizeSettings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_postId_fkey";

-- DropForeignKey
ALTER TABLE "BoardCategory" DROP CONSTRAINT "BoardCategory_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_productId_fkey";

-- DropForeignKey
ALTER TABLE "SupportAssignment" DROP CONSTRAINT "SupportAssignment_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "SupportAssignment" DROP CONSTRAINT "SupportAssignment_postId_fkey";

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "isRecApplyToChildren" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRecExposedMobile" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isRecExposedPC" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isSeoUsed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recMobileTheme" TEXT,
ADD COLUMN     "recPcTheme" TEXT,
ADD COLUMN     "recProductDisplayType" TEXT NOT NULL DEFAULT 'AUTO',
ADD COLUMN     "seoAuthor" TEXT,
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoKeywords" TEXT[],
ADD COLUMN     "seoTitle" TEXT;

-- AlterTable
ALTER TABLE "MallUsageSettings" ADD COLUMN     "cartStoragePeriod" INTEGER NOT NULL DEFAULT 7,
ADD COLUMN     "guestPurchase" TEXT NOT NULL DEFAULT 'allow',
ADD COLUMN     "mallStatus" TEXT NOT NULL DEFAULT 'open',
ADD COLUMN     "mobileMall" TEXT NOT NULL DEFAULT 'use',
ADD COLUMN     "soldOutDisplay" TEXT NOT NULL DEFAULT 'display';

-- AlterTable
ALTER TABLE "OrderBasicSettings" DROP COLUMN "autoDeliveryCompleteUse",
DROP COLUMN "autoPurchaseConfirmDays",
DROP COLUMN "autoPurchaseConfirmUse",
DROP COLUMN "cancelCouponRestore",
DROP COLUMN "cancelGiftProvide",
DROP COLUMN "cancelStockRestore",
DROP COLUMN "confirmPayerUse",
DROP COLUMN "customerClaimUse",
DROP COLUMN "exchangeCouponMileageProvide",
DROP COLUMN "exchangeCouponRestore",
DROP COLUMN "exchangeGiftProvide",
DROP COLUMN "exchangeMileageProvide",
DROP COLUMN "refundCheckUse",
DROP COLUMN "refundCouponRestore",
DROP COLUMN "refundStockRestore",
DROP COLUMN "updatedAt",
ADD COLUMN     "autoDeliveryComplete" TEXT NOT NULL DEFAULT 'unused',
ADD COLUMN     "autoPurchaseConfirmation" TEXT NOT NULL DEFAULT 'unused',
ADD COLUMN     "autoPurchaseConfirmationDays" INTEGER NOT NULL DEFAULT 7,
ADD COLUMN     "basicPolicyId" INTEGER NOT NULL,
ADD COLUMN     "claimSettings" JSONB NOT NULL,
ADD COLUMN     "confirmCheck" TEXT NOT NULL DEFAULT 'used',
ADD COLUMN     "customerClaimRequest" TEXT NOT NULL DEFAULT 'unused',
ADD COLUMN     "refundReconfirm" TEXT NOT NULL DEFAULT 'unused',
ALTER COLUMN "autoDeliveryCompleteDays" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "exchangeFee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gender" "ProductGender" NOT NULL DEFAULT 'UNISEX',
ADD COLUMN     "returnFee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shippingPolicyId" INTEGER;

-- AlterTable
ALTER TABLE "ProductBasicSettings" DROP COLUMN "imageLoadingImprove",
DROP COLUMN "optionPriceExposed",
DROP COLUMN "priceSubstituteExposed",
DROP COLUMN "updatePopup",
DROP COLUMN "updateScopeApprove",
DROP COLUMN "updateScopeBatch",
DROP COLUMN "updateScopeEdit",
DROP COLUMN "updateScopeExcel",
DROP COLUMN "updateScopeList",
DROP COLUMN "updatedAt",
ADD COLUMN     "basicPolicyId" INTEGER NOT NULL,
ADD COLUMN     "countBrandUsage" TEXT NOT NULL DEFAULT 'used',
ADD COLUMN     "countCategoryUsage" TEXT NOT NULL DEFAULT 'used',
ADD COLUMN     "imageLoadingEnhance" TEXT NOT NULL DEFAULT 'unused',
ADD COLUMN     "modDatePopup" TEXT NOT NULL DEFAULT 'unused',
ADD COLUMN     "modDateRange" JSONB NOT NULL,
ADD COLUMN     "navBrandUsage" TEXT NOT NULL DEFAULT 'used',
ADD COLUMN     "navCategoryUsage" TEXT NOT NULL DEFAULT 'used',
ADD COLUMN     "optionPriceExposure" TEXT NOT NULL DEFAULT 'exposed',
ADD COLUMN     "parentCategoryAutoRegister" TEXT NOT NULL DEFAULT 'unused',
ADD COLUMN     "priceExposure" TEXT NOT NULL DEFAULT 'exposed',
ADD COLUMN     "subBrandProductDisplay" TEXT NOT NULL DEFAULT 'unsold';

-- AlterTable
ALTER TABLE "ProductImageSizeSettings" DROP COLUMN "basicImageSizes",
DROP COLUMN "listImageSizes",
DROP COLUMN "updatedAt",
ADD COLUMN     "basicImages" JSONB NOT NULL,
ADD COLUMN     "basicPolicyId" INTEGER NOT NULL,
ADD COLUMN     "listImages" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "mobile" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserGrade" ADD COLUMN     "calcPeriod" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "calcPeriodStart" TEXT NOT NULL DEFAULT 'prev',
ADD COLUMN     "calcPeriodType" TEXT NOT NULL DEFAULT 'limit',
ADD COLUMN     "evalCycle" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "evalDay" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "minOrderCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minReviewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "orderIndex" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "canRejoin" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isWithdrawn" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "processor" TEXT,
ADD COLUMN     "withdrawalDate" TIMESTAMP(3),
ADD COLUMN     "withdrawalIp" TEXT,
ADD COLUMN     "withdrawalReason" TEXT,
ADD COLUMN     "withdrawalType" TEXT;

-- DropTable
DROP TABLE "Attachment";

-- DropTable
DROP TABLE "BannedWord";

-- DropTable
DROP TABLE "Board";

-- DropTable
DROP TABLE "BoardCategory";

-- DropTable
DROP TABLE "BoardSkin";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Faq";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "ProductUsageGuide";

-- DropTable
DROP TABLE "RecentProductSettings";

-- DropTable
DROP TABLE "SupportAssignment";

-- DropEnum
DROP TYPE "GuideType";

-- CreateTable
CREATE TABLE "MemberJoinItemSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "schema" JSONB NOT NULL,

    CONSTRAINT "MemberJoinItemSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartWishlistSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "cartStoragePeriodType" TEXT NOT NULL DEFAULT 'period',
    "cartStorageDays" INTEGER NOT NULL DEFAULT 7,
    "cartItemLimitType" TEXT NOT NULL DEFAULT 'limit',
    "cartItemLimitCount" INTEGER NOT NULL DEFAULT 20,
    "cartSameProduct" TEXT NOT NULL DEFAULT 'increase',
    "cartZeroPrice" TEXT NOT NULL DEFAULT 'allow',
    "cartSoldOut" TEXT NOT NULL DEFAULT 'keep',
    "cartMovePageType" TEXT NOT NULL DEFAULT 'direct',
    "cartMovePageTarget" TEXT NOT NULL DEFAULT 'pc',
    "cartDirectBuy" TEXT NOT NULL DEFAULT 'only-current',
    "wishItemLimitType" TEXT NOT NULL DEFAULT 'limit',
    "wishItemLimitCount" INTEGER NOT NULL DEFAULT 20,
    "wishMoveToCart" TEXT NOT NULL DEFAULT 'delete',
    "wishSoldOut" TEXT NOT NULL DEFAULT 'keep',
    "wishMovePageType" TEXT NOT NULL DEFAULT 'direct',
    "wishMovePageTarget" TEXT NOT NULL DEFAULT 'pc',

    CONSTRAINT "CartWishlistSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderPrintSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "applyMallTrans" BOOLEAN NOT NULL DEFAULT true,
    "qtyTotalUsed" BOOLEAN NOT NULL DEFAULT false,
    "prodCodeTrans" BOOLEAN NOT NULL DEFAULT false,
    "ownCodeTrans" BOOLEAN NOT NULL DEFAULT false,
    "includeShippingFee" BOOLEAN NOT NULL DEFAULT true,
    "includeDiscount" BOOLEAN NOT NULL DEFAULT true,
    "includeMileage" BOOLEAN NOT NULL DEFAULT false,
    "includeDeposit" BOOLEAN NOT NULL DEFAULT false,
    "bizMemberUsed" BOOLEAN NOT NULL DEFAULT false,
    "footerInfoTransUsed" BOOLEAN NOT NULL DEFAULT false,
    "applyMallOrder" BOOLEAN NOT NULL DEFAULT true,
    "prodCodeOrder" BOOLEAN NOT NULL DEFAULT false,
    "ownCodeOrder" BOOLEAN NOT NULL DEFAULT false,
    "supplierDisplay" TEXT NOT NULL DEFAULT 'display',
    "imgDisplay" TEXT NOT NULL DEFAULT 'display',
    "payDisplay" TEXT NOT NULL DEFAULT 'display',
    "memoDisplay" TEXT NOT NULL DEFAULT 'no-display',
    "footerInfoOrderUsed" BOOLEAN NOT NULL DEFAULT false,
    "footerInfoOrderText" TEXT,

    CONSTRAINT "OrderPrintSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderStatusSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "autoCancelDays" INTEGER NOT NULL DEFAULT 3,
    "statusSettings" JSONB,
    "benefitSettings" JSONB,

    CONSTRAINT "OrderStatusSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobileAuthSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'kcp',
    "usage" TEXT NOT NULL DEFAULT 'unused',
    "partnerCode" TEXT,

    CONSTRAINT "MobileAuthSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecentProductsSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "expirationHours" INTEGER NOT NULL DEFAULT 24,
    "maxCount" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "RecentProductsSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductUsageGuideSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "guides" JSONB NOT NULL,

    CONSTRAINT "ProductUsageGuideSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverseasShippingSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "conditions" JSONB NOT NULL,

    CONSTRAINT "OverseasShippingSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExchangeRateSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "rates" JSONB NOT NULL,

    CONSTRAINT "ExchangeRateSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoogleLoginSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "usage" TEXT NOT NULL DEFAULT 'unused',
    "clientId" TEXT NOT NULL DEFAULT '',
    "clientSecret" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "GoogleLoginSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductDetailExposureSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "isMobileSame" BOOLEAN NOT NULL DEFAULT true,
    "pcExposureItems" JSONB NOT NULL,
    "mobileExposureItems" JSONB NOT NULL,
    "discountSettings" JSONB NOT NULL,
    "additionalSettings" JSONB NOT NULL,
    "strikeSettings" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductDetailExposureSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberJoinPolicy" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "approvalMethod" TEXT NOT NULL DEFAULT 'none',
    "ageLimitMethod" TEXT NOT NULL DEFAULT 'none',
    "useAgeConsent" BOOLEAN NOT NULL DEFAULT false,
    "underageAge" INTEGER NOT NULL DEFAULT 14,
    "underageAction" TEXT NOT NULL DEFAULT 'approval',
    "simpleLoginAuthMethod" TEXT NOT NULL DEFAULT 'use',
    "rejoinLimitMethod" TEXT NOT NULL DEFAULT 'unused',
    "rejoinLimitDays" INTEGER NOT NULL DEFAULT 0,
    "fraudulentIds" TEXT NOT NULL DEFAULT 'admin,administration,administrator,master,webmaster,manage,manager,godo,godomall',

    CONSTRAINT "MemberJoinPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberGradeSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "gradeDisplayName" TEXT NOT NULL DEFAULT '등급',
    "couponEvalDone" BOOLEAN NOT NULL DEFAULT false,
    "couponGradeChangeOnly" BOOLEAN NOT NULL DEFAULT false,
    "couponManualEdit" BOOLEAN NOT NULL DEFAULT false,
    "couponExcelUpdate" BOOLEAN NOT NULL DEFAULT false,
    "couponExcelChangeOnly" BOOLEAN NOT NULL DEFAULT false,
    "evaluationMethod" TEXT NOT NULL DEFAULT 'auto',
    "downgradeUsage" TEXT NOT NULL DEFAULT 'use',
    "criteriaMethod" TEXT NOT NULL DEFAULT 'figures',
    "scoreSettings" JSONB,

    CONSTRAINT "MemberGradeSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "board" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "BoardType" NOT NULL DEFAULT 'BASIC',
    "usePcMall" BOOLEAN NOT NULL DEFAULT true,
    "useMobileMall" BOOLEAN NOT NULL DEFAULT true,
    "listAccess" "BoardAccess" NOT NULL DEFAULT 'ALL',
    "readAccess" "BoardAccess" NOT NULL DEFAULT 'ALL',
    "writeAccess" "BoardAccess" NOT NULL DEFAULT 'ALL',
    "replyAccess" "BoardAccess" NOT NULL DEFAULT 'ADMIN',
    "commentAccess" "BoardAccess" NOT NULL DEFAULT 'MEMBER',
    "minGradeId" TEXT,
    "useReply" BOOLEAN NOT NULL DEFAULT true,
    "useComment" BOOLEAN NOT NULL DEFAULT true,
    "useSecret" BOOLEAN NOT NULL DEFAULT false,
    "useProductLink" BOOLEAN NOT NULL DEFAULT false,
    "useOrderLink" BOOLEAN NOT NULL DEFAULT false,
    "useFile" BOOLEAN NOT NULL DEFAULT true,
    "maxFileSize" INTEGER NOT NULL DEFAULT 10,
    "authorDisplay" "AuthorDisplay" NOT NULL DEFAULT 'NICKNAME',
    "skinPcId" TEXT,
    "skinMobileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "seoTitle" TEXT,
    "seoAuthor" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "itemsPerPage" INTEGER NOT NULL DEFAULT 15,
    "subjectLimit" INTEGER NOT NULL DEFAULT 30,
    "showNotice" BOOLEAN NOT NULL DEFAULT true,
    "useEditor" BOOLEAN NOT NULL DEFAULT true,
    "headerHtml" TEXT,
    "footerHtml" TEXT,

    CONSTRAINT "board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "board_category" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "board_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "categoryId" TEXT,
    "authorId" TEXT,
    "authorName" TEXT,
    "password" TEXT,
    "ipAddress" TEXT,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isHtml" BOOLEAN NOT NULL DEFAULT true,
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "isNotice" BOOLEAN NOT NULL DEFAULT false,
    "productId" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "parentId" TEXT,
    "depth" INTEGER NOT NULL DEFAULT 0,
    "answerStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "authorId" TEXT,
    "authorName" TEXT,
    "password" TEXT,
    "ipAddress" TEXT,
    "content" TEXT NOT NULL,
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq" (
    "id" TEXT NOT NULL,
    "mallId" TEXT NOT NULL DEFAULT 'KR',
    "category" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "isBest" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banned_word" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "banned_word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "board_skin" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "designSkin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "board_skin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support_assignment" (
    "postId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "support_assignment_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "InvoiceUploadLog" (
    "id" TEXT NOT NULL,
    "registrant" TEXT,
    "supplierId" TEXT,
    "totalCount" INTEGER NOT NULL DEFAULT 0,
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "failCount" INTEGER NOT NULL DEFAULT 0,
    "failureDetails" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvoiceUploadLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderDeleteRequest" (
    "id" TEXT NOT NULL,
    "totalCount" INTEGER NOT NULL DEFAULT 0,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "targetOrderIds" TEXT[],

    CONSTRAINT "OrderDeleteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrandRecommendedProduct" (
    "brandId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BrandRecommendedProduct_pkey" PRIMARY KEY ("brandId","productId")
);

-- CreateTable
CREATE TABLE "ProductEssentialInfoTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "supplierId" TEXT,
    "items" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductEssentialInfoTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCommonInfo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "exposureType" TEXT NOT NULL DEFAULT 'ALL',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "displayStatus" "DisplayStatus" NOT NULL DEFAULT 'DISPLAY',
    "productCondition" JSONB,
    "exceptionCondition" JSONB,
    "contentPC" TEXT,
    "contentMobile" TEXT,
    "isSameContent" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductCommonInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchPageDisplaySettings" (
    "id" SERIAL NOT NULL,
    "sortBy" TEXT NOT NULL DEFAULT 'recent',
    "searchConditions" JSONB NOT NULL,
    "pcTheme" TEXT,
    "mobileTheme" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchPageDisplaySettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MemberJoinItemSettings_basicPolicyId_key" ON "MemberJoinItemSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "CartWishlistSettings_basicPolicyId_key" ON "CartWishlistSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderPrintSettings_basicPolicyId_key" ON "OrderPrintSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderStatusSettings_basicPolicyId_key" ON "OrderStatusSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "MobileAuthSettings_basicPolicyId_key" ON "MobileAuthSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "RecentProductsSettings_basicPolicyId_key" ON "RecentProductsSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductUsageGuideSettings_basicPolicyId_key" ON "ProductUsageGuideSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "OverseasShippingSettings_basicPolicyId_key" ON "OverseasShippingSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "ExchangeRateSettings_basicPolicyId_key" ON "ExchangeRateSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "GoogleLoginSettings_basicPolicyId_key" ON "GoogleLoginSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductDetailExposureSettings_basicPolicyId_key" ON "ProductDetailExposureSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberJoinPolicy_basicPolicyId_key" ON "MemberJoinPolicy"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberGradeSettings_basicPolicyId_key" ON "MemberGradeSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "board_boardId_key" ON "board"("boardId");

-- CreateIndex
CREATE INDEX "post_boardId_idx" ON "post"("boardId");

-- CreateIndex
CREATE INDEX "post_authorId_idx" ON "post"("authorId");

-- CreateIndex
CREATE INDEX "attachment_postId_idx" ON "attachment"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "banned_word_word_key" ON "banned_word"("word");

-- CreateIndex
CREATE UNIQUE INDEX "board_skin_code_key" ON "board_skin"("code");

-- CreateIndex
CREATE INDEX "support_assignment_assigneeId_idx" ON "support_assignment"("assigneeId");

-- CreateIndex
CREATE INDEX "ProductEssentialInfoTemplate_supplierId_idx" ON "ProductEssentialInfoTemplate"("supplierId");

-- CreateIndex
CREATE INDEX "Brand_parentId_idx" ON "Brand"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderBasicSettings_basicPolicyId_key" ON "OrderBasicSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductBasicSettings_basicPolicyId_key" ON "ProductBasicSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductImageSizeSettings_basicPolicyId_key" ON "ProductImageSizeSettings"("basicPolicyId");

-- AddForeignKey
ALTER TABLE "MemberJoinItemSettings" ADD CONSTRAINT "MemberJoinItemSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartWishlistSettings" ADD CONSTRAINT "CartWishlistSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPrintSettings" ADD CONSTRAINT "OrderPrintSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderBasicSettings" ADD CONSTRAINT "OrderBasicSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderStatusSettings" ADD CONSTRAINT "OrderStatusSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobileAuthSettings" ADD CONSTRAINT "MobileAuthSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentProductsSettings" ADD CONSTRAINT "RecentProductsSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductUsageGuideSettings" ADD CONSTRAINT "ProductUsageGuideSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBasicSettings" ADD CONSTRAINT "ProductBasicSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImageSizeSettings" ADD CONSTRAINT "ProductImageSizeSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OverseasShippingSettings" ADD CONSTRAINT "OverseasShippingSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExchangeRateSettings" ADD CONSTRAINT "ExchangeRateSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoogleLoginSettings" ADD CONSTRAINT "GoogleLoginSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetailExposureSettings" ADD CONSTRAINT "ProductDetailExposureSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberJoinPolicy" ADD CONSTRAINT "MemberJoinPolicy_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberGradeSettings" ADD CONSTRAINT "MemberGradeSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_category" ADD CONSTRAINT "board_category_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "board_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachment" ADD CONSTRAINT "attachment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_assignment" ADD CONSTRAINT "support_assignment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_assignment" ADD CONSTRAINT "support_assignment_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "UserInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandRecommendedProduct" ADD CONSTRAINT "BrandRecommendedProduct_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandRecommendedProduct" ADD CONSTRAINT "BrandRecommendedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shippingPolicyId_fkey" FOREIGN KEY ("shippingPolicyId") REFERENCES "ShippingPolicy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductEssentialInfoTemplate" ADD CONSTRAINT "ProductEssentialInfoTemplate_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryDisplaySettings" ADD CONSTRAINT "CategoryDisplaySettings_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
