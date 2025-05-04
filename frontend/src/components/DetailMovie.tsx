import React, { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import styles from "../styles/DetailMoviePage.module.css";
import { addWishlist, removeWishlist, checkWishlist } from "../apis/userApi";

interface DetailMovieProps {
  movie: Movie;
}

const DetailMovie: React.FC<DetailMovieProps> = ({ movie }) => {
  const [isWished, setIsWished] = useState(false);

  // ✅ 진입 시 찜 여부 확인
  useEffect(() => {
    const fetchWishlistStatus = async () => {
      try {
        const res = await checkWishlist(movie.id);
        setIsWished(res.data.wished);
      } catch (err) {
        console.error("찜 여부 확인 실패", err);
      }
    };

    fetchWishlistStatus();
  }, [movie.id]);

  const handleWishlistToggle = async () => {
    try {
      if (isWished) {
        await removeWishlist(movie.id);
        alert("찜 삭제 완료");
      } else {
        await addWishlist(movie.id);
        alert("찜 추가 완료");
      }
      setIsWished(!isWished);
    } catch (err) {
      alert("찜 처리 중 오류 발생");
      console.error(err);
    }
  };

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
          <span
            className={styles.heartIcon}
            onClick={handleWishlistToggle}
            title={isWished ? "찜 삭제" : "찜 추가"}
          >
            {isWished ? "❤️" : "🤍"}
          </span>
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
