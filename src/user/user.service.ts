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
}
