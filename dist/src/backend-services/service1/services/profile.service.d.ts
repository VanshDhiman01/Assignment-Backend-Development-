/**
 * Profile Service
 * Business logic for profiles
 */
export interface Profile {
    id: number;
    userId: number;
    bio: string;
    location: string;
    createdAt?: string;
    updatedAt?: string;
}
export declare class ProfileService {
    getAllProfiles(): Profile[];
    getProfileById(id: number): Profile | null;
    createProfile(userId: number, bio: string, location: string): Profile;
    updateProfile(id: number, bio: string, location: string): Profile | null;
    deleteProfile(id: number): boolean;
}
//# sourceMappingURL=profile.service.d.ts.map