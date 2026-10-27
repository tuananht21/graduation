import express from 'express';
import { loginValidation, registerValidation } from '../../validations/authValidation.js';
import { loginController, registerController } from '../../controllers/auth/authController.js';

const authRouter = express.Router();

authRouter.route('/login').post(loginValidation,loginController);
authRouter.route('/register').post(registerValidation,registerController);

export default authRouter;