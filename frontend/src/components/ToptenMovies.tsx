// src/components/Top10Movies.tsx
import React, { useEffect, useState } from "react";
import { fetchToptenMovies } from "../apis/axios";
import styles from "../styles/ToptenMovies.module.css"; // 새로 생성

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const ToptenMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchToptenMovies();
        setMovies(data);
      } catch (error) {
        console.log(error);
        console.error("TOP 10 불러오기 실패", error);
      }
    };
    getMovies();
  }, []);

  return (
    <section className={styles.sectionWrapper}>
      <h3 className={styles.title}>🔥 TOP 10</h3>
      <div className={styles.thumbnailGrid}>
        {movies.map((movie, idx) => (
          <div key={movie.id} className={styles.movieCard}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className={styles.thumbnail}
            />
            <p className={styles.titleText}>
              {idx + 1}. {movie.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToptenMovies;
