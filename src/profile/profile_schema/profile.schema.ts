/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Profile {
    @Prop({unique: true, required: true})
    display_name: string;

    @Prop()
    image_profile: string;

    @Prop()
    gender: string;

    @Prop()
    birthday: Date;

    @Prop()
    horoscope: string;

    @Prop()
    zodiac: string;

    @Prop()
    height: string;

    @Prop()
    weight: string;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile)