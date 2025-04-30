// import { Response } from "express";
import { AuthRequest } from "../middlewares/authrequest"; // 인증된 사용자 타입
import prisma from "../config/prisma"; // Prisma 클라이언트
import contentRouter from "../routes/contentRouter";
import {
  fetchMovies,
  fetchTopMovies,
  fetchMoviesByGenre,
} from "../services/tmdbService"; // TMDB 서비스 불러오기
import { Request, Response } from "express";

// 🎯 컨텐츠 상세 조회 (멤버십 체크 포함)
export const getContentDetail = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  const movieId = parseInt(req.params.movie_id, 10);

  if (!user) {
    res.status(401).json({ message: "로그인이 필요합니다." });
    return;
  }

  if (!user.is_member) {
    res.status(403).json({ message: "멤버십 가입이 필요합니다." });
    return;
  }

  const content = await prisma.content.findUnique({
    where: { movie_id: movieId },
  });

  if (!content) {
    res.status(404).json({ message: "컨텐츠를 찾을 수 없습니다." });
    return;
  }

  res.status(200).json({ content });
};

// 영화 목록 조회 (프론트에 영화 목록 뿌리기)
export const searchMovieTmDB = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1; // 페이지 번호 (기본값 1)
  const sortOrder = req.query.sortOrder || "asc"; // 정렬 방식 (기본값 내림차순)
  try {
    const movies = await fetchMovies(page); // TMDB에서 영화 목록 받아오기

    // 날짜순으로 정렬 (오름차순 or 내림차순)
    movies.sort((a: any, b: any) => {
      const dateA = new Date(a.release_date).getTime();
      const dateB = new Date(b.release_date).getTime();

      if (sortOrder === "asc") {
        return dateA - dateB; // 오름차순
      } else {
        return dateB - dateA; // 내림차순
      }
    });
    res.status(200).json(movies); // 영화 목록 프론트에 반환
  } catch {
    res.status(500).json({ message: "영화 목록 가져오기 실패" });
  }
};

// 인기 TOP 10 영화 목록 조회
export const searchTopMovieTmDB = async (req: Request, res: Response) => {
  const page = 1; // 1 페이지

  try {
    const movie = await fetchTopMovies(page);
    const topMovies = movie.slice(0, 10);

    res.status(200).json(topMovies);
  } catch {
    res.status(500).json({ message: "탑 10 영화 가져오기 실패" });
  }
};
// 장르별 영화 목록 조회
export const searchGenreMovieTmDB = async (req: Request, res: Response) => {
  const genreId = req.params.genre_id; // URL에서 장르 ID 가져오기

  if (!genreId) {
    res.status(400).json({ message: "장르 ID가 필요합니다." });
    return;
  }

  try {
    // tmdbService에서 장르별 영화 목록을 받아오기
    const tmdbMovies = await fetchMoviesByGenre(genreId); // 서비스에서 처리된 결과 반환

    if (tmdbMovies.length === 0) {
      res.status(404).json({ message: "해당 장르에 대한 영화가 없습니다." });
      return;
    }

    // TMDB API에서 가져온 영화 목록을 클라이언트에 반환
    res.status(200).json(tmdbMovies);
    return;
  } catch (error) {
    console.error("TMDB API에서 영화 목록 가져오기 실패:", error);
    res.status(500).json({ message: "서버 오류" });
    return;
  }
};

// 영화 저장 함수
export const saveMovieToDB = async (req: Request, res: Response) => {
  const { movie_id, title, description } = req.body;

  if (!movie_id || !title || !description) {
    return res.status(400).json({ message: "필수 데이터가 누락되었습니다." });
  }

  try {
    const movie = await prisma.content.create({
      data: {
        movie_id,
        title,
        description,
        views: 0, // 기본값으로 설정
      },
    });

    res.status(201).json({ message: "영화 정보가 저장되었습니다.", movie });
  } catch (error) {
    console.error("영화 정보 저장 실패:", error);
    res.status(500).json({ message: "영화 정보 저장 실패" });
  }
};

export default contentRouter;
