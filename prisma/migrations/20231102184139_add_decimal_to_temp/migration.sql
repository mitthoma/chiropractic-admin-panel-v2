/*
  Warnings:

  - You are about to alter the column `temperature` on the `note` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(4,1)`.

*/
-- AlterTable
ALTER TABLE "note" ALTER COLUMN "temperature" SET DATA TYPE DECIMAL(4,1);
