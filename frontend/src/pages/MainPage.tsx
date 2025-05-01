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

      <hr className={styles.divider} />

      <ToptenMovies />
      <ContentSection title="현재 상영작" />
      <ContentSection title="높은 평점" />
      <MembershipGuide />
    </div>
  );
};

export default MainPage;
