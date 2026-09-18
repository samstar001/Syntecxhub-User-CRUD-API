// controllers/userController.js
// Business logic for each CRUD operation on the User resource.

import User from "../models/user.js";

// @desc  Create a new user
// @route POST /api/users
const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err); // forwarded to centralized error handler
  }
};

// @desc  Get all users
// @route GET /api/users
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    next(err);
  }
};

// @desc  Get a single user by ID
// @route GET /api/users/:id
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    // findById resolves to null on a valid-but-missing ID — doesn't throw, so check manually
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err); // catches CastError for malformed IDs (e.g. /users/abc123)
  }
};

// @desc  Update a user by ID
// @route PATCH /api/users/:id
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the updated document, not the original
      runValidators: true, // re-run schema validation on the update
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// @desc  Delete a user by ID
// @route DELETE /api/users/:id
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };
