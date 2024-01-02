/*
  Warnings:

  - You are about to drop the column `physioPositioning` on the `treatments` table. All the data in the column will be lost.
  - You are about to drop the column `treatmentPositioning` on the `treatments` table. All the data in the column will be lost.
  - You are about to drop the column `treatmentTechnique` on the `treatments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "treatments" DROP COLUMN "physioPositioning",
DROP COLUMN "treatmentPositioning",
DROP COLUMN "treatmentTechnique",
ADD COLUMN     "physioPositioningId" INTEGER,
ADD COLUMN     "treatmentPositioningId" INTEGER,
ADD COLUMN     "treatmentTechniqueId" INTEGER;

-- AddForeignKey
ALTER TABLE "treatments" ADD CONSTRAINT "treatments_physioPositioningId_fkey" FOREIGN KEY ("physioPositioningId") REFERENCES "treatmentOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatments" ADD CONSTRAINT "treatments_treatmentPositioningId_fkey" FOREIGN KEY ("treatmentPositioningId") REFERENCES "treatmentOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatments" ADD CONSTRAINT "treatments_treatmentTechniqueId_fkey" FOREIGN KEY ("treatmentTechniqueId") REFERENCES "treatmentOption"("id") ON DELETE SET NULL ON UPDATE CASCADE;
