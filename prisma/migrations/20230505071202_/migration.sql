-- CreateTable
CREATE TABLE "Quiz" (
    "quiz_id" SERIAL NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("quiz_id")
);

-- CreateTable
CREATE TABLE "Question" (
    "question_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "quizQuiz_id" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "answer_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "questionQuestion_id" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("answer_id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizQuiz_id_fkey" FOREIGN KEY ("quizQuiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionQuestion_id_fkey" FOREIGN KEY ("questionQuestion_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;
