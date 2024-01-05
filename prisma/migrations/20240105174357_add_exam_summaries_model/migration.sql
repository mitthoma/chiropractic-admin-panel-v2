-- CreateTable
CREATE TABLE "report" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "exam_date" TIMESTAMP(6) NOT NULL,
    "temp" DOUBLE PRECISION,
    "sys" INTEGER,
    "dia" INTEGER,
    "pulse" INTEGER,
    "resp" INTEGER,
    "speech" TEXT,
    "gait" TEXT,
    "rhomberg" TEXT,
    "demeanor" TEXT,
    "dateAdded" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posture" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "wnl" TEXT,
    "dateAdded" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tiltName" TEXT,
    "tiltEst" TEXT,
    "translationName" TEXT,
    "translationEst" TEXT,
    "rotation" TEXT,
    "lordKyph" TEXT,
    "reportId" UUID NOT NULL,

    CONSTRAINT "posture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lumbar" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "norm" INTEGER,
    "dateAdded" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "arom" TEXT,
    "pain" TEXT,
    "notes" TEXT,
    "reportId" UUID NOT NULL,

    CONSTRAINT "lumbar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orthoStanding" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wnl" TEXT,
    "lt" TEXT,
    "rt" TEXT,
    "pain" TEXT,
    "reportId" UUID NOT NULL,

    CONSTRAINT "orthoStanding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cervical" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "norm" INTEGER,
    "dateAdded" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "arom" TEXT,
    "pain" TEXT,
    "notes" TEXT,
    "reportId" UUID NOT NULL,

    CONSTRAINT "cervical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "myoDerm" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "wnl" TEXT,
    "dateAdded" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lt" TEXT,
    "rt" TEXT,
    "notes" TEXT,
    "reportId" UUID NOT NULL,

    CONSTRAINT "myoDerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reflexes" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "level" TEXT,
    "wnl" TEXT,
    "dateAdded" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lt" TEXT,
    "rt" TEXT,
    "notes" TEXT,
    "reportId" UUID NOT NULL,

    CONSTRAINT "reflexes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orthoSeated" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wnl" TEXT,
    "lt" TEXT,
    "rt" TEXT,
    "referral" TEXT,
    "reportId" UUID NOT NULL,

    CONSTRAINT "orthoSeated_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orthoSupine" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wnl" TEXT,
    "lt" TEXT,
    "rt" TEXT,
    "referral" TEXT,
    "reportId" UUID NOT NULL,

    CONSTRAINT "orthoSupine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orthoProne" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "dateAdded" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wnl" TEXT,
    "lt" TEXT,
    "rt" TEXT,
    "referral" TEXT,
    "reportId" UUID NOT NULL,

    CONSTRAINT "orthoProne_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posture" ADD CONSTRAINT "posture_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lumbar" ADD CONSTRAINT "lumbar_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orthoStanding" ADD CONSTRAINT "orthoStanding_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cervical" ADD CONSTRAINT "cervical_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "myoDerm" ADD CONSTRAINT "myoDerm_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reflexes" ADD CONSTRAINT "reflexes_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orthoSeated" ADD CONSTRAINT "orthoSeated_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orthoSupine" ADD CONSTRAINT "orthoSupine_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orthoProne" ADD CONSTRAINT "orthoProne_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
