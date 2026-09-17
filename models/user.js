// Defines the Mongoose schema and model for the "User" resource. This tells what a User document looks like, including built-in validation rules that Mongoose enforces before any document is saved to MongoDB.

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // Required and unique — no two users can share an email.
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
      max: [120, "Age seems invalid"],
    },

    // Stored as a String, never Number — phone numbers can have leading zeros and '+' prefixes, and are never used in arithmetic.
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^\+?[0-9]{7,15}$/, "Please enter a valid phone number"],
    },

    address: {
      type: String,
      trim: true,
    },

    // Defaults to "user". enum restricts the field to a fixed set of allowed values — anything else throws a ValidationError.
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} is not a valid role",
      },
      default: "user",
    },
  },
  {
    // Automatically adds and manages createdAt updatedAt fields on every save and update
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
