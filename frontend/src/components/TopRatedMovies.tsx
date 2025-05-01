import React, { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { getTopRatedMovies } from "../apis/axios";
import styles from "../styles/TopRatedMovies.module.css";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    try {
      const data = await getTopRatedMovies(page);
      if (data.length === 0) {
        setHasMore(false);
        return;
      }
      setMovies((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("높은 평점 영화 로딩 실패", err);
    }
  };

  useEffect(() => {
    loadMore(); // 초기 로딩
  }, []);

  return (
    <section className={styles.sectionWrapper}>
      <h3 className={styles.title}>높은 평점 영화</h3>
      <div className={styles.thumbnailGrid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className={styles.thumbnail}
            />
            <p className={styles.titleText}>{movie.title}</p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button className={styles.loadMoreButton} onClick={loadMore}>
          더 불러오기
        </button>
      )}
    </section>
  );
};

export default TopRatedMovies;
