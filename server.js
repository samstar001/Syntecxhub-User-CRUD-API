// The Entry Point of the application, for loading environment varibles, connecting to the database setting the express middleware, mounting the routs and startingthe HTTP server

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import errorHandler from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB(); // establish MongoDB connection

const app = express();

// Built-in middleware to parse incoming JSON request bodies.
app.use(express.json());

// Mount all user-related routes
app.use("/appi/users", userRoutes);

app.get("/", (req, res) => {
  res.send("User CRUD API is running...");
});

// Centralized error-handling which must be registered after all routes
app.user(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
