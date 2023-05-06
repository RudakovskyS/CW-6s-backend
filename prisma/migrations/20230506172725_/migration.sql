/*
  Warnings:

  - You are about to drop the `_QuizQuestionToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QuizQuestionToUser" DROP CONSTRAINT "_QuizQuestionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuizQuestionToUser" DROP CONSTRAINT "_QuizQuestionToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "quizesTaken" INTEGER;

-- DropTable
DROP TABLE "_QuizQuestionToUser";
