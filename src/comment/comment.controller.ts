import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from './comment.service';
import { CommentDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/comments')
@ApiTags('api/comments')
export class CommentController {
    constructor(private commentService: CommentService){}

    @Get('post/:id')
    getCommentsFromPost(@Param() params: any){
        try {
            return this.commentService.getCommentsFromPost(params.id);
        } catch (err) {
            console.log(err)
        }
        
    }

    @Get('user/:id')
    getCommentsFromUser(@Param() params: any){
        try {
            return this.commentService.getCommentsFromUser(params.id);
        } catch (err) {
            console.log(err)
        }
        
    }

    @UseGuards(JwtGuard)
    @Post(':id')
    postComment(@Param() params: any, @Body() dto: CommentDto, @Req() req: Request){
        try {
            return this.commentService.postComment(params.id, dto, JSON.stringify(req.user));
        } catch (err) {
            console.log(err)
        }
        
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    deletePost(@Param() params: any){
        try {
            return this.commentService.deleteComment(params.id);
        } catch (err) {
            console.log(err)
        }
        
    }
}
