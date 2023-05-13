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
        } else if (await this.checkIfPostLikedByUser(+id, +user.user_id)){
            const like = await this.prisma.like.findFirst({
                where: {
                    userUser_id: +user.user_id,
                    postPost_id: +id
                }
            })
            return this.prisma.like.delete({
                where: {
                    like_id: like.like_id
                }
            })
        } else if (await this.checkIfPostDislikedByUser(+id, +user.user_id)) {
            const dislike = await this.prisma.dislike.findFirst({
                where: {
                    userUser_id: +user.user_id,
                    postPost_id: +id
                }
            })
            await this.prisma.dislike.delete({
                where: {
                    dislike_id: dislike.dislike_id
                }
            })
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
        }else if (await this.checkIfPostDislikedByUser(+id, +user.user_id)){
            const dislike = await this.prisma.dislike.findFirst({
                where: {
                    userUser_id: +user.user_id,
                    postPost_id: +id
                }
            })
            return this.prisma.dislike.delete({
                where: {
                    dislike_id: dislike.dislike_id
                }
            })
        } else if (await this.checkIfPostLikedByUser(+id, +user.user_id)) {
            const like = await this.prisma.like.findFirst({
                where: {
                    userUser_id: +user.user_id,
                    postPost_id: +id
                }
            })
            await this.prisma.like.delete({
                where: {
                    like_id: like.like_id
                }
            })
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
