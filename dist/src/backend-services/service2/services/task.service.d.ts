/**
 * Task Service
 * Business logic for tasks
 */
export interface Task {
    id: number;
    title: string;
    status: string;
    projectId: number;
    createdAt?: string;
    updatedAt?: string;
}
export declare class TaskService {
    getAllTasks(): Task[];
    getTaskById(id: number): Task | null;
    createTask(title: string, status: string, projectId: number): Task;
    updateTask(id: number, title: string, status: string, projectId: number): Task | null;
    deleteTask(id: number): boolean;
}
//# sourceMappingURL=task.service.d.ts.map