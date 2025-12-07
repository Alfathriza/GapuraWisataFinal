-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "villageId" TEXT;

-- CreateIndex
CREATE INDEX "Dish_villageId_idx" ON "Dish"("villageId");

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE SET NULL ON UPDATE CASCADE;
