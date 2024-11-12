"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  return User;
};
