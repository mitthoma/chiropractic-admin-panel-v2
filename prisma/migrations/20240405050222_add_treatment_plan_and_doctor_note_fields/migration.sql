-- AlterTable
ALTER TABLE "note" ADD COLUMN     "doctorNote" TEXT;

-- CreateTable
CREATE TABLE "treatment_plans" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "nextVisit1" TEXT,
    "nextVisit2" TEXT,
    "noteId" UUID NOT NULL,

    CONSTRAINT "treatment_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "treatment_plan_options" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "treatment_plan_options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "treatment_plans_noteId_key" ON "treatment_plans"("noteId");

-- AddForeignKey
ALTER TABLE "treatment_plans" ADD CONSTRAINT "treatment_plans_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
