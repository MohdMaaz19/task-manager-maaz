import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the user routes
app.use("/", userRoutes);

// Start the server and listen on a port
const PORT = process.env.PORT || 3000;  // Make sure PORT is set to a valid value
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
