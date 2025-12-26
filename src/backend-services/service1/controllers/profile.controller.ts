import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service.js';

const profileService = new ProfileService();

export class ProfileController {
  getAllProfiles(req: Request, res: Response): void {
    const profiles = profileService.getAllProfiles();
    res.json({
      success: true,
      data: profiles,
      service: 'Service 1',
      timestamp: new Date().toISOString()
    });
  }

  getProfileById(req: Request, res: Response): void {
    const id = parseInt(req.params.id);
    const profile = profileService.getProfileById(id);
    
    if (!profile) {
      res.status(404).json({
        success: false,
        message: 'Profile not found',
        service: 'Service 1'
      });
      return;
    }

    res.json({
      success: true,
      data: profile,
      service: 'Service 1',
      timestamp: new Date().toISOString()
    });
  }

  createProfile(req: Request, res: Response): void {
    const { userId, bio, location } = req.body;
    const profile = profileService.createProfile(userId, bio, location);
    
    res.status(201).json({
      success: true,
      data: profile,
      service: 'Service 1',
      message: 'Profile created successfully',
      timestamp: new Date().toISOString()
    });
  }

  updateProfile(req: Request, res: Response): void {
    const id = parseInt(req.params.id);
    const { bio, location } = req.body;
    const profile = profileService.updateProfile(id, bio, location);
    
    if (!profile) {
      res.status(404).json({
        success: false,
        message: 'Profile not found',
        service: 'Service 1'
      });
      return;
    }

    res.json({
      success: true,
      data: profile,
      service: 'Service 1',
      message: 'Profile updated successfully',
      timestamp: new Date().toISOString()
    });
  }

  deleteProfile(req: Request, res: Response): void {
    const id = parseInt(req.params.id);
    const deleted = profileService.deleteProfile(id);
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Profile not found',
        service: 'Service 1'
      });
      return;
    }

    res.json({
      success: true,
      message: `Profile ${id} deleted successfully`,
      service: 'Service 1',
      timestamp: new Date().toISOString()
    });
  }
}

