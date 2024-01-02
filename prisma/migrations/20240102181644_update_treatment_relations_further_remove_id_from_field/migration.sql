/*
  Warnings:

  - You are about to drop the column `physioPositioningId` on the `treatments` table. All the data in the column will be lost.
  - You are about to drop the column `treatmentPositioningId` on the `treatments` table. All the data in the column will be lost.
  - You are about to drop the column `treatmentTechniqueId` on the `treatments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "treatments" DROP COLUMN "physioPositioningId",
DROP COLUMN "treatmentPositioningId",
DROP COLUMN "treatmentTechniqueId",
ADD COLUMN     "physioPositioning" TEXT,
ADD COLUMN     "treatmentPositioning" TEXT,
ADD COLUMN     "treatmentTechnique" TEXT;
