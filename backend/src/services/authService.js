import bcrypt from "bcryptjs";
import usersModel from "../models/usersModel.js";
import { decodedJWT, encodedJWT } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";
import redis from "../config/redis.js";
import env from "../config/environment.js";

const loginService = async (email, password) => {

  try {
    // 1. Kiểm tra tài khoản tồn tại
    const isUser = await usersModel.findOne({ email });
    if (!isUser) {
      throw new ApiError(400, "Email or password not correct");
    }

    const isPassword = bcrypt.compareSync(password, isUser.password);

    if (!isPassword) {
      throw new ApiError(400, "Email or password not correct");
    }

    // 3. Tạo token
    const accessToken = encodedJWT(isUser, "access_token");
    const refreshToken = encodedJWT(isUser, "refresh_token");

    // 4. Lưu refresh vào Redis với thời gian hết hạn
    await redis.set(`refresh:${isUser._id}`,refreshToken,"EX",env.REDIS_REFRESH_EXPIRES_IN,);

    // const res = {
    //   accessToken,
    //   refreshToken,
    //   user: {
    //     _id: isUser._id,
    //     userName: isUser.userName,
    //     email: isUser.email,

    //   }
    // }

    // return res;

    // 5. Trả về dữ liệu chuẩn
    return {
      accessToken,
      refreshToken,
      user: {
        _id: isUser._id,
        userName: isUser.userName,
        email: isUser.email,
      },
    };
  } catch (error) {
    throw new ApiError(400,error || "Đã xảy ra lỗi trong quá trình đăng nhập!");
  }
};

const registerService = async (userName, email, password) => {
  
  try {
    
    // 1. Kiểm tra email đã tồn tại
    const isUser = await usersModel.findOne({ email });
    if (isUser) {
      throw new ApiError(400, "Email đã tồn tại");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await usersModel.create({ userName, email, password: hashedPassword });

    return {
      user: {
        _id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    };
  } catch (error) {
    throw new ApiError(400,error || "Đã xảy ra lỗi trong quá trình đăng ký!");
  }
};

export { 
  loginService ,
  registerService
};
