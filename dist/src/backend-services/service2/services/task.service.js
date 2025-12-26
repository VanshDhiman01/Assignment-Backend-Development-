"use strict";
/**
 * Task Service
 * Business logic for tasks
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
// Mock data store
let tasks = [
    { id: 1, title: 'Complete API Gateway', status: 'in-progress', projectId: 1, createdAt: new Date().toISOString() },
    { id: 2, title: 'Write Documentation', status: 'pending', projectId: 1, createdAt: new Date().toISOString() },
    { id: 3, title: 'Code Review', status: 'completed', projectId: 2, createdAt: new Date().toISOString() }
];
class TaskService {
    getAllTasks() {
        return tasks;
    }
    getTaskById(id) {
        return tasks.find(t => t.id === id) || null;
    }
    createTask(title, status, projectId) {
        const newTask = {
            id: Math.floor(Math.random() * 1000),
            title,
            status: status || 'pending',
            projectId,
            createdAt: new Date().toISOString()
        };
        tasks.push(newTask);
        return newTask;
    }
    updateTask(id, title, status, projectId) {
        const task = tasks.find(t => t.id === id);
        if (!task)
            return null;
        task.title = title;
        task.status = status;
        task.projectId = projectId;
        task.updatedAt = new Date().toISOString();
        return task;
    }
    deleteTask(id) {
        const index = tasks.findIndex(t => t.id === id);
        if (index === -1)
            return false;
        tasks.splice(index, 1);
        return true;
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map