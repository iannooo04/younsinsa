-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext";

-- CreateEnum
CREATE TYPE "BoardType" AS ENUM ('BASIC', 'GALLERY', 'EVENT', 'INQUIRY');

-- CreateEnum
CREATE TYPE "BoardAccess" AS ENUM ('ALL', 'MEMBER', 'ADMIN', 'GRADE');

-- CreateEnum
CREATE TYPE "AuthorDisplay" AS ENUM ('NAME', 'NICKNAME', 'ID');

-- CreateEnum
CREATE TYPE "ManagerType" AS ENUM ('HEADQUARTERS', 'SUPPLIER');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('DEPOSIT_WAIT', 'PAYMENT_COMPLETE', 'PREPARING', 'SHIPPING', 'DELIVERED', 'PURCHASE_CONFIRM', 'CANCEL_REQUEST', 'CANCEL_COMPLETE', 'RETURN_REQUEST', 'RETURN_COMPLETE', 'EXCHANGE_REQUEST', 'EXCHANGE_COMPLETE', 'REFUND_REQUEST', 'REFUND_COMPLETE');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('BANK_TRANSFER', 'CREDIT_CARD', 'VIRTUAL_ACCOUNT', 'ESCROW', 'PAYPAL', 'ALIPAY');

-- CreateEnum
CREATE TYPE "ReceiptType" AS ENUM ('NONE', 'CASH_RECEIPT', 'TAX_INVOICE');

-- CreateEnum
CREATE TYPE "ClaimType" AS ENUM ('CANCEL', 'RETURN', 'EXCHANGE');

-- CreateEnum
CREATE TYPE "InputFieldType" AS ENUM ('TEXT', 'TEXTAREA', 'RADIO', 'CHECKBOX', 'SELECT', 'DATE', 'FILE');

-- CreateEnum
CREATE TYPE "CurrencyCode" AS ENUM ('KRW', 'USD', 'CNY', 'JPY', 'EUR');

-- CreateEnum
CREATE TYPE "ExchangeRateType" AS ENUM ('AUTO', 'MANUAL');

-- CreateEnum
CREATE TYPE "ProductGender" AS ENUM ('MEN', 'WOMEN', 'UNISEX');

-- CreateEnum
CREATE TYPE "DisplayStatus" AS ENUM ('DISPLAY', 'HIDDEN');

-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('ON_SALE', 'STOP_SALE');

-- CreateEnum
CREATE TYPE "TaxType" AS ENUM ('TAX', 'DUTY_FREE', 'SMALL_TAX');

-- CreateEnum
CREATE TYPE "StockConfigType" AS ENUM ('LIMITLESS', 'LIMITED');

-- CreateEnum
CREATE TYPE "ClassifyType" AS ENUM ('GENERAL', 'GROUP');

-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('ALL', 'MEMBER', 'SPECIFIC');

-- CreateEnum
CREATE TYPE "ProductImageType" AS ENUM ('MAIN', 'DETAIL', 'THUMBNAIL', 'LIST', 'LIST_GROUP', 'SIMPLE', 'ADDITIONAL');

-- CreateEnum
CREATE TYPE "MallType" AS ENUM ('PC', 'MOBILE');

-- CreateEnum
CREATE TYPE "DisplayType" AS ENUM ('AUTO', 'MANUAL');

-- CreateEnum
CREATE TYPE "GuideType" AS ENUM ('DELIVERY', 'REFUND', 'EXCHANGE');

-- CreateEnum
CREATE TYPE "EdgeType" AS ENUM ('SPONSOR', 'BINARY');

-- CreateEnum
CREATE TYPE "ShippingFeeType" AS ENUM ('FREE', 'FIXED', 'PRICE', 'QUANTITY', 'WEIGHT');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('PREPAID', 'CASH_ON_DELIVERY', 'BOTH');

-- CreateEnum
CREATE TYPE "MemberType" AS ENUM ('PERSONAL', 'BUSINESS', 'FOREIGNER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NONE');

-- CreateEnum
CREATE TYPE "DateType" AS ENUM ('SOLAR', 'LUNAR');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED');

-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('KAKAO', 'NAVER', 'GOOGLE', 'FACEBOOK', 'APPLE');

