const express = require("express");
const router = express.Router();
const {
  gettask,
  createtasks,
  gettasks,
  updatetask,
  deletetask,
  getstats,
} = require("../controllers/taskController");

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve all tasks with optional title filtering
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Optional filter by task title (case-insensitive)
 *         example: "shopping"
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       completed:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               data:
 *                 - id: "550e8400-e29b-41d4-a716-446655440000"
 *                   title: "Buy groceries"
 *                   completed: false
 *                   createdAt: "2026-03-09T10:30:00.000Z"
 *                   updatedAt: "2026-03-09T10:30:00.000Z"
 *                 - id: "550e8400-e29b-41d4-a716-446655440001"
 *                   title: "Complete project"
 *                   completed: true
 *                   createdAt: "2026-03-09T09:15:00.000Z"
 *                   updatedAt: "2026-03-09T10:00:00.000Z"
 *               message: "tasks retrieved successfully"
 *       404:
 *         description: No tasks found
 */
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with title and completion status
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - completed
 *             properties:
 *               title:
 *                 type: string
 *                 description: Task title
 *               completed:
 *                 type: boolean
 *                 description: Task completion status
 *           example:
 *             title: "Buy groceries"
 *             completed: false
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     completed:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               data:
 *                 id: "550e8400-e29b-41d4-a716-446655440002"
 *                 title: "Buy groceries"
 *                 completed: false
 *                 createdAt: "2026-03-09T10:45:00.000Z"
 *                 updatedAt: "2026-03-09T10:45:00.000Z"
 *               message: "task created successfully"
 *       400:
 *         description: Invalid input
 */
router.route("/").get(gettasks).post(createtasks);

/**
 * @swagger
 * /api/tasks/stats:
 *   get:
 *     summary: Get task statistics
 *     description: Retrieve statistics about tasks (total, completed, pending)
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Successfully retrieved statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalTasks:
 *                       type: integer
 *                     completedTasks:
 *                       type: integer
 *                     pendingTasks:
 *                       type: integer
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               data:
 *                 totalTasks: 10
 *                 completedTasks: 6
 *                 pendingTasks: 4
 *               message: "Task statistics retrieved successfully"
 */
router.route("/stats").get(getstats);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a specific task
 *     description: Retrieve a task by its ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID (UUID)
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Successfully retrieved task
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "550e8400-e29b-41d4-a716-446655440000"
 *                 title: "Buy groceries"
 *                 completed: false
 *                 createdAt: "2026-03-09T10:30:00.000Z"
 *                 updatedAt: "2026-03-09T10:30:00.000Z"
 *               message: "task retrieved successfully"
 *       404:
 *         description: Task not found
 */
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update title and/or completion status of a task
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID (UUID)
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated task title
 *               completed:
 *                 type: boolean
 *                 description: Updated completion status
 *           example:
 *             title: "Buy groceries and cook dinner"
 *             completed: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: "550e8400-e29b-41d4-a716-446655440000"
 *                 title: "Buy groceries and cook dinner"
 *                 completed: true
 *                 createdAt: "2026-03-09T10:30:00.000Z"
 *                 updatedAt: "2026-03-09T11:00:00.000Z"
 *               message: "task updated successfully"
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Delete a task by its ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID (UUID)
 *         example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: null
 *               message: "task deleted successfully"
 *       404:
 *         description: Task not found
 */
router.route("/:id").get(gettask).put(updatetask).delete(deletetask);

module.exports = router;
