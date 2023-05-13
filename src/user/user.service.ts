import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    
    constructor(private prisma: PrismaService){}

    getUserStats(user: string) {
        const userJson = JSON.parse(user)
        console.log(userJson.user_id);
        return {
            percentage: (userJson.correctAnswers / userJson.quizesTaken) * 100
        }
    }

    getUser(id: number) {
        return this.prisma.user.findFirst({
            where: {
                user_id: +id
            },
            select: {
                username: true,
                likes: true,
                dislikes: true,
                quizesTaken: true,
                correctAnswers: true,
                comments: true
            }
        })
    }
}
