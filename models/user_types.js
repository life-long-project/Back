const mongoose = require("mongoose");
const userSchema = require("./user_schema");

// Admin schema
const adminSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "admin",
  },
  permissions: {
    type: [String],
    default: ["read", "write", "delete"],
  },
  user: {
    type: userSchema,
    required: true,
  },
});

// jobSeeker schema
const seekerSchema = new mongoose.Schema({
  isSeeker: {
    type: Boolean,
    default: true,
  },
  user: {
    type: userSchema,
    required: true,
  },
});

// Employer schema
const employerSchema = new mongoose.Schema({
  isEmployer: {
    type: Boolean,
    default: true,
  },
  user: {
    type: userSchema,
    required: true,
  },
});
