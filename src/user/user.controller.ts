import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('api/users')
@ApiTags('api/users')

export class UserController {
    constructor (private userService: UserService){}

    @Get("me")
    getMe(@Req() req: Request){
        return req.user
    }

    @Get('me/stats')
    getMyStats(@Req() req: Request){
        return this.userService.getUserStats(JSON.stringify(req.user));
    }
}
