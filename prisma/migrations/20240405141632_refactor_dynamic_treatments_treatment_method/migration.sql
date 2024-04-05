/*
  Warnings:

  - You are about to drop the column `coldPack` on the `treatments` table. All the data in the column will be lost.
  - You are about to drop the column `electStim` on the `treatments` table. All the data in the column will be lost.
  - You are about to drop the column `hotPack` on the `treatments` table. All the data in the column will be lost.
  - You are about to drop the column `massage` on the `treatments` table. All the data in the column will be lost.
  - You are about to drop the column `traction` on the `treatments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "treatments" DROP COLUMN "coldPack",
DROP COLUMN "electStim",
DROP COLUMN "hotPack",
DROP COLUMN "massage",
DROP COLUMN "traction";

-- CreateTable
CREATE TABLE "treatment_methods" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "treatmentId" UUID NOT NULL,

    CONSTRAINT "treatment_methods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "treatment_methods" ADD CONSTRAINT "treatment_methods_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "treatments"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
