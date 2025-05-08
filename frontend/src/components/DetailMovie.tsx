import React, { useEffect, useState, useRef } from "react";
import { Movie } from "../types/movie";
import styles from "../styles/DetailMoviePage.module.css";
import {
  addWishlist,
  removeWishlist,
  checkWishlist,
  saveWatchHistory,
  getWatchHistory,
} from "../apis/userApi";
import { genreMap } from "../types/genre";
import { formatWatchTime } from "../utils/formatTime";

interface DetailMovieProps {
  movie: Movie;
}

const DetailMovie: React.FC<DetailMovieProps> = ({ movie }) => {
  const [isWished, setIsWished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [formattedWatchTime, setFormattedWatchTime] = useState(""); // ✅ 추가
  const playerRef = useRef<HTMLIFrameElement | null>(null);

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

  // ✅ 시청 위치 불러오기
  useEffect(() => {
    const fetchWatchTime = async () => {
      try {
        const res = await getWatchHistory(movie.id);
        const time = res.data.watchTime || 0;
        setStartTime(time);
        setFormattedWatchTime(formatWatchTime(time)); // ✅ 포맷된 시청 시간 저장
      } catch (err) {
        console.error("시청 시간 불러오기 실패", err);
      }
    };
    fetchWatchTime();
  }, [movie.id]);

  // ✅ 시청 시간 저장
  useEffect(() => {
    const interval = setInterval(() => {
      const iframe = document.querySelector("iframe");
      if (!iframe) return;

      const playerWindow = iframe.contentWindow;
      if (!playerWindow) return;

      playerWindow.postMessage(JSON.stringify({ event: "listening" }), "*");
    }, 5000);

    const handleMessage = (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        if (data?.event === "infoDelivery" && data.info?.currentTime) {
          const time = Math.floor(data.info.currentTime);
          saveWatchHistory(
            movie.id,
            time,
            movie.title,
            movie.poster_path || undefined,
          );
        }
      } catch (err) {
        console.error("시청 위치 저장 실패", err);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      clearInterval(interval);
      window.removeEventListener("message", handleMessage);
    };
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

  // 메타데이터 생성
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
          <>
            {formattedWatchTime && (
              <div className={styles.watchTimeText}>
                {/* 마지막 시청 위치: {formattedWatchTime} */}
              </div>
            )}
            <iframe
              ref={playerRef}
              className={styles.trailer}
              src={`https://www.youtube.com/embed/${movie.trailerKey}?start=${startTime}&enablejsapi=1`}
              title="트레일러"
              allowFullScreen
            ></iframe>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailMovie;
