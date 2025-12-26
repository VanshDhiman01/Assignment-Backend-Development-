import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service.js';

const projectService = new ProjectService();

export class ProjectController {
  getAllProjects(req: Request, res: Response): void {
    const projects = projectService.getAllProjects();
    res.json({
      success: true,
      data: projects,
      service: 'Service 2',
      timestamp: new Date().toISOString()
    });
  }

  getProjectById(req: Request, res: Response): void {
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

  createProject(req: Request, res: Response): void {
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

  updateProject(req: Request, res: Response): void {
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

  deleteProject(req: Request, res: Response): void {
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

