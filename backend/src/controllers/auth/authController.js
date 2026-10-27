import { loginService, registerService } from "../../services/authService.js";
import ApiError from "../../utils/ApiError.js";

const loginController = async (req, res, next) => {

  try {
    // Nhận dữ liệu email, password đầu vào
    const { email, password } = req.body;
    // Gọi hàm login trong service
    const user = await loginService(email, password);

    // trả về dữ liệu dạng json
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

export { loginController, registerController };
