import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/users')
@ApiTags('api/users')

export class UserController {
    constructor (private userService: UserService){}

    @UseGuards(JwtGuard)
    @Get("me")
    getMe(@Req() req: Request){
        return req.user
    }

    @UseGuards(JwtGuard)
    @Get('me/stats')
    getMyStats(@Req() req: Request){
        return this.userService.getUserStats(JSON.stringify(req.user));
    }

    @Get(':id')
    getUser(@Param() params: any){
        return this.userService.getUser(params.id)
    }
}
