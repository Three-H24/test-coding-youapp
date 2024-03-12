/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registeruser.dto';
import { LoginUserDto } from './dto/loginuser.dto';

@Controller('api')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    registerUser(@Body() registerUserDto: RegisterUserDto): Promise<{ token: string }> {
        return this.authService.registerUser(registerUserDto)
    }

    @Get('login')
    loginUser(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
        return this.authService.loginUser(loginUserDto)
    }

}
