/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './profile_schema/profile.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{name: 'Profile', schema: ProfileSchema}])
    ],
    controllers: [ProfileController],
    providers: [ProfileService],
})
export class ProfileModule {}
