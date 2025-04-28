import axios from "axios";
import { Movie } from "../types/movie";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async () => {
  const response = await axios.get<{ results: Movie[] }>(`${BASE_URL}/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      language: "ko-KR",
      page: 1,
    },
  });
  return response.data.results;
};

export const fetchTVShows = async () => {
  const response = await axios.get(`${BASE_URL}/tv`, {
    params: {
      api_key: TMDB_API_KEY,
      language: "ko-KR",
      page: 1,
    },
  });
  return response.data.results;
};
