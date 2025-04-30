// src/pages/MainPage.tsx
import React from "react";
import styles from "../styles/MainPage.module.css";
import MainBanner from "../components/MainBanner";
import ContentSection from "../components/ContentSection";
import CategorySelector from "../components/CategorySelector";
import MembershipGuide from "../components/MembershipGuide";
import ToptenMovies from "../components/ToptenMovies";
// import ToptenMovies from "../components/ToptenMovies";

const MainPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <CategorySelector />
      <MainBanner />

      <div className={styles.searchBarSection}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="어떤 영상을 찾으시나요?"
        />
        <button className={styles.searchButton}>검색</button>
      </div>
      <ToptenMovies />
      {/* <ContentSection title="TOP 10 콘텐츠" /> */}
      <ContentSection title="새로 나온 콘텐츠" />
      <ContentSection title="요즘 뜨는 콘텐츠" />

      <MembershipGuide />
    </div>
  );
};

export default MainPage;
