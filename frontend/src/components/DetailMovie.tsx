import React, { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import styles from "../styles/DetailMoviePage.module.css";
import { addWishlist, removeWishlist, checkWishlist } from "../apis/userApi";
import { genreMap } from "../types/genre";

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

  // 영화 정보 메타 생성
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "-";
  const rating = movie.vote_average ? movie.vote_average.toFixed(2) : "-";
  let genres = "";
  if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
    genres = movie.genre_ids
      .map((id) => genreMap[id])
      .filter(Boolean)
      .join(", ");
  } else if (
    Array.isArray(
      (movie as unknown as { genres?: { id: number; name: string }[] }).genres,
    )
  ) {
    genres = (
      movie as unknown as { genres: { id: number; name: string }[] }
    ).genres
      .map((g) => g.name)
      .filter(Boolean)
      .join(", ");
  }
  const meta = `${year} · 평점 ${rating}${genres ? ` · ${genres}` : ""}`;

  return (
    <div className={styles.detailContainer}>
      <img
        className={styles.poster}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className={styles.info}>
        <h2 className={styles.title}>
          {movie.title} ({year})
          <span
            className={styles.heartIcon}
            onClick={handleWishlistToggle}
            title={isWished ? "찜 삭제" : "찜 추가"}
          >
            {isWished ? "❤️" : "🤍"}
          </span>
        </h2>
        <div className={styles.meta}>{meta}</div>
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
