import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto';

@Controller('api/comments')
export class CommentController {
    constructor(private commentService: CommentService){}

    @Get('post/:id')
    getCommentsFromPost(@Param() params: any){
        return this.commentService.getCommentsFromPost(params.id);
    }

    @Get('user/:id')
    getCommentsFromUser(@Param() params: any){
        return this.commentService.getCommentsFromUser(params.id);
    }

    @Post()
    postComment(@Body() dto: CommentDto){
        return this.commentService.postComment(dto);
    }

    @Delete(':id')
    deletePost(@Param() params: any){
        return this.commentService.deleteComment(params.id);
    }
}
