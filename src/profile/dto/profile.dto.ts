/* eslint-disable prettier/prettier */
import { IsDateString, IsNotEmpty } from "class-validator";

export class ProfileDto {
    @IsNotEmpty()
    display_name: string;

    @IsNotEmpty()
    image_profile: string;

    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    @IsDateString()
    birthday: string;

    @IsNotEmpty()
    horoscope: string;

    @IsNotEmpty()
    zodiac: string;

    @IsNotEmpty()
    height: string;

    @IsNotEmpty()
    weight: string;    
}