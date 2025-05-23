// src/components/ToptenMovies.tsx
import React, { useEffect, useState, useRef } from "react";
import { fetchToptenMovies } from "../apis/axios";
import styles from "../styles/ToptenMovies.module.css";
import { Movie } from "../types/movie";
import { Link } from "react-router-dom";

const ToptenMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchToptenMovies();
        setMovies(data);
      } catch (error) {
        console.error("TOP 10 불러오기 실패", error);
      }
    };
    getMovies();
  }, []);

  const scrollAmount = 300;

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <section className={styles.sectionWrapper}>
        <h1 className={styles.title}>🔥 TOP 10</h1>

        <div className={styles.carousel}>
          <button
            className={styles.arrowLeft}
            onClick={() => handleScroll("left")}
          >
            ❮
          </button>

          <div className={styles.thumbnailGrid} ref={scrollRef}>
            {movies.map((movie, idx) => (
              <div key={movie.id} className={styles.movieCard}>
                <Link
                  to={`/movie/${movie.id}`}
                  className={styles.linkWrapper}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.thumbnail}
                  />
                  <p className={styles.titleText}>
                    {idx + 1}. {movie.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <button
            className={styles.arrowRight}
            onClick={() => handleScroll("right")}
          >
            ❯
          </button>
        </div>
      </section>
      <hr className={styles.divider} />
    </>
  );
};

export default ToptenMovies;
