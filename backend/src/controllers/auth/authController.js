import { 
  loginService, 
  registerService, 
  logoutService, 
  refreshTokenService, 
  authUserService 
} from "../../services/authService.js";
import ApiError from "../../utils/ApiError.js";

const loginController = async (req, res, next) => {

  try {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Đăng nhập thành công!",
      data: user,
    });
  } catch (error) {
    // ném lỗi ra middleware xử lý lỗi
    next(new ApiError(400, error.message || error));
  }
};

const registerController = async (req, res, next) => {


  try {
    // Nhận dữ liệu 
    const { userName, email, password } = req.body;
    // Gọi hàm register trong service
    const user = await registerService(userName, email, password);
    // trả về dữ liệu dạng json
    return res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Đăng ký thành công!",
      data: user,
    });
  } catch (error) {
    // ném lỗi ra middleware xử lý lỗi
    next(new ApiError(400, error.message || error));
  }
};

const logoutController = async (req, res, next) => {

  try {
    const { id } = req.user;
    const user = await logoutService(id);
    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Đăng xuất thành công!",
      data: user,
    });
  } catch (error) {
    next(new ApiError(400, error.message || error));
  };
};

const refreshTokenController = async (req, res, next) => {

  try {

    const { refreshtoken } = req.body;
    const accessToken = await refreshTokenService(refreshtoken);
    res.status(200).json({
      statusCode: 200,
      success: true,
      accessToken,
      message: 'Refresh token hợp lệ',
    });

  } catch (error) {
    next(new ApiError(400, error.message || error));
  }
}

const authUserController = async (req, res, next) => {

  try {

    const { id } = req.user;
    const user = await authUserService(id);
    res.status(200).json({
      statusCode: 200,
      success: true,
      data: user,
      message: 'Xác thực thành công!',
    });

  } catch (error) {
    next(new ApiError(400, error.message || error));
  }

}

export { 
  loginController, 
  registerController, 
  logoutController, 
  refreshTokenController,
  authUserController,
};