import { Router } from "express";
import {
  getContentDetail,
  searchMovieTmDB,
  searchTopMovieTmDB,
  searchGenreMovieTmDB,
} from "../controllers/contentController";
import { verifyToken } from "../middlewares/login-required";

const contentRouter = Router();

// 영화 목록 조회 (날짜 기준 ASC, DESC 정렬 가능)
contentRouter.get("/", searchMovieTmDB);

// 탑 10 영화 목록 조회
contentRouter.get("/top10", searchTopMovieTmDB);

// 장르별 영화 목록 조회
contentRouter.get("/genre/:genre_id", searchGenreMovieTmDB);

// 상세 조회 (멤버만 가능)
contentRouter.get("/", verifyToken, getContentDetail);

export default contentRouter;
