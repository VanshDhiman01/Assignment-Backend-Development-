"use strict";
/**
 * Task Controller
 * Handles HTTP requests for tasks
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_js_1 = require("../services/task.service.js");
const taskService = new task_service_js_1.TaskService();
class TaskController {
    getAllTasks(req, res) {
        const tasks = taskService.getAllTasks();
        res.json({
            success: true,
            data: tasks,
            service: 'Service 2',
            timestamp: new Date().toISOString()
        });
    }
    getTaskById(req, res) {
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
    createTask(req, res) {
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
    updateTask(req, res) {
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
    deleteTask(req, res) {
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
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map