/**
 * Project Service
 * Business logic for projects
 */
export interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}
export declare class ProjectService {
    getAllProjects(): Project[];
    getProjectById(id: number): Project | null;
    createProject(name: string, description: string, status: string): Project;
    updateProject(id: number, name: string, description: string, status: string): Project | null;
    deleteProject(id: number): boolean;
}
//# sourceMappingURL=project.service.d.ts.map