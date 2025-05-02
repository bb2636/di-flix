import styles from "../styles/MainBanner.module.css";
import poster1 from "../assets/poster.jpeg";
import poster2 from "../assets/poster.jpeg";
import poster3 from "../assets/poster.jpeg";
import { useEffect, useState } from "react";

const banners = [
  {
    poster: poster1,
    title: "폭싹 속았수다",
    meta: "2025 · 12부 · 시리즈 · 로맨스 · 드라마 · 항로",
    summary:
      "망하고 요망한 소녀와 무지처럼 우직하고 단단한 소년... 시대를 뛰어넘어 피어나는 사랑 이야기.",
  },
  {
    poster: poster2,
    title: "그날의 우리는",
    meta: "2023 · 영화 · 드라마 · 성장",
    summary: "과거와 현재, 서로를 잊지 못한 두 사람의 이야기.",
  },
  {
    poster: poster3,
    title: "행복의 조건",
    meta: "2024 · 16부작 · 휴먼 · 감성",
    summary: "삶의 균형과 진짜 행복을 찾는 사람들의 따뜻한 이야기.",
  },
];
const MainBanner = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);

  const triggerFade = (nextIndex: number) => {
    setFade(true);
    setTimeout(() => {
      setCurrent(nextIndex);
      setFade(false);
    }, 300); // fade-out duration과 일치
  };

  const goNext = () => {
    const next = (current + 1) % banners.length;
    triggerFade(next);
  };

  const goPrev = () => {
    const prev = (current - 1 + banners.length) % banners.length;
    triggerFade(prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [current]);

  const { poster, title, meta, summary } = banners[current];

  return (
    <section
      className={`${styles.bannerWrapper} ${fade ? styles.fadeOut : styles.fadeIn}`}
    >
      <div className={styles.posterWrapper}>
        <img className={styles.posterImage} src={poster} alt={title} />
      </div>
      <div className={styles.descriptionWrapper}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.meta}>{meta}</p>
        <p className={styles.summary}>{summary}</p>
        <button className={styles.watchButton}>시청하기</button>
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
