"use strict";
/**
 * User Controller
 * Handles HTTP requests for users
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_js_1 = require("../services/user.service.js");
const userService = new user_service_js_1.UserService();
class UserController {
    getAllUsers(req, res) {
        const users = userService.getAllUsers();
        res.json({
            success: true,
            data: users,
            service: 'Service 1',
            timestamp: new Date().toISOString()
        });
    }
    getUserById(req, res) {
        const id = parseInt(req.params.id);
        const user = userService.getUserById(id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                service: 'Service 1'
            });
            return;
        }
        res.json({
            success: true,
            data: user,
            service: 'Service 1',
            timestamp: new Date().toISOString()
        });
    }
    createUser(req, res) {
        const { name, email } = req.body;
        const user = userService.createUser(name, email);
        res.status(201).json({
            success: true,
            data: user,
            service: 'Service 1',
            message: 'User created successfully',
            timestamp: new Date().toISOString()
        });
    }
    updateUser(req, res) {
        const id = parseInt(req.params.id);
        const { name, email } = req.body;
        const user = userService.updateUser(id, name, email);
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                service: 'Service 1'
            });
            return;
        }
        res.json({
            success: true,
            data: user,
            service: 'Service 1',
            message: 'User updated successfully',
            timestamp: new Date().toISOString()
        });
    }
    deleteUser(req, res) {
        const id = parseInt(req.params.id);
        const deleted = userService.deleteUser(id);
        if (!deleted) {
            res.status(404).json({
                success: false,
                message: 'User not found',
                service: 'Service 1'
            });
            return;
        }
        res.json({
            success: true,
            message: `User ${id} deleted successfully`,
            service: 'Service 1',
            timestamp: new Date().toISOString()
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map