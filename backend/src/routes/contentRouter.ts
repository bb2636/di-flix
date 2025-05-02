import { Router } from "express";
import {
  getContentDetail,
  searchMovieTmDB,
  searchTopMovieTmDB,
  searchFuncMovies,
  searchGenreMovieTmDB,
  getNowShowingMovies,
  getTopRatedMovies,
  getGenresCategory,
} from "../controllers/contentController";
import { verifyToken } from "../middlewares/login-required";

const contentRouter = Router();

// 로깅 미들웨어 추가
contentRouter.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 영화 목록 조회 (날짜 기준 ASC, DESC 정렬 가능)
contentRouter.get("/", searchMovieTmDB);

// 탑 10 영화 목록 조회
contentRouter.get("/top10", searchTopMovieTmDB);

// 영화 카테고리 조회
contentRouter.get("/genre/", getGenresCategory);

// 상세 조회 (멤버만 가능)
contentRouter.get("/detail/:movie_id", verifyToken, getContentDetail);

// 장르별 영화 목록 조회
contentRouter.get("/genre/:genre_id", searchGenreMovieTmDB);

// 메인페이지 검색창 검색 조회
contentRouter.get("/search", searchFuncMovies);

// 현재 상영중 영화 조회
contentRouter.get("/nowShowing", getNowShowingMovies);

// 높은 평점 영화 조회
contentRouter.get("/topRated", getTopRatedMovies);

export default contentRouter;
