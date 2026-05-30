import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateNewProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto'

@Injectable()
export class ProfilesService {
    private profiles = [
        {
            id: randomUUID(),
            name: "Alpha Project",
            description: "A foundational test project used to validate API endpoints, including GET, POST, and PUT operations. It serves as the primary seed data for early-stage backend development and debugging."
        },
        {
            id: randomUUID(),
            name: "Beta Project",
            description: "A mid-level sample entity designed to simulate real-world user content. It is used to test data updates, partial modifications, and response formatting in RESTful services."
        },
        {
            id: randomUUID(),
            name: "Gamma Project",
            description: "A validation-focused dataset entry used for ensuring schema consistency, DTO validation rules, and error handling mechanisms across the application service layer."
        },
        {
            id: randomUUID(),
            name: "Delta Project",
            description: "A mock production-like record used for end-to-end testing of backend workflows, including controller-service integration and simulated database persistence behavior."
        }
    ];

    findAll() {
        return this.profiles;
    }

    findOne( id: string) {
        const matchingProfile = this.profiles.find((profile) => profile.id === id); 

        if (!matchingProfile) {
            throw new NotFoundException(`No profile with this ID: ${id} was found`)
        }

        return matchingProfile
    }

    create(createProfile: CreateNewProfileDto) {
        const createdProfile = {
            id: randomUUID(),
            ...createProfile,
        };

        this.profiles.push(createdProfile);
        return createdProfile
    }

    update(
        id: string,
        updateProfile: UpdateProfileDto
    ) {
        const matchingProfile = this.profiles.find(
            (existingProfile) => existingProfile.id === id
        )

        if (!matchingProfile) {
            throw new NotFoundException(`No profile with this ID: ${id} was found`)
        }

        matchingProfile.name = updateProfile.name
        matchingProfile.description = updateProfile.description

        return matchingProfile
    }

    remove( id: string ): void {
        const profileIndex = this.profiles.findIndex(
            (index) => index.id === id
        )

        if (profileIndex === -1) {
            throw new NotFoundException(`No profile with this ID: ${id} was found`)
        } 
        
        
        this.profiles.splice(profileIndex, 1)
    }
}