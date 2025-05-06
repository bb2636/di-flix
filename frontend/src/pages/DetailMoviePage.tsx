import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../apis/axios";
import { Movie } from "../types/movie";
import DetailMovie from "../components/DetailMovie";
import styles from "../styles/DetailMoviePage.module.css";
import axios from "axios";

const DetailMoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<"unauth" | "forbidden" | null>(null); // 👈 에러 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetailMovie = async () => {
      try {
        console.log("id:", id);
        const response = await api.get(`/content/detail/${id}`);
        setMovie(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setError("unauth"); // 👈 로그인 안 함
          } else if (error.response?.status === 403) {
            navigate("/membershipRequired"); // 👈 멤버십 없음
          } else {
            console.error("영화 상세 정보 불러오기 실패:", error);
          }
        }
      }
    };

    if (id) fetchDetailMovie();
  }, [id, navigate]);

  // 에러 상태일 때 처리
  if (error === "unauth") {
    return <div className={styles.loading}>로그인이 필요합니다.</div>;
  }

  // 로딩 상태
  if (!movie) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  // 정상 출력
  return (
    <section className={styles.pageWrapper}>
      <DetailMovie movie={movie} />
    </section>
  );
};

export default DetailMoviePage;
