import { 
    Controller, 
    Get, 
    Param, 
    Post, 
    Body, 
    Put, 
    Delete, 
    HttpCode, 
    HttpStatus, 
    UseGuards,
    ParseUUIDPipe,
} from '@nestjs/common';
import { CreateNewProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { ProfilesGuard } from './profiles.guard';
import type { UUID } from 'crypto';

@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {}

    @Get()
    findAll() {
        return this.profilesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: UUID) {
        return this.profilesService.findOne(id);
    }

    @Post()
    create(@Body() createProfile: CreateNewProfileDto) {
        return this.profilesService.create(createProfile);
    }

    @Put(':id')
    update(
        @Param('id', ParseUUIDPipe) id: UUID,
        @Body() updateProfile: UpdateProfileDto
    ) {
        return this.profilesService.update(id, updateProfile)
    }

    @Delete(':id')
    @UseGuards(ProfilesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseUUIDPipe) id: UUID) {
        this.profilesService.remove(id)
    }
}
