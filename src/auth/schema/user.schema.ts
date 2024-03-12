/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
    versionKey: false,
})
export class User {
    @Prop()
    name: string;

    @Prop({unique: [true, "duplicate email entered"]})
    email: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)