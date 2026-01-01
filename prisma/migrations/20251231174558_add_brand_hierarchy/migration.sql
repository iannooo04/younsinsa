-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
