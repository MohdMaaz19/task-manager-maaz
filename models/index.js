import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import config from "../config/config.js";
import UserModel from "./User.js"; // Import User model
import TaskModel from "./Task.js"; // Import Task model

dotenv.config();

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
  }
);

// Initialize models with sequelize instance
const User = UserModel(sequelize, Sequelize.DataTypes);
const Task = TaskModel(sequelize, Sequelize.DataTypes);

const db = {
  sequelize,
  Sequelize,
  User,
  Task,
};

// Define associations
db.User.hasMany(db.Task, { foreignKey: "userId" });
db.Task.belongsTo(db.User, { foreignKey: "userId" });

// Synchronize models with the database
sequelize
  .sync({ alter: true }) // alter: true will update tables to match models without dropping data
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error syncing models with database:", err);
  });

export default db;
