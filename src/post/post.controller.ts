import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { PostService } from './post.service';
import { PostDto } from './dto';
import { RateService } from 'src/rate/rate.service';

@Controller('api/posts')
export class PostController {
    constructor(private postService: PostService, private rateService: RateService){}

    @Get()
    getAllPosts(){
        return this.postService.getAllPosts()
    }

    @Get("topic/:id")
    getPostsByTopic(@Param() params: any){
        return this.postService.getPostsByTopic(params.id)
    }

    @Get('user/:id')
    getPostsByUser(@Param() params: any){
        return this.postService.getPostsByUser(params.id)
    }

    @UseGuards(JwtGuard)
    @Post()
    postPost(@Body() dto: PostDto, @Req() req: Request){
        return this.postService.postPost(dto, JSON.stringify(req.user))
    }

    @UseGuards(JwtGuard)
    @Delete(":id")
    deletePost(@Param() param: any){
        return this.postService.deletePost(param.id)
    }

    @UseGuards(JwtGuard)
    @Post(':id/like')
    likePost(@Param() params: any, @Req() req: Request){
        return this.rateService.likePost(params.id, JSON.stringify(req.user))
    }

    @UseGuards(JwtGuard)
    @Post(':id/dislike')
    dislikePost(@Param() params: any, @Req() req: Request){
        return this.rateService.dislikePost(params.id, JSON.stringify(req.user))
    }
}
