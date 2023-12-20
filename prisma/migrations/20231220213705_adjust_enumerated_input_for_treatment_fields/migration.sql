/*
  Warnings:

  - The `physioPositioning` column on the `entry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `treatmentPositioning` column on the `entry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `physioPositioning` column on the `treatments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `treatmentPositioning` column on the `treatments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `treatmentTechnique` column on the `treatments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "positioning_technique_enum" AS ENUM ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j');

-- AlterTable
ALTER TABLE "entry" DROP COLUMN "physioPositioning",
ADD COLUMN     "physioPositioning" "positioning_technique_enum",
DROP COLUMN "treatmentPositioning",
ADD COLUMN     "treatmentPositioning" "positioning_technique_enum";

-- AlterTable
ALTER TABLE "treatments" DROP COLUMN "physioPositioning",
ADD COLUMN     "physioPositioning" "positioning_technique_enum",
DROP COLUMN "treatmentPositioning",
ADD COLUMN     "treatmentPositioning" "positioning_technique_enum",
DROP COLUMN "treatmentTechnique",
ADD COLUMN     "treatmentTechnique" "positioning_technique_enum";
