// src/pages/MainPage.tsx
import React from "react";
import styles from "../styles/MainPage.module.css";
import MainBanner from "../components/MainBanner";
import ContentSection from "../components/ContentSection";
import CategorySelector from "../components/CategorySelector";
import MembershipGuide from "../components/MembershipGuide";

const MainPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <MainBanner />

      <div className={styles.searchBarSection}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="어떤 영상을 찾으시나요?"
        />
        <button className={styles.searchButton}>검색</button>
      </div>

      <ContentSection title="새로 나온 콘텐츠" />
      <ContentSection title="요즘 뜨는 콘텐츠" />

      <CategorySelector />

      <MembershipGuide />
    </div>
  );
};

export default MainPage;
