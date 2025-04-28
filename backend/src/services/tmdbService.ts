import axios from "axios";
import { Movie } from "../types/movie";
import prisma from "../config/prisma";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";


// tmdb 모든 영화 마지막페이지까지 db에 저장
export const AllMoviesSave = async () => {
  try {
    const firstPageResponse = await axios.get<{
      results: Movie[];
      total_pages: number;
    }>(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "ko-KR",
        page: 1,
      },
    });

    const totalPages = firstPageResponse.data.total_pages;
    console.log(`전체 페이지 수: ${totalPages}`);

    for (let page = 1; page <= 3 /* totalPages */; page++) {
      const response = await axios.get<{ results: Movie[] }>(
        `${BASE_URL}/movie/popular`,
        {
          params: {
            api_key: TMDB_API_KEY,
            language: "ko-KR",
            page: page,
          },
        }
      );

      const movies = response.data.results;

      for (const movie of movies) {
        await prisma.content.create({
          data: {
            title: movie.title,
            description: movie.overview,
            genre_ids: movie.genre_ids.length > 0 ? movie.genre_ids : [], // 수정: genre_ids → genre_id
            views: 0,
          },
        });
      }

      console.log(`${page}페이지 저장 완료`);
    }

    console.log("전체 영화 저장 완료");
  } catch (error) {
    console.error("영화 데이터 저장 실패:", error);
  }
};

// 장르 가져와서 genres DB에 id와 name 저장
export const saveGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "ko-KR",
      },
    });

    const genres = response.data.genres;

    for (const genre of genres) {
      await prisma.genre.upsert({
        where: { genre_ids: genre.id },
        update: { genre_name: genre.name },
        create: {
          genre_ids: genre.id,
          genre_name: genre.name,
        },
      });
    }

    console.log("장르 저장 완료");
  } catch (error) {
    console.error("장르 저장 실패:", error);
    throw new Error("TMDB 장르 가져오기 실패");
  }
};
