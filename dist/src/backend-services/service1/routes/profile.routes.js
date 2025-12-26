"use strict";
/**
 * Profile Routes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_js_1 = require("../controllers/profile.controller.js");
const router = (0, express_1.Router)();
const profileController = new profile_controller_js_1.ProfileController();
router.get('/', profileController.getAllProfiles.bind(profileController));
router.get('/:id', profileController.getProfileById.bind(profileController));
router.post('/', profileController.createProfile.bind(profileController));
router.put('/:id', profileController.updateProfile.bind(profileController));
router.delete('/:id', profileController.deleteProfile.bind(profileController));
exports.default = router;
//# sourceMappingURL=profile.routes.js.map