// src/components/MainBanner.tsx
import React from 'react';
import styles from './MainBanner.module.css';
import poster from '../assets/poster.jpeg'

const MainBanner = () => {
  return (
    <section className={styles.bannerWrapper}>
      <div className={styles.posterWrapper}>
        <img
          className={styles.posterImage}
          src={poster}
          alt="폭싹 속았수다"
        />
      </div>
      <div className={styles.descriptionWrapper}>
        <h2 className={styles.title}>폭싹 속았수다</h2>
        <p className={styles.meta}>2025 · 12부 · 시리즈 · 로맨스 · 드라마 · 항로</p>
        <p className={styles.summary}>
          망하고 요망한 소녀와 무지처럼 우직하고 단단한 소년. 계속 반짝? 같은 마음에 한
          번씩 자란 듯 물든 인생은 어디로 향할까. 넘어지고 좌절해도 다시 일어서며,
          시대를 뛰어넘어 피어나는 사랑 이야기.
        </p>
        <button className={styles.watchButton}>시청하기</button>
      </div>
    </section>
  );
};

export default MainBanner;