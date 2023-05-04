import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PostService } from './post.service';
import { PostDto, RatePostDto } from './dto';
import { RateService } from 'src/rate/rate.service';

@UseGuards(JwtGuard)
@Controller('api/posts')
export class PostController {
    constructor(private postService: PostService, private rateService: RateService){}

    @Get("topic/:id")
    getPostsByTopic(@Param() params: any){
        return this.postService.getPostsByTopic(params.id)
    }

    @Get('user/:id')
    getPostsByUser(@Param() params: any){
        return this.postService.getPostsByUser(params.id)
    }

    @Post()
    postPost(@Body() dto: PostDto){
        return this.postService.postPost(dto)
    }

    @Delete(":id")
    deletePost(@Param() param: any){
        return this.postService.deletePost(param.id)
    }

    @Post(':id/like')
    likePost(@Param() params: any, @Body() dto: RatePostDto){
        return this.rateService.likePost(params.id, dto)
    }

    @Post(':id/dislike')
    dislikePost(@Param() params: any, @Body() dto: RatePostDto){
        return this.rateService.dislikePost(params.id, dto)
    }
}
