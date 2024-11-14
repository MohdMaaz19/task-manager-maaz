import db from "../models/index.js";
import { Op } from "sequelize";

export const getTasksForUser = async (userId, filters) => {
  const { priority, status, dueDateFrom, dueDateTo, sortBy, page, limit } =
    filters;

  const where = { userId };
  if (priority) where.priority = priority;
  if (status) where.status = status;
  if (dueDateFrom || dueDateTo) {
    where.dueDate = {
      ...(dueDateFrom && { [Op.gte]: new Date(dueDateFrom) }),
      ...(dueDateTo && { [Op.lte]: new Date(dueDateTo) }),
    };
  }

  const order = [];
  if (sortBy === "dueDateAsc") order.push(["dueDate", "ASC"]);
  else if (sortBy === "dueDateDesc") order.push(["dueDate", "DESC"]);
  else if (sortBy === "priorityAsc") order.push(["priority", "ASC"]);
  else if (sortBy === "priorityDesc") order.push(["priority", "DESC"]);

  // Calculate the pagination parameters
  const pageNumber = page ? parseInt(page) : 1; // Default to page 1
  const pageSize = limit ? parseInt(limit) : 10; // Default to 10 tasks per page
  const offset = (pageNumber - 1) * pageSize;

  return await db.Task.findAndCountAll({
    where,
    order,
    limit: pageSize,
    offset: offset,
  });
};

export const getTaskByIdForUser = async (taskId, userId) => {
  const task = await db.Task.findOne({ where: { id: taskId, userId } });
  if (!task) throw new Error("Task not found or access denied.");
  return task;
};

export const createTaskForUser = async (userId, taskData) => {
  return await db.Task.create({ ...taskData, userId });
};

export const updateTaskForUser = async (taskId, userId, taskData) => {
  const task = await getTaskByIdForUser(taskId, userId);
  return await task.update(taskData);
};

export const deleteTaskForUser = async (taskId, userId) => {
  const task = await getTaskByIdForUser(taskId, userId);
  await task.destroy();
};
