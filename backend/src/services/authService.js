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
    throw new ApiError(400, error || "Đã xảy ra lỗi trong quá trình đăng ký!");
  }
};

const logoutService = async (userId) => {

  try {
    const isUser = await usersModel.findById(userId);

    if (!isUser) {
      throw new ApiError(400, "Người dùng không hợp lệ hoặc đã đăng xuất!");
    }

    // nếu lưu redis thì chỉ xóa thôi
    await redis.del(`refresh:${userId}`);

    return {
      message: "Logout successfully",
    };
  } catch (error) {
    throw new ApiError(
      400,
      error || "Đã xảy ra lỗi trong quá trình đăng xuất!",
    );
  }
};

const refreshTokenService = async (refreshToken) => {

  try {
    const decoded = decodedJWT(refreshToken, "refresh_token");
    const userId = decoded.id;

    const storedToken = await redis.get(`refresh:${userId}`);
    if (!storedToken) {
      throw new ApiError(401, "Token không hợp lệ hoặc đã hết hạn");
    }
    if (storedToken !== refreshToken) {
      throw new ApiError(401, "Refresh token không hợp lệ");
    }

    const accessToken = encodedJWT(accessToken, "access_token");

    return accessToken;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const decoded = decodedJWT(refreshToken, "refresh_token");

      await redis.del(`refresh:${decoded.id}`);
      throw new ApiError(400, "Refresh token đã hết hạn");
    }
    throw new ApiError(
      400,
      error || "Đã xảy ra lỗi trong quá trình refresh token!",
    );
  }
};

const authUserService = async (id) => {

  try {
    const user = await userModel
      .findById(id)
      .select(
        "-password -refreshToken -__v -status -isDelete -createdAt -updatedAt",
      );
    if (!user) {
      throw new ApiError(400, "Người dùng không tồn tại");
    }
    return user;
  } catch (error) {
    throw new ApiError(400, error || "Đã xảy ra lỗi trong quá trình xác thực!");
  }
};

export {
  loginService,
  registerService,
  logoutService,
  refreshTokenService,
};
