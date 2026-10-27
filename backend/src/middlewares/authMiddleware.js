import ApiError from "../utils/ApiError.js";
import { decodedJWT } from "../utils/jwt.js";
import redis from "../config/redis.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  // check empty token
  if (!token) {
    throw new ApiError(401, 'Không tìm thấy token.');
  }


  try {
    const decoded = await decodedJWT(token, 'access_token');

    // check redis 
    const isLogin = await redis.exists(`refresh:${decoded.id}`);
    if (!isLogin) {
      throw new ApiError(401, 'Người dùng không hợp lệ hoặc đã đăng xuất.');
    }

    req.user = decoded; // lưu thông tin người dùng vào req để sử dụng sau
    next(); // tiếp tục middleware tiếp theo
  } catch (error) {

    // check token is expired
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Token đã hết hạn.'));
    }

    // check token invalid or incorrect format
    if (error.name === 'JsonWebTokenError') {
      return next(new ApiError(401, 'Token không hợp lệ hoặc sai định dạng.'));
    }

    next(error);
  }
};

export default authMiddleware;