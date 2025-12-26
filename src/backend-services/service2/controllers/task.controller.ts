import { Request, Response } from 'express';
import { TaskService } from '../services/task.service.js';

const taskService = new TaskService();

export class TaskController {
  getAllTasks(req: Request, res: Response): void {
    const tasks = taskService.getAllTasks();
    res.json({
      success: true,
      data: tasks,
      service: 'Service 2',
      timestamp: new Date().toISOString()
    });
  }

  getTaskById(req: Request, res: Response): void {
    const id = parseInt(req.params.id);
    const task = taskService.getTaskById(id);
    
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
        service: 'Service 2'
      });
      return;
    }

    res.json({
      success: true,
      data: task,
      service: 'Service 2',
      timestamp: new Date().toISOString()
    });
  }

  createTask(req: Request, res: Response): void {
    const { title, status, projectId } = req.body;
    const task = taskService.createTask(title, status, projectId);
    
    res.status(201).json({
      success: true,
      data: task,
      service: 'Service 2',
      message: 'Task created successfully',
      timestamp: new Date().toISOString()
    });
  }

  updateTask(req: Request, res: Response): void {
    const id = parseInt(req.params.id);
    const { title, status, projectId } = req.body;
    const task = taskService.updateTask(id, title, status, projectId);
    
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
        service: 'Service 2'
      });
      return;
    }

    res.json({
      success: true,
      data: task,
      service: 'Service 2',
      message: 'Task updated successfully',
      timestamp: new Date().toISOString()
    });
  }

  deleteTask(req: Request, res: Response): void {
    const id = parseInt(req.params.id);
    const deleted = taskService.deleteTask(id);
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Task not found',
        service: 'Service 2'
      });
      return;
    }

    res.json({
      success: true,
      message: `Task ${id} deleted successfully`,
      service: 'Service 2',
      timestamp: new Date().toISOString()
    });
  }
}

