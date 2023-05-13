import { Controller, Get, Param } from '@nestjs/common';
import { RateService } from './rate.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/rate')
@ApiTags('api/rate')
export class RateController {
    constructor(private rateService: RateService){}

    @Get('likes/post/:id')
    getPostLikes(@Param() params: any){
        return this.rateService.getPostLikes(params.id);
    }

    @Get('dislikes/post/:id')
    getPostDislikes(@Param() params: any){
        return this.rateService.getPostDislikes(params.id);
    }

}
