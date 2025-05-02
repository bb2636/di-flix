import React, { useEffect, useState } from "react";
import { getNowShowingMovies } from "../apis/axios";
import { Movie } from "../types/movie";
import styles from "../styles/NowShowingMovies.module.css";
import { Link } from "react-router-dom";
const NowShowingMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMovies = async () => {
    try {
      const data: Movie[] = await getNowShowingMovies(page);
      if (data.length === 0) {
        setHasMore(false);
        return;
      }
      setMovies((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("추가 영화 로딩 실패", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadMovies(); // 최초 한 번만 실행
  }, []);

  return (
    <section className={styles.sectionWrapper}>
      <h1 className={styles.title}>현재 상영작</h1>
      <div className={styles.thumbnailGrid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <Link to={`/movie/${movie.id}`} className={styles.linkWrapper}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className={styles.thumbnail}
              />
              <p className={styles.titleText}>{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
      {hasMore && (
        <button className={styles.loadMoreButton} onClick={loadMovies}>
          더 불러오기
        </button>
      )}
    </section>
  );
};

export default NowShowingMovies;
