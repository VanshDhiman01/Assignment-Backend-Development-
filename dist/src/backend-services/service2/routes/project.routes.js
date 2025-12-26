"use strict";
/**
 * Project Routes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_js_1 = require("../controllers/project.controller.js");
const router = (0, express_1.Router)();
const projectController = new project_controller_js_1.ProjectController();
router.get('/', projectController.getAllProjects.bind(projectController));
router.get('/:id', projectController.getProjectById.bind(projectController));
router.post('/', projectController.createProject.bind(projectController));
router.put('/:id', projectController.updateProject.bind(projectController));
router.delete('/:id', projectController.deleteProject.bind(projectController));
exports.default = router;
//# sourceMappingURL=project.routes.js.map