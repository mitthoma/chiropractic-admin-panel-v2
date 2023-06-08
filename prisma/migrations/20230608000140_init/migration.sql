-- CreateEnum
CREATE TYPE "entry_category_enum" AS ENUM ('spinal', 'extremity');

-- CreateEnum
CREATE TYPE "entry_extremitylevel_enum" AS ENUM ('shoulder', 'arm', 'bicep', 'tricep', 'elbow', 'wrist', 'hand', 'hip', 'thigh', 'leg', 'knee', 'scap', 'ankle', 'foot');

-- CreateEnum
CREATE TYPE "entry_region_enum" AS ENUM ('upper-cerv', 'mid-cerv', 'lower-cerv', 'sub-occ', 'upper-t', 'mid-t', 'lower-t', 'upper-l', 'lower-l', 'upper-sac', 'lower-sac');

-- CreateEnum
CREATE TYPE "entry_side_enum" AS ENUM ('l', 'r', 'b');

-- CreateEnum
CREATE TYPE "entry_spinallevel_enum" AS ENUM ('occ', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 't1', 't2', 't3', 't4', 't5', 't6', 't7', 't8', 't9', 't10', 't11', 't12', 'l1', 'l2', 'l3', 'l4', 'l5', 's1', 's2', 's3', 's4', 's5');

-- CreateEnum
CREATE TYPE "user_role_enum" AS ENUM ('admin', 'super-admin', 'user');

-- CreateTable
CREATE TABLE "complaint" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "text" TEXT NOT NULL,
    "painLevel" INTEGER NOT NULL,
    "patient_id" INTEGER,
    "lastEdited" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_a9c8dbc2ab4988edcc2ff0a7337" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entry" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "createdDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" "entry_category_enum" NOT NULL,
    "region" "entry_region_enum",
    "spinalLevel" "entry_spinallevel_enum",
    "extremityLevel" "entry_extremitylevel_enum",
    "side" "entry_side_enum" NOT NULL,
    "sublux" BOOLEAN NOT NULL,
    "muscleSpasm" BOOLEAN NOT NULL,
    "triggerPoints" BOOLEAN NOT NULL,
    "tenderness" BOOLEAN NOT NULL,
    "numbness" BOOLEAN NOT NULL,
    "edema" BOOLEAN NOT NULL,
    "swelling" BOOLEAN NOT NULL,
    "reducedMotion" BOOLEAN NOT NULL,
    "coldPack" BOOLEAN NOT NULL,
    "hotPack" BOOLEAN NOT NULL,
    "electStim" BOOLEAN NOT NULL,
    "traction" BOOLEAN NOT NULL,
    "massage" BOOLEAN NOT NULL,
    "technique" TEXT NOT NULL,
    "manipulation" BOOLEAN NOT NULL,
    "noteId" UUID,
    "physioPositioning" TEXT NOT NULL,
    "treatmentPositioning" TEXT NOT NULL,

    CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "visitDate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "createdDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastEdited" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "heightFeet" INTEGER,
    "heightInches" INTEGER,
    "temperature" INTEGER,
    "respiration" INTEGER,
    "systolic" INTEGER,
    "diastolic" INTEGER,
    "physiotherapy" INTEGER,
    "phaseOneRoomAssignment" INTEGER,
    "physio" INTEGER,
    "tx" INTEGER,
    "otherNotes" TEXT,
    "patientId" INTEGER,
    "pulse" INTEGER,
    "visitDateText" TEXT,
    "phaseTwoRoomAssignment" INTEGER,
    "phaseThreeRoomAssignment" INTEGER,
    "phaseFourRoomAssignment" INTEGER,
    "weight" INTEGER,

    CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastUpdated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL DEFAULT 'john@gmail.com',
    "acctNo" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "nextAppointment" TIMESTAMP(6),
    "createdDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL DEFAULT 'john@gmail.com',
    "role" "user_role_enum" NOT NULL DEFAULT 'user',
    "firebaseUid" TEXT NOT NULL,

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "complaint" ADD CONSTRAINT "FK_14e50d23f95a6e038dbbe97783b" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entry" ADD CONSTRAINT "FK_df491c2c902d007610301eff36d" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "FK_a649a57c157f8cc9c44241e404c" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
