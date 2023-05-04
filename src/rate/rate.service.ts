import { Injectable } from '@nestjs/common';
import { RatePostDto } from 'src/post/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RateService {
    constructor(private prisma: PrismaService){}

    async getPostLikes(id: number) {
        return await this.prisma.like.count({
            where: {
                postPost_id: +id
            }
        })
    }
    
    async getPostDislikes(id: any) {
        return await this.prisma.dislike.count({
            where: {
                postPost_id: +id
            }
        })
    }
    
    async likePost(id: number, dto: RatePostDto) {
        if (await this.checkIfPostLikedByUser(+id, +dto.user_id) == 0 && await this.checkIfPostDislikedByUser(+id, +dto.user_id) == 0) {
            return this.prisma.like.create({
                data: {
                    postPost_id: +id,
                    userUser_id: dto.user_id
                }
            })
        }
        return
    }
    
    async dislikePost(id: number, dto: RatePostDto) {
        if (await this.checkIfPostLikedByUser(id, dto.user_id) == 0 && await this.checkIfPostDislikedByUser(id, dto.user_id) == 0) {
            return this.prisma.dislike.create({
                data: {
                    postPost_id: +id,
                    userUser_id: dto.user_id
                }
            })
        }
    }

    async checkIfPostLikedByUser(post_id: number, user_id: number) {
        const likes = await this.prisma.like.count({
            where: {
                postPost_id: +post_id,
                userUser_id: +user_id
            }
        });
      return likes;  
    }

    async checkIfPostDislikedByUser(post_id: number, user_id: number) {
        const likes = await this.prisma.dislike.count({
            where: {
                postPost_id: +post_id,
                userUser_id: +user_id
            }
        });
      return likes;  
    }

}
