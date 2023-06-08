/*
  Warnings:

  - You are about to drop the column `patient_id` on the `complaint` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "complaint" DROP CONSTRAINT "FK_14e50d23f95a6e038dbbe97783b";

-- AlterTable
ALTER TABLE "complaint" DROP COLUMN "patient_id",
ADD COLUMN     "note_id" UUID;

-- AddForeignKey
ALTER TABLE "complaint" ADD CONSTRAINT "FK_complaint_note" FOREIGN KEY ("note_id") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
