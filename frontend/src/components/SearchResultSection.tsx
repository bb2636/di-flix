import React from "react";
import styles from "../styles/ContentSection.module.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface Props {
  title: string;
  movies: Movie[];
}

const SearchResultSection: React.FC<Props> = ({ title, movies }) => {
  return (
    <section className={styles.sectionWrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.thumbnailGrid}>
        {movies.map((movie) => (
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
        ))}
      </div>
    </section>
  );
};

export default SearchResultSection;
