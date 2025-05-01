import React from "react";
import styles from "../styles/MainPage.module.css";
import MainBanner from "../components/MainBanner";
import CategorySelector from "../components/CategorySelector";
import MembershipGuide from "../components/MembershipGuide";
import ToptenMovies from "../components/ToptenMovies";
import NowShowingMovies from "../components/NowShowingMovies";
import TopRatedMovies from "../components/TopRatedMovies";

const MainPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <CategorySelector />
      <MainBanner />
      <hr className={styles.divider} />
      <ToptenMovies />
      <hr className={styles.divider} />
      <NowShowingMovies />
      <hr className={styles.divider} />
      <TopRatedMovies />
      <MembershipGuide />
    </div>
  );
};

export default MainPage;
