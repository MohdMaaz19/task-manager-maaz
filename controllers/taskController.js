import { 
    getTasksForUser, 
    getTaskByIdForUser, 
    createTaskForUser, 
    updateTaskForUser, 
    deleteTaskForUser 
  } from "../services/taskService.js";
  
  export const getTasks = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { priority, status, dueDateFrom, dueDateTo, sortBy } = req.query;
      const tasks = await getTasksForUser(userId, { priority, status, dueDateFrom, dueDateTo, sortBy });
      res.json({ success: true, tasks });
    } catch (error) {
      next(error);
    }
  };
  
  export const getTaskById = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const taskId = req.params.id;
      const task = await getTaskByIdForUser(taskId, userId);
      res.json({ success: true, task });
    } catch (error) {
      next(error);
    }
  };
  
  export const createTask = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const taskData = req.body;
      const task = await createTaskForUser(userId, taskData);
      res.status(201).json({ success: true, task });
    } catch (error) {
      next(error);
    }
  };
  
  export const updateTask = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const taskId = req.params.id;
      const taskData = req.body;
      const updatedTask = await updateTaskForUser(taskId, userId, taskData);
      res.json({ success: true, task: updatedTask });
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteTask = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const taskId = req.params.id;
      await deleteTaskForUser(taskId, userId);
      res.json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  