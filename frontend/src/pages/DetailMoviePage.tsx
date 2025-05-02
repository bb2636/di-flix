// src/pages/DetailMoviePage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../apis/axios";
import { Movie } from "../types/movie";
import DetailMovie from "../components/DetailMovie";
import styles from "../styles/DetailMoviePage.module.css";

const DetailMoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchDetailMovie = async () => {
      try {
        console.log("id:", id);
        const response = await api.get(`/content/detail/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("영화 상세 정보 불러오기 실패:", error);
      }
    };

    if (id) fetchDetailMovie();
  }, [id]);

  if (!movie) return <div className={styles.loading}>로딩 중...</div>;

  return (
    <section className={styles.pageWrapper}>
      <DetailMovie movie={movie} />
    </section>
  );
};

export default DetailMoviePage;