-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('MOBILE', 'IPIN');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('KCP', 'DREAM_SECURITY', 'NICE', 'SCI');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "BasicPolicy" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BasicPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VatSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "productVatRate" DECIMAL(65,30) NOT NULL DEFAULT 10.0,
    "shippingVatRate" DECIMAL(65,30) NOT NULL DEFAULT 10.0,
    "customProductRates" JSONB,
    "customShippingRates" JSONB,

    CONSTRAINT "VatSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuideSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "usageGuide" JSONB NOT NULL,
    "withdrawalGuide" JSONB NOT NULL,

    CONSTRAINT "GuideSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencySettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "baseCountry" TEXT NOT NULL DEFAULT 'kr',
    "currencyDisplay" TEXT NOT NULL DEFAULT 'won',
    "weightUnit" TEXT NOT NULL DEFAULT 'g',

    CONSTRAINT "CurrencySettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StorageSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "storagePaths" JSONB NOT NULL,
    "filePaths" JSONB NOT NULL,

    CONSTRAINT "StorageSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeoSettings" (
    "id" SERIAL NOT NULL,
    "basicPolicyId" INTEGER NOT NULL,
    "pcRobotTxt" TEXT,
    "mobileRobotTxt" TEXT,
    "majorPageTags" JSONB,
    "ogImage" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "sitemapPath" TEXT,
    "rssPath" TEXT,
    "pagePathType" TEXT NOT NULL DEFAULT 'error',
    "pagePathUrl" TEXT,
    "useCanonical" BOOLEAN NOT NULL DEFAULT false,
    "relatedChannels" JSONB,
    "otherPageTags" JSONB,

    CONSTRAINT "SeoSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Board" (
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

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardCategory" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "BoardCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
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

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
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

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "mallId" TEXT NOT NULL DEFAULT 'KR',
    "category" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "isBest" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BannedWord" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BannedWord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardSkin" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "designSkin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoardSkin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportAssignment" (
    "postId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupportAssignment_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Country" (
    "code" CHAR(2) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "ManagementPolicy" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManagementPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "ManagerType" NOT NULL DEFAULT 'HEADQUARTERS',
    "supplierId" INTEGER,
    "nickname" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "mobile" TEXT,
    "isEmployee" BOOLEAN NOT NULL DEFAULT true,
    "department" TEXT,
    "position" TEXT,
    "jobTitle" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "loginFailCount" INTEGER NOT NULL DEFAULT 0,
    "lastLoginAt" TIMESTAMP(3),
    "lastPasswordChangeAt" TIMESTAMP(3),
    "permissions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "contactName" TEXT,
    "contactPhone" TEXT,
    "contactEmail" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecuritySettings" (
    "id" SERIAL NOT NULL,
    "managementPolicyId" INTEGER NOT NULL,
    "authEmailEnabled" BOOLEAN NOT NULL DEFAULT false,
    "authSmsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "securityLogin" TEXT NOT NULL DEFAULT 'unused',
    "screenSecurity" TEXT NOT NULL DEFAULT 'unused',
    "adminAutoLogoutType" TEXT NOT NULL DEFAULT 'default',
    "adminAutoLogoutTime" INTEGER DEFAULT 120,
    "longTermUnusedPeriod" TEXT NOT NULL DEFAULT '1year',
    "longTermUnusedNotice" TEXT NOT NULL DEFAULT 'unused',
    "adminIpRestriction" TEXT NOT NULL DEFAULT 'unused',
    "shopIpRestriction" TEXT NOT NULL DEFAULT 'unused',
    "allowedCountries" JSONB,
    "blockedCountries" JSONB,
    "adminIpExceptions" JSONB,
    "dragBlock" TEXT NOT NULL DEFAULT 'unused',
    "rightClickBlock" TEXT NOT NULL DEFAULT 'unused',
    "adminUnblock" TEXT NOT NULL DEFAULT 'unused',

    CONSTRAINT "SecuritySettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MallUsageSettings" (
    "id" SERIAL NOT NULL,
    "managementPolicyId" INTEGER NOT NULL,
    "memberAutoLogoutType" TEXT NOT NULL DEFAULT 'default',
    "memberAutoLogoutTime" INTEGER DEFAULT 60,

    CONSTRAINT "MallUsageSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNo" TEXT NOT NULL,
    "mallId" TEXT NOT NULL DEFAULT 'KR',
    "userId" TEXT,
    "isMember" BOOLEAN NOT NULL DEFAULT true,
    "ordererName" TEXT NOT NULL,
    "ordererEmail" TEXT,
    "ordererPhone" TEXT,
    "ordererMobile" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "recipientPhone" TEXT,
    "recipientMobile" TEXT NOT NULL,
    "recipientZipcode" TEXT,
    "recipientAddress" TEXT,
    "recipientAddressDetail" TEXT,
    "shippingMessage" TEXT,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'BANK_TRANSFER',
    "depositorName" TEXT,
    "bankAccount" TEXT,
    "receiptType" "ReceiptType" NOT NULL DEFAULT 'NONE',
    "receiptIdentity" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'KRW',
    "totalItemPrice" INTEGER NOT NULL DEFAULT 0,
    "shippingFee" INTEGER NOT NULL DEFAULT 0,
    "discountAmount" INTEGER NOT NULL DEFAULT 0,
    "useMileage" INTEGER NOT NULL DEFAULT 0,
    "totalPayAmount" INTEGER NOT NULL DEFAULT 0,
    "accumulatedMileage" INTEGER NOT NULL DEFAULT 0,
    "status" "OrderStatus" NOT NULL DEFAULT 'DEPOSIT_WAIT',
    "statusUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminMemo" TEXT,
    "memoType" TEXT,
    "paidAt" TIMESTAMP(3),
    "shippedAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT,
    "variantId" TEXT,
    "productName" TEXT NOT NULL,
    "optionName" TEXT,
    "sku" TEXT,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "totalPrice" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'DEPOSIT_WAIT',
    "deliveryCompany" TEXT,
    "trackingNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderClaim" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "type" "ClaimType" NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "reasonType" TEXT NOT NULL,
    "reasonDetail" TEXT,
    "collectionMethod" TEXT,
    "collectionCompany" TEXT,
    "collectionTrackingNumber" TEXT,
    "reshipmentCompany" TEXT,
    "reshipmentTrackingNumber" TEXT,
    "refundBank" TEXT,
    "refundAccount" TEXT,
    "refundHolder" TEXT,
    "refundAmount" INTEGER,
    "exchangeCost" INTEGER,
    "targetItemIds" TEXT[],
    "images" TEXT[],
    "adminMemo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderClaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderBasicSettings" (
    "id" SERIAL NOT NULL,
    "confirmPayerUse" TEXT NOT NULL DEFAULT 'used',
    "autoDeliveryCompleteUse" TEXT NOT NULL DEFAULT 'unused',
    "autoDeliveryCompleteDays" INTEGER DEFAULT 7,
    "autoPurchaseConfirmUse" TEXT NOT NULL DEFAULT 'unused',
    "autoPurchaseConfirmDays" INTEGER DEFAULT 7,
    "refundCheckUse" TEXT NOT NULL DEFAULT 'unused',
    "customerClaimUse" TEXT NOT NULL DEFAULT 'unused',
    "cancelStockRestore" TEXT NOT NULL DEFAULT 'restore',
    "cancelCouponRestore" TEXT NOT NULL DEFAULT 'norestore',
    "cancelGiftProvide" TEXT NOT NULL DEFAULT 'provide',
    "exchangeCouponRestore" TEXT NOT NULL DEFAULT 'norestore',
    "exchangeGiftProvide" TEXT NOT NULL DEFAULT 'provide',
    "exchangeMileageProvide" TEXT NOT NULL DEFAULT 'provide',
    "exchangeCouponMileageProvide" TEXT NOT NULL DEFAULT 'provide',
    "refundStockRestore" TEXT NOT NULL DEFAULT 'norestore',
    "refundCouponRestore" TEXT NOT NULL DEFAULT 'norestore',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderBasicSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderAdditionalInfoConfig" (
    "id" SERIAL NOT NULL,
    "useAdditionalInfo" TEXT NOT NULL DEFAULT 'unused',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderAdditionalInfoConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderAdditionalInfoItem" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "locale" TEXT NOT NULL DEFAULT 'kr',
    "isExposed" BOOLEAN NOT NULL DEFAULT true,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "displayType" "InputFieldType" NOT NULL DEFAULT 'TEXT',
    "detailConfig" JSONB,
    "productCondition" JSONB,
    "exceptionCondition" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderAdditionalInfoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExchangeRateSetting" (
    "id" SERIAL NOT NULL,
    "currency" "CurrencyCode" NOT NULL,
    "type" "ExchangeRateType" NOT NULL DEFAULT 'AUTO',
    "baseRate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "adjustment" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "finalRate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExchangeRateSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExchangeRateHistory" (
    "id" SERIAL NOT NULL,
    "actionType" TEXT NOT NULL,
    "currency" "CurrencyCode",
    "description" TEXT NOT NULL,
    "adminId" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExchangeRateHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverseasShippingCondition" (
    "id" SERIAL NOT NULL,
    "mallType" TEXT NOT NULL,
    "shippingStandard" TEXT NOT NULL DEFAULT 'EMS_STANDARD',
    "useInsurance" BOOLEAN NOT NULL DEFAULT false,
    "boxWeight" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OverseasShippingCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverseasShippingGroup" (
    "id" SERIAL NOT NULL,
    "conditionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "countries" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OverseasShippingGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameCN" TEXT,
    "nameEN" TEXT,
    "slug" TEXT,
    "category" TEXT,
    "description" TEXT,
    "type" "ClassifyType" NOT NULL DEFAULT 'GENERAL',
    "isExposedKR" BOOLEAN NOT NULL DEFAULT true,
    "isExposedCN" BOOLEAN NOT NULL DEFAULT false,
    "displayStatusPC" "DisplayStatus" NOT NULL DEFAULT 'DISPLAY',
    "displayStatusMobile" "DisplayStatus" NOT NULL DEFAULT 'DISPLAY',
    "logoUrl" TEXT,
    "pcImageUrl" TEXT,
    "pcMouseoverImageUrl" TEXT,
    "mobileImageUrl" TEXT,
    "isAdultAuth" BOOLEAN NOT NULL DEFAULT false,
    "accessType" "AccessType" NOT NULL DEFAULT 'ALL',
    "accessGrades" TEXT[],
    "productDisplayType" TEXT NOT NULL DEFAULT 'AUTO',
    "pcTheme" TEXT,
    "mobileTheme" TEXT,
    "htmlContents" JSONB,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameCN" TEXT,
    "nameEN" TEXT,
    "code" TEXT,
    "slug" TEXT,
    "type" "ClassifyType" NOT NULL DEFAULT 'GENERAL',
    "isExposedKR" BOOLEAN NOT NULL DEFAULT true,
    "isExposedCN" BOOLEAN NOT NULL DEFAULT false,
    "displayStatusPC" "DisplayStatus" NOT NULL DEFAULT 'DISPLAY',
    "displayStatusMobile" "DisplayStatus" NOT NULL DEFAULT 'DISPLAY',
    "imageUrl" TEXT,
    "pcImageUrl" TEXT,
    "pcMouseoverImageUrl" TEXT,
    "mobileImageUrl" TEXT,
    "isAdultAuth" BOOLEAN NOT NULL DEFAULT false,
    "accessType" "AccessType" NOT NULL DEFAULT 'ALL',
    "accessGrades" TEXT[],
    "productDisplayType" TEXT NOT NULL DEFAULT 'AUTO',
    "pcTheme" TEXT,
    "mobileTheme" TEXT,
    "htmlContents" JSONB,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "customCode" TEXT,
    "name" TEXT NOT NULL,
    "extendedName" TEXT,
    "isExtendedName" BOOLEAN NOT NULL DEFAULT false,
    "keywords" TEXT[],
    "condition" TEXT NOT NULL DEFAULT 'NEW',
    "representativeColor" TEXT,
    "supplierId" INTEGER,
    "commissionRate" DECIMAL(65,30) DEFAULT 0.00,
    "brandId" TEXT,
    "categoryId" TEXT NOT NULL,
    "extraCategories" JSONB,
    "displayStatusPC" "DisplayStatus" NOT NULL DEFAULT 'DISPLAY',
    "saleStatusPC" "SaleStatus" NOT NULL DEFAULT 'ON_SALE',
    "displayStatusMobile" "DisplayStatus" NOT NULL DEFAULT 'DISPLAY',
    "saleStatusMobile" "SaleStatus" NOT NULL DEFAULT 'ON_SALE',
    "mainDisplayPC" JSONB,
    "mainDisplayMobile" JSONB,
    "includeInPopular" BOOLEAN NOT NULL DEFAULT true,
    "price" INTEGER NOT NULL,
    "consumerPrice" INTEGER NOT NULL DEFAULT 0,
    "supplyPrice" INTEGER NOT NULL DEFAULT 0,
    "purchasePrice" INTEGER NOT NULL DEFAULT 0,
    "priceSubstituteText" TEXT,
    "stockType" "StockConfigType" NOT NULL DEFAULT 'LIMITLESS',
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "soldOutStatus" TEXT NOT NULL DEFAULT 'NORMAL',
    "minPurchaseQty" INTEGER DEFAULT 1,
    "maxPurchaseQty" INTEGER,
    "salesPeriodType" TEXT NOT NULL DEFAULT 'UNLIMITED',
    "salesStartDate" TIMESTAMP(3),
    "salesEndDate" TIMESTAMP(3),
    "restockNotification" BOOLEAN NOT NULL DEFAULT false,
    "shippingFee" INTEGER NOT NULL DEFAULT 0,
    "shippingMethod" TEXT,
    "taxType" "TaxType" NOT NULL DEFAULT 'TAX',
    "taxRate" INTEGER NOT NULL DEFAULT 10,
    "weight" DECIMAL(65,30),
    "volume" DECIMAL(65,30),
    "cultureDeduction" BOOLEAN NOT NULL DEFAULT false,
    "shortDescription" TEXT,
    "eventText" TEXT,
    "descriptionPC" TEXT,
    "descriptionMobile" TEXT,
    "isDescriptionSame" BOOLEAN NOT NULL DEFAULT true,
    "optionUsage" BOOLEAN NOT NULL DEFAULT false,
    "textOptionUsage" BOOLEAN NOT NULL DEFAULT false,
    "addOnUsage" BOOLEAN NOT NULL DEFAULT false,
    "mileageConfigType" TEXT NOT NULL DEFAULT 'INTEGRATED',
    "mileageRate" DECIMAL(65,30),
    "discountConfigType" TEXT NOT NULL DEFAULT 'Use',
    "accessAuth" TEXT NOT NULL DEFAULT 'ALL',
    "essentialInfo" JSONB,
    "nameCN" TEXT,
    "nameEN" TEXT,
    "nameJP" TEXT,
    "manufacturer" TEXT,
    "origin" TEXT,
    "modelNo" TEXT,
    "makeDate" TIMESTAMP(3),
    "launchDate" TIMESTAMP(3),
    "effectiveStartDate" TIMESTAMP(3),
    "effectiveEndDate" TIMESTAMP(3),
    "purchasePermission" TEXT NOT NULL DEFAULT 'ALL',
    "purchasePermissionGrades" TEXT[],
    "purchasePriceSubstituteText" TEXT,
    "isAdultOnly" BOOLEAN NOT NULL DEFAULT false,
    "isAdultOnlyDisplay" BOOLEAN NOT NULL DEFAULT false,
    "isAdultOnlyImage" BOOLEAN NOT NULL DEFAULT false,
    "paymentConfigType" TEXT NOT NULL DEFAULT 'INTEGRATED',
    "allowedPaymentMethods" TEXT[],
    "kcMarkUsed" BOOLEAN NOT NULL DEFAULT false,
    "kcCertifications" JSONB,
    "iconPeriodStart" TIMESTAMP(3),
    "iconPeriodEnd" TIMESTAMP(3),
    "iconPeriodCodes" TEXT[],
    "iconUnlimitedCodes" TEXT[],
    "discountPrice" INTEGER,
    "discountUnit" TEXT,
    "bundleOrderBasis" TEXT NOT NULL DEFAULT 'OPTION',
    "bundleOrderUnit" INTEGER NOT NULL DEFAULT 1,
    "seoTitle" TEXT,
    "seoAuthor" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT[],
    "daumExpose" BOOLEAN NOT NULL DEFAULT true,
    "naverExpose" BOOLEAN NOT NULL DEFAULT true,
    "googleShoppingExpose" BOOLEAN NOT NULL DEFAULT false,
    "externalVideoUrl" TEXT,
    "externalVideoWidth" INTEGER,
    "externalVideoHeight" INTEGER,
    "hsCode" JSONB,
    "adminMemo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductNaverSettings" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "importFlag" TEXT,
    "productFlag" TEXT,
    "monthlyRentalFee" INTEGER,
    "totalRentalFee" INTEGER,
    "rentalPeriod" INTEGER,
    "ageGroup" TEXT,
    "gender" TEXT,
    "tags" TEXT,
    "attribute" TEXT,
    "naverCategoryId" TEXT,
    "priceComparisonId" TEXT,
    "npayAble" TEXT,
    "npayAcumAble" TEXT,
    "brandCertification" BOOLEAN NOT NULL DEFAULT false,
    "bookExpose" BOOLEAN NOT NULL DEFAULT false,
    "isbn" TEXT,
    "bookType" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductNaverSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "ProductImageType" NOT NULL DEFAULT 'MAIN',
    "isOriginal" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOption" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOptionValue" (
    "id" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductOptionValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sku" TEXT,
    "price" INTEGER,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "optionValueIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionTemplate" (
    "id" TEXT NOT NULL,
    "manageName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'integrated',
    "supplierId" INTEGER,
    "supplierName" TEXT,
    "options" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OptionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductReview" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "comment" TEXT,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainPageDisplayGroup" (
    "id" SERIAL NOT NULL,
    "mallType" "MallType" NOT NULL DEFAULT 'PC',
    "name" TEXT NOT NULL,
    "description" TEXT,
    "themeName" TEXT,
    "isExposed" BOOLEAN NOT NULL DEFAULT true,
    "replaceCode" TEXT,
    "displayType" "DisplayType" NOT NULL DEFAULT 'MANUAL',
    "productIds" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MainPageDisplayGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryDisplaySettings" (
    "id" SERIAL NOT NULL,
    "categoryId" TEXT NOT NULL,
    "displayMethod" TEXT NOT NULL DEFAULT 'NORMAL',
    "pcTheme" TEXT,
    "mobileTheme" TEXT,
    "defaultSortType" TEXT NOT NULL DEFAULT 'REG_DATE_DESC',
    "pinnedProductIds" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryDisplaySettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductBasicSettings" (
    "id" SERIAL NOT NULL,
    "updateScopeEdit" BOOLEAN NOT NULL DEFAULT true,
    "updateScopeList" BOOLEAN NOT NULL DEFAULT true,
    "updateScopeBatch" BOOLEAN NOT NULL DEFAULT true,
    "updateScopeExcel" BOOLEAN NOT NULL DEFAULT true,
    "updateScopeApprove" BOOLEAN NOT NULL DEFAULT true,
    "updatePopup" TEXT NOT NULL DEFAULT 'unused',
    "imageLoadingImprove" TEXT NOT NULL DEFAULT 'unused',
    "priceSubstituteExposed" TEXT NOT NULL DEFAULT 'exposed',
    "optionPriceExposed" TEXT NOT NULL DEFAULT 'exposed',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductBasicSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImageSizeSettings" (
    "id" SERIAL NOT NULL,
    "resizeMethod" TEXT NOT NULL DEFAULT 'ratio',
    "basicImageSizes" JSONB,
    "listImageSizes" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductImageSizeSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductUsageGuide" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "type" "GuideType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "supplierId" INTEGER,
    "supplierName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductUsageGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecentProductSettings" (
    "id" SERIAL NOT NULL,
    "durationHours" INTEGER NOT NULL DEFAULT 24,
    "maxQuantity" INTEGER NOT NULL DEFAULT 10,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecentProductSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralEdge" (
    "id" TEXT NOT NULL,
    "type" "EdgeType" NOT NULL,
    "parentId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "position" INTEGER,
    "groupNo" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferralEdge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingPolicy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ShippingFeeType" NOT NULL DEFAULT 'FIXED',
    "defaultFee" INTEGER NOT NULL DEFAULT 0,
    "freePriceThreshold" INTEGER,
    "qtyThreshold" INTEGER,
    "weightThreshold" DECIMAL(65,30),
    "paymentType" "PaymentType" NOT NULL DEFAULT 'PREPAID',
    "useRegionFee" BOOLEAN NOT NULL DEFAULT false,
    "regionFee2Step" INTEGER,
    "regionFee3Step" INTEGER,
    "returnFee" INTEGER NOT NULL DEFAULT 3000,
    "exchangeFee" INTEGER NOT NULL DEFAULT 6000,
    "courierName" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGrade" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "minPurchaseAmount" INTEGER NOT NULL DEFAULT 0,
    "discountRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "mileageRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" CITEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "email" CITEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "mobile" TEXT NOT NULL,
    "phone" TEXT,
    "fax" TEXT,
    "image" TEXT,
    "countryCode" CHAR(2),
    "mallId" TEXT NOT NULL DEFAULT 'KR',
    "recommenderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "MemberType" NOT NULL DEFAULT 'PERSONAL',
    "gradeId" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT true,
    "zipcode" TEXT,
    "address" TEXT,
    "addressDetail" TEXT,
    "emailConsent" BOOLEAN NOT NULL DEFAULT false,
    "emailConsentDate" TIMESTAMP(3),
    "smsConsent" BOOLEAN NOT NULL DEFAULT false,
    "smsConsentDate" TIMESTAMP(3),
    "job" TEXT,
    "interests" TEXT[],
    "gender" "Gender" NOT NULL DEFAULT 'NONE',
    "birthday" TIMESTAMP(3),
    "birthdayType" "DateType" NOT NULL DEFAULT 'SOLAR',
    "maritalStatus" "MaritalStatus" NOT NULL DEFAULT 'SINGLE',
    "anniversary" TIMESTAMP(3),
    "retentionPeriod" TEXT NOT NULL DEFAULT 'UNLIMITED',
    "userMemo" TEXT,
    "adminMemo" TEXT,
    "mileage" INTEGER NOT NULL DEFAULT 0,
    "deposit" INTEGER NOT NULL DEFAULT 0,
    "loginCount" INTEGER NOT NULL DEFAULT 0,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimpleLogin" (
    "id" TEXT NOT NULL,
    "userInfoId" TEXT NOT NULL,
    "provider" "ProviderType" NOT NULL,
    "providerId" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "connectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SimpleLogin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthService" (
    "id" TEXT NOT NULL,
    "userInfoId" TEXT NOT NULL,
    "type" "AuthType" NOT NULL,
    "provider" "AuthProvider" NOT NULL,
    "name" TEXT,
    "birthdate" TEXT,
    "gender" TEXT,
    "mobile" TEXT,
    "ci" TEXT,
    "di" TEXT,
    "verifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBusinessInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "ceoName" TEXT NOT NULL,
    "businessNumber" TEXT NOT NULL,
    "category" TEXT,
    "item" TEXT,
    "companyZipcode" TEXT,
    "companyAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserBusinessInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPoint" (
    "id" TEXT NOT NULL,
    "userInfoId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "adminMemo" TEXT,
    "relatedOrderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDeposit" (
    "id" TEXT NOT NULL,
    "userInfoId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "relatedOrderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDeposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWallet" (
    "id" TEXT NOT NULL,
    "userInfoId" TEXT NOT NULL,
    "depositAddress" TEXT,
    "withdrawAddress" TEXT,
    "depositPrivCipher" TEXT,
    "depositPrivIv" TEXT,
    "depositPrivTag" TEXT,
    "depositKeyAlg" TEXT DEFAULT 'aes-256-gcm',
    "depositKeyVersion" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "VatSettings_basicPolicyId_key" ON "VatSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "GuideSettings_basicPolicyId_key" ON "GuideSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "CurrencySettings_basicPolicyId_key" ON "CurrencySettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "StorageSettings_basicPolicyId_key" ON "StorageSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "SeoSettings_basicPolicyId_key" ON "SeoSettings"("basicPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "Board_boardId_key" ON "Board"("boardId");

-- CreateIndex
CREATE INDEX "Post_boardId_idx" ON "Post"("boardId");

-- CreateIndex
CREATE INDEX "Post_authorId_idx" ON "Post"("authorId");

-- CreateIndex
CREATE INDEX "Attachment_postId_idx" ON "Attachment"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "BannedWord_word_key" ON "BannedWord"("word");

-- CreateIndex
CREATE UNIQUE INDEX "BoardSkin_code_key" ON "BoardSkin"("code");

-- CreateIndex
CREATE INDEX "SupportAssignment_assigneeId_idx" ON "SupportAssignment"("assigneeId");

-- CreateIndex
CREATE UNIQUE INDEX "Manager_username_key" ON "Manager"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_code_key" ON "Supplier"("code");

-- CreateIndex
CREATE UNIQUE INDEX "SecuritySettings_managementPolicyId_key" ON "SecuritySettings"("managementPolicyId");

-- CreateIndex
CREATE UNIQUE INDEX "MallUsageSettings_managementPolicyId_key" ON "MallUsageSettings"("managementPolicyId");

-- CreateIndex
CREATE INDEX "CartItem_userId_idx" ON "CartItem"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNo_key" ON "Order"("orderNo");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- CreateIndex
CREATE INDEX "Order_orderNo_idx" ON "Order"("orderNo");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE INDEX "OrderAdditionalInfoItem_locale_idx" ON "OrderAdditionalInfoItem"("locale");

-- CreateIndex
CREATE INDEX "OrderAdditionalInfoItem_order_idx" ON "OrderAdditionalInfoItem"("order");

-- CreateIndex
CREATE UNIQUE INDEX "ExchangeRateSetting_currency_key" ON "ExchangeRateSetting"("currency");

-- CreateIndex
CREATE UNIQUE INDEX "OverseasShippingCondition_mallType_key" ON "OverseasShippingCondition"("mallType");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_slug_key" ON "Brand"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_code_key" ON "Category"("code");

-- CreateIndex
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_code_key" ON "Product"("code");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_code_idx" ON "Product"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ProductNaverSettings_productId_key" ON "ProductNaverSettings"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");

-- CreateIndex
CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "OptionTemplate_manageName_key" ON "OptionTemplate"("manageName");

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem_userId_productId_key" ON "WishlistItem"("userId", "productId");

-- CreateIndex
CREATE INDEX "ProductReview_productId_idx" ON "ProductReview"("productId");

-- CreateIndex
CREATE INDEX "ProductReview_userId_idx" ON "ProductReview"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryDisplaySettings_categoryId_key" ON "CategoryDisplaySettings"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductUsageGuide_code_key" ON "ProductUsageGuide"("code");

-- CreateIndex
CREATE INDEX "ReferralEdge_parentId_type_idx" ON "ReferralEdge"("parentId", "type");

-- CreateIndex
CREATE INDEX "ReferralEdge_childId_type_idx" ON "ReferralEdge"("childId", "type");

-- CreateIndex
CREATE INDEX "ReferralEdge_parentId_createdAt_idx" ON "ReferralEdge"("parentId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "uniq_direct_parent_per_tree" ON "ReferralEdge"("childId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_mallId_idx" ON "User"("mallId");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_mobile_idx" ON "User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_userId_key" ON "UserInfo"("userId");

-- CreateIndex
CREATE INDEX "SimpleLogin_userInfoId_idx" ON "SimpleLogin"("userInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "SimpleLogin_provider_providerId_key" ON "SimpleLogin"("provider", "providerId");

-- CreateIndex
CREATE INDEX "AuthService_userInfoId_idx" ON "AuthService"("userInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBusinessInfo_userId_key" ON "UserBusinessInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserWallet_userInfoId_key" ON "UserWallet"("userInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "UserWallet_depositAddress_key" ON "UserWallet"("depositAddress");

-- CreateIndex
CREATE UNIQUE INDEX "UserWallet_withdrawAddress_key" ON "UserWallet"("withdrawAddress");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VatSettings" ADD CONSTRAINT "VatSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideSettings" ADD CONSTRAINT "GuideSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrencySettings" ADD CONSTRAINT "CurrencySettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageSettings" ADD CONSTRAINT "StorageSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeoSettings" ADD CONSTRAINT "SeoSettings_basicPolicyId_fkey" FOREIGN KEY ("basicPolicyId") REFERENCES "BasicPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardCategory" ADD CONSTRAINT "BoardCategory_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BoardCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportAssignment" ADD CONSTRAINT "SupportAssignment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupportAssignment" ADD CONSTRAINT "SupportAssignment_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "UserInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manager" ADD CONSTRAINT "Manager_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecuritySettings" ADD CONSTRAINT "SecuritySettings_managementPolicyId_fkey" FOREIGN KEY ("managementPolicyId") REFERENCES "ManagementPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MallUsageSettings" ADD CONSTRAINT "MallUsageSettings_managementPolicyId_fkey" FOREIGN KEY ("managementPolicyId") REFERENCES "ManagementPolicy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderClaim" ADD CONSTRAINT "OrderClaim_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OverseasShippingGroup" ADD CONSTRAINT "OverseasShippingGroup_conditionId_fkey" FOREIGN KEY ("conditionId") REFERENCES "OverseasShippingCondition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductNaverSettings" ADD CONSTRAINT "ProductNaverSettings_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOption" ADD CONSTRAINT "ProductOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOptionValue" ADD CONSTRAINT "ProductOptionValue_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "ProductOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralEdge" ADD CONSTRAINT "ReferralEdge_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralEdge" ADD CONSTRAINT "ReferralEdge_childId_fkey" FOREIGN KEY ("childId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_recommenderId_fkey" FOREIGN KEY ("recommenderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "UserGrade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimpleLogin" ADD CONSTRAINT "SimpleLogin_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthService" ADD CONSTRAINT "AuthService_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBusinessInfo" ADD CONSTRAINT "UserBusinessInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPoint" ADD CONSTRAINT "UserPoint_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDeposit" ADD CONSTRAINT "UserDeposit_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWallet" ADD CONSTRAINT "UserWallet_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
