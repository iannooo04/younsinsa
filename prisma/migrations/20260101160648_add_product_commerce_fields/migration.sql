-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "asInfo" TEXT,
ADD COLUMN     "detailContent" TEXT,
ADD COLUMN     "manufacturer" TEXT,
ADD COLUMN     "material" TEXT,
ADD COLUMN     "origin" TEXT,
ADD COLUMN     "shippingDuration" TEXT,
ADD COLUMN     "shippingFee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "shippingMethod" TEXT,
ADD COLUMN     "supplyPrice" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "videoUrl" TEXT,
ADD COLUMN     "washCare" TEXT;
