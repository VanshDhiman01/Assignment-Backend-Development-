import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller.js';

const router = Router();
const profileController = new ProfileController();

router.get('/', profileController.getAllProfiles.bind(profileController));
router.get('/:id', profileController.getProfileById.bind(profileController));
router.post('/', profileController.createProfile.bind(profileController));
router.put('/:id', profileController.updateProfile.bind(profileController));
router.delete('/:id', profileController.deleteProfile.bind(profileController));

export default router;

