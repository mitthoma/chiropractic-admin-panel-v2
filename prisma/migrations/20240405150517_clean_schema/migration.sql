/*
  Warnings:

  - You are about to drop the `TreatmentMethodNames` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `treatment_methods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `treatment_plan_options` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `treatment_plans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `treatments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "treatment_methods" DROP CONSTRAINT "treatment_methods_treatmentId_fkey";

-- DropForeignKey
ALTER TABLE "treatment_methods" DROP CONSTRAINT "treatment_methods_treatmentMethodNamesId_fkey";

-- DropForeignKey
ALTER TABLE "treatment_plans" DROP CONSTRAINT "treatment_plans_noteId_fkey";

-- DropForeignKey
ALTER TABLE "treatments" DROP CONSTRAINT "treatments_noteId_fkey";

-- DropTable
DROP TABLE "TreatmentMethodNames";

-- DropTable
DROP TABLE "treatment_methods";

-- DropTable
DROP TABLE "treatment_plan_options";

-- DropTable
DROP TABLE "treatment_plans";

-- DropTable
DROP TABLE "treatments";

-- CreateTable
CREATE TABLE "treatment" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "category" "entry_category_enum" NOT NULL,
    "region" "entry_region_enum",
    "spinalLevel" "entry_spinallevel_enum",
    "extremityLevel" "entry_extremitylevel_enum",
    "side" "entry_side_enum" NOT NULL,
    "physioPositioning" TEXT,
    "treatmentPositioning" TEXT,
    "treatmentTechnique" TEXT,
    "treatmentManipulation" BOOLEAN,
    "noteId" UUID NOT NULL,

    CONSTRAINT "treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatmentMethodName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "treatmentMethodName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatment_method" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "active" BOOLEAN NOT NULL DEFAULT false,
    "treatmentId" UUID NOT NULL,
    "treatmentMethodNameId" INTEGER NOT NULL,

    CONSTRAINT "treatment_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatment_plan" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nextVisit1" TEXT,
    "nextVisit2" TEXT,
    "noteId" UUID NOT NULL,

    CONSTRAINT "treatment_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatment_plan_option" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "treatment_plan_option_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "treatment_plan_noteId_key" ON "treatment_plan"("noteId");

-- AddForeignKey
ALTER TABLE "treatment" ADD CONSTRAINT "treatment_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "treatment_method" ADD CONSTRAINT "treatment_method_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "treatment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "treatment_method" ADD CONSTRAINT "treatment_method_treatmentMethodNameId_fkey" FOREIGN KEY ("treatmentMethodNameId") REFERENCES "treatmentMethodName"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "treatment_plan" ADD CONSTRAINT "treatment_plan_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
