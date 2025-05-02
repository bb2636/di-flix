// src/components/DetailMovie.tsx
import React from "react";
import { Movie } from "../types/movie";
import styles from "../styles/DetailMoviePage.module.css";

interface DetailMovieProps {
  movie: Movie;
}

const DetailMovie: React.FC<DetailMovieProps> = ({ movie }) => {
  return (
    <div className={styles.detailContainer}>
      <img
        className={styles.poster}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className={styles.info}>
        <h2 className={styles.title}>
          {movie.title} ({movie.release_date?.slice(0, 4)})
        </h2>
        <p className={styles.overview}>{movie.overview}</p>

        {movie.trailerKey && (
          <iframe
            className={styles.trailer}
            src={`https://www.youtube.com/embed/${movie.trailerKey}`}
            title="트레일러"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default DetailMovie;
