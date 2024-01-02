-- CreateEnum
CREATE TYPE "treatmentOptionCategory" AS ENUM ('physioPositioning', 'treatmentPositioning', 'treatmentTechnique');

-- CreateTable
CREATE TABLE "treatmentOption" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "lastEdited" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" "treatmentOptionCategory" NOT NULL,

    CONSTRAINT "treatmentOption_pkey" PRIMARY KEY ("id")
);
