import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RateService {
    constructor(private prisma: PrismaService){}

    async getPostLikes(id: number) {
        return await this.prisma.like.findMany({
            where: {
                postPost_id: +id
            },
            select: {
                user: {
                    select: { 
                        username: true
                    }
                }
            }
        })
    }
    
    async getPostDislikes(id: any) {
        return await this.prisma.dislike.findMany({
            where: {
                postPost_id: +id
            },
            select: {
                user: {
                    select: { 
                        username: true
                    }
                }
            }
        })
    }
    
    async likePost(id: number, user: any) {
        user = JSON.parse(user);
        if (await this.checkIfPostLikedByUser(+id, +user.user_id) == 0 && await this.checkIfPostDislikedByUser(+id, +user.user_id) == 0) {
            return this.prisma.like.create({
                data: {
                    postPost_id: +id,
                    userUser_id: user.user_id
                }
            })
        }
        return
    }
    
    async dislikePost(id: number, user: any) {
        user = JSON.parse(user);
        if (await this.checkIfPostLikedByUser(id, user.user_id) == 0 && await this.checkIfPostDislikedByUser(id, user.user_id) == 0) {
            return this.prisma.dislike.create({
                data: {
                    postPost_id: +id,
                    userUser_id: user.user_id
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
        const dislikes = await this.prisma.dislike.count({
            where: {
                postPost_id: +post_id,
                userUser_id: +user_id
            }
        });
      return dislikes;
    }

}
