-- DropForeignKey
ALTER TABLE "treatments" DROP CONSTRAINT "treatments_physioPositioningId_fkey";

-- DropForeignKey
ALTER TABLE "treatments" DROP CONSTRAINT "treatments_treatmentPositioningId_fkey";

-- DropForeignKey
ALTER TABLE "treatments" DROP CONSTRAINT "treatments_treatmentTechniqueId_fkey";

-- AlterTable
ALTER TABLE "treatments" ALTER COLUMN "physioPositioningId" SET DATA TYPE TEXT,
ALTER COLUMN "treatmentPositioningId" SET DATA TYPE TEXT,
ALTER COLUMN "treatmentTechniqueId" SET DATA TYPE TEXT;
