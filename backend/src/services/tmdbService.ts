import axios from "axios";
import { Movie } from "../types/tmdb";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async () => {
  const response = await axios.get<{ results: Movie[] }>(
    `${BASE_URL}/movie/popular`,
    {
      params: {
        api_key: API_KEY,
        language: "ko-KR",
        page: 1,
      },
    }
  );

  return response.data.results;
};
