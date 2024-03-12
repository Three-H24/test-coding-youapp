/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/registeruser.dto';
import { LoginUserDto } from './dto/loginuser.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel('User')
        private userModel: Model<User>,
        private jwtservice: JwtService
    ) { }

    // register user
    async registerUser(registerUserDto: RegisterUserDto): Promise<{ token: string }> {
        const { name, email, password } = registerUserDto

        const hashedPassword = await bcrypt.hash(password, 10)

        const existingUser = await this.userModel.findOne({email});

        if (existingUser) {
            throw new ConflictException('User already exists')
        }
        
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = this.jwtservice.sign({ id: user._id })

        return { token }
    }

    // login user
    async loginUser(loginUserDto: LoginUserDto): Promise<{token: string}> {
        const { email, password } = loginUserDto

        const user = await this.userModel.findOne({email})

        // Check if user exist 
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // check if password from body and database is match using function compare
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const token = this.jwtservice.sign({ id: user._id })

        return { token }
    }
}
