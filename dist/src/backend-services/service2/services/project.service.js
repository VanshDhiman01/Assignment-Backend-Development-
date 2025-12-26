"use strict";
/**
 * Project Service
 * Business logic for projects
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
// Mock data store
let projects = [
    { id: 1, name: 'API Gateway Project', description: 'Build dynamic API Gateway', status: 'active', createdAt: new Date().toISOString() },
    { id: 2, name: 'Microservices Migration', description: 'Migrate to microservices', status: 'planning', createdAt: new Date().toISOString() }
];
class ProjectService {
    getAllProjects() {
        return projects;
    }
    getProjectById(id) {
        return projects.find(p => p.id === id) || null;
    }
    createProject(name, description, status) {
        const newProject = {
            id: Math.floor(Math.random() * 1000),
            name,
            description,
            status: status || 'active',
            createdAt: new Date().toISOString()
        };
        projects.push(newProject);
        return newProject;
    }
    updateProject(id, name, description, status) {
        const project = projects.find(p => p.id === id);
        if (!project)
            return null;
        project.name = name;
        project.description = description;
        project.status = status;
        project.updatedAt = new Date().toISOString();
        return project;
    }
    deleteProject(id) {
        const index = projects.findIndex(p => p.id === id);
        if (index === -1)
            return false;
        projects.splice(index, 1);
        return true;
    }
}
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map