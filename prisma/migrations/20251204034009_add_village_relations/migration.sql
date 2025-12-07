-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "villageId" TEXT;

-- AlterTable
ALTER TABLE "Tour" ADD COLUMN     "villageId" TEXT;

-- CreateIndex
CREATE INDEX "Event_villageId_idx" ON "Event"("villageId");

-- CreateIndex
CREATE INDEX "Tour_villageId_idx" ON "Tour"("villageId");

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "Village"("id") ON DELETE SET NULL ON UPDATE CASCADE;
