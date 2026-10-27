import Joi from "joi";
import ApiError from "../utils/ApiError.js";

const loginValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().required().email().trim().strict().messages({
        "string.base": "email phải là một chuỗi văn bản.",
        "string.empty": "email không được để trống.",
        "string.email": "email không hợp lệ.",
        "any.required": "email là trường bắt buộc.",
      }),
      password: Joi.string().min(8).max(50).required().trim().strict().messages({
        "string.base": "password phải là một chuỗi văn bản.",
        "string.empty": "password không được để trống.",
        "string.min": "password phải có ít nhất {#limit} ký tự.",
        "string.max": "password không được quá {#limit} ký tự.",
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(", ") : error.message;
    next(new ApiError(400, errorMessage));
  }
};

const registerValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userName: Joi.string().min(3).max(50).required().trim().strict().messages({
        "string.base": "userName phải là một chuỗi văn bản.",
        "string.empty": "userName không được để trống.",
        "any.required": "userName là trường bắt buộc.",
        "string.min": "userName phải có ít nhất {#limit} ký tự.",
        "string.max": "userName không được quá {#limit} ký tự.",
      }),
      email: Joi.string().required().email().trim().strict().messages({
        "string.base": "email phải là một chuỗi văn bản.",
        "string.empty": "email không được để trống.",
        "string.email": "email không hợp lệ.",
        "any.required": "email là trường bắt buộc.",
      }),
      password: Joi.string().min(8).max(50).required().trim().strict().messages({
        "string.base": "password phải là một chuỗi văn bản.",
        "string.empty": "password không được để trống.",
        "any.required": "password là trường bắt buộc.",
        "string.min": "password phải có ít nhất {#limit} ký tự.",
        "string.max": "password không được quá {#limit} ký tự.",
      }),
    });
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(", ") : error.message;
    next(new ApiError(400, errorMessage));
  }
};

export { loginValidation, registerValidation };
//