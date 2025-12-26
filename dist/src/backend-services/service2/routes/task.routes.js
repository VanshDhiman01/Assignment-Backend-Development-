"use strict";
/**
 * Task Routes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_js_1 = require("../controllers/task.controller.js");
const router = (0, express_1.Router)();
const taskController = new task_controller_js_1.TaskController();
router.get('/', taskController.getAllTasks.bind(taskController));
router.get('/:id', taskController.getTaskById.bind(taskController));
router.post('/', taskController.createTask.bind(taskController));
router.put('/:id', taskController.updateTask.bind(taskController));
router.delete('/:id', taskController.deleteTask.bind(taskController));
exports.default = router;
//# sourceMappingURL=task.routes.js.map