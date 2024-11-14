// services/userService.js
import bcrypt from "bcrypt";
import db from "../models/index.js";

export const createUser = async (userData) => {
  const { username, email, password } = userData;

  // Check if user already exists
  const existingUser = await db.User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists with this email.");
  }

  const existingUsername = await db.User.findOne({ where: { username } });
  if (existingUsername) {
    throw new Error("User already exists with this username");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.User.create({
    username,
    email,
    password: hashedPassword,
  });
  return newUser;
};

export const findUserByEmail = async (email) => {
  return await db.User.findOne({ where: {email} });
};
