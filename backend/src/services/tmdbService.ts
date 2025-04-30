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

    for (let page = 1; page <= 5 /*totalPages*/; page++) {
      const response = await axios.get<{ results: Movie[] }>(
        `${BASE_URL}/movie/popular`,
        {
          params: {
            api_key: TMDB_API_KEY,
            language: "ko-KR",
            page: page,
          },
        },
      );

      const movies = response.data.results;

      for (const movie of movies) {
        const content = await prisma.content.create({
          data: {
            title: movie.title,
            description: movie.overview,
            views: 0,
          },
        });

        for (const genreId of movie.genre_ids) {
          await prisma.contentGenre.create({
            data: {
              movie_id: content.movie_id,
              genre_ids: genreId,
            },
          });
        }
      }
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
        where: { genre_ids: genre.id }, // 장르가 이미 있는지 확인
        update: { genre_name: genre.name }, // 이미 있으면 이름 업데이트
        create: { genre_ids: genre.id, genre_name: genre.name }, // 없으면 새로 생성
      });
    }

    console.log("장르 저장 완료");
  } catch (error) {
    console.error("장르 저장 실패:", error);
    throw new Error("TMDB 장르 가져오기 실패");
  }
};
