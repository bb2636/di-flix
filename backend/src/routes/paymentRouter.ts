import { Router } from "express";
import { verifyToken } from "../middlewares/login-required"; // ★ 유저 인증 미들웨어
import { confirmPayment } from "../controllers/paymentController";

const paymentrouter = Router();

paymentrouter.post("/payment", verifyToken, confirmPayment);

export default paymentrouter;
