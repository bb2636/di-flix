import React from "react";
import styles from "../styles/SearchResultSection.module.css";
import { Movie } from "../types/movie";
import { StyledLink } from "./StyledLink";

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
            <StyledLink
              to={`/movie/${movie.id}`}
              className={styles.linkWrapper}
            >
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
            </StyledLink>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchResultSection;
