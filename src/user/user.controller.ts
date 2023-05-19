import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/users')
@ApiTags('api/users')

export class UserController {
    constructor (private userService: UserService){}

    @Get(':id')
    getUser(@Param() params: any){
        try {
            return this.userService.getUser(params.id)
        } catch (err) {
            console.log(err)
        }
        
    }
}
