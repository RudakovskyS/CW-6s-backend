/*
  Warnings:

  - A unique constraint covering the columns `[questionQuestion_id,content]` on the table `QuizAnswer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuizAnswer_questionQuestion_id_content_key" ON "QuizAnswer"("questionQuestion_id", "content");
