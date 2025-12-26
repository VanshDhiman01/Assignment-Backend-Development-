import { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';

const userService = new UserService();

export class UserController {
  getAllUsers(req: Request, res: Response): void {
    try {
      const users = userService.getAllUsers();
      res.json({
        success: true,
        data: users,
        service: 'Service 1',
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('[UserController] Error in getAllUsers:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: 'Internal Server Error',
          message: error.message || 'Failed to get users',
          service: 'Service 1'
        });
      }
    }
  }

  getUserById(req: Request, res: Response): void {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid user ID',
          service: 'Service 1'
        });
        return;
      }

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
    } catch (error: any) {
      console.error('[UserController] Error in getUserById:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: 'Internal Server Error',
          message: error.message || 'Failed to get user',
          service: 'Service 1'
        });
      }
    }
  }

  createUser(req: Request, res: Response): void {
    try {
      const { name, email } = req.body;
      
      // Validate input
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Name is required and must be a non-empty string',
          service: 'Service 1'
        });
        return;
      }

      if (!email || typeof email !== 'string' || email.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Email is required and must be a non-empty string',
          service: 'Service 1'
        });
        return;
      }

      const user = userService.createUser(name.trim(), email.trim());
      
      res.status(201).json({
        success: true,
        data: user,
        service: 'Service 1',
        message: 'User created successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('[UserController] Error in createUser:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: 'Internal Server Error',
          message: error.message || 'Failed to create user',
          service: 'Service 1'
        });
      }
    }
  }

  updateUser(req: Request, res: Response): void {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid user ID',
          service: 'Service 1'
        });
        return;
      }

      const { name, email } = req.body;
      
      // Validate input
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Name is required and must be a non-empty string',
          service: 'Service 1'
        });
        return;
      }

      if (!email || typeof email !== 'string' || email.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Email is required and must be a non-empty string',
          service: 'Service 1'
        });
        return;
      }

      const user = userService.updateUser(id, name.trim(), email.trim());
      
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
    } catch (error: any) {
      console.error('[UserController] Error in updateUser:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: 'Internal Server Error',
          message: error.message || 'Failed to update user',
          service: 'Service 1'
        });
      }
    }
  }

  deleteUser(req: Request, res: Response): void {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid user ID',
          service: 'Service 1'
        });
        return;
      }

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
    } catch (error: any) {
      console.error('[UserController] Error in deleteUser:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: 'Internal Server Error',
          message: error.message || 'Failed to delete user',
          service: 'Service 1'
        });
      }
    }
  }
}

