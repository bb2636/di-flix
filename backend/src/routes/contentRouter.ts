import { Router } from "express";
import {
  getContentDetail,
  searchMovieTmDB,
  searchTopMovieTmDB,
  searchFuncMovies,
  searchGenreMovieTmDB,
  getNowShowingMovies,
  getTopRatedMovies,
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

// 메인페이지 검색창 검색 조회
contentRouter.get("/search", searchFuncMovies);

// 현재 상영중 영화 조회
contentRouter.get("/nowShowing", getNowShowingMovies);

// 높은 평점 영화 조회
contentRouter.get("/topRated", getTopRatedMovies);

export default contentRouter;
