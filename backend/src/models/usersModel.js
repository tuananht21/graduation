import mongoose from "mongoose";
import usersMigration from "../database/migrations/usersMigration.js";

const userSchema = new mongoose.Schema(usersMigration, {
  timestamps: true,
});

const userModel = mongoose.model("users", userSchema);

export default userSchema;
//