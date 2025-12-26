"use strict";
/**
 * Profile Service
 * Business logic for profiles
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
// Mock data store
let profiles = [
    { id: 1, userId: 1, bio: 'Software Developer', location: 'New York', createdAt: new Date().toISOString() },
    { id: 2, userId: 2, bio: 'Product Manager', location: 'San Francisco', createdAt: new Date().toISOString() }
];
class ProfileService {
    getAllProfiles() {
        return profiles;
    }
    getProfileById(id) {
        return profiles.find(p => p.id === id) || null;
    }
    createProfile(userId, bio, location) {
        const newProfile = {
            id: Math.floor(Math.random() * 1000),
            userId,
            bio,
            location,
            createdAt: new Date().toISOString()
        };
        profiles.push(newProfile);
        return newProfile;
    }
    updateProfile(id, bio, location) {
        const profile = profiles.find(p => p.id === id);
        if (!profile)
            return null;
        profile.bio = bio;
        profile.location = location;
        profile.updatedAt = new Date().toISOString();
        return profile;
    }
    deleteProfile(id) {
        const index = profiles.findIndex(p => p.id === id);
        if (index === -1)
            return false;
        profiles.splice(index, 1);
        return true;
    }
}
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map