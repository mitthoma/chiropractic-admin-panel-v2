/*
  Warnings:

  - You are about to drop the column `name` on the `treatment_methods` table. All the data in the column will be lost.
  - Added the required column `treatmentMethodNamesId` to the `treatment_methods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "treatment_methods" DROP COLUMN "name",
ADD COLUMN     "treatmentMethodNamesId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TreatmentMethodNames" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TreatmentMethodNames_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "treatment_methods" ADD CONSTRAINT "treatment_methods_treatmentMethodNamesId_fkey" FOREIGN KEY ("treatmentMethodNamesId") REFERENCES "TreatmentMethodNames"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
