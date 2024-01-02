-- CreateTable
CREATE TABLE "treatments" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "category" "entry_category_enum" NOT NULL,
    "region" "entry_region_enum",
    "spinalLevel" "entry_spinallevel_enum",
    "extremityLevel" "entry_extremitylevel_enum",
    "side" "entry_side_enum" NOT NULL,
    "physioPositioning" INTEGER,
    "coldPack" BOOLEAN,
    "hotPack" BOOLEAN,
    "electStim" BOOLEAN,
    "traction" BOOLEAN,
    "massage" BOOLEAN,
    "treatmentPositioning" INTEGER,
    "treatmentTechnique" TEXT,
    "treatmentManipulation" BOOLEAN,
    "noteId" UUID NOT NULL,

    CONSTRAINT "treatments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "treatments" ADD CONSTRAINT "treatments_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
