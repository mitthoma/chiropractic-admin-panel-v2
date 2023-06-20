/*
  Warnings:

  - You are about to drop the column `note_id` on the `complaint` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "complaint" DROP CONSTRAINT "FK_complaint_note";

-- AlterTable
ALTER TABLE "complaint" DROP COLUMN "note_id",
ADD COLUMN     "noteId" UUID;

-- AddForeignKey
ALTER TABLE "complaint" ADD CONSTRAINT "FK_complaint_note" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
