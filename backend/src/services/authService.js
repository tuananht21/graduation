import bcrypt from "bcryptjs";
import usersModel from "../models/usersModel.js";
import { decodedJWT, encodedJWT } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";
import redis from "../config/redis.js";
import env from "../config/environment.js";

const loginService = async (email, password) => {

  try {
    
    const isUser = await usersModel.findOne({ email });
  } catch (error) {}
};
