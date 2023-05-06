/*
  Warnings:

  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionQuestion_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_quizQuiz_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "correctAnswers" INTEGER;

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "Quiz";

-- CreateTable
CREATE TABLE "QuizQuestion" (
    "question_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "QuizAnswer" (
    "answer_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "questionQuestion_id" INTEGER NOT NULL,

    CONSTRAINT "QuizAnswer_pkey" PRIMARY KEY ("answer_id")
);

-- CreateTable
CREATE TABLE "_QuizQuestionToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuizQuestionToUser_AB_unique" ON "_QuizQuestionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_QuizQuestionToUser_B_index" ON "_QuizQuestionToUser"("B");

-- AddForeignKey
ALTER TABLE "QuizAnswer" ADD CONSTRAINT "QuizAnswer_questionQuestion_id_fkey" FOREIGN KEY ("questionQuestion_id") REFERENCES "QuizQuestion"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuizQuestionToUser" ADD CONSTRAINT "_QuizQuestionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "QuizQuestion"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuizQuestionToUser" ADD CONSTRAINT "_QuizQuestionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
