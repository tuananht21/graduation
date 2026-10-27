import express from 'express';
import { loginValidation, registerValidation } from '../../validations/authValidation.js';

const authRouter = express.Router();

authRouter.route('/login').post(loginValidation);
authRouter.route('/register').post(registerValidation);

export default authRouter;