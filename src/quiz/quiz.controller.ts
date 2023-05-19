import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Request } from 'express';
import { CreateQuizDto, GiveAnswerDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('api/quiz')
@ApiTags('api/quiz')
export class QuizController {
    constructor (private quizService: QuizService){}

    @Get('random')
    getRandomQuiz(){
        return this.quizService.getRandomQuiz();
    }


    @Post()
    createQuiz(@Body() dto: CreateQuizDto){
        return this.quizService.createQuiz(dto)
    }
    
    @Post(':id/answer')
    giveAnswer(@Param() params: any, @Body() dto: GiveAnswerDto, @Req() req: Request){
        return this.quizService.giveAnswer(params.id, dto, JSON.stringify(req.user));
    }
}
