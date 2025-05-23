// import { Response } from "express";
import { AuthRequest } from "../middlewares/authrequest"; // 인증된 사용자 타입
import prisma from "../config/prisma"; // Prisma 클라이언트
import {
  fetchMovies,
  fetchTopMovies,
  fetchMoviesByGenre,
  fetchFuncMovies,
  fetchNowShowingMovies,
  fetchTopRatedMovies,
  fetchGenresCategory,
  fetchMovieDetailWithTrailer,
} from "../services/tmdbService"; // TMDB 서비스 불러오기
import { Request, Response } from "express";

// 컨텐츠 상세조회 (멤버십 체크 포함)
export const getContentDetail = async (req: AuthRequest, res: Response) => {
  const loginUser = req.user; // 이름 충돌 피하기 위해 변경
  const movieId = parseInt(req.params.movie_id, 10);
  console.log("movieId:", movieId);

  // 로그인 체크
  if (!loginUser?.user_id) {
    res.status(401).json({ message: "로그인이 필요합니다." });
    return;
  }

  try {
    // 💡 사용자 정보 DB에서 실시간 조회
    const userInfo = await prisma.user.findUnique({
      where: { user_id: loginUser.user_id },
      select: { is_member: true },
    });

    if (!userInfo?.is_member) {
      res.status(403).json({ message: "멤버십 가입이 필요합니다." });
      return;
    }

    const content = await fetchMovieDetailWithTrailer(movieId);
    res.status(200).json(content);
  } catch (err) {
    console.error("TMDB 상세 조회 실패", err);
    res.status(500).json({ message: "서버 오류 발생" });
  }
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

// 영화 장르 카테고리 조회
export const getGenresCategory = async (req: Request, res: Response) => {
  try {
    const genres = await fetchGenresCategory();
    res.status(200).json(genres);
  } catch (error) {
    console.error("장르 목록 조회 실패:", error);
    res.status(500).json({ message: "장르 목록을 가져오는 데 실패했습니다." });
  }
};

// 장르별 영화 목록 조회
export const searchGenreMovieTmDB = async (req: Request, res: Response) => {
  const genreId = req.params.genre_id;
  const page = parseInt(req.query.page as string, 10) || 1;

  if (!genreId) {
    res.status(400).json({ message: "장르 ID가 필요합니다." });
    return;
  }

  try {
    const { movies, totalPages } = await fetchMoviesByGenre(genreId, page);
    if (movies.length === 0) {
      res.status(404).json({ message: "해당 장르에 대한 영화가 없습니다." });
      return;
    }

    res.status(200).json({ movies, totalPages });
    return;
  } catch (error) {
    console.error("TMDB API에서 영화 목록 가져오기 실패:", error);
    res.status(500).json({ message: "서버 오류" });
    return;
  }
};

//// fetchFucnMovies 메인페이지 검색창 검색 기능 가져와 클라이언트에 반환
export const searchFuncMovies = async (req: Request, res: Response) => {
  const query = req.query.query as string;

  if (!query) {
    res.status(400).json({ message: "검색어가 필요합니다." });
    return;
  }

  try {
    const results = await fetchFuncMovies(query);

    // 정확히 일치하는 영화 → 맨 앞으로 정렬
    const sorted = results.sort((a: any, b: any) => {
      const titleA = a.title?.trim().toLowerCase();
      const titleB = b.title?.trim().toLowerCase();
      const queryLower = query.trim().toLowerCase();

      const aExact = titleA === queryLower ? 0 : 1;
      const bExact = titleB === queryLower ? 0 : 1;

      return aExact - bExact;
    });

    res.status(200).json(sorted);
  } catch (error) {
    console.error("TMDB 검색 오류:", error);
    res.status(500).json({ message: "TMDB 검색 실패" });
  }
};

//현재 상영중 영화
export const getNowShowingMovies = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  try {
    const movies = await fetchNowShowingMovies(page);
    res.status(200).json(movies);
  } catch {
    res.status(500).json({ message: "현재 상영 중 영화 가져오기 실패" });
  }
};

//높은 평점 영화
export const getTopRatedMovies = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  try {
    const movies = await fetchTopRatedMovies(page);
    res.status(200).json(movies);
  } catch {
    res.status(500).json({ message: "높은 평점 영화 가져오기 실패" });
  }
};

// 영화 저장 함수 - 추후 처리예정
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

// 시청 기록 저장
export const saveWatchHistory = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.user_id;
  const { movie_id, watchTime, title, poster_path } = req.body;

  if (!userId || !movie_id) {
    res.status(400).json({ message: "필수값 누락" });
    return;
  }

  try {
    // Content 테이블에 영화가 없으면 추가 (최소한의 정보라도)
    await prisma.content.upsert({
      where: { movie_id },
      update: {},
      create: {
        movie_id,
        title: title || "",
        poster_path: poster_path || null,
      },
    });

    // 시청 기록 upsert
    await prisma.watchHistory.upsert({
      where: {
        user_id_movie_id: {
          user_id: userId,
          movie_id,
        },
      },
      update: {
        watchTime,
        timestamp: new Date(),
      },
      create: {
        user_id: userId,
        movie_id,
        watchTime,
      },
    });

    res.status(200).json({ message: "시청 위치 저장 완료" });
  } catch (e) {
    res.status(500).json({ message: "DB 저장 실패" });
    console.error("시청 기록 저장 실패:", e);
  }
};

// 시청 기록 조회
export const getWatchHistory = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.user_id;
  const movie_id = Number(req.query.movie_id);

  if (!userId || !movie_id) {
    res.status(400).json({ message: "필수값 누락" });
    return;
  }

  try {
    const history = await prisma.watchHistory.findUnique({
      where: {
        user_id_movie_id: {
          user_id: userId,
          movie_id,
        },
      },
    });

    res.status(200).json({ watchTime: history?.watchTime ?? 0 });
  } catch (e) {
    res.status(500).json({ message: "조회 실패" });
  }
};

// 사용자의 모든 시청 기록 조회
export const getAllWatchHistory = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.user_id;

  if (!userId) {
    res.status(400).json({ message: "필수값 누락" });
    return;
  }

  try {
    const histories = await prisma.watchHistory.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        timestamp: "desc",
      },
      include: {
        movie: true,
      },
    });

    res.status(200).json(histories);
  } catch (e) {
    console.error("시청 기록 조회 실패:", e);
    res.status(500).json({ message: "조회 실패" });
  }
};
