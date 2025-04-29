// import { Response } from "express";
import { AuthRequest } from "../middlewares/authrequest"; // 인증된 사용자 타입
import prisma from "../config/prisma"; // Prisma 클라이언트
import contentRouter from "../routes/contentRouter";
import { fetchMovies } from "../services/tmdbService"; // TMDB 서비스 불러오기
import { Request, Response } from "express";

// 🎯 컨텐츠 상세 조회 (멤버십 체크 포함)
export const getContentDetail = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  const movieId = parseInt(req.params.movie_id, 10);

  if (!user) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  if (!user.is_member) {
    return res.status(403).json({ message: "멤버십 가입이 필요합니다." });
  }

  const content = await prisma.content.findUnique({
    where: { movie_id: movieId },
  });

  if (!content) {
    return res.status(404).json({ message: "컨텐츠를 찾을 수 없습니다." });
  }

  res.status(200).json({ content });
};

// 영화 목록 조회 (프론트에 영화 목록 뿌리기)
export const searchMovieTmDB = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1; // 페이지 번호 (기본값 1)

  try {
    const movies = await fetchMovies(page); // TMDB에서 영화 목록 받아오기
    res.status(200).json(movies); // 영화 목록 프론트에 반환
  } catch {
    res.status(500).json({ message: "영화 목록 가져오기 실패" });
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
