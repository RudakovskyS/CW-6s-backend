import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService){}

    async getCommentsFromPost(id: number) {
        return await this.prisma.comment.findMany({
            where: {
                postPost_id: +id
            }
        })
    }
    async getCommentsFromUser(id: number) {
        return await this.prisma.comment.findMany({
            where: {
                userUser_id: +id
            },
        })
    }

    async postComment(dto: CommentDto) {
        const comment = await this.prisma.comment.create({
            data:{
                userUser_id: +dto.user_id,
                postPost_id: +dto.post_id,
                content: dto.content
            }
        })
        return comment
    }

    async deleteComment(id: number) {
        return await this.prisma.comment.delete({
            where: {
                comment_id: +id
            }
        })
    }
}
