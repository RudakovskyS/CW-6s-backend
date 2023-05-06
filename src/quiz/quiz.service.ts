import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto';

@Injectable()
export class QuizService {
    constructor(private prisma: PrismaService){}

    getAllQuizes() {
        return this.prisma.quizQuestion.findMany({
            include: {
                answers: true
            }
        })
    }
    
    getQuizById(id: number) {
        return this.prisma.quizQuestion.findFirst({
            where: {
                question_id: +id
            }
        })
    }

    async getRandomQuiz() {
        const allRows = await (await this.getAllQuizes()).sort(() => Math.random() - 0.5);

        return allRows[0];
    }

    async createQuiz(dto: CreateQuizDto) {
        const new_question = await this.prisma.quizQuestion.create({
            data: {
                content: dto.question
            }
        })
        
        dto.answers.forEach(async (answer, index) => {
            if (index == 0) {
                await this.prisma.quizAnswer.create({
                    data: {
                        questionQuestion_id: new_question.question_id,
                        content: answer,
                        isCorrect: true
                    },
                })
            } else { 
                await this.prisma.quizAnswer.create({
                    data: {
                        questionQuestion_id: new_question.question_id,
                        content: answer,
                        isCorrect: false
                    },
                })
            }
        });
    }
}
