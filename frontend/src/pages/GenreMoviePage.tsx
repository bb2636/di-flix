import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesByGenre } from "../apis/axios";
import { Movie } from "../types/movie";
import { genreMap } from "../types/genre";
import styles from "../styles/GenreMoviePage.module.css";
import commonStyles from "../styles/Common.module.css";
import { Link } from "react-router-dom";

const GenreMoviePage = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // genreId 바뀔 때 초기화 후 첫 페이지 로딩
    setMovies([]);
    setPage(1);
    setTotalPages(1);

    if (genreId) {
      loadMovies(Number(genreId), 1);
    }
  }, [genreId]);

  const loadMovies = async (id: number, loadPage: number) => {
    try {
      const data = await fetchMoviesByGenre(id, loadPage);
      setMovies((prev) => [...prev, ...data.movies]);
      setTotalPages(data.totalPages);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("장르별 영화 불러오기 실패:", err);
    }
  };

  const handleLoadMore = () => {
    if (genreId && page <= totalPages) {
      loadMovies(Number(genreId), page);
    }
  };

  const genreName = genreMap[Number(genreId)] || "장르";

  return (
    <section className={styles.pageWrapper}>
      <h2 className={styles.title}>{genreName}</h2>
      <hr className={styles.divider} />
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <Link to={`/movie/${movie.id}`} className={styles.linkWrapper}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
              />
              <p className={styles.movieTitle}>{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>

      {page <= totalPages && (
        <button className={commonStyles.fancyButton} onClick={handleLoadMore}>
          <span style={{ fontSize: "1.2em", marginRight: "4px" }}>↓</span>더
          불러오기
        </button>
      )}
    </section>
  );
};

export default GenreMoviePage;
