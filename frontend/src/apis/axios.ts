import axios from "axios";
import { Movie } from "../types/movie";

const api = axios.create({
  baseURL: "http://localhost:4000", // 백엔드 주소
  withCredentials: true, // ⬅️ 쿠키 주고받기 허용
});

export default api;

// 인기 영화 top 10
export const fetchToptenMovies = async (): Promise<Movie[]> => {
  const response = await axios.get("/content/top10");
  return response.data;
};

// 검색창에 영화 검색
export const searchFuncMovies = async (query: string) => {
  const response = await axios.get(
    `/content/search?query=${encodeURIComponent(query)}`,
  );
  return response.data;
};

// 현재 상영중 영화
export const getNowShowingMovies = async (page = 1): Promise<Movie[]> => {
  const response = await axios.get(`/content/nowShowing?page=${page}`);
  return response.data;
};

// 높은 평점 영화
export const getTopRatedMovies = async (page = 1): Promise<Movie[]> => {
  const response = await axios.get(`/content/topRated?page=${page}`);
  return response.data;
};
