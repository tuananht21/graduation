import mongoose from "mongoose";

const usersMigration = {
  userName: {
    type: String,
    required: [true, "Username is required"],
    min: [3, "Username must be at least 3 characters long"],
    max: [50, "Username must be at most 50 characters long"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email format',
    },
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    min: [8, 'Password must be at least 8 characters long'],
    max: [50, 'Password must be at most 50 characters long'],
  },

  phone: {
    type: String,
    default: null,
    min: [10, 'Phone number must be at least 10 characters long'],
    max: [10, 'Phone number must be at most 10 characters long'],
  }, 

  role: {
    type: Boolean,
    default: false, // 0 user 1 admin
  },

  refreshToken: {
    type: String,
    default: null,
  },

  avatar: {
    type: String,
    default: null,
  },
};

export default usersMigration;
