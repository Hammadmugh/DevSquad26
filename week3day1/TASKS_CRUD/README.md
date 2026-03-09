# Simple Tasks API

A RESTful backend API for managing tasks built with Express.js and Node.js. This API allows you to create, read, update, and delete tasks, as well as retrieve task statistics.

## Overview

The Simple Tasks API is a lightweight REST service that provides endpoints for task management with complete CRUD operations. It includes request validation for data integrity and comprehensive error handling.

### Features
- Create, read, update, and delete tasks
- Search tasks by title
- Get task statistics (total, completed, pending tasks)
- Input validation (title as string, completed as boolean)
- Error handling with consistent response format
- Persistent storage using JSON files

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd week3day1
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (optional):
```env
PORT=5000
```

### Running the Project

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on port 5000 (or the port specified in your `.env` file).

## API Endpoints

### Base URL
```
http://localhost:5000/api/tasks
```

### 1. Get All Tasks
**Request:**
```http
GET /api/tasks
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "4f44f7b5-13b7-4fc3-9ac8-e18b33b64548",
      "title": "prayer",
      "completed": true,
      "createdAt": "2026-03-09T06:58:55.282Z",
      "updatedAt": "2026-03-09T06:58:55.282Z"
    }
  ],
  "message": "tasks retrieved successfully"
}
```

### 2. Search Tasks by Title
**Request:**
```http
GET /api/tasks?title=prayer
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "4f44f7b5-13b7-4fc3-9ac8-e18b33b64548",
      "title": "prayer",
      "completed": true,
      "createdAt": "2026-03-09T06:58:55.282Z",
      "updatedAt": "2026-03-09T06:58:55.282Z"
    }
  ],
  "message": "tasks retrieved successfully"
}
```

### 3. Create a Task
**Request:**
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "completed": false
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Complete project documentation",
    "completed": false,
    "createdAt": "2026-03-09T10:30:00.000Z",
    "updatedAt": "2026-03-09T10:30:00.000Z"
  },
  "message": "task created successfully"
}
```

**Validation Errors:**
```json
{
  "success": false,
  "data": null,
  "message": "title is required and must be a string"
}
```

### 4. Get a Specific Task
**Request:**
```http
GET /api/tasks/4f44f7b5-13b7-4fc3-9ac8-e18b33b64548
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "4f44f7b5-13b7-4fc3-9ac8-e18b33b64548",
    "title": "prayer",
    "completed": true,
    "createdAt": "2026-03-09T06:58:55.282Z",
    "updatedAt": "2026-03-09T06:58:55.282Z"
  },
  "message": "task retrieved successfully"
}
```

### 5. Update a Task
**Request:**
```http
PUT /api/tasks/4f44f7b5-13b7-4fc3-9ac8-e18b33b64548
Content-Type: application/json

{
  "title": "Updated task title",
  "completed": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "4f44f7b5-13b7-4fc3-9ac8-e18b33b64548",
    "title": "Updated task title",
    "completed": true,
    "createdAt": "2026-03-09T06:58:55.282Z",
    "updatedAt": "2026-03-09T11:00:00.000Z"
  },
  "message": "task updated successfully"
}
```

### 6. Delete a Task
**Request:**
```http
DELETE /api/tasks/4f44f7b5-13b7-4fc3-9ac8-e18b33b64548
```

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "task deleted successfully"
}
```

### 7. Get Task Statistics
**Request:**
```http
GET /api/tasks/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTasks": 5,
    "completedTasks": 3,
    "pendingTasks": 2
  },
  "message": "Task statistics retrieved successfully"
}
```

## Validation Rules

### Create/Update Task
- **title**: Required (for create), must be a non-empty string
- **completed**: Required (for create), must be a boolean (true/false)

### Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "data": null,
  "message": "title is required and must be a string"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "data": null,
  "message": "task not found"
}
```

## Project Structure

```
week3day1/
├── controllers/
│   ├── taskController.js    # Task business logic
│   └── fileHelper.js        # File I/O operations
├── routes/
│   └── taskRoutes.js        # Route definitions
├── middleware/
│   └── errorHandler.js      # Error handling middleware
├── data/
│   └── tasks.json           # Task storage
├── constants.js             # HTTP status constants
├── package.json             # Project dependencies
└── server.js                # Express server setup
```

## Technologies Used

- **Express.js** - Web framework
- **express-async-handler** - Async error handling
- **uuid** - Unique ID generation
- **dotenv** - Environment configuration
- **nodemon** - Development auto-reload

## License

ISC
