import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserCreateDto } from 'src/dtos/user-create.dto';
import { UserLoginDto } from 'src/dtos/user-login.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userSer: UserService){}

    @Post("login")
    async login(@Body() loginUser : UserLoginDto){
        return await this.userSer.login(loginUser);
    }

    @Post("signup")
    async signup(@Body() createUser : UserCreateDto){
        return await this.userSer.register(createUser);
    }

    @Get("users/:id")
    async getUser(@Param("id", ParseIntPipe) userId : number){
        return await this.userSer.findUserById(userId);
    }
}
