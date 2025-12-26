/**
 * User Service
 * Business logic for users
 */
export interface User {
    id: number;
    name: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}
export declare class UserService {
    getAllUsers(): User[];
    getUserById(id: number): User | null;
    createUser(name: string, email: string): User;
    updateUser(id: number, name: string, email: string): User | null;
    deleteUser(id: number): boolean;
}
//# sourceMappingURL=user.service.d.ts.map