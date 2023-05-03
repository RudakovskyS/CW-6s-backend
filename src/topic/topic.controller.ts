import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { TopicService } from './topic.service';
import { TopicDto } from './dto';

@UseGuards(JwtGuard)
@Controller('api/topics')
export class TopicController {
    constructor(private topicService: TopicService) {}

    @Get()
    getTopics(){
        return this.topicService.getTopics();
    }

    @Get('category/:id')
    getCategoryTopics(@Param() param: any){
        return this.topicService.getCategoryTopics(param.id);
    }

    @Post(':id')
    postCategoryTopic(@Param() param: any, @Body() dto: TopicDto){
        return this.topicService.postTopic(param.id, dto);
    }

    @Get(':id')
    getTopic(@Param() param: any){
        return this.topicService.getTopic(param.id);
    }

    @Delete(':id')
    deleteTopic(@Param() param: any){
        return this.topicService.deleteTopic(param.id);
    }
}
