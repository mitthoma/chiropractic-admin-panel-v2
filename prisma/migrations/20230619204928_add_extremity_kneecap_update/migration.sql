/*
  Warnings:

  - The values [kneeCap] on the enum `entry_extremitylevel_enum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "entry_extremitylevel_enum_new" AS ENUM ('shoulder', 'arm', 'bicep', 'tricep', 'elbow', 'wrist', 'hand', 'hip', 'thigh', 'leg', 'knee', 'knee_cap', 'scap', 'ankle', 'foot');
ALTER TABLE "entry" ALTER COLUMN "extremityLevel" TYPE "entry_extremitylevel_enum_new" USING ("extremityLevel"::text::"entry_extremitylevel_enum_new");
ALTER TYPE "entry_extremitylevel_enum" RENAME TO "entry_extremitylevel_enum_old";
ALTER TYPE "entry_extremitylevel_enum_new" RENAME TO "entry_extremitylevel_enum";
DROP TYPE "entry_extremitylevel_enum_old";
COMMIT;
