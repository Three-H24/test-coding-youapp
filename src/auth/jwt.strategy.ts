/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./schema/user.schema";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel('User')
        private userModel: Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'backendcodingtest'
        })
    }

    async validate(payload) {
        const {id} = payload

        const userById = await this.userModel.findById(id)

        if(!userById) {
            throw new UnauthorizedException('Please login to access this page!')
        }

        return userById
    }
}