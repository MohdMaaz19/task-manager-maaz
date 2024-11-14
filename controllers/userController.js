import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { createUser, findUserByEmail } from "../services/userService.js";

export const createUserController = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      const error = new Error("Invalid email id");
      error.statusCode = 400;
      throw error;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      const error = new Error("Invalid password");
      error.statusCode = 400;
      throw error;
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};
