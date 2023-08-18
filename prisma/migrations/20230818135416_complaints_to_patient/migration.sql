/*
  Warnings:

  - You are about to drop the column `noteId` on the `complaint` table. All the data in the column will be lost.
  - You are about to drop the column `heightFeet` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `heightInches` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `note` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "complaint" DROP CONSTRAINT "FK_complaint_note";

-- AlterTable
ALTER TABLE "complaint" DROP COLUMN "noteId",
ADD COLUMN     "patientId" INTEGER;

-- AlterTable
ALTER TABLE "note" DROP COLUMN "heightFeet",
DROP COLUMN "heightInches",
DROP COLUMN "weight";

-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "heightFeet" INTEGER,
ADD COLUMN     "heightInches" INTEGER,
ADD COLUMN     "weight" INTEGER;

-- AddForeignKey
ALTER TABLE "complaint" ADD CONSTRAINT "complaint_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
