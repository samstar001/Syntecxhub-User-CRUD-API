// routes/userRoutes.js
// Maps HTTP methods + URLs to their corresponding controller functions.

import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(createUser).get(getUsers);

router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
