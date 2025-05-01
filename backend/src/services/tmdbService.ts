import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

// 영화 목록 받아오기
export const fetchMovies = async (page: number = 1) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY, // TMDB API 키
        language: "ko-KR", // 한국어로 결과 반환
        page: page, // 페이지 번호
      },
    });

    return response.data.results; // 영화 목록 반환
  } catch (error) {
    console.error("TMDB에서 영화 목록 가져오기 실패:", error);
    throw new Error("TMDB에서 영화 목록 가져오기 실패");
  }
};

// 인기영화 10개만 받아오기

export const fetchTopMovies = async (page: number = 1) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY, // TMDB API 키
        language: "ko-KR", // 한국어로 결과 반환
        page: page, // 페이지 번호
      },
    });

    return response.data.results; // 영화 목록 반환
  } catch (error) {
    console.error("TMDB에서 TOP 10 영화 목록 가져오기 실패:", error);
    throw new Error("TMDB에서 TOP 10 영화 목록 가져오기 실패");
  }
};

export const fetchGenresCategory = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list`,
    {
      params: {
        api_key: TMDB_API_KEY,
        language: "ko-KR",
      },
    },
  );
  return response.data.genres;
};

// 장르별 영화 목록 받아오기
export const fetchMoviesByGenre = async (genreId: string, page: number = 1) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        with_genres: genreId, // 장르 ID
        api_key: TMDB_API_KEY, // TMDB API 키
        language: "ko-KR", // 한국어로 결과 반환
        page: page, // 페이지 번호
      },
    });

    return {
      movies: response.data.results, // 장르별 영화 목록 반환
      totalPages: response.data.total_pages,
    };
  } catch (error) {
    console.error("TMDB에서 장르별 영화 목록 가져오기 실패:", error);
    throw new Error("TMDB에서 장르별 영화 목록 가져오기 실패");
  }
};

// 메인페이지 검색창 검색 기능
export const fetchFuncMovies = async (query: string) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=ko-KR`,
  );
  return response.data.results;
};

// 현재 상영 중 영화 검색
export const fetchNowShowingMovies = async (page = 1) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=ko-KR&page=${page}&region=KR`,
  );

  return response.data.results;
};

// 높은 평점 영화 검색
export const fetchTopRatedMovies = async (page = 1) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=ko-KR&page=${page}&region=KR`,
  );
  return response.data.results;
};
