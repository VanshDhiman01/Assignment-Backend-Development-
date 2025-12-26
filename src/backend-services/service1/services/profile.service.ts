export interface Profile {
  id: number;
  userId: number;
  bio: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
}

// Mock data store
let profiles: Profile[] = [
  { id: 1, userId: 1, bio: 'Software Developer', location: 'New York', createdAt: new Date().toISOString() },
  { id: 2, userId: 2, bio: 'Product Manager', location: 'San Francisco', createdAt: new Date().toISOString() }
];

export class ProfileService {
  getAllProfiles(): Profile[] {
    return profiles;
  }

  getProfileById(id: number): Profile | null {
    return profiles.find(p => p.id === id) || null;
  }

  createProfile(userId: number, bio: string, location: string): Profile {
    const newProfile: Profile = {
      id: Math.floor(Math.random() * 1000),
      userId,
      bio,
      location,
      createdAt: new Date().toISOString()
    };
    profiles.push(newProfile);
    return newProfile;
  }

  updateProfile(id: number, bio: string, location: string): Profile | null {
    const profile = profiles.find(p => p.id === id);
    if (!profile) return null;
    
    profile.bio = bio;
    profile.location = location;
    profile.updatedAt = new Date().toISOString();
    return profile;
  }

  deleteProfile(id: number): boolean {
    const index = profiles.findIndex(p => p.id === id);
    if (index === -1) return false;
    profiles.splice(index, 1);
    return true;
  }
}

