import styles from "../styles/MainBanner.module.css";
import { fetchToptenMovies } from "../apis/axios";
import { Movie } from "../types/movie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { genreMap } from "../types/genre";

const MainBanner = () => {
  const [banners, setBanners] = useState<Movie[]>([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getTop3Movies = async () => {
      try {
        const data = await fetchToptenMovies();
        setBanners(data.slice(0, 3));
      } catch (error) {
        console.error("TOP 3 불러오기 실패", error);
      }
    };
    getTop3Movies();
  }, []);

  const triggerFade = (nextIndex: number) => {
    setFade(true);
    setTimeout(() => {
      setCurrent(nextIndex);
      setFade(false);
    }, 300);
  };

  const goNext = () => {
    if (banners.length === 0) return;
    const next = (current + 1) % banners.length;
    triggerFade(next);
  };

  const goPrev = () => {
    if (banners.length === 0) return;
    const prev = (current - 1 + banners.length) % banners.length;
    triggerFade(prev);
  };

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      goNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [current, banners.length]);

  if (banners.length === 0) return null;

  const movie = banners[current];
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/240x360?text=No+Image";
  const title = movie.title;
  const genreNames = movie.genre_ids
    ? movie.genre_ids
        .map((id) => genreMap[id])
        .filter(Boolean)
        .join(", ")
    : "";
  const meta = [
    movie.release_date ? movie.release_date.slice(0, 4) : "-",
    `평점 ${movie.vote_average ?? "-"}`,
    genreNames,
  ]
    .filter(Boolean)
    .join(" · ");
  const summary = movie.overview || "줄거리 정보가 없습니다.";

  // summary 길이에 따라 폰트 크기 동적 조정
  let summaryFontSize = 16;
  if (summary.length > 180) summaryFontSize = 13;
  else if (summary.length > 120) summaryFontSize = 14;
  else if (summary.length > 80) summaryFontSize = 15;

  return (
    <section
      className={`${styles.bannerWrapper} ${
        fade ? styles.fadeOut : styles.fadeIn
      }`}
    >
      <div className={styles.posterWrapper}>
        <img className={styles.posterImage} src={poster} alt={title} />
      </div>
      <div className={styles.descriptionWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.meta}>{meta}</p>
        <p className={styles.summary} style={{ fontSize: summaryFontSize }}>
          {summary}
        </p>
        <button
          className={styles.fancyButton}
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <span style={{ fontSize: "1.2em", marginRight: "4px" }}>▶</span>
          시청하기
        </button>
      </div>
      <button className={`${styles.navButton} ${styles.left}`} onClick={goPrev}>
        ◀
      </button>
      <button
        className={`${styles.navButton} ${styles.right}`}
        onClick={goNext}
      >
        ▶
      </button>
    </section>
  );
};

export default MainBanner;
