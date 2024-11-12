import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

import config from "../config/config";

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

// Dynamically load models
// readdirSync(__dirname)
//   .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
//   .forEach(file => {
//     const model = require(join(__dirname, file))(sequelize, DataTypes);
//     db[model.name] = model;
//   });

// Associate models if they have the 'associate' method
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
