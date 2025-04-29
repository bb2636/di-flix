import { Router } from "express";
import { getContentDetail } from "../controllers/contentController";
import { verifyToken } from "../middlewares/login-required";

const contentRouter = Router();

// 상세 조회 (멤버만 가능)
contentRouter.get("/content/:movie_id", verifyToken, getContentDetail);

export default contentRouter;
