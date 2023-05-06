/*
  Warnings:

  - Made the column `correctAnswers` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quizesTaken` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "correctAnswers" SET NOT NULL,
ALTER COLUMN "correctAnswers" SET DEFAULT 0,
ALTER COLUMN "quizesTaken" SET NOT NULL,
ALTER COLUMN "quizesTaken" SET DEFAULT 0;
