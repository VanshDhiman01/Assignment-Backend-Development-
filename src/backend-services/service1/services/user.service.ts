export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

// Mock data store
let users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date().toISOString() },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date().toISOString() }
];

export class UserService {
  getAllUsers(): User[] {
    return users;
  }

  getUserById(id: number): User | null {
    return users.find(u => u.id === id) || null;
  }

  createUser(name: string, email: string): User {
    const newUser: User = {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  }

  updateUser(id: number, name: string, email: string): User | null {
    const user = users.find(u => u.id === id);
    if (!user) return null;
    
    user.name = name;
    user.email = email;
    user.updatedAt = new Date().toISOString();
    return user;
  }

  deleteUser(id: number): boolean {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
}

