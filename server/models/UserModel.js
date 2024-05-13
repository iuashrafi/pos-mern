const mongoose = require("mongoose");

/**
 * User Model(consists of users with different roles, Admin being the head role)
 * Defining the schema for the User model.
 */
const userSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required."],
    },
    password: { type: String, required: [true, "Password is required."] },
    name: { type: String, required: [true, "Name is required."] },
    username: { type: String }, // Optional username field - for the future use
    user_role: {
      type: String,
      required: [true, "Please select a role"],
      enum: {
        values: [
          "ADMIN",
          "CUSTOMER",
          "KITCHEN_MANAGER",
          "SALES_MANAGER",
          "ORDER_MANAGER",
        ],
        message: "User role is required.",
      },
      default: "ADMIN",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    isDeactivated: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatic timestamps for createdAt and updatedAt fields
  }
);

// Creating the User model from the schema
const User = mongoose.model("User", userSchema);

// Exporting the User model
module.exports = User;
