import { Injectable } from '@nestjs/common';
import { PostDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) { }

    async getPostsByTopic(id: number) {
        return await this.prisma.post.findMany(
            {
                where: {
                    topicTopic_id: +id
                },
            })
    }

    async getPostsByUser(id: number) {
        return await this.prisma.post.findMany({
            where: {
                userUser_id: +id
            },
        })
    }

    async postPost(dto: PostDto, user: any) {
        user = JSON.parse(user);
        const post = await this.prisma.post.create(
            {
                data: {
                    title: dto.title,
                    content: dto.content,
                    userUser_id: +user.user_id,
                    topicTopic_id: +dto.topic_id
                }
            }
        )
        return post;
    }

    async deletePost(id: number) {
        return await this.prisma.post.delete(
            {
                where: {
                    post_id: +id
                }
            }
        )
    }
}
