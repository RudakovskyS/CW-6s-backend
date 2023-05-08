import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto, GiveAnswerDto } from './dto';

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

    async checkAnswer(question_id: number, answer: string){
        return this.prisma.quizAnswer.findFirst({
            where: {
                questionQuestion_id: +question_id,
                content: answer,
            },
            select: {
                isCorrect: true
            }
        })
    }

    async giveAnswer(id: number, dto: GiveAnswerDto, user: any) {
        user = JSON.parse(user);
        const currentQuestion = await this.getQuizById(id)
        
        const currentUser = await this.prisma.user.update({
                where: {
                    user_id: user.user_id
                },
                data: {
                    quizesTaken: {
                        increment: 1
                    }
                }
            })

        const result = await this.checkAnswer(currentQuestion.question_id, dto.answer)

        if (result.isCorrect){
            await this.prisma.user.update({
                where: {
                    user_id: user.user_id
                },
                data: {
                    correctAnswers: {
                        increment: 1
                    }
                }
                
            })
        }

        return result
    }
}
