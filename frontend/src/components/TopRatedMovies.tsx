import React, { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { getTopRatedMovies } from "../apis/axios";
import styles from "../styles/TopRatedMovies.module.css";
import commonStyles from "../styles/Common.module.css";
import { Link } from "react-router-dom";

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
    <>
      <section className={styles.sectionWrapper}>
        <h1 className={styles.title}>높은 평점 영화</h1>
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
          <button className={commonStyles.fancyButton} onClick={loadMore}>
            <span style={{ fontSize: "1.2em", marginRight: "4px" }}>
              더 불러오기
            </span>
          </button>
        )}
      </section>
      <hr className={commonStyles.divider} />
    </>
  );
};

export default TopRatedMovies;
