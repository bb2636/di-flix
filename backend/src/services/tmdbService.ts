import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

// 영화 목록 받아오기
export const fetchMovies = async (page: number = 1) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/popular`,
      {
        params: {
          api_key: TMDB_API_KEY, // TMDB API 키
          language: "ko-KR", // 한국어로 결과 반환
          page: page, // 페이지 번호
        },
      },
    );

    return response.data.results; // 영화 목록 반환
  } catch (error) {
    console.error("TMDB에서 영화 목록 가져오기 실패:", error);
    throw new Error("TMDB에서 영화 목록 가져오기 실패");
  }
};
