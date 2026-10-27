import express from "express";
import authRouter from "./authRouter.js";

const router = express.Router();

router.use("/auth", authRouter);

const APIs_V1 = router;
export default APIs_V1;
//