"use strict";
/**
 * Profile Controller
 * Handles HTTP requests for profiles
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const profile_service_js_1 = require("../services/profile.service.js");
const profileService = new profile_service_js_1.ProfileService();
class ProfileController {
    getAllProfiles(req, res) {
        const profiles = profileService.getAllProfiles();
        res.json({
            success: true,
            data: profiles,
            service: 'Service 1',
            timestamp: new Date().toISOString()
        });
    }
    getProfileById(req, res) {
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
    createProfile(req, res) {
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
    updateProfile(req, res) {
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
    deleteProfile(req, res) {
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
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map