export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

// Mock data store
let projects: Project[] = [
  { id: 1, name: 'API Gateway Project', description: 'Build dynamic API Gateway', status: 'active', createdAt: new Date().toISOString() },
  { id: 2, name: 'Microservices Migration', description: 'Migrate to microservices', status: 'planning', createdAt: new Date().toISOString() }
];

export class ProjectService {
  getAllProjects(): Project[] {
    return projects;
  }

  getProjectById(id: number): Project | null {
    return projects.find(p => p.id === id) || null;
  }

  createProject(name: string, description: string, status: string): Project {
    const newProject: Project = {
      id: Math.floor(Math.random() * 1000),
      name,
      description,
      status: status || 'active',
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    return newProject;
  }

  updateProject(id: number, name: string, description: string, status: string): Project | null {
    const project = projects.find(p => p.id === id);
    if (!project) return null;
    
    project.name = name;
    project.description = description;
    project.status = status;
    project.updatedAt = new Date().toISOString();
    return project;
  }

  deleteProject(id: number): boolean {
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    projects.splice(index, 1);
    return true;
  }
}

