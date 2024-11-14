import express from "express";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";

const app = express();

app.use(express.json());

// User routes
app.use("/", userRoutes);

//Tasks routes
app.use("/tasks", taskRoutes);

app.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
