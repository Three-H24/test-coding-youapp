/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Profile } from './profile_schema/profile.schema';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {

    constructor(
        @InjectModel('Profile')
        private profileModel: Model<Profile>
    ) { }

    async createProfile(profileDto: ProfileDto) {
        const { display_name, image_profile, gender, birthday, horoscope, zodiac, height, weight } = profileDto

        const existDisplayName = await this.profileModel.findOne({ display_name })
        if (existDisplayName) {
            throw new ConflictException('the name is already taken by others user')
        }

        const profile = await this.profileModel.create({
            display_name,
            image_profile,
            gender,
            birthday,
            horoscope,
            zodiac,
            height,
            weight
        })

        return {
            message: "Profile created",
            profile
        }
    }

    async getProfile() {
        const profile = await this.profileModel.find().exec();
        return { profile }
    }

    async updateProfile(id: string, profileDto: ProfileDto) {
        const { display_name, image_profile, gender, birthday, horoscope, zodiac, height, weight } = profileDto

        // Cek jika id benar
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException('profile with id ' + id + ' not found');
        }

        const profileUpdate = await this.profileModel.updateOne(
            { _id: id },
            {
                $set: {
                    display_name,
                    image_profile,
                    gender,
                    birthday,
                    horoscope,
                    zodiac,
                    height,
                    weight
                }
            }
        )

        console.log(profileUpdate);

        return {
            message: "profile updated",
            profileUpdate
        }
    }
}
