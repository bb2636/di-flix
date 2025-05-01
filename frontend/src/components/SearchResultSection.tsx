import React from "react";
import styles from "../styles/SearchResultSection.module.css";
import { Movie } from "../types/movie";

interface Props {
  title: string;
  movies: Movie[];
}

const SearchResultSection: React.FC<Props> = ({ title, movies }) => {
  return (
    <section className={styles.sectionWrapper}>
      <h3 className={styles.title}>{title}</h3>
      <hr className={styles.divider} />
      <div className={styles.thumbnailGrid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <img
              key={movie.id}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/assets/default_poster.jpg"
              }
              className={styles.thumbnail}
              alt={movie.title}
            />
            <p className={styles.titleText}>{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchResultSection;
