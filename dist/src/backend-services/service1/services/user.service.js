"use strict";
/**
 * User Service
 * Business logic for users
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// Mock data store
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: new Date().toISOString() },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date().toISOString() }
];
class UserService {
    getAllUsers() {
        return users;
    }
    getUserById(id) {
        return users.find(u => u.id === id) || null;
    }
    createUser(name, email) {
        const newUser = {
            id: Math.floor(Math.random() * 1000),
            name,
            email,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        return newUser;
    }
    updateUser(id, name, email) {
        const user = users.find(u => u.id === id);
        if (!user)
            return null;
        user.name = name;
        user.email = email;
        user.updatedAt = new Date().toISOString();
        return user;
    }
    deleteUser(id) {
        const index = users.findIndex(u => u.id === id);
        if (index === -1)
            return false;
        users.splice(index, 1);
        return true;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map