import { Router } from "express";
import {
  getContentDetail,
  searchMovieTmDB,
  searchGenreMovieTmDB,
} from "../controllers/contentController";
import { verifyToken } from "../middlewares/login-required";

const contentRouter = Router();

// 영화 목록 조회 (프론트에 영화 목록 뿌리기)
contentRouter.get("/", searchMovieTmDB);

// 장르별 영화 목록 조회
contentRouter.get("/genre/:genre_id", searchGenreMovieTmDB);

// 상세 조회 (멤버만 가능)
contentRouter.get("/:movie_id", verifyToken, getContentDetail);

export default contentRouter;
