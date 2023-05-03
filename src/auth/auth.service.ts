import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}
    
    async signup(dto: AuthDto){
        const hash = await argon.hash(dto.password);

       try {
            const user = await this.prisma.user.create({
                data: {
                    username: dto.username,
                    hash
                }
        })
        delete user.hash;
        return user;
        } catch (error) {
            throw new ForbiddenException('Credentials taken')
        }
    }
    async login(dto: AuthDto){
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    username: dto.username
                }
            })
            if (!user) throw new ForbiddenException('Username or password is incorrect')
            
            const isCorrect = await argon.verify(user.hash, dto.password);
            
            if (!isCorrect)
                throw new ForbiddenException('Username or password is incorrect')
            
            return this.signToken(user.user_id, user.username, user.isAdmin);
        } catch (error) {
            throw error
        }
    }

    async signToken(userId: number, username: string, isAdmin: boolean) : Promise<{access_token: string}>{  
        const payload = {
            sub: userId,
            username,
            isAdmin
        }
        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '3h',
            secret: secret
        })

        return {
            access_token: token
        }
        
    }
}