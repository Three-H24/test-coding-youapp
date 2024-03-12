/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { ProfileDto } from './dto/profile.dto';


@Controller('api')
export class ProfileController {

    constructor(private profileService: ProfileService) { }

    @Post('createProfile')
    @UseGuards(AuthGuard())
    createProfile(@Body() profileDto: ProfileDto) {
        return this.profileService.createProfile(profileDto);
    }

    @Get('getProfile')
    @UseGuards(AuthGuard())
    getProfile() {
        return this.profileService.getProfile()
    }

    @Patch('updateProfile/:id')
    @UseGuards(AuthGuard())
    updateProfile(@Param('id') id: string, @Body() profileDto: ProfileDto) {
        return this.profileService.updateProfile(id, profileDto)
    }

}
