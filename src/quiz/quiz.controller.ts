import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Request } from 'express';
import { CreateQuizDto, GiveAnswerDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('api/quiz')
export class QuizController {
    constructor (private quizService: QuizService){}

    @Get()
    getAllQuizes(){
        return this.quizService.getAllQuizes();
    }

    @Get('random')
    getRandomQuiz(){
        return this.quizService.getRandomQuiz();
    }

    @Get(':id')
    getQuizById(@Param() params: any){
        return this.quizService.getQuizById(params.id);
    }

    @Post()
    createQuiz(@Body() dto: CreateQuizDto){
        return this.quizService.createQuiz(dto);
    }
    
    @Post(':id/answer')
    giveAnswer(@Param() params: any, @Body() dto: GiveAnswerDto){
        return this.quizService.giveAnswer(params.id, dto);
    }
}
