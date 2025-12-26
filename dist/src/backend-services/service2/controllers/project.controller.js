"use strict";
/**
 * Project Controller
 * Handles HTTP requests for projects
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const project_service_js_1 = require("../services/project.service.js");
const projectService = new project_service_js_1.ProjectService();
class ProjectController {
    getAllProjects(req, res) {
        const projects = projectService.getAllProjects();
        res.json({
            success: true,
            data: projects,
            service: 'Service 2',
            timestamp: new Date().toISOString()
        });
    }
    getProjectById(req, res) {
        const id = parseInt(req.params.id);
        const project = projectService.getProjectById(id);
        if (!project) {
            res.status(404).json({
                success: false,
                message: 'Project not found',
                service: 'Service 2'
            });
            return;
        }
        res.json({
            success: true,
            data: project,
            service: 'Service 2',
            timestamp: new Date().toISOString()
        });
    }
    createProject(req, res) {
        const { name, description, status } = req.body;
        const project = projectService.createProject(name, description, status);
        res.status(201).json({
            success: true,
            data: project,
            service: 'Service 2',
            message: 'Project created successfully',
            timestamp: new Date().toISOString()
        });
    }
    updateProject(req, res) {
        const id = parseInt(req.params.id);
        const { name, description, status } = req.body;
        const project = projectService.updateProject(id, name, description, status);
        if (!project) {
            res.status(404).json({
                success: false,
                message: 'Project not found',
                service: 'Service 2'
            });
            return;
        }
        res.json({
            success: true,
            data: project,
            service: 'Service 2',
            message: 'Project updated successfully',
            timestamp: new Date().toISOString()
        });
    }
    deleteProject(req, res) {
        const id = parseInt(req.params.id);
        const deleted = projectService.deleteProject(id);
        if (!deleted) {
            res.status(404).json({
                success: false,
                message: 'Project not found',
                service: 'Service 2'
            });
            return;
        }
        res.json({
            success: true,
            message: `Project ${id} deleted successfully`,
            service: 'Service 2',
            timestamp: new Date().toISOString()
        });
    }
}
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map