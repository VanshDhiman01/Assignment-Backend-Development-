export interface Task {
  id: number;
  title: string;
  status: string;
  projectId: number;
  createdAt?: string;
  updatedAt?: string;
}

// Mock data store
let tasks: Task[] = [
  { id: 1, title: 'Complete API Gateway', status: 'in-progress', projectId: 1, createdAt: new Date().toISOString() },
  { id: 2, title: 'Write Documentation', status: 'pending', projectId: 1, createdAt: new Date().toISOString() },
  { id: 3, title: 'Code Review', status: 'completed', projectId: 2, createdAt: new Date().toISOString() }
];

export class TaskService {
  getAllTasks(): Task[] {
    return tasks;
  }

  getTaskById(id: number): Task | null {
    return tasks.find(t => t.id === id) || null;
  }

  createTask(title: string, status: string, projectId: number): Task {
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000),
      title,
      status: status || 'pending',
      projectId,
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number, title: string, status: string, projectId: number): Task | null {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    
    task.title = title;
    task.status = status;
    task.projectId = projectId;
    task.updatedAt = new Date().toISOString();
    return task;
  }

  deleteTask(id: number): boolean {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
}

