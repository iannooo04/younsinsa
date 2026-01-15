/*
  Warnings:

  - The primary key for the `Supplier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contactEmail` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `contactName` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone` on the `Supplier` table. All the data in the column will be lost.
  - The `status` column on the `Supplier` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SupplierStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'WITHDRAWN');

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_supplierId_fkey";

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "supplierId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "supplierId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_pkey",
DROP COLUMN "contactEmail",
DROP COLUMN "contactName",
DROP COLUMN "contactPhone",
ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "addressDetail" TEXT,
ADD COLUMN     "bankName" TEXT,
ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "businessNo" TEXT,
ADD COLUMN     "ceoName" TEXT,
ADD COLUMN     "commissionRate" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
ADD COLUMN     "contractEndDate" TIMESTAMP(3),
ADD COLUMN     "contractStartDate" TIMESTAMP(3),
ADD COLUMN     "depositorName" TEXT,
ADD COLUMN     "detailSector" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fax" TEXT,
ADD COLUMN     "memo" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "sector" TEXT,
ADD COLUMN     "shippingFee" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "subBusinessNo" TEXT,
ADD COLUMN     "zipCode" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "SupplierStatus" NOT NULL DEFAULT 'ACTIVE',
ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Supplier_id_seq";

-- DropTable
DROP TABLE "Manager";

-- DropEnum
DROP TYPE "ManagerType";

-- CreateIndex
CREATE INDEX "Supplier_name_idx" ON "Supplier"("name");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
