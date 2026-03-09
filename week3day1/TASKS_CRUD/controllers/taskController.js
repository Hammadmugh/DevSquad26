const expressAsyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const { readtasks, writetasks } = require("./fileHelper");
const gettasks = expressAsyncHandler(async (req, res) => {
  const tasks = await readtasks();
  if (!tasks || tasks.length === 0) {
    res.status(404);
    throw new Error("No tasks found");
  }

  let filteredTasks = tasks;
  const { title } = req.query;

  if (title) {
    filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(title.toLowerCase())
    );

    if (filteredTasks.length === 0) {
      res.status(404);
      throw new Error("No tasks found matching the search criteria");
    }
  }

  res.status(200).json({
    success: true,
    data: filteredTasks,
    message: "tasks retrieved successfully",
  });
});

const createtasks = expressAsyncHandler(async (req, res) => {
  const { title, completed } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    res.status(400);
    throw new Error("title is required and must be a string");
  }

  if (typeof completed !== 'boolean') {
    res.status(400);
    throw new Error("completed must be a boolean");
  }

  const tasks = await readtasks();

  const newtask = {
    id: uuidv4(),
    title,
    completed,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newtask);

  await writetasks(tasks);

  res.status(201).json({
    success: true,
    data: newtask,
    message: "task created successfully",
  });
});

const gettask = expressAsyncHandler(async (req, res) => {
  const tasks = await readtasks();
  const task = tasks.find((n) => n.id === req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("task not found");
  }

  res.status(200).json({
    success: true,
    data: task,
    message: "task retrieved successfully",
  });
});

const updatetask = expressAsyncHandler(async (req, res) => {
  const tasks = await readtasks();
  const index = tasks.findIndex((n) => n.id === req.params.id);

  if (index === -1) {
    res.status(404);
    throw new Error("task not found");
  }

  let title = tasks[index].title;
  let completed = tasks[index].completed;

  if (req.body.title !== undefined) {
    if (typeof req.body.title !== 'string' || req.body.title.trim().length === 0) {
      res.status(400);
      throw new Error("title must be a string");
    }
    title = req.body.title;
  }

  if (req.body.completed !== undefined) {
    if (typeof req.body.completed !== 'boolean') {
      res.status(400);
      throw new Error("completed must be a boolean");
    }
    completed = req.body.completed;
  }

  const updatedtask = {
    ...tasks[index],
    title,
    completed,
    updatedAt: new Date().toISOString(),
  };
  tasks[index] = updatedtask;

  await writetasks(tasks);
  res.status(200).json({
    success: true,
    data: updatedtask,
    message: "task updated successfully",
  });
});

const deletetask = expressAsyncHandler(async (req, res) => {
  const tasks = await readtasks();
  const task = tasks.find((n) => n.id === req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("task not found");
  }

  const updatedtasks = tasks.filter((n) => n.id !== req.params.id);
  await writetasks(updatedtasks);

  res
    .status(200)
    .json({ success: true, data: null, message: "task deleted successfully" });
});

const getstats = expressAsyncHandler(async (req, res) => {
  const tasks = await readtasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  res.status(200).json({
    success: true,
    data: {
      totalTasks,
      completedTasks,
      pendingTasks,
    },
    message: "Task statistics retrieved successfully",
  });
});

module.exports = {
  gettask,
  createtasks,
  gettasks,
  updatetask,
  deletetask,
  getstats,
};
